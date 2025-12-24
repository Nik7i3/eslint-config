import type { Config } from "eslint/config";
import { defineConfig } from "eslint/config";
import eslintPluginUnicorn from "eslint-plugin-unicorn";

export default function unicornConfig(): Config[] {
  return defineConfig([
    eslintPluginUnicorn.configs.recommended,

    // Rules
    {
      rules: {
        "unicorn/filename-case": ["off"],
        "unicorn/no-null": ["off"],
        "unicorn/prevent-abbreviations": ["off"]
      }
    }
  ]);
}
