import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const nacDerrameNino: ClinicalCase = {
  id: "neumonia-con-derrame-nino",
  level: 3,
  area: "Pediatría",
  setting: "Guardia",
  patient: { age: 3, ageUnit: "años", sex: "F", context: "Julio. Recibe amoxicilina hace 4 días por neumonía y sigue con fiebre. Vacunas incompletas: le falta el refuerzo de neumococo." },
  frequency: "frecuente",
  intro: "“Sigue con fiebre alta aunque toma el antibiótico. Ahora respira más rápido, se queja y dice que le duele la panza del lado derecho.” (relata el padre)",
  vitals: { FC: "148 lpm", FR: "44 rpm", "T°": "39,3 °C", "SatO₂": "91 %", Peso: "14 kg" },
  anamnesis: [
    act("adherencia", "¿Cómo le dan el antibiótico? ¿Qué dosis?", "clave", "“Tres veces por día, la dosis que nos dijeron, no vomita.”", "Buena adherencia y dosis: la falta de respuesta orienta a complicación (derrame, empiema)."),
    act("fiebre", "¿Cuántos días de fiebre lleva?", "clave", "“Seis en total, cuatro con antibiótico.”", "Fiebre de más de 48–72 h con tratamiento adecuado: buscar complicaciones."),
    act("vacunas", "¿Tiene las vacunas al día?", "util", "“Le falta el refuerzo del neumococo.”", "Esquema incompleto de neumococo conjugada."),
    act("dolor", "¿Dónde le duele?", "util", "“La panza a la derecha y el costado.”", "Las neumonías basales pueden dar dolor abdominal por irritación pleural."),
    act("alimentacion", "¿Come y toma líquidos?", "util", "“Muy poco.”", "Criterio de internación."),
    act("hermano", "¿Tiene hermanos?", "neutro", "“Uno más grande.”", "No orienta."),
  ],
  exam: [
    act("pulmon", "Percusión y auscultación", "clave", "Matidez y murmullo abolido en la base derecha, con soplo pleurítico.", "Síndrome de derrame pleural."),
    act("trabajo", "Trabajo respiratorio", "clave", "Tiraje subcostal, aleteo, quejido.", "Dificultad respiratoria moderada a grave."),
    act("abdomen", "Abdomen", "util", "Blando, sin defensa.", "Descarta abdomen agudo."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de tórax", "clave", "Condensación en la base derecha con derrame que borra el seno costofrénico.", "Confirma el derrame."),
    study("Imágenes", "eco", "Ecografía pleural", "clave", "Derrame moderado con tabiques.", "Define si está tabicado (complicado) y guía el drenaje."),
    study("Otros", "toracocentesis", "Toracocentesis diagnóstica", "util", "Líquido turbio, pH 7,0, glucosa baja; neumococo en el cultivo.", "Derrame paraneumónico complicado (empiema)."),
    study("Microbiología", "hemocultivo", "Hemocultivo", "util", "Neumococo sensible a penicilina.", "Confirma el germen."),
    study("Imágenes", "tc", "Tomografía de tórax de rutina", "innecesario", "No se realizó.", "La ecografía es suficiente."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("empiema", "Neumonía neumocócica con derrame pleural complicado (empiema)", true, "Fiebre persistente pese a amoxicilina adecuada, matidez con murmullo abolido, derrame tabicado y líquido con pH bajo y neumococo."),
      dx("resistencia", "Fracaso por resistencia del neumococo a la amoxicilina", false, "El neumococo es sensible; la falta de respuesta es por la colección."),
      dx("viral", "Neumonía viral", false, "Hay derrame purulento con neumococo."),
      dx("apendicitis", "Apendicitis", false, "El dolor es referido por la neumonía basal; abdomen blando."),
      dx("tbc", "Tuberculosis pleural", false, "Cuadro agudo con neumococo."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("internacion", "Internación con oxígeno y antibiótico endovenoso (ampicilina o penicilina en dosis altas)", "clave", "Complicación con hipoxemia."),
      mg("drenaje", "Drenaje pleural (tubo, con fibrinolíticos si está tabicado) o videotoracoscopía según el centro", "clave", "El empiema no se resuelve solo con antibióticos."),
      mg("vacuna", "Completar la vacuna antineumocócica al alta", "util", "Prevención."),
      mg("analgesia", "Analgesia e hidratación", "util", "Confort."),
      mg("cambiar-atb-casa", "Cambiar a otro antibiótico oral y seguir en casa", "riesgoso", "La complicación requiere internación y drenaje."),
      mg("antitusivos", "Antitusivos", "innecesario", "Sin beneficio."),
    ],
  },
  debrief: {
    diagnosis: "Neumonía neumocócica de la base derecha complicada con derrame pleural tabicado (empiema) e hipoxemia, en niña de 3 años con vacunación antineumocócica incompleta.",
    pathologies: [
      { name: "Empiema pleural", role: "principal", why: "Derrame paraneumónico infectado." },
      { name: "Neumonía neumocócica", role: "asociada", why: "Origen." },
      { name: "Resistencia antibiótica, neumonía viral, TBC", role: "diferencial", why: "Otras causas de mala evolución." },
    ],
    reasoning: [
      "Causa: neumococo en una niña sin el esquema completo.",
      "Mecanismo: la inflamación pulmonar se extiende a la pleura; el líquido se infecta, se llena de fibrina y se tabica.",
      "Consecuencia: fiebre persistente pese al antibiótico, dificultad respiratoria y necesidad de drenaje.",
    ],
    epidemiology:
      "La neumonía es una de las principales causas de internación en menores de 5 años en Argentina, con pico en invierno. Los derrames paraneumónicos complican una proporción de las internadas, sobre todo entre los 2 y 5 años. La vacuna antineumocócica conjugada (en el Calendario desde 2012) redujo mucho las neumonías graves.",
    management: [
      "Reevaluar a las 48–72 h toda neumonía que no mejora.",
      "Buscar derrame con radiografía y ecografía.",
      "Antibiótico endovenoso y drenaje del derrame complicado.",
      "Completar vacunas.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Recomendaciones para el manejo de las infecciones respiratorias agudas bajas en menores de 2 años y consenso de neumonía y derrame paraneumónico.", "Calendario Nacional de Vacunación."],
    pearls: ["Fiebre a las 72 h con antibiótico = buscar complicación.", "Matidez + murmullo abolido = derrame.", "Empiema = drenaje."],
    pitfalls: ["Cambiar de antibiótico sin buscar el derrame.", "Atribuirlo a resistencia."],
    tribunal: [
      qa("¿Qué características tiene un derrame paraneumónico complicado?", "Líquido turbio o pus, pH menor de 7,2, glucosa menor de 40 mg/dl, LDH alta, gérmenes en el Gram o cultivo, o tabiques en la ecografía; requiere drenaje."),
      qa("¿Qué es el neumococo y qué vacunas hay en el Calendario?", "Streptococcus pneumoniae, principal causa de neumonía, otitis y meningitis bacteriana; el Calendario incluye la vacuna conjugada 13 valente (o 20 valente) a los 2 y 4 meses y refuerzo a los 12 meses, y vacunas para adultos de riesgo y mayores de 65."),
      qa("¿Qué es el criterio de Light?", "Un derrame es exudado si cumple al menos uno: proteínas pleura/suero mayor de 0,5, LDH pleura/suero mayor de 0,6, o LDH pleural mayor a dos tercios del límite superior normal sérico."),
    ],
  },
};
