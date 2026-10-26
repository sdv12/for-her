import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const menopausia: ClinicalCase = {
  id: "sindrome-climaterico",
  level: 1,
  area: "Ginecología y obstetricia",
  setting: "Consultorio",
  patient: { age: 51, ageUnit: "años", sex: "F", context: "Docente. No fuma." },
  frequency: "muy-frecuente",
  intro: "“Hace un año que no menstrúo y tengo calores todo el día, me despierto empapada varias veces a la noche. No duermo y estoy irritable. No doy más.”",
  vitals: { TA: "124/80 mmHg", FC: "76 lpm", Peso: "68 kg (IMC 25)" },
  anamnesis: [
    act("amenorrea", "¿Cuánto hace de su última menstruación?", "clave", "“Catorce meses.”", "Doce meses de amenorrea después de los 45 años define la menopausia: no hace falta laboratorio."),
    act("intensidad", "¿Cuántos sofocos por día? ¿Le afectan la vida diaria?", "clave", "“Diez o doce, y me despiertan. Me cuesta trabajar.”", "Síntomas vasomotores moderados a graves: indicación de tratamiento."),
    act("contra", "¿Tuvo cáncer de mama, trombosis, ACV, infarto o enfermedad del hígado? ¿Sangrado genital?", "clave", "“Nada de eso. Sangrado no.”", "Son contraindicaciones de la terapia hormonal; un sangrado posmenopáusico obliga a estudiar el endometrio."),
    act("utero", "¿Tiene útero? ¿La operaron?", "clave", "“Sí, nunca me operaron.”", "Con útero, el estrógeno se combina siempre con progestágeno."),
    act("genital", "¿Tiene sequedad vaginal o dolor en las relaciones?", "util", "“Sí, bastante.”", "Síndrome genitourinario de la menopausia: puede tratarse con estrógenos locales."),
    act("hueso", "¿Tuvo fracturas? ¿Hay osteoporosis en la familia?", "util", "“Mi mamá se fracturó la cadera.”", "Factores de riesgo de osteoporosis: orientan a densitometría."),
    act("perro", "¿Tiene perro?", "neutro", "“Una perrita.”", "No orienta."),
  ],
  exam: [
    act("mamas", "Examen mamario", "clave", "Normal.", "Necesario antes de una terapia hormonal."),
    act("ta", "Presión arterial e IMC", "clave", "124/80, IMC 25.", "El riesgo cardiovascular orienta la elección."),
    act("gine", "Examen ginecológico", "util", "Mucosa vaginal pálida y seca.", "Atrofia genitourinaria."),
    act("tiroides", "Palpación tiroidea", "util", "Normal.", "El hipertiroidismo puede dar calores y sudoración."),
  ],
  studies: [
    study("Laboratorio", "fsh", "FSH y estradiol", "innecesario", "FSH 78 mUI/ml.", "Con más de 45 años y 12 meses de amenorrea el diagnóstico es clínico: no hace falta."),
    study("Imágenes", "mamografia", "Mamografía", "clave", "BI-RADS 1.", "Pesquisa de cáncer de mama (indicada de los 50 a los 69 años) y requisito antes de la terapia hormonal."),
    study("Laboratorio", "pap", "Papanicolaou o test de VPH al día", "util", "Al día, negativo.", "Pesquisa de cáncer de cuello."),
    study("Laboratorio", "lipidos", "Perfil lipídico, glucemia y TSH", "util", "Normales.", "Evaluación de riesgo cardiovascular y del diferencial tiroideo."),
    study("Imágenes", "dmo", "Densitometría ósea", "util", "Osteopenia en columna (T-score −1,6).", "Indicada por el antecedente materno de fractura de cadera."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("climaterio", "Síndrome climatérico con síntomas vasomotores moderados a graves y síndrome genitourinario", true, "Menopausia confirmada clínicamente (14 meses de amenorrea a los 51) con sofocos, sudoración nocturna, insomnio y sequedad vaginal."),
      dx("hiper", "Hipertiroidismo", false, "Daría taquicardia, pérdida de peso, temblor y TSH suprimida."),
      dx("depresion", "Depresión", false, "Puede coexistir, pero no explica los sofocos ni la amenorrea."),
      dx("feo", "Feocromocitoma", false, "Crisis con hipertensión, palpitaciones, cefalea y sudoración; muy raro."),
      dx("premenopausia", "Perimenopausia", false, "Hay ciclos irregulares; la amenorrea de 12 meses ya define posmenopausia."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("thm", "Terapia hormonal: estrógeno (preferentemente transdérmico) más progestágeno, en la menor dosis eficaz, con reevaluación anual", "clave", "Es el tratamiento más eficaz de los síntomas vasomotores. En menores de 60 años o con menos de 10 años de menopausia, sin contraindicaciones, el beneficio supera los riesgos."),
      mg("habitos", "Actividad física, calcio y vitamina D, evitar alcohol y tabaco", "clave", "Protegen el hueso y el sistema cardiovascular."),
      mg("pesquisa", "Mantener la pesquisa de cáncer de mama y cuello", "clave", "Parte del cuidado en esta etapa."),
      mg("local", "Estrógenos vaginales en dosis bajas para la sequedad", "util", "Tratan el síndrome genitourinario con absorción sistémica mínima."),
      mg("estrogeno-solo", "Estrógeno solo, sin progestágeno", "riesgoso", "Con útero, el estrógeno sin progestágeno produce hiperplasia y cáncer de endometrio."),
      mg("fitos", "Isoflavonas de soja como única opción", "innecesario", "Su eficacia es baja y variable para síntomas moderados a graves."),
    ],
  },
  debrief: {
    diagnosis: "Síndrome climatérico con síntomas vasomotores moderados a graves y síndrome genitourinario de la menopausia, sin contraindicaciones para la terapia hormonal; osteopenia.",
    pathologies: [
      { name: "Síndrome climatérico", role: "principal", why: "Síntomas por la caída de estrógenos." },
      { name: "Síndrome genitourinario de la menopausia", role: "asociada", why: "Atrofia vaginal." },
      { name: "Osteopenia", role: "asociada", why: "La pérdida ósea se acelera después de la menopausia." },
      { name: "Hipertiroidismo", role: "diferencial", why: "Calor y sudoración." },
    ],
    reasoning: [
      "Causa: agotamiento de los folículos ováricos y caída de la producción de estrógenos.",
      "Mecanismo: el estrógeno bajo altera el centro termorregulador del hipotálamo (la zona termoneutral se estrecha), que dispara vasodilatación y sudoración ante mínimos cambios.",
      "Consecuencia: sofocos, sudoración nocturna, alteración del sueño e irritabilidad; atrofia del epitelio vaginal y urinario; aumento de la resorción ósea y cambio del perfil lipídico.",
      "Reponer estrógeno corrige la termorregulación; el progestágeno protege al endometrio.",
    ],
    epidemiology:
      "En la Argentina la edad promedio de la menopausia es de 49–51 años. Hasta el 75–80 % de las mujeres tienen síntomas vasomotores, que duran en promedio 7 años, y un cuarto los tiene moderados a graves. La osteoporosis afecta a una de cada cuatro mujeres mayores de 50 años.",
    management: [
      "Diagnóstico clínico (12 meses de amenorrea después de los 45).",
      "Evaluar síntomas, contraindicaciones y riesgos (mama, tromboembolismo, cardiovascular).",
      "Terapia hormonal en síntomas moderados a graves, en la ventana de oportunidad; alternativas no hormonales (ISRS, IRSN, gabapentina) si está contraindicada.",
      "Tratamiento local del síndrome genitourinario.",
      "Prevención: hábitos, densitometría según riesgo, pesquisa de cáncer de mama y cuello.",
    ],
    sources: [
      "Asociación Argentina para el Estudio del Climaterio (AAPEC) — Consenso de terapia hormonal de la menopausia.",
      "Ministerio de Salud de la Nación — Programa Nacional de Control de Cáncer de Mama.",
    ],
    pearls: ["Más de 45 años y 12 meses sin menstruación: no hace falta FSH.", "Con útero: estrógeno + progestágeno.", "Ventana de oportunidad: menos de 60 años o menos de 10 de menopausia."],
    pitfalls: ["Pedir FSH para diagnosticar.", "Estrógeno solo con útero.", "Negar la terapia hormonal por miedo sin evaluar riesgos."],
  },
};
