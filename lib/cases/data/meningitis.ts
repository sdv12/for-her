import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const meningitis: ClinicalCase = {
  id: "meningitis-bacteriana-lactante",
  level: 3,
  area: "Infectología",
  setting: "Guardia",
  patient: { age: 10, ageUnit: "meses", sex: "F", context: "La traen los padres a la madrugada. Septiembre." },
  frequency: "poco-frecuente",
  intro: "“Desde ayer a la tarde tiene fiebre alta que no baja. Vomitó tres veces, está muy dormida y cuando la alzamos llora más.”",
  vitals: { TA: "80/45 mmHg", FC: "176 lpm", FR: "42 rpm", "T°": "39,6 °C", "SatO₂": "96 %", Peso: "9 kg" },
  anamnesis: [
    act("conciencia", "¿Cómo está de despierta? ¿Los reconoce?", "clave", "“Está muy dormida, cuesta despertarla. Cuando se despierta llora con un grito agudo.”", "La alteración de conciencia y el llanto paradójico (llora más al alzarla) son signos de irritación meníngea en lactantes."),
    act("convulsion", "¿Tuvo convulsiones?", "clave", "“Hace una hora se puso dura y movía los brazos, un minuto.”", "Una convulsión con fiebre en un lactante obliga a descartar infección del sistema nervioso."),
    act("vacunas", "¿Tiene las vacunas al día? ¿Recibió la del meningococo y la del neumococo?", "clave", "“Le faltan algunas; la de los seis meses no se la dimos.”", "Las vacunas contra Haemophilus, neumococo y meningococo del Calendario Nacional previenen la mayoría de las meningitis bacterianas."),
    act("manchas", "¿Le vieron manchas en la piel?", "clave", "“Hace un rato le aparecieron unos puntitos rojos en las piernas.”", "Petequias con fiebre: sospecha de meningococcemia, una emergencia."),
    act("alimentacion", "¿Está comiendo? ¿Moja los pañales?", "util", "“No quiere el pecho. Mojó dos pañales desde ayer.”", "Evalúa la hidratación y la perfusión."),
    act("contactos", "¿Va a una guardería o hay alguien enfermo en la casa?", "util", "“Va a una guardería desde agosto.”", "Importa para la quimioprofilaxis de contactos."),
    act("juguete", "¿Cuál es su juguete favorito?", "neutro", "“Un conejito.”", "No orienta."),
  ],
  exam: [
    act("fontanela", "Fontanela anterior", "clave", "Abombada y tensa, sin llanto.", "En el lactante, la fontanela abombada es el equivalente de la hipertensión endocraneana; la rigidez de nuca puede faltar antes del año."),
    act("piel", "Piel completa (desvestida)", "clave", "Petequias y algunas lesiones purpúricas en miembros inferiores y tronco, que no desaparecen a la presión.", "Púrpura que no blanquea con fiebre = meningococcemia hasta demostrar lo contrario."),
    act("perfusion", "Perfusión periférica", "clave", "Relleno capilar 4 s, extremidades frías, pulsos débiles.", "Signos de shock: prioridad de reanimación."),
    act("meningeos", "Signos meníngeos (rigidez de nuca, Kernig, Brudzinski)", "util", "Rigidez de nuca dudosa.", "En lactantes son poco sensibles; su ausencia no descarta meningitis."),
    act("oidos", "Otoscopía", "util", "Membranas normales.", "Busca otro foco (la otitis puede ser puerta de entrada del neumococo)."),
  ],
  studies: [
    study("Laboratorio", "lcr", "Punción lumbar con citoquímico, Gram y cultivo de LCR (cuando esté estable)", "clave", "LCR turbio: 2.400 células con 90 % de polimorfonucleares, proteínas 210 mg/dl, glucorraquia 18 mg/dl (glucemia 110). Gram: diplococos gramnegativos.", "Confirma la meningitis bacteriana y orienta el germen; no debe demorar el antibiótico y se difiere si hay inestabilidad o coagulopatía."),
    study("Microbiología", "hemocultivos", "Hemocultivos (antes del antibiótico, sin demorarlo)", "clave", "Neisseria meningitidis.", "Permiten identificar el germen aunque la punción se difiera."),
    study("Laboratorio", "lab", "Hemograma, PCR, glucemia, ionograma, coagulograma, gases y lactato", "clave", "Leucocitos 22.000, plaquetas 95.000, RIN 1,6, lactato 4,2, Na 131.", "Valoran sepsis, coagulación intravascular y alteraciones del sodio."),
    study("Imágenes", "tc", "Tomografía de cerebro antes de la punción", "innecesario", "No se realizó.", "En un lactante con fontanela abierta y sin foco neurológico no es necesaria y demora el manejo."),
    study("Imágenes", "rx", "Radiografía de tórax", "innecesario", "Normal.", "No aporta al manejo de este cuadro."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("meningo", "Meningitis bacteriana con sepsis meningocócica", true, "Fiebre, letargia, convulsión, fontanela abombada, púrpura, shock y LCR purulento con diplococos gramnegativos."),
      dx("viral", "Meningitis viral", false, "LCR claro con linfocitos, glucosa normal y paciente en buen estado; no da púrpura ni shock."),
      dx("febril", "Convulsión febril simple", false, "Es breve, generalizada, en un niño que se recupera rápido y sin signos meníngeos ni fontanela abombada."),
      dx("dengue", "Dengue grave", false, "Puede dar petequias y shock, pero no fontanela abombada ni LCR purulento."),
      dx("pti", "Púrpura trombocitopénica inmune", false, "Da petequias en un niño sano, sin fiebre ni compromiso general."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("ceftriaxona", "Ceftriaxona endovenosa (100 mg/kg/día) de inmediato, en los primeros minutos", "clave", "El antibiótico precoz es lo que más cambia la mortalidad: no se espera a la punción ni a la imagen."),
      mg("shock", "Reanimación del shock: oxígeno, bolos de cristaloides y derivación a terapia intensiva", "clave", "La meningococcemia progresa a shock refractario en horas."),
      mg("aislamiento", "Aislamiento respiratorio por gotas las primeras 24 h de antibiótico", "clave", "El meningococo se transmite por gotas."),
      mg("notificar", "Notificación inmediata al SNVS y quimioprofilaxis de contactos (rifampicina, ceftriaxona o ciprofloxacina según edad)", "clave", "Es un evento de notificación inmediata: los contactos cercanos tienen alto riesgo y reciben profilaxis en las primeras 24 h."),
      mg("dexa", "Dexametasona antes o junto con el antibiótico", "util", "Reduce secuelas auditivas en meningitis por Haemophilus y neumococo; con meningococo el beneficio es menor, pero se indica empíricamente antes de conocer el germen."),
      mg("esperar", "Esperar el resultado del cultivo para empezar el antibiótico", "riesgoso", "Cada hora de demora aumenta mortalidad y secuelas."),
      mg("pl-inestable", "Punción lumbar inmediata aunque esté en shock y con coagulopatía", "riesgoso", "Con inestabilidad hemodinámica o coagulopatía, la punción se difiere: primero estabilizar y dar antibiótico."),
    ],
  },
  debrief: {
    diagnosis: "Meningitis bacteriana con sepsis meningocócica (púrpura fulminante incipiente) en lactante de 10 meses con vacunas incompletas.",
    pathologies: [
      { name: "Meningitis bacteriana por Neisseria meningitidis", role: "principal", why: "LCR purulento con diplococos gramnegativos." },
      { name: "Sepsis y shock meningocócico", role: "asociada", why: "Púrpura, mala perfusión, hipotensión y lactato alto." },
      { name: "Coagulación intravascular diseminada", role: "asociada", why: "Plaquetas bajas y RIN prolongado." },
      { name: "Meningitis viral", role: "diferencial", why: "El LCR la distingue." },
      { name: "Convulsión febril", role: "diferencial", why: "Diagnóstico de exclusión: no se aplica con fontanela abombada." },
    ],
    reasoning: [
      "Causa: Neisseria meningitidis (también neumococo y, en no vacunados, Haemophilus influenzae b), que coloniza la nasofaringe y se transmite por gotas.",
      "Mecanismo: invade la mucosa, pasa a la sangre y atraviesa la barrera hematoencefálica. En el espacio subaracnoideo la lisis bacteriana libera endotoxina, que dispara una gran respuesta inflamatoria.",
      "Consecuencia: el exudado purulento y el edema cerebral elevan la presión intracraneana (fontanela abombada, vómitos, letargia, convulsiones). La endotoxina en la sangre daña el endotelio → petequias, púrpura, coagulación intravascular y shock.",
      "El LCR bacteriano: muchos neutrófilos, proteínas altas y glucosa baja, porque las bacterias y los neutrófilos la consumen y su transporte está alterado.",
    ],
    epidemiology:
      "La meningitis bacteriana es más frecuente en menores de un año, con un segundo pico en adolescentes (meningococo). En la Argentina predominan los serogrupos B y W del meningococo. La incidencia bajó mucho con las vacunas del Calendario Nacional (Haemophilus b, neumococo conjugada y meningococo ACYW a los 3, 5 y 15 meses y a los 11 años). Es levemente más frecuente en varones y aumenta a fines del invierno y en primavera.",
    management: [
      "Reconocer la sepsis y la púrpura con fiebre: antibiótico (ceftriaxona) en los primeros minutos, con hemocultivos previos sin demorarlo.",
      "Reanimar el shock (oxígeno, fluidos, inotrópicos) y derivar a terapia intensiva.",
      "Punción lumbar cuando el paciente esté estable y sin coagulopatía; TC solo si hay foco, papiledema o alteración grave de la conciencia.",
      "Dexametasona empírica en meningitis bacteriana del niño (antes o con la primera dosis de antibiótico).",
      "Notificación inmediata y quimioprofilaxis de contactos cercanos; completar el esquema de vacunas.",
    ],
    sources: [
      "Ministerio de Salud de la Nación — Guía para el equipo de salud: meningitis bacterianas y enfermedad meningocócica.",
      "Sociedad Argentina de Pediatría — Consenso sobre meningitis bacteriana en pediatría.",
      "Calendario Nacional de Vacunación (Ministerio de Salud de la Nación).",
    ],
    pearls: [
      "Fiebre + petequias que no blanquean = antibiótico ya.",
      "En menores de un año: fontanela abombada, irritabilidad, llanto paradójico; la rigidez de nuca puede faltar.",
      "LCR bacteriano: turbio, neutrófilos, proteínas altas, glucosa baja (< 40 % de la glucemia).",
    ],
    pitfalls: ["Esperar la punción o la tomografía para dar el antibiótico.", "Atribuir todo a una convulsión febril.", "Olvidar la quimioprofilaxis de los contactos."],
  },
};
