import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const colaDeCaballo: ClinicalCase = {
  id: "sindrome-cola-de-caballo",
  level: 3,
  area: "Neurología",
  setting: "Guardia",
  patient: { age: 44, ageUnit: "años", sex: "M", context: "Trabaja en un depósito levantando cajas. Tiene lumbalgias a repetición." },
  frequency: "raro",
  intro: "“Hace tres días me agaché a levantar una caja y me agarró un dolor de cintura que baja por las dos piernas. Hoy no siento bien la cola y me cuesta orinar.”",
  vitals: { TA: "142/88 mmHg", FC: "92 lpm", FR: "16 rpm", "T°": "36,6 °C" },
  anamnesis: [
    act("orina", "¿Cómo orinás? ¿Te cuesta empezar o se te escapa?", "clave", "“Hace un día casi no puedo orinar y no siento las ganas.”", "Retención urinaria: bandera roja de síndrome de cola de caballo."),
    act("silla", "¿Sentís bien la zona de la cola, los genitales y la parte interna de los muslos?", "clave", "“La siento dormida, como cuando me siento en el inodoro.”", "Anestesia en silla de montar: muy sugestiva."),
    act("piernas", "¿El dolor baja por una o las dos piernas? ¿Perdiste fuerza?", "clave", "“Por las dos, y el pie izquierdo me arrastra.”", "Ciática bilateral y déficit motor: signos de alarma."),
    act("deposiciones", "¿Controlás la caca?", "util", "“Ayer se me escapó un poco.”", "Incontinencia fecal."),
    act("alarma-otras", "¿Tuviste fiebre, cáncer, pérdida de peso o un golpe fuerte?", "util", "“No.”", "Descarta infección, tumor y fractura."),
    act("sexual", "¿Notaste cambios en la erección?", "util", "“Sí, desde ayer.”", "Disfunción sexual, parte del síndrome."),
    act("deposito", "¿Qué hay en el depósito?", "neutro", "“Bebidas.”", "No orienta."),
  ],
  exam: [
    act("perineal", "Sensibilidad perineal", "clave", "Hipoestesia en región perianal y cara interna de los muslos.", "Anestesia en silla de montar."),
    act("tacto", "Tacto rectal (tono del esfínter)", "clave", "Tono anal disminuido, reflejo anal ausente.", "Compromiso de las raíces sacras."),
    act("motor", "Fuerza y reflejos en miembros inferiores", "clave", "Paresia de la flexión dorsal del pie izquierdo, aquilianos abolidos bilaterales.", "Compromiso radicular múltiple."),
    act("vejiga", "Palpación de vejiga (o ecografía de residuo)", "util", "Globo vesical; residuo de 800 ml.", "Retención urinaria."),
  ],
  studies: [
    study("Imágenes", "rmn", "Resonancia magnética lumbosacra urgente", "clave", "Hernia de disco L4-L5 central masiva que comprime la cola de caballo.", "Confirma la causa y guía la cirugía."),
    study("Otros", "residuo", "Residuo posmiccional", "clave", "800 ml.", "Retención con rebosamiento."),
    study("Imágenes", "rx", "Radiografía de columna lumbar y esperar", "riesgoso", "No se realizó.", "No muestra la hernia y demora la cirugía."),
    study("Laboratorio", "lab", "Laboratorio prequirúrgico", "util", "Normal.", "Para la cirugía."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("ccc", "Síndrome de cola de caballo por hernia de disco L4-L5 masiva", true, "Lumbociatalgia bilateral con retención urinaria, anestesia en silla de montar, tono anal disminuido y déficit motor, con resonancia que muestra hernia central masiva."),
      dx("lumbalgia", "Lumbalgia mecánica", false, "Hay banderas rojas neurológicas."),
      dx("ciatica", "Ciatalgia por hernia de disco simple", false, "La retención, la anestesia perineal y el tono anal bajo indican compromiso de la cola de caballo."),
      dx("hpb", "Retención urinaria por hiperplasia prostática", false, "No explica la anestesia perineal ni el déficit motor."),
      dx("absceso", "Absceso epidural", false, "No hay fiebre ni factores de riesgo; la resonancia muestra hernia."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cirugia", "Descompresión quirúrgica urgente (idealmente en menos de 48 h, cuanto antes mejor)", "clave", "La cirugía temprana mejora la recuperación de la función vesical, intestinal y sexual."),
      mg("sonda", "Sonda vesical", "clave", "Evacua la retención."),
      mg("analgesia", "Analgesia adecuada", "clave", "El dolor es intenso."),
      mg("documentar", "Documentar el examen neurológico y perineal", "util", "Permite comparar la evolución."),
      mg("reposo-casa", "Reposo en casa con antiinflamatorios y control en una semana", "riesgoso", "La demora deja secuelas permanentes (incontinencia, impotencia)."),
      mg("kinesiologia", "Kinesiología para la lumbalgia", "innecesario", "No trata la compresión."),
    ],
  },
  debrief: {
    diagnosis: "Síndrome de cola de caballo completo (con retención) por hernia de disco L4-L5 central masiva, en varón de 44 años con trabajo de carga.",
    pathologies: [
      { name: "Síndrome de cola de caballo", role: "principal", why: "Compresión de múltiples raíces lumbosacras." },
      { name: "Hernia de disco L4-L5", role: "asociada", why: "Causa de la compresión." },
      { name: "Lumbalgia mecánica, ciatalgia simple, absceso epidural", role: "diferencial", why: "Otras causas de dolor lumbar." },
    ],
    reasoning: [
      "Causa: hernia de disco central masiva, por esfuerzo de carga sobre un disco degenerado.",
      "Mecanismo: el material discal comprime las raíces de la cola de caballo dentro del canal (por debajo del cono medular).",
      "Consecuencia: dolor lumbar con ciática bilateral, déficit motor, anestesia en silla de montar y disfunción vesical, intestinal y sexual que puede ser permanente.",
    ],
    epidemiology:
      "El síndrome de cola de caballo es raro (menos del 1 % de las hernias de disco), pero es una emergencia neuroquirúrgica. Afecta sobre todo a adultos de 30 a 50 años. Suele diagnosticarse tarde porque la lumbalgia es muy frecuente y no se preguntan las banderas rojas.",
    management: [
      "Preguntar por banderas rojas en toda lumbalgia (retención, incontinencia, anestesia perineal, déficit motor, fiebre, cáncer, trauma).",
      "Ante sospecha: resonancia urgente.",
      "Descompresión quirúrgica temprana.",
      "Rehabilitación vesical, intestinal y sexual.",
    ],
    sources: ["Asociación Argentina de Neurocirugía — Recomendaciones sobre hernia de disco lumbar.", "Ministerio de Salud de la Nación — Guía de lumbalgia en el primer nivel de atención (banderas rojas)."],
    pearls: ["Lumbalgia + retención + silla de montar = cola de caballo.", "Siempre preguntar por la orina.", "Resonancia y cirugía urgentes."],
    pitfalls: ["No hacer el tacto rectal.", "Mandar a casa con reposo."],
    tribunal: [
      qa("¿Cuáles son las banderas rojas de la lumbalgia?", "Edad menor de 20 o mayor de 50 con primer episodio, traumatismo importante, cáncer previo, fiebre o pérdida de peso, inmunosupresión o drogas EV, dolor no mecánico o nocturno, déficit neurológico progresivo, retención o incontinencia, anestesia en silla de montar y uso prolongado de corticoides."),
      qa("¿Qué diferencia el síndrome de cola de caballo del de cono medular?", "Cola de caballo (raíces): dolor radicular intenso, asimétrico, arreflexia, déficit motor de neurona motora inferior, inicio más gradual. Cono medular: dolor menos intenso, simétrico, disfunción esfinteriana precoz, signos mixtos de neurona superior e inferior."),
      qa("¿Qué raíces se evalúan en el miembro inferior?", "L4: reflejo rotuliano, extensión de la rodilla, sensibilidad medial de la pierna. L5: flexión dorsal del hallux y del pie, sensibilidad del dorso del pie. S1: reflejo aquiliano, flexión plantar, sensibilidad del borde lateral del pie."),
    ],
  },
};
