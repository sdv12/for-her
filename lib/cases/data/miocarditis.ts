import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const miocarditis: ClinicalCase = {
  id: "miocarditis-aguda",
  level: 3,
  area: "Cardiovascular",
  setting: "Guardia",
  patient: { age: 26, ageUnit: "años", sex: "M", context: "Sano, sin factores de riesgo. Cuadro gripal hace 10 días." },
  frequency: "poco-frecuente",
  intro: "“Tuve gripe hace una semana y media. Hoy me duele el pecho, me falta el aire y siento que el corazón se me saltea.”",
  vitals: { TA: "102/64 mmHg", FC: "118 lpm", FR: "24 rpm", "T°": "37,6 °C", "SatO₂": "94 %" },
  anamnesis: [
    act("viral", "¿Tuviste un cuadro viral antes? ¿Diarrea o fiebre?", "clave", "“Hace 10 días, fiebre y tos.”", "Antecedente viral típico."),
    act("dolor", "¿Cómo es el dolor?", "clave", "“Opresivo; no cambia con la respiración.”", "Pericarditis mejora al inclinarse."),
    act("drogas", "¿Cocaína, alcohol, vacunas recientes?", "clave", "“Nada.”", "Otras causas."),
    act("ic", "¿Ortopnea, edemas, síncope?", "util", "“Me ahogo acostado.”", "Falla cardíaca."),
    act("familia", "¿Familia con cardiopatías?", "util", "“No.”", "Diferencial."),
    act("gym", "¿Vas al gimnasio?", "neutro", "“A veces.”", "No orienta, aunque luego deberá evitar el ejercicio."),
  ],
  exam: [
    act("cardiaco", "Corazón", "clave", "Taquicardia desproporcionada a la fiebre, tercer ruido, sin frote.", "Disfunción ventricular."),
    act("congestion", "Pulmones y yugulares", "clave", "Rales bibasales, yugulares elevadas.", "Congestión."),
    act("perfusion", "Perfusión", "util", "Conservada.", "Sin shock."),
  ],
  studies: [
    study("Electrofisiología", "ecg", "ECG", "clave", "Taquicardia sinusal, cambios difusos del ST-T, extrasístoles ventriculares.", "Inespecífico."),
    study("Laboratorio", "troponina", "Troponina y BNP, PCR", "clave", "Troponina muy elevada, BNP alto, PCR alta.", "Daño miocárdico."),
    study("Imágenes", "eco", "Ecocardiograma", "clave", "FEVI 35 %, hipocinesia global, sin derrame.", "Disfunción sin territorio coronario."),
    study("Imágenes", "rmn", "RM cardíaca", "clave", "Edema y realce tardío subepicárdico.", "Criterios de Lake Louise."),
    study("Otros", "biopsia", "Biopsia endomiocárdica de rutina", "innecesario", "No se realizó.", "Solo en formas fulminantes o sin respuesta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("miocarditis", "Miocarditis aguda con disfunción ventricular", true, "Antecedente viral, troponina alta, FEVI 35 % global y RM con realce subepicárdico."),
      dx("iam", "Infarto agudo", false, "Joven sin riesgo y alteración global; realce no subendocárdico."),
      dx("pericarditis", "Pericarditis aislada", false, "No explica la falla ni la troponina tan alta."),
      dx("dilatada", "Miocardiopatía dilatada crónica", false, "Instalación aguda y RM con edema."),
      dx("tep", "TEP", false, "Sin signos de sobrecarga derecha."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("internar", "Internar con monitoreo", "clave", "Riesgo de arritmias y deterioro rápido."),
      mg("ic", "Tratamiento de IC: diuréticos, IECA, betabloqueantes al estabilizar", "clave", "Protege y mejora la función."),
      mg("reposo", "Sin deporte de competencia por 3 a 6 meses", "clave", "El ejercicio aumenta el riesgo de muerte súbita."),
      mg("mecanico", "Derivar para soporte mecánico si es fulminante", "util", "Puente a la recuperación."),
      mg("aine", "AINE en dosis altas", "riesgoso", "Pueden empeorar el daño miocárdico en modelos."),
      mg("corticoide", "Corticoides de rutina", "innecesario", "Salvo formas específicas (células gigantes, autoinmune)."),
    ],
  },
  debrief: {
    diagnosis: "Miocarditis aguda posviral con disfunción ventricular izquierda, en varón de 26 años.",
    pathologies: [
      { name: "Miocarditis aguda", role: "principal", why: "Inflamación del miocardio." },
      { name: "Insuficiencia cardíaca, arritmias", role: "asociada", why: "Complicaciones." },
      { name: "IAM, pericarditis, miocardiopatía dilatada", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: virus como enterovirus, adenovirus, parvovirus, SARS-CoV-2, y toxinas o autoinmunidad.",
      "Mecanismo: daño viral y luego inflamación inmunitaria.",
      "Consecuencia: disfunción ventricular, arritmias, y a veces miocardiopatía dilatada crónica.",
    ],
    epidemiology:
      "Afecta sobre todo a varones jóvenes y es causa de una parte de las muertes súbitas en deportistas. En América Latina también debe pensarse en Chagas agudo. La mayoría se recupera, aunque algunos desarrollan miocardiopatía dilatada.",
    management: [
      "Sospecha en un joven con troponina alta sin coronarias.",
      "Ecocardiograma y RM.",
      "Tratamiento de IC y arritmias.",
      "Reposo deportivo y control prolongado.",
    ],
    sources: ["Sociedad Argentina de Cardiología — Recomendaciones de miocarditis.", "ESC — Declaración sobre miocarditis."],
    pearls: ["Taquicardia desproporcionada tras un virus.", "Joven con troponina alta: pensá en miocarditis.", "Sin deporte 3 a 6 meses."],
    pitfalls: ["Decirle que solo es ansiedad.", "Volver temprano al deporte."],
    tribunal: [
      qa("¿Cómo se diferencia del IAM?", "Por el contexto, la alteración difusa, coronarias normales y realce tardío subepicárdico o intramiocárdico en vez de subendocárdico."),
      qa("¿Qué son los criterios de Lake Louise?", "Criterios por RM de edema, hiperemia y necrosis o fibrosis, que confirman inflamación miocárdica."),
      qa("¿Qué fármacos pueden causarla?", "Inhibidores de puntos de control, clozapina, antraciclinas y otros."),
    ],
  },
};
