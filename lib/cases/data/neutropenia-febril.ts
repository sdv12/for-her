import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const neutropeniaFebril: ClinicalCase = {
  id: "neutropenia-febril",
  level: 3,
  area: "Oncología",
  setting: "Guardia",
  patient: { age: 50, ageUnit: "años", sex: "F", context: "En quimioterapia por cáncer de mama; último ciclo hace 9 días. Tiene un catéter implantable." },
  frequency: "frecuente",
  intro: "“Hace dos horas me empezó fiebre de 38,6 con escalofríos. Me siento débil. La oncóloga me dijo que viniera enseguida si tenía fiebre.”",
  vitals: { TA: "102/64 mmHg", FC: "112 lpm", FR: "20 rpm", "T°": "38,7 °C", "SatO₂": "96 %" },
  anamnesis: [
    act("ciclo", "¿Cuándo fue el último ciclo de quimioterapia?", "clave", "“Hace 9 días.”", "Entre los días 7 y 14 del ciclo está el nadir de los neutrófilos: momento de mayor riesgo de infección."),
    act("foco", "¿Tiene tos, ardor al orinar, diarrea, dolor en la boca o en el catéter?", "clave", "“La boca me duele un poco (aftas). Nada más.”", "Busca el foco; muchas veces no se encuentra."),
    act("antibioticos", "¿Toma algún antibiótico o profilaxis?", "util", "“No.”", "Orienta el esquema empírico."),
    act("alergia", "¿Es alérgica a algún antibiótico?", "clave", "“No.”", "Define la elección del betalactámico."),
    act("cateter", "¿Le duele o se enrojeció la zona del catéter?", "util", "“No.”", "Infección del catéter: indicación de cubrir gram positivos."),
    act("internaciones", "¿Estuvo internada recientemente?", "util", "“No.”", "Riesgo de gérmenes resistentes."),
    act("libro", "¿Qué está leyendo?", "neutro", "“Una novela de Piñeiro.”", "No orienta."),
  ],
  exam: [
    act("boca", "Boca y faringe", "clave", "Mucositis grado 1 con aftas.", "La mucosa dañada es puerta de entrada."),
    act("cateter", "Sitio del catéter", "clave", "Sin eritema, dolor ni secreción.", "Descarta infección del túnel o del bolsillo."),
    act("perfusion", "Perfusión y estado general", "clave", "Lúcida, extremidades tibias, relleno capilar 2 s.", "Sin shock por ahora."),
    act("perianal", "Región perianal (inspección, sin tacto rectal)", "util", "Sin lesiones.", "En neutropénicos se inspecciona pero se evita el tacto rectal."),
    act("pulmon", "Auscultación pulmonar", "util", "Normal.", "Sin foco respiratorio."),
  ],
  studies: [
    study("Laboratorio", "hemograma", "Hemograma con recuento absoluto de neutrófilos", "clave", "Leucocitos 600, neutrófilos 200/mm³.", "Neutropenia grave (menos de 500): define la neutropenia febril."),
    study("Microbiología", "hemocultivos", "Dos pares de hemocultivos (uno del catéter y uno periférico) y urocultivo antes del antibiótico", "clave", "Pendientes.", "Se toman sin demorar el antibiótico más de unos minutos."),
    study("Laboratorio", "lab", "Función renal, hepatograma, lactato, PCR", "util", "Creatinina normal, lactato 1,8.", "Evalúan gravedad y dosis."),
    study("Imágenes", "rx", "Radiografía de tórax", "util", "Sin infiltrados.", "Busca neumonía, que puede tener pocos signos sin neutrófilos."),
    study("Laboratorio", "esperar", "Esperar los hemocultivos para iniciar el antibiótico", "riesgoso", "No se realizó.", "La neutropenia febril es una emergencia: antibiótico en la primera hora."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("nf", "Neutropenia febril postquimioterapia, sin foco evidente, de alto riesgo", true, "Fiebre mayor de 38 °C con neutrófilos menores de 500 en el nadir de la quimioterapia, con taquicardia y presión limítrofe."),
      dx("tumoral", "Fiebre tumoral", false, "Es un diagnóstico de exclusión: en un neutropénico, la fiebre es infecciosa hasta que se demuestre lo contrario."),
      dx("farmaco", "Fiebre por fármacos", false, "También es de exclusión."),
      dx("cateter", "Infección del catéter", false, "Posible origen, pero el sitio está sano; se evaluará con los hemocultivos diferenciales."),
      dx("viral", "Infección viral leve", false, "No puede asumirse en un neutropénico grave."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("atb", "Antibiótico endovenoso de amplio espectro con cobertura antipseudomonas (por ejemplo, cefepime o piperacilina-tazobactam) en la primera hora", "clave", "Reduce la mortalidad; Pseudomonas y enterobacterias son las amenazas iniciales."),
      mg("internacion", "Internación con aislamiento protector y controles frecuentes", "clave", "Alto riesgo de deterioro (escala MASCC baja)."),
      mg("fluidos", "Expansión con cristaloides y vigilancia hemodinámica", "util", "Taquicardia y presión limítrofe."),
      mg("vancomicina", "Agregar vancomicina solo si hay sospecha de catéter, piel, neumonía o inestabilidad", "util", "No se agrega de rutina."),
      mg("tacto", "Tacto rectal para buscar abscesos", "riesgoso", "Puede producir bacteriemia en neutropénicos."),
      mg("oral", "Amoxicilina-clavulánico oral y alta", "riesgoso", "Insuficiente para un paciente de alto riesgo."),
    ],
  },
  debrief: {
    diagnosis: "Neutropenia febril postquimioterapia sin foco evidente, de alto riesgo, en mujer de 50 años con cáncer de mama.",
    pathologies: [
      { name: "Neutropenia febril", role: "principal", why: "Fiebre con neutrófilos menores de 500." },
      { name: "Mucositis por quimioterapia", role: "asociada", why: "Puerta de entrada." },
      { name: "Infección del catéter, fiebre tumoral o por fármacos", role: "diferencial", why: "Se consideran tras descartar infección." },
    ],
    reasoning: [
      "Causa: la quimioterapia destruye las células de división rápida, incluidos los precursores de los neutrófilos (nadir a los 7–14 días).",
      "Mecanismo: sin neutrófilos, las bacterias de la propia flora (intestino, piel, boca) atraviesan las mucosas dañadas y pasan a la sangre.",
      "Consecuencia: fiebre como única señal (sin pus ni signos inflamatorios), con riesgo de sepsis y muerte en horas.",
    ],
    epidemiology:
      "La neutropenia febril es la complicación más frecuente y potencialmente mortal de la quimioterapia, con mortalidad del 5–10 %. Es una consulta frecuente en las guardias que atienden pacientes oncológicos, en cualquier sexo y edad.",
    management: [
      "Toda fiebre en un paciente en quimioterapia: hemograma urgente.",
      "Hemocultivos y antibiótico de amplio espectro en la primera hora.",
      "Clasificar el riesgo (MASCC): bajo riesgo puede tratarse por vía oral ambulatoria; alto riesgo, internación.",
      "Ajustar según cultivos y evolución; antifúngicos si persiste la fiebre.",
    ],
    sources: ["Sociedad Argentina de Infectología — Recomendaciones para el manejo de la neutropenia febril en pacientes oncológicos.", "Instituto Nacional del Cáncer — Guía de manejo de toxicidades."],
    pearls: ["Neutrófilos menores de 500 + fiebre = emergencia.", "Antibiótico en la primera hora.", "Sin tacto rectal en neutropénicos."],
    pitfalls: ["Esperar los cultivos.", "Atribuir la fiebre al tumor."],
    tribunal: [
      qa("¿Cómo se define la neutropenia febril?", "Temperatura de 38,3 °C o más en una toma (o 38 °C sostenida por una hora) con un recuento de neutrófilos menor de 500/mm³ o que se espera que caiga por debajo de 500 en 48 h."),
      qa("¿Qué es la escala MASCC?", "Un puntaje de riesgo (gravedad de síntomas, hipotensión, EPOC, tumor sólido, deshidratación, ambulatorio, edad): 21 o más puntos es bajo riesgo y permite tratamiento oral ambulatorio en casos seleccionados."),
      qa("¿Qué gérmenes preocupan en la neutropenia febril?", "Gram negativos (Pseudomonas aeruginosa, enterobacterias) por su gravedad, gram positivos (estafilococos por catéter, estreptococos con mucositis) y, con fiebre persistente, hongos (Candida, Aspergillus)."),
    ],
  },
};
