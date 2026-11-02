import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hipoglucemiaDm1: ClinicalCase = {
  id: "hipoglucemia-dm1-adolescente",
  level: 1,
  area: "Endocrinología",
  setting: "Guardia",
  patient: { age: 16, ageUnit: "años", sex: "F", context: "Diabética tipo 1 hace 5 años, con insulina basal y rápida. Juega al hockey." },
  frequency: "frecuente",
  intro: "“Después del partido se puso rara, temblaba, transpiraba y decía cosas sin sentido. Le dimos una gaseosa en el club y la trajimos.” (relata la entrenadora)",
  vitals: { TA: "116/72 mmHg", FC: "108 lpm", FR: "18 rpm", "T°": "36,4 °C", Glucemia: "48 mg/dl", Glasgow: "14/15" },
  anamnesis: [
    act("insulina", "¿Cuánta insulina se puso hoy y cuándo comió?", "clave", "“Me puse la rápida como siempre en el almuerzo, pero comí poco porque tenía nervios del partido.”", "Insulina sin la ingesta correspondiente."),
    act("ejercicio", "¿Ajustaste la insulina o la comida por el ejercicio?", "clave", "“No, me olvidé.”", "El ejercicio aumenta la captación de glucosa y la sensibilidad a la insulina: hay que bajar la dosis o sumar hidratos."),
    act("alcohol", "¿Tomaste alcohol?", "clave", "“No.”", "El alcohol inhibe la gluconeogénesis y prolonga la hipoglucemia."),
    act("sintomas", "¿Sentiste los síntomas antes?", "util", "“Casi no, últimamente no los siento.”", "Hipoglucemias inadvertidas por episodios repetidos."),
    act("frecuencia", "¿Cuántas hipoglucemias tuviste este mes?", "util", "“Varias, leves.”", "Requiere revisar el esquema."),
    act("posicion", "¿En qué posición jugás?", "neutro", "“Delantera.”", "No orienta."),
  ],
  exam: [
    act("neuro", "Estado de conciencia y examen neurológico", "clave", "Confusa pero responde, traga bien; sin foco.", "Puede recibir hidratos por boca si traga en forma segura."),
    act("autonomico", "Signos adrenérgicos", "clave", "Sudoración, temblor, taquicardia.", "Respuesta adrenérgica a la hipoglucemia."),
    act("sitios", "Sitios de inyección", "util", "Lipohipertrofia en abdomen.", "Inyectar en zonas con lipohipertrofia hace variable la absorción."),
  ],
  studies: [
    study("Laboratorio", "glucemia", "Glucemia capilar y control a los 15 minutos", "clave", "48 mg/dl y luego 96 mg/dl.", "Confirma y controla la respuesta (regla de los 15)."),
    study("Laboratorio", "hba1c", "Hemoglobina glicosilada (para el seguimiento)", "util", "6,4 %.", "Un control muy estricto aumenta el riesgo de hipoglucemias."),
    study("Imágenes", "tc", "Tomografía de cerebro", "innecesario", "No se realizó.", "Mejora con glucosa: no hay indicación."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hipo", "Hipoglucemia moderada (nivel 2) por insulina, ejercicio y baja ingesta, en DM1 con hipoglucemias inadvertidas", true, "Glucemia de 48 con síntomas adrenérgicos y neuroglucopénicos tras ejercicio sin ajuste de insulina ni hidratos, que mejora con azúcar."),
      dx("cad", "Cetoacidosis diabética", false, "La glucemia está baja."),
      dx("convulsion", "Crisis convulsiva", false, "No hubo movimientos ni poscrisis; la glucemia explica el cuadro."),
      dx("golpe-calor", "Golpe de calor", false, "Temperatura normal."),
      dx("panico", "Ataque de pánico", false, "La glucemia es baja."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("glucosa-oral", "15–20 g de hidratos de absorción rápida por boca y control a los 15 minutos; repetir si sigue menor de 70", "clave", "Regla de los 15."),
      mg("colacion", "Después, una colación con hidratos complejos", "clave", "Evita la recaída."),
      mg("educacion", "Educación: ajuste de insulina e hidratos para el ejercicio, glucagón para la familia y el club", "clave", "Previene nuevos episodios; el glucagón se usa si no puede tragar."),
      mg("revisar", "Revisar el esquema con el equipo de diabetes y rotar los sitios de inyección", "util", "Hipoglucemias frecuentes e inadvertidas."),
      mg("suspender-insulina", "Suspender la insulina hasta mañana", "riesgoso", "En DM1 sin insulina basal aparece cetoacidosis."),
      mg("dextrosa-ev", "Dextrosa al 50 % EV en bolo", "innecesario", "Traga bien: se trata por boca."),
    ],
  },
  debrief: {
    diagnosis: "Hipoglucemia nivel 2 por insulina rápida con baja ingesta y ejercicio sin ajuste, con hipoglucemias inadvertidas, en adolescente con DM1.",
    pathologies: [
      { name: "Hipoglucemia por insulina", role: "principal", why: "Glucemia menor de 54 con síntomas." },
      { name: "Hipoglucemias inadvertidas", role: "asociada", why: "Episodios repetidos reducen la respuesta de alarma." },
      { name: "Convulsión, golpe de calor, pánico", role: "diferencial", why: "Se descartan con la glucemia." },
    ],
    reasoning: [
      "Causa: insulina rápida sin la ingesta prevista y ejercicio que consume glucosa.",
      "Mecanismo: la insulina inyectada no se puede “apagar”; el músculo capta glucosa y el hígado no la libera.",
      "Consecuencia: síntomas adrenérgicos (temblor, sudor, taquicardia) y neuroglucopénicos (confusión, convulsiones, coma).",
    ],
    epidemiology:
      "La hipoglucemia es la complicación aguda más frecuente del tratamiento con insulina. Las personas con DM1 tienen en promedio varios episodios leves por semana y algunos graves por año. El ejercicio, el alcohol y las comidas salteadas son los desencadenantes habituales en adolescentes.",
    management: [
      "Consciente y traga: hidratos rápidos por boca (regla de los 15).",
      "Inconsciente: glucagón IM o intranasal, o dextrosa EV.",
      "Buscar la causa y ajustar el tratamiento.",
      "Educación a la persona, la familia, la escuela y el club.",
    ],
    sources: ["Sociedad Argentina de Diabetes — Recomendaciones sobre hipoglucemia.", "Sociedad Argentina de Pediatría — Consenso de diabetes tipo 1 en niños y adolescentes.", "Ley 23.753 de Diabetes."],
    pearls: ["Regla de los 15.", "Ejercicio: bajar insulina o sumar hidratos.", "Glucagón en casa y en el club."],
    pitfalls: ["Suspender la insulina basal en DM1.", "No buscar hipoglucemias inadvertidas."],
    tribunal: [
      qa("¿Cómo se clasifica la hipoglucemia?", "Nivel 1: glucemia menor de 70 y mayor o igual a 54 mg/dl; nivel 2: menor de 54 mg/dl; nivel 3 (grave): cualquier valor con alteración que requiere ayuda de otra persona."),
      qa("¿Qué es la tríada de Whipple?", "Síntomas compatibles con hipoglucemia, glucemia baja medida en ese momento y resolución de los síntomas al normalizarla; confirma hipoglucemia en personas sin diabetes."),
      qa("¿Qué es el efecto Somogyi y el fenómeno del alba?", "Somogyi: hiperglucemia matinal de rebote tras una hipoglucemia nocturna (se baja la insulina nocturna). Alba: hiperglucemia matinal por hormonas contrarreguladoras de la madrugada (se ajusta la basal). Se distinguen midiendo la glucemia a las 3 de la mañana."),
    ],
  },
};
