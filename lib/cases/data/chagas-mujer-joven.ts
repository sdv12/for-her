import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const chagasMujerJoven: ClinicalCase = {
  id: "chagas-cronico-mujer-edad-fertil",
  level: 1,
  area: "Infectología",
  setting: "CAPS",
  patient: { age: 23, ageUnit: "años", sex: "F", context: "Nació en Santiago del Estero; su mamá tiene Chagas. Quiere tener un hijo el año que viene." },
  frequency: "frecuente",
  intro: "“Me hice análisis para donar sangre y me dijeron que tengo Chagas. Me siento bien. ¿Puedo tener hijos?”",
  vitals: { TA: "110/70 mmHg", FC: "72 lpm", "T°": "36,4 °C" },
  anamnesis: [
    act("sintomas", "¿Tenés palpitaciones, desmayos, falta de aire, dificultad para tragar o constipación?", "clave", "“No, nada.”", "Sin síntomas cardíacos ni digestivos: forma crónica indeterminada."),
    act("embarazo", "¿Podés estar embarazada ahora? ¿Usás método anticonceptivo?", "clave", "“No estoy embarazada; uso preservativo.”", "El benznidazol está contraindicado en el embarazo: se necesita anticoncepción eficaz."),
    act("familia", "¿Tus hermanos o tu mamá se hicieron estudios?", "util", "“Mi mamá tiene Chagas; mis hermanos no se estudiaron.”", "Rastreo familiar: hermanos por posible transmisión vertical."),
    act("vinchuca", "¿Viviste en una casa con vinchucas?", "util", "“De chica, en el campo.”", "Vía vectorial o vertical."),
    act("hepatico", "¿Tenés alguna enfermedad o tomás medicación?", "util", "“No.”", "Antes del tratamiento."),
    act("estudio", "¿Qué estudiás?", "neutro", "“Enfermería.”", "No orienta."),
  ],
  exam: [
    act("cardio", "Auscultación cardíaca y pulsos", "clave", "Normal, ritmo regular.", "Sin signos de miocardiopatía."),
    act("abdomen", "Abdomen", "util", "Normal.", "Sin megacolon."),
    act("general", "Examen general", "util", "Normal.", "Sana."),
  ],
  studies: [
    study("Laboratorio", "serologias", "Dos serologías por técnicas distintas (ELISA y HAI o IFI)", "clave", "Ambas reactivas.", "El diagnóstico de Chagas crónico requiere dos técnicas reactivas."),
    study("Electrofisiología", "ecg", "Electrocardiograma", "clave", "Normal.", "Define la forma indeterminada."),
    study("Imágenes", "rx", "Radiografía de tórax (o ecocardiograma)", "util", "Índice cardiotorácico normal.", "Evalúa cardiomegalia."),
    study("Laboratorio", "lab", "Hemograma, hepatograma, función renal y prueba de embarazo antes del tratamiento", "clave", "Normales; embarazo negativo.", "Línea de base y descarte de embarazo."),
    study("Otros", "biopsia", "Biopsia endomiocárdica", "innecesario", "No se realizó.", "No tiene indicación."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("indeterminada", "Enfermedad de Chagas crónica, forma indeterminada, en mujer en edad fértil", true, "Dos serologías reactivas, sin síntomas, con ECG y radiografía normales."),
      dx("aguda", "Chagas agudo", false, "No hay síndrome febril ni chagoma; es una infección de larga data."),
      dx("cardiopatia", "Miocardiopatía chagásica", false, "ECG y examen normales."),
      dx("falso", "Falso positivo de un solo análisis", false, "Dos técnicas distintas reactivas confirman."),
      dx("digestiva", "Forma digestiva", false, "No hay disfagia ni constipación."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("benznidazol", "Tratamiento antiparasitario con benznidazol o nifurtimox, con controles de efectos adversos", "clave", "En mujeres en edad fértil previene la transmisión congénita en futuros embarazos."),
      mg("anticoncepcion", "Anticoncepción eficaz durante el tratamiento", "clave", "Los fármacos están contraindicados en el embarazo."),
      mg("familia", "Estudiar a hermanos y, a futuro, a sus hijos", "clave", "Rastreo de casos ocultos."),
      mg("donacion", "Informar que no puede donar sangre ni órganos", "util", "Vía de transmisión."),
      mg("no-tratar", "No tratar porque no tiene síntomas", "riesgoso", "Se pierde la oportunidad de prevenir la transmisión vertical."),
      mg("aislamiento", "Indicarle que no amamante en el futuro", "innecesario", "La lactancia no está contraindicada (salvo grietas sangrantes o Chagas agudo)."),
    ],
  },
  debrief: {
    diagnosis: "Enfermedad de Chagas crónica en forma indeterminada en mujer de 23 años en edad fértil con deseo de embarazo.",
    pathologies: [
      { name: "Chagas crónico indeterminado", role: "principal", why: "Serología reactiva sin daño de órganos." },
      { name: "Riesgo de transmisión congénita", role: "asociada", why: "Prevenible con tratamiento antes del embarazo." },
      { name: "Miocardiopatía chagásica, forma digestiva", role: "diferencial", why: "Se descartan." },
    ],
    reasoning: [
      "Causa: Trypanosoma cruzi, adquirido por vía vectorial (vinchuca) o vertical.",
      "Mecanismo: el parásito persiste en tejidos durante décadas con baja carga.",
      "Consecuencia: el 70 % queda en forma indeterminada; el resto desarrolla cardiopatía o forma digestiva; las mujeres pueden transmitirlo a sus hijos.",
    ],
    epidemiology:
      "En Argentina se estima que hay alrededor de 1,5 millones de personas con Chagas, la mayoría sin diagnóstico. Hoy la transmisión vertical es la principal vía de nuevos casos. Tratar a niñas y mujeres en edad fértil reduce mucho la transmisión congénita.",
    management: [
      "Diagnóstico con dos técnicas serológicas.",
      "Evaluación cardiológica (ECG, radiografía o eco).",
      "Tratamiento en niños, adolescentes y mujeres en edad fértil, y ofrecerlo a adultos sin cardiopatía avanzada.",
      "Rastreo familiar; no donar sangre ni órganos.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía para la atención al paciente infectado con Trypanosoma cruzi.", "Ley 26.281 de Prevención y Control del Chagas."],
    pearls: ["Mujer en edad fértil con Chagas = tratar.", "Anticoncepción durante el tratamiento.", "Dos técnicas reactivas."],
    pitfalls: ["No tratar por estar asintomática.", "Tratar durante el embarazo."],
    tribunal: [
      qa("¿Qué efectos adversos tiene el benznidazol?", "Dermatitis (la más frecuente, a veces grave), molestias digestivas, neuropatía periférica, leucopenia y elevación de transaminasas; se controla con hemograma y hepatograma durante el tratamiento de 60 días."),
      qa("¿Cuáles son las vías de transmisión del Chagas?", "Vectorial (vinchuca), vertical (congénita), transfusional, por trasplante de órganos, oral (alimentos contaminados) y accidental en laboratorio."),
      qa("¿Cómo se diagnostica el Chagas según la fase?", "En la fase aguda y en el recién nacido, por métodos parasitológicos directos (microhematocrito, PCR); en la crónica y en niños mayores de 10 meses, por dos serologías de técnicas distintas."),
    ],
  },
};
