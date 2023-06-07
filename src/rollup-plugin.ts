import { basename } from "node:path"

import { build } from "esbuild";

import type { Plugin } from "rollup";

type Options = {
  extensions?: string;
}
export const worker = (options?: Options): Plugin => {
  return {
    name: "workerPlugins",
    async transform(code, id) {
      if (!id.endsWith(options?.extensions ?? ".worker.ts")) return null;

      const result = await build({
        entryPoints: [id],
        format: "cjs",
        bundle: true,
        platform: "node",
        write: false,
        sourcemap: "inline",
        target: "es2018",
      });
      const [head] = result.outputFiles;
      const fileName = id.replace(".ts", ".cjs");

      const assetId = this.emitFile({
        type: "asset",
        name: basename(fileName),
        source: head.text,
      });

      this.addWatchFile(assetId);

      return {
        code: `export default new URL(import.meta.ROLLUP_FILE_URL_${assetId}).pathname;`,
        map: { mappings: "" },
      };
    },
  };
};