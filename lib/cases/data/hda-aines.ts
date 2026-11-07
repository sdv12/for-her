import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hdaAines: ClinicalCase = {
  id: "hemorragia-digestiva-alta-aines",
  level: 2,
  area: "Gastroenterología",
  setting: "Guardia",
  patient: { age: 72, ageUnit: "años", sex: "F", context: "Artrosis, toma diclofenac a diario y aspirina. Sin protector gástrico. Vive sola." },
  frequency: "muy-frecuente",
  intro: "“Desde ayer hago caca negra, como alquitrán, con mal olor. Hoy me mareé al levantarme y me caí.”",
  vitals: { TA: "96/58 mmHg", FC: "112 lpm", FR: "20 rpm", "T°": "36,4 °C", "SatO₂": "97 %" },
  anamnesis: [
    act("melena", "¿Cómo es la materia fecal? ¿Vomitaste sangre?", "clave", "“Negra; sin vómitos.”", "Hemorragia alta."),
    act("farmacos", "¿AINE, aspirina, corticoides, anticoagulantes?", "clave", "“Diclofenac y aspirina.”", "Causa."),
    act("higado", "¿Alcohol, hígado, várices?", "clave", "“No.”", "Excluye várices."),
    act("dolor", "¿Dolor en la boca del estómago?", "util", "“Algo.”", "Úlcera."),
    act("hierro", "¿Tomás hierro o bismuto?", "util", "“No.”", "Falsas melenas."),
    act("vive", "¿Vive sola?", "neutro", "“Sí, con un gato.”", "Importa para el alta, no para el diagnóstico."),
  ],
  exam: [
    act("hemo", "Ortostatismo y perfusión", "clave", "Hipotensión ortostática, relleno de 3 segundos.", "Hipovolemia."),
    act("rectal", "Tacto rectal", "clave", "Melena.", "Confirma."),
    act("abdomen", "Abdomen y estigmas", "util", "Sin irritación; sin estigmas de cirrosis.", "Perforación y cirrosis."),
  ],
  studies: [
    study("Laboratorio", "lab", "Hemograma, coagulograma, urea, creatinina, grupo", "clave", "Hb 7,4; urea 92.", "Urea alta y sangrado."),
    study("Otros", "veda", "Endoscopía en menos de 24 horas", "clave", "Úlcera gástrica con vaso visible (Forrest IIa).", "Diagnóstico y terapéutica."),
    study("Electrofisiología", "ecg", "ECG y troponina", "util", "Sin isquemia.", "Por la anemia."),
    study("Imágenes", "eco", "Ecografía abdominal", "innecesario", "No se realizó.", "No cambia el manejo."),
    study("Otros", "bario", "Estudio con bario", "riesgoso", "No se realizó.", "Dificulta la endoscopía."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hda", "Hemorragia digestiva alta por úlcera gástrica inducida por AINE", true, "Melena, AINE, urea alta, y úlcera en endoscopía."),
      dx("variceal", "Hemorragia variceal", false, "Sin cirrosis."),
      dx("mw", "Mallory-Weiss", false, "No hay vómitos."),
      dx("cancer", "Cáncer gástrico", false, "No es la presentación; se controla la úlcera."),
      dx("hdb", "Hemorragia digestiva baja", false, "Melena y urea sugieren alta."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("reanimar", "Dos vías, cristaloides, y transfusión si Hb menor a 7 u otros criterios", "clave", "Estrategia restrictiva."),
      mg("ibp", "Inhibidor de bomba EV", "clave", "Reduce resangrado."),
      mg("endo", "Terapia endoscópica", "clave", "Hemostasia."),
      mg("aines", "Suspender AINE; test de H. pylori", "clave", "Evita recurrencia."),
      mg("sonda", "Sonda nasogástrica de rutina", "innecesario", "No aporta y molesta."),
      mg("aspirina", "Ampliar AINE para el dolor al alta", "riesgoso", "Recurrencia."),
    ],
  },
  debrief: {
    diagnosis: "Hemorragia digestiva alta por úlcera gástrica Forrest IIa por AINE, en mujer de 72 años.",
    pathologies: [
      { name: "Hemorragia digestiva alta", role: "principal", why: "Sangrado sobre el ángulo de Treitz." },
      { name: "Úlcera por AINE y anemia aguda", role: "asociada", why: "Causa y consecuencia." },
      { name: "Várices, Mallory-Weiss, cáncer", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: AINE, aspirina y edad.",
      "Mecanismo: la inhibición de prostaglandinas reduce la protección gástrica.",
      "Consecuencia: úlcera, erosión de vaso, shock.",
    ],
    epidemiology:
      "La hemorragia digestiva alta es una emergencia muy frecuente en personas mayores, y las úlceras pépticas son la causa principal. La automedicación con AINE es muy común en Argentina. El protector gástrico en mayores con AINE y aspirina reduce mucho el riesgo.",
    management: [
      "Reanimar y Glasgow-Blatchford.",
      "IBP.",
      "Endoscopía temprana.",
      "Causa y prevención.",
    ],
    sources: ["Sociedad Argentina de Gastroenterología — Hemorragia digestiva.", "ACG — Upper Gastrointestinal Bleeding Guidelines."],
    pearls: ["Melena más urea alta: alta.", "Transfusión restrictiva.", "AINE y edad: IBP."],
    pitfalls: ["No preguntar por AINE.", "Olvidar la H. pylori."],
    tribunal: [
      qa("¿Qué es Forrest?", "Clasifica el sangrado de úlcera: I activo, II reciente, III base limpia."),
      qa("¿Qué es el score de Glasgow-Blatchford?", "Estratifica el riesgo y permite el alta si es muy bajo."),
      qa("¿Por qué se controla la úlcera gástrica?", "Puede ocultar cáncer."),
    ],
  },
};
