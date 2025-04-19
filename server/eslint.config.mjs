import { defineConfig, globalIgnores } from "eslint/config"
import { fixupConfigRules } from "@eslint/compat"
import globals from "globals"
import path from "node:path"
import { fileURLToPath } from "node:url"
import js from "@eslint/js"
import { FlatCompat } from "@eslint/eslintrc"
import tseslint from "typescript-eslint"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default defineConfig([
  globalIgnores(["**/dist", "**/.eslintrc.cjs", "**/vite.config.ts", "**/eslint.config.mjs"]),

  ...tseslint.configs.recommendedTypeChecked,

  { files: ["**/*.ts", "**/*.tsx"] },

  {
    extends: fixupConfigRules(compat.extends("eslint:recommended")),

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        project: ["./tsconfig.json"],
      },
    },

    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    },
  },
])
//   root: true,
//   env: { es2020: true },
//   extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
//   ignorePatterns: ["dist", ".eslintrc.cjs"],
//   parser: "@typescript-eslint/parser",
//   plugins: [],
//   rules: {
//     "@typescript-eslint/strict-boolean-expressions": "error",
//     "@typescript-eslint/no-unsafe-argument": "error",
//     "@typescript-eslint/no-unsafe-assignment": "error",
//     "@typescript-eslint/no-unsafe-call": "error",
//     "@typescript-eslint/no-unsafe-member-access": "error",
//     "@typescript-eslint/no-unsafe-return": "error",
//     "@typescript-eslint/restrict-template-expressions": "error",
//     "@typescript-eslint/no-explicit-any": "error",
//     "@typescript-eslint/no-unnecessary-type-assertion": "error",
//     "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
//     "@typescript-eslint/no-unnecessary-condition": "error",
//     "@typescript-eslint/no-non-null-assertion": "error",
//     "@typescript-eslint/explicit-module-boundary-types": "error",
//     "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
//     "@typescript-eslint/no-floating-promises": "error",
//     "@typescript-eslint/require-await": "error",
//     "@typescript-eslint/prefer-nullish-coalescing": "error",
//     "@typescript-eslint/prefer-readonly": "error",
//     "@typescript-eslint/prefer-reduce-type-parameter": "error",
//     "@typescript-eslint/array-type": ["error", { default: "array-simple" }],
//   },
// }
