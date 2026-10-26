import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const dm2: ClinicalCase = {
  id: "diabetes-tipo-2-diagnostico",
  level: 1,
  area: "Endocrinología",
  setting: "Consultorio",
  patient: { age: 48, ageUnit: "años", sex: "M", context: "Chofer de colectivo. Viene por el apto laboral." },
  frequency: "muy-frecuente",
  intro: "“Me hicieron análisis para el trabajo y me dijeron que tenía el azúcar alto. Yo me siento bien, capaz tomo más agua que antes.”",
  vitals: { TA: "142/88 mmHg", FC: "80 lpm", Peso: "98 kg (talla 1,74 m; IMC 32)", Glucemia: "Ayunas: 148 mg/dl (informe del laboratorio)" },
  anamnesis: [
    act("sintomas", "¿Orina más, tiene más sed o bajó de peso sin querer?", "clave", "“Tomo mucha agua y me levanto a orinar de noche. Peso no bajé.”", "Poliuria y polidipsia son síntomas de hiperglucemia; la pérdida de peso marcada orientaría a déficit importante de insulina."),
    act("familia", "¿Hay diabetes en la familia?", "clave", "“Mi mamá y un tío son diabéticos.”", "El antecedente de primer grado es factor de riesgo fuerte de DM2."),
    act("habitos", "¿Fuma? ¿Hace actividad física? ¿Cómo se alimenta?", "clave", "“Fumo diez por día. Trabajo sentado doce horas, como en la calle y tomo gaseosa.”", "Sedentarismo, mala alimentación y tabaco son blancos de tratamiento; el tabaco suma riesgo cardiovascular."),
    act("complicaciones", "¿Ve borroso, tiene hormigueos en los pies o heridas que no cierran?", "clave", "“A veces se me duermen los pies a la noche.”", "La DM2 puede llevar años sin diagnóstico: hay que buscar complicaciones desde el primer día."),
    act("medicacion", "¿Toma alguna medicación?", "util", "“Nada.”", "Corticoides, tiazidas o antipsicóticos pueden elevar la glucemia."),
    act("cardio", "¿Tuvo dolor de pecho o le falta el aire al caminar?", "util", "“No.”", "La diabetes es un equivalente de riesgo coronario; buscar enfermedad cardiovascular establecida cambia el tratamiento."),
    act("sexual", "¿Tiene problemas de erección?", "util", "“Algo, últimamente.”", "La disfunción eréctil puede ser marcador de enfermedad vascular o neuropatía."),
    act("hobby", "¿Qué hace en su tiempo libre?", "neutro", "“Miro fútbol.”", "No orienta, aunque abre la charla sobre actividad física."),
  ],
  exam: [
    act("cintura", "Perímetro de cintura", "clave", "112 cm.", "Obesidad central: marcador de insulinorresistencia y de riesgo cardiovascular (varón > 102 cm)."),
    act("pies", "Examen de pies: monofilamento, pulsos y piel", "clave", "Sensibilidad con monofilamento disminuida en ambos hallux. Pulsos pedios presentes. Sin lesiones.", "Detecta neuropatía periférica y riesgo de pie diabético: se hace en cada control."),
    act("acantosis", "Inspección de cuello y axilas", "util", "Acantosis nigricans en la nuca.", "Signo cutáneo de insulinorresistencia."),
    act("fondo", "Fondo de ojo", "util", "Sin lesiones visibles con oftalmoscopio directo; se deriva para fondo de ojo dilatado.", "La retinopatía se busca al diagnóstico en DM2."),
    act("tiroides", "Palpación tiroidea", "neutro", "Normal.", "No aporta a este cuadro."),
  ],
  studies: [
    study("Laboratorio", "glucemia2", "Segunda glucemia en ayunas", "clave", "152 mg/dl.", "Dos glucemias en ayunas ≥ 126 mg/dl confirman el diagnóstico (sin hiperglucemia inequívoca hace falta repetir)."),
    study("Laboratorio", "hba1c", "Hemoglobina glicosilada (HbA1c)", "clave", "7,6 %.", "Refleja el control de los últimos 3 meses y fija la meta; ≥ 6,5 % también es criterio diagnóstico con método estandarizado."),
    study("Laboratorio", "lipidos", "Perfil lipídico", "clave", "Colesterol total 232, LDL 148, HDL 36, triglicéridos 240 mg/dl.", "Define el tratamiento hipolipemiante: en diabéticos de esta edad se indican estatinas."),
    study("Laboratorio", "renal", "Creatinina con filtrado glomerular y albuminuria (índice albúmina/creatinina)", "clave", "Filtrado 92 ml/min; albuminuria 45 mg/g.", "Detecta nefropatía diabética temprana y condiciona la elección de fármacos."),
    study("Electrofisiología", "ecg", "Electrocardiograma", "util", "Ritmo sinusal, sin alteraciones.", "Basal en diabético con factores de riesgo."),
    study("Laboratorio", "peptidoc", "Péptido C y anticuerpos anti-GAD", "innecesario", "No se pidieron.", "Solo si hay dudas de DM1 o LADA (delgado, joven, pérdida de peso, cetosis)."),
    study("Laboratorio", "ptog", "Prueba de tolerancia oral a la glucosa", "innecesario", "No se realizó.", "No hace falta si ya hay dos glucemias en ayunas diagnósticas."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("dm2", "Diabetes mellitus tipo 2", true, "Dos glucemias en ayunas ≥ 126 mg/dl y HbA1c 7,6 %, en un adulto con obesidad central, antecedente familiar e insulinorresistencia."),
      dx("prediabetes", "Glucemia alterada en ayunas (prediabetes)", false, "Es entre 100 y 125 mg/dl; acá supera el umbral diagnóstico en dos ocasiones."),
      dx("dm1", "Diabetes tipo 1 de inicio adulto (LADA)", false, "Pensarla en adultos delgados, con pérdida de peso o mala respuesta a orales; acá todo orienta a DM2."),
      dx("estres", "Hiperglucemia por estrés", false, "Ocurre en enfermedades agudas; este paciente está estable y la HbA1c muestra hiperglucemia sostenida."),
      dx("metabolico", "Síndrome metabólico sin diabetes", false, "Tiene síndrome metabólico, pero además cumple criterios de diabetes."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("habitos", "Plan alimentario, actividad física 150 min por semana y meta de bajar 5–10 % del peso", "clave", "Es el pilar del tratamiento y mejora glucemia, presión y lípidos."),
      mg("metformina", "Metformina, empezando con 500 mg con la cena y titulando", "clave", "Fármaco de primera línea: eficaz, sin hipoglucemias, neutro en peso, barato y disponible en el primer nivel."),
      mg("estatina", "Estatina de moderada a alta intensidad", "clave", "Diabético de 40 años o más con otros factores de riesgo: reduce eventos cardiovasculares."),
      mg("tabaco", "Consejería para dejar de fumar", "clave", "Es la intervención que más reduce el riesgo cardiovascular."),
      mg("controles", "Fondo de ojo, examen de pies y albuminuria anuales; vacunas antigripal y antineumocócica", "util", "Detección temprana de complicaciones y prevención de infecciones según el Calendario Nacional."),
      mg("insulina", "Insulina basal de entrada", "innecesario", "Se reserva para HbA1c muy alta (> 10 %), síntomas catabólicos o cetosis."),
      mg("sulfonilurea", "Glibenclamida como monoterapia inicial", "innecesario", "No es primera elección: aumenta el peso y el riesgo de hipoglucemias, peligrosas en un chofer."),
    ],
  },
  debrief: {
    diagnosis: "Diabetes mellitus tipo 2 de reciente diagnóstico, con obesidad, dislipemia, presión elevada, neuropatía periférica y albuminuria moderada.",
    pathologies: [
      { name: "Diabetes mellitus tipo 2", role: "principal", why: "Dos glucemias en ayunas ≥ 126 mg/dl." },
      { name: "Síndrome metabólico", role: "asociada", why: "Obesidad central, triglicéridos altos, HDL bajo, TA elevada e hiperglucemia." },
      { name: "Neuropatía periférica diabética", role: "asociada", why: "Monofilamento alterado: la diabetes llevaba años sin diagnóstico." },
      { name: "Enfermedad renal diabética incipiente", role: "asociada", why: "Albuminuria moderada (30–300 mg/g)." },
      { name: "Diabetes tipo 1 de inicio adulto", role: "diferencial", why: "A considerar si fuera delgado o con pérdida de peso." },
    ],
    reasoning: [
      "Causa: predisposición genética más obesidad visceral y sedentarismo.",
      "Mecanismo: el tejido adiposo visceral libera ácidos grasos y citoquinas que generan resistencia a la insulina en músculo e hígado. El páncreas compensa con más insulina hasta que la célula beta se agota (disfunción progresiva).",
      "Consecuencia: hiperglucemia → glucosuria con diuresis osmótica (poliuria, polidipsia). A largo plazo, la glicación y el estrés oxidativo dañan la microcirculación (retina, riñón, nervio) y aceleran la aterosclerosis.",
      "Como la hiperglucemia leve no da síntomas, muchos pacientes ya tienen complicaciones al momento del diagnóstico.",
    ],
    epidemiology:
      "Según la 4.ª Encuesta Nacional de Factores de Riesgo, alrededor del 12 % de los adultos argentinos tiene glucemia elevada o diabetes, y cerca de la mitad no lo sabe. Aumenta con la edad (pico después de los 45), la obesidad y el sedentarismo, y es algo más frecuente en varones. La DM2 representa el 90 % de las diabetes.",
    management: [
      "Confirmar el diagnóstico (dos glucemias en ayunas ≥ 126, HbA1c ≥ 6,5 %, PTOG ≥ 200 a las 2 h o glucemia ≥ 200 con síntomas).",
      "Evaluación inicial: HbA1c, perfil lipídico, función renal y albuminuria, ECG, fondo de ojo y examen de pies.",
      "Cambios de hábitos y metformina como primera línea; meta de HbA1c individualizada (en general < 7 %).",
      "Control del riesgo cardiovascular: estatinas, presión arterial < 130/80 (IECA o ARA II si hay albuminuria), cesación tabáquica.",
      "Seguimiento en el primer nivel con educación diabetológica; vacunas antigripal y antineumocócica.",
    ],
    sources: [
      "Ministerio de Salud de la Nación — Guía de práctica clínica nacional sobre prevención, diagnóstico y tratamiento de la diabetes mellitus tipo 2.",
      "Sociedad Argentina de Diabetes — Recomendaciones de tratamiento farmacológico en DM2.",
      "4.ª Encuesta Nacional de Factores de Riesgo (INDEC – Ministerio de Salud).",
    ],
    pearls: [
      "Una sola glucemia ≥ 200 con síntomas clásicos alcanza; sin síntomas, siempre se confirma.",
      "Metformina: suspenderla si el filtrado cae debajo de 30 o antes de contraste iodado en pacientes con riesgo.",
      "En DM2, desde el diagnóstico se buscan complicaciones: ya pueden estar.",
    ],
    pitfalls: ["Diagnosticar con una única glucemia sin síntomas.", "Olvidar la estatina.", "Tratar solo el azúcar y no el riesgo cardiovascular global."],
  },
};
