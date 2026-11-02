import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const higadoGraso: ClinicalCase = {
  id: "higado-graso-metabolico",
  level: 2,
  area: "Gastroenterología",
  setting: "Consultorio",
  patient: { age: 49, ageUnit: "años", sex: "F", context: "Diabética tipo 2 con obesidad. No toma alcohol." },
  frequency: "muy-frecuente",
  intro: "“En unos análisis de rutina me salieron las enzimas del hígado altas y en la ecografía dice ‘hígado graso’. ¿Es grave?”",
  vitals: { TA: "138/86 mmHg", FC: "78 lpm", "T°": "36,4 °C", Peso: "94 kg" },
  anamnesis: [
    act("alcohol", "¿Cuánto alcohol tomás por semana?", "clave", "“Nada.”", "Descarta enfermedad hepática alcohólica."),
    act("virus", "¿Te hiciste estudios de hepatitis B y C? ¿Transfusiones, tatuajes?", "clave", "“Nunca.”", "Descartar hepatitis virales."),
    act("farmacos", "¿Qué medicamentos tomás, incluidos suplementos?", "util", "“Metformina y yuyos para adelgazar.”", "Algunos suplementos son hepatotóxicos."),
    act("diabetes", "¿Cómo está tu diabetes?", "util", "“HbA1c 8.”", "La diabetes aumenta el riesgo de fibrosis."),
    act("sintomas", "¿Cansancio, picazón, coloración amarilla?", "util", "“No.”", "Asintomática."),
    act("perro", "¿Tenés mascotas?", "neutro", "“Un gato.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Abdomen e hígado", "clave", "Hepatomegalia leve lisa; sin ascitis ni circulación colateral.", "Sin signos de cirrosis."),
    act("estigmas", "Estigmas de hepatopatía crónica", "clave", "No hay arañas vasculares ni eritema palmar.", "Sin cirrosis clínica."),
    act("cintura", "Cintura", "util", "106 cm.", "Obesidad abdominal."),
  ],
  studies: [
    study("Laboratorio", "lab", "Hepatograma, plaquetas, albúmina, RIN, serologías de hepatitis B y C", "clave", "TGP 78, TGO 52, plaquetas 220.000, serologías negativas.", "Patrón de hígado graso; descarta virus."),
    study("Otros", "fib4", "FIB-4 y elastografía hepática", "clave", "FIB-4 1,6 (intermedio); elastografía 9,2 kPa.", "Estimación de fibrosis: fibrosis significativa probable."),
    study("Otros", "biopsia", "Biopsia hepática de rutina", "innecesario", "No se realizó.", "Se reserva para dudas diagnósticas o casos seleccionados."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("masld", "Enfermedad hepática grasa asociada a disfunción metabólica (MASLD), con probable fibrosis significativa", true, "Esteatosis en ecografía con transaminasas elevadas, diabetes y obesidad, sin alcohol ni virus, con elastografía elevada."),
      dx("alcoholica", "Hepatopatía alcohólica", false, "No toma alcohol."),
      dx("hepatitis-c", "Hepatitis C crónica", false, "Serología negativa."),
      dx("cirrosis", "Cirrosis descompensada", false, "Sin signos de hipertensión portal ni insuficiencia hepática."),
      dx("autoinmune", "Hepatitis autoinmune", false, "Contexto metabólico; se estudia si hay dudas."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("peso", "Descenso de peso de 7–10 % con dieta y actividad física", "clave", "Reduce la esteatosis, la inflamación y la fibrosis."),
      mg("diabetes", "Mejorar el control de la diabetes priorizando fármacos con beneficio hepático y de peso (agonistas de GLP-1 o pioglitazona)", "clave", "Tratan la causa metabólica."),
      mg("suplementos", "Suspender los yuyos para adelgazar", "clave", "Riesgo de toxicidad hepática."),
      mg("vacunas", "Vacunar contra hepatitis A y B", "util", "Protege un hígado enfermo."),
      mg("hepatoprotector", "Hepatoprotectores de venta libre", "innecesario", "Sin eficacia demostrada."),
      mg("alcohol-poco", "Indicar que puede tomar alcohol con moderación", "riesgoso", "Con fibrosis, cualquier alcohol empeora el daño."),
    ],
  },
  debrief: {
    diagnosis: "Enfermedad hepática grasa asociada a disfunción metabólica (MASLD) con probable fibrosis significativa, en mujer de 49 años con diabetes tipo 2 mal controlada y obesidad.",
    pathologies: [
      { name: "Hígado graso metabólico (MASLD)", role: "principal", why: "Esteatosis con factores metabólicos." },
      { name: "Diabetes tipo 2 y obesidad", role: "asociada", why: "Causa y factor de progresión." },
      { name: "Hepatopatía alcohólica, viral, autoinmune", role: "diferencial", why: "Se descartan." },
    ],
    reasoning: [
      "Causa: resistencia a la insulina con obesidad y diabetes.",
      "Mecanismo: llegan al hígado más ácidos grasos de los que puede oxidar; la grasa genera estrés oxidativo e inflamación (esteatohepatitis).",
      "Consecuencia: fibrosis progresiva, cirrosis, hepatocarcinoma y aumento del riesgo cardiovascular.",
    ],
    epidemiology:
      "El hígado graso metabólico es la enfermedad hepática más frecuente en el mundo y en Argentina, con una prevalencia de alrededor del 25–30 % en adultos y mucho mayor en diabéticos y obesos. Es una causa creciente de cirrosis y trasplante.",
    management: [
      "Descartar otras causas (alcohol, virus, fármacos).",
      "Estimar la fibrosis con FIB-4 y elastografía.",
      "Descenso de peso y control metabólico.",
      "Seguimiento según fibrosis; rastreo de hepatocarcinoma si hay cirrosis.",
    ],
    sources: ["Sociedad Argentina de Hepatología — Consenso de enfermedad hepática grasa.", "Guía multisocietaria internacional de MASLD."],
    pearls: ["Diabético con transaminasas altas = pensar hígado graso.", "FIB-4 para estratificar.", "Bajar 7–10 % del peso."],
    pitfalls: ["Decir que es benigno sin evaluar fibrosis.", "Indicar hepatoprotectores."],
    tribunal: [
      qa("¿Qué es el FIB-4?", "Un índice que estima la fibrosis hepática con edad, TGO, TGP y plaquetas; menor de 1,3 indica bajo riesgo de fibrosis avanzada, mayor de 2,67 alto riesgo, y los intermedios requieren elastografía."),
      qa("¿Por qué se cambió el nombre de NAFLD a MASLD?", "Para definirla por la presencia de factores metabólicos (obesidad, diabetes, dislipemia, hipertensión) y no por la exclusión del alcohol, y para reducir el estigma del término “graso”."),
      qa("¿Cuál es la principal causa de muerte en personas con hígado graso?", "La enfermedad cardiovascular, seguida por cánceres extrahepáticos y, en quienes tienen fibrosis avanzada, la enfermedad hepática."),
    ],
  },
};
