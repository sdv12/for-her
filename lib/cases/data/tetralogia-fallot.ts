import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const tetralogiaFallot: ClinicalCase = {
  id: "tetralogia-de-fallot-crisis",
  level: 3,
  area: "Pediatría",
  setting: "Guardia",
  patient: { age: 5, ageUnit: "meses", sex: "M", context: "Soplo detectado en un control, turno de cardiología pendiente desde hace dos meses." },
  frequency: "poco-frecuente",
  intro: "“Se puso a llorar fuerte después de la mamadera, de golpe quedó azul y respiraba muy rápido. Ahora está decaído.”",
  vitals: { FC: "168 lpm", FR: "64 rpm", "T°": "36,7 °C", "SatO₂": "68 %", Peso: "5,9 kg" },
  anamnesis: [
    act("episodios", "¿Había pasado antes? ¿En qué momento?", "clave", "“Dos veces, al despertarse o al llorar, más cortas.”", "Crisis de hipoxia paroxísticas: típicas al despertar o con el llanto."),
    act("fiebre", "¿Tuvo fiebre, tos o mocos?", "clave", "“No.”", "Sin infección respiratoria: orienta a cardiopatía y no a causa pulmonar."),
    act("alimentacion", "¿Cómo se alimenta y gana peso?", "util", "“Se cansa al tomar, gana poco.”", "Repercusión de la cardiopatía."),
    act("embarazo", "¿Cómo fue el embarazo? ¿Ecografías?", "util", "“Pocos controles.”", "Muchas cardiopatías pueden detectarse antes de nacer."),
    act("posicion", "¿Qué hicieron cuando se puso azul?", "util", "“Lo alzamos llorando.”", "Se enseña la maniobra rodillas al pecho."),
    act("hermanos", "¿Tiene hermanos?", "neutro", "“Una hermana de 3 años.”", "No orienta."),
  ],
  exam: [
    act("cianosis", "Cianosis y perfusión", "clave", "Cianosis central en labios y lengua, relleno de 3 segundos.", "Cianosis central: hipoxemia por cortocircuito."),
    act("corazon", "Auscultación cardíaca", "clave", "Soplo sistólico eyectivo en el borde esternal izquierdo, ahora más suave, segundo ruido único.", "El soplo se debe a la estenosis pulmonar y disminuye en la crisis porque pasa menos sangre."),
    act("pulmon", "Auscultación pulmonar", "clave", "Limpia, sin rales ni sibilancias.", "Taquipnea con pulmones limpios: no es una enfermedad respiratoria."),
  ],
  studies: [
    study("Imágenes", "eco", "Ecocardiograma", "clave", "CIV amplia, aorta cabalgante, estenosis infundibular pulmonar, hipertrofia del VD.", "Confirma la tétrada."),
    study("Imágenes", "rx", "Radiografía de tórax", "util", "Corazón en bota, campos pulmonares con flujo disminuido.", "Imagen clásica."),
    study("Laboratorio", "lab", "Gases, hemograma y glucemia", "util", "Acidosis metabólica leve, hematocrito 48 %.", "Evalúa la repercusión."),
    study("Otros", "hiperoxia", "Esperar al cardiólogo para iniciar el tratamiento", "riesgoso", "No se realizó.", "La crisis es una emergencia y se trata de inmediato."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("fallot", "Crisis de hipoxia por tetralogía de Fallot", true, "Episodios de cianosis con el llanto, pulmones limpios, soplo eyectivo que disminuye y ecocardiograma con la tétrada."),
      dx("bronquiolitis", "Bronquiolitis", false, "No hay catarro, fiebre ni sibilancias."),
      dx("sepsis", "Sepsis del lactante", false, "No hay fiebre ni foco; la hipoxemia es por cortocircuito."),
      dx("convulsion", "Espasmo del sollozo", false, "Es breve y benigno, sin hipoxemia sostenida ni soplo."),
      dx("civ", "CIV aislada", false, "Da hiperflujo pulmonar e insuficiencia cardíaca, no cianosis."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("rodillas", "Calmar, posición de rodillas al pecho", "clave", "Aumenta la resistencia sistémica y reduce el cortocircuito de derecha a izquierda."),
      mg("oxigeno", "Oxígeno y morfina subcutánea o intranasal según protocolo", "clave", "El oxígeno vasodilata el pulmón; la morfina calma y reduce el espasmo infundibular."),
      mg("expansion", "Expansión con solución fisiológica y betabloqueante EV si no cede; bicarbonato si hay acidosis", "clave", "Aumenta la precarga y relaja el infundíbulo."),
      mg("cirugia", "Derivar a cardiocirugía infantil", "clave", "La corrección quirúrgica es el tratamiento definitivo."),
      mg("adrenalina", "Adrenalina o inotrópicos", "riesgoso", "Aumentan el espasmo infundibular y empeoran el cortocircuito."),
      mg("broncodilatadores", "Salbutamol en aerosol", "innecesario", "No hay broncoespasmo y la taquicardia perjudica."),
    ],
  },
  debrief: {
    diagnosis: "Crisis de hipoxia en lactante de 5 meses con tetralogía de Fallot.",
    pathologies: [
      { name: "Tetralogía de Fallot", role: "principal", why: "CIV, estenosis pulmonar, aorta cabalgante e hipertrofia del VD." },
      { name: "Crisis hipoxémica", role: "asociada", why: "Aumenta el cortocircuito de derecha a izquierda." },
      { name: "Bronquiolitis, sepsis, espasmo del sollozo", role: "diferencial", why: "Otras causas de cianosis o decaimiento." },
    ],
    reasoning: [
      "Causa: malformación por desviación anterior del septo infundibular.",
      "Mecanismo: la estenosis pulmonar con CIV deriva sangre no oxigenada a la aorta; el espasmo infundibular o la caída de resistencia sistémica lo aumentan.",
      "Consecuencia: cianosis paroxística, taquipnea, acidosis, riesgo de convulsión y muerte si no se trata.",
    ],
    epidemiology:
      "Las cardiopatías congénitas afectan a cerca de 1 de cada 100 nacidos vivos y son una causa importante de mortalidad infantil en Argentina. La tetralogía de Fallot es la cardiopatía cianótica más frecuente después del período neonatal. La pesquisa con oximetría neonatal ayuda a detectarlas.",
    management: [
      "Calmar, rodillas al pecho, oxígeno.",
      "Morfina, expansión de volumen y betabloqueante según respuesta.",
      "Corregir la acidosis.",
      "Corrección quirúrgica programada, habitualmente en el primer año.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Consenso de cardiopatías congénitas.", "Ministerio de Salud de la Nación — Programa Nacional de Cardiopatías Congénitas."],
    pearls: ["Cianosis con pulmones limpios: pensá en el corazón.", "En la crisis el soplo disminuye.", "Rodillas al pecho aumenta la resistencia sistémica."],
    pitfalls: ["Dar inotrópicos o adrenalina.", "Tratarlo como bronquiolitis."],
    tribunal: [
      qa("¿Cuáles son los cuatro componentes de la tetralogía?", "Comunicación interventricular, estenosis pulmonar infundibular, aorta cabalgante e hipertrofia del ventrículo derecho."),
      qa("¿Qué cardiopatías son cianóticas y cuáles acianóticas?", "Cianóticas: Fallot, transposición de grandes vasos, atresia tricuspídea, tronco arterioso, drenaje venoso anómalo. Acianóticas: CIV, CIA, ductus, coartación, estenosis aórtica y pulmonar."),
      qa("¿Qué es la prueba de hiperoxia?", "Se administra oxígeno al 100 %: en enfermedad pulmonar la PaO2 sube mucho; en la cardiopatía con cortocircuito apenas cambia."),
    ],
  },
};
