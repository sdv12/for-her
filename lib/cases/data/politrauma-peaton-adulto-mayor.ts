import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const politraumaPeatonAdultoMayor: ClinicalCase = {
  id: "politrauma-peaton-adulta-mayor",
  level: 4,
  area: "Traumatología",
  setting: "Guardia",
  patient: { age: 76, ageUnit: "años", sex: "F", context: "Atropellada por una camioneta al cruzar la avenida. Hipertensa, toma bisoprolol." },
  frequency: "frecuente",
  intro: "Llega en ambulancia con collar y tabla: “Fue impacto lateral, estaba consciente, le duele mucho la cadera.”",
  vitals: { TA: "96/60 mmHg", FC: "88 lpm", FR: "24 rpm", "T°": "35,9 °C", "SatO₂": "94 %", Glasgow: "15/15" },
  anamnesis: [
    act("mecanismo", "¿Cómo fue el impacto?", "clave", "Impacto lateral de una camioneta a velocidad media.", "Alta energía."),
    act("betabloqueante", "¿Qué medicación toma?", "clave", "Bisoprolol.", "Enmascara la taquicardia del shock."),
    act("anticoagulantes", "¿Anticoagulantes o antiagregantes?", "clave", "Aspirina.", "Más sangrado."),
    act("dolor", "¿Dónde le duele?", "util", "Cadera y pelvis derecha.", "Fractura pélvica."),
    act("cabeza", "¿Se golpeó la cabeza?", "util", "No recuerda bien.", "TEC."),
    act("nombre", "¿Cómo se llama?", "neutro", "Elena.", "No orienta."),
  ],
  exam: [
    act("abcde", "Evaluación primaria (ABCDE)", "clave", "Vía aérea permeable; hipoventilación basal derecha; pulsos débiles; Glasgow 15; hematoma perineal.", "Shock oculto."),
    act("pelvis", "Pelvis (sin maniobras de compresión repetidas)", "clave", "Dolor e inestabilidad sospechada.", "Fractura pélvica inestable."),
    act("torax", "Tórax", "util", "Crepitación costal derecha.", "Fracturas costales."),
  ],
  studies: [
    study("Imágenes", "efast", "eFAST", "clave", "Sin líquido libre abdominal; sin neumotórax.", "Sangrado probablemente retroperitoneal."),
    study("Imágenes", "rx-pelvis", "Radiografía de pelvis y tórax", "clave", "Fractura en libro abierto de pelvis; tres fracturas costales derechas.", "Fuente de sangrado."),
    study("Laboratorio", "lab", "Hemoglobina, lactato, déficit de bases, coagulograma, grupo", "util", "Lactato 4,1; déficit de bases −7.", "Shock compensado."),
    study("Otros", "fc-normal", "Considerar estable porque la FC es normal", "riesgoso", "No se hizo.", "El betabloqueante oculta el shock."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("pelvis-shock", "Politrauma con fractura de pelvis en libro abierto y shock hemorrágico enmascarado por betabloqueante", true, "Mecanismo de alta energía, pelvis inestable, lactato alto y TA baja para una hipertensa, con FC normal por bisoprolol."),
      dx("estable", "Politrauma estable", false, "Lactato y déficit de bases indican shock."),
      dx("hemoperitoneo", "Hemoperitoneo por lesión esplénica", false, "eFAST negativo."),
      dx("tec", "TEC grave", false, "Glasgow 15."),
      dx("neumotorax", "Neumotórax a tensión", false, "eFAST sin neumotórax."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("faja", "Faja o sábana pélvica a nivel de trocánteres", "clave", "Reduce el volumen pélvico y el sangrado."),
      mg("transfusion", "Protocolo de transfusión masiva y ácido tranexámico", "clave", "Shock hemorrágico."),
      mg("hemostasia", "Angioembolización o packing preperitoneal", "clave", "Control del sangrado."),
      mg("analgesia", "Analgesia y prevenir hipotermia", "util", "Tríada letal."),
      mg("cristaloides-masivos", "Cristaloides en grandes volúmenes", "riesgoso", "Coagulopatía dilucional."),
      mg("compresion-repetida", "Repetir maniobras de compresión pélvica", "riesgoso", "Desplaza coágulos."),
    ],
  },
  debrief: {
    diagnosis: "Politrauma por atropellamiento con fractura de pelvis en libro abierto, fracturas costales y shock hemorrágico enmascarado por betabloqueante, en mujer de 76 años.",
    pathologies: [
      { name: "Fractura de pelvis con shock hemorrágico", role: "principal", why: "Sangrado retroperitoneal." },
      { name: "Fracturas costales y betabloqueo", role: "asociada", why: "Complicaciones y enmascaramiento." },
      { name: "Hemoperitoneo, TEC", role: "diferencial", why: "Otras fuentes de shock." },
    ],
    reasoning: [
      "Causa: impacto lateral de alta energía.",
      "Mecanismo: apertura del anillo pélvico con sangrado venoso y arterial.",
      "Consecuencia: shock hemorrágico que en el anciano no muestra taquicardia.",
    ],
    epidemiology:
      "Los peatones adultos mayores tienen alta mortalidad por siniestros viales en Argentina. Los signos vitales engañan por betabloqueantes, hipertensión previa y menor reserva. El lactato y el déficit de bases ayudan a detectar el shock oculto.",
    management: [
      "ABCDE.",
      "Faja pélvica.",
      "Transfusión y tranexámico.",
      "Hemostasia.",
    ],
    sources: ["Asociación Argentina de Cirugía — Trauma.", "American College of Surgeons — ATLS."],
    pearls: ["En el anciano, la FC engaña.", "Faja en trocánteres.", "Lactato."],
    pitfalls: ["Creerla estable.", "Cristaloides masivos."],
    tribunal: [
      qa("¿Qué es la tríada letal?", "Hipotermia, acidosis y coagulopatía en el trauma grave."),
      qa("¿Dónde se coloca la faja pélvica?", "A nivel de los trocánteres mayores, no en las crestas ilíacas."),
      qa("¿Cuándo se da ácido tranexámico?", "En las primeras 3 horas del trauma con sangrado significativo."),
    ],
  },
};
