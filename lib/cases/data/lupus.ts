import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const lupus: ClinicalCase = {
  id: "lupus-eritematoso-sistemico",
  level: 3,
  area: "Reumatología",
  setting: "Consultorio",
  patient: { age: 24, ageUnit: "años", sex: "F", context: "Estudiante. Sin enfermedades previas." },
  frequency: "poco-frecuente",
  intro: "“Hace dos meses me duelen las articulaciones de las manos, me salieron manchas en la cara con el sol y estoy muy cansada. Ahora se me hinchan los tobillos.”",
  vitals: { TA: "148/94 mmHg", FC: "88 lpm", "T°": "37,8 °C", Peso: "56 kg" },
  anamnesis: [
    act("articulaciones", "¿Qué articulaciones te duelen? ¿Se hinchan? ¿Hay rigidez a la mañana?", "clave", "“Las manos y las muñecas, de los dos lados, a veces hinchadas.”", "Artritis simétrica no erosiva: muy frecuente en el lupus."),
    act("sol", "¿Las manchas aparecen con el sol?", "clave", "“Sí, en la cara, las mejillas y la nariz.”", "Fotosensibilidad y eritema malar."),
    act("orina", "¿Notaste la orina con espuma o con sangre?", "clave", "“Con espuma.”", "Proteinuria: sospechar nefritis lúpica."),
    act("boca", "¿Tuviste aftas en la boca, caída de pelo o dolor en el pecho al respirar?", "clave", "“Aftas que no duelen y se me cae el pelo.”", "Úlceras orales indoloras y alopecia: criterios clínicos."),
    act("embarazo", "¿Usás algún método anticonceptivo? ¿Querés embarazarte?", "util", "“Tomo pastillas.”", "El lupus activo y los estrógenos aumentan el riesgo de trombosis; el embarazo requiere planificación."),
    act("farmacos", "¿Tomás algún medicamento nuevo?", "util", "“No.”", "Descarta lupus inducido por fármacos."),
    act("deporte", "¿Hacés deporte?", "neutro", "“Pilates.”", "No orienta."),
  ],
  exam: [
    act("piel", "Piel y mucosas", "clave", "Eritema en alas de mariposa que respeta los surcos nasogenianos; úlceras en el paladar.", "Lesiones típicas del lupus."),
    act("articular", "Examen articular", "clave", "Sinovitis en metacarpofalángicas e interfalángicas proximales bilaterales.", "Artritis."),
    act("edemas", "Edemas y auscultación", "clave", "Edema en ambos tobillos; frote pericárdico leve.", "Compromiso renal y serositis."),
    act("ganglios", "Ganglios", "util", "Adenopatías cervicales pequeñas.", "Frecuentes en la enfermedad activa."),
  ],
  studies: [
    study("Laboratorio", "fan", "Anticuerpos antinucleares (FAN)", "clave", "Positivo 1/1280, patrón homogéneo.", "Muy sensible: un FAN negativo prácticamente descarta lupus."),
    study("Laboratorio", "anti-dna", "Anti-ADN doble cadena, anti-Sm y complemento (C3, C4)", "clave", "Anti-ADN positivo, anti-Sm positivo, C3 y C4 bajos.", "Muy específicos; el anti-ADN y el complemento bajo se asocian a actividad renal."),
    study("Laboratorio", "orina", "Orina completa, proteinuria de 24 h, creatinina", "clave", "Proteinuria 2,1 g/24 h, hematíes dismórficos y cilindros hemáticos, creatinina 1,1.", "Nefritis lúpica activa."),
    study("Laboratorio", "hemograma", "Hemograma y Coombs directa", "util", "Leucopenia 3200, linfopenia, plaquetas 120.000.", "Citopenias de causa inmune."),
    study("Laboratorio", "aaf", "Anticuerpos antifosfolípidos", "util", "Negativos.", "Riesgo de trombosis y de complicaciones obstétricas."),
    study("Laboratorio", "fr-solo", "Solo factor reumatoideo y dar el alta como artritis reumatoidea", "innecesario", "No se realizó.", "El cuadro es multisistémico; el factor reumatoideo no define."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("les", "Lupus eritematoso sistémico con nefritis lúpica, artritis, serositis y compromiso cutáneo y hematológico", true, "Mujer joven con eritema malar, fotosensibilidad, úlceras orales, artritis, pericarditis, proteinuria con sedimento activo, citopenias, FAN, anti-ADN y anti-Sm positivos y complemento bajo."),
      dx("ar", "Artritis reumatoidea", false, "No explica la afectación renal, cutánea ni los anticuerpos específicos."),
      dx("rosacea", "Rosácea", false, "No da artritis ni nefritis."),
      dx("gn-post", "Glomerulonefritis posestreptocócica", false, "No hubo infección previa y hay anticuerpos de lupus."),
      dx("parvovirus", "Infección por parvovirus B19", false, "Puede dar artritis y FAN transitorio, pero no anti-Sm ni nefritis."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("hidroxicloroquina", "Hidroxicloroquina para todos los pacientes con lupus, con control oftalmológico", "clave", "Reduce brotes, daño y mortalidad."),
      mg("nefritis", "Derivación a reumatología y nefrología, biopsia renal y tratamiento de inducción (corticoides con micofenolato o ciclofosfamida)", "clave", "La nefritis lúpica define el pronóstico."),
      mg("proteccion", "Fotoprotección, control de la presión (IECA) y cambiar a un anticonceptivo sin estrógenos", "clave", "Medidas generales; el IECA reduce la proteinuria."),
      mg("vacunas", "Vacunación (antigripal, neumococo) antes de inmunosuprimir", "util", "Previene infecciones."),
      mg("aine-solo", "Solo AINE para las articulaciones", "riesgoso", "No trata la enfermedad y pueden empeorar la función renal."),
      mg("embarazo", "Recomendar buscar un embarazo ahora", "riesgoso", "El embarazo debe planearse con la enfermedad inactiva al menos 6 meses."),
    ],
  },
  debrief: {
    diagnosis: "Lupus eritematoso sistémico de reciente diagnóstico con nefritis lúpica activa, artritis, pericarditis, eritema malar, úlceras orales y citopenias, en mujer de 24 años.",
    pathologies: [
      { name: "Lupus eritematoso sistémico", role: "principal", why: "Enfermedad autoinmune multisistémica con criterios clínicos e inmunológicos." },
      { name: "Nefritis lúpica", role: "asociada", why: "Proteinuria con sedimento activo." },
      { name: "Artritis reumatoidea, parvovirus, glomerulonefritis", role: "diferencial", why: "Otras causas de artritis y compromiso renal." },
    ],
    reasoning: [
      "Causa: predisposición genética, hormonal (estrógenos) y ambiental (luz ultravioleta, infecciones).",
      "Mecanismo: pérdida de la tolerancia a antígenos nucleares, con autoanticuerpos e inmunocomplejos que se depositan en tejidos y activan el complemento.",
      "Consecuencia: inflamación de piel, articulaciones, serosas, riñón, sangre y sistema nervioso, con brotes y remisiones.",
    ],
    epidemiology:
      "El lupus es nueve veces más frecuente en mujeres, sobre todo en edad fértil (15 a 45 años), y más frecuente y grave en personas de ascendencia afroamericana, latinoamericana y asiática. La nefritis afecta a hasta la mitad de los pacientes y es una de las principales causas de morbimortalidad.",
    management: [
      "Sospecha clínica y FAN; confirmar con anticuerpos específicos y complemento.",
      "Evaluar compromiso de órganos, en especial renal (orina y proteinuria en cada control).",
      "Hidroxicloroquina para todos; corticoides e inmunosupresores según los órganos afectados.",
      "Fotoprotección, control cardiovascular, vacunas y planificación del embarazo.",
    ],
    sources: ["Sociedad Argentina de Reumatología — Guías de práctica clínica de lupus eritematoso sistémico.", "Criterios EULAR/ACR 2019 de clasificación del lupus."],
    pearls: ["Mujer joven + artritis + eritema malar + proteinuria = lupus.", "FAN negativo casi descarta.", "Hidroxicloroquina a todos."],
    pitfalls: ["No pedir orina.", "Dar estrógenos con lupus activo."],
    tribunal: [
      qa("¿Qué anticuerpos se piden en el lupus y qué indican?", "FAN (muy sensible, poco específico), anti-ADN doble cadena (específico, se asocia a nefritis y actividad), anti-Sm (muy específico), anti-Ro y anti-La (lupus neonatal y bloqueo cardíaco congénito), antihistonas (lupus por fármacos) y antifosfolípidos (trombosis y pérdidas de embarazo)."),
      qa("¿Qué fármacos pueden producir lupus inducido?", "Hidralazina, procainamida, isoniacida, minociclina, metildopa y anti-TNF; suele dar artritis, serositis y anticuerpos antihistonas, sin compromiso renal ni neurológico, y mejora al suspender el fármaco."),
      qa("¿Qué es el síndrome antifosfolípido?", "Trombosis arteriales o venosas y complicaciones obstétricas (abortos recurrentes, muerte fetal, preeclampsia grave) con anticuerpos antifosfolípidos persistentes (anticoagulante lúpico, anticardiolipinas, anti-β2 glicoproteína I); puede ser primario o asociado al lupus."),
    ],
  },
};
