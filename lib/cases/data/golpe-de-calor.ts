import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const golpeDeCalor: ClinicalCase = {
  id: "golpe-de-calor-esfuerzo",
  level: 3,
  area: "Toxicología",
  setting: "Guardia",
  patient: { age: 23, ageUnit: "años", sex: "M", context: "Corría una carrera de 21 km un mediodía de enero con 36 °C." },
  frequency: "poco-frecuente",
  intro: "“En el kilómetro 18 empezó a tambalearse, decía cosas raras y se desplomó. Está muy caliente y no responde bien.” (relata un compañero de equipo)",
  vitals: { TA: "92/50 mmHg", FC: "158 lpm", FR: "32 rpm", "T°": "41,4 °C (rectal)", "SatO₂": "95 %", Glucemia: "88 mg/dl", Glasgow: "10/15" },
  anamnesis: [
    act("contexto", "¿Qué estaba haciendo y cuánto hacía que corría?", "clave", "“Corría hace casi dos horas al rayo del sol.”", "Ejercicio intenso con calor: golpe de calor por esfuerzo."),
    act("sustancias", "¿Tomó estimulantes, suplementos, alcohol o medicamentos?", "clave", "“Un pre-entreno con cafeína y algo más.”", "Estimulantes y algunos fármacos aumentan el riesgo."),
    act("hidratacion", "¿Tomó agua? ¿Estaba enfermo los días previos?", "util", "“Poco. Tuvo diarrea la semana pasada.”", "Deshidratación previa: factor de riesgo."),
    act("convulsion", "¿Convulsionó?", "util", "“No vimos.”", "Las convulsiones son frecuentes en el golpe de calor."),
    act("antecedentes", "¿Tuvo problemas con la anestesia o le pasó antes?", "util", "“No.”", "Antecedente de hipertermia maligna como diferencial."),
    act("tiempo", "¿Qué tiempo hizo en carreras anteriores?", "neutro", "“Dos horas.”", "No orienta."),
  ],
  exam: [
    act("temperatura", "Temperatura central (rectal)", "clave", "41,4 °C.", "Más de 40 °C con alteración neurológica: golpe de calor."),
    act("neuro", "Examen neurológico", "clave", "Confuso, desorientado, ataxia, sin foco.", "Disfunción del sistema nervioso central."),
    act("piel", "Piel", "util", "Caliente, todavía sudorosa.", "En el golpe de calor por esfuerzo puede haber sudor (no descarta)."),
    act("meningeo", "Signos meníngeos", "util", "Sin rigidez de nuca.", "Descarta meningitis clínicamente."),
  ],
  studies: [
    study("Laboratorio", "lab", "Ionograma, función renal, CPK, hepatograma, coagulograma, glucemia, gases, lactato", "clave", "CPK 18.000, creatinina 2,2, TGO 480, plaquetas 98.000, K 5,4, lactato 5.", "Rabdomiólisis, insuficiencia renal, daño hepático y coagulopatía."),
    study("Laboratorio", "orina", "Orina completa", "util", "Orina oscura, hemo positiva sin glóbulos rojos.", "Mioglobinuria."),
    study("Electrofisiología", "ecg", "Electrocardiograma", "util", "Taquicardia sinusal, sin arritmias.", "Monitoreo por la hiperpotasemia."),
    study("Imágenes", "tc", "Tomografía antes de enfriar", "riesgoso", "No se realizó.", "El enfriamiento inmediato es lo que salva: no se demora."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("golpe", "Golpe de calor por esfuerzo con rabdomiólisis, insuficiencia renal aguda, daño hepático y coagulopatía", true, "Temperatura central de 41,4 °C con alteración neurológica durante ejercicio intenso en calor, con CPK muy alta, falla renal y hepática."),
      dx("agotamiento", "Agotamiento por calor", false, "En el agotamiento la temperatura es menor de 40 °C y no hay disfunción neurológica."),
      dx("meningitis", "Meningitis", false, "Contexto de ejercicio en calor, sin rigidez; si hay dudas, se estudia después de enfriar."),
      dx("hiponatremia", "Hiponatremia asociada al ejercicio", false, "Tomó poca agua y el sodio no está bajo; no explica la hipertermia."),
      dx("hipoglucemia", "Hipoglucemia", false, "La glucemia es normal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("enfriar", "Enfriamiento inmediato por inmersión en agua fría (o agua con hielo) hasta 38,5–39 °C", "clave", "Es la medida que más reduce la mortalidad: “enfriar primero, trasladar después”."),
      mg("fluidos", "Fluidos EV para la volemia y la rabdomiólisis, con control de diuresis", "clave", "Previene la insuficiencia renal por mioglobina."),
      mg("monitoreo", "Monitoreo de temperatura, potasio, coagulación y glucemia en terapia intensiva", "clave", "Falla multiorgánica posible."),
      mg("benzo", "Benzodiacepinas si convulsiona o tiene escalofríos que generan calor", "util", "Controla convulsiones y temblor."),
      mg("antitermicos", "Paracetamol o dipirona para bajar la fiebre", "riesgoso", "No sirven (no es fiebre por el termostato hipotalámico) y pueden dañar el hígado."),
      mg("dantroleno", "Dantroleno de rutina", "innecesario", "No está indicado en el golpe de calor."),
    ],
  },
  debrief: {
    diagnosis: "Golpe de calor por esfuerzo (temperatura central de 41,4 °C) con encefalopatía, rabdomiólisis, insuficiencia renal aguda, daño hepático y coagulopatía, en corredor de 23 años con uso de estimulantes.",
    pathologies: [
      { name: "Golpe de calor por esfuerzo", role: "principal", why: "Hipertermia mayor de 40 °C con disfunción neurológica." },
      { name: "Rabdomiólisis e insuficiencia renal aguda", role: "asociada", why: "Complicaciones del daño muscular." },
      { name: "Agotamiento por calor, meningitis, hiponatremia", role: "diferencial", why: "Otras causas de colapso en corredores." },
    ],
    reasoning: [
      "Causa: producción de calor por el ejercicio intenso mayor que la capacidad de disiparlo (calor ambiental, humedad, deshidratación, estimulantes).",
      "Mecanismo: la temperatura central supera los 40 °C, se desnaturalizan proteínas, se daña el endotelio y se activa una respuesta inflamatoria similar a la sepsis.",
      "Consecuencia: encefalopatía, rabdomiólisis, insuficiencia renal y hepática, coagulación intravascular diseminada y muerte; el pronóstico depende del tiempo con hipertermia.",
    ],
    epidemiology:
      "El golpe de calor por esfuerzo afecta a jóvenes sanos que hacen ejercicio intenso (atletas, militares, trabajadores) en ambientes calurosos; el clásico, a adultos mayores y enfermos crónicos durante olas de calor. Con el cambio climático, las olas de calor en Argentina son más frecuentes y aumentan estas consultas.",
    management: [
      "Medir temperatura central ante colapso en calor.",
      "Enfriar de inmediato (inmersión en agua fría) antes y durante el traslado.",
      "Sostén de órganos: fluidos, control de electrolitos, coagulación y función renal.",
      "Prevención: hidratación, aclimatación, evitar horarios de más calor y estimulantes.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de atención de efectos del calor en la salud (golpe de calor).", "Sistema de Alerta Temprana por Olas de Calor (SMN-Ministerio de Salud)."],
    pearls: ["Más de 40 °C + confusión = golpe de calor.", "Enfriar primero, trasladar después.", "Los antitérmicos no sirven."],
    pitfalls: ["Medir la temperatura axilar.", "Demorar el enfriamiento por estudios."],
    tribunal: [
      qa("¿Qué diferencia el golpe de calor del agotamiento por calor?", "El agotamiento tiene temperatura menor de 40 °C, cansancio, mareos, náuseas y sudoración, sin alteración neurológica, y mejora con reposo e hidratación; el golpe de calor tiene más de 40 °C y disfunción del sistema nervioso central, y es una emergencia."),
      qa("¿Qué es la rabdomiólisis y cómo se trata?", "La destrucción del músculo esquelético con liberación de mioglobina, CPK y potasio; puede causar insuficiencia renal aguda e hiperpotasemia. Se trata con hidratación abundante para mantener una diuresis alta y corrección de electrolitos."),
      qa("¿Qué diferencia hay entre fiebre e hipertermia?", "En la fiebre el hipotálamo sube el punto de regulación (por pirógenos) y responde a antitérmicos; en la hipertermia el punto no cambia, pero la producción de calor supera la eliminación (golpe de calor, fármacos), y no responde a antitérmicos sino a enfriamiento físico."),
    ],
  },
};
