
"use client";

import React, { useState, useEffect } from "react";

interface UseCaseRecommendations {
    [key: string]: {
        backend: string[];
        frontend: string[];
        database: string[];
    };
}


const technologies = {
    backend: {
        NodeJS: ["Express", "NestJS", "Fastify"],
        Python: ["Django", "Flask", "FastAPI"],
        Java: ["Spring Boot", "Quarkus"],
        CSharp: [".NET Core", "ASP.NET"],
        Go: ["Gin", "Echo", "Fiber"],
        Ruby: ["Rails", "Sinatra"]
    },
    frontend: {
        frameworks: ["React", "Angular", "Vue.js", "Svelte"],
        metaFrameworks: {
            React: ["Next.js"],
            Vue: ["Nuxt"],
            Svelte: ["SvelteKit"]
        }
    },
    databases: {
        SQL: ["PostgreSQL", "MySQL", "SQLite"],
        NoSQL: ["MongoDB", "Redis", "Cassandra"]
    },
    uiLibraries: {
        React: ["Material-UI", "Ant Design", "Chakra UI", "Bootstrap"],
        Vue: ["Vuetify", "BootstrapVue", "Element UI"],
        Angular: ["Angular Material", "PrimeNG"],
        Svelte: ["Svelte Material UI", "Carbon Components Svelte"]
    },
    stateManagement: {
        React: ["Redux", "MobX", "Zustand", "Recoil"],
        Vue: ["Vuex", "Pinia"],
        Angular: ["NgRx", "Akita"],
        Svelte: ["Svelte store", "SvelteEasyState"]
    },
    apiIntegrations: {
        REST: "Kaikki backend vaihtoehdot tukevat REST API:ja.",
        GraphQL: {
            NodeJS: "Apollo Server",
            Python: "Graphene",
            Go: "gqlgen",
            Ruby: "GraphQL-Ruby"
        },
        WebSocket: {
            NodeJS: "Socket.io",
            Python: "Django Channels",
            Go: "Gorilla WebSocket"
        }
    }
};

const useCaseRecommendations: UseCaseRecommendations = {
    webApp: {
        backend: ["NodeJS", "Python", "Ruby"],
        frontend: ["React", "Angular"],
        database: ["SQL", "NoSQL"]
    },
    realTimeApp: {
        backend: ["NodeJS", "Go"],
        frontend: ["React", "Svelte"],
        database: ["NoSQL"]
    },
    databaseIntensiveApp: {
        backend: ["Python", "Java", "CSharp"],
        frontend: ["Angular", "React"],
        database: ["SQL"]
    }
};

const useCaseNames: { [key: string]: string } = {
    webApp: "Web-sovellus",
    realTimeApp: "Reaaliaikainen sovellus",
    databaseIntensiveApp: "Tietokantaintensiivinen sovellus"
};

const TechnologySelector: React.FC = () => {
    const [useCase, setUseCase] = useState<string>("webApp");
    const [backend, setBackend] = useState<string | null>(null);
    const [frontend, setFrontend] = useState<string | null>(null);
    const [database, setDatabase] = useState<string | null>(null);
    const [output, setOutput] = useState<string>("");

    const useCaseData = useCaseRecommendations[useCase];
    const backendOptions = useCaseData ? useCaseData.backend : [];
    const frontendOptions = useCaseData ? useCaseData.frontend : [];
    const databaseOptions = technologies.databases[database as "SQL" | "NoSQL"] || [];


    const suggestTechnologies = () => {
        let result = `Valittu käyttötarkoitus: ${useCaseNames[useCase]}\n`;

        if (backend) {
            result += `Valittu backend ohjelmointikieli: ${backend}\n`;
            result += `Yhteensopivat frameworkit: ${technologies.backend[backend as keyof typeof technologies.backend].join(", ")}\n`;
        }

        if (frontend) {
            result += `Valittu frontend-teknologia: ${frontend}\n`;
            const metaFrameworks = technologies.frontend.metaFrameworks[frontend as keyof typeof technologies.frontend.metaFrameworks];
            if (metaFrameworks) {
                result += `Yhteensopivat Meta-frameworkit: ${metaFrameworks.join(", ")}\n`;
            }
            const uiLibraries = technologies.uiLibraries[frontend as keyof typeof technologies.uiLibraries];
            if (uiLibraries) {
                result += `Yhteensopivat UI-kirjastot: ${uiLibraries.join(", ")}\n`;
            }
            const stateManagement = technologies.stateManagement[frontend as keyof typeof technologies.stateManagement];
            if (stateManagement) {
                result += `Yhteensopivat State management -työkalut: ${stateManagement.join(", ")}\n`;
            }
        }

        if (database) {
            result += `Valittu tietokanta: ${database}\n`;
            result += `Suositellut ${database} tietokannat: ${technologies.databases[database as keyof typeof technologies.databases].join(", ")}\n`;
        }

        // API-integraatiot
        result += `API-integraatiot:\n- REST API: ${technologies.apiIntegrations.REST}\n`;
        if (backend) {
            const graphQLSupport = technologies.apiIntegrations.GraphQL[backend as keyof typeof technologies.apiIntegrations.GraphQL];
            if (graphQLSupport) {
                result += `- GraphQL-tuki: ${graphQLSupport}\n`;
            }
            const webSocketSupport = technologies.apiIntegrations.WebSocket[backend as keyof typeof technologies.apiIntegrations.WebSocket];
            if (webSocketSupport) {
                result += `- WebSocket-tuki: ${webSocketSupport}\n`;
            }
        }

        setOutput(result);
    };



    return (
        <div>
            <div>
                <label>Valitse käyttötarkoitus:</label>
                <select onChange={(e) => setUseCase(e.target.value)} value={useCase}>
                    <option value="webApp">Web-sovellus</option>
                    <option value="realTimeApp">Reaaliaikainen sovellus</option>
                    <option value="databaseIntensiveApp">Tietokantaintensiivinen sovellus</option>
                </select>
            </div>

            <div>
                <label>Valitse Backend:</label>
                <select onChange={(e) => setBackend(e.target.value)} value={backend || ""}>
                    <option value="">Valitse Backend</option>
                    {backendOptions.map((backendOption) => (
                        <option key={backendOption} value={backendOption}>
                            {backendOption}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label>Valitse Frontend:</label>
                <select onChange={(e) => setFrontend(e.target.value)} value={frontend || ""}>
                    <option value="">Valitse Frontend</option>
                    {frontendOptions.map((frontendOption) => (
                        <option key={frontendOption} value={frontendOption}>
                            {frontendOption}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label>Valitse tietokanta:</label>
                <select onChange={(e) => setDatabase(e.target.value)} value={database || ""}>
                    <option value="">Valitse Tietokanta</option>
                    {["SQL", "NoSQL"].map((databaseType) => (
                        <option key={databaseType} value={databaseType}>
                            {databaseType}
                        </option>
                    ))}
                </select>
            </div>

            <button onClick={suggestTechnologies}>Näytä suositukset</button>

            <pre>{output}</pre>
        </div>
    );
};

export default TechnologySelector;