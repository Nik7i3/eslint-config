import type { Config } from "eslint/config";
import { defineConfig } from "eslint/config";
import tsEslint from "typescript-eslint";

export default function typescriptConfig(): Config[] {
  return defineConfig([
    tsEslint.configs.strictTypeChecked,
    tsEslint.configs.stylisticTypeChecked,

    {
      files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,mjsx,tsx,mtsx}"],
      rules: {
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": [
          "error",
          {
            vars: "all",
            args: "all",
            argsIgnorePattern: "^_",
            caughtErrors: "all",
            caughtErrorsIgnorePattern: "^_",
            destructuredArrayIgnorePattern: "^_",
            ignoreRestSiblings: false,
            ignoreUsingDeclarations: false,
            reportUsedIgnorePattern: false
          }
        ]
      }
    }
  ]);
}
