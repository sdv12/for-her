import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const placentaAcreta: ClinicalCase = {
  id: "placenta-previa-acretismo",
  level: 3,
  area: "Ginecología y obstetricia",
  setting: "Internación",
  patient: { age: 36, ageUnit: "años", sex: "F", context: "Embarazo de 34 semanas. Tres cesáreas previas y un legrado." },
  frequency: "poco-frecuente",
  intro: "“Tuve un sangrado rojo sin dolor, como hace dos semanas. El bebé se mueve bien.”",
  vitals: { TA: "112/68 mmHg", FC: "94 lpm", "T°": "36,6 °C", "SatO₂": "98 %", Peso: "78 kg" },
  anamnesis: [
    act("sangrado", "¿Cómo fue? ¿Duele?", "clave", "“Rojo, sin dolor.”", "Placenta previa."),
    act("cesareas", "¿Cesáreas, legrados, cirugías?", "clave", "“Tres cesáreas y un legrado.”", "Acretismo."),
    act("eco", "¿Te dijeron dónde está la placenta?", "clave", "“Que estaba baja.”", "Evaluar."),
    act("hematuria", "¿Sangre en la orina?", "util", "“No.”", "Invasión vesical."),
    act("contracciones", "¿Contracciones?", "util", "“No.”", "Amenaza."),
    act("carrera", "¿Qué estudiaste?", "neutro", "“Contaduría.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Útero", "clave", "Blando, sin dolor.", "No es desprendimiento."),
    act("fetal", "Latidos", "clave", "Normales.", "Estable."),
    act("no-tacto", "No hacer tacto vaginal", "clave", "No se realiza.", "Puede provocar hemorragia."),
  ],
  studies: [
    study("Imágenes", "eco", "Ecografía con Doppler", "clave", "Placenta previa total, pérdida de interfase, lagunas vasculares.", "Sugiere acretismo."),
    study("Imágenes", "rmn", "RM pelviana si dudas", "util", "Invasión miometrial anterior.", "Planifica."),
    study("Laboratorio", "lab", "Hemograma, grupo, coagulación", "clave", "Hb 10,2.", "Prepara."),
    study("Otros", "tacto", "Tacto vaginal para comprobar", "riesgoso", "No se realizó.", "Hemorragia."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("acreta", "Placenta previa con espectro de acretismo placentario, por cesáreas previas", true, "Sangrado indoloro, cesáreas, ecografía típica."),
      dx("dppni", "Desprendimiento", false, "Sin dolor y útero blando."),
      dx("vasa", "Vasa previa", false, "Eco y feto normal."),
      dx("parto", "Parto pretérmino", false, "Sin contracciones."),
      dx("cervical", "Pólipo cervical", false, "Hay imagen clara."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("centro", "Derivar a centro de alta complejidad con equipo multidisciplinario", "clave", "Reduce mortalidad."),
      mg("cesarea", "Cesárea programada a las 34 a 36 semanas e histerectomía planificada", "clave", "Sin intentar desprender."),
      mg("corticoide", "Maduración pulmonar y hierro", "clave", "Prematuro y anemia."),
      mg("sangre", "Banco de sangre listo", "clave", "Sangrado masivo."),
      mg("extraer", "Intentar extraer la placenta manualmente", "riesgoso", "Hemorragia catastrófica."),
      mg("parto", "Parto vaginal", "riesgoso", "Contraindicado."),
    ],
  },
  debrief: {
    diagnosis: "Placenta previa con espectro de acretismo placentario, a las 34 semanas, en mujer de 36 años con tres cesáreas.",
    pathologies: [
      { name: "Placenta previa con acretismo", role: "principal", why: "Invasión anormal." },
      { name: "Hemorragia y riesgo de histerectomía", role: "asociada", why: "Complicaciones." },
      { name: "Desprendimiento, vasa previa", role: "diferencial", why: "Otras hemorragias." },
    ],
    reasoning: [
      "Causa: daño endometrial por cirugías previas.",
      "Mecanismo: la placenta invade el miometrio.",
      "Consecuencia: hemorragia masiva al intentar separarla.",
    ],
    epidemiology:
      "Su frecuencia aumenta junto con las cesáreas. En Argentina, las cesáreas superan ampliamente lo recomendado, y las pacientes con placenta previa y varias cesáreas tienen riesgo muy alto. El diagnóstico prenatal y el traslado programado mejoran mucho los resultados.",
    management: [
      "Identificar riesgo.",
      "Diagnóstico por imágenes.",
      "Planificación y derivación.",
      "Histerectomía planificada.",
    ],
    sources: ["FASGO — Consenso de acretismo placentario.", "FIGO — Consensus Guidelines on Placenta Accreta Spectrum."],
    pearls: ["Sangrado indoloro: nunca tacto.", "Cesáreas más previa: acretismo.", "No tirar de la placenta."],
    pitfalls: ["Hacer tacto vaginal.", "Operar sin equipo."],
    tribunal: [
      qa("¿Qué significa acreta, increta y percreta?", "Acreta adhiere al miometrio, increta lo invade y percreta atraviesa la serosa."),
      qa("¿Qué diferencias hay entre previa y desprendimiento?", "Previa: indolora y sangre roja. Desprendimiento: dolor y útero tenso."),
      qa("¿Cuántas cesáreas aumentan el riesgo?", "El riesgo aumenta con cada cesárea, de forma importante desde la segunda o tercera."),
    ],
  },
};
