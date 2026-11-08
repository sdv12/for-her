import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const polineuropatiaDiabetica: ClinicalCase = {
  id: "polineuropatia-diabetica",
  level: 2,
  area: "Endocrinología",
  setting: "Consultorio",
  patient: { age: 59, ageUnit: "años", sex: "M", context: "Diabético tipo 2 hace 14 años, HbA1c de 9,2 %. Toma metformina hace una década. Encargado de edificio." },
  frequency: "muy-frecuente",
  intro: "“Hace meses me arden los pies y siento hormigueo, peor a la noche. A veces no siento las ojotas y se me salen.”",
  vitals: { TA: "138/84 mmHg", FC: "78 lpm", "T°": "36,4 °C", Peso: "88 kg", Glucemia: "214 mg/dl" },
  anamnesis: [
    act("distribucion", "¿Dónde empezó? ¿Es en los dos pies? ¿Sube?", "clave", "“En los dedos de los dos pies; ahora llega a los tobillos.”", "Distribución simétrica, distal y ascendente, en bota."),
    act("otras-causas", "¿Cuánto alcohol tomás? ¿Quimioterapia? ¿Comés carne?", "clave", "“Casi no tomo. Como de todo.”", "Alcohol, fármacos y déficit nutricional son las otras causas frecuentes."),
    act("autonomica", "¿Mareos al pararte, diarrea nocturna, problemas de erección?", "clave", "“Me cuesta tener erecciones.”", "Busca compromiso autonómico, que empeora el pronóstico."),
    act("heridas", "¿Tuviste heridas en los pies que no te dolieron?", "util", "“Una ampolla que no sentí.”", "La pérdida de sensibilidad protectora anticipa la úlcera."),
    act("debilidad", "¿Te cuesta subir escaleras? ¿Empezó de golpe?", "util", "“No, fue de a poco.”", "Debilidad proximal o inicio rápido obligan a buscar otra causa."),
    act("edificio", "¿Cuántos pisos tiene el edificio?", "neutro", "“Doce.”", "No orienta."),
  ],
  exam: [
    act("monofilamento", "Monofilamento de 10 g y diapasón de 128 Hz", "clave", "No percibe el monofilamento en 4 de 10 puntos; vibración abolida en el hallux.", "Define la pérdida de sensibilidad protectora."),
    act("reflejos", "Reflejos, fuerza y marcha", "clave", "Aquilianos abolidos, fuerza conservada.", "Patrón sensitivo distal típico."),
    act("pies", "Inspección de pies y pulsos", "clave", "Piel seca, dedos en garra, hiperqueratosis plantar; pulsos presentes.", "Riesgo alto de úlcera sin isquemia."),
  ],
  studies: [
    study("Laboratorio", "lab", "HbA1c, función renal y relación albúmina/creatinina", "clave", "HbA1c 9,2 %; filtrado 78 ml/min; albuminuria 60 mg/g.", "Control metabólico y otras complicaciones."),
    study("Laboratorio", "b12", "Vitamina B12, TSH y hemograma", "clave", "B12 de 165 pg/ml; TSH normal.", "La metformina prolongada baja la B12, una causa corregible."),
    study("Imágenes", "fondo", "Fondo de ojo", "util", "Retinopatía no proliferativa leve.", "Las complicaciones microvasculares suelen venir juntas."),
    study("Otros", "emg", "Electromiograma de rutina", "innecesario", "No se realizó.", "Se reserva para cuadros atípicos: asimétricos, motores o de inicio rápido."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("polineuropatia", "Polineuropatía diabética sensitiva distal con déficit de B12 asociado", true, "Ardor en bota, simétrico y ascendente, con monofilamento alterado, mal control y B12 baja."),
      dx("guillain", "Guillain-Barré", false, "Es agudo, motor y ascendente; aquí lleva meses y conserva la fuerza."),
      dx("arterial", "Enfermedad arterial periférica", false, "Daría claudicación y pulsos débiles; los pulsos están presentes."),
      dx("mielopatia", "Compresión medular", false, "Daría nivel sensitivo, hiperreflexia y trastornos esfinterianos."),
      dx("radiculopatia", "Radiculopatía lumbar", false, "Es asimétrica y sigue un dermatoma."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("glucemia", "Mejorar el control de glucemia y factores de riesgo", "clave", "Es lo único que frena la progresión."),
      mg("dolor", "Pregabalina, duloxetina o amitriptilina para el dolor neuropático", "clave", "Tratan el síntoma; se elige según comorbilidades."),
      mg("pie", "Educación y cuidado del pie, con podología y calzado adecuado", "clave", "Previene úlceras y amputaciones."),
      mg("b12", "Reponer vitamina B12", "clave", "Corrige un factor agravante."),
      mg("calor", "Bolsa de agua caliente en los pies y caminar descalzo", "riesgoso", "Sin sensibilidad, puede quemarse o lastimarse sin darse cuenta."),
      mg("aines", "AINE a diario para el ardor", "riesgoso", "No sirven para el dolor neuropático y dañan el riñón."),
    ],
  },
  debrief: {
    diagnosis: "Polineuropatía diabética sensitiva distal con pérdida de sensibilidad protectora y déficit de B12 por metformina, en varón de 59 años.",
    pathologies: [
      { name: "Polineuropatía diabética", role: "principal", why: "Es la complicación crónica más frecuente." },
      { name: "Déficit de B12 por metformina", role: "asociada", why: "Agrava la neuropatía y se corrige." },
      { name: "Neuropatía alcohólica, Guillain-Barré, radiculopatía", role: "diferencial", why: "Otras causas de síntomas en los miembros inferiores." },
    ],
    reasoning: [
      "Causa: hiperglucemia crónica sostenida durante años.",
      "Mecanismo: daño metabólico y microvascular de los axones más largos, que se afectan primero.",
      "Consecuencia: dolor y anestesia en bota, deformidades, úlceras indoloras y riesgo de amputación.",
    ],
    epidemiology:
      "Afecta hasta a la mitad de las personas con diabetes de larga evolución y es la principal condición detrás del pie diabético. Por eso se examina al diagnóstico en la DM2 y cada año. Muchas personas no tienen síntomas: la falta de dolor no significa que el pie esté sano.",
    management: [
      "Examen anual con monofilamento y diapasón.",
      "Descartar causas corregibles como B12, alcohol y TSH.",
      "Controlar glucemia, presión y lípidos.",
      "Tratar el dolor y educar en el cuidado del pie.",
    ],
    sources: ["Sociedad Argentina de Diabetes — Recomendaciones sobre neuropatía diabética.", "American Diabetes Association — Standards of Care in Diabetes."],
    pearls: ["Distal, simétrica y en bota.", "Metformina prolongada: pedí B12.", "Un pie que no duele también puede estar en riesgo."],
    pitfalls: ["No sacar las medias en la consulta.", "Atribuir a la diabetes un cuadro asimétrico o motor."],
    tribunal: [
      qa("¿Qué fibras explican el dolor y cuáles la ataxia?", "Las fibras finas dan dolor y ardor; las gruesas dan pérdida de vibración, propiocepción y reflejos."),
      qa("¿Qué formas de neuropatía autonómica conocés?", "Cardiovascular con hipotensión ortostática, gastroparesia, diarrea nocturna, vejiga neurógena y disfunción eréctil."),
      qa("¿Qué es la artropatía de Charcot?", "Destrucción articular del pie neuropático; se sospecha ante pie caliente, hinchado y sin infección."),
    ],
  },
};
