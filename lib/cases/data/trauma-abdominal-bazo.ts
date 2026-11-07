import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const traumaAbdominalBazo: ClinicalCase = {
  id: "trauma-abdominal-rotura-bazo",
  level: 3,
  area: "Cirugía",
  setting: "Guardia",
  patient: { age: 19, ageUnit: "años", sex: "M", context: "Accidente en moto sin casco contra un cordón hace 40 minutos. Lo trae el SAME." },
  frequency: "frecuente",
  intro: "“Me duele la panza arriba a la izquierda y el hombro izquierdo. Estoy mareado.”",
  vitals: { TA: "84/50 mmHg", FC: "132 lpm", FR: "28 rpm", "T°": "36,1 °C", "SatO₂": "96 %", Glasgow: "14/15" },
  anamnesis: [
    act("mecanismo", "¿Cómo fue el choque? ¿Qué te golpeó?", "clave", "“Me golpeé el costado contra el manubrio.”", "Mecanismo: trauma cerrado izquierdo."),
    act("hombro", "¿Te golpeaste el hombro?", "clave", "“No, igual me duele.”", "Signo de Kehr: irritación diafragmática por sangre."),
    act("ample", "¿Alergias, medicación, enfermedades, última comida?", "clave", "“Nada; comí hace 2 horas.”", "AMPLE."),
    act("alcohol", "¿Tomaste alcohol o drogas?", "util", "“Dos cervezas.”", "Altera la evaluación."),
    act("mono", "¿Tuviste mononucleosis hace poco?", "util", "“No.”", "Bazo agrandado se rompe más."),
    act("moto", "¿Qué moto tenés?", "neutro", "“Una 110.”", "No orienta."),
  ],
  exam: [
    act("abcde", "Evaluación primaria ABCDE con cuello protegido", "clave", "Vía aérea permeable, tórax estable, shock de clase III, Glasgow 14.", "Se tratan primero las amenazas de vida."),
    act("abdomen", "Abdomen", "clave", "Hematoma en flanco izquierdo, dolor con defensa, distensión.", "Lesión intraabdominal."),
    act("pelvis", "Pelvis y huesos largos", "util", "Pelvis estable.", "Otras fuentes de sangrado."),
    act("torax", "Tórax", "util", "Dolor en costillas inferiores izquierdas, murmullo conservado.", "Asociado a lesión esplénica."),
  ],
  studies: [
    study("Imágenes", "efast", "eFAST en sala", "clave", "Líquido libre en el espacio esplenorrenal y Douglas; sin neumotórax ni líquido pericárdico.", "Con inestabilidad y FAST positivo: quirófano."),
    study("Laboratorio", "lab", "Grupo y factor, hemograma, gases, lactato, coagulación", "clave", "Hb 10, lactato 6,1, base -10.", "El hematocrito inicial puede ser normal."),
    study("Imágenes", "tac", "Llevarlo a TC, estando inestable", "riesgoso", "No se realizó.", "La TC es para pacientes estables."),
    study("Imágenes", "rx", "Rx de tórax y pelvis en sala", "util", "Fractura de costillas 10 y 11 izquierdas.", "Se asocia con lesión esplénica."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("bazo", "Shock hemorrágico por trauma abdominal cerrado con probable rotura de bazo", true, "Mecanismo, Kehr, costillas, eFAST positivo y clase III de shock."),
      dx("neumotorax", "Neumotórax a tensión", false, "Murmullo conservado y sin neumotórax."),
      dx("taponamiento", "Taponamiento", false, "Sin líquido pericárdico."),
      dx("neurogenico", "Shock neurogénico", false, "Hay taquicardia, sin déficit medular."),
      dx("pelvis", "Fractura de pelvis", false, "Pelvis estable."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("laparotomia", "Laparotomía de urgencia", "clave", "Paciente inestable con FAST positivo."),
      mg("transfusion", "Transfusión masiva 1:1:1, ácido tranexámico antes de 3 horas", "clave", "Reanimación con hemoderivados."),
      mg("hipotension", "Hipotensión permisiva, calor, control del calcio", "clave", "Evita coagulopatía y sobrecarga."),
      mg("vacunas", "Vacunar contra encapsulados si hay esplenectomía", "clave", "Previene sepsis fulminante."),
      mg("cristaloides", "Muchos litros de cristaloides", "riesgoso", "Coagulopatía dilucional."),
      mg("observar", "Observación conservadora", "riesgoso", "Solo en pacientes estables."),
    ],
  },
  debrief: {
    diagnosis: "Shock hemorrágico por trauma abdominal cerrado con rotura esplénica, en varón de 19 años motociclista.",
    pathologies: [
      { name: "Rotura de bazo", role: "principal", why: "Es el órgano macizo más lesionado en trauma cerrado." },
      { name: "Shock hemorrágico", role: "asociada", why: "Pérdida masiva de volumen." },
      { name: "Neumotórax, taponamiento, pelvis", role: "diferencial", why: "Otras causas de shock en trauma." },
    ],
    reasoning: [
      "Causa: golpe directo en hipocondrio izquierdo.",
      "Mecanismo: el bazo, friable y vascular, se rompe y sangra a la cavidad.",
      "Consecuencia: shock hipovolémico, tríada letal de hipotermia, acidosis y coagulopatía.",
    ],
    epidemiology:
      "El trauma es la principal causa de muerte en jóvenes argentinos, y los siniestros en moto tienen un papel importante, con predominio en varones. El bazo es el órgano abdominal más lesionado en el trauma cerrado. El casco y las medidas de seguridad reducen la gravedad.",
    management: [
      "ABCDE, dos accesos, hemoderivados.",
      "eFAST y decisión según estabilidad.",
      "Laparotomía si es inestable; TC si es estable.",
      "Vacunar si hay esplenectomía.",
    ],
    sources: ["ATLS — Curso de soporte vital avanzado en trauma.", "Agencia Nacional de Seguridad Vial — Estadísticas."],
    pearls: ["Inestable + FAST positivo: quirófano, no TC.", "Dolor en hombro izquierdo: Kehr.", "Tríada letal."],
    pitfalls: ["Llevar a TC inestable.", "Administrar muchos cristaloides."],
    tribunal: [
      qa("¿Cuáles son las clases de shock hemorrágico?", "I: menos del 15 %. II: 15 a 30 %. III: 30 a 40 %, con hipotensión. IV: más del 40 %, con riesgo de muerte."),
      qa("¿Qué vacunas se indican tras esplenectomía?", "Antineumocócica, antimeningocócica y anti-Haemophilus, además de la antigripal anual."),
      qa("¿Qué es la tríada letal?", "Hipotermia, acidosis y coagulopatía, que se retroalimentan."),
    ],
  },
};
