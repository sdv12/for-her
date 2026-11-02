import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const anafilaxiaNino: ClinicalCase = {
  id: "anafilaxia-alimentaria-nino",
  level: 2,
  area: "Alergia e inmunología",
  setting: "Guardia",
  patient: { age: 6, ageUnit: "años", sex: "M", context: "Tiene asma leve y dermatitis atópica. En un cumpleaños comió un alfajor con maní." },
  frequency: "frecuente",
  intro: "“A los diez minutos de comer el alfajor se puso rojo, se le hinchó la cara, empezó a toser y a vomitar. Ahora le silba el pecho.” (relata la madre)",
  vitals: { TA: "78/44 mmHg", FC: "148 lpm", FR: "36 rpm", "SatO₂": "91 %", Peso: "22 kg" },
  anamnesis: [
    act("alimento", "¿Qué comió y cuánto tardaron los síntomas?", "clave", "“Un alfajor con maní, a los diez minutos.”", "Inicio en minutos tras un alimento: alergia mediada por IgE."),
    act("respiracion", "¿Le cuesta respirar o tragar? ¿Cambió la voz?", "clave", "“Tose y le silba, la voz ronca.”", "Compromiso respiratorio: anafilaxia."),
    act("antes", "¿Le pasó antes con maní u otros alimentos?", "util", "“Una vez ronchas con manteca de maní.”", "Reacción previa leve: no predice la gravedad de la siguiente."),
    act("asma", "¿Tiene asma? ¿Usa inhaladores?", "clave", "“Asma leve, no siempre usa el inhalador.”", "El asma mal controlada es factor de anafilaxia grave."),
    act("adrenalina", "¿Tiene autoinyector de adrenalina?", "util", "“No.”", "Debe tener."),
    act("cumple", "¿De quién era el cumpleaños?", "neutro", "“De un compañero.”", "No orienta."),
  ],
  exam: [
    act("piel", "Piel y mucosas", "clave", "Urticaria generalizada, angioedema de labios y párpados.", "Compromiso cutáneo."),
    act("pulmon", "Auscultación y trabajo respiratorio", "clave", "Sibilancias difusas, tiraje.", "Broncoespasmo."),
    act("perfusion", "Perfusión", "clave", "Relleno capilar 4 s, hipotensión para la edad.", "Compromiso cardiovascular: anafilaxia grave."),
  ],
  studies: [
    study("Laboratorio", "triptasa", "Triptasa sérica (en las primeras horas)", "util", "Elevada.", "Apoya el diagnóstico; no debe demorar el tratamiento."),
    study("Otros", "ige", "IgE específica o prick para maní (diferido)", "util", "Positiva para maní.", "Confirma el alérgeno en el seguimiento."),
    study("Imágenes", "rx", "Radiografía de tórax antes de tratar", "riesgoso", "No se realizó.", "La adrenalina no se demora por estudios."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("anafilaxia", "Anafilaxia grave por alergia al maní", true, "Minutos después de comer maní: urticaria, angioedema, sibilancias, vómitos e hipotensión."),
      dx("urticaria", "Urticaria aguda", false, "Hay compromiso respiratorio, digestivo y cardiovascular."),
      dx("asma", "Crisis asmática", false, "No explica la urticaria ni la hipotensión."),
      dx("cuerpo-extrano", "Aspiración de cuerpo extraño", false, "No hay episodio de sofocación y hay compromiso cutáneo."),
      dx("intoxicacion", "Intoxicación alimentaria", false, "Da síntomas digestivos sin urticaria ni broncoespasmo en minutos."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("adrenalina", "Adrenalina IM en la cara anterolateral del muslo (0,01 mg/kg, máximo 0,3 mg en niños), repetir a los 5–15 minutos si no mejora", "clave", "Es el tratamiento de primera línea y no tiene contraindicaciones absolutas."),
      mg("posicion", "Acostado con piernas elevadas, oxígeno y expansión con solución fisiológica", "clave", "Hipotensión."),
      mg("salbutamol", "Salbutamol para el broncoespasmo", "util", "Complemento."),
      mg("observacion", "Observación al menos 6–12 h por reacción bifásica", "clave", "Los síntomas pueden volver."),
      mg("alta-plan", "Al alta: autoinyector de adrenalina, plan escrito, evitar maní y derivar a alergia", "clave", "Previene muertes."),
      mg("antihistaminico-solo", "Solo antihistamínico y corticoide", "riesgoso", "No revierten la anafilaxia; demorar la adrenalina aumenta la mortalidad."),
    ],
  },
  debrief: {
    diagnosis: "Anafilaxia grave por alergia alimentaria al maní, con compromiso cutáneo, respiratorio, digestivo y cardiovascular, en niño de 6 años con asma.",
    pathologies: [
      { name: "Anafilaxia por maní", role: "principal", why: "Reacción sistémica grave mediada por IgE." },
      { name: "Asma", role: "asociada", why: "Factor de riesgo de gravedad." },
      { name: "Urticaria, crisis asmática, cuerpo extraño", role: "diferencial", why: "Se descartan por la clínica." },
    ],
    reasoning: [
      "Causa: sensibilización IgE a proteínas del maní.",
      "Mecanismo: al reexponerse, la IgE en mastocitos y basófilos desencadena la liberación masiva de histamina y otros mediadores.",
      "Consecuencia: vasodilatación, aumento de la permeabilidad y broncoespasmo: urticaria, angioedema, sibilancias, vómitos, hipotensión.",
    ],
    epidemiology:
      "Las alergias alimentarias afectan a alrededor del 5–8 % de los niños. Leche, huevo, maní, frutos secos, pescados y mariscos son los más frecuentes. El maní y los frutos secos suelen persistir de por vida y son la causa más común de anafilaxia fatal por alimentos; el asma aumenta el riesgo.",
    management: [
      "Reconocer la anafilaxia y dar adrenalina IM de inmediato.",
      "Sostén: posición, oxígeno, fluidos, broncodilatadores.",
      "Observar por reacción bifásica.",
      "Autoinyector, plan escrito, evitación y derivación a alergia; informar a la escuela.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Guía de diagnóstico y tratamiento de la anafilaxia en pediatría.", "Ley 27.401 (Ley Ruth) de prevención de muertes por alergias alimentarias."],
    pearls: ["Adrenalina IM primero.", "Asma + anafilaxia = más riesgo.", "Autoinyector al alta."],
    pitfalls: ["Dar solo antihistamínicos.", "Alta inmediata sin observación."],
    tribunal: [
      qa("¿Cuáles son los criterios de anafilaxia?", "Inicio agudo con piel o mucosas afectadas y compromiso respiratorio o cardiovascular o digestivo grave; o dos o más sistemas tras un alérgeno probable; o hipotensión tras un alérgeno conocido; o, según criterios recientes, compromiso respiratorio aislado tras un alérgeno conocido."),
      qa("¿Por qué la adrenalina es intramuscular y en el muslo?", "Porque la absorción en el vasto lateral es rápida y predecible, con menos riesgo que la vía EV (arritmias) y más eficacia que la subcutánea."),
      qa("¿Qué es la reacción bifásica?", "La reaparición de síntomas horas después de la resolución de la anafilaxia (en general en las primeras 12 h) sin nueva exposición; por eso se observa al paciente."),
    ],
  },
};
