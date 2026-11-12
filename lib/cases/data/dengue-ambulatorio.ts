import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const dengueAmbulatorio: ClinicalCase = {
  id: "dengue-sin-signos-alarma-ambulatorio",
  level: 1,
  area: "Infectología",
  setting: "CAPS",
  patient: { age: 30, ageUnit: "años", sex: "M", context: "Marzo, Córdoba capital. Hay brote en el barrio. Sano." },
  frequency: "muy-frecuente",
  intro: "“Hace dos días tengo fiebre alta, me duelen los ojos, los músculos y los huesos.”",
  vitals: { TA: "118/76 mmHg", FC: "96 lpm", FR: "16 rpm", "T°": "38,9 °C" },
  anamnesis: [
    act("dias", "¿Cuántos días de fiebre?", "clave", "“Dos.”", "Fase febril."),
    act("alarma", "¿Vómitos, dolor de panza, sangrado, mareo?", "clave", "“No.”", "Sin alarma."),
    act("riesgo", "¿Embarazo, enfermedades, edad, vive solo?", "clave", "“No, vivo con mi pareja.”", "Grupo de manejo ambulatorio."),
    act("medicacion", "¿Qué tomaste?", "util", "“Ibuprofeno.”", "Riesgo."),
    act("brote", "¿Hay casos cerca?", "util", "“Varios vecinos.”", "Epidemiología."),
    act("club", "¿De qué club sos?", "neutro", "“De Belgrano.”", "No orienta."),
  ],
  exam: [
    act("torniquete", "Prueba del lazo", "clave", "Negativa.", "Fragilidad."),
    act("perfusion", "Perfusión, hígado, derrames", "clave", "Normal, sin hepatomegalia.", "Sin alarma."),
    act("piel", "Piel", "util", "Exantema leve.", "Típico."),
  ],
  studies: [
    study("Laboratorio", "ns1", "NS1", "clave", "Positivo.", "Confirma."),
    study("Laboratorio", "hemograma", "Hemograma basal", "clave", "Hto 42; plaquetas 160.000; leucocitos 3.200.", "Base."),
    study("Otros", "plan", "Plan de control diario y pautas", "clave", "Entregado.", "Fase crítica."),
    study("Imágenes", "eco", "Ecografía abdominal de rutina", "innecesario", "No se realizó.", "Sin alarma."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("dengue", "Dengue sin signos de alarma (grupo A)", true, "Fiebre, mialgias, dolor retroocular, NS1 positivo y sin alarma."),
      dx("influenza", "Influenza", false, "NS1 positivo."),
      dx("chikungunya", "Chikungunya", false, "Predomina artritis."),
      dx("lepto", "Leptospirosis", false, "Sin exposición."),
      dx("zika", "Zika", false, "NS1 de dengue."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("paracetamol", "Paracetamol y abundante hidratación oral", "clave", "Tratamiento."),
      mg("sin-aines", "Suspender ibuprofeno y evitar AINE", "clave", "Riesgo de sangrado."),
      mg("control", "Control diario hasta 48 horas sin fiebre", "clave", "Fase crítica."),
      mg("mosquitero", "Evitar picaduras (repelente, mosquitero)", "util", "Corta la transmisión."),
      mg("aines-mg", "Seguir con ibuprofeno", "riesgoso", "Sangrado."),
      mg("corticoides", "Corticoides", "riesgoso", "Sin beneficio."),
    ],
  },
  debrief: {
    diagnosis: "Dengue sin signos de alarma, grupo A, en varón de 30 años.",
    pathologies: [
      { name: "Dengue", role: "principal", why: "Arbovirosis." },
      { name: "Uso de AINE", role: "asociada", why: "Riesgo." },
      { name: "Influenza, chikungunya", role: "diferencial", why: "Otras fiebres." },
    ],
    reasoning: [
      "Causa: virus dengue por Aedes aegypti.",
      "Mecanismo: viremia con respuesta inflamatoria.",
      "Consecuencia: fiebre, dolor y riesgo en la defervescencia.",
    ],
    epidemiology:
      "Argentina tuvo brotes récord en 2023 y 2024, con transmisión en Córdoba y el centro del país. La mayoría de los casos se maneja de forma ambulatoria. El control diario permite detectar signos de alarma a tiempo.",
    management: [
      "Clasificar.",
      "Paracetamol e hidratación.",
      "Sin AINE.",
      "Control diario.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de dengue.", "OPS — Dengue: guías para la atención."],
    pearls: ["Sin AINE.", "Control diario.", "Mosquitero."],
    pitfalls: ["Dar ibuprofeno.", "No dar pautas."],
    tribunal: [
      qa("¿Cuáles son los grupos de manejo?", "A ambulatorio, B con riesgo o alarma para internar, C grave."),
      qa("¿Qué es la prueba del lazo?", "Inflar el manguito y contar petequias; mide fragilidad capilar."),
      qa("¿Cuándo se pide IgM?", "A partir del quinto día de síntomas."),
    ],
  },
};
