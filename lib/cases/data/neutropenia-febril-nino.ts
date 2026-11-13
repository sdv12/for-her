import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const neutropeniaFebrilNino: ClinicalCase = {
  id: "neutropenia-febril-nino-leucemia",
  level: 4,
  area: "Hematología",
  setting: "Guardia",
  patient: { age: 6, ageUnit: "años", sex: "M", context: "Leucemia linfoblástica aguda en inducción. Última quimioterapia hace 8 días. Tiene un catéter implantable." },
  frequency: "frecuente",
  intro: "“Tiene 38,8 desde hace una hora, está decaído y con escalofríos.”",
  vitals: { TA: "86/50 mmHg", FC: "148 lpm", FR: "30 rpm", "T°": "38,8 °C", "SatO₂": "95 %", Peso: "20 kg" },
  anamnesis: [
    act("fiebre", "¿Cuándo empezó la fiebre?", "clave", "“Hace una hora.”", "Tiempo puerta-antibiótico."),
    act("quimio", "¿Cuándo fue la última quimio?", "clave", "“Hace 8 días.”", "Nadir."),
    act("cateter", "¿Fiebre o escalofríos al usar el catéter?", "clave", "“Empezó al lavarlo.”", "Infección del catéter."),
    act("foco", "¿Tos, diarrea, dolor de panza o de cola?", "util", "“Nada.”", "Foco."),
    act("antitermico", "¿Le dieron algo?", "util", "“Paracetamol.”", "Evitar AINE y vía rectal."),
    act("hermana", "¿Tiene hermanos?", "neutro", "“Una hermana de 9.”", "No orienta."),
  ],
  exam: [
    act("perfusion", "Perfusión", "clave", "Relleno de 4 segundos, extremidades frías.", "Shock séptico."),
    act("cateter-ex", "Sitio del catéter", "clave", "Sin eritema.", "Puede estar infectado igual."),
    act("mucosas", "Boca y región perianal (sin tacto rectal)", "util", "Mucositis leve.", "Puerta de entrada."),
  ],
  studies: [
    study("Microbiología", "hemocultivos", "Hemocultivos del catéter y periféricos", "clave", "Pseudomonas aeruginosa.", "Germen."),
    study("Laboratorio", "hemograma", "Hemograma, función renal, lactato", "clave", "Neutrófilos 80; lactato 4,2.", "Neutropenia grave y shock."),
    study("Imágenes", "rx", "Radiografía de tórax", "util", "Normal.", "Excluye neumonía."),
    study("Otros", "tacto", "Tacto rectal", "riesgoso", "No se realizó.", "Riesgo de bacteriemia."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("nf-shock", "Neutropenia febril de alto riesgo con shock séptico, probablemente asociada a catéter", true, "Neutrófilos menores de 500, fiebre, hipotensión, lactato alto y fiebre al lavar el catéter."),
      dx("fiebre-transfusion", "Reacción transfusional", false, "No recibió transfusión."),
      dx("fiebre-tumoral", "Fiebre por la leucemia", false, "Shock e infección son la prioridad."),
      dx("viral", "Infección viral leve", false, "Shock."),
      dx("nf-bajo-riesgo", "Neutropenia febril de bajo riesgo", false, "Hay inestabilidad."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("atb", "Antibiótico antipseudomonas (cefepime o piperacilina-tazobactam) en menos de 60 minutos, más vancomicina por el catéter y el shock", "clave", "Cada hora cuenta."),
      mg("fluidos", "Bolos de cristaloides y vasopresores si no responde", "clave", "Shock."),
      mg("uti", "Terapia intensiva pediátrica", "clave", "Gravedad."),
      mg("cateter", "Evaluar el retiro del catéter según evolución", "util", "Pseudomonas en catéter."),
      mg("esperar", "Esperar el hemograma para dar antibiótico", "riesgoso", "Retraso aumenta la mortalidad."),
      mg("ibuprofeno", "Ibuprofeno para la fiebre", "riesgoso", "Plaquetopenia y riesgo renal."),
    ],
  },
  debrief: {
    diagnosis: "Neutropenia febril de alto riesgo con shock séptico por Pseudomonas, probablemente asociada a catéter, en niño de 6 años con LLA en inducción.",
    pathologies: [
      { name: "Neutropenia febril con shock séptico", role: "principal", why: "Emergencia oncohematológica." },
      { name: "LLA en inducción y catéter", role: "asociada", why: "Factores de riesgo." },
      { name: "Fiebre tumoral, viral", role: "diferencial", why: "Otras causas de fiebre." },
    ],
    reasoning: [
      "Causa: quimioterapia que deja sin neutrófilos y catéter como puerta de entrada.",
      "Mecanismo: bacteriemia sin respuesta inflamatoria local eficaz.",
      "Consecuencia: shock séptico rápido.",
    ],
    epidemiology:
      "La neutropenia febril es la complicación infecciosa más frecuente en niños con cáncer. La meta es dar el antibiótico en menos de una hora desde la llegada. Los signos locales pueden faltar por la falta de neutrófilos.",
    management: [
      "Triage inmediato.",
      "Cultivos.",
      "Antibiótico en menos de 60 minutos.",
      "Soporte del shock.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Neutropenia febril en pacientes oncológicos.", "International Pediatric Fever and Neutropenia Guideline Panel."],
    pearls: ["Fiebre en quimio: antibiótico ya.", "Sin tacto rectal.", "Fiebre al lavar el catéter."],
    pitfalls: ["Esperar el laboratorio.", "AINE."],
    tribunal: [
      qa("¿Cómo se define neutropenia febril?", "Fiebre de 38,3 o 38 sostenida con neutrófilos menores de 500 o que caerán por debajo."),
      qa("¿Cuándo se agrega vancomicina?", "Ante inestabilidad, sospecha de catéter, piel o mucositis grave."),
      qa("¿Qué es el nadir?", "El punto más bajo de neutrófilos, en general 7 a 10 días después de la quimioterapia."),
    ],
  },
};
