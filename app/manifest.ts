import type { MetadataRoute } from "next";

/** PWA: "Agregar a pantalla de inicio" en el celular. Offline queda fuera de v1. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "For her",
    short_name: "For her",
    description: "Estudio activo para el examen oral integrador: plan, tarjetas, simulacro y tribunal.",
    lang: "es-AR",
    start_url: "/hoy",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#F3F7FC",
    theme_color: "#F3F7FC",
    categories: ["education", "productivity"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Repasar tarjetas", url: "/tarjetas/repasar", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
      { name: "Anotar una pregunta", url: "/preguntas?nueva=1", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
      { name: "Bloque de foco", url: "/foco", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
    ],
  };
}
