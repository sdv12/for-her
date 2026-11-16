import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const vasculitisAnca: ClinicalCase = {
  id: "vasculitis-anca",
  level: 4,
  area: "Reumatología",
  setting: "Internación",
  patient: { age: 58, ageUnit: "años", sex: "M", context: "Comerciante. Hace 3 meses tiene sinusitis que no mejora con antibióticos." },
  frequency: "raro",
  intro: "“Escupo sangre desde hace dos días y orino oscuro. Estoy agotado.”",
  vitals: { TA: "158/94 mmHg", FC: "100 lpm", FR: "24 rpm", "SatO₂": "91 %", "T°": "37,8 °C" },
  anamnesis: [
    act("nariz", "¿Cómo son los síntomas de la nariz?", "clave", "“Costras con sangre, secreción y la nariz tapada hace meses.”", "Compromiso de vía aérea superior: típico de granulomatosis con poliangeítis."),
    act("hemoptisis", "¿Cuánta sangre escupe?", "clave", "“Hilos con la tos, a veces una cucharadita.”", "Hemorragia alveolar o nódulos cavitados."),
    act("orina", "¿Cómo orina?", "clave", "“Oscura como coca, menos cantidad.”", "Glomerulonefritis."),
    act("general", "¿Bajó de peso, tuvo fiebre o dolores?", "clave", "“Siete kilos, fiebrecita y me duelen las articulaciones.”", "Síntomas sistémicos de vasculitis."),
    act("oido", "¿Oye bien?", "util", "“Del izquierdo me tapé.”", "Otitis media serosa: otra manifestación."),
    act("tbc", "¿Contacto con tuberculosis?", "util", "“No.”", "Diferencial de hemoptisis y nódulos."),
  ],
  exam: [
    act("nariz-ex", "Fosas nasales", "clave", "Costras hemáticas y perforación septal pequeña.", "Destrucción granulomatosa."),
    act("pulmon", "Auscultación", "clave", "Crepitantes bilaterales.", "Hemorragia o infiltrados."),
    act("piel", "Piel", "util", "Púrpura palpable en piernas.", "Vasculitis cutánea de pequeño vaso."),
    act("ojos", "Ojos", "util", "Epiescleritis derecha.", "Compromiso ocular."),
  ],
  studies: [
    study("Laboratorio", "renal", "Creatinina y orina completa con sedimento", "clave", "Creatinina 3,4 mg/dl (6 meses antes, 0,9); hematuria con cilindros hemáticos y proteinuria 1,8 g/día.", "Glomerulonefritis rápidamente progresiva."),
    study("Laboratorio", "anca", "ANCA (PR3 y MPO) y anti-MBG", "clave", "c-ANCA con anti-PR3 positivo; anti-MBG negativo.", "Orienta a granulomatosis con poliangeítis."),
    study("Imágenes", "tac", "TC de tórax", "clave", "Nódulos múltiples, algunos cavitados, y opacidades en vidrio esmerilado.", "Granulomas y hemorragia alveolar."),
    study("Otros", "biopsia-renal", "Biopsia renal", "clave", "Glomerulonefritis necrotizante con semilunas, pauciinmune.", "Confirma y da pronóstico."),
    study("Microbiología", "baar", "Baciloscopia de esputo", "util", "Negativa.", "Descarta tuberculosis antes de inmunosuprimir."),
    study("Otros", "esperar-biopsia", "Esperar la biopsia para iniciar tratamiento", "riesgoso", "No se esperó.", "Con ANCA positivo y GN rápidamente progresiva se trata ya."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("gpa", "Granulomatosis con poliangeítis (vasculitis ANCA PR3) con síndrome pulmón-riñón", true, "Vía aérea superior destructiva, nódulos cavitados, glomerulonefritis pauciinmune con semilunas y anti-PR3."),
      dx("goodpasture", "Enfermedad por anticuerpos anti-membrana basal", false, "Anti-MBG negativo y compromiso nasal."),
      dx("lupus", "Nefritis lúpica", false, "La biopsia es pauciinmune, sin depósitos."),
      dx("tbc", "Tuberculosis", false, "Baciloscopia negativa y glomerulonefritis."),
      dx("cancer", "Cáncer de pulmón con síndrome paraneoplásico", false, "Nódulos múltiples, nariz y ANCA."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("pulsos", "Pulsos de metilprednisolona", "clave", "Inducción urgente."),
      mg("rituximab", "Rituximab o ciclofosfamida", "clave", "Inducción de la remisión."),
      mg("plasmaferesis", "Considerar plasmaféresis con hemorragia alveolar grave o creatinina muy alta", "util", "Casos graves seleccionados."),
      mg("pcp", "Profilaxis de Pneumocystis con TMS", "clave", "Inmunosupresión intensa."),
      mg("dialisis", "Hemodiálisis si aparece indicación", "util", "Insuficiencia renal grave."),
      mg("atb-solo", "Seguir con antibióticos para la sinusitis", "riesgoso", "Pierde tiempo mientras se destruye el riñón."),
      mg("aines", "AINE para las artralgias", "riesgoso", "Nefrotóxicos en una falla renal aguda."),
    ],
  },
  debrief: {
    diagnosis: "Granulomatosis con poliangeítis (ANCA PR3) con glomerulonefritis rápidamente progresiva y hemorragia alveolar, en un hombre de 58 años.",
    pathologies: [
      { name: "Granulomatosis con poliangeítis", role: "principal", why: "Vasculitis necrotizante de pequeño vaso con granulomas." },
      { name: "Glomerulonefritis rápidamente progresiva", role: "asociada", why: "Semilunas pauciinmunes." },
      { name: "Síndrome de Goodpasture", role: "diferencial", why: "Otro síndrome pulmón-riñón." },
    ],
    reasoning: [
      "Causa: autoinmunidad contra la proteinasa 3 de los neutrófilos.",
      "Mecanismo: los ANCA activan neutrófilos que dañan el endotelio de pequeños vasos y forman granulomas.",
      "Consecuencia: destrucción de vía aérea, nódulos, hemorragia alveolar y glomerulonefritis que puede llevar a diálisis en semanas.",
    ],
    epidemiology:
      "Las vasculitis ANCA son raras, con una incidencia de 10 a 20 casos por millón por año, más frecuentes entre los 50 y 70 años. La granulomatosis con poliangeítis suele empezar con síntomas de vía aérea superior que se tratan durante meses como sinusitis.",
    management: [
      "Sospechar ante sinusitis refractaria con síntomas sistémicos.",
      "ANCA, orina y creatinina.",
      "Corticoides en pulsos más rituximab o ciclofosfamida.",
      "Profilaxis de infecciones.",
    ],
    sources: ["Sociedad Argentina de Reumatología — Vasculitis asociadas a ANCA.", "EULAR — Recommendations for the management of ANCA-associated vasculitis."],
    pearls: ["Sinusitis que no cura + orina oscura = pensar en vasculitis.", "Pulmón-riñón: ANCA y anti-MBG.", "Siempre sedimento urinario."],
    pitfalls: ["Seguir con antibióticos.", "Esperar la biopsia para tratar."],
    tribunal: [
      qa("¿Qué es un síndrome pulmón-riñón?", "La combinación de hemorragia alveolar y glomerulonefritis; sus causas principales son las vasculitis ANCA y la enfermedad anti-MBG."),
      qa("¿Qué ANCA se asocia a cada vasculitis?", "PR3 o c-ANCA a la granulomatosis con poliangeítis; MPO o p-ANCA a la poliangeítis microscópica y a la granulomatosis eosinofílica."),
      qa("¿Qué muestra la biopsia renal en una vasculitis ANCA?", "Glomerulonefritis necrotizante con semilunas y escasos o nulos depósitos inmunes: pauciinmune."),
    ],
  },
};
