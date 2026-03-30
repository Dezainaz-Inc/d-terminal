const tiles = [];
let nextZIndex = 1;
const DEFAULT_TILE_SIZES = {
  term: { width: 400, height: 500 },
  note: { width: 440, height: 540 },
  code: { width: 440, height: 540 },
  image: { width: 280, height: 280 },
  graph: { width: 600, height: 500 },
  browser: { width: 480, height: 640 }
};
function defaultSize(type) {
  return { ...DEFAULT_TILE_SIZES[type] };
}
let idCounter = 0;
function generateId() {
  idCounter++;
  return `tile-${Date.now()}-${idCounter}`;
}
function bringToFront(tile) {
  nextZIndex++;
  tile.zIndex = nextZIndex;
}
function removeTile(id) {
  const idx = tiles.findIndex((t) => t.id === id);
  if (idx !== -1) tiles.splice(idx, 1);
}
function addTile(tile) {
  if (!tile.zIndex) {
    nextZIndex++;
    tile.zIndex = nextZIndex;
  }
  tiles.push(tile);
  return tile;
}
function getTile(id) {
  return tiles.find((t) => t.id === id) || null;
}
const IMAGE_EXTENSIONS = /* @__PURE__ */ new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".svg",
  ".webp"
]);
const GRID_CELL = 20;
function snapToGrid(tile) {
  tile.x = Math.round(tile.x / GRID_CELL) * GRID_CELL;
  tile.y = Math.round(tile.y / GRID_CELL) * GRID_CELL;
  tile.width = Math.round(tile.width / GRID_CELL) * GRID_CELL;
  tile.height = Math.round(tile.height / GRID_CELL) * GRID_CELL;
}
const selectedTileIds = /* @__PURE__ */ new Set();
function selectTile(id) {
  selectedTileIds.add(id);
}
function deselectTile(id) {
  selectedTileIds.delete(id);
}
function toggleTileSelection(id) {
  if (selectedTileIds.has(id)) {
    selectedTileIds.delete(id);
  } else {
    selectedTileIds.add(id);
  }
}
function clearSelection() {
  selectedTileIds.clear();
}
function isSelected(id) {
  return selectedTileIds.has(id);
}
function getSelectedTiles() {
  return tiles.filter((t) => selectedTileIds.has(t.id));
}
function inferTileType(filePath) {
  const ext = filePath.slice(filePath.lastIndexOf(".")).toLowerCase();
  if (ext === ".md") return "note";
  if (IMAGE_EXTENSIONS.has(ext)) return "image";
  return "code";
}
const MIN_SIZES = {
  term: { width: 200, height: 120 },
  note: { width: 200, height: 120 },
  code: { width: 200, height: 120 },
  image: { width: 80, height: 80 },
  graph: { width: 300, height: 250 }
};
const CLICK_THRESHOLD = 3;
function attachDrag(titleBar, tile, {
  viewport: viewport2,
  onUpdate,
  disablePointerEvents,
  enablePointerEvents,
  getAllWebviews,
  getGroupDragContext,
  onShiftClick,
  onFocus,
  isSpaceHeld,
  contentOverlay
}) {
  function startDrag(e, { deferFocus = false } = {}) {
    if (e.button !== 0) return;
    if (isSpaceHeld?.()) return;
    e.preventDefault();
    if (!deferFocus && onFocus) onFocus(tile.id, e);
    const startMX = e.clientX;
    const startMY = e.clientY;
    const startTX = tile.x;
    const startTY = tile.y;
    const shiftHeld = e.shiftKey;
    const groupCtx = getGroupDragContext();
    const isGroupDrag = groupCtx !== null && groupCtx.length > 1;
    const webviews = getAllWebviews();
    disablePointerEvents(webviews);
    if (isGroupDrag) {
      for (const entry of groupCtx) {
        entry.container.classList.add("tile-dragging");
      }
    }
    let moved = false;
    function onMove(e2) {
      const dx = (e2.clientX - startMX) / viewport2.zoom;
      const dy = (e2.clientY - startMY) / viewport2.zoom;
      const dist = Math.hypot(e2.clientX - startMX, e2.clientY - startMY);
      if (dist >= CLICK_THRESHOLD) moved = true;
      if (isGroupDrag) {
        for (const entry of groupCtx) {
          entry.tile.x = entry.startX + dx;
          entry.tile.y = entry.startY + dy;
        }
      } else {
        tile.x = startTX + dx;
        tile.y = startTY + dy;
      }
      onUpdate();
    }
    function onUp(e2) {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      enablePointerEvents(webviews);
      if (shiftHeld && !moved) {
        if (isGroupDrag) {
          for (const entry of groupCtx) {
            entry.container.classList.remove("tile-dragging");
          }
        }
        onShiftClick(tile.id);
        return;
      }
      if (deferFocus && !moved && onFocus) {
        onFocus(tile.id, e2);
      }
      if (isGroupDrag) {
        for (const entry of groupCtx) {
          entry.container.classList.remove("tile-dragging");
          snapToGrid(entry.tile);
        }
      } else {
        snapToGrid(tile);
      }
      onUpdate();
    }
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  }
  titleBar.addEventListener("mousedown", (e) => startDrag(e));
  if (contentOverlay) {
    contentOverlay.addEventListener("mousedown", (e) => {
      startDrag(e, { deferFocus: true });
    });
  }
}
function attachMarquee(canvasEl2, {
  viewport: viewport2,
  tiles: tiles2,
  onSelectionChange,
  isShiftHeld,
  isSpaceHeld,
  getAllWebviews
}) {
  const tileLayer = canvasEl2.querySelector("#tile-layer");
  const gridCanvas2 = canvasEl2.querySelector("#grid-canvas");
  canvasEl2.addEventListener("mousedown", (e) => {
    if (e.button !== 0) return;
    if (isSpaceHeld()) return;
    if (e.target !== canvasEl2 && e.target !== tileLayer && e.target !== gridCanvas2) return;
    e.preventDefault();
    if (document.activeElement) document.activeElement.blur();
    const webviews = getAllWebviews();
    for (const w of webviews) w.webview.style.pointerEvents = "none";
    const startSX = e.clientX;
    const startSY = e.clientY;
    const marquee = document.createElement("div");
    marquee.className = "selection-marquee";
    marquee.style.position = "fixed";
    marquee.style.left = `${startSX}px`;
    marquee.style.top = `${startSY}px`;
    marquee.style.width = "0px";
    marquee.style.height = "0px";
    document.body.appendChild(marquee);
    let moved = false;
    function onMove(e2) {
      const curSX = e2.clientX;
      const curSY = e2.clientY;
      const dist = Math.hypot(curSX - startSX, curSY - startSY);
      if (dist >= CLICK_THRESHOLD) moved = true;
      const left = Math.min(startSX, curSX);
      const top = Math.min(startSY, curSY);
      const width = Math.abs(curSX - startSX);
      const height = Math.abs(curSY - startSY);
      marquee.style.left = `${left}px`;
      marquee.style.top = `${top}px`;
      marquee.style.width = `${width}px`;
      marquee.style.height = `${height}px`;
    }
    function onUp(e2) {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      marquee.remove();
      for (const w of webviews) w.webview.style.pointerEvents = "";
      if (!moved) {
        onSelectionChange(/* @__PURE__ */ new Set());
        return;
      }
      const curSX = e2.clientX;
      const curSY = e2.clientY;
      const mLeft = Math.min(startSX, curSX);
      const mTop = Math.min(startSY, curSY);
      const mRight = Math.max(startSX, curSX);
      const mBottom = Math.max(startSY, curSY);
      const viewerRect = canvasEl2.getBoundingClientRect();
      const toCanvas = (sx, sy) => ({
        x: (sx - viewerRect.left - viewport2.panX) / viewport2.zoom,
        y: (sy - viewerRect.top - viewport2.panY) / viewport2.zoom
      });
      const cTL = toCanvas(mLeft, mTop);
      const cBR = toCanvas(mRight, mBottom);
      const hitIds = /* @__PURE__ */ new Set();
      for (const t of tiles2()) {
        const tRight = t.x + t.width;
        const tBottom = t.y + t.height;
        if (t.x < cBR.x && tRight > cTL.x && t.y < cBR.y && tBottom > cTL.y) {
          hitIds.add(t.id);
        }
      }
      if (isShiftHeld()) {
        onSelectionChange(hitIds);
      } else {
        onSelectionChange(hitIds);
      }
    }
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  });
}
function attachResize(container, tile, viewport2, onUpdate, getAllWebviews) {
  const edges = ["n", "s", "e", "w"];
  const corners = ["nw", "ne", "sw", "se"];
  for (const dir of [...edges, ...corners]) {
    const handle = document.createElement("div");
    const kind = dir.length === 1 ? "edge" : "corner";
    handle.className = `tile-resize-handle ${kind}-${dir}`;
    handle.addEventListener("mousedown", (e) => {
      if (e.button !== 0) return;
      e.preventDefault();
      e.stopPropagation();
      const startMX = e.clientX;
      const startMY = e.clientY;
      const startX = tile.x;
      const startY = tile.y;
      const startW = tile.width;
      const startH = tile.height;
      const min = MIN_SIZES[tile.type] || MIN_SIZES.term;
      const webviews = getAllWebviews();
      for (const wv of webviews) {
        wv.webview.style.pointerEvents = "none";
      }
      function onMove(e2) {
        const dx = (e2.clientX - startMX) / viewport2.zoom;
        const dy = (e2.clientY - startMY) / viewport2.zoom;
        if (dir.includes("e")) {
          tile.width = Math.max(min.width, startW + dx);
        }
        if (dir.includes("w")) {
          const newW = Math.max(min.width, startW - dx);
          tile.x = startX + (startW - newW);
          tile.width = newW;
        }
        if (dir.includes("s")) {
          tile.height = Math.max(min.height, startH + dy);
        }
        if (dir.includes("n")) {
          const newH = Math.max(min.height, startH - dy);
          tile.y = startY + (startH - newH);
          tile.height = newH;
        }
        onUpdate();
      }
      function onUp() {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
        for (const wv of webviews) {
          wv.webview.style.pointerEvents = "";
        }
        snapToGrid(tile);
        onUpdate();
      }
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
    });
    container.appendChild(handle);
  }
}
function initDarkMode(onThemeChange) {
  const query = "(prefers-color-scheme: dark)";
  function sync() {
    document.documentElement.classList.toggle(
      "dark",
      window.matchMedia(query).matches
    );
  }
  sync();
  window.matchMedia(query).addEventListener("change", () => {
    sync();
    onThemeChange();
  });
}
function applyCanvasOpacity(percent) {
  const clamped = Math.max(0, Math.min(100, Number(percent) || 0));
  document.documentElement.style.setProperty(
    "--canvas-opacity",
    String(clamped / 100)
  );
}
function normalizeShortcutKey(key) {
  if (!key) return null;
  return key.length === 1 ? key.toLowerCase() : key;
}
function isFocusSearchShortcut(input) {
  const inputType = input?.type;
  const hasCommandModifier = input?.meta || input?.control || input?.metaKey || input?.ctrlKey;
  if (!input || inputType !== "keyDown" && inputType !== "keydown" || input.isAutoRepeat || input.repeat) {
    return false;
  }
  if (!hasCommandModifier) return false;
  return input.code === "KeyK" || normalizeShortcutKey(input.key) === "k";
}
function createWebview(name, config, container, onDndMessage) {
  const wv = document.createElement("webview");
  wv.setAttribute("src", config.src);
  wv.setAttribute("preload", config.preload);
  wv.setAttribute(
    "webpreferences",
    "contextIsolation=yes, sandbox=yes"
  );
  wv.style.flex = "1";
  let ready = false;
  const pendingMessages = [];
  let onBeforeInput = null;
  wv.addEventListener("dom-ready", () => {
    ready = true;
    for (const [ch, args] of pendingMessages) {
      wv.send(ch, ...args);
    }
    pendingMessages.length = 0;
    wv.addEventListener("before-input-event", (e) => {
      const detail = e.detail;
      if (!detail || detail.type !== "keyDown") return;
      if (detail.meta && detail.alt && detail.code === "KeyI") {
        wv.openDevTools();
      }
      if (onBeforeInput) onBeforeInput(e, detail);
    });
  });
  wv.addEventListener("ipc-message", (event) => {
    if (event.channel.startsWith("dnd:")) {
      onDndMessage(event.channel, event.args);
      return;
    }
    console.log(
      `[shell] ipc from ${name}: ${event.channel}`,
      ...event.args
    );
  });
  wv.addEventListener("console-message", (event) => {
    window.shellApi.logFromWebview(
      name,
      event.level,
      event.message,
      event.sourceId
    );
  });
  container.appendChild(wv);
  return {
    send(channel, ...args) {
      if (ready) wv.send(channel, ...args);
      else pendingMessages.push([channel, args]);
    },
    setBeforeInput(cb) {
      onBeforeInput = cb;
    },
    webview: wv
  };
}
const ZOOM_MIN = 0.33;
const ZOOM_MAX = 1;
const ZOOM_RUBBER_BAND_K = 400;
const CELL = 20;
const MAJOR = 80;
function isDark() {
  return document.documentElement.classList.contains("dark");
}
function createViewport(canvasEl2, gridCanvas2) {
  const gridCtx = gridCanvas2.getContext("2d");
  let state = null;
  let onUpdate = null;
  let zoomSnapTimer = null;
  let zoomSnapRaf = null;
  let lastZoomFocalX = 0;
  let lastZoomFocalY = 0;
  let zoomIndicatorTimer = null;
  let prevCanvasW = canvasEl2.clientWidth;
  let prevCanvasH = canvasEl2.clientHeight;
  const zoomIndicatorEl = document.getElementById("zoom-indicator");
  function resizeGridCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const w = canvasEl2.clientWidth;
    const h = canvasEl2.clientHeight;
    gridCanvas2.width = w * dpr;
    gridCanvas2.height = h * dpr;
    gridCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function drawGrid() {
    const w = canvasEl2.clientWidth;
    const h = canvasEl2.clientHeight;
    if (w === 0 || h === 0) return;
    const dark = isDark();
    gridCtx.clearRect(0, 0, w, h);
    const step = CELL * state.zoom;
    const majorStep = MAJOR * state.zoom;
    const offX = (state.panX % majorStep + majorStep) % majorStep;
    const offY = (state.panY % majorStep + majorStep) % majorStep;
    const dotOffX = (state.panX % step + step) % step;
    const dotOffY = (state.panY % step + step) % step;
    const dotSize = Math.max(1, 1.5 * state.zoom);
    gridCtx.fillStyle = dark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.20)";
    for (let x = dotOffX; x <= w; x += step) {
      for (let y = dotOffY; y <= h; y += step) {
        const px = Math.round(x);
        const py = Math.round(y);
        gridCtx.fillRect(px, py, dotSize, dotSize);
      }
    }
    const majorDotSize = Math.max(1, 1.5 * state.zoom);
    gridCtx.fillStyle = dark ? "rgba(255,255,255,0.40)" : "rgba(0,0,0,0.35)";
    for (let x = offX; x <= w; x += majorStep) {
      for (let y = offY; y <= h; y += majorStep) {
        const px = Math.round(x);
        const py = Math.round(y);
        gridCtx.fillRect(px, py, majorDotSize, majorDotSize);
      }
    }
  }
  function showZoomIndicator() {
    const pct = Math.round(state.zoom * 100);
    zoomIndicatorEl.textContent = `${pct}%`;
    zoomIndicatorEl.classList.add("visible");
    clearTimeout(zoomIndicatorTimer);
    zoomIndicatorTimer = setTimeout(() => {
      zoomIndicatorEl.classList.remove("visible");
    }, 1200);
  }
  function updateCanvas() {
    drawGrid();
    if (onUpdate) onUpdate();
  }
  function snapBackZoom() {
    const fx = lastZoomFocalX;
    const fy = lastZoomFocalY;
    const target = state.zoom > ZOOM_MAX ? ZOOM_MAX : ZOOM_MIN;
    function animate() {
      const prevScale = state.zoom;
      state.zoom += (target - state.zoom) * 0.15;
      if (Math.abs(state.zoom - target) < 1e-3) {
        state.zoom = target;
      }
      const ratio = state.zoom / prevScale - 1;
      state.panX -= (fx - state.panX) * ratio;
      state.panY -= (fy - state.panY) * ratio;
      showZoomIndicator();
      updateCanvas();
      if (state.zoom === target) {
        zoomSnapRaf = null;
        return;
      }
      zoomSnapRaf = requestAnimationFrame(animate);
    }
    zoomSnapRaf = requestAnimationFrame(animate);
  }
  function applyZoom(deltaY, focalX, focalY) {
    if (zoomSnapRaf) {
      cancelAnimationFrame(zoomSnapRaf);
      zoomSnapRaf = null;
    }
    clearTimeout(zoomSnapTimer);
    const prevScale = state.zoom;
    let factor = Math.exp(-deltaY * 0.6 / 100);
    if (state.zoom >= ZOOM_MAX && factor > 1) {
      const overshoot = state.zoom / ZOOM_MAX - 1;
      const damping = 1 / (1 + overshoot * ZOOM_RUBBER_BAND_K);
      factor = 1 + (factor - 1) * damping;
      state.zoom *= factor;
    } else if (state.zoom <= ZOOM_MIN && factor < 1) {
      const overshoot = ZOOM_MIN / state.zoom - 1;
      const damping = 1 / (1 + overshoot * ZOOM_RUBBER_BAND_K);
      factor = 1 - (1 - factor) * damping;
      state.zoom *= factor;
    } else {
      state.zoom *= factor;
    }
    const ratio = state.zoom / prevScale - 1;
    state.panX -= (focalX - state.panX) * ratio;
    state.panY -= (focalY - state.panY) * ratio;
    lastZoomFocalX = focalX;
    lastZoomFocalY = focalY;
    if (state.zoom > ZOOM_MAX || state.zoom < ZOOM_MIN) {
      zoomSnapTimer = setTimeout(snapBackZoom, 150);
    }
    showZoomIndicator();
    updateCanvas();
  }
  canvasEl2.addEventListener("wheel", (e) => {
    e.preventDefault();
    if (e.ctrlKey) {
      const rect = canvasEl2.getBoundingClientRect();
      applyZoom(e.deltaY, e.clientX - rect.left, e.clientY - rect.top);
    } else {
      state.panX -= e.deltaX * 1.2;
      state.panY -= e.deltaY * 1.2;
      updateCanvas();
    }
  }, { passive: false });
  new ResizeObserver(() => {
    const w = canvasEl2.clientWidth;
    const h = canvasEl2.clientHeight;
    state.panX += (w - prevCanvasW) / 2;
    state.panY += (h - prevCanvasH) / 2;
    prevCanvasW = w;
    prevCanvasH = h;
    resizeGridCanvas();
    updateCanvas();
  }).observe(canvasEl2);
  resizeGridCanvas();
  return {
    init(viewportState2, callback) {
      state = viewportState2;
      onUpdate = callback;
      updateCanvas();
    },
    updateCanvas,
    applyZoom
  };
}
function createTileDOM(tile, callbacks) {
  const container = document.createElement("div");
  container.className = "canvas-tile";
  container.dataset.tileId = tile.id;
  container.dataset.tileType = tile.type;
  const titleBar = document.createElement("div");
  titleBar.className = "tile-title-bar";
  const titleText = document.createElement("span");
  titleText.className = "tile-title-text";
  const label = getTileLabel(tile);
  const parentSpan = document.createElement("span");
  parentSpan.className = "tile-title-parent";
  parentSpan.textContent = label.parent;
  const nameSpan = document.createElement("span");
  nameSpan.className = "tile-title-name";
  nameSpan.textContent = label.name;
  titleText.appendChild(parentSpan);
  titleText.appendChild(nameSpan);
  if (tile.filePath) titleText.title = tile.filePath;
  if (tile.folderPath) titleText.title = tile.folderPath;
  titleBar.appendChild(titleText);
  let urlInput;
  let navBack;
  let navForward;
  let navReload;
  if (tile.type === "browser") {
    const navGroup = document.createElement("div");
    navGroup.className = "tile-nav-group";
    navBack = document.createElement("button");
    navBack.className = "tile-nav-btn";
    navBack.title = "Back";
    navBack.innerHTML = `<svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 3L5 8l5 5"/></svg>`;
    navBack.disabled = true;
    navBack.addEventListener("mousedown", (e) => e.stopPropagation());
    navForward = document.createElement("button");
    navForward.className = "tile-nav-btn";
    navForward.title = "Forward";
    navForward.innerHTML = `<svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3l5 5-5 5"/></svg>`;
    navForward.disabled = true;
    navForward.addEventListener("mousedown", (e) => e.stopPropagation());
    navReload = document.createElement("button");
    navReload.className = "tile-nav-btn";
    navReload.title = "Reload";
    navReload.innerHTML = `<svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 3v4h-4"/><path d="M12.36 10a5 5 0 1 1-.96-5.36L13 7"/></svg>`;
    navReload.addEventListener("mousedown", (e) => e.stopPropagation());
    navGroup.appendChild(navBack);
    navGroup.appendChild(navForward);
    navGroup.appendChild(navReload);
    titleBar.appendChild(navGroup);
    urlInput = document.createElement("input");
    urlInput.type = "text";
    urlInput.className = "tile-url-input";
    urlInput.placeholder = "Enter URL...";
    urlInput.value = tile.url || "";
    if (tile.url) urlInput.readOnly = true;
    let dragOccurred = false;
    urlInput.addEventListener("mousedown", (e) => {
      dragOccurred = false;
      if (urlInput.readOnly) return;
      e.stopPropagation();
    });
    urlInput.addEventListener("mousemove", () => {
      dragOccurred = true;
    });
    urlInput.addEventListener("click", () => {
      if (urlInput.readOnly && !dragOccurred) {
        urlInput.readOnly = false;
        urlInput.select();
      }
    });
    urlInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const url = urlInput.value.trim();
        if (url && callbacks.onNavigate) callbacks.onNavigate(tile.id, url);
        urlInput.readOnly = true;
        urlInput.blur();
      }
      if (e.key === "Escape") {
        urlInput.value = tile.url || "";
        urlInput.readOnly = true;
        urlInput.blur();
      }
    });
    urlInput.addEventListener("blur", () => {
      if (!urlInput.readOnly) {
        urlInput.value = tile.url || "";
        urlInput.readOnly = true;
      }
      window.getSelection()?.removeAllRanges();
    });
    titleText.style.display = "none";
  }
  const btnGroup = document.createElement("div");
  btnGroup.className = "tile-btn-group";
  const copyablePath = tile.filePath || tile.folderPath;
  if (copyablePath) {
    const copySvg = `<svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="5" width="9" height="9" rx="1.5"/><path d="M5 11H3.5A1.5 1.5 0 0 1 2 9.5V3.5A1.5 1.5 0 0 1 3.5 2h6A1.5 1.5 0 0 1 11 3.5V5"/></svg>`;
    const checkSvg = `<svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="#4caf50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8.5 6.5 12 13 4"/></svg>`;
    const copyBtn = document.createElement("button");
    copyBtn.className = "tile-action-btn tile-copy-path-btn";
    copyBtn.innerHTML = copySvg;
    copyBtn.title = "Copy path";
    copyBtn.addEventListener("mousedown", (e) => e.stopPropagation());
    copyBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      navigator.clipboard.writeText(copyablePath);
      copyBtn.innerHTML = checkSvg;
      setTimeout(() => {
        copyBtn.innerHTML = copySvg;
      }, 1e3);
    });
    btnGroup.appendChild(copyBtn);
  }
  if (tile.filePath && callbacks.onOpenInViewer) {
    const viewBtn = document.createElement("button");
    viewBtn.className = "tile-action-btn tile-view-btn";
    viewBtn.innerHTML = `<svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 8s3-5.5 7-5.5S15 8 15 8s-3 5.5-7 5.5S1 8 1 8z"/><circle cx="8" cy="8" r="2.5"/></svg>`;
    viewBtn.title = "Open in viewer";
    viewBtn.addEventListener("mousedown", (e) => e.stopPropagation());
    viewBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      callbacks.onOpenInViewer(tile.id);
    });
    btnGroup.appendChild(viewBtn);
  }
  const closeBtn = document.createElement("button");
  closeBtn.className = "tile-action-btn tile-close-btn";
  closeBtn.innerHTML = "&times;";
  closeBtn.title = "Close tile";
  closeBtn.addEventListener("mousedown", (e) => {
    e.stopPropagation();
  });
  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    callbacks.onClose(tile.id);
  });
  btnGroup.appendChild(closeBtn);
  titleBar.appendChild(btnGroup);
  const contentArea = document.createElement("div");
  contentArea.className = "tile-content";
  const contentOverlay = document.createElement("div");
  contentOverlay.className = "tile-content-overlay";
  if (urlInput) titleBar.insertBefore(urlInput, btnGroup);
  container.appendChild(titleBar);
  container.appendChild(contentArea);
  contentArea.appendChild(contentOverlay);
  return { container, titleBar, titleText, contentArea, contentOverlay, closeBtn, urlInput, navBack, navForward, navReload };
}
function getTileLabel(tile) {
  if (tile.type === "term") return { parent: "", name: "Terminal" };
  if (tile.type === "browser") {
    if (tile.url) {
      try {
        return { parent: "", name: new URL(tile.url).hostname };
      } catch {
        return { parent: "", name: tile.url };
      }
    }
    return { parent: "", name: "Browser" };
  }
  if (tile.type === "graph") {
    if (tile.folderPath) return splitFilepath(tile.folderPath);
    return { parent: "", name: "Graph" };
  }
  if (tile.type === "nippo") {
    return { parent: "D-Terminal", name: "日報 & プロジェクト" };
  }
  if (tile.filePath) return splitFilepath(tile.filePath);
  return { parent: "", name: tile.type };
}
function splitFilepath(path) {
  const parts = path.split("/");
  const name = parts.pop() || path;
  const parent = parts.length > 0 ? parts.join("/") + "/" : "";
  return { parent, name };
}
function updateTileTitle(dom, tile) {
  const label = getTileLabel(tile);
  const titleText = dom.titleText;
  titleText.textContent = "";
  const parentSpan = document.createElement("span");
  parentSpan.className = "tile-title-parent";
  parentSpan.textContent = label.parent;
  const nameSpan = document.createElement("span");
  nameSpan.className = "tile-title-name";
  nameSpan.textContent = label.name;
  titleText.appendChild(parentSpan);
  titleText.appendChild(nameSpan);
  titleText.title = tile.filePath || tile.folderPath || "";
}
function positionTile(container, tile, panX, panY, zoom) {
  const sx = tile.x * zoom + panX;
  const sy = tile.y * zoom + panY;
  container.style.left = `${sx}px`;
  container.style.top = `${sy}px`;
  container.style.width = `${tile.width}px`;
  container.style.height = `${tile.height}px`;
  container.style.transform = `scale(${zoom})`;
  container.style.transformOrigin = "top left";
  container.style.zIndex = String(tile.zIndex);
}
function getTileTypeLabel(type) {
  if (type === "image") return "img";
  return type;
}
function isFullyOffScreen(tile, vw, vh, panX, panY, zoom) {
  const left = tile.x * zoom + panX;
  const top = tile.y * zoom + panY;
  const right = left + tile.width * zoom;
  const bottom = top + tile.height * zoom;
  return right <= 0 || left >= vw || bottom <= 0 || top >= vh;
}
function rayRectIntersect(cx, cy, tx, ty, vw, vh) {
  const dx = tx - cx;
  const dy = ty - cy;
  const INSET = 8;
  let tMin = Infinity;
  let ix = cx;
  let iy = cy;
  if (dx < 0) {
    const t = (0 - cx) / dx;
    const y = cy + t * dy;
    if (t > 0 && t < tMin && y >= 0 && y <= vh) {
      tMin = t;
      ix = INSET;
      iy = y;
    }
  }
  if (dx > 0) {
    const t = (vw - cx) / dx;
    const y = cy + t * dy;
    if (t > 0 && t < tMin && y >= 0 && y <= vh) {
      tMin = t;
      ix = vw - INSET;
      iy = y;
    }
  }
  if (dy < 0) {
    const t = (0 - cy) / dy;
    const x = cx + t * dx;
    if (t > 0 && t < tMin && x >= 0 && x <= vw) {
      tMin = t;
      ix = x;
      iy = INSET;
    }
  }
  if (dy > 0) {
    const t = (vh - cy) / dy;
    const x = cx + t * dx;
    if (t > 0 && t < tMin && x >= 0 && x <= vw) {
      tMin = t;
      ix = x;
      iy = vh - INSET;
    }
  }
  return { x: ix, y: iy };
}
function createEdgeIndicators({
  canvasEl: canvasEl2,
  edgeIndicatorsEl,
  viewportState: viewportState2,
  getTiles,
  getTileDOMs,
  onViewportUpdate
}) {
  let activeTooltipEl = null;
  let panAnimRaf = null;
  const edgeDotMap = /* @__PURE__ */ new Map();
  const edgeDotFadeOuts = /* @__PURE__ */ new Map();
  function panToTile(tile) {
    if (panAnimRaf) {
      cancelAnimationFrame(panAnimRaf);
      panAnimRaf = null;
    }
    const vw = canvasEl2.clientWidth;
    const vh = canvasEl2.clientHeight;
    const targetX = vw / 2 - (tile.x + tile.width / 2) * viewportState2.zoom;
    const targetY = vh / 2 - (tile.y + tile.height / 2) * viewportState2.zoom;
    const startX = viewportState2.panX;
    const startY = viewportState2.panY;
    const startTime = performance.now();
    const DURATION = 350;
    function easeOut(t) {
      return 1 - Math.pow(1 - t, 3);
    }
    function step(now) {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / DURATION, 1);
      const e = easeOut(t);
      viewportState2.panX = startX + (targetX - startX) * e;
      viewportState2.panY = startY + (targetY - startY) * e;
      onViewportUpdate();
      if (t < 1) {
        panAnimRaf = requestAnimationFrame(step);
      } else {
        panAnimRaf = null;
        const tileDOMs = getTileDOMs();
        const dom = tileDOMs.get(tile.id);
        if (dom) {
          dom.container.classList.add("edge-indicator-highlight");
          setTimeout(() => {
            dom.container.classList.remove(
              "edge-indicator-highlight"
            );
          }, 600);
        }
      }
    }
    panAnimRaf = requestAnimationFrame(step);
  }
  function removeTooltip() {
    if (activeTooltipEl) {
      activeTooltipEl.remove();
      activeTooltipEl = null;
    }
  }
  function showTooltip(dot, tile, dotX, dotY, vw, vh) {
    removeTooltip();
    const tooltip = document.createElement("div");
    tooltip.className = "edge-dot-tooltip";
    const label = getTileLabel(tile);
    const typeStr = getTileTypeLabel(tile.type);
    tooltip.textContent = `${typeStr}: ${label.name}`;
    edgeIndicatorsEl.appendChild(tooltip);
    const PAD = 6;
    const tw = tooltip.offsetWidth;
    const th = tooltip.offsetHeight;
    let tx = dotX - tw / 2;
    let ty = dotY - th / 2;
    if (dotX <= PAD + 4) tx = dotX + PAD;
    else if (dotX >= vw - PAD - 4) tx = dotX - PAD - tw;
    if (dotY <= PAD + 4) ty = dotY + PAD;
    else if (dotY >= vh - PAD - 4) ty = dotY - PAD - th;
    tx = Math.max(PAD, Math.min(tx, vw - tw - PAD));
    ty = Math.max(PAD, Math.min(ty, vh - th - PAD));
    tooltip.style.left = `${tx}px`;
    tooltip.style.top = `${ty}px`;
    activeTooltipEl = tooltip;
  }
  function updateEdgeIndicators() {
    activeTooltipEl = null;
    const vw = canvasEl2.clientWidth;
    const vh = canvasEl2.clientHeight;
    const vcx = vw / 2;
    const vcy = vh / 2;
    const activeIds = /* @__PURE__ */ new Set();
    const tiles2 = getTiles();
    for (const tile of tiles2) {
      if (!isFullyOffScreen(
        tile,
        vw,
        vh,
        viewportState2.panX,
        viewportState2.panY,
        viewportState2.zoom
      )) continue;
      activeIds.add(tile.id);
      const tcx = tile.x * viewportState2.zoom + viewportState2.panX + tile.width * viewportState2.zoom / 2;
      const tcy = tile.y * viewportState2.zoom + viewportState2.panY + tile.height * viewportState2.zoom / 2;
      const { x: dotX, y: dotY } = rayRectIntersect(vcx, vcy, tcx, tcy, vw, vh);
      let dot = edgeDotMap.get(tile.id);
      if (dot) {
        const fadeTimer = edgeDotFadeOuts.get(tile.id);
        if (fadeTimer != null) {
          clearTimeout(fadeTimer);
          edgeDotFadeOuts.delete(tile.id);
          dot.classList.add("visible");
        }
      } else {
        dot = document.createElement("div");
        dot.className = "edge-dot";
        dot.addEventListener("mouseenter", () => {
          const ctx = dot._edgeCtx;
          if (ctx) {
            showTooltip(
              dot,
              ctx.tile,
              ctx.dotX,
              ctx.dotY,
              ctx.vw,
              ctx.vh
            );
          }
        });
        dot.addEventListener("mouseleave", removeTooltip);
        dot.addEventListener("click", () => {
          removeTooltip();
          const ctx = dot._edgeCtx;
          if (ctx) panToTile(ctx.tile);
        });
        edgeIndicatorsEl.appendChild(dot);
        edgeDotMap.set(tile.id, dot);
        requestAnimationFrame(() => dot.classList.add("visible"));
      }
      dot.style.left = `${dotX}px`;
      dot.style.top = `${dotY}px`;
      dot._edgeCtx = { tile, dotX, dotY, vw, vh };
    }
    for (const [id, dot] of edgeDotMap) {
      if (activeIds.has(id)) continue;
      if (edgeDotFadeOuts.has(id)) continue;
      dot.classList.remove("visible");
      edgeDotFadeOuts.set(id, setTimeout(() => {
        dot.remove();
        edgeDotMap.delete(id);
        edgeDotFadeOuts.delete(id);
      }, 200));
    }
  }
  return {
    update() {
      updateEdgeIndicators();
    }
  };
}
function getPanelConstraints(side) {
  const s = getComputedStyle(document.documentElement);
  const min = parseInt(
    s.getPropertyValue(`--panel-${side}-min`).trim(),
    10
  );
  const max = parseInt(
    s.getPropertyValue(`--panel-${side}-max`).trim(),
    10
  );
  return { min, max };
}
function createPanelManager({
  panelNav,
  panelViewer,
  navResizeHandle,
  navToggle,
  getAllWebviews,
  onNavVisibilityChanged
}) {
  let navVisible = true;
  const _prefCache = {};
  function savePanelPref(key, value) {
    _prefCache[key] = value;
    window.shellApi.setPref(key, value);
  }
  function loadPanelPref(key) {
    const value = _prefCache[key];
    if (value == null) return null;
    return value;
  }
  function savePanelVisible(panel, visible) {
    _prefCache[`panel-visible-${panel}`] = visible;
    window.shellApi.setPref(`panel-visible-${panel}`, visible);
  }
  function loadPanelVisible(panel, fallback) {
    const value = _prefCache[`panel-visible-${panel}`];
    if (value == null) return fallback;
    return !!value;
  }
  function updateTogglePositions() {
    const panelsEl = document.getElementById("panels");
    const panelsRect = panelsEl.getBoundingClientRect();
    const centerY = panelsRect.top + panelsRect.height / 2;
    if (navVisible) {
      const navRect = panelNav.getBoundingClientRect();
      navToggle.style.left = `${navRect.right + 8}px`;
    } else {
      navToggle.style.left = `${panelsRect.left + 8}px`;
    }
    navToggle.style.top = `${centerY}px`;
    navToggle.style.transform = "translateY(-50%)";
  }
  function applyNavVisibility() {
    if (navVisible) {
      panelNav.style.display = "";
      navResizeHandle.style.display = "";
      const stored = loadPanelPref("panel-width-nav");
      const px = stored != null && stored > 1 ? stored : 280;
      panelNav.style.flex = `0 0 ${px}px`;
      panelViewer.style.flex = "1 1 0";
    } else {
      panelNav.style.display = "none";
      navResizeHandle.style.display = "none";
      panelViewer.style.flex = "";
    }
    navToggle.setAttribute(
      "aria-pressed",
      String(navVisible)
    );
    navToggle.setAttribute(
      "aria-label",
      navVisible ? "Hide Navigator" : "Show Navigator"
    );
    navToggle.title = navVisible ? "Hide Navigator" : "Show Navigator";
    onNavVisibilityChanged(navVisible);
    updateTogglePositions();
  }
  function setupResize(onResize) {
    const resizeOverlay = document.getElementById("resize-overlay");
    navResizeHandle.addEventListener("mousedown", (e) => {
      e.preventDefault();
      const startX = e.clientX;
      const startWidth = panelNav.getBoundingClientRect().width;
      panelViewer.getBoundingClientRect().width;
      let prevClamped = startWidth;
      navResizeHandle.classList.add("active");
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
      resizeOverlay.style.display = "block";
      for (const h of getAllWebviews()) {
        h.webview.style.pointerEvents = "none";
      }
      function onMouseMove(e2) {
        const constraints = getPanelConstraints("nav");
        const delta = e2.clientX - startX;
        const unclamped = startWidth + delta;
        const clamped = Math.max(
          constraints.min,
          Math.min(constraints.max, unclamped)
        );
        const counterDelta = prevClamped - clamped;
        prevClamped = clamped;
        panelNav.style.flex = `0 0 ${clamped}px`;
        panelViewer.style.flex = "1 1 0";
        onResize(counterDelta);
      }
      function onMouseUp() {
        navResizeHandle.classList.remove("active");
        document.removeEventListener(
          "mousemove",
          onMouseMove
        );
        document.removeEventListener(
          "mouseup",
          onMouseUp
        );
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
        resizeOverlay.style.display = "";
        for (const h of getAllWebviews()) {
          h.webview.style.pointerEvents = "";
        }
        savePanelPref(
          "panel-width-nav",
          panelNav.getBoundingClientRect().width
        );
      }
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });
  }
  function initPrefs(prefNavWidth, prefNavVisible) {
    if (prefNavWidth != null) {
      _prefCache["panel-width-nav"] = prefNavWidth;
    }
    if (prefNavVisible != null) {
      _prefCache["panel-visible-nav"] = prefNavVisible;
    }
    navVisible = loadPanelVisible("nav", true);
  }
  return {
    applyNavVisibility,
    isNavVisible() {
      return navVisible;
    },
    toggleNav() {
      navVisible = !navVisible;
      savePanelVisible("nav", navVisible);
      applyNavVisibility();
    },
    setNavVisible(visible) {
      navVisible = visible;
      savePanelVisible("nav", navVisible);
      applyNavVisibility();
    },
    updateTogglePositions,
    setupResize,
    savePanelPref,
    loadPanelPref,
    loadPanelVisible,
    initPrefs
  };
}
function createWorkspaceManager({
  panelNav,
  workspaceMenuItems,
  workspaceTriggerParent,
  workspaceTriggerName,
  configs,
  createWebview: createWebview2,
  handleDndMessage,
  onNoteSurfaceFocus,
  onSwitch,
  onApplyNavVisibility
}) {
  const workspaces = [];
  let activeIndex = -1;
  let emptyStateEl = null;
  let dropdownOpen = false;
  function showEmptyState() {
    if (emptyStateEl) return;
    emptyStateEl = document.createElement("div");
    emptyStateEl.id = "empty-state";
    emptyStateEl.textContent = "No workspace open";
    panelNav.appendChild(emptyStateEl);
  }
  function hideEmptyState() {
    if (emptyStateEl) {
      emptyStateEl.remove();
      emptyStateEl = null;
    }
  }
  function openDropdown() {
    dropdownOpen = true;
    const menu = document.getElementById("workspace-menu");
    menu.classList.remove("hidden");
    panelNav.classList.add("dropdown-open");
  }
  function closeDropdown() {
    dropdownOpen = false;
    const menu = document.getElementById("workspace-menu");
    menu.classList.add("hidden");
    panelNav.classList.remove("dropdown-open");
  }
  function renderDropdown() {
    workspaceMenuItems.innerHTML = "";
    for (let i = 0; i < workspaces.length; i++) {
      const ws = workspaces[i];
      const parts = ws.path.split("/");
      const name = parts.pop() || ws.path;
      const parent = parts.length > 1 ? parts.slice(-2).join("/") + "/" : "";
      const item = document.createElement("button");
      item.type = "button";
      item.className = "dropdown-item" + (i === activeIndex ? " active" : "");
      item.title = ws.path;
      const labelSpan = document.createElement("span");
      labelSpan.className = "dropdown-item-label";
      const parentSpan = document.createElement("span");
      parentSpan.className = "dropdown-item-parent";
      parentSpan.textContent = parent;
      labelSpan.appendChild(parentSpan);
      const nameSpan = document.createElement("span");
      nameSpan.className = "dropdown-item-name";
      nameSpan.textContent = name;
      labelSpan.appendChild(nameSpan);
      item.appendChild(labelSpan);
      const removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.className = "ws-remove";
      removeBtn.innerHTML = "&times;";
      removeBtn.title = "Remove workspace";
      removeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        closeDropdown();
        removeWorkspace(i);
      });
      item.appendChild(removeBtn);
      item.addEventListener("click", () => {
        closeDropdown();
        switchWorkspace(i);
      });
      workspaceMenuItems.appendChild(item);
    }
    if (activeIndex >= 0 && workspaces[activeIndex]) {
      const { parent, name } = splitFilepath(workspaces[activeIndex].path);
      workspaceTriggerParent.textContent = parent;
      workspaceTriggerName.textContent = name;
    } else {
      workspaceTriggerParent.textContent = "";
      workspaceTriggerName.textContent = "No workspace";
    }
  }
  function addWorkspace(path) {
    const navContainer = document.createElement("div");
    navContainer.className = "nav-container";
    navContainer.style.display = "none";
    panelNav.appendChild(navContainer);
    const navHandle = createWebview2(
      "nav",
      configs.nav,
      navContainer,
      handleDndMessage
    );
    navHandle.webview.addEventListener("focus", () => {
      onNoteSurfaceFocus("nav");
    });
    const wsData = { path, nav: navHandle, navContainer };
    workspaces.push(wsData);
    navHandle.send("workspace-changed", path);
    hideEmptyState();
    renderDropdown();
    return wsData;
  }
  function switchWorkspace(index) {
    if (index === activeIndex || index < 0 || index >= workspaces.length) {
      return;
    }
    if (activeIndex >= 0 && workspaces[activeIndex]) {
      workspaces[activeIndex].navContainer.style.display = "none";
    }
    activeIndex = index;
    workspaces[activeIndex].navContainer.style.display = "";
    const wsPath = workspaces[activeIndex].path;
    workspaces[activeIndex].nav.send(
      "workspace-changed",
      wsPath
    );
    onApplyNavVisibility();
    renderDropdown();
    onSwitch(index);
  }
  async function removeWorkspace(index) {
    if (index < 0 || index >= workspaces.length) return;
    let result;
    try {
      result = await window.shellApi.workspaceRemove(index);
    } catch (err) {
      console.error(
        "[shell] Failed to remove workspace:",
        err
      );
      return;
    }
    const ws = workspaces[index];
    ws.nav.webview.remove();
    ws.navContainer.remove();
    workspaces.splice(index, 1);
    activeIndex = -1;
    if (workspaces.length === 0) {
      showEmptyState();
    } else if (result.active >= 0 && result.active < workspaces.length) {
      switchWorkspace(result.active);
    }
    renderDropdown();
  }
  function getAllNavWebviews() {
    return workspaces.map((ws) => ws.nav);
  }
  return {
    addWorkspace,
    switchWorkspace,
    removeWorkspace,
    getActiveWorkspace() {
      return workspaces[activeIndex] || null;
    },
    getActiveIndex() {
      return activeIndex;
    },
    getWorkspaces() {
      return workspaces;
    },
    renderDropdown,
    getAllNavWebviews,
    showEmptyState,
    hideEmptyState,
    openDropdown,
    closeDropdown,
    isDropdownOpen() {
      return dropdownOpen;
    }
  };
}
function findAutoPlacement(existingTiles, width, height) {
  const CANVAS_W = 4e3;
  const CANVAS_H = 3e3;
  const STEP = 20;
  for (let y = 0; y <= CANVAS_H - height; y += STEP) {
    for (let x = 0; x <= CANVAS_W - width; x += STEP) {
      const overlaps = existingTiles.some(
        (t) => x < t.x + t.width && x + width > t.x && y < t.y + t.height && y + height > t.y
      );
      if (!overlaps) return { x, y };
    }
  }
  const last = existingTiles[existingTiles.length - 1];
  if (last) return { x: last.x + 40, y: last.y + 40 };
  return { x: 40, y: 40 };
}
function createCanvasRpc({
  tileManager,
  viewportState: viewportState2,
  viewport: viewport2,
  workspaceManager
}) {
  function respond(requestId, result) {
    window.shellApi.canvasRpcResponse({ requestId, result });
  }
  function respondError(requestId, code, message) {
    window.shellApi.canvasRpcResponse({
      requestId,
      error: { code, message }
    });
  }
  function requireTile(requestId, tileId) {
    const tile = getTile(tileId);
    if (!tile) {
      respondError(requestId, 3, "Tile not found");
      return null;
    }
    return tile;
  }
  return function handleCanvasRpc(request) {
    const { requestId, method, params } = request;
    try {
      let result;
      switch (method) {
        case "tileList": {
          result = {
            tiles: tiles.map((t) => ({
              id: t.id,
              type: t.type,
              filePath: t.filePath,
              folderPath: t.folderPath,
              position: { x: t.x, y: t.y },
              size: { width: t.width, height: t.height }
            }))
          };
          break;
        }
        case "tileAdd": {
          const tileType = params.tileType || "note";
          const size = defaultSize(tileType);
          const pos = params.position ? { x: params.position.x, y: params.position.y } : findAutoPlacement(tiles, size.width, size.height);
          let tile;
          if (tileType === "graph") {
            const ws = workspaceManager.getActiveWorkspace();
            const wsPath = ws?.path ?? "";
            tile = tileManager.createGraphTile(
              pos.x,
              pos.y,
              params.filePath,
              wsPath
            );
          } else {
            tile = tileManager.createFileTile(
              tileType,
              pos.x,
              pos.y,
              params.filePath
            );
          }
          tileManager.saveCanvasImmediate();
          result = { tileId: tile.id };
          break;
        }
        case "tileRemove": {
          if (!requireTile(requestId, params.tileId)) return;
          tileManager.closeCanvasTile(params.tileId);
          result = {};
          break;
        }
        case "tileMove": {
          const tile = requireTile(requestId, params.tileId);
          if (!tile) return;
          tile.x = params.position.x;
          tile.y = params.position.y;
          snapToGrid(tile);
          tileManager.repositionAllTiles();
          tileManager.saveCanvasImmediate();
          result = {};
          break;
        }
        case "tileResize": {
          const tile = requireTile(requestId, params.tileId);
          if (!tile) return;
          tile.width = params.size.width;
          tile.height = params.size.height;
          snapToGrid(tile);
          tileManager.repositionAllTiles();
          tileManager.saveCanvasImmediate();
          result = {};
          break;
        }
        case "viewportGet": {
          result = {
            pan: {
              x: viewportState2.panX,
              y: viewportState2.panY
            },
            zoom: viewportState2.zoom
          };
          break;
        }
        case "viewportSet": {
          if (params.pan) {
            viewportState2.panX = params.pan.x;
            viewportState2.panY = params.pan.y;
          }
          if (params.zoom !== void 0) {
            viewportState2.zoom = params.zoom;
          }
          viewport2.updateCanvas();
          tileManager.saveCanvasDebounced();
          result = {};
          break;
        }
        default: {
          respondError(
            requestId,
            -32601,
            `Unknown method: ${method}`
          );
          return;
        }
      }
      respond(requestId, result);
    } catch (err) {
      respondError(
        requestId,
        -32603,
        err.message || "Internal error"
      );
    }
  };
}
function createTileManager({
  tileLayer,
  viewportState: viewportState2,
  configs,
  getAllWebviews,
  isSpaceHeld,
  onSaveDebounced,
  onSaveImmediate,
  onNoteSurfaceFocus,
  onFocusSurface
}) {
  const tileDOMs = /* @__PURE__ */ new Map();
  let saveTimer = null;
  let focusedTileId = null;
  const viewport2 = {
    get zoom() {
      return viewportState2.zoom;
    }
  };
  function getCanvasStateForSave() {
    return {
      version: 1,
      tiles: tiles.map((t) => ({
        id: t.id,
        type: t.type,
        x: t.x,
        y: t.y,
        width: t.width,
        height: t.height,
        filePath: t.filePath,
        folderPath: t.folderPath,
        workspacePath: t.workspacePath,
        ptySessionId: t.ptySessionId,
        url: t.url,
        zIndex: t.zIndex
      })),
      viewport: {
        panX: viewportState2.panX,
        panY: viewportState2.panY,
        zoom: viewportState2.zoom
      }
    };
  }
  function saveCanvasDebounced() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      onSaveDebounced(getCanvasStateForSave());
    }, 500);
  }
  function saveCanvasImmediate() {
    clearTimeout(saveTimer);
    onSaveImmediate(getCanvasStateForSave());
  }
  function repositionAllTiles() {
    for (const tile of tiles) {
      const dom = tileDOMs.get(tile.id);
      if (!dom) continue;
      positionTile(
        dom.container,
        tile,
        viewportState2.panX,
        viewportState2.panY,
        viewportState2.zoom
      );
    }
  }
  function syncSelectionVisuals() {
    for (const [id, dom] of tileDOMs) {
      dom.container.classList.toggle(
        "tile-selected",
        isSelected(id)
      );
    }
  }
  function clearTileFocusRing() {
    for (const [, d] of tileDOMs) {
      d.container.classList.remove("tile-focused");
    }
  }
  function blurCanvasTileGuest(id = focusedTileId) {
    if (!id) return;
    const dom = tileDOMs.get(id);
    if (!dom?.webview) return;
    try {
      dom.webview.send("shell-blur");
    } catch {
    }
    try {
      dom.webview.blur();
    } catch {
    }
  }
  function forwardClickToWebview(webview, mouseEvent) {
    const rect = webview.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const x = Math.round(
      (mouseEvent.clientX - rect.left) * (webview.offsetWidth / rect.width)
    );
    const y = Math.round(
      (mouseEvent.clientY - rect.top) * (webview.offsetHeight / rect.height)
    );
    if (x < 0 || y < 0) return;
    if (x > webview.offsetWidth || y > webview.offsetHeight) return;
    webview.sendInputEvent({
      type: "mouseDown",
      x,
      y,
      button: "left",
      clickCount: 1
    });
    webview.sendInputEvent({
      type: "mouseUp",
      x,
      y,
      button: "left",
      clickCount: 1
    });
  }
  function focusCanvasTile(id, mouseEvent) {
    const tile = getTile(id);
    if (tile) {
      bringToFront(tile);
      repositionAllTiles();
    }
    const dom = tileDOMs.get(id);
    if (dom && dom.webview) {
      if (focusedTileId && focusedTileId !== id) {
        blurCanvasTileGuest(focusedTileId);
      }
      focusedTileId = id;
      clearTileFocusRing();
      dom.container.classList.add("tile-focused");
      dom.webview.focus();
      onNoteSurfaceFocus("canvas-tile");
      if (mouseEvent && mouseEvent.button === 0 && tile.type !== "browser") {
        forwardClickToWebview(dom.webview, mouseEvent);
      }
    }
  }
  function spawnTerminalWebview(tile, autoFocus = false) {
    const dom = tileDOMs.get(tile.id);
    if (!dom) return;
    const wv = document.createElement("webview");
    const termConfig = configs.terminalTile;
    const params = new URLSearchParams();
    if (tile.ptySessionId) {
      params.set("sessionId", tile.ptySessionId);
      params.set("restored", "1");
    } else if (tile.cwd) {
      params.set("cwd", tile.cwd);
    }
    const qs = params.toString();
    wv.setAttribute(
      "src",
      qs ? `${termConfig.src}?${qs}` : termConfig.src
    );
    wv.setAttribute("preload", termConfig.preload);
    wv.setAttribute(
      "webpreferences",
      "contextIsolation=yes, sandbox=yes"
    );
    wv.style.width = "100%";
    wv.style.height = "100%";
    wv.style.border = "none";
    dom.contentArea.appendChild(wv);
    dom.webview = wv;
    wv.addEventListener("dom-ready", () => {
      if (autoFocus) focusCanvasTile(tile.id);
      wv.addEventListener("before-input-event", () => {
      });
    });
    wv.addEventListener("ipc-message", (event) => {
      if (event.channel === "pty-session-id") {
        tile.ptySessionId = event.args[0];
        saveCanvasDebounced();
      }
      if (event.channel === "pty-cwd") {
        const cwd = event.args[0];
        if (cwd) {
          tile.cwd = cwd;
          const tDom = tileDOMs.get(tile.id);
          if (tDom) {
            const titleText = tDom.titleBar.querySelector(".tile-title-text");
            if (titleText) {
              let display = cwd;
              const homeMatch = cwd.match(/^\/Users\/[^/]+/);
              if (homeMatch && cwd.startsWith(homeMatch[0])) {
                display = "~" + cwd.slice(homeMatch[0].length);
              }
              let cwdSpan = titleText.querySelector(".tile-title-cwd");
              if (!cwdSpan) {
                cwdSpan = document.createElement("span");
                cwdSpan.className = "tile-title-cwd";
                titleText.appendChild(cwdSpan);
              }
              cwdSpan.textContent = display;
              cwdSpan.title = cwd;
            }
          }
        }
      }
    });
  }
  function spawnGraphWebview(tile) {
    return;
    const dom = tileDOMs.get(tile.id);
    if (!dom) return;
    const wv = document.createElement("webview");
    const graphConfig = configs.graphTile;
    const params = new URLSearchParams();
    params.set("folder", tile.folderPath);
    params.set("workspace", tile.workspacePath ?? "");
    const qs = params.toString();
    wv.setAttribute("src", `${graphConfig.src}?${qs}`);
    wv.setAttribute("preload", graphConfig.preload);
    wv.setAttribute(
      "webpreferences",
      "contextIsolation=yes, sandbox=yes"
    );
    wv.style.width = "100%";
    wv.style.height = "100%";
    wv.style.border = "none";
    dom.contentArea.appendChild(wv);
    dom.webview = wv;
  }
  function spawnNippoWebview(tile) {
    const dom = tileDOMs.get(tile.id);
    if (!dom) return;
    const wv = document.createElement("webview");
    const nippoConfig = configs.nippo;
    wv.setAttribute("src", nippoConfig.src);
    wv.setAttribute("preload", nippoConfig.preload);
    wv.setAttribute("webpreferences", "contextIsolation=yes, sandbox=no");
    wv.setAttribute("allowpopups", "");
    wv.style.width = "100%";
    wv.style.height = "100%";
    wv.style.border = "none";
    dom.contentArea.appendChild(wv);
    dom.webview = wv;
  }
  function spawnBrowserWebview(tile, autoFocus = false) {
    const dom = tileDOMs.get(tile.id);
    if (!dom) return;
    if (!tile.url) {
      if (autoFocus && dom.urlInput) {
        dom.urlInput.focus();
      }
      return;
    }
    let url = tile.url;
    if (!/^https?:\/\//i.test(url)) {
      const isLocal = /^localhost(:|$)/i.test(url) || /^127\.0\.0\.1(:|$)/.test(url);
      url = (isLocal ? "http://" : "https://") + url;
      tile.url = url;
    }
    const blocked = /^(javascript|file|data):/i;
    if (blocked.test(url)) return;
    const wv = document.createElement("webview");
    wv.setAttribute("src", url);
    wv.setAttribute("allowpopups", "");
    wv.setAttribute("partition", "persist:browser");
    wv.setAttribute(
      "webpreferences",
      "contextIsolation=yes, sandbox=yes"
    );
    wv.style.width = "100%";
    wv.style.height = "100%";
    wv.style.border = "none";
    dom.contentArea.appendChild(wv);
    dom.webview = wv;
    const stopSvg = `<svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4l8 8M12 4l-8 8"/></svg>`;
    const reloadSvg = `<svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 3v4h-4"/><path d="M12.36 10a5 5 0 1 1-.96-5.36L13 7"/></svg>`;
    function updateNavState() {
      if (dom.navBack) {
        dom.navBack.disabled = !wv.canGoBack();
      }
      if (dom.navForward) {
        dom.navForward.disabled = !wv.canGoForward();
      }
    }
    for (const key of ["navBack", "navForward", "navReload"]) {
      if (dom[key]) {
        const fresh = dom[key].cloneNode(true);
        dom[key].replaceWith(fresh);
        dom[key] = fresh;
      }
    }
    if (dom.navBack) {
      dom.navBack.addEventListener("click", (e) => {
        e.stopPropagation();
        if (wv.canGoBack()) wv.goBack();
      });
    }
    if (dom.navForward) {
      dom.navForward.addEventListener("click", (e) => {
        e.stopPropagation();
        if (wv.canGoForward()) wv.goForward();
      });
    }
    if (dom.navReload) {
      dom.navReload.addEventListener("click", (e) => {
        e.stopPropagation();
        if (wv.isLoading()) {
          wv.stop();
        } else {
          wv.reload();
        }
      });
    }
    wv.addEventListener("dom-ready", () => {
      wv.setZoomFactor(0.85);
    });
    function clearErrors() {
      for (const el of [
        ...dom.contentArea.querySelectorAll(".tile-load-error")
      ]) {
        el.remove();
      }
    }
    wv.addEventListener("did-start-loading", () => {
      clearErrors();
      wv.style.display = "";
      if (dom.navReload) {
        dom.navReload.innerHTML = stopSvg;
        dom.navReload.title = "Stop";
      }
    });
    wv.addEventListener("did-stop-loading", () => {
      if (dom.navReload) {
        dom.navReload.innerHTML = reloadSvg;
        dom.navReload.title = "Reload";
      }
      updateNavState();
    });
    wv.addEventListener("did-navigate", (e) => {
      tile.url = e.url;
      if (dom.urlInput) dom.urlInput.value = e.url;
      updateTileTitle(dom, tile);
      updateNavState();
      saveCanvasDebounced();
    });
    wv.addEventListener("did-navigate-in-page", (e) => {
      if (e.isMainFrame) {
        tile.url = e.url;
        if (dom.urlInput) dom.urlInput.value = e.url;
        updateTileTitle(dom, tile);
        updateNavState();
        saveCanvasDebounced();
      }
    });
    wv.addEventListener("did-fail-load", (e) => {
      if (e.errorCode === -3) return;
      if (!e.isMainFrame) return;
      clearErrors();
      wv.style.display = "none";
      const errDiv = document.createElement("div");
      errDiv.className = "tile-load-error";
      errDiv.style.cssText = "padding:20px;color:#888;font-size:13px;";
      errDiv.textContent = `Failed to load: ${e.validatedURL || tile.url}`;
      dom.contentArea.appendChild(errDiv);
    });
    wv.addEventListener("render-process-gone", () => {
      const crashDiv = document.createElement("div");
      crashDiv.style.cssText = "padding:20px;color:#888;font-size:13px;";
      crashDiv.textContent = "Page crashed. Edit the URL and press Enter to reload.";
      if (dom.webview) {
        dom.contentArea.removeChild(dom.webview);
        dom.webview = null;
      }
      dom.contentArea.appendChild(crashDiv);
    });
    if (autoFocus) {
      wv.addEventListener(
        "dom-ready",
        () => focusCanvasTile(tile.id)
      );
    }
  }
  function createCanvasTile(type, cx, cy, extra = {}) {
    const size = defaultSize(type);
    const tile = addTile({
      id: extra.id || generateId(),
      type,
      x: cx,
      y: cy,
      width: extra.width || size.width,
      height: extra.height || size.height,
      ...extra
    });
    snapToGrid(tile);
    window.shellApi.trackEvent("tile_created", { type });
    const dom = createTileDOM(tile, {
      onClose: (id) => closeCanvasTile(id),
      onFocus: (id, e) => {
        if (e && e.shiftKey) {
          toggleTileSelection(id);
          syncSelectionVisuals();
          return;
        }
        clearSelection();
        syncSelectionVisuals();
        focusCanvasTile(id, e);
      },
      onOpenInViewer: (id) => {
        const t = getTile(id);
        if (t?.filePath) {
          window.shellApi.trackEvent(
            "tile_opened_in_viewer",
            { type: t.type }
          );
          window.shellApi.selectFile(t.filePath);
        }
      },
      onNavigate: (id, url) => {
        const t = getTile(id);
        if (!t || t.type !== "browser") return;
        t.url = url;
        const d = tileDOMs.get(id);
        if (d?.webview) {
          d.contentArea.removeChild(d.webview);
          d.webview = null;
        }
        spawnBrowserWebview(t);
        saveCanvasImmediate();
      }
    });
    attachDrag(dom.titleBar, tile, {
      viewport: viewport2,
      onUpdate: repositionAllTiles,
      disablePointerEvents: (wvs) => {
        for (const w of wvs) {
          w.webview.style.pointerEvents = "none";
        }
      },
      enablePointerEvents: (wvs) => {
        for (const w of wvs) {
          w.webview.style.pointerEvents = "";
        }
      },
      getAllWebviews,
      getGroupDragContext: () => {
        if (!isSelected(tile.id) || getSelectedTiles().length <= 1) {
          return null;
        }
        return getSelectedTiles().map((t) => ({
          tile: t,
          container: tileDOMs.get(t.id)?.container,
          startX: t.x,
          startY: t.y
        }));
      },
      onShiftClick: (id) => {
        toggleTileSelection(id);
        syncSelectionVisuals();
      },
      onFocus: (id, e) => focusCanvasTile(id, e),
      isSpaceHeld,
      contentOverlay: dom.contentOverlay
    });
    attachResize(
      dom.container,
      tile,
      viewport2,
      repositionAllTiles,
      getAllWebviews
    );
    tileLayer.appendChild(dom.container);
    tileDOMs.set(tile.id, dom);
    positionTile(
      dom.container,
      tile,
      viewportState2.panX,
      viewportState2.panY,
      viewportState2.zoom
    );
    return tile;
  }
  function closeCanvasTile(id) {
    const dom = tileDOMs.get(id);
    if (dom) {
      dom.container.remove();
      tileDOMs.delete(id);
    }
    deselectTile(id);
    const tile = getTile(id);
    if (tile) {
      window.shellApi.trackEvent(
        "tile_closed",
        { type: tile.type }
      );
    }
    removeTile(id);
    saveCanvasImmediate();
  }
  function createFileTile(type, cx, cy, filePath) {
    const tile = createCanvasTile(type, cx, cy, { filePath });
    const dom = tileDOMs.get(tile.id);
    if (!dom) return tile;
    if (type === "image") {
      const img = document.createElement("img");
      img.src = `collab-file://${filePath}`;
      img.style.width = "100%";
      img.style.height = "100%";
      img.style.objectFit = "contain";
      img.draggable = false;
      dom.contentArea.appendChild(img);
    } else {
      const wv = document.createElement("webview");
      const viewerConfig = configs.viewer;
      const mode = type === "note" ? "note" : "code";
      wv.setAttribute(
        "src",
        `${viewerConfig.src}?tilePath=${encodeURIComponent(filePath)}&tileMode=${mode}`
      );
      wv.setAttribute("preload", viewerConfig.preload);
      wv.setAttribute(
        "webpreferences",
        "contextIsolation=yes, sandbox=yes"
      );
      wv.style.width = "100%";
      wv.style.height = "100%";
      wv.style.border = "none";
      dom.contentArea.appendChild(wv);
      dom.webview = wv;
      wv.addEventListener("dom-ready", () => {
      });
    }
    saveCanvasImmediate();
    return tile;
  }
  function createGraphTile(cx, cy, folderPath, workspacePath) {
    return null;
  }
  function clearCanvas(viewportObj) {
    const tileIds = tiles.map((t) => t.id);
    for (const id of tileIds) {
      closeCanvasTile(id);
    }
    viewportState2.panX = 0;
    viewportState2.panY = 0;
    viewportState2.zoom = 1;
    viewportObj.updateCanvas();
    saveCanvasImmediate();
  }
  function restoreCanvasState(savedTiles) {
    for (const saved of savedTiles) {
      if (saved.type === "term") {
        const tile = createCanvasTile(
          "term",
          saved.x,
          saved.y,
          {
            id: saved.id,
            width: saved.width,
            height: saved.height,
            zIndex: saved.zIndex,
            ptySessionId: saved.ptySessionId
          }
        );
        spawnTerminalWebview(tile);
      /* graph tile disabled */
      } else if (saved.type === "browser") {
        const tile = createCanvasTile(
          "browser",
          saved.x,
          saved.y,
          {
            id: saved.id,
            width: saved.width,
            height: saved.height,
            zIndex: saved.zIndex,
            url: saved.url
          }
        );
        spawnBrowserWebview(tile);
      } else if (saved.type === "nippo") {
        const tile = createCanvasTile(
          "nippo",
          saved.x,
          saved.y,
          {
            id: saved.id,
            width: saved.width,
            height: saved.height,
            zIndex: saved.zIndex
          }
        );
        spawnNippoWebview(tile);
      } else if (saved.filePath) {
        createFileTile(
          saved.type,
          saved.x,
          saved.y,
          saved.filePath
        );
      }
    }
  }
  function updateTileForRename(oldPath, newPath) {
    let anyUpdated = false;
    for (const t of tiles) {
      if (t.filePath === oldPath) {
        t.filePath = newPath;
        t.type = inferTileType(newPath);
        const dom = tileDOMs.get(t.id);
        if (dom) updateTileTitle(dom, t);
        anyUpdated = true;
      }
      if (t.type === "graph" && t.folderPath && (t.folderPath === oldPath || t.folderPath.startsWith(oldPath + "/"))) {
        t.folderPath = newPath + t.folderPath.slice(oldPath.length);
        const dom = tileDOMs.get(t.id);
        if (dom) {
          updateTileTitle(dom, t);
          if (dom.webview) {
            dom.webview.send(
              "scope-changed",
              t.folderPath
            );
          }
        }
        anyUpdated = true;
      }
    }
    if (anyUpdated) saveCanvasDebounced();
  }
  function closeTilesForDeletedPaths(deletedPaths) {
    const deleted = new Set(deletedPaths);
    for (const t of [...tiles]) {
      if (t.filePath && deleted.has(t.filePath)) {
        closeCanvasTile(t.id);
      }
      if (t.type === "graph" && t.folderPath && deleted.has(t.folderPath)) {
        closeCanvasTile(t.id);
      }
    }
  }
  function broadcastToTileWebviews(channel, ...args) {
    for (const [, dom] of tileDOMs) {
      if (dom.webview) dom.webview.send(channel, ...args);
    }
  }
  return {
    createCanvasTile,
    closeCanvasTile,
    focusCanvasTile,
    blurCanvasTileGuest,
    clearTileFocusRing,
    repositionAllTiles,
    syncSelectionVisuals,
    spawnTerminalWebview,
    spawnGraphWebview,
    spawnBrowserWebview,
    createFileTile,
    createGraphTile,
    clearCanvas,
    getCanvasStateForSave,
    restoreCanvasState,
    getTileDOMs: () => tileDOMs,
    getFocusedTileId: () => focusedTileId,
    setFocusedTileId: (id) => {
      focusedTileId = id;
    },
    updateTileForRename,
    closeTilesForDeletedPaths,
    broadcastToTileWebviews,
    saveCanvasDebounced,
    saveCanvasImmediate
  };
}
const CANVAS_DBLCLICK_SUPPRESS_MS = 500;
const viewportState = { panX: 0, panY: 0, zoom: 1 };
const canvasEl = document.getElementById("panel-viewer");
const gridCanvas = document.getElementById("grid-canvas");
canvasEl.tabIndex = -1;
initDarkMode(() => viewport.updateCanvas());
window.shellApi.getPref("canvasOpacity").then((v) => {
  if (v != null) applyCanvasOpacity(v);
});
window.shellApi.onPrefChanged((key, value) => {
  if (key === "canvasOpacity") applyCanvasOpacity(value);
});
const viewport = createViewport(canvasEl, gridCanvas);
async function init() {
  const [
    configs,
    workspaceData,
    prefNavWidth,
    prefNavVisible
  ] = await Promise.all([
    window.shellApi.getViewConfig(),
    window.shellApi.workspaceList(),
    window.shellApi.getPref("panel-width-nav"),
    window.shellApi.getPref("panel-visible-nav")
  ]);
  const panelNav = document.getElementById("panel-nav");
  const panelViewer = document.getElementById("panel-viewer");
  const navResizeHandle = document.getElementById("nav-resize");
  const navToggle = document.getElementById("nav-toggle");
  const workspaceTrigger = document.getElementById("workspace-trigger");
  const workspaceTriggerParent = document.getElementById("workspace-trigger-parent");
  const workspaceTriggerName = document.getElementById("workspace-trigger-name");
  const workspaceMenuItems = document.getElementById("workspace-menu-items");
  const wsAddOption = document.getElementById("ws-add-option");
  const settingsOverlay = document.getElementById("settings-overlay");
  const settingsBackdrop = document.getElementById("settings-backdrop");
  const settingsModal = document.getElementById("settings-modal");
  const updatePill = document.getElementById("update-pill");
  const titlebarUpdatePill = document.getElementById("titlebar-update-pill");
  const dragDropOverlay = document.getElementById("drag-drop-overlay");
  const loadingOverlay = document.getElementById("loading-overlay");
  const loadingStatusEl = document.getElementById("loading-status");
  const tileLayer = document.getElementById("tile-layer");
  let dragCounter = 0;
  let settingsModalOpen = false;
  let activeSurface = "canvas";
  let lastNonModalSurface = "canvas";
  let shiftHeld = false;
  let spaceHeld = false;
  let isPanning = false;
  let suppressCanvasDblClickUntil = 0;
  function handleDndMessage(channel) {
    if (channel === "dnd:dragenter") {
      dragCounter++;
      if (dragCounter === 1 && dragDropOverlay) {
        dragDropOverlay.classList.add("visible");
        for (const h of getAllWebviews()) {
          h.webview.style.pointerEvents = "none";
        }
      }
    } else if (channel === "dnd:dragleave") {
      dragCounter = Math.max(0, dragCounter - 1);
      if (dragCounter === 0 && dragDropOverlay) {
        dragDropOverlay.classList.remove("visible");
      }
    } else if (channel === "dnd:drop") {
      dragCounter = 0;
      if (dragDropOverlay) {
        dragDropOverlay.classList.remove("visible");
      }
      for (const h of getAllWebviews()) {
        h.webview.style.pointerEvents = "";
      }
    }
  }
  const singletonViewer = createWebview(
    "viewer",
    configs.viewer,
    panelViewer,
    handleDndMessage
  );
  singletonViewer.webview.style.display = "none";
  singletonViewer.webview.addEventListener("focus", () => {
    noteSurfaceFocus("viewer");
  });
  singletonViewer.setBeforeInput((event, detail) => {
    if (!isFocusSearchShortcut(detail)) return;
    event.preventDefault();
    handleShortcut("focus-search");
  });
  const singletonWebviews = {
    settings: createWebview(
      "settings",
      configs.settings,
      settingsModal,
      handleDndMessage
    )
  };
  singletonWebviews.settings.webview.addEventListener("focus", () => {
    noteSurfaceFocus("settings");
  });
  const panelManager = createPanelManager({
    panelNav,
    panelViewer,
    navResizeHandle,
    navToggle,
    getAllWebviews,
    onNavVisibilityChanged(visible) {
      if (visible) {
        requestAnimationFrame(() => {
          singletonViewer.send("nav-visibility", true);
        });
      } else {
        singletonViewer.send("nav-visibility", false);
      }
    }
  });
  panelManager.initPrefs(prefNavWidth, prefNavVisible);
  const workspaceManager = createWorkspaceManager({
    panelNav,
    workspaceMenuItems,
    workspaceTriggerParent,
    workspaceTriggerName,
    configs,
    createWebview,
    handleDndMessage,
    onNoteSurfaceFocus: noteSurfaceFocus,
    onSwitch(index) {
      window.shellApi.workspaceSwitch(index);
    },
    onApplyNavVisibility() {
      panelManager.applyNavVisibility();
    }
  });
  const tileManager = createTileManager({
    tileLayer,
    viewportState,
    configs,
    getAllWebviews,
    isSpaceHeld: () => spaceHeld,
    onSaveDebounced(state) {
      window.shellApi.canvasSaveState(state);
    },
    onSaveImmediate(state) {
      window.shellApi.canvasSaveState(state);
    },
    onNoteSurfaceFocus: noteSurfaceFocus,
    onFocusSurface: focusSurface
  });
  const edgeIndicators = createEdgeIndicators({
    canvasEl,
    edgeIndicatorsEl: document.getElementById("edge-indicators"),
    viewportState,
    getTiles: () => tiles,
    getTileDOMs: () => tileManager.getTileDOMs(),
    onViewportUpdate() {
      viewport.updateCanvas();
    }
  });
  const handleCanvasRpc = createCanvasRpc({
    tileManager,
    viewportState,
    viewport,
    workspaceManager
  });
  viewport.init(viewportState, () => {
    tileManager.repositionAllTiles();
    edgeIndicators.update();
    tileManager.saveCanvasDebounced();
  });
  edgeIndicators.update();
  function noteSurfaceFocus(surface) {
    if (settingsModalOpen && surface !== "settings") {
      focusSurface("settings");
      return;
    }
    if (activeSurface === "canvas-tile" && surface !== "canvas-tile") {
      tileManager.blurCanvasTileGuest();
    }
    activeSurface = surface;
    if (surface !== "settings") {
      lastNonModalSurface = surface;
    }
    const canvasOwned = surface === "canvas" || surface === "canvas-tile";
    canvasEl.classList.toggle("canvas-focused", canvasOwned);
    if (surface !== "canvas-tile") {
      tileManager.clearTileFocusRing();
    }
  }
  function isViewerVisible() {
    return singletonViewer.webview.style.display !== "none";
  }
  function resolveSurface(surface = lastNonModalSurface) {
    if (surface === "canvas-tile" && tileManager.getFocusedTileId()) {
      const dom = tileManager.getTileDOMs().get(tileManager.getFocusedTileId());
      if (dom && dom.webview) return "canvas-tile";
    }
    if (surface === "viewer" && !isViewerVisible()) {
      surface = null;
    }
    if (surface === "nav" && !(panelManager.isNavVisible() && workspaceManager.getActiveWorkspace())) {
      surface = null;
    }
    if (surface === "viewer") return "viewer";
    if (surface === "nav") return "nav";
    if (panelManager.isNavVisible() && workspaceManager.getActiveWorkspace()) return "nav";
    if (isViewerVisible()) return "viewer";
    return "canvas";
  }
  function focusSurface(surface = lastNonModalSurface) {
    if (surface === "canvas-tile" && tileManager.getFocusedTileId()) {
      const dom = tileManager.getTileDOMs().get(tileManager.getFocusedTileId());
      if (dom && dom.webview) {
        dom.webview.focus();
        noteSurfaceFocus("canvas-tile");
        return;
      }
    }
    requestAnimationFrame(() => {
      window.focus();
      if (surface === "settings") {
        singletonWebviews.settings.webview.focus();
        noteSurfaceFocus("settings");
        return;
      }
      const resolved = resolveSurface(surface);
      const workspace = workspaceManager.getActiveWorkspace();
      if (resolved === "nav" && workspace) {
        workspace.nav.webview.focus();
        noteSurfaceFocus("nav");
        return;
      }
      if (resolved === "viewer" && isViewerVisible()) {
        singletonViewer.webview.focus();
        noteSurfaceFocus("viewer");
        return;
      }
      canvasEl.focus();
      noteSurfaceFocus("canvas");
    });
  }
  function setUnderlyingShellInert(inert) {
    const panelsEl2 = document.getElementById("panels");
    panelsEl2.inert = inert;
    navToggle.inert = inert;
    workspaceTrigger.inert = inert;
    wsAddOption.inert = inert;
  }
  function blurNonModalSurfaces() {
    canvasEl.blur();
    navToggle.blur();
    workspaceTrigger.blur();
    singletonViewer.webview.blur();
    for (const ws of workspaceManager.getWorkspaces()) {
      ws.nav.webview.blur();
    }
  }
  function getAllWebviews() {
    const all = [];
    for (const wv of workspaceManager.getAllNavWebviews()) {
      all.push(wv);
    }
    all.push(singletonViewer);
    all.push(singletonWebviews.settings);
    for (const [, dom] of tileManager.getTileDOMs()) {
      if (dom.webview) {
        all.push({
          webview: dom.webview,
          send: (ch, ...args) => {
            if (dom.webview) dom.webview.send(ch, ...args);
          }
        });
      }
    }
    return all;
  }
  window.addEventListener("focus", () => {
    noteSurfaceFocus("shell");
  });
  canvasEl.addEventListener("focus", () => {
    noteSurfaceFocus("canvas");
  });
  canvasEl.classList.add("canvas-focused");
  canvasEl.addEventListener("dblclick", (e) => {
    if (spaceHeld || isPanning || Date.now() < suppressCanvasDblClickUntil) return;
    if (e.target !== canvasEl && e.target !== gridCanvas && e.target !== tileLayer) return;
    const rect = canvasEl.getBoundingClientRect();
    const screenX = e.clientX - rect.left;
    const screenY = e.clientY - rect.top;
    const cx = (screenX - viewportState.panX) / viewportState.zoom;
    const cy = (screenY - viewportState.panY) / viewportState.zoom;
    const ws = workspaceManager.getActiveWorkspace();
    const cwd = ws ? ws.path : void 0;
    const tile = tileManager.createCanvasTile(
      "term",
      cx,
      cy,
      { cwd }
    );
    tileManager.spawnTerminalWebview(tile, true);
    tileManager.saveCanvasImmediate();
  });
  canvasEl.addEventListener("contextmenu", async (e) => {
    if (e.target !== canvasEl && e.target !== gridCanvas && e.target !== tileLayer) return;
    e.preventDefault();
    const rect = canvasEl.getBoundingClientRect();
    const screenX = e.clientX - rect.left;
    const screenY = e.clientY - rect.top;
    const cx = (screenX - viewportState.panX) / viewportState.zoom;
    const cy = (screenY - viewportState.panY) / viewportState.zoom;
    const selected = await window.shellApi.showContextMenu([
      { id: "new-terminal", label: "New terminal tile" },
      { id: "new-browser", label: "New browser tile" }
    ]);
    if (selected === "new-terminal") {
      const ws = workspaceManager.getActiveWorkspace();
      const cwd = ws ? ws.path : void 0;
      const tile = tileManager.createCanvasTile(
        "term",
        cx,
        cy,
        { cwd }
      );
      tileManager.spawnTerminalWebview(tile, true);
      tileManager.saveCanvasImmediate();
    } else if (selected === "new-browser") {
      const tile = tileManager.createCanvasTile(
        "browser",
        cx,
        cy
      );
      tileManager.spawnBrowserWebview(tile, true);
      tileManager.saveCanvasImmediate();
    }
  });
  workspaceTrigger.addEventListener("click", () => {
    if (workspaceManager.isDropdownOpen()) {
      workspaceManager.closeDropdown();
    } else {
      workspaceManager.openDropdown();
    }
  });
  document.addEventListener("click", (e) => {
    if (!workspaceManager.isDropdownOpen()) return;
    const dropdown = document.getElementById("workspace-dropdown");
    if (!dropdown.contains(e.target)) {
      workspaceManager.closeDropdown();
    }
  });
  document.addEventListener("focusin", (event) => {
    if (!settingsModalOpen) return;
    if (settingsOverlay.contains(event.target)) return;
    focusSurface("settings");
  });
  wsAddOption.addEventListener("click", async () => {
    workspaceManager.closeDropdown();
    const result = await window.shellApi.workspaceAdd();
    if (!result) return;
    const { workspaces: wsList, active: active2 } = result;
    if (workspaceManager.getWorkspaces().length < wsList.length) {
      const newPath = wsList[wsList.length - 1];
      workspaceManager.addWorkspace(newPath);
    }
    workspaceManager.switchWorkspace(active2);
  });
  attachMarquee(canvasEl, {
    viewport: {
      get panX() {
        return viewportState.panX;
      },
      get panY() {
        return viewportState.panY;
      },
      get zoom() {
        return viewportState.zoom;
      }
    },
    tiles: () => tiles,
    onSelectionChange: (ids) => {
      if (shiftHeld) {
        for (const id of ids) selectTile(id);
      } else {
        clearSelection();
        for (const id of ids) selectTile(id);
      }
      tileManager.syncSelectionVisuals();
      if (ids.size === 0) {
        tileManager.blurCanvasTileGuest();
        tileManager.clearTileFocusRing();
        tileManager.setFocusedTileId(null);
        noteSurfaceFocus("canvas");
      }
    },
    isShiftHeld: () => shiftHeld,
    isSpaceHeld: () => spaceHeld,
    getAllWebviews
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && getSelectedTiles().length > 0) {
      clearSelection();
      tileManager.syncSelectionVisuals();
      return;
    }
    if ((e.key === "Backspace" || e.key === "Delete") && (activeSurface === "canvas" || activeSurface === "canvas-tile")) {
      const selected = getSelectedTiles();
      if (selected.length === 0) return;
      const count = selected.length;
      window.shellApi.showConfirmDialog({
        message: count === 1 ? "Delete this tile?" : `Delete ${count} tiles?`,
        detail: "This cannot be undone.",
        buttons: ["Cancel", "Delete"]
      }).then((response) => {
        if (response !== 1) return;
        for (const t of selected) {
          tileManager.closeCanvasTile(t.id);
        }
        clearSelection();
        tileManager.syncSelectionVisuals();
      });
    }
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Shift" && !shiftHeld) {
      shiftHeld = true;
      canvasEl.classList.add("shift-held");
    }
  });
  window.addEventListener("keyup", (e) => {
    if (e.key === "Shift") {
      shiftHeld = false;
      canvasEl.classList.remove("shift-held");
    }
  });
  window.addEventListener("blur", () => {
    if (shiftHeld) {
      shiftHeld = false;
      canvasEl.classList.remove("shift-held");
    }
  });
  window.addEventListener("keydown", (e) => {
    if (e.code === "Space" && !e.target.closest?.("webview")) {
      e.preventDefault();
      if (!e.repeat && !spaceHeld) {
        spaceHeld = true;
        canvasEl.classList.add("space-held");
        for (const h of getAllWebviews()) {
          h.webview.blur();
        }
      }
    }
  });
  window.addEventListener("keyup", (e) => {
    if (e.code === "Space") {
      spaceHeld = false;
      if (!isPanning) {
        canvasEl.classList.remove("space-held");
      }
    }
  });
  window.addEventListener("blur", () => {
    if (spaceHeld) {
      spaceHeld = false;
      canvasEl.classList.remove("space-held", "panning");
    }
  });
  canvasEl.addEventListener("mousedown", (e) => {
    const shouldPan = e.button === 1 || e.button === 0 && spaceHeld;
    if (!shouldPan) return;
    e.preventDefault();
    suppressCanvasDblClickUntil = Date.now() + CANVAS_DBLCLICK_SUPPRESS_MS;
    isPanning = true;
    canvasEl.classList.add("panning");
    const startMX = e.clientX;
    const startMY = e.clientY;
    const startPanX = viewportState.panX;
    const startPanY = viewportState.panY;
    for (const h of getAllWebviews()) {
      h.webview.style.pointerEvents = "none";
    }
    function onMove(ev) {
      viewportState.panX = startPanX + (ev.clientX - startMX);
      viewportState.panY = startPanY + (ev.clientY - startMY);
      viewport.updateCanvas();
    }
    function onUp() {
      isPanning = false;
      canvasEl.classList.remove("panning");
      if (!spaceHeld) {
        canvasEl.classList.remove("space-held");
      }
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      for (const h of getAllWebviews()) {
        h.webview.style.pointerEvents = "";
      }
    }
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  });
  function focusActiveNavSearch() {
    const workspace = workspaceManager.getActiveWorkspace();
    if (!workspace) return;
    focusSurface("nav");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        workspace.nav.send("focus-search");
      });
    });
  }
  function handleShortcut(action) {
    if (settingsModalOpen && action !== "toggle-settings") {
      focusSurface("settings");
      return;
    }
    if (action === "toggle-settings") {
      window.shellApi.toggleSettings();
    } else if (action === "toggle-nav") {
      panelManager.toggleNav();
    } else if (action === "close-tab") {
      const idx = workspaceManager.getActiveIndex();
      if (idx >= 0) {
        workspaceManager.removeWorkspace(idx);
      }
    } else if (action === "focus-search") {
      if (workspaceManager.getActiveWorkspace()) {
        if (!panelManager.isNavVisible()) {
          panelManager.setNavVisible(true);
        }
        focusActiveNavSearch();
      }
    } else if (action === "add-workspace") {
      wsAddOption.click();
    } else if (action.startsWith("switch-tab-")) {
      const idx = parseInt(action.slice(11), 10) - 1;
      if (idx >= 0 && idx < workspaceManager.getWorkspaces().length) {
        workspaceManager.switchWorkspace(idx);
      }
    }
  }
  window.shellApi.onShortcut(handleShortcut);
  window.addEventListener("keydown", (event) => {
    if (!isFocusSearchShortcut(event)) return;
    event.preventDefault();
    handleShortcut("focus-search");
  });
  window.shellApi.onBrowserTileFocusUrl((webContentsId) => {
    for (const [, dom] of tileManager.getTileDOMs()) {
      if (!dom.webview || !dom.urlInput) continue;
      if (dom.webview.getWebContentsId() === webContentsId) {
        dom.urlInput.readOnly = false;
        dom.urlInput.focus();
        dom.urlInput.select();
        break;
      }
    }
  });
  window.shellApi.onForwardToWebview(
    (target, channel, ...args) => {
      if (target === "settings") {
        singletonWebviews.settings.send(channel, ...args);
      } else if (target === "nav") {
        const ws = workspaceManager.getActiveWorkspace();
        if (ws) ws.nav.send(channel, ...args);
      } else if (target === "viewer" || target.startsWith("viewer:")) {
        if (channel === "file-selected") {
          const hasSelectedFile = !!args[0];
          if (!hasSelectedFile) {
            singletonViewer.webview.blur();
          }
          singletonViewer.webview.style.display = hasSelectedFile ? "" : "none";
          if (!hasSelectedFile) {
            focusSurface(lastNonModalSurface);
          }
        }
        if (channel === "file-renamed") {
          tileManager.updateTileForRename(
            args[0],
            args[1]
          );
        }
        if (channel === "files-deleted") {
          tileManager.closeTilesForDeletedPaths(args[0]);
        }
        if (channel !== "workspace-changed") {
          singletonViewer.send(channel, ...args);
        }
        if (channel === "fs-changed" || channel === "file-renamed" || channel === "wikilinks-updated" || channel.startsWith("agent:") || channel === "replay:data") {
          tileManager.broadcastToTileWebviews(
            channel,
            ...args
          );
        }
      } else if (target === "canvas") {
        if (channel === "open-terminal") {
          const cwd = args[0];
          const size = defaultSize("term");
          const rect = canvasEl.getBoundingClientRect();
          const cx = (rect.width / 2 - viewportState.panX) / viewportState.zoom - size.width / 2;
          const cy = (rect.height / 2 - viewportState.panY) / viewportState.zoom - size.height / 2;
          const tile = tileManager.createCanvasTile(
            "term",
            cx,
            cy,
            { cwd }
          );
          tileManager.spawnTerminalWebview(tile, true);
          tileManager.saveCanvasImmediate();
        }
        if (channel === "open-browser-tile") {
          const url = args[0];
          const sourceWcId = args[1];
          let srcTile = null;
          for (const [id, d] of tileManager.getTileDOMs()) {
            if (d.webview && d.webview.getWebContentsId() === sourceWcId) {
              srcTile = getTile(id);
              break;
            }
          }
          const x = srcTile ? srcTile.x + 40 : 0;
          const y = srcTile ? srcTile.y + 40 : 0;
          const extra = { url };
          if (srcTile) {
            extra.width = srcTile.width;
            extra.height = srcTile.height;
          }
          const newTile = tileManager.createCanvasTile(
            "browser",
            x,
            y,
            extra
          );
          tileManager.spawnBrowserWebview(newTile, true);
          tileManager.saveCanvasImmediate();
        }
        if (channel === "create-graph-tile") {
          /* graph tile disabled - no-op */
        }
      }
    }
  );
  window.shellApi.onCanvasPinch((deltaY) => {
    const rect = canvasEl.getBoundingClientRect();
    viewport.applyZoom(
      deltaY,
      rect.width / 2,
      rect.height / 2
    );
  });
  window.shellApi.onCanvasRpcRequest(handleCanvasRpc);
  panelManager.setupResize(() => {
    panelManager.updateTogglePositions();
  });
  const panelsEl = document.getElementById("panels");
  new ResizeObserver(() => {
    panelManager.updateTogglePositions();
  }).observe(panelsEl);
  navToggle.addEventListener("click", () => {
    panelManager.toggleNav();
  });
  settingsBackdrop.addEventListener("click", () => {
    window.shellApi.closeSettings();
  });
  window.shellApi.onSettingsToggle((action) => {
    const open = action === "open";
    settingsModalOpen = open;
    if (open) {
      blurNonModalSurfaces();
    } else {
      singletonWebviews.settings.webview.blur();
    }
    setUnderlyingShellInert(open);
    settingsOverlay.classList.toggle("visible", open);
    if (open) {
      focusSurface("settings");
      return;
    }
    focusSurface(lastNonModalSurface);
  });
  let updateState = { status: "idle" };
  function renderUpdatePill() {
    const st = updateState.status;
    const pill = titlebarUpdatePill;
    if (updatePill) updatePill.style.display = "none";
    if (!pill) return;
    pill.classList.remove("is-downloading", "is-ready", "is-error");
    if (st === "available" || st === "downloading" || st === "ready" || st === "error") {
      pill.style.display = "";
      pill.disabled = (st === "downloading");
      if (st === "available") {
        pill.textContent = "v" + (updateState.version || "") + " 公開中";
        pill.title = "クリックしてGitHub Releasesを開く";
      } else if (st === "downloading") {
        pill.classList.add("is-downloading");
        pill.textContent = "ダウンロード中 " + (updateState.progress || 0) + "%";
        pill.title = "ダウンロード中...";
      } else if (st === "ready") {
        pill.classList.add("is-ready");
        pill.textContent = "再起動してアップデート";
        pill.title = "クリックして再起動・インストール";
      } else if (st === "error") {
        pill.classList.add("is-error");
        pill.textContent = "アップデートエラー";
        pill.title = updateState.error || "失敗しました。クリックでリトライ";
      }
    } else {
      pill.style.display = "none";
    }
  }
  window.shellApi.onUpdateStatus((s) => {
    updateState = s;
    renderUpdatePill();
  });
  window.shellApi.updateGetStatus().then((s) => {
    updateState = s;
    renderUpdatePill();
  }).catch(() => {});
  function handleUpdatePillClick() {
    if (updateState.status === "downloading" || updateState.status === "installing") return;
    if (updateState.status === "available") {
      window.open("https://github.com/Dezainaz-Inc/d-terminal/releases/latest", "_blank");
    } else if (updateState.status === "ready") {
      window.shellApi.updateInstall();
    } else if (updateState.status === "error") {
      updateState = { status: "idle" };
      renderUpdatePill();
    }
  }
  updatePill.addEventListener("click", handleUpdatePillClick);
  if (titlebarUpdatePill) titlebarUpdatePill.addEventListener("click", handleUpdatePillClick);
  window.shellApi.onLoadingStatus((message) => {
    loadingStatusEl.textContent = message;
  });
  window.shellApi.onLoadingDone(() => {
    loadingOverlay.classList.add("fade-out");
    setTimeout(() => {
      loadingOverlay.remove();
    }, 350);
  });
  window.addEventListener("dragenter", (e) => {
    e.preventDefault();
    dragCounter++;
    if (dragCounter === 1 && dragDropOverlay) {
      dragDropOverlay.classList.add("visible");
    }
  });
  window.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  window.addEventListener("dragleave", (e) => {
    e.preventDefault();
    dragCounter = Math.max(0, dragCounter - 1);
    if (dragCounter === 0 && dragDropOverlay) {
      dragDropOverlay.classList.remove("visible");
    }
  });
  window.addEventListener("drop", async (e) => {
    e.preventDefault();
    dragCounter = 0;
    if (dragDropOverlay) {
      dragDropOverlay.classList.remove("visible");
    }
    const rect = canvasEl.getBoundingClientRect();
    const screenX = e.clientX - rect.left;
    const screenY = e.clientY - rect.top;
    const cx = (screenX - viewportState.panX) / viewportState.zoom;
    const cy = (screenY - viewportState.panY) / viewportState.zoom;
    let paths = [];
    if (window.shellApi.getDragPaths) {
      try {
        paths = await window.shellApi.getDragPaths();
      } catch {
      }
    }
    if (paths.length === 0 && e.dataTransfer?.files) {
      for (let i = 0; i < e.dataTransfer.files.length; i++) {
        const p = e.dataTransfer.files[i].path;
        if (p) paths.push(p);
      }
    }
    if (paths.length === 0) return;
    const viewerRect = panelViewer.getBoundingClientRect();
    if (e.clientX < viewerRect.left) return;
    for (let i = 0; i < paths.length; i++) {
      const filePath = paths[i];
      const type = inferTileType(filePath);
      tileManager.createFileTile(
        type,
        cx + i * 30,
        cy + i * 30,
        filePath
      );
    }
  });
  if (dragDropOverlay) {
    dragDropOverlay.addEventListener("transitionend", () => {
      if (!dragDropOverlay.classList.contains("visible")) {
        for (const h of getAllWebviews()) {
          h.webview.style.pointerEvents = "";
        }
      }
    });
  }
  const savedState = await window.shellApi.canvasLoadState();
  if (savedState) {
    viewportState.panX = savedState.viewport.panX;
    viewportState.panY = savedState.viewport.panY;
    viewportState.zoom = savedState.viewport.zoom;
    viewport.updateCanvas();
    tileManager.restoreCanvasState(savedState.tiles);
  }
  const { workspaces: wsPaths, active } = workspaceData;
  for (const path of wsPaths) {
    workspaceManager.addWorkspace(path);
  }
  if (workspaceManager.getWorkspaces().length === 0) {
    workspaceManager.showEmptyState();
  } else if (active >= 0 && active < workspaceManager.getWorkspaces().length) {
    workspaceManager.switchWorkspace(active);
  } else if (workspaceManager.getWorkspaces().length > 0) {
    workspaceManager.switchWorkspace(0);
  }
  panelManager.applyNavVisibility();
  window.addEventListener("beforeunload", () => {
    tileManager.saveCanvasImmediate();
  });
}
init();
