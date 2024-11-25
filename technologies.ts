// Määritellään backend-, frontend- ja tietokantateknologiat
export const technologies = {
    // Backend-teknologiat ja niiden yhteensopivuudet
    backend: {
        NodeJS: {
            frameworks: ["Express", "NestJS"],
            difficulty: 1,
            compatibleWithFrontend: ["React", "Vue.js", "Angular"]
        },
        Python: {
            frameworks: ["Django", "Flask"],
            difficulty: 1,
            compatibleWithFrontend: ["React", "Vue.js"]
        },
        Java: {
            frameworks: ["Spring Boot"],
            difficulty: 3,
            compatibleWithFrontend: ["Angular"]
        },
        CSharp: {
            frameworks: [".NET Core"],
            difficulty: 2,
            compatibleWithFrontend: ["React"]
        },
        Go: {
            frameworks: ["Gin"],
            difficulty: 2,
            compatibleWithFrontend: ["React", "Svelte"]
        },
        Ruby: {
            frameworks: ["Rails"],
            difficulty: 1,
            compatibleWithFrontend: ["React", "Vue.js"]
        },
    },
    // Frontend-teknologiat ja niiden vaikeusasteet
    frontend: {
        frameworks: ["React", "Angular", "Vue.js", "Svelte"],
        difficulty: {
            React: 1,
            Angular: 2,
            Vue: 1,
            Svelte: 1,
        },
    },
    // Tietokannat ja niiden yhteensopivuus sekä vaikeusaste
    databases: {
        PostgreSQL: { difficulty: 2, compatibleWithBackends: ["NodeJS", "Python", "Java", "CSharp"] },
        MySQL: { difficulty: 2, compatibleWithBackends: ["NodeJS", "Python", "Java", "CSharp"] },
        SQLite: { difficulty: 1, compatibleWithBackends: ["NodeJS", "Python"] },
        MongoDB: { difficulty: 1, compatibleWithBackends: ["NodeJS", "Python", "Go"] },
        Redis: { difficulty: 1, compatibleWithBackends: ["NodeJS", "Python", "Go"] },
        Cassandra: { difficulty: 3, compatibleWithBackends: ["Java", "Go"] },
    },
};

// Tyyppimäärittelyt backend-, frontend- ja tietokantateknologioille
export type BackendType = keyof typeof technologies.backend;
export type FrontendType = keyof typeof technologies.frontend.difficulty;
export type DatabaseType = keyof typeof technologies.databases;