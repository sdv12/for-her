import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const nefroticoAdulto: ClinicalCase = {
  id: "sindrome-nefrotico-glomerulopatia-membranosa",
  level: 3,
  area: "Nefrourología",
  setting: "Consultorio",
  patient: { age: 45, ageUnit: "años", sex: "F", context: "Sin diabetes. Toma ibuprofeno seguido por lumbalgia. Sin antecedentes renales." },
  frequency: "frecuente",
  intro: "“Hace dos meses se me hincharon las piernas y la cara a la mañana. Orino con espuma y subí 8 kilos.”",
  vitals: { TA: "132/84 mmHg", FC: "78 lpm", "T°": "36,4 °C", "SatO₂": "98 %", Peso: "78 kg", Glucemia: "92 mg/dl" },
  anamnesis: [
    act("orina", "¿Espuma? ¿Sangre o menos cantidad?", "clave", "“Con espuma, sin sangre.”", "Proteinuria."),
    act("causas", "¿Hepatitis, lupus, cáncer, AINE, oro?", "clave", "“Solo ibuprofeno.”", "Causas secundarias."),
    act("trombosis", "¿Dolor de pierna, falta de aire o lumbar?", "clave", "“Algo de lumbar nuevo.”", "Trombosis de vena renal."),
    act("cancer", "¿Pérdida de peso? ¿Mamografía o colon?", "util", "“Al día.”", "Paraneoplásica."),
    act("infecciones", "¿Infecciones repetidas?", "util", "“No.”", "Pierde inmunoglobulinas."),
    act("trabajo", "¿Qué hacés?", "neutro", "“Soy peluquera.”", "No orienta."),
  ],
  exam: [
    act("edema", "Edemas", "clave", "Edema palpebral y de piernas, Godet positivo.", "Generalizado."),
    act("derrame", "Abdomen y pulmón", "clave", "Ascitis y derrame leves.", "Anasarca."),
    act("signos", "Piel, articulaciones", "util", "Sin eritema ni artritis; uñas blanquecinas.", "Busca causa."),
  ],
  studies: [
    study("Laboratorio", "orina", "Proteinuria de 24 horas y sedimento", "clave", "6,8 g/24 h; cuerpos ovales, sin hematíes.", "Nefrótico."),
    study("Laboratorio", "lab", "Albúmina, colesterol, creatinina", "clave", "Albúmina 2,1; colesterol 340; creatinina 0,9.", "Tétrada."),
    study("Laboratorio", "antipla2r", "Anti-PLA2R, hepatitis, VIH, ANA, complemento", "clave", "Anti-PLA2R positivo, resto negativos.", "Membranosa primaria."),
    study("Imágenes", "eco", "Ecografía renal con Doppler", "util", "Riñones normales, sin trombosis.", "Otras causas."),
    study("Otros", "biopsia-si", "Biopsia renal", "util", "Engrosamiento de membrana, depósitos subepiteliales.", "Confirma."),
    study("Imágenes", "tc-oncologico", "Barrido completo con PET por rutina", "innecesario", "No se realizó.", "Tamizaje acorde a la edad, no extenso."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("membranosa", "Síndrome nefrótico por glomerulopatía membranosa primaria anti-PLA2R", true, "Tétrada nefrótica, anti-PLA2R positivo y biopsia."),
      dx("minimos", "Cambios mínimos", false, "Más en niños, con biopsia distinta."),
      dx("hialinosis", "Esclerosis focal", false, "La biopsia no coincide."),
      dx("lupus", "Nefritis lúpica", false, "ANA y complemento normales."),
      dx("amiloidosis", "Amiloidosis", false, "Sin depósitos."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("conservador", "IECA o ARA II, dieta sin sal y diuréticos", "clave", "Reduce proteinuria y edema."),
      mg("estatina", "Estatinas", "clave", "Por hiperlipemia persistente."),
      mg("inmuno", "Rituximab según riesgo", "clave", "Formas de riesgo."),
      mg("anticoag", "Anticoagular si albúmina muy baja y riesgo alto", "util", "Trombosis."),
      mg("aines", "Seguir con AINE", "riesgoso", "Daña el riñón."),
      mg("hiperproteica", "Dieta hiperproteica extrema", "innecesario", "Aumenta la proteinuria."),
    ],
  },
  debrief: {
    diagnosis: "Síndrome nefrótico por glomerulopatía membranosa primaria anti-PLA2R, en mujer de 45 años.",
    pathologies: [
      { name: "Glomerulopatía membranosa", role: "principal", why: "Depósitos inmunes." },
      { name: "Riesgo de trombosis", role: "asociada", why: "Pierde antitrombina." },
      { name: "Cambios mínimos, focal, lupus", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: autoanticuerpos contra PLA2R en el podocito.",
      "Mecanismo: el daño de la barrera deja pasar albúmina.",
      "Consecuencia: edema, hiperlipemia, trombosis.",
    ],
    epidemiology:
      "Es una de las causas más frecuentes de nefrótico en adultos no diabéticos, y cerca del 70 % de las primarias tiene anti-PLA2R. Un tercio remite espontáneamente. Las formas secundarias se asocian a hepatitis, lupus, cáncer y fármacos.",
    management: [
      "Definir síndrome nefrótico.",
      "Buscar causa.",
      "Tratamiento general.",
      "Inmunosupresión según riesgo.",
    ],
    sources: ["Sociedad Argentina de Nefrología — Recomendaciones.", "KDIGO — Guía de enfermedades glomerulares."],
    pearls: ["Espuma con edema: proteinuria.", "Anti-PLA2R: membranosa.", "Trombosis de la vena renal."],
    pitfalls: ["No buscar causa secundaria.", "Omitir el AINE."],
    tribunal: [
      qa("¿Cuál es la tétrada del nefrótico?", "Proteinuria mayor de 3,5 g, hipoalbuminemia, edema e hiperlipemia."),
      qa("¿Qué complicaciones da?", "Trombosis, infecciones, hiperlipemia e insuficiencia renal."),
      qa("¿Cómo diferencias del nefrítico?", "Nefrítico: hematuria, HTA, oliguria y poca proteinuria."),
    ],
  },
};
