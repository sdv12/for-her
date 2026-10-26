import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const colecistitis: ClinicalCase = {
  id: "colecistitis-aguda",
  level: 2,
  area: "Cirugía",
  setting: "Guardia",
  patient: { age: 46, ageUnit: "años", sex: "F", context: "Tres hijos. Sobrepeso." },
  frequency: "frecuente",
  intro: "“Después del asado de ayer me empezó un dolor en la boca del estómago que se fue para la derecha, debajo de las costillas. No se me pasa desde anoche y tengo fiebre.”",
  vitals: { TA: "128/82 mmHg", FC: "104 lpm", FR: "20 rpm", "T°": "38,4 °C" },
  anamnesis: [
    act("duracion", "¿Le pasó antes? ¿Cuánto duraban?", "clave", "“Sí, varias veces después de comer frito, pero se me pasaban en un par de horas.”", "Cólicos biliares previos que ceden en horas; ahora dura más de 6 horas y hay fiebre: pasó de cólico a colecistitis."),
    act("irradiacion", "¿El dolor va a algún lado?", "util", "“Al hombro derecho y la espalda.”", "La irradiación a la escápula derecha es típica del dolor biliar."),
    act("ictericia", "¿Se puso amarilla, tiene la orina oscura o la materia fecal clara?", "clave", "“No, nada de eso.”", "Ictericia, coluria o acolia orientan a coledocolitiasis o colangitis, que cambian la conducta."),
    act("vomitos", "¿Tuvo vómitos?", "util", "“Vomité dos veces, comida.”", "Acompañan con frecuencia."),
    act("alcohol", "¿Toma alcohol?", "util", "“Muy poco.”", "Orienta en el diferencial con pancreatitis."),
    act("embarazo", "¿Puede estar embarazada?", "util", "“No, me ligué.”", "Cambia los estudios y los tratamientos posibles."),
    act("signo", "¿De qué signo es?", "neutro", "“Escorpio.”", "No orienta."),
  ],
  exam: [
    act("murphy", "Signo de Murphy", "clave", "Positivo: interrumpe la inspiración al palpar el hipocondrio derecho.", "Signo clásico de inflamación vesicular."),
    act("abdomen", "Palpación abdominal completa", "clave", "Dolor y defensa en hipocondrio derecho, sin masa palpable; resto blando, sin peritonismo generalizado.", "Inflamación localizada; un abdomen en tabla sugeriría perforación."),
    act("piel", "Piel y escleras", "util", "Sin ictericia.", "Junto con el laboratorio, aleja coledocolitiasis."),
    act("pulmonar", "Auscultación pulmonar", "util", "Normal.", "Una neumonía basal derecha puede dar dolor en el hipocondrio."),
  ],
  studies: [
    study("Imágenes", "eco", "Ecografía hepatobiliar", "clave", "Vesícula distendida con litiasis múltiple y un lito impactado en el bacinete; pared de 6 mm con doble contorno; líquido perivesicular; Murphy ecográfico positivo. Vía biliar de 5 mm.", "Estudio de elección: confirma litiasis, inflamación y vía biliar no dilatada."),
    study("Laboratorio", "lab", "Hemograma, PCR, hepatograma y amilasa o lipasa", "clave", "Leucocitos 15.600, PCR 95 mg/l. Bilirrubina 1,1 mg/dl, FAL y transaminasas normales. Lipasa normal.", "Leucocitosis y PCR: inflamación sistémica (criterios de Tokio). Hepatograma y lipasa normales alejan coledocolitiasis y pancreatitis."),
    study("Electrofisiología", "ecg", "Electrocardiograma", "util", "Taquicardia sinusal, sin isquemia.", "Un infarto de cara inferior puede dar dolor epigástrico."),
    study("Imágenes", "tc", "Tomografía de abdomen con contraste", "innecesario", "No se realizó.", "La ecografía es superior para la vesícula; la TC se usa ante complicaciones o dudas."),
    study("Imágenes", "cpre", "Colangiopancreatografía retrógrada endoscópica (CPRE)", "riesgoso", "No se realizó.", "Es invasiva (riesgo de pancreatitis y perforación) y solo se indica con coledocolitiasis o colangitis; acá la vía biliar es normal."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("colecistitis", "Colecistitis aguda litiásica (grado I de Tokio)", true, "Dolor en hipocondrio derecho de más de 6 horas, fiebre, Murphy positivo, leucocitosis y ecografía con litiasis, pared engrosada y líquido perivesicular."),
      dx("colico", "Cólico biliar", false, "Dura menos de 6 horas, sin fiebre ni leucocitosis ni pared engrosada."),
      dx("colangitis", "Colangitis aguda", false, "Tríada de Charcot: fiebre, ictericia y dolor, con vía biliar dilatada y hepatograma colestásico."),
      dx("pancreatitis", "Pancreatitis aguda", false, "Dolor epigástrico en cinturón con lipasa mayor a 3 veces el valor normal."),
      dx("ulcera", "Úlcera péptica perforada", false, "Dolor súbito, abdomen en tabla y neumoperitoneo."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cirugia", "Colecistectomía laparoscópica temprana (en la misma internación, idealmente en las primeras 72 h)", "clave", "Reduce complicaciones, días de internación y reinternaciones frente a operar en diferido."),
      mg("atb", "Antibiótico endovenoso (por ejemplo, ampicilina-sulbactam)", "clave", "La vesícula obstruida se sobreinfecta con gérmenes entéricos."),
      mg("soporte", "Ayuno, hidratación y analgesia", "clave", "Soporte inicial mientras se prepara la cirugía."),
      mg("sin-analgesia", "Evitar la analgesia por miedo a enmascarar el cuadro", "riesgoso", "Negar la analgesia no mejora el diagnóstico y genera sufrimiento innecesario."),
      mg("alta", "Alta con antiespasmódicos y dieta sin grasas, con cirugía programada en meses", "riesgoso", "Es la conducta para un cólico biliar; en una colecistitis aguda expone a gangrena, perforación o empiema."),
      mg("ursodesoxicolico", "Ácido ursodesoxicólico para disolver los cálculos", "innecesario", "No sirve en la colecistitis aguda y casi no se usa para cálculos sintomáticos."),
    ],
  },
  debrief: {
    diagnosis: "Colecistitis aguda litiásica leve (grado I de Tokio), sin coledocolitiasis.",
    pathologies: [
      { name: "Colecistitis aguda litiásica", role: "principal", why: "Inflamación vesicular por obstrucción del cístico." },
      { name: "Litiasis vesicular", role: "asociada", why: "La causa de base (cólicos biliares previos)." },
      { name: "Coledocolitiasis y colangitis", role: "diferencial", why: "Se descartan con hepatograma y ecografía." },
      { name: "Pancreatitis biliar", role: "diferencial", why: "Lipasa normal." },
      { name: "Infarto inferior", role: "diferencial", why: "Por eso el ECG en todo dolor epigástrico." },
    ],
    reasoning: [
      "Causa: litiasis vesicular (90–95 % de los casos). Los cálculos de colesterol se forman cuando la bilis está sobresaturada de colesterol, con hipomotilidad vesicular.",
      "Mecanismo: tras una comida grasa la vesícula se contrae y un cálculo se impacta en el bacinete o el cístico. La vesícula obstruida se distiende, la pared se inflama (químicamente por la lisolecitina) y se compromete su irrigación; después se sobreinfecta.",
      "Consecuencia: dolor persistente en el hipocondrio derecho, fiebre, Murphy positivo, leucocitosis. Sin tratamiento puede evolucionar a gangrena, empiema o perforación.",
      "El cólico biliar es la obstrucción transitoria (el cálculo se moviliza y el dolor cede); la colecistitis es la obstrucción persistente con inflamación.",
    ],
    epidemiology:
      "La litiasis biliar es muy frecuente en la Argentina, sobre todo en mujeres (2–3:1). El clásico “4F” (female, forty, fertile, fat: mujer, alrededor de 40 años, con embarazos y sobrepeso) resume sus factores de riesgo, a los que se suman el descenso rápido de peso y los antecedentes familiares. La colecistitis aguda es una de las urgencias quirúrgicas más frecuentes de la guardia.",
    management: [
      "Diagnóstico con clínica, laboratorio y ecografía (criterios de Tokio); graduar la gravedad.",
      "Ayuno, hidratación, analgesia y antibiótico endovenoso.",
      "Colecistectomía laparoscópica temprana en los grados I y II con paciente en condiciones.",
      "Grado III o paciente de alto riesgo: soporte y drenaje percutáneo (colecistostomía) con cirugía diferida.",
      "Si hay coledocolitiasis: CPRE o exploración de la vía biliar.",
    ],
    sources: [
      "Asociación Argentina de Cirugía — Relato y recomendaciones sobre patología biliar.",
      "Tokyo Guidelines 2018 para colecistitis y colangitis aguda, adoptadas en el país.",
    ],
    pearls: [
      "Cólico biliar < 6 h sin fiebre; colecistitis > 6 h con fiebre y Murphy.",
      "Charcot (fiebre, ictericia, dolor) = colangitis; con shock y confusión es la péntada de Reynolds.",
      "Todo dolor epigástrico: ECG.",
    ],
    pitfalls: ["Mandar a casa una colecistitis como si fuera un cólico.", "Pedir CPRE sin vía biliar dilatada ni colestasis.", "Negar la analgesia."],
  },
};
