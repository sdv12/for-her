import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const artritisReumatoideaAdultaMayor: ClinicalCase = {
  id: "artritis-reumatoidea-adulta-mayor",
  level: 3,
  area: "Reumatología",
  setting: "Consultorio",
  patient: { age: 72, ageUnit: "años", sex: "F", context: "Jubilada costurera. Hipertensa. Hasta hace 2 meses estaba bien." },
  frequency: "frecuente",
  intro: "“Me duelen los hombros y las manos, a la mañana estoy dura más de una hora y no puedo abrir frascos.”",
  vitals: { TA: "136/82 mmHg", FC: "80 lpm", "T°": "37,1 °C" },
  anamnesis: [
    act("rigidez", "¿Cuánto dura la rigidez matinal?", "clave", "“Más de una hora.”", "Inflamatoria."),
    act("manos", "¿Qué articulaciones?", "clave", "“Muñecas, nudillos y hombros, de los dos lados.”", "Poliartritis simétrica con hombros."),
    act("cefalea", "¿Dolor de cabeza nuevo, mandíbula al masticar, vista?", "clave", "“No.”", "Arteritis de células gigantes."),
    act("inicio", "¿Cómo empezó?", "util", "“Bastante de golpe.”", "Inicio agudo: típico en mayores."),
    act("peso", "¿Bajó de peso, fiebre?", "util", "“Dos kilos.”", "Síntomas sistémicos."),
    act("costura", "¿Sigue cosiendo?", "neutro", "“Ya no puedo.”", "Impacto funcional."),
  ],
  exam: [
    act("sinovitis", "Articulaciones", "clave", "Sinovitis en carpos y MCF bilaterales, hombros dolorosos.", "Artritis periférica: no es solo polimialgia."),
    act("nodulos", "Nódulos", "util", "No hay.", "Seropositividad."),
    act("arteria", "Arterias temporales", "util", "Normales.", "Sin arteritis."),
  ],
  studies: [
    study("Laboratorio", "fr-acpa", "Factor reumatoideo y anti-CCP", "clave", "FR positivo, anti-CCP muy positivo.", "Artritis reumatoidea."),
    study("Laboratorio", "reactantes", "ERS y PCR", "clave", "ERS 74 mm, PCR 48.", "Actividad."),
    study("Imágenes", "rx-manos", "Radiografía de manos y pies", "util", "Osteopenia yuxtaarticular, sin erosiones.", "Basal."),
    study("Laboratorio", "basales", "Hemograma, hepatograma, creatinina, serologías de hepatitis", "clave", "Normales.", "Antes del metotrexato."),
    study("Otros", "biopsia-temporal", "Biopsia de arteria temporal", "innecesario", "No se hizo.", "Sin síntomas de arteritis."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("ar-tardia", "Artritis reumatoidea de inicio tardío (EORA) seropositiva", true, "Mujer de 72 con poliartritis simétrica de manos y hombros, rigidez prolongada, FR y anti-CCP positivos."),
      dx("pmr", "Polimialgia reumática", false, "Hay sinovitis de manos y anti-CCP positivo."),
      dx("artrosis", "Artrosis", false, "Rigidez prolongada y sinovitis."),
      dx("pseudogota", "Pseudogota poliarticular", false, "Anti-CCP positivo."),
      dx("paraneoplasica", "Artritis paraneoplásica", false, "Serología típica de AR."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("metotrexato", "Metotrexato con ácido fólico", "clave", "Fármaco ancla."),
      mg("prednisona-puente", "Prednisona en dosis bajas como puente por pocos meses", "clave", "Control rápido."),
      mg("hueso", "Calcio, vitamina D y densitometría", "clave", "Corticoides y edad."),
      mg("vacunas", "Vacunas antes de inmunosuprimir (neumococo, gripe, zóster recombinante)", "util", "Prevención de infecciones."),
      mg("kinesio", "Terapia ocupacional", "util", "Función de manos."),
      mg("aines-cronicos", "AINE en dosis plenas como único tratamiento", "riesgoso", "No modifican la enfermedad y dañan riñón y estómago en mayores."),
      mg("corticoide-alto", "Prednisona 40 mg por meses", "riesgoso", "Toxicidad sin necesidad."),
    ],
  },
  debrief: {
    diagnosis: "Artritis reumatoidea de inicio tardío seropositiva con compromiso de hombros, en una mujer de 72 años.",
    pathologies: [
      { name: "Artritis reumatoidea de inicio tardío", role: "principal", why: "AR que empieza después de los 60." },
      { name: "Riesgo de osteoporosis", role: "asociada", why: "Edad y corticoides." },
      { name: "Polimialgia reumática", role: "diferencial", why: "Se superpone en mayores con hombros." },
    ],
    reasoning: [
      "Causa: autoinmunidad.",
      "Mecanismo: sinovitis por linfocitos T y B con anti-CCP.",
      "Consecuencia: dolor, rigidez, erosiones y discapacidad si no se trata.",
    ],
    epidemiology:
      "Hasta un tercio de las AR comienza después de los 60 años. En ellas la relación mujer/varón es menor, el inicio suele ser agudo, con compromiso de hombros y más síntomas sistémicos, lo que la confunde con polimialgia reumática.",
    management: [
      "FR, anti-CCP y reactantes.",
      "Metotrexato precoz.",
      "Corticoide puente.",
      "Vacunas y hueso.",
    ],
    sources: ["Sociedad Argentina de Reumatología — Guía de práctica clínica de artritis reumatoidea.", "EULAR — Recommendations for the management of rheumatoid arthritis."],
    pearls: ["Hombros + manos con sinovitis: no es solo polimialgia.", "Anti-CCP muy específico.", "Metotrexato también en mayores."],
    pitfalls: ["Diagnosticar polimialgia sin mirar las manos.", "AINE solos."],
    tribunal: [
      qa("¿Cómo se distingue la AR de inicio tardío de la polimialgia reumática?", "Por la sinovitis periférica persistente, el anti-CCP positivo y las erosiones en la AR."),
      qa("¿Qué controles requiere el metotrexato?", "Hemograma, hepatograma y creatinina periódicos; evitar alcohol y dar ácido fólico."),
      qa("¿Por qué se vacuna antes de iniciar inmunosupresión?", "Porque la respuesta a las vacunas es menor bajo tratamiento y algunas vivas quedan contraindicadas."),
    ],
  },
};
