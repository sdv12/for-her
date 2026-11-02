import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const acne: ClinicalCase = {
  id: "acne-vulgar-moderado",
  level: 1,
  area: "Dermatología",
  setting: "Consultorio",
  patient: { age: 16, ageUnit: "años", sex: "M", context: "Estudiante secundario. Se compró cremas en la farmacia sin resultado." },
  frequency: "muy-frecuente",
  intro: "“Tengo muchos granos en la cara y la espalda desde hace un año. Me da vergüenza ir a la escuela.”",
  vitals: { TA: "116/70 mmHg", FC: "72 lpm", "T°": "36,5 °C" },
  anamnesis: [
    act("tiempo", "¿Desde cuándo y cómo evolucionó?", "clave", "“Un año, cada vez más, ahora con granos que duelen.”", "Acné inflamatorio progresivo."),
    act("tratamientos", "¿Qué usaste?", "clave", "“Cremas y jabones de la farmacia, y me los aprieto.”", "Manipular las lesiones aumenta las cicatrices."),
    act("animo", "¿Cómo te afecta?", "clave", "“Evito salir, me siento feo.”", "El impacto emocional es indicación de tratamiento activo."),
    act("suplementos", "¿Tomás suplementos para el gimnasio o anabólicos?", "util", "“Proteína en polvo.”", "Los anabólicos y algunos suplementos empeoran el acné."),
    act("familia", "¿Tus padres tuvieron acné con cicatrices?", "util", "“Mi papá.”", "Riesgo de cicatrices."),
    act("deporte", "¿Qué deporte hacés?", "neutro", "“Rugby.”", "No orienta."),
  ],
  exam: [
    act("lesiones", "Tipo y distribución de lesiones", "clave", "Comedones abiertos y cerrados, pápulas y pústulas en cara, espalda y pecho; algunos nódulos pequeños.", "Acné moderado papulopustuloso."),
    act("cicatrices", "Cicatrices", "util", "Cicatrices atróficas iniciales en mejillas.", "Indica tratamiento eficaz temprano."),
    act("otros", "Signos de hiperandrogenismo o virilización", "util", "No.", "Descarta causa endocrina."),
  ],
  studies: [
    study("Laboratorio", "hormonas", "Perfil hormonal de rutina", "innecesario", "No se realizó.", "En un varón adolescente sin signos endocrinos no está indicado."),
    study("Microbiología", "cultivo", "Cultivo de pústulas", "innecesario", "No se realizó.", "No cambia la conducta."),
    study("Laboratorio", "lab-isotretinoina", "Hepatograma y lípidos si se inicia isotretinoína", "util", "Normales.", "Controles para isotretinoína."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("acne", "Acné vulgar moderado papulopustuloso con cicatrices iniciales", true, "Comedones, pápulas y pústulas en cara y tronco en un adolescente, con cicatrices atróficas."),
      dx("rosacea", "Rosácea", false, "No hay comedones y es más común en adultos."),
      dx("foliculitis", "Foliculitis", false, "No hay comedones."),
      dx("dermatitis-perioral", "Dermatitis perioral", false, "Se localiza alrededor de la boca, sin comedones."),
      dx("anabolicos", "Acné por anabólicos", false, "No usa anabólicos; patrón de acné vulgar adolescente."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("topico", "Tratamiento tópico combinado: retinoide (adapaleno) con peróxido de benzoilo", "clave", "Base del tratamiento: actúa sobre comedones e inflamación."),
      mg("oral", "Antibiótico oral (doxiciclina) por 3 meses junto al tópico, sin usar antibiótico solo", "clave", "Acné moderado extenso en tronco; combinar evita resistencia."),
      mg("educacion", "Explicar que el efecto tarda 6–8 semanas, no apretar los granos y usar protector solar", "clave", "Mejora la adherencia y evita cicatrices."),
      mg("isotretinoina", "Derivar a dermatología para isotretinoína si no responde o hay nódulos y cicatrices", "util", "Tratamiento más eficaz para el acné grave o resistente."),
      mg("antibiotico-solo", "Antibiótico tópico solo de forma prolongada", "riesgoso", "Genera resistencia bacteriana."),
      mg("dieta-estricta", "Prohibir el chocolate y todas las grasas", "innecesario", "No hay evidencia de que el chocolate cause acné."),
    ],
  },
  debrief: {
    diagnosis: "Acné vulgar moderado papulopustuloso en cara y tronco con cicatrices atróficas iniciales e impacto emocional, en adolescente de 16 años.",
    pathologies: [
      { name: "Acné vulgar", role: "principal", why: "Enfermedad de la unidad pilosebácea." },
      { name: "Impacto psicosocial", role: "asociada", why: "Afecta la autoestima." },
      { name: "Rosácea, foliculitis, dermatitis perioral", role: "diferencial", why: "Otras erupciones faciales." },
    ],
    reasoning: [
      "Causa: andrógenos de la pubertad que estimulan las glándulas sebáceas.",
      "Mecanismo: más sebo, taponamiento del folículo (comedón), proliferación de Cutibacterium acnes e inflamación.",
      "Consecuencia: comedones, pápulas, pústulas, nódulos y cicatrices.",
    ],
    epidemiology:
      "El acné afecta a la gran mayoría de los adolescentes (más del 80 %) en algún grado, con más intensidad en varones. Una parte importante desarrolla cicatrices y sufre ansiedad o depresión asociadas.",
    management: [
      "Clasificar la gravedad.",
      "Leve: tópicos (retinoide y peróxido de benzoilo).",
      "Moderado: tópicos más antibiótico oral por tiempo limitado.",
      "Grave o con cicatrices: isotretinoína oral con controles.",
    ],
    sources: ["Sociedad Argentina de Dermatología — Consenso de acné.", "Sociedad Argentina de Pediatría — Acné en la adolescencia."],
    pearls: ["Retinoide tópico es la base.", "Nunca antibiótico solo.", "Tratar temprano evita cicatrices."],
    pitfalls: ["Minimizar el impacto emocional.", "Antibiótico tópico solo y prolongado."],
    tribunal: [
      qa("¿Qué precauciones tiene la isotretinoína?", "Es muy teratogénica: en mujeres requiere anticoncepción eficaz y test de embarazo mensual; da sequedad de piel y mucosas, aumento de lípidos y transaminasas, y se vigila el ánimo."),
      qa("¿Cómo se clasifica el acné?", "Comedoniano, papulopustuloso leve a moderado, nodular moderado y nodular grave o conglobata; también según la extensión y la presencia de cicatrices."),
      qa("¿Cuándo sospechar una causa hormonal en mujeres con acné?", "Ante acné de inicio tardío o resistente con irregularidades menstruales, hirsutismo, alopecia androgénica o signos de virilización: se estudia síndrome de ovario poliquístico u otros hiperandrogenismos."),
    ],
  },
};
