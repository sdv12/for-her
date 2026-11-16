import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const trombocitopeniaHeparina: ClinicalCase = {
  id: "trombocitopenia-heparina",
  level: 4,
  area: "Hematología",
  setting: "Internación",
  patient: { age: 69, ageUnit: "años", sex: "F", context: "Operada de reemplazo de cadera hace 8 días. Recibe heparina no fraccionada subcutánea profiláctica." },
  frequency: "raro",
  intro: "La residente: “Las plaquetas bajaron de 260.000 a 90.000 y la pierna izquierda se hinchó.”",
  vitals: { TA: "128/78 mmHg", FC: "96 lpm", FR: "18 rpm", "SatO₂": "95 %", "T°": "37,2 °C" },
  anamnesis: [
    act("tiempo", "¿Cuándo empezaron a bajar las plaquetas?", "clave", "Al día 6 de heparina.", "Entre los días 5 y 10: momento típico."),
    act("heparina-previa", "¿Recibió heparina en los últimos 3 meses?", "clave", "No.", "Con exposición reciente puede empezar en horas."),
    act("pierna", "¿Cómo está la pierna?", "clave", "“Hinchada y dolorosa desde ayer.”", "Trombosis: la complicación de la trombocitopenia por heparina."),
    act("sangrado", "¿Sangró por algún lado?", "clave", "No.", "Típicamente trombosis, no sangrado."),
    act("otros-farmacos", "¿Recibe otros fármacos?", "util", "Cefazolina los primeros días, paracetamol.", "Otras causas de plaquetopenia."),
    act("sepsis", "¿Fiebre o infección?", "util", "No.", "La sepsis es otra causa."),
  ],
  exam: [
    act("pierna-ex", "Miembro inferior izquierdo", "clave", "Edema de muslo y pantorrilla, dolor en el trayecto venoso.", "TVP proximal."),
    act("piel", "Sitios de inyección", "util", "Lesión necrótica en el sitio de punción del abdomen.", "Necrosis cutánea por heparina."),
    act("respiratorio", "Respiratorio", "util", "Normal.", "Sin clínica de TEP."),
  ],
  studies: [
    study("Laboratorio", "4t", "Score 4T", "clave", "6 puntos: probabilidad alta.", "Probabilidad pretest."),
    study("Laboratorio", "anti-pf4", "Anticuerpos anti-PF4/heparina", "clave", "Positivos con densidad óptica alta.", "Apoya el diagnóstico."),
    study("Imágenes", "doppler", "Eco Doppler venoso", "clave", "TVP femoropoplítea izquierda.", "Trombosis asociada."),
    study("Laboratorio", "frotis", "Frotis de sangre periférica", "util", "Sin esquistocitos ni agregados.", "Descarta pseudotrombocitopenia y microangiopatía."),
    study("Otros", "esperar-resultado", "Seguir con heparina hasta tener el anti-PF4", "riesgoso", "No se esperó.", "Con 4T alto se suspende ya."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("tih", "Trombocitopenia inducida por heparina tipo 2 con trombosis venosa profunda", true, "Caída de plaquetas mayor del 50 % al día 6, trombosis, necrosis en el sitio de inyección, 4T alto y anti-PF4 positivo."),
      dx("dilucional", "Plaquetopenia dilucional posoperatoria", false, "Se ve en los primeros días y no da trombosis."),
      dx("cid", "Coagulación intravascular diseminada", false, "Sin sepsis ni sangrado."),
      dx("pti", "PTI", false, "No explica la trombosis ni la relación con la heparina."),
      dx("tvp-sola", "TVP posoperatoria aislada", false, "No explica la plaquetopenia."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("suspender", "Suspender toda heparina, incluidos los lavados de vías", "clave", "Primer paso."),
      mg("alternativo", "Anticoagulante no heparínico: argatrobán, fondaparinux o un anticoagulante oral directo", "clave", "Hay que anticoagular: el riesgo trombótico es altísimo."),
      mg("warfarina-luego", "Warfarina recién con plaquetas mayores de 150.000", "clave", "Antes puede causar gangrena venosa."),
      mg("registro", "Registrar como alergia a la heparina", "clave", "Evita reexposición."),
      mg("duracion", "Anticoagular 3 meses por la TVP", "util", "Duración."),
      mg("plaquetas", "Transfundir plaquetas", "riesgoso", "Echa leña al fuego: aumenta la trombosis."),
      mg("hbpm", "Pasar a enoxaparina", "riesgoso", "Reactividad cruzada alta."),
    ],
  },
  debrief: {
    diagnosis: "Trombocitopenia inducida por heparina tipo 2 con TVP femoropoplítea, en una mujer de 69 años en posoperatorio de cadera.",
    pathologies: [
      { name: "Trombocitopenia inducida por heparina", role: "principal", why: "Anticuerpos contra el complejo PF4-heparina." },
      { name: "TVP", role: "asociada", why: "Estado protrombótico." },
      { name: "CID, sepsis, plaquetopenia dilucional", role: "diferencial", why: "Otras causas de plaquetopenia en internación." },
    ],
    reasoning: [
      "Causa: anticuerpos IgG contra el complejo factor plaquetario 4-heparina.",
      "Mecanismo: activan plaquetas, que se consumen y generan trombina.",
      "Consecuencia: plaquetopenia con trombosis venosa o arterial.",
    ],
    epidemiology:
      "Ocurre en hasta el 1–5 % de quienes reciben heparina no fraccionada tras cirugía ortopédica o cardíaca, y en menos del 1 % con HBPM. Es más frecuente en mujeres y en cirugía que en pacientes clínicos. Sin tratamiento, la mitad hace trombosis.",
    management: [
      "4T y anti-PF4.",
      "Suspender heparina.",
      "Anticoagulante alternativo.",
      "No transfundir plaquetas.",
    ],
    sources: ["Sociedad Argentina de Hematología — Guía de trombocitopenia inducida por heparina.", "ASH — Guidelines for management of heparin-induced thrombocytopenia."],
    pearls: ["Plaquetas que caen 50 % al día 5–10.", "Trombosis, no sangrado.", "Suspendé heparina y anticoagulá con otra cosa."],
    pitfalls: ["Pasar a HBPM.", "Transfundir plaquetas."],
    tribunal: [
      qa("¿Qué evalúa el score 4T?", "Magnitud de la caída de plaquetas, momento de aparición, trombosis u otras secuelas y ausencia de otra causa."),
      qa("¿Por qué no se inicia warfarina con plaquetas bajas?", "Porque baja primero la proteína C y puede causar gangrena venosa de miembros."),
      qa("¿Qué diferencia hay entre la tipo 1 y la tipo 2?", "La tipo 1 es leve, temprana, no inmune y sin riesgo; la tipo 2 es inmune, tardía y trombótica."),
    ],
  },
};
