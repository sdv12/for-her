import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hepatitisC: ClinicalCase = {
  id: "hepatitis-c-cronica",
  level: 2,
  area: "Gastroenterología",
  setting: "Consultorio",
  patient: { age: 56, ageUnit: "años", sex: "M", context: "Recibió transfusiones por un accidente en 1988. Se tatuó en los 90." },
  frequency: "poco-frecuente",
  intro: "“Fui a donar sangre y me dijeron que tengo hepatitis C. No tengo síntomas. ¿Es grave?”",
  vitals: { TA: "126/80 mmHg", FC: "72 lpm", "T°": "36,4 °C", Peso: "80 kg" },
  anamnesis: [
    act("riesgo", "¿Recibiste transfusiones antes de 1993, te tatuaste o usaste drogas inyectables?", "clave", "“Transfusiones en el 88 y tatuajes.”", "Factores de riesgo de hepatitis C."),
    act("alcohol", "¿Cuánto alcohol tomás?", "clave", "“Una o dos cervezas por día.”", "El alcohol acelera la fibrosis."),
    act("sintomas", "¿Cansancio, ictericia, panza hinchada, sangrados?", "util", "“Algo de cansancio.”", "Sin descompensación."),
    act("pareja", "¿Tu pareja se testeó?", "util", "“No.”", "Transmisión sexual baja, pero se ofrece testeo."),
    act("vih-hb", "¿Te testearon VIH y hepatitis B?", "util", "“No sé.”", "Coinfecciones."),
    act("musica", "¿Qué música te gusta?", "neutro", "“Rock.”", "No orienta."),
  ],
  exam: [
    act("estigmas", "Estigmas de hepatopatía", "clave", "Sin arañas vasculares, ascitis ni ictericia.", "Sin cirrosis descompensada."),
    act("higado", "Hígado y bazo", "util", "Hígado palpable, bazo no.", "Sin signos de hipertensión portal."),
    act("piel", "Piel", "util", "Tatuajes antiguos.", "Factor de riesgo."),
  ],
  studies: [
    study("Laboratorio", "carga", "Carga viral del VHC (ARN) y genotipo", "clave", "Carga viral detectable; genotipo 1.", "Confirma infección activa (un anticuerpo positivo solo no la confirma)."),
    study("Otros", "fibrosis", "Evaluación de fibrosis (FIB-4, APRI o elastografía)", "clave", "Elastografía 11 kPa (fibrosis avanzada F3).", "Define seguimiento y riesgo."),
    study("Laboratorio", "lab", "Hepatograma, plaquetas, RIN, albúmina, VIH, hepatitis B", "util", "TGP 92, plaquetas 160.000, VIH y HBsAg negativos.", "Línea de base."),
    study("Otros", "biopsia", "Biopsia hepática de rutina", "innecesario", "No se realizó.", "Los métodos no invasivos alcanzan."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("vhc", "Hepatitis C crónica con fibrosis avanzada (F3), sin cirrosis descompensada", true, "Anticuerpos y ARN del VHC positivos, factores de riesgo, transaminasas elevadas y elastografía de 11 kPa."),
      dx("curada", "Infección curada espontáneamente", false, "La carga viral es detectable."),
      dx("cirrosis", "Cirrosis descompensada", false, "Sin ascitis, ictericia ni sangrado."),
      dx("hepatitis-b", "Hepatitis B crónica", false, "HBsAg negativo."),
      dx("higado-graso", "Hígado graso", false, "El virus explica la hepatitis."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("aad", "Antivirales de acción directa (por ejemplo, sofosbuvir con velpatasvir por 12 semanas)", "clave", "Curan más del 95 % de los casos; son gratuitos en el sistema público."),
      mg("alcohol", "Suspender el alcohol", "clave", "Acelera la fibrosis."),
      mg("rastreo-hcc", "Con fibrosis avanzada: ecografía cada 6 meses para hepatocarcinoma, aun después de curar", "clave", "El riesgo persiste."),
      mg("vacunas", "Vacunar contra hepatitis A y B", "util", "Protección."),
      mg("interferon", "Interferón con ribavirina", "innecesario", "Tratamiento antiguo, menos eficaz y con más efectos adversos."),
      mg("no-tratar", "No tratar porque no tiene síntomas", "riesgoso", "La fibrosis progresa a cirrosis y cáncer."),
    ],
  },
  debrief: {
    diagnosis: "Hepatitis C crónica genotipo 1 con fibrosis avanzada (F3), sin descompensación, en varón de 56 años transfundido antes de 1993 y con consumo de alcohol.",
    pathologies: [
      { name: "Hepatitis C crónica", role: "principal", why: "Infección viral persistente." },
      { name: "Fibrosis avanzada y alcohol", role: "asociada", why: "Riesgo de cirrosis y hepatocarcinoma." },
      { name: "Hepatitis B, hígado graso", role: "diferencial", why: "Otras hepatopatías crónicas." },
    ],
    reasoning: [
      "Causa: virus de la hepatitis C transmitido por sangre (transfusiones antes del control, agujas, tatuajes sin bioseguridad).",
      "Mecanismo: infección crónica en el 70–80 % con inflamación persistente y fibrosis.",
      "Consecuencia: cirrosis en 20–30 años, hepatocarcinoma y manifestaciones extrahepáticas.",
    ],
    epidemiology:
      "En Argentina se estima que hay cientos de miles de personas con hepatitis C y que la mayoría no lo sabe; muchos son mayores de 50 años con transfusiones antes de 1993 o exposiciones de riesgo. La OMS propone eliminarla para 2030 gracias a los antivirales de acción directa.",
    management: [
      "Testear al menos una vez en la vida a todos los adultos y a grupos de riesgo.",
      "Confirmar con carga viral y evaluar fibrosis.",
      "Tratar a todos con antivirales de acción directa.",
      "Seguimiento según fibrosis y prevención.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de diagnóstico y tratamiento de la hepatitis C.", "Ley 27.675 de respuesta integral al VIH, hepatitis virales, TBC e ITS."],
    pearls: ["Anticuerpo positivo: confirmar con carga viral.", "Se cura en más del 95 %.", "Fibrosis avanzada: rastreo de hepatocarcinoma."],
    pitfalls: ["No tratar por estar asintomático.", "Asumir que un anticuerpo positivo es infección activa."],
    tribunal: [
      qa("¿Qué diferencias hay entre la hepatitis B y la C?", "La B tiene vacuna, se cronifica sobre todo si se adquiere al nacer y se controla (no siempre se cura) con antivirales; la C no tiene vacuna, se cronifica en la mayoría de los adultos y se cura con antivirales de acción directa."),
      qa("¿Qué manifestaciones extrahepáticas tiene la hepatitis C?", "Crioglobulinemia mixta, glomerulonefritis membranoproliferativa, porfiria cutánea tarda, liquen plano, linfoma no Hodgkin de células B y resistencia a la insulina."),
      qa("¿Cómo se define la curación de la hepatitis C?", "Por la respuesta viral sostenida: carga viral indetectable 12 semanas después de terminar el tratamiento."),
    ],
  },
};
