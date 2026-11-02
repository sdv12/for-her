import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const tabaquismo: ClinicalCase = {
  id: "tabaquismo-cesacion",
  level: 1,
  area: "Salud comunitaria",
  setting: "Consultorio",
  patient: { age: 48, ageUnit: "años", sex: "M", context: "Taxista. Hipertenso en tratamiento." },
  frequency: "muy-frecuente",
  intro: "“Vengo por el control de la presión. Mi hija me pidió que le pregunte por el cigarrillo: quiere que deje, y la verdad yo también.”",
  vitals: { TA: "138/86 mmHg", FC: "80 lpm", FR: "16 rpm", "SatO₂": "96 %", Peso: "88 kg" },
  anamnesis: [
    act("cantidad", "¿Cuántos cigarrillos fumás por día y desde qué edad?", "clave", "“Un atado por día desde los 16.”", "20 cigarrillos por 32 años = 32 paquetes/año: alto riesgo cardiovascular, de EPOC y de cáncer."),
    act("primer", "¿Cuánto tardás en fumar el primero después de despertarte?", "clave", "“Apenas me levanto, antes del mate.”", "Fumar en los primeros 5 minutos indica alta dependencia física (test de Fagerström)."),
    act("motivacion", "¿Querés dejar? ¿En cuánto tiempo?", "clave", "“Sí, este mes, si me ayudan.”", "Etapa de preparación: es el momento de fijar el día D y ofrecer tratamiento."),
    act("intentos", "¿Intentaste dejar antes? ¿Qué pasó?", "util", "“Dos veces; a la semana volví por la ansiedad.”", "Los intentos previos enseñan; la abstinencia predice recaída y justifica la medicación."),
    act("tos", "¿Tenés tos, catarro o falta de aire?", "util", "“Tos con catarro a la mañana.”", "Puede haber EPOC: indica espirometría."),
    act("convulsiones", "¿Tuviste convulsiones o trastornos de la alimentación? ¿Tomás alcohol?", "util", "“No. Un vino los domingos.”", "Contraindicaciones del bupropión."),
    act("hinchada", "¿De qué cuadro sos?", "neutro", "“De Talleres.”", "No orienta, aunque sirve para el vínculo."),
  ],
  exam: [
    act("ta", "Presión arterial, peso y cintura", "clave", "TA 138/86, IMC 29, cintura 102 cm.", "Suma riesgo cardiovascular."),
    act("pulmon", "Auscultación pulmonar", "util", "Espiración algo prolongada, sin sibilancias.", "Orienta a buscar obstrucción."),
    act("co", "Monóxido de carbono en aire espirado (cooximetría)", "util", "22 ppm.", "Confirma consumo y motiva; sirve para seguir la abstinencia."),
  ],
  studies: [
    study("Otros", "espirometria", "Espirometría", "util", "VEF1/CVF 0,72: sin obstrucción.", "Detecta EPOC en fumadores con síntomas."),
    study("Laboratorio", "lab", "Perfil lipídico y glucemia", "util", "LDL 148 mg/dl, glucemia 98.", "Calcular el riesgo cardiovascular global."),
    study("Imágenes", "tc", "Tomografía de tórax de baja dosis por rastreo de cáncer", "innecesario", "No se realizó.", "El rastreo se considera desde los 50 años con alta carga tabáquica en programas organizados; hoy no cambia la conducta."),
    study("Imágenes", "rx", "Radiografía de tórax anual de control", "innecesario", "No se realizó.", "No sirve como rastreo de cáncer de pulmón."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("tabaquismo", "Tabaquismo con alta dependencia a la nicotina, en etapa de preparación para dejar", true, "Fuma 20 por día con el primero al despertar, quiere dejar este mes y tiene intentos previos con abstinencia."),
      dx("consumo-leve", "Consumo ocasional sin dependencia", false, "La cantidad y el primer cigarrillo inmediato indican dependencia alta."),
      dx("precontemplacion", "Tabaquismo en etapa de precontemplación", false, "Quiere dejar en el próximo mes."),
      dx("epoc", "EPOC", false, "La espirometría no muestra obstrucción."),
      dx("ansiedad", "Trastorno de ansiedad", false, "La ansiedad al dejar es parte del síndrome de abstinencia."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("consejo", "Consejo breve claro y personalizado (estrategia de las 5 A) y fijar un día D", "clave", "Aumenta las tasas de abandono y es la base de todo tratamiento."),
      mg("farmacos", "Tratamiento farmacológico: terapia de reemplazo de nicotina combinada (parche más chicle) o vareniclina o bupropión", "clave", "Duplica o triplica la probabilidad de dejar en fumadores con dependencia."),
      mg("seguimiento", "Seguimiento en la primera semana y al mes; línea gratuita de cesación (0800-999-3040)", "clave", "La mayoría de las recaídas ocurre al principio."),
      mg("cigarrillo-electronico", "Pasar al cigarrillo electrónico", "riesgoso", "No está autorizado en Argentina (ANMAT) y no es un tratamiento recomendado."),
      mg("reducir", "Indicarle solo que fume menos, sin fecha ni tratamiento", "innecesario", "Reducir sin plan de abandono no disminuye el riesgo en forma relevante."),
    ],
  },
  debrief: {
    diagnosis: "Tabaquismo con alta dependencia a la nicotina (32 paquetes/año), en etapa de preparación, en varón hipertenso de 48 años con sobrepeso.",
    pathologies: [
      { name: "Tabaquismo con dependencia a la nicotina", role: "principal", why: "Consumo diario con dependencia física alta." },
      { name: "Hipertensión y sobrepeso", role: "asociada", why: "Suman riesgo cardiovascular." },
      { name: "EPOC", role: "diferencial", why: "Se descarta con la espirometría." },
    ],
    reasoning: [
      "Causa: la nicotina estimula receptores nicotínicos que liberan dopamina en el circuito de la recompensa.",
      "Mecanismo: el cerebro se adapta (más receptores) y, al bajar la nicotina, aparece la abstinencia: ansiedad, irritabilidad, hambre, insomnio.",
      "Consecuencia: consumo compulsivo y exposición a miles de tóxicos que causan enfermedad cardiovascular, EPOC y cánceres.",
    ],
    epidemiology:
      "El tabaco es la principal causa de muerte evitable. En Argentina fuma alrededor de uno de cada cinco adultos, más los varones, y causa decenas de miles de muertes por año. Dejar a cualquier edad reduce el riesgo, y a los 48 años gana años de vida.",
    management: [
      "Preguntar a todos por el consumo y registrarlo (Averiguar, Aconsejar, Asistir, Acompañar, Ayudar en la evaluación).",
      "Evaluar dependencia y motivación (etapas de cambio).",
      "Ofrecer consejería y tratamiento farmacológico a quienes fuman 10 o más cigarrillos o tienen dependencia.",
      "Seguimiento cercano y manejo de recaídas como parte del proceso.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de práctica clínica nacional de tratamiento de la adicción al tabaco.", "Ley 26.687 de control del tabaco."],
    pearls: ["Fumar en los primeros 5 minutos = dependencia alta.", "Consejo breve en cada consulta.", "Reemplazo de nicotina combinado es más eficaz."],
    pitfalls: ["No preguntar por el tabaco.", "Ofrecer el cigarrillo electrónico como tratamiento."],
    tribunal: [
      qa("¿Qué son las etapas de cambio de Prochaska?", "Precontemplación (no piensa dejar), contemplación (en los próximos seis meses), preparación (en el próximo mes), acción (dejó hace menos de seis meses) y mantenimiento; la intervención se adapta a cada etapa y la recaída es parte del proceso."),
      qa("¿Qué fármacos hay para dejar de fumar?", "Terapia de reemplazo de nicotina (parches, chicles, comprimidos), bupropión (contraindicado con convulsiones o trastornos de la alimentación) y vareniclina (agonista parcial nicotínico); la combinación de parche más una forma rápida es más eficaz."),
      qa("¿Qué beneficios tiene dejar de fumar?", "A las 24–48 h baja el monóxido de carbono; al año el riesgo coronario cae a la mitad; a los 5–15 años el riesgo de ACV se iguala al de un no fumador y baja el de cáncer de pulmón."),
    ],
  },
};
