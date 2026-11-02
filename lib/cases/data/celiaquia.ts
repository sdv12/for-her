import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const celiaquia: ClinicalCase = {
  id: "enfermedad-celiaca",
  level: 2,
  area: "Gastroenterología",
  setting: "Consultorio",
  patient: { age: 30, ageUnit: "años", sex: "F", context: "Tiene hipotiroidismo por Hashimoto. Su hermano es celíaco." },
  frequency: "frecuente",
  intro: "“Estoy cansada siempre, me dijeron que tengo anemia y el hierro no me hace nada. A veces tengo diarrea y la panza hinchada.”",
  vitals: { TA: "104/66 mmHg", FC: "86 lpm", "T°": "36,4 °C", Peso: "49 kg" },
  anamnesis: [
    act("anemia", "¿Desde cuándo tenés anemia? ¿Tomaste hierro y cómo respondiste?", "clave", "“Hace dos años, tomé hierro seis meses y sigue igual.”", "Anemia ferropénica refractaria al hierro oral: sospechar malabsorción, sobre todo celiaquía."),
    act("familia", "¿Alguien en tu familia es celíaco o tiene enfermedades autoinmunes?", "clave", "“Mi hermano es celíaco.”", "Los familiares de primer grado tienen un riesgo de alrededor del 10 %."),
    act("digestivo", "¿Cómo son las deposiciones? ¿Tenés distensión o gases?", "clave", "“Blandas, a veces flotan, y la panza hinchada después de comer.”", "Síntomas de malabsorción."),
    act("dieta", "¿Comés pan, fideos, galletitas todos los días?", "clave", "“Sí, como de todo.”", "Para el diagnóstico la persona debe estar consumiendo gluten."),
    act("menstruacion", "¿Cómo son tus menstruaciones?", "util", "“Normales, no abundantes.”", "Descarta pérdida ginecológica como causa de la anemia."),
    act("peso", "¿Bajaste de peso?", "util", "“Unos 4 kilos en el año.”", "Malabsorción."),
    act("musica", "¿Qué música escuchás?", "neutro", "“Cuarteto.”", "No orienta."),
  ],
  exam: [
    act("palidez", "Piel y mucosas", "clave", "Palidez, queilitis angular.", "Anemia y déficit nutricional."),
    act("abdomen", "Abdomen", "util", "Distendido, timpánico, no doloroso.", "Compatible con malabsorción."),
    act("piel", "Buscar dermatitis herpetiforme y aftas", "util", "Lesiones vesiculares pruriginosas en codos.", "La dermatitis herpetiforme es la manifestación cutánea de la celiaquía."),
  ],
  studies: [
    study("Laboratorio", "ttg", "Anticuerpos antitransglutaminasa IgA con IgA total", "clave", "Antitransglutaminasa IgA muy elevada; IgA total normal.", "Prueba de rastreo de elección; la IgA total descarta un déficit que daría falso negativo."),
    study("Otros", "biopsia", "Endoscopía con biopsias de duodeno", "clave", "Atrofia vellositaria con hiperplasia de criptas y linfocitos intraepiteliales (Marsh 3).", "Confirma el diagnóstico en adultos."),
    study("Laboratorio", "lab", "Ferritina, vitamina B12, ácido fólico, calcio, vitamina D", "util", "Ferritina 4, folato bajo, vitamina D baja.", "Déficits por malabsorción a reponer."),
    study("Laboratorio", "dieta-previa", "Indicar dieta sin gluten antes de los estudios", "riesgoso", "No se realizó.", "La dieta antes de los estudios negativiza anticuerpos y biopsia y dificulta el diagnóstico."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("celiaquia", "Enfermedad celíaca con anemia ferropénica refractaria y dermatitis herpetiforme", true, "Anemia ferropénica que no responde al hierro oral, diarrea y distensión, familiar celíaco, autoinmunidad tiroidea, antitransglutaminasa positiva y atrofia vellositaria."),
      dx("colon-irritable", "Síndrome de intestino irritable", false, "No explica la anemia, la pérdida de peso ni los anticuerpos."),
      dx("lactosa", "Intolerancia a la lactosa", false, "No da anemia ni atrofia vellositaria."),
      dx("crohn", "Enfermedad de Crohn", false, "La biopsia y los anticuerpos orientan a celiaquía."),
      dx("sensibilidad", "Sensibilidad al gluten no celíaca", false, "Esa entidad tiene anticuerpos y biopsia normales."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("dsgluten", "Dieta libre de gluten (sin trigo, avena, cebada ni centeno) de por vida, con alimentos rotulados \"Sin TACC\"", "clave", "Es el único tratamiento y permite la recuperación de la mucosa."),
      mg("nutricion", "Derivación a nutrición y reposición de hierro, folato y vitamina D", "clave", "Corrige los déficits mientras se recupera la absorción."),
      mg("familia", "Rastreo con anticuerpos a los familiares de primer grado", "clave", "Alto riesgo de celiaquía no diagnosticada."),
      mg("seguimiento", "Control de anticuerpos a los 6–12 meses y densitometría", "util", "Verifica la adherencia y evalúa la osteopenia."),
      mg("transgresiones", "Permitir pequeñas cantidades de gluten si no hay síntomas", "riesgoso", "Aun pequeñas cantidades dañan la mucosa y aumentan el riesgo de complicaciones (linfoma)."),
      mg("hierro-ev", "Hierro endovenoso como único tratamiento", "innecesario", "Puede ayudar, pero no trata la causa."),
    ],
  },
  debrief: {
    diagnosis: "Enfermedad celíaca (Marsh 3) con anemia ferropénica refractaria, déficit de folato y vitamina D, y dermatitis herpetiforme, en mujer de 30 años con tiroiditis de Hashimoto.",
    pathologies: [
      { name: "Enfermedad celíaca", role: "principal", why: "Enteropatía autoinmune por gluten con anticuerpos y biopsia positivos." },
      { name: "Anemia ferropénica y dermatitis herpetiforme", role: "asociada", why: "Manifestaciones extraintestinales." },
      { name: "Colon irritable, intolerancia a la lactosa, Crohn", role: "diferencial", why: "Otras causas de síntomas digestivos." },
    ],
    reasoning: [
      "Causa: predisposición genética (HLA-DQ2/DQ8) y consumo de gluten.",
      "Mecanismo: la gliadina, modificada por la transglutaminasa tisular, activa linfocitos T que dañan la mucosa del intestino delgado proximal.",
      "Consecuencia: atrofia de las vellosidades y malabsorción de hierro (duodeno), folato, calcio y vitaminas, con síntomas digestivos o solo extraintestinales.",
    ],
    epidemiology:
      "En Argentina la celiaquía afecta a alrededor de 1 de cada 100 personas, más a mujeres, y la mayoría no está diagnosticada. Se asocia a otras enfermedades autoinmunes (diabetes tipo 1, tiroiditis), síndrome de Down y familiares de primer grado. La Ley 26.588 garantiza su detección y la cobertura de alimentos.",
    management: [
      "Sospecharla ante anemia refractaria, diarrea crónica, baja talla, osteoporosis temprana, transaminasas altas o grupos de riesgo.",
      "Antitransglutaminasa IgA más IgA total, consumiendo gluten.",
      "Biopsia duodenal para confirmar.",
      "Dieta libre de gluten de por vida, seguimiento y rastreo familiar.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de práctica clínica sobre diagnóstico y tratamiento de la enfermedad celíaca en el primer nivel de atención.", "Ley 26.588 de Celiaquía."],
    pearls: ["Anemia ferropénica que no responde al hierro = pensar celiaquía.", "Antitransglutaminasa IgA + IgA total.", "No sacar el gluten antes de estudiar."],
    pitfalls: ["Indicar dieta sin gluten antes de los estudios.", "No pedir IgA total."],
    tribunal: [
      qa("¿Qué formas clínicas tiene la celiaquía?", "Clásica (diarrea, malabsorción, pérdida de peso), no clásica u oligosintomática (anemia, osteoporosis, aftas, infertilidad, transaminasas altas), subclínica o silente (detectada por rastreo) y potencial (anticuerpos positivos con biopsia normal)."),
      qa("¿Qué complicaciones tiene la celiaquía no tratada?", "Osteoporosis, infertilidad, linfoma intestinal de células T, adenocarcinoma de intestino delgado, celiaquía refractaria y otras enfermedades autoinmunes."),
      qa("¿Qué cereales contienen gluten?", "Trigo, avena (por contaminación), cebada y centeno (TACC); se permiten arroz, maíz, mandioca, papa, quinoa y legumbres, cuidando la contaminación cruzada."),
    ],
  },
};
