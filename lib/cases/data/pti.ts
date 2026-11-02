import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const pti: ClinicalCase = {
  id: "purpura-trombocitopenica-inmune-nino",
  level: 2,
  area: "Hematología",
  setting: "Guardia",
  patient: { age: 3, ageUnit: "años", sex: "M", context: "Sano. Tuvo un cuadro de mocos y fiebre hace dos semanas." },
  frequency: "frecuente",
  intro: "“Desde ayer le aparecieron puntitos rojos en las piernas y el cuerpo, y moretones grandes sin golpearse. Está bien, juega como siempre.” (relata la madre)",
  vitals: { FC: "108 lpm", FR: "24 rpm", "T°": "36,7 °C", "SatO₂": "99 %", Peso: "15 kg" },
  anamnesis: [
    act("viral", "¿Estuvo enfermo en las últimas semanas o recibió vacunas?", "clave", "“Un resfrío con fiebre hace dos semanas.”", "La PTI aguda infantil suele seguir a una infección viral o vacuna."),
    act("sangrado", "¿Sangró por la nariz, las encías, la orina o la caca?", "clave", "“La nariz un poquito ayer, se cortó solo.”", "Sangrado mucoso leve; los sangrados graves cambian la conducta."),
    act("general", "¿Tiene fiebre, dolor de huesos, cansancio, palidez o pérdida de peso?", "clave", "“No, está igual que siempre.”", "Niño sano con plaquetopenia aislada: orienta a PTI; si hubiera síntomas generales, pensar en leucemia."),
    act("cabeza", "¿Se golpeó la cabeza? ¿Vomitó o le duele?", "clave", "“No.”", "La hemorragia intracraneal es la complicación más grave."),
    act("farmacos", "¿Tomó aspirina, ibuprofeno u otros remedios?", "util", "“No.”", "Afectan la función plaquetaria."),
    act("hermanos", "¿Tiene hermanos?", "neutro", "“Una hermana.”", "No orienta."),
  ],
  exam: [
    act("piel", "Piel y mucosas", "clave", "Petequias generalizadas y equimosis en piernas y tronco; petequias en el paladar, sin sangrado activo.", "Púrpura seca y húmeda leve."),
    act("organomegalias", "Hígado, bazo y ganglios", "clave", "Sin hepatoesplenomegalia ni adenopatías.", "Su ausencia aleja la leucemia."),
    act("articulaciones", "Articulaciones", "util", "Normales.", "Descarta púrpura de Schönlein-Henoch."),
  ],
  studies: [
    study("Laboratorio", "hemograma", "Hemograma con frotis de sangre periférica revisado por hematología", "clave", "Plaquetas 8.000, Hb 12,4, leucocitos 7.800 con fórmula normal; frotis con plaquetas grandes, sin blastos.", "Plaquetopenia aislada con frotis normal: PTI."),
    study("Laboratorio", "coagulograma", "Coagulograma", "util", "Normal.", "Descarta coagulopatía."),
    study("Otros", "medula", "Punción de médula ósea en todos los casos", "innecesario", "No se realizó.", "No es necesaria si el cuadro es típico; se considera si hay atipías o antes de corticoides en algunos protocolos."),
    study("Laboratorio", "puncion-im", "Inyecciones intramusculares para estudios o tratamiento", "riesgoso", "No se realizó.", "Hematomas con plaquetas muy bajas."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("pti", "Púrpura trombocitopénica inmune aguda, de reciente diagnóstico, con sangrado leve", true, "Niño sano con petequias y equimosis tras una infección viral, plaquetas de 8.000 con el resto del hemograma y el frotis normales, sin organomegalias."),
      dx("leucemia", "Leucemia aguda", false, "No hay anemia, alteraciones de los leucocitos, blastos ni organomegalias."),
      dx("schonlein", "Púrpura de Schönlein-Henoch", false, "Tiene plaquetas normales, púrpura palpable en piernas y glúteos, artritis y dolor abdominal."),
      dx("maltrato", "Lesiones por maltrato", false, "Las plaquetas muy bajas explican las lesiones; igual se debe evaluar el contexto."),
      dx("suh", "Síndrome urémico hemolítico", false, "Habría anemia hemolítica e insuficiencia renal tras diarrea."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("observacion", "Conducta expectante con seguimiento cercano si el sangrado es leve (sin importar el recuento)", "clave", "La mayoría se resuelve sola en semanas; el tratamiento se basa en el sangrado, no solo en el número."),
      mg("pautas", "Pautas: evitar deportes de contacto, aspirina, AINE e inyecciones intramusculares; consultar por sangrados o golpes en la cabeza", "clave", "Previene complicaciones."),
      mg("tratamiento", "Corticoides o gammaglobulina EV si hay sangrado mucoso significativo o factores de riesgo", "util", "Suben las plaquetas más rápido; no cambian la evolución a largo plazo."),
      mg("hematologia", "Seguimiento con hematología pediátrica", "clave", "Confirma la evolución y detecta formas persistentes o crónicas."),
      mg("transfusion", "Transfusión de plaquetas", "innecesario", "Se destruyen rápido; solo ante sangrado con riesgo de vida."),
      mg("esplenectomia", "Esplenectomía", "riesgoso", "No se indica en la PTI aguda infantil."),
    ],
  },
  debrief: {
    diagnosis: "Púrpura trombocitopénica inmune de reciente diagnóstico (8.000 plaquetas) con sangrado cutáneo y mucoso leve, posviral, en niño de 3 años.",
    pathologies: [
      { name: "Púrpura trombocitopénica inmune", role: "principal", why: "Plaquetopenia aislada por destrucción inmune." },
      { name: "Leucemia aguda", role: "diferencial", why: "Se descarta con el hemograma, el frotis y el examen." },
      { name: "Schönlein-Henoch, maltrato, SUH", role: "diferencial", why: "Otras causas de púrpura en niños." },
    ],
    reasoning: [
      "Causa: respuesta inmune tras una infección viral que genera anticuerpos contra glicoproteínas de las plaquetas.",
      "Mecanismo: las plaquetas recubiertas de anticuerpos se destruyen en el bazo y se inhibe su producción.",
      "Consecuencia: petequias, equimosis y sangrados mucosos; rara vez hemorragia intracraneal. En niños, la mayoría se cura sola.",
    ],
    epidemiology:
      "La PTI es la causa más frecuente de plaquetopenia aislada en la infancia, con pico entre los 2 y 5 años. Alrededor del 75–80 % de los niños se recupera en 6 a 12 meses, a diferencia de los adultos, en quienes suele ser crónica.",
    management: [
      "Hemograma con frotis: plaquetopenia aislada.",
      "Tratar según el sangrado, no según el recuento.",
      "Observación con pautas o corticoides o gammaglobulina según el caso.",
      "Seguimiento hasta la normalización; buscar otras causas si persiste.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Consenso de púrpura trombocitopénica inmune.", "Sociedad Argentina de Hematología — Guías de PTI."],
    pearls: ["Niño sano + petequias + plaquetopenia aislada = PTI.", "Se trata el sangrado, no el número.", "Frotis siempre."],
    pitfalls: ["Transfundir plaquetas sin sangrado grave.", "No revisar el frotis."],
    tribunal: [
      qa("¿Cómo se clasifica la PTI según el tiempo?", "De reciente diagnóstico (menos de 3 meses), persistente (3 a 12 meses) y crónica (más de 12 meses)."),
      qa("¿Qué diferencia la púrpura de Schönlein-Henoch de la PTI?", "Schönlein-Henoch es una vasculitis por IgA con plaquetas normales: púrpura palpable en miembros inferiores y glúteos, artritis, dolor abdominal y compromiso renal; la PTI tiene plaquetas bajas con púrpura no palpable."),
      qa("¿Qué causas de plaquetopenia hay que conocer?", "Por menor producción (leucemia, aplasia, infiltración medular, déficits nutricionales), por destrucción inmune (PTI, lupus, fármacos, VIH) o no inmune (SUH, PTT, CID), por secuestro (hiperesplenismo) y seudotrombocitopenia por EDTA."),
    ],
  },
};
