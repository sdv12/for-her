import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const iamAtipico: ClinicalCase = {
  id: "iam-atipico-mujer-diabetica",
  level: 4,
  area: "Cardiovascular",
  setting: "Guardia",
  patient: { age: 78, ageUnit: "años", sex: "F", context: "La trae la hija." },
  frequency: "frecuente",
  intro: "“Desde esta mañana está decaída, con falta de aire y náuseas; vomitó una vez. No le duele el pecho.”",
  vitals: { TA: "100/60 mmHg", FC: "104 lpm", FR: "24 rpm", "SatO₂": "91 %", "T°": "36,2 °C", Glucemia: "245 mg/dl" },
  anamnesis: [
    act("equivalentes", "¿Siente opresión, ardor o pesadez en algún lado (estómago, mandíbula, brazos, espalda)?", "clave", "“No me duele el pecho, pero tengo una pesadez en la boca del estómago.”", "En mujeres mayores y diabéticas el infarto suele presentarse con equivalentes: disnea, náuseas, epigastralgia, fatiga. Hay que preguntarlos activamente."),
    act("inicio", "¿Desde qué hora está así?", "clave", "“Desde las 8 de la mañana, hace unas 6 horas.”", "El tiempo de evolución orienta la estrategia."),
    act("antecedentes", "¿Qué enfermedades tiene?", "clave", "“Diabetes hace 20 años, con los pies dormidos; presión alta; los riñones un poco mal.”", "Diabetes de larga data con neuropatía (también autonómica): explica la falta de dolor. La enfermedad renal condiciona fármacos y contraste."),
    act("infeccion", "¿Fiebre, tos, ardor al orinar?", "clave", "“No.”", "En una persona mayor decaída hay que buscar también infección o sepsis, una causa frecuente de este cuadro."),
    act("medicacion", "¿Qué medicación toma?", "util", "“Insulina NPH, metformina y enalapril. No toma aspirina.”", "Datos necesarios para el tratamiento (metformina y contraste, ajuste por función renal)."),
    act("hipoglucemia", "¿Tuvo bajas de azúcar?", "neutro", "“No.”", "La hipoglucemia también da malestar inespecífico, pero la glucemia está alta."),
  ],
  exam: [
    act("auscultacion", "Auscultación cardiopulmonar", "clave", "Cuarto ruido, rales crepitantes bibasales.", "Congestión pulmonar: Killip II. La isquemia deteriora la función ventricular."),
    act("abdomen", "Examen abdominal", "clave", "Blando, molestia leve en epigastrio, sin defensa ni masas.", "Un abdomen sin signos de irritación hace menos probable una causa digestiva quirúrgica."),
    act("perfusion", "Perfusión periférica", "util", "Extremidades tibias, relleno capilar de 3 segundos.", "Perfusión limítrofe: hay que vigilar la evolución a bajo gasto."),
    act("neuro", "Estado neurológico", "util", "Lúcida, orientada.", "Descarta un cuadro neurológico como causa del decaimiento."),
  ],
  studies: [
    study("Electrofisiología", "ecg", "Electrocardiograma", "clave", "Taquicardia sinusal; infradesnivel del ST de 2 mm en V4–V6, DI y aVL.", "Isquemia subendocárdica de cara lateral: síndrome coronario agudo sin elevación del ST."),
    study("Laboratorio", "troponina", "Troponina ultrasensible seriada", "clave", "Elevada al ingreso, con ascenso significativo en la segunda muestra.", "Ascenso dinámico de troponina: necrosis miocárdica aguda (infarto)."),
    study("Laboratorio", "lab", "Función renal, ionograma y hemograma", "clave", "Creatinina 1,6, K 4,8, Hb 12.", "Ajuste de dosis de anticoagulantes y precaución con el contraste."),
    study("Imágenes", "rx", "Radiografía de tórax", "util", "Congestión leve.", "Confirma la congestión pulmonar."),
    study("Laboratorio", "lipasa", "Lipasa y amilasa", "util", "Normales.", "Con epigastralgia, descarta pancreatitis."),
    study("Laboratorio", "orina", "Orina completa", "util", "Sin leucocitos ni nitritos.", "Descarta la infección urinaria como causa del decaimiento."),
    study("Imágenes", "eco", "Ecocardiograma", "util", "Hipoquinesia lateral, FEVI 45 %.", "Trastorno segmentario compatible con isquemia."),
    study("Imágenes", "tc", "TC de abdomen", "innecesario", "Sin hallazgos agudos.", "Retrasa el diagnóstico real y suma contraste en una paciente con función renal alterada."),
    study("Otros", "vede", "Endoscopía digestiva alta", "riesgoso", "No se realiza.", "Someter a una endoscopía a una paciente con un infarto en curso es riesgoso y desvía el foco."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("iamsest", "IAM sin elevación del ST (SCASEST) de presentación atípica, Killip II", true, "Disnea, náuseas y epigastralgia sin dolor torácico en una mujer mayor y diabética con neuropatía, con infradesnivel del ST y troponina en ascenso."),
      dx("gastritis", "Gastritis o dispepsia", false, "La epigastralgia es un equivalente anginoso: el ECG y la troponina muestran isquemia y necrosis."),
      dx("sepsis", "Sepsis de foco urinario", false, "No hay fiebre ni alteraciones en la orina."),
      dx("tep", "Tromboembolismo pulmonar", false, "No explica el infradesnivel lateral ni la congestión pulmonar."),
      dx("angina", "Angina inestable", false, "La troponina en ascenso indica necrosis: es un infarto."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("antitromboticos", "Aspirina, segundo antiagregante y anticoagulación (ajustada a la función renal)", "clave", "Tratamiento antitrombótico del síndrome coronario agudo."),
      mg("cateterismo", "Estratificar el riesgo (por ejemplo, con el puntaje GRACE) y cateterismo precoz (dentro de las 24 h por alto riesgo)", "clave", "La troponina dinámica, la insuficiencia cardíaca y la edad la ubican en alto riesgo."),
      mg("estatina", "Estatina de alta intensidad", "clave", "Parte del tratamiento inicial del infarto."),
      mg("diuretico", "Diurético endovenoso para la congestión", "util", "Mejora la congestión pulmonar."),
      mg("oxigeno", "Oxígeno para mantener la saturación por encima de 90 %", "util", "Tiene hipoxemia: corresponde."),
      mg("metformina", "Suspender la metformina y manejar la glucemia con insulina, evitando hipoglucemias", "util", "Contraste y función renal alterada: riesgo de acidosis láctica. La hipoglucemia empeora la isquemia."),
      mg("fibrinolisis", "Fibrinólisis", "riesgoso", "No está indicada en el infarto sin elevación del ST: no beneficia y aumenta el sangrado."),
      mg("antiacido", "Antiácido y alta", "riesgoso", "Mandar a casa un infarto atribuido al estómago es un error clásico y grave."),
    ],
  },
  debrief: {
    diagnosis: "IAM sin elevación del ST de cara lateral, de presentación atípica (disnea, náuseas, epigastralgia) en una mujer mayor y diabética, Killip II.",
    pathologies: [
      { name: "IAM sin elevación del ST", role: "principal", why: "Isquemia subendocárdica con necrosis (troponina en ascenso)." },
      { name: "Insuficiencia cardíaca aguda (Killip II)", role: "asociada", why: "Disfunción ventricular por isquemia." },
      { name: "Neuropatía autonómica diabética", role: "asociada", why: "Explica la ausencia de dolor." },
      { name: "Gastritis, pancreatitis", role: "diferencial", why: "La epigastralgia puede confundir." },
      { name: "Sepsis e infección urinaria", role: "diferencial", why: "Causas frecuentes de decaimiento en personas mayores." },
    ],
    reasoning: [
      "Causa: aterosclerosis coronaria acelerada por diabetes, HTA y enfermedad renal; trombo no oclusivo o desbalance entre oferta y demanda de oxígeno.",
      "Mecanismo: la isquemia afecta primero el subendocardio (la zona más alejada de las coronarias epicárdicas) → infradesnivel del ST; la necrosis libera troponina.",
      "Por qué no duele: la neuropatía autonómica diabética altera las aferencias del dolor visceral, y en personas mayores (sobre todo mujeres) la percepción del dolor isquémico es distinta. Aparecen equivalentes: disnea (por disfunción ventricular), náuseas y vómitos (reflejo vagal), epigastralgia, fatiga.",
      "Consecuencia: consultan tarde, se diagnostican tarde y tienen más mortalidad. Ante una persona mayor o diabética con disnea o malestar inexplicado, siempre ECG y troponina.",
    ],
    epidemiology:
      "La enfermedad cardiovascular es la primera causa de muerte en las mujeres. En ellas el infarto aparece en promedio unos 10 años más tarde que en los varones y se presenta más a menudo sin dolor típico, lo que lleva a subdiagnóstico. Las personas diabéticas y mayores de 75 años también tienen más presentaciones atípicas.",
    management: [
      "Sospechar el síndrome coronario agudo ante disnea, náuseas, epigastralgia o malestar inexplicado en mujeres, mayores y diabéticos: ECG en 10 minutos y troponina seriada.",
      "IAM sin supra ST: doble antiagregación, anticoagulación, estatina; estratificar el riesgo y definir el momento del cateterismo (inmediato si hay inestabilidad, precoz si el riesgo es alto).",
      "No fibrinolíticos.",
      "Tratar la congestión, cuidar la función renal y la glucemia.",
    ],
    sources: [
      "Sociedad Argentina de Cardiología — Consenso de Síndromes Coronarios Agudos sin elevación del segmento ST.",
      "Sociedad Argentina de Cardiología — Área de Cardiopatía en la Mujer (enfermedad cardiovascular en mujeres).",
    ],
    pearls: [
      "Mujer + mayor + diabética = el infarto puede no doler.",
      "Epigastralgia en un paciente con factores de riesgo: primero ECG, después el estómago.",
      "En el SCA sin supra ST no hay fibrinólisis.",
    ],
    pitfalls: [
      "Atribuir los síntomas al estómago o a la edad.",
      "No pedir troponina seriada.",
      "Indicar fibrinólisis en un SCA sin supra ST.",
    ],
  },
};
