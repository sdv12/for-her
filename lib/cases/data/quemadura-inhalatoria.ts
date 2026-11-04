import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const quemaduraInhalatoria: ClinicalCase = {
  id: "quemadura-extensa-inhalacion",
  level: 4,
  area: "Cirugía",
  setting: "Guardia",
  patient: { age: 41, ageUnit: "años", sex: "M", context: "Se incendió su casilla de madera de noche. Lo rescataron los bomberos de una habitación cerrada." },
  frequency: "poco-frecuente",
  intro: "Llega con quemaduras en la cara, el tórax y los brazos, voz ronca y tos con hollín.",
  vitals: { TA: "112/70 mmHg", FC: "128 lpm", FR: "30 rpm", "T°": "36,0 °C", "SatO₂": "97 %", Peso: "75 kg" },
  anamnesis: [
    act("lugar", "¿Estuvo en un lugar cerrado? ¿Cuánto tiempo?", "clave", "Bomberos: “En la habitación cerrada, unos 10 minutos.”", "Recinto cerrado: riesgo de lesión inhalatoria y de intoxicación por CO y cianuro."),
    act("voz", "¿Le cambió la voz? ¿Le cuesta tragar?", "clave", "“Está ronco y le cuesta tragar.”", "Signos de edema de la vía aérea superior."),
    act("hora", "¿A qué hora fue?", "clave", "“Hace una hora.”", "La reposición de líquidos se calcula desde la hora de la quemadura."),
    act("antecedentes", "¿Enfermedades o alergias?", "util", "“Ninguna.”", "Historia."),
    act("vacuna", "¿Vacuna antitetánica?", "util", "No sabe.", "Profilaxis."),
    act("perro", "¿Tenía mascotas?", "neutro", "“Un perro que escapó.”", "No orienta."),
  ],
  exam: [
    act("via-aerea", "Cara, boca, vibrisas y faringe", "clave", "Quemaduras faciales, vibrisas chamuscadas, hollín en la boca, edema de faringe, estridor leve.", "Lesión inhalatoria con riesgo de obstrucción de la vía aérea."),
    act("extension", "Extensión y profundidad (regla de los 9)", "clave", "Cara y cuello 4,5 %, tórax anterior 18 %, ambos brazos 18 %: alrededor de 40 % de segundo grado profundo y tercer grado.", "Gran quemado."),
    act("circunferencial", "Buscar quemaduras circunferenciales", "util", "Quemadura circunferencial en el tórax.", "Puede requerir escarotomía si limita la ventilación."),
  ],
  studies: [
    study("Laboratorio", "cohb", "Carboxihemoglobina, lactato y gases", "clave", "COHb 18 %, lactato 8 mmol/l.", "Intoxicación por CO y sospecha de cianuro (lactato muy alto)."),
    study("Otros", "broncoscopia", "Fibrobroncoscopía (tras asegurar la vía aérea)", "util", "Hollín y edema en la tráquea.", "Confirma la lesión inhalatoria."),
    study("Laboratorio", "lab", "Hemograma, ionograma, función renal, CPK", "util", "Hematocrito alto.", "Hemoconcentración."),
    study("Otros", "saturacion", "Confiar en la saturación de 97 %", "riesgoso", "No se realizó.", "El oxímetro no detecta la COHb."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("gran-quemado", "Gran quemado (alrededor de 40 % de superficie, segundo grado profundo y tercer grado) con lesión inhalatoria e intoxicación por CO y probable cianuro", true, "Incendio en recinto cerrado, quemaduras extensas, voz ronca, hollín, estridor, COHb 18 % y lactato muy alto."),
      dx("quemadura-simple", "Quemadura extensa sin lesión inhalatoria", false, "Hay signos claros de compromiso de la vía aérea."),
      dx("asma", "Broncoespasmo", false, "El estridor y el edema son de vía aérea alta por calor."),
      dx("co-solo", "Solo intoxicación por CO", false, "Hay quemaduras graves y lesión inhalatoria."),
      dx("anafilaxia", "Anafilaxia", false, "El edema es por calor y humo."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("intubar", "Intubación orotraqueal precoz por un operador experto", "clave", "El edema de la vía aérea progresa en horas y la intubación tardía puede ser imposible."),
      mg("o2", "Oxígeno al 100 % e hidroxocobalamina por sospecha de cianuro", "clave", "Tratan las intoxicaciones asociadas."),
      mg("parkland", "Reposición con Ringer lactato según fórmula de Parkland (4 ml × kg × % superficie; la mitad en las primeras 8 h) ajustada por diuresis", "clave", "Previene el shock del quemado."),
      mg("derivacion", "Derivación a una unidad de quemados; cubrir con apósitos limpios y prevenir la hipotermia", "clave", "Gran quemado."),
      mg("hielo", "Aplicar hielo sobre las quemaduras", "riesgoso", "Profundiza la lesión y produce hipotermia."),
      mg("atb-profilactico", "Antibióticos sistémicos profilácticos", "innecesario", "No se recomiendan de rutina."),
    ],
  },
  debrief: {
    diagnosis: "Gran quemado (alrededor de 40 % de superficie corporal, segundo grado profundo y tercer grado) con lesión inhalatoria e intoxicación por monóxido de carbono y probable cianuro, en varón de 41 años rescatado de un incendio en recinto cerrado.",
    pathologies: [
      { name: "Quemadura extensa", role: "principal", why: "Gran quemado." },
      { name: "Lesión inhalatoria e intoxicación por CO y cianuro", role: "asociada", why: "Principales causas de muerte temprana en incendios." },
      { name: "Broncoespasmo, anafilaxia", role: "diferencial", why: "Se descartan." },
    ],
    reasoning: [
      "Causa: fuego y humo en un recinto cerrado.",
      "Mecanismo: el calor daña la vía aérea alta (edema); el humo daña la vía aérea baja; el CO y el cianuro bloquean el uso del oxígeno; la quemadura extensa produce pérdida masiva de líquidos.",
      "Consecuencia: obstrucción de la vía aérea, hipoxia tisular, shock del quemado e infecciones.",
    ],
    epidemiology:
      "Las quemaduras son una causa importante de muerte y discapacidad en Argentina, más en niños pequeños (escaldaduras) y en adultos en incendios de viviendas precarias, sobre todo en invierno. La lesión inhalatoria aumenta mucho la mortalidad.",
    management: [
      "ABCDE: asegurar la vía aérea precozmente si hay signos de lesión inhalatoria.",
      "Oxígeno al 100 % y antídoto para cianuro.",
      "Calcular superficie y reponer líquidos (Parkland), guiado por diuresis.",
      "Derivación a unidad de quemados.",
    ],
    sources: ["Asociación Argentina de Quemaduras — Consenso de tratamiento inicial del quemado.", "Ministerio de Salud de la Nación — Guía de atención inicial del paciente quemado."],
    pearls: ["Voz ronca + hollín + vibrisas chamuscadas = intubar temprano.", "Recinto cerrado = CO y cianuro.", "Parkland y diuresis."],
    pitfalls: ["Esperar a que aparezca estridor grave.", "Hielo sobre las quemaduras."],
    tribunal: [
      qa("¿Qué es la regla de los 9?", "Una estimación de la superficie corporal quemada en adultos: cabeza 9 %, cada brazo 9 %, tórax anterior 18 %, posterior 18 %, cada pierna 18 % y periné 1 %; en niños la cabeza vale más y se usan tablas de Lund-Browder. La palma del paciente equivale a 1 %."),
      qa("¿Cómo se clasifican las quemaduras por profundidad?", "Primer grado (epidérmica, eritema doloroso), segundo grado superficial (ampollas, rosada, muy dolorosa), segundo grado profundo (blanquecina, menos dolorosa) y tercer grado (espesor total, acartonada, indolora, requiere injerto)."),
      qa("¿Cuál es la fórmula de Parkland?", "4 ml de Ringer lactato × peso en kg × % de superficie quemada (de segundo y tercer grado) en 24 h, la mitad en las primeras 8 h desde la quemadura; se ajusta para una diuresis de 0,5 ml/kg/h en adultos."),
    ],
  },
};
