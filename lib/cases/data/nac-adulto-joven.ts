import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const nacAdultoJoven: ClinicalCase = {
  id: "neumonia-adulto-joven-ambulatoria",
  level: 1,
  area: "Respiratorio",
  setting: "Guardia",
  patient: { age: 24, ageUnit: "años", sex: "M", context: "Repartidor en moto. Sano. Junio." },
  frequency: "muy-frecuente",
  intro: "“Hace tres días tengo fiebre de 39 con escalofríos, tos con catarro verde y me duele el costado derecho cuando respiro hondo.”",
  vitals: { TA: "124/76 mmHg", FC: "98 lpm", FR: "20 rpm", "T°": "38,8 °C", "SatO₂": "96 %" },
  anamnesis: [
    act("tos", "¿Cómo es la tos y el catarro?", "clave", "“Con catarro verde, a veces un poco oxidado.”", "Tos productiva con esputo herrumbroso: sugiere neumococo."),
    act("dolor", "¿El dolor cambia al respirar o toser?", "clave", "“Sí, me pincha al respirar hondo.”", "Dolor pleurítico: compromiso de la pleura vecina al foco."),
    act("comorbilidades", "¿Tenés alguna enfermedad, tomaste antibióticos en los últimos 3 meses?", "clave", "“Nada, ni un antibiótico.”", "Sin comorbilidades ni antibióticos recientes: amoxicilina es suficiente."),
    act("convivientes", "¿Con quién vivís? ¿Podés tomar la medicación y volver si empeora?", "clave", "“Con mi novia; sí, puedo.”", "Condiciones sociales para tratamiento ambulatorio."),
    act("tbc", "¿Tos de más de 15 días, sudores, pérdida de peso o contacto con TBC?", "util", "“No.”", "Descarta tuberculosis."),
    act("vih", "¿Te hiciste el test de VIH?", "util", "“Hace un año, negativo.”", "Neumonías recurrentes o graves en jóvenes obligan a pensar en VIH."),
    act("moto", "¿Qué moto tenés?", "neutro", "“Una 110.”", "No orienta."),
  ],
  exam: [
    act("pulmon", "Auscultación pulmonar", "clave", "Rales crepitantes y soplo tubario en base derecha; matidez a la percusión.", "Síndrome de condensación."),
    act("conciencia", "Estado de conciencia", "clave", "Lúcido.", "Sin confusión: CURB-65 0."),
    act("perfusion", "Perfusión", "util", "Relleno capilar normal.", "Sin signos de sepsis."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de tórax", "clave", "Consolidación con broncograma aéreo en el lóbulo inferior derecho.", "Confirma neumonía."),
    study("Laboratorio", "lab", "Hemograma, urea y glucemia", "util", "Leucocitos 15.800, urea 28.", "Urea normal: CURB-65 0."),
    study("Microbiología", "hemocultivos", "Hemocultivos y esputo", "innecesario", "No se realizó.", "En neumonías leves ambulatorias no cambian la conducta."),
    study("Imágenes", "tc", "Tomografía de tórax", "innecesario", "No se realizó.", "La radiografía alcanza."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("nac", "Neumonía adquirida en la comunidad leve (CURB-65 0), probable neumococo", true, "Fiebre, tos productiva, dolor pleurítico, síndrome de condensación y consolidación lobar en un joven sano, sin criterios de gravedad."),
      dx("bronquitis", "Bronquitis aguda", false, "Hay consolidación en la radiografía y signos focales."),
      dx("tbc", "Tuberculosis", false, "Evolución aguda de tres días con consolidación lobar."),
      dx("atipica", "Neumonía atípica por Mycoplasma", false, "Suele ser más gradual, con tos seca y radiografía intersticial."),
      dx("tep", "Tromboembolismo pulmonar", false, "Fiebre alta, esputo purulento y condensación: infección."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("amoxicilina", "Amoxicilina 1 g cada 8 horas por 5 a 7 días, tratamiento ambulatorio", "clave", "Tratamiento de elección en la NAC leve sin comorbilidades."),
      mg("control", "Control a las 48–72 h y pautas de alarma", "clave", "Debe mejorar la fiebre en 72 h."),
      mg("sintomaticos", "Paracetamol, hidratación y reposo relativo", "util", "Alivio de síntomas."),
      mg("quinolona", "Levofloxacina de entrada", "innecesario", "Se reservan las quinolonas respiratorias para alergias o casos seleccionados."),
      mg("internacion", "Internación", "innecesario", "CURB-65 0 sin otros factores: tratamiento ambulatorio."),
      mg("antitusivo", "Antitusivo con codeína", "riesgoso", "Retiene secreciones."),
    ],
  },
  debrief: {
    diagnosis: "Neumonía adquirida en la comunidad del lóbulo inferior derecho, leve (CURB-65 0), probable neumococo, en varón sano de 24 años.",
    pathologies: [
      { name: "Neumonía adquirida en la comunidad leve", role: "principal", why: "Consolidación con clínica compatible y sin criterios de gravedad." },
      { name: "Bronquitis, neumonía atípica, tuberculosis", role: "diferencial", why: "Otras causas de tos y fiebre." },
      { name: "VIH", role: "diferencial", why: "Considerarlo en neumonías de jóvenes." },
    ],
    reasoning: [
      "Causa: Streptococcus pneumoniae, el germen más frecuente de la NAC a toda edad.",
      "Mecanismo: el neumococo aspirado desde la nasofaringe llega al alvéolo, se multiplica y genera un exudado que llena los alvéolos (consolidación lobar).",
      "Consecuencia: fiebre, tos productiva, dolor pleurítico y condensación; en jóvenes sanos suele evolucionar bien con tratamiento ambulatorio.",
    ],
    epidemiology:
      "La NAC es una causa frecuente de consulta en todas las edades, con más casos en invierno. En adultos jóvenes sin comorbilidades la mayoría se trata en forma ambulatoria con muy baja mortalidad; los mayores de 65, fumadores, alcohólicos, inmunodeprimidos y con enfermedades crónicas tienen más riesgo.",
    management: [
      "Diagnóstico clínico y radiológico.",
      "Evaluar gravedad con CURB-65 y contexto social.",
      "Ambulatorio sin comorbilidades: amoxicilina; con comorbilidades: amoxicilina-clavulánico.",
      "Control a las 48–72 h; vacunación según grupo de riesgo.",
    ],
    sources: ["Sociedad Argentina de Infectología — Recomendaciones para el manejo de la neumonía adquirida en la comunidad.", "Asociación Argentina de Medicina Respiratoria — Guía de NAC."],
    pearls: ["CURB-65 0–1: ambulatorio.", "Amoxicilina en el joven sano.", "Control en 72 h."],
    pitfalls: ["Usar quinolonas de rutina.", "Internar sin criterios."],
    tribunal: [
      qa("¿Qué es el CURB-65?", "Un puntaje de gravedad de la NAC: Confusión, Urea mayor de 42 mg/dl (o BUN mayor de 19), frecuencia Respiratoria de 30 o más, presión (Blood pressure) sistólica menor de 90 o diastólica de 60 o menos, y edad de 65 o más. 0–1 ambulatorio, 2 considerar internación, 3 o más internación y evaluar UTI."),
      qa("¿Qué gérmenes causan NAC?", "Neumococo (el más frecuente), Haemophilus influenzae, Mycoplasma, Chlamydophila, Legionella, virus respiratorios (influenza, VSR, SARS-CoV-2), Staphylococcus aureus (posinfluenza) y gram negativos en pacientes con comorbilidades."),
      qa("¿Qué síndromes pulmonares se ven en el examen físico?", "Condensación (matidez, vibraciones aumentadas, soplo tubario, rales), derrame pleural (matidez, vibraciones abolidas, murmullo abolido, soplo pleurítico), neumotórax (timpanismo, vibraciones y murmullo abolidos) y atelectasia (matidez con vibraciones y murmullo disminuidos)."),
    ],
  },
};
