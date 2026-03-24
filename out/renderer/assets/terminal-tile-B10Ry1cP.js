import { r as reactExports, j as jsxRuntimeExports, c as clientExports } from "./client-BHfaboi_.js";
import { T as TerminalTab } from "./TerminalTab-rK7THVkz.js";
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
  const [sessionId, setSessionId] = reactExports.useState(
    null
  );
  const [exited, setExited] = reactExports.useState(false);
  const [restored, setRestored] = reactExports.useState(false);
  const [scrollbackData, setScrollbackData] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const params = new URLSearchParams(
      window.location.search
    );
    const existingSessionId = params.get("sessionId");
    const isRestored = params.get("restored") === "1";
    const cwd = params.get("cwd") || void 0;
    if (isRestored && existingSessionId) {
      setRestored(true);
      const { cols: cols2, rows: rows2 } = estimateTermSize();
      window.api.ptyReconnect(existingSessionId, cols2, rows2).then((result) => {
        if (result.scrollback) {
          setScrollbackData(result.scrollback);
        }
        setSessionId(existingSessionId);
      }).catch(() => {
        setRestored(false);
        const est = estimateTermSize();
        window.api.ptyCreate(cwd, est.cols, est.rows).then((result) => {
          setSessionId(result.sessionId);
          window.api.notifyPtySessionId(
            result.sessionId
          );
        }).catch(() => {
          setExited(true);
        });
      });
      return;
    }
    if (existingSessionId) {
      setSessionId(existingSessionId);
      return;
    }
    const { cols, rows } = estimateTermSize();
    window.api.ptyCreate(cwd, cols, rows).then((result) => {
      setSessionId(result.sessionId);
      window.api.notifyPtySessionId(result.sessionId);
    }).catch(() => {
      setExited(true);
    });
  }, []);
  reactExports.useEffect(() => {
    if (!sessionId) return;
    const handleExit = (payload) => {
      if (payload.sessionId === sessionId) {
        setExited(true);
      }
    };
    window.api.onPtyExit(handleExit);
    return () => window.api.offPtyExit(handleExit);
  }, [sessionId]);
  reactExports.useEffect(() => {
    if (!sessionId) return;
    let lastCwd = "";
    const pollCwd = async () => {
      try {
        const cwd = await window.api.ptyGetCwd(sessionId);
        if (cwd && cwd !== lastCwd) {
          lastCwd = cwd;
          window.api.notifyPtyCwd(cwd);
        }
      } catch {}
    };
    pollCwd();
    const interval = setInterval(pollCwd, 2000);
    return () => clearInterval(interval);
  }, [sessionId]);
  if (exited) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "terminal-tile-exited", children: "Session ended" });
  }
  if (!sessionId) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "terminal-tile-loading", children: "Connecting..." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    TerminalTab,
    {
      sessionId,
      visible: true,
      restored,
      scrollbackData
    }
  );
}
const root = document.getElementById("root");
if (root) {
  clientExports.createRoot(root).render(/* @__PURE__ */ jsxRuntimeExports.jsx(App, {}));
}
