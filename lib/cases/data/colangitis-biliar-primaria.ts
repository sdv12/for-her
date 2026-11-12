import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const colangitisBiliarPrimaria: ClinicalCase = {
  id: "colangitis-biliar-primaria",
  level: 2,
  area: "Gastroenterología",
  setting: "Consultorio",
  patient: { age: 52, ageUnit: "años", sex: "F", context: "Hipotiroidismo y ojos secos. Laboratorio con fosfatasa alcalina alta." },
  frequency: "poco-frecuente",
  intro: "“Me pica todo el cuerpo, sobre todo a la noche, y estoy cansada. Me dijeron que tengo algo del hígado.”",
  vitals: { TA: "118/72 mmHg", FC: "76 lpm", "T°": "36,4 °C", "SatO₂": "98 %", Peso: "62 kg" },
  anamnesis: [
    act("prurito", "¿Picazón, dónde y cuándo?", "clave", "“Palmas y plantas, de noche.”", "Colestasis."),
    act("autoinmunes", "¿Ojos secos, tiroides, Raynaud?", "clave", "“Ojos secos y tiroides.”", "Asociaciones."),
    act("farmacos", "¿Remedios o hierbas?", "clave", "“Solo levotiroxina.”", "Colestasis por fármacos."),
    act("alcohol", "¿Alcohol?", "util", "“No.”", "Otras causas."),
    act("hueso", "¿Fracturas o dolor óseo?", "util", "“No.”", "Osteoporosis."),
    act("pasatiempo", "¿Qué te gusta hacer?", "neutro", "“Tejer.”", "No orienta."),
  ],
  exam: [
    act("piel", "Piel", "clave", "Lesiones de rascado, xantelasmas.", "Colestasis crónica."),
    act("higado", "Hígado y bazo", "clave", "Hepatomegalia leve.", "Hepatopatía."),
    act("ictericia", "Ictericia", "util", "No.", "Etapa temprana."),
  ],
  studies: [
    study("Laboratorio", "lab", "Hepatograma", "clave", "FAL 3 veces lo normal; GGT alta; bilirrubina normal.", "Colestásico."),
    study("Laboratorio", "ama", "Anticuerpos antimitocondriales", "clave", "Positivos.", "Diagnóstico."),
    study("Imágenes", "eco", "Ecografía abdominal", "clave", "Vía biliar no dilatada.", "Excluye obstrucción."),
    study("Otros", "biopsia", "Biopsia hepática de rutina", "innecesario", "No se realizó.", "No es necesaria si hay AMA y FAL."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("cbp", "Colangitis biliar primaria", true, "Mujer con prurito, FAL alta, AMA positivo y vía no dilatada."),
      dx("cep", "Colangitis esclerosante primaria", false, "Se asocia a colitis ulcerosa con imágenes alteradas."),
      dx("obstruccion", "Obstrucción biliar", false, "Vía no dilatada."),
      dx("hai", "Hepatitis autoinmune", false, "Patrón colestásico y AMA."),
      dx("farmacos", "Colestasis por fármacos", false, "Sin exposición."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("udca", "Ácido ursodesoxicólico", "clave", "Mejora la supervivencia."),
      mg("prurito", "Colestiramina para el prurito", "clave", "Síntoma."),
      mg("hueso", "Calcio, vitamina D y densitometría", "clave", "Osteoporosis."),
      mg("controles", "Evaluar respuesta al año y segunda línea si no responde", "util", "Pronóstico."),
      mg("corticoides", "Corticoides", "riesgoso", "No sirven y dañan el hueso."),
      mg("sin-tto", "No tratar por ser asintomática", "riesgoso", "Progresa."),
    ],
  },
  debrief: {
    diagnosis: "Colangitis biliar primaria con prurito, en mujer de 52 años con Sjögren e hipotiroidismo.",
    pathologies: [
      { name: "Colangitis biliar primaria", role: "principal", why: "Destrucción autoinmune de conductos." },
      { name: "Sjögren e hipotiroidismo", role: "asociada", why: "Autoinmunidad." },
      { name: "Colangitis esclerosante, obstrucción", role: "diferencial", why: "Otras colestasis." },
    ],
    reasoning: [
      "Causa: autoinmunidad contra conductos biliares pequeños.",
      "Mecanismo: retención de ácidos biliares.",
      "Consecuencia: prurito, osteoporosis y cirrosis.",
    ],
    epidemiology:
      "Afecta casi siempre a mujeres de mediana edad. Muchos casos se detectan por fosfatasa alcalina elevada en estudios de rutina. El ácido ursodesoxicólico cambia la evolución. Se asocia a Sjögren, tiroiditis y esclerodermia.",
    management: [
      "FAL y AMA.",
      "Ecografía.",
      "Ursodiol.",
      "Hueso y síntomas.",
    ],
    sources: ["Sociedad Argentina de Hepatología — Colangitis biliar primaria.", "EASL — Clinical Practice Guidelines on PBC."],
    pearls: ["Mujer con picazón y FAL alta: pedí AMA.", "Ursodiol.", "Cuidá el hueso."],
    pitfalls: ["Pensar en alergia.", "No tratar."],
    tribunal: [
      qa("¿Qué diferencia la CBP de la colangitis esclerosante?", "CBP: mujeres, AMA, conductos pequeños. CEP: varones con colitis ulcerosa, estenosis en colangioRM."),
      qa("¿Por qué hay xantelasmas?", "Por el aumento del colesterol en la colestasis crónica."),
      qa("¿Qué causa el prurito?", "La acumulación de sustancias pruritógenas por colestasis."),
    ],
  },
};
