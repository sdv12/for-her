import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const quemaduraElectrica: ClinicalCase = {
  id: "quemadura-electrica-alto-voltaje",
  level: 3,
  area: "Traumatología",
  setting: "Guardia",
  patient: { age: 29, ageUnit: "años", sex: "M", context: "Electricista. Tocó un cable de media tensión con la mano derecha." },
  frequency: "poco-frecuente",
  intro: "“Me dio una descarga, me tiró al piso. Tengo quemada la mano y el pie, me duele el brazo.”",
  vitals: { TA: "132/80 mmHg", FC: "108 lpm", FR: "20 rpm", "T°": "36,6 °C", "SatO₂": "97 %", Glasgow: "15/15" },
  anamnesis: [
    act("voltaje", "¿Qué voltaje? ¿Perdiste el conocimiento?", "clave", "“Media tensión; me desmayé un momento.”", "Alto voltaje."),
    act("caida", "¿Caíste de altura?", "clave", "“De la escalera.”", "Trauma asociado."),
    act("orina", "¿Orina oscura?", "clave", "“Sí.”", "Mioglobinuria."),
    act("palpitaciones", "¿Palpitaciones?", "util", "“Algo.”", "Arritmias."),
    act("vacuna", "¿Vacuna antitetánica?", "util", "“No sé.”", "Herida."),
    act("empresa", "¿En qué empresa trabajás?", "neutro", "“En una cooperativa.”", "No orienta."),
  ],
  exam: [
    act("entrada", "Entrada y salida", "clave", "Lesión de entrada en mano derecha y salida en pie izquierdo.", "Recorrido."),
    act("compartimento", "Antebrazo", "clave", "Tenso y doloroso.", "Síndrome compartimental."),
    act("columna", "Columna y trauma", "util", "Dolor cervical leve.", "Trauma."),
  ],
  studies: [
    study("Electrofisiología", "ecg", "ECG y monitoreo", "clave", "Taquicardia sinusal con extrasístoles.", "Arritmias."),
    study("Laboratorio", "ck", "CK, función renal, orina", "clave", "CK 28.000; mioglobinuria.", "Rabdomiólisis."),
    study("Imágenes", "columna", "Imagen de columna por la caída", "clave", "Sin fracturas.", "Trauma."),
    study("Otros", "superficie", "Calcular la gravedad solo por la piel quemada", "riesgoso", "No se realizó.", "Subestima el daño profundo."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("electrica", "Quemadura eléctrica de alto voltaje con rabdomiólisis y síndrome compartimental", true, "Entrada y salida, CK alta, mioglobinuria y antebrazo tenso."),
      dx("termica", "Quemadura térmica superficial", false, "Daño profundo."),
      dx("fractura", "Fractura de antebrazo", false, "Compartimento por lesión eléctrica."),
      dx("rayo", "Lesión por rayo", false, "Fue un cable."),
      dx("contusion", "Contusión muscular", false, "Hay quemadura y rabdomiólisis."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("liquidos", "Cristaloides para diuresis alta", "clave", "Protege el riñón."),
      mg("fasciotomia", "Fasciotomía del antebrazo", "clave", "Compartimental."),
      mg("monitor", "Monitoreo cardíaco", "clave", "Arritmias."),
      mg("quemados", "Derivar a centro de quemados", "clave", "Complejo."),
      mg("parkland", "Calcular líquidos solo por superficie", "riesgoso", "Subestima."),
      mg("alta", "Alta porque las lesiones de piel son chicas", "riesgoso", "Daño oculto."),
    ],
  },
  debrief: {
    diagnosis: "Quemadura eléctrica de alto voltaje con rabdomiólisis y síndrome compartimental del antebrazo derecho, en varón de 29 años.",
    pathologies: [
      { name: "Quemadura eléctrica", role: "principal", why: "Lesión por corriente." },
      { name: "Rabdomiólisis y compartimental", role: "asociada", why: "Complicaciones." },
      { name: "Quemadura térmica, fractura", role: "diferencial", why: "Otras lesiones." },
    ],
    reasoning: [
      "Causa: corriente de alto voltaje.",
      "Mecanismo: la corriente daña músculos y nervios en profundidad.",
      "Consecuencia: rabdomiólisis, arritmias y compartimental.",
    ],
    epidemiology:
      "Es más frecuente en trabajadores de la electricidad y la construcción. La lesión de piel subestima el daño profundo, que es como un aplastamiento. Requiere atención en centro de quemados.",
    management: [
      "ECG.",
      "CK.",
      "Líquidos y fasciotomía.",
      "Centro de quemados.",
    ],
    sources: ["Asociación Argentina de Quemaduras — Recomendaciones.", "American Burn Association — Electrical Injury Guidelines."],
    pearls: ["Iceberg: lo que se ve es poco.", "Orina oscura.", "Compartimento."],
    pitfalls: ["Calcular por superficie.", "No hacer ECG."],
    tribunal: [
      qa("¿Qué es la fórmula de Parkland?", "4 ml por kg por porcentaje de superficie quemada en 24 horas, la mitad en las primeras 8 horas."),
      qa("¿Qué arritmias da la electricidad?", "Fibrilación ventricular con corriente alterna y asistolia con alto voltaje o rayo."),
      qa("¿Qué son los cinco signos del síndrome compartimental?", "Dolor, parestesias, palidez, parálisis y ausencia de pulso, siendo el dolor el más temprano."),
    ],
  },
};
