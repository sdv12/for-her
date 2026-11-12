import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const otitisExterna: ClinicalCase = {
  id: "otitis-externa-difusa",
  level: 1,
  area: "Infectología",
  setting: "Guardia",
  patient: { age: 19, ageUnit: "años", sex: "M", context: "Nadador. Enero, entrena en pileta todos los días. Usa hisopos." },
  frequency: "muy-frecuente",
  intro: "“Me duele mucho el oído derecho, más si me tocan la oreja, y me supura un poco.”",
  vitals: { TA: "118/72 mmHg", FC: "78 lpm", "T°": "36,9 °C" },
  anamnesis: [
    act("agua", "¿Natación o hisopos?", "clave", "“Las dos cosas.”", "Factores."),
    act("dolor", "¿Duele al tocar la oreja?", "clave", "“Muchísimo.”", "Externa."),
    act("diabetes", "¿Diabetes o inmunosupresión?", "clave", "“No.”", "Otitis maligna."),
    act("previa", "¿Infecciones de garganta o resfrío?", "util", "“No.”", "Otitis media."),
    act("audicion", "¿Oís menos?", "util", "“Algo tapado.”", "Edema."),
    act("estilo", "¿Qué estilo nadás?", "neutro", "“Crol.”", "No orienta."),
  ],
  exam: [
    act("trago", "Presión del trago y tracción del pabellón", "clave", "Muy dolorosos.", "Externa."),
    act("otoscopia", "Otoscopía", "clave", "Conducto edematoso y eritematoso, secreción; tímpano íntegro.", "Confirma."),
    act("ganglios", "Ganglios y piel", "util", "Adenopatía preauricular; sin celulitis.", "Extensión."),
  ],
  studies: [
    study("Otros", "clinico", "Diagnóstico clínico", "clave", "Compatible.", "No requiere estudios."),
    study("Microbiología", "cultivo", "Cultivo si es recurrente o no responde", "util", "No corresponde ahora.", "Pseudomonas, hongos."),
    study("Imágenes", "tc", "TC de hueso temporal", "innecesario", "No se realizó.", "Solo en otitis maligna."),
    study("Otros", "lavado", "Lavado con agua a presión", "riesgoso", "No se realizó.", "Empeora y puede dañar el tímpano."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("externa", "Otitis externa aguda difusa (oído de nadador)", true, "Dolor a la tracción del pabellón, conducto inflamado y tímpano íntegro."),
      dx("media", "Otitis media aguda", false, "Tímpano íntegro sin abombamiento."),
      dx("maligna", "Otitis externa maligna", false, "Joven sano."),
      dx("forunculo", "Forúnculo del conducto", false, "Es difusa."),
      dx("tapon", "Tapón de cerumen", false, "Hay inflamación."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("gotas", "Gotas con antibiótico (quinolona) y corticoide", "clave", "Tratamiento de elección."),
      mg("seco", "Mantener el oído seco y no usar hisopos", "clave", "Previene."),
      mg("analgesia", "Analgesia", "clave", "Dolor."),
      mg("mecha", "Mecha si el edema impide que entren las gotas", "util", "Facilita."),
      mg("oral", "Antibiótico oral de rutina", "riesgoso", "No hace falta y genera resistencia."),
      mg("aminoglucosidos", "Gotas con aminoglucósido sin ver el tímpano", "riesgoso", "Ototóxicas si está perforado."),
    ],
  },
  debrief: {
    diagnosis: "Otitis externa aguda difusa derecha (oído de nadador), en varón de 19 años.",
    pathologies: [
      { name: "Otitis externa", role: "principal", why: "Inflamación del conducto." },
      { name: "Humedad y hisopos", role: "asociada", why: "Factores." },
      { name: "Otitis media, maligna", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: Pseudomonas y estafilococo.",
      "Mecanismo: la humedad y el trauma dañan la barrera de cerumen.",
      "Consecuencia: dolor, edema y secreción.",
    ],
    epidemiology:
      "Es muy frecuente en verano y en nadadores. Las gotas son superiores a los antibióticos orales. En diabéticos mayores, una otitis externa persistente puede ser maligna y comprometer el hueso.",
    management: [
      "Clínica.",
      "Gotas.",
      "Seco.",
      "Analgesia.",
    ],
    sources: ["Sociedad Argentina de Otorrinolaringología — Otitis externa.", "American Academy of Otolaryngology — Acute Otitis Externa Guideline."],
    pearls: ["Duele al tirar la oreja.", "Gotas, no pastillas.", "Sin hisopos."],
    pitfalls: ["Antibiótico oral.", "Lavar a presión."],
    tribunal: [
      qa("¿Qué es la otitis externa maligna?", "Osteomielitis de la base del cráneo por Pseudomonas en diabéticos o inmunosuprimidos."),
      qa("¿Cómo diferenciás otitis externa y media?", "Externa: dolor al mover la oreja y conducto inflamado. Media: tímpano abombado y fiebre."),
      qa("¿Qué hongos causan otomicosis?", "Aspergillus y Candida."),
    ],
  },
};
