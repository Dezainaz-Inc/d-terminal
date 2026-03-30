"use strict";
const electron = require("electron");
const dataListeners = /* @__PURE__ */ new Set();
const exitListeners = /* @__PURE__ */ new Set();
const cdToListeners = /* @__PURE__ */ new Set();
const runInTerminalListeners = /* @__PURE__ */ new Set();
const replayDataListeners = /* @__PURE__ */ new Set();
const agentEventListeners = /* @__PURE__ */ new Set();
const focusTabListeners = /* @__PURE__ */ new Set();
const shellBlurListeners = /* @__PURE__ */ new Set();
electron.ipcRenderer.on("pty:data", (_event, payload) => {
  for (const cb of dataListeners) cb(payload);
});
electron.ipcRenderer.on("pty:exit", (_event, payload) => {
  for (const cb of exitListeners) cb(payload);
});
electron.ipcRenderer.on("cd-to", (_event, path) => {
  for (const cb of cdToListeners) cb(path);
});
electron.ipcRenderer.on("run-in-terminal", (_event, command) => {
  for (const cb of runInTerminalListeners) cb(command);
});
electron.ipcRenderer.on("agent:session-started", (_event, data) => {
  for (const cb of agentEventListeners) cb(data);
});
electron.ipcRenderer.on("agent:file-touched", (_event, data) => {
  for (const cb of agentEventListeners) cb(data);
});
electron.ipcRenderer.on("agent:session-ended", (_event, data) => {
  for (const cb of agentEventListeners) cb(data);
});
electron.ipcRenderer.on("focus-tab", (_event, ptySessionId) => {
  for (const cb of focusTabListeners) cb(ptySessionId);
});
electron.ipcRenderer.on("shell-blur", () => {
  for (const cb of shellBlurListeners) cb();
});
electron.ipcRenderer.on("replay:data", (_event, msg) => {
  for (const cb of replayDataListeners) cb(msg);
});
let bufferedWorkspacePath = null;
const wsChangedBuffer = (_event, path) => {
  bufferedWorkspacePath = path;
};
electron.ipcRenderer.on("workspace-changed", wsChangedBuffer);
let bufferedNavVisible = null;
const navVisBuffer = (_event, visible) => {
  bufferedNavVisible = visible;
};
electron.ipcRenderer.on("nav-visibility", navVisBuffer);
electron.contextBridge.exposeInMainWorld("api", {
  // Shared
  getConfig: () => electron.ipcRenderer.invoke("config:get"),
  getAppVersion: () => electron.ipcRenderer.invoke("app:version"),
  getDeviceId: () => electron.ipcRenderer.invoke("analytics:get-device-id"),
  getPref: (key) => electron.ipcRenderer.invoke("pref:get", key),
  setPref: (key, value) => electron.ipcRenderer.invoke("pref:set", key, value),
  getWorkspacePref: (key) => electron.ipcRenderer.invoke("workspace-pref:get", key),
  setWorkspacePref: (key, value) => electron.ipcRenderer.invoke("workspace-pref:set", key, value),
  // Nav + Viewer
  getSelectedFile: () => electron.ipcRenderer.invoke("nav:get-selected-file"),
  selectFile: (path) => electron.ipcRenderer.send("nav:select-file", path),
  // Nav
  readDir: (path) => electron.ipcRenderer.invoke("fs:readdir", path),
  countFiles: (path) => electron.ipcRenderer.invoke("fs:count-files", path),
  trashFile: (path) => electron.ipcRenderer.invoke("fs:trash", path),
  createDir: (path) => electron.ipcRenderer.invoke("fs:mkdir", path),
  moveFile: (oldPath, newParentDir) => electron.ipcRenderer.invoke("fs:move", oldPath, newParentDir),
  selectFolder: (path) => electron.ipcRenderer.send("nav:select-folder", path),
  readFolderTable: (folderPath) => electron.ipcRenderer.invoke("fs:read-folder-table", folderPath),
  importWebArticle: (url, targetDir) => electron.ipcRenderer.invoke("import:web-article", url, targetDir),
  openInTerminal: (path) => electron.ipcRenderer.send("nav:open-in-terminal", path),
  createGraphTile: (folderPath) => electron.ipcRenderer.send("nav:create-graph-tile", folderPath),
  runInTerminal: (command) => electron.ipcRenderer.send("viewer:run-in-terminal", command),
  // Viewer
  readFile: (path) => electron.ipcRenderer.invoke("fs:readfile", path),
  renameFile: (oldPath, newTitle) => electron.ipcRenderer.invoke("fs:rename", oldPath, newTitle),
  getFileStats: (path) => electron.ipcRenderer.invoke("fs:stat", path),
  getImageThumbnail: (path, size) => electron.ipcRenderer.invoke("image:thumbnail", path, size),
  getImageFull: (path) => electron.ipcRenderer.invoke("image:full", path),
  resolveImagePath: (reference, fromNotePath) => electron.ipcRenderer.invoke("image:resolve-path", reference, fromNotePath),
  saveDroppedImage: (noteDir, fileName, buffer) => electron.ipcRenderer.invoke(
    "image:save-dropped",
    noteDir,
    fileName,
    buffer
  ),
  openImageDialog: () => electron.ipcRenderer.invoke("dialog:open-image"),
  getWorkspaceGraph: (params) => electron.ipcRenderer.invoke("workspace:get-graph", params),
  updateFrontmatter: (filePath, field, value) => electron.ipcRenderer.invoke(
    "workspace:update-frontmatter",
    filePath,
    field,
    value
  ),
  resolveWikilink: (target) => electron.ipcRenderer.invoke("wikilink:resolve", target),
  suggestWikilinks: (partial) => electron.ipcRenderer.invoke("wikilink:suggest", partial),
  getBacklinks: (filePath) => electron.ipcRenderer.invoke("wikilink:backlinks", filePath),
  // Nav + Viewer (shared FS helpers)
  writeFile: (path, content, expectedMtime) => electron.ipcRenderer.invoke("fs:writefile", path, content, expectedMtime),
  readTree: (params) => electron.ipcRenderer.invoke("workspace:read-tree", params),
  // Terminal (PTY)
  ptyCreate: (cwd, cols, rows) => electron.ipcRenderer.invoke(
    "pty:create",
    { cwd, cols, rows }
  ),
  ptyWrite: (sessionId, data) => electron.ipcRenderer.invoke("pty:write", { sessionId, data }),
  ptySendRawKeys: (sessionId, data) => electron.ipcRenderer.invoke("pty:send-raw-keys", { sessionId, data }),
  ptyResize: (sessionId, cols, rows) => electron.ipcRenderer.invoke(
    "pty:resize",
    { sessionId, cols, rows }
  ),
  ptyKill: (sessionId) => electron.ipcRenderer.invoke("pty:kill", { sessionId }),
  ptyReconnect: (sessionId, cols, rows) => electron.ipcRenderer.invoke(
    "pty:reconnect",
    { sessionId, cols, rows }
  ),
  ptyDiscover: () => electron.ipcRenderer.invoke("pty:discover"),
  ptyGetCwd: (sessionId) => electron.ipcRenderer.invoke("pty:get-cwd", { sessionId }),
  onPtyData: (cb) => {
    dataListeners.add(cb);
  },
  offPtyData: (cb) => {
    dataListeners.delete(cb);
  },
  onPtyExit: (cb) => {
    exitListeners.add(cb);
  },
  offPtyExit: (cb) => {
    exitListeners.delete(cb);
  },
  notifyPtySessionId: (sessionId) => electron.ipcRenderer.sendToHost("pty-session-id", sessionId),
  notifyPtyCwd: (cwd) => electron.ipcRenderer.sendToHost("pty-cwd", cwd),
  onCdTo: (cb) => {
    cdToListeners.add(cb);
  },
  offCdTo: (cb) => {
    cdToListeners.delete(cb);
  },
  onRunInTerminal: (cb) => {
    runInTerminalListeners.add(cb);
  },
  offRunInTerminal: (cb) => {
    runInTerminalListeners.delete(cb);
  },
  // Cross-webview drag-and-drop
  setDragPaths: (paths) => electron.ipcRenderer.send("drag:set-paths", paths),
  clearDragPaths: () => electron.ipcRenderer.send("drag:clear-paths"),
  getDragPaths: () => electron.ipcRenderer.invoke("drag:get-paths"),
  onNavDragActive: (cb) => {
    const handler = (_event, active) => cb(active);
    electron.ipcRenderer.on("nav-drag-active", handler);
    return () => electron.ipcRenderer.removeListener("nav-drag-active", handler);
  },
  // Theme
  setTheme: (mode) => electron.ipcRenderer.invoke("theme:set", mode),
  // Settings
  openFolder: () => electron.ipcRenderer.invoke("dialog:open-folder"),
  showContextMenu: (items) => electron.ipcRenderer.invoke("context-menu:show", items),
  close: () => electron.ipcRenderer.send("settings:close"),
  // Integrations
  getAgents: () => electron.ipcRenderer.invoke("integrations:get-agents"),
  installSkill: (agentId) => electron.ipcRenderer.invoke("integrations:install-skill", agentId),
  uninstallSkill: (agentId) => electron.ipcRenderer.invoke("integrations:uninstall-skill", agentId),
  hasOfferedPlugin: () => electron.ipcRenderer.invoke("integrations:has-offered-plugin"),
  markPluginOffered: () => electron.ipcRenderer.invoke("integrations:mark-plugin-offered"),
  // IPC event listeners (nav, viewer, terminal)
  onFocusSearch: (cb) => {
    const handler = () => cb();
    electron.ipcRenderer.on("focus-search", handler);
    return () => electron.ipcRenderer.removeListener("focus-search", handler);
  },
  onFileSelected: (cb) => {
    const handler = (_event, path) => cb(path);
    electron.ipcRenderer.on("file-selected", handler);
    return () => electron.ipcRenderer.removeListener("file-selected", handler);
  },
  onFolderSelected: (cb) => {
    const handler = (_event, path) => cb(path);
    electron.ipcRenderer.on("folder-selected", handler);
    return () => electron.ipcRenderer.removeListener("folder-selected", handler);
  },
  onFileRenamed: (cb) => {
    const handler = (_event, oldPath, newPath) => cb(oldPath, newPath);
    electron.ipcRenderer.on("file-renamed", handler);
    return () => electron.ipcRenderer.removeListener("file-renamed", handler);
  },
  onFilesDeleted: (cb) => {
    const handler = (_event, paths) => cb(paths);
    electron.ipcRenderer.on("files-deleted", handler);
    return () => electron.ipcRenderer.removeListener("files-deleted", handler);
  },
  onFsChanged: (cb) => {
    const handler = (_event, events) => cb(
      events
    );
    electron.ipcRenderer.on("fs-changed", handler);
    return () => electron.ipcRenderer.removeListener("fs-changed", handler);
  },
  onWorkspaceChanged: (cb) => {
    if (bufferedWorkspacePath !== null) {
      cb(bufferedWorkspacePath);
      bufferedWorkspacePath = null;
    }
    electron.ipcRenderer.removeListener("workspace-changed", wsChangedBuffer);
    const handler = (_event, path) => cb(path);
    electron.ipcRenderer.on("workspace-changed", handler);
    return () => electron.ipcRenderer.removeListener("workspace-changed", handler);
  },
  onWikilinksUpdated: (cb) => {
    const handler = (_event, paths) => cb(paths);
    electron.ipcRenderer.on("wikilinks-updated", handler);
    return () => electron.ipcRenderer.removeListener("wikilinks-updated", handler);
  },
  onNavVisibility: (cb) => {
    if (bufferedNavVisible !== null) {
      cb(bufferedNavVisible);
      bufferedNavVisible = null;
    }
    electron.ipcRenderer.removeListener("nav-visibility", navVisBuffer);
    const handler = (_event, visible) => cb(visible);
    electron.ipcRenderer.on("nav-visibility", handler);
    return () => electron.ipcRenderer.removeListener("nav-visibility", handler);
  },
  onScopeChanged: (cb) => {
    const handler = (_event, path) => cb(path);
    electron.ipcRenderer.on("scope-changed", handler);
    return () => electron.ipcRenderer.removeListener("scope-changed", handler);
  },
  // Auto-updater
  updateGetStatus: () => electron.ipcRenderer.invoke("update:getStatus"),
  updateCheck: () => electron.ipcRenderer.invoke("update:check"),
  updateDownload: () => electron.ipcRenderer.invoke("update:download"),
  updateInstall: () => electron.ipcRenderer.send("update:install"),
  onUpdateStatus: (cb) => {
    const handler = (_event, state) => cb(state);
    electron.ipcRenderer.on("update:status", handler);
    return () => electron.ipcRenderer.removeListener("update:status", handler);
  },
  // Agent activity
  onAgentEvent: (cb) => {
    agentEventListeners.add(cb);
    return () => {
      agentEventListeners.delete(cb);
    };
  },
  focusAgentSession: (sessionId) => electron.ipcRenderer.invoke("agent:focus-session", sessionId),
  // Git replay
  startReplay: (params) => electron.ipcRenderer.invoke("replay:start", params),
  stopReplay: () => electron.ipcRenderer.invoke("replay:stop"),
  onReplayData: (cb) => {
    replayDataListeners.add(cb);
    return () => {
      replayDataListeners.delete(cb);
    };
  },
  // Terminal focus
  onFocusTab: (cb) => {
    focusTabListeners.add(cb);
    return () => {
      focusTabListeners.delete(cb);
    };
  },
  onShellBlur: (cb) => {
    shellBlurListeners.add(cb);
    return () => {
      shellBlurListeners.delete(cb);
    };
  },
  // Canvas pinch forwarding
  forwardPinch: (deltaY) => electron.ipcRenderer.send("canvas:forward-pinch", deltaY)
});
window.addEventListener("wheel", (e) => {
  if (e.ctrlKey) {
    e.preventDefault();
    electron.ipcRenderer.send("canvas:forward-pinch", e.deltaY);
  }
}, { passive: false });
