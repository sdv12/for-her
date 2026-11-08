import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const iamAnteriorTabaquista: ClinicalCase = {
  id: "iam-scacest-anterior-tabaquista",
  level: 3,
  area: "Cardiovascular",
  setting: "Guardia",
  patient: { age: 47, ageUnit: "años", sex: "M", context: "Fuma 30 cigarrillos por día. Sobrepeso. Padre muerto de un infarto. Trabaja en una estación de servicio." },
  frequency: "muy-frecuente",
  intro: "“Hace una hora me apretó el pecho, se me fue al brazo izquierdo y a la mandíbula. Estoy mojado de sudor.”",
  vitals: { TA: "134/84 mmHg", FC: "98 lpm", FR: "22 rpm", "T°": "36,4 °C", "SatO₂": "96 %" },
  anamnesis: [
    act("dolor", "¿Cómo es el dolor y cuándo empezó?", "clave", "“Opresivo, hace una hora.”", "Tiempo es músculo."),
    act("contraindicaciones", "¿Cirugías, ACV, sangrados, anticoagulantes?", "clave", "“Nada.”", "Trombólisis."),
    act("cocaina", "¿Drogas, sildenafil?", "clave", "“No.”", "Modifica el manejo."),
    act("diseccion", "¿Dolor que va a la espalda, desgarrante?", "util", "“No.”", "Disección."),
    act("colesterol", "¿Colesterol, diabetes?", "util", "“Nunca me revisé.”", "Riesgo."),
    act("turno", "¿Qué turno hacés?", "neutro", "“El de la tarde.”", "No orienta."),
  ],
  exam: [
    act("cardiaco", "Corazón", "clave", "Sin soplos ni tercer ruido.", "Sin complicaciones."),
    act("pulmon", "Pulmón (Killip)", "clave", "Sin rales: Killip I.", "Pronóstico."),
    act("pulsos", "Pulsos y presión en ambos brazos", "util", "Simétricos.", "Disección."),
  ],
  studies: [
    study("Electrofisiología", "ecg", "ECG en menos de 10 minutos", "clave", "Supradesnivel del ST en V1 a V5.", "SCACEST anterior."),
    study("Laboratorio", "troponina", "Troponina, hemograma, función renal, coagulación", "clave", "Troponina en ascenso.", "No debe demorar."),
    study("Imágenes", "eco", "Ecocardiograma al lado de la cama", "util", "Hipoquinesia anteroapical.", "Función."),
    study("Otros", "esperar", "Esperar una segunda troponina para activar la hemodinamia", "riesgoso", "No se realizó.", "El ECG ya alcanza."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("iam", "Infarto agudo de miocardio con elevación del ST anterior, Killip I", true, "Dolor típico y ST elevado en precordiales."),
      dx("pericarditis", "Pericarditis", false, "Elevación difusa con PR descendido."),
      dx("diseccion", "Disección aórtica", false, "Dolor no transfixiante y pulsos simétricos."),
      dx("tep", "TEP", false, "No hay hipoxemia ni ECG típico."),
      dx("repolarizacion", "Repolarización precoz", false, "Cuadro agudo con dolor."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("aas", "Aspirina y segundo antiagregante", "clave", "Inmediato."),
      mg("reperfusion", "Angioplastia primaria en menos de 120 minutos, o trombólisis si no es posible", "clave", "Reperfusión."),
      mg("prevencion", "Estatina de alta intensidad, betabloqueante, IECA", "clave", "Prevención secundaria."),
      mg("rehab", "Rehabilitación y cesación tabáquica", "clave", "Reduce mortalidad."),
      mg("oxigeno", "Oxígeno aunque la saturación sea normal", "innecesario", "Sin beneficio si está por encima de 90 %."),
      mg("aine", "AINE para el dolor", "riesgoso", "Aumentan los eventos."),
    ],
  },
  debrief: {
    diagnosis: "IAM con elevación del ST anterior por oclusión de la descendente anterior, Killip I, en varón de 47 años.",
    pathologies: [
      { name: "Infarto con ST elevado", role: "principal", why: "Oclusión coronaria." },
      { name: "Tabaquismo", role: "asociada", why: "Factor modificable." },
      { name: "Pericarditis, disección, TEP", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: rotura de placa aterosclerótica.",
      "Mecanismo: trombosis oclusiva.",
      "Consecuencia: necrosis transmural; riesgo de arritmias y falla.",
    ],
    epidemiology:
      "Es una de las principales causas de muerte en Argentina. Sigue habiendo demoras y baja tasa de reperfusión en varias regiones, tal como lo muestran los registros nacionales. El tabaquismo se asocia a infartos en edades más tempranas.",
    management: [
      "ECG temprano.",
      "Reperfusión en la ventana.",
      "Antitrombóticos.",
      "Prevención secundaria.",
    ],
    sources: ["Sociedad Argentina de Cardiología — Consenso de IAM con elevación del ST.", "Federación Argentina de Cardiología — Registro ARGEN-IAM-ST."],
    pearls: ["Tiempo es músculo.", "ST en V1-V5: descendente anterior.", "Oxígeno solo si satura menos de 90 %."],
    pitfalls: ["Esperar la troponina.", "Dejar de lado el tabaco."],
    tribunal: [
      qa("¿Qué territorios y arterias conocés por ECG?", "Anterior V1-V4: descendente anterior. Lateral: circunfleja. Inferior II, III, aVF: coronaria derecha."),
      qa("¿Cuál es la clasificación de Killip?", "I sin falla; II rales o tercer ruido; III edema agudo de pulmón; IV shock cardiogénico."),
      qa("¿Qué mide el tiempo puerta-balón?", "El tiempo desde la llegada a la reperfusión con angioplastia; idealmente menos de 90 minutos."),
    ],
  },
};
