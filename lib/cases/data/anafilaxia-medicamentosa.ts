import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const anafilaxiaMedicamentosa: ClinicalCase = {
  id: "anafilaxia-amoxicilina",
  level: 3,
  area: "Alergia e inmunología",
  setting: "CAPS",
  patient: { age: 45, ageUnit: "años", sex: "F", context: "Tomó la primera dosis de amoxicilina por una sinusitis hace 15 minutos en la sala de espera del CAPS. Usa atenolol." },
  frequency: "frecuente",
  intro: "“Me pica todo, se me hinchan los labios, me cuesta respirar y estoy mareada.”",
  vitals: { TA: "78/44 mmHg", FC: "64 lpm", FR: "28 rpm", "T°": "36,6 °C", "SatO₂": "89 %" },
  anamnesis: [
    act("farmaco", "¿Qué tomaste y cuándo?", "clave", "“La amoxicilina hace un cuarto de hora.”", "Relación temporal."),
    act("previas", "¿Tuviste alergia a algún remedio?", "clave", "“Una vez ronchas con penicilina de chica.”", "Antecedente."),
    act("atenolol", "¿Qué otros remedios tomás?", "clave", "“Atenolol para la presión.”", "Betabloqueante: menos respuesta a la adrenalina."),
    act("asma", "¿Tenés asma?", "util", "“No.”", "Riesgo."),
    act("digestivo", "¿Dolor de panza o vómitos?", "util", "“Me retuerce la panza.”", "Compromiso de otro órgano."),
    act("trabajo", "¿Trabajás?", "neutro", "“Soy portera en una escuela.”", "No orienta."),
  ],
  exam: [
    act("piel", "Piel y mucosas", "clave", "Urticaria generalizada, angioedema de labios.", "Compromiso cutáneo."),
    act("respiratorio", "Respiración", "clave", "Sibilancias difusas, sin estridor.", "Broncoespasmo."),
    act("perfusion", "Perfusión", "util", "Fría, pálida.", "Shock."),
  ],
  studies: [
    study("Otros", "clinico", "Diagnóstico clínico; no demorar el tratamiento", "clave", "Criterios cumplidos.", "Anafilaxia."),
    study("Laboratorio", "triptasa", "Triptasa sérica entre 1 y 2 horas", "util", "Elevada.", "Confirma a posteriori."),
    study("Otros", "monitor", "Monitor y oximetría", "clave", "Hipotensión e hipoxemia.", "Gravedad."),
    study("Otros", "prueba-provocacion", "Prueba de provocación con amoxicilina ese día", "riesgoso", "No se realizó.", "Peligroso."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("anafilaxia", "Anafilaxia con shock por amoxicilina, en paciente con betabloqueantes", true, "Inicio en minutos tras el fármaco, piel, respiratorio, digestivo e hipotensión."),
      dx("urticaria", "Urticaria aguda", false, "Hay hipotensión y broncoespasmo."),
      dx("vasovagal", "Reacción vasovagal", false, "Urticaria, broncoespasmo y sin bradicardia marcada."),
      dx("angioedema-bradicinina", "Angioedema por IECA", false, "No toma IECA y hay urticaria."),
      dx("asma", "Crisis asmática", false, "Hay compromiso cutáneo y shock."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("adrenalina", "Adrenalina IM en el muslo, repetible cada 5 a 15 minutos", "clave", "Tratamiento de primera línea."),
      mg("posicion-fluidos", "Acostada con piernas elevadas, oxígeno y cristaloides", "clave", "Shock."),
      mg("glucagon", "Glucagón si no responde por el betabloqueante", "clave", "Actúa sin receptores beta."),
      mg("traslado", "Traslado a guardia y observación prolongada", "util", "Reacción bifásica."),
      mg("antihistaminico-solo", "Antihistamínico y corticoide sin adrenalina", "riesgoso", "No tratan el shock."),
      mg("sentarla", "Sentarla o pararla", "riesgoso", "Puede causar paro."),
    ],
  },
  debrief: {
    diagnosis: "Anafilaxia con shock por amoxicilina en mujer de 45 años tratada con betabloqueantes.",
    pathologies: [
      { name: "Anafilaxia", role: "principal", why: "Reacción sistémica grave." },
      { name: "Betabloqueante", role: "asociada", why: "Peor respuesta a la adrenalina." },
      { name: "Vasovagal, urticaria", role: "diferencial", why: "Otras reacciones." },
    ],
    reasoning: [
      "Causa: hipersensibilidad IgE a betalactámicos.",
      "Mecanismo: degranulación masiva de mastocitos con vasodilatación y broncoespasmo.",
      "Consecuencia: shock distributivo e hipoxemia.",
    ],
    epidemiology:
      "Los fármacos, sobre todo antibióticos y AINE, son una causa frecuente de anafilaxia en adultos. La adrenalina IM temprana es lo que más reduce la mortalidad y suele subutilizarse. Los betabloqueantes pueden hacerla refractaria.",
    management: [
      "Adrenalina IM.",
      "Posición y fluidos.",
      "Glucagón si hay betabloqueo.",
      "Observación y registro.",
    ],
    sources: ["Asociación Argentina de Alergia e Inmunología Clínica — Anafilaxia.", "WAO — Anaphylaxis Guidance."],
    pearls: ["Adrenalina IM primero.", "Acostada.", "Betabloqueante: glucagón."],
    pitfalls: ["Solo antihistamínicos.", "Sentarla."],
    tribunal: [
      qa("¿Qué dosis de adrenalina IM se usa?", "0,01 mg/kg de la ampolla 1 mg/ml, máximo 0,5 mg en adultos."),
      qa("¿Qué es la reacción bifásica?", "Reaparición de síntomas horas después sin nueva exposición."),
      qa("¿Qué se hace al alta?", "Registrar la alergia, indicar autoinyector de adrenalina si corresponde y derivar a alergia."),
    ],
  },
};
