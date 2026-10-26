import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const leptospirosis: ClinicalCase = {
  id: "leptospirosis-weil",
  level: 3,
  area: "Infectología",
  setting: "Guardia",
  patient: { age: 35, ageUnit: "años", sex: "M", context: "Santa Fe, después de las inundaciones de marzo. Trabaja en la limpieza de zanjas." },
  frequency: "poco-frecuente",
  intro: "“Hace cinco días empecé con fiebre alta, dolor de cabeza y un dolor terrible en las pantorrillas. Ahora estoy amarillo y orino muy poco.”",
  vitals: { TA: "100/62 mmHg", FC: "108 lpm", FR: "22 rpm", "T°": "38,6 °C", "SatO₂": "94 %" },
  anamnesis: [
    act("exposicion", "¿Tuvo contacto con agua de inundación, barro o ratas?", "clave", "“Estuve dos semanas limpiando zanjas con agua hasta las rodillas, sin botas. Había muchas ratas.”", "La exposición a agua contaminada con orina de roedores es la vía clásica de contagio."),
    act("mialgias", "¿Dónde le duelen los músculos?", "clave", "“Sobre todo las pantorrillas, no puedo ni tocarlas.”", "Las mialgias intensas en las pantorrillas son muy características de la leptospirosis."),
    act("hemorragias", "¿Tuvo sangrados, tos con sangre o falta de aire?", "clave", "“Escupí un poco de sangre hoy.”", "La hemorragia pulmonar es la complicación más letal."),
    act("dengue", "¿Hay casos de dengue en su barrio? ¿Tuvo manchas en la piel?", "util", "“Sí, hay dengue. Manchas no.”", "Dengue y hantavirus son diferenciales importantes en la misma época y región."),
    act("aines", "¿Tomó algo para la fiebre?", "util", "“Ibuprofeno.”", "Los AINE empeoran el riesgo de sangrado y la función renal."),
    act("hobby", "¿Pesca?", "neutro", "“A veces, en el río.”", "Otra exposición posible, pero ya hay una clara."),
  ],
  exam: [
    act("ojos", "Conjuntivas y piel", "clave", "Sufusión conjuntival (enrojecimiento sin secreción) e ictericia.", "La sufusión conjuntival con ictericia es muy sugestiva de leptospirosis grave."),
    act("pantorrillas", "Palpación de pantorrillas", "clave", "Dolor intenso a la palpación.", "Miositis característica."),
    act("pulmonar", "Auscultación pulmonar", "clave", "Crepitantes bibasales.", "Puede indicar hemorragia pulmonar o distrés."),
    act("higado", "Hígado y bazo", "util", "Hepatomegalia leve dolorosa.", "Compromiso hepático."),
  ],
  studies: [
    study("Laboratorio", "lab", "Hemograma, función renal, hepatograma, CPK, ionograma, coagulograma", "clave", "Plaquetas 58.000, creatinina 2,9, bilirrubina 7,2 (directa), transaminasas levemente elevadas, CPK 2.800, K 3,3.", "Insuficiencia renal con hipopotasemia, ictericia con transaminasas apenas altas y CPK alta: perfil típico de leptospirosis."),
    study("Microbiología", "serologia", "Serología (ELISA IgM, MAT) y PCR para Leptospira", "clave", "ELISA IgM positiva; muestra enviada para MAT.", "Confirma el diagnóstico; las muestras se envían al laboratorio de referencia."),
    study("Imágenes", "rx", "Radiografía de tórax", "util", "Infiltrados alveolares bilaterales.", "Sugiere hemorragia pulmonar: gravedad."),
    study("Laboratorio", "dengue", "NS1 e IgM para dengue y serología para hantavirus", "util", "Negativos.", "Descarta los diferenciales de la región."),
    study("Laboratorio", "esperar", "Esperar la confirmación serológica para tratar", "riesgoso", "No se realizó.", "El tratamiento se inicia con la sospecha clínico-epidemiológica: esperar aumenta la mortalidad."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("weil", "Leptospirosis grave (síndrome de Weil) con compromiso renal, hepático y pulmonar", true, "Exposición a agua de inundación, fiebre, mialgias en pantorrillas, sufusión conjuntival, ictericia, insuficiencia renal, plaquetopenia y hemoptisis, con IgM positiva."),
      dx("dengue", "Dengue grave", false, "No da ictericia marcada con insuficiencia renal de este tipo; el NS1 y la IgM son negativos."),
      dx("hanta", "Síndrome cardiopulmonar por hantavirus", false, "Distrés y shock con hemoconcentración, sin ictericia marcada; serología negativa."),
      dx("hepatitis", "Hepatitis viral aguda", false, "Transaminasas muy altas (miles), sin insuficiencia renal ni CPK alta."),
      dx("malaria", "Paludismo", false, "Requiere viaje a zona endémica; no hay transmisión autóctona en la Argentina."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("atb", "Penicilina G endovenosa (o ceftriaxona)", "clave", "Tratamiento de la leptospirosis grave; se inicia ante la sospecha."),
      mg("internacion", "Internación en unidad cerrada, soporte renal y respiratorio según necesidad", "clave", "La hemorragia pulmonar y la insuficiencia renal pueden requerir ventilación y diálisis."),
      mg("notificar", "Notificación al SNVS y búsqueda de otros expuestos", "clave", "Es de notificación obligatoria; puede haber brotes."),
      mg("prevencion", "Prevención: botas y guantes en tareas de riesgo, control de roedores", "util", "Evita nuevos casos."),
      mg("aines", "Ibuprofeno para la fiebre y el dolor muscular", "riesgoso", "Empeora la función renal y el riesgo de sangrado con plaquetas bajas."),
      mg("corticoides", "Corticoides en dosis altas de rutina", "innecesario", "No tienen beneficio demostrado de rutina."),
    ],
  },
  debrief: {
    diagnosis: "Leptospirosis grave (síndrome de Weil) con insuficiencia renal aguda, ictericia, plaquetopenia y hemorragia pulmonar, tras exposición a agua de inundación.",
    pathologies: [
      { name: "Leptospirosis", role: "principal", why: "Zoonosis por exposición a orina de roedores." },
      { name: "Hemorragia pulmonar", role: "asociada", why: "Complicación más letal." },
      { name: "Insuficiencia renal aguda", role: "asociada", why: "Nefritis intersticial con hipopotasemia." },
      { name: "Dengue y hantavirus", role: "diferencial", why: "Síndromes febriles de la misma región y época." },
    ],
    reasoning: [
      "Causa: Leptospira interrogans, eliminada por la orina de roedores y otros animales; entra por la piel lesionada o las mucosas en contacto con agua o barro contaminados.",
      "Mecanismo: se disemina por la sangre y daña el endotelio de los capilares (vasculitis), con compromiso de riñón, hígado, pulmón y músculo.",
      "Consecuencia: fase febril con mialgias y sufusión conjuntival; en las formas graves, ictericia (con transaminasas poco elevadas), nefritis intersticial con pérdida de potasio, plaquetopenia y hemorragias.",
      "Por eso la epidemiología (inundaciones, trabajos rurales, zanjas) es la clave del diagnóstico.",
    ],
    epidemiology:
      "En la Argentina la leptospirosis es endémica, con brotes después de inundaciones, sobre todo en el Litoral (Santa Fe, Entre Ríos) y en el norte. Afecta principalmente a varones de 15 a 50 años con exposición laboral o recreativa (trabajadores rurales, de limpieza, recolectores, pescadores). Es un evento de notificación obligatoria.",
    management: [
      "Sospechar ante síndrome febril agudo con exposición de riesgo.",
      "Iniciar antibiótico sin esperar la confirmación: doxiciclina en formas leves; penicilina o ceftriaxona en graves.",
      "Soporte en unidad cerrada (diálisis, ventilación) en formas graves.",
      "Confirmación por laboratorio de referencia (ELISA, MAT, PCR).",
      "Notificación, búsqueda de expuestos y prevención (protección personal, control de roedores).",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía para el equipo de salud: leptospirosis.", "Instituto Nacional de Enfermedades Respiratorias “Emilio Coni” — Laboratorio de referencia en leptospirosis."],
    pearls: ["Inundación + fiebre + dolor de pantorrillas + ojos rojos: leptospirosis.", "Ictericia con transaminasas apenas altas e insuficiencia renal: pensala.", "Se trata con la sospecha."],
    pitfalls: ["Esperar la serología.", "Usar AINE.", "No preguntar por la exposición."],
  },
};
