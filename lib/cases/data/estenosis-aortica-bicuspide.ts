import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const estenosisAorticaBicuspide: ClinicalCase = {
  id: "estenosis-aortica-bicuspide",
  level: 3,
  area: "Cardiovascular",
  setting: "Guardia",
  patient: { age: 47, ageUnit: "años", sex: "M", context: "Le dijeron que tenía un soplo de chico. Juega al fútbol los sábados." },
  frequency: "frecuente",
  intro: "“Jugando al fútbol me desmayé de golpe. Hace meses me falta el aire y me aprieta el pecho al correr.”",
  vitals: { TA: "112/88 mmHg", FC: "78 lpm", FR: "18 rpm", "T°": "36,4 °C", "SatO₂": "97 %" },
  anamnesis: [
    act("sincope", "¿Cómo fue el desmayo?", "clave", "“Corriendo, sin aviso.”", "Síncope de esfuerzo."),
    act("angina", "¿Dolor de pecho al esfuerzo?", "clave", "“Opresión al correr.”", "Angina."),
    act("soplo", "¿Le dijeron que tenía un soplo?", "clave", "“Desde chico.”", "Válvula bicúspide."),
    act("disnea", "¿Falta de aire?", "util", "“Al subir escaleras.”", "Insuficiencia cardíaca."),
    act("familia", "¿Familia con problemas de válvulas o aorta?", "util", "“No sé.”", "Herencia."),
    act("equipo", "¿En qué posición juega?", "neutro", "“Arquero.”", "No orienta."),
  ],
  exam: [
    act("soplo-ex", "Auscultación", "clave", "Soplo sistólico eyectivo rudo en foco aórtico irradiado a carótidas, segundo ruido disminuido.", "Estenosis grave."),
    act("pulso", "Pulso carotídeo", "clave", "Parvus et tardus.", "Estenosis significativa."),
    act("congestion", "Congestión", "util", "Rales bibasales leves.", "Repercusión."),
  ],
  studies: [
    study("Imágenes", "eco", "Ecocardiograma", "clave", "Válvula aórtica bicúspide calcificada, área 0,7 cm², gradiente medio 52 mmHg; aorta ascendente de 46 mm.", "Estenosis grave y aortopatía."),
    study("Electrofisiología", "ecg", "ECG", "clave", "Hipertrofia ventricular izquierda con sobrecarga.", "Repercusión."),
    study("Imágenes", "cine-coronaria", "Coronariografía prequirúrgica", "util", "Coronarias sin lesiones.", "Planificación."),
    study("Otros", "ergometria", "Prueba de esfuerzo", "riesgoso", "No se realizó.", "Contraindicada en estenosis grave sintomática."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("ea-bicuspide", "Estenosis aórtica grave sintomática sobre válvula bicúspide, con dilatación de aorta ascendente", true, "Síncope y angina de esfuerzo, soplo rudo, pulso parvus et tardus y área menor de 1 cm²."),
      dx("mch", "Miocardiopatía hipertrófica obstructiva", false, "Válvula bicúspide calcificada."),
      dx("coronaria", "Enfermedad coronaria", false, "Coronarias normales."),
      dx("vasovagal", "Síncope vasovagal", false, "Es de esfuerzo con valvulopatía grave."),
      dx("ea-senil", "Estenosis aórtica degenerativa del anciano", false, "Joven con válvula bicúspide."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("reemplazo", "Reemplazo valvular quirúrgico con evaluación de aorta ascendente", "clave", "Sintomática grave."),
      mg("reposo-deporte", "Suspender deporte competitivo hasta la cirugía", "clave", "Riesgo de muerte súbita."),
      mg("familia", "Ecocardiograma a familiares de primer grado", "util", "Bicúspide familiar."),
      mg("endocarditis", "Higiene dental", "util", "Prevención."),
      mg("nitratos", "Nitratos para la angina", "riesgoso", "Hipotensión grave."),
      mg("vasodilatadores", "Vasodilatadores potentes", "riesgoso", "Síncope."),
    ],
  },
  debrief: {
    diagnosis: "Estenosis aórtica grave sintomática sobre válvula bicúspide con dilatación de aorta ascendente, en varón de 47 años.",
    pathologies: [
      { name: "Estenosis aórtica grave", role: "principal", why: "Obstrucción al tracto de salida." },
      { name: "Válvula bicúspide y aortopatía", role: "asociada", why: "Causa y complicación." },
      { name: "Miocardiopatía hipertrófica", role: "diferencial", why: "Otro soplo eyectivo con síncope." },
    ],
    reasoning: [
      "Causa: válvula bicúspide congénita que se calcifica antes.",
      "Mecanismo: obstrucción fija con hipertrofia ventricular.",
      "Consecuencia: angina, síncope y falla cardíaca.",
    ],
    epidemiology:
      "La válvula bicúspide es la cardiopatía congénita más frecuente (1 a 2 %) y causa estenosis aórtica a edades más jóvenes. Se asocia a dilatación aórtica y coartación. Con síntomas, la mortalidad sin cirugía es alta.",
    management: [
      "Eco.",
      "No ergometría.",
      "Cirugía.",
      "Familia.",
    ],
    sources: ["Sociedad Argentina de Cardiología — Consenso de valvulopatías.", "ESC/EACTS — Guidelines for the Management of Valvular Heart Disease."],
    pearls: ["Síncope de esfuerzo con soplo.", "Parvus et tardus.", "Bicúspide: mirá la aorta."],
    pitfalls: ["Ergometría.", "Nitratos."],
    tribunal: [
      qa("¿Qué síntomas tiene la estenosis aórtica grave?", "Angina, síncope de esfuerzo y disnea."),
      qa("¿Qué define estenosis grave?", "Área menor de 1 cm², gradiente medio mayor de 40 mmHg o velocidad mayor de 4 m/s."),
      qa("¿Con qué se asocia la bicúspide?", "Dilatación de aorta ascendente, coartación y síndrome de Turner."),
    ],
  },
};
