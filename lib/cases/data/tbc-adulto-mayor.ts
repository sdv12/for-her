import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const tbcAdultoMayor: ClinicalCase = {
  id: "tbc-adulto-mayor",
  level: 3,
  area: "Infectología",
  setting: "Internación",
  patient: { age: 76, ageUnit: "años", sex: "M", context: "Viudo, vive en una pensión. Diabético. Internado por una 'neumonía' que no mejora tras 10 días de antibióticos." },
  frequency: "frecuente",
  intro: "La residente: “Sigue con fiebre por las tardes, tos y pérdida de peso. Ya pasó por dos esquemas antibióticos.”",
  vitals: { TA: "116/70 mmHg", FC: "92 lpm", FR: "20 rpm", "SatO₂": "94 %", "T°": "37,9 °C", Peso: "54 kg (bajó 8 kg)" },
  anamnesis: [
    act("tiempo", "¿Desde cuándo tose?", "clave", "“Hace como tres meses, pensé que era el cigarrillo.”", "Tos de más de 2 semanas: sintomático respiratorio."),
    act("constitucional", "¿Sudores nocturnos, falta de apetito?", "clave", "“Empapo la almohada.”", "Síntomas constitucionales."),
    act("contacto", "¿Alguien en la pensión con tos o tuberculosis?", "clave", "“Un compañero se fue tosiendo sangre.”", "Contacto."),
    act("previa", "¿Tuvo tuberculosis de joven?", "util", "“Me trataron de chico, no me acuerdo bien.”", "Reactivación."),
    act("hemoptisis", "¿Escupió sangre?", "util", "“Hilitos.”", "Cavitación."),
    act("mate", "¿Toma mate?", "neutro", "“Todo el día.”", "No orienta."),
  ],
  exam: [
    act("pulmon", "Auscultación", "clave", "Crepitantes en vértice derecho.", "Lóbulo superior."),
    act("nutricion", "Estado nutricional", "util", "Caquexia.", "Desgaste."),
    act("ganglios", "Ganglios", "util", "Sin adenopatías.", "Forma pulmonar."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de tórax", "clave", "Infiltrado con cavidad en lóbulo superior derecho.", "Típica de reactivación, aunque en mayores puede ser atípica."),
    study("Microbiología", "baciloscopia", "Baciloscopia de esputo x2 y cultivo", "clave", "BAAR positivo (++).", "Diagnóstico y contagiosidad."),
    study("Microbiología", "xpert", "PCR GeneXpert MTB/RIF", "clave", "M. tuberculosis detectado, sin resistencia a rifampicina.", "Confirma y descarta multirresistencia."),
    study("Laboratorio", "basales", "VIH, hepatograma, creatinina, HbA1c", "clave", "VIH negativo, HbA1c 9,2 %.", "Antes de tratar."),
    study("Otros", "ppd", "PPD para diagnosticar la enfermedad", "innecesario", "No se pidió.", "No sirve para diagnosticar enfermedad activa."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("tbc-pulmonar", "Tuberculosis pulmonar cavitada bacilífera, sensible a rifampicina, en adulto mayor diabético", true, "Tos de 3 meses, fiebre vespertina, sudores, pérdida de peso, cavidad apical, BAAR y GeneXpert positivos."),
      dx("nac-refractaria", "Neumonía bacteriana refractaria", false, "Evolución crónica y BAAR positivo."),
      dx("cancer", "Cáncer de pulmón", false, "Hay micobacteria; igual se controla la imagen."),
      dx("absceso", "Absceso de pulmón", false, "Sin aspiración ni esputo pútrido."),
      dx("micosis", "Paracoccidioidomicosis", false, "BAAR positivo."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("hrze", "Isoniazida, rifampicina, pirazinamida y etambutol 2 meses, luego isoniazida y rifampicina 4 meses", "clave", "Esquema estándar."),
      mg("aislamiento", "Aislamiento respiratorio hasta negativizar", "clave", "Bacilífero."),
      mg("piridoxina", "Piridoxina", "clave", "Prevención de neuropatía por isoniazida en diabéticos y mayores."),
      mg("contactos", "Estudio de contactos en la pensión y notificación", "clave", "Control de foco."),
      mg("tdo", "Tratamiento directamente observado", "util", "Adherencia."),
      mg("insulina", "Mejorar el control de la diabetes", "util", "Mejora la respuesta."),
      mg("quinolona", "Levofloxacina empírica para la 'neumonía'", "riesgoso", "Retrasa el diagnóstico y selecciona resistencias."),
      mg("dos-drogas", "Isoniazida y rifampicina solas desde el inicio", "riesgoso", "Riesgo de resistencia."),
    ],
  },
  debrief: {
    diagnosis: "Tuberculosis pulmonar cavitada bacilífera sensible, en un hombre de 76 años diabético que vive en una pensión.",
    pathologies: [
      { name: "Tuberculosis pulmonar", role: "principal", why: "Reactivación o reinfección." },
      { name: "Diabetes mal controlada", role: "asociada", why: "Triplica el riesgo de TBC." },
      { name: "Neumonía refractaria, cáncer", role: "diferencial", why: "Otras causas de infiltrado que no responde." },
    ],
    reasoning: [
      "Causa: Mycobacterium tuberculosis.",
      "Mecanismo: la inmunosenescencia y la diabetes reducen la inmunidad celular.",
      "Consecuencia: enfermedad cavitada contagiosa con presentación atípica en mayores.",
    ],
    epidemiology:
      "Argentina notifica más de 13.000 casos de tuberculosis por año y la incidencia aumenta. En adultos mayores la presentación es más inespecífica y el diagnóstico se demora; las fluoroquinolonas empíricas en neumonías pueden enmascararla.",
    management: [
      "Baciloscopia y GeneXpert en todo sintomático respiratorio.",
      "Esquema de 4 drogas.",
      "Aislamiento y contactos.",
      "Tratamiento observado.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía práctica para el diagnóstico y tratamiento de la tuberculosis.", "OMS — Consolidated guidelines on tuberculosis treatment."],
    pearls: ["Neumonía que no mejora: pedí BAAR.", "Diabetes + TBC: piridoxina.", "No uses quinolonas a ciegas."],
    pitfalls: ["Quinolonas empíricas.", "PPD para diagnosticar enfermedad."],
    tribunal: [
      qa("¿Qué es un sintomático respiratorio?", "Toda persona con tos y expectoración de más de 2 semanas, a quien se le debe pedir baciloscopia."),
      qa("¿Por qué no se usan fluoroquinolonas empíricas cuando se sospecha TBC?", "Porque mejoran transitoriamente la TBC, retrasan el diagnóstico y generan resistencia a una droga de segunda línea."),
      qa("¿Qué efectos adversos tiene cada droga del esquema?", "Isoniazida: hepatitis y neuropatía; rifampicina: hepatitis, interacciones y orina naranja; pirazinamida: hepatitis e hiperuricemia; etambutol: neuritis óptica."),
    ],
  },
};
