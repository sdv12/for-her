import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const tecNino: ClinicalCase = {
  id: "tec-leve-nino",
  level: 2,
  area: "Pediatría",
  setting: "Guardia",
  patient: { age: 4, ageUnit: "años", sex: "M", context: "Lo trae el padre. Se cayó de una silla a piso de cerámica hace 2 horas." },
  frequency: "muy-frecuente",
  intro: "“Lloró enseguida, vomitó una vez y le salió un chichón. Ahora está jugando, pero estoy asustado.”",
  vitals: { FC: "102 lpm", FR: "22 rpm", "T°": "36,6 °C", "SatO₂": "99 %", Peso: "18 kg", Glasgow: "15/15" },
  anamnesis: [
    act("mecanismo", "¿De qué altura cayó? ¿Cuándo?", "clave", "“De una silla, medio metro, hace 2 horas.”", "Bajo riesgo de mecanismo."),
    act("alarma", "¿Se desmayó? ¿Convulsiones? ¿Dolor de cabeza?", "clave", "“Sin desmayo. Vomitó una vez.”", "Criterios de PECARN."),
    act("relato", "¿Coincide? ¿Quién estaba?", "clave", "“Lo vi yo; se trepó.”", "Excluye maltrato."),
    act("coag", "¿Trastornos de sangrado? ¿Medicación?", "util", "“No.”", "Riesgo."),
    act("conducta", "¿Se comporta como siempre?", "util", "“Sí.”", "Tranquiliza."),
    act("juguete", "¿A qué estaba jugando?", "neutro", "“A los bloques.”", "No orienta."),
  ],
  exam: [
    act("neuro", "Glasgow, pupilas, tono", "clave", "Normal.", "Sin foco."),
    act("cabeza", "Cráneo", "clave", "Hematoma frontal, sin hundimiento, sin signos de fractura de base.", "Bajo riesgo."),
    act("general", "Piel y otras lesiones", "util", "Sin lesiones en distintos estadios.", "Excluye maltrato."),
  ],
  studies: [
    study("Otros", "observar", "Observación clínica por 4 a 6 horas", "clave", "Sin cambios.", "Alternativa segura a TC."),
    study("Otros", "pecarn", "Aplicar PECARN", "clave", "Bajo riesgo.", "Decide TC."),
    study("Imágenes", "tc", "TC de cerebro de rutina", "innecesario", "No se realizó.", "Radiación innecesaria."),
    study("Imágenes", "rx", "Radiografía de cráneo", "innecesario", "No se realizó.", "No cambia la conducta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("tec", "Traumatismo craneoencefálico leve de bajo riesgo", true, "Glasgow 15, examen normal, mecanismo leve, un vómito."),
      dx("hematoma", "Hematoma epidural", false, "Sin deterioro ni foco."),
      dx("fractura", "Fractura de base", false, "Sin signos."),
      dx("maltrato", "Maltrato", false, "Relato coherente y sin otras lesiones. Se evalúa siempre."),
      dx("conmocion-grave", "TEC grave", false, "Glasgow 15."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("observar", "Observar en guardia y dar el alta si está estable", "clave", "Evita radiación."),
      mg("pautas", "Pautas de alarma escritas", "clave", "Si vomita, duerme mucho, convulsiona o cambia."),
      mg("paracetamol", "Paracetamol para el dolor", "clave", "Seguro."),
      mg("prevencion", "Prevención de caídas", "util", "Evita recurrencias."),
      mg("sedar", "Dar sedantes para que duerma", "riesgoso", "Enmascara signos."),
      mg("tc-todos", "TC a todo TEC para tranquilizar", "innecesario", "Radiación y riesgo."),
    ],
  },
  debrief: {
    diagnosis: "Traumatismo craneoencefálico leve de bajo riesgo según PECARN, en niño de 4 años.",
    pathologies: [
      { name: "Traumatismo craneoencefálico leve", role: "principal", why: "Cuadro." },
      { name: "Riesgo de lesión intracraneal bajo", role: "asociada", why: "Se observa." },
      { name: "Epidural, fractura, maltrato", role: "diferencial", why: "Se buscan." },
    ],
    reasoning: [
      "Causa: caída de baja altura.",
      "Mecanismo: el impacto directo provoca un hematoma, sin lesión cerebral.",
      "Consecuencia: síntomas leves y transitorios.",
    ],
    epidemiology:
      "El TEC es una de las consultas pediátricas más frecuentes en guardia. La mayoría son leves, por caídas en casa. Menos del 1 % de los niños de bajo riesgo tiene lesiones importantes, por eso reglas como PECARN evitan muchas tomografías.",
    management: [
      "Aplicar PECARN.",
      "Observar.",
      "Pautas por escrito.",
      "Pensar en maltrato si no coincide.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Traumatismo de cráneo.", "PECARN — Regla de decisión pediátrica."],
    pearls: ["Glasgow 15, examen normal: se observa.", "PECARN.", "Pensá siempre en maltrato."],
    pitfalls: ["TC por presión.", "No dar pautas."],
    tribunal: [
      qa("¿Qué criterios da PECARN en mayores de 2 años?", "Alteración mental, signos de fractura de base, vómitos, pérdida de conciencia, mecanismo grave, cefalea intensa."),
      qa("¿Qué signos hacen pensar en fractura de base?", "Ojos de mapache, signo de Battle, salida de líquido por nariz u oído."),
      qa("¿Qué es el intervalo lúcido?", "Período de mejoría antes del deterioro, en el hematoma epidural."),
    ],
  },
};
