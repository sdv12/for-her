import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const crisisSuprarrenalCorticoides: ClinicalCase = {
  id: "crisis-suprarrenal-suspension-corticoides",
  level: 3,
  area: "Endocrinología",
  setting: "Guardia",
  patient: { age: 61, ageUnit: "años", sex: "M", context: "EPOC con prednisona 20 mg diarios hace un año. La suspendió de golpe hace 5 días." },
  frequency: "frecuente",
  intro: "“Estoy muy débil, vomito, me duele la panza y me mareo al pararme.”",
  vitals: { TA: "78/46 mmHg", FC: "122 lpm", FR: "22 rpm", "T°": "37,8 °C", "SatO₂": "93 %", Glucemia: "62 mg/dl" },
  anamnesis: [
    act("corticoides", "¿Tomás corticoides? ¿Los dejaste?", "clave", "“Prednisona, la dejé de golpe.”", "Causa."),
    act("gatillo", "¿Infección?", "clave", "“Diarrea hace 3 días.”", "Estrés."),
    act("sintomas", "¿Vómitos, dolor abdominal?", "clave", "“Sí.”", "Crisis."),
    act("piel", "¿Se oscureció la piel?", "util", "“No.”", "Primaria."),
    act("otros", "¿Otros fármacos?", "util", "“Broncodilatadores.”", "Base."),
    act("hobby", "¿Qué te gusta?", "neutro", "“Los crucigramas.”", "No orienta."),
  ],
  exam: [
    act("perfusion", "Perfusión", "clave", "Fría, hipotensa.", "Shock."),
    act("abdomen", "Abdomen", "clave", "Dolor difuso sin peritonismo.", "Puede simular abdomen agudo."),
    act("cushing", "Rasgos cushingoides", "util", "Cara redonda, piel fina.", "Corticoides crónicos."),
  ],
  studies: [
    study("Laboratorio", "cortisol", "Cortisol y ACTH antes de dar hidrocortisona (sin demorarla)", "clave", "Cortisol bajo; ACTH baja.", "Secundaria."),
    study("Laboratorio", "iono", "Ionograma y glucemia", "clave", "Na 128; K 4,6; glucemia baja.", "Sin hiperpotasemia: secundaria."),
    study("Laboratorio", "infeccion", "Hemograma y cultivos", "util", "Leucocitosis leve.", "Gatillo."),
    study("Otros", "test-acth", "Test de ACTH antes de tratar", "riesgoso", "No se realizó.", "Demora en shock."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("crisis", "Crisis suprarrenal por suspensión brusca de corticoides crónicos", true, "Prednisona suspendida, shock, hiponatremia, hipoglucemia y cortisol bajo."),
      dx("sepsis", "Shock séptico", false, "Cortisol bajo y suspensión."),
      dx("addison", "Addison primario", false, "ACTH baja y sin hiperpotasemia."),
      dx("abdomen", "Abdomen agudo", false, "Sin peritonismo."),
      dx("gastro", "Gastroenteritis con deshidratación", false, "Hipotensión refractaria y cortisol."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("hidrocortisona", "Hidrocortisona 100 mg EV inmediata", "clave", "Salva la vida."),
      mg("volumen", "Solución fisiológica y dextrosa", "clave", "Volumen y glucosa."),
      mg("descenso", "Descenso gradual de corticoides luego", "clave", "Previene recurrencia."),
      mg("educacion", "Educar en dosis de estrés", "clave", "Prevención."),
      mg("esperar", "Esperar el resultado del cortisol", "riesgoso", "Mortal."),
      mg("dexametasona-sola", "Solo vasopresores", "riesgoso", "No trata la causa."),
    ],
  },
  debrief: {
    diagnosis: "Crisis suprarrenal por insuficiencia suprarrenal secundaria tras suspender prednisona crónica, desencadenada por gastroenteritis, en varón de 61 años con EPOC.",
    pathologies: [
      { name: "Crisis suprarrenal", role: "principal", why: "Déficit agudo de cortisol." },
      { name: "Supresión del eje", role: "asociada", why: "Corticoides crónicos." },
      { name: "Shock séptico, Addison", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: supresión del eje hipotálamo-hipófisis-suprarrenal.",
      "Mecanismo: al suspender, la suprarrenal no responde.",
      "Consecuencia: shock, hipoglucemia e hiponatremia.",
    ],
    epidemiology:
      "La insuficiencia suprarrenal por corticoides es la forma más frecuente. Cualquier persona con más de 3 semanas de corticoides en dosis suprafisiológicas puede tener el eje suprimido. La suspensión brusca es un error frecuente.",
    management: [
      "Sospechar.",
      "Hidrocortisona ya.",
      "Volumen.",
      "Descenso gradual.",
    ],
    sources: ["Sociedad Argentina de Endocrinología y Metabolismo — Insuficiencia suprarrenal.", "Endocrine Society — Glucocorticoid-Induced Adrenal Insufficiency Guideline."],
    pearls: ["Nunca suspender corticoides de golpe.", "Hidrocortisona primero.", "Secundaria sin hiperpotasemia."],
    pitfalls: ["Esperar laboratorio.", "No educar."],
    tribunal: [
      qa("¿Cuándo se suprime el eje?", "Con más de 20 mg de prednisona por más de 3 semanas, o signos cushingoides."),
      qa("¿Qué son las dosis de estrés?", "Aumento de la dosis en fiebre, cirugía o enfermedad."),
      qa("¿Por qué el Addison primario da hiperpotasemia?", "Porque falta la aldosterona, que depende de la suprarrenal."),
    ],
  },
};
