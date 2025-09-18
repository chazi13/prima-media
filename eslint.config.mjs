import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:@tanstack/eslint-plugin-query/recommended",
    "plugin:prettier/recommended",
  ),
  ...compat.plugins(
    "@typescript-eslint",
    "simple-import-sort",
    "unused-imports",
  ),
  ...compat.config({
    rules: {
      "unused-imports/no-unused-imports": "error",
      "prettier/prettier": ["error", { endOfLine: "auto" }],
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",

      // DO NOT TOUCH
      // These rules will disable red squiggly lines in VS Code
      "@typescript-eslint/dot-notation": "off",
      "@typescript-eslint/no-implied-eval": "off",
      "@typescript-eslint/no-throw-literal": "off",
      "@typescript-eslint/return-await": "off",
      // These rules need to be renabled since got turned off
      "dot-notation": ["error", { allowKeywords: true }],
      "no-implied-eval": "error",
      "no-new-func": "error",
      "no-throw-literal": "error",
      "no-return-await": "error",
    },
  }),
];

export default eslintConfig;
