import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const giardiasisAdulto: ClinicalCase = {
  id: "giardiasis-adulto-viajero",
  level: 1,
  area: "Infectología",
  setting: "Consultorio",
  patient: { age: 30, ageUnit: "años", sex: "M", context: "Volvió hace 3 semanas de un trekking en la Patagonia; tomó agua de arroyos sin hervir." },
  frequency: "frecuente",
  intro: "“Hace dos semanas tengo diarrea con mucho olor, gases, panza hinchada y bajé cuatro kilos.”",
  vitals: { TA: "118/72 mmHg", FC: "76 lpm", "T°": "36,5 °C", Peso: "70 kg" },
  anamnesis: [
    act("agua", "¿Qué agua tomaste?", "clave", "“De arroyos sin hervir.”", "Exposición."),
    act("deposiciones", "¿Cómo son las deposiciones?", "clave", "“Grasosas, flotan y con olor feo.”", "Esteatorrea."),
    act("sangre", "¿Sangre o fiebre?", "clave", "“No.”", "No invasiva."),
    act("gases", "¿Gases y eructos?", "util", "“Muchos, con olor a huevo podrido.”", "Típico."),
    act("lacteos", "¿Te caen mal los lácteos?", "util", "“Ahora sí.”", "Intolerancia secundaria."),
    act("trekking", "¿Por dónde caminaste?", "neutro", "“El Chaltén.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Abdomen", "clave", "Distendido, ruidos aumentados, sin dolor focal.", "Malabsorción."),
    act("hidratacion", "Hidratación", "clave", "Normal.", "Sin deshidratación."),
    act("peso-ex", "Peso", "util", "Bajó 4 kg.", "Malabsorción."),
  ],
  studies: [
    study("Laboratorio", "antigeno", "Antígeno de Giardia en materia fecal o parasitológico seriado", "clave", "Positivo.", "Confirma."),
    study("Laboratorio", "lab", "Hemograma", "util", "Normal.", "Sin eosinofilia."),
    study("Laboratorio", "coprocultivo", "Coprocultivo", "util", "Negativo.", "Diferencial."),
    study("Otros", "colonoscopia", "Colonoscopia", "innecesario", "No se realizó.", "Cuadro típico."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("giardiasis", "Giardiasis con malabsorción en adulto tras consumir agua no tratada", true, "Diarrea grasosa, gases, pérdida de peso, agua de arroyo y antígeno positivo."),
      dx("celiaquia", "Celiaquía", false, "Antígeno de Giardia positivo y exposición clara."),
      dx("shigella", "Shigelosis", false, "Sin sangre ni fiebre."),
      dx("sii", "Intestino irritable", false, "Pérdida de peso y parásito identificado."),
      dx("cryptosporidium", "Criptosporidiosis", false, "El antígeno es de Giardia."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("tinidazol", "Tinidazol dosis única o metronidazol", "clave", "Tratamiento."),
      mg("lacteos", "Reducir lácteos unas semanas", "clave", "Intolerancia transitoria."),
      mg("prevencion", "Hervir o filtrar el agua en el campo", "clave", "Prevención."),
      mg("alcohol", "Evitar alcohol con nitroimidazoles", "util", "Efecto disulfiram."),
      mg("loperamida-sola", "Solo loperamida", "riesgoso", "No trata."),
      mg("antibiotico-amplio", "Ciprofloxacina", "riesgoso", "No actúa sobre Giardia."),
    ],
  },
  debrief: {
    diagnosis: "Giardiasis con malabsorción en varón de 30 años tras consumir agua de arroyo no tratada.",
    pathologies: [
      { name: "Giardiasis", role: "principal", why: "Parasitosis intestinal." },
      { name: "Malabsorción e intolerancia a la lactosa", role: "asociada", why: "Consecuencias." },
      { name: "Celiaquía, shigelosis", role: "diferencial", why: "Otras diarreas." },
    ],
    reasoning: [
      "Causa: quistes de Giardia en agua contaminada por heces de animales o personas.",
      "Mecanismo: adhesión al duodeno y atrofia de vellosidades.",
      "Consecuencia: esteatorrea, distensión y pérdida de peso.",
    ],
    epidemiology:
      "El agua de arroyos aparentemente limpios en la montaña puede estar contaminada. La giardiasis es una causa frecuente de diarrea prolongada en viajeros. Los quistes resisten el cloro común.",
    management: [
      "Antecedente de agua.",
      "Antígeno en heces.",
      "Tinidazol.",
      "Prevención.",
    ],
    sources: ["Sociedad Argentina de Infectología — Parasitosis intestinales.", "CDC — Giardiasis for Healthcare Professionals."],
    pearls: ["Diarrea grasosa tras trekking.", "Eructos sulfurosos.", "Hervir el agua."],
    pitfalls: ["Antibióticos comunes.", "No preguntar por el agua."],
    tribunal: [
      qa("¿Por qué no se ve sangre en la giardiasis?", "Porque no invade la mucosa; actúa en la superficie del intestino delgado."),
      qa("¿Qué inmunodeficiencia predispone a giardiasis crónica?", "La deficiencia de IgA y la inmunodeficiencia común variable."),
      qa("¿Cómo se inactivan los quistes en el agua?", "Hirviéndola al menos un minuto o con filtros adecuados."),
    ],
  },
};
