import { init } from "@napolab/worker_thread";

import test1WorkerPath from "./test.worker";
import test2WorkerPath from "./test2.worker"

export const main = async () => {
  const worker1 = init(test1WorkerPath)({ id: "worker1", a: 1, b: 2 });
  const worker2 = init(test2WorkerPath)({ id: "worker2", a: 2, b: 3 });

  worker1.on("message", (message) => {
    console.log("worker1", message);
  });
  worker2.on("message", (message) => {
    console.log("worker2", message);
  });
};

void main();
