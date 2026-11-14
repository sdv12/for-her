import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const vihAdultoMayor: ClinicalCase = {
  id: "vih-debut-adulto-mayor",
  level: 3,
  area: "Infectología",
  setting: "Internación",
  patient: { age: 67, ageUnit: "años", sex: "M", context: "Divorciado. Lleva un año perdiendo peso; lo estudiaron por posible cáncer." },
  frequency: "frecuente",
  intro: "“Bajé 12 kilos en un año, tengo diarrea, ahora tos y fiebre. Me hicieron muchos estudios buscando un cáncer.”",
  vitals: { TA: "108/66 mmHg", FC: "104 lpm", FR: "26 rpm", "T°": "38,2 °C", "SatO₂": "88 %", Peso: "58 kg" },
  anamnesis: [
    act("sexual", "¿Tuvo relaciones sin preservativo en los últimos años?", "clave", "“Algunas, después del divorcio.”", "Exposición."),
    act("test", "¿Se hizo alguna vez el test de VIH?", "clave", "“Nunca me lo ofrecieron.”", "Oportunidad perdida."),
    act("disnea", "¿Cómo es la falta de aire?", "clave", "“Progresiva en dos semanas, con tos seca.”", "Pneumocystis."),
    act("boca", "¿Lesiones en la boca o dolor al tragar?", "util", "“Una capa blanca en la lengua.”", "Candidiasis oral."),
    act("zoster", "¿Tuvo herpes zóster?", "util", "“Hace un año.”", "Marcador de inmunosupresión."),
    act("trabajo", "¿Qué hacía?", "neutro", "“Era contador.”", "No orienta."),
  ],
  exam: [
    act("boca-ex", "Boca", "clave", "Muguet.", "Inmunosupresión celular."),
    act("pulmon", "Pulmón", "clave", "Pocos rales, desaturación al hablar.", "Pneumocystis."),
    act("ganglios", "Ganglios", "util", "Adenopatías cervicales pequeñas.", "VIH."),
  ],
  studies: [
    study("Laboratorio", "vih", "Test de VIH, CD4 y carga viral", "clave", "VIH positivo; CD4 42; carga viral alta.", "Sida."),
    study("Imágenes", "tc", "TC de tórax", "clave", "Vidrio esmerilado bilateral difuso.", "Pneumocystis."),
    study("Laboratorio", "ldh", "LDH y gases", "util", "LDH alta; PaO2 58.", "Gravedad."),
    study("Otros", "mas-estudios-cancer", "Seguir buscando cáncer con más estudios", "riesgoso", "No se hizo.", "Retrasa el diagnóstico."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("sida-pcp", "Infección por VIH en estadio sida con neumonía por Pneumocystis jirovecii, en adulto mayor", true, "Pérdida de peso, muguet, zóster previo, disnea subaguda con vidrio esmerilado, CD4 de 42."),
      dx("cancer", "Cáncer oculto", false, "VIH y oportunista explican todo."),
      dx("nac", "Neumonía bacteriana", false, "Vidrio esmerilado difuso subagudo."),
      dx("tbc", "Tuberculosis", false, "Patrón radiológico típico de Pneumocystis; igual se busca."),
      dx("ic", "Insuficiencia cardíaca", false, "Fiebre y contexto inmunosupresor."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("tms", "Trimetoprima-sulfametoxazol en dosis altas por 21 días", "clave", "Tratamiento de Pneumocystis."),
      mg("corticoides", "Corticoides por PaO2 menor de 70", "clave", "Reducen mortalidad."),
      mg("tarv", "Iniciar antirretrovirales dentro de las 2 semanas", "clave", "Mejora la sobrevida."),
      mg("profilaxis", "Profilaxis secundaria y para otros oportunistas", "util", "Prevención."),
      mg("sin-corticoide", "TMS sin corticoides pese a la hipoxemia", "riesgoso", "Mayor mortalidad."),
      mg("esperar-tarv", "Esperar meses para el antirretroviral", "riesgoso", "Más oportunistas."),
    ],
  },
  debrief: {
    diagnosis: "Infección por VIH en estadio sida con neumonía por Pneumocystis jirovecii, en varón de 67 años diagnosticado tarde.",
    pathologies: [
      { name: "Sida con neumonía por Pneumocystis", role: "principal", why: "Infección oportunista definitoria." },
      { name: "Diagnóstico tardío", role: "asociada", why: "No se ofreció el test." },
      { name: "Cáncer, TBC", role: "diferencial", why: "Causas de consunción." },
    ],
    reasoning: [
      "Causa: infección por VIH no diagnosticada por años.",
      "Mecanismo: pérdida de CD4 que permite oportunistas.",
      "Consecuencia: consunción, candidiasis y neumonía grave.",
    ],
    epidemiology:
      "Los adultos mayores son un grupo con diagnóstico tardío de VIH porque no se les ofrece el test. En Argentina una parte importante de los diagnósticos ocurre con CD4 menores de 200. El test se ofrece a toda persona sexualmente activa.",
    management: [
      "Ofrecer el test.",
      "Tratar el oportunista.",
      "Antirretrovirales pronto.",
      "Profilaxis.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de diagnóstico y tratamiento del VIH.", "NIH/CDC/IDSA — Guidelines for Opportunistic Infections in Adults with HIV."],
    pearls: ["Ofrecé el test a todos.", "Muguet y zóster: pensá en VIH.", "Corticoide si PaO2 menor de 70."],
    pitfalls: ["Edad como excusa.", "Estudios infinitos."],
    tribunal: [
      qa("¿Con qué CD4 se da profilaxis para Pneumocystis?", "Con CD4 menores de 200."),
      qa("¿Qué es el síndrome de reconstitución inmune?", "Empeoramiento inflamatorio de una infección al recuperar la inmunidad con antirretrovirales."),
      qa("¿Por qué se espera hasta 2 semanas para iniciar antirretrovirales en algunas infecciones?", "Para reducir el riesgo de reconstitución inmune grave, salvo en meningitis criptocócica o TBC meníngea donde se espera más."),
    ],
  },
};
