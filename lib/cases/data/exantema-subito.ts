import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const exantemaSubito: ClinicalCase = {
  id: "exantema-subito-roseola",
  level: 1,
  area: "Infectología",
  setting: "Guardia",
  patient: { age: 11, ageUnit: "meses", sex: "F", context: "Sana. Vacunas al día. La traen los papás." },
  frequency: "muy-frecuente",
  intro: "“Tuvo fiebre de 39,5 tres días sin otro síntoma. Hoy se le fue la fiebre y le salieron manchitas en todo el cuerpo.”",
  vitals: { FC: "122 lpm", FR: "30 rpm", "T°": "36,8 °C", Peso: "9,2 kg" },
  anamnesis: [
    act("secuencia", "¿Primero fue la fiebre y después las manchas?", "clave", "“Sí, cuando bajó la fiebre aparecieron.”", "Secuencia típica."),
    act("estado", "¿Cómo estaba con la fiebre?", "clave", "“Bastante bien, jugaba.”", "Buen estado."),
    act("convulsion", "¿Tuvo convulsiones?", "clave", "“No.”", "Convulsión febril frecuente en esta infección."),
    act("farmacos", "¿Le dieron antibióticos?", "util", "“No.”", "Para no confundir con alergia."),
    act("contactos", "¿Otros chicos enfermos?", "util", "“No sabemos.”", "Contagio."),
    act("nombre", "¿Cómo se llama?", "neutro", "“Valentina.”", "No orienta."),
  ],
  exam: [
    act("piel", "Piel", "clave", "Exantema maculopapular rosado en tronco y cuello, que se blanquea.", "Roséola."),
    act("estado-ex", "Estado general", "clave", "Activa, afebril.", "Sin gravedad."),
    act("paladar", "Paladar", "util", "Pápulas rojas en el paladar blando.", "Manchas de Nagayama."),
  ],
  studies: [
    study("Otros", "clinico", "Diagnóstico clínico", "clave", "Típico.", "No requiere estudios."),
    study("Laboratorio", "lab", "Hemograma y PCR", "innecesario", "No se realizó.", "No cambia la conducta."),
    study("Laboratorio", "orina", "Orina en próximos episodios de fiebre sin foco", "util", "No en este caso.", "Descartar ITU en lactantes con fiebre sin foco."),
    study("Laboratorio", "serologia", "Serología de herpes 6", "innecesario", "No se realizó.", "Clínica suficiente."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("roseola", "Exantema súbito (roséola) por herpesvirus 6", true, "Lactante con fiebre alta 3 días, buen estado y exantema al bajar la fiebre."),
      dx("sarampion", "Sarampión", false, "El exantema aparece con fiebre y hay catarro y Koplik."),
      dx("alergia", "Alergia a medicamentos", false, "No recibió fármacos."),
      dx("meningococcemia", "Meningococcemia", false, "Exantema que se blanquea y buen estado."),
      dx("escarlatina", "Escarlatina", false, "Edad y exantema distintos."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("tranquilizar", "Explicar que es benigno y se va solo", "clave", "Autolimitado."),
      mg("pautas", "Pautas de alarma: convulsión, decaimiento", "clave", "Complicaciones."),
      mg("guarderia", "Puede volver a la guardería cuando esté bien", "util", "Ya no contagia mucho."),
      mg("antitermicos", "Antitérmicos si reaparece la fiebre", "util", "Confort."),
      mg("atb", "Antibióticos", "riesgoso", "Viral."),
      mg("corticoides", "Corticoides para el exantema", "riesgoso", "Sin indicación."),
    ],
  },
  debrief: {
    diagnosis: "Exantema súbito (roséola) por herpesvirus 6, en lactante de 11 meses.",
    pathologies: [
      { name: "Exantema súbito", role: "principal", why: "Infección por HHV-6 o 7." },
      { name: "Riesgo de convulsión febril", role: "asociada", why: "Fiebre alta." },
      { name: "Sarampión, alergia", role: "diferencial", why: "Otros exantemas." },
    ],
    reasoning: [
      "Causa: herpesvirus humano 6, transmitido por saliva.",
      "Mecanismo: viremia con fiebre alta y exantema al resolverse.",
      "Consecuencia: cuadro benigno; puede causar convulsiones febriles.",
    ],
    epidemiology:
      "Casi todos los niños se infectan antes de los 2 años. Es causa frecuente de fiebre alta sin foco en lactantes. Si se dio antibiótico, el exantema se confunde con alergia.",
    management: [
      "Clínica.",
      "Tranquilizar.",
      "Pautas.",
      "Sin antibióticos.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Enfermedades exantemáticas.", "Red Book (AAP) — Human Herpesvirus 6 and 7."],
    pearls: ["Cae la fiebre, sale el exantema.", "Buen estado.", "No es alergia."],
    pitfalls: ["Antibióticos.", "Etiquetar alergia."],
    tribunal: [
      qa("¿Qué complicación es más frecuente?", "Convulsiones febriles."),
      qa("¿Por qué se confunde con alergia?", "Porque el exantema aparece cuando a menudo ya se indicó un antibiótico."),
      qa("¿Qué son las manchas de Nagayama?", "Pápulas rojas en paladar blando y úvula en la roséola."),
    ],
  },
};
