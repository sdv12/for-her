import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const diarrea: ClinicalCase = {
  id: "diarrea-deshidratacion",
  level: 1,
  area: "Pediatría",
  setting: "CAPS",
  patient: { age: 18, ageUnit: "meses", sex: "F", context: "Enero. La trae la mamá desde un barrio sin red de agua." },
  frequency: "muy-frecuente",
  intro: "“Hace dos días que tiene diarrea, muchas veces por día, y hoy vomitó. Está muy molesta y pide agua todo el tiempo.”",
  vitals: { FC: "135 lpm", FR: "30 rpm", "T°": "37,9 °C", Peso: "10,2 kg (hace 10 días pesaba 11 kg)" },
  anamnesis: [
    act("deposiciones", "¿Cuántas deposiciones? ¿Tienen sangre o moco?", "clave", "“Unas ocho por día, líquidas, sin sangre.”", "Diarrea acuosa sin sangre: orienta a etiología viral o toxigénica. Si hubiera sangre (disentería) pensarías en Shigella o E. coli productora de toxina Shiga, con riesgo de SUH."),
    act("diuresis", "¿Cuándo hizo pis por última vez?", "clave", "“El último pañal mojado fue hace seis horas, y poquito.”", "La diuresis disminuida es un indicador de deshidratación."),
    act("vomitos", "¿Vomita? ¿Tolera líquidos?", "clave", "“Vomitó tres veces, pero toma con muchas ganas.”", "Bebe con avidez: tiene sed, signo de deshidratación, y puede rehidratarse por boca."),
    act("liquidos", "¿Qué le estuvieron dando?", "clave", "“Té, gaseosa y jugo.”", "Los líquidos azucarados o pobres en sodio empeoran la diarrea (por osmolaridad) y no reponen electrolitos."),
    act("agua", "¿De dónde sacan el agua para tomar?", "util", "“De un pozo, no la hervimos.”", "Agua no segura: causa evitable de diarrea. Hay que indicar agua segura (hervida o clorada) y es un tema de salud comunitaria."),
    act("lactancia", "¿Sigue tomando el pecho?", "util", "“Sí, a la noche.”", "Hay que sostenerla durante la diarrea."),
    act("rotavirus", "¿Tiene la vacuna contra rotavirus?", "util", "“Sí, las dos dosis.”", "La vacuna, incorporada al Calendario Nacional, reduce mucho las formas graves por rotavirus."),
  ],
  exam: [
    act("hidratacion", "Signos de deshidratación (estado general, ojos, lágrimas, sed, pliegue)", "clave", "Irritable, ojos hundidos, llanto sin lágrimas, bebe con avidez, el pliegue cutáneo se deshace lentamente.", "Dos o más de estos signos = deshidratación (“algunos signos”, plan B de la OMS). Letargo, no poder beber o pliegue muy lento serían deshidratación grave (plan C)."),
    act("relleno", "Relleno capilar y pulsos", "clave", "Relleno capilar de 2 segundos, pulsos radiales llenos.", "No hay shock: la rehidratación oral es posible."),
    act("abdomen", "Examen abdominal", "util", "Ruidos hidroaéreos aumentados, abdomen blando, sin defensa ni masas.", "Descarta un abdomen quirúrgico (invaginación: masa, dolor cólico, “jalea de grosella”)."),
    act("sensorio", "Estado de conciencia", "util", "Irritable pero conectada, consolable.", "Un niño letárgico o con convulsiones haría pensar en alteraciones del sodio o la glucosa."),
  ],
  studies: [
    study("Laboratorio", "iono", "Ionograma", "innecesario", "Na 138, K 3,6.", "En la deshidratación por algunos signos que se rehidrata por vía oral no hace falta. Se pide en la deshidratación grave, si se va a hidratar por vena o si hay alteración neurológica."),
    study("Microbiología", "copro", "Coprocultivo", "innecesario", "Sin desarrollo de patógenos.", "Solo ante diarrea con sangre, inmunocompromiso, brote o diarrea prolongada."),
    study("Laboratorio", "hemograma", "Hemograma", "innecesario", "Normal.", "No cambia la conducta."),
    study("Microbiología", "rota", "Rotavirus en materia fecal", "neutro", "Negativo.", "Sirve para vigilancia; no cambia el tratamiento."),
    study("Laboratorio", "glucemia", "Glucemia capilar", "neutro", "86 mg/dl.", "Útil si estuviera somnolienta o con ayuno prolongado."),
    study("Imágenes", "eco", "Ecografía abdominal", "innecesario", "Asas con contenido líquido.", "Solo si se sospecha invaginación u otra causa quirúrgica."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("diarrea", "Diarrea aguda acuosa con deshidratación (algunos signos, plan B)", true, "Diarrea líquida sin sangre de 2 días, con sed, ojos hundidos, sin lágrimas, pliegue lento y pérdida de alrededor del 7 % del peso, sin signos de shock."),
      dx("disenteria", "Disentería por Shigella", false, "Daría deposiciones con sangre y moco, fiebre alta y pujo."),
      dx("suh", "Síndrome urémico hemolítico", false, "Suele seguir a una diarrea con sangre y aparece con palidez, oliguria marcada y petequias."),
      dx("invaginacion", "Invaginación intestinal", false, "Dolor cólico con llanto intermitente, masa palpable y deposiciones “en jalea de grosella”."),
      dx("grave", "Deshidratación grave con shock", false, "Habría letargo, imposibilidad de beber, pulso débil y relleno capilar prolongado."),
    ],
  },
  management: {
    prompt: "¿Qué hacés?",
    options: [
      mg("sro", "Plan B: sales de rehidratación oral (baja osmolaridad) 75 ml/kg en 4 horas, de a sorbos o cucharadas, en el centro de salud, reevaluando", "clave", "La rehidratación oral es el tratamiento de elección: corrige la deshidratación en la mayoría de los niños."),
      mg("vomito", "Si vomita, esperar 10 minutos y seguir más despacio", "util", "Los vómitos no contraindican la rehidratación oral; se administra más lento."),
      mg("alimentacion", "Continuar la lactancia y volver a la alimentación habitual apenas se rehidrata", "clave", "El ayuno no ayuda: la alimentación precoz acorta la diarrea y evita la desnutrición."),
      mg("suspender", "Suspender gaseosas, jugos y té", "clave", "Su osmolaridad empeora la diarrea."),
      mg("planA", "Al rehidratarse: plan A en casa (SRO después de cada deposición), agua segura y pautas de alarma", "clave", "Previene una nueva deshidratación y enseña a la familia a reconocer los signos de alarma."),
      mg("notificar", "Notificación al Sistema Nacional de Vigilancia (diarrea aguda)", "util", "Es un evento de notificación obligatoria; permite detectar brotes."),
      mg("ev", "Hidratación endovenosa desde el inicio", "innecesario", "Se reserva para deshidratación grave, shock, falla de la vía oral o vómitos incoercibles."),
      mg("atb", "Antibióticos", "innecesario", "La diarrea acuosa en niños es mayormente viral; se usan solo en situaciones específicas (disentería con compromiso, cólera, etc.)."),
      mg("loperamida", "Loperamida o antieméticos", "riesgoso", "La loperamida está contraindicada en niños (íleo, depresión neurológica) y puede favorecer complicaciones."),
    ],
  },
  debrief: {
    diagnosis: "Diarrea aguda acuosa con deshidratación (algunos signos) — plan B de rehidratación oral.",
    pathologies: [
      { name: "Diarrea aguda acuosa", role: "principal", why: "Mayormente viral (rotavirus, norovirus) o por E. coli enteropatógenas." },
      { name: "Deshidratación isotónica", role: "asociada", why: "La complicación que mata: se clasifica por signos clínicos." },
      { name: "Disentería", role: "diferencial", why: "Diarrea con sangre: otra conducta." },
      { name: "Síndrome urémico hemolítico", role: "diferencial", why: "Complicación de la diarrea por E. coli productora de toxina Shiga, con sangre previa." },
      { name: "Invaginación intestinal", role: "diferencial", why: "Urgencia quirúrgica que puede debutar con vómitos y deposiciones." },
    ],
    reasoning: [
      "Causa: virus (rotavirus, norovirus) o bacterias, favorecidos por agua no segura y falta de saneamiento.",
      "Mecanismo: los virus dañan los enterocitos maduros de las vellosidades → menos absorción y más secreción relativa; además hay un componente osmótico.",
      "Consecuencia: pérdida de agua, sodio, potasio y bicarbonato → deshidratación (taquicardia, sed, ojos hundidos, oliguria) y acidosis metabólica (taquipnea).",
      "Por qué funcionan las sales: el cotransporte sodio-glucosa (SGLT1) del intestino sigue funcionando durante la diarrea; al absorber sodio con glucosa, el agua lo sigue. Por eso el suero tiene una relación precisa de sodio y glucosa y las gaseosas no sirven.",
    ],
    epidemiology:
      "Es una de las principales causas de consulta y de internación en menores de 5 años, con más casos en verano y en hogares sin agua segura ni cloacas. La mortalidad bajó mucho con la rehidratación oral y la vacuna contra rotavirus.",
    management: [
      "Evaluar el estado de hidratación con los signos clínicos de la OMS y elegir el plan: A (sin deshidratación, en casa), B (algunos signos, SRO supervisada) o C (grave, endovenosa).",
      "Plan B: SRO 75 ml/kg en 4 horas, reevaluar y pasar a plan A.",
      "Continuar la lactancia y la alimentación; no ayunos ni líquidos azucarados.",
      "No antidiarreicos; antibióticos solo en situaciones específicas.",
      "Pautas de alarma, agua segura y notificación del evento.",
    ],
    sources: [
      "Ministerio de Salud de la Nación — Diarreas agudas: planes de hidratación A, B y C (OMS).",
      "Sociedad Argentina de Pediatría — Consenso sobre diarrea aguda en la infancia.",
      "Ministerio de Salud de la Nación — Calendario Nacional de Vacunación (rotavirus).",
    ],
    pearls: [
      "Lo que mata en la diarrea es la deshidratación: evaluarla y tratarla es lo primero.",
      "Las SRO funcionan por el cotransporte sodio-glucosa, que no se daña en la diarrea.",
      "Diarrea con sangre en un niño: pensar en SUH y pedir controles.",
    ],
    pitfalls: [
      "Hidratar por vena a un niño que puede tomar.",
      "Indicar ayuno o “dieta de té”.",
      "Usar loperamida en pediatría.",
    ],
  },
};
