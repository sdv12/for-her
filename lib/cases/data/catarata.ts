import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const catarata: ClinicalCase = {
  id: "catarata-senil",
  level: 1,
  area: "Oftalmología",
  setting: "Consultorio",
  patient: { age: 74, ageUnit: "años", sex: "F", context: "Diabética, tuvo corticoides inhalados por años. Se cayó dos veces. Vive sola." },
  frequency: "muy-frecuente",
  intro: "“Veo cada vez más borroso, como con niebla, y me encandilan las luces. No puedo leer el precio en el súper.”",
  vitals: { TA: "136/78 mmHg", FC: "74 lpm", "T°": "36,5 °C", Peso: "62 kg", Glucemia: "142 mg/dl" },
  anamnesis: [
    act("instalacion", "¿Fue de golpe o de a poco? ¿Duele?", "clave", "“De a poco; no duele.”", "Gradual e indolora."),
    act("campos", "¿Ves manchas, sombras o cortinas?", "clave", "“No.”", "Desprendimiento."),
    act("impacto", "¿Cómo afecta la vida diaria?", "clave", "“Dejé de cocinar, me caigo.”", "Define indicación."),
    act("riesgos", "¿Diabetes, corticoides, tabaco, sol?", "util", "“Diabetes y corticoide inhalado.”", "Factores."),
    act("farmaco", "¿Tomás tamsulosina?", "util", "“No.”", "Iris flácido."),
    act("gato", "¿Cómo se llama tu gato?", "neutro", "“Pelusa.”", "No orienta."),
  ],
  exam: [
    act("agudeza", "Agudeza visual", "clave", "20/100 en ambos ojos, sin mejora con estenopeico.", "Pérdida."),
    act("reflejo", "Reflejo rojo y biomicroscopía", "clave", "Reflejo disminuido; opacidad nuclear bilateral.", "Confirma."),
    act("fondo", "Fondo de ojo dilatado", "util", "Sin retinopatía.", "Previo a cirugía."),
  ],
  studies: [
    study("Otros", "biometria", "Biometría para el lente", "clave", "Medidas estables.", "Programa la cirugía."),
    study("Otros", "tonometria", "Tonometría", "clave", "14 mmHg.", "Excluye glaucoma."),
    study("Laboratorio", "hba1c", "HbA1c", "util", "7,4 %.", "Control."),
    study("Imágenes", "rmn", "RM de cerebro", "innecesario", "No se realizó.", "Sin signos."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("catarata", "Catarata senil bilateral con repercusión funcional", true, "Visión gradual e indolora con opacidad del cristalino."),
      dx("glaucoma", "Glaucoma agudo", false, "Es brusco y doloroso."),
      dx("dmae", "Degeneración macular", false, "Da escotoma central; hay reflejo alterado."),
      dx("retinopatia", "Retinopatía diabética", false, "Fondo sin retinopatía."),
      dx("desprendimiento", "Desprendimiento de retina", false, "No hay miodesopsias ni cortina."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cirugia", "Facoemulsificación con lente intraocular", "clave", "Único tratamiento efectivo."),
      mg("prequirurgico", "Evaluación prequirúrgica y control de glucemia", "clave", "Optimiza el resultado."),
      mg("caidas", "Prevención de caídas", "clave", "Ya se cayó."),
      mg("lentes", "Actualizar anteojos en espera", "util", "Puente."),
      mg("gotas", "Gotas para disolver la catarata", "riesgoso", "No existen con eficacia."),
      mg("esperar", "Esperar hasta que madure", "riesgoso", "Ya compromete su vida."),
    ],
  },
  debrief: {
    diagnosis: "Catarata senil bilateral con baja visión y caídas, en mujer de 74 años diabética.",
    pathologies: [
      { name: "Catarata", role: "principal", why: "Opacidad del cristalino." },
      { name: "Caídas, diabetes", role: "asociada", why: "Consecuencia y factor." },
      { name: "Glaucoma, DMAE, retinopatía", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: envejecimiento y factores metabólicos.",
      "Mecanismo: proteínas del cristalino que se opacan.",
      "Consecuencia: visión borrosa y mayor riesgo de caídas.",
    ],
    epidemiology:
      "Es la principal causa de ceguera tratable en el mundo y es muy frecuente en mayores de 65. La cirugía es de corta duración y cambia la calidad de vida. La mala visión es un factor de caídas y fracturas que suele pasarse por alto.",
    management: [
      "Medir agudeza.",
      "Reflejo rojo.",
      "Indicar cirugía si afecta la vida diaria.",
      "Seguimiento.",
    ],
    sources: ["Consejo Argentino de Oftalmología — Guías sobre catarata.", "American Academy of Ophthalmology — Cataract in the Adult Eye Preferred Practice Pattern."],
    pearls: ["Gradual e indolora.", "No esperar a que madure.", "Revisá visión en quien se cae."],
    pitfalls: ["Solo cambiar los anteojos.", "No mirar el fondo de ojo."],
    tribunal: [
      qa("¿Qué causas de pérdida visual son súbitas?", "Oclusión arterial o venosa de retina, desprendimiento, glaucoma agudo, hemorragia vítrea y neuritis óptica."),
      qa("¿Qué fármacos aceleran la catarata?", "Principalmente los corticoides, sobre todo sistémicos."),
      qa("¿Cuál es la principal complicación tardía?", "La opacidad de la cápsula posterior, tratada con láser YAG."),
    ],
  },
};
