import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const pielonefritisEnfisematosa: ClinicalCase = {
  id: "pielonefritis-enfisematosa-diabetica",
  level: 4,
  area: "Nefrourología",
  setting: "Guardia",
  patient: { age: 63, ageUnit: "años", sex: "F", context: "Diabética mal controlada. Infecciones urinarias repetidas." },
  frequency: "raro",
  intro: "“Tengo fiebre, mucho dolor en la cintura derecha, vómitos y estoy muy débil.”",
  vitals: { TA: "84/50 mmHg", FC: "128 lpm", FR: "28 rpm", "T°": "39,2 °C", "SatO₂": "94 %", Glucemia: "412 mg/dl", Glasgow: "14/15" },
  anamnesis: [
    act("tiempo", "¿Cuánto hace?", "clave", "“Tres días.”", "Progresivo."),
    act("diabetes", "¿Cómo está la diabetes?", "clave", "“Mal, siempre alta.”", "Factor principal."),
    act("obstruccion", "¿Cálculos o problemas para orinar?", "clave", "“Cálculos.”", "Obstrucción."),
    act("atb", "¿Tomaste antibióticos?", "util", "“Ciprofloxacina dos días.”", "Resistencia."),
    act("orina", "¿Orinás?", "util", "“Poco.”", "Shock."),
    act("perro", "¿Vivís sola?", "neutro", "“Con mi esposo.”", "No orienta."),
  ],
  exam: [
    act("lumbar", "Fosa lumbar", "clave", "Dolor intenso derecho; crepitación en flanco.", "Gas."),
    act("perfusion", "Perfusión", "clave", "Fría, relleno de 4 segundos.", "Shock."),
    act("abdomen", "Abdomen", "util", "Sin peritonismo.", "Retroperitoneal."),
  ],
  studies: [
    study("Imágenes", "tc", "TC de abdomen", "clave", "Gas en parénquima renal derecho; cálculo obstructivo.", "Diagnóstico."),
    study("Laboratorio", "lab", "Hemograma, creatinina, lactato, gases, cetonas", "clave", "Lactato 5; creatinina 2,8; plaquetas 80.000.", "Gravedad."),
    study("Microbiología", "cultivos", "Urocultivo y hemocultivos", "clave", "E. coli BLEE.", "Guía."),
    study("Imágenes", "rx-solo", "Solo radiografía y antibiótico oral", "riesgoso", "No se realizó.", "Subestima."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("enfisematosa", "Pielonefritis enfisematosa con shock séptico y obstrucción", true, "Diabética, gas en parénquima, shock."),
      dx("pielo", "Pielonefritis simple", false, "Hay gas y shock."),
      dx("absceso", "Absceso renal", false, "Gas en parénquima."),
      dx("colico", "Cólico renal", false, "Fiebre y gas."),
      dx("cad", "Cetoacidosis aislada", false, "Hay foco renal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("atb", "Carbapenem EV", "clave", "BLEE y gravedad."),
      mg("drenaje", "Drenaje percutáneo o nefrostomía urgente", "clave", "Obstrucción y gas."),
      mg("uti", "Terapia intensiva, volumen, vasopresores, insulina", "clave", "Shock e hiperglucemia."),
      mg("nefrectomia", "Nefrectomía si no responde", "util", "Rescate."),
      mg("oral", "Antibiótico oral y alta", "riesgoso", "Letal."),
      mg("esperar-drenaje", "Esperar a ver si mejora sin drenar", "riesgoso", "Alta mortalidad."),
    ],
  },
  debrief: {
    diagnosis: "Pielonefritis enfisematosa derecha por E. coli BLEE con litiasis obstructiva y shock séptico, en mujer diabética de 63 años.",
    pathologies: [
      { name: "Pielonefritis enfisematosa", role: "principal", why: "Infección necrotizante con gas." },
      { name: "Shock séptico y diabetes", role: "asociada", why: "Gravedad." },
      { name: "Pielonefritis simple, absceso", role: "diferencial", why: "Otras infecciones renales." },
    ],
    reasoning: [
      "Causa: bacterias que fermentan glucosa en el riñón.",
      "Mecanismo: hiperglucemia y obstrucción favorecen gas y necrosis.",
      "Consecuencia: shock y destrucción renal.",
    ],
    epidemiology:
      "Es rara, pero casi siempre ocurre en diabéticos mal controlados. La obstrucción es frecuente. La mortalidad es alta sin drenaje o nefrectomía. Toda pielonefritis grave en diabéticos merece imagen.",
    management: [
      "Imagen.",
      "Antibiótico amplio.",
      "Drenaje.",
      "UTI.",
    ],
    sources: ["Sociedad Argentina de Urología — Infecciones urinarias complicadas.", "European Association of Urology — Urological Infections."],
    pearls: ["Diabético con pielonefritis grave: TC.", "Gas en riñón.", "Drenar."],
    pitfalls: ["Antibiótico oral.", "No drenar."],
    tribunal: [
      qa("¿Qué define ITU complicada?", "Alteración anatómica o funcional, embarazo, varón, diabetes, inmunosupresión o catéter."),
      qa("¿Cuándo pedir imagen en pielonefritis?", "Si no mejora a las 72 horas, hay shock, obstrucción sospechada o diabetes grave."),
      qa("¿Qué es BLEE?", "Betalactamasas de espectro extendido; se trata con carbapenems."),
    ],
  },
};
