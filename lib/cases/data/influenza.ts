import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const influenza: ClinicalCase = {
  id: "influenza-grupo-riesgo",
  level: 1,
  area: "Infectología",
  setting: "Guardia",
  patient: { age: 70, ageUnit: "años", sex: "M", context: "Junio. Diabético tipo 2. No se vacunó este año." },
  frequency: "muy-frecuente",
  intro: "“Desde ayer a la tarde me agarró de golpe una fiebre alta, escalofríos, dolor de cabeza y de todo el cuerpo. Tengo tos seca y estoy molido.”",
  vitals: { TA: "130/78 mmHg", FC: "100 lpm", FR: "20 rpm", "T°": "38,9 °C", "SatO₂": "95 %" },
  anamnesis: [
    act("inicio", "¿Cómo empezó?", "clave", "“De golpe, en pocas horas.”", "El inicio brusco con fiebre alta y mialgias es típico de la influenza, a diferencia del resfrío (gradual)."),
    act("tiempo", "¿Hace cuántas horas empezaron los síntomas?", "clave", "“Unas 20 horas.”", "El oseltamivir es más eficaz dentro de las 48 h, aunque en grupos de riesgo se indica igual después."),
    act("riesgo", "¿Qué enfermedades tiene?", "clave", "“Diabetes, tomo metformina. Nada más.”", "Edad de 65 o más y diabetes: grupo de riesgo de complicaciones."),
    act("disnea", "¿Le falta el aire o le duele el pecho?", "clave", "“No.”", "La disnea indicaría neumonía o complicación."),
    act("contactos", "¿Hay otros enfermos en la casa?", "util", "“Mi nieto tuvo lo mismo la semana pasada.”", "Contexto epidemiológico de circulación viral."),
    act("vacuna", "¿Se vacunó contra la gripe y el neumococo?", "util", "“Este año no.”", "La antigripal anual está indicada en mayores de 65 y en diabéticos."),
    act("perro", "¿Tiene mascotas?", "neutro", "“Un gato.”", "No orienta."),
  ],
  exam: [
    act("pulmonar", "Auscultación pulmonar", "clave", "Buena entrada de aire, sin rales ni foco.", "Sin neumonía al examen."),
    act("faringe", "Fauces", "util", "Faringe congestiva sin exudado.", "Compatible con infección viral."),
    act("hidratacion", "Hidratación y estado general", "util", "Hidratado, lúcido.", "Sin criterios de gravedad."),
    act("glucemia", "Glucemia capilar", "util", "198 mg/dl.", "Las infecciones descompensan la diabetes."),
  ],
  studies: [
    study("Microbiología", "hisopado", "Hisopado nasofaríngeo para influenza (test rápido o PCR)", "util", "Influenza A positivo.", "Confirma y aporta a la vigilancia; en grupos de riesgo no debe demorar el antiviral."),
    study("Imágenes", "rx", "Radiografía de tórax", "neutro", "Sin infiltrados.", "Útil si hay dudas de neumonía; con examen pulmonar normal puede no hacer falta."),
    study("Laboratorio", "lab", "Hemograma y PCR de rutina", "innecesario", "No se realizó.", "No cambia la conducta en un cuadro no complicado."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("gripe", "Influenza (gripe) en paciente de grupo de riesgo, sin complicaciones", true, "Inicio brusco con fiebre alta, mialgias, cefalea y tos seca en invierno, en un mayor de 65 diabético, sin neumonía."),
      dx("resfrio", "Resfrío común", false, "Inicio gradual con rinorrea y poca fiebre, sin mialgias intensas."),
      dx("nac", "Neumonía bacteriana", false, "Daría foco pulmonar y probablemente infiltrado."),
      dx("covid", "COVID-19", false, "Puede parecerse; el hisopado confirmó influenza."),
      dx("dengue", "Dengue", false, "Sin contexto epidemiológico en junio y con tos; el dengue no da síntomas respiratorios prominentes."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("oseltamivir", "Oseltamivir 75 mg cada 12 h por 5 días", "clave", "En grupos de riesgo reduce complicaciones e internaciones; se indica aun sin confirmación."),
      mg("sintomatico", "Paracetamol, hidratación y control de glucemias", "clave", "Sostén y prevención de la descompensación diabética."),
      mg("alarma", "Pautas de alarma: falta de aire, dolor de pecho, confusión, fiebre que no cede en 3–4 días", "clave", "Detectan neumonía viral o bacteriana secundaria."),
      mg("vacuna", "Vacunar contra la gripe y el neumococo cuando se recupere", "util", "Prevención según el Calendario Nacional."),
      mg("atb", "Amoxicilina-clavulánico preventiva", "innecesario", "No previene la sobreinfección y genera resistencia."),
      mg("aspirina", "Aspirina para la fiebre", "innecesario", "No aporta frente al paracetamol y suma riesgo de sangrado digestivo."),
    ],
  },
  debrief: {
    diagnosis: "Influenza A no complicada en varón de 70 años diabético no vacunado (grupo de riesgo).",
    pathologies: [
      { name: "Influenza", role: "principal", why: "Infección por virus influenza A." },
      { name: "Neumonía viral o bacteriana secundaria", role: "diferencial", why: "Complicación principal en grupos de riesgo." },
      { name: "COVID-19 y resfrío", role: "diferencial", why: "Otros cuadros respiratorios virales." },
    ],
    reasoning: [
      "Causa: virus influenza A o B, de transmisión respiratoria, con variaciones antigénicas que explican las epidemias anuales.",
      "Mecanismo: infecta el epitelio respiratorio y desencadena una respuesta de citoquinas sistémica.",
      "Consecuencia: fiebre alta de inicio brusco, mialgias, cefalea y tos; en grupos de riesgo, neumonía, descompensación de enfermedades crónicas y muerte.",
    ],
    epidemiology:
      "La influenza circula en la Argentina sobre todo entre mayo y agosto. Las complicaciones y muertes se concentran en mayores de 65 años, menores de 2 años, embarazadas y personas con enfermedades crónicas. La vacuna antigripal anual es gratuita para estos grupos.",
    management: [
      "Diagnóstico clínico en temporada; confirmación por hisopado para vigilancia.",
      "Oseltamivir en grupos de riesgo, internados o graves, idealmente en 48 h.",
      "Sostén y pautas de alarma.",
      "Vacunación antigripal anual y antineumocócica en grupos de riesgo.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de infecciones respiratorias agudas y Lineamientos de vacunación antigripal.", "Sociedad Argentina de Infectología — Recomendaciones de uso de antivirales."],
    pearls: ["Inicio brusco + fiebre alta + mialgias en invierno = gripe.", "Grupo de riesgo: oseltamivir aunque pasen 48 h.", "Vacuna antigripal todos los años."],
    pitfalls: ["Dar antibióticos.", "No vacunar al alta."],
    tribunal: [
      qa("¿Quiénes son grupos de riesgo para la gripe?", "Mayores de 65 años, niños de 6 a 24 meses, embarazadas y puérperas, personas con enfermedades crónicas (respiratorias, cardíacas, renales, diabetes, obesidad grave, inmunosupresión) y personal de salud."),
      qa("¿Qué diferencias hay entre gripe y resfrío?", "La gripe empieza de golpe con fiebre alta, mialgias, cefalea y gran decaimiento; el resfrío es gradual, con rinorrea, estornudos y poca o ninguna fiebre."),
      qa("¿Qué complicaciones tiene la influenza?", "Neumonía viral primaria, neumonía bacteriana secundaria (neumococo, S. aureus), descompensación de enfermedades crónicas, miocarditis, encefalitis y síndrome de Reye en niños con aspirina."),
    ],
  },
};
