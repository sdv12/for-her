import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const abscesoBartholin: ClinicalCase = {
  id: "absceso-glandula-bartholin",
  level: 1,
  area: "Ginecología y obstetricia",
  setting: "Guardia",
  patient: { age: 27, ageUnit: "años", sex: "F", context: "Sana. Pareja estable. No se cuida con preservativo." },
  frequency: "frecuente",
  intro: "“Me salió un bulto en la vulva del lado izquierdo, me duele mucho, no puedo sentarme ni caminar.”",
  vitals: { TA: "116/70 mmHg", FC: "90 lpm", "T°": "37,8 °C", "SatO₂": "99 %" },
  anamnesis: [
    act("evolucion", "¿Desde cuándo y cómo creció?", "clave", "“Tres días, rápido.”", "Absceso."),
    act("previos", "¿Tuviste antes?", "clave", "“Un quiste chico hace un año.”", "Quiste previo."),
    act("its", "¿Flujo, ardor o pareja con síntomas?", "clave", "“No.”", "ITS."),
    act("embarazo", "¿Posible embarazo?", "util", "“No.”", "Manejo."),
    act("diabetes", "¿Diabetes o inmunosupresión?", "util", "“No.”", "Riesgo."),
    act("trabajo", "¿Qué hacés?", "neutro", "“Soy peluquera.”", "No orienta."),
  ],
  exam: [
    act("vulva", "Inspección", "clave", "Masa fluctuante de 4 cm en labio mayor izquierdo, posterior, eritematosa.", "Absceso."),
    act("extension", "Celulitis alrededor", "clave", "Eritema limitado.", "Sin extensión grave."),
    act("especulo", "Especuloscopía", "util", "Sin flujo patológico.", "Excluye cervicitis."),
  ],
  studies: [
    study("Microbiología", "cultivo", "Cultivo del material y PCR para gonococo y clamidia", "clave", "Flora mixta; ITS negativas.", "Guía."),
    study("Laboratorio", "its", "Serologías de ITS", "util", "Negativas.", "Prevención."),
    study("Otros", "biopsia", "Biopsia en mayores de 40", "util", "No corresponde por edad.", "Excluye cáncer."),
    study("Imágenes", "rmn", "RM de pelvis", "innecesario", "No se realizó.", "No aporta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("bartholin", "Absceso de la glándula de Bartholin", true, "Masa fluctuante, dolorosa y posterior en el labio mayor."),
      dx("quiste", "Quiste de Bartholin", false, "No duele ni tiene signos inflamatorios."),
      dx("herpes", "Herpes genital", false, "Da vesículas y úlceras."),
      dx("foliculitis", "Foliculitis", false, "Es superficial y pequeña."),
      dx("cancer", "Cáncer de vulva", false, "Joven y cuadro agudo."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("drenaje", "Drenaje con catéter de Word o marsupialización", "clave", "Previene recurrencias."),
      mg("analgesia", "Analgesia y baños de asiento", "clave", "Alivio."),
      mg("control", "Control en días", "clave", "Seguimiento."),
      mg("atb", "Antibióticos si hay celulitis o ITS", "util", "Selectivo."),
      mg("incision-simple", "Solo incisión y cierre", "riesgoso", "Recurre."),
      mg("escision", "Extirpación de la glándula en el agudo", "riesgoso", "Sangrado; se reserva a recidivas."),
    ],
  },
  debrief: {
    diagnosis: "Absceso de la glándula de Bartholin izquierda, en mujer de 27 años.",
    pathologies: [
      { name: "Absceso de Bartholin", role: "principal", why: "Infección de la glándula." },
      { name: "Quiste previo", role: "asociada", why: "Obstrucción." },
      { name: "Quiste, herpes, cáncer", role: "diferencial", why: "Otras lesiones." },
    ],
    reasoning: [
      "Causa: obstrucción del conducto con infección mixta.",
      "Mecanismo: el moco retenido se infecta.",
      "Consecuencia: dolor intenso y absceso.",
    ],
    epidemiology:
      "Es una consulta frecuente de guardia ginecológica en mujeres en edad reproductiva. La mayoría es por flora mixta y unas pocas por ITS. En mayores de 40, una masa en esa zona requiere biopsia para excluir carcinoma.",
    management: [
      "Drenar.",
      "Catéter de Word.",
      "Analgesia.",
      "ITS si corresponde.",
    ],
    sources: ["FASGO — Patología vulvar benigna.", "Royal College of Obstetricians and Gynaecologists — Bartholin's Cyst and Abscess."],
    pearls: ["Posterior en labio mayor.", "Drenaje con catéter.", "Mayor de 40: biopsia."],
    pitfalls: ["Solo antibióticos.", "Incisión simple."],
    tribunal: [
      qa("¿Dónde se ubican las glándulas de Bartholin?", "A los lados del introito vaginal, en posición posterolateral."),
      qa("¿Qué es la marsupialización?", "Suturar la pared del quiste a la piel para formar una bolsa que drena."),
      qa("¿Qué gérmenes se encuentran?", "Flora mixta, E. coli y anaerobios; menos veces gonococo y clamidia."),
    ],
  },
};
