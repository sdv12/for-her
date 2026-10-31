import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const endocarditis: ClinicalCase = {
  id: "endocarditis-infecciosa",
  level: 3,
  area: "Cardiovascular",
  setting: "Internación",
  patient: { age: 52, ageUnit: "años", sex: "M", context: "Tiene un soplo desde joven (válvula aórtica bicúspide)." },
  frequency: "poco-frecuente",
  intro: "“Hace tres semanas tengo fiebre que va y viene, transpiro de noche, perdí el apetito y bajé cuatro kilos. Me dieron antibióticos y mejoré, pero cuando los terminé volvió todo.”",
  vitals: { TA: "128/62 mmHg", FC: "100 lpm", FR: "18 rpm", "T°": "38,4 °C" },
  anamnesis: [
    act("dental", "¿Le hicieron algún tratamiento dental o procedimiento en los últimos meses?", "clave", "“Una extracción de muela hace un mes y medio, sin antibiótico.”", "La bacteriemia por procedimientos dentales en un paciente con valvulopatía es el escenario clásico de la endocarditis por estreptococos del grupo viridans."),
    act("soplo", "¿Qué le dijeron del soplo?", "clave", "“Que tengo una válvula con dos hojas en vez de tres.”", "La válvula aórtica bicúspide es una cardiopatía predisponente."),
    act("atb", "¿Qué antibióticos tomó y por cuánto tiempo?", "clave", "“Amoxicilina una semana, sin hacerme análisis.”", "Dar antibióticos antes de los hemocultivos los negativiza y retrasa el diagnóstico."),
    act("drogas", "¿Usó drogas endovenosas?", "util", "“No.”", "Los usuarios de drogas inyectables tienen endocarditis tricuspídea por S. aureus."),
    act("embolias", "¿Tuvo debilidad de un lado, dolor en el costado izquierdo o manchas en los dedos?", "util", "“Unas manchitas dolorosas en los dedos hace una semana.”", "Fenómenos embólicos o inmunológicos (nódulos de Osler)."),
    act("disnea", "¿Le falta el aire?", "clave", "“Un poco al caminar.”", "La insuficiencia cardíaca por destrucción valvular es la principal indicación de cirugía."),
    act("hobby", "¿Qué hace en su tiempo libre?", "neutro", "“Carpintería.”", "No orienta."),
  ],
  exam: [
    act("soplo-ex", "Auscultación cardíaca", "clave", "Soplo diastólico aspirativo en foco aórtico (nuevo según su historia), además del sistólico conocido.", "Soplo de insuficiencia aórtica nuevo: destrucción valvular."),
    act("piel", "Piel, uñas, conjuntivas", "clave", "Hemorragias en astilla en las uñas, petequias conjuntivales, lesiones de Janeway en las palmas.", "Estigmas periféricos de endocarditis."),
    act("fondo", "Fondo de ojo", "util", "Manchas de Roth.", "Fenómeno inmunológico."),
    act("bazo", "Palpación de bazo", "util", "Esplenomegalia leve.", "Frecuente en la endocarditis subaguda."),
    act("neuro", "Examen neurológico", "util", "Normal.", "Busca embolias cerebrales."),
  ],
  studies: [
    study("Microbiología", "hemocultivos", "Tres pares de hemocultivos separados, antes de iniciar antibióticos", "clave", "Streptococcus del grupo viridans en los 3 pares.", "Criterio mayor de Duke: bacteriemia persistente por un germen típico."),
    study("Imágenes", "eco-tt", "Ecocardiograma transtorácico", "clave", "Vegetación de 12 mm en la válvula aórtica con insuficiencia moderada a grave.", "Criterio mayor: vegetación."),
    study("Imágenes", "eco-te", "Ecocardiograma transesofágico", "util", "Confirma la vegetación, sin absceso perivalvular.", "Más sensible; detecta abscesos y complicaciones."),
    study("Laboratorio", "lab", "Hemograma, eritrosedimentación, PCR, función renal, orina", "util", "Anemia leve, ERS 70, hematuria microscópica.", "Inflamación sistémica y glomerulonefritis por inmunocomplejos."),
    study("Laboratorio", "atb-antes", "Iniciar antibióticos antes de los hemocultivos en un paciente estable", "riesgoso", "No se realizó.", "Negativiza los cultivos y deja la endocarditis sin germen identificado."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("ei", "Endocarditis infecciosa subaguda de válvula aórtica bicúspide por estreptococo del grupo viridans", true, "Fiebre prolongada tras una extracción dental, valvulopatía predisponente, hemocultivos positivos, vegetación, soplo nuevo y estigmas periféricos (criterios de Duke)."),
      dx("fod", "Fiebre de origen desconocido por linfoma", false, "Puede dar fiebre y pérdida de peso, pero no hemocultivos positivos ni vegetación."),
      dx("fiebre-reumatica", "Fiebre reumática", false, "Sigue a una faringitis, con artritis migratoria y carditis, sin bacteriemia."),
      dx("tbc", "Tuberculosis", false, "Fiebre y sudoración, pero no explica la bacteriemia por viridans ni la vegetación."),
      dx("lupus", "Lupus con endocarditis de Libman-Sacks", false, "Vegetaciones estériles, sin bacteriemia, con otros criterios de lupus."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("atb", "Penicilina G o ceftriaxona endovenosa por 4 semanas (según sensibilidad)", "clave", "Tratamiento bactericida prolongado de la endocarditis por estreptococos sensibles."),
      mg("cirugia", "Evaluación por cirugía cardíaca (insuficiencia aórtica significativa)", "clave", "Las indicaciones de cirugía son insuficiencia cardíaca, infección no controlada (absceso) y riesgo embólico alto."),
      mg("equipo", "Manejo por equipo de endocarditis (cardiología, infectología, cirugía)", "util", "Mejora la evolución."),
      mg("dental", "Evaluación odontológica y, de por vida, profilaxis antibiótica antes de procedimientos dentales de riesgo", "util", "Un paciente con endocarditis previa es de alto riesgo."),
      mg("oral-corto", "Amoxicilina oral por 10 días", "riesgoso", "Insuficiente: recaída y destrucción valvular."),
      mg("anticoag", "Anticoagular para prevenir embolias", "riesgoso", "No previene embolias sépticas y aumenta el riesgo de hemorragia cerebral."),
    ],
  },
  debrief: {
    diagnosis: "Endocarditis infecciosa subaguda de válvula aórtica bicúspide por estreptococo del grupo viridans, con insuficiencia aórtica moderada a grave, tras extracción dental.",
    pathologies: [
      { name: "Endocarditis infecciosa", role: "principal", why: "Infección del endocardio valvular." },
      { name: "Válvula aórtica bicúspide", role: "asociada", why: "Cardiopatía predisponente." },
      { name: "Insuficiencia aórtica aguda", role: "asociada", why: "Destrucción valvular." },
      { name: "Fiebre de origen desconocido y lupus", role: "diferencial", why: "Otras causas de fiebre prolongada con soplo." },
    ],
    reasoning: [
      "Causa: bacteriemia transitoria (extracción dental) en una válvula dañada.",
      "Mecanismo: sobre el endotelio alterado se forma un trombo de plaquetas y fibrina que las bacterias colonizan: la vegetación, protegida de las defensas.",
      "Consecuencia: bacteriemia persistente (fiebre), destrucción valvular (insuficiencia), embolias (cerebro, bazo, riñón, piel) y fenómenos inmunológicos (Osler, Roth, glomerulonefritis).",
    ],
    epidemiology:
      "La endocarditis infecciosa es poco frecuente pero grave, con mortalidad del 15–30 %. Es más frecuente en varones (2:1) y en mayores de 60 años. Hoy predominan los estafilococos (dispositivos, hemodiálisis, drogas endovenosas), y los estreptococos orales siguen siendo frecuentes en valvulopatías nativas.",
    management: [
      "Sospechar ante fiebre con soplo o factores de riesgo; no dar antibióticos antes de los hemocultivos.",
      "Tres pares de hemocultivos y ecocardiograma (transtorácico y transesofágico).",
      "Criterios de Duke para el diagnóstico.",
      "Antibióticos endovenosos prolongados (4–6 semanas) según germen.",
      "Cirugía ante insuficiencia cardíaca, absceso, infección no controlada o alto riesgo embólico.",
    ],
    sources: ["Sociedad Argentina de Cardiología — Consenso de endocarditis infecciosa.", "Sociedad Argentina de Infectología — Recomendaciones de tratamiento."],
    pearls: ["Fiebre + soplo = hemocultivos antes de antibióticos.", "Duke: hemocultivos + ecocardiograma.", "Insuficiencia cardíaca = cirugía."],
    pitfalls: ["Dar antibióticos sin hemocultivos.", "Anticoagular."],
    tribunal: [
      qa("¿Cuáles son los criterios de Duke?", "Mayores: hemocultivos positivos para gérmenes típicos y evidencia de compromiso endocárdico (vegetación, absceso, nueva insuficiencia valvular). Menores: predisposición, fiebre, fenómenos vasculares, fenómenos inmunológicos y evidencia microbiológica que no cumple el mayor. Definitiva: 2 mayores, 1 mayor y 3 menores, o 5 menores."),
      qa("¿Qué gérmenes causan endocarditis según el contexto?", "Válvula nativa subaguda: estreptococos del grupo viridans, enterococos, S. gallolyticus (asociado a cáncer de colon). Aguda y usuarios de drogas: S. aureus. Prótesis precoz: estafilococos coagulasa negativos. Cultivos negativos: antibióticos previos, HACEK, Coxiella, Bartonella."),
      qa("¿Quiénes necesitan profilaxis antibiótica antes de procedimientos dentales?", "Pacientes de alto riesgo: prótesis valvulares, endocarditis previa y algunas cardiopatías congénitas cianóticas o reparadas con material protésico."),
    ],
  },
};
