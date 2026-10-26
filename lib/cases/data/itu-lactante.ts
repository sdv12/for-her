import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const ituLactante: ClinicalCase = {
  id: "infeccion-urinaria-febril-lactante",
  level: 2,
  area: "Pediatría",
  setting: "Guardia",
  patient: { age: 9, ageUnit: "meses", sex: "F", context: "La traen los papás." },
  frequency: "frecuente",
  intro: "“Tiene fiebre de 39,5 desde hace dos días y no le encontramos nada. No tiene mocos ni tos. Está más irritable y come menos.”",
  vitals: { FC: "150 lpm", FR: "32 rpm", "T°": "39,4 °C", "SatO₂": "98 %", Peso: "8,6 kg" },
  anamnesis: [
    act("foco", "¿Tiene tos, mocos, diarrea, vómitos o manchas en la piel?", "clave", "“Nada de eso. Vomitó una vez.”", "Fiebre sin foco en una lactante: la infección urinaria es la infección bacteriana grave más frecuente."),
    act("orina", "¿Notaron olor fuerte en la orina o llanto al orinar?", "util", "“El pañal tiene olor fuerte.”", "Dato orientador, poco específico en lactantes."),
    act("previas", "¿Tuvo infecciones urinarias antes? ¿Ecografías del embarazo con riñones dilatados?", "clave", "“No, todo normal.”", "Antecedentes de ITU o malformaciones aumentan el riesgo de cicatrices y cambian el estudio."),
    act("vacunas", "¿Tiene las vacunas al día?", "util", "“Sí.”", "Hace menos probable la bacteriemia por neumococo o Haemophilus."),
    act("hidratacion", "¿Toma líquidos? ¿Moja pañales?", "clave", "“Toma el pecho, menos que antes. Moja pañales.”", "Define si puede recibir tratamiento oral en casa."),
    act("juguete", "¿Tiene hermanos?", "neutro", "“Uno de 4 años.”", "No orienta."),
  ],
  exam: [
    act("general", "Estado general y perfusión", "clave", "Irritable pero consolable, buena perfusión, hidratada.", "Sin aspecto tóxico: puede considerarse tratamiento oral."),
    act("completo", "Examen completo buscando foco (oídos, fauces, pulmones, piel, meninges)", "clave", "Sin foco: otoscopía y fauces normales, pulmones limpios, sin petequias ni signos meníngeos.", "Fiebre sin foco: obliga a estudiar la orina."),
    act("genitales", "Genitales", "util", "Sin sinequias ni lesiones.", "Las sinequias vulvares predisponen a ITU."),
    act("abdomen", "Abdomen y fosas lumbares", "util", "Blando, sin masas.", "Una masa podría ser un riñón dilatado."),
  ],
  studies: [
    study("Laboratorio", "orina-sonda", "Orina por sondaje vesical (o punción suprapúbica): tira y sedimento", "clave", "Leucocitos ++, nitritos positivos; sedimento: 40 leucocitos por campo, bacterias abundantes.", "En quien no controla esfínteres, la muestra para cultivo se toma por sonda o punción: la bolsa recolectora se contamina mucho."),
    study("Microbiología", "urocultivo", "Urocultivo con antibiograma (de la muestra por sonda)", "clave", "E. coli > 50.000 UFC/ml, sensible a cefalexina.", "Confirma el diagnóstico y guía el tratamiento."),
    study("Laboratorio", "bolsa", "Urocultivo por bolsa recolectora", "innecesario", "Flora mixta.", "Una bolsa positiva no confirma nada (falsos positivos hasta el 80 %); solo sirve si es negativa."),
    study("Imágenes", "eco", "Ecografía renal y vesical", "util", "Riñones normales, sin dilatación.", "Se indica en el primer episodio febril para descartar malformaciones."),
    study("Imágenes", "cugm", "Cistouretrografía miccional de entrada", "innecesario", "No se realizó.", "No se hace en el primer episodio con ecografía normal; se reserva para ITU recurrentes o ecografía alterada."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("pna", "Infección urinaria febril (pielonefritis aguda probable) en lactante", true, "Fiebre sin foco, orina por sonda con leucocituria y nitritos, urocultivo con E. coli."),
      dx("viral", "Síndrome febril viral", false, "No explica la orina patológica ni el urocultivo."),
      dx("oma", "Otitis media aguda", false, "La otoscopía es normal."),
      dx("meningitis", "Meningitis", false, "Buen estado, sin signos meníngeos ni fontanela abombada."),
      dx("cistitis", "Cistitis", false, "En lactantes con fiebre se asume compromiso renal (pielonefritis)."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("oral", "Cefalexina oral (o según antibiograma) por 7–10 días, en domicilio", "clave", "En lactantes mayores de 3 meses, en buen estado y que toleran vía oral, el tratamiento oral es tan eficaz como el endovenoso."),
      mg("control", "Control en 48 h y pautas de alarma (no toma, vómitos, decaimiento, fiebre persistente)", "clave", "La fiebre debería ceder en 48–72 h; si no, reevaluar."),
      mg("eco", "Ecografía renal y vesical", "clave", "Detecta malformaciones en el primer episodio febril."),
      mg("hidratacion", "Lactancia y líquidos frecuentes", "util", "Mantiene la hidratación."),
      mg("sin-orina", "Antitérmicos y control en 72 h sin estudiar la orina", "riesgoso", "Una ITU febril no tratada puede dejar cicatrices renales o complicarse con sepsis."),
      mg("profilaxis", "Profilaxis antibiótica continua de rutina", "innecesario", "No se indica de rutina tras un primer episodio con ecografía normal."),
    ],
  },
  debrief: {
    diagnosis: "Infección urinaria febril (pielonefritis aguda probable) por E. coli en lactante de 9 meses, en buen estado, para tratamiento oral.",
    pathologies: [
      { name: "Pielonefritis aguda", role: "principal", why: "Fiebre con urocultivo positivo en una lactante." },
      { name: "Malformación de la vía urinaria (reflujo vesicoureteral)", role: "diferencial", why: "Se busca con la ecografía." },
      { name: "Síndrome febril viral", role: "diferencial", why: "La causa más frecuente de fiebre, pero sin orina patológica." },
      { name: "Meningitis y bacteriemia", role: "diferencial", why: "Infecciones graves a descartar en fiebre sin foco." },
    ],
    reasoning: [
      "Causa: E. coli de la flora intestinal (80–90 %), que asciende por la uretra.",
      "Mecanismo: en lactantes la infección asciende fácilmente al riñón; si hay reflujo vesicoureteral, llega más rápido.",
      "Consecuencia: fiebre sin foco, irritabilidad, rechazo del alimento y vómitos; los síntomas urinarios no se pueden expresar. La inflamación del parénquima puede dejar cicatrices renales.",
      "Por eso ante fiebre sin foco en un lactante se estudia la orina con una muestra confiable.",
    ],
    epidemiology:
      "La infección urinaria es la infección bacteriana grave más frecuente en lactantes con fiebre sin foco (5–7 %). En el primer año es algo más frecuente en varones (sobre todo los primeros meses y no circuncidados); después del año predomina mucho en niñas. Hasta un tercio tiene reflujo vesicoureteral.",
    management: [
      "Fiebre sin foco: tira y urocultivo con muestra por sonda o punción en quien no controla esfínteres.",
      "Mayores de 3 meses en buen estado: antibiótico oral (cefalosporina de primera generación o según sensibilidad local) 7–10 días.",
      "Menores de 3 meses, mal estado o intolerancia oral: internación y tratamiento endovenoso.",
      "Ecografía renal y vesical tras el primer episodio febril; cistouretrografía si es recurrente o la ecografía es anormal.",
      "Seguimiento y pautas de alarma.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Consenso de infección urinaria en pediatría (actualización)."],
    pearls: ["Fiebre sin foco en lactante: estudiar la orina.", "Bolsa recolectora: solo vale si es negativa.", "Buen estado y tolera VO: tratamiento oral."],
    pitfalls: ["Diagnosticar por bolsa.", "No estudiar la orina en fiebre sin foco.", "Profilaxis de rutina."],
  },
};
