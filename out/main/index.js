import { utilityProcess, app, ipcMain, shell, dialog, Menu, Notification, powerMonitor, BrowserWindow, nativeTheme, protocol, session, net, webContents, screen } from "electron";
import { execSync, execFileSync } from "node:child_process";
import * as path from "node:path";
import { join, dirname, basename, extname, relative, isAbsolute, resolve as resolve$1 } from "node:path";
import { pathToFileURL } from "node:url";
import * as fs from "node:fs";
import { writeFileSync, renameSync, readFileSync, mkdirSync, realpathSync, existsSync, appendFileSync, accessSync, unlinkSync, rmSync, copyFileSync, chmodSync } from "node:fs";
import { homedir, tmpdir } from "node:os";
import * as crypto from "node:crypto";
import { randomUUID } from "node:crypto";
import { readdir, stat, readFile, writeFile, rename, mkdir, access } from "node:fs/promises";
import "ignore";
import { Worker } from "node:worker_threads";
import { PostHog } from "posthog-node";
import fm from "front-matter";
import { c as createFileFilter } from "./chunks/file-filter-B5Zqfp2V.js";
import { cruise } from "dependency-cruiser";
import extractTSConfig from "dependency-cruiser/config-utl/extract-ts-config";
import { parser } from "@lezer/python";
import Parser from "@postlight/parser";
import { createServer } from "node:net";
import * as pty from "node-pty";
import * as os from "os";
import * as crypto$1 from "crypto";
import electronUpdater from "electron-updater";
import __cjs_mod__ from "node:module";
const __filename = import.meta.filename;
const __dirname = import.meta.dirname;
const require2 = __cjs_mod__.createRequire(import.meta.url);
const BASE = join(homedir(), ".collaborator");
const COLLAB_DIR$1 = BASE;
const IMAGE_EXTENSIONS = /* @__PURE__ */ new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".bmp",
  ".tiff",
  ".tif",
  ".avif",
  ".heic",
  ".heif"
]);
function isImageFile(filePath) {
  const dot = filePath.lastIndexOf(".");
  if (dot === -1) return false;
  return IMAGE_EXTENSIONS.has(filePath.slice(dot).toLowerCase());
}
function shouldIncludeEntry(dirPath, entry, filter, rootPath) {
  const isDirectory = entry.isDirectory();
  if (!filter || !rootPath) {
    return true;
  }
  if (dirPath !== rootPath && !dirPath.startsWith(rootPath + "/")) {
    return true;
  }
  const prefix = dirPath.length > rootPath.length ? dirPath.slice(rootPath.length + 1) + "/" : "";
  const relPath = prefix + entry.name;
  return !filter.isIgnored(
    isDirectory ? `${relPath}/` : relPath
  );
}
async function shouldIncludeEntryWithContent(dirPath, entry, filter, rootPath) {
  if (!shouldIncludeEntry(dirPath, entry, filter, rootPath)) {
    return false;
  }
  if (!filter || entry.isDirectory()) {
    return true;
  }
  const fullPath = join(dirPath, entry.name);
  if (isImageFile(entry.name)) {
    return true;
  }
  return !await filter.isBinaryFile(fullPath);
}
async function countTreeFiles(dirPath, filter, rootPath) {
  let count = 0;
  const entries = await readdir(dirPath, { withFileTypes: true });
  for (const e of entries) {
    if (!await shouldIncludeEntryWithContent(dirPath, e, filter, rootPath)) {
      continue;
    }
    if (e.isDirectory()) {
      count += await countTreeFiles(
        join(dirPath, e.name),
        filter,
        rootPath
      );
    } else {
      count += 1;
    }
  }
  return count;
}
async function fsReadDir(dirPath, filter, rootPath) {
  const entries = await readdir(dirPath, { withFileTypes: true });
  const filtered = [];
  for (const entry of entries) {
    if (await shouldIncludeEntryWithContent(dirPath, entry, filter, rootPath)) {
      filtered.push(entry);
    }
  }
  return Promise.all(
    filtered.map(async (e) => {
      let createdAt = "";
      let modifiedAt = "";
      let fileCount;
      if (e.isFile()) {
        try {
          const s = await stat(join(dirPath, e.name));
          createdAt = s.birthtime.toISOString();
          modifiedAt = s.mtime.toISOString();
        } catch {
        }
      } else if (e.isDirectory()) {
        try {
          fileCount = await countTreeFiles(
            join(dirPath, e.name),
            filter,
            rootPath
          );
        } catch {
        }
      }
      const entry = {
        name: e.name,
        isDirectory: e.isDirectory(),
        isFile: e.isFile(),
        isSymlink: e.isSymbolicLink(),
        createdAt,
        modifiedAt
      };
      if (fileCount !== void 0) entry.fileCount = fileCount;
      return entry;
    })
  );
}
async function fsReadFile(filePath) {
  return readFile(filePath, "utf-8");
}
async function fsWriteFile(filePath, content, expectedMtime) {
  if (expectedMtime) {
    try {
      const before = await stat(filePath);
      if (before.mtime.toISOString() !== expectedMtime) {
        return {
          ok: false,
          mtime: before.mtime.toISOString(),
          conflict: true
        };
      }
    } catch {
    }
  }
  await writeFile(filePath, content, "utf-8");
  const after = await stat(filePath);
  return { ok: true, mtime: after.mtime.toISOString() };
}
function atomicWriteFileSync(filePath, data) {
  const tmpPath = `${filePath}.${randomUUID()}.tmp`;
  writeFileSync(tmpPath, data, "utf-8");
  renameSync(tmpPath, filePath);
}
async function fileExists$1(path2) {
  try {
    await access(path2);
    return true;
  } catch {
    return false;
  }
}
async function fsRename(oldPath, newName) {
  const dir = dirname(oldPath);
  let target = join(dir, newName);
  if (oldPath === target) return oldPath;
  const ext = newName.slice(newName.lastIndexOf("."));
  const stem = newName.slice(0, newName.lastIndexOf("."));
  let n = 2;
  while (await fileExists$1(target)) {
    target = join(dir, `${stem} ${n}${ext}`);
    n++;
  }
  await rename(oldPath, target);
  return target;
}
async function fsMkdir(dirPath) {
  await mkdir(dirPath, { recursive: true });
}
async function fsMove(oldPath, newParentDir) {
  const name = basename(oldPath);
  let target = join(newParentDir, name);
  if (oldPath === target) return oldPath;
  const ext = extname(name);
  const stem = ext ? name.slice(0, -ext.length) : name;
  let n = 2;
  while (await fileExists$1(target)) {
    target = join(newParentDir, ext ? `${stem} ${n}${ext}` : `${stem} ${n}`);
    n++;
  }
  await rename(oldPath, target);
  return target;
}
const DEFAULT_CONFIG$1 = {
  workspaces: [],
  active_workspace: -1,
  window_state: null,
  ui: {}
};
function configPath() {
  return join(COLLAB_DIR$1, "config.json");
}
function loadConfig() {
  try {
    const raw = readFileSync(configPath(), "utf-8");
    const parsed = JSON.parse(raw);
    let workspaces;
    let activeWorkspace;
    if (Array.isArray(parsed.workspaces)) {
      workspaces = parsed.workspaces.filter(
        (p) => typeof p === "string"
      );
      const rawIndex = typeof parsed.active_workspace === "number" ? parsed.active_workspace : -1;
      activeWorkspace = workspaces.length > 0 ? Math.max(0, Math.min(rawIndex, workspaces.length - 1)) : -1;
    } else if (typeof parsed.workspace_path === "string" && parsed.workspace_path !== "") {
      workspaces = [parsed.workspace_path];
      activeWorkspace = 0;
    } else {
      workspaces = [];
      activeWorkspace = -1;
    }
    return {
      workspaces,
      active_workspace: activeWorkspace,
      window_state: parsed.window_state ?? null,
      ui: parsed.ui && typeof parsed.ui === "object" ? parsed.ui : {}
    };
  } catch {
    return { ...DEFAULT_CONFIG$1, ui: {} };
  }
}
function saveConfig(config2) {
  const filePath = configPath();
  mkdirSync(dirname(filePath), { recursive: true });
  atomicWriteFileSync(filePath, JSON.stringify(config2, null, 2));
}
function getPref(config2, key) {
  return config2.ui[key] ?? null;
}
function setPref(config2, key, value) {
  config2.ui[key] = value;
  saveConfig(config2);
}
const NATIVE_EXTENSIONS = /* @__PURE__ */ new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp"
]);
let worker$2 = null;
let nextId = 1;
let cacheDir = null;
const pending$1 = /* @__PURE__ */ new Map();
function setThumbnailCacheDir(workspacePath2) {
  cacheDir = join(workspacePath2, ".collaborator", "thumbnails");
}
function ensureWorker() {
  if (worker$2) return worker$2;
  const w = new Worker(join(__dirname, "image-worker.js"), {
    workerData: { cacheDir }
  });
  w.on("message", (msg) => {
    const p = pending$1.get(msg.id);
    if (!p) return;
    pending$1.delete(msg.id);
    if (msg.error) {
      p.reject(new Error(msg.error));
    } else {
      p.resolve(msg.result);
    }
  });
  w.on("error", (err) => {
    for (const p of pending$1.values()) {
      p.reject(err);
    }
    pending$1.clear();
    worker$2 = null;
  });
  w.on("exit", () => {
    for (const p of pending$1.values()) {
      p.reject(new Error("Image worker exited unexpectedly"));
    }
    pending$1.clear();
    worker$2 = null;
  });
  worker$2 = w;
  return w;
}
function request(op, path2, extra) {
  const w = ensureWorker();
  const id = nextId++;
  return new Promise((resolve2, reject) => {
    pending$1.set(id, { resolve: resolve2, reject });
    w.postMessage({ id, op, path: path2, ...extra });
  });
}
function isInsideCacheDir(path2) {
  return cacheDir !== null && path2.startsWith(cacheDir + "/");
}
function getImageThumbnail(path2, size) {
  if (isInsideCacheDir(path2)) return Promise.resolve("");
  return request("thumbnail", path2, { size });
}
function isNativeImage(path2) {
  const dot = path2.lastIndexOf(".");
  if (dot === -1) return false;
  return NATIVE_EXTENSIONS.has(path2.slice(dot).toLowerCase());
}
function getImageFull(path2) {
  if (isInsideCacheDir(path2)) {
    return Promise.resolve({ url: "", width: 0, height: 0 });
  }
  if (isNativeImage(path2)) {
    const url = `collab-file://${encodeURIComponent(path2).replace(/%2F/g, "/")}`;
    return Promise.resolve({ url, width: 0, height: 0 });
  }
  return request("full", path2);
}
function invalidateImageCache(paths) {
  if (!worker$2) return;
  const filtered = paths.filter((p) => !isInsideCacheDir(p));
  if (filtered.length === 0) return;
  const id = nextId++;
  worker$2.postMessage({ id, op: "invalidate", path: "", paths: filtered });
}
async function fileExists(path2) {
  try {
    await access(path2);
    return true;
  } catch {
    return false;
  }
}
async function findImageInDir(dir, fileName) {
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isFile() && entry.name === fileName && isImageFile(entry.name)) {
        return join(dir, entry.name);
      }
    }
  } catch {
  }
  return null;
}
async function collectSubdirs(dir) {
  const result = [];
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory() && !entry.name.startsWith(".") && entry.name !== "node_modules") {
        result.push(join(dir, entry.name));
      }
    }
  } catch {
  }
  return result;
}
async function resolveImagePath(reference, fromNotePath, workspacePath2) {
  if (!workspacePath2) return null;
  const isRelative = reference.includes("/");
  if (isRelative) {
    const wsPrefix2 = workspacePath2.endsWith("/") ? workspacePath2 : workspacePath2 + "/";
    const noteDir2 = dirname(fromNotePath);
    const fromNote = join(noteDir2, reference);
    if ((fromNote === workspacePath2 || fromNote.startsWith(wsPrefix2)) && isImageFile(fromNote) && await fileExists(fromNote)) {
      return fromNote;
    }
    const fromRoot = join(workspacePath2, reference);
    if ((fromRoot === workspacePath2 || fromRoot.startsWith(wsPrefix2)) && isImageFile(fromRoot) && await fileExists(fromRoot)) {
      return fromRoot;
    }
    return null;
  }
  const ext = reference.lastIndexOf(".");
  if (ext === -1 || !IMAGE_EXTENSIONS.has(
    reference.slice(ext).toLowerCase()
  )) {
    return null;
  }
  const noteDir = dirname(fromNotePath);
  const visited = /* @__PURE__ */ new Set();
  const wsPrefix = workspacePath2.endsWith("/") ? workspacePath2 : workspacePath2 + "/";
  let current = noteDir;
  while (current === workspacePath2 || current.startsWith(wsPrefix)) {
    const found = await findImageInDir(current, reference);
    if (found) return found;
    visited.add(current);
    const parent = dirname(current);
    if (parent === current) break;
    current = parent;
  }
  const MAX_BFS_DIRS = 500;
  const queue = [workspacePath2];
  let qi = 0;
  while (qi < queue.length && visited.size < MAX_BFS_DIRS) {
    const dir = queue[qi++];
    if (visited.has(dir)) continue;
    visited.add(dir);
    const found = await findImageInDir(dir, reference);
    if (found) return found;
    const subdirs = await collectSubdirs(dir);
    queue.push(...subdirs);
  }
  return null;
}
async function saveDroppedImage(noteDir, fileName, buffer) {
  const safeName = basename(fileName);
  const dot = safeName.lastIndexOf(".");
  const stem = dot > 0 ? safeName.slice(0, dot) : safeName;
  const ext = dot > 0 ? safeName.slice(dot) : "";
  let candidate = safeName;
  let suffix = 0;
  for (; ; ) {
    try {
      await writeFile(join(noteDir, candidate), buffer, { flag: "wx" });
      return candidate;
    } catch (err) {
      if (err instanceof Error && err.code === "EEXIST") {
        suffix++;
        candidate = `${stem}-${suffix}${ext}`;
        continue;
      }
      throw err;
    }
  }
}
function stopImageWorker() {
  if (!worker$2) return;
  worker$2.terminate();
  for (const p of pending$1.values()) {
    p.reject(new Error("Image worker stopped"));
  }
  pending$1.clear();
  worker$2 = null;
}
const DEFAULT_CONFIG = {
  selected_file: null,
  expanded_dirs: [],
  agent_skip_permissions: false
};
function workspaceConfigPath(workspacePath2) {
  return join(workspacePath2, ".collaborator", "config.json");
}
function loadWorkspaceConfig(workspacePath2) {
  try {
    const raw = readFileSync(
      workspaceConfigPath(workspacePath2),
      "utf-8"
    );
    const parsed = JSON.parse(raw);
    return {
      selected_file: parsed.selected_file ?? null,
      expanded_dirs: Array.isArray(parsed.expanded_dirs) ? parsed.expanded_dirs : [],
      agent_skip_permissions: parsed.agent_skip_permissions === true
    };
  } catch {
    return { ...DEFAULT_CONFIG };
  }
}
function saveWorkspaceConfig(workspacePath2, config2) {
  const filePath = workspaceConfigPath(workspacePath2);
  mkdirSync(dirname(filePath), { recursive: true });
  atomicWriteFileSync(filePath, JSON.stringify(config2, null, 2));
}
const MAX_RESTARTS$1 = 5;
let worker$1 = null;
let notifyFn$2 = null;
let restartCount$1 = 0;
let stopping$1 = false;
function workerPath$1() {
  return join(__dirname, "watcher-worker.js");
}
function startWorker$1() {
  if (worker$1) return;
  stopping$1 = false;
  worker$1 = utilityProcess.fork(workerPath$1());
  worker$1.on("message", (data) => {
    notifyFn$2?.(data);
  });
  worker$1.on("exit", (code) => {
    worker$1 = null;
    if (stopping$1) return;
    if (restartCount$1 >= MAX_RESTARTS$1) {
      console.error(
        `[watcher] Worker exited ${MAX_RESTARTS$1} times, giving up`
      );
      return;
    }
    console.warn(
      `[watcher] Worker exited with code ${code}, restarting`
    );
    restartCount$1++;
    startWorker$1();
  });
}
function setNotifyFn$2(fn) {
  notifyFn$2 = fn;
}
function watchWorkspace(workspacePath2) {
  if (!workspacePath2) {
    worker$1?.postMessage({ cmd: "unwatch" });
    return;
  }
  worker$1?.postMessage({ cmd: "watch", path: workspacePath2 });
}
function stopWorker$1() {
  if (!worker$1) return;
  stopping$1 = true;
  worker$1.postMessage({ cmd: "close" });
  worker$1.kill();
  worker$1 = null;
}
const WIKILINK_RE = /\[\[([^\]]+)\]\]/g;
let workspacePath$1 = "";
const index = {
  byStem: /* @__PURE__ */ new Map(),
  outgoing: /* @__PURE__ */ new Map(),
  incoming: /* @__PURE__ */ new Map()
};
const suppressedPaths = /* @__PURE__ */ new Set();
function suppressNextUpdate(path2) {
  suppressedPaths.add(path2);
}
function stemOf(filePath) {
  return basename(filePath, extname(filePath)).toLowerCase();
}
function targetToStem(target) {
  const parts = target.split("/");
  return parts[parts.length - 1].toLowerCase();
}
function extractWikilinks(content) {
  const targets = [];
  let match;
  WIKILINK_RE.lastIndex = 0;
  while ((match = WIKILINK_RE.exec(content)) !== null) {
    targets.push(match[1].trim());
  }
  return targets;
}
async function collectMdFiles(dirPath) {
  const files = [];
  let entries;
  try {
    entries = await readdir(dirPath, { withFileTypes: true });
  } catch {
    return files;
  }
  for (const entry of entries) {
    const fullPath = join(dirPath, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".git") {
        continue;
      }
      const sub = await collectMdFiles(fullPath);
      files.push(...sub);
    } else if (entry.name.endsWith(".md")) {
      files.push(fullPath);
    }
  }
  return files;
}
function addToStemIndex(filePath) {
  const stem = stemOf(filePath);
  const existing = index.byStem.get(stem);
  if (existing) {
    if (!existing.includes(filePath)) {
      existing.push(filePath);
      existing.sort((a, b) => a.length - b.length);
    }
  } else {
    index.byStem.set(stem, [filePath]);
  }
}
function removeFromStemIndex(filePath) {
  const stem = stemOf(filePath);
  const existing = index.byStem.get(stem);
  if (!existing) return;
  const filtered = existing.filter((p) => p !== filePath);
  if (filtered.length === 0) {
    index.byStem.delete(stem);
  } else {
    index.byStem.set(stem, filtered);
  }
}
function updateLinkMaps(filePath, targets) {
  const oldTargets = index.outgoing.get(filePath);
  if (oldTargets) {
    for (const t of oldTargets) {
      const stem = targetToStem(t);
      const incoming = index.incoming.get(stem);
      if (incoming) {
        incoming.delete(filePath);
        if (incoming.size === 0) index.incoming.delete(stem);
      }
    }
  }
  if (targets.length === 0) {
    index.outgoing.delete(filePath);
    return;
  }
  const targetSet = new Set(targets.map((t) => t.toLowerCase()));
  index.outgoing.set(filePath, targetSet);
  for (const t of targetSet) {
    const stem = targetToStem(t);
    let incoming = index.incoming.get(stem);
    if (!incoming) {
      incoming = /* @__PURE__ */ new Set();
      index.incoming.set(stem, incoming);
    }
    incoming.add(filePath);
  }
}
async function buildIndex(wsPath) {
  workspacePath$1 = wsPath;
  index.byStem.clear();
  index.outgoing.clear();
  index.incoming.clear();
  const files = await collectMdFiles(wsPath);
  for (const filePath of files) {
    addToStemIndex(filePath);
  }
  for (const filePath of files) {
    try {
      const content = await readFile(filePath, "utf-8");
      const targets = extractWikilinks(content);
      updateLinkMaps(filePath, targets);
    } catch {
    }
  }
}
async function updateFile(filePath) {
  if (!filePath.endsWith(".md")) return;
  if (suppressedPaths.delete(filePath)) return;
  addToStemIndex(filePath);
  try {
    const content = await readFile(filePath, "utf-8");
    const targets = extractWikilinks(content);
    updateLinkMaps(filePath, targets);
  } catch {
    updateLinkMaps(filePath, []);
  }
}
function removeFile(filePath) {
  if (suppressedPaths.delete(filePath)) return;
  removeFromStemIndex(filePath);
  updateLinkMaps(filePath, []);
}
function resolve(target) {
  const lower = target.toLowerCase();
  const paths = index.byStem.get(lower);
  if (paths && paths.length > 0) {
    return paths[0];
  }
  if (lower.includes("/")) {
    const suffix = lower.replace(/^\/+/, "");
    for (const [, filePaths] of index.byStem) {
      for (const fp of filePaths) {
        const rel = relative(workspacePath$1, fp).toLowerCase().replace(/\.md$/, "");
        if (rel === suffix || rel.endsWith(`/${suffix}`)) {
          return fp;
        }
      }
    }
  }
  return null;
}
function suggest(partial) {
  if (partial.length === 0) {
    const all = [];
    for (const [stem, paths] of index.byStem) {
      const ambiguous = paths.length > 1;
      for (const p of paths) {
        all.push({ stem, path: p, ambiguous, rank: 0 });
      }
    }
    all.sort((a, b) => a.stem.localeCompare(b.stem));
    return all.slice(0, 20).map(({ stem, path: path2, ambiguous }) => ({
      stem,
      path: path2,
      ambiguous
    }));
  }
  const lower = partial.toLowerCase();
  const results = [];
  for (const [stem, paths] of index.byStem) {
    if (paths.length === 0) continue;
    let rank = -1;
    if (stem.startsWith(lower)) {
      rank = 0;
    } else if (stem.includes(lower)) {
      rank = 1;
    }
    if (rank >= 0) {
      const ambiguous = paths.length > 1;
      for (const p of paths) {
        results.push({ stem, path: p, ambiguous, rank });
      }
    }
  }
  results.sort((a, b) => {
    if (a.rank !== b.rank) return a.rank - b.rank;
    return a.stem.localeCompare(b.stem);
  });
  return results.slice(0, 20).map(({ stem, path: path2, ambiguous }) => ({
    stem,
    path: path2,
    ambiguous
  }));
}
function extractContext(content, target) {
  const lower = target.toLowerCase();
  const re = new RegExp(
    `\\[\\[[^\\]]*${escapeRegExp(lower)}[^\\]]*\\]\\]`,
    "i"
  );
  const match = re.exec(content);
  if (!match) return "";
  const idx = match.index;
  const matchLen = match[0].length;
  const start = Math.max(0, idx - 80);
  const end = Math.min(content.length, idx + matchLen + 80);
  let snippet = content.slice(start, end).trim();
  if (start > 0) snippet = `...${snippet}`;
  if (end < content.length) snippet = `${snippet}...`;
  return snippet;
}
async function backlinksWithContext(filePath) {
  const stem = stemOf(filePath);
  const sources = index.incoming.get(stem);
  if (!sources || sources.size === 0) return [];
  const results = [];
  for (const sourcePath of sources) {
    try {
      const content = await readFile(sourcePath, "utf-8");
      const context = extractContext(content, stem);
      results.push({ path: sourcePath, context });
    } catch {
      results.push({ path: sourcePath, context: "" });
    }
  }
  return results;
}
async function handleRename(oldPath, newPath) {
  const oldStem = stemOf(oldPath);
  const newStem = stemOf(newPath);
  removeFromStemIndex(oldPath);
  addToStemIndex(newPath);
  const oldOutgoing = index.outgoing.get(oldPath);
  if (oldOutgoing) {
    index.outgoing.delete(oldPath);
    index.outgoing.set(newPath, oldOutgoing);
    for (const t of oldOutgoing) {
      const inc = index.incoming.get(t);
      if (inc) {
        inc.delete(oldPath);
        inc.add(newPath);
      }
    }
  }
  if (oldStem === newStem) return [];
  const sources = index.incoming.get(oldStem);
  if (!sources || sources.size === 0) return [];
  const updatedFiles = [];
  const pattern = new RegExp(
    `\\[\\[([^\\]]*\\/)?${escapeRegExp(oldStem)}\\]\\]`,
    "gi"
  );
  const newStemDisplay = basename(newPath, extname(newPath));
  for (const sourcePath of sources) {
    try {
      const content = await readFile(sourcePath, "utf-8");
      const updated = content.replace(
        pattern,
        (_match, prefix) => prefix ? `[[${prefix}${newStemDisplay}]]` : `[[${newStemDisplay}]]`
      );
      if (updated !== content) {
        suppressNextUpdate(sourcePath);
        await writeFile(sourcePath, updated, "utf-8");
        updatedFiles.push(sourcePath);
        const targets = extractWikilinks(updated);
        updateLinkMaps(sourcePath, targets);
      }
    } catch {
    }
  }
  index.incoming.delete(oldStem);
  const newIncoming = index.incoming.get(newStem) ?? /* @__PURE__ */ new Set();
  for (const f of sources) {
    newIncoming.add(f);
  }
  index.incoming.set(newStem, newIncoming);
  return updatedFiles;
}
function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
const ANALYTICS_SHUTDOWN_TIMEOUT_MS = 2e3;
let client = null;
let deviceId = null;
function deviceIdPath() {
  return join(app.getPath("userData"), "device-id");
}
function getDeviceId() {
  if (deviceId) return deviceId;
  try {
    deviceId = readFileSync(deviceIdPath(), "utf-8").trim();
  } catch {
    deviceId = randomUUID();
    const filePath = deviceIdPath();
    mkdirSync(dirname(filePath), { recursive: true });
    writeFileSync(filePath, deviceId);
  }
  return deviceId;
}
function initMainAnalytics() {
  const apiKey = "phc_gRgd67LXlAwM2MWMAKyCQVwrsD1KIm5PeJwCFvtSHG0";
  client = new PostHog(apiKey, {
    host: "https://us.i.posthog.com"
  });
  client.capture({
    distinctId: getDeviceId(),
    event: "$identify",
    properties: {
      $set: { platform: process.platform, arch: process.arch },
      $set_once: { first_seen_version: app.getVersion() }
    }
  });
}
function trackEvent(event, properties) {
  client?.capture({
    distinctId: getDeviceId(),
    event,
    properties: {
      app_version: app.getVersion(),
      platform: process.platform,
      arch: process.arch,
      electron_version: process.versions.electron,
      ...properties
    }
  });
}
function shutdownAnalytics() {
  if (!client) return Promise.resolve();
  return Promise.race([
    client.shutdown(),
    new Promise(
      (resolve2) => setTimeout(resolve2, ANALYTICS_SHUTDOWN_TIMEOUT_MS)
    )
  ]);
}
const recentlyRenamedRefCounts = /* @__PURE__ */ new Map();
function getRecentlyRenamedRefCounts() {
  return recentlyRenamedRefCounts;
}
function bumpRenameRefCount(oldPath) {
  recentlyRenamedRefCounts.set(
    oldPath,
    (recentlyRenamedRefCounts.get(oldPath) ?? 0) + 1
  );
  setTimeout(() => {
    const count = (recentlyRenamedRefCounts.get(oldPath) ?? 1) - 1;
    if (count <= 0) recentlyRenamedRefCounts.delete(oldPath);
    else recentlyRenamedRefCounts.set(oldPath, count);
  }, 2e3);
}
function registerFilesystemHandlers(ctx) {
  ipcMain.handle(
    "fs:readdir",
    (_event, path2) => fsReadDir(
      path2,
      ctx.fileFilter() ?? void 0,
      ctx.getActiveWorkspacePath() ?? void 0
    )
  );
  ipcMain.handle(
    "fs:count-files",
    (_event, path2) => countTreeFiles(
      path2,
      ctx.fileFilter() ?? void 0,
      ctx.getActiveWorkspacePath() ?? void 0
    )
  );
  ipcMain.handle(
    "fs:readfile",
    (_event, path2) => fsReadFile(path2)
  );
  ipcMain.handle(
    "fs:writefile",
    async (_event, path2, content, expectedMtime) => {
      const result = await fsWriteFile(
        path2,
        content,
        expectedMtime
      );
      if (result.ok) {
        ctx.trackEvent("file_saved", { ext: extname(path2) });
        ctx.fileFilter()?.invalidateBinaryCache([path2]);
        const event = [
          {
            dirPath: dirname(path2),
            changes: [{ path: path2, type: 1 }]
          }
        ];
        ctx.forwardToWebview("nav", "fs-changed", event);
        ctx.forwardToWebview("viewer", "fs-changed", event);
      }
      return result;
    }
  );
  ipcMain.handle(
    "fs:rename",
    async (_event, oldPath, newTitle) => {
      const sanitized = newTitle.replace(/[<>:"/\\|?*\x00-\x1f]/g, "").replace(/\.\s*$/, "").trim();
      if (sanitized.length === 0) {
        throw new Error("Title cannot be empty");
      }
      const dotIndex = oldPath.lastIndexOf(".");
      const slashIndex = oldPath.lastIndexOf("/");
      const ext = dotIndex > slashIndex ? oldPath.slice(dotIndex) : "";
      bumpRenameRefCount(oldPath);
      const newPath = await fsRename(
        oldPath,
        `${sanitized}${ext}`
      );
      ctx.trackEvent("file_renamed");
      ctx.fileFilter()?.invalidateBinaryCache([oldPath, newPath]);
      const updatedFiles = await handleRename(
        oldPath,
        newPath
      );
      const active = ctx.getActiveWorkspacePath();
      if (active) {
        const config2 = ctx.getWorkspaceConfig(active);
        if (config2.selected_file === oldPath) {
          config2.selected_file = newPath;
          ctx.saveWorkspaceConfig(active, config2);
        }
      }
      ctx.forwardToWebview(
        "viewer",
        "file-renamed",
        oldPath,
        newPath
      );
      ctx.forwardToWebview(
        "nav",
        "file-renamed",
        oldPath,
        newPath
      );
      if (updatedFiles.length > 0) {
        ctx.forwardToWebview(
          "viewer",
          "wikilinks-updated",
          updatedFiles
        );
      }
      return newPath;
    }
  );
  ipcMain.handle("fs:stat", async (_event, path2) => {
    const stats = await stat(path2);
    return {
      ctime: stats.birthtime.toISOString(),
      mtime: stats.mtime.toISOString()
    };
  });
  ipcMain.handle("fs:trash", async (_event, path2) => {
    await shell.trashItem(path2);
    ctx.trackEvent("file_trashed");
    ctx.fileFilter()?.invalidateBinaryCache([path2]);
  });
  ipcMain.handle("fs:mkdir", async (_event, path2) => {
    await fsMkdir(path2);
    ctx.trackEvent("folder_created");
    const event = [
      {
        dirPath: dirname(path2),
        changes: [{ path: path2, type: 1 }]
      }
    ];
    ctx.forwardToWebview("nav", "fs-changed", event);
    ctx.forwardToWebview("viewer", "fs-changed", event);
  });
  ipcMain.handle(
    "fs:move",
    async (_event, oldPath, newParentDir) => {
      bumpRenameRefCount(oldPath);
      const newPath = await fsMove(oldPath, newParentDir);
      ctx.trackEvent("file_moved");
      ctx.fileFilter()?.invalidateBinaryCache([oldPath, newPath]);
      const active = ctx.getActiveWorkspacePath();
      if (active) {
        const config2 = ctx.getWorkspaceConfig(active);
        if (config2.selected_file === oldPath) {
          config2.selected_file = newPath;
          ctx.saveWorkspaceConfig(active, config2);
        }
      }
      ctx.forwardToWebview(
        "viewer",
        "file-renamed",
        oldPath,
        newPath
      );
      ctx.forwardToWebview(
        "nav",
        "file-renamed",
        oldPath,
        newPath
      );
      return newPath;
    }
  );
  ipcMain.handle(
    "fs:read-folder-table",
    async (_event, folderPath) => {
      const workspace = ctx.getActiveWorkspacePath();
      if (!workspace || !folderPath.startsWith(workspace + "/") && folderPath !== workspace) {
        throw new Error("Folder is outside workspace");
      }
      const entries = await readdir(folderPath, {
        withFileTypes: true
      });
      const columnSet = /* @__PURE__ */ new Set();
      const mdEntries = entries.filter(
        (e) => e.isFile() && e.name.endsWith(".md")
      );
      const files = (await Promise.all(
        mdEntries.map(
          async (entry) => {
            const fullPath = join(folderPath, entry.name);
            try {
              const [stats, content] = await Promise.all([
                stat(fullPath),
                readFile(fullPath, "utf-8")
              ]);
              let attributes = {};
              try {
                attributes = fm(
                  content
                ).attributes;
              } catch {
              }
              for (const key of Object.keys(attributes)) {
                columnSet.add(key);
              }
              return {
                path: fullPath,
                filename: entry.name,
                frontmatter: attributes,
                mtime: stats.mtime.toISOString(),
                ctime: stats.birthtime.toISOString()
              };
            } catch {
              return null;
            }
          }
        )
      )).filter((f) => f !== null);
      const columns = [...columnSet].sort(
        (a, b) => a.localeCompare(b)
      );
      return { folderPath, files, columns };
    }
  );
  ipcMain.handle(
    "image:thumbnail",
    (_event, path2, size) => getImageThumbnail(path2, size)
  );
  ipcMain.handle(
    "image:full",
    (_event, path2) => getImageFull(path2)
  );
  ipcMain.handle(
    "image:resolve-path",
    (_event, reference, fromNotePath) => resolveImagePath(
      reference,
      fromNotePath,
      ctx.getActiveWorkspacePath() ?? ""
    )
  );
  ipcMain.handle(
    "image:save-dropped",
    async (_event, noteDir, fileName, buffer) => {
      const ws = ctx.getActiveWorkspacePath();
      if (!ws || noteDir !== ws && !noteDir.startsWith(ws + "/")) {
        throw new Error("Target directory is outside workspace");
      }
      return saveDroppedImage(
        noteDir,
        fileName,
        Buffer.from(buffer)
      );
    }
  );
}
const sessions$1 = /* @__PURE__ */ new Map();
let notifyFn$1 = null;
let workspacePath = null;
function setNotifyFn$1(fn) {
  notifyFn$1 = fn;
}
function setWorkspacePath(path2) {
  workspacePath = path2;
}
function sessionStart(params) {
  if (sessions$1.has(params.session_id)) return;
  const session2 = {
    sessionId: params.session_id,
    cwd: params.cwd,
    startedAt: Date.now(),
    interactions: [],
    ptySessionId: null
  };
  sessions$1.set(params.session_id, session2);
  notifyFn$1?.({ kind: "session-started", sessionId: params.session_id });
}
function fileTouched(params) {
  if (params.file_path === null) return;
  const session2 = sessions$1.get(params.session_id);
  if (!session2) return;
  const absolutePath = isAbsolute(params.file_path) ? params.file_path : resolve$1(session2.cwd, params.file_path);
  if (!workspacePath) return;
  const rel = relative(workspacePath, absolutePath);
  if (rel.startsWith("..") || isAbsolute(rel)) return;
  const touchType = params.tool_name === "Read" ? "read" : "write";
  const timestamp = Date.now();
  session2.interactions.push({
    filePath: rel,
    type: touchType,
    timestamp
  });
  notifyFn$1?.({
    kind: "file-touched",
    sessionId: params.session_id,
    filePath: rel,
    touchType,
    timestamp
  });
}
function sessionEnd(params) {
  if (!sessions$1.has(params.session_id)) return;
  sessions$1.delete(params.session_id);
  notifyFn$1?.({ kind: "session-ended", sessionId: params.session_id });
}
function linkPtySession(sessionId, ptySessionId) {
  const session2 = sessions$1.get(sessionId);
  if (session2) {
    session2.ptySessionId = ptySessionId;
  }
}
function getPtySessionId(sessionId) {
  return sessions$1.get(sessionId)?.ptySessionId ?? null;
}
const wsConfigMap = /* @__PURE__ */ new Map();
function getWsConfig(workspacePath2) {
  let config2 = wsConfigMap.get(workspacePath2);
  if (!config2) {
    config2 = loadWorkspaceConfig(workspacePath2);
    wsConfigMap.set(workspacePath2, config2);
  }
  return config2;
}
function getWorkspaceConfig(path2) {
  return getWsConfig(path2);
}
function ensureGitignoreEntry(workspacePath2) {
  const gitignorePath = join(workspacePath2, ".gitignore");
  if (!existsSync(gitignorePath)) return;
  const content = readFileSync(gitignorePath, "utf-8");
  const lines = content.split("\n");
  const alreadyIgnored = lines.some(
    (l) => l.trim() === ".collaborator" || l.trim() === ".collaborator/"
  );
  if (alreadyIgnored) return;
  const suffix = content.endsWith("\n") ? "" : "\n";
  appendFileSync(
    gitignorePath,
    `${suffix}.collaborator
`,
    "utf-8"
  );
}
function initWorkspaceFiles(workspacePath2) {
  const collabDir = join(workspacePath2, ".collaborator");
  mkdirSync(collabDir, { recursive: true });
  ensureGitignoreEntry(workspacePath2);
}
function startWorkspaceServices(path2, fileFilterSetter) {
  wsConfigMap.set(path2, loadWorkspaceConfig(path2));
  setThumbnailCacheDir(path2);
  watchWorkspace(path2);
  fileFilterSetter(createFileFilter());
  void buildIndex(path2);
  setWorkspacePath(path2);
}
function stopWorkspaceServices() {
  watchWorkspace("");
  setWorkspacePath("");
}
function notifyWorkspaceChanged(ctx, path2) {
  ctx.forwardToWebview("nav", "workspace-changed", path2);
  ctx.forwardToWebview("viewer", "workspace-changed", path2);
  ctx.forwardToWebview("terminal", "workspace-changed", path2);
  ctx.mainWindow()?.webContents.send("shell:workspace-changed", path2);
}
const LEGACY_FM_FIELDS = /* @__PURE__ */ new Set([
  "createdAt",
  "modifiedAt",
  "author"
]);
async function readTreeRecursive(dirPath, rootPath, filter) {
  let entries;
  try {
    entries = await readdir(dirPath, { withFileTypes: true });
  } catch {
    return [];
  }
  const folders = [];
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dirPath, entry.name);
    if (!await shouldIncludeEntryWithContent(
      dirPath,
      entry,
      filter ?? void 0,
      rootPath
    )) {
      continue;
    }
    let stats;
    try {
      stats = await stat(fullPath);
    } catch {
      continue;
    }
    const ctime = stats.birthtime.toISOString();
    const mtime = stats.mtime.toISOString();
    if (entry.isDirectory()) {
      const children = await readTreeRecursive(
        fullPath,
        rootPath,
        filter
      );
      folders.push({
        path: fullPath,
        name: entry.name,
        kind: "folder",
        ctime,
        mtime,
        children
      });
    } else {
      const stem = basename(entry.name, extname(entry.name));
      const node = {
        path: fullPath,
        name: stem,
        kind: "file",
        ctime,
        mtime
      };
      if (entry.name.endsWith(".md")) {
        try {
          const fileContent = await readFile(
            fullPath,
            "utf-8"
          );
          const parsed = fm(
            fileContent
          );
          node.frontmatter = parsed.attributes;
          node.preview = parsed.body.slice(0, 200);
        } catch {
        }
      }
      files.push(node);
    }
  }
  folders.sort((a, b) => a.name.localeCompare(b.name));
  files.sort((a, b) => a.name.localeCompare(b.name));
  return [...folders, ...files];
}
function registerWorkspaceHandlers(ctx, appConfig2, fileFilterRef2) {
  function activeWsConfig() {
    const path2 = ctx.getActiveWorkspacePath();
    if (!path2) {
      return {
        selected_file: null,
        expanded_dirs: [],
        agent_skip_permissions: false
      };
    }
    return getWsConfig(path2);
  }
  ipcMain.handle("config:get", () => appConfig2);
  ipcMain.handle("app:version", () => app.getVersion());
  ipcMain.handle(
    "workspace-pref:get",
    (_event, key) => {
      const config2 = activeWsConfig();
      if (key === "selected_file") return config2.selected_file;
      if (key === "expanded_dirs") return config2.expanded_dirs;
      if (key === "agent_skip_permissions")
        return config2.agent_skip_permissions;
      return null;
    }
  );
  ipcMain.handle(
    "workspace-pref:set",
    (_event, key, value) => {
      const active = ctx.getActiveWorkspacePath();
      if (!active) return;
      const config2 = getWsConfig(active);
      if (key === "selected_file") {
        config2.selected_file = value ?? null;
      } else if (key === "expanded_dirs") {
        config2.expanded_dirs = Array.isArray(value) ? value : [];
      } else if (key === "agent_skip_permissions") {
        config2.agent_skip_permissions = value === true;
      }
      saveWorkspaceConfig(active, config2);
    }
  );
  ipcMain.handle(
    "shell:get-workspace-path",
    () => ctx.getActiveWorkspacePath() || null
  );
  ipcMain.handle("workspace:list", () => ({
    workspaces: appConfig2.workspaces,
    active: appConfig2.active_workspace
  }));
  ipcMain.handle("workspace:add", async () => {
    const win = ctx.mainWindow();
    if (!win) return null;
    const result = await dialog.showOpenDialog(win, {
      properties: ["openDirectory", "createDirectory"]
    });
    if (result.canceled || result.filePaths.length === 0) {
      return null;
    }
    const chosen = realpathSync(result.filePaths[0]);
    const existingIndex = appConfig2.workspaces.indexOf(chosen);
    if (existingIndex !== -1) {
      if (existingIndex !== appConfig2.active_workspace) {
        appConfig2.active_workspace = existingIndex;
        saveConfig(appConfig2);
        startWorkspaceServices(chosen, (f) => {
          fileFilterRef2.current = f;
        });
        notifyWorkspaceChanged(ctx, chosen);
      }
      return {
        workspaces: appConfig2.workspaces,
        active: existingIndex
      };
    }
    const collabDir = join(chosen, ".collaborator");
    const isNew = !existsSync(collabDir);
    if (isNew) {
      initWorkspaceFiles(chosen);
    }
    appConfig2.workspaces.push(chosen);
    appConfig2.active_workspace = appConfig2.workspaces.length - 1;
    saveConfig(appConfig2);
    trackEvent("workspace_added", { is_new: isNew });
    startWorkspaceServices(chosen, (f) => {
      fileFilterRef2.current = f;
    });
    notifyWorkspaceChanged(ctx, chosen);
    return {
      workspaces: appConfig2.workspaces,
      active: appConfig2.active_workspace
    };
  });
  ipcMain.handle(
    "workspace:remove",
    (_event, index2) => {
      if (index2 < 0 || index2 >= appConfig2.workspaces.length) {
        return {
          workspaces: appConfig2.workspaces,
          active: appConfig2.active_workspace
        };
      }
      const removedPath = appConfig2.workspaces[index2];
      wsConfigMap.delete(removedPath);
      const wasActive = index2 === appConfig2.active_workspace;
      appConfig2.workspaces.splice(index2, 1);
      if (appConfig2.workspaces.length === 0) {
        appConfig2.active_workspace = -1;
      } else if (wasActive) {
        appConfig2.active_workspace = Math.min(
          index2,
          appConfig2.workspaces.length - 1
        );
      } else if (appConfig2.active_workspace > index2) {
        appConfig2.active_workspace -= 1;
      }
      saveConfig(appConfig2);
      trackEvent("workspace_removed");
      if (wasActive) {
        const newPath = ctx.getActiveWorkspacePath();
        if (newPath) {
          startWorkspaceServices(newPath, (f) => {
            fileFilterRef2.current = f;
          });
          notifyWorkspaceChanged(ctx, newPath);
        } else {
          stopWorkspaceServices();
          fileFilterRef2.current = null;
          notifyWorkspaceChanged(ctx, "");
        }
      }
      return {
        workspaces: appConfig2.workspaces,
        active: appConfig2.active_workspace
      };
    }
  );
  ipcMain.handle(
    "workspace:switch",
    (_event, index2) => {
      if (index2 < 0 || index2 >= appConfig2.workspaces.length || index2 === appConfig2.active_workspace) {
        return;
      }
      appConfig2.active_workspace = index2;
      saveConfig(appConfig2);
      trackEvent("workspace_switched");
      const newPath = appConfig2.workspaces[index2];
      startWorkspaceServices(newPath, (f) => {
        fileFilterRef2.current = f;
      });
      notifyWorkspaceChanged(ctx, newPath);
    }
  );
  ipcMain.handle(
    "workspace:read-tree",
    async (_event, params) => {
      return readTreeRecursive(
        params.root,
        params.root,
        fileFilterRef2.current
      );
    }
  );
  ipcMain.handle(
    "workspace:update-frontmatter",
    async (_event, filePath, field, value) => {
      const MAX_ATTEMPTS = 3;
      for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
        const fileStat = await stat(filePath);
        const expectedMtime = fileStat.mtime.toISOString();
        const content = await readFile(filePath, "utf-8");
        const parsed = fm(content);
        const attrs = { ...parsed.attributes, [field]: value };
        for (const key of LEGACY_FM_FIELDS) {
          delete attrs[key];
        }
        const yaml = Object.entries(attrs).map(([k, v]) => `${k}: ${JSON.stringify(v)}`).join("\n");
        const output = `---
${yaml}
---
${parsed.body}`;
        const result = await fsWriteFile(filePath, output, expectedMtime);
        if (result.ok) {
          return { ok: true, retried: attempt > 0 };
        }
      }
      return { ok: false };
    }
  );
}
const PYTHON_CODE_EXTENSIONS = /* @__PURE__ */ new Set([
  ".py",
  ".pyi"
]);
const PYTHON_SEARCH_IGNORED_DIRS = /* @__PURE__ */ new Set([
  ".git",
  "node_modules",
  "dist",
  "build",
  "out",
  "__pycache__",
  ".venv",
  "venv",
  "site-packages"
]);
const PYTHON_CONFIG_FILE_NAMES = /* @__PURE__ */ new Set([
  "pyproject.toml",
  "setup.cfg",
  "setup.py"
]);
async function buildPythonImportLinks(pythonFiles, workspacePath2, nodeIds) {
  if (pythonFiles.length === 0) {
    return [];
  }
  const context = await buildPythonImportContext(
    pythonFiles,
    workspacePath2
  );
  const links = [];
  const seenLinks = /* @__PURE__ */ new Set();
  for (const file of pythonFiles) {
    const fileInfo = context.fileInfoById.get(
      file.id
    );
    if (!fileInfo) {
      continue;
    }
    let content;
    try {
      content = await readFile(file.path, "utf-8");
    } catch {
      continue;
    }
    const statements = extractPythonImportStatements(content);
    for (const statement of statements) {
      const targets = resolvePythonImportTargets(
        statement,
        fileInfo,
        context
      );
      for (const target of targets) {
        if (!nodeIds.has(target) || target === file.id) {
          continue;
        }
        const key = `${file.id}->${target}`;
        if (seenLinks.has(key)) {
          continue;
        }
        seenLinks.add(key);
        links.push({
          source: file.id,
          target
        });
      }
    }
  }
  return links;
}
async function buildPythonImportContext(pythonFiles, workspacePath2) {
  const roots = await listPythonRoots(
    workspacePath2,
    pythonFiles
  );
  const fileInfoById = /* @__PURE__ */ new Map();
  const moduleEntriesByName = /* @__PURE__ */ new Map();
  for (const file of pythonFiles) {
    const fileInfo = createPythonFileInfo(
      file,
      roots
    );
    if (!fileInfo) {
      continue;
    }
    fileInfoById.set(file.id, fileInfo);
    if (!fileInfo.moduleName) {
      continue;
    }
    const entries = moduleEntriesByName.get(
      fileInfo.moduleName
    ) ?? [];
    entries.push(fileInfo);
    moduleEntriesByName.set(
      fileInfo.moduleName,
      entries
    );
  }
  return {
    fileInfoById,
    moduleEntriesByName
  };
}
async function listPythonRoots(workspacePath2, pythonFiles) {
  const roots = /* @__PURE__ */ new Map();
  addPythonRootCandidate(
    roots,
    workspacePath2,
    0
  );
  for (const file of pythonFiles) {
    for (const dirPath of listAncestorPaths(
      file.path,
      workspacePath2
    )) {
      if (basename(dirPath) === "src") {
        addPythonRootCandidate(
          roots,
          dirPath,
          50
        );
      }
    }
  }
  const configPaths = await listPythonConfigPaths(workspacePath2);
  for (const configPath2 of configPaths) {
    const configDir = dirname(configPath2);
    addPythonRootCandidate(
      roots,
      configDir,
      100
    );
    try {
      const content = await readFile(
        configPath2,
        "utf-8"
      );
      for (const rootPath of extractPythonPackageRoots(
        configDir,
        content
      )) {
        addPythonRootCandidate(
          roots,
          rootPath,
          200
        );
      }
    } catch {
    }
    const srcPath = join(configDir, "src");
    if (pythonFiles.some(
      (file) => isPathWithinDirectory(
        file.path,
        srcPath
      )
    )) {
      addPythonRootCandidate(
        roots,
        srcPath,
        150
      );
    }
  }
  return Array.from(roots.entries()).map(([path2, priority]) => ({
    path: path2,
    priority
  })).sort(comparePythonRoots);
}
async function listPythonConfigPaths(workspacePath2) {
  const configPaths = [];
  await collectPythonConfigPaths(
    workspacePath2,
    configPaths
  );
  return configPaths;
}
async function collectPythonConfigPaths(dirPath, configPaths) {
  let entries;
  try {
    entries = await readdir(dirPath, {
      withFileTypes: true
    });
  } catch {
    return;
  }
  for (const entry of entries) {
    const fullPath = join(dirPath, entry.name);
    if (entry.isDirectory()) {
      if (PYTHON_SEARCH_IGNORED_DIRS.has(
        entry.name
      )) {
        continue;
      }
      await collectPythonConfigPaths(
        fullPath,
        configPaths
      );
      continue;
    }
    if (entry.isFile() && PYTHON_CONFIG_FILE_NAMES.has(
      entry.name
    )) {
      configPaths.push(fullPath);
    }
  }
}
function addPythonRootCandidate(roots, path2, priority) {
  const existing = roots.get(path2);
  if (existing === void 0 || priority > existing) {
    roots.set(path2, priority);
  }
}
function comparePythonRoots(a, b) {
  return b.priority - a.priority || b.path.length - a.path.length;
}
function listAncestorPaths(filePath, workspacePath2) {
  const ancestors = [];
  let currentPath = dirname(filePath);
  while (isPathWithinDirectory(
    currentPath,
    workspacePath2
  )) {
    ancestors.push(currentPath);
    if (currentPath === workspacePath2) {
      break;
    }
    const parentPath = dirname(currentPath);
    if (parentPath === currentPath) {
      break;
    }
    currentPath = parentPath;
  }
  return ancestors;
}
function extractPythonPackageRoots(configDir, content) {
  const roots = /* @__PURE__ */ new Set();
  const addRoot = (rawPath) => {
    const candidate = normalizePythonRootPath(rawPath);
    if (!candidate) {
      return;
    }
    roots.add(resolve$1(configDir, candidate));
  };
  for (const match of content.matchAll(
    /\bfrom\s*=\s*["']([^"']+)["']/g
  )) {
    addRoot(match[1]);
  }
  for (const match of content.matchAll(
    /\bwhere\s*=\s*["']([^"']+)["']/g
  )) {
    addRoot(match[1]);
  }
  for (const match of content.matchAll(
    /\bwhere\s*=\s*\[([^\]]+)\]/g
  )) {
    const arrayContent = match[1];
    if (!arrayContent) {
      continue;
    }
    for (const quotedPath of arrayContent.matchAll(
      /["']([^"']+)["']/g
    )) {
      addRoot(quotedPath[1]);
    }
  }
  for (const match of content.matchAll(
    /\bfind(?:_namespace)?_packages\s*\(\s*where\s*=\s*["']([^"']+)["']/g
  )) {
    addRoot(match[1]);
  }
  for (const match of content.matchAll(
    /\bpackage[-_]dir\s*=\s*\{([\s\S]*?)\}/g
  )) {
    const objectContent = match[1];
    if (!objectContent) {
      continue;
    }
    for (const valueMatch of objectContent.matchAll(
      /["']{0,1}\s*["']{0,1}\s*[:=]\s*["']([^"']+)["']/g
    )) {
      addRoot(valueMatch[1]);
    }
  }
  for (const match of content.matchAll(
    /\bpackage_dir\s*=\s*(?:\r?\n[ \t]+=\s*([^\n#]+))/g
  )) {
    addRoot(match[1]);
  }
  return Array.from(roots);
}
function normalizePythonRootPath(rawPath) {
  if (!rawPath) {
    return null;
  }
  const candidate = rawPath.trim();
  if (candidate.length === 0 || candidate === ".") {
    return null;
  }
  return candidate;
}
function createPythonFileInfo(file, roots) {
  const root = roots.find(
    (candidate) => isPathWithinDirectory(
      file.path,
      candidate.path
    )
  );
  if (!root) {
    return null;
  }
  const relativePath = relative(
    root.path,
    file.path
  ).replaceAll("\\", "/");
  if (relativePath.length === 0 || relativePath.startsWith("../") || isAbsolute(relativePath)) {
    return null;
  }
  const extension = extname(relativePath);
  const pathWithoutExtension = relativePath.slice(
    0,
    -extension.length
  );
  const isPackageInit = basename(pathWithoutExtension) === "__init__";
  const moduleName = (isPackageInit ? dirname(pathWithoutExtension) : pathWithoutExtension).replaceAll("/", ".").replace(/^\.$/, "");
  return {
    fileId: file.id,
    filePath: file.path,
    rootPath: root.path,
    moduleName,
    packageName: isPackageInit ? moduleName : getParentModuleName(moduleName),
    isPackageInit,
    isStub: extension === ".pyi"
  };
}
function getParentModuleName(moduleName) {
  const lastDot = moduleName.lastIndexOf(".");
  return lastDot === -1 ? "" : moduleName.slice(0, lastDot);
}
function extractPythonImportStatements(content) {
  const tree = parser.parse(content);
  const statements = [];
  tree.iterate({
    enter(node) {
      if (node.name !== "ImportStatement") {
        return;
      }
      const statement = parsePythonImportStatement(
        content.slice(node.from, node.to)
      );
      if (statement) {
        statements.push(statement);
      }
      return false;
    }
  });
  return statements;
}
function parsePythonImportStatement(statementSource) {
  const compactSource = statementSource.replaceAll(/\\\r?\n/g, " ").replaceAll(/\s+/g, " ").trim();
  if (compactSource.startsWith("import ")) {
    const moduleNames = splitImportList(
      compactSource.slice("import ".length)
    );
    return moduleNames.length > 0 ? {
      kind: "import",
      moduleNames
    } : null;
  }
  if (!compactSource.startsWith("from ")) {
    return null;
  }
  const match = compactSource.match(
    /^from\s+(.+?)\s+import\s+(.+)$/
  );
  if (!match) {
    return null;
  }
  const moduleSpecifier = (match[1] ?? "").trim();
  const importedNames = splitImportList(
    (match[2] ?? "").trim().replace(/^\(\s*/, "").replace(/\s*\)$/, "")
  );
  const relativeLevel = moduleSpecifier.match(/^\.+/)?.[0].length ?? 0;
  const moduleName = moduleSpecifier.slice(relativeLevel);
  return {
    kind: "from",
    moduleName,
    relativeLevel,
    importedNames
  };
}
function splitImportList(importListSource) {
  return importListSource.split(",").map(
    (entry) => entry.trim().replace(/\s+as\s+.+$/, "")
  ).map((entry) => entry.trim()).filter((entry) => entry.length > 0);
}
function resolvePythonImportTargets(statement, fileInfo, context) {
  const targets = /* @__PURE__ */ new Set();
  if (statement.kind === "import") {
    for (const moduleName of statement.moduleNames ?? []) {
      const target = resolvePythonModuleTarget(
        moduleName,
        fileInfo,
        context
      );
      if (target) {
        targets.add(target);
      }
    }
    return Array.from(targets);
  }
  const resolvedBaseModule = resolvePythonFromBaseModule(
    statement,
    fileInfo
  );
  if (resolvedBaseModule === null) {
    return [];
  }
  const baseTarget = resolvedBaseModule.length > 0 ? resolvePythonModuleTarget(
    resolvedBaseModule,
    fileInfo,
    context
  ) : null;
  for (const importedName of statement.importedNames ?? []) {
    if (importedName === "*") {
      if (baseTarget) {
        targets.add(baseTarget);
      }
      continue;
    }
    const submoduleName = joinPythonModuleName(
      resolvedBaseModule,
      importedName
    );
    const submoduleTarget = submoduleName.length > 0 ? resolvePythonModuleTarget(
      submoduleName,
      fileInfo,
      context
    ) : null;
    if (submoduleTarget) {
      targets.add(submoduleTarget);
      continue;
    }
    if (baseTarget) {
      targets.add(baseTarget);
    }
  }
  return Array.from(targets);
}
function resolvePythonFromBaseModule(statement, fileInfo) {
  const relativeLevel = statement.relativeLevel ?? 0;
  const moduleParts = splitPythonModuleName(
    statement.moduleName ?? ""
  );
  if (relativeLevel === 0) {
    return joinPythonModuleParts(moduleParts);
  }
  const packageParts = splitPythonModuleName(
    fileInfo.packageName
  );
  const ascendCount = relativeLevel - 1;
  if (ascendCount > packageParts.length) {
    return null;
  }
  return joinPythonModuleParts([
    ...packageParts.slice(
      0,
      packageParts.length - ascendCount
    ),
    ...moduleParts
  ]);
}
function splitPythonModuleName(moduleName) {
  return moduleName.split(".").map((part) => part.trim()).filter((part) => part.length > 0);
}
function joinPythonModuleName(baseModuleName, suffix) {
  return joinPythonModuleParts([
    ...splitPythonModuleName(baseModuleName),
    ...splitPythonModuleName(suffix)
  ]);
}
function joinPythonModuleParts(parts) {
  return parts.join(".");
}
function resolvePythonModuleTarget(moduleName, sourceFile, context) {
  const entries = context.moduleEntriesByName.get(
    moduleName
  );
  if (!entries || entries.length === 0) {
    return null;
  }
  const bestMatch = [...entries].sort(
    (a, b) => comparePythonModuleEntries(
      a,
      b,
      sourceFile
    )
  )[0];
  return bestMatch?.fileId ?? null;
}
function comparePythonModuleEntries(a, b, sourceFile) {
  return Number(b.rootPath === sourceFile.rootPath) - Number(a.rootPath === sourceFile.rootPath) || Number(a.isStub) - Number(b.isStub) || Number(a.isPackageInit) - Number(b.isPackageInit) || a.fileId.localeCompare(b.fileId);
}
const WIKILINK_PATTERN = /\[\[([^\]]+)\]\]/g;
const JS_TS_CODE_EXTENSIONS = /* @__PURE__ */ new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx"
]);
const CODE_EXTENSIONS = /* @__PURE__ */ new Set([
  ...Array.from(JS_TS_CODE_EXTENSIONS),
  ...Array.from(PYTHON_CODE_EXTENSIONS)
]);
const EXTRA_IMPORT_SCAN_EXTENSIONS = [".css", ".json"];
const CONFIG_NAME_PATTERN = /^(?:ts|js)config(?:\.[^.]+)*\.json$/;
const CRUISE_IGNORE_PATTERN = "(^|/)(node_modules|dist|build|out)/";
const CONFIG_SEARCH_IGNORED_DIRS = /* @__PURE__ */ new Set([
  ".git",
  "node_modules",
  "dist",
  "build",
  "out"
]);
const CONFIG_NAME_PRIORITIES = /* @__PURE__ */ new Map([
  ["tsconfig.web.json", 40],
  ["tsconfig.app.json", 30],
  ["tsconfig.node.json", 20],
  ["tsconfig.json", 10],
  ["jsconfig.json", 5]
]);
async function buildWorkspaceGraph(workspacePath2, filter = null) {
  const activeFilter = filter ?? createFileFilter();
  const files = await collectFiles(
    workspacePath2,
    workspacePath2,
    activeFilter
  );
  const mdFiles = files.filter(
    (f) => f.analysisType === "markdown" && f.content !== null
  );
  const codeFiles = files.filter(
    (f) => f.analysisType === "code"
  );
  const nodes = files.map((f) => ({
    id: f.id,
    title: f.title,
    path: f.path,
    nodeType: f.nodeType,
    weight: f.content?.length ?? 0
  }));
  const nodeIds = new Set(nodes.map((n) => n.id));
  const links = [];
  const seenLinks = /* @__PURE__ */ new Set();
  function addLink(source, target, linkType) {
    if (!nodeIds.has(target)) return;
    if (target === source) return;
    const key = `${source}->${target}`;
    if (seenLinks.has(key)) return;
    seenLinks.add(key);
    links.push({ source, target, linkType });
  }
  const stemToId = /* @__PURE__ */ new Map();
  const ambiguousStems = /* @__PURE__ */ new Set();
  for (const file of mdFiles) {
    const stem = basename(file.id, extname(file.id));
    if (stemToId.has(stem)) {
      ambiguousStems.add(stem);
    } else {
      stemToId.set(stem, file.id);
    }
  }
  for (const file of mdFiles) {
    const matches = file.content.matchAll(WIKILINK_PATTERN);
    for (const match of matches) {
      const rawTarget = match[1];
      if (!rawTarget) continue;
      const target = rawTarget.trim();
      const targetId = stemToId.get(target);
      if (!targetId || ambiguousStems.has(target)) continue;
      addLink(file.id, targetId, "wikilink");
    }
  }
  let importLinks = [];
  try {
    importLinks = await buildCodeImportLinks(
      codeFiles,
      workspacePath2,
      nodeIds
    );
  } catch (error) {
    console.warn(
      "Failed to build code import links:",
      error
    );
  }
  for (const link of importLinks) {
    addLink(link.source, link.target, "import");
  }
  return { nodes, links };
}
async function collectFiles(dirPath, rootPath, filter) {
  let entries;
  try {
    entries = await readdir(dirPath, { withFileTypes: true });
  } catch {
    return [];
  }
  const results = [];
  for (const entry of entries) {
    if (entry.name.startsWith(".")) {
      continue;
    }
    const fullPath = join(dirPath, entry.name);
    const relPath = relative(rootPath, fullPath);
    if (entry.isDirectory()) {
      if (!await shouldIncludeEntryWithContent(dirPath, entry, filter, rootPath)) {
        continue;
      }
      const children = await collectFiles(fullPath, rootPath, filter);
      results.push(...children);
      continue;
    }
    if (!await shouldIncludeEntryWithContent(dirPath, entry, filter, rootPath)) {
      continue;
    }
    const ext = extname(entry.name);
    const isMarkdown = ext === ".md";
    const isCode = CODE_EXTENSIONS.has(ext);
    const analysisType = isMarkdown ? "markdown" : isCode ? "code" : null;
    let title = entry.name;
    let content = null;
    if (isMarkdown) {
      try {
        content = await readFile(fullPath, "utf-8");
        const titleMatch = content.match(
          /^---\n[\s\S]*?title:\s*["']?(.+?)["']?\s*\n[\s\S]*?---/
        );
        if (titleMatch?.[1]) {
          title = titleMatch[1];
        }
      } catch {
      }
    }
    results.push({
      id: relPath,
      title,
      path: fullPath,
      content,
      nodeType: isCode ? "code" : "file",
      analysisType
    });
  }
  return results;
}
async function buildCodeImportLinks(codeFiles, workspacePath2, nodeIds) {
  if (codeFiles.length === 0) {
    return [];
  }
  const jsTsFiles = codeFiles.filter(
    (file) => JS_TS_CODE_EXTENSIONS.has(
      extname(file.path)
    )
  );
  const pythonFiles = codeFiles.filter(
    (file) => PYTHON_CODE_EXTENSIONS.has(
      extname(file.path)
    )
  );
  const results = await Promise.allSettled([
    buildJavaScriptTypeScriptImportLinks(
      jsTsFiles,
      workspacePath2,
      nodeIds
    ),
    buildPythonImportLinks(
      pythonFiles,
      workspacePath2,
      nodeIds
    )
  ]);
  const links = [];
  const [jsTsResult, pythonResult] = results;
  if (jsTsResult?.status === "fulfilled") {
    links.push(...jsTsResult.value);
  } else if (jsTsResult) {
    console.warn(
      "Failed to build JS/TS import links:",
      jsTsResult.reason
    );
  }
  if (pythonResult?.status === "fulfilled") {
    links.push(...pythonResult.value);
  } else if (pythonResult) {
    console.warn(
      "Failed to build Python import links:",
      pythonResult.reason
    );
  }
  return links;
}
async function buildJavaScriptTypeScriptImportLinks(codeFiles, workspacePath2, nodeIds) {
  if (codeFiles.length === 0) {
    return [];
  }
  const links = [];
  const seenLinks = /* @__PURE__ */ new Set();
  const codeIds = new Set(
    codeFiles.map((file) => file.id)
  );
  const groups = await groupCodeFilesByCruiserContext(
    codeFiles,
    workspacePath2
  );
  for (const group of groups) {
    const cruiseOptions = {
      baseDir: workspacePath2,
      doNotFollow: CRUISE_IGNORE_PATTERN,
      exclude: CRUISE_IGNORE_PATTERN,
      tsPreCompilationDeps: true,
      extraExtensionsToScan: EXTRA_IMPORT_SCAN_EXTENSIONS
    };
    if (group.context.tsConfigFileName) {
      cruiseOptions.tsConfig = {
        fileName: group.context.tsConfigFileName
      };
    }
    const resolveOptions = {
      extensions: [
        ...Array.from(CODE_EXTENSIONS),
        ...EXTRA_IMPORT_SCAN_EXTENSIONS
      ],
      conditionNames: [
        "import",
        "module",
        "require",
        "default",
        "node",
        "browser"
      ],
      exportsFields: ["exports"],
      mainFields: ["module", "main"]
    };
    if (group.context.tsConfigFileName) {
      resolveOptions.tsConfig = group.context.tsConfigFileName;
    }
    if (Object.keys(group.context.alias).length > 0) {
      resolveOptions.alias = group.context.alias;
    }
    const reporterOutput = await cruise(
      group.files.map((file) => file.id),
      cruiseOptions,
      resolveOptions,
      group.context.tsConfig ? {
        tsConfig: group.context.tsConfig
      } : void 0
    );
    const cruiseResult = reporterOutput.output;
    if (typeof cruiseResult === "string") {
      continue;
    }
    for (const module of cruiseResult.modules) {
      const source = normalizeCruiserPath(
        module.source,
        workspacePath2
      );
      if (!source) {
        continue;
      }
      if (!codeIds.has(source)) {
        continue;
      }
      for (const dependency of module.dependencies) {
        if (dependency.couldNotResolve) {
          continue;
        }
        const target = normalizeCruiserPath(
          dependency.resolved,
          workspacePath2
        );
        if (!target || !nodeIds.has(target) || target === source) {
          continue;
        }
        const key = `${source}->${target}`;
        if (seenLinks.has(key)) {
          continue;
        }
        seenLinks.add(key);
        links.push({ source, target });
      }
    }
  }
  return links;
}
async function groupCodeFilesByCruiserContext(codeFiles, workspacePath2) {
  const candidates = await listConfigCandidates(workspacePath2);
  const groups = /* @__PURE__ */ new Map();
  for (const file of codeFiles) {
    const context = getDependencyCruiserContext(
      file.path,
      candidates
    );
    const key = context.tsConfigFileName ?? "__default__";
    const existing = groups.get(key);
    if (existing) {
      existing.files.push(file);
      continue;
    }
    groups.set(key, {
      context,
      files: [file]
    });
  }
  return Array.from(groups.values());
}
async function listConfigCandidates(workspacePath2) {
  const configPaths = await listTypeScriptConfigPaths(workspacePath2);
  return configPaths.map((configPath2) => {
    try {
      const parsed = extractTSConfig(configPath2);
      return {
        configPath: configPath2,
        configDir: dirname(configPath2),
        parsed,
        score: scoreConfigCandidate(
          configPath2,
          parsed
        )
      };
    } catch {
      return null;
    }
  }).filter(
    (candidate) => candidate !== null
  ).sort(compareConfigCandidates);
}
function getDependencyCruiserContext(filePath, candidates) {
  const relevantCandidates = candidates.filter(
    (candidate) => isPathWithinDirectory(
      filePath,
      candidate.configDir
    )
  );
  const bestCandidate = relevantCandidates[0] ?? candidates[0];
  if (!bestCandidate) {
    return { alias: {} };
  }
  const alias = {};
  for (const candidate of relevantCandidates) {
    for (const [from, to] of extractAliasEntries(
      candidate.configPath,
      candidate.parsed
    )) {
      if (!(from in alias)) {
        alias[from] = to;
      }
    }
  }
  return {
    alias,
    tsConfigFileName: bestCandidate.configPath,
    tsConfig: bestCandidate.parsed
  };
}
async function listTypeScriptConfigPaths(workspacePath2) {
  const configPaths = [];
  await collectTypeScriptConfigPaths(
    workspacePath2,
    configPaths
  );
  return configPaths;
}
async function collectTypeScriptConfigPaths(dirPath, configPaths) {
  let entries;
  try {
    entries = await readdir(dirPath, {
      withFileTypes: true
    });
  } catch {
    return;
  }
  for (const entry of entries) {
    const fullPath = join(dirPath, entry.name);
    if (entry.isDirectory()) {
      if (CONFIG_SEARCH_IGNORED_DIRS.has(
        entry.name
      )) {
        continue;
      }
      await collectTypeScriptConfigPaths(
        fullPath,
        configPaths
      );
      continue;
    }
    if (entry.isFile() && CONFIG_NAME_PATTERN.test(entry.name)) {
      configPaths.push(fullPath);
    }
  }
}
function scoreConfigCandidate(configPath2, parsed) {
  const fileName = basename(configPath2);
  const pathCount = Object.keys(
    parsed.options.paths ?? {}
  ).length;
  return (CONFIG_NAME_PRIORITIES.get(fileName) ?? 0) + pathCount * 100 + (parsed.options.jsx !== void 0 ? 10 : 0) + (parsed.options.baseUrl !== void 0 ? 5 : 0);
}
function extractAliasEntries(configPath2, parsed) {
  const paths = parsed.options.paths;
  if (!paths) {
    return [];
  }
  const configDir = dirname(configPath2);
  const baseUrl = typeof parsed.options.baseUrl === "string" ? resolve$1(configDir, parsed.options.baseUrl) : configDir;
  return Object.entries(paths).map(([key, values]) => {
    if (key.includes("*") || values.length !== 1) {
      return null;
    }
    const firstValue = values[0];
    if (!firstValue || firstValue.includes("*")) {
      return null;
    }
    return [
      key,
      resolve$1(
        baseUrl,
        firstValue
      )
    ];
  }).filter(
    (entry) => entry !== null
  );
}
function compareConfigCandidates(a, b) {
  return b.score - a.score || b.configDir.length - a.configDir.length;
}
function isPathWithinDirectory(filePath, dirPath) {
  const relPath = relative(dirPath, filePath);
  return relPath === "" || !relPath.startsWith("..") && !isAbsolute(relPath);
}
function normalizeCruiserPath(value, workspacePath2) {
  if (!value) {
    return null;
  }
  let normalized = value.replaceAll("\\", "/").replace(/^\.\/+/, "");
  if (workspacePath2) {
    const resolvedPath = resolve$1(
      workspacePath2,
      normalized
    );
    const relativePath = relative(
      workspacePath2,
      resolvedPath
    ).replaceAll("\\", "/");
    if (relativePath !== "" && !relativePath.startsWith("../") && !isAbsolute(relativePath)) {
      normalized = relativePath;
    }
  }
  return normalized.length > 0 ? normalized : null;
}
function registerKnowledgeHandlers(ctx) {
  ipcMain.handle(
    "wikilink:resolve",
    (_event, target) => resolve(target)
  );
  ipcMain.handle(
    "wikilink:suggest",
    (_event, partial) => suggest(partial)
  );
  ipcMain.handle(
    "wikilink:backlinks",
    (_event, filePath) => backlinksWithContext(filePath)
  );
  ipcMain.handle(
    "workspace:get-graph",
    async (_event, params) => buildWorkspaceGraph(
      params.workspacePath,
      ctx.fileFilter()
    )
  );
  ipcMain.handle(
    "nav:get-selected-file",
    () => {
      const wsPath = ctx.getActiveWorkspacePath();
      if (!wsPath) return null;
      return ctx.getWorkspaceConfig(wsPath)?.selected_file ?? null;
    }
  );
  ipcMain.on("nav:select-file", (_event, path2) => {
    const active = ctx.getActiveWorkspacePath();
    if (active) {
      const config2 = ctx.getWorkspaceConfig(active);
      config2.selected_file = path2;
      saveWorkspaceConfig(active, config2);
    }
    if (path2) {
      ctx.trackEvent("file_selected", {
        ext: extname(path2)
      });
    }
    ctx.forwardToWebview("viewer", "file-selected", path2);
    ctx.forwardToWebview("nav", "file-selected", path2);
  });
  ipcMain.on(
    "nav:select-folder",
    (_event, path2) => {
      ctx.trackEvent("folder_selected");
      ctx.forwardToWebview(
        "viewer",
        "folder-selected",
        path2
      );
    }
  );
  ipcMain.on(
    "nav:open-in-terminal",
    (_event, path2) => {
      ctx.trackEvent("file_opened_in_terminal");
      ctx.forwardToWebview(
        "canvas",
        "open-terminal",
        path2
      );
    }
  );
  ipcMain.on(
    "nav:create-graph-tile",
    (_event, folderPath) => {
      /* graph tile disabled - no-op */
    }
  );
}
const STATE_DIR = COLLAB_DIR$1;
const STATE_FILE = join(STATE_DIR, "canvas-state.json");
async function loadState() {
  try {
    const raw = await readFile(STATE_FILE, "utf-8");
    const state = JSON.parse(raw);
    if (state.version !== 1) return null;
    return state;
  } catch {
    return null;
  }
}
async function saveState(state) {
  if (!existsSync(STATE_DIR)) {
    await mkdir(STATE_DIR, { recursive: true });
  }
  const tmp = join(
    tmpdir(),
    `canvas-state-${crypto.randomUUID()}.json`
  );
  const json = JSON.stringify(state, null, 2);
  await writeFile(tmp, json, "utf-8");
  await rename(tmp, STATE_FILE);
}
function registerCanvasHandlers(ctx) {
  let pendingDragPaths = [];
  ipcMain.handle(
    "canvas:load-state",
    async () => loadState()
  );
  ipcMain.handle(
    "canvas:save-state",
    async (_event, state) => saveState(state)
  );
  ipcMain.on(
    "canvas:forward-pinch",
    (_event, deltaY) => {
      ctx.mainWindow()?.webContents.send("canvas:pinch", deltaY);
    }
  );
  ipcMain.on(
    "drag:set-paths",
    (_event, paths) => {
      pendingDragPaths = paths;
      ctx.forwardToWebview(
        "viewer",
        "nav-drag-active",
        true
      );
    }
  );
  ipcMain.on("drag:clear-paths", () => {
    pendingDragPaths = [];
    ctx.forwardToWebview(
      "viewer",
      "nav-drag-active",
      false
    );
  });
  ipcMain.handle("drag:get-paths", () => {
    const paths = pendingDragPaths;
    pendingDragPaths = [];
    return paths;
  });
}
const MAX_RESTARTS = 3;
let worker = null;
let notifyFn = null;
let restartCount = 0;
let stopping = false;
function workerPath() {
  return join(__dirname, "git-replay-worker.js");
}
function startWorker() {
  if (worker) return;
  stopping = false;
  worker = utilityProcess.fork(workerPath());
  worker.on("message", (data) => {
    notifyFn?.(data);
  });
  worker.on("exit", (code) => {
    worker = null;
    if (stopping) return;
    if (restartCount >= MAX_RESTARTS) {
      console.error(
        `[git-replay] Worker exited ${MAX_RESTARTS} times, giving up`
      );
      return;
    }
    console.warn(
      `[git-replay] Worker exited with code ${code}, restarting`
    );
    restartCount++;
    startWorker();
  });
}
function setNotifyFn(fn) {
  notifyFn = fn;
}
function startReplay(workspacePath2) {
  try {
    accessSync(join(workspacePath2, ".git"));
  } catch {
    return false;
  }
  restartCount = 0;
  if (!worker) startWorker();
  const cachePath = join(
    workspacePath2,
    ".collaborator",
    "replay-cache.json"
  );
  worker?.postMessage({ cmd: "start", workspacePath: workspacePath2, cachePath });
  return true;
}
function stopReplay() {
  worker?.postMessage({ cmd: "stop" });
}
function stopWorker() {
  if (!worker) return;
  stopping = true;
  worker.postMessage({ cmd: "close" });
  worker.kill();
  worker = null;
}
function validateUrl(url) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error(`Invalid URL: ${url}`);
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new Error(
      `Only http and https URLs are supported, got: ${parsed.protocol}`
    );
  }
}
function validateWorkspaceBoundary(targetDir, workspaceRoot) {
  if (targetDir !== workspaceRoot && !targetDir.startsWith(workspaceRoot + "/")) {
    throw new Error("Target directory is outside workspace");
  }
}
function sanitizeFilename(title) {
  return title.replace(/[/\\:*?"<>|]/g, "").replace(/\s+/g, " ").trim();
}
async function uniquePath(dir, name) {
  const ext = extname(name);
  const stem = basename(name, ext);
  let candidate = join(dir, `${stem}${ext}`);
  let n = 2;
  while (true) {
    try {
      await access(candidate);
      candidate = join(dir, `${stem} ${n}${ext}`);
      n++;
    } catch {
      return candidate;
    }
  }
}
function fixMalformedLinkedImages(md) {
  return md.replace(
    /\[\s*\n\s*(!\[[^\]]*\]\([^)]+\))\s*\n\s*\]\(([^)]+)\)/g,
    "[$1]($2)"
  );
}
function buildFrontmatter(fields) {
  const lines = ["---"];
  for (const [key, value] of Object.entries(fields)) {
    if (value != null) {
      lines.push(`${key}: ${JSON.stringify(value)}`);
    }
  }
  lines.push("---");
  return lines.join("\n");
}
async function importWebArticle(url, targetDir, workspaceRoot) {
  validateUrl(url);
  validateWorkspaceBoundary(targetDir, workspaceRoot);
  const result = await Parser.parse(url, { contentType: "markdown" });
  if (!result || !result.content) {
    throw new Error(
      `Could not extract content from ${url}. The page may be empty, paywalled, or use JavaScript rendering.`
    );
  }
  const title = result.title || new URL(url).hostname;
  const content = fixMalformedLinkedImages(result.content);
  const frontmatter = buildFrontmatter({
    type: "article",
    url,
    source_author: result.author ?? void 0,
    date_published: result.date_published ?? void 0,
    domain: result.domain ?? void 0,
    excerpt: result.excerpt ?? void 0,
    lead_image_url: result.lead_image_url ?? void 0,
    imported_at: (/* @__PURE__ */ new Date()).toISOString()
  });
  const filename = sanitizeFilename(title) + ".md";
  const filePath = await uniquePath(targetDir, filename);
  const fileContent = frontmatter + "\n\n" + content + "\n";
  await fsWriteFile(filePath, fileContent);
  return { path: filePath };
}
const SOCKET_PATH = join(COLLAB_DIR$1, "ipc.sock");
const BASE_DIR = join(homedir(), ".collaborator");
const SOCKET_PATH_FILE = join(BASE_DIR, "socket-path");
const methods = /* @__PURE__ */ new Map();
function discoverMethods() {
  return [...methods.entries()].map(([name, entry]) => ({
    name,
    description: entry.description,
    ...entry.params ? { params: entry.params } : {}
  }));
}
let server = null;
const connections = /* @__PURE__ */ new Set();
function isJsonRpcRequest(obj) {
  if (typeof obj !== "object" || obj === null) return false;
  const rec = obj;
  return rec.jsonrpc === "2.0" && (typeof rec.id === "number" || typeof rec.id === "string") && typeof rec.method === "string";
}
function makeErrorResponse(id, code, message) {
  return { jsonrpc: "2.0", id, error: { code, message } };
}
async function handleMessage(raw) {
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return makeErrorResponse(null, -32700, "Parse error");
  }
  if (!isJsonRpcRequest(parsed)) {
    return makeErrorResponse(null, -32600, "Invalid request");
  }
  const entry = methods.get(parsed.method);
  const handler = entry?.handler;
  if (!handler) {
    return makeErrorResponse(
      parsed.id,
      -32601,
      `Method not found: ${parsed.method}`
    );
  }
  try {
    const result = await handler(parsed.params);
    return { jsonrpc: "2.0", id: parsed.id, result };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return makeErrorResponse(parsed.id, -32e3, message);
  }
}
function handleConnection(socket) {
  connections.add(socket);
  let buffer = "";
  socket.on("data", (chunk) => {
    buffer += chunk.toString();
    let newlineIdx = buffer.indexOf("\n");
    while (newlineIdx !== -1) {
      const line = buffer.slice(0, newlineIdx).trim();
      buffer = buffer.slice(newlineIdx + 1);
      if (line.length > 0) {
        void handleMessage(line).then((response) => {
          if (response && !socket.destroyed) {
            socket.write(JSON.stringify(response) + "\n");
          }
        });
      }
      newlineIdx = buffer.indexOf("\n");
    }
  });
  socket.on("close", () => {
    connections.delete(socket);
  });
  socket.on("error", (err) => {
    console.error("[json-rpc] Socket error:", err.message);
    connections.delete(socket);
  });
}
function cleanupStaleSocket() {
  if (existsSync(SOCKET_PATH)) {
    try {
      unlinkSync(SOCKET_PATH);
    } catch {
    }
  }
}
function registerMethod(method, handler, meta) {
  methods.set(method, {
    handler,
    description: meta?.description ?? "",
    params: meta?.params
  });
}
function startJsonRpcServer() {
  return new Promise((resolve2, reject) => {
    mkdirSync(COLLAB_DIR$1, { recursive: true });
    cleanupStaleSocket();
    server = createServer(handleConnection);
    server.on("error", (err) => {
      console.error("[json-rpc] Server error:", err.message);
      reject(err);
    });
    registerMethod(
      "rpc.discover",
      () => ({ methods: discoverMethods() }),
      { description: "List all available RPC methods" }
    );
    server.listen(SOCKET_PATH, () => {
      writeFileSync(SOCKET_PATH_FILE, SOCKET_PATH, "utf-8");
      console.log(
        `[json-rpc] Listening on ${SOCKET_PATH}`
      );
      resolve2();
    });
  });
}
function stopJsonRpcServer() {
  for (const socket of connections) {
    socket.destroy();
  }
  connections.clear();
  if (server) {
    server.close();
    server = null;
  }
  cleanupStaleSocket();
  try {
    unlinkSync(SOCKET_PATH_FILE);
  } catch {
  }
}
function registerMiscHandlers(ctx) {
  ipcMain.handle("dialog:open-folder", async () => {
    const win = ctx.mainWindow();
    if (!win) return null;
    const result = await dialog.showOpenDialog(win, {
      properties: ["openDirectory"]
    });
    if (result.canceled || result.filePaths.length === 0) {
      return null;
    }
    return result.filePaths[0];
  });
  ipcMain.handle("dialog:open-image", async () => {
    const win = ctx.mainWindow();
    if (!win) return null;
    const result = await dialog.showOpenDialog(win, {
      properties: ["openFile"],
      filters: [
        {
          name: "Images",
          extensions: [
            "png",
            "jpg",
            "jpeg",
            "gif",
            "webp",
            "bmp",
            "tiff",
            "tif",
            "avif",
            "heic",
            "heif"
          ]
        }
      ]
    });
    if (result.canceled || result.filePaths.length === 0) {
      return null;
    }
    return result.filePaths[0];
  });
  ipcMain.handle(
    "dialog:confirm",
    async (_event, opts) => {
      const win = ctx.mainWindow();
      if (!win) return 0;
      const result = await dialog.showMessageBox(win, {
        type: "warning",
        message: opts.message,
        detail: opts.detail,
        buttons: opts.buttons ?? ["OK", "Cancel"]
      });
      return result.response;
    }
  );
  ipcMain.handle(
    "context-menu:show",
    async (_event, items) => {
      const win = ctx.mainWindow();
      if (!win) return null;
      return new Promise((resolve2) => {
        const menu = Menu.buildFromTemplate(
          items.map((item) => {
            if (item.id === "separator") {
              return { type: "separator" };
            }
            return {
              label: item.label,
              enabled: item.enabled ?? true,
              click: () => resolve2(item.id)
            };
          })
        );
        menu.popup({
          window: win,
          callback: () => resolve2(null)
        });
      });
    }
  );
  ipcMain.on(
    "shell:open-external",
    (_event, url) => {
      if (/^https?:\/\//i.test(url)) shell.openExternal(url);
    }
  );
  {
    setNotifyFn((msg) => {
      ctx.forwardToWebview(
        `viewer:${msg.workspacePath}`,
        "replay:data",
        msg
      );
    });
  }
  ipcMain.handle(
    "replay:start",
    (_event, params) => {
      return startReplay(params.workspacePath);
    }
  );
  ipcMain.handle("replay:stop", () => {
    stopReplay();
  });
  ipcMain.handle(
    "import:web-article",
    async (_event, url, targetDir) => {
      const ws = ctx.getActiveWorkspacePath();
      if (!ws) {
        throw new Error("No active workspace");
      }
      const articleResult = await importWebArticle(
        url,
        targetDir,
        ws
      );
      ctx.trackEvent("web_article_imported");
      return articleResult;
    }
  );
  setNotifyFn$1((event) => {
    ctx.forwardToWebview(
      "viewer",
      `agent:${event.kind}`,
      event
    );
  });
  ipcMain.handle(
    "agent:focus-session",
    (_event, sessionId) => {
      const ptyId = getPtySessionId(sessionId);
      if (ptyId) {
        ctx.forwardToWebview(
          "terminal",
          "focus-tab",
          ptyId
        );
      }
    }
  );
  ipcMain.on(
    "viewer:run-in-terminal",
    (_event, command) => {
      ctx.forwardToWebview(
        "terminal",
        "run-in-terminal",
        command
      );
    }
  );
  registerMethod(
    "agent.sessionStart",
    (params) => {
      const p = params;
      sessionStart(p);
      if (p.pty_session_id) {
        linkPtySession(
          p.session_id,
          p.pty_session_id
        );
      }
      return { ok: true };
    },
    {
      description: "Register a new agent session",
      params: {
        session_id: "Unique session identifier",
        cwd: "Working directory of the agent",
        pty_session_id: "(optional) PTY session to link"
      }
    }
  );
  registerMethod(
    "agent.fileTouched",
    (params) => {
      const p = params;
      fileTouched(p);
      return { ok: true };
    },
    {
      description: "Log a file read/write by an agent",
      params: {
        session_id: "Agent session identifier",
        tool_name: "Tool that accessed the file",
        file_path: "Absolute path to the file"
      }
    }
  );
  registerMethod(
    "agent.sessionEnd",
    (params) => {
      const p = params;
      sessionEnd(p);
      return { ok: true };
    },
    {
      description: "End an agent session",
      params: {
        session_id: "Agent session identifier"
      }
    }
  );
  registerMethod(
    "app.notify",
    (params) => {
      const p = params;
      const note = new Notification({
        title: p.title ?? "D-Terminal",
        body: p.body
      });
      note.show();
      return { ok: true };
    },
    {
      description: "Show a native macOS notification",
      params: {
        title: "(optional) Notification title, defaults to 'D-Terminal'",
        body: "Notification body text"
      }
    }
  );
}
const FS_CHANGE_DELETED = 3;
let appConfig;
let mainWindow$1 = null;
const fileFilterRef = {
  current: null
};
function activeWorkspacePath() {
  const { workspaces, active_workspace } = appConfig;
  return workspaces[active_workspace] ?? "";
}
function forwardToWebview(target, channel, ...args) {
  mainWindow$1?.webContents.send(
    "shell:forward",
    target,
    channel,
    ...args
  );
}
function setMainWindow(win) {
  mainWindow$1 = win;
}
function registerIpcHandlers(config2) {
  appConfig = config2;
  const wsPath = activeWorkspacePath();
  if (wsPath) {
    startWorkspaceServices(wsPath, (f) => {
      fileFilterRef.current = f;
    });
  }
  setNotifyFn$2((events) => {
    const changedPaths = events.flatMap(
      (event) => event.changes.map((change) => change.path)
    );
    fileFilterRef.current?.invalidateBinaryCache(changedPaths);
    invalidateImageCache(changedPaths);
    forwardToWebview("nav", "fs-changed", events);
    forwardToWebview("viewer", "fs-changed", events);
    for (const event of events) {
      for (const change of event.changes) {
        if (!change.path.endsWith(".md")) continue;
        if (change.type === FS_CHANGE_DELETED) {
          removeFile(change.path);
        } else {
          void updateFile(change.path);
        }
      }
    }
    const recentlyRenamed = getRecentlyRenamedRefCounts();
    const deletedPaths = events.flatMap(
      (e) => e.changes.filter(
        (c) => c.type === FS_CHANGE_DELETED && !recentlyRenamed.has(c.path)
      ).map((c) => c.path)
    );
    if (deletedPaths.length > 0) {
      forwardToWebview("nav", "files-deleted", deletedPaths);
      forwardToWebview(
        "viewer",
        "files-deleted",
        deletedPaths
      );
      const active = activeWorkspacePath();
      if (active) {
        const wsConfig = getWorkspaceConfig(active);
        if (wsConfig.selected_file && deletedPaths.includes(wsConfig.selected_file)) {
          wsConfig.selected_file = null;
          saveWorkspaceConfig(active, wsConfig);
        }
      }
    }
  });
  const fsCtx = {
    mainWindow: () => mainWindow$1,
    getActiveWorkspacePath: activeWorkspacePath,
    getWorkspaceConfig,
    saveWorkspaceConfig: (path2, cfg) => saveWorkspaceConfig(path2, cfg),
    fileFilter: () => fileFilterRef.current,
    forwardToWebview,
    trackEvent
  };
  const wsCtx = {
    mainWindow: () => mainWindow$1,
    getActiveWorkspacePath: activeWorkspacePath,
    forwardToWebview
  };
  const sharedCtx = {
    mainWindow: () => mainWindow$1,
    getActiveWorkspacePath: () => activeWorkspacePath() || null,
    getWorkspaceConfig: (path2) => getWorkspaceConfig(path2),
    fileFilter: () => fileFilterRef.current,
    forwardToWebview,
    trackEvent
  };
  registerFilesystemHandlers(fsCtx);
  registerWorkspaceHandlers(wsCtx, appConfig, fileFilterRef);
  registerKnowledgeHandlers(sharedCtx);
  registerCanvasHandlers(sharedCtx);
  registerMiscHandlers(sharedCtx);
}
const pending = /* @__PURE__ */ new Map();
const REQUEST_TIMEOUT_MS = 1e4;
let shellWindow = null;
function sendToShell(method, params) {
  if (!shellWindow || shellWindow.isDestroyed()) {
    return Promise.reject(new Error("Shell window not available"));
  }
  const requestId = randomUUID();
  return new Promise((resolve2, reject) => {
    const timer = setTimeout(() => {
      pending.delete(requestId);
      reject(new Error(`canvas RPC timed out: ${method}`));
    }, REQUEST_TIMEOUT_MS);
    pending.set(requestId, { resolve: resolve2, reject, timer });
    shellWindow.webContents.send("canvas:rpc-request", {
      requestId,
      method,
      params
    });
  });
}
function registerCanvasRpc(win) {
  shellWindow = win;
  ipcMain.on(
    "canvas:rpc-response",
    (_event, response) => {
      const entry = pending.get(response.requestId);
      if (!entry) return;
      pending.delete(response.requestId);
      clearTimeout(entry.timer);
      if (response.error) {
        entry.reject(new Error(response.error.message));
      } else {
        entry.resolve(response.result);
      }
    }
  );
  registerMethod(
    "canvas.tileList",
    (params) => sendToShell("canvas.tileList", params),
    {
      description: "List all canvas tiles with positions",
      params: {}
    }
  );
  registerMethod(
    "canvas.tileAdd",
    (params) => sendToShell("canvas.tileAdd", params),
    {
      description: "Create a new tile on the canvas",
      params: {
        type: "Tile type (note, code, image, graph, terminal)",
        filePath: "(optional) Absolute path to file",
        folderPath: "(optional) Absolute path to folder",
        position: "(optional) {x, y} canvas coordinates",
        size: "(optional) {width, height} in pixels"
      }
    }
  );
  registerMethod(
    "canvas.tileRemove",
    (params) => sendToShell("canvas.tileRemove", params),
    {
      description: "Remove a tile from the canvas",
      params: { tileId: "ID of the tile to remove" }
    }
  );
  registerMethod(
    "canvas.tileMove",
    (params) => sendToShell("canvas.tileMove", params),
    {
      description: "Move a tile to a new position",
      params: {
        tileId: "ID of the tile to move",
        position: "{x, y} canvas coordinates"
      }
    }
  );
  registerMethod(
    "canvas.tileResize",
    (params) => sendToShell("canvas.tileResize", params),
    {
      description: "Resize a tile",
      params: {
        tileId: "ID of the tile to resize",
        size: "{width, height} in pixels"
      }
    }
  );
  registerMethod(
    "canvas.viewportGet",
    (params) => sendToShell("canvas.viewportGet", params),
    {
      description: "Get current canvas viewport (pan and zoom)",
      params: {}
    }
  );
  registerMethod(
    "canvas.viewportSet",
    (params) => sendToShell("canvas.viewportSet", params),
    {
      description: "Set canvas viewport pan and zoom",
      params: {
        x: "Viewport x offset",
        y: "Viewport y offset",
        zoom: "Zoom level (1 = 100%)"
      }
    }
  );
}
function agentDetected(id) {
  const home = homedir();
  switch (id) {
    case "claude":
      return existsSync(join(home, ".claude")) || isOnPath("claude");
    case "codex":
      return existsSync(join(home, ".codex")) || isOnPath("codex");
    case "gemini":
      return existsSync(join(home, ".gemini")) || isOnPath("gemini");
  }
}
function isOnPath(command) {
  try {
    execSync(`which ${command}`, { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}
function skillSourceDir() {
  const candidates = [
    join(app.getAppPath(), "packages", "collab-canvas-skill"),
    join(__dirname, "..", "..", "packages", "collab-canvas-skill"),
    join(__dirname, "..", "packages", "collab-canvas-skill")
  ];
  for (const dir of candidates) {
    if (existsSync(join(dir, "skills", "collab-canvas", "SKILL.md"))) {
      return dir;
    }
  }
  return candidates[0];
}
function skillInstallPath(id) {
  const home = homedir();
  switch (id) {
    case "claude":
      return join(home, ".claude", "skills", "collab-canvas");
    case "codex":
      return join(home, ".codex", "instructions", "collab-canvas.md");
    case "gemini":
      return join(home, ".gemini", "instructions", "collab-canvas.md");
  }
}
function skillInstalled(id) {
  const target = skillInstallPath(id);
  if (id === "claude") {
    return existsSync(join(target, "SKILL.md"));
  }
  return existsSync(target);
}
function installSkill(id) {
  const srcDir = skillSourceDir();
  const target = skillInstallPath(id);
  if (id === "claude") {
    mkdirSync(target, { recursive: true });
    const src = join(srcDir, "skills", "collab-canvas", "SKILL.md");
    writeFileSync(
      join(target, "SKILL.md"),
      readFileSync(src, "utf-8"),
      "utf-8"
    );
    return;
  }
  mkdirSync(join(target, ".."), { recursive: true });
  const sourceFile = id === "codex" ? "collab-canvas-codex.md" : "collab-canvas-gemini.md";
  writeFileSync(
    target,
    readFileSync(join(srcDir, sourceFile), "utf-8"),
    "utf-8"
  );
}
function uninstallSkill(id) {
  const target = skillInstallPath(id);
  if (id === "claude") {
    rmSync(target, { recursive: true, force: true });
    return;
  }
  if (existsSync(target)) rmSync(target);
}
function markerPath() {
  return join(homedir(), ".collaborator", "canvas-plugin-offered");
}
function hasOfferedPlugin() {
  return existsSync(markerPath());
}
function markPluginOffered() {
  const dir = join(homedir(), ".collaborator");
  mkdirSync(dir, { recursive: true });
  writeFileSync(markerPath(), (/* @__PURE__ */ new Date()).toISOString(), "utf-8");
}
function getAgentStatuses() {
  const agents = ["claude", "codex", "gemini"];
  return agents.map((id) => ({
    id,
    name: id === "claude" ? "Claude Code" : id === "codex" ? "Codex CLI" : "Gemini CLI",
    detected: agentDetected(id),
    installed: skillInstalled(id)
  }));
}
function registerIntegrationsIpc() {
  ipcMain.handle(
    "integrations:get-agents",
    () => getAgentStatuses()
  );
  ipcMain.handle(
    "integrations:install-skill",
    (_event, agentId) => {
      installSkill(agentId);
      return { ok: true };
    }
  );
  ipcMain.handle(
    "integrations:uninstall-skill",
    (_event, agentId) => {
      uninstallSkill(agentId);
      return { ok: true };
    }
  );
  ipcMain.handle(
    "integrations:has-offered-plugin",
    () => hasOfferedPlugin()
  );
  ipcMain.handle("integrations:mark-plugin-offered", () => {
    markPluginOffered();
    return { ok: true };
  });
}
const SESSION_DIR = path.join(
  COLLAB_DIR$1,
  "terminal-sessions"
);
const SOCKET_NAME = "collab";
function getApp() {
  try {
    return require2("electron").app;
  } catch {
    return null;
  }
}
function getTmuxBin() {
  const app2 = getApp();
  if (app2?.isPackaged) {
    return path.join(process.resourcesPath, "tmux");
  }
  return "tmux";
}
function getTmuxConf() {
  const app2 = getApp();
  if (app2?.isPackaged) {
    return path.join(process.resourcesPath, "tmux.conf");
  }
  const root = app2?.getAppPath() ?? process.cwd();
  return path.join(root, "resources", "tmux.conf");
}
function getTerminfoDir() {
  const app2 = getApp();
  if (app2?.isPackaged) {
    return path.join(process.resourcesPath, "terminfo");
  }
  return void 0;
}
function baseArgs() {
  return ["-L", SOCKET_NAME, "-u", "-f", getTmuxConf()];
}
function tmuxEnv() {
  const dir = getTerminfoDir();
  if (!dir) return void 0;
  return { ...process.env, TERMINFO: dir };
}
function tmuxExec(...args) {
  return execFileSync(
    getTmuxBin(),
    [...baseArgs(), ...args],
    { encoding: "utf8", timeout: 5e3, env: tmuxEnv() }
  ).trim();
}
function tmuxSessionName(sessionId) {
  return `collab-${sessionId}`;
}
function ensureSessionDir() {
  fs.mkdirSync(SESSION_DIR, { recursive: true });
}
function metaPath(sessionId) {
  return path.join(SESSION_DIR, `${sessionId}.json`);
}
function writeSessionMeta(sessionId, meta) {
  ensureSessionDir();
  fs.writeFileSync(metaPath(sessionId), JSON.stringify(meta));
}
function readSessionMeta(sessionId) {
  try {
    const raw = fs.readFileSync(metaPath(sessionId), "utf8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
function deleteSessionMeta(sessionId) {
  try {
    fs.unlinkSync(metaPath(sessionId));
  } catch {
  }
}
const sessions = /* @__PURE__ */ new Map();
let shuttingDown$1 = false;
function setShuttingDown(value) {
  shuttingDown$1 = value;
}
function getWebContents() {
  try {
    return require2("electron").webContents;
  } catch {
    return null;
  }
}
function sendToSender(senderWebContentsId, channel, payload) {
  if (senderWebContentsId == null) return;
  const wc = getWebContents();
  if (!wc) return;
  const sender = wc.fromId(senderWebContentsId);
  if (sender && !sender.isDestroyed()) {
    sender.send(channel, payload);
  }
}
function utf8Env() {
  const env = { ...process.env };
  if (!env.LANG || !env.LANG.includes("UTF-8")) {
    env.LANG = "en_US.UTF-8";
  }
  const terminfoDir = getTerminfoDir();
  if (terminfoDir) {
    env.TERMINFO = terminfoDir;
  }
  return env;
}
function attachClient(sessionId, cols, rows, senderWebContentsId) {
  const tmuxBin = getTmuxBin();
  const name = tmuxSessionName(sessionId);
  const ptyProcess = pty.spawn(
    tmuxBin,
    ["-L", "collab", "-u", "attach-session", "-t", name],
    { name: "xterm-256color", cols, rows, env: utf8Env() }
  );
  const disposables = [];
  disposables.push(
    ptyProcess.onData((data) => {
      sendToSender(
        senderWebContentsId,
        "pty:data",
        { sessionId, data }
      );
    })
  );
  disposables.push(
    ptyProcess.onExit(() => {
      if (shuttingDown$1) {
        sessions.delete(sessionId);
        return;
      }
      try {
        tmuxExec("has-session", "-t", name);
      } catch {
        deleteSessionMeta(sessionId);
        sendToSender(
          senderWebContentsId,
          "pty:exit",
          { sessionId, exitCode: 0 }
        );
      }
      sessions.delete(sessionId);
    })
  );
  sessions.set(sessionId, {
    pty: ptyProcess,
    shell: "",
    disposables
  });
  return ptyProcess;
}
function createSession(cwd, senderWebContentsId, cols, rows) {
  const sessionId = crypto$1.randomBytes(8).toString("hex");
  const shell2 = process.env.SHELL || "/bin/zsh";
  const name = tmuxSessionName(sessionId);
  const resolvedCwd = cwd || os.homedir();
  const c = cols || 80;
  const r = rows || 24;
  tmuxExec(
    "new-session",
    "-d",
    "-s",
    name,
    "-c",
    resolvedCwd,
    "-x",
    String(c),
    "-y",
    String(r)
  );
  tmuxExec(
    "set-environment",
    "-t",
    name,
    "COLLAB_PTY_SESSION_ID",
    sessionId
  );
  tmuxExec(
    "set-environment",
    "-t",
    name,
    "SHELL",
    shell2
  );
  writeSessionMeta(sessionId, {
    shell: shell2,
    cwd: resolvedCwd,
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  });
  attachClient(sessionId, c, r, senderWebContentsId);
  const session2 = sessions.get(sessionId);
  session2.shell = shell2;
  return { sessionId, shell: shell2 };
}
function stripTrailingBlanks(text) {
  const lines = text.split("\n");
  let end = lines.length;
  while (end > 0 && lines[end - 1].trim() === "") {
    end--;
  }
  return lines.slice(0, end).join("\n");
}
function reconnectSession(sessionId, cols, rows, senderWebContentsId) {
  const name = tmuxSessionName(sessionId);
  try {
    tmuxExec("has-session", "-t", name);
  } catch {
    deleteSessionMeta(sessionId);
    throw new Error(`tmux session ${name} not found`);
  }
  let scrollback = "";
  try {
    const raw = tmuxExec(
      "capture-pane",
      "-t",
      name,
      "-p",
      "-e",
      "-S",
      "-200000"
    );
    scrollback = stripTrailingBlanks(raw);
  } catch {
  }
  attachClient(sessionId, cols, rows, senderWebContentsId);
  try {
    tmuxExec(
      "resize-window",
      "-t",
      name,
      "-x",
      String(cols),
      "-y",
      String(rows)
    );
  } catch {
  }
  const meta = readSessionMeta(sessionId);
  const session2 = sessions.get(sessionId);
  session2.shell = meta?.shell || process.env.SHELL || "/bin/zsh";
  return { sessionId, shell: session2.shell, meta, scrollback };
}
function writeToSession(sessionId, data) {
  const session2 = sessions.get(sessionId);
  if (!session2) return;
  session2.pty.write(data);
}
function sendRawKeys(sessionId, data) {
  const name = tmuxSessionName(sessionId);
  tmuxExec("send-keys", "-l", "-t", name, data);
}
function resizeSession(sessionId, cols, rows) {
  const session2 = sessions.get(sessionId);
  if (!session2) return;
  session2.pty.resize(cols, rows);
  const name = tmuxSessionName(sessionId);
  try {
    tmuxExec(
      "resize-window",
      "-t",
      name,
      "-x",
      String(cols),
      "-y",
      String(rows)
    );
  } catch {
  }
}
function killSession(sessionId) {
  const session2 = sessions.get(sessionId);
  if (session2) {
    for (const d of session2.disposables) d.dispose();
    session2.pty.kill();
    sessions.delete(sessionId);
  }
  const name = tmuxSessionName(sessionId);
  try {
    tmuxExec("kill-session", "-t", name);
  } catch {
  }
  deleteSessionMeta(sessionId);
}
const KILL_ALL_TIMEOUT_MS = 2e3;
function ensureTmuxServerAlive() {
  // tmuxサーバーを維持するためのキープアライブセッション
  try {
    tmuxExec("has-session", "-t", "keepalive");
  } catch {
    try {
      tmuxExec("new-session", "-d", "-s", "keepalive", "-x", "1", "-y", "1");
    } catch {}
  }
}

function killAllAndWait() {
  shuttingDown$1 = true;
  // tmuxサーバーを維持（次回起動時にreconnectできるように）
  ensureTmuxServerAlive();
  if (sessions.size === 0) return Promise.resolve();
  const pending2 = [];
  for (const [id, session2] of sessions) {
    pending2.push(
      new Promise((resolve2) => {
        session2.pty.onExit(() => resolve2());
      })
    );
    for (const d of session2.disposables) d.dispose();
    // tmuxセッションは殺さずdetachのみ（次回再接続できるように）
    session2.pty.kill();
    sessions.delete(id);
    // メタデータは残す（再接続用）
  }
  const timeout = new Promise(
    (resolve2) => setTimeout(resolve2, KILL_ALL_TIMEOUT_MS)
  );
  return Promise.race([
    Promise.all(pending2).then(() => {
    }),
    timeout
  ]);
}
function discoverSessions() {
  // tmuxサーバーを確実に起動
  ensureTmuxServerAlive();
  let tmuxNames;
  try {
    const raw = tmuxExec(
      "list-sessions",
      "-F",
      "#{session_name}"
    );
    tmuxNames = raw.split("\n").filter(Boolean).filter(n => n !== 'keepalive');
  } catch {
    tmuxNames = [];
  }
  const tmuxSet = new Set(tmuxNames);
  const result = [];
  let metaFiles;
  try {
    metaFiles = fs.readdirSync(SESSION_DIR).filter((f) => f.endsWith(".json"));
  } catch {
    metaFiles = [];
  }
  for (const file of metaFiles) {
    const sessionId = file.replace(".json", "");
    const name = tmuxSessionName(sessionId);
    if (tmuxSet.has(name)) {
      const meta = readSessionMeta(sessionId);
      if (meta) {
        result.push({ sessionId, meta });
      }
      tmuxSet.delete(name);
    } else {
      deleteSessionMeta(sessionId);
    }
  }
  for (const orphan of tmuxSet) {
    if (orphan.startsWith("collab-")) {
      try {
        tmuxExec("kill-session", "-t", orphan);
      } catch {
      }
    }
  }
  return result;
}
function verifyTmuxAvailable() {
  tmuxExec("-V");
}
const { autoUpdater } = electronUpdater;
const ERROR_RESET_DELAY_MS = 3e4;
const CHECK_INTERVAL_MS = 10 * 60 * 1e3;
const INITIAL_CHECK_DELAY_MS = 5e3;
class UpdateManager {
  state = { status: "idle" };
  initialized = false;
  errorResetTimeout = null;
  checkInterval = null;
  onBeforeQuit = null;
  init(opts) {
    if (this.initialized) return;
    autoUpdater.autoDownload = false;
    if (!process.env.GH_TOKEN && !process.env.GITHUB_TOKEN) {
      const ghPaths = [
        "/opt/homebrew/bin/gh",
        "/usr/local/bin/gh",
        join(homedir(), ".local", "bin", "gh"),
        "gh"
      ];
      let tokenFound = false;
      for (const ghBin of ghPaths) {
        try {
          const ghToken = execSync(`"${ghBin}" auth token`, { encoding: "utf-8", timeout: 5000, shell: true }).trim();
          if (ghToken) {
            process.env.GH_TOKEN = ghToken;
            console.log("[updater] GH_TOKEN set from gh CLI (" + ghBin + ").");
            tokenFound = true;
            break;
          }
        } catch {}
      }
      if (!tokenFound) {
        console.log("[updater] No GitHub token found. Update check may fail for private repos.");
      }
    }
    autoUpdater.logger = {
      info: (msg) => console.log(`[updater] ${msg}`),
      warn: (msg) => console.warn(`[updater] ${msg}`),
      error: (msg) => console.error(`[updater] ${msg}`),
      debug: (msg) => console.debug(`[updater] ${msg}`)
    };
    autoUpdater.on("checking-for-update", () => {
      this.setState({ status: "checking" });
    });
    autoUpdater.on("update-available", (info) => {
      const releaseNotes = typeof info.releaseNotes === "string" ? info.releaseNotes : void 0;
      this.setState({
        status: "available",
        version: info.version,
        releaseNotes
      });
      trackEvent("update_available", { version: info.version });
    });
    autoUpdater.on("update-not-available", () => {
      this.setState({ status: "idle" });
    });
    autoUpdater.on("download-progress", (progress) => {
      this.setState({
        status: "downloading",
        progress: Math.round(progress.percent)
      });
    });
    autoUpdater.on("update-downloaded", (info) => {
      const releaseNotes = typeof info.releaseNotes === "string" ? info.releaseNotes : void 0;
      this.setState({
        status: "ready",
        version: info.version,
        releaseNotes
      });
      trackEvent("update_downloaded", { version: info.version });
    });
    autoUpdater.on("error", (err) => {
      trackEvent("update_download_failed", { error: err.message });
      this.handleError(err.message);
    });
    if (app.isPackaged) {
      setTimeout(() => this.checkForUpdates(), INITIAL_CHECK_DELAY_MS);
      this.checkInterval = setInterval(
        () => this.checkForUpdates(),
        CHECK_INTERVAL_MS
      );
      powerMonitor.on("resume", () => this.checkForUpdates());
      // DMGのみ公開のためZIPダウンロードは無効化（GitHub Releasesから手動更新）
    } else {
      autoUpdater.forceDevUpdateConfig = true;
    }
    this.initialized = true;
  }
  async checkForUpdates() {
    try {
      await autoUpdater.checkForUpdates();
    } catch (err) {
      this.handleError(err.message);
    }
  }
  async downloadAvailableUpdate() {
    try {
      await autoUpdater.downloadUpdate();
    } catch (err) {
      this.handleError(err.message);
    }
  }
  async install() {
    if (this.onBeforeQuit) this.onBeforeQuit();
    autoUpdater.quitAndInstall();
  }
  getState() {
    return { ...this.state };
  }
  destroy() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
    this.clearErrorTimeout();
  }
  handleError(message) {
    console.warn("[updater] Error (suppressed from UI):", message);
    this.setState({ status: "idle", error: void 0 });
  }
  clearErrorTimeout() {
    if (this.errorResetTimeout) {
      clearTimeout(this.errorResetTimeout);
      this.errorResetTimeout = null;
    }
  }
  scheduleErrorReset() {
    this.clearErrorTimeout();
    this.errorResetTimeout = setTimeout(() => {
      if (this.state.status === "error") {
        this.setState({ status: "idle", error: void 0 });
      }
      this.errorResetTimeout = null;
    }, ERROR_RESET_DELAY_MS);
  }
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.broadcast();
  }
  broadcast() {
    for (const win of BrowserWindow.getAllWindows()) {
      if (!win.isDestroyed()) {
        win.webContents.send("update:status", this.state);
      }
    }
  }
}
const updateManager = new UpdateManager();
function setupUpdateIPC() {
  ipcMain.handle("update:getStatus", () => updateManager.getState());
  ipcMain.handle("update:check", async () => {
    await updateManager.checkForUpdates();
    return updateManager.getState();
  });
  ipcMain.handle("update:download", async () => {
    await updateManager.downloadAvailableUpdate();
    return updateManager.getState();
  });
  ipcMain.on("update:install", async () => {
    await updateManager.install();
  });
}
const INSTALL_DIR = join(homedir(), ".local", "bin");
const INSTALL_PATH = join(INSTALL_DIR, "collab");
const COLLAB_DIR = join(homedir(), ".collaborator");
const HINT_MARKER = join(COLLAB_DIR, "cli-path-hinted");
function getCliSource() {
  if (app.isPackaged) {
    return join(process.resourcesPath, "collab-cli.sh");
  }
  return join(app.getAppPath(), "scripts", "collab-cli.sh");
}
function installCli() {
  const source = getCliSource();
  if (!existsSync(source)) {
    console.warn(
      "[cli-installer] CLI source not found:",
      source
    );
    return;
  }
  mkdirSync(INSTALL_DIR, { recursive: true });
  copyFileSync(source, INSTALL_PATH);
  chmodSync(INSTALL_PATH, 493);
  if (!existsSync(HINT_MARKER)) {
    const pathEnv = process.env["PATH"] ?? "";
    if (!pathEnv.split(":").includes(INSTALL_DIR)) {
      console.log(
        `[cli-installer] collab installed to ${INSTALL_PATH}. Add ~/.local/bin to your PATH to use it from any terminal:
  export PATH="$HOME/.local/bin:$PATH"`
      );
      mkdirSync(COLLAB_DIR, { recursive: true });
      writeFileSync(HINT_MARKER, "", "utf-8");
    }
  }
}
if (!process.env.LANG || !process.env.LANG.includes("UTF-8")) {
  process.env.LANG = "en_US.UTF-8";
}
process.on("uncaughtException", (error) => {
  trackEvent("app_crash", {
    type: "uncaughtException",
    message: error.message,
    stack: error.stack
  });
  console.error("[crash] Uncaught exception:", error);
});
process.on("unhandledRejection", (reason) => {
  const error = reason instanceof Error ? reason : new Error(String(reason));
  trackEvent("app_crash", {
    type: "unhandledRejection",
    message: error.message,
    stack: error.stack
  });
  console.error("[crash] Unhandled rejection:", error);
});
let mainWindow = null;
let pendingFilePath = null;
let config = loadConfig();
let shuttingDown = false;
const savedTheme = config.ui.theme;
if (savedTheme === "light" || savedTheme === "dark") {
  nativeTheme.themeSource = savedTheme;
} else {
  nativeTheme.themeSource = "system";
}
let globalZoomLevel = 0;
if (!app.isPackaged) {
  process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
}
if (app.isPackaged && process.platform === "darwin") {
  try {
    const shell2 = process.env["SHELL"] || "/bin/zsh";
    const output = execFileSync(
      shell2,
      ["-l", "-c", 'printf "%s" "$PATH"'],
      { encoding: "utf8", timeout: 5e3 }
    );
    const resolved = output.split("\n").pop();
    if (resolved.includes("/")) {
      process.env["PATH"] = resolved;
    }
  } catch {
  }
}
const DEFAULT_STATE = {
  x: 0,
  y: 0,
  width: 1200,
  height: 800
};
function boundsVisibleOnAnyDisplay(bounds) {
  const displays = screen.getAllDisplays();
  return displays.some((display) => {
    const { x, y, width, height } = display.workArea;
    return bounds.x < x + width && bounds.x + bounds.width > x && bounds.y < y + height && bounds.y + bounds.height > y;
  });
}
function saveWindowState(state) {
  try {
    config.window_state = state;
    saveConfig(config);
  } catch (err) {
    console.error("Failed to save window state:", err);
  }
}
let saveTimeout = null;
function debouncedSaveWindowState() {
  if (saveTimeout) clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    if (!mainWindow || mainWindow.isDestroyed()) return;
    if (mainWindow.isMinimized() || mainWindow.isMaximized()) return;
    const { x, y, width, height } = mainWindow.getNormalBounds();
    saveWindowState({ x, y, width, height });
  }, 500);
}
function sendShortcut(action) {
  mainWindow?.webContents.send("shell:shortcut", action);
}
const cmdOrCtrl = (input) => input.meta || input.control;
const shiftCmdOrCtrl = (input) => input.shift && (input.meta || input.control);
const TOGGLE_SHORTCUTS = {
  Backslash: { modifier: cmdOrCtrl, action: "toggle-nav" },
  Comma: { modifier: cmdOrCtrl, action: "toggle-settings" },
  KeyW: { modifier: shiftCmdOrCtrl, action: "close-tab" },
  KeyO: { modifier: shiftCmdOrCtrl, action: "add-workspace" },
  KeyK: { modifier: cmdOrCtrl, action: "focus-search" }
};
const TOGGLE_SHORTCUT_KEYS = {
  "\\": TOGGLE_SHORTCUTS.Backslash,
  ",": TOGGLE_SHORTCUTS.Comma,
  w: TOGGLE_SHORTCUTS.KeyW,
  o: TOGGLE_SHORTCUTS.KeyO,
  k: TOGGLE_SHORTCUTS.KeyK
};
const TAB_SHORTCUTS = {};
const TAB_SHORTCUT_KEYS = {};
for (let i = 1; i <= 9; i++) {
  TAB_SHORTCUTS[`Digit${i}`] = `switch-tab-${i}`;
  TAB_SHORTCUT_KEYS[String(i)] = `switch-tab-${i}`;
}
function normalizeShortcutKey(key) {
  if (!key) return null;
  return key.length === 1 ? key.toLowerCase() : key;
}
function resolveToggleShortcut(input) {
  const shortcut = TOGGLE_SHORTCUTS[input.code];
  if (shortcut) return shortcut;
  const normalizedKey = normalizeShortcutKey(input.key);
  return normalizedKey ? TOGGLE_SHORTCUT_KEYS[normalizedKey] : void 0;
}
function resolveTabShortcut(input) {
  const shortcut = TAB_SHORTCUTS[input.code];
  if (shortcut) return shortcut;
  const normalizedKey = normalizeShortcutKey(input.key);
  return normalizedKey ? TAB_SHORTCUT_KEYS[normalizedKey] : void 0;
}
function attachShortcutListener(target, includeTabShortcuts) {
  target.on("before-input-event", (event, input) => {
    if (input.type !== "keyDown") return;
    const toggle = resolveToggleShortcut(input);
    if (toggle && toggle.modifier(input)) {
      event.preventDefault();
      if (!input.isAutoRepeat) sendShortcut(toggle.action);
      return;
    }
    if (includeTabShortcuts) {
      const tabAction = resolveTabShortcut(input);
      if (tabAction && cmdOrCtrl(input)) {
        event.preventDefault();
        if (!input.isAutoRepeat) sendShortcut(tabAction);
      }
    }
  });
}
function isTerminalWebview(wc) {
  try {
    return wc.getURL().includes("/terminal/");
  } catch {
    return false;
  }
}
function isBrowserTileWebview(wc) {
  try {
    return wc.session === session.fromPartition("persist:browser");
  } catch {
    return false;
  }
}
function attachBrowserShortcuts(wc, hostWindow) {
  wc.on("before-input-event", (event, input) => {
    if (input.type !== "keyDown") return;
    const cmd = input.meta || input.control;
    if (!cmd) {
      if (input.key === "Escape" && wc.isLoading()) {
        event.preventDefault();
        wc.stop();
      }
      return;
    }
    if (input.code === "KeyL" || input.key === "l") {
      event.preventDefault();
      hostWindow.webContents.send(
        "browser-tile:focus-url",
        wc.id
      );
    } else if (input.code === "BracketLeft" || input.key === "[") {
      event.preventDefault();
      if (wc.canGoBack()) wc.goBack();
    } else if (input.code === "BracketRight" || input.key === "]") {
      event.preventDefault();
      if (wc.canGoForward()) wc.goForward();
    } else if (input.code === "KeyR" || input.key === "r") {
      event.preventDefault();
      wc.reload();
    }
  });
}
function registerToggleShortcuts(win) {
  attachShortcutListener(win.webContents, true);
  win.webContents.on("did-attach-webview", (_event, wc) => {
    wc.once("did-finish-load", () => {
      attachShortcutListener(wc, !isTerminalWebview(wc));
      if (isBrowserTileWebview(wc)) {
        attachBrowserShortcuts(wc, win);
      }
      if (globalZoomLevel !== 0) {
        wc.setZoomLevel(globalZoomLevel);
      }
    });
  });
}
function applyZoomToAll(level) {
  globalZoomLevel = level;
  for (const wc of webContents.getAllWebContents()) {
    if (!wc.isDestroyed()) wc.setZoomLevel(level);
  }
}
function buildAppMenu() {
  const isMac = process.platform === "darwin";
  const template = [
    ...isMac ? [
      {
        label: app.name,
        submenu: [
          { role: "about" },
          { type: "separator" },
          {
            label: "Settings…",
            accelerator: "CommandOrControl+,",
            registerAccelerator: false,
            click: () => sendShortcut("toggle-settings")
          },
          { type: "separator" },
          { role: "services" },
          { type: "separator" },
          { role: "hide" },
          { role: "hideOthers" },
          { role: "unhide" },
          { type: "separator" },
          { role: "quit" }
        ]
      }
    ] : [],
    {
      label: "File",
      submenu: [
        {
          label: "Open Workspace…",
          accelerator: "CommandOrControl+Shift+O",
          registerAccelerator: false,
          click: () => sendShortcut("add-workspace")
        }
      ]
    },
    {
      label: "Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        { role: "selectAll" },
        { type: "separator" },
        {
          label: "Find",
          accelerator: "CommandOrControl+K",
          registerAccelerator: false,
          click: () => sendShortcut("focus-search")
        }
      ]
    },
    {
      label: "View",
      submenu: [
        {
          label: "Toggle Navigator",
          accelerator: "CommandOrControl+\\",
          registerAccelerator: false,
          click: () => sendShortcut("toggle-nav")
        },
        { type: "separator" },
        {
          label: "Zoom In",
          accelerator: "CommandOrControl+=",
          click: () => applyZoomToAll(globalZoomLevel + 0.25)
        },
        {
          label: "Zoom Out",
          accelerator: "CommandOrControl+-",
          click: () => applyZoomToAll(globalZoomLevel - 0.25)
        },
        {
          label: "Actual Size",
          accelerator: "CommandOrControl+0",
          click: () => applyZoomToAll(0)
        },
        { type: "separator" },
        { role: "toggleDevTools" },
        {
          label: "Toggle Full Screen",
          accelerator: "Ctrl+Cmd+F",
          click: (_, win) => win?.setFullScreen(!win.isFullScreen())
        }
      ]
    },
    {
      label: "Window",
      submenu: [
        { role: "minimize" },
        { role: "zoom" },
        ...isMac ? [
          { type: "separator" },
          { role: "front" }
        ] : [{ role: "close" }]
      ]
    }
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}
function getPreloadPath(name) {
  return join(__dirname, `../preload/${name}.js`);
}
function getRendererURL(name) {
  if (!app.isPackaged && process.env["ELECTRON_RENDERER_URL"]) {
    return `${process.env["ELECTRON_RENDERER_URL"]}/${name}/index.html`;
  }
  return pathToFileURL(
    join(__dirname, `../renderer/${name}/index.html`)
  ).href;
}
function createWindow() {
  const saved = config.window_state;
  const useSaved = saved !== null && (saved.isMaximized || boundsVisibleOnAnyDisplay(saved));
  const state = useSaved ? saved : DEFAULT_STATE;
  const windowOptions = {
    width: state.width,
    height: state.height,
    minWidth: 400,
    minHeight: 400,
    titleBarStyle: "hidden",
    vibrancy: "under-window",
    visualEffectState: "active",
    trafficLightPosition: { x: 14, y: 12 },
    webPreferences: {
      preload: getPreloadPath("shell"),
      contextIsolation: true,
      sandbox: true,
      webviewTag: true
    }
  };
  if (useSaved) {
    windowOptions.x = state.x;
    windowOptions.y = state.y;
  }
  mainWindow = new BrowserWindow(windowOptions);
  if (state.isMaximized) {
    mainWindow.maximize();
  }
  mainWindow.on("move", debouncedSaveWindowState);
  mainWindow.on("resize", debouncedSaveWindowState);
  mainWindow.on("close", () => {
    if (saveTimeout) clearTimeout(saveTimeout);
    if (!mainWindow || mainWindow.isDestroyed()) return;
    const { x, y, width, height } = mainWindow.getNormalBounds();
    saveWindowState({
      x,
      y,
      width,
      height,
      isMaximized: mainWindow.isMaximized()
    });
  });
  mainWindow.loadURL(getRendererURL("shell"));
  setMainWindow(mainWindow);
  registerCanvasRpc(mainWindow);
}
ipcMain.handle(
  "analytics:get-device-id",
  () => getDeviceId()
);
ipcMain.on("analytics:track-event", (_event, name, properties) => {
  trackEvent(name, properties);
});
ipcMain.handle("shell:get-view-config", () => {
  const preload = pathToFileURL(
    getPreloadPath("universal")
  ).href;
  return {
    nav: { src: getRendererURL("nav"), preload },
    viewer: { src: getRendererURL("viewer"), preload },
    terminal: { src: getRendererURL("terminal"), preload },
    terminalTile: { src: getRendererURL("terminal-tile"), preload },
    graphTile: { src: getRendererURL("graph-tile"), preload },
    nippo: { src: getRendererURL("nippo"), preload },
    settings: { src: getRendererURL("settings"), preload }
  };
});
ipcMain.handle(
  "pref:get",
  (_event, key) => getPref(config, key)
);
ipcMain.handle(
  "pref:set",
  (_event, key, value) => {
    setPref(config, key, value);
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send("pref:changed", key, value);
    }
  }
);
ipcMain.handle(
  "theme:set",
  (_event, mode) => {
    const valid = mode === "light" || mode === "dark" ? mode : "system";
    nativeTheme.themeSource = valid;
    setPref(config, "theme", valid);
  }
);
ipcMain.handle(
  "pty:create",
  (event, params) => createSession(params?.cwd, event.sender.id, params?.cols, params?.rows)
);
ipcMain.handle(
  "pty:write",
  (_event, { sessionId, data }) => writeToSession(sessionId, data)
);
ipcMain.handle(
  "pty:send-raw-keys",
  (_event, { sessionId, data }) => sendRawKeys(sessionId, data)
);
ipcMain.handle(
  "pty:resize",
  (_event, {
    sessionId,
    cols,
    rows
  }) => resizeSession(sessionId, cols, rows)
);
ipcMain.handle(
  "pty:kill",
  (_event, { sessionId }) => killSession(sessionId)
);
ipcMain.handle(
  "pty:reconnect",
  (event, {
    sessionId,
    cols,
    rows
  }) => {
    try {
      return reconnectSession(
        sessionId,
        cols,
        rows,
        event.sender.id
      );
    } catch (err) {
      console.warn(`[pty] reconnect failed for ${sessionId}: ${err.message}`);
      deleteSessionMeta(sessionId);
      return null;
    }
  }
);
ipcMain.handle(
  "pty:discover",
  () => discoverSessions()
);
ipcMain.handle(
  "pty:get-cwd",
  (_event, { sessionId }) => {
    try {
      const name = tmuxSessionName(sessionId);
      const cwd = tmuxExec("display-message", "-p", "-t", name, "#{pane_current_path}");
      return cwd || null;
    } catch {
      return null;
    }
  }
);
let settingsOpen = false;
function setSettingsOpen(open) {
  if (!mainWindow || settingsOpen === open) return;
  settingsOpen = open;
  mainWindow.webContents.send("shell:settings", open ? "open" : "close");
}
ipcMain.on("settings:open", () => setSettingsOpen(true));
const LOG_FN_BY_LEVEL = {
  0: console.debug,
  1: console.log,
  2: console.warn,
  3: console.error
};
ipcMain.on(
  "webview:console",
  (_event, panel, level, message, source) => {
    const tag = `[webview:${panel}]`;
    const logFn = LOG_FN_BY_LEVEL[level] ?? console.log;
    logFn(`${tag} ${message}`, source ? `(${source})` : "");
  }
);
ipcMain.on("settings:close", () => setSettingsOpen(false));
ipcMain.on("settings:toggle", () => setSettingsOpen(!settingsOpen));
function sendLoadingDone() {
  mainWindow?.webContents.send("shell:loading-done");
}
async function shutdownBackgroundServices() {
  if (shuttingDown) return;
  shuttingDown = true;
  setShuttingDown(true);
  await killAllAndWait();
  stopWorker$1();
  stopWorker();
  stopJsonRpcServer();
  stopImageWorker();
}
app.on("open-file", (event, path2) => {
  event.preventDefault();
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send(
      "shell:forward",
      "viewer",
      "file-selected",
      path2
    );
  } else {
    pendingFilePath = path2;
  }
});
protocol.registerSchemesAsPrivileged([
  {
    scheme: "collab-file",
    privileges: {
      supportFetchAPI: true,
      bypassCSP: true,
      stream: true
    }
  }
]);
app.on("web-contents-created", (_event, contents) => {
  const isExternal = (url) => {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return false;
    }
    const devOrigin = process.env["ELECTRON_RENDERER_URL"];
    if (devOrigin && url.startsWith(devOrigin)) return false;
    return true;
  };
  contents.setWindowOpenHandler(({ url, disposition }) => {
    if (isBrowserTileWebview(contents)) {
      if (disposition === "foreground-tab" || disposition === "background-tab") {
        mainWindow?.webContents.send(
          "shell:forward",
          "canvas",
          "open-browser-tile",
          url,
          contents.id
        );
        return { action: "deny" };
      }
      return {
        action: "allow",
        overrideBrowserWindowOptions: {
          width: 500,
          height: 600,
          webPreferences: {
            partition: "persist:browser"
          }
        }
      };
    }
    if (isExternal(url)) shell.openExternal(url);
    return { action: "deny" };
  });
  contents.on("will-navigate", (event, url) => {
    if (isExternal(url) && !isBrowserTileWebview(contents)) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });
});
app.whenReady().then(async () => {
  const browserSession = session.fromPartition("persist:browser");
  const electronUA = browserSession.getUserAgent();
  browserSession.setUserAgent(
    electronUA.replace(/\s*Electron\/\S+/, "")
  );
  protocol.handle("collab-file", (request2) => {
    const filePath = decodeURIComponent(
      new URL(request2.url).pathname
    );
    return net.fetch(`file://${filePath}`);
  });
  shuttingDown = false;
  try {
    verifyTmuxAvailable();
  } catch (err) {
    console.error(
      "tmux binary not found or not executable:",
      err
    );
  }
  config = loadConfig();
  installCli();
  startWorker$1();
  registerIpcHandlers(config);
  registerIntegrationsIpc();
  setupUpdateIPC();
  updateManager.init({
    onBeforeQuit: () => shutdownBackgroundServices()
  });
  buildAppMenu();
  createWindow();
  registerToggleShortcuts(mainWindow);
  initMainAnalytics();
  trackEvent("app_launched");
  mainWindow.webContents.on("did-finish-load", () => {
    sendLoadingDone();
    if (pendingFilePath) {
      mainWindow.webContents.send(
        "shell:forward",
        "viewer",
        "file-selected",
        pendingFilePath
      );
      pendingFilePath = null;
    }
  });
  registerMethod("ping", () => ({ pong: true }), {
    description: "Health check — returns {pong: true}"
  });
  registerMethod("workspace.getConfig", () => config, {
    description: "Return the current app configuration"
  });
  try {
    await startJsonRpcServer();
  } catch (err) {
    console.error("Failed to start JSON-RPC server:", err);
  }
});
app.on("before-quit", (event) => {
  if (!shuttingDown) {
    event.preventDefault();
    shutdownBackgroundServices().then(() => app.quit());
  }
});
app.on("window-all-closed", async () => {
  await shutdownBackgroundServices();
  await shutdownAnalytics();
  app.quit();
});
