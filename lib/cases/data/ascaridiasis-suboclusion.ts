import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const ascaridiasisSuboclusion: ClinicalCase = {
  id: "ascaridiasis-suboclusion",
  level: 2,
  area: "Infectología",
  setting: "Guardia",
  patient: { age: 5, ageUnit: "años", sex: "M", context: "Vive en un paraje rural de Salta, sin agua de red ni cloacas. Nunca lo desparasitaron." },
  frequency: "poco-frecuente",
  intro: "La mamá: “Le duele mucho la panza, vomita y no hace caca hace dos días. Ayer vomitó un gusano.”",
  vitals: { TA: "96/60 mmHg", FC: "126 lpm", FR: "28 rpm", "T°": "37,4 °C", Peso: "15 kg" },
  anamnesis: [
    act("gusano", "¿Cómo era el gusano?", "clave", "“Blanco, largo como un lápiz.”", "Áscaris adulto: mide 15 a 35 cm."),
    act("vomitos", "¿Cómo son los vómitos?", "clave", "“Primero comida, ahora verdes.”", "Vómitos biliosos: obstrucción."),
    act("deposiciones", "¿Hace caca o gases?", "clave", "“Nada hace dos días.”", "Obstrucción intestinal."),
    act("agua", "¿De dónde toman el agua y dónde hacen sus necesidades?", "clave", "“De la acequia, y tenemos letrina.”", "Transmisión fecal-oral por huevos en tierra y agua."),
    act("tos", "¿Tuvo tos hace unas semanas?", "util", "“Sí, con un poco de fiebre.”", "Síndrome de Löffler por migración larvaria pulmonar."),
    act("hermanos", "¿Los hermanos tienen algo?", "util", "“El más grande se rasca la cola.”", "Parasitosis familiar múltiple."),
  ],
  exam: [
    act("abdomen", "Abdomen", "clave", "Distendido, ruidos aumentados, masa palpable móvil en fosa ilíaca derecha 'en ovillo'; sin defensa.", "Ovillo de áscaris: suboclusión sin peritonitis."),
    act("hidratacion", "Hidratación", "clave", "Mucosas secas, relleno capilar de 3 segundos.", "Deshidratación moderada."),
    act("nutricion", "Estado nutricional", "util", "Peso en percentil 5, palidez.", "Desnutrición y anemia asociadas a parasitosis."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de abdomen de pie", "clave", "Niveles hidroaéreos e imágenes lineales en 'miga de pan' en el delgado.", "Sugiere obstrucción por ovillo de áscaris."),
    study("Imágenes", "eco", "Ecografía abdominal", "clave", "Estructuras tubulares móviles dentro de asas, sin líquido libre.", "Ve los parásitos y descarta invaginación."),
    study("Laboratorio", "lab", "Hemograma e ionograma", "clave", "Hb 9,8 g/dl, eosinófilos 9 %, sodio 132 mEq/l.", "Anemia, eosinofilia y trastorno hidroelectrolítico."),
    study("Laboratorio", "coproparasitologico", "Coproparasitológico seriado", "util", "Huevos de Ascaris lumbricoides y Trichuris.", "Confirma y busca otros parásitos."),
    study("Imágenes", "tac", "TC de abdomen con contraste de rutina", "innecesario", "No se realizó.", "La ecografía alcanza en un niño sin peritonitis."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("ascaris", "Suboclusión intestinal por ovillo de Ascaris lumbricoides", true, "Áscaris eliminado, vómitos biliosos, masa en ovillo y radiografía en miga de pan."),
      dx("invaginacion", "Invaginación intestinal", false, "Edad mayor a la típica, sin heces en jalea, y la eco muestra parásitos y no un 'donut'."),
      dx("apendicitis", "Apendicitis", false, "Sin defensa ni fiebre alta; la masa es móvil y con parásitos."),
      dx("bridas", "Obstrucción por bridas", false, "Sin cirugías previas."),
      dx("gastroenteritis", "Gastroenteritis", false, "No hay diarrea y sí hay obstrucción."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("ayuno-sng", "Ayuno, sonda nasogástrica e hidratación endovenosa", "clave", "Tratamiento conservador de la suboclusión: resuelve la mayoría."),
      mg("aceite", "Antihelmíntico recién al resolver la obstrucción (albendazol)", "clave", "Darlo durante la obstrucción puede movilizar el ovillo y completar la oclusión."),
      mg("cirugia-si", "Interconsulta con cirugía y cirugía si hay peritonitis o no resuelve en 48 horas", "clave", "Vólvulo, perforación o isquemia."),
      mg("familia", "Tratar a la familia y educación sobre agua segura, letrinas y lavado de manos", "clave", "Corta la reinfección."),
      mg("hierro", "Hierro y seguimiento nutricional", "util", "Anemia y desnutrición."),
      mg("albendazol-ya", "Albendazol inmediato con la obstrucción en curso", "riesgoso", "La muerte y el movimiento de los parásitos pueden completar la oclusión."),
      mg("laxante", "Laxantes para que evacúe", "riesgoso", "Contraindicados en una obstrucción."),
    ],
  },
  debrief: {
    diagnosis: "Suboclusión intestinal por ovillo de Ascaris lumbricoides con deshidratación moderada, en un niño de 5 años de zona rural del NOA.",
    pathologies: [
      { name: "Ascaridiasis con suboclusión intestinal", role: "principal", why: "Masa de parásitos que obstruye el íleon terminal." },
      { name: "Desnutrición y anemia", role: "asociada", why: "Parasitosis crónica y pobreza." },
      { name: "Invaginación intestinal", role: "diferencial", why: "Masa abdominal con obstrucción en un niño." },
    ],
    reasoning: [
      "Causa: ingestión de huevos de áscaris del suelo o agua contaminada por falta de saneamiento.",
      "Mecanismo: las larvas pasan por el pulmón y los adultos se acumulan en el delgado formando un ovillo.",
      "Consecuencia: obstrucción, vómitos, deshidratación y riesgo de vólvulo o perforación.",
    ],
    epidemiology:
      "La ascaridiasis es la geohelmintiasis más frecuente del mundo. En Argentina predomina en el NOA y el NEA, en niños de 2 a 10 años sin agua segura ni cloacas. La obstrucción ocurre sobre todo con cargas parasitarias altas en menores de 10 años.",
    management: [
      "Tratamiento conservador de la obstrucción.",
      "Antihelmíntico una vez resuelta.",
      "Cirugía ante complicaciones.",
      "Tratamiento familiar, saneamiento y desparasitación periódica.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Parasitosis intestinales.", "Ministerio de Salud de la Nación — Geohelmintiasis: desparasitación masiva."],
    pearls: ["Vómito un gusano + obstrucción = ovillo.", "Primero desobstruir, después albendazol.", "Pensá en la familia y el agua."],
    pitfalls: ["Dar el antiparasitario en plena obstrucción.", "Indicar laxantes."],
    tribunal: [
      qa("¿Cuál es el ciclo de Ascaris lumbricoides?", "Huevo ingerido, larva que atraviesa el intestino, viaja al pulmón, sube por la tráquea, se deglute y madura en el intestino delgado."),
      qa("¿Qué es el síndrome de Löffler?", "Tos, fiebre, eosinofilia e infiltrados pulmonares migratorios por el pasaje larvario por el pulmón."),
      qa("¿Qué complicaciones da además de la obstrucción?", "Migración a la vía biliar con colangitis o pancreatitis, apendicitis, vólvulo y perforación."),
    ],
  },
};
