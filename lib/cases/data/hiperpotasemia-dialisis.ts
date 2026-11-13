import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hiperpotasemiaDialisis: ClinicalCase = {
  id: "hiperpotasemia-hemodialisis",
  level: 3,
  area: "Nefrourología",
  setting: "Guardia",
  patient: { age: 45, ageUnit: "años", sex: "M", context: "Hemodiálisis lunes, miércoles y viernes por nefropatía diabética. Faltó a la sesión del viernes. Es lunes a la mañana." },
  frequency: "frecuente",
  intro: "“Tengo las piernas flojas, hormigueo y siento el corazón raro. El fin de semana comí asado y mucha fruta.”",
  vitals: { TA: "168/96 mmHg", FC: "48 lpm", FR: "22 rpm", "T°": "36,4 °C", "SatO₂": "93 %", Peso: "84 kg (seco 80)" },
  anamnesis: [
    act("dialisis", "¿Cuándo fue la última diálisis?", "clave", "“El miércoles.”", "Cinco días sin diálisis."),
    act("dieta", "¿Qué comió?", "clave", "“Asado, bananas y naranjas.”", "Carga de potasio."),
    act("debilidad", "¿Debilidad o falta de aire?", "clave", "“Flojo de piernas y me agito.”", "Hiperpotasemia y sobrecarga."),
    act("farmacos", "¿Toma enalapril o espironolactona?", "util", "“Enalapril.”", "Retiene potasio."),
    act("orina", "¿Orina algo?", "util", "“Casi nada.”", "Anúrico."),
    act("trabajo", "¿Trabaja?", "neutro", "“Hago changas de electricista.”", "No orienta."),
  ],
  exam: [
    act("fuerza", "Fuerza muscular", "clave", "Debilidad proximal de miembros inferiores.", "Hiperpotasemia."),
    act("congestion", "Volemia", "clave", "Rales bibasales, edemas.", "Sobrecarga."),
    act("fistula", "Fístula arteriovenosa", "util", "Con frémito.", "Acceso disponible."),
  ],
  studies: [
    study("Electrofisiología", "ecg", "ECG inmediato", "clave", "T picudas, PR largo, QRS ancho de 140 ms, bradicardia.", "Hiperpotasemia grave con cambios."),
    study("Laboratorio", "ionograma", "Potasio, gases, urea", "clave", "K 7,6; pH 7,26; urea 240.", "Grave."),
    study("Imágenes", "rx", "Radiografía de tórax", "util", "Congestión leve.", "Sobrecarga."),
    study("Laboratorio", "repetir-k", "Repetir el potasio antes de tratar", "riesgoso", "No se esperó.", "Hay cambios en el ECG: tratar ya."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hiperk", "Hiperpotasemia grave con cambios electrocardiográficos por omisión de hemodiálisis y transgresión dietaria", true, "K 7,6 con QRS ancho, debilidad y cinco días sin diálisis."),
      dx("pseudohiperk", "Pseudohiperpotasemia por hemólisis", false, "El ECG confirma la hiperpotasemia real."),
      dx("bloqueo", "Bloqueo AV por betabloqueantes", false, "No toma y el potasio explica el ECG."),
      dx("guillain", "Guillain-Barré", false, "Causa metabólica clara."),
      dx("eap", "Edema agudo de pulmón aislado", false, "La hiperpotasemia es lo que amenaza la vida."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("calcio", "Gluconato de calcio EV con monitor", "clave", "Estabiliza la membrana en minutos."),
      mg("insulina", "Insulina con dextrosa y salbutamol nebulizado", "clave", "Introducen potasio a la célula."),
      mg("dialisis", "Hemodiálisis urgente", "clave", "Único modo de eliminarlo en anúricos."),
      mg("dieta", "Educación sobre dieta y adherencia a la diálisis", "util", "Prevención."),
      mg("furosemida", "Furosemida como tratamiento principal", "riesgoso", "Anúrico: no elimina potasio."),
      mg("solo-resinas", "Solo resinas de intercambio", "riesgoso", "Actúan en horas; no alcanzan."),
    ],
  },
  debrief: {
    diagnosis: "Hiperpotasemia grave con cambios electrocardiográficos y sobrecarga de volumen por omisión de hemodiálisis y transgresión dietaria, en varón de 45 años.",
    pathologies: [
      { name: "Hiperpotasemia grave", role: "principal", why: "Riesgo de paro cardíaco." },
      { name: "Sobrecarga de volumen y acidosis", role: "asociada", why: "Falta de diálisis." },
      { name: "Pseudohiperpotasemia, bloqueo", role: "diferencial", why: "Otras explicaciones." },
    ],
    reasoning: [
      "Causa: falta de diálisis, dieta rica en potasio e IECA.",
      "Mecanismo: el potasio extracelular alto despolariza las membranas y enlentece la conducción.",
      "Consecuencia: debilidad, arritmias y paro.",
    ],
    epidemiology:
      "La hiperpotasemia es la causa principal de muerte súbita en pacientes en hemodiálisis, sobre todo después del intervalo largo del fin de semana. La adherencia a la diálisis y a la dieta es clave.",
    management: [
      "ECG.",
      "Calcio.",
      "Desplazar potasio.",
      "Diálisis.",
    ],
    sources: ["Sociedad Argentina de Nefrología — Trastornos del potasio.", "KDIGO — Controversies Conference on Potassium Management."],
    pearls: ["ECG antes que el laboratorio.", "Calcio protege, no baja el potasio.", "Lunes después de faltar."],
    pitfalls: ["Esperar otro potasio.", "Furosemida en anúrico."],
    tribunal: [
      qa("¿En qué orden aparecen los cambios del ECG?", "T picudas, PR largo, pérdida de onda P, QRS ancho y onda sinusoidal."),
      qa("¿Cuánto dura el efecto de la insulina?", "Empieza en 15 minutos y dura 4 a 6 horas; hay que vigilar la glucemia."),
      qa("¿Qué nuevos quelantes de potasio hay?", "Patirómero y ciclosilicato de sodio y zirconio."),
    ],
  },
};
