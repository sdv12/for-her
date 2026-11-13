import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const endometriosisAdolescente: ClinicalCase = {
  id: "endometriosis-adolescente",
  level: 2,
  area: "Ginecología y obstetricia",
  setting: "Consultorio",
  patient: { age: 17, ageUnit: "años", sex: "F", context: "Falta a la escuela 2 días por mes por dolor. La mamá tiene endometriosis." },
  frequency: "frecuente",
  intro: "“Me duele muchísimo cuando menstrúo, el ibuprofeno no me hace nada y vomito del dolor. Mi mamá dice que es normal.”",
  vitals: { TA: "110/70 mmHg", FC: "78 lpm", "T°": "36,5 °C" },
  anamnesis: [
    act("dolor", "¿Cómo es el dolor y cómo cambió?", "clave", "“Cada vez peor desde que empecé a menstruar.”", "Dismenorrea progresiva."),
    act("aines", "¿Qué tomaste y en qué dosis?", "clave", "“Ibuprofeno 400 cuando empieza el dolor fuerte.”", "Dosis y momento inadecuados, pero refractario."),
    act("familia", "¿Alguien en la familia con endometriosis?", "clave", "“Mi mamá.”", "Riesgo hereditario."),
    act("otros", "¿Dolor al hacer caca o fuera de la menstruación?", "util", "“Me duele al hacer caca cuando estoy menstruando.”", "Compromiso profundo."),
    act("relaciones", "¿Tuviste relaciones? ¿Duelen?", "util", "“No tuve.”", "Dispareunia."),
    act("deporte", "¿Hacés deporte?", "neutro", "“Vóley.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Abdomen", "clave", "Dolor leve en hipogastrio.", "Base."),
    act("genital", "Examen genital externo", "clave", "Normal, himen permeable.", "Excluye malformación obstructiva."),
    act("eco-ex", "Examen pelviano (con consentimiento, sin tacto si no corresponde)", "util", "Diferido; se prefiere ecografía.", "Respeto a la paciente."),
  ],
  studies: [
    study("Imágenes", "eco", "Ecografía pelviana transabdominal o transrectal", "clave", "Endometrioma ovárico izquierdo de 3 cm.", "Endometriosis."),
    study("Laboratorio", "bhcg", "Subunidad beta de hCG si corresponde", "util", "Negativa.", "Base."),
    study("Imágenes", "rm", "RM pelviana", "util", "Endometrioma y foco en ligamentos uterosacros.", "Mapa de lesiones."),
    study("Laboratorio", "ca125", "CA 125 para diagnosticar", "innecesario", "No se realizó.", "Poco específico."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("endometriosis", "Endometriosis con endometrioma ovárico en adolescente", true, "Dismenorrea progresiva refractaria a AINE, disquecia menstrual, antecedente materno y endometrioma."),
      dx("dismenorrea-primaria", "Dismenorrea primaria", false, "Es progresiva, refractaria y hay endometrioma."),
      dx("malformacion", "Malformación mülleriana obstructiva", false, "Himen permeable y útero normal."),
      dx("epi", "Enfermedad pélvica inflamatoria", false, "Sin relaciones ni fiebre."),
      dx("quiste-funcional", "Quiste funcional", false, "Aspecto de endometrioma en vidrio esmerilado."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("aines-bien", "AINE desde 1 o 2 días antes de la menstruación en dosis plenas", "clave", "Uso correcto."),
      mg("hormonal", "Anticonceptivo hormonal continuo o progestágeno (dienogest)", "clave", "Suprime la enfermedad."),
      mg("validar", "Validar el dolor y explicar que no es normal faltar a la escuela", "clave", "Retraso diagnóstico típico."),
      mg("laparoscopia", "Laparoscopia si no responde", "util", "Diagnóstico y tratamiento."),
      mg("normal", "Decirle que es normal y esperar a que tenga hijos", "riesgoso", "Mito que retrasa el diagnóstico años."),
      mg("cirugia-ovario", "Quitar el ovario", "riesgoso", "Daña la reserva ovárica."),
    ],
  },
  debrief: {
    diagnosis: "Endometriosis con endometrioma ovárico izquierdo en adolescente de 17 años.",
    pathologies: [
      { name: "Endometriosis", role: "principal", why: "Tejido endometrial fuera del útero." },
      { name: "Endometrioma ovárico", role: "asociada", why: "Forma ovárica." },
      { name: "Dismenorrea primaria, malformación", role: "diferencial", why: "Otras causas de dolor menstrual." },
    ],
    reasoning: [
      "Causa: menstruación retrógrada, factores genéticos e inmunes.",
      "Mecanismo: implantes que responden a hormonas y generan inflamación y adherencias.",
      "Consecuencia: dolor, endometriomas e infertilidad.",
    ],
    epidemiology:
      "La endometriosis empieza muchas veces en la adolescencia y se diagnostica con 7 a 10 años de retraso. Una dismenorrea que no responde a AINE bien usados o hace faltar a la escuela debe estudiarse. Tener madre o hermana con endometriosis aumenta el riesgo.",
    management: [
      "Escuchar.",
      "AINE bien usados.",
      "Hormonal.",
      "Cirugía conservadora si falla.",
    ],
    sources: ["Sociedad Argentina de Endometriosis — Consenso.", "ESHRE — Guideline on Endometriosis."],
    pearls: ["Faltar a la escuela por dolor no es normal.", "Refractaria a AINE: pensala.", "Cuidar el ovario."],
    pitfalls: ["Normalizar.", "Sacar el ovario."],
    tribunal: [
      qa("¿Qué es la disquecia?", "Dolor al defecar, que sugiere compromiso del tabique rectovaginal o uterosacros."),
      qa("¿Cómo se ve un endometrioma en la ecografía?", "Quiste de contenido homogéneo en vidrio esmerilado."),
      qa("¿Por qué se prefiere tratamiento médico en adolescentes?", "Para evitar cirugías repetidas que dañan la reserva ovárica."),
    ],
  },
};
