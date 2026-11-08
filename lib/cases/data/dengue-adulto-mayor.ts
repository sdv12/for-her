import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const dengueAdultoMayor: ClinicalCase = {
  id: "dengue-signos-alarma-adulto-mayor-anticoagulado",
  level: 3,
  area: "Infectología",
  setting: "Guardia",
  patient: { age: 74, ageUnit: "años", sex: "M", context: "Marzo, Santa Fe. Fibrilación auricular, toma acenocumarol. Diabético." },
  frequency: "frecuente",
  intro: "“Tuve fiebre cuatro días. Hoy se me pasó, pero tengo vómitos, me duele la panza y me sangra la nariz.”",
  vitals: { TA: "104/76 mmHg", FC: "92 lpm", FR: "22 rpm", "T°": "36,8 °C", "SatO₂": "96 %", Glucemia: "198 mg/dl" },
  anamnesis: [
    act("dias", "¿Cuántos días de fiebre? ¿Cedió hoy?", "clave", "“Hoy cedió.”", "Fase crítica."),
    act("alarma", "¿Vómitos, dolor abdominal, sangrado, sopor?", "clave", "“Vómitos, dolor y epistaxis.”", "Signos de alarma."),
    act("medicacion", "¿Anticoagulantes, aspirina, ibuprofeno?", "clave", "“Acenocumarol e ibuprofeno.”", "Riesgo de sangrado."),
    act("brote", "¿Hay casos en el barrio?", "util", "“Sí, varios.”", "Epidemiología."),
    act("orina", "¿Orinás?", "util", "“Poco.”", "Perfusión."),
    act("barrio", "¿Dónde vivís?", "neutro", "“Cerca del río.”", "No orienta."),
  ],
  exam: [
    act("perfusion", "Perfusión y presión de pulso", "clave", "Relleno de 3 segundos, presión diferencial de 28.", "Fuga plasmática."),
    act("abdomen", "Abdomen", "clave", "Dolor, hepatomegalia, ascitis leve.", "Alarma."),
    act("sangrado", "Mucosas", "util", "Epistaxis y petequias.", "Sangrado."),
  ],
  studies: [
    study("Laboratorio", "hemograma", "Hemograma seriado", "clave", "Hto 49 % en ascenso; plaquetas 38.000.", "Hemoconcentración."),
    study("Laboratorio", "coag", "RIN, función hepática y renal", "clave", "RIN 4,6; TGO 320; creatinina 1,4.", "Peligro."),
    study("Laboratorio", "ns1", "NS1 o PCR, IgM", "clave", "NS1 positivo.", "Confirma."),
    study("Imágenes", "eco", "Ecografía abdominal y torácica", "util", "Ascitis y derrame.", "Fuga."),
    study("Otros", "medula-osea", "Biopsia de médula por plaquetas", "riesgoso", "No se realizó.", "Sangrado y no hace falta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("dengue", "Dengue con signos de alarma, en fase crítica, en adulto mayor anticoagulado", true, "Defervescencia, vómitos, dolor, Hto en ascenso, plaquetas bajas."),
      dx("lepto", "Leptospirosis", false, "No hay exposición, y NS1 positivo."),
      dx("chik", "Chikungunya", false, "Predomina artritis; NS1 positivo."),
      dx("sepsis", "Sepsis bacteriana", false, "Hay fuga plasmática y NS1."),
      dx("hepatitis", "Hepatitis viral", false, "No explica la fuga."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("internar", "Internar y cristaloides según protocolo", "clave", "Signos de alarma."),
      mg("controles", "Controles frecuentes de signos, diuresis, Hto", "clave", "Fase crítica."),
      mg("anticoag", "Suspender acenocumarol e ibuprofeno; evaluar reversión con hematología", "clave", "RIN alto y sangrado."),
      mg("notificar", "Notificación y control vectorial", "clave", "Salud pública."),
      mg("aines", "Seguir con ibuprofeno para el dolor", "riesgoso", "Aumenta el sangrado."),
      mg("plaquetas-prof", "Transfundir plaquetas solo por número", "riesgoso", "No se recomienda sin sangrado grave."),
    ],
  },
  debrief: {
    diagnosis: "Dengue con signos de alarma en fase crítica, con sobreanticoagulación, en varón de 74 años.",
    pathologies: [
      { name: "Dengue con signos de alarma", role: "principal", why: "Fuga plasmática." },
      { name: "Sobreanticoagulación, ibuprofeno", role: "asociada", why: "Riesgo hemorrágico." },
      { name: "Leptospirosis, sepsis", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: virus dengue por Aedes aegypti.",
      "Mecanismo: disfunción endotelial con fuga en la defervescencia.",
      "Consecuencia: shock, sangrado y daño orgánico.",
    ],
    epidemiology:
      "Argentina tuvo brotes sin precedentes en 2023 y 2024, incluso en zonas templadas. Los adultos mayores, las personas con comorbilidades y las que toman anticoagulantes tienen más riesgo. La fase crítica coincide con la caída de la fiebre, por lo que la mejoría aparente puede engañar.",
    management: [
      "Identificar alarma.",
      "Cristaloides.",
      "Sin AINE.",
      "Revisar anticoagulación.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de dengue.", "Organización Panamericana de la Salud — Directrices de dengue."],
    pearls: ["Cuando baja la fiebre, ojo.", "Sin AINE.", "Hto y plaquetas seriados."],
    pitfalls: ["Alta con signos de alarma.", "No revisar la medicación."],
    tribunal: [
      qa("¿Qué signos de alarma tiene el dengue?", "Dolor abdominal, vómitos persistentes, acumulación de líquidos, sangrado, somnolencia, hepatomegalia y Hto en ascenso con plaquetas en descenso."),
      qa("¿Cuáles son las fases del dengue?", "Febril, crítica y de recuperación."),
      qa("¿Qué vacuna contra el dengue hay en Argentina?", "La TAK-003, tetravalente y de virus atenuados, aprobada para mayores de 4 años."),
    ],
  },
};
