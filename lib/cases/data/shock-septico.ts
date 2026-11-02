import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const shockSeptico: ClinicalCase = {
  id: "shock-septico-urinario",
  level: 3,
  area: "Infectología",
  setting: "Guardia",
  patient: { age: 76, ageUnit: "años", sex: "F", context: "Diabética. Vive en un geriátrico. Tiene sonda vesical desde hace un mes." },
  frequency: "frecuente",
  intro: "“Desde ayer está con fiebre, más dormida de lo normal y orina poco y feo. Hoy casi no responde.” (relata la enfermera del geriátrico)",
  vitals: { TA: "78/44 mmHg", FC: "124 lpm", FR: "28 rpm", "T°": "38,9 °C", "SatO₂": "93 %", Glucemia: "286 mg/dl", Glasgow: "12/15" },
  anamnesis: [
    act("foco", "¿Tuvo síntomas urinarios, tos o diarrea? ¿Cómo está la sonda?", "clave", "“La orina está turbia y con olor, la sonda no se cambió.”", "Foco urinario asociado a sonda: el más probable."),
    act("atb", "¿Recibió antibióticos o estuvo internada en los últimos 3 meses?", "clave", "“Tomó ciprofloxacina el mes pasado.”", "Riesgo de gérmenes resistentes: orienta el antibiótico empírico."),
    act("alergias", "¿Es alérgica a algún medicamento?", "clave", "“No.”", "Necesario antes del antibiótico."),
    act("directivas", "¿Tiene directivas anticipadas o un familiar de referencia?", "util", "“La hija, ya la llamamos.”", "Importa para decisiones de terapia intensiva."),
    act("basal", "¿Cómo está habitualmente? ¿Camina, habla?", "util", "“Camina con andador y conversa.”", "Estado funcional previo bueno: candidata a tratamiento completo."),
    act("comida", "¿Qué comió ayer?", "neutro", "“Sopa y puré.”", "No orienta."),
  ],
  exam: [
    act("perfusion", "Perfusión periférica", "clave", "Piel moteada en rodillas, relleno capilar 5 s, extremidades frías.", "Hipoperfusión tisular."),
    act("conciencia", "Estado de conciencia", "clave", "Somnolienta, responde al llamado.", "Disfunción neurológica por sepsis."),
    act("abdomen", "Abdomen, flancos y sonda", "clave", "Puño percusión dolorosa a la derecha, orina purulenta en la bolsa.", "Foco urinario alto."),
    act("pulmon", "Auscultación pulmonar", "util", "Sin rales.", "Descarta foco respiratorio."),
    act("piel", "Piel, úlceras por presión", "util", "Sin úlceras.", "Descarta otro foco."),
  ],
  studies: [
    study("Laboratorio", "lactato", "Lactato", "clave", "4,8 mmol/l.", "Mayor de 2 con hipotensión que requiere vasopresores: shock séptico."),
    study("Microbiología", "hemocultivos", "Dos hemocultivos y urocultivo (de sonda nueva) antes del antibiótico, sin demorarlo", "clave", "Pendientes.", "Permiten ajustar el tratamiento."),
    study("Laboratorio", "lab", "Hemograma, creatinina, bilirrubina, plaquetas, coagulograma, gases", "clave", "Leucocitos 21.000, creatinina 2,4, plaquetas 98.000, pH 7,28.", "Disfunción renal y hematológica: puntaje SOFA."),
    study("Imágenes", "eco", "Ecografía renal", "util", "Riñón derecho sin dilatación.", "Descarta obstrucción que requiera drenaje (control del foco)."),
    study("Imágenes", "tc", "Tomografía antes de iniciar el antibiótico", "riesgoso", "No se realizó.", "Cada hora de demora en el antibiótico aumenta la mortalidad."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("shock", "Shock séptico de foco urinario asociado a sonda, con disfunción renal, hematológica y neurológica", true, "Infección urinaria con hipotensión, lactato mayor de 2, hipoperfusión y disfunción de órganos, en adulta mayor con sonda."),
      dx("itu-simple", "Infección urinaria sin sepsis", false, "Hay hipotensión, hipoperfusión y disfunción de órganos."),
      dx("hipovolemico", "Shock hipovolémico por deshidratación", false, "Hay fiebre, foco infeccioso y leucocitosis."),
      dx("cardiogenico", "Shock cardiogénico", false, "Extremidades frías por hipoperfusión, pero sin congestión y con foco claro."),
      dx("ehh", "Estado hiperosmolar hiperglucémico", false, "La glucemia es 286: no alcanza; la hiperglucemia es por estrés."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("atb", "Antibiótico de amplio espectro EV en la primera hora (por ejemplo, piperacilina-tazobactam o carbapenem según riesgo de resistencia)", "clave", "Es la intervención que más reduce la mortalidad."),
      mg("fluidos", "Cristaloides 30 ml/kg en las primeras 3 horas, reevaluando la respuesta", "clave", "Restaura la volemia y la perfusión."),
      mg("vasopresor", "Noradrenalina para PAM de 65 mmHg o más si persiste la hipotensión", "clave", "Vasopresor de primera elección."),
      mg("sonda", "Cambiar la sonda vesical (control del foco)", "clave", "La sonda colonizada mantiene la infección."),
      mg("uti", "Internación en terapia intensiva, control de diuresis y lactato", "util", "Monitoreo de la respuesta."),
      mg("esperar-cultivo", "Esperar el resultado del urocultivo para elegir el antibiótico", "riesgoso", "La demora es mortal."),
    ],
  },
  debrief: {
    diagnosis: "Shock séptico de foco urinario (pielonefritis asociada a sonda vesical) con disfunción renal, hematológica y neurológica, en mujer diabética de 76 años institucionalizada.",
    pathologies: [
      { name: "Shock séptico", role: "principal", why: "Sepsis con hipotensión que requiere vasopresores y lactato mayor de 2." },
      { name: "Infección urinaria asociada a sonda", role: "asociada", why: "Foco de la sepsis." },
      { name: "Shock hipovolémico o cardiogénico", role: "diferencial", why: "Otros tipos de shock." },
    ],
    reasoning: [
      "Causa: infección urinaria por bacterias gram negativas, favorecida por la sonda, la diabetes y la edad.",
      "Mecanismo: respuesta desregulada del huésped con liberación de mediadores que producen vasodilatación, aumento de la permeabilidad y disfunción microcirculatoria y mitocondrial.",
      "Consecuencia: hipotensión, hipoperfusión, acidosis láctica y falla de órganos (riñón, cerebro, coagulación).",
    ],
    epidemiology:
      "La sepsis es una de las principales causas de muerte en el mundo y en terapia intensiva; el shock séptico tiene una mortalidad de más del 40 %. Los adultos mayores, inmunodeprimidos, diabéticos y personas con dispositivos (sondas, catéteres) tienen mayor riesgo; el foco urinario es frecuente en mujeres mayores.",
    management: [
      "Reconocimiento precoz (qSOFA, lactato) y paquete de la primera hora.",
      "Cultivos y antibiótico de amplio espectro en la primera hora.",
      "Fluidos 30 ml/kg y noradrenalina si persiste la hipotensión.",
      "Control del foco (retirar sondas, drenar colecciones) y ajuste según cultivos.",
    ],
    sources: ["Sociedad Argentina de Terapia Intensiva — Recomendaciones sobre sepsis y shock séptico.", "Surviving Sepsis Campaign — Guías internacionales."],
    pearls: ["Antibiótico en la primera hora.", "Shock séptico = vasopresor + lactato mayor de 2.", "Cambiar la sonda."],
    pitfalls: ["Esperar los cultivos.", "Atribuir la confusión a la edad."],
    tribunal: [
      qa("¿Cómo se define sepsis y shock séptico (Sepsis-3)?", "Sepsis es una disfunción orgánica que amenaza la vida, causada por una respuesta desregulada a una infección (aumento de 2 o más puntos del SOFA). Shock séptico es la sepsis que requiere vasopresores para mantener una PAM de 65 mmHg o más y tiene lactato mayor de 2 mmol/l pese a una reanimación adecuada con fluidos."),
      qa("¿Qué es el qSOFA?", "Una herramienta rápida fuera de la terapia intensiva: frecuencia respiratoria de 22 o más, alteración de la conciencia y presión sistólica de 100 o menos; 2 o más puntos indican mayor riesgo de mala evolución, aunque no se usa sola para diagnosticar."),
      qa("¿Cuál es el vasopresor de elección en el shock séptico?", "La noradrenalina; si no alcanza se suma vasopresina, y se consideran corticoides (hidrocortisona) en el shock refractario."),
    ],
  },
};
