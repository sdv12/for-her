import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const vihCandidiasisEsofagica: ClinicalCase = {
  id: "vih-candidiasis-esofagica",
  level: 3,
  area: "Infectología",
  setting: "Guardia",
  patient: { age: 41, ageUnit: "años", sex: "F", context: "Ama de casa. Su exmarido murió hace 2 años 'de una neumonía'. Nunca se hizo un test de VIH." },
  frequency: "frecuente",
  intro: "“Me duele mucho al tragar, como si la comida me raspara. Bajé mucho de peso.”",
  vitals: { TA: "104/66 mmHg", FC: "96 lpm", "T°": "37,5 °C", Peso: "48 kg (bajó 9 kg)" },
  anamnesis: [
    act("odinofagia", "¿Duele al tragar sólidos, líquidos o ambos?", "clave", "“Todo, hasta el agua.”", "Odinofagia: esofagitis infecciosa."),
    act("peso", "¿Cuánto bajó y en cuánto tiempo?", "clave", "“Nueve kilos en 4 meses.”", "Síndrome de desgaste."),
    act("ex", "¿De qué murió su exmarido?", "clave", "“Neumonía, estuvo internado mucho tiempo.”", "Posible sida no diagnosticado."),
    act("diarrea", "¿Diarrea, fiebre, sudores?", "util", "“Diarrea y sudores de noche.”", "Infecciones oportunistas."),
    act("hijos", "¿Tiene hijos? ¿Amamantó?", "clave", "“Una hija de 6 años, le di la teta.”", "Hay que testear a la hija."),
    act("novela", "¿Qué novela mira?", "neutro", "“Una turca.”", "No orienta."),
  ],
  exam: [
    act("boca", "Boca", "clave", "Placas blancas que se desprenden en paladar y lengua.", "Muguet."),
    act("ganglios", "Ganglios", "util", "Adenopatías cervicales pequeñas.", "Generalizadas."),
    act("piel", "Piel", "util", "Dermatitis seborreica facial.", "Frecuente en VIH."),
  ],
  studies: [
    study("Laboratorio", "vih", "Test de VIH con consentimiento y confirmación", "clave", "Positivo, confirmado; carga viral 210.000 copias/ml.", "Diagnóstico."),
    study("Laboratorio", "cd4", "Recuento de CD4", "clave", "68 células/µl.", "Sida: menos de 200."),
    study("Otros", "endoscopia", "Endoscopía alta si no mejora con fluconazol empírico", "util", "No hizo falta: mejoró en 72 horas.", "Se reserva para falta de respuesta."),
    study("Laboratorio", "criptococo", "Antígeno de criptococo en sangre", "clave", "Negativo.", "Indicado con CD4 menores de 100."),
    study("Laboratorio", "tbc", "Baciloscopia y radiografía de tórax", "clave", "Negativas.", "Descartar TBC antes de iniciar TARV."),
    study("Otros", "biopsia-rutina", "Endoscopía con biopsia antes de tratar", "innecesario", "No se hizo.", "Odinofagia con muguet: tratamiento empírico."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("sida-candidiasis", "Infección por VIH estadio sida (CD4 68) con candidiasis esofágica", true, "Odinofagia con muguet, desgaste, CD4 menores de 200 y respuesta al fluconazol."),
      dx("erge", "Esofagitis por reflujo", false, "Odinofagia intensa con muguet e inmunosupresión."),
      dx("cmv", "Esofagitis por CMV", false, "Respondió al fluconazol."),
      dx("cancer", "Cáncer de esófago", false, "Respondió al antifúngico."),
      dx("tbc", "Tuberculosis", false, "Estudios negativos."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("fluconazol", "Fluconazol oral 14–21 días", "clave", "Candidiasis esofágica."),
      mg("tarv", "Iniciar tratamiento antirretroviral en las primeras 2 semanas", "clave", "Sin contraindicación por la candidiasis."),
      mg("tms", "Profilaxis con TMS (Pneumocystis y toxoplasma)", "clave", "CD4 menores de 200."),
      mg("hija", "Test de VIH a la hija y a parejas", "clave", "Transmisión."),
      mg("acompanamiento", "Acompañamiento psicosocial y adherencia", "util", "Diagnóstico difícil."),
      mg("esperar-tarv", "Esperar 6 meses para iniciar el TARV", "riesgoso", "Aumenta la mortalidad."),
      mg("nistatina", "Solo nistatina en buches", "riesgoso", "No trata la esofagitis."),
    ],
  },
  debrief: {
    diagnosis: "Infección por VIH en estadio sida (CD4 68) diagnosticada tardíamente por candidiasis esofágica, en una mujer de 41 años.",
    pathologies: [
      { name: "Sida", role: "principal", why: "Inmunosupresión grave." },
      { name: "Candidiasis esofágica", role: "asociada", why: "Enfermedad marcadora." },
      { name: "Esofagitis por CMV o herpes", role: "diferencial", why: "Si no responde." },
    ],
    reasoning: [
      "Causa: VIH adquirido probablemente de su pareja.",
      "Mecanismo: caída progresiva de CD4 sin diagnóstico.",
      "Consecuencia: infecciones oportunistas y riesgo de muerte.",
    ],
    epidemiology:
      "En Argentina alrededor del 30 % de los diagnósticos de VIH son tardíos, con CD4 menores de 200, más en mujeres heterosexuales y personas mayores que no se perciben en riesgo. La candidiasis esofágica es una de las enfermedades marcadoras de sida más frecuentes.",
    management: [
      "Ofrecer test de VIH.",
      "CD4, carga viral y oportunistas.",
      "Tratar la infección y empezar TARV temprano.",
      "Profilaxis y rastreo de contactos.",
    ],
    sources: ["Ministerio de Salud de la Nación — Recomendaciones para el inicio del tratamiento antirretroviral.", "SADI — Consenso argentino de terapia antirretroviral."],
    pearls: ["Odinofagia + muguet = VIH hasta demostrar lo contrario.", "TARV en 2 semanas.", "CD4 menor de 200: TMS."],
    pitfalls: ["No ofrecer el test.", "Demorar el TARV."],
    tribunal: [
      qa("¿Qué es una enfermedad marcadora de sida?", "Una infección oportunista o neoplasia que define sida, como candidiasis esofágica, Pneumocystis, toxoplasmosis cerebral o sarcoma de Kaposi."),
      qa("¿Cuándo se inicia el TARV con una infección oportunista?", "En general dentro de las 2 semanas, salvo en meningitis criptocócica o tuberculosa, donde se difiere unas semanas."),
      qa("¿Qué profilaxis corresponden por CD4?", "Menos de 200: TMS para Pneumocystis; menos de 100 con toxoplasma IgG positivo: TMS para toxoplasmosis."),
    ],
  },
};
