import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const vihAgudo: ClinicalCase = {
  id: "infeccion-aguda-vih-sindrome-retroviral",
  level: 2,
  area: "Infectología",
  setting: "Guardia",
  patient: { age: 24, ageUnit: "años", sex: "M", context: "Relaciones con varones, sin preservativo hace 3 semanas con una pareja nueva." },
  frequency: "frecuente",
  intro: "“Hace una semana tengo fiebre, dolor de garganta, ganglios y unas manchas rojas en el cuerpo.”",
  vitals: { TA: "116/72 mmHg", FC: "96 lpm", "T°": "38,4 °C", "SatO₂": "98 %" },
  anamnesis: [
    act("exposicion", "¿Relaciones sin preservativo? ¿Cuándo?", "clave", "“Hace 3 semanas.”", "Ventana."),
    act("sintomas", "¿Úlceras en la boca o genitales, diarrea?", "clave", "“Aftas en la boca.”", "Típico."),
    act("testeo", "¿Último test de VIH?", "clave", "“Hace un año, negativo.”", "Infección reciente."),
    act("prep", "¿Conocés la PrEP?", "util", "“No.”", "Prevención."),
    act("drogas", "¿Drogas inyectables?", "util", "“No.”", "Riesgo."),
    act("trabajo", "¿Qué hacés?", "neutro", "“Soy bartender.”", "No orienta."),
  ],
  exam: [
    act("piel", "Piel", "clave", "Exantema maculopapular en tronco.", "Síndrome retroviral."),
    act("ganglios", "Ganglios y faringe", "clave", "Adenopatías generalizadas; faringitis sin exudado; aftas.", "Típico."),
    act("bazo", "Bazo y genitales", "util", "Sin úlceras genitales.", "Sífilis."),
  ],
  studies: [
    study("Laboratorio", "cuarta", "Test de cuarta generación (antígeno p24 y anticuerpos) y carga viral", "clave", "p24 positivo; carga viral 2.400.000 copias.", "Diagnóstico."),
    study("Laboratorio", "its", "Sífilis, hepatitis B y C", "clave", "Negativas.", "Coinfecciones."),
    study("Laboratorio", "mono", "Monotest", "util", "Negativo.", "Diferencial."),
    study("Laboratorio", "elisa-solo", "Solo test rápido de anticuerpos y alta si es negativo", "riesgoso", "No se realizó.", "En la ventana puede ser negativo."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("agudo", "Infección aguda por VIH (síndrome retroviral agudo)", true, "Exposición reciente, cuadro tipo mononucleosis, p24 y carga viral altas."),
      dx("mono", "Mononucleosis", false, "Monotest negativo."),
      dx("sifilis", "Sífilis secundaria", false, "Serología negativa."),
      dx("faringitis", "Faringitis estreptocócica", false, "Sin exudado; cuadro sistémico."),
      dx("covid", "Infección viral inespecífica", false, "VIH confirmado."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("tarv", "Iniciar tratamiento antirretroviral lo antes posible", "clave", "Beneficio individual y reduce transmisión."),
      mg("pareja", "Notificar parejas y ofrecer testeo y profilaxis", "clave", "Prevención."),
      mg("seguimiento", "CD4, genotipo y seguimiento", "clave", "Plan."),
      mg("preservativo", "Preservativo e indetectable no transmite", "util", "Educación."),
      mg("esperar", "Esperar los síntomas de sida para tratar", "riesgoso", "Peor pronóstico."),
      mg("atb", "Amoxicilina", "riesgoso", "No corresponde y puede dar rash."),
    ],
  },
  debrief: {
    diagnosis: "Infección aguda por VIH con síndrome retroviral agudo, en varón de 24 años.",
    pathologies: [
      { name: "Infección aguda por VIH", role: "principal", why: "Fase inicial con viremia alta." },
      { name: "Alto riesgo de transmisión", role: "asociada", why: "Carga viral máxima." },
      { name: "Mononucleosis, sífilis", role: "diferencial", why: "Cuadros similares." },
    ],
    reasoning: [
      "Causa: VIH por vía sexual.",
      "Mecanismo: replicación masiva y caída transitoria de CD4.",
      "Consecuencia: cuadro tipo gripe con mucha transmisibilidad.",
    ],
    epidemiology:
      "En Argentina viven cerca de 140.000 personas con VIH, y una parte no conoce su diagnóstico. La infección aguda es muy transmisible. El tratamiento es gratuito, y la PrEP y el testeo frecuente son clave en la prevención.",
    management: [
      "Sospecha ante exposición.",
      "Test de cuarta generación y carga viral.",
      "Iniciar TARV.",
      "Prevención.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de VIH.", "Sociedad Argentina de Infectología — Consenso de VIH."],
    pearls: ["Mononucleosis negativa con exposición: VIH.", "Cuarta generación.", "Tratar ya."],
    pitfalls: ["Test de anticuerpos solo.", "No preguntar."],
    tribunal: [
      qa("¿Qué significa I igual a I?", "Indetectable es igual a intransmisible por vía sexual."),
      qa("¿Qué es la PrEP?", "Profilaxis preexposición con antirretrovirales para personas en riesgo."),
      qa("¿Qué es la PEP?", "Profilaxis posexposición, que se indica en las primeras 72 horas tras una exposición de riesgo."),
    ],
  },
};
