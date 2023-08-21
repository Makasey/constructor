module.exports = {
    root: false,
    env: {
        es6: true,
        browser: true,
        node: true,
    },
    parserOptions: {
        project: ["tsconfig.json"],
        sourceType: "module",
        ecmaFeatures: { modules: true },
        ecmaVersion: 8,
    },
    settings: {
        "import/resolver": { typescript: {} },
    },
    rules: {
        "max-len": ["warn", { code: 150 }],
        "no-continue": "warn",
        eqeqeq: "error",
        "no-alert": "error",
        "eol-last": "error",
        quotes: ["error", "double"],
        semi: "error",
        "no-multi-spaces": "error",
        "comma-style": ["error", "last"],
        "comma-spacing": [
            "error",
            {
                before: false,
                after: true,
            },
        ],
        "lines-between-class-members": ["error", "always", { exceptAfterSingleLine: true }],
        "no-multiple-empty-lines": "error",
        "no-extra-boolean-cast": [2, { enforceForLogicalOperands: true }],
        "brace-style": [2, "1tbs"],
        indent: [
            "error",
            4,
            {
                SwitchCase: 1,
                MemberExpression: 0,
                FunctionExpression: { parameters: "first" },
                FunctionDeclaration: { parameters: "first" },
            },
        ],
        "no-useless-constructor": "off",
        "@angular-eslint/no-empty-lifecycle-method": "off",
    },
    overrides: [
        {
            files: ["*.js"],
            extends: ["plugin:prettier/recommended"],
            rules: {
                "prettier/prettier": [2, { trailingComma: "all" }],
                "no-useless-constructor": 1,
                "no-invalid-regexp": 0,
            },
        },
        {
            files: ["*.json", ".prettierrc"],
            plugins: ["prettier"],
            extends: ["plugin:prettier/recommended"],
            rules: {
                "prettier/prettier": [2, { parser: "json", tabWidth: 2 }],
            },
        },
        {
            files: ["*.ts"],
            parserOptions: {
                project: ["tsconfig.*?.json", "tsconfig.json"],
                createDefaultProgram: true,
            },
            plugins: ["sort-imports-es6-autofix", "billing-rmi-rules"],
            extends: [
                "eslint:recommended",
                "plugin:@typescript-eslint/recommended-requiring-type-checking",
                "plugin:@angular-eslint/recommended",
                "plugin:prettier/recommended",
            ],
            rules: {
                "arrow-body-style": 0,
                "prefer-arrow-callback": 0,
                "no-restricted-syntax": ["error", "SequenceExpression"],
                // eslint
                "no-console": 1,
                "no-unused-vars": 0,
                "brace-style": 0,
                "no-invalid-regexp": 0,
                "no-use-before-define": 0,
                "no-duplicate-imports": 0,
                "comma-dangle": [
                    "error",
                    {
                        arrays: "always-multiline",
                        objects: "always-multiline",
                        imports: "always-multiline",
                        exports: "always-multiline",
                        functions: "always-multiline",
                    },
                ],
                // sort-imports-es6-autofix
                "sort-imports": [
                    "error",
                    {
                        ignoreDeclarationSort: true,
                        memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
                    },
                ],

                "sort-imports-es6-autofix/sort-imports-es6": [2, { memberSyntaxSortOrder: ["none", "all", "multiple", "single"] }],
                // typescript rules
                "@typescript-eslint/no-empty-interface": ["error", { allowSingleExtends: true }],
                "@typescript-eslint/brace-style": 0,
                "@typescript-eslint/no-unused-vars": ["error", { args: "none" }],
                "@typescript-eslint/no-useless-constructor": "error",
                "@typescript-eslint/explicit-function-return-type": [
                    "error",
                    {
                        allowExpressions: true,
                        allowTypedFunctionExpressions: true, //
                        allowHigherOrderFunctions: true,
                        allowDirectConstAssertionInArrowFunctions: true, //
                        allowConciseArrowFunctionExpressionsStartingWithVoid: true, //
                    },
                ],
                "@typescript-eslint/explicit-member-accessibility": [
                    "error",
                    {
                        accessibility: "explicit",
                        overrides: {
                            accessors: "explicit",
                            constructors: "no-public",
                            methods: "explicit",
                            properties: "explicit",
                            parameterProperties: "explicit",
                        },
                    },
                ],
                "@typescript-eslint/indent": 0,
                "@typescript-eslint/no-var-requires": 1,
                "@typescript-eslint/no-empty-function": 1,
                "@typescript-eslint/no-unsafe-assignment": 0,
                "@typescript-eslint/no-unsafe-member-access": 1,
                "@typescript-eslint/no-redundant-type-constituents": 0,
                "@typescript-eslint/consistent-type-assertions": [
                    1,
                    {
                        assertionStyle: "as",
                        objectLiteralTypeAssertions: "never",
                    },
                ],
                "@typescript-eslint/no-unsafe-call": 1,
                "@typescript-eslint/unbound-method": 0,
                "@typescript-eslint/no-parameter-properties": 0,
                "@typescript-eslint/no-inferrable-types": [1, { ignoreParameters: true }],
                "@typescript-eslint/member-delimiter-style": [
                    0,
                    {
                        multiline: {
                            delimiter: "semi",
                            requireLast: true,
                        },
                        singleline: {
                            delimiter: "semi",
                            requireLast: true,
                        },
                        multilineDetection: "brackets",
                    },
                ],
                "@typescript-eslint/no-use-before-define": 1,
                "@typescript-eslint/no-this-alias": [1, { allowedNames: ["self"] }],
                "@typescript-eslint/no-require-imports": 2,
                "@typescript-eslint/no-unsafe-return": 0,
                "@typescript-eslint/no-explicit-any": 1,
                "@typescript-eslint/explicit-module-boundary-types": ["error"],
                "@typescript-eslint/restrict-template-expressions": 0,
                "@typescript-eslint/restrict-plus-operands": 0,
                "@typescript-eslint/ban-types": [
                    "error",
                    {
                        types: {
                            Function: false,
                        },
                    },
                ],

                // angular-eslint
                "@angular-eslint/component-selector": [
                    "error",
                    {
                        type: "element",
                        prefix: ["ap", "app", "ac", "lz"],
                        style: "kebab-case",
                    },
                ],
                "@angular-eslint/sort-ngmodule-metadata-arrays": 1, //
                "@angular-eslint/contextual-decorator": 2,
                "@angular-eslint/no-pipe-impure": 2,
                "@angular-eslint/no-input-rename": 0,
                "@angular-eslint/prefer-on-push-component-change-detection": 2,
                "@angular-eslint/component-max-inline-declarations": 2,
                "@angular-eslint/no-conflicting-lifecycle": 1,
                "@angular-eslint/prefer-output-readonly": 1,
                "@angular-eslint/use-component-selector": 2,
                "@angular-eslint/use-component-view-encapsulation": 0,
                "@angular-eslint/component-class-suffix": 2,
                "@angular-eslint/directive-class-suffix": 2,
                "@angular-eslint/no-host-metadata-property": 2,
                "@angular-eslint/no-queries-metadata-property": 2,
                "@angular-eslint/use-lifecycle-interface": 1,
                "@angular-eslint/pipe-prefix": [2, { prefixes: ["ap", "app", "lz", "ac"] }],
                "@angular-eslint/no-output-on-prefix": 0,
                "billing-rmi-rules/no-round-parentheses": 2,
            },
        },
    ],
};
