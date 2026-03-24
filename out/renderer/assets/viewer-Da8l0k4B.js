const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./App-DjVLpUQl.js","./client-BHfaboi_.js","./image-D9HZFqAz.js","./WorkspaceGraph-x3Z9DR66.js","./WorkspaceGraph-DpA0DDeH.css","./FileImage-C8tV4xLO.js","./IconBase-CnDS-9Zs.js","./FileImage-Dy8raC9P.css","./App-DCCKdu-F.css"])))=>i.map(i=>d[i]);
import { c as clientExports, j as jsxRuntimeExports } from "./client-BHfaboi_.js";
import { i as initDarkMode } from "./dark-mode-LJlL8nTc.js";
import { A as AnalyticsProvider } from "./PostHogProvider-DsyZSx7Q.js";
const scriptRel = /* @__PURE__ */ (function detectScriptRel() {
  const relList = typeof document !== "undefined" && document.createElement("link").relList;
  return relList && relList.supports && relList.supports("modulepreload") ? "modulepreload" : "preload";
})();
const assetsURL = function(dep, importerUrl) {
  return new URL(dep, importerUrl).href;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  let promise = Promise.resolve();
  if (deps && deps.length > 0) {
    let allSettled = function(promises$2) {
      return Promise.all(promises$2.map((p) => Promise.resolve(p).then((value$1) => ({
        status: "fulfilled",
        value: value$1
      }), (reason) => ({
        status: "rejected",
        reason
      }))));
    };
    const links = document.getElementsByTagName("link");
    const cspNonceMeta = document.querySelector("meta[property=csp-nonce]");
    const cspNonce = cspNonceMeta?.nonce || cspNonceMeta?.getAttribute("nonce");
    promise = allSettled(deps.map((dep) => {
      dep = assetsURL(dep, importerUrl);
      if (dep in seen) return;
      seen[dep] = true;
      const isCss = dep.endsWith(".css");
      const cssSelector = isCss ? '[rel="stylesheet"]' : "";
      if (!!importerUrl) for (let i$1 = links.length - 1; i$1 >= 0; i$1--) {
        const link$1 = links[i$1];
        if (link$1.href === dep && (!isCss || link$1.rel === "stylesheet")) return;
      }
      else if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) return;
      const link = document.createElement("link");
      link.rel = isCss ? "stylesheet" : scriptRel;
      if (!isCss) link.as = "script";
      link.crossOrigin = "";
      link.href = dep;
      if (cspNonce) link.setAttribute("nonce", cspNonce);
      document.head.appendChild(link);
      if (isCss) return new Promise((res, rej) => {
        link.addEventListener("load", res);
        link.addEventListener("error", () => rej(/* @__PURE__ */ new Error(`Unable to preload CSS for ${dep}`)));
      });
    }));
  }
  function handlePreloadError(err$2) {
    const e$1 = new Event("vite:preloadError", { cancelable: true });
    e$1.payload = err$2;
    window.dispatchEvent(e$1);
    if (!e$1.defaultPrevented) throw err$2;
  }
  return promise.then((res) => {
    for (const item of res || []) {
      if (item.status !== "rejected") continue;
      handlePreloadError(item.reason);
    }
    return baseModule().catch(handlePreloadError);
  });
};
const originalWarn = console.warn.bind(console);
console.warn = (...args) => {
  if (typeof args[0] === "string" && args[0].startsWith("linkifyjs:")) {
    return;
  }
  originalWarn(...args);
};
async function bootstrap() {
  const { default: App } = await __vitePreload(async () => {
    const { default: App2 } = await import("./App-DjVLpUQl.js").then((n) => n.A);
    return { default: App2 };
  }, true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8]) : void 0, import.meta.url);
  initDarkMode();
  const root = document.getElementById("root");
  if (!root) throw new Error("Missing #root element");
  clientExports.createRoot(root).render(
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnalyticsProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
  );
}
void bootstrap();
export {
  __vitePreload as _
};
