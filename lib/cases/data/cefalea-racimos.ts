import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const cefaleaRacimos: ClinicalCase = {
  id: "cefalea-en-racimos",
  level: 2,
  area: "Neurología",
  setting: "Guardia",
  patient: { age: 36, ageUnit: "años", sex: "M", context: "Fumador. El año pasado tuvo un periodo similar de 6 semanas." },
  frequency: "poco-frecuente",
  intro: "“Me despierta a la noche un dolor atroz detrás del ojo derecho, me lagrimea y se me tapa la nariz. No puedo quedarme quieto.”",
  vitals: { TA: "136/84 mmHg", FC: "92 lpm", "T°": "36,5 °C", "SatO₂": "98 %" },
  anamnesis: [
    act("patron", "¿Cuánto dura y a qué hora?", "clave", "“45 minutos, siempre a la misma hora de la noche.”", "Ritmo circadiano."),
    act("autonomico", "¿Lagrimeo, nariz, párpado?", "clave", "“Lagrimeo y nariz tapada del mismo lado.”", "Síntomas autonómicos."),
    act("conducta", "¿Te acostás o te movés?", "clave", "“Camino, me golpeo la cabeza.”", "Agitación: distinto de migraña."),
    act("alcohol", "¿El alcohol lo dispara?", "util", "“Sí.”", "Gatillo."),
    act("alarma", "¿Fiebre, déficit, peor dolor de la vida de golpe?", "util", "“No.”", "Secundaria."),
    act("deporte", "¿Hacés deporte?", "neutro", "“Fútbol.”", "No orienta."),
  ],
  exam: [
    act("ojo", "Ojo durante el episodio", "clave", "Ptosis, miosis, inyección conjuntival derecha.", "Horner parcial."),
    act("neuro", "Examen neurológico", "clave", "Normal entre episodios.", "Primaria."),
    act("temporal", "Arteria temporal", "util", "Normal.", "Excluye arteritis."),
  ],
  studies: [
    study("Imágenes", "rmn", "RM de cerebro y región selar en primer episodio", "clave", "Normal.", "Excluye secundarias."),
    study("Otros", "diario", "Diario de cefalea", "util", "Episodios diarios en racimo.", "Patrón."),
    study("Laboratorio", "vsg", "VSG", "util", "Normal.", "Arteritis en mayores."),
    study("Otros", "puncion", "Punción lumbar de rutina", "innecesario", "No se realizó.", "No aporta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("racimos", "Cefalea en racimos episódica", true, "Dolor orbitario unilateral breve, nocturno, con autonómicos y agitación."),
      dx("migrana", "Migraña", false, "Dura horas y la persona se queda quieta."),
      dx("trigemino", "Neuralgia del trigémino", false, "Dura segundos, sin autonómicos."),
      dx("glaucoma", "Glaucoma agudo", false, "Recurrente, sin visión alterada."),
      dx("sinusitis", "Sinusitis", false, "Episodios breves recurrentes."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("oxigeno", "Oxígeno al 100 % con máscara de alto flujo", "clave", "Aborta el ataque."),
      mg("triptan", "Sumatriptán subcutáneo", "clave", "Aborta."),
      mg("verapamilo", "Verapamilo preventivo con ECG", "clave", "Previene."),
      mg("puente", "Corticoides como puente al inicio del racimo", "util", "Transición."),
      mg("opioides", "Opioides", "riesgoso", "Poco eficaces y riesgo de dependencia."),
      mg("alcohol", "Seguir con alcohol en el periodo", "riesgoso", "Desencadena."),
    ],
  },
  debrief: {
    diagnosis: "Cefalea en racimos episódica derecha, en varón de 36 años fumador.",
    pathologies: [
      { name: "Cefalea en racimos", role: "principal", why: "Cefalea trigémino-autonómica." },
      { name: "Tabaquismo y alcohol", role: "asociada", why: "Factores." },
      { name: "Migraña, neuralgia, glaucoma", role: "diferencial", why: "Otros dolores." },
    ],
    reasoning: [
      "Causa: disfunción hipotalámica.",
      "Mecanismo: activación del reflejo trigémino-autonómico.",
      "Consecuencia: dolor intenso con signos autonómicos y ritmo circadiano.",
    ],
    epidemiology:
      "Es más frecuente en varones fumadores de 20 a 40 años. Es una de las cefaleas más dolorosas, con riesgo de suicidio en los periodos activos. Muchas personas pasan años con el diagnóstico de sinusitis o migraña.",
    management: [
      "Clínica.",
      "Excluir secundarias.",
      "Oxígeno y triptanes.",
      "Preventivo.",
    ],
    sources: ["Sociedad Neurológica Argentina — Cefaleas trigémino-autonómicas.", "European Academy of Neurology — Cluster Headache Guideline."],
    pearls: ["Inquieto, no quieto.", "Ojo rojo y lagrimeo.", "Oxígeno al 100 %."],
    pitfalls: ["Llamarla sinusitis.", "Opioides."],
    tribunal: [
      qa("¿Cómo diferencias racimos de migraña?", "Racimos: breve, orbitaria, autonómica, agitación, varones. Migraña: horas, náuseas, fotofobia, reposo, mujeres."),
      qa("¿Qué efecto adverso cardíaco tiene el verapamilo?", "Bradicardia y bloqueo AV; se controla con ECG."),
      qa("¿Qué son las cefaleas trigémino-autonómicas?", "Racimos, hemicránea paroxística y SUNCT, con dolor unilateral y síntomas autonómicos."),
    ],
  },
};
