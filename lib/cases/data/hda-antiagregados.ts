import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hdaAntiagregados: ClinicalCase = {
  id: "hda-antiagregados",
  level: 3,
  area: "Gastroenterología",
  setting: "Guardia",
  patient: { age: 70, ageUnit: "años", sex: "M", context: "Le pusieron un stent coronario hace 4 meses. Toma aspirina y clopidogrel. No toma omeprazol." },
  frequency: "frecuente",
  intro: "“Hago caca negra desde ayer y hoy me mareé al levantarme.”",
  vitals: { TA: "100/62 mmHg", FC: "112 lpm", FR: "20 rpm", "SatO₂": "96 %" },
  anamnesis: [
    act("melena", "¿Cómo es la caca?", "clave", "“Negra como brea, pegajosa y con olor fuerte.”", "Melena: sangrado digestivo alto."),
    act("medicacion", "¿Qué toma?", "clave", "“Aspirina y clopidogrel por el stent.”", "Doble antiagregación sin protección gástrica."),
    act("stent", "¿Cuándo le pusieron el stent y de qué tipo?", "clave", "“Hace 4 meses, liberador de drogas.”", "Riesgo de trombosis del stent si se suspende todo."),
    act("dolor-pecho", "¿Dolor de pecho?", "clave", "“No.”", "La anemia puede dar isquemia."),
    act("alcohol", "¿Toma alcohol o tiene problemas de hígado?", "util", "“Muy poco.”", "Descarta várices."),
    act("perro", "¿Tiene perro?", "neutro", "“Un caniche.”", "No orienta."),
  ],
  exam: [
    act("tacto", "Tacto rectal", "clave", "Melena en el dedo de guante.", "Confirma."),
    act("perfusion", "Perfusión y ortostatismo", "clave", "Palidez, frialdad, ortostatismo positivo.", "Pérdida significativa."),
    act("estigmas", "Estigmas de hepatopatía", "util", "No hay.", "Sangrado no variceal."),
  ],
  studies: [
    study("Laboratorio", "hemograma", "Hemograma, urea, coagulación, grupo y factor", "clave", "Hb 7,6 g/dl (previa 13), urea 78 mg/dl.", "Sangrado alto importante; urea alta."),
    study("Electrofisiología", "ecg", "ECG y troponina", "clave", "Infradesnivel difuso leve; troponina levemente elevada.", "Isquemia por anemia."),
    study("Otros", "endoscopia", "Endoscopía alta en menos de 24 horas", "clave", "Úlcera duodenal de 1 cm con vaso visible (Forrest IIa).", "Diagnóstica y terapéutica."),
    study("Laboratorio", "hp", "Biopsia para H. pylori", "util", "Positiva.", "Erradicar."),
    study("Imágenes", "tac", "TC de abdomen", "innecesario", "No se pidió.", "La endoscopía es el estudio."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hda-ulcera-daat", "Hemorragia digestiva alta por úlcera duodenal (Forrest IIa) en paciente con doble antiagregación y H. pylori", true, "Melena con inestabilidad, doble antiagregación sin IBP, úlcera con vaso visible y H. pylori positivo."),
      dx("variceal", "Hemorragia variceal", false, "Sin hepatopatía y úlcera en la endoscopía."),
      dx("hdb", "Hemorragia digestiva baja", false, "Melena y urea alta: alto."),
      dx("mallory-weiss", "Mallory-Weiss", false, "Sin vómitos previos."),
      dx("cancer", "Cáncer gástrico", false, "Úlcera duodenal benigna."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("reanimar", "Dos vías, cristaloides y transfundir con Hb menor de 8 en coronario", "clave", "Umbral más alto por isquemia."),
      mg("ibp", "Omeprazol endovenoso en bolo e infusión", "clave", "Reduce resangrado tras la terapia endoscópica."),
      mg("endoscopia-terapeutica", "Terapia endoscópica dual (adrenalina + clips o térmica)", "clave", "Vaso visible: alto riesgo de resangrado."),
      mg("aspirina-seguir", "Mantener la aspirina y suspender transitoriamente el clopidogrel, consensuando con cardiología", "clave", "Equilibrio entre sangrado y trombosis del stent."),
      mg("erradicar", "Erradicar H. pylori y dejar IBP mientras siga antiagregado", "util", "Prevención."),
      mg("suspender-todo", "Suspender ambos antiagregantes por un mes", "riesgoso", "Alto riesgo de trombosis del stent."),
      mg("transfundir-a-10", "Transfundir para llegar a 12 g/dl", "riesgoso", "Sobretransfusión: más resangrado y sobrecarga."),
    ],
  },
  debrief: {
    diagnosis: "Hemorragia digestiva alta por úlcera duodenal Forrest IIa con H. pylori, en un hombre de 70 años con doble antiagregación por stent coronario.",
    pathologies: [
      { name: "Úlcera duodenal sangrante", role: "principal", why: "Sangrado con vaso visible." },
      { name: "Doble antiagregación sin IBP y H. pylori", role: "asociada", why: "Factores de riesgo." },
      { name: "Isquemia miocárdica por anemia", role: "asociada", why: "Demanda." },
    ],
    reasoning: [
      "Causa: H. pylori más antiagregantes que dañan la mucosa y alteran la hemostasia.",
      "Mecanismo: úlcera que erosiona un vaso.",
      "Consecuencia: sangrado con hipovolemia e isquemia coronaria.",
    ],
    epidemiology:
      "La doble antiagregación aumenta 2 a 3 veces el riesgo de sangrado digestivo alto, sobre todo en mayores de 65, con antecedentes de úlcera o H. pylori. Las guías recomiendan IBP en todos los que reciben doble antiagregación con riesgo digestivo.",
    management: [
      "Reanimación y Glasgow-Blatchford.",
      "IBP y endoscopía en 24 horas.",
      "Decisión conjunta sobre antiagregantes.",
      "Erradicación y gastroprotección.",
    ],
    sources: ["Sociedad Argentina de Gastroenterología — Hemorragia digestiva alta no variceal.", "ESGE — Nonvariceal upper gastrointestinal hemorrhage guideline."],
    pearls: ["Doble antiagregado: IBP siempre.", "No suspender la aspirina con stent reciente.", "Coronario: transfundir con menos de 8."],
    pitfalls: ["Suspender todo.", "Sobretransfundir."],
    tribunal: [
      qa("¿Qué es la clasificación de Forrest?", "Clasifica el aspecto endoscópico de la úlcera: Ia chorro, Ib babeo, IIa vaso visible, IIb coágulo, IIc mancha plana, III base limpia."),
      qa("¿Qué es el score de Glasgow-Blatchford?", "Un puntaje con urea, hemoglobina, presión, pulso, melena, síncope, hepatopatía y falla cardíaca que predice necesidad de intervención."),
      qa("¿Por qué la urea aumenta en la hemorragia digestiva alta?", "Por la digestión y absorción de la sangre en el intestino y la hipovolemia."),
    ],
  },
};
