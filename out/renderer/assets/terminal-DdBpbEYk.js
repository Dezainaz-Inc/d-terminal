import { r as reactExports, j as jsxRuntimeExports, R as ReactDOM, N } from "./client-BHfaboi_.js";
import { i as initDarkMode } from "./dark-mode-LJlL8nTc.js";
/* empty css               */
import { T as TerminalTab } from "./TerminalTab-rK7THVkz.js";
import { A as AnalyticsProvider } from "./PostHogProvider-DsyZSx7Q.js";
function estimateTermSize() {
  const CHAR_WIDTH = 7.22;
  const CELL_HEIGHT = 17;
  const w = document.documentElement.clientWidth;
  const h = document.documentElement.clientHeight;
  return {
    cols: Math.max(80, Math.floor(w / CHAR_WIDTH)),
    rows: Math.max(24, Math.floor(h / CELL_HEIGHT))
  };
}
function App() {
  const [sessions, setSessions] = reactExports.useState([]);
  const [activeId, setActiveId] = reactExports.useState(null);
  const [workspacePath, setWorkspacePath] = reactExports.useState(null);
  const sessionsRef = reactExports.useRef(sessions);
  sessionsRef.current = sessions;
  const activeIdRef = reactExports.useRef(activeId);
  activeIdRef.current = activeId;
  const createTab = reactExports.useCallback(async () => {
    const config = await window.api.getConfig();
    const cwd = config?.workspaces?.[config?.active_workspace] || void 0;
    const { cols, rows } = estimateTermSize();
    const result = await window.api.ptyCreate(cwd, cols, rows);
    const shellName = result.shell.split("/").pop() || "shell";
    const session = {
      id: result.sessionId,
      title: shellName,
      shellName
    };
    setSessions((prev) => [...prev, session]);
    setActiveId(result.sessionId);
    return session;
  }, []);
  const closeTab = reactExports.useCallback(
    async (id) => {
      await window.api.ptyKill(id);
      setSessions((prev) => {
        const next = prev.filter((s) => s.id !== id);
        if (activeId === id && next.length > 0) {
          setActiveId(next[next.length - 1].id);
        } else if (next.length === 0) {
          setActiveId(null);
        }
        return next;
      });
    },
    [activeId]
  );
  reactExports.useEffect(() => {
    const handleExit = (payload) => {
      setSessions((prev) => {
        const next = prev.filter(
          (s) => s.id !== payload.sessionId
        );
        if (activeId === payload.sessionId && next.length > 0) {
          setActiveId(next[next.length - 1].id);
        } else if (next.length === 0) {
          setActiveId(null);
        }
        return next;
      });
    };
    window.api.onPtyExit(handleExit);
    return () => window.api.offPtyExit(handleExit);
  }, [activeId]);
  const pendingTab = reactExports.useRef(null);
  const ensureTab = reactExports.useCallback(async () => {
    const id = activeIdRef.current;
    const found = id ? sessionsRef.current.find((s) => s.id === id) : null;
    if (found) return found;
    if (!pendingTab.current) {
      pendingTab.current = (async () => {
        const session = await createTab();
        await new Promise((resolve) => {
          const onData = (p) => {
            if (p.sessionId === session.id) {
              window.api.offPtyData(onData);
              resolve();
            }
          };
          window.api.onPtyData(onData);
        });
        return session;
      })();
    }
    return pendingTab.current;
  }, [createTab]);
  reactExports.useEffect(() => {
    if (activeId) pendingTab.current = null;
  }, [activeId]);
  const didInit = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;
    ensureTab();
    window.api.getConfig().then((cfg) => {
      const wp = cfg?.workspaces?.[cfg?.active_workspace];
      if (wp) setWorkspacePath(wp);
    });
  }, [ensureTab]);
  reactExports.useEffect(() => {
    const onKeyDown = (e) => {
      if (!e.metaKey) return;
      if (e.key === "t") {
        e.preventDefault();
        createTab();
        return;
      }
      if (e.key === "w") {
        e.preventDefault();
        const id = activeIdRef.current;
        if (id) closeTab(id);
        return;
      }
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= 9) {
        e.preventDefault();
        const idx = num - 1;
        const target = sessionsRef.current[idx];
        if (target) setActiveId(target.id);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [createTab, closeTab]);
  const cdBusy = reactExports.useRef(false);
  reactExports.useEffect(() => {
    const handleCdTo = async (path) => {
      if (cdBusy.current) return;
      cdBusy.current = true;
      try {
        const session = await ensureTab();
        const escaped = path.replace(/'/g, "'\\''");
        const cmd = `cd '${escaped}'`;
        const fg = await window.api.ptyForegroundProcess(session.id);
        const isShellIdle = fg === session.shellName;
        const text = isShellIdle ? `${cmd}\r` : `!${cmd}\r`;
        for (const ch of text) {
          window.api.ptyWrite(session.id, ch);
          await new Promise((r) => setTimeout(r, 5));
        }
      } finally {
        cdBusy.current = false;
      }
    };
    window.api.onCdTo(handleCdTo);
    return () => window.api.offCdTo(handleCdTo);
  }, [ensureTab]);
  const lastRunMs = reactExports.useRef(0);
  const handleRunInTerminal = reactExports.useCallback(
    async (command) => {
      const now = Date.now();
      if (now - lastRunMs.current < 50) return;
      lastRunMs.current = now;
      const session = await createTab();
      const alive = () => sessionsRef.current.some((s) => s.id === session.id);
      const ready = await new Promise((resolve) => {
        const onData = (p) => {
          if (p.sessionId === session.id) {
            cleanup();
            resolve(true);
          }
        };
        const onExit = (p) => {
          if (p.sessionId === session.id) {
            cleanup();
            resolve(false);
          }
        };
        const cleanup = () => {
          window.api.offPtyData(onData);
          window.api.offPtyExit(onExit);
        };
        window.api.onPtyData(onData);
        window.api.onPtyExit(onExit);
      });
      if (!ready) return;
      const fullCmd = `${command}\r`;
      for (const ch of fullCmd) {
        if (!alive()) return;
        window.api.ptyWrite(session.id, ch);
        await new Promise((r) => setTimeout(r, 5));
      }
    },
    [createTab]
  );
  reactExports.useEffect(() => {
    window.api.onRunInTerminal(handleRunInTerminal);
    return () => window.api.offRunInTerminal(handleRunInTerminal);
  }, [handleRunInTerminal]);
  reactExports.useEffect(() => {
    return window.api.onFocusTab((ptySessionId) => {
      const found = sessionsRef.current.find(
        (s) => s.id === ptySessionId
      );
      if (found) {
        setActiveId(found.id);
      }
    });
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "terminal-app", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tab-bar", children: [
      sessions.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `tab ${s.id === activeId ? "active" : ""}`,
          onClick: () => setActiveId(s.id),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tab-title", children: s.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                className: "tab-close",
                onClick: (e) => {
                  e.stopPropagation();
                  closeTab(s.id);
                },
                children: "×"
              }
            )
          ]
        },
        s.id
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "tab-new", onClick: createTab, children: "+" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "terminal-container", children: sessions.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      TerminalTab,
      {
        sessionId: s.id,
        visible: s.id === activeId
      },
      s.id
    )) })
  ] });
}
initDarkMode();
ReactDOM.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(N.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnalyticsProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) }) })
);
