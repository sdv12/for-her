import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const manguitoRotador: ClinicalCase = {
  id: "tendinopatia-manguito-rotador",
  level: 1,
  area: "Traumatología",
  setting: "Consultorio",
  patient: { age: 54, ageUnit: "años", sex: "F", context: "Empleada de limpieza. Diabética." },
  frequency: "muy-frecuente",
  intro: "“Hace dos meses me duele el hombro derecho cuando levanto el brazo para colgar la ropa o limpiar los vidrios. De noche no puedo dormir de ese lado.”",
  vitals: { TA: "128/80 mmHg", FC: "74 lpm", "T°": "36,4 °C" },
  anamnesis: [
    act("dolor", "¿Cuándo duele más?", "clave", "“Al levantar el brazo por encima del hombro y acostada sobre ese lado.”", "Dolor en el arco de elevación y nocturno: típico del manguito rotador."),
    act("trauma", "¿Tuviste una caída o golpe?", "clave", "“No.”", "Sin trauma: tendinopatía por sobreuso."),
    act("fuerza", "¿Perdiste fuerza para levantar el brazo?", "util", "“No, solo duele.”", "Sin rotura completa evidente."),
    act("cuello", "¿El dolor baja por el brazo con hormigueos?", "util", "“No.”", "Descarta radiculopatía cervical."),
    act("rigidez", "¿Podés mover el brazo en todas las direcciones si te lo mueve otro?", "util", "“Sí, me duele pero se mueve.”", "Movilidad pasiva conservada: no es capsulitis adhesiva."),
    act("novela", "¿Mirás novelas?", "neutro", "“A veces.”", "No orienta."),
  ],
  exam: [
    act("arco", "Arco doloroso y movilidad activa y pasiva", "clave", "Arco doloroso entre 60 y 120° de abducción; movilidad pasiva completa.", "Pinzamiento subacromial."),
    act("maniobras", "Maniobras de Neer, Hawkins y Jobe", "clave", "Neer y Hawkins positivas; Jobe con dolor sin debilidad.", "Tendinopatía del supraespinoso."),
    act("cervical", "Columna cervical", "util", "Normal.", "Descarta dolor referido."),
  ],
  studies: [
    study("Imágenes", "eco", "Ecografía de hombro si no mejora en 6 semanas", "util", "Tendinopatía del supraespinoso sin rotura completa.", "Confirma y evalúa roturas."),
    study("Imágenes", "rmn", "Resonancia de hombro en la primera consulta", "innecesario", "No se realizó.", "Sin trauma ni debilidad no está indicada al inicio."),
    study("Laboratorio", "lab", "Laboratorio inflamatorio", "innecesario", "No se realizó.", "No aporta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("manguito", "Tendinopatía del manguito rotador (supraespinoso) con síndrome de pinzamiento subacromial", true, "Dolor en el arco de elevación y nocturno, Neer y Hawkins positivos, movilidad pasiva conservada, trabajo con brazos elevados."),
      dx("capsulitis", "Capsulitis adhesiva (hombro congelado)", false, "La movilidad pasiva está conservada."),
      dx("rotura", "Rotura completa del manguito", false, "No hay debilidad marcada."),
      dx("cervical", "Radiculopatía cervical", false, "Sin dolor irradiado ni parestesias."),
      dx("artrosis", "Artrosis glenohumeral", false, "Daría limitación global con crepitación."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("ejercicios", "Ejercicios de fortalecimiento y kinesiología", "clave", "Primera línea: mejora el dolor y la función."),
      mg("actividad", "Modificar las tareas con los brazos elevados", "clave", "Reduce la sobrecarga."),
      mg("analgesia", "Analgésicos o AINE por tiempo limitado", "util", "Alivio."),
      mg("infiltracion", "Infiltración subacromial con corticoide si no mejora", "util", "Alivio a corto plazo; con cuidado en diabéticos."),
      mg("cabestrillo", "Inmovilizar con cabestrillo semanas", "riesgoso", "Favorece el hombro congelado, sobre todo en diabéticos."),
      mg("cirugia", "Cirugía de entrada", "innecesario", "Se reserva para roturas o fracaso del tratamiento."),
    ],
  },
  debrief: {
    diagnosis: "Tendinopatía del supraespinoso con pinzamiento subacromial derecho, sin rotura completa, en mujer de 54 años diabética con trabajo de brazos elevados.",
    pathologies: [
      { name: "Tendinopatía del manguito rotador", role: "principal", why: "Degeneración y sobrecarga del supraespinoso." },
      { name: "Diabetes", role: "asociada", why: "Riesgo de hombro congelado." },
      { name: "Capsulitis, rotura, radiculopatía", role: "diferencial", why: "Otras causas de hombro doloroso." },
    ],
    reasoning: [
      "Causa: movimientos repetidos con los brazos elevados y degeneración con la edad.",
      "Mecanismo: el tendón del supraespinoso roza bajo el acromion al elevar el brazo.",
      "Consecuencia: dolor, inflamación y, a la larga, roturas parciales o completas.",
    ],
    epidemiology:
      "El hombro doloroso es una de las consultas musculoesqueléticas más frecuentes en el primer nivel, y la patología del manguito rotador es su principal causa, sobre todo después de los 40 años y en trabajos manuales repetitivos. La diabetes aumenta el riesgo de capsulitis adhesiva.",
    management: [
      "Diagnóstico clínico con maniobras.",
      "Ejercicios y adecuación de tareas.",
      "Imágenes si no mejora o hay sospecha de rotura.",
      "Infiltración o cirugía en casos seleccionados.",
    ],
    sources: ["Asociación Argentina de Ortopedia y Traumatología — Recomendaciones sobre hombro doloroso.", "Superintendencia de Riesgos del Trabajo — Enfermedades profesionales."],
    pearls: ["Arco doloroso 60–120°.", "Movilidad pasiva conservada = manguito, no capsulitis.", "Ejercicios primero."],
    pitfalls: ["Inmovilizar.", "Resonancia de entrada."],
    tribunal: [
      qa("¿Qué músculos forman el manguito rotador?", "Supraespinoso (abducción inicial), infraespinoso y redondo menor (rotación externa) y subescapular (rotación interna)."),
      qa("¿Qué es la capsulitis adhesiva?", "La inflamación y fibrosis de la cápsula del hombro con dolor y pérdida de movilidad activa y pasiva, sobre todo de la rotación externa; más frecuente en mujeres de 40 a 60 años y en diabéticos."),
      qa("¿Qué evalúan las maniobras de Jobe, Neer y Hawkins?", "Jobe: supraespinoso (resistencia en abducción con rotación interna). Neer y Hawkins: pinzamiento subacromial (elevación o rotación interna que reproduce el dolor)."),
    ],
  },
};
