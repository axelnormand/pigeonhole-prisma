module.exports = {
    projects: ['client', 'server'],
    "moduleNameMapper": {
        "@axelnormand/client/(.*)$": "<rootDir>/client/$1",
        "@axelnormand/server/(.*)$": "<rootDir>/server/$1",
    }
}