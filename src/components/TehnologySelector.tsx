
"use client";

import React, { useState } from "react";


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

const TechnologySelector: React.FC = () => {
    const [output, setOutput] = useState("");

    const suggestTechnologies = () => {
        let result = "";

        // Backend-valinta
        const backendChoice = prompt("Valitse Backend (NodeJS, Python, Java, CSharp, Go, Ruby):");
        if (!technologies.backend[backendChoice as keyof typeof technologies.backend]) {
            alert("Valitsemasi backend ei ole tuettu.");
            return;
        }
        result += `Valitsemasi Backend: ${backendChoice}\nYhteensopivat Frameworkit: ${technologies.backend[backendChoice as keyof typeof technologies.backend].join(", ")}\n`;

        // Frontend-valinta
        const frontendFramework = prompt("Valitse Frontend framework (React, Angular, Vue.js, Svelte):");
        if (!technologies.frontend.frameworks.includes(frontendFramework || "")) {
            alert("Valitsemasi frontend framework ei ole tuettu.");
            return;
        }
        result += `\nValitsemasi Frontend: ${frontendFramework}`;

        const metaFrameworks = technologies.frontend.metaFrameworks[frontendFramework as keyof typeof technologies.frontend.metaFrameworks];
        if (metaFrameworks) {
            result += `\nYhteensopiva Meta-framework: ${metaFrameworks.join(", ")}\n`;
        }

        // Tietokanta
        const databaseType = prompt("Valitse tietokantatyyppi (SQL, NoSQL):");
        if (!technologies.databases[databaseType as keyof typeof technologies.databases]) {
            alert("Valitsemasi tietokantatyyppi ei ole tuettu.");
            return;
        }
        result += `\nSuositellut ${databaseType} tietokannat: ${technologies.databases[databaseType as keyof typeof technologies.databases].join(", ")}\n`;

        // UI-kirjastot
        const uiLibraries = technologies.uiLibraries[frontendFramework as keyof typeof technologies.uiLibraries];
        if (uiLibraries) {
            result += `\nYhteensopivat UI kirjastot ${frontendFramework}ille: ${uiLibraries.join(", ")}\n`;
        }

        // State management
        const stateManagement = technologies.stateManagement[frontendFramework as keyof typeof technologies.stateManagement];
        if (stateManagement) {
            result += `\nYhteensopivat State management -työkalut ${frontendFramework}ille: ${stateManagement.join(", ")}\n`;
        }

        // API-integraatiot
        result += `\nAPI-integraatiot:\n- REST API: ${technologies.apiIntegrations.REST}\n`;
        const graphQLSupport = technologies.apiIntegrations.GraphQL[backendChoice as keyof typeof technologies.apiIntegrations.GraphQL];
        if (graphQLSupport) {
            result += `- GraphQL-tuki: ${graphQLSupport}\n`;
        }
        const webSocketSupport = technologies.apiIntegrations.WebSocket[backendChoice as keyof typeof technologies.apiIntegrations.WebSocket];
        if (webSocketSupport) {
            result += `- WebSocket-tuki: ${webSocketSupport}\n`;
        }

        setOutput(result);
    };

    return (
        <div>
            <button onClick={suggestTechnologies}>Aloita teknologian valinta</button>
            <pre>{output}</pre>
        </div>
    );
};

export default TechnologySelector;
