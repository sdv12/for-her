import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const politrauma: ClinicalCase = {
  id: "politrauma-motociclista",
  level: 4,
  area: "Cirugía",
  setting: "Guardia",
  patient: { age: 23, ageUnit: "años", sex: "M", context: "Motociclista. Chocó contra un auto a alta velocidad. Llega en ambulancia con collar cervical." },
  frequency: "frecuente",
  intro: "“Chocó de frente con un auto y salió despedido. Tenía casco. En la ambulancia empezó a respirar cada vez peor.” (relata el enfermero)",
  vitals: { TA: "78/48 mmHg", FC: "138 lpm", FR: "34 rpm", "SatO₂": "84 % con máscara de oxígeno", Glasgow: "14" },
  anamnesis: [
    act("mecanismo", "¿Cuál fue el mecanismo y la velocidad? ¿Lo tuvieron que extraer?", "clave", "“Choque frontal a unos 70 km/h, salió despedido varios metros.”", "Un mecanismo de alta energía obliga a buscar lesiones graves aunque no sean evidentes."),
    act("dolor", "¿Dónde te duele? ¿Te falta el aire?", "clave", "“Me duele el pecho a la derecha… no puedo respirar…”", "Disnea progresiva con dolor torácico en un trauma: pensar en lesiones torácicas que matan rápido."),
    act("ample", "Historia AMPLE: alergias, medicación, antecedentes, última comida, eventos", "util", "“Sin alergias, no toma nada, comió hace tres horas.”", "Se recoge rápidamente durante la evaluación secundaria."),
    act("conciencia", "¿Perdió el conocimiento?", "util", "“Dicen los testigos que unos segundos.”", "Sugiere traumatismo de cráneo; se reevalúa con el Glasgow seriado."),
    act("alcohol", "¿Tomó alcohol o consumió algo?", "util", "“Dice que tomó dos cervezas.”", "Puede alterar el examen neurológico."),
    act("equipo", "¿De qué cuadro es?", "neutro", "“...”", "No es momento: en el politrauma la anamnesis no puede retrasar el ABCDE."),
  ],
  exam: [
    act("a", "A: vía aérea con control de la columna cervical", "clave", "Habla con frases cortas: vía aérea permeable. Collar cervical colocado.", "La vía aérea con protección cervical es siempre lo primero."),
    act("b", "B: inspección, palpación, percusión y auscultación del tórax; tráquea y yugulares", "clave", "Tráquea desviada a la izquierda, yugulares ingurgitadas, hemitórax derecho hiperexpandido, timpánico, sin murmullo vesicular. Enfisema subcutáneo.", "Neumotórax a tensión: diagnóstico clínico que se trata en el momento, sin esperar imágenes."),
    act("c", "C: pulsos, perfusión, búsqueda de sangrado externo", "clave", "Pulsos débiles, piel fría y pálida, relleno capilar de 4 s; sin sangrado externo activo. Pelvis estable.", "Shock: en este paciente, obstructivo (por el neumotórax), sin descartar hemorragia."),
    act("d", "D: Glasgow y pupilas", "util", "Glasgow 14, pupilas iguales y reactivas.", "Evaluación neurológica breve."),
    act("e", "E: exposición completa, evitando la hipotermia", "util", "Escoriaciones en el hemitórax derecho y el brazo; deformidad en el antebrazo derecho.", "Busca otras lesiones; abrigar después."),
  ],
  studies: [
    study("Imágenes", "efast", "Ecografía eFAST en la sala de reanimación", "util", "Ausencia de deslizamiento pleural derecho; sin líquido libre abdominal ni pericárdico.", "Rápida, en la cama, sin trasladar al paciente: confirma el neumotórax y busca sangrado abdominal o taponamiento."),
    study("Laboratorio", "lab", "Grupo y factor, hemograma, gases, lactato", "util", "Hb 12,8, lactato 4,8 mmol/l. Grupo 0 positivo.", "Lactato alto = hipoperfusión; preparar sangre."),
    study("Imágenes", "rx-antes", "Radiografía de tórax antes de descomprimir", "riesgoso", "No se realizó.", "El neumotórax a tensión es un diagnóstico clínico: esperar la radiografía puede llevar al paro."),
    study("Imágenes", "tc-inestable", "Tomografía de cuerpo entero con el paciente inestable", "riesgoso", "No se realizó.", "Un paciente en shock no se traslada a la tomografía: primero se estabiliza."),
    study("Imágenes", "tc-luego", "Tomografía de cuerpo entero una vez estabilizado", "util", "Contusión pulmonar derecha, fracturas costales 4.ª a 7.ª; sin lesiones de cráneo, columna ni abdomen.", "Completa el diagnóstico de lesiones tras la reanimación."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("ntx", "Neumotórax a tensión derecho con shock obstructivo", true, "Trauma de alta energía, disnea progresiva, hipoxemia, hipotensión, tráquea desviada al otro lado, yugulares ingurgitadas, hemitórax timpánico sin murmullo."),
      dx("hemotorax", "Hemotórax masivo", false, "También da shock e hipoventilación, pero el tórax es mate a la percusión y las yugulares están colapsadas (hipovolemia)."),
      dx("taponamiento", "Taponamiento cardíaco", false, "Da hipotensión e ingurgitación yugular (tríada de Beck), pero con murmullo vesicular conservado y sin desviación traqueal."),
      dx("hemoperitoneo", "Hemoperitoneo por lesión de víscera maciza", false, "Shock hipovolémico con yugulares colapsadas y líquido libre en el FAST, que es negativo."),
      dx("tec", "Traumatismo de cráneo grave", false, "El Glasgow es 14 y no explica el shock ni la hipoxemia."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("descompresion", "Descompresión inmediata con aguja o toracostomía digital (4.º-5.º espacio intercostal, línea axilar media, o 2.º espacio, línea medioclavicular)", "clave", "Libera la presión, restablece el retorno venoso y salva la vida en minutos."),
      mg("tubo", "Colocación de tubo de avenamiento pleural a continuación", "clave", "La aguja es transitoria; el tubo es el tratamiento definitivo."),
      mg("cervical", "Mantener la inmovilización cervical y la protección de la columna", "clave", "Hasta descartar lesión, por el mecanismo de alta energía."),
      mg("vias", "Dos vías gruesas, cristaloides tibios limitados y sangre si persiste el shock", "util", "Tras resolver el neumotórax se reevalúa C; si sigue en shock, buscar sangrado."),
      mg("intubar", "Intubación orotraqueal inmediata antes de descomprimir", "riesgoso", "La ventilación con presión positiva aumenta la tensión del neumotórax y puede precipitar el paro: primero se descomprime."),
      mg("rx-primero", "Esperar la radiografía de tórax para confirmar", "riesgoso", "La demora mata: es un diagnóstico clínico."),
    ],
  },
  debrief: {
    diagnosis: "Politraumatismo por siniestro vial (motociclista) con neumotórax a tensión derecho y shock obstructivo, contusión pulmonar, fracturas costales y fractura de antebrazo.",
    pathologies: [
      { name: "Neumotórax a tensión", role: "principal", why: "Shock obstructivo con signos clínicos típicos." },
      { name: "Contusión pulmonar y fracturas costales", role: "asociada", why: "Mecanismo de la lesión pleural; riesgo de insuficiencia respiratoria." },
      { name: "Hemotórax masivo", role: "diferencial", why: "Otra lesión torácica letal: tórax mate y yugulares colapsadas." },
      { name: "Taponamiento cardíaco", role: "diferencial", why: "Shock con yugulares ingurgitadas, pero con murmullo conservado." },
      { name: "Hemoperitoneo", role: "diferencial", why: "Causa más frecuente de shock hipovolémico en trauma." },
    ],
    reasoning: [
      "Causa: una fractura costal o la compresión brusca del tórax lesionan el pulmón; el aire entra a la pleura con cada inspiración y no sale (mecanismo valvular).",
      "Mecanismo: la presión pleural sube, colapsa el pulmón, empuja el mediastino al otro lado y comprime y acoda las venas cavas.",
      "Consecuencia: cae el retorno venoso y el gasto cardíaco → shock obstructivo con yugulares ingurgitadas; el pulmón colapsado y la compresión del otro dan hipoxemia grave.",
      "Por eso se trata sin esperar imágenes: en minutos puede llevar a un paro con actividad eléctrica sin pulso.",
    ],
    epidemiology:
      "Los siniestros viales son la primera causa de muerte en personas menores de 35 años en la Argentina según la Agencia Nacional de Seguridad Vial. Más del 75 % de las víctimas fatales son varones, y los motociclistas son el grupo con más muertos y el que más creció. El trauma de tórax causa alrededor de un cuarto de las muertes por trauma, muchas de ellas evitables con maniobras simples.",
    management: [
      "Evaluación primaria ABCDE con control de la columna cervical; tratar cada problema al encontrarlo.",
      "Neumotórax a tensión: descompresión inmediata (aguja o toracostomía digital) y luego tubo pleural.",
      "Shock: dos vías, reposición limitada y transfusión precoz si es hemorrágico; buscar sangrado con eFAST.",
      "Evaluación secundaria e imágenes completas solo con el paciente estabilizado.",
      "Derivar a centro de trauma; prevención: casco, velocidad, alcohol y conducción.",
    ],
    sources: [
      "Colegio Americano de Cirujanos — Advanced Trauma Life Support (ATLS), adoptado por la Asociación Argentina de Cirugía.",
      "Agencia Nacional de Seguridad Vial — Informes estadísticos de siniestralidad vial.",
    ],
    pearls: [
      "Neumotórax a tensión: diagnóstico clínico, tratamiento inmediato.",
      "Yugulares ingurgitadas + tórax timpánico sin murmullo = tensión; mate con yugulares planas = hemotórax.",
      "Paciente inestable no va al tomógrafo.",
    ],
    pitfalls: ["Esperar la radiografía.", "Intubar antes de descomprimir.", "Saltar el ABCDE por una lesión llamativa (el antebrazo)."],
  },
};
