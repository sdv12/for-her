import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const claudicacion: ClinicalCase = {
  id: "enfermedad-arterial-periferica-claudicacion",
  level: 2,
  area: "Cardiovascular",
  setting: "Consultorio",
  patient: { age: 67, ageUnit: "años", sex: "M", context: "Tabaquista de 50 paquetes/año, diabético e hipertenso. Infarto hace 3 años." },
  frequency: "frecuente",
  intro: "“Cuando camino dos cuadras me duele la pantorrilla derecha y tengo que parar. Al minuto se me pasa y sigo.”",
  vitals: { TA: "150/86 mmHg", FC: "74 lpm", "T°": "36,3 °C", "SatO₂": "96 %", Glucemia: "164 mg/dl" },
  anamnesis: [
    act("patron", "¿El dolor aparece siempre a la misma distancia? ¿Calma al frenar parado?", "clave", "“Siempre a dos cuadras, y calma parado.”", "Claudicación vascular. La neurogénica mejora al sentarse o inclinarse."),
    act("reposo", "¿Te duele de noche o en reposo? ¿Heridas que no cierran?", "clave", "“No.”", "Busca isquemia crítica."),
    act("tabaco", "¿Cuánto fumás?", "clave", "“Un atado y medio.”", "Principal factor modificable."),
    act("impotencia", "¿Tuviste problemas de erección o dolor en los glúteos?", "util", "“Sí, algo de erección.”", "Enfermedad aortoilíaca si hay dolor en glúteos."),
    act("medicacion", "¿Qué tomás?", "util", "“Metformina y enalapril; dejé la aspirina y la estatina.”", "Prevención secundaria incompleta."),
    act("futbol", "¿Mirás fútbol?", "neutro", "“Siempre.”", "No orienta."),
  ],
  exam: [
    act("pulsos", "Pulsos de miembros inferiores", "clave", "Femoral presente, poplíteo y pedio derechos ausentes.", "Lesión femoropoplítea."),
    act("piel", "Piel y temperatura", "clave", "Piel fina, sin vello, uñas engrosadas, sin úlceras, frío relativo.", "Isquemia crónica."),
    act("buerger", "Palidez a la elevación, rubor al bajar", "util", "Positiva.", "Mala perfusión."),
  ],
  studies: [
    study("Otros", "itb", "Índice tobillo-brazo", "clave", "0,62 a la derecha, 0,91 a la izquierda.", "Menor o igual a 0,9 diagnostica la enfermedad."),
    study("Imágenes", "doppler", "Doppler arterial", "util", "Estenosis de femoral superficial derecha.", "Ubica la lesión."),
    study("Laboratorio", "lab", "Perfil lipídico, HbA1c, función renal", "clave", "LDL 142, HbA1c 8,4, creatinina normal.", "Control de factores."),
    study("Imágenes", "angio", "Angiografía de rutina", "innecesario", "No se realizó.", "Solo si se planea revascularizar."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("eap", "Enfermedad arterial periférica con claudicación intermitente (Fontaine IIb)", true, "Dolor reproducible que calma parado, pulsos ausentes, cambios tróficos e ITB de 0,62."),
      dx("neurogenica", "Claudicación neurogénica por estenosis lumbar", false, "Mejora al sentarse o inclinarse, con pulsos normales."),
      dx("tvp", "Trombosis venosa profunda", false, "Daría edema, sin claudicación."),
      dx("critica", "Isquemia crítica", false, "No hay dolor en reposo ni úlceras."),
      dx("aguda", "Isquemia arterial aguda", false, "Sería súbita, con dolor y palidez."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("tabaco", "Dejar de fumar", "clave", "Es lo que más reduce progresión y amputación."),
      mg("ejercicio", "Programa de caminata supervisada", "clave", "Mejora la distancia caminada."),
      mg("prevencion", "Aspirina o clopidogrel, estatina de alta intensidad, control de presión y diabetes", "clave", "El riesgo principal es cardiovascular."),
      mg("pie", "Cuidado de los pies", "util", "Previene úlceras."),
      mg("revascularizar", "Revascularizar de entrada", "innecesario", "Se reserva a isquemia crítica o síntomas que limitan tras el tratamiento."),
      mg("vasodilatador", "Solo vasodilatadores periféricos, sin prevención cardiovascular", "riesgoso", "No reemplazan la antiagregación, la estatina ni dejar de fumar."),
    ],
  },
  debrief: {
    diagnosis: "Enfermedad arterial periférica femoropoplítea derecha con claudicación intermitente, en varón de 67 años, con diabetes, tabaquismo e infarto previo.",
    pathologies: [
      { name: "Enfermedad arterial periférica", role: "principal", why: "Aterosclerosis de los miembros inferiores." },
      { name: "Alto riesgo cardiovascular", role: "asociada", why: "Enfermedad aterosclerótica generalizada." },
      { name: "Claudicación neurogénica, isquemia crítica, TVP", role: "diferencial", why: "Otras causas de dolor en la pierna." },
    ],
    reasoning: [
      "Causa: aterosclerosis por tabaco, diabetes, HTA y dislipemia.",
      "Mecanismo: la estenosis limita el aumento del flujo durante el ejercicio y el músculo sufre isquemia.",
      "Consecuencia: claudicación, isquemia crítica y amputación; infarto y ACV.",
    ],
    epidemiology:
      "Afecta a alrededor del 15 % de los mayores de 70 años; muchos no tienen síntomas. El tabaquismo y la diabetes son los principales factores de riesgo. Tiene más riesgo de infarto y ACV que de amputación, por lo que siempre se indica prevención cardiovascular.",
    management: [
      "ITB en personas de riesgo.",
      "Tabaco, ejercicio, antiagregación y estatina.",
      "Control de la diabetes y cuidado de los pies.",
      "Revascularización en isquemia crítica o discapacidad.",
    ],
    sources: ["Sociedad Argentina de Cardiología — Consenso de enfermedad vascular periférica.", "Colegio Argentino de Cirujanos Cardiovasculares — Recomendaciones."],
    pearls: ["Dolor que calma parado: vascular.", "ITB menor o igual a 0,9.", "ITB mayor de 1,4: vaso calcificado."],
    pitfalls: ["Tratar solo la pierna y no el riesgo cardiovascular.", "Olvidar el tabaco."],
    tribunal: [
      qa("¿Qué es la clasificación de Fontaine?", "I: asintomático. IIa: claudicación a más de 200 m. IIb: a menos de 200 m. III: dolor en reposo. IV: úlceras o gangrena."),
      qa("¿Cuáles son los síntomas del síndrome de Leriche?", "Claudicación de glúteos, disfunción eréctil y pulsos femorales ausentes, por oclusión aortoilíaca."),
      qa("¿Cuáles son las 6 P de la isquemia aguda?", "Dolor, palidez, ausencia de pulso, parestesias, parálisis y poiquilotermia (frío)."),
    ],
  },
};
