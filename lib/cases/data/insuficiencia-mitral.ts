import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const insuficienciaMitral: ClinicalCase = {
  id: "insuficiencia-mitral-cronica",
  level: 2,
  area: "Cardiovascular",
  setting: "Consultorio",
  patient: { age: 67, ageUnit: "años", sex: "F", context: "Le dijeron que tenía “un soplo” hace 10 años. Prolapso de válvula mitral. Sin controles." },
  frequency: "frecuente",
  intro: "“Hace seis meses me falta el aire al subir la escalera, duermo con dos almohadas y a veces siento palpitaciones.”",
  vitals: { TA: "128/68 mmHg", FC: "92 lpm", FR: "20 rpm", "T°": "36,5 °C", "SatO₂": "96 %", Peso: "66 kg" },
  anamnesis: [
    act("disnea", "¿Con qué esfuerzo? ¿Ortopnea?", "clave", "“Con una escalera; dos almohadas.”", "Clase funcional."),
    act("soplo", "¿Qué te dijeron del soplo?", "clave", "“Prolapso; que me controle.”", "Causa degenerativa."),
    act("palpitaciones", "¿Palpitaciones?", "clave", "“Sí, irregulares.”", "Riesgo de FA."),
    act("fiebre", "¿Fiebre o intervenciones dentales?", "util", "“No.”", "Endocarditis."),
    act("reuma", "¿Fiebre reumática o IAM?", "util", "“No.”", "Causas."),
    act("flores", "¿Tenés plantas?", "neutro", "“Sí, muchas.”", "No orienta."),
  ],
  exam: [
    act("soplo-ex", "Auscultación", "clave", "Soplo holosistólico apical III/VI irradiado a axila; tercer ruido.", "Insuficiencia mitral significativa."),
    act("congestion", "Pulmón, yugulares", "clave", "Rales bibasales finos.", "Congestión."),
    act("pulso", "Pulso y choque de punta", "util", "Irregular; choque desplazado.", "FA y dilatación."),
  ],
  studies: [
    study("Imágenes", "eco", "Ecocardiograma transtorácico", "clave", "Prolapso de valva posterior, insuficiencia grave; FEy 56 %, VI dilatado, PSAP 52 mmHg.", "Confirma, cuantifica y define cirugía."),
    study("Electrofisiología", "ecg", "ECG", "clave", "Fibrilación auricular.", "Anticoagulación."),
    study("Imágenes", "rx", "Radiografía de tórax", "util", "Cardiomegalia y congestión.", "Repercusión."),
    study("Laboratorio", "dimero", "Dímero D", "innecesario", "No se realizó.", "No aporta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("im", "Insuficiencia mitral crónica grave por prolapso, sintomática, con fibrilación auricular", true, "Soplo holosistólico apical y eco concluyente."),
      dx("estenosis-aortica", "Estenosis aórtica", false, "Soplo eyectivo, en foco aórtico."),
      dx("estenosis-mitral", "Estenosis mitral", false, "Rolido diastólico."),
      dx("hcm", "Miocardiopatía hipertrófica", false, "Sin hipertrofia."),
      dx("cia", "CIA", false, "Desdoblamiento fijo, eco distinta."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cirugia", "Derivar a reparación quirúrgica de la válvula", "clave", "Síntomas con insuficiencia grave."),
      mg("congestion", "Diuréticos e insuficiencia cardíaca según guías", "clave", "Mejora síntomas."),
      mg("anticoag", "Anticoagular y controlar frecuencia", "clave", "FA con CHA₂DS₂-VASc alto."),
      mg("controles", "Ecocardiograma seriado en asintomáticos", "util", "Marca el momento."),
      mg("esperar", "Esperar a que caiga la fracción de eyección", "riesgoso", "Daño irreversible."),
      mg("aspirina", "Aspirina en lugar de anticoagulante", "riesgoso", "Insuficiente para FA."),
    ],
  },
  debrief: {
    diagnosis: "Insuficiencia mitral crónica grave por prolapso de valva posterior, con FA e hipertensión pulmonar, en mujer de 67 años.",
    pathologies: [
      { name: "Insuficiencia mitral", role: "principal", why: "Valvulopatía con regurgitación." },
      { name: "Fibrilación auricular, hipertensión pulmonar", role: "asociada", why: "Consecuencias." },
      { name: "Estenosis aórtica, estenosis mitral", role: "diferencial", why: "Otros soplos." },
    ],
    reasoning: [
      "Causa: degeneración mixomatosa con prolapso.",
      "Mecanismo: la sangre vuelve a la aurícula, con sobrecarga de volumen.",
      "Consecuencia: dilatación, FA, congestión y deterioro ventricular.",
    ],
    epidemiology:
      "Es una de las valvulopatías más frecuentes del adulto mayor. Antes predominaba la causa reumática; hoy, la degenerativa y la funcional por cardiopatía isquémica. La reparación es superior al reemplazo cuando es posible. La FEy normal puede ocultar ya un daño considerable.",
    management: [
      "Eco y cuantificación.",
      "Tratar IC y FA.",
      "Cirugía con criterios.",
      "Seguimiento.",
    ],
    sources: ["Sociedad Argentina de Cardiología — Consenso de valvulopatías.", "ESC/EACTS — Guidelines for the Management of Valvular Heart Disease."],
    pearls: ["Holosistólico al ápex a la axila.", "FEy menor de 60 % en IM es anormal.", "Reparar es mejor."],
    pitfalls: ["Esperar a que caiga la FEy.", "Pensar que no requiere control."],
    tribunal: [
      qa("¿Qué diferencia un soplo sistólico de uno diastólico en valvulopatías?", "Sistólicos: estenosis aórtica e insuficiencia mitral. Diastólicos: estenosis mitral e insuficiencia aórtica."),
      qa("¿Qué causa IM aguda?", "Rotura de músculo papilar en un IAM y endocarditis; da edema agudo con soplo breve."),
      qa("¿Cuándo operar a un paciente sin síntomas?", "Con FEy de 60 % o menos, VI dilatado, FA o hipertensión pulmonar."),
    ],
  },
};
