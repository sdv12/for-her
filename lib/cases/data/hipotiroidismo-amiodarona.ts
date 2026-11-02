import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hipotiroidismoAmiodarona: ClinicalCase = {
  id: "hipotiroidismo-por-amiodarona",
  level: 2,
  area: "Endocrinología",
  setting: "Consultorio",
  patient: { age: 70, ageUnit: "años", sex: "M", context: "Fibrilación auricular tratada con amiodarona desde hace 8 meses." },
  frequency: "frecuente",
  intro: "“Estoy muy cansado, con frío todo el tiempo, constipado y aumenté cinco kilos. Mi señora dice que estoy lento.”",
  vitals: { TA: "142/92 mmHg", FC: "56 lpm", "T°": "35,9 °C", Peso: "86 kg" },
  anamnesis: [
    act("farmacos", "¿Qué remedios toma y desde cuándo?", "clave", "“Amiodarona hace ocho meses, y un anticoagulante.”", "La amiodarona tiene mucho yodo y puede causar hipo o hipertiroidismo."),
    act("sintomas", "¿Tiene piel seca, caída de pelo, calambres o voz ronca?", "clave", "“Piel muy seca y calambres.”", "Síntomas de hipotiroidismo."),
    act("animo", "¿Cómo está de ánimo y memoria?", "util", "“Me olvido de cosas, estoy desganado.”", "El hipotiroidismo puede simular depresión o demencia."),
    act("palpitaciones", "¿Tuvo palpitaciones o falta de aire?", "util", "“No.”", "Evalúa la FA y la insuficiencia cardíaca."),
    act("tiroides-previa", "¿Le controlaron la tiroides antes de empezar la amiodarona?", "clave", "“No sé.”", "Se debe medir TSH antes y cada 6 meses."),
    act("pesca", "¿Pesca?", "neutro", "“En el dique.”", "No orienta."),
  ],
  exam: [
    act("piel", "Piel, pelo y reflejos", "clave", "Piel seca y fría, edema palpebral, reflejos con relajación lenta.", "Signos de hipotiroidismo."),
    act("tiroides", "Palpación tiroidea", "util", "Tiroides levemente aumentada, indolora.", "Bocio por yodo o tiroiditis."),
    act("pulso", "Pulso", "util", "Regular, 56 lpm.", "Bradicardia por hipotiroidismo y amiodarona."),
  ],
  studies: [
    study("Laboratorio", "tsh", "TSH y T4 libre", "clave", "TSH 32 mUI/l, T4 libre baja.", "Hipotiroidismo primario."),
    study("Laboratorio", "atpo", "Anticuerpos anti-TPO", "util", "Positivos.", "Tiroiditis autoinmune de base: mayor riesgo con amiodarona."),
    study("Laboratorio", "otros", "Perfil lipídico, CPK, sodio", "util", "LDL 182, CPK levemente alta.", "Alteraciones por hipotiroidismo."),
    study("Imágenes", "centellograma", "Centellograma tiroideo", "innecesario", "No se realizó.", "No sirve con la carga de yodo y no cambia la conducta en el hipotiroidismo."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hipo-amio", "Hipotiroidismo primario inducido por amiodarona sobre tiroiditis autoinmune", true, "TSH de 32 con T4 libre baja y síntomas típicos, a los 8 meses de amiodarona, con anti-TPO positivos."),
      dx("depresion", "Depresión", false, "Los síntomas se explican por el hipotiroidismo."),
      dx("demencia", "Demencia", false, "El enlentecimiento es reversible con levotiroxina."),
      dx("central", "Hipotiroidismo central", false, "La TSH está alta: es primario."),
      dx("hiper-amio", "Hipertiroidismo por amiodarona", false, "La TSH está alta."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("levotiroxina", "Levotiroxina en dosis baja con aumento gradual (es cardiópata)", "clave", "En mayores con cardiopatía se empieza bajo para no desencadenar angina o arritmias."),
      mg("seguir", "Continuar la amiodarona si es necesaria, en acuerdo con cardiología", "clave", "El hipotiroidismo se trata con levotiroxina; no obliga a suspender la amiodarona."),
      mg("control", "TSH a las 6–8 semanas", "clave", "Ajuste de dosis."),
      mg("anticoagulante", "Controlar la anticoagulación al cambiar la función tiroidea", "util", "La tiroides modifica el efecto de los anticoagulantes."),
      mg("dosis-plena", "Levotiroxina en dosis plena desde el primer día", "riesgoso", "Riesgo de isquemia y arritmias."),
      mg("suspender-todo", "Suspender la amiodarona sin consultar", "riesgoso", "Puede recurrir la arritmia."),
    ],
  },
  debrief: {
    diagnosis: "Hipotiroidismo primario inducido por amiodarona sobre tiroiditis autoinmune, en varón de 70 años con fibrilación auricular.",
    pathologies: [
      { name: "Hipotiroidismo por amiodarona", role: "principal", why: "Efecto Wolff-Chaikoff persistente." },
      { name: "Tiroiditis autoinmune", role: "asociada", why: "Predispone." },
      { name: "Depresión, demencia", role: "diferencial", why: "Simuladores." },
    ],
    reasoning: [
      "Causa: la amiodarona aporta grandes cantidades de yodo.",
      "Mecanismo: el exceso de yodo frena la síntesis hormonal (efecto Wolff-Chaikoff); una tiroides con autoinmunidad no logra escapar.",
      "Consecuencia: hipotiroidismo con cansancio, frío, constipación, bradicardia y dislipemia.",
    ],
    epidemiology:
      "La amiodarona produce alteraciones tiroideas en hasta un 15–20 % de quienes la toman. En zonas con suficiente yodo, como Argentina, predomina el hipotiroidismo, sobre todo en mujeres y con anti-TPO positivos.",
    management: [
      "TSH antes de la amiodarona y cada 6 meses.",
      "Hipotiroidismo: levotiroxina, sin suspender la amiodarona si es necesaria.",
      "Hipertiroidismo: definir el tipo (1 o 2) y tratar con antitiroideos o corticoides.",
    ],
    sources: ["Sociedad Argentina de Endocrinología y Metabolismo — Consenso de disfunción tiroidea por fármacos.", "Sociedad Argentina de Cardiología — Consenso de fibrilación auricular."],
    pearls: ["Amiodarona: TSH cada 6 meses.", "Mayor cardiópata: levotiroxina baja.", "No hace falta suspender la amiodarona."],
    pitfalls: ["Atribuir los síntomas a la edad.", "Empezar con dosis plena."],
    tribunal: [
      qa("¿Qué tipos de hipertiroidismo produce la amiodarona?", "Tipo 1: síntesis aumentada por el yodo en tiroides con nódulos o Graves latente (se trata con antitiroideos). Tipo 2: tiroiditis destructiva (se trata con corticoides). Pueden mezclarse."),
      qa("¿Qué fármacos afectan la tiroides?", "Amiodarona, litio, interferón, inhibidores de puntos de control inmunitario, inhibidores de tirosina quinasa, contrastes yodados; y otros afectan la absorción de levotiroxina (calcio, hierro, inhibidores de la bomba de protones)."),
      qa("¿Qué es el coma mixedematoso?", "La forma más grave del hipotiroidismo: hipotermia, alteración de la conciencia, bradicardia, hipoventilación e hiponatremia, desencadenada por infecciones o frío; se trata con levotiroxina EV, hidrocortisona y sostén."),
    ],
  },
};
