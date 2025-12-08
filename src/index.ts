import type { ConfigWithExtends } from "typescript-eslint";
import globals from "globals";
import javascriptConfig from "./configs/javascript";
import typescriptConfig from "./configs/typescript";
import type { ImportXConfigParams } from "./configs/importX";
import importXConfig from "./configs/importX";
import unicornConfig from "./configs/unicorn";
import reactConfig from "./configs/react";
import prettierConfig from "./configs/prettier";

type Platform = "web" | "node";

interface Params {
  platform: Platform;
  languageOptions: ConfigWithExtends["languageOptions"];
  configs?: {
    typescript?: boolean;
    importX?: boolean | ImportXConfigParams;
    unicorn?: boolean;
    react?: boolean;
  };
  extends?: ConfigWithExtends[];
}

export function createConfig(params: Params): ConfigWithExtends[] {
  const configs: Required<Params["configs"]> = {
    typescript: true,
    importX: false,
    unicorn: true,
    react: false,
    ...params.configs
  };

  const final: ConfigWithExtends[] = [...javascriptConfig()];

  if (configs.typescript) {
    final.push(...typescriptConfig());
  }

  if (configs.importX !== false) {
    final.push(
      ...importXConfig(
        typeof configs.importX !== "boolean" ? configs.importX : {}
      )
    );
  }

  if (configs.unicorn) {
    final.push(...unicornConfig());
  }

  if (configs.react) {
    final.push(...reactConfig());
  }

  // Prettier
  final.push(...prettierConfig());

  if (params.extends !== undefined) {
    final.push(...params.extends);
  }

  final.push({
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,mjsx,tsx,mtsx}"],
    languageOptions: {
      ecmaVersion: params.platform === "web" ? 2022 : 2024,
      globals:
        params.platform === "web"
          ? {
              ...globals.serviceworker,
              ...globals.browser
            }
          : globals.node,
      ...params.languageOptions,
      parserOptions: {
        projectService: true,
        ...params.languageOptions?.parserOptions
      }
    }
  });

  return final;
}
