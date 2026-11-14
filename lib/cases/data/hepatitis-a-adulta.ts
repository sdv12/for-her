import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hepatitisAAdulta: ClinicalCase = {
  id: "hepatitis-a-adulta-colestasica",
  level: 2,
  area: "Infectología",
  setting: "Consultorio",
  patient: { age: 32, ageUnit: "años", sex: "F", context: "Maestra jardinera. Nació en 1993, antes de la vacuna en el calendario. Hay casos de hepatitis A en el jardín." },
  frequency: "frecuente",
  intro: "“Hace diez días tuve fiebre y náuseas. Ahora estoy amarilla, me pica todo y la orina está oscura.”",
  vitals: { TA: "112/70 mmHg", FC: "76 lpm", "T°": "37,2 °C" },
  anamnesis: [
    act("contacto", "¿Contacto con alguien con hepatitis?", "clave", "“Dos nenes del jardín.”", "Brote."),
    act("vacuna", "¿Estás vacunada contra hepatitis A?", "clave", "“No.”", "Susceptible."),
    act("prurito", "¿Desde cuándo la picazón?", "clave", "“Desde que me puse amarilla.”", "Forma colestásica."),
    act("farmacos", "¿Paracetamol, hierbas o alcohol?", "util", "“Poco paracetamol.”", "Otras causas."),
    act("embarazo", "¿Podés estar embarazada?", "util", "“No.”", "Base."),
    act("sala", "¿Qué sala tenés?", "neutro", "“Sala de 4.”", "No orienta."),
  ],
  exam: [
    act("ictericia", "Piel", "clave", "Ictericia intensa con lesiones de rascado.", "Colestasis."),
    act("higado", "Hígado", "clave", "Hepatomegalia dolorosa leve.", "Hepatitis."),
    act("neuro", "Conciencia y asterixis", "util", "Normal.", "Sin fallo hepático."),
  ],
  studies: [
    study("Laboratorio", "serologia", "IgM anti-VHA, HBsAg, anti-VHC", "clave", "IgM anti-VHA positiva.", "Confirma."),
    study("Laboratorio", "hepatograma", "Hepatograma y RIN", "clave", "BT 12; ALT 900 en descenso; FAL alta; RIN 1,1.", "Forma colestásica sin fallo."),
    study("Imágenes", "eco", "Ecografía abdominal", "util", "Vía biliar normal.", "Excluye obstrucción."),
    study("Otros", "cpre", "CPRE por la colestasis", "riesgoso", "No se realizó.", "Vía biliar normal; no corresponde."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("vha-colestasica", "Hepatitis A aguda forma colestásica en adulta no vacunada", true, "Brote en el jardín, IgM anti-VHA, ictericia prolongada con prurito y FAL alta, vía biliar normal."),
      dx("obstruccion", "Obstrucción biliar", false, "Ecografía normal."),
      dx("hepatitis-b", "Hepatitis B aguda", false, "HBsAg negativo."),
      dx("toxica", "Hepatitis por paracetamol", false, "Dosis baja e IgM positiva."),
      dx("fallo", "Insuficiencia hepática aguda", false, "RIN y conciencia normales."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("sintomatico", "Hidratación, reposo relativo y control clínico", "clave", "Autolimitada."),
      mg("prurito", "Colestiramina o antihistamínicos para el prurito", "clave", "Síntomas."),
      mg("contactos", "Vacunar a contactos susceptibles en las primeras 2 semanas", "clave", "Profilaxis."),
      mg("laboral", "No trabajar hasta una semana después de la ictericia", "util", "Contagio."),
      mg("corticoides", "Corticoides", "riesgoso", "Sin indicación."),
      mg("alcohol", "Alcohol y paracetamol libre", "riesgoso", "Daño hepático."),
    ],
  },
  debrief: {
    diagnosis: "Hepatitis A aguda forma colestásica, en maestra jardinera de 32 años no vacunada.",
    pathologies: [
      { name: "Hepatitis A aguda colestásica", role: "principal", why: "Forma atípica prolongada." },
      { name: "Brote en institución", role: "asociada", why: "Transmisión fecal-oral." },
      { name: "Obstrucción biliar, hepatitis B", role: "diferencial", why: "Otras ictericias." },
    ],
    reasoning: [
      "Causa: virus de la hepatitis A por vía fecal-oral.",
      "Mecanismo: daño hepatocelular inmune con colestasis intrahepática.",
      "Consecuencia: ictericia y prurito por semanas, con recuperación completa.",
    ],
    epidemiology:
      "La vacuna se incorporó al calendario en 2005 y redujo mucho los casos en niños, pero los adultos nacidos antes pueden no estar inmunes. En adultos la hepatitis A es más sintomática y a veces colestásica. Los brotes en jardines son una vía de contagio.",
    management: [
      "IgM anti-VHA.",
      "Ecografía si hay colestasis.",
      "Sintomático.",
      "Contactos.",
    ],
    sources: ["Ministerio de Salud de la Nación — Hepatitis A.", "CDC — Hepatitis A Questions and Answers for Health Professionals."],
    pearls: ["Adultos no vacunados.", "Puede ser colestásica.", "Vacunar contactos."],
    pitfalls: ["CPRE innecesaria.", "Corticoides."],
    tribunal: [
      qa("¿Qué formas atípicas tiene la hepatitis A?", "Colestásica, recurrente y fulminante."),
      qa("¿Se cronifica?", "No, la hepatitis A nunca se vuelve crónica."),
      qa("¿Quiénes deben vacunarse en adultos?", "Personal de jardines, hepatópatas, viajeros, HSH y manipuladores de alimentos."),
    ],
  },
};
