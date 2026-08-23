import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const publicDirectory = join(projectRoot, "public");
const scriptPaths = [
  "data/exam-catalog.js",
  "data/exam-2022-1.js",
  "data/exam-explanations-2022-1.js",
  "app.js",
];

await mkdir(publicDirectory, { recursive: true });
const scriptContents = await Promise.all(
  scriptPaths.map((path) => readFile(join(projectRoot, path), "utf8")),
);

await writeFile(
  join(publicDirectory, "app-bundle.js"),
  scriptContents.join("\n\n"),
  "utf8",
);
await copyFile(join(projectRoot, "og.png"), join(publicDirectory, "og.png"));

console.log("Synced CBT data, application script, and social preview.");
