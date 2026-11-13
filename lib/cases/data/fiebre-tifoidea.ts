import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const fiebreTifoidea: ClinicalCase = {
  id: "fiebre-tifoidea",
  level: 3,
  area: "Infectología",
  setting: "Guardia",
  patient: { age: 26, ageUnit: "años", sex: "M", context: "Volvió hace 12 días de un viaje de tres semanas por el norte de la India." },
  frequency: "raro",
  intro: "“Hace una semana tengo fiebre que sube cada día, dolor de cabeza y la panza hinchada. Estoy muy flojo.”",
  vitals: { TA: "112/70 mmHg", FC: "84 lpm", FR: "18 rpm", "T°": "39,6 °C", "SatO₂": "98 %" },
  anamnesis: [
    act("viaje", "¿Viajó? ¿Qué comió y tomó?", "clave", "“A la India; comí en puestos callejeros y tomé agua de la canilla a veces.”", "Exposición fecal-oral."),
    act("fiebre", "¿Cómo es la fiebre?", "clave", "“Cada día un poco más alta.”", "Fiebre en escalera."),
    act("vacuna", "¿Se vacunó o tomó profilaxis antimalárica?", "clave", "“Nada.”", "Riesgo de tifoidea y malaria."),
    act("deposiciones", "¿Diarrea o constipación?", "util", "“Más bien constipado.”", "Típico en adultos."),
    act("sangrado", "¿Sangre en la materia fecal?", "util", "“No.”", "Complicación."),
    act("trabajo", "¿Qué hace?", "neutro", "“Soy fotógrafo.”", "No orienta."),
  ],
  exam: [
    act("bradicardia", "Relación pulso-temperatura", "clave", "84 lpm con 39,6 °C.", "Bradicardia relativa."),
    act("roseola", "Piel del abdomen", "clave", "Algunas máculas rosadas de 2 a 4 mm en el tronco.", "Roséola tífica."),
    act("abdomen", "Abdomen", "util", "Distendido, hepatoesplenomegalia leve.", "Compromiso sistémico."),
  ],
  studies: [
    study("Microbiología", "hemocultivos", "Hemocultivos", "clave", "Salmonella Typhi.", "Diagnóstico."),
    study("Laboratorio", "gota-gruesa", "Gota gruesa y test rápido de malaria", "clave", "Negativos.", "Descartar malaria en viajero."),
    study("Laboratorio", "lab", "Hemograma y hepatograma", "util", "Leucopenia leve, transaminasas altas.", "Típico."),
    study("Laboratorio", "widal", "Reacción de Widal como único estudio", "innecesario", "No se realizó.", "Poco sensible y específica."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("tifoidea", "Fiebre tifoidea por Salmonella Typhi", true, "Viaje a India, fiebre en escalera, bradicardia relativa, roséola y hemocultivos positivos."),
      dx("malaria", "Malaria", false, "Gota gruesa y test negativos."),
      dx("dengue", "Dengue", false, "Hemocultivo positivo y evolución más larga."),
      dx("hepatitis-a", "Hepatitis A", false, "Sin ictericia y con bacteriemia."),
      dx("gastroenteritis", "Gastroenteritis por Salmonella no tifoidea", false, "Sin diarrea y con cuadro sistémico."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("ceftriaxona", "Ceftriaxona EV, con azitromicina como alternativa", "clave", "Alta resistencia a quinolonas en India."),
      mg("internar", "Internar y vigilar perforación y sangrado intestinal", "clave", "Complicaciones de la segunda y tercera semana."),
      mg("notificar", "Notificar y estudiar contactos", "clave", "Enfermedad de notificación obligatoria."),
      mg("higiene", "Higiene de manos y no manipular alimentos", "util", "Transmisión."),
      mg("cipro", "Ciprofloxacina empírica", "riesgoso", "Resistencia frecuente en Asia del sur."),
      mg("loperamida", "Antidiarreicos y antiespasmódicos", "riesgoso", "Favorecen complicaciones."),
    ],
  },
  debrief: {
    diagnosis: "Fiebre tifoidea por Salmonella Typhi adquirida en un viaje a la India, en varón de 26 años.",
    pathologies: [
      { name: "Fiebre tifoidea", role: "principal", why: "Infección sistémica por Salmonella Typhi." },
      { name: "Hepatoesplenomegalia", role: "asociada", why: "Compromiso del sistema reticuloendotelial." },
      { name: "Malaria, dengue", role: "diferencial", why: "Fiebre en el viajero." },
    ],
    reasoning: [
      "Causa: agua o alimentos contaminados con Salmonella Typhi.",
      "Mecanismo: invasión de placas de Peyer y diseminación por el sistema reticuloendotelial.",
      "Consecuencia: bacteriemia y, en la tercera semana, perforación o sangrado ileal.",
    ],
    epidemiology:
      "En Argentina la tifoidea es rara y casi siempre importada de Asia del sur o zonas sin saneamiento. En todo viajero con fiebre se descarta primero la malaria. Las cepas del subcontinente indio son muchas veces resistentes a quinolonas.",
    management: [
      "Descartar malaria.",
      "Hemocultivos.",
      "Ceftriaxona.",
      "Notificar.",
    ],
    sources: ["Sociedad Argentina de Infectología — Fiebre en el viajero.", "CDC Yellow Book — Typhoid and Paratyphoid Fever."],
    pearls: ["Fiebre en escalera con bradicardia relativa.", "Roséola en el tronco.", "Primero descartá malaria."],
    pitfalls: ["Cipro en cepas de India.", "Confiar en el Widal."],
    tribunal: [
      qa("¿Qué complicación aparece en la tercera semana?", "Perforación o hemorragia del íleon por necrosis de las placas de Peyer."),
      qa("¿Qué es un portador crónico?", "Persona que elimina Salmonella Typhi más de un año, muchas veces desde la vesícula biliar."),
      qa("¿Hay vacuna?", "Sí, oral atenuada o inyectable de polisacárido Vi, para viajeros a zonas endémicas."),
    ],
  },
};
