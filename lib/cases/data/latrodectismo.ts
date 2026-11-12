import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const latrodectismo: ClinicalCase = {
  id: "latrodectismo-viuda-negra",
  level: 2,
  area: "Toxicología",
  setting: "Guardia",
  patient: { age: 42, ageUnit: "años", sex: "M", context: "Trabajador rural en La Pampa. Febrero. Estaba juntando fardos." },
  frequency: "poco-frecuente",
  intro: "“Me picó algo en la mano juntando fardos. Al rato me empezó un dolor muy fuerte en la panza y los músculos, y transpiro mucho.”",
  vitals: { TA: "168/98 mmHg", FC: "112 lpm", FR: "22 rpm", "T°": "37,2 °C", "SatO₂": "97 %" },
  anamnesis: [
    act("animal", "¿Viste el bicho?", "clave", "“Una araña negra con manchas rojas.”", "Latrodectus."),
    act("tiempo", "¿Hace cuánto?", "clave", "“Dos horas.”", "Evolución."),
    act("dolor", "¿Cómo es el dolor?", "clave", "“Calambres, panza dura.”", "Neurotoxicidad."),
    act("cardio", "¿Dolor de pecho o palpitaciones?", "util", "“Palpitaciones.”", "Toxicidad."),
    act("vacuna", "¿Vacuna antitetánica?", "util", "“Hace años.”", "Herida."),
    act("fardo", "¿Cuántos fardos juntaste?", "neutro", "“Unos cien.”", "No orienta."),
  ],
  exam: [
    act("picadura", "Sitio de picadura", "clave", "Mínima lesión con halo pálido.", "Leve localmente."),
    act("abdomen", "Abdomen", "clave", "Rigidez sin peritonismo real.", "Simula abdomen agudo."),
    act("autonomico", "Signos autonómicos", "util", "Sudoración, hipertensión, facies de dolor.", "Latrodectismo."),
  ],
  studies: [
    study("Electrofisiología", "ecg", "ECG", "clave", "Taquicardia sinusal.", "Toxicidad."),
    study("Laboratorio", "lab", "CK, glucemia, hemograma", "clave", "CK algo alta.", "Muscular."),
    study("Otros", "consulta", "Consultar con centro toxicológico", "clave", "Indica antiveneno.", "Manejo."),
    study("Imágenes", "tc", "TC de abdomen y laparotomía", "riesgoso", "No se realizó.", "No es abdomen agudo quirúrgico."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("latrodectismo", "Latrodectismo (picadura de araña viuda negra) moderado a grave", true, "Araña negra con manchas rojas, dolor muscular, rigidez abdominal y signos autonómicos."),
      dx("loxoscelismo", "Loxoscelismo", false, "Lesión local necrótica y otra araña."),
      dx("escorpion", "Escorpionismo", false, "Araña identificada."),
      dx("abdomen", "Abdomen agudo quirúrgico", false, "Sin peritonitis real."),
      dx("tetanos", "Tétanos", false, "Tiempo e identificación."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("antiveneno", "Antiveneno Latrodectus en casos moderados a graves", "clave", "Revierte rápido."),
      mg("analgesia", "Analgesia y benzodiacepinas para espasmos", "clave", "Síntomas."),
      mg("notificar", "Notificar y consultar con centro toxicológico", "clave", "Vigilancia."),
      mg("tetanos", "Profilaxis antitetánica", "util", "Herida."),
      mg("cirugia", "Laparotomía", "riesgoso", "Innecesaria."),
      mg("corte", "Cortar y succionar", "riesgoso", "Daño."),
    ],
  },
  debrief: {
    diagnosis: "Latrodectismo moderado a grave por picadura de araña viuda negra, en trabajador rural de 42 años.",
    pathologies: [
      { name: "Latrodectismo", role: "principal", why: "Envenenamiento neurotóxico." },
      { name: "Hipertensión y taquicardia", role: "asociada", why: "Toxicidad autonómica." },
      { name: "Loxoscelismo, abdomen agudo", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: veneno de Latrodectus.",
      "Mecanismo: la alfa-latrotoxina libera neurotransmisores.",
      "Consecuencia: dolor, contracturas y descarga autonómica.",
    ],
    epidemiology:
      "Es más frecuente en zonas rurales de la región pampeana en verano, durante la cosecha. El dolor abdominal rígido puede confundirse con un abdomen agudo. Argentina produce antiveneno a través del ANLIS-Malbrán.",
    management: [
      "Identificar.",
      "Analgesia.",
      "Antiveneno.",
      "Notificar.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de envenenamiento por arañas.", "ANLIS-Malbrán — Antivenenos."],
    pearls: ["Araña negra con manchas rojas.", "Abdomen rígido sin cirugía.", "Antiveneno."],
    pitfalls: ["Operar.", "No notificar."],
    tribunal: [
      qa("¿Cómo diferenciás latrodectismo y loxoscelismo?", "Latrodectismo: neurotóxico con dolor y contracturas. Loxoscelismo: necrosis local y hemólisis."),
      qa("¿Qué es la facies latrodectísmica?", "Cara de dolor con contracción, sudoración, blefaroconjuntivitis y trismus."),
      qa("¿Qué otros animales venenosos hay en Argentina?", "Serpientes (yarará, cascabel, coral), escorpiones y arañas."),
    ],
  },
};
