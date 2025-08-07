(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const r of document.querySelectorAll('link[rel="modulepreload"]')) s(r);
  new MutationObserver((r) => {
    for (const l of r)
      if (l.type === "childList")
        for (const o of l.addedNodes)
          o.tagName === "LINK" && o.rel === "modulepreload" && s(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(r) {
    const l = {};
    return (
      r.integrity && (l.integrity = r.integrity),
      r.referrerPolicy && (l.referrerPolicy = r.referrerPolicy),
      r.crossOrigin === "use-credentials"
        ? (l.credentials = "include")
        : r.crossOrigin === "anonymous"
          ? (l.credentials = "omit")
          : (l.credentials = "same-origin"),
      l
    );
  }
  function s(r) {
    if (r.ep) return;
    r.ep = !0;
    const l = n(r);
    fetch(r.href, l);
  }
})();
const me = !1,
  pe = (e, t) => e === t,
  E = Symbol("solid-proxy"),
  ee = typeof Proxy == "function",
  _ = { equals: pe };
let te = oe;
const m = 1,
  P = 2,
  ne = { owned: null, cleanups: null, context: null, owner: null };
var d = null;
let U = null,
  xe = null,
  h = null,
  g = null,
  y = null,
  N = 0;
function ke(e, t) {
  const n = h,
    s = d,
    r = e.length === 0,
    l = t === void 0 ? s : t,
    o = r
      ? ne
      : {
          owned: null,
          cleanups: null,
          context: l ? l.context : null,
          owner: l,
        },
    i = r ? e : () => e(() => M(() => S(o)));
  ((d = o), (h = null));
  try {
    return $(i, !0);
  } finally {
    ((h = n), (d = s));
  }
}
function se(e, t) {
  t = t ? Object.assign({}, _, t) : _;
  const n = {
      value: e,
      observers: null,
      observerSlots: null,
      comparator: t.equals || void 0,
    },
    s = (r) => (typeof r == "function" && (r = r(n.value)), le(n, r));
  return [re.bind(n), s];
}
function k(e, t, n) {
  const s = F(e, t, !1, m);
  C(s);
}
function Se(e, t, n) {
  te = Ae;
  const s = F(e, t, !1, m);
  ((s.user = !0), y ? y.push(s) : C(s));
}
function ie(e, t, n) {
  n = n ? Object.assign({}, _, n) : _;
  const s = F(e, t, !0, 0);
  return (
    (s.observers = null),
    (s.observerSlots = null),
    (s.comparator = n.equals || void 0),
    C(s),
    re.bind(s)
  );
}
function M(e) {
  if (h === null) return e();
  const t = h;
  h = null;
  try {
    return e();
  } finally {
    h = t;
  }
}
function ve(e) {
  return (
    d === null ||
      (d.cleanups === null ? (d.cleanups = [e]) : d.cleanups.push(e)),
    e
  );
}
function re() {
  if (this.sources && this.state)
    if (this.state === m) C(this);
    else {
      const e = g;
      ((g = null), $(() => j(this), !1), (g = e));
    }
  if (h) {
    const e = this.observers ? this.observers.length : 0;
    (h.sources
      ? (h.sources.push(this), h.sourceSlots.push(e))
      : ((h.sources = [this]), (h.sourceSlots = [e])),
      this.observers
        ? (this.observers.push(h),
          this.observerSlots.push(h.sources.length - 1))
        : ((this.observers = [h]),
          (this.observerSlots = [h.sources.length - 1])));
  }
  return this.value;
}
function le(e, t, n) {
  let s = e.value;
  return (
    (!e.comparator || !e.comparator(s, t)) &&
      ((e.value = t),
      e.observers &&
        e.observers.length &&
        $(() => {
          for (let r = 0; r < e.observers.length; r += 1) {
            const l = e.observers[r],
              o = U && U.running;
            (o && U.disposed.has(l),
              (o ? !l.tState : !l.state) &&
                (l.pure ? g.push(l) : y.push(l), l.observers && ce(l)),
              o || (l.state = m));
          }
          if (g.length > 1e6) throw ((g = []), new Error());
        }, !1)),
    t
  );
}
function C(e) {
  if (!e.fn) return;
  S(e);
  const t = N;
  Ce(e, e.value, t);
}
function Ce(e, t, n) {
  let s;
  const r = d,
    l = h;
  h = d = e;
  try {
    s = e.fn(t);
  } catch (o) {
    return (
      e.pure &&
        ((e.state = m), e.owned && e.owned.forEach(S), (e.owned = null)),
      (e.updatedAt = n + 1),
      fe(o)
    );
  } finally {
    ((h = l), (d = r));
  }
  (!e.updatedAt || e.updatedAt <= n) &&
    (e.updatedAt != null && "observers" in e ? le(e, s) : (e.value = s),
    (e.updatedAt = n));
}
function F(e, t, n, s = m, r) {
  const l = {
    fn: e,
    state: s,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: d,
    context: d ? d.context : null,
    pure: n,
  };
  return (
    d === null || (d !== ne && (d.owned ? d.owned.push(l) : (d.owned = [l]))),
    l
  );
}
function T(e) {
  if (e.state === 0) return;
  if (e.state === P) return j(e);
  if (e.suspense && M(e.suspense.inFallback)) return e.suspense.effects.push(e);
  const t = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < N); )
    e.state && t.push(e);
  for (let n = t.length - 1; n >= 0; n--)
    if (((e = t[n]), e.state === m)) C(e);
    else if (e.state === P) {
      const s = g;
      ((g = null), $(() => j(e, t[0]), !1), (g = s));
    }
}
function $(e, t) {
  if (g) return e();
  let n = !1;
  (t || (g = []), y ? (n = !0) : (y = []), N++);
  try {
    const s = e();
    return ($e(n), s);
  } catch (s) {
    (n || (y = null), (g = null), fe(s));
  }
}
function $e(e) {
  if ((g && (oe(g), (g = null)), e)) return;
  const t = y;
  ((y = null), t.length && $(() => te(t), !1));
}
function oe(e) {
  for (let t = 0; t < e.length; t++) T(e[t]);
}
function Ae(e) {
  let t,
    n = 0;
  for (t = 0; t < e.length; t++) {
    const s = e[t];
    s.user ? (e[n++] = s) : T(s);
  }
  for (t = 0; t < n; t++) T(e[t]);
}
function j(e, t) {
  e.state = 0;
  for (let n = 0; n < e.sources.length; n += 1) {
    const s = e.sources[n];
    if (s.sources) {
      const r = s.state;
      r === m
        ? s !== t && (!s.updatedAt || s.updatedAt < N) && T(s)
        : r === P && j(s, t);
    }
  }
}
function ce(e) {
  for (let t = 0; t < e.observers.length; t += 1) {
    const n = e.observers[t];
    n.state ||
      ((n.state = P), n.pure ? g.push(n) : y.push(n), n.observers && ce(n));
  }
}
function S(e) {
  let t;
  if (e.sources)
    for (; e.sources.length; ) {
      const n = e.sources.pop(),
        s = e.sourceSlots.pop(),
        r = n.observers;
      if (r && r.length) {
        const l = r.pop(),
          o = n.observerSlots.pop();
        s < r.length &&
          ((l.sourceSlots[o] = s), (r[s] = l), (n.observerSlots[s] = o));
      }
    }
  if (e.tOwned) {
    for (t = e.tOwned.length - 1; t >= 0; t--) S(e.tOwned[t]);
    delete e.tOwned;
  }
  if (e.owned) {
    for (t = e.owned.length - 1; t >= 0; t--) S(e.owned[t]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (t = e.cleanups.length - 1; t >= 0; t--) e.cleanups[t]();
    e.cleanups = null;
  }
  e.state = 0;
}
function Oe(e) {
  return e instanceof Error
    ? e
    : new Error(typeof e == "string" ? e : "Unknown error", { cause: e });
}
function fe(e, t = d) {
  throw Oe(e);
}
function ue(e, t) {
  return M(() => e(t || {}));
}
function O() {
  return !0;
}
const H = {
  get(e, t, n) {
    return t === E ? n : e.get(t);
  },
  has(e, t) {
    return t === E ? !0 : e.has(t);
  },
  set: O,
  deleteProperty: O,
  getOwnPropertyDescriptor(e, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(t);
      },
      set: O,
      deleteProperty: O,
    };
  },
  ownKeys(e) {
    return e.keys();
  },
};
function K(e) {
  return (e = typeof e == "function" ? e() : e) ? e : {};
}
function Ee() {
  for (let e = 0, t = this.length; e < t; ++e) {
    const n = this[e]();
    if (n !== void 0) return n;
  }
}
function W(...e) {
  let t = !1;
  for (let o = 0; o < e.length; o++) {
    const i = e[o];
    ((t = t || (!!i && E in i)),
      (e[o] = typeof i == "function" ? ((t = !0), ie(i)) : i));
  }
  if (ee && t)
    return new Proxy(
      {
        get(o) {
          for (let i = e.length - 1; i >= 0; i--) {
            const c = K(e[i])[o];
            if (c !== void 0) return c;
          }
        },
        has(o) {
          for (let i = e.length - 1; i >= 0; i--) if (o in K(e[i])) return !0;
          return !1;
        },
        keys() {
          const o = [];
          for (let i = 0; i < e.length; i++) o.push(...Object.keys(K(e[i])));
          return [...new Set(o)];
        },
      },
      H,
    );
  const n = {},
    s = Object.create(null);
  for (let o = e.length - 1; o >= 0; o--) {
    const i = e[o];
    if (!i) continue;
    const c = Object.getOwnPropertyNames(i);
    for (let u = c.length - 1; u >= 0; u--) {
      const a = c[u];
      if (a === "__proto__" || a === "constructor") continue;
      const f = Object.getOwnPropertyDescriptor(i, a);
      if (!s[a])
        s[a] = f.get
          ? {
              enumerable: !0,
              configurable: !0,
              get: Ee.bind((n[a] = [f.get.bind(i)])),
            }
          : f.value !== void 0
            ? f
            : void 0;
      else {
        const b = n[a];
        b &&
          (f.get
            ? b.push(f.get.bind(i))
            : f.value !== void 0 && b.push(() => f.value));
      }
    }
  }
  const r = {},
    l = Object.keys(s);
  for (let o = l.length - 1; o >= 0; o--) {
    const i = l[o],
      c = s[i];
    c && c.get ? Object.defineProperty(r, i, c) : (r[i] = c ? c.value : void 0);
  }
  return r;
}
function _e(e, ...t) {
  if (ee && E in e) {
    const r = new Set(t.length > 1 ? t.flat() : t[0]),
      l = t.map(
        (o) =>
          new Proxy(
            {
              get(i) {
                return o.includes(i) ? e[i] : void 0;
              },
              has(i) {
                return o.includes(i) && i in e;
              },
              keys() {
                return o.filter((i) => i in e);
              },
            },
            H,
          ),
      );
    return (
      l.push(
        new Proxy(
          {
            get(o) {
              return r.has(o) ? void 0 : e[o];
            },
            has(o) {
              return r.has(o) ? !1 : o in e;
            },
            keys() {
              return Object.keys(e).filter((o) => !r.has(o));
            },
          },
          H,
        ),
      ),
      l
    );
  }
  const n = {},
    s = t.map(() => ({}));
  for (const r of Object.getOwnPropertyNames(e)) {
    const l = Object.getOwnPropertyDescriptor(e, r),
      o = !l.get && !l.set && l.enumerable && l.writable && l.configurable;
    let i = !1,
      c = 0;
    for (const u of t)
      (u.includes(r) &&
        ((i = !0), o ? (s[c][r] = l.value) : Object.defineProperty(s[c], r, l)),
        ++c);
    i || (o ? (n[r] = l.value) : Object.defineProperty(n, r, l));
  }
  return [...s, n];
}
const Pe = new Set(["innerHTML", "textContent", "innerText", "children"]),
  Te = Object.assign(Object.create(null), {
    className: "class",
    htmlFor: "for",
  }),
  je = new Set([
    "beforeinput",
    "click",
    "dblclick",
    "contextmenu",
    "focusin",
    "focusout",
    "input",
    "keydown",
    "keyup",
    "mousedown",
    "mousemove",
    "mouseout",
    "mouseover",
    "mouseup",
    "pointerdown",
    "pointermove",
    "pointerout",
    "pointerover",
    "pointerup",
    "touchend",
    "touchmove",
    "touchstart",
  ]),
  Le = {
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
  };
function Ne(e, t, n) {
  let s = n.length,
    r = t.length,
    l = s,
    o = 0,
    i = 0,
    c = t[r - 1].nextSibling,
    u = null;
  for (; o < r || i < l; ) {
    if (t[o] === n[i]) {
      (o++, i++);
      continue;
    }
    for (; t[r - 1] === n[l - 1]; ) (r--, l--);
    if (r === o) {
      const a = l < s ? (i ? n[i - 1].nextSibling : n[l - i]) : c;
      for (; i < l; ) e.insertBefore(n[i++], a);
    } else if (l === i)
      for (; o < r; ) ((!u || !u.has(t[o])) && t[o].remove(), o++);
    else if (t[o] === n[l - 1] && n[i] === t[r - 1]) {
      const a = t[--r].nextSibling;
      (e.insertBefore(n[i++], t[o++].nextSibling),
        e.insertBefore(n[--l], a),
        (t[r] = n[l]));
    } else {
      if (!u) {
        u = new Map();
        let f = i;
        for (; f < l; ) u.set(n[f], f++);
      }
      const a = u.get(t[o]);
      if (a != null)
        if (i < a && a < l) {
          let f = o,
            b = 1,
            p;
          for (
            ;
            ++f < r && f < l && !((p = u.get(t[f])) == null || p !== a + b);

          )
            b++;
          if (b > a - i) {
            const A = t[o];
            for (; i < a; ) e.insertBefore(n[i++], A);
          } else e.replaceChild(n[i++], t[o++]);
        } else o++;
      else t[o++].remove();
    }
  }
}
const q = "_$DX_DELEGATE";
function Me(e, t, n, s = {}) {
  let r;
  return (
    ke((l) => {
      ((r = l),
        t === document ? e() : w(t, e(), t.firstChild ? null : void 0, n));
    }, s.owner),
    () => {
      (r(), (t.textContent = ""));
    }
  );
}
function G(e, t, n, s) {
  let r;
  const l = () => {
      const i = document.createElement("template");
      return ((i.innerHTML = e), i.content.firstChild);
    },
    o = () => (r || (r = l())).cloneNode(!0);
  return ((o.cloneNode = o), o);
}
function ae(e, t = window.document) {
  const n = t[q] || (t[q] = new Set());
  for (let s = 0, r = e.length; s < r; s++) {
    const l = e[s];
    n.has(l) || (n.add(l), t.addEventListener(l, ze));
  }
}
function v(e, t, n) {
  n == null ? e.removeAttribute(t) : e.setAttribute(t, n);
}
function Be(e, t, n, s) {
  s == null ? e.removeAttributeNS(t, n) : e.setAttributeNS(t, n, s);
}
function De(e, t, n) {
  n ? e.setAttribute(t, "") : e.removeAttribute(t);
}
function Ie(e, t) {
  t == null ? e.removeAttribute("class") : (e.className = t);
}
function Ue(e, t, n, s) {
  if (s)
    Array.isArray(n)
      ? ((e[`$$${t}`] = n[0]), (e[`$$${t}Data`] = n[1]))
      : (e[`$$${t}`] = n);
  else if (Array.isArray(n)) {
    const r = n[0];
    e.addEventListener(t, (n[0] = (l) => r.call(e, n[1], l)));
  } else e.addEventListener(t, n, typeof n != "function" && n);
}
function Ke(e, t, n = {}) {
  const s = Object.keys(t || {}),
    r = Object.keys(n);
  let l, o;
  for (l = 0, o = r.length; l < o; l++) {
    const i = r[l];
    !i || i === "undefined" || t[i] || (Y(e, i, !1), delete n[i]);
  }
  for (l = 0, o = s.length; l < o; l++) {
    const i = s[l],
      c = !!t[i];
    !i || i === "undefined" || n[i] === c || !c || (Y(e, i, !0), (n[i] = c));
  }
  return n;
}
function He(e, t, n) {
  if (!t) return n ? v(e, "style") : t;
  const s = e.style;
  if (typeof t == "string") return (s.cssText = t);
  (typeof n == "string" && (s.cssText = n = void 0),
    n || (n = {}),
    t || (t = {}));
  let r, l;
  for (l in n) (t[l] == null && s.removeProperty(l), delete n[l]);
  for (l in t) ((r = t[l]), r !== n[l] && (s.setProperty(l, r), (n[l] = r)));
  return n;
}
function Re(e, t = {}, n, s) {
  const r = {};
  return (
    k(() => typeof t.ref == "function" && Fe(t.ref, e)),
    k(() => Ge(e, t, n, !0, r, !0)),
    r
  );
}
function Fe(e, t, n) {
  return M(() => e(t, n));
}
function w(e, t, n, s) {
  if ((n !== void 0 && !s && (s = []), typeof t != "function"))
    return L(e, t, s, n);
  k((r) => L(e, t(), r, n), s);
}
function Ge(e, t, n, s, r = {}, l = !1) {
  t || (t = {});
  for (const o in r)
    if (!(o in t)) {
      if (o === "children") continue;
      r[o] = Q(e, o, null, r[o], n, l, t);
    }
  for (const o in t) {
    if (o === "children") continue;
    const i = t[o];
    r[o] = Q(e, o, i, r[o], n, l, t);
  }
}
function Ve(e) {
  return e.toLowerCase().replace(/-([a-z])/g, (t, n) => n.toUpperCase());
}
function Y(e, t, n) {
  const s = t.trim().split(/\s+/);
  for (let r = 0, l = s.length; r < l; r++) e.classList.toggle(s[r], n);
}
function Q(e, t, n, s, r, l, o) {
  let i, c, u, a;
  if (t === "style") return He(e, n, s);
  if (t === "classList") return Ke(e, n, s);
  if (n === s) return s;
  if (t === "ref") l || n(e);
  else if (t.slice(0, 3) === "on:") {
    const f = t.slice(3);
    (s && e.removeEventListener(f, s, typeof s != "function" && s),
      n && e.addEventListener(f, n, typeof n != "function" && n));
  } else if (t.slice(0, 10) === "oncapture:") {
    const f = t.slice(10);
    (s && e.removeEventListener(f, s, !0), n && e.addEventListener(f, n, !0));
  } else if (t.slice(0, 2) === "on") {
    const f = t.slice(2).toLowerCase(),
      b = je.has(f);
    if (!b && s) {
      const p = Array.isArray(s) ? s[0] : s;
      e.removeEventListener(f, p);
    }
    (b || n) && (Ue(e, f, n, b), b && ae([f]));
  } else if (t.slice(0, 5) === "attr:") v(e, t.slice(5), n);
  else if (t.slice(0, 5) === "bool:") De(e, t.slice(5), n);
  else if (
    (a = t.slice(0, 5) === "prop:") ||
    (u = Pe.has(t)) ||
    (i = e.nodeName.includes("-") || "is" in o)
  )
    (a && ((t = t.slice(5)), (c = !0)),
      t === "class" || t === "className"
        ? Ie(e, n)
        : i && !c && !u
          ? (e[Ve(t)] = n)
          : (e[t] = n));
  else {
    const f = t.indexOf(":") > -1 && Le[t.split(":")[0]];
    f ? Be(e, f, t, n) : v(e, Te[t] || t, n);
  }
  return n;
}
function ze(e) {
  let t = e.target;
  const n = `$$${e.type}`,
    s = e.target,
    r = e.currentTarget,
    l = (c) =>
      Object.defineProperty(e, "target", { configurable: !0, value: c }),
    o = () => {
      const c = t[n];
      if (c && !t.disabled) {
        const u = t[`${n}Data`];
        if ((u !== void 0 ? c.call(t, u, e) : c.call(t, e), e.cancelBubble))
          return;
      }
      return (
        t.host &&
          typeof t.host != "string" &&
          !t.host._$host &&
          t.contains(e.target) &&
          l(t.host),
        !0
      );
    },
    i = () => {
      for (; o() && (t = t._$host || t.parentNode || t.host); );
    };
  if (
    (Object.defineProperty(e, "currentTarget", {
      configurable: !0,
      get() {
        return t || document;
      },
    }),
    e.composedPath)
  ) {
    const c = e.composedPath();
    l(c[0]);
    for (let u = 0; u < c.length - 2 && ((t = c[u]), !!o()); u++) {
      if (t._$host) {
        ((t = t._$host), i());
        break;
      }
      if (t.parentNode === r) break;
    }
  } else i();
  l(s);
}
function L(e, t, n, s, r) {
  for (; typeof n == "function"; ) n = n();
  if (t === n) return n;
  const l = typeof t,
    o = s !== void 0;
  if (
    ((e = (o && n[0] && n[0].parentNode) || e),
    l === "string" || l === "number")
  ) {
    if (l === "number" && ((t = t.toString()), t === n)) return n;
    if (o) {
      let i = n[0];
      (i && i.nodeType === 3
        ? i.data !== t && (i.data = t)
        : (i = document.createTextNode(t)),
        (n = x(e, n, s, i)));
    } else
      n !== "" && typeof n == "string"
        ? (n = e.firstChild.data = t)
        : (n = e.textContent = t);
  } else if (t == null || l === "boolean") n = x(e, n, s);
  else {
    if (l === "function")
      return (
        k(() => {
          let i = t();
          for (; typeof i == "function"; ) i = i();
          n = L(e, i, n, s);
        }),
        () => n
      );
    if (Array.isArray(t)) {
      const i = [],
        c = n && Array.isArray(n);
      if (R(i, t, n, r)) return (k(() => (n = L(e, i, n, s, !0))), () => n);
      if (i.length === 0) {
        if (((n = x(e, n, s)), o)) return n;
      } else
        c ? (n.length === 0 ? Z(e, i, s) : Ne(e, n, i)) : (n && x(e), Z(e, i));
      n = i;
    } else if (t.nodeType) {
      if (Array.isArray(n)) {
        if (o) return (n = x(e, n, s, t));
        x(e, n, null, t);
      } else
        n == null || n === "" || !e.firstChild
          ? e.appendChild(t)
          : e.replaceChild(t, e.firstChild);
      n = t;
    }
  }
  return n;
}
function R(e, t, n, s) {
  let r = !1;
  for (let l = 0, o = t.length; l < o; l++) {
    let i = t[l],
      c = n && n[e.length],
      u;
    if (!(i == null || i === !0 || i === !1))
      if ((u = typeof i) == "object" && i.nodeType) e.push(i);
      else if (Array.isArray(i)) r = R(e, i, c) || r;
      else if (u === "function")
        if (s) {
          for (; typeof i == "function"; ) i = i();
          r = R(e, Array.isArray(i) ? i : [i], Array.isArray(c) ? c : [c]) || r;
        } else (e.push(i), (r = !0));
      else {
        const a = String(i);
        c && c.nodeType === 3 && c.data === a
          ? e.push(c)
          : e.push(document.createTextNode(a));
      }
  }
  return r;
}
function Z(e, t, n = null) {
  for (let s = 0, r = t.length; s < r; s++) e.insertBefore(t[s], n);
}
function x(e, t, n, s) {
  if (n === void 0) return (e.textContent = "");
  const r = s || document.createTextNode("");
  if (t.length) {
    let l = !1;
    for (let o = t.length - 1; o >= 0; o--) {
      const i = t[o];
      if (r !== i) {
        const c = i.parentNode === e;
        !l && !o
          ? c
            ? e.replaceChild(r, i)
            : e.insertBefore(r, n)
          : c && i.remove();
      } else l = !0;
    }
  } else e.insertBefore(r, n);
  return [r];
}
const Xe = !1;
var We = G("<svg stroke-width=0>");
function B(e, t) {
  const n = W(e.a, t),
    [s, r] = _e(n, ["src"]),
    [l, o] = se(""),
    i = ie(() => (t.title ? `${e.c}<title>${t.title}</title>` : e.c));
  return (
    Se(() => o(i())),
    ve(() => {
      o("");
    }),
    (() => {
      var c = We();
      return (
        Re(
          c,
          W(
            {
              get stroke() {
                return e.a?.stroke;
              },
              get color() {
                return t.color || "currentColor";
              },
              get fill() {
                return t.color || "currentColor";
              },
              get style() {
                return { ...t.style, overflow: "visible" };
              },
            },
            r,
            {
              get height() {
                return t.size || "1em";
              },
              get width() {
                return t.size || "1em";
              },
              xmlns: "http://www.w3.org/2000/svg",
              get innerHTML() {
                return l();
              },
            },
          ),
          !0,
        ),
        w(c, () => Xe),
        c
      );
    })()
  );
}
function qe(e) {
  return B(
    {
      a: {
        xmlns: "http://www.w3.org/2000/svg",
        class: "icon icon-tabler icon-tabler-brand-discord",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        "stroke-width": "2",
        stroke: "currentColor",
        fill: "none",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
      },
      c: '<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 12a1 1 0 1 0 2 0a1 1 0 0 0 -2 0"/><path d="M14 12a1 1 0 1 0 2 0a1 1 0 0 0 -2 0"/><path d="M15.5 17c0 1 1.5 3 2 3c1.5 0 2.833 -1.667 3.5 -3c.667 -1.667 .5 -5.833 -1.5 -11.5c-1.457 -1.015 -3 -1.34 -4.5 -1.5l-.972 1.923a11.913 11.913 0 0 0 -4.053 0l-.975 -1.923c-1.5 .16 -3.043 .485 -4.5 1.5c-2 5.667 -2.167 9.833 -1.5 11.5c.667 1.333 2 3 3.5 3c.5 0 2 -2 2 -3"/><path d="M7 16.5c3.5 1 6.5 1 10 0"/>',
    },
    e,
  );
}
function Ye(e) {
  return B(
    {
      a: {
        xmlns: "http://www.w3.org/2000/svg",
        class: "icon icon-tabler icon-tabler-brand-github",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        "stroke-width": "2",
        stroke: "currentColor",
        fill: "none",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
      },
      c: '<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"/>',
    },
    e,
  );
}
function Qe(e) {
  return B(
    {
      a: {
        xmlns: "http://www.w3.org/2000/svg",
        class: "icon icon-tabler icon-tabler-brand-steam",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        "stroke-width": "2",
        stroke: "currentColor",
        fill: "none",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
      },
      c: '<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M16.5 5a4.5 4.5 0 1 1 -.653 8.953l-4.347 3.009l0 .038a3 3 0 0 1 -2.824 3l-.176 0a3 3 0 0 1 -2.94 -2.402l-2.56 -1.098v-3.5l3.51 1.755a2.989 2.989 0 0 1 2.834 -.635l2.727 -3.818a4.5 4.5 0 0 1 4.429 -5.302z"/><circle cx="16.5" cy="9.5" r="1" fill="currentColor"/>',
    },
    e,
  );
}
function Ze(e) {
  return B(
    {
      a: {
        xmlns: "http://www.w3.org/2000/svg",
        class: "icon icon-tabler icon-tabler-brand-twitter",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        "stroke-width": "2",
        stroke: "currentColor",
        fill: "none",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
      },
      c: '<path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c0 -.249 1.51 -2.772 1.818 -4.013z"/>',
    },
    e,
  );
}
const Je = "/Kowkodivka/assets/avatar-C4hb_UOd.webp";
var et = G(
    '<div class="min-h-screen bg-white flex items-center justify-center p-4"><div class="max-w-md w-full bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"><div class="p-6 text-center"><div class="flex justify-center items-center gap-4"><img alt=Avatar class="w-20 h-20 rounded-full object-cover border-2 border-gray-200"><div><h1 class="text-2xl font-bold text-gray-800"></h1><p class="text-gray-600 mt-1"></p></div></div></div><div class=p-6><div class="text-gray-700 mb-6"><p class=mb-4></p><p></p></div><div class="border-t border-gray-100 pt-6"><h3 class="text-lg font-medium text-gray-800 mb-4"></h3><div class=space-y-1></div></div></div><div class="p-4 bg-gray-50 text-center"><button class="text-sm text-gray-600 hover:text-gray-800">',
  ),
  tt = G(
    '<a class="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"><div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3"></div><span class=text-gray-700>',
  );
const J = [
    { icon: "Discord", text: "@kowkodivka", url: "#" },
    { icon: "Twitter", text: "@kowkodivka", url: "https://x.com/kowkodivka" },
    {
      icon: "Steam",
      text: "kowkodivka_",
      url: "https://steamcommunity.com/id/kowkodivka_",
    },
    {
      icon: "Github",
      text: "Kowkodivka",
      url: "https://github.com/Kowkodivka",
    },
  ],
  nt = {
    ru: {
      title: "Привет, я Женя",
      subtitle: "Разработчик",
      bio1: "Кхм, сибирский фурри, люблю RimWorld, а также Rust и Python",
      bio2: ">.<",
      socials: "Мои профили",
      links: J,
    },
    en: {
      title: "Hi, I'm Zhenya",
      subtitle: "Developer",
      bio1: "Ahem, Siberian furry, I love RimWorld, as well as Rust and Python",
      bio2: ">.<",
      socials: "My profiles",
      links: J,
    },
  };
function st() {
  const [e, t] = se("ru"),
    n = () => nt[e()],
    s = { Discord: qe, Twitter: Ze, Steam: Qe, Github: Ye };
  return (() => {
    var r = et(),
      l = r.firstChild,
      o = l.firstChild,
      i = o.firstChild,
      c = i.firstChild,
      u = c.nextSibling,
      a = u.firstChild,
      f = a.nextSibling,
      b = o.nextSibling,
      p = b.firstChild,
      A = p.firstChild,
      he = A.nextSibling,
      de = p.nextSibling,
      V = de.firstChild,
      ge = V.nextSibling,
      be = b.nextSibling,
      z = be.firstChild;
    return (
      v(c, "src", Je),
      w(a, () => n().title),
      w(f, () => n().subtitle),
      w(A, () => n().bio1),
      w(he, () => n().bio2),
      w(V, () => n().socials),
      w(ge, () =>
        n().links.map((D) => {
          const we = s[D.icon];
          return (() => {
            var I = tt(),
              X = I.firstChild,
              ye = X.nextSibling;
            return (
              w(X, ue(we, { size: 24 })),
              w(ye, () => D.text),
              k(() => v(I, "href", D.url)),
              I
            );
          })();
        }),
      ),
      (z.$$click = () => t(e() === "ru" ? "en" : "ru")),
      w(z, () =>
        e() === "ru" ? "Switch to English" : "Переключить на русский",
      ),
      r
    );
  })();
}
ae(["click"]);
const it = document.getElementById("root");
Me(() => ue(st, {}), it);
