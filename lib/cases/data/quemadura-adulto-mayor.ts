import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const quemaduraAdultoMayor: ClinicalCase = {
  id: "quemadura-adulta-mayor-brasero",
  level: 3,
  area: "Cirugía",
  setting: "Guardia",
  patient: { age: 84, ageUnit: "años", sex: "F", context: "Vive sola, usa un brasero para calefaccionarse. Insuficiencia cardíaca y diabetes. Julio." },
  frequency: "frecuente",
  intro: "La trae el hijo: “Se le prendió la bata con el brasero, la apagó el vecino con una manta.”",
  vitals: { TA: "108/64 mmHg", FC: "112 lpm", FR: "22 rpm", "T°": "36,4 °C", "SatO₂": "93 %", Peso: "60 kg" },
  anamnesis: [
    act("lugar", "¿Fue en un lugar cerrado? ¿Cuánto tiempo?", "clave", "“En la pieza con la puerta cerrada, unos minutos.”", "Riesgo de inhalación y monóxido."),
    act("hora", "¿Hace cuánto pasó?", "clave", "“Hace una hora.”", "Inicio de la reposición."),
    act("enfriamiento", "¿Qué le pusieron?", "clave", "“Pasta dental.”", "Mala práctica popular."),
    act("cardio", "¿Qué medicación toma?", "util", "“Furosemida, enalapril, metformina.”", "Cuidado con el volumen."),
    act("vacuna", "¿Vacuna antitetánica?", "util", "“No sé.”", "Profilaxis."),
    act("nietos", "¿Tiene nietos?", "neutro", "“Cinco.”", "No orienta."),
  ],
  exam: [
    act("superficie", "Superficie y profundidad", "clave", "Quemaduras de espesor parcial profundo y total en brazo derecho completo, tronco anterior y cara anterior del muslo: 22 %.", "Gran quemado."),
    act("via-aerea", "Cara, vía aérea y esputo", "clave", "Sin hollín ni quemaduras faciales, voz normal.", "Sin inhalación aparente."),
    act("circular", "Quemaduras circunferenciales", "util", "Brazo derecho casi circunferencial, pulsos presentes.", "Riesgo de escarotomía."),
  ],
  studies: [
    study("Laboratorio", "cohb", "Carboxihemoglobina, gases, lactato", "clave", "COHb 9 %; lactato 3,2.", "Monóxido en ambiente cerrado."),
    study("Laboratorio", "lab", "Hemograma, ionograma, función renal, glucemia, CPK", "clave", "Hto 46 %; glucemia 240.", "Hemoconcentración e hiperglucemia de estrés."),
    study("Otros", "diuresis", "Sonda vesical con diuresis horaria", "util", "Indicada.", "Guía la reposición."),
    study("Otros", "parkland-sin-ajuste", "Reposición de Parkland a ciegas sin monitorear diuresis", "riesgoso", "No se hizo.", "Sobrecarga en insuficiencia cardíaca."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("gran-quemado", "Quemadura por llama del 22 % de superficie corporal de espesor parcial profundo y total, con intoxicación leve por monóxido, en adulta mayor frágil", true, "22 % de superficie, profundidad mixta, ambiente cerrado y COHb elevada."),
      dx("quemadura-leve", "Quemadura menor manejable en forma ambulatoria", false, "Más del 10 % en mayor de 60 y profunda."),
      dx("inhalatoria", "Lesión inhalatoria grave", false, "Sin hollín, estridor ni quemaduras faciales; vigilar."),
      dx("sepsis", "Sepsis", false, "Es la primera hora."),
      dx("maltrato", "Maltrato", false, "Mecanismo coherente con la escena."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("reposicion", "Ringer lactato guiado por diuresis de 0,5 ml/kg/h", "clave", "Reanimación ajustada por la cardiopatía."),
      mg("oxigeno", "Oxígeno al 100 %", "clave", "Monóxido."),
      mg("derivar", "Derivación a unidad de quemados", "clave", "Criterios de gran quemado."),
      mg("cuidado", "Retirar la pasta, cubrir con apósitos limpios y analgesia", "util", "Cuidado local."),
      mg("hielo", "Aplicar hielo", "riesgoso", "Profundiza la lesión e hipotermia."),
      mg("atb-profilactico", "Antibióticos sistémicos profilácticos", "riesgoso", "Sin beneficio y con resistencia."),
    ],
  },
  debrief: {
    diagnosis: "Quemadura por llama del 22 % de superficie de espesor parcial profundo y total con intoxicación leve por monóxido, en mujer de 84 años con insuficiencia cardíaca.",
    pathologies: [
      { name: "Gran quemado", role: "principal", why: "Superficie y edad." },
      { name: "Monóxido e insuficiencia cardíaca", role: "asociada", why: "Complican la reanimación." },
      { name: "Lesión inhalatoria, quemadura menor", role: "diferencial", why: "Otras clasificaciones." },
    ],
    reasoning: [
      "Causa: llama de un brasero en un ambiente cerrado.",
      "Mecanismo: necrosis de piel con fuga capilar masiva y pérdida de volumen.",
      "Consecuencia: shock por quemadura, infección y alta mortalidad en el anciano.",
    ],
    epidemiology:
      "Los adultos mayores tienen la mayor mortalidad por quemaduras con superficies menores. Los braseros y estufas precarias causan quemaduras e intoxicaciones por monóxido cada invierno. La edad más la superficie predicen la mortalidad.",
    management: [
      "Vía aérea y monóxido.",
      "Superficie.",
      "Reposición guiada.",
      "Unidad de quemados.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de atención inicial del paciente quemado.", "American Burn Association — Advanced Burn Life Support."],
    pearls: ["En ancianos, menos superficie ya es grave.", "Reposición guiada por diuresis.", "Brasero: pensá en monóxido."],
    pitfalls: ["Hielo y pasta.", "Sobrehidratar."],
    tribunal: [
      qa("¿Qué es la fórmula de Parkland?", "4 ml por kg por % de superficie en 24 horas, la mitad en las primeras 8 horas."),
      qa("¿Qué es el índice de Baux?", "Edad más porcentaje de superficie quemada, que estima la mortalidad."),
      qa("¿Cuándo se hace escarotomía?", "En quemaduras circunferenciales profundas con compromiso circulatorio o respiratorio."),
    ],
  },
};
