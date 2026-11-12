import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const carcinomaBasocelular: ClinicalCase = {
  id: "carcinoma-basocelular",
  level: 1,
  area: "Dermatología",
  setting: "Consultorio",
  patient: { age: 68, ageUnit: "años", sex: "M", context: "Trabajó toda la vida en el campo, al sol. Piel clara." },
  frequency: "muy-frecuente",
  intro: "“Tengo una lastimadura en la nariz que sangra, hace costra y no termina de cerrar hace un año.”",
  vitals: { TA: "132/80 mmHg", FC: "74 lpm", "T°": "36,4 °C" },
  anamnesis: [
    act("evolucion", "¿Hace cuánto? ¿Creció?", "clave", "“Un año, creció lento.”", "Crecimiento lento."),
    act("sol", "¿Exposición al sol, quemaduras?", "clave", "“Toda la vida.”", "Factor."),
    act("otras", "¿Otras lesiones?", "clave", "“Algunas manchas ásperas en la cara.”", "Queratosis actínicas."),
    act("inmuno", "¿Trasplante o inmunosupresión?", "util", "“No.”", "Riesgo."),
    act("sangrado", "¿Sangra?", "util", "“Al roce.”", "Típico."),
    act("campo", "¿Qué cultivaba?", "neutro", "“Maíz.”", "No orienta."),
  ],
  exam: [
    act("lesion", "Lesión", "clave", "Pápula perlada de 1 cm con telangiectasias y úlcera central en el ala nasal.", "Típica."),
    act("dermatoscopia", "Dermatoscopía", "clave", "Vasos arborizantes.", "Basocelular."),
    act("ganglios", "Ganglios", "util", "Sin adenopatías.", "Rara vez metastatiza."),
  ],
  studies: [
    study("Otros", "biopsia", "Biopsia", "clave", "Carcinoma basocelular nodular.", "Confirma."),
    study("Otros", "piel-total", "Examen de toda la piel", "clave", "Queratosis actínicas.", "Otras lesiones."),
    study("Imágenes", "tc", "TC de estadificación", "innecesario", "No se realizó.", "Raramente metastatiza."),
    study("Otros", "crema-sola", "Crema cicatrizante por meses", "riesgoso", "No se realizó.", "Crece localmente."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("basocelular", "Carcinoma basocelular nodular de alto riesgo por localización", true, "Pápula perlada con telangiectasias y úlcera, en zona fotoexpuesta, con biopsia."),
      dx("espinocelular", "Carcinoma espinocelular", false, "Biopsia basocelular."),
      dx("melanoma", "Melanoma", false, "Sin pigmento y biopsia."),
      dx("queratosis", "Queratosis actínica", false, "Es pápula ulcerada."),
      dx("leishmania", "Leishmaniasis", false, "Biopsia."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("mohs", "Cirugía de Mohs o escisión con márgenes", "clave", "Zona de alto riesgo."),
      mg("fotoproteccion", "Fotoprotección", "clave", "Prevención."),
      mg("controles", "Controles dermatológicos periódicos", "clave", "Nuevos tumores."),
      mg("actinicas", "Tratar queratosis actínicas", "util", "Lesiones precursoras."),
      mg("esperar", "Esperar porque no metastatiza", "riesgoso", "Destruye localmente."),
      mg("quemar", "Quemar sin biopsia", "riesgoso", "Sin diagnóstico."),
    ],
  },
  debrief: {
    diagnosis: "Carcinoma basocelular nodular del ala nasal, en varón de 68 años con exposición solar crónica.",
    pathologies: [
      { name: "Carcinoma basocelular", role: "principal", why: "Cáncer de piel más frecuente." },
      { name: "Daño actínico", role: "asociada", why: "Factor." },
      { name: "Espinocelular, melanoma", role: "diferencial", why: "Otros tumores." },
    ],
    reasoning: [
      "Causa: radiación ultravioleta acumulada.",
      "Mecanismo: mutaciones de la vía Hedgehog.",
      "Consecuencia: crecimiento lento con destrucción local.",
    ],
    epidemiology:
      "Es el cáncer más frecuente en humanos. Afecta a personas de piel clara con exposición solar, frecuente en trabajadores rurales. Casi nunca metastatiza, pero puede destruir estructuras de la cara si se demora.",
    management: [
      "Sospecha clínica.",
      "Biopsia.",
      "Cirugía.",
      "Prevención.",
    ],
    sources: ["Sociedad Argentina de Dermatología — Cáncer de piel no melanoma.", "NCCN — Basal Cell Skin Cancer Guidelines."],
    pearls: ["Perlada con telangiectasias.", "Herida que no cierra.", "Nariz: alto riesgo."],
    pitfalls: ["Crema sin biopsia.", "Esperar."],
    tribunal: [
      qa("¿Cómo diferenciás basocelular y espinocelular?", "Basocelular: perlado, lento, raramente metastatiza. Espinocelular: queratósico, más rápido, puede metastatizar."),
      qa("¿Qué es la cirugía de Mohs?", "Escisión por capas con control de márgenes, que preserva tejido."),
      qa("¿Qué lesión es precursora del espinocelular?", "La queratosis actínica."),
    ],
  },
};
