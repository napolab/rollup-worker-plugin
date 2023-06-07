import { execute } from "@napolab/worker_thread";

import path from "./test.worker";

export const main = async () => {
  const worker = execute(path)("Hello, world!");

  worker.on("message", (message) => {
    console.log(message);
  });
};

void main();
