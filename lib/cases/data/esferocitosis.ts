import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const esferocitosis: ClinicalCase = {
  id: "esferocitosis-hereditaria",
  level: 2,
  area: "Hematología",
  setting: "Consultorio",
  patient: { age: 9, ageUnit: "años", sex: "M", context: "Ictericia neonatal que necesitó luminoterapia. Al padre le sacaron la vesícula a los 25." },
  frequency: "poco-frecuente",
  intro: "“Cada vez que tiene una virosis se pone amarillo y pálido. Ahora le duele la panza arriba a la derecha.”",
  vitals: { FC: "104 lpm", "T°": "36,6 °C", Peso: "28 kg" },
  anamnesis: [
    act("ictericia", "¿Cuándo se pone amarillo?", "clave", "“Con los resfríos.”", "Crisis hemolíticas."),
    act("familia", "¿Familiares con anemia, vesícula o bazo operado?", "clave", "“Al papá le sacaron la vesícula joven.”", "Herencia autosómica dominante."),
    act("neonatal", "¿Tuvo ictericia al nacer?", "clave", "“Sí, con luminoterapia.”", "Hemólisis temprana."),
    act("dolor", "¿Cómo es el dolor de panza?", "util", "“Después de comer, arriba a la derecha.”", "Litiasis pigmentaria."),
    act("orina", "¿Orina oscura?", "util", "“A veces.”", "Hemólisis."),
    act("deporte", "¿Qué deporte hace?", "neutro", "“Rugby.”", "Riesgo con el bazo grande."),
  ],
  exam: [
    act("bazo", "Bazo", "clave", "Esplenomegalia de 4 cm.", "Hemólisis extravascular."),
    act("ictericia-ex", "Piel y escleras", "clave", "Subictericia y palidez.", "Hemólisis."),
    act("abdomen", "Murphy", "util", "Dudoso.", "Vesícula."),
  ],
  studies: [
    study("Laboratorio", "hemograma", "Hemograma con reticulocitos y frotis", "clave", "Hb 9,8; CHCM alta; reticulocitos 9 %; esferocitos en el frotis.", "Hemólisis con esferocitos."),
    study("Laboratorio", "coombs", "Coombs directa y bilirrubina", "clave", "Coombs negativa; bilirrubina indirecta 3,2; test de EMA positivo.", "No es autoinmune."),
    study("Otros", "hierro-empirico", "Hierro empírico por la anemia", "riesgoso", "No se indicó.", "Sin ferropenia; favorece la sobrecarga."),
    study("Imágenes", "eco", "Ecografía abdominal", "util", "Litiasis vesicular.", "Complicación."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("esferocitosis", "Esferocitosis hereditaria con litiasis vesicular", true, "Hemólisis con esferocitos, Coombs negativa, CHCM alta, esplenomegalia, antecedente familiar y litiasis."),
      dx("aha", "Anemia hemolítica autoinmune", false, "Coombs negativa."),
      dx("g6pd", "Déficit de G6PD", false, "Esferocitos y CHCM alta."),
      dx("talasemia", "Talasemia", false, "CHCM alta y esferocitos."),
      dx("hepatitis", "Hepatitis", false, "Bilirrubina indirecta y anemia."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("folico", "Ácido fólico", "clave", "Alta demanda por hemólisis."),
      mg("colecistectomia", "Colecistectomía", "clave", "Litiasis sintomática."),
      mg("esplenectomia", "Evaluar esplenectomía parcial o total según gravedad, con vacunas previas", "util", "Reduce la hemólisis."),
      mg("parvovirus", "Pautas de crisis aplásica por parvovirus", "clave", "Complicación grave."),
      mg("hierro", "Hierro oral", "riesgoso", "No hay ferropenia; sobrecarga."),
      mg("corticoides", "Corticoides", "riesgoso", "No es autoinmune."),
    ],
  },
  debrief: {
    diagnosis: "Esferocitosis hereditaria con litiasis vesicular, en niño de 9 años.",
    pathologies: [
      { name: "Esferocitosis hereditaria", role: "principal", why: "Defecto de la membrana del glóbulo rojo." },
      { name: "Litiasis pigmentaria", role: "asociada", why: "Hemólisis crónica." },
      { name: "Hemólisis autoinmune, G6PD", role: "diferencial", why: "Otras hemólisis." },
    ],
    reasoning: [
      "Causa: mutaciones en espectrina o anquirina, herencia dominante.",
      "Mecanismo: glóbulos rojos esféricos y rígidos que el bazo destruye.",
      "Consecuencia: anemia, ictericia, esplenomegalia y cálculos de bilirrubina.",
    ],
    epidemiology:
      "Es la anemia hemolítica hereditaria más frecuente en personas de origen europeo. Muchas formas son leves y se diagnostican por cálculos biliares o crisis con infecciones. El parvovirus B19 puede causar una crisis aplásica grave.",
    management: [
      "Frotis y Coombs.",
      "Fólico.",
      "Vesícula.",
      "Bazo según gravedad.",
    ],
    sources: ["Sociedad Argentina de Hematología — Anemias hemolíticas hereditarias.", "British Society for Haematology — Guidelines for the Diagnosis and Management of Hereditary Spherocytosis."],
    pearls: ["Coombs negativa con esferocitos.", "CHCM alta.", "Cálculos en un chico."],
    pitfalls: ["Hierro.", "Olvidar parvovirus."],
    tribunal: [
      qa("¿Qué es una crisis aplásica?", "Caída brusca de la eritropoyesis por parvovirus B19 con anemia grave y reticulocitos bajos."),
      qa("¿Qué vacunas antes de la esplenectomía?", "Neumococo, meningococo y Haemophilus influenzae tipo b."),
      qa("¿Por qué hay cálculos en la hemólisis?", "Por exceso de bilirrubina que precipita como cálculos pigmentarios."),
    ],
  },
};
