"use client";

import React, { useState, useEffect } from "react";
import Suggestions from "./Suggestions";  // Komponentti, joka näyttää suositukset
import Warnings from "./Warnings";  // Komponentti, joka näyttää varoitukset
import { technologies, BackendType, FrontendType, DatabaseType } from "../technologies";  // Teknologiainformaatiot ja tyypit

// Määritellään "UseCaseRecommendations"-tyyppinen objekti, joka pitää sisällään käyttötarkoituksiin liittyviä teknologioiden suosituksia
interface UseCaseRecommendations {
    [key: string]: {
        backend: BackendType[];  // Backendteknologiat
        frontend: FrontendType[];  // Frontendteknologiat
        database: DatabaseType[];  // Tietokannat
    };
}

// Suositukset eri käyttötarkoituksiin (esim. webApp, realTimeApp jne.)
const useCaseRecommendations: UseCaseRecommendations = {
    webApp: {
        backend: ["NodeJS", "Python", "Ruby"],
        frontend: ["React", "Angular"],
        database: ["PostgreSQL", "MySQL", "SQLite", "MongoDB", "Redis"],
    },
    realTimeApp: {
        backend: ["NodeJS", "Go"],
        frontend: ["React", "Svelte"],
        database: ["MongoDB", "Redis"],
    },
    dataIntensiveApp: {
        backend: ["Python", "Java", "CSharp"],
        frontend: ["Angular", "React"],
        database: ["PostgreSQL", "MySQL", "Cassandra"],
    },
};

// Käyttötarkoituksien nimet suomennettuna
const useCaseNames: { [key: string]: string } = {
    webApp: "Verkkosovellus",
    realTimeApp: "Reaaliaikainen palvelu",
    dataIntensiveApp: "Tietointensiivinen palvelu",
};

// Teknologiavalintatyökalu-komponentti
const TechnologySelector: React.FC = () => {
    // Tilamuuttujat käyttöliittymän hallintaan
    const [useCase, setUseCase] = useState<string>("webApp");  // Käyttötarkoitus
    const [skillLevel, setSkillLevel] = useState<number>(1);  // Osaamistaso
    const [difficulty, setDifficulty] = useState<number>(1);  // Projektille toivottu vaikeustaso

    // Käyttäjän osaamat teknologiat
    const [userTech, setUserTech] = useState<{
        backend: BackendType[];
        frontend: FrontendType[];
        database: DatabaseType[];
    }>({
        backend: [],
        frontend: [],
        database: [],
    });

    // Käännökset eri teknologiatyyppien nimille
    const techTypeTranslations: { [key: string]: string } = {
        backend: "Backend: ",
        frontend: "Frontend: ",
        databases: "Tietokannat: ",
    };

    // Suositusten ja varoitusten tilan hallinta
    const [primarySuggestion, setPrimarySuggestion] = useState<string | null>(null);
    const [alternativeSuggestion, setAlternativeSuggestion] = useState<string | null>(null);
    const [warnings, setWarnings] = useState<string[]>([]);

    // Käytetään useEffect päivittämään suosituksia ja varoituksia
    useEffect(() => {
        updatePrimarySuggestion();  // Päivittää ensisijaiset suositukset
        updateWarnings();  // Päivittää varoitukset
    }, [useCase, skillLevel, difficulty, userTech]);

    useEffect(() => {
        updateAlternativeSuggestion();  // Päivittää vaihtoehtoiset suositukset
    }, [userTech, primarySuggestion]);

    // Päivittää ensisijaisen suosituksen teknologioiden ja käyttäjän syötteen mukaan
    const updatePrimarySuggestion = () => {
        const currentUseCase = useCaseRecommendations[useCase] || { backend: [], frontend: [], database: [] };

        // Filtteröidään teknologiat käyttäjän taitotason ja toivomansa vaikeustason mukaan
        const validBackends = currentUseCase.backend.filter((b) => technologies.backend[b].difficulty <= difficulty);
        const validFrontends = currentUseCase.frontend.filter((f) => technologies.frontend.difficulty[f] <= skillLevel);
        const validDatabases = currentUseCase.database.filter(
            (d) => technologies.databases[d]?.difficulty <= skillLevel
        );

        // Suositellaan ensimmäinen yhdistelmä teknologioita
        const newSuggestion = generateSuggestions(validBackends, validFrontends, validDatabases)[0];
        setPrimarySuggestion(newSuggestion || null);  // Asetetaan ensisijainen ehdotus
    };

    // Päivittää toissijaisen suosituksen käyttäjän valitseman ensisijaisen ehdotuksen mukaan
    const updateAlternativeSuggestion = () => {
        if (!primarySuggestion) return;

        const currentUseCase = useCaseRecommendations[useCase];

        // Pilkotaan ensisijainen ehdotus osiin (backend, frontend, database)
        const [primaryBackend, primaryFrontend, primaryDatabase] = primarySuggestion
            .replace("Backend: ", "")
            .replace("Frontend: ", "")
            .replace("Database: ", "")
            .split(", ")
            .map((s) => s.split(": ")[1]);

        const { backend: userBackends, frontend: userFrontends, database: userDatabases } = userTech;

        // Etsitään vaihtoehtoja käyttäjän osaamien teknologioiden perusteella
        const alternativeBackend = userBackends.find((b) => b !== primaryBackend && currentUseCase.backend.includes(b));
        const alternativeFrontend = userFrontends.find((f) => f !== primaryFrontend && currentUseCase.frontend.includes(f));
        const alternativeDatabase = userDatabases.find((d) => d !== primaryDatabase && currentUseCase.database.includes(d));

        // Rakennetaan toissijainen ehdotus
        const alternativeSuggestionParts = [
            alternativeBackend || primaryBackend,
            alternativeFrontend || primaryFrontend,
            alternativeDatabase || primaryDatabase,
        ];

        setAlternativeSuggestion(
            `Backend: ${alternativeSuggestionParts[0]}, Frontend: ${alternativeSuggestionParts[1]}, Database: ${alternativeSuggestionParts[2]}`
        );
    };

    // Päivittää varoitukset, jos käyttäjä on valinnut ei-suositeltuja teknologioita
    const updateWarnings = () => {
        const currentUseCase = useCaseRecommendations[useCase] || { backend: [], frontend: [], database: [] };
        const newWarnings: string[] = [];

        // Tarkistetaan, ovatko käyttäjän valitsemat backend-, frontend- ja tietokantateknologiat suositeltuja aiempiin käyttäjävalintoihin nähden
        userTech.backend.forEach((backend) => {
            if (!currentUseCase.backend.includes(backend)) {
                newWarnings.push(`Backendteknologia ${backend} ei ole suositeltavaa tähän käyttötarkoitukseen.`);
            }
        });
        userTech.frontend.forEach((frontend) => {
            if (!currentUseCase.frontend.includes(frontend)) {
                newWarnings.push(`Frontendteknologia ${frontend} ei ole suositeltavaa tähän käyttötarkoitukseen.`);
            }
        });
        userTech.database.forEach((database) => {
            if (!currentUseCase.database.includes(database)) {
                newWarnings.push(`Tietokantateknologia ${database} ei ole suositeltavaa tähän käyttötarkoitukseen.`);
            }
        });

        setWarnings(newWarnings);
    };

    // Luo ehdotuksia yhdistämällä sopivat backendit, frontendit ja tietokannat
    const generateSuggestions = (backends: BackendType[], frontends: FrontendType[], databases: DatabaseType[]) => {
        const suggestions: string[] = [];
        backends.forEach((b) => {
            frontends.forEach((f) => {
                databases.forEach((d) => {
                    // Suositellaan vain yhteensopivia teknologioita
                    if (
                        technologies.backend[b]?.compatibleWithFrontend.includes(f) &&
                        technologies.databases[d]?.compatibleWithBackends.includes(b)
                    ) {
                        suggestions.push(`Backend: ${b}, Frontend: ${f}, Database: ${d}`);
                    }
                });
            });
        });
        return suggestions;
    };

    //komponentin käyttöliittymä
    return (
        <div>
            <h2>Teknologian valintatyökalu</h2>

            <div>
                <label><strong>Käyttötarkoitus: </strong></label>
                <select value={useCase} onChange={(e) => setUseCase(e.target.value)}>
                    {Object.entries(useCaseNames).map(([key, name]) => (
                        <option key={key} value={key}>
                            {name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label><strong>Osaamistasosi: </strong></label>
                <select value={skillLevel.toString()} onChange={(e) => setSkillLevel(parseInt(e.target.value))}>
                    <option value="1">1 - Alkeet</option>
                    <option value="2">2 - Perustaso</option>
                    <option value="3">3 - Osaava</option>
                </select>
            </div>

            <div>
                <label><strong>Toivomasi vaikeustaso projektille: </strong></label>
                <select value={difficulty.toString()} onChange={(e) => setDifficulty(parseInt(e.target.value))}>
                    <option value="1">1 - Helppo</option>
                    <option value="2">2 - Keskivaikea</option>
                    <option value="3">3 - Haastava</option>
                </select>
            </div>

            <div>
                <label><strong>Käyttäjän osaamat teknologiat:</strong></label>
                {(["backend", "frontend", "databases"] as const).map((techType) => (
                    <div key={techType}>
                        <label>
                            <strong>{techTypeTranslations[techType]}</strong>
                        </label>
                        {(techType === "frontend"
                            ? technologies.frontend.frameworks
                            : Object.keys(technologies[techType])
                        ).map((tech) => (
                            <label key={tech}>
                                <input
                                    type="checkbox"
                                    onChange={(e) => {
                                        setUserTech((prev) => ({
                                            ...prev,
                                            [techType === "databases" ? "database" : techType]: e.target.checked
                                                ? [
                                                    ...prev[techType === "databases" ? "database" : techType],
                                                    tech as BackendType | FrontendType | DatabaseType,
                                                ]
                                                : prev[
                                                    techType === "databases" ? "database" : techType
                                                ].filter((t) => t !== tech),
                                        }));
                                    }}
                                />
                                {tech}
                            </label>
                        ))}
                    </div>
                ))}
            </div>

            <Suggestions
                primarySuggestion={primarySuggestion}  // Ensisijainen ehdotus
                alternativeSuggestion={alternativeSuggestion}  // Toissijainen ehdotus
                onGenerateSuggestions={() => console.log("Suosituksia päivitetty manuaalisesti.")}
            />

            <Warnings warnings={warnings} />  {/* Näytetään varoitukset */}
        </div>
    );
};

export default TechnologySelector;  
