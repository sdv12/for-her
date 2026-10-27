import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const diverticulitis: ClinicalCase = {
  id: "diverticulitis-aguda",
  level: 2,
  area: "Cirugía",
  setting: "Guardia",
  patient: { age: 66, ageUnit: "años", sex: "M", context: "Jubilado. Estreñido desde siempre." },
  frequency: "frecuente",
  intro: "“Hace dos días tengo un dolor abajo a la izquierda que no se me va, con un poco de fiebre. Estoy más constipado que de costumbre.”",
  vitals: { TA: "134/82 mmHg", FC: "92 lpm", FR: "18 rpm", "T°": "38,1 °C" },
  anamnesis: [
    act("dolor", "¿Cómo empezó el dolor y dónde está?", "clave", "“Fue de a poco, en la parte baja izquierda, y está fijo ahí.”", "Dolor progresivo en fosa ilíaca izquierda con fiebre en un mayor de 50: diverticulitis sigmoidea hasta demostrar lo contrario (la “apendicitis izquierda”)."),
    act("ritmo", "¿Cómo va de cuerpo? ¿Vio sangre?", "clave", "“Constipado, sin sangre.”", "La hemorragia diverticular suele ser indolora; la diverticulitis rara vez sangra."),
    act("previos", "¿Tuvo episodios parecidos? ¿Le dijeron que tenía divertículos?", "util", "“En una colonoscopia de hace 5 años vieron divertículos.”", "Antecedente de diverticulosis."),
    act("urinario", "¿Tiene ardor al orinar, aire o materia fecal en la orina?", "clave", "“No.”", "La neumaturia o fecaluria indican fístula colovesical (complicación)."),
    act("peso", "¿Bajó de peso o cambió el calibre de la materia fecal en los últimos meses?", "clave", "“No.”", "Orientaría a cáncer colorrectal, el diferencial importante en esta edad."),
    act("inmuno", "¿Toma corticoides o tiene defensas bajas?", "util", "“No.”", "La inmunosupresión enmascara la gravedad y cambia la conducta."),
    act("dieta", "¿Come fibras, frutas y verduras?", "util", "“Poco, más que nada carne y harinas.”", "La dieta pobre en fibra se asocia a enfermedad diverticular."),
    act("aines", "¿Toma antiinflamatorios?", "util", "“Ibuprofeno a veces.”", "Los AINE se asocian a complicaciones diverticulares."),
    act("nietos", "¿Tiene nietos?", "neutro", "“Dos.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Palpación abdominal", "clave", "Dolor y defensa localizados en fosa ilíaca izquierda, sin peritonismo generalizado; se palpa un empastamiento.", "Inflamación localizada; un abdomen en tabla sugeriría perforación."),
    act("tacto", "Tacto rectal", "util", "Dolor leve a la izquierda, sin sangre ni masas.", "Descarta tumor rectal y sangrado."),
    act("hidratacion", "Hidratación y estado general", "util", "Buen estado general, hidratado, tolera líquidos.", "Define si puede tratarse en forma ambulatoria."),
    act("ruidos", "Auscultación abdominal", "util", "Ruidos hidroaéreos disminuidos.", "Íleo reflejo leve."),
  ],
  studies: [
    study("Imágenes", "tc", "Tomografía de abdomen y pelvis con contraste", "clave", "Engrosamiento del sigma con divertículos y aumento de la densidad de la grasa pericolónica; sin abscesos, aire libre ni líquido.", "Confirma el diagnóstico y descarta complicaciones (clasificación de Hinchey): es el estudio de elección."),
    study("Laboratorio", "lab", "Hemograma, PCR, función renal y orina", "clave", "Leucocitos 13.600, PCR 85 mg/l, creatinina 0,9. Orina normal.", "Valora la inflamación y la función renal antes del contraste."),
    study("Otros", "colono", "Colonoscopia en el episodio agudo", "riesgoso", "No se realizó.", "La insuflación puede perforar un colon inflamado: se hace a las 6–8 semanas para descartar cáncer."),
    study("Imágenes", "rx", "Radiografía de abdomen de pie", "util", "Sin neumoperitoneo ni niveles.", "Útil si no hay tomografía, para descartar perforación u obstrucción."),
    study("Laboratorio", "cea", "CEA (antígeno carcinoembrionario)", "innecesario", "No se realizó.", "No sirve para diagnosticar; el cáncer se descarta con la colonoscopia diferida."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("diverticulitis", "Diverticulitis aguda sigmoidea no complicada", true, "Dolor en fosa ilíaca izquierda con fiebre, leucocitosis y tomografía con inflamación pericolónica sin absceso ni perforación."),
      dx("complicada", "Diverticulitis complicada con absceso", false, "La tomografía no muestra colecciones ni aire."),
      dx("cancer", "Cáncer de colon perforado", false, "Puede imitarla; por eso se hace colonoscopia diferida. Acá no hay pérdida de peso ni masa."),
      dx("colitis", "Colitis isquémica", false, "Dolor brusco con diarrea sanguinolenta en pacientes con vasculopatía."),
      dx("colico", "Cólico renal izquierdo", false, "Dolor cólico irradiado a genitales con hematuria, sin fiebre ni inflamación colónica."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("ambulatorio", "Manejo ambulatorio: dieta líquida y luego progresiva, analgesia y control en 48–72 h", "clave", "La diverticulitis no complicada en un paciente que tolera la vía oral, sin inmunosupresión ni comorbilidades graves, se trata en domicilio."),
      mg("atb", "Antibiótico oral (amoxicilina-clavulánico o ciprofloxacina con metronidazol) en forma selectiva", "util", "Las guías actuales permiten omitirlo en casos no complicados leves; se indica con fiebre, PCR alta, comorbilidades o inmunosupresión."),
      mg("alarma", "Pautas de alarma: fiebre persistente, dolor creciente, vómitos, no tolera líquidos", "clave", "Detectan complicaciones (absceso, perforación)."),
      mg("colono", "Colonoscopia a las 6–8 semanas", "clave", "Descarta un cáncer de colon que puede imitar una diverticulitis."),
      mg("fibra", "Luego: dieta rica en fibra y actividad física", "util", "Prevención de recurrencias."),
      mg("cirugia", "Sigmoidectomía de urgencia", "innecesario", "Se reserva para la peritonitis purulenta o fecaloidea (Hinchey III y IV) o la falla del tratamiento."),
      mg("sin-analgesia", "Evitar toda analgesia para no enmascarar", "riesgoso", "Negar la analgesia no mejora el diagnóstico y aumenta el sufrimiento."),
    ],
  },
  debrief: {
    diagnosis: "Diverticulitis aguda sigmoidea no complicada (Hinchey 0/Ia) en varón de 66 años, para manejo ambulatorio.",
    pathologies: [
      { name: "Diverticulitis aguda no complicada", role: "principal", why: "Inflamación de un divertículo sigmoideo." },
      { name: "Enfermedad diverticular (diverticulosis)", role: "asociada", why: "Sustrato de base." },
      { name: "Cáncer colorrectal", role: "diferencial", why: "El que no hay que perder: colonoscopia diferida." },
      { name: "Diverticulitis complicada", role: "diferencial", why: "Absceso, perforación, fístula u obstrucción." },
    ],
    reasoning: [
      "Causa: los divertículos son herniaciones de la mucosa en los puntos débiles de la pared del colon (donde entran los vasos), favorecidos por la presión intraluminal alta (dieta pobre en fibra, constipación) y la edad.",
      "Mecanismo: un divertículo se obstruye con materia fecal, se inflama y se produce una microperforación con inflamación de la grasa pericolónica.",
      "Consecuencia: dolor en fosa ilíaca izquierda (el sigma es lo más afectado en Occidente), fiebre y leucocitosis; si progresa, absceso, peritonitis, fístula u obstrucción.",
      "Por eso la tomografía define la gravedad y la conducta.",
    ],
    epidemiology:
      "La diverticulosis es muy frecuente: afecta a más de la mitad de los mayores de 60 años en Occidente, y alrededor del 5 % desarrollará diverticulitis. La edad de presentación está bajando y aumenta con la obesidad, el sedentarismo y las dietas pobres en fibra. En menores de 50 es algo más frecuente en varones; en mayores, en mujeres.",
    management: [
      "Sospechar ante dolor en fosa ilíaca izquierda con fiebre en un adulto mayor.",
      "Tomografía con contraste para confirmar y clasificar (Hinchey).",
      "No complicada: ambulatorio, dieta, analgesia, antibiótico selectivo.",
      "Absceso: internación, antibiótico endovenoso y drenaje percutáneo si es grande. Peritonitis: cirugía.",
      "Colonoscopia a las 6–8 semanas; prevención con fibra y actividad física.",
    ],
    sources: [
      "Asociación Argentina de Cirugía — Recomendaciones sobre enfermedad diverticular.",
      "Sociedad Argentina de Coloproctología — Consenso de diverticulitis aguda.",
    ],
    pearls: ["Fosa ilíaca izquierda + fiebre en un mayor = diverticulitis.", "La tomografía clasifica y define la conducta.", "Nada de colonoscopia en el episodio agudo."],
    pitfalls: ["Hacer colonoscopia en agudo.", "Internar y operar todos los casos.", "Olvidar la colonoscopia diferida."],
    tribunal: [
      qa("¿Qué es la clasificación de Hinchey?", "Clasifica la diverticulitis complicada: I absceso pericólico, II absceso pélvico o a distancia, III peritonitis purulenta, IV peritonitis fecaloidea. Se agregó 0 (no complicada) y Ia (inflamación pericólica)."),
      qa("¿Qué diferencia hay entre diverticulosis, diverticulitis y hemorragia diverticular?", "Diverticulosis es la presencia de divertículos sin síntomas. Diverticulitis es su inflamación (dolor, fiebre). La hemorragia diverticular es un sangrado indoloro, a menudo del colon derecho, por rotura de un vaso."),
      qa("¿Qué complicaciones tiene la diverticulitis?", "Absceso, perforación con peritonitis, fístulas (colovesical la más frecuente: neumaturia y fecaluria), estenosis con obstrucción y recurrencias."),
    ],
  },
};
