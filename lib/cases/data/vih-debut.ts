import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const vihDebut: ClinicalCase = {
  id: "vih-diagnostico-avanzado",
  level: 3,
  area: "Infectología",
  setting: "Consultorio",
  patient: { age: 29, ageUnit: "años", sex: "M", context: "Trabaja en una fábrica." },
  frequency: "frecuente",
  intro: "“Bajé ocho kilos en tres meses, tengo diarrea seguido, fiebre a la noche y la boca blanca. Me cuesta tragar.”",
  vitals: { TA: "108/66 mmHg", FC: "96 lpm", "T°": "37,9 °C", Peso: "58 kg" },
  anamnesis: [
    act("test", "¿Alguna vez se hizo el test de VIH?", "clave", "“Nunca.”", "Ante candidiasis oral y pérdida de peso en un adulto joven, el test de VIH es obligatorio."),
    act("riesgo", "¿Usa preservativo? ¿Tuvo relaciones sin protección o compartió jeringas?", "clave", "“No siempre uso preservativo.”", "La vía sexual es la principal forma de transmisión en la Argentina."),
    act("respiratorio", "¿Tiene tos o falta de aire?", "clave", "“Tos seca y me agito al subir escaleras.”", "Con inmunosupresión avanzada, pensar en neumonía por Pneumocystis o tuberculosis."),
    act("neuro", "¿Tiene dolor de cabeza, fiebre alta, convulsiones o debilidad?", "util", "“Dolor de cabeza a veces.”", "Orienta a buscar criptococosis o toxoplasmosis."),
    act("its", "¿Tuvo otras ITS?", "util", "“Una sífilis hace unos años.”", "Las ITS aumentan el riesgo de VIH."),
    act("barrio", "¿Dónde vive?", "neutro", "“En el sur de la ciudad.”", "No orienta."),
  ],
  exam: [
    act("boca", "Boca", "clave", "Placas blanquecinas que se desprenden en lengua y paladar; leucoplasia vellosa en bordes laterales de la lengua.", "Candidiasis oral y leucoplasia vellosa: marcadores de inmunosupresión."),
    act("ganglios", "Ganglios", "util", "Adenopatías generalizadas pequeñas.", "Frecuentes en la infección por VIH."),
    act("pulmonar", "Auscultación pulmonar y saturación con esfuerzo", "clave", "Pulmones limpios; desatura de 95 a 89 % al caminar.", "La desaturación con esfuerzo es muy sugestiva de neumonía por Pneumocystis."),
    act("piel", "Piel", "util", "Dermatitis seborreica facial.", "Frecuente en la inmunosupresión."),
  ],
  studies: [
    study("Laboratorio", "test", "Test de VIH (rápido o ELISA de cuarta generación) con confirmación", "clave", "Reactivo, confirmado.", "Diagnostica la infección."),
    study("Laboratorio", "cd4", "Recuento de CD4 y carga viral", "clave", "CD4 85 células/mm³; carga viral 380.000 copias/ml.", "CD4 < 200 = sida: define riesgo de infecciones oportunistas y profilaxis."),
    study("Imágenes", "rx", "Radiografía de tórax", "clave", "Infiltrado intersticial bilateral perihiliar.", "Compatible con neumonía por Pneumocystis."),
    study("Microbiología", "esputo", "Esputo inducido para Pneumocystis y baciloscopías", "util", "Pneumocystis jirovecii positivo; baciloscopía negativa.", "Confirma la neumonía y descarta tuberculosis."),
    study("Laboratorio", "criptococo", "Antígeno de criptococo en sangre", "util", "Negativo.", "Con CD4 < 100 se busca la criptococosis antes de iniciar el tratamiento."),
    study("Laboratorio", "western", "Esperar un Western blot para empezar cualquier tratamiento", "innecesario", "No se realizó.", "Los algoritmos actuales confirman con otras pruebas y no demoran la atención."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("sida", "Infección por VIH en estadio sida (CD4 85) con neumonía por Pneumocystis y candidiasis orofaríngea", true, "Test confirmado, CD4 < 200, infecciones oportunistas definitorias."),
      dx("tbc", "Tuberculosis pulmonar aislada", false, "Siempre se busca, pero la baciloscopía es negativa y se confirmó Pneumocystis."),
      dx("agudo", "Síndrome retroviral agudo", false, "Es la infección reciente con fiebre, faringitis y exantema; acá la inmunosupresión es avanzada."),
      dx("linfoma", "Linfoma", false, "Puede dar fiebre y pérdida de peso, pero no explica la candidiasis ni el test reactivo."),
      dx("celiaquia", "Enfermedad celíaca", false, "Explicaría diarrea y pérdida de peso, no la candidiasis ni la neumonía."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("pcp", "Tratar la neumonía por Pneumocystis con trimetoprima-sulfametoxazol en dosis altas (con corticoides si la pO₂ es baja)", "clave", "Tratamiento de elección; los corticoides reducen la mortalidad en las formas moderadas a graves."),
      mg("tarv", "Iniciar tratamiento antirretroviral dentro de las 2 semanas", "clave", "El inicio temprano reduce la mortalidad (salvo en meningitis criptocócica o tuberculosa, donde se difiere)."),
      mg("confidencial", "Comunicar el diagnóstico en forma confidencial, con contención, y ofrecer testeo a sus parejas", "clave", "La confidencialidad está protegida por la Ley 27.675; el testeo de parejas corta la transmisión."),
      mg("fluconazol", "Fluconazol para la candidiasis", "util", "Trata la candidiasis orofaríngea y esofágica."),
      mg("notificar", "Notificar al SNVS", "util", "La infección por VIH es de notificación obligatoria, con resguardo de la identidad."),
      mg("esperar", "Esperar a que los CD4 bajen más para empezar los antirretrovirales", "riesgoso", "El tratamiento está indicado para todas las personas con VIH, cuanto antes."),
      mg("empleador", "Informar al empleador por seguridad", "riesgoso", "Viola la confidencialidad y la ley; el VIH no se transmite en el trabajo cotidiano."),
    ],
  },
  debrief: {
    diagnosis: "Infección por VIH en estadio sida (CD4 85), diagnóstico tardío, con neumonía por Pneumocystis jirovecii y candidiasis orofaríngea.",
    pathologies: [
      { name: "Infección por VIH (sida)", role: "principal", why: "Test confirmado con CD4 < 200." },
      { name: "Neumonía por Pneumocystis", role: "asociada", why: "Infección oportunista definitoria." },
      { name: "Candidiasis orofaríngea", role: "asociada", why: "Marcador de inmunosupresión." },
      { name: "Tuberculosis", role: "diferencial", why: "Siempre a buscar en personas con VIH." },
      { name: "Linfoma", role: "diferencial", why: "Síndrome constitucional." },
    ],
    reasoning: [
      "Causa: el VIH se transmite por vía sexual, sanguínea y vertical.",
      "Mecanismo: infecta los linfocitos CD4 y los destruye progresivamente durante años, sin síntomas.",
      "Consecuencia: cuando los CD4 caen por debajo de 200, aparecen infecciones oportunistas (Pneumocystis, candidiasis, toxoplasmosis, criptococosis, tuberculosis) y algunos cánceres.",
      "El tratamiento antirretroviral suprime la replicación, recupera los CD4 y, con carga viral indetectable, el virus no se transmite por vía sexual (indetectable = intransmisible).",
    ],
    epidemiology:
      "En la Argentina viven cerca de 140.000 personas con VIH y alrededor del 13 % no lo sabe. Cerca de un tercio de los diagnósticos son tardíos (con CD4 < 200), más frecuentes en varones heterosexuales. Siete de cada diez diagnósticos nuevos son en varones, y la mayoría se infectó por relaciones sexuales sin protección. Los tratamientos son gratuitos.",
    management: [
      "Ofrecer el test a toda persona sexualmente activa y siempre ante síntomas sugestivos.",
      "Con diagnóstico: CD4, carga viral, tamizaje de coinfecciones (tuberculosis, sífilis, hepatitis, toxoplasma, criptococo).",
      "Tratar las infecciones oportunistas y dar profilaxis (TMS si CD4 < 200).",
      "Iniciar antirretrovirales lo antes posible (en días o semanas según la infección oportunista).",
      "Confidencialidad, testeo de parejas, prevención combinada (preservativo, PrEP), notificación.",
    ],
    sources: [
      "Ministerio de Salud de la Nación — Recomendaciones para el inicio del tratamiento antirretroviral en adultos y Boletín sobre VIH.",
      "Ley 27.675 de Respuesta Integral al VIH, Hepatitis Virales, otras ITS y Tuberculosis.",
      "Sociedad Argentina de Infectología — Consenso de tratamiento antirretroviral.",
    ],
    pearls: ["Candidiasis oral en un adulto: test de VIH.", "Desatura al caminar con radiografía casi normal: Pneumocystis.", "Indetectable = intransmisible."],
    pitfalls: ["No ofrecer el test.", "Demorar los antirretrovirales.", "Romper la confidencialidad."],
  },
};
