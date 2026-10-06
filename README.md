# For her

App de estudio personal para preparar un examen oral integrador de medicina: plan diario, tablero, tarjetas con repaso espaciado, simulacro y modo tribunal, cuaderno de errores, foco (pomodoro), registros y temario.

> **Versión de prueba.** Todavía no tiene backend: los datos viven en el navegador (localStorage) y no se sincronizan entre dispositivos. Desde **Ajustes → Tus datos** podés exportar un respaldo y restaurarlo en otro dispositivo.

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · next-themes · Zod · date-fns · dnd-kit · mammoth · Vitest.

## Desarrollo

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm test       # tests de lógica (SRS, parser del cronograma, fechas…)
pnpm build
```

## Estructura

- `app/(app)/…` — una ruta por sección (hoy, plan, tablero, tarjetas, simulacro, foco, preguntas, errores, registros, temario, ajustes).
- `components/ui` — componentes base del sistema de diseño · `components/features/<sección>` — pantallas.
- `lib/` — lógica pura con tests (`srs.ts`, `plan-import/`, `focus.ts`, `simulacro.ts`…).
- `lib/mock/` — datos provisorios en el navegador: `store.ts`, `seed.ts` y `actions/*`, con la misma forma que tendrán las Server Actions cuando haya backend.
