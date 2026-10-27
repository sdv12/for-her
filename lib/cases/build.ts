import type { CaseAction, CaseStudy, DiagnosisOption, ManagementOption, Relevance, StudyGroup, TribunalQA } from "./types";

/** Atajos para escribir los casos de forma compacta. */

export const act = (id: string, label: string, relevance: Relevance, result: string, why: string): CaseAction => ({
  id,
  label,
  relevance,
  result,
  why,
});

export const study = (group: StudyGroup, id: string, label: string, relevance: Relevance, result: string, why: string): CaseStudy => ({
  group,
  id,
  label,
  relevance,
  result,
  why,
});

export const dx = (id: string, label: string, correct: boolean, why: string): DiagnosisOption => ({ id, label, correct, why });

export const mg = (id: string, label: string, relevance: Relevance, why: string): ManagementOption => ({ id, label, relevance, why });

export const qa = (q: string, a: string): TribunalQA => ({ q, a });
