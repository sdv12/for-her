import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const trombosisVenosaCerebral: ClinicalCase = {
  id: "trombosis-venosa-cerebral",
  level: 4,
  area: "Neurología",
  setting: "Guardia",
  patient: { age: 29, ageUnit: "años", sex: "F", context: "Puérpera de 10 días, parto por cesárea." },
  frequency: "raro",
  intro: "“Hace cuatro días me duele la cabeza cada vez más, vomité, veo borroso y hoy tuve una convulsión.” (lo cuenta el marido)",
  vitals: { TA: "128/82 mmHg", FC: "94 lpm", FR: "18 rpm", "T°": "37,2 °C", "SatO₂": "98 %", Glasgow: "14/15" },
  anamnesis: [
    act("cefalea", "¿Cómo fue apareciendo el dolor de cabeza?", "clave", "“Fue empeorando día a día, peor acostada.”", "Cefalea progresiva con hipertensión endocraneana."),
    act("puerperio", "¿Cuándo fue el parto?", "clave", "“Hace diez días, cesárea.”", "Estado protrombótico."),
    act("convulsion", "¿Cómo fue la convulsión?", "clave", "“Empezó en el brazo derecho y se generalizó.”", "Crisis focal: lesión cortical."),
    act("preeclampsia", "¿Tuvo presión alta en el embarazo?", "util", "“No.”", "Eclampsia posparto."),
    act("trombosis", "¿Coágulos antes o en la familia?", "util", "“Mi mamá tuvo una trombosis.”", "Trombofilia."),
    act("bebe", "¿Cómo está el bebé?", "neutro", "“Bien, con la abuela.”", "No orienta."),
  ],
  exam: [
    act("fondo", "Fondo de ojo", "clave", "Papiledema bilateral.", "Hipertensión endocraneana."),
    act("neuro", "Examen neurológico", "clave", "Paresia leve del brazo derecho.", "Infarto venoso."),
    act("meningeo", "Signos meníngeos", "util", "Negativos.", "Excluye meningitis."),
  ],
  studies: [
    study("Imágenes", "tc", "TC de cerebro sin contraste", "clave", "Hematoma parenquimatoso frontoparietal izquierdo con edema.", "Infarto venoso hemorrágico."),
    study("Imágenes", "venografia", "Angio-RM o angio-TC venosa", "clave", "Trombosis del seno sagital superior.", "Confirma."),
    study("Laboratorio", "lab", "Hemograma, coagulograma, función renal", "util", "Normales.", "Base para anticoagular."),
    study("Otros", "puncion", "Punción lumbar", "riesgoso", "No se realizó.", "Lesión con efecto de masa."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("tvc", "Trombosis del seno sagital superior con infarto venoso hemorrágico en el puerperio", true, "Cefalea progresiva, papiledema, crisis focal, puerperio y trombosis en la venografía."),
      dx("eclampsia", "Eclampsia posparto", false, "Presión normal y trombosis documentada."),
      dx("hsa", "Hemorragia subaracnoidea", false, "Cefalea progresiva, no en trueno, y hematoma parenquimatoso."),
      dx("cefalea-pospuncion", "Cefalea pospunción dural", false, "Empeora acostada y hay papiledema."),
      dx("acv-arterial", "ACV hemorrágico hipertensivo", false, "Sin hipertensión y con trombosis venosa."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("anticoagular", "Anticoagulación con heparina de bajo peso aun con el hematoma", "clave", "Detiene la progresión del trombo."),
      mg("anticonvulsivante", "Levetiracetam", "clave", "Crisis con lesión cortical."),
      mg("uti", "Unidad de cuidados neurocríticos", "clave", "Riesgo de deterioro."),
      mg("lactancia", "Mantener la lactancia con heparina", "util", "Compatible."),
      mg("no-anticoagular", "No anticoagular por el hematoma", "riesgoso", "Es el error clásico; empeora el pronóstico."),
      mg("estrogenos", "Anticonceptivos combinados al alta", "riesgoso", "Riesgo de recurrencia."),
    ],
  },
  debrief: {
    diagnosis: "Trombosis del seno sagital superior con infarto venoso hemorrágico y crisis focal, en puérpera de 29 años.",
    pathologies: [
      { name: "Trombosis venosa cerebral", role: "principal", why: "Oclusión de senos venosos." },
      { name: "Infarto venoso hemorrágico", role: "asociada", why: "Congestión y ruptura." },
      { name: "Eclampsia, HSA", role: "diferencial", why: "Otras causas en el puerperio." },
    ],
    reasoning: [
      "Causa: hipercoagulabilidad del puerperio y posible trombofilia.",
      "Mecanismo: el trombo impide el drenaje venoso y la reabsorción de LCR.",
      "Consecuencia: hipertensión endocraneana, infarto venoso y convulsiones.",
    ],
    epidemiology:
      "Es una causa poco frecuente de ACV pero típica de mujeres jóvenes: puerperio, anticonceptivos y trombofilias. La cefalea es el síntoma más común. Bien tratada, la mayoría se recupera sin secuelas.",
    management: [
      "Sospecha.",
      "Venografía.",
      "Anticoagular.",
      "Tratar convulsiones e hipertensión endocraneana.",
    ],
    sources: ["Sociedad Neurológica Argentina — Enfermedad cerebrovascular en la mujer.", "AHA/ASA — Cerebral Venous Thrombosis Scientific Statement."],
    pearls: ["Cefalea progresiva en puerperio.", "Papiledema y crisis.", "Se anticoagula aun con sangre."],
    pitfalls: ["No anticoagular.", "Punzar."],
    tribunal: [
      qa("¿Por qué se anticoagula si hay sangrado?", "Porque el sangrado es consecuencia de la congestión venosa y la anticoagulación la revierte."),
      qa("¿Qué anticoagulante a largo plazo?", "Antagonistas de la vitamina K o anticoagulantes directos, de 3 a 12 meses según la causa."),
      qa("¿Qué es el signo del delta vacío?", "Defecto de relleno triangular en el seno sagital superior en la TC con contraste."),
    ],
  },
};
