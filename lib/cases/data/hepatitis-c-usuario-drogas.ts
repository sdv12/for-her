import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hepatitisCUsuarioDrogas: ClinicalCase = {
  id: "hepatitis-c-cronica-usuario-drogas",
  level: 2,
  area: "Infectología",
  setting: "CAPS",
  patient: { age: 34, ageUnit: "años", sex: "M", context: "Usó drogas inyectables hasta hace 3 años. Hoy en tratamiento con metadona. Se hizo tatuajes caseros." },
  frequency: "frecuente",
  intro: "“En el centro de tratamiento me hicieron un análisis y salió positivo para hepatitis C. Me siento bien.”",
  vitals: { TA: "122/76 mmHg", FC: "74 lpm", "T°": "36,5 °C", Peso: "72 kg" },
  anamnesis: [
    act("riesgo", "¿Compartiste jeringas o hiciste tatuajes caseros?", "clave", "“Sí, las dos cosas.”", "Factores de riesgo."),
    act("alcohol", "¿Tomás alcohol?", "clave", "“Poco.”", "Progresión."),
    act("sintomas", "¿Cansancio, ictericia, panza hinchada?", "clave", "“Nada.”", "Asintomático."),
    act("vih-hbv", "¿Te hiciste VIH y hepatitis B?", "util", "“No sé.”", "Coinfecciones."),
    act("pareja", "¿Tenés pareja?", "util", "“Sí.”", "Transmisión sexual baja."),
    act("trabajo", "¿Trabajás?", "neutro", "“En un taller de motos.”", "No orienta."),
  ],
  exam: [
    act("higado", "Hígado", "clave", "Normal.", "Sin cirrosis clínica."),
    act("estigmas", "Estigmas de hepatopatía", "clave", "Ausentes.", "Base."),
    act("brazos", "Brazos", "util", "Cicatrices de punciones antiguas.", "Antecedente."),
  ],
  studies: [
    study("Laboratorio", "carga", "Carga viral de VHC", "clave", "Detectable.", "Infección crónica activa."),
    study("Laboratorio", "fibrosis", "Hepatograma, plaquetas, FIB-4 o elastografía", "clave", "FIB-4 bajo; elastografía F1.", "Sin fibrosis avanzada."),
    study("Laboratorio", "coinfecciones", "VIH, hepatitis B y A", "util", "VIH negativo; anti-HBs negativo.", "Vacunar."),
    study("Otros", "biopsia", "Biopsia hepática", "innecesario", "No se realizó.", "La elastografía alcanza."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("vhc-cronica", "Hepatitis C crónica sin fibrosis significativa en ex usuario de drogas inyectables", true, "Anticuerpos y carga viral positivos, factores de riesgo y elastografía F1."),
      dx("curada", "Infección curada espontáneamente", false, "La carga viral es detectable."),
      dx("cirrosis", "Cirrosis por hepatitis C", false, "Elastografía F1."),
      dx("hepatitis-b", "Hepatitis B", false, "Es VHC."),
      dx("falso-positivo", "Falso positivo", false, "Carga viral positiva."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("aad", "Antivirales de acción directa pangenotípicos por 8 a 12 semanas", "clave", "Curación mayor del 95 %."),
      mg("vacunas", "Vacunar contra hepatitis A y B", "clave", "Proteger el hígado."),
      mg("reduccion-danos", "Reducción de daños y material estéril", "clave", "Evitar reinfección."),
      mg("control", "Carga viral a las 12 semanas de terminar (RVS)", "util", "Confirmar curación."),
      mg("no-tratar-udiv", "No tratar porque puede reinfectarse", "riesgoso", "Se trata a todos."),
      mg("interferon", "Interferón", "riesgoso", "Obsoleto y tóxico."),
    ],
  },
  debrief: {
    diagnosis: "Hepatitis C crónica sin fibrosis significativa en ex usuario de drogas inyectables en tratamiento con metadona.",
    pathologies: [
      { name: "Hepatitis C crónica", role: "principal", why: "Infección viral curable." },
      { name: "Antecedente de uso inyectable", role: "asociada", why: "Vía de transmisión." },
      { name: "Cirrosis, curada", role: "diferencial", why: "Estadificación." },
    ],
    reasoning: [
      "Causa: VHC por compartir material de inyección.",
      "Mecanismo: infección crónica con inflamación y fibrosis lenta.",
      "Consecuencia: cirrosis y hepatocarcinoma en años si no se trata.",
    ],
    epidemiology:
      "Los antivirales de acción directa curan a casi todos con tratamientos cortos. Argentina tiene un programa nacional de hepatitis con acceso gratuito. Las personas que usan drogas son prioridad para la eliminación del VHC.",
    management: [
      "Carga viral.",
      "Fibrosis.",
      "Antivirales.",
      "Vacunas y reducción de daños.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de hepatitis C.", "EASL — Recommendations on Treatment of Hepatitis C."],
    pearls: ["Anticuerpo positivo: pedí carga viral.", "Se cura.", "Tratá a todos."],
    pitfalls: ["Excluir a usuarios de drogas.", "Biopsia innecesaria."],
    tribunal: [
      qa("¿Qué es la respuesta virológica sostenida?", "Carga viral indetectable 12 semanas después del tratamiento, equivale a curación."),
      qa("¿Qué significa anticuerpo positivo con carga negativa?", "Infección pasada resuelta."),
      qa("¿Qué manifestaciones extrahepáticas tiene?", "Crioglobulinemia, glomerulonefritis, porfiria cutánea y linfoma."),
    ],
  },
};
