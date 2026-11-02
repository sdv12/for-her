import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const estadoHiperosmolar: ClinicalCase = {
  id: "estado-hiperosmolar-hiperglucemico",
  level: 3,
  area: "Endocrinología",
  setting: "Guardia",
  patient: { age: 81, ageUnit: "años", sex: "F", context: "Diabética tipo 2 con metformina. Vive sola. Hace calor hace una semana." },
  frequency: "poco-frecuente",
  intro: "“La encontré en la cama muy dormida, no me reconoce. Hace días orina mucho y toma poca agua, decía que estaba cansada.” (relata la vecina)",
  vitals: { TA: "92/56 mmHg", FC: "116 lpm", FR: "20 rpm", "T°": "37,6 °C", "SatO₂": "95 %", Glucemia: "HI (más de 600 mg/dl)", Glasgow: "10/15" },
  anamnesis: [
    act("tiempo", "¿Desde cuándo está así?", "clave", "“Hace una semana orina mucho; hoy no la pude despertar bien.”", "Evolución de días: típica del estado hiperosmolar, a diferencia de las horas de la cetoacidosis."),
    act("infeccion", "¿Tuvo fiebre, tos o ardor al orinar?", "clave", "“Tos con catarro hace unos días.”", "La infección es el desencadenante más común."),
    act("medicacion", "¿Toma bien la medicación? ¿Le dieron algo nuevo?", "util", "“No sé si la toma, vive sola.”", "Abandono del tratamiento y fármacos (corticoides, diuréticos) son desencadenantes."),
    act("agua", "¿Tiene acceso fácil al agua? ¿Camina sola?", "clave", "“Camina poco por la cadera, y no toma agua para no levantarse al baño.”", "La falta de acceso al agua en adultos mayores es clave en la deshidratación grave."),
    act("convulsiones", "¿Convulsionó o movió un lado menos?", "util", "“No vi nada.”", "El EHH puede dar convulsiones y déficit focales."),
    act("gato", "¿Tiene mascotas?", "neutro", "“Un gato.”", "No orienta."),
  ],
  exam: [
    act("deshidratacion", "Signos de deshidratación", "clave", "Mucosas muy secas, signo del pliegue positivo, ojos hundidos.", "Deshidratación grave."),
    act("neuro", "Examen neurológico", "clave", "Somnolienta, responde a estímulos dolorosos, sin foco motor.", "Alteración de la conciencia por hiperosmolaridad."),
    act("pulmon", "Auscultación pulmonar", "clave", "Rales crepitantes en base izquierda.", "Neumonía: desencadenante."),
    act("kussmaul", "Patrón respiratorio y aliento", "util", "Respiración normal, sin aliento cetónico.", "Sin cetoacidosis significativa."),
  ],
  studies: [
    study("Laboratorio", "lab", "Glucemia, ionograma, urea, creatinina, osmolaridad", "clave", "Glucemia 980, Na 148, urea 120, creatinina 2,4; osmolaridad efectiva 347.", "Glucemia mayor de 600 y osmolaridad mayor de 320: criterios de EHH."),
    study("Laboratorio", "gases", "Gases y cetonemia", "clave", "pH 7,34, bicarbonato 20, cetonemia leve.", "Sin cetoacidosis: diferencia con la CAD."),
    study("Imágenes", "rx", "Radiografía de tórax", "util", "Infiltrado en base izquierda.", "Neumonía."),
    study("Microbiología", "cultivos", "Hemocultivos y urocultivo", "util", "Pendientes.", "Antes del antibiótico."),
    study("Imágenes", "rmn", "Resonancia de cerebro antes de hidratar", "innecesario", "No se realizó.", "Sin foco, demora el tratamiento."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("ehh", "Estado hiperosmolar hiperglucémico desencadenado por neumonía, con insuficiencia renal prerrenal", true, "Diabética tipo 2 añosa con días de poliuria, deshidratación grave, alteración de la conciencia, glucemia de 980 y osmolaridad de 347 sin acidosis importante."),
      dx("cad", "Cetoacidosis diabética", false, "El pH y el bicarbonato son casi normales y la cetonemia es leve."),
      dx("acv", "ACV", false, "No hay foco y la hiperosmolaridad explica la conciencia."),
      dx("hipoglucemia", "Hipoglucemia", false, "La glucemia está muy alta."),
      dx("sepsis-sola", "Sepsis sin alteración metabólica", false, "La glucemia y la osmolaridad son las del EHH."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("fluidos", "Hidratación con solución fisiológica (1 litro en la primera hora) y luego según sodio corregido y volemia", "clave", "El déficit de agua es enorme (8–12 litros) y la hidratación sola ya baja la glucemia."),
      mg("insulina", "Insulina en infusión a dosis bajas una vez iniciada la hidratación y con potasio mayor de 3,3", "clave", "Baja la glucemia de forma gradual."),
      mg("lento", "Bajar la osmolaridad y el sodio en forma gradual (no más de 3–8 mOsm/kg/h)", "clave", "Evita el edema cerebral."),
      mg("atb", "Antibiótico para la neumonía", "clave", "Trata el desencadenante."),
      mg("heparina", "Profilaxis de trombosis", "util", "La hiperosmolaridad y la inmovilidad aumentan el riesgo trombótico."),
      mg("insulina-bolo", "Insulina en dosis altas antes de hidratar", "riesgoso", "Mete agua y glucosa en las células y puede producir colapso circulatorio."),
    ],
  },
  debrief: {
    diagnosis: "Estado hiperosmolar hiperglucémico desencadenado por neumonía de la comunidad, con deshidratación grave e insuficiencia renal prerrenal, en mujer de 81 años con diabetes tipo 2 que vive sola.",
    pathologies: [
      { name: "Estado hiperosmolar hiperglucémico", role: "principal", why: "Hiperglucemia extrema e hiperosmolaridad sin cetoacidosis." },
      { name: "Neumonía e insuficiencia renal prerrenal", role: "asociada", why: "Desencadenante y consecuencia." },
      { name: "Cetoacidosis, ACV, sepsis", role: "diferencial", why: "Otras causas de alteración de la conciencia en diabéticos." },
    ],
    reasoning: [
      "Causa: una infección aumenta las hormonas contrarreguladoras en una diabética tipo 2 con poco acceso al agua.",
      "Mecanismo: hay algo de insulina (suficiente para frenar la cetogénesis), pero la glucemia sube; la diuresis osmótica pierde agua y la falta de ingesta impide compensar.",
      "Consecuencia: deshidratación extrema, hiperosmolaridad que deshidrata las neuronas (confusión, coma, convulsiones), insuficiencia renal y trombosis.",
    ],
    epidemiology:
      "El estado hiperosmolar es menos frecuente que la cetoacidosis, pero su mortalidad es mayor (10–20 %). Afecta sobre todo a adultos mayores con diabetes tipo 2, a veces sin diagnóstico previo, institucionalizados o que viven solos, con infecciones o en olas de calor.",
    management: [
      "Hidratación agresiva con control del sodio corregido y la osmolaridad.",
      "Insulina en infusión cuando la hidratación no baja más la glucemia, con potasio controlado.",
      "Tratar el desencadenante y prevenir trombosis.",
      "Corregir lentamente para evitar edema cerebral.",
    ],
    sources: ["Sociedad Argentina de Diabetes — Recomendaciones sobre complicaciones agudas de la diabetes.", "Guías ADA de crisis hiperglucémicas."],
    pearls: ["Adulto mayor + días de poliuria + confusión = EHH.", "Primero agua, después insulina.", "Bajar despacio."],
    pitfalls: ["Empezar con insulina.", "No buscar la infección."],
    tribunal: [
      qa("¿Qué diferencias hay entre la cetoacidosis y el estado hiperosmolar?", "La cetoacidosis aparece en horas, típicamente en DM1, con glucemia de más de 250, pH menor de 7,3, bicarbonato bajo y cetonas altas. El EHH evoluciona en días, en DM2 añosos, con glucemia mayor de 600, osmolaridad mayor de 320, pH casi normal, deshidratación más grave y mayor mortalidad."),
      qa("¿Cómo se calcula la osmolaridad efectiva?", "2 × sodio + glucemia/18 (en mg/dl); normal: 275–295 mOsm/kg. La urea no se incluye en la efectiva porque atraviesa las membranas."),
      qa("¿Cómo se corrige el sodio por la glucemia?", "Se suma 1,6 a 2,4 mEq/l al sodio medido por cada 100 mg/dl de glucemia por encima de 100; refleja el agua que la glucosa sacó de las células."),
    ],
  },
};
