import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const meningitisTuberculosa: ClinicalCase = {
  id: "meningitis-tuberculosa",
  level: 3,
  area: "Infectología",
  setting: "Guardia",
  patient: { age: 36, ageUnit: "años", sex: "F", context: "Trabaja en un taller textil, con hacinamiento. Un compañero tuvo tuberculosis. Sin VIH conocido." },
  frequency: "poco-frecuente",
  intro: "“Hace tres semanas tengo dolor de cabeza y febrícula. Vomito y ahora veo doble. Mi marido me nota lenta.”",
  vitals: { TA: "118/74 mmHg", FC: "92 lpm", FR: "18 rpm", "T°": "37,9 °C", "SatO₂": "97 %", Glasgow: "14/15" },
  anamnesis: [
    act("tiempo", "¿Cuándo empezó? ¿Fue progresivo?", "clave", "“Tres semanas, cada vez peor.”", "Subagudo."),
    act("contacto", "¿Contacto con TBC? ¿Tos, peso, sudor?", "clave", "“Un compañero. Bajé 5 kilos, sudo a la noche.”", "Exposición."),
    act("inmuno", "¿VIH, corticoides, diabetes?", "clave", "“No sé de VIH.”", "Riesgo."),
    act("vision", "¿Visión doble desde cuándo?", "util", "“Unos días.”", "Pares craneales."),
    act("medicacion", "¿Tomaste algún antibiótico?", "util", "“Amoxicilina, sin mejoría.”", "Tratamiento parcial."),
    act("taller", "¿Qué fabrican?", "neutro", "“Remeras.”", "No orienta."),
  ],
  exam: [
    act("meninges", "Rigidez de nuca y conciencia", "clave", "Rigidez leve, enlentecida.", "Meningitis."),
    act("pares", "Pares craneales", "clave", "Parálisis del sexto par derecho.", "Afectación de base."),
    act("pulmon", "Pulmón y ganglios", "util", "Rales apicales.", "TBC pulmonar."),
  ],
  studies: [
    study("Imágenes", "tc", "TC o RM de cerebro con contraste antes de la punción", "clave", "Realce basal, hidrocefalia leve.", "Típico."),
    study("Otros", "lcr", "LCR con citoquímico, tinta china, ADA, PCR (Xpert) y cultivo", "clave", "Linfocitos, proteínas 180, glucosa 25 (índice bajo); Xpert positivo.", "Patrón."),
    study("Laboratorio", "vih", "VIH y radiografía de tórax", "clave", "VIH negativo; infiltrado apical.", "Busca otras localizaciones."),
    study("Otros", "ppd", "Esperar la PPD para decidir", "riesgoso", "No se realizó.", "Puede ser negativa y demora un tratamiento urgente."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("tb", "Meningitis tuberculosa, estadio II, con hidrocefalia y TBC pulmonar", true, "Curso subagudo, pares, LCR con glucosa baja y linfocitos, Xpert positivo."),
      dx("bacteriana", "Meningitis bacteriana", false, "Es aguda con neutrófilos."),
      dx("viral", "Meningitis viral", false, "Tiene glucosa normal."),
      dx("cripto", "Criptococosis", false, "Tinta china negativa, y sin inmunosupresión."),
      dx("carcinomatosis", "Carcinomatosis meníngea", false, "Xpert positivo y fiebre."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cuatro", "Tuberculostáticos (HRZE), hasta 9 a 12 meses", "clave", "Comenzar de inmediato."),
      mg("dexametasona", "Dexametasona", "clave", "Reduce la mortalidad."),
      mg("hidrocefalia", "Neurocirugía si la hidrocefalia progresa", "clave", "Previene deterioro."),
      mg("contactos", "Notificación, contactos, y aislamiento respiratorio", "clave", "Salud pública."),
      mg("sin-tto", "Esperar cultivo (6 a 8 semanas) antes de tratar", "riesgoso", "Alta mortalidad si se demora."),
      mg("piridoxina", "Piridoxina con isoniazida", "util", "Previene neuropatía."),
    ],
  },
  debrief: {
    diagnosis: "Meningitis tuberculosa estadio II, con hidrocefalia y parálisis del VI par, y TBC pulmonar, en mujer de 36 años.",
    pathologies: [
      { name: "Meningitis tuberculosa", role: "principal", why: "Forma grave de TBC." },
      { name: "Tuberculosis pulmonar", role: "asociada", why: "Foco." },
      { name: "Bacteriana, criptococosis", role: "diferencial", why: "Otras meningitis." },
    ],
    reasoning: [
      "Causa: M. tuberculosis.",
      "Mecanismo: focos se rompen al espacio subaracnoideo, con exudado denso en la base.",
      "Consecuencia: afecta pares y flujo de LCR, con infartos e hidrocefalia.",
    ],
    epidemiology:
      "Cada año se notifican más de 12.000 casos de tuberculosis en Argentina. La meningitis es una de las formas más letales; las personas con VIH y los niños están especialmente en riesgo. El hacinamiento laboral facilita la transmisión.",
    management: [
      "Sospecha ante curso subagudo.",
      "Imagen y LCR con Xpert.",
      "HRZE y dexametasona.",
      "Contactos y notificación.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de tuberculosis.", "OMS — Guías de tratamiento de tuberculosis."],
    pearls: ["Meningitis de semanas con pares: pensá TBC.", "Glucosa baja, linfocitos.", "Los corticoides ayudan."],
    pitfalls: ["Esperar el cultivo.", "Olvidar VIH."],
    tribunal: [
      qa("¿Cómo interpretás el ADA?", "Valores altos apoyan TBC, aunque no es específico."),
      qa("¿Qué efectos adversos dan los fármacos?", "Isoniazida: neuropatía y hepatitis. Rifampicina: orina roja. Pirazinamida: hiperuricemia. Etambutol: neuritis óptica."),
      qa("¿Qué es el BCG?", "Vacuna que reduce las formas graves en niños."),
    ],
  },
};
