import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const iraRabdomiolisis: ClinicalCase = {
  id: "insuficiencia-renal-aguda-rabdomiolisis",
  level: 3,
  area: "Nefrourología",
  setting: "Guardia",
  patient: { age: 27, ageUnit: "años", sex: "M", context: "Crossfit y suplementos. Entrenó mucho con calor hace 2 días. Toma estatina por colesterol familiar." },
  frequency: "frecuente",
  intro: "“Me duelen los músculos como nunca, tengo los brazos hinchados y la orina me salió como Coca-Cola.”",
  vitals: { TA: "138/84 mmHg", FC: "98 lpm", FR: "18 rpm", "T°": "37,2 °C", "SatO₂": "98 %" },
  anamnesis: [
    act("ejercicio", "¿Qué entrenaste?", "clave", "“Cien dominadas con calor.”", "Sobreesfuerzo."),
    act("farmacos", "¿Suplementos, estatina, cocaína, anabólicos?", "clave", "“Estatina y creatina.”", "Agravantes."),
    act("orina", "¿Cuánto orinás?", "clave", "“Poco, y oscuro.”", "Oliguria."),
    act("alcohol", "¿Alcohol?", "util", "“Cerveza en la noche.”", "Rabdomiólisis."),
    act("trauma", "¿Aplastamiento o convulsión?", "util", "“No.”", "Causas."),
    act("marca", "¿Dónde entrenás?", "neutro", "“En un box.”", "No orienta."),
  ],
  exam: [
    act("musculo", "Músculos", "clave", "Bíceps duros y muy dolorosos; compartimentos blandos.", "Rabdomiólisis."),
    act("volemia", "Hidratación", "clave", "Mucosas secas.", "Hipovolemia."),
    act("neuro", "Fuerza y pulsos", "util", "Pulsos normales, sin déficit.", "Síndrome compartimental."),
  ],
  studies: [
    study("Laboratorio", "ck", "CK, creatinina, potasio, calcio, fósforo", "clave", "CK 92.000; creatinina 3,8; K 6,2; Ca bajo.", "Diagnóstico."),
    study("Laboratorio", "orina", "Orina completa", "clave", "Hemo positivo, sin hematíes.", "Mioglobinuria."),
    study("Electrofisiología", "ecg", "ECG", "clave", "T picudas.", "Hiperpotasemia."),
    study("Imágenes", "eco", "Ecografía renal", "util", "Normal.", "Excluye obstrucción."),
    study("Imágenes", "tc-contraste", "TC con contraste EV", "riesgoso", "No se realizó.", "Nefrotóxico."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("rabdo", "Insuficiencia renal aguda por rabdomiólisis inducida por ejercicio y estatina", true, "CK muy alta, orina oscura sin hematíes, IRA e hiperpotasemia."),
      dx("glomerulo", "Glomerulonefritis", false, "No hay hematíes ni cilindros."),
      dx("litiasis", "Litiasis", false, "Eco normal."),
      dx("prerrenal", "IRA prerrenal aislada", false, "CK de 92.000."),
      dx("miositis", "Miositis inflamatoria", false, "Aguda tras ejercicio."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("volumen", "Solución fisiológica abundante, con diuresis alta", "clave", "Previene daño."),
      mg("potasio", "Tratar hiperpotasemia", "clave", "Hay cambios en ECG."),
      mg("suspender", "Suspender estatina y suplementos", "clave", "Causas."),
      mg("dialisis", "Diálisis si no responde", "clave", "Hiperpotasemia refractaria, oliguria."),
      mg("aines", "Ibuprofeno para el dolor", "riesgoso", "Nefrotóxico."),
      mg("calcio-rutina", "Calcio para corregir hipocalcemia asintomática", "riesgoso", "Rebote de hipercalcemia."),
    ],
  },
  debrief: {
    diagnosis: "Insuficiencia renal aguda por rabdomiólisis por sobreesfuerzo, deshidratación y estatina, con hiperpotasemia, en varón de 27 años.",
    pathologies: [
      { name: "Rabdomiólisis", role: "principal", why: "Destrucción muscular." },
      { name: "IRA e hiperpotasemia", role: "asociada", why: "Complicaciones." },
      { name: "Glomerulonefritis, miositis", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: esfuerzo extremo, calor y estatina.",
      "Mecanismo: la mioglobina precipita en los túbulos y genera vasoconstricción.",
      "Consecuencia: necrosis tubular, potasio alto, arritmias.",
    ],
    epidemiology:
      "Se asocia con ejercicio intenso, trauma, drogas, estatinas e hipertermia. Es una causa frecuente de IRA en jóvenes sanos. El aumento de la actividad de alta intensidad en gimnasios ha hecho que aparezca cada vez más en guardias. La hidratación precoz evita muchas diálisis.",
    management: [
      "Sospecha ante orina oscura.",
      "CK e iono.",
      "Volumen.",
      "Diálisis si hace falta.",
    ],
    sources: ["Sociedad Argentina de Nefrología — Injuria renal aguda.", "KDIGO — Clinical Practice Guideline for Acute Kidney Injury."],
    pearls: ["Tira de orina positiva, sin hematíes.", "CK mayor de 5.000.", "Mucho volumen."],
    pitfalls: ["AINE.", "Olvidar el potasio."],
    tribunal: [
      qa("¿Cuáles son los criterios KDIGO de IRA?", "Aumento de creatinina 0,3 mg/dl en 48 horas, 1,5 veces la basal en 7 días o diuresis menor de 0,5 ml/kg/h por 6 horas."),
      qa("¿Cómo diferencias IRA prerrenal de NTA?", "Prerrenal: FENa menor de 1 %, orina concentrada. NTA: FENa mayor de 2 % y cilindros granulosos."),
      qa("¿Cuáles son los criterios de diálisis urgente?", "AEIOU: acidosis, electrolitos, intoxicaciones, sobrecarga de volumen y uremia."),
    ],
  },
};
