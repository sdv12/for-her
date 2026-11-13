import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const pancreatitisBiliarAdultaMayor: ClinicalCase = {
  id: "pancreatitis-biliar-adulta-mayor",
  level: 3,
  area: "Cirugía",
  setting: "Guardia",
  patient: { age: 83, ageUnit: "años", sex: "F", context: "Hipertensa, vive con su hija. Nunca la operaron de la vesícula aunque tenía piedras." },
  frequency: "frecuente",
  intro: "“Desde anoche tiene un dolor fuerte arriba de la panza que le va a la espalda y vomitó varias veces.” (relata la hija)",
  vitals: { TA: "104/64 mmHg", FC: "112 lpm", FR: "24 rpm", "T°": "37,8 °C", "SatO₂": "93 %", Glucemia: "184 mg/dl" },
  anamnesis: [
    act("dolor", "¿Cómo es el dolor?", "clave", "“En la boca del estómago, en cinturón, a la espalda.”", "Dolor pancreático."),
    act("vesicula", "¿Tiene piedras en la vesícula?", "clave", "“Sí, hace años.”", "Causa biliar."),
    act("alcohol", "¿Toma alcohol o tiene triglicéridos altos?", "clave", "“No.”", "Otras causas."),
    act("ictericia", "¿Se puso amarilla o la orina oscura?", "util", "“La orina más oscura.”", "Coledocolitiasis posible."),
    act("farmacos", "¿Toma diuréticos o fármacos nuevos?", "util", "“Hidroclorotiazida.”", "Causa farmacológica rara."),
    act("nietos", "¿Cuántos nietos tiene?", "neutro", "“Siete.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Abdomen", "clave", "Dolor epigástrico con defensa, distensión leve.", "Pancreatitis."),
    act("volemia", "Volemia", "clave", "Mucosas secas.", "Hipovolemia."),
    act("piel", "Piel y escleras", "util", "Subictericia.", "Obstrucción biliar."),
  ],
  studies: [
    study("Laboratorio", "lipasa", "Lipasa, hepatograma, hemograma, urea, calcio, triglicéridos", "clave", "Lipasa 12 veces lo normal; ALT 340; BT 2,8; urea 72; calcio 8,6.", "Pancreatitis biliar con BUN alto."),
    study("Imágenes", "eco", "Ecografía abdominal", "clave", "Litiasis vesicular, colédoco de 8 mm.", "Causa biliar."),
    study("Otros", "bisap", "BISAP y criterios de SIRS", "util", "BISAP 3.", "Riesgo de gravedad."),
    study("Imágenes", "tc-ingreso", "TC con contraste al ingreso", "innecesario", "No se realizó.", "El diagnóstico está hecho; se hace a las 72 horas si no mejora."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("pancreatitis-biliar", "Pancreatitis aguda biliar con predictores de gravedad, en adulta mayor", true, "Dolor típico, lipasa mayor de 3 veces, litiasis y patrón colestásico, BISAP 3."),
      dx("colecistitis", "Colecistitis aguda", false, "Lipasa muy alta y dolor en cinturón."),
      dx("colangitis", "Colangitis aguda", false, "Por ahora sin tríada completa; vigilar."),
      dx("iam-inferior", "IAM inferior", false, "Lipasa alta y litiasis."),
      dx("isquemia", "Isquemia mesentérica", false, "Causa biliar demostrada."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("hidratacion", "Hidratación con Ringer lactato guiada por diuresis", "clave", "Evita la sobrecarga en la adulta mayor."),
      mg("analgesia", "Analgesia adecuada, incluidos opioides", "clave", "Dolor intenso."),
      mg("nutricion", "Nutrición oral o enteral temprana", "clave", "Mejor que el ayuno prolongado."),
      mg("colecistectomia", "Colecistectomía en la misma internación al resolver", "util", "Previene recurrencias."),
      mg("atb-profilactico", "Antibióticos profilácticos", "riesgoso", "Sin beneficio y con resistencia."),
      mg("cpre-sin-colangitis", "CPRE urgente sin colangitis ni obstrucción persistente", "riesgoso", "Sin beneficio y con riesgos."),
    ],
  },
  debrief: {
    diagnosis: "Pancreatitis aguda biliar con predictores de gravedad, en mujer de 83 años.",
    pathologies: [
      { name: "Pancreatitis aguda biliar", role: "principal", why: "Causa más frecuente de pancreatitis." },
      { name: "Litiasis vesicular no tratada", role: "asociada", why: "Origen." },
      { name: "Colecistitis, colangitis", role: "diferencial", why: "Otras complicaciones biliares." },
    ],
    reasoning: [
      "Causa: cálculo que migra y obstruye transitoriamente la ampolla.",
      "Mecanismo: activación intrapancreática de enzimas.",
      "Consecuencia: inflamación local y sistémica con riesgo de falla orgánica.",
    ],
    epidemiology:
      "La litiasis biliar es la causa más frecuente de pancreatitis en Argentina, sobre todo en mujeres. La edad avanzada es un factor de gravedad. La colecistectomía en la misma internación evita recaídas.",
    management: [
      "Diagnóstico con dos de tres criterios.",
      "Hidratación prudente.",
      "Nutrición temprana.",
      "Colecistectomía.",
    ],
    sources: ["Sociedad Argentina de Gastroenterología — Pancreatitis aguda.", "ACG — Management of Acute Pancreatitis Guideline."],
    pearls: ["Edad es factor de gravedad.", "Ringer lactato.", "Operar la vesícula."],
    pitfalls: ["Antibióticos sin infección.", "TC temprana de rutina."],
    tribunal: [
      qa("¿Cuáles son los criterios diagnósticos de pancreatitis?", "Dos de tres: dolor típico, lipasa o amilasa mayor de tres veces y hallazgos en imágenes."),
      qa("¿Cuándo está indicada la CPRE?", "Ante colangitis u obstrucción biliar persistente."),
      qa("¿Qué define la pancreatitis grave según Atlanta?", "Falla orgánica que persiste más de 48 horas."),
    ],
  },
};
