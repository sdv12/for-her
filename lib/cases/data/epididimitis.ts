import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const epididimitis: ClinicalCase = {
  id: "orquiepididimitis",
  level: 2,
  area: "Nefrourología",
  setting: "Guardia",
  patient: { age: 26, ageUnit: "años", sex: "M", context: "Relaciones sin preservativo con parejas ocasionales." },
  frequency: "frecuente",
  intro: "“Desde hace tres días me duele el testículo derecho, cada vez más, y está hinchado. Me arde al orinar.”",
  vitals: { TA: "124/76 mmHg", FC: "92 lpm", "T°": "38,2 °C" },
  anamnesis: [
    act("inicio", "¿Cómo empezó el dolor?", "clave", "“De a poco, en días.”", "Gradual: menos sugestivo de torsión."),
    act("urinario", "¿Ardor o secreción por la uretra?", "clave", "“Ardor y algo de secreción.”", "Uretritis asociada."),
    act("sexual", "¿Relaciones sin preservativo?", "clave", "“Sí, con varias parejas.”", "ITS."),
    act("vomitos", "¿Vómitos o dolor brusco que lo despertó?", "util", "“No.”", "Torsión."),
    act("paperas", "¿Inflamación de las parótidas?", "util", "“No.”", "Orquitis urliana."),
    act("trabajo", "¿Trabaja?", "neutro", "“En un depósito.”", "No orienta."),
  ],
  exam: [
    act("escroto", "Examen escrotal", "clave", "Epidídimo derecho engrosado y doloroso, testículo en posición normal, reflejo cremastérico presente.", "Epididimitis."),
    act("prehn", "Signo de Prehn", "clave", "Elevar el testículo alivia el dolor.", "Sugiere epididimitis (no definitivo)."),
    act("uretra", "Meato uretral", "util", "Secreción mucopurulenta.", "Uretritis."),
  ],
  studies: [
    study("Imágenes", "doppler", "Ecografía Doppler testicular", "clave", "Epidídimo aumentado con flujo aumentado; testículo con flujo normal.", "Excluye torsión."),
    study("Laboratorio", "naat", "PCR de gonococo y clamidia en orina, sedimento y urocultivo", "clave", "Chlamydia trachomatis positiva.", "Germen."),
    study("Laboratorio", "its", "VIH, VDRL, hepatitis B", "util", "Negativos.", "Otras ITS."),
    study("Otros", "esperar-doppler-torsion", "Si se sospechara torsión, esperar el Doppler para explorar", "riesgoso", "No aplica aquí.", "En la torsión clínica no se demora la cirugía."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("epididimitis-its", "Orquiepididimitis aguda por Chlamydia trachomatis (ITS)", true, "Dolor gradual, uretritis, epidídimo engrosado, Doppler con hiperflujo y PCR positiva."),
      dx("torsion", "Torsión testicular", false, "Inicio gradual, cremastérico presente y flujo conservado."),
      dx("tumor", "Tumor testicular", false, "Cuadro inflamatorio agudo."),
      dx("hernia", "Hernia incarcerada", false, "El epidídimo es el afectado."),
      dx("orquitis-urliana", "Orquitis por paperas", false, "Sin parotiditis y con uretritis."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("atb", "Ceftriaxona IM dosis única más doxiciclina por 10 días", "clave", "Cubre gonococo y clamidia."),
      mg("pareja", "Tratar a las parejas de los últimos 60 días", "clave", "Cortar la transmisión."),
      mg("sintomas", "Reposo, suspensorio, hielo y AINE", "clave", "Síntomas."),
      mg("control", "Control si no mejora en 72 horas", "util", "Absceso o diagnóstico alternativo."),
      mg("cipro-sola", "Ciprofloxacina sola", "riesgoso", "Gonococo resistente y no cubre bien clamidia."),
      mg("cirugia", "Exploración quirúrgica de rutina", "innecesario", "Doppler normal y clínica típica."),
    ],
  },
  debrief: {
    diagnosis: "Orquiepididimitis aguda por Chlamydia trachomatis, en varón de 26 años.",
    pathologies: [
      { name: "Orquiepididimitis", role: "principal", why: "Infección ascendente." },
      { name: "Uretritis por clamidia", role: "asociada", why: "Origen." },
      { name: "Torsión, tumor", role: "diferencial", why: "Otros cuadros escrotales." },
    ],
    reasoning: [
      "Causa: Chlamydia o gonococo en menores de 35 sexualmente activos; enterobacterias en mayores.",
      "Mecanismo: ascenso desde la uretra por el conducto deferente.",
      "Consecuencia: dolor, fiebre y riesgo de absceso o infertilidad.",
    ],
    epidemiology:
      "Es la causa más frecuente de escroto agudo en adultos. En jóvenes suele ser una ITS; en mayores de 35, una infección urinaria. Siempre se descarta torsión.",
    management: [
      "Descartar torsión.",
      "PCR para ITS.",
      "Ceftriaxona más doxiciclina.",
      "Parejas.",
    ],
    sources: ["Sociedad Argentina de Urología — Escroto agudo.", "CDC — Sexually Transmitted Infections Treatment Guidelines: Epididymitis."],
    pearls: ["Gradual con uretritis: epididimitis.", "Doppler.", "Tratar a la pareja."],
    pitfalls: ["Confundir con torsión.", "Quinolona sola."],
    tribunal: [
      qa("¿Qué gérmenes causan epididimitis en mayores de 35?", "Enterobacterias como E. coli, asociadas a uropatía."),
      qa("¿Qué es el reflejo cremastérico?", "Elevación del testículo al estimular la cara interna del muslo; suele faltar en la torsión."),
      qa("¿Qué antibiótico usás si practica sexo anal insertivo?", "Ceftriaxona más levofloxacina para cubrir enterobacterias."),
    ],
  },
};
