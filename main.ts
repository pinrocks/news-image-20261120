import { chmodSync, existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const TARGET_WIDTH = 1024;
const TARGET_HEIGHT = 1024;
const MAX_PNG_BYTES = 1_048_576;

const CRC32_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) !== 0 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[i] = c >>> 0;
  }
  return table;
})();

function crc32(slice: Uint8Array): number {
  let crc = 0xffffffff;
  for (let i = 0; i < slice.byteLength; i++) {
    crc = CRC32_TABLE[(crc ^ slice[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function verifyWholePng(buf: Buffer): void {
  if (buf.byteLength < 57) {
    throw new Error(`Invalid PNG: buffer too short (${buf.byteLength} bytes)`);
  }
  if (buf.byteLength > MAX_PNG_BYTES) {
    throw new Error(`PNG exceeds 1 MiB cap: ${buf.byteLength} > ${MAX_PNG_BYTES}`);
  }
  if (!buf.subarray(0, 8).equals(PNG_MAGIC)) {
    throw new Error("Invalid PNG signature bytes");
  }

  let offset = 8;
  let chunkIndex = 0;
  let idatBytes = 0;
  let sawIend = false;

  while (offset < buf.byteLength) {
    if (sawIend) {
      throw new Error("Trailing bytes found after PNG IEND chunk");
    }
    if (offset + 12 > buf.byteLength) {
      throw new Error(`Truncated PNG chunk header at offset ${offset}`);
    }
    const dataLen = buf.readUInt32BE(offset);
    const type = buf.subarray(offset + 4, offset + 8).toString("ascii");
    const dataStart = offset + 8;
    const dataEnd = dataStart + dataLen;
    const crcOffset = dataEnd;
    if (crcOffset + 4 > buf.byteLength) {
      throw new Error(`Truncated PNG chunk ${type} payload at offset ${offset}`);
    }

    const expectedCrc = buf.readUInt32BE(crcOffset);
    const actualCrc = crc32(buf.subarray(offset + 4, crcOffset));
    if (actualCrc !== expectedCrc) {
      throw new Error(`CRC32 mismatch in PNG chunk ${type}`);
    }

    if (chunkIndex === 0) {
      if (type !== "IHDR" || dataLen !== 13) {
        throw new Error(`First PNG chunk must be 13-byte IHDR, got ${type} (${dataLen})`);
      }
      const width = buf.readUInt32BE(dataStart);
      const height = buf.readUInt32BE(dataStart + 4);
      const bitDepth = buf[dataStart + 8];
      const colorType = buf[dataStart + 9];
      const compressionMethod = buf[dataStart + 10];
      const filterMethod = buf[dataStart + 11];
      const interlaceMethod = buf[dataStart + 12];
      if (width !== TARGET_WIDTH || height !== TARGET_HEIGHT) {
        throw new Error(`Expected ${TARGET_WIDTH}x${TARGET_HEIGHT} PNG, got ${width}x${height}`);
      }
      if (![1, 2, 4, 8, 16].includes(bitDepth) || ![0, 2, 3, 4, 6].includes(colorType)) {
        throw new Error(`Unsupported PNG bitDepth=${bitDepth} colorType=${colorType}`);
      }
      if (compressionMethod !== 0 || filterMethod !== 0 || (interlaceMethod !== 0 && interlaceMethod !== 1)) {
        throw new Error(`Invalid PNG header flags: comp=${compressionMethod} filter=${filterMethod} interlace=${interlaceMethod}`);
      }
    } else if (type === "IDAT") {
      idatBytes += dataLen;
    } else if (type === "IEND") {
      if (dataLen !== 0) {
        throw new Error(`Invalid non-empty IEND chunk (${dataLen} bytes)`);
      }
      sawIend = true;
    }

    offset = crcOffset + 4;
    chunkIndex++;
  }

  if (!sawIend || idatBytes === 0) {
    throw new Error(`Incomplete PNG stream: sawIend=${sawIend}, idatBytes=${idatBytes}`);
  }
}

function main(): void {
  const sourceUrl = new URL("./entry.png", import.meta.url);
  const pngBytes = readFileSync(fileURLToPath(sourceUrl));

  verifyWholePng(pngBytes);

  const outputDir = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "/output");
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  const outPath = join(outputDir, "entry.png");
  writeFileSync(outPath, pngBytes, { mode: 0o644 });
  chmodSync(outPath, 0o644);

  const writtenStat = statSync(outPath);
  if (writtenStat.size !== pngBytes.byteLength) {
    throw new Error(`Short write to ${outPath}: ${writtenStat.size} !== ${pngBytes.byteLength}`);
  }
}

main();

