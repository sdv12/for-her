import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const demencia: ClinicalCase = {
  id: "demencia-alzheimer",
  level: 2,
  area: "Neurología",
  setting: "Consultorio",
  patient: { age: 79, ageUnit: "años", sex: "F", context: "Viuda, vive sola. La trae la hija." },
  frequency: "frecuente",
  intro: "“Hace dos años que mi mamá se olvida de todo: repite las mismas preguntas, dejó la hornalla prendida y se perdió volviendo del súper. Antes manejaba sola su plata.” (relata la hija)",
  vitals: { TA: "138/80 mmHg", FC: "72 lpm", Peso: "58 kg" },
  anamnesis: [
    act("curso", "¿Cómo empezó y cómo avanzó?", "clave", "“De a poco, sin saltos, cada vez un poco peor.”", "El inicio insidioso y la progresión gradual son típicos del Alzheimer (el vascular es escalonado; el delirium, agudo)."),
    act("funcion", "¿Qué cosas ya no puede hacer sola?", "clave", "“Pagar las cuentas, tomar bien los remedios, cocinar sin peligro.”", "La pérdida de autonomía en actividades instrumentales define demencia (no solo deterioro cognitivo leve)."),
    act("memoria", "¿Qué se olvida más: lo reciente o lo antiguo?", "util", "“Lo de ayer; de su juventud se acuerda todo.”", "Afecta primero la memoria reciente (hipocampo)."),
    act("farmacos", "¿Qué medicación toma?", "clave", "“Clonazepam para dormir y un antialérgico.”", "Benzodiacepinas y anticolinérgicos empeoran la cognición: se retiran."),
    act("animo", "¿Está triste, desinteresada o duerme mal?", "util", "“Algo apagada.”", "La depresión puede simular o acompañar una demencia (pseudodemencia)."),
    act("vascular", "¿Tuvo ACV, presión alta o diabetes?", "util", "“Presión alta controlada.”", "Factores de riesgo vascular."),
    act("alucinaciones", "¿Ve cosas que no están o tiene caídas frecuentes?", "util", "“No.”", "Alucinaciones visuales tempranas y parkinsonismo orientarían a demencia con cuerpos de Lewy."),
    act("tango", "¿Le gusta la música?", "neutro", "“Le encanta el folclore.”", "No orienta, aunque es útil para el cuidado."),
  ],
  exam: [
    act("mmse", "Evaluación cognitiva (Minimental, test del reloj)", "clave", "Minimental 19/30; desorientada en tiempo, falla en recuerdo diferido y en el reloj.", "Deterioro cognitivo moderado."),
    act("neuro", "Examen neurológico", "clave", "Sin déficit focal, sin parkinsonismo, marcha normal.", "Un foco orientaría a demencia vascular o lesión; la marcha alterada con incontinencia, a hidrocefalia normotensiva."),
    act("audicion", "Audición y visión", "util", "Hipoacusia leve bilateral.", "Los déficits sensoriales empeoran el rendimiento y deben corregirse."),
    act("depresion", "Escala de depresión geriátrica", "util", "Puntaje leve.", "La depresión no explica todo el cuadro."),
  ],
  studies: [
    study("Laboratorio", "lab", "B12, TSH, hemograma, glucemia, función renal y hepática, calcio, VDRL y VIH según el caso", "clave", "Normales.", "Descartan causas reversibles de deterioro cognitivo."),
    study("Imágenes", "rmn", "Resonancia (o tomografía) de cerebro", "clave", "Atrofia de hipocampos y cortical difusa, leve enfermedad de pequeño vaso.", "Descarta lesiones estructurales (tumor, hematoma, hidrocefalia) y apoya el diagnóstico."),
    study("Otros", "pet", "PET amiloide o biomarcadores en LCR de rutina", "innecesario", "No se realizaron.", "Se reservan para casos atípicos o jóvenes."),
    study("Electrofisiología", "eeg", "Electroencefalograma", "innecesario", "No se realizó.", "No aporta salvo sospecha de crisis o enfermedad priónica."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("alzheimer", "Demencia tipo Alzheimer, estadio moderado", true, "Deterioro progresivo e insidioso de la memoria reciente y otras funciones, con pérdida de autonomía, sin causas reversibles, con atrofia hipocampal."),
      dx("dcl", "Deterioro cognitivo leve", false, "Hay déficit pero sin pérdida de autonomía; acá ya no puede manejar sus cuentas ni su medicación."),
      dx("delirium", "Delirium", false, "Es agudo y fluctuante, con inatención."),
      dx("vascular", "Demencia vascular", false, "Curso escalonado, foco neurológico e infartos en las imágenes."),
      dx("pseudodemencia", "Depresión con pseudodemencia", false, "Quejas de memoria con poco esfuerzo en los tests y síntomas depresivos marcados."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("iache", "Inhibidor de la acetilcolinesterasa (donepecilo) con control de efectos adversos", "clave", "Mejora modestamente los síntomas en el Alzheimer leve a moderado."),
      mg("retirar", "Retirar de forma gradual el clonazepam y el antihistamínico", "clave", "Empeoran la memoria y aumentan caídas y delirium."),
      mg("seguridad", "Plan de seguridad: no cocinar sola, supervisión de la medicación, manejo del dinero, no manejar", "clave", "Previene accidentes y abusos."),
      mg("familia", "Apoyo y orientación a la familia, red de cuidados, planificación de decisiones futuras", "util", "La carga del cuidador es alta; planificar mientras la paciente puede participar."),
      mg("antipsicotico", "Antipsicótico de rutina para “calmarla”", "riesgoso", "Aumenta mortalidad y ACV en personas con demencia; solo para síntomas graves y por poco tiempo."),
      mg("vitaminas", "Suplementos “para la memoria”", "innecesario", "No tienen beneficio demostrado si no hay déficit."),
    ],
  },
  debrief: {
    diagnosis: "Demencia tipo Alzheimer en estadio moderado, en mujer de 79 años que vive sola, con fármacos que empeoran la cognición.",
    pathologies: [
      { name: "Enfermedad de Alzheimer", role: "principal", why: "Demencia neurodegenerativa más frecuente." },
      { name: "Deterioro cognitivo leve, delirium y depresión", role: "diferencial", why: "Se distinguen por la autonomía, el curso y el ánimo." },
      { name: "Causas reversibles (B12, hipotiroidismo, fármacos, hidrocefalia)", role: "diferencial", why: "Siempre se buscan." },
    ],
    reasoning: [
      "Causa: acumulación de beta-amiloide (placas) y proteína tau (ovillos neurofibrilares), con factores genéticos (APOE ε4) y vasculares.",
      "Mecanismo: pérdida progresiva de sinapsis y neuronas, empezando por el hipocampo y la corteza temporal; déficit colinérgico.",
      "Consecuencia: falla de la memoria reciente, luego del lenguaje, la orientación, las funciones ejecutivas y la conducta, con pérdida progresiva de la autonomía.",
    ],
    epidemiology:
      "La demencia afecta a alrededor del 12 % de los mayores de 65 años en la Argentina y su frecuencia se duplica cada 5 años después de los 65. El Alzheimer explica el 60–70 % de los casos. Es más frecuente en mujeres, en parte por su mayor expectativa de vida.",
    management: [
      "Confirmar el deterioro con evaluación cognitiva y funcional.",
      "Descartar causas reversibles (laboratorio, imágenes, fármacos, depresión).",
      "Inhibidores de colinesterasa en leve a moderada; memantina en moderada a grave.",
      "Manejo no farmacológico de la conducta, seguridad y apoyo al cuidador.",
      "Control de factores de riesgo vascular y planificación anticipada.",
    ],
    sources: ["Sociedad Neurológica Argentina — Guía de diagnóstico y tratamiento de las demencias.", "Ministerio de Salud de la Nación — Lineamientos para el abordaje de las demencias."],
    pearls: ["Pérdida de autonomía = demencia.", "Siempre buscar causas reversibles.", "Evitar benzodiacepinas y anticolinérgicos."],
    pitfalls: ["Atribuirlo a “la edad”.", "Indicar antipsicóticos de rutina."],
    tribunal: [
      qa("¿Cuáles son las causas reversibles de deterioro cognitivo?", "Déficit de B12, hipotiroidismo, fármacos (benzodiacepinas, anticolinérgicos), depresión, hidrocefalia normotensiva, hematoma subdural, tumores, sífilis y VIH, alcohol y alteraciones metabólicas."),
      qa("¿Qué es la hidrocefalia normotensiva?", "Una tríada de alteración de la marcha (magnética), incontinencia urinaria y deterioro cognitivo, con ventrículos dilatados; puede mejorar con derivación ventricular."),
      qa("¿Qué diferencias hay entre los principales tipos de demencia?", "Alzheimer: memoria reciente, progresiva. Vascular: escalonada, con focos y factores de riesgo. Cuerpos de Lewy: fluctuaciones, alucinaciones visuales, parkinsonismo, sensibilidad a antipsicóticos. Frontotemporal: inicio más joven con cambios de conducta o lenguaje."),
    ],
  },
};
