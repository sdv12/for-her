import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const chagasCongenito: ClinicalCase = {
  id: "chagas-congenito",
  level: 1,
  area: "Salud comunitaria",
  setting: "Internación",
  patient: { age: 2, ageUnit: "días", sex: "M", context: "Recién nacido de término, en internación conjunta. La mamá nació en Santiago del Estero." },
  frequency: "frecuente",
  intro: "La pediatra de sala te pide que revises a este recién nacido antes del alta: en el control prenatal, la serología para Chagas de la mamá dio positiva. El bebé está bien, toma el pecho y no tiene síntomas.",
  vitals: { FC: "138 lpm", FR: "42 rpm", "T°": "36,8 °C", Peso: "3.250 g" },
  anamnesis: [
    act("serologia-madre", "¿Cómo se confirmó la serología de la mamá?", "clave", "Dos técnicas reactivas (ELISA y hemaglutinación) en el segundo trimestre.", "El diagnóstico de Chagas crónico requiere dos técnicas serológicas distintas reactivas."),
    act("tratamiento-madre", "¿La mamá recibió tratamiento antiparasitario alguna vez?", "clave", "“No, me enteré en este embarazo.”", "Las mujeres tratadas antes del embarazo casi no transmiten: por eso se las trata en edad fértil (no durante el embarazo)."),
    act("hermanos", "¿Tiene otros hijos? ¿Se estudiaron?", "clave", "“Una nena de 4 años, nunca la estudiaron.”", "Todos los hijos de una madre con Chagas deben estudiarse: el tratamiento en la infancia cura."),
    act("embarazo", "¿Cómo fue el embarazo y el parto?", "util", "“Normal, a término, parto vaginal.”", "La prematurez y el bajo peso son más frecuentes en el Chagas congénito sintomático."),
    act("vivienda", "¿Cómo es la vivienda donde se crió la mamá? ¿Vio vinchucas?", "util", "“En el campo, rancho de adobe; vinchucas había muchas.”", "Antecedente epidemiológico de transmisión vectorial en la madre."),
    act("lactancia", "¿Está tomando el pecho?", "util", "“Sí, exclusivo.”", "El Chagas no contraindica la lactancia."),
    act("transfusion", "¿La mamá recibió transfusiones?", "util", "“No.”", "Otra vía de transmisión, hoy controlada."),
    act("nombre", "¿Cómo se llama el bebé?", "neutro", "“Santino.”", "No orienta."),
  ],
  exam: [
    act("visceras", "Palpación de hígado y bazo", "clave", "Sin hepatoesplenomegalia.", "La hepatoesplenomegalia es el signo más frecuente del Chagas congénito sintomático; la mayoría es asintomática."),
    act("general", "Examen general, piel y tono", "util", "Activo, rosado, tono y reflejos normales, sin ictericia ni edemas.", "Edemas, ictericia, hipotonía o convulsiones indicarían formas graves."),
    act("cardio", "Auscultación cardíaca", "util", "Normal.", "Una miocarditis congénita daría taquicardia o insuficiencia cardíaca."),
    act("peso", "Peso y edad gestacional", "util", "Adecuado para la edad gestacional.", "Bajo peso y prematurez son más frecuentes en las formas sintomáticas."),
  ],
  studies: [
    study("Laboratorio", "microhematocrito", "Micrométodo (microhematocrito) en sangre del recién nacido", "clave", "Se observan tripomastigotes de Trypanosoma cruzi.", "Es el método de elección en el primer mes: detecta parásitos directamente. Si es positivo, confirma el Chagas congénito."),
    study("Laboratorio", "serologia-rn", "Serología (ELISA) al recién nacido para diagnosticar", "innecesario", "Reactiva.", "En los primeros 8–10 meses la serología refleja los anticuerpos IgG de la madre que pasaron por la placenta: no sirve para diagnosticar."),
    study("Laboratorio", "lab", "Hemograma y hepatograma basales", "util", "Normales.", "Base antes de iniciar el benznidazol."),
    study("Electrofisiología", "ecg", "Electrocardiograma", "util", "Normal para la edad.", "Basal; busca compromiso cardíaco."),
    study("Imágenes", "eco-cerebral", "Ecografía cerebral", "neutro", "Normal.", "Se pide en formas sintomáticas o con signos neurológicos."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("congenito", "Chagas congénito confirmado (micrométodo positivo), asintomático", true, "Madre con Chagas crónico no tratado y parásitos visibles en el micrométodo del recién nacido."),
      dx("pasivos", "Anticuerpos maternos sin infección", false, "La serología reactiva del recién nacido puede ser solo materna, pero acá hay parásitos en sangre."),
      dx("toxo", "Toxoplasmosis congénita", false, "Daría coriorretinitis, calcificaciones o hidrocefalia, con serología específica; no explica los tripomastigotes."),
      dx("sano", "Recién nacido sano, sin necesidad de seguimiento", false, "Con madre positiva siempre hay seguimiento; y acá el micrométodo es positivo."),
      dx("cmv", "Infección congénita por citomegalovirus", false, "Hipoacusia, petequias, microcefalia, calcificaciones periventriculares; no explica el hallazgo parasitológico."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("benznidazol", "Tratamiento con benznidazol (5–7 mg/kg/día) por 60 días, con controles", "clave", "En el primer año la curación es cercana al 100 % y la tolerancia es muy buena."),
      mg("hermana", "Estudiar a la hermana de 4 años (serología) y tratarla si es positiva", "clave", "El tratamiento en la infancia es muy eficaz."),
      mg("madre", "Tratar a la mamá al terminar la lactancia y notificar al SNVS", "clave", "Previene la transmisión a futuros hijos y su propia evolución; el Chagas congénito es de notificación obligatoria."),
      mg("seguimiento", "Control clínico y de laboratorio durante el tratamiento y serología al final del seguimiento para confirmar la curación", "util", "La negativización serológica confirma la cura."),
      mg("lactancia", "Suspender la lactancia materna", "riesgoso", "El Chagas no se transmite por la leche (salvo sangrado del pezón): suspenderla priva al bebé de sus beneficios."),
      mg("esperar", "Esperar a la serología de los 10 meses para decidir el tratamiento", "riesgoso", "Con micrométodo positivo el diagnóstico ya está confirmado; demorar el tratamiento no tiene sentido."),
    ],
  },
  debrief: {
    diagnosis: "Chagas congénito confirmado por micrométodo en recién nacido asintomático, hijo de madre con Chagas crónico no tratado.",
    pathologies: [
      { name: "Chagas congénito", role: "principal", why: "Transmisión transplacentaria de Trypanosoma cruzi." },
      { name: "Chagas crónico materno", role: "asociada", why: "Fuente de la infección; también la hermana puede estar infectada." },
      { name: "Anticuerpos maternos pasivos", role: "diferencial", why: "Por eso no se usa la serología antes de los 8–10 meses." },
      { name: "Otras infecciones congénitas (TORCH)", role: "diferencial", why: "Cuadros neonatales parecidos en las formas sintomáticas." },
    ],
    reasoning: [
      "Causa: la madre tiene Chagas crónico (adquirido por vía vectorial en la infancia) con parasitemia baja persistente.",
      "Mecanismo: el parásito atraviesa la placenta durante el embarazo e infecta al feto en alrededor del 5 % de los casos.",
      "Consecuencia: la mayoría de los recién nacidos son asintomáticos; algunos tienen hepatoesplenomegalia, prematurez, bajo peso, miocarditis o meningoencefalitis. Sin tratamiento, de adultos pueden desarrollar la forma cardíaca o digestiva.",
      "Tratado en el primer año, se cura casi siempre: por eso se busca activamente en todos los hijos de madres positivas.",
    ],
    epidemiology:
      "En la Argentina se estima que hay alrededor de 1,5 millones de personas con Chagas, y la vía vertical es hoy la principal forma de transmisión. Nacen aproximadamente 1.000 a 1.500 niños con Chagas congénito por año. La Ley 26.281 establece el tamizaje obligatorio de embarazadas y el estudio de sus hijos. No hay diferencias por sexo.",
    management: [
      "Serología para Chagas a todas las embarazadas (dos técnicas).",
      "Hijo de madre positiva: micrométodo al nacer o en el primer mes; si es negativo, serología a los 10 meses.",
      "Micrométodo positivo o serología positiva a los 10 meses: tratamiento con benznidazol o nifurtimox por 60 días.",
      "Estudiar a todos los hermanos; tratar a la madre después de la lactancia (y a las mujeres en edad fértil antes de un embarazo).",
      "Notificación obligatoria y control del vector en zonas endémicas.",
    ],
    sources: [
      "Ministerio de Salud de la Nación — Guía para la atención al paciente infectado con Trypanosoma cruzi (enfermedad de Chagas).",
      "Ley 26.281 de Prevención y Control del Chagas.",
    ],
    pearls: ["Antes de los 10 meses, la serología del bebé es la de la madre.", "Micrométodo positivo = tratar.", "No se suspende la lactancia."],
    pitfalls: ["Diagnosticar con serología al recién nacido.", "No estudiar a los hermanos.", "Perder el seguimiento a los 10 meses."],
    tribunal: [
      qa("¿Cuál es el algoritmo diagnóstico del Chagas congénito?", "Hijo de madre positiva: micrométodo (microhematocrito) al nacer o en el primer mes. Positivo: tratar. Negativo: serología a los 10 meses (cuando ya no hay anticuerpos maternos); si es positiva, tratar; si es negativa, se descarta."),
      qa("¿Qué fármacos se usan y cómo se toleran en los niños?", "Benznidazol o nifurtimox por 60 días. En lactantes la tolerancia es muy buena; en adultos son más frecuentes la dermatitis, los trastornos digestivos, la neuropatía y la leucopenia."),
      qa("¿Por qué se trata a las mujeres en edad fértil y no durante el embarazo?", "Porque el tratamiento previo al embarazo reduce casi a cero la transmisión vertical, y los antiparasitarios no se usan en el embarazo por falta de seguridad."),
      qa("¿Qué es el chagoma y el signo de Romaña?", "Manifestaciones de la puerta de entrada en el Chagas agudo vectorial: el chagoma es una lesión inflamatoria en la piel; el signo de Romaña es el edema bipalpebral unilateral indoloro con conjuntivitis cuando el parásito entra por el ojo."),
    ],
  },
};
