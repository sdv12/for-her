import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hepatitisBEmbarazada: ClinicalCase = {
  id: "hepatitis-b-embarazada",
  level: 2,
  area: "Infectología",
  setting: "Consultorio",
  patient: { age: 30, ageUnit: "años", sex: "F", context: "Embarazo de 26 semanas, primer control. Nacida en Bolivia. Sin vacunas. Sin síntomas." },
  frequency: "frecuente",
  intro: "“Vengo a ver los análisis del embarazo. Me dijeron que algo de la hepatitis dio positivo. No siento nada.”",
  vitals: { TA: "110/68 mmHg", FC: "84 lpm", "T°": "36,6 °C", "SatO₂": "98 %", Peso: "68 kg" },
  anamnesis: [
    act("riesgo", "¿Transfusiones, tatuajes, parejas, familia con hepatitis?", "clave", "“Mi mamá tuvo cirrosis.”", "Vertical en la infancia."),
    act("sintomas", "¿Ictericia, picazón, panza hinchada?", "clave", "“No.”", "Crónica asintomática."),
    act("embarazo", "¿Hijos previos? ¿Están vacunados?", "clave", "“Uno de 7 años, no sé.”", "Deben testearse."),
    act("alcohol", "¿Alcohol o medicación?", "util", "“No.”", "Daño hepático."),
    act("pareja", "¿Pareja testeada?", "util", "“No.”", "Convivientes."),
    act("pais", "¿De qué ciudad sos?", "neutro", "“De Sucre.”", "No orienta."),
  ],
  exam: [
    act("hepatico", "Hígado, bazo, estigmas", "clave", "Sin hepatomegalia ni estigmas.", "No hay cirrosis."),
    act("obstetrico", "Control obstétrico", "clave", "Altura y latidos normales.", "Normal."),
    act("piel", "Ictericia", "util", "No.", "Sin agudización."),
  ],
  studies: [
    study("Laboratorio", "hbs", "HBsAg, anti-HBc, HBeAg, carga viral", "clave", "HBsAg+, anti-HBc IgG+, HBeAg+, ADN VHB 450.000 UI/ml.", "Crónica con alta replicación."),
    study("Laboratorio", "hepatograma", "Hepatograma, plaquetas, coagulograma", "clave", "ALT leve, resto normal.", "Valora daño."),
    study("Laboratorio", "coinfecciones", "VIH, hepatitis C y D", "clave", "Negativas.", "Coinfecciones."),
    study("Otros", "biopsia", "Biopsia hepática en el embarazo", "riesgoso", "No se realizó.", "No hace falta y conlleva riesgo."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hb", "Hepatitis B crónica HBeAg positiva, con alta carga viral, en embarazada", true, "HBsAg+, anti-HBc IgG, y carga alta; sin signos de cirrosis."),
      dx("aguda", "Hepatitis B aguda", false, "IgM negativa y sin síntomas."),
      dx("vacuna", "Falso positivo por vacuna", false, "No vacunada y anti-HBc positivo."),
      dx("resuelta", "Infección resuelta", false, "HBsAg sigue positivo."),
      dx("hellp", "HELLP", false, "No hay hemólisis, plaquetas ni HTA."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("tenofovir", "Tenofovir desde las 28 a 32 semanas", "clave", "Reduce la transmisión con carga alta."),
      mg("bebe", "Al nacer: vacuna e inmunoglobulina en menos de 12 horas", "clave", "Previene más del 90 % de los casos."),
      mg("familia", "Testear y vacunar a convivientes", "clave", "Previene contagio."),
      mg("lactancia", "Permitir lactancia", "util", "No está contraindicada."),
      mg("cesarea", "Cesárea por hepatitis B", "innecesario", "No está indicada solo por esto."),
      mg("sin-profilaxis", "Dar el alta al bebé sin profilaxis", "riesgoso", "Alto riesgo de cronicidad."),
    ],
  },
  debrief: {
    diagnosis: "Hepatitis B crónica HBeAg positiva con alta carga viral, en embarazo de 26 semanas.",
    pathologies: [
      { name: "Hepatitis B crónica", role: "principal", why: "Persistencia del HBsAg." },
      { name: "Riesgo de transmisión vertical", role: "asociada", why: "Problema principal." },
      { name: "Aguda, HELLP", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: virus de la hepatitis B, probablemente vertical.",
      "Mecanismo: replicación en el hepatocito, tolerancia inmunitaria.",
      "Consecuencia: daño hepático crónico y contagio al hijo.",
    ],
    epidemiology:
      "En Argentina se testea a toda embarazada. La infección perinatal evoluciona a cronicidad en cerca del 90 % de los bebés, frente al 5 % en adultos. La vacuna al nacer forma parte del calendario desde 2000, y el cumplimiento dentro de las 12 horas es crítico.",
    management: [
      "Serologías y carga viral.",
      "Tenofovir según carga.",
      "Vacuna e inmunoglobulina.",
      "Seguimiento posparto.",
    ],
    sources: ["Ministerio de Salud de la Nación — Eliminación de transmisión vertical (ETMI-Plus).", "Sociedad Argentina de Infectología — Hepatitis B."],
    pearls: ["HBsAg es infección activa.", "Vacuna e inmunoglobulina en 12 horas.", "Lactancia permitida."],
    pitfalls: ["No pedir carga viral.", "No testear familia."],
    tribunal: [
      qa("¿Cómo interpretás anti-HBs?", "Solo anti-HBs positivo significa vacunación; con anti-HBc positivo, infección pasada."),
      qa("¿Qué es el período de ventana?", "HBsAg ya negativo y anti-HBs aún no aparece; se detecta con anti-HBc IgM."),
      qa("¿Qué pronóstico tiene la hepatitis B crónica?", "Riesgo de cirrosis y hepatocarcinoma; requiere seguimiento."),
    ],
  },
};
