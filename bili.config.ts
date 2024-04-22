import type { Config } from "bili";

const config: Config = {
  plugins: {
    typescript2: {
      tsconfigOverride: {
        include: ["src"]
      }
    }
  },
  extendRollupConfig: (config) => {
    config.outputConfig.exports = "auto";
    return config;
  },
  input: "src/index.ts",
  output: {
    format: ["umd", "umd-min", "esm", "cjs"],
    moduleName: "EternalNotations",
    sourceMap: false,
    fileName: (context, defaultFileName) => {
      switch (context.format) {
        case "umd":
          return context.minify
            ? "eternal_notations.min.js"
            : "eternal_notations.js";
        case "esm":
          return "eternal_notations.esm.js";
        case "cjs":
          return "eternal_notations.cjs.js";
        default:
          return defaultFileName;
      }
    }
  }
};

export default config;