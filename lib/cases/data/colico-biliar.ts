import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const colicoBiliar: ClinicalCase = {
  id: "colico-biliar-litiasis",
  level: 1,
  area: "Gastroenterología",
  setting: "Guardia",
  patient: { age: 41, ageUnit: "años", sex: "F", context: "Tres hijos. Sobrepeso. Bajó 12 kilos con dieta este año." },
  frequency: "muy-frecuente",
  intro: "“Después del asado me agarró un dolor fuerte arriba a la derecha, que me pasa a la espalda, con náuseas. Ya me pasó otras veces y se me fue solo.”",
  vitals: { TA: "128/82 mmHg", FC: "88 lpm", FR: "18 rpm", "T°": "36,7 °C" },
  anamnesis: [
    act("dolor", "¿Cuánto dura el dolor?", "clave", "“Unas tres horas, después se me va.”", "Dolor de menos de 6 horas que cede: cólico biliar, no colecistitis."),
    act("comida", "¿Aparece después de comidas grasas?", "clave", "“Sí, siempre después de comer mucho.”", "La contracción de la vesícula contra un cálculo produce el dolor."),
    act("fiebre", "¿Fiebre, coloración amarilla, orina oscura?", "clave", "“No.”", "Descarta colecistitis, coledocolitiasis y colangitis."),
    act("factores", "¿Embarazos, bajaste de peso rápido?", "util", "“Tres embarazos; bajé 12 kilos rápido.”", "Factores de riesgo de litiasis."),
    act("previos", "¿Cuántas veces te pasó?", "util", "“Tres en el año.”", "Cólicos recurrentes."),
    act("receta", "¿Qué comiste en el asado?", "neutro", "“Chorizo y vacío.”", "No orienta."),
  ],
  exam: [
    act("murphy", "Palpación del hipocondrio derecho y signo de Murphy", "clave", "Dolor leve, Murphy negativo.", "Sin colecistitis."),
    act("ictericia", "Piel y escleras", "clave", "Sin ictericia.", "Sin obstrucción del colédoco."),
    act("abdomen", "Resto del abdomen", "util", "Blando, sin defensa.", "Sin peritonitis."),
  ],
  studies: [
    study("Imágenes", "eco", "Ecografía abdominal", "clave", "Vesícula con múltiples cálculos, pared normal, colédoco de 4 mm.", "Confirma litiasis sin colecistitis ni dilatación de la vía biliar."),
    study("Laboratorio", "lab", "Hemograma, hepatograma, lipasa", "clave", "Normales.", "Descarta colecistitis, coledocolitiasis y pancreatitis."),
    study("Imágenes", "tc", "Tomografía de abdomen", "innecesario", "No se realizó.", "La ecografía es el estudio de elección."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("colico", "Cólico biliar por litiasis vesicular sintomática no complicada", true, "Dolor en hipocondrio derecho posprandial de 3 horas que cede, recurrente, con cálculos en ecografía y laboratorio normal."),
      dx("colecistitis", "Colecistitis aguda", false, "Sin fiebre, Murphy negativo, pared normal, dolor que cede antes de 6 horas."),
      dx("coledocolitiasis", "Coledocolitiasis", false, "Colédoco normal y hepatograma normal."),
      dx("pancreatitis", "Pancreatitis biliar", false, "Lipasa normal."),
      dx("ulcera", "Úlcera péptica", false, "Hay cálculos que explican el cuadro posprandial."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("analgesia", "Analgesia (AINE como diclofenac o ketorolac) y antiespasmódico", "clave", "Alivian el cólico."),
      mg("cirugia", "Derivar a cirugía para colecistectomía laparoscópica programada", "clave", "La litiasis sintomática tiene alto riesgo de recurrencia y complicaciones."),
      mg("alarma", "Pautas de alarma: dolor de más de 6 horas, fiebre, ictericia", "clave", "Indican complicación."),
      mg("dieta", "Evitar comidas copiosas y muy grasas mientras espera la cirugía", "util", "Reduce episodios."),
      mg("ursodesoxicolico", "Ácido ursodesoxicólico como tratamiento definitivo", "innecesario", "Poca eficacia y alta recurrencia; no reemplaza la cirugía."),
      mg("internar", "Internación y antibióticos", "innecesario", "No hay infección."),
    ],
  },
  debrief: {
    diagnosis: "Cólico biliar recurrente por litiasis vesicular sintomática no complicada, en mujer de 41 años con factores de riesgo.",
    pathologies: [
      { name: "Litiasis vesicular sintomática", role: "principal", why: "Cálculos que producen cólico." },
      { name: "Riesgo de complicaciones", role: "asociada", why: "Colecistitis, coledocolitiasis, pancreatitis." },
      { name: "Colecistitis, pancreatitis, úlcera", role: "diferencial", why: "Se descartan." },
    ],
    reasoning: [
      "Causa: bilis sobresaturada de colesterol (sexo femenino, embarazos, obesidad, pérdida rápida de peso).",
      "Mecanismo: tras una comida grasa la vesícula se contrae contra un cálculo que obstruye transitoriamente el cístico.",
      "Consecuencia: dolor cólico que cede cuando el cálculo se desplaza; si persiste, colecistitis.",
    ],
    epidemiology:
      "La litiasis biliar es muy frecuente en Argentina y en Latinoamérica; afecta a alrededor del 20 % de las mujeres adultas. La regla de las 4 F (female, fat, forty, fertile) resume los factores de riesgo. La mayoría es asintomática; una vez sintomática, la recurrencia es alta.",
    management: [
      "Ecografía y laboratorio para descartar complicaciones.",
      "Analgesia en el episodio.",
      "Colecistectomía laparoscópica programada en la litiasis sintomática.",
      "No operar de rutina la litiasis asintomática.",
    ],
    sources: ["Sociedad Argentina de Cirugía Digestiva — Recomendaciones sobre litiasis biliar.", "Sociedad Argentina de Gastroenterología — Guía de litiasis biliar."],
    pearls: ["Dolor que cede antes de 6 h = cólico biliar.", "Sintomática = colecistectomía.", "Asintomática = no operar."],
    pitfalls: ["Confundirlo con úlcera.", "No derivar a cirugía."],
    tribunal: [
      qa("¿Qué complicaciones tiene la litiasis biliar?", "Colecistitis aguda, coledocolitiasis, colangitis, pancreatitis biliar, íleo biliar, síndrome de Mirizzi y, a largo plazo, cáncer de vesícula."),
      qa("¿Qué es el signo de Murphy?", "La detención brusca de la inspiración por dolor al palpar el hipocondrio derecho bajo el reborde costal: sugiere colecistitis aguda."),
      qa("¿Cuándo se opera una litiasis asintomática?", "En casos seleccionados: vesícula en porcelana, cálculos mayores de 3 cm, pólipos mayores de 1 cm, anemia hemolítica, o antes de un trasplante o cirugía bariátrica."),
    ],
  },
};
