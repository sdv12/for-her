import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const mpox: ClinicalCase = {
  id: "mpox",
  level: 2,
  area: "Infectología",
  setting: "Guardia",
  patient: { age: 31, ageUnit: "años", sex: "M", context: "Relaciones con varones; varias parejas en el último mes. Usa PrEP." },
  frequency: "poco-frecuente",
  intro: "“Me salieron unas ampollas en la zona genital y en la mano, me duele mucho el ano y tengo fiebre y ganglios.”",
  vitals: { TA: "118/74 mmHg", FC: "92 lpm", "T°": "38,2 °C" },
  anamnesis: [
    act("contacto", "¿Contacto sexual reciente o con lesiones?", "clave", "“Hace 10 días, con varias parejas.”", "Transmisión."),
    act("lesiones", "¿Cómo evolucionaron?", "clave", "“Ampollas que se hicieron costra.”", "Evolución sincrónica."),
    act("proctitis", "¿Dolor anal o sangrado?", "clave", "“Mucho dolor.”", "Proctitis."),
    act("vih", "¿Último test de VIH?", "util", "“Negativo hace un mes.”", "Coinfección."),
    act("vacuna", "¿Vacuna contra mpox o viruela?", "util", "“No.”", "Prevención."),
    act("hobby", "¿Qué te gusta?", "neutro", "“Viajar.”", "No orienta."),
  ],
  exam: [
    act("piel", "Lesiones", "clave", "Pústulas umbilicadas en genitales y mano, en el mismo estadio.", "Típico."),
    act("ganglios", "Ganglios", "clave", "Adenopatías inguinales dolorosas.", "Distingue de varicela."),
    act("anal", "Región anal", "util", "Úlceras perianales.", "Proctitis."),
  ],
  studies: [
    study("Microbiología", "pcr", "PCR de mpox en lesiones", "clave", "Positiva.", "Confirma."),
    study("Laboratorio", "its", "VIH, sífilis, gonococo, clamidia, hepatitis", "clave", "Sífilis negativa; gonococo rectal positivo.", "Coinfección."),
    study("Otros", "biopsia", "Biopsia de piel", "innecesario", "No se realizó.", "La PCR alcanza."),
    study("Otros", "sin-aislamiento", "Atender sin aislamiento ni protección", "riesgoso", "No se realizó.", "Contagio."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("mpox", "Mpox con proctitis y coinfección gonocócica", true, "Pústulas umbilicadas, adenopatías, proctitis y PCR."),
      dx("herpes", "Herpes genital", false, "PCR de mpox positiva."),
      dx("sifilis", "Sífilis secundaria", false, "Serología negativa."),
      dx("varicela", "Varicela", false, "Lesiones sincrónicas con adenopatías."),
      dx("molusco", "Molusco contagioso", false, "Fiebre y PCR."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("aislamiento", "Aislamiento hasta que caigan las costras", "clave", "Contagio."),
      mg("dolor", "Analgesia y cuidado de lesiones y proctitis", "clave", "Síntomas."),
      mg("gonococo", "Tratar el gonococo", "clave", "Coinfección."),
      mg("notificar", "Notificar y evaluar contactos; vacuna a contactos", "clave", "Salud pública."),
      mg("antibiotico", "Amoxicilina para las pústulas", "riesgoso", "Viral."),
      mg("corticoide", "Corticoide tópico", "riesgoso", "Empeora."),
    ],
  },
  debrief: {
    diagnosis: "Mpox con lesiones genitales y en mano, proctitis y coinfección gonocócica, en varón de 31 años.",
    pathologies: [
      { name: "Mpox", role: "principal", why: "Infección por virus de la viruela símica." },
      { name: "Gonococo rectal", role: "asociada", why: "Coinfección." },
      { name: "Herpes, sífilis, varicela", role: "diferencial", why: "Otras lesiones." },
    ],
    reasoning: [
      "Causa: orthopoxvirus por contacto estrecho.",
      "Mecanismo: replicación en piel y mucosas.",
      "Consecuencia: lesiones dolorosas y proctitis.",
    ],
    epidemiology:
      "Desde 2022 hay casos en Argentina, sobre todo en varones que tienen sexo con varones. Se transmite por contacto estrecho, también sexual. Hay una vacuna para contactos y grupos de riesgo, y se notifica.",
    management: [
      "PCR.",
      "Aislamiento.",
      "ITS.",
      "Notificar.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de mpox.", "OMS — Clinical Management of Mpox."],
    pearls: ["Pústulas umbilicadas con adenopatías.", "Proctitis.", "Buscar otras ITS."],
    pitfalls: ["Antibióticos.", "No aislar."],
    tribunal: [
      qa("¿Cómo diferenciás mpox de varicela?", "Mpox: lesiones en el mismo estadio, adenopatías, palmas y genitales. Varicela: lesiones en distintos estadios."),
      qa("¿Qué antiviral existe?", "Tecovirimat, para casos graves o inmunosuprimidos."),
      qa("¿Cuánto dura el aislamiento?", "Hasta que todas las costras se caigan y haya piel nueva."),
    ],
  },
};
