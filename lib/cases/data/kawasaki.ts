import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const kawasaki: ClinicalCase = {
  id: "enfermedad-de-kawasaki",
  level: 3,
  area: "Pediatría",
  setting: "Guardia",
  patient: { age: 2, ageUnit: "años", sex: "M", context: "Sano, vacunas completas." },
  frequency: "poco-frecuente",
  intro: "“Tiene fiebre alta hace seis días que no baja con nada. Tiene los ojos rojos, los labios rajados y las manos hinchadas. Está muy irritable.” (relata la madre)",
  vitals: { FC: "156 lpm", FR: "30 rpm", "T°": "39,6 °C", "SatO₂": "98 %", Peso: "12 kg" },
  anamnesis: [
    act("fiebre", "¿Desde cuándo tiene fiebre y cómo responde a los antitérmicos?", "clave", "“Seis días, baja muy poco con ibuprofeno.”", "Fiebre de 5 o más días: criterio obligatorio de Kawasaki."),
    act("ojos", "¿Tiene lagañas en los ojos?", "clave", "“No, rojos pero sin lagañas.”", "Conjuntivitis bilateral no purulenta: típica del Kawasaki."),
    act("manos", "¿Cómo están las manos y los pies?", "clave", "“Hinchados y rojos en las palmas.”", "Cambios en extremidades: criterio."),
    act("exantema", "¿Tuvo manchas en el cuerpo?", "util", "“Sí, en el tronco y en la zona del pañal.”", "Exantema polimorfo, a menudo perineal."),
    act("contactos", "¿Alguien más está enfermo? ¿Viajó?", "util", "“No.”", "Ayuda a descartar sarampión y otras infecciones."),
    act("dibujos", "¿Qué dibujos mira?", "neutro", "“Paw Patrol.”", "No orienta."),
  ],
  exam: [
    act("boca", "Labios y boca", "clave", "Labios rojos, secos y fisurados; lengua aframbuesada; sin exudado ni Koplik.", "Cambios orales del Kawasaki."),
    act("ganglios", "Ganglios cervicales", "clave", "Adenopatía cervical unilateral de 2 cm.", "Criterio: mayor de 1,5 cm."),
    act("extremidades", "Manos y pies", "clave", "Edema indurado de dorso de manos y pies, eritema palmar.", "Cambios agudos en extremidades."),
    act("corazon", "Auscultación cardíaca", "util", "Taquicardia, sin soplos ni galope.", "Se busca miocarditis o insuficiencia cardíaca."),
  ],
  studies: [
    study("Imágenes", "eco", "Ecocardiograma", "clave", "Dilatación leve de la coronaria derecha (Z-score 2,6).", "Las lesiones coronarias son la complicación principal: define el seguimiento."),
    study("Laboratorio", "lab", "Hemograma, VSG, PCR, albúmina, transaminasas, orina", "clave", "Leucocitosis 18.000, PCR alta, VSG 85, albúmina 2,9, plaquetas 450.000, leucocituria estéril.", "Hallazgos inflamatorios de apoyo; trombocitosis en la segunda semana."),
    study("Microbiología", "cultivos", "Exudado de fauces y hemocultivo", "util", "Negativos.", "Descartan escarlatina y bacteriemia."),
    study("Laboratorio", "esperar-criterios", "Esperar que se cumplan todos los criterios para tratar", "riesgoso", "No se realizó.", "El tratamiento antes del día 10 reduce los aneurismas; las formas incompletas también se tratan."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("kawasaki", "Enfermedad de Kawasaki completa con dilatación coronaria", true, "Fiebre de 6 días con conjuntivitis no purulenta, cambios orales, exantema, edema de manos y pies, adenopatía cervical, marcadores inflamatorios altos y dilatación coronaria."),
      dx("escarlatina", "Escarlatina", false, "No hay faringitis ni cultivo positivo; la conjuntivitis no es de escarlatina."),
      dx("sarampion", "Sarampión", false, "Falta el pródromo catarral con tos y Koplik; vacunas completas."),
      dx("adenovirus", "Infección por adenovirus", false, "Da conjuntivitis purulenta y faringitis exudativa, sin cambios en extremidades."),
      dx("sim-c", "Síndrome inflamatorio multisistémico por COVID", false, "Puede parecerse, pero suele tener compromiso digestivo y cardíaco grave en niños mayores; sin antecedente."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("igiv", "Gammaglobulina EV 2 g/kg en dosis única", "clave", "Reduce el riesgo de aneurismas coronarios del 25 % a menos del 5 % si se da antes del día 10."),
      mg("aspirina", "Aspirina (dosis moderadas a altas y luego bajas antiagregantes)", "clave", "Antiinflamatoria y antiagregante."),
      mg("seguimiento", "Ecocardiogramas de control a las 2 y 6 semanas", "clave", "Las lesiones coronarias pueden aparecer o progresar."),
      mg("vacunas", "Diferir las vacunas a virus vivos 11 meses después de la gammaglobulina", "util", "La gammaglobulina reduce su eficacia."),
      mg("ibuprofeno", "Seguir con ibuprofeno junto con la aspirina", "riesgoso", "El ibuprofeno antagoniza el efecto antiagregante de la aspirina."),
      mg("antibioticos", "Antibióticos de amplio espectro", "innecesario", "No es una infección bacteriana."),
    ],
  },
  debrief: {
    diagnosis: "Enfermedad de Kawasaki completa al sexto día de fiebre, con dilatación leve de la coronaria derecha, en niño de 2 años.",
    pathologies: [
      { name: "Enfermedad de Kawasaki", role: "principal", why: "Vasculitis aguda de medianos vasos de la infancia." },
      { name: "Dilatación coronaria", role: "asociada", why: "Complicación principal." },
      { name: "Escarlatina, sarampión, adenovirus, SIM-C", role: "diferencial", why: "Otras causas de fiebre con exantema y conjuntivitis." },
    ],
    reasoning: [
      "Causa: desconocida; probablemente una respuesta inmune anómala a un desencadenante (infeccioso) en niños predispuestos.",
      "Mecanismo: vasculitis de arterias de mediano calibre, con predilección por las coronarias.",
      "Consecuencia: fiebre y signos mucocutáneos; dilatación o aneurismas coronarios con riesgo de trombosis, infarto y muerte súbita.",
    ],
    epidemiology:
      "La enfermedad de Kawasaki afecta sobre todo a menores de 5 años, más a varones y a niños de origen asiático. Es la principal causa de cardiopatía adquirida en la infancia en países desarrollados. En Argentina se diagnostica en todos los centros pediátricos, a menudo tarde.",
    management: [
      "Sospecharla ante fiebre de 5 días o más con signos mucocutáneos; considerar formas incompletas.",
      "Ecocardiograma y laboratorio.",
      "Gammaglobulina y aspirina antes del día 10.",
      "Seguimiento cardiológico según las lesiones coronarias.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Consenso de enfermedad de Kawasaki.", "Guías AHA de enfermedad de Kawasaki."],
    pearls: ["Fiebre de 5 días + conjuntivitis sin pus + labios rojos = Kawasaki.", "Gammaglobulina antes del día 10.", "Ecocardiograma siempre."],
    pitfalls: ["Esperar todos los criterios.", "Dar ibuprofeno con la aspirina."],
    tribunal: [
      qa("¿Cuáles son los criterios de la enfermedad de Kawasaki?", "Fiebre de 5 días o más y 4 de 5: conjuntivitis bilateral no purulenta, cambios en labios y boca, exantema polimorfo, cambios en extremidades (edema, eritema, descamación periungueal) y adenopatía cervical mayor de 1,5 cm. Con menos criterios y hallazgos de laboratorio o eco se diagnostica la forma incompleta."),
      qa("¿Por qué no se usa aspirina en niños con virosis?", "Por el síndrome de Reye: encefalopatía e insuficiencia hepática asociada a aspirina en infecciones virales, sobre todo influenza y varicela. El Kawasaki es una excepción con controles; se recomienda vacuna antigripal."),
      qa("¿Cuándo aparece la descamación en el Kawasaki?", "En la fase subaguda (2–3 semanas), con descamación periungueal de dedos de manos y pies, junto con la trombocitosis."),
    ],
  },
};
