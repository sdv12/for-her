import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const carbunco: ClinicalCase = {
  id: "carbunco",
  level: 3,
  area: "Infectología",
  setting: "Guardia",
  patient: { age: 44, ageUnit: "años", sex: "M", context: "Peón rural en el oeste de la provincia de Buenos Aires. Hace 5 días carneó una vaca que murió de golpe." },
  frequency: "raro",
  intro: "“Me salió un grano en el brazo que se puso negro. No me duele, pero el brazo está muy hinchado.”",
  vitals: { TA: "126/78 mmHg", FC: "92 lpm", FR: "18 rpm", "T°": "37,9 °C" },
  anamnesis: [
    act("animal", "¿De qué murió la vaca y qué hicieron con ella?", "clave", "“Amaneció muerta, le salía sangre por la nariz. La carneamos para no perder la carne.”", "Muerte súbita con sangrado por orificios: sospecha de carbunco bovino."),
    act("evolucion", "¿Cómo empezó la lesión?", "clave", "“Como una picadura que picaba, después una ampolla y se puso negra.”", "Pápula, vesícula y escara: evolución típica."),
    act("dolor", "¿Le duele?", "clave", "“No, eso es lo raro.”", "La escara indolora es característica."),
    act("otros", "¿Alguien más tocó la carne?", "clave", "“Mi cuñado y la carnicería del pueblo.”", "Es una zoonosis de denuncia: hay que buscar más expuestos."),
    act("vacunas", "¿Vacunan a los animales?", "util", "“Ese año no.”", "La vacunación del ganado es la prevención."),
    act("sintomas-sistemicos", "¿Tos, falta de aire, diarrea?", "util", "“No.”", "Descarta formas inhalatoria y digestiva."),
  ],
  exam: [
    act("lesion", "Lesión cutánea", "clave", "Escara negra de 2 cm en el antebrazo, con vesículas satélites y edema duro e importante alrededor, indolora.", "Pústula maligna: carbunco cutáneo."),
    act("ganglios", "Ganglios", "util", "Adenopatía axilar dolorosa.", "Linfadenitis regional."),
    act("sistemico", "Examen cardiopulmonar", "util", "Normal.", "Sin compromiso sistémico."),
  ],
  studies: [
    study("Microbiología", "gram-cultivo", "Hisopado de las vesículas para Gram y cultivo", "clave", "Bacilos grampositivos grandes en cadena; cultivo: Bacillus anthracis.", "Confirma. Avisar al laboratorio por bioseguridad."),
    study("Laboratorio", "lab", "Hemograma y función renal", "util", "Leucocitosis leve.", "Gravedad."),
    study("Imágenes", "rx", "Radiografía de tórax", "util", "Normal, sin ensanchamiento mediastínico.", "Descarta forma inhalatoria."),
    study("Otros", "desbridar", "Desbridamiento quirúrgico de la escara", "riesgoso", "No se hizo.", "No se debe tocar: puede diseminar la infección."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("carbunco", "Carbunco cutáneo (pústula maligna) por Bacillus anthracis", true, "Contacto con vaca muerta súbitamente, escara negra indolora con edema importante y bacilos grampositivos en cadena."),
      dx("loxoscelismo", "Loxoscelismo cutáneo", false, "La placa del loxosceles es dolorosa y sin antecedente de faena."),
      dx("ectima", "Ectima por estreptococo", false, "Úlcera dolorosa, sin edema tan llamativo."),
      dx("celulitis", "Celulitis", false, "La celulitis duele y no da escara negra."),
      dx("esporotricosis", "Esporotricosis", false, "Nódulos en cadena linfática, más lentos."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cipro", "Ciprofloxacina o doxiciclina por vía oral 7–10 días", "clave", "Tratamiento del carbunco cutáneo sin compromiso sistémico."),
      mg("notificar", "Notificación inmediata al sistema de vigilancia y a SENASA", "clave", "Zoonosis de notificación obligatoria: hay que rastrear la carne y el campo."),
      mg("contactos", "Buscar a los otros expuestos y decomisar la carne", "clave", "Brote posible."),
      mg("no-tocar", "No desbridar y curar con apósito seco", "clave", "La escara cae sola."),
      mg("vacunacion-ganado", "Vacunar al rodeo y enterrar o incinerar cadáveres sin abrirlos", "util", "Prevención."),
      mg("cirugia", "Escisión de la escara", "riesgoso", "Puede diseminar."),
      mg("ambulatorio-sin-aviso", "Alta con antibiótico sin notificar", "riesgoso", "Pierde la oportunidad de cortar el brote."),
    ],
  },
  debrief: {
    diagnosis: "Carbunco cutáneo por Bacillus anthracis tras faenar una vaca muerta, en un peón rural de 44 años.",
    pathologies: [
      { name: "Carbunco cutáneo", role: "principal", why: "Inoculación de esporas por una lesión de la piel." },
      { name: "Linfadenitis regional", role: "asociada", why: "Diseminación linfática." },
      { name: "Loxoscelismo cutáneo", role: "diferencial", why: "Otra escara negra con edema." },
    ],
    reasoning: [
      "Causa: esporas de B. anthracis del animal muerto, que pueden sobrevivir décadas en el suelo.",
      "Mecanismo: la toxina edematizante y la letal producen edema y necrosis indolora.",
      "Consecuencia: escara negra que, sin tratamiento, puede pasar a sangre en un 20 % de los casos.",
    ],
    epidemiology:
      "El carbunco es endémico en la pampa húmeda, sobre todo en el oeste bonaerense, La Pampa y el sur de Córdoba. Afecta a peones, veterinarios y carniceros que manipulan animales muertos. La forma cutánea es el 95 % de los casos humanos.",
    management: [
      "Ciprofloxacina o doxiciclina.",
      "No desbridar.",
      "Notificar y rastrear la carne y a los expuestos.",
      "Vacunación del ganado y manejo seguro de cadáveres.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de carbunco.", "SENASA — Carbunco bacteridiano."],
    pearls: ["Vaca muerta de golpe + escara indolora.", "No se corta: se trata y se notifica.", "Cadáver sangrando por orificios: no abrirlo."],
    pitfalls: ["Confundirlo con una picadura.", "Olvidar la notificación."],
    tribunal: [
      qa("¿Cuáles son las formas clínicas del carbunco?", "Cutánea, la más frecuente; inhalatoria, con mediastinitis hemorrágica; digestiva por carne contaminada, y meníngea."),
      qa("¿Por qué no se debe abrir el cadáver de un animal con sospecha de carbunco?", "Porque al exponerse al aire el bacilo forma esporas que contaminan el suelo por décadas."),
      qa("¿Qué caracteriza la lesión cutánea del carbunco?", "Una escara negra indolora rodeada de vesículas y de un edema duro desproporcionado."),
    ],
  },
};
