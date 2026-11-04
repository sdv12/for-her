import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const loxoscelismo: ClinicalCase = {
  id: "loxoscelismo-arana-violinista",
  level: 3,
  area: "Toxicología",
  setting: "Guardia",
  patient: { age: 39, ageUnit: "años", sex: "F", context: "Enero. Ordenaba ropa guardada en un placard. Vive en Córdoba." },
  frequency: "poco-frecuente",
  intro: "“Ayer sentí un ardor en el muslo al ponerme un pantalón que estaba guardado. Hoy tengo una mancha violeta que duele mucho y la orina está oscura.”",
  vitals: { TA: "112/68 mmHg", FC: "108 lpm", FR: "20 rpm", "T°": "38,2 °C" },
  anamnesis: [
    act("arana", "¿Viste algún insecto o araña? ¿Dónde estaba la ropa?", "clave", "“Una araña marrón chiquita con patas largas, en el pantalón guardado.”", "Loxosceles (araña violinista): vive en lugares oscuros dentro de las casas."),
    act("evolucion", "¿Cómo evolucionó la lesión?", "clave", "“Empezó como un ardor, después se puso roja y ahora violeta.”", "Evolución típica a placa livedoide."),
    act("orina", "¿Cómo está la orina?", "clave", "“Oscura, como té.”", "Hemólisis: loxoscelismo cutáneo-visceral (sistémico)."),
    act("sintomas", "¿Fiebre, malestar, ictericia?", "util", "“Fiebre y estoy amarilla.”", "Compromiso sistémico."),
    act("vacuna", "¿Vacuna antitetánica?", "util", "“Al día.”", "Profilaxis."),
    act("barrio", "¿Dónde vivís?", "neutro", "“En barrio Alberdi.”", "No orienta."),
  ],
  exam: [
    act("lesion", "Lesión en el muslo", "clave", "Placa livedoide (violácea con zonas pálidas y halo eritematoso), muy dolorosa, con ampolla central.", "Placa marmórea típica del loxoscelismo cutáneo."),
    act("ictericia", "Piel y escleras", "clave", "Ictericia leve.", "Hemólisis."),
    act("perfusion", "Perfusión y diuresis", "util", "Diuresis conservada.", "Vigilar insuficiencia renal."),
  ],
  studies: [
    study("Laboratorio", "lab", "Hemograma, LDH, bilirrubina, haptoglobina, función renal, coagulograma, orina", "clave", "Hb 9,1 (basal 13), LDH alta, bilirrubina indirecta 3,2, hemoglobinuria, creatinina 1,1.", "Hemólisis intravascular: forma visceral."),
    study("Laboratorio", "seriado", "Control seriado de hemoglobina y función renal cada 6–12 h", "clave", "Hb en descenso.", "La hemólisis puede progresar en 24–72 h."),
    study("Microbiología", "cultivo", "Cultivo de la lesión de rutina", "innecesario", "No se realizó.", "La lesión es tóxica, no infecciosa."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("loxoscelismo", "Loxoscelismo cutáneo-visceral (araña violinista) con placa livedoide y hemólisis intravascular", true, "Picadura de araña marrón en ropa guardada, placa livedoide dolorosa, fiebre, orina oscura, ictericia y laboratorio de hemólisis."),
      dx("celulitis", "Celulitis bacteriana", false, "La placa livedoide y la hemólisis indican loxoscelismo."),
      dx("latrodectismo", "Latrodectismo (viuda negra)", false, "Da dolor y contracturas musculares, no placa necrótica ni hemólisis."),
      dx("fascitis", "Fascitis necrotizante", false, "Sin crepitación ni progresión rápida con toxicidad bacteriana."),
      dx("pti", "Púrpura", false, "La lesión es localizada en el sitio de la picadura."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("antiveneno", "Suero antiloxosceles (antiveneno) por la forma sistémica, consultando al centro toxicológico", "clave", "Indicado en el loxoscelismo cutáneo-visceral."),
      mg("internacion", "Internación con hidratación, control de hemólisis y función renal; transfusión si hace falta", "clave", "Riesgo de insuficiencia renal y anemia grave."),
      mg("lesion", "Frío local, analgesia, elevación y cuidados de la herida", "clave", "La necrosis puede tardar semanas en cicatrizar."),
      mg("notificar", "Notificar y orientar: sacudir la ropa y el calzado guardados, limpiar detrás de muebles", "util", "Prevención."),
      mg("cirugia-precoz", "Resección quirúrgica temprana de la lesión", "riesgoso", "Empeora la evolución; se desbrida solo la necrosis delimitada tardía."),
      mg("calor", "Compresas calientes", "riesgoso", "Aumentan la actividad del veneno."),
    ],
  },
  debrief: {
    diagnosis: "Loxoscelismo cutáneo-visceral por picadura de araña violinista (Loxosceles laeta), con placa livedoide en el muslo y hemólisis intravascular, en mujer de 39 años.",
    pathologies: [
      { name: "Loxoscelismo cutáneo-visceral", role: "principal", why: "Necrosis cutánea más hemólisis." },
      { name: "Hemólisis intravascular", role: "asociada", why: "Forma sistémica." },
      { name: "Celulitis, latrodectismo, fascitis", role: "diferencial", why: "Otras lesiones de piel y picaduras." },
    ],
    reasoning: [
      "Causa: veneno de Loxosceles con esfingomielinasa D.",
      "Mecanismo: daño de membranas celulares, trombosis local y activación del complemento con hemólisis.",
      "Consecuencia: necrosis cutánea dolorosa; en la forma visceral, hemólisis, insuficiencia renal y coagulopatía.",
    ],
    epidemiology:
      "El loxoscelismo es el araneísmo más importante en Argentina, con casos en todo el país y más en verano. La araña vive dentro de las casas, detrás de muebles y en ropa guardada, y pica al presionarla. La forma visceral es poco frecuente pero potencialmente mortal.",
    management: [
      "Identificar la lesión livedoide y buscar hemólisis.",
      "Antiveneno según la forma y el tiempo; consulta toxicológica.",
      "Cuidados de la lesión y vigilancia renal.",
      "Prevención en el hogar.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de prevención, diagnóstico y tratamiento del envenenamiento por arañas.", "Centro Nacional de Intoxicaciones (Hospital Posadas)."],
    pearls: ["Ropa guardada + placa livedoide = violinista.", "Orina oscura = forma visceral.", "Nada de calor ni cirugía temprana."],
    pitfalls: ["Tratar como celulitis.", "No buscar hemólisis."],
    tribunal: [
      qa("¿Qué diferencia el loxoscelismo del latrodectismo?", "Loxoscelismo (violinista): lesión local necrótica dolorosa y, a veces, hemólisis. Latrodectismo (viuda negra): neurotoxicidad con dolor intenso, contracturas, sudoración, taquicardia e hipertensión, sin necrosis local importante."),
      qa("¿Qué animales venenosos son relevantes en Argentina?", "Serpientes (yarará, cascabel, coral), escorpiones (Tityus), arañas (Loxosceles, Latrodectus, Phoneutria) y orugas (Lonomia), entre otros; cada uno tiene antiveneno específico producido por el ANLIS-Malbrán."),
      qa("¿Qué es una placa livedoide?", "Una lesión con áreas violáceas, pálidas (isquémicas) y eritematosas, que puede evolucionar a necrosis; es típica del loxoscelismo cutáneo."),
    ],
  },
};
