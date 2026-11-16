import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const encefalopatiaPosteriorReversible: ClinicalCase = {
  id: "encefalopatia-posterior-reversible",
  level: 4,
  area: "Neurología",
  setting: "Guardia",
  patient: { age: 46, ageUnit: "años", sex: "F", context: "Lupus con nefritis en tratamiento con ciclosporina desde hace 2 meses. Hipertensa." },
  frequency: "raro",
  intro: "El marido: “Le dolía mucho la cabeza, empezó a decir que no veía y convulsionó en el auto.”",
  vitals: { TA: "212/124 mmHg", FC: "98 lpm", FR: "18 rpm", "SatO₂": "96 %", "T°": "36,9 °C" },
  anamnesis: [
    act("vision", "¿Qué le pasó en la vista?", "clave", "“Decía que todo estaba borroso y después que no veía nada.”", "Ceguera cortical: compromiso occipital."),
    act("cefalea", "¿Cómo empezó la cefalea?", "clave", "“Fue aumentando durante dos días.”", "Progresiva, no en trueno."),
    act("medicacion", "¿Qué medicación toma y cambió algo?", "clave", "“Ciclosporina y le aumentaron la dosis hace dos semanas.”", "Inmunosupresores: causa clásica de PRES."),
    act("presion", "¿Controla la presión?", "clave", "“La tenía en 160, pero no le cambiaron nada.”", "Hipertensión mal controlada."),
    act("orina", "¿Orina menos o tiene edemas?", "util", "“Tiene los tobillos hinchados.”", "Nefropatía activa."),
    act("perro", "¿Tienen mascotas?", "neutro", "“Un perro.”", "No orienta."),
  ],
  exam: [
    act("neuro", "Examen neurológico", "clave", "Somnolienta, desorientada, no cuenta dedos, reflejos pupilares conservados.", "Ceguera cortical con pupilas normales."),
    act("fondo", "Fondo de ojo", "clave", "Hemorragias en llama y edema de papila leve.", "Retinopatía hipertensiva grave."),
    act("meningeo", "Signos meníngeos", "util", "Ausentes.", "Hace menos probable hemorragia subaracnoidea o meningitis."),
  ],
  studies: [
    study("Imágenes", "tac", "TC de cerebro sin contraste urgente", "clave", "Hipodensidades parietooccipitales bilaterales, sin sangrado.", "Descarta hemorragia; sugiere edema posterior."),
    study("Imágenes", "rmn", "Resonancia de cerebro", "clave", "Hiperintensidad en FLAIR de sustancia blanca parietooccipital bilateral, sin restricción en difusión.", "Edema vasogénico: PRES."),
    study("Laboratorio", "renal", "Creatinina, orina, niveles de ciclosporina", "clave", "Creatinina 2,1 mg/dl, proteinuria, ciclosporina en rango alto.", "Factores precipitantes."),
    study("Laboratorio", "lab", "Magnesio, hemograma y frotis", "util", "Magnesio bajo, sin esquistocitos.", "La hipomagnesemia predispone; descarta microangiopatía."),
    study("Otros", "puncion", "Punción lumbar de entrada", "riesgoso", "No se hizo.", "Hay edema cerebral y no hay fiebre."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("pres", "Síndrome de encefalopatía posterior reversible (PRES) por HTA e inhibidor de calcineurina", true, "Cefalea, ceguera cortical y convulsión con HTA grave, ciclosporina alta y edema vasogénico parietooccipital bilateral."),
      dx("acv-basilar", "ACV de la arteria basilar", false, "La resonancia no muestra restricción en difusión."),
      dx("lupus-neuro", "Lupus neuropsiquiátrico", false, "Patrón de imagen típico de PRES y gatillos claros."),
      dx("trombosis", "Trombosis venosa cerebral", false, "Sin trombo en las imágenes y patrón simétrico posterior."),
      dx("encefalitis", "Encefalitis", false, "Sin fiebre y patrón vasogénico."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("bajar-ta", "Descenso controlado de la presión: 20–25 % en la primera hora con labetalol o nicardipina", "clave", "Emergencia hipertensiva con encefalopatía."),
      mg("suspender-ciclo", "Suspender o reducir la ciclosporina", "clave", "Retirar el desencadenante."),
      mg("anticonvulsivo", "Tratar las convulsiones (benzodiacepina, luego levetiracetam)", "clave", "Control de crisis."),
      mg("magnesio", "Corregir el magnesio", "util", "Predisponente."),
      mg("uti", "Internación en terapia intensiva", "clave", "Monitoreo neurológico y de la presión."),
      mg("bajar-brusco", "Llevar la presión a 120/80 en minutos", "riesgoso", "Riesgo de isquemia cerebral por la autorregulación desplazada."),
      mg("corticoides-altos", "Pulsos de corticoides por lupus neuropsiquiátrico", "innecesario", "No es lupus neuropsiquiátrico."),
    ],
  },
  debrief: {
    diagnosis: "Síndrome de encefalopatía posterior reversible por emergencia hipertensiva y ciclosporina, en una mujer de 46 años con nefritis lúpica.",
    pathologies: [
      { name: "PRES", role: "principal", why: "Edema vasogénico por falla de la autorregulación." },
      { name: "Emergencia hipertensiva y nefritis lúpica", role: "asociada", why: "Gatillos." },
      { name: "ACV de circulación posterior", role: "diferencial", why: "Ceguera cortical aguda." },
    ],
    reasoning: [
      "Causa: hipertensión grave más toxicidad endotelial por inhibidores de la calcineurina.",
      "Mecanismo: el territorio posterior tiene menos inervación simpática y la autorregulación falla primero.",
      "Consecuencia: edema vasogénico reversible si se trata rápido; si no, infarto o hemorragia.",
    ],
    epidemiology:
      "Es raro pero subdiagnosticado. Aparece en emergencias hipertensivas, eclampsia, insuficiencia renal, lupus, trasplantes y quimioterapia. Es más frecuente en mujeres. Con tratamiento a tiempo, la mayoría se recupera por completo.",
    management: [
      "TC y resonancia.",
      "Bajar la presión en forma controlada.",
      "Retirar el fármaco.",
      "Control de crisis y magnesio.",
    ],
    sources: ["Sociedad Argentina de Neurología — Encefalopatía posterior reversible.", "Fugate JE, Rabinstein AA — PRES: clinical and radiological manifestations (Lancet Neurol)."],
    pearls: ["Cefalea + ceguera cortical + convulsión + HTA.", "Ciclosporina, tacrolimus, quimioterapia, eclampsia.", "Edema vasogénico sin restricción en difusión."],
    pitfalls: ["Bajar la presión de golpe.", "Hacer punción lumbar."],
    tribunal: [
      qa("¿Por qué el PRES afecta sobre todo la región posterior?", "Porque el territorio vertebrobasilar tiene menos inervación simpática y su autorregulación falla primero con la hipertensión."),
      qa("¿Qué es la ceguera cortical?", "Pérdida de visión por lesión occipital bilateral con reflejos pupilares conservados y fondo de ojo que puede ser normal."),
      qa("¿Qué causas obstétricas se asocian al PRES?", "La preeclampsia y la eclampsia, que comparten el mecanismo de disfunción endotelial."),
    ],
  },
};
