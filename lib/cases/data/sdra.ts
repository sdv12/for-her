import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const sdra: ClinicalCase = {
  id: "sdra-neumonia-grave",
  level: 4,
  area: "Respiratorio",
  setting: "Internación",
  patient: { age: 47, ageUnit: "años", sex: "F", context: "Obesa. Internada por neumonía grave por influenza hace 48 horas. Sin vacuna este año." },
  frequency: "poco-frecuente",
  intro: "La llaman de sala: “Está cada vez más agitada, satura mal aun con máscara con reservorio”.",
  vitals: { TA: "116/72 mmHg", FC: "122 lpm", FR: "38 rpm", "T°": "38,5 °C", "SatO₂": "84 %", Glasgow: "14/15" },
  anamnesis: [
    act("tiempo", "¿Cuándo empeoró?", "clave", "“En las últimas 24 horas.”", "Criterio de Berlín: inicio dentro de la semana del factor desencadenante."),
    act("cardiaco", "¿Tiene antecedente cardíaco o le dieron muchos líquidos?", "clave", "“Corazón sano; balance solo levemente positivo.”", "Se debe descartar que el edema sea cardiogénico."),
    act("factor", "¿Qué factor de riesgo tiene para daño pulmonar?", "clave", "“Neumonía grave viral.”", "La neumonía es la causa más frecuente de SDRA."),
    act("aspiracion", "¿Vomitó o aspiró?", "util", "“No.”", "Otra causa de SDRA."),
    act("preferencias", "¿Habló con la familia sobre sus deseos?", "util", "“Quieren todo.”", "Importante antes de intubar."),
    act("gustos", "¿Qué le gusta hacer?", "neutro", "“Cocinar.”", "No orienta."),
  ],
  exam: [
    act("trabajo", "Trabajo respiratorio", "clave", "Tiraje, uso de accesorios, no completa frases.", "Falla respiratoria inminente."),
    act("pulmon", "Auscultación", "clave", "Rales bilaterales difusos.", "Compromiso difuso."),
    act("volemia", "Signos de sobrecarga", "clave", "Sin ingurgitación yugular ni tercer ruido, sin edemas.", "Aleja el edema cardiogénico."),
  ],
  studies: [
    study("Laboratorio", "gases", "Gases arteriales", "clave", "pH 7,30, pCO₂ 48, pO₂ 58 con FiO₂ 0,8: PaFi 72.", "PaFi menor o igual a 100: SDRA grave."),
    study("Imágenes", "rx", "Radiografía de tórax", "clave", "Infiltrados alveolares bilaterales difusos.", "Criterio de Berlín."),
    study("Imágenes", "eco", "Ecocardiograma o ecografía a pie de cama", "clave", "Función del VI normal, líneas B difusas.", "Excluye causa cardíaca."),
    study("Laboratorio", "bnp", "BNP como único criterio para descartar edema", "innecesario", "Levemente elevado.", "Puede estar alto en enfermedad crítica y no excluye."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("sdra", "Síndrome de distrés respiratorio agudo grave por neumonía viral", true, "Inicio dentro de 7 días, infiltrados bilaterales, PaFi 72 y sin causa cardíaca."),
      dx("eap", "Edema agudo de pulmón cardiogénico", false, "Función del VI normal, sin sobrecarga."),
      dx("tep", "TEP masivo", false, "No explica infiltrados bilaterales difusos."),
      dx("epoc", "Exacerbación de EPOC", false, "No tiene antecedentes ni hiperinsuflación."),
      dx("nac-simple", "Solo progresión de neumonía sin SDRA", false, "Los criterios de Berlín se cumplen."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("arm", "Intubar y ventilar con protección pulmonar: volumen 6 ml/kg de peso ideal, presión meseta menor de 30", "clave", "Es la medida que más reduce la mortalidad."),
      mg("prono", "Decúbito prono si PaFi sigue menor de 150", "clave", "Reduce la mortalidad en SDRA grave."),
      mg("etiologico", "Oseltamivir, antibióticos si hay sobreinfección", "clave", "Trata la causa."),
      mg("conservador", "Manejo conservador de líquidos, sedación y relajación si es necesario", "clave", "Mejora la oxigenación."),
      mg("volumen-alto", "Volumen corriente de 10-12 ml/kg para mejorar la saturación", "riesgoso", "Produce volutrauma y aumenta la mortalidad."),
      mg("furosemida", "Tratarlo como edema cardiogénico con dosis altas de diurético", "riesgoso", "Puede causar hipoperfusión si no hay sobrecarga."),
    ],
  },
  debrief: {
    diagnosis: "SDRA grave (PaFi 72) secundario a neumonía por influenza en mujer de 47 años con obesidad.",
    pathologies: [
      { name: "SDRA", role: "principal", why: "Edema pulmonar por aumento de la permeabilidad." },
      { name: "Neumonía viral", role: "asociada", why: "Causa desencadenante." },
      { name: "Edema cardiogénico, TEP", role: "diferencial", why: "Otras causas de hipoxemia grave." },
    ],
    reasoning: [
      "Causa: lesión pulmonar directa por neumonía; también sepsis, aspiración, pancreatitis o trauma.",
      "Mecanismo: daño alveolo-capilar con edema rico en proteínas, membranas hialinas y colapso alveolar con cortocircuito.",
      "Consecuencia: hipoxemia refractaria, baja distensibilidad, falla respiratoria.",
    ],
    epidemiology:
      "Se presenta en cerca del 10 % de los pacientes de terapia intensiva y su mortalidad en formas graves ronda el 40 %. La neumonía y la sepsis son las principales causas. La vacunación antigripal reduce el riesgo en grupos como personas con obesidad.",
    management: [
      "Confirmar con criterios de Berlín.",
      "Ventilación protectora.",
      "Decúbito prono y relajación en formas graves.",
      "Tratar la causa y evitar sobrecarga de líquidos.",
    ],
    sources: ["Sociedad Argentina de Terapia Intensiva — Recomendaciones de SDRA.", "Definición de Berlín de SDRA."],
    pearls: ["Criterios de Berlín: tiempo, imagen, origen y oxigenación.", "6 ml/kg de peso ideal.", "PaFi menor de 150: prono."],
    pitfalls: ["Usar el peso real para calcular volumen.", "Sobrecargar de líquidos."],
    tribunal: [
      qa("¿Cuáles son los criterios de Berlín?", "Inicio dentro de la semana del insulto, infiltrados bilaterales, edema no explicado por falla cardíaca o sobrecarga, y PaFi menor o igual a 300 con PEEP de al menos 5."),
      qa("¿Cómo se clasifica por gravedad?", "Leve: PaFi 200 a 300. Moderado: 100 a 200. Grave: menor o igual a 100."),
      qa("¿Por qué se usa volumen corriente bajo?", "Porque el pulmón funcional es pequeño; volúmenes altos sobredistienden y producen volutrauma y biotrauma."),
    ],
  },
};
