import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const guillainBarre: ClinicalCase = {
  id: "guillain-barre",
  level: 4,
  area: "Neurología",
  setting: "Guardia",
  patient: { age: 30, ageUnit: "años", sex: "M" },
  frequency: "raro",
  intro: "“Hace tres días siento hormigueo en los pies, y hoy se me aflojan las piernas: me cuesta subir la escalera.”",
  vitals: { TA: "140/90 mmHg", FC: "102 lpm", FR: "18 rpm", "SatO₂": "97 %", "T°": "36,5 °C" },
  anamnesis: [
    act("infeccion", "¿Estuvo enfermo en las últimas semanas?", "clave", "“Hace dos semanas tuve una diarrea fuerte, de unos tres días.”", "Dos tercios de los casos tienen una infección previa; Campylobacter jejuni es la más asociada."),
    act("progresion", "¿Cómo fue avanzando la debilidad?", "clave", "“Empezó por los pies y ahora siento las manos más débiles.”", "Debilidad ascendente y simétrica que progresa en días: típica del Guillain-Barré."),
    act("respiracion", "¿Le cuesta respirar, toser o tragar?", "clave", "“Me cuesta toser fuerte.”", "Tos débil = compromiso de los músculos respiratorios: signo de alarma de insuficiencia respiratoria."),
    act("esfinteres", "¿Orina y va de cuerpo con normalidad?", "clave", "“Sí, normal.”", "Si hubiera trastornos esfinterianos precoces y marcados, habría que descartar una lesión medular."),
    act("dolor", "¿Tiene dolor?", "util", "“Me duele la cintura y las piernas.”", "El dolor lumbar y radicular es frecuente en el Guillain-Barré y puede confundir."),
    act("vacunas", "¿Recibió alguna vacuna recientemente?", "util", "“No.”", "Se interroga, aunque la asociación con vacunas es muy infrecuente."),
    act("toxicos", "¿Consume alcohol o drogas?", "neutro", "“Algo de alcohol los fines de semana.”", "No explica un cuadro agudo de este tipo."),
  ],
  exam: [
    act("fuerza", "Fuerza muscular", "clave", "Miembros inferiores 3/5, miembros superiores 4/5 a predominio distal; simétrica.", "Debilidad simétrica, más en las piernas: polirradiculoneuropatía."),
    act("reflejos", "Reflejos osteotendinosos", "clave", "Aquilianos y rotulianos abolidos; bicipitales disminuidos.", "Arreflexia: signo cardinal (lesión de la neurona motora inferior)."),
    act("sensibilidad", "Sensibilidad y nivel sensitivo", "clave", "Parestesias “en guante y media”, sin nivel sensitivo.", "La ausencia de nivel sensitivo aleja una lesión medular."),
    act("pares", "Pares craneales", "util", "Paresia facial periférica bilateral leve.", "El compromiso facial bilateral es frecuente en el Guillain-Barré."),
    act("autonomico", "Signos autonómicos", "util", "Taquicardia y presión lábil.", "La disautonomía puede provocar arritmias graves: requiere monitoreo."),
    act("babinski", "Signo de Babinski", "util", "Ausente (respuesta plantar flexora).", "Un Babinski positivo hablaría de lesión de primera motoneurona (cerebro o médula)."),
  ],
  studies: [
    study("Otros", "cvf", "Capacidad vital forzada seriada y presión inspiratoria máxima", "clave", "CVF 22 ml/kg.", "Regla 20/30/40: CVF menor de 20 ml/kg, PImax menor de 30 o PEmax menor de 40 cmH₂O indican riesgo de intubación. Se mide seriada: puede caer en horas."),
    study("Laboratorio", "lcr", "Punción lumbar (LCR)", "clave", "Proteínas 110 mg/dl, 3 células/mm³.", "Disociación albúmino-citológica: proteínas altas sin células. En la primera semana puede ser normal."),
    study("Electrofisiología", "emg", "Electromiograma y velocidades de conducción", "clave", "Polirradiculoneuropatía desmielinizante: velocidades disminuidas, bloqueos de conducción, onda F prolongada.", "Confirma el diagnóstico y define la variante (desmielinizante o axonal)."),
    study("Laboratorio", "lab", "Ionograma con potasio, CPK y glucemia", "util", "K 4,0, CPK normal, glucemia normal.", "Descarta la parálisis hipopotasémica y la miopatía."),
    study("Imágenes", "rm", "RM de columna", "innecesario", "Normal.", "Se pide si hay nivel sensitivo, trastorno esfinteriano marcado o asimetría que hagan pensar en una lesión medular."),
    study("Imágenes", "tc", "TC de cerebro", "innecesario", "Normal.", "No explica una debilidad simétrica con arreflexia."),
    study("Laboratorio", "gangliosidos", "Anticuerpos antigangliósidos", "neutro", "Anti-GM1 positivos.", "Apoyan el diagnóstico y la variante, pero el resultado tarda y no cambia el tratamiento inicial."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("gbs", "Síndrome de Guillain-Barré (polirradiculoneuropatía desmielinizante inflamatoria aguda) post-infeccioso", true, "Debilidad simétrica, ascendente y progresiva con arreflexia después de una diarrea, con disociación albúmino-citológica y desmielinización en el electromiograma."),
      dx("mielitis", "Mielitis transversa", false, "Daría nivel sensitivo, trastornos esfinterianos precoces y, después de la fase aguda, signos de primera motoneurona."),
      dx("miastenia", "Miastenia gravis", false, "Debilidad fluctuante que empeora con el esfuerzo, ptosis y diplopía, con reflejos y sensibilidad conservados."),
      dx("hipok", "Parálisis periódica hipopotasémica", false, "Episodios de debilidad con potasio bajo, sin parestesias ni alteración del LCR."),
      dx("botulismo", "Botulismo", false, "Parálisis descendente que empieza por los pares craneales (pupilas dilatadas, diplopía, disfagia), sin parestesias."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("uti", "Internación con monitoreo en un lugar con capacidad de ventilación mecánica (terapia intensiva o unidad equivalente)", "clave", "La CVF de 22 ml/kg está cerca del umbral: puede requerir intubación en horas."),
      mg("igiv", "Inmunoglobulina endovenosa 0,4 g/kg/día por 5 días (o plasmaféresis)", "clave", "Acortan la evolución y mejoran la recuperación cuando se indican en las primeras semanas en pacientes que no caminan solos."),
      mg("monitoreo", "Monitoreo seriado de CVF, deglución, ECG y presión", "clave", "Detecta a tiempo la falla respiratoria y las arritmias por disautonomía."),
      mg("tvp", "Profilaxis de trombosis venosa y kinesioterapia motora y respiratoria", "util", "La inmovilidad aumenta el riesgo de TVP; la kinesioterapia previene complicaciones."),
      mg("corticoides", "Corticoides", "innecesario", "No son eficaces en el Guillain-Barré."),
      mg("combinar", "Combinar inmunoglobulina y plasmaféresis", "innecesario", "Combinarlas no agrega beneficio."),
      mg("alta", "Alta con control ambulatorio", "riesgoso", "Puede progresar a insuficiencia respiratoria en horas."),
    ],
  },
  debrief: {
    diagnosis: "Síndrome de Guillain-Barré (forma desmielinizante) post-infeccioso, con compromiso respiratorio incipiente (CVF 22 ml/kg) y disautonomía.",
    pathologies: [
      { name: "Síndrome de Guillain-Barré", role: "principal", why: "Polirradiculoneuropatía inflamatoria aguda autoinmune." },
      { name: "Insuficiencia respiratoria neuromuscular", role: "asociada", why: "Principal causa de muerte; se anticipa midiendo la CVF." },
      { name: "Disautonomía", role: "asociada", why: "Arritmias y presión lábil." },
      { name: "Mielitis transversa y compresión medular", role: "diferencial", why: "Nivel sensitivo y esfínteres." },
      { name: "Miastenia gravis, botulismo, hipopotasemia", role: "diferencial", why: "Otras causas de debilidad aguda." },
    ],
    reasoning: [
      "Causa: una infección previa (Campylobacter jejuni, citomegalovirus, Epstein-Barr, Zika, influenza) desencadena una respuesta autoinmune.",
      "Mecanismo: mimetismo molecular. Los lipooligosacáridos de C. jejuni se parecen a los gangliósidos de los nervios (GM1, GD1a): los anticuerpos atacan la mielina o el axón de las raíces y los nervios periféricos.",
      "Consecuencia: la desmielinización segmentaria bloquea la conducción → debilidad flácida ascendente y arreflexia; la inflamación de las raíces sube las proteínas del LCR sin aumentar las células; el compromiso del sistema autónomo da arritmias y presión lábil; la debilidad del diafragma y los intercostales puede causar insuficiencia respiratoria.",
      "Por eso se interna con monitoreo de la función respiratoria y se trata con inmunoglobulina o plasmaféresis, que modulan la respuesta inmune.",
    ],
    epidemiology:
      "Es poco frecuente: alrededor de 1 a 2 casos cada 100.000 personas por año. Afecta a cualquier edad, con algo más de casos en varones y en personas mayores. Es la causa más común de parálisis flácida aguda desde la eliminación de la polio. En Argentina, toda parálisis flácida aguda en menores de 15 años se notifica, como parte de la vigilancia de poliomielitis.",
    management: [
      "Sospechar ante debilidad simétrica ascendente con arreflexia; confirmar con LCR y electromiograma (sin demorar el tratamiento).",
      "Internar con monitoreo de la CVF (regla 20/30/40), la deglución y la función autonómica; intubación electiva si se cumplen los criterios.",
      "Inmunoglobulina endovenosa por 5 días o plasmaféresis en pacientes que no caminan solos, idealmente en las primeras 2 semanas.",
      "No corticoides. Profilaxis de TVP, manejo del dolor y rehabilitación.",
    ],
    sources: [
      "European Academy of Neurology / Peripheral Nerve Society — Guía de diagnóstico y tratamiento del síndrome de Guillain-Barré.",
      "Ministerio de Salud de la Nación — Vigilancia de parálisis flácida aguda en menores de 15 años.",
    ],
    pearls: [
      "Debilidad ascendente + arreflexia + antecedente infeccioso = Guillain-Barré hasta demostrar lo contrario.",
      "Disociación albúmino-citológica: proteínas altas, células normales.",
      "Regla 20/30/40 para decidir la intubación.",
      "Los corticoides no sirven en el Guillain-Barré.",
    ],
    pitfalls: [
      "Esperar el LCR o el electromiograma para internar y tratar.",
      "No medir la capacidad vital.",
      "Dar el alta a un cuadro que progresa.",
    ],
  },
};
