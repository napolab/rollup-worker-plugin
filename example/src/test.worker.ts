import { parentPort } from "node:worker_threads";

import { create } from "@naporin0624/worker";

import { sum } from "./func";

export default create<string>((workerData) => {
  parentPort?.postMessage({ welcome: workerData });
  parentPort?.postMessage({ welcome: sum(1, 1) });
});