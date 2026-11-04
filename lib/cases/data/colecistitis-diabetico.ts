import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const colecistitisDiabetico: ClinicalCase = {
  id: "colecistitis-aguda-adulto-mayor-diabetico",
  level: 2,
  area: "Cirugía",
  setting: "Guardia",
  patient: { age: 76, ageUnit: "años", sex: "M", context: "Diabético tipo 2 con insulina. Litiasis vesicular conocida, no operado." },
  frequency: "frecuente",
  intro: "“Desde hace dos días me duele del lado derecho arriba, tengo fiebre y no tengo hambre. Al principio pensé que era indigestión.”",
  vitals: { TA: "124/70 mmHg", FC: "104 lpm", FR: "20 rpm", "T°": "38,4 °C", Glucemia: "286 mg/dl" },
  anamnesis: [
    act("dolor", "¿Cuánto dura el dolor?", "clave", "“Dos días seguidos, no se va.”", "Dolor biliar de más de 6 horas con fiebre: colecistitis."),
    act("ictericia", "¿Se puso amarillo? ¿Orina oscura?", "clave", "“No.”", "Sin colangitis evidente."),
    act("diabetes", "¿Cómo está la diabetes?", "util", "“Mal, la glucemia alta.”", "Los diabéticos tienen formas más graves (gangrena, enfisematosa) y menos dolor."),
    act("previos", "¿Tuviste cólicos antes?", "util", "“Varios.”", "Litiasis sintomática no operada."),
    act("anticoag", "¿Tomás anticoagulantes?", "util", "“No.”", "Para la cirugía."),
    act("hobby", "¿Qué te gusta hacer?", "neutro", "“Jugar a las bochas.”", "No orienta."),
  ],
  exam: [
    act("murphy", "Signo de Murphy", "clave", "Positivo.", "Colecistitis aguda."),
    act("masa", "Palpación", "clave", "Plastrón doloroso en hipocondrio derecho, sin peritonitis generalizada.", "Inflamación local."),
    act("perfusion", "Perfusión", "util", "Conservada.", "Sin shock."),
  ],
  studies: [
    study("Imágenes", "eco", "Ecografía abdominal", "clave", "Vesícula distendida con pared de 6 mm, cálculo enclavado en el bacinete, líquido perivesicular, Murphy ecográfico positivo; sin gas en la pared.", "Confirma colecistitis litiásica."),
    study("Laboratorio", "lab", "Hemograma, PCR, hepatograma, lipasa, creatinina", "clave", "Leucocitos 17.000, PCR alta, bilirrubina normal, lipasa normal.", "Grado II de Tokio (moderada)."),
    study("Microbiología", "hemocultivos", "Hemocultivos", "util", "Pendientes.", "Fiebre en mayor."),
    study("Imágenes", "colangiorm", "Colangiorresonancia de rutina", "innecesario", "No se realizó.", "Sin sospecha de coledocolitiasis."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("colecistitis", "Colecistitis aguda litiásica moderada (Tokio grado II) en adulto mayor diabético", true, "Dolor de 48 h con fiebre, Murphy positivo, plastrón, leucocitosis y ecografía con cálculo enclavado y pared engrosada."),
      dx("colico", "Cólico biliar", false, "Dura más de 6 h con fiebre e inflamación."),
      dx("colangitis", "Colangitis", false, "Sin ictericia ni dilatación de la vía biliar."),
      dx("pancreatitis", "Pancreatitis", false, "Lipasa normal."),
      dx("enfisematosa", "Colecistitis enfisematosa", false, "No hay gas en la pared."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("atb", "Internación, ayuno, hidratación y antibiótico EV (por ejemplo, ampicilina-sulbactam)", "clave", "Tratamiento médico inicial."),
      mg("cirugia", "Colecistectomía laparoscópica temprana (dentro de los 7 días, idealmente en 72 h) si el riesgo quirúrgico lo permite", "clave", "Tratamiento definitivo."),
      mg("glucemia", "Control de la glucemia con insulina", "clave", "La hiperglucemia empeora la infección."),
      mg("colecistostomia", "Colecistostomía percutánea si no es candidato a cirugía", "util", "Alternativa en alto riesgo."),
      mg("alta", "Alta con analgésicos", "riesgoso", "Riesgo de gangrena y perforación."),
      mg("ursodesoxicolico", "Ácido ursodesoxicólico", "innecesario", "No trata la colecistitis."),
    ],
  },
  debrief: {
    diagnosis: "Colecistitis aguda litiásica moderada (Tokio II) en varón de 76 años con diabetes tipo 2 mal controlada.",
    pathologies: [
      { name: "Colecistitis aguda litiásica", role: "principal", why: "Obstrucción del cístico con inflamación." },
      { name: "Diabetes mal controlada", role: "asociada", why: "Riesgo de formas graves." },
      { name: "Cólico biliar, colangitis, pancreatitis", role: "diferencial", why: "Otras complicaciones biliares." },
    ],
    reasoning: [
      "Causa: cálculo enclavado en el cístico.",
      "Mecanismo: distensión, isquemia e inflamación química con infección secundaria.",
      "Consecuencia: dolor persistente, fiebre; en diabéticos y mayores, gangrena, perforación y sepsis con pocos síntomas.",
    ],
    epidemiology:
      "La colecistitis aguda es la complicación más frecuente de la litiasis biliar, muy prevalente en Argentina. En adultos mayores y diabéticos es más grave y con síntomas atenuados.",
    management: [
      "Ecografía y laboratorio; clasificar según Tokio.",
      "Antibiótico, hidratación y control metabólico.",
      "Colecistectomía temprana o drenaje según riesgo.",
      "Operar la litiasis sintomática para prevenir episodios.",
    ],
    sources: ["Sociedad Argentina de Cirugía — Recomendaciones sobre colecistitis.", "Guías de Tokio 2018."],
    pearls: ["Más de 6 h + fiebre + Murphy = colecistitis.", "Cirugía temprana.", "Diabéticos: formas graves con poco dolor."],
    pitfalls: ["Dar el alta como cólico.", "Demorar la cirugía semanas sin motivo."],
    tribunal: [
      qa("¿Qué son los criterios de Tokio para colecistitis?", "Signos locales (Murphy, masa o dolor en hipocondrio derecho), signos sistémicos (fiebre, leucocitosis, PCR) e imagen compatible; la gravedad es grado I leve, II moderada (más de 72 h, leucocitos mayores de 18.000, masa, inflamación local marcada) y III grave (falla de órganos)."),
      qa("¿Qué es la colecistitis alitiásica?", "Una colecistitis sin cálculos, en pacientes críticos (sepsis, quemados, nutrición parenteral, posoperatorios); tiene alta mortalidad y suele requerir colecistostomía."),
      qa("¿Qué es la colecistitis enfisematosa?", "Una forma grave con gas en la pared de la vesícula por gérmenes productores de gas (clostridios), más frecuente en varones diabéticos; tiene alto riesgo de perforación."),
    ],
  },
};
