import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const leucemiaLinfaticaCronica: ClinicalCase = {
  id: "leucemia-linfatica-cronica",
  level: 1,
  area: "Hematología",
  setting: "Consultorio",
  patient: { age: 73, ageUnit: "años", sex: "M", context: "Jubilado, se sentía bien. Lo derivan por un análisis prequirúrgico de cataratas." },
  frequency: "frecuente",
  intro: "“Me hicieron análisis para operarme la vista y me dijeron que tengo muchos glóbulos blancos. Me siento bien.”",
  vitals: { TA: "132/80 mmHg", FC: "72 lpm", "T°": "36,3 °C", "SatO₂": "97 %", Peso: "76 kg" },
  anamnesis: [
    act("sintomas", "¿Fiebre, sudor, pérdida de peso?", "clave", "“Nada.”", "Ausencia de síntomas B."),
    act("infecciones", "¿Infecciones repetidas o herpes zóster?", "clave", "“Un zóster hace 2 años.”", "Inmunodeficiencia."),
    act("anemia", "¿Cansancio, moretones?", "clave", "“No.”", "Citopenias."),
    act("familia", "¿Alguien de tu familia con leucemia?", "util", "“Mi hermana.”", "Agregación familiar."),
    act("vacunas", "¿Vacunas al día?", "util", "“No de neumonía.”", "Prevención."),
    act("catarata", "¿Quién te opera?", "neutro", "“Un oculista de mi obra social.”", "No orienta."),
  ],
  exam: [
    act("ganglios", "Ganglios", "clave", "Cervicales pequeños, móviles, indoloros.", "Estadio."),
    act("bazo", "Bazo e hígado", "clave", "No palpables.", "Estadio."),
    act("piel", "Palidez y púrpura", "util", "Sin alteraciones.", "Citopenias."),
  ],
  studies: [
    study("Laboratorio", "hemograma", "Hemograma con frotis", "clave", "Leucocitos 28.000; 80 % linfocitos pequeños maduros, sombras de Gumprecht; Hb y plaquetas normales.", "Patrón típico."),
    study("Otros", "citometria", "Citometría de flujo", "clave", "Clon B CD5+, CD23+, CD19+.", "Confirma."),
    study("Laboratorio", "coombs", "Coombs, LDH, inmunoglobulinas", "util", "Coombs negativo, IgG baja leve.", "Autoinmunidad e inmunodeficiencia."),
    study("Otros", "mo", "Biopsia de médula de rutina", "innecesario", "No se realizó.", "No hace falta para diagnosticar."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("llc", "Leucemia linfática crónica en estadio inicial (Rai 1, Binet A)", true, "Linfocitosis madura clonal CD5+/CD23+, sin citopenias."),
      dx("lmc", "Leucemia mieloide crónica", false, "Son linfocitos, sin BCR-ABL."),
      dx("reactiva", "Linfocitosis reactiva", false, "Es clonal."),
      dx("lla", "Leucemia aguda", false, "No hay blastos."),
      dx("manto", "Linfoma del manto", false, "CD23 positivo orienta a LLC."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("observar", "Seguimiento clínico, sin tratamiento inmediato", "clave", "Tratar antes no mejora la supervivencia en etapas iniciales asintomáticas."),
      mg("vacunas", "Vacunas: neumococo, influenza, COVID y zóster recombinante", "clave", "Las infecciones son la principal causa de complicación."),
      mg("alarma", "Pautas de alarma y control del hemograma", "clave", "Detecta progresión."),
      mg("cirugia", "Autorizar la cirugía de cataratas", "util", "No la contraindica."),
      mg("quimio", "Quimioterapia inmediata", "riesgoso", "Toxicidad sin beneficio."),
      mg("vivas", "Vacunas a virus vivos sin evaluar", "riesgoso", "Riesgo en inmunodeficiencia."),
    ],
  },
  debrief: {
    diagnosis: "Leucemia linfática crónica en estadio inicial, Binet A, en varón de 73 años.",
    pathologies: [
      { name: "Leucemia linfática crónica", role: "principal", why: "Clon de linfocitos B maduros." },
      { name: "Inmunodeficiencia", role: "asociada", why: "Infecciones y autoinmunidad." },
      { name: "LMC, linfocitosis reactiva, manto", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: expansión clonal de linfocitos B.",
      "Mecanismo: linfocitos maduros que no mueren, con inmunidad alterada.",
      "Consecuencia: linfocitosis, adenopatías, citopenias, infecciones y anemia autoinmune.",
    ],
    epidemiology:
      "Es la leucemia más común en adultos de países occidentales, con edad media de 70 años. Muchas personas se diagnostican por un hemograma casual. Una parte importante no necesitará tratamiento durante años y puede morir con la enfermedad, no por ella.",
    management: [
      "Frotis y citometría.",
      "Estadificar Rai y Binet.",
      "Tratar solo si hay enfermedad activa.",
      "Vacunación y seguimiento.",
    ],
    sources: ["Sociedad Argentina de Hematología — Guías de LLC.", "iwCLL — Guidelines for Diagnosis and Treatment of CLL."],
    pearls: ["Leucocitosis linfocitaria en mayores.", "Sombras de Gumprecht.", "Asintomático: observar."],
    pitfalls: ["Tratar por el número de leucocitos.", "Olvidar vacunas."],
    tribunal: [
      qa("¿Cuándo se trata la LLC?", "Con citopenias progresivas, síntomas B, adenopatías o bazo masivos, o duplicación rápida de linfocitos."),
      qa("¿Qué complicaciones autoinmunes tiene?", "Anemia hemolítica autoinmune y trombocitopenia inmune."),
      qa("¿Qué es la transformación de Richter?", "Paso a un linfoma agresivo, habitualmente difuso de células B grandes."),
    ],
  },
};
