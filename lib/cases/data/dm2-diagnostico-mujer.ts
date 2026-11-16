import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const dm2DiagnosticoMujer: ClinicalCase = {
  id: "dm2-diagnostico-mujer",
  level: 1,
  area: "Endocrinología",
  setting: "CAPS",
  patient: { age: 44, ageUnit: "años", sex: "F", context: "Empleada doméstica. Tuvo diabetes gestacional hace 10 años. IMC 34." },
  frequency: "muy-frecuente",
  intro: "“Tengo mucha sed, me levanto a orinar de noche y me picó mucho la vulva este mes.”",
  vitals: { TA: "138/88 mmHg", FC: "78 lpm", Peso: "86 kg (IMC 34)", Glucemia: "238 mg/dl (al azar)" },
  anamnesis: [
    act("poliuria", "¿Desde cuándo la sed y las ganas de orinar?", "clave", "“Unos dos meses.”", "Síntomas cardinales."),
    act("gestacional", "¿Tuvo azúcar alta en algún embarazo?", "clave", "“En el último, me dieron insulina.”", "Riesgo de DM2 de hasta el 50 % a 10 años."),
    act("peso", "¿Bajó de peso?", "util", "“Un poco, sin querer.”", "Catabolismo."),
    act("familia", "¿Familiares con diabetes?", "util", "“Mi mamá.”", "Riesgo."),
    act("vision", "¿Ve borroso?", "util", "“A veces.”", "Cambios osmóticos del cristalino."),
    act("hijos", "¿Cuántos hijos tiene?", "neutro", "“Tres.”", "No orienta."),
  ],
  exam: [
    act("acantosis", "Piel del cuello y axilas", "clave", "Acantosis nigricans.", "Insulinorresistencia."),
    act("pies", "Pies con monofilamento", "clave", "Sensibilidad conservada, pulsos presentes.", "Basal."),
    act("vulva", "Genitales", "util", "Candidiasis vulvar.", "Por glucosuria."),
  ],
  studies: [
    study("Laboratorio", "glucemia-ayunas", "Glucemia en ayunas y HbA1c", "clave", "Glucemia 182 mg/dl, HbA1c 8,6 %.", "Confirma DM2."),
    study("Laboratorio", "basales", "Perfil lipídico, creatinina, cociente albúmina/creatinina en orina", "clave", "LDL 152, TG 260, creatinina 0,7, microalbuminuria 42 mg/g.", "Riesgo cardiovascular y nefropatía."),
    study("Otros", "fondo", "Fondo de ojo", "clave", "Sin retinopatía.", "Al diagnóstico en DM2."),
    study("Laboratorio", "peptido-c", "Péptido C y anticuerpos de rutina", "innecesario", "No se pidieron.", "Clínica típica de DM2."),
    study("Laboratorio", "ptog", "Prueba de tolerancia oral a la glucosa", "innecesario", "No se pidió.", "Ya hay diagnóstico con síntomas y glucemia al azar mayor de 200."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("dm2", "Diabetes mellitus tipo 2 de reciente diagnóstico con microalbuminuria, en mujer con antecedente de diabetes gestacional", true, "Síntomas cardinales, glucemia al azar mayor de 200, HbA1c 8,6 %, obesidad y acantosis."),
      dx("dm1", "Diabetes tipo 1", false, "Edad, obesidad, acantosis y sin cetosis."),
      dx("lada", "LADA", false, "Fenotipo de insulinorresistencia."),
      dx("prediabetes", "Prediabetes", false, "HbA1c mayor de 6,5 %."),
      dx("cushing", "Cushing", false, "Sin estigmas."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("metformina", "Metformina en dosis crecientes", "clave", "Primera línea."),
      mg("isglt2-glp1", "Considerar iSGLT2 o aGLP-1 por la albuminuria y la obesidad", "util", "Protección renal y cardiovascular."),
      mg("estilo", "Plan de alimentación y actividad física", "clave", "Base."),
      mg("ieca", "IECA o ARA II por la microalbuminuria", "clave", "Nefroprotección."),
      mg("estatina", "Estatina", "clave", "Riesgo cardiovascular."),
      mg("educacion", "Educación diabetológica", "util", "Autocuidado."),
      mg("insulina-ya", "Insulina en todos los diagnósticos nuevos", "innecesario", "Sin catabolismo grave ni HbA1c muy alta."),
      mg("glibenclamida", "Glibenclamida como primera elección", "riesgoso", "Hipoglucemias y aumento de peso."),
    ],
  },
  debrief: {
    diagnosis: "Diabetes tipo 2 de reciente diagnóstico con microalbuminuria y dislipemia, en una mujer de 44 años con obesidad y diabetes gestacional previa.",
    pathologies: [
      { name: "Diabetes tipo 2", role: "principal", why: "Insulinorresistencia con falla de célula beta." },
      { name: "Nefropatía incipiente, dislipemia", role: "asociada", why: "Complicaciones y comorbilidad." },
      { name: "Diabetes tipo 1, LADA", role: "diferencial", why: "Otras diabetes del adulto." },
    ],
    reasoning: [
      "Causa: obesidad, herencia y antecedente de diabetes gestacional.",
      "Mecanismo: insulinorresistencia que la célula beta no compensa.",
      "Consecuencia: hiperglucemia con daño micro y macrovascular desde el diagnóstico.",
    ],
    epidemiology:
      "En Argentina, la Encuesta Nacional de Factores de Riesgo muestra glucemia elevada en el 12,7 % de los adultos. La diabetes gestacional aumenta 7 a 10 veces el riesgo de DM2, por eso esas mujeres deben controlarse periódicamente.",
    management: [
      "Confirmar con criterios.",
      "Evaluar complicaciones.",
      "Metformina y estilo de vida.",
      "Protección renal y cardiovascular.",
    ],
    sources: ["Sociedad Argentina de Diabetes — Guía de tratamiento de la DM2.", "Ministerio de Salud de la Nación — Guía de práctica clínica nacional de diabetes tipo 2."],
    pearls: ["Síntomas + glucemia mayor de 200 = diagnóstico.", "Diabetes gestacional: controlar de por vida.", "Microalbuminuria: IECA y iSGLT2."],
    pitfalls: ["Glibenclamida de entrada.", "No buscar complicaciones al diagnóstico."],
    tribunal: [
      qa("¿Cuáles son los criterios diagnósticos de diabetes?", "Glucemia en ayunas de 126 o más, HbA1c de 6,5 % o más, 200 o más a las 2 horas de una PTOG, o glucemia al azar de 200 o más con síntomas."),
      qa("¿Qué estudios se piden al diagnóstico de DM2?", "Fondo de ojo, cociente albúmina/creatinina, creatinina, perfil lipídico, examen de pies y ECG."),
      qa("¿Por qué la metformina es primera línea?", "Porque baja la HbA1c, no da hipoglucemia, es neutra en peso, barata y tiene beneficio cardiovascular."),
    ],
  },
};
