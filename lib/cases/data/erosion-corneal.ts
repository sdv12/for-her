import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const erosionCorneal: ClinicalCase = {
  id: "erosion-corneal",
  level: 1,
  area: "Oftalmología",
  setting: "Guardia",
  patient: { age: 29, ageUnit: "años", sex: "F", context: "Mamá de un bebé de 8 meses. No usa lentes de contacto." },
  frequency: "muy-frecuente",
  intro: "“Mi hijo me metió el dedo en el ojo. Me arde, lagrimeo y no puedo abrirlo.”",
  vitals: { TA: "116/72 mmHg", FC: "82 lpm" },
  anamnesis: [
    act("mecanismo", "¿Cómo fue exactamente?", "clave", "“Con la uña, hace dos horas.”", "Trauma tangencial: erosión corneal típica."),
    act("vision", "¿Ve bien con ese ojo?", "clave", "“Un poco borroso, por las lágrimas.”", "La agudeza visual es obligatoria en todo ojo."),
    act("cuerpo-extrano", "¿Siente algo adentro? ¿Estaba usando alguna herramienta?", "clave", "“Siento arena, pero fue el dedo.”", "Descarta cuerpo extraño metálico o penetrante."),
    act("lentes", "¿Usa lentes de contacto?", "clave", "“No.”", "Con lentes de contacto cambia el antibiótico por riesgo de Pseudomonas."),
    act("fotofobia", "¿Le molesta la luz?", "util", "“Mucho.”", "Típico."),
    act("bebe", "¿Cómo se llama el bebé?", "neutro", "“Benjamín.”", "No orienta."),
  ],
  exam: [
    act("agudeza", "Agudeza visual con cartel", "clave", "OD 8/10, OI 10/10.", "Leve descenso esperable."),
    act("fluoresceina", "Tinción con fluoresceína y luz azul", "clave", "Defecto epitelial lineal de 3 mm que tiñe verde, fuera del eje visual.", "Confirma la erosión."),
    act("parpado", "Eversión del párpado superior", "clave", "Sin cuerpo extraño.", "Hay que buscarlo siempre."),
    act("seidel", "Prueba de Seidel y pupila", "util", "Negativa, pupila redonda reactiva, cámara formada.", "Descarta perforación."),
  ],
  studies: [
    study("Otros", "fluoresceina-est", "Tinción con fluoresceína", "clave", "Defecto epitelial lineal.", "Diagnóstico."),
    study("Imágenes", "tac-orbita", "TC de órbita", "innecesario", "No se pidió.", "Sin sospecha de cuerpo extraño intraocular."),
    study("Microbiología", "cultivo", "Cultivo corneal", "innecesario", "No se tomó.", "Sin infiltrado ni úlcera."),
    study("Otros", "anestesico-casa", "Dar colirio anestésico para usar en casa", "riesgoso", "No se indicó.", "Retrasa la epitelización y puede causar úlceras."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("erosion", "Erosión corneal traumática", true, "Trauma con uña, dolor, fotofobia y defecto epitelial que tiñe con fluoresceína, sin cuerpo extraño ni perforación."),
      dx("cuerpo-extrano", "Cuerpo extraño corneal", false, "No se encontró cuerpo extraño tras evertir el párpado."),
      dx("ulcera", "Úlcera corneal infecciosa", false, "Trauma reciente, sin infiltrado blanco."),
      dx("glaucoma", "Glaucoma agudo", false, "Pupila normal, sin ojo duro, con trauma claro."),
      dx("conjuntivitis", "Conjuntivitis", false, "Hay defecto epitelial y antecedente traumático."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("atb-topico", "Antibiótico tópico (ungüento o colirio) 3–5 días", "clave", "Previene la infección del defecto."),
      mg("analgesia", "Analgesia oral y ciclopléjico si hay mucho dolor", "clave", "Alivio."),
      mg("control", "Control en 24–48 horas", "clave", "Cicatriza en 1–3 días."),
      mg("alarma", "Volver si empeora la vista o aumenta el dolor", "util", "Signos de úlcera."),
      mg("oclusion", "Oclusión del ojo por días", "innecesario", "No acelera la curación y es incómoda."),
      mg("corticoide", "Colirio con corticoides", "riesgoso", "Favorece infecciones y retrasa la cicatrización."),
    ],
  },
  debrief: {
    diagnosis: "Erosión corneal traumática por uña de un bebé, sin cuerpo extraño ni perforación, en una mujer de 29 años.",
    pathologies: [
      { name: "Erosión corneal", role: "principal", why: "Pérdida del epitelio corneal." },
      { name: "Cuerpo extraño corneal", role: "diferencial", why: "Se busca evertiendo el párpado." },
      { name: "Úlcera corneal", role: "diferencial", why: "Complicación si se infecta." },
    ],
    reasoning: [
      "Causa: trauma tangencial con uña, papel o rama.",
      "Mecanismo: pérdida del epitelio que expone terminaciones nerviosas.",
      "Consecuencia: dolor, lagrimeo y fotofobia; cicatriza en días si no se infecta.",
    ],
    epidemiology:
      "Es una de las consultas oftalmológicas más frecuentes en guardia. Afecta a cualquier edad: padres de bebés, jardineros y usuarios de lentes de contacto. La mayoría cura en 72 horas sin secuelas.",
    management: [
      "Agudeza visual.",
      "Fluoresceína y eversión del párpado.",
      "Antibiótico tópico y analgesia.",
      "Control.",
    ],
    sources: ["Consejo Argentino de Oftalmología — Urgencias oftalmológicas.", "American Academy of Ophthalmology — Corneal abrasion."],
    pearls: ["Todo ojo: agudeza visual primero.", "Siempre evertir el párpado.", "Lentes de contacto: cubrir Pseudomonas."],
    pitfalls: ["Anestésico para la casa.", "Corticoides."],
    tribunal: [
      qa("¿Por qué no se da colirio anestésico para usar en casa?", "Porque es tóxico para el epitelio, retrasa la cicatrización y enmascara una úlcera."),
      qa("¿Qué cambia si el paciente usa lentes de contacto?", "Se cubre Pseudomonas con quinolona o aminoglucósido tópico, no se ocluye y se suspenden los lentes."),
      qa("¿Qué es la prueba de Seidel?", "La aplicación de fluoresceína sobre una posible herida: si el humor acuoso la diluye en un chorro, hay perforación."),
    ],
  },
};
