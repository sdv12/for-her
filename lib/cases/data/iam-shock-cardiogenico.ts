import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const iamShockCardiogenico: ClinicalCase = {
  id: "iam-anterior-shock-cardiogenico",
  level: 4,
  area: "Cardiovascular",
  setting: "Guardia",
  patient: { age: 68, ageUnit: "años", sex: "M", context: "Diabético, hipertenso y exfumador. Dolor de 3 horas de evolución." },
  frequency: "frecuente",
  intro: "“Tengo un dolor terrible en el pecho, me falta el aire y estoy todo sudado.”",
  vitals: { TA: "78/52 mmHg", FC: "118 lpm", FR: "30 rpm", "T°": "35,9 °C", "SatO₂": "86 %", Glasgow: "14/15" },
  anamnesis: [
    act("dolor", "¿Cómo es el dolor? ¿Desde cuándo?", "clave", "“Opresivo, va al brazo izquierdo, hace tres horas.”", "Dolor isquémico con tiempo aún útil para reperfusión."),
    act("alergias", "¿Alergias, sangrados, cirugías o ACV recientes?", "clave", "“Nada de eso.”", "Evalúa contraindicaciones."),
    act("medicacion", "¿Tomaste sildenafil? ¿Qué medicación usás?", "clave", "“No; metformina y enalapril.”", "Importante antes de nitratos, que igual se evitan por la hipotensión."),
    act("previos", "¿Tuviste dolores parecidos?", "util", "“La semana pasada, al caminar.”", "Angina previa."),
    act("disnea", "¿Podés acostarte?", "util", "“No, me ahogo.”", "Congestión pulmonar."),
    act("equipo", "¿De qué cuadro sos?", "neutro", "“De Talleres.”", "No orienta."),
  ],
  exam: [
    act("perfusion", "Perfusión periférica", "clave", "Frío, sudoroso, relleno de 4 segundos, oliguria, confusión leve.", "Signos de shock: hipoperfusión."),
    act("pulmones", "Auscultación pulmonar y yugulares", "clave", "Rales hasta campos medios, yugulares ingurgitadas.", "Congestión: frío y húmedo."),
    act("corazon", "Auscultación cardíaca", "clave", "Tercer ruido, sin soplos nuevos.", "Falla del VI; un soplo nuevo orientaría a complicación mecánica."),
  ],
  studies: [
    study("Electrofisiología", "ecg", "ECG de 12 derivaciones en los primeros 10 minutos", "clave", "Supradesnivel del ST de V1 a V6 y DI, aVL.", "IAM anterior extenso: arteria descendente anterior."),
    study("Imágenes", "eco", "Ecocardiograma a pie de cama", "clave", "FEVI 20 %, acinesia anterior, sin insuficiencia mitral aguda ni comunicación.", "Confirma origen y excluye complicaciones mecánicas."),
    study("Laboratorio", "lab", "Troponina, lactato, gases, función renal", "clave", "Troponina elevada, lactato 5,2, creatinina 1,7.", "Hipoperfusión; la troponina no debe demorar la reperfusión."),
    study("Otros", "esperar", "Esperar la segunda troponina para decidir", "riesgoso", "No se realizó.", "El ECG basta: tiempo es músculo."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("shock", "IAM anterior con elevación del ST complicado con shock cardiogénico", true, "Dolor típico, supradesnivel de V1-V6, hipotensión, hipoperfusión, congestión y FEVI 20 %."),
      dx("septico", "Shock séptico", false, "No hay foco; el paciente está frío y congestivo."),
      dx("tep", "TEP masivo", false, "El ECG y la ecografía orientan a falla del VI."),
      dx("diseccion", "Disección aórtica", false, "Es un diferencial, pero el ECG y la ecografía explican todo."),
      dx("taponamiento", "Taponamiento cardíaco", false, "No hay derrame."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("angioplastia", "Angioplastia primaria urgente, derivando si hace falta", "clave", "Es lo único que cambia la mortalidad del shock por IAM."),
      mg("antiagregacion", "Aspirina, inhibidor de P2Y12 y heparina", "clave", "Reduce la trombosis."),
      mg("vasopresor", "Noradrenalina y luego inotrópico si hace falta; soporte ventilatorio", "clave", "Sostiene la perfusión."),
      mg("uci", "Unidad coronaria y soporte mecánico si no responde", "util", "Puente en casos seleccionados."),
      mg("nitroglicerina", "Nitroglicerina y betabloqueantes EV", "riesgoso", "Empeoran la hipotensión y la falla."),
      mg("volumen", "Grandes volúmenes de cristaloides", "riesgoso", "Con congestión pulmonar empeora el edema."),
    ],
  },
  debrief: {
    diagnosis: "IAM con elevación del ST anterior extenso, con shock cardiogénico (Killip IV), en varón de 68 años.",
    pathologies: [
      { name: "IAM con elevación del ST", role: "principal", why: "Oclusión de la descendente anterior." },
      { name: "Shock cardiogénico", role: "asociada", why: "Falla grave de la bomba." },
      { name: "Complicación mecánica, TEP, disección", role: "diferencial", why: "Se excluyen por imágenes." },
    ],
    reasoning: [
      "Causa: rotura de placa con trombosis coronaria.",
      "Mecanismo: la necrosis extensa reduce el gasto cardíaco; la hipotensión reduce aún más el flujo coronario, en un círculo vicioso.",
      "Consecuencia: hipoperfusión, congestión, falla multiorgánica y mortalidad cercana al 40-50 %.",
    ],
    epidemiology:
      "El shock se presenta en cerca del 5 al 10 % de los IAM con elevación del ST y es su principal causa de muerte intrahospitalaria. Es más frecuente en adultos mayores, diabéticos e infartos anteriores. Por eso importa reducir el tiempo hasta reperfundir.",
    management: [
      "ECG en 10 minutos.",
      "Reperfusión urgente, de preferencia angioplastia.",
      "Noradrenalina, inotrópicos y soporte respiratorio.",
      "Evitar nitratos, betabloqueantes y sobrecarga.",
    ],
    sources: ["Sociedad Argentina de Cardiología — Consenso de IAM con elevación del ST.", "Federación Argentina de Cardiología — Recomendaciones."],
    pearls: ["Frío y húmedo: shock cardiogénico.", "En shock, no betabloqueantes ni nitratos.", "Angioplastia aun con tiempo prolongado."],
    pitfalls: ["Esperar la troponina.", "Dar volumen con edema de pulmón."],
    tribunal: [
      qa("¿Qué es la clasificación de Killip?", "I: sin insuficiencia cardíaca. II: rales o tercer ruido. III: edema agudo de pulmón. IV: shock cardiogénico."),
      qa("¿Qué complicaciones mecánicas hay?", "Rotura de pared libre (taponamiento), comunicación interventricular y rotura de músculo papilar con insuficiencia mitral, generalmente entre el día 1 y el 7."),
      qa("¿Cuál es la definición de shock cardiogénico?", "Hipotensión sostenida con signos de hipoperfusión por disfunción cardíaca, con índice cardíaco bajo y presiones de llenado altas."),
    ],
  },
};
