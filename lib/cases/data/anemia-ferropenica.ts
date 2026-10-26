import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const anemiaFerropenica: ClinicalCase = {
  id: "anemia-ferropenica-menorragia",
  level: 1,
  area: "Hematología",
  setting: "CAPS",
  patient: { age: 32, ageUnit: "años", sex: "F", context: "Docente, dos hijos." },
  frequency: "muy-frecuente",
  intro: "“Ando muy cansada hace meses. Subo una escalera y me agito, y me dicen que estoy pálida.”",
  vitals: { TA: "105/65 mmHg", FC: "96 lpm", FR: "16 rpm", "T°": "36,4 °C", Peso: "58 kg" },
  anamnesis: [
    act("menstruacion", "¿Cómo son sus menstruaciones?", "clave", "“Muy abundantes desde hace un año: uso toallas nocturnas de día y a veces mancho la ropa. Me duran ocho días.”", "En la mujer en edad fértil, la pérdida menstrual aumentada es la causa más frecuente de anemia ferropénica."),
    act("digestivo", "¿Vio sangre en la materia fecal o materia fecal negra?", "clave", "“No, nunca.”", "Siempre hay que buscar sangrado digestivo; en varones y en mujeres posmenopáusicas es la causa a descartar primero."),
    act("dieta", "¿Cómo es su alimentación? ¿Come carne?", "clave", "“Como poca carne, más que nada fideos y arroz.”", "El hierro hemo de la carne se absorbe mucho mejor; una dieta pobre suma al balance negativo."),
    act("pica", "¿Tiene ganas de comer hielo, tierra u otras cosas raras?", "util", "“Sí, como mucho hielo, me da vergüenza decirlo.”", "La pagofagia (hielo) es bastante específica de déficit de hierro."),
    act("embarazos", "¿Cuántos embarazos tuvo? ¿Está amamantando?", "util", "“Dos partos, el último hace tres años. Ya no amamanto.”", "Embarazos y lactancias seguidas vacían los depósitos de hierro."),
    act("celiaca", "¿Tiene diarrea, distensión o pérdida de peso?", "util", "“No.”", "La enfermedad celíaca es causa frecuente de ferropenia que no responde al hierro oral."),
    act("disnea", "¿Tiene dolor de pecho o falta de aire en reposo?", "clave", "“No, solo cuando hago esfuerzo.”", "Síntomas en reposo o angina indicarían anemia mal tolerada y cambiarían la urgencia."),
    act("viajes", "¿Viajó al exterior recientemente?", "neutro", "“No.”", "No orienta en este caso."),
  ],
  exam: [
    act("palidez", "Piel y mucosas", "clave", "Palidez cutáneo-mucosa marcada, conjuntivas pálidas.", "Signo de anemia; no distingue la causa."),
    act("unas", "Uñas, lengua y comisuras", "util", "Uñas frágiles y aplanadas; queilitis angular.", "La coiloniquia, la glositis y la queilitis orientan a ferropenia crónica."),
    act("cardio", "Auscultación cardíaca", "util", "Soplo sistólico eyectivo 2/6 en foco pulmonar, sin irradiación.", "Soplo funcional por circulación hiperdinámica."),
    act("abdomen", "Palpación abdominal y búsqueda de esplenomegalia", "clave", "Abdomen blando, sin visceromegalias ni masas.", "La esplenomegalia orientaría a hemólisis u otras causas hematológicas."),
    act("tacto", "Tacto rectal", "innecesario", "Sin sangre ni masas.", "En una mujer joven con menorragia clara no es necesario de entrada; sí en el varón o la posmenopáusica."),
  ],
  studies: [
    study("Laboratorio", "hemograma", "Hemograma con índices y frotis", "clave", "Hb 8,9 g/dl, VCM 69 fl, HCM 21 pg, ADE 18 %. Plaquetas 420.000. Frotis: microcitosis, hipocromía, anisocitosis.", "Anemia microcítica hipocrómica con ADE alto: el patrón típico de ferropenia."),
    study("Laboratorio", "ferritina", "Ferritina, ferremia y saturación de transferrina", "clave", "Ferritina 6 ng/ml, saturación 6 %, transferrina elevada.", "La ferritina baja confirma el déficit de hierro (es el indicador más específico)."),
    study("Laboratorio", "reticulocitos", "Recuento de reticulocitos", "util", "Índice reticulocitario bajo.", "Anemia arregenerativa: la médula no tiene hierro para producir."),
    study("Laboratorio", "anticuerpos", "Anticuerpos para celiaquía (antitransglutaminasa IgA con IgA total)", "util", "Negativos.", "Se piden en ferropenia sin causa clara o que no responde; acá suman."),
    study("Imágenes", "eco", "Ecografía ginecológica transvaginal", "util", "Útero con mioma intramural de 2 cm.", "Busca la causa de la menorragia (miomas, pólipos, adenomiosis)."),
    study("Otros", "vcc", "Videocolonoscopia y endoscopia alta", "innecesario", "No se realizó.", "En una mujer joven con causa ginecológica evidente y sin síntomas digestivos no está indicada de entrada."),
    study("Laboratorio", "b12", "Vitamina B12 y ácido fólico", "innecesario", "Normales.", "Son causas de anemia macrocítica; con VCM bajo no orientan."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("ferro", "Anemia ferropénica por pérdida menstrual aumentada", true, "Microcítica hipocrómica, ADE alto, ferritina baja y una causa clara de pérdida."),
      dx("talasemia", "Rasgo talasémico", false, "También es microcítica, pero con ferritina normal, ADE normal, glóbulos rojos aumentados y anemia leve."),
      dx("cronica", "Anemia de los procesos crónicos", false, "Suele ser normocítica o levemente microcítica, con ferritina normal o alta."),
      dx("megaloblastica", "Anemia megaloblástica", false, "VCM alto, neutrófilos hipersegmentados, déficit de B12 o folato."),
      dx("hemolitica", "Anemia hemolítica", false, "Reticulocitos altos, LDH alta, bilirrubina indirecta alta, haptoglobina baja, a veces esplenomegalia."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("hierro", "Sulfato ferroso oral, 60–120 mg de hierro elemental por día, en ayunas o día por medio", "clave", "Primera línea. Las dosis diarias altas aumentan la hepcidina y reducen la absorción: dosis única o en días alternos se tolera mejor."),
      mg("gine", "Derivación a ginecología para estudiar y tratar la menorragia", "clave", "Sin tratar la causa la anemia vuelve."),
      mg("control", "Control con hemograma y reticulocitos a las 2–4 semanas; sostener el hierro 3 meses tras normalizar la Hb", "clave", "Los reticulocitos suben a la semana; la Hb debería subir 1–2 g/dl en un mes. Después hay que llenar los depósitos."),
      mg("dieta", "Consejería: carnes, legumbres con vitamina C, evitar mate y té con las comidas", "util", "Mejora la absorción; no alcanza por sí sola para corregir la anemia."),
      mg("transfusion", "Transfusión de glóbulos rojos", "riesgoso", "No está indicada en una anemia crónica bien tolerada, sin inestabilidad ni angina: expone a riesgos sin beneficio."),
      mg("ev", "Hierro endovenoso de entrada", "innecesario", "Se reserva para intolerancia o falla del oral, malabsorción o necesidad de reposición rápida."),
      mg("b12", "Vitamina B12 intramuscular", "innecesario", "No hay déficit."),
    ],
  },
  debrief: {
    diagnosis: "Anemia ferropénica moderada por menorragia (probable mioma uterino), bien tolerada.",
    pathologies: [
      { name: "Anemia ferropénica", role: "principal", why: "Microcitosis, hipocromía, ADE alto y ferritina baja." },
      { name: "Menorragia por mioma uterino", role: "asociada", why: "Es la causa de la pérdida de hierro." },
      { name: "Rasgo talasémico", role: "diferencial", why: "El otro gran diagnóstico de microcitosis." },
      { name: "Anemia de procesos crónicos", role: "diferencial", why: "Ferritina normal o alta, inflamación de base." },
      { name: "Enfermedad celíaca", role: "diferencial", why: "Causa de ferropenia refractaria." },
    ],
    reasoning: [
      "Causa: el balance de hierro es negativo cuando la pérdida (menstruación abundante) supera lo que se absorbe de la dieta (1–2 mg/día).",
      "Mecanismo: primero se vacían los depósitos (ferritina baja), después baja el hierro de transporte (saturación de transferrina baja) y por último la médula fabrica glóbulos rojos chicos y con poca hemoglobina.",
      "Consecuencia: menor transporte de oxígeno → cansancio, disnea de esfuerzo, taquicardia, palidez. El déficit tisular de hierro da uñas frágiles, queilitis, glositis y pica.",
      "Como la instalación es lenta, el organismo se adapta (más 2,3-DPG, más gasto cardíaco) y tolera hemoglobinas bajas sin síntomas en reposo.",
    ],
    epidemiology:
      "Es la anemia más frecuente del mundo y de la Argentina. Afecta sobre todo a mujeres en edad fértil, embarazadas y niños de 6 a 24 meses. En la mujer joven la causa principal es la pérdida menstrual; en varones y mujeres posmenopáusicas una ferropenia obliga a buscar sangrado digestivo (incluido el cáncer colorrectal).",
    management: [
      "Confirmar la ferropenia con ferritina e identificar la causa siempre.",
      "Hierro oral (sulfato ferroso) en dosis única diaria o en días alternos, alejado del mate, té y lácteos.",
      "Control a las 2–4 semanas (reticulocitos y Hb); continuar 3 meses después de normalizar la Hb para reponer depósitos.",
      "Tratar la causa: derivación a ginecología por la menorragia.",
      "Hierro endovenoso ante intolerancia, malabsorción o falta de respuesta; transfusión solo si hay inestabilidad o anemia grave sintomática.",
    ],
    sources: [
      "Sociedad Argentina de Hematología — Guías de diagnóstico y tratamiento: anemia ferropénica.",
      "Ministerio de Salud de la Nación — Encuesta Nacional de Nutrición y Salud (prevalencia de anemia).",
    ],
    pearls: [
      "Ferritina baja = déficit de hierro, sin dudas. Ferritina normal no lo descarta si hay inflamación.",
      "Microcitosis con Hb casi normal y glóbulos rojos altos (índice de Mentzer < 13): pensá en talasemia.",
      "Varón o posmenopáusica con ferropenia: endoscopia alta y colonoscopia.",
    ],
    pitfalls: ["Dar hierro sin buscar la causa.", "Suspender el hierro apenas se normaliza la hemoglobina.", "Transfundir una anemia crónica bien tolerada."],
  },
};
