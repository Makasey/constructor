/** @type {import('ts-jest').JestConfigWithTsJest} */
const { pathsToModuleNameMapper } = require("ts-jest");

const aliases = {
    "@shared-types/*": ["<rootDir>/src/app/types/*"],
    "@core/*": ["<rootDir>/src/app/core/*"],
    "@components/*": ["<rootDir>/src/app/components/*"],
    "@modules/*": ["<rootDir>/src/app/module/*"],
    "@shared-pipes/*": ["<rootDir>/src/app/pipes/*"],
    "@shared-utils/*": ["<rootDir>/src/app/utils/*"],
    "@shared-directives/*": ["<rootDir>/src/app/directive/*"],
};

module.exports = {
    preset: "jest-preset-angular",
    verbose: true,
    setupFilesAfterEnv: ["./setup-jest.ts"],
    moduleNameMapper: pathsToModuleNameMapper(aliases),
};
