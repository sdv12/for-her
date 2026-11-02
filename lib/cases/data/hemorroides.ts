import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hemorroides: ClinicalCase = {
  id: "trombosis-hemorroidal-externa",
  level: 1,
  area: "Cirugía",
  setting: "Guardia",
  patient: { age: 38, ageUnit: "años", sex: "M", context: "Camionero. Constipado crónico, pasa muchas horas sentado." },
  frequency: "frecuente",
  intro: "“Desde hace dos días me salió un bulto en la cola que me duele muchísimo, no me puedo sentar. Tuve que hacer mucha fuerza para ir de cuerpo.”",
  vitals: { TA: "132/82 mmHg", FC: "88 lpm", "T°": "36,6 °C" },
  anamnesis: [
    act("inicio", "¿Cuándo apareció el bulto y cómo empezó?", "clave", "“Hace 48 horas, después de hacer mucha fuerza.”", "El dolor de la trombosis hemorroidal es máximo en las primeras 48–72 h."),
    act("sangrado", "¿Sangra? ¿Cómo es la sangre?", "clave", "“Unas gotas rojas en el papel.”", "Sangrado rojo escaso, compatible con patología anal."),
    act("alarma", "¿Bajaste de peso, cambió tu forma de ir de cuerpo, tenés antecedentes familiares de cáncer de colon?", "clave", "“No, nada de eso.”", "Sin signos de alarma: no requiere estudio del colon urgente."),
    act("constipacion", "¿Cuántas veces por semana vas de cuerpo?", "util", "“Dos o tres, duras.”", "Constipación y esfuerzo: factores de riesgo."),
    act("fiebre", "¿Tuviste fiebre o supuración?", "util", "“No.”", "Descarta absceso perianal."),
    act("ruta", "¿Qué ruta hacés?", "neutro", "“La 9, a Rosario.”", "No orienta."),
  ],
  exam: [
    act("inspeccion", "Inspección anal", "clave", "Nódulo violáceo, tenso, de 1,5 cm, muy doloroso, en el margen anal.", "Trombosis hemorroidal externa."),
    act("fisura", "Separar suavemente los glúteos y ver el ano", "util", "Sin fisuras.", "Descarta fisura anal."),
    act("tacto", "Tacto rectal", "innecesario", "No se realizó.", "Es muy doloroso en la trombosis aguda y no cambia la conducta; se difiere."),
  ],
  studies: [
    study("Otros", "anoscopia", "Anoscopía diferida", "util", "Hemorroides internas grado I.", "Evalúa la patología interna después del episodio agudo."),
    study("Otros", "colonoscopia", "Colonoscopía urgente", "innecesario", "No se realizó.", "Sin signos de alarma y menor de 45 años; se considera según rastreo o síntomas."),
    study("Laboratorio", "lab", "Laboratorio completo", "innecesario", "No se realizó.", "No aporta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("trombosis", "Trombosis hemorroidal externa aguda (menos de 72 h)", true, "Nódulo violáceo doloroso en el margen anal de aparición brusca tras esfuerzo defecatorio, en un constipado crónico."),
      dx("fisura", "Fisura anal", false, "La fisura da dolor intenso al defecar, con un desgarro visible, sin nódulo."),
      dx("absceso", "Absceso perianal", false, "Habría eritema, calor, fiebre y fluctuación."),
      dx("prolapso", "Prolapso hemorroidal interno", false, "Las internas prolapsadas no son tan dolorosas salvo estranguladas, y se cubren de mucosa."),
      dx("cancer", "Cáncer de ano", false, "Sin masa indurada ni signos de alarma; evolución aguda."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("escision", "Escisión del trombo con anestesia local (en las primeras 72 h)", "clave", "Alivia rápido el dolor y reduce la recurrencia en la trombosis aguda dolorosa."),
      mg("fibra", "Fibra, agua abundante y evitar el esfuerzo defecatorio", "clave", "Trata la causa."),
      mg("banos", "Baños de asiento tibios y analgesia", "clave", "Alivio sintomático."),
      mg("tecnica", "Pausas activas en la ruta para no estar tantas horas sentado", "util", "Reduce la congestión venosa."),
      mg("ligadura", "Ligadura elástica del trombo externo", "riesgoso", "Las hemorroides externas tienen inervación somática: la ligadura es muy dolorosa."),
      mg("cirugia-mayor", "Hemorroidectomía de urgencia", "innecesario", "No está indicada en una trombosis externa aislada."),
    ],
  },
  debrief: {
    diagnosis: "Trombosis hemorroidal externa aguda (48 h), en varón de 38 años con constipación crónica y sedentarismo laboral.",
    pathologies: [
      { name: "Trombosis hemorroidal externa", role: "principal", why: "Coágulo en el plexo hemorroidal externo." },
      { name: "Constipación crónica", role: "asociada", why: "Factor causal." },
      { name: "Fisura, absceso, prolapso hemorroidal, cáncer", role: "diferencial", why: "Otras causas de dolor anal." },
    ],
    reasoning: [
      "Causa: esfuerzo defecatorio con constipación y muchas horas sentado.",
      "Mecanismo: el aumento de presión rompe o trombosa una vena del plexo hemorroidal externo, por debajo de la línea pectínea.",
      "Consecuencia: nódulo azulado muy doloroso (la piel tiene inervación somática), que se reabsorbe en 1–2 semanas o se ulcera y sangra.",
    ],
    epidemiology:
      "La enfermedad hemorroidal es muy frecuente: afecta a una gran parte de los adultos en algún momento, con pico entre los 45 y 65 años. Constipación, embarazo, sedentarismo y dieta pobre en fibra son los principales factores. La trombosis externa es una consulta habitual en la guardia.",
    management: [
      "Descartar signos de alarma de cáncer colorrectal.",
      "Trombosis externa de menos de 72 h muy dolorosa: escisión con anestesia local.",
      "Después de 72 h o con poco dolor: tratamiento médico (fibra, baños de asiento, analgesia).",
      "Prevención de la constipación.",
    ],
    sources: ["Sociedad Argentina de Coloproctología — Recomendaciones sobre enfermedad hemorroidal.", "Ministerio de Salud de la Nación — Programa de prevención del cáncer colorrectal."],
    pearls: ["Externa = duele; interna = sangra.", "Menos de 72 h: escisión.", "Fibra y agua."],
    pitfalls: ["Atribuir todo sangrado a hemorroides sin buscar alarma.", "Ligar una hemorroide externa."],
    tribunal: [
      qa("¿Cómo se clasifican las hemorroides internas?", "Grado I: sangran sin prolapso; grado II: prolapsan y se reducen solas; grado III: prolapsan y requieren reducción manual; grado IV: prolapso irreductible. Los grados I–II se tratan con medidas médicas y ligadura; III–IV, con ligadura o cirugía."),
      qa("¿Cuándo se estudia el colon en una persona con sangrado rectal?", "Ante signos de alarma (mayores de 45–50 años, cambio del hábito evacuatorio, anemia, pérdida de peso, sangre mezclada con las heces, antecedentes familiares de cáncer colorrectal o enfermedad inflamatoria) o si el sangrado persiste pese al tratamiento."),
      qa("¿Qué diferencia hay entre hemorroides internas y externas?", "Las internas están por encima de la línea pectínea, cubiertas de mucosa con inervación visceral: sangran y prolapsan, poco dolorosas. Las externas están por debajo, cubiertas de piel con inervación somática: duelen mucho cuando se trombosan."),
    ],
  },
};
