import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hiperplasiaSuprarrenalCongenita: ClinicalCase = {
  id: "hiperplasia-suprarrenal-congenita",
  level: 4,
  area: "Pediatría",
  setting: "Guardia",
  patient: { age: 12, ageUnit: "días", sex: "M", context: "Recién nacido de término. La pesquisa neonatal todavía no llegó. Lo trae la mamá." },
  frequency: "raro",
  intro: "“Vomita todo desde hace dos días, está muy dormido y lo veo flaquito.”",
  vitals: { TA: "58/32 mmHg", FC: "188 lpm", FR: "52 rpm", "T°": "36,2 °C", Peso: "2.950 g", Glucemia: "48 mg/dl" },
  anamnesis: [
    act("vomitos", "¿Cómo son los vómitos?", "clave", "“No en chorro, después de cada toma.”", "No es estenosis pilórica típica."),
    act("peso", "¿Cuánto pesó al nacer?", "clave", "“3.400.”", "Perdió más del 10 %."),
    act("pesquisa", "¿Le hicieron la prueba del talón?", "clave", "“Sí, pero no tenemos el resultado.”", "Pesquisa de HSC."),
    act("diuresis", "¿Moja pañales?", "util", "“Muchos, con poco color.”", "Pérdida renal de sal."),
    act("familia", "¿Algún bebé de la familia falleció?", "util", "“Un primo de mi marido, de chiquito.”", "Herencia autosómica recesiva."),
    act("nombre", "¿Cómo se llama?", "neutro", "“Benjamín.”", "No orienta."),
  ],
  exam: [
    act("perfusion", "Perfusión", "clave", "Relleno de 4 segundos, piel marmórea.", "Shock."),
    act("genitales", "Genitales", "clave", "Masculinos normales con escroto hiperpigmentado.", "Exceso de ACTH."),
    act("abdomen", "Abdomen", "util", "Sin oliva pilórica.", "Excluye estenosis."),
  ],
  studies: [
    study("Laboratorio", "ionograma", "Ionograma, glucemia y estado ácido-base", "clave", "Na 122; K 7,4; acidosis metabólica.", "Crisis perdedora de sal."),
    study("Laboratorio", "17ohp", "17-hidroxiprogesterona, cortisol y renina antes de los corticoides", "clave", "17-OHP muy elevada; cortisol bajo; renina alta.", "Déficit de 21-hidroxilasa."),
    study("Electrofisiología", "ecg", "ECG", "util", "Ondas T picudas.", "Hiperpotasemia."),
    study("Imágenes", "eco-piloro", "Esperar ecografía de píloro para tratar", "riesgoso", "No se esperó.", "El shock no da tiempo."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hsc", "Hiperplasia suprarrenal congénita por déficit de 21-hidroxilasa con crisis perdedora de sal", true, "Varón de 2 semanas con vómitos, shock, hiponatremia, hiperpotasemia, hiperpigmentación y 17-OHP alta."),
      dx("estenosis-pilorica", "Estenosis hipertrófica del píloro", false, "Da alcalosis hipoclorémica con potasio bajo."),
      dx("sepsis", "Sepsis neonatal", false, "No explica la hiperpotasemia ni la 17-OHP."),
      dx("gastroenteritis", "Gastroenteritis", false, "Sin diarrea y con perfil suprarrenal."),
      dx("cardiopatia", "Cardiopatía congénita ductus-dependiente", false, "Sin soplo y con trastorno electrolítico."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("expansion", "Expansión con solución fisiológica", "clave", "Shock e hiponatremia."),
      mg("hidrocortisona", "Hidrocortisona EV en dosis de estrés", "clave", "Reemplazo de cortisol."),
      mg("glucosa", "Corregir la hipoglucemia y tratar la hiperpotasemia", "clave", "Riesgo vital."),
      mg("fludro", "Fludrocortisona y sal oral al estabilizar", "util", "Reemplazo mineralocorticoide."),
      mg("potasio", "Sueros con potasio de mantenimiento", "riesgoso", "Empeora la hiperpotasemia."),
      mg("alta", "Alta con antiemético", "riesgoso", "Muerte por crisis suprarrenal."),
    ],
  },
  debrief: {
    diagnosis: "Hiperplasia suprarrenal congénita por déficit de 21-hidroxilasa con crisis perdedora de sal, en recién nacido varón de 12 días.",
    pathologies: [
      { name: "Hiperplasia suprarrenal congénita", role: "principal", why: "Déficit enzimático hereditario." },
      { name: "Crisis perdedora de sal", role: "asociada", why: "Falta de aldosterona y cortisol." },
      { name: "Estenosis pilórica, sepsis", role: "diferencial", why: "Vómitos en el lactante pequeño." },
    ],
    reasoning: [
      "Causa: mutación autosómica recesiva de la 21-hidroxilasa.",
      "Mecanismo: falta cortisol y aldosterona; la ACTH sube y desvía la síntesis a andrógenos.",
      "Consecuencia: pérdida de sal, hiperpotasemia y shock a las 1 a 3 semanas de vida.",
    ],
    epidemiology:
      "La HSC se pesquisa en el programa nacional de pesquisa neonatal argentino con la 17-OHP en sangre del talón. Los varones no tienen genitales ambiguos, así que se diagnostican tarde si la pesquisa no llega. Las niñas suelen tener virilización al nacer.",
    management: [
      "Expansión.",
      "Hidrocortisona.",
      "Potasio y glucosa.",
      "Reemplazo de por vida.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Hiperplasia suprarrenal congénita.", "Endocrine Society — Congenital Adrenal Hyperplasia Due to Steroid 21-Hydroxylase Deficiency Guideline."],
    pearls: ["Vómitos, sodio bajo, potasio alto: suprarrenal.", "En varones no hay ambigüedad.", "Sacá la muestra antes del corticoide si podés."],
    pitfalls: ["Pensar solo en píloro.", "Sueros con potasio."],
    tribunal: [
      qa("¿Cómo diferenciás el medio interno con la estenosis pilórica?", "La estenosis da alcalosis con potasio bajo; la HSC, acidosis con potasio alto."),
      qa("¿Cómo se manifiesta en niñas?", "Genitales ambiguos al nacer por exceso de andrógenos."),
      qa("¿Qué se enseña a la familia?", "Duplicar o triplicar la hidrocortisona ante fiebre o vómitos y tener hidrocortisona inyectable."),
    ],
  },
};
