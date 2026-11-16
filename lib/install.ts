"use client";

import { useSyncExternalStore } from "react";

// Instalación como app en la compu o el celular.
// Chrome, Edge y Android avisan con "beforeinstallprompt" y se puede abrir su cartel desde un botón.
// iPhone/iPad no: se instala desde Compartir → "Agregar a inicio", así que ahí se muestran los pasos.

interface PromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

let deferred: PromptEvent | null = null;
let installed = false;
let started = false;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

/** Registra el service worker (solo en producción) y escucha el aviso de instalación. */
export function initPwa() {
  if (typeof window === "undefined" || started) return;
  started = true;
  installed =
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as { standalone?: boolean }).standalone === true;
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferred = e as PromptEvent;
    emit();
  });
  window.addEventListener("appinstalled", () => {
    installed = true;
    deferred = null;
    emit();
  });
  if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
    navigator.serviceWorker
      .register(`/sw.js?v=${process.env.NEXT_PUBLIC_APP_VERSION}`)
      .catch(() => {});
  }
  emit();
}

export async function promptInstall(): Promise<boolean> {
  if (!deferred) return false;
  await deferred.prompt();
  const { outcome } = await deferred.userChoice;
  deferred = null;
  emit();
  return outcome === "accepted";
}

export type InstallState = "installed" | "ready" | "ios" | "manual";

const isIos = () =>
  /iphone|ipad|ipod/i.test(navigator.userAgent) ||
  (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

const snap = (): InstallState =>
  installed ? "installed" : deferred ? "ready" : isIos() ? "ios" : "manual";

/** "ready": hay botón; "ios": instrucciones de Safari; "manual": el navegador no avisó (Firefox, o ya lo descartaron). */
export function useInstall(): InstallState | null {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => void listeners.delete(l);
    },
    snap,
    () => null,
  );
}
