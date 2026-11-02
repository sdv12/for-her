import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const estenosisAortica: ClinicalCase = {
  id: "estenosis-aortica-sintomatica",
  level: 2,
  area: "Cardiovascular",
  setting: "Consultorio",
  patient: { age: 78, ageUnit: "años", sex: "M", context: "Hipertenso, dislipémico. Jubilado activo, sale a caminar todos los días." },
  frequency: "frecuente",
  intro: "“Hace unos meses me agito al caminar, y la semana pasada, subiendo una cuesta, se me apretó el pecho y casi me desmayo. Me tuve que sentar.”",
  vitals: { TA: "128/82 mmHg", FC: "72 lpm", FR: "16 rpm", "SatO₂": "96 %" },
  anamnesis: [
    act("sincope", "¿Cuándo te pasó lo del desmayo? ¿En reposo o con esfuerzo?", "clave", "“Subiendo la cuesta, haciendo fuerza.”", "Síncope o presíncope de esfuerzo: signo de alarma cardiológico (no vasovagal)."),
    act("angina", "¿El apretón en el pecho aparece con el esfuerzo y se va al parar?", "clave", "“Sí, se me va al rato de sentarme.”", "Angina de esfuerzo."),
    act("disnea", "¿Te falta el aire? ¿Dormís con varias almohadas?", "clave", "“Me agito con dos cuadras; dos almohadas.”", "Disnea de esfuerzo: tríada de la estenosis aórtica (angina, síncope, insuficiencia cardíaca)."),
    act("soplo", "¿Te dijeron alguna vez que tenías un soplo?", "util", "“Hace años, pero nunca me lo estudiaron.”", "Soplo conocido no estudiado."),
    act("fiebre", "¿Tuviste fiebre o problemas dentales?", "util", "“No.”", "Descarta endocarditis."),
    act("caminata", "¿Por dónde caminás?", "neutro", "“Por la costanera.”", "No orienta."),
  ],
  exam: [
    act("soplo-ex", "Auscultación cardíaca", "clave", "Soplo sistólico eyectivo rudo en foco aórtico, irradiado a carótidas, con segundo ruido disminuido.", "Típico de estenosis aórtica grave."),
    act("pulso", "Pulso carotídeo", "clave", "Pulso parvus et tardus (débil y lento).", "Signo de estenosis grave."),
    act("congestion", "Signos de insuficiencia cardíaca", "util", "Rales bibasales finos.", "Congestión leve."),
  ],
  studies: [
    study("Imágenes", "eco", "Ecocardiograma Doppler", "clave", "Válvula aórtica calcificada, área 0,7 cm², gradiente medio 52 mmHg, velocidad 4,6 m/s, FEVI 55 %.", "Estenosis aórtica grave."),
    study("Electrofisiología", "ecg", "Electrocardiograma", "util", "Hipertrofia ventricular izquierda con sobrecarga.", "Consecuencia de la sobrecarga de presión."),
    study("Imágenes", "coronarias", "Evaluación coronaria (cinecoronariografía o angiotomografía) antes del tratamiento", "util", "Lesión moderada en la descendente anterior.", "Planifica el tratamiento."),
    study("Otros", "ergometria", "Prueba de esfuerzo", "riesgoso", "No se realizó.", "Contraindicada en la estenosis aórtica grave sintomática: riesgo de muerte súbita."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("ea", "Estenosis aórtica grave degenerativa (calcificada) sintomática", true, "Angina, presíncope de esfuerzo y disnea con soplo eyectivo rudo irradiado a carótidas, pulso parvus et tardus y ecocardiograma con área de 0,7 cm²."),
      dx("coronaria", "Enfermedad coronaria aislada", false, "No explica el soplo ni el síncope; el eco muestra estenosis grave."),
      dx("mcp-hipertrofica", "Miocardiopatía hipertrófica obstructiva", false, "Daría un soplo que aumenta con Valsalva y pulso saltón; la válvula es la calcificada."),
      dx("vasovagal", "Síncope vasovagal", false, "Ocurrió con esfuerzo y hay cardiopatía estructural."),
      dx("insuficiencia-aortica", "Insuficiencia aórtica", false, "Daría soplo diastólico y pulso amplio."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("reemplazo", "Derivación a equipo cardiológico (Heart Team) para reemplazo valvular: TAVI o cirugía según riesgo", "clave", "La estenosis aórtica grave sintomática tiene alta mortalidad sin reemplazo valvular."),
      mg("evitar-esfuerzo", "Evitar esfuerzos intensos hasta el tratamiento", "clave", "Riesgo de síncope y muerte súbita."),
      mg("diureticos", "Diurético en dosis bajas para la congestión, con cautela", "util", "Mejora la disnea; el exceso puede bajar la precarga y el gasto."),
      mg("odontologia", "Control odontológico antes del reemplazo", "util", "Reduce el riesgo de endocarditis protésica."),
      mg("vasodilatador", "Nitratos o vasodilatadores en dosis altas para la angina", "riesgoso", "Pueden producir hipotensión grave con un gasto fijo."),
      mg("controles", "Seguimiento con eco anual sin derivar", "riesgoso", "Con síntomas, la mortalidad es muy alta: hay que intervenir."),
    ],
  },
  debrief: {
    diagnosis: "Estenosis aórtica grave degenerativa calcificada, sintomática (angina, presíncope de esfuerzo e insuficiencia cardíaca), con función sistólica conservada, en varón de 78 años.",
    pathologies: [
      { name: "Estenosis aórtica grave", role: "principal", why: "Área valvular menor de 1 cm²." },
      { name: "Hipertrofia ventricular e insuficiencia cardíaca", role: "asociada", why: "Consecuencias de la sobrecarga de presión." },
      { name: "Enfermedad coronaria, miocardiopatía hipertrófica", role: "diferencial", why: "Otras causas de angina y síncope de esfuerzo." },
    ],
    reasoning: [
      "Causa: degeneración y calcificación de la válvula aórtica con la edad (proceso parecido a la aterosclerosis); en jóvenes, válvula bicúspide; en algunos países, fiebre reumática.",
      "Mecanismo: la válvula estrecha obliga al ventrículo a generar más presión; se hipertrofia, aumenta su consumo de oxígeno y no puede aumentar el gasto con el esfuerzo.",
      "Consecuencia: angina, síncope de esfuerzo e insuficiencia cardíaca; con síntomas, la supervivencia sin tratamiento es de pocos años.",
    ],
    epidemiology:
      "La estenosis aórtica es la valvulopatía más frecuente en adultos mayores de países desarrollados y de Argentina, y aumenta con el envejecimiento: afecta a alrededor del 2–5 % de los mayores de 75 años. El TAVI (implante valvular percutáneo) cambió el tratamiento de los pacientes añosos.",
    management: [
      "Sospecharla ante soplo eyectivo, angina, síncope o disnea de esfuerzo en adultos mayores.",
      "Ecocardiograma para confirmar y graduar.",
      "Sintomática grave: reemplazo valvular (cirugía o TAVI según edad y riesgo).",
      "Asintomática grave: seguimiento estrecho y evaluar intervención según criterios.",
    ],
    sources: ["Sociedad Argentina de Cardiología — Consenso de valvulopatías.", "Guías ESC/EACTS de valvulopatías."],
    pearls: ["Angina + síncope + disnea = estenosis aórtica.", "Pulso parvus et tardus.", "Sintomática = reemplazo."],
    pitfalls: ["Pedir una prueba de esfuerzo.", "Dar vasodilatadores potentes."],
    tribunal: [
      qa("¿Qué pronóstico tiene la estenosis aórtica sintomática sin tratamiento?", "La supervivencia promedio es de unos 5 años tras la angina, 3 años tras el síncope y 2 años tras la insuficiencia cardíaca; por eso los síntomas indican reemplazo valvular."),
      qa("¿Qué diferencias hay entre los soplos sistólicos?", "Eyectivo (estenosis aórtica o pulmonar): romboidal, rudo, en foco aórtico, irradiado a carótidas. Regurgitante (insuficiencia mitral o tricuspídea): holosistólico, en ápex irradiado a axila. La miocardiopatía hipertrófica aumenta con Valsalva y de pie."),
      qa("¿Qué es el TAVI?", "El implante de una válvula aórtica por catéter, generalmente por vía femoral, sin cirugía abierta; se indica sobre todo en pacientes mayores o de riesgo quirúrgico intermedio o alto, según evaluación del equipo cardiológico."),
    ],
  },
};
