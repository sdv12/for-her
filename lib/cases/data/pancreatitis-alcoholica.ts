import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const pancreatitisAlcoholica: ClinicalCase = {
  id: "pancreatitis-aguda-alcoholica-grave",
  level: 3,
  area: "Gastroenterología",
  setting: "Guardia",
  patient: { age: 44, ageUnit: "años", sex: "M", context: "Bebe un litro de vino y cerveza por día. Fin de semana largo con mucho alcohol." },
  frequency: "frecuente",
  intro: "“Me agarró un dolor muy fuerte arriba en la panza que me atraviesa a la espalda, como un cinturón. Vomito todo.”",
  vitals: { TA: "96/58 mmHg", FC: "124 lpm", FR: "28 rpm", "T°": "38,1 °C", "SatO₂": "90 %" },
  anamnesis: [
    act("dolor", "¿Cómo es el dolor y a dónde va?", "clave", "“En la boca del estómago, a la espalda, en cinturón; mejora inclinado hacia adelante.”", "Dolor típico de pancreatitis."),
    act("alcohol", "¿Cuánto tomás y cuándo fue lo último?", "clave", "“Todo el fin de semana; un litro de vino por día habitualmente.”", "Causa alcohólica: la segunda más frecuente."),
    act("calculos", "¿Tenés cálculos en la vesícula?", "util", "“No que sepa.”", "Descartar causa biliar."),
    act("previos", "¿Tuviste dolores así antes?", "util", "“Una vez, más leve.”", "Episodios previos."),
    act("abstinencia", "¿Temblás o ves cosas raras cuando no tomás?", "util", "“A veces tiemblo a la mañana.”", "Riesgo de abstinencia durante la internación."),
    act("trabajo", "¿De qué trabajás?", "neutro", "“Albañil.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Abdomen", "clave", "Distendido, dolor en epigastrio con defensa, ruidos disminuidos.", "Pancreatitis con íleo."),
    act("perfusion", "Perfusión y diuresis", "clave", "Mucosas secas, oliguria.", "Hipovolemia por tercer espacio."),
    act("piel", "Equimosis en flancos y ombligo", "util", "Sin equimosis.", "Los signos de Grey Turner y Cullen indican pancreatitis hemorrágica."),
  ],
  studies: [
    study("Laboratorio", "lipasa", "Lipasa (o amilasa)", "clave", "Lipasa 12 veces el valor normal.", "Más de 3 veces confirma con dolor típico."),
    study("Laboratorio", "gravedad", "Hemograma, urea, creatinina, calcio, glucemia, gases, triglicéridos, hepatograma", "clave", "Hematocrito 50 %, urea 68, creatinina 2,0, calcio 7,4, pO₂ 58.", "Falla renal y respiratoria: pancreatitis grave (persistente más de 48 h)."),
    study("Imágenes", "eco", "Ecografía abdominal", "util", "Sin litiasis biliar.", "Descarta causa biliar."),
    study("Imágenes", "tc-ya", "Tomografía con contraste en las primeras horas para confirmar", "innecesario", "No se realizó.", "No es necesaria si el diagnóstico es claro; se hace a las 72 h si hay mala evolución."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("pa-grave", "Pancreatitis aguda alcohólica grave con falla renal y respiratoria", true, "Dolor epigástrico en cinturón, lipasa 12 veces el normal, consumo de alcohol, sin litiasis, con insuficiencia renal, hipoxemia, hemoconcentración e hipocalcemia."),
      dx("ulcera", "Úlcera perforada", false, "Lipasa muy elevada; sin neumoperitoneo."),
      dx("biliar", "Pancreatitis biliar", false, "Ecografía sin litiasis."),
      dx("iam", "IAM inferior", false, "Lipasa elevada y cuadro abdominal."),
      dx("leve", "Pancreatitis leve", false, "Hay falla de órganos."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("fluidos", "Hidratación con Ringer lactato guiada por diuresis y signos clínicos (sin excesos)", "clave", "Previene la necrosis y la falla renal."),
      mg("uti", "Terapia intensiva y oxígeno", "clave", "Falla de órganos."),
      mg("analgesia", "Analgesia con opioides", "clave", "Dolor intenso."),
      mg("nutricion", "Nutrición enteral temprana cuando sea posible", "util", "Reduce infecciones."),
      mg("tiamina", "Tiamina y prevención de la abstinencia alcohólica", "util", "Consumo crónico."),
      mg("atb-profilactico", "Antibióticos profilácticos de rutina", "innecesario", "No reducen la mortalidad sin necrosis infectada."),
    ],
  },
  debrief: {
    diagnosis: "Pancreatitis aguda alcohólica grave con insuficiencia renal y respiratoria, hemoconcentración e hipocalcemia, en varón de 44 años con consumo problemático de alcohol.",
    pathologies: [
      { name: "Pancreatitis aguda grave", role: "principal", why: "Falla de órganos persistente." },
      { name: "Consumo problemático de alcohol", role: "asociada", why: "Causa." },
      { name: "Úlcera perforada, pancreatitis biliar, IAM", role: "diferencial", why: "Otras causas de dolor epigástrico." },
    ],
    reasoning: [
      "Causa: alcohol que daña las células acinares y aumenta la viscosidad del jugo pancreático.",
      "Mecanismo: activación de enzimas dentro del páncreas, autodigestión e inflamación sistémica.",
      "Consecuencia: tercer espacio, hipovolemia, falla renal y respiratoria, necrosis e infección.",
    ],
    epidemiology:
      "En Argentina la causa más frecuente de pancreatitis es la biliar (más en mujeres), y la segunda el alcohol (más en varones de 30 a 50 años). Alrededor del 20 % es grave, con mortalidad elevada.",
    management: [
      "Diagnóstico con 2 de 3: dolor típico, enzimas mayores de 3 veces, imagen.",
      "Hidratación, analgesia y nutrición enteral precoz.",
      "Clasificar gravedad (Atlanta, BISAP) y vigilar complicaciones.",
      "Abordar el consumo de alcohol.",
    ],
    sources: ["Sociedad Argentina de Gastroenterología — Guía de pancreatitis aguda.", "Clasificación de Atlanta revisada."],
    pearls: ["Dolor en cinturón + lipasa más de 3 veces.", "Falla de órganos más de 48 h = grave.", "Ringer y nutrición enteral."],
    pitfalls: ["Antibióticos de rutina.", "Tomografía temprana innecesaria."],
    tribunal: [
      qa("¿Cómo se clasifica la gravedad según Atlanta?", "Leve: sin falla de órganos ni complicaciones. Moderadamente grave: falla transitoria (menos de 48 h) o complicaciones locales. Grave: falla de órganos persistente (más de 48 h)."),
      qa("¿Qué causas de pancreatitis hay?", "Litiasis biliar y alcohol (las principales), hipertrigliceridemia, hipercalcemia, fármacos, post-CPRE, traumatismos, infecciones, autoinmune y genética."),
      qa("¿Qué complicaciones locales tiene?", "Colecciones líquidas agudas, pseudoquiste, necrosis (estéril o infectada), trombosis venosa esplénica y pseudoaneurismas."),
    ],
  },
};
