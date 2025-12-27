import type { Config } from "eslint/config";
import { defineConfig } from "eslint/config";
import pluginReact from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

interface Params {
  platform: "recommended" | "vite" | "next";
}

export default function reactConfig(params: Params): Config[] {
  return defineConfig(
    {
      files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,mjsx,tsx,mtsx}"],
      ...pluginReact.configs.flat["recommended"]
    },

    {
      files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,mjsx,tsx,mtsx}"],
      ...pluginReact.configs.flat["jsx-runtime"]
    },

    // React Hooks
    reactHooks.configs.flat["recommended-latest"],

    // React Refresh
    params.platform === "vite"
      ? reactRefresh.configs.vite
      : params.platform === "next"
        ? reactRefresh.configs.next
        : reactRefresh.configs.recommended,

    // Rules
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
  );
}
