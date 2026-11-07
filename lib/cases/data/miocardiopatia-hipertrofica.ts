import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const miocardiopatiaHipertrofica: ClinicalCase = {
  id: "miocardiopatia-hipertrofica-sincope",
  level: 3,
  area: "Cardiovascular",
  setting: "Guardia",
  patient: { age: 17, ageUnit: "años", sex: "M", context: "Juega al fútbol en un club. Sin apto físico este año. Su tío murió de golpe a los 32." },
  frequency: "poco-frecuente",
  intro: "“Estaba jugando, me mareé y me desmayé en la cancha. Me desperté enseguida, pero me dolía el pecho.”",
  vitals: { TA: "116/70 mmHg", FC: "82 lpm", FR: "16 rpm", "T°": "36,6 °C", "SatO₂": "99 %", Glucemia: "92 mg/dl" },
  anamnesis: [
    act("esfuerzo", "¿Te desmayaste durante el esfuerzo o después? ¿Hubo aviso?", "clave", "“Corriendo, sin aviso.”", "Síncope durante el esfuerzo: siempre sospechoso de causa cardíaca."),
    act("familia", "¿Muertes súbitas o cardiopatías en la familia?", "clave", "“Mi tío, a los 32.”", "Muerte súbita familiar: alto riesgo."),
    act("sintomas", "¿Dolor de pecho o falta de aire al correr?", "clave", "“A veces, los últimos meses.”", "Síntomas previos."),
    act("drogas", "¿Energizantes, anabólicos, cocaína?", "util", "“Dos energizantes antes del partido.”", "Desencadenantes o diferenciales."),
    act("convulsion", "¿Te mordiste, te orinaste?", "util", "“No.”", "Diferencia de crisis."),
    act("posicion", "¿En qué puesto jugás?", "neutro", "“De volante.”", "No orienta."),
  ],
  exam: [
    act("soplo", "Soplo y maniobras", "clave", "Soplo sistólico eyectivo en borde esternal izquierdo, aumenta con Valsalva y al pararse; disminuye en cuclillas.", "Dinámico: típico de obstrucción del tracto de salida."),
    act("pulso", "Pulso carotídeo", "clave", "Ascenso rápido, bífido.", "Pulso típico."),
    act("general", "Examen general y signos vitales acostado y parado", "util", "Sin ortostatismo; sin rasgos de Marfan.", "Excluye otras causas."),
  ],
  studies: [
    study("Electrofisiología", "ecg", "ECG", "clave", "Hipertrofia del VI, ondas Q profundas en cara lateral, T invertidas.", "Alterado en la mayoría."),
    study("Imágenes", "eco", "Ecocardiograma", "clave", "Tabique de 24 mm, movimiento sistólico anterior de la mitral, gradiente de 60 mmHg.", "Confirma."),
    study("Imágenes", "rmn", "RM cardíaca y Holter de 48 h", "clave", "Fibrosis extensa; taquicardia ventricular no sostenida.", "Estratifica el riesgo de muerte súbita."),
    study("Otros", "ergometria", "Prueba de esfuerzo máxima sin indicación especializada", "riesgoso", "No se realizó.", "Tras un síncope de esfuerzo se hace solo en entorno especializado."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("mch", "Miocardiopatía hipertrófica obstructiva con síncope de esfuerzo de alto riesgo", true, "Síncope al correr, tío con muerte súbita, soplo dinámico y tabique de 24 mm con obstrucción."),
      dx("vasovagal", "Síncope vasovagal", false, "Aparece en reposo o tras un gatillo, con pródromos, no corriendo."),
      dx("atleta", "Corazón de atleta", false, "Hipertrofia leve simétrica, sin obstrucción ni fibrosis."),
      dx("ea", "Estenosis aórtica", false, "Su soplo disminuye con Valsalva."),
      dx("epilepsia", "Crisis epiléptica", false, "Sin mordedura ni confusión posterior."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("deporte", "Suspender deporte competitivo hasta evaluar", "clave", "El esfuerzo intenso puede desencadenar muerte súbita."),
      mg("beta", "Betabloqueante", "clave", "Reduce gradiente y síntomas."),
      mg("cdi", "Evaluar cardiodesfibrilador implantable", "clave", "Previene la muerte súbita en alto riesgo."),
      mg("familia", "Estudio genético y ecocardiograma a familiares de primer grado", "clave", "Enfermedad autosómica dominante."),
      mg("vasodilatadores", "Nitratos, diuréticos en altas dosis o digoxina", "riesgoso", "Aumentan la obstrucción."),
      mg("alta", "Alta con hidratación y volver a jugar", "riesgoso", "Riesgo de muerte súbita."),
    ],
  },
  debrief: {
    diagnosis: "Miocardiopatía hipertrófica obstructiva con síncope de esfuerzo en varón de 17 años con antecedente familiar de muerte súbita.",
    pathologies: [
      { name: "Miocardiopatía hipertrófica", role: "principal", why: "Hipertrofia genética del miocardio." },
      { name: "Riesgo de muerte súbita", role: "asociada", why: "Arritmias ventriculares." },
      { name: "Vasovagal, corazón de atleta, estenosis aórtica", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: mutaciones de proteínas del sarcómero, autosómicas dominantes.",
      "Mecanismo: hipertrofia del tabique, desorden de fibras, fibrosis y obstrucción dinámica.",
      "Consecuencia: disnea, angina, síncope, arritmias, muerte súbita.",
    ],
    epidemiology:
      "Afecta a 1 de cada 500 personas y es una causa destacada de muerte súbita en jóvenes deportistas. Los controles preparticipativos con ECG ayudan a detectarla. Cada integrante de la familia directa tiene un riesgo del 50 %.",
    management: [
      "Todo síncope de esfuerzo requiere estudio cardíaco.",
      "ECG, ecocardiograma, RM y Holter.",
      "Betabloqueante y, si es necesario, CDI.",
      "Estudio familiar.",
    ],
    sources: ["Sociedad Argentina de Cardiología — Consenso de miocardiopatía hipertrófica.", "Sociedad Argentina de Cardiología — Evaluación cardiovascular del deportista."],
    pearls: ["Síncope corriendo: no es vasovagal.", "Soplo que aumenta con Valsalva.", "Sin nitratos ni diuréticos en exceso."],
    pitfalls: ["Atribuirlo a deshidratación.", "No estudiar a la familia."],
    tribunal: [
      qa("¿Qué maniobras cambian el soplo?", "Aumenta al reducir la precarga: Valsalva o pararse. Disminuye al aumentarla: cuclillas o elevar piernas."),
      qa("¿Cuáles son las causas cardíacas de síncope?", "Arritmias, estenosis aórtica, miocardiopatía hipertrófica, TEP y disección."),
      qa("¿Qué define hipertrofia en el corazón de atleta?", "Tabique habitualmente menor de 13-15 mm, cavidad grande, función normal, regresión al dejar de entrenar."),
    ],
  },
};
