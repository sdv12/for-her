import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const sindromeLisisTumoral: ClinicalCase = {
  id: "sindrome-lisis-tumoral",
  level: 4,
  area: "Oncología",
  setting: "Internación",
  patient: { age: 13, ageUnit: "años", sex: "M", context: "Linfoma de Burkitt abdominal. Empezó quimioterapia hace 36 horas. Recibe alopurinol." },
  frequency: "poco-frecuente",
  intro: "La enfermera: “Orina muy poco, tiene calambres y el monitor marca latidos raros.”",
  vitals: { TA: "142/88 mmHg", FC: "118 lpm", FR: "22 rpm", "SatO₂": "96 %" },
  anamnesis: [
    act("quimio", "¿Cuándo empezó la quimioterapia?", "clave", "Hace 36 horas.", "Lisis tumoral: entre 12 y 72 horas."),
    act("tumor", "¿Qué tumor y de qué tamaño?", "clave", "Burkitt abdominal grande, LDH inicial de 2.400.", "Tumor de alto recambio: alto riesgo."),
    act("hidratacion", "¿Cómo viene la hidratación?", "clave", "Hiperhidratación iniciada tarde, diuresis cayendo.", "Factor de riesgo."),
    act("calambres", "¿Calambres, hormigueos?", "util", "“En las manos.”", "Hipocalcemia."),
    act("vomitos", "¿Vómitos?", "util", "Sí, por la quimioterapia.", "Contribuye a la depleción."),
    act("escuela", "¿En qué grado está?", "neutro", "Primer año del secundario.", "No orienta."),
  ],
  exam: [
    act("neuromuscular", "Signos de Chvostek y Trousseau", "clave", "Positivos.", "Hipocalcemia."),
    act("cardio", "Ritmo", "clave", "Extrasístoles ventriculares frecuentes.", "Hiperpotasemia."),
    act("volemia", "Volemia", "util", "Edemas leves, sin crepitantes.", "Balance."),
  ],
  studies: [
    study("Laboratorio", "electrolitos", "Potasio, fósforo, calcio, ácido úrico, creatinina", "clave", "K 6,8 mEq/l, P 9,2 mg/dl, Ca 6,6 mg/dl, ácido úrico 12 mg/dl, creatinina 2,1 (basal 0,6).", "Criterios de Cairo-Bishop."),
    study("Electrofisiología", "ecg", "ECG", "clave", "Ondas T picudas, QT prolongado, extrasístoles.", "Urgencia."),
    study("Laboratorio", "gases", "Gases", "util", "Acidosis metabólica.", "Empeora el potasio."),
    study("Imágenes", "eco-renal", "Ecografía renal", "util", "Riñones aumentados, sin obstrucción.", "Descarta obstrucción por el tumor."),
    study("Otros", "esperar-labo", "Esperar el laboratorio de mañana", "riesgoso", "No se esperó.", "El potasio puede matar en horas."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("slt", "Síndrome de lisis tumoral clínico con hiperpotasemia, hiperfosfatemia, hipocalcemia, hiperuricemia e insuficiencia renal aguda", true, "Tumor de alto recambio a las 36 horas de la quimioterapia con las cuatro alteraciones de laboratorio, falla renal y arritmias."),
      dx("nefrotoxicidad", "Nefrotoxicidad por quimioterapia", false, "No explica el potasio, el fósforo y el ácido úrico."),
      dx("obstructiva", "Insuficiencia renal obstructiva por el tumor", false, "Ecografía sin obstrucción."),
      dx("sepsis", "Sepsis", false, "Sin fiebre ni foco."),
      dx("hipoparatiroidismo", "Hipoparatiroidismo", false, "La hipocalcemia es por el fósforo alto."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("calcio-gluconato", "Gluconato de calcio por las alteraciones del ECG", "clave", "Estabiliza la membrana del miocardio."),
      mg("insulina-glucosa", "Insulina con glucosa y salbutamol para bajar el potasio", "clave", "Desplazan potasio a la célula."),
      mg("rasburicasa", "Rasburicasa", "clave", "Degrada el ácido úrico ya formado."),
      mg("dialisis", "Hemodiálisis urgente si no responde o hay oligoanuria persistente", "clave", "Depura potasio, fósforo y ácido úrico."),
      mg("hidratacion", "Hidratación intensa con control estricto de diuresis", "util", "Si la diuresis responde."),
      mg("bicarbonato-alcalinizar", "Alcalinizar la orina con bicarbonato", "riesgoso", "Precipita fosfato de calcio en el riñón y empeora la hipocalcemia."),
      mg("calcio-asintomatico", "Corregir la hipocalcemia asintomática con calcio a dosis plenas", "riesgoso", "Con fósforo alto precipita fosfato de calcio."),
    ],
  },
  debrief: {
    diagnosis: "Síndrome de lisis tumoral clínico con hiperpotasemia y arritmias e insuficiencia renal aguda, a las 36 horas de la quimioterapia, en un adolescente de 13 años con linfoma de Burkitt.",
    pathologies: [
      { name: "Síndrome de lisis tumoral", role: "principal", why: "Liberación masiva de contenido intracelular." },
      { name: "Linfoma de Burkitt", role: "asociada", why: "Tumor de altísimo recambio." },
      { name: "Insuficiencia renal aguda", role: "asociada", why: "Precipitación de ácido úrico y fosfato de calcio." },
    ],
    reasoning: [
      "Causa: destrucción rápida de células tumorales por la quimioterapia.",
      "Mecanismo: salen potasio, fósforo y ácidos nucleicos que se convierten en ácido úrico; el fósforo arrastra el calcio.",
      "Consecuencia: arritmias, convulsiones e insuficiencia renal aguda.",
    ],
    epidemiology:
      "Es la urgencia oncológica más frecuente en hematología. El riesgo es mayor en Burkitt, leucemias agudas con muchos blastos y tumores voluminosos y quimiosensibles, con LDH alta, deshidratación o falla renal previa. Es más común en niños con linfomas.",
    management: [
      "Prevención: estratificar el riesgo, hidratar, alopurinol o rasburicasa.",
      "Tratamiento: hiperpotasemia, rasburicasa, diálisis.",
      "Monitoreo cada 4–6 horas.",
    ],
    sources: ["Sociedad Argentina de Hematología — Síndrome de lisis tumoral.", "Cairo MS, Bishop M — Tumour lysis syndrome: new therapeutic strategies and classification (Br J Haematol)."],
    pearls: ["Potasio, fósforo y ácido úrico altos, calcio bajo.", "Burkitt = alto riesgo.", "Rasburicasa en alto riesgo."],
    pitfalls: ["Alcalinizar la orina.", "Corregir hipocalcemia asintomática con fósforo alto."],
    tribunal: [
      qa("¿Qué alteraciones definen el síndrome de lisis tumoral?", "Hiperuricemia, hiperpotasemia, hiperfosfatemia e hipocalcemia; es clínico si suma falla renal, arritmias o convulsiones."),
      qa("¿Cuál es la diferencia entre alopurinol y rasburicasa?", "El alopurinol evita que se forme ácido úrico nuevo; la rasburicasa degrada el ya formado."),
      qa("¿En qué paciente está contraindicada la rasburicasa?", "En el déficit de G6PD, porque genera peróxido de hidrógeno que causa hemólisis y metahemoglobinemia."),
    ],
  },
};
