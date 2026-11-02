import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const colangitis: ClinicalCase = {
  id: "colangitis-aguda-grave",
  level: 4,
  area: "Cirugía",
  setting: "Guardia",
  patient: { age: 72, ageUnit: "años", sex: "F", context: "Tiene cálculos en la vesícula conocidos hace años; no se operó." },
  frequency: "frecuente",
  intro: "“Desde ayer tiene fiebre con escalofríos, dolor arriba a la derecha y hoy la vemos amarilla y confundida.” (relata el hijo)",
  vitals: { TA: "86/50 mmHg", FC: "122 lpm", FR: "24 rpm", "T°": "39,2 °C", "SatO₂": "94 %", Glasgow: "13/15" },
  anamnesis: [
    act("dolor", "¿Dónde le duele y desde cuándo?", "clave", "“Arriba a la derecha, desde ayer, y le pasa a la espalda.”", "Dolor en hipocondrio derecho."),
    act("fiebre", "¿Tuvo fiebre con escalofríos?", "clave", "“Temblaba toda.”", "Fiebre con escalofríos: bacteriemia de origen biliar."),
    act("ictericia", "¿Desde cuándo está amarilla? ¿Cómo es la orina y la caca?", "clave", "“Desde hoy; orina oscura y caca clara.”", "Ictericia colestásica: obstrucción de la vía biliar."),
    act("calculos", "¿Tiene cálculos en la vesícula?", "util", "“Sí, hace años, no se quiso operar.”", "La coledocolitiasis es la causa más frecuente."),
    act("cancer", "¿Bajó de peso o tuvo picazón antes?", "util", "“No.”", "Orienta a cálculo más que a tumor."),
    act("novela", "¿Qué le gusta mirar en la tele?", "neutro", "“Novelas.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Palpación abdominal", "clave", "Dolor en hipocondrio derecho, sin defensa generalizada.", "Foco biliar."),
    act("ictericia-ex", "Piel y escleras", "clave", "Ictericia.", "Obstrucción biliar."),
    act("conciencia", "Estado de conciencia y perfusión", "clave", "Confusa, piel fría, relleno 4 s.", "Shock y alteración mental: péntada de Reynolds, colangitis grave."),
  ],
  studies: [
    study("Laboratorio", "lab", "Hemograma, hepatograma, coagulograma, función renal, lactato, lipasa", "clave", "Leucocitos 21.000, bilirrubina 5,8, FAL 620, GGT 540, creatinina 1,9, plaquetas 90.000, lactato 4,2.", "Colestasis con disfunción orgánica."),
    study("Imágenes", "eco", "Ecografía abdominal", "clave", "Colédoco dilatado de 12 mm con imagen de cálculo distal; vesícula con litiasis.", "Confirma obstrucción biliar por cálculo."),
    study("Microbiología", "hemocultivos", "Hemocultivos", "clave", "Escherichia coli.", "Bacteriemia por gram negativos."),
    study("Imágenes", "colangiorm", "Colangiorresonancia antes de drenar", "riesgoso", "No se realizó.", "En la colangitis grave la prioridad es drenar; la imagen ya mostró el cálculo."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("colangitis", "Colangitis aguda grave (Tokyo grado III) por coledocolitiasis, con shock séptico", true, "Fiebre con escalofríos, ictericia y dolor en hipocondrio derecho (tríada de Charcot), más confusión y shock (péntada de Reynolds), colédoco dilatado con cálculo y disfunción de órganos."),
      dx("colecistitis", "Colecistitis aguda", false, "La colecistitis no suele dar ictericia importante ni dilatar el colédoco."),
      dx("pancreatitis", "Pancreatitis biliar", false, "La lipasa no está alta."),
      dx("hepatitis", "Hepatitis aguda", false, "El patrón es colestásico y hay vía biliar dilatada."),
      dx("cancer", "Cáncer de cabeza de páncreas", false, "Ictericia indolora sin fiebre; acá hay cálculo y cuadro séptico."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("drenaje", "Drenaje biliar urgente por CPRE (papilotomía y extracción del cálculo); percutáneo si no es posible", "clave", "En la colangitis grave el drenaje temprano es lo que reduce la mortalidad."),
      mg("atb", "Antibióticos EV de amplio espectro en la primera hora (por ejemplo, piperacilina-tazobactam)", "clave", "Cubre gram negativos y anaerobios."),
      mg("reanimacion", "Reanimación con fluidos y noradrenalina en terapia intensiva", "clave", "Shock séptico."),
      mg("colecistectomia", "Colecistectomía diferida en la misma internación o en pocas semanas", "util", "Previene nuevos episodios."),
      mg("cirugia-ya", "Cirugía abierta de la vía biliar de urgencia como primera opción", "riesgoso", "Tiene más mortalidad que el drenaje endoscópico en el paciente inestable."),
      mg("solo-atb", "Solo antibióticos y esperar", "riesgoso", "Sin drenaje, la colangitis grave es mortal."),
    ],
  },
  debrief: {
    diagnosis: "Colangitis aguda grave (Tokyo III) por coledocolitiasis, con bacteriemia por E. coli, shock séptico, insuficiencia renal y confusión, en mujer de 72 años con litiasis vesicular no operada.",
    pathologies: [
      { name: "Colangitis aguda grave", role: "principal", why: "Infección de la vía biliar obstruida con disfunción de órganos." },
      { name: "Coledocolitiasis y litiasis vesicular", role: "asociada", why: "Causa de la obstrucción." },
      { name: "Colecistitis, pancreatitis, hepatitis, cáncer de páncreas", role: "diferencial", why: "Otras causas de dolor e ictericia." },
    ],
    reasoning: [
      "Causa: un cálculo migra al colédoco y lo obstruye.",
      "Mecanismo: la bilis estancada se infecta con bacterias intestinales; la presión alta en la vía biliar hace pasar bacterias y toxinas a la sangre.",
      "Consecuencia: fiebre, ictericia y dolor; en los casos graves, sepsis, shock, confusión e insuficiencia de órganos.",
    ],
    epidemiology:
      "La litiasis biliar es muy frecuente en Argentina, sobre todo en mujeres y con la edad, y entre un 10 y un 15 % de quienes tienen cálculos en la vesícula tiene también cálculos en el colédoco. La colangitis es más grave en adultos mayores. La colecistectomía electiva en pacientes con síntomas previene estas complicaciones.",
    management: [
      "Diagnóstico con la tríada de Charcot, laboratorio colestásico e imagen (criterios de Tokyo).",
      "Clasificar gravedad: leve, moderada, grave.",
      "Antibióticos y reanimación; drenaje biliar según gravedad (urgente en la grave).",
      "Colecistectomía para prevenir recurrencias.",
    ],
    sources: ["Sociedad Argentina de Cirugía — Recomendaciones sobre litiasis biliar.", "Guías de Tokyo 2018 para colangitis y colecistitis agudas."],
    pearls: ["Charcot: fiebre + ictericia + dolor.", "Reynolds: + shock + confusión.", "Grave = drenar ya."],
    pitfalls: ["Tratar solo con antibióticos.", "Demorar el drenaje por estudios."],
    tribunal: [
      qa("¿Qué es la tríada de Charcot y la péntada de Reynolds?", "Charcot: fiebre con escalofríos, ictericia y dolor en hipocondrio derecho (colangitis). Reynolds: Charcot más shock y alteración del estado mental (colangitis grave)."),
      qa("¿Qué es la CPRE?", "La colangiopancreatografía retrógrada endoscópica: un endoscopio llega al duodeno, se canula la papila y se hace papilotomía para extraer cálculos o colocar prótesis; sus complicaciones son pancreatitis, sangrado, perforación y colangitis."),
      qa("¿Qué diferencia una ictericia obstructiva de una hepatocelular?", "Obstructiva: bilirrubina directa alta con fosfatasa alcalina y GGT elevadas, coluria, acolia y prurito, con vía biliar dilatada. Hepatocelular: transaminasas muy elevadas, con fosfatasa alcalina normal o poco alta y vía biliar normal."),
    ],
  },
};
