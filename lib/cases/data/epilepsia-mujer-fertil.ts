import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const epilepsiaMujerFertil: ClinicalCase = {
  id: "epilepsia-mujer-edad-fertil",
  level: 2,
  area: "Neurología",
  setting: "Consultorio",
  patient: { age: 25, ageUnit: "años", sex: "F", context: "Epilepsia generalizada desde los 15 años, con ácido valproico. Quiere buscar un embarazo." },
  frequency: "frecuente",
  intro: "“Tomo valproato hace años. Hace 2 años no tengo convulsiones. Con mi pareja queremos un bebé y no sé si puedo seguir igual.”",
  vitals: { TA: "112/70 mmHg", FC: "72 lpm", "T°": "36,4 °C", Peso: "62 kg", Glucemia: "88 mg/dl" },
  anamnesis: [
    act("embarazo", "¿Usás algún método ahora? ¿Podrías estar embarazada?", "clave", "“Preservativo, a veces. Test negativo.”", "Embarazos no planificados son frecuentes y el valproato es muy teratogénico."),
    act("crisis", "¿Cómo eran tus crisis? ¿Última?", "clave", "“Tónico-clónicas y sacudidas; hace 2 años.”", "Tipo de crisis: define alternativas."),
    act("farmacos", "¿Qué tomás? ¿Ácido fólico?", "clave", "“Valproato 1.000 mg, sin fólico.”", "Dosis alta, sin suplementos."),
    act("gatillos", "¿Sueño, alcohol, olvidos?", "util", "“Si duermo poco, tengo sacudidas.”", "Desencadenantes."),
    act("efectos", "¿Aumentaste de peso? ¿Ciclos irregulares?", "util", "“Sí.”", "Efectos del valproato, SOP."),
    act("pareja", "¿Hace cuánto están juntos?", "neutro", "“Cinco años.”", "No orienta."),
  ],
  exam: [
    act("neuro", "Examen neurológico", "clave", "Normal.", "Sin lesión focal."),
    act("general", "Peso, temblor, piel, encías", "util", "Temblor fino; IMC 26.", "Efectos adversos."),
    act("ginecologico", "Consulta ginecológica", "util", "Sin alteraciones.", "Preconcepcional."),
  ],
  studies: [
    study("Otros", "eeg", "EEG y reevaluación del tipo de epilepsia por neurología", "clave", "Punta-onda generalizada.", "Guía el cambio."),
    study("Laboratorio", "lab", "Hemograma, hepatograma, niveles, beta-hCG", "clave", "Normales.", "Base."),
    study("Imágenes", "rmn", "RM de encéfalo si no se hizo", "util", "Normal.", "Excluye lesión."),
    study("Imágenes", "pet", "PET de encéfalo", "innecesario", "No se realizó.", "No aporta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("epilepsia", "Epilepsia generalizada controlada, en mujer con planificación de embarazo bajo tratamiento con valproato", true, "Crisis generalizadas controladas, valproato y deseo de embarazo."),
      dx("focal", "Epilepsia focal", false, "Las crisis y el EEG son generalizados."),
      dx("psicogena", "Crisis no epilépticas", false, "EEG con punta-onda."),
      dx("eclampsia", "Eclampsia", false, "No está embarazada."),
      dx("sincope", "Síncope", false, "No explica las crisis tónico-clónicas."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cambio", "Planificar con neurología el cambio gradual a lamotrigina o levetiracetam antes del embarazo", "clave", "Menor riesgo de malformaciones y neurodesarrollo."),
      mg("anticoncepcion", "Anticoncepción eficaz hasta lograr el cambio", "clave", "Evita exposición al valproato."),
      mg("folico", "Ácido fólico preconcepcional", "clave", "Prevención de defectos de tubo neural."),
      mg("no-suspender", "No suspender bruscamente", "clave", "Riesgo de status."),
      mg("embarazar", "Seguir con valproato y buscar embarazo", "riesgoso", "Riesgo alto de malformaciones y deterioro cognitivo."),
      mg("niveles", "Control de niveles de lamotrigina durante el embarazo", "util", "Disminuyen con el embarazo."),
    ],
  },
  debrief: {
    diagnosis: "Epilepsia generalizada controlada con valproato, con deseo de embarazo, en mujer de 25 años.",
    pathologies: [
      { name: "Epilepsia generalizada", role: "principal", why: "Base de la consulta." },
      { name: "Riesgo teratogénico por valproato", role: "asociada", why: "Principal problema." },
      { name: "Crisis no epilépticas, síncope", role: "diferencial", why: "Se excluyen." },
    ],
    reasoning: [
      "Causa: predisposición genética.",
      "Mecanismo: descargas corticotalámicas generalizadas.",
      "Consecuencia: crisis; el valproato daña la organogénesis y el neurodesarrollo.",
    ],
    epidemiology:
      "Cerca de 1 de cada 100 personas tiene epilepsia, y muchas son mujeres en edad fértil. El valproato tiene la mayor tasa de malformaciones entre los antiepilépticos, además de menor coeficiente intelectual en hijos expuestos. Por eso se evita salvo que no haya alternativa.",
    management: [
      "Revisar fármaco antes del embarazo.",
      "Cambio gradual.",
      "Ácido fólico.",
      "Seguimiento conjunto.",
    ],
    sources: ["Sociedad Neurológica Argentina — Recomendaciones de epilepsia y embarazo.", "ILAE — Guías de epilepsia en mujeres."],
    pearls: ["Toda mujer con valproato: consejería.", "Planificá antes de la concepción.", "No suspender de golpe."],
    pitfalls: ["Suspender bruscamente al enterarse del embarazo.", "No dar ácido fólico."],
    tribunal: [
      qa("¿Qué malformaciones da el valproato?", "Defectos del tubo neural, cardíacas, faciales, y menor coeficiente intelectual y autismo."),
      qa("¿Qué antiepilépticos interactúan con anticonceptivos?", "Inductores como carbamazepina, fenitoína y fenobarbital reducen su efecto; los estrógenos reducen la lamotrigina."),
      qa("¿Cuándo se considera epilepsia?", "Dos crisis no provocadas separadas por más de 24 horas, una crisis con riesgo alto de recurrencia, o un síndrome epiléptico."),
    ],
  },
};
