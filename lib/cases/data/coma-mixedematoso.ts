import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const comaMixedematoso: ClinicalCase = {
  id: "hipotiroidismo-coma-mixedematoso",
  level: 4,
  area: "Endocrinología",
  setting: "Guardia",
  patient: { age: 78, ageUnit: "años", sex: "F", context: "Hipotiroidea, dejó la levotiroxina hace meses. Julio, vive sola. Tiene una neumonía." },
  frequency: "raro",
  intro: "“La encontramos muy dormida, fría, hinchada y casi no contesta.” (relata un vecino)",
  vitals: { TA: "88/56 mmHg", FC: "46 lpm", FR: "10 rpm", "T°": "34,2 °C", "SatO₂": "88 %", Glucemia: "58 mg/dl", Glasgow: "9/15" },
  anamnesis: [
    act("medicacion", "¿Toma levotiroxina?", "clave", "“La dejó hace meses.”", "Causa."),
    act("gatillo", "¿Infección, frío, sedantes?", "clave", "“Tos con fiebre, hace frío en la casa.”", "Desencadenantes."),
    act("sedantes", "¿Benzodiacepinas?", "clave", "“Clonazepam.”", "Agravante."),
    act("cirugia", "¿Cirugía de tiroides o yodo?", "util", "“No.”", "Causa."),
    act("cortisol", "¿Corticoides?", "util", "“No.”", "Suprarrenal."),
    act("barrio", "¿Dónde vive?", "neutro", "“En un pueblo.”", "No orienta."),
  ],
  exam: [
    act("neuro", "Conciencia y reflejos", "clave", "Estupor; reflejos lentos.", "Mixedema."),
    act("piel", "Piel y cara", "clave", "Piel fría, seca; edema facial sin fóvea.", "Mixedema."),
    act("pulmon", "Pulmón", "util", "Crepitantes derechos.", "Neumonía."),
  ],
  studies: [
    study("Laboratorio", "tsh", "TSH, T4 libre y cortisol antes de tratar", "clave", "TSH 86; T4 libre muy baja.", "Confirma."),
    study("Laboratorio", "lab", "Sodio, glucemia, gases, CK", "clave", "Na 124; pCO₂ 62.", "Complicaciones."),
    study("Imágenes", "rx", "Radiografía de tórax y cultivos", "clave", "Consolidación derecha.", "Gatillo."),
    study("Otros", "esperar-labs", "Esperar resultados para tratar", "riesgoso", "No se realizó.", "Alta mortalidad."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("mixedema", "Coma mixedematoso desencadenado por neumonía, frío y benzodiacepinas", true, "Hipotiroidismo sin tratamiento, hipotermia, bradicardia, hiponatremia, hipercapnia y estupor."),
      dx("sepsis", "Sepsis aislada", false, "No explica todo."),
      dx("acv", "ACV", false, "Sin foco."),
      dx("hipoglucemia", "Hipoglucemia aislada", false, "Es parte del cuadro."),
      dx("hipotermia", "Hipotermia ambiental", false, "Hay hipotiroidismo grave."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("hidrocortisona", "Hidrocortisona EV antes de la hormona tiroidea", "clave", "Posible insuficiencia suprarrenal."),
      mg("t4", "Levotiroxina EV", "clave", "Tratamiento."),
      mg("soporte", "UTI, ventilación, calentamiento pasivo, glucosa", "clave", "Soporte."),
      mg("atb", "Antibióticos por la neumonía", "clave", "Gatillo."),
      mg("calentar-activo", "Calentamiento activo agresivo", "riesgoso", "Vasodilatación y shock."),
      mg("sedantes", "Seguir con clonazepam", "riesgoso", "Empeora."),
    ],
  },
  debrief: {
    diagnosis: "Coma mixedematoso por hipotiroidismo sin tratamiento, desencadenado por neumonía, frío y benzodiacepinas, en mujer de 78 años.",
    pathologies: [
      { name: "Coma mixedematoso", role: "principal", why: "Hipotiroidismo extremo." },
      { name: "Neumonía", role: "asociada", why: "Gatillo." },
      { name: "Sepsis, ACV", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: hipotiroidismo grave no tratado.",
      "Mecanismo: metabolismo muy reducido y respuesta inadecuada al estrés.",
      "Consecuencia: hipotermia, hipoventilación, hiponatremia, coma.",
    ],
    epidemiology:
      "Es raro, pero con mortalidad alta. Afecta a mujeres mayores en invierno, con infección o sedantes. Se trata empíricamente sin esperar laboratorio.",
    management: [
      "Sospechar.",
      "Hidrocortisona.",
      "Levotiroxina EV.",
      "Soporte y gatillo.",
    ],
    sources: ["Sociedad Argentina de Endocrinología y Metabolismo — Emergencias tiroideas.", "American Thyroid Association — Hypothyroidism Guidelines."],
    pearls: ["Mayor, frío, sin levotiroxina.", "Hidrocortisona primero.", "No esperar."],
    pitfalls: ["Calentar activamente.", "Sedantes."],
    tribunal: [
      qa("¿Por qué hidrocortisona primero?", "Puede haber insuficiencia suprarrenal, y la hormona tiroidea aumenta el consumo de cortisol."),
      qa("¿Qué alteraciones de laboratorio da?", "Hiponatremia, hipoglucemia, hipercapnia y CK elevada."),
      qa("¿Qué es la tormenta tiroidea?", "Tirotoxicosis grave con fiebre, taquicardia y alteración mental."),
    ],
  },
};
