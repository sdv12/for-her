import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const pielonefritisMujerJoven: ClinicalCase = {
  id: "pielonefritis-aguda-mujer-joven",
  level: 2,
  area: "Nefrourología",
  setting: "Guardia",
  patient: { age: 26, ageUnit: "años", sex: "F", context: "Sana. Tuvo cistitis hace una semana y se automedicó dos días." },
  frequency: "muy-frecuente",
  intro: "“Hace dos días tengo fiebre alta con escalofríos, me duele la cintura del lado derecho y vomité. La semana pasada me ardía al orinar.”",
  vitals: { TA: "112/70 mmHg", FC: "104 lpm", FR: "18 rpm", "T°": "39,2 °C" },
  anamnesis: [
    act("embarazo", "¿Podés estar embarazada?", "clave", "“No, me vino hace diez días.”", "El embarazo cambia el antibiótico y obliga a internar."),
    act("cistitis", "¿Qué tomaste para la cistitis?", "clave", "“Unas pastillas que tenía, dos días.”", "Tratamiento incompleto: puede haber ascendido la infección."),
    act("vomitos", "¿Tolerás líquidos y pastillas?", "clave", "“Vomité dos veces, ahora tolero agua.”", "Si tolera la vía oral se puede tratar en forma ambulatoria."),
    act("litiasis", "¿Tuviste cálculos o dolor tipo cólico?", "util", "“No.”", "Una obstrucción complicaría la pielonefritis."),
    act("alergia", "¿Sos alérgica a algún antibiótico?", "util", "“No.”", "Define el tratamiento."),
    act("carrera", "¿A qué te dedicás?", "neutro", "“Soy maestra.”", "No orienta."),
  ],
  exam: [
    act("punio", "Puño percusión lumbar", "clave", "Positiva a la derecha.", "Compromiso renal."),
    act("perfusion", "Perfusión y estado general", "clave", "Lúcida, bien perfundida.", "Sin sepsis."),
    act("abdomen", "Abdomen", "util", "Blando, dolor leve en flanco derecho.", "Descarta abdomen agudo."),
  ],
  studies: [
    study("Laboratorio", "orina", "Orina completa y urocultivo antes del antibiótico", "clave", "Leucocituria, nitritos positivos; urocultivo: E. coli sensible a ciprofloxacina y cefalosporinas.", "Confirma y guía el tratamiento."),
    study("Laboratorio", "lab", "Hemograma, creatinina, PCR y prueba de embarazo", "clave", "Leucocitos 16.000, creatinina normal, embarazo negativo.", "Evalúa gravedad."),
    study("Imágenes", "eco", "Ecografía renal", "util", "Sin dilatación ni abscesos.", "Descarta obstrucción; indicada si no mejora en 48–72 h o hay dudas."),
    study("Imágenes", "tc", "Tomografía de abdomen con contraste de rutina", "innecesario", "No se realizó.", "Solo si no mejora o se sospecha complicación."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("pna", "Pielonefritis aguda no complicada", true, "Fiebre con escalofríos, dolor lumbar, puño percusión positiva y orina infecciosa tras una cistitis mal tratada, en mujer no embarazada y sana."),
      dx("cistitis", "Cistitis", false, "La fiebre y el dolor lumbar indican compromiso renal."),
      dx("colico", "Cólico renal", false, "No hay dolor cólico y sí hay fiebre e infección."),
      dx("apendicitis", "Apendicitis", false, "El dolor es lumbar con orina infectada."),
      dx("epi", "Enfermedad pelviana inflamatoria", false, "Sin dolor pelviano ni flujo; orina infectada."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("atb", "Antibiótico oral según sensibilidad local (ciprofloxacina 7 días o cefalosporina), con primera dosis parenteral (ceftriaxona)", "clave", "Tratamiento ambulatorio si tolera la vía oral y no hay gravedad."),
      mg("control", "Control a las 48–72 h y ajustar con el urocultivo", "clave", "Si no mejora, buscar complicaciones."),
      mg("alarma", "Pautas de alarma: vómitos persistentes, mareos, empeoramiento", "util", "Indican internación."),
      mg("nitrofurantoina", "Nitrofurantoína", "riesgoso", "No alcanza niveles en el riñón: no sirve para pielonefritis."),
      mg("internar", "Internación de rutina", "innecesario", "Puede tratarse en forma ambulatoria."),
      mg("hidratacion", "Hidratación y antitérmicos", "util", "Alivio."),
    ],
  },
  debrief: {
    diagnosis: "Pielonefritis aguda derecha no complicada por E. coli, en mujer de 26 años no embarazada, tras una cistitis tratada en forma incompleta.",
    pathologies: [
      { name: "Pielonefritis aguda no complicada", role: "principal", why: "Infección del parénquima renal." },
      { name: "Cistitis previa mal tratada", role: "asociada", why: "Origen ascendente." },
      { name: "Cólico renal, apendicitis, EPI", role: "diferencial", why: "Otras causas de dolor y fiebre." },
    ],
    reasoning: [
      "Causa: E. coli de la flora intestinal que asciende por la uretra.",
      "Mecanismo: la infección vesical asciende por los uréteres al riñón.",
      "Consecuencia: fiebre, dolor lumbar, compromiso sistémico; si es complicada, absceso, sepsis o daño renal.",
    ],
    epidemiology:
      "Las infecciones urinarias son muy frecuentes en mujeres jóvenes; la pielonefritis es menos frecuente que la cistitis pero más grave. E. coli causa la mayoría. La resistencia a quinolonas y trimetoprima-sulfametoxazol es creciente en Argentina.",
    management: [
      "Urocultivo antes del antibiótico.",
      "Ambulatorio si no hay gravedad, embarazo, intolerancia oral ni complicaciones.",
      "Antibiótico según epidemiología local, ajustado al cultivo.",
      "Imagen si no mejora o se sospecha obstrucción.",
    ],
    sources: ["Sociedad Argentina de Infectología — Recomendaciones de infecciones urinarias.", "Sociedad Argentina de Nefrología — Guía de infección urinaria."],
    pearls: ["Fiebre + dolor lumbar + orina infectada = pielonefritis.", "Nitrofurantoína no sirve.", "Urocultivo siempre."],
    pitfalls: ["Tratar como cistitis.", "No descartar embarazo."],
    tribunal: [
      qa("¿Cuándo una infección urinaria es complicada?", "Cuando hay embarazo, sexo masculino, anomalías o obstrucción urinaria, sonda, litiasis, inmunosupresión, insuficiencia renal, diabetes mal controlada o gérmenes resistentes."),
      qa("¿Cuándo se interna una pielonefritis?", "Con sepsis, vómitos que impiden la vía oral, embarazo, obstrucción o complicación, comorbilidades graves, falta de respuesta o imposibilidad de seguimiento."),
      qa("¿Qué es la bacteriuria asintomática y cuándo se trata?", "Bacterias en la orina sin síntomas; solo se trata en embarazadas y antes de procedimientos urológicos con sangrado de mucosa. En adultos mayores o con sonda no se trata."),
    ],
  },
};
