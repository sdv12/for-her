import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const epiAbsceso: ClinicalCase = {
  id: "absceso-tuboovarico",
  level: 3,
  area: "Ginecología y obstetricia",
  setting: "Guardia",
  patient: { age: 36, ageUnit: "años", sex: "F", context: "Tiene un DIU de cobre hace 6 años. Tuvo dolor pelviano hace un mes que trató con analgésicos." },
  frequency: "poco-frecuente",
  intro: "“Hace una semana me duele mucho la parte baja de la panza, más a la derecha, tengo fiebre y flujo con mal olor. Hoy no me puedo mover.”",
  vitals: { TA: "104/64 mmHg", FC: "116 lpm", FR: "22 rpm", "T°": "39,3 °C" },
  anamnesis: [
    act("dolor", "¿Cómo empezó y cómo evolucionó el dolor?", "clave", "“Empezó leve hace un mes, ahora es muy fuerte.”", "EPI no tratada que evoluciona a absceso."),
    act("embarazo", "¿Podés estar embarazada?", "clave", "“No, tengo DIU y me vino.”", "Descartar embarazo ectópico."),
    act("parejas", "¿Tuviste parejas nuevas?", "util", "“Una pareja nueva hace unos meses.”", "Factor de riesgo de ITS."),
    act("flujo", "¿Cómo es el flujo?", "util", "“Amarillo y con olor.”", "Cervicitis."),
    act("digestivo", "¿Diarrea, vómitos, dolor al orinar?", "util", "“Náuseas.”", "Diferenciales."),
    act("deporte", "¿Hacés deporte?", "neutro", "“Vóley.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Abdomen", "clave", "Dolor y defensa en hemiabdomen inferior, más a la derecha.", "Irritación peritoneal pelviana."),
    act("especulo", "Especuloscopía", "clave", "Cervicitis mucopurulenta, hilos del DIU visibles.", "Infección ascendente."),
    act("tacto", "Tacto bimanual", "clave", "Dolor a la movilización del cuello, masa anexial derecha dolorosa.", "Masa anexial: sugiere absceso."),
  ],
  studies: [
    study("Imágenes", "eco-tv", "Ecografía transvaginal", "clave", "Masa compleja anexial derecha de 7 cm con contenido ecogénico y tabiques.", "Absceso tuboovárico."),
    study("Laboratorio", "lab", "Hemograma, PCR, beta-HCG, función renal, hemocultivos", "clave", "Leucocitos 21.000, PCR muy alta, beta negativa.", "Infección grave; descarta embarazo."),
    study("Microbiología", "its", "PCR para gonococo y Chlamydia, VIH, VDRL", "clave", "Chlamydia positiva.", "Agente y otras ITS."),
    study("Otros", "laparoscopia-dx", "Laparoscopía diagnóstica antes de los antibióticos", "innecesario", "No se realizó.", "La imagen y la clínica bastan para iniciar antibióticos."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("ato", "Enfermedad pelviana inflamatoria complicada con absceso tuboovárico derecho de 7 cm", true, "Dolor pelviano con fiebre, cervicitis, dolor a la movilización y masa anexial compleja en ecografía, con Chlamydia positiva."),
      dx("epi-simple", "EPI no complicada", false, "Hay masa compleja: absceso."),
      dx("apendicitis", "Apendicitis con plastrón", false, "Cervicitis, dolor a la movilización y masa anexial."),
      dx("torsion", "Torsión anexial", false, "Sin fiebre ni infección en la torsión típica."),
      dx("ectopico", "Embarazo ectópico", false, "Beta-HCG negativa."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("internacion", "Internación con antibióticos EV (por ejemplo, ceftriaxona más doxiciclina más metronidazol)", "clave", "Absceso: tratamiento parenteral."),
      mg("drenaje", "Drenaje percutáneo o quirúrgico si mide más de 7–8 cm, no responde en 48–72 h o se rompe", "clave", "Los abscesos grandes responden peor a antibióticos solos."),
      mg("pareja", "Tratar a la pareja y testear ITS", "clave", "Evita la reinfección."),
      mg("diu", "Evaluar retirar el DIU si no mejora", "util", "No es obligatorio retirarlo de entrada."),
      mg("ambulatorio", "Tratamiento ambulatorio oral", "riesgoso", "Inadecuado para un absceso con fiebre alta."),
      mg("histerectomia", "Histerectomía de entrada", "innecesario", "Se reserva para casos refractarios."),
    ],
  },
  debrief: {
    diagnosis: "Enfermedad pelviana inflamatoria complicada con absceso tuboovárico derecho de 7 cm, por Chlamydia, en mujer de 36 años con DIU.",
    pathologies: [
      { name: "Absceso tuboovárico", role: "principal", why: "Complicación de la EPI." },
      { name: "Infección por Chlamydia", role: "asociada", why: "Agente." },
      { name: "Apendicitis, torsión anexial, ectópico", role: "diferencial", why: "Otras causas de dolor pelviano agudo." },
    ],
    reasoning: [
      "Causa: ITS (Chlamydia, gonococo) y flora vaginal que ascienden desde el cuello.",
      "Mecanismo: infección del endometrio, trompas y ovario con formación de una colección purulenta.",
      "Consecuencia: sepsis, rotura con peritonitis, infertilidad, dolor crónico y embarazo ectópico.",
    ],
    epidemiology:
      "La EPI afecta sobre todo a mujeres jóvenes sexualmente activas; el absceso complica alrededor del 15 % de las internadas. El retraso en el diagnóstico y el tratamiento de la EPI leve favorece las complicaciones.",
    management: [
      "Sospechar EPI ante dolor pelviano con dolor a la movilización cervical.",
      "Ecografía para buscar abscesos.",
      "Antibióticos EV e internación; drenaje si es grande o no responde.",
      "Tratar parejas y rastrear ITS.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de ITS.", "FASGO — Consenso de enfermedad pelviana inflamatoria."],
    pearls: ["EPI + masa anexial = absceso.", "Internar y antibióticos EV.", "Grande o sin respuesta: drenar."],
    pitfalls: ["Tratar en forma ambulatoria.", "Olvidar a la pareja."],
    tribunal: [
      qa("¿Cuáles son los criterios mínimos de EPI?", "Dolor a la movilización cervical, dolor uterino o dolor anexial en una mujer sexualmente activa con dolor pelviano, sin otra causa; los criterios adicionales (fiebre, flujo, leucocitos, PCR, cultivos) aumentan la especificidad."),
      qa("¿Qué es el síndrome de Fitz-Hugh-Curtis?", "Una perihepatitis por EPI (gonococo o Chlamydia) con dolor en hipocondrio derecho y adherencias en cuerda de violín entre el hígado y el diafragma."),
      qa("¿Cuándo se interna una EPI?", "Ante absceso, embarazo, imposibilidad de descartar una urgencia quirúrgica, enfermedad grave con fiebre alta o vómitos, intolerancia oral o falta de respuesta al tratamiento ambulatorio."),
    ],
  },
};
