import terser from "@rollup/plugin-terser";
import ts from "rollup-plugin-ts";
export default {
  external: ["break_eternity.js"],
  plugins: [ts()],
  input: "src/index.ts",
  output: [
    {
<<<<<<< Updated upstream
      file: "eternal_notations.js",
=======
      file: "dist/eternal_notations.js",
>>>>>>> Stashed changes
      format: "umd",
      name: "EternalNotations",
      globals: { "break_eternity.js": "Decimal" },
    },
    {
<<<<<<< Updated upstream
      file: "eternal_notations.cjs.js",
      format: "cjs",
    },
    {
      file: "eternal_notations.esm.js",
      format: "es",
    },
    {
      file: "eternal_notations.min.js",
=======
      file: "dist/eternal_notations.cjs.js",
      format: "cjs",
    },
    {
      file: "dist/eternal_notations.esm.js",
      format: "es",
    },
    {
      file: "dist/eternal_notations.min.js",
>>>>>>> Stashed changes
      format: "iife",
      name: "EternalNotations",
      globals: { "break_eternity.js": "Decimal" },
      plugins: [terser()],
    },
  ],
};
