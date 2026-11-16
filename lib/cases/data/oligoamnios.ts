import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const oligoamnios: ClinicalCase = {
  id: "oligoamnios",
  level: 3,
  area: "Ginecología y obstetricia",
  setting: "Consultorio",
  patient: { age: 33, ageUnit: "años", sex: "F", context: "Embarazo de 37 semanas, segundo hijo. Hipertensión crónica con labetalol." },
  frequency: "frecuente",
  intro: "“En la ecografía me dijeron que tengo poco líquido. ¿El bebé está bien?”",
  vitals: { TA: "138/88 mmHg", FC: "80 lpm", "T°": "36,5 °C" },
  anamnesis: [
    act("perdida", "¿Perdió líquido por la vagina?", "clave", "“No, nada.”", "Descartar rotura de membranas: es la causa más común."),
    act("movimientos", "¿Siente moverse al bebé?", "clave", "“Menos que antes.”", "Disminución de movimientos: posible compromiso fetal."),
    act("presion", "¿Cómo viene la presión?", "clave", "“Algo más alta estos días.”", "HTA: insuficiencia placentaria."),
    act("medicamentos", "¿Toma enalapril o antiinflamatorios?", "clave", "“No, solo labetalol.”", "IECA y AINE causan oligoamnios."),
    act("ecos-previas", "¿Cómo dieron las ecografías anteriores?", "util", "“La de 32 semanas dijo que el bebé era chico.”", "Restricción del crecimiento."),
    act("nombre", "¿Ya eligieron el nombre?", "neutro", "“Valentina.”", "No orienta."),
  ],
  exam: [
    act("au", "Altura uterina", "clave", "31 cm a las 37 semanas.", "Menor de lo esperado."),
    act("especuloscopia", "Especuloscopía", "clave", "Sin salida de líquido, test de cristalización negativo.", "Membranas íntegras."),
    act("ta", "Presión repetida y edemas", "util", "136/88, sin edemas, sin cefalea.", "Sin preeclampsia grave."),
  ],
  studies: [
    study("Imágenes", "eco", "Ecografía con índice de líquido amniótico y biometría", "clave", "ILA 4 cm (bolsillo mayor 1,8 cm); peso fetal estimado percentil 4.", "Oligoamnios con RCIU."),
    study("Imágenes", "doppler", "Doppler fetal (umbilical y cerebral media)", "clave", "Índice de pulsatilidad umbilical aumentado, cerebral media disminuida.", "Redistribución: insuficiencia placentaria."),
    study("Otros", "monitoreo", "Monitoreo fetal anteparto", "clave", "Reactivo.", "Bienestar fetal actual."),
    study("Laboratorio", "lab-pe", "Laboratorio de preeclampsia y proteinuria", "util", "Normal, sin proteinuria.", "HTA crónica sin preeclampsia agregada."),
    study("Otros", "amniocentesis", "Amniocentesis", "riesgoso", "No se hizo.", "Sin indicación y con riesgo."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("oligo-rciu", "Oligoamnios por insuficiencia placentaria con restricción del crecimiento fetal, embarazo de término", true, "ILA 4 cm con membranas íntegras, peso fetal percentil 4, Doppler alterado e HTA crónica."),
      dx("rpm", "Rotura prematura de membranas", false, "Especuloscopía y cristalización negativas."),
      dx("malformacion-renal", "Agenesia renal fetal", false, "Sería grave y precoz; la biometría y el Doppler apuntan a placenta."),
      dx("normal", "Embarazo normal con feto constitucionalmente pequeño", false, "El Doppler alterado indica insuficiencia placentaria."),
      dx("postermino", "Embarazo postérmino", false, "Tiene 37 semanas."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("terminar", "Finalizar el embarazo a las 37 semanas", "clave", "A término con oligoamnios y RCIU, el beneficio está en terminar."),
      mg("induccion", "Inducción con monitoreo continuo; cesárea por indicación obstétrica", "clave", "La vía vaginal es posible con vigilancia."),
      mg("neonatologia", "Aviso a neonatología", "clave", "Recién nacido pequeño."),
      mg("presion", "Mantener control de la presión", "util", "HTA crónica."),
      mg("hidratar", "Solo hidratación oral y control en 2 semanas", "riesgoso", "Retrasar la finalización aumenta el riesgo de muerte fetal."),
      mg("cesarea-siempre", "Cesárea programada por el oligoamnios", "innecesario", "No es indicación de cesárea por sí solo."),
    ],
  },
  debrief: {
    diagnosis: "Oligoamnios con restricción del crecimiento fetal por insuficiencia placentaria, en una embarazada de 37 semanas con hipertensión crónica.",
    pathologies: [
      { name: "Oligoamnios", role: "principal", why: "Menos orina fetal por redistribución del flujo." },
      { name: "Restricción del crecimiento fetal", role: "asociada", why: "Insuficiencia placentaria." },
      { name: "Rotura prematura de membranas", role: "diferencial", why: "Primera causa a descartar." },
    ],
    reasoning: [
      "Causa: insuficiencia placentaria por hipertensión crónica.",
      "Mecanismo: el feto redistribuye el flujo hacia el cerebro y reduce la perfusión renal, y orina menos.",
      "Consecuencia: compresión del cordón, hipoxia y riesgo de muerte fetal.",
    ],
    epidemiology:
      "El oligoamnios complica cerca del 4 % de los embarazos y es más frecuente al término y postérmino. Sus causas principales son la rotura de membranas, la insuficiencia placentaria, fármacos (IECA, AINE) y malformaciones renales.",
    management: [
      "Descartar rotura de membranas.",
      "Biometría, ILA y Doppler.",
      "Monitoreo.",
      "Finalizar si es de término o hay compromiso.",
    ],
    sources: ["FASGO — Consenso de restricción del crecimiento fetal.", "Ministerio de Salud de la Nación — Guía para la atención del parto normal."],
    pearls: ["ILA menor de 5 o bolsillo menor de 2 cm.", "Primero, ¿rompió bolsa?", "Oligoamnios + RCIU a término: terminar."],
    pitfalls: ["Hidratar y esperar.", "No preguntar por IECA o AINE."],
    tribunal: [
      qa("¿Cómo se define el oligoamnios?", "Un índice de líquido amniótico menor de 5 cm o un bolsillo mayor vertical menor de 2 cm."),
      qa("¿Qué fármacos causan oligoamnios?", "Los IECA, los ARA II y los AINE, que reducen la perfusión renal fetal."),
      qa("¿Qué consecuencias tiene el oligoamnios prolongado en el segundo trimestre?", "Hipoplasia pulmonar, deformidades de miembros y facies de Potter."),
    ],
  },
};
