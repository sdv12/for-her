import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const nac: ClinicalCase = {
  id: "neumonia-adulta-mayor",
  level: 2,
  area: "Respiratorio",
  setting: "Guardia",
  patient: { age: 81, ageUnit: "años", sex: "F", context: "Vive con la hija. Hipertensa. Junio." },
  frequency: "frecuente",
  intro: "“Desde ayer está rara, confundida, no quiere comer. Tose un poco y anoche tuvo escalofríos.” (relata la hija)",
  vitals: { TA: "98/58 mmHg", FC: "108 lpm", FR: "30 rpm", "T°": "38,2 °C", "SatO₂": "89 % (aire ambiente)" },
  anamnesis: [
    act("respiratorio", "¿Tiene tos con catarro, falta de aire o dolor al respirar?", "clave", "“Tose con catarro amarillento y dice que le duele el costado derecho cuando respira hondo.”", "Tos productiva y dolor pleurítico orientan a infección del parénquima con compromiso pleural."),
    act("conciencia", "¿Cómo estaba antes? ¿Desde cuándo está confundida?", "clave", "“Antes era independiente, hacía sus cosas. La confusión empezó ayer.”", "La confusión aguda es un criterio de gravedad (la C del CURB-65) y en adultos mayores puede ser la única manifestación de una neumonía."),
    act("vacunas", "¿Tiene la vacuna antigripal y la del neumococo?", "util", "“La antigripal del año pasado. La del neumococo creo que no.”", "Oportunidad de prevención; la antineumocócica está indicada en mayores de 65 en el Calendario Nacional."),
    act("internacion", "¿Estuvo internada o tomó antibióticos en los últimos tres meses?", "clave", "“No.”", "La exposición reciente a antibióticos u hospital aumenta el riesgo de gérmenes resistentes y cambia el esquema."),
    act("deglucion", "¿Se atraganta al comer o tomar líquidos?", "util", "“No, come bien.”", "La disfagia orienta a neumonía aspirativa (anaerobios, cobertura distinta)."),
    act("comorbilidades", "¿Qué otras enfermedades tiene y qué toma?", "util", "“Hipertensión, toma enalapril. Nada más.”", "Las comorbilidades (IC, EPOC, IRC, diabetes) aumentan el riesgo y orientan el lugar de tratamiento."),
    act("perros", "¿Tienen mascotas?", "neutro", "“Un perro.”", "No orienta en este caso."),
  ],
  exam: [
    act("pulmonar", "Auscultación y percusión pulmonar", "clave", "Base derecha: matidez, rales crepitantes, soplo tubario y aumento de vibraciones vocales.", "Síndrome de condensación: consolidación del parénquima con bronquios permeables."),
    act("perfusion", "Perfusión periférica y estado de hidratación", "clave", "Relleno capilar 3 s, mucosas secas, extremidades tibias.", "Hipoperfusión e hipotensión pueden indicar sepsis."),
    act("neuro", "Examen neurológico", "clave", "Desorientada en tiempo, sin foco motor ni signos meníngeos.", "Descarta un ACV o meningitis como causa de la confusión."),
    act("cardio", "Auscultación cardíaca", "util", "Taquicardia regular, sin soplos ni galope.", "Ayuda a descartar insuficiencia cardíaca."),
    act("pies", "Examen de los pies", "neutro", "Sin lesiones.", "No aporta a este cuadro."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de tórax frente y perfil", "clave", "Consolidación en lóbulo inferior derecho con broncograma aéreo; pequeño derrame pleural.", "Confirma la neumonía, su extensión y si hay derrame."),
    study("Laboratorio", "lab", "Hemograma, urea, creatinina, glucemia, ionograma", "clave", "Leucocitos 17.500 con neutrofilia, urea 62 mg/dl, creatinina 1,3 mg/dl, Na 134.", "La urea > 42 mg/dl (equivalente a > 7 mmol/l) suma un punto del CURB-65; además detecta insuficiencia renal."),
    study("Laboratorio", "gases", "Gasometría arterial con lactato", "util", "pO₂ 56 mmHg, pCO₂ 32, lactato 2,4 mmol/l.", "Confirma insuficiencia respiratoria y valora hipoperfusión."),
    study("Microbiología", "hemocultivos", "Hemocultivos (2) y cultivo de esputo antes del antibiótico", "util", "Hemocultivos: Streptococcus pneumoniae sensible a penicilina.", "En neumonías que se internan permiten ajustar el tratamiento; no deben demorar el antibiótico."),
    study("Laboratorio", "dimero", "Dímero D", "innecesario", "Elevado.", "Inespecífico en infección y en adultos mayores; no ayuda acá."),
    study("Imágenes", "tc", "Tomografía de tórax", "innecesario", "No se realizó.", "La radiografía alcanza; la TC se reserva para dudas diagnósticas o complicaciones."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("nac", "Neumonía adquirida en la comunidad grave (CURB-65 de 5)", true, "Fiebre, tos productiva, síndrome de condensación y consolidación radiológica. Confusión, urea alta, FR ≥ 30, TA diastólica ≤ 60 y edad ≥ 65: cumple los 5 criterios del CURB-65."),
      dx("ic", "Insuficiencia cardíaca descompensada", false, "Daría crepitantes bilaterales, ingurgitación yugular, edemas y cardiomegalia, sin fiebre ni condensación lobar."),
      dx("tep", "Tromboembolismo pulmonar", false, "Puede dar dolor pleurítico e hipoxemia, pero no fiebre alta con condensación y broncograma."),
      dx("acv", "ACV con confusión", false, "No hay foco neurológico, y la fiebre con condensación explica la confusión."),
      dx("aspirativa", "Neumonía aspirativa", false, "Requiere un factor predisponente (disfagia, alteración de conciencia previa, alcoholismo); acá no lo hay."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("internacion", "Internación (evaluar unidad cerrada por la gravedad)", "clave", "CURB-65 ≥ 3 es neumonía grave: requiere internación y considerar terapia intensiva."),
      mg("atb", "Ampicilina-sulbactam (o ceftriaxona) más claritromicina endovenosos, en la primera hora", "clave", "Esquema para NAC que se interna: cubre neumococo, Haemophilus y atípicos. La demora del antibiótico aumenta la mortalidad."),
      mg("oxigeno", "Oxígeno para saturación 92–96 %", "clave", "Corrige la insuficiencia respiratoria."),
      mg("fluidos", "Expansión con cristaloides y control de diuresis", "clave", "Hipotensión e hipoperfusión: es parte del manejo inicial de la sepsis."),
      mg("amoxi", "Amoxicilina oral y control ambulatorio en 48 h", "riesgoso", "Es el esquema para NAC leve (CURB-65 0–1) sin comorbilidades; en esta paciente pone en riesgo la vida."),
      mg("cipro", "Ciprofloxacina sola", "innecesario", "No cubre adecuadamente al neumococo, el germen más frecuente."),
      mg("vacunas", "Indicar antineumocócica y antigripal en el seguimiento", "util", "Prevención según el Calendario Nacional en mayores de 65."),
    ],
  },
  debrief: {
    diagnosis: "Neumonía adquirida en la comunidad grave (lóbulo inferior derecho, neumococo) con sepsis en mujer de 81 años.",
    pathologies: [
      { name: "Neumonía adquirida en la comunidad", role: "principal", why: "Síndrome de condensación con consolidación radiológica y fiebre." },
      { name: "Sepsis", role: "asociada", why: "Infección con disfunción de órganos: confusión, hipotensión, insuficiencia respiratoria." },
      { name: "Derrame pleural paraneumónico", role: "asociada", why: "Complicación frecuente: si es importante, hay que punzarlo." },
      { name: "Insuficiencia cardíaca", role: "diferencial", why: "Otra causa de disnea en adultos mayores." },
      { name: "Tromboembolismo pulmonar", role: "diferencial", why: "Dolor pleurítico e hipoxemia." },
    ],
    reasoning: [
      "Causa: Streptococcus pneumoniae, el germen más frecuente de la NAC en todas las edades adultas.",
      "Mecanismo: microaspiración de flora orofaríngea que supera las defensas (menor tos y aclaramiento mucociliar en el adulto mayor). El alvéolo se llena de exudado inflamatorio.",
      "Consecuencia: el alvéolo ocupado no ventila pero sigue perfundido (shunt) → hipoxemia. El tejido consolidado transmite mejor el sonido → soplo tubario y vibraciones aumentadas. La respuesta inflamatoria sistémica da fiebre, taquicardia y, en la sepsis, hipotensión y confusión.",
      "En el adulto mayor la fiebre y la tos pueden faltar: la confusión o la caída suele ser la forma de presentación.",
    ],
    epidemiology:
      "La neumonía es una de las principales causas de muerte por infección en la Argentina, y la mortalidad se concentra en mayores de 65 años. La incidencia aumenta con la edad y en invierno, y es algo mayor en varones. Tabaquismo, EPOC, diabetes, insuficiencia cardíaca y alcoholismo son factores de riesgo.",
    management: [
      "Confirmar con radiografía y estratificar la gravedad con CURB-65 (o CRB-65 sin laboratorio): 0–1 ambulatorio, 2 internación en sala, ≥ 3 grave.",
      "Ambulatoria sin comorbilidades: amoxicilina; con comorbilidades: amoxicilina-clavulánico.",
      "Internación en sala: ampicilina-sulbactam o ceftriaxona, con macrólido si se sospechan atípicos; grave: betalactámico más macrólido endovenosos.",
      "Antibiótico en la primera hora, hemocultivos previos sin demorarlo, oxígeno y manejo de la sepsis.",
      "Prevención: antigripal anual y antineumocócica en mayores de 65 y grupos de riesgo.",
    ],
    sources: [
      "Sociedad Argentina de Infectología y Asociación Argentina de Medicina Respiratoria — Recomendaciones intersociedades para neumonía adquirida en la comunidad.",
      "Ministerio de Salud de la Nación — Lineamientos de vacunación antineumocócica en adultos.",
    ],
    pearls: [
      "CURB-65: Confusión, Urea > 42 mg/dl, Respiratoria ≥ 30, Blood pressure (TAS < 90 o TAD ≤ 60), edad ≥ 65.",
      "En el adulto mayor, confusión aguda + taquipnea: buscá la neumonía.",
      "El antibiótico no espera a los cultivos.",
    ],
    pitfalls: ["Mandar a casa con amoxicilina a una paciente con CURB-65 alto.", "Atribuir la confusión a la edad.", "Esperar la radiografía para empezar el antibiótico en una sepsis."],
  },
};
