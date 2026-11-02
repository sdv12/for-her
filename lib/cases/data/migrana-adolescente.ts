import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const migranaAdolescente: ClinicalCase = {
  id: "migrana-adolescente-abuso-analgesicos",
  level: 1,
  area: "Neurología",
  setting: "Consultorio",
  patient: { age: 15, ageUnit: "años", sex: "M", context: "Toma ibuprofeno casi todos los días. Su mamá tiene migraña." },
  frequency: "frecuente",
  intro: "“Me duele la cabeza casi todos los días hace tres meses. Algunos días es tan fuerte que vomito y me tengo que acostar a oscuras.”",
  vitals: { TA: "112/70 mmHg", FC: "72 lpm", "T°": "36,5 °C" },
  anamnesis: [
    act("frecuencia", "¿Cuántos días por mes te duele y cuántos tomás pastillas?", "clave", "“Unos 20 días; tomo ibuprofeno casi todos.”", "Más de 15 días de cefalea y analgésicos más de 10–15 días por mes: cefalea por uso excesivo de medicación sobre una migraña."),
    act("caracteristicas", "¿Cómo son los dolores fuertes?", "clave", "“De un lado, latiendo, con náuseas, me molesta la luz y el ruido.”", "Criterios de migraña."),
    act("alarma", "¿Te despierta de noche, empeora al toser, tenés vómitos en chorro, cambios de visión o debilidad?", "clave", "“No.”", "Sin banderas rojas: no requiere imágenes."),
    act("desencadenantes", "¿Cómo dormís? ¿Pantallas, comidas salteadas, cafeína?", "util", "“Me duermo a las 3 con el celular; no desayuno; tomo energizantes.”", "Desencadenantes modificables."),
    act("animo", "¿Cómo estás de ánimo? ¿En la escuela?", "util", "“Falto mucho, me está yendo mal.”", "Impacto funcional; buscar ansiedad y depresión."),
    act("juego", "¿Qué jugás online?", "neutro", "“Fortnite.”", "No orienta."),
  ],
  exam: [
    act("neuro", "Examen neurológico completo", "clave", "Normal.", "Sin signos focales."),
    act("fondo", "Fondo de ojo", "clave", "Papilas de bordes nítidos.", "Descarta hipertensión endocraneana."),
    act("ta-ex", "Presión arterial", "util", "Normal.", "Descarta hipertensión como causa."),
  ],
  studies: [
    study("Imágenes", "rmn", "Resonancia de cerebro", "innecesario", "No se realizó.", "Sin banderas rojas y examen normal, no está indicada."),
    study("Otros", "diario", "Diario de cefaleas por un mes", "clave", "22 días con dolor, 18 con ibuprofeno.", "Confirma la frecuencia y el uso de analgésicos."),
    study("Otros", "eeg", "Electroencefalograma", "innecesario", "No se realizó.", "No sirve para diagnosticar migraña."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("moh", "Migraña sin aura con cefalea por uso excesivo de analgésicos (cronificación)", true, "Crisis típicas de migraña con antecedente familiar, ahora más de 15 días por mes con ibuprofeno casi diario, sin banderas rojas."),
      dx("tumor", "Tumor cerebral", false, "No hay signos de alarma y el examen y el fondo de ojo son normales."),
      dx("tensional", "Cefalea tensional", false, "Las crisis tienen características de migraña."),
      dx("sinusitis", "Sinusitis", false, "No hay síntomas nasales ni fiebre."),
      dx("hipertension", "Hipertensión intracraneal idiopática", false, "Fondo de ojo normal; sin obesidad."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("retirar", "Explicar y retirar el uso excesivo de analgésicos (limitar a menos de 2–3 días por semana)", "clave", "Sin suspender el exceso, la cefalea no mejora."),
      mg("preventivo", "Tratamiento preventivo (por ejemplo, flunarizina, propranolol o amitriptilina en dosis bajas)", "clave", "Indicado con crisis frecuentes."),
      mg("habitos", "Higiene del sueño, comidas regulares, menos pantallas y sin energizantes", "clave", "Reducen la frecuencia."),
      mg("crisis", "Plan para las crisis: ibuprofeno temprano o triptán nasal según la edad, solo esos días", "util", "Tratar bien la crisis sin abusar."),
      mg("opioides", "Tramadol para los días de dolor", "riesgoso", "Empeora la cronificación y genera dependencia."),
      mg("rmn-tranquilizar", "Resonancia para tranquilizar a la familia", "innecesario", "Sin indicación clínica; puede mostrar hallazgos incidentales."),
    ],
  },
  debrief: {
    diagnosis: "Migraña sin aura cronificada por uso excesivo de analgésicos, con desencadenantes de sueño y alimentación, en adolescente de 15 años con impacto escolar.",
    pathologies: [
      { name: "Migraña sin aura", role: "principal", why: "Crisis con criterios de migraña." },
      { name: "Cefalea por uso excesivo de medicación", role: "asociada", why: "Analgésicos más de 15 días por mes." },
      { name: "Tumor cerebral, hipertensión intracraneal", role: "diferencial", why: "Se descartan por la clínica." },
    ],
    reasoning: [
      "Causa: predisposición genética a la migraña, con desencadenantes (sueño, ayuno, cafeína).",
      "Mecanismo: activación del sistema trigeminovascular; el uso frecuente de analgésicos sensibiliza las vías del dolor y baja el umbral.",
      "Consecuencia: más días de dolor y peor respuesta a los tratamientos.",
    ],
    epidemiology:
      "La migraña afecta a alrededor del 10 % de los adolescentes; antes de la pubertad es similar en ambos sexos y después predomina en mujeres. La cefalea por uso excesivo de medicación es frecuente cuando se automedica con analgésicos de venta libre.",
    management: [
      "Diagnóstico clínico con banderas rojas negativas.",
      "Diario de cefaleas.",
      "Retirar el exceso de analgésicos, prevención farmacológica y hábitos.",
      "Seguimiento escolar y emocional.",
    ],
    sources: ["Sociedad Argentina de Neurología Infantil — Consenso de cefaleas en pediatría.", "Clasificación internacional de cefaleas (ICHD-3)."],
    pearls: ["Analgésicos más de 10–15 días por mes = cronificación.", "Sin banderas rojas: sin imágenes.", "Diario de cefaleas."],
    pitfalls: ["Pedir resonancia de rutina.", "Usar opioides."],
    tribunal: [
      qa("¿Cuáles son los criterios de migraña sin aura?", "Al menos 5 crisis de 4 a 72 h (2 a 72 h en niños) con 2 de: unilateral, pulsátil, intensidad moderada o grave, empeora con la actividad; y 1 de: náuseas o vómitos, fotofobia y fonofobia."),
      qa("¿Qué es la cefalea por uso excesivo de medicación?", "Una cefalea de 15 o más días por mes en una persona con cefalea previa, con uso regular de analgésicos simples 15 o más días por mes, o de triptanes, opioides o combinados 10 o más días por mes, durante más de 3 meses."),
      qa("¿Qué banderas rojas de cefalea hay en niños?", "Cefalea que despierta de noche o al despertar con vómitos, empeora con Valsalva, cambio de patrón, edad menor de 6 años, alteraciones neurológicas, del fondo de ojo o de la conducta, detención del crecimiento y occipital persistente."),
    ],
  },
};
