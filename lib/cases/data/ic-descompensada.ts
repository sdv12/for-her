import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const icDescompensada: ClinicalCase = {
  id: "ic-descompensada",
  level: 2,
  area: "Cardiovascular",
  setting: "Guardia",
  patient: { age: 72, ageUnit: "años", sex: "F" },
  frequency: "frecuente",
  intro: "“Hace cuatro días me agito al caminar media cuadra. Anoche no pude dormir acostada: me tuve que sentar en la silla.”",
  vitals: { TA: "150/90 mmHg", FC: "112 lpm, irregular", FR: "28 rpm", "SatO₂": "88 %", "T°": "36,5 °C" },
  anamnesis: [
    act("ortopnea", "¿Con cuántas almohadas duerme? ¿Se despierta ahogada?", "clave", "“Con tres almohadas, y anoche me desperté sin aire.”", "Ortopnea y disnea paroxística nocturna: congestión pulmonar por redistribución de volumen al acostarse."),
    act("edemas", "¿Se le hinchan las piernas? ¿Aumentó de peso?", "clave", "“Tengo los tobillos hinchados y aumenté 3 kilos en una semana.”", "Congestión sistémica; el aumento rápido de peso es retención de líquido."),
    act("antecedentes", "¿Qué enfermedades tiene del corazón?", "clave", "“Tuve un infarto hace 5 años. Me dijeron que el corazón quedó débil.”", "Insuficiencia cardíaca con fracción de eyección reducida por cardiopatía isquémica: la causa de base."),
    act("adherencia", "¿Toma todos los remedios? ¿Comió salado?", "clave", "“Dejé la furosemida porque me hacía orinar mucho. Y en un cumpleaños comí fiambre.”", "Abandono del diurético y transgresión de sal: los precipitantes más frecuentes."),
    act("aines", "¿Toma algo para el dolor?", "clave", "“Diclofenac por la rodilla.”", "Los AINEs retienen sodio, empeoran la función renal y descompensan la insuficiencia cardíaca."),
    act("palpitaciones", "¿Siente palpitaciones?", "clave", "“Desde hace una semana siento el corazón desordenado.”", "Sugiere fibrilación auricular de reciente comienzo, otro precipitante."),
    act("infeccion", "¿Fiebre, tos con catarro, ardor al orinar?", "util", "“No.”", "Las infecciones son precipitantes frecuentes y hay que buscarlas."),
    act("pecho", "¿Le dolió el pecho?", "util", "“No.”", "Un síndrome coronario agudo también puede descompensar; hay que descartarlo."),
  ],
  exam: [
    act("yugulares", "Yugulares y reflujo hepatoyugular", "clave", "Ingurgitación yugular a 45° con reflujo hepatoyugular positivo.", "Presión venosa central elevada: congestión."),
    act("pulmon", "Auscultación pulmonar", "clave", "Rales crepitantes bibasales hasta campos medios.", "Edema pulmonar."),
    act("corazon", "Auscultación cardíaca", "clave", "Ritmo irregular, tercer ruido, soplo sistólico mitral 2/6.", "Tercer ruido = ventrículo dilatado con sobrecarga de volumen; soplo de insuficiencia mitral funcional por dilatación."),
    act("perfusion", "Perfusión periférica", "clave", "Extremidades tibias, relleno capilar menor de 2 segundos, sensorio conservado.", "Perfil “caliente y húmedo”: congestiva pero bien perfundida. Define el tratamiento (diuréticos, no inotrópicos)."),
    act("edemas", "Edemas", "clave", "Edema con godet hasta las rodillas.", "Retención de sodio y agua."),
    act("higado", "Palpación hepática", "util", "Hígado a 3 cm del reborde, doloroso.", "Congestión hepática."),
  ],
  studies: [
    study("Electrofisiología", "ecg", "Electrocardiograma", "clave", "Fibrilación auricular con respuesta ventricular de 112 lpm; ondas Q en V1–V4.", "FA como precipitante y secuela de infarto anterior previo."),
    study("Imágenes", "rx", "Radiografía de tórax", "clave", "Cardiomegalia, redistribución de flujo hacia los vértices, líneas B de Kerley y derrame pleural bilateral pequeño.", "Signos de congestión pulmonar."),
    study("Laboratorio", "lab", "Ionograma, urea, creatinina, hemograma y glucemia", "clave", "Na 133, K 4,1, creatinina 1,4 (basal 1,1), Hb 11,8, glucemia 118.", "Sirve para ajustar diuréticos y para buscar precipitantes (anemia, insuficiencia renal)."),
    study("Laboratorio", "troponina", "Troponina", "util", "Levemente elevada y estable en dos muestras.", "Descarta un infarto agudo como precipitante: una elevación leve y estable es frecuente en la IC descompensada."),
    study("Laboratorio", "bnp", "NT-proBNP", "util", "4.800 pg/ml.", "Útil si hay duda diagnóstica; acá la clínica ya es clara."),
    study("Imágenes", "eco", "Ecocardiograma", "util", "FEVI 30 %, dilatación del VI, aquinesia anterior, insuficiencia mitral moderada.", "Confirma la IC con fracción de eyección reducida; no es urgente si ya se conocía."),
    study("Laboratorio", "dimero", "Dímero D", "innecesario", "Elevado.", "Inespecífico en una paciente añosa e internada; no hay sospecha clínica de TEP."),
    study("Imágenes", "tc", "TC de tórax", "innecesario", "Derrame bilateral y congestión.", "No agrega a la radiografía."),
    study("Otros", "ergo", "Prueba ergométrica", "riesgoso", "No se realiza.", "Contraindicada en una IC descompensada."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("ic", "IC crónica con FE reducida descompensada (perfil caliente-húmedo), precipitada por abandono del diurético, sal, AINEs y FA de alta respuesta", true, "Congestión pulmonar y sistémica, buena perfusión, cardiopatía isquémica conocida y varios precipitantes identificados."),
      dx("neumonia", "Neumonía", false, "Daría fiebre, tos productiva y un foco de consolidación; la congestión es bilateral y simétrica."),
      dx("epoc", "EPOC exacerbado", false, "No hay antecedente de EPOC; la ortopnea, el tercer ruido y los edemas son de origen cardíaco."),
      dx("tep", "Tromboembolismo pulmonar", false, "No explica la congestión pulmonar con rales, el tercer ruido ni los edemas bilaterales."),
      dx("iam", "Infarto agudo de miocardio como causa", false, "No hay dolor y la troponina es baja y estable: el infarto agudo era el diagnóstico que había que descartar."),
    ],
  },
  management: {
    prompt: "¿Qué indicás en la guardia?",
    options: [
      mg("posicion", "Posición sentada y oxígeno para saturación ≥ 90 %; ventilación no invasiva si persiste el distrés", "clave", "Mejora la oxigenación y reduce el trabajo respiratorio."),
      mg("furosemida", "Furosemida endovenosa en bolo (al menos la dosis oral habitual), con control de diuresis, peso y potasio", "clave", "Elimina la congestión: es el pilar del perfil húmedo."),
      mg("aines", "Suspender el diclofenac", "clave", "Retira un precipitante."),
      mg("cuarteto", "Al estabilizar: optimizar el tratamiento (IECA/ARA II o sacubitrilo-valsartán, betabloqueante, antagonista mineralocorticoide e iSGLT2) y educación", "clave", "Estos cuatro grupos reducen mortalidad e internaciones en la IC con FE reducida."),
      mg("fa", "Control de la frecuencia de la FA y evaluar anticoagulación (CHA₂DS₂-VASc)", "util", "La FA con respuesta rápida empeora el llenado; con CHA₂DS₂-VASc alto corresponde anticoagular."),
      mg("nitro", "Nitroglicerina endovenosa si la presión está elevada", "util", "Reduce precarga y poscarga y alivia la congestión."),
      mg("dobutamina", "Dobutamina", "riesgoso", "Los inotrópicos son para el perfil frío (bajo gasto con hipoperfusión). En una paciente bien perfundida aumentan arritmias y mortalidad."),
      mg("suspenderbb", "Suspender el betabloqueante crónico", "innecesario", "En el perfil caliente sin shock se mantiene (a lo sumo se reduce la dosis); suspenderlo empeora el pronóstico."),
    ],
  },
  debrief: {
    diagnosis: "IC crónica con FE reducida (cardiopatía isquémica) descompensada, perfil caliente-húmedo, precipitada por abandono de diuréticos, transgresión de sal, AINEs y FA de alta respuesta.",
    pathologies: [
      { name: "Insuficiencia cardíaca con FE reducida", role: "principal", why: "Remodelado del ventrículo izquierdo después del infarto." },
      { name: "Fibrilación auricular", role: "asociada", why: "Precipitante y consecuencia de la dilatación auricular." },
      { name: "Insuficiencia mitral funcional", role: "asociada", why: "Por dilatación del anillo mitral." },
      { name: "Síndrome coronario agudo", role: "diferencial", why: "Precipitante que había que descartar." },
      { name: "Neumonía, EPOC, TEP", role: "diferencial", why: "Otras causas de disnea en el adulto mayor." },
    ],
    reasoning: [
      "Causa: el infarto previo dejó un ventrículo dilatado con fracción de eyección del 30 %.",
      "Mecanismo: el bajo gasto activa el sistema renina-angiotensina-aldosterona, el simpático y la ADH → retención de sodio y agua y vasoconstricción. Con la curva de Frank-Starling aplanada, más precarga no aumenta el volumen sistólico: solo sube la presión de llenado.",
      "Consecuencia: la presión capilar pulmonar alta pasa líquido al intersticio y los alvéolos (rales, ortopnea, hipoxemia); la presión venosa alta da yugulares ingurgitadas, hepatomegalia y edemas.",
      "Los precipitantes inclinaron la balanza: más sal, menos diurético, AINEs (retención de sodio y bloqueo de prostaglandinas renales) y FA rápida (pierde la contribución auricular y acorta el llenado).",
    ],
    epidemiology:
      "La insuficiencia cardíaca aumenta con la edad y es una de las principales causas de internación en mayores de 65 años. En Argentina las causas más frecuentes son la hipertensión, la cardiopatía isquémica y, en zonas endémicas, la enfermedad de Chagas.",
    management: [
      "Clasificar el perfil hemodinámico (congestión: seco o húmedo; perfusión: caliente o frío).",
      "Perfil caliente-húmedo: diuréticos de asa endovenosos, oxígeno o ventilación no invasiva si hace falta, vasodilatadores si la presión lo permite.",
      "Identificar y corregir precipitantes: adherencia, sal, AINEs, FA, infección, isquemia, anemia.",
      "Al alta: tratamiento que reduce mortalidad (IECA/ARA II o sacubitrilo-valsartán, betabloqueante, antagonista mineralocorticoide, iSGLT2), educación (sal, peso diario, adherencia) y control precoz.",
    ],
    sources: [
      "Sociedad Argentina de Cardiología — Consenso de Insuficiencia Cardíaca.",
      "Sociedad Europea de Cardiología — Guías de insuficiencia cardíaca (referencia del consenso argentino).",
    ],
    pearls: [
      "Perfiles de Stevenson: caliente-húmedo (diurético), frío-húmedo (inotrópico + diurético), frío-seco (volumen con cuidado).",
      "Los cuatro pilares de la IC con FE reducida: IECA/ARNI, betabloqueante, antagonista mineralocorticoide, iSGLT2.",
      "Siempre buscar el precipitante.",
    ],
    pitfalls: [
      "Suspender el betabloqueante en todos los descompensados.",
      "Olvidar preguntar por AINEs y adherencia.",
      "Usar inotrópicos en una paciente bien perfundida.",
    ],
  },
};
