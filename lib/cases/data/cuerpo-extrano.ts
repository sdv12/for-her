import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const cuerpoExtrano: ClinicalCase = {
  id: "cuerpo-extrano-via-aerea",
  level: 2,
  area: "Pediatría",
  setting: "Guardia",
  patient: { age: 2, ageUnit: "años", sex: "M", context: "Sano. Estaba en un cumpleaños." },
  frequency: "poco-frecuente",
  intro: "“Estaba comiendo maní en la mesa, de repente se puso a toser muy fuerte, se puso morado unos segundos y después se le pasó. Ahora tose y le silba el pecho.” (relata el padre)",
  vitals: { FC: "128 lpm", FR: "34 rpm", "T°": "36,8 °C", "SatO₂": "94 %", Peso: "12 kg" },
  anamnesis: [
    act("episodio", "¿Lo vio atragantarse? ¿Qué pasó exactamente?", "clave", "“Estaba con maní en la boca, se rió y empezó a toser y ahogarse.”", "El episodio de sofocación presenciado es el dato con mayor valor diagnóstico."),
    act("ahora", "¿Ahora puede hablar, llorar y respirar?", "clave", "“Llora y habla, pero tose.”", "Obstrucción parcial: no se hacen maniobras de desobstrucción, se deriva para broncoscopía."),
    act("tiempo", "¿Hace cuánto fue?", "util", "“Una hora.”", "Más tiempo aumenta el riesgo de inflamación e infección."),
    act("previos", "¿Tuvo asma o bronquitis antes?", "clave", "“Nunca.”", "Sibilancias nuevas en un niño sin antecedentes tras atragantamiento orientan a cuerpo extraño."),
    act("fiebre", "¿Tuvo fiebre o mocos?", "util", "“No.”", "Descarta infección respiratoria."),
    act("cumple", "¿De quién era el cumpleaños?", "neutro", "“De la prima.”", "No orienta."),
  ],
  exam: [
    act("auscultacion", "Auscultación pulmonar comparando ambos lados", "clave", "Hipoventilación y sibilancias en el hemitórax derecho.", "Hallazgos asimétricos: típico de cuerpo extraño bronquial (más frecuente a la derecha)."),
    act("trabajo", "Trabajo respiratorio", "clave", "Tiraje subcostal leve, sin estridor.", "Dificultad moderada; vía aérea alta permeable."),
    act("boca", "Inspección de la boca (sin barrido a ciegas)", "util", "Sin restos visibles.", "El barrido con el dedo a ciegas puede empujar el objeto."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de tórax en inspiración y espiración", "clave", "Atrapamiento aéreo en el pulmón derecho en espiración, con desplazamiento del mediastino a la izquierda.", "Los frutos secos no son radiopacos: se ven signos indirectos; una radiografía normal no descarta."),
    study("Otros", "broncoscopia", "Broncoscopía rígida", "clave", "Fragmento de maní en el bronquio fuente derecho; se extrae.", "Diagnóstico y tratamiento ante la sospecha."),
    study("Laboratorio", "lab", "Hemograma y PCR", "innecesario", "No se realizó.", "No cambia la conducta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("ce", "Aspiración de cuerpo extraño (maní) en el bronquio fuente derecho", true, "Episodio de sofocación presenciado mientras comía maní, tos, sibilancias e hipoventilación unilaterales y atrapamiento aéreo derecho."),
      dx("asma", "Primera crisis de asma", false, "Las sibilancias del asma son bilaterales y no hay episodio de sofocación."),
      dx("bronquiolitis", "Bronquiolitis", false, "Sin pródromo viral y con hallazgos unilaterales."),
      dx("nac", "Neumonía", false, "Sin fiebre ni pródromo; el cuadro comenzó con el atragantamiento."),
      dx("crup", "Laringitis", false, "Habría estridor, tos perruna y disfonía."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("broncoscopia", "Broncoscopía rígida urgente en un centro con experiencia", "clave", "Ante la sospecha clínica se hace aunque la radiografía sea normal."),
      mg("posicion", "Dejarlo en la posición que elija, con oxígeno y sin estimularlo", "clave", "Evita que el cuerpo extraño se movilice y obstruya por completo."),
      mg("prevencion", "Consejería: no dar frutos secos enteros, uvas o caramelos duros a menores de 4–5 años", "clave", "La prevención es la medida más eficaz."),
      mg("heimlich", "Maniobra de Heimlich ahora", "riesgoso", "Con obstrucción parcial y tos efectiva no se hace: puede transformarla en completa."),
      mg("broncodilatador-alta", "Salbutamol y alta si mejoran las sibilancias", "riesgoso", "Retrasa el diagnóstico y lleva a neumonías y bronquiectasias."),
      mg("barrido", "Barrido digital a ciegas", "riesgoso", "Puede empujar el objeto más adentro."),
    ],
  },
  debrief: {
    diagnosis: "Aspiración de cuerpo extraño orgánico (maní) en el bronquio fuente derecho, con obstrucción parcial y atrapamiento aéreo, en niño de 2 años.",
    pathologies: [
      { name: "Cuerpo extraño bronquial", role: "principal", why: "Fragmento de maní en el bronquio fuente derecho." },
      { name: "Atrapamiento aéreo", role: "asociada", why: "Efecto valvular del cuerpo extraño." },
      { name: "Asma, bronquiolitis, neumonía, crup", role: "diferencial", why: "Otras causas de tos y sibilancias." },
    ],
    reasoning: [
      "Causa: los niños pequeños exploran con la boca, no tienen molares para triturar y comen mientras corren o se ríen.",
      "Mecanismo: el objeto pasa la glotis durante una inspiración brusca y se aloja en el bronquio derecho, más vertical y ancho; actúa como válvula que deja entrar pero no salir el aire.",
      "Consecuencia: sofocación, tos, sibilancias unilaterales, atrapamiento aéreo; si no se extrae, neumonías recurrentes y bronquiectasias. Los frutos secos además inflaman la mucosa.",
    ],
    epidemiology:
      "La aspiración de cuerpo extraño es una causa importante de muerte accidental en menores de 3 años. Los frutos secos (maní) y otros alimentos son los más aspirados; en niños más grandes, objetos pequeños. Es más frecuente en varones.",
    management: [
      "Sospecharlo ante todo episodio de sofocación, aunque los síntomas se hayan calmado.",
      "Obstrucción completa: maniobras de desobstrucción (golpes en la espalda y compresiones torácicas en lactantes, Heimlich en mayores).",
      "Obstrucción parcial: no intervenir, oxígeno y broncoscopía rígida.",
      "Prevención en el hogar y en jardines.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Consenso de prevención de lesiones no intencionales; Recomendaciones sobre cuerpo extraño en vía aérea.", "Consenso de reanimación cardiopulmonar pediátrica."],
    pearls: ["Episodio de sofocación = broncoscopía.", "Radiografía normal no descarta.", "Tose bien: no tocar."],
    pitfalls: ["Tratarlo como asma.", "Hacer maniobras en una obstrucción parcial."],
    tribunal: [
      qa("¿Cómo se desobstruye la vía aérea en un lactante?", "Si está consciente y no puede toser ni llorar: 5 golpes en la espalda boca abajo sobre el antebrazo con la cabeza más baja, y 5 compresiones torácicas boca arriba, alternando hasta que expulse el objeto o pierda la conciencia; en ese caso, RCP."),
      qa("¿Por qué el cuerpo extraño suele ir al bronquio derecho?", "Porque el bronquio fuente derecho es más corto, ancho y vertical que el izquierdo; en menores de 1 año la diferencia es menor."),
      qa("¿Qué alimentos no se deben dar a los menores de 4–5 años?", "Frutos secos enteros (maní, almendras), pochoclo, caramelos duros, uvas y salchichas enteras sin cortar en tiras, y comer siempre sentados y supervisados."),
    ],
  },
};
