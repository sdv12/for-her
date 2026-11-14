import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const embarazoGemelar: ClinicalCase = {
  id: "embarazo-gemelar-monocorial",
  level: 3,
  area: "Ginecología y obstetricia",
  setting: "Consultorio",
  patient: { age: 30, ageUnit: "años", sex: "F", context: "Embarazo gemelar de 20 semanas. Primer embarazo." },
  frequency: "poco-frecuente",
  intro: "“En la ecografía me dijeron que uno de los bebés tiene poco líquido y el otro mucho. Siento la panza muy tensa.”",
  vitals: { TA: "118/72 mmHg", FC: "88 lpm", "T°": "36,6 °C", Peso: "72 kg" },
  anamnesis: [
    act("corionicidad", "¿Te dijeron si comparten placenta?", "clave", "“En la ecografía de las 12 semanas dijeron que sí.”", "Monocorial."),
    act("panza", "¿Cómo creció la panza?", "clave", "“De golpe en dos semanas.”", "Polihidramnios."),
    act("contracciones", "¿Contracciones o pérdida de líquido?", "clave", "“Endurecimientos.”", "Riesgo de prematurez."),
    act("disnea", "¿Falta de aire?", "util", "“Un poco.”", "Sobredistensión."),
    act("controles", "¿Cada cuánto te controlan?", "util", "“Cada mes.”", "Insuficiente en monocorial."),
    act("nombres", "¿Ya tienen nombres?", "neutro", "“Ema y Luz.”", "No orienta."),
  ],
  exam: [
    act("altura", "Altura uterina", "clave", "Muy aumentada para 20 semanas.", "Polihidramnios."),
    act("cuello", "Cuello uterino", "clave", "Cerrado.", "Sin modificaciones."),
    act("ta", "Presión", "util", "Normal.", "Sin preeclampsia."),
  ],
  studies: [
    study("Imágenes", "eco", "Ecografía con doppler y líquido de cada saco", "clave", "Gemelo donante con oligoamnios (bolsillo 1 cm) y vejiga no visible; receptor con polihidramnios (bolsillo 10 cm).", "Transfusión feto-fetal."),
    study("Imágenes", "cervicometria", "Cervicometría", "clave", "Cuello de 28 mm.", "Riesgo de parto prematuro."),
    study("Imágenes", "eco-cardio", "Ecocardiografía fetal del receptor", "util", "Sobrecarga leve.", "Estadio."),
    study("Otros", "esperar-mes", "Control en un mes", "riesgoso", "No se hizo.", "Progresa en días."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("stff", "Síndrome de transfusión feto-fetal en embarazo gemelar monocorial biamniótico", true, "Monocorial con oligoamnios en un gemelo y polihidramnios en el otro y vejiga del donante no visible."),
      dx("rciu-selectivo", "Restricción selectiva de un gemelo", false, "La discordancia es de líquido con vejiga ausente."),
      dx("rpm", "Rotura de membranas de un saco", false, "Polihidramnios en el otro."),
      dx("bicorial", "Discordancia en gemelar bicorial", false, "Es monocorial."),
      dx("malformacion", "Malformación renal del donante", false, "Hay polihidramnios en el receptor."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("laser", "Derivar a centro de medicina fetal para fotocoagulación láser", "clave", "Tratamiento de elección entre 16 y 26 semanas."),
      mg("controles", "Ecografías cada 2 semanas desde las 16 en todo monocorial", "clave", "Detección temprana."),
      mg("prematurez", "Vigilar parto prematuro", "clave", "Riesgo alto."),
      mg("explicar", "Explicar pronóstico y opciones", "util", "Decisión informada."),
      mg("reposo", "Solo reposo en cama", "riesgoso", "No trata y tiene riesgos."),
      mg("amniodrenaje-solo", "Solo amniodrenajes repetidos", "riesgoso", "Inferior al láser."),
    ],
  },
  debrief: {
    diagnosis: "Síndrome de transfusión feto-fetal en embarazo gemelar monocorial biamniótico de 20 semanas.",
    pathologies: [
      { name: "Transfusión feto-fetal", role: "principal", why: "Desequilibrio de anastomosis placentarias." },
      { name: "Riesgo de parto prematuro", role: "asociada", why: "Polihidramnios." },
      { name: "Restricción selectiva, RPM", role: "diferencial", why: "Otras discordancias." },
    ],
    reasoning: [
      "Causa: anastomosis vasculares en una placenta compartida.",
      "Mecanismo: un gemelo transfunde sangre al otro.",
      "Consecuencia: donante hipovolémico con oligoamnios y receptor con sobrecarga y polihidramnios.",
    ],
    epidemiology:
      "Afecta a 10 a 15 % de los embarazos gemelares monocoriales. Sin tratamiento la mortalidad es muy alta. La corionicidad se define mejor en la ecografía del primer trimestre.",
    management: [
      "Corionicidad temprana.",
      "Ecografías cada 2 semanas.",
      "Láser.",
      "Prematurez.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de embarazo múltiple.", "ISUOG — Practice Guidelines: Role of Ultrasound in Twin Pregnancy."],
    pearls: ["Monocorial: control cada 2 semanas.", "Oligo y poli: transfusión.", "Láser."],
    pitfalls: ["Controles mensuales.", "Solo reposo."],
    tribunal: [
      qa("¿Qué es el signo lambda y el signo T?", "Lambda indica bicorial; T indica monocorial en la ecografía del primer trimestre."),
      qa("¿Qué es la clasificación de Quintero?", "Estadios del síndrome de transfusión según líquido, vejiga, doppler, hidrops y muerte."),
      qa("¿Qué riesgos tiene todo embarazo gemelar?", "Prematurez, preeclampsia, diabetes gestacional, restricción y hemorragia posparto."),
    ],
  },
};
