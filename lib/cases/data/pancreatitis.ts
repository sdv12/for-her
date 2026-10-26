import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const pancreatitis: ClinicalCase = {
  id: "pancreatitis-aguda-biliar",
  level: 3,
  area: "Gastroenterología",
  setting: "Guardia",
  patient: { age: 52, ageUnit: "años", sex: "F", context: "Le dijeron que tenía piedras en la vesícula hace dos años." },
  frequency: "frecuente",
  intro: "“Después de un almuerzo con mucha grasa me empezó un dolor muy fuerte arriba en la panza que se me va a la espalda como un cinturón. Vomité varias veces.”",
  vitals: { TA: "132/80 mmHg", FC: "108 lpm", FR: "20 rpm", "T°": "37,8 °C", "SatO₂": "95 %" },
  anamnesis: [
    act("dolor", "¿Cómo es el dolor? ¿Mejora en alguna posición?", "clave", "“Fijo, en la boca del estómago, me atraviesa a la espalda. Inclinada hacia adelante estoy un poco mejor.”", "Dolor epigástrico en cinturón que mejora al inclinarse: típico de pancreatitis."),
    act("alcohol", "¿Toma alcohol?", "clave", "“No, casi nada.”", "Las dos causas principales son la litiasis biliar y el alcohol."),
    act("farmacos", "¿Toma medicamentos? ¿Tiene triglicéridos altos?", "util", "“No. Los triglicéridos, no sé.”", "La hipertrigliceridemia (> 1.000 mg/dl) y algunos fármacos son otras causas."),
    act("ictericia", "¿Se puso amarilla o tiene la orina oscura? ¿Escalofríos?", "clave", "“No.”", "Orientan a coledocolitiasis persistente o colangitis, que cambian la conducta."),
    act("previos", "¿Tuvo dolores biliares antes?", "util", "“Varias veces, después de comer.”", "Cólicos biliares previos."),
    act("serie", "¿Qué hace los fines de semana?", "neutro", "“Cocino para la familia.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Palpación abdominal", "clave", "Dolor y defensa en epigastrio, sin peritonismo generalizado; ruidos hidroaéreos disminuidos.", "Inflamación pancreática; el íleo es frecuente."),
    act("hidratacion", "Hidratación y perfusión", "clave", "Mucosas secas, relleno capilar 3 s.", "La pancreatitis secuestra mucho líquido: la reposición es clave."),
    act("piel", "Piel y flancos", "util", "Sin equimosis en flancos ni periumbilical.", "Los signos de Grey Turner y Cullen indican pancreatitis hemorrágica grave."),
    act("ictericia", "Escleras", "util", "Anictérica.", "Sin colestasis evidente."),
  ],
  studies: [
    study("Laboratorio", "lipasa", "Lipasa (o amilasa)", "clave", "Lipasa 2.400 U/l (más de 3 veces el valor normal).", "Junto con el dolor típico, confirma el diagnóstico."),
    study("Imágenes", "eco", "Ecografía abdominal", "clave", "Vesícula con litiasis múltiple, colédoco de 6 mm, páncreas edematoso.", "Busca la causa biliar; es el primer estudio."),
    study("Laboratorio", "lab", "Hemograma, hepatograma, urea, creatinina, calcio, triglicéridos, PCR", "clave", "Hto 46 %, urea 48, bilirrubina 1,4, transaminasas en descenso, triglicéridos 180, calcio normal.", "Gravedad (urea, hematocrito, PCR) y causa (transaminasas: origen biliar)."),
    study("Imágenes", "tc-ya", "Tomografía con contraste al ingreso", "innecesario", "No se realizó.", "Con diagnóstico claro no está indicada en las primeras 72 h; se usa si hay dudas o mala evolución."),
    study("Otros", "cpre", "CPRE de urgencia", "innecesario", "No se realizó.", "Solo si hay colangitis u obstrucción biliar persistente."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("pancreatitis", "Pancreatitis aguda biliar leve", true, "Dolor epigástrico en cinturón, lipasa más de 3 veces lo normal y litiasis vesicular, sin falla de órganos."),
      dx("colecistitis", "Colecistitis aguda", false, "Dolor en hipocondrio derecho con Murphy positivo y lipasa normal."),
      dx("ulcera", "Úlcera perforada", false, "Abdomen en tabla y neumoperitoneo; la lipasa puede subir algo pero no tanto."),
      dx("iam", "Infarto inferior", false, "Siempre a descartar con ECG en dolor epigástrico; no explica la lipasa."),
      dx("isquemia", "Isquemia mesentérica", false, "Dolor desproporcionado al examen en un paciente con FA o vasculopatía, con acidosis láctica."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("fluidos", "Hidratación con Ringer lactato guiada por objetivos (diuresis, FC, hematocrito, urea)", "clave", "La reposición adecuada en las primeras horas es la medida más importante."),
      mg("analgesia", "Analgesia adecuada (incluidos opioides)", "clave", "El dolor es intenso; los opioides son seguros."),
      mg("alimentacion", "Alimentación oral precoz cuando tolere", "clave", "Reduce complicaciones infecciosas frente al ayuno prolongado."),
      mg("colecistectomia", "Colecistectomía en la misma internación", "clave", "En pancreatitis biliar leve, previene recurrencias."),
      mg("atb", "Antibióticos profilácticos (por ejemplo, imipenem)", "innecesario", "No previenen la infección de la necrosis ni la mortalidad."),
      mg("agresiva", "Hidratación agresiva sostenida (20 ml/kg/h durante horas)", "riesgoso", "La reposición excesiva aumenta la sobrecarga de volumen sin mejorar la evolución."),
    ],
  },
  debrief: {
    diagnosis: "Pancreatitis aguda biliar leve, sin falla de órganos ni complicaciones locales.",
    pathologies: [
      { name: "Pancreatitis aguda biliar", role: "principal", why: "Dolor típico, lipasa alta, litiasis." },
      { name: "Litiasis vesicular", role: "asociada", why: "Causa." },
      { name: "Colecistitis y colangitis", role: "diferencial", why: "Otras complicaciones de la litiasis." },
      { name: "Úlcera perforada e IAM inferior", role: "diferencial", why: "Otros dolores epigástricos graves." },
    ],
    reasoning: [
      "Causa: un cálculo migra por el colédoco y obstruye transitoriamente la ampolla de Vater.",
      "Mecanismo: el reflujo y la hipertensión en el conducto pancreático activan las enzimas dentro del páncreas (tripsina), que lo autodigieren.",
      "Consecuencia: inflamación local con edema, dolor intenso, íleo y secuestro de líquido; en las formas graves, respuesta inflamatoria sistémica con falla de órganos y necrosis.",
      "La gravedad depende de la falla de órganos, no del valor de la lipasa.",
    ],
    epidemiology:
      "La pancreatitis aguda es una de las causas más frecuentes de internación por patología digestiva. En la Argentina la causa principal es la litiasis biliar, más frecuente en mujeres de mediana edad; la alcohólica predomina en varones. El 80 % de los casos son leves; las graves tienen una mortalidad de hasta el 20–30 %.",
    management: [
      "Diagnóstico con 2 de 3: dolor típico, lipasa o amilasa > 3 veces el normal, imagen compatible.",
      "Hidratación guiada, analgesia, alimentación oral precoz.",
      "Gravedad según falla de órganos (criterios de Atlanta); unidad cerrada si es grave.",
      "Ecografía para la causa; CPRE solo con colangitis u obstrucción persistente.",
      "Colecistectomía en la misma internación en las biliares leves.",
    ],
    sources: ["Sociedad Argentina de Gastroenterología — Recomendaciones sobre pancreatitis aguda.", "Clasificación de Atlanta revisada."],
    pearls: ["Dolor en cinturón + lipasa > 3 veces = pancreatitis.", "Comer temprano, no ayuno prolongado.", "Biliar leve: colecistectomía en la misma internación."],
    pitfalls: ["Dar antibióticos profilácticos.", "Pedir tomografía al ingreso.", "Mantener ayuno con sonda sin necesidad."],
  },
};
