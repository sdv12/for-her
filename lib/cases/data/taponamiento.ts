import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const taponamiento: ClinicalCase = {
  id: "taponamiento-cardiaco-neoplasico",
  level: 4,
  area: "Cardiovascular",
  setting: "Guardia",
  patient: { age: 58, ageUnit: "años", sex: "F", context: "Cáncer de mama metastásico en tratamiento." },
  frequency: "poco-frecuente",
  intro: "“Hace una semana me falta cada vez más el aire, ahora no me puedo acostar, y hoy me mareé al pararme.”",
  vitals: { TA: "88/70 mmHg", FC: "128 lpm", FR: "28 rpm", "T°": "36,8 °C", "SatO₂": "94 %" },
  anamnesis: [
    act("disnea", "¿Cómo empezó la falta de aire? ¿Te duele el pecho?", "clave", "“Fue aumentando en una semana; una molestia en el pecho.”", "Disnea progresiva en una paciente con cáncer: pensar derrame pericárdico."),
    act("cancer", "¿Qué tratamiento hacés para el cáncer?", "clave", "“Quimioterapia; tengo metástasis en pulmón y huesos.”", "El cáncer de mama y de pulmón son causas frecuentes de derrame pericárdico maligno."),
    act("anticoag", "¿Tomás anticoagulantes?", "util", "“No.”", "Importante antes de un procedimiento."),
    act("fiebre", "¿Tuviste fiebre?", "util", "“No.”", "Descarta pericarditis infecciosa."),
    act("ortopnea", "¿Podés acostarte?", "util", "“No, duermo sentada.”", "Compromiso hemodinámico."),
    act("libro", "¿Qué estás leyendo?", "neutro", "“Una novela de Cortázar.”", "No orienta."),
  ],
  exam: [
    act("beck", "Yugulares, ruidos cardíacos y presión", "clave", "Ingurgitación yugular, ruidos cardíacos apagados, hipotensión.", "Tríada de Beck: taponamiento."),
    act("paradojico", "Pulso paradójico", "clave", "Caída de la sistólica de 18 mmHg con la inspiración.", "Mayor de 10 mmHg: muy sugestivo de taponamiento."),
    act("pulmon", "Auscultación pulmonar", "util", "Pulmones con murmullo disminuido en base derecha, sin rales.", "Derrame pleural asociado; sin edema pulmonar."),
  ],
  studies: [
    study("Imágenes", "eco", "Ecocardiograma en la cama", "clave", "Derrame pericárdico grande con colapso diastólico de la aurícula y el ventrículo derechos; vena cava dilatada sin colapso.", "Confirma el taponamiento."),
    study("Electrofisiología", "ecg", "Electrocardiograma", "util", "Taquicardia sinusal, bajo voltaje y alternancia eléctrica.", "Hallazgos típicos de derrame grande."),
    study("Imágenes", "rx", "Radiografía de tórax", "util", "Silueta cardíaca agrandada en forma de botellón.", "Derrame pericárdico grande."),
    study("Imágenes", "tc", "Trasladar a tomografía antes de drenar", "riesgoso", "No se realizó.", "Paciente inestable: el drenaje no se demora."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("taponamiento", "Taponamiento cardíaco por derrame pericárdico neoplásico", true, "Tríada de Beck, pulso paradójico, alternancia eléctrica y derrame grande con colapso de cavidades derechas, en paciente con cáncer metastásico."),
      dx("ic", "Insuficiencia cardíaca descompensada", false, "No hay rales y el eco muestra derrame con colapso."),
      dx("tep", "Tromboembolismo pulmonar", false, "El eco muestra derrame con colapso de cavidades, no dilatación del VD."),
      dx("neumotorax", "Neumotórax a tensión", false, "No hay timpanismo ni ausencia de murmullo unilateral con desviación traqueal."),
      dx("constrictiva", "Pericarditis constrictiva", false, "Hay derrame grande, no engrosamiento con constricción crónica."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("pericardiocentesis", "Pericardiocentesis urgente guiada por ecografía", "clave", "Es el tratamiento que salva la vida."),
      mg("fluidos", "Expansión con fluidos mientras se prepara el drenaje", "util", "Mantiene la precarga."),
      mg("citologia", "Enviar el líquido a citología, cultivo y bioquímica", "clave", "Confirma la causa."),
      mg("prevencion", "Evaluar ventana pericárdica para evitar la recurrencia y conversar objetivos de cuidado con oncología y paliativos", "util", "El derrame maligno recurre con frecuencia."),
      mg("diureticos", "Furosemida para la disnea", "riesgoso", "Baja la precarga y empeora el taponamiento."),
      mg("intubacion", "Intubación con ventilación a presión positiva antes de drenar", "riesgoso", "Puede producir colapso hemodinámico."),
    ],
  },
  debrief: {
    diagnosis: "Taponamiento cardíaco por derrame pericárdico neoplásico en mujer de 58 años con cáncer de mama metastásico.",
    pathologies: [
      { name: "Taponamiento cardíaco", role: "principal", why: "Compresión del corazón por derrame pericárdico." },
      { name: "Derrame pericárdico maligno", role: "asociada", why: "Metástasis pericárdicas." },
      { name: "IC, TEP, neumotórax a tensión", role: "diferencial", why: "Otras causas de shock obstructivo o disnea." },
    ],
    reasoning: [
      "Causa: metástasis en el pericardio que producen líquido.",
      "Mecanismo: el líquido aumenta la presión intrapericárdica e impide el llenado diastólico, primero de las cavidades derechas.",
      "Consecuencia: bajo gasto, hipotensión, ingurgitación yugular, pulso paradójico y shock obstructivo.",
    ],
    epidemiology:
      "Las causas más frecuentes de taponamiento son neoplásicas (pulmón, mama, linfomas), traumáticas, posquirúrgicas, urémicas e infecciosas (TBC en zonas endémicas). En pacientes oncológicos, el derrame pericárdico maligno indica enfermedad avanzada.",
    management: [
      "Sospechar ante disnea, hipotensión e ingurgitación yugular en contextos de riesgo.",
      "Ecocardiograma en la cama.",
      "Pericardiocentesis urgente; ventana pericárdica si recurre.",
      "Estudio del líquido y planificación de cuidados.",
    ],
    sources: ["Sociedad Argentina de Cardiología — Consenso de enfermedades del pericardio.", "Guías ESC de enfermedades del pericardio."],
    pearls: ["Beck: hipotensión + yugulares + ruidos apagados.", "Pulso paradójico mayor de 10.", "Nada de diuréticos: drenar."],
    pitfalls: ["Dar diuréticos.", "Intubar antes de drenar."],
    tribunal: [
      qa("¿Qué es el pulso paradójico?", "Una caída mayor de 10 mmHg de la presión sistólica durante la inspiración; se ve en taponamiento cardíaco, asma grave, EPOC y TEP masivo."),
      qa("¿Qué es la alternancia eléctrica?", "La variación de la amplitud del QRS latido a latido en el ECG, por el balanceo del corazón dentro de un derrame pericárdico grande; es muy específica de taponamiento."),
      qa("¿Qué tipos de shock hay?", "Hipovolémico (hemorragia, deshidratación), cardiogénico (infarto, arritmias), distributivo (séptico, anafiláctico, neurogénico) y obstructivo (taponamiento, TEP masivo, neumotórax a tensión)."),
    ],
  },
};
