/** @type {import('ts-jest').JestConfigWithTsJest} */
import { pathsToModuleNameMapper } from "ts-jest";

const aliases = {
    "@shared-types/*": ["<rootDir>/src/app/types/*"],
    "@shared-types": ["<rootDir>/src/app/types/index.ts"],
    "@core/*": ["<rootDir>/src/app/core/*"],
    "@core": ["<rootDir>/src/app/core/index.ts"],
    "@components/*": ["<rootDir>/src/app/components/*"],
    "@components": ["<rootDir>/src/app/components/index.ts"],
    "@modules/*": ["<rootDir>/src/app/module/*"],
    "@modules": ["<rootDir>/src/app/module/index.ts"],
    "@shared-pipes/*": ["<rootDir>/src/app/pipes/*"],
    "@shared-pipes": ["<rootDir>/src/app/pipes/index.ts"],
    "@shared-plugins": ["<rootDir>/src/app/plugins"],
    "@shared-plugins/*": ["<rootDir>/src/app/plugins/index.ts"],
    "@shared-decorators": ["<rootDir>/src/app/decorators"],
    "@shared-decorators/*": ["<rootDir>/src/app/decorators/index.ts"],
    "@shared-utils/*": ["<rootDir>/src/app/utils/*"],
    "@shared-utils": ["<rootDir>/src/app/utils/index.ts"],
    "@shared-directives/*": ["<rootDir>/src/app/directive/*"],
    "@shared-directives": ["<rootDir>/src/app/directive/index.ts"],
    "@shared-constants/*": ["<rootDir>/src/app/constants/*"],
    "@shared-constants": ["<rootDir>/src/app/constants/index.ts"],
    "@shared-enums/*": ["<rootDir>/src/app/enums/*"],
    "@shared-enums": ["<rootDir>/src/app/enums/index.ts"],
};

export default {
    preset: "jest-preset-angular",
    verbose: true,
    setupFilesAfterEnv: ["./setup-jest.ts"],
    transformIgnorePatterns: ["node_modules/(?!.*.mjs$|@datorama/akita)"],
    moduleNameMapper: pathsToModuleNameMapper(aliases),
};
