import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const vihEmbarazo: ClinicalCase = {
  id: "vih-embarazo",
  level: 2,
  area: "Infectología",
  setting: "Consultorio",
  patient: { age: 24, ageUnit: "años", sex: "F", context: "Embarazo de 14 semanas, primer control. Pareja actual hace un año." },
  frequency: "poco-frecuente",
  intro: "“Me hicieron los análisis del embarazo y me dijeron que salió positivo el VIH. Estoy muy asustada por el bebé.”",
  vitals: { TA: "110/70 mmHg", FC: "80 lpm", "T°": "36,5 °C" },
  anamnesis: [
    act("contencion", "Comunicar con privacidad, contener y explicar que el tratamiento evita casi siempre la transmisión", "clave", "Llora; luego pregunta qué tiene que hacer.", "La comunicación adecuada mejora la adherencia."),
    act("sintomas", "¿Tuviste fiebre, pérdida de peso, diarrea o infecciones?", "util", "“No.”", "Asintomática."),
    act("pareja", "¿Tu pareja se hizo el test?", "clave", "“No, no sé cómo decirle.”", "La pareja debe testearse; acompañar la comunicación."),
    act("otras-its", "¿Te hicieron sífilis y hepatitis B?", "util", "“Sí, negativas.”", "Coinfecciones."),
    act("violencia", "¿Te sentís segura en tu casa?", "clave", "“Sí.”", "El diagnóstico puede exponer a violencia; se pregunta."),
    act("trabajo", "¿Trabajás?", "neutro", "“En un supermercado.”", "No orienta."),
  ],
  exam: [
    act("general", "Examen general y ganglios", "clave", "Adenopatías pequeñas generalizadas, sin candidiasis oral.", "Infección crónica sin signos de inmunosupresión avanzada."),
    act("obstetrico", "Altura uterina y latidos fetales", "clave", "Acordes, 152 lpm.", "Embarazo en curso normal."),
    act("piel", "Piel y mucosas", "util", "Normales.", "Sin enfermedades oportunistas."),
  ],
  studies: [
    study("Laboratorio", "confirmacion", "Confirmación (segunda prueba) y carga viral", "clave", "Confirmado; carga viral 42.000 copias/ml.", "El diagnóstico se confirma con otra prueba; la carga viral guía el seguimiento."),
    study("Laboratorio", "cd4", "Recuento de CD4", "clave", "520 células/mm³.", "Sin inmunosupresión grave."),
    study("Laboratorio", "lab", "Hemograma, función renal y hepática, serologías (toxoplasmosis, CMV, hepatitis C)", "util", "Normales.", "Línea de base."),
    study("Laboratorio", "esperar-cd4", "Esperar a que bajen los CD4 para empezar el tratamiento", "riesgoso", "No se realizó.", "Toda embarazada con VIH debe iniciar tratamiento lo antes posible."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("vih", "Infección por VIH en embarazo de 14 semanas, sin inmunosupresión avanzada", true, "Pruebas confirmadas con carga viral detectable y CD4 de 520, asintomática."),
      dx("falso", "Falso positivo del embarazo", false, "Se confirmó con una segunda prueba y carga viral."),
      dx("sida", "Sida", false, "CD4 mayor de 200 y sin enfermedades marcadoras."),
      dx("agudo", "Infección aguda por VIH", false, "Sin síndrome retroviral agudo; carga viral compatible con infección crónica."),
      dx("hepatitis", "Hepatitis B", false, "Serología negativa."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("tarv", "Tratamiento antirretroviral de inmediato (esquema preferido con dolutegravir) y seguimiento conjunto con infectología", "clave", "Con carga viral indetectable al parto la transmisión es menor al 1 %."),
      mg("parto", "Planificar el parto: vaginal si la carga es indetectable al final; cesárea programada si es alta, con AZT EV en el parto", "clave", "Reduce la transmisión."),
      mg("rn", "Profilaxis antirretroviral al recién nacido y no amamantar (inhibir la lactancia y dar leche de fórmula)", "clave", "En Argentina se recomienda no amamantar con VIH."),
      mg("pareja", "Ofrecer test a la pareja y acompañar la comunicación", "util", "Prevención."),
      mg("confidencialidad", "Garantizar confidencialidad (Ley 27.675)", "util", "Derecho de la persona."),
      mg("interrupcion", "Indicar que el embarazo no puede continuar", "riesgoso", "Falso: con tratamiento el riesgo de transmisión es muy bajo."),
    ],
  },
  debrief: {
    diagnosis: "Infección por VIH diagnosticada en el primer control prenatal, embarazo de 14 semanas, CD4 de 520 y carga viral de 42.000, sin inmunosupresión avanzada.",
    pathologies: [
      { name: "Infección por VIH", role: "principal", why: "Diagnóstico confirmado." },
      { name: "Riesgo de transmisión vertical", role: "asociada", why: "Prevenible." },
      { name: "Falso positivo, sida, infección aguda", role: "diferencial", why: "Se descartan." },
    ],
    reasoning: [
      "Causa: transmisión sexual del VIH.",
      "Mecanismo: el virus infecta linfocitos CD4 y se replica; la carga viral materna determina el riesgo de transmisión al bebé.",
      "Consecuencia: sin tratamiento, transmisión vertical de hasta 25–40 % (embarazo, parto y lactancia); con tratamiento, menos de 1 %.",
    ],
    epidemiology:
      "En Argentina viven alrededor de 140.000 personas con VIH y cada año se diagnostican miles de casos nuevos, cerca de un tercio en mujeres, muchas en el control prenatal. La transmisión vertical bajó a alrededor del 4 %, pero persiste por diagnósticos tardíos y controles insuficientes.",
    management: [
      "Test de VIH con consentimiento en el primer control y en el tercer trimestre.",
      "Tratamiento antirretroviral inmediato.",
      "Planificación del parto según carga viral.",
      "Profilaxis al recién nacido y suspensión de la lactancia.",
    ],
    sources: ["Ministerio de Salud de la Nación — Recomendaciones para la prevención de la transmisión vertical del VIH.", "Ley 27.675 de respuesta integral al VIH, hepatitis virales, TBC e ITS."],
    pearls: ["Tratamiento antirretroviral ya.", "Carga indetectable = transmisión menor de 1 %.", "En Argentina, no amamantar con VIH."],
    pitfalls: ["Esperar los CD4.", "Decirle que no puede seguir el embarazo."],
    tribunal: [
      qa("¿Qué es indetectable = intransmisible?", "Una persona con VIH en tratamiento con carga viral indetectable sostenida no transmite el virus por vía sexual; en el embarazo, el riesgo vertical se reduce al mínimo."),
      qa("¿Cómo se diagnostica el VIH en el recién nacido?", "Con pruebas virológicas (PCR de ADN proviral o carga viral) en los primeros días, al mes y a los 3–4 meses; la serología no sirve hasta los 18 meses por los anticuerpos maternos."),
      qa("¿Qué dice la Ley 27.675?", "Garantiza el acceso gratuito a la prevención, el diagnóstico y el tratamiento del VIH, hepatitis virales, TBC e ITS, la confidencialidad y la prohibición de discriminación y de testeos sin consentimiento."),
    ],
  },
};
