import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const cancerColorrectal: ClinicalCase = {
  id: "cancer-colorrectal",
  level: 3,
  area: "Oncología",
  setting: "Consultorio",
  patient: { age: 63, ageUnit: "años", sex: "M", context: "Colectivero jubilado. Nunca se hizo estudios de colon." },
  frequency: "frecuente",
  intro: "“Ando muy cansado hace meses. Me dijeron que tengo anemia. Y desde hace un tiempo voy al baño distinto: a veces constipado, a veces suelto.”",
  vitals: { TA: "122/76 mmHg", FC: "94 lpm", "T°": "36,5 °C", Peso: "74 kg (hace 6 meses: 79 kg)" },
  anamnesis: [
    act("ritmo", "¿Cómo cambió el ritmo evacuatorio? ¿Desde cuándo?", "clave", "“Hace cuatro meses: alterno constipación con diarrea, y siento que no termino de evacuar.”", "Un cambio persistente del ritmo evacuatorio después de los 50 años es un signo de alarma de cáncer colorrectal."),
    act("sangre", "¿Vio sangre en la materia fecal?", "clave", "“A veces con un poco de sangre oscura mezclada.”", "Sangre mezclada con la materia fecal sugiere origen colónico (la de las hemorroides es roja, sobre las heces)."),
    act("peso", "¿Bajó de peso sin querer?", "clave", "“Cinco kilos en seis meses.”", "Pérdida de peso involuntaria: síntoma de alarma."),
    act("familia", "¿Alguien en su familia tuvo cáncer de colon o pólipos?", "clave", "“Mi papá murió de cáncer de colon a los 70.”", "Un familiar de primer grado con cáncer colorrectal aumenta el riesgo y adelanta el tamizaje en los hijos."),
    act("tamizaje", "¿Se hizo alguna vez el test de sangre oculta o una colonoscopia?", "util", "“Nunca.”", "Debió hacerse tamizaje desde los 50 años."),
    act("dolor", "¿Tiene dolor abdominal, distensión o vómitos?", "util", "“Cólicos a veces, sin vómitos.”", "Distensión y vómitos con falta de gases indicarían obstrucción."),
    act("habitos", "¿Cómo se alimenta? ¿Fuma? ¿Toma alcohol?", "util", "“Mucha carne y fiambre, poca verdura. Fumé 30 años.”", "Dieta rica en carnes rojas y procesadas, tabaco, alcohol, obesidad y sedentarismo son factores de riesgo."),
    act("aines", "¿Toma aspirina o anticoagulantes?", "util", "“No.”", "Explicarían sangrado, pero no descartan la lesión."),
    act("hobby", "¿Qué le gusta hacer?", "neutro", "“Ir a pescar.”", "No orienta."),
  ],
  exam: [
    act("palidez", "Piel y mucosas", "clave", "Palidez cutáneo-mucosa.", "Anemia clínica."),
    act("abdomen", "Palpación abdominal", "clave", "Abdomen blando, sin masas palpables ni hepatomegalia.", "Una masa o hepatomegalia nodular orientarían a enfermedad avanzada."),
    act("tacto", "Tacto rectal", "clave", "Sin masas al alcance del dedo; restos de materia fecal oscura en el guante.", "Descarta un tumor rectal bajo; el tacto es parte del examen ante sangrado."),
    act("ganglios", "Ganglios supraclaviculares", "util", "No palpables.", "El ganglio de Virchow orientaría a enfermedad metastásica."),
  ],
  studies: [
    study("Laboratorio", "hemograma", "Hemograma, ferritina y hepatograma", "clave", "Hb 9,6 g/dl, VCM 72 fl, ferritina 7 ng/ml. Hepatograma normal.", "Anemia ferropénica en un varón: obliga a estudiar el tubo digestivo."),
    study("Otros", "colono", "Colonoscopia completa con biopsia", "clave", "Lesión vegetante, ulcerada, que ocupa la mitad de la circunferencia del sigma. Biopsia: adenocarcinoma moderadamente diferenciado. Dos pólipos pequeños resecados en colon transverso.", "Es el estudio de elección: confirma, biopsia y evalúa todo el colon (lesiones sincrónicas)."),
    study("Imágenes", "tc", "Tomografía de tórax, abdomen y pelvis con contraste", "clave", "Engrosamiento del sigma con ganglios regionales; sin metástasis hepáticas ni pulmonares.", "Estadificación a distancia."),
    study("Laboratorio", "cea", "CEA basal", "util", "8 ng/ml.", "No sirve para diagnosticar, pero el valor basal se usa para el seguimiento."),
    study("Laboratorio", "sangre-oculta", "Test de sangre oculta en materia fecal para decidir", "innecesario", "No se realizó.", "Es una herramienta de tamizaje en personas sin síntomas; con síntomas de alarma se va directo a la colonoscopia."),
    study("Imágenes", "pet", "PET-TC de rutina", "innecesario", "No se realizó.", "No es estándar en la estadificación inicial."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("ccr", "Adenocarcinoma de sigma con compromiso ganglionar regional, sin metástasis a distancia, con anemia ferropénica", true, "Cambio del ritmo evacuatorio, sangre mezclada, pérdida de peso y anemia ferropénica en un varón de 63 años con antecedente familiar; colonoscopia y biopsia confirmatorias."),
      dx("hemorroides", "Hemorroides", false, "Dan sangre roja sobre la materia fecal, sin anemia importante ni pérdida de peso; nunca explican una ferropenia sin estudiar el colon."),
      dx("diverticular", "Enfermedad diverticular", false, "Puede dar sangrado o cambios del ritmo, pero no pérdida de peso con una lesión vegetante."),
      dx("eii", "Enfermedad inflamatoria intestinal", false, "Diarrea crónica con sangre, en general en jóvenes, con inflamación de la mucosa."),
      dx("intestino-irritable", "Síndrome de intestino irritable", false, "No da sangrado, anemia ni pérdida de peso; y no empieza después de los 50."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cirugia", "Derivación a cirugía para colectomía (sigmoidectomía) con linfadenectomía", "clave", "Tratamiento curativo del cáncer de colon localizado."),
      mg("adyuvancia", "Quimioterapia adyuvante según el estadio patológico (ganglios positivos)", "clave", "El compromiso ganglionar (estadio III) indica quimioterapia posoperatoria."),
      mg("hierro", "Hierro (oral o endovenoso) para la anemia", "util", "Mejora la tolerancia a la cirugía."),
      mg("familiares", "Tamizaje de los hijos con colonoscopia (antes de lo habitual)", "clave", "Los familiares de primer grado tienen mayor riesgo."),
      mg("comite", "Decisión en comité multidisciplinario y seguimiento con CEA, imágenes y colonoscopias", "util", "Detecta recurrencias y lesiones nuevas."),
      mg("hierro-solo", "Tratar la anemia con hierro y controlar en 6 meses", "riesgoso", "Retrasa el diagnóstico de un cáncer: toda ferropenia en un varón se estudia."),
      mg("hemorroides", "Indicar tratamiento para hemorroides", "riesgoso", "Atribuir el sangrado a las hemorroides sin colonoscopia es un error frecuente que demora el diagnóstico."),
    ],
  },
  debrief: {
    diagnosis: "Adenocarcinoma de sigma con compromiso ganglionar regional (estadio III probable), sin metástasis a distancia, con anemia ferropénica, en varón de 63 años sin tamizaje previo y con antecedente familiar.",
    pathologies: [
      { name: "Adenocarcinoma de colon (sigma)", role: "principal", why: "Confirmado por biopsia." },
      { name: "Anemia ferropénica por pérdida digestiva crónica", role: "asociada", why: "Sangrado oculto del tumor." },
      { name: "Pólipos adenomatosos sincrónicos", role: "asociada", why: "Resecados en la colonoscopia." },
      { name: "Hemorroides y enfermedad diverticular", role: "diferencial", why: "Causas benignas de sangrado que no deben cerrar el estudio." },
    ],
    reasoning: [
      "Causa: la mayoría de los cánceres colorrectales se originan en pólipos adenomatosos que, durante 10 años o más, acumulan mutaciones (APC, KRAS, p53): la secuencia adenoma-carcinoma.",
      "Mecanismo: el tumor crece en la luz y en la pared, sangra en forma oculta y se disemina por linfáticos (ganglios) y por la vena porta (hígado, la primera localización de metástasis).",
      "Consecuencia: anemia ferropénica (sobre todo en el colon derecho), cambio del ritmo evacuatorio y sangre en la materia fecal (colon izquierdo), dolor, pérdida de peso y obstrucción.",
      "Como el pólipo tarda años en transformarse, el tamizaje con sangre oculta o colonoscopia previene y detecta temprano.",
    ],
    epidemiology:
      "En la Argentina el cáncer colorrectal es el segundo más frecuente (unos 16.000 casos nuevos por año) y la segunda causa de muerte por cáncer. Afecta a ambos sexos, algo más a varones, y el 90 % de los casos ocurre después de los 50 años. El Programa Nacional recomienda tamizaje entre los 50 y 75 años con test de sangre oculta inmunoquímico anual o bienal y colonoscopia si es positivo.",
    management: [
      "Toda anemia ferropénica en varones y mujeres posmenopáusicas, o un cambio del ritmo evacuatorio con sangre después de los 50, requiere colonoscopia.",
      "Colonoscopia completa con biopsia; tomografía de estadificación y CEA basal.",
      "Colon: cirugía con linfadenectomía y quimioterapia adyuvante según el estadio. Recto: estadificación con resonancia y tratamiento neoadyuvante según el caso.",
      "Seguimiento con CEA, tomografía y colonoscopia.",
      "Tamizaje de familiares y de la población de 50 a 75 años.",
    ],
    sources: [
      "Instituto Nacional del Cáncer — Programa Nacional de Prevención y Detección Temprana del Cáncer Colorrectal.",
      "Sociedad Argentina de Coloproctología — Consensos de cáncer colorrectal.",
    ],
    pearls: ["Ferropenia en un varón = colonoscopia.", "Colon derecho: anemia. Colon izquierdo: cambio del ritmo y obstrucción.", "Tamizaje de 50 a 75 años con sangre oculta inmunoquímica."],
    pitfalls: ["Atribuir el sangrado a hemorroides sin estudiar.", "Usar CEA para diagnosticar.", "Dar hierro y no buscar la causa."],
    tribunal: [
      qa("¿Qué es la secuencia adenoma-carcinoma?", "La transformación progresiva de la mucosa normal en adenoma y luego en carcinoma por acumulación de mutaciones (APC al inicio, luego KRAS y p53), durante 10 años o más; por eso resecar pólipos previene el cáncer."),
      qa("¿Qué síndromes hereditarios conocés?", "La poliposis adenomatosa familiar (mutación de APC, cientos de pólipos, cáncer casi seguro si no se hace colectomía) y el síndrome de Lynch (inestabilidad de microsatélites, cáncer colorrectal temprano y de endometrio, ovario y otros)."),
      qa("¿Cómo se estadifica el cáncer de colon?", "Con el sistema TNM: profundidad de invasión de la pared (T), ganglios (N) y metástasis (M). Estadio I y II sin ganglios; III con ganglios (indica quimioterapia adyuvante); IV con metástasis a distancia."),
      qa("¿En qué se diferencia la clínica del colon derecho y del izquierdo?", "El derecho tiene luz amplia y heces líquidas: da anemia ferropénica, astenia y masa palpable. El izquierdo tiene luz estrecha y heces sólidas: da cambio del ritmo, heces acintadas, sangre y obstrucción."),
    ],
  },
};
