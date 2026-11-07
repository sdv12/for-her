import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const abscesoPulmonar: ClinicalCase = {
  id: "absceso-pulmonar",
  level: 3,
  area: "Respiratorio",
  setting: "Guardia",
  patient: { age: 54, ageUnit: "años", sex: "M", context: "Alcoholismo, mala dentición. Una convulsión por abstinencia hace tres semanas." },
  frequency: "poco-frecuente",
  intro: "“Hace tres semanas tengo tos y fiebre, sudo de noche y ahora escupo mucho catarro con olor muy feo. Bajé de peso.”",
  vitals: { TA: "118/72 mmHg", FC: "102 lpm", FR: "24 rpm", "T°": "38,6 °C", "SatO₂": "93 %" },
  anamnesis: [
    act("aspiracion", "¿Tuviste desmayos, convulsiones, vómitos o borracheras fuertes?", "clave", "“Una convulsión y varias borracheras.”", "Pérdida de conciencia: aspiración."),
    act("esputo", "¿Cómo es el catarro?", "clave", "“Abundante, feo, con olor a podrido.”", "Vómica pútrida: anaerobios."),
    act("tbc", "¿Tuviste contacto con tuberculosis, sangre en el catarro?", "clave", "“Un compañero; sangre a veces.”", "Diferencial a descartar."),
    act("tabaco", "¿Fumás?", "util", "“Sí.”", "Riesgo de cáncer: diferencial."),
    act("dientes", "¿Cómo están tus dientes?", "util", "“Mal.”", "Reservorio de anaerobios."),
    act("hincha", "¿De qué cuadro sos?", "neutro", "“Instituto.”", "No orienta."),
  ],
  exam: [
    act("pulmon", "Auscultación", "clave", "Rales y soplo anfórico en base posterior derecha.", "Cavidad comunicada."),
    act("boca", "Boca", "clave", "Gingivitis, caries múltiples.", "Fuente."),
    act("dedos", "Dedos y estado general", "util", "Hipocratismo reciente, adelgazado.", "Supuración crónica."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía o TC de tórax", "clave", "Cavidad de 6 cm con nivel hidroaéreo en segmento superior del lóbulo inferior derecho.", "Sitio típico de aspiración."),
    study("Microbiología", "esputo", "Baciloscopías, cultivo de esputo, hemocultivos", "clave", "BAAR negativo; flora mixta.", "Excluir TBC es fundamental."),
    study("Laboratorio", "lab", "Hemograma, función hepática, VIH", "util", "Leucocitosis, anemia.", "Comorbilidades."),
    study("Imágenes", "broncoscopia", "Broncoscopía si no hay respuesta o sospecha de tumor", "util", "No se realizó al inicio.", "Se reserva a casos seleccionados."),
    study("Otros", "drenaje", "Drenaje percutáneo como primera medida", "riesgoso", "No se realizó.", "La mayoría cura con antibióticos y drenaje bronquial."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("absceso", "Absceso pulmonar por aspiración (anaerobios)", true, "Aspiración, esputo pútrido, cavidad con nivel en un segmento típico y BAAR negativo."),
      dx("tbc", "Tuberculosis cavitada", false, "Afecta vértices, con BAAR positivo y sin olor."),
      dx("cancer", "Cáncer de pulmón cavitado", false, "Se tiene en cuenta si no responde, con paredes gruesas e irregulares."),
      dx("empiema", "Empiema", false, "Es pleural; aquí la cavidad es intrapulmonar."),
      dx("hidatidico", "Quiste hidatídico", false, "No da esputo pútrido."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("atb", "Ampicilina-sulbactam o clindamicina por 3 a 6 semanas", "clave", "Cubre anaerobios; el tratamiento es prolongado."),
      mg("drenaje-postural", "Drenaje postural y kinesioterapia", "clave", "Vacía la cavidad."),
      mg("alcohol", "Tiamina, abordar alcohol y salud bucal", "clave", "Evita recurrencias."),
      mg("seguimiento", "Control radiológico, con broncoscopía si no resuelve", "util", "Excluye tumor."),
      mg("corto", "Antibiótico por 5 días", "riesgoso", "Insuficiente."),
      mg("cirugia", "Lobectomía de entrada", "innecesario", "Solo si falla el tratamiento médico."),
    ],
  },
  debrief: {
    diagnosis: "Absceso pulmonar por aspiración en segmento superior del lóbulo inferior derecho, en varón de 54 años con alcoholismo y mala salud bucal.",
    pathologies: [
      { name: "Absceso pulmonar", role: "principal", why: "Necrosis y cavidad por infección." },
      { name: "Alcoholismo, enfermedad periodontal", role: "asociada", why: "Factores de riesgo." },
      { name: "TBC, cáncer, empiema", role: "diferencial", why: "Otras cavidades." },
    ],
    reasoning: [
      "Causa: aspiración de contenido orofaríngeo con anaerobios durante la pérdida de conciencia.",
      "Mecanismo: neumonitis, necrosis en días a semanas y drenaje bronquial.",
      "Consecuencia: fiebre, esputo pútrido, pérdida de peso y hemoptisis.",
    ],
    epidemiology:
      "Se asocia con alcoholismo, epilepsia, sedación y mala dentición. Por gravedad, afecta segmentos posteriores de los lóbulos superiores y superiores de los inferiores, sobre todo a la derecha. Los antibióticos redujeron mucho la mortalidad.",
    management: [
      "Radiografía o TC, baciloscopía.",
      "Antibióticos prolongados.",
      "Drenaje postural.",
      "Broncoscopía si no resuelve.",
    ],
    sources: ["Asociación Argentina de Medicina Respiratoria — Recomendaciones.", "Sociedad Argentina de Infectología — Consenso de neumonías."],
    pearls: ["Esputo pútrido: anaerobios.", "Siempre baciloscopía.", "Sin mejoría: excluir tumor."],
    pitfalls: ["Acortar el tratamiento.", "Olvidar TBC."],
    tribunal: [
      qa("¿Qué segmentos se afectan en la aspiración?", "De pie, los basales; acostado, el posterior de los lóbulos superiores y el superior de los inferiores, en general a la derecha."),
      qa("¿Qué causa cavidades pulmonares?", "Absceso, TBC, cáncer, hongos, vasculitis (GPA), infarto pulmonar y embolia séptica."),
      qa("¿Cómo se diferencia empiema de absceso en imagen?", "El empiema tiene forma lenticular y ángulo obtuso; el absceso es redondo y con ángulo agudo con la pared."),
    ],
  },
};
