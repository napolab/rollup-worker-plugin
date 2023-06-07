import { worker } from "@naporin0624/worker/rollup-plugin";
import { defineConfig } from "rollup";
import esbuild from "rollup-plugin-esbuild";
import { externals } from "rollup-plugin-node-externals";

const out = "dist";

export const config = defineConfig({
  input: {
    index: "src/index.ts",
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
  plugins: [externals(), esbuild(), worker()],
});

export default [config];
