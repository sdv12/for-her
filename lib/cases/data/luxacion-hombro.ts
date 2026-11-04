import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const luxacionHombro: ClinicalCase = {
  id: "luxacion-anterior-hombro",
  level: 2,
  area: "Traumatología",
  setting: "Guardia",
  patient: { age: 22, ageUnit: "años", sex: "M", context: "Juega al rugby. Cayó con el brazo abierto y hacia atrás en un tackle." },
  frequency: "frecuente",
  intro: "“Me tacklearon con el brazo hacia afuera y sentí que se me salió el hombro. No lo puedo mover y me duele muchísimo.”",
  vitals: { TA: "134/82 mmHg", FC: "104 lpm", "T°": "36,5 °C" },
  anamnesis: [
    act("mecanismo", "¿En qué posición estaba el brazo?", "clave", "“Abierto y hacia atrás.”", "Abducción y rotación externa: mecanismo de luxación anterior."),
    act("previos", "¿Se te salió antes?", "clave", "“Es la primera vez.”", "Primer episodio en joven: alto riesgo de recurrencia."),
    act("sensibilidad", "¿Sentís hormigueo o el costado del hombro dormido?", "clave", "“Un poco dormido el costado del hombro.”", "Posible lesión del nervio axilar."),
    act("tiempo", "¿Hace cuánto fue?", "util", "“Una hora.”", "Reducir temprano facilita la maniobra."),
    act("otras", "¿Otro golpe en la cabeza o el cuello?", "util", "“No.”", "Descarta lesiones asociadas."),
    act("posicion", "¿En qué posición jugás?", "neutro", "“Ala.”", "No orienta."),
  ],
  exam: [
    act("inspeccion", "Inspección del hombro", "clave", "Pérdida del contorno redondeado (signo de la charretera), acromion prominente, brazo en abducción y rotación externa leve.", "Luxación anterior."),
    act("axilar", "Sensibilidad en la cara lateral del hombro (nervio axilar) y pulsos", "clave", "Hipoestesia leve en la región deltoidea, pulso radial presente.", "Documentar antes y después de reducir."),
    act("palpacion", "Palpación", "util", "Cabeza humeral palpable por delante.", "Confirma."),
  ],
  studies: [
    study("Imágenes", "rx-pre", "Radiografía de hombro (frente y perfil escapular o axilar) antes de reducir", "clave", "Luxación anterior glenohumeral sin fractura.", "Confirma la dirección y descarta fracturas que cambian la maniobra."),
    study("Imágenes", "rx-post", "Radiografía después de la reducción", "clave", "Reducida; lesión de Hill-Sachs pequeña.", "Confirma la reducción."),
    study("Imágenes", "rmn-urgencia", "Resonancia de urgencia", "innecesario", "No se realizó.", "Se considera después, por la recurrencia."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("anterior", "Luxación anterior glenohumeral traumática, primer episodio, con neuropraxia del nervio axilar", true, "Mecanismo de abducción y rotación externa, signo de la charretera, cabeza humeral anterior e hipoestesia deltoidea."),
      dx("posterior", "Luxación posterior", false, "La posterior ocurre en convulsiones o electrocución, con el brazo en rotación interna."),
      dx("acromioclavicular", "Luxación acromioclavicular", false, "Daría el signo de la tecla en la clavícula."),
      dx("fractura-humero", "Fractura de cuello de húmero", false, "La radiografía no muestra fractura."),
      dx("manguito", "Rotura del manguito rotador aislada", false, "Hay luxación."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("reduccion", "Reducción cerrada con analgesia y sedación (maniobras de rotación externa, Milch o FARES)", "clave", "Reduce el dolor y el riesgo de lesiones."),
      mg("control-neuro", "Control neurovascular antes y después", "clave", "Detecta lesiones nerviosas o vasculares."),
      mg("inmovilizar", "Cabestrillo por poco tiempo y rehabilitación", "clave", "Alivio y fortalecimiento."),
      mg("seguimiento", "Seguimiento con traumatología por el alto riesgo de recurrencia en jóvenes", "util", "Puede requerir estabilización quirúrgica."),
      mg("hipocratica-fuerza", "Tracción con fuerza sin analgesia ni radiografía previa", "riesgoso", "Riesgo de fractura y lesión nerviosa."),
      mg("inmovilizar-largo", "Inmovilización estricta por 3 meses", "innecesario", "No reduce la recurrencia y genera rigidez."),
    ],
  },
  debrief: {
    diagnosis: "Luxación anterior glenohumeral traumática derecha, primer episodio, con neuropraxia del nervio axilar y lesión de Hill-Sachs pequeña, en jugador de rugby de 22 años.",
    pathologies: [
      { name: "Luxación anterior de hombro", role: "principal", why: "La cabeza humeral sale por delante de la glena." },
      { name: "Neuropraxia axilar y Hill-Sachs", role: "asociada", why: "Lesiones asociadas." },
      { name: "Luxación posterior, acromioclavicular, fractura", role: "diferencial", why: "Otras lesiones de hombro." },
    ],
    reasoning: [
      "Causa: fuerza en abducción y rotación externa.",
      "Mecanismo: la cabeza humeral se desplaza hacia adelante y lesiona el labrum (Bankart) y la cabeza (Hill-Sachs).",
      "Consecuencia: dolor, deformidad, lesión del nervio axilar y alta recurrencia en jóvenes.",
    ],
    epidemiology:
      "El hombro es la articulación que más se luxa, y el 95 % de las luxaciones son anteriores. Afecta sobre todo a varones jóvenes deportistas (rugby, fútbol, esquí) y a mujeres mayores por caídas. La recurrencia en menores de 25 años es muy alta.",
    management: [
      "Radiografía antes y después.",
      "Reducción con analgesia.",
      "Control neurovascular.",
      "Rehabilitación y evaluación de la estabilización en jóvenes.",
    ],
    sources: ["Asociación Argentina de Ortopedia y Traumatología — Recomendaciones sobre luxación de hombro.", "Asociación Argentina de Traumatología del Deporte."],
    pearls: ["Signo de la charretera.", "Evaluar el nervio axilar.", "Radiografía antes de reducir."],
    pitfalls: ["Reducir con fuerza sin analgesia.", "No documentar el examen neurológico."],
    tribunal: [
      qa("¿Qué es la lesión de Bankart y la de Hill-Sachs?", "Bankart: desinserción del labrum anteroinferior de la glena. Hill-Sachs: impactación en la cara posterolateral de la cabeza humeral. Ambas se producen en la luxación anterior y favorecen la recurrencia."),
      qa("¿Qué nervio se lesiona en la luxación anterior de hombro?", "El nervio axilar: hipoestesia en la cara lateral del hombro (zona del parche militar) y debilidad del deltoides."),
      qa("¿Cuándo se sospecha una luxación posterior?", "Tras convulsiones, electrocución o caídas sobre el brazo en aducción; el brazo queda en rotación interna, con imposibilidad de rotación externa, y puede pasar desapercibida en la radiografía de frente."),
    ],
  },
};
