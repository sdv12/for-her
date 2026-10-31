import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const diseccionAortica: ClinicalCase = {
  id: "diseccion-aortica-aguda",
  level: 4,
  area: "Cardiovascular",
  setting: "Guardia",
  patient: { age: 61, ageUnit: "años", sex: "M", context: "Hipertenso mal controlado. Fuma." },
  frequency: "raro",
  intro: "“Me agarró de golpe un dolor terrible en el pecho que me atraviesa hacia la espalda, como si me desgarraran. Es el peor dolor de mi vida.”",
  vitals: { TA: "176/96 mmHg (brazo derecho); 132/78 (izquierdo)", FC: "104 lpm", FR: "22 rpm", "SatO₂": "96 %" },
  anamnesis: [
    act("dolor", "¿Cómo empezó y cómo es el dolor?", "clave", "“De golpe, máximo desde el principio, desgarrante, al medio de la espalda.”", "Dolor súbito, máximo al inicio, desgarrante y migratorio: típico de disección (el del infarto crece en minutos)."),
    act("hta", "¿Toma la medicación de la presión?", "clave", "“Cuando me acuerdo.”", "La hipertensión mal controlada es el principal factor de riesgo."),
    act("neuro", "¿Tuvo debilidad, desmayo o problemas para hablar?", "clave", "“Me mareé mucho al principio.”", "La disección puede comprometer las carótidas (ACV) o causar síncope por taponamiento."),
    act("piernas", "¿Siente las piernas? ¿Le duele la panza?", "util", "“Hormigueo en la pierna izquierda.”", "Compromiso de ramas (ilíacas, mesentéricas, renales, medulares)."),
    act("antecedentes", "¿Tiene Marfan, válvula aórtica bicúspide o aneurisma conocido? ¿Consumió cocaína?", "util", "“No. Cocaína no.”", "Otros factores de riesgo."),
    act("anticoag", "¿Toma aspirina o anticoagulantes?", "util", "“No.”", "Importa antes de cualquier antitrombótico o cirugía."),
    act("trabajo", "¿A qué se dedica?", "neutro", "“Camionero.”", "No orienta."),
  ],
  exam: [
    act("pulsos", "Pulsos y presión en ambos brazos (y piernas)", "clave", "Diferencia de 44 mmHg entre brazos; pulso femoral izquierdo débil.", "Una diferencia mayor de 20 mmHg y el déficit de pulsos son muy sugestivos de disección."),
    act("soplo", "Auscultación cardíaca", "clave", "Soplo diastólico de insuficiencia aórtica.", "La disección proximal puede afectar la válvula aórtica."),
    act("taponamiento", "Yugulares, ruidos cardíacos, pulso paradójico", "util", "Yugulares normales.", "Busca taponamiento por rotura al pericardio."),
    act("neuro-ex", "Examen neurológico", "util", "Sin déficit motor; hipoestesia leve en pierna izquierda.", "Compromiso de la perfusión del miembro."),
  ],
  studies: [
    study("Imágenes", "angiotc", "Angiotomografía de aorta", "clave", "Disección con flap intimal desde la aorta ascendente hasta la ilíaca izquierda (tipo A de Stanford).", "Confirma y clasifica: el tipo A (aorta ascendente) es quirúrgico de urgencia."),
    study("Electrofisiología", "ecg", "Electrocardiograma", "clave", "Hipertrofia ventricular izquierda, sin supradesnivel del ST.", "Ayuda a distinguir de un infarto (la disección puede comprometer la coronaria derecha)."),
    study("Imágenes", "eco", "Ecocardiograma (transtorácico en la cama)", "util", "Aorta ascendente dilatada con flap, insuficiencia aórtica moderada, sin derrame pericárdico.", "Rápido en el paciente inestable."),
    study("Laboratorio", "lab", "Hemograma, función renal, troponina, grupo y factor", "util", "Troponina normal, creatinina 1,2.", "Base prequirúrgica."),
    study("Laboratorio", "trombolisis", "Trombolizar por sospecha de infarto antes de la imagen", "riesgoso", "No se realizó.", "En una disección, la trombólisis es mortal."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("diseccion", "Disección aórtica aguda tipo A de Stanford", true, "Dolor torácico desgarrante súbito irradiado a la espalda, hipertensión, diferencia de presión entre brazos, déficit de pulso, soplo de insuficiencia aórtica y flap en la angiotomografía desde la aorta ascendente."),
      dx("iam", "Infarto agudo de miocardio", false, "El dolor es opresivo y progresivo, sin diferencia de pulsos; el ECG no muestra supradesnivel."),
      dx("tep", "Tromboembolismo pulmonar", false, "Disnea e hipoxemia con dolor pleurítico; no diferencia de pulsos."),
      dx("tipo-b", "Disección tipo B", false, "Respeta la aorta ascendente; acá la compromete."),
      dx("pericarditis", "Pericarditis", false, "Dolor punzante que cambia con la posición, frote y supradesnivel difuso."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cirugia", "Cirugía cardiovascular de urgencia (reemplazo de la aorta ascendente)", "clave", "La disección tipo A tiene una mortalidad de 1–2 % por hora sin cirugía."),
      mg("betabloqueante", "Betabloqueante endovenoso (esmolol o labetalol) para FC menor de 60 y TAS de 100–120, luego vasodilatador si hace falta", "clave", "Reduce la fuerza de eyección y la presión sobre la pared aórtica."),
      mg("analgesia", "Analgesia con opioides", "clave", "El dolor aumenta la respuesta simpática."),
      mg("antiagregar", "Aspirina y heparina por sospecha de síndrome coronario", "riesgoso", "Aumentan el sangrado y la extensión de la disección."),
      mg("vasodilatador-solo", "Nitroprusiato sin betabloqueante previo", "riesgoso", "La taquicardia refleja aumenta la fuerza sobre la pared aórtica."),
    ],
  },
  debrief: {
    diagnosis: "Disección aórtica aguda tipo A de Stanford (DeBakey I) con insuficiencia aórtica y compromiso del miembro inferior izquierdo, en hipertenso mal controlado.",
    pathologies: [
      { name: "Disección aórtica tipo A", role: "principal", why: "Desgarro de la íntima con falsa luz desde la aorta ascendente." },
      { name: "Insuficiencia aórtica aguda", role: "asociada", why: "Compromiso de la raíz aórtica." },
      { name: "Infarto, TEP y pericarditis", role: "diferencial", why: "Otras causas de dolor torácico grave." },
    ],
    reasoning: [
      "Causa: hipertensión crónica que degenera la capa media de la aorta (también Marfan, válvula bicúspide, cocaína).",
      "Mecanismo: un desgarro de la íntima permite que la sangre entre en la media y la separe, creando una falsa luz que avanza a lo largo de la aorta.",
      "Consecuencia: dolor desgarrante migratorio, oclusión de ramas (coronarias, carótidas, renales, mesentéricas, ilíacas), insuficiencia aórtica, taponamiento y rotura.",
    ],
    epidemiology:
      "La disección aórtica es rara (3–6 casos cada 100.000 personas por año) pero muy grave. Es más frecuente en varones (2:1) de 60 a 70 años con hipertensión; en jóvenes se asocia a Marfan, válvula bicúspide y cocaína.",
    management: [
      "Sospecharla ante dolor torácico desgarrante con diferencia de pulsos o presión, déficit neurológico o insuficiencia aórtica.",
      "Angiotomografía (o ecocardiograma transesofágico si está inestable).",
      "Control de frecuencia y presión con betabloqueantes, analgesia.",
      "Tipo A: cirugía urgente. Tipo B: tratamiento médico o endovascular si es complicada.",
      "Nunca antitrombóticos ni trombólisis.",
    ],
    sources: ["Sociedad Argentina de Cardiología — Consenso de patología de la aorta.", "Guías ESC de enfermedades de la aorta."],
    pearls: ["Dolor desgarrante + diferencia de presión entre brazos = disección.", "Tipo A = quirófano.", "Primero betabloqueante, después vasodilatador."],
    pitfalls: ["Trombolizar como si fuera un infarto.", "No tomar la presión en ambos brazos."],
    tribunal: [
      qa("¿Cómo se clasifica la disección aórtica?", "Stanford: tipo A si compromete la aorta ascendente (quirúrgica) y tipo B si no (tratamiento médico o endovascular). DeBakey: I (ascendente y descendente), II (solo ascendente), III (solo descendente)."),
      qa("¿Qué complicaciones tiene la disección tipo A?", "Taponamiento cardíaco, insuficiencia aórtica aguda, infarto por compromiso coronario (más la derecha), ACV, isquemia mesentérica, renal o de miembros, paraplejía y rotura."),
      qa("¿Cuál es el diferencial del dolor torácico grave que hay que pensar siempre?", "Síndrome coronario agudo, disección aórtica, tromboembolismo pulmonar, neumotórax a tensión, taponamiento cardíaco y rotura esofágica."),
    ],
  },
};
