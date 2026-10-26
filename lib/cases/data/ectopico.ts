import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const ectopico: ClinicalCase = {
  id: "embarazo-ectopico-roto",
  level: 3,
  area: "Ginecología y obstetricia",
  setting: "Guardia",
  patient: { age: 27, ageUnit: "años", sex: "F" },
  frequency: "poco-frecuente",
  intro: "“Me empezó un dolor fuerte abajo a la izquierda hace dos horas, me mareé en el baño y casi me desmayo. Me duele también el hombro.”",
  vitals: { TA: "88/54 mmHg", FC: "124 lpm", FR: "22 rpm", "T°": "36,4 °C", "SatO₂": "98 %" },
  anamnesis: [
    act("fum", "¿Cuándo fue su última menstruación? ¿Es regular?", "clave", "“Soy regular, cada 28 días. La última fue hace siete semanas. Pensé que estaba atrasada por estrés.”", "Atraso menstrual + dolor abdominal + sangrado: pensar en embarazo ectópico hasta descartarlo."),
    act("sangrado", "¿Tuvo pérdidas de sangre por la vagina?", "clave", "“Unas manchas oscuras, poquitas, desde hace tres días.”", "El sangrado escaso y oscuro (en borra de café) es típico del ectópico, por caída hormonal."),
    act("antecedentes", "¿Tuvo infecciones ginecológicas, cirugías en las trompas o usa DIU?", "clave", "“Hace unos años me trataron por una infección en las trompas. No uso DIU.”", "La enfermedad pelviana inflamatoria daña la trompa y es el principal factor de riesgo de ectópico."),
    act("hombro", "¿Cómo es el dolor del hombro?", "util", "“Me duele la punta del hombro izquierdo, sobre todo acostada.”", "Dolor referido al hombro: sangre en el peritoneo irritando el diafragma (signo de Laffont)."),
    act("anticoncepcion", "¿Usa algún método anticonceptivo?", "util", "“Preservativo, no siempre.”", "Explica la posibilidad de embarazo."),
    act("intestino", "¿Tuvo diarrea o vómitos?", "util", "“Ganas de ir al baño, como de hacer caca, pero no tuve diarrea.”", "El tenesmo rectal puede deberse a sangre en el fondo de saco de Douglas."),
    act("perfume", "¿Usa algún perfume en particular?", "neutro", "“No.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Palpación abdominal", "clave", "Abdomen distendido, dolor difuso con predominio en fosa ilíaca izquierda, defensa y Blumberg positivo.", "Irritación peritoneal por hemoperitoneo."),
    act("perfusion", "Perfusión, palidez y estado de conciencia", "clave", "Pálida, sudorosa, relleno capilar 4 s, lúcida pero ansiosa.", "Signos de shock hipovolémico: la prioridad es la reanimación."),
    act("tacto", "Tacto vaginal (bimanual)", "util", "Dolor intenso a la movilización del cuello; fondo de saco posterior abombado y muy doloroso (“grito de Douglas”).", "Sangre en el Douglas. Se hace con cuidado: no debe demorar la conducta."),
    act("especulo", "Especuloscopía", "util", "Sangrado escaso oscuro desde el orificio cervical, sin restos ovulares.", "Descarta lesiones del cuello y un aborto en curso."),
    act("mamas", "Examen mamario", "neutro", "Normal.", "No aporta en la urgencia."),
  ],
  studies: [
    study("Laboratorio", "beta", "Subunidad beta de hCG", "clave", "2.800 mUI/ml.", "Confirma el embarazo. Con valores por encima de ~1.500–2.000, un embarazo intrauterino debería verse en la ecografía transvaginal."),
    study("Imágenes", "eco", "Ecografía transvaginal (y FAST abdominal)", "clave", "Útero vacío, endometrio engrosado. Masa anexial izquierda. Abundante líquido libre en Douglas y en el espacio hepatorrenal.", "Útero vacío con beta sobre el umbral, masa anexial y hemoperitoneo: ectópico roto."),
    study("Laboratorio", "lab", "Hemograma, grupo y factor, pruebas cruzadas, coagulograma", "clave", "Hb 8,2 g/dl. Grupo 0 Rh negativo.", "Prepara la transfusión; el Rh negativo obliga a dar inmunoglobulina anti-D."),
    study("Imágenes", "tc", "Tomografía de abdomen", "riesgoso", "No se realizó.", "Una paciente en shock no se traslada a tomografía: la ecografía en la cama alcanza y el tiempo es vital."),
    study("Laboratorio", "progesterona", "Progesterona sérica", "innecesario", "No se realizó.", "No cambia la conducta en un ectópico roto."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("ectopico", "Embarazo ectópico tubario izquierdo roto con hemoperitoneo y shock hipovolémico", true, "Atraso, sangrado escaso, dolor en fosa ilíaca, dolor de hombro, shock, beta positiva con útero vacío y líquido libre."),
      dx("aborto", "Aborto espontáneo en curso", false, "Sangrado abundante con cuello dilatado y restos; el dolor es cólico central, sin hemoperitoneo."),
      dx("quiste", "Quiste de cuerpo lúteo hemorrágico", false, "Puede dar hemoperitoneo, pero con beta positiva y útero vacío el ectópico es el diagnóstico a confirmar y tratar."),
      dx("torsion", "Torsión anexial", false, "Dolor súbito con vómitos y masa anexial, sin hemoperitoneo masivo ni shock por sangrado."),
      dx("epi", "Enfermedad pelviana inflamatoria", false, "Fiebre, flujo y dolor bilateral; no explica el shock ni la beta positiva."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("reanimacion", "Dos vías periféricas gruesas, cristaloides y transfusión según necesidad", "clave", "Shock hemorrágico: reanimar mientras se prepara el quirófano."),
      mg("cirugia", "Cirugía de urgencia (laparoscopía o laparotomía) con salpingectomía", "clave", "El ectópico roto con inestabilidad es una emergencia quirúrgica."),
      mg("antid", "Inmunoglobulina anti-D", "clave", "Madre Rh negativa con embarazo: previene la aloinmunización."),
      mg("mtx", "Metotrexato intramuscular", "riesgoso", "Solo para ectópicos no rotos, estables, con beta baja; en un ectópico roto con shock, demorar la cirugía puede ser mortal."),
      mg("esperar", "Repetir la beta en 48 h para ver cómo evoluciona", "riesgoso", "Se usa ante localización incierta en una paciente estable; aquí retrasa una cirugía urgente."),
      mg("consejeria", "Consejería posterior: anticoncepción y riesgo de recurrencia; control precoz en el próximo embarazo", "util", "El riesgo de un nuevo ectópico aumenta; una ecografía temprana lo detecta a tiempo."),
    ],
  },
  debrief: {
    diagnosis: "Embarazo ectópico tubario izquierdo roto con hemoperitoneo y shock hipovolémico, en mujer de 27 años Rh negativa.",
    pathologies: [
      { name: "Embarazo ectópico tubario roto", role: "principal", why: "Beta positiva, útero vacío, masa anexial y hemoperitoneo." },
      { name: "Shock hipovolémico", role: "asociada", why: "Hipotensión, taquicardia y mala perfusión por sangrado." },
      { name: "Secuela de enfermedad pelviana inflamatoria", role: "asociada", why: "El daño tubario previo explica la implantación ectópica." },
      { name: "Aborto espontáneo", role: "diferencial", why: "Otra causa de sangrado del primer trimestre." },
      { name: "Quiste lúteo hemorrágico y torsión anexial", role: "diferencial", why: "Dolor anexial agudo." },
    ],
    reasoning: [
      "Causa: el óvulo fecundado no llega a la cavidad uterina porque la trompa está dañada (EPI previa, cirugías, DIU, tabaco, reproducción asistida).",
      "Mecanismo: se implanta en la ampolla tubaria, que no puede distenderse; el trofoblasto invade la pared y sus vasos.",
      "Consecuencia: entre las 6 y 8 semanas la trompa se rompe → sangrado hacia el peritoneo (dolor, Blumberg, dolor de hombro por irritación del frénico, tenesmo por sangre en el Douglas) y shock. El sangrado vaginal es escaso porque proviene del endometrio que se descama al bajar las hormonas.",
      "Por eso: toda mujer en edad fértil con dolor abdominal o sangrado necesita una prueba de embarazo.",
    ],
    epidemiology:
      "Ocurre en alrededor del 1–2 % de los embarazos y es la principal causa de muerte materna en el primer trimestre. Es más frecuente entre los 25 y 35 años y en mujeres con antecedente de EPI, ectópico previo, cirugías tubarias, tabaquismo o técnicas de reproducción asistida. El 95 % es tubario, sobre todo en la ampolla.",
    management: [
      "Toda mujer en edad fértil con dolor abdominal o sangrado: test de embarazo.",
      "Estable con beta positiva: ecografía transvaginal; si no se ve la localización, seguimiento con beta cada 48 h.",
      "Inestable: reanimación (vías, cristaloides, sangre) y cirugía urgente, con salpingectomía.",
      "Ectópico no roto, estable, beta baja y sin latido: puede usarse metotrexato con seguimiento estricto.",
      "Inmunoglobulina anti-D si es Rh negativa; consejería en anticoncepción y control temprano en futuros embarazos.",
    ],
    sources: [
      "Ministerio de Salud de la Nación — Guía para la atención de las principales emergencias obstétricas.",
      "Federación Argentina de Sociedades de Ginecología y Obstetricia (FASGO) — Consenso de embarazo ectópico.",
    ],
    pearls: [
      "Mujer en edad fértil + dolor abdominal + inestabilidad = ectópico roto hasta que se demuestre lo contrario.",
      "Beta sobre el umbral de discriminación con útero vacío: sospecha alta de ectópico.",
      "Dolor de hombro con dolor abdominal: sangre en el peritoneo.",
    ],
    pitfalls: ["No pedir test de embarazo.", "Mandar a tomografía a una paciente en shock.", "Indicar metotrexato en un ectópico roto."],
  },
};
