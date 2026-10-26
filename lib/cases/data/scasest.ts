import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const scasest: ClinicalCase = {
  id: "iam-sin-elevacion-st",
  level: 3,
  area: "Cardiovascular",
  setting: "Guardia",
  patient: { age: 64, ageUnit: "años", sex: "M", context: "Diabético e hipertenso. Ex fumador." },
  frequency: "frecuente",
  intro: "“Hace dos horas, mirando la tele, me agarró una opresión en el pecho que me fue al brazo izquierdo. Duró media hora y se me pasó un poco, pero sigo molesto.”",
  vitals: { TA: "148/88 mmHg", FC: "88 lpm", FR: "18 rpm", "SatO₂": "96 %" },
  anamnesis: [
    act("dolor", "¿Cómo es el dolor? ¿Le pasó antes?", "clave", "“Opresivo, como un peso. La última semana me pasó al caminar, cada vez con menos esfuerzo.”", "Angina de reposo prolongada tras una angina progresiva (in crescendo): síndrome coronario agudo."),
    act("riesgo", "¿Qué enfermedades tiene? ¿Colesterol, familia?", "clave", "“Diabetes, presión y colesterol alto. Mi papá murió de un infarto.”", "Múltiples factores de riesgo aumentan la probabilidad."),
    act("sangrado", "¿Tuvo sangrados, úlceras o cirugías recientes?", "clave", "“No.”", "Necesario antes de antiagregar y anticoagular."),
    act("medicacion", "¿Qué toma?", "util", "“Metformina, enalapril y atorvastatina.”", "Orienta el tratamiento."),
    act("diseccion", "¿El dolor fue desgarrante hacia la espalda?", "util", "“No.”", "Descarta disección aórtica, que contraindicaría los antitrombóticos."),
    act("nietos", "¿Tiene nietos?", "neutro", "“Tres.”", "No orienta."),
  ],
  exam: [
    act("ic", "Signos de insuficiencia cardíaca (crepitantes, tercer ruido, yugulares)", "clave", "Sin crepitantes, sin R3, yugulares normales.", "Killip I: sin insuficiencia cardíaca."),
    act("pulsos", "Pulsos y presión en ambos brazos", "util", "Simétricos.", "Descarta disección."),
    act("soplos", "Auscultación cardíaca", "util", "Sin soplos.", "Un soplo nuevo sugeriría complicación mecánica."),
  ],
  studies: [
    study("Electrofisiología", "ecg", "Electrocardiograma en los primeros 10 minutos", "clave", "Infradesnivel del ST de 1,5 mm en V4–V6, DI y aVL, sin supradesnivel.", "Sin supradesnivel: SCA sin elevación del ST. El infradesnivel indica alto riesgo."),
    study("Laboratorio", "troponina", "Troponina ultrasensible seriada (0 y 1–3 h)", "clave", "Elevada y en ascenso.", "La subida de troponina con clínica isquémica define infarto sin elevación del ST."),
    study("Imágenes", "eco", "Ecocardiograma", "util", "Hipocinesia lateral, fracción de eyección 50 %.", "Evalúa la función ventricular y complicaciones."),
    study("Laboratorio", "lab", "Hemograma, función renal, glucemia, coagulograma", "util", "Normales; creatinina 1,0.", "Necesarios para antitrombóticos y contraste."),
    study("Otros", "ergometria", "Ergometría para confirmar", "riesgoso", "No se realizó.", "Está contraindicada en un síndrome coronario agudo en curso."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("iamsest", "Infarto agudo de miocardio sin elevación del ST de alto riesgo", true, "Angina de reposo con infradesnivel del ST y troponina en ascenso, en un diabético con múltiples factores de riesgo."),
      dx("iamcest", "Infarto con elevación del ST", false, "No hay supradesnivel persistente del ST."),
      dx("inestable", "Angina inestable", false, "En la angina inestable la troponina es normal; acá está elevada."),
      dx("pericarditis", "Pericarditis", false, "Dolor punzante que cambia con la posición y supradesnivel difuso del ST."),
      dx("diseccion", "Disección aórtica", false, "Dolor desgarrante a la espalda con asimetría de pulsos."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("daap", "Aspirina más un inhibidor P2Y12 (clopidogrel o ticagrelor)", "clave", "La doble antiagregación reduce el reinfarto y la muerte."),
      mg("anticoag", "Anticoagulación (enoxaparina o heparina no fraccionada)", "clave", "Parte del tratamiento inicial."),
      mg("cate", "Estrategia invasiva temprana: cinecoronariografía dentro de las 24 h", "clave", "En alto riesgo (troponina positiva, cambios del ST, puntaje GRACE alto) mejora el pronóstico."),
      mg("adyuvantes", "Nitratos si hay dolor, betabloqueante si no hay insuficiencia cardíaca, estatina en dosis altas", "util", "Reducen la isquemia y los eventos."),
      mg("trombolisis", "Trombólisis", "riesgoso", "No tiene beneficio en el SCA sin elevación del ST y aumenta el sangrado."),
      mg("alta", "Alta con control ambulatorio porque el dolor cedió", "riesgoso", "Un infarto en curso sin tratamiento tiene alto riesgo de muerte o reinfarto."),
    ],
  },
  debrief: {
    diagnosis: "Infarto agudo de miocardio sin elevación del ST, de alto riesgo, en diabético de 64 años, Killip I.",
    pathologies: [
      { name: "IAM sin elevación del ST", role: "principal", why: "Isquemia con troponina en ascenso y sin supradesnivel." },
      { name: "Enfermedad coronaria aterosclerótica", role: "asociada", why: "Sustrato." },
      { name: "IAM con elevación del ST y angina inestable", role: "diferencial", why: "Se distinguen por ECG y troponina." },
      { name: "Disección aórtica y pericarditis", role: "diferencial", why: "Otras causas de dolor torácico." },
    ],
    reasoning: [
      "Causa: una placa aterosclerótica coronaria se fisura o erosiona.",
      "Mecanismo: se forma un trombo rico en plaquetas que reduce el flujo sin ocluir del todo la arteria (o la ocluye de forma transitoria).",
      "Consecuencia: isquemia subendocárdica (infradesnivel del ST) con necrosis (troponina), sin la oclusión total que da supradesnivel.",
      "Por eso el tratamiento se centra en antiagregar, anticoagular y revascularizar; la trombólisis no sirve sin oclusión total.",
    ],
    epidemiology:
      "Las enfermedades cardiovasculares son la primera causa de muerte en la Argentina. El SCA sin elevación del ST es hoy más frecuente que el con elevación y predomina en pacientes mayores, diabéticos y con más comorbilidades. Es más frecuente en varones, y las mujeres lo presentan unos 10 años más tarde y con síntomas más atípicos.",
    management: [
      "ECG en los primeros 10 minutos y troponina ultrasensible seriada.",
      "Estratificar el riesgo (GRACE).",
      "Aspirina, inhibidor P2Y12, anticoagulación, estatinas en dosis altas, betabloqueante y nitratos según el caso.",
      "Coronariografía: inmediata si hay inestabilidad, en menos de 24 h en alto riesgo, en menos de 72 h en riesgo intermedio.",
      "Prevención secundaria y rehabilitación cardiovascular.",
    ],
    sources: ["Sociedad Argentina de Cardiología — Consenso de síndromes coronarios agudos sin elevación del segmento ST.", "Federación Argentina de Cardiología — Guías de SCA."],
    pearls: ["Sin supradesnivel + troponina alta = IAM sin elevación del ST.", "No se tromboliza.", "Alto riesgo: cateterismo en menos de 24 h."],
    pitfalls: ["Hacer una ergometría.", "Trombolizar.", "Dar el alta porque el dolor cedió."],
  },
};
