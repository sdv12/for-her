import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const epoc: ClinicalCase = {
  id: "epoc-exacerbacion",
  level: 2,
  area: "Respiratorio",
  setting: "Guardia",
  patient: { age: 68, ageUnit: "años", sex: "M", context: "Jubilado, ex trabajador de la construcción. Julio." },
  frequency: "frecuente",
  intro: "“Hace tres días me resfrié y desde ayer me ahogo mucho más que siempre. El catarro está verde y no me alcanzan los disparos.”",
  vitals: { TA: "145/85 mmHg", FC: "104 lpm", FR: "26 rpm", "T°": "37,6 °C", "SatO₂": "86 % (aire ambiente)" },
  anamnesis: [
    act("tabaco", "¿Fuma o fumó? ¿Cuánto?", "clave", "“Fumé un atado por día desde los 18. Ahora fumo diez.”", "Más de 40 paquetes/año: el tabaco es la causa principal de EPOC."),
    act("basal", "¿Cómo respira en un día normal? ¿Qué medicación usa?", "clave", "“Me agito al caminar una cuadra. Uso tiotropio todos los días y salbutamol cuando me falta el aire.”", "La disnea basal y el tratamiento previo permiten comparar y definir la exacerbación."),
    act("esputo", "¿Cambió el catarro en cantidad o color?", "clave", "“Hay mucho más y está verde.”", "Aumento de disnea, volumen y purulencia del esputo (criterios de Anthonisen) indican beneficio del antibiótico."),
    act("exacerbaciones", "¿Cuántas veces estuvo internado por esto en el último año?", "util", "“Una vez, el invierno pasado.”", "Las exacerbaciones previas predicen nuevas y orientan el riesgo."),
    act("cardio", "¿Tiene dolor de pecho, se le hinchan las piernas o duerme sentado?", "util", "“Las piernas se me hinchan un poco a la tarde.”", "Busca insuficiencia cardíaca o cor pulmonale como diferencial o comorbilidad."),
    act("vacunas", "¿Se vacunó contra la gripe y el neumococo?", "util", "“La de la gripe no este año.”", "Las vacunas reducen exacerbaciones y son parte del manejo."),
    act("oxigeno", "¿Usa oxígeno en su casa?", "clave", "“No.”", "Un paciente sin hipercapnia crónica conocida igual puede retener CO₂: con oxígeno hay que apuntar a saturación 88–92 %."),
    act("hijos", "¿Tiene hijos?", "neutro", "“Tres.”", "No orienta."),
  ],
  exam: [
    act("inspeccion", "Inspección: postura, músculos accesorios y respiración", "clave", "Sentado inclinado hacia adelante, uso de esternocleidomastoideos, respiración con labios fruncidos, tórax en tonel.", "Signos de hiperinsuflación y trabajo respiratorio aumentado."),
    act("auscultacion", "Auscultación pulmonar", "clave", "Murmullo vesicular disminuido global, sibilancias y roncus difusos, espiración prolongada. Sin foco.", "Obstrucción bronquial difusa; la ausencia de foco orienta contra neumonía."),
    act("sensorio", "Estado de conciencia y asterixis", "clave", "Lúcido, sin asterixis ni somnolencia.", "La somnolencia o el flapping sugieren hipercapnia grave (indicación de ventilación)."),
    act("edemas", "Edemas e ingurgitación yugular", "util", "Edema leve de tobillos, sin ingurgitación.", "Orienta sobre sobrecarga de volumen o cor pulmonale."),
    act("piel", "Piel y faneras", "neutro", "Dedos con manchas de nicotina.", "No cambia la conducta."),
  ],
  studies: [
    study("Laboratorio", "gases", "Gasometría arterial", "clave", "pH 7,33, pCO₂ 54 mmHg, pO₂ 52 mmHg, HCO₃ 30.", "Acidosis respiratoria aguda sobre crónica (bicarbonato alto): define gravedad e indicación de ventilación no invasiva si el pH < 7,35."),
    study("Imágenes", "rx", "Radiografía de tórax", "clave", "Hiperinsuflación, aplanamiento diafragmático, sin consolidación ni neumotórax.", "Descarta neumonía, neumotórax e insuficiencia cardíaca como causa."),
    study("Electrofisiología", "ecg", "Electrocardiograma", "util", "Taquicardia sinusal, P pulmonar, sin isquemia ni arritmias.", "Descarta arritmias o isquemia como desencadenante."),
    study("Laboratorio", "lab", "Hemograma, función renal, ionograma y glucemia", "util", "Leucocitos 12.000, hematocrito 51 %. Función renal normal.", "La poliglobulia refleja hipoxemia crónica; el ionograma es útil antes de corticoides y beta-agonistas."),
    study("Otros", "espiro", "Espirometría en la guardia", "innecesario", "No se realizó.", "No sirve en la exacerbación: se hace en estabilidad, para confirmar y estadificar."),
    study("Laboratorio", "dimero", "Dímero D", "innecesario", "Elevado.", "Sin sospecha clínica específica de TEP, solo agrega confusión."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("epoc", "Exacerbación de EPOC de origen infeccioso con insuficiencia respiratoria hipercápnica", true, "Fumador con EPOC conocido, aumento de disnea, volumen y purulencia del esputo, sin foco en la radiografía y gases con acidosis respiratoria."),
      dx("neumonia", "Neumonía adquirida en la comunidad", false, "Habría consolidación en la radiografía y signos focales."),
      dx("ic", "Insuficiencia cardíaca descompensada", false, "Esperarías ingurgitación yugular, crepitantes bilaterales, cardiomegalia o congestión en la radiografía."),
      dx("neumotorax", "Neumotórax espontáneo secundario", false, "Daría dolor brusco, hipoventilación unilateral y se vería en la radiografía."),
      dx("asma", "Crisis asmática", false, "Paciente fumador mayor con disnea crónica progresiva: el perfil es de EPOC, no de asma."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("o2", "Oxígeno controlado con meta de saturación 88–92 %", "clave", "Corrige la hipoxemia sin empeorar la hipercapnia."),
      mg("bd", "Broncodilatadores de acción corta: salbutamol con o sin ipratropio", "clave", "Primera línea en la exacerbación."),
      mg("corticoide", "Corticoide sistémico 5 días (prednisona 40 mg/día)", "clave", "Acelera la recuperación y reduce fracasos y recaídas."),
      mg("atb", "Antibiótico (por ejemplo, amoxicilina-clavulánico) por 5–7 días", "clave", "Indicado con esputo purulento y aumento de disnea y volumen."),
      mg("vni", "Ventilación no invasiva", "util", "Indicada por la acidosis respiratoria (pH < 7,35 con pCO₂ > 45); reduce intubación y mortalidad."),
      mg("o2alto", "Máscara con reservorio a alto flujo para saturar 100 %", "riesgoso", "En retenedores de CO₂ el exceso de oxígeno empeora la hipercapnia y puede llevar a narcosis."),
      mg("teofilina", "Aminofilina endovenosa", "innecesario", "No se recomienda: poco beneficio y muchos efectos adversos."),
    ],
  },
  debrief: {
    diagnosis: "Exacerbación moderada a grave de EPOC, de causa infecciosa, con insuficiencia respiratoria global (acidosis respiratoria aguda sobre crónica).",
    pathologies: [
      { name: "Exacerbación de EPOC", role: "principal", why: "Empeoramiento agudo de los síntomas respiratorios que requiere cambiar el tratamiento." },
      { name: "Insuficiencia respiratoria hipercápnica", role: "asociada", why: "Hipoxemia con pCO₂ elevada y acidemia." },
      { name: "Cor pulmonale", role: "asociada", why: "Edemas y poliglobulia: posible hipertensión pulmonar por hipoxemia crónica." },
      { name: "Neumonía", role: "diferencial", why: "Se descarta con la radiografía." },
      { name: "Insuficiencia cardíaca", role: "diferencial", why: "Comorbilidad frecuente con disnea similar." },
    ],
    reasoning: [
      "Causa: la EPOC se debe sobre todo al tabaco (también humo de biomasa y exposición laboral). La exacerbación suele desencadenarse por infecciones virales o bacterianas (Haemophilus, neumococo, Moraxella).",
      "Mecanismo: inflamación crónica de la vía aérea pequeña y destrucción alveolar (enfisema) → pérdida del retroceso elástico y obstrucción no totalmente reversible. La infección suma inflamación y moco: aumenta el atrapamiento aéreo.",
      "Consecuencia: hiperinsuflación dinámica, más trabajo respiratorio y alteración ventilación-perfusión → hipoxemia; cuando los músculos no alcanzan, sube la pCO₂ (acidosis respiratoria).",
      "Con hipercapnia crónica, el exceso de oxígeno empeora la pCO₂ por el efecto Haldane, la vasoconstricción hipóxica que se pierde y, en menor medida, el menor estímulo respiratorio.",
    ],
    epidemiology:
      "En la Argentina la EPOC afecta a cerca del 15 % de los mayores de 40 años según el estudio EPOC.AR, y más de la mitad no está diagnosticada. Es más frecuente en varones y en mayores de 60, aunque crece en mujeres por el tabaquismo. Las exacerbaciones aumentan en invierno.",
    management: [
      "Valorar la gravedad con clínica, saturación y gases; radiografía y ECG para descartar otras causas.",
      "Oxígeno controlado (88–92 %), broncodilatadores de acción corta, corticoide sistémico 5 días y antibiótico si el esputo es purulento.",
      "Ventilación no invasiva si hay acidosis respiratoria; considerar intubación si fracasa o hay compromiso de conciencia.",
      "Al alta: optimizar el tratamiento de mantenimiento (LAMA/LABA), técnica inhalatoria, rehabilitación respiratoria.",
      "Cesación tabáquica y vacunas antigripal y antineumocócica.",
    ],
    sources: [
      "Asociación Argentina de Medicina Respiratoria — Guía de EPOC y Consenso de exacerbaciones.",
      "Estudio EPOC.AR — Prevalencia de EPOC en la Argentina.",
      "Ministerio de Salud de la Nación — Guía de práctica clínica nacional de diagnóstico y tratamiento de la EPOC.",
    ],
    pearls: [
      "En EPOC con hipercapnia: saturación objetivo 88–92 %.",
      "Bicarbonato alto con pCO₂ alta = componente crónico; pH bajo = componente agudo.",
      "Dejar de fumar es lo único que frena la caída del VEF₁.",
    ],
    pitfalls: ["Dar oxígeno a alto flujo sin control.", "Hacer espirometría en plena exacerbación.", "Olvidar las vacunas y la cesación tabáquica al alta."],
  },
};
