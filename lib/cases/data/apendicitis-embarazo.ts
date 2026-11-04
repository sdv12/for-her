import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const apendicitisEmbarazo: ClinicalCase = {
  id: "apendicitis-embarazada",
  level: 3,
  area: "Cirugía",
  setting: "Guardia",
  patient: { age: 27, ageUnit: "años", sex: "F", context: "Embarazo de 24 semanas, controlado." },
  frequency: "poco-frecuente",
  intro: "“Desde anoche me duele la panza del lado derecho, más arriba de lo que esperaba, con náuseas y fiebre baja. Me dijeron que podía ser del embarazo.”",
  vitals: { TA: "112/68 mmHg", FC: "108 lpm", FR: "20 rpm", "T°": "38,0 °C" },
  anamnesis: [
    act("dolor", "¿Dónde empezó y dónde está ahora?", "clave", "“Empezó alrededor del ombligo y ahora está a la derecha, bastante arriba.”", "En el embarazo el apéndice se desplaza hacia arriba: el dolor puede estar en el flanco o hipocondrio derecho."),
    act("obstetrico", "¿Tenés contracciones, sangrado o pérdida de líquido? ¿Se mueve el bebé?", "clave", "“No, se mueve bien.”", "Descarta causas obstétricas."),
    act("urinario", "¿Ardor al orinar?", "util", "“No.”", "La pielonefritis es un diferencial frecuente."),
    act("vomitos", "¿Vómitos? ¿Hambre?", "util", "“Náuseas, sin hambre.”", "Anorexia."),
    act("deposiciones", "¿Diarrea?", "util", "“No.”", "Gastroenteritis menos probable."),
    act("nombre", "¿Ya eligieron el nombre?", "neutro", "“Bruno.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Palpación abdominal (en decúbito lateral izquierdo)", "clave", "Dolor y defensa en flanco derecho, más alto que McBurney; el dolor persiste al desplazar el útero.", "Dolor de origen extrauterino."),
    act("obstetrico-ex", "Útero, latidos fetales y tono", "clave", "Útero relajado, latidos 150 lpm.", "Sin trabajo de parto ni desprendimiento."),
    act("punio", "Puño percusión lumbar", "util", "Negativa.", "Descarta pielonefritis."),
  ],
  studies: [
    study("Imágenes", "eco", "Ecografía abdominal", "clave", "Apéndice no visualizado.", "Primera imagen, pero con frecuencia no visualiza el apéndice en el embarazo."),
    study("Imágenes", "rmn", "Resonancia magnética sin gadolinio", "clave", "Apéndice engrosado de 10 mm con inflamación periapendicular, sin perforación.", "Estudio de elección si la ecografía no es concluyente: sin radiación."),
    study("Laboratorio", "lab", "Hemograma, PCR, orina", "util", "Leucocitos 16.500 (algo elevados en el embarazo), orina normal.", "Apoya; la leucocitosis es menos específica en el embarazo."),
    study("Otros", "esperar", "Observar 48 h para ver si mejora", "riesgoso", "No se realizó.", "La perforación aumenta mucho la pérdida fetal."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("apendicitis", "Apendicitis aguda no perforada en embarazo de 24 semanas", true, "Dolor migratorio periumbilical hacia el flanco derecho alto, fiebre, anorexia, defensa y resonancia con apéndice inflamado."),
      dx("pielonefritis", "Pielonefritis", false, "Orina normal y puño percusión negativa."),
      dx("desprendimiento", "Desprendimiento de placenta", false, "Útero relajado, sin sangrado, feto bien."),
      dx("colecistitis", "Colecistitis", false, "La resonancia muestra el apéndice inflamado."),
      dx("ligamento", "Dolor del ligamento redondo", false, "No da fiebre ni defensa."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cirugia", "Apendicectomía (laparoscópica o abierta) sin demora", "clave", "La cirugía temprana reduce la perforación y la pérdida fetal."),
      mg("obstetricia", "Trabajo conjunto con obstetricia y monitoreo fetal", "clave", "Vigilar contracciones y bienestar fetal."),
      mg("atb", "Antibiótico profiláctico seguro en el embarazo", "clave", "Cefalosporinas con metronidazol."),
      mg("decubito", "Posición en decúbito lateral izquierdo", "util", "Evita la compresión de la cava."),
      mg("tc", "Tomografía con contraste en lugar de resonancia", "innecesario", "Se prefiere la resonancia; la tomografía es aceptable solo si no hay resonancia disponible."),
      mg("conservador", "Tratamiento solo con antibióticos", "riesgoso", "En el embarazo se prefiere la cirugía."),
    ],
  },
  debrief: {
    diagnosis: "Apendicitis aguda no perforada en embarazo de 24 semanas, con dolor en flanco derecho alto por desplazamiento del apéndice.",
    pathologies: [
      { name: "Apendicitis aguda", role: "principal", why: "Inflamación del apéndice." },
      { name: "Embarazo de segundo trimestre", role: "asociada", why: "Modifica la presentación y el manejo." },
      { name: "Pielonefritis, desprendimiento, colecistitis", role: "diferencial", why: "Otras causas de dolor abdominal en el embarazo." },
    ],
    reasoning: [
      "Causa: obstrucción de la luz del apéndice.",
      "Mecanismo: el útero desplaza el apéndice hacia arriba y afuera; la pared abdominal distendida atenúa los signos peritoneales.",
      "Consecuencia: diagnóstico tardío, más perforación y riesgo de parto prematuro y muerte fetal.",
    ],
    epidemiology:
      "La apendicitis es la urgencia quirúrgica no obstétrica más frecuente en el embarazo (1 de cada 1.500 embarazos), más en el segundo trimestre. La perforación aumenta mucho la pérdida fetal.",
    management: [
      "Sospechar en todo dolor abdominal con fiebre en el embarazo.",
      "Ecografía y, si no es concluyente, resonancia.",
      "Cirugía temprana con antibióticos.",
      "Monitoreo obstétrico.",
    ],
    sources: ["FASGO — Recomendaciones sobre cirugía no obstétrica en el embarazo.", "Sociedad Argentina de Cirugía — Consenso de apendicitis."],
    pearls: ["En el embarazo el apéndice sube.", "Resonancia sin gadolinio.", "Operar sin demora."],
    pitfalls: ["Atribuir el dolor al embarazo.", "Observar 48 h."],
    tribunal: [
      qa("¿Qué estudios por imágenes son seguros en el embarazo?", "Ecografía y resonancia sin gadolinio son seguras; la radiografía y la tomografía se usan si son necesarias, con dosis bajas y protección; un estudio indicado no se niega por el embarazo."),
      qa("¿Qué causas de dolor abdominal agudo hay en el embarazo?", "Obstétricas (ectópico, aborto, desprendimiento, rotura uterina, trabajo de parto, preeclampsia o HELLP) y no obstétricas (apendicitis, colecistitis, pancreatitis, pielonefritis, torsión anexial, obstrucción intestinal)."),
      qa("¿Qué es el síndrome de compresión de la vena cava?", "La compresión de la cava inferior por el útero grávido en decúbito dorsal desde la segunda mitad del embarazo, con hipotensión, mareo y menor flujo placentario; se evita con decúbito lateral izquierdo."),
    ],
  },
};
