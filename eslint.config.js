import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import pluginVitestConfig from "eslint-plugin-vitest-globals/configs/recommended.js";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  { files: ['**/*.jsx'], languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  pluginReactConfig,
  pluginVitestConfig,
  eslintConfigPrettier
];