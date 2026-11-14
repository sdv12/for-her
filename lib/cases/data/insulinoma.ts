import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const insulinoma: ClinicalCase = {
  id: "insulinoma-hipoglucemia",
  level: 3,
  area: "Endocrinología",
  setting: "Guardia",
  patient: { age: 44, ageUnit: "años", sex: "F", context: "No diabética. Engordó 8 kilos en un año porque 'come seguido para no descomponerse'." },
  frequency: "raro",
  intro: "Su marido: “A la mañana la encontré confundida, transpirada y hablando cosas raras. Le di jugo y se compuso.”",
  vitals: { TA: "126/78 mmHg", FC: "102 lpm", "T°": "36,4 °C", Glucemia: "38 mg/dl", Glasgow: "13/15" },
  anamnesis: [
    act("patron", "¿Cuándo le pasan los episodios?", "clave", "“En ayunas o si salteo comidas.”", "Hipoglucemia de ayuno."),
    act("triada", "¿Mejora al comer?", "clave", "“En minutos.”", "Tríada de Whipple."),
    act("farmacos", "¿Tiene acceso a insulina o pastillas para la diabetes?", "clave", "“Mi mamá es diabética y usa glibenclamida, pero yo no tomo.”", "Hipoglucemia facticia."),
    act("peso", "¿Cambió de peso?", "util", "“Engordé, como para evitarlo.”", "Hiperinsulinismo."),
    act("alcohol", "¿Toma alcohol?", "util", "“No.”", "Otras causas."),
    act("trabajo", "¿Trabaja?", "neutro", "“Soy contadora.”", "No orienta."),
  ],
  exam: [
    act("neuro", "Examen neurológico tras la glucosa", "clave", "Recupera totalmente.", "Neuroglucopenia reversible."),
    act("autonomico", "Signos autonómicos", "clave", "Sudoración y taquicardia durante el episodio.", "Respuesta adrenérgica."),
    act("general", "Estado general", "util", "Sobrepeso.", "Base."),
  ],
  studies: [
    study("Laboratorio", "critica", "Muestra crítica durante la hipoglucemia: insulina, péptido C, proinsulina, betahidroxibutirato y sulfonilureas", "clave", "Glucemia 38; insulina 18; péptido C alto; sulfonilureas negativas.", "Hiperinsulinismo endógeno."),
    study("Imágenes", "imagen", "TC o RM de páncreas y ecoendoscopia", "clave", "Tumor de 1,4 cm en cola del páncreas.", "Localización."),
    study("Laboratorio", "men1", "Calcio y PTH", "util", "Normales.", "Descartar MEN1."),
    study("Otros", "alta-glucosa", "Alta indicando comer seguido sin estudiar", "riesgoso", "No se hizo.", "Riesgo de hipoglucemia grave."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("insulinoma", "Insulinoma pancreático con hipoglucemia de ayuno", true, "Tríada de Whipple, insulina y péptido C altos con hipoglucemia, sulfonilureas negativas y tumor pancreático."),
      dx("facticia-insulina", "Hipoglucemia facticia por insulina", false, "El péptido C está alto."),
      dx("sulfonilureas", "Hipoglucemia por sulfonilureas", false, "Dosaje negativo."),
      dx("reactiva", "Hipoglucemia reactiva posprandial", false, "Es de ayuno."),
      dx("addison", "Insuficiencia suprarrenal", false, "Insulina alta."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cirugia", "Resección quirúrgica del tumor", "clave", "Curativa en la mayoría."),
      mg("comidas", "Comidas frecuentes y glucosa a mano hasta la cirugía", "clave", "Prevenir episodios."),
      mg("diazoxido", "Diazóxido si las hipoglucemias persisten", "util", "Inhibe la secreción de insulina."),
      mg("conducir", "No conducir hasta resolverlo", "clave", "Seguridad."),
      mg("insulina", "Indicar insulina por glucemias altas tras comer", "riesgoso", "Empeora."),
      mg("sin-estudio", "Diagnosticar ansiedad", "riesgoso", "Hipoglucemia documentada."),
    ],
  },
  debrief: {
    diagnosis: "Insulinoma de cola de páncreas con hipoglucemia de ayuno, en mujer de 44 años.",
    pathologies: [
      { name: "Insulinoma", role: "principal", why: "Tumor neuroendocrino productor de insulina." },
      { name: "Aumento de peso", role: "asociada", why: "Comer para evitar los síntomas." },
      { name: "Hipoglucemia facticia", role: "diferencial", why: "Insulina o sulfonilureas ocultas." },
    ],
    reasoning: [
      "Causa: tumor de células beta.",
      "Mecanismo: secreción de insulina que no se suprime con el ayuno.",
      "Consecuencia: neuroglucopenia, convulsiones y aumento de peso.",
    ],
    epidemiology:
      "Es raro pero es la causa más frecuente de hipoglucemia por hiperinsulinismo endógeno en adultos. En general es benigno y único. Se asocia a MEN1 en una minoría.",
    management: [
      "Tríada de Whipple.",
      "Muestra crítica.",
      "Localizar.",
      "Operar.",
    ],
    sources: ["Sociedad Argentina de Endocrinología y Metabolismo — Hipoglucemia del adulto no diabético.", "Endocrine Society — Evaluation and Management of Adult Hypoglycemic Disorders."],
    pearls: ["Whipple antes de estudiar.", "Péptido C separa insulina exógena.", "Pedí sulfonilureas."],
    pitfalls: ["Llamarlo ansiedad.", "No sacar la muestra en el episodio."],
    tribunal: [
      qa("¿Qué es la tríada de Whipple?", "Síntomas de hipoglucemia, glucemia baja documentada y alivio al corregirla."),
      qa("¿Cómo diferenciás insulina exógena de endógena?", "Con péptido C: bajo si es exógena, alto si es endógena o por sulfonilureas."),
      qa("¿Qué es la prueba de ayuno de 72 horas?", "Ayuno supervisado para provocar la hipoglucemia y tomar la muestra crítica."),
    ],
  },
};
