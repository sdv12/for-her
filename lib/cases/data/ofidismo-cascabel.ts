import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const ofidismoCascabel: ClinicalCase = {
  id: "ofidismo-crotalico",
  level: 3,
  area: "Toxicología",
  setting: "Guardia",
  patient: { age: 36, ageUnit: "años", sex: "M", context: "Hachero en Santiago del Estero. Diciembre. Lo mordió una víbora con 'cascabel en la cola' hace 3 horas." },
  frequency: "poco-frecuente",
  intro: "“Me picó en el tobillo una víbora de cascabel. Casi no me duele, pero veo borroso y se me caen los párpados.”",
  vitals: { TA: "118/72 mmHg", FC: "98 lpm", FR: "20 rpm", "T°": "36,6 °C", "SatO₂": "96 %" },
  anamnesis: [
    act("serpiente", "¿Cómo era la víbora?", "clave", "“Tenía cascabel en la cola.”", "Crotalus durissus."),
    act("sintomas", "¿Qué siente?", "clave", "“Veo doble, me pesan los párpados, me duelen los músculos.”", "Neurotoxicidad y miotoxicidad."),
    act("orina", "¿De qué color es la orina?", "clave", "“Oscura, como coca.”", "Mioglobinuria."),
    act("torniquete", "¿Le pusieron torniquete o cortaron la herida?", "util", "“Un torniquete con un cinto.”", "Práctica dañina."),
    act("hora", "¿Cuándo fue?", "util", "“Hace tres horas.”", "Tiempo."),
    act("familia", "¿Quién lo trajo?", "neutro", "“Mi compadre.”", "No orienta."),
  ],
  exam: [
    act("facies", "Cara y ojos", "clave", "Ptosis bilateral, oftalmoplejía (facies miasténica).", "Neurotoxicidad crotálica."),
    act("mordedura", "Sitio de la mordedura", "clave", "Dos marcas, sin edema ni necrosis.", "Poco efecto local, típico de cascabel."),
    act("musculos", "Músculos", "util", "Dolor muscular difuso.", "Rabdomiólisis."),
  ],
  studies: [
    study("Laboratorio", "cpk", "CPK, creatinina, potasio, orina", "clave", "CPK 18.000; creatinina 1,6; mioglobinuria.", "Rabdomiólisis con IRA."),
    study("Laboratorio", "coagulacion", "Tiempo de coagulación, fibrinógeno", "clave", "Prolongado; fibrinógeno bajo.", "Coagulopatía."),
    study("Otros", "respiratorio", "Control de capacidad respiratoria", "util", "Normal.", "Vigilar parálisis."),
    study("Otros", "succion", "Cortar y succionar la herida", "riesgoso", "No se hizo.", "Infección sin beneficio."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("crotalico", "Envenenamiento crotálico moderado a grave con neurotoxicidad, rabdomiólisis, IRA y coagulopatía", true, "Víbora de cascabel, ptosis y oftalmoplejía, mioglobinuria, CPK alta y poco efecto local."),
      dx("botropico", "Envenenamiento botrópico (yarará)", false, "Poco edema y neurotoxicidad."),
      dx("elapidico", "Envenenamiento por coral", false, "La serpiente tenía cascabel y hay rabdomiólisis."),
      dx("miastenia", "Miastenia", false, "Mordedura reciente."),
      dx("botulismo", "Botulismo", false, "Mordedura y rabdomiólisis."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("antiveneno", "Suero anticrotálico EV según gravedad", "clave", "Neutraliza el veneno."),
      mg("hidratacion", "Hidratación abundante para la rabdomiólisis", "clave", "Previene IRA."),
      mg("retirar-torniquete", "Retirar el torniquete con monitoreo", "clave", "Daño tisular."),
      mg("notificar", "Notificar y consultar al Centro de Toxicología", "util", "Vigilancia."),
      mg("suero-botropico", "Suero antibotrópico solo", "riesgoso", "No neutraliza crotálico."),
      mg("hielo", "Hielo y succión", "riesgoso", "Sin beneficio y con daño."),
    ],
  },
  debrief: {
    diagnosis: "Envenenamiento crotálico con neurotoxicidad, rabdomiólisis, insuficiencia renal y coagulopatía, en varón de 36 años de Santiago del Estero.",
    pathologies: [
      { name: "Envenenamiento crotálico", role: "principal", why: "Mordedura de cascabel." },
      { name: "Rabdomiólisis e IRA", role: "asociada", why: "Miotoxicidad." },
      { name: "Botrópico, elapídico", role: "diferencial", why: "Otros ofidismos." },
    ],
    reasoning: [
      "Causa: veneno de Crotalus durissus terrificus.",
      "Mecanismo: crotoxina neurotóxica y miotóxica con efecto coagulante.",
      "Consecuencia: facies miasténica, mioglobinuria, IRA y parálisis.",
    ],
    epidemiology:
      "En Argentina la mayoría de los ofidismos son por yarará, pero la cascabel produce los más graves. Habita zonas secas del centro y norte. El poco efecto local engaña.",
    management: [
      "Identificar la serpiente.",
      "Suero específico.",
      "Hidratación.",
      "Notificar.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de prevención, diagnóstico y tratamiento del envenenamiento por ofidios.", "OMS — Guidelines for the Management of Snakebites."],
    pearls: ["Cascabel: poco local, mucho sistémico.", "Facies miasténica.", "Orina oscura."],
    pitfalls: ["Suero equivocado.", "Torniquete y succión."],
    tribunal: [
      qa("¿Qué géneros de serpientes venenosas hay en Argentina?", "Bothrops (yarará), Crotalus (cascabel) y Micrurus (coral)."),
      qa("¿Qué hace el veneno botrópico?", "Edema, necrosis local y coagulopatía."),
      qa("¿Qué no hay que hacer ante una mordedura?", "Torniquete, cortes, succión, hielo o remedios caseros."),
    ],
  },
};
