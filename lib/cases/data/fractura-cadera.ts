import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const fracturaCadera: ClinicalCase = {
  id: "fractura-de-cadera",
  level: 2,
  area: "Traumatología",
  setting: "Guardia",
  patient: { age: 84, ageUnit: "años", sex: "F", context: "Vive sola. Usa bastón. Toma lorazepam para dormir." },
  frequency: "frecuente",
  intro: "“Me levanté a la noche para ir al baño, me tropecé con la alfombra y me caí de costado. No me puedo parar, me duele mucho la cadera derecha.”",
  vitals: { TA: "142/84 mmHg", FC: "94 lpm", FR: "18 rpm", "T°": "36,4 °C", "SatO₂": "95 %" },
  anamnesis: [
    act("mecanismo", "¿Cómo se cayó? ¿Se mareó o perdió el conocimiento antes?", "clave", "“Me tropecé. No me mareé.”", "Diferenciar una caída mecánica de un síncope: un síncope requiere su propio estudio."),
    act("suelo", "¿Cuánto tiempo estuvo en el piso?", "util", "“Unas tres horas hasta que vino la vecina.”", "Una estadía prolongada en el piso puede causar rabdomiólisis, hipotermia y deshidratación."),
    act("medicacion", "¿Qué medicación toma?", "clave", "“Lorazepam a la noche, enalapril y, a veces, algo para orinar menos.”", "Benzodiacepinas, antihipertensivos y diuréticos aumentan el riesgo de caídas."),
    act("anticoag", "¿Toma anticoagulantes o antiagregantes?", "clave", "“Aspirina.”", "Condiciona la anestesia y la cirugía."),
    act("funcion", "¿Cómo se manejaba antes? ¿Tiene problemas de memoria?", "util", "“Caminaba con bastón, me arreglaba sola. La memoria bien.”", "El estado funcional y cognitivo previo orienta la cirugía y la rehabilitación, y el riesgo de delirium."),
    act("musica", "¿Le gusta el folclore?", "neutro", "“Me encanta.”", "No orienta."),
  ],
  exam: [
    act("miembro", "Inspección del miembro inferior derecho", "clave", "Acortado y en rotación externa; dolor intenso a la movilización de la cadera.", "Típico de fractura de cadera."),
    act("neurovascular", "Pulsos y sensibilidad distales", "clave", "Pulsos presentes, sensibilidad conservada.", "Descarta compromiso neurovascular."),
    act("piel", "Piel: zonas de apoyo", "util", "Eritema en el talón y el sacro.", "Riesgo de úlceras por presión tras horas en el piso."),
    act("cognitivo", "Estado cognitivo", "util", "Orientada.", "Valor basal para detectar delirium."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de pelvis y de cadera derecha", "clave", "Fractura subcapital del cuello femoral derecho, desplazada (Garden IV).", "Confirma y clasifica: las intracapsulares desplazadas suelen tratarse con artroplastia."),
    study("Laboratorio", "lab", "Hemograma, función renal, ionograma, CPK, coagulograma, grupo y factor", "clave", "Hb 11,2, creatinina 1,2, CPK 1.400.", "Valoración prequirúrgica; CPK alta por estadía en el piso."),
    study("Electrofisiología", "ecg", "Electrocardiograma", "util", "Ritmo sinusal, sin alteraciones agudas.", "Prequirúrgico y para descartar causa cardíaca de la caída."),
    study("Imágenes", "rmn", "Resonancia de cadera", "innecesario", "No se realizó.", "Solo si la radiografía es normal con alta sospecha de fractura oculta."),
    study("Imágenes", "dmo", "Densitometría antes de operar", "innecesario", "No se realizó.", "Una fractura de cadera por caída de propia altura ya es diagnóstico clínico de osteoporosis; no debe demorar la cirugía."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("cadera", "Fractura de cuello femoral desplazada por fragilidad (osteoporosis)", true, "Caída de propia altura, miembro acortado y rotado externamente, radiografía con fractura subcapital desplazada."),
      dx("contusion", "Contusión de cadera", false, "No hay acortamiento ni rotación, y puede caminar."),
      dx("pelvis", "Fractura de ramas pubianas", false, "Dolor inguinal con miembro no rotado; la radiografía lo distingue."),
      dx("luxacion", "Luxación de cadera", false, "En cadera nativa requiere trauma de alta energía; es más frecuente en prótesis."),
      dx("metastasis", "Fractura patológica por metástasis", false, "Lesiones líticas o blásticas en la radiografía y antecedente oncológico."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cirugia", "Cirugía (artroplastia) dentro de las primeras 24–48 h", "clave", "La cirugía precoz reduce mortalidad, complicaciones y dolor."),
      mg("analgesia", "Analgesia multimodal con bloqueo regional (fascia ilíaca)", "clave", "El dolor no tratado favorece el delirium; el bloqueo reduce el uso de opioides."),
      mg("delirium", "Prevención de delirium y complicaciones: suspender lorazepam con descenso, tromboprofilaxis, movilización precoz, cuidado de la piel", "clave", "Medidas ortogeriátricas que mejoran el pronóstico."),
      mg("osteoporosis", "Al alta: tratar la osteoporosis (calcio, vitamina D, bifosfonato) y prevenir caídas", "util", "Reduce nuevas fracturas."),
      mg("conservador", "Tratamiento conservador con reposo en cama 6 semanas", "riesgoso", "La inmovilización prolongada causa neumonía, trombosis, úlceras, delirium y alta mortalidad."),
      mg("haloperidol", "Haloperidol de rutina para dormir", "innecesario", "No previene el delirium y tiene efectos adversos."),
    ],
  },
  debrief: {
    diagnosis: "Fractura subcapital desplazada de cuello femoral derecho por fragilidad (osteoporosis), tras caída de propia altura, en mujer de 84 años.",
    pathologies: [
      { name: "Fractura de cuello femoral", role: "principal", why: "Fractura intracapsular desplazada." },
      { name: "Osteoporosis", role: "asociada", why: "Fractura por fragilidad." },
      { name: "Caídas por fármacos (benzodiacepinas)", role: "asociada", why: "Factor de riesgo modificable." },
      { name: "Fractura de pelvis", role: "diferencial", why: "Otra fractura por fragilidad." },
      { name: "Síncope", role: "diferencial", why: "Se descarta como causa de la caída." },
    ],
    reasoning: [
      "Causa: hueso con osteoporosis (pérdida de masa y microarquitectura tras la menopausia y con la edad) más una caída lateral sobre la cadera.",
      "Mecanismo: el cuello femoral, sometido a la fuerza de la caída, se fractura; en las fracturas intracapsulares desplazadas se interrumpe la irrigación de la cabeza femoral.",
      "Consecuencia: dolor, impotencia funcional, miembro acortado y rotado; riesgo de necrosis avascular y no consolidación (por eso artroplastia).",
      "En el adulto mayor, la inmovilidad lleva rápido a complicaciones: delirium, neumonía, trombosis, úlceras.",
    ],
    epidemiology:
      "En la Argentina se producen alrededor de 34.000 fracturas de cadera por año, y la mortalidad al año ronda el 20–30 %. Afectan sobre todo a mayores de 80 años y son 2 a 3 veces más frecuentes en mujeres por la osteoporosis posmenopáusica. Las caídas en el hogar son el mecanismo principal.",
    management: [
      "Analgesia temprana (bloqueo regional), radiografía y valoración prequirúrgica.",
      "Cirugía en 24–48 h: osteosíntesis o artroplastia según el tipo de fractura.",
      "Manejo ortogeriátrico: prevención de delirium, tromboprofilaxis, nutrición, movilización precoz.",
      "Tratamiento de la osteoporosis y prevención de caídas (revisar fármacos, ambiente, ejercicio).",
      "Rehabilitación.",
    ],
    sources: [
      "Sociedad Argentina de Osteoporosis y Asociación Argentina de Osteología y Metabolismo Mineral — Guías de osteoporosis.",
      "Asociación Argentina de Ortopedia y Traumatología — Recomendaciones sobre fractura de cadera del adulto mayor.",
    ],
    pearls: ["Miembro acortado y en rotación externa = fractura de cadera.", "Cirugía en menos de 48 h.", "Fractura por fragilidad = osteoporosis: hay que tratarla."],
    pitfalls: ["Tratar en forma conservadora.", "No tratar el dolor.", "Olvidar la osteoporosis al alta."],
  },
};
