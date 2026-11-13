import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const pilaBoton: ClinicalCase = {
  id: "ingesta-pila-boton",
  level: 3,
  area: "Pediatría",
  setting: "Guardia",
  patient: { age: 3, ageUnit: "años", sex: "M", context: "Lo trae el papá. Jugaba con el control remoto del aire acondicionado." },
  frequency: "poco-frecuente",
  intro: "“Le faltaba la pila al control y él dice que se la comió. Hace una hora. Está babeando un poco.”",
  vitals: { FC: "112 lpm", FR: "24 rpm", "T°": "36,6 °C", "SatO₂": "98 %", Peso: "15 kg" },
  anamnesis: [
    act("hora", "¿Hace cuánto la tragó?", "clave", "“Una hora.”", "La quemadura empieza en dos horas."),
    act("tipo", "¿Qué pila era?", "clave", "“Redonda, chata, grande como una moneda.”", "Pila de litio de 20 mm."),
    act("sintomas", "¿Babea, le duele, vomita, tose?", "clave", "“Babea y no quiere tomar.”", "Sugiere localización esofágica."),
    act("otras", "¿Pudo tragar algo más, como imanes?", "util", "“No creo.”", "Imanes múltiples."),
    act("vomito", "¿Le hicieron vomitar?", "util", "“No.”", "No debe hacerse."),
    act("hermanos", "¿Tiene hermanos?", "neutro", "“Una hermana bebé.”", "No orienta."),
  ],
  exam: [
    act("respiratorio", "Respiración y estridor", "clave", "Sin estridor ni tiraje.", "Vía aérea libre."),
    act("cuello", "Cuello", "clave", "Sin crepitación.", "Sin perforación."),
    act("abdomen", "Abdomen", "util", "Normal.", "Base."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de cuello, tórax y abdomen frente y perfil", "clave", "Cuerpo extraño redondo en esófago superior con doble halo en el frente y escalón en el perfil.", "Pila de botón."),
    study("Otros", "miel", "Miel cada 10 minutos mientras se prepara la endoscopia (mayor de 1 año, menos de 12 horas)", "clave", "Indicada.", "Reduce la lesión cáustica."),
    study("Laboratorio", "lab", "Hemograma y coagulograma prequirúrgico", "util", "Normales.", "Antes de la endoscopia."),
    study("Otros", "esperar-rx", "Esperar 24 horas con radiografías seriadas", "riesgoso", "No se realizó.", "Necrosis y perforación esofágica."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("pila-esofago", "Ingesta de pila de botón impactada en el esófago", true, "Ingesta referida, babeo, imagen de doble halo en esófago."),
      dx("moneda", "Moneda en el esófago", false, "Las monedas no tienen doble halo."),
      dx("pila-estomago", "Pila en el estómago", false, "Está en el esófago superior."),
      dx("faringitis", "Faringitis", false, "Hay cuerpo extraño visible."),
      dx("crup", "Crup", false, "Sin estridor ni tos perruna."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("endoscopia", "Endoscopia de urgencia para extraerla en menos de 2 horas", "clave", "La pila quema la mucosa en horas."),
      mg("ayuno", "Ayuno salvo la miel o el sucralfato indicados", "clave", "Preparar la anestesia."),
      mg("seguimiento", "Seguimiento por estenosis y fístula tras la extracción", "clave", "Complicaciones tardías."),
      mg("prevencion", "Educación: tapas con tornillo y guardar pilas", "util", "Prevención."),
      mg("vomito-inducido", "Inducir el vómito", "riesgoso", "Puede broncoaspirar o impactarla."),
      mg("alta", "Alta y esperar que la elimine", "riesgoso", "En esófago es una emergencia."),
    ],
  },
  debrief: {
    diagnosis: "Ingesta de pila de botón de litio impactada en el esófago superior, en niño de 3 años.",
    pathologies: [
      { name: "Pila de botón en el esófago", role: "principal", why: "Emergencia por lesión química y eléctrica." },
      { name: "Riesgo de fístula traqueoesofágica o aortoesofágica", role: "asociada", why: "Complicación grave." },
      { name: "Moneda, cuerpo extraño romo", role: "diferencial", why: "Otros cuerpos extraños." },
    ],
    reasoning: [
      "Causa: pila de litio de 20 mm al alcance del niño.",
      "Mecanismo: la corriente genera hidróxido en el polo negativo y una quemadura alcalina.",
      "Consecuencia: necrosis en horas, perforación, fístulas y estenosis.",
    ],
    epidemiology:
      "Las pilas de botón están en controles, balanzas y juguetes. Las de litio de 20 mm son las más peligrosas en menores de 6 años. Pueden pasar inadvertidas si nadie vio la ingesta.",
    management: [
      "Radiografía.",
      "Miel si corresponde.",
      "Endoscopia urgente.",
      "Seguimiento.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Ingesta de pilas botón.", "NASPGHAN — Management of Ingested Foreign Bodies in Children."],
    pearls: ["Doble halo en la radiografía.", "Dos horas cambian todo.", "Miel en el camino."],
    pitfalls: ["Confundir con moneda.", "Esperar a que pase."],
    tribunal: [
      qa("¿Por qué la pila es peor que una moneda?", "Porque genera corriente y una quemadura alcalina que necrosa la pared en horas."),
      qa("¿Qué complicación tardía puede ser mortal?", "La fístula aortoesofágica con hemorragia masiva, días o semanas después."),
      qa("¿Qué hacés si la pila está en el estómago y no hay síntomas?", "En general se puede controlar con radiografías, salvo en niños muy pequeños o con imanes."),
    ],
  },
};
