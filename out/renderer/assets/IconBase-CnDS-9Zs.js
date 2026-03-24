import { r as reactExports, N } from "./client-BHfaboi_.js";
const o = reactExports.createContext({
  color: "currentColor",
  size: "1em",
  weight: "regular",
  mirrored: false
});
var y = Object.defineProperty;
var c = Object.getOwnPropertySymbols;
var f = Object.prototype.hasOwnProperty, g = Object.prototype.propertyIsEnumerable;
var d = (t, o2, e) => o2 in t ? y(t, o2, { enumerable: true, configurable: true, writable: true, value: e }) : t[o2] = e, l = (t, o2) => {
  for (var e in o2 || (o2 = {}))
    f.call(o2, e) && d(t, e, o2[e]);
  if (c)
    for (var e of c(o2))
      g.call(o2, e) && d(t, e, o2[e]);
  return t;
};
var a = (t, o2) => {
  var e = {};
  for (var r in t)
    f.call(t, r) && o2.indexOf(r) < 0 && (e[r] = t[r]);
  if (t != null && c)
    for (var r of c(t))
      o2.indexOf(r) < 0 && g.call(t, r) && (e[r] = t[r]);
  return e;
};
const h = reactExports.forwardRef((t, o$1) => {
  const m = t, {
    alt: e,
    color: r,
    size: n,
    weight: s,
    mirrored: p,
    children: u,
    weights: C
  } = m, v = a(m, [
    "alt",
    "color",
    "size",
    "weight",
    "mirrored",
    "children",
    "weights"
  ]), x = reactExports.useContext(o), {
    color: B = "currentColor",
    size: i,
    weight: I = "regular",
    mirrored: E = false
  } = x, R = a(x, [
    "color",
    "size",
    "weight",
    "mirrored"
  ]);
  return /* @__PURE__ */ N.createElement(
    "svg",
    l(l({
      ref: o$1,
      xmlns: "http://www.w3.org/2000/svg",
      width: n != null ? n : i,
      height: n != null ? n : i,
      fill: r != null ? r : B,
      viewBox: "0 0 256 256",
      transform: p || E ? "scale(-1, 1)" : void 0
    }, R), v),
    !!e && /* @__PURE__ */ N.createElement("title", null, e),
    u,
    C.get(s != null ? s : I)
  );
});
h.displayName = "IconBase";
const b = h;
export {
  b
};
