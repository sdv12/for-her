import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const meningococcemia: ClinicalCase = {
  id: "meningococcemia-fulminante",
  level: 4,
  area: "Pediatría",
  setting: "Guardia",
  patient: { age: 15, ageUnit: "años", sex: "F", context: "Viajó de egresados hace una semana. No recibió la vacuna antimeningocócica de los 11 años." },
  frequency: "raro",
  intro: "“Hace ocho horas empezó con fiebre muy alta y dolor en las piernas. Ahora le salieron manchas violetas y está muy decaída.” (relata la madre)",
  vitals: { TA: "84/40 mmHg", FC: "148 lpm", FR: "30 rpm", "T°": "39,8 °C", "SatO₂": "94 %", Glasgow: "14/15" },
  anamnesis: [
    act("manchas", "¿Cuándo aparecieron las manchas y cómo cambiaron?", "clave", "“Hace una hora unos puntitos, ahora son manchas grandes violetas.”", "Exantema petequial que progresa en horas a púrpura: meningococcemia."),
    act("vacuna", "¿Recibió la vacuna contra el meningococo?", "clave", "“No, le faltó la de los 11.”", "El Calendario incluye la vacuna cuadrivalente a los 11 años."),
    act("piernas", "¿Le duelen las piernas, tiene las manos frías?", "clave", "“Le duelen mucho las piernas y tiene las manos heladas.”", "Dolor en piernas, manos frías y color anormal: signos tempranos de sepsis meningocócica."),
    act("contactos", "¿Con quién convivió o compartió en la última semana?", "clave", "“Con la familia y los compañeros del viaje.”", "Identifica contactos para la quimioprofilaxis."),
    act("cefalea", "¿Le duele la cabeza o el cuello?", "util", "“Un poco la cabeza.”", "Puede asociarse meningitis."),
    act("alergia", "¿Es alérgica a algún antibiótico?", "util", "“No.”", "Necesario antes del antibiótico."),
    act("viaje", "¿A dónde viajaron?", "neutro", "“A Bariloche.”", "No orienta."),
  ],
  exam: [
    act("piel", "Piel", "clave", "Petequias y púrpura extensa en piernas y tronco que no desaparecen a la presión (prueba del vaso).", "Púrpura fulminante: emergencia."),
    act("perfusion", "Perfusión", "clave", "Relleno capilar 5 s, extremidades frías, moteadas.", "Shock."),
    act("meningeo", "Signos meníngeos", "util", "Rigidez de nuca leve.", "Posible meningitis asociada."),
    act("conciencia", "Estado de conciencia", "util", "Somnolienta, orientada.", "Deterioro incipiente."),
  ],
  studies: [
    study("Microbiología", "hemocultivo", "Hemocultivos (sin retrasar el antibiótico)", "clave", "Diplococos gram negativos; Neisseria meningitidis serogrupo W.", "Confirma; el serogrupo W circuló en Argentina."),
    study("Laboratorio", "lab", "Hemograma, coagulograma, lactato, gases, glucemia, ionograma", "clave", "Plaquetas 42.000, RIN 2,1, fibrinógeno 90, lactato 6.", "Coagulación intravascular diseminada y shock."),
    study("Microbiología", "pcr", "PCR para meningococo en sangre", "util", "Positiva.", "Útil si se dio antibiótico antes del cultivo."),
    study("Otros", "puncion", "Punción lumbar inmediata", "riesgoso", "No se realizó.", "Contraindicada con shock y coagulopatía; se difiere."),
    study("Imágenes", "tc", "Tomografía de cerebro antes del antibiótico", "riesgoso", "No se realizó.", "El antibiótico no se demora por ningún estudio."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("meningococcemia", "Meningococcemia fulminante (púrpura fulminante) con shock séptico y coagulación intravascular diseminada", true, "Fiebre alta de pocas horas, púrpura que progresa rápidamente, shock y CID, con diplococos gram negativos, en adolescente no vacunada."),
      dx("pti", "Púrpura trombocitopénica inmune", false, "No da fiebre, shock ni coagulopatía."),
      dx("dengue", "Dengue grave", false, "Las petequias del dengue no progresan así en horas y hay diplococos en el hemocultivo."),
      dx("vasculitis", "Púrpura de Schönlein-Henoch", false, "Púrpura palpable con plaquetas normales, sin shock."),
      dx("meningitis-sola", "Meningitis bacteriana sin sepsis", false, "Hay shock y púrpura: predomina la sepsis."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("atb", "Ceftriaxona EV de inmediato (o en el primer contacto, incluso IM si no hay vía)", "clave", "Cada minuto cuenta: la mortalidad depende del tiempo al antibiótico."),
      mg("reanimacion", "Reanimación con fluidos en bolos, inotrópicos o vasopresores y traslado a terapia intensiva pediátrica", "clave", "Shock séptico."),
      mg("aislamiento", "Aislamiento respiratorio por gotas las primeras 24 h de antibiótico", "clave", "Previene la transmisión al equipo de salud."),
      mg("contactos", "Notificación inmediata y quimioprofilaxis a los contactos cercanos (rifampicina, ciprofloxacina o ceftriaxona) en 24 h", "clave", "Previene casos secundarios."),
      mg("plasma", "Corregir la coagulopatía con plasma y plaquetas si sangra", "util", "Manejo de la CID."),
      mg("esperar-pl", "Esperar la punción lumbar para empezar el antibiótico", "riesgoso", "Retrasar el antibiótico aumenta la mortalidad."),
    ],
  },
  debrief: {
    diagnosis: "Meningococcemia fulminante por Neisseria meningitidis serogrupo W, con shock séptico y coagulación intravascular diseminada, en adolescente de 15 años no vacunada.",
    pathologies: [
      { name: "Meningococcemia (púrpura fulminante)", role: "principal", why: "Sepsis por meningococo con púrpura y CID." },
      { name: "Shock séptico y CID", role: "asociada", why: "Complicaciones de la endotoxina." },
      { name: "PTI, dengue, Schönlein-Henoch", role: "diferencial", why: "Otras causas de púrpura." },
    ],
    reasoning: [
      "Causa: Neisseria meningitidis colonizando la nasofaringe, que invade la sangre en una persona sin inmunidad.",
      "Mecanismo: la endotoxina activa masivamente la inflamación y la coagulación: daño endotelial, trombosis de pequeños vasos y consumo de factores.",
      "Consecuencia: púrpura que progresa a necrosis, shock, CID, falla multiorgánica, amputaciones y muerte en horas.",
    ],
    epidemiology:
      "La enfermedad meningocócica es poco frecuente pero muy grave, con mortalidad del 10 al 15 % (mayor en la forma fulminante). Tiene dos picos: menores de 1 año y adolescentes. En Argentina circularon los serogrupos B y W; desde 2017 el Calendario incluye la vacuna cuadrivalente (ACYW) en lactantes y a los 11 años.",
    management: [
      "Sospecharla ante fiebre con petequias o púrpura: antibiótico inmediato.",
      "Reanimación del shock y terapia intensiva.",
      "Aislamiento por gotas, notificación y quimioprofilaxis de contactos.",
      "Vacunación según el Calendario Nacional.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de enfermedad meningocócica: vigilancia y control.", "Calendario Nacional de Vacunación (vacuna antimeningocócica cuadrivalente)."],
    pearls: ["Fiebre + petequias = antibiótico ya.", "Prueba del vaso: no blanquea.", "Quimioprofilaxis a los contactos en 24 h."],
    pitfalls: ["Esperar la punción o la tomografía.", "No dar profilaxis a los contactos."],
    tribunal: [
      qa("¿A quiénes se da quimioprofilaxis en la enfermedad meningocócica?", "A los contactos cercanos en los 7 días previos: convivientes, quienes compartieron dormitorio, contactos de jardines y guarderías, y el personal de salud expuesto a secreciones sin protección (intubación, aspiración). Se usa rifampicina, ciprofloxacina o ceftriaxona en dosis única según la edad."),
      qa("¿Qué vacunas antimeningocócicas hay en el Calendario Nacional?", "La cuadrivalente conjugada (A, C, Y, W) a los 3, 5 y 15 meses y una dosis a los 11 años; la vacuna contra el serogrupo B se indica en grupos de riesgo."),
      qa("¿Qué es el síndrome de Waterhouse-Friderichsen?", "La hemorragia suprarrenal bilateral en la sepsis fulminante, clásicamente meningocócica, con insuficiencia suprarrenal aguda y shock refractario."),
    ],
  },
};
