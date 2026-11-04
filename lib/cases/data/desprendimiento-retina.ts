import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const desprendimientoRetina: ClinicalCase = {
  id: "desprendimiento-de-retina",
  level: 2,
  area: "Oftalmología",
  setting: "Guardia",
  patient: { age: 59, ageUnit: "años", sex: "M", context: "Miope alto (usa anteojos gruesos desde chico). Operado de cataratas en ese ojo hace un año." },
  frequency: "poco-frecuente",
  intro: "“Desde ayer veo lucecitas y muchas manchitas negras flotando en el ojo derecho, y hoy apareció como una cortina oscura en la parte de arriba.”",
  vitals: { TA: "132/82 mmHg", FC: "74 lpm", "T°": "36,4 °C" },
  anamnesis: [
    act("sintomas", "¿Ves destellos, moscas volantes o una sombra?", "clave", "“Destellos y muchas manchitas, y ahora una cortina arriba.”", "Fotopsias, miodesopsias y defecto de campo: desprendimiento de retina."),
    act("dolor", "¿Te duele el ojo? ¿Está rojo?", "clave", "“No duele ni está rojo.”", "Indoloro, sin ojo rojo."),
    act("factores", "¿Sos miope? ¿Te operaron del ojo?", "clave", "“Muy miope y operado de cataratas.”", "Factores de riesgo."),
    act("trauma", "¿Te golpeaste el ojo?", "util", "“No.”", "Descarta causa traumática."),
    act("diabetes", "¿Sos diabético?", "util", "“No.”", "Descarta desprendimiento traccional."),
    act("auto", "¿Manejás?", "neutro", "“Sí.”", "No orienta."),
  ],
  exam: [
    act("agudeza", "Agudeza visual y campo visual por confrontación", "clave", "Agudeza 8/10; defecto del campo superior derecho.", "La mácula todavía está aplicada (buen pronóstico si se opera rápido)."),
    act("fondo", "Fondo de ojo con dilatación", "clave", "Retina inferior desprendida, gris y ondulada, con un desgarro.", "Desprendimiento regmatógeno."),
    act("anterior", "Segmento anterior", "util", "Ojo blanco, lente intraocular.", "Sin glaucoma ni uveítis."),
  ],
  studies: [
    study("Imágenes", "eco-ocular", "Ecografía ocular si no se ve el fondo", "util", "Desprendimiento de retina inferior.", "Confirma si el fondo no es visible."),
    study("Imágenes", "tc", "Tomografía de órbitas", "innecesario", "No se realizó.", "No aporta."),
    study("Otros", "esperar", "Control en una semana", "riesgoso", "No se realizó.", "Si se desprende la mácula, la visión central se pierde."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("drr", "Desprendimiento de retina regmatógeno del ojo derecho con mácula aplicada", true, "Fotopsias, miodesopsias y cortina en el campo visual en un miope alto operado de cataratas, con retina desprendida y desgarro."),
      dx("dpv", "Desprendimiento de vítreo posterior simple", false, "Da destellos y moscas, pero no defecto de campo ni retina desprendida."),
      dx("migrana", "Migraña con aura", false, "El aura es bilateral, transitoria, con cefalea."),
      dx("acv", "Amaurosis fugaz por ACV", false, "No es transitoria y el fondo muestra desprendimiento."),
      dx("glaucoma", "Glaucoma agudo", false, "Ojo blanco y sin dolor."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("oftalmo", "Derivación urgente a oftalmología (retina) para cirugía en horas", "clave", "Con mácula aplicada, la cirugía urgente preserva la visión central."),
      mg("reposo", "Reposo relativo y evitar esfuerzos mientras se deriva", "util", "Puede frenar la progresión."),
      mg("otro-ojo", "Control del otro ojo", "util", "Riesgo bilateral en miopes."),
      mg("educacion", "Explicar los síntomas de alarma a miopes y operados de cataratas", "clave", "Consulta precoz."),
      mg("colirio", "Colirio antibiótico y control", "innecesario", "No trata el desprendimiento."),
      mg("anteojos", "Cambiar la graduación de los anteojos", "riesgoso", "Demora una urgencia."),
    ],
  },
  debrief: {
    diagnosis: "Desprendimiento de retina regmatógeno del ojo derecho con mácula aplicada, en miope alto de 59 años operado de cataratas.",
    pathologies: [
      { name: "Desprendimiento de retina regmatógeno", role: "principal", why: "Separación de la retina por un desgarro." },
      { name: "Miopía alta y cirugía de cataratas", role: "asociada", why: "Factores de riesgo." },
      { name: "Desprendimiento de vítreo, migraña, ACV", role: "diferencial", why: "Otras causas de síntomas visuales." },
    ],
    reasoning: [
      "Causa: el vítreo se despega con la edad y tracciona la retina, que se desgarra.",
      "Mecanismo: el líquido entra por el desgarro y separa la retina del epitelio pigmentario.",
      "Consecuencia: pérdida del campo visual que avanza hacia el centro; si se desprende la mácula, baja la visión central.",
    ],
    epidemiology:
      "El desprendimiento de retina afecta a alrededor de 1 de cada 10.000 personas por año, más a varones de 50 a 70 años, miopes y operados de cataratas. Es una urgencia oftalmológica indolora que se consulta tarde.",
    management: [
      "Sospechar ante destellos, moscas volantes nuevas y sombra en el campo visual.",
      "Fondo de ojo con dilatación.",
      "Derivación urgente para cirugía (vitrectomía, cerclaje o neumorretinopexia).",
      "Educación de grupos de riesgo.",
    ],
    sources: ["Consejo Argentino de Oftalmología — Urgencias en retina.", "Sociedad Argentina de Retina y Vítreo — Recomendaciones."],
    pearls: ["Destellos + moscas + cortina = desprendimiento.", "Indoloro y sin ojo rojo.", "Mácula aplicada = urgencia de horas."],
    pitfalls: ["Diagnosticar desprendimiento de vítreo sin fondo de ojo.", "Esperar."],
    tribunal: [
      qa("¿Qué causas de pérdida visual aguda indolora hay?", "Desprendimiento de retina, oclusión de arteria o vena central de la retina, hemorragia vítrea, neuropatía óptica isquémica (incluida la arteritis), ACV occipital y neuritis óptica (esta suele doler con los movimientos)."),
      qa("¿Qué tipos de desprendimiento de retina hay?", "Regmatógeno (por desgarro, el más frecuente), traccional (por membranas fibrovasculares, en diabetes) y exudativo (por líquido sin desgarro, en inflamaciones o tumores)."),
      qa("¿Qué es la oclusión de la arteria central de la retina?", "Una pérdida visual brusca, indolora y grave por un émbolo, con mancha rojo cereza en la mácula; es un ACV ocular y requiere estudio cardiovascular urgente."),
    ],
  },
};
