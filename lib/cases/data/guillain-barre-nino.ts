import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const guillainBarreNino: ClinicalCase = {
  id: "guillain-barre-nino",
  level: 3,
  area: "Neurología",
  setting: "Guardia",
  patient: { age: 6, ageUnit: "años", sex: "F", context: "Hace 2 semanas tuvo diarrea con sangre. Vacunas completas. La trae la mamá." },
  frequency: "poco-frecuente",
  intro: "“Desde hace tres días camina raro, se cae, dice que le duelen las piernas y hoy no se puede levantar del piso.”",
  vitals: { TA: "112/70 mmHg", FC: "118 lpm", FR: "24 rpm", "T°": "36,7 °C", "SatO₂": "97 %", Peso: "21 kg" },
  anamnesis: [
    act("infeccion", "¿Estuvo enferma antes?", "clave", "“Diarrea con sangre hace dos semanas.”", "Campylobacter: desencadenante."),
    act("progresion", "¿Cómo avanzó la debilidad?", "clave", "“Empezó en los pies y ahora le cuesta levantar los brazos.”", "Ascendente."),
    act("respirar", "¿Le cuesta respirar, tragar o hablar?", "clave", "“No.”", "Gravedad."),
    act("orina", "¿Hace pis bien?", "util", "“Sí.”", "Compromiso medular."),
    act("dolor", "¿Le duele algo?", "util", "“Las piernas y la cintura.”", "Dolor radicular frecuente en niños."),
    act("juego", "¿Qué le gusta?", "neutro", "“La plaza.”", "No orienta."),
  ],
  exam: [
    act("fuerza", "Fuerza y reflejos", "clave", "Debilidad simétrica de miembros inferiores mayor que superiores, arreflexia.", "Polirradiculoneuropatía."),
    act("sensibilidad", "Sensibilidad y nivel", "clave", "Sin nivel sensitivo.", "No es medular."),
    act("autonomico", "Signos autonómicos", "util", "Taquicardia.", "Disautonomía."),
  ],
  studies: [
    study("Laboratorio", "lcr", "Punción lumbar", "clave", "Proteínas 140, 2 células.", "Disociación albúmino-citológica."),
    study("Otros", "emg", "Electromiograma", "util", "Patrón axonal motor.", "Variante axonal."),
    study("Otros", "cv", "Capacidad vital seriada o conteo", "clave", "Normal por ahora.", "Vigilancia respiratoria."),
    study("Imágenes", "rm-urgente-sin", "Esperar RM de médula para iniciar tratamiento sin dudas clínicas", "innecesario", "No se esperó.", "No cambia el manejo con clínica típica."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("gbs", "Síndrome de Guillain-Barré (variante axonal) postinfeccioso", true, "Debilidad ascendente simétrica con arreflexia tras diarrea, disociación albúmino-citológica."),
      dx("mielitis", "Mielitis transversa", false, "Sin nivel sensitivo ni vejiga."),
      dx("miositis", "Miositis viral", false, "Arreflexia y LCR típico."),
      dx("botulismo", "Botulismo", false, "Descendente y sin dolor."),
      dx("paralisis-garrapata", "Parálisis por garrapata", false, "No se encontró garrapata."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("ivig", "Inmunoglobulina EV", "clave", "Acelera la recuperación si no camina."),
      mg("monitoreo", "Internación con monitoreo respiratorio y autonómico", "clave", "Riesgo de falla."),
      mg("notificar", "Notificar como parálisis flácida aguda y tomar materia fecal para polio", "clave", "Vigilancia epidemiológica."),
      mg("rehabilitacion", "Kinesiología y analgesia", "util", "Recuperación."),
      mg("corticoides", "Corticoides", "riesgoso", "No sirven en Guillain-Barré."),
      mg("alta", "Alta con control", "riesgoso", "Progresión impredecible."),
    ],
  },
  debrief: {
    diagnosis: "Síndrome de Guillain-Barré, variante axonal motora, postinfeccioso, en niña de 6 años.",
    pathologies: [
      { name: "Guillain-Barré", role: "principal", why: "Polirradiculoneuropatía inmune aguda." },
      { name: "Antecedente de Campylobacter", role: "asociada", why: "Mimetismo molecular." },
      { name: "Mielitis, botulismo", role: "diferencial", why: "Otras parálisis flácidas." },
    ],
    reasoning: [
      "Causa: infección previa que desencadena autoinmunidad.",
      "Mecanismo: anticuerpos contra gangliósidos de los nervios.",
      "Consecuencia: debilidad ascendente, arreflexia y riesgo respiratorio.",
    ],
    epidemiology:
      "Es la causa más frecuente de parálisis flácida aguda en niños desde la eliminación de la polio. Toda parálisis flácida en menores de 15 años se notifica para la vigilancia de polio. El dolor puede dominar y confundir el cuadro.",
    management: [
      "Sospecha.",
      "LCR.",
      "Inmunoglobulina.",
      "Notificar PFA.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Parálisis flácida aguda.", "Ministerio de Salud de la Nación — Vigilancia de parálisis flácida aguda."],
    pearls: ["Arreflexia.", "Notificá la PFA.", "Vigilá la respiración."],
    pitfalls: ["Corticoides.", "Confundir con dolor muscular."],
    tribunal: [
      qa("¿Qué es la disociación albúmino-citológica?", "Proteínas altas en el LCR con células normales."),
      qa("¿Por qué se notifica toda parálisis flácida aguda?", "Para la vigilancia de poliomielitis."),
      qa("¿Qué germen se asocia a la variante axonal?", "Campylobacter jejuni."),
    ],
  },
};
