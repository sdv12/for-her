import type { Metadata } from "next";
import { BoardView } from "@/components/features/tablero/BoardView";

export const metadata: Metadata = { title: "Tablero" };

export default function TableroPage() {
  return <BoardView />;
}
