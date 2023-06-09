import { init } from "@napolab/worker_thread";

import path from "./test.worker";

export const main = async () => {
  const worker1 = init(path)({ id: "1" });
  const worker2 = init(path)({ id: "2" });

  worker1.on("message", (message) => {
    console.log(message);
  });
  worker2.on("message", (message) => {
    console.log(message);
  });
};

void main();
