# @naporin0624/worker

rollup + esbuild 環境で worker を使うためのライブラリ

## Install

```bash
npm i @naporin0624/worker
```

## Usage

rollup.config.mjs

```js
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
```

src/index.ts

```ts
import { execute } from "@naporin0624/worker";

import path from "./test.worker";


export const main = async () => {
  const worker = execute(path)("Hello, world!");

  worker.on("message", (message) => {
    console.log((message));
  });
};

void main();
```

src/test.worker.ts

```ts
import { parentPort } from "node:worker_threads";

import { create } from "@naporin0624/worker";

export default create<string>((workerData) => {
  parentPort?.postMessage({ welcome: workerData });
});

```
