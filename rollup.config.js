import terser from "@rollup/plugin-terser";
import ts from "rollup-plugin-ts";
export default {
  external: ["break_eternity.js"],
  plugins: [ts()],
  input: "src/index.ts",
  output: [
    {
      file: "dist/eternal_notations.js",
      format: "umd",
      name: "eternal_notations",
      globals: { "break_eternity.js": "Decimal" },
    },
    {
      file: "dist/eternal_notations.cjs.js",
      format: "cjs",
    },
    {
      file: "dist/eternal_notations.esm.js",
      format: "es",
    },
    {
      file: "dist/eternal_notations.min.js",
      format: "iife",
      name: "eternal_notations",
      globals: { "break_eternity.js": "Decimal" },
      plugins: [terser()],
    },
  ],
};
