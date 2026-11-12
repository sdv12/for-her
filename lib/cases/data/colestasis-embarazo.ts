import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const colestasisEmbarazo: ClinicalCase = {
  id: "colestasis-intrahepatica-embarazo",
  level: 2,
  area: "Ginecología y obstetricia",
  setting: "Guardia",
  patient: { age: 31, ageUnit: "años", sex: "F", context: "Embarazo de 33 semanas, gemelar. Su madre tuvo picazón en el embarazo." },
  frequency: "frecuente",
  intro: "“Me pica muchísimo, sobre todo las palmas y las plantas, y a la noche no puedo dormir. No tengo manchas.”",
  vitals: { TA: "118/72 mmHg", FC: "86 lpm", "T°": "36,6 °C" },
  anamnesis: [
    act("prurito", "¿Dónde pica y cuándo?", "clave", "“Palmas y plantas, de noche.”", "Típico."),
    act("piel", "¿Manchas o ronchas?", "clave", "“No, solo rascado.”", "Sin dermatosis."),
    act("feto", "¿Mueve el bebé?", "clave", "“Sí.”", "Bienestar."),
    act("presion", "¿Cefalea o visión?", "util", "“No.”", "Preeclampsia."),
    act("hepatitis", "¿Riesgos de hepatitis?", "util", "“No.”", "Diferencial."),
    act("nombres", "¿Ya pensaron los nombres?", "neutro", "“Sí.”", "No orienta."),
  ],
  exam: [
    act("piel-ex", "Piel", "clave", "Excoriaciones sin lesiones primarias.", "Prurito sin rash."),
    act("ictericia", "Ictericia", "clave", "Leve.", "Colestasis."),
    act("obstetrico", "Obstétrico", "util", "Normal.", "Base."),
  ],
  studies: [
    study("Laboratorio", "acidos", "Ácidos biliares séricos", "clave", "62 µmol/l.", "Confirma y estratifica."),
    study("Laboratorio", "hepatograma", "Hepatograma", "clave", "Transaminasas levemente elevadas.", "Apoya."),
    study("Laboratorio", "excluir", "Serologías de hepatitis, ecografía, plaquetas y presión", "clave", "Normales.", "Excluye."),
    study("Otros", "fetal", "Monitoreo fetal", "util", "Normal.", "Vigilancia."),
    study("Otros", "antihistaminicos", "Solo antihistamínicos y alta sin laboratorio", "riesgoso", "No se realizó.", "Riesgo fetal."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("cie", "Colestasis intrahepática del embarazo", true, "Prurito palmoplantar nocturno sin rash, en tercer trimestre, con ácidos biliares altos."),
      dx("hellp", "HELLP", false, "Presión y plaquetas normales."),
      dx("higado-graso", "Hígado graso agudo", false, "Sin insuficiencia hepática."),
      dx("penfigoide", "Penfigoide gestacional", false, "Sin ampollas."),
      dx("hepatitis", "Hepatitis viral", false, "Serologías negativas."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("udca", "Ácido ursodesoxicólico", "clave", "Alivia el prurito."),
      mg("monitoreo", "Controles de ácidos biliares y vigilancia fetal", "clave", "Riesgo."),
      mg("parto", "Planificar el nacimiento según ácidos biliares, en general hacia las 36 a 37 semanas", "clave", "Riesgo de muerte fetal."),
      mg("vitamina-k", "Vitamina K si hay esteatorrea", "util", "Coagulación."),
      mg("esperar-41", "Esperar a las 41 semanas", "riesgoso", "Riesgo fetal."),
      mg("corticoides-cremas", "Corticoides tópicos potentes como tratamiento", "riesgoso", "No trata la causa."),
    ],
  },
  debrief: {
    diagnosis: "Colestasis intrahepática del embarazo con ácidos biliares de 62 µmol/l, en embarazo gemelar de 33 semanas.",
    pathologies: [
      { name: "Colestasis intrahepática del embarazo", role: "principal", why: "Hepatopatía del embarazo." },
      { name: "Riesgo fetal", role: "asociada", why: "Muerte fetal y parto prematuro." },
      { name: "HELLP, hígado graso", role: "diferencial", why: "Otras hepatopatías." },
    ],
    reasoning: [
      "Causa: hormonas y predisposición genética.",
      "Mecanismo: alteración del transporte de ácidos biliares.",
      "Consecuencia: prurito materno y riesgo fetal.",
    ],
    epidemiology:
      "Es la hepatopatía más frecuente del embarazo; tiene variación geográfica, con alta prevalencia en Chile y Bolivia. Es más común en embarazos múltiples. Con ácidos biliares mayores de 100 µmol/l aumenta el riesgo de muerte fetal.",
    management: [
      "Prurito sin rash: ácidos biliares.",
      "Excluir otras causas.",
      "Ursodiol.",
      "Planificar el nacimiento.",
    ],
    sources: ["FASGO — Colestasis intrahepática del embarazo.", "Royal College of Obstetricians and Gynaecologists — Intrahepatic Cholestasis of Pregnancy."],
    pearls: ["Prurito palmoplantar nocturno.", "Ácidos biliares.", "Recurre en embarazos siguientes."],
    pitfalls: ["Antihistamínicos y alta.", "No vigilar al feto."],
    tribunal: [
      qa("¿Qué hepatopatías son propias del embarazo?", "Hiperemesis, colestasis intrahepática, preeclampsia y HELLP, e hígado graso agudo."),
      qa("¿Qué riesgo tiene en embarazos siguientes?", "Recurre con frecuencia, también con anticonceptivos con estrógenos."),
      qa("¿Qué diferencia el hígado graso agudo?", "Insuficiencia hepática con hipoglucemia, coagulopatía y encefalopatía en el tercer trimestre."),
    ],
  },
};
