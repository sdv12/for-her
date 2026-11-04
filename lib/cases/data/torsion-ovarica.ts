import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const torsionOvarica: ClinicalCase = {
  id: "torsion-anexial",
  level: 2,
  area: "Ginecología y obstetricia",
  setting: "Guardia",
  patient: { age: 15, ageUnit: "años", sex: "F", context: "Le dijeron hace meses que tenía un quiste en el ovario derecho." },
  frequency: "poco-frecuente",
  intro: "“Saltando en educación física me agarró un dolor muy fuerte abajo a la derecha, de golpe, y vomité tres veces.”",
  vitals: { TA: "118/74 mmHg", FC: "112 lpm", FR: "20 rpm", "T°": "37,2 °C" },
  anamnesis: [
    act("inicio", "¿Cómo empezó el dolor?", "clave", "“De golpe, muy fuerte, hace tres horas.”", "Dolor pelviano súbito con vómitos: sospechar torsión anexial."),
    act("quiste", "¿Te dijeron que tenías un quiste?", "clave", "“Sí, en el ovario derecho.”", "Una masa anexial es el principal factor de riesgo."),
    act("embarazo", "¿Tenés relaciones? ¿Fecha de última menstruación?", "clave", "“No tengo relaciones; me vino hace dos semanas.”", "Descartar embarazo ectópico igual con beta-HCG."),
    act("fiebre", "¿Fiebre, diarrea, ardor al orinar?", "util", "“No.”", "Diferenciales."),
    act("previos", "¿Tuviste dolores parecidos que se fueron solos?", "util", "“Uno más leve hace un mes.”", "Torsiones intermitentes."),
    act("deporte", "¿Qué deporte hacés?", "neutro", "“Hockey.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Abdomen", "clave", "Dolor en fosa ilíaca derecha con defensa leve; dolor desproporcionado.", "Compatible con torsión."),
    act("masa", "Palpación de masa pelviana", "util", "Masa dolorosa en hipogastrio derecho.", "Anexo agrandado."),
    act("mcburney", "Maniobras apendiculares", "util", "Dolor en McBurney.", "Diferencial con apendicitis."),
  ],
  studies: [
    study("Laboratorio", "bhcg", "Beta-HCG", "clave", "Negativa.", "Descarta embarazo."),
    study("Imágenes", "eco", "Ecografía pelviana con Doppler", "clave", "Ovario derecho agrandado (7 cm) con quiste de 5 cm, edema estromal, folículos periféricos y Doppler disminuido; signo del remolino.", "Muy sugestivo de torsión (un Doppler normal no la descarta)."),
    study("Laboratorio", "lab", "Hemograma y orina", "util", "Leucocitosis leve, orina normal.", "Diferenciales."),
    study("Imágenes", "tc", "Tomografía antes de decidir", "riesgoso", "No se realizó.", "Demora la cirugía: el ovario se necrosa en horas."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("torsion", "Torsión anexial derecha sobre quiste ovárico", true, "Dolor pelviano súbito con vómitos al hacer ejercicio, quiste conocido, ovario agrandado con edema y Doppler disminuido."),
      dx("apendicitis", "Apendicitis aguda", false, "Inicio súbito con vómitos inmediatos y ovario patológico."),
      dx("quiste-roto", "Quiste ovárico roto", false, "Daría líquido libre y el ovario no estaría agrandado con edema."),
      dx("ectopico", "Embarazo ectópico", false, "Beta-HCG negativa."),
      dx("pielonefritis", "Pielonefritis", false, "Orina normal y sin fiebre."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("laparoscopia", "Laparoscopía urgente con detorsión y preservación del ovario", "clave", "La detorsión preserva la función ovárica aunque el ovario se vea oscuro."),
      mg("quistectomia", "Quistectomía conservando el ovario", "util", "Tratamiento de la causa."),
      mg("analgesia", "Analgesia y ayuno", "clave", "Preparación quirúrgica."),
      mg("ooforectomia", "Extirpar el ovario de rutina", "riesgoso", "En niñas y adolescentes se intenta siempre conservar."),
      mg("observar", "Observación con analgésicos", "riesgoso", "Pérdida del ovario."),
      mg("anticonceptivos", "Anticonceptivos para el quiste como único tratamiento", "innecesario", "No trata la torsión."),
    ],
  },
  debrief: {
    diagnosis: "Torsión anexial derecha sobre quiste ovárico de 5 cm en adolescente de 15 años.",
    pathologies: [
      { name: "Torsión anexial", role: "principal", why: "Rotación del ovario sobre su pedículo." },
      { name: "Quiste ovárico", role: "asociada", why: "Factor predisponente." },
      { name: "Apendicitis, quiste roto, ectópico", role: "diferencial", why: "Otras causas de dolor pelviano agudo." },
    ],
    reasoning: [
      "Causa: ovario agrandado por un quiste, con movimiento brusco.",
      "Mecanismo: el ovario rota sobre el ligamento infundibulopélvico, primero se obstruye el retorno venoso (edema) y luego el flujo arterial.",
      "Consecuencia: isquemia, necrosis y pérdida del ovario si no se destuerce rápido.",
    ],
    epidemiology:
      "La torsión anexial es una urgencia ginecológica que afecta sobre todo a mujeres en edad reproductiva y a niñas y adolescentes, generalmente con quistes o teratomas. Se confunde con apendicitis y el retraso diagnóstico lleva a la pérdida del ovario.",
    management: [
      "Sospechar ante dolor pelviano súbito con vómitos.",
      "Beta-HCG y ecografía con Doppler.",
      "Laparoscopía urgente con detorsión y conservación del ovario.",
      "Tratar la causa.",
    ],
    sources: ["Sociedad Argentina de Ginecología Infanto Juvenil — Recomendaciones sobre torsión anexial.", "FASGO — Abdomen agudo ginecológico."],
    pearls: ["Dolor súbito + vómitos + masa anexial = torsión.", "Doppler normal no descarta.", "Destorcer y conservar."],
    pitfalls: ["Extirpar el ovario de rutina.", "Demorar con más estudios."],
    tribunal: [
      qa("¿Por qué un Doppler normal no descarta torsión?", "Porque el ovario tiene doble irrigación (ovárica y uterina) y la torsión puede ser parcial o intermitente; el diagnóstico es clínico-ecográfico y se confirma en la cirugía."),
      qa("¿Qué causas de dolor pelviano agudo hay en adolescentes?", "Torsión anexial, quiste roto o hemorrágico, embarazo ectópico, enfermedad pelviana inflamatoria, apendicitis, pielonefritis, dismenorrea y malformaciones obstructivas."),
      qa("¿Qué tumores de ovario son más frecuentes en adolescentes?", "Los quistes funcionales y el teratoma maduro (quiste dermoide), que es la causa más frecuente de torsión en esta edad."),
    ],
  },
};
