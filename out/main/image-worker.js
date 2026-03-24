import { workerData, parentPort } from "node:worker_threads";
import { createHash } from "node:crypto";
import { mkdirSync, readdirSync, unlinkSync, statSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";
const NATIVE_FORMATS = /* @__PURE__ */ new Set(["png", "jpeg", "gif", "webp"]);
const MAX_CACHE = 500;
const cacheDir = workerData?.cacheDir ?? null;
const memCache = /* @__PURE__ */ new Map();
if (cacheDir) {
  mkdirSync(cacheDir, { recursive: true });
}
function hashKey(path, size) {
  return createHash("sha256").update(`${path}\0${size}`).digest("hex").slice(0, 24);
}
function evictIfNeeded() {
  if (memCache.size <= MAX_CACHE) return;
  const firstKey = memCache.keys().next().value;
  if (firstKey !== void 0) {
    memCache.delete(firstKey);
  }
}
function diskCacheName(hash, mtimeMs) {
  return `${hash}_${mtimeMs}.png`;
}
function readDiskCache(hash, mtimeMs) {
  if (!cacheDir) return null;
  const filePath = join(cacheDir, diskCacheName(hash, mtimeMs));
  try {
    const buf = readFileSync(filePath);
    return `data:image/png;base64,${buf.toString("base64")}`;
  } catch {
    return null;
  }
}
function writeDiskCache(hash, mtimeMs, pngBuffer) {
  if (!cacheDir) return;
  try {
    for (const entry of readdirSync(cacheDir)) {
      if (entry.startsWith(`${hash}_`) && entry.endsWith(".png")) {
        if (entry !== diskCacheName(hash, mtimeMs)) {
          unlinkSync(join(cacheDir, entry));
        }
      }
    }
  } catch {
  }
  try {
    writeFileSync(join(cacheDir, diskCacheName(hash, mtimeMs)), pngBuffer);
  } catch {
  }
}
async function thumbnail(path, size) {
  const memKey = `${path}\0${size}`;
  const cached = memCache.get(memKey);
  if (cached) return cached;
  const hash = hashKey(path, size);
  let mtimeMs = 0;
  try {
    mtimeMs = Math.floor(statSync(path).mtimeMs);
  } catch {
  }
  const diskHit = readDiskCache(hash, mtimeMs);
  if (diskHit) {
    evictIfNeeded();
    memCache.set(memKey, diskHit);
    return diskHit;
  }
  const buf = await sharp(path).resize(size, size, { fit: "cover" }).png().toBuffer();
  const dataUrl = `data:image/png;base64,${buf.toString("base64")}`;
  writeDiskCache(hash, mtimeMs, buf);
  evictIfNeeded();
  memCache.set(memKey, dataUrl);
  return dataUrl;
}
async function full(path) {
  const meta = await sharp(path).metadata();
  const width = meta.width ?? 0;
  const height = meta.height ?? 0;
  const format = meta.format ?? "";
  if (NATIVE_FORMATS.has(format)) {
    return {
      url: `collab-file://${encodeURIComponent(path).replace(/%2F/g, "/")}`,
      width,
      height
    };
  }
  const buf = await sharp(path).png().toBuffer();
  return {
    url: `data:image/png;base64,${buf.toString("base64")}`,
    width,
    height
  };
}
function invalidate(paths) {
  const hashes = /* @__PURE__ */ new Set();
  for (const path of paths) {
    for (const key of memCache.keys()) {
      if (key.startsWith(`${path}\0`)) {
        memCache.delete(key);
        const size = Number(key.split("\0")[1]);
        if (size) hashes.add(hashKey(path, size));
      }
    }
  }
  if (!cacheDir || hashes.size === 0) return;
  try {
    for (const entry of readdirSync(cacheDir)) {
      const prefix = entry.split("_")[0];
      if (hashes.has(prefix)) {
        unlinkSync(join(cacheDir, entry));
      }
    }
  } catch {
  }
}
if (!parentPort) {
  throw new Error("image-worker must run inside a Worker thread");
}
parentPort.on("message", async (msg) => {
  const resp = { id: msg.id };
  try {
    switch (msg.op) {
      case "thumbnail":
        resp.result = await thumbnail(msg.path, msg.size ?? 128);
        break;
      case "full":
        resp.result = await full(msg.path);
        break;
      case "invalidate":
        invalidate(msg.paths ?? []);
        break;
      default:
        resp.error = `Unknown op: ${msg.op}`;
    }
  } catch (err) {
    resp.error = err instanceof Error ? err.message : String(err);
  }
  parentPort.postMessage(resp);
});
