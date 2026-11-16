import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const pielonefritisVaron: ClinicalCase = {
  id: "pielonefritis-varon",
  level: 3,
  area: "Nefrourología",
  setting: "Guardia",
  patient: { age: 45, ageUnit: "años", sex: "M", context: "Chofer de larga distancia. Tuvo un cálculo renal hace 5 años. Toma poca agua." },
  frequency: "frecuente",
  intro: "“Tengo fiebre con escalofríos, me arde al orinar y me duele la cintura del lado izquierdo.”",
  vitals: { TA: "112/70 mmHg", FC: "112 lpm", FR: "20 rpm", "T°": "39,2 °C" },
  anamnesis: [
    act("urinarios", "¿Ardor, urgencia, chorro débil?", "clave", "“Ardor y voy a cada rato, poquito.”", "Síntomas urinarios bajos."),
    act("colico", "¿Tuvo dolor tipo cólico antes de la fiebre?", "clave", "“Hace 4 días un dolor fuerte que bajaba a la ingle.”", "Posible litiasis obstructiva."),
    act("prostata", "¿Dolor en el periné o al eyacular?", "clave", "“No.”", "Prostatitis."),
    act("sexual", "¿Relaciones sin preservativo, secreción por la uretra?", "util", "“No.”", "Uretritis."),
    act("previas", "¿Tuvo infecciones urinarias antes?", "util", "“Nunca.”", "En el varón toda ITU es complicada."),
    act("ruta", "¿Qué ruta hace?", "neutro", "“Córdoba-Rosario.”", "No orienta."),
  ],
  exam: [
    act("puno", "Puñopercusión", "clave", "Positiva a izquierda.", "Pielonefritis."),
    act("tacto", "Tacto rectal suave", "clave", "Próstata no dolorosa, de tamaño normal.", "Descarta prostatitis aguda."),
    act("perfusion", "Perfusión", "util", "Relleno capilar de 2 segundos.", "Sin shock."),
  ],
  studies: [
    study("Laboratorio", "orina", "Orina completa y urocultivo antes del antibiótico", "clave", "Leucocituria, nitritos positivos; E. coli.", "Confirma."),
    study("Microbiología", "hemocultivos", "Hemocultivos", "clave", "E. coli en 1 de 2.", "Bacteriemia."),
    study("Imágenes", "eco", "Ecografía renal urgente", "clave", "Hidronefrosis izquierda moderada con lito de 8 mm en uréter proximal.", "Obstrucción: urgencia urológica."),
    study("Laboratorio", "lab", "Hemograma, creatinina, lactato", "util", "Leucocitos 19.000, creatinina 1,4, lactato 2,4.", "Gravedad."),
    study("Otros", "psa", "PSA en la urgencia", "innecesario", "No se pidió.", "Se eleva con la infección y no aporta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("pna-obstructiva", "Pielonefritis aguda obstructiva izquierda por litiasis ureteral con bacteriemia", true, "Fiebre, puñopercusión positiva, urocultivo y hemocultivo con E. coli e hidronefrosis por lito."),
      dx("prostatitis", "Prostatitis aguda", false, "Próstata no dolorosa."),
      dx("colico-simple", "Cólico renal no complicado", false, "Hay fiebre y bacteriemia."),
      dx("epididimitis", "Orquiepididimitis", false, "Sin dolor escrotal."),
      dx("pna-simple", "Pielonefritis no complicada", false, "Varón con obstrucción: siempre complicada."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("desobstruir", "Desobstrucción urgente: catéter doble J o nefrostomía", "clave", "Riñón obstruido e infectado: drenar es lo que salva."),
      mg("atb-ev", "Ceftriaxona endovenosa o según epidemiología, ajustar con cultivo", "clave", "Tratamiento de la infección."),
      mg("hidratacion", "Hidratación y analgesia", "clave", "Sostén."),
      mg("litotricia-diferida", "Tratar el cálculo recién cuando se resuelva la infección", "util", "Nunca litotricia con infección activa."),
      mg("litotricia-ya", "Ureteroscopía con litotricia en la urgencia", "riesgoso", "Con infección activa puede causar sepsis grave."),
      mg("ambulatorio", "Ciprofloxacina oral y alta", "riesgoso", "Obstrucción con bacteriemia."),
    ],
  },
  debrief: {
    diagnosis: "Pielonefritis aguda obstructiva por litiasis ureteral izquierda con bacteriemia por E. coli, en un hombre de 45 años.",
    pathologies: [
      { name: "Pielonefritis obstructiva", role: "principal", why: "Infección por encima de una obstrucción." },
      { name: "Litiasis ureteral", role: "asociada", why: "Causa de la obstrucción." },
      { name: "Prostatitis aguda", role: "diferencial", why: "Otra ITU febril del varón." },
    ],
    reasoning: [
      "Causa: lito que obstruye el uréter.",
      "Mecanismo: la orina estancada se infecta y pasa a la sangre.",
      "Consecuencia: sepsis urinaria grave si no se drena.",
    ],
    epidemiology:
      "La ITU en varones jóvenes es poco frecuente y siempre se considera complicada: obliga a buscar obstrucción, litiasis o patología prostática. La pielonefritis obstructiva es una de las principales causas de sepsis urinaria y una urgencia urológica.",
    management: [
      "Urocultivo y hemocultivos.",
      "Ecografía urgente.",
      "Drenaje de la vía urinaria.",
      "Antibiótico y tratamiento diferido del cálculo.",
    ],
    sources: ["Sociedad Argentina de Urología — Litiasis complicada.", "EAU — Guidelines on Urological Infections."],
    pearls: ["Varón con ITU: buscá la causa.", "Fiebre + cólico + hidronefrosis = drenar.", "No litotricia con infección."],
    pitfalls: ["Tratar ambulatorio.", "No pedir ecografía."],
    tribunal: [
      qa("¿Por qué toda ITU en el varón se considera complicada?", "Porque la uretra larga y la próstata protegen, y una infección sugiere una alteración anatómica o funcional."),
      qa("¿Qué se hace ante un riñón obstruido e infectado?", "Drenaje urgente con catéter doble J o nefrostomía percutánea, más antibiótico."),
      qa("¿Por qué no se rompe el cálculo en la urgencia?", "Porque manipular la vía urinaria infectada puede liberar bacterias y causar shock séptico."),
    ],
  },
};
