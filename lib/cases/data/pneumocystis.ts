import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const pneumocystis: ClinicalCase = {
  id: "neumonia-pneumocystis-vih",
  level: 3,
  area: "Infectología",
  setting: "Guardia",
  patient: { age: 41, ageUnit: "años", sex: "F", context: "Nunca se hizo un test de VIH. Bajó de peso en el último año. Su pareja falleció hace años por “algo de los pulmones”." },
  frequency: "frecuente",
  intro: "“Hace tres semanas me falta cada vez más el aire, tengo tos seca y fiebre. Me dieron dos antibióticos y no mejoré.”",
  vitals: { TA: "112/68 mmHg", FC: "108 lpm", FR: "30 rpm", "T°": "38,3 °C", "SatO₂": "86 %" },
  anamnesis: [
    act("evolucion", "¿Cómo fue apareciendo la falta de aire?", "clave", "“De a poco, tres semanas, y peor al caminar.”", "Curso subagudo, con desaturación de esfuerzo."),
    act("vih", "¿Te hiciste un test de VIH? ¿Riesgos?", "clave", "“Nunca; mi pareja murió de algo pulmonar.”", "Se debe ofrecer a toda persona."),
    act("tos", "¿La tos trae catarro?", "clave", "“No, es seca.”", "La tos seca orienta contra neumonía bacteriana típica."),
    act("corticoides", "¿Tomás corticoides u otros inmunosupresores?", "util", "“No.”", "Otros grupos de riesgo."),
    act("alergias", "¿Alergia a sulfas?", "util", "“No.”", "Define el tratamiento."),
    act("vecinos", "¿Dónde vivís?", "neutro", "“En Córdoba capital.”", "No orienta."),
  ],
  exam: [
    act("pulmon", "Auscultación", "clave", "Casi normal, algunos rales finos.", "Disociación entre hipoxemia y examen."),
    act("boca", "Boca y piel", "clave", "Muguet oral y leucoplasia vellosa.", "Inmunodepresión marcada."),
    act("trabajo", "Trabajo respiratorio", "util", "Taquipnea, sin accesorios.", "Gravedad."),
  ],
  studies: [
    study("Laboratorio", "gases", "Gases arteriales y LDH", "clave", "pO₂ 58, gradiente alto, LDH 620.", "pO₂ menor de 70: indica corticoides."),
    study("Laboratorio", "vih", "Test de VIH, CD4 y carga viral", "clave", "Positivo, CD4 54.", "Confirma."),
    study("Imágenes", "rx", "Radiografía o TC de tórax", "clave", "Infiltrado bilateral intersticial en vidrio esmerilado, respeta vértices.", "Patrón típico."),
    study("Microbiología", "pjp", "Esputo inducido o lavado broncoalveolar: PCR o inmunofluorescencia para P. jirovecii", "clave", "Positivo.", "Confirma."),
    study("Otros", "biopsia", "Biopsia pulmonar quirúrgica de entrada", "riesgoso", "No se realizó.", "Innecesaria con alta sospecha y riesgosa con hipoxemia."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("pjp", "Neumonía por Pneumocystis jirovecii con hipoxemia, debut de VIH avanzado", true, "Disnea subaguda, tos seca, hipoxemia, vidrio esmerilado, LDH alta y CD4 de 54."),
      dx("nac", "Neumonía bacteriana", false, "No responde a antibióticos, con patrón intersticial."),
      dx("tbc", "Tuberculosis", false, "Daría cavidades o miliar, y se busca igual, pero la prueba específica es positiva."),
      dx("tep", "TEP", false, "No explica el vidrio esmerilado bilateral."),
      dx("covid", "COVID-19", false, "Es un diferencial; PCR para P. jirovecii positiva y CD4 bajos."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("tmp", "Trimetoprima-sulfametoxazol en dosis altas por 21 días", "clave", "Tratamiento de elección."),
      mg("corticoide", "Prednisona si pO₂ es menor de 70", "clave", "Reduce la mortalidad y la necesidad de intubar."),
      mg("oxigeno", "Oxígeno y control de función renal y potasio", "clave", "Soporte; el TMP-SMX altera potasio y creatinina."),
      mg("tarv", "Iniciar TARV dentro de las 2 semanas", "clave", "Mejora la sobrevida."),
      mg("pareja", "Consejería, test a parejas y profilaxis secundaria", "util", "Previene recurrencia."),
      mg("macrolido", "Otro antibiótico para NAC y alta", "riesgoso", "Deja sin tratar una enfermedad grave."),
    ],
  },
  debrief: {
    diagnosis: "Neumonía por Pneumocystis jirovecii con hipoxemia como debut de VIH avanzado (CD4 54), en mujer de 41 años.",
    pathologies: [
      { name: "Neumonía por Pneumocystis", role: "principal", why: "Oportunista fúngica." },
      { name: "VIH avanzado", role: "asociada", why: "CD4 menor de 200." },
      { name: "NAC, TBC, TEP, COVID-19", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: P. jirovecii con CD4 menor de 200.",
      "Mecanismo: el hongo llena los alvéolos con exudado espumoso, y altera la difusión.",
      "Consecuencia: disnea progresiva, hipoxemia, insuficiencia respiratoria.",
    ],
    epidemiology:
      "Sigue siendo una infección que define sida frecuente en personas que no saben que tienen VIH. En Argentina, una proporción importante de diagnósticos de VIH sigue siendo tardía, y más en mujeres mayores y varones heterosexuales. El test es gratuito y confidencial.",
    management: [
      "Sospechar ante disnea subaguda con examen normal.",
      "TMP-SMX y corticoides según gases.",
      "Test de VIH y TARV.",
      "Profilaxis con CD4 menor de 200.",
    ],
    sources: ["Ministerio de Salud de la Nación — Boletín sobre VIH.", "Sociedad Argentina de Infectología — Consenso de infecciones oportunistas."],
    pearls: ["Pulmones casi normales con SatO₂ baja: PCP o TEP.", "pO₂ menor de 70: corticoide.", "LDH alta apoya."],
    pitfalls: ["No pedir test de VIH.", "Dar antibióticos en serie."],
    tribunal: [
      qa("¿Cuándo se indica profilaxis?", "Con CD4 menor de 200, muguet o enfermedad definitoria, con TMP-SMX."),
      qa("¿Qué efectos adversos tiene el TMP-SMX?", "Exantema, citopenias, hiperpotasemia, aumento de creatinina y hepatitis."),
      qa("¿Afecta solo a personas con VIH?", "No: también a personas inmunosuprimidas sin VIH, por corticoides o quimioterapia, con un curso más rápido."),
    ],
  },
};
