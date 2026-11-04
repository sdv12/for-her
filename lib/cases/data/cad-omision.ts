import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const cadOmision: ClinicalCase = {
  id: "cetoacidosis-omision-insulina",
  level: 2,
  area: "Endocrinología",
  setting: "Guardia",
  patient: { age: 22, ageUnit: "años", sex: "M", context: "Diabético tipo 1 desde los 12 años. Se quedó sin insulina hace tres días y tiene gripe." },
  frequency: "frecuente",
  intro: "“Hace dos días vomito, me duele la panza y tengo mucha sed. Me quedé sin insulina y la farmacia no me la daba.”",
  vitals: { TA: "104/62 mmHg", FC: "122 lpm", FR: "30 rpm", "T°": "37,9 °C", Glucemia: "486 mg/dl", Glasgow: "15/15" },
  anamnesis: [
    act("insulina", "¿Cuándo fue tu última dosis de insulina?", "clave", "“Hace tres días se me terminó.”", "Omisión de insulina: causa más frecuente de cetoacidosis en DM1 conocida."),
    act("infeccion", "¿Fiebre, tos, ardor al orinar?", "clave", "“Gripe con fiebre.”", "Desencadenante infeccioso."),
    act("acceso", "¿Por qué no conseguiste la insulina?", "util", "“Me cambió la obra social y no me la autorizaban.”", "Barreras de acceso: la Ley 26.914 garantiza la cobertura."),
    act("alcohol", "¿Tomaste alcohol o drogas?", "util", "“No.”", "Otros desencadenantes."),
    act("previas", "¿Tuviste cetoacidosis antes?", "util", "“Una vez a los 15.”", "Recurrencia."),
    act("estudio", "¿Qué estudiás?", "neutro", "“Profesorado de educación física.”", "No orienta."),
  ],
  exam: [
    act("respiracion", "Patrón respiratorio y aliento", "clave", "Respiración de Kussmaul, aliento cetónico.", "Acidosis metabólica con cetonas."),
    act("hidratacion", "Hidratación", "clave", "Mucosas secas, taquicardia.", "Deshidratación moderada."),
    act("abdomen", "Abdomen", "util", "Dolor difuso sin defensa.", "El dolor abdominal es frecuente en la CAD y mejora con el tratamiento."),
  ],
  studies: [
    study("Laboratorio", "gases", "Gases, ionograma y cetonemia", "clave", "pH 7,14, bicarbonato 8, anión GAP 28, K 5,4, cetonemia 5,8.", "Cetoacidosis moderada a grave; el potasio total está bajo aunque el sérico sea normal o alto."),
    study("Laboratorio", "lab", "Creatinina, hemograma, PCR", "util", "Creatinina 1,4.", "Insuficiencia renal prerrenal."),
    study("Electrofisiología", "ecg", "Electrocardiograma", "util", "Taquicardia sinusal.", "Monitoreo del potasio."),
    study("Imágenes", "tc", "Tomografía de abdomen por el dolor", "innecesario", "No se realizó.", "El dolor es por la cetoacidosis; reevaluar si persiste tras corregirla."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("cad", "Cetoacidosis diabética moderada a grave por omisión de insulina e infección, en DM1", true, "Glucemia de 486, pH 7,14, bicarbonato 8, cetonemia alta y anión GAP aumentado, tras 3 días sin insulina con gripe."),
      dx("ehh", "Estado hiperosmolar", false, "Hay acidosis y cetonas importantes."),
      dx("abdomen-agudo", "Abdomen agudo quirúrgico", false, "El dolor se explica por la cetoacidosis."),
      dx("gastroenteritis", "Gastroenteritis", false, "No explica la acidosis con cetonas."),
      dx("lactica", "Acidosis láctica", false, "Las cetonas explican la acidosis."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("fluidos", "Solución fisiológica 1–1,5 litros en la primera hora y luego según hidratación", "clave", "Primer paso."),
      mg("insulina", "Insulina regular en infusión (0,1 U/kg/h) si el potasio es mayor de 3,3", "clave", "Frena la cetogénesis."),
      mg("potasio", "Agregar potasio a los fluidos cuando el K es menor de 5,2", "clave", "La insulina baja el potasio."),
      mg("glucosa", "Agregar dextrosa cuando la glucemia baja a 200–250, manteniendo la insulina hasta cerrar el GAP", "clave", "Evita hipoglucemia mientras se corrige la acidosis."),
      mg("acceso", "Garantizar la provisión de insulina al alta y educación", "util", "Previene recurrencias."),
      mg("bicarbonato", "Bicarbonato con pH 7,14", "riesgoso", "No indicado salvo pH menor de 6,9; puede empeorar la hipopotasemia y el edema cerebral."),
    ],
  },
  debrief: {
    diagnosis: "Cetoacidosis diabética moderada a grave por omisión de insulina (barrera de acceso) e infección respiratoria, en varón de 22 años con DM1.",
    pathologies: [
      { name: "Cetoacidosis diabética", role: "principal", why: "Déficit absoluto de insulina." },
      { name: "Omisión de insulina e infección", role: "asociada", why: "Desencadenantes." },
      { name: "EHH, abdomen agudo, acidosis láctica", role: "diferencial", why: "Se descartan." },
    ],
    reasoning: [
      "Causa: sin insulina, con el aumento de hormonas contrarreguladoras por la infección.",
      "Mecanismo: hiperglucemia con diuresis osmótica y lipólisis que genera cuerpos cetónicos.",
      "Consecuencia: deshidratación, acidosis metabólica, alteraciones del potasio y, si no se trata, coma y muerte.",
    ],
    epidemiology:
      "La cetoacidosis es la complicación aguda grave más frecuente de la DM1; en adolescentes y adultos jóvenes con diabetes conocida, la omisión de insulina (por costo, acceso, trastornos alimentarios o problemas psicosociales) es la causa principal.",
    management: [
      "Fluidos, insulina, potasio y glucosa según protocolo.",
      "Controles horarios de glucemia y cada 2–4 h de gases y electrolitos.",
      "Tratar el desencadenante.",
      "Educación y acceso garantizado a la insulina (Ley 26.914).",
    ],
    sources: ["Sociedad Argentina de Diabetes — Recomendaciones de cetoacidosis.", "Ley 26.914 de Diabetes (cobertura de insulina e insumos)."],
    pearls: ["Primero fluidos.", "Potasio antes de la insulina si es menor de 3,3.", "Insulina hasta cerrar el GAP."],
    pitfalls: ["Suspender la insulina cuando baja la glucemia.", "Bicarbonato de rutina."],
    tribunal: [
      qa("¿Qué es el edema cerebral en la cetoacidosis?", "Una complicación grave, más en niños y en el debut, asociada a corrección rápida de la osmolaridad y a bicarbonato; se manifiesta con cefalea, bradicardia, hipertensión y deterioro de conciencia, y se trata con manitol o salina hipertónica."),
      qa("¿Cómo se pasa de insulina EV a subcutánea?", "Cuando se resolvió la cetoacidosis y la persona puede comer: se da la insulina subcutánea (basal) y se continúa la infusión 1–2 h más para evitar el rebote."),
      qa("¿Qué dice la Ley 26.914?", "Amplía la Ley de Diabetes: garantiza la cobertura del 100 % de los medicamentos e insumos (insulinas, tiras, jeringas) para personas con diabetes."),
    ],
  },
};
