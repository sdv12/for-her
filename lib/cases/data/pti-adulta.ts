import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const ptiAdulta: ClinicalCase = {
  id: "pti-adulta",
  level: 2,
  area: "Hematología",
  setting: "Consultorio",
  patient: { age: 34, ageUnit: "años", sex: "F", context: "Sana. Hace un mes tuvo una gastroenteritis." },
  frequency: "poco-frecuente",
  intro: "“Me salieron puntitos rojos en las piernas y moretones sin golpearme. Ayer me sangraron las encías.”",
  vitals: { TA: "118/72 mmHg", FC: "78 lpm", "T°": "36,5 °C" },
  anamnesis: [
    act("sangrado", "¿Sangrado de nariz, orina, materia fecal o menstruaciones abundantes?", "clave", "“La última menstruación fue más abundante.”", "Sangrado mucoso."),
    act("farmacos", "¿Tomaste remedios nuevos, quinina, heparina?", "clave", "“No.”", "Trombocitopenia por fármacos."),
    act("sistemicos", "¿Fiebre, pérdida de peso, dolor articular?", "clave", "“No.”", "Causas secundarias."),
    act("embarazo", "¿Podés estar embarazada?", "util", "“No, uso DIU.”", "Trombocitopenia gestacional."),
    act("alcohol", "¿Tomás alcohol?", "util", "“Poco.”", "Hepatopatía."),
    act("trabajo", "¿Trabajás?", "neutro", "“Soy arquitecta.”", "No orienta."),
  ],
  exam: [
    act("piel", "Piel y mucosas", "clave", "Petequias en piernas, equimosis, ampollas hemorrágicas en la boca.", "Sangrado mucocutáneo."),
    act("bazo", "Bazo, hígado y ganglios", "clave", "No palpables.", "Excluye otras causas."),
    act("fondo", "Fondo de ojo y neurológico", "util", "Normales.", "Sin sangrado grave."),
  ],
  studies: [
    study("Laboratorio", "hemograma", "Hemograma y frotis periférico", "clave", "Plaquetas 9.000; serie roja y blanca normales; frotis sin esquistocitos, plaquetas grandes.", "Trombocitopenia aislada."),
    study("Laboratorio", "secundarias", "VIH, VHC, Helicobacter, TSH, FAN, coagulograma", "clave", "Negativos y normales.", "Causas secundarias."),
    study("Otros", "medula", "Punción de médula ósea", "innecesario", "No se realizó.", "Cuadro típico sin otras alteraciones."),
    study("Otros", "transfundir", "Transfundir plaquetas sin sangrado grave", "riesgoso", "No se realizó.", "Se destruyen rápido y no sirven."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("pti", "Púrpura trombocitopénica inmune primaria del adulto con sangrado mucoso", true, "Trombocitopenia aislada grave, frotis sin esquistocitos, sin esplenomegalia y estudios secundarios negativos."),
      dx("ptt", "Púrpura trombótica trombocitopénica", false, "Sin anemia hemolítica ni esquistocitos."),
      dx("leucemia", "Leucemia aguda", false, "Las otras series son normales."),
      dx("pseudo", "Pseudotrombocitopenia por EDTA", false, "Hay sangrado y frotis sin agregados."),
      dx("lupus", "Trombocitopenia por lupus", false, "FAN negativos."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("corticoides", "Corticoides (dexametasona o prednisona)", "clave", "Primera línea con plaquetas menores de 30.000 y sangrado."),
      mg("ivig", "Inmunoglobulina EV si sangra más o necesita subir rápido", "clave", "Respuesta rápida."),
      mg("pautas", "Evitar AINE, deportes de contacto y pautas de alarma", "clave", "Prevención de sangrado."),
      mg("segunda-linea", "Agonistas de trombopoyetina o rituximab si recae", "util", "Segunda línea."),
      mg("aspirina", "Aspirina para los dolores", "riesgoso", "Antiagregante."),
      mg("esplenectomia-ya", "Esplenectomía de entrada", "riesgoso", "Se reserva para refractarios."),
    ],
  },
  debrief: {
    diagnosis: "Púrpura trombocitopénica inmune primaria del adulto con sangrado mucoso, en mujer de 34 años.",
    pathologies: [
      { name: "PTI del adulto", role: "principal", why: "Destrucción inmune de plaquetas." },
      { name: "Sangrado mucoso", role: "asociada", why: "Plaquetas menores de 10.000." },
      { name: "PTT, leucemia", role: "diferencial", why: "Otras trombocitopenias graves." },
    ],
    reasoning: [
      "Causa: autoanticuerpos contra glucoproteínas plaquetarias.",
      "Mecanismo: destrucción en el bazo y menor producción en la médula.",
      "Consecuencia: petequias, sangrado mucoso y raramente hemorragia intracraneal.",
    ],
    epidemiology:
      "A diferencia de la PTI infantil, en adultos suele volverse crónica. Predomina en mujeres jóvenes. Es un diagnóstico de exclusión que requiere frotis y descartar VIH, VHC y otras causas.",
    management: [
      "Frotis.",
      "Causas secundarias.",
      "Corticoides.",
      "Escalones según respuesta.",
    ],
    sources: ["Sociedad Argentina de Hematología — Guía de PTI.", "ASH — Guidelines for Immune Thrombocytopenia."],
    pearls: ["Mirá el frotis.", "En el adulto se cronifica.", "Sin AINE."],
    pitfalls: ["Transfundir plaquetas.", "No buscar VIH y VHC."],
    tribunal: [
      qa("¿Cuándo se transfunden plaquetas en PTI?", "Solo ante sangrado grave o que pone en riesgo la vida, junto con otros tratamientos."),
      qa("¿Qué diferencia hay con la PTI infantil?", "La infantil suele ser aguda y autolimitada; la del adulto tiende a cronificarse."),
      qa("¿Qué vacunas se dan antes de una esplenectomía?", "Neumococo, meningococo y Haemophilus influenzae tipo b."),
    ],
  },
};
