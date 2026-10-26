import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const erge: ClinicalCase = {
  id: "reflujo-gastroesofagico",
  level: 1,
  area: "Gastroenterología",
  setting: "Consultorio",
  patient: { age: 38, ageUnit: "años", sex: "M", context: "Taxista nocturno. Sobrepeso." },
  frequency: "muy-frecuente",
  intro: "“Hace meses tengo acidez después de comer, me sube algo ácido a la garganta y a la noche, cuando me acuesto, es peor.”",
  vitals: { TA: "128/82 mmHg", FC: "76 lpm", Peso: "96 kg (IMC 31)" },
  anamnesis: [
    act("tipicos", "¿Cómo es la acidez? ¿Le sube comida o líquido ácido a la boca?", "clave", "“Un ardor que sube desde el estómago al pecho, y a veces me viene a la boca algo agrio.”", "Pirosis y regurgitación son los síntomas típicos de ERGE: con ellos se puede diagnosticar y tratar empíricamente."),
    act("alarma", "¿Le cuesta tragar, bajó de peso, vomitó sangre o hizo materia fecal negra?", "clave", "“No, nada de eso.”", "Disfagia, odinofagia, pérdida de peso, anemia, sangrado, vómitos persistentes o inicio después de los 50–60 años son síntomas de alarma: indican endoscopia."),
    act("cardiaco", "¿Tiene dolor de pecho con el esfuerzo?", "clave", "“No, solo después de comer.”", "Siempre descartar origen cardíaco ante dolor torácico."),
    act("habitos", "¿Cómo come? ¿Fuma, toma alcohol, mate, café?", "util", "“Ceno a las 3 de la mañana y me acuesto. Mucho café y mate, y fumo.”", "Comidas tardías y abundantes, tabaco, alcohol y café empeoran el reflujo."),
    act("aines", "¿Toma antiinflamatorios?", "util", "“A veces ibuprofeno por la espalda.”", "Los AINE dañan la mucosa y causan úlcera."),
    act("musica", "¿Qué radio escucha?", "neutro", "“Una de tango.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Palpación abdominal", "clave", "Blando, leve molestia epigástrica, sin masas ni visceromegalias.", "Un examen normal es lo esperable en la ERGE."),
    act("cintura", "Perímetro de cintura", "util", "108 cm.", "La obesidad central aumenta la presión intraabdominal y el reflujo."),
    act("anemia", "Buscar palidez y adenopatías supraclaviculares", "clave", "Sin palidez ni adenopatías.", "Descarta signos de alarma de patología maligna."),
    act("faringe", "Examen de fauces", "neutro", "Leve eritema posterior.", "Puede verse en el reflujo, pero no cambia la conducta."),
  ],
  studies: [
    study("Otros", "veda", "Videoendoscopia digestiva alta", "innecesario", "No se realizó.", "Sin síntomas de alarma, el tratamiento empírico con IBP es la conducta inicial."),
    study("Otros", "phmetria", "pHmetría de 24 horas", "innecesario", "No se realizó.", "Se reserva para síntomas refractarios o antes de cirugía antirreflujo."),
    study("Electrofisiología", "ecg", "Electrocardiograma", "util", "Normal.", "Razonable si hay dudas con un dolor torácico."),
    study("Imágenes", "seriada", "Seriada esofagogastroduodenal", "innecesario", "No se realizó.", "No sirve para diagnosticar ERGE."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("erge", "Enfermedad por reflujo gastroesofágico típica, sin síntomas de alarma", true, "Pirosis y regurgitación posprandiales, peores al acostarse, con factores de riesgo y sin alarma."),
      dx("ulcera", "Úlcera péptica", false, "Dolor epigástrico que mejora o empeora con la comida, sin regurgitación; más con AINE o H. pylori."),
      dx("angina", "Angina de pecho", false, "Dolor opresivo con el esfuerzo que cede con el reposo."),
      dx("cancer", "Cáncer de esófago", false, "Disfagia progresiva y pérdida de peso, más en mayores."),
      dx("esofagitis-eos", "Esofagitis eosinofílica", false, "Disfagia e impactación alimentaria en jóvenes con atopía."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("ibp", "Omeprazol 20 mg en ayunas, 30 minutos antes del desayuno, por 4–8 semanas", "clave", "Es el tratamiento más eficaz; se toma antes de la comida para inhibir las bombas activas."),
      mg("habitos", "No acostarse hasta 2–3 h después de comer, elevar la cabecera, bajar de peso, dejar de fumar", "clave", "Medidas con evidencia, sobre todo la pérdida de peso y la elevación de la cabecera."),
      mg("control", "Control a las 8 semanas y luego bajar a la mínima dosis eficaz o a demanda", "clave", "Evita el uso indefinido innecesario de IBP."),
      mg("antiacido", "Antiácidos a demanda para síntomas ocasionales", "util", "Alivio rápido, de corta duración."),
      mg("cirugia", "Derivar a cirugía antirreflujo", "innecesario", "Solo para casos refractarios o con complicaciones."),
      mg("aines", "Seguir con ibuprofeno para la espalda", "innecesario", "Daña la mucosa; conviene paracetamol."),
    ],
  },
  debrief: {
    diagnosis: "Enfermedad por reflujo gastroesofágico típica, sin síntomas de alarma, con obesidad y hábitos desencadenantes.",
    pathologies: [
      { name: "ERGE", role: "principal", why: "Pirosis y regurgitación típicas." },
      { name: "Obesidad", role: "asociada", why: "Aumenta la presión intraabdominal." },
      { name: "Angina de pecho", role: "diferencial", why: "Siempre a descartar." },
      { name: "Úlcera péptica y cáncer esofagogástrico", role: "diferencial", why: "Se buscan con los síntomas de alarma." },
    ],
    reasoning: [
      "Causa: relajaciones transitorias del esfínter esofágico inferior, hernia hiatal, obesidad, comidas abundantes y tardías, tabaco.",
      "Mecanismo: el contenido gástrico ácido refluye al esófago, cuya mucosa no está preparada para resistirlo.",
      "Consecuencia: pirosis, regurgitación, a veces esofagitis. A largo plazo, estenosis o esófago de Barrett (metaplasia intestinal con riesgo de adenocarcinoma).",
      "Acostarse con el estómago lleno elimina la ayuda de la gravedad: por eso empeora de noche.",
    ],
    epidemiology:
      "La ERGE afecta al 10–20 % de los adultos en Occidente y es uno de los motivos de consulta digestiva más frecuentes. No tiene grandes diferencias por sexo, aunque las complicaciones (esofagitis grave, Barrett) son más frecuentes en varones. Aumenta con la obesidad y la edad.",
    management: [
      "Síntomas típicos sin alarma: tratamiento empírico con IBP 4–8 semanas y medidas higiénico-dietéticas.",
      "Endoscopia si hay síntomas de alarma, edad > 50–60 años con inicio reciente o falta de respuesta.",
      "Bajar a la mínima dosis eficaz; evitar el uso crónico sin indicación.",
      "pHmetría o impedanciometría si es refractaria o antes de cirugía.",
      "Cirugía antirreflujo en casos seleccionados.",
    ],
    sources: ["Sociedad Argentina de Gastroenterología — Consenso de enfermedad por reflujo gastroesofágico."],
    pearls: ["Pirosis + regurgitación sin alarma = tratar sin endoscopia.", "El IBP va antes del desayuno.", "Bajar de peso y elevar la cabecera funcionan."],
    pitfalls: ["Pedir endoscopia a todos.", "Dejar IBP de por vida sin reevaluar.", "Olvidar descartar angina."],
  },
};
