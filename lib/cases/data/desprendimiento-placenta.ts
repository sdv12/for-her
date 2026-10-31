import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const desprendimientoPlacenta: ClinicalCase = {
  id: "desprendimiento-placenta",
  level: 4,
  area: "Ginecología y obstetricia",
  setting: "Guardia",
  patient: { age: 35, ageUnit: "años", sex: "F", context: "Embarazo de 34 semanas con hipertensión. Pocos controles." },
  frequency: "poco-frecuente",
  intro: "“Me empezó un dolor muy fuerte en la panza, que no se va, la tengo dura como una piedra. Perdí un poco de sangre oscura. El bebé se mueve poco.”",
  vitals: { TA: "152/98 mmHg", FC: "118 lpm", FR: "22 rpm", "T°": "36,6 °C" },
  anamnesis: [
    act("dolor", "¿Cómo es el dolor?", "clave", "“Constante, muy fuerte, no se calma entre contracciones.”", "El dolor continuo con útero duro es típico del desprendimiento."),
    act("sangrado", "¿Cuánto y de qué color sangró?", "clave", "“Poco, oscuro.”", "El sangrado externo puede ser escaso y no reflejar la pérdida real (hematoma retroplacentario oculto)."),
    act("movimientos", "¿Cómo se mueve el bebé?", "clave", "“Mucho menos desde hace una hora.”", "Sufrimiento fetal."),
    act("presion", "¿Tuvo presión alta, dolor de cabeza o ve lucecitas?", "util", "“Me dijeron que tenía la presión alta, no tomé nada.”", "Los trastornos hipertensivos del embarazo son el principal factor de riesgo."),
    act("trauma", "¿Tuvo un golpe en la panza o consumió cocaína o fuma?", "clave", "“Fumo, y anoche consumí cocaína.”", "La cocaína y el tabaco son factores de riesgo importantes; se pregunta sin juzgar."),
    act("liquido", "¿Perdió líquido?", "util", "“No.”", "La rotura prolongada de membranas es otro factor."),
    act("nombre", "¿Cómo se va a llamar?", "neutro", "“Lautaro.”", "No orienta."),
  ],
  exam: [
    act("utero", "Palpación uterina", "clave", "Útero hipertónico, leñoso, muy doloroso, que no se relaja; altura mayor que la esperada.", "Útero de Couvelaire en evolución: hematoma retroplacentario."),
    act("fcf", "Frecuencia cardíaca fetal", "clave", "Bradicardia fetal de 95 lpm.", "Sufrimiento fetal agudo: urgencia."),
    act("perfusion", "Perfusión materna", "clave", "Piel fría, relleno capilar 3 s; taquicardia con TA conservada por la hipertensión de base.", "Shock oculto: la hipertensión previa enmascara la hipovolemia."),
    act("encias", "Buscar sangrados en encías o venopunciones", "util", "Sangrado en el sitio de la vía.", "Sugiere coagulopatía (CID)."),
  ],
  studies: [
    study("Laboratorio", "lab", "Hemograma, coagulograma, fibrinógeno, grupo y factor, pruebas cruzadas", "clave", "Hb 9,4, plaquetas 92.000, fibrinógeno 140 mg/dl, RIN 1,5.", "Coagulación intravascular diseminada incipiente: el fibrinógeno bajo predice sangrado grave."),
    study("Imágenes", "eco", "Ecografía obstétrica rápida", "util", "Hematoma retroplacentario; descarta placenta previa.", "Puede no ver el hematoma: el diagnóstico es clínico; no debe demorar la conducta."),
    study("Otros", "monitoreo", "Monitoreo fetal continuo", "clave", "Bradicardia sostenida con desaceleraciones.", "Confirma el sufrimiento fetal."),
    study("Laboratorio", "toxicos", "Tóxicos en orina", "util", "Cocaína positiva.", "Confirma un factor desencadenante."),
    study("Imágenes", "rmn", "Resonancia para confirmar el hematoma", "riesgoso", "No se realizó.", "Demora una cesárea urgente con feto en sufrimiento."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("dppni", "Desprendimiento prematuro de placenta normoinserta grave con sufrimiento fetal y coagulopatía", true, "Dolor continuo, útero hipertónico, sangrado oscuro escaso, bradicardia fetal, hipertensión y cocaína, con fibrinógeno bajo."),
      dx("placenta-previa", "Placenta previa", false, "Sangrado rojo indoloro con útero blando; la ecografía la descarta."),
      dx("rotura", "Rotura uterina", false, "Dolor brusco con cese de contracciones, partes fetales palpables, en general con cicatriz uterina y trabajo de parto."),
      dx("trabajo", "Trabajo de parto pretérmino", false, "Contracciones con relajación entre ellas, sin útero leñoso ni sufrimiento fetal grave."),
      dx("eclampsia", "Eclampsia", false, "Convulsiones en una preeclámptica; acá el cuadro es abdominal y hemorrágico."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cesarea", "Cesárea de urgencia (feto vivo con sufrimiento)", "clave", "Es la única forma de salvar al feto y controlar la hemorragia."),
      mg("reanimacion", "Dos vías gruesas, cristaloides, sangre y hemoderivados (plasma, crioprecipitado o fibrinógeno)", "clave", "Hemorragia oculta con coagulopatía."),
      mg("codigo", "Activar el código rojo obstétrico y avisar a neonatología", "clave", "Coordinación del equipo."),
      mg("hta", "Control de la presión y sulfato de magnesio si hay preeclampsia grave", "util", "Neuroprotección materna y fetal."),
      mg("tocoliticos", "Tocolíticos para frenar las contracciones", "riesgoso", "Contraindicados en el desprendimiento: empeoran la hemorragia y no tienen sentido."),
      mg("observar", "Observar con monitoreo y reposo", "riesgoso", "Con sufrimiento fetal y coagulopatía, la demora es mortal."),
    ],
  },
  debrief: {
    diagnosis: "Desprendimiento prematuro de placenta normoinserta grave a las 34 semanas, con sufrimiento fetal agudo, hemorragia oculta y coagulación intravascular diseminada incipiente, asociado a hipertensión y consumo de cocaína.",
    pathologies: [
      { name: "Desprendimiento de placenta normoinserta", role: "principal", why: "Separación prematura de la placenta con hematoma retroplacentario." },
      { name: "Coagulación intravascular diseminada", role: "asociada", why: "Consumo de factores por la liberación de tromboplastina." },
      { name: "Placenta previa y rotura uterina", role: "diferencial", why: "Otras hemorragias del tercer trimestre." },
    ],
    reasoning: [
      "Causa: daño de los vasos deciduales por hipertensión y vasoconstricción (cocaína, tabaco), o trauma.",
      "Mecanismo: un vaso se rompe entre la placenta y la pared uterina; el hematoma diseca y separa la placenta, que deja de oxigenar al feto; la sangre infiltra el miometrio (útero de Couvelaire) y se libera tromboplastina.",
      "Consecuencia: dolor, útero leñoso, sufrimiento o muerte fetal, shock (a veces con sangrado externo escaso) y CID.",
    ],
    epidemiology:
      "El desprendimiento ocurre en alrededor del 1 % de los embarazos y es una causa importante de mortalidad perinatal y de hemorragia materna. Sus factores de riesgo son la hipertensión (la más importante), el desprendimiento previo, la cocaína, el tabaco, los traumatismos, la rotura prolongada de membranas y la edad avanzada.",
    management: [
      "Sospecharlo ante dolor abdominal con útero hipertónico, con o sin sangrado, en el tercer trimestre.",
      "Estabilizar, evaluar la vitalidad fetal y la coagulación.",
      "Feto vivo con sufrimiento: cesárea urgente. Feto muerto y madre estable: parto vaginal con reposición agresiva.",
      "Corregir la coagulopatía y prevenir la hemorragia posparto.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de hemorragias del tercer trimestre y emergencias obstétricas.", "FASGO — Consenso de hemorragia obstétrica."],
    pearls: ["Dolor + útero leñoso + sangrado oscuro = desprendimiento.", "El sangrado visible subestima la pérdida.", "Cocaína e hipertensión: factores clave."],
    pitfalls: ["Confiar en la presión normal de una hipertensa.", "Demorar por imágenes."],
    tribunal: [
      qa("¿Qué es el útero de Couvelaire?", "La infiltración hemorrágica del miometrio por la sangre del hematoma retroplacentario, que lo vuelve violáceo y poco contráctil; aumenta el riesgo de atonía posparto."),
      qa("¿Por qué el desprendimiento produce coagulación intravascular diseminada?", "Porque la placenta y la decidua dañadas liberan tromboplastina (factor tisular) a la circulación, que activa la coagulación y consume plaquetas y fibrinógeno."),
      qa("¿Qué factores de riesgo tiene?", "Hipertensión y preeclampsia, desprendimiento previo, cocaína y tabaco, traumatismo abdominal, rotura prematura de membranas, polihidramnios con descompresión brusca, embarazo múltiple y trombofilias."),
    ],
  },
};
