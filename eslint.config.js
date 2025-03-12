
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true, allowExportNames: ['badgeVariants', 'buttonVariants'] },
      ],
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-empty-interface": ["error", { "allowSingleExtends": true }],
      "@typescript-eslint/no-empty-object-type": "off",
      // Allow using any when needed to fix specific type issues
      "@typescript-eslint/no-explicit-any": "warn",
      // Enforce consistent import ordering
      "sort-imports": ["error", {
        "ignoreCase": true,
        "ignoreDeclarationSort": true, // Let eslint-plugin-import handle this
        "ignoreMemberSort": false,
        "memberSyntaxSortOrder": ["none", "all", "multiple", "single"]
      }],
    },
  }
);
