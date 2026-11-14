import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const gotaTofacea: ClinicalCase = {
  id: "gota-tofacea-cronica",
  level: 2,
  area: "Reumatología",
  setting: "Consultorio",
  patient: { age: 68, ageUnit: "años", sex: "M", context: "Gota desde hace 15 años, solo trata los ataques con diclofenac. Enfermedad renal crónica estadio 3. Toma cerveza." },
  frequency: "frecuente",
  intro: "“Tengo ataques cada mes, bultos en los dedos y los codos, y uno largó como tiza.”",
  vitals: { TA: "148/90 mmHg", FC: "76 lpm", "T°": "36,6 °C", Peso: "92 kg" },
  anamnesis: [
    act("ataques", "¿Cada cuánto tiene ataques?", "clave", "“Todos los meses.”", "Gota no controlada."),
    act("tratamiento", "¿Tomó alopurinol alguna vez?", "clave", "“Nunca, solo diclofenac en los ataques.”", "Sin tratamiento hipouricemiante."),
    act("renal", "¿Cómo están sus riñones?", "clave", "“Me dijeron que funcionan a la mitad.”", "Ajuste de dosis."),
    act("alcohol", "¿Toma cerveza?", "util", "“Dos litros por día.”", "Factor."),
    act("diureticos", "¿Toma diuréticos?", "util", "“Hidroclorotiazida.”", "Aumenta el ácido úrico."),
    act("nietos", "¿Qué hace?", "neutro", "“Juego a las bochas.”", "No orienta."),
  ],
  exam: [
    act("tofos", "Manos, codos y orejas", "clave", "Tofos en dedos, olécranon y pabellón auricular; uno ulcerado con material blanco.", "Gota tofácea."),
    act("articulaciones", "Articulaciones", "clave", "Deformidad en interfalángicas.", "Artropatía crónica."),
    act("ta-ex", "Presión", "util", "Elevada.", "Comorbilidad."),
  ],
  studies: [
    study("Laboratorio", "uricemia", "Ácido úrico, creatinina y filtrado", "clave", "Úrico 10,8; filtrado 45 ml/min.", "Hiperuricemia y ERC."),
    study("Laboratorio", "cristales", "Material del tofo al microscopio de luz polarizada", "clave", "Cristales de urato con birrefringencia negativa.", "Confirma."),
    study("Imágenes", "rx", "Radiografía de manos", "util", "Erosiones en sacabocado con bordes colgantes.", "Daño crónico."),
    study("Otros", "aines-cronicos", "Seguir con diclofenac", "riesgoso", "No se indicó.", "Daño renal."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("gota-tofacea", "Gota tofácea crónica con enfermedad renal crónica", true, "Ataques recurrentes, tofos con cristales de urato, erosiones en sacabocado y ERC."),
      dx("ar", "Artritis reumatoidea con nódulos", false, "Cristales de urato en los tofos."),
      dx("pseudogota", "Pseudogota", false, "Cristales de birrefringencia negativa."),
      dx("artrosis", "Artrosis nodal", false, "Tofos con urato."),
      dx("xantomas", "Xantomas", false, "Cristales de urato."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("alopurinol", "Alopurinol en dosis baja ajustada al filtrado y aumento gradual hasta úrico menor de 5", "clave", "Disolver los tofos."),
      mg("profilaxis", "Colchicina en dosis baja los primeros meses", "clave", "Previene ataques al iniciar."),
      mg("diuretico", "Cambiar la hidroclorotiazida por losartán", "clave", "Losartán es uricosúrico."),
      mg("habitos", "Reducir cerveza y fructosa", "util", "Factores."),
      mg("alopurinol-alto", "Alopurinol 300 mg de entrada sin ajustar", "riesgoso", "Riesgo de reacción cutánea grave con ERC."),
      mg("diclofenac", "Seguir con diclofenac diario", "riesgoso", "Daño renal."),
    ],
  },
  debrief: {
    diagnosis: "Gota tofácea crónica sin tratamiento hipouricemiante, con enfermedad renal crónica, en varón de 68 años.",
    pathologies: [
      { name: "Gota tofácea", role: "principal", why: "Depósitos crónicos de urato." },
      { name: "ERC, diurético, alcohol", role: "asociada", why: "Factores y limitaciones." },
      { name: "AR, pseudogota", role: "diferencial", why: "Otras artropatías." },
    ],
    reasoning: [
      "Causa: hiperuricemia no tratada por años.",
      "Mecanismo: cristales que se depositan en articulaciones y tejidos.",
      "Consecuencia: ataques, tofos, erosiones y daño renal.",
    ],
    epidemiology:
      "La gota es la artritis inflamatoria más frecuente en varones. Muchos pacientes solo tratan los ataques y llegan a la forma tofácea. La estrategia 'tratar hasta el objetivo' de úrico disuelve los tofos.",
    management: [
      "Cristales.",
      "Alopurinol ajustado y titulado.",
      "Profilaxis.",
      "Revisar fármacos.",
    ],
    sources: ["Sociedad Argentina de Reumatología — Guías de gota.", "ACR — Guideline for the Management of Gout."],
    pearls: ["Tratar hasta úrico menor de 5 en tofácea.", "Empezar bajo.", "Losartán ayuda."],
    pitfalls: ["Solo tratar ataques.", "Alopurinol alto con ERC."],
    tribunal: [
      qa("¿Cuándo se indica tratamiento hipouricemiante?", "Con tofos, erosiones, dos o más ataques por año o ERC."),
      qa("¿Qué alternativa al alopurinol hay?", "Febuxostat o uricosúricos como benzbromarona."),
      qa("¿Por qué no se suspende el alopurinol en un ataque?", "Porque los cambios de uricemia empeoran los ataques; se mantiene y se trata el brote."),
    ],
  },
};
