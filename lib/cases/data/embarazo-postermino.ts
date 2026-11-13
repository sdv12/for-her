import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const embarazoPostermino: ClinicalCase = {
  id: "embarazo-prolongado",
  level: 2,
  area: "Ginecología y obstetricia",
  setting: "Consultorio",
  patient: { age: 27, ageUnit: "años", sex: "F", context: "Primigesta. Embarazo de 41 semanas y 2 días por ecografía del primer trimestre. Controles normales." },
  frequency: "frecuente",
  intro: "“Ya pasé la fecha y no tengo contracciones. ¿Puedo seguir esperando?”",
  vitals: { TA: "116/72 mmHg", FC: "80 lpm", "T°": "36,5 °C", Peso: "74 kg" },
  anamnesis: [
    act("fecha", "¿Cómo se calculó la fecha?", "clave", "“Con la ecografía de las 8 semanas.”", "Edad gestacional confiable."),
    act("movimientos", "¿Cómo se mueve el bebé?", "clave", "“Bien.”", "Bienestar."),
    act("perdidas", "¿Pérdida de líquido o sangre?", "clave", "“No.”", "RPM o sangrado."),
    act("contracciones", "¿Contracciones?", "util", "“Alguna suelta.”", "Sin trabajo de parto."),
    act("riesgo", "¿Presión alta o diabetes en el embarazo?", "util", "“No.”", "Bajo riesgo."),
    act("nombre", "¿Ya eligieron nombre?", "neutro", "“Valentino.”", "No orienta."),
  ],
  exam: [
    act("bishop", "Tacto vaginal y puntaje de Bishop", "clave", "Cuello posterior, formado, cerrado; Bishop 3.", "Cuello desfavorable."),
    act("altura", "Altura uterina y presentación", "clave", "Acorde, cefálica.", "Base."),
    act("lcf", "Latidos fetales", "util", "136 lpm.", "Vitalidad."),
  ],
  studies: [
    study("Otros", "monitoreo", "Monitoreo fetal anteparto", "clave", "Reactivo.", "Bienestar."),
    study("Imágenes", "eco", "Ecografía con líquido amniótico", "clave", "Bolsillo mayor de 3 cm, peso estimado 3.600 g.", "Sin oligoamnios."),
    study("Imágenes", "doppler", "Doppler umbilical", "util", "Normal.", "Función placentaria."),
    study("Imágenes", "rm", "RM pelviana", "innecesario", "No se realizó.", "No aporta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("prolongado", "Embarazo prolongado (41 semanas) con bienestar fetal conservado y cuello desfavorable", true, "Edad gestacional confiable mayor a 41 semanas, monitoreo reactivo y Bishop bajo."),
      dx("postermino", "Embarazo postérmino de 42 semanas", false, "Todavía no llegó a 42."),
      dx("rciu", "Restricción de crecimiento", false, "Peso y líquido normales."),
      dx("trabajo-parto", "Trabajo de parto latente", false, "Sin contracciones regulares."),
      dx("error-fecha", "Error de fecha", false, "Ecografía temprana."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("induccion", "Ofrecer inducción entre las 41 y 42 semanas", "clave", "Reduce la mortalidad perinatal sin aumentar cesáreas."),
      mg("maduracion", "Maduración cervical con prostaglandinas o sonda por Bishop bajo", "clave", "Cuello desfavorable."),
      mg("decision", "Decisión compartida explicando riesgos de esperar", "clave", "Autonomía."),
      mg("despegamiento", "Despegamiento de membranas", "util", "Puede adelantar el parto."),
      mg("cesarea-electiva", "Cesárea programada por estar pasada", "riesgoso", "No es indicación de cesárea."),
      mg("esperar-43", "Esperar hasta las 43 semanas sin controles", "riesgoso", "Aumenta la muerte fetal y la aspiración de meconio."),
    ],
  },
  debrief: {
    diagnosis: "Embarazo prolongado de 41 semanas y 2 días, de bajo riesgo, con bienestar fetal conservado y cuello desfavorable.",
    pathologies: [
      { name: "Embarazo prolongado", role: "principal", why: "Más de 41 semanas." },
      { name: "Cuello desfavorable", role: "asociada", why: "Requiere maduración." },
      { name: "Restricción, error de fecha", role: "diferencial", why: "Otras situaciones." },
    ],
    reasoning: [
      "Causa: muchas veces desconocida; más en primigestas.",
      "Mecanismo: envejecimiento placentario con menor reserva.",
      "Consecuencia: oligoamnios, meconio, macrosomía y muerte fetal.",
    ],
    epidemiology:
      "Alrededor de 5 a 10 % de los embarazos llega a 42 semanas. El riesgo de muerte fetal sube a partir de las 41. La ecografía del primer trimestre reduce falsos diagnósticos por error de fecha.",
    management: [
      "Confirmar la fecha.",
      "Bienestar fetal.",
      "Bishop.",
      "Inducción.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía para la atención del parto normal.", "ACOG — Management of Late-Term and Postterm Pregnancies."],
    pearls: ["Ecografía temprana define la fecha.", "Inducir a las 41.", "Bishop bajo: madurar."],
    pitfalls: ["Cesárea por fecha.", "Esperar sin control."],
    tribunal: [
      qa("¿Qué evalúa el puntaje de Bishop?", "Dilatación, borramiento, consistencia y posición del cuello, y altura de la presentación."),
      qa("¿Qué contraindica las prostaglandinas?", "La cesárea anterior, por riesgo de rotura uterina."),
      qa("¿Qué riesgos tiene el recién nacido postérmino?", "Aspiración de meconio, hipoglucemia, macrosomía y asfixia."),
    ],
  },
};
