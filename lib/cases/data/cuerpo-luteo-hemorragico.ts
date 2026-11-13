import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const cuerpoLuteoHemorragico: ClinicalCase = {
  id: "quiste-cuerpo-luteo-hemorragico",
  level: 2,
  area: "Ginecología y obstetricia",
  setting: "Guardia",
  patient: { age: 23, ageUnit: "años", sex: "F", context: "Día 24 del ciclo. Tuvo relaciones sexuales anoche." },
  frequency: "frecuente",
  intro: "“Me agarró un dolor fuerte abajo a la derecha de golpe y me mareé.”",
  vitals: { TA: "104/66 mmHg", FC: "104 lpm", FR: "18 rpm", "T°": "36,7 °C", "SatO₂": "98 %" },
  anamnesis: [
    act("fum", "¿Cuándo fue tu última menstruación?", "clave", "“Hace 24 días, soy regular.”", "Fase lútea."),
    act("inicio", "¿Cómo empezó el dolor?", "clave", "“De golpe, después de la relación.”", "Rotura de quiste."),
    act("anticoagulacion", "¿Tomás anticoagulantes o tenés trastorno de coagulación?", "clave", "“No.”", "Riesgo de hemoperitoneo masivo."),
    act("anticoncepcion", "¿Qué método anticonceptivo usás?", "util", "“Preservativo, a veces.”", "Embarazo posible."),
    act("fiebre", "¿Fiebre o flujo?", "util", "“No.”", "EPI."),
    act("estudio", "¿Qué estudiás?", "neutro", "“Odontología.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Abdomen", "clave", "Dolor en fosa ilíaca derecha con defensa leve, sin rebote marcado.", "Irritación peritoneal leve."),
    act("hemodinamia", "Hemodinamia y ortostatismo", "clave", "Taquicardia que mejora con 500 ml de cristaloides.", "Responde."),
    act("tacto", "Tacto vaginal", "util", "Dolor anexial derecho y en el fondo de saco, sin movilización dolorosa del cuello marcada.", "Sangre en Douglas."),
  ],
  studies: [
    study("Laboratorio", "bhcg", "Subunidad beta de hCG", "clave", "Negativa.", "Descarta ectópico."),
    study("Imágenes", "eco", "Ecografía transvaginal", "clave", "Quiste ovárico derecho de 35 mm con patrón en red y líquido libre moderado en Douglas.", "Cuerpo lúteo hemorrágico roto."),
    study("Laboratorio", "hemograma", "Hemograma y coagulograma seriado", "util", "Hb 11,2 y luego 11,0.", "Estable."),
    study("Imágenes", "tc", "TC con contraste de rutina", "innecesario", "No se realizó.", "La ecografía alcanza."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("cuerpo-luteo", "Quiste de cuerpo lúteo hemorrágico roto con hemoperitoneo leve", true, "Fase lútea, dolor súbito poscoital, beta negativa, quiste en red y líquido libre."),
      dx("ectopico", "Embarazo ectópico roto", false, "Beta negativa."),
      dx("apendicitis", "Apendicitis", false, "Inicio súbito y hallazgo ecográfico ovárico."),
      dx("torsion", "Torsión anexial", false, "Flujo conservado y sin masa grande."),
      dx("epi", "Enfermedad pélvica inflamatoria", false, "Sin fiebre ni flujo."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("observacion", "Internación para observación con Hb y ecografía seriadas", "clave", "La mayoría cede sola."),
      mg("analgesia", "Analgesia y reposición de volumen", "clave", "Estabilidad."),
      mg("laparoscopia", "Laparoscopia si hay inestabilidad o caída de Hb", "clave", "Hemoperitoneo progresivo."),
      mg("anticoncepcion", "Anticonceptivos hormonales para evitar recurrencias", "util", "Inhiben la ovulación."),
      mg("ooforectomia", "Ooforectomía", "riesgoso", "Innecesaria y deja secuela reproductiva."),
      mg("alta", "Alta inmediata sin control", "riesgoso", "Puede seguir sangrando."),
    ],
  },
  debrief: {
    diagnosis: "Quiste de cuerpo lúteo hemorrágico roto con hemoperitoneo leve, en mujer de 23 años hemodinámicamente estable.",
    pathologies: [
      { name: "Cuerpo lúteo hemorrágico roto", role: "principal", why: "Sangrado ovárico funcional." },
      { name: "Hemoperitoneo", role: "asociada", why: "Consecuencia." },
      { name: "Ectópico, apendicitis", role: "diferencial", why: "Dolor pélvico agudo." },
    ],
    reasoning: [
      "Causa: sangrado del cuerpo lúteo en la segunda mitad del ciclo.",
      "Mecanismo: rotura con el ejercicio o la relación sexual.",
      "Consecuencia: dolor peritoneal y hemoperitoneo de volumen variable.",
    ],
    epidemiology:
      "Es una causa frecuente de dolor pélvico agudo en mujeres jóvenes, más del lado derecho. La mayoría se maneja sin cirugía. Lo primero siempre es descartar embarazo con beta-hCG.",
    management: [
      "Beta-hCG.",
      "Ecografía.",
      "Observación.",
      "Laparoscopia si sangra.",
    ],
    sources: ["Sociedad Argentina de Ginecología Infanto Juvenil — Dolor pélvico agudo.", "ACOG — Practice Bulletin on Adnexal Masses."],
    pearls: ["Toda mujer con dolor pélvico: beta.", "Fase lútea y poscoital.", "Cuidar el ovario."],
    pitfalls: ["No pedir beta.", "Sacar el ovario."],
    tribunal: [
      qa("¿Cuál es la imagen ecográfica típica?", "Quiste con patrón reticular o en red por coágulos, con flujo periférico en anillo de fuego."),
      qa("¿Por qué es más frecuente del lado derecho?", "Se atribuye a diferencias de presión venosa del ovario derecho y a que el sigmoides protege el izquierdo."),
      qa("¿Qué paciente tiene más riesgo de sangrado grave?", "La anticoagulada o con trastornos de la coagulación como von Willebrand."),
    ],
  },
};
