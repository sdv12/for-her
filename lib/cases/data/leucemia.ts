import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const leucemia: ClinicalCase = {
  id: "leucemia-linfoblastica-aguda",
  level: 3,
  area: "Oncología",
  setting: "Consultorio",
  patient: { age: 4, ageUnit: "años", sex: "M", context: "Sano hasta ahora. Vacunas completas." },
  frequency: "poco-frecuente",
  intro: "“Hace tres semanas está pálido, cansado, tuvo fiebre varias veces y le salen moretones sin golpearse. No quiere caminar porque le duelen las piernas.” (relata la madre)",
  vitals: { FC: "128 lpm", FR: "24 rpm", "T°": "38,1 °C", "SatO₂": "98 %", Peso: "16 kg" },
  anamnesis: [
    act("dolor-oseo", "¿Dónde le duele? ¿Lo despierta a la noche?", "clave", "“Las piernas, y a veces se despierta llorando.”", "Dolor óseo por infiltración de la médula: puede confundirse con dolores de crecimiento o artritis."),
    act("sangrado", "¿Le sangra la nariz o las encías? ¿Moretones?", "clave", "“Le sangró la nariz dos veces y tiene moretones en las piernas.”", "Plaquetopenia."),
    act("fiebre", "¿Cuánto tiempo hace que tiene fiebre?", "clave", "“Va y viene hace tres semanas.”", "Fiebre prolongada: infecciones por neutropenia o la propia enfermedad."),
    act("peso", "¿Comió bien? ¿Bajó de peso? ¿Suda de noche?", "util", "“Come poco.”", "Síntomas generales."),
    act("tos", "¿Tiene tos o le cuesta respirar acostado?", "clave", "“No.”", "Descarta masa mediastinal que comprima la vía aérea."),
    act("antecedentes", "¿Tiene alguna enfermedad genética o síndrome de Down?", "util", "“No.”", "El síndrome de Down aumenta mucho el riesgo de leucemia."),
    act("juguete", "¿Cuál es su juguete favorito?", "neutro", "“Un camión de bomberos.”", "No orienta."),
  ],
  exam: [
    act("piel", "Piel y mucosas", "clave", "Palidez intensa, petequias en piernas y equimosis.", "Anemia y plaquetopenia."),
    act("organomegalias", "Abdomen: hígado y bazo", "clave", "Hepatomegalia de 4 cm y esplenomegalia de 3 cm.", "Infiltración."),
    act("ganglios", "Ganglios", "clave", "Adenopatías cervicales y axilares, indoloras.", "Linfadenopatías generalizadas."),
    act("testiculos", "Testículos", "util", "Normales.", "Pueden infiltrarse en la LLA."),
  ],
  studies: [
    study("Laboratorio", "hemograma", "Hemograma con frotis de sangre periférica", "clave", "Hb 6,2, plaquetas 18.000, leucocitos 42.000 con 70 % de blastos.", "Bicitopenia con blastos en sangre: leucemia aguda."),
    study("Otros", "medula", "Punción aspiración de médula ósea con citometría de flujo", "clave", "Más del 20 % de linfoblastos B (CD19, CD10).", "Confirma y clasifica la leucemia."),
    study("Laboratorio", "lisis", "Ácido úrico, potasio, fósforo, calcio, LDH y creatinina", "clave", "Ácido úrico 9, LDH 1800, potasio 4,8.", "Riesgo de síndrome de lisis tumoral."),
    study("Imágenes", "rx", "Radiografía de tórax", "clave", "Sin masa mediastinal.", "Una masa mediastinal contraindica la sedación sin precauciones."),
    study("Laboratorio", "corticoide-previo", "Indicar corticoides antes del diagnóstico por la sospecha de artritis", "riesgoso", "No se realizó.", "Pueden enmascarar la leucemia y dificultar su clasificación."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("lla", "Leucemia linfoblástica aguda de precursores B", true, "Palidez, fiebre, sangrados, dolor óseo, hepatoesplenomegalia y adenopatías con bicitopenia y blastos, y linfoblastos B en la médula."),
      dx("pti", "Púrpura trombocitopénica inmune", false, "Afecta solo las plaquetas, sin anemia, organomegalias ni blastos."),
      dx("mono", "Mononucleosis", false, "Da linfocitos atípicos, no blastos ni plaquetopenia tan grave."),
      dx("aij", "Artritis idiopática juvenil", false, "No explica las citopenias ni los blastos."),
      dx("lma", "Leucemia mieloide aguda", false, "La citometría muestra linfoblastos B."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("derivar", "Derivación urgente a un centro de oncohematología pediátrica", "clave", "El tratamiento en centros especializados con protocolos cooperativos logra curaciones cercanas al 80–90 %."),
      mg("hidratacion", "Hidratación abundante y alopurinol o rasburicasa", "clave", "Previene el síndrome de lisis tumoral."),
      mg("fiebre", "Ante fiebre con neutropenia, cultivos y antibiótico empírico de inmediato", "clave", "Las infecciones son la principal causa de muerte temprana."),
      mg("transfusion", "Transfusión de glóbulos rojos y plaquetas irradiados según necesidad", "util", "Sostén mientras se inicia la quimioterapia."),
      mg("aspirina", "Ibuprofeno o aspirina para el dolor", "riesgoso", "Aumentan el riesgo de sangrado con plaquetas bajas."),
      mg("vacunas-vivas", "Completar vacunas a virus vivos antes de empezar", "riesgoso", "Contraindicadas en la inmunosupresión."),
    ],
  },
  debrief: {
    diagnosis: "Leucemia linfoblástica aguda de precursores B en niño de 4 años, con anemia, plaquetopenia, hepatoesplenomegalia y riesgo de lisis tumoral.",
    pathologies: [
      { name: "Leucemia linfoblástica aguda B", role: "principal", why: "Proliferación clonal de linfoblastos en la médula." },
      { name: "Síndrome de lisis tumoral", role: "asociada", why: "Riesgo por la alta carga tumoral." },
      { name: "PTI, mononucleosis, artritis idiopática juvenil", role: "diferencial", why: "Otras causas de citopenias o dolor articular." },
    ],
    reasoning: [
      "Causa: alteraciones genéticas adquiridas en un precursor linfoide (a veces con predisposición, como el síndrome de Down).",
      "Mecanismo: los blastos proliferan sin madurar, desplazan a las células normales de la médula e infiltran órganos.",
      "Consecuencia: anemia (palidez, cansancio), plaquetopenia (sangrados), neutropenia (infecciones y fiebre), dolor óseo y organomegalias.",
    ],
    epidemiology:
      "La leucemia es el cáncer más frecuente en la infancia, alrededor de un tercio de los casos, y la LLA representa el 75–80 % de las leucemias pediátricas, con pico entre los 2 y 5 años y algo más en varones. En Argentina, el Registro Oncopediátrico Hospitalario muestra supervivencias en aumento con protocolos cooperativos.",
    management: [
      "Sospecharla ante palidez, fiebre, sangrados, dolor óseo y organomegalias: hemograma con frotis.",
      "Derivación urgente; médula ósea con citometría y estudios genéticos.",
      "Prevención de lisis tumoral, manejo de infecciones y soporte transfusional.",
      "Quimioterapia según protocolo y riesgo, con seguimiento a largo plazo.",
    ],
    sources: ["Ministerio de Salud de la Nación — Instituto Nacional del Cáncer: Diagnóstico temprano del cáncer infantil.", "Registro Oncopediátrico Hospitalario Argentino (ROHA)."],
    pearls: ["Palidez + petequias + dolor óseo + organomegalias = hemograma ya.", "No dar corticoides antes del diagnóstico.", "Fiebre en neutropénico = emergencia."],
    pitfalls: ["Atribuir el dolor a “dolores de crecimiento”.", "Dar AINE con plaquetas bajas."],
    tribunal: [
      qa("¿Qué es el síndrome de lisis tumoral?", "La liberación masiva del contenido de las células tumorales al destruirse, con hiperuricemia, hiperpotasemia, hiperfosfatemia e hipocalcemia, que puede causar insuficiencia renal, arritmias y convulsiones; se previene con hidratación, alopurinol o rasburicasa y control de electrolitos."),
      qa("¿Cuáles son los signos de alarma de cáncer infantil?", "Palidez, fiebre prolongada sin causa, sangrados o moretones, dolor óseo persistente que despierta de noche, adenopatías duras o crecientes, masas abdominales, leucocoria (pupila blanca), cefalea con vómitos matinales y pérdida de peso."),
      qa("¿Qué diferencia los dolores de crecimiento del dolor óseo de la leucemia?", "Los de crecimiento son bilaterales, en músculos de las piernas, vespertinos, sin limitación funcional ni otros signos, con examen y hemograma normales; el de la leucemia es óseo, persistente, a veces unilateral, limita la marcha y se asocia a palidez, fiebre o sangrados."),
    ],
  },
};
