import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const apendicitisNino: ClinicalCase = {
  id: "apendicitis-perforada-nino",
  level: 2,
  area: "Cirugía",
  setting: "Guardia",
  patient: { age: 4, ageUnit: "años", sex: "M", context: "Lo vieron hace dos días en otra guardia por “gastroenteritis”." },
  frequency: "frecuente",
  intro: "“Hace tres días tiene fiebre, vomita y le duele la panza. Le dijeron que era un virus. Hoy está peor, no quiere caminar y tiene la panza dura.” (relata el padre)",
  vitals: { FC: "146 lpm", FR: "32 rpm", "T°": "39,2 °C", "SatO₂": "97 %", Peso: "17 kg" },
  anamnesis: [
    act("dolor", "¿Dónde le dolía al principio y dónde ahora?", "clave", "“Al principio alrededor del ombligo; ahora en toda la panza.”", "Dolor que migra y luego se generaliza: apendicitis que evoluciona a peritonitis."),
    act("caminar", "¿Camina? ¿Cómo se mueve?", "clave", "“No quiere caminar, se queda quieto, encorvado.”", "Los niños con peritonitis evitan moverse."),
    act("tiempo", "¿Hace cuánto empezó?", "clave", "“Tres días.”", "En menores de 5 años la perforación es frecuente por demora diagnóstica."),
    act("diarrea", "¿Tiene diarrea?", "util", "“Algunas deposiciones blandas y poco.”", "La diarrea escasa puede confundir con gastroenteritis (apéndice pélvico o peritonitis)."),
    act("orina", "¿Le arde al orinar?", "util", "“No.”", "Descarta infección urinaria."),
    act("dibujos", "¿Qué dibujos animados mira?", "neutro", "“Bluey.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Palpación abdominal", "clave", "Abdomen distendido, defensa generalizada, dolor máximo en fosa ilíaca derecha.", "Peritonitis."),
    act("hidratacion", "Hidratación y perfusión", "clave", "Mucosas secas, relleno capilar 3 s.", "Deshidratación con signos de sepsis."),
    act("pulmon", "Auscultación pulmonar", "util", "Normal.", "La neumonía de base derecha puede simular dolor abdominal en niños."),
    act("testiculos", "Testículos", "util", "Normales.", "Descarta torsión."),
  ],
  studies: [
    study("Imágenes", "eco", "Ecografía abdominal", "clave", "Apéndice no compresible de 9 mm con apendicolito, líquido libre y colección en fosa ilíaca derecha.", "Primera imagen en niños: sin radiación."),
    study("Laboratorio", "lab", "Hemograma, PCR, ionograma, función renal", "clave", "Leucocitos 22.000 con neutrofilia, PCR muy alta, Na 132.", "Inflamación grave y deshidratación."),
    study("Microbiología", "hemocultivos", "Hemocultivos", "util", "Pendientes.", "Sepsis."),
    study("Imágenes", "tc", "Tomografía de abdomen de rutina", "innecesario", "No se realizó.", "La ecografía fue diagnóstica; se evita la radiación."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("perforada", "Apendicitis aguda perforada con peritonitis en niño de 4 años", true, "Tres días de dolor que migró a fosa ilíaca derecha y se generalizó, fiebre, vómitos, defensa generalizada y ecografía con apéndice con apendicolito, líquido y colección."),
      dx("gastroenteritis", "Gastroenteritis aguda", false, "No explica la defensa ni la ecografía."),
      dx("adenitis", "Adenitis mesentérica", false, "No da peritonitis ni apéndice engrosado."),
      dx("invaginacion", "Invaginación intestinal", false, "Es más frecuente en lactantes, con dolor cólico y heces en jalea; la ecografía muestra el apéndice."),
      dx("neumonia", "Neumonía basal derecha", false, "Auscultación normal y apéndice patológico."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cirugia", "Cirugía (apendicectomía con lavado peritoneal)", "clave", "La apendicitis perforada con peritonitis generalizada requiere cirugía."),
      mg("atb", "Antibióticos EV contra gram negativos y anaerobios (por ejemplo, ceftriaxona y metronidazol)", "clave", "Se inician antes de la cirugía y se continúan después."),
      mg("fluidos", "Expansión con solución fisiológica y ayuno", "clave", "Corrige la deshidratación antes de la anestesia."),
      mg("analgesia", "Analgesia con opioides", "clave", "No enmascara el diagnóstico y es un derecho del niño."),
      mg("alta-sro", "Sales de rehidratación y control en 24 h", "riesgoso", "Repetiría el error de la primera consulta."),
      mg("laxante", "Enema o laxante por constipación", "riesgoso", "Puede empeorar una peritonitis."),
    ],
  },
  debrief: {
    diagnosis: "Apendicitis aguda perforada con peritonitis y sepsis, en niño de 4 años con diagnóstico inicial erróneo de gastroenteritis.",
    pathologies: [
      { name: "Apendicitis perforada", role: "principal", why: "Apéndice con apendicolito, líquido y colección." },
      { name: "Peritonitis y sepsis", role: "asociada", why: "Por la perforación." },
      { name: "Gastroenteritis, adenitis mesentérica, invaginación, neumonía", role: "diferencial", why: "Simuladores en niños pequeños." },
    ],
    reasoning: [
      "Causa: obstrucción de la luz del apéndice por un apendicolito o hiperplasia linfoide.",
      "Mecanismo: aumento de presión, isquemia de la pared y proliferación bacteriana hasta la perforación; en niños pequeños el epiplón es corto y no logra bloquearla.",
      "Consecuencia: peritonitis generalizada, abscesos, sepsis y deshidratación.",
    ],
    epidemiology:
      "La apendicitis es la urgencia quirúrgica abdominal más frecuente en niños. En menores de 5 años es menos frecuente, pero la tasa de perforación es muy alta (más del 50 %), porque los síntomas son inespecíficos y el niño no los describe bien. Muchas veces el primer diagnóstico es gastroenteritis.",
    management: [
      "Sospecharla en todo niño con dolor abdominal y fiebre, aunque tenga vómitos o algo de diarrea.",
      "Ecografía como primera imagen y laboratorio.",
      "Hidratación, analgesia, antibióticos y cirugía.",
      "Escalas pediátricas (PAS, Alvarado pediátrico) ayudan a decidir.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Recomendaciones sobre abdomen agudo en pediatría.", "Sociedad Argentina de Cirugía Infantil — Consenso de apendicitis."],
    pearls: ["Gastroenteritis sin diarrea importante + dolor que empeora = pensar apendicitis.", "En menores de 5 años, muy alta tasa de perforación.", "Analgesia no enmascara."],
    pitfalls: ["Diagnosticar gastroenteritis sin revisar el abdomen.", "Negar analgesia."],
    tribunal: [
      qa("¿Qué signos clínicos de apendicitis se buscan?", "Dolor en el punto de McBurney, Blumberg (dolor a la descompresión), Rovsing (dolor en fosa ilíaca derecha al comprimir la izquierda), psoas (dolor al extender la cadera derecha), obturador (al rotar internamente la cadera) y, en niños, dolor al saltar o al toser."),
      qa("¿Qué es la escala de Alvarado?", "Una escala de 10 puntos: dolor migratorio, anorexia, náuseas o vómitos, dolor en fosa ilíaca derecha (2), rebote, fiebre, leucocitosis (2) y desviación a la izquierda; 7 o más sugiere apendicitis."),
      qa("¿Por qué los niños pequeños se perforan más?", "Porque los síntomas son inespecíficos, no los pueden describir, el epiplón es corto y no bloquea la infección, la pared del apéndice es delgada y suele haber demora en la consulta y el diagnóstico."),
    ],
  },
};
