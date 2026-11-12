import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const htaAnticonceptivos: ClinicalCase = {
  id: "hipertension-anticonceptivos-orales",
  level: 1,
  area: "Cardiovascular",
  setting: "Consultorio",
  patient: { age: 34, ageUnit: "años", sex: "F", context: "Toma anticonceptivos combinados hace 8 años. Fuma. Migraña." },
  frequency: "frecuente",
  intro: "“En la farmacia me dio la presión alta varias veces. Tengo dolores de cabeza.”",
  vitals: { TA: "148/96 mmHg", FC: "78 lpm", "T°": "36,5 °C", Peso: "68 kg" },
  anamnesis: [
    act("anticonceptivo", "¿Qué método usás?", "clave", "“Pastillas combinadas.”", "Causa."),
    act("migrana", "¿Migraña con aura?", "clave", "“A veces veo luces antes.”", "Contraindicación absoluta."),
    act("tabaco", "¿Fumás?", "clave", "“Diez por día.”", "Riesgo."),
    act("otros", "¿Sal, descongestivos, regaliz?", "util", "“No.”", "Otras."),
    act("familia", "¿HTA familiar?", "util", "“Mi mamá.”", "Riesgo."),
    act("trabajo", "¿Qué hacés?", "neutro", "“Soy diseñadora.”", "No orienta."),
  ],
  exam: [
    act("presion", "Presión en ambos brazos con técnica correcta", "clave", "148/96 y 146/94.", "Confirma."),
    act("organo", "Fondo de ojo y corazón", "clave", "Normales.", "Sin daño."),
    act("pulsos", "Pulsos femorales", "util", "Normales.", "Excluye coartación."),
  ],
  studies: [
    study("Otros", "mapa", "Monitoreo domiciliario o MAPA", "clave", "Promedio 142/92.", "Confirma."),
    study("Laboratorio", "lab", "Creatinina, potasio, orina, glucemia, lípidos", "clave", "Normales.", "Daño y secundarias."),
    study("Electrofisiología", "ecg", "ECG", "util", "Normal.", "Base."),
    study("Imágenes", "angio", "Angiografía renal de rutina", "innecesario", "No se realizó.", "Hay causa clara."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hta-aco", "Hipertensión arterial asociada a anticonceptivos combinados, en fumadora con migraña con aura", true, "Presión alta confirmada, estrógenos, tabaco y aura."),
      dx("esencial", "HTA esencial", false, "Hay un factor causal."),
      dx("guardapolvo", "Guardapolvo blanco", false, "Confirmada fuera."),
      dx("hiperaldo", "Hiperaldosteronismo", false, "Potasio normal y causa clara."),
      dx("coartacion", "Coartación", false, "Pulsos normales."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("suspender", "Suspender estrógenos y ofrecer método sin estrógenos (DIU, implante)", "clave", "Revierte y reduce riesgo de ACV."),
      mg("tabaco", "Dejar de fumar", "clave", "Riesgo."),
      mg("control", "Controlar la presión en 3 meses", "clave", "Suele normalizarse."),
      mg("habitos", "Sal, actividad, peso", "util", "Prevención."),
      mg("seguir-aco", "Seguir con el anticonceptivo y agregar enalapril", "riesgoso", "Riesgo de ACV con aura y tabaco."),
      mg("sin-metodo", "Suspender sin ofrecer otro método", "riesgoso", "Embarazo no planificado."),
    ],
  },
  debrief: {
    diagnosis: "Hipertensión arterial asociada a anticonceptivos combinados, en mujer de 34 años fumadora con migraña con aura.",
    pathologies: [
      { name: "HTA por anticonceptivos", role: "principal", why: "Causa secundaria reversible." },
      { name: "Migraña con aura y tabaco", role: "asociada", why: "Riesgo de ACV." },
      { name: "HTA esencial, hiperaldosteronismo", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: estrógenos.",
      "Mecanismo: aumento de angiotensinógeno.",
      "Consecuencia: presión alta y riesgo trombótico.",
    ],
    epidemiology:
      "Los anticonceptivos combinados pueden elevar la presión en una proporción de usuarias. La migraña con aura, el tabaco después de los 35 y la HTA son contraindicaciones según los criterios de la OMS. Los métodos sin estrógenos son una buena alternativa.",
    management: [
      "Confirmar.",
      "Suspender estrógenos.",
      "Otro método.",
      "Control.",
    ],
    sources: ["Ministerio de Salud de la Nación — Métodos anticonceptivos: guía práctica.", "OMS — Criterios médicos de elegibilidad para el uso de anticonceptivos."],
    pearls: ["Migraña con aura: sin estrógenos.", "Ofrecer otro método.", "Suele revertir."],
    pitfalls: ["Seguir con estrógenos.", "Dejar sin método."],
    tribunal: [
      qa("¿Qué contraindicaciones absolutas tienen los estrógenos?", "Trombosis previa, migraña con aura, HTA no controlada, tabaco después de los 35 y cáncer de mama."),
      qa("¿Qué categorías tienen los criterios de la OMS?", "Del 1 (sin restricción) al 4 (riesgo inaceptable)."),
      qa("¿Qué métodos no tienen estrógenos?", "DIU de cobre u hormonal, implante, píldora de progestágeno e inyectable trimestral."),
    ],
  },
};
