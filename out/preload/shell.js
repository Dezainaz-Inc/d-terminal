"use strict";
const electron = require("electron");
const ALLOWED_PANELS = /* @__PURE__ */ new Set(["nav", "viewer", "terminal", "terminalTile", "graphTile", "settings"]);
let loadingDoneReceived = false;
electron.ipcRenderer.on("shell:loading-done", () => {
  loadingDoneReceived = true;
});
const pendingForwards = [];
electron.ipcRenderer.on("shell:forward", (_event, target, channel, ...args) => {
  pendingForwards.push([target, channel, ...args]);
});
electron.contextBridge.exposeInMainWorld("shellApi", {
  getViewConfig: () => electron.ipcRenderer.invoke("shell:get-view-config"),
  getPref: (key) => electron.ipcRenderer.invoke("pref:get", key),
  setPref: (key, value) => electron.ipcRenderer.invoke("pref:set", key, value),
  onForwardToWebview: (cb) => {
    for (const [target, channel, ...args] of pendingForwards) {
      cb(target, channel, ...args);
    }
    pendingForwards.length = 0;
    electron.ipcRenderer.removeAllListeners("shell:forward");
    const handler = (_event, target, channel, ...args) => cb(target, channel, ...args);
    electron.ipcRenderer.on("shell:forward", handler);
    return () => electron.ipcRenderer.removeListener("shell:forward", handler);
  },
  onSettingsToggle: (cb) => {
    const handler = (_event, action) => cb(action);
    electron.ipcRenderer.on("shell:settings", handler);
    return () => electron.ipcRenderer.removeListener("shell:settings", handler);
  },
  onLoadingStatus: (cb) => {
    const handler = (_event, message) => cb(message);
    electron.ipcRenderer.on("shell:loading-status", handler);
    return () => electron.ipcRenderer.removeListener("shell:loading-status", handler);
  },
  onLoadingDone: (cb) => {
    if (loadingDoneReceived) {
      cb();
      return () => {
      };
    }
    const handler = () => {
      loadingDoneReceived = true;
      cb();
    };
    electron.ipcRenderer.on("shell:loading-done", handler);
    return () => electron.ipcRenderer.removeListener("shell:loading-done", handler);
  },
  onShortcut: (cb) => {
    const handler = (_event, action) => cb(action);
    electron.ipcRenderer.on("shell:shortcut", handler);
    return () => electron.ipcRenderer.removeListener("shell:shortcut", handler);
  },
  onBrowserTileFocusUrl: (cb) => {
    const handler = (_event, id) => cb(id);
    electron.ipcRenderer.on("browser-tile:focus-url", handler);
    return () => electron.ipcRenderer.removeListener("browser-tile:focus-url", handler);
  },
  onPrefChanged: (cb) => {
    const handler = (_event, key, value) => cb(key, value);
    electron.ipcRenderer.on("pref:changed", handler);
    return () => electron.ipcRenderer.removeListener("pref:changed", handler);
  },
  openSettings: () => electron.ipcRenderer.send("settings:open"),
  closeSettings: () => electron.ipcRenderer.send("settings:close"),
  toggleSettings: () => electron.ipcRenderer.send("settings:toggle"),
  logFromWebview: (panel, level, message, source) => {
    if (!ALLOWED_PANELS.has(panel)) return;
    electron.ipcRenderer.send(
      "webview:console",
      panel,
      level,
      message,
      source
    );
  },
  selectFile: (path) => electron.ipcRenderer.send("nav:select-file", path),
  updateGetStatus: () => electron.ipcRenderer.invoke("update:getStatus"),
  updateCheck: () => electron.ipcRenderer.invoke("update:check"),
  updateDownload: () => electron.ipcRenderer.invoke("update:download"),
  updateInstall: () => electron.ipcRenderer.send("update:install"),
  onUpdateStatus: (cb) => {
    const handler = (_event, state) => cb(state);
    electron.ipcRenderer.on("update:status", handler);
    return () => electron.ipcRenderer.removeListener("update:status", handler);
  },
  canvasLoadState: () => electron.ipcRenderer.invoke("canvas:load-state"),
  canvasSaveState: (state) => electron.ipcRenderer.invoke("canvas:save-state", state),
  getDragPaths: () => electron.ipcRenderer.invoke("drag:get-paths"),
  getWorkspacePath: () => electron.ipcRenderer.invoke("shell:get-workspace-path"),
  workspaceAdd: () => electron.ipcRenderer.invoke("workspace:add"),
  workspaceRemove: (index) => electron.ipcRenderer.invoke("workspace:remove", index),
  workspaceSwitch: (index) => electron.ipcRenderer.invoke("workspace:switch", index),
  workspaceList: () => electron.ipcRenderer.invoke("workspace:list"),
  onWorkspaceChanged: (cb) => {
    const handler = (_event, path) => cb(path);
    electron.ipcRenderer.on("shell:workspace-changed", handler);
    return () => electron.ipcRenderer.removeListener("shell:workspace-changed", handler);
  },
  onCanvasPinch: (cb) => {
    const handler = (_event, deltaY) => cb(deltaY);
    electron.ipcRenderer.on("canvas:pinch", handler);
    return () => electron.ipcRenderer.removeListener("canvas:pinch", handler);
  },
  onCanvasRpcRequest: (cb) => {
    const handler = (_event, request) => cb(request);
    electron.ipcRenderer.on("canvas:rpc-request", handler);
    return () => electron.ipcRenderer.removeListener("canvas:rpc-request", handler);
  },
  canvasRpcResponse: (response) => electron.ipcRenderer.send("canvas:rpc-response", response),
  showConfirmDialog: (opts) => electron.ipcRenderer.invoke("dialog:confirm", opts),
  showContextMenu: (items) => electron.ipcRenderer.invoke("context-menu:show", items),
  openExternal: (url) => electron.ipcRenderer.send("shell:open-external", url),
  trackEvent: (name, properties) => {
    electron.ipcRenderer.send("analytics:track-event", name, properties);
  },
  // Integrations
  getAgents: () => electron.ipcRenderer.invoke("integrations:get-agents"),
  installSkill: (agentId) => electron.ipcRenderer.invoke("integrations:install-skill", agentId),
  hasOfferedPlugin: () => electron.ipcRenderer.invoke("integrations:has-offered-plugin"),
  markPluginOffered: () => electron.ipcRenderer.invoke("integrations:mark-plugin-offered")
});
