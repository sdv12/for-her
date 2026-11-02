import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const sindromeMetabolico: ClinicalCase = {
  id: "obesidad-sindrome-metabolico",
  level: 1,
  area: "Endocrinología",
  setting: "CAPS",
  patient: { age: 45, ageUnit: "años", sex: "M", context: "Remisero. Fuma 10 cigarrillos por día. Su padre tuvo un infarto a los 55." },
  frequency: "muy-frecuente",
  intro: "“Vengo porque en el trabajo me dijeron que haga un control. Aumenté 15 kilos en cinco años, estoy cansado y ronco.”",
  vitals: { TA: "142/92 mmHg", FC: "82 lpm", "T°": "36,4 °C", Peso: "106 kg" },
  anamnesis: [
    act("habitos", "¿Qué comés en un día y cuánto te movés?", "clave", "“Comida rápida, gaseosa, todo el día sentado en el auto.”", "Sedentarismo y dieta hipercalórica."),
    act("familia", "¿Antecedentes familiares de infarto, diabetes?", "clave", "“Mi papá, infarto a los 55; mi mamá, diabética.”", "Riesgo cardiovascular familiar."),
    act("tabaco", "¿Cuánto fumás?", "clave", "“Diez por día.”", "Suma riesgo cardiovascular."),
    act("apnea", "¿Te dormís manejando? ¿Te dicen que parás de respirar?", "util", "“A veces cabeceo en los semáforos.”", "Posible apnea del sueño: riesgo vial."),
    act("intentos", "¿Intentaste bajar de peso?", "util", "“Dietas de la tele, sin éxito.”", "Experiencias previas y motivación."),
    act("auto", "¿Qué auto manejás?", "neutro", "“Un sedán.”", "No orienta."),
  ],
  exam: [
    act("antropometria", "Peso, talla, IMC y cintura", "clave", "IMC 34, cintura 112 cm.", "Obesidad grado I con obesidad abdominal."),
    act("ta-ex", "Presión arterial repetida", "clave", "142/92 y 140/90.", "Presión elevada."),
    act("cuello", "Cuello y orofaringe", "util", "Cuello ancho, orofaringe estrecha.", "Riesgo de apnea."),
  ],
  studies: [
    study("Laboratorio", "lab", "Glucemia, perfil lipídico, transaminasas, creatinina, ácido úrico", "clave", "Glucemia 112, triglicéridos 260, HDL 34, LDL 150, TGP 62.", "Glucemia alterada en ayunas, dislipemia aterogénica, probable hígado graso."),
    study("Laboratorio", "hba1c", "HbA1c", "util", "6,0 %.", "Prediabetes."),
    study("Otros", "riesgo", "Cálculo del riesgo cardiovascular (tablas de la OPS)", "clave", "Riesgo moderado a alto.", "Define la intensidad del tratamiento."),
    study("Imágenes", "tc-coronaria", "Tomografía coronaria de rutina", "innecesario", "No se realizó.", "No es un estudio de rastreo en este contexto."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("smet", "Síndrome metabólico con obesidad grado I, prediabetes, dislipemia aterogénica, presión elevada y tabaquismo", true, "Cintura de 112 cm, triglicéridos de 260, HDL de 34, glucemia de 112 y presión de 142/92: más de 3 criterios."),
      dx("obesidad-sola", "Obesidad sin otras alteraciones", false, "Tiene alteraciones metabólicas asociadas."),
      dx("dm2", "Diabetes tipo 2", false, "La glucemia y la HbA1c están en rango de prediabetes."),
      dx("hipotiroidismo", "Hipotiroidismo", false, "No explica el cuadro completo; puede descartarse con TSH."),
      dx("cushing", "Síndrome de Cushing", false, "Sin estrías violáceas, miopatía ni otros signos."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("estilo", "Plan alimentario, actividad física progresiva y meta de bajar 5–10 % del peso", "clave", "Mejora todos los componentes del síndrome."),
      mg("tabaco", "Cesación tabáquica", "clave", "La intervención con mayor impacto en el riesgo cardiovascular."),
      mg("estatina", "Estatina según riesgo cardiovascular", "clave", "Reduce eventos."),
      mg("apnea", "Estudiar apnea del sueño y advertir sobre manejar con somnolencia", "util", "Riesgo de accidentes."),
      mg("pastillas", "Pastillas para adelgazar de venta libre", "riesgoso", "Sin eficacia y con riesgos."),
      mg("dieta-extrema", "Dieta de 600 calorías por su cuenta", "riesgoso", "Insostenible, con pérdida de masa muscular y efecto rebote."),
    ],
  },
  debrief: {
    diagnosis: "Síndrome metabólico (obesidad abdominal, prediabetes, hipertrigliceridemia, HDL bajo y presión elevada) con tabaquismo, antecedente familiar y probable apnea del sueño, en varón de 45 años.",
    pathologies: [
      { name: "Síndrome metabólico", role: "principal", why: "Conjunto de factores de riesgo ligados a la resistencia a la insulina." },
      { name: "Tabaquismo y apnea del sueño", role: "asociada", why: "Suman riesgo." },
      { name: "Diabetes, hipotiroidismo, Cushing", role: "diferencial", why: "Se descartan." },
    ],
    reasoning: [
      "Causa: exceso calórico y sedentarismo sobre una predisposición genética.",
      "Mecanismo: la grasa visceral libera ácidos grasos y citoquinas que producen resistencia a la insulina e inflamación.",
      "Consecuencia: diabetes, hipertensión, dislipemia, hígado graso y enfermedad cardiovascular.",
    ],
    epidemiology:
      "En Argentina más del 60 % de los adultos tiene exceso de peso y alrededor de un tercio obesidad, según la Encuesta Nacional de Factores de Riesgo. El síndrome metabólico afecta a una gran parte de los adultos de mediana edad y duplica el riesgo cardiovascular.",
    management: [
      "Medir cintura, presión, glucemia y lípidos.",
      "Calcular el riesgo cardiovascular global.",
      "Cambios de estilo de vida, cesación tabáquica y tratamiento de cada factor.",
      "Considerar fármacos para la obesidad o cirugía bariátrica según IMC y comorbilidades (Ley 26.396).",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de práctica clínica nacional sobre diagnóstico y tratamiento de la obesidad en adultos.", "Encuesta Nacional de Factores de Riesgo."],
    pearls: ["Cintura alta + triglicéridos altos = resistencia a la insulina.", "5–10 % de peso cambia mucho.", "Tabaco primero."],
    pitfalls: ["Culpar sin dar herramientas.", "No calcular el riesgo global."],
    tribunal: [
      qa("¿Cuáles son los criterios de síndrome metabólico (ATP III armonizados)?", "Tres o más de: cintura aumentada (según población, por ejemplo mayor de 94–102 cm en varones y 80–88 cm en mujeres), triglicéridos de 150 o más, HDL menor de 40 en varones o 50 en mujeres, presión de 130/85 o más, y glucemia en ayunas de 100 o más."),
      qa("¿Cómo se clasifica la obesidad por IMC?", "Sobrepeso 25–29,9; obesidad grado I 30–34,9; grado II 35–39,9; grado III 40 o más."),
      qa("¿Cuándo se indica cirugía bariátrica?", "Con IMC de 40 o más, o de 35 o más con comorbilidades (diabetes, hipertensión, apnea), tras fracaso del tratamiento médico y con evaluación interdisciplinaria; la ley argentina la incluye en la cobertura."),
    ],
  },
};
