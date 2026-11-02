import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const isquemiaMesenterica: ClinicalCase = {
  id: "isquemia-mesenterica-aguda",
  level: 4,
  area: "Cirugía",
  setting: "Guardia",
  patient: { age: 79, ageUnit: "años", sex: "F", context: "Fibrilación auricular. Suspendió el anticoagulante hace un mes porque “se le acabó”." },
  frequency: "raro",
  intro: "“Me agarró un dolor de panza terrible hace cuatro horas, como nunca. Vomité y fui de cuerpo una vez.”",
  vitals: { TA: "148/86 mmHg", FC: "112 lpm (irregular)", FR: "22 rpm", "T°": "37,2 °C", "SatO₂": "95 %" },
  anamnesis: [
    act("dolor", "¿Cómo empezó el dolor? ¿Dónde?", "clave", "“De golpe, en toda la panza, alrededor del ombligo. Insoportable.”", "Dolor abdominal súbito e intenso, periumbilical."),
    act("fa", "¿Tiene alguna arritmia? ¿Toma anticoagulantes?", "clave", "“Tengo el corazón irregular. Dejé las pastillas para la sangre hace un mes.”", "FA sin anticoagulación: fuente de émbolos a la arteria mesentérica superior."),
    act("angina", "¿Le dolía la panza después de comer en los últimos meses? ¿Bajó de peso?", "util", "“No.”", "La angina intestinal sugiere trombosis sobre aterosclerosis; su ausencia orienta a embolia."),
    act("sangre", "¿La caca tenía sangre?", "util", "“Era oscura, como con sangre.”", "Sangrado por necrosis de la mucosa (más tardío)."),
    act("cirugias", "¿La operaron de la panza?", "util", "“De la vesícula hace años.”", "Las bridas son otro diferencial."),
    act("tejer", "¿Qué le gusta hacer?", "neutro", "“Tejer.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Palpación abdominal", "clave", "Abdomen blando, depresible, apenas doloroso a la palpación profunda; sin defensa.", "Dolor desproporcionado al examen: el signo clave de la isquemia mesentérica temprana."),
    act("pulso", "Pulso y ritmo", "clave", "Irregularmente irregular.", "Fibrilación auricular."),
    act("ruidos", "Ruidos hidroaéreos", "util", "Presentes al inicio, disminuidos.", "Al progresar, íleo."),
    act("tacto", "Tacto rectal", "util", "Restos de materia fecal con sangre.", "Isquemia de la mucosa."),
  ],
  studies: [
    study("Imágenes", "angiotc", "Angiotomografía de abdomen urgente", "clave", "Defecto de llenado en la arteria mesentérica superior a 4 cm de su origen; pared del yeyuno engrosada, sin neumatosis.", "Estudio de elección: confirma la oclusión embólica."),
    study("Laboratorio", "lactato", "Lactato, gases, hemograma, función renal, amilasa", "clave", "Lactato 4,2, leucocitos 19.000, acidosis metabólica.", "Sugieren isquemia, aunque un lactato normal no la descarta al principio."),
    study("Electrofisiología", "ecg", "Electrocardiograma", "util", "Fibrilación auricular de alta respuesta.", "Confirma la fuente embólica."),
    study("Imágenes", "rx", "Radiografía de abdomen y esperar la evolución", "riesgoso", "No se realizó.", "Suele ser normal al principio y la demora lleva a la necrosis."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("ima", "Isquemia mesentérica aguda por embolia de la arteria mesentérica superior", true, "Dolor abdominal súbito desproporcionado al examen, FA sin anticoagular, lactato alto y defecto de llenado en la AMS en la angiotomografía."),
      dx("pancreatitis", "Pancreatitis aguda", false, "Amilasa no orientadora y la angiotomografía muestra oclusión arterial."),
      dx("obstruccion", "Obstrucción intestinal por bridas", false, "Sin distensión ni niveles; hay oclusión arterial."),
      dx("gastroenteritis", "Gastroenteritis", false, "No explica la intensidad del dolor, el lactato ni la imagen."),
      dx("colitis", "Colitis isquémica", false, "Afecta el colon en forma no oclusiva, con dolor más leve y diarrea con sangre."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cirugia", "Cirugía vascular y general urgente: embolectomía y evaluación de la viabilidad intestinal (o tratamiento endovascular)", "clave", "Revascularizar en horas salva el intestino."),
      mg("heparina", "Heparina no fraccionada EV en cuanto se confirma", "clave", "Evita la progresión del trombo."),
      mg("sosten", "Reanimación con fluidos, antibiótico de amplio espectro, sonda nasogástrica", "clave", "Hay translocación bacteriana y pérdida de líquidos."),
      mg("second-look", "Planificar una segunda revisión (second look) a las 24–48 h", "util", "Reevalúa la viabilidad intestinal."),
      mg("analgesia-alta", "Analgesia y control en 12 horas si el abdomen sigue blando", "riesgoso", "El abdomen blando es parte del cuadro: la demora es mortal."),
      mg("vasopresores", "Vasopresores a dosis altas para subir la presión", "riesgoso", "Empeoran la isquemia esplácnica."),
    ],
  },
  debrief: {
    diagnosis: "Isquemia mesentérica aguda por embolia de la arteria mesentérica superior, en mujer de 79 años con fibrilación auricular sin anticoagulación.",
    pathologies: [
      { name: "Isquemia mesentérica aguda embólica", role: "principal", why: "Oclusión de la AMS por un émbolo cardíaco." },
      { name: "Fibrilación auricular sin anticoagulación", role: "asociada", why: "Fuente del émbolo." },
      { name: "Pancreatitis, obstrucción, colitis isquémica", role: "diferencial", why: "Otras causas de dolor abdominal agudo." },
    ],
    reasoning: [
      "Causa: un trombo de la aurícula izquierda (FA) se desprende y se aloja en la arteria mesentérica superior.",
      "Mecanismo: la falta de flujo produce isquemia primero de la mucosa (dolor visceral intenso sin peritonitis) y luego transmural.",
      "Consecuencia: necrosis intestinal, perforación, peritonitis, sepsis y muerte si no se revasculariza a tiempo.",
    ],
    epidemiology:
      "La isquemia mesentérica aguda es rara (menos del 1 % de los abdómenes agudos), pero tiene una mortalidad del 50 al 80 %. Afecta sobre todo a adultos mayores con fibrilación auricular, cardiopatía o aterosclerosis. La embolia es la causa más frecuente.",
    management: [
      "Sospecharla ante dolor abdominal desproporcionado al examen en un paciente con FA o vasculopatía.",
      "Angiotomografía urgente; no esperar marcadores.",
      "Heparina, reanimación, antibióticos y revascularización con resección del intestino no viable.",
      "Anticoagulación a largo plazo para la FA.",
    ],
    sources: ["Sociedad Argentina de Cirugía — Recomendaciones sobre abdomen agudo vascular.", "Guías de la Sociedad Europea de Cirugía Vascular sobre isquemia mesentérica."],
    pearls: ["Dolor desproporcionado al examen = isquemia mesentérica.", "FA sin anticoagular = embolia.", "Angiotomografía ya."],
    pitfalls: ["Tranquilizarse con el abdomen blando.", "Esperar el lactato."],
    tribunal: [
      qa("¿Qué causas tiene la isquemia mesentérica aguda?", "Embolia arterial (la más frecuente, por FA o infarto), trombosis arterial sobre aterosclerosis (con angina intestinal previa), isquemia no oclusiva (por bajo gasto o vasopresores) y trombosis venosa mesentérica (por trombofilias o hipertensión portal)."),
      qa("¿Cómo se calcula el riesgo de ACV en la FA?", "Con el puntaje CHA₂DS₂-VASc: insuficiencia cardíaca, hipertensión, edad de 75 o más (2 puntos), diabetes, ACV previo (2), enfermedad vascular, edad de 65 a 74 y sexo femenino; se anticoagula con 2 o más en varones y 3 o más en mujeres, y se considera con 1 (o 2 en mujeres)."),
      qa("¿Qué es la angina intestinal?", "El dolor abdominal posprandial por isquemia mesentérica crónica, con miedo a comer y pérdida de peso, en pacientes con aterosclerosis de las arterias mesentéricas."),
    ],
  },
};
