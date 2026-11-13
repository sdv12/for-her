import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const iamVentriculoDerecho: ClinicalCase = {
  id: "iam-ventriculo-derecho",
  level: 3,
  area: "Cardiovascular",
  setting: "Guardia",
  patient: { age: 63, ageUnit: "años", sex: "M", context: "Diabético e hipertenso. Le dieron un nitrito sublingual en la ambulancia y se descompensó." },
  frequency: "frecuente",
  intro: "“Hace una hora tengo un dolor fuerte en la boca del estómago, transpiro y me desmayo si me siento.”",
  vitals: { TA: "78/50 mmHg", FC: "52 lpm", FR: "20 rpm", "T°": "36,2 °C", "SatO₂": "96 %" },
  anamnesis: [
    act("dolor", "¿Cómo es el dolor y desde cuándo?", "clave", "“Opresivo en la boca del estómago, hace una hora.”", "Isquemia inferior."),
    act("nitrito", "¿Qué pasó después del nitrito?", "clave", "“Me bajó la presión y casi me desmayo.”", "Dependencia de precarga."),
    act("sildenafil", "¿Tomó sildenafil o tadalafil?", "clave", "“No.”", "Contraindica nitratos."),
    act("sintomas", "¿Náuseas o vómitos?", "util", "“Vomité una vez.”", "Reflejo vagal en IAM inferior."),
    act("antecedentes", "¿Fuma? ¿Colesterol?", "util", "“Fumé hasta hace 5 años.”", "Riesgo."),
    act("trabajo", "¿Trabaja?", "neutro", "“Tengo una verdulería.”", "No orienta."),
  ],
  exam: [
    act("yugular", "Ingurgitación yugular", "clave", "Ingurgitación yugular con signo de Kussmaul.", "Falla del VD."),
    act("pulmon", "Auscultación pulmonar", "clave", "Pulmones limpios.", "Hipotensión sin congestión pulmonar."),
    act("perfusion", "Perfusión", "util", "Fría.", "Bajo gasto."),
  ],
  studies: [
    study("Electrofisiología", "ecg", "ECG de 12 derivaciones más derivaciones derechas (V3R-V4R)", "clave", "Supradesnivel del ST en DII, DIII, aVF y en V4R; bloqueo AV de primer grado.", "IAM inferior con extensión al VD."),
    study("Laboratorio", "troponina", "Troponina", "clave", "Elevada.", "Necrosis."),
    study("Imágenes", "eco", "Ecocardiograma al lado de la cama", "util", "VD dilatado e hipocinético, VI inferior hipocinético.", "Confirma."),
    study("Otros", "esperar-troponina", "Esperar la segunda troponina para activar hemodinamia", "riesgoso", "No se esperó.", "El tiempo es miocardio."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("iam-vd", "IAM inferior con supradesnivel del ST y compromiso del ventrículo derecho", true, "Supra inferior y en V4R, hipotensión con pulmones limpios, yugulares ingurgitadas y caída de presión con nitritos."),
      dx("tep", "TEP masivo", false, "Supra del ST inferior y en V4R con troponina."),
      dx("taponamiento", "Taponamiento", false, "Sin derrame en el eco."),
      dx("shock-izquierdo", "Shock cardiogénico por falla del VI", false, "Pulmones limpios."),
      dx("diseccion", "Disección aórtica", false, "Dolor no transfixiante y ECG isquémico típico."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("angioplastia", "Angioplastia primaria urgente", "clave", "Reperfusión."),
      mg("volumen", "Expansión con solución fisiológica", "clave", "El VD depende de la precarga."),
      mg("antiagregacion", "Aspirina, segundo antiagregante y heparina", "clave", "SCA."),
      mg("inotropico", "Inotrópico si no responde al volumen", "util", "Soporte."),
      mg("nitratos", "Más nitratos para el dolor", "riesgoso", "Colapso hemodinámico."),
      mg("furosemida", "Furosemida por las yugulares", "riesgoso", "Reduce la precarga y agrava el shock."),
    ],
  },
  debrief: {
    diagnosis: "IAM inferior con supradesnivel del ST y compromiso del ventrículo derecho, con hipotensión, en varón de 63 años.",
    pathologies: [
      { name: "IAM inferior con extensión al VD", role: "principal", why: "Oclusión proximal de la coronaria derecha." },
      { name: "Hipotensión dependiente de precarga", role: "asociada", why: "Falla del VD." },
      { name: "TEP, taponamiento", role: "diferencial", why: "Otras causas de hipotensión con yugulares altas." },
    ],
    reasoning: [
      "Causa: oclusión proximal de la arteria coronaria derecha.",
      "Mecanismo: isquemia del VD que no bombea suficiente sangre al VI.",
      "Consecuencia: hipotensión con pulmones limpios, muy sensible a nitratos y diuréticos.",
    ],
    epidemiology:
      "Hasta un tercio a la mitad de los IAM inferiores comprometen el VD. Se pasa por alto si no se hacen derivaciones derechas. Los nitratos pueden causar hipotensión grave.",
    management: [
      "V4R en todo IAM inferior.",
      "Volumen.",
      "Sin nitratos.",
      "Angioplastia.",
    ],
    sources: ["Sociedad Argentina de Cardiología — Consenso de síndromes coronarios agudos con supradesnivel del ST.", "ESC — Acute Coronary Syndromes Guidelines."],
    pearls: ["IAM inferior: hacé V4R.", "Hipotensión con pulmones limpios.", "Volumen, no nitratos."],
    pitfalls: ["Nitratos.", "Diuréticos."],
    tribunal: [
      qa("¿Qué tríada clínica sugiere infarto del VD?", "Hipotensión, ingurgitación yugular y campos pulmonares limpios."),
      qa("¿Por qué da bradicardia el IAM inferior?", "Por isquemia del nódulo y reflejo vagal (Bezold-Jarisch)."),
      qa("¿Qué es el signo de Kussmaul?", "Aumento de la presión venosa yugular en la inspiración."),
    ],
  },
};
