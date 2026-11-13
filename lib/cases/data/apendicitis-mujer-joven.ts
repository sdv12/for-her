import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const apendicitisMujerJoven: ClinicalCase = {
  id: "apendicitis-mujer-joven",
  level: 2,
  area: "Cirugía",
  setting: "Guardia",
  patient: { age: 24, ageUnit: "años", sex: "F", context: "Usa DIU de cobre. Pareja estable." },
  frequency: "muy-frecuente",
  intro: "“Ayer me dolía alrededor del ombligo y ahora me duele abajo a la derecha. Tengo náuseas y no quise comer.”",
  vitals: { TA: "118/74 mmHg", FC: "98 lpm", FR: "18 rpm", "T°": "37,9 °C", "SatO₂": "99 %" },
  anamnesis: [
    act("migracion", "¿Dónde empezó el dolor?", "clave", "“En el ombligo, después bajó a la derecha.”", "Migración típica."),
    act("fum", "¿Cuándo fue tu última menstruación?", "clave", "“Hace dos semanas, normal.”", "Embarazo y ciclo."),
    act("flujo", "¿Flujo raro, dolor en las relaciones o al orinar?", "clave", "“No.”", "EPI e infección urinaria."),
    act("anorexia", "¿Tenés hambre?", "util", "“Nada.”", "Anorexia."),
    act("vomitos", "¿Vomitaste?", "util", "“Una vez, después del dolor.”", "Secuencia típica."),
    act("trabajo", "¿Trabajás?", "neutro", "“En una farmacia.”", "No orienta."),
  ],
  exam: [
    act("mcburney", "Punto de McBurney y rebote", "clave", "Dolor y rebote en fosa ilíaca derecha.", "Irritación peritoneal."),
    act("tacto", "Tacto vaginal", "clave", "Sin dolor a la movilización del cuello; anexos sin masas; hilos del DIU visibles.", "Descarta EPI y masa anexial."),
    act("signos", "Rovsing y psoas", "util", "Rovsing positivo.", "Apendicitis."),
  ],
  studies: [
    study("Laboratorio", "bhcg", "Subunidad beta de hCG", "clave", "Negativa.", "Descarta ectópico."),
    study("Imágenes", "eco", "Ecografía abdominal y transvaginal", "clave", "Apéndice no compresible de 9 mm con grasa inflamada; ovarios normales.", "Apendicitis."),
    study("Laboratorio", "lab", "Hemograma, PCR, orina completa", "util", "Leucocitos 14.500; PCR 4; orina normal.", "Inflamación."),
    study("Otros", "retirar-diu", "Retirar el DIU por sospecha de EPI", "innecesario", "No se realizó.", "No hay EPI."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("apendicitis", "Apendicitis aguda no complicada", true, "Migración del dolor, anorexia, McBurney y rebote, beta negativa y apéndice engrosado."),
      dx("epi", "Enfermedad pélvica inflamatoria", false, "Sin dolor a la movilización cervical ni flujo."),
      dx("ectopico", "Embarazo ectópico", false, "Beta negativa."),
      dx("torsion", "Torsión ovárica", false, "Ovarios normales."),
      dx("pielonefritis", "Pielonefritis", false, "Orina normal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cirugia", "Apendicectomía laparoscópica", "clave", "Tratamiento de elección."),
      mg("atb", "Profilaxis antibiótica preoperatoria", "clave", "Infección del sitio quirúrgico."),
      mg("ayuno", "Ayuno, hidratación y analgesia", "clave", "Preparación."),
      mg("explicar", "Explicar que el DIU puede quedarse", "util", "Tranquilidad."),
      mg("alta-atb", "Alta con antibiótico oral sin cirujano", "riesgoso", "Perforación."),
      mg("sin-analgesia", "Negar analgesia hasta que la vea el cirujano", "riesgoso", "No enmascara el diagnóstico y es maltrato."),
    ],
  },
  debrief: {
    diagnosis: "Apendicitis aguda no complicada, en mujer de 24 años con DIU.",
    pathologies: [
      { name: "Apendicitis aguda", role: "principal", why: "Obstrucción e infección del apéndice." },
      { name: "Diagnóstico diferencial ginecológico", role: "asociada", why: "Clave en mujeres jóvenes." },
      { name: "EPI, ectópico, torsión", role: "diferencial", why: "Dolor en fosa ilíaca derecha." },
    ],
    reasoning: [
      "Causa: obstrucción de la luz apendicular.",
      "Mecanismo: distensión, isquemia e invasión bacteriana de la pared.",
      "Consecuencia: dolor visceral periumbilical que luego se vuelve parietal en la fosa ilíaca derecha.",
    ],
    epidemiology:
      "Es la urgencia quirúrgica abdominal más frecuente. En mujeres jóvenes la tasa de apendicectomías en blanco es mayor por la superposición con causas ginecológicas. La beta-hCG y la ecografía transvaginal reducen errores.",
    management: [
      "Beta-hCG.",
      "Ecografía.",
      "Analgesia.",
      "Cirugía.",
    ],
    sources: ["Asociación Argentina de Cirugía — Apendicitis aguda.", "WSES — Jerusalem Guidelines for Diagnosis and Treatment of Acute Appendicitis."],
    pearls: ["Toda mujer: beta-hCG.", "Migración del dolor.", "La analgesia no enmascara."],
    pitfalls: ["Rotular EPI sin examen.", "Negar analgesia."],
    tribunal: [
      qa("¿Qué es la escala de Alvarado?", "Puntaje con síntomas, signos y laboratorio para estimar la probabilidad de apendicitis."),
      qa("¿Por qué el dolor empieza en el ombligo?", "Porque el dolor visceral del apéndice se refiere al dermatoma T10."),
      qa("¿Cuándo se puede intentar tratamiento antibiótico sin cirugía?", "En apendicitis no complicada seleccionada, con riesgo de recurrencia."),
    ],
  },
};
