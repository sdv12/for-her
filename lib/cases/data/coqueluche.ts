import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const coqueluche: ClinicalCase = {
  id: "coqueluche-lactante",
  level: 3,
  area: "Infectología",
  setting: "Guardia",
  patient: { age: 2, ageUnit: "meses", sex: "M", context: "Todavía no recibió las vacunas de los 2 meses. La mamá no se vacunó en el embarazo." },
  frequency: "poco-frecuente",
  intro: "“Hace diez días que tose, y ahora le dan ataques de tos que no paran, se pone colorado y después morado, y una vez dejó de respirar. Entre los ataques está bien. No tiene fiebre.”",
  vitals: { FC: "156 lpm", FR: "44 rpm", "T°": "36,8 °C", "SatO₂": "96 % (entre accesos)", Peso: "4,9 kg" },
  anamnesis: [
    act("accesos", "¿Cómo son los ataques de tos? ¿Qué pasa después?", "clave", "“Tose seguido sin parar, se pone morado, a veces vomita y queda agotado.”", "Tos paroxística con cianosis y vómito postusivo: típica de coqueluche. En lactantes pequeños el “gallo” puede faltar."),
    act("apneas", "¿Dejó de respirar en algún momento?", "clave", "“Una vez, lo tuvimos que sacudir.”", "Las apneas son la manifestación más peligrosa en menores de 6 meses: criterio de internación."),
    act("contactos", "¿Alguien en la casa tiene tos hace semanas?", "clave", "“El papá tose hace un mes, pensamos que era un resfrío.”", "Los adultos y adolescentes con tos prolongada son la fuente habitual de contagio de los lactantes."),
    act("vacunas", "¿Recibió vacunas? ¿La mamá se vacunó en el embarazo?", "clave", "“Solo las del nacimiento. La mamá no se vacunó.”", "La dTpa en el embarazo pasa anticuerpos al bebé y lo protege hasta que se vacuna."),
    act("alimentacion", "¿Puede alimentarse?", "util", "“Le cuesta, vomita después de los accesos.”", "Riesgo de deshidratación y desnutrición."),
    act("nombre", "¿Cómo se llama?", "neutro", "“Lautaro.”", "No orienta."),
  ],
  exam: [
    act("acceso", "Observar un acceso de tos", "clave", "Accesos de tos en salvas con congestión facial, cianosis y vómito; entre los accesos está rosado y tranquilo.", "Contraste típico: muy mal durante el acceso, bien entre ellos."),
    act("pulmonar", "Auscultación pulmonar", "util", "Normal entre los accesos.", "La auscultación suele ser normal, salvo neumonía asociada."),
    act("hidratacion", "Hidratación y peso", "util", "Leve deshidratación; peso por debajo del esperado.", "Complicación por los vómitos."),
    act("conjuntivas", "Conjuntivas y piel de la cara", "util", "Hemorragias subconjuntivales y petequias faciales.", "Por el aumento de presión durante los accesos."),
  ],
  studies: [
    study("Laboratorio", "hemograma", "Hemograma", "clave", "Leucocitos 32.000 con 76 % de linfocitos.", "La linfocitosis es típica; una leucocitosis > 30.000 se asocia a hipertensión pulmonar y peor pronóstico."),
    study("Microbiología", "pcr", "PCR para Bordetella pertussis en hisopado nasofaríngeo", "clave", "Positiva.", "Confirma el diagnóstico (el método de elección en las primeras semanas)."),
    study("Imágenes", "rx", "Radiografía de tórax", "util", "Infiltrados perihiliares leves.", "Busca neumonía asociada."),
    study("Imágenes", "eco", "Ecocardiograma", "util", "Presión pulmonar levemente elevada.", "Por la hiperleucocitosis, para descartar hipertensión pulmonar."),
    study("Laboratorio", "esperar-pcr", "Esperar la PCR para empezar el antibiótico", "riesgoso", "No se realizó.", "El tratamiento se inicia con la sospecha clínica y reduce el contagio."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("coqueluche", "Coqueluche (tos convulsa) en lactante no vacunado, con apneas", true, "Tos paroxística con cianosis y vómitos, apnea, sin fiebre, contacto con tos prolongada, linfocitosis marcada y PCR positiva."),
      dx("bronquiolitis", "Bronquiolitis", false, "Daría pródromo catarral, sibilancias, crepitantes y dificultad respiratoria persistente, no accesos con períodos normales."),
      dx("rge", "Reflujo gastroesofágico", false, "No explica la tos paroxística ni la linfocitosis."),
      dx("neumonia", "Neumonía bacteriana", false, "Fiebre, taquipnea persistente y foco."),
      dx("cuerpo", "Cuerpo extraño", false, "Improbable a los 2 meses; inicio súbito."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("internacion", "Internación con monitoreo de apneas y saturación", "clave", "Los menores de 6 meses con apneas o cianosis tienen alto riesgo de muerte."),
      mg("azitro", "Azitromicina 10 mg/kg/día por 5 días", "clave", "Reduce la transmisión y, si se da temprano, la duración."),
      mg("aislamiento", "Aislamiento respiratorio por gotas hasta 5 días de tratamiento", "clave", "Evita contagios en el hospital."),
      mg("contactos", "Notificación inmediata, quimioprofilaxis con azitromicina a los convivientes y completar vacunas", "clave", "Corta la cadena de transmisión; el papá con tos es la fuente probable."),
      mg("antitusivo", "Jarabe antitusivo", "riesgoso", "No sirve en la coqueluche y en lactantes puede deprimir la respiración."),
      mg("alta", "Alta con salbutamol y control en 48 h", "riesgoso", "Un lactante de 2 meses con apneas puede morir en su casa."),
    ],
  },
  debrief: {
    diagnosis: "Coqueluche confirmada (Bordetella pertussis) con apneas e hiperleucocitosis en lactante de 2 meses no vacunado, hijo de madre no vacunada en el embarazo.",
    pathologies: [
      { name: "Coqueluche", role: "principal", why: "Tos paroxística con PCR positiva." },
      { name: "Hipertensión pulmonar por hiperleucocitosis", role: "asociada", why: "Complicación grave en lactantes." },
      { name: "Bronquiolitis", role: "diferencial", why: "Otra causa respiratoria frecuente en lactantes." },
      { name: "Neumonía", role: "diferencial", why: "Complicación posible." },
    ],
    reasoning: [
      "Causa: Bordetella pertussis, que se transmite por gotas; los adultos y adolescentes con inmunidad que decayó tienen tos prolongada y contagian.",
      "Mecanismo: se adhiere al epitelio ciliado y libera toxinas (toxina pertussis, citotoxina traqueal) que paralizan y destruyen los cilios y causan linfocitosis.",
      "Consecuencia: acumulación de secreciones y tos en accesos violentos; en lactantes pequeños, apneas, cianosis y, por la hiperleucocitosis, hipertensión pulmonar.",
      "La vacuna en el embarazo protege al bebé en los meses en que todavía no completó sus dosis.",
    ],
    epidemiology:
      "La coqueluche sigue presente en la Argentina con brotes cada 3–5 años. Casi todas las muertes ocurren en menores de 6 meses, sobre todo los que no recibieron vacunas y cuyas madres no se vacunaron en el embarazo. No hay grandes diferencias por sexo. La vacuna dTpa se indica en cada embarazo desde la semana 20, y el esquema del bebé empieza a los 2 meses.",
    management: [
      "Sospechar ante tos de más de 2 semanas, paroxística, con estridor inspiratorio, vómitos o apneas (en lactantes, la tos con apneas o cianosis basta).",
      "Confirmar con PCR (o cultivo); no demorar el antibiótico.",
      "Azitromicina; internación en menores de 6 meses o con apneas, cianosis, hiperleucocitosis o dificultad para alimentarse.",
      "Notificación inmediata y quimioprofilaxis de convivientes y contactos estrechos.",
      "Prevención: vacunación en el embarazo, completar los esquemas y refuerzos.",
    ],
    sources: [
      "Ministerio de Salud de la Nación — Guía para el equipo de salud: coqueluche (tos convulsa).",
      "Calendario Nacional de Vacunación — dTpa en embarazadas y esquema pediátrico.",
    ],
    pearls: ["Lactante con tos y apneas: pensá en coqueluche.", "Linfocitosis marcada sin fiebre.", "dTpa en cada embarazo desde la semana 20."],
    pitfalls: ["Esperar la PCR para tratar.", "No tratar a los contactos.", "Dar el alta a un lactante con apneas."],
  },
};
