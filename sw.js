/* =====================================================================
   Cadence — service worker
   - Garde l’application disponible hors connexion.
   - À chaque ouverture, compare index.html à la version publiée en ligne
     et prévient l’app quand une nouvelle version est prête.
   Pour chaque nouvelle version publiée : change SW_VERSION ci-dessous.
   Les données (habitudes, validations…) ne sont jamais stockées ici.
   ===================================================================== */
const SW_VERSION = '1.2.0';
const CACHE = 'cadence-app-v2';
const META_CACHE = 'cadence-meta-v2';
const SCOPE = self.registration.scope;
const SCOPE_PATH = new URL(SCOPE).pathname;
const INDEX = new URL('./index.html', SCOPE).href;
/* Version précédente de l’app, gardée en secours : servie à l’adresse precedente.html. */
const PREV = new URL('./precedente.html', SCOPE).href;
const ASSETS = [
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './apple-touch-icon.png',
  './precedente.html',
].map((u) => new URL(u, SCOPE).href);

const versionOf = (html) => {
  const m = /<meta name="app-version" content="([^"]+)"/.exec(html || '');
  return m ? m[1] : null;
};
/* Vrai si la version a est plus récente que b (« 1.10.0 » > « 1.9.2 »). */
const newer = (a, b) => {
  const p = (v) => String(v || '0').split('.').map((n) => parseInt(n, 10) || 0);
  const x = p(a); const y = p(b);
  for (let i = 0; i < Math.max(x.length, y.length); i++) if ((x[i] || 0) !== (y[i] || 0)) return (x[i] || 0) > (y[i] || 0);
  return false;
};
async function readMeta() {
  try {
    const c = await caches.open(META_CACHE);
    const r = await c.match('meta');
    return r ? await r.json() : { updatedAt: 0, version: null };
  } catch (e) { return { updatedAt: 0, version: null }; }
}
async function writeMeta(meta) {
  const c = await caches.open(META_CACHE);
  await c.put('meta', new Response(JSON.stringify(meta), { headers: { 'Content-Type': 'application/json' } }));
}
async function notify(msg) {
  const list = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
  list.forEach((client) => client.postMessage(msg));
}

/* Garde l’ancienne page de l’app : si une mise à jour pose problème, elle reste
   ouvrable hors ligne, avec les mêmes données (même base, même adresse). */
async function keepPrevious(text) {
  try {
    const c = await caches.open(META_CACHE);
    await c.put(PREV, new Response(text, { headers: { 'Content-Type': 'text/html; charset=utf-8' } }));
  } catch (e) { /* ignore */ }
}

/* Télécharge index.html ; s’il a changé, le met en cache et note l’heure. */
async function refreshIndex() {
  const cache = await caches.open(CACHE);
  const old = await cache.match(INDEX);
  const oldText = old ? await old.text() : null;
  let res;
  try { res = await fetch(INDEX, { cache: 'no-cache' }); } catch (e) { return { ok: false }; }
  if (!res || !res.ok) return { ok: false };
  const text = await res.clone().text();
  if (oldText !== null && text === oldText) return { ok: true, changed: false };
  if (oldText !== null) await keepPrevious(oldText);
  await cache.put(INDEX, res);
  const meta = await readMeta();
  if (oldText !== null) {
    meta.updatedAt = Date.now();
    await Promise.all(ASSETS.filter((u) => u !== INDEX).map(async (u) => {
      try { const r = await fetch(u, { cache: 'reload' }); if (r.ok) await cache.put(u, r); } catch (e) { /* hors ligne */ }
    }));
  }
  meta.version = versionOf(text);
  await writeMeta(meta);
  return { ok: true, changed: oldText !== null, version: meta.version };
}

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    const old = await caches.match(INDEX);
    const oldText = old ? await old.text() : null;
    await Promise.all(ASSETS.map(async (u) => {
      try { const r = await fetch(u, { cache: 'reload' }); if (r.ok) await cache.put(u, r); } catch (e) { /* hors ligne */ }
    }));
    const fresh = await cache.match(INDEX);
    const newText = fresh ? await fresh.text() : null;
    const meta = await readMeta();
    if (oldText !== null && newText !== null && newText !== oldText) { meta.updatedAt = Date.now(); await keepPrevious(oldText); }
    meta.version = versionOf(newText) || meta.version;
    await writeMeta(meta);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k.startsWith('cadence-') && k !== CACHE && k !== META_CACHE).map((k) => caches.delete(k)));
    await self.clients.claim();
    const meta = await readMeta();
    if (meta.updatedAt) notify({ type: 'UPDATE_READY', version: meta.version, updatedAt: meta.updatedAt });
  })());
});

const noPrevious = () => new Response(
  '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Cadence</title>'
  + '<body style="margin:0;min-height:100vh;display:grid;place-items:center;background:#0A0A09;color:#F2F1EC;font:16px system-ui;text-align:center;padding:24px">'
  + '<div><p style="font-size:20px;font-weight:700">Pas de version précédente</p><p style="color:#B4B2A9">Elle est gardée à la première mise à jour installée.</p><p><a style="color:#FFD60A" href="./">Revenir à Cadence</a></p></div></body>',
  { headers: { 'Content-Type': 'text/html; charset=utf-8' } },
);
const offlinePage = () => new Response(
  '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Cadence</title>'
  + '<body style="margin:0;min-height:100vh;display:grid;place-items:center;background:#0A0A09;color:#F2F1EC;font:16px system-ui;text-align:center;padding:24px">'
  + '<div><p style="font-size:20px;font-weight:700">Cadence est hors connexion</p><p style="color:#B4B2A9">Ouvre l’app une première fois avec Internet pour l’installer sur cet appareil.</p></div></body>',
  { headers: { 'Content-Type': 'text/html; charset=utf-8' } },
);

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.endsWith('/sw.js')) return;
  if (url.pathname === SCOPE_PATH + 'precedente.html') {
    /* Deux sources : le fichier precedente.html publié avec l’app (préparé pour servir de
       secours) et la page gardée lors de la dernière mise à jour. On sert la plus récente
       des deux ; à version égale, le fichier publié. Sinon, une page d’explication. */
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      let shipped = await cache.match(PREV);
      if (!shipped) {
        try { const r = await fetch(req); if (r.ok && versionOf(await r.clone().text())) { await cache.put(PREV, r.clone()); shipped = r; } } catch (e) { /* hors ligne */ }
      }
      const kept = await (await caches.open(META_CACHE)).match(PREV);
      if (shipped && kept) {
        const [a, b] = await Promise.all([shipped.clone().text(), kept.clone().text()]);
        return newer(versionOf(b), versionOf(a)) ? kept : shipped;
      }
      return shipped || kept || noPrevious();
    })());
    return;
  }
  const isShell = url.pathname === SCOPE_PATH || url.pathname === SCOPE_PATH + 'index.html';
  if (req.mode === 'navigate' || isShell) {
    if (!isShell) return; /* autres pages du site : réseau normal */
    const cached = caches.open(CACHE).then((c) => c.match(INDEX));
    event.respondWith(cached.then((r) => r || fetch(req).catch(() => offlinePage())));
    event.waitUntil(cached
      .then(() => refreshIndex())
      .then((r) => { if (r && r.changed) return notify({ type: 'UPDATE_READY', version: r.version }); return null; })
      .catch(() => {}));
    return;
  }
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const hit = await cache.match(req, { ignoreSearch: true });
    if (hit) return hit;
    try {
      const res = await fetch(req);
      if (res.ok && res.type === 'basic') cache.put(req, res.clone());
      return res;
    } catch (e) { return Response.error(); }
  })());
});

self.addEventListener('message', (event) => {
  const type = event.data && event.data.type;
  const port = event.ports && event.ports[0];
  const reply = (m) => { if (port) port.postMessage(m); else if (event.source) event.source.postMessage(m); };
  if (type === 'STATUS') {
    event.waitUntil(readMeta().then((m) => reply({ type: 'STATUS', ...m, sw: SW_VERSION })));
  } else if (type === 'CHECK') {
    event.waitUntil(refreshIndex()
      .then(async (r) => {
        const m = await readMeta();
        if (!r.ok) reply({ type: 'CHECK_FAILED', ...m, sw: SW_VERSION });
        else reply({ type: r.changed ? 'UPDATE_READY' : 'UP_TO_DATE', ...m, sw: SW_VERSION });
      })
      .catch(() => reply({ type: 'CHECK_FAILED' })));
  }
});
