import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const asmaOcupacional: ClinicalCase = {
  id: "asma-ocupacional-panadero",
  level: 2,
  area: "Respiratorio",
  setting: "Consultorio",
  patient: { age: 35, ageUnit: "años", sex: "M", context: "Panadero hace 8 años. Rinitis en el trabajo desde hace 3 años." },
  frequency: "frecuente",
  intro: "“Me silba el pecho y toso en la panadería. Los fines de semana y en vacaciones estoy mucho mejor.”",
  vitals: { TA: "122/76 mmHg", FC: "84 lpm", FR: "18 rpm", "T°": "36,4 °C", "SatO₂": "96 %" },
  anamnesis: [
    act("trabajo", "¿Mejora fuera del trabajo?", "clave", "“Los domingos y en vacaciones casi no tengo nada.”", "Relación laboral."),
    act("exposicion", "¿Con qué trabaja?", "clave", "“Harina y mejoradores.”", "Alérgeno ocupacional clásico."),
    act("rinitis", "¿Tuvo rinitis antes?", "clave", "“Sí, en el trabajo, años antes.”", "La rinitis precede al asma."),
    act("infancia", "¿Asma de chico?", "util", "“No.”", "Asma de inicio adulto."),
    act("companeros", "¿Compañeros con lo mismo?", "util", "“Uno.”", "Exposición."),
    act("pan", "¿Qué pan hace?", "neutro", "“Pan francés y facturas.”", "No orienta."),
  ],
  exam: [
    act("pulmon", "Auscultación", "clave", "Sibilancias espiratorias difusas.", "Obstrucción."),
    act("nariz", "Nariz", "clave", "Mucosa pálida y edematosa.", "Rinitis alérgica."),
    act("piel", "Piel", "util", "Sin eccema.", "Base."),
  ],
  studies: [
    study("Otros", "espirometria", "Espirometría con broncodilatador", "clave", "Obstrucción reversible (VEF1 +18 %).", "Asma."),
    study("Otros", "pef", "Registro seriado de flujo pico en el trabajo y fuera", "clave", "Caída del PEF en días laborales.", "Confirma relación laboral."),
    study("Laboratorio", "prick", "Prick test o IgE específica a harina", "util", "Positivo para trigo y alfa-amilasa.", "Sensibilización."),
    study("Imágenes", "tc", "TC de tórax", "innecesario", "No se realizó.", "No aporta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("asma-ocupacional", "Asma ocupacional por sensibilización a harina (asma del panadero)", true, "Asma de inicio adulto que mejora fuera del trabajo, PEF variable con la jornada y sensibilización a harina."),
      dx("asma-agravada", "Asma previa agravada por el trabajo", false, "No tenía asma antes."),
      dx("epoc", "EPOC", false, "Reversible y no fuma."),
      dx("nh", "Neumonitis por hipersensibilidad", false, "Obstrucción reversible sin intersticio."),
      dx("disfuncion-cuerdas", "Disfunción de cuerdas vocales", false, "Sibilancias espiratorias y espirometría típica."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cortar", "Cortar la exposición (reubicación laboral)", "clave", "Mejora el pronóstico."),
      mg("inhalados", "Corticoide inhalado con formoterol", "clave", "Control del asma."),
      mg("art", "Denuncia a la ART como enfermedad profesional", "clave", "Derecho laboral."),
      mg("rinitis", "Tratar la rinitis", "util", "Vía aérea única."),
      mg("seguir-igual", "Seguir trabajando con inhalador", "riesgoso", "Asma progresiva e irreversible."),
      mg("salbutamol-solo", "Solo salbutamol", "riesgoso", "Sin control de la inflamación."),
    ],
  },
  debrief: {
    diagnosis: "Asma ocupacional por sensibilización a harina (asma del panadero), en varón de 35 años.",
    pathologies: [
      { name: "Asma ocupacional", role: "principal", why: "Asma causada por el trabajo." },
      { name: "Rinitis ocupacional", role: "asociada", why: "Precede al asma." },
      { name: "EPOC, neumonitis", role: "diferencial", why: "Otras enfermedades laborales." },
    ],
    reasoning: [
      "Causa: inhalación de harina y enzimas.",
      "Mecanismo: sensibilización IgE e inflamación eosinofílica.",
      "Consecuencia: obstrucción variable que puede volverse permanente si sigue expuesto.",
    ],
    epidemiology:
      "El asma ocupacional explica una parte del asma de inicio adulto. Panaderos, peluqueros, trabajadores de la salud (látex) y pintores son grupos clásicos. El pronóstico mejora si se corta la exposición pronto.",
    management: [
      "Historia laboral.",
      "PEF seriado.",
      "Cortar exposición.",
      "Notificar.",
    ],
    sources: ["Superintendencia de Riesgos del Trabajo — Enfermedades profesionales respiratorias.", "GINA — Global Strategy for Asthma Management."],
    pearls: ["Mejor los fines de semana.", "Rinitis primero.", "PEF en el trabajo."],
    pitfalls: ["Solo inhaladores.", "No notificar."],
    tribunal: [
      qa("¿Qué diferencia hay entre asma ocupacional y agravada por el trabajo?", "La ocupacional es causada por el trabajo; la agravada es un asma previa que empeora con la exposición."),
      qa("¿Qué es el asma por irritantes (RADS)?", "Asma tras una exposición única y masiva a un irritante."),
      qa("¿Qué otros trabajos tienen riesgo?", "Peluquería, pintura con isocianatos, limpieza, salud (látex) y carpintería."),
    ],
  },
};
