import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const gammapatiaMonoclonal: ClinicalCase = {
  id: "gammapatia-monoclonal",
  level: 3,
  area: "Hematología",
  setting: "Consultorio",
  patient: { age: 68, ageUnit: "años", sex: "M", context: "Jubilado bancario. Le pidieron un proteinograma por una ERS alta en un chequeo." },
  frequency: "frecuente",
  intro: "“En el análisis apareció un pico. Busqué en internet y dice mieloma.”",
  vitals: { TA: "132/80 mmHg", FC: "70 lpm", Peso: "78 kg (estable)" },
  anamnesis: [
    act("huesos", "¿Dolores de huesos o fracturas?", "clave", "“No.”", "Lesión ósea: criterio CRAB."),
    act("sintomas", "¿Cansancio, infecciones repetidas, pérdida de peso?", "clave", "“Nada.”", "Asintomático."),
    act("orina", "¿Orina espumosa o problemas de riñón?", "clave", "“No que sepa.”", "Daño renal: criterio CRAB."),
    act("neuropatia", "¿Hormigueos en pies?", "util", "“No.”", "Neuropatía asociada a gammapatías IgM."),
    act("familia", "¿Familiares con mieloma?", "util", "“No.”", "Riesgo."),
    act("hobby", "¿Qué hace con su tiempo libre?", "neutro", "“Ajedrez.”", "No orienta."),
  ],
  exam: [
    act("general", "Examen general", "clave", "Normal, sin palidez, sin adenopatías ni visceromegalias.", "Sin signos de enfermedad."),
    act("oseo", "Dolor a la percusión ósea", "util", "No.", "Sin lesiones evidentes."),
    act("lengua", "Lengua y piel", "util", "Normales.", "Sin amiloidosis aparente."),
  ],
  studies: [
    study("Laboratorio", "inmunofijacion", "Inmunofijación y cuantificación del componente monoclonal", "clave", "IgG kappa, 1,1 g/dl.", "Menor de 3 g/dl."),
    study("Laboratorio", "cadenas-libres", "Cadenas livianas libres en suero", "clave", "Relación kappa/lambda 1,4 (normal).", "Riesgo bajo de progresión."),
    study("Laboratorio", "crab", "Hemograma, calcio, creatinina", "clave", "Hb 14,2, calcio 9,3, creatinina 0,9.", "Sin CRAB."),
    study("Imágenes", "tac-baja-dosis", "TC de cuerpo entero de baja dosis", "util", "Sin lesiones líticas.", "Recomendado si hay factores de riesgo o dudas."),
    study("Otros", "medula", "Punción de médula ósea", "innecesario", "No se hizo.", "En gammapatía IgG de bajo riesgo menor de 1,5 g/dl no es necesaria."),
    study("Otros", "quimio", "Iniciar quimioterapia preventiva", "riesgoso", "No se indicó.", "No hay beneficio y sí toxicidad."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("mgus", "Gammapatía monoclonal de significado incierto (MGUS) IgG kappa de bajo riesgo", true, "Componente IgG menor de 1,5 g/dl, relación de cadenas libres normal, sin CRAB y asintomático."),
      dx("mieloma", "Mieloma múltiple", false, "No hay CRAB ni plasmocitosis conocida."),
      dx("mieloma-indolente", "Mieloma quiescente", false, "El componente es menor de 3 g/dl."),
      dx("waldenstrom", "Macroglobulinemia de Waldenström", false, "Es IgG, no IgM."),
      dx("amiloidosis", "Amiloidosis AL", false, "Sin compromiso orgánico."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("seguimiento", "Control con proteinograma, hemograma, calcio y creatinina a los 6 meses y luego cada 1–2 años", "clave", "Riesgo de progresión del 1 % anual."),
      mg("alarma", "Explicar síntomas de alarma: dolor óseo, anemia, infecciones, orina espumosa", "clave", "Consulta anticipada."),
      mg("tranquilizar", "Explicar que no es un cáncer y que la mayoría nunca progresa", "clave", "Ansiedad."),
      mg("hueso", "Evaluar salud ósea", "util", "Más riesgo de fracturas."),
      mg("tratamiento", "Tratamiento con bortezomib", "riesgoso", "Sin indicación."),
      mg("alta", "Alta sin seguimiento", "riesgoso", "Puede progresar."),
    ],
  },
  debrief: {
    diagnosis: "Gammapatía monoclonal de significado incierto IgG kappa de bajo riesgo, en un hombre de 68 años.",
    pathologies: [
      { name: "MGUS", role: "principal", why: "Proliferación clonal de plasmocitos sin daño orgánico." },
      { name: "Mieloma múltiple", role: "diferencial", why: "Se descarta con CRAB." },
      { name: "Mieloma quiescente", role: "diferencial", why: "Componente mayor de 3 g/dl o plasmocitosis 10–60 %." },
    ],
    reasoning: [
      "Causa: clon de plasmocitos que secreta una inmunoglobulina.",
      "Mecanismo: clon pequeño sin capacidad de dañar órganos.",
      "Consecuencia: 1 % anual de progresión a mieloma u otros trastornos.",
    ],
    epidemiology:
      "Está presente en el 3 % de los mayores de 50 y en el 5 % de los mayores de 70. Es más frecuente en varones y en personas afrodescendientes. Casi siempre se encuentra por casualidad en un proteinograma.",
    management: [
      "Inmunofijación y cadenas libres.",
      "CRAB.",
      "Estratificar el riesgo.",
      "Seguimiento.",
    ],
    sources: ["Sociedad Argentina de Hematología — Gammapatías monoclonales.", "International Myeloma Working Group — Criteria for MGUS and myeloma."],
    pearls: ["Menor de 3 g/dl, menos del 10 % de plasmocitos, sin CRAB.", "1 % por año.", "No se trata, se sigue."],
    pitfalls: ["Tratar.", "No seguir."],
    tribunal: [
      qa("¿Qué significa CRAB?", "Hipercalcemia (Calcium), insuficiencia Renal, Anemia y lesiones óseas (Bone): daño orgánico que define mieloma."),
      qa("¿Qué factores aumentan el riesgo de progresión de una MGUS?", "Componente mayor de 1,5 g/dl, isotipo distinto de IgG y relación de cadenas livianas libres anormal."),
      qa("¿Qué criterios definen un mieloma sin CRAB?", "Plasmocitosis medular de 60 % o más, relación de cadenas libres de 100 o más, o más de una lesión focal en resonancia."),
    ],
  },
};
