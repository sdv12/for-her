import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const tepSincope: ClinicalCase = {
  id: "tep-sincope",
  level: 4,
  area: "Respiratorio",
  setting: "Guardia",
  patient: { age: 78, ageUnit: "años", sex: "F", context: "Cáncer de mama en tratamiento con tamoxifeno. Vive con el marido. Se desmayó en la cocina." },
  frequency: "frecuente",
  intro: "El marido: “Se cayó redonda. Ya se despertó, pero respira rápido y está pálida.”",
  vitals: { TA: "96/60 mmHg", FC: "118 lpm", FR: "28 rpm", "SatO₂": "88 %", "T°": "36,8 °C" },
  anamnesis: [
    act("sincope", "¿Cómo fue el desmayo?", "clave", "“Estaba parada, se puso pálida y cayó. Se despertó en un minuto, sin convulsionar.”", "Síncope con disnea: pensar en TEP."),
    act("disnea", "¿Le falta el aire desde antes?", "clave", "“Desde hace 3 días, a la mínima.”", "Disnea progresiva."),
    act("pierna", "¿Alguna pierna hinchada?", "clave", "“La izquierda, un poco.”", "TVP de origen."),
    act("tamoxifeno", "¿Qué tratamiento recibe por el cáncer?", "clave", "“Tamoxifeno.”", "Cáncer y tamoxifeno: alto riesgo trombótico."),
    act("dolor", "¿Dolor de pecho?", "util", "“Un poco al respirar.”", "Pleurítico."),
    act("receta", "¿Qué estaba cocinando?", "neutro", "“Ñoquis.”", "No orienta."),
  ],
  exam: [
    act("cardio", "Cardiovascular", "clave", "Taquicardia, R2 reforzado, ingurgitación yugular.", "Sobrecarga del ventrículo derecho."),
    act("pierna-ex", "Miembros inferiores", "clave", "Edema y dolor en pantorrilla izquierda.", "TVP."),
    act("trauma", "Traumatismos por la caída", "util", "Hematoma en la frente, sin otros.", "Evaluar antes de anticoagular."),
  ],
  studies: [
    study("Electrofisiología", "ecg", "ECG", "clave", "Taquicardia sinusal, S1Q3T3, T negativas de V1 a V3.", "Sobrecarga derecha."),
    study("Imágenes", "eco-cardio", "Ecocardiograma a la cabecera", "clave", "Ventrículo derecho dilatado e hipocinético.", "Disfunción derecha."),
    study("Imágenes", "angiotac", "Angiotomografía de tórax", "clave", "Trombos en ambas arterias pulmonares principales; relación VD/VI 1,3.", "Confirma TEP."),
    study("Laboratorio", "troponina-bnp", "Troponina y BNP", "clave", "Ambas elevadas.", "Riesgo intermedio-alto."),
    study("Imágenes", "tac-cerebro", "TC de cerebro por el golpe", "util", "Sin sangrado.", "Antes de anticoagular o trombolizar."),
    study("Laboratorio", "dimero", "Dímero D", "innecesario", "No se pidió.", "Con alta probabilidad se va a la imagen."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("tep-intermedio-alto", "TEP bilateral de riesgo intermedio-alto (submasivo) con síncope", true, "Síncope, hipoxemia, TVP, disfunción del VD y troponina positiva, sin hipotensión sostenida."),
      dx("tep-alto", "TEP de alto riesgo (masivo)", false, "TA 96/60, no menor de 90 sostenida."),
      dx("sincope-arritmico", "Síncope arrítmico", false, "Angiotomografía con TEP."),
      dx("acv", "ACV", false, "Sin foco neurológico."),
      dx("nac", "Neumonía", false, "Sin fiebre ni consolidación."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("hbpm", "Anticoagulación con heparina (HNF si se considera trombólisis)", "clave", "Tratamiento inicial."),
      mg("monitoreo", "Terapia intensiva con monitoreo", "clave", "Puede descompensarse en horas."),
      mg("rescate", "Trombólisis de rescate si se descompensa", "clave", "Reservada para inestabilidad."),
      mg("o2", "Oxígeno", "util", "Hipoxemia."),
      mg("volumen-cauto", "Líquidos con mucha cautela", "util", "El VD dilatado empeora con sobrecarga."),
      mg("trombolisis-ya", "Trombólisis sistémica de rutina sin inestabilidad", "riesgoso", "Riesgo de sangrado cerebral en una mayor de 75."),
      mg("alta", "Anticoagulación oral y alta", "riesgoso", "Riesgo intermedio-alto: requiere internación."),
    ],
  },
  debrief: {
    diagnosis: "TEP bilateral de riesgo intermedio-alto con síncope, asociado a cáncer de mama y tamoxifeno, en una mujer de 78 años.",
    pathologies: [
      { name: "Tromboembolismo de pulmón", role: "principal", why: "Obstrucción arterial pulmonar con disfunción derecha." },
      { name: "TVP, cáncer y tamoxifeno", role: "asociada", why: "Origen y factores de riesgo." },
      { name: "Síncope arrítmico", role: "diferencial", why: "Otra causa de síncope en mayores." },
    ],
    reasoning: [
      "Causa: trombo de la pierna que emboliza a las arterias pulmonares.",
      "Mecanismo: aumento brusco de la poscarga del VD con caída del gasto y síncope.",
      "Consecuencia: riesgo de shock y muerte en las primeras horas.",
    ],
    epidemiology:
      "El TEP aparece en hasta el 17 % de los adultos mayores internados por un primer síncope sin otra causa evidente. El cáncer multiplica por 4 a 7 el riesgo de tromboembolismo y el tamoxifeno lo duplica o triplica.",
    management: [
      "Estratificar con hemodinamia, VD y troponina.",
      "Anticoagulación.",
      "Monitoreo intensivo.",
      "Trombólisis de rescate si se descompensa.",
    ],
    sources: ["Sociedad Argentina de Cardiología — Consenso de tromboembolismo pulmonar.", "ESC — Guidelines on acute pulmonary embolism."],
    pearls: ["Síncope + disnea + taquicardia: pensá TEP.", "VD dilatado + troponina = intermedio-alto.", "Trombólisis solo si hay shock."],
    pitfalls: ["Trombolizar de rutina.", "Mandar a casa."],
    tribunal: [
      qa("¿Cómo se estratifica el riesgo en el TEP?", "Alto riesgo si hay shock o hipotensión sostenida; intermedio según PESI, disfunción del VD y troponina; bajo si nada de eso."),
      qa("¿Qué es el patrón S1Q3T3?", "S profunda en DI, Q y T negativa en DIII; sugiere sobrecarga derecha, aunque es poco sensible."),
      qa("¿Cuándo está indicada la trombólisis en el TEP?", "En el TEP de alto riesgo con shock, y como rescate si un intermedio-alto se descompensa."),
    ],
  },
};
