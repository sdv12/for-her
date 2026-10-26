import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const cistitis: ClinicalCase = {
  id: "cistitis-mujer-joven",
  level: 1,
  area: "Nefrourología",
  setting: "CAPS",
  patient: { age: 24, ageUnit: "años", sex: "F" },
  frequency: "muy-frecuente",
  intro: "“Desde ayer me arde al orinar, voy al baño a cada rato y siento que no termino de vaciar.”",
  vitals: { TA: "110/70 mmHg", FC: "78 lpm", "T°": "36,6 °C" },
  anamnesis: [
    act("fiebre", "¿Tuvo fiebre, escalofríos o dolor en la cintura?", "clave", "“No, nada de eso.”", "Sin fiebre ni dolor lumbar, la infección está limitada a la vejiga: descarta pielonefritis, que cambia el antibiótico y la duración."),
    act("embarazo", "¿Puede estar embarazada? ¿Cuándo fue su última menstruación?", "clave", "“Me vino hace dos semanas. Tomo anticonceptivos.”", "El embarazo convierte cualquier ITU en complicada y cambia los antibióticos permitidos."),
    act("flujo", "¿Tiene flujo, picazón o dolor en las relaciones?", "clave", "“No.”", "Si los tuviera, pensarías en vaginitis o en uretritis por ITS (clamidia, gonococo), que también dan disuria."),
    act("factores", "¿Tiene diabetes, problemas en los riñones, cálculos o le pusieron una sonda?", "clave", "“No, nada.”", "Son los criterios de ITU complicada; en su ausencia, es una cistitis no complicada y alcanza un tratamiento corto."),
    act("previas", "¿Tuvo infecciones urinarias antes?", "util", "“Una vez, hace dos años.”", "Tres o más por año (o dos en seis meses) es ITU recurrente: ahí cambia el manejo y se pide urocultivo."),
    act("hematuria", "¿Vio sangre en la orina?", "util", "“Hoy la orina salió rosada.”", "La hematuria es frecuente en la cistitis y no indica gravedad por sí sola."),
    act("sexual", "¿Tuvo relaciones sexuales recientes?", "util", "“Sí, empecé una relación hace un mes.”", "La actividad sexual es el principal factor de riesgo en la mujer joven (cistitis “de luna de miel”)."),
    act("atb", "¿Tomó antibióticos en los últimos tres meses?", "util", "“No.”", "El uso reciente aumenta la probabilidad de resistencia y orienta la elección."),
    act("familia", "¿Hay antecedentes cardiovasculares en la familia?", "neutro", "“Mi abuelo tuvo un infarto.”", "No aporta a este motivo de consulta."),
  ],
  exam: [
    act("puno", "Puñopercusión lumbar", "clave", "Negativa en ambos lados.", "Apoya que no hay compromiso renal."),
    act("hipogastrio", "Palpación del hipogastrio", "util", "Dolor leve suprapúbico, sin masa.", "Compatible con inflamación vesical."),
    act("general", "Estado general", "util", "Buen estado general, hidratada, sin aspecto tóxico.", "Una paciente con mal estado general haría pensar en pielonefritis o sepsis urinaria."),
    act("especulo", "Especuloscopía", "innecesario", "Cuello sin flujo patológico.", "Sin síntomas vaginales no hace falta; es una incomodidad que no cambia la conducta."),
  ],
  studies: [
    study("Laboratorio", "tira", "Tira reactiva de orina", "util", "Leucocitos ++, nitritos positivos, sangre +.", "Apoya el diagnóstico (los nitritos indican bacterias que reducen nitratos, como E. coli). En un cuadro típico no es imprescindible."),
    study("Microbiología", "urocultivo", "Urocultivo con antibiograma", "neutro", "E. coli > 100.000 UFC/ml, sensible a nitrofurantoína y fosfomicina; resistente a trimetoprima-sulfametoxazol.", "En un primer episodio típico de cistitis no complicada no es necesario. Sí se pide en embarazo, recurrencia, falla de tratamiento, varones o ITU complicada."),
    study("Laboratorio", "beta", "Test de embarazo (subunidad beta)", "util", "Negativo.", "Útil si hay alguna duda de embarazo, porque cambia el tratamiento."),
    study("Imágenes", "eco", "Ecografía renal y vesical", "innecesario", "Normal.", "No está indicada en una cistitis no complicada."),
    study("Laboratorio", "hemograma", "Hemograma y PCR", "innecesario", "Normales.", "No modifican la conducta en una infección limitada a la vejiga."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("cistitis", "Cistitis aguda no complicada", true, "Disuria, polaquiuria y tenesmo vesical en una mujer joven, no embarazada, sin fiebre ni dolor lumbar y sin factores de complicación."),
      dx("pielo", "Pielonefritis aguda", false, "Daría fiebre, escalofríos, dolor lumbar y puñopercusión positiva."),
      dx("its", "Uretritis por ITS (clamidia o gonococo)", false, "Se sospecha con secreción uretral o vaginal, pareja con síntomas o piuria con urocultivo negativo."),
      dx("vaginitis", "Vaginitis", false, "Predominan el flujo, el prurito y la disuria “externa” (al pasar la orina por la vulva inflamada)."),
      dx("litiasis", "Litiasis urinaria", false, "Daría cólico renal irradiado a genitales; puede asociar hematuria, pero no este síndrome miccional."),
    ],
  },
  management: {
    prompt: "¿Qué tratamiento indicás?",
    options: [
      mg("nitro", "Nitrofurantoína 100 mg cada 12 h durante 5 días", "clave", "Primera elección para cistitis no complicada: buena actividad contra E. coli y baja resistencia local."),
      mg("fosfo", "Fosfomicina trometamol 3 g en dosis única (alternativa)", "util", "Alternativa válida, cómoda por ser dosis única."),
      mg("pautas", "Pautas de alarma: consultar si aparece fiebre, dolor lumbar o vómitos", "clave", "Detecta a tiempo una progresión a pielonefritis."),
      mg("medidas", "Hidratación abundante, no retener la orina y orinar después de las relaciones", "util", "Medidas generales que reducen recurrencias."),
      mg("tms", "Trimetoprima-sulfametoxazol empírico por 3 días", "innecesario", "La resistencia de E. coli a TMS en Argentina supera el umbral (alrededor del 20 %) que lo invalida como empírico."),
      mg("cipro", "Ciprofloxacina por 7 días", "innecesario", "Las quinolonas no se recomiendan para cistitis no complicada: se reservan para infecciones más graves por resistencia y efectos adversos."),
      mg("control", "Urocultivo de control al terminar el tratamiento", "innecesario", "Si los síntomas se resuelven, no hace falta (salvo en el embarazo)."),
    ],
  },
  debrief: {
    diagnosis: "Cistitis aguda no complicada en mujer joven no embarazada.",
    pathologies: [
      { name: "Cistitis aguda no complicada", role: "principal", why: "Síndrome miccional sin fiebre ni dolor lumbar, sin factores de complicación." },
      { name: "Pielonefritis aguda", role: "diferencial", why: "Hay que descartarla siempre: fiebre, dolor lumbar, puñopercusión positiva." },
      { name: "Uretritis por ITS", role: "diferencial", why: "Disuria con secreción o piuria estéril, en contexto de relaciones sin preservativo." },
      { name: "Vaginitis", role: "diferencial", why: "Flujo y prurito con disuria externa." },
      { name: "Litiasis urinaria", role: "diferencial", why: "Cólico y hematuria." },
    ],
    reasoning: [
      "Causa: E. coli uropatógena en alrededor del 80 % de los casos; en mujeres jóvenes sexualmente activas también Staphylococcus saprophyticus. Luego Klebsiella y Proteus.",
      "Mecanismo: la flora intestinal coloniza la zona periuretral y asciende por una uretra corta (unos 4 cm en la mujer). Las fimbrias (tipo 1 y P) permiten adherirse al urotelio y evitar el barrido de la micción.",
      "Consecuencia: inflamación de la mucosa vesical → disuria, polaquiuria, tenesmo, urgencia, dolor suprapúbico y a veces hematuria. Sin invasión del parénquima renal no hay fiebre ni dolor lumbar.",
      "Por eso alcanza un antibiótico que se concentra en orina (nitrofurantoína, fosfomicina) por poco tiempo.",
    ],
    epidemiology:
      "Es una de las consultas más frecuentes en atención primaria. Alrededor de la mitad de las mujeres tendrá al menos una ITU en la vida; el pico está entre los 18 y 30 años, por la actividad sexual y la uretra corta. En un varón joven es rara y, por definición, se maneja como complicada.",
    management: [
      "Confirmar que es no complicada: sin embarazo, sin fiebre ni dolor lumbar, sin alteraciones urológicas, diabetes descompensada, inmunosupresión ni sonda.",
      "En un cuadro típico no hace falta urocultivo; la tira reactiva es opcional.",
      "Antibiótico de primera elección: nitrofurantoína 5 días; alternativa: fosfomicina en dosis única. Evitar trimetoprima-sulfametoxazol y quinolonas como empíricos por la resistencia local.",
      "Pautas de alarma y medidas generales.",
      "Urocultivo si falla, recurre, hay embarazo o es un varón.",
    ],
    sources: [
      "Consenso intersociedades argentino sobre infección urinaria (SADI y sociedades de urología, nefrología y ginecología).",
      "Datos de resistencia antimicrobiana de la red WHONET-Argentina (Malbrán).",
    ],
    pearls: [
      "Cistitis no complicada = mujer, no embarazada, sin fiebre ni dolor lumbar, sin alteración urológica.",
      "Nitritos positivos sugieren enterobacterias (E. coli las reduce); pueden ser negativos con otros gérmenes.",
      "En el embarazo la bacteriuria asintomática sí se busca y se trata.",
    ],
    pitfalls: [
      "Usar ciprofloxacina para todo.",
      "No preguntar por embarazo.",
      "Pedir ecografía en un primer episodio simple.",
    ],
  },
};
