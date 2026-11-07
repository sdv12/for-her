import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const rpm: ClinicalCase = {
  id: "ruptura-prematura-membranas-pretermino",
  level: 3,
  area: "Ginecología y obstetricia",
  setting: "Guardia",
  patient: { age: 26, ageUnit: "años", sex: "F", context: "Segundo embarazo, 32 semanas. Infección urinaria hace un mes, tratada. Controles irregulares." },
  frequency: "frecuente",
  intro: "“Hace tres horas me mojé toda. Sigue saliendo líquido claro por abajo, no tengo contracciones.”",
  vitals: { TA: "116/72 mmHg", FC: "88 lpm", "T°": "36,7 °C" },
  anamnesis: [
    act("liquido", "¿Cómo es el líquido? ¿Color, olor, cantidad?", "clave", "“Claro, con olor a lavandina, chorrea al pararme.”", "Sugiere líquido amniótico; no es orina ni flujo."),
    act("fur", "¿Qué edad gestacional tenés? ¿Fecha cierta?", "clave", "“32 semanas por ecografía temprana.”", "Define la conducta."),
    act("infeccion", "¿Fiebre, dolor abdominal, flujo con mal olor?", "clave", "“No.”", "Busca corioamnionitis."),
    act("movimientos", "¿Movimientos fetales?", "util", "“Sí, se mueve.”", "Bienestar fetal."),
    act("vacunas", "¿Hisopado de estreptococo?", "util", "“Todavía no.”", "Debe considerarse la profilaxis."),
    act("trabajo", "¿Dónde trabajás?", "neutro", "“En un kiosco.”", "No orienta."),
  ],
  exam: [
    act("especuloscopia", "Especuloscopía estéril", "clave", "Líquido claro en fondo de saco, sale al toser (Tarnier positivo).", "Confirma la rotura."),
    act("tacto", "Evitar tactos vaginales", "clave", "No se realizan si no está en trabajo de parto.", "Aumentan el riesgo de infección y acortan la latencia."),
    act("obstetrico", "Altura uterina, tono, latidos", "clave", "Útero relajado, sin dolor, latidos 140 lpm.", "Sin signos de infección ni sufrimiento."),
  ],
  studies: [
    study("Otros", "ph", "Prueba de nitrazina o cristalización (helecho)", "util", "pH alcalino y cristalización positiva.", "Apoyan cuando hay duda."),
    study("Imágenes", "eco", "Ecografía obstétrica", "clave", "Presentación cefálica, líquido disminuido, peso 1.800 g.", "Evalúa presentación, líquido y crecimiento."),
    study("Laboratorio", "lab", "Hemograma, PCR, orina y cultivos, estreptococo grupo B", "clave", "Leucocitos 12.000, PCR normal.", "Base para vigilar infección."),
    study("Otros", "monitoreo", "Monitoreo fetal", "clave", "Reactivo.", "Bienestar fetal."),
    study("Otros", "amnio", "Amniocentesis de rutina", "innecesario", "No se realizó.", "No se indica de rutina sin sospecha de infección."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("rpm", "Rotura prematura de membranas de pretérmino a las 32 semanas, sin infección", true, "Pérdida de líquido confirmada por especuloscopía, sin contracciones ni signos de corioamnionitis."),
      dx("orina", "Incontinencia urinaria", false, "La especuloscopía confirma líquido amniótico."),
      dx("flujo", "Vaginosis", false, "No da pérdida líquida abundante."),
      dx("corio", "Corioamnionitis", false, "No hay fiebre, dolor uterino ni taquicardia."),
      dx("app", "Amenaza de parto pretérmino con membranas íntegras", false, "Las membranas están rotas y no hay contracciones."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("internar", "Internar y conducta expectante con vigilancia", "clave", "Antes de las 34 semanas, sin infección ni sufrimiento, se busca madurez."),
      mg("corticoides", "Betametasona para maduración pulmonar", "clave", "Reduce distrés, hemorragia cerebral y mortalidad neonatal."),
      mg("atb", "Antibióticos de latencia (ampicilina más macrólido)", "clave", "Prolongan la latencia y reducen la infección."),
      mg("magnesio", "Sulfato de magnesio si el parto es inminente antes de las 32 semanas", "util", "Neuroprotección fetal."),
      mg("tacto", "Tacto vaginal cada 6 horas", "riesgoso", "Aumenta la infección."),
      mg("amoxi-clav", "Amoxicilina-ácido clavulánico", "riesgoso", "Se asocia con enterocolitis necrotizante neonatal."),
    ],
  },
  debrief: {
    diagnosis: "Rotura prematura de membranas de pretérmino a las 32 semanas, sin corioamnionitis, con feto en buenas condiciones, en mujer de 26 años.",
    pathologies: [
      { name: "Rotura prematura de membranas de pretérmino", role: "principal", why: "Rotura antes de las 37 semanas y del trabajo de parto." },
      { name: "Riesgo de corioamnionitis y prematurez", role: "asociada", why: "Complicaciones principales." },
      { name: "Incontinencia, vaginosis, amenaza de parto pretérmino", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: infección urinaria o genital, antecedente de parto pretérmino, tabaco, sobredistensión.",
      "Mecanismo: la inflamación y las enzimas debilitan las membranas.",
      "Consecuencia: riesgo de infección, prolapso de cordón, desprendimiento y prematurez.",
    ],
    epidemiology:
      "La rotura prematura de pretérmino complica alrededor del 3 % de los embarazos y causa cerca de un tercio de los partos pretérmino, primera causa de mortalidad neonatal en Argentina. La infección urinaria es un factor de riesgo controlable durante el control prenatal.",
    management: [
      "Confirmar con especuloscopía, sin tactos.",
      "Antes de las 34 semanas: corticoides, antibióticos, vigilancia.",
      "Finalizar si hay infección, sufrimiento o desprendimiento, o a las 34-37 semanas según protocolo.",
      "Derivar a un centro con neonatología.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de prematurez.", "FASGO — Consenso de rotura prematura de membranas."],
    pearls: ["No hagas tactos si no está en trabajo de parto.", "Betametasona + ampicilina + macrólido.", "Fiebre + dolor uterino + taquicardia: corioamnionitis."],
    pitfalls: ["Usar amoxicilina-clavulánico.", "No derivar a un nivel adecuado."],
    tribunal: [
      qa("¿Qué criterios tiene la corioamnionitis?", "Fiebre materna con dos o más: taquicardia materna o fetal, dolor uterino, líquido purulento o fétido, leucocitosis. Se trata con antibióticos y finalización del embarazo."),
      qa("¿Qué efecto tiene la betametasona fetal?", "Aumenta el surfactante y la madurez de varios órganos; reduce el síndrome de distrés, la hemorragia intraventricular, la enterocolitis y la mortalidad."),
      qa("¿Qué diferencia hay entre rotura prematura y de pretérmino?", "Prematura: antes del inicio del trabajo de parto, a cualquier edad gestacional. De pretérmino: además, antes de las 37 semanas."),
    ],
  },
};
