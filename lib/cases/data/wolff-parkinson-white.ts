import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const wolffParkinsonWhite: ClinicalCase = {
  id: "wolff-parkinson-white",
  level: 3,
  area: "Cardiovascular",
  setting: "Guardia",
  patient: { age: 19, ageUnit: "años", sex: "M", context: "Jugador de básquet. Tuvo palpitaciones breves desde la adolescencia." },
  frequency: "poco-frecuente",
  intro: "“Estaba entrenando y empezó a latirme el corazón muy rápido y desordenado. Me mareo.”",
  vitals: { TA: "104/66 mmHg", FC: "236 lpm", FR: "22 rpm", "T°": "36,6 °C", "SatO₂": "97 %" },
  anamnesis: [
    act("episodios", "¿Pasó antes? ¿Cómo terminaban?", "clave", "“Breves, se iban solos.”", "Arritmias previas."),
    act("sincope", "¿Te desmayaste? ¿Dolor de pecho?", "clave", "“Casi me desmayo.”", "Riesgo."),
    act("familia", "¿Muerte súbita en la familia?", "clave", "“No.”", "Otras causas hereditarias."),
    act("estimulantes", "¿Energizantes, cocaína?", "util", "“Energizante.”", "Gatillo."),
    act("medicacion", "¿Tomaste algo?", "util", "“No.”", "Base."),
    act("posicion", "¿Qué posición jugás?", "neutro", "“Base.”", "No orienta."),
  ],
  exam: [
    act("pulso", "Pulso", "clave", "Muy rápido e irregular.", "Fibrilación auricular."),
    act("hemodinamia", "Estabilidad", "clave", "Lúcido, presión aceptable, sin dolor.", "Estable por ahora."),
    act("general", "Corazón y pulmón", "util", "Sin congestión.", "Base."),
  ],
  studies: [
    study("Electrofisiología", "ecg", "ECG de 12 derivaciones", "clave", "Taquicardia irregular de QRS ancho y cambiante, hasta 260 lpm.", "FA preexcitada."),
    study("Laboratorio", "lab", "Ionograma, magnesio, TSH, troponina", "clave", "Normales.", "Factores."),
    study("Electrofisiología", "ecg-sinusal", "ECG tras revertir", "clave", "PR corto, onda delta.", "Confirma preexcitación."),
    study("Imágenes", "eco", "Ecocardiograma", "util", "Normal.", "Excluye Ebstein."),
    study("Otros", "adenosina", "Adenosina para ver el ritmo", "riesgoso", "No se realizó.", "Puede precipitar fibrilación ventricular."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("wpw", "Fibrilación auricular preexcitada por síndrome de Wolff-Parkinson-White", true, "QRS ancho irregular muy rápido y onda delta tras revertir."),
      dx("tv", "Taquicardia ventricular", false, "Es irregular con QRS cambiante."),
      dx("fa-aberrancia", "FA con bloqueo de rama", false, "La frecuencia y el QRS variable sugieren vía accesoria."),
      dx("tsv", "Taquicardia supraventricular por reentrada", false, "Es regular."),
      dx("sinusal", "Taquicardia sinusal", false, "Frecuencia y patrón."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cardioversion", "Cardioversión eléctrica si se inestabiliza", "clave", "Primera opción en inestabilidad."),
      mg("procainamida", "Procainamida o amiodarona según disponibilidad si está estable", "clave", "Enlentece la vía accesoria."),
      mg("ablacion", "Ablación por catéter de la vía accesoria", "clave", "Curativa."),
      mg("deporte", "Suspender el deporte hasta la ablación", "util", "Riesgo de muerte súbita."),
      mg("bloqueantes", "Verapamilo, diltiazem, digoxina o adenosina", "riesgoso", "Favorecen la conducción por la vía y fibrilación ventricular."),
      mg("alta", "Alta si revierte", "riesgoso", "Necesita ablación."),
    ],
  },
  debrief: {
    diagnosis: "Fibrilación auricular preexcitada por síndrome de Wolff-Parkinson-White, en varón de 19 años.",
    pathologies: [
      { name: "Síndrome de WPW", role: "principal", why: "Vía accesoria con arritmias." },
      { name: "Riesgo de muerte súbita", role: "asociada", why: "Fibrilación ventricular." },
      { name: "TV, FA con aberrancia, TSV", role: "diferencial", why: "Otras taquicardias." },
    ],
    reasoning: [
      "Causa: vía accesoria congénita (haz de Kent).",
      "Mecanismo: los impulsos llegan al ventrículo sin el freno del nódulo.",
      "Consecuencia: frecuencias muy altas que pueden degenerar en fibrilación ventricular.",
    ],
    epidemiology:
      "La preexcitación aparece en cerca de 1 a 3 cada 1.000 personas. La mayoría tiene buen pronóstico, pero la FA preexcitada puede causar muerte súbita en deportistas jóvenes. La ablación es curativa en la gran mayoría.",
    management: [
      "ECG.",
      "Evitar bloqueantes del nodo.",
      "Cardioversión o procainamida.",
      "Ablación.",
    ],
    sources: ["Sociedad Argentina de Cardiología — Consenso de arritmias.", "ESC — Guidelines on Supraventricular Tachycardia."],
    pearls: ["PR corto con onda delta.", "FA con QRS ancho irregular: no bloquear el nodo.", "Ablación curativa."],
    pitfalls: ["Dar adenosina o verapamilo.", "Alta sin ablación."],
    tribunal: [
      qa("¿Cuál es la tríada electrocardiográfica de WPW?", "PR corto, onda delta y QRS ensanchado."),
      qa("¿Qué taquicardia es más frecuente en WPW?", "La taquicardia por reentrada auriculoventricular ortodrómica."),
      qa("¿Qué anomalía congénita se asocia?", "La anomalía de Ebstein."),
    ],
  },
};
