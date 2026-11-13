import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const meningitisListeriaEmbarazada: ClinicalCase = {
  id: "meningitis-listeria-embarazada",
  level: 4,
  area: "Infectología",
  setting: "Guardia",
  patient: { age: 29, ageUnit: "años", sex: "F", context: "Embarazo de 32 semanas. Hace 10 días comió quesos blandos de una feria." },
  frequency: "raro",
  intro: "“Hace tres días tengo fiebre y dolor de cabeza, y hoy está confundida y le duele la nuca.” (relata el marido)",
  vitals: { TA: "112/68 mmHg", FC: "118 lpm", FR: "22 rpm", "T°": "39,2 °C", "SatO₂": "97 %", Glasgow: "13/15" },
  anamnesis: [
    act("alimentos", "¿Comió quesos frescos, fiambres o lácteos sin pasteurizar?", "clave", "“Quesos de campo de una feria.”", "Fuente de Listeria."),
    act("cefalea", "¿Cómo evolucionó?", "clave", "“Fiebre primero, después dolor de cabeza y ahora confusión.”", "Meningoencefalitis."),
    act("bebe", "¿Cómo se mueve el bebé?", "clave", "“Menos desde ayer.”", "Compromiso fetal."),
    act("diarrea", "¿Tuvo diarrea?", "util", "“Unos días antes.”", "Pródromo digestivo."),
    act("alergia", "¿Es alérgica a la penicilina?", "util", "“No.”", "Elección del antibiótico."),
    act("nombre", "¿Ya tienen nombre para el bebé?", "neutro", "“Martina.”", "No orienta."),
  ],
  exam: [
    act("meningeo", "Signos meníngeos", "clave", "Rigidez de nuca, Brudzinski positivo.", "Meningitis."),
    act("neuro", "Examen neurológico", "clave", "Confusa, paresia del sexto par derecho.", "Romboencefalitis."),
    act("lcf", "Latidos fetales", "util", "Taquicardia fetal de 180.", "Compromiso fetal."),
  ],
  studies: [
    study("Microbiología", "hemocultivos", "Hemocultivos antes del antibiótico", "clave", "Bacilos grampositivos.", "Listeria."),
    study("Laboratorio", "lcr", "Punción lumbar luego de la TC por el foco", "clave", "LCR turbio, 600 células (60 % mononucleares), glucosa baja, Gram con bacilos grampositivos.", "Meningitis por Listeria."),
    study("Imágenes", "tc", "TC de cerebro por el foco neurológico", "util", "Sin efecto de masa.", "Permite punzar."),
    study("Otros", "esperar-pl", "Esperar la punción para empezar el antibiótico", "riesgoso", "No se esperó.", "Retrasa el tratamiento."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("listeria", "Meningoencefalitis por Listeria monocytogenes en el embarazo", true, "Embarazada con quesos sin pasteurizar, fiebre, meningismo, par craneal y bacilos grampositivos."),
      dx("neumococo", "Meningitis neumocócica", false, "Bacilos, no cocos."),
      dx("herpes", "Encefalitis herpética", false, "Gram con bacilos y LCR purulento."),
      dx("eclampsia", "Eclampsia", false, "Presión normal y fiebre."),
      dx("tbc", "Meningitis tuberculosa", false, "Evolución rápida y bacilos grampositivos."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("ampicilina", "Ampicilina EV en dosis altas más gentamicina", "clave", "Las cefalosporinas no cubren Listeria."),
      mg("obstetricia", "Monitoreo fetal y equipo obstétrico y neonatal", "clave", "Riesgo de parto prematuro y sepsis neonatal."),
      mg("uti", "Terapia intensiva", "clave", "Encefalitis."),
      mg("notificar", "Notificar y estudiar el alimento", "util", "Brote."),
      mg("solo-ceftriaxona", "Solo ceftriaxona", "riesgoso", "No cubre Listeria."),
      mg("cesarea-inmediata", "Cesárea inmediata antes de estabilizar", "riesgoso", "La madre inestable no tolera la cirugía; primero tratar."),
    ],
  },
  debrief: {
    diagnosis: "Meningoencefalitis por Listeria monocytogenes con compromiso fetal, en embarazada de 32 semanas.",
    pathologies: [
      { name: "Listeriosis neuroinvasiva", role: "principal", why: "Infección por bacilo grampositivo intracelular." },
      { name: "Infección fetal", role: "asociada", why: "Pasaje transplacentario." },
      { name: "Neumococo, herpes", role: "diferencial", why: "Otras meningoencefalitis." },
    ],
    reasoning: [
      "Causa: quesos blandos o fiambres contaminados con Listeria.",
      "Mecanismo: la inmunidad celular reducida del embarazo permite la diseminación.",
      "Consecuencia: meningoencefalitis materna, aborto, parto prematuro y sepsis neonatal.",
    ],
    epidemiology:
      "Listeria es rara pero mucho más frecuente en embarazadas, recién nacidos, mayores de 50 e inmunodeprimidos. Se asocia a quesos frescos sin pasteurizar y fiambres. La prevención alimentaria es parte del control prenatal.",
    management: [
      "Sospechar en embarazadas.",
      "Ampicilina.",
      "Cuidado fetal.",
      "Notificar.",
    ],
    sources: ["Sociedad Argentina de Infectología — Meningitis bacteriana.", "IDSA — Practice Guidelines for Bacterial Meningitis."],
    pearls: ["Embarazada con fiebre: pensá en Listeria.", "Cefalosporinas no la cubren.", "Quesos sin pasteurizar."],
    pitfalls: ["Solo ceftriaxona.", "Retrasar el antibiótico."],
    tribunal: [
      qa("¿A quiénes se agrega ampicilina en la meningitis empírica?", "A mayores de 50, embarazadas, neonatos e inmunocomprometidos."),
      qa("¿Qué alimentos se evitan en el embarazo?", "Quesos blandos sin pasteurizar, fiambres sin calentar y patés refrigerados."),
      qa("¿Qué es la romboencefalitis?", "Encefalitis del tronco y cerebelo con pares craneales, típica de Listeria."),
    ],
  },
};
