import type { Config } from "eslint/config";
import { defineConfig } from "eslint/config";
import js from "@eslint/js";

export default function javascriptConfig(): Config[] {
  return defineConfig(
    {
      files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,mjsx,tsx,mtsx}"],
      plugins: { js },
      extends: ["js/recommended"]
    },

    // Rules
    {
      files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,mjsx,tsx,mtsx}"],
      rules: {
        // Possible Problems
        "array-callback-return": ["error"],
        // "no-duplicate-imports": ["error"],

        // Suggestions
        curly: ["warn", "all"],
        eqeqeq: ["warn"],
        "no-unused-vars": [
          "error",
          {
            vars: "all",
            args: "all",
            argsIgnorePattern: "^_",
            caughtErrors: "all",
            caughtErrorsIgnorePattern: "^ignore",
            destructuredArrayIgnorePattern: "^_",
            ignoreRestSiblings: false,
            ignoreUsingDeclarations: false,
            reportUsedIgnorePattern: false
          }
        ]
      }
    }
  );
}
