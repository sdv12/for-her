import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hidatidosis: ClinicalCase = {
  id: "hidatidosis-hepatica",
  level: 3,
  area: "Salud comunitaria",
  setting: "Consultorio",
  patient: { age: 41, ageUnit: "años", sex: "F", context: "Vive en un campo en la línea sur de Río Negro. Crían ovejas." },
  frequency: "poco-frecuente",
  intro: "“Hace meses tengo un dolor sordo debajo de las costillas del lado derecho, y siento la panza llena enseguida. Una vez me salió un sarpullido que me picaba mucho.”",
  vitals: { TA: "118/74 mmHg", FC: "78 lpm", "T°": "36,6 °C", Peso: "64 kg" },
  anamnesis: [
    act("perros", "¿Tienen perros? ¿Qué comen?", "clave", "“Cuatro perros de campo. Cuando carneamos les damos las achuras crudas.”", "Alimentar a los perros con vísceras crudas de ovejas cierra el ciclo de Echinococcus granulosus: es el factor de riesgo central."),
    act("carneo", "¿Carnean en el campo? ¿Desparasitan a los perros?", "clave", "“Carneamos nosotros. A los perros casi nunca los desparasitamos.”", "La faena domiciliaria sin control y la falta de desparasitación de los perros mantienen la transmisión."),
    act("infancia", "¿Dónde se crió? ¿Jugaba con los perros de chica?", "util", "“En el campo, siempre con los perros.”", "La infección suele adquirirse en la infancia, por contacto con perros y manos contaminadas con huevos; el quiste crece durante años."),
    act("urticaria", "¿Cómo fue el sarpullido?", "util", "“Ronchas en todo el cuerpo que se fueron solas en un día.”", "Pequeñas fisuras del quiste liberan antígenos que causan reacciones alérgicas (urticaria) o, si se rompe, anafilaxia."),
    act("ictericia", "¿Se puso amarilla, tuvo fiebre o escalofríos?", "clave", "“No.”", "Ictericia y colangitis indicarían rotura del quiste a la vía biliar, la complicación más frecuente."),
    act("tos", "¿Tiene tos o escupió líquido salado o “pellejitos”?", "util", "“No.”", "La vómica de líquido hidatídico indica quiste pulmonar abierto al bronquio."),
    act("familia", "¿Alguien en la familia tuvo quistes?", "util", "“Mi papá se operó de un quiste de hígado.”", "Los convivientes comparten la exposición: se los estudia con ecografía."),
    act("animales", "¿Cuántas ovejas tienen?", "neutro", "“Unas doscientas.”", "No cambia la conducta, aunque confirma el contexto."),
  ],
  exam: [
    act("higado", "Palpación hepática", "clave", "Hepatomegalia con una masa lisa, renitente, poco dolorosa en el lóbulo derecho.", "Masa quística hepática."),
    act("ictericia", "Piel y escleras", "util", "Sin ictericia.", "No hay compromiso biliar."),
    act("pulmonar", "Auscultación pulmonar", "util", "Normal.", "Los pulmones son la segunda localización más frecuente."),
    act("piel", "Piel", "neutro", "Sin lesiones actuales.", "La urticaria fue transitoria."),
  ],
  studies: [
    study("Imágenes", "eco", "Ecografía abdominal", "clave", "Quiste hepático de 9 cm en el lóbulo derecho con vesículas hijas en su interior (imagen en panal), pared doble.", "Es el estudio de elección y permite clasificar el quiste (OMS: CE1 a CE5). Vesículas hijas: CE2, quiste activo."),
    study("Laboratorio", "serologia", "Serología para hidatidosis (ELISA y Western blot)", "clave", "Positiva.", "Apoya el diagnóstico; puede ser negativa en quistes calcificados o pulmonares."),
    study("Imágenes", "rx", "Radiografía de tórax", "clave", "Normal.", "Busca quistes pulmonares asociados."),
    study("Laboratorio", "lab", "Hemograma y hepatograma", "util", "Eosinofilia leve; hepatograma normal.", "La eosinofilia es inconstante; un hepatograma colestásico sugeriría comunicación biliar."),
    study("Otros", "puncion", "Punción diagnóstica del quiste sin preparación", "riesgoso", "No se realizó.", "La salida de líquido hidatídico puede causar anafilaxia y diseminación (hidatidosis secundaria). Solo se punza como tratamiento (PAIR), con albendazol previo."),
    study("Imágenes", "tc", "Tomografía de abdomen", "util", "Confirma un quiste único con vesículas hijas, sin comunicación biliar evidente.", "Útil para planificar la cirugía."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hidatidosis", "Hidatidosis hepática (quiste hidatídico CE2 de lóbulo derecho)", true, "Exposición rural a perros alimentados con vísceras, masa hepática quística con vesículas hijas en la ecografía y serología positiva."),
      dx("absceso", "Absceso hepático piógeno", false, "Fiebre, dolor intenso, leucocitosis y colección con pared irregular; no vesículas hijas."),
      dx("simple", "Quiste hepático simple", false, "Anecoico, de pared fina, sin vesículas ni serología positiva."),
      dx("hcc", "Hepatocarcinoma", false, "Masa sólida, en general sobre una cirrosis, con alfafetoproteína elevada."),
      dx("amebiano", "Absceso amebiano", false, "Fiebre y dolor, antecedente de viaje o disentería, serología para ameba positiva."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("albendazol", "Albendazol (antes y después de la intervención)", "clave", "Reduce la viabilidad del quiste y el riesgo de siembra durante el tratamiento."),
      mg("cirugia", "Tratamiento quirúrgico o percutáneo (PAIR) según el tipo y la localización, en un centro con experiencia", "clave", "Un quiste activo grande y sintomático requiere intervención; la elección depende de la clasificación OMS."),
      mg("familia", "Ecografía a los convivientes y desparasitación de los perros con praziquantel", "clave", "Busca otros casos y corta el ciclo."),
      mg("prevencion", "Educación: no dar vísceras crudas a los perros, lavado de manos, faena controlada; notificación al SNVS", "clave", "La hidatidosis es de notificación obligatoria y prevenible."),
      mg("vigilar", "Vigilancia ecográfica sin tratamiento", "innecesario", "Es una opción para quistes inactivos o calcificados (CE4–CE5), no para uno activo de 9 cm con síntomas."),
      mg("puncion-sola", "Punción y aspiración sin albendazol ni preparación", "riesgoso", "Riesgo de anafilaxia y de siembra peritoneal."),
    ],
  },
  debrief: {
    diagnosis: "Hidatidosis hepática con quiste activo (CE2 de la OMS) de 9 cm en el lóbulo derecho, en mujer de 41 años de zona rural patagónica.",
    pathologies: [
      { name: "Hidatidosis (equinococosis quística) hepática", role: "principal", why: "Quiste de Echinococcus granulosus." },
      { name: "Absceso hepático y quiste simple", role: "diferencial", why: "Otras lesiones quísticas del hígado." },
      { name: "Rotura del quiste (biliar, peritoneal, anafilaxia)", role: "diferencial", why: "Complicaciones a prevenir." },
    ],
    reasoning: [
      "Causa: Echinococcus granulosus. El perro (huésped definitivo) tiene la tenia en el intestino y elimina huevos en la materia fecal; las ovejas y el humano (huéspedes intermediarios) se infectan al ingerirlos.",
      "Mecanismo: el embrión atraviesa la pared intestinal, llega por la porta al hígado (primer filtro, 70 % de los casos) o al pulmón (segundo filtro) y forma un quiste que crece lentamente durante años.",
      "Consecuencia: masa que comprime (dolor, saciedad), y que puede fisurarse (urticaria, anafilaxia), romperse a la vía biliar (colangitis, ictericia) o infectarse.",
      "El ciclo se cierra cuando el perro come las vísceras crudas con quistes: por eso la prevención es no alimentarlos con achuras y desparasitarlos.",
    ],
    epidemiology:
      "La hidatidosis es endémica en zonas rurales ganaderas de la Argentina, sobre todo en la Patagonia (Río Negro, Neuquén, Chubut, Santa Cruz), la provincia de Buenos Aires y el NOA. Afecta a ambos sexos; la infección suele adquirirse en la infancia y el diagnóstico se hace en adultos jóvenes. Se notifican cientos de casos por año y es un problema de salud pública prevenible.",
    management: [
      "Sospechar ante quistes hepáticos o pulmonares en personas de zonas endémicas.",
      "Ecografía (clasificación OMS) y serología; radiografía de tórax.",
      "Según el estadio: vigilancia (inactivos), albendazol, PAIR o cirugía, siempre con albendazol perioperatorio.",
      "Estudio de convivientes con ecografía.",
      "Prevención: desparasitación de perros, faena controlada, no dar vísceras crudas, educación; notificación.",
    ],
    sources: [
      "Ministerio de Salud de la Nación — Guía para el equipo de salud: hidatidosis.",
      "Clasificación ecográfica de la OMS de la equinococosis quística.",
    ],
    pearls: ["Perros + ovejas + vísceras crudas = hidatidosis.", "Nunca punzar un quiste hidatídico sin preparación.", "La prevención es en el perro."],
    pitfalls: ["Punzar para diagnosticar.", "Olvidar a los convivientes.", "No preguntar por los perros."],
    tribunal: [
      qa("¿Cuál es el ciclo de Echinococcus granulosus?", "El perro (huésped definitivo) aloja la tenia adulta y elimina huevos; ovejas, vacas y el ser humano (huéspedes intermediarios) se infectan al ingerirlos y desarrollan quistes; el perro se infecta al comer vísceras crudas con quistes."),
      qa("¿Qué complicaciones tiene el quiste hidatídico?", "Rotura a la vía biliar (colangitis, ictericia), a la cavidad peritoneal o pleural (anafilaxia, siembra), al bronquio (vómica), infección del quiste y compresión de estructuras vecinas."),
      qa("¿Qué es el PAIR?", "Punción, Aspiración, Inyección de un escolicida y Reaspiración, guiada por ecografía, con albendazol previo; se usa en quistes seleccionados (CE1, CE3a)."),
    ],
  },
};
