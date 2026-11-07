import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hiperaldosteronismo: ClinicalCase = {
  id: "hiperaldosteronismo-primario",
  level: 3,
  area: "Cardiovascular",
  setting: "Consultorio",
  patient: { age: 44, ageUnit: "años", sex: "M", context: "Hipertenso desde los 36 años. Toma tres antihipertensivos, uno de ellos tiazida." },
  frequency: "poco-frecuente",
  intro: "“Sigo con la presión alta aunque tomo todo. Además me dan calambres y me siento flojo de las piernas.”",
  vitals: { TA: "172/104 mmHg", FC: "76 lpm", FR: "16 rpm", "T°": "36,4 °C", "SatO₂": "98 %" },
  anamnesis: [
    act("adherencia", "¿Tomás todos los remedios, todos los días? ¿Cuáles?", "clave", "“Sí: enalapril, amlodipina e hidroclorotiazida a dosis plenas.”", "HTA resistente verdadera: tres fármacos con un diurético sin control."),
    act("calambres", "¿Cómo son los calambres y la debilidad?", "clave", "“Peor después de la tiazida; orino mucho de noche.”", "Hipopotasemia con poliuria: pista clave."),
    act("edad-inicio", "¿A qué edad empezó la hipertensión?", "clave", "“A los 36.”", "Inicio antes de los 40 orienta a causa secundaria."),
    act("sustancias", "¿AINE, anticonceptivos, descongestivos, regaliz, alcohol, cocaína?", "util", "“Nada de eso.”", "Otras causas de resistencia."),
    act("apneas", "¿Roncás, hacés pausas al dormir?", "util", "“No.”", "Apnea del sueño: causa frecuente de resistencia."),
    act("deporte", "¿Qué deporte hacés?", "neutro", "“Bicicleta los domingos.”", "No orienta."),
  ],
  exam: [
    act("ta", "Presión en ambos brazos y técnica correcta", "clave", "172/104 mmHg en ambos brazos.", "Confirma la elevación y descarta coartación."),
    act("fondo", "Fondo de ojo y corazón", "util", "Retinopatía grado II, cuarto ruido.", "Daño de órgano blanco."),
    act("edemas", "Edemas", "util", "Sin edemas.", "Típico: el escape de aldosterona evita el edema."),
  ],
  studies: [
    study("Laboratorio", "iono", "Ionograma y función renal", "clave", "K 2,9 mEq/l, Na 145, creatinina normal, alcalosis metabólica leve.", "Hipopotasemia con alcalosis y sodio alto normal."),
    study("Laboratorio", "aldo-renina", "Cociente aldosterona/renina", "clave", "Aldosterona 34 ng/dl, renina suprimida, cociente muy elevado.", "Es la prueba de tamizaje; corregir el potasio antes de interpretarla."),
    study("Imágenes", "tac", "TC de suprarrenales, tras confirmar", "clave", "Nódulo suprarrenal izquierdo de 1,5 cm.", "Ubica la causa; a veces se requiere muestreo venoso."),
    study("Imágenes", "ecodoppler", "Doppler de arterias renales como primer estudio", "innecesario", "Normal.", "Con renina suprimida no orienta a estenosis renal, que eleva renina."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("conn", "Hiperaldosteronismo primario por probable adenoma suprarrenal (síndrome de Conn)", true, "HTA resistente de inicio temprano, hipopotasemia con alcalosis, aldosterona alta con renina suprimida y nódulo suprarrenal."),
      dx("feo", "Feocromocitoma", false, "Da crisis paroxísticas con cefalea, sudoración y palpitaciones, sin este patrón hormonal."),
      dx("renovascular", "Hipertensión renovascular", false, "Eleva la renina, no la suprime."),
      dx("tiazida", "Hipopotasemia solo por la tiazida", false, "No explica la renina suprimida ni la aldosterona elevada."),
      dx("esencial", "HTA esencial mal controlada", false, "Tiene criterios claros de causa secundaria."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("espironolactona", "Espironolactona y reposición de potasio", "clave", "Antagoniza el receptor de mineralocorticoides y corrige la hipopotasemia."),
      mg("muestreo", "Derivar a endocrinología: pruebas confirmatorias y muestreo venoso suprarrenal si se plantea cirugía", "clave", "Determina si la producción es unilateral."),
      mg("adrenalectomia", "Adrenalectomía laparoscópica si es unilateral", "clave", "Puede curar o mejorar mucho la HTA."),
      mg("mas-tiazida", "Aumentar la dosis de tiazida", "riesgoso", "Empeora la hipopotasemia y puede causar arritmias."),
      mg("cuarto", "Agregar un cuarto antihipertensivo sin estudiar", "innecesario", "Tiene una causa tratable."),
      mg("biopsia", "Biopsiar el nódulo suprarrenal", "riesgoso", "No está indicada y tiene riesgos."),
    ],
  },
  debrief: {
    diagnosis: "Hiperaldosteronismo primario por adenoma suprarrenal izquierdo probable, con HTA resistente e hipopotasemia, en varón de 44 años.",
    pathologies: [
      { name: "Hiperaldosteronismo primario", role: "principal", why: "Producción autónoma de aldosterona." },
      { name: "HTA resistente con daño de órgano blanco", role: "asociada", why: "Retinopatía y riesgo cardiovascular mayor que en la HTA esencial." },
      { name: "Feocromocitoma, renovascular, apnea del sueño", role: "diferencial", why: "Otras causas secundarias." },
    ],
    reasoning: [
      "Causa: adenoma o hiperplasia de la zona glomerular suprarrenal.",
      "Mecanismo: la aldosterona aumenta la reabsorción de sodio y la excreción de potasio e hidrogeniones; el volumen alto suprime la renina.",
      "Consecuencia: HTA, hipopotasemia, alcalosis metabólica, debilidad, calambres, poliuria; más fibrosis cardíaca que la esperada por la presión.",
    ],
    epidemiology:
      "Es la causa endocrina más frecuente de HTA secundaria y puede encontrarse en alrededor del 5 al 10 % de las personas hipertensas, más aún en la HTA resistente. Muchos casos cursan con potasio normal, por lo que suele subdiagnosticarse.",
    management: [
      "Tamizar con cociente aldosterona/renina en HTA resistente, de inicio temprano o con hipopotasemia.",
      "Corregir el potasio antes del estudio y confirmar según protocolo.",
      "Tomografía y muestreo venoso si se plantea cirugía.",
      "Adrenalectomía si es unilateral; espironolactona si es bilateral.",
    ],
    sources: ["Sociedad Argentina de Hipertensión Arterial — Consenso de HTA secundaria.", "Endocrine Society — Guía de aldosteronismo primario."],
    pearls: ["HTA resistente + hipopotasemia: pedí aldosterona/renina.", "Sin edemas por el escape de aldosterona.", "Potasio normal no lo descarta."],
    pitfalls: ["Atribuir la hipopotasemia a la tiazida sin estudiar.", "Interpretar el cociente con potasio bajo."],
    tribunal: [
      qa("¿Qué es la HTA resistente?", "La presión por encima del objetivo pese a tres fármacos a dosis óptimas, uno de ellos diurético, tras descartar mala adherencia y efecto de guardapolvo blanco."),
      qa("¿Cómo actúa la aldosterona en la nefrona?", "En el túbulo colector aumenta los canales de sodio y la Na/K ATPasa: reabsorbe sodio y secreta potasio e hidrogeniones."),
      qa("¿Cuáles son las causas endocrinas de HTA?", "Hiperaldosteronismo primario, feocromocitoma, Cushing, hipo e hipertiroidismo, hiperparatiroidismo y acromegalia."),
    ],
  },
};
