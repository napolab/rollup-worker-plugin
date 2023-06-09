import { parentPort } from "node:worker_threads";

import { create } from "@napolab/worker_thread";

import { sum } from "./func";

export default create<{ id: string; a: number; b: number }>((workerData) => {
  parentPort?.postMessage({ welcome: workerData });
  parentPort?.postMessage({ welcome: sum(workerData.a, workerData.b) });
});
