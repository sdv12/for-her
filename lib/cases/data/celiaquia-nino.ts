import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const celiaquiaNino: ClinicalCase = {
  id: "celiaquia-clasica-nino",
  level: 2,
  area: "Pediatría",
  setting: "Consultorio",
  patient: { age: 2, ageUnit: "años", sex: "F", context: "Empezó con papillas con harina a los 7 meses. Tía con celiaquía." },
  frequency: "frecuente",
  intro: "“Tiene la panza hinchada, hace caca abundante y con olor feo, está de mal humor y no aumenta de peso.”",
  vitals: { FC: "118 lpm", FR: "26 rpm", "T°": "36,6 °C", Peso: "9,6 kg" },
  anamnesis: [
    act("heces", "¿Cómo son las deposiciones?", "clave", "“Voluminosas, pálidas, con mal olor.”", "Malabsorción."),
    act("curva", "¿Cómo fue el peso?", "clave", "“Venía bien, se frenó al año.”", "Tras incorporar gluten."),
    act("familia", "¿Familiares con celiaquía?", "clave", "“Mi hermana.”", "Riesgo."),
    act("infecciones", "¿Diarrea por infecciones?", "util", "“No.”", "Diferencial."),
    act("dieta", "¿Qué come?", "util", "“Fideos, pan.”", "Gluten."),
    act("juego", "¿Qué le gusta?", "neutro", "“Pintar.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Abdomen", "clave", "Distendido, timpánico.", "Clásico."),
    act("nutricion", "Masa muscular y nalgas", "clave", "Glúteos planos, brazos delgados.", "Desnutrición."),
    act("piel", "Piel y dientes", "util", "Palidez.", "Anemia."),
  ],
  studies: [
    study("Laboratorio", "atg", "Antitransglutaminasa IgA e IgA total", "clave", "Antitransglutaminasa muy alta; IgA normal.", "Pesquisa."),
    study("Laboratorio", "lab", "Hemograma y ferritina", "clave", "Anemia ferropénica.", "Malabsorción."),
    study("Otros", "biopsia", "Endoscopía con biopsia duodenal", "clave", "Atrofia vellositaria (Marsh 3c).", "Confirma."),
    study("Otros", "dieta-antes", "Sacar el gluten antes de estudiar", "riesgoso", "No se realizó.", "Falsea los resultados."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("celiaquia", "Enfermedad celíaca clásica", true, "Distensión, diarrea crónica, falla de crecimiento, antitransglutaminasa y biopsia."),
      dx("fq", "Fibrosis quística", false, "Sin compromiso respiratorio; serología."),
      dx("giardiasis", "Giardiasis", false, "Biopsia y serología."),
      dx("alergia", "Alergia a la proteína de leche", false, "Edad y serología."),
      dx("constitucional", "Retraso constitucional", false, "Hay malabsorción."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("sin-tacc", "Dieta libre de gluten (sin TACC) de por vida", "clave", "Único tratamiento."),
      mg("nutricion", "Hierro y nutricionista", "clave", "Recuperación."),
      mg("familia", "Pesquisar familiares de primer grado", "clave", "Riesgo."),
      mg("seguimiento", "Control de serología y crecimiento", "util", "Adherencia."),
      mg("parcial", "Disminuir el gluten sin sacarlo", "riesgoso", "Persiste el daño."),
      mg("corticoides", "Corticoides", "riesgoso", "No corresponde."),
    ],
  },
  debrief: {
    diagnosis: "Enfermedad celíaca clásica con desnutrición y anemia ferropénica, en niña de 2 años.",
    pathologies: [
      { name: "Enfermedad celíaca", role: "principal", why: "Enteropatía por gluten." },
      { name: "Desnutrición y anemia", role: "asociada", why: "Consecuencias." },
      { name: "Fibrosis quística, giardiasis", role: "diferencial", why: "Otras malabsorciones." },
    ],
    reasoning: [
      "Causa: respuesta inmune al gluten en personas HLA-DQ2 o DQ8.",
      "Mecanismo: atrofia de vellosidades.",
      "Consecuencia: malabsorción y retraso del crecimiento.",
    ],
    epidemiology:
      "Afecta a cerca de 1 de cada 100 personas en Argentina, con muchas formas no clásicas. La Ley 26.588 garantiza la cobertura de alimentos sin TACC. La forma clásica aparece en los primeros años, tras incorporar gluten.",
    management: [
      "Serología con gluten.",
      "Biopsia.",
      "Dieta sin TACC.",
      "Familia.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de enfermedad celíaca.", "ESPGHAN — Guidelines for Coeliac Disease."],
    pearls: ["Panza grande, glúteos planos.", "No sacar el gluten antes.", "IgA total."],
    pitfalls: ["Dieta antes del diagnóstico.", "No pesquisar familia."],
    tribunal: [
      qa("¿Qué significa TACC?", "Trigo, avena, cebada y centeno."),
      qa("¿Qué asociaciones tiene la celiaquía?", "Diabetes tipo 1, tiroiditis, síndrome de Down, Turner y déficit de IgA."),
      qa("¿Qué complicación tardía tiene?", "Linfoma intestinal de células T."),
    ],
  },
};
