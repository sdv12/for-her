import type { CaseExtra } from "../types";
import { batch1 } from "./batch1";
import { batch2 } from "./batch2";
import { batch3 } from "./batch3";
import { batch4 } from "./batch4";

/** Contenido extra por id de caso. Cada tanda vive en su archivo. */
export const EXTRAS: Record<string, CaseExtra> = { ...batch1, ...batch2, ...batch3, ...batch4 };
