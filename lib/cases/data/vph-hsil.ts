import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const vphHsil: ClinicalCase = {
  id: "vph-lesion-alto-grado",
  level: 2,
  area: "Ginecología y obstetricia",
  setting: "CAPS",
  patient: { age: 35, ageUnit: "años", sex: "F", context: "Viene a buscar el resultado del tamizaje. Fumadora." },
  frequency: "frecuente",
  intro: "“Me llamaron porque el test de VPH salió positivo. ¿Tengo cáncer? Estoy muy asustada.”",
  vitals: { TA: "118/74 mmHg" },
  anamnesis: [
    act("sintomas", "¿Tiene sangrado después de las relaciones o entre menstruaciones?", "clave", "“No, nada.”", "El sangrado poscoital puede indicar una lesión cervical avanzada; las lesiones precancerosas suelen ser asintomáticas."),
    act("previos", "¿Cuándo fue su último control? ¿Alguna vez tuvo un resultado alterado?", "clave", "“Hace seis años un Papanicolaou normal.”", "Contextualiza el riesgo y el seguimiento."),
    act("tabaco", "¿Fuma?", "util", "“Diez cigarrillos por día.”", "El tabaco aumenta la persistencia del VPH y la progresión a cáncer."),
    act("vih", "¿Se hizo el test de VIH?", "util", "“Hace años.”", "La inmunosupresión aumenta la persistencia y progresión."),
    act("miedo", "¿Qué sabe del VPH?", "clave", "“Que da cáncer.”", "La mayoría de las infecciones se eliminan solas; una lesión de alto grado detectada a tiempo se cura. Explicarlo reduce la angustia y mejora la adherencia."),
    act("hijos", "¿Tiene hijos?", "neutro", "“Dos.”", "No orienta."),
  ],
  exam: [
    act("especulo", "Especuloscopía", "clave", "Cuello de aspecto macroscópico normal, sin lesiones visibles.", "Una lesión visible o friable requiere biopsia directa."),
    act("bimanual", "Tacto bimanual", "util", "Normal.", "Descarta compromiso parametrial."),
    act("ganglios", "Ganglios inguinales", "neutro", "No palpables.", "No aporta."),
  ],
  studies: [
    study("Laboratorio", "triage", "Citología de triage (de la misma muestra)", "clave", "Lesión escamosa intraepitelial de alto grado (H-SIL).", "En el algoritmo argentino, a un test de VPH positivo le sigue la citología de triage: si es anormal, va a colposcopia."),
    study("Otros", "colpo", "Colposcopia con biopsia dirigida", "clave", "Epitelio acetoblanco denso en la zona de transformación. Biopsia: CIN 3.", "Confirma la lesión precursora y orienta el tratamiento."),
    study("Imágenes", "tc", "Tomografía de abdomen y pelvis", "innecesario", "No se realizó.", "No se estadifica una lesión preinvasora."),
    study("Laboratorio", "marcadores", "Marcadores tumorales (CA-125, SCC)", "innecesario", "No se realizaron.", "No tienen papel en el tamizaje ni en las lesiones precursoras."),
    study("Laboratorio", "vih", "Test de VIH", "util", "No reactivo.", "Se ofrece en toda ITS."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("cin3", "Lesión intraepitelial de alto grado (CIN 3) asociada a VPH de alto riesgo", true, "Test de VPH positivo, citología H-SIL y biopsia CIN 3: lesión precursora, no cáncer."),
      dx("cancer", "Cáncer de cuello uterino invasor", false, "La biopsia no muestra invasión del estroma y no hay lesión visible."),
      dx("lsil", "Lesión de bajo grado (CIN 1)", false, "Suele regresar sola; la biopsia muestra CIN 3."),
      dx("transitoria", "Infección transitoria por VPH sin lesión", false, "La citología y la biopsia muestran una lesión."),
      dx("cervicitis", "Cervicitis", false, "Es una inflamación, no una lesión intraepitelial."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("leep", "Tratamiento escisional: escisión con asa (LEEP o LLETZ)", "clave", "Trata la lesión y da una pieza para el estudio histológico completo."),
      mg("seguimiento", "Seguimiento posterior con test de VPH (y citología) según el programa", "clave", "Detecta persistencia o recurrencia."),
      mg("explicar", "Explicar que es una lesión precursora curable y no un cáncer", "clave", "Reduce la angustia y mejora la adherencia al tratamiento."),
      mg("tabaco", "Consejería para dejar de fumar", "util", "Disminuye la persistencia del VPH."),
      mg("histerectomia", "Histerectomía", "innecesario", "Es un tratamiento excesivo para una lesión preinvasora."),
      mg("repetir", "Repetir el Papanicolaou en 3 años", "riesgoso", "Una CIN 3 sin tratar puede progresar a cáncer invasor."),
    ],
  },
  debrief: {
    diagnosis: "Lesión intraepitelial escamosa de alto grado (CIN 3) por VPH de alto riesgo, detectada por tamizaje.",
    pathologies: [
      { name: "CIN 3 (lesión de alto grado)", role: "principal", why: "Precursora del cáncer escamoso de cuello." },
      { name: "Infección persistente por VPH de alto riesgo", role: "asociada", why: "Causa necesaria." },
      { name: "Cáncer de cuello invasor", role: "diferencial", why: "Lo que se quiere prevenir." },
      { name: "Lesión de bajo grado", role: "diferencial", why: "Habitualmente regresa." },
    ],
    reasoning: [
      "Causa: infección persistente por tipos de VPH de alto riesgo (sobre todo 16 y 18), de transmisión sexual.",
      "Mecanismo: las oncoproteínas virales E6 y E7 inactivan p53 y Rb, que frenan el ciclo celular y reparan el ADN. Las células de la zona de transformación proliferan con atipías.",
      "Consecuencia: lesiones intraepiteliales que, si persisten, progresan en años (en general más de 10) a cáncer invasor.",
      "Ese tiempo largo es lo que permite prevenir con tamizaje y tratamiento de las lesiones de alto grado.",
    ],
    epidemiology:
      "El cáncer de cuello es el tercer cáncer más frecuente en mujeres en la Argentina y una de las principales causas de muerte por cáncer en mujeres jóvenes, con más carga en el NOA y el NEA. Casi todos los casos se deben al VPH. El Programa Nacional usa el test de VPH como tamizaje primario entre los 30 y 64 años, y la vacuna está en el Calendario Nacional a los 11 años para niñas y niños.",
    management: [
      "Tamizaje: test de VPH entre los 30 y 64 años (cada 5 años si es negativo).",
      "VPH positivo → citología de triage: anormal → colposcopia; normal → repetir VPH en 18 meses.",
      "Lesión de alto grado confirmada → tratamiento escisional (LEEP).",
      "Seguimiento con test de VPH tras el tratamiento.",
      "Prevención primaria: vacuna contra el VPH; preservativo; cesación tabáquica.",
    ],
    sources: [
      "Ministerio de Salud de la Nación — Programa Nacional de Prevención de Cáncer Cervicouterino: guía de tamizaje con test de VPH.",
      "Instituto Nacional del Cáncer — Estadísticas de cáncer en Argentina.",
    ],
    pearls: ["VPH positivo no es cáncer.", "Alto grado se trata; bajo grado suele regresar.", "Vacuna contra el VPH a los 11 años, niñas y niños."],
    pitfalls: ["Indicar histerectomía.", "No tratar una lesión de alto grado.", "Asustar a la paciente."],
  },
};
