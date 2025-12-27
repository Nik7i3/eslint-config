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
  configs?: {
    typescript?: boolean | { tsconfigRootDir?: string };
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

  // Typescript
  if (configs.typescript !== false) {
    final.push(
      ...typescriptConfig(
        typeof configs.typescript !== "boolean" ? configs.typescript : {}
      )
    );
  }

  // Import X
  if (configs.importX !== false) {
    final.push(
      ...importXConfig(
        typeof configs.importX !== "boolean" ? configs.importX : {}
      )
    );
  }

  // Unicorn
  if (configs.unicorn) {
    final.push(...unicornConfig());
  }

  // React
  if (configs.react) {
    // Note: Only Vite for now
    final.push(...reactConfig({ platform: "vite" }));
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
          : globals.node
    }
  });

  return final;
}
