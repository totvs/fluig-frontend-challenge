import globals from "globals";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        jest: true,
      },

      ecmaVersion: 2022,
      sourceType: "module",
    },
  },
];
