import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const ait: ClinicalCase = {
  id: "accidente-isquemico-transitorio",
  level: 2,
  area: "Neurología",
  setting: "Guardia",
  patient: { age: 69, ageUnit: "años", sex: "M", context: "Hipertenso, diabético y tabaquista. Mal adherente. Sin antiagregantes." },
  frequency: "frecuente",
  intro: "“Hace una hora se me durmió el brazo derecho y no me salían las palabras. Duró como 40 minutos. Ahora estoy bien, ¿me puedo ir?”",
  vitals: { TA: "168/94 mmHg", FC: "78 lpm", FR: "16 rpm", "T°": "36,4 °C", "SatO₂": "97 %", Glucemia: "148 mg/dl", Glasgow: "15/15" },
  anamnesis: [
    act("duracion", "¿Cuánto duró y cómo empezó?", "clave", "“De golpe, 40 minutos.”", "Déficit súbito y reversible: criterio del AIT; de 10 a 59 minutos en ABCD2."),
    act("positivos", "¿Fue pérdida de fuerza o hormigueo que avanzaba, con luces?", "clave", "“No, fue pérdida, y sin dolor de cabeza.”", "Síntomas negativos: AIT. Los positivos sugieren migraña o crisis."),
    act("vista", "¿Perdiste la vista de un ojo como una cortina?", "clave", "“Hace una semana, unos minutos.”", "Amaurosis fugaz: sospecha carotídea."),
    act("palpitaciones", "¿Palpitaciones?", "util", "“A veces.”", "Buscar fibrilación auricular."),
    act("anticoag", "¿Qué medicación tomás?", "util", "“Enalapril cuando me acuerdo, metformina.”", "Mala adherencia."),
    act("nieto", "¿Tenés nietos?", "neutro", "“Tres.”", "No orienta."),
  ],
  exam: [
    act("neuro", "Examen neurológico completo", "clave", "Normal.", "El déficit resolvió."),
    act("carotidas", "Auscultación carotídea", "clave", "Soplo carotídeo izquierdo.", "Sugiere estenosis."),
    act("cardiaco", "Pulso y auscultación cardíaca", "util", "Regular, sin soplos.", "Buscar fuente cardioembólica."),
  ],
  studies: [
    study("Imágenes", "imagen", "Imágenes de encéfalo urgentes (RM con difusión o TC)", "clave", "Sin lesión en la difusión, TC sin sangrado.", "Excluye otras causas; define AIT tisular."),
    study("Imágenes", "vasos", "Doppler de vasos de cuello o angioTC", "clave", "Estenosis de 80 % de la carótida interna izquierda.", "Cambia el tratamiento: endarterectomía."),
    study("Electrofisiología", "ecg", "ECG y monitoreo de ritmo", "clave", "Ritmo sinusal.", "Busca FA."),
    study("Laboratorio", "lab", "Glucemia, lípidos, hemograma", "util", "LDL 152, HbA1c 8,2.", "Factores de riesgo."),
    study("Imágenes", "eeg", "EEG de rutina", "innecesario", "No se realizó.", "No es una crisis."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("ait", "Accidente isquémico transitorio por estenosis carotídea izquierda significativa (alto riesgo)", true, "Déficit focal súbito y reversible de hemisferio izquierdo, amaurosis previa, soplo y estenosis del 80 %."),
      dx("migrana", "Aura migrañosa", false, "Los síntomas positivos progresan, sin factores vasculares en ese contexto."),
      dx("hipoglucemia", "Hipoglucemia", false, "Glucemia normal-alta."),
      dx("crisis", "Crisis focal con parálisis de Todd", false, "Sin movimientos ni confusión posterior."),
      dx("acv", "ACV establecido", false, "Resolvió sin lesión en imágenes."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("internar", "Evaluación urgente, sin alta sin estudio", "clave", "El riesgo de ACV es mayor en las primeras 48 horas."),
      mg("daap", "Aspirina y clopidogrel por 21 días (AIT de alto riesgo), más estatina de alta intensidad", "clave", "Reduce el ACV temprano."),
      mg("endarterectomia", "Derivar para endarterectomía carotídea en menos de 2 semanas", "clave", "Estenosis sintomática de 70 a 99 %: beneficio alto."),
      mg("habitos", "Controlar presión, diabetes y tabaco", "clave", "Prevención secundaria."),
      mg("alta", "Alta y control en un mes porque ya está bien", "riesgoso", "Puede tener un ACV en los días siguientes."),
      mg("trombolisis", "Trombólisis", "riesgoso", "El déficit resolvió: no hay indicación."),
    ],
  },
  debrief: {
    diagnosis: "AIT hemisférico izquierdo de alto riesgo por estenosis del 80 % de la carótida interna izquierda, en varón de 69 años.",
    pathologies: [
      { name: "Accidente isquémico transitorio", role: "principal", why: "Isquemia focal transitoria sin infarto." },
      { name: "Estenosis carotídea", role: "asociada", why: "Fuente embólica." },
      { name: "Migraña, crisis, hipoglucemia", role: "diferencial", why: "Simuladores." },
    ],
    reasoning: [
      "Causa: aterosclerosis de la bifurcación carotídea por HTA, diabetes y tabaco.",
      "Mecanismo: émbolos de la placa o bajo flujo producen isquemia transitoria.",
      "Consecuencia: déficit reversible; riesgo alto de ACV en días.",
    ],
    epidemiology:
      "Cerca de 1 de cada 10 personas con AIT tiene un ACV en los 90 días, y la mitad, en las primeras 48 horas. Es una ventana para prevenir. El tratamiento urgente reduce ese riesgo hasta un 80 %.",
    management: [
      "Tratar como urgencia.",
      "Imágenes de encéfalo y vasos, ECG.",
      "Antiagregación doble si es de alto riesgo, estatina y control de factores.",
      "Endarterectomía si hay estenosis significativa; anticoagular si hay FA.",
    ],
    sources: ["Sociedad Neurológica Argentina — Recomendaciones de AIT y ACV.", "American Heart Association — Guía de prevención secundaria de ACV."],
    pearls: ["“Ya se me pasó” no es alta.", "ABCD2 de 4 o más: alto riesgo.", "Amaurosis fugaz: es la carótida ipsilateral."],
    pitfalls: ["Dar el alta sin estudiar.", "No mirar el cuello."],
    tribunal: [
      qa("¿Qué es el ABCD2?", "Un puntaje con edad (60 o más), presión (140/90 o más), clínica (debilidad 2, habla 1), duración (60 minutos o más 2; 10-59 minutos 1) y diabetes (1). Estima el riesgo de ACV."),
      qa("¿Cuál es la definición actual de AIT?", "Un episodio transitorio de disfunción neurológica por isquemia focal, sin infarto agudo en las imágenes."),
      qa("¿Cuándo se indica endarterectomía?", "En estenosis sintomática de 70 a 99 % con buen estado; se considera de 50 a 69 % según el caso, idealmente en menos de 2 semanas."),
    ],
  },
};
