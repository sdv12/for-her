import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const iraNefrotoxica: ClinicalCase = {
  id: "insuficiencia-renal-aguda-nefrotoxica",
  level: 3,
  area: "Nefrourología",
  setting: "Internación",
  patient: { age: 62, ageUnit: "años", sex: "M", context: "Internado hace 10 días por una infección de pie diabético. Recibe vancomicina y gentamicina; hace 4 días le hicieron una angiotomografía con contraste." },
  frequency: "frecuente",
  intro: "“Desde ayer orina poco y la creatinina subió de 1,1 a 3,4. Está algo hinchado.” (relata la residente en el pase)",
  vitals: { TA: "148/88 mmHg", FC: "86 lpm", FR: "18 rpm", "T°": "36,8 °C", "SatO₂": "96 %" },
  anamnesis: [
    act("farmacos", "Revisar todas las indicaciones y dosis", "clave", "Vancomicina en dosis altas sin niveles; gentamicina cada 8 h; ibuprofeno a demanda; contraste hace 4 días.", "Varios nefrotóxicos acumulados: aminoglucósido, vancomicina, contraste y AINE."),
    act("volemia", "Balance de líquidos de los últimos días", "clave", "Ingresos mayores que egresos, diuresis de 300 ml en 24 h.", "Oliguria sin deshidratación: orienta a causa renal y no prerrenal."),
    act("obstruccion", "¿Tiene sonda? ¿Antecedentes prostáticos?", "util", "Sonda permeable.", "Descarta causa posrenal."),
    act("diabetes", "Control de la diabetes", "util", "Glucemias de 180–220.", "La diabetes aumenta la susceptibilidad renal."),
    act("hipotension", "¿Tuvo hipotensión?", "util", "No.", "La isquemia es otra causa de necrosis tubular."),
    act("visitas", "¿Quién lo visita?", "neutro", "Su esposa.", "No orienta."),
  ],
  exam: [
    act("volemia-ex", "Volemia: edemas, yugulares, pulmones", "clave", "Edemas en miembros inferiores, yugulares levemente ingurgitadas, rales bibasales leves.", "Sobrecarga de volumen: cuidado con hidratar de más."),
    act("piel", "Piel", "util", "Sin exantema.", "Sin signos de nefritis intersticial alérgica."),
    act("pie", "Herida del pie", "util", "Mejorando.", "La infección responde."),
  ],
  studies: [
    study("Laboratorio", "lab", "Creatinina, urea, ionograma, gases", "clave", "Creatinina 3,4, K 5,8, bicarbonato 17.", "Insuficiencia renal aguda con hiperpotasemia y acidosis."),
    study("Laboratorio", "orina", "Sedimento urinario y sodio urinario (fracción excretada)", "clave", "Cilindros granulosos pardos, FENa 3 %.", "Necrosis tubular aguda."),
    study("Laboratorio", "niveles", "Niveles de vancomicina y gentamicina", "clave", "Valle de vancomicina 32 µg/ml, gentamicina elevada.", "Niveles tóxicos."),
    study("Imágenes", "eco", "Ecografía renal y vesical", "util", "Riñones normales, sin hidronefrosis.", "Descarta obstrucción."),
    study("Imágenes", "contraste-otra-vez", "Otra tomografía con contraste para controlar el pie", "riesgoso", "No se realizó.", "Más contraste empeora la lesión renal."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("nta", "Insuficiencia renal aguda por necrosis tubular aguda nefrotóxica (aminoglucósido, vancomicina, contraste y AINE)", true, "Creatinina que triplica la basal con oliguria, cilindros granulosos, FENa mayor de 2 %, sin obstrucción ni hipovolemia, con varios nefrotóxicos."),
      dx("prerrenal", "Insuficiencia renal prerrenal", false, "Hay sobrecarga de volumen y FENa mayor de 2 % con cilindros granulosos."),
      dx("posrenal", "Insuficiencia renal posrenal", false, "Sin hidronefrosis y con sonda permeable."),
      dx("nia", "Nefritis intersticial aguda alérgica", false, "No hay fiebre, exantema ni eosinofilia; el patrón es tubular por tóxicos."),
      dx("gn", "Glomerulonefritis", false, "Sin hematuria dismórfica ni proteinuria importante."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("suspender", "Suspender gentamicina e ibuprofeno; ajustar o cambiar la vancomicina según niveles y cultivo", "clave", "Retirar los nefrotóxicos es lo más importante."),
      mg("dosis", "Ajustar todas las dosis al filtrado", "clave", "Evita más toxicidad."),
      mg("hiperk", "Tratar la hiperpotasemia y controlar diuresis, peso y electrolitos", "clave", "Complicaciones de la falla renal."),
      mg("dialisis", "Diálisis si hay hiperpotasemia refractaria, acidosis grave, sobrecarga o uremia", "util", "Indicaciones de urgencia."),
      mg("hidratar-mucho", "Dos litros de solución fisiológica para “lavar” el riñón", "riesgoso", "Tiene sobrecarga: puede producir edema pulmonar."),
      mg("furosemida-dosis", "Furosemida en dosis altas para convertirla en no oligúrica", "innecesario", "No mejora el pronóstico; solo se usa para la sobrecarga."),
    ],
  },
  debrief: {
    diagnosis: "Insuficiencia renal aguda (KDIGO 3) por necrosis tubular aguda nefrotóxica (gentamicina, vancomicina con niveles tóxicos, contraste yodado e ibuprofeno), con hiperpotasemia, acidosis y sobrecarga de volumen, en varón diabético de 62 años.",
    pathologies: [
      { name: "Necrosis tubular aguda nefrotóxica", role: "principal", why: "Daño tubular por fármacos." },
      { name: "Hiperpotasemia, acidosis y sobrecarga", role: "asociada", why: "Complicaciones." },
      { name: "Prerrenal, posrenal, nefritis intersticial", role: "diferencial", why: "Otras causas de falla renal aguda." },
    ],
    reasoning: [
      "Causa: suma de nefrotóxicos en un riñón diabético.",
      "Mecanismo: los aminoglucósidos y la vancomicina se acumulan en las células tubulares y las necrosan; el contraste produce vasoconstricción y toxicidad; los AINE reducen el flujo renal.",
      "Consecuencia: caída del filtrado, oliguria, retención de potasio, acidosis y volumen.",
    ],
    epidemiology:
      "La insuficiencia renal aguda afecta a alrededor del 10–20 % de los pacientes internados y es más frecuente en mayores, diabéticos y con enfermedad renal previa. Los fármacos nefrotóxicos causan una proporción importante y en gran parte evitable.",
    management: [
      "Clasificar en prerrenal, renal o posrenal (volemia, orina, ecografía).",
      "Suspender nefrotóxicos y ajustar dosis.",
      "Manejo de volumen, potasio y acidosis.",
      "Diálisis según indicaciones.",
    ],
    sources: ["Sociedad Argentina de Nefrología — Recomendaciones sobre lesión renal aguda.", "Guías KDIGO de lesión renal aguda."],
    pearls: ["Revisar la lista de fármacos.", "Cilindros granulosos + FENa alta = NTA.", "No hidratar a un paciente sobrecargado."],
    pitfalls: ["Seguir con los nefrotóxicos.", "Hidratar sin evaluar la volemia."],
    tribunal: [
      qa("¿Cuáles son las indicaciones de diálisis de urgencia?", "Se recuerdan como AEIOU: acidosis grave, electrolitos (hiperpotasemia refractaria), intoxicaciones dializables, sobrecarga (overload) de volumen refractaria y uremia sintomática (pericarditis, encefalopatía, sangrado)."),
      qa("¿Cómo se clasifica la lesión renal aguda según KDIGO?", "Estadio 1: creatinina 1,5–1,9 veces la basal o aumento de 0,3 mg/dl, o diuresis menor de 0,5 ml/kg/h por 6–12 h. Estadio 2: 2–2,9 veces o diuresis baja por más de 12 h. Estadio 3: 3 veces, creatinina de 4 o más, diálisis, o anuria de 12 h."),
      qa("¿Cómo se previene la nefropatía por contraste?", "Evaluando el riesgo (enfermedad renal, diabetes), usando la menor dosis de contraste isoosmolar, hidratando con cristaloides antes y después en pacientes de riesgo y suspendiendo nefrotóxicos."),
    ],
  },
};
