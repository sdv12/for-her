import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hipertiroidismoApatico: ClinicalCase = {
  id: "hipertiroidismo-apatico-adulta-mayor",
  level: 2,
  area: "Endocrinología",
  setting: "Consultorio",
  patient: { age: 81, ageUnit: "años", sex: "F", context: "Tiene un bocio con nódulos desde hace años, nunca estudiado." },
  frequency: "poco-frecuente",
  intro: "“Desde hace meses está muy decaída, apagada, bajó ocho kilos y casi no tiene fuerza para caminar. Pensamos que es la edad.” (relata la hija)",
  vitals: { TA: "134/66 mmHg", FC: "112 lpm (irregular)", "T°": "36,8 °C", Peso: "48 kg" },
  anamnesis: [
    act("peso", "¿Cuánto bajó? ¿Come bien?", "clave", "“Ocho kilos en seis meses, y come igual.”", "Pérdida de peso con apetito conservado: hipermetabolismo."),
    act("animo", "¿Cómo está de ánimo y energía?", "clave", "“Apática, sin ganas, duerme mucho.”", "En adultos mayores el hipertiroidismo puede presentarse como apatía (hipertiroidismo apático)."),
    act("yodo", "¿Le hicieron una tomografía con contraste o toma algún remedio con yodo?", "clave", "“Le hicieron una tomografía con contraste hace dos meses.”", "El yodo del contraste puede desencadenar hipertiroidismo en un bocio multinodular (Jod-Basedow)."),
    act("palpitaciones", "¿Palpitaciones o falta de aire?", "util", "“Se agita al caminar.”", "FA e insuficiencia cardíaca."),
    act("diarrea", "¿Cómo va de cuerpo?", "util", "“Más seguido.”", "Hipermotilidad."),
    act("radio", "¿Escucha radio?", "neutro", "“Folklore.”", "No orienta."),
  ],
  exam: [
    act("tiroides", "Palpación tiroidea", "clave", "Bocio multinodular, indoloro.", "Bocio tóxico multinodular."),
    act("pulso", "Pulso y auscultación", "clave", "Fibrilación auricular a 112 lpm.", "Complicación frecuente en mayores."),
    act("musculos", "Fuerza proximal", "util", "Debilidad para levantarse de la silla.", "Miopatía tiroidea."),
    act("ojos", "Ojos", "util", "Sin exoftalmos.", "En el bocio multinodular no hay oftalmopatía."),
  ],
  studies: [
    study("Laboratorio", "tsh", "TSH, T4 libre y T3", "clave", "TSH menor de 0,01, T4 libre 2,8, T3 alta.", "Hipertiroidismo."),
    study("Imágenes", "eco", "Ecografía tiroidea", "util", "Múltiples nódulos, el mayor de 2,5 cm.", "Evalúa nódulos para punción si corresponde."),
    study("Imágenes", "centellograma", "Centellograma tiroideo (diferido por el yodo reciente)", "util", "Varios nódulos hipercaptantes.", "Confirma bocio tóxico multinodular."),
    study("Laboratorio", "trab", "Anticuerpos anti-receptor de TSH", "util", "Negativos.", "Descarta Graves."),
    study("Otros", "biopsia-todos", "Punción de todos los nódulos de rutina", "innecesario", "No se realizó.", "Los nódulos calientes rara vez son malignos; se punzan según criterios ecográficos."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("btmn", "Hipertiroidismo apático por bocio tóxico multinodular desencadenado por contraste yodado, con fibrilación auricular", true, "Adulta mayor con apatía, pérdida de peso con buen apetito, FA, bocio multinodular, TSH suprimida, T4 alta, anticuerpos negativos y yodo reciente."),
      dx("depresion", "Depresión del adulto mayor", false, "No explica la pérdida de peso con apetito, la FA ni la TSH suprimida."),
      dx("cancer", "Cáncer oculto", false, "El laboratorio explica el cuadro."),
      dx("graves", "Enfermedad de Graves", false, "Anticuerpos negativos, sin oftalmopatía, con bocio nodular."),
      dx("tiroiditis", "Tiroiditis subaguda", false, "La tiroides no duele y el centellograma capta."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("betabloqueante", "Betabloqueante para controlar la frecuencia y los síntomas", "clave", "Controla la FA y el temblor."),
      mg("metimazol", "Metimazol", "clave", "Normaliza la función tiroidea."),
      mg("anticoagular", "Anticoagulación según CHA₂DS₂-VASc", "clave", "La FA con hipertiroidismo tiene riesgo embólico."),
      mg("definitivo", "Tratamiento definitivo (yodo radiactivo o cirugía) una vez estable", "util", "El bocio tóxico multinodular no remite solo."),
      mg("yodo", "Evitar nuevos contrastes yodados si no son imprescindibles", "util", "Desencadenante."),
      mg("antidepresivo", "Antidepresivo por apatía", "riesgoso", "Retrasa el diagnóstico y puede empeorar la taquicardia."),
    ],
  },
  debrief: {
    diagnosis: "Hipertiroidismo apático por bocio tóxico multinodular desencadenado por contraste yodado (efecto Jod-Basedow), con fibrilación auricular, miopatía y pérdida de peso, en mujer de 81 años.",
    pathologies: [
      { name: "Bocio tóxico multinodular", role: "principal", why: "Nódulos autónomos hiperfuncionantes." },
      { name: "Fibrilación auricular", role: "asociada", why: "Complicación del hipertiroidismo en mayores." },
      { name: "Depresión, cáncer, Graves", role: "diferencial", why: "Otras causas de pérdida de peso y apatía." },
    ],
    reasoning: [
      "Causa: nódulos tiroideos autónomos que, ante una carga de yodo, producen exceso de hormona.",
      "Mecanismo: más T4 y T3 aumentan el metabolismo y la sensibilidad adrenérgica.",
      "Consecuencia: en jóvenes, hiperactividad; en mayores, apatía, pérdida de peso, debilidad, FA e insuficiencia cardíaca.",
    ],
    epidemiology:
      "El bocio tóxico multinodular es la causa más frecuente de hipertiroidismo en adultos mayores. Más de la mitad de los mayores con hipertiroidismo no tiene los síntomas clásicos, y la FA es mucho más común que en jóvenes.",
    management: [
      "Pedir TSH ante FA, pérdida de peso o deterioro inexplicado en mayores.",
      "Betabloqueante y antitiroideos.",
      "Anticoagular según el riesgo.",
      "Tratamiento definitivo con yodo radiactivo o cirugía.",
    ],
    sources: ["Sociedad Argentina de Endocrinología y Metabolismo — Guías de hipertiroidismo.", "Guías ATA de hipertiroidismo."],
    pearls: ["Adulto mayor apático que adelgaza = TSH.", "FA nueva = TSH.", "Contraste yodado puede desencadenarlo."],
    pitfalls: ["Atribuirlo a la edad o a depresión.", "No anticoagular la FA."],
    tribunal: [
      qa("¿Qué causas de hipertiroidismo hay?", "Con captación alta: Graves, bocio tóxico multinodular, adenoma tóxico, mola. Con captación baja: tiroiditis (subaguda, silente, posparto), por yodo o amiodarona y por exceso de levotiroxina."),
      qa("¿Qué es el efecto Jod-Basedow?", "El hipertiroidismo inducido por una carga de yodo (contrastes, amiodarona) en personas con bocio nodular o Graves latente, cuyos nódulos autónomos usan el yodo para fabricar más hormona."),
      qa("¿Qué es la tormenta tiroidea?", "Una exacerbación grave del hipertiroidismo con fiebre alta, taquicardia, insuficiencia cardíaca, agitación o coma y síntomas digestivos, desencadenada por infecciones, cirugía o yodo; se trata con betabloqueantes, antitiroideos, yodo después de los antitiroideos, corticoides y sostén."),
    ],
  },
};
