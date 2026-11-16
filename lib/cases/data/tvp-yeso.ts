import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const tvpYeso: ClinicalCase = {
  id: "tvp-yeso",
  level: 2,
  area: "Cardiovascular",
  setting: "Guardia",
  patient: { age: 29, ageUnit: "años", sex: "M", context: "Fractura de tobillo jugando al fútbol hace 3 semanas, con bota de yeso y muletas. Sin profilaxis." },
  frequency: "frecuente",
  intro: "“Se me hinchó toda la pierna por arriba del yeso y me duele la pantorrilla.”",
  vitals: { TA: "124/78 mmHg", FC: "92 lpm", FR: "18 rpm", "SatO₂": "97 %", "T°": "37,2 °C" },
  anamnesis: [
    act("inmovilizacion", "¿Apoya el pie? ¿Cuánto se mueve?", "clave", "“Nada de apoyo, casi todo el día en el sillón.”", "Inmovilización: factor de riesgo mayor."),
    act("profilaxis", "¿Le indicaron inyecciones para la trombosis?", "clave", "“No.”", "Profilaxis omitida."),
    act("disnea", "¿Falta de aire, dolor de pecho, tos con sangre?", "clave", "“No.”", "TEP."),
    act("familia", "¿Familiares con trombosis?", "util", "“Mi mamá tuvo una en el embarazo.”", "Posible trombofilia."),
    act("yeso", "¿Siente los dedos? ¿Le aprieta el yeso?", "clave", "“Los siento bien.”", "Síndrome compartimental."),
    act("equipo", "¿Con quién jugaban?", "neutro", "“Con los de la oficina.”", "No orienta."),
  ],
  exam: [
    act("pierna", "Pierna por encima del yeso", "clave", "Edema de pantorrilla visible, dolor a la palpación del hueco poplíteo, red venosa.", "TVP."),
    act("dedos", "Dedos del pie", "clave", "Rosados, móviles, con buen relleno.", "Descarta compromiso vascular por el yeso."),
    act("pulmon", "Respiratorio", "util", "Normal.", "Sin TEP clínico."),
  ],
  studies: [
    study("Imágenes", "doppler", "Eco Doppler venoso", "clave", "TVP de vena poplítea y gemelares izquierdas.", "Confirma TVP proximal."),
    study("Laboratorio", "dimero", "Dímero D", "innecesario", "No se pidió.", "Con probabilidad alta se va directo al Doppler."),
    study("Laboratorio", "lab", "Hemograma, creatinina, coagulación", "util", "Normales.", "Antes de anticoagular."),
    study("Laboratorio", "trombofilia-ya", "Panel de trombofilia en la fase aguda", "innecesario", "No se pidió.", "Provocada; se altera con el trombo y la anticoagulación."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("tvp-provocada", "TVP poplítea izquierda provocada por inmovilización con yeso", true, "Inmovilización sin profilaxis, edema y dolor, Doppler con trombo poplíteo."),
      dx("compartimental", "Síndrome compartimental", false, "Dedos bien perfundidos y dolor no desproporcionado."),
      dx("celulitis", "Celulitis", false, "Sin puerta de entrada y Doppler positivo."),
      dx("baker", "Quiste de Baker roto", false, "Doppler con trombo."),
      dx("edema-yeso", "Edema por declive", false, "Doppler con trombosis."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("doac", "Rivaroxabán o apixabán", "clave", "Tratamiento de elección en TVP."),
      mg("duracion", "Anticoagular 3 meses", "clave", "TVP provocada por un factor transitorio."),
      mg("movilizar", "Movilizar lo que permita el traumatólogo", "util", "Reduce el riesgo."),
      mg("familia", "Estudio de trombofilia diferido por antecedente familiar", "util", "Puede influir en futuras decisiones."),
      mg("reposo", "Reposo absoluto por la trombosis", "riesgoso", "No previene el TEP y aumenta la estasis."),
      mg("aspirina", "Aspirina sola", "riesgoso", "No trata una TVP."),
    ],
  },
  debrief: {
    diagnosis: "TVP poplítea izquierda provocada por inmovilización con bota de yeso sin profilaxis, en un hombre de 29 años.",
    pathologies: [
      { name: "Trombosis venosa profunda", role: "principal", why: "Estasis por inmovilización." },
      { name: "Fractura de tobillo con yeso", role: "asociada", why: "Factor transitorio." },
      { name: "Síndrome compartimental", role: "diferencial", why: "Urgencia en pacientes con yeso." },
    ],
    reasoning: [
      "Causa: inmovilización del miembro y falta de contracción muscular.",
      "Mecanismo: estasis venosa (tríada de Virchow) con trauma tisular.",
      "Consecuencia: TVP proximal con riesgo de TEP.",
    ],
    epidemiology:
      "Hasta el 10 % de las personas con inmovilización de miembro inferior por fractura hace una TVP sin profilaxis. Por eso se recomienda evaluar el riesgo e indicar HBPM en muchos casos. Es una causa frecuente de TVP en jóvenes deportistas.",
    management: [
      "Doppler.",
      "Anticoagulantes orales directos.",
      "3 meses si es provocada.",
      "Prevención con HBPM en futuras inmovilizaciones.",
    ],
    sources: ["Sociedad Argentina de Hematología — Guía de enfermedad tromboembólica venosa.", "ACCP — Antithrombotic therapy for VTE disease."],
    pearls: ["Yeso + pierna hinchada = Doppler.", "Provocada: 3 meses.", "Evaluar profilaxis en toda inmovilización."],
    pitfalls: ["Reposo absoluto.", "Aspirina."],
    tribunal: [
      qa("¿Qué es la tríada de Virchow?", "Estasis venosa, lesión endotelial e hipercoagulabilidad: los tres mecanismos de la trombosis."),
      qa("¿Cuánto se anticoagula una TVP provocada por un factor transitorio?", "Tres meses, porque el riesgo de recurrencia es bajo al desaparecer la causa."),
      qa("¿Qué es el score de Wells?", "Una escala clínica de probabilidad de TVP o TEP que define si pedir dímero D o ir directo a la imagen."),
    ],
  },
};
