import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const arteritisTemporal: ClinicalCase = {
  id: "arteritis-celulas-gigantes",
  level: 3,
  area: "Reumatología",
  setting: "Consultorio",
  patient: { age: 74, ageUnit: "años", sex: "F", context: "Hipertensa. Hace dos meses le cuesta levantarse de la cama por dolor de hombros." },
  frequency: "poco-frecuente",
  intro: "“Hace tres semanas tengo un dolor de cabeza nuevo, en las sienes, que nunca tuve. Me duele al peinarme y al masticar se me cansa la mandíbula. Ayer vi negro un ratito con el ojo derecho.”",
  vitals: { TA: "138/84 mmHg", FC: "84 lpm", "T°": "37,6 °C", Peso: "60 kg" },
  anamnesis: [
    act("vision", "¿Cómo fue lo del ojo? ¿Cuánto duró?", "clave", "“Como una cortina negra, unos minutos.”", "Amaurosis fugaz: riesgo inminente de ceguera permanente; es una emergencia."),
    act("cefalea", "¿Cómo es el dolor de cabeza?", "clave", "“Nuevo, en las sienes, me duele el cuero cabelludo al peinarme.”", "Cefalea nueva en mayor de 50 con hipersensibilidad del cuero cabelludo."),
    act("claudicacion", "¿Te cansa la mandíbula al masticar?", "clave", "“Sí, tengo que parar de comer.”", "Claudicación mandibular: el síntoma más específico."),
    act("hombros", "¿Te duelen los hombros y la cadera a la mañana?", "util", "“Sí, me cuesta peinarme y levantarme.”", "Polimialgia reumática asociada."),
    act("general", "¿Tuviste fiebre, cansancio o bajaste de peso?", "util", "“Febrícula y bajé 3 kilos.”", "Síntomas sistémicos."),
    act("nietos", "¿Tenés nietos?", "neutro", "“Cinco.”", "No orienta."),
  ],
  exam: [
    act("temporal", "Palpación de las arterias temporales", "clave", "Arteria temporal derecha engrosada, dolorosa, con pulso disminuido.", "Signo clásico de arteritis temporal."),
    act("fondo", "Fondo de ojo y agudeza visual", "clave", "Agudeza normal; papila normal.", "Aún sin neuropatía óptica isquémica: hay tiempo para salvar la visión."),
    act("pulsos", "Pulsos y presión en ambos brazos", "util", "Simétricos.", "Descarta compromiso de grandes vasos."),
  ],
  studies: [
    study("Laboratorio", "vsg", "Eritrosedimentación y PCR", "clave", "VSG 92 mm/h, PCR muy elevada.", "Marcadores inflamatorios muy altos: apoyan el diagnóstico."),
    study("Imágenes", "eco", "Ecografía doppler de arterias temporales", "util", "Signo del halo bilateral.", "Edema de la pared arterial."),
    study("Otros", "biopsia", "Biopsia de arteria temporal (dentro de las 2 semanas de iniciados los corticoides)", "clave", "Arteritis granulomatosa con células gigantes.", "Confirma; no debe demorar el tratamiento."),
    study("Otros", "esperar-biopsia", "Esperar la biopsia para iniciar el tratamiento", "riesgoso", "No se realizó.", "La ceguera puede ser irreversible en horas o días."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("acg", "Arteritis de células gigantes (temporal) con amaurosis fugaz y polimialgia reumática", true, "Mayor de 50 con cefalea nueva temporal, claudicación mandibular, amaurosis fugaz, arteria temporal engrosada, VSG muy alta y biopsia compatible."),
      dx("migrana", "Migraña con aura", false, "No empieza a los 74, y no explica la claudicación mandibular ni la VSG."),
      dx("ait", "Ataque isquémico transitorio carotídeo", false, "La cefalea, la claudicación y la inflamación orientan a arteritis."),
      dx("atm", "Disfunción temporomandibular", false, "No da amaurosis ni VSG alta."),
      dx("glaucoma", "Glaucoma agudo", false, "Ojo blanco, sin dolor ocular ni presión alta."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("corticoides", "Corticoides en dosis altas de inmediato (metilprednisolona EV por los síntomas visuales, luego prednisona)", "clave", "Previenen la ceguera; se inician con la sospecha."),
      mg("biopsia", "Biopsia o ecografía para confirmar sin demorar el tratamiento", "clave", "La biopsia sigue siendo útil hasta 2 semanas después."),
      mg("hueso", "Calcio, vitamina D y bifosfonato para proteger el hueso", "clave", "Los corticoides prolongados producen osteoporosis."),
      mg("aspirina", "Aspirina en dosis bajas si no hay contraindicación", "util", "Puede reducir eventos isquémicos."),
      mg("tocilizumab", "Tocilizumab para ahorrar corticoides en recaídas", "util", "Opción en casos refractarios o con efectos adversos."),
      mg("aine", "Solo antiinflamatorios", "riesgoso", "No previenen la ceguera."),
    ],
  },
  debrief: {
    diagnosis: "Arteritis de células gigantes (temporal) con amaurosis fugaz derecha, claudicación mandibular y polimialgia reumática asociada, en mujer de 74 años.",
    pathologies: [
      { name: "Arteritis de células gigantes", role: "principal", why: "Vasculitis granulomatosa de grandes vasos." },
      { name: "Polimialgia reumática", role: "asociada", why: "Dolor y rigidez de cinturas, frecuente en la arteritis." },
      { name: "Migraña, AIT, disfunción temporomandibular", role: "diferencial", why: "Otras causas de cefalea y síntomas visuales." },
    ],
    reasoning: [
      "Causa: respuesta inmune anómala contra la pared de arterias de mediano y gran calibre en mayores de 50 años.",
      "Mecanismo: inflamación granulomatosa con células gigantes que engrosa la íntima y estrecha la luz, sobre todo de ramas de la carótida externa y de la arteria oftálmica.",
      "Consecuencia: cefalea, claudicación mandibular, síntomas sistémicos y ceguera por neuropatía óptica isquémica anterior.",
    ],
    epidemiology:
      "La arteritis de células gigantes es la vasculitis sistémica más frecuente en adultos mayores. Casi nunca aparece antes de los 50 años, es más frecuente en mujeres y en personas de origen europeo. Hasta la mitad tiene polimialgia reumática, y sin tratamiento una proporción importante pierde la visión.",
    management: [
      "Sospecha en mayores de 50 con cefalea nueva, claudicación mandibular, síntomas visuales o polimialgia.",
      "VSG y PCR, y corticoides en dosis altas inmediatos.",
      "Confirmar con biopsia o ecografía.",
      "Descenso lento de corticoides, protección ósea y seguimiento de recaídas y aortitis.",
    ],
    sources: ["Sociedad Argentina de Reumatología — Guías de vasculitis.", "Criterios ACR/EULAR 2022 de clasificación de la arteritis de células gigantes."],
    pearls: ["Mayor de 50 + cefalea nueva + VSG alta = arteritis.", "Claudicación mandibular.", "Corticoides antes de la biopsia."],
    pitfalls: ["Esperar la biopsia para tratar.", "Atribuir la cefalea a la edad."],
    tribunal: [
      qa("¿Qué es la polimialgia reumática?", "Un cuadro de mayores de 50 con dolor y rigidez matinal de cintura escapular y pelviana, VSG y PCR elevadas, que responde rápidamente a corticoides en dosis bajas; puede asociarse a arteritis de células gigantes."),
      qa("¿Qué complicación vascular tardía tiene la arteritis de células gigantes?", "La aortitis, con riesgo de aneurisma y disección de aorta torácica años después; se recomienda seguimiento con imágenes."),
      qa("¿Cómo se clasifican las vasculitis según el tamaño del vaso?", "Grandes vasos: arteritis de células gigantes y Takayasu. Medianos: poliarteritis nodosa y Kawasaki. Pequeños: asociadas a ANCA (granulomatosis con poliangeítis, poliangeítis microscópica, Churg-Strauss) y por inmunocomplejos (Schönlein-Henoch, crioglobulinemia)."),
    ],
  },
};
