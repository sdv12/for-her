import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const gota: ClinicalCase = {
  id: "gota-aguda",
  level: 2,
  area: "Reumatología",
  setting: "Guardia",
  patient: { age: 55, ageUnit: "años", sex: "M", context: "Hipertenso, con sobrepeso. Fue a un casamiento el sábado." },
  frequency: "frecuente",
  intro: "“Me desperté a las 4 de la mañana con un dolor insoportable en el dedo gordo del pie derecho. No soporto ni la sábana. Está rojo e hinchado.”",
  vitals: { TA: "148/92 mmHg", FC: "90 lpm", "T°": "37,6 °C" },
  anamnesis: [
    act("inicio", "¿Cómo empezó? ¿Tuvo un golpe?", "clave", "“De golpe, a la madrugada. No me golpeé.”", "Inicio brusco nocturno, máximo en menos de 24 h, sin trauma: típico de la artritis gotosa."),
    act("dieta", "¿Qué comió y tomó estos días?", "clave", "“En el casamiento comí mucha carne y tomé cerveza y vino.”", "Alcohol (sobre todo cerveza), carnes rojas, mariscos y bebidas azucaradas aumentan el ácido úrico y disparan crisis."),
    act("medicacion", "¿Qué medicación toma?", "clave", "“Hidroclorotiazida para la presión y aspirina.”", "Las tiazidas y la aspirina en dosis bajas reducen la excreción de ácido úrico."),
    act("previos", "¿Le pasó antes?", "util", "“Una vez, hace un año, en el mismo dedo, y se pasó en una semana.”", "Las crisis autolimitadas y recurrentes en la primera metatarsofalángica son típicas."),
    act("infeccion", "¿Tuvo heridas, fiebre alta o escalofríos? ¿Tiene una prótesis o infiltraciones recientes?", "clave", "“No, nada.”", "La artritis séptica es el diferencial que no se puede perder en una monoartritis aguda."),
    act("rinon", "¿Tuvo cálculos renales o problemas en los riñones?", "util", "“Un cólico renal hace años.”", "La litiasis úrica y la nefropatía se asocian a la gota y condicionan el tratamiento."),
    act("equipo", "¿De qué cuadro es?", "neutro", "“De Boca.”", "No orienta."),
  ],
  exam: [
    act("articulacion", "Examen de la articulación", "clave", "Primera metatarsofalángica derecha tumefacta, eritematosa, caliente, con piel brillante y dolor extremo a la mínima presión.", "Podagra: la presentación más clásica de la gota."),
    act("tofos", "Buscar tofos (pabellones auriculares, codos, dedos)", "util", "Sin tofos.", "Los tofos indican gota crónica con depósitos y cambian las metas del tratamiento."),
    act("otras", "Examen de otras articulaciones", "util", "Sin otras articulaciones comprometidas.", "Monoartritis: amplía el diferencial hacia infección o trauma."),
    act("piel", "Buscar heridas o puertas de entrada en el pie", "util", "Sin heridas.", "Disminuye la probabilidad de artritis séptica o celulitis."),
  ],
  studies: [
    study("Laboratorio", "artrocentesis", "Artrocentesis con análisis del líquido (cristales, recuento, Gram y cultivo)", "clave", "Líquido inflamatorio (18.000 leucocitos, 85 % neutrófilos). Cristales de urato monosódico en aguja, con birrefringencia negativa. Gram negativo.", "Es el estándar: confirma la gota y descarta infección. En la primera MTF se puede hacer con aguja fina."),
    study("Laboratorio", "uricemia", "Ácido úrico en sangre", "util", "6,4 mg/dl.", "Durante la crisis puede ser normal: no descarta ni confirma. Sirve en el seguimiento (meta < 6 mg/dl)."),
    study("Laboratorio", "lab", "Hemograma, función renal, glucemia y lípidos", "util", "Leucocitos 11.200, creatinina 1,2, glucemia 118, triglicéridos 260.", "Función renal para elegir y dosificar; la gota se asocia a síndrome metabólico."),
    study("Imágenes", "rx", "Radiografía del pie", "innecesario", "Partes blandas aumentadas; sin erosiones.", "En la primera crisis casi siempre es normal; muestra erosiones en sacabocado en la gota crónica."),
    study("Imágenes", "rmn", "Resonancia del pie", "innecesario", "No se realizó.", "No aporta al diagnóstico de una crisis típica."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("gota", "Artritis gotosa aguda (podagra)", true, "Monoartritis aguda nocturna de la primera MTF tras alcohol y carne, con tiazida, y cristales de urato con birrefringencia negativa."),
      dx("septica", "Artritis séptica", false, "Daría fiebre alta, puerta de entrada y Gram o cultivo positivos; el líquido tendría más de 50.000 leucocitos en general."),
      dx("pseudogota", "Pseudogota (condrocalcinosis)", false, "Cristales de pirofosfato de calcio, romboidales con birrefringencia positiva; más en rodilla y en ancianos."),
      dx("celulitis", "Celulitis del pie", false, "No da derrame articular ni cristales; hay una placa difusa con puerta de entrada."),
      dx("fractura", "Fractura por estrés", false, "Dolor mecánico sin signos inflamatorios tan floridos ni cristales."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("antiinflamatorio", "AINE en dosis plenas (naproxeno o indometacina) o colchicina en dosis bajas, lo antes posible", "clave", "Tratan la inflamación; son más eficaces cuanto antes se inician. Corticoides si hay contraindicaciones."),
      mg("hielo", "Reposo de la articulación y hielo local", "util", "Alivian el dolor."),
      mg("factores", "Cambiar la tiazida por losartán, reducir alcohol y carnes rojas, bajar de peso", "clave", "El losartán baja la presión y además aumenta la excreción de ácido úrico; los cambios de hábitos reducen crisis."),
      mg("seguimiento", "Control para evaluar tratamiento hipouricemiante (alopurinol) según recurrencias, tofos o daño renal", "util", "Con dos o más crisis por año, tofos o litiasis, se indica para llegar a uricemia < 6 mg/dl, con profilaxis antiinflamatoria al inicio."),
      mg("colchicina-alta", "Colchicina 1 mg cada hora hasta que ceda el dolor o aparezca diarrea", "riesgoso", "El esquema de dosis altas no es más eficaz y causa toxicidad digestiva grave."),
      mg("atb", "Cefalexina empírica", "innecesario", "Con cristales y Gram negativo, sin puerta de entrada ni fiebre alta, no hay infección que tratar."),
    ],
  },
  debrief: {
    diagnosis: "Artritis gotosa aguda de la primera metatarsofalángica derecha (podagra), desencadenada por alcohol y dieta, con tiazidas como factor contribuyente.",
    pathologies: [
      { name: "Gota (artritis gotosa aguda)", role: "principal", why: "Monoartritis con cristales de urato." },
      { name: "Síndrome metabólico", role: "asociada", why: "Sobrepeso, hipertensión, triglicéridos altos y glucemia alterada." },
      { name: "Artritis séptica", role: "diferencial", why: "Siempre a descartar en una monoartritis." },
      { name: "Pseudogota", role: "diferencial", why: "Otra artritis por cristales." },
      { name: "Celulitis", role: "diferencial", why: "Puede imitar una podagra." },
    ],
    reasoning: [
      "Causa: hiperuricemia por menor excreción renal (la mayoría) o mayor producción. Tiazidas, aspirina en dosis bajas, alcohol, fructosa y purinas la favorecen.",
      "Mecanismo: el urato precipita como cristales de urato monosódico en las articulaciones, sobre todo en las periféricas y más frías (primera MTF). Un aumento o un descenso brusco del urato los libera; los macrófagos los fagocitan y activan el inflamasoma NLRP3 con liberación de IL-1β.",
      "Consecuencia: inflamación aguda intensa con llegada de neutrófilos: dolor, calor, rubor, tumefacción. Cede sola en 1–2 semanas, pero las crisis se repiten y pueden aparecer tofos y daño articular.",
      "Por eso en la crisis el ácido úrico puede ser normal: parte del urato está depositado en la articulación.",
    ],
    epidemiology:
      "Es la artritis inflamatoria más frecuente en varones adultos. Afecta a cerca del 1–2 % de la población, con predominio masculino marcado (3–4:1); en mujeres aparece después de la menopausia, cuando se pierde el efecto uricosúrico de los estrógenos. El pico es entre los 40 y 60 años y se asocia a obesidad, hipertensión, alcohol y enfermedad renal.",
    management: [
      "Confirmar con artrocentesis (cristales) y descartar infección.",
      "Tratar la crisis cuanto antes: AINE, colchicina en dosis bajas o corticoides.",
      "No suspender un hipouricemiante si ya lo toma.",
      "Corregir factores: alcohol, dieta, peso, fármacos (tiazidas → losartán).",
      "Hipouricemiante (alopurinol titulado) con profilaxis si hay crisis recurrentes, tofos, daño articular o litiasis; meta < 6 mg/dl.",
    ],
    sources: [
      "Sociedad Argentina de Reumatología — Guías de práctica clínica para el diagnóstico y tratamiento de la gota.",
      "Recomendaciones EULAR y ACR, adoptadas por la SAR.",
    ],
    pearls: [
      "Gota: agujas con birrefringencia negativa. Pseudogota: romboidales con birrefringencia positiva.",
      "El ácido úrico normal en la crisis no descarta gota.",
      "Monoartritis aguda = punzar.",
    ],
    pitfalls: ["Descartar gota por un ácido úrico normal.", "No punzar y perder una artritis séptica.", "Colchicina en dosis altas."],
  },
};
