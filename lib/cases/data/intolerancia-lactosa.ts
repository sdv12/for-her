import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const intoleranciaLactosa: ClinicalCase = {
  id: "intolerancia-lactosa",
  level: 1,
  area: "Gastroenterología",
  setting: "Consultorio",
  patient: { age: 27, ageUnit: "años", sex: "M", context: "Barista. Empezó a tomar mucho café con leche desde que trabaja en la cafetería." },
  frequency: "muy-frecuente",
  intro: "“Me hincho y tengo diarrea casi todos los días. Pensé que era el café.”",
  vitals: { TA: "118/74 mmHg", FC: "70 lpm", Peso: "74 kg (estable)", "T°": "36,4 °C" },
  anamnesis: [
    act("relacion", "¿Los síntomas aparecen después de algo en particular?", "clave", "“A la hora o dos de los cafés con leche o un helado. Con el café solo no.”", "Relación clara con la lactosa."),
    act("tipo", "¿Cómo son la diarrea y los gases?", "clave", "“Acuosa, con muchos gases y ruidos, sin sangre.”", "Diarrea osmótica."),
    act("alarma", "¿Sangre, fiebre, pérdida de peso, despierta de noche para ir al baño?", "clave", "“No.”", "Sin alarma: funcional u osmótica."),
    act("celiaquia", "¿Algún familiar celíaco o con tiroides?", "clave", "“Que yo sepa, no.”", "La celiaquía puede causar intolerancia secundaria."),
    act("origen", "¿De dónde es su familia?", "util", "“Mi mamá es boliviana, de origen aymara.”", "La hipolactasia del adulto es muy frecuente en pueblos originarios."),
    act("musica", "¿Qué música pone en la cafetería?", "neutro", "“Jazz.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Abdomen", "clave", "Blando, timpánico, ruidos aumentados, indoloro.", "Compatible con fermentación."),
    act("general", "Estado general", "util", "Bueno, sin palidez.", "Sin malabsorción global."),
    act("piel", "Piel", "util", "Sin dermatitis herpetiforme.", "Descarta pista de celiaquía."),
  ],
  studies: [
    study("Otros", "prueba-exclusion", "Prueba de exclusión de lactosa por 2 semanas", "clave", "Desaparecen los síntomas; vuelven al reintroducir.", "Simple y diagnóstica."),
    study("Otros", "aire-espirado", "Test de hidrógeno espirado con lactosa", "util", "Aumento de 40 ppm a los 90 minutos con síntomas.", "Confirma si hay dudas."),
    study("Laboratorio", "anti-tg", "Anticuerpos anti-transglutaminasa IgA con IgA total", "clave", "Negativos.", "Descarta celiaquía."),
    study("Otros", "colonoscopia", "Colonoscopia", "innecesario", "No se hizo.", "Sin alarmas."),
    study("Laboratorio", "alergia-leche", "IgE específica para leche", "innecesario", "No se pidió.", "No es una alergia, es un déficit enzimático."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hipolactasia", "Intolerancia a la lactosa por hipolactasia primaria del adulto", true, "Síntomas osmóticos ligados a lácteos, que desaparecen al excluirlos, sin alarmas y con serología celíaca negativa."),
      dx("sii", "Síndrome de intestino irritable", false, "Hay un desencadenante claro y responde a excluir la lactosa."),
      dx("celiaquia", "Celiaquía", false, "Serología negativa."),
      dx("alergia", "Alergia a la proteína de la leche", false, "No es inmunológica: es un déficit de lactasa."),
      dx("giardiasis", "Giardiasis", false, "Sin viaje ni agua dudosa; respondió a excluir la lactosa."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("reducir", "Reducir la lactosa según tolerancia (suelen tolerarse 12 g por vez)", "clave", "No hace falta eliminarla del todo."),
      mg("deslactosada", "Leche deslactosada, yogur y quesos duros", "clave", "Tienen poca lactosa o lactasa bacteriana."),
      mg("lactasa", "Lactasa en comprimidos con los lácteos", "util", "Alternativa práctica."),
      mg("calcio", "Asegurar el calcio de la dieta", "clave", "Evita déficit óseo."),
      mg("eliminar-todo", "Eliminar todos los lácteos de por vida", "riesgoso", "Innecesario y pone en riesgo el calcio."),
      mg("loperamida", "Loperamida diaria", "innecesario", "Tapa el síntoma sin tratar la causa."),
    ],
  },
  debrief: {
    diagnosis: "Intolerancia a la lactosa por hipolactasia primaria del adulto, en un hombre de 27 años.",
    pathologies: [
      { name: "Hipolactasia primaria del adulto", role: "principal", why: "Descenso genético de la lactasa después de la infancia." },
      { name: "Celiaquía", role: "diferencial", why: "Causa de intolerancia secundaria." },
      { name: "Síndrome de intestino irritable", role: "diferencial", why: "Síntomas superpuestos." },
    ],
    reasoning: [
      "Causa: disminución programada de la lactasa intestinal.",
      "Mecanismo: la lactosa no absorbida atrae agua y las bacterias del colon la fermentan.",
      "Consecuencia: diarrea osmótica, distensión y gases dependientes de la dosis.",
    ],
    epidemiology:
      "Alrededor del 70 % de la población mundial pierde actividad de lactasa en la adultez. Es muy frecuente en pueblos originarios americanos, asiáticos y africanos, y menos en el norte de Europa. Muchos toleran cantidades pequeñas.",
    management: [
      "Prueba de exclusión.",
      "Descartar celiaquía si hay dudas.",
      "Reducir, no eliminar.",
      "Cuidar el calcio.",
    ],
    sources: ["Sociedad Argentina de Gastroenterología — Intolerancia a la lactosa.", "World Gastroenterology Organisation — Lactose intolerance."],
    pearls: ["Relación con lácteos y dosis-dependiente.", "Reducir, no eliminar.", "Intolerancia no es alergia."],
    pitfalls: ["Eliminar todos los lácteos.", "Confundir con alergia a la leche."],
    tribunal: [
      qa("¿Qué diferencia hay entre intolerancia a la lactosa y alergia a la proteína de la leche?", "La intolerancia es un déficit enzimático dosis-dependiente; la alergia es una reacción inmunológica a las proteínas de la leche."),
      qa("¿Qué es la intolerancia a la lactosa secundaria?", "La que aparece por daño de la mucosa intestinal, como en celiaquía, gastroenteritis o Crohn, y suele mejorar al tratar la causa."),
      qa("¿Por qué el yogur se tolera mejor?", "Porque sus bacterias aportan lactasa y parte de la lactosa ya está fermentada."),
    ],
  },
};
