import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const tvp: ClinicalCase = {
  id: "trombosis-venosa-profunda",
  level: 2,
  area: "Cardiovascular",
  setting: "Guardia",
  patient: { age: 34, ageUnit: "años", sex: "F", context: "Toma anticonceptivos orales combinados. Volvió hace 4 días de un viaje en colectivo de 18 horas." },
  frequency: "frecuente",
  intro: "“Tengo la pierna izquierda hinchada y me duele la pantorrilla desde hace dos días. Me cuesta caminar.”",
  vitals: { TA: "122/76 mmHg", FC: "86 lpm", FR: "16 rpm", "T°": "37,1 °C", "SatO₂": "98 %" },
  anamnesis: [
    act("disnea", "¿Te falta el aire, te duele el pecho al respirar o tosiste sangre?", "clave", "“No.”", "Descarta clínicamente un TEP asociado."),
    act("factores", "¿Tomás pastillas anticonceptivas? ¿Viajaste, te operaste o estuviste inmovilizada?", "clave", "“Tomo anticonceptivas. Viajé 18 horas en colectivo.”", "Estrógenos e inmovilidad: factores de riesgo de la tríada de Virchow."),
    act("antecedentes", "¿Tuviste trombosis antes o alguien en tu familia?", "clave", "“Mi mamá tuvo una trombosis en un embarazo.”", "Antecedente familiar: sospechar trombofilia."),
    act("embarazo", "¿Podés estar embarazada?", "clave", "“No, me vino hace dos semanas.”", "Cambia el anticoagulante y el estudio."),
    act("cancer", "¿Bajaste de peso o tenés algún síntoma nuevo?", "util", "“No.”", "El cáncer es un factor de riesgo a considerar."),
    act("fuma", "¿Fumás?", "util", "“No.”", "Suma riesgo con los anticonceptivos."),
    act("viaje", "¿A dónde viajaste?", "neutro", "“A Salta.”", "No orienta."),
  ],
  exam: [
    act("pierna", "Inspección y medición de ambas piernas", "clave", "Pantorrilla izquierda 4 cm más gruesa, edema con fóvea, levemente eritematosa.", "Asimetría mayor de 3 cm: criterio de Wells."),
    act("venas", "Palpación del trayecto venoso profundo", "clave", "Dolor a lo largo de la vena poplítea y femoral.", "Otro criterio de Wells."),
    act("pulmon", "Auscultación y signos de TEP", "util", "Normal.", "Sin signos de embolia."),
    act("pulsos", "Pulsos pedios", "util", "Presentes.", "Descarta isquemia."),
  ],
  studies: [
    study("Imágenes", "eco", "Ecodoppler venoso de miembros inferiores", "clave", "Trombosis de las venas femoral y poplítea izquierdas, no compresibles.", "Confirma TVP proximal."),
    study("Laboratorio", "ddimero", "Dímero D", "util", "Elevado.", "Con probabilidad baja sirve para descartar; con probabilidad alta se va directo a la imagen."),
    study("Laboratorio", "lab", "Hemograma, coagulograma, función renal y hepática", "clave", "Normales.", "Línea de base antes de anticoagular."),
    study("Laboratorio", "trombofilia", "Estudio de trombofilia en la fase aguda", "innecesario", "No se realizó.", "Se altera con la trombosis y la anticoagulación; si corresponde, se hace después."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("tvp", "Trombosis venosa profunda proximal femoropoplítea izquierda, provocada (anticonceptivos y viaje)", true, "Edema unilateral con asimetría y dolor en el trayecto venoso, Wells alto y ecodoppler con trombosis femoral y poplítea."),
      dx("celulitis", "Celulitis", false, "El eritema es leve, sin fiebre ni puerta de entrada; el doppler muestra trombosis."),
      dx("baker", "Quiste de Baker roto", false, "Habría masa poplítea y el doppler no mostraría trombo."),
      dx("desgarro", "Desgarro muscular del gemelo", false, "No hay traumatismo ni esfuerzo y hay trombosis."),
      dx("tvs", "Tromboflebitis superficial", false, "El trombo está en el sistema profundo."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("anticoagular", "Anticoagulación (heparina de bajo peso molecular y paso a anticoagulante oral directo o acenocumarol)", "clave", "Evita la extensión y el TEP; en una TVP provocada se mantiene al menos 3 meses."),
      mg("aco", "Suspender los anticonceptivos con estrógenos y ofrecer un método sin estrógenos", "clave", "Los estrógenos están contraindicados tras una trombosis."),
      mg("ambulatorio", "Tratamiento ambulatorio con control, si no hay TEP ni riesgo de sangrado", "util", "La TVP sin complicaciones puede tratarse en domicilio."),
      mg("deambular", "Deambulación temprana y media de compresión para el dolor", "util", "El reposo absoluto no previene el TEP."),
      mg("reposo", "Reposo absoluto en cama", "innecesario", "No mejora la evolución."),
      mg("aspirina", "Solo aspirina", "riesgoso", "No es tratamiento de la TVP."),
    ],
  },
  debrief: {
    diagnosis: "Trombosis venosa profunda proximal (femoropoplítea) del miembro inferior izquierdo, provocada por anticonceptivos con estrógenos y viaje prolongado, sin TEP clínico, en mujer de 34 años.",
    pathologies: [
      { name: "Trombosis venosa profunda proximal", role: "principal", why: "Trombo en femoral y poplítea." },
      { name: "Tromboembolismo pulmonar", role: "diferencial", why: "Complicación a descartar y prevenir." },
      { name: "Celulitis, quiste de Baker, desgarro", role: "diferencial", why: "Otras causas de pierna hinchada y dolorosa." },
    ],
    reasoning: [
      "Causa: estrógenos (hipercoagulabilidad) e inmovilidad prolongada (estasis).",
      "Mecanismo: tríada de Virchow (estasis, hipercoagulabilidad, daño endotelial); el trombo se forma en las válvulas de las venas de la pantorrilla y progresa en forma proximal.",
      "Consecuencia: edema y dolor; riesgo de embolia pulmonar y, a largo plazo, síndrome postrombótico.",
    ],
    epidemiology:
      "La enfermedad tromboembólica afecta a 1 o 2 personas cada 1000 por año y aumenta con la edad. En mujeres jóvenes los principales factores son los anticonceptivos con estrógenos, el embarazo y el puerperio, a veces sumados a trombofilias. Los viajes largos son un factor conocido.",
    management: [
      "Probabilidad clínica (Wells), dímero D y ecodoppler.",
      "Anticoagulación al menos 3 meses en las provocadas; más tiempo en las no provocadas o recurrentes.",
      "Suspender estrógenos.",
      "Considerar estudio de trombofilia según antecedentes, fuera de la fase aguda.",
    ],
    sources: ["Sociedad Argentina de Hematología — Guía de enfermedad tromboembólica venosa.", "Sociedad Argentina de Cardiología — Consenso de enfermedad tromboembólica."],
    pearls: ["Pierna hinchada unilateral = buscar TVP.", "Wells y dímero D.", "Anticonceptivos con estrógenos: suspender."],
    pitfalls: ["Indicar reposo absoluto.", "Pedir trombofilia en la fase aguda."],
    tribunal: [
      qa("¿Qué es la tríada de Virchow?", "Los tres factores que favorecen la trombosis: estasis venosa (inmovilidad, viajes, insuficiencia cardíaca), hipercoagulabilidad (estrógenos, embarazo, cáncer, trombofilias) y daño endotelial (cirugía, traumatismo, catéteres)."),
      qa("¿Qué es el score de Wells para TVP?", "Una escala de probabilidad clínica que suma cáncer activo, inmovilización o yeso, cirugía o reposo reciente, dolor en el trayecto venoso, pierna hinchada, asimetría de más de 3 cm, edema con fóvea, venas colaterales y TVP previa, y resta si hay un diagnóstico alternativo igual de probable."),
      qa("¿Qué es el síndrome postrombótico?", "La secuela crónica de una TVP por daño de las válvulas venosas: dolor, pesadez, edema, várices, cambios de la piel y úlceras en la pierna afectada."),
    ],
  },
};
