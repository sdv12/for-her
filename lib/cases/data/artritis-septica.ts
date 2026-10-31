import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const artritisSeptica: ClinicalCase = {
  id: "artritis-septica-cadera-nino",
  level: 2,
  area: "Traumatología",
  setting: "Guardia",
  patient: { age: 6, ageUnit: "años", sex: "M", context: "Lo trae la mamá." },
  frequency: "poco-frecuente",
  intro: "“Desde ayer renguea y hoy no quiere apoyar la pierna derecha. Tiene fiebre alta y llora si le muevo la cadera.”",
  vitals: { FC: "132 lpm", FR: "24 rpm", "T°": "39,2 °C", Peso: "21 kg" },
  anamnesis: [
    act("apoyo", "¿Puede apoyar la pierna?", "clave", "“No, no quiere pisar.”", "La negativa a apoyar es un criterio de Kocher para artritis séptica."),
    act("fiebre", "¿Cuánta fiebre tuvo?", "clave", "“39,5 desde ayer.”", "Fiebre mayor de 38,5 °C: otro criterio de Kocher."),
    act("virus", "¿Estuvo resfriado hace poco?", "util", "“Hace dos semanas, con mocos.”", "La sinovitis transitoria sigue a menudo a una virosis, pero suele cursar sin fiebre alta."),
    act("trauma", "¿Se golpeó o se cayó?", "util", "“No que sepamos.”", "Un traumatismo menor puede preceder a infecciones osteoarticulares."),
    act("piel", "¿Tuvo heridas o granos infectados?", "util", "“Un grano en la pierna la semana pasada.”", "Puerta de entrada para S. aureus."),
    act("vacunas", "¿Tiene las vacunas al día?", "util", "“Sí.”", "Hace menos probable Haemophilus b."),
    act("dibujos", "¿Qué le gusta jugar?", "neutro", "“A la pelota.”", "No orienta."),
  ],
  exam: [
    act("cadera", "Examen de la cadera derecha", "clave", "Cadera en flexión, abducción y rotación externa; movilidad pasiva muy dolorosa y limitada en todos los planos.", "Posición antálgica que maximiza el volumen articular: derrame a tensión."),
    act("rodilla", "Rodilla y resto del miembro", "util", "Rodilla normal.", "El dolor de cadera puede referirse a la rodilla: siempre se examina la cadera."),
    act("general", "Estado general", "clave", "Decaído, febril, taquicárdico.", "Aspecto tóxico: orienta a infección bacteriana."),
    act("piel", "Piel", "util", "Pequeña costra en la pierna derecha.", "Posible puerta de entrada."),
  ],
  studies: [
    study("Laboratorio", "lab", "Hemograma, eritrosedimentación y PCR", "clave", "Leucocitos 17.500, ERS 62 mm/h, PCR 98 mg/l.", "Leucocitos mayor de 12.000 y ERS mayor de 40 completan los criterios de Kocher (4 de 4: probabilidad muy alta)."),
    study("Imágenes", "eco", "Ecografía de cadera", "clave", "Derrame articular moderado en la cadera derecha.", "Confirma el derrame y guía la punción."),
    study("Otros", "puncion", "Artrocentesis con citoquímico, Gram y cultivo (y hemocultivos)", "clave", "Líquido turbio, 85.000 leucocitos con 92 % de neutrófilos. Gram: cocos gram positivos en racimo. Cultivo: S. aureus.", "Confirma la artritis séptica e identifica el germen."),
    study("Imágenes", "rx", "Radiografía de cadera", "util", "Aumento del espacio articular, sin lesiones óseas.", "Descarta otras causas (Perthes, epifisiólisis) y sirve de basal."),
    study("Imágenes", "tc", "Tomografía de cadera", "innecesario", "No se realizó.", "No aporta frente a la ecografía y suma radiación."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("septica", "Artritis séptica de cadera derecha por S. aureus", true, "Fiebre alta, negativa a apoyar, cadera muy dolorosa, leucocitosis, ERS y PCR altas, derrame y líquido purulento con S. aureus."),
      dx("sinovitis", "Sinovitis transitoria de cadera", false, "Cojera tras virosis, sin fiebre alta, buen estado general y laboratorio casi normal."),
      dx("perthes", "Enfermedad de Legg-Calvé-Perthes", false, "Cojera crónica poco dolorosa sin fiebre, con alteración de la cabeza femoral en la radiografía."),
      dx("osteomielitis", "Osteomielitis femoral aislada", false, "Dolor óseo localizado sin derrame articular purulento."),
      dx("epifisiolisis", "Epifisiólisis femoral", false, "Adolescente con sobrepeso, sin fiebre."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("drenaje", "Drenaje quirúrgico urgente (artrotomía o lavado) de la cadera", "clave", "En la cadera la presión del pus compromete la irrigación de la cabeza femoral: es una urgencia."),
      mg("atb", "Antibiótico endovenoso empírico con cobertura de S. aureus (cefalotina o clindamicina según epidemiología de SAMR) y ajuste por cultivo", "clave", "Se inicia tras tomar las muestras, sin demorar."),
      mg("seguimiento", "Pasar a vía oral según evolución y completar 3–4 semanas; seguimiento traumatológico", "util", "Detecta secuelas (necrosis, deformidad)."),
      mg("aines", "Reposo y antiinflamatorios con control en 48 h", "riesgoso", "Es el manejo de la sinovitis transitoria: en una artritis séptica de cadera, la demora deja secuelas permanentes."),
      mg("atb-sin-puncion", "Antibiótico oral sin punzar", "riesgoso", "Sin drenaje ni cultivo, la infección destruye el cartílago."),
    ],
  },
  debrief: {
    diagnosis: "Artritis séptica de cadera derecha por Staphylococcus aureus en niño de 6 años (4 de 4 criterios de Kocher).",
    pathologies: [
      { name: "Artritis séptica", role: "principal", why: "Infección bacteriana de la articulación." },
      { name: "Sinovitis transitoria", role: "diferencial", why: "El diferencial más frecuente de la cadera dolorosa infantil." },
      { name: "Osteomielitis, Perthes, epifisiólisis", role: "diferencial", why: "Otras causas de cojera." },
    ],
    reasoning: [
      "Causa: Staphylococcus aureus (el más frecuente), que llega por vía hematógena desde una lesión de piel.",
      "Mecanismo: las bacterias en la sinovial generan pus; las enzimas de los neutrófilos destruyen el cartílago y, en la cadera, la presión intraarticular comprime los vasos de la cabeza femoral.",
      "Consecuencia: dolor, impotencia funcional y fiebre; sin drenaje, necrosis avascular, destrucción articular y deformidad.",
    ],
    epidemiology:
      "La artritis séptica es más frecuente en menores de 5 años, con predominio en varones, y afecta sobre todo a la cadera y la rodilla. La sinovitis transitoria, mucho más frecuente, es el principal diagnóstico diferencial en niños con cojera.",
    management: [
      "Sospechar ante fiebre, cojera o negativa a apoyar y articulación dolorosa.",
      "Laboratorio, ecografía y artrocentesis con cultivo; hemocultivos.",
      "Drenaje urgente (sobre todo en cadera) y antibiótico endovenoso.",
      "Completar el tratamiento y seguimiento de secuelas.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Consenso de infecciones osteoarticulares.", "Sociedad Argentina de Ortopedia y Traumatología Infantil — Recomendaciones."],
    pearls: ["Criterios de Kocher: fiebre mayor de 38,5, no apoya, ERS mayor de 40, leucocitos mayor de 12.000.", "Cadera séptica = drenaje urgente.", "Siempre examinar la cadera si duele la rodilla."],
    pitfalls: ["Confundirla con sinovitis transitoria.", "Dar antibiótico sin punzar."],
    tribunal: [
      qa("¿Qué son los criterios de Kocher?", "Fiebre mayor de 38,5 °C, negativa a apoyar, eritrosedimentación mayor de 40 mm/h y leucocitos mayor de 12.000. Con 3 o 4 criterios la probabilidad de artritis séptica es alta (sobre todo con PCR alta)."),
      qa("¿Qué gérmenes causan artritis séptica según la edad?", "Neonatos: S. aureus, estreptococo del grupo B, gram negativos. Niños: S. aureus, Kingella kingae (menores de 4 años), estreptococo del grupo A. Adolescentes y adultos sexualmente activos: también gonococo."),
      qa("¿Qué características tiene el líquido articular séptico?", "Turbio, con más de 50.000 leucocitos y más del 75–90 % de neutrófilos, glucosa baja, Gram y cultivo positivos (aunque pueden ser negativos)."),
    ],
  },
};
