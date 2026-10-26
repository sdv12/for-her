import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const nacPediatrica: ClinicalCase = {
  id: "neumonia-nino",
  level: 1,
  area: "Pediatría",
  setting: "Guardia",
  patient: { age: 4, ageUnit: "años", sex: "M", context: "Junio. Va al jardín." },
  frequency: "frecuente",
  intro: "“Tiene fiebre alta hace dos días, tos con catarro y hoy respira rápido. Dice que le duele la panza.”",
  vitals: { FC: "128 lpm", FR: "38 rpm", "T°": "39,2 °C", "SatO₂": "95 % (aire ambiente)", Peso: "17 kg" },
  anamnesis: [
    act("evolucion", "¿Cómo empezó? ¿Venía resfriado?", "clave", "“Tuvo mocos unos días y después le subió mucho la fiebre, de golpe.”", "Un cuadro viral que se complica con fiebre alta y taquipnea sugiere neumonía bacteriana sobreagregada."),
    act("estado", "¿Juega, come, está decaído?", "clave", "“Está más decaído, pero toma líquidos y cuando le baja la fiebre juega un poco.”", "La tolerancia oral y el estado general definen si puede tratarse en casa."),
    act("vacunas", "¿Tiene las vacunas al día? ¿La del neumococo?", "clave", "“Sí, completas.”", "La antineumocócica conjugada del Calendario Nacional redujo mucho las neumonías graves."),
    act("atb", "¿Tomó antibióticos este mes?", "clave", "“No.”", "Uso reciente cambia la elección y puede hacer sospechar resistencias."),
    act("previos", "¿Tuvo neumonías antes o le dijeron que tiene asma?", "util", "“No, nunca.”", "Las neumonías recurrentes obligan a buscar causas de base (fibrosis quística, inmunodeficiencias, aspiración)."),
    act("abdomen", "¿Cómo es el dolor de panza? ¿Vomitó?", "util", "“Le duele arriba, a la derecha. No vomitó.”", "Las neumonías de base pueden dar dolor abdominal referido y confundirse con un cuadro quirúrgico."),
    act("mascota", "¿Tiene mascota?", "neutro", "“Un gato.”", "No orienta."),
  ],
  exam: [
    act("trabajo", "Trabajo respiratorio", "clave", "Taquipnea (38 rpm), tiraje subcostal leve, sin quejido ni aleteo.", "La taquipnea es el signo más sensible de neumonía en niños (≥ 40 rpm de 1 a 5 años según OMS; acá en el límite con fiebre)."),
    act("auscultacion", "Auscultación pulmonar", "clave", "Rales crepitantes y soplo tubario en la base derecha; hipoventilación local.", "Signos focales: neumonía bacteriana probable."),
    act("hidratacion", "Hidratación y perfusión", "clave", "Hidratado, buena perfusión.", "Junto con la saturación y el estado general, define tratamiento ambulatorio."),
    act("abdomen", "Palpación abdominal", "util", "Blando, sin defensa ni peritonismo.", "Aleja una causa quirúrgica del dolor."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de tórax", "util", "Consolidación en el lóbulo inferior derecho, sin derrame.", "Confirma y descarta derrame; en un niño con cuadro claro que se trata en casa no es imprescindible, pero ayuda en la duda."),
    study("Otros", "oximetria", "Oximetría de pulso", "clave", "95 %.", "Saturación ≥ 92 % permite el manejo ambulatorio."),
    study("Laboratorio", "lab", "Hemograma y PCR", "innecesario", "Leucocitos 18.500, PCR 75.", "No cambian la conducta en una neumonía no complicada que se trata en casa."),
    study("Microbiología", "hemocultivo", "Hemocultivos", "innecesario", "No se realizaron.", "Rendimiento muy bajo en neumonía ambulatoria; se piden en los que se internan."),
    study("Imágenes", "tc", "Tomografía de tórax", "innecesario", "No se realizó.", "Irradia sin beneficio; solo ante complicaciones."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("nac", "Neumonía adquirida en la comunidad, probablemente neumocócica, sin criterios de internación", true, "Fiebre alta, taquipnea, signos focales y consolidación lobar en un niño de 4 años con buena saturación y tolerancia oral."),
      dx("bronquiolitis", "Bronquiolitis", false, "Es de menores de 2 años, con sibilancias difusas, no un foco lobar."),
      dx("asma", "Crisis asmática", false, "Daría sibilancias difusas y respuesta al broncodilatador, sin foco."),
      dx("apendicitis", "Apendicitis", false, "El dolor abdominal se explica por la neumonía de base; el abdomen no tiene peritonismo."),
      dx("atipica", "Neumonía por Mycoplasma", false, "Más común en escolares y adolescentes, con inicio gradual, tos seca y poco compromiso; no da consolidación lobar con fiebre alta brusca."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("amoxi", "Amoxicilina 80–100 mg/kg/día en 2–3 tomas por 7 días, en domicilio", "clave", "Primera elección para la neumonía bacteriana de la comunidad en niños; cubre el neumococo."),
      mg("control", "Control en 48 h y pautas de alarma (dificultad para respirar, no tolera líquidos, decaimiento)", "clave", "La mejoría se espera en 48–72 h; si no, reevaluar (derrame, resistencia, otra causa)."),
      mg("antitermico", "Antitérmicos y buena hidratación", "clave", "Confort y sostén."),
      mg("macrolido", "Azitromicina como primera opción", "innecesario", "No cubre bien al neumococo; se reserva para sospecha de gérmenes atípicos en escolares."),
      mg("ceftriaxona", "Internación con ceftriaxona endovenosa", "innecesario", "No cumple criterios de internación (hipoxemia, mal estado, intolerancia oral, edad < 6 meses, complicaciones)."),
      mg("antitusivo", "Jarabe antitusivo", "riesgoso", "La tos ayuda a eliminar secreciones; los antitusivos no se recomiendan en niños y pueden ser peligrosos."),
    ],
  },
  debrief: {
    diagnosis: "Neumonía adquirida en la comunidad lobar derecha, no complicada, en niño de 4 años, para tratamiento ambulatorio.",
    pathologies: [
      { name: "Neumonía adquirida en la comunidad", role: "principal", why: "Fiebre, taquipnea, foco y consolidación." },
      { name: "Bronquiolitis y crisis asmática", role: "diferencial", why: "Otras causas de dificultad respiratoria en niños, con signos difusos." },
      { name: "Abdomen agudo", role: "diferencial", why: "La neumonía de base puede simularlo." },
      { name: "Neumonía atípica", role: "diferencial", why: "Escolares, inicio lento, tos seca." },
    ],
    reasoning: [
      "Causa: en niños de 1 a 5 años, los virus son la causa más común de neumonía; entre las bacterianas predomina Streptococcus pneumoniae.",
      "Mecanismo: la infección viral daña el epitelio respiratorio y facilita que el neumococo colonizante de la nasofaringe llegue al alvéolo y prolifere.",
      "Consecuencia: el exudado ocupa el alvéolo → consolidación, fiebre alta, taquipnea (para compensar la menor superficie de intercambio) y, si toca la pleura diafragmática, dolor abdominal referido.",
      "Por eso en el niño la frecuencia respiratoria es el mejor signo: la auscultación puede ser engañosa.",
    ],
    epidemiology:
      "La neumonía es una de las principales causas de internación y de muerte por infección en menores de 5 años en la Argentina, con fuerte estacionalidad invernal. Es algo más frecuente en varones y en niños que asisten a jardín, conviven con fumadores o viven en hacinamiento. La vacuna antineumocócica conjugada redujo las formas graves.",
    management: [
      "Diagnóstico clínico (fiebre, taquipnea, signos focales); radiografía si hay dudas, se interna o no mejora.",
      "Ambulatorio si satura ≥ 92 %, tolera vía oral y tiene buen estado: amoxicilina a dosis alta 7 días.",
      "Internar si hay hipoxemia, dificultad respiratoria grave, intolerancia oral, menor de 6 meses o complicaciones (derrame).",
      "Control a las 48 h y pautas de alarma.",
      "Prevención: vacunas (neumococo, gripe, Hib), lactancia, ambiente libre de humo.",
    ],
    sources: [
      "Sociedad Argentina de Pediatría — Recomendaciones para el manejo de las infecciones respiratorias agudas bajas en menores de 2 años y Consenso de neumonía adquirida en la comunidad en pediatría.",
      "Ministerio de Salud de la Nación — Calendario Nacional de Vacunación.",
    ],
    pearls: [
      "En niños, la taquipnea es el signo más sensible de neumonía.",
      "Neumonía de base derecha puede presentarse como dolor abdominal.",
      "Amoxicilina a dosis alta: primera línea.",
    ],
    pitfalls: ["Indicar macrólidos de entrada.", "Pedir laboratorio a todos.", "Dar antitusivos."],
  },
};
