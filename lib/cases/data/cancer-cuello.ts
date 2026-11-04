import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const cancerCuello: ClinicalCase = {
  id: "cancer-cuello-uterino",
  level: 3,
  area: "Oncología",
  setting: "Consultorio",
  patient: { age: 44, ageUnit: "años", sex: "F", context: "Vive en Jujuy. Cinco hijos. Nunca se hizo un Papanicolaou." },
  frequency: "frecuente",
  intro: "“Hace unos meses sangro después de tener relaciones y entre las menstruaciones, y tengo un flujo con mal olor.”",
  vitals: { TA: "118/74 mmHg", FC: "84 lpm", "T°": "36,5 °C", Peso: "56 kg" },
  anamnesis: [
    act("sangrado", "¿Cuándo sangrás?", "clave", "“Después de las relaciones y a veces entre menstruaciones.”", "Sangrado poscoital: síntoma de alarma de cáncer de cuello."),
    act("rastreo", "¿Te hiciste alguna vez el Papanicolaou o el test de VPH?", "clave", "“Nunca.”", "Sin rastreo: principal factor de riesgo de cáncer avanzado."),
    act("dolor", "¿Dolor pelviano, en la cintura, en las piernas, dificultad para orinar?", "clave", "“Dolor en la cintura a veces.”", "Puede indicar invasión parametrial u obstrucción ureteral."),
    act("factores", "¿Fumás? ¿Edad de inicio de relaciones?", "util", "“Fumo; empecé a los 15.”", "Factores asociados al VPH persistente."),
    act("vih", "¿Te testeaste para VIH?", "util", "“No.”", "La inmunosupresión acelera la progresión."),
    act("hijos", "¿Cuántos años tiene el más chico?", "neutro", "“Seis.”", "No orienta."),
  ],
  exam: [
    act("especulo", "Especuloscopía", "clave", "Lesión exofítica, friable y sangrante en el cuello uterino de 3 cm.", "Muy sugestiva de carcinoma."),
    act("tacto", "Tacto vaginal y rectal", "clave", "Cuello duro, parametrio derecho indurado sin llegar a la pared pelviana.", "Compromiso parametrial (estadio IIB)."),
    act("ganglios", "Ganglios inguinales y supraclaviculares", "util", "No palpables.", "Sin diseminación ganglionar distante evidente."),
  ],
  studies: [
    study("Otros", "biopsia", "Biopsia de la lesión", "clave", "Carcinoma escamoso invasor moderadamente diferenciado.", "Confirma el diagnóstico."),
    study("Imágenes", "estadificacion", "Resonancia de pelvis y tomografía de tórax y abdomen", "clave", "Invasión parametrial derecha, sin hidronefrosis ni metástasis.", "Estadificación FIGO."),
    study("Laboratorio", "lab", "Hemograma, función renal, VIH", "util", "Hb 10,4, función renal normal, VIH negativo.", "Anemia por sangrado."),
    study("Otros", "pap", "Hacer solo un Papanicolaou y esperar el resultado", "innecesario", "No se realizó.", "Ante una lesión visible se biopsia directamente."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("ccu", "Carcinoma escamoso de cuello uterino localmente avanzado (FIGO IIB)", true, "Sangrado poscoital en una mujer sin rastreo, lesión exofítica friable, parametrio indurado y biopsia de carcinoma escamoso."),
      dx("cervicitis", "Cervicitis", false, "La biopsia muestra carcinoma."),
      dx("polipo", "Pólipo endocervical", false, "La lesión es friable, extensa y la biopsia es maligna."),
      dx("endometrio", "Cáncer de endometrio", false, "El origen es cervical."),
      dx("hsil", "Lesión de alto grado (HSIL) sin invasión", false, "Hay invasión."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("quimiorradio", "Derivar a oncología para quimiorradioterapia concurrente con braquiterapia", "clave", "Tratamiento estándar del estadio IIB."),
      mg("anemia", "Corregir la anemia y acompañar", "util", "Mejora la respuesta a la radioterapia."),
      mg("familia", "Ofrecer rastreo a familiares y vacunación de hijas e hijos según el Calendario", "util", "Prevención."),
      mg("paliativos", "Cuidados de soporte y acompañamiento psicosocial", "util", "Calidad de vida."),
      mg("histerectomia", "Histerectomía como única opción", "riesgoso", "En estadio IIB la cirugía no es el tratamiento estándar."),
      mg("esperar", "Repetir los estudios en 6 meses", "riesgoso", "Retrasa el tratamiento."),
    ],
  },
  debrief: {
    diagnosis: "Carcinoma escamoso de cuello uterino localmente avanzado (FIGO IIB) en mujer de 44 años sin rastreo previo, con anemia por sangrado.",
    pathologies: [
      { name: "Cáncer de cuello uterino", role: "principal", why: "Carcinoma escamoso invasor." },
      { name: "Falta de rastreo", role: "asociada", why: "Causa de diagnóstico tardío." },
      { name: "Cervicitis, pólipo, cáncer de endometrio", role: "diferencial", why: "Otras causas de sangrado." },
    ],
    reasoning: [
      "Causa: infección persistente por VPH de alto riesgo (16, 18).",
      "Mecanismo: las oncoproteínas virales E6 y E7 inactivan p53 y Rb; lesiones precursoras progresan durante años a cáncer invasor.",
      "Consecuencia: sangrado, flujo, dolor; invasión de parametrios, vejiga, recto y uréteres.",
    ],
    epidemiology:
      "El cáncer de cuello uterino es uno de los cánceres más frecuentes y una de las principales causas de muerte por cáncer en mujeres en Argentina; las tasas más altas están en el norte (NOA y NEA) y en mujeres sin acceso al rastreo. Se previene con la vacuna contra el VPH y el rastreo.",
    management: [
      "Rastreo: test de VPH desde los 30 años (o Papanicolaou desde los 25 según la jurisdicción).",
      "Ante lesión visible o sangrado poscoital: biopsia.",
      "Estadificación y tratamiento según FIGO.",
      "Vacunación contra el VPH a los 11 años.",
    ],
    sources: ["Instituto Nacional del Cáncer — Programa Nacional de Prevención de Cáncer Cervicouterino.", "Calendario Nacional de Vacunación (VPH)."],
    pearls: ["Sangrado poscoital = examinar el cuello.", "Lesión visible = biopsia.", "Se previene con vacuna y rastreo."],
    pitfalls: ["Hacer solo un Papanicolaou ante una lesión visible.", "Demorar."],
    tribunal: [
      qa("¿Cómo es el rastreo de cáncer de cuello en Argentina?", "Con test de VPH desde los 30 años cada 5 años si es negativo (con triaje citológico si es positivo), o Papanicolaou desde los 25 años según la disponibilidad de cada jurisdicción; la autotoma de VPH amplía el acceso."),
      qa("¿Cómo se estadifica el cáncer de cuello (FIGO)?", "I: limitado al cuello. II: más allá del útero sin llegar a la pared pelviana ni al tercio inferior de la vagina (IIB con parametrio). III: pared pelviana, tercio inferior de vagina, hidronefrosis o ganglios. IV: vejiga, recto o metástasis a distancia."),
      qa("¿Qué es el VPH de alto riesgo?", "Los tipos con potencial oncogénico, sobre todo 16 y 18 (alrededor del 70 % de los cánceres de cuello), además de 31, 33, 45, 52 y 58."),
    ],
  },
};
