import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const anemiaLactante: ClinicalCase = {
  id: "anemia-ferropenica-lactante",
  level: 1,
  area: "Pediatría",
  setting: "CAPS",
  patient: { age: 13, ageUnit: "meses", sex: "F", context: "Control de salud. Nació a término con 2,6 kg." },
  frequency: "muy-frecuente",
  intro: "“La traigo al control. La abuela dice que está muy blanca. Come poco, pero toma mucha leche.” (relata la madre)",
  vitals: { FC: "126 lpm", FR: "28 rpm", "T°": "36,5 °C", Peso: "8,6 kg" },
  anamnesis: [
    act("leche", "¿Qué leche toma y cuánta por día?", "clave", "“Leche de vaca entera en mamadera desde los 6 meses, como un litro por día.”", "Leche de vaca antes del año y en exceso: poco hierro, desplaza a otros alimentos y puede producir microsangrados intestinales."),
    act("hierro", "¿Recibió gotas de hierro?", "clave", "“Las dejamos porque le manchaban los dientes.”", "La suplementación con hierro es universal en lactantes desde los 4–6 meses."),
    act("alimentacion", "¿Qué come? ¿Carne, legumbres?", "clave", "“Puré y fideos, carne casi nada.”", "Dieta pobre en hierro hemo."),
    act("pica", "¿Come tierra, papel o hielo?", "util", "“Sí, tierra del patio.”", "Pica: síntoma de ferropenia; también riesgo de parasitosis y plomo."),
    act("sangrado", "¿Tuvo diarrea con sangre o caca negra?", "util", "“No.”", "Descarta sangrado franco."),
    act("lactancia", "¿Tomó el pecho?", "util", "“Hasta los 5 meses.”", "La leche materna tiene hierro de alta absorción."),
    act("cancion", "¿Qué canción le gusta?", "neutro", "“La de la vaca Lola.”", "No orienta."),
  ],
  exam: [
    act("palidez", "Piel, mucosas y palmas", "clave", "Palidez cutáneo-mucosa y palmar.", "Signo clínico de anemia."),
    act("crecimiento", "Peso, talla y desarrollo", "clave", "Peso en percentilo 10, talla en 25; desarrollo adecuado.", "Evaluar el impacto nutricional."),
    act("visceromegalias", "Hígado, bazo, ganglios", "util", "Sin visceromegalias ni adenopatías.", "Descarta hemólisis y enfermedades hematológicas graves."),
    act("soplo", "Auscultación cardíaca", "util", "Soplo sistólico suave.", "Soplo funcional por anemia."),
  ],
  studies: [
    study("Laboratorio", "hemograma", "Hemograma con índices", "clave", "Hb 8,6 g/dl, VCM 62, HCM 19, RDW alto, plaquetas 480.000.", "Anemia microcítica hipocrómica con RDW alto: ferropénica."),
    study("Laboratorio", "ferritina", "Ferritina", "util", "5 ng/ml.", "Confirma depósitos de hierro vacíos."),
    study("Laboratorio", "parasitos", "Coproparasitológico y sangre oculta", "util", "Negativos.", "Descarta parasitosis y sangrado oculto."),
    study("Otros", "medula", "Punción de médula ósea", "innecesario", "No se realizó.", "La anemia ferropénica no requiere médula."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("ferropenica", "Anemia ferropénica moderada del lactante por dieta inadecuada (leche de vaca precoz) y falta de suplementación", true, "Hb 8,6 microcítica hipocrómica con RDW alto y ferritina baja, en lactante con mucha leche de vaca, poca carne y sin hierro suplementario."),
      dx("talasemia", "Rasgo talasémico", false, "El RDW es normal y la ferritina normal en la talasemia menor."),
      dx("fisiologica", "Anemia fisiológica", false, "Ocurre a los 2–3 meses y no es microcítica."),
      dx("leucemia", "Leucemia", false, "Solo hay anemia, sin otras citopenias ni organomegalias."),
      dx("plomo", "Intoxicación por plomo", false, "Puede asociarse por la pica, pero la ferritina baja confirma ferropenia."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("hierro", "Sulfato ferroso 3–6 mg/kg/día de hierro elemental, alejado de la leche, por 3 meses después de normalizar la Hb", "clave", "Repone la Hb y los depósitos."),
      mg("leche", "Limitar la leche de vaca a 500 ml por día y ofrecerla en vaso", "clave", "El exceso de leche es la causa."),
      mg("dieta", "Incorporar carnes, legumbres y vitamina C con las comidas", "clave", "Hierro de la dieta y mejor absorción."),
      mg("control", "Control de Hb al mes (debe subir 1 g/dl o más) y explicar que las manchas de los dientes se previenen", "util", "Evalúa respuesta y adherencia."),
      mg("transfusion", "Transfusión de glóbulos rojos", "innecesario", "Anemia crónica bien tolerada: se trata con hierro oral."),
      mg("hierro-te", "Dar el hierro con la leche o con té para que lo acepte", "riesgoso", "El calcio y los taninos bloquean la absorción."),
    ],
  },
  debrief: {
    diagnosis: "Anemia ferropénica moderada en lactante de 13 meses por introducción precoz y exceso de leche de vaca, dieta pobre en hierro y abandono de la suplementación.",
    pathologies: [
      { name: "Anemia ferropénica del lactante", role: "principal", why: "Anemia microcítica con ferritina baja." },
      { name: "Pica", role: "asociada", why: "Síntoma de ferropenia y factor de riesgo." },
      { name: "Talasemia, intoxicación por plomo, leucemia", role: "diferencial", why: "Otras causas de anemia en la infancia." },
    ],
    reasoning: [
      "Causa: necesidades altas por el crecimiento, bajo peso al nacer, leche de vaca precoz y dieta pobre en hierro.",
      "Mecanismo: se agotan los depósitos y la médula produce glóbulos rojos pequeños y con poca hemoglobina.",
      "Consecuencia: palidez, irritabilidad, falta de apetito, pica y, si es prolongada, alteraciones del neurodesarrollo y de la conducta que pueden ser irreversibles.",
    ],
    epidemiology:
      "La anemia ferropénica es la carencia nutricional más frecuente en Argentina; afecta a una proporción alta de niños de 6 a 24 meses, sobre todo en hogares vulnerables. Prematurez, bajo peso al nacer, gemelaridad, leche de vaca antes del año y falta de suplementación son los factores principales.",
    management: [
      "Prevención: clampeo tardío del cordón, lactancia, hierro desde los 4–6 meses hasta el año (o más en prematuros).",
      "Pesquisa de anemia con hemograma entre los 9 y 12 meses.",
      "Tratamiento con hierro oral y corrección de la dieta.",
      "Controlar la respuesta y completar 3 meses tras normalizar.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Deficiencia de hierro y anemia ferropénica: guía para su prevención, diagnóstico y tratamiento.", "Ministerio de Salud de la Nación — Guías alimentarias para la población infantil."],
    pearls: ["Leche de vaca antes del año = anemia.", "Hierro preventivo desde los 4–6 meses.", "Hierro lejos de la leche."],
    pitfalls: ["Suspender el hierro por las manchas.", "Transfundir una anemia crónica tolerada."],
    tribunal: [
      qa("¿Por qué la leche de vaca produce anemia en lactantes?", "Porque tiene poco hierro y de baja absorción, su calcio y caseína inhiben la absorción del hierro de otros alimentos, desplaza a los alimentos ricos en hierro y antes del año puede causar microsangrados intestinales."),
      qa("¿Cómo se diferencia la anemia ferropénica de la talasemia menor?", "En la ferropénica el RDW está alto, la ferritina baja y el índice de Mentzer (VCM/recuento de glóbulos rojos) es mayor de 13; en la talasemia menor el RDW es normal, la ferritina normal, hay muchos glóbulos rojos (Mentzer menor de 13) y la HbA2 está aumentada en la beta talasemia."),
      qa("¿Qué valores definen anemia en niños?", "Según la OMS: de 6 meses a 5 años, Hb menor de 11 g/dl; de 5 a 11 años, menor de 11,5; de 12 a 14 años, menor de 12; en el embarazo, menor de 11."),
    ],
  },
};
