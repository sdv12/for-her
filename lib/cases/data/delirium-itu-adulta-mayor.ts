import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const deliriumItuAdultaMayor: ClinicalCase = {
  id: "delirium-itu-adulta-mayor",
  level: 3,
  area: "Neurología",
  setting: "Guardia",
  patient: { age: 82, ageUnit: "años", sex: "F", context: "Vive con la hija. Independiente, hace las compras. Toma oxibutinina para la incontinencia desde hace un mes." },
  frequency: "muy-frecuente",
  intro: "La hija: “Desde ayer está rarísima: no me reconoce de a ratos, dice que hay gente en la casa y a la noche se quiso ir.”",
  vitals: { TA: "108/64 mmHg", FC: "102 lpm", FR: "20 rpm", "SatO₂": "95 %", "T°": "37,8 °C", Glucemia: "118 mg/dl" },
  anamnesis: [
    act("inicio", "¿Cómo era antes y cuándo cambió?", "clave", "“Perfecta hasta antes de ayer.”", "Inicio agudo: delirium, no demencia."),
    act("fluctuacion", "¿Está igual todo el día?", "clave", "“A la mañana mejor, a la noche peor.”", "Fluctuación."),
    act("orina", "¿Orina con olor, ardor, más seguido?", "clave", "“Huele fuerte y se hizo encima.”", "Posible ITU."),
    act("farmacos", "¿Qué medicación nueva toma?", "clave", "“Oxibutinina hace un mes.”", "Anticolinérgico: precipitante de delirium."),
    act("caidas", "¿Se cayó o golpeó la cabeza?", "util", "“No.”", "Hematoma subdural."),
    act("novela", "¿Qué le gusta mirar?", "neutro", "“Novelas.”", "No orienta."),
  ],
  exam: [
    act("cam", "CAM (Confusion Assessment Method)", "clave", "Inicio agudo y fluctuación, inatención (no puede decir los meses al revés), pensamiento desorganizado.", "CAM positivo."),
    act("neuro", "Examen neurológico", "clave", "Sin foco, sin rigidez de nuca.", "Sin ACV ni meningitis evidentes."),
    act("globo", "Globo vesical", "clave", "Globo vesical palpable; sondaje con 600 ml.", "Retención urinaria por anticolinérgico."),
    act("hidratacion", "Hidratación", "util", "Mucosas secas.", "Deshidratación."),
  ],
  studies: [
    study("Laboratorio", "orina", "Orina completa y urocultivo", "clave", "Leucocituria, nitritos; E. coli.", "ITU."),
    study("Laboratorio", "lab", "Hemograma, ionograma, glucemia, calcio, función renal", "clave", "Leucocitos 13.000, sodio 132, urea 64.", "Precipitantes metabólicos."),
    study("Imágenes", "rx", "Radiografía de tórax", "util", "Normal.", "Neumonía."),
    study("Imágenes", "tac", "TC de cerebro", "util", "Atrofia, sin sangrado.", "Razonable si hay caída, foco o anticoagulación; acá descarta subdural."),
    study("Otros", "bacteriuria-sola", "Tratar con antibiótico solo por una tira reactiva positiva sin otros datos", "riesgoso", "No se hizo así.", "La bacteriuria asintomática es frecuente en mayores y lleva a sobretratamiento."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("delirium", "Delirium hiperactivo multifactorial: ITU febril, retención urinaria por oxibutinina y deshidratación", true, "Inicio agudo, fluctuación e inatención (CAM positivo) con fiebre, urocultivo positivo, globo vesical y anticolinérgico nuevo."),
      dx("demencia", "Demencia", false, "Funcionaba bien hasta hace 2 días."),
      dx("psicosis", "Psicosis de inicio tardío", false, "Hay inatención y causa orgánica."),
      dx("acv", "ACV", false, "Sin foco y TC sin lesiones agudas."),
      dx("depresion", "Depresión", false, "Inicio agudo con fluctuación."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("causas", "Tratar las causas: antibiótico, sonda transitoria e hidratación", "clave", "El tratamiento del delirium es el de la causa."),
      mg("suspender-oxibutinina", "Suspender la oxibutinina", "clave", "Anticolinérgico."),
      mg("no-farmacologico", "Medidas no farmacológicas: familiar presente, anteojos, audífonos, reloj, luz de día", "clave", "Primera línea."),
      mg("haloperidol-bajo", "Haloperidol en dosis bajas solo si hay riesgo para ella o terceros", "util", "Uso puntual."),
      mg("bzd", "Lorazepam para que duerma", "riesgoso", "Empeora el delirium en mayores."),
      mg("sujecion", "Sujeción mecánica de rutina", "riesgoso", "Aumenta la agitación, las lesiones y la duración."),
    ],
  },
  debrief: {
    diagnosis: "Delirium hiperactivo multifactorial por ITU febril, retención urinaria por oxibutinina y deshidratación, en una mujer de 82 años.",
    pathologies: [
      { name: "Delirium", role: "principal", why: "Disfunción cerebral aguda." },
      { name: "ITU, retención urinaria y deshidratación", role: "asociada", why: "Precipitantes." },
      { name: "Demencia, psicosis", role: "diferencial", why: "Cuadros crónicos o sin inatención." },
    ],
    reasoning: [
      "Causa: varios precipitantes sobre un cerebro envejecido.",
      "Mecanismo: déficit colinérgico e inflamación sistémica que alteran la neurotransmisión.",
      "Consecuencia: más mortalidad, caídas, internación prolongada y deterioro cognitivo posterior.",
    ],
    epidemiology:
      "Afecta al 10–30 % de los mayores que consultan en guardia y a más de la mitad de los internados en algunas series. Más de la mitad no se diagnostica. Los fármacos anticolinérgicos son un precipitante prevenible frecuente.",
    management: [
      "CAM.",
      "Buscar todas las causas.",
      "Revisar fármacos.",
      "Medidas no farmacológicas.",
    ],
    sources: ["Sociedad Argentina de Gerontología y Geriatría — Delirium.", "NICE — Delirium: prevention, diagnosis and management (CG103)."],
    pearls: ["Agudo + fluctuante + inatención.", "Revisá los anticolinérgicos.", "Siempre buscá el globo vesical."],
    pitfalls: ["Benzodiacepinas.", "Atribuirlo a 'la edad'."],
    tribunal: [
      qa("¿Qué evalúa el CAM?", "Inicio agudo y curso fluctuante, inatención, y pensamiento desorganizado o alteración del nivel de conciencia."),
      qa("¿Qué fármacos precipitan delirium en mayores?", "Anticolinérgicos, benzodiacepinas, opioides, antihistamínicos, corticoides y antiparkinsonianos."),
      qa("¿Qué diferencia el delirium de la demencia?", "El delirium es agudo, fluctuante, con inatención y suele ser reversible; la demencia es progresiva y la atención se conserva al inicio."),
    ],
  },
};
