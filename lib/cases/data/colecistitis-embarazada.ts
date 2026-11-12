import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const colecistitisEmbarazada: ClinicalCase = {
  id: "colecistitis-aguda-embarazada",
  level: 2,
  area: "Cirugía",
  setting: "Guardia",
  patient: { age: 30, ageUnit: "años", sex: "F", context: "Embarazo de 20 semanas. Cólicos biliares antes del embarazo." },
  frequency: "frecuente",
  intro: "“Hace 10 horas me duele arriba a la derecha, no se me pasa, y tengo fiebre y vómitos.”",
  vitals: { TA: "118/72 mmHg", FC: "106 lpm", FR: "20 rpm", "T°": "38,3 °C", "SatO₂": "98 %" },
  anamnesis: [
    act("duracion", "¿Más de 6 horas?", "clave", "“Diez horas.”", "Colecistitis."),
    act("previos", "¿Cálculos o cólicos?", "clave", "“Sí, antes del embarazo.”", "Litiasis."),
    act("obstetrico", "¿Contracciones o pérdidas? ¿Mueve el bebé?", "clave", "“Se mueve; sin pérdidas.”", "Bienestar fetal."),
    act("presion", "¿Cefalea o visión?", "util", "“No.”", "Preeclampsia."),
    act("ictericia", "¿Amarillo, orina oscura?", "util", "“No.”", "Vía biliar."),
    act("bebe", "¿Es el primero?", "neutro", "“Sí.”", "No orienta."),
  ],
  exam: [
    act("murphy", "Murphy", "clave", "Positivo.", "Colecistitis."),
    act("utero", "Útero y latidos", "clave", "Normales.", "Bienestar."),
    act("presion-ex", "Presión", "util", "Normal.", "Excluye HELLP."),
  ],
  studies: [
    study("Imágenes", "eco", "Ecografía abdominal", "clave", "Vesícula engrosada con cálculos y líquido perivesicular; Murphy ecográfico.", "Diagnóstico."),
    study("Laboratorio", "lab", "Hemograma, hepatograma, lipasa, plaquetas, LDH", "clave", "Leucocitos 16.000; hepatograma normal; plaquetas normales.", "Excluye HELLP y pancreatitis."),
    study("Otros", "fetal", "Monitoreo fetal", "util", "Normal.", "Bienestar."),
    study("Imágenes", "tc", "TC con contraste de rutina", "riesgoso", "No se realizó.", "Radiación innecesaria."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("colecistitis", "Colecistitis aguda litiásica en el segundo trimestre", true, "Dolor de más de 6 horas, fiebre, Murphy y ecografía."),
      dx("hellp", "HELLP", false, "Presión y laboratorio normales."),
      dx("apendicitis", "Apendicitis", false, "Ecografía con colecistitis."),
      dx("pielonefritis", "Pielonefritis", false, "Murphy y vesícula."),
      dx("higado-graso", "Hígado graso agudo del embarazo", false, "Es del tercer trimestre con insuficiencia hepática."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cirugia", "Colecistectomía laparoscópica, idealmente en el segundo trimestre", "clave", "Segura y evita recurrencia."),
      mg("atb", "Antibióticos compatibles (ampicilina-sulbactam)", "clave", "Infección."),
      mg("obstetricia", "Obstetricia y monitoreo fetal", "clave", "Seguridad del feto."),
      mg("analgesia", "Paracetamol y opioide; evitar AINE en la segunda mitad", "util", "Dolor."),
      mg("conservador", "Tratar conservadoramente hasta el parto en todos los casos", "riesgoso", "Alta recurrencia."),
      mg("aines", "AINE de rutina", "riesgoso", "Riesgo fetal desde las 20 semanas."),
    ],
  },
  debrief: {
    diagnosis: "Colecistitis aguda litiásica en embarazo de 20 semanas.",
    pathologies: [
      { name: "Colecistitis aguda", role: "principal", why: "Inflamación vesicular." },
      { name: "Embarazo", role: "asociada", why: "Modifica el manejo." },
      { name: "HELLP, apendicitis, pielonefritis", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: el embarazo favorece la formación de cálculos.",
      "Mecanismo: obstrucción del cístico e inflamación.",
      "Consecuencia: dolor, fiebre, riesgo de perforación y parto prematuro.",
    ],
    epidemiology:
      "Es la segunda causa de cirugía no obstétrica en el embarazo después de la apendicitis. Los estrógenos y la progesterona favorecen la litiasis. La laparoscopía es segura y el segundo trimestre es el mejor momento.",
    management: [
      "Ecografía.",
      "Excluir HELLP.",
      "Antibióticos.",
      "Cirugía.",
    ],
    sources: ["FASGO — Abdomen agudo en el embarazo.", "SAGES — Guidelines for Laparoscopy during Pregnancy."],
    pearls: ["Ecografía.", "Laparoscopía segura.", "Excluir HELLP."],
    pitfalls: ["Diferir siempre.", "AINE."],
    tribunal: [
      qa("¿Qué factores favorecen la litiasis en el embarazo?", "Estrógenos que aumentan el colesterol biliar y progesterona que enlentece la vesícula."),
      qa("¿Qué son los criterios de Tokio?", "Clasifican la gravedad de colecistitis y colangitis."),
      qa("¿Cuál es la principal cirugía no obstétrica en el embarazo?", "La apendicectomía, seguida por la colecistectomía."),
    ],
  },
};
