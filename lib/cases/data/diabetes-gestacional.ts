import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const diabetesGestacional: ClinicalCase = {
  id: "diabetes-gestacional",
  level: 2,
  area: "Ginecología y obstetricia",
  setting: "Consultorio",
  patient: { age: 31, ageUnit: "años", sex: "F", context: "Embarazo de 26 semanas. Segundo embarazo; el primer hijo pesó 4.200 g." },
  frequency: "frecuente",
  intro: "“Vengo con la prueba de la glucosa que me pidieron. Me siento bien.”",
  vitals: { TA: "118/72 mmHg", Peso: "82 kg (IMC pregestacional 29)" },
  anamnesis: [
    act("riesgo", "¿Hay diabetes en su familia? ¿Tuvo bebés grandes o diabetes en el embarazo anterior?", "clave", "“Mi papá es diabético. Mi primer hijo pesó más de cuatro kilos.”", "Antecedentes familiares, macrosomía previa y sobrepeso son factores de riesgo de diabetes gestacional."),
    act("sintomas", "¿Tiene mucha sed, orina mucho o tuvo infecciones urinarias?", "util", "“Orino mucho, pero creo que es por el embarazo.”", "Los síntomas son poco específicos en el embarazo."),
    act("habitos", "¿Cómo se alimenta? ¿Hace actividad física?", "clave", "“Como muchas harinas y gaseosa. No hago nada.”", "Base del tratamiento: plan alimentario y actividad."),
    act("movimientos", "¿Siente moverse al bebé?", "util", "“Sí, mucho.”", "Control de bienestar fetal."),
    act("hobby", "¿Qué le gusta hacer?", "neutro", "“Cocinar.”", "No orienta, aunque ayuda a la consejería."),
  ],
  exam: [
    act("altura", "Altura uterina", "clave", "29 cm (mayor que lo esperado para 26 semanas).", "Puede indicar macrosomía o polihidramnios."),
    act("ta", "Presión arterial y edemas", "clave", "118/72, sin edemas.", "La diabetes gestacional se asocia a preeclampsia."),
    act("latidos", "Latidos fetales", "util", "140 lpm.", "Bienestar fetal."),
  ],
  studies: [
    study("Laboratorio", "ptog", "Prueba de tolerancia oral a la glucosa con 75 g (24–28 semanas)", "clave", "Ayunas 98 mg/dl; a las 2 h, 162 mg/dl.", "Según el consenso argentino, una glucemia a las 2 h ≥ 140 mg/dl (o dos glucemias en ayunas ≥ 100) diagnostica diabetes gestacional."),
    study("Imágenes", "eco", "Ecografía obstétrica con estimación de peso y líquido amniótico", "util", "Peso fetal en percentil 85; líquido amniótico en el límite superior.", "Evalúa el crecimiento fetal, que orienta las metas y el tratamiento."),
    study("Laboratorio", "hba1c", "Hemoglobina glicosilada para diagnosticar", "innecesario", "5,6 %.", "No se usa para diagnosticar la diabetes gestacional: es poco sensible."),
    study("Laboratorio", "urocultivo", "Urocultivo", "util", "Negativo.", "Las ITU son más frecuentes en embarazadas con diabetes."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("dg", "Diabetes gestacional", true, "PTOG con glucemia a las 2 h de 162 mg/dl (≥ 140) en la semana 26, con factores de riesgo."),
      dx("pregestacional", "Diabetes pregestacional no diagnosticada", false, "Daría glucemias diagnósticas de diabetes desde el inicio del embarazo (ayunas ≥ 126 o HbA1c ≥ 6,5 %)."),
      dx("normal", "Embarazo normal", false, "La glucemia a las 2 h supera el punto de corte."),
      dx("intolerancia", "Glucemia alterada en ayunas", false, "La glucemia en ayunas es menor de 100; el diagnóstico surge de la glucemia a las 2 h."),
      dx("macrosomia", "Macrosomía fetal sin diabetes", false, "La PTOG es diagnóstica."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("plan", "Plan alimentario individualizado (fraccionado, sin azúcares simples) y actividad física", "clave", "Primera línea: la mayoría logra las metas solo con esto."),
      mg("automonitoreo", "Automonitoreo de glucemia (ayunas y posprandial) y control en 1–2 semanas", "clave", "Permite saber si alcanza las metas (ayunas < 95 mg/dl; 1 h posprandial < 140)."),
      mg("insulina", "Insulina si no alcanza las metas en 1–2 semanas", "clave", "Es el fármaco de elección en el embarazo."),
      mg("posparto", "PTOG a las 6–12 semanas del parto y controles posteriores", "util", "Tiene alto riesgo de desarrollar diabetes tipo 2."),
      mg("dieta-restrictiva", "Dieta muy restrictiva (menos de 1.200 kcal) para bajar de peso", "riesgoso", "Puede producir cetosis, dañina para el feto."),
      mg("cesarea", "Programar cesárea por la diabetes", "innecesario", "La diabetes gestacional no es por sí sola indicación de cesárea."),
    ],
  },
  debrief: {
    diagnosis: "Diabetes gestacional diagnosticada a las 26 semanas, con sobrepeso, antecedente de macrosomía y crecimiento fetal en el percentil 85.",
    pathologies: [
      { name: "Diabetes gestacional", role: "principal", why: "PTOG diagnóstica." },
      { name: "Riesgo de macrosomía fetal", role: "asociada", why: "Hiperinsulinismo fetal." },
      { name: "Diabetes pregestacional", role: "diferencial", why: "Se diagnostica con valores más altos o al inicio del embarazo." },
    ],
    reasoning: [
      "Causa: las hormonas placentarias (lactógeno placentario, progesterona, cortisol) aumentan la resistencia a la insulina en la segunda mitad del embarazo.",
      "Mecanismo: si el páncreas no compensa, aparece hiperglucemia materna. La glucosa atraviesa la placenta, pero la insulina no.",
      "Consecuencia: el feto responde con hiperinsulinismo → crecimiento excesivo (macrosomía), riesgo de distocia de hombros, hipoglucemia neonatal y, a largo plazo, obesidad.",
      "Después del parto la resistencia desaparece, pero queda una predisposición a diabetes tipo 2.",
    ],
    epidemiology:
      "La diabetes gestacional afecta a alrededor del 5–10 % de los embarazos en la Argentina, y aumenta junto con la obesidad. Es más frecuente con sobrepeso, edad mayor de 30 años, antecedentes familiares, macrosomía o diabetes gestacional previa y síndrome de ovario poliquístico. Hasta la mitad desarrollará diabetes tipo 2 en 10 años.",
    management: [
      "Tamizaje con glucemia en ayunas al inicio y PTOG con 75 g entre las 24 y 28 semanas.",
      "Diagnóstico: dos glucemias en ayunas ≥ 100 mg/dl o glucemia a las 2 h ≥ 140 mg/dl.",
      "Plan alimentario, actividad física y automonitoreo; insulina si no se alcanzan las metas.",
      "Control del crecimiento fetal y de la presión arterial.",
      "Reclasificación posparto con PTOG y prevención de diabetes tipo 2.",
    ],
    sources: [
      "Sociedad Argentina de Diabetes — Consenso de diabetes gestacional.",
      "Ministerio de Salud de la Nación — Guía de práctica clínica de diabetes gestacional.",
    ],
    pearls: ["PTOG 75 g entre 24–28 semanas; 2 h ≥ 140 = diabetes gestacional (consenso argentino).", "Insulina: fármaco de elección en el embarazo.", "PTOG posparto siempre."],
    pitfalls: ["Diagnosticar con HbA1c.", "Indicar dietas muy restrictivas.", "No controlar en el posparto."],
  },
};
