import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const cancerPulmonVenaCava: ClinicalCase = {
  id: "cancer-pulmon-vena-cava-superior",
  level: 3,
  area: "Oncología",
  setting: "Guardia",
  patient: { age: 63, ageUnit: "años", sex: "M", context: "Tabaquista de 45 paquetes/año. Perdió 8 kg en 3 meses. Soldador." },
  frequency: "frecuente",
  intro: "“Hace una semana se me hinchó la cara y el cuello, sobre todo a la mañana. Me falta el aire al acostarme, y la camisa ya no me cierra.”",
  vitals: { TA: "138/84 mmHg", FC: "98 lpm", FR: "24 rpm", "T°": "36,8 °C", "SatO₂": "93 %" },
  anamnesis: [
    act("tiempo", "¿Cómo empeora? ¿Al agacharte?", "clave", "“Peor al agacharme y al levantarme.”", "Aumenta presión venosa."),
    act("alarma", "¿Estridor, confusión, síncope o dolor de cabeza?", "clave", "“Sin estridor ni confusión.”", "Define la urgencia."),
    act("tabaco", "¿Tos, sangre, pérdida de peso?", "clave", "“Con sangre y bajé 8 kilos.”", "Cáncer."),
    act("cateter", "¿Tuviste marcapaso o catéter?", "util", "“No.”", "Trombosis."),
    act("otros", "¿Dolor de huesos, cambios de voz?", "util", "“Ronquera.”", "Extensión."),
    act("oficio", "¿Hace cuánto trabajás de soldador?", "neutro", "“Treinta años.”", "No cambia la conducta inmediata."),
  ],
  exam: [
    act("cuello", "Cara, cuello y tórax", "clave", "Edema en esclavina, yugulares ingurgitadas sin pulso, venas colaterales.", "Síndrome de VCS."),
    act("via", "Vía aérea", "clave", "Sin estridor.", "No hay compromiso crítico."),
    act("ganglios", "Ganglios y pulmón", "util", "Ganglio supraclavicular derecho duro; sibilancia localizada.", "Sitio de biopsia."),
  ],
  studies: [
    study("Imágenes", "tc", "TC de tórax con contraste", "clave", "Masa hiliar derecha que comprime la VCS, adenopatías.", "Confirma."),
    study("Otros", "biopsia", "Biopsia del ganglio o broncoscopía", "clave", "Carcinoma de células pequeñas.", "Histología antes de tratar, si está estable."),
    study("Laboratorio", "lab", "Hemograma, ionograma, calcio, función renal, LDH", "clave", "Sodio 126.", "SIADH."),
    study("Otros", "corticoide-ciego", "Dar corticoides y radiar antes de la biopsia sin urgencia", "riesgoso", "No se realizó.", "Puede arruinar el diagnóstico."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("vcs", "Síndrome de vena cava superior por carcinoma pulmonar de células pequeñas", true, "Edema en esclavina, venas colaterales, masa hiliar y biopsia."),
      dx("ic", "Insuficiencia cardíaca derecha", false, "Respeta la cara y el cuello."),
      dx("nefrotico", "Síndrome nefrótico", false, "Sin proteinuria ni edemas generalizados."),
      dx("linfoma", "Linfoma", false, "La biopsia muestra células pequeñas."),
      dx("trombosis", "Trombosis por catéter", false, "No tiene catéter y hay masa."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cabecera", "Elevar cabecera, oxígeno y evaluar urgencia", "clave", "Medidas iniciales."),
      mg("biopsia", "Asegurar la histología si no hay riesgo inmediato", "clave", "Define el tratamiento."),
      mg("quimio", "Quimioterapia de inicio con oncología", "clave", "Es muy quimiosensible."),
      mg("stent", "Stent endovascular si hay síntomas graves", "util", "Alivio rápido."),
      mg("hiponatremia", "Manejar hiponatremia por SIADH", "util", "Síndrome paraneoplásico."),
      mg("alta", "Furosemida y alta", "riesgoso", "No trata la causa y deja sin evaluar."),
    ],
  },
  debrief: {
    diagnosis: "Síndrome de vena cava superior subagudo por carcinoma pulmonar de células pequeñas con SIADH, en varón de 63 años.",
    pathologies: [
      { name: "Síndrome de vena cava superior", role: "principal", why: "Obstrucción por compresión." },
      { name: "Cáncer de pulmón y SIADH", role: "asociada", why: "Causa." },
      { name: "IC, linfoma, trombosis", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: masa mediastínica o hiliar.",
      "Mecanismo: la compresión aumenta la presión venosa del hemicuerpo superior.",
      "Consecuencia: edema, colaterales, edema laríngeo o cerebral en casos graves.",
    ],
    epidemiology:
      "El cáncer de pulmón es la principal causa de muerte por cáncer en varones en Argentina. La mayoría de los síndromes de vena cava superior son malignos, sobre todo pulmonares o linfomas. Cada vez se ven más por catéteres y marcapasos. Fumar explica cerca del 85 % de los cánceres de pulmón.",
    management: [
      "Evaluar estridor y edema cerebral.",
      "TC e histología.",
      "Tratamiento de la causa.",
      "Stent si hay urgencia.",
    ],
    sources: ["Instituto Nacional del Cáncer — Guías de cáncer de pulmón.", "Sociedad Argentina de Oncología Clínica — Emergencias oncológicas."],
    pearls: ["Edema en esclavina.", "Biopsia antes de esteroides si está estable.", "Hiponatremia: SIADH."],
    pitfalls: ["Corticoides sin biopsia en linfoma.", "Tratarlo como IC."],
    tribunal: [
      qa("¿Qué emergencia oncológica hay además?", "Compresión medular, hipercalcemia, lisis tumoral, neutropenia febril."),
      qa("¿Qué síndromes paraneoplásicos da el carcinoma de células pequeñas?", "SIADH, Cushing ectópico, Lambert-Eaton."),
      qa("¿Qué es el signo de Pemberton?", "Congestión facial al elevar los brazos."),
    ],
  },
};
