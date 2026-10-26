import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const dengue: ClinicalCase = {
  id: "dengue-signos-alarma",
  level: 3,
  area: "Infectología",
  setting: "Guardia",
  patient: { age: 34, ageUnit: "años", sex: "M", context: "Marzo, Corrientes." },
  frequency: "frecuente",
  intro: "“Hace cuatro días tengo fiebre alta, dolor de cabeza, detrás de los ojos y en todo el cuerpo. Hoy la fiebre bajó, pero vomité cuatro veces y me duele mucho la panza.”",
  vitals: { TA: "105/75 mmHg", FC: "108 lpm", FR: "20 rpm", "SatO₂": "97 %", "T°": "37,2 °C" },
  anamnesis: [
    act("dia", "¿Qué día de enfermedad es? ¿Cuándo bajó la fiebre?", "clave", "“Empezó hace cuatro días; la fiebre se fue hoy a la mañana.”", "Los días 3 a 7, cuando cede la fiebre, son la fase crítica del dengue: ahí aparece la fuga de plasma."),
    act("alarma", "¿Vomita todo? ¿Cómo es el dolor de panza?", "clave", "“Vomité cuatro veces desde la mañana; el dolor es fuerte y no se me va.”", "Vómitos persistentes y dolor abdominal intenso y continuo son signos de alarma."),
    act("sangrado", "¿Le sangran las encías o la nariz?", "clave", "“Me sangran las encías al cepillarme.”", "El sangrado de mucosas es un signo de alarma."),
    act("nexo", "¿Hay casos de dengue en su barrio? ¿Viajó?", "clave", "“Varios vecinos tuvieron dengue este mes.”", "Nexo epidemiológico en una zona con circulación viral: refuerza el diagnóstico y obliga a notificar."),
    act("aines", "¿Qué tomó para la fiebre?", "clave", "“Ibuprofeno.”", "Los AINEs y la aspirina están contraindicados en el dengue: aumentan el riesgo de sangrado. Se suspenden."),
    act("diuresis", "¿Está orinando bien?", "clave", "“Poco hoy.”", "La diuresis disminuida puede reflejar hipovolemia por fuga de plasma."),
    act("previo", "¿Tuvo dengue antes?", "util", "“Sí, hace tres años.”", "Una segunda infección por otro serotipo aumenta el riesgo de formas graves."),
    act("comorbilidades", "¿Tiene enfermedades crónicas o está embarazado alguien en la casa?", "util", "“No.”", "Comorbilidades, embarazo, extremos de edad y condiciones sociales cambian la clasificación y el manejo."),
  ],
  exam: [
    act("abdomen", "Examen abdominal", "clave", "Dolor intenso en epigastrio; hígado palpable a 2 cm, doloroso.", "Hepatomegalia dolorosa: signo de alarma."),
    act("extravasacion", "Búsqueda de líquido (bases pulmonares, ascitis)", "clave", "Matidez y disminución del murmullo en la base derecha.", "Derrame pleural: fuga de plasma clínicamente detectable."),
    act("perfusion", "Perfusión (relleno capilar, extremidades, pulsos)", "clave", "Relleno capilar de 2 segundos, extremidades tibias, pulsos llenos.", "Todavía no está en shock. Una presión diferencial de 20 mmHg o menos, el relleno lento o las extremidades frías indicarían shock."),
    act("lazo", "Prueba del lazo", "util", "Positiva.", "Indica fragilidad capilar; no define gravedad por sí sola."),
    act("piel", "Examen de piel", "util", "Exantema eritematoso con “islas blancas” en miembros inferiores.", "Exantema típico de la convalecencia del dengue."),
  ],
  studies: [
    study("Laboratorio", "hemograma", "Hemograma seriado (hematocrito y plaquetas)", "clave", "Hto 52 % (basal 44 %), plaquetas 62.000, leucocitos 2.800.", "El aumento del hematocrito (hemoconcentración) junto con la caída de las plaquetas es un signo de alarma: refleja la fuga de plasma."),
    study("Microbiología", "ns1", "Antígeno NS1 / PCR para dengue", "util", "NS1 positivo.", "Confirma la infección y es necesario para la vigilancia; no define el tratamiento, que es clínico."),
    study("Laboratorio", "hepatograma", "Hepatograma y albúmina", "util", "TGO 280, TGP 190, albúmina 3,0.", "Compromiso hepático y pérdida de proteínas por fuga capilar."),
    study("Imágenes", "eco", "Ecografía abdominal", "util", "Líquido perivesicular y derrame pleural derecho.", "Documenta la extravasación."),
    study("Laboratorio", "coagulograma", "Coagulograma", "neutro", "TP 80 %, KPTT normal.", "Útil si hay sangrados importantes."),
    study("Microbiología", "hemocultivos", "Hemocultivos", "innecesario", "Sin desarrollo.", "Sin sospecha de sepsis bacteriana no aportan."),
    study("Imágenes", "tc", "TC de abdomen", "innecesario", "No se realiza.", "No cambia la conducta y demora la hidratación."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("dengue", "Dengue con signos de alarma (fase crítica)", true, "Fiebre de cuatro días que cede, con vómitos persistentes, dolor abdominal intenso, sangrado de mucosas, hepatomegalia dolorosa, derrame pleural y hemoconcentración con plaquetas en descenso, en una zona con circulación viral."),
      dx("lepto", "Leptospirosis", false, "Contexto de inundaciones o contacto con agua o roedores, mialgias en pantorrillas, inyección conjuntival, ictericia e insuficiencia renal."),
      dx("chik", "Chikungunya", false, "Predominan las artralgias intensas e incapacitantes; la fuga de plasma no es característica."),
      dx("abdomen", "Abdomen agudo quirúrgico (colecistitis)", false, "El dolor abdominal es un signo de alarma del dengue; operar a un paciente con dengue grave es muy riesgoso."),
      dx("grave", "Dengue grave con shock", false, "Todavía conserva la perfusión. Es lo que se busca evitar con la hidratación."),
    ],
  },
  management: {
    prompt: "¿Qué hacés?",
    options: [
      mg("internar", "Internación", "clave", "Todo dengue con signos de alarma se interna."),
      mg("hidratacion", "Cristaloides EV (solución fisiológica o Ringer lactato) 10 ml/kg/h en la primera hora, reevaluando y ajustando según hematocrito, diuresis y signos vitales", "clave", "Repone el plasma que se fuga y evita el shock."),
      mg("paracetamol", "Paracetamol para la fiebre y el dolor; suspender el ibuprofeno", "clave", "El paracetamol es el único antitérmico recomendado."),
      mg("controles", "Controles horarios de signos vitales y diuresis, y hematocrito seriado", "clave", "La fase crítica se vigila de cerca: el deterioro puede ser rápido."),
      mg("notificar", "Notificación al Sistema Nacional de Vigilancia y aviso para el bloqueo de foco", "clave", "Es un evento de notificación obligatoria; permite el control del vector alrededor del caso."),
      mg("plaquetas", "Transfundir plaquetas por el recuento de 62.000", "riesgoso", "No se transfunde por número: solo ante un sangrado grave."),
      mg("im", "Medicación intramuscular", "riesgoso", "Riesgo de hematomas."),
      mg("aspirina", "Aspirina", "riesgoso", "Contraindicada: aumenta el riesgo de sangrado."),
      mg("corticoides", "Corticoides o antivirales", "innecesario", "No tienen beneficio demostrado en el dengue."),
      mg("alta", "Alta con hidratación oral y pautas de alarma", "riesgoso", "Con signos de alarma no corresponde el manejo ambulatorio."),
    ],
  },
  debrief: {
    diagnosis: "Dengue con signos de alarma, fase crítica (día 4), con hemoconcentración, plaquetopenia y extravasación (derrame pleural).",
    pathologies: [
      { name: "Dengue con signos de alarma", role: "principal", why: "Fase crítica con fuga de plasma." },
      { name: "Dengue grave (shock, sangrado grave, daño de órganos)", role: "asociada", why: "Lo que se busca prevenir con la hidratación." },
      { name: "Leptospirosis", role: "diferencial", why: "Fiebre con mialgias, ictericia e insuficiencia renal; contexto hídrico." },
      { name: "Chikungunya y Zika", role: "diferencial", why: "Otros arbovirus transmitidos por el mismo mosquito." },
      { name: "Abdomen agudo", role: "diferencial", why: "El dolor abdominal del dengue puede confundir." },
    ],
    reasoning: [
      "Causa: virus del dengue (4 serotipos, DENV-1 a 4), transmitido por la picadura del mosquito Aedes aegypti.",
      "Mecanismo: el virus se replica en monocitos y células dendríticas (fase febril). Al ceder la fiebre (días 3 a 7), las citoquinas, la proteína NS1 y, en una segunda infección por otro serotipo, los anticuerpos facilitadores aumentan la permeabilidad vascular.",
      "Consecuencia: el plasma sale de los vasos → hemoconcentración (sube el hematocrito), derrames y ascitis, hipovolemia → shock si no se repone. Las plaquetas caen por supresión medular y destrucción inmune; el hígado se inflama.",
      "Por eso los signos de alarma (dolor abdominal, vómitos, sangrado de mucosas, hepatomegalia, líquido acumulado, hematocrito que sube con plaquetas que bajan) aparecen cuando la fiebre baja, y el tratamiento es reponer volumen a tiempo.",
    ],
    epidemiology:
      "Afecta a todas las edades, sobre todo a adultos jóvenes. En las últimas temporadas (2023 y 2024) Argentina tuvo las epidemias más grandes de su historia, con circulación en el NEA, el NOA, el centro y el AMBA, y con más casos a fines del verano y en otoño. Más riesgo de formas graves: segunda infección, embarazo, extremos de la vida, comorbilidades.",
    management: [
      "Clasificar: dengue sin signos de alarma (ambulatorio si no tiene condiciones de riesgo), con signos de alarma (internación) o grave (terapia intensiva).",
      "Con signos de alarma: cristaloides EV, ajustando según hematocrito, diuresis y signos vitales; controles horarios.",
      "Solo paracetamol; nada de AINEs, aspirina ni inyecciones intramusculares.",
      "No transfundir plaquetas por el recuento.",
      "Notificar y avisar para el bloqueo de foco; prevenir eliminando criaderos de mosquitos. Existe una vacuna (TAK-003) que el Ministerio de Salud aplica de forma focalizada en edades y zonas priorizadas.",
    ],
    sources: [
      "Ministerio de Salud de la Nación — Dengue: guía para el equipo de salud (diagnóstico, clasificación y manejo).",
      "Ministerio de Salud de la Nación — Boletín Epidemiológico Nacional y normas de vigilancia del SNVS.",
      "Ley 15.465 — Régimen de notificaciones médicas obligatorias.",
    ],
    pearls: [
      "El peligro aparece cuando la fiebre baja: la fase crítica es entre los días 3 y 7.",
      "Hematocrito que sube + plaquetas que bajan = fuga de plasma.",
      "En el dengue, solo paracetamol.",
    ],
    pitfalls: [
      "Dar el alta porque “ya no tiene fiebre”.",
      "Transfundir plaquetas por el número.",
      "No preguntar qué tomó para la fiebre.",
    ],
  },
};
