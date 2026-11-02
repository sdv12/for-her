import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const cadEuglucemica: ClinicalCase = {
  id: "cetoacidosis-euglucemica-isglt2",
  level: 3,
  area: "Endocrinología",
  setting: "Internación",
  patient: { age: 57, ageUnit: "años", sex: "M", context: "Diabético tipo 2 con metformina y empagliflozina. Operado de colecistectomía hace dos días; casi no come." },
  frequency: "raro",
  intro: "“Desde ayer tiene náuseas, vómitos, dolor de panza y respira rápido. La glucemia está bien, así que pensamos que es por la cirugía.” (relata el residente)",
  vitals: { TA: "112/70 mmHg", FC: "108 lpm", FR: "28 rpm", "T°": "36,8 °C", "SatO₂": "98 %", Glucemia: "186 mg/dl" },
  anamnesis: [
    act("isglt2", "¿Qué medicación para la diabetes recibe? ¿Se suspendió antes de la cirugía?", "clave", "“Empagliflozina; nadie la suspendió.”", "Los iSGLT2 deben suspenderse 3 días antes de una cirugía: favorecen la cetoacidosis con glucemias normales."),
    act("ayuno", "¿Cuánto comió desde la cirugía?", "clave", "“Casi nada, solo líquidos.”", "El ayuno con iSGLT2 aumenta la producción de cuerpos cetónicos."),
    act("insulina", "¿Recibe insulina?", "util", "“No.”", "La deficiencia relativa de insulina favorece la cetosis."),
    act("alcohol", "¿Toma alcohol?", "util", "“No.”", "Descarta cetoacidosis alcohólica."),
    act("dolor", "¿Cómo es el dolor abdominal?", "util", "“Difuso, no en la herida.”", "Descarta complicación quirúrgica localizada."),
    act("hobby", "¿Qué hace en su tiempo libre?", "neutro", "“Pesca.”", "No orienta."),
  ],
  exam: [
    act("respiracion", "Patrón respiratorio y aliento", "clave", "Respiración profunda y rápida (Kussmaul), aliento a manzana.", "Compensación respiratoria de una acidosis metabólica con cetonas."),
    act("abdomen", "Abdomen y herida", "clave", "Dolor difuso leve, sin defensa; heridas sanas.", "Sin complicación quirúrgica evidente."),
    act("hidratacion", "Hidratación", "util", "Mucosas secas.", "Deshidratación por glucosuria y vómitos."),
  ],
  studies: [
    study("Laboratorio", "gases", "Gases arteriales con anión GAP", "clave", "pH 7,12, bicarbonato 8, anión GAP 26.", "Acidosis metabólica grave con anión GAP aumentado."),
    study("Laboratorio", "cetonas", "Cetonemia (betahidroxibutirato)", "clave", "6,2 mmol/l.", "Confirma cetoacidosis pese a una glucemia menor de 250."),
    study("Laboratorio", "lab", "Ionograma, potasio, función renal, lactato, lipasa", "clave", "K 4,6, creatinina 1,2, lactato 1,6, lipasa normal.", "Descarta acidosis láctica y pancreatitis."),
    study("Imágenes", "tc", "Tomografía de abdomen para buscar una complicación quirúrgica", "util", "Sin colecciones.", "Descarta fístula biliar o absceso."),
    study("Laboratorio", "solo-glucemia", "Guiarse solo por la glucemia", "riesgoso", "No se realizó.", "La glucemia normal enmascara la cetoacidosis."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("cad-eu", "Cetoacidosis diabética euglucémica asociada a empagliflozina en el posoperatorio con ayuno", true, "Acidosis metabólica con anión GAP alto y cetonemia elevada con glucemia de 186, en un diabético tipo 2 con iSGLT2 no suspendido y ayuno."),
      dx("lactica", "Acidosis láctica por metformina", false, "El lactato es normal y las cetonas altas."),
      dx("complicacion", "Complicación quirúrgica (fístula biliar)", false, "La tomografía no la muestra y hay cetoacidosis."),
      dx("ayuno", "Cetosis de ayuno simple", false, "No produce un pH de 7,12."),
      dx("ehh", "Estado hiperosmolar", false, "La glucemia no está alta."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("suspender", "Suspender la empagliflozina", "clave", "Es la causa."),
      mg("insulina-dextrosa", "Insulina en infusión con dextrosa desde el inicio para poder mantener la insulina sin hipoglucemia", "clave", "La insulina frena la cetogénesis; la glucosa evita la hipoglucemia porque la glucemia ya es normal."),
      mg("fluidos", "Hidratación con cristaloides y reposición de potasio según valores", "clave", "Corrige el déficit de volumen y previene la hipopotasemia."),
      mg("controles", "Gases y cetonemia cada 2–4 h hasta que se resuelva la acidosis", "util", "La resolución se mide por cetonas y pH, no por la glucemia."),
      mg("sin-insulina", "No dar insulina porque la glucemia está normal", "riesgoso", "Sin insulina la cetoacidosis no se resuelve."),
      mg("bicarbonato", "Bicarbonato de rutina", "innecesario", "Solo se considera con pH menor de 6,9."),
    ],
  },
  debrief: {
    diagnosis: "Cetoacidosis diabética euglucémica grave asociada a empagliflozina no suspendida antes de la cirugía, con ayuno posoperatorio, en varón de 57 años con diabetes tipo 2.",
    pathologies: [
      { name: "Cetoacidosis diabética euglucémica", role: "principal", why: "Acidosis con cetonas altas y glucemia menor de 250." },
      { name: "Efecto adverso de un iSGLT2", role: "asociada", why: "Fármaco desencadenante." },
      { name: "Acidosis láctica, complicación quirúrgica, cetosis de ayuno", role: "diferencial", why: "Otras causas de acidosis en el posoperatorio." },
    ],
    reasoning: [
      "Causa: iSGLT2 + ayuno + estrés quirúrgico con deficiencia relativa de insulina.",
      "Mecanismo: el fármaco elimina glucosa por la orina (la glucemia no sube), baja la insulina y aumenta el glucagón, lo que activa la producción de cuerpos cetónicos.",
      "Consecuencia: acidosis metabólica grave con glucemia normal o poco elevada, que se diagnostica tarde si solo se mira la glucemia.",
    ],
    epidemiology:
      "La cetoacidosis euglucémica es rara, pero su frecuencia aumentó con el uso de los inhibidores de SGLT2 (empagliflozina, dapagliflozina), cada vez más indicados en diabetes, insuficiencia cardíaca y enfermedad renal. Cirugía, ayuno, dietas cetogénicas, alcohol e infecciones son los desencadenantes.",
    management: [
      "Sospecharla en todo paciente con iSGLT2 y síntomas de cetoacidosis, aunque la glucemia sea normal: medir cetonas y gases.",
      "Suspender el iSGLT2; insulina con dextrosa, fluidos y potasio.",
      "Suspender los iSGLT2 3 días antes de cirugías y durante enfermedades agudas.",
    ],
    sources: ["Sociedad Argentina de Diabetes — Recomendaciones sobre el uso de iSGLT2 y manejo perioperatorio.", "Guías ADA de crisis hiperglucémicas."],
    pearls: ["iSGLT2 + vómitos = medir cetonas, no solo glucemia.", "Insulina + dextrosa.", "Suspender 3 días antes de operar."],
    pitfalls: ["Descartar la cetoacidosis por glucemia normal.", "No dar insulina."],
    tribunal: [
      qa("¿Qué es el anión GAP y para qué sirve?", "Sodio − (cloro + bicarbonato); normal 8–12. Separa las acidosis metabólicas con GAP aumentado (cetoacidosis, láctica, insuficiencia renal, tóxicos como metanol, etilenglicol o salicilatos) de las con GAP normal o hiperclorémicas (diarrea, acidosis tubular renal)."),
      qa("¿Qué beneficios y riesgos tienen los iSGLT2?", "Beneficios: bajan la glucemia, el peso y la presión, y reducen la internación por insuficiencia cardíaca y la progresión de la enfermedad renal. Riesgos: infecciones genitales micóticas, deshidratación, cetoacidosis euglucémica y, raramente, gangrena de Fournier."),
      qa("¿Qué criterios definen la resolución de la cetoacidosis?", "Cetonemia menor de 0,6 mmol/l, pH mayor de 7,3 y bicarbonato mayor de 15–18, con el paciente capaz de comer; recién entonces se pasa a insulina subcutánea, superpuesta 1–2 h con la infusión."),
    ],
  },
};
