import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const incidentalomaSuprarrenal: ClinicalCase = {
  id: "incidentaloma-suprarrenal",
  level: 3,
  area: "Endocrinología",
  setting: "Consultorio",
  patient: { age: 59, ageUnit: "años", sex: "F", context: "Le hicieron una TC de abdomen por un dolor que ya pasó. Hipertensa con losartán, diabética con metformina." },
  frequency: "frecuente",
  intro: "“En la tomografía apareció un bulto en la glándula de arriba del riñón. ¿Me tienen que operar?”",
  vitals: { TA: "142/88 mmHg", FC: "76 lpm", Peso: "84 kg (IMC 32)" },
  anamnesis: [
    act("cushing", "¿Le salen moretones, se le afinó la piel, perdió fuerza en las piernas?", "clave", "“Moretones sí, y me cuesta levantarme de la silla.”", "Signos sugestivos de hipercortisolismo."),
    act("feocromo", "¿Tiene crisis de dolor de cabeza, sudor y palpitaciones?", "clave", "“No.”", "Pregunta obligada: hay que descartar feocromocitoma siempre."),
    act("potasio", "¿Le dijeron que tenía el potasio bajo o calambres?", "clave", "“No.”", "Hiperaldosteronismo."),
    act("cancer", "¿Tuvo algún cáncer?", "clave", "“No.”", "Una masa suprarrenal en un paciente oncológico puede ser metástasis."),
    act("fracturas", "¿Tuvo fracturas?", "util", "“Una vértebra el año pasado, agachándome.”", "Osteoporosis por cortisol."),
    act("dolor-actual", "¿Le sigue doliendo el abdomen?", "neutro", "“No, era una gastritis.”", "Motivo de la TC original."),
  ],
  exam: [
    act("fenotipo", "Fenotipo", "clave", "Obesidad central, sin estrías vinosas ni giba; equimosis en antebrazos.", "Hipercortisolismo leve, sin Cushing florido."),
    act("fuerza", "Fuerza proximal", "util", "Leve debilidad para pararse sin brazos.", "Miopatía."),
    act("piel", "Piel", "util", "Piel fina.", "Compatible."),
  ],
  studies: [
    study("Imágenes", "tac-densidad", "Valorar la TC sin contraste: tamaño y densidad", "clave", "Masa suprarrenal izquierda de 3 cm, homogénea, de 6 UH.", "Menos de 10 UH: adenoma rico en lípidos, benigno."),
    study("Laboratorio", "dexametasona", "Prueba de supresión con 1 mg de dexametasona", "clave", "Cortisol de las 8 horas: 3,8 µg/dl (no suprime).", "Secreción autónoma de cortisol."),
    study("Laboratorio", "metanefrinas", "Metanefrinas plasmáticas o urinarias", "clave", "Normales.", "Descarta feocromocitoma."),
    study("Laboratorio", "aldosterona", "Aldosterona y renina (por ser hipertensa)", "clave", "Cociente normal.", "Descarta hiperaldosteronismo."),
    study("Laboratorio", "acth", "ACTH y DHEA-S", "util", "ACTH suprimida, DHEA-S baja.", "Confirma independencia de ACTH."),
    study("Otros", "puncion", "Punción biopsia de la masa", "riesgoso", "No se hizo.", "No aporta en adenomas y puede desencadenar una crisis si fuera un feocromocitoma."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("acs", "Incidentaloma suprarrenal: adenoma con secreción autónoma de cortisol", true, "Masa de 3 cm de 6 UH, cortisol que no suprime con dexametasona, ACTH baja y comorbilidades metabólicas."),
      dx("no-funcionante", "Adenoma no funcionante", false, "El cortisol no suprime."),
      dx("feocromocitoma", "Feocromocitoma", false, "Metanefrinas normales y baja densidad."),
      dx("carcinoma", "Carcinoma suprarrenal", false, "Masa chica, homogénea y de baja densidad."),
      dx("conn", "Adenoma productor de aldosterona", false, "Cociente aldosterona/renina normal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cirugia", "Discutir adrenalectomía laparoscópica por comorbilidades atribuibles (HTA, diabetes, fractura)", "clave", "En secreción autónoma con comorbilidades, la cirugía puede mejorarlas."),
      mg("corticoide-post", "Si se opera, corticoides después de la cirugía", "clave", "La suprarrenal contralateral está suprimida."),
      mg("comorbilidades", "Tratar HTA, diabetes y osteoporosis", "clave", "Igual en todos los casos."),
      mg("multidisciplinario", "Decisión con endocrinología y cirugía", "util", "Caso a caso."),
      mg("alta", "Alta sin seguimiento porque es benigno", "riesgoso", "El cortisol autónomo tiene impacto cardiovascular."),
      mg("biopsia", "Biopsia percutánea", "riesgoso", "No indicada."),
    ],
  },
  debrief: {
    diagnosis: "Incidentaloma suprarrenal izquierdo de 3 cm: adenoma con secreción autónoma de cortisol y comorbilidades metabólicas y óseas, en una mujer de 59 años.",
    pathologies: [
      { name: "Adenoma suprarrenal con secreción autónoma de cortisol", role: "principal", why: "Hipercortisolismo sin Cushing florido." },
      { name: "HTA, diabetes y osteoporosis", role: "asociada", why: "Comorbilidades atribuibles al cortisol." },
      { name: "Feocromocitoma y carcinoma", role: "diferencial", why: "Siempre se descartan." },
    ],
    reasoning: [
      "Causa: adenoma suprarrenal que fabrica cortisol sin depender de ACTH.",
      "Mecanismo: exceso leve y crónico de cortisol que suprime la ACTH.",
      "Consecuencia: más riesgo cardiovascular, diabetes, HTA y fracturas.",
    ],
    epidemiology:
      "Se encuentra en el 3 al 7 % de las TC de adultos y aumenta con la edad. La gran mayoría son adenomas benignos no funcionantes; entre el 20 y el 50 % tienen secreción autónoma leve de cortisol. Menos del 5 % son feocromocitomas y menos del 2 %, carcinomas.",
    management: [
      "Fenotipo de imagen: tamaño y unidades Hounsfield.",
      "A todos: supresión con dexametasona y metanefrinas; si es hipertenso, aldosterona/renina.",
      "Cirugía si es funcionante con impacto clínico o sospechoso de malignidad.",
      "Tratar las comorbilidades.",
    ],
    sources: ["Sociedad Argentina de Endocrinología y Metabolismo — Incidentaloma suprarrenal.", "ESE/ENSAT — Guidelines on adrenal incidentalomas."],
    pearls: ["Menos de 10 UH = adenoma.", "A todos: dexametasona y metanefrinas.", "Nunca biopsiar sin descartar feocromocitoma."],
    pitfalls: ["Archivarlo como hallazgo.", "Biopsiar."],
    tribunal: [
      qa("¿Qué estudios hormonales se piden ante un incidentaloma suprarrenal?", "A todos, supresión con 1 mg de dexametasona y metanefrinas; aldosterona y renina si hay hipertensión o hipopotasemia."),
      qa("¿Qué características de la TC sugieren benignidad?", "Menos de 4 cm, homogéneo, bordes lisos, menos de 10 UH sin contraste y lavado rápido del contraste."),
      qa("¿Por qué se dan corticoides después de operar un adenoma productor de cortisol?", "Porque la otra suprarrenal estuvo suprimida y puede haber una insuficiencia suprarrenal transitoria."),
    ],
  },
};
