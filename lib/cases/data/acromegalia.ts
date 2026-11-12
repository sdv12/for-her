import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const acromegalia: ClinicalCase = {
  id: "acromegalia-adenoma-hipofisario",
  level: 3,
  area: "Endocrinología",
  setting: "Consultorio",
  patient: { age: 47, ageUnit: "años", sex: "M", context: "Hipertenso, diabético reciente. Ronca. Su esposa trae fotos de hace 10 años." },
  frequency: "raro",
  intro: "“Me cambió la cara, los anillos ya no me entran y tuve que agrandar el número de zapatos. Me duele la cabeza y transpiro mucho.”",
  vitals: { TA: "152/94 mmHg", FC: "80 lpm", "T°": "36,6 °C", Peso: "98 kg", Glucemia: "176 mg/dl" },
  anamnesis: [
    act("cambios", "¿Cambios en la cara, manos y pies?", "clave", "“Nariz y mandíbula más grandes.”", "Crecimiento acral."),
    act("vision", "¿Cambios en la visión?", "clave", "“Me choco cosas de costado.”", "Compresión del quiasma."),
    act("comorbilidades", "¿Presión, diabetes, apnea, túnel carpiano?", "clave", "“Todas.”", "Complicaciones."),
    act("articular", "¿Dolor articular?", "util", "“Rodillas.”", "Artropatía."),
    act("sexual", "¿Problemas sexuales?", "util", "“Bajo deseo.”", "Hipogonadismo."),
    act("trabajo", "¿Qué hacés?", "neutro", "“Soy chofer.”", "No orienta."),
  ],
  exam: [
    act("facies", "Facies y manos", "clave", "Prognatismo, macroglosia, separación dental, manos grandes.", "Acromegalia."),
    act("campos", "Campos visuales por confrontación", "clave", "Hemianopsia bitemporal.", "Quiasma."),
    act("piel", "Piel", "util", "Gruesa y sudorosa.", "Típico."),
  ],
  studies: [
    study("Laboratorio", "igf1", "IGF-1", "clave", "Muy elevada para la edad.", "Pesquisa."),
    study("Laboratorio", "ptog", "Hormona de crecimiento tras glucosa oral", "clave", "No se suprime.", "Confirma."),
    study("Imágenes", "rmn", "RM de hipófisis", "clave", "Macroadenoma de 18 mm con extensión supraselar.", "Localiza."),
    study("Otros", "colono", "Colonoscopía y ecocardiograma", "util", "Pólipos; hipertrofia.", "Complicaciones."),
    study("Laboratorio", "gh-basal", "Solo una GH basal al azar", "riesgoso", "No se realizó.", "Es pulsátil e inespecífica."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("acromegalia", "Acromegalia por macroadenoma hipofisario productor de GH", true, "Cambios acrales, IGF-1 alta, GH no suprimida y macroadenoma."),
      dx("prolactinoma", "Prolactinoma", false, "La IGF-1 y GH explican."),
      dx("hipotiroidismo", "Hipotiroidismo", false, "No da crecimiento acral."),
      dx("obesidad", "Obesidad", false, "Cambios óseos."),
      dx("cushing", "Cushing", false, "Sin estrías ni cortisol alto."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cirugia", "Cirugía transesfenoidal", "clave", "Primera línea."),
      mg("medico", "Análogos de somatostatina si persiste", "clave", "Control hormonal."),
      mg("comorbilidades", "Tratar diabetes, HTA y apnea", "clave", "Reducen mortalidad."),
      mg("eje", "Evaluar el resto de la hipófisis", "util", "Déficit asociados."),
      mg("manejo", "Seguir manejando profesionalmente con hemianopsia", "riesgoso", "Campos visuales."),
      mg("sin-tto", "Solo controlar porque es benigno", "riesgoso", "Mortalidad aumentada."),
    ],
  },
  debrief: {
    diagnosis: "Acromegalia por macroadenoma hipofisario productor de GH con hemianopsia bitemporal, diabetes, HTA y apnea, en varón de 47 años.",
    pathologies: [
      { name: "Acromegalia", role: "principal", why: "Exceso de GH." },
      { name: "Diabetes, HTA, apnea", role: "asociada", why: "Comorbilidades." },
      { name: "Prolactinoma, Cushing", role: "diferencial", why: "Otros adenomas." },
    ],
    reasoning: [
      "Causa: adenoma de somatotropos.",
      "Mecanismo: GH estimula IGF-1 hepática.",
      "Consecuencia: crecimiento de tejidos, resistencia a la insulina y cardiopatía.",
    ],
    epidemiology:
      "Es rara y se diagnostica con 7 a 10 años de demora. Comparar fotos antiguas ayuda. La mortalidad aumenta por causas cardiovasculares y respiratorias, y se normaliza si se controla la IGF-1.",
    management: [
      "IGF-1.",
      "Prueba de supresión.",
      "RM.",
      "Cirugía y comorbilidades.",
    ],
    sources: ["Sociedad Argentina de Endocrinología y Metabolismo — Acromegalia.", "Endocrine Society — Acromegaly Clinical Practice Guideline."],
    pearls: ["Anillos y zapatos.", "IGF-1 primero.", "Hemianopsia bitemporal."],
    pitfalls: ["GH al azar.", "No buscar comorbilidades."],
    tribunal: [
      qa("¿Qué es el gigantismo?", "Exceso de GH antes del cierre de cartílagos de crecimiento, con talla muy alta."),
      qa("¿Qué complicación cardíaca tiene?", "Miocardiopatía hipertrófica con insuficiencia cardíaca y arritmias."),
      qa("¿Por qué pedir colonoscopía?", "Tiene más riesgo de pólipos y cáncer de colon."),
    ],
  },
};
