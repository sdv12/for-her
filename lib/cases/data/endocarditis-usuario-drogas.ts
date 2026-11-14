import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const endocarditisUsuarioDrogas: ClinicalCase = {
  id: "endocarditis-tricuspidea-udiv",
  level: 3,
  area: "Cardiovascular",
  setting: "Guardia",
  patient: { age: 29, ageUnit: "años", sex: "M", context: "Usa drogas inyectables. En situación de calle." },
  frequency: "poco-frecuente",
  intro: "“Hace una semana tengo fiebre muy alta, tos con flema con sangre y me duele el pecho al respirar.”",
  vitals: { TA: "104/62 mmHg", FC: "122 lpm", FR: "26 rpm", "T°": "39,6 °C", "SatO₂": "92 %" },
  anamnesis: [
    act("drogas", "¿Qué te inyectás y cómo?", "clave", "“Cocaína y a veces heroína, comparto jeringas.”", "Factor de riesgo."),
    act("pulmon", "¿Tos y dolor al respirar?", "clave", "“Tos con sangre.”", "Émbolos sépticos pulmonares."),
    act("vih", "¿Te hiciste VIH y hepatitis?", "clave", "“Nunca. Me dijeron hace poco que tengo hepatitis C.”", "Coinfecciones."),
    act("piel", "¿Infecciones en los sitios de inyección?", "util", "“Un absceso en el brazo.”", "Puerta de entrada."),
    act("previa", "¿Tuviste algo así antes?", "util", "“No.”", "Base."),
    act("familia", "¿Tenés contacto con tu familia?", "neutro", "“Con mi hermana.”", "Red de apoyo."),
  ],
  exam: [
    act("soplo", "Auscultación", "clave", "Soplo holosistólico paraesternal izquierdo que aumenta con la inspiración.", "Insuficiencia tricuspídea."),
    act("brazos", "Brazos", "clave", "Marcas de punción y absceso en antebrazo.", "Puerta de entrada."),
    act("pulmon-ex", "Pulmón", "util", "Rales en ambas bases.", "Émbolos sépticos."),
  ],
  studies: [
    study("Microbiología", "hemocultivos", "Hemocultivos x3", "clave", "Staphylococcus aureus sensible a meticilina en 3/3.", "Criterio mayor."),
    study("Imágenes", "eco", "Ecocardiograma", "clave", "Vegetación de 18 mm en válvula tricúspide con insuficiencia grave.", "Criterio mayor."),
    study("Imágenes", "tc", "TC de tórax", "util", "Múltiples nódulos periféricos cavitados.", "Émbolos sépticos."),
    study("Otros", "atb-sin-cultivo", "Antibiótico empírico antes de tomar hemocultivos", "riesgoso", "No se hizo.", "Negativiza los cultivos."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("ei-tricuspidea", "Endocarditis tricuspídea por S. aureus con émbolos sépticos pulmonares en usuario de drogas inyectables", true, "Fiebre, soplo tricuspídeo, hemocultivos positivos, vegetación tricuspídea y nódulos cavitados."),
      dx("nac", "Neumonía estafilocócica", false, "Vegetación y soplo tricuspídeo."),
      dx("tbc", "Tuberculosis", false, "Hemocultivos positivos y vegetación."),
      dx("tep", "TEP no séptico", false, "Fiebre, bacteriemia y cavitación."),
      dx("ei-aortica", "Endocarditis aórtica", false, "La vegetación es tricuspídea."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("atb", "Cefazolina o cloxacilina EV por 4 a 6 semanas", "clave", "SAMS."),
      mg("reduccion-danos", "Reducción de daños y tratamiento del consumo", "clave", "Previene recurrencias."),
      mg("absceso", "Drenar el absceso del brazo", "clave", "Control del foco."),
      mg("hepatitis-c", "Tratar la hepatitis C", "util", "Coinfección curable."),
      mg("alta-temprana", "Alta temprana con antibiótico oral sin seguimiento", "riesgoso", "Fracaso y muerte."),
      mg("estigmatizar", "Negar cirugía si la necesita por consumir drogas", "riesgoso", "Decisión no ética sin evaluación."),
    ],
  },
  debrief: {
    diagnosis: "Endocarditis tricuspídea por S. aureus sensible a meticilina con émbolos sépticos pulmonares, en varón de 29 años usuario de drogas inyectables con hepatitis C.",
    pathologies: [
      { name: "Endocarditis tricuspídea", role: "principal", why: "Infección de la válvula derecha." },
      { name: "Émbolos sépticos y hepatitis C", role: "asociada", why: "Complicaciones." },
      { name: "Neumonía, TBC", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: inyección de bacterias de la piel con material no estéril.",
      "Mecanismo: daño endotelial tricuspídeo y colonización.",
      "Consecuencia: vegetaciones que embolizan al pulmón.",
    ],
    epidemiology:
      "En usuarios de drogas inyectables la válvula tricúspide es la más afectada y S. aureus el germen principal. Tiene mejor pronóstico que la endocarditis izquierda. La reducción de daños es parte del tratamiento.",
    management: [
      "Hemocultivos.",
      "Eco.",
      "Antibiótico.",
      "Reducción de daños.",
    ],
    sources: ["Sociedad Argentina de Infectología — Endocarditis infecciosa.", "AHA — Infective Endocarditis in Adults: Diagnosis, Antimicrobial Therapy, and Management of Complications."],
    pearls: ["Fiebre y nódulos pulmonares en UDIV.", "Soplo que aumenta con la inspiración.", "Reducción de daños."],
    pitfalls: ["Llamarlo neumonía.", "Estigmatizar."],
    tribunal: [
      qa("¿Qué es el signo de Rivero-Carvallo?", "Aumento del soplo tricuspídeo con la inspiración."),
      qa("¿Qué gérmenes predominan en UDIV?", "S. aureus, seguido de estreptococos, Pseudomonas y Candida."),
      qa("¿Qué es la reducción de daños?", "Medidas para disminuir los riesgos del consumo, como material estéril y tratamiento con opioides de sustitución."),
    ],
  },
};
