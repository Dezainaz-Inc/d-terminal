import { r as reactExports, N as N$1, j as jsxRuntimeExports } from "./client-BHfaboi_.js";
var t = "undefined" != typeof window ? window : void 0, i = "undefined" != typeof globalThis ? globalThis : t;
"undefined" == typeof self && (i.self = i), "undefined" == typeof File && (i.File = function() {
});
var e = Array.prototype, r = e.forEach, s = e.indexOf, n = null == i ? void 0 : i.navigator, o = null == i ? void 0 : i.document, a = null == i ? void 0 : i.location, l = null == i ? void 0 : i.fetch, u = null != i && i.XMLHttpRequest && "withCredentials" in new i.XMLHttpRequest() ? i.XMLHttpRequest : void 0, h = null == i ? void 0 : i.AbortController, d = null == n ? void 0 : n.userAgent, v = null != t ? t : {}, c = "1.363.1", f = { DEBUG: false, LIB_VERSION: c, LIB_NAME: "web", JS_SDK_VERSION: c };
function p(t2, i2, e2, r2, s2, n2, o2) {
  try {
    var a2 = t2[n2](o2), l2 = a2.value;
  } catch (t3) {
    return void e2(t3);
  }
  a2.done ? i2(l2) : Promise.resolve(l2).then(r2, s2);
}
function _(t2) {
  return function() {
    var i2 = this, e2 = arguments;
    return new Promise((function(r2, s2) {
      var n2 = t2.apply(i2, e2);
      function o2(t3) {
        p(n2, r2, s2, o2, a2, "next", t3);
      }
      function a2(t3) {
        p(n2, r2, s2, o2, a2, "throw", t3);
      }
      o2(void 0);
    }));
  };
}
function g() {
  return g = Object.assign ? Object.assign.bind() : function(t2) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var e2 = arguments[i2];
      for (var r2 in e2) ({}).hasOwnProperty.call(e2, r2) && (t2[r2] = e2[r2]);
    }
    return t2;
  }, g.apply(null, arguments);
}
function m(t2, i2) {
  if (null == t2) return {};
  var e2 = {};
  for (var r2 in t2) if ({}.hasOwnProperty.call(t2, r2)) {
    if (-1 !== i2.indexOf(r2)) continue;
    e2[r2] = t2[r2];
  }
  return e2;
}
var b = ["$snapshot", "$pageview", "$pageleave", "$set", "survey dismissed", "survey sent", "survey shown", "$identify", "$groupidentify", "$create_alias", "$$client_ingestion_warning", "$web_experiment_applied", "$feature_enrollment_update", "$feature_flag_called"], y = ["amazonbot", "amazonproductbot", "app.hypefactors.com", "applebot", "archive.org_bot", "awariobot", "backlinksextendedbot", "baiduspider", "bingbot", "bingpreview", "chrome-lighthouse", "dataforseobot", "deepscan", "duckduckbot", "facebookexternal", "facebookcatalog", "http://yandex.com/bots", "hubspot", "ia_archiver", "leikibot", "linkedinbot", "meta-externalagent", "mj12bot", "msnbot", "nessus", "petalbot", "pinterest", "prerender", "rogerbot", "screaming frog", "sebot-wa", "sitebulb", "slackbot", "slurp", "trendictionbot", "turnitin", "twitterbot", "vercel-screenshot", "vercelbot", "yahoo! slurp", "yandexbot", "zoombot", "bot.htm", "bot.php", "(bot;", "bot/", "crawler", "ahrefsbot", "ahrefssiteaudit", "semrushbot", "siteauditbot", "splitsignalbot", "gptbot", "oai-searchbot", "chatgpt-user", "perplexitybot", "better uptime bot", "sentryuptimebot", "uptimerobot", "headlesschrome", "cypress", "google-hoteladsverifier", "adsbot-google", "apis-google", "duplexweb-google", "feedfetcher-google", "google favicon", "google web preview", "google-read-aloud", "googlebot", "googleother", "google-cloudvertexbot", "googleweblight", "mediapartners-google", "storebot-google", "google-inspectiontool", "bytespider"], w = function(t2, i2) {
  if (void 0 === i2 && (i2 = []), !t2) return false;
  var e2 = t2.toLowerCase();
  return y.concat(i2).some(((t3) => {
    var i3 = t3.toLowerCase();
    return -1 !== e2.indexOf(i3);
  }));
};
function E(t2, i2) {
  return -1 !== t2.indexOf(i2);
}
var S = function(t2) {
  return t2.trim();
}, x = function(t2) {
  return t2.replace(/^\$/, "");
};
var k = Array.isArray, P = Object.prototype, T = P.hasOwnProperty, R = P.toString, I = k || function(t2) {
  return "[object Array]" === R.call(t2);
}, C = (t2) => "function" == typeof t2, O = (t2) => t2 === Object(t2) && !I(t2), F = (t2) => {
  if (O(t2)) {
    for (var i2 in t2) if (T.call(t2, i2)) return false;
    return true;
  }
  return false;
}, M = (t2) => void 0 === t2, A = (t2) => "[object String]" == R.call(t2), D = (t2) => A(t2) && 0 === t2.trim().length, j = (t2) => null === t2, L = (t2) => M(t2) || j(t2), N = (t2) => "[object Number]" == R.call(t2) && t2 == t2, U = (t2) => N(t2) && t2 > 0, z = (t2) => "[object Boolean]" === R.call(t2), H = (t2) => t2 instanceof FormData, B = (t2) => E(b, t2);
function q(t2) {
  return null === t2 || "object" != typeof t2;
}
function V(t2, i2) {
  return Object.prototype.toString.call(t2) === "[object " + i2 + "]";
}
function W(t2) {
  return !M(Event) && (function(t3, i2) {
    try {
      return t3 instanceof i2;
    } catch (t4) {
      return false;
    }
  })(t2, Event);
}
var G = [true, "true", 1, "1", "yes"], Y = (t2) => E(G, t2), J = [false, "false", 0, "0", "no"];
function K(t2, i2, e2, r2, s2) {
  return i2 > e2 && (r2.warn("min cannot be greater than max."), i2 = e2), N(t2) ? t2 > e2 ? (r2.warn(" cannot be  greater than max: " + e2 + ". Using max value instead."), e2) : t2 < i2 ? (r2.warn(" cannot be less than min: " + i2 + ". Using min value instead."), i2) : t2 : (r2.warn(" must be a number. using max or fallback. max: " + e2 + ", fallback: " + s2), K(s2 || e2, i2, e2, r2));
}
class X {
  constructor(t2) {
    this.t = {}, this.i = t2.i, this.o = K(t2.bucketSize, 0, 100, t2.h), this.m = K(t2.refillRate, 0, this.o, t2.h), this.S = K(t2.refillInterval, 0, 864e5, t2.h);
  }
  $(t2, i2) {
    var e2 = i2 - t2.lastAccess, r2 = Math.floor(e2 / this.S);
    if (r2 > 0) {
      var s2 = r2 * this.m;
      t2.tokens = Math.min(t2.tokens + s2, this.o), t2.lastAccess = t2.lastAccess + r2 * this.S;
    }
  }
  consumeRateLimit(t2) {
    var i2, e2 = Date.now(), r2 = String(t2), s2 = this.t[r2];
    return s2 ? this.$(s2, e2) : (s2 = { tokens: this.o, lastAccess: e2 }, this.t[r2] = s2), 0 === s2.tokens || (s2.tokens--, 0 === s2.tokens && (null == (i2 = this.i) || i2.call(this, t2)), 0 === s2.tokens);
  }
  stop() {
    this.t = {};
  }
}
var Q = "Mobile", Z = "iOS", tt = "Android", it = "Tablet", et = tt + " " + it, rt = "iPad", st = "Apple", nt = st + " Watch", ot = "Safari", at = "BlackBerry", lt = "Samsung", ut = lt + "Browser", ht = lt + " Internet", dt = "Chrome", vt = dt + " OS", ct = dt + " " + Z, ft = "Internet Explorer", pt = ft + " " + Q, _t = "Opera", gt = _t + " Mini", mt = "Edge", bt = "Microsoft " + mt, yt = "Firefox", wt = yt + " " + Z, Et = "Nintendo", St = "PlayStation", xt = "Xbox", $t = tt + " " + Q, kt = Q + " " + ot, Pt = "Windows", Tt = Pt + " Phone", Rt = "Nokia", It = "Ouya", Ct = "Generic", Ot = Ct + " " + Q.toLowerCase(), Ft = Ct + " " + it.toLowerCase(), Mt = "Konqueror", At = "(\\d+(\\.\\d+)?)", Dt = new RegExp("Version/" + At), jt = new RegExp(xt, "i"), Lt = new RegExp(St + " \\w+", "i"), Nt = new RegExp(Et + " \\w+", "i"), Ut = new RegExp(at + "|PlayBook|BB10", "i"), zt = { "NT3.51": "NT 3.11", "NT4.0": "NT 4.0", "5.0": "2000", 5.1: "XP", 5.2: "XP", "6.0": "Vista", 6.1: "7", 6.2: "8", 6.3: "8.1", 6.4: "10", "10.0": "10" };
var Ht, Bt, qt, Vt = (t2, i2) => i2 && E(i2, st) || (function(t3) {
  return E(t3, ot) && !E(t3, dt) && !E(t3, tt);
})(t2), Wt = function(t2, i2) {
  return i2 = i2 || "", E(t2, " OPR/") && E(t2, "Mini") ? gt : E(t2, " OPR/") ? _t : Ut.test(t2) ? at : E(t2, "IE" + Q) || E(t2, "WPDesktop") ? pt : E(t2, ut) ? ht : E(t2, mt) || E(t2, "Edg/") ? bt : E(t2, "FBIOS") ? "Facebook " + Q : E(t2, "UCWEB") || E(t2, "UCBrowser") ? "UC Browser" : E(t2, "CriOS") ? ct : E(t2, "CrMo") || E(t2, dt) ? dt : E(t2, tt) && E(t2, ot) ? $t : E(t2, "FxiOS") ? wt : E(t2.toLowerCase(), Mt.toLowerCase()) ? Mt : Vt(t2, i2) ? E(t2, Q) ? kt : ot : E(t2, yt) ? yt : E(t2, "MSIE") || E(t2, "Trident/") ? ft : E(t2, "Gecko") ? yt : "";
}, Gt = { [pt]: [new RegExp("rv:" + At)], [bt]: [new RegExp(mt + "?\\/" + At)], [dt]: [new RegExp("(" + dt + "|CrMo)\\/" + At)], [ct]: [new RegExp("CriOS\\/" + At)], "UC Browser": [new RegExp("(UCBrowser|UCWEB)\\/" + At)], [ot]: [Dt], [kt]: [Dt], [_t]: [new RegExp("(Opera|OPR)\\/" + At)], [yt]: [new RegExp(yt + "\\/" + At)], [wt]: [new RegExp("FxiOS\\/" + At)], [Mt]: [new RegExp("Konqueror[:/]?" + At, "i")], [at]: [new RegExp(at + " " + At), Dt], [$t]: [new RegExp("android\\s" + At, "i")], [ht]: [new RegExp(ut + "\\/" + At)], [ft]: [new RegExp("(rv:|MSIE )" + At)], Mozilla: [new RegExp("rv:" + At)] }, Yt = function(t2, i2) {
  var e2 = Wt(t2, i2), r2 = Gt[e2];
  if (M(r2)) return null;
  for (var s2 = 0; s2 < r2.length; s2++) {
    var n2 = r2[s2], o2 = t2.match(n2);
    if (o2) return parseFloat(o2[o2.length - 2]);
  }
  return null;
}, Jt = [[new RegExp(xt + "; " + xt + " (.*?)[);]", "i"), (t2) => [xt, t2 && t2[1] || ""]], [new RegExp(Et, "i"), [Et, ""]], [new RegExp(St, "i"), [St, ""]], [Ut, [at, ""]], [new RegExp(Pt, "i"), (t2, i2) => {
  if (/Phone/.test(i2) || /WPDesktop/.test(i2)) return [Tt, ""];
  if (new RegExp(Q).test(i2) && !/IEMobile\b/.test(i2)) return [Pt + " " + Q, ""];
  var e2 = /Windows NT ([0-9.]+)/i.exec(i2);
  if (e2 && e2[1]) {
    var r2 = e2[1], s2 = zt[r2] || "";
    return /arm/i.test(i2) && (s2 = "RT"), [Pt, s2];
  }
  return [Pt, ""];
}], [/((iPhone|iPad|iPod).*?OS (\d+)_(\d+)_?(\d+)?|iPhone)/, (t2) => {
  if (t2 && t2[3]) {
    var i2 = [t2[3], t2[4], t2[5] || "0"];
    return [Z, i2.join(".")];
  }
  return [Z, ""];
}], [/(watch.*\/(\d+\.\d+\.\d+)|watch os,(\d+\.\d+),)/i, (t2) => {
  var i2 = "";
  return t2 && t2.length >= 3 && (i2 = M(t2[2]) ? t2[3] : t2[2]), ["watchOS", i2];
}], [new RegExp("(" + tt + " (\\d+)\\.(\\d+)\\.?(\\d+)?|" + tt + ")", "i"), (t2) => {
  if (t2 && t2[2]) {
    var i2 = [t2[2], t2[3], t2[4] || "0"];
    return [tt, i2.join(".")];
  }
  return [tt, ""];
}], [/Mac OS X (\d+)[_.](\d+)[_.]?(\d+)?/i, (t2) => {
  var i2 = ["Mac OS X", ""];
  if (t2 && t2[1]) {
    var e2 = [t2[1], t2[2], t2[3] || "0"];
    i2[1] = e2.join(".");
  }
  return i2;
}], [/Mac/i, ["Mac OS X", ""]], [/CrOS/, [vt, ""]], [/Linux|debian/i, ["Linux", ""]]], Kt = function(t2) {
  return Nt.test(t2) ? Et : Lt.test(t2) ? St : jt.test(t2) ? xt : new RegExp(It, "i").test(t2) ? It : new RegExp("(" + Tt + "|WPDesktop)", "i").test(t2) ? Tt : /iPad/.test(t2) ? rt : /iPod/.test(t2) ? "iPod Touch" : /iPhone/.test(t2) ? "iPhone" : /(watch)(?: ?os[,/]|\d,\d\/)[\d.]+/i.test(t2) ? nt : Ut.test(t2) ? at : /(kobo)\s(ereader|touch)/i.test(t2) ? "Kobo" : new RegExp(Rt, "i").test(t2) ? Rt : /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i.test(t2) || /(kf[a-z]+)( bui|\)).+silk\//i.test(t2) ? "Kindle Fire" : /(Android|ZTE)/i.test(t2) ? new RegExp(Q).test(t2) && !/(9138B|TB782B|Nexus [97]|pixel c|HUAWEISHT|BTV|noble nook|smart ultra 6)/i.test(t2) || /pixel[\daxl ]{1,6}/i.test(t2) && !/pixel c/i.test(t2) || /(huaweimed-al00|tah-|APA|SM-G92|i980|zte|U304AA)/i.test(t2) || /lmy47v/i.test(t2) && !/QTAQZ3/i.test(t2) ? tt : et : new RegExp("(pda|" + Q + ")", "i").test(t2) ? Ot : new RegExp(it, "i").test(t2) && !new RegExp(it + " pc", "i").test(t2) ? Ft : "";
}, Xt = (t2) => t2 instanceof Error;
function Qt(t2) {
  var i2 = globalThis._posthogChunkIds;
  if (i2) {
    var e2 = Object.keys(i2);
    return qt && e2.length === Bt || (Bt = e2.length, qt = e2.reduce(((e3, r2) => {
      Ht || (Ht = {});
      var s2 = Ht[r2];
      if (s2) e3[s2[0]] = s2[1];
      else for (var n2 = t2(r2), o2 = n2.length - 1; o2 >= 0; o2--) {
        var a2 = n2[o2], l2 = null == a2 ? void 0 : a2.filename, u2 = i2[r2];
        if (l2 && u2) {
          e3[l2] = u2, Ht[r2] = [l2, u2];
          break;
        }
      }
      return e3;
    }), {})), qt;
  }
}
class Zt {
  constructor(t2, i2, e2) {
    void 0 === e2 && (e2 = []), this.coercers = t2, this.stackParser = i2, this.modifiers = e2;
  }
  buildFromUnknown(t2, i2) {
    void 0 === i2 && (i2 = {});
    var e2 = i2 && i2.mechanism || { handled: true, type: "generic" }, r2 = this.buildCoercingContext(e2, i2, 0).apply(t2), s2 = this.buildParsingContext(i2), n2 = this.parseStacktrace(r2, s2);
    return { $exception_list: this.convertToExceptionList(n2, e2), $exception_level: "error" };
  }
  modifyFrames(t2) {
    var i2 = this;
    return _((function* () {
      for (var e2 of t2) e2.stacktrace && e2.stacktrace.frames && I(e2.stacktrace.frames) && (e2.stacktrace.frames = yield i2.applyModifiers(e2.stacktrace.frames));
      return t2;
    }))();
  }
  coerceFallback(t2) {
    var i2;
    return { type: "Error", value: "Unknown error", stack: null == (i2 = t2.syntheticException) ? void 0 : i2.stack, synthetic: true };
  }
  parseStacktrace(t2, i2) {
    var e2, r2;
    return null != t2.cause && (e2 = this.parseStacktrace(t2.cause, i2)), "" != t2.stack && null != t2.stack && (r2 = this.applyChunkIds(this.stackParser(t2.stack, t2.synthetic ? i2.skipFirstLines : 0), i2.chunkIdMap)), g({}, t2, { cause: e2, stack: r2 });
  }
  applyChunkIds(t2, i2) {
    return t2.map(((t3) => (t3.filename && i2 && (t3.chunk_id = i2[t3.filename]), t3)));
  }
  applyCoercers(t2, i2) {
    for (var e2 of this.coercers) if (e2.match(t2)) return e2.coerce(t2, i2);
    return this.coerceFallback(i2);
  }
  applyModifiers(t2) {
    var i2 = this;
    return _((function* () {
      var e2 = t2;
      for (var r2 of i2.modifiers) e2 = yield r2(e2);
      return e2;
    }))();
  }
  convertToExceptionList(t2, i2) {
    var e2, r2, s2, n2 = { type: t2.type, value: t2.value, mechanism: { type: null !== (e2 = i2.type) && void 0 !== e2 ? e2 : "generic", handled: null === (r2 = i2.handled) || void 0 === r2 || r2, synthetic: null !== (s2 = t2.synthetic) && void 0 !== s2 && s2 } };
    t2.stack && (n2.stacktrace = { type: "raw", frames: t2.stack });
    var o2 = [n2];
    return null != t2.cause && o2.push(...this.convertToExceptionList(t2.cause, g({}, i2, { handled: true }))), o2;
  }
  buildParsingContext(t2) {
    var i2;
    return { chunkIdMap: Qt(this.stackParser), skipFirstLines: null !== (i2 = t2.skipFirstLines) && void 0 !== i2 ? i2 : 1 };
  }
  buildCoercingContext(t2, i2, e2) {
    void 0 === e2 && (e2 = 0);
    var r2 = (e3, r3) => {
      if (r3 <= 4) {
        var s2 = this.buildCoercingContext(t2, i2, r3);
        return this.applyCoercers(e3, s2);
      }
    };
    return g({}, i2, { syntheticException: 0 == e2 ? i2.syntheticException : void 0, mechanism: t2, apply: (t3) => r2(t3, e2), next: (t3) => r2(t3, e2 + 1) });
  }
}
var ti = "?";
function ii(t2, i2, e2, r2, s2) {
  var n2 = { platform: t2, filename: i2, function: "<anonymous>" === e2 ? ti : e2, in_app: true };
  return M(r2) || (n2.lineno = r2), M(s2) || (n2.colno = s2), n2;
}
var ei = (t2, i2) => {
  var e2 = -1 !== t2.indexOf("safari-extension"), r2 = -1 !== t2.indexOf("safari-web-extension");
  return e2 || r2 ? [-1 !== t2.indexOf("@") ? t2.split("@")[0] : ti, e2 ? "safari-extension:" + i2 : "safari-web-extension:" + i2] : [t2, i2];
}, ri = /^\s*at (\S+?)(?::(\d+))(?::(\d+))\s*$/i, si = /^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, ni = /\((\S*)(?::(\d+))(?::(\d+))\)/, oi = (t2, i2) => {
  var e2 = ri.exec(t2);
  if (e2) {
    var [, r2, s2, n2] = e2;
    return ii(i2, r2, ti, +s2, +n2);
  }
  var o2 = si.exec(t2);
  if (o2) {
    if (o2[2] && 0 === o2[2].indexOf("eval")) {
      var a2 = ni.exec(o2[2]);
      a2 && (o2[2] = a2[1], o2[3] = a2[2], o2[4] = a2[3]);
    }
    var [l2, u2] = ei(o2[1] || ti, o2[2]);
    return ii(i2, u2, l2, o2[3] ? +o2[3] : void 0, o2[4] ? +o2[4] : void 0);
  }
}, ai = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i, li = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i, ui = (t2, i2) => {
  var e2 = ai.exec(t2);
  if (e2) {
    if (e2[3] && e2[3].indexOf(" > eval") > -1) {
      var r2 = li.exec(e2[3]);
      r2 && (e2[1] = e2[1] || "eval", e2[3] = r2[1], e2[4] = r2[2], e2[5] = "");
    }
    var s2 = e2[3], n2 = e2[1] || ti;
    return [n2, s2] = ei(n2, s2), ii(i2, s2, n2, e2[4] ? +e2[4] : void 0, e2[5] ? +e2[5] : void 0);
  }
}, hi = /\(error: (.*)\)/, di = 50;
function vi() {
  return (function(t2) {
    for (var i2 = arguments.length, e2 = new Array(i2 > 1 ? i2 - 1 : 0), r2 = 1; r2 < i2; r2++) e2[r2 - 1] = arguments[r2];
    return function(i3, r3) {
      void 0 === r3 && (r3 = 0);
      for (var s2 = [], n2 = i3.split("\n"), o2 = r3; o2 < n2.length; o2++) {
        var a2 = n2[o2];
        if (!(a2.length > 1024)) {
          var l2 = hi.test(a2) ? a2.replace(hi, "$1") : a2;
          if (!l2.match(/\S*Error: /)) {
            for (var u2 of e2) {
              var h2 = u2(l2, t2);
              if (h2) {
                s2.push(h2);
                break;
              }
            }
            if (s2.length >= di) break;
          }
        }
      }
      return (function(t3) {
        if (!t3.length) return [];
        var i4 = Array.from(t3);
        return i4.reverse(), i4.slice(0, di).map(((t4) => {
          return g({}, t4, { filename: t4.filename || (e3 = i4, e3[e3.length - 1] || {}).filename, function: t4.function || ti });
          var e3;
        }));
      })(s2);
    };
  })("web:javascript", oi, ui);
}
class ci {
  match(t2) {
    return this.isDOMException(t2) || this.isDOMError(t2);
  }
  coerce(t2, i2) {
    var e2 = A(t2.stack);
    return { type: this.getType(t2), value: this.getValue(t2), stack: e2 ? t2.stack : void 0, cause: t2.cause ? i2.next(t2.cause) : void 0, synthetic: false };
  }
  getType(t2) {
    return this.isDOMError(t2) ? "DOMError" : "DOMException";
  }
  getValue(t2) {
    var i2 = t2.name || (this.isDOMError(t2) ? "DOMError" : "DOMException");
    return t2.message ? i2 + ": " + t2.message : i2;
  }
  isDOMException(t2) {
    return V(t2, "DOMException");
  }
  isDOMError(t2) {
    return V(t2, "DOMError");
  }
}
class fi {
  match(t2) {
    return ((t3) => t3 instanceof Error)(t2);
  }
  coerce(t2, i2) {
    return { type: this.getType(t2), value: this.getMessage(t2, i2), stack: this.getStack(t2), cause: t2.cause ? i2.next(t2.cause) : void 0, synthetic: false };
  }
  getType(t2) {
    return t2.name || t2.constructor.name;
  }
  getMessage(t2, i2) {
    var e2 = t2.message;
    return e2.error && "string" == typeof e2.error.message ? String(e2.error.message) : String(e2);
  }
  getStack(t2) {
    return t2.stacktrace || t2.stack || void 0;
  }
}
class pi {
  constructor() {
  }
  match(t2) {
    return V(t2, "ErrorEvent") && null != t2.error;
  }
  coerce(t2, i2) {
    var e2, r2 = i2.apply(t2.error);
    return r2 || { type: "ErrorEvent", value: t2.message, stack: null == (e2 = i2.syntheticException) ? void 0 : e2.stack, synthetic: true };
  }
}
var _i = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/i;
class gi {
  match(t2) {
    return "string" == typeof t2;
  }
  coerce(t2, i2) {
    var e2, [r2, s2] = this.getInfos(t2);
    return { type: null != r2 ? r2 : "Error", value: null != s2 ? s2 : t2, stack: null == (e2 = i2.syntheticException) ? void 0 : e2.stack, synthetic: true };
  }
  getInfos(t2) {
    var i2 = "Error", e2 = t2, r2 = t2.match(_i);
    return r2 && (i2 = r2[1], e2 = r2[2]), [i2, e2];
  }
}
var mi = ["fatal", "error", "warning", "log", "info", "debug"];
function bi(t2, i2) {
  void 0 === i2 && (i2 = 40);
  var e2 = Object.keys(t2);
  if (e2.sort(), !e2.length) return "[object has no keys]";
  for (var r2 = e2.length; r2 > 0; r2--) {
    var s2 = e2.slice(0, r2).join(", ");
    if (!(s2.length > i2)) return r2 === e2.length || s2.length <= i2 ? s2 : s2.slice(0, i2) + "...";
  }
  return "";
}
class yi {
  match(t2) {
    return "object" == typeof t2 && null !== t2;
  }
  coerce(t2, i2) {
    var e2, r2 = this.getErrorPropertyFromObject(t2);
    return r2 ? i2.apply(r2) : { type: this.getType(t2), value: this.getValue(t2), stack: null == (e2 = i2.syntheticException) ? void 0 : e2.stack, level: this.isSeverityLevel(t2.level) ? t2.level : "error", synthetic: true };
  }
  getType(t2) {
    return W(t2) ? t2.constructor.name : "Error";
  }
  getValue(t2) {
    if ("name" in t2 && "string" == typeof t2.name) {
      var i2 = "'" + t2.name + "' captured as exception";
      return "message" in t2 && "string" == typeof t2.message && (i2 += " with message: '" + t2.message + "'"), i2;
    }
    if ("message" in t2 && "string" == typeof t2.message) return t2.message;
    var e2 = this.getObjectClassName(t2);
    return (e2 && "Object" !== e2 ? "'" + e2 + "'" : "Object") + " captured as exception with keys: " + bi(t2);
  }
  isSeverityLevel(t2) {
    return A(t2) && !D(t2) && mi.indexOf(t2) >= 0;
  }
  getErrorPropertyFromObject(t2) {
    for (var i2 in t2) if (Object.prototype.hasOwnProperty.call(t2, i2)) {
      var e2 = t2[i2];
      if (Xt(e2)) return e2;
    }
  }
  getObjectClassName(t2) {
    try {
      var i2 = Object.getPrototypeOf(t2);
      return i2 ? i2.constructor.name : void 0;
    } catch (t3) {
      return;
    }
  }
}
class wi {
  match(t2) {
    return W(t2);
  }
  coerce(t2, i2) {
    var e2, r2 = t2.constructor.name;
    return { type: r2, value: r2 + " captured as exception with keys: " + bi(t2), stack: null == (e2 = i2.syntheticException) ? void 0 : e2.stack, synthetic: true };
  }
}
class Ei {
  match(t2) {
    return q(t2);
  }
  coerce(t2, i2) {
    var e2;
    return { type: "Error", value: "Primitive value captured as exception: " + String(t2), stack: null == (e2 = i2.syntheticException) ? void 0 : e2.stack, synthetic: true };
  }
}
class Si {
  match(t2) {
    return V(t2, "PromiseRejectionEvent") || this.isCustomEventWrappingRejection(t2);
  }
  isCustomEventWrappingRejection(t2) {
    if (!W(t2)) return false;
    try {
      var i2 = t2.detail;
      return null != i2 && "object" == typeof i2 && "reason" in i2;
    } catch (t3) {
      return false;
    }
  }
  coerce(t2, i2) {
    var e2, r2 = this.getUnhandledRejectionReason(t2);
    return q(r2) ? { type: "UnhandledRejection", value: "Non-Error promise rejection captured with value: " + String(r2), stack: null == (e2 = i2.syntheticException) ? void 0 : e2.stack, synthetic: true } : i2.apply(r2);
  }
  getUnhandledRejectionReason(t2) {
    try {
      if ("reason" in t2) return t2.reason;
      if ("detail" in t2 && null != t2.detail && "object" == typeof t2.detail && "reason" in t2.detail) return t2.detail.reason;
    } catch (t3) {
    }
    return t2;
  }
}
var xi = function(i2, e2) {
  var { debugEnabled: r2 } = void 0 === e2 ? {} : e2, s2 = { k: function(e3) {
    if (t && (f.DEBUG || v.POSTHOG_DEBUG || r2) && !M(t.console) && t.console) {
      for (var s3 = ("__rrweb_original__" in t.console[e3]) ? t.console[e3].__rrweb_original__ : t.console[e3], n2 = arguments.length, o2 = new Array(n2 > 1 ? n2 - 1 : 0), a2 = 1; a2 < n2; a2++) o2[a2 - 1] = arguments[a2];
      s3(i2, ...o2);
    }
  }, info: function() {
    for (var t2 = arguments.length, i3 = new Array(t2), e3 = 0; e3 < t2; e3++) i3[e3] = arguments[e3];
    s2.k("log", ...i3);
  }, warn: function() {
    for (var t2 = arguments.length, i3 = new Array(t2), e3 = 0; e3 < t2; e3++) i3[e3] = arguments[e3];
    s2.k("warn", ...i3);
  }, error: function() {
    for (var t2 = arguments.length, i3 = new Array(t2), e3 = 0; e3 < t2; e3++) i3[e3] = arguments[e3];
    s2.k("error", ...i3);
  }, critical: function() {
    for (var t2 = arguments.length, e3 = new Array(t2), r3 = 0; r3 < t2; r3++) e3[r3] = arguments[r3];
    console.error(i2, ...e3);
  }, uninitializedWarning: (t2) => {
    s2.error("You must initialize PostHog before calling " + t2);
  }, createLogger: (t2, e3) => xi(i2 + " " + t2, e3) };
  return s2;
}, $i = xi("[PostHog.js]"), ki = $i.createLogger, Pi = ki("[ExternalScriptsLoader]"), Ti = (t2, i2, e2) => {
  if (t2.config.disable_external_dependency_loading) return Pi.warn(i2 + " was requested but loading of external scripts is disabled."), e2("Loading of external scripts is disabled");
  var r2 = null == o ? void 0 : o.querySelectorAll("script");
  if (r2) {
    for (var s2, n2 = function() {
      if (r2[a2].src === i2) {
        var t3 = r2[a2];
        return t3.__posthog_loading_callback_fired ? { v: e2() } : (t3.addEventListener("load", ((i3) => {
          t3.__posthog_loading_callback_fired = true, e2(void 0, i3);
        })), t3.onerror = (t4) => e2(t4), { v: void 0 });
      }
    }, a2 = 0; a2 < r2.length; a2++) if (s2 = n2()) return s2.v;
  }
  var l2 = () => {
    if (!o) return e2("document not found");
    var r3 = o.createElement("script");
    if (r3.type = "text/javascript", r3.crossOrigin = "anonymous", r3.src = i2, r3.onload = (t3) => {
      r3.__posthog_loading_callback_fired = true, e2(void 0, t3);
    }, r3.onerror = (t3) => e2(t3), t2.config.prepare_external_dependency_script && (r3 = t2.config.prepare_external_dependency_script(r3)), !r3) return e2("prepare_external_dependency_script returned null");
    if ("head" === t2.config.external_scripts_inject_target) o.head.appendChild(r3);
    else {
      var s3, n3 = o.querySelectorAll("body > script");
      if (n3.length > 0) null == (s3 = n3[0].parentNode) || s3.insertBefore(r3, n3[0]);
      else o.body.appendChild(r3);
    }
  };
  null != o && o.body ? l2() : null == o || o.addEventListener("DOMContentLoaded", l2);
};
v.__PosthogExtensions__ = v.__PosthogExtensions__ || {}, v.__PosthogExtensions__.loadExternalDependency = (t2, i2, e2) => {
  var r2 = "/static/" + i2 + ".js?v=" + t2.version;
  if ("remote-config" === i2 && (r2 = "/array/" + t2.config.token + "/config.js"), "toolbar" === i2) {
    var s2 = 3e5;
    r2 = r2 + "&t=" + Math.floor(Date.now() / s2) * s2;
  }
  var n2 = t2.requestRouter.endpointFor("assets", r2);
  Ti(t2, n2, e2);
}, v.__PosthogExtensions__.loadSiteApp = (t2, i2, e2) => {
  var r2 = t2.requestRouter.endpointFor("api", i2);
  Ti(t2, r2, e2);
};
var Ri = {};
function Ii(t2, i2, e2) {
  if (I(t2)) {
    if (r && t2.forEach === r) t2.forEach(i2, e2);
    else if ("length" in t2 && t2.length === +t2.length) {
      for (var s2 = 0, n2 = t2.length; s2 < n2; s2++) if (s2 in t2 && i2.call(e2, t2[s2], s2) === Ri) return;
    }
  }
}
function Ci(t2, i2, e2) {
  if (!L(t2)) {
    if (I(t2)) return Ii(t2, i2, e2);
    if (H(t2)) {
      for (var r2 of t2.entries()) if (i2.call(e2, r2[1], r2[0]) === Ri) return;
    } else for (var s2 in t2) if (T.call(t2, s2) && i2.call(e2, t2[s2], s2) === Ri) return;
  }
}
var Oi = function(t2) {
  for (var i2 = arguments.length, e2 = new Array(i2 > 1 ? i2 - 1 : 0), r2 = 1; r2 < i2; r2++) e2[r2 - 1] = arguments[r2];
  return Ii(e2, (function(i3) {
    for (var e3 in i3) void 0 !== i3[e3] && (t2[e3] = i3[e3]);
  })), t2;
}, Fi = function(t2) {
  for (var i2 = arguments.length, e2 = new Array(i2 > 1 ? i2 - 1 : 0), r2 = 1; r2 < i2; r2++) e2[r2 - 1] = arguments[r2];
  return Ii(e2, (function(i3) {
    Ii(i3, (function(i4) {
      t2.push(i4);
    }));
  })), t2;
};
function Mi(t2) {
  for (var i2 = Object.keys(t2), e2 = i2.length, r2 = new Array(e2); e2--; ) r2[e2] = [i2[e2], t2[i2[e2]]];
  return r2;
}
var Ai = function(t2) {
  try {
    return t2();
  } catch (t3) {
    return;
  }
}, Di = function(t2) {
  return function() {
    try {
      for (var i2 = arguments.length, e2 = new Array(i2), r2 = 0; r2 < i2; r2++) e2[r2] = arguments[r2];
      return t2.apply(this, e2);
    } catch (t3) {
      $i.critical("Implementation error. Please turn on debug mode and open a ticket on https://app.posthog.com/home#panel=support%3Asupport%3A."), $i.critical(t3);
    }
  };
}, ji = function(t2) {
  var i2 = {};
  return Ci(t2, (function(t3, e2) {
    (A(t3) && t3.length > 0 || N(t3)) && (i2[e2] = t3);
  })), i2;
};
function Li(t2, i2) {
  return e2 = t2, r2 = (t3) => A(t3) && !j(i2) ? t3.slice(0, i2) : t3, s2 = /* @__PURE__ */ new Set(), (function t3(i3, e3) {
    return i3 !== Object(i3) ? r2 ? r2(i3, e3) : i3 : s2.has(i3) ? void 0 : (s2.add(i3), I(i3) ? (n2 = [], Ii(i3, ((i4) => {
      n2.push(t3(i4));
    }))) : (n2 = {}, Ci(i3, ((i4, e4) => {
      s2.has(i4) || (n2[e4] = t3(i4, e4));
    }))), n2);
    var n2;
  })(e2);
  var e2, r2, s2;
}
var Ni = ["herokuapp.com", "vercel.app", "netlify.app"];
function Ui(t2) {
  var i2 = null == t2 ? void 0 : t2.hostname;
  if (!A(i2)) return false;
  var e2 = i2.split(".").slice(-2).join(".");
  for (var r2 of Ni) if (e2 === r2) return false;
  return true;
}
function zi(t2, i2) {
  for (var e2 = 0; e2 < t2.length; e2++) if (i2(t2[e2])) return t2[e2];
}
function Hi(t2, i2, e2, r2) {
  var { capture: s2 = false, passive: n2 = true } = null != r2 ? r2 : {};
  null == t2 || t2.addEventListener(i2, e2, { capture: s2, passive: n2 });
}
function Bi(t2) {
  return "ph_toolbar_internal" === t2.name;
}
var qi = "$people_distinct_id", Vi = "__alias", Wi = "__timers", Gi = "$autocapture_disabled_server_side", Yi = "$heatmaps_enabled_server_side", Ji = "$exception_capture_enabled_server_side", Ki = "$error_tracking_suppression_rules", Xi = "$error_tracking_capture_extension_exceptions", Qi = "$web_vitals_enabled_server_side", Zi = "$dead_clicks_enabled_server_side", te = "$product_tours_enabled_server_side", ie = "$web_vitals_allowed_metrics", ee = "$session_recording_remote_config", re = "$sesid", se = "$session_is_sampled", ne = "$enabled_feature_flags", oe = "$early_access_features", ae = "$feature_flag_details", le = "$stored_person_properties", ue = "$stored_group_properties", he = "$surveys", de = "$flag_call_reported", ve = "$flag_call_reported_session_id", ce = "$feature_flag_errors", fe = "$feature_flag_evaluated_at", pe = "$user_state", _e = "$client_session_props", ge = "$capture_rate_limit", me = "$initial_campaign_params", be = "$initial_referrer_info", ye = "$initial_person_info", we = "$epp", Ee = "__POSTHOG_TOOLBAR__", Se = "$posthog_cookieless", xe = [qi, Vi, "__cmpns", Wi, "$session_recording_enabled_server_side", Yi, re, ne, Ki, pe, oe, ae, ue, le, he, de, ve, ce, fe, _e, ge, me, be, we, ye];
Math.trunc || (Math.trunc = function(t2) {
  return t2 < 0 ? Math.ceil(t2) : Math.floor(t2);
}), Number.isInteger || (Number.isInteger = function(t2) {
  return N(t2) && isFinite(t2) && Math.floor(t2) === t2;
});
var $e = "0123456789abcdef";
class ke {
  constructor(t2) {
    if (this.bytes = t2, 16 !== t2.length) throw new TypeError("not 128-bit length");
  }
  static fromFieldsV7(t2, i2, e2, r2) {
    if (!Number.isInteger(t2) || !Number.isInteger(i2) || !Number.isInteger(e2) || !Number.isInteger(r2) || t2 < 0 || i2 < 0 || e2 < 0 || r2 < 0 || t2 > 281474976710655 || i2 > 4095 || e2 > 1073741823 || r2 > 4294967295) throw new RangeError("invalid field value");
    var s2 = new Uint8Array(16);
    return s2[0] = t2 / Math.pow(2, 40), s2[1] = t2 / Math.pow(2, 32), s2[2] = t2 / Math.pow(2, 24), s2[3] = t2 / Math.pow(2, 16), s2[4] = t2 / Math.pow(2, 8), s2[5] = t2, s2[6] = 112 | i2 >>> 8, s2[7] = i2, s2[8] = 128 | e2 >>> 24, s2[9] = e2 >>> 16, s2[10] = e2 >>> 8, s2[11] = e2, s2[12] = r2 >>> 24, s2[13] = r2 >>> 16, s2[14] = r2 >>> 8, s2[15] = r2, new ke(s2);
  }
  toString() {
    for (var t2 = "", i2 = 0; i2 < this.bytes.length; i2++) t2 = t2 + $e.charAt(this.bytes[i2] >>> 4) + $e.charAt(15 & this.bytes[i2]), 3 !== i2 && 5 !== i2 && 7 !== i2 && 9 !== i2 || (t2 += "-");
    if (36 !== t2.length) throw new Error("Invalid UUIDv7 was generated");
    return t2;
  }
  clone() {
    return new ke(this.bytes.slice(0));
  }
  equals(t2) {
    return 0 === this.compareTo(t2);
  }
  compareTo(t2) {
    for (var i2 = 0; i2 < 16; i2++) {
      var e2 = this.bytes[i2] - t2.bytes[i2];
      if (0 !== e2) return Math.sign(e2);
    }
    return 0;
  }
}
class Pe {
  constructor() {
    this.P = 0, this.T = 0, this.R = new Ie();
  }
  generate() {
    var t2 = this.generateOrAbort();
    if (M(t2)) {
      this.P = 0;
      var i2 = this.generateOrAbort();
      if (M(i2)) throw new Error("Could not generate UUID after timestamp reset");
      return i2;
    }
    return t2;
  }
  generateOrAbort() {
    var t2 = Date.now();
    if (t2 > this.P) this.P = t2, this.I();
    else {
      if (!(t2 + 1e4 > this.P)) return;
      this.T++, this.T > 4398046511103 && (this.P++, this.I());
    }
    return ke.fromFieldsV7(this.P, Math.trunc(this.T / Math.pow(2, 30)), this.T & Math.pow(2, 30) - 1, this.R.nextUint32());
  }
  I() {
    this.T = 1024 * this.R.nextUint32() + (1023 & this.R.nextUint32());
  }
}
var Te, Re = (t2) => {
  if ("undefined" != typeof UUIDV7_DENY_WEAK_RNG && UUIDV7_DENY_WEAK_RNG) throw new Error("no cryptographically strong RNG available");
  for (var i2 = 0; i2 < t2.length; i2++) t2[i2] = 65536 * Math.trunc(65536 * Math.random()) + Math.trunc(65536 * Math.random());
  return t2;
};
t && !M(t.crypto) && crypto.getRandomValues && (Re = (t2) => crypto.getRandomValues(t2));
class Ie {
  constructor() {
    this.C = new Uint32Array(8), this.O = 1 / 0;
  }
  nextUint32() {
    return this.O >= this.C.length && (Re(this.C), this.O = 0), this.C[this.O++];
  }
}
var Ce = () => Oe().toString(), Oe = () => (Te || (Te = new Pe())).generate(), Fe = "";
var Me = /[a-z0-9][a-z0-9-]+\.[a-z]{2,}$/i;
function Ae(t2, i2) {
  if (i2) {
    var e2 = (function(t3, i3) {
      if (void 0 === i3 && (i3 = o), Fe) return Fe;
      if (!i3) return "";
      if (["localhost", "127.0.0.1"].includes(t3)) return "";
      for (var e3 = t3.split("."), r3 = Math.min(e3.length, 8), s2 = "dmn_chk_" + Ce(); !Fe && r3--; ) {
        var n2 = e3.slice(r3).join("."), a2 = s2 + "=1;domain=." + n2 + ";path=/";
        i3.cookie = a2 + ";max-age=3", i3.cookie.includes(s2) && (i3.cookie = a2 + ";max-age=0", Fe = n2);
      }
      return Fe;
    })(t2);
    if (!e2) {
      var r2 = ((t3) => {
        var i3 = t3.match(Me);
        return i3 ? i3[0] : "";
      })(t2);
      r2 !== e2 && $i.info("Warning: cookie subdomain discovery mismatch", r2, e2), e2 = r2;
    }
    return e2 ? "; domain=." + e2 : "";
  }
  return "";
}
var De = { F: () => !!o, M: function(t2) {
  $i.error("cookieStore error: " + t2);
}, A: function(t2) {
  if (o) {
    try {
      for (var i2 = t2 + "=", e2 = o.cookie.split(";").filter(((t3) => t3.length)), r2 = 0; r2 < e2.length; r2++) {
        for (var s2 = e2[r2]; " " == s2.charAt(0); ) s2 = s2.substring(1, s2.length);
        if (0 === s2.indexOf(i2)) return decodeURIComponent(s2.substring(i2.length, s2.length));
      }
    } catch (t3) {
    }
    return null;
  }
}, D: function(t2) {
  var i2;
  try {
    i2 = JSON.parse(De.A(t2)) || {};
  } catch (t3) {
  }
  return i2;
}, j: function(t2, i2, e2, r2, s2) {
  if (o) try {
    var n2 = "", a2 = "", l2 = Ae(o.location.hostname, r2);
    if (e2) {
      var u2 = /* @__PURE__ */ new Date();
      u2.setTime(u2.getTime() + 24 * e2 * 60 * 60 * 1e3), n2 = "; expires=" + u2.toUTCString();
    }
    s2 && (a2 = "; secure");
    var h2 = t2 + "=" + encodeURIComponent(JSON.stringify(i2)) + n2 + "; SameSite=Lax; path=/" + l2 + a2;
    return h2.length > 3686.4 && $i.warn("cookieStore warning: large cookie, len=" + h2.length), o.cookie = h2, h2;
  } catch (t3) {
    return;
  }
}, L: function(t2, i2) {
  if (null != o && o.cookie) try {
    De.j(t2, "", -1, i2);
  } catch (t3) {
    return;
  }
} }, je = null, Le = { F: function() {
  if (!j(je)) return je;
  var i2 = true;
  if (M(t)) i2 = false;
  else try {
    var e2 = "__mplssupport__";
    Le.j(e2, "xyz"), '"xyz"' !== Le.A(e2) && (i2 = false), Le.L(e2);
  } catch (t2) {
    i2 = false;
  }
  return i2 || $i.error("localStorage unsupported; falling back to cookie store"), je = i2, i2;
}, M: function(t2) {
  $i.error("localStorage error: " + t2);
}, A: function(i2) {
  try {
    return null == t ? void 0 : t.localStorage.getItem(i2);
  } catch (t2) {
    Le.M(t2);
  }
  return null;
}, D: function(t2) {
  try {
    return JSON.parse(Le.A(t2)) || {};
  } catch (t3) {
  }
  return null;
}, j: function(i2, e2) {
  try {
    null == t || t.localStorage.setItem(i2, JSON.stringify(e2));
  } catch (t2) {
    Le.M(t2);
  }
}, L: function(i2) {
  try {
    null == t || t.localStorage.removeItem(i2);
  } catch (t2) {
    Le.M(t2);
  }
} }, Ne = ["$device_id", "distinct_id", re, se, we, ye, pe], Ue = {}, ze = { F: function() {
  return true;
}, M: function(t2) {
  $i.error("memoryStorage error: " + t2);
}, A: function(t2) {
  return Ue[t2] || null;
}, D: function(t2) {
  return Ue[t2] || null;
}, j: function(t2, i2) {
  Ue[t2] = i2;
}, L: function(t2) {
  delete Ue[t2];
} }, He = null, Be = { F: function() {
  if (!j(He)) return He;
  if (He = true, M(t)) He = false;
  else try {
    var i2 = "__support__";
    Be.j(i2, "xyz"), '"xyz"' !== Be.A(i2) && (He = false), Be.L(i2);
  } catch (t2) {
    He = false;
  }
  return He;
}, M: function(t2) {
  $i.error("sessionStorage error: ", t2);
}, A: function(i2) {
  try {
    return null == t ? void 0 : t.sessionStorage.getItem(i2);
  } catch (t2) {
    Be.M(t2);
  }
  return null;
}, D: function(t2) {
  try {
    return JSON.parse(Be.A(t2)) || null;
  } catch (t3) {
  }
  return null;
}, j: function(i2, e2) {
  try {
    null == t || t.sessionStorage.setItem(i2, JSON.stringify(e2));
  } catch (t2) {
    Be.M(t2);
  }
}, L: function(i2) {
  try {
    null == t || t.sessionStorage.removeItem(i2);
  } catch (t2) {
    Be.M(t2);
  }
} }, qe = (function(t2) {
  return t2[t2.PENDING = -1] = "PENDING", t2[t2.DENIED = 0] = "DENIED", t2[t2.GRANTED = 1] = "GRANTED", t2;
})({});
class Ve {
  constructor(t2) {
    this._instance = t2;
  }
  get N() {
    return this._instance.config;
  }
  get consent() {
    return this.U() ? qe.DENIED : this.H;
  }
  isOptedOut() {
    return "always" === this.N.cookieless_mode || (this.consent === qe.DENIED || this.consent === qe.PENDING && (this.N.opt_out_capturing_by_default || "on_reject" === this.N.cookieless_mode));
  }
  isOptedIn() {
    return !this.isOptedOut();
  }
  isExplicitlyOptedOut() {
    return this.consent === qe.DENIED;
  }
  optInOut(t2) {
    this.B.j(this.q, t2 ? 1 : 0, this.N.cookie_expiration, this.N.cross_subdomain_cookie, this.N.secure_cookie);
  }
  reset() {
    this.B.L(this.q, this.N.cross_subdomain_cookie);
  }
  get q() {
    var { token: t2, opt_out_capturing_cookie_prefix: i2, consent_persistence_name: e2 } = this._instance.config;
    return e2 || (i2 ? i2 + t2 : "__ph_opt_in_out_" + t2);
  }
  get H() {
    var t2 = this.B.A(this.q);
    return Y(t2) ? qe.GRANTED : E(J, t2) ? qe.DENIED : qe.PENDING;
  }
  get B() {
    if (!this.V) {
      var t2 = this.N.opt_out_capturing_persistence_type;
      this.V = "localStorage" === t2 ? Le : De;
      var i2 = "localStorage" === t2 ? De : Le;
      i2.A(this.q) && (this.V.A(this.q) || this.optInOut(Y(i2.A(this.q))), i2.L(this.q, this.N.cross_subdomain_cookie));
    }
    return this.V;
  }
  U() {
    return !!this.N.respect_dnt && !!zi([null == n ? void 0 : n.doNotTrack, null == n ? void 0 : n.msDoNotTrack, v.doNotTrack], ((t2) => Y(t2)));
  }
}
var We = ki("[Dead Clicks]"), Ge = () => true, Ye = (t2) => {
  var i2, e2 = !(null == (i2 = t2.instance.persistence) || !i2.get_property(Zi)), r2 = t2.instance.config.capture_dead_clicks;
  return z(r2) ? r2 : !!O(r2) || e2;
};
class Je {
  get lazyLoadedDeadClicksAutocapture() {
    return this.W;
  }
  constructor(t2, i2, e2) {
    this.instance = t2, this.isEnabled = i2, this.onCapture = e2, this.startIfEnabledOrStop();
  }
  onRemoteConfig(t2) {
    "captureDeadClicks" in t2 && (this.instance.persistence && this.instance.persistence.register({ [Zi]: t2.captureDeadClicks }), this.startIfEnabledOrStop());
  }
  startIfEnabledOrStop() {
    this.isEnabled(this) ? this.G((() => {
      this.Y();
    })) : this.stop();
  }
  G(t2) {
    var i2, e2;
    null != (i2 = v.__PosthogExtensions__) && i2.initDeadClicksAutocapture && t2(), null == (e2 = v.__PosthogExtensions__) || null == e2.loadExternalDependency || e2.loadExternalDependency(this.instance, "dead-clicks-autocapture", ((i3) => {
      i3 ? We.error("failed to load script", i3) : t2();
    }));
  }
  Y() {
    var t2;
    if (o) {
      if (!this.W && null != (t2 = v.__PosthogExtensions__) && t2.initDeadClicksAutocapture) {
        var i2 = O(this.instance.config.capture_dead_clicks) ? this.instance.config.capture_dead_clicks : {};
        i2.__onCapture = this.onCapture, this.W = v.__PosthogExtensions__.initDeadClicksAutocapture(this.instance, i2), this.W.start(o), We.info("starting...");
      }
    } else We.error("`document` not found. Cannot start.");
  }
  stop() {
    this.W && (this.W.stop(), this.W = void 0, We.info("stopping..."));
  }
}
var Ke = ki("[SegmentIntegration]");
function Xe(t2, i2) {
  var e2 = t2.config.segment;
  if (!e2) return i2();
  !(function(t3, i3) {
    var e3 = t3.config.segment;
    if (!e3) return i3();
    var r2 = (e4) => {
      var r3 = () => e4.anonymousId() || Ce();
      t3.config.get_device_id = r3, e4.id() && (t3.register({ distinct_id: e4.id(), $device_id: r3() }), t3.persistence.set_property(pe, "identified")), i3();
    }, s2 = e3.user();
    "then" in s2 && C(s2.then) ? s2.then(r2) : r2(s2);
  })(t2, (() => {
    e2.register(((t3) => {
      Promise && Promise.resolve || Ke.warn("This browser does not have Promise support, and can not use the segment integration");
      var i3 = (i4, e3) => {
        if (!e3) return i4;
        i4.event.userId || i4.event.anonymousId === t3.get_distinct_id() || (Ke.info("No userId set, resetting PostHog"), t3.reset()), i4.event.userId && i4.event.userId !== t3.get_distinct_id() && (Ke.info("UserId set, identifying with PostHog"), t3.identify(i4.event.userId));
        var r2 = t3.calculateEventProperties(e3, i4.event.properties);
        return i4.event.properties = Object.assign({}, r2, i4.event.properties), i4;
      };
      return { name: "PostHog JS", type: "enrichment", version: "1.0.0", isLoaded: () => true, load: () => Promise.resolve(), track: (t4) => i3(t4, t4.event.event), page: (t4) => i3(t4, "$pageview"), identify: (t4) => i3(t4, "$identify"), screen: (t4) => i3(t4, "$screen") };
    })(t2)).then((() => {
      i2();
    }));
  }));
}
var Qe = "posthog-js";
function Ze(t2, i2) {
  var { organization: e2, projectId: r2, prefix: s2, severityAllowList: n2 = ["error"], sendExceptionsToPostHog: o2 = true } = void 0 === i2 ? {} : i2;
  return (i3) => {
    var a2, l2, u2, h2, d2;
    if (!("*" === n2 || n2.includes(i3.level)) || !t2.__loaded) return i3;
    i3.tags || (i3.tags = {});
    var v2 = t2.requestRouter.endpointFor("ui", "/project/" + t2.config.token + "/person/" + t2.get_distinct_id());
    i3.tags["PostHog Person URL"] = v2, t2.sessionRecordingStarted() && (i3.tags["PostHog Recording URL"] = t2.get_session_replay_url({ withTimestamp: true }));
    var c2, f2 = (null == (a2 = i3.exception) ? void 0 : a2.values) || [], p2 = f2.map(((t3) => g({}, t3, { stacktrace: t3.stacktrace ? g({}, t3.stacktrace, { type: "raw", frames: (t3.stacktrace.frames || []).map(((t4) => g({}, t4, { platform: "web:javascript" }))) }) : void 0 }))), _2 = { $exception_message: (null == (l2 = f2[0]) ? void 0 : l2.value) || i3.message, $exception_type: null == (u2 = f2[0]) ? void 0 : u2.type, $exception_level: i3.level, $exception_list: p2, $sentry_event_id: i3.event_id, $sentry_exception: i3.exception, $sentry_exception_message: (null == (h2 = f2[0]) ? void 0 : h2.value) || i3.message, $sentry_exception_type: null == (d2 = f2[0]) ? void 0 : d2.type, $sentry_tags: i3.tags };
    (e2 && r2 && (_2.$sentry_url = (s2 || "https://sentry.io/organizations/") + e2 + "/issues/?project=" + r2 + "&query=" + i3.event_id), o2) && (null == (c2 = t2.exceptions) || c2.sendExceptionEvent(_2));
    return i3;
  };
}
class tr {
  constructor(t2, i2, e2, r2, s2, n2) {
    this.name = Qe, this.setupOnce = function(o2) {
      o2(Ze(t2, { organization: i2, projectId: e2, prefix: r2, severityAllowList: s2, sendExceptionsToPostHog: null == n2 || n2 }));
    };
  }
}
class ir {
  constructor(t2) {
    this.J = (t3, i2, e2) => {
      e2 && (e2.noSessionId || e2.activityTimeout || e2.sessionPastMaximumLength) && ($i.info("[PageViewManager] Session rotated, clearing pageview state", { sessionId: t3, changeReason: e2 }), this.K = void 0, this._instance.scrollManager.resetContext());
    }, this._instance = t2, this.X();
  }
  X() {
    var t2;
    this.Z = null == (t2 = this._instance.sessionManager) ? void 0 : t2.onSessionId(this.J);
  }
  destroy() {
    var t2;
    null == (t2 = this.Z) || t2.call(this), this.Z = void 0;
  }
  doPageView(i2, e2) {
    var r2, s2 = this.tt(i2, e2);
    return this.K = { pathname: null !== (r2 = null == t ? void 0 : t.location.pathname) && void 0 !== r2 ? r2 : "", pageViewId: e2, timestamp: i2 }, this._instance.scrollManager.resetContext(), s2;
  }
  doPageLeave(t2) {
    var i2;
    return this.tt(t2, null == (i2 = this.K) ? void 0 : i2.pageViewId);
  }
  doEvent() {
    var t2;
    return { $pageview_id: null == (t2 = this.K) ? void 0 : t2.pageViewId };
  }
  tt(t2, i2) {
    var e2 = this.K;
    if (!e2) return { $pageview_id: i2 };
    var r2 = { $pageview_id: i2, $prev_pageview_id: e2.pageViewId }, s2 = this._instance.scrollManager.getContext();
    if (s2 && !this._instance.config.disable_scroll_properties) {
      var { maxScrollHeight: n2, lastScrollY: o2, maxScrollY: a2, maxContentHeight: l2, lastContentY: u2, maxContentY: h2 } = s2;
      if (!(M(n2) || M(o2) || M(a2) || M(l2) || M(u2) || M(h2))) {
        n2 = Math.ceil(n2), o2 = Math.ceil(o2), a2 = Math.ceil(a2), l2 = Math.ceil(l2), u2 = Math.ceil(u2), h2 = Math.ceil(h2);
        var d2 = n2 <= 1 ? 1 : K(o2 / n2, 0, 1, $i), v2 = n2 <= 1 ? 1 : K(a2 / n2, 0, 1, $i), c2 = l2 <= 1 ? 1 : K(u2 / l2, 0, 1, $i), f2 = l2 <= 1 ? 1 : K(h2 / l2, 0, 1, $i);
        r2 = Oi(r2, { $prev_pageview_last_scroll: o2, $prev_pageview_last_scroll_percentage: d2, $prev_pageview_max_scroll: a2, $prev_pageview_max_scroll_percentage: v2, $prev_pageview_last_content: u2, $prev_pageview_last_content_percentage: c2, $prev_pageview_max_content: h2, $prev_pageview_max_content_percentage: f2 });
      }
    }
    return e2.pathname && (r2.$prev_pageview_pathname = e2.pathname), e2.timestamp && (r2.$prev_pageview_duration = (t2.getTime() - e2.timestamp.getTime()) / 1e3), r2;
  }
}
var er = (t2) => {
  var i2 = null == o ? void 0 : o.createElement("a");
  return M(i2) ? null : (i2.href = t2, i2);
}, rr = function(t2, i2) {
  var e2, r2;
  void 0 === i2 && (i2 = "&");
  var s2 = [];
  return Ci(t2, (function(t3, i3) {
    M(t3) || M(i3) || "undefined" === i3 || (e2 = encodeURIComponent(((t4) => t4 instanceof File)(t3) ? t3.name : t3.toString()), r2 = encodeURIComponent(i3), s2[s2.length] = r2 + "=" + e2);
  })), s2.join(i2);
}, sr = function(t2, i2) {
  for (var e2, r2 = ((t2.split("#")[0] || "").split(/\?(.*)/)[1] || "").replace(/^\?+/g, "").split("&"), s2 = 0; s2 < r2.length; s2++) {
    var n2 = r2[s2].split("=");
    if (n2[0] === i2) {
      e2 = n2;
      break;
    }
  }
  if (!I(e2) || e2.length < 2) return "";
  var o2 = e2[1];
  try {
    o2 = decodeURIComponent(o2);
  } catch (t3) {
    $i.error("Skipping decoding for malformed query param: " + o2);
  }
  return o2.replace(/\+/g, " ");
}, nr = function(t2, i2, e2) {
  if (!t2 || !i2 || !i2.length) return t2;
  for (var r2 = t2.split("#"), s2 = r2[0] || "", n2 = r2[1], o2 = s2.split("?"), a2 = o2[1], l2 = o2[0], u2 = (a2 || "").split("&"), h2 = [], d2 = 0; d2 < u2.length; d2++) {
    var v2 = u2[d2].split("=");
    I(v2) && (i2.includes(v2[0]) ? h2.push(v2[0] + "=" + e2) : h2.push(u2[d2]));
  }
  var c2 = l2;
  return null != a2 && (c2 += "?" + h2.join("&")), null != n2 && (c2 += "#" + n2), c2;
}, or = function(t2, i2) {
  var e2 = t2.match(new RegExp(i2 + "=([^&]*)"));
  return e2 ? e2[1] : null;
}, ar = "https?://(.*)", lr = ["gclid", "gclsrc", "dclid", "gbraid", "wbraid", "fbclid", "msclkid", "twclid", "li_fat_id", "igshid", "ttclid", "rdt_cid", "epik", "qclid", "sccid", "irclid", "_kx"], ur = Fi(["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gad_source", "mc_cid"], lr), hr = "<masked>", dr = ["li_fat_id"];
function vr(t2, i2, e2) {
  if (!o) return {};
  var r2, s2 = i2 ? Fi([], lr, e2 || []) : [], n2 = cr(nr(o.URL, s2, hr), t2), a2 = (r2 = {}, Ci(dr, (function(t3) {
    var i3 = De.A(t3);
    r2[t3] = i3 || null;
  })), r2);
  return Oi(a2, n2);
}
function cr(t2, i2) {
  var e2 = ur.concat(i2 || []), r2 = {};
  return Ci(e2, (function(i3) {
    var e3 = sr(t2, i3);
    r2[i3] = e3 || null;
  })), r2;
}
function fr(t2) {
  var i2 = (function(t3) {
    return t3 ? 0 === t3.search(ar + "google.([^/?]*)") ? "google" : 0 === t3.search(ar + "bing.com") ? "bing" : 0 === t3.search(ar + "yahoo.com") ? "yahoo" : 0 === t3.search(ar + "duckduckgo.com") ? "duckduckgo" : null : null;
  })(t2), e2 = "yahoo" != i2 ? "q" : "p", r2 = {};
  if (!j(i2)) {
    r2.$search_engine = i2;
    var s2 = o ? sr(o.referrer, e2) : "";
    s2.length && (r2.ph_keyword = s2);
  }
  return r2;
}
function pr() {
  return navigator.language || navigator.userLanguage;
}
function _r() {
  return (null == o ? void 0 : o.referrer) || "$direct";
}
function gr(t2, i2) {
  var e2 = t2 ? Fi([], lr, i2 || []) : [], r2 = null == a ? void 0 : a.href.substring(0, 1e3);
  return { r: _r().substring(0, 1e3), u: r2 ? nr(r2, e2, hr) : void 0 };
}
function mr(t2) {
  var i2, { r: e2, u: r2 } = t2, s2 = { $referrer: e2, $referring_domain: null == e2 ? void 0 : "$direct" == e2 ? "$direct" : null == (i2 = er(e2)) ? void 0 : i2.host };
  if (r2) {
    s2.$current_url = r2;
    var n2 = er(r2);
    s2.$host = null == n2 ? void 0 : n2.host, s2.$pathname = null == n2 ? void 0 : n2.pathname;
    var o2 = cr(r2);
    Oi(s2, o2);
  }
  if (e2) {
    var a2 = fr(e2);
    Oi(s2, a2);
  }
  return s2;
}
function br() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch (t2) {
    return;
  }
}
function yr() {
  try {
    return (/* @__PURE__ */ new Date()).getTimezoneOffset();
  } catch (t2) {
    return;
  }
}
function wr(i2, e2) {
  var r2, s2, n2, o2;
  if (!d) return {};
  var l2, u2, h2, v2, c2, p2, _2, g2, m2 = i2 ? Fi([], lr, e2 || []) : [], [b2, y2] = (function(t2) {
    for (var i3 = 0; i3 < Jt.length; i3++) {
      var [e3, r3] = Jt[i3], s3 = e3.exec(t2), n3 = s3 && (C(r3) ? r3(s3, t2) : r3);
      if (n3) return n3;
    }
    return ["", ""];
  })(d);
  return Oi(ji({ $os: b2, $os_version: y2, $browser: Wt(d, navigator.vendor), $device: Kt(d), $device_type: (u2 = d, h2 = { userAgentDataPlatform: null == (r2 = navigator) || null == (r2 = r2.userAgentData) ? void 0 : r2.platform, maxTouchPoints: null == (s2 = navigator) ? void 0 : s2.maxTouchPoints, screenWidth: null == t || null == (n2 = t.screen) ? void 0 : n2.width, screenHeight: null == t || null == (o2 = t.screen) ? void 0 : o2.height, devicePixelRatio: null == t ? void 0 : t.devicePixelRatio }, g2 = Kt(u2), g2 === rt || g2 === et || "Kobo" === g2 || "Kindle Fire" === g2 || g2 === Ft ? it : g2 === Et || g2 === xt || g2 === St || g2 === It ? "Console" : g2 === nt ? "Wearable" : g2 ? Q : "Android" === (null == h2 ? void 0 : h2.userAgentDataPlatform) && (null !== (v2 = null == h2 ? void 0 : h2.maxTouchPoints) && void 0 !== v2 ? v2 : 0) > 0 ? Math.min(null !== (c2 = null == h2 ? void 0 : h2.screenWidth) && void 0 !== c2 ? c2 : 0, null !== (p2 = null == h2 ? void 0 : h2.screenHeight) && void 0 !== p2 ? p2 : 0) / (null !== (_2 = null == h2 ? void 0 : h2.devicePixelRatio) && void 0 !== _2 ? _2 : 1) >= 600 ? it : Q : "Desktop"), $timezone: br(), $timezone_offset: yr() }), { $current_url: nr(null == a ? void 0 : a.href, m2, hr), $host: null == a ? void 0 : a.host, $pathname: null == a ? void 0 : a.pathname, $raw_user_agent: d.length > 1e3 ? d.substring(0, 997) + "..." : d, $browser_version: Yt(d, navigator.vendor), $browser_language: pr(), $browser_language_prefix: (l2 = pr(), "string" == typeof l2 ? l2.split("-")[0] : void 0), $screen_height: null == t ? void 0 : t.screen.height, $screen_width: null == t ? void 0 : t.screen.width, $viewport_height: null == t ? void 0 : t.innerHeight, $viewport_width: null == t ? void 0 : t.innerWidth, $lib: f.LIB_NAME, $lib_version: f.LIB_VERSION, $insert_id: Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10), $time: Date.now() / 1e3 });
}
var Er = ["cookie", "localstorage", "localstorage+cookie", "sessionstorage", "memory"];
class Sr {
  constructor(t2, i2) {
    this.N = t2, this.props = {}, this.it = false, this.et = ((t3) => {
      var i3 = "";
      return t3.token && (i3 = t3.token.replace(/\+/g, "PL").replace(/\//g, "SL").replace(/=/g, "EQ")), t3.persistence_name ? "ph_" + t3.persistence_name : "ph_" + i3 + "_posthog";
    })(t2), this.B = this.rt(t2), this.load(), t2.debug && $i.info("Persistence loaded", t2.persistence, g({}, this.props)), this.update_config(t2, t2, i2), this.save();
  }
  isDisabled() {
    return !!this.st;
  }
  rt(i2) {
    -1 === Er.indexOf(i2.persistence.toLowerCase()) && ($i.critical("Unknown persistence type " + i2.persistence + "; falling back to localStorage+cookie"), i2.persistence = "localStorage+cookie");
    var e2 = (function(i3) {
      void 0 === i3 && (i3 = []);
      var e3 = [...Ne, ...i3];
      return g({}, Le, { D: function(t2) {
        try {
          var i4 = {};
          try {
            i4 = De.D(t2) || {};
          } catch (t3) {
          }
          var e4 = Oi(i4, JSON.parse(Le.A(t2) || "{}"));
          return Le.j(t2, e4), e4;
        } catch (t3) {
        }
        return null;
      }, j: function(t2, i4, r3, s2, n2, o2) {
        try {
          Le.j(t2, i4, void 0, void 0, o2);
          var a2 = {};
          e3.forEach(((t3) => {
            i4[t3] && (a2[t3] = i4[t3]);
          })), Object.keys(a2).length && De.j(t2, a2, r3, s2, n2, o2);
        } catch (t3) {
          Le.M(t3);
        }
      }, L: function(i4, e4) {
        try {
          null == t || t.localStorage.removeItem(i4), De.L(i4, e4);
        } catch (t2) {
          Le.M(t2);
        }
      } });
    })(i2.cookie_persisted_properties || []), r2 = i2.persistence.toLowerCase();
    return "localstorage" === r2 && Le.F() ? Le : "localstorage+cookie" === r2 && e2.F() ? e2 : "sessionstorage" === r2 && Be.F() ? Be : "memory" === r2 ? ze : "cookie" === r2 ? De : e2.F() ? e2 : De;
  }
  nt(t2) {
    var i2 = null != t2 ? t2 : this.N.feature_flag_cache_ttl_ms;
    if (!i2 || i2 <= 0) return false;
    var e2 = this.props[fe];
    return !e2 || "number" != typeof e2 || Date.now() - e2 > i2;
  }
  properties() {
    var t2 = {};
    return Ci(this.props, ((i2, e2) => {
      if (e2 === ne && O(i2)) {
        if (!this.nt()) for (var r2 = Object.keys(i2), n2 = 0; n2 < r2.length; n2++) t2["$feature/" + r2[n2]] = i2[r2[n2]];
      } else a2 = e2, l2 = false, (j(o2 = xe) ? l2 : s && o2.indexOf === s ? -1 != o2.indexOf(a2) : (Ci(o2, (function(t3) {
        if (l2 || (l2 = t3 === a2)) return Ri;
      })), l2)) || (t2[e2] = i2);
      var o2, a2, l2;
    })), t2;
  }
  load() {
    if (!this.st) {
      var t2 = this.B.D(this.et);
      t2 && (this.props = Oi({}, t2));
    }
  }
  save() {
    this.st || this.B.j(this.et, this.props, this.ot, this.ut, this.ht, this.N.debug);
  }
  remove() {
    this.B.L(this.et, false), this.B.L(this.et, true);
  }
  clear() {
    this.remove(), this.props = {};
  }
  register_once(t2, i2, e2) {
    if (O(t2)) {
      M(i2) && (i2 = "None"), this.ot = M(e2) ? this.dt : e2;
      var r2 = false;
      if (Ci(t2, ((t3, e3) => {
        this.props.hasOwnProperty(e3) && this.props[e3] !== i2 || (this.props[e3] = t3, r2 = true);
      })), r2) return this.save(), true;
    }
    return false;
  }
  register(t2, i2) {
    if (O(t2)) {
      this.ot = M(i2) ? this.dt : i2;
      var e2 = false;
      if (Ci(t2, ((i3, r2) => {
        t2.hasOwnProperty(r2) && this.props[r2] !== i3 && (this.props[r2] = i3, e2 = true);
      })), e2) return this.save(), true;
    }
    return false;
  }
  unregister(t2) {
    t2 in this.props && (delete this.props[t2], this.save());
  }
  update_campaign_params() {
    if (!this.it) {
      var t2 = vr(this.N.custom_campaign_params, this.N.mask_personal_data_properties, this.N.custom_personal_data_properties);
      F(ji(t2)) || this.register(t2), this.it = true;
    }
  }
  update_search_keyword() {
    var t2;
    this.register((t2 = null == o ? void 0 : o.referrer) ? fr(t2) : {});
  }
  update_referrer_info() {
    var t2;
    this.register_once({ $referrer: _r(), $referring_domain: null != o && o.referrer && (null == (t2 = er(o.referrer)) ? void 0 : t2.host) || "$direct" }, void 0);
  }
  set_initial_person_info() {
    this.props[me] || this.props[be] || this.register_once({ [ye]: gr(this.N.mask_personal_data_properties, this.N.custom_personal_data_properties) }, void 0);
  }
  get_initial_props() {
    var t2 = {};
    Ci([be, me], ((i3) => {
      var e3 = this.props[i3];
      e3 && Ci(e3, (function(i4, e4) {
        t2["$initial_" + x(e4)] = i4;
      }));
    }));
    var i2, e2, r2 = this.props[ye];
    if (r2) {
      var s2 = (i2 = mr(r2), e2 = {}, Ci(i2, (function(t3, i3) {
        e2["$initial_" + x(i3)] = t3;
      })), e2);
      Oi(t2, s2);
    }
    return t2;
  }
  safe_merge(t2) {
    return Ci(this.props, (function(i2, e2) {
      e2 in t2 || (t2[e2] = i2);
    })), t2;
  }
  update_config(t2, i2, e2) {
    if (this.dt = this.ot = t2.cookie_expiration, this.set_disabled(t2.disable_persistence || !!e2), this.set_cross_subdomain(t2.cross_subdomain_cookie), this.set_secure(t2.secure_cookie), t2.persistence !== i2.persistence || !((t3, i3) => {
      if (t3.length !== i3.length) return false;
      var e3 = [...t3].sort(), r3 = [...i3].sort();
      return e3.every(((t4, i4) => t4 === r3[i4]));
    })(t2.cookie_persisted_properties || [], i2.cookie_persisted_properties || [])) {
      var r2 = this.rt(t2), s2 = this.props;
      this.clear(), this.B = r2, this.props = s2, this.save();
    }
  }
  set_disabled(t2) {
    this.st = t2, this.st ? this.remove() : this.save();
  }
  set_cross_subdomain(t2) {
    t2 !== this.ut && (this.ut = t2, this.remove(), this.save());
  }
  set_secure(t2) {
    t2 !== this.ht && (this.ht = t2, this.remove(), this.save());
  }
  set_event_timer(t2, i2) {
    var e2 = this.props[Wi] || {};
    e2[t2] = i2, this.props[Wi] = e2, this.save();
  }
  remove_event_timer(t2) {
    var i2 = (this.props[Wi] || {})[t2];
    return M(i2) || (delete this.props[Wi][t2], this.save()), i2;
  }
  get_property(t2) {
    return this.props[t2];
  }
  set_property(t2, i2) {
    this.props[t2] = i2, this.save();
  }
}
var xr = { Activation: "events", Cancellation: "cancelEvents" }, Tr = { Popover: "popover", API: "api", Widget: "widget" }, Or = { SHOWN: "survey shown", DISMISSED: "survey dismissed", SENT: "survey sent" }, Fr = { SURVEY_ID: "$survey_id", SURVEY_ITERATION: "$survey_iteration", SURVEY_LAST_SEEN_DATE: "$survey_last_seen_date" }, Mr = { Popover: "popover", Inline: "inline" }, Dr = (function(t2) {
  return t2.SHOWN = "product tour shown", t2.DISMISSED = "product tour dismissed", t2.COMPLETED = "product tour completed", t2.STEP_SHOWN = "product tour step shown", t2.STEP_COMPLETED = "product tour step completed", t2.BUTTON_CLICKED = "product tour button clicked", t2.STEP_SELECTOR_FAILED = "product tour step selector failed", t2.BANNER_CONTAINER_SELECTOR_FAILED = "product tour banner container selector failed", t2.BANNER_ACTION_CLICKED = "product tour banner action clicked", t2;
})({}), jr = (function(t2) {
  return t2.TOUR_ID = "$product_tour_id", t2.TOUR_NAME = "$product_tour_name", t2.TOUR_ITERATION = "$product_tour_iteration", t2.TOUR_RENDER_REASON = "$product_tour_render_reason", t2.TOUR_STEP_ID = "$product_tour_step_id", t2.TOUR_STEP_ORDER = "$product_tour_step_order", t2.TOUR_STEP_TYPE = "$product_tour_step_type", t2.TOUR_DISMISS_REASON = "$product_tour_dismiss_reason", t2.TOUR_BUTTON_TEXT = "$product_tour_button_text", t2.TOUR_BUTTON_ACTION = "$product_tour_button_action", t2.TOUR_BUTTON_LINK = "$product_tour_button_link", t2.TOUR_BUTTON_TOUR_ID = "$product_tour_button_tour_id", t2.TOUR_STEPS_COUNT = "$product_tour_steps_count", t2.TOUR_STEP_SELECTOR = "$product_tour_step_selector", t2.TOUR_STEP_SELECTOR_FOUND = "$product_tour_step_selector_found", t2.TOUR_STEP_ELEMENT_TAG = "$product_tour_step_element_tag", t2.TOUR_STEP_ELEMENT_ID = "$product_tour_step_element_id", t2.TOUR_STEP_ELEMENT_CLASSES = "$product_tour_step_element_classes", t2.TOUR_STEP_ELEMENT_TEXT = "$product_tour_step_element_text", t2.TOUR_ERROR = "$product_tour_error", t2.TOUR_MATCHES_COUNT = "$product_tour_matches_count", t2.TOUR_FAILURE_PHASE = "$product_tour_failure_phase", t2.TOUR_WAITED_FOR_ELEMENT = "$product_tour_waited_for_element", t2.TOUR_WAIT_DURATION_MS = "$product_tour_wait_duration_ms", t2.TOUR_BANNER_SELECTOR = "$product_tour_banner_selector", t2.TOUR_LINKED_SURVEY_ID = "$product_tour_linked_survey_id", t2.USE_MANUAL_SELECTOR = "$use_manual_selector", t2.INFERENCE_DATA_PRESENT = "$inference_data_present", t2.TOUR_LAST_SEEN_DATE = "$product_tour_last_seen_date", t2.TOUR_TYPE = "$product_tour_type", t2;
})({}), Lr = ki("[RateLimiter]");
class Nr {
  constructor(t2) {
    this.serverLimits = {}, this.lastEventRateLimited = false, this.checkForLimiting = (t3) => {
      var i2 = t3.text;
      if (i2 && i2.length) try {
        (JSON.parse(i2).quota_limited || []).forEach(((t4) => {
          Lr.info((t4 || "events") + " is quota limited."), this.serverLimits[t4] = (/* @__PURE__ */ new Date()).getTime() + 6e4;
        }));
      } catch (t4) {
        return void Lr.warn('could not rate limit - continuing. Error: "' + (null == t4 ? void 0 : t4.message) + '"', { text: i2 });
      }
    }, this.instance = t2, this.lastEventRateLimited = this.clientRateLimitContext(true).isRateLimited;
  }
  get captureEventsPerSecond() {
    var t2;
    return (null == (t2 = this.instance.config.rate_limiting) ? void 0 : t2.events_per_second) || 10;
  }
  get captureEventsBurstLimit() {
    var t2;
    return Math.max((null == (t2 = this.instance.config.rate_limiting) ? void 0 : t2.events_burst_limit) || 10 * this.captureEventsPerSecond, this.captureEventsPerSecond);
  }
  clientRateLimitContext(t2) {
    var i2, e2, r2;
    void 0 === t2 && (t2 = false);
    var { captureEventsBurstLimit: s2, captureEventsPerSecond: n2 } = this, o2 = (/* @__PURE__ */ new Date()).getTime(), a2 = null !== (i2 = null == (e2 = this.instance.persistence) ? void 0 : e2.get_property(ge)) && void 0 !== i2 ? i2 : { tokens: s2, last: o2 };
    a2.tokens += (o2 - a2.last) / 1e3 * n2, a2.last = o2, a2.tokens > s2 && (a2.tokens = s2);
    var l2 = a2.tokens < 1;
    return l2 || t2 || (a2.tokens = Math.max(0, a2.tokens - 1)), !l2 || this.lastEventRateLimited || t2 || this.instance.capture("$$client_ingestion_warning", { $$client_ingestion_warning_message: "posthog-js client rate limited. Config is set to " + n2 + " events per second and " + s2 + " events burst limit." }, { skip_client_rate_limiting: true }), this.lastEventRateLimited = l2, null == (r2 = this.instance.persistence) || r2.set_property(ge, a2), { isRateLimited: l2, remainingTokens: a2.tokens };
  }
  isServerRateLimited(t2) {
    var i2 = this.serverLimits[t2 || "events"] || false;
    return false !== i2 && (/* @__PURE__ */ new Date()).getTime() < i2;
  }
}
var Ur = ki("[RemoteConfig]");
class zr {
  constructor(t2) {
    this._instance = t2;
  }
  get remoteConfig() {
    var t2;
    return null == (t2 = v._POSTHOG_REMOTE_CONFIG) || null == (t2 = t2[this._instance.config.token]) ? void 0 : t2.config;
  }
  vt(t2) {
    var i2, e2;
    null != (i2 = v.__PosthogExtensions__) && i2.loadExternalDependency ? null == (e2 = v.__PosthogExtensions__) || null == e2.loadExternalDependency || e2.loadExternalDependency(this._instance, "remote-config", (() => t2(this.remoteConfig))) : t2();
  }
  ct(t2) {
    this._instance._send_request({ method: "GET", url: this._instance.requestRouter.endpointFor("assets", "/array/" + this._instance.config.token + "/config"), callback: (i2) => {
      t2(i2.json);
    } });
  }
  load() {
    try {
      if (this.remoteConfig) return Ur.info("Using preloaded remote config", this.remoteConfig), this.ft(this.remoteConfig), void this._t();
      if (this._instance.bt()) return void Ur.warn("Remote config is disabled. Falling back to local config.");
      this.vt(((t2) => {
        if (!t2) return Ur.info("No config found after loading remote JS config. Falling back to JSON."), void this.ct(((t3) => {
          this.ft(t3), this._t();
        }));
        this.ft(t2), this._t();
      }));
    } catch (t2) {
      Ur.error("Error loading remote config", t2);
    }
  }
  stop() {
    this.yt && (clearInterval(this.yt), this.yt = void 0);
  }
  refresh() {
    this._instance.bt() || "hidden" === (null == o ? void 0 : o.visibilityState) || this._instance.reloadFeatureFlags();
  }
  _t() {
    var t2;
    if (!this.yt) {
      var i2 = null !== (t2 = this._instance.config.remote_config_refresh_interval_ms) && void 0 !== t2 ? t2 : 3e5;
      0 !== i2 && (this.yt = setInterval((() => {
        this.refresh();
      }), i2));
    }
  }
  ft(t2) {
    var i2;
    (t2 || Ur.error("Failed to fetch remote config from PostHog."), this._instance.ft(null != t2 ? t2 : {}), false !== (null == t2 ? void 0 : t2.hasFeatureFlags)) && (this._instance.config.advanced_disable_feature_flags_on_first_load || null == (i2 = this._instance.featureFlags) || i2.ensureFlagsLoaded());
  }
}
var Br = (function(t2) {
  return t2.GZipJS = "gzip-js", t2.Base64 = "base64", t2;
})({}), qr = Uint8Array, Vr = Uint16Array, Wr = Uint32Array, Gr = new qr([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0]), Yr = new qr([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0]), Jr = new qr([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), Kr = function(t2, i2) {
  for (var e2 = new Vr(31), r2 = 0; r2 < 31; ++r2) e2[r2] = i2 += 1 << t2[r2 - 1];
  var s2 = new Wr(e2[30]);
  for (r2 = 1; r2 < 30; ++r2) for (var n2 = e2[r2]; n2 < e2[r2 + 1]; ++n2) s2[n2] = n2 - e2[r2] << 5 | r2;
  return [e2, s2];
}, Xr = Kr(Gr, 2), Qr = Xr[0], Zr = Xr[1];
Qr[28] = 258, Zr[258] = 28;
for (var ts = Kr(Yr, 0)[1], is = new Vr(32768), es = 0; es < 32768; ++es) {
  var rs = (43690 & es) >>> 1 | (21845 & es) << 1;
  rs = (61680 & (rs = (52428 & rs) >>> 2 | (13107 & rs) << 2)) >>> 4 | (3855 & rs) << 4, is[es] = ((65280 & rs) >>> 8 | (255 & rs) << 8) >>> 1;
}
var ss = function(t2, i2, e2) {
  for (var r2 = t2.length, s2 = 0, n2 = new Vr(i2); s2 < r2; ++s2) ++n2[t2[s2] - 1];
  var o2, a2 = new Vr(i2);
  for (s2 = 0; s2 < i2; ++s2) a2[s2] = a2[s2 - 1] + n2[s2 - 1] << 1;
  for (o2 = new Vr(r2), s2 = 0; s2 < r2; ++s2) o2[s2] = is[a2[t2[s2] - 1]++] >>> 15 - t2[s2];
  return o2;
}, ns = new qr(288);
for (es = 0; es < 144; ++es) ns[es] = 8;
for (es = 144; es < 256; ++es) ns[es] = 9;
for (es = 256; es < 280; ++es) ns[es] = 7;
for (es = 280; es < 288; ++es) ns[es] = 8;
var os = new qr(32);
for (es = 0; es < 32; ++es) os[es] = 5;
var as = ss(ns, 9), ls = ss(os, 5), us = function(t2) {
  return (t2 / 8 >> 0) + (7 & t2 && 1);
}, hs = function(t2, i2, e2) {
  (null == e2 || e2 > t2.length) && (e2 = t2.length);
  var r2 = new (t2 instanceof Vr ? Vr : t2 instanceof Wr ? Wr : qr)(e2 - i2);
  return r2.set(t2.subarray(i2, e2)), r2;
}, ds = function(t2, i2, e2) {
  e2 <<= 7 & i2;
  var r2 = i2 / 8 >> 0;
  t2[r2] |= e2, t2[r2 + 1] |= e2 >>> 8;
}, vs = function(t2, i2, e2) {
  e2 <<= 7 & i2;
  var r2 = i2 / 8 >> 0;
  t2[r2] |= e2, t2[r2 + 1] |= e2 >>> 8, t2[r2 + 2] |= e2 >>> 16;
}, cs = function(t2, i2) {
  for (var e2 = [], r2 = 0; r2 < t2.length; ++r2) t2[r2] && e2.push({ s: r2, f: t2[r2] });
  var s2 = e2.length, n2 = e2.slice();
  if (!s2) return [new qr(0), 0];
  if (1 == s2) {
    var o2 = new qr(e2[0].s + 1);
    return o2[e2[0].s] = 1, [o2, 1];
  }
  e2.sort((function(t3, i3) {
    return t3.f - i3.f;
  })), e2.push({ s: -1, f: 25001 });
  var a2 = e2[0], l2 = e2[1], u2 = 0, h2 = 1, d2 = 2;
  for (e2[0] = { s: -1, f: a2.f + l2.f, l: a2, r: l2 }; h2 != s2 - 1; ) a2 = e2[e2[u2].f < e2[d2].f ? u2++ : d2++], l2 = e2[u2 != h2 && e2[u2].f < e2[d2].f ? u2++ : d2++], e2[h2++] = { s: -1, f: a2.f + l2.f, l: a2, r: l2 };
  var v2 = n2[0].s;
  for (r2 = 1; r2 < s2; ++r2) n2[r2].s > v2 && (v2 = n2[r2].s);
  var c2 = new Vr(v2 + 1), f2 = fs(e2[h2 - 1], c2, 0);
  if (f2 > i2) {
    r2 = 0;
    var p2 = 0, _2 = f2 - i2, g2 = 1 << _2;
    for (n2.sort((function(t3, i3) {
      return c2[i3.s] - c2[t3.s] || t3.f - i3.f;
    })); r2 < s2; ++r2) {
      var m2 = n2[r2].s;
      if (!(c2[m2] > i2)) break;
      p2 += g2 - (1 << f2 - c2[m2]), c2[m2] = i2;
    }
    for (p2 >>>= _2; p2 > 0; ) {
      var b2 = n2[r2].s;
      c2[b2] < i2 ? p2 -= 1 << i2 - c2[b2]++ - 1 : ++r2;
    }
    for (; r2 >= 0 && p2; --r2) {
      var y2 = n2[r2].s;
      c2[y2] == i2 && (--c2[y2], ++p2);
    }
    f2 = i2;
  }
  return [new qr(c2), f2];
}, fs = function(t2, i2, e2) {
  return -1 == t2.s ? Math.max(fs(t2.l, i2, e2 + 1), fs(t2.r, i2, e2 + 1)) : i2[t2.s] = e2;
}, ps = function(t2) {
  for (var i2 = t2.length; i2 && !t2[--i2]; ) ;
  for (var e2 = new Vr(++i2), r2 = 0, s2 = t2[0], n2 = 1, o2 = function(t3) {
    e2[r2++] = t3;
  }, a2 = 1; a2 <= i2; ++a2) if (t2[a2] == s2 && a2 != i2) ++n2;
  else {
    if (!s2 && n2 > 2) {
      for (; n2 > 138; n2 -= 138) o2(32754);
      n2 > 2 && (o2(n2 > 10 ? n2 - 11 << 5 | 28690 : n2 - 3 << 5 | 12305), n2 = 0);
    } else if (n2 > 3) {
      for (o2(s2), --n2; n2 > 6; n2 -= 6) o2(8304);
      n2 > 2 && (o2(n2 - 3 << 5 | 8208), n2 = 0);
    }
    for (; n2--; ) o2(s2);
    n2 = 1, s2 = t2[a2];
  }
  return [e2.subarray(0, r2), i2];
}, _s = function(t2, i2) {
  for (var e2 = 0, r2 = 0; r2 < i2.length; ++r2) e2 += t2[r2] * i2[r2];
  return e2;
}, gs = function(t2, i2, e2) {
  var r2 = e2.length, s2 = us(i2 + 2);
  t2[s2] = 255 & r2, t2[s2 + 1] = r2 >>> 8, t2[s2 + 2] = 255 ^ t2[s2], t2[s2 + 3] = 255 ^ t2[s2 + 1];
  for (var n2 = 0; n2 < r2; ++n2) t2[s2 + n2 + 4] = e2[n2];
  return 8 * (s2 + 4 + r2);
}, ms = function(t2, i2, e2, r2, s2, n2, o2, a2, l2, u2, h2) {
  ds(i2, h2++, e2), ++s2[256];
  for (var d2 = cs(s2, 15), v2 = d2[0], c2 = d2[1], f2 = cs(n2, 15), p2 = f2[0], _2 = f2[1], g2 = ps(v2), m2 = g2[0], b2 = g2[1], y2 = ps(p2), w2 = y2[0], E2 = y2[1], S2 = new Vr(19), x2 = 0; x2 < m2.length; ++x2) S2[31 & m2[x2]]++;
  for (x2 = 0; x2 < w2.length; ++x2) S2[31 & w2[x2]]++;
  for (var k2 = cs(S2, 7), P2 = k2[0], T2 = k2[1], R2 = 19; R2 > 4 && !P2[Jr[R2 - 1]]; --R2) ;
  var I2, C2, O2, F2, M2 = u2 + 5 << 3, A2 = _s(s2, ns) + _s(n2, os) + o2, D2 = _s(s2, v2) + _s(n2, p2) + o2 + 14 + 3 * R2 + _s(S2, P2) + (2 * S2[16] + 3 * S2[17] + 7 * S2[18]);
  if (M2 <= A2 && M2 <= D2) return gs(i2, h2, t2.subarray(l2, l2 + u2));
  if (ds(i2, h2, 1 + (D2 < A2)), h2 += 2, D2 < A2) {
    I2 = ss(v2, c2), C2 = v2, O2 = ss(p2, _2), F2 = p2;
    var j2 = ss(P2, T2);
    ds(i2, h2, b2 - 257), ds(i2, h2 + 5, E2 - 1), ds(i2, h2 + 10, R2 - 4), h2 += 14;
    for (x2 = 0; x2 < R2; ++x2) ds(i2, h2 + 3 * x2, P2[Jr[x2]]);
    h2 += 3 * R2;
    for (var L2 = [m2, w2], N2 = 0; N2 < 2; ++N2) {
      var U2 = L2[N2];
      for (x2 = 0; x2 < U2.length; ++x2) {
        var z2 = 31 & U2[x2];
        ds(i2, h2, j2[z2]), h2 += P2[z2], z2 > 15 && (ds(i2, h2, U2[x2] >>> 5 & 127), h2 += U2[x2] >>> 12);
      }
    }
  } else I2 = as, C2 = ns, O2 = ls, F2 = os;
  for (x2 = 0; x2 < a2; ++x2) if (r2[x2] > 255) {
    z2 = r2[x2] >>> 18 & 31;
    vs(i2, h2, I2[z2 + 257]), h2 += C2[z2 + 257], z2 > 7 && (ds(i2, h2, r2[x2] >>> 23 & 31), h2 += Gr[z2]);
    var H2 = 31 & r2[x2];
    vs(i2, h2, O2[H2]), h2 += F2[H2], H2 > 3 && (vs(i2, h2, r2[x2] >>> 5 & 8191), h2 += Yr[H2]);
  } else vs(i2, h2, I2[r2[x2]]), h2 += C2[r2[x2]];
  return vs(i2, h2, I2[256]), h2 + C2[256];
}, bs = new Wr([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]), ys = (function() {
  for (var t2 = new Wr(256), i2 = 0; i2 < 256; ++i2) {
    for (var e2 = i2, r2 = 9; --r2; ) e2 = (1 & e2 && 3988292384) ^ e2 >>> 1;
    t2[i2] = e2;
  }
  return t2;
})(), ws = function(t2, i2, e2, r2, s2) {
  return (function(t3, i3, e3, r3, s3, n2) {
    var o2 = t3.length, a2 = new qr(r3 + o2 + 5 * (1 + Math.floor(o2 / 7e3)) + s3), l2 = a2.subarray(r3, a2.length - s3), u2 = 0;
    if (!i3 || o2 < 8) for (var h2 = 0; h2 <= o2; h2 += 65535) {
      var d2 = h2 + 65535;
      d2 < o2 ? u2 = gs(l2, u2, t3.subarray(h2, d2)) : (l2[h2] = n2, u2 = gs(l2, u2, t3.subarray(h2, o2)));
    }
    else {
      for (var v2 = bs[i3 - 1], c2 = v2 >>> 13, f2 = 8191 & v2, p2 = (1 << e3) - 1, _2 = new Vr(32768), g2 = new Vr(p2 + 1), m2 = Math.ceil(e3 / 3), b2 = 2 * m2, y2 = function(i4) {
        return (t3[i4] ^ t3[i4 + 1] << m2 ^ t3[i4 + 2] << b2) & p2;
      }, w2 = new Wr(25e3), E2 = new Vr(288), S2 = new Vr(32), x2 = 0, k2 = 0, P2 = (h2 = 0, 0), T2 = 0, R2 = 0; h2 < o2; ++h2) {
        var I2 = y2(h2), C2 = 32767 & h2, O2 = g2[I2];
        if (_2[C2] = O2, g2[I2] = C2, T2 <= h2) {
          var F2 = o2 - h2;
          if ((x2 > 7e3 || P2 > 24576) && F2 > 423) {
            u2 = ms(t3, l2, 0, w2, E2, S2, k2, P2, R2, h2 - R2, u2), P2 = x2 = k2 = 0, R2 = h2;
            for (var M2 = 0; M2 < 286; ++M2) E2[M2] = 0;
            for (M2 = 0; M2 < 30; ++M2) S2[M2] = 0;
          }
          var A2 = 2, D2 = 0, j2 = f2, L2 = C2 - O2 & 32767;
          if (F2 > 2 && I2 == y2(h2 - L2)) for (var N2 = Math.min(c2, F2) - 1, U2 = Math.min(32767, h2), z2 = Math.min(258, F2); L2 <= U2 && --j2 && C2 != O2; ) {
            if (t3[h2 + A2] == t3[h2 + A2 - L2]) {
              for (var H2 = 0; H2 < z2 && t3[h2 + H2] == t3[h2 + H2 - L2]; ++H2) ;
              if (H2 > A2) {
                if (A2 = H2, D2 = L2, H2 > N2) break;
                var B2 = Math.min(L2, H2 - 2), q2 = 0;
                for (M2 = 0; M2 < B2; ++M2) {
                  var V2 = h2 - L2 + M2 + 32768 & 32767, W2 = V2 - _2[V2] + 32768 & 32767;
                  W2 > q2 && (q2 = W2, O2 = V2);
                }
              }
            }
            L2 += (C2 = O2) - (O2 = _2[C2]) + 32768 & 32767;
          }
          if (D2) {
            w2[P2++] = 268435456 | Zr[A2] << 18 | ts[D2];
            var G2 = 31 & Zr[A2], Y2 = 31 & ts[D2];
            k2 += Gr[G2] + Yr[Y2], ++E2[257 + G2], ++S2[Y2], T2 = h2 + A2, ++x2;
          } else w2[P2++] = t3[h2], ++E2[t3[h2]];
        }
      }
      u2 = ms(t3, l2, n2, w2, E2, S2, k2, P2, R2, h2 - R2, u2);
    }
    return hs(a2, 0, r3 + us(u2) + s3);
  })(t2, null == i2.level ? 6 : i2.level, null == i2.mem ? Math.ceil(1.5 * Math.max(8, Math.min(13, Math.log(t2.length)))) : 12 + i2.mem, e2, r2, true);
}, Es = function(t2, i2, e2) {
  for (; e2; ++i2) t2[i2] = e2, e2 >>>= 8;
};
function Ss(t2, i2) {
  void 0 === i2 && (i2 = {});
  var e2 = /* @__PURE__ */ (function() {
    var t3 = 4294967295;
    return { p: function(i3) {
      for (var e3 = t3, r3 = 0; r3 < i3.length; ++r3) e3 = ys[255 & e3 ^ i3[r3]] ^ e3 >>> 8;
      t3 = e3;
    }, d: function() {
      return 4294967295 ^ t3;
    } };
  })(), r2 = t2.length;
  e2.p(t2);
  var s2, n2 = ws(t2, i2, 10 + ((s2 = i2).filename && s2.filename.length + 1 || 0), 8), o2 = n2.length;
  return (function(t3, i3) {
    var e3 = i3.filename;
    if (t3[0] = 31, t3[1] = 139, t3[2] = 8, t3[8] = i3.level < 2 ? 4 : 9 == i3.level ? 2 : 0, t3[9] = 3, 0 != i3.mtime && Es(t3, 4, Math.floor(new Date(i3.mtime || Date.now()) / 1e3)), e3) {
      t3[3] = 8;
      for (var r3 = 0; r3 <= e3.length; ++r3) t3[r3 + 10] = e3.charCodeAt(r3);
    }
  })(n2, i2), Es(n2, o2 - 8, e2.d()), Es(n2, o2 - 4, r2), n2;
}
var xs = function(t2) {
  var i2, e2, r2, s2, n2 = "";
  for (i2 = e2 = 0, r2 = (t2 = (t2 + "").replace(/\r\n/g, "\n").replace(/\r/g, "\n")).length, s2 = 0; s2 < r2; s2++) {
    var o2 = t2.charCodeAt(s2), a2 = null;
    o2 < 128 ? e2++ : a2 = o2 > 127 && o2 < 2048 ? String.fromCharCode(o2 >> 6 | 192, 63 & o2 | 128) : String.fromCharCode(o2 >> 12 | 224, o2 >> 6 & 63 | 128, 63 & o2 | 128), j(a2) || (e2 > i2 && (n2 += t2.substring(i2, e2)), n2 += a2, i2 = e2 = s2 + 1);
  }
  return e2 > i2 && (n2 += t2.substring(i2, t2.length)), n2;
}, $s = !!u || !!l, ks = function(t2, i2, e2) {
  var r2;
  void 0 === e2 && (e2 = true);
  var [s2, n2] = t2.split("?"), o2 = g({}, i2), a2 = null !== (r2 = null == n2 ? void 0 : n2.split("&").map(((t3) => {
    var i3, [r3, s3] = t3.split("="), n3 = e2 && null !== (i3 = o2[r3]) && void 0 !== i3 ? i3 : s3;
    return delete o2[r3], r3 + "=" + n3;
  }))) && void 0 !== r2 ? r2 : [], l2 = rr(o2);
  return l2 && a2.push(l2), s2 + "?" + a2.join("&");
}, Ps = (t2, i2) => JSON.stringify(t2, ((t3, i3) => "bigint" == typeof i3 ? i3.toString() : i3), i2), Ts = (t2) => {
  var { data: i2, compression: e2 } = t2;
  if (i2) {
    if (e2 === Br.GZipJS) {
      var r2 = Ss((function(t3, i3) {
        var e3 = t3.length;
        if ("undefined" != typeof TextEncoder) return new TextEncoder().encode(t3);
        for (var r3 = new qr(t3.length + (t3.length >>> 1)), s3 = 0, n3 = function(t4) {
          r3[s3++] = t4;
        }, o3 = 0; o3 < e3; ++o3) {
          if (s3 + 5 > r3.length) {
            var a2 = new qr(s3 + 8 + (e3 - o3 << 1));
            a2.set(r3), r3 = a2;
          }
          var l2 = t3.charCodeAt(o3);
          l2 < 128 || i3 ? n3(l2) : l2 < 2048 ? (n3(192 | l2 >>> 6), n3(128 | 63 & l2)) : l2 > 55295 && l2 < 57344 ? (n3(240 | (l2 = 65536 + (1047552 & l2) | 1023 & t3.charCodeAt(++o3)) >>> 18), n3(128 | l2 >>> 12 & 63), n3(128 | l2 >>> 6 & 63), n3(128 | 63 & l2)) : (n3(224 | l2 >>> 12), n3(128 | l2 >>> 6 & 63), n3(128 | 63 & l2));
        }
        return hs(r3, 0, s3);
      })(Ps(i2)), { mtime: 0 });
      return { contentType: "text/plain", body: r2.buffer.slice(r2.byteOffset, r2.byteOffset + r2.byteLength), estimatedSize: r2.byteLength };
    }
    if (e2 === Br.Base64) {
      var s2 = (function(t3) {
        var i3, e3, r3, s3, n3, o3 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", a2 = 0, l2 = 0, u2 = "", h2 = [];
        if (!t3) return t3;
        t3 = xs(t3);
        do {
          i3 = (n3 = t3.charCodeAt(a2++) << 16 | t3.charCodeAt(a2++) << 8 | t3.charCodeAt(a2++)) >> 18 & 63, e3 = n3 >> 12 & 63, r3 = n3 >> 6 & 63, s3 = 63 & n3, h2[l2++] = o3.charAt(i3) + o3.charAt(e3) + o3.charAt(r3) + o3.charAt(s3);
        } while (a2 < t3.length);
        switch (u2 = h2.join(""), t3.length % 3) {
          case 1:
            u2 = u2.slice(0, -2) + "==";
            break;
          case 2:
            u2 = u2.slice(0, -1) + "=";
        }
        return u2;
      })(Ps(i2)), n2 = ((t3) => "data=" + encodeURIComponent("string" == typeof t3 ? t3 : Ps(t3)))(s2);
      return { contentType: "application/x-www-form-urlencoded", body: n2, estimatedSize: new Blob([n2]).size };
    }
    var o2 = Ps(i2);
    return { contentType: "application/json", body: o2, estimatedSize: new Blob([o2]).size };
  }
}, Rs = [];
l && Rs.push({ transport: "fetch", method: (t2) => {
  var i2, e2, { contentType: r2, body: s2, estimatedSize: n2 } = null !== (i2 = Ts(t2)) && void 0 !== i2 ? i2 : {}, o2 = new Headers();
  Ci(t2.headers, (function(t3, i3) {
    o2.append(i3, t3);
  })), r2 && o2.append("Content-Type", r2);
  var a2 = t2.url, u2 = null;
  if (h) {
    var d2 = new h();
    u2 = { signal: d2.signal, timeout: setTimeout((() => d2.abort()), t2.timeout) };
  }
  l(a2, g({ method: (null == t2 ? void 0 : t2.method) || "GET", headers: o2, keepalive: "POST" === t2.method && (n2 || 0) < 52428.8, body: s2, signal: null == (e2 = u2) ? void 0 : e2.signal }, t2.fetchOptions)).then(((i3) => i3.text().then(((e3) => {
    var r3 = { statusCode: i3.status, text: e3 };
    if (200 === i3.status) try {
      r3.json = JSON.parse(e3);
    } catch (t3) {
      $i.error(t3);
    }
    null == t2.callback || t2.callback(r3);
  })))).catch(((i3) => {
    $i.error(i3), null == t2.callback || t2.callback({ statusCode: 0, error: i3 });
  })).finally((() => u2 ? clearTimeout(u2.timeout) : null));
} }), u && Rs.push({ transport: "XHR", method: (t2) => {
  var i2, e2 = new u();
  e2.open(t2.method || "GET", t2.url, true);
  var { contentType: r2, body: s2 } = null !== (i2 = Ts(t2)) && void 0 !== i2 ? i2 : {};
  Ci(t2.headers, (function(t3, i3) {
    e2.setRequestHeader(i3, t3);
  })), r2 && e2.setRequestHeader("Content-Type", r2), t2.timeout && (e2.timeout = t2.timeout), t2.disableXHRCredentials || (e2.withCredentials = true), e2.onreadystatechange = () => {
    if (4 === e2.readyState) {
      var i3 = { statusCode: e2.status, text: e2.responseText };
      if (200 === e2.status) try {
        i3.json = JSON.parse(e2.responseText);
      } catch (t3) {
      }
      null == t2.callback || t2.callback(i3);
    }
  }, e2.send(s2);
} }), null != n && n.sendBeacon && Rs.push({ transport: "sendBeacon", method: (t2) => {
  var i2 = ks(t2.url, { beacon: "1" });
  try {
    var e2, { contentType: r2, body: s2 } = null !== (e2 = Ts(t2)) && void 0 !== e2 ? e2 : {}, o2 = "string" == typeof s2 ? new Blob([s2], { type: r2 }) : s2;
    n.sendBeacon(i2, o2);
  } catch (t3) {
  }
} });
var Is = 3e3;
class Cs {
  constructor(t2, i2) {
    this.wt = true, this.Et = [], this.St = K((null == i2 ? void 0 : i2.flush_interval_ms) || Is, 250, 5e3, $i.createLogger("flush interval"), Is), this.xt = t2;
  }
  enqueue(t2) {
    this.Et.push(t2), this.$t || this.kt();
  }
  unload() {
    this.Pt();
    var t2 = this.Et.length > 0 ? this.Tt() : {}, i2 = Object.values(t2);
    [...i2.filter(((t3) => 0 === t3.url.indexOf("/e"))), ...i2.filter(((t3) => 0 !== t3.url.indexOf("/e")))].map(((t3) => {
      this.xt(g({}, t3, { transport: "sendBeacon" }));
    }));
  }
  enable() {
    this.wt = false, this.kt();
  }
  kt() {
    var t2 = this;
    this.wt || (this.$t = setTimeout((() => {
      if (this.Pt(), this.Et.length > 0) {
        var i2 = this.Tt(), e2 = function() {
          var e3 = i2[r2], s2 = (/* @__PURE__ */ new Date()).getTime();
          e3.data && I(e3.data) && Ci(e3.data, ((t3) => {
            t3.offset = Math.abs(t3.timestamp - s2), delete t3.timestamp;
          })), t2.xt(e3);
        };
        for (var r2 in i2) e2();
      }
    }), this.St));
  }
  Pt() {
    clearTimeout(this.$t), this.$t = void 0;
  }
  Tt() {
    var t2 = {};
    return Ci(this.Et, ((i2) => {
      var e2, r2 = i2, s2 = (r2 ? r2.batchKey : null) || r2.url;
      M(t2[s2]) && (t2[s2] = g({}, r2, { data: [] })), null == (e2 = t2[s2].data) || e2.push(r2.data);
    })), this.Et = [], t2;
  }
}
var Os = ["retriesPerformedSoFar"];
class Fs {
  constructor(i2) {
    this.Rt = false, this.It = 3e3, this.Et = [], this._instance = i2, this.Et = [], this.Ct = true, !M(t) && "onLine" in t.navigator && (this.Ct = t.navigator.onLine, this.Ot = () => {
      this.Ct = true, this.Ft();
    }, this.Mt = () => {
      this.Ct = false;
    }, Hi(t, "online", this.Ot), Hi(t, "offline", this.Mt));
  }
  get length() {
    return this.Et.length;
  }
  retriableRequest(t2) {
    var { retriesPerformedSoFar: i2 } = t2, e2 = m(t2, Os);
    U(i2) && (e2.url = ks(e2.url, { retry_count: i2 })), this._instance._send_request(g({}, e2, { callback: (t3) => {
      200 !== t3.statusCode && (t3.statusCode < 400 || t3.statusCode >= 500) && (null != i2 ? i2 : 0) < 10 ? this.At(g({ retriesPerformedSoFar: i2 }, e2)) : null == e2.callback || e2.callback(t3);
    } }));
  }
  At(t2) {
    var i2 = t2.retriesPerformedSoFar || 0;
    t2.retriesPerformedSoFar = i2 + 1;
    var e2 = (function(t3) {
      var i3 = 3e3 * Math.pow(2, t3), e3 = i3 / 2, r3 = Math.min(18e5, i3), s3 = (Math.random() - 0.5) * (r3 - e3);
      return Math.ceil(r3 + s3);
    })(i2), r2 = Date.now() + e2;
    this.Et.push({ retryAt: r2, requestOptions: t2 });
    var s2 = "Enqueued failed request for retry in " + e2;
    navigator.onLine || (s2 += " (Browser is offline)"), $i.warn(s2), this.Rt || (this.Rt = true, this.Dt());
  }
  Dt() {
    if (this.jt && clearTimeout(this.jt), 0 === this.Et.length) return this.Rt = false, void (this.jt = void 0);
    this.jt = setTimeout((() => {
      this.Ct && this.Et.length > 0 && this.Ft(), this.Dt();
    }), this.It);
  }
  Ft() {
    var t2 = Date.now(), i2 = [], e2 = this.Et.filter(((e3) => e3.retryAt < t2 || (i2.push(e3), false)));
    if (this.Et = i2, e2.length > 0) for (var { requestOptions: r2 } of e2) this.retriableRequest(r2);
  }
  unload() {
    for (var { requestOptions: i2 } of (this.jt && (clearTimeout(this.jt), this.jt = void 0), this.Rt = false, M(t) || (this.Ot && (t.removeEventListener("online", this.Ot), this.Ot = void 0), this.Mt && (t.removeEventListener("offline", this.Mt), this.Mt = void 0)), this.Et)) try {
      this._instance._send_request(g({}, i2, { transport: "sendBeacon" }));
    } catch (t2) {
      $i.error(t2);
    }
    this.Et = [];
  }
}
class Ms {
  constructor(t2) {
    this.Lt = () => {
      var t3, i2, e2, r2;
      this.Nt || (this.Nt = {});
      var s2 = this.scrollElement(), n2 = this.scrollY(), o2 = s2 ? Math.max(0, s2.scrollHeight - s2.clientHeight) : 0, a2 = n2 + ((null == s2 ? void 0 : s2.clientHeight) || 0), l2 = (null == s2 ? void 0 : s2.scrollHeight) || 0;
      this.Nt.lastScrollY = Math.ceil(n2), this.Nt.maxScrollY = Math.max(n2, null !== (t3 = this.Nt.maxScrollY) && void 0 !== t3 ? t3 : 0), this.Nt.maxScrollHeight = Math.max(o2, null !== (i2 = this.Nt.maxScrollHeight) && void 0 !== i2 ? i2 : 0), this.Nt.lastContentY = a2, this.Nt.maxContentY = Math.max(a2, null !== (e2 = this.Nt.maxContentY) && void 0 !== e2 ? e2 : 0), this.Nt.maxContentHeight = Math.max(l2, null !== (r2 = this.Nt.maxContentHeight) && void 0 !== r2 ? r2 : 0);
    }, this._instance = t2;
  }
  getContext() {
    return this.Nt;
  }
  resetContext() {
    var t2 = this.Nt;
    return setTimeout(this.Lt, 0), t2;
  }
  startMeasuringScrollPosition() {
    Hi(t, "scroll", this.Lt, { capture: true }), Hi(t, "scrollend", this.Lt, { capture: true }), Hi(t, "resize", this.Lt);
  }
  scrollElement() {
    if (!this._instance.config.scroll_root_selector) return null == t ? void 0 : t.document.documentElement;
    var i2 = I(this._instance.config.scroll_root_selector) ? this._instance.config.scroll_root_selector : [this._instance.config.scroll_root_selector];
    for (var e2 of i2) {
      var r2 = null == t ? void 0 : t.document.querySelector(e2);
      if (r2) return r2;
    }
  }
  scrollY() {
    if (this._instance.config.scroll_root_selector) {
      var i2 = this.scrollElement();
      return i2 && i2.scrollTop || 0;
    }
    return t && (t.scrollY || t.pageYOffset || t.document.documentElement.scrollTop) || 0;
  }
  scrollX() {
    if (this._instance.config.scroll_root_selector) {
      var i2 = this.scrollElement();
      return i2 && i2.scrollLeft || 0;
    }
    return t && (t.scrollX || t.pageXOffset || t.document.documentElement.scrollLeft) || 0;
  }
}
var As = (t2) => gr(null == t2 ? void 0 : t2.config.mask_personal_data_properties, null == t2 ? void 0 : t2.config.custom_personal_data_properties);
class Ds {
  constructor(t2, i2, e2, r2) {
    this.Ut = (t3) => {
      var i3 = this.zt();
      if (!i3 || i3.sessionId !== t3) {
        var e3 = { sessionId: t3, props: this.Ht(this._instance) };
        this.Bt.register({ [_e]: e3 });
      }
    }, this._instance = t2, this.qt = i2, this.Bt = e2, this.Ht = r2 || As, this.qt.onSessionId(this.Ut);
  }
  zt() {
    return this.Bt.props[_e];
  }
  getSetOnceProps() {
    var t2, i2 = null == (t2 = this.zt()) ? void 0 : t2.props;
    return i2 ? "r" in i2 ? mr(i2) : { $referring_domain: i2.referringDomain, $pathname: i2.initialPathName, utm_source: i2.utm_source, utm_campaign: i2.utm_campaign, utm_medium: i2.utm_medium, utm_content: i2.utm_content, utm_term: i2.utm_term } : {};
  }
  getSessionProps() {
    var t2 = {};
    return Ci(ji(this.getSetOnceProps()), ((i2, e2) => {
      "$current_url" === e2 && (e2 = "url"), t2["$session_entry_" + x(e2)] = i2;
    })), t2;
  }
}
class js {
  constructor() {
    this.Vt = {}, this.Vt = {};
  }
  on(t2, i2) {
    return this.Vt[t2] || (this.Vt[t2] = []), this.Vt[t2].push(i2), () => {
      this.Vt[t2] = this.Vt[t2].filter(((t3) => t3 !== i2));
    };
  }
  emit(t2, i2) {
    for (var e2 of this.Vt[t2] || []) e2(i2);
    for (var r2 of this.Vt["*"] || []) r2(t2, i2);
  }
}
var Ls = ki("[SessionId]");
class Ns {
  on(t2, i2) {
    return this.Wt.on(t2, i2);
  }
  constructor(t2, i2, e2) {
    var r2;
    if (this.Gt = [], this.Yt = void 0, this.Wt = new js(), this.Jt = (t3, i3) => !(!U(t3) || !U(i3)) && Math.abs(t3 - i3) > this.sessionTimeoutMs, !t2.persistence) throw new Error("SessionIdManager requires a PostHogPersistence instance");
    if ("always" === t2.config.cookieless_mode) throw new Error('SessionIdManager cannot be used with cookieless_mode="always"');
    this.N = t2.config, this.Bt = t2.persistence, this.Kt = void 0, this.Xt = void 0, this._sessionStartTimestamp = null, this._sessionActivityTimestamp = null, this.Qt = i2 || Ce, this.Zt = e2 || Ce;
    var s2 = this.N.persistence_name || this.N.token, n2 = this.N.session_idle_timeout_seconds || 1800;
    if (this._sessionTimeoutMs = 1e3 * K(n2, 60, 36e3, Ls.createLogger("session_idle_timeout_seconds"), 1800), t2.register({ $configured_session_timeout_ms: this._sessionTimeoutMs }), this.ti(), this.ii = "ph_" + s2 + "_window_id", this.ei = "ph_" + s2 + "_primary_window_exists", this.ri()) {
      var o2 = Be.D(this.ii), a2 = Be.D(this.ei);
      o2 && !a2 ? this.Kt = o2 : Be.L(this.ii), Be.j(this.ei, true);
    }
    if (null != (r2 = this.N.bootstrap) && r2.sessionID) try {
      var l2 = ((t3) => {
        var i3 = t3.replace(/-/g, "");
        if (32 !== i3.length) throw new Error("Not a valid UUID");
        if ("7" !== i3[12]) throw new Error("Not a UUIDv7");
        return parseInt(i3.substring(0, 12), 16);
      })(this.N.bootstrap.sessionID);
      this.si(this.N.bootstrap.sessionID, (/* @__PURE__ */ new Date()).getTime(), l2);
    } catch (t3) {
      Ls.error("Invalid sessionID in bootstrap", t3);
    }
    this.ni();
  }
  get sessionTimeoutMs() {
    return this._sessionTimeoutMs;
  }
  onSessionId(t2) {
    return M(this.Gt) && (this.Gt = []), this.Gt.push(t2), this.Xt && t2(this.Xt, this.Kt), () => {
      this.Gt = this.Gt.filter(((i2) => i2 !== t2));
    };
  }
  ri() {
    return "memory" !== this.N.persistence && !this.Bt.st && Be.F();
  }
  oi(t2) {
    t2 !== this.Kt && (this.Kt = t2, this.ri() && Be.j(this.ii, t2));
  }
  ai() {
    return this.Kt ? this.Kt : this.ri() ? Be.D(this.ii) : null;
  }
  si(t2, i2, e2) {
    t2 === this.Xt && i2 === this._sessionActivityTimestamp && e2 === this._sessionStartTimestamp || (this._sessionStartTimestamp = e2, this._sessionActivityTimestamp = i2, this.Xt = t2, this.Bt.register({ [re]: [i2, t2, e2] }));
  }
  li() {
    var t2 = this.Bt.props[re];
    return I(t2) && 2 === t2.length && t2.push(t2[0]), t2 || [0, null, 0];
  }
  resetSessionId() {
    this.si(null, null, null);
  }
  destroy() {
    clearTimeout(this.ui), this.ui = void 0, this.Yt && t && (t.removeEventListener("beforeunload", this.Yt, { capture: false }), this.Yt = void 0), this.Gt = [];
  }
  ni() {
    this.Yt = () => {
      this.ri() && Be.L(this.ei);
    }, Hi(t, "beforeunload", this.Yt, { capture: false });
  }
  checkAndGetSessionAndWindowId(t2, i2) {
    if (void 0 === t2 && (t2 = false), void 0 === i2 && (i2 = null), "always" === this.N.cookieless_mode) throw new Error('checkAndGetSessionAndWindowId should not be called with cookieless_mode="always"');
    var e2 = i2 || (/* @__PURE__ */ new Date()).getTime(), [r2, s2, n2] = this.li(), o2 = this.ai(), a2 = U(n2) && Math.abs(e2 - n2) > 864e5, l2 = false, u2 = !s2, h2 = !u2 && !t2 && this.Jt(e2, r2);
    u2 || h2 || a2 ? (s2 = this.Qt(), o2 = this.Zt(), Ls.info("new session ID generated", { sessionId: s2, windowId: o2, changeReason: { noSessionId: u2, activityTimeout: h2, sessionPastMaximumLength: a2 } }), n2 = e2, l2 = true) : o2 || (o2 = this.Zt(), l2 = true);
    var d2 = !!U(r2) && t2 && !a2 ? r2 : e2, v2 = !U(n2) ? (/* @__PURE__ */ new Date()).getTime() : n2;
    return this.oi(o2), this.si(s2, d2, v2), t2 || this.ti(), l2 && this.Gt.forEach(((t3) => t3(s2, o2, l2 ? { noSessionId: u2, activityTimeout: h2, sessionPastMaximumLength: a2 } : void 0))), { sessionId: s2, windowId: o2, sessionStartTimestamp: v2, changeReason: l2 ? { noSessionId: u2, activityTimeout: h2, sessionPastMaximumLength: a2 } : void 0, lastActivityTimestamp: r2 };
  }
  ti() {
    clearTimeout(this.ui), this.ui = setTimeout((() => {
      var [t2] = this.li();
      if (this.Jt((/* @__PURE__ */ new Date()).getTime(), t2)) {
        var i2 = this.Xt;
        this.resetSessionId(), this.Wt.emit("forcedIdleReset", { idleSessionId: i2 });
      }
    }), 1.1 * this.sessionTimeoutMs);
  }
}
var Us = function(t2, i2) {
  if (!t2) return false;
  var e2 = t2.userAgent;
  if (e2 && w(e2, i2)) return true;
  try {
    var r2 = null == t2 ? void 0 : t2.userAgentData;
    if (null != r2 && r2.brands && r2.brands.some(((t3) => w(null == t3 ? void 0 : t3.brand, i2)))) return true;
  } catch (t3) {
  }
  return !!t2.webdriver;
}, zs = function(t2, i2) {
  if (!(function(t3) {
    try {
      new RegExp(t3);
    } catch (t4) {
      return false;
    }
    return true;
  })(i2)) return false;
  try {
    return new RegExp(i2).test(t2);
  } catch (t3) {
    return false;
  }
};
function Hs(t2, i2, e2) {
  return Ps({ distinct_id: t2, userPropertiesToSet: i2, userPropertiesToSetOnce: e2 });
}
var Bs = { exact: (t2, i2) => i2.some(((i3) => t2.some(((t3) => i3 === t3)))), is_not: (t2, i2) => i2.every(((i3) => t2.every(((t3) => i3 !== t3)))), regex: (t2, i2) => i2.some(((i3) => t2.some(((t3) => zs(i3, t3))))), not_regex: (t2, i2) => i2.every(((i3) => t2.every(((t3) => !zs(i3, t3))))), icontains: (t2, i2) => i2.map(qs).some(((i3) => t2.map(qs).some(((t3) => i3.includes(t3))))), not_icontains: (t2, i2) => i2.map(qs).every(((i3) => t2.map(qs).every(((t3) => !i3.includes(t3))))), gt: (t2, i2) => i2.some(((i3) => {
  var e2 = parseFloat(i3);
  return !isNaN(e2) && t2.some(((t3) => e2 > parseFloat(t3)));
})), lt: (t2, i2) => i2.some(((i3) => {
  var e2 = parseFloat(i3);
  return !isNaN(e2) && t2.some(((t3) => e2 < parseFloat(t3)));
})) }, qs = (t2) => t2.toLowerCase();
function Vs(t2, i2) {
  return !t2 || Object.entries(t2).every(((t3) => {
    var [e2, r2] = t3, s2 = null == i2 ? void 0 : i2[e2];
    if (M(s2) || j(s2)) return false;
    var n2 = [String(s2)], o2 = Bs[r2.operator];
    return !!o2 && o2(r2.values, n2);
  }));
}
var Ws = (function(t2) {
  return t2.US = "us", t2.EU = "eu", t2.CUSTOM = "custom", t2;
})({}), Gs = "i.posthog.com";
class Ys {
  constructor(t2) {
    this.hi = {}, this.instance = t2;
  }
  get apiHost() {
    var t2 = this.instance.config.api_host.trim().replace(/\/$/, "");
    return "https://app.posthog.com" === t2 ? "https://us.i.posthog.com" : t2;
  }
  get flagsApiHost() {
    var t2 = this.instance.config.flags_api_host;
    return t2 ? t2.trim().replace(/\/$/, "") : this.apiHost;
  }
  get uiHost() {
    var t2, i2 = null == (t2 = this.instance.config.ui_host) ? void 0 : t2.replace(/\/$/, "");
    return i2 || (i2 = this.apiHost.replace("." + Gs, ".posthog.com")), "https://app.posthog.com" === i2 ? "https://us.posthog.com" : i2;
  }
  get region() {
    return this.hi[this.apiHost] || (/https:\/\/(app|us|us-assets)(\.i)?\.posthog\.com/i.test(this.apiHost) ? this.hi[this.apiHost] = Ws.US : /https:\/\/(eu|eu-assets)(\.i)?\.posthog\.com/i.test(this.apiHost) ? this.hi[this.apiHost] = Ws.EU : this.hi[this.apiHost] = Ws.CUSTOM), this.hi[this.apiHost];
  }
  endpointFor(t2, i2) {
    if (void 0 === i2 && (i2 = ""), i2 && (i2 = "/" === i2[0] ? i2 : "/" + i2), "ui" === t2) return this.uiHost + i2;
    if ("flags" === t2) return this.flagsApiHost + i2;
    if (this.region === Ws.CUSTOM) return this.apiHost + i2;
    var e2 = Gs + i2;
    switch (t2) {
      case "assets":
        return "https://" + this.region + "-assets." + e2;
      case "api":
        return "https://" + this.region + "." + e2;
    }
  }
}
var Js = ki("[Surveys]");
var Ks = "seenSurvey_", Xs = (t2, i2) => {
  var e2 = "$survey_" + i2 + "/" + t2.id;
  return t2.current_iteration && t2.current_iteration > 0 && (e2 = "$survey_" + i2 + "/" + t2.id + "/" + t2.current_iteration), e2;
}, Qs = (t2) => ((t3, i2) => {
  var e2 = "" + t3 + i2.id;
  return i2.current_iteration && i2.current_iteration > 0 && (e2 = "" + t3 + i2.id + "_" + i2.current_iteration), e2;
})(Ks, t2), Zs = [Tr.Popover, Tr.Widget, Tr.API], tn = { ignoreConditions: false, ignoreDelay: false, displayType: Mr.Popover }, en = ki("[PostHog ExternalIntegrations]"), rn = { intercom: "intercom-integration", crispChat: "crisp-chat-integration" };
class sn {
  constructor(t2) {
    this._instance = t2;
  }
  G(t2, i2) {
    var e2;
    null == (e2 = v.__PosthogExtensions__) || null == e2.loadExternalDependency || e2.loadExternalDependency(this._instance, t2, ((t3) => {
      if (t3) return en.error("failed to load script", t3);
      i2();
    }));
  }
  startIfEnabledOrStop() {
    var t2 = this, i2 = function(i3) {
      var e3, s3, n2;
      (!r2 || null != (e3 = v.__PosthogExtensions__) && null != (e3 = e3.integrations) && e3[i3] || t2.G(rn[i3], (() => {
        var e4;
        null == (e4 = v.__PosthogExtensions__) || null == (e4 = e4.integrations) || null == (e4 = e4[i3]) || e4.start(t2._instance);
      })), !r2 && null != (s3 = v.__PosthogExtensions__) && null != (s3 = s3.integrations) && s3[i3]) && (null == (n2 = v.__PosthogExtensions__) || null == (n2 = n2.integrations) || null == (n2 = n2[i3]) || n2.stop());
    };
    for (var [e2, r2] of Object.entries(null !== (s2 = this._instance.config.integrations) && void 0 !== s2 ? s2 : {})) {
      var s2;
      i2(e2);
    }
  }
}
var nn = {}, on = 0, an = () => {
}, ln = "posthog", un = !$s && -1 === (null == d ? void 0 : d.indexOf("MSIE")) && -1 === (null == d ? void 0 : d.indexOf("Mozilla")), hn = (i2) => {
  var e2;
  return g({ api_host: "https://us.i.posthog.com", flags_api_host: null, ui_host: null, token: "", autocapture: true, cross_subdomain_cookie: Ui(null == o ? void 0 : o.location), persistence: "localStorage+cookie", persistence_name: "", cookie_persisted_properties: [], loaded: an, save_campaign_params: true, custom_campaign_params: [], custom_blocked_useragents: [], save_referrer: true, capture_pageleave: "if_capture_pageview", defaults: null != i2 ? i2 : "unset", __preview_deferred_init_extensions: false, debug: a && A(null == a ? void 0 : a.search) && -1 !== a.search.indexOf("__posthog_debug=true") || false, cookie_expiration: 365, upgrade: false, disable_session_recording: false, disable_persistence: false, disable_web_experiments: true, disable_surveys: false, disable_surveys_automatic_display: false, disable_conversations: false, disable_product_tours: false, disable_external_dependency_loading: false, enable_recording_console_log: void 0, secure_cookie: "https:" === (null == t || null == (e2 = t.location) ? void 0 : e2.protocol), ip: false, opt_out_capturing_by_default: false, opt_out_persistence_by_default: false, opt_out_useragent_filter: false, opt_out_capturing_persistence_type: "localStorage", consent_persistence_name: null, opt_out_capturing_cookie_prefix: null, opt_in_site_apps: false, property_denylist: [], respect_dnt: false, sanitize_properties: null, request_headers: {}, request_batching: true, properties_string_max_length: 65535, mask_all_element_attributes: false, mask_all_text: false, mask_personal_data_properties: false, custom_personal_data_properties: [], advanced_disable_flags: false, advanced_disable_decide: false, advanced_disable_feature_flags: false, advanced_disable_feature_flags_on_first_load: false, advanced_only_evaluate_survey_feature_flags: false, advanced_feature_flags_dedup_per_session: false, advanced_enable_surveys: false, advanced_disable_toolbar_metrics: false, feature_flag_request_timeout_ms: 3e3, surveys_request_timeout_ms: 1e4, on_request_error: (t2) => {
    var i3 = "Bad HTTP status: " + t2.statusCode + " " + t2.text;
    $i.error(i3);
  }, get_device_id: (t2) => t2, capture_performance: void 0, name: "posthog", bootstrap: {}, disable_compression: false, session_idle_timeout_seconds: 1800, person_profiles: "identified_only", before_send: void 0, request_queue_config: { flush_interval_ms: Is }, error_tracking: {}, _onCapture: an, __preview_eager_load_replay: false }, ((t2) => ({ rageclick: !(t2 && t2 >= "2025-11-30") || { content_ignorelist: true }, capture_pageview: !(t2 && t2 >= "2025-05-24") || "history_change", session_recording: t2 && t2 >= "2025-11-30" ? { strictMinimumDuration: true } : {}, external_scripts_inject_target: t2 && t2 >= "2026-01-30" ? "head" : "body", internal_or_test_user_hostname: t2 && t2 >= "2026-01-30" ? /^(localhost|127\.0\.0\.1)$/ : void 0 }))(i2));
}, dn = (t2) => {
  var i2 = {};
  M(t2.process_person) || (i2.person_profiles = t2.process_person), M(t2.xhr_headers) || (i2.request_headers = t2.xhr_headers), M(t2.cookie_name) || (i2.persistence_name = t2.cookie_name), M(t2.disable_cookie) || (i2.disable_persistence = t2.disable_cookie), M(t2.store_google) || (i2.save_campaign_params = t2.store_google), M(t2.verbose) || (i2.debug = t2.verbose);
  var e2 = Oi({}, i2, t2);
  return I(t2.property_blacklist) && (M(t2.property_denylist) ? e2.property_denylist = t2.property_blacklist : I(t2.property_denylist) ? e2.property_denylist = [...t2.property_blacklist, ...t2.property_denylist] : $i.error("Invalid value for property_denylist config: " + t2.property_denylist)), e2;
};
class vn {
  constructor() {
    this.__forceAllowLocalhost = false;
  }
  get di() {
    return this.__forceAllowLocalhost;
  }
  set di(t2) {
    $i.error("WebPerformanceObserver is deprecated and has no impact on network capture. Use `_forceAllowLocalhostNetworkCapture` on `posthog.sessionRecording`"), this.__forceAllowLocalhost = t2;
  }
}
class cn {
  vi(t2, i2) {
    if (t2) {
      var e2 = this.ci.indexOf(t2);
      -1 !== e2 && this.ci.splice(e2, 1);
    }
    return this.ci.push(i2), null == i2.initialize || i2.initialize(), i2;
  }
  get decideEndpointWasHit() {
    var t2, i2;
    return null !== (t2 = null == (i2 = this.featureFlags) ? void 0 : i2.hasLoadedFlags) && void 0 !== t2 && t2;
  }
  get flagsEndpointWasHit() {
    var t2, i2;
    return null !== (t2 = null == (i2 = this.featureFlags) ? void 0 : i2.hasLoadedFlags) && void 0 !== t2 && t2;
  }
  constructor() {
    var t2;
    this.webPerformance = new vn(), this.fi = false, this.version = f.LIB_VERSION, this.pi = new js(), this.ci = [], this._calculate_event_properties = this.calculateEventProperties.bind(this), this.config = hn(), this.SentryIntegration = tr, this.sentryIntegration = (t3) => (function(t4, i3) {
      var e2 = Ze(t4, i3);
      return { name: Qe, processEvent: (t5) => e2(t5) };
    })(this, t3), this.__request_queue = [], this.__loaded = false, this.analyticsDefaultEndpoint = "/e/", this.gi = false, this.mi = null, this.bi = null, this.yi = null, this.scrollManager = new Ms(this), this.pageViewManager = new ir(this), this.rateLimiter = new Nr(this), this.requestRouter = new Ys(this), this.consent = new Ve(this), this.externalIntegrations = new sn(this);
    var i2 = null !== (t2 = cn.__defaultExtensionClasses) && void 0 !== t2 ? t2 : {};
    this.featureFlags = i2.featureFlags && new i2.featureFlags(this), this.toolbar = i2.toolbar && new i2.toolbar(this), this.surveys = i2.surveys && new i2.surveys(this), this.conversations = i2.conversations && new i2.conversations(this), this.logs = i2.logs && new i2.logs(this), this.experiments = i2.experiments && new i2.experiments(this), this.exceptions = i2.exceptions && new i2.exceptions(this), this.people = { set: (t3, i3, e2) => {
      var r2 = A(t3) ? { [t3]: i3 } : t3;
      this.setPersonProperties(r2), null == e2 || e2({});
    }, set_once: (t3, i3, e2) => {
      var r2 = A(t3) ? { [t3]: i3 } : t3;
      this.setPersonProperties(void 0, r2), null == e2 || e2({});
    } }, this.on("eventCaptured", ((t3) => $i.info('send "' + (null == t3 ? void 0 : t3.event) + '"', t3)));
  }
  init(t2, i2, e2) {
    if (e2 && e2 !== ln) {
      var r2, s2 = null !== (r2 = nn[e2]) && void 0 !== r2 ? r2 : new cn();
      return s2._init(t2, i2, e2), nn[e2] = s2, nn[ln][e2] = s2, s2;
    }
    return this._init(t2, i2, e2);
  }
  _init(i2, e2, r2) {
    var s2;
    if (void 0 === e2 && (e2 = {}), M(i2) || D(i2)) return $i.critical("PostHog was initialized without a token. This likely indicates a misconfiguration. Please check the first argument passed to posthog.init()"), this;
    if (this.__loaded) return console.warn("[PostHog.js]", "You have already initialized PostHog! Re-initializing is a no-op"), this;
    this.__loaded = true, this.config = {}, e2.debug = this.wi(e2.debug), this.Ei = e2, this.Si = [], e2.person_profiles ? this.bi = e2.person_profiles : e2.process_person && (this.bi = e2.process_person), this.set_config(Oi({}, hn(e2.defaults), dn(e2), { name: r2, token: i2 })), this.config.on_xhr_error && $i.error("on_xhr_error is deprecated. Use on_request_error instead"), this.compression = e2.disable_compression ? void 0 : Br.GZipJS;
    var n2 = this.xi();
    this.persistence = new Sr(this.config, n2), this.sessionPersistence = "sessionStorage" === this.config.persistence || "memory" === this.config.persistence ? this.persistence : new Sr(g({}, this.config, { persistence: "sessionStorage" }), n2);
    var o2 = g({}, this.persistence.props), a2 = g({}, this.sessionPersistence.props);
    this.register({ $initialization_time: (/* @__PURE__ */ new Date()).toISOString() }), this.$i = new Cs(((t2) => this.ki(t2)), this.config.request_queue_config), this.Pi = new Fs(this), this.__request_queue = [];
    var l2 = "always" === this.config.cookieless_mode || "on_reject" === this.config.cookieless_mode && this.consent.isExplicitlyOptedOut();
    if (l2 || (this.sessionManager = new Ns(this), this.sessionPropsManager = new Ds(this, this.sessionManager, this.persistence)), this.config.__preview_deferred_init_extensions ? ($i.info("Deferring extension initialization to improve startup performance"), setTimeout((() => {
      this.Ti(l2);
    }), 0)) : ($i.info("Initializing extensions synchronously"), this.Ti(l2)), f.DEBUG = f.DEBUG || this.config.debug, f.DEBUG && $i.info("Starting in debug mode", { this: this, config: e2, thisC: g({}, this.config), p: o2, s: a2 }), void 0 !== (null == (s2 = e2.bootstrap) ? void 0 : s2.distinctID)) {
      var u2 = e2.bootstrap.distinctID, h2 = this.get_distinct_id(), d2 = this.persistence.get_property(pe);
      if (e2.bootstrap.isIdentifiedID && null != h2 && h2 !== u2 && "anonymous" === d2) this.identify(u2);
      else if (e2.bootstrap.isIdentifiedID && null != h2 && h2 !== u2 && "identified" === d2) $i.warn("Bootstrap distinctID differs from an already-identified user. The existing identity is preserved. Call reset() before reinitializing if you intend to switch users.");
      else {
        var v2 = this.config.get_device_id(Ce()), c2 = e2.bootstrap.isIdentifiedID ? v2 : u2;
        this.persistence.set_property(pe, e2.bootstrap.isIdentifiedID ? "identified" : "anonymous"), this.register({ distinct_id: u2, $device_id: c2 });
      }
    }
    if (l2) this.register_once({ distinct_id: Se, $device_id: null }, "");
    else if (!this.get_distinct_id()) {
      var p2 = this.config.get_device_id(Ce());
      this.register_once({ distinct_id: p2, $device_id: p2 }, ""), this.persistence.set_property(pe, "anonymous");
    }
    return Hi(t, "onpagehide" in self ? "pagehide" : "unload", this._handle_unload.bind(this), { passive: false }), e2.segment ? Xe(this, (() => this.Ri())) : this.Ri(), C(this.config._onCapture) && this.config._onCapture !== an && ($i.warn("onCapture is deprecated. Please use `before_send` instead"), this.on("eventCaptured", ((t2) => this.config._onCapture(t2.event, t2)))), this.config.ip && $i.warn('The `ip` config option has NO EFFECT AT ALL and has been deprecated. Use a custom transformation or "Discard IP data" project setting instead. See https://posthog.com/tutorials/web-redact-properties#hiding-customer-ip-address for more information.'), this;
  }
  Ti(t2) {
    var i2, e2, r2, s2, n2, o2, a2, l2 = performance.now(), u2 = g({}, cn.__defaultExtensionClasses, this.config.__extensionClasses), h2 = [];
    u2.featureFlags && this.ci.push(this.featureFlags = null !== (i2 = this.featureFlags) && void 0 !== i2 ? i2 : new u2.featureFlags(this));
    u2.exceptions && this.ci.push(this.exceptions = null !== (e2 = this.exceptions) && void 0 !== e2 ? e2 : new u2.exceptions(this));
    (u2.historyAutocapture && this.ci.push(this.historyAutocapture = new u2.historyAutocapture(this)), u2.tracingHeaders && this.ci.push(new u2.tracingHeaders(this)), u2.siteApps && this.ci.push(this.siteApps = new u2.siteApps(this)), u2.sessionRecording && !t2 && this.ci.push(this.sessionRecording = new u2.sessionRecording(this)), this.config.disable_scroll_properties || h2.push((() => {
      this.scrollManager.startMeasuringScrollPosition();
    })), u2.autocapture && this.ci.push(this.autocapture = new u2.autocapture(this)), u2.surveys) && this.ci.push(this.surveys = null !== (r2 = this.surveys) && void 0 !== r2 ? r2 : new u2.surveys(this));
    u2.logs && this.ci.push(this.logs = null !== (s2 = this.logs) && void 0 !== s2 ? s2 : new u2.logs(this));
    u2.conversations && this.ci.push(this.conversations = null !== (n2 = this.conversations) && void 0 !== n2 ? n2 : new u2.conversations(this));
    (u2.productTours && this.ci.push(this.productTours = new u2.productTours(this)), u2.heatmaps && this.ci.push(this.heatmaps = new u2.heatmaps(this)), u2.webVitalsAutocapture && this.ci.push(this.webVitalsAutocapture = new u2.webVitalsAutocapture(this)), u2.exceptionObserver && this.ci.push(this.exceptionObserver = new u2.exceptionObserver(this)), u2.deadClicksAutocapture && this.ci.push(this.deadClicksAutocapture = new u2.deadClicksAutocapture(this, Ye)), u2.toolbar) && this.ci.push(this.toolbar = null !== (o2 = this.toolbar) && void 0 !== o2 ? o2 : new u2.toolbar(this));
    u2.experiments && this.ci.push(this.experiments = null !== (a2 = this.experiments) && void 0 !== a2 ? a2 : new u2.experiments(this));
    this.ci.forEach(((t3) => {
      t3.initialize && h2.push((() => {
        null == t3.initialize || t3.initialize();
      }));
    })), h2.push((() => {
      if (this.Ii) {
        var t3 = this.Ii;
        this.Ii = void 0, this.ft(t3);
      }
    })), this.Ci(h2, l2);
  }
  Ci(t2, i2) {
    for (; t2.length > 0; ) {
      if (this.config.__preview_deferred_init_extensions) {
        if (performance.now() - i2 >= 30 && t2.length > 0) return void setTimeout((() => {
          this.Ci(t2, i2);
        }), 0);
      }
      var e2 = t2.shift();
      if (e2) try {
        e2();
      } catch (t3) {
        $i.error("Error initializing extension:", t3);
      }
    }
    var r2 = Math.round(performance.now() - i2);
    this.register_for_session({ $sdk_debug_extensions_init_method: this.config.__preview_deferred_init_extensions ? "deferred" : "synchronous", $sdk_debug_extensions_init_time_ms: r2 }), this.config.__preview_deferred_init_extensions && $i.info("PostHog extensions initialized (" + r2 + "ms)");
  }
  ft(t2) {
    var i2;
    if (!o || !o.body) return $i.info("document not ready yet, trying again in 500 milliseconds..."), void setTimeout((() => {
      this.ft(t2);
    }), 500);
    this.config.__preview_deferred_init_extensions && (this.Ii = t2), this.compression = void 0, t2.supportedCompression && !this.config.disable_compression && (this.compression = E(t2.supportedCompression, Br.GZipJS) ? Br.GZipJS : E(t2.supportedCompression, Br.Base64) ? Br.Base64 : void 0), null != (i2 = t2.analytics) && i2.endpoint && (this.analyticsDefaultEndpoint = t2.analytics.endpoint), this.set_config({ person_profiles: this.bi ? this.bi : "identified_only" }), this.ci.forEach(((i3) => null == i3.onRemoteConfig ? void 0 : i3.onRemoteConfig(t2)));
  }
  Ri() {
    try {
      this.config.loaded(this);
    } catch (t3) {
      $i.critical("`loaded` function failed", t3);
    }
    if (this.Oi(), this.config.internal_or_test_user_hostname && null != a && a.hostname) {
      var t2 = a.hostname, i2 = this.config.internal_or_test_user_hostname;
      ("string" == typeof i2 ? t2 === i2 : i2.test(t2)) && this.setInternalOrTestUser();
    }
    this.config.capture_pageview && setTimeout((() => {
      (this.consent.isOptedIn() || "always" === this.config.cookieless_mode) && this.Fi();
    }), 1), this.Mi = new zr(this), this.Mi.load();
  }
  Oi() {
    var t2;
    this.is_capturing() && (this.config.request_batching && (null == (t2 = this.$i) || t2.enable()));
  }
  _dom_loaded() {
    this.is_capturing() && Ii(this.__request_queue, ((t2) => this.ki(t2))), this.__request_queue = [], this.Oi();
  }
  _handle_unload() {
    var t2, i2, e2;
    null == (t2 = this.surveys) || t2.handlePageUnload(), this.config.request_batching ? (this.Ai() && this.capture("$pageleave"), null == (i2 = this.$i) || i2.unload(), null == (e2 = this.Pi) || e2.unload()) : this.Ai() && this.capture("$pageleave", null, { transport: "sendBeacon" });
  }
  _send_request(t2) {
    this.__loaded && (un ? this.__request_queue.push(t2) : this.rateLimiter.isServerRateLimited(t2.batchKey) || (t2.transport = t2.transport || this.config.api_transport, t2.url = ks(t2.url, { ip: this.config.ip ? 1 : 0 }), t2.headers = g({}, this.config.request_headers, t2.headers), t2.compression = "best-available" === t2.compression ? this.compression : t2.compression, t2.disableXHRCredentials = this.config.__preview_disable_xhr_credentials, this.config.__preview_disable_beacon && (t2.disableTransport = ["sendBeacon"]), t2.fetchOptions = t2.fetchOptions || this.config.fetch_options, ((t3) => {
      var i2, e2, r2, s2 = g({}, t3);
      s2.timeout = s2.timeout || 6e4, s2.url = ks(s2.url, { _: (/* @__PURE__ */ new Date()).getTime().toString(), ver: f.JS_SDK_VERSION, compression: s2.compression });
      var n2 = null !== (i2 = s2.transport) && void 0 !== i2 ? i2 : "fetch", o2 = Rs.filter(((t4) => !s2.disableTransport || !t4.transport || !s2.disableTransport.includes(t4.transport))), a2 = null !== (e2 = null == (r2 = zi(o2, ((t4) => t4.transport === n2))) ? void 0 : r2.method) && void 0 !== e2 ? e2 : o2[0].method;
      if (!a2) throw new Error("No available transport method");
      a2(s2);
    })(g({}, t2, { callback: (i2) => {
      var e2, r2;
      (this.rateLimiter.checkForLimiting(i2), i2.statusCode >= 400) && (null == (e2 = (r2 = this.config).on_request_error) || e2.call(r2, i2));
      null == t2.callback || t2.callback(i2);
    } }))));
  }
  ki(t2) {
    this.Pi ? this.Pi.retriableRequest(t2) : this._send_request(t2);
  }
  _execute_array(t2) {
    on++;
    try {
      var i2, e2 = [], r2 = [], s2 = [];
      Ii(t2, ((t3) => {
        t3 && (i2 = t3[0], I(i2) ? s2.push(t3) : C(t3) ? t3.call(this) : I(t3) && "alias" === i2 ? e2.push(t3) : I(t3) && -1 !== i2.indexOf("capture") && C(this[i2]) ? s2.push(t3) : r2.push(t3));
      }));
      var n2 = function(t3, i3) {
        Ii(t3, (function(t4) {
          if (I(t4[0])) {
            var e3 = i3;
            Ci(t4, (function(t5) {
              e3 = e3[t5[0]].apply(e3, t5.slice(1));
            }));
          } else this[t4[0]].apply(this, t4.slice(1));
        }), i3);
      };
      n2(e2, this), n2(r2, this), n2(s2, this);
    } finally {
      on--;
    }
  }
  push(t2) {
    if (on > 0 && I(t2) && A(t2[0])) {
      var i2 = cn.prototype[t2[0]];
      C(i2) && i2.apply(this, t2.slice(1));
    } else this._execute_array([t2]);
  }
  capture(t2, i2, e2) {
    var r2;
    if (this.__loaded && this.persistence && this.sessionPersistence && this.$i) {
      if (this.is_capturing()) if (!M(t2) && A(t2)) {
        var s2 = !this.config.opt_out_useragent_filter && this._is_bot();
        if (!(s2 && !this.config.__preview_capture_bot_pageviews)) {
          var n2 = null != e2 && e2.skip_client_rate_limiting ? void 0 : this.rateLimiter.clientRateLimitContext();
          if (null == n2 || !n2.isRateLimited) {
            null != i2 && i2.$current_url && !A(null == i2 ? void 0 : i2.$current_url) && ($i.error("Invalid `$current_url` property provided to `posthog.capture`. Input must be a string. Ignoring provided value."), null == i2 || delete i2.$current_url), "$exception" !== t2 || null != e2 && e2.Di || $i.warn("Using `posthog.capture('$exception')` is unreliable because it does not attach required metadata. Use `posthog.captureException(error)` instead, which attaches required metadata automatically."), this.sessionPersistence.update_search_keyword(), this.config.save_campaign_params && this.sessionPersistence.update_campaign_params(), this.config.save_referrer && this.sessionPersistence.update_referrer_info(), (this.config.save_campaign_params || this.config.save_referrer) && this.persistence.set_initial_person_info();
            var o2 = /* @__PURE__ */ new Date(), a2 = (null == e2 ? void 0 : e2.timestamp) || o2, l2 = Ce(), u2 = { uuid: l2, event: t2, properties: this.calculateEventProperties(t2, i2 || {}, a2, l2) };
            "$pageview" === t2 && this.config.__preview_capture_bot_pageviews && s2 && (u2.event = "$bot_pageview", u2.properties.$browser_type = "bot"), n2 && (u2.properties.$lib_rate_limit_remaining_tokens = n2.remainingTokens), (null == e2 ? void 0 : e2.$set) && (u2.$set = null == e2 ? void 0 : e2.$set);
            var h2, d2 = "$groupidentify" !== t2, v2 = "$identify" === t2, c2 = this.ji(null == e2 ? void 0 : e2.$set_once, d2, v2);
            if (c2 && (u2.$set_once = c2), (u2 = Li(u2, null != e2 && e2._noTruncate ? null : this.config.properties_string_max_length)).timestamp = a2, M(null == e2 ? void 0 : e2.timestamp) || (u2.properties.$event_time_override_provided = true, u2.properties.$event_time_override_system_time = o2), t2 === Or.DISMISSED || t2 === Or.SENT) {
              var f2 = null == i2 ? void 0 : i2[Fr.SURVEY_ID], p2 = null == i2 ? void 0 : i2[Fr.SURVEY_ITERATION];
              h2 = { id: f2, current_iteration: p2 }, localStorage.getItem(Qs(h2)) || localStorage.setItem(Qs(h2), "true"), u2.$set = g({}, u2.$set, { [Xs({ id: f2, current_iteration: p2 }, t2 === Or.SENT ? "responded" : "dismissed")]: true });
            } else t2 === Or.SHOWN && (u2.$set = g({}, u2.$set, { [Fr.SURVEY_LAST_SEEN_DATE]: (/* @__PURE__ */ new Date()).toISOString() }));
            if (t2 === Dr.SHOWN) {
              var _2 = null == i2 ? void 0 : i2[jr.TOUR_TYPE];
              _2 && (u2.$set = g({}, u2.$set, { [jr.TOUR_LAST_SEEN_DATE + "/" + _2]: (/* @__PURE__ */ new Date()).toISOString() }));
            }
            var m2 = g({}, u2.properties.$set, u2.$set);
            if (F(m2) || this.setPersonPropertiesForFlags(m2), !L(this.config.before_send)) {
              var b2 = this.Li(u2);
              if (!b2) return;
              u2 = b2;
            }
            this.pi.emit("eventCaptured", u2);
            var y2 = { method: "POST", url: null !== (r2 = null == e2 ? void 0 : e2._url) && void 0 !== r2 ? r2 : this.requestRouter.endpointFor("api", this.analyticsDefaultEndpoint), data: u2, compression: "best-available", batchKey: null == e2 ? void 0 : e2._batchKey };
            return !this.config.request_batching || e2 && (null == e2 || !e2._batchKey) || null != e2 && e2.send_instantly ? this.ki(y2) : this.$i.enqueue(y2), u2;
          }
          $i.critical("This capture call is ignored due to client rate limiting.");
        }
      } else $i.error("No event name provided to posthog.capture");
    } else $i.uninitializedWarning("posthog.capture");
  }
  _addCaptureHook(t2) {
    return this.on("eventCaptured", ((i2) => t2(i2.event, i2)));
  }
  calculateEventProperties(t2, i2, e2, r2, s2) {
    if (e2 = e2 || /* @__PURE__ */ new Date(), !this.persistence || !this.sessionPersistence) return i2;
    var n2 = s2 ? void 0 : this.persistence.remove_event_timer(t2), a2 = g({}, i2);
    if (a2.token = this.config.token, a2.$config_defaults = this.config.defaults, ("always" == this.config.cookieless_mode || "on_reject" == this.config.cookieless_mode && this.consent.isExplicitlyOptedOut()) && (a2.$cookieless_mode = true), "$snapshot" === t2) {
      var l2 = g({}, this.persistence.properties(), this.sessionPersistence.properties());
      return a2.distinct_id = l2.distinct_id, (!A(a2.distinct_id) && !N(a2.distinct_id) || D(a2.distinct_id)) && $i.error("Invalid distinct_id for replay event. This indicates a bug in your implementation"), a2;
    }
    var u2, h2 = wr(this.config.mask_personal_data_properties, this.config.custom_personal_data_properties);
    if (this.sessionManager) {
      var { sessionId: v2, windowId: c2 } = this.sessionManager.checkAndGetSessionAndWindowId(s2, e2.getTime());
      a2.$session_id = v2, a2.$window_id = c2;
    }
    this.sessionPropsManager && Oi(a2, this.sessionPropsManager.getSessionProps());
    try {
      var f2;
      this.sessionRecording && Oi(a2, this.sessionRecording.sdkDebugProperties), a2.$sdk_debug_retry_queue_size = null == (f2 = this.Pi) ? void 0 : f2.length;
    } catch (t3) {
      a2.$sdk_debug_error_capturing_properties = String(t3);
    }
    if (this.requestRouter.region === Ws.CUSTOM && (a2.$lib_custom_api_host = this.config.api_host), u2 = "$pageview" !== t2 || s2 ? "$pageleave" !== t2 || s2 ? this.pageViewManager.doEvent() : this.pageViewManager.doPageLeave(e2) : this.pageViewManager.doPageView(e2, r2), a2 = Oi(a2, u2), "$pageview" === t2 && o && (a2.title = o.title), !M(n2)) {
      var p2 = e2.getTime() - n2;
      a2.$duration = parseFloat((p2 / 1e3).toFixed(3));
    }
    d && this.config.opt_out_useragent_filter && (a2.$browser_type = this._is_bot() ? "bot" : "browser"), (a2 = Oi({}, h2, this.persistence.properties(), this.sessionPersistence.properties(), a2)).$is_identified = this._isIdentified(), I(this.config.property_denylist) ? Ci(this.config.property_denylist, (function(t3) {
      delete a2[t3];
    })) : $i.error("Invalid value for property_denylist config: " + this.config.property_denylist + " or property_blacklist config: " + this.config.property_blacklist);
    var _2 = this.config.sanitize_properties;
    _2 && ($i.error("sanitize_properties is deprecated. Use before_send instead"), a2 = _2(a2, t2));
    var m2 = this.Ni();
    return a2.$process_person_profile = m2, m2 && !s2 && this.Ui("_calculate_event_properties"), a2;
  }
  ji(t2, i2, e2) {
    var r2;
    if (void 0 === i2 && (i2 = true), void 0 === e2 && (e2 = false), !this.persistence || !this.Ni()) return t2;
    if (this.fi && !e2) return t2;
    var s2 = this.persistence.get_initial_props(), n2 = null == (r2 = this.sessionPropsManager) ? void 0 : r2.getSetOnceProps(), o2 = Oi({}, s2, n2 || {}, t2 || {}), a2 = this.config.sanitize_properties;
    return a2 && ($i.error("sanitize_properties is deprecated. Use before_send instead"), o2 = a2(o2, "$set_once")), i2 && (this.fi = true), F(o2) ? void 0 : o2;
  }
  register(t2, i2) {
    var e2;
    null == (e2 = this.persistence) || e2.register(t2, i2);
  }
  register_once(t2, i2, e2) {
    var r2;
    null == (r2 = this.persistence) || r2.register_once(t2, i2, e2);
  }
  register_for_session(t2) {
    var i2;
    null == (i2 = this.sessionPersistence) || i2.register(t2);
  }
  unregister(t2) {
    var i2;
    null == (i2 = this.persistence) || i2.unregister(t2);
  }
  unregister_for_session(t2) {
    var i2;
    null == (i2 = this.sessionPersistence) || i2.unregister(t2);
  }
  zi(t2, i2) {
    this.register({ [t2]: i2 });
  }
  getFeatureFlag(t2, i2) {
    var e2;
    return null == (e2 = this.featureFlags) ? void 0 : e2.getFeatureFlag(t2, i2);
  }
  getFeatureFlagPayload(t2) {
    var i2;
    return null == (i2 = this.featureFlags) ? void 0 : i2.getFeatureFlagPayload(t2);
  }
  getFeatureFlagResult(t2, i2) {
    var e2;
    return null == (e2 = this.featureFlags) ? void 0 : e2.getFeatureFlagResult(t2, i2);
  }
  isFeatureEnabled(t2, i2) {
    var e2;
    return null == (e2 = this.featureFlags) ? void 0 : e2.isFeatureEnabled(t2, i2);
  }
  reloadFeatureFlags() {
    var t2;
    null == (t2 = this.featureFlags) || t2.reloadFeatureFlags();
  }
  updateFlags(t2, i2, e2) {
    var r2;
    null == (r2 = this.featureFlags) || r2.updateFlags(t2, i2, e2);
  }
  updateEarlyAccessFeatureEnrollment(t2, i2, e2) {
    var r2;
    null == (r2 = this.featureFlags) || r2.updateEarlyAccessFeatureEnrollment(t2, i2, e2);
  }
  getEarlyAccessFeatures(t2, i2, e2) {
    var r2;
    return void 0 === i2 && (i2 = false), null == (r2 = this.featureFlags) ? void 0 : r2.getEarlyAccessFeatures(t2, i2, e2);
  }
  on(t2, i2) {
    return this.pi.on(t2, i2);
  }
  onFeatureFlags(t2) {
    return this.featureFlags ? this.featureFlags.onFeatureFlags(t2) : (t2([], {}, { errorsLoading: true }), () => {
    });
  }
  onSurveysLoaded(t2) {
    return this.surveys ? this.surveys.onSurveysLoaded(t2) : (t2([], { isLoaded: false, error: "Surveys module not available" }), () => {
    });
  }
  onSessionId(t2) {
    var i2, e2;
    return null !== (i2 = null == (e2 = this.sessionManager) ? void 0 : e2.onSessionId(t2)) && void 0 !== i2 ? i2 : () => {
    };
  }
  getSurveys(t2, i2) {
    void 0 === i2 && (i2 = false), this.surveys ? this.surveys.getSurveys(t2, i2) : t2([], { isLoaded: false, error: "Surveys module not available" });
  }
  getActiveMatchingSurveys(t2, i2) {
    void 0 === i2 && (i2 = false), this.surveys ? this.surveys.getActiveMatchingSurveys(t2, i2) : t2([], { isLoaded: false, error: "Surveys module not available" });
  }
  renderSurvey(t2, i2) {
    var e2;
    null == (e2 = this.surveys) || e2.renderSurvey(t2, i2);
  }
  displaySurvey(t2, i2) {
    var e2;
    void 0 === i2 && (i2 = tn), null == (e2 = this.surveys) || e2.displaySurvey(t2, i2);
  }
  cancelPendingSurvey(t2) {
    var i2;
    null == (i2 = this.surveys) || i2.cancelPendingSurvey(t2);
  }
  canRenderSurvey(t2) {
    var i2, e2;
    return null !== (i2 = null == (e2 = this.surveys) ? void 0 : e2.canRenderSurvey(t2)) && void 0 !== i2 ? i2 : { visible: false, disabledReason: "Surveys module not available" };
  }
  canRenderSurveyAsync(t2, i2) {
    var e2, r2;
    return void 0 === i2 && (i2 = false), null !== (e2 = null == (r2 = this.surveys) ? void 0 : r2.canRenderSurveyAsync(t2, i2)) && void 0 !== e2 ? e2 : Promise.resolve({ visible: false, disabledReason: "Surveys module not available" });
  }
  identify(t2, i2, e2) {
    if (!this.__loaded || !this.persistence) return $i.uninitializedWarning("posthog.identify");
    if (N(t2) && (t2 = t2.toString(), $i.warn("The first argument to posthog.identify was a number, but it should be a string. It has been converted to a string.")), t2) if (["distinct_id", "distinctid"].includes(t2.toLowerCase())) $i.critical('The string "' + t2 + '" was set in posthog.identify which indicates an error. This ID should be unique to the user and not a hardcoded string.');
    else if (t2 !== Se) {
      if (this.Ui("posthog.identify")) {
        var r2 = this.get_distinct_id();
        if (this.register({ $user_id: t2 }), !this.get_property("$device_id")) {
          var s2 = r2;
          this.register_once({ $had_persisted_distinct_id: true, $device_id: s2 }, "");
        }
        t2 !== r2 && t2 !== this.get_property(Vi) && (this.unregister(Vi), this.register({ distinct_id: t2 }));
        var n2, o2 = "anonymous" === (this.persistence.get_property(pe) || "anonymous");
        if (t2 !== r2 && o2) this.persistence.set_property(pe, "identified"), this.setPersonPropertiesForFlags(g({}, e2 || {}, i2 || {}), false), this.capture("$identify", { distinct_id: t2, $anon_distinct_id: r2 }, { $set: i2 || {}, $set_once: e2 || {} }), this.yi = Hs(t2, i2, e2), null == (n2 = this.featureFlags) || n2.setAnonymousDistinctId(r2);
        else (i2 || e2) && this.setPersonProperties(i2, e2);
        t2 !== r2 && (this.reloadFeatureFlags(), this.unregister(de));
      }
    } else $i.critical('The string "' + Se + '" was set in posthog.identify which indicates an error. This ID is only used as a sentinel value.');
    else $i.error("Unique user id has not been set in posthog.identify");
  }
  setPersonProperties(t2, i2) {
    if ((t2 || i2) && this.Ui("posthog.setPersonProperties")) {
      var e2 = Hs(this.get_distinct_id(), t2, i2);
      this.yi !== e2 ? (this.setPersonPropertiesForFlags(g({}, i2 || {}, t2 || {})), this.capture("$set", { $set: t2 || {}, $set_once: i2 || {} }), this.yi = e2) : $i.info("A duplicate setPersonProperties call was made with the same properties. It has been ignored.");
    }
  }
  group(t2, i2, e2) {
    if (t2 && i2) {
      var r2 = this.getGroups();
      r2[t2] !== i2 && this.resetGroupPropertiesForFlags(t2), this.register({ $groups: g({}, r2, { [t2]: i2 }) }), e2 && (this.capture("$groupidentify", { $group_type: t2, $group_key: i2, $group_set: e2 }), this.setGroupPropertiesForFlags({ [t2]: e2 })), r2[t2] === i2 || e2 || this.reloadFeatureFlags();
    } else $i.error("posthog.group requires a group type and group key");
  }
  resetGroups() {
    this.register({ $groups: {} }), this.resetGroupPropertiesForFlags(), this.reloadFeatureFlags();
  }
  setPersonPropertiesForFlags(t2, i2) {
    var e2;
    void 0 === i2 && (i2 = true), null == (e2 = this.featureFlags) || e2.setPersonPropertiesForFlags(t2, i2);
  }
  resetPersonPropertiesForFlags() {
    var t2;
    null == (t2 = this.featureFlags) || t2.resetPersonPropertiesForFlags();
  }
  setGroupPropertiesForFlags(t2, i2) {
    var e2;
    void 0 === i2 && (i2 = true), this.Ui("posthog.setGroupPropertiesForFlags") && (null == (e2 = this.featureFlags) || e2.setGroupPropertiesForFlags(t2, i2));
  }
  resetGroupPropertiesForFlags(t2) {
    var i2;
    null == (i2 = this.featureFlags) || i2.resetGroupPropertiesForFlags(t2);
  }
  reset(t2) {
    var i2, e2, r2, s2, n2, o2, a2;
    if ($i.info("reset"), !this.__loaded) return $i.uninitializedWarning("posthog.reset");
    var l2 = this.get_property("$device_id");
    if (this.consent.reset(), null == (i2 = this.persistence) || i2.clear(), null == (e2 = this.sessionPersistence) || e2.clear(), null == (r2 = this.surveys) || r2.reset(), null == (s2 = this.Mi) || s2.stop(), null == (n2 = this.featureFlags) || n2.reset(), null == (o2 = this.persistence) || o2.set_property(pe, "anonymous"), null == (a2 = this.sessionManager) || a2.resetSessionId(), this.yi = null, "always" === this.config.cookieless_mode) this.register_once({ distinct_id: Se, $device_id: null }, "");
    else {
      var u2 = this.config.get_device_id(Ce());
      this.register_once({ distinct_id: u2, $device_id: t2 ? u2 : l2 }, "");
    }
    this.register({ $last_posthog_reset: (/* @__PURE__ */ new Date()).toISOString() }, 1), this.reloadFeatureFlags();
  }
  get_distinct_id() {
    return this.get_property("distinct_id");
  }
  getGroups() {
    return this.get_property("$groups") || {};
  }
  get_session_id() {
    var t2, i2;
    return null !== (t2 = null == (i2 = this.sessionManager) ? void 0 : i2.checkAndGetSessionAndWindowId(true).sessionId) && void 0 !== t2 ? t2 : "";
  }
  get_session_replay_url(t2) {
    if (!this.sessionManager) return "";
    var { sessionId: i2, sessionStartTimestamp: e2 } = this.sessionManager.checkAndGetSessionAndWindowId(true), r2 = this.requestRouter.endpointFor("ui", "/project/" + this.config.token + "/replay/" + i2);
    if (null != t2 && t2.withTimestamp && e2) {
      var s2, n2 = null !== (s2 = t2.timestampLookBack) && void 0 !== s2 ? s2 : 10;
      if (!e2) return r2;
      r2 += "?t=" + Math.max(Math.floor(((/* @__PURE__ */ new Date()).getTime() - e2) / 1e3) - n2, 0);
    }
    return r2;
  }
  alias(t2, i2) {
    return t2 === this.get_property(qi) ? ($i.critical("Attempting to create alias for existing People user - aborting."), -2) : this.Ui("posthog.alias") ? (M(i2) && (i2 = this.get_distinct_id()), t2 !== i2 ? (this.zi(Vi, t2), this.capture("$create_alias", { alias: t2, distinct_id: i2 })) : ($i.warn("alias matches current distinct_id - skipping api call."), this.identify(t2), -1)) : void 0;
  }
  set_config(t2) {
    var i2 = g({}, this.config);
    if (O(t2)) {
      var e2, r2, s2, n2, o2, a2, l2, u2, h2;
      Oi(this.config, dn(t2));
      var d2 = this.xi();
      null == (e2 = this.persistence) || e2.update_config(this.config, i2, d2), this.sessionPersistence = "sessionStorage" === this.config.persistence || "memory" === this.config.persistence ? this.persistence : new Sr(g({}, this.config, { persistence: "sessionStorage" }), d2);
      var v2 = this.wi(this.config.debug);
      z(v2) && (this.config.debug = v2), z(this.config.debug) && (this.config.debug ? (f.DEBUG = true, Le.F() && Le.j("ph_debug", true), $i.info("set_config", { config: t2, oldConfig: i2, newConfig: g({}, this.config) })) : (f.DEBUG = false, Le.F() && Le.L("ph_debug"))), null == (r2 = this.exceptionObserver) || r2.onConfigChange(), null == (s2 = this.sessionRecording) || s2.startIfEnabledOrStop(), null == (n2 = this.autocapture) || n2.startIfEnabled(), null == (o2 = this.heatmaps) || o2.startIfEnabled(), null == (a2 = this.exceptionObserver) || a2.startIfEnabledOrStop(), null == (l2 = this.deadClicksAutocapture) || l2.startIfEnabledOrStop(), null == (u2 = this.surveys) || u2.loadIfEnabled(), this.Hi(), null == (h2 = this.externalIntegrations) || h2.startIfEnabledOrStop();
    }
  }
  _overrideSDKInfo(t2, i2) {
    f.LIB_NAME = t2, f.LIB_VERSION = i2;
  }
  startSessionRecording(t2) {
    var i2 = true === t2, e2 = { sampling: i2 || !(null == t2 || !t2.sampling), linked_flag: i2 || !(null == t2 || !t2.linked_flag), url_trigger: i2 || !(null == t2 || !t2.url_trigger), event_trigger: i2 || !(null == t2 || !t2.event_trigger) };
    if (Object.values(e2).some(Boolean)) {
      var r2, s2, n2, o2, a2;
      if (null == (r2 = this.sessionManager) || r2.checkAndGetSessionAndWindowId(), e2.sampling) null == (s2 = this.sessionRecording) || s2.overrideSampling();
      if (e2.linked_flag) null == (n2 = this.sessionRecording) || n2.overrideLinkedFlag();
      if (e2.url_trigger) null == (o2 = this.sessionRecording) || o2.overrideTrigger("url");
      if (e2.event_trigger) null == (a2 = this.sessionRecording) || a2.overrideTrigger("event");
    }
    this.set_config({ disable_session_recording: false });
  }
  stopSessionRecording() {
    this.set_config({ disable_session_recording: true });
  }
  sessionRecordingStarted() {
    var t2;
    return !(null == (t2 = this.sessionRecording) || !t2.started);
  }
  captureException(t2, i2) {
    if (this.exceptions) {
      var e2 = new Error("PostHog syntheticException"), r2 = this.exceptions.buildProperties(t2, { handled: true, syntheticException: e2 });
      return this.exceptions.sendExceptionEvent(g({}, r2, i2));
    }
  }
  startExceptionAutocapture(t2) {
    this.set_config({ capture_exceptions: null == t2 || t2 });
  }
  stopExceptionAutocapture() {
    this.set_config({ capture_exceptions: false });
  }
  loadToolbar(t2) {
    var i2, e2;
    return null !== (i2 = null == (e2 = this.toolbar) ? void 0 : e2.loadToolbar(t2)) && void 0 !== i2 && i2;
  }
  get_property(t2) {
    var i2;
    return null == (i2 = this.persistence) ? void 0 : i2.props[t2];
  }
  getSessionProperty(t2) {
    var i2;
    return null == (i2 = this.sessionPersistence) ? void 0 : i2.props[t2];
  }
  toString() {
    var t2, i2 = null !== (t2 = this.config.name) && void 0 !== t2 ? t2 : ln;
    return i2 !== ln && (i2 = ln + "." + i2), i2;
  }
  _isIdentified() {
    var t2, i2;
    return "identified" === (null == (t2 = this.persistence) ? void 0 : t2.get_property(pe)) || "identified" === (null == (i2 = this.sessionPersistence) ? void 0 : i2.get_property(pe));
  }
  Ni() {
    var t2, i2;
    return !("never" === this.config.person_profiles || "identified_only" === this.config.person_profiles && !this._isIdentified() && F(this.getGroups()) && (null == (t2 = this.persistence) || null == (t2 = t2.props) || !t2[Vi]) && (null == (i2 = this.persistence) || null == (i2 = i2.props) || !i2[we]));
  }
  Ai() {
    return true === this.config.capture_pageleave || "if_capture_pageview" === this.config.capture_pageleave && (true === this.config.capture_pageview || "history_change" === this.config.capture_pageview);
  }
  createPersonProfile() {
    this.Ni() || this.Ui("posthog.createPersonProfile") && this.setPersonProperties({}, {});
  }
  setInternalOrTestUser() {
    this.Ui("posthog.setInternalOrTestUser") && this.setPersonProperties({ $internal_or_test_user: true });
  }
  Ui(t2) {
    return "never" === this.config.person_profiles ? ($i.error(t2 + ' was called, but process_person is set to "never". This call will be ignored.'), false) : (this.zi(we, true), true);
  }
  xi() {
    if ("always" === this.config.cookieless_mode) return true;
    var t2 = this.consent.isOptedOut(), i2 = this.config.opt_out_persistence_by_default || "on_reject" === this.config.cookieless_mode;
    return this.config.disable_persistence || t2 && !!i2;
  }
  Hi() {
    var t2, i2, e2, r2, s2 = this.xi();
    (null == (t2 = this.persistence) ? void 0 : t2.st) !== s2 && (null == (e2 = this.persistence) || e2.set_disabled(s2));
    (null == (i2 = this.sessionPersistence) ? void 0 : i2.st) !== s2 && (null == (r2 = this.sessionPersistence) || r2.set_disabled(s2));
    return s2;
  }
  opt_in_capturing(t2) {
    var i2;
    if ("always" !== this.config.cookieless_mode) {
      if ("on_reject" === this.config.cookieless_mode && this.consent.isExplicitlyOptedOut()) {
        var e2, r2, s2, n2, o2;
        this.reset(true), null == (e2 = this.sessionManager) || e2.destroy(), null == (r2 = this.pageViewManager) || r2.destroy(), this.sessionManager = new Ns(this), this.pageViewManager = new ir(this), this.persistence && (this.sessionPropsManager = new Ds(this, this.sessionManager, this.persistence));
        var a2 = null !== (s2 = null == (n2 = this.config.__extensionClasses) ? void 0 : n2.sessionRecording) && void 0 !== s2 ? s2 : null == (o2 = cn.__defaultExtensionClasses) ? void 0 : o2.sessionRecording;
        a2 && (this.sessionRecording = this.vi(this.sessionRecording, new a2(this)));
      }
      var l2, u2;
      if (this.consent.optInOut(true), this.Hi(), this.Oi(), null == (i2 = this.sessionRecording) || i2.startIfEnabledOrStop(), "on_reject" == this.config.cookieless_mode) null == (l2 = this.surveys) || l2.loadIfEnabled();
      if (M(null == t2 ? void 0 : t2.captureEventName) || null != t2 && t2.captureEventName) this.capture(null !== (u2 = null == t2 ? void 0 : t2.captureEventName) && void 0 !== u2 ? u2 : "$opt_in", null == t2 ? void 0 : t2.captureProperties, { send_instantly: true });
      this.config.capture_pageview && this.Fi();
    } else $i.warn('Consent opt in/out is not valid with cookieless_mode="always" and will be ignored');
  }
  opt_out_capturing() {
    var t2, i2, e2;
    "always" !== this.config.cookieless_mode ? ("on_reject" === this.config.cookieless_mode && this.consent.isOptedIn() && this.reset(true), this.consent.optInOut(false), this.Hi(), "on_reject" === this.config.cookieless_mode && (this.register({ distinct_id: Se, $device_id: null }), null == (t2 = this.sessionManager) || t2.destroy(), null == (i2 = this.pageViewManager) || i2.destroy(), this.sessionManager = void 0, this.sessionPropsManager = void 0, null == (e2 = this.sessionRecording) || e2.stopRecording(), this.sessionRecording = void 0, this.Fi())) : $i.warn('Consent opt in/out is not valid with cookieless_mode="always" and will be ignored');
  }
  has_opted_in_capturing() {
    return this.consent.isOptedIn();
  }
  has_opted_out_capturing() {
    return this.consent.isOptedOut();
  }
  get_explicit_consent_status() {
    var t2 = this.consent.consent;
    return t2 === qe.GRANTED ? "granted" : t2 === qe.DENIED ? "denied" : "pending";
  }
  is_capturing() {
    return "always" === this.config.cookieless_mode || ("on_reject" === this.config.cookieless_mode ? this.consent.isExplicitlyOptedOut() || this.consent.isOptedIn() : !this.has_opted_out_capturing());
  }
  clear_opt_in_out_capturing() {
    this.consent.reset(), this.Hi();
  }
  _is_bot() {
    return n ? Us(n, this.config.custom_blocked_useragents) : void 0;
  }
  Fi() {
    o && ("visible" === o.visibilityState ? this.gi || (this.gi = true, this.capture("$pageview", { title: o.title }, { send_instantly: true }), this.mi && (o.removeEventListener("visibilitychange", this.mi), this.mi = null)) : this.mi || (this.mi = this.Fi.bind(this), Hi(o, "visibilitychange", this.mi)));
  }
  debug(i2) {
    false === i2 ? (null == t || t.console.log("You've disabled debug mode."), this.set_config({ debug: false })) : (null == t || t.console.log("You're now in debug mode. All calls to PostHog will be logged in your console.\nYou can disable this with `posthog.debug(false)`."), this.set_config({ debug: true }));
  }
  bt() {
    var t2, i2, e2, r2, s2, n2, o2, a2 = this.Ei || {};
    return "advanced_disable_flags" in a2 ? !!a2.advanced_disable_flags : false !== this.config.advanced_disable_flags ? !!this.config.advanced_disable_flags : true === this.config.advanced_disable_decide ? ($i.warn("Config field 'advanced_disable_decide' is deprecated. Please use 'advanced_disable_flags' instead. The old field will be removed in a future major version."), true) : (e2 = "advanced_disable_decide", r2 = false, s2 = $i, n2 = (i2 = "advanced_disable_flags") in (t2 = a2) && !L(t2[i2]), o2 = e2 in t2 && !L(t2[e2]), n2 ? t2[i2] : o2 ? (s2 && s2.warn("Config field '" + e2 + "' is deprecated. Please use '" + i2 + "' instead. The old field will be removed in a future major version."), t2[e2]) : r2);
  }
  Li(t2) {
    if (L(this.config.before_send)) return t2;
    var i2 = I(this.config.before_send) ? this.config.before_send : [this.config.before_send], e2 = t2;
    for (var r2 of i2) {
      if (e2 = r2(e2), L(e2)) {
        var s2 = "Event '" + t2.event + "' was rejected in beforeSend function";
        return B(t2.event) ? $i.warn(s2 + ". This can cause unexpected behavior.") : $i.info(s2), null;
      }
      e2.properties && !F(e2.properties) || $i.warn("Event '" + t2.event + "' has no properties after beforeSend function, this is likely an error.");
    }
    return e2;
  }
  getPageViewId() {
    var t2;
    return null == (t2 = this.pageViewManager.K) ? void 0 : t2.pageViewId;
  }
  captureTraceFeedback(t2, i2) {
    this.capture("$ai_feedback", { $ai_trace_id: String(t2), $ai_feedback_text: i2 });
  }
  captureTraceMetric(t2, i2, e2) {
    this.capture("$ai_metric", { $ai_trace_id: String(t2), $ai_metric_name: i2, $ai_metric_value: String(e2) });
  }
  wi(t2) {
    var i2 = z(t2) && !t2, e2 = Le.F() && "true" === Le.A("ph_debug");
    return !i2 && (!!e2 || t2);
  }
}
cn.__defaultExtensionClasses = {}, (function(t2, i2) {
  for (var e2 = 0; e2 < i2.length; e2++) t2.prototype[i2[e2]] = Di(t2.prototype[i2[e2]]);
})(cn, ["identify"]);
function fn(t2) {
  return t2 instanceof Element && (t2.id === Ee || !(null == t2.closest || !t2.closest(".toolbar-global-fade-container")));
}
function pn(t2) {
  return !!t2 && 1 === t2.nodeType;
}
function _n(t2, i2) {
  return !!t2 && !!t2.tagName && t2.tagName.toLowerCase() === i2.toLowerCase();
}
function gn(t2) {
  return !!t2 && 3 === t2.nodeType;
}
function mn(t2) {
  return !!t2 && 11 === t2.nodeType;
}
function bn(t2) {
  return t2 ? S(t2).split(/\s+/) : [];
}
function yn(i2) {
  var e2 = null == t ? void 0 : t.location.href;
  return !!(e2 && i2 && i2.some(((t2) => e2.match(t2))));
}
function wn(t2) {
  var i2 = "";
  switch (typeof t2.className) {
    case "string":
      i2 = t2.className;
      break;
    case "object":
      i2 = (t2.className && "baseVal" in t2.className ? t2.className.baseVal : null) || t2.getAttribute("class") || "";
      break;
    default:
      i2 = "";
  }
  return bn(i2);
}
function En(t2) {
  return L(t2) ? null : S(t2).split(/(\s+)/).filter(((t3) => Bn(t3))).join("").replace(/[\r\n]/g, " ").replace(/[ ]+/g, " ").substring(0, 255);
}
function Sn(t2) {
  var i2 = "";
  return An(t2) && !Dn(t2) && t2.childNodes && t2.childNodes.length && Ci(t2.childNodes, (function(t3) {
    var e2;
    gn(t3) && t3.textContent && (i2 += null !== (e2 = En(t3.textContent)) && void 0 !== e2 ? e2 : "");
  })), S(i2);
}
function xn(t2) {
  return M(t2.target) ? t2.srcElement || null : null != (i2 = t2.target) && i2.shadowRoot ? t2.composedPath()[0] || null : t2.target || null;
  var i2;
}
var $n = ["a", "button", "form", "input", "select", "textarea", "label"];
function kn(t2, i2) {
  if (M(i2)) return true;
  var e2, r2 = function(t3) {
    if (i2.some(((i3) => t3.matches(i3)))) return { v: true };
  };
  for (var s2 of t2) if (e2 = r2(s2)) return e2.v;
  return false;
}
function Pn(t2) {
  var i2 = t2.parentNode;
  return !(!i2 || !pn(i2)) && i2;
}
var Tn = ["next", "previous", "prev", ">", "<"], Rn = 10;
var In = [".ph-no-rageclick", ".ph-no-capture"];
function Cn(i2, e2) {
  if (!t || On(i2)) return false;
  var r2, s2, n2;
  z(e2) ? (r2 = !!e2 && In, s2 = void 0) : (r2 = null !== (n2 = null == e2 ? void 0 : e2.css_selector_ignorelist) && void 0 !== n2 ? n2 : In, s2 = null == e2 ? void 0 : e2.content_ignorelist);
  if (false === r2) return false;
  var { targetElementList: o2 } = Fn(i2, false);
  return !(function(t2, i3) {
    if (false === t2 || M(t2)) return false;
    var e3;
    if (true === t2) e3 = Tn;
    else {
      if (!I(t2)) return false;
      if (t2.length > Rn) return $i.error("[PostHog] content_ignorelist array cannot exceed " + Rn + " items. Use css_selector_ignorelist for more complex matching."), false;
      e3 = t2.map(((t3) => t3.toLowerCase()));
    }
    return i3.some(((t3) => {
      var { safeText: i4, ariaLabel: r3 } = t3;
      return e3.some(((t4) => i4.includes(t4) || r3.includes(t4)));
    }));
  })(s2, o2.map(((t2) => {
    var i3;
    return { safeText: Sn(t2).toLowerCase(), ariaLabel: (null == (i3 = t2.getAttribute("aria-label")) ? void 0 : i3.toLowerCase().trim()) || "" };
  }))) && !kn(o2, r2);
}
var On = (t2) => !t2 || _n(t2, "html") || !pn(t2), Fn = (i2, e2) => {
  if (!t || On(i2)) return { parentIsUsefulElement: false, targetElementList: [] };
  for (var r2 = false, s2 = [i2], n2 = i2; n2.parentNode && !_n(n2, "body"); ) if (mn(n2.parentNode)) s2.push(n2.parentNode.host), n2 = n2.parentNode.host;
  else {
    var o2 = Pn(n2);
    if (!o2) break;
    if (e2 || $n.indexOf(o2.tagName.toLowerCase()) > -1) r2 = true;
    else {
      var a2 = t.getComputedStyle(o2);
      a2 && "pointer" === a2.getPropertyValue("cursor") && (r2 = true);
    }
    s2.push(o2), n2 = o2;
  }
  return { parentIsUsefulElement: r2, targetElementList: s2 };
};
function Mn(i2, e2, r2, s2, n2) {
  var o2, a2, l2, u2;
  if (void 0 === r2 && (r2 = void 0), !t || On(i2)) return false;
  if (null != (o2 = r2) && o2.url_allowlist && !yn(r2.url_allowlist)) return false;
  if (null != (a2 = r2) && a2.url_ignorelist && yn(r2.url_ignorelist)) return false;
  if (null != (l2 = r2) && l2.dom_event_allowlist) {
    var h2 = r2.dom_event_allowlist;
    if (h2 && !h2.some(((t2) => e2.type === t2))) return false;
  }
  var { parentIsUsefulElement: d2, targetElementList: v2 } = Fn(i2, s2);
  if (!(function(t2, i3) {
    var e3 = null == i3 ? void 0 : i3.element_allowlist;
    if (M(e3)) return true;
    var r3, s3 = function(t3) {
      if (e3.some(((i4) => t3.tagName.toLowerCase() === i4))) return { v: true };
    };
    for (var n3 of t2) if (r3 = s3(n3)) return r3.v;
    return false;
  })(v2, r2)) return false;
  if (!kn(v2, null == (u2 = r2) ? void 0 : u2.css_selector_allowlist)) return false;
  var c2 = t.getComputedStyle(i2);
  if (c2 && "pointer" === c2.getPropertyValue("cursor") && "click" === e2.type) return true;
  var f2 = i2.tagName.toLowerCase();
  switch (f2) {
    case "html":
      return false;
    case "form":
      return (n2 || ["submit"]).indexOf(e2.type) >= 0;
    case "input":
    case "select":
    case "textarea":
      return (n2 || ["change", "click"]).indexOf(e2.type) >= 0;
    default:
      return d2 ? (n2 || ["click"]).indexOf(e2.type) >= 0 : (n2 || ["click"]).indexOf(e2.type) >= 0 && ($n.indexOf(f2) > -1 || "true" === i2.getAttribute("contenteditable"));
  }
}
function An(t2) {
  for (var i2 = t2; i2.parentNode && !_n(i2, "body"); i2 = i2.parentNode) {
    var e2 = wn(i2);
    if (E(e2, "ph-sensitive") || E(e2, "ph-no-capture")) return false;
  }
  if (E(wn(t2), "ph-include")) return true;
  var r2 = t2.type || "";
  if (A(r2)) switch (r2.toLowerCase()) {
    case "hidden":
    case "password":
      return false;
  }
  var s2 = t2.name || t2.id || "";
  if (A(s2)) {
    if (/^cc|cardnum|ccnum|creditcard|csc|cvc|cvv|exp|pass|pwd|routing|seccode|securitycode|securitynum|socialsec|socsec|ssn/i.test(s2.replace(/[^a-zA-Z0-9]/g, ""))) return false;
  }
  return true;
}
function Dn(t2) {
  return !!(_n(t2, "input") && !["button", "checkbox", "submit", "reset"].includes(t2.type) || _n(t2, "select") || _n(t2, "textarea") || "true" === t2.getAttribute("contenteditable"));
}
var jn = "(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11})", Ln = new RegExp("^(?:" + jn + ")$"), Nn = new RegExp(jn), Un = "\\d{3}-?\\d{2}-?\\d{4}", zn = new RegExp("^(" + Un + ")$"), Hn = new RegExp("(" + Un + ")");
function Bn(t2, i2) {
  if (void 0 === i2 && (i2 = true), L(t2)) return false;
  if (A(t2)) {
    if (t2 = S(t2), (i2 ? Ln : Nn).test((t2 || "").replace(/[- ]/g, ""))) return false;
    if ((i2 ? zn : Hn).test(t2)) return false;
  }
  return true;
}
function qn(t2) {
  var i2 = Sn(t2);
  return Bn(i2 = (i2 + " " + Vn(t2)).trim()) ? i2 : "";
}
function Vn(t2) {
  var i2 = "";
  return t2 && t2.childNodes && t2.childNodes.length && Ci(t2.childNodes, (function(t3) {
    var e2;
    if (t3 && "span" === (null == (e2 = t3.tagName) ? void 0 : e2.toLowerCase())) try {
      var r2 = Sn(t3);
      i2 = (i2 + " " + r2).trim(), t3.childNodes && t3.childNodes.length && (i2 = (i2 + " " + Vn(t3)).trim());
    } catch (t4) {
      $i.error("[AutoCapture]", t4);
    }
  })), i2;
}
function Wn(t2) {
  return (function(t3) {
    var i2 = t3.map(((t4) => {
      var i3, e2, r2 = "";
      if (t4.tag_name && (r2 += t4.tag_name), t4.attr_class) for (var s2 of (t4.attr_class.sort(), t4.attr_class)) r2 += "." + s2.replace(/"/g, "");
      var n2 = g({}, t4.text ? { text: t4.text } : {}, { "nth-child": null !== (i3 = t4.nth_child) && void 0 !== i3 ? i3 : 0, "nth-of-type": null !== (e2 = t4.nth_of_type) && void 0 !== e2 ? e2 : 0 }, t4.href ? { href: t4.href } : {}, t4.attr_id ? { attr_id: t4.attr_id } : {}, t4.attributes), o2 = {};
      return Mi(n2).sort(((t5, i4) => {
        var [e3] = t5, [r3] = i4;
        return e3.localeCompare(r3);
      })).forEach(((t5) => {
        var [i4, e3] = t5;
        return o2[Gn(i4.toString())] = Gn(e3.toString());
      })), r2 += ":", r2 += Mi(o2).map(((t5) => {
        var [i4, e3] = t5;
        return i4 + '="' + e3 + '"';
      })).join("");
    }));
    return i2.join(";");
  })((function(t3) {
    return t3.map(((t4) => {
      var i2, e2, r2 = { text: null == (i2 = t4.$el_text) ? void 0 : i2.slice(0, 400), tag_name: t4.tag_name, href: null == (e2 = t4.attr__href) ? void 0 : e2.slice(0, 2048), attr_class: Yn(t4), attr_id: t4.attr__id, nth_child: t4.nth_child, nth_of_type: t4.nth_of_type, attributes: {} };
      return Mi(t4).filter(((t5) => {
        var [i3] = t5;
        return 0 === i3.indexOf("attr__");
      })).forEach(((t5) => {
        var [i3, e3] = t5;
        return r2.attributes[i3] = e3;
      })), r2;
    }));
  })(t2));
}
function Gn(t2) {
  return t2.replace(/"|\\"/g, '\\"');
}
function Yn(t2) {
  var i2 = t2.attr__class;
  return i2 ? I(i2) ? i2 : bn(i2) : void 0;
}
class Jn {
  constructor(t2) {
    this.disabled = false === t2;
    var i2 = O(t2) ? t2 : {};
    this.thresholdPx = i2.threshold_px || 30, this.timeoutMs = i2.timeout_ms || 1e3, this.clickCount = i2.click_count || 3, this.clicks = [];
  }
  isRageClick(t2, i2, e2) {
    if (this.disabled) return false;
    var r2 = this.clicks[this.clicks.length - 1];
    if (r2 && Math.abs(t2 - r2.x) + Math.abs(i2 - r2.y) < this.thresholdPx && e2 - r2.timestamp < this.timeoutMs) {
      if (this.clicks.push({ x: t2, y: i2, timestamp: e2 }), this.clicks.length === this.clickCount) return true;
    } else this.clicks = [{ x: t2, y: i2, timestamp: e2 }];
    return false;
  }
}
var Kn = "$copy_autocapture", Xn = ki("[AutoCapture]");
function Qn(t2, i2) {
  return i2.length > t2 ? i2.slice(0, t2) + "..." : i2;
}
function Zn(t2) {
  if (t2.previousElementSibling) return t2.previousElementSibling;
  var i2 = t2;
  do {
    i2 = i2.previousSibling;
  } while (i2 && !pn(i2));
  return i2;
}
function to(t2, i2, e2, r2) {
  var s2 = t2.tagName.toLowerCase(), n2 = { tag_name: s2 };
  $n.indexOf(s2) > -1 && !e2 && ("a" === s2.toLowerCase() || "button" === s2.toLowerCase() ? n2.$el_text = Qn(1024, qn(t2)) : n2.$el_text = Qn(1024, Sn(t2)));
  var o2 = wn(t2);
  o2.length > 0 && (n2.classes = o2.filter((function(t3) {
    return "" !== t3;
  }))), Ci(t2.attributes, (function(e3) {
    var s3;
    if ((!Dn(t2) || -1 !== ["name", "id", "class", "aria-label"].indexOf(e3.name)) && ((null == r2 || !r2.includes(e3.name)) && !i2 && Bn(e3.value) && (s3 = e3.name, !A(s3) || "_ngcontent" !== s3.substring(0, 10) && "_nghost" !== s3.substring(0, 7)))) {
      var o3 = e3.value;
      "class" === e3.name && (o3 = bn(o3).join(" ")), n2["attr__" + e3.name] = Qn(1024, o3);
    }
  }));
  for (var a2 = 1, l2 = 1, u2 = t2; u2 = Zn(u2); ) a2++, u2.tagName === t2.tagName && l2++;
  return n2.nth_child = a2, n2.nth_of_type = l2, n2;
}
function io(i2, e2) {
  for (var r2, s2, { e: n2, maskAllElementAttributes: o2, maskAllText: a2, elementAttributeIgnoreList: l2, elementsChainAsString: u2 } = e2, h2 = [i2], d2 = i2; d2.parentNode && !_n(d2, "body"); ) mn(d2.parentNode) ? (h2.push(d2.parentNode.host), d2 = d2.parentNode.host) : (h2.push(d2.parentNode), d2 = d2.parentNode);
  var v2, c2 = [], f2 = {}, p2 = false, _2 = false;
  if (Ci(h2, ((t2) => {
    var i3 = An(t2);
    "a" === t2.tagName.toLowerCase() && (p2 = t2.getAttribute("href"), p2 = i3 && p2 && Bn(p2) && p2), E(wn(t2), "ph-no-capture") && (_2 = true), c2.push(to(t2, o2, a2, l2));
    var e3 = (function(t3) {
      if (!An(t3)) return {};
      var i4 = {};
      return Ci(t3.attributes, (function(t4) {
        if (t4.name && 0 === t4.name.indexOf("data-ph-capture-attribute")) {
          var e4 = t4.name.replace("data-ph-capture-attribute-", ""), r3 = t4.value;
          e4 && r3 && Bn(r3) && (i4[e4] = r3);
        }
      })), i4;
    })(t2);
    Oi(f2, e3);
  })), _2) return { props: {}, explicitNoCapture: _2 };
  if (a2 || ("a" === i2.tagName.toLowerCase() || "button" === i2.tagName.toLowerCase() ? c2[0].$el_text = qn(i2) : c2[0].$el_text = Sn(i2)), p2) {
    var g2, m2;
    c2[0].attr__href = p2;
    var b2 = null == (g2 = er(p2)) ? void 0 : g2.host, y2 = null == t || null == (m2 = t.location) ? void 0 : m2.host;
    b2 && y2 && b2 !== y2 && (v2 = p2);
  }
  return { props: Oi({ $event_type: n2.type, $ce_version: 1 }, u2 ? {} : { $elements: c2 }, { $elements_chain: Wn(c2) }, null != (r2 = c2[0]) && r2.$el_text ? { $el_text: null == (s2 = c2[0]) ? void 0 : s2.$el_text } : {}, v2 && "click" === n2.type ? { $external_click_url: v2 } : {}, f2) };
}
var eo = ki("[ExceptionAutocapture]");
function ro(t2, i2, e2) {
  try {
    if (!(i2 in t2)) return () => {
    };
    var r2 = t2[i2], s2 = e2(r2);
    return C(s2) && (s2.prototype = s2.prototype || {}, Object.defineProperties(s2, { __posthog_wrapped__: { enumerable: false, value: true } })), t2[i2] = s2, () => {
      t2[i2] = r2;
    };
  } catch (t3) {
    return () => {
    };
  }
}
var so = ki("[TracingHeaders]");
var no = ki("[Web Vitals]"), oo = 9e5;
var ao = "disabled", lo = "lazy_loading", uo = "awaiting_config", ho = "missing_config";
ki("[SessionRecording]");
var vo = "[SessionRecording]", co = ki(vo);
var fo = ki("[Heatmaps]");
function po(t2) {
  return O(t2) && "clientX" in t2 && "clientY" in t2 && N(t2.clientX) && N(t2.clientY);
}
var _o = ki("[Product Tours]"), go = "ph_product_tours";
var mo = ["$set_once", "$set"], bo = ki("[SiteApps]");
function yo(t2, i2, e2) {
  if (L(t2)) return false;
  switch (e2) {
    case "exact":
      return t2 === i2;
    case "contains":
      var r2 = i2.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/_/g, ".").replace(/%/g, ".*");
      return new RegExp(r2, "i").test(t2);
    case "regex":
      try {
        return new RegExp(i2).test(t2);
      } catch (t3) {
        return false;
      }
    default:
      return false;
  }
}
class wo {
  constructor(t2) {
    this.Bi = new js(), this.qi = (t3, i2) => this.Vi(t3, i2) && this.Wi(t3, i2) && this.Gi(t3, i2) && this.Yi(t3, i2), this.Vi = (t3, i2) => null == i2 || !i2.event || (null == t3 ? void 0 : t3.event) === (null == i2 ? void 0 : i2.event), this._instance = t2, this.Ji = /* @__PURE__ */ new Set(), this.Ki = /* @__PURE__ */ new Set();
  }
  init() {
    var t2;
    if (!M(null == (t2 = this._instance) ? void 0 : t2._addCaptureHook)) {
      var i2;
      null == (i2 = this._instance) || i2._addCaptureHook(((t3, i3) => {
        this.on(t3, i3);
      }));
    }
  }
  register(t2) {
    var i2, e2;
    if (!M(null == (i2 = this._instance) ? void 0 : i2._addCaptureHook) && (t2.forEach(((t3) => {
      var i3, e3;
      null == (i3 = this.Ki) || i3.add(t3), null == (e3 = t3.steps) || e3.forEach(((t4) => {
        var i4;
        null == (i4 = this.Ji) || i4.add((null == t4 ? void 0 : t4.event) || "");
      }));
    })), null != (e2 = this._instance) && e2.autocapture)) {
      var r2, s2 = /* @__PURE__ */ new Set();
      t2.forEach(((t3) => {
        var i3;
        null == (i3 = t3.steps) || i3.forEach(((t4) => {
          null != t4 && t4.selector && s2.add(null == t4 ? void 0 : t4.selector);
        }));
      })), null == (r2 = this._instance) || r2.autocapture.setElementSelectors(s2);
    }
  }
  on(t2, i2) {
    var e2;
    null != i2 && 0 != t2.length && (this.Ji.has(t2) || this.Ji.has(null == i2 ? void 0 : i2.event)) && this.Ki && (null == (e2 = this.Ki) ? void 0 : e2.size) > 0 && this.Ki.forEach(((t3) => {
      this.Xi(i2, t3) && this.Bi.emit("actionCaptured", t3.name);
    }));
  }
  Qi(t2) {
    this.onAction("actionCaptured", ((i2) => t2(i2)));
  }
  Xi(t2, i2) {
    if (null == (null == i2 ? void 0 : i2.steps)) return false;
    for (var e2 of i2.steps) if (this.qi(t2, e2)) return true;
    return false;
  }
  onAction(t2, i2) {
    return this.Bi.on(t2, i2);
  }
  Wi(t2, i2) {
    if (null != i2 && i2.url) {
      var e2, r2 = null == t2 || null == (e2 = t2.properties) ? void 0 : e2.$current_url;
      if (!r2 || "string" != typeof r2) return false;
      if (!yo(r2, i2.url, i2.url_matching || "contains")) return false;
    }
    return true;
  }
  Gi(t2, i2) {
    return !!this.Zi(t2, i2) && (!!this.te(t2, i2) && !!this.ie(t2, i2));
  }
  Zi(t2, i2) {
    var e2;
    if (null == i2 || !i2.href) return true;
    var r2 = this.ee(t2);
    if (r2.length > 0) return r2.some(((t3) => yo(t3.href, i2.href, i2.href_matching || "exact")));
    var s2, n2 = (null == t2 || null == (e2 = t2.properties) ? void 0 : e2.$elements_chain) || "";
    return !!n2 && yo((s2 = n2.match(/(?::|")href="(.*?)"/)) ? s2[1] : "", i2.href, i2.href_matching || "exact");
  }
  te(t2, i2) {
    var e2;
    if (null == i2 || !i2.text) return true;
    var r2 = this.ee(t2);
    if (r2.length > 0) return r2.some(((t3) => yo(t3.text, i2.text, i2.text_matching || "exact") || yo(t3.$el_text, i2.text, i2.text_matching || "exact")));
    var s2, n2, o2, a2 = (null == t2 || null == (e2 = t2.properties) ? void 0 : e2.$elements_chain) || "";
    return !!a2 && (s2 = (function(t3) {
      for (var i3, e3 = [], r3 = /(?::|")text="(.*?)"/g; !L(i3 = r3.exec(t3)); ) e3.includes(i3[1]) || e3.push(i3[1]);
      return e3;
    })(a2), n2 = i2.text, o2 = i2.text_matching || "exact", s2.some(((t3) => yo(t3, n2, o2))));
  }
  ie(t2, i2) {
    var e2, r2;
    if (null == i2 || !i2.selector) return true;
    var s2 = null == t2 || null == (e2 = t2.properties) ? void 0 : e2.$element_selectors;
    if (null != s2 && s2.includes(i2.selector)) return true;
    var n2 = (null == t2 || null == (r2 = t2.properties) ? void 0 : r2.$elements_chain) || "";
    if (i2.selector_regex && n2) try {
      return new RegExp(i2.selector_regex).test(n2);
    } catch (t3) {
      return false;
    }
    return false;
  }
  ee(t2) {
    var i2;
    return null == (null == t2 || null == (i2 = t2.properties) ? void 0 : i2.$elements) ? [] : null == t2 ? void 0 : t2.properties.$elements;
  }
  Yi(t2, i2) {
    return null == i2 || !i2.properties || 0 === i2.properties.length || Vs(i2.properties.reduce(((t3, i3) => {
      var e2 = I(i3.value) ? i3.value.map(String) : null != i3.value ? [String(i3.value)] : [];
      return t3[i3.key] = { values: e2, operator: i3.operator || "exact" }, t3;
    }), {}), null == t2 ? void 0 : t2.properties);
  }
}
class Eo {
  constructor(t2) {
    this._instance = t2, this.re = /* @__PURE__ */ new Map(), this.se = /* @__PURE__ */ new Map(), this.ne = /* @__PURE__ */ new Map();
  }
  oe(t2, i2) {
    return !!t2 && Vs(t2.propertyFilters, null == i2 ? void 0 : i2.properties);
  }
  ae(t2, i2) {
    var e2 = /* @__PURE__ */ new Map();
    return t2.forEach(((t3) => {
      var r2;
      null == (r2 = t3.conditions) || null == (r2 = r2[i2]) || null == (r2 = r2.values) || r2.forEach(((i3) => {
        if (null != i3 && i3.name) {
          var r3 = e2.get(i3.name) || [];
          r3.push(t3.id), e2.set(i3.name, r3);
        }
      }));
    })), e2;
  }
  le(t2, i2, e2) {
    var r2 = (e2 === xr.Activation ? this.re : this.se).get(t2), s2 = [];
    return this.ue(((t3) => {
      s2 = t3.filter(((t4) => null == r2 ? void 0 : r2.includes(t4.id)));
    })), s2.filter(((r3) => {
      var s3, n2 = null == (s3 = r3.conditions) || null == (s3 = s3[e2]) || null == (s3 = s3.values) ? void 0 : s3.find(((i3) => i3.name === t2));
      return this.oe(n2, i2);
    }));
  }
  register(t2) {
    var i2;
    M(null == (i2 = this._instance) ? void 0 : i2._addCaptureHook) || (this.he(t2), this.de(t2));
  }
  de(t2) {
    var i2 = t2.filter(((t3) => {
      var i3, e2;
      return (null == (i3 = t3.conditions) ? void 0 : i3.actions) && (null == (e2 = t3.conditions) || null == (e2 = e2.actions) || null == (e2 = e2.values) ? void 0 : e2.length) > 0;
    }));
    if (0 !== i2.length) {
      if (null == this.ve) {
        this.ve = new wo(this._instance), this.ve.init();
        this.ve.Qi(((t3) => {
          this.onAction(t3);
        }));
      }
      i2.forEach(((t3) => {
        var i3, e2, r2, s2, n2;
        t3.conditions && null != (i3 = t3.conditions) && i3.actions && null != (e2 = t3.conditions) && null != (e2 = e2.actions) && e2.values && (null == (r2 = t3.conditions) || null == (r2 = r2.actions) || null == (r2 = r2.values) ? void 0 : r2.length) > 0 && (null == (s2 = this.ve) || s2.register(t3.conditions.actions.values), null == (n2 = t3.conditions) || null == (n2 = n2.actions) || null == (n2 = n2.values) || n2.forEach(((i4) => {
          if (i4 && i4.name) {
            var e3 = this.ne.get(i4.name);
            e3 && e3.push(t3.id), this.ne.set(i4.name, e3 || [t3.id]);
          }
        })));
      }));
    }
  }
  he(t2) {
    var i2, e2 = t2.filter(((t3) => {
      var i3, e3;
      return (null == (i3 = t3.conditions) ? void 0 : i3.events) && (null == (e3 = t3.conditions) || null == (e3 = e3.events) || null == (e3 = e3.values) ? void 0 : e3.length) > 0;
    })), r2 = t2.filter(((t3) => {
      var i3, e3;
      return (null == (i3 = t3.conditions) ? void 0 : i3.cancelEvents) && (null == (e3 = t3.conditions) || null == (e3 = e3.cancelEvents) || null == (e3 = e3.values) ? void 0 : e3.length) > 0;
    }));
    if (0 !== e2.length || 0 !== r2.length) {
      null == (i2 = this._instance) || i2._addCaptureHook(((t3, i3) => {
        this.onEvent(t3, i3);
      })), this.re = this.ae(t2, xr.Activation), this.se = this.ae(t2, xr.Cancellation);
    }
  }
  onEvent(t2, i2) {
    var e2, r2 = this.ce(), s2 = this.fe(), n2 = this.pe(), o2 = (null == (e2 = this._instance) || null == (e2 = e2.persistence) ? void 0 : e2.props[s2]) || [];
    if (n2 === t2 && i2 && o2.length > 0) {
      var a2, l2;
      r2.info("event matched, removing item from activated items", { event: t2, eventPayload: i2, existingActivatedItems: o2 });
      var u2 = (null == i2 || null == (a2 = i2.properties) ? void 0 : a2.$survey_id) || (null == i2 || null == (l2 = i2.properties) ? void 0 : l2.$product_tour_id);
      if (u2) {
        var h2 = o2.indexOf(u2);
        h2 >= 0 && (o2.splice(h2, 1), this._e(o2));
      }
    } else {
      if (this.se.has(t2)) {
        var d2 = this.le(t2, i2, xr.Cancellation);
        d2.length > 0 && (r2.info("cancel event matched, cancelling items", { event: t2, itemsToCancel: d2.map(((t3) => t3.id)) }), d2.forEach(((t3) => {
          var i3 = o2.indexOf(t3.id);
          i3 >= 0 && o2.splice(i3, 1), this.ge(t3.id);
        })), this._e(o2));
      }
      if (this.re.has(t2)) {
        r2.info("event name matched", { event: t2, eventPayload: i2, items: this.re.get(t2) });
        var v2 = this.le(t2, i2, xr.Activation);
        this._e(o2.concat(v2.map(((t3) => t3.id)) || []));
      }
    }
  }
  onAction(t2) {
    var i2, e2 = this.fe(), r2 = (null == (i2 = this._instance) || null == (i2 = i2.persistence) ? void 0 : i2.props[e2]) || [];
    this.ne.has(t2) && this._e(r2.concat(this.ne.get(t2) || []));
  }
  _e(t2) {
    var i2, e2 = this.ce(), r2 = this.fe(), s2 = [...new Set(t2)].filter(((t3) => !this.me(t3)));
    e2.info("updating activated items", { activatedItems: s2 }), null == (i2 = this._instance) || null == (i2 = i2.persistence) || i2.register({ [r2]: s2 });
  }
  getActivatedIds() {
    var t2, i2 = this.fe(), e2 = null == (t2 = this._instance) || null == (t2 = t2.persistence) ? void 0 : t2.props[i2];
    return e2 || [];
  }
  getEventToItemsMap() {
    return this.re;
  }
  be() {
    return this.ve;
  }
}
class So extends Eo {
  constructor(t2) {
    super(t2);
  }
  fe() {
    return "$surveys_activated";
  }
  pe() {
    return Or.SHOWN;
  }
  ue(t2) {
    var i2;
    null == (i2 = this._instance) || i2.getSurveys(t2);
  }
  ge(t2) {
    var i2;
    null == (i2 = this._instance) || i2.cancelPendingSurvey(t2);
  }
  ce() {
    return Js;
  }
  me() {
    return false;
  }
  getSurveys() {
    return this.getActivatedIds();
  }
  getEventToSurveys() {
    return this.getEventToItemsMap();
  }
}
var xo = null != t && t.location ? or(t.location.hash, "__posthog") || or(location.hash, "state") : null, $o = "_postHogToolbarParams", ko = ki("[Toolbar]"), Po = (function(t2) {
  return t2[t2.UNINITIALIZED = 0] = "UNINITIALIZED", t2[t2.LOADING = 1] = "LOADING", t2[t2.LOADED = 2] = "LOADED", t2;
})(Po || {});
var To = ki("[FeatureFlags]"), Ro = ki("[FeatureFlags]", { debugEnabled: true }), Io = "errors_while_computing_flags", Co = "flag_missing", Oo = "quota_limited", Fo = "timeout", Mo = "connection_error", Ao = "unknown_error", Do = (t2) => "api_error_" + t2, jo = "$active_feature_flags", Lo = "$override_feature_flags", No = "$feature_flag_payloads", Uo = "$override_feature_flag_payloads", zo = "$feature_flag_request_id", Ho = (t2) => {
  for (var i2 = {}, e2 = 0; e2 < t2.length; e2++) i2[t2[e2]] = true;
  return i2;
}, Bo = (t2) => {
  var i2 = {};
  for (var [e2, r2] of Mi(t2 || {})) r2 && (i2[e2] = r2);
  return i2;
}, qo = (t2) => {
  var i2 = t2.flags;
  return i2 ? (t2.featureFlags = Object.fromEntries(Object.keys(i2).map(((t3) => {
    var e2;
    return [t3, null !== (e2 = i2[t3].variant) && void 0 !== e2 ? e2 : i2[t3].enabled];
  }))), t2.featureFlagPayloads = Object.fromEntries(Object.keys(i2).filter(((t3) => i2[t3].enabled)).filter(((t3) => {
    var e2;
    return null == (e2 = i2[t3].metadata) ? void 0 : e2.payload;
  })).map(((t3) => {
    var e2;
    return [t3, null == (e2 = i2[t3].metadata) ? void 0 : e2.payload];
  })))) : To.warn("Using an older version of the feature flags endpoint. Please upgrade your PostHog server to the latest version"), t2;
}, Vo = (function(t2) {
  return t2.FeatureFlags = "feature_flags", t2.Recordings = "recordings", t2;
})({});
var Wo = ki("[Error tracking]");
var Go = { icontains: (i2, e2) => !!t && e2.href.toLowerCase().indexOf(i2.toLowerCase()) > -1, not_icontains: (i2, e2) => !!t && -1 === e2.href.toLowerCase().indexOf(i2.toLowerCase()), regex: (i2, e2) => !!t && zs(e2.href, i2), not_regex: (i2, e2) => !!t && !zs(e2.href, i2), exact: (t2, i2) => i2.href === t2, is_not: (t2, i2) => i2.href !== t2 };
class Yo {
  constructor(t2) {
    var i2 = this;
    this.getWebExperimentsAndEvaluateDisplayLogic = function(t3) {
      void 0 === t3 && (t3 = false), i2.getWebExperiments(((t4) => {
        Yo.ye("retrieved web experiments from the server"), i2.we = /* @__PURE__ */ new Map(), t4.forEach(((t5) => {
          if (t5.feature_flag_key) {
            var e2;
            if (i2.we) Yo.ye("setting flag key ", t5.feature_flag_key, " to web experiment ", t5), null == (e2 = i2.we) || e2.set(t5.feature_flag_key, t5);
            var r2 = i2._instance.getFeatureFlag(t5.feature_flag_key);
            A(r2) && t5.variants[r2] && i2.Ee(t5.name, r2, t5.variants[r2].transforms);
          } else if (t5.variants) for (var s2 in t5.variants) {
            var n2 = t5.variants[s2];
            Yo.Se(n2) && i2.Ee(t5.name, s2, n2.transforms);
          }
        }));
      }), t3);
    }, this._instance = t2, this._instance.onFeatureFlags(((t3) => {
      this.onFeatureFlags(t3);
    }));
  }
  initialize() {
  }
  onFeatureFlags(t2) {
    if (this._is_bot()) Yo.ye("Refusing to render web experiment since the viewer is a likely bot");
    else if (!this._instance.config.disable_web_experiments) {
      if (L(this.we)) return this.we = /* @__PURE__ */ new Map(), this.loadIfEnabled(), void this.previewWebExperiment();
      Yo.ye("applying feature flags", t2), t2.forEach(((t3) => {
        var i2;
        if (this.we && null != (i2 = this.we) && i2.has(t3)) {
          var e2, r2 = this._instance.getFeatureFlag(t3), s2 = null == (e2 = this.we) ? void 0 : e2.get(t3);
          r2 && null != s2 && s2.variants[r2] && this.Ee(s2.name, r2, s2.variants[r2].transforms);
        }
      }));
    }
  }
  previewWebExperiment() {
    var t2 = Yo.getWindowLocation();
    if (null != t2 && t2.search) {
      var i2 = sr(null == t2 ? void 0 : t2.search, "__experiment_id"), e2 = sr(null == t2 ? void 0 : t2.search, "__experiment_variant");
      i2 && e2 && (Yo.ye("previewing web experiments " + i2 + " && " + e2), this.getWebExperiments(((t3) => {
        this.xe(parseInt(i2), e2, t3);
      }), false, true));
    }
  }
  loadIfEnabled() {
    this._instance.config.disable_web_experiments || this.getWebExperimentsAndEvaluateDisplayLogic();
  }
  getWebExperiments(t2, i2, e2) {
    if (this._instance.config.disable_web_experiments && !e2) return t2([]);
    var r2 = this._instance.get_property("$web_experiments");
    if (r2 && !i2) return t2(r2);
    this._instance._send_request({ url: this._instance.requestRouter.endpointFor("api", "/api/web_experiments/?token=" + this._instance.config.token), method: "GET", callback: (i3) => {
      if (200 !== i3.statusCode || !i3.json) return t2([]);
      var e3 = i3.json.experiments || [];
      return t2(e3);
    } });
  }
  xe(t2, i2, e2) {
    var r2 = e2.filter(((i3) => i3.id === t2));
    r2 && r2.length > 0 && (Yo.ye("Previewing web experiment [" + r2[0].name + "] with variant [" + i2 + "]"), this.Ee(r2[0].name, i2, r2[0].variants[i2].transforms));
  }
  static Se(t2) {
    return !L(t2.conditions) && (Yo.$e(t2) && Yo.ke(t2));
  }
  static $e(t2) {
    var i2;
    if (L(t2.conditions) || L(null == (i2 = t2.conditions) ? void 0 : i2.url)) return true;
    var e2, r2, s2, n2 = Yo.getWindowLocation();
    return !!n2 && (null == (e2 = t2.conditions) || !e2.url || Go[null !== (r2 = null == (s2 = t2.conditions) ? void 0 : s2.urlMatchType) && void 0 !== r2 ? r2 : "icontains"](t2.conditions.url, n2));
  }
  static getWindowLocation() {
    return null == t ? void 0 : t.location;
  }
  static ke(t2) {
    var i2;
    if (L(t2.conditions) || L(null == (i2 = t2.conditions) ? void 0 : i2.utm)) return true;
    var e2 = vr();
    if (e2.utm_source) {
      var r2, s2, n2, o2, a2, l2, u2, h2, d2 = null == (r2 = t2.conditions) || null == (r2 = r2.utm) || !r2.utm_campaign || (null == (s2 = t2.conditions) || null == (s2 = s2.utm) ? void 0 : s2.utm_campaign) == e2.utm_campaign, v2 = null == (n2 = t2.conditions) || null == (n2 = n2.utm) || !n2.utm_source || (null == (o2 = t2.conditions) || null == (o2 = o2.utm) ? void 0 : o2.utm_source) == e2.utm_source, c2 = null == (a2 = t2.conditions) || null == (a2 = a2.utm) || !a2.utm_medium || (null == (l2 = t2.conditions) || null == (l2 = l2.utm) ? void 0 : l2.utm_medium) == e2.utm_medium, f2 = null == (u2 = t2.conditions) || null == (u2 = u2.utm) || !u2.utm_term || (null == (h2 = t2.conditions) || null == (h2 = h2.utm) ? void 0 : h2.utm_term) == e2.utm_term;
      return d2 && c2 && f2 && v2;
    }
    return false;
  }
  static ye(t2) {
    for (var i2 = arguments.length, e2 = new Array(i2 > 1 ? i2 - 1 : 0), r2 = 1; r2 < i2; r2++) e2[r2 - 1] = arguments[r2];
    $i.info("[WebExperiments] " + t2, e2);
  }
  Ee(t2, i2, e2) {
    this._is_bot() ? Yo.ye("Refusing to render web experiment since the viewer is a likely bot") : "control" !== i2 ? e2.forEach(((e3) => {
      if (e3.selector) {
        var r2;
        Yo.ye("applying transform of variant " + i2 + " for experiment " + t2 + " ", e3);
        var s2 = null == (r2 = document) ? void 0 : r2.querySelectorAll(e3.selector);
        null == s2 || s2.forEach(((t3) => {
          var i3 = t3;
          e3.html && (i3.innerHTML = e3.html), e3.css && i3.setAttribute("style", e3.css);
        }));
      }
    })) : Yo.ye("Control variants leave the page unmodified.");
  }
  _is_bot() {
    return n && this._instance ? Us(n, this._instance.config.custom_blocked_useragents) : void 0;
  }
}
var Jo = ki("[Conversations]");
var Ko = { featureFlags: class {
  constructor(t2) {
    this.Pe = false, this.Te = false, this.Re = false, this.Ie = false, this.Ce = false, this.Oe = false, this.Fe = false, this.Me = false, this._instance = t2, this.featureFlagEventHandlers = [];
  }
  Ae() {
    var t2, i2;
    return null !== (t2 = null == (i2 = this._instance.persistence) ? void 0 : i2.nt(this._instance.config.feature_flag_cache_ttl_ms)) && void 0 !== t2 && t2;
  }
  De() {
    return !!this.Ae() && (this.Me || this.Re || (this.Me = true, To.warn("Feature flag cache is stale, triggering refresh..."), this.reloadFeatureFlags()), true);
  }
  je() {
    var t2, i2 = null !== (t2 = this._instance.config.evaluation_contexts) && void 0 !== t2 ? t2 : this._instance.config.evaluation_environments;
    return !this._instance.config.evaluation_environments || this._instance.config.evaluation_contexts || this.Fe || (To.warn("evaluation_environments is deprecated. Use evaluation_contexts instead. evaluation_environments will be removed in a future version."), this.Fe = true), null != i2 && i2.length ? i2.filter(((t3) => {
      var i3 = t3 && "string" == typeof t3 && t3.trim().length > 0;
      return i3 || To.error("Invalid evaluation context found:", t3, "Expected non-empty string"), i3;
    })) : [];
  }
  Le() {
    return this.je().length > 0;
  }
  initialize() {
    var t2, i2, { config: e2 } = this._instance, r2 = null !== (t2 = null == (i2 = e2.bootstrap) ? void 0 : i2.featureFlags) && void 0 !== t2 ? t2 : {};
    if (Object.keys(r2).length) {
      var s2, n2, o2 = null !== (s2 = null == (n2 = e2.bootstrap) ? void 0 : n2.featureFlagPayloads) && void 0 !== s2 ? s2 : {}, a2 = Object.keys(r2).filter(((t3) => !!r2[t3])).reduce(((t3, i3) => (t3[i3] = r2[i3] || false, t3)), {}), l2 = Object.keys(o2).filter(((t3) => a2[t3])).reduce(((t3, i3) => (o2[i3] && (t3[i3] = o2[i3]), t3)), {});
      this.receivedFeatureFlags({ featureFlags: a2, featureFlagPayloads: l2 });
    }
  }
  updateFlags(t2, i2, e2) {
    var r2 = null != e2 && e2.merge ? this.getFlagVariants() : {}, s2 = null != e2 && e2.merge ? this.getFlagPayloads() : {}, n2 = g({}, r2, t2), o2 = g({}, s2, i2), a2 = {};
    for (var [l2, u2] of Object.entries(n2)) {
      var h2 = "string" == typeof u2;
      a2[l2] = { key: l2, enabled: !!h2 || Boolean(u2), variant: h2 ? u2 : void 0, reason: void 0, metadata: M(null == o2 ? void 0 : o2[l2]) ? void 0 : { id: 0, version: void 0, description: void 0, payload: o2[l2] } };
    }
    this.receivedFeatureFlags({ flags: a2 });
  }
  get hasLoadedFlags() {
    return this.Te;
  }
  getFlags() {
    return Object.keys(this.getFlagVariants());
  }
  getFlagsWithDetails() {
    var t2 = this._instance.get_property(ae), i2 = this._instance.get_property(Lo), e2 = this._instance.get_property(Uo);
    if (!e2 && !i2) return t2 || {};
    var r2 = Oi({}, t2 || {}), s2 = [.../* @__PURE__ */ new Set([...Object.keys(e2 || {}), ...Object.keys(i2 || {})])];
    for (var n2 of s2) {
      var o2, a2, l2 = r2[n2], u2 = null == i2 ? void 0 : i2[n2], h2 = M(u2) ? null !== (o2 = null == l2 ? void 0 : l2.enabled) && void 0 !== o2 && o2 : !!u2, d2 = M(u2) ? l2.variant : "string" == typeof u2 ? u2 : void 0, v2 = null == e2 ? void 0 : e2[n2], c2 = g({}, l2, { enabled: h2, variant: h2 ? null != d2 ? d2 : null == l2 ? void 0 : l2.variant : void 0 });
      if (h2 !== (null == l2 ? void 0 : l2.enabled) && (c2.original_enabled = null == l2 ? void 0 : l2.enabled), d2 !== (null == l2 ? void 0 : l2.variant) && (c2.original_variant = null == l2 ? void 0 : l2.variant), v2) c2.metadata = g({}, null == l2 ? void 0 : l2.metadata, { payload: v2, original_payload: null == l2 || null == (a2 = l2.metadata) ? void 0 : a2.payload });
      r2[n2] = c2;
    }
    return this.Pe || (To.warn(" Overriding feature flag details!", { flagDetails: t2, overriddenPayloads: e2, finalDetails: r2 }), this.Pe = true), r2;
  }
  getFlagVariants() {
    var t2 = this._instance.get_property(ne), i2 = this._instance.get_property(Lo);
    if (!i2) return t2 || {};
    for (var e2 = Oi({}, t2), r2 = Object.keys(i2), s2 = 0; s2 < r2.length; s2++) e2[r2[s2]] = i2[r2[s2]];
    return this.Pe || (To.warn(" Overriding feature flags!", { enabledFlags: t2, overriddenFlags: i2, finalFlags: e2 }), this.Pe = true), e2;
  }
  getFlagPayloads() {
    var t2 = this._instance.get_property(No), i2 = this._instance.get_property(Uo);
    if (!i2) return t2 || {};
    for (var e2 = Oi({}, t2 || {}), r2 = Object.keys(i2), s2 = 0; s2 < r2.length; s2++) e2[r2[s2]] = i2[r2[s2]];
    return this.Pe || (To.warn(" Overriding feature flag payloads!", { flagPayloads: t2, overriddenPayloads: i2, finalPayloads: e2 }), this.Pe = true), e2;
  }
  reloadFeatureFlags() {
    this.Ie || this._instance.config.advanced_disable_feature_flags || this.Ne || (this._instance.pi.emit("featureFlagsReloading", true), this.Ne = setTimeout((() => {
      this.Ue();
    }), 5));
  }
  ze() {
    clearTimeout(this.Ne), this.Ne = void 0;
  }
  ensureFlagsLoaded() {
    this.Te || this.Re || this.Ne || this.reloadFeatureFlags();
  }
  setAnonymousDistinctId(t2) {
    this.$anon_distinct_id = t2;
  }
  setReloadingPaused(t2) {
    this.Ie = t2;
  }
  Ue(t2) {
    var i2;
    if (this.ze(), !this._instance.bt()) if (this.Re) this.Ce = true;
    else {
      var e2 = this._instance.config.token, r2 = this._instance.get_property("$device_id"), s2 = { token: e2, distinct_id: this._instance.get_distinct_id(), groups: this._instance.getGroups(), $anon_distinct_id: this.$anon_distinct_id, person_properties: g({}, (null == (i2 = this._instance.persistence) ? void 0 : i2.get_initial_props()) || {}, this._instance.get_property(le) || {}), group_properties: this._instance.get_property(ue), timezone: br() };
      j(r2) || M(r2) || (s2.$device_id = r2), (null != t2 && t2.disableFlags || this._instance.config.advanced_disable_feature_flags) && (s2.disable_flags = true), this.Le() && (s2.evaluation_contexts = this.je());
      var n2 = this._instance.config.advanced_only_evaluate_survey_feature_flags ? "&only_evaluate_survey_feature_flags=true" : "", o2 = this._instance.requestRouter.endpointFor("flags", "/flags/?v=2" + n2);
      this.Re = true, this._instance._send_request({ method: "POST", url: o2, data: s2, compression: this._instance.config.disable_compression ? void 0 : Br.Base64, timeout: this._instance.config.feature_flag_request_timeout_ms, callback: (t3) => {
        var i3, e3, r3, n3 = true;
        if (200 === t3.statusCode && (this.Ce || (this.$anon_distinct_id = void 0), n3 = false), this.Re = false, !s2.disable_flags || this.Ce) {
          this.Oe = !n3;
          var o3 = [];
          t3.error ? t3.error instanceof Error ? o3.push("AbortError" === t3.error.name ? Fo : Mo) : o3.push(Ao) : 200 !== t3.statusCode && o3.push(Do(t3.statusCode)), null != (i3 = t3.json) && i3.errorsWhileComputingFlags && o3.push(Io);
          var a2 = !(null == (e3 = t3.json) || null == (e3 = e3.quotaLimited) || !e3.includes(Vo.FeatureFlags));
          if (a2 && o3.push(Oo), null == (r3 = this._instance.persistence) || r3.register({ [ce]: o3 }), a2) To.warn("You have hit your feature flags quota limit, and will not be able to load feature flags until the quota is reset.  Please visit https://posthog.com/docs/billing/limits-alerts to learn more.");
          else {
            var l2;
            if (!s2.disable_flags) this.receivedFeatureFlags(null !== (l2 = t3.json) && void 0 !== l2 ? l2 : {}, n3);
            this.Ce && (this.Ce = false, this.Ue());
          }
        }
      } });
    }
  }
  getFeatureFlag(t2, i2) {
    var e2;
    if (void 0 === i2 && (i2 = {}), !i2.fresh || this.Oe) if (this.Te || this.getFlags() && this.getFlags().length > 0) {
      if (!this.De()) {
        var r2 = this.getFeatureFlagResult(t2, i2);
        return null !== (e2 = null == r2 ? void 0 : r2.variant) && void 0 !== e2 ? e2 : null == r2 ? void 0 : r2.enabled;
      }
    } else To.warn('getFeatureFlag for key "' + t2 + `" failed. Feature flags didn't load in time.`);
  }
  getFeatureFlagDetails(t2) {
    return this.getFlagsWithDetails()[t2];
  }
  getFeatureFlagPayload(t2) {
    var i2 = this.getFeatureFlagResult(t2, { send_event: false });
    return null == i2 ? void 0 : i2.payload;
  }
  getFeatureFlagResult(t2, i2) {
    if (void 0 === i2 && (i2 = {}), !i2.fresh || this.Oe) if (this.Te || this.getFlags() && this.getFlags().length > 0) {
      if (!this.De()) {
        var e2 = this.getFlagVariants(), r2 = t2 in e2, s2 = e2[t2], n2 = this.getFlagPayloads()[t2], o2 = String(s2), a2 = this._instance.get_property(zo) || void 0, l2 = this._instance.get_property(fe) || void 0, u2 = this._instance.get_property(de) || {};
        if (this._instance.config.advanced_feature_flags_dedup_per_session) {
          var h2, d2 = this._instance.get_session_id(), v2 = this._instance.get_property(ve);
          if (d2 && d2 !== v2) u2 = {}, null == (h2 = this._instance.persistence) || h2.register({ [de]: u2, [ve]: d2 });
        }
        if ((i2.send_event || !("send_event" in i2)) && (!(t2 in u2) || !u2[t2].includes(o2))) {
          var c2, f2, p2, _2, g2, m2, b2, y2, w2, E2;
          I(u2[t2]) ? u2[t2].push(o2) : u2[t2] = [o2], null == (c2 = this._instance.persistence) || c2.register({ [de]: u2 });
          var S2 = this.getFeatureFlagDetails(t2), x2 = [...null !== (f2 = this._instance.get_property(ce)) && void 0 !== f2 ? f2 : []];
          M(s2) && x2.push(Co);
          var k2 = { $feature_flag: t2, $feature_flag_response: s2, $feature_flag_payload: n2 || null, $feature_flag_request_id: a2, $feature_flag_evaluated_at: l2, $feature_flag_bootstrapped_response: (null == (p2 = this._instance.config.bootstrap) || null == (p2 = p2.featureFlags) ? void 0 : p2[t2]) || null, $feature_flag_bootstrapped_payload: (null == (_2 = this._instance.config.bootstrap) || null == (_2 = _2.featureFlagPayloads) ? void 0 : _2[t2]) || null, $used_bootstrap_value: !this.Oe };
          M(null == S2 || null == (g2 = S2.metadata) ? void 0 : g2.version) || (k2.$feature_flag_version = S2.metadata.version);
          var P2, T2 = null !== (m2 = null == S2 || null == (b2 = S2.reason) ? void 0 : b2.description) && void 0 !== m2 ? m2 : null == S2 || null == (y2 = S2.reason) ? void 0 : y2.code;
          if (T2 && (k2.$feature_flag_reason = T2), null != S2 && null != (w2 = S2.metadata) && w2.id && (k2.$feature_flag_id = S2.metadata.id), M(null == S2 ? void 0 : S2.original_variant) && M(null == S2 ? void 0 : S2.original_enabled) || (k2.$feature_flag_original_response = M(S2.original_variant) ? S2.original_enabled : S2.original_variant), null != S2 && null != (E2 = S2.metadata) && E2.original_payload) k2.$feature_flag_original_payload = null == S2 || null == (P2 = S2.metadata) ? void 0 : P2.original_payload;
          x2.length && (k2.$feature_flag_error = x2.join(",")), this._instance.capture("$feature_flag_called", k2);
        }
        if (r2) {
          var R2 = n2;
          if (!M(n2)) try {
            R2 = JSON.parse(n2);
          } catch (t3) {
          }
          return { key: t2, enabled: !!s2, variant: "string" == typeof s2 ? s2 : void 0, payload: R2 };
        }
      }
    } else To.warn('getFeatureFlagResult for key "' + t2 + `" failed. Feature flags didn't load in time.`);
  }
  getRemoteConfigPayload(t2, i2) {
    var e2 = this._instance.config.token, r2 = { distinct_id: this._instance.get_distinct_id(), token: e2 };
    this.Le() && (r2.evaluation_contexts = this.je()), this._instance._send_request({ method: "POST", url: this._instance.requestRouter.endpointFor("flags", "/flags/?v=2"), data: r2, compression: this._instance.config.disable_compression ? void 0 : Br.Base64, timeout: this._instance.config.feature_flag_request_timeout_ms, callback: (e3) => {
      var r3, s2 = null == (r3 = e3.json) ? void 0 : r3.featureFlagPayloads;
      i2((null == s2 ? void 0 : s2[t2]) || void 0);
    } });
  }
  isFeatureEnabled(t2, i2) {
    if (void 0 === i2 && (i2 = {}), !i2.fresh || this.Oe) {
      if (this.Te || this.getFlags() && this.getFlags().length > 0) {
        var e2 = this.getFeatureFlag(t2, i2);
        return M(e2) ? void 0 : !!e2;
      }
      To.warn('isFeatureEnabled for key "' + t2 + `" failed. Feature flags didn't load in time.`);
    }
  }
  addFeatureFlagsHandler(t2) {
    this.featureFlagEventHandlers.push(t2);
  }
  removeFeatureFlagsHandler(t2) {
    this.featureFlagEventHandlers = this.featureFlagEventHandlers.filter(((i2) => i2 !== t2));
  }
  receivedFeatureFlags(t2, i2) {
    if (this._instance.persistence) {
      this.Te = true;
      var e2 = this.getFlagVariants(), r2 = this.getFlagPayloads(), s2 = this.getFlagsWithDetails();
      !(function(t3, i3, e3, r3, s3) {
        void 0 === e3 && (e3 = {}), void 0 === r3 && (r3 = {}), void 0 === s3 && (s3 = {});
        var n2 = qo(t3), o2 = n2.flags, a2 = n2.featureFlags, l2 = n2.featureFlagPayloads;
        if (a2) {
          var u2 = t3.requestId, h2 = t3.evaluatedAt;
          if (I(a2)) {
            To.warn("v1 of the feature flags endpoint is deprecated. Please use the latest version.");
            var d2 = {};
            if (a2) for (var v2 = 0; v2 < a2.length; v2++) d2[a2[v2]] = true;
            i3 && i3.register({ [jo]: a2, [ne]: d2 });
          } else {
            var c2 = a2, f2 = l2, p2 = o2;
            if (t3.errorsWhileComputingFlags) if (o2) {
              var _2 = new Set(Object.keys(o2).filter(((t4) => {
                var i4;
                return !(null != (i4 = o2[t4]) && i4.failed);
              })));
              c2 = g({}, e3, Object.fromEntries(Object.entries(c2).filter(((t4) => {
                var [i4] = t4;
                return _2.has(i4);
              })))), f2 = g({}, r3, Object.fromEntries(Object.entries(f2 || {}).filter(((t4) => {
                var [i4] = t4;
                return _2.has(i4);
              })))), p2 = g({}, s3, Object.fromEntries(Object.entries(p2 || {}).filter(((t4) => {
                var [i4] = t4;
                return _2.has(i4);
              }))));
            } else c2 = g({}, e3, c2), f2 = g({}, r3, f2), p2 = g({}, s3, p2);
            i3 && i3.register(g({ [jo]: Object.keys(Bo(c2)), [ne]: c2 || {}, [No]: f2 || {}, [ae]: p2 || {} }, u2 ? { [zo]: u2 } : {}, h2 ? { [fe]: h2 } : {}));
          }
        }
      })(t2, this._instance.persistence, e2, r2, s2), i2 || (this.Me = false), this.He(i2);
    }
  }
  override(t2, i2) {
    void 0 === i2 && (i2 = false), To.warn("override is deprecated. Please use overrideFeatureFlags instead."), this.overrideFeatureFlags({ flags: t2, suppressWarning: i2 });
  }
  overrideFeatureFlags(t2) {
    if (!this._instance.__loaded || !this._instance.persistence) return To.uninitializedWarning("posthog.featureFlags.overrideFeatureFlags");
    if (false === t2) return this._instance.persistence.unregister(Lo), this._instance.persistence.unregister(Uo), this.He(), Ro.info("All overrides cleared");
    if (I(t2)) {
      var i2 = Ho(t2);
      return this._instance.persistence.register({ [Lo]: i2 }), this.He(), Ro.info("Flag overrides set", { flags: t2 });
    }
    if (t2 && "object" == typeof t2 && ("flags" in t2 || "payloads" in t2)) {
      var e2, r2 = t2;
      if (this.Pe = Boolean(null !== (e2 = r2.suppressWarning) && void 0 !== e2 && e2), "flags" in r2) {
        if (false === r2.flags) this._instance.persistence.unregister(Lo), Ro.info("Flag overrides cleared");
        else if (r2.flags) {
          if (I(r2.flags)) {
            var s2 = Ho(r2.flags);
            this._instance.persistence.register({ [Lo]: s2 });
          } else this._instance.persistence.register({ [Lo]: r2.flags });
          Ro.info("Flag overrides set", { flags: r2.flags });
        }
      }
      return "payloads" in r2 && (false === r2.payloads ? (this._instance.persistence.unregister(Uo), Ro.info("Payload overrides cleared")) : r2.payloads && (this._instance.persistence.register({ [Uo]: r2.payloads }), Ro.info("Payload overrides set", { payloads: r2.payloads }))), void this.He();
    }
    if (t2 && "object" == typeof t2) return this._instance.persistence.register({ [Lo]: t2 }), this.He(), Ro.info("Flag overrides set", { flags: t2 });
    To.warn("Invalid overrideOptions provided to overrideFeatureFlags", { overrideOptions: t2 });
  }
  onFeatureFlags(t2) {
    if (this.addFeatureFlagsHandler(t2), this.Te) {
      var { flags: i2, flagVariants: e2 } = this.Be();
      t2(i2, e2);
    }
    return () => this.removeFeatureFlagsHandler(t2);
  }
  updateEarlyAccessFeatureEnrollment(t2, i2, e2) {
    var r2, s2 = (this._instance.get_property(oe) || []).find(((i3) => i3.flagKey === t2)), n2 = { ["$feature_enrollment/" + t2]: i2 }, o2 = { $feature_flag: t2, $feature_enrollment: i2, $set: n2 };
    s2 && (o2.$early_access_feature_name = s2.name), e2 && (o2.$feature_enrollment_stage = e2), this._instance.capture("$feature_enrollment_update", o2), this.setPersonPropertiesForFlags(n2, false);
    var a2 = g({}, this.getFlagVariants(), { [t2]: i2 });
    null == (r2 = this._instance.persistence) || r2.register({ [jo]: Object.keys(Bo(a2)), [ne]: a2 }), this.He();
  }
  getEarlyAccessFeatures(t2, i2, e2) {
    void 0 === i2 && (i2 = false);
    var r2 = this._instance.get_property(oe), s2 = e2 ? "&" + e2.map(((t3) => "stage=" + t3)).join("&") : "";
    if (r2 && !i2) return t2(r2);
    this._instance._send_request({ url: this._instance.requestRouter.endpointFor("api", "/api/early_access_features/?token=" + this._instance.config.token + s2), method: "GET", callback: (i3) => {
      var e3, r3;
      if (i3.json) {
        var s3 = i3.json.earlyAccessFeatures;
        return null == (e3 = this._instance.persistence) || e3.unregister(oe), null == (r3 = this._instance.persistence) || r3.register({ [oe]: s3 }), t2(s3);
      }
    } });
  }
  Be() {
    var t2 = this.getFlags(), i2 = this.getFlagVariants();
    return { flags: t2.filter(((t3) => i2[t3])), flagVariants: Object.keys(i2).filter(((t3) => i2[t3])).reduce(((t3, e2) => (t3[e2] = i2[e2], t3)), {}) };
  }
  He(t2) {
    var { flags: i2, flagVariants: e2 } = this.Be();
    this.featureFlagEventHandlers.forEach(((r2) => r2(i2, e2, { errorsLoading: t2 })));
  }
  setPersonPropertiesForFlags(t2, i2) {
    void 0 === i2 && (i2 = true);
    var e2 = this._instance.get_property(le) || {};
    this._instance.register({ [le]: g({}, e2, t2) }), i2 && this._instance.reloadFeatureFlags();
  }
  resetPersonPropertiesForFlags() {
    this._instance.unregister(le);
  }
  setGroupPropertiesForFlags(t2, i2) {
    void 0 === i2 && (i2 = true);
    var e2 = this._instance.get_property(ue) || {};
    0 !== Object.keys(e2).length && Object.keys(e2).forEach(((i3) => {
      e2[i3] = g({}, e2[i3], t2[i3]), delete t2[i3];
    })), this._instance.register({ [ue]: g({}, e2, t2) }), i2 && this._instance.reloadFeatureFlags();
  }
  resetGroupPropertiesForFlags(t2) {
    if (t2) {
      var i2 = this._instance.get_property(ue) || {};
      this._instance.register({ [ue]: g({}, i2, { [t2]: {} }) });
    } else this._instance.unregister(ue);
  }
  reset() {
    this.Te = false, this.Re = false, this.Ie = false, this.Ce = false, this.Oe = false, this.$anon_distinct_id = void 0, this.ze(), this.Pe = false;
  }
} }, Xo = { sessionRecording: class {
  get started() {
    var t2;
    return !(null == (t2 = this.qe) || !t2.isStarted);
  }
  get status() {
    var t2, i2;
    return this.Ve === uo || this.Ve === ho ? this.Ve : null !== (t2 = null == (i2 = this.qe) ? void 0 : i2.status) && void 0 !== t2 ? t2 : this.Ve;
  }
  constructor(t2) {
    if (this._forceAllowLocalhostNetworkCapture = false, this.Ve = ao, this.We = void 0, this._instance = t2, !this._instance.sessionManager) throw co.error("started without valid sessionManager"), new Error(vo + " started without valid sessionManager. This is a bug.");
    if ("always" === this._instance.config.cookieless_mode) throw new Error(vo + ' cannot be used with cookieless_mode="always"');
  }
  initialize() {
    this.startIfEnabledOrStop();
  }
  get Ge() {
    var i2, e2 = !(null == (i2 = this._instance.get_property(ee)) || !i2.enabled), r2 = !this._instance.config.disable_session_recording, s2 = this._instance.config.disable_session_recording || this._instance.consent.isOptedOut();
    return t && e2 && r2 && !s2;
  }
  startIfEnabledOrStop(t2) {
    var i2;
    if (!this.Ge || null == (i2 = this.qe) || !i2.isStarted) {
      var e2 = !M(Object.assign) && !M(Array.from);
      this.Ge && e2 ? (this.Ye(t2), co.info("starting")) : (this.Ve = ao, this.stopRecording());
    }
  }
  Ye(t2) {
    var i2, e2, r2;
    this.Ge && (this.Ve !== uo && this.Ve !== ho && (this.Ve = lo), null != v && null != (i2 = v.__PosthogExtensions__) && null != (i2 = i2.rrweb) && i2.record && null != (e2 = v.__PosthogExtensions__) && e2.initSessionRecording ? this.Je(t2) : null == (r2 = v.__PosthogExtensions__) || null == r2.loadExternalDependency || r2.loadExternalDependency(this._instance, this.Ke, ((i3) => {
      if (i3) return co.error("could not load recorder", i3);
      this.Je(t2);
    })));
  }
  stopRecording() {
    var t2, i2;
    null == (t2 = this.We) || t2.call(this), this.We = void 0, null == (i2 = this.qe) || i2.stop();
  }
  Xe() {
    var t2, i2;
    null == (t2 = this.We) || t2.call(this), this.We = void 0, null == (i2 = this.qe) || i2.discard();
  }
  Qe() {
    var t2;
    null == (t2 = this._instance.persistence) || t2.unregister(se);
  }
  Ze(t2, i2) {
    if (L(t2)) return null;
    var e2, r2 = N(t2) ? t2 : parseFloat(t2);
    return "number" == typeof (e2 = r2) && Number.isFinite(e2) && e2 >= 0 && e2 <= 1 ? r2 : (co.warn(i2 + " must be between 0 and 1. Ignoring invalid value:", t2), null);
  }
  tr(t2) {
    if (this._instance.persistence) {
      var i2, e2, r2 = this._instance.persistence, s2 = () => {
        var i3, e3 = false === t2.sessionRecording ? void 0 : t2.sessionRecording, s3 = this.Ze(null == (i3 = this._instance.config.session_recording) ? void 0 : i3.sampleRate, "session_recording.sampleRate"), n2 = this.Ze(null == e3 ? void 0 : e3.sampleRate, "remote config sampleRate"), o2 = null != s3 ? s3 : n2;
        L(o2) && this.Qe();
        var a2 = null == e3 ? void 0 : e3.minimumDurationMilliseconds;
        r2.register({ [ee]: g({ cache_timestamp: Date.now(), enabled: !!e3 }, e3, { networkPayloadCapture: g({ capturePerformance: t2.capturePerformance }, null == e3 ? void 0 : e3.networkPayloadCapture), canvasRecording: { enabled: null == e3 ? void 0 : e3.recordCanvas, fps: null == e3 ? void 0 : e3.canvasFps, quality: null == e3 ? void 0 : e3.canvasQuality }, sampleRate: o2, minimumDurationMilliseconds: M(a2) ? null : a2, endpoint: null == e3 ? void 0 : e3.endpoint, triggerMatchType: null == e3 ? void 0 : e3.triggerMatchType, masking: null == e3 ? void 0 : e3.masking, urlTriggers: null == e3 ? void 0 : e3.urlTriggers }) });
      };
      s2(), null == (i2 = this.We) || i2.call(this), this.We = null == (e2 = this._instance.sessionManager) ? void 0 : e2.onSessionId(s2);
    }
  }
  onRemoteConfig(t2) {
    return "sessionRecording" in t2 ? false === t2.sessionRecording ? (this.tr(t2), void this.Xe()) : (this.tr(t2), void this.startIfEnabledOrStop()) : (this.Ve === uo && (this.Ve = ho, co.warn("config refresh failed, recording will not start until page reload")), void this.startIfEnabledOrStop());
  }
  log(t2, i2) {
    var e2;
    void 0 === i2 && (i2 = "log"), null != (e2 = this.qe) && e2.log ? this.qe.log(t2, i2) : co.warn("log called before recorder was ready");
  }
  get Ke() {
    var t2, i2, e2 = null == (t2 = this._instance) || null == (t2 = t2.persistence) ? void 0 : t2.get_property(ee);
    return (null == e2 || null == (i2 = e2.scriptConfig) ? void 0 : i2.script) || "lazy-recorder";
  }
  ir() {
    var t2, i2 = this._instance.get_property(ee);
    if (!i2) return false;
    var e2 = null !== (t2 = ("object" == typeof i2 ? i2 : JSON.parse(i2)).cache_timestamp) && void 0 !== t2 ? t2 : Date.now();
    return Date.now() - e2 <= 36e5;
  }
  Je(t2) {
    var i2, e2;
    if (null == (i2 = v.__PosthogExtensions__) || !i2.initSessionRecording) throw Error("Called on script loaded before session recording is available");
    this.qe || (this.qe = null == (e2 = v.__PosthogExtensions__) ? void 0 : e2.initSessionRecording(this._instance), this.qe._forceAllowLocalhostNetworkCapture = this._forceAllowLocalhostNetworkCapture);
    if (!this.ir()) {
      if (this.Ve === ho || this.Ve === uo) return;
      return this.Ve = uo, co.info("persisted remote config is stale, requesting fresh config before starting"), void new zr(this._instance).load();
    }
    this.Ve = lo, this.qe.start(t2);
  }
  onRRwebEmit(t2) {
    var i2;
    null == (i2 = this.qe) || null == i2.onRRwebEmit || i2.onRRwebEmit(t2);
  }
  overrideLinkedFlag() {
    var t2, i2;
    this.qe || (null == (i2 = this._instance.persistence) || i2.register({ $replay_override_linked_flag: true }));
    null == (t2 = this.qe) || t2.overrideLinkedFlag();
  }
  overrideSampling() {
    var t2, i2;
    this.qe || (null == (i2 = this._instance.persistence) || i2.register({ $replay_override_sampling: true }));
    null == (t2 = this.qe) || t2.overrideSampling();
  }
  overrideTrigger(t2) {
    var i2, e2;
    this.qe || (null == (e2 = this._instance.persistence) || e2.register({ ["url" === t2 ? "$replay_override_url_trigger" : "$replay_override_event_trigger"]: true }));
    null == (i2 = this.qe) || i2.overrideTrigger(t2);
  }
  get sdkDebugProperties() {
    var t2;
    return (null == (t2 = this.qe) ? void 0 : t2.sdkDebugProperties) || { $recording_status: this.status };
  }
  tryAddCustomEvent(t2, i2) {
    var e2;
    return !(null == (e2 = this.qe) || !e2.tryAddCustomEvent(t2, i2));
  }
} }, Qo = { autocapture: class {
  constructor(t2) {
    this.er = false, this.rr = null, this.sr = false, this.instance = t2, this.rageclicks = new Jn(t2.config.rageclick), this.nr = null;
  }
  initialize() {
    this.startIfEnabled();
  }
  get N() {
    var t2, i2, e2 = O(this.instance.config.autocapture) ? this.instance.config.autocapture : {};
    return e2.url_allowlist = null == (t2 = e2.url_allowlist) ? void 0 : t2.map(((t3) => new RegExp(t3))), e2.url_ignorelist = null == (i2 = e2.url_ignorelist) ? void 0 : i2.map(((t3) => new RegExp(t3))), e2;
  }
  ar() {
    if (this.isBrowserSupported()) {
      if (t && o) {
        var i2 = (i3) => {
          i3 = i3 || (null == t ? void 0 : t.event);
          try {
            this.lr(i3);
          } catch (t2) {
            Xn.error("Failed to capture event", t2);
          }
        };
        if (Hi(o, "submit", i2, { capture: true }), Hi(o, "change", i2, { capture: true }), Hi(o, "click", i2, { capture: true }), this.N.capture_copied_text) {
          var e2 = (i3) => {
            i3 = i3 || (null == t ? void 0 : t.event), this.lr(i3, Kn);
          };
          Hi(o, "copy", e2, { capture: true }), Hi(o, "cut", e2, { capture: true });
        }
      }
    } else Xn.info("Disabling Automatic Event Collection because this browser is not supported");
  }
  startIfEnabled() {
    this.isEnabled && !this.er && (this.ar(), this.er = true);
  }
  onRemoteConfig(t2) {
    t2.elementsChainAsString && (this.sr = t2.elementsChainAsString), this.instance.persistence && this.instance.persistence.register({ [Gi]: !!t2.autocapture_opt_out }), this.rr = !!t2.autocapture_opt_out, this.startIfEnabled();
  }
  setElementSelectors(t2) {
    this.nr = t2;
  }
  getElementSelectors(t2) {
    var i2, e2 = [];
    return null == (i2 = this.nr) || i2.forEach(((i3) => {
      var r2 = null == o ? void 0 : o.querySelectorAll(i3);
      null == r2 || r2.forEach(((r3) => {
        t2 === r3 && e2.push(i3);
      }));
    })), e2;
  }
  get isEnabled() {
    var t2, i2, e2 = null == (t2 = this.instance.persistence) ? void 0 : t2.props[Gi], r2 = this.rr;
    if (j(r2) && !z(e2) && !this.instance.bt()) return false;
    var s2 = null !== (i2 = this.rr) && void 0 !== i2 ? i2 : !!e2;
    return !!this.instance.config.autocapture && !s2;
  }
  lr(i2, e2) {
    if (void 0 === e2 && (e2 = "$autocapture"), this.isEnabled) {
      var r2, s2 = xn(i2);
      if (gn(s2) && (s2 = s2.parentNode || null), "$autocapture" === e2 && "click" === i2.type && i2 instanceof MouseEvent) this.instance.config.rageclick && null != (r2 = this.rageclicks) && r2.isRageClick(i2.clientX, i2.clientY, i2.timeStamp || (/* @__PURE__ */ new Date()).getTime()) && Cn(s2, this.instance.config.rageclick) && this.lr(i2, "$rageclick");
      var n2 = e2 === Kn;
      if (s2 && Mn(s2, i2, this.N, n2, n2 ? ["copy", "cut"] : void 0)) {
        var { props: o2, explicitNoCapture: a2 } = io(s2, { e: i2, maskAllElementAttributes: this.instance.config.mask_all_element_attributes, maskAllText: this.instance.config.mask_all_text, elementAttributeIgnoreList: this.N.element_attribute_ignorelist, elementsChainAsString: this.sr });
        if (a2) return false;
        var l2 = this.getElementSelectors(s2);
        if (l2 && l2.length > 0 && (o2.$element_selectors = l2), e2 === Kn) {
          var u2, h2 = En(null == t || null == (u2 = t.getSelection()) ? void 0 : u2.toString()), d2 = i2.type || "clipboard";
          if (!h2) return false;
          o2.$selected_content = h2, o2.$copy_type = d2;
        }
        return this.instance.capture(e2, o2), true;
      }
    }
  }
  isBrowserSupported() {
    return C(null == o ? void 0 : o.querySelectorAll);
  }
}, historyAutocapture: class {
  constructor(i2) {
    var e2;
    this._instance = i2, this.ur = (null == t || null == (e2 = t.location) ? void 0 : e2.pathname) || "";
  }
  initialize() {
    this.startIfEnabled();
  }
  get isEnabled() {
    return "history_change" === this._instance.config.capture_pageview;
  }
  startIfEnabled() {
    this.isEnabled && ($i.info("History API monitoring enabled, starting..."), this.monitorHistoryChanges());
  }
  stop() {
    this.hr && this.hr(), this.hr = void 0, $i.info("History API monitoring stopped");
  }
  monitorHistoryChanges() {
    var i2, e2;
    if (t && t.history) {
      var r2 = this;
      null != (i2 = t.history.pushState) && i2.__posthog_wrapped__ || ro(t.history, "pushState", ((t2) => function(i3, e3, s2) {
        t2.call(this, i3, e3, s2), r2.dr("pushState");
      })), null != (e2 = t.history.replaceState) && e2.__posthog_wrapped__ || ro(t.history, "replaceState", ((t2) => function(i3, e3, s2) {
        t2.call(this, i3, e3, s2), r2.dr("replaceState");
      })), this.vr();
    }
  }
  dr(i2) {
    try {
      var e2, r2 = null == t || null == (e2 = t.location) ? void 0 : e2.pathname;
      if (!r2) return;
      r2 !== this.ur && this.isEnabled && this._instance.capture("$pageview", { navigation_type: i2 }), this.ur = r2;
    } catch (t2) {
      $i.error("Error capturing " + i2 + " pageview", t2);
    }
  }
  vr() {
    if (!this.hr) {
      var i2 = () => {
        this.dr("popstate");
      };
      Hi(t, "popstate", i2), this.hr = () => {
        t && t.removeEventListener("popstate", i2);
      };
    }
  }
}, heatmaps: class {
  constructor(t2) {
    var i2;
    this.cr = false, this.er = false, this.pr = null, this.instance = t2, this.cr = !(null == (i2 = this.instance.persistence) || !i2.props[Yi]), this.rageclicks = new Jn(t2.config.rageclick);
  }
  initialize() {
    this.startIfEnabled();
  }
  get flushIntervalMilliseconds() {
    var t2 = 5e3;
    return O(this.instance.config.capture_heatmaps) && this.instance.config.capture_heatmaps.flush_interval_milliseconds && (t2 = this.instance.config.capture_heatmaps.flush_interval_milliseconds), t2;
  }
  get isEnabled() {
    return L(this.instance.config.capture_heatmaps) ? L(this.instance.config.enable_heatmaps) ? this.cr : this.instance.config.enable_heatmaps : false !== this.instance.config.capture_heatmaps;
  }
  startIfEnabled() {
    if (this.isEnabled) {
      if (this.er) return;
      fo.info("starting..."), this._r(), this.gr();
    } else {
      var t2;
      clearInterval(null !== (t2 = this.pr) && void 0 !== t2 ? t2 : void 0), this.mr(), this.getAndClearBuffer();
    }
  }
  onRemoteConfig(t2) {
    if ("heatmaps" in t2) {
      var i2 = !!t2.heatmaps;
      this.instance.persistence && this.instance.persistence.register({ [Yi]: i2 }), this.cr = i2, this.startIfEnabled();
    }
  }
  getAndClearBuffer() {
    var t2 = this.C;
    return this.C = void 0, t2;
  }
  br(t2) {
    this.yr(t2.originalEvent, "deadclick");
  }
  gr() {
    this.pr && clearInterval(this.pr), this.pr = (function(t2) {
      return "visible" === (null == t2 ? void 0 : t2.visibilityState);
    })(o) ? setInterval(this.Ft.bind(this), this.flushIntervalMilliseconds) : null;
  }
  _r() {
    t && o && (this.wr = this.Ft.bind(this), Hi(t, "beforeunload", this.wr), this.Er = (i2) => this.yr(i2 || (null == t ? void 0 : t.event)), Hi(o, "click", this.Er, { capture: true }), this.Sr = (i2) => this.$r(i2 || (null == t ? void 0 : t.event)), Hi(o, "mousemove", this.Sr, { capture: true }), this.kr = new Je(this.instance, Ge, this.br.bind(this)), this.kr.startIfEnabledOrStop(), this.Pr = this.gr.bind(this), Hi(o, "visibilitychange", this.Pr), this.er = true);
  }
  mr() {
    var i2;
    t && o && (this.wr && t.removeEventListener("beforeunload", this.wr), this.Er && o.removeEventListener("click", this.Er, { capture: true }), this.Sr && o.removeEventListener("mousemove", this.Sr, { capture: true }), this.Pr && o.removeEventListener("visibilitychange", this.Pr), clearTimeout(this.Tr), null == (i2 = this.kr) || i2.stop(), this.er = false);
  }
  Rr(i2, e2) {
    var r2 = this.instance.scrollManager.scrollY(), s2 = this.instance.scrollManager.scrollX(), n2 = this.instance.scrollManager.scrollElement(), o2 = (function(i3, e3, r3) {
      for (var s3 = i3; s3 && pn(s3) && !_n(s3, "body"); ) {
        if (s3 === r3) return false;
        if (E(e3, null == t ? void 0 : t.getComputedStyle(s3).position)) return true;
        s3 = Pn(s3);
      }
      return false;
    })(xn(i2), ["fixed", "sticky"], n2);
    return { x: i2.clientX + (o2 ? 0 : s2), y: i2.clientY + (o2 ? 0 : r2), target_fixed: o2, type: e2 };
  }
  yr(t2, i2) {
    var e2;
    if (void 0 === i2 && (i2 = "click"), !fn(t2.target) && po(t2)) {
      var r2 = this.Rr(t2, i2);
      null != (e2 = this.rageclicks) && e2.isRageClick(t2.clientX, t2.clientY, (/* @__PURE__ */ new Date()).getTime()) && this.Ir(g({}, r2, { type: "rageclick" })), this.Ir(r2);
    }
  }
  $r(t2) {
    !fn(t2.target) && po(t2) && (clearTimeout(this.Tr), this.Tr = setTimeout((() => {
      this.Ir(this.Rr(t2, "mousemove"));
    }), 500));
  }
  Ir(i2) {
    if (t) {
      var e2 = t.location.href, r2 = this.instance.config.mask_personal_data_properties, s2 = this.instance.config.custom_personal_data_properties, n2 = r2 ? Fi([], lr, s2 || []) : [], o2 = nr(e2, n2, hr);
      this.C = this.C || {}, this.C[o2] || (this.C[o2] = []), this.C[o2].push(i2);
    }
  }
  Ft() {
    this.C && !F(this.C) && this.instance.capture("$$heatmap", { $heatmap_data: this.getAndClearBuffer() });
  }
}, deadClicksAutocapture: Je, webVitalsAutocapture: class {
  constructor(t2) {
    var i2;
    this.cr = false, this.er = false, this.C = { url: void 0, metrics: [], firstMetricTimestamp: void 0 }, this.Cr = () => {
      clearTimeout(this.Or), 0 !== this.C.metrics.length && (this._instance.capture("$web_vitals", this.C.metrics.reduce(((t3, i3) => g({}, t3, { ["$web_vitals_" + i3.name + "_event"]: g({}, i3), ["$web_vitals_" + i3.name + "_value"]: i3.value })), {})), this.C = { url: void 0, metrics: [], firstMetricTimestamp: void 0 });
    }, this.Fr = (t3) => {
      var i3, e2 = null == (i3 = this._instance.sessionManager) ? void 0 : i3.checkAndGetSessionAndWindowId(true);
      if (M(e2)) no.error("Could not read session ID. Dropping metrics!");
      else {
        this.C = this.C || { url: void 0, metrics: [], firstMetricTimestamp: void 0 };
        var r2 = this.Mr();
        if (!M(r2)) if (L(null == t3 ? void 0 : t3.name) || L(null == t3 ? void 0 : t3.value)) no.error("Invalid metric received", t3);
        else if (this.Ar && t3.value >= this.Ar) no.error("Ignoring metric with value >= " + this.Ar, t3);
        else this.C.url !== r2 && (this.Cr(), this.Or = setTimeout(this.Cr, this.flushToCaptureTimeoutMs)), M(this.C.url) && (this.C.url = r2), this.C.firstMetricTimestamp = M(this.C.firstMetricTimestamp) ? Date.now() : this.C.firstMetricTimestamp, t3.attribution && t3.attribution.interactionTargetElement && (t3.attribution.interactionTargetElement = void 0), this.C.metrics.push(g({}, t3, { $current_url: r2, $session_id: e2.sessionId, $window_id: e2.windowId, timestamp: Date.now() })), this.C.metrics.length === this.allowedMetrics.length && this.Cr();
      }
    }, this.Dr = () => {
      if (!this.er) {
        var t3, i3, e2, r2, s2 = v.__PosthogExtensions__;
        M(s2) || M(s2.postHogWebVitalsCallbacks) || ({ onLCP: t3, onCLS: i3, onFCP: e2, onINP: r2 } = s2.postHogWebVitalsCallbacks), t3 && i3 && e2 && r2 ? (this.allowedMetrics.indexOf("LCP") > -1 && t3(this.Fr.bind(this)), this.allowedMetrics.indexOf("CLS") > -1 && i3(this.Fr.bind(this)), this.allowedMetrics.indexOf("FCP") > -1 && e2(this.Fr.bind(this)), this.allowedMetrics.indexOf("INP") > -1 && r2(this.Fr.bind(this)), this.er = true) : no.error("web vitals callbacks not loaded - not starting");
      }
    }, this._instance = t2, this.cr = !(null == (i2 = this._instance.persistence) || !i2.props[Qi]), this.startIfEnabled();
  }
  get allowedMetrics() {
    var t2, i2, e2 = O(this._instance.config.capture_performance) ? null == (t2 = this._instance.config.capture_performance) ? void 0 : t2.web_vitals_allowed_metrics : void 0;
    return L(e2) ? (null == (i2 = this._instance.persistence) ? void 0 : i2.props[ie]) || ["CLS", "FCP", "INP", "LCP"] : e2;
  }
  get flushToCaptureTimeoutMs() {
    return (O(this._instance.config.capture_performance) ? this._instance.config.capture_performance.web_vitals_delayed_flush_ms : void 0) || 5e3;
  }
  get useAttribution() {
    var t2 = O(this._instance.config.capture_performance) ? this._instance.config.capture_performance.web_vitals_attribution : void 0;
    return null != t2 && t2;
  }
  get Ar() {
    var t2 = O(this._instance.config.capture_performance) && N(this._instance.config.capture_performance.__web_vitals_max_value) ? this._instance.config.capture_performance.__web_vitals_max_value : oo;
    return 0 < t2 && t2 <= 6e4 ? oo : t2;
  }
  get isEnabled() {
    var t2 = null == a ? void 0 : a.protocol;
    if ("http:" !== t2 && "https:" !== t2) return no.info("Web Vitals are disabled on non-http/https protocols"), false;
    var i2 = O(this._instance.config.capture_performance) ? this._instance.config.capture_performance.web_vitals : z(this._instance.config.capture_performance) ? this._instance.config.capture_performance : void 0;
    return z(i2) ? i2 : this.cr;
  }
  startIfEnabled() {
    this.isEnabled && !this.er && (no.info("enabled, starting..."), this.G(this.Dr));
  }
  onRemoteConfig(t2) {
    if ("capturePerformance" in t2) {
      var i2 = O(t2.capturePerformance) && !!t2.capturePerformance.web_vitals, e2 = O(t2.capturePerformance) ? t2.capturePerformance.web_vitals_allowed_metrics : void 0;
      this._instance.persistence && (this._instance.persistence.register({ [Qi]: i2 }), this._instance.persistence.register({ [ie]: e2 })), this.cr = i2, this.startIfEnabled();
    }
  }
  G(t2) {
    var i2, e2;
    if (null != (i2 = v.__PosthogExtensions__) && i2.postHogWebVitalsCallbacks) t2();
    else {
      var r2 = this.useAttribution ? "web-vitals-with-attribution" : "web-vitals";
      null == (e2 = v.__PosthogExtensions__) || null == e2.loadExternalDependency || e2.loadExternalDependency(this._instance, r2, ((i3) => {
        i3 ? no.error("failed to load script", i3) : t2();
      }));
    }
  }
  Mr() {
    var i2 = t ? t.location.href : void 0;
    if (i2) {
      var e2 = this._instance.config.mask_personal_data_properties, r2 = this._instance.config.custom_personal_data_properties, s2 = e2 ? Fi([], lr, r2 || []) : [];
      return nr(i2, s2, hr);
    }
    no.error("Could not determine current URL");
  }
} }, Zo = { exceptionObserver: class {
  constructor(i2) {
    var e2, r2, s2;
    this.Dr = () => {
      var i3;
      if (t && this.isEnabled && null != (i3 = v.__PosthogExtensions__) && i3.errorWrappingFunctions) {
        var e3 = v.__PosthogExtensions__.errorWrappingFunctions.wrapOnError, r3 = v.__PosthogExtensions__.errorWrappingFunctions.wrapUnhandledRejection, s3 = v.__PosthogExtensions__.errorWrappingFunctions.wrapConsoleError;
        try {
          !this.jr && this.N.capture_unhandled_errors && (this.jr = e3(this.captureException.bind(this))), !this.Lr && this.N.capture_unhandled_rejections && (this.Lr = r3(this.captureException.bind(this))), !this.Nr && this.N.capture_console_errors && (this.Nr = s3(this.captureException.bind(this)));
        } catch (t2) {
          eo.error("failed to start", t2), this.Ur();
        }
      }
    }, this._instance = i2, this.zr = !(null == (e2 = this._instance.persistence) || !e2.props[Ji]), this.Hr = new X({ refillRate: null !== (r2 = this._instance.config.error_tracking.__exceptionRateLimiterRefillRate) && void 0 !== r2 ? r2 : 1, bucketSize: null !== (s2 = this._instance.config.error_tracking.__exceptionRateLimiterBucketSize) && void 0 !== s2 ? s2 : 10, refillInterval: 1e4, h: eo }), this.N = this.Br(), this.startIfEnabledOrStop();
  }
  Br() {
    var t2 = this._instance.config.capture_exceptions, i2 = { capture_unhandled_errors: false, capture_unhandled_rejections: false, capture_console_errors: false };
    return O(t2) ? i2 = g({}, i2, t2) : (M(t2) ? this.zr : t2) && (i2 = g({}, i2, { capture_unhandled_errors: true, capture_unhandled_rejections: true })), i2;
  }
  get isEnabled() {
    return this.N.capture_console_errors || this.N.capture_unhandled_errors || this.N.capture_unhandled_rejections;
  }
  startIfEnabledOrStop() {
    this.isEnabled ? (eo.info("enabled"), this.Ur(), this.G(this.Dr)) : this.Ur();
  }
  G(t2) {
    var i2, e2;
    null != (i2 = v.__PosthogExtensions__) && i2.errorWrappingFunctions && t2(), null == (e2 = v.__PosthogExtensions__) || null == e2.loadExternalDependency || e2.loadExternalDependency(this._instance, "exception-autocapture", ((i3) => {
      if (i3) return eo.error("failed to load script", i3);
      t2();
    }));
  }
  Ur() {
    var t2, i2, e2;
    null == (t2 = this.jr) || t2.call(this), this.jr = void 0, null == (i2 = this.Lr) || i2.call(this), this.Lr = void 0, null == (e2 = this.Nr) || e2.call(this), this.Nr = void 0;
  }
  onRemoteConfig(t2) {
    if ("autocaptureExceptions" in t2) {
      var i2 = t2.autocaptureExceptions;
      this.zr = !!i2 || false, this._instance.persistence && this._instance.persistence.register({ [Ji]: this.zr }), this.N = this.Br(), this.startIfEnabledOrStop();
    }
  }
  onConfigChange() {
    this.N = this.Br();
  }
  captureException(t2) {
    var i2, e2, r2, s2 = null !== (i2 = null == t2 || null == (e2 = t2.$exception_list) || null == (e2 = e2[0]) ? void 0 : e2.type) && void 0 !== i2 ? i2 : "Exception";
    this.Hr.consumeRateLimit(s2) ? eo.info("Skipping exception capture because of client rate limiting.", { exception: s2 }) : null == (r2 = this._instance.exceptions) || r2.sendExceptionEvent(t2);
  }
}, exceptions: class {
  constructor(t2) {
    var i2, e2;
    this.qr = [], this.Vr = new Zt([new ci(), new Si(), new pi(), new fi(), new wi(), new yi(), new gi(), new Ei()], vi()), this._instance = t2, this.qr = null !== (i2 = null == (e2 = this._instance.persistence) ? void 0 : e2.get_property(Ki)) && void 0 !== i2 ? i2 : [];
  }
  onRemoteConfig(t2) {
    var i2, e2, r2;
    if ("errorTracking" in t2) {
      var s2 = null !== (i2 = null == (e2 = t2.errorTracking) ? void 0 : e2.suppressionRules) && void 0 !== i2 ? i2 : [], n2 = null == (r2 = t2.errorTracking) ? void 0 : r2.captureExtensionExceptions;
      this.qr = s2, this._instance.persistence && this._instance.persistence.register({ [Ki]: this.qr, [Xi]: n2 });
    }
  }
  get Wr() {
    var t2, i2 = !!this._instance.get_property(Xi), e2 = this._instance.config.error_tracking.captureExtensionExceptions;
    return null !== (t2 = null != e2 ? e2 : i2) && void 0 !== t2 && t2;
  }
  buildProperties(t2, i2) {
    return this.Vr.buildFromUnknown(t2, { syntheticException: null == i2 ? void 0 : i2.syntheticException, mechanism: { handled: null == i2 ? void 0 : i2.handled } });
  }
  sendExceptionEvent(t2) {
    var i2 = t2.$exception_list;
    if (this.Gr(i2)) {
      if (this.Yr(i2)) return void Wo.info("Skipping exception capture because a suppression rule matched");
      if (!this.Wr && this.Jr(i2)) return void Wo.info("Skipping exception capture because it was thrown by an extension");
      if (!this._instance.config.error_tracking.__capturePostHogExceptions && this.Kr(i2)) return void Wo.info("Skipping exception capture because it was thrown by the PostHog SDK");
    }
    return this._instance.capture("$exception", t2, { _noTruncate: true, _batchKey: "exceptionEvent", Di: true });
  }
  Yr(t2) {
    if (0 === t2.length) return false;
    var i2 = t2.reduce(((t3, i3) => {
      var { type: e2, value: r2 } = i3;
      return A(e2) && e2.length > 0 && t3.$exception_types.push(e2), A(r2) && r2.length > 0 && t3.$exception_values.push(r2), t3;
    }), { $exception_types: [], $exception_values: [] });
    return this.qr.some(((t3) => {
      var e2 = t3.values.map(((t4) => {
        var e3, r2 = Bs[t4.operator], s2 = I(t4.value) ? t4.value : [t4.value], n2 = null !== (e3 = i2[t4.key]) && void 0 !== e3 ? e3 : [];
        return s2.length > 0 && r2(s2, n2);
      }));
      return "OR" === t3.type ? e2.some(Boolean) : e2.every(Boolean);
    }));
  }
  Jr(t2) {
    return t2.flatMap(((t3) => {
      var i2, e2;
      return null !== (i2 = null == (e2 = t3.stacktrace) ? void 0 : e2.frames) && void 0 !== i2 ? i2 : [];
    })).some(((t3) => t3.filename && t3.filename.startsWith("chrome-extension://")));
  }
  Kr(t2) {
    if (t2.length > 0) {
      var i2, e2, r2, s2, n2 = null !== (i2 = null == (e2 = t2[0].stacktrace) ? void 0 : e2.frames) && void 0 !== i2 ? i2 : [], o2 = n2[n2.length - 1];
      return null !== (r2 = null == o2 || null == (s2 = o2.filename) ? void 0 : s2.includes("posthog.com/static")) && void 0 !== r2 && r2;
    }
    return false;
  }
  Gr(t2) {
    return !L(t2) && I(t2);
  }
} }, ta = g({ productTours: class {
  constructor(t2) {
    this.Xr = null, this.Qr = null, this._instance = t2;
  }
  initialize() {
    this.loadIfEnabled();
  }
  onRemoteConfig(t2) {
    "productTours" in t2 && (this._instance.persistence && this._instance.persistence.register({ [te]: !!t2.productTours }), this.loadIfEnabled());
  }
  loadIfEnabled() {
    var t2, i2;
    this.Xr || ((t2 = this._instance).config.disable_product_tours || null == (i2 = t2.persistence) || !i2.get_property(te)) || this.G((() => this.Zr()));
  }
  G(t2) {
    var i2, e2;
    null != (i2 = v.__PosthogExtensions__) && i2.generateProductTours ? t2() : null == (e2 = v.__PosthogExtensions__) || null == e2.loadExternalDependency || e2.loadExternalDependency(this._instance, "product-tours", ((i3) => {
      i3 ? _o.error("Could not load product tours script", i3) : t2();
    }));
  }
  Zr() {
    var t2;
    !this.Xr && null != (t2 = v.__PosthogExtensions__) && t2.generateProductTours && (this.Xr = v.__PosthogExtensions__.generateProductTours(this._instance, true));
  }
  getProductTours(t2, i2) {
    if (void 0 === i2 && (i2 = false), !I(this.Qr) || i2) {
      var e2 = this._instance.persistence;
      if (e2) {
        var r2 = e2.props[go];
        if (I(r2) && !i2) return this.Qr = r2, void t2(r2, { isLoaded: true });
      }
      this._instance._send_request({ url: this._instance.requestRouter.endpointFor("api", "/api/product_tours/?token=" + this._instance.config.token), method: "GET", callback: (i3) => {
        var r3 = i3.statusCode;
        if (200 !== r3 || !i3.json) {
          var s2 = "Product Tours API could not be loaded, status: " + r3;
          return _o.error(s2), void t2([], { isLoaded: false, error: s2 });
        }
        var n2 = I(i3.json.product_tours) ? i3.json.product_tours : [];
        this.Qr = n2, e2 && e2.register({ [go]: n2 }), t2(n2, { isLoaded: true });
      } });
    } else t2(this.Qr, { isLoaded: true });
  }
  getActiveProductTours(t2) {
    L(this.Xr) ? t2([], { isLoaded: false, error: "Product tours not loaded" }) : this.Xr.getActiveProductTours(t2);
  }
  showProductTour(t2) {
    var i2;
    null == (i2 = this.Xr) || i2.showTourById(t2);
  }
  previewTour(t2) {
    this.Xr ? this.Xr.previewTour(t2) : this.G((() => {
      var i2;
      this.Zr(), null == (i2 = this.Xr) || i2.previewTour(t2);
    }));
  }
  dismissProductTour() {
    var t2;
    null == (t2 = this.Xr) || t2.dismissTour("user_clicked_skip");
  }
  nextStep() {
    var t2;
    null == (t2 = this.Xr) || t2.nextStep();
  }
  previousStep() {
    var t2;
    null == (t2 = this.Xr) || t2.previousStep();
  }
  clearCache() {
    var t2;
    this.Qr = null, null == (t2 = this._instance.persistence) || t2.unregister(go);
  }
  resetTour(t2) {
    var i2;
    null == (i2 = this.Xr) || i2.resetTour(t2);
  }
  resetAllTours() {
    var t2;
    null == (t2 = this.Xr) || t2.resetAllTours();
  }
  cancelPendingTour(t2) {
    var i2;
    null == (i2 = this.Xr) || i2.cancelPendingTour(t2);
  }
} }, Ko), ia = { siteApps: class {
  constructor(t2) {
    this._instance = t2, this.ts = [], this.apps = {};
  }
  get isEnabled() {
    return !!this._instance.config.opt_in_site_apps;
  }
  es(t2, i2) {
    if (i2) {
      var e2 = this.globalsForEvent(i2);
      this.ts.push(e2), this.ts.length > 1e3 && (this.ts = this.ts.slice(10));
    }
  }
  get siteAppLoaders() {
    var t2;
    return null == (t2 = v._POSTHOG_REMOTE_CONFIG) || null == (t2 = t2[this._instance.config.token]) ? void 0 : t2.siteApps;
  }
  initialize() {
    if (this.isEnabled) {
      var t2 = this._instance._addCaptureHook(this.es.bind(this));
      this.rs = () => {
        t2(), this.ts = [], this.rs = void 0;
      };
    }
  }
  globalsForEvent(t2) {
    var i2, e2, r2, s2, n2, o2, a2;
    if (!t2) throw new Error("Event payload is required");
    var l2 = {}, u2 = this._instance.get_property("$groups") || [], h2 = this._instance.get_property("$stored_group_properties") || {};
    for (var [d2, v2] of Object.entries(h2)) l2[d2] = { id: u2[d2], type: d2, properties: v2 };
    var { $set_once: c2, $set: f2 } = t2;
    return { event: g({}, m(t2, mo), { properties: g({}, t2.properties, f2 ? { $set: g({}, null !== (i2 = null == (e2 = t2.properties) ? void 0 : e2.$set) && void 0 !== i2 ? i2 : {}, f2) } : {}, c2 ? { $set_once: g({}, null !== (r2 = null == (s2 = t2.properties) ? void 0 : s2.$set_once) && void 0 !== r2 ? r2 : {}, c2) } : {}), elements_chain: null !== (n2 = null == (o2 = t2.properties) ? void 0 : o2.$elements_chain) && void 0 !== n2 ? n2 : "", distinct_id: null == (a2 = t2.properties) ? void 0 : a2.distinct_id }), person: { properties: this._instance.get_property("$stored_person_properties") }, groups: l2 };
  }
  setupSiteApp(t2) {
    var i2 = this.apps[t2.id], e2 = () => {
      var e3;
      (!i2.errored && this.ts.length && (bo.info("Processing " + this.ts.length + " events for site app with id " + t2.id), this.ts.forEach(((t3) => null == i2.processEvent ? void 0 : i2.processEvent(t3))), i2.processedBuffer = true), Object.values(this.apps).every(((t3) => t3.processedBuffer || t3.errored))) && (null == (e3 = this.rs) || e3.call(this));
    }, r2 = false, s2 = (s3) => {
      i2.errored = !s3, i2.loaded = true, bo.info("Site app with id " + t2.id + " " + (s3 ? "loaded" : "errored")), r2 && e2();
    };
    try {
      var { processEvent: n2 } = t2.init({ posthog: this._instance, callback: (t3) => {
        s2(t3);
      } });
      n2 && (i2.processEvent = n2), r2 = true;
    } catch (i3) {
      bo.error("Error while initializing PostHog app with config id " + t2.id, i3), s2(false);
    }
    if (r2 && i2.loaded) try {
      e2();
    } catch (e3) {
      bo.error("Error while processing buffered events PostHog app with config id " + t2.id, e3), i2.errored = true;
    }
  }
  ss() {
    var t2 = this.siteAppLoaders || [];
    for (var i2 of t2) this.apps[i2.id] = { id: i2.id, loaded: false, errored: false, processedBuffer: false };
    for (var e2 of t2) this.setupSiteApp(e2);
  }
  ns(t2) {
    if (0 !== Object.keys(this.apps).length) {
      var i2 = this.globalsForEvent(t2);
      for (var e2 of Object.values(this.apps)) try {
        null == e2.processEvent || e2.processEvent(i2);
      } catch (i3) {
        bo.error("Error while processing event " + t2.event + " for site app " + e2.id, i3);
      }
    }
  }
  onRemoteConfig(t2) {
    var i2, e2, r2, s2 = this;
    if (null != (i2 = this.siteAppLoaders) && i2.length) return this.isEnabled ? (this.ss(), void this._instance.on("eventCaptured", ((t3) => this.ns(t3)))) : void bo.error('PostHog site apps are disabled. Enable the "opt_in_site_apps" config to proceed.');
    if (null == (e2 = this.rs) || e2.call(this), null != (r2 = t2.siteApps) && r2.length) if (this.isEnabled) {
      var n2 = function(t3) {
        var i3;
        v["__$$ph_site_app_" + t3] = s2._instance, null == (i3 = v.__PosthogExtensions__) || null == i3.loadSiteApp || i3.loadSiteApp(s2._instance, a2, ((i4) => {
          if (i4) return bo.error("Error while initializing PostHog app with config id " + t3, i4);
        }));
      };
      for (var { id: o2, url: a2 } of t2.siteApps) n2(o2);
    } else bo.error('PostHog site apps are disabled. Enable the "opt_in_site_apps" config to proceed.');
  }
} }, ea = { tracingHeaders: class {
  constructor(t2) {
    this.os = void 0, this.ls = void 0, this.Dr = () => {
      var t3, i2;
      M(this.os) && (null == (t3 = v.__PosthogExtensions__) || null == (t3 = t3.tracingHeadersPatchFns) || t3._patchXHR(this._instance.config.__add_tracing_headers || [], this._instance.get_distinct_id(), this._instance.sessionManager));
      M(this.ls) && (null == (i2 = v.__PosthogExtensions__) || null == (i2 = i2.tracingHeadersPatchFns) || i2._patchFetch(this._instance.config.__add_tracing_headers || [], this._instance.get_distinct_id(), this._instance.sessionManager));
    }, this._instance = t2;
  }
  initialize() {
    this.startIfEnabledOrStop();
  }
  G(t2) {
    var i2, e2;
    null != (i2 = v.__PosthogExtensions__) && i2.tracingHeadersPatchFns && t2(), null == (e2 = v.__PosthogExtensions__) || null == e2.loadExternalDependency || e2.loadExternalDependency(this._instance, "tracing-headers", ((i3) => {
      if (i3) return so.error("failed to load script", i3);
      t2();
    }));
  }
  startIfEnabledOrStop() {
    var t2, i2;
    this._instance.config.__add_tracing_headers ? this.G(this.Dr) : (null == (t2 = this.os) || t2.call(this), null == (i2 = this.ls) || i2.call(this), this.os = void 0, this.ls = void 0);
  }
} }, ra = g({ surveys: class {
  constructor(t2) {
    this.us = void 0, this._surveyManager = null, this.hs = false, this.ds = [], this.vs = null, this._instance = t2, this._surveyEventReceiver = null;
  }
  initialize() {
    this.loadIfEnabled();
  }
  onRemoteConfig(t2) {
    if (!this._instance.config.disable_surveys) {
      var i2 = t2.surveys;
      if (L(i2)) return Js.warn("Flags not loaded yet. Not loading surveys.");
      var e2 = I(i2);
      this.us = e2 ? i2.length > 0 : i2, Js.info("flags response received, isSurveysEnabled: " + this.us), this.loadIfEnabled();
    }
  }
  reset() {
    localStorage.removeItem("lastSeenSurveyDate");
    for (var t2 = [], i2 = 0; i2 < localStorage.length; i2++) {
      var e2 = localStorage.key(i2);
      (null != e2 && e2.startsWith(Ks) || null != e2 && e2.startsWith("inProgressSurvey_")) && t2.push(e2);
    }
    t2.forEach(((t3) => localStorage.removeItem(t3)));
  }
  loadIfEnabled() {
    if (!this._surveyManager) if (this.hs) Js.info("Already initializing surveys, skipping...");
    else if (this._instance.config.disable_surveys) Js.info("Disabled. Not loading surveys.");
    else if (this._instance.config.cookieless_mode && this._instance.consent.isOptedOut()) Js.info("Not loading surveys in cookieless mode without consent.");
    else {
      var t2 = null == v ? void 0 : v.__PosthogExtensions__;
      if (t2) {
        if (!M(this.us) || this._instance.config.advanced_enable_surveys) {
          var i2 = this.us || this._instance.config.advanced_enable_surveys;
          this.hs = true;
          try {
            var e2 = t2.generateSurveys;
            if (e2) return void this.cs(e2, i2);
            var r2 = t2.loadExternalDependency;
            if (!r2) return void this.fs("PostHog loadExternalDependency extension not found.");
            r2(this._instance, "surveys", ((e3) => {
              e3 || !t2.generateSurveys ? this.fs("Could not load surveys script", e3) : this.cs(t2.generateSurveys, i2);
            }));
          } catch (t3) {
            throw this.fs("Error initializing surveys", t3), t3;
          } finally {
            this.hs = false;
          }
        }
      } else Js.error("PostHog Extensions not found.");
    }
  }
  cs(t2, i2) {
    this._surveyManager = t2(this._instance, i2), this._surveyEventReceiver = new So(this._instance), Js.info("Surveys loaded successfully"), this.ps({ isLoaded: true });
  }
  fs(t2, i2) {
    Js.error(t2, i2), this.ps({ isLoaded: false, error: t2 });
  }
  onSurveysLoaded(t2) {
    return this.ds.push(t2), this._surveyManager && this.ps({ isLoaded: true }), () => {
      this.ds = this.ds.filter(((i2) => i2 !== t2));
    };
  }
  getSurveys(t2, i2) {
    if (void 0 === i2 && (i2 = false), this._instance.config.disable_surveys) return Js.info("Disabled. Not loading surveys."), t2([]);
    var e2, r2 = this._instance.get_property(he);
    if (r2 && !i2) return t2(r2, { isLoaded: true });
    "undefined" != typeof Promise && this.vs ? this.vs.then(((i3) => {
      var { surveys: e3, context: r3 } = i3;
      return t2(e3, r3);
    })) : ("undefined" != typeof Promise && (this.vs = new Promise(((t3) => {
      e2 = t3;
    }))), this._instance._send_request({ url: this._instance.requestRouter.endpointFor("api", "/api/surveys/?token=" + this._instance.config.token), method: "GET", timeout: this._instance.config.surveys_request_timeout_ms, callback: (i3) => {
      var r3;
      this.vs = null;
      var s2 = i3.statusCode;
      if (200 !== s2 || !i3.json) {
        var n2 = "Surveys API could not be loaded, status: " + s2;
        Js.error(n2);
        var o2 = { isLoaded: false, error: n2 };
        return t2([], o2), void (null == e2 || e2({ surveys: [], context: o2 }));
      }
      var a2, l2 = i3.json.surveys || [], u2 = l2.filter(((t3) => (function(t4) {
        return !(!t4.start_date || t4.end_date);
      })(t3) && ((function(t4) {
        var i4;
        return !(null == (i4 = t4.conditions) || null == (i4 = i4.events) || null == (i4 = i4.values) || !i4.length);
      })(t3) || (function(t4) {
        var i4;
        return !(null == (i4 = t4.conditions) || null == (i4 = i4.actions) || null == (i4 = i4.values) || !i4.length);
      })(t3))));
      u2.length > 0 && (null == (a2 = this._surveyEventReceiver) || a2.register(u2));
      null == (r3 = this._instance.persistence) || r3.register({ [he]: l2 });
      var h2 = { isLoaded: true };
      t2(l2, h2), null == e2 || e2({ surveys: l2, context: h2 });
    } }));
  }
  ps(t2) {
    for (var i2 of this.ds) try {
      if (!t2.isLoaded) return i2([], t2);
      this.getSurveys(i2);
    } catch (t3) {
      Js.error("Error in survey callback", t3);
    }
  }
  getActiveMatchingSurveys(t2, i2) {
    if (void 0 === i2 && (i2 = false), !L(this._surveyManager)) return this._surveyManager.getActiveMatchingSurveys(t2, i2);
    Js.warn("init was not called");
  }
  _s(t2) {
    var i2 = null;
    return this.getSurveys(((e2) => {
      var r2;
      i2 = null !== (r2 = e2.find(((i3) => i3.id === t2))) && void 0 !== r2 ? r2 : null;
    })), i2;
  }
  gs(t2) {
    if (L(this._surveyManager)) return { eligible: false, reason: "SDK is not enabled or survey functionality is not yet loaded" };
    var i2 = "string" == typeof t2 ? this._s(t2) : t2;
    return i2 ? this._surveyManager.checkSurveyEligibility(i2) : { eligible: false, reason: "Survey not found" };
  }
  canRenderSurvey(t2) {
    if (L(this._surveyManager)) return Js.warn("init was not called"), { visible: false, disabledReason: "SDK is not enabled or survey functionality is not yet loaded" };
    var i2 = this.gs(t2);
    return { visible: i2.eligible, disabledReason: i2.reason };
  }
  canRenderSurveyAsync(t2, i2) {
    return L(this._surveyManager) ? (Js.warn("init was not called"), Promise.resolve({ visible: false, disabledReason: "SDK is not enabled or survey functionality is not yet loaded" })) : new Promise(((e2) => {
      this.getSurveys(((i3) => {
        var r2, s2 = null !== (r2 = i3.find(((i4) => i4.id === t2))) && void 0 !== r2 ? r2 : null;
        if (s2) {
          var n2 = this.gs(s2);
          e2({ visible: n2.eligible, disabledReason: n2.reason });
        } else e2({ visible: false, disabledReason: "Survey not found" });
      }), i2);
    }));
  }
  renderSurvey(t2, i2, e2) {
    var r2;
    if (L(this._surveyManager)) Js.warn("init was not called");
    else {
      var s2 = "string" == typeof t2 ? this._s(t2) : t2;
      if (null != s2 && s2.id) if (Zs.includes(s2.type)) {
        var n2 = null == o ? void 0 : o.querySelector(i2);
        if (n2) return null != (r2 = s2.appearance) && r2.surveyPopupDelaySeconds ? (Js.info("Rendering survey " + s2.id + " with delay of " + s2.appearance.surveyPopupDelaySeconds + " seconds"), void setTimeout((() => {
          var t3, i3;
          Js.info("Rendering survey " + s2.id + " with delay of " + (null == (t3 = s2.appearance) ? void 0 : t3.surveyPopupDelaySeconds) + " seconds"), null == (i3 = this._surveyManager) || i3.renderSurvey(s2, n2, e2), Js.info("Survey " + s2.id + " rendered");
        }), 1e3 * s2.appearance.surveyPopupDelaySeconds)) : void this._surveyManager.renderSurvey(s2, n2, e2);
        Js.warn("Survey element not found");
      } else Js.warn("Surveys of type " + s2.type + " cannot be rendered in the app");
      else Js.warn("Survey not found");
    }
  }
  displaySurvey(t2, i2) {
    var e2;
    if (L(this._surveyManager)) Js.warn("init was not called");
    else {
      var r2 = this._s(t2);
      if (r2) {
        var s2 = r2;
        if (null != (e2 = r2.appearance) && e2.surveyPopupDelaySeconds && i2.ignoreDelay && (s2 = g({}, r2, { appearance: g({}, r2.appearance, { surveyPopupDelaySeconds: 0 }) })), i2.displayType !== Mr.Popover && i2.initialResponses && Js.warn("initialResponses is only supported for popover surveys. prefill will not be applied."), false === i2.ignoreConditions) {
          var n2 = this.canRenderSurvey(r2);
          if (!n2.visible) return void Js.warn("Survey is not eligible to be displayed: ", n2.disabledReason);
        }
        i2.displayType !== Mr.Inline ? this._surveyManager.handlePopoverSurvey(s2, i2) : this.renderSurvey(s2, i2.selector, i2.properties);
      } else Js.warn("Survey not found");
    }
  }
  cancelPendingSurvey(t2) {
    L(this._surveyManager) ? Js.warn("init was not called") : this._surveyManager.cancelSurvey(t2);
  }
  handlePageUnload() {
    var t2;
    null == (t2 = this._surveyManager) || t2.handlePageUnload();
  }
} }, Ko), sa = { toolbar: class {
  constructor(t2) {
    this.instance = t2;
  }
  bs(t2) {
    v.ph_toolbar_state = t2;
  }
  ys() {
    var t2;
    return null !== (t2 = v.ph_toolbar_state) && void 0 !== t2 ? t2 : Po.UNINITIALIZED;
  }
  initialize() {
    return this.maybeLoadToolbar();
  }
  maybeLoadToolbar(i2, e2, r2) {
    if (void 0 === i2 && (i2 = void 0), void 0 === e2 && (e2 = void 0), void 0 === r2 && (r2 = void 0), Bi(this.instance.config)) return false;
    if (!t || !o) return false;
    i2 = null != i2 ? i2 : t.location, r2 = null != r2 ? r2 : t.history;
    try {
      if (!e2) {
        try {
          t.localStorage.setItem("test", "test"), t.localStorage.removeItem("test");
        } catch (t2) {
          return false;
        }
        e2 = null == t ? void 0 : t.localStorage;
      }
      var s2, n2 = xo || or(i2.hash, "__posthog") || or(i2.hash, "state"), a2 = n2 ? Ai((() => JSON.parse(atob(decodeURIComponent(n2))))) || Ai((() => JSON.parse(decodeURIComponent(n2)))) : null;
      return a2 && "ph_authorize" === a2.action ? ((s2 = a2).source = "url", s2 && Object.keys(s2).length > 0 && (a2.desiredHash ? i2.hash = a2.desiredHash : r2 ? r2.replaceState(r2.state, "", i2.pathname + i2.search) : i2.hash = "")) : ((s2 = JSON.parse(e2.getItem($o) || "{}")).source = "localstorage", delete s2.userIntent), !(!s2.token || this.instance.config.token !== s2.token) && (this.loadToolbar(s2), true);
    } catch (t2) {
      return false;
    }
  }
  ws(t2) {
    var i2 = v.ph_load_toolbar || v.ph_load_editor;
    !L(i2) && C(i2) ? i2(t2, this.instance) : ko.warn("No toolbar load function found");
  }
  loadToolbar(i2) {
    var e2 = !(null == o || !o.getElementById(Ee));
    if (!t || e2) return false;
    var r2 = "custom" === this.instance.requestRouter.region && this.instance.config.advanced_disable_toolbar_metrics, s2 = g({ token: this.instance.config.token }, i2, { apiURL: this.instance.requestRouter.endpointFor("ui") }, r2 ? { instrument: false } : {});
    if (t.localStorage.setItem($o, JSON.stringify(g({}, s2, { source: void 0 }))), this.ys() === Po.LOADED) this.ws(s2);
    else if (this.ys() === Po.UNINITIALIZED) {
      var n2;
      this.bs(Po.LOADING), null == (n2 = v.__PosthogExtensions__) || null == n2.loadExternalDependency || n2.loadExternalDependency(this.instance, "toolbar", ((t2) => {
        if (t2) return ko.error("[Toolbar] Failed to load", t2), void this.bs(Po.UNINITIALIZED);
        this.bs(Po.LOADED), this.ws(s2);
      })), Hi(t, "turbolinks:load", (() => {
        this.bs(Po.UNINITIALIZED), this.loadToolbar(s2);
      }));
    }
    return true;
  }
  Es(t2) {
    return this.loadToolbar(t2);
  }
  maybeLoadEditor(t2, i2, e2) {
    return void 0 === t2 && (t2 = void 0), void 0 === i2 && (i2 = void 0), void 0 === e2 && (e2 = void 0), this.maybeLoadToolbar(t2, i2, e2);
  }
} }, na = g({ experiments: Yo }, Ko), oa = { conversations: class {
  constructor(t2) {
    this.Ss = void 0, this._conversationsManager = null, this.xs = false, this.$s = null, this._instance = t2;
  }
  initialize() {
    this.loadIfEnabled();
  }
  onRemoteConfig(t2) {
    if (!this._instance.config.disable_conversations) {
      var i2 = t2.conversations;
      L(i2) || (z(i2) ? this.Ss = i2 : (this.Ss = i2.enabled, this.$s = i2), this.loadIfEnabled());
    }
  }
  reset() {
    var t2;
    null == (t2 = this._conversationsManager) || t2.reset(), this._conversationsManager = null, this.Ss = void 0, this.$s = null;
  }
  loadIfEnabled() {
    if (!(this._conversationsManager || this.xs || this._instance.config.disable_conversations || Bi(this._instance.config) || this._instance.config.cookieless_mode && this._instance.consent.isOptedOut())) {
      var t2 = null == v ? void 0 : v.__PosthogExtensions__;
      if (t2 && !M(this.Ss) && this.Ss) if (this.$s && this.$s.token) {
        this.xs = true;
        try {
          var i2 = t2.initConversations;
          if (i2) return this.ks(i2), void (this.xs = false);
          var e2 = t2.loadExternalDependency;
          if (!e2) return void this.Ps("PostHog loadExternalDependency extension not found.");
          e2(this._instance, "conversations", ((i3) => {
            i3 || !t2.initConversations ? this.Ps("Could not load conversations script", i3) : this.ks(t2.initConversations), this.xs = false;
          }));
        } catch (t3) {
          this.Ps("Error initializing conversations", t3), this.xs = false;
        }
      } else Jo.error("Conversations enabled but missing token in remote config.");
    }
  }
  ks(t2) {
    if (this.$s) try {
      this._conversationsManager = t2(this.$s, this._instance), Jo.info("Conversations loaded successfully");
    } catch (t3) {
      this.Ps("Error completing conversations initialization", t3);
    }
    else Jo.error("Cannot complete initialization: remote config is null");
  }
  Ps(t2, i2) {
    Jo.error(t2, i2), this._conversationsManager = null, this.xs = false;
  }
  show() {
    this._conversationsManager ? this._conversationsManager.show() : Jo.warn("Conversations not loaded yet.");
  }
  hide() {
    this._conversationsManager && this._conversationsManager.hide();
  }
  isAvailable() {
    return true === this.Ss && !j(this._conversationsManager);
  }
  isVisible() {
    var t2, i2;
    return null !== (t2 = null == (i2 = this._conversationsManager) ? void 0 : i2.isVisible()) && void 0 !== t2 && t2;
  }
  sendMessage(t2, i2, e2) {
    var r2 = this;
    return _((function* () {
      return r2._conversationsManager ? r2._conversationsManager.sendMessage(t2, i2, e2) : (Jo.warn("Conversations not available yet."), null);
    }))();
  }
  getMessages(t2, i2) {
    var e2 = this;
    return _((function* () {
      return e2._conversationsManager ? e2._conversationsManager.getMessages(t2, i2) : (Jo.warn("Conversations not available yet."), null);
    }))();
  }
  markAsRead(t2) {
    var i2 = this;
    return _((function* () {
      return i2._conversationsManager ? i2._conversationsManager.markAsRead(t2) : (Jo.warn("Conversations not available yet."), null);
    }))();
  }
  getTickets(t2) {
    var i2 = this;
    return _((function* () {
      return i2._conversationsManager ? i2._conversationsManager.getTickets(t2) : (Jo.warn("Conversations not available yet."), null);
    }))();
  }
  requestRestoreLink(t2) {
    var i2 = this;
    return _((function* () {
      return i2._conversationsManager ? i2._conversationsManager.requestRestoreLink(t2) : (Jo.warn("Conversations not available yet."), null);
    }))();
  }
  restoreFromToken(t2) {
    var i2 = this;
    return _((function* () {
      return i2._conversationsManager ? i2._conversationsManager.restoreFromToken(t2) : (Jo.warn("Conversations not available yet."), null);
    }))();
  }
  restoreFromUrlToken() {
    var t2 = this;
    return _((function* () {
      return t2._conversationsManager ? t2._conversationsManager.restoreFromUrlToken() : (Jo.warn("Conversations not available yet."), null);
    }))();
  }
  getCurrentTicketId() {
    var t2, i2;
    return null !== (t2 = null == (i2 = this._conversationsManager) ? void 0 : i2.getCurrentTicketId()) && void 0 !== t2 ? t2 : null;
  }
  getWidgetSessionId() {
    var t2, i2;
    return null !== (t2 = null == (i2 = this._conversationsManager) ? void 0 : i2.getWidgetSessionId()) && void 0 !== t2 ? t2 : null;
  }
} }, aa = { logs: class {
  constructor(t2) {
    var i2;
    this.Ts = false, this.Rs = false, this._instance = t2, this._instance && null != (i2 = this._instance.config.logs) && i2.captureConsoleLogs && (this.Ts = true);
  }
  initialize() {
    this.loadIfEnabled();
  }
  onRemoteConfig(t2) {
    var i2, e2 = null == (i2 = t2.logs) ? void 0 : i2.captureConsoleLogs;
    !L(e2) && e2 && (this.Ts = true, this.loadIfEnabled());
  }
  reset() {
  }
  loadIfEnabled() {
    if (this.Ts && !this.Rs) {
      var t2 = ki("[logs]"), i2 = null == v ? void 0 : v.__PosthogExtensions__;
      if (i2) {
        var e2 = i2.loadExternalDependency;
        e2 ? e2(this._instance, "logs", ((e3) => {
          var r2;
          e3 || null == (r2 = i2.logs) || !r2.initializeLogs ? t2.error("Could not load logs script", e3) : (i2.logs.initializeLogs(this._instance), this.Rs = true);
        })) : t2.error("PostHog loadExternalDependency extension not found.");
      } else t2.error("PostHog Extensions not found.");
    }
  }
} }, la = g({}, Ko, Xo, Qo, Zo, ta, ia, ra, ea, sa, na, oa, aa);
cn.__defaultExtensionClasses = g({}, la);
var ua, ha = (ua = nn[ln] = new cn(), (function() {
  function i2() {
    i2.done || (i2.done = true, un = false, Ci(nn, (function(t2) {
      t2._dom_loaded();
    })));
  }
  null != o && o.addEventListener ? "complete" === o.readyState ? i2() : Hi(o, "DOMContentLoaded", i2, { capture: false }) : t && $i.error("Browser doesn't support `document.addEventListener` so PostHog couldn't be initialized");
})(), ua);
var PostHogContext = reactExports.createContext({
  client: ha,
  bootstrap: void 0
});
function isDeepEqual(obj1, obj2, visited) {
  if (visited === void 0) {
    visited = /* @__PURE__ */ new WeakMap();
  }
  if (obj1 === obj2) {
    return true;
  }
  if (typeof obj1 !== "object" || obj1 === null || typeof obj2 !== "object" || obj2 === null) {
    return false;
  }
  if (visited.has(obj1) && visited.get(obj1) === obj2) {
    return true;
  }
  visited.set(obj1, obj2);
  var keys1 = Object.keys(obj1);
  var keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (var _i2 = 0, keys1_1 = keys1; _i2 < keys1_1.length; _i2++) {
    var key = keys1_1[_i2];
    if (!keys2.includes(key)) {
      return false;
    }
    if (!isDeepEqual(obj1[key], obj2[key], visited)) {
      return false;
    }
  }
  return true;
}
function PostHogProvider(_a) {
  var _b, _c;
  var children = _a.children, client = _a.client, apiKey = _a.apiKey, options = _a.options;
  var previousInitializationRef = reactExports.useRef(null);
  var posthog = reactExports.useMemo(function() {
    if (client) {
      if (apiKey) {
        console.warn("[PostHog.js] You have provided both `client` and `apiKey` to `PostHogProvider`. `apiKey` will be ignored in favour of `client`.");
      }
      if (options) {
        console.warn("[PostHog.js] You have provided both `client` and `options` to `PostHogProvider`. `options` will be ignored in favour of `client`.");
      }
      return client;
    }
    if (apiKey) {
      return ha;
    }
    console.warn("[PostHog.js] No `apiKey` or `client` were provided to `PostHogProvider`. Using default global `window.posthog` instance. You must initialize it manually. This is not recommended behavior.");
    return ha;
  }, [client, apiKey, JSON.stringify(options)]);
  reactExports.useEffect(function() {
    if (client) {
      return;
    }
    var previousInitialization = previousInitializationRef.current;
    if (!previousInitialization) {
      if (ha.__loaded) {
        console.warn("[PostHog.js] `posthog` was already loaded elsewhere. This may cause issues.");
      }
      ha.init(apiKey, options);
      previousInitializationRef.current = {
        apiKey,
        options: options !== null && options !== void 0 ? options : {}
      };
    } else {
      if (apiKey !== previousInitialization.apiKey) {
        console.warn("[PostHog.js] You have provided a different `apiKey` to `PostHogProvider` than the one that was already initialized. This is not supported by our provider and we'll keep using the previous key. If you need to toggle between API Keys you need to control the `client` yourself and pass it in as a prop rather than an `apiKey` prop.");
      }
      if (options && !isDeepEqual(options, previousInitialization.options)) {
        ha.set_config(options);
      }
      previousInitializationRef.current = {
        apiKey,
        options: options !== null && options !== void 0 ? options : {}
      };
    }
  }, [client, apiKey, JSON.stringify(options)]);
  return N$1.createElement(PostHogContext.Provider, { value: { client: posthog, bootstrap: (_b = options === null || options === void 0 ? void 0 : options.bootstrap) !== null && _b !== void 0 ? _b : (_c = client === null || client === void 0 ? void 0 : client.config) === null || _c === void 0 ? void 0 : _c.bootstrap } }, children);
}
var isFunction = function(f2) {
  return typeof f2 === "function";
};
var extendStatics = function(d2, b2) {
  extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d3, b3) {
    d3.__proto__ = b3;
  } || function(d3, b3) {
    for (var p2 in b3) if (Object.prototype.hasOwnProperty.call(b3, p2)) d3[p2] = b3[p2];
  };
  return extendStatics(d2, b2);
};
function __extends(d2, b2) {
  if (typeof b2 !== "function" && b2 !== null)
    throw new TypeError("Class extends value " + String(b2) + " is not a constructor or null");
  extendStatics(d2, b2);
  function __() {
    this.constructor = d2;
  }
  d2.prototype = b2 === null ? Object.create(b2) : (__.prototype = b2.prototype, new __());
}
typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
  var e2 = new Error(message);
  return e2.name = "SuppressedError", e2.error = error, e2.suppressed = suppressed, e2;
};
var INITIAL_STATE = {
  componentStack: null,
  exceptionEvent: null,
  error: null
};
var __POSTHOG_ERROR_MESSAGES = {
  INVALID_FALLBACK: "[PostHog.js][PostHogErrorBoundary] Invalid fallback prop, provide a valid React element or a function that returns a valid React element."
};
(function(_super) {
  __extends(PostHogErrorBoundary, _super);
  function PostHogErrorBoundary(props) {
    var _this = _super.call(this, props) || this;
    _this.state = INITIAL_STATE;
    return _this;
  }
  PostHogErrorBoundary.prototype.componentDidCatch = function(error, errorInfo) {
    var additionalProperties = this.props.additionalProperties;
    var currentProperties;
    if (isFunction(additionalProperties)) {
      currentProperties = additionalProperties(error);
    } else if (typeof additionalProperties === "object") {
      currentProperties = additionalProperties;
    }
    var client = this.context.client;
    var exceptionEvent = client.captureException(error, currentProperties);
    var componentStack = errorInfo.componentStack;
    this.setState({
      error,
      componentStack: componentStack !== null && componentStack !== void 0 ? componentStack : null,
      exceptionEvent
    });
  };
  PostHogErrorBoundary.prototype.render = function() {
    var _a = this.props, children = _a.children, fallback = _a.fallback;
    var state = this.state;
    if (state.componentStack == null) {
      return isFunction(children) ? children() : children;
    }
    var element = isFunction(fallback) ? N$1.createElement(fallback, {
      error: state.error,
      componentStack: state.componentStack,
      exceptionEvent: state.exceptionEvent
    }) : fallback;
    if (N$1.isValidElement(element)) {
      return element;
    }
    console.warn(__POSTHOG_ERROR_MESSAGES.INVALID_FALLBACK);
    return N$1.createElement(N$1.Fragment, null);
  };
  PostHogErrorBoundary.contextType = PostHogContext;
  return PostHogErrorBoundary;
})(N$1.Component);
let crashReportingInitialized = false;
function initCrashReporting() {
  if (crashReportingInitialized) return;
  crashReportingInitialized = true;
  window.addEventListener("error", (event) => {
    ha.capture("renderer_crash", {
      type: "error",
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      stack: event.error?.stack
    });
  });
  window.addEventListener("unhandledrejection", (event) => {
    const error = event.reason instanceof Error ? event.reason : new Error(String(event.reason));
    ha.capture("renderer_crash", {
      type: "unhandledrejection",
      message: error.message,
      stack: error.stack
    });
  });
}
function AnalyticsProvider({
  children
}) {
  const [ready, setReady] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const key = "phc_gRgd67LXlAwM2MWMAKyCQVwrsD1KIm5PeJwCFvtSHG0";
    const host = "https://us.i.posthog.com";
    window.api.getDeviceId().then((deviceId) => {
      if (!ha.__loaded) {
        ha.init(key, {
          api_host: host,
          autocapture: false,
          capture_pageview: false,
          capture_pageleave: false,
          persistence: "localStorage",
          person_profiles: "always",
          bootstrap: { distinctId: deviceId }
        });
      }
      ha.identify(deviceId);
      initCrashReporting();
      setReady(true);
    }).catch((err) => {
      console.warn("[analytics] Failed to initialize PostHog:", err);
    });
  }, []);
  if (!ready) return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PostHogProvider, { client: ha, children });
}
export {
  AnalyticsProvider as A
};
