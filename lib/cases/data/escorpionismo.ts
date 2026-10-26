import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const escorpionismo: ClinicalCase = {
  id: "escorpionismo-nina",
  level: 3,
  area: "Toxicología",
  setting: "Guardia",
  patient: { age: 5, ageUnit: "años", sex: "F", context: "Córdoba capital, enero, 23 h. La trae la mamá." },
  frequency: "frecuente",
  intro: "“Se puso la zapatilla y gritó: tenía un alacrán adentro, lo matamos y lo trajimos. Le duele mucho el pie. Ahora vomitó dos veces y está muy transpirada.”",
  vitals: { TA: "128/84 mmHg", FC: "148 lpm", FR: "30 rpm", "T°": "35,9 °C", "SatO₂": "96 %", Peso: "18 kg", Glucemia: "186 mg/dl" },
  anamnesis: [
    act("bicho", "¿Lo trajeron? ¿Cómo es?", "clave", "“Sí, en un frasco: amarillo con el lomo oscuro.”", "Tityus trivittatus o T. carrabelensis, los escorpiones de importancia médica en la Argentina, con veneno neurotóxico."),
    act("tiempo", "¿Hace cuánto la picó?", "clave", "“Hace 40 minutos.”", "Los síntomas sistémicos aparecen en general en las primeras horas."),
    act("vomitos", "¿Cuántas veces vomitó? ¿Babea, tiembla o le cuesta respirar?", "clave", "“Dos veces. Está babeando un poco.”", "En niños, los vómitos son el signo más frecuente y precoz de envenenamiento sistémico: indican antiveneno."),
    act("remedios", "¿Le pusieron algo en la picadura?", "util", "“Hielo y una cebolla, como dijo la vecina.”", "Remedios caseros que no ayudan; hay que desalentar el torniquete y los cortes."),
    act("enfermedades", "¿Tiene alguna enfermedad?", "util", "“No.”", "Los niños pequeños y con cardiopatías tienen más riesgo."),
    act("casa", "¿Viven en casa o departamento?", "neutro", "“Casa.”", "No cambia la conducta inmediata, aunque importa para la prevención."),
  ],
  exam: [
    act("local", "Lugar de la picadura", "clave", "Punto de picadura en el dorso del pie, dolor intenso, sin edema importante ni necrosis.", "El dolor local sin gran edema es típico del escorpión (a diferencia de la yarará)."),
    act("sistemico", "Signos sistémicos: sudoración, sialorrea, temblor, perfusión", "clave", "Sudoración profusa, sialorrea, temblor, piel fría; taquicardia e hipertensión.", "Descarga autonómica (simpática y parasimpática): envenenamiento moderado a grave."),
    act("pulmonar", "Auscultación pulmonar", "clave", "Sin crepitantes.", "El edema agudo de pulmón es la complicación más grave."),
    act("neuro", "Estado neurológico", "util", "Alerta, irritable.", "La somnolencia o las convulsiones indican gravedad."),
  ],
  studies: [
    study("Laboratorio", "lab", "Glucemia, ionograma, hemograma, CPK, gases", "util", "Glucemia 186, leucocitosis leve.", "La hiperglucemia y la leucocitosis acompañan al envenenamiento."),
    study("Electrofisiología", "ecg", "Electrocardiograma y monitoreo", "clave", "Taquicardia sinusal.", "El veneno puede causar arritmias y disfunción miocárdica."),
    study("Imágenes", "rx", "Radiografía de tórax", "util", "Sin edema pulmonar.", "Basal ante riesgo de edema."),
    study("Laboratorio", "esperar-lab", "Esperar los resultados de laboratorio para decidir el antiveneno", "riesgoso", "No se realizó.", "La indicación es clínica: los vómitos y los signos sistémicos bastan; esperar empeora el pronóstico."),
    study("Imágenes", "eco-pie", "Ecografía del pie", "innecesario", "No se realizó.", "No aporta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("moderado", "Escorpionismo con envenenamiento sistémico moderado (Tityus) en una niña", true, "Picadura confirmada, dolor local, vómitos, sudoración, sialorrea, taquicardia e hipertensión."),
      dx("leve", "Picadura de escorpión leve", false, "Solo tendría síntomas locales (dolor, parestesias), sin vómitos ni signos autonómicos."),
      dx("arana", "Mordedura de araña viuda negra (Latrodectus)", false, "También da cuadro autonómico, pero con dolor muscular y abdominal en tabla; acá trajeron el escorpión."),
      dx("gastro", "Gastroenteritis", false, "No explica la picadura, la sudoración ni la sialorrea."),
      dx("anafilaxia", "Anafilaxia", false, "Daría urticaria, angioedema e hipotensión, no hipertensión con sialorrea."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("antiveneno", "Antiveneno antiescorpiónico endovenoso, en dosis según la gravedad, lo antes posible", "clave", "Neutraliza el veneno circulante; en menores de 14 años con signos sistémicos (vómitos) está indicado."),
      mg("monitoreo", "Internación con monitoreo cardiorrespiratorio (unidad cerrada si progresa)", "clave", "Riesgo de edema pulmonar, shock y arritmias."),
      mg("analgesia", "Analgesia y tratamiento sintomático", "clave", "El dolor local es intenso."),
      mg("notificar", "Notificación al SNVS y consejos de prevención en el hogar", "util", "Sacudir ropa y calzado, rejillas en desagües, burletes, controlar escombros."),
      mg("alta", "Alta luego de una hora de observación con analgésicos", "riesgoso", "Una niña con vómitos y signos autonómicos puede agravarse en horas; aun en los leves, los menores de 14 se observan al menos 6 h."),
      mg("torniquete", "Torniquete o incisión en la zona de la picadura", "riesgoso", "No sirven y producen daño local."),
    ],
  },
  debrief: {
    diagnosis: "Escorpionismo moderado (Tityus) con compromiso sistémico autonómico en niña de 5 años.",
    pathologies: [
      { name: "Envenenamiento por escorpión (Tityus)", role: "principal", why: "Picadura con síntomas sistémicos." },
      { name: "Edema pulmonar y shock", role: "diferencial", why: "Complicaciones graves a vigilar." },
      { name: "Latrodectismo", role: "diferencial", why: "Otro envenenamiento con síntomas autonómicos." },
    ],
    reasoning: [
      "Causa: el veneno de Tityus contiene neurotoxinas que actúan sobre los canales de sodio.",
      "Mecanismo: prolongan la despolarización de las terminales nerviosas y producen una descarga masiva de catecolaminas y acetilcolina.",
      "Consecuencia: síntomas parasimpáticos (vómitos, sialorrea, sudoración, bradicardia) y simpáticos (taquicardia, hipertensión, hiperglucemia); en los casos graves, disfunción miocárdica, edema pulmonar y shock.",
      "Los niños, por su menor peso, reciben más veneno por kilo: por eso son el grupo con casos graves y muertes.",
    ],
    epidemiology:
      "En la Argentina se notifican miles de picaduras de escorpión por año, con aumento en primavera y verano. Las provincias con más casos son Córdoba, Santiago del Estero, Tucumán, Catamarca, Santa Fe y el conurbano bonaerense; es un problema urbano (sótanos, desagües, escombros). Afecta a todas las edades, pero las muertes se concentran en menores de 14 años.",
    management: [
      "Clasificar la gravedad: leve (solo local), moderado (síntomas sistémicos), grave (vómitos profusos, alteraciones cardiorrespiratorias, shock).",
      "Leve: analgesia y observación (al menos 6 h en menores de 14).",
      "Moderado o grave: antiveneno endovenoso cuanto antes y monitoreo; unidad cerrada si es grave.",
      "No usar torniquetes, incisiones ni remedios caseros.",
      "Notificación y prevención en el hogar.",
    ],
    sources: [
      "Ministerio de Salud de la Nación — Guía de prevención, diagnóstico, tratamiento y vigilancia epidemiológica del envenenamiento por escorpiones.",
      "ANLIS-Malbrán — Instituto Nacional de Producción de Biológicos (antivenenos).",
    ],
    pearls: ["Niño picado por escorpión que vomita = antiveneno.", "La indicación es clínica, no de laboratorio.", "Menores de 14: observar al menos 6 h."],
    pitfalls: ["Dar el alta precoz.", "Esperar el laboratorio.", "Usar torniquetes."],
  },
};
