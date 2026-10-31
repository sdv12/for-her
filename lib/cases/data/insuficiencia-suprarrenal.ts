import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const insuficienciaSuprarrenal: ClinicalCase = {
  id: "crisis-addisoniana",
  level: 3,
  area: "Endocrinología",
  setting: "Guardia",
  patient: { age: 38, ageUnit: "años", sex: "F", context: "Tiene vitiligo e hipotiroidismo. Viene con gastroenteritis." },
  frequency: "raro",
  intro: "“Hace meses estoy muy cansada, bajé seis kilos, tengo ganas de comer sal y me mareo al pararme. Desde ayer tengo diarrea y vómitos y me siento desmayar.”",
  vitals: { TA: "78/46 mmHg", FC: "122 lpm", FR: "22 rpm", "T°": "37,9 °C", Glucemia: "58 mg/dl" },
  anamnesis: [
    act("cronico", "¿Cómo estaba los meses anteriores?", "clave", "“Cansada, sin hambre, adelgazando, con dolor de panza a veces.”", "Síntomas crónicos inespecíficos de insuficiencia suprarrenal."),
    act("sal", "¿Tiene ganas de comer sal?", "clave", "“Le pongo sal a todo, hasta a la fruta.”", "El deseo de sal refleja la pérdida renal de sodio por falta de aldosterona."),
    act("piel", "¿Notó que la piel se le oscureció?", "clave", "“Sí, estoy más morena aunque no tomé sol, y las encías tienen manchas.”", "La hiperpigmentación por ACTH elevada indica insuficiencia suprarrenal primaria."),
    act("corticoides", "¿Tomó corticoides en los últimos meses?", "clave", "“No.”", "La suspensión brusca de corticoides es la causa más frecuente de insuficiencia suprarrenal (secundaria)."),
    act("autoinmune", "¿Tiene otras enfermedades autoinmunes?", "util", "“Vitiligo y Hashimoto.”", "La adrenalitis autoinmune se asocia a otras autoinmunidades (síndrome poliglandular)."),
    act("tbc", "¿Tuvo tuberculosis?", "util", "“No.”", "La tuberculosis es otra causa de destrucción suprarrenal."),
    act("hobby", "¿Qué le gusta hacer?", "neutro", "“Bailar.”", "No orienta."),
  ],
  exam: [
    act("piel-ex", "Piel y mucosas", "clave", "Hiperpigmentación difusa, más en pliegues palmares, cicatrices y encías; parches de vitiligo.", "Hiperpigmentación: primaria."),
    act("perfusion", "Perfusión y ortostatismo", "clave", "Piel fría, relleno lento, hipotensión que no responde bien a fluidos.", "Shock por déficit de cortisol y aldosterona."),
    act("abdomen", "Abdomen", "util", "Dolor difuso leve, sin peritonismo.", "El dolor abdominal es frecuente en la crisis."),
    act("conciencia", "Conciencia", "util", "Somnolienta pero orientada.", "Evalúa la gravedad."),
  ],
  studies: [
    study("Laboratorio", "iono", "Ionograma, glucemia, función renal", "clave", "Na 124, K 6,1, glucemia 58, urea 70.", "Hiponatremia, hiperpotasemia e hipoglucemia: perfil típico de insuficiencia suprarrenal primaria."),
    study("Laboratorio", "cortisol", "Cortisol y ACTH (extraer antes de tratar, sin demorar)", "clave", "Cortisol 2 µg/dl (muy bajo en situación de estrés), ACTH muy elevada.", "Confirma insuficiencia suprarrenal primaria."),
    study("Electrofisiología", "ecg", "Electrocardiograma", "util", "Ondas T picudas.", "Por la hiperpotasemia."),
    study("Otros", "estimulo", "Esperar la prueba de estímulo con ACTH para tratar", "riesgoso", "No se realizó.", "En la crisis se trata ya: la prueba se hace después."),
    study("Imágenes", "tc-suprarrenal", "Tomografía de suprarrenales en la guardia", "innecesario", "No se realizó.", "Se pide después, de forma programada, para buscar la causa."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("addison", "Crisis suprarrenal en insuficiencia suprarrenal primaria (enfermedad de Addison autoinmune) desencadenada por gastroenteritis", true, "Astenia, adelgazamiento, deseo de sal, hiperpigmentación, shock, hiponatremia, hiperpotasemia, hipoglucemia, cortisol bajo y ACTH alta."),
      dx("septico", "Shock séptico por gastroenteritis", false, "Puede coexistir, pero no explica la hiperpigmentación, el deseo de sal ni el patrón de electrolitos."),
      dx("hipovolemia", "Deshidratación por gastroenteritis", false, "No explica la hiperpotasemia, la hiperpigmentación ni la mala respuesta a fluidos."),
      dx("secundaria", "Insuficiencia suprarrenal secundaria", false, "Sin hiperpigmentación (ACTH baja) y con potasio normal (aldosterona conservada)."),
      dx("anorexia", "Anorexia nerviosa", false, "No da hiperpigmentación, hiperpotasemia ni shock."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("hidrocortisona", "Hidrocortisona 100 mg endovenosa de inmediato y luego cada 6–8 h", "clave", "Salva la vida; en dosis altas también cubre el efecto mineralocorticoide."),
      mg("fluidos", "Solución fisiológica en volumen y dextrosa", "clave", "Corrige hipovolemia, hiponatremia e hipoglucemia."),
      mg("desencadenante", "Tratar el desencadenante y monitorear potasio, sodio y glucemia", "util", "La crisis se precipita por estrés (infecciones, cirugía)."),
      mg("educacion", "Al alta: hidrocortisona y fludrocortisona de por vida, duplicar dosis ante enfermedad, tarjeta identificatoria y kit de inyección", "clave", "Previene nuevas crisis."),
      mg("demorar", "Esperar los resultados de cortisol para iniciar el corticoide", "riesgoso", "La demora en una crisis suprarrenal es mortal."),
      mg("dexa-largo", "Dexametasona como tratamiento crónico", "innecesario", "No tiene efecto mineralocorticoide y es de acción muy prolongada; se usa hidrocortisona."),
    ],
  },
  debrief: {
    diagnosis: "Crisis suprarrenal por insuficiencia suprarrenal primaria autoinmune (enfermedad de Addison), desencadenada por gastroenteritis, en mujer de 38 años con vitiligo e hipotiroidismo.",
    pathologies: [
      { name: "Enfermedad de Addison", role: "principal", why: "Destrucción autoinmune de la corteza suprarrenal." },
      { name: "Síndrome poliglandular autoinmune", role: "asociada", why: "Hashimoto y vitiligo." },
      { name: "Shock séptico e insuficiencia secundaria", role: "diferencial", why: "Se distinguen por la clínica y el laboratorio." },
    ],
    reasoning: [
      "Causa: destrucción autoinmune de la corteza suprarrenal (en países con tuberculosis, también por TBC).",
      "Mecanismo: falta de cortisol (hipoglucemia, hipotensión, astenia) y de aldosterona (pérdida de sodio, retención de potasio, hipovolemia); la hipófisis aumenta la ACTH, que estimula los melanocitos.",
      "Consecuencia: cuadro crónico insidioso que, ante un estrés (infección), se descompensa en una crisis con shock que no responde a fluidos.",
    ],
    epidemiology:
      "La insuficiencia suprarrenal primaria es rara (alrededor de 1 cada 10.000 personas), más frecuente en mujeres de 30 a 50 años y asociada a otras enfermedades autoinmunes. La causa más frecuente de insuficiencia suprarrenal en general es la suspensión de corticoides prolongados (secundaria).",
    management: [
      "Sospechar ante shock refractario, hiponatremia, hiperpotasemia, hipoglucemia e hiperpigmentación.",
      "Extraer cortisol y ACTH y tratar de inmediato con hidrocortisona y fluidos.",
      "Confirmar luego con estímulo con ACTH y buscar la causa.",
      "Reemplazo crónico con hidrocortisona y fludrocortisona, educación para situaciones de estrés.",
    ],
    sources: ["Sociedad Argentina de Endocrinología y Metabolismo — Recomendaciones sobre insuficiencia suprarrenal."],
    pearls: ["Shock que no responde + hiponatremia + hiperpotasemia: pensar en suprarrenal.", "Hiperpigmentación = primaria.", "Ante la duda, hidrocortisona ya."],
    pitfalls: ["Esperar la confirmación para tratar.", "No dar dosis de estrés al alta."],
    tribunal: [
      qa("¿Qué diferencia la insuficiencia suprarrenal primaria de la secundaria?", "Primaria (suprarrenal): falta cortisol y aldosterona, ACTH alta, hiperpigmentación e hiperpotasemia. Secundaria (hipofisaria o por suspensión de corticoides): falta solo cortisol, ACTH baja, sin hiperpigmentación y con potasio normal."),
      qa("¿Qué es el síndrome de Cushing y cómo se diferencia?", "Es el exceso de cortisol: obesidad central, cara de luna llena, giba, estrías violáceas, hipertensión, diabetes y osteoporosis; la causa más frecuente es iatrogénica (corticoides)."),
      qa("¿Por qué no se suspenden bruscamente los corticoides crónicos?", "Porque suprimen el eje hipotálamo-hipófiso-suprarrenal; la suspensión brusca produce insuficiencia suprarrenal. Se descienden de forma gradual."),
    ],
  },
};
