// Service worker de For her: guarda la app para que abra sin internet (los datos ya viven en el navegador).
// - Páginas: primero internet (siempre lo último); si no hay, la copia guardada de esa pantalla o la de Hoy.
// - /_next/static: nunca cambian (tienen un código en el nombre), se guardan una vez.
// - Cada caso clínico que abrís queda guardado para jugarlo sin conexión.
// La versión llega por ?v= al registrarlo: cada deploy usa una caché nueva y borra la vieja.
const VERSION = new URL(self.location).searchParams.get("v") || "dev";
const CACHE = `forher-${VERSION}`;
const PAGES = [
  "/hoy",
  "/plan",
  "/tablero",
  "/tarjetas",
  "/tarjetas/repasar",
  "/preguntas",
  "/simulacro",
  "/errores",
  "/foco",
  "/registros",
  "/temario",
  "/casos",
  "/programa",
  "/programa/materias",
  "/programa/ruta",
  "/programa/metodo",
  "/mas",
  "/ajustes",
];
const FILES = ["/manifest.webmanifest", "/icons/icon-192.png", "/icons/icon-512.png", "/icons/icon-maskable-512.png"];

// Netlify mete un comentario promocional dentro del <head>; React 19 lo ve como un nodo de más
// y descarta el HTML del servidor (error #418). Se saca antes de entregar la página.
const NETLIFY_COMMENT = /\s*<!--\s*This site is hosted on Netlify[\s\S]*?-->\s*/;
async function clean(res) {
  const type = res.headers.get("content-type") || "";
  if (!res.ok || !type.includes("text/html")) return res;
  const html = await res.text();
  return new Response(html.replace(NETLIFY_COMMENT, ""), { status: res.status, statusText: res.statusText, headers: res.headers });
}

const pageKey = (url) => {
  const p = new URL(url, self.location.origin).pathname.replace(/\/$/, "");
  return p || "/hoy";
};

async function cacheAssetsFrom(cache, html) {
  const urls = new Set();
  for (const m of html.matchAll(/["'(](\/_next\/static\/[^"'()\s\\]+)/g)) urls.add(m[1]);
  await Promise.all(
    [...urls].map(async (url) => {
      if (await cache.match(url)) return;
      try {
        const res = await fetch(url);
        if (res.ok) await cache.put(url, res);
      } catch {}
    }),
  );
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      try {
        await cache.addAll(FILES);
      } catch {}
      await Promise.all(
        PAGES.map(async (p) => {
          try {
            const res = await clean(await fetch(p, { cache: "no-store" }));
            if (!res.ok) return;
            await cache.put(p, res.clone());
            await cacheAssetsFrom(cache, await res.text());
          } catch {}
        }),
      );
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      for (const key of await caches.keys()) if (key.startsWith("forher-") && key !== CACHE) await caches.delete(key);
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (req.mode === "navigate") {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE);
        const key = pageKey(req.url);
        try {
          const res = await clean(await fetch(req));
          if (res.ok) {
            const copy = res.clone();
            event.waitUntil(
              (async () => {
                await cache.put(key, copy.clone());
                await cacheAssetsFrom(cache, await copy.text());
              })(),
            );
          }
          return res;
        } catch {
          return (await cache.match(key)) || (await cache.match("/hoy")) || Response.error();
        }
      })(),
    );
    return;
  }

  if (url.pathname.startsWith("/_next/static/") || FILES.includes(url.pathname)) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE);
        const hit = await cache.match(req, { ignoreSearch: true });
        if (hit) return hit;
        const res = await fetch(req);
        if (res.ok) cache.put(req, res.clone());
        return res;
      })(),
    );
    return;
  }

  // Datos de Next para la navegación interna (RSC): internet primero; sin conexión, la última copia.
  // Se guardan con otra clave para no pisar el HTML de la misma ruta.
  if (req.headers.get("RSC") === "1" || url.searchParams.has("_rsc")) {
    const key = `${pageKey(req.url)}?__rsc`;
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE);
        try {
          const res = await fetch(req);
          if (res.ok) cache.put(key, res.clone());
          return res;
        } catch {
          // Sin copia de datos, se fuerza la navegación completa, que sí tiene respaldo.
          return (await cache.match(key)) || Response.error();
        }
      })(),
    );
  }
});
