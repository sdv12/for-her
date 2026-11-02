import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const controlPrenatal: ClinicalCase = {
  id: "control-prenatal-primera-consulta",
  level: 1,
  area: "Ginecología y obstetricia",
  setting: "CAPS",
  patient: { age: 23, ageUnit: "años", sex: "F", context: "Primer embarazo. Vive con su pareja." },
  frequency: "muy-frecuente",
  intro: "“Me hice un test y dio positivo. Es mi primer embarazo. Quiero saber qué tengo que hacer.”",
  vitals: { TA: "108/68 mmHg", FC: "78 lpm", "T°": "36,4 °C", Peso: "58 kg" },
  anamnesis: [
    act("fum", "¿Cuándo fue tu última menstruación? ¿Eras regular?", "clave", "“El 2 de agosto. Soy regular.”", "Con la FUM se calcula la edad gestacional y la fecha probable de parto (regla de Naegele)."),
    act("antecedentes", "¿Tenés alguna enfermedad, tomás medicación o tuviste cirugías?", "clave", "“No, nada.”", "Define si es un embarazo de bajo riesgo."),
    act("vacunas", "¿Tenés las vacunas al día? ¿Tenés el carnet?", "clave", "“No sé, creo que de chica todas.”", "En el embarazo se indican antigripal, triple bacteriana acelular (dTpa desde la semana 20) y se completa doble adultos y hepatitis B si falta."),
    act("acido-folico", "¿Estás tomando ácido fólico?", "clave", "“No.”", "Previene defectos del tubo neural; idealmente desde antes de la concepción."),
    act("consumos", "¿Fumás, tomás alcohol u otras sustancias?", "clave", "“Fumaba poco, ya dejé.”", "No hay cantidad segura de alcohol ni tabaco en el embarazo."),
    act("violencia", "¿Cómo te sentís en tu casa? ¿Alguien te hace daño?", "util", "“Bien, me siento cuidada.”", "El embarazo es un momento de riesgo de violencia: se pregunta a todas."),
    act("sintomas", "¿Tenés náuseas, sangrado o dolor?", "util", "“Náuseas a la mañana. Sin sangrado.”", "Náuseas esperables; sin signos de alarma."),
    act("nombre", "¿Pensaron nombres?", "neutro", "“Todavía no.”", "No orienta."),
  ],
  exam: [
    act("ta-peso", "Presión arterial, peso y talla", "clave", "TA 108/68; IMC 22.", "Línea de base para la ganancia de peso y para detectar hipertensión."),
    act("mamas", "Examen mamario y odontológico", "util", "Normal; caries en un molar.", "Se deriva a odontología: la enfermedad periodontal se asocia a parto prematuro."),
    act("pap", "Especuloscopía y Papanicolaou si corresponde", "util", "Cuello sano; PAP pendiente.", "El embarazo es una oportunidad para el rastreo."),
    act("tacto-repetido", "Tacto vaginal en cada consulta", "innecesario", "No se realizó.", "No está indicado de rutina en controles normales."),
  ],
  studies: [
    study("Laboratorio", "rutina", "Hemograma, grupo y factor, glucemia en ayunas, orina completa y urocultivo", "clave", "Hb 11,8; grupo 0 Rh negativo; glucemia 82; urocultivo negativo.", "Detecta anemia, diabetes previa, bacteriuria asintomática e incompatibilidad Rh."),
    study("Laboratorio", "serologias", "VDRL, VIH, hepatitis B, Chagas y toxoplasmosis (con consentimiento para VIH)", "clave", "Todas negativas; toxoplasmosis IgG negativa (susceptible).", "Infecciones con tratamiento o prevención para el bebé; se repiten en el embarazo."),
    study("Laboratorio", "coombs", "Prueba de Coombs indirecta", "clave", "Negativa.", "Es Rh negativa: hay que controlar y dar inmunoglobulina anti-D en la semana 28 y posparto si el bebé es Rh positivo."),
    study("Imágenes", "eco", "Ecografía obstétrica del primer trimestre", "util", "Embarazo único, vital, acorde a 8 semanas.", "Confirma la edad gestacional."),
    study("Imágenes", "eco-mensual", "Ecografía en cada consulta", "innecesario", "No se realizó.", "En el embarazo de bajo riesgo se recomiendan pocas ecografías en momentos definidos."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("bajo-riesgo", "Embarazo de 8 semanas de bajo riesgo, Rh negativo no sensibilizada, toxoplasmosis susceptible", true, "Primigesta sana, con estudios normales salvo factor Rh negativo con Coombs negativo y toxoplasmosis IgG negativa."),
      dx("alto-riesgo", "Embarazo de alto riesgo", false, "Ser Rh negativa no sensibilizada no lo convierte en alto riesgo; se sigue con controles específicos."),
      dx("isoinmunizacion", "Isoinmunización Rh", false, "La Coombs indirecta es negativa."),
      dx("anemia", "Anemia del embarazo", false, "En el primer trimestre la anemia es Hb menor de 11; tiene 11,8."),
      dx("hiperemesis", "Hiperemesis gravídica", false, "Náuseas leves sin pérdida de peso ni deshidratación."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("suplementos", "Ácido fólico y hierro según norma", "clave", "Previenen defectos del tubo neural y anemia."),
      mg("vacunas", "Vacunas: antigripal (en temporada), dTpa desde la semana 20 y completar doble adultos y hepatitis B si falta", "clave", "Protegen a la madre y al recién nacido (tos convulsa, gripe, tétanos)."),
      mg("toxo", "Medidas de prevención de toxoplasmosis y repetir la serología cada trimestre", "clave", "Es susceptible: carne bien cocida, lavar verduras, guantes en el jardín, evitar arena de gatos."),
      mg("anti-d", "Plan de inmunoglobulina anti-D en la semana 28 y dentro de las 72 h del parto si el bebé es Rh positivo", "clave", "Previene la isoinmunización y la enfermedad hemolítica en futuros embarazos."),
      mg("controles", "Al menos 5 controles (idealmente 8) y pautas de alarma", "util", "Control prenatal según la norma nacional."),
      mg("reposo", "Reposo absoluto por ser primer embarazo", "innecesario", "No hay indicación; la actividad física moderada es beneficiosa."),
      mg("antiemeticos-todos", "Suspender toda medicación, incluso el ácido fólico, por miedo a malformaciones", "riesgoso", "El ácido fólico previene malformaciones."),
    ],
  },
  debrief: {
    diagnosis: "Embarazo de 8 semanas de bajo riesgo en primigesta de 23 años, factor Rh negativo no sensibilizada y toxoplasmosis susceptible.",
    pathologies: [
      { name: "Embarazo de bajo riesgo", role: "principal", why: "Primera consulta prenatal en una gestante sana." },
      { name: "Factor Rh negativo no sensibilizada", role: "asociada", why: "Requiere profilaxis anti-D." },
      { name: "Isoinmunización, anemia, infecciones congénitas", role: "diferencial", why: "Lo que se busca en el control prenatal." },
    ],
    reasoning: [
      "Causa: el control prenatal busca detectar a tiempo problemas tratables en la madre y el feto.",
      "Mecanismo: el rastreo de infecciones (sífilis, VIH, Chagas, hepatitis B, toxoplasmosis) y de factores de riesgo (Rh, diabetes, hipertensión) permite prevenir la transmisión o el daño.",
      "Consecuencia: menos mortalidad materna y perinatal, menos prematurez y menos infecciones congénitas.",
    ],
    epidemiology:
      "En Argentina hay unos 500.000 nacimientos por año. El control prenatal temprano (antes de la semana 13) y completo es una de las intervenciones más eficaces para reducir la mortalidad materna e infantil. Alrededor del 15 % de la población es Rh negativa.",
    management: [
      "Captación temprana, antes de la semana 13, y carnet perinatal.",
      "Anamnesis completa, examen, laboratorio y serologías del primer trimestre.",
      "Suplementos, vacunas y consejería (alimentación, consumos, signos de alarma).",
      "Controles periódicos con TA, peso, altura uterina y latidos fetales; repetir serologías y PTOG a las 24–28 semanas.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía para la atención del embarazo y el puerperio (recomendaciones para la práctica del control preconcepcional, prenatal y puerperal).", "Calendario Nacional de Vacunación."],
    pearls: ["Primer control antes de la semana 13.", "Rh negativa: Coombs y anti-D.", "Serologías: VDRL, VIH, hepatitis B, Chagas, toxoplasmosis."],
    pitfalls: ["No repetir la serología en la toxoplasmosis susceptible.", "Olvidar la dTpa."],
    tribunal: [
      qa("¿Cómo se calcula la fecha probable de parto?", "Regla de Naegele: a la fecha de última menstruación se le suman 7 días y se le restan 3 meses (o se suman 280 días); si la FUM es incierta, se usa la ecografía del primer trimestre."),
      qa("¿Qué vacunas se dan en el embarazo?", "Antigripal en cualquier trimestre en temporada, triple bacteriana acelular (dTpa) desde la semana 20 en cada embarazo, doble adultos si no está completa, hepatitis B si no está vacunada y, según el contexto, otras inactivadas. Las vacunas a virus vivos (triple viral, varicela, fiebre amarilla salvo excepciones) están contraindicadas."),
      qa("¿Cuántos controles prenatales y cuándo?", "La norma nacional recomienda al menos 5 controles, idealmente con el primero antes de la semana 13; la OMS propone 8 contactos. En cada uno: TA, peso, altura uterina, latidos fetales y signos de alarma."),
    ],
  },
};
