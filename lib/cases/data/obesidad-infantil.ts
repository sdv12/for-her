import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const obesidadInfantil: ClinicalCase = {
  id: "obesidad-infantil",
  level: 1,
  area: "Pediatría",
  setting: "CAPS",
  patient: { age: 9, ageUnit: "años", sex: "F", context: "Control escolar. Mamá con diabetes tipo 2. Pasa muchas horas con pantallas." },
  frequency: "muy-frecuente",
  intro: "“La mandaron de la escuela porque está excedida de peso. Ella dice que la cargan.”",
  vitals: { TA: "118/74 mmHg", FC: "90 lpm", "T°": "36,4 °C", Peso: "48 kg (talla 1,34 m)" },
  anamnesis: [
    act("alimentacion", "¿Qué come y toma en el día?", "clave", "“Gaseosa con todas las comidas, galletitas y snacks.”", "Alimentos ultraprocesados."),
    act("actividad", "¿Cuánto se mueve y cuánto usa pantallas?", "clave", "“Cinco horas de celular, no hace deporte.”", "Sedentarismo."),
    act("familia", "¿Familiares con diabetes u obesidad?", "clave", "“Mamá diabética.”", "Riesgo."),
    act("sueno", "¿Ronca o se despierta?", "util", "“Ronca.”", "Apnea del sueño."),
    act("animo", "¿Cómo se siente con lo que le dicen?", "util", "“Triste.”", "Bullying."),
    act("comida-favorita", "¿Qué le gusta comer?", "neutro", "“Milanesas.”", "No orienta."),
  ],
  exam: [
    act("imc", "IMC y curvas", "clave", "IMC 26,7, mayor al percentil 97 para la edad; talla en percentil 75.", "Obesidad."),
    act("acantosis", "Cuello y axilas", "clave", "Acantosis nigricans.", "Insulinorresistencia."),
    act("ta", "Presión arterial", "util", "Percentil 95.", "Hipertensión."),
  ],
  studies: [
    study("Laboratorio", "lab", "Glucemia, perfil lipídico, transaminasas", "clave", "Glucemia 102; TG 180; ALT 48.", "Comorbilidades."),
    study("Laboratorio", "tsh", "TSH", "util", "Normal.", "Excluye hipotiroidismo."),
    study("Otros", "curvas", "Curvas de crecimiento", "clave", "Talla normal: no endocrina.", "Obesidad exógena."),
    study("Laboratorio", "genetica", "Estudios genéticos de rutina", "innecesario", "No se realizaron.", "Sin rasgos sindrómicos ni inicio temprano extremo."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("obesidad", "Obesidad infantil con insulinorresistencia, dislipemia, hígado graso y presión elevada", true, "IMC mayor al percentil 97, acantosis, talla normal y laboratorio alterado."),
      dx("hipotiroidismo", "Hipotiroidismo", false, "TSH normal y talla normal."),
      dx("cushing", "Síndrome de Cushing", false, "Talla normal; en Cushing la talla cae."),
      dx("sobrepeso", "Sobrepeso", false, "IMC mayor al percentil 97."),
      dx("prader-willi", "Prader-Willi", false, "Sin rasgos sindrómicos."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("familia", "Intervención con toda la familia: agua en vez de gaseosa, menos ultraprocesados", "clave", "Cambios del entorno."),
      mg("actividad", "Una hora diaria de actividad física y menos de 2 horas de pantallas", "clave", "Hábitos."),
      mg("seguimiento", "Seguimiento frecuente sin culpabilizar", "clave", "Adherencia."),
      mg("escuela", "Trabajar el bullying con la escuela", "util", "Salud mental."),
      mg("dieta-estricta", "Dieta hipocalórica estricta", "riesgoso", "Afecta el crecimiento y favorece TCA."),
      mg("culpa", "Retarla por comer mal", "riesgoso", "Estigma y peor evolución."),
    ],
  },
  debrief: {
    diagnosis: "Obesidad infantil con insulinorresistencia, dislipemia, hígado graso y presión elevada, en niña de 9 años.",
    pathologies: [
      { name: "Obesidad infantil", role: "principal", why: "Exceso de grasa corporal." },
      { name: "Comorbilidades metabólicas", role: "asociada", why: "Insulinorresistencia, dislipemia, hígado graso." },
      { name: "Hipotiroidismo, Cushing", role: "diferencial", why: "Causas endocrinas (talla baja)." },
    ],
    reasoning: [
      "Causa: entorno obesogénico con bebidas azucaradas, ultraprocesados y sedentarismo.",
      "Mecanismo: balance energético positivo sostenido.",
      "Consecuencia: enfermedades metabólicas tempranas y riesgo de obesidad adulta.",
    ],
    epidemiology:
      "En Argentina casi la mitad de los niños y adolescentes tiene exceso de peso. La ley de etiquetado frontal busca reducir el consumo de ultraprocesados. La obesidad exógena conserva la talla.",
    management: [
      "IMC por percentil.",
      "Comorbilidades.",
      "Intervención familiar.",
      "Sin estigma.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Guía de práctica clínica de obesidad infantil.", "Ministerio de Salud de la Nación — Encuesta Nacional de Nutrición y Salud."],
    pearls: ["Talla normal: exógena.", "Acantosis.", "Cambia la familia, no solo el niño."],
    pitfalls: ["Dietas estrictas.", "Culpabilizar."],
    tribunal: [
      qa("¿Cómo se define obesidad en niños?", "IMC mayor al percentil 97 (o z mayor de 2) para edad y sexo según tablas OMS."),
      qa("¿Qué complicaciones busca en la consulta?", "Hipertensión, dislipemia, prediabetes, hígado graso, apnea del sueño y problemas emocionales."),
      qa("¿Qué es el etiquetado frontal?", "Octógonos negros que advierten exceso de azúcar, sodio, grasas y calorías."),
    ],
  },
};
