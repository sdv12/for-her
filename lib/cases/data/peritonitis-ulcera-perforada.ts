import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const peritonitisUlceraPerforada: ClinicalCase = {
  id: "peritonitis-ulcera-peptica-perforada",
  level: 3,
  area: "Cirugía",
  setting: "Guardia",
  patient: { age: 49, ageUnit: "años", sex: "M", context: "Fumador, consumo alto de alcohol, ibuprofeno frecuente. Pirosis hace años, sin tratamiento." },
  frequency: "frecuente",
  intro: "“Hace 3 horas sentí una puñalada en la boca del estómago. No me puedo mover del dolor.”",
  vitals: { TA: "108/66 mmHg", FC: "122 lpm", FR: "28 rpm", "T°": "37,8 °C", "SatO₂": "96 %" },
  anamnesis: [
    act("inicio", "¿Fue de golpe?", "clave", "“De golpe.”", "Dolor súbito y máximo desde el comienzo."),
    act("aines", "¿Antiinflamatorios, alcohol, cigarrillo?", "clave", "“Ibuprofeno y vino.”", "Factores de úlcera."),
    act("ulcera", "¿Dolor de estómago antes? ¿Calma con comida?", "clave", "“Años; calma con leche.”", "Historia ulcerosa."),
    act("sangrado", "¿Vómitos con sangre, materia negra?", "util", "“No.”", "Hemorragia."),
    act("ultimo", "¿Cuándo comiste?", "util", "“Hace 6 horas.”", "Anestesia."),
    act("equipo", "¿De qué cuadro sos?", "neutro", "“De Talleres.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Abdomen", "clave", "Rígido en tabla, sin ruidos, Blumberg positivo.", "Peritonitis."),
    act("matidez", "Percusión hepática", "clave", "Desaparece la matidez hepática (signo de Jobert).", "Aire libre."),
    act("hemodinamia", "Perfusión y postura", "util", "Quieto, frío y taquicárdico.", "Evolución a sepsis."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de tórax de pie", "clave", "Neumoperitoneo subdiafragmático.", "Confirma víscera perforada."),
    study("Imágenes", "tc", "TC de abdomen si hay dudas", "util", "Aire libre, líquido perihepático.", "Más sensible."),
    study("Laboratorio", "lab", "Hemograma, lactato, función renal, amilasa, grupo", "clave", "Leucocitos 18.000; lactato 3,1.", "Gravedad."),
    study("Otros", "veda", "Endoscopía digestiva urgente", "riesgoso", "No se realizó.", "Insuflar aire agrava la perforación."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("perforada", "Peritonitis por úlcera péptica perforada", true, "Dolor súbito, abdomen en tabla, neumoperitoneo."),
      dx("pancreatitis", "Pancreatitis", false, "No tiene neumoperitoneo."),
      dx("colecistitis", "Colecistitis", false, "Es localizada, sin aire libre."),
      dx("iam", "IAM inferior", false, "Se descarta con ECG; hay aire libre."),
      dx("mesenterica", "Isquemia mesentérica", false, "Dolor desproporcionado al examen; aquí hay peritonitis franca."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cirugia", "Cirugía urgente: sutura con parche de epiplón y lavado", "clave", "Tratamiento definitivo."),
      mg("reanimar", "Reanimar con cristaloides, sonda nasogástrica y ayuno", "clave", "Prepara la cirugía."),
      mg("atb", "Antibióticos de amplio espectro e IBP EV", "clave", "Cubre la peritonitis."),
      mg("hpylori", "Buscar H. pylori y evitar AINE", "clave", "Previene recurrencias."),
      mg("aines", "Ketorolac y alta", "riesgoso", "Agrava y omite una urgencia."),
      mg("enema", "Enema y observación", "riesgoso", "Inapropiado."),
    ],
  },
  debrief: {
    diagnosis: "Peritonitis difusa por úlcera péptica perforada, en varón de 49 años con AINE, alcohol y tabaco.",
    pathologies: [
      { name: "Úlcera perforada", role: "principal", why: "Perforación de la pared." },
      { name: "Peritonitis y sepsis", role: "asociada", why: "Complicación." },
      { name: "Pancreatitis, colecistitis, IAM", role: "diferencial", why: "Dolor epigástrico." },
    ],
    reasoning: [
      "Causa: H. pylori, AINE, tabaco.",
      "Mecanismo: la úlcera atraviesa la pared; el ácido contamina el peritoneo.",
      "Consecuencia: peritonitis química y luego bacteriana, y shock.",
    ],
    epidemiology:
      "La perforación afecta sobre todo a duodeno y cara anterior; en mayores, se asocia a AINE. Una demora de horas multiplica la mortalidad, por lo que hay que operar rápido. Un porcentaje importante puede presentarse sin dolor típico en adultos mayores o inmunodeprimidos.",
    management: [
      "Reconocer abdomen agudo.",
      "Radiografía de tórax de pie.",
      "Reanimar y operar.",
      "Causa.",
    ],
    sources: ["Sociedad Argentina de Cirugía Digestiva — Abdomen agudo perforativo.", "World Society of Emergency Surgery — Perforated Peptic Ulcer Guidelines."],
    pearls: ["Dolor en puñalada.", "Aire bajo el diafragma.", "No endoscopía."],
    pitfalls: ["No pedir radiografía de pie.", "Olvidar H. pylori."],
    tribunal: [
      qa("¿Qué signos clásicos de abdomen agudo conocés?", "Blumberg, Murphy, McBurney, psoas y Rovsing; la defensa muscular y la rigidez indican peritonitis."),
      qa("¿Cuál es la fase de la peritonitis por úlcera?", "Química en las primeras horas, y luego bacteriana."),
      qa("¿Dónde sangran y dónde se perforan las úlceras duodenales?", "Las posteriores sangran por la gastroduodenal; las anteriores se perforan."),
    ],
  },
};
