import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const cancerVejiga: ClinicalCase = {
  id: "cancer-de-vejiga",
  level: 2,
  area: "Oncología",
  setting: "Consultorio",
  patient: { age: 71, ageUnit: "años", sex: "M", context: "Fumador de 50 paquetes/año. Trabajó en una fábrica de pinturas." },
  frequency: "frecuente",
  intro: "“Orino con sangre. No me duele, viene y se va desde hace un mes. Pensé que era algo de la próstata.”",
  vitals: { TA: "138/82 mmHg", FC: "76 lpm", "T°": "36,4 °C" },
  anamnesis: [
    act("hematuria", "¿La sangre está en toda la micción? ¿Con coágulos? ¿Duele?", "clave", "“En toda, con coágulos chicos, sin dolor.”", "Hematuria macroscópica indolora: cáncer de vías urinarias hasta demostrar lo contrario."),
    act("tabaco", "¿Fumás? ¿En qué trabajaste?", "clave", "“Sí; en pinturas 30 años.”", "Tabaco y aminas aromáticas: principales factores."),
    act("irritativos", "¿Orinás seguido, con ardor o urgencia?", "clave", "“Algo más seguido.”", "Puede sugerir carcinoma in situ."),
    act("anticoag", "¿Anticoagulantes o infección?", "util", "“Aspirina.”", "No excluye estudiar: nunca atribuir la hematuria solo a ella."),
    act("peso", "¿Bajaste de peso, dolor lumbar?", "util", "“No.”", "Enfermedad avanzada."),
    act("nieto", "¿Tenés nietos?", "neutro", "“Dos.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Abdomen y puño percusión", "clave", "Normal, sin globo vesical ni masas.", "Sin retención por coágulos."),
    act("tacto", "Tacto rectal", "clave", "Próstata levemente aumentada, sin nódulos; vejiga móvil.", "Evalúa próstata y fijación."),
    act("anemia", "Palidez y edemas", "util", "Sin palidez.", "Sin pérdida grave."),
  ],
  studies: [
    study("Laboratorio", "orina", "Sedimento, urocultivo y citología urinaria", "clave", "Hematíes isomórficos, sin infección; citología sospechosa.", "Hematíes isomórficos: origen urológico, no glomerular."),
    study("Imágenes", "uro-tc", "Uro-TC", "clave", "Lesión vegetante en pared lateral vesical, sin hidronefrosis.", "Evalúa todo el urotelio."),
    study("Otros", "cisto", "Cistoscopía con resección transuretral (RTU)", "clave", "Carcinoma urotelial sin invasión muscular, alto grado.", "Diagnóstica, estadifica y trata."),
    study("Laboratorio", "psa", "PSA como explicación del sangrado", "innecesario", "2,1 ng/ml.", "No estudia la hematuria."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("vejiga", "Carcinoma urotelial de vejiga sin invasión muscular, de alto grado", true, "Hematuria indolora, tabaco y pinturas, lesión vesical y RTU confirmatoria."),
      dx("hpb", "Hiperplasia prostática", false, "Puede sangrar, pero hay lesión en vejiga."),
      dx("litiasis", "Litiasis", false, "Causa dolor, y no hay cálculo."),
      dx("itu", "Infección urinaria", false, "Urocultivo negativo."),
      dx("glomerular", "Glomerulonefritis", false, "Hematíes isomórficos, sin cilindros."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("rtu", "RTU completa, con segunda RTU si es de alto grado", "clave", "Reseca y estadifica."),
      mg("bcg", "BCG intravesical", "clave", "Reduce recurrencia y progresión en alto riesgo."),
      mg("tabaco", "Dejar de fumar", "clave", "Reduce la recurrencia."),
      mg("seguimiento", "Cistoscopías periódicas", "clave", "Recurre mucho."),
      mg("antibiotico", "Antibióticos y ver si se corta", "riesgoso", "Demora el diagnóstico."),
      mg("aspirina", "Suspender la aspirina y no estudiar más", "riesgoso", "Toda hematuria macroscópica se estudia."),
    ],
  },
  debrief: {
    diagnosis: "Carcinoma urotelial de vejiga sin invasión muscular de alto grado en varón de 71 años, fumador y con exposición laboral.",
    pathologies: [
      { name: "Cáncer de vejiga", role: "principal", why: "Tumor del urotelio." },
      { name: "Tabaquismo, exposición laboral", role: "asociada", why: "Factores de riesgo." },
      { name: "HPB, litiasis, infección, glomerulonefritis", role: "diferencial", why: "Otras causas de hematuria." },
    ],
    reasoning: [
      "Causa: carcinógenos del tabaco y aminas aromáticas eliminados por orina.",
      "Mecanismo: daño del urotelio con mutaciones.",
      "Consecuencia: hematuria indolora, recurrencias y progresión.",
    ],
    epidemiology:
      "Es más frecuente en varones mayores de 60 años, tres a cuatro veces más que en mujeres. El tabaco explica cerca de la mitad de los casos. Las exposiciones laborales son otra causa importante. Tiende a recurrir, por lo que se requiere seguimiento largo.",
    management: [
      "Toda hematuria macroscópica se estudia.",
      "Uro-TC y cistoscopía.",
      "RTU y BCG según riesgo.",
      "Seguimiento y abandono del tabaco.",
    ],
    sources: ["Sociedad Argentina de Urología — Recomendaciones de cáncer de vejiga.", "Instituto Nacional del Cáncer — Prevención."],
    pearls: ["Hematuria indolora en fumador: es cáncer hasta demostrar lo contrario.", "La aspirina no explica la hematuria.", "Trabajo con pinturas: pregunta clave."],
    pitfalls: ["Dar antibiótico sin urocultivo.", "Atribuirla a la próstata."],
    tribunal: [
      qa("¿Cómo se diferencia la hematuria glomerular?", "Hematíes dismórficos, cilindros hemáticos y proteinuria; orina color coca-cola."),
      qa("¿Cuál es el tratamiento de un tumor con invasión muscular?", "Cistectomía radical con quimioterapia neoadyuvante, o preservación vesical en casos seleccionados."),
      qa("¿Qué parásito se asocia a cáncer de vejiga?", "Schistosoma haematobium, que causa carcinoma de células escamosas."),
    ],
  },
};
