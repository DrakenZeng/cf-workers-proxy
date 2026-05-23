import { copyFile, mkdir, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(rootDir, "dist");
const entryArg = process.argv[2] || process.env.WORKER_ENTRY || "_worker.js";
const entryMap = {
  _worker: "_worker.js",
  worker: "_worker.js",
  docker: "docker.js",
};
const entryFile = entryMap[entryArg] || entryArg;

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });
await copyFile(resolve(rootDir, entryFile), resolve(outDir, "_worker.js"));

console.log(`Pages build output written to ${outDir} using ${entryFile}`);
