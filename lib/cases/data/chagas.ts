import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const chagas: ClinicalCase = {
  id: "miocardiopatia-chagasica",
  level: 3,
  area: "Cardiovascular",
  setting: "Consultorio",
  patient: { age: 54, ageUnit: "años", sex: "M", context: "Nació en Santiago del Estero; vive en Córdoba hace 30 años." },
  frequency: "poco-frecuente",
  intro: "“Hace dos meses me dan palpitaciones, y la semana pasada me desvanecí subiendo una escalera.”",
  vitals: { TA: "120/75 mmHg", FC: "54 lpm", FR: "16 rpm", "SatO₂": "97 %" },
  anamnesis: [
    act("origen", "¿Dónde nació? ¿Cómo era la casa donde se crió?", "clave", "“En el campo, en Santiago del Estero. Era un rancho de adobe y había vinchucas.”", "Vivir en zona endémica en una vivienda con vinchucas es el principal antecedente de la enfermedad de Chagas."),
    act("serologia", "¿Alguna vez le hicieron el análisis de Chagas o donó sangre?", "clave", "“Hace años no me dejaron donar sangre y nunca volví.”", "Un rechazo como donante suele ser por serología reactiva para Chagas: muchas personas no saben que están infectadas."),
    act("sincope", "¿Cómo fue el desmayo? ¿Tuvo aviso?", "clave", "“Fue haciendo esfuerzo, sin aviso; me recuperé en segundos.”", "Síncope con el esfuerzo y sin pródromos: sospecha de causa cardíaca arrítmica. Es un síntoma de alarma (riesgo de muerte súbita)."),
    act("disnea", "¿Se cansa o le falta el aire?", "util", "“Me canso más que antes.”", "Puede reflejar disfunción ventricular."),
    act("digestivo", "¿Le cuesta tragar? ¿Tiene constipación?", "util", "“Constipado desde siempre, voy de cuerpo cada cuatro o cinco días.”", "La forma digestiva del Chagas (megacolon, megaesófago) puede coexistir con la cardíaca."),
    act("familia", "¿Alguien en su familia tiene Chagas?", "util", "“Mi mamá era ‘enferma del corazón’ y le decían que era Chagas.”", "Apoya el antecedente y obliga a estudiar a la familia (transmisión vertical)."),
    act("muerte", "¿Hubo muertes súbitas en la familia?", "neutro", "“Un tío se murió de golpe, no sé de qué.”", "No cambia la orientación diagnóstica, aunque en Chagas la muerte súbita es frecuente."),
  ],
  exam: [
    act("cardio", "Auscultación cardíaca", "clave", "Bradicardia con extrasístoles frecuentes; desdoblamiento amplio del segundo ruido.", "Arritmia ventricular y bloqueo de rama derecha (desdoblamiento del segundo ruido)."),
    act("ic", "Signos de insuficiencia cardíaca", "util", "Sin ingurgitación yugular, sin edemas, sin rales.", "Todavía no hay congestión."),
    act("abdomen", "Examen abdominal", "neutro", "Distendido, timpánico, sin dolor.", "Compatible con constipación crónica; no cambia la conducta cardiológica."),
  ],
  studies: [
    study("Electrofisiología", "ecg", "Electrocardiograma", "clave", "Bradicardia sinusal de 54 lpm, bloqueo completo de rama derecha con hemibloqueo anterior izquierdo, extrasístoles ventriculares frecuentes.", "BCRD + HBAI es la asociación más característica de la cardiopatía chagásica."),
    study("Laboratorio", "serologia", "Serología para Chagas con dos técnicas distintas (ELISA + HAI o IFI)", "clave", "Ambas reactivas.", "En la fase crónica el diagnóstico es serológico y requiere dos técnicas reactivas distintas."),
    study("Electrofisiología", "holter", "Holter de 24 horas", "clave", "Extrasístoles ventriculares frecuentes y polimorfas, con episodios de taquicardia ventricular no sostenida.", "Arritmia ventricular compleja: marcador de riesgo de muerte súbita."),
    study("Imágenes", "eco", "Ecocardiograma", "clave", "Aneurisma apical del ventrículo izquierdo, trastornos segmentarios, FEVI 40 %.", "El aneurisma apical es muy característico del Chagas; la disfunción ventricular empeora el pronóstico."),
    study("Imágenes", "rx", "Radiografía de tórax", "util", "Índice cardiotorácico de 0,52.", "Cardiomegalia leve."),
    study("Laboratorio", "parasitemia", "Parasitemia directa (Strout o microhematocrito)", "innecesario", "Negativa.", "En la fase crónica la parasitemia es baja: los métodos directos son para la fase aguda y el Chagas congénito."),
    study("Imágenes", "cine", "Coronariografía", "innecesario", "Coronarias sin lesiones.", "Sin angina ni sospecha isquémica fuerte, no está indicada como primer paso."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("chagas", "Miocardiopatía chagásica crónica (trastornos de conducción, arritmia ventricular, aneurisma apical y disfunción del VI)", true, "Serología reactiva por dos técnicas, epidemiología compatible, BCRD + HBAI, arritmia ventricular compleja, aneurisma apical y síncope con el esfuerzo."),
      dx("isquemica", "Cardiopatía isquémica", false, "El aneurisma apical con BCRD + HBAI y serología reactiva orientan a Chagas."),
      dx("nodo", "Enfermedad del nódulo sinusal idiopática", false, "No explica las arritmias ventriculares, el aneurisma ni la serología."),
      dx("dilatada", "Miocardiopatía dilatada idiopática", false, "Es un diagnóstico de exclusión; acá hay una causa clara."),
      dx("indeterminada", "Chagas crónico en forma indeterminada", false, "Requiere ECG y estudios cardíacos normales. Este paciente ya tiene compromiso cardíaco."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cdi", "Derivar a electrofisiología para evaluar un cardiodesfibrilador implantable (síncope + TV no sostenida + disfunción del VI)", "clave", "La muerte súbita por arritmia ventricular es la principal causa de muerte en la cardiopatía chagásica."),
      mg("familia", "Estudio serológico de los familiares, en especial hijos y mujeres en edad fértil", "clave", "La transmisión vertical es la principal vía de infección donde ya no hay vector: el tratamiento de mujeres infectadas antes del embarazo la previene."),
      mg("amiodarona", "Amiodarona para la arritmia ventricular sintomática", "util", "Antiarrítmico de elección en la cardiopatía chagásica, mientras se define el dispositivo."),
      mg("ic", "Tratamiento de la disfunción del VI (IECA/ARA II, antagonista mineralocorticoide; betabloqueante con cautela por la bradicardia)", "util", "Mejora el pronóstico de la disfunción ventricular."),
      mg("anticoag", "Evaluar anticoagulación (aneurisma apical, trombo o embolia previa)", "util", "El aneurisma apical aumenta el riesgo de trombos y embolias."),
      mg("conducir", "Indicar no conducir ni hacer actividades de riesgo hasta completar la evaluación", "util", "Un síncope arrítmico puede repetirse sin aviso."),
      mg("notificar", "Notificar el caso de Chagas crónico al sistema de vigilancia", "util", "Es un evento de notificación en Argentina."),
      mg("benznidazol", "Tratamiento antiparasitario con benznidazol", "innecesario", "En la miocardiopatía chagásica establecida no mostró beneficio sobre la evolución cardíaca. Se indica en la fase aguda, el Chagas congénito, niños, mujeres en edad fértil y adultos sin cardiopatía avanzada."),
      mg("marcapasos", "Marcapasos definitivo por la frecuencia de 54", "innecesario", "Una bradicardia sinusal asintomática no es indicación; si el síncope fuera por bloqueo AV, se reevaluaría."),
    ],
  },
  debrief: {
    diagnosis: "Enfermedad de Chagas crónica, forma cardíaca: miocardiopatía chagásica con BCRD + HBAI, arritmia ventricular compleja, aneurisma apical y FEVI 40 %, con síncope de esfuerzo.",
    pathologies: [
      { name: "Miocardiopatía chagásica crónica", role: "principal", why: "Forma cardíaca de la infección crónica por Trypanosoma cruzi." },
      { name: "Arritmias ventriculares y muerte súbita", role: "asociada", why: "Principal causa de muerte en la cardiopatía chagásica." },
      { name: "Forma digestiva (megacolon, megaesófago)", role: "asociada", why: "Puede coexistir con la cardíaca." },
      { name: "Cardiopatía isquémica", role: "diferencial", why: "Otra causa de aneurisma y disfunción ventricular." },
      { name: "Miocardiopatía dilatada idiopática", role: "diferencial", why: "Diagnóstico de exclusión." },
    ],
    reasoning: [
      "Causa: Trypanosoma cruzi, transmitido por la vinchuca (Triatoma infestans) y también por vía vertical, transfusiones, trasplantes y alimentos contaminados.",
      "Mecanismo: tras una fase aguda que suele pasar inadvertida, la mayoría queda en la forma crónica indeterminada por décadas. En un 20–30 % se desarrolla una miocarditis crónica fibrosante por la persistencia del parásito, la respuesta inmune, la disautonomía y el daño microvascular.",
      "Consecuencia: la fibrosis afecta el sistema de conducción (rama derecha y fascículo anterior izquierdo: BCRD + HBAI, bradiarritmias), crea circuitos de reentrada (taquicardia ventricular, muerte súbita), adelgaza la punta del ventrículo (aneurisma apical con riesgo de trombos y embolias) y deteriora la función ventricular (insuficiencia cardíaca).",
      "Por eso el foco está en estratificar el riesgo arrítmico y tratar la insuficiencia cardíaca; el antiparasitario ya no cambia la evolución cuando la cardiopatía está establecida.",
    ],
    epidemiology:
      "Se estima que en Argentina alrededor de un millón y medio de personas tienen la infección, muchas sin saberlo. La transmisión vectorial persiste en zonas del Gran Chaco (Santiago del Estero, Chaco, Formosa, Salta) y, por la migración, hay muchos casos en ciudades. La cardiopatía aparece típicamente entre los 30 y 60 años, y es más frecuente y grave en varones.",
    management: [
      "Diagnóstico de la fase crónica: dos técnicas serológicas distintas reactivas.",
      "Evaluación cardiológica de toda persona infectada: ECG, radiografía y ecocardiograma; Holter si hay síntomas o ECG anormal.",
      "Tratamiento antiparasitario (benznidazol o nifurtimox): fase aguda, congénito, niños y adolescentes, mujeres en edad fértil y, de forma individualizada, adultos sin cardiopatía avanzada.",
      "En la cardiopatía: tratamiento de la insuficiencia cardíaca, antiarrítmicos, cardiodesfibrilador o marcapasos según indicación y anticoagulación si hay riesgo embólico.",
      "Control de la transmisión vertical: tamizaje de todas las embarazadas y estudio de sus hijos (obligatorio por ley).",
    ],
    sources: [
      "Ministerio de Salud de la Nación — Guías para la atención al paciente infectado con Trypanosoma cruzi.",
      "Ley 26.281 — Prevención y control de todas las formas de transmisión de la enfermedad de Chagas.",
      "Sociedad Argentina de Cardiología — Consenso de enfermedad de Chagas.",
    ],
    pearls: [
      "BCRD + HBAI en un paciente de zona endémica: pensar en Chagas.",
      "Diagnóstico crónico: dos técnicas serológicas distintas.",
      "La muerte súbita es la principal causa de muerte en la cardiopatía chagásica.",
    ],
    pitfalls: [
      "No preguntar por el lugar de nacimiento y la vivienda.",
      "Pedir parasitemia directa en la fase crónica.",
      "Olvidar el estudio de la familia.",
    ],
  },
};
