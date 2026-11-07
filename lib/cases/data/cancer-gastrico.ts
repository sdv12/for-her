import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const cancerGastrico: ClinicalCase = {
  id: "cancer-gastrico",
  level: 3,
  area: "Oncología",
  setting: "Consultorio",
  patient: { age: 64, ageUnit: "años", sex: "M", context: "Tabaquista, consume mucha comida salada y ahumada. Su padre murió de cáncer de estómago." },
  frequency: "frecuente",
  intro: "“Hace tres meses me lleno con poca comida y me duele la boca del estómago. Bajé 9 kilos y estoy muy cansado.”",
  vitals: { TA: "116/72 mmHg", FC: "92 lpm", "T°": "36,6 °C", Peso: "62 kg" },
  anamnesis: [
    act("alarma", "¿Bajaste de peso? ¿Vomitás o tragás mal? ¿Materia fecal negra?", "clave", "“Sí, bajé mucho, a veces vomito, y tuve materia fecal oscura.”", "Síntomas de alarma: requieren endoscopía."),
    act("familia", "¿Antecedentes familiares?", "clave", "“Mi papá.”", "Factor de riesgo."),
    act("helico", "¿Te trataron por gastritis o úlcera? ¿Helicobacter?", "clave", "“Tomé omeprazol por años, sin estudiar.”", "H. pylori es el principal factor causal; los IBP pueden enmascarar."),
    act("dieta", "¿Cómo comés? ¿Fumás?", "util", "“Salado y fiambres; un atado por día.”", "Factores dietarios y tabaco."),
    act("aversion", "¿Te cambió el gusto por la carne?", "util", "“Ya no me gusta.”", "Aversión a la carne típica."),
    act("mascota", "¿Tenés mascota?", "neutro", "“Un gato.”", "No orienta."),
  ],
  exam: [
    act("general", "Estado general", "clave", "Adelgazado, palidez marcada.", "Consunción y anemia."),
    act("abdomen", "Abdomen", "clave", "Masa epigástrica palpable.", "Sugiere enfermedad avanzada."),
    act("virchow", "Ganglios supraclaviculares, tacto rectal, ombligo", "clave", "Adenopatía supraclavicular izquierda dura.", "Ganglio de Virchow: metástasis."),
  ],
  studies: [
    study("Imágenes", "vea", "Endoscopía digestiva alta con biopsias", "clave", "Úlcera irregular de bordes elevados en antro; adenocarcinoma de tipo difuso. H. pylori positivo.", "Confirma."),
    study("Imágenes", "tac", "TC de tórax, abdomen y pelvis", "clave", "Engrosamiento gástrico, ganglios regionales y lesiones hepáticas.", "Estadificación."),
    study("Laboratorio", "lab", "Hemograma, hierro, función hepática", "clave", "Hb 8,9, microcítica, ferritina baja.", "Anemia por sangrado oculto."),
    study("Laboratorio", "cea", "CEA y CA 19-9 como diagnóstico", "innecesario", "Elevados.", "No diagnostican, solo sirven para seguimiento."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("gastrico", "Adenocarcinoma gástrico avanzado con metástasis (ganglio de Virchow y hígado)", true, "Saciedad precoz, descenso de peso, anemia, masa y biopsia con adenocarcinoma."),
      dx("ulcera", "Úlcera péptica benigna", false, "La biopsia muestra adenocarcinoma."),
      dx("dispepsia", "Dispepsia funcional", false, "Con signos de alarma no puede diagnosticarse sin endoscopía."),
      dx("pancreas", "Cáncer de páncreas", false, "Los hallazgos están en el estómago."),
      dx("linfoma", "Linfoma MALT", false, "La histología es adenocarcinoma."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("comite", "Comité oncológico: quimioterapia sistémica según estado funcional y biomarcadores (HER2)", "clave", "En enfermedad metastásica el tratamiento es sistémico."),
      mg("paliativos", "Cuidados paliativos tempranos: dolor, nutrición, comunicación", "clave", "Mejoran calidad de vida y sobrevida."),
      mg("anemia", "Tratar la anemia y erradicar H. pylori", "clave", "Mejora síntomas y reduce riesgo."),
      mg("familia", "Asesoramiento a familiares de primer grado y evaluación de cáncer hereditario", "util", "Antecedente familiar y tipo difuso."),
      mg("cirugia-curativa", "Gastrectomía con intención curativa de entrada", "riesgoso", "Con metástasis no mejora la sobrevida; se reserva para paliación."),
      mg("ibp-solo", "Omeprazol y control en 6 meses", "riesgoso", "Demora el tratamiento."),
    ],
  },
  debrief: {
    diagnosis: "Adenocarcinoma gástrico de tipo difuso, estadio IV (ganglio de Virchow y metástasis hepáticas), con anemia ferropénica, en varón de 64 años.",
    pathologies: [
      { name: "Adenocarcinoma gástrico", role: "principal", why: "Tumor maligno epitelial." },
      { name: "Anemia ferropénica, metástasis", role: "asociada", why: "Sangrado crónico y diseminación." },
      { name: "Úlcera péptica, dispepsia funcional, linfoma", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: H. pylori, dieta salada y ahumada, tabaco, genética.",
      "Mecanismo: gastritis crónica, atrofia, metaplasia intestinal, displasia y carcinoma (cascada de Correa) en el tipo intestinal.",
      "Consecuencia: saciedad, dolor, anemia y metástasis por vía linfática, hematógena y peritoneal.",
    ],
    epidemiology:
      "Es más frecuente en varones mayores de 50 años, y en Argentina tiene mayor incidencia en algunas zonas del noroeste. El diagnóstico suele ser tardío. Erradicar H. pylori y consultar por signos de alarma son las principales medidas de prevención.",
    management: [
      "Endoscopía ante signos de alarma, mayores de 50 años o síntomas persistentes.",
      "Estadificación por TC y ecoendoscopía.",
      "Cirugía en estadios tempranos; quimioterapia perioperatoria o sistémica.",
      "Cuidados paliativos.",
    ],
    sources: ["Instituto Nacional del Cáncer — Guía de cáncer gástrico.", "Sociedad Argentina de Gastroenterología — Recomendaciones de H. pylori."],
    pearls: ["Signos de alarma: endoscopía, no omeprazol.", "Ganglio de Virchow, nódulo de la hermana María José, tumor de Krukenberg.", "Biopsiá toda úlcera gástrica."],
    pitfalls: ["Tratar con IBP sin estudiar.", "Pedir marcadores para diagnosticar."],
    tribunal: [
      qa("¿Qué es la cascada de Correa?", "La secuencia gastritis crónica, gastritis atrófica, metaplasia intestinal, displasia y carcinoma, propia del tipo intestinal."),
      qa("¿Qué diferencia los tipos de Lauren?", "El intestinal forma glándulas, se asocia a H. pylori y atrofia. El difuso tiene células en anillo de sello, se asocia a CDH1, es más agresivo y puede causar linitis plástica."),
      qa("¿Por qué se biopsian todas las úlceras gástricas?", "Porque, a diferencia de las duodenales, una proporción puede ser maligna."),
    ],
  },
};
