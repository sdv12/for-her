import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const torsionTesticular: ClinicalCase = {
  id: "torsion-testicular",
  level: 2,
  area: "Nefrourología",
  setting: "Guardia",
  patient: { age: 14, ageUnit: "años", sex: "M", context: "Lo trae el papá a las 6 de la mañana." },
  frequency: "frecuente",
  intro: "“Me desperté con un dolor tremendo en el testículo izquierdo que me sube a la panza. Vomité. Empezó hace dos horas.”",
  vitals: { TA: "128/78 mmHg", FC: "110 lpm", "T°": "36,8 °C" },
  anamnesis: [
    act("inicio", "¿Cómo empezó el dolor?", "clave", "“De golpe, me despertó.”", "Inicio brusco, a menudo durante el sueño: típico de torsión."),
    act("tiempo", "¿Hace cuánto exactamente?", "clave", "“Dos horas.”", "El tiempo es crítico: el testículo se salva en casi todos los casos si se destuerce antes de las 6 horas."),
    act("fiebre", "¿Tiene fiebre o ardor al orinar?", "util", "“No.”", "Fiebre y disuria orientarían a orquiepididimitis."),
    act("trauma", "¿Se golpeó?", "util", "“No.”", "Descarta traumatismo."),
    act("previos", "¿Tuvo dolores parecidos que se fueron solos?", "util", "“Sí, una vez, un ratito.”", "Episodios previos breves sugieren torsiones intermitentes."),
    act("sexual", "¿Tuvo relaciones sexuales?", "util", "“No.”", "Las orquiepididimitis por ITS son más frecuentes en sexualmente activos."),
    act("deporte", "¿Hace deporte?", "neutro", "“Básquet.”", "No orienta."),
  ],
  exam: [
    act("testiculo", "Examen del testículo", "clave", "Testículo izquierdo ascendido, horizontalizado, muy doloroso, con escroto edematoso.", "Testículo alto y horizontal: típico de torsión."),
    act("cremasterico", "Reflejo cremastérico", "clave", "Ausente del lado izquierdo.", "La ausencia del reflejo es muy sugestiva de torsión."),
    act("prehn", "Signo de Prehn (elevar el testículo)", "util", "No alivia el dolor.", "Si el dolor alivia al elevar, orienta a epididimitis (poco confiable)."),
    act("abdomen", "Abdomen y región inguinal", "util", "Sin hernias.", "Descarta hernia atascada."),
  ],
  studies: [
    study("Imágenes", "doppler", "Ecografía doppler testicular (si no demora la cirugía)", "util", "Ausencia de flujo en el testículo izquierdo, cordón espermático en espiral.", "Confirma, pero ante clínica clara no debe demorar la exploración quirúrgica."),
    study("Laboratorio", "orina", "Orina completa", "util", "Normal.", "Una orina con piuria orientaría a epididimitis."),
    study("Imágenes", "esperar", "Esperar el ecodoppler de la mañana para decidir", "riesgoso", "No se realizó.", "Cada hora reduce la viabilidad del testículo."),
    study("Imágenes", "tc", "Tomografía de abdomen y pelvis", "innecesario", "No se realizó.", "No aporta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("torsion", "Torsión testicular izquierda (del cordón espermático)", true, "Adolescente con dolor testicular brusco nocturno, vómitos, testículo alto y horizontal y reflejo cremastérico ausente."),
      dx("epididimitis", "Orquiepididimitis", false, "Dolor gradual con fiebre, disuria, testículo en posición normal, cremastérico presente."),
      dx("hidatide", "Torsión de hidátide (apéndice testicular)", false, "Dolor localizado en el polo superior con “punto azul”, testículo en posición normal y reflejo presente; más en niños de 7–12 años."),
      dx("hernia", "Hernia inguinal atascada", false, "Masa inguinal irreductible con testículo normal."),
      dx("trauma", "Traumatismo testicular", false, "No hubo golpe."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cirugia", "Exploración quirúrgica urgente: detorsión y orquidopexia bilateral", "clave", "Salva el testículo y la fijación del contralateral previene una torsión futura."),
      mg("manual", "Intentar la detorsión manual (hacia afuera, “abriendo el libro”) mientras se prepara el quirófano", "util", "Puede ganar tiempo, pero siempre se opera después."),
      mg("analgesia", "Analgesia y ayuno", "clave", "Preparación para la cirugía."),
      mg("atb", "Antibióticos y control", "riesgoso", "Es el tratamiento de la epididimitis: en una torsión, se pierde el testículo."),
      mg("hielo", "Hielo, suspensorio y control al día siguiente", "riesgoso", "La demora lleva a necrosis."),
    ],
  },
  debrief: {
    diagnosis: "Torsión testicular izquierda de 2 horas de evolución en adolescente de 14 años.",
    pathologies: [
      { name: "Torsión testicular", role: "principal", why: "Torsión del cordón espermático con isquemia." },
      { name: "Orquiepididimitis y torsión de hidátide", role: "diferencial", why: "Otras causas de escroto agudo." },
      { name: "Hernia atascada", role: "diferencial", why: "Masa inguinoescrotal dolorosa." },
    ],
    reasoning: [
      "Causa: fijación anormal del testículo (deformidad en badajo de campana) que le permite girar dentro de la túnica vaginal.",
      "Mecanismo: el cordón espermático se tuerce y primero se obstruye el retorno venoso y luego el flujo arterial.",
      "Consecuencia: isquemia testicular con dolor intenso, náuseas y vómitos; después de 6 horas la viabilidad cae rápidamente.",
    ],
    epidemiology:
      "Es la causa más frecuente de escroto agudo en adolescentes, con pico entre los 12 y 18 años, y un pico menor en el período neonatal. Afecta a 1 de cada 4.000 varones menores de 25 años y suele ocurrir de noche.",
    management: [
      "Escroto agudo en un adolescente: torsión hasta que se demuestre lo contrario.",
      "Con clínica clara, exploración quirúrgica sin demora.",
      "Ecodoppler solo si hay dudas y no retrasa la cirugía.",
      "Detorsión y orquidopexia bilateral; orquiectomía si el testículo no es viable.",
    ],
    sources: ["Sociedad Argentina de Urología — Recomendaciones sobre escroto agudo.", "Sociedad Argentina de Cirugía Infantil — Guía de escroto agudo."],
    pearls: ["Tiempo es testículo: menos de 6 horas.", "Testículo alto, horizontal, sin reflejo cremastérico.", "Ante la duda, quirófano."],
    pitfalls: ["Esperar la ecografía de la mañana.", "Tratarlo como epididimitis."],
    tribunal: [
      qa("¿Cuáles son las causas de escroto agudo?", "Torsión testicular, torsión de apéndices testiculares (hidátide de Morgagni), orquiepididimitis, hernia inguinal atascada, traumatismo, edema escrotal idiopático y púrpura de Schönlein-Henoch."),
      qa("¿Qué es la deformidad en badajo de campana?", "Una inserción alta de la túnica vaginal que deja al testículo libre dentro de ella, como el badajo de una campana; predispone a la torsión y suele ser bilateral (por eso se fijan ambos)."),
      qa("¿Cómo diferenciás torsión de epididimitis?", "Torsión: inicio brusco, adolescente, testículo alto y horizontal, cremastérico ausente, sin fiebre ni piuria. Epididimitis: inicio gradual, fiebre, síntomas urinarios, epidídimo engrosado, cremastérico presente, flujo aumentado en el doppler."),
    ],
  },
};
