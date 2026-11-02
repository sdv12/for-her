import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const tbcInfantil: ClinicalCase = {
  id: "tuberculosis-infantil-contacto",
  level: 2,
  area: "Pediatría",
  setting: "CAPS",
  patient: { age: 3, ageUnit: "años", sex: "F", context: "Su abuelo, que vive en la casa, empezó tratamiento para tuberculosis pulmonar hace dos semanas." },
  frequency: "frecuente",
  intro: "“Al abuelo le diagnosticaron tuberculosis y nos dijeron que traigamos a los chicos. Ella tose hace un mes y está más flaquita.” (relata la madre)",
  vitals: { FC: "112 lpm", FR: "28 rpm", "T°": "37,6 °C", "SatO₂": "97 %", Peso: "12,5 kg" },
  anamnesis: [
    act("contacto", "¿Cuánto tiempo pasa con el abuelo? ¿Duermen juntos?", "clave", "“Lo cuida él mientras trabajo; duermen en el mismo cuarto.”", "Contacto íntimo prolongado con un bacilífero: alto riesgo de infección y enfermedad en menores de 5 años."),
    act("sintomas", "¿Tos de más de dos semanas, fiebre, sudores, pérdida de peso o de apetito?", "clave", "“Tos un mes, fiebrita a la tarde, come poco.”", "Síntomas compatibles con TBC infantil."),
    act("bcg", "¿Recibió la BCG?", "util", "“Sí, tiene la cicatriz.”", "La BCG protege de las formas graves, pero no de la infección pulmonar."),
    act("otros", "¿Hay otros chicos en la casa?", "clave", "“Un bebé de 8 meses.”", "Todos los contactos deben estudiarse."),
    act("vih", "¿Te hiciste el test de VIH en el embarazo?", "util", "“Sí, negativo.”", "La coinfección cambia el pronóstico."),
    act("muneco", "¿Tiene un peluche favorito?", "neutro", "“Un oso.”", "No orienta."),
  ],
  exam: [
    act("peso", "Peso, talla y curva de crecimiento", "clave", "Bajó del percentilo 25 al 3.", "Falta de progreso de peso: dato muy importante en la TBC infantil."),
    act("ganglios", "Ganglios", "util", "Adenopatías cervicales pequeñas.", "Puede haber TBC ganglionar."),
    act("pulmon", "Auscultación", "util", "Hipoventilación leve en el hilio derecho.", "Compresión bronquial por ganglios."),
  ],
  studies: [
    study("Otros", "ppd", "PPD (prueba tuberculínica)", "clave", "16 mm.", "Positiva (en contactos, 5 mm o más en Argentina para niños)."),
    study("Imágenes", "rx", "Radiografía de tórax frente y perfil", "clave", "Adenopatía hiliar derecha con infiltrado.", "Complejo primario: forma típica de TBC infantil."),
    study("Microbiología", "lavado", "Lavado gástrico o esputo inducido en ayunas (tres muestras) para baciloscopía, cultivo y prueba molecular", "clave", "Baciloscopía negativa; PCR positiva para M. tuberculosis sensible a rifampicina.", "En niños es paucibacilar: se usan pruebas moleculares y cultivo."),
    study("Imágenes", "tc", "Tomografía de tórax de rutina", "innecesario", "No se realizó.", "La radiografía alcanza."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("tbc", "Tuberculosis pulmonar primaria (complejo primario) en niña contacto de un bacilífero", true, "Contacto íntimo, tos y fiebre de un mes, pérdida de peso, PPD positiva, adenopatía hiliar con infiltrado y PCR positiva."),
      dx("infeccion-latente", "Infección tuberculosa latente", false, "Tiene síntomas y radiografía alterada: es enfermedad activa."),
      dx("nac", "Neumonía bacteriana", false, "Cuadro de un mes con adenopatía hiliar y contacto TBC."),
      dx("asma", "Asma", false, "No explica la fiebre, el adelgazamiento ni la radiografía."),
      dx("bcg", "Reacción por BCG", false, "Una PPD de 16 mm con contacto y radiografía alterada no se atribuye a la BCG."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("tratamiento", "Tratamiento antituberculoso con formulaciones pediátricas (isoniacida, rifampicina, pirazinamida y etambutol según norma) por 6 meses", "clave", "Tratamiento de la TBC activa."),
      mg("contactos", "Estudiar al bebé: si no tiene enfermedad, tratamiento preventivo", "clave", "Los menores de 5 años contactos de un bacilífero reciben quimioprofilaxis aun con PPD negativa."),
      mg("notificar", "Notificar y supervisar la toma (tratamiento directamente observado)", "clave", "Mejora la adherencia."),
      mg("nutricion", "Apoyo nutricional y seguimiento de peso", "util", "La desnutrición empeora el pronóstico."),
      mg("monoterapia", "Solo isoniacida", "riesgoso", "Es tratamiento de infección latente; en enfermedad activa genera resistencia."),
      mg("aislar-nena", "Aislar a la niña del resto de la familia", "innecesario", "Los niños pequeños con TBC primaria casi nunca contagian."),
    ],
  },
  debrief: {
    diagnosis: "Tuberculosis pulmonar primaria (complejo primario) con pérdida de peso, en niña de 3 años contacto íntimo de un caso bacilífero.",
    pathologies: [
      { name: "Tuberculosis primaria infantil", role: "principal", why: "Enfermedad activa tras contagio reciente." },
      { name: "Riesgo en contactos menores de 5 años", role: "asociada", why: "Indica estudio y profilaxis." },
      { name: "Infección latente, neumonía, asma", role: "diferencial", why: "Se descartan." },
    ],
    reasoning: [
      "Causa: inhalación de bacilos de un adulto bacilífero en la casa.",
      "Mecanismo: el bacilo llega al pulmón y a los ganglios hiliares; en niños pequeños la inmunidad es inmadura y la infección progresa a enfermedad con más frecuencia.",
      "Consecuencia: complejo primario, compresión bronquial y riesgo de formas graves (miliar, meníngea), sobre todo en menores de 2 años.",
    ],
    epidemiology:
      "En Argentina se notifican más de 13.000 casos de tuberculosis por año y los casos aumentaron en los últimos años. La TBC infantil refleja transmisión reciente en el hogar. Los menores de 5 años son el grupo de mayor riesgo de enfermar tras el contagio.",
    management: [
      "Estudio de todos los contactos de un bacilífero (PPD, radiografía, clínica).",
      "Niño enfermo: tratamiento completo supervisado.",
      "Contactos menores de 5 sin enfermedad: tratamiento preventivo.",
      "Notificación y seguimiento.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía práctica para el diagnóstico y tratamiento de la tuberculosis.", "Sociedad Argentina de Pediatría — Consenso de tuberculosis infantil."],
    pearls: ["Caso índice adulto = estudiar a los chicos.", "Menor de 5 contacto = profilaxis.", "Pérdida de peso es clave en niños."],
    pitfalls: ["Monoterapia en enfermedad activa.", "No estudiar al bebé."],
    tribunal: [
      qa("¿Qué diferencia la infección tuberculosa latente de la enfermedad?", "La infección latente tiene PPD o IGRA positivos sin síntomas ni radiografía alterada y no contagia (se trata con isoniacida o rifampicina para prevenir); la enfermedad activa tiene síntomas, imágenes o bacteriología positivas y requiere tratamiento completo."),
      qa("¿Qué efectos adversos tienen los antituberculosos?", "Isoniacida: hepatitis y neuropatía (se previene con piridoxina). Rifampicina: hepatitis, orina anaranjada e interacciones (anticonceptivos). Pirazinamida: hepatitis e hiperuricemia. Etambutol: neuritis óptica."),
      qa("¿Qué protege la vacuna BCG?", "Reduce las formas graves de tuberculosis en niños (meningitis tuberculosa y TBC miliar); se aplica al nacer en Argentina, pero no evita la infección ni la TBC pulmonar del adulto."),
    ],
  },
};
