import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const crohnAdolescente: ClinicalCase = {
  id: "crohn-adolescente-retraso-crecimiento",
  level: 3,
  area: "Gastroenterología",
  setting: "Consultorio",
  patient: { age: 13, ageUnit: "años", sex: "M", context: "Era de los más altos del grado y ahora es de los más bajos. Lo trae la mamá." },
  frequency: "poco-frecuente",
  intro: "“Hace un año tiene dolor de panza, diarrea a veces, aftas en la boca y casi no creció. Ahora tiene una herida cerca de la cola.”",
  vitals: { FC: "96 lpm", "T°": "37,6 °C", Peso: "34 kg" },
  anamnesis: [
    act("crecimiento", "¿Cómo creció este año?", "clave", "“Dos centímetros.”", "Detención del crecimiento."),
    act("digestivo", "¿Cómo son el dolor y la diarrea?", "clave", "“Dolor en la panza abajo a la derecha, diarrea sin sangre.”", "Ileítis."),
    act("perianal", "¿Qué tiene cerca de la cola?", "clave", "“Una herida que supura.”", "Enfermedad perianal."),
    act("aftas", "¿Aftas, dolor de articulaciones o de ojos?", "util", "“Aftas seguido.” (celiaquía descartada por serología)", "Manifestaciones extraintestinales."),
    act("pubertad", "¿Empezó a desarrollarse?", "util", "“Todavía no.”", "Retraso puberal."),
    act("deporte", "¿Hace deporte?", "neutro", "“Básquet, pero lo dejó.”", "No orienta."),
  ],
  exam: [
    act("perianal-ex", "Región perianal", "clave", "Fístula perianal y colgajo cutáneo.", "Muy sugestivo de Crohn."),
    act("abdomen", "Abdomen", "clave", "Masa dolorosa en fosa ilíaca derecha.", "Ileítis."),
    act("curva", "Curva de crecimiento", "util", "Cruzó dos percentiles hacia abajo.", "Impacto en crecimiento."),
  ],
  studies: [
    study("Laboratorio", "lab", "Hemograma, PCR, albúmina, ferritina, calprotectina", "clave", "Anemia, PCR alta, albúmina baja, calprotectina 980.", "Inflamación intestinal."),
    study("Otros", "endoscopia", "Ileocolonoscopia y endoscopia alta con biopsias", "clave", "Úlceras aftoides en íleon terminal, granulomas no caseificantes.", "Crohn."),
    study("Imágenes", "entero-rm", "Entero-RM", "util", "Íleon terminal engrosado de 15 cm.", "Extensión."),
    study("Imágenes", "tc-repetidas", "TC de abdomen repetidas para seguimiento", "riesgoso", "No se indicaron.", "Radiación acumulada en un joven; se prefiere entero-RM."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("crohn", "Enfermedad de Crohn ileal con enfermedad perianal y retraso del crecimiento", true, "Detención del crecimiento, dolor en fosa derecha, fístula perianal, calprotectina alta y granulomas."),
      dx("celiaquia", "Celiaquía", false, "Serología negativa y granulomas."),
      dx("cu", "Colitis ulcerosa", false, "Compromiso ileal y perianal."),
      dx("tbc", "Tuberculosis intestinal", false, "Granulomas no caseificantes y fístula perianal."),
      dx("sii", "Intestino irritable", false, "Inflamación objetiva."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("nutricion-exclusiva", "Nutrición enteral exclusiva para la inducción", "clave", "Primera elección en niños, favorece el crecimiento."),
      mg("biologico", "Anti-TNF por la enfermedad perianal", "clave", "Fístula."),
      mg("crecimiento", "Seguimiento del crecimiento y la pubertad", "clave", "Objetivo terapéutico."),
      mg("hierro-vitd", "Hierro, vitamina D y calcio", "util", "Déficits."),
      mg("corticoides-cronicos", "Corticoides prolongados", "riesgoso", "Detienen el crecimiento."),
      mg("cirugia-fistula", "Fistulotomía agresiva sin tratamiento médico", "riesgoso", "Incontinencia."),
    ],
  },
  debrief: {
    diagnosis: "Enfermedad de Crohn ileal con fístula perianal y retraso del crecimiento, en varón de 13 años.",
    pathologies: [
      { name: "Enfermedad de Crohn", role: "principal", why: "Inflamación transmural." },
      { name: "Retraso del crecimiento y puberal", role: "asociada", why: "Inflamación y desnutrición." },
      { name: "Celiaquía, TBC", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: predisposición genética, microbiota y respuesta inmune alterada.",
      "Mecanismo: inflamación transmural con granulomas y fístulas.",
      "Consecuencia: malabsorción, inflamación crónica y falla de crecimiento.",
    ],
    epidemiology:
      "Un cuarto de los Crohn empieza en la infancia o adolescencia. La detención del crecimiento puede ser la única manifestación. La enfermedad perianal es muy sugestiva.",
    management: [
      "Curva de crecimiento.",
      "Calprotectina y endoscopia.",
      "Nutrición enteral exclusiva.",
      "Biológico.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Enfermedad inflamatoria intestinal pediátrica.", "ECCO/ESPGHAN — Guideline on Medical Management of Pediatric Crohn's Disease."],
    pearls: ["Talla que se detiene.", "Fístula perianal.", "Nutrición enteral exclusiva."],
    pitfalls: ["Corticoides largos.", "Atribuirlo a la edad."],
    tribunal: [
      qa("¿Qué diferencia transmural de mucosa?", "El Crohn afecta toda la pared y genera fístulas; la colitis ulcerosa solo la mucosa."),
      qa("¿Qué es la calprotectina fecal?", "Proteína de neutrófilos en heces que indica inflamación intestinal."),
      qa("¿Qué manifestaciones extraintestinales hay?", "Aftas, artritis, eritema nudoso, uveítis y colangitis esclerosante."),
    ],
  },
};
