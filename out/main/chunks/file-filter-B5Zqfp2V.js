import ignore from "ignore";
import { open } from "node:fs/promises";
const DEFAULT_PATTERNS = [
  ".git",
  "node_modules",
  "bower_components",
  "dist",
  "build",
  "out",
  ".next",
  ".cache",
  ".venv",
  "venv",
  "site-packages",
  "__pycache__",
  ".DS_Store",
  "Thumbs.db",
  "*.min.js",
  "*.min.css",
  "*.map",
  "*.lock",
  "package-lock.json",
  "bun.lockb",
  "yarn.lock",
  "pnpm-lock.yaml",
  // Binary / compiled files
  "*.dylib",
  "*.so",
  "*.dll",
  "*.exe",
  "*.o",
  "*.a",
  "*.lib",
  "*.class",
  "*.pyc",
  "*.pyo",
  "*.node",
  "*.wasm",
  // Images (only non-workspace icon formats)
  "*.svg",
  "*.ico",
  "*.icns",
  // Audio / video
  "*.mp3",
  "*.mp4",
  "*.wav",
  "*.mov",
  "*.webm",
  // Unity / C#
  "*.meta",
  "*.unity",
  "*.prefab",
  "*.mat",
  "*.asset",
  "*.shader",
  "*.cginc",
  "*.asmdef",
  "*.asmref",
  "*.physicMaterial",
  "*.physicsMaterial2D",
  "*.controller",
  "*.overrideController",
  "*.mask",
  "*.lighting",
  "*.terrainlayer",
  "Library",
  "Temp",
  "Obj",
  "Logs",
  "UserSettings",
  "*.pdb",
  // Fonts
  "*.ttf",
  "*.otf",
  "*.woff",
  "*.woff2",
  // Design files
  "*.psd",
  "*.psb",
  // 3D models
  "*.fbx",
  "*.obj",
  "*.blend",
  // Locale / resource packs
  "*.pak",
  // Bundled frameworks (e.g. Vuplex Chromium)
  "*.bundle",
  "*.framework",
  // Archives
  "*.zip",
  "*.tar",
  "*.gz",
  "*.rar",
  "*.7z",
  // Java / Android
  "*.jar",
  "*.aar"
];
const BINARY_SAMPLE_SIZE = 8e3;
function hasTextBom(sample) {
  if (sample.length >= 3 && sample[0] === 239 && sample[1] === 187 && sample[2] === 191) {
    return true;
  }
  if (sample.length >= 2) {
    const first = sample[0];
    const second = sample[1];
    if (first === 255 && second === 254 || first === 254 && second === 255) {
      return true;
    }
  }
  return false;
}
function isBinarySample(sample) {
  if (sample.length === 0 || hasTextBom(sample)) {
    return false;
  }
  let suspiciousBytes = 0;
  for (const byte of sample) {
    if (byte === 0) {
      return true;
    }
    const isControlChar = byte < 7 || byte > 14 && byte < 32 || byte === 127;
    if (isControlChar) {
      suspiciousBytes++;
    }
  }
  return suspiciousBytes / sample.length > 0.1;
}
async function detectBinaryFile(fullPath) {
  let handle;
  try {
    handle = await open(fullPath, "r");
    const buffer = Buffer.alloc(BINARY_SAMPLE_SIZE);
    const { bytesRead } = await handle.read(
      buffer,
      0,
      BINARY_SAMPLE_SIZE,
      0
    );
    return isBinarySample(buffer.subarray(0, bytesRead));
  } catch {
    return false;
  } finally {
    try {
      await handle?.close();
    } catch {
    }
  }
}
function getDefaultPatterns() {
  return [...DEFAULT_PATTERNS];
}
function createFileFilter() {
  const ig = ignore().add(DEFAULT_PATTERNS);
  const binaryCache = /* @__PURE__ */ new Map();
  return {
    isIgnored: (relativePath) => ig.ignores(relativePath),
    isBinaryFile: (fullPath) => {
      let cached = binaryCache.get(fullPath);
      if (!cached) {
        cached = detectBinaryFile(fullPath);
        binaryCache.set(fullPath, cached);
      }
      return cached;
    },
    invalidateBinaryCache: (paths) => {
      if (!paths) {
        binaryCache.clear();
        return;
      }
      for (const path of paths) {
        binaryCache.delete(path);
      }
    },
    ignoreInstance: ig
  };
}
export {
  createFileFilter as c,
  getDefaultPatterns as g
};
