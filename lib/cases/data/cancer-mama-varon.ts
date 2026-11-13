import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const cancerMamaVaron: ClinicalCase = {
  id: "cancer-mama-varon",
  level: 2,
  area: "Oncología",
  setting: "Consultorio",
  patient: { age: 67, ageUnit: "años", sex: "M", context: "Su hermana tuvo cáncer de mama a los 45 y su madre cáncer de ovario." },
  frequency: "raro",
  intro: "“Hace tres meses me toqué un bulto duro detrás del pezón izquierdo. No duele. Me dio vergüenza consultar.”",
  vitals: { TA: "132/80 mmHg", FC: "74 lpm", "T°": "36,5 °C", Peso: "82 kg" },
  anamnesis: [
    act("bulto", "¿Cómo es y cómo evolucionó?", "clave", "“Duro, creció un poco.”", "Nódulo sospechoso."),
    act("familia", "¿Antecedentes familiares de cáncer?", "clave", "“Mi hermana de mama joven y mi mamá de ovario.”", "Sospecha de BRCA2."),
    act("pezon", "¿Secreción o retracción del pezón?", "clave", "“Se me hundió un poco.”", "Signo de malignidad."),
    act("farmacos", "¿Toma espironolactona, finasteride u hormonas?", "util", "“No.”", "Ginecomastia por fármacos."),
    act("higado", "¿Toma alcohol o tiene problemas de hígado?", "util", "“No.”", "Ginecomastia."),
    act("hobby", "¿Qué hace?", "neutro", "“Juego al truco en el club.”", "No orienta."),
  ],
  exam: [
    act("mama", "Examen mamario", "clave", "Nódulo duro, irregular, excéntrico de 2 cm adherido, con retracción del pezón.", "Sospecha de cáncer."),
    act("axila", "Axila", "clave", "Ganglio duro de 1,5 cm.", "Compromiso ganglionar."),
    act("contralateral", "Mama contralateral", "util", "Normal.", "Unilateral."),
  ],
  studies: [
    study("Imágenes", "mamografia", "Mamografía y ecografía", "clave", "Nódulo espiculado BI-RADS 5 y ganglio axilar sospechoso.", "Sospecha alta."),
    study("Otros", "biopsia", "Biopsia con aguja gruesa de mama y axila", "clave", "Carcinoma ductal invasor, receptores hormonales positivos, HER2 negativo; ganglio positivo.", "Confirma."),
    study("Laboratorio", "genetica", "Asesoramiento y estudio genético (BRCA2)", "util", "Mutación BRCA2 detectada.", "Implica a la familia."),
    study("Imágenes", "observar", "Control en 6 meses como ginecomastia", "riesgoso", "No se hizo.", "Retrasa un cáncer."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("cancer-mama", "Carcinoma ductal invasor de mama con ganglio axilar positivo en varón portador de BRCA2", true, "Nódulo duro excéntrico con retracción, ganglio axilar, biopsia y mutación BRCA2."),
      dx("ginecomastia", "Ginecomastia", false, "Es blanda, central y simétrica."),
      dx("lipoma", "Lipoma", false, "Duro, adherido y con ganglio."),
      dx("absceso", "Absceso mamario", false, "Sin signos inflamatorios."),
      dx("metastasis", "Metástasis de otro primario", false, "Biopsia de carcinoma ductal primario."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cirugia", "Mastectomía con evaluación axilar y comité oncológico", "clave", "Tratamiento local."),
      mg("tamoxifeno", "Tamoxifeno adyuvante", "clave", "Receptores hormonales positivos."),
      mg("familia", "Asesoramiento genético a hermana, hijos y familiares", "clave", "BRCA2 hereditario."),
      mg("prostata", "Pesquisa de cáncer de próstata y páncreas", "util", "Riesgos asociados a BRCA2."),
      mg("inhibidor-aromatasa-solo", "Inhibidor de aromatasa sin supresión testicular", "riesgoso", "Menos eficaz en varones."),
      mg("solo-observar", "Observar sin tratar por ser varón", "riesgoso", "Mismo comportamiento que en mujeres."),
    ],
  },
  debrief: {
    diagnosis: "Carcinoma ductal invasor de mama con receptores hormonales positivos y ganglio axilar positivo, en varón de 67 años portador de BRCA2.",
    pathologies: [
      { name: "Cáncer de mama en el varón", role: "principal", why: "Tumor raro, diagnosticado tarde." },
      { name: "Mutación BRCA2", role: "asociada", why: "Síndrome hereditario." },
      { name: "Ginecomastia, lipoma", role: "diferencial", why: "Otras masas mamarias masculinas." },
    ],
    reasoning: [
      "Causa: mutación germinal en BRCA2.",
      "Mecanismo: falla en la reparación del ADN que favorece tumores hormono-dependientes.",
      "Consecuencia: tumor que se diagnostica tarde por falta de sospecha.",
    ],
    epidemiology:
      "Menos del 1 % de los cánceres de mama ocurre en varones, y se diagnostican en estadios más avanzados. Muchos tienen mutación BRCA2. La mayoría expresa receptores hormonales.",
    management: [
      "Sospechar.",
      "Biopsia.",
      "Cirugía y tamoxifeno.",
      "Genética familiar.",
    ],
    sources: ["Instituto Nacional del Cáncer — Cáncer de mama.", "ASCO — Management of Male Breast Cancer Guideline."],
    pearls: ["Duro y excéntrico no es ginecomastia.", "Pensá en BRCA2.", "Tamoxifeno."],
    pitfalls: ["Observar.", "Vergüenza que demora."],
    tribunal: [
      qa("¿Cómo diferenciás ginecomastia de cáncer?", "La ginecomastia es blanda, central, móvil y a menudo bilateral; el cáncer es duro, excéntrico y adherido."),
      qa("¿Qué cánceres se asocian a BRCA2 en varones?", "Mama, próstata, páncreas y melanoma."),
      qa("¿Qué cánceres del árbol familiar orientan a BRCA?", "Mama joven, ovario, mama masculina y páncreas."),
    ],
  },
};
