import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const controlPrenatalAdolescente: ClinicalCase = {
  id: "control-prenatal-adolescente",
  level: 2,
  area: "Ginecología y obstetricia",
  setting: "CAPS",
  patient: { age: 15, ageUnit: "años", sex: "F", context: "Viene sola. Cursa tercer año. No sabe la fecha de su última menstruación." },
  frequency: "frecuente",
  intro: "“Creo que estoy embarazada. No le conté a mi mamá. Tengo miedo.”",
  vitals: { TA: "108/66 mmHg", FC: "82 lpm", "T°": "36,5 °C", Peso: "48 kg" },
  anamnesis: [
    act("pareja", "¿Quién es la pareja? ¿Qué edad tiene? ¿Fue con consentimiento?", "clave", "“Tiene 24 años.”", "Pensar en abuso y en el marco legal."),
    act("deseo", "¿Cómo te sentís con el embarazo? ¿Querés continuar?", "clave", "“No sé.”", "Opciones según ley."),
    act("seguridad", "¿Estás segura en casa?", "clave", "“Sí, pero tengo miedo de que se enojen.”", "Riesgo."),
    act("sustancias", "¿Consumo de alcohol o drogas?", "util", "“A veces.”", "Riesgo."),
    act("escuela", "¿Seguís en la escuela?", "util", "“Sí.”", "Factor protector."),
    act("musica", "¿Qué música te gusta?", "neutro", "“Cumbia.”", "No orienta."),
  ],
  exam: [
    act("obstetrico", "Altura uterina y latidos", "clave", "Altura de 12 semanas.", "Edad gestacional."),
    act("general", "Peso, presión y señales de violencia", "clave", "IMC 19; sin lesiones.", "Base."),
    act("animo", "Estado de ánimo", "util", "Angustiada.", "Contención."),
  ],
  studies: [
    study("Laboratorio", "hcg", "Beta-hCG y ecografía", "clave", "Embarazo de 12 semanas.", "Confirma y data."),
    study("Laboratorio", "rutina", "Laboratorio prenatal: VIH, sífilis, hepatitis B, Chagas, toxoplasmosis, grupo, urocultivo", "clave", "Sífilis positiva.", "Detecta infecciones."),
    study("Otros", "consejeria", "Consejería en opciones según la Ley 27.610", "clave", "Información completa.", "Derecho."),
    study("Otros", "exigir-padres", "Exigir la presencia de los padres para atenderla", "riesgoso", "No se realizó.", "Barrera ilegal: desde los 13 años puede consentir."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("embarazo", "Embarazo adolescente de 12 semanas con sífilis y posible abuso sexual", true, "Edad, diferencia con la pareja y serología."),
      dx("embarazo-bajo", "Embarazo de bajo riesgo", false, "Es de riesgo por edad, contexto y sífilis."),
      dx("amenaza", "Amenaza de aborto", false, "Sin sangrado."),
      dx("mola", "Mola", false, "Ecografía normal."),
      dx("depresion", "Depresión", false, "Puede coexistir, pero no es el diagnóstico principal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("opciones", "Informar opciones: continuar o interrumpir según la ley", "clave", "Derecho."),
      mg("sifilis", "Penicilina benzatínica y estudio de la pareja", "clave", "Previene sífilis congénita."),
      mg("proteccion", "Evaluar abuso y activar el circuito de protección", "clave", "Diferencia de edad."),
      mg("acompanamiento", "Equipo interdisciplinario y continuidad escolar", "util", "Protección."),
      mg("juzgar", "Retarla por quedar embarazada", "riesgoso", "Aleja del sistema."),
      mg("obligar-padres", "Negar la atención sin los padres", "riesgoso", "Ilegal y peligroso."),
    ],
  },
  debrief: {
    diagnosis: "Embarazo de 12 semanas en adolescente de 15 años, con sífilis y posible abuso sexual.",
    pathologies: [
      { name: "Embarazo adolescente", role: "principal", why: "Riesgo biológico y social." },
      { name: "Sífilis y posible abuso", role: "asociada", why: "Requieren acción." },
      { name: "Bajo riesgo, amenaza de aborto", role: "diferencial", why: "Otros enfoques." },
    ],
    reasoning: [
      "Causa: falta de educación sexual y acceso a métodos, y relaciones de poder desiguales.",
      "Mecanismo: embarazo no planificado con barreras de acceso.",
      "Consecuencia: riesgo de abandono escolar, complicaciones y repetición.",
    ],
    epidemiology:
      "La tasa de embarazo adolescente bajó en Argentina con el Plan ENIA, pero sigue alta en algunas provincias. En menores de 15, muchos son producto de abuso. La consejería en opciones y la sífilis gestacional son prioridades.",
    management: [
      "Atender sin barreras.",
      "Opciones según la ley.",
      "Laboratorio prenatal.",
      "Proteger.",
    ],
    sources: ["Ministerio de Salud de la Nación — Plan ENIA.", "Ministerio de Salud de la Nación — Protocolo IVE/ILE (Ley 27.610)."],
    pearls: ["Desde los 13 años puede consentir.", "Pensá en abuso.", "Sífilis: tratar ya."],
    pitfalls: ["Exigir a los padres.", "Juzgar."],
    tribunal: [
      qa("¿Qué establece la Ley 27.610?", "El acceso a la interrupción voluntaria del embarazo hasta la semana 14 y por causales después."),
      qa("¿Qué controles prenatales se recomiendan?", "Al menos cinco controles, con el primero antes de la semana 12."),
      qa("¿Qué es la sífilis congénita?", "Transmisión al feto que puede causar muerte fetal, prematurez y malformaciones."),
    ],
  },
};
