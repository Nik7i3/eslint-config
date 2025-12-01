import type { Config } from "eslint/config";
import { defineConfig } from "eslint/config";
import { importX } from "eslint-plugin-import-x";
import type { TypeScriptResolverOptions } from "eslint-import-resolver-typescript";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";

export interface ImportXConfigParams {
  resolverOptions?: TypeScriptResolverOptions;
}

export default function importXConfig(params: ImportXConfigParams): Config[] {
  return defineConfig([
    // @ts-ignore
    importX.flatConfigs.recommended,
    // @ts-ignore
    importX.flatConfigs.typescript,

    {
      files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
      settings: {
        "import-x/resolver-next": [
          createTypeScriptImportResolver({
            alwaysTryTypes: true,
            ...params.resolverOptions
          })
        ]
      }
    },

    // Rules
    {
      rules: {
        "import-x/consistent-type-specifier-style": [
          "error",
          "prefer-top-level"
        ]
      }
    }
  ]);
}
