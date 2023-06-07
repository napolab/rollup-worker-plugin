import { parentPort } from "node:worker_threads";

import { create } from "@napolab/worker_thread";

import { sum } from "./func";

export default create<string>((workerData) => {
  parentPort?.postMessage({ welcome: workerData });
  parentPort?.postMessage({ welcome: sum(1, 1) });
});
