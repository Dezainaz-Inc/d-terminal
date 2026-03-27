import { r as reactExports, j as jsxRuntimeExports, c as clientExports } from "./client-BHfaboi_.js";
import { T as TerminalTab } from "./TerminalTab-rK7THVkz.js";
function estimateTermSize() {
  const CHAR_WIDTH = 7.22;
  const CELL_HEIGHT = 17;
  const w = document.documentElement.clientWidth;
  const h = document.documentElement.clientHeight - 40;
  return {
    cols: Math.max(80, Math.floor(w / CHAR_WIDTH)),
    rows: Math.max(24, Math.floor(h / CELL_HEIGHT))
  };
}
function InputBar({ sessionId }) {
  const [value, setValue] = reactExports.useState("");
  const [history, setHistory] = reactExports.useState([]);
  const [historyIndex, setHistoryIndex] = reactExports.useState(-1);
  const textareaRef = reactExports.useRef(null);
  const send = reactExports.useCallback(() => {
    const text = value;
    if (!text) return;
    window.api.ptySendRawKeys(sessionId, text);
    window.api.ptyWrite(sessionId, "\r");
    setHistory((prev) => {
      const next = [...prev, text];
      if (next.length > 100) next.shift();
      return next;
    });
    setValue("");
    setHistoryIndex(-1);
    if (textareaRef.current) {
      textareaRef.current.value = "";
      textareaRef.current.style.height = "auto";
    }
  }, [sessionId, value]);
  const onKeyDown = reactExports.useCallback((e) => {
    if (e.key === "Enter" && !e.shiftKey && !e.isComposing && e.keyCode !== 229) {
      e.preventDefault();
      send();
      return;
    }
    if (e.key === "ArrowUp" && !e.shiftKey && value === "") {
      e.preventDefault();
      if (history.length === 0) return;
      const newIdx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIdx);
      setValue(history[newIdx]);
      return;
    }
    if (e.key === "ArrowDown" && !e.shiftKey && historyIndex !== -1) {
      e.preventDefault();
      if (historyIndex >= history.length - 1) {
        setHistoryIndex(-1);
        setValue("");
      } else {
        const newIdx = historyIndex + 1;
        setHistoryIndex(newIdx);
        setValue(history[newIdx]);
      }
      return;
    }
  }, [send, value, history, historyIndex]);
  const onInput = reactExports.useCallback((e) => {
    setValue(e.target.value);
    setHistoryIndex(-1);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 100) + "px";
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
    className: "input-bar",
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", {
        ref: textareaRef,
        className: "input-bar-textarea",
        value,
        onChange: onInput,
        onKeyDown,
        placeholder: "Type command here... (Enter to send)",
        rows: 1,
        spellCheck: false
      }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", {
        className: "input-bar-send",
        onClick: send,
        title: "Send (Enter)",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", {
          width: "14",
          height: "14",
          viewBox: "0 0 16 16",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M5 12L12 8 5 4v3.2L9 8l-4 .8z" })
        })
      })
    ]
  });
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
    className: "terminal-tile-wrapper",
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
        className: "terminal-tile-term",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          TerminalTab,
          {
            sessionId,
            visible: true,
            restored,
            scrollbackData
          }
        )
      }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(InputBar, { sessionId })
    ]
  });
}
const root = document.getElementById("root");
if (root) {
  clientExports.createRoot(root).render(/* @__PURE__ */ jsxRuntimeExports.jsx(App, {}));
}
