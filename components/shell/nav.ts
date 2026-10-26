import {
  CalendarCheck,
  CalendarRange,
  Layers,
  ListChecks,
  MessageCircleQuestionMark,
  Mic,
  NotebookPen,
  Settings,
  SquareKanban,
  Stethoscope,
  Sunrise,
  Timer,
  type LucideIcon,
} from "lucide-react";
import type { NavBadges } from "@/lib/mock/badges";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: (b: NavBadges) => string | number | null;
};

export type NavGroup = { label: string; items: NavItem[] };

const count = (n: number) => (n > 0 ? n : null);

export const NAV: NavGroup[] = [
  {
    label: "Planificar",
    items: [
      { href: "/hoy", label: "Hoy", icon: Sunrise },
      { href: "/plan", label: "Plan", icon: CalendarRange, badge: (b) => (b.semanaActual ? `Sem ${b.semanaActual}` : null) },
      { href: "/tablero", label: "Tablero", icon: SquareKanban, badge: (b) => count(b.tareasAbiertas) },
      { href: "/registros", label: "Registros", icon: CalendarCheck },
    ],
  },
  {
    label: "Estudiar",
    items: [
      { href: "/tarjetas", label: "Tarjetas", icon: Layers, badge: (b) => count(b.tarjetasHoy) },
      { href: "/casos", label: "Casos clínicos", icon: Stethoscope },
      { href: "/simulacro", label: "Simulacro y tribunal", icon: Mic },
      { href: "/foco", label: "Foco", icon: Timer },
    ],
  },
  {
    label: "Juntar",
    items: [
      { href: "/preguntas", label: "Preguntas de examen", icon: MessageCircleQuestionMark, badge: (b) => count(b.preguntas) },
      { href: "/errores", label: "Errores", icon: NotebookPen, badge: (b) => count(b.erroresAbiertos) },
      { href: "/temario", label: "Temario", icon: ListChecks },
    ],
  },
];

/** Pantallas que en el celular se abren desde "Más" (tienen botón ← para volver). */
export const MORE_ITEMS: NavItem[] = [
  ...["/casos", "/preguntas", "/registros", "/simulacro", "/errores", "/foco", "/temario"].map(
    (href) => NAV.flatMap((g) => g.items).find((i) => i.href === href)!,
  ),
  { href: "/ajustes", label: "Ajustes", icon: Settings },
];

export function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}
