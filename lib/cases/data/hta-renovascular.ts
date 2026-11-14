import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const htaRenovascular: ClinicalCase = {
  id: "hta-renovascular-displasia-fibromuscular",
  level: 3,
  area: "Cardiovascular",
  setting: "Consultorio",
  patient: { age: 26, ageUnit: "años", sex: "F", context: "Sin antecedentes. Le encontraron presión alta en un control laboral. No toma anticonceptivos." },
  frequency: "poco-frecuente",
  intro: "“Me tomaron la presión en el trabajo y dio 170/105. Me repitieron varias veces y siempre está alta.”",
  vitals: { TA: "168/104 mmHg", FC: "76 lpm", "T°": "36,4 °C", Peso: "56 kg" },
  anamnesis: [
    act("edad", "¿Desde cuándo sabés que tenés presión alta?", "clave", "“Desde hace un mes.”", "Inicio antes de los 30: buscar causa secundaria."),
    act("familia", "¿Familiares con hipertensión joven?", "clave", "“No.”", "Hipertensión esencial poco probable."),
    act("sustancias", "¿Tomás anticonceptivos, descongestivos, regaliz, cocaína?", "clave", "“Nada.”", "Causas exógenas."),
    act("crisis", "¿Palpitaciones, sudor, dolor de cabeza en crisis?", "util", "“No.”", "Feocromocitoma."),
    act("debilidad", "¿Calambres o debilidad?", "util", "“No.”", "Hiperaldosteronismo."),
    act("trabajo", "¿Dónde trabajás?", "neutro", "“En un banco.”", "No orienta."),
  ],
  exam: [
    act("soplo", "Auscultación abdominal y en flancos", "clave", "Soplo sistólico-diastólico epigástrico.", "Estenosis de arteria renal."),
    act("pulsos", "Pulsos y TA en brazos y piernas", "clave", "Simétricos.", "Excluye coartación."),
    act("fondo", "Fondo de ojo", "util", "Estrechamiento arteriolar.", "Daño."),
  ],
  studies: [
    study("Laboratorio", "lab", "Creatinina, potasio, orina, renina y aldosterona", "clave", "Creatinina normal; K 3,6; renina y aldosterona altas.", "Hiperaldosteronismo secundario."),
    study("Imágenes", "doppler", "Eco Doppler de arterias renales o angio-TC", "clave", "Estenosis en 'collar de cuentas' de la arteria renal derecha.", "Displasia fibromuscular."),
    study("Imágenes", "carotidas", "Doppler carotídeo", "util", "Sin lesiones.", "La displasia es multisistémica."),
    study("Otros", "ieca-bilateral", "IECA de entrada sin evaluar si es bilateral", "riesgoso", "No se hizo.", "Falla renal en estenosis bilateral."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("renovascular", "Hipertensión renovascular por displasia fibromuscular de la arteria renal derecha", true, "Mujer joven con HTA grave, soplo abdominal, renina alta y collar de cuentas."),
      dx("esencial", "Hipertensión esencial", false, "Joven, sin antecedentes y con causa demostrada."),
      dx("hiperaldo-primario", "Hiperaldosteronismo primario", false, "La renina está alta."),
      dx("coartacion", "Coartación de aorta", false, "Pulsos simétricos."),
      dx("feocromocitoma", "Feocromocitoma", false, "Sin crisis adrenérgicas."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("angioplastia", "Angioplastia renal con balón", "clave", "Suele curar en la displasia."),
      mg("antihipertensivo", "Antihipertensivo hasta el procedimiento (calcioantagonista)", "clave", "Control."),
      mg("seguimiento", "Control de creatinina y presión", "clave", "Evolución."),
      mg("otros-territorios", "Evaluar otros territorios vasculares", "util", "Displasia multifocal."),
      mg("solo-pastillas", "Solo tratamiento médico de por vida sin estudiar", "riesgoso", "Se pierde una causa curable."),
      mg("anticonceptivos", "Indicar anticonceptivos combinados", "riesgoso", "Empeoran la presión."),
    ],
  },
  debrief: {
    diagnosis: "Hipertensión renovascular por displasia fibromuscular de la arteria renal derecha, en mujer de 26 años.",
    pathologies: [
      { name: "Hipertensión renovascular", role: "principal", why: "Causa secundaria y curable." },
      { name: "Displasia fibromuscular", role: "asociada", why: "Arteriopatía no aterosclerótica." },
      { name: "Hiperaldosteronismo, coartación", role: "diferencial", why: "Otras causas secundarias." },
    ],
    reasoning: [
      "Causa: displasia de la pared arterial renal.",
      "Mecanismo: menor perfusión renal que activa el sistema renina-angiotensina.",
      "Consecuencia: hipertensión grave en joven.",
    ],
    epidemiology:
      "La displasia fibromuscular es la causa más frecuente de hipertensión renovascular en mujeres jóvenes; en adultos mayores es la aterosclerosis. La hipertensión antes de los 30 obliga a buscar causa secundaria.",
    management: [
      "Sospechar en jóvenes.",
      "Doppler o angio-TC.",
      "Angioplastia.",
      "Seguimiento.",
    ],
    sources: ["Sociedad Argentina de Hipertensión Arterial — Hipertensión secundaria.", "European/International Consensus on Fibromuscular Dysplasia."],
    pearls: ["HTA en joven: buscá causa.", "Soplo abdominal.", "Collar de cuentas."],
    pitfalls: ["Rotular esencial.", "IECA sin evaluar."],
    tribunal: [
      qa("¿Cuándo se sospecha hipertensión secundaria?", "Inicio antes de los 30 o después de los 55, grave, resistente, con hipopotasemia o de empeoramiento brusco."),
      qa("¿Qué diferencia hay con la estenosis aterosclerótica?", "La aterosclerótica afecta el ostium en mayores y responde peor a la angioplastia."),
      qa("¿Por qué el IECA puede empeorar la función renal?", "Porque dilata la arteriola eferente y baja el filtrado en riñones dependientes de angiotensina II."),
    ],
  },
};
