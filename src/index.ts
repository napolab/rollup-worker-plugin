import { workerData, Worker } from "node:worker_threads";

declare const workerArgs: unique symbol;
export type WorkerPath<T> = string & {
  [workerArgs]: T;
};

export const create = <T>(callback: (workerData: T) => void): WorkerPath<T> => {
  callback(workerData);

  return "" as WorkerPath<T>;
};

export const execute =
  <T>(workerPath: WorkerPath<T>) =>
  (workerData: T) => {
    const worker = new Worker(workerPath, { workerData });

    return worker;
  };
