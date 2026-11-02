import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const abstinenciaAlcoholica: ClinicalCase = {
  id: "abstinencia-alcoholica-delirium-tremens",
  level: 3,
  area: "Toxicología",
  setting: "Internación",
  patient: { age: 54, ageUnit: "años", sex: "M", context: "Internado hace tres días por una fractura de tobillo. Toma un litro de vino y cerveza por día hace años, según la familia." },
  frequency: "frecuente",
  intro: "“Desde anoche está agitado, transpira mucho, tiembla y dice que ve bichos en la pared. Se quiere sacar el suero.” (relata la enfermera)",
  vitals: { TA: "168/98 mmHg", FC: "128 lpm", FR: "24 rpm", "T°": "38,2 °C", "SatO₂": "95 %", Glucemia: "74 mg/dl" },
  anamnesis: [
    act("ultimo", "¿Cuándo tomó alcohol por última vez?", "clave", "La esposa: “El día antes de la internación.”", "72 h sin alcohol: período de mayor riesgo de delirium tremens (48–96 h)."),
    act("cantidad", "¿Cuánto toma y desde hace cuánto?", "clave", "“Un litro de vino y cervezas todos los días, hace 20 años.”", "Consumo crónico de alto riesgo con dependencia."),
    act("previos", "¿Tuvo convulsiones o delirios cuando dejó otras veces?", "clave", "“Una vez convulsionó.”", "Las abstinencias previas graves predicen nuevas formas graves (efecto kindling)."),
    act("otras", "¿Toma pastillas para dormir u otras sustancias?", "util", "“Clonazepam a veces.”", "La abstinencia de benzodiacepinas se suma."),
    act("hepatico", "¿Tiene problemas del hígado?", "util", "“Le dijeron que tiene el hígado graso.”", "Influye en la elección de la benzodiacepina."),
    act("equipo", "¿De qué equipo es?", "neutro", "“De Boca.”", "No orienta."),
  ],
  exam: [
    act("conciencia", "Conciencia y orientación", "clave", "Desorientado en tiempo y lugar, atención fluctuante, alucinaciones visuales.", "Delirium: confusión con alteración de la atención."),
    act("autonomico", "Signos autonómicos", "clave", "Temblor grueso, sudoración profusa, midriasis.", "Hiperactividad simpática de la abstinencia."),
    act("cabeza", "Buscar traumatismo de cráneo", "util", "Sin lesiones.", "Descarta hematoma subdural."),
    act("infeccion", "Buscar foco infeccioso", "util", "Pulmones limpios, herida quirúrgica sana.", "Descarta infección como causa de la fiebre y la confusión."),
    act("wernicke", "Movimientos oculares y marcha", "clave", "Nistagmo horizontal.", "Sospechar encefalopatía de Wernicke."),
  ],
  studies: [
    study("Laboratorio", "lab", "Ionograma, magnesio, fósforo, glucemia, hepatograma, CPK", "clave", "Na 132, K 3,1, Mg 1,2, fósforo bajo, GGT 280.", "Alteraciones frecuentes que aumentan el riesgo de arritmias y convulsiones."),
    study("Otros", "ciwa", "Escala CIWA-Ar", "clave", "Puntaje 28.", "Abstinencia grave: guía la dosis de benzodiacepinas."),
    study("Imágenes", "tc", "Tomografía de cerebro", "util", "Normal.", "Indicada si hay traumatismo, foco o convulsiones atípicas."),
    study("Laboratorio", "alcoholemia", "Alcoholemia para decidir el tratamiento", "innecesario", "No se realizó.", "Lleva 72 h sin tomar; el diagnóstico es clínico."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("dt", "Síndrome de abstinencia alcohólica grave con delirium tremens y sospecha de encefalopatía de Wernicke", true, "A las 72 h de suspender el alcohol: delirium con alucinaciones visuales, temblor, sudoración, fiebre, taquicardia e hipertensión, con nistagmo."),
      dx("sepsis", "Delirium por sepsis", false, "No hay foco infeccioso y el contexto es de abstinencia."),
      dx("psicosis", "Brote psicótico", false, "Hay alteración de la conciencia y signos autonómicos."),
      dx("alucinosis", "Alucinosis alcohólica", false, "En la alucinosis la conciencia y la orientación están conservadas."),
      dx("hipoglucemia", "Hipoglucemia", false, "La glucemia es 74."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("tiamina", "Tiamina EV antes de cualquier solución con glucosa", "clave", "Previene y trata la encefalopatía de Wernicke."),
      mg("benzo", "Benzodiacepinas EV según la escala (diazepam o lorazepam si hay daño hepático)", "clave", "Tratamiento de elección: controlan la abstinencia y previenen convulsiones."),
      mg("electrolitos", "Reponer magnesio, potasio y fósforo; hidratar", "clave", "Corrige factores de arritmias y convulsiones."),
      mg("monitoreo", "Monitoreo en un área de cuidados especiales y ambiente tranquilo", "util", "El delirium tremens puede ser mortal."),
      mg("haloperidol-solo", "Haloperidol como único tratamiento", "riesgoso", "Baja el umbral convulsivo y no trata la abstinencia; solo como complemento."),
      mg("contencion", "Contención física sin sedación", "riesgoso", "Aumenta la agitación, la hipertermia y la rabdomiólisis."),
    ],
  },
  debrief: {
    diagnosis: "Síndrome de abstinencia alcohólica grave con delirium tremens a las 72 h de la suspensión, con hipomagnesemia, hipopotasemia y sospecha de encefalopatía de Wernicke, en varón de 54 años internado por fractura.",
    pathologies: [
      { name: "Delirium tremens", role: "principal", why: "Forma más grave de la abstinencia alcohólica." },
      { name: "Encefalopatía de Wernicke e hipomagnesemia", role: "asociada", why: "Déficits nutricionales del alcoholismo." },
      { name: "Sepsis, alucinosis, hematoma subdural", role: "diferencial", why: "Otras causas de confusión en bebedores." },
    ],
    reasoning: [
      "Causa: suspensión brusca del alcohol tras un consumo crónico (en este caso, por la internación).",
      "Mecanismo: el alcohol potencia el GABA e inhibe el glutamato; el cerebro se adapta. Al suspenderlo queda un exceso de excitación (glutamato, noradrenalina).",
      "Consecuencia: temblor y ansiedad (6–24 h), alucinaciones (12–48 h), convulsiones (24–48 h) y delirium tremens (48–96 h), con mortalidad si no se trata.",
    ],
    epidemiology:
      "El consumo problemático de alcohol es frecuente en Argentina, más en varones. Una parte importante de los pacientes internados por otras causas tiene consumo de riesgo, y la abstinencia aparece a los días de la internación. El delirium tremens ocurre en alrededor del 5 % de las abstinencias y su mortalidad sin tratamiento puede ser alta.",
    management: [
      "Preguntar a todos los internados por el consumo de alcohol (AUDIT).",
      "Tiamina antes de la glucosa.",
      "Benzodiacepinas según la escala CIWA-Ar; corregir electrolitos.",
      "Al alta, abordaje del consumo con salud mental y grupos de apoyo.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de práctica clínica sobre consumo de alcohol.", "Sociedad Argentina de Toxicología — Recomendaciones sobre abstinencia alcohólica."],
    pearls: ["48–96 h sin alcohol = delirium tremens.", "Tiamina antes que glucosa.", "Benzodiacepinas son el tratamiento."],
    pitfalls: ["No preguntar por el alcohol al internar.", "Usar solo antipsicóticos."],
    tribunal: [
      qa("¿Qué es la encefalopatía de Wernicke?", "Un cuadro agudo por déficit de tiamina, con la tríada de confusión, ataxia y oftalmoplejía (nistagmo, parálisis del VI par); se trata con tiamina EV a dosis altas y, si no se trata, puede evolucionar al síndrome de Korsakoff (amnesia con confabulación)."),
      qa("¿Cuál es la cronología de la abstinencia alcohólica?", "Abstinencia leve (temblor, ansiedad, taquicardia) desde las 6–24 h; alucinosis alcohólica a las 12–48 h con conciencia conservada; convulsiones a las 24–48 h; delirium tremens a las 48–96 h."),
      qa("¿Qué es el AUDIT?", "Un cuestionario de 10 preguntas de la OMS para detectar el consumo de riesgo, perjudicial y la dependencia del alcohol; su versión corta (AUDIT-C) sirve para el rastreo en la consulta."),
    ],
  },
};
