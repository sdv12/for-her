import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const retinopatiaDiabetica: ClinicalCase = {
  id: "retinopatia-diabetica-proliferativa",
  level: 2,
  area: "Oftalmología",
  setting: "Consultorio",
  patient: { age: 52, ageUnit: "años", sex: "M", context: "Diabetes tipo 2 de 14 años, HbA1c 10 %. Hipertenso. Nunca se hizo un fondo de ojo." },
  frequency: "frecuente",
  intro: "“Hace unos días, de golpe veo manchas negras flotando con el ojo derecho y veo borroso. No me duele.”",
  vitals: { TA: "158/92 mmHg", FC: "78 lpm", "T°": "36,4 °C", Glucemia: "246 mg/dl" },
  anamnesis: [
    act("vision", "¿Cómo perdiste visión? ¿Fue de golpe? ¿Hay dolor?", "clave", "“De golpe, manchas y sin dolor.”", "Sugiere hemorragia vítrea."),
    act("diabetes", "¿Hace cuánto la diabetes? ¿Control ocular?", "clave", "“14 años; ni un control.”", "El tiempo es el principal factor."),
    act("otros", "¿Tenés problemas de riñón? ¿Presión, colesterol, fumás?", "clave", "“Proteínas en orina, y presión alta.”", "Microangiopatía generalizada."),
    act("destellos", "¿Destellos o una cortina?", "util", "“No.”", "Desprendimiento de retina: diferencial."),
    act("anteojos", "¿Usás anteojos?", "util", "“Para leer.”", "Base."),
    act("auto", "¿Manejás?", "neutro", "“Sí.”", "Aunque importa para su seguridad, no define el diagnóstico."),
  ],
  exam: [
    act("agudeza", "Agudeza visual con cartilla", "clave", "OD: cuenta dedos; OI: 8/10.", "Disminución grave en un ojo."),
    act("fondo", "Fondo de ojo con dilatación", "clave", "OI: microaneurismas, hemorragias, exudados, neovasos; OD: hemorragia vítrea.", "Retinopatía proliferativa."),
    act("presion", "Presión ocular e iris", "util", "Normal, sin neovasos en iris.", "Glaucoma neovascular."),
  ],
  studies: [
    study("Imágenes", "oct", "Tomografía de coherencia óptica (OCT)", "clave", "Edema macular en OI.", "Principal causa de pérdida de visión."),
    study("Imágenes", "eco", "Ecografía ocular si no se ve el fondo", "clave", "Hemorragia vítrea, retina aplicada.", "Excluye desprendimiento."),
    study("Laboratorio", "lab", "HbA1c, función renal, albuminuria y lípidos", "clave", "HbA1c 10, filtrado 58, albuminuria 320.", "Control sistémico."),
    study("Imágenes", "tc", "TC de encéfalo", "innecesario", "No se realizó.", "No aporta si no hay signos neurológicos."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("rdp", "Retinopatía diabética proliferativa con hemorragia vítrea y edema macular", true, "Diabetes larga, pérdida brusca, sin dolor, neovasos y hemorragia."),
      dx("desprendimiento", "Desprendimiento de retina", false, "Sin destellos ni cortina, y la retina está aplicada."),
      dx("arteria", "Oclusión de la arteria central de la retina", false, "Daría mancha cereza."),
      dx("glaucoma", "Glaucoma agudo", false, "Da dolor y ojo rojo."),
      dx("catarata", "Catarata", false, "Es progresiva."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("laser", "Derivar con urgencia: panfotocoagulación y antiangiogénicos intravítreos", "clave", "Previene ceguera."),
      mg("vitrectomia", "Vitrectomía si la hemorragia no se resuelve", "clave", "Recupera visión."),
      mg("sistemico", "Control de glucemia, presión y lípidos", "clave", "Enlentece la progresión."),
      mg("gradual", "Bajar la HbA1c de modo gradual", "util", "Un descenso rápido puede empeorar la retinopatía."),
      mg("anteojos", "Anteojos nuevos y control anual", "riesgoso", "Demora un tratamiento urgente."),
      mg("anticoagulantes", "Suspender aspirina sin indicación de cardiología", "innecesario", "No contraindica el tratamiento."),
    ],
  },
  debrief: {
    diagnosis: "Retinopatía diabética proliferativa con hemorragia vítrea en ojo derecho y edema macular en ojo izquierdo, en varón de 52 años.",
    pathologies: [
      { name: "Retinopatía diabética proliferativa", role: "principal", why: "Neovasos por isquemia." },
      { name: "Nefropatía diabética, HTA", role: "asociada", why: "Microangiopatía." },
      { name: "Desprendimiento, oclusión, glaucoma", role: "diferencial", why: "Otras causas de pérdida de visión." },
    ],
    reasoning: [
      "Causa: hiperglucemia crónica con daño de pericitos.",
      "Mecanismo: isquemia retiniana y VEGF, con vasos frágiles que sangran.",
      "Consecuencia: hemorragia vítrea, desprendimiento traccional, edema macular, ceguera.",
    ],
    epidemiology:
      "Es una de las principales causas de ceguera evitable en adultos en edad laboral. En diabetes tipo 2 puede estar presente al diagnóstico, y por eso se indica fondo de ojo en ese momento y cada año. Controlar glucemia y presión reduce mucho el riesgo.",
    management: [
      "Fondo de ojo al diagnóstico en DM2.",
      "Derivación urgente en proliferativa.",
      "Láser y antiangiogénicos.",
      "Control metabólico.",
    ],
    sources: ["Consejo Argentino de Oftalmología — Guías de retinopatía diabética.", "Sociedad Argentina de Diabetes — Recomendaciones."],
    pearls: ["Pérdida brusca e indolora en un diabético: pensá en hemorragia vítrea.", "Sin neovasos: no proliferativa.", "La retina y el riñón van de la mano."],
    pitfalls: ["Mandar a cambiar los anteojos.", "No dilatar la pupila."],
    tribunal: [
      qa("¿Cuáles son los estadios?", "No proliferativa leve, moderada y severa, y proliferativa; el edema macular puede aparecer en cualquiera."),
      qa("¿Qué hallazgos tiene la retinopatía hipertensiva?", "Estrechamiento arteriolar, cruces, hemorragias en llama, exudados algodonosos y papiledema (Keith-Wagener)."),
      qa("¿Cuándo se hace el primer fondo de ojo?", "En DM2, al diagnóstico. En DM1, a los 5 años de evolución o desde la pubertad."),
    ],
  },
};
