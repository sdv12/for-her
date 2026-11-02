import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const sarampion: ClinicalCase = {
  id: "sarampion",
  level: 2,
  area: "Infectología",
  setting: "Guardia",
  patient: { age: 3, ageUnit: "años", sex: "M", context: "Sin vacunas: la familia decidió no vacunarlo. Volvieron hace 10 días de un viaje a Europa." },
  frequency: "poco-frecuente",
  intro: "“Tiene fiebre alta hace cinco días, tos, los ojos rojos y mocos. Hoy le salieron manchas rojas que empezaron en la cara.” (relata la madre)",
  vitals: { FC: "132 lpm", FR: "30 rpm", "T°": "39,4 °C", "SatO₂": "96 %", Peso: "14 kg" },
  anamnesis: [
    act("vacunas", "¿Qué vacunas recibió? ¿Tiene la triple viral?", "clave", "“Ninguna.”", "Sin triple viral es susceptible al sarampión."),
    act("viaje", "¿Viajaron o estuvieron con alguien con fiebre y manchas?", "clave", "“Volvimos de Europa hace 10 días; en el avión había un nene con fiebre.”", "Incubación de 10–14 días tras un viaje a zona con circulación: caso sospechoso importado."),
    act("secuencia", "¿Cómo empezó? ¿Primero la fiebre o las manchas?", "clave", "“Tres días de fiebre, tos, mocos y ojos rojos, y después las manchas desde detrás de las orejas hacia abajo.”", "Pródromo catarral (tos, coriza, conjuntivitis) y exantema cefalocaudal: secuencia típica."),
    act("contactos", "¿Fue al jardín? ¿Hay embarazadas, bebés o personas inmunodeprimidas en contacto?", "clave", "“Fue al jardín ayer. Mi hermana está embarazada.”", "Hay que identificar contactos para el bloqueo."),
    act("respiracion", "¿Le cuesta respirar? ¿Está decaído o convulsionó?", "util", "“Respira rápido, pero está despierto.”", "Busca neumonía y encefalitis."),
    act("diarrea", "¿Tiene diarrea?", "util", "“Un poco.”", "Complicación frecuente que deshidrata."),
    act("dibujo", "¿Qué le gusta dibujar?", "neutro", "“Dinosaurios.”", "No orienta."),
  ],
  exam: [
    act("exantema", "Examen de la piel", "clave", "Exantema maculopapular eritematoso, confluente en cara y tronco, que se extiende a miembros.", "Exantema morbiliforme."),
    act("koplik", "Mucosa oral", "clave", "Puntos blanquecinos sobre fondo rojo en la mucosa yugal frente a los molares.", "Manchas de Koplik: patognomónicas del sarampión."),
    act("ojos", "Conjuntivas", "util", "Conjuntivitis bilateral no purulenta con fotofobia.", "Parte del pródromo."),
    act("pulmon", "Auscultación pulmonar", "util", "Rales finos en base derecha.", "Sospechar neumonía, la complicación que más mata."),
  ],
  studies: [
    study("Laboratorio", "igm", "IgM para sarampión en sangre", "clave", "Positiva.", "Confirma el caso; se notifica ante la sospecha, sin esperar el resultado."),
    study("Microbiología", "pcr", "Hisopado nasofaríngeo y orina para PCR viral", "clave", "Positiva; genotipo D8.", "Identifica el genotipo para saber si es importado."),
    study("Imágenes", "rx", "Radiografía de tórax", "util", "Infiltrado intersticial en base derecha.", "Neumonía por sarampión."),
    study("Laboratorio", "antiestreptolisina", "ASTO y exudado de fauces", "innecesario", "No se realizó.", "No orienta: la escarlatina no tiene pródromo catarral ni Koplik."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("sarampion", "Sarampión importado con neumonía, en niño no vacunado", true, "Fiebre, tos, coriza y conjuntivitis seguidas de exantema cefalocaudal, manchas de Koplik e IgM positiva tras un viaje, sin vacuna."),
      dx("rubeola", "Rubéola", false, "Es más leve, con adenopatías retroauriculares y sin Koplik ni pródromo intenso."),
      dx("roseola", "Exantema súbito", false, "El exantema aparece al bajar la fiebre, en lactantes."),
      dx("escarlatina", "Escarlatina", false, "Exantema áspero con lengua aframbuesada y faringitis."),
      dx("kawasaki", "Enfermedad de Kawasaki", false, "No hay cambios en manos y pies ni labios fisurados; Koplik orienta a sarampión."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("aislamiento", "Aislamiento respiratorio (por aerosoles) hasta 4 días después del inicio del exantema", "clave", "Es de los virus más contagiosos que existen."),
      mg("notificar", "Notificación inmediata al sistema de vigilancia ante la sospecha", "clave", "Permite el bloqueo de contactos en 72 h; Argentina está en eliminación."),
      mg("vitamina-a", "Vitamina A en dos dosis", "clave", "Reduce la gravedad y la mortalidad."),
      mg("contactos", "Bloqueo: vacuna a contactos susceptibles en 72 h y gammaglobulina a embarazadas, lactantes e inmunodeprimidos en 6 días", "clave", "Previene casos secundarios."),
      mg("sosten", "Antitérmicos, hidratación y control de la neumonía (antibiótico si hay sobreinfección bacteriana)", "util", "No hay antiviral específico."),
      mg("ambulatorio-jardin", "Volver al jardín cuando baje la fiebre", "riesgoso", "Sigue contagiando hasta 4 días después del exantema."),
    ],
  },
  debrief: {
    diagnosis: "Sarampión confirmado, importado, complicado con neumonía, en niño de 3 años no vacunado.",
    pathologies: [
      { name: "Sarampión", role: "principal", why: "Infección por virus del sarampión con IgM positiva." },
      { name: "Neumonía por sarampión", role: "asociada", why: "Complicación más frecuente y grave." },
      { name: "Rubéola, roséola, escarlatina, Kawasaki", role: "diferencial", why: "Otras enfermedades exantemáticas." },
    ],
    reasoning: [
      "Causa: virus del sarampión (paramixovirus) transmitido por aerosoles; contagia a casi todos los susceptibles expuestos.",
      "Mecanismo: se replica en el epitelio respiratorio y en el tejido linfoide, produce viremia y lesiona piel y mucosas; además causa inmunosupresión prolongada (amnesia inmunológica).",
      "Consecuencia: pródromo catarral, Koplik y exantema; complicaciones como otitis, neumonía, diarrea, encefalitis y, años después, panencefalitis esclerosante subaguda.",
    ],
    epidemiology:
      "Argentina eliminó la circulación endémica del sarampión en 2000, pero hay casos importados y brotes en personas no vacunadas, como en 2019–2020. La caída de las coberturas de vacunación aumenta el riesgo. Los niños pequeños, desnutridos y los adultos tienen las formas más graves.",
    management: [
      "Todo caso de fiebre y exantema es sospechoso de sarampión o rubéola: notificar y tomar muestras.",
      "Aislamiento respiratorio y vitamina A.",
      "Bloqueo de contactos: vacuna en 72 h o gammaglobulina en 6 días según el grupo.",
      "Verificar y completar el esquema de triple viral en la comunidad.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de vigilancia del sarampión y la rubéola (enfermedad febril exantemática).", "Calendario Nacional de Vacunación."],
    pearls: ["Fiebre + exantema = sospechar sarampión y notificar.", "Tos, coriza, conjuntivitis y Koplik.", "Vitamina A a todos."],
    pitfalls: ["No aislar en la guardia.", "Esperar el resultado para notificar."],
    tribunal: [
      qa("¿Cuál es el esquema de triple viral en Argentina?", "Dos dosis: a los 12 meses y al ingreso escolar (5 años); a adultos nacidos después de 1965 sin dos dosis documentadas se les da doble o triple viral; y antes de viajar, lactantes de 6 a 11 meses reciben una dosis extra."),
      qa("¿Qué es la definición de caso sospechoso de enfermedad febril exantemática?", "Toda persona con fiebre y exantema, o en quien un profesional sospeche sarampión o rubéola, independientemente de la vacunación; se notifica dentro de las 24 h y se toman muestras de sangre, orina e hisopado."),
      qa("¿Qué es la panencefalitis esclerosante subaguda?", "Una complicación tardía y mortal del sarampión, años después de la infección (más si fue antes de los 2 años), con deterioro neurológico progresivo por persistencia del virus en el sistema nervioso."),
    ],
  },
};
