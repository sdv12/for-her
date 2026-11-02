import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const otitisLactante: ClinicalCase = {
  id: "otitis-media-bilateral-lactante",
  level: 1,
  area: "Pediatría",
  setting: "Guardia",
  patient: { age: 8, ageUnit: "meses", sex: "M", context: "Va a la guardería. Toma mamadera acostado." },
  frequency: "muy-frecuente",
  intro: "“Hace tres días tiene mocos, y desde anoche fiebre de 39, llora mucho, no quiere comer y se toca las orejas.” (relata la madre)",
  vitals: { FC: "148 lpm", FR: "34 rpm", "T°": "39,1 °C", "SatO₂": "98 %", Peso: "8,5 kg" },
  anamnesis: [
    act("inicio", "¿Cómo empezó?", "clave", "“Primero mocos, después la fiebre y el llanto.”", "La otitis suele seguir a una infección respiratoria viral."),
    act("atb", "¿Tomó antibióticos en el último mes?", "clave", "“No.”", "Sin antibióticos recientes, la amoxicilina en dosis altas es la primera elección."),
    act("signos-alarma", "¿Está decaído, vomita, tiene el cuello duro o convulsionó?", "clave", "“No, entre fiebres juega.”", "Descarta meningitis y otras infecciones graves."),
    act("vacunas", "¿Tiene las vacunas al día?", "util", "“Sí.”", "La vacuna neumocócica conjugada disminuye las otitis graves."),
    act("factores", "¿Toma la mamadera acostado? ¿Alguien fuma en la casa?", "util", "“Sí, acostado; el papá fuma afuera.”", "Factores de riesgo de otitis."),
    act("dientes", "¿Le están saliendo dientes?", "neutro", "“Sí, los de abajo.”", "La dentición no causa fiebre alta: no explica el cuadro."),
  ],
  exam: [
    act("otoscopia", "Otoscopía bilateral", "clave", "Ambas membranas timpánicas abombadas, eritematosas, opacas, sin movilidad.", "Abombamiento: el signo más específico de otitis media aguda."),
    act("mastoides", "Región mastoidea", "util", "Sin dolor ni eritema retroauricular.", "Descarta mastoiditis."),
    act("meningeo", "Fontanela y signos meníngeos", "clave", "Fontanela normotensa, sin rigidez.", "Descarta meningitis."),
  ],
  studies: [
    study("Laboratorio", "hemograma", "Hemograma y PCR", "innecesario", "No se realizó.", "El diagnóstico es clínico."),
    study("Imágenes", "rx", "Radiografía de senos o mastoides", "innecesario", "No se realizó.", "No aporta."),
    study("Microbiología", "timpanocentesis", "Timpanocentesis", "innecesario", "No se realizó.", "Se reserva para fracasos terapéuticos o inmunodeprimidos."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("oma", "Otitis media aguda bilateral en lactante de 8 meses", true, "Fiebre, irritabilidad y otalgia con ambas membranas abombadas y opacas tras un resfrío."),
      dx("efusion", "Otitis media con efusión", false, "En la otitis con efusión no hay signos agudos ni abombamiento inflamatorio."),
      dx("externa", "Otitis externa", false, "Afecta el conducto, no la membrana; es rara en lactantes."),
      dx("denticion", "Fiebre por dentición", false, "La dentición no produce fiebre alta."),
      dx("meningitis", "Meningitis", false, "Fontanela normal, juega entre fiebres."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("amoxicilina", "Amoxicilina en dosis altas (80–90 mg/kg/día) por 10 días", "clave", "Menores de 2 años con otitis bilateral: antibiótico inmediato; dosis altas por neumococo de sensibilidad disminuida."),
      mg("analgesia", "Analgesia con paracetamol o ibuprofeno", "clave", "El dolor es el síntoma principal."),
      mg("control", "Control a las 48–72 h si no mejora", "clave", "Si no mejora, cambiar a amoxicilina-clavulánico."),
      mg("prevencion", "No dar la mamadera acostado y evitar el humo de tabaco", "util", "Disminuye las recurrencias."),
      mg("observar", "Observación sin antibiótico", "innecesario", "Es una opción en mayores de 2 años con cuadro leve unilateral; no en este caso."),
      mg("gotas", "Gotas óticas con antibiótico", "innecesario", "No tratan la otitis media con tímpano íntegro."),
    ],
  },
  debrief: {
    diagnosis: "Otitis media aguda bilateral en lactante de 8 meses que asiste a guardería, tras infección respiratoria viral.",
    pathologies: [
      { name: "Otitis media aguda bilateral", role: "principal", why: "Membranas abombadas con signos agudos." },
      { name: "Infección respiratoria alta viral", role: "asociada", why: "Desencadenante." },
      { name: "Otitis con efusión, meningitis", role: "diferencial", why: "Se descartan con la otoscopía y el examen." },
    ],
    reasoning: [
      "Causa: neumococo, Haemophilus influenzae no tipificable y Moraxella, tras una infección viral.",
      "Mecanismo: la trompa de Eustaquio del lactante es corta y horizontal; la congestión viral la obstruye y las bacterias del rinofaringe ascienden al oído medio.",
      "Consecuencia: exudado purulento a presión en el oído medio, con dolor, fiebre y riesgo de perforación o mastoiditis.",
    ],
    epidemiology:
      "La otitis media aguda es una de las infecciones más frecuentes en la infancia y una de las principales causas de indicación de antibióticos en niños, con pico entre los 6 y 24 meses. La guardería, el humo de tabaco, la mamadera acostado y la falta de lactancia materna aumentan el riesgo.",
    management: [
      "Diagnóstico con otoscopía (abombamiento).",
      "Antibiótico inmediato en menores de 6 meses, en menores de 2 años con otitis bilateral y en cuadros graves.",
      "Observación posible en mayores de 2 años con cuadro leve.",
      "Analgesia siempre; prevención de factores de riesgo.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Consenso de otitis media aguda.", "Calendario Nacional de Vacunación (neumococo conjugada)."],
    pearls: ["Abombamiento = OMA.", "Menor de 2 años bilateral = antibiótico.", "Amoxicilina en dosis altas."],
    pitfalls: ["Atribuir la fiebre a los dientes.", "No dar analgesia."],
    tribunal: [
      qa("¿Por qué los lactantes tienen más otitis?", "Por la trompa de Eustaquio más corta, ancha y horizontal, la inmadurez inmune, las infecciones respiratorias frecuentes, la hipertrofia adenoidea y factores como guardería, humo de tabaco y mamadera acostado."),
      qa("¿Qué complicaciones tiene la otitis media aguda?", "Perforación timpánica, otitis media crónica, mastoiditis, parálisis facial, laberintitis, meningitis, absceso cerebral, trombosis de senos venosos e hipoacusia con alteraciones del lenguaje en las recurrentes."),
      qa("¿Cuándo se cambia a amoxicilina-clavulánico?", "Si no mejora en 48–72 h, si recibió amoxicilina en los últimos 30 días, si tiene conjuntivitis purulenta asociada (sugiere Haemophilus) o en otitis recurrente."),
    ],
  },
};
