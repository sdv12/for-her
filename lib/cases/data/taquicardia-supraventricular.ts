import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const taquicardiaSupraventricular: ClinicalCase = {
  id: "taquicardia-supraventricular",
  level: 2,
  area: "Cardiovascular",
  setting: "Guardia",
  patient: { age: 27, ageUnit: "años", sex: "F", context: "Sana. Tomó tres cafés y una bebida energizante para estudiar." },
  frequency: "frecuente",
  intro: "“De golpe el corazón se me puso a mil, como si me fuera a salir del pecho. Ya me pasó otras veces, pero se me iba sola.”",
  vitals: { TA: "112/72 mmHg", FC: "186 lpm", FR: "20 rpm", "SatO₂": "98 %" },
  anamnesis: [
    act("inicio", "¿Cómo empezó y cómo termina cuando se va?", "clave", "“Empieza de golpe, como un interruptor, y se va de golpe.”", "Inicio y fin súbitos: típico de las taquicardias por reentrada."),
    act("gravedad", "¿Te duele el pecho, te falta el aire o te desmayaste?", "clave", "“Me falta un poco el aire, no me desmayé ni me duele.”", "Busca criterios de inestabilidad que obligarían a cardiovertir."),
    act("estimulantes", "¿Tomaste café, energizantes, drogas o medicamentos?", "clave", "“Tres cafés y un energizante.”", "Desencadenantes frecuentes."),
    act("previos", "¿Cuántas veces te pasó y cuánto duraban?", "util", "“Unas cinco veces en el año, minutos.”", "Episodios recurrentes: indica estudio y eventualmente ablación."),
    act("familia", "¿Alguien de tu familia murió de golpe joven?", "util", "“No.”", "Descarta antecedentes de muerte súbita."),
    act("asma", "¿Tenés asma?", "clave", "“No.”", "La adenosina puede producir broncoespasmo en asmáticos."),
    act("carrera", "¿Qué estás estudiando?", "neutro", "“Abogacía.”", "No orienta."),
  ],
  exam: [
    act("perfusion", "Estado de conciencia y perfusión", "clave", "Lúcida, relleno capilar 2 s, extremidades tibias.", "Estable hemodinámicamente."),
    act("pulso", "Pulso", "clave", "Rítmico, regular, 186 lpm.", "Taquicardia regular."),
    act("cuello", "Cuello", "util", "Pulsaciones rápidas en el cuello (signo de la rana).", "Contracción simultánea de aurículas y ventrículos, típica de la reentrada nodal."),
  ],
  studies: [
    study("Electrofisiología", "ecg", "Electrocardiograma de 12 derivaciones", "clave", "Taquicardia regular de QRS angosto a 186 lpm, sin ondas P visibles.", "Taquicardia supraventricular paroxística, probablemente por reentrada nodal."),
    study("Laboratorio", "lab", "Ionograma, TSH, troponina", "util", "Normales.", "Descartan desencadenantes y daño miocárdico."),
    study("Electrofisiología", "ecg-post", "ECG después de revertir", "clave", "Ritmo sinusal, sin preexcitación (sin onda delta).", "Descarta Wolff-Parkinson-White."),
    study("Imágenes", "tc", "Tomografía de tórax", "innecesario", "No se realizó.", "No aporta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("tsv", "Taquicardia supraventricular paroxística por reentrada nodal, estable", true, "Taquicardia regular de QRS angosto, de inicio y fin súbitos, sin ondas P, en mujer joven, sin inestabilidad."),
      dx("sinusal", "Taquicardia sinusal por ansiedad", false, "La sinusal tiene ondas P, sube y baja gradualmente y rara vez supera 150 lpm en reposo."),
      dx("fa", "Fibrilación auricular", false, "Sería irregular."),
      dx("tv", "Taquicardia ventricular", false, "El QRS es angosto."),
      dx("aleteo", "Aleteo auricular 2:1", false, "Daría ondas F en serrucho y una frecuencia cercana a 150."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("vagales", "Maniobras vagales (Valsalva modificada con elevación de piernas)", "clave", "Primera medida en la TSV estable; revierten una parte de los casos."),
      mg("adenosina", "Adenosina 6 mg EV en bolo rápido con lavado, y luego 12 mg si no revierte, con monitoreo", "clave", "Bloquea el nodo AV y corta la reentrada."),
      mg("monitor", "Monitoreo, acceso venoso y desfibrilador disponible", "clave", "La adenosina produce una pausa breve."),
      mg("derivar", "Derivar a cardiología para estudio electrofisiológico y ablación", "util", "Episodios recurrentes: la ablación es curativa."),
      mg("cardioversion", "Cardioversión eléctrica de entrada", "innecesario", "Está estable: se reserva para inestabilidad o falla del tratamiento."),
      mg("presion-ocular", "Compresión de los globos oculares", "riesgoso", "Puede dañar la retina; ya no se recomienda."),
    ],
  },
  debrief: {
    diagnosis: "Taquicardia supraventricular paroxística por reentrada nodal, hemodinámicamente estable, desencadenada por cafeína, en mujer de 27 años.",
    pathologies: [
      { name: "Taquicardia por reentrada nodal", role: "principal", why: "TSV regular de QRS angosto sin ondas P visibles." },
      { name: "Wolff-Parkinson-White", role: "diferencial", why: "Se descarta con el ECG basal sin preexcitación." },
      { name: "Taquicardia sinusal, aleteo, FA", role: "diferencial", why: "Otras taquicardias de QRS angosto." },
    ],
    reasoning: [
      "Causa: una doble vía en el nodo AV (lenta y rápida) presente desde el nacimiento; la cafeína y el estrés facilitan las extrasístoles que la disparan.",
      "Mecanismo: el impulso baja por una vía y sube por la otra, en un circuito de reentrada que se autoperpetúa.",
      "Consecuencia: taquicardia regular rápida con palpitaciones y a veces disnea o mareo; en pocos casos inestabilidad.",
    ],
    epidemiology:
      "La taquicardia por reentrada nodal es la taquicardia supraventricular más frecuente en adultos y es dos veces más frecuente en mujeres, con inicio entre los 20 y 40 años. En niños predominan las vías accesorias (WPW). Es una consulta habitual en la guardia.",
    management: [
      "Evaluar estabilidad: si hay hipotensión, shock, dolor isquémico o insuficiencia cardíaca, cardioversión sincronizada.",
      "Estable: maniobras vagales, luego adenosina; alternativas: verapamilo o diltiazem.",
      "ECG después de revertir para buscar preexcitación.",
      "Recurrencias: betabloqueantes o ablación por radiofrecuencia.",
    ],
    sources: ["Sociedad Argentina de Cardiología — Consenso de arritmias.", "Guías ESC de taquicardias supraventriculares."],
    pearls: ["QRS angosto regular sin P = TSV.", "Vagales y después adenosina.", "Inestable = cardioversión."],
    pitfalls: ["Adenosina lenta (no funciona).", "Usar verapamilo en una taquicardia de QRS ancho."],
    tribunal: [
      qa("¿Qué es el síndrome de Wolff-Parkinson-White?", "La presencia de una vía accesoria entre aurícula y ventrículo que produce preexcitación en el ECG (PR corto, onda delta, QRS ancho) y taquicardias; si hay fibrilación auricular, se evitan los bloqueantes del nodo AV (adenosina, verapamilo, digoxina)."),
      qa("¿Cómo se maneja una taquicardia inestable?", "Con cardioversión eléctrica sincronizada inmediata, con sedación si hay tiempo; inestabilidad es hipotensión, shock, alteración de la conciencia, dolor isquémico o insuficiencia cardíaca aguda."),
      qa("¿Qué efectos adversos tiene la adenosina?", "Sensación de muerte inminente, rubor, opresión torácica y pausa breve (asistolia transitoria) por su vida media de segundos; broncoespasmo en asmáticos. Se potencia con dipiridamol y se antagoniza con teofilina."),
    ],
  },
};
