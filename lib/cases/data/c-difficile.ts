import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const cDifficile: ClinicalCase = {
  id: "colitis-clostridioides-difficile",
  level: 2,
  area: "Gastroenterología",
  setting: "Internación",
  patient: { age: 74, ageUnit: "años", sex: "F", context: "Internada por neumonía, recibe ceftriaxona y clindamicina hace 8 días. Toma omeprazol." },
  frequency: "frecuente",
  intro: "“Desde hace dos días tiene seis deposiciones líquidas por día, fiebre de 38 y dolor de panza.” (relata la enfermera del piso)",
  vitals: { TA: "116/70 mmHg", FC: "102 lpm", FR: "18 rpm", "T°": "38,2 °C" },
  anamnesis: [
    act("antibioticos", "¿Qué antibióticos recibe y desde cuándo?", "clave", "Ceftriaxona y clindamicina hace 8 días.", "Los antibióticos (clindamicina, cefalosporinas, quinolonas) son el principal factor de riesgo."),
    act("diarrea", "¿Cuántas deposiciones y cómo son?", "clave", "Seis líquidas por día, sin sangre visible, muy olorosas.", "Diarrea asociada a antibióticos."),
    act("ibp", "¿Recibe inhibidores de la bomba de protones?", "util", "Omeprazol.", "Factor de riesgo."),
    act("laxantes", "¿Recibe laxantes?", "util", "No.", "Descarta diarrea por laxantes (no se testea si toma)."),
    act("previos", "¿Tuvo diarrea por C. difficile antes?", "util", "No.", "Las recurrencias cambian el tratamiento."),
    act("nietos", "¿Quién la visita?", "neutro", "Los nietos.", "No orienta."),
  ],
  exam: [
    act("abdomen", "Abdomen", "clave", "Distensión leve, dolor difuso, sin defensa, ruidos presentes.", "Sin signos de megacolon ni perforación."),
    act("hidratacion", "Hidratación", "clave", "Mucosas secas.", "Deshidratación."),
    act("perfusion", "Perfusión y estado mental", "util", "Lúcida, bien perfundida.", "Sin shock."),
  ],
  studies: [
    study("Microbiología", "toxina", "Detección de C. difficile en heces (GDH y toxina, o PCR) en deposiciones no formes", "clave", "GDH y toxina positivas.", "Confirma."),
    study("Laboratorio", "lab", "Hemograma, creatinina, albúmina, lactato", "clave", "Leucocitos 17.000, creatinina 1,2, albúmina 2,9.", "Leucocitos mayores de 15.000: forma grave."),
    study("Imágenes", "rx", "Radiografía o tomografía de abdomen si hay distensión importante o signos de gravedad", "util", "Engrosamiento de la pared del colon, sin megacolon.", "Descarta megacolon tóxico."),
    study("Microbiología", "control-curacion", "Repetir la toxina al terminar para confirmar la curación", "innecesario", "No se realizó.", "Puede seguir positiva sin infección activa; no se recomienda."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("cdi", "Infección por Clostridioides difficile, primer episodio, forma grave (leucocitos mayores de 15.000)", true, "Diarrea acuosa con fiebre durante antibióticos e IBP, con GDH y toxina positivas y leucocitosis de 17.000."),
      dx("efecto-atb", "Diarrea por efecto directo del antibiótico", false, "La toxina es positiva."),
      dx("viral", "Gastroenteritis viral nosocomial", false, "La toxina de C. difficile es positiva."),
      dx("isquemica", "Colitis isquémica", false, "Contexto de antibióticos y toxina positiva."),
      dx("megacolon", "Megacolon tóxico", false, "No hay dilatación ni toxicidad sistémica grave."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("tratamiento", "Vancomicina oral (o fidaxomicina) por 10 días", "clave", "Tratamiento de primera línea del primer episodio."),
      mg("suspender", "Suspender o acortar los antibióticos innecesarios y el omeprazol si no hace falta", "clave", "Reduce la recurrencia."),
      mg("aislamiento", "Aislamiento de contacto y lavado de manos con agua y jabón", "clave", "Las esporas resisten el alcohol en gel."),
      mg("hidratacion", "Hidratación y control de electrolitos", "util", "Corrige la deshidratación."),
      mg("loperamida", "Loperamida", "riesgoso", "Puede favorecer el megacolon tóxico."),
      mg("vanco-ev", "Vancomicina endovenosa", "riesgoso", "No llega a la luz del colon: es ineficaz para esta infección."),
    ],
  },
  debrief: {
    diagnosis: "Infección por Clostridioides difficile, primer episodio, grave (leucocitosis de 17.000), asociada a ceftriaxona, clindamicina y omeprazol, en mujer internada de 74 años.",
    pathologies: [
      { name: "Colitis por C. difficile", role: "principal", why: "Infección toxigénica del colon." },
      { name: "Uso de antibióticos e IBP", role: "asociada", why: "Factores de riesgo." },
      { name: "Diarrea por antibióticos, viral, isquémica", role: "diferencial", why: "Otras diarreas nosocomiales." },
    ],
    reasoning: [
      "Causa: los antibióticos alteran la microbiota del colon y permiten la proliferación de C. difficile.",
      "Mecanismo: las toxinas A y B dañan el epitelio y producen inflamación (a veces pseudomembranas).",
      "Consecuencia: diarrea, fiebre, colitis; en casos graves, megacolon tóxico, perforación y muerte.",
    ],
    epidemiology:
      "C. difficile es la principal causa de diarrea infecciosa intrahospitalaria. Afecta sobre todo a mayores de 65, internados, con antibióticos e IBP. La recurrencia ocurre en alrededor del 20 % de los casos.",
    management: [
      "Testear solo deposiciones no formes en pacientes con diarrea y factores de riesgo.",
      "Vancomicina oral o fidaxomicina; suspender antibióticos innecesarios.",
      "Aislamiento de contacto y limpieza con lavandina.",
      "Recurrencias: fidaxomicina, bezlotoxumab o trasplante de microbiota.",
    ],
    sources: ["Sociedad Argentina de Infectología — Recomendaciones de infección por Clostridioides difficile.", "Programa nacional de control de infecciones asociadas al cuidado de la salud."],
    pearls: ["Diarrea con antibióticos = buscar C. difficile.", "Vancomicina oral, no EV.", "Agua y jabón."],
    pitfalls: ["Dar loperamida.", "Usar alcohol en gel como única higiene."],
    tribunal: [
      qa("¿Qué es el megacolon tóxico?", "La dilatación del colon (más de 6 cm) con toxicidad sistémica, complicación de colitis graves (C. difficile, enfermedad inflamatoria intestinal); requiere tratamiento médico intensivo y a veces colectomía."),
      qa("¿Por qué el alcohol en gel no alcanza con C. difficile?", "Porque las esporas resisten el alcohol; se necesita lavado de manos con agua y jabón y limpieza de superficies con hipoclorito."),
      qa("¿Qué es el trasplante de microbiota fecal?", "La introducción de heces procesadas de un donante sano en el intestino del paciente para restaurar la microbiota; es muy eficaz en la infección recurrente por C. difficile."),
    ],
  },
};
