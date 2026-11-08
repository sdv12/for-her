import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hepatitisAutoinmune: ClinicalCase = {
  id: "hepatitis-autoinmune",
  level: 3,
  area: "Gastroenterología",
  setting: "Internación",
  patient: { age: 34, ageUnit: "años", sex: "F", context: "Hipotiroidismo autoinmune. No toma alcohol. Sin tatuajes ni drogas." },
  frequency: "poco-frecuente",
  intro: "“Hace un mes estoy muy cansada, me duelen las articulaciones y me puse amarilla.”",
  vitals: { TA: "112/70 mmHg", FC: "86 lpm", "T°": "37,2 °C", "SatO₂": "98 %", Peso: "58 kg" },
  anamnesis: [
    act("farmacos", "¿Remedios, hierbas, suplementos, paracetamol?", "clave", "“Solo levotiroxina.”", "Daño hepático por fármacos."),
    act("autoinmune", "¿Otras enfermedades autoinmunes?", "clave", "“Tiroides; mi mamá con lupus.”", "Asociación."),
    act("virus", "¿Riesgo para hepatitis: alimentos, sexo, transfusión?", "clave", "“No.”", "Causas virales."),
    act("encefalopatia", "¿Confusión, sueño invertido?", "util", "“No.”", "Insuficiencia hepática aguda."),
    act("colestasis", "¿Picazón, heces claras?", "util", "“Picazón no.”", "Colestasis."),
    act("trabajo", "¿Qué estudiaste?", "neutro", "“Diseño.”", "No orienta."),
  ],
  exam: [
    act("ictericia", "Ictericia", "clave", "Ictericia marcada, sin rash.", "Hepatitis."),
    act("hepatomegalia", "Abdomen", "clave", "Hepatomegalia dolorosa, sin ascitis.", "Parénquima."),
    act("mental", "Conciencia y asterixis", "util", "Normales.", "Gravedad."),
  ],
  studies: [
    study("Laboratorio", "lab", "Hepatograma, bilirrubina, coagulograma, albúmina", "clave", "ALT 980; AST 870; BT 8,2; RIN 1,3; IgG 3.100.", "Patrón hepatocelular con hipergammaglobulinemia."),
    study("Laboratorio", "auto", "ANA, anti-músculo liso, anti-LKM, antimitocondrial, ceruloplasmina", "clave", "ANA y anti-músculo liso positivos; ceruloplasmina normal.", "Clasifica."),
    study("Laboratorio", "viral", "Serologías de hepatitis A, B, C, E, VIH", "clave", "Negativas.", "Descartan virus."),
    study("Otros", "biopsia", "Biopsia hepática", "clave", "Hepatitis de interfase con plasmocitos.", "Sustenta el diagnóstico."),
    study("Imágenes", "tc-todo", "PET-TC de rutina", "innecesario", "No se realizó.", "No aporta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hai", "Hepatitis autoinmune tipo 1", true, "Mujer joven con autoinmunidad, hipergammaglobulinemia, ANA y anti-músculo liso, interfase."),
      dx("viral", "Hepatitis viral aguda", false, "Serologías negativas."),
      dx("wilson", "Enfermedad de Wilson", false, "Ceruloplasmina normal, sin anillo."),
      dx("cbp", "Colangitis biliar primaria", false, "Es colestásica, antimitocondrial."),
      dx("toxica", "Hepatitis por fármacos", false, "Sin exposición."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("corticoide", "Prednisona, luego azatioprina", "clave", "Induce y mantiene remisión."),
      mg("controles", "Controles de transaminasas e IgG", "clave", "Evalúa respuesta."),
      mg("preventivo", "Vacunas, calcio, vitamina D y hueso", "clave", "Prevención."),
      mg("tpmt", "Evaluar TPMT antes de azatioprina", "util", "Riesgo de mielotoxicidad."),
      mg("alta", "Reposo solamente", "riesgoso", "Progresa a cirrosis."),
      mg("hierbas", "Probar hierbas hepatoprotectoras", "riesgoso", "Pueden dañar el hígado."),
    ],
  },
  debrief: {
    diagnosis: "Hepatitis autoinmune tipo 1, con hipergammaglobulinemia y hepatitis de interfase, en mujer de 34 años.",
    pathologies: [
      { name: "Hepatitis autoinmune", role: "principal", why: "Inflamación autoinmune hepática." },
      { name: "Tiroiditis autoinmune", role: "asociada", why: "Autoinmunidad." },
      { name: "Viral, Wilson, por fármacos", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: susceptibilidad genética y gatillos.",
      "Mecanismo: pérdida de tolerancia a antígenos hepáticos.",
      "Consecuencia: necrosis, cirrosis si no se trata.",
    ],
    epidemiology:
      "Predomina en mujeres y puede presentarse a cualquier edad, incluso de manera aguda con ictericia. Es importante reconocerla porque responde muy bien a inmunosupresores. Sin tratamiento evoluciona a cirrosis y aumenta el riesgo de insuficiencia hepática.",
    management: [
      "Excluir otras causas.",
      "Autoanticuerpos, IgG.",
      "Biopsia.",
      "Inmunosupresión y seguimiento.",
    ],
    sources: ["Sociedad Argentina de Hepatología — Hepatitis autoinmune.", "AASLD — Practice Guidance on Autoimmune Hepatitis."],
    pearls: ["Mujer joven con transaminasas altas.", "IgG alta.", "Responde a corticoides."],
    pitfalls: ["Rotular como viral.", "Omitir suplementos en la historia."],
    tribunal: [
      qa("¿Cómo diferenciás patrón hepatocelular de colestásico?", "Hepatocelular: transaminasas muy altas. Colestásico: fosfatasa alcalina y GGT altas."),
      qa("¿Qué anticuerpos definen el tipo 1 y 2?", "Tipo 1: ANA y anti-músculo liso. Tipo 2: anti-LKM1, más en niños."),
      qa("¿Cuáles son los criterios de insuficiencia hepática aguda?", "RIN mayor de 1,5 con encefalopatía, sin enfermedad hepática previa."),
    ],
  },
};
