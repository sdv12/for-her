import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const degeneracionMacular: ClinicalCase = {
  id: "degeneracion-macular-neovascular",
  level: 2,
  area: "Oftalmología",
  setting: "Consultorio",
  patient: { age: 77, ageUnit: "años", sex: "F", context: "Ex fumadora. Hipertensa. Lee mucho." },
  frequency: "frecuente",
  intro: "“Hace dos semanas veo las líneas torcidas con el ojo derecho y una mancha en el centro cuando leo.”",
  vitals: { TA: "142/82 mmHg", FC: "72 lpm", "T°": "36,4 °C" },
  anamnesis: [
    act("metamorfopsia", "¿Ve las líneas rectas torcidas?", "clave", "“Los marcos de la puerta se ven ondulados.”", "Metamorfopsia."),
    act("central", "¿Dónde está la mancha?", "clave", "“En el centro, justo donde miro.”", "Escotoma central."),
    act("tiempo", "¿Desde cuándo?", "clave", "“Dos semanas.”", "Agudo: forma neovascular."),
    act("tabaco", "¿Fumó?", "util", "“Treinta años.”", "Factor de riesgo."),
    act("otro-ojo", "¿Y el otro ojo?", "util", "“Bien, pero me dijeron que tengo 'drusas'.”", "Bilateral."),
    act("libros", "¿Qué lee?", "neutro", "“Novelas policiales.”", "No orienta."),
  ],
  exam: [
    act("agudeza", "Agudeza visual", "clave", "OD 2/10; OI 8/10.", "Pérdida central."),
    act("amsler", "Rejilla de Amsler", "clave", "Distorsión central OD.", "Compromiso macular."),
    act("fondo", "Fondo de ojo", "util", "Drusas bilaterales y hemorragia macular derecha.", "Neovascular."),
  ],
  studies: [
    study("Imágenes", "oct", "Tomografía de coherencia óptica (OCT)", "clave", "Membrana neovascular con líquido subretinal.", "Confirma."),
    study("Imágenes", "angiografia", "Angiografía con fluoresceína", "util", "Filtración de membrana neovascular.", "Caracteriza."),
    study("Otros", "agudeza-oi", "Control del ojo izquierdo", "util", "Drusas sin líquido.", "Forma seca."),
    study("Imágenes", "rm", "RM de cerebro", "innecesario", "No se realizó.", "Causa ocular clara."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("dmae-humeda", "Degeneración macular asociada a la edad neovascular (húmeda) en ojo derecho", true, "Metamorfopsia y escotoma central de inicio reciente, drusas y membrana neovascular en la OCT."),
      dx("catarata", "Catarata", false, "No da metamorfopsia."),
      dx("glaucoma", "Glaucoma", false, "Afecta la periferia primero."),
      dx("retinopatia-diabetica", "Retinopatía diabética", false, "No es diabética."),
      dx("dmae-seca", "DMAE seca sola", false, "Hay neovascularización y líquido."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("anti-vegf", "Inyecciones intravítreas de anti-VEGF lo antes posible", "clave", "Detienen la pérdida visual."),
      mg("amsler-casa", "Rejilla de Amsler en casa para el otro ojo", "clave", "Detección temprana."),
      mg("suplementos", "Suplementos AREDS2 para el ojo con drusas", "util", "Reducen progresión."),
      mg("baja-vision", "Rehabilitación de baja visión", "clave", "Calidad de vida."),
      mg("anteojos", "Solo cambiar anteojos", "riesgoso", "No trata la neovascularización."),
      mg("esperar", "Esperar a ver si mejora sola", "riesgoso", "Pérdida irreversible."),
    ],
  },
  debrief: {
    diagnosis: "Degeneración macular asociada a la edad neovascular en el ojo derecho y forma seca en el izquierdo, en mujer de 77 años.",
    pathologies: [
      { name: "DMAE neovascular", role: "principal", why: "Neovasos coroideos bajo la mácula." },
      { name: "DMAE seca contralateral", role: "asociada", why: "Riesgo de bilateralidad." },
      { name: "Catarata, glaucoma", role: "diferencial", why: "Otras causas de baja visión en ancianos." },
    ],
    reasoning: [
      "Causa: envejecimiento, tabaco y genética.",
      "Mecanismo: el VEGF estimula vasos anómalos que filtran y sangran bajo la mácula.",
      "Consecuencia: pérdida de visión central rápida.",
    ],
    epidemiology:
      "Es la principal causa de ceguera legal en mayores de 65 en países con población envejecida. La forma húmeda es menos frecuente pero responsable de la mayoría de las pérdidas graves. Es una urgencia oftalmológica relativa: el tratamiento temprano preserva visión.",
    management: [
      "Amsler.",
      "OCT urgente.",
      "Anti-VEGF.",
      "Baja visión.",
    ],
    sources: ["Consejo Argentino de Oftalmología — Degeneración macular.", "AAO — Preferred Practice Pattern: Age-Related Macular Degeneration."],
    pearls: ["Líneas torcidas: mácula.", "Derivar rápido.", "Dejar de fumar."],
    pitfalls: ["Atribuirlo a la catarata.", "Esperar."],
    tribunal: [
      qa("¿Qué son las drusas?", "Depósitos amarillentos bajo el epitelio pigmentario, marcadores de DMAE."),
      qa("¿Qué es la rejilla de Amsler?", "Cuadrícula para detectar distorsiones o escotomas centrales."),
      qa("¿Qué fármacos anti-VEGF se usan?", "Ranibizumab, aflibercept y bevacizumab intravítreos."),
    ],
  },
};
