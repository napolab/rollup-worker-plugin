import { defineConfig } from "rollup";
import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";
import { externals } from "rollup-plugin-node-externals";
import tsConfigPaths from "rollup-plugin-tsconfig-paths";

const out = ".";

export const config = defineConfig({
  input: {
    index: "src/index.ts",
    "rollup-plugin": "src/rollup-plugin.ts"
  },
  output: [
    {
      format: "esm",
      entryFileNames: "[name].mjs",
      dir: out,
      sourcemap: true,
    },
    {
      format: "cjs",
      entryFileNames: "[name].cjs",
      dir: out,
      sourcemap: true,
    },
  ],
  plugins: [externals(), tsConfigPaths(), esbuild()],
});

export const typeConfig = defineConfig({
  input: config.input,
  output: { dir: out },
  plugins: [...config.plugins, dts({ tsconfig: "./tsconfig.json" })],
});

export default [config, typeConfig];
