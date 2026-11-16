import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const epistaxisPosterior: ClinicalCase = {
  id: "epistaxis-posterior",
  level: 3,
  area: "Cardiovascular",
  setting: "Guardia",
  patient: { age: 71, ageUnit: "años", sex: "M", context: "Hipertenso mal controlado, toma apixabán por fibrilación auricular." },
  frequency: "frecuente",
  intro: "“Me sangra la nariz hace dos horas. Aprieto y no para, y me baja sangre por la garganta.”",
  vitals: { TA: "186/100 mmHg", FC: "104 lpm irregular", FR: "20 rpm", "SatO₂": "96 %" },
  anamnesis: [
    act("garganta", "¿Le baja sangre por la garganta aunque apriete la nariz?", "clave", "“Sí, mucha, la trago y la escupo.”", "Sangrado posterior."),
    act("anticoag", "¿Qué anticoagulante toma y cuándo fue la última dosis?", "clave", "“Apixabán, esta mañana.”", "Favorece el sangrado."),
    act("lado", "¿De qué lado?", "util", "“De los dos, más del derecho.”", "Típico de posterior que pasa al otro lado."),
    act("mareo", "¿Se marea?", "util", "“Un poco al pararme.”", "Pérdida significativa."),
    act("trauma", "¿Se golpeó o se rascó?", "util", "“No.”", "Espontánea."),
    act("radio", "¿Escucha radio?", "neutro", "“Folclore.”", "No orienta."),
  ],
  exam: [
    act("rinoscopia", "Rinoscopía anterior tras aspirar", "clave", "Sin punto sangrante en el área de Kiesselbach; sangre que viene de atrás.", "Epistaxis posterior."),
    act("orofaringe", "Orofaringe", "clave", "Sangre que cae por la pared posterior.", "Confirma."),
    act("perfusion", "Perfusión", "util", "Palidez leve.", "Volemia."),
  ],
  studies: [
    study("Laboratorio", "hemograma", "Hemograma y coagulación", "clave", "Hb 11,2 g/dl.", "Pérdida."),
    study("Laboratorio", "grupo", "Grupo y factor", "util", "A+.", "Por si hay que transfundir."),
    study("Imágenes", "tac", "TC de senos de rutina", "innecesario", "No se pidió.", "Sin sospecha de tumor."),
    study("Otros", "cauterizar-ciego", "Cauterizar a ciegas en la parte posterior", "riesgoso", "No se hizo.", "Sin visión es ineficaz y daña."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("epistaxis-posterior", "Epistaxis posterior en adulto mayor hipertenso y anticoagulado", true, "Sangrado que no cede con compresión, cae por la faringe, sin punto anterior, con HTA y apixabán."),
      dx("epistaxis-anterior", "Epistaxis anterior", false, "No hay punto en Kiesselbach y el sangrado es posterior."),
      dx("hemoptisis", "Hemoptisis", false, "Se ve sangre que baja de la rinofaringe."),
      dx("hda", "Hematemesis", false, "El origen es nasal."),
      dx("tumor", "Angiofibroma", false, "Es típico de varones adolescentes."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("taponaje-posterior", "Taponaje posterior (balón o sonda Foley) más anterior", "clave", "Controla el sangrado posterior."),
      mg("internar", "Internar con monitoreo y oxígeno", "clave", "Riesgo de hipoxemia y aspiración con taponaje posterior."),
      mg("orl", "Interconsulta con ORL: endoscopía y ligadura de la esfenopalatina si persiste", "clave", "Tratamiento definitivo."),
      mg("presion", "Analgesia y control de la presión sin descensos bruscos", "util", "El dolor y la ansiedad la elevan."),
      mg("anticoag", "Suspender transitoriamente el apixabán y reevaluar", "util", "Equilibrio con el riesgo embólico."),
      mg("nifedipina-sl", "Nifedipina sublingual para bajar rápido la presión", "riesgoso", "Descensos bruscos e isquemia."),
      mg("alta-taponaje", "Alta con taponaje posterior", "riesgoso", "Debe quedar internado."),
    ],
  },
  debrief: {
    diagnosis: "Epistaxis posterior en un hombre de 71 años hipertenso y anticoagulado con apixabán.",
    pathologies: [
      { name: "Epistaxis posterior", role: "principal", why: "Sangrado de ramas de la esfenopalatina." },
      { name: "HTA y anticoagulación", role: "asociada", why: "Factores agravantes." },
      { name: "Epistaxis anterior", role: "diferencial", why: "La más frecuente." },
    ],
    reasoning: [
      "Causa: arteria esfenopalatina en un paciente con arterias frágiles.",
      "Mecanismo: la anticoagulación impide la hemostasia y la HTA la mantiene.",
      "Consecuencia: sangrado abundante con riesgo de anemia y aspiración.",
    ],
    epidemiology:
      "El 90 % de las epistaxis son anteriores y frecuentes en niños. Las posteriores son el 10 % y predominan en mayores hipertensos, anticoagulados o con arterioesclerosis; suelen requerir internación.",
    management: [
      "Compresión y aspiración.",
      "Identificar si es anterior o posterior.",
      "Taponaje posterior e internación.",
      "ORL y ligadura si persiste.",
    ],
    sources: ["Federación Argentina de Sociedades de Otorrinolaringología — Epistaxis.", "AAO-HNS — Clinical Practice Guideline: Nosebleed (Epistaxis)."],
    pearls: ["Sangre por la garganta = posterior.", "Taponaje posterior: internar.", "No bajar la presión de golpe."],
    pitfalls: ["Nifedipina sublingual.", "Alta con taponaje posterior."],
    tribunal: [
      qa("¿Qué es el área de Kiesselbach?", "La zona anterior del tabique donde confluyen ramas de las arterias etmoidales, esfenopalatina, palatina mayor y labial superior; origen del 90 % de las epistaxis."),
      qa("¿Por qué se interna al paciente con taponaje posterior?", "Por riesgo de hipoxemia, aspiración, bradicardia por reflejo nasovagal y necrosis."),
      qa("¿Qué arteria se liga en la epistaxis posterior refractaria?", "La arteria esfenopalatina por vía endoscópica."),
    ],
  },
};
