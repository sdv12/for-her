import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const dengueEmbarazada: ClinicalCase = {
  id: "dengue-embarazada",
  level: 3,
  area: "Infectología",
  setting: "Guardia",
  patient: { age: 27, ageUnit: "años", sex: "F", context: "Embarazo de 30 semanas. Barrio con brote de dengue, en Formosa, en marzo." },
  frequency: "frecuente",
  intro: "“Hace cuatro días tuve fiebre alta, dolor detrás de los ojos y de todo el cuerpo. Hoy bajó la fiebre, pero me duele la panza y vomité tres veces.”",
  vitals: { TA: "98/64 mmHg", FC: "112 lpm", FR: "22 rpm", "T°": "37,2 °C", "SatO₂": "96 %" },
  anamnesis: [
    act("alarma", "¿Dolor abdominal, vómitos, sangrado, somnolencia?", "clave", "“Dolor fuerte, vómitos y sangrado de encías.”", "Signos de alarma, justo en la defervescencia."),
    act("obstetrico", "¿Contracciones, pérdidas, se mueve el bebé?", "clave", "“Se mueve; sin pérdidas.”", "Bienestar materno-fetal."),
    act("aines", "¿Tomaste ibuprofeno o aspirina?", "clave", "“Ibuprofeno ayer.”", "Están contraindicados: riesgo de sangrado."),
    act("contactos", "¿Hay casos en tu casa o barrio?", "util", "“Mi cuñado y vecinos.”", "Contexto epidemiológico."),
    act("previo", "¿Tuviste dengue antes?", "util", "“Hace 3 años.”", "Más riesgo de dengue grave."),
    act("nombre", "¿Sabés el sexo del bebé?", "neutro", "“Una nena.”", "No orienta."),
  ],
  exam: [
    act("perfusion", "Perfusión y ortostatismo", "clave", "Relleno de 3 segundos; caída de presión al sentarse.", "Pérdida de plasma."),
    act("abdomen", "Abdomen, ascitis y hígado", "clave", "Dolor en hipocondrio derecho, hepatomegalia, útero relajado.", "Signos de alarma."),
    act("lazo", "Piel y mucosas", "util", "Petequias y gingivorragia leve.", "Sangrado."),
    act("fcf", "Latidos fetales", "clave", "160 lpm.", "Vigilancia."),
  ],
  studies: [
    study("Laboratorio", "hemo", "Hemograma seriado (hematocrito, plaquetas)", "clave", "Hto 41 %, subió desde 34 %; plaquetas 62.000; leucopenia.", "Hemoconcentración con plaquetas bajas: alarma. El embarazo baja el hematocrito normal."),
    study("Microbiología", "ns1", "NS1, PCR o IgM de dengue, y otros arbovirus", "clave", "NS1 positivo.", "Confirma y notifica."),
    study("Imágenes", "eco", "Ecografía obstétrica y abdominal", "clave", "Feto bien; derrame leve y líquido perivesicular.", "Fuga plasmática."),
    study("Laboratorio", "lab", "Transaminasas, función renal, coagulación", "util", "GOT 180, coagulación normal.", "Compromiso hepático; diferencia de HELLP."),
    study("Otros", "biopsia", "Biopsia hepática por las transaminasas", "riesgoso", "No se realizó.", "Con plaquetas bajas el riesgo de sangrado es alto, y no aporta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("dengue", "Dengue con signos de alarma en embarazo de 30 semanas", true, "Fiebre, signos de alarma en defervescencia, NS1, hemoconcentración y plaquetopenia."),
      dx("hellp", "Síndrome HELLP", false, "No hay HTA ni hemólisis, y NS1 es positivo."),
      dx("lepto", "Leptospirosis", false, "No hay exposición, y NS1 es positivo."),
      dx("colecistitis", "Colecistitis", false, "No explica la plaquetopenia con hemoconcentración."),
      dx("app", "Amenaza de parto pretérmino", false, "Sin contracciones."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("internar", "Internar, con embarazada siempre como grupo de riesgo", "clave", "La embarazada se interna con signos de alarma."),
      mg("cristaloides", "Cristaloides en bolos controlados y reevaluar hematocrito y diuresis", "clave", "Corrige la fuga; evita sobrecarga."),
      mg("paracetamol", "Paracetamol para la fiebre; suspender AINE", "clave", "Los AINE aumentan el sangrado."),
      mg("obstetricia", "Control obstétrico; evitar cesárea o procedimientos en fase crítica si es posible", "clave", "Riesgo de sangrado."),
      mg("notificar", "Notificar y control de foco", "clave", "Evento de notificación."),
      mg("plaquetas", "Transfusión de plaquetas por el valor", "riesgoso", "Solo si hay sangrado significativo o procedimiento."),
    ],
  },
  debrief: {
    diagnosis: "Dengue con signos de alarma en embarazo de 30 semanas, en mujer de 27 años, con dengue previo.",
    pathologies: [
      { name: "Dengue con signos de alarma", role: "principal", why: "Fase crítica con fuga plasmática." },
      { name: "Embarazo de riesgo", role: "asociada", why: "Más riesgo materno y fetal." },
      { name: "HELLP, leptospirosis, colecistitis", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: virus del dengue por Aedes aegypti, con infección secundaria por otro serotipo.",
      "Mecanismo: aumento de la permeabilidad vascular y plaquetopenia en la defervescencia.",
      "Consecuencia: fuga plasmática, shock y sangrado; en embarazo, parto prematuro y hemorragia.",
    ],
    epidemiology:
      "Argentina tuvo sus mayores brotes de dengue en 2023 y 2024, con cientos de miles de casos, principalmente en el centro y norte del país. La embarazada tiene más riesgo de formas graves y debe ser internada ante signos de alarma.",
    management: [
      "Clasificar: sin alarma, con alarma o grave.",
      "Hidratación guiada y control seriado.",
      "Paracetamol, sin AINE.",
      "Notificar y prevenir.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de dengue para el equipo de salud.", "Boletín Epidemiológico Nacional."],
    pearls: ["Peor al bajar la fiebre: fase crítica.", "Hematocrito que sube: fuga.", "Sin AINE."],
    pitfalls: ["Confundir con HELLP o colecistitis.", "No interpretar el hematocrito según el embarazo."],
    tribunal: [
      qa("¿Cuáles son los signos de alarma?", "Dolor abdominal intenso, vómitos persistentes, acumulación de líquidos, sangrado de mucosas, letargo, hepatomegalia y aumento del hematocrito con plaquetas en descenso."),
      qa("¿Cuáles son las fases del dengue?", "Febril (2 a 7 días), crítica (en la defervescencia, 24 a 48 horas) y de recuperación."),
      qa("¿Qué hallazgo diferencia el dengue grave?", "Shock o acumulación de líquidos con distrés, sangrado grave o compromiso grave de órganos."),
    ],
  },
};
