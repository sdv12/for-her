import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const htaAdultoMayor: ClinicalCase = {
  id: "hta-sistolica-adulta-mayor",
  level: 1,
  area: "Cardiovascular",
  setting: "CAPS",
  patient: { age: 79, ageUnit: "años", sex: "F", context: "Vive sola, camina con bastón. Se cayó dos veces este año." },
  frequency: "muy-frecuente",
  intro: "“Vengo a renovar las recetas. En la farmacia me tomaron la presión y me dijeron que la tengo alta, 170. Yo me siento bien.”",
  vitals: { TA: "168/74 mmHg", FC: "70 lpm", "T°": "36,3 °C", Peso: "62 kg" },
  anamnesis: [
    act("registros", "¿Te tomaste la presión otras veces? ¿Tenés registros en tu casa?", "clave", "“Mi hija me la toma: siempre entre 160 y 170 de máxima, 70 de mínima.”", "Registros domiciliarios elevados confirman la hipertensión y descartan el efecto de guardapolvo blanco."),
    act("caidas", "¿Te mareás al pararte? ¿Cómo fueron las caídas?", "clave", "“Las dos al levantarme rápido de la cama a la noche.”", "Caídas por hipotensión ortostática: condicionan la elección y dosis del tratamiento."),
    act("farmacos", "¿Qué remedios tomás, incluidos los de venta libre?", "clave", "“Ibuprofeno para la rodilla casi todos los días y clonazepam para dormir.”", "Los AINE suben la presión; las benzodiacepinas aumentan el riesgo de caídas."),
    act("organo", "¿Tuviste dolor de pecho, falta de aire, ACV o problemas de riñón?", "util", "“No.”", "Busca daño de órgano blanco."),
    act("sal", "¿Cómo cocinás? ¿Usás mucha sal o caldos?", "util", "“Uso caldo en cubitos en todo.”", "Los caldos aportan mucho sodio."),
    act("telenovela", "¿Qué mirás en la tele?", "neutro", "“Las noticias.”", "No orienta."),
  ],
  exam: [
    act("ortostatismo", "Presión acostada y de pie", "clave", "Acostada 168/74; de pie a los 3 minutos 142/70.", "Caída de 26 mmHg: hipotensión ortostática."),
    act("ambos-brazos", "Presión en ambos brazos y pulsos", "util", "Similar en ambos brazos; pulsos presentes.", "Diferencias mayores de 10–15 mmHg sugieren enfermedad arterial."),
    act("fondo", "Fondo de ojo y auscultación cardíaca", "util", "Cruces arteriovenosos; sin soplos.", "Retinopatía hipertensiva leve."),
  ],
  studies: [
    study("Laboratorio", "lab", "Creatinina, ionograma, glucemia, lípidos y orina con índice albúmina/creatinina", "clave", "Creatinina 1,0 (filtrado 55), potasio 4,2, albuminuria normal.", "Daño renal leve; línea de base antes de fármacos."),
    study("Electrofisiología", "ecg", "Electrocardiograma", "clave", "Ritmo sinusal, sin hipertrofia.", "Busca hipertrofia o arritmias."),
    study("Otros", "mapa", "MAPA o monitoreo domiciliario", "util", "Promedio 162/72.", "Confirma la hipertensión."),
    study("Imágenes", "doppler-renal", "Doppler de arterias renales", "innecesario", "No se realizó.", "Sin datos de hipertensión secundaria."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hsa", "Hipertensión sistólica aislada con hipotensión ortostática, agravada por AINE, en adulta mayor frágil", true, "Sistólica persistente mayor de 140 con diastólica normal, confirmada en domicilio, con caídas por ortostatismo y uso diario de ibuprofeno."),
      dx("guardapolvo", "Hipertensión de guardapolvo blanco", false, "Los registros domiciliarios también están altos."),
      dx("secundaria", "Hipertensión renovascular", false, "No hay elementos que la sugieran."),
      dx("normal", "Presión normal para la edad", false, "La meta también se aplica a adultos mayores; 160–170 es hipertensión."),
      dx("crisis", "Emergencia hipertensiva", false, "Sin daño agudo de órgano."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("farmaco", "Un antihipertensivo en dosis baja (amlodipina o un IECA) con aumento lento y control del ortostatismo", "clave", "En adultos mayores: empezar bajo e ir despacio."),
      mg("aine", "Suspender el ibuprofeno; paracetamol para la rodilla", "clave", "Los AINE suben la presión y dañan el riñón."),
      mg("caidas", "Prevención de caídas: levantarse en dos tiempos, revisar el clonazepam", "clave", "Las caídas tienen alta morbilidad."),
      mg("sal", "Reducir la sal y los caldos", "util", "Baja la presión sistólica."),
      mg("triple", "Tres fármacos juntos para llegar ya a 120", "riesgoso", "Bajar rápido y mucho en una persona frágil con ortostatismo aumenta las caídas."),
      mg("nada", "No tratar por la edad", "riesgoso", "Tratar la hipertensión en mayores de 80 reduce ACV y mortalidad."),
    ],
  },
  debrief: {
    diagnosis: "Hipertensión sistólica aislada confirmada, con hipotensión ortostática y caídas, agravada por AINE, en mujer de 79 años frágil.",
    pathologies: [
      { name: "Hipertensión sistólica aislada", role: "principal", why: "Rigidez arterial de la edad." },
      { name: "Hipotensión ortostática y caídas", role: "asociada", why: "Condicionan el tratamiento." },
      { name: "Guardapolvo blanco, hipertensión secundaria", role: "diferencial", why: "Se descartan." },
    ],
    reasoning: [
      "Causa: rigidez de las grandes arterias con la edad.",
      "Mecanismo: la aorta rígida no amortigua la eyección: sube la sistólica y baja la diastólica (presión de pulso amplia); además los barorreflejos son lentos.",
      "Consecuencia: más riesgo de ACV, insuficiencia cardíaca y renal; y ortostatismo con caídas.",
    ],
    epidemiology:
      "Más de dos tercios de los mayores de 65 años son hipertensos y la forma sistólica aislada es la más frecuente. En Argentina, una gran parte de los hipertensos no está controlada. Las caídas y la polifarmacia son problemas centrales en el adulto mayor.",
    management: [
      "Confirmar con registros fuera del consultorio.",
      "Medir siempre la presión de pie en adultos mayores.",
      "Empezar con un fármaco en dosis baja y titular lentamente; metas individualizadas.",
      "Revisar fármacos que suben la presión o causan caídas.",
    ],
    sources: ["Sociedad Argentina de Hipertensión Arterial — Consenso de hipertensión arterial.", "Ministerio de Salud de la Nación — Guía de práctica clínica de hipertensión arterial."],
    pearls: ["En mayores: presión acostada y de pie.", "Empezar bajo, ir despacio.", "AINE suben la presión."],
    pitfalls: ["No tratar por la edad.", "Bajar bruscamente con varios fármacos."],
    tribunal: [
      qa("¿Qué es la hipotensión ortostática?", "Una caída de la presión sistólica de 20 mmHg o más, o de la diastólica de 10 o más, dentro de los 3 minutos de pararse; se asocia a caídas, síncope y fármacos (diuréticos, alfa bloqueantes, nitratos, antidepresivos)."),
      qa("¿Qué es la hipertensión de guardapolvo blanco y la enmascarada?", "Guardapolvo blanco: alta en el consultorio y normal fuera. Enmascarada: normal en el consultorio y alta fuera. Ambas se detectan con MAPA o monitoreo domiciliario."),
      qa("¿Qué dice la evidencia sobre tratar la hipertensión en mayores de 80?", "El estudio HYVET mostró que tratar a mayores de 80 con sistólica de 160 o más reduce ACV, insuficiencia cardíaca y mortalidad; las metas se ajustan a la fragilidad."),
    ],
  },
};
