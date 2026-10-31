import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const placentaPrevia: ClinicalCase = {
  id: "placenta-previa",
  level: 3,
  area: "Ginecología y obstetricia",
  setting: "Guardia",
  patient: { age: 33, ageUnit: "años", sex: "F", context: "Embarazo de 32 semanas. Tuvo dos cesáreas previas." },
  frequency: "poco-frecuente",
  intro: "“Me levanté a la noche y estaba toda mojada de sangre roja, mucha. No me duele nada, no tengo contracciones.”",
  vitals: { TA: "112/70 mmHg", FC: "96 lpm", FR: "18 rpm", "T°": "36,6 °C" },
  anamnesis: [
    act("dolor", "¿Tiene dolor o contracciones?", "clave", "“Nada, solo la sangre.”", "El sangrado rojo, indoloro y sin contracciones en el tercer trimestre es típico de la placenta previa."),
    act("cesareas", "¿Cuántas cesáreas tuvo?", "clave", "“Dos.”", "Las cesáreas previas aumentan el riesgo de placenta previa y de acretismo."),
    act("ecografias", "¿Qué le dijeron en las ecografías?", "clave", "“A las 20 semanas me dijeron que la placenta estaba baja.”", "La placenta baja en el segundo trimestre debe controlarse en el tercero."),
    act("movimientos", "¿Siente moverse al bebé?", "clave", "“Sí, normal.”", "Bienestar fetal."),
    act("trauma", "¿Tuvo un golpe, relaciones recientes o tomó algo?", "util", "“No.”", "Desencadenantes de sangrado."),
    act("grupo", "¿Sabe su grupo y factor?", "util", "“0 negativo.”", "Requiere inmunoglobulina anti-D."),
    act("nombre", "¿Ya eligieron el nombre?", "neutro", "“Juana.”", "No orienta."),
  ],
  exam: [
    act("utero", "Palpación uterina", "clave", "Útero blando, indoloro, sin contracciones; feto en presentación transversa.", "Útero relajado, a diferencia del desprendimiento; las presentaciones anómalas son frecuentes en la placenta previa."),
    act("fcf", "Frecuencia cardíaca fetal", "clave", "140 lpm, reactiva.", "Feto en buen estado."),
    act("especulo", "Especuloscopía cuidadosa", "util", "Sangrado activo leve desde el orificio cervical, cuello sin lesiones.", "Confirma origen intrauterino."),
    act("tacto", "Tacto vaginal", "riesgoso", "La obstetra de guardia te frena: no se hace tacto hasta conocer la ubicación de la placenta.", "Está contraindicado hasta descartar placenta previa: puede desencadenar una hemorragia masiva."),
  ],
  studies: [
    study("Imágenes", "eco", "Ecografía (transabdominal y transvaginal cuidadosa)", "clave", "Placenta previa total sobre la cicatriz de cesárea, sin signos ecográficos claros de acretismo.", "Confirma el diagnóstico; la transvaginal es segura en manos expertas."),
    study("Laboratorio", "lab", "Hemograma, coagulograma, grupo y factor, pruebas cruzadas", "clave", "Hb 10,8, coagulación normal.", "Prepara la transfusión."),
    study("Otros", "monitoreo", "Monitoreo fetal", "util", "Reactivo.", "Bienestar fetal."),
    study("Imágenes", "rmn", "Resonancia de pelvis en la guardia", "innecesario", "No se realizó.", "Se pide de forma programada si se sospecha acretismo."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("pp", "Placenta previa total con sangrado del tercer trimestre, hemodinámicamente estable, con riesgo de acretismo", true, "Sangrado rojo indoloro sin contracciones, útero relajado, cesáreas previas y ecografía con placenta sobre el orificio."),
      dx("dppni", "Desprendimiento prematuro de placenta normoinserta", false, "Daría dolor, útero hipertónico y sangrado oscuro, con sufrimiento fetal."),
      dx("vasa", "Vasa previa", false, "Sangrado con la rotura de membranas y sufrimiento fetal agudo (es sangre fetal)."),
      dx("cervical", "Sangrado de origen cervical (pólipo, ectropión)", false, "La especuloscopía muestra sangrado desde el orificio, con cuello sano."),
      dx("trabajo", "Trabajo de parto pretérmino", false, "No hay contracciones."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("internacion", "Internación, reposo, dos vías y reserva de sangre", "clave", "Riesgo de nuevos sangrados."),
      mg("corticoides", "Corticoides para maduración pulmonar fetal (betametasona)", "clave", "Embarazo de 32 semanas con riesgo de parto prematuro."),
      mg("antid", "Inmunoglobulina anti-D", "clave", "Madre Rh negativa con sangrado."),
      mg("cesarea", "Cesárea programada (36–37 semanas) en un centro con banco de sangre, o de urgencia si el sangrado no cede", "clave", "La placenta previa total contraindica el parto vaginal."),
      mg("tacto-indicado", "Tacto vaginal para evaluar el cuello", "riesgoso", "Puede desencadenar una hemorragia grave."),
      mg("tocolisis-rutina", "Tocolíticos de rutina", "innecesario", "No hay contracciones."),
    ],
  },
  debrief: {
    diagnosis: "Placenta previa total sangrante a las 32 semanas, estable, en mujer con dos cesáreas previas (riesgo de acretismo), Rh negativa.",
    pathologies: [
      { name: "Placenta previa", role: "principal", why: "Placenta que cubre el orificio cervical interno." },
      { name: "Riesgo de acretismo placentario", role: "asociada", why: "Por las cesáreas previas." },
      { name: "Desprendimiento de placenta y vasa previa", role: "diferencial", why: "Otras hemorragias del tercer trimestre." },
    ],
    reasoning: [
      "Causa: implantación de la placenta en el segmento inferior, favorecida por cicatrices uterinas (cesáreas), multiparidad, edad y tabaco.",
      "Mecanismo: en el tercer trimestre el segmento inferior se estira y la placenta, que no puede estirarse, se despega parcialmente.",
      "Consecuencia: sangrado materno rojo, indoloro, recurrente y a veces abundante, con útero relajado y feto en general bien.",
    ],
    epidemiology:
      "La placenta previa ocurre en alrededor de 1 de cada 200 embarazos en el tercer trimestre, y su frecuencia aumenta con el número de cesáreas previas, la edad materna y el tabaco. Con placenta previa y cesáreas previas, el riesgo de acretismo es alto.",
    management: [
      "Sangrado del tercer trimestre: no hacer tacto vaginal hasta conocer la ubicación de la placenta.",
      "Ecografía, estabilización y evaluación fetal.",
      "Internación, maduración pulmonar, anti-D si corresponde.",
      "Cesárea programada o de urgencia en un centro preparado, evaluando acretismo.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de hemorragias del tercer trimestre.", "FASGO — Consenso de placenta previa y acretismo placentario."],
    pearls: ["Sangrado rojo indoloro + útero blando = placenta previa.", "Nunca tacto vaginal antes de la ecografía.", "Cesárea previa + placenta previa = pensar en acretismo."],
    pitfalls: ["Hacer tacto vaginal.", "No preparar sangre."],
    tribunal: [
      qa("¿Qué diferencia la placenta previa del desprendimiento de placenta?", "Placenta previa: sangrado rojo, indoloro, recurrente, útero blando, feto en general bien. Desprendimiento: dolor, útero hipertónico (leñoso), sangrado oscuro (a veces escaso u oculto), sufrimiento fetal y riesgo de coagulopatía."),
      qa("¿Qué es el acretismo placentario?", "La adherencia anormal de la placenta al miometrio (acreta), con invasión (increta) o atravesándolo (percreta), por falta de decidua, casi siempre sobre cicatrices de cesárea; produce hemorragias graves en el alumbramiento."),
      qa("¿Cuáles son las causas de hemorragia del tercer trimestre?", "Placenta previa, desprendimiento de placenta, rotura uterina, vasa previa y causas locales (cervicales y vaginales)."),
    ],
  },
};
