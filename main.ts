// news-image-20261123 — one-day world news front page (23 November 2026).
// The page is laid out in design.html and rendered once to entry.png, which is
// committed with the entry. This program checks the committed image and writes
// it to the output directory, so two runs write byte-identical files.

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(here, "entry.png");
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputPath = join(outputDir, "entry.png");

const MAX_BYTES = 1024 * 1024;
const SIDE = 1024;
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

const bytes = readFileSync(sourcePath);

if (bytes.length === 0) throw new Error("entry.png is empty");
if (bytes.length > MAX_BYTES) throw new Error(`entry.png is ${bytes.length} bytes, over the 1 MiB cap`);
if (!bytes.subarray(0, 8).equals(PNG_SIGNATURE)) throw new Error("entry.png is not a PNG");

// IHDR follows the 8-byte signature: 4-byte length, "IHDR", width, height.
const width = bytes.readUInt32BE(16);
const height = bytes.readUInt32BE(20);
if (width !== SIDE || height !== SIDE) {
  throw new Error(`entry.png is ${width}x${height}, expected ${SIDE}x${SIDE}`);
}

mkdirSync(outputDir, { recursive: true });
copyFileSync(sourcePath, outputPath);

const sha256 = createHash("sha256").update(bytes).digest("hex");
console.log(`wrote ${outputPath} (${bytes.length} bytes, ${width}x${height}, sha256 ${sha256})`);
