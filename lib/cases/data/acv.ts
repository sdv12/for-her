import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const acv: ClinicalCase = {
  id: "acv-isquemico-ventana",
  level: 3,
  area: "Neurología",
  setting: "Guardia",
  patient: { age: 69, ageUnit: "años", sex: "F", context: "La trae el marido en ambulancia." },
  frequency: "frecuente",
  intro: "“Estábamos almorzando y de golpe se le torció la boca, se le cayó el tenedor de la mano derecha y empezó a hablar raro. Fue hace una hora.”",
  vitals: { TA: "178/96 mmHg", FC: "92 lpm, irregular", FR: "18 rpm", "T°": "36,5 °C", "SatO₂": "96 %", Glucemia: "128 mg/dl (capilar)" },
  anamnesis: [
    act("hora", "¿A qué hora exacta la vieron bien por última vez?", "clave", "“A las 13 en punto estaba bien, nos sentamos a comer. A las 13:10 empezó.”", "La hora de inicio (o la última vez que se la vio normal) define si está en ventana para trombólisis (4,5 h) o trombectomía (hasta 6–24 h según imágenes)."),
    act("anticoagulantes", "¿Toma anticoagulantes o antiagregantes?", "clave", "“No, solo pastillas para la presión.”", "Los anticoagulantes cambian el riesgo de sangrado y pueden contraindicar la trombólisis."),
    act("contraindicaciones", "¿Tuvo cirugías, sangrados, golpes en la cabeza o un ACV en los últimos 3 meses?", "clave", "“No, nada.”", "Son contraindicaciones para trombolizar."),
    act("palpitaciones", "¿Tiene palpitaciones o le dijeron que tenía arritmia?", "util", "“A veces dice que el corazón se le acelera.”", "La fibrilación auricular es causa frecuente de ACV cardioembólico."),
    act("convulsion", "¿Tuvo una convulsión antes de esto?", "util", "“No.”", "Una parálisis posconvulsiva (de Todd) puede imitar un ACV."),
    act("diabetes", "¿Es diabética?", "util", "“No.”", "La hipoglucemia es un imitador de ACV y siempre se descarta con glucemia capilar."),
    act("gustos", "¿Qué estaban comiendo?", "neutro", "“Milanesas.”", "No orienta."),
  ],
  exam: [
    act("fast", "Escala prehospitalaria (cara, brazo, habla)", "clave", "Desviación de la comisura labial a la derecha (parálisis facial central derecha), caída del brazo derecho, habla alterada.", "Cara, brazo y habla positivos: alta probabilidad de ACV, activar el código ACV."),
    act("nihss", "Escala NIHSS completa", "clave", "NIHSS 11: paresia facial derecha, paresia braquial y crural derecha, afasia mixta moderada, sin compromiso de conciencia.", "Cuantifica la gravedad, guía la trombólisis y permite seguir la evolución."),
    act("cardio", "Auscultación cardíaca y pulso", "clave", "Ritmo irregular, sin soplos.", "Ritmo irregularmente irregular: sospecha de fibrilación auricular."),
    act("cuello", "Auscultación carotídea", "util", "Sin soplos.", "Orienta a enfermedad carotídea, aunque su ausencia no la descarta."),
    act("fondo", "Fondo de ojo", "innecesario", "No se realizó.", "No aporta en la urgencia y demora la imagen."),
  ],
  studies: [
    study("Imágenes", "tc", "Tomografía de cerebro sin contraste (urgente)", "clave", "Sin hemorragia. Signos tempranos mínimos en territorio de la arteria cerebral media izquierda (ASPECTS 9).", "Descarta hemorragia, el paso indispensable antes de trombolizar."),
    study("Imágenes", "angio", "Angiotomografía de vasos de cuello e intracraneales", "util", "Oclusión del segmento M1 de la arteria cerebral media izquierda.", "Detecta oclusión de gran vaso: candidata a trombectomía mecánica."),
    study("Laboratorio", "lab", "Glucemia, hemograma con plaquetas, coagulograma", "clave", "Plaquetas 230.000, RIN 1,0.", "Se piden sin demorar la trombólisis; las plaquetas y la coagulación son necesarias si hay sospecha de alteración."),
    study("Electrofisiología", "ecg", "Electrocardiograma", "util", "Fibrilación auricular con respuesta ventricular de 92 lpm.", "Confirma la fuente cardioembólica probable."),
    study("Imágenes", "rmn", "Resonancia de cerebro antes de decidir", "innecesario", "No se realizó.", "En ventana de 4,5 h con TC sin sangrado, esperar una RMN demora el tratamiento: “tiempo es cerebro”."),
    study("Otros", "pl", "Punción lumbar", "riesgoso", "No se realizó.", "No tiene indicación y una punción contraindica la trombólisis por riesgo de hematoma."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("acv", "ACV isquémico agudo de la arteria cerebral media izquierda, probablemente cardioembólico", true, "Déficit focal súbito (hemiparesia derecha con afasia: hemisferio izquierdo), TC sin sangrado, oclusión de M1 y fibrilación auricular."),
      dx("hemorragia", "Hemorragia intracerebral", false, "Clínicamente no se distingue: por eso la TC es obligatoria. Acá no hay sangrado."),
      dx("hipoglucemia", "Hipoglucemia", false, "Puede dar déficit focal, pero la glucemia es 128 mg/dl."),
      dx("todd", "Parálisis de Todd poscrisis", false, "Requiere una convulsión previa."),
      dx("ait", "Accidente isquémico transitorio", false, "Los síntomas del AIT revierten (en general en menos de una hora) y no hay lesión; acá el déficit persiste."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("trombolisis", "Trombólisis endovenosa con alteplasa (0,9 mg/kg) dentro de las 4,5 h", "clave", "Sin contraindicaciones y en ventana: mejora el pronóstico funcional. Antes, bajar la TA por debajo de 185/110."),
      mg("trombectomia", "Derivar para trombectomía mecánica", "clave", "La oclusión de gran vaso (M1) se beneficia de la trombectomía además de la trombólisis."),
      mg("unidad", "Internación en unidad de ACV, cabecera a 30°, deglución evaluada antes de dar vía oral", "clave", "Las unidades de ACV reducen mortalidad y dependencia; la evaluación de la deglución previene la neumonía aspirativa."),
      mg("anticoag", "Anticoagular por la fibrilación auricular, pero diferido (días según tamaño del infarto)", "util", "Previene recurrencia; de inmediato aumenta el riesgo de transformación hemorrágica."),
      mg("bajarta", "Bajar la presión a 120/80 en la primera hora", "riesgoso", "La penumbra depende de la presión de perfusión: el descenso brusco agranda el infarto. Solo se baja si supera 185/110 (para trombolizar) o 220/120."),
      mg("aspirina", "Aspirina inmediata, antes de la trombólisis", "riesgoso", "No se da en las primeras 24 h tras la trombólisis por riesgo de sangrado."),
      mg("corticoides", "Dexametasona para el edema", "innecesario", "No sirve en el edema citotóxico del ACV isquémico."),
    ],
  },
  debrief: {
    diagnosis: "ACV isquémico agudo por oclusión de M1 izquierda, cardioembólico por fibrilación auricular, NIHSS 11, en ventana terapéutica.",
    pathologies: [
      { name: "ACV isquémico de la arteria cerebral media izquierda", role: "principal", why: "Déficit focal súbito con TC sin sangrado y oclusión vascular." },
      { name: "Fibrilación auricular", role: "asociada", why: "Fuente embólica más probable." },
      { name: "Hipertensión arterial", role: "asociada", why: "Factor de riesgo principal de ACV." },
      { name: "Hemorragia intracerebral", role: "diferencial", why: "Se descarta solo con imagen." },
      { name: "Hipoglucemia y crisis convulsiva", role: "diferencial", why: "Imitadores de ACV a descartar siempre." },
    ],
    reasoning: [
      "Causa: un trombo formado en la aurícula izquierda (por la estasis de la fibrilación auricular) migra y ocluye la arteria cerebral media.",
      "Mecanismo: en el centro del territorio el flujo cae tanto que las neuronas mueren en minutos (core); alrededor queda la penumbra, tejido que no funciona pero que puede salvarse si se reperfunde a tiempo. Su supervivencia depende de la presión de perfusión.",
      "Consecuencia: la cerebral media izquierda irriga la corteza motora de la cara y el brazo y las áreas del lenguaje (Broca y Wernicke) del hemisferio dominante → paresia facio-braquial derecha y afasia.",
      "Por eso el tiempo define el resultado: cada minuto sin reperfusión se pierden cerca de 2 millones de neuronas.",
    ],
    epidemiology:
      "El ACV está entre las principales causas de muerte y es la primera causa de discapacidad en adultos en la Argentina. El 80 % es isquémico. La incidencia se duplica cada década después de los 55 años; es algo más frecuente en varones, pero en edades avanzadas mueren más mujeres por su mayor expectativa de vida y mayor prevalencia de fibrilación auricular.",
    management: [
      "Reconocer los síntomas, activar el código ACV y registrar la hora de inicio.",
      "Glucemia capilar, TC sin contraste urgente (objetivo puerta-imagen < 25 min) y NIHSS.",
      "Trombólisis con alteplasa dentro de las 4,5 h si no hay contraindicaciones (TA < 185/110 antes de iniciar); trombectomía si hay oclusión de gran vaso.",
      "Unidad de ACV: control de TA, glucemia y temperatura, deglución, prevención de complicaciones; aspirina a las 24 h si se trombolizó.",
      "Prevención secundaria: anticoagulación por la FA, estatinas, control de la TA, rehabilitación temprana.",
    ],
    sources: [
      "Ministerio de Salud de la Nación — Guía de práctica clínica nacional de diagnóstico y tratamiento de la etapa aguda del ACV isquémico.",
      "Sociedad Neurológica Argentina — Consenso de ACV isquémico agudo.",
    ],
    pearls: [
      "Hemiparesia derecha + afasia = hemisferio izquierdo (dominante).",
      "Antes de pensar en ACV, glucemia capilar.",
      "En el ACV isquémico agudo no se baja la presión salvo > 220/120 (o > 185/110 para trombolizar).",
    ],
    pitfalls: ["Esperar una resonancia para decidir.", "Bajar la presión agresivamente.", "No registrar la hora de inicio."],
  },
};
