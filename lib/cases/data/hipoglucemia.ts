import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const hipoglucemia: ClinicalCase = {
  id: "hipoglucemia-sulfonilurea",
  level: 4,
  area: "Endocrinología",
  setting: "Guardia",
  patient: { age: 79, ageUnit: "años", sex: "F", context: "Llega en ambulancia con “código ACV”. Diabética e hipertensa." },
  frequency: "frecuente",
  intro: "“La encontramos a la mañana en la cama, confundida, transpirando, y no movía bien el brazo izquierdo. Ayer estaba bien, aunque estuvo engripada y casi no comió.” (relata la nieta)",
  vitals: { TA: "158/86 mmHg", FC: "102 lpm", FR: "18 rpm", "T°": "36,1 °C", "SatO₂": "96 %", Glasgow: "13 (O4 V4 M5)" },
  anamnesis: [
    act("medicacion", "¿Qué medicación toma para la diabetes?", "clave", "“Glibenclamida 5 mg dos veces por día y metformina.”", "Las sulfonilureas (sobre todo la glibenclamida) causan hipoglucemias graves y prolongadas en adultos mayores, sobre todo si comen poco o tienen la función renal disminuida."),
    act("ingesta", "¿Cuánto comió en los últimos días?", "clave", "“Casi nada desde anteayer por la gripe, pero siguió tomando las pastillas.”", "Seguir con la sulfonilurea sin comer es el desencadenante típico."),
    act("hora", "¿A qué hora la vieron bien por última vez?", "clave", "“Anoche a las 22, cuando se acostó.”", "Necesario para el código ACV, pero antes hay que descartar los imitadores."),
    act("rinones", "¿Le dijeron que tiene problemas en los riñones?", "util", "“Sí, que le funcionaban un poco menos.”", "La insuficiencia renal prolonga el efecto de la glibenclamida y sus metabolitos."),
    act("previas", "¿Tuvo episodios de temblor, sudor o hambre de repente?", "util", "“A veces se sentía rara a la tarde y comía algo dulce.”", "Hipoglucemias previas no reconocidas: la glibenclamida no es adecuada para ella."),
    act("caida", "¿Se golpeó la cabeza?", "util", "“No que sepamos.”", "Un traumatismo podría causar un hematoma subdural."),
    act("novela", "¿Qué le gusta hacer?", "neutro", "“Tejer.”", "No orienta."),
  ],
  exam: [
    act("glucemia-cap", "Glucemia capilar (antes de cualquier otra cosa)", "clave", "38 mg/dl.", "Todo paciente con alteración neurológica aguda necesita una glucemia capilar inmediata: la hipoglucemia puede imitar un ACV, incluso con déficit focal."),
    act("neuro", "Examen neurológico", "clave", "Confusa, paresia braquial izquierda leve, sin desviación de la mirada.", "Un déficit focal no descarta hipoglucemia: se reevalúa tras corregirla."),
    act("piel", "Piel", "util", "Sudorosa, fría.", "La sudoración es un síntoma adrenérgico de hipoglucemia (puede faltar en ancianos o con betabloqueantes)."),
    act("cabeza", "Inspección de cráneo", "util", "Sin signos de traumatismo.", "Hace menos probable un hematoma."),
  ],
  studies: [
    study("Laboratorio", "glucemia", "Glucemia plasmática confirmatoria", "util", "36 mg/dl.", "Confirma; no debe demorar el tratamiento."),
    study("Laboratorio", "renal", "Creatinina, ionograma y hepatograma", "clave", "Creatinina 1,8 mg/dl (clearance 26 ml/min), K 3,8.", "Insuficiencia renal: explica la hipoglucemia prolongada y contraindica la metformina con este filtrado."),
    study("Imágenes", "tc", "Tomografía de cerebro", "util", "Sin lesiones agudas.", "Se hace si el déficit persiste tras corregir la glucemia; en este caso se pidió en el código ACV."),
    study("Laboratorio", "insulina", "Insulina y péptido C", "innecesario", "No se realizó.", "Se piden en hipoglucemias sin causa (insulinoma); acá la causa es clara."),
    study("Otros", "trombolisis", "Activar trombólisis sin glucemia", "riesgoso", "No se realizó.", "Trombolizar a una paciente hipoglucémica expone a sangrado sin beneficio: la glucemia capilar es el primer paso del código ACV."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hipo", "Hipoglucemia grave por sulfonilurea (glibenclamida) con insuficiencia renal y baja ingesta, simulando un ACV", true, "Glucemia de 38 mg/dl con síntomas neuroglucopénicos y adrenérgicos, en una diabética con glibenclamida, ayuno e insuficiencia renal."),
      dx("acv", "ACV isquémico derecho", false, "Hay que considerarlo, pero con glucemia de 38 primero se corrige: si el déficit revierte, era la hipoglucemia."),
      dx("hhs", "Estado hiperglucémico hiperosmolar", false, "También da confusión en ancianos diabéticos, pero con glucemias muy altas (> 600)."),
      dx("sepsis", "Sepsis por la gripe con encefalopatía", false, "Puede causar hipoglucemia, pero no hay fiebre ni signos de sepsis y la causa farmacológica es evidente."),
      dx("subdural", "Hematoma subdural", false, "Requiere en general traumatismo o anticoagulación, y no explica la glucemia."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("dextrosa", "Dextrosa hipertónica endovenosa de inmediato (por ejemplo, 25 g: 50 ml al 50 % o equivalente al 10 %)", "clave", "Corrige rápido la neuroglucopenia. Con alteración de conciencia, nunca por boca."),
      mg("infusion", "Infusión continua de dextrosa al 10 % y glucemias cada hora; internación por al menos 24–72 h", "clave", "La glibenclamida tiene efecto prolongado (más con insuficiencia renal): la hipoglucemia recurre tras el bolo."),
      mg("suspender", "Suspender la glibenclamida y la metformina; replantear el tratamiento al alta", "clave", "En adultos mayores con insuficiencia renal se prefieren fármacos sin riesgo de hipoglucemia y metas de HbA1c menos estrictas."),
      mg("glucagon", "Glucagón intramuscular si no hay acceso venoso", "util", "Alternativa rápida; es menos eficaz con sulfonilureas y en desnutridos."),
      mg("alta", "Alta cuando se despierta tras el bolo de dextrosa", "riesgoso", "Con sulfonilureas la hipoglucemia vuelve en horas: puede ser mortal en su casa."),
      mg("oral", "Darle agua con azúcar por boca", "riesgoso", "Con alteración de conciencia hay riesgo de aspiración."),
      mg("tiamina", "Tiamina endovenosa antes de la glucosa", "util", "Se indica en pacientes con alcoholismo o desnutrición para evitar la encefalopatía de Wernicke; no debe retrasar la glucosa."),
    ],
  },
  debrief: {
    diagnosis: "Hipoglucemia grave por glibenclamida en adulta mayor con insuficiencia renal y baja ingesta, con déficit neurológico focal que simuló un ACV.",
    pathologies: [
      { name: "Hipoglucemia grave por sulfonilurea", role: "principal", why: "Glucemia de 38 mg/dl con neuroglucopenia." },
      { name: "Enfermedad renal crónica", role: "asociada", why: "Prolonga el efecto de la glibenclamida y contraindica la metformina." },
      { name: "Infección viral (gripe) con ayuno", role: "asociada", why: "Desencadenante." },
      { name: "ACV isquémico", role: "diferencial", why: "El gran imitador inverso: la hipoglucemia simula un ACV." },
      { name: "Estado hiperglucémico hiperosmolar", role: "diferencial", why: "Otra descompensación diabética con confusión." },
    ],
    reasoning: [
      "Causa: la glibenclamida estimula la secreción de insulina independientemente de la glucemia; si la paciente no come, la insulina sigue saliendo.",
      "Mecanismo: la glibenclamida y sus metabolitos activos se eliminan por riñón; con un filtrado de 26 ml/min se acumulan y el efecto dura más de 24 h.",
      "Consecuencia: primero síntomas adrenérgicos (sudor, temblor, taquicardia, hambre) y luego neuroglucopénicos (confusión, conducta extraña, convulsiones, coma). El cerebro depende de la glucosa y puede dar déficits focales que revierten al corregirla.",
      "En adultos mayores los síntomas de alarma pueden faltar (hipoglucemia inadvertida), y la hipoglucemia grave aumenta el riesgo de caídas, arritmias y deterioro cognitivo.",
    ],
    epidemiology:
      "La hipoglucemia grave es una de las causas más frecuentes de consulta en guardia por efectos adversos de medicamentos en adultos mayores, junto con los anticoagulantes. Se concentra en mayores de 75 años con insulina o sulfonilureas, insuficiencia renal, polifarmacia, desnutrición o vida en soledad. En la Argentina la glibenclamida sigue siendo muy usada por su bajo costo, aunque las guías desaconsejan su uso en ancianos.",
    management: [
      "Ante toda alteración neurológica aguda: glucemia capilar inmediata.",
      "Consciente y puede tragar: 15–20 g de hidratos de carbono por boca; con conciencia alterada: dextrosa endovenosa (o glucagón IM).",
      "Hipoglucemia por sulfonilurea: infusión continua de dextrosa, controles horarios e internación prolongada (octreotide en refractarias).",
      "Buscar el desencadenante (ayuno, infección, insuficiencia renal, interacciones).",
      "Al alta: suspender la sulfonilurea, simplificar el tratamiento, metas de HbA1c menos estrictas en el adulto mayor y educar a la familia.",
    ],
    sources: [
      "Sociedad Argentina de Diabetes — Recomendaciones sobre hipoglucemia y tratamiento de la diabetes en el adulto mayor.",
      "Ministerio de Salud de la Nación — Guía de práctica clínica nacional de diabetes mellitus tipo 2.",
    ],
    pearls: [
      "Código ACV: lo primero es la glucemia capilar.",
      "Hipoglucemia por sulfonilurea = internar: vuelve.",
      "Glibenclamida en ancianos con insuficiencia renal: no.",
    ],
    pitfalls: ["Dar el alta tras el bolo.", "Dar azúcar por boca a una paciente confusa.", "Seguir el código ACV sin mirar la glucemia."],
  },
};
