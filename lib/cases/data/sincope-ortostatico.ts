import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const sincopeOrtostatico: ClinicalCase = {
  id: "sincope-hipotension-ortostatica-adulto-mayor",
  level: 2,
  area: "Cardiovascular",
  setting: "Guardia",
  patient: { age: 79, ageUnit: "años", sex: "M", context: "Hipertenso y con hiperplasia prostática. Hace dos semanas le agregaron tamsulosina. Parkinson leve." },
  frequency: "muy-frecuente",
  intro: "“Me levanté de la cama a orinar y me desmayé. Fue un ratito y me recuperé solo.”",
  vitals: { TA: "138/78 mmHg", FC: "76 lpm", FR: "16 rpm", "T°": "36,4 °C", "SatO₂": "96 %", Glucemia: "112 mg/dl" },
  anamnesis: [
    act("contexto", "¿Qué estaba haciendo?", "clave", "“Me levanté rápido.”", "Ortostatismo."),
    act("farmacos", "¿Medicación nueva?", "clave", "“Tamsulosina y enalapril.”", "Causa."),
    act("alarma", "¿Palpitaciones, dolor de pecho, desmayo haciendo esfuerzo o acostado?", "clave", "“No.”", "Síncope cardíaco."),
    act("hidratacion", "¿Toma líquido?", "util", "“Poco, para no levantarme.”", "Deshidratación."),
    act("trauma", "¿Se golpeó?", "util", "“La cadera, poco.”", "Lesiones."),
    act("club", "¿Juega a algo?", "neutro", "“A las cartas.”", "No orienta."),
  ],
  exam: [
    act("ortostatica", "Presión acostado y de pie", "clave", "138/78 acostado; 104/62 a los 3 minutos de pie, con mareo.", "Hipotensión ortostática."),
    act("cardiaco", "Soplos y pulso", "clave", "Sin soplos, ritmo regular.", "Excluye estenosis aórtica."),
    act("neuro", "Examen neurológico", "util", "Temblor de reposo, sin foco.", "Parkinson."),
  ],
  studies: [
    study("Electrofisiología", "ecg", "ECG", "clave", "Ritmo sinusal, sin bloqueos.", "Excluye arritmias."),
    study("Laboratorio", "lab", "Hemograma, ionograma, función renal, glucemia", "clave", "Urea algo alta.", "Hipovolemia."),
    study("Imágenes", "eco", "Ecocardiograma si hay soplo", "util", "No requirió.", "Estructural."),
    study("Imágenes", "tc", "TC de cerebro de rutina", "innecesario", "No se realizó.", "Sin foco ni trauma de cráneo."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("ortostatico", "Síncope por hipotensión ortostática por fármacos, deshidratación y Parkinson", true, "Al pararse, con caída de presión, tamsulosina y poco líquido."),
      dx("arritmia", "Síncope arrítmico", false, "ECG normal, sin alarma."),
      dx("ea", "Estenosis aórtica", false, "Sin soplo."),
      dx("acv", "AIT", false, "No hay foco."),
      dx("convulsion", "Convulsión", false, "Recuperación rápida."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("farmacos", "Revisar tamsulosina y antihipertensivos", "clave", "Causa principal."),
      mg("liquidos", "Hidratación y levantarse lentamente", "clave", "Prevención."),
      mg("caidas", "Prevenir caídas: luz de noche, papagayo", "clave", "Seguridad."),
      mg("medias", "Medias de compresión", "util", "Coadyuvante."),
      mg("marcapaso", "Marcapasos", "riesgoso", "Sin indicación."),
      mg("mas-antihipertensivos", "Agregar más antihipertensivos", "riesgoso", "Empeora."),
    ],
  },
  debrief: {
    diagnosis: "Síncope por hipotensión ortostática por alfabloqueante, IECA, baja ingesta de líquidos y Parkinson, en varón de 79 años.",
    pathologies: [
      { name: "Hipotensión ortostática", role: "principal", why: "Caída de presión al pararse." },
      { name: "Polifarmacia y Parkinson", role: "asociada", why: "Factores." },
      { name: "Arritmia, estenosis aórtica, AIT", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: fármacos vasodilatadores con poca volemia y disautonomía.",
      "Mecanismo: el reflejo barorreceptor falla al ponerse de pie.",
      "Consecuencia: hipoperfusión cerebral y caídas.",
    ],
    epidemiology:
      "Es una causa frecuente de síncope y caídas en mayores, sobre todo con polifarmacia. Los alfabloqueantes para la próstata, los diuréticos y los antiparkinsonianos son responsables comunes. Revisar la medicación es la primera intervención.",
    management: [
      "Presión ortostática.",
      "ECG.",
      "Revisar fármacos.",
      "Prevenir caídas.",
    ],
    sources: ["Sociedad Argentina de Cardiología — Consenso de síncope.", "ESC — Guidelines for the Diagnosis and Management of Syncope."],
    pearls: ["Medir de pie a los 3 minutos.", "Revisar fármacos.", "ECG siempre."],
    pitfalls: ["No medir ortostática.", "Agregar más fármacos."],
    tribunal: [
      qa("¿Qué define hipotensión ortostática?", "Caída de 20 mmHg sistólica o 10 mmHg diastólica a los 3 minutos de pie."),
      qa("¿Qué síncopes son de alto riesgo?", "Con esfuerzo, acostado, con palpitaciones, cardiopatía, ECG anormal o antecedentes de muerte súbita."),
      qa("¿Qué tipos de síncope existen?", "Reflejo, ortostático y cardíaco."),
    ],
  },
};
