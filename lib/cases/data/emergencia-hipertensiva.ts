import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const emergenciaHipertensiva: ClinicalCase = {
  id: "emergencia-hipertensiva-encefalopatia",
  level: 3,
  area: "Cardiovascular",
  setting: "Guardia",
  patient: { age: 52, ageUnit: "años", sex: "M", context: "Hipertenso. Dejó la medicación hace dos meses porque se le terminó. Remisero." },
  frequency: "frecuente",
  intro: "“Tiene un dolor de cabeza terrible desde ayer, vomitó, ve borroso y está medio confundido.” (relata la esposa)",
  vitals: { TA: "236/138 mmHg", FC: "94 lpm", FR: "20 rpm", "T°": "36,7 °C", "SatO₂": "97 %", Glucemia: "108 mg/dl", Glasgow: "13/15" },
  anamnesis: [
    act("medicacion", "¿Qué medicación toma? ¿La dejó?", "clave", "“Dejó el losartán hace dos meses.”", "Causa frecuente de crisis."),
    act("cefalea", "¿Cómo empezó la cefalea? ¿Fue de golpe?", "clave", "“Fue aumentando, no de golpe.”", "Ayuda a diferenciar de hemorragia subaracnoidea."),
    act("foco", "¿Debilidad, dolor de pecho, disnea?", "clave", "“No.”", "Busca otro daño de órgano blanco."),
    act("drogas", "¿Cocaína, anfetaminas, antiinflamatorios?", "util", "“No.”", "Otras causas."),
    act("convulsion", "¿Tuvo convulsiones?", "util", "“No.”", "Son frecuentes en encefalopatía."),
    act("auto", "¿Qué auto maneja?", "neutro", "“Un Corsa.”", "No orienta."),
  ],
  exam: [
    act("neuro", "Examen neurológico", "clave", "Desorientado, sin foco motor.", "Encefalopatía sin déficit focal."),
    act("fondo", "Fondo de ojo", "clave", "Hemorragias en llama, exudados y edema de papila.", "Retinopatía grado IV."),
    act("corazon", "Corazón, pulmones y pulsos", "util", "Cuarto ruido, sin rales, pulsos simétricos.", "Excluye edema pulmonar y orienta contra disección."),
  ],
  studies: [
    study("Imágenes", "tac", "TC de encéfalo sin contraste", "clave", "Sin sangrado; leve edema posterior.", "Excluye ACV hemorrágico."),
    study("Laboratorio", "lab", "Función renal, ionograma, hemograma, orina, troponina", "clave", "Creatinina 1,9, proteinuria, troponina normal.", "Busca daño renal."),
    study("Electrofisiología", "ecg", "ECG", "clave", "Hipertrofia del VI.", "Daño crónico; excluye isquemia."),
    study("Imágenes", "rmn", "Resonancia", "util", "Edema vasogénico parietooccipital (PRES).", "Confirma si está disponible, sin demorar el tratamiento."),
    study("Otros", "puncion", "Punción lumbar con edema de papila", "riesgoso", "No se realizó.", "Sin sospecha de infección no aporta y hay riesgo de herniación."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("emergencia", "Emergencia hipertensiva con encefalopatía hipertensiva", true, "Presión muy elevada con confusión, cefalea, vómitos, edema de papila y TC sin sangrado."),
      dx("urgencia", "Urgencia hipertensiva", false, "Hay daño agudo de órgano blanco: es emergencia."),
      dx("hsa", "Hemorragia subaracnoidea", false, "La cefalea fue progresiva y la TC es negativa."),
      dx("acv", "ACV isquémico", false, "No hay foco."),
      dx("meningitis", "Meningitis", false, "Sin fiebre ni rigidez de nuca."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("ev", "Internar en cuidados intensivos con antihipertensivo EV titulable (labetalol, nitroprusiato o nicardipina)", "clave", "Permite un descenso controlado."),
      mg("objetivo", "Bajar la presión media no más del 20-25 % en la primera hora", "clave", "Un descenso brusco causa isquemia cerebral, renal o coronaria."),
      mg("causa", "Reiniciar tratamiento oral y buscar causas secundarias al estabilizar", "clave", "Evita recurrencias."),
      mg("sublingual", "Nifedipina sublingual", "riesgoso", "Descenso brusco e impredecible."),
      mg("normalizar", "Llevar a 120/80 mmHg en una hora", "riesgoso", "Riesgo de isquemia por autorregulación desplazada."),
      mg("alta", "Captopril y alta en dos horas", "riesgoso", "Es una emergencia con daño orgánico."),
    ],
  },
  debrief: {
    diagnosis: "Emergencia hipertensiva con encefalopatía, retinopatía grado IV y daño renal, por abandono del tratamiento, en varón de 52 años.",
    pathologies: [
      { name: "Encefalopatía hipertensiva", role: "principal", why: "Falla de la autorregulación cerebral." },
      { name: "Daño renal y retinopatía", role: "asociada", why: "Otros órganos blanco." },
      { name: "Hemorragia subaracnoidea, ACV, meningitis", role: "diferencial", why: "Otras causas de cefalea y confusión." },
    ],
    reasoning: [
      "Causa: HTA crónica sin tratamiento.",
      "Mecanismo: la presión supera la autorregulación cerebral: hiperperfusión y edema vasogénico.",
      "Consecuencia: cefalea, vómitos, confusión, convulsiones, y daño renal y retiniano.",
    ],
    epidemiology:
      "Cerca de 4 de cada 10 adultos argentinos tienen presión alta, y buena parte no lo sabe o no se trata. Las emergencias son menos frecuentes que las urgencias, y las desencadena muchas veces el abandono del tratamiento, a veces por falta de acceso.",
    management: [
      "Distinguir urgencia de emergencia por el daño de órgano.",
      "Tratamiento EV en unidad cerrada.",
      "Descenso gradual: 20-25 % en la primera hora, 160/100 en 2-6 horas.",
      "Seguimiento y adherencia.",
    ],
    sources: ["Sociedad Argentina de Hipertensión Arterial — Consenso de HTA.", "Sociedad Argentina de Cardiología — Consenso de crisis hipertensivas."],
    pearls: ["La definición depende del daño, no del número.", "No bajar demasiado rápido.", "No uses nifedipina sublingual."],
    pitfalls: ["Normalizar la presión de golpe.", "Confundir con urgencia."],
    tribunal: [
      qa("¿Qué diferencia urgencia de emergencia?", "Ambas tienen presión muy elevada, generalmente 180/120 o más. En la emergencia hay daño agudo de órgano blanco y se trata con fármacos EV."),
      qa("¿Qué emergencias requieren descenso más rápido?", "La disección aórtica, el edema agudo de pulmón y la preeclampsia grave o eclampsia."),
      qa("¿Qué es el PRES?", "Un síndrome de encefalopatía posterior reversible, con edema vasogénico parietooccipital, cefalea, convulsiones y alteraciones visuales."),
    ],
  },
};
