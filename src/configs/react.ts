import type { Config } from "eslint/config";
import { defineConfig } from "eslint/config";
import pluginReact from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

export default function reactConfig(): Config[] {
  return defineConfig([
    {
      files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,mjsx,tsx,mtsx}"],
      ...pluginReact.configs.flat["recommended"]
    },

    {
      files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,mjsx,tsx,mtsx}"],
      ...pluginReact.configs.flat["jsx-runtime"]
    },

    reactHooks.configs.flat["recommended-latest"],
    reactRefresh.configs.vite, // Note: Only for Vite

    {
      files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,mjsx,tsx,mtsx}"],
      settings: {
        react: {
          version: "detect"
        }
      },
      languageOptions: {
        ecmaVersion: 2022,
        // parserOptions: {
        //   ecmaFeatures: {
        //     jsx: true
        //   }
        // },
        globals: {
          ...globals.serviceworker,
          ...globals.browser
        }
      }
    }

    // Rules
    // {
    //   rules: {}
    // }
  ]);
}
