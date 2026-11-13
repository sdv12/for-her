import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const tepPostoperatorioRodilla: ClinicalCase = {
  id: "tep-postoperatorio-artroplastia",
  level: 3,
  area: "Respiratorio",
  setting: "Guardia",
  patient: { age: 71, ageUnit: "años", sex: "F", context: "Prótesis de rodilla izquierda hace 12 días. Suspendió la enoxaparina a los 5 días porque le dolían las inyecciones." },
  frequency: "frecuente",
  intro: "“De golpe me faltó el aire caminando al baño, me duele el costado al respirar y tosí con un poco de sangre.”",
  vitals: { TA: "124/76 mmHg", FC: "118 lpm", FR: "28 rpm", "T°": "37,6 °C", "SatO₂": "88 %" },
  anamnesis: [
    act("cirugia", "¿Qué cirugía y cuándo?", "clave", "“Prótesis de rodilla hace 12 días.”", "Riesgo alto de TEV."),
    act("profilaxis", "¿Cumplió la profilaxis?", "clave", "“La dejé al quinto día.”", "Profilaxis insuficiente."),
    act("inicio", "¿Cómo empezó?", "clave", "“De golpe.”", "Súbito."),
    act("pierna", "¿Se le hinchó más la pierna?", "util", "“La izquierda, pero pensé que era por la operación.”", "TVP."),
    act("sincope", "¿Se desmayó?", "util", "“No.”", "Gravedad."),
    act("nieta", "¿Quién la acompaña?", "neutro", "“Mi nieta.”", "No orienta."),
  ],
  exam: [
    act("pierna-ex", "Miembros inferiores", "clave", "Pantorrilla izquierda 3 cm más gruesa, dolorosa.", "TVP."),
    act("cardio", "Examen cardiovascular", "clave", "Taquicardia, P2 aumentado, sin ingurgitación.", "Sin falla derecha franca."),
    act("pulmon", "Auscultación pulmonar", "util", "Frote pleural en base derecha.", "Infarto pulmonar."),
  ],
  studies: [
    study("Imágenes", "angiotc", "Angiotomografía de tórax", "clave", "Defectos en arteria lobar inferior derecha y segmentarias; relación VD/VI 0,9.", "TEP sin dilatación del VD."),
    study("Laboratorio", "lab", "Troponina, BNP, creatinina, hemograma", "clave", "Troponina normal, BNP normal, creatinina 0,9.", "Riesgo intermedio-bajo."),
    study("Imágenes", "doppler", "Doppler venoso", "util", "TVP poplítea izquierda.", "Origen."),
    study("Laboratorio", "dimero", "Dímero D en paciente con alta probabilidad", "innecesario", "No se realizó.", "No cambia la conducta; se va directo a imágenes."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("tep", "TEP agudo de riesgo intermedio-bajo con TVP poplítea, postoperatorio de artroplastia", true, "Disnea súbita, hipoxemia, TVP, angiotomografía positiva, sin hipotensión ni disfunción del VD."),
      dx("nac", "Neumonía", false, "Inicio súbito y angiotomografía con defectos."),
      dx("tep-masivo", "TEP de alto riesgo", false, "Sin hipotensión."),
      dx("atelectasia", "Atelectasia postoperatoria", false, "Hay trombos."),
      dx("iam", "IAM", false, "Troponina normal y TEP documentado."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("anticoagular", "Anticoagulación con heparina de bajo peso o anticoagulante directo", "clave", "Tratamiento."),
      mg("oxigeno", "Oxígeno", "clave", "Hipoxemia."),
      mg("duracion", "Anticoagular 3 meses (factor transitorio)", "clave", "Duración."),
      mg("movilizacion", "Movilización temprana con anticoagulación", "util", "Rehabilitación."),
      mg("trombolisis", "Trombolíticos", "riesgoso", "Sin indicación y con cirugía reciente."),
      mg("filtro", "Filtro de vena cava de rutina", "riesgoso", "Solo si no se puede anticoagular."),
    ],
  },
  debrief: {
    diagnosis: "TEP agudo de riesgo intermedio-bajo con TVP poplítea izquierda, en mujer de 71 años en el postoperatorio de artroplastia de rodilla con profilaxis suspendida.",
    pathologies: [
      { name: "Tromboembolismo pulmonar", role: "principal", why: "Embolia desde la pierna operada." },
      { name: "TVP poplítea", role: "asociada", why: "Origen." },
      { name: "Neumonía, atelectasia", role: "diferencial", why: "Complicaciones postoperatorias." },
    ],
    reasoning: [
      "Causa: cirugía ortopédica mayor con inmovilidad y profilaxis incompleta.",
      "Mecanismo: tríada de Virchow con trombo que migra al pulmón.",
      "Consecuencia: hipoxemia, dolor pleurítico e infarto pulmonar.",
    ],
    epidemiology:
      "Las artroplastias de cadera y rodilla tienen de los riesgos más altos de tromboembolismo venoso. La profilaxis debe seguir al menos 10 a 14 días, y más en cadera. La mala adherencia a la profilaxis es un factor frecuente.",
    management: [
      "Probabilidad clínica.",
      "Angiotomografía.",
      "Estratificar el riesgo.",
      "Anticoagular.",
    ],
    sources: ["Sociedad Argentina de Cardiología — Consenso de enfermedad tromboembólica venosa.", "ESC — Acute Pulmonary Embolism Guidelines."],
    pearls: ["Profilaxis completa.", "Estratificá con VD y troponina.", "Factor transitorio: 3 meses."],
    pitfalls: ["Trombolisis sin shock.", "Dímero D con probabilidad alta."],
    tribunal: [
      qa("¿Cómo se estratifica el riesgo del TEP?", "Por hipotensión, escala PESI, disfunción del VD y troponina."),
      qa("¿Cuándo se trombolisa?", "En TEP de alto riesgo con hipotensión, si no hay contraindicación."),
      qa("¿Cuánto dura la profilaxis tras prótesis de rodilla?", "Al menos 10 a 14 días, hasta 35 días según el riesgo."),
    ],
  },
};
