import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const preeclampsia: ClinicalCase = {
  id: "preeclampsia-grave",
  level: 2,
  area: "Ginecología y obstetricia",
  setting: "Guardia",
  patient: { age: 28, ageUnit: "años", sex: "F", context: "Primer embarazo, 34 semanas." },
  frequency: "frecuente",
  intro: "“Desde hoy tengo un dolor de cabeza muy fuerte y veo lucecitas. Se me hinchó la cara.”",
  vitals: { TA: "168/112 mmHg", FC: "92 lpm", FR: "18 rpm", "T°": "36,7 °C" },
  anamnesis: [
    act("eg", "¿De cuántas semanas está? ¿Cómo fueron los controles?", "clave", "“34 semanas y 2 días. Los controles estaban bien hasta las 30.”", "La edad gestacional define la conducta obstétrica (maduración, momento de finalizar)."),
    act("neuro", "¿El dolor de cabeza es distinto de otros? ¿Cambios en la vista?", "clave", "“Nunca me dolió así. Veo puntitos brillantes.”", "Cefalea intensa y fotopsias son síntomas de compromiso neurológico: criterios de gravedad e inminencia de eclampsia."),
    act("epigastrio", "¿Le duele la boca del estómago o del lado derecho?", "clave", "“Sí, desde la tarde, como una acidez.”", "El dolor epigástrico o en hipocondrio derecho refleja distensión de la cápsula hepática: criterio de gravedad, pensar en HELLP."),
    act("movimientos", "¿Siente que el bebé se mueve?", "clave", "“Sí, se mueve normal.”", "Primera evaluación del bienestar fetal."),
    act("hta", "¿Era hipertensa antes del embarazo?", "clave", "“No, nunca.”", "HTA que aparece después de las 20 semanas, sin HTA previa: preeclampsia o HTA gestacional, no HTA crónica."),
    act("perdidas", "¿Tuvo pérdida de líquido o de sangre?", "util", "“No.”", "Descarta rotura de membranas y desprendimiento de placenta."),
    act("aas", "¿Le indicaron aspirina durante el embarazo?", "util", "“No.”", "En embarazadas con factores de riesgo se indica aspirina en dosis bajas desde el primer trimestre para prevenir la preeclampsia."),
  ],
  exam: [
    act("ta", "Repetir la presión a los 15 minutos", "clave", "166/110 mmHg.", "Presión ≥ 160/110 sostenida: hipertensión grave que se trata de inmediato."),
    act("rot", "Reflejos osteotendinosos", "clave", "Hiperreflexia generalizada con clonus agotable.", "Irritabilidad del sistema nervioso central: riesgo de eclampsia."),
    act("obstetrico", "Altura uterina y frecuencia cardíaca fetal", "clave", "Altura uterina 31 cm; FCF 142 lpm.", "Bienestar fetal conservado por ahora; la altura algo baja hace pensar en restricción del crecimiento."),
    act("abdomen", "Palpación del abdomen superior", "util", "Dolor a la palpación en epigastrio e hipocondrio derecho.", "Compromiso hepático."),
    act("edemas", "Edemas", "neutro", "Edema en cara y manos.", "Los edemas son frecuentes en el embarazo normal y ya no son criterio diagnóstico de preeclampsia."),
  ],
  studies: [
    study("Laboratorio", "proteinuria", "Proteinuria (índice proteína/creatinina en orina)", "clave", "1,8 (mayor de 0,3).", "Proteinuria significativa: con la HTA confirma preeclampsia."),
    study("Laboratorio", "plaquetas", "Hemograma con plaquetas", "clave", "Hb 12, plaquetas 92.000.", "Plaquetas menores de 100.000: criterio de gravedad."),
    study("Laboratorio", "hepatico", "Transaminasas, LDH y bilirrubina", "clave", "TGO 110, TGP 98, LDH 680, bilirrubina 1,1.", "Transaminasas elevadas y LDH alta: compromiso hepático y hemólisis en curso (síndrome HELLP en evolución)."),
    study("Laboratorio", "renal", "Creatinina y ácido úrico", "util", "Creatinina 1,0, ácido úrico 6,8.", "Una creatinina de 1,0 ya es alta para una embarazada (el filtrado aumenta en el embarazo)."),
    study("Otros", "fetal", "Monitoreo fetal y ecografía Doppler", "clave", "Monitoreo reactivo; peso fetal en el percentil 10; Doppler umbilical normal.", "Evalúa el bienestar fetal y la restricción del crecimiento."),
    study("Laboratorio", "coagulograma", "Coagulograma", "util", "Normal.", "Basal ante una posible cesárea y anestesia."),
    study("Imágenes", "tc", "TC de cerebro", "innecesario", "Normal.", "Solo ante convulsiones atípicas, déficit focal o deterioro del sensorio que no se explica."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("pe", "Preeclampsia con criterios de gravedad (síndrome HELLP en evolución)", true, "HTA ≥ 160/110 después de las 20 semanas con proteinuria, síntomas neurológicos, dolor epigástrico, plaquetopenia y transaminasas elevadas."),
      dx("gestacional", "Hipertensión gestacional", false, "Sería HTA sin proteinuria ni daño de órgano. Acá hay ambos."),
      dx("cronica", "Hipertensión crónica", false, "Requiere HTA previa al embarazo o antes de las 20 semanas."),
      dx("eclampsia", "Eclampsia", false, "Se define por convulsiones. Todavía no las tuvo, pero está en riesgo."),
      dx("higado", "Hígado graso agudo del embarazo", false, "Predominan náuseas, ictericia, hipoglucemia y coagulopatía."),
    ],
  },
  management: {
    prompt: "¿Qué hacés?",
    options: [
      mg("internar", "Internación en un centro con neonatología y terapia intensiva; vía endovenosa", "clave", "Es una emergencia obstétrica: requiere un lugar con capacidad de resolverla."),
      mg("magnesio", "Sulfato de magnesio: impregnación de 4–5 g EV en 15–20 minutos y mantenimiento de 1 g/h, controlando reflejos, diuresis y frecuencia respiratoria; gluconato de calcio disponible", "clave", "Previene la eclampsia. El gluconato de calcio es el antídoto ante intoxicación por magnesio."),
      mg("antihipertensivo", "Antihipertensivo para la presión ≥ 160/110: labetalol EV, hidralazina EV o nifedipina oral", "clave", "Previene el ACV hemorrágico materno; el objetivo es bajarla de forma gradual, sin hipotensión."),
      mg("finalizar", "Finalizar el embarazo una vez estabilizada (≥ 34 semanas con criterios de gravedad)", "clave", "La placenta es la causa: la única cura es la finalización. La vía depende de las condiciones obstétricas."),
      mg("diuresis", "Control de diuresis horaria con sonda vesical", "util", "La oliguria es signo de gravedad y la diuresis guía el uso de magnesio."),
      mg("esperar", "Indicar corticoides y esperar 48 h para finalizar", "riesgoso", "A partir de las 34 semanas, con criterios de gravedad, no se difiere la finalización para completar la maduración pulmonar."),
      mg("sublingual", "Nifedipina sublingual", "riesgoso", "Provoca hipotensión brusca e hipoperfusión placentaria; la nifedipina se da por vía oral."),
      mg("enalapril", "Enalapril", "riesgoso", "Los IECA y ARA II están contraindicados en el embarazo por toxicidad fetal (renal)."),
      mg("diureticos", "Furosemida para los edemas", "riesgoso", "La preeclampsia tiene hipovolemia relativa: los diuréticos la empeoran y comprometen la perfusión placentaria."),
    ],
  },
  debrief: {
    diagnosis: "Preeclampsia con criterios de gravedad a las 34 semanas, con síndrome HELLP en evolución.",
    pathologies: [
      { name: "Preeclampsia con criterios de gravedad", role: "principal", why: "HTA grave con proteinuria y daño de órganos después de las 20 semanas." },
      { name: "Síndrome HELLP", role: "asociada", why: "Hemólisis, transaminasas elevadas y plaquetopenia: forma grave de la preeclampsia." },
      { name: "Eclampsia", role: "asociada", why: "Convulsiones: lo que se busca prevenir con el magnesio." },
      { name: "Restricción del crecimiento fetal", role: "asociada", why: "Por la insuficiencia placentaria." },
      { name: "HTA gestacional, HTA crónica, hígado graso agudo", role: "diferencial", why: "Otros trastornos hipertensivos o hepáticos del embarazo." },
    ],
    reasoning: [
      "Causa: placentación anómala: el trofoblasto no remodela bien las arterias espiraladas, que quedan estrechas.",
      "Mecanismo: la placenta isquémica libera factores antiangiogénicos (sFlt-1, endoglina soluble) que producen disfunción endotelial en todo el cuerpo.",
      "Consecuencias: vasoconstricción (HTA), aumento de la permeabilidad (proteinuria), activación y consumo de plaquetas (plaquetopenia), microangiopatía hepática (transaminasas altas, dolor epigástrico por distensión de la cápsula de Glisson, HELLP), irritabilidad cerebral (cefalea, fotopsias, hiperreflexia → eclampsia) y restricción del crecimiento fetal.",
      "Por eso la cura es extraer la placenta, y el magnesio (que estabiliza la membrana neuronal y es vasodilatador cerebral) previene las convulsiones.",
    ],
    epidemiology:
      "Los trastornos hipertensivos complican una proporción importante de los embarazos y están entre las principales causas directas de muerte materna en Argentina. Factores de riesgo: primer embarazo, extremos de la edad materna, obesidad, HTA crónica, diabetes, enfermedad renal o autoinmune, embarazo múltiple y preeclampsia previa.",
    management: [
      "Confirmar la HTA (≥ 140/90 en dos tomas) y buscar proteinuria y criterios de gravedad.",
      "Con criterios de gravedad: internación, sulfato de magnesio y antihipertensivo si la presión es ≥ 160/110.",
      "Antihipertensivos permitidos: labetalol, hidralazina, nifedipina oral (y alfametildopa en el tratamiento crónico). Nunca IECA ni ARA II.",
      "Finalizar el embarazo: con gravedad y a partir de las 34 semanas, tras estabilizar; antes de las 34, maduración pulmonar si las condiciones lo permiten.",
      "Prevención: aspirina en dosis bajas desde el primer trimestre en embarazadas con factores de riesgo, y control prenatal.",
    ],
    sources: [
      "Ministerio de Salud de la Nación — Guía para el diagnóstico y tratamiento de la hipertensión en el embarazo.",
      "FASGO — Consenso de estados hipertensivos del embarazo.",
    ],
    pearls: [
      "La única cura de la preeclampsia es la finalización del embarazo.",
      "El sulfato de magnesio previene la eclampsia; el antídoto es el gluconato de calcio.",
      "IECA y ARA II, contraindicados en el embarazo.",
    ],
    pitfalls: [
      "Tratar los edemas con diuréticos.",
      "Usar nifedipina sublingual.",
      "Diferir la finalización con criterios de gravedad a las 34 semanas.",
    ],
  },
};
