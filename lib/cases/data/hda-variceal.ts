import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hdaVariceal: ClinicalCase = {
  id: "hemorragia-variceal-cirrosis",
  level: 4,
  area: "Gastroenterología",
  setting: "Guardia",
  patient: { age: 52, ageUnit: "años", sex: "M", context: "Consumo de alcohol de muchos años. Le dijeron que tenía el hígado “duro” pero nunca hizo controles." },
  frequency: "frecuente",
  intro: "“Vomitó sangre roja dos veces, mucha, como medio balde. Está pálido y medio dormido.” (relata la esposa)",
  vitals: { TA: "84/50 mmHg", FC: "126 lpm", FR: "24 rpm", "T°": "36,2 °C", "SatO₂": "94 %", Glasgow: "13/15" },
  anamnesis: [
    act("alcohol", "¿Cuánto toma y desde cuándo?", "clave", "“Un litro de vino por día hace 25 años.”", "Cirrosis alcohólica: causa de hipertensión portal y várices."),
    act("vomito", "¿Cómo fue el vómito? ¿Rojo o como borra de café?", "clave", "“Rojo, con coágulos, mucho.”", "Hematemesis abundante de sangre roja: sangrado activo."),
    act("melena", "¿Hizo caca negra?", "util", "“Sí, desde ayer.”", "Sangrado digestivo alto."),
    act("farmacos", "¿Toma aspirina, antiinflamatorios o anticoagulantes?", "util", "“Ibuprofeno a veces.”", "Factor agregado."),
    act("confusion", "¿Estaba confundido en los últimos días?", "util", "“Estaba más dormido y raro.”", "Encefalopatía hepática, que el sangrado empeora."),
    act("trabajo", "¿De qué trabaja?", "neutro", "“Albañil.”", "No orienta."),
  ],
  exam: [
    act("estigmas", "Estigmas de hepatopatía", "clave", "Arañas vasculares, eritema palmar, ginecomastia, ictericia leve.", "Cirrosis."),
    act("abdomen", "Abdomen", "clave", "Ascitis moderada, circulación colateral, esplenomegalia.", "Hipertensión portal."),
    act("encefalopatia", "Flapping y estado mental", "clave", "Asterixis, somnolencia.", "Encefalopatía hepática grado II."),
    act("tacto", "Tacto rectal", "util", "Melena.", "Confirma sangrado digestivo."),
  ],
  studies: [
    study("Laboratorio", "lab", "Hemograma, coagulograma, función hepática y renal, grupo y factor", "clave", "Hb 6,8, plaquetas 62.000, RIN 1,9, albúmina 2,6, bilirrubina 3,2, creatinina 1,3.", "Anemia grave, cirrosis descompensada (Child-Pugh C)."),
    study("Otros", "veda", "Videoendoscopía digestiva alta en las primeras 12 h tras estabilizar", "clave", "Várices esofágicas grandes con estigma de sangrado; se ligan.", "Diagnóstico y tratamiento."),
    study("Laboratorio", "paracentesis", "Paracentesis diagnóstica", "util", "Recuento de neutrófilos 120/mm³.", "Descarta peritonitis bacteriana espontánea."),
    study("Imágenes", "tc", "Tomografía antes de la endoscopía", "innecesario", "No se realizó.", "No cambia la conducta urgente."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("variceal", "Hemorragia digestiva alta variceal en cirrosis alcohólica descompensada (Child-Pugh C) con shock hemorrágico y encefalopatía", true, "Hematemesis roja abundante con shock, estigmas de cirrosis, ascitis, esplenomegalia y várices esofágicas con estigma de sangrado."),
      dx("ulcera", "Úlcera péptica sangrante", false, "Posible en un cirrótico, pero la endoscopía muestra várices sangrantes."),
      dx("mallory", "Síndrome de Mallory-Weiss", false, "Desgarro tras vómitos repetidos; la endoscopía muestra várices."),
      dx("hemoptisis", "Hemoptisis", false, "La sangre es vomitada y hay melena."),
      dx("gastropatia", "Gastropatía portal hipertensiva", false, "Sangra en forma lenta y crónica, no masiva."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("vasoactivo", "Terlipresina u octreotide EV desde la sospecha", "clave", "Bajan la presión portal y el sangrado; se mantienen 2–5 días."),
      mg("atb", "Antibiótico profiláctico (ceftriaxona)", "clave", "Reduce infecciones, resangrado y mortalidad en cirróticos que sangran."),
      mg("transfusion", "Transfusión restrictiva (Hb objetivo 7–8 g/dl) y expansión cuidadosa", "clave", "Transfundir de más aumenta la presión portal y el resangrado."),
      mg("endoscopia", "Endoscopía con ligadura de várices en las primeras 12 h", "clave", "Tratamiento definitivo del sangrado."),
      mg("lactulosa", "Lactulosa para la encefalopatía y proteger la vía aérea si empeora", "util", "La sangre en el intestino aporta proteínas y empeora la encefalopatía."),
      mg("transfundir-mucho", "Transfundir hasta Hb 10 g/dl", "riesgoso", "Aumenta la mortalidad en el sangrado variceal."),
    ],
  },
  debrief: {
    diagnosis: "Hemorragia digestiva alta variceal con shock hemorrágico en cirrosis alcohólica descompensada (Child-Pugh C), con ascitis y encefalopatía hepática grado II, en varón de 52 años.",
    pathologies: [
      { name: "Hemorragia por várices esofágicas", role: "principal", why: "Sangrado por hipertensión portal." },
      { name: "Cirrosis alcohólica descompensada", role: "asociada", why: "Causa de la hipertensión portal." },
      { name: "Úlcera péptica, Mallory-Weiss, gastropatía portal", role: "diferencial", why: "Otras causas de HDA en cirróticos." },
    ],
    reasoning: [
      "Causa: cirrosis por alcohol que aumenta la resistencia al flujo portal.",
      "Mecanismo: la hipertensión portal abre colaterales portosistémicas (várices esofágicas) de pared fina, que se rompen cuando aumenta la presión.",
      "Consecuencia: sangrado masivo, shock, encefalopatía, infecciones e insuficiencia renal, con alta mortalidad.",
    ],
    epidemiology:
      "La mitad de los cirróticos tiene várices al diagnóstico y un tercio sangra en algún momento. La mortalidad de cada episodio es del 15 al 20 % a las 6 semanas, mayor en Child-Pugh C. En Argentina, el alcohol y las hepatitis virales y metabólicas son las principales causas de cirrosis.",
    management: [
      "Reanimación cuidadosa, transfusión restrictiva y protección de la vía aérea.",
      "Vasoactivos y antibióticos desde la sospecha.",
      "Endoscopía con ligadura en las primeras 12 h; TIPS en casos seleccionados.",
      "Profilaxis secundaria con betabloqueantes no selectivos y ligaduras; abordaje del alcohol y evaluación para trasplante.",
    ],
    sources: ["Sociedad Argentina de Hepatología — Consenso de hipertensión portal.", "Consenso de Baveno VII."],
    pearls: ["Cirrótico que sangra = vasoactivo + antibiótico.", "Transfusión restrictiva.", "Ligadura en 12 h."],
    pitfalls: ["Transfundir hasta valores normales.", "Olvidar el antibiótico."],
    tribunal: [
      qa("¿Qué es la clasificación de Child-Pugh?", "Una escala de gravedad de la cirrosis con bilirrubina, albúmina, RIN, ascitis y encefalopatía: A (5–6 puntos, compensada), B (7–9) y C (10–15, descompensada grave); predice la supervivencia. El MELD (bilirrubina, RIN, creatinina, sodio) se usa para priorizar el trasplante."),
      qa("¿Cómo se previene el primer sangrado por várices?", "Con betabloqueantes no selectivos (propranolol, carvedilol) o ligadura endoscópica en pacientes con várices grandes o con signos de riesgo; Baveno VII propone carvedilol en la hipertensión portal clínicamente significativa."),
      qa("¿Qué complicaciones tiene la cirrosis?", "Hemorragia variceal, ascitis, peritonitis bacteriana espontánea, encefalopatía hepática, síndrome hepatorrenal, hepatocarcinoma, síndrome hepatopulmonar, hiponatremia y desnutrición."),
    ],
  },
};
