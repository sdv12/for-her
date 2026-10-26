import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const anafilaxia: ClinicalCase = {
  id: "anafilaxia-picadura",
  level: 2,
  area: "Alergia e inmunología",
  setting: "Guardia",
  patient: { age: 34, ageUnit: "años", sex: "M", context: "Jardinero. Febrero." },
  frequency: "frecuente",
  intro: "“Me picó una abeja en el cuello hace 15 minutos. Enseguida me empezó a picar todo el cuerpo, se me hinchó la cara, me cuesta respirar y me siento mareado.”",
  vitals: { TA: "78/46 mmHg", FC: "128 lpm", FR: "28 rpm", "SatO₂": "91 %" },
  anamnesis: [
    act("previas", "¿Le pasó antes con una picadura?", "clave", "“El verano pasado se me hinchó mucho el brazo con una picadura de abeja.”", "Una reacción local grande previa no siempre predice anafilaxia, pero orienta a sensibilización al veneno."),
    act("respira", "¿Siente la garganta cerrada o la voz cambiada?", "clave", "“Siento que se me cierra la garganta.”", "Compromiso de la vía aérea superior: urgencia."),
    act("medicacion", "¿Toma betabloqueantes o IECA?", "util", "“No.”", "Los betabloqueantes pueden hacer la anafilaxia refractaria a la adrenalina."),
    act("asma", "¿Es asmático?", "util", "“No.”", "El asma aumenta el riesgo de anafilaxia grave."),
    act("digestivo", "¿Tiene dolor de panza o vómitos?", "util", "“Náuseas.”", "El compromiso digestivo es otro órgano afectado."),
    act("abeja", "¿Sacó el aguijón?", "neutro", "“Sí, con la mano.”", "Ya no cambia la conducta."),
  ],
  exam: [
    act("piel", "Piel y mucosas", "clave", "Urticaria generalizada, angioedema de labios y párpados.", "Compromiso cutáneo extenso: presente en la mayoría de las anafilaxias."),
    act("via", "Vía aérea y auscultación", "clave", "Disfonía, estridor leve, sibilancias bilaterales.", "Compromiso respiratorio alto y bajo."),
    act("perfusion", "Perfusión y conciencia", "clave", "Piel fría, relleno capilar 4 s, lúcido pero ansioso.", "Hipotensión con hipoperfusión: shock anafiláctico."),
  ],
  studies: [
    study("Laboratorio", "triptasa", "Triptasa sérica (entre 1 y 3 h del inicio)", "util", "Elevada.", "Confirma la anafilaxia de forma retrospectiva; nunca demora el tratamiento."),
    study("Laboratorio", "ige", "IgE específica para veneno de abeja en la guardia", "innecesario", "No se realizó.", "Se estudia en forma diferida en alergia (a las 4–6 semanas)."),
    study("Imágenes", "rx", "Radiografía de tórax", "innecesario", "No se realizó.", "No aporta al manejo."),
    study("Electrofisiología", "ecg", "Monitoreo cardíaco", "util", "Taquicardia sinusal.", "La adrenalina y el shock pueden dar arritmias."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("anafilaxia", "Anafilaxia grave (shock anafiláctico) por picadura de himenóptero", true, "Inicio en minutos tras la picadura, con compromiso cutáneo, respiratorio (estridor, sibilancias, hipoxemia) y cardiovascular (hipotensión)."),
      dx("local", "Reacción local grande", false, "Edema extenso solo alrededor de la picadura, sin compromiso sistémico."),
      dx("urticaria", "Urticaria aguda", false, "Sin compromiso respiratorio ni hipotensión."),
      dx("vasovagal", "Reacción vasovagal", false, "Bradicardia y palidez, sin urticaria ni broncoespasmo."),
      dx("angioedema-ieca", "Angioedema por bradicinina", false, "Sin urticaria, relacionado con IECA o hereditario, no responde a adrenalina como la anafilaxia."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("adrenalina", "Adrenalina 0,5 mg intramuscular (1:1000) en la cara anterolateral del muslo, repetible cada 5–15 minutos", "clave", "Es el único tratamiento que salva la vida: vasoconstricción, broncodilatación y frena la liberación de mediadores. No hay contraindicaciones absolutas."),
      mg("posicion", "Acostarlo con las piernas elevadas, oxígeno y expansión con cristaloides", "clave", "Mejora el retorno venoso. Ponerlo de pie de golpe puede causar paro (síndrome del ventrículo vacío)."),
      mg("observacion", "Observación al menos 6–12 h y alta con plan escrito, indicación de autoinyector y derivación a alergia", "clave", "Puede haber reacción bifásica; la inmunoterapia con veneno previene futuras anafilaxias."),
      mg("adyuvantes", "Antihistamínico y corticoide como adyuvantes", "util", "Alivian la urticaria; no tratan el shock ni la obstrucción."),
      mg("solo-antihist", "Solo antihistamínico y corticoide endovenosos", "riesgoso", "No revierten la anafilaxia; demorar la adrenalina aumenta la mortalidad."),
      mg("adrenalina-ev", "Adrenalina endovenosa en bolo sin diluir", "riesgoso", "Riesgo de arritmias graves e isquemia; la vía endovenosa se reserva para infusión diluida en shock refractario con monitoreo."),
    ],
  },
  debrief: {
    diagnosis: "Anafilaxia grave con shock por picadura de abeja en varón de 34 años.",
    pathologies: [
      { name: "Anafilaxia por veneno de himenóptero", role: "principal", why: "Compromiso de piel, vía aérea y circulación en minutos." },
      { name: "Shock distributivo", role: "asociada", why: "Vasodilatación y fuga capilar." },
      { name: "Reacción local grande y urticaria", role: "diferencial", why: "Sin compromiso sistémico." },
      { name: "Angioedema por bradicinina", role: "diferencial", why: "Sin urticaria; no responde igual." },
    ],
    reasoning: [
      "Causa: sensibilización previa al veneno, con IgE específica unida a mastocitos y basófilos.",
      "Mecanismo: al reexponerse, el alérgeno une las IgE y desencadena la degranulación masiva: histamina, triptasa, leucotrienos, prostaglandinas y factor activador de plaquetas.",
      "Consecuencia: vasodilatación y aumento de la permeabilidad (urticaria, angioedema, hipotensión), broncoespasmo y edema laríngeo, síntomas digestivos.",
      "La adrenalina actúa sobre todos los frentes: alfa-1 (vasoconstricción), beta-1 (inotropismo), beta-2 (broncodilatación y estabilización de mastocitos).",
    ],
    epidemiology:
      "Las picaduras de himenópteros son, junto con los alimentos y los fármacos, las principales causas de anafilaxia. En adultos, los fármacos y los himenópteros predominan; en niños, los alimentos. Las anafilaxias por picaduras son más frecuentes en varones, por la exposición laboral y recreativa al aire libre, y en verano.",
    management: [
      "Reconocer: inicio agudo con compromiso de piel más respiratorio o cardiovascular, o hipotensión tras un alérgeno conocido.",
      "Adrenalina IM inmediata en el muslo; repetir si no hay respuesta.",
      "Posición supina, oxígeno, cristaloides; infusión de adrenalina en shock refractario.",
      "Adyuvantes: antihistamínicos, broncodilatadores, corticoides.",
      "Observación, plan escrito, autoinyector y derivación a alergia para inmunoterapia con veneno.",
    ],
    sources: ["Asociación Argentina de Alergia e Inmunología Clínica — Guía de anafilaxia.", "Guía de anafilaxia de la Organización Mundial de Alergia (WAO), adoptada en el país."],
    pearls: ["Anafilaxia = adrenalina IM ya.", "No poner de pie al paciente en shock.", "La inmunoterapia con veneno previene futuras anafilaxias."],
    pitfalls: ["Dar solo antihistamínicos y corticoides.", "Demorar la adrenalina por miedo.", "Dar el alta sin observación ni plan."],
  },
};
