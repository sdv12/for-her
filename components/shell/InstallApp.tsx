"use client";

import { useEffect } from "react";
import { Download, MonitorSmartphone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/cn";
import { initPwa, promptInstall, useInstall } from "@/lib/install";

/** Se monta una vez en el layout: registra el service worker y escucha el aviso de instalación. */
export function PwaRuntime() {
  useEffect(() => initPwa(), []);
  return null;
}

/** Botón compacto para el sidebar: aparece solo cuando el navegador permite instalar. */
export function InstallButton({ className }: { className?: string }) {
  const state = useInstall();
  const toast = useToast();
  if (state !== "ready") return null;
  return (
    <button
      type="button"
      onClick={async () => {
        if (await promptInstall())
          toast({ message: "Listo: For her quedó instalada." });
      }}
      className={cn(
        "inline-flex min-h-11 items-center gap-2 rounded-btn px-3 text-sm font-semibold text-ink hover:bg-sunken",
        className,
      )}
    >
      <Download aria-hidden className="size-5" /> Instalar la app
    </button>
  );
}

/** Tarjeta de Ajustes con el botón o los pasos según el navegador. */
export function InstallCard() {
  const state = useInstall();
  const toast = useToast();

  return (
    <Card className="flex flex-col gap-3 p-5 desk:p-6">
      <div>
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <MonitorSmartphone aria-hidden className="size-5" /> Instalar en la
          compu o el celular
        </h2>
        <p className="text-sm text-muted">
          Queda como una app más, con su ícono, en su propia ventana y sin la
          barra del navegador. Abre aunque no tengas internet y guarda los casos
          que ya abriste.
        </p>
      </div>

      {state === "installed" && (
        <p className="rounded-card-sm bg-sunken p-3 text-sm font-semibold">
          Ya la estás usando instalada.
        </p>
      )}

      {state === "ready" && (
        <div>
          <Button
            variant="primary"
            onClick={async () => {
              if (await promptInstall())
                toast({ message: "Listo: For her quedó instalada." });
            }}
          >
            <Download aria-hidden /> Instalar For her
          </Button>
        </div>
      )}

      {state === "ios" && (
        <ol className="list-decimal space-y-1 pl-5 text-sm">
          <li>Abrí esta página en Safari.</li>
          <li>
            Tocá el botón <strong>Compartir</strong> (el cuadrado con la flecha
            hacia arriba).
          </li>
          <li>
            Elegí <strong>Agregar a inicio</strong> y confirmá.
          </li>
        </ol>
      )}

      {state === "manual" && (
        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>
            <strong>Compu (Chrome o Edge):</strong> tocá el ícono de instalar a
            la derecha de la barra de direcciones, o el menú ⋮ →{" "}
            <strong>
              Transmitir, guardar y compartir → Instalar página como app
            </strong>
            .
          </li>
          <li>
            <strong>Android (Chrome):</strong> menú ⋮ →{" "}
            <strong>Agregar a la pantalla principal</strong> → Instalar.
          </li>
          <li>
            <strong>iPhone:</strong> en Safari, Compartir →{" "}
            <strong>Agregar a inicio</strong>.
          </li>
          <li>Firefox en la compu no instala apps web: usá Chrome o Edge.</li>
        </ul>
      )}

      <p className="text-xs text-muted">
        Tus datos siguen guardados en ese navegador: la app instalada y la
        pestaña comparten los mismos datos. Para pasarlos a otro dispositivo usá
        el respaldo de “Tus datos”.
      </p>
    </Card>
  );
}
