import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const sifilisEmbarazo: ClinicalCase = {
  id: "sifilis-embarazo",
  level: 3,
  area: "Salud comunitaria",
  setting: "CAPS",
  patient: { age: 20, ageUnit: "años", sex: "F", context: "Primer control prenatal, embarazo de 16 semanas. Pareja estable hace un año." },
  frequency: "frecuente",
  intro: "“Vengo al primer control. Me siento bien, solo con náuseas a la mañana. Me hicieron los análisis que me pidieron la semana pasada.”",
  vitals: { TA: "108/68 mmHg", FC: "80 lpm", "T°": "36,4 °C", Peso: "58 kg" },
  anamnesis: [
    act("lesiones", "¿Tuvo alguna llaga en los genitales o la boca en el último año, o manchas en las palmas y plantas?", "clave", "“Hace unos meses tuve unas manchitas en el cuerpo que se fueron solas. Llaga no vi.”", "El chancro suele pasar inadvertido; las lesiones de la sífilis secundaria se van solas. Sin fecha clara, la sífilis se trata como latente de duración desconocida."),
    act("previa", "¿Tuvo sífilis antes o le hicieron VDRL en otro embarazo?", "clave", "“Nunca me hice nada.”", "Sin tratamiento previo documentado, cualquier prueba reactiva se considera infección actual en el embarazo."),
    act("pareja", "¿Su pareja tiene síntomas? ¿Se hizo análisis?", "clave", "“No sé, él no va al médico.”", "La pareja debe estudiarse y tratarse: si no, la reinfección es la regla."),
    act("alergia", "¿Es alérgica a la penicilina?", "clave", "“No.”", "En el embarazo la penicilina es el único tratamiento que previene la sífilis congénita: con alergia se desensibiliza."),
    act("its", "¿Usan preservativo? ¿Tuvo otras infecciones de transmisión sexual?", "util", "“No usamos. Otras no.”", "Las ITS se asocian entre sí: hay que ofrecer VIH, hepatitis B y C."),
    act("musica", "¿Qué música escucha?", "neutro", "“Trap.”", "No orienta."),
  ],
  exam: [
    act("piel", "Piel, palmas, plantas y mucosas", "clave", "Sin lesiones activas.", "Sin signos de sífilis primaria ni secundaria: estadio latente."),
    act("ganglios", "Ganglios", "util", "Microadenopatías inguinales indoloras.", "Pueden persistir tras la sífilis secundaria."),
    act("genital", "Examen genital", "util", "Sin lesiones.", "Descarta chancro y otras ITS visibles."),
    act("obstetrico", "Altura uterina y latidos fetales", "util", "Acordes a 16 semanas; latidos fetales presentes.", "Control obstétrico de rutina."),
  ],
  studies: [
    study("Laboratorio", "vdrl", "VDRL cuantitativa", "clave", "Reactiva, título 1/32.", "Prueba no treponémica: detecta infección activa y su título sirve para seguir la respuesta al tratamiento."),
    study("Laboratorio", "treponemica", "Prueba treponémica (test rápido, TPHA o FTA-abs)", "clave", "Reactiva.", "Confirma que la VDRL no es un falso positivo (embarazo, autoinmunidad). En la embarazada no se espera la confirmación para empezar el tratamiento."),
    study("Laboratorio", "vih", "VIH, hepatitis B y hepatitis C", "clave", "No reactivas.", "Parte de los controles del embarazo y de toda ITS."),
    study("Otros", "pl", "Punción lumbar", "innecesario", "No se realizó.", "Solo con síntomas neurológicos u oculares, o falla del tratamiento."),
    study("Imágenes", "eco", "Ecografía obstétrica", "util", "Feto acorde, sin hidrops ni hepatomegalia.", "Busca signos de sífilis fetal (más frecuentes después de las 20 semanas)."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("latente", "Sífilis latente de duración desconocida en el embarazo", true, "VDRL 1/32 y treponémica reactivas, sin lesiones actuales y sin poder fechar la infección."),
      dx("falso", "Falso positivo de VDRL por el embarazo", false, "Los falsos positivos dan títulos bajos (≤ 1/4) con treponémica negativa; acá la treponémica es reactiva y el título alto."),
      dx("cicatriz", "Cicatriz serológica de una sífilis tratada", false, "Requiere un tratamiento previo documentado y títulos bajos estables."),
      dx("secundaria", "Sífilis secundaria", false, "Daría lesiones cutáneas o mucosas activas, que hoy no tiene."),
      dx("neurosifilis", "Neurosífilis", false, "Requiere síntomas neurológicos y LCR alterado."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("penicilina", "Penicilina G benzatínica 2.400.000 UI intramuscular, una dosis por semana durante 3 semanas, empezando hoy", "clave", "Es el único tratamiento que cura a la madre y previene la sífilis congénita; se inicia sin demora, en el mismo centro."),
      mg("pareja", "Estudiar y tratar a la pareja (o parejas)", "clave", "Sin tratar a la pareja la reinfección es casi segura."),
      mg("notificar", "Notificación al SNVS", "clave", "La sífilis en la embarazada es de notificación obligatoria y permite el seguimiento del binomio."),
      mg("seguimiento", "VDRL de control mensual hasta el parto y aviso a neonatología", "clave", "Verifica la respuesta (caída del título) y detecta reinfección; el recién nacido se evalúa siempre."),
      mg("preservativo", "Consejería sobre el uso de preservativo durante el embarazo", "util", "Previene la reinfección y otras ITS."),
      mg("eritro", "Eritromicina oral como alternativa cómoda", "riesgoso", "No atraviesa bien la placenta: no previene la sífilis congénita. En el embarazo no hay alternativa a la penicilina."),
      mg("esperar", "Esperar la prueba confirmatoria del laboratorio central antes de tratar", "riesgoso", "Cada semana sin tratamiento aumenta el riesgo fetal; con un test rápido treponémico reactivo o ante la duda, se trata."),
    ],
  },
  debrief: {
    diagnosis: "Sífilis latente de duración desconocida en embarazada de 16 semanas (VDRL 1/32, treponémica reactiva).",
    pathologies: [
      { name: "Sífilis latente de duración desconocida", role: "principal", why: "Serología reactiva sin lesiones ni fecha de infección." },
      { name: "Riesgo de sífilis congénita", role: "asociada", why: "Transmisión transplacentaria en cualquier momento del embarazo." },
      { name: "Falso positivo de VDRL", role: "diferencial", why: "Se descarta con la prueba treponémica." },
      { name: "Cicatriz serológica", role: "diferencial", why: "Requiere tratamiento previo documentado." },
    ],
    reasoning: [
      "Causa: Treponema pallidum, transmitido por vía sexual.",
      "Mecanismo: tras el chancro (primaria) se disemina por la sangre (secundaria, con lesiones de piel y mucosas) y luego entra en latencia. En el embarazo, el treponema atraviesa la placenta en cualquier estadio, sobre todo en los primeros años de la infección.",
      "Consecuencia: aborto, muerte fetal, prematurez, hidrops o sífilis congénita (hepatoesplenomegalia, lesiones de piel, rinitis, alteraciones óseas y neurológicas).",
      "La penicilina benzatínica atraviesa la placenta y trata al feto: por eso es irreemplazable en el embarazo.",
    ],
    epidemiology:
      "La sífilis está en aumento sostenido en la Argentina: la tasa de notificación casi se triplicó en la última década, con mayor incidencia en jóvenes de 15 a 24 años. La sífilis en embarazadas y la sífilis congénita también crecieron, y se concentran en mujeres jóvenes con controles prenatales tardíos o insuficientes. Es una de las causas de muerte fetal más prevenibles.",
    management: [
      "Tamizaje con VDRL (o test rápido treponémico) en el primer control, en el tercer trimestre y en el parto.",
      "Ante cualquier prueba reactiva en el embarazo: tratar en el momento con penicilina benzatínica, sin esperar confirmación.",
      "Latente tardía o de duración desconocida: 2.400.000 UI semanales por 3 semanas; temprana: dosis única (en el embarazo se puede dar una segunda dosis).",
      "Tratar a las parejas, notificar al SNVS y controlar la VDRL mensualmente.",
      "Evaluar al recién nacido (VDRL, examen y, según el caso, tratamiento); con alergia a penicilina, desensibilización.",
    ],
    sources: [
      "Ministerio de Salud de la Nación — Guía de prevención, diagnóstico y tratamiento de la sífilis (Dirección de Respuesta al VIH, ITS, Hepatitis Virales y Tuberculosis).",
      "Ministerio de Salud de la Nación — Boletín sobre VIH, ITS y hepatitis (datos de sífilis).",
      "Estrategia de eliminación de la transmisión materno-infantil (ETMI Plus, OPS).",
    ],
    pearls: [
      "En el embarazo, VDRL reactiva = tratar hoy.",
      "Solo la penicilina previene la sífilis congénita; con alergia, desensibilizar.",
      "Sin tratar a la pareja, no hay tratamiento.",
    ],
    pitfalls: ["Esperar la confirmación para empezar.", "Usar eritromicina o azitromicina.", "No tratar a la pareja."],
  },
};
