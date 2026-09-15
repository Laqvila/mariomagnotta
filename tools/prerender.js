#!/usr/bin/env node
/* =========================================================
   Prerender statico delle sezioni generate da JavaScript.

   Perché: le sezioni del sito (news, stampa, pubblicazioni...) vengono
   scritte da main.js a partire dai file di contenuto. Chi non esegue
   JavaScript — i crawler delle AI (GPTBot, ClaudeBot, PerplexityBot...) e
   molti motori — ne vedeva solo una parte.

   Cosa fa: costruisce un piccolo DOM dall'index.html, esegue gli stessi
   script del sito, legge l'HTML finito dei contenitori indicati in
   prerender.config.json e lo scrive in index.html tra i marcatori
   <!--pre:ID--> ... <!--/pre:ID-->. Nel browser main.js riscrive i
   contenitori come sempre: per i visitatori non cambia nulla.

   Uso, dalla radice del sito, dopo ogni modifica ai contenuti:
     node tools/prerender.js
   Nessuna dipendenza: solo Node. Rilanciarlo più volte dà lo stesso file.
   ========================================================= */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const CONFIG = JSON.parse(fs.readFileSync(path.join(__dirname, "prerender.config.json"), "utf8"));

/* ---------- oggetto "assorbente" per API del browser non simulate ---------- */
function sink() {
  const fn = function () {};
  const p = new Proxy(fn, {
    get: (t, k) => {
      if (k === Symbol.toPrimitive) return () => 0;
      if (k === Symbol.iterator) return function* () {};
      if (k === "then") return undefined;
      if (k === "length") return 0;
      return p;
    },
    set: () => true,
    apply: () => p,
    construct: () => p,
  });
  return p;
}

/* ---------- mini DOM ---------- */
const VOID = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"]);
const RAW = new Set(["script", "style", "textarea", "title"]);
const PROPS_AS_ATTR = new Set(["id", "href", "target", "rel", "src", "alt", "title", "type", "name", "value", "lang",
  "role", "loading", "download", "hidden", "tabIndex", "htmlFor", "width", "height", "srcset", "sizes", "poster", "placeholder"]);
const ATTR_NAME = { htmlFor: "for", tabIndex: "tabindex" };

class TextNode {
  constructor(data) { this.nodeType = 3; this.data = data; this.parentNode = null; }
  get textContent() { return decode(this.data); }
  set textContent(v) { this.data = escapeText(v); }
  serialize() { return this.data; }
}
class CommentNode {
  constructor(data) { this.nodeType = 8; this.data = data; this.parentNode = null; }
  get textContent() { return ""; }
  serialize() { return `<!--${this.data}-->`; }
}

function escapeText(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
function escapeAttr(s) { return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;"); }
function decode(s) {
  return String(s).replace(/&(#x[0-9a-f]+|#\d+|amp|lt|gt|quot|#39|apos|nbsp);/gi, (m, e) => {
    const l = e.toLowerCase();
    if (l === "amp") return "&"; if (l === "lt") return "<"; if (l === "gt") return ">";
    if (l === "quot") return '"'; if (l === "#39" || l === "apos") return "'"; if (l === "nbsp") return " ";
    if (l.startsWith("#x")) return String.fromCodePoint(parseInt(l.slice(2), 16));
    return String.fromCodePoint(parseInt(l.slice(1), 10));
  });
}

class Element {
  constructor(tag) {
    this.nodeType = 1;
    this.tagName = String(tag).toUpperCase();
    this.localName = String(tag).toLowerCase();
    this.attrs = new Map();
    this.childNodes = [];
    this.parentNode = null;
    this._style = new Map();
    const self = this;
    this.style = new Proxy({}, {
      get: (t, k) => {
        if (k === "setProperty") return (n, v) => { self._style.set(n, String(v)); };
        if (k === "removeProperty") return (n) => { self._style.delete(n); };
        if (k === "getPropertyValue") return (n) => self._style.get(n) || "";
        if (typeof k === "string") return self._style.get(k.replace(/[A-Z]/g, (c) => "-" + c.toLowerCase())) || "";
        return undefined;
      },
      set: (t, k, v) => { if (typeof k === "string") self._style.set(k.replace(/[A-Z]/g, (c) => "-" + c.toLowerCase()), String(v)); return true; },
    });
    this.classList = {
      add: (...c) => { const s = self._classes(); c.forEach((x) => s.add(x)); self._setClasses(s); },
      remove: (...c) => { const s = self._classes(); c.forEach((x) => s.delete(x)); self._setClasses(s); },
      toggle: (c, force) => { const s = self._classes(); const on = force === undefined ? !s.has(c) : !!force; on ? s.add(c) : s.delete(c); self._setClasses(s); return on; },
      contains: (c) => self._classes().has(c),
    };
    this.dataset = new Proxy({}, {
      get: (t, k) => (typeof k === "string" ? self.getAttribute("data-" + k.replace(/[A-Z]/g, (c) => "-" + c.toLowerCase())) ?? undefined : undefined),
      set: (t, k, v) => { self.setAttribute("data-" + String(k).replace(/[A-Z]/g, (c) => "-" + c.toLowerCase()), v); return true; },
    });
  }
  _classes() { return new Set((this.attrs.get("class") || "").split(/\s+/).filter(Boolean)); }
  _setClasses(s) { this.attrs.set("class", [...s].join(" ")); }
  get className() { return this.attrs.get("class") || ""; }
  set className(v) { this.attrs.set("class", String(v)); }
  getAttribute(n) { return this.attrs.has(n) ? this.attrs.get(n) : null; }
  setAttribute(n, v) { this.attrs.set(String(n).toLowerCase(), String(v)); }
  removeAttribute(n) { this.attrs.delete(n); }
  hasAttribute(n) { return this.attrs.has(n); }
  get children() { return this.childNodes.filter((c) => c.nodeType === 1); }
  get firstChild() { return this.childNodes[0] || null; }
  get lastChild() { return this.childNodes[this.childNodes.length - 1] || null; }
  get firstElementChild() { return this.children[0] || null; }
  get parentElement() { return this.parentNode && this.parentNode.nodeType === 1 ? this.parentNode : null; }
  appendChild(c) {
    if (c && c.nodeType === 11) { [...c.childNodes].forEach((x) => this.appendChild(x)); return c; }
    if (c.parentNode) c.parentNode.removeChild(c);
    c.parentNode = this; this.childNodes.push(c); return c;
  }
  append(...cs) { cs.forEach((c) => this.appendChild(typeof c === "string" ? new TextNode(escapeText(c)) : c)); }
  prepend(...cs) { [...cs].reverse().forEach((c) => this.insertBefore(typeof c === "string" ? new TextNode(escapeText(c)) : c, this.firstChild)); }
  insertBefore(c, ref) {
    if (!ref) return this.appendChild(c);
    if (c.parentNode) c.parentNode.removeChild(c);
    const i = this.childNodes.indexOf(ref); c.parentNode = this;
    this.childNodes.splice(i < 0 ? this.childNodes.length : i, 0, c); return c;
  }
  removeChild(c) { const i = this.childNodes.indexOf(c); if (i >= 0) this.childNodes.splice(i, 1); c.parentNode = null; return c; }
  remove() { if (this.parentNode) this.parentNode.removeChild(this); }
  replaceChildren(...cs) { this.childNodes.forEach((c) => (c.parentNode = null)); this.childNodes = []; this.append(...cs); }
  cloneNode(deep) { const e = new Element(this.localName); this.attrs.forEach((v, k) => e.attrs.set(k, v)); if (deep) e.innerHTML = this.innerHTML; return e; }
  get textContent() { return this.childNodes.map((c) => c.textContent).join(""); }
  set textContent(v) {
    this.childNodes = [];
    // dentro <script>/<style> il testo resta grezzo (es. JSON-LD): niente entità
    if (v !== "" && v != null) this.appendChild(new TextNode(RAW.has(this.localName) ? String(v) : escapeText(v)));
  }
  get innerText() { return this.textContent; }
  set innerText(v) { this.textContent = v; }
  get innerHTML() { return this.childNodes.map((c) => c.serialize()).join(""); }
  set innerHTML(html) { this.childNodes.forEach((c) => (c.parentNode = null)); this.childNodes = []; parseInto(this, String(html)); }
  get outerHTML() { return this.serialize(); }
  insertAdjacentHTML(pos, html) {
    const tmp = new Element("div"); tmp.innerHTML = html; const nodes = [...tmp.childNodes];
    if (pos === "beforeend") nodes.forEach((n) => this.appendChild(n));
    else if (pos === "afterbegin") nodes.reverse().forEach((n) => this.insertBefore(n, this.firstChild));
    else if (this.parentNode && pos === "beforebegin") nodes.forEach((n) => this.parentNode.insertBefore(n, this));
    else if (this.parentNode && pos === "afterend") { const nx = this.parentNode.childNodes[this.parentNode.childNodes.indexOf(this) + 1] || null; nodes.forEach((n) => this.parentNode.insertBefore(n, nx)); }
  }
  serialize() {
    if (this._style.size) this.attrs.set("style", [...this._style].map(([k, v]) => `${k}:${v}`).join(";"));
    const attrs = [...this.attrs].map(([k, v]) => (v === "" && (k === "hidden" || k === "crossorigin" || k === "defer" || k === "async") ? ` ${k}` : ` ${k}="${escapeAttr(v)}"`)).join("");
    if (VOID.has(this.localName)) return `<${this.localName}${attrs}>`;
    return `<${this.localName}${attrs}>${this.innerHTML}</${this.localName}>`;
  }
  querySelectorAll(sel) { const out = []; walk(this, (n) => { if (n !== this && matches(n, sel)) out.push(n); }); return out; }
  querySelector(sel) { return this.querySelectorAll(sel)[0] || null; }
  getElementsByClassName(c) { return this.querySelectorAll("." + c); }
  getElementsByTagName(t) { return this.querySelectorAll(t); }
  matches(sel) { return matches(this, sel); }
  closest(sel) { let n = this; while (n && n.nodeType === 1) { if (matches(n, sel)) return n; n = n.parentNode; } return null; }
  contains(o) { let n = o; while (n) { if (n === this) return true; n = n.parentNode; } return false; }
  addEventListener() {} removeEventListener() {} dispatchEvent() { return true; }
  focus() {} blur() {} click() {} scrollIntoView() {}
  getBoundingClientRect() { return { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0, x: 0, y: 0 }; }
  getContext() { return sink(); }
  animate() { return sink(); }
  get offsetWidth() { return 0; } get offsetHeight() { return 0; } get scrollWidth() { return 0; } get clientWidth() { return 0; }
}

/* proprietà riflesse come attributi (href, src, alt...) e tolleranza per API mancanti */
function wrap(el) {
  return new Proxy(el, {
    get(t, k, r) {
      if (typeof k === "string" && PROPS_AS_ATTR.has(k)) {
        const v = t.getAttribute(ATTR_NAME[k] || k.toLowerCase());
        if (k === "hidden") return v !== null;
        return v === null ? "" : v;
      }
      if (k in t) { const v = Reflect.get(t, k, r); return typeof v === "function" ? v.bind(r) : v; }
      if (typeof k === "symbol") return undefined;
      return undefined;
    },
    set(t, k, v) {
      if (typeof k === "string" && PROPS_AS_ATTR.has(k)) {
        const name = ATTR_NAME[k] || k.toLowerCase();
        if (k === "hidden") { v ? t.setAttribute("hidden", "") : t.removeAttribute("hidden"); }
        else t.setAttribute(name, v);
        return true;
      }
      t[k] = v; return true;
    },
  });
}
function createEl(tag) { return wrap(new Element(tag)); }

function walk(node, fn) { for (const c of node.childNodes) { if (c.nodeType === 1) { fn(c); walk(c, fn); } } }

/* selettori: liste separate da virgola, discendenti con spazio, figli con ">",
   tag, #id, .classe, [attr], [attr="valore"], :not(...) semplice */
function matches(el, selector) {
  return selector.split(",").some((s) => matchComplex(el, s.trim()));
}
function matchComplex(el, sel) {
  const parts = sel.replace(/\s*>\s*/g, " > ").split(/\s+/).filter(Boolean);
  return matchFrom(el, parts, parts.length - 1);
}
function matchFrom(el, parts, i) {
  if (!matchCompound(el, parts[i])) return false;
  if (i === 0) return true;
  if (parts[i - 1] === ">") { const p = el.parentNode; return p && p.nodeType === 1 && matchFrom(p, parts, i - 2); }
  let p = el.parentNode;
  while (p && p.nodeType === 1) { if (matchFrom(p, parts, i - 1)) return true; p = p.parentNode; }
  return false;
}
function matchCompound(el, c) {
  if (!el || el.nodeType !== 1) return false;
  let rest = c;
  const not = [];
  rest = rest.replace(/:not\(([^)]*)\)/g, (m, x) => { not.push(x); return ""; });
  rest = rest.replace(/:[a-z-]+(\([^)]*\))?/g, "");
  const tag = rest.match(/^[a-z][a-z0-9-]*|^\*/i);
  if (tag && tag[0] !== "*" && el.localName !== tag[0].toLowerCase()) return false;
  const ids = [...rest.matchAll(/#([\w-]+)/g)].map((m) => m[1]);
  if (ids.some((id) => el.getAttribute("id") !== id)) return false;
  const classes = [...rest.matchAll(/\.([\w-]+)/g)].map((m) => m[1]);
  const have = el._classes();
  if (classes.some((x) => !have.has(x))) return false;
  for (const m of rest.matchAll(/\[([\w-]+)(?:([~^$*|]?=)["']?([^"'\]]*)["']?)?\]/g)) {
    const v = el.getAttribute(m[1]);
    if (v === null) return false;
    if (m[2] === "=" && v !== m[3]) return false;
    if (m[2] === "~=" && !v.split(/\s+/).includes(m[3])) return false;
    if (m[2] === "^=" && !v.startsWith(m[3])) return false;
    if (m[2] === "$=" && !v.endsWith(m[3])) return false;
    if (m[2] === "*=" && !v.includes(m[3])) return false;
  }
  if (not.some((x) => matchCompound(el, x.trim()))) return false;
  return true;
}

/* parser HTML tollerante */
function parseInto(parent, html) {
  const re = /<!--([\s\S]*?)-->|<\/([a-zA-Z][\w-]*)\s*>|<([a-zA-Z][\w-]*)((?:\s+[^\s"'>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'>]+))?)*)\s*(\/?)>|<!doctype[^>]*>/gi;
  const stack = [parent];
  let last = 0, m;
  const top = () => stack[stack.length - 1];
  const text = (s) => { if (s) top().appendChild(new TextNode(s)); };
  while ((m = re.exec(html))) {
    text(html.slice(last, m.index));
    last = re.lastIndex;
    if (m[1] !== undefined) { top().appendChild(new CommentNode(m[1])); continue; }
    if (m[2]) {
      const name = m[2].toLowerCase();
      for (let i = stack.length - 1; i > 0; i--) { if (stack[i].localName === name) { stack.length = i; break; } }
      continue;
    }
    if (!m[3]) continue; // doctype
    const name = m[3].toLowerCase();
    const el = createEl(name);
    for (const a of (m[4] || "").matchAll(/([^\s"'>\/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g)) {
      el.setAttribute(a[1], decode(a[2] ?? a[3] ?? a[4] ?? ""));
    }
    top().appendChild(el);
    if (VOID.has(name) || m[5]) continue;
    if (RAW.has(name)) {
      const end = html.toLowerCase().indexOf(`</${name}`, last);
      const stop = end < 0 ? html.length : end;
      if (stop > last) el.appendChild(new TextNode(html.slice(last, stop)));
      const close = end < 0 ? html.length : html.indexOf(">", end) + 1;
      re.lastIndex = last = close;
      continue;
    }
    stack.push(el);
  }
  text(html.slice(last));
}

/* ---------- esecuzione ---------- */
function run() {
  const htmlPath = path.join(ROOT, CONFIG.html);
  const source = fs.readFileSync(htmlPath, "utf8");

  // albero del documento, con i contenitori già svuotati dai prerender precedenti
  const clean = source.replace(/<!--pre:([\w-]+)-->[\s\S]*?<!--\/pre:\1-->/g, "");
  const docEl = createEl("html");
  const bodyStart = clean.search(/<body[\s>]/i);
  const bodyEnd = clean.search(/<\/body>/i);
  const body = createEl("body");
  const head = createEl("head");
  const bodyOpen = clean.slice(bodyStart).match(/^<body([^>]*)>/i);
  body.innerHTML = clean.slice(bodyStart + bodyOpen[0].length, bodyEnd < 0 ? clean.length : bodyEnd)
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  head.innerHTML = (clean.match(/<head[^>]*>([\s\S]*?)<\/head>/i) || [, ""])[1];
  docEl.appendChild(head); docEl.appendChild(body);
  const langMatch = clean.match(/<html[^>]*\slang="([^"]+)"/i);
  if (langMatch) docEl.setAttribute("lang", langMatch[1]);

  const ready = [];
  const storage = new Map();
  const listeners = [];
  const document = {
    nodeType: 9,
    documentElement: docEl, body, head,
    querySelector: (s) => docEl.querySelector(s),
    querySelectorAll: (s) => docEl.querySelectorAll(s),
    getElementById: (id) => docEl.querySelector("#" + id),
    getElementsByClassName: (c) => docEl.querySelectorAll("." + c),
    createElement: (t) => createEl(t),
    createElementNS: (ns, t) => createEl(t),
    createTextNode: (s) => new TextNode(escapeText(s)),
    createDocumentFragment: () => { const f = createEl("fragment"); f.nodeType = 11; return f; },
    addEventListener: (ev, cb) => { if (ev === "DOMContentLoaded") ready.push(cb); else listeners.push(ev); },
    removeEventListener() {},
    readyState: "loading",
    cookie: "",
    title: "",
    hidden: false,
    visibilityState: "visible",
  };
  const noop = () => {};
  const obs = function () { return { observe: noop, unobserve: noop, disconnect: noop, takeRecords: () => [] }; };
  const window = {
    document,
    location: { search: "", hash: "", pathname: "/", href: CONFIG.baseUrl, host: "", origin: CONFIG.baseUrl.replace(/\/$/, ""), protocol: "https:" },
    navigator: { language: "it-IT", languages: ["it-IT"], userAgent: "prerender", onLine: true },
    localStorage: { getItem: (k) => (storage.has(k) ? storage.get(k) : null), setItem: (k, v) => storage.set(k, String(v)), removeItem: (k) => storage.delete(k), clear: () => storage.clear() },
    sessionStorage: { getItem: () => null, setItem: noop, removeItem: noop },
    history: { replaceState: noop, pushState: noop },
    addEventListener: noop, removeEventListener: noop, dispatchEvent: noop,
    matchMedia: () => ({ matches: false, addEventListener: noop, removeEventListener: noop, addListener: noop, removeListener: noop }),
    requestAnimationFrame: () => 0, cancelAnimationFrame: noop,
    setTimeout: () => 0, clearTimeout: noop, setInterval: () => 0, clearInterval: noop, queueMicrotask: noop,
    IntersectionObserver: obs, ResizeObserver: obs, MutationObserver: obs,
    Audio: function () { return sink(); }, Image: function () { return createEl("img"); },
    fetch: () => new Promise(noop),
    visualViewport: sink(),
    innerWidth: 1280, innerHeight: 800, devicePixelRatio: 1, scrollY: 0, pageYOffset: 0,
    getComputedStyle: () => ({ getPropertyValue: () => "" }),
    scrollTo: noop, open: noop, alert: noop,
    console,
  };
  const ctx = vm.createContext(Object.assign(Object.create(null), window, {
    URLSearchParams, URL, Math, Date, JSON, Array, Object, String, Number, Boolean, RegExp, Map, Set, WeakMap, Symbol, Promise, Proxy, Error, TypeError, Intl, parseInt, parseFloat, isNaN, encodeURIComponent, decodeURIComponent,
  }));
  vm.runInContext("var window=globalThis; var self=globalThis;", ctx);

  // tutti gli script in un unico contesto, come nel browser (const condivise)
  const code = CONFIG.scripts.map((s) => fs.readFileSync(path.join(ROOT, s), "utf8")).join("\n;\n");
  try {
    vm.runInContext(code, ctx, { filename: "site-bundle.js", timeout: 15000 });
  } catch (e) {
    if (process.env.PRERENDER_DEBUG) console.warn("script:", e.message);
  }
  for (const cb of ready) {
    try { ctx.__cb = cb; vm.runInContext("__cb()", ctx, { timeout: 15000 }); } catch (e) {
      if (process.env.PRERENDER_DEBUG) console.warn("init:", e.message);
    }
  }

  let html = source;
  let done = 0;
  const missing = [];
  for (const id of CONFIG.containers) {
    const el = docEl.querySelector("#" + id);
    const rendered = el ? el.innerHTML.trim() : "";
    if (!rendered) { missing.push(id); continue; }
    const block = `<!--pre:${id}-->${rendered}<!--/pre:${id}-->`;
    const marked = new RegExp(`<!--pre:${id}-->[\\s\\S]*?<!--\\/pre:${id}-->`);
    if (marked.test(html)) {
      html = html.replace(marked, () => block);
    } else {
      const empty = new RegExp(`(<(\\w+)[^>]*\\sid="${id}"[^>]*>)(\\s*)(</\\2>)`);
      if (!empty.test(html)) { missing.push(id + " (contenitore non vuoto nel sorgente)"); continue; }
      html = html.replace(empty, (m, open, tag, ws, close) => open + block + close);
    }
    done++;
  }
  fs.writeFileSync(htmlPath, html, "utf8");
  console.log(`prerender: ${done}/${CONFIG.containers.length} sezioni scritte in ${CONFIG.html}`);
  if (missing.length) { console.log("  vuote o non trovate: " + missing.join(", ")); process.exitCode = 1; }
}

run();
