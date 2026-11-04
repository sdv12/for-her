import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hipotiroidismoCongenito: ClinicalCase = {
  id: "hipotiroidismo-congenito-pesquisa",
  level: 1,
  area: "Pediatría",
  setting: "CAPS",
  patient: { age: 10, ageUnit: "días", sex: "F", context: "La llamaron del programa de pesquisa neonatal porque la TSH del talón salió alta." },
  frequency: "poco-frecuente",
  intro: "“Me llamaron para que traiga a la beba porque salió algo alto en el análisis del talón. Está tranquila, duerme mucho.” (relata la madre)",
  vitals: { FC: "112 lpm", FR: "38 rpm", "T°": "36,2 °C", Peso: "3,3 kg" },
  anamnesis: [
    act("pesquisa", "¿Cuándo le hicieron la prueba del talón?", "clave", "“A las 48 horas de nacer.”", "La pesquisa neonatal se hace entre las 36 h y los 5 días."),
    act("sintomas", "¿Duerme mucho, le cuesta despertarse para comer, está constipada?", "clave", "“Duerme mucho, hay que despertarla, hace caca cada dos días.”", "Síntomas sutiles de hipotiroidismo; la mayoría son asintomáticos al nacer."),
    act("ictericia", "¿Sigue amarilla?", "util", "“Un poco.”", "Ictericia prolongada: signo de hipotiroidismo."),
    act("madre", "¿Tenés problemas de tiroides o tomaste antitiroideos?", "util", "“No.”", "Descarta causas transitorias."),
    act("lactancia", "¿Toma el pecho?", "util", "“Sí, pero se duerme.”", "Succión débil."),
    act("nombre", "¿Cómo se llama?", "neutro", "“Catalina.”", "No orienta."),
  ],
  exam: [
    act("fontanela", "Fontanelas y facies", "clave", "Fontanela posterior amplia, macroglosia leve.", "Signos de hipotiroidismo."),
    act("abdomen", "Abdomen", "util", "Hernia umbilical.", "Frecuente en el hipotiroidismo congénito."),
    act("piel", "Piel", "util", "Ictericia leve, piel seca y fría.", "Signos asociados."),
  ],
  studies: [
    study("Laboratorio", "confirmacion", "TSH y T4 libre en sangre venosa (confirmación)", "clave", "TSH 120 mUI/l, T4 libre baja.", "Confirma hipotiroidismo congénito."),
    study("Imágenes", "eco", "Ecografía de tiroides (sin demorar el tratamiento)", "util", "Glándula ausente en el cuello.", "Disgenesia tiroidea (atireosis o ectopia)."),
    study("Otros", "esperar-repetir", "Repetir el talón en un mes antes de tratar", "riesgoso", "No se realizó.", "Cada semana sin tratamiento daña el neurodesarrollo."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hc", "Hipotiroidismo congénito primario por disgenesia tiroidea, detectado por pesquisa neonatal", true, "TSH de talón alta confirmada en sangre (TSH 120, T4 libre baja), con signos sutiles y ecografía sin glándula en el cuello."),
      dx("transitorio", "Hipertirotropinemia transitoria", false, "La TSH es muy alta con T4 baja y no hay glándula."),
      dx("normal", "Falso positivo de la pesquisa", false, "La confirmación en sangre venosa es patológica."),
      dx("central", "Hipotiroidismo central", false, "La TSH está alta: es primario."),
      dx("ictericia-lactancia", "Ictericia por lactancia", false, "El laboratorio confirma hipotiroidismo."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("levotiroxina", "Levotiroxina 10–15 µg/kg/día de inmediato, triturada con poca leche o agua", "clave", "El inicio antes de las 2 semanas de vida asegura un desarrollo neurológico normal."),
      mg("seguimiento", "Control de TSH y T4 a las 2 semanas y luego seriados con endocrinología pediátrica", "clave", "Ajuste de dosis según el crecimiento."),
      mg("educacion", "Explicar que es un tratamiento de por vida, que no hay que suspenderlo, y que no se dé junto con soja o hierro", "clave", "Adherencia y absorción."),
      mg("desarrollo", "Seguimiento del desarrollo y la audición", "util", "Detección de secuelas."),
      mg("esperar", "Esperar a los 3 meses para ver si se normaliza sola", "riesgoso", "Riesgo de discapacidad intelectual irreversible."),
      mg("suspender-lactancia", "Suspender la lactancia materna", "innecesario", "No hay motivo."),
    ],
  },
  debrief: {
    diagnosis: "Hipotiroidismo congénito primario por disgenesia tiroidea (atireosis o ectopia), detectado por pesquisa neonatal, en recién nacida de 10 días.",
    pathologies: [
      { name: "Hipotiroidismo congénito", role: "principal", why: "Déficit de hormona tiroidea desde el nacimiento." },
      { name: "Disgenesia tiroidea", role: "asociada", why: "Causa más frecuente." },
      { name: "Hipertirotropinemia transitoria, falso positivo", role: "diferencial", why: "Se descartan con la confirmación." },
    ],
    reasoning: [
      "Causa: la tiroides no se formó o quedó ectópica durante el desarrollo.",
      "Mecanismo: sin hormona tiroidea, el cerebro en desarrollo no madura (mielinización, sinapsis).",
      "Consecuencia: sin tratamiento temprano, discapacidad intelectual y retraso del crecimiento; con tratamiento precoz, desarrollo normal.",
    ],
    epidemiology:
      "El hipotiroidismo congénito afecta a alrededor de 1 de cada 2.000–3.000 recién nacidos, más a niñas. Es la causa prevenible más frecuente de discapacidad intelectual. La Ley 26.279 garantiza la pesquisa neonatal universal en Argentina.",
    management: [
      "Pesquisa neonatal universal (talón).",
      "Confirmación urgente en sangre venosa.",
      "Levotiroxina antes de las 2 semanas de vida.",
      "Seguimiento endocrinológico y del desarrollo.",
    ],
    sources: ["Ley 26.279 de Pesquisa Neonatal.", "Sociedad Argentina de Pediatría — Consenso de hipotiroidismo congénito."],
    pearls: ["Pesquisa positiva = confirmar y tratar ya.", "Antes de las 2 semanas.", "Tratamiento de por vida."],
    pitfalls: ["Esperar a repetir.", "Dar la levotiroxina con soja o hierro."],
    tribunal: [
      qa("¿Qué enfermedades incluye la pesquisa neonatal en Argentina?", "Según la Ley 26.279: hipotiroidismo congénito, fenilcetonuria, hiperplasia suprarrenal congénita, galactosemia, fibrosis quística y déficit de biotinidasa, con otras incorporadas según la normativa vigente, además de la pesquisa auditiva y de retinopatía del prematuro."),
      qa("¿Qué signos clínicos puede tener el hipotiroidismo congénito?", "La mayoría ninguno al nacer; luego ictericia prolongada, somnolencia, succión débil, constipación, fontanela posterior amplia, macroglosia, hernia umbilical, hipotonía, piel seca y llanto ronco."),
      qa("¿Qué es la hiperplasia suprarrenal congénita?", "Un déficit enzimático (más común de 21-hidroxilasa) que produce falta de cortisol y aldosterona y exceso de andrógenos: genitales ambiguos en niñas y crisis perdedora de sal en las primeras semanas."),
    ],
  },
};
