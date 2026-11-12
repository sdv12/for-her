import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const glioblastoma: ClinicalCase = {
  id: "tumor-cerebral-glioblastoma",
  level: 3,
  area: "Oncología",
  setting: "Guardia",
  patient: { age: 58, ageUnit: "años", sex: "M", context: "Ingeniero, sin antecedentes. La esposa nota cambios de carácter hace dos meses." },
  frequency: "poco-frecuente",
  intro: "“Hoy tuvo una convulsión por primera vez. Venía con dolor de cabeza a la mañana y más irritable.” (relata la esposa)",
  vitals: { TA: "142/86 mmHg", FC: "84 lpm", FR: "16 rpm", "T°": "36,6 °C", "SatO₂": "97 %", Glucemia: "102 mg/dl", Glasgow: "14/15" },
  anamnesis: [
    act("cefalea", "¿Cómo es el dolor de cabeza?", "clave", "“Peor al despertar, con vómitos.”", "Hipertensión endocraneana."),
    act("conducta", "¿Qué cambió en su conducta?", "clave", "“Está desinhibido, olvida cosas.”", "Lóbulo frontal."),
    act("convulsion", "¿Cómo fue la convulsión?", "clave", "“Empezó en la mano izquierda y se generalizó.”", "Inicio focal: lesión estructural."),
    act("cancer", "¿Cáncer previo, tos, pérdida de peso?", "util", "“No.”", "Metástasis."),
    act("infeccion", "¿Fiebre o VIH?", "util", "“No.”", "Absceso o toxoplasmosis."),
    act("hobby", "¿Qué le gusta?", "neutro", "“El ajedrez.”", "No orienta."),
  ],
  exam: [
    act("neuro", "Examen neurológico", "clave", "Paresia leve de mano izquierda, reflejos de liberación frontal.", "Foco."),
    act("fondo", "Fondo de ojo", "clave", "Papiledema bilateral.", "Hipertensión endocraneana."),
    act("general", "Examen general y ganglios", "util", "Normal.", "No sugiere primario."),
  ],
  studies: [
    study("Imágenes", "tc", "TC de cerebro", "clave", "Masa frontal derecha con edema.", "Primer paso."),
    study("Imágenes", "rmn", "RM con contraste", "clave", "Lesión con realce en anillo irregular, necrosis central, cruza el cuerpo calloso.", "Muy sugestiva."),
    study("Imágenes", "tc-torax", "TC de tórax, abdomen y pelvis", "util", "Sin primario.", "Excluye metástasis."),
    study("Otros", "biopsia", "Biopsia o resección", "clave", "Glioblastoma IDH no mutado.", "Confirma."),
    study("Otros", "puncion", "Punción lumbar", "riesgoso", "No se realizó.", "Riesgo de herniación."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("gbm", "Glioblastoma frontal derecho con hipertensión endocraneana y crisis focal", true, "Cambios conductuales, crisis focal, papiledema y lesión necrótica con realce."),
      dx("metastasis", "Metástasis", false, "No hay primario y es única con infiltración."),
      dx("absceso", "Absceso cerebral", false, "Sin fiebre ni foco; la pared es irregular."),
      dx("acv", "ACV", false, "Progresión de semanas."),
      dx("demencia", "Demencia frontotemporal", false, "Hay masa y papiledema."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("corticoide", "Dexametasona por el edema", "clave", "Reduce los síntomas."),
      mg("anticonvulsivante", "Levetiracetam", "clave", "Ya convulsionó."),
      mg("neurocirugia", "Resección máxima segura y luego radioterapia con temozolomida", "clave", "Tratamiento estándar."),
      mg("paliativos", "Cuidados paliativos y planificación con la familia", "clave", "Pronóstico reservado."),
      mg("manejar", "Permitir que siga manejando", "riesgoso", "Convulsión reciente."),
      mg("alta", "Alta con analgésicos", "riesgoso", "Riesgo de herniación."),
    ],
  },
  debrief: {
    diagnosis: "Glioblastoma IDH no mutado frontal derecho con hipertensión endocraneana y crisis focal con generalización, en varón de 58 años.",
    pathologies: [
      { name: "Glioblastoma", role: "principal", why: "Tumor cerebral primario maligno más frecuente del adulto." },
      { name: "Hipertensión endocraneana y epilepsia", role: "asociada", why: "Consecuencias." },
      { name: "Metástasis, absceso, ACV", role: "diferencial", why: "Otras lesiones." },
    ],
    reasoning: [
      "Causa: transformación de células gliales; la radiación es el único factor claro.",
      "Mecanismo: crecimiento infiltrante con necrosis y edema.",
      "Consecuencia: crisis, foco, HTE y cambios de conducta.",
    ],
    epidemiology:
      "Es el tumor cerebral primario maligno más común en adultos, con pico entre los 55 y 70 años. Aun con tratamiento completo, la supervivencia media ronda los 15 meses. En adultos, una primera crisis siempre requiere imagen, y una cefalea matinal progresiva con vómitos es alarma.",
    management: [
      "Imagen ante crisis o cefalea de alarma.",
      "Dexametasona y anticonvulsivante.",
      "Cirugía, radioterapia y temozolomida.",
      "Paliativos desde el inicio.",
    ],
    sources: ["Instituto Nacional del Cáncer — Tumores del sistema nervioso central.", "EANO — Guidelines for Diffuse Gliomas."],
    pearls: ["Primera crisis en un adulto: imagen.", "Cefalea matinal con vómitos.", "Realce en anillo irregular."],
    pitfalls: ["Rotular como psiquiátrico.", "Punción lumbar con masa."],
    tribunal: [
      qa("¿Qué es la tríada de Cushing?", "Hipertensión, bradicardia y respiración irregular, signo tardío de hipertensión endocraneana."),
      qa("¿Qué lesiones realzan en anillo?", "Glioblastoma, metástasis, absceso, toxoplasmosis y linfoma en inmunosuprimidos."),
      qa("¿Cuáles son los tumores cerebrales más frecuentes en adultos?", "Las metástasis, seguidas por meningiomas y gliomas."),
    ],
  },
};
