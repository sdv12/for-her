import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const apneaSueno: ClinicalCase = {
  id: "apnea-obstructiva-sueno",
  level: 2,
  area: "Respiratorio",
  setting: "Consultorio",
  patient: { age: 52, ageUnit: "años", sex: "M", context: "Chofer de colectivo de larga distancia. Hipertenso con tres fármacos sin buen control." },
  frequency: "frecuente",
  intro: "“Mi esposa dice que ronco como un tractor y que dejo de respirar de noche. De día me duermo en cualquier lado; la semana pasada cabeceé manejando.”",
  vitals: { TA: "156/98 mmHg", FC: "80 lpm", "SatO₂": "95 %", Peso: "112 kg" },
  anamnesis: [
    act("apneas", "¿Tu esposa vio que dejás de respirar? ¿Te despertás ahogado?", "clave", "“Sí, muchas veces, y me despierto con sensación de ahogo.”", "Apneas presenciadas: síntoma clave."),
    act("somnolencia", "¿Te dormís leyendo, mirando tele o manejando? (escala de Epworth)", "clave", "“Casi siempre; manejando, cabeceé.”", "Somnolencia diurna excesiva con riesgo vial."),
    act("hta", "¿Cuántos fármacos para la presión tomás?", "clave", "“Tres y sigue alta.”", "Hipertensión resistente: la apnea es una causa frecuente."),
    act("matinal", "¿Te levantás con dolor de cabeza o con la boca seca? ¿Orinás de noche?", "util", "“Dolor de cabeza y voy al baño dos veces.”", "Síntomas asociados."),
    act("alcohol", "¿Tomás alcohol o sedantes de noche?", "util", "“Un par de vasos de vino.”", "Empeoran la apnea."),
    act("rutas", "¿Qué ruta hacés?", "neutro", "“Córdoba–Buenos Aires.”", "No orienta."),
  ],
  exam: [
    act("cuello", "Circunferencia de cuello y orofaringe", "clave", "Cuello de 45 cm, Mallampati IV, úvula grande.", "Vía aérea estrecha."),
    act("imc", "IMC", "clave", "36.", "Obesidad: principal factor de riesgo."),
    act("nariz", "Nariz", "util", "Desviación septal leve.", "Puede afectar la adherencia al CPAP."),
  ],
  studies: [
    study("Otros", "poligrafia", "Poligrafía respiratoria domiciliaria o polisomnografía", "clave", "Índice de apneas-hipopneas de 48 por hora, saturación mínima 76 %.", "Apnea grave (IAH de 30 o más)."),
    study("Laboratorio", "lab", "Glucemia, lípidos, TSH", "util", "Glucemia 118, TSH normal.", "Comorbilidades metabólicas."),
    study("Imágenes", "tc-cuello", "Tomografía de cuello de rutina", "innecesario", "No se realizó.", "No es necesaria para el diagnóstico."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("saos", "Síndrome de apnea obstructiva del sueño grave con somnolencia diurna e hipertensión resistente", true, "Ronquidos, apneas presenciadas, somnolencia con cabeceo al manejar, obesidad, cuello ancho e IAH de 48."),
      dx("narcolepsia", "Narcolepsia", false, "No hay cataplejía y la poligrafía muestra apneas obstructivas."),
      dx("central", "Apnea central", false, "Los eventos son obstructivos en un obeso con ronquidos."),
      dx("hipotiroidismo", "Hipotiroidismo", false, "TSH normal."),
      dx("insomnio", "Insomnio", false, "No tiene dificultad para dormir, sino somnolencia."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cpap", "CPAP nocturno", "clave", "Tratamiento de elección en la apnea grave: mejora la somnolencia y la presión."),
      mg("manejo", "No manejar hasta controlar la somnolencia e informar sobre el riesgo laboral", "clave", "Riesgo de accidentes graves para él y terceros."),
      mg("peso", "Descenso de peso, evitar alcohol y sedantes de noche, dormir de costado", "clave", "Mejoran la apnea."),
      mg("hta", "Reevaluar la presión con CPAP", "util", "Puede mejorar."),
      mg("benzo", "Benzodiacepinas para dormir mejor", "riesgoso", "Deprimen la respiración y empeoran las apneas."),
      mg("cirugia", "Cirugía de paladar como primera opción", "innecesario", "Se reserva para casos seleccionados."),
    ],
  },
  debrief: {
    diagnosis: "Síndrome de apnea obstructiva del sueño grave (IAH 48) con somnolencia diurna excesiva, riesgo vial e hipertensión resistente, en chofer de 52 años con obesidad.",
    pathologies: [
      { name: "Apnea obstructiva del sueño grave", role: "principal", why: "Colapsos repetidos de la vía aérea superior." },
      { name: "Hipertensión resistente y riesgo de accidentes", role: "asociada", why: "Consecuencias." },
      { name: "Narcolepsia, apnea central, hipotiroidismo", role: "diferencial", why: "Otras causas de somnolencia." },
    ],
    reasoning: [
      "Causa: obesidad, cuello ancho y vía aérea estrecha; el alcohol relaja la musculatura.",
      "Mecanismo: al dormir, la vía aérea se colapsa, cae la saturación y hay microdespertares con descargas simpáticas.",
      "Consecuencia: sueño no reparador, somnolencia, hipertensión, arritmias, diabetes y accidentes.",
    ],
    epidemiology:
      "La apnea obstructiva del sueño afecta a alrededor del 10–30 % de los adultos según la definición, más a varones, obesos y mayores; la mayoría no está diagnosticada. Los conductores con apnea no tratada tienen varias veces más riesgo de accidentes.",
    management: [
      "Sospechar ante ronquidos, apneas, somnolencia, hipertensión resistente u obesidad.",
      "Poligrafía o polisomnografía.",
      "CPAP en moderada a grave sintomática; medidas generales.",
      "Evaluar la aptitud para conducir.",
    ],
    sources: ["Asociación Argentina de Medicina Respiratoria — Consenso de apneas del sueño.", "Agencia Nacional de Seguridad Vial — Recomendaciones sobre somnolencia al conducir."],
    pearls: ["Ronquido + apneas + somnolencia = apnea del sueño.", "HTA resistente: pensar apnea.", "Choferes con somnolencia: no manejar."],
    pitfalls: ["Dar benzodiacepinas.", "No advertir el riesgo vial."],
    tribunal: [
      qa("¿Cómo se clasifica la gravedad de la apnea?", "Por el índice de apneas-hipopneas por hora: leve 5–14, moderada 15–29, grave 30 o más."),
      qa("¿Qué es la escala de Epworth?", "Un cuestionario de 8 situaciones en las que se puntúa de 0 a 3 la probabilidad de dormirse; más de 10 indica somnolencia diurna excesiva."),
      qa("¿Qué causas de hipertensión resistente hay que buscar?", "Mala adherencia, efecto de guardapolvo blanco, sal, alcohol, AINE, apnea del sueño, hiperaldosteronismo primario, enfermedad renal y estenosis de arteria renal."),
    ],
  },
};
