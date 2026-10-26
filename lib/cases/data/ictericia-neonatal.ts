import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const ictericiaNeonatal: ClinicalCase = {
  id: "ictericia-neonatal-lactancia",
  level: 2,
  area: "Pediatría",
  setting: "Guardia",
  patient: { age: 3, ageUnit: "días", sex: "F", context: "Nació a término (39 semanas) por parto vaginal; alta a las 48 h. Primera hija." },
  frequency: "muy-frecuente",
  intro: "“La vemos muy amarilla desde ayer, ahora hasta la panza. Duerme mucho y no sé si se está alimentando bien.”",
  vitals: { FC: "142 lpm", FR: "44 rpm", "T°": "37,2 °C", Peso: "2.980 g (nacimiento: 3.350 g)" },
  anamnesis: [
    act("inicio", "¿Cuándo empezó a ponerse amarilla?", "clave", "“En el sanatorio dijeron que estaba un poquito amarilla al segundo día. Ayer se puso más.”", "Ictericia después de las 24 h orienta a fisiológica o asociada a lactancia; antes de las 24 h siempre es patológica (hemólisis)."),
    act("lactancia", "¿Cuántas veces toma el pecho por día? ¿Cómo prende?", "clave", "“Unas cinco o seis veces; se duerme enseguida. Me duelen los pezones y creo que todavía no me bajó bien la leche.”", "Menos de 8 tomas por día y una técnica inadecuada producen ingesta insuficiente: menos eliminación de bilirrubina por las heces."),
    act("panales", "¿Cuántos pañales moja y cómo son las deposiciones?", "clave", "“Moja dos o tres. La caca sigue siendo oscura.”", "Al tercer día se esperan al menos 3–4 pañales mojados y deposiciones de transición (verdosas a amarillas). Esto confirma ingesta baja."),
    act("grupo", "¿Sabe el grupo sanguíneo suyo y de la beba?", "clave", "“Yo soy A positivo. La beba también, me dijeron.”", "Madre 0 con bebé A o B, o madre Rh negativa con bebé Rh positivo, sugieren hemólisis por incompatibilidad."),
    act("acolia", "¿La caca es blanca o la orina muy oscura?", "clave", "“No, la caca es oscura y la orina clarita.”", "Acolia y coluria indican hiperbilirrubinemia directa (colestasis, atresia de vías biliares): urgencia diagnóstica."),
    act("hermanos", "¿Algún familiar tuvo ictericia que necesitó luz o anemia hereditaria?", "util", "“No que sepamos.”", "Antecedentes de esferocitosis o déficit de G6PD sugieren hemólisis."),
    act("visitas", "¿Tuvieron muchas visitas?", "neutro", "“Sí, los abuelos todos los días.”", "No orienta."),
  ],
  exam: [
    act("kramer", "Extensión de la ictericia (zonas de Kramer)", "clave", "Ictericia en cara, tronco y hasta los muslos (zona 3–4).", "La progresión cefalocaudal estima de forma grosera el nivel de bilirrubina; siempre se confirma con dosaje."),
    act("hidratacion", "Hidratación y pérdida de peso", "clave", "Mucosas algo secas, fontanela normotensa. Pérdida del 11 % del peso de nacimiento.", "Una pérdida mayor al 10 % indica alimentación insuficiente."),
    act("neuro", "Tono, succión y reflejos", "clave", "Algo somnolienta, succión débil pero presente, tono normal, sin opistótonos ni llanto agudo.", "Hipertonía, opistótonos y llanto agudo sugieren encefalopatía bilirrubínica aguda: urgencia."),
    act("visceras", "Hígado y bazo", "util", "Sin hepatoesplenomegalia.", "La visceromegalia orientaría a hemólisis o infección congénita."),
    act("mamas", "Observar una mamada", "util", "Prende solo del pezón, con la boca poco abierta.", "Permite corregir la técnica en el momento."),
  ],
  studies: [
    study("Laboratorio", "bili", "Bilirrubina total y directa", "clave", "Total 19 mg/dl a las 72 h de vida; directa 0,6 mg/dl.", "Hiperbilirrubinemia indirecta por encima del umbral de luminoterapia para su edad en horas."),
    study("Laboratorio", "hemolisis", "Hematocrito, reticulocitos, grupo y factor, prueba de Coombs directa", "clave", "Hto 54 %, reticulocitos 2 %, A positivo, Coombs negativa.", "Descarta hemólisis (incompatibilidad, esferocitosis)."),
    study("Laboratorio", "sodio", "Ionograma", "util", "Na 147 mEq/l.", "Hipernatremia leve por deshidratación asociada a la lactancia insuficiente."),
    study("Imágenes", "eco", "Ecografía abdominal", "innecesario", "No se realizó.", "Solo ante hiperbilirrubinemia directa (colestasis)."),
    study("Laboratorio", "tsh", "Hormonas tiroideas", "innecesario", "Pesquisa neonatal pendiente (se toma al alta).", "El hipotiroidismo congénito da ictericia prolongada; se detecta con la pesquisa neonatal obligatoria."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("lactancia", "Hiperbilirrubinemia indirecta asociada a lactancia insuficiente", true, "Ictericia tras las 24 h, pocas tomas, pérdida del 11 % del peso, pocos pañales, bilirrubina indirecta alta, sin hemólisis."),
      dx("fisiologica", "Ictericia fisiológica", false, "Es leve, con buena alimentación y bilirrubina bajo el umbral de tratamiento; acá supera el umbral y hay pérdida de peso excesiva."),
      dx("abo", "Enfermedad hemolítica por incompatibilidad ABO", false, "Requiere madre 0 y bebé A o B; ictericia precoz y Coombs o reticulocitos alterados."),
      dx("atresia", "Atresia de vías biliares", false, "Hiperbilirrubinemia directa con acolia y coluria, en general después de las 2 semanas."),
      dx("leche", "Ictericia por leche materna", false, "Aparece después de la primera semana en un bebé que aumenta bien de peso; no se asocia a ingesta insuficiente."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("luminoterapia", "Luminoterapia (internación conjunta con la madre)", "clave", "La bilirrubina supera el umbral para su edad en horas y factores de riesgo según las curvas de referencia."),
      mg("lactancia", "Sostener la lactancia: 8–12 tomas por día, corregir la prendida y apoyo de puericultura", "clave", "Corregir la causa: más ingesta → más deposiciones → más eliminación de bilirrubina."),
      mg("control", "Control de bilirrubina a las 12–24 h y control de peso", "clave", "Verifica el descenso; hay que vigilar el rebote al suspender la luminoterapia."),
      mg("complemento", "Complementar con leche extraída o fórmula si la ingesta sigue siendo insuficiente", "util", "Con pérdida mayor al 10 %, puede hacer falta un complemento transitorio sin abandonar el pecho."),
      mg("suspender", "Suspender la lactancia materna", "riesgoso", "No corresponde: el problema es la poca ingesta, no la leche. Suspenderla pone en riesgo la lactancia."),
      mg("agua", "Darle agua o suero glucosado", "riesgoso", "No baja la bilirrubina (se elimina por las heces, no por la orina) y reduce la ingesta de leche."),
      mg("sol", "Exponerla al sol en la ventana", "riesgoso", "Es ineficaz e implica riesgo de quemaduras e hipotermia."),
    ],
  },
  debrief: {
    diagnosis: "Hiperbilirrubinemia indirecta asociada a lactancia insuficiente, con pérdida de peso del 11 % e hipernatremia leve, en recién nacida de término de 3 días.",
    pathologies: [
      { name: "Hiperbilirrubinemia indirecta por lactancia insuficiente", role: "principal", why: "Ictericia con baja ingesta y sin hemólisis." },
      { name: "Deshidratación hipernatrémica leve", role: "asociada", why: "Pérdida del 11 % del peso con sodio de 147." },
      { name: "Enfermedad hemolítica (ABO o Rh)", role: "diferencial", why: "Se descarta con grupos, Coombs y reticulocitos." },
      { name: "Atresia de vías biliares", role: "diferencial", why: "Hiperbilirrubinemia directa con acolia." },
      { name: "Hipotiroidismo congénito", role: "diferencial", why: "Ictericia prolongada; se detecta con la pesquisa." },
    ],
    reasoning: [
      "Causa: el recién nacido produce más bilirrubina (más glóbulos rojos y de vida más corta) y su hígado conjuga menos (baja actividad de la glucuroniltransferasa).",
      "Mecanismo: con poca ingesta hay menos deposiciones; la bilirrubina conjugada que llega al intestino se desconjuga y se reabsorbe (circulación enterohepática aumentada).",
      "Consecuencia: aumento de la bilirrubina indirecta, liposoluble, que tiñe la piel en sentido cefalocaudal. Si supera la capacidad de la albúmina, cruza la barrera hematoencefálica y se deposita en los ganglios basales (kernicterus).",
      "La luminoterapia transforma la bilirrubina en isómeros hidrosolubles que se eliminan sin necesidad de conjugarse.",
    ],
    epidemiology:
      "La ictericia es visible en el 60 % de los recién nacidos de término y en el 80 % de los prematuros. Es una de las causas más frecuentes de consulta y reinternación en la primera semana. La forma asociada a lactancia insuficiente predomina en primerizas, altas precoces y bebés de 35–38 semanas. Es algo más frecuente en varones y en descendientes de asiáticos.",
    management: [
      "Evaluar a todo recién nacido con ictericia: edad en horas, factores de riesgo, alimentación y pérdida de peso.",
      "Confirmar con bilirrubina total y directa; interpretar según la edad en horas (curvas de luminoterapia y exanguinotransfusión).",
      "Descartar hemólisis (grupo, Coombs, reticulocitos) y colestasis (bilirrubina directa elevada, acolia).",
      "Luminoterapia según umbral, sin suspender la lactancia; exanguinotransfusión ante niveles muy altos o signos neurológicos.",
      "Apoyo a la lactancia, control a las 24–48 h del alta y de peso; pesquisa neonatal completa.",
    ],
    sources: [
      "Sociedad Argentina de Pediatría — Recomendaciones para el manejo del recién nacido de término con hiperbilirrubinemia.",
      "Ministerio de Salud de la Nación — Guía para la atención del parto normal y el control del recién nacido; Programa Nacional de Pesquisa Neonatal.",
    ],
    pearls: [
      "Ictericia en las primeras 24 h = patológica siempre.",
      "Acolia y coluria = bilirrubina directa: pensar en atresia de vías biliares.",
      "La bilirrubina se elimina por las heces: agua o suero no sirven.",
    ],
    pitfalls: ["Suspender la lactancia.", "Estimar la bilirrubina solo “a ojo”.", "Dar el alta temprana sin control en 48 h."],
  },
};
