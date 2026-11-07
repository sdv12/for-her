import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const chagasAgudo: ClinicalCase = {
  id: "chagas-agudo-vectorial-nino",
  level: 2,
  area: "Pediatría",
  setting: "CAPS",
  patient: { age: 7, ageUnit: "años", sex: "M", context: "Vive en un rancho de adobe en el norte de Córdoba. Enero. Lo trae la madre." },
  frequency: "poco-frecuente",
  intro: "“Hace 5 días se le hinchó un ojo, sin dolor. Ahora tiene fiebre y le duele un poco la panza. Tenemos vinchucas.”",
  vitals: { FC: "122 lpm", FR: "24 rpm", "T°": "38,4 °C", "SatO₂": "98 %", Peso: "24 kg" },
  anamnesis: [
    act("vinchuca", "¿Dónde duerme? ¿Vieron vinchucas?", "clave", "“En el rancho; hay.”", "Transmisión vectorial."),
    act("ojo", "¿Duele o supura el ojo? ¿Fue un golpe?", "clave", "“No duele ni supura.”", "Signo de Romaña."),
    act("madre", "¿La madre tiene Chagas?", "clave", "“Sí, me dijeron.”", "Vertical y familia."),
    act("sintomas", "¿Falta de aire, palpitaciones, convulsiones?", "util", "“No.”", "Complicaciones."),
    act("vacunas", "¿Vacunas al día?", "util", "“Sí.”", "Base."),
    act("escuela", "¿Va a la escuela?", "neutro", "“Sí.”", "No orienta."),
  ],
  exam: [
    act("ojo-ex", "Ojo", "clave", "Edema bipalpebral unilateral, violáceo, indoloro, ganglio preauricular.", "Romaña."),
    act("cardiaco", "Corazón", "clave", "Taquicardia, sin soplo.", "Miocarditis posible."),
    act("visceras", "Hígado, bazo y ganglios", "util", "Hepatoesplenomegalia leve.", "Fase aguda."),
  ],
  studies: [
    study("Laboratorio", "micro", "Búsqueda directa de parásitos (Strout, gota fresca)", "clave", "Tripomastigotes.", "De elección en agudo."),
    study("Electrofisiología", "ecg", "ECG y radiografía de tórax", "clave", "Taquicardia sinusal.", "Antes de tratar, y vigila miocarditis."),
    study("Laboratorio", "lab", "Hemograma y hepatograma, función renal", "clave", "Linfocitosis leve.", "Basal para el fármaco."),
    study("Laboratorio", "serologia", "Serología sola y esperar 30 días para tratar", "riesgoso", "No se realizó.", "En agudo puede ser negativa; se trata cuando se ve el parásito."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("chagas", "Enfermedad de Chagas aguda vectorial con signo de Romaña", true, "Área endémica, vinchucas, Romaña, fiebre y parasitemia."),
      dx("celulitis", "Celulitis periorbitaria", false, "Indolora, sin puerta bacteriana."),
      dx("mono", "Mononucleosis", false, "No hay faringitis; los parásitos confirman."),
      dx("dengue", "Dengue", false, "No explica el ojo ni el parásito."),
      dx("alergia", "Alergia", false, "No explica la fiebre ni el resto."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("benznidazol", "Benznidazol 60 días, con controles de laboratorio", "clave", "Alta tasa de curación en niños."),
      mg("notificar", "Notificar y fumigar la vivienda; evaluar a la familia", "clave", "Vigilancia."),
      mg("controles", "Control de serología a largo plazo", "clave", "Comprueba curación."),
      mg("efectos", "Vigilar dermatitis y neutropenia", "util", "Efectos adversos."),
      mg("sin-tto", "No tratar porque es leve", "riesgoso", "Riesgo de enfermedad crónica."),
      mg("antibiotico", "Amoxicilina por el ojo", "innecesario", "No es bacteriana."),
    ],
  },
  debrief: {
    diagnosis: "Chagas agudo vectorial, con signo de Romaña, en niño de 7 años del norte de Córdoba.",
    pathologies: [
      { name: "Chagas agudo", role: "principal", why: "Infección por Trypanosoma cruzi." },
      { name: "Riesgo de miocarditis", role: "asociada", why: "Complicación." },
      { name: "Celulitis, dengue", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: T. cruzi, por las heces de Triatoma infestans.",
      "Mecanismo: el parásito entra por mucosas o piel y se disemina.",
      "Consecuencia: fiebre, miocarditis, y Chagas crónico en años.",
    ],
    epidemiology:
      "Argentina es de los países con más casos del continente; se estima que hay más de un millón de personas infectadas. Hoy es más frecuente la vía vertical; la vectorial persiste en el Gran Chaco, incluido el norte de Córdoba. Tratar en la niñez cura la mayoría de los casos.",
    management: [
      "Sospecha en zona endémica.",
      "Parasitología directa.",
      "Benznidazol o nifurtimox.",
      "Notificación y fumigación.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de atención de Chagas.", "OPS — Guía de Chagas."],
    pearls: ["Ojo hinchado indoloro, unilateral: Romaña.", "En agudo, ver el parásito.", "En niños, se cura."],
    pitfalls: ["No preguntar por la vinchuca.", "Solo pedir serología."],
    tribunal: [
      qa("¿Qué es el chagoma?", "Lesión cutánea inflamatoria en la puerta de entrada."),
      qa("¿Qué formas tiene el Chagas crónico?", "Indeterminada, cardíaca, y digestiva con megaesófago o megacolon."),
      qa("¿Qué vías de transmisión hay?", "Vectorial, vertical, transfusional, por trasplante, oral."),
    ],
  },
};
