import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const retencionUrinaria: ClinicalCase = {
  id: "retencion-urinaria-hpb",
  level: 2,
  area: "Nefrourología",
  setting: "Guardia",
  patient: { age: 74, ageUnit: "años", sex: "M", context: "Jubilado. Resfriado desde hace tres días." },
  frequency: "frecuente",
  intro: "“No puedo orinar desde anoche. Tengo muchas ganas, me duele abajo y sale nada, unas gotitas.”",
  vitals: { TA: "160/94 mmHg", FC: "96 lpm", "T°": "36,8 °C" },
  anamnesis: [
    act("prostatismo", "¿Antes de esto, cómo orinaba? ¿Chorro débil, se levanta de noche, le cuesta empezar?", "clave", "“Hace años que el chorro es flojito, me levanto tres veces de noche y tengo que esperar para que salga.”", "Síntomas del tracto urinario inferior típicos de hiperplasia prostática benigna."),
    act("farmacos", "¿Tomó algún antigripal o medicamento nuevo?", "clave", "“Sí, un antigripal de la farmacia, dos veces por día.”", "Los antigripales con antihistamínicos (anticolinérgicos) y descongestivos (simpaticomiméticos) son desencadenantes clásicos de retención."),
    act("neuro", "¿Tiene debilidad en las piernas, hormigueos o dolor de espalda?", "clave", "“No.”", "Una causa neurológica (compresión medular, cola de caballo) cambia todo el abordaje."),
    act("fiebre", "¿Tuvo fiebre o ardor al orinar?", "util", "“No.”", "Una prostatitis aguda también puede causar retención y requiere antibiótico."),
    act("hematuria", "¿Vio sangre en la orina?", "util", "“No.”", "La hematuria con coágulos puede obstruir; además obliga a descartar cáncer."),
    act("constipacion", "¿Está estreñido?", "util", "“Hace tres días que no voy.”", "La constipación con fecaloma también puede precipitar retención."),
    act("nietos", "¿Tiene nietos?", "neutro", "“Seis.”", "No orienta."),
  ],
  exam: [
    act("globo", "Palpación y percusión del hipogastrio", "clave", "Masa suprapúbica redondeada, mate, dolorosa, que llega casi al ombligo (globo vesical).", "Confirma la retención."),
    act("tacto", "Tacto rectal", "clave", "Próstata aumentada de tamaño, lisa, elástica, simétrica, con surco medio borrado, indolora. Sin fecaloma.", "Hiperplasia benigna: una próstata pétrea, irregular o nodular sugeriría cáncer; una dolorosa, prostatitis."),
    act("neuro", "Examen neurológico de miembros inferiores y periné", "util", "Fuerza, sensibilidad y reflejos normales; sensibilidad perineal conservada.", "Descarta causa neurológica."),
    act("hidratacion", "Hidratación", "neutro", "Normohidratado.", "No cambia la conducta inmediata."),
  ],
  studies: [
    study("Imágenes", "eco-vesical", "Ecografía vesical (o vejiga escáner)", "util", "Volumen vesical estimado: 900 ml.", "Confirma y cuantifica la retención sin invasión."),
    study("Laboratorio", "renal", "Creatinina, urea e ionograma", "clave", "Creatinina 1,4 mg/dl (basal 1,0), K 4,6.", "Una retención prolongada puede dañar los riñones (fallo posrenal); la creatinina sirve para controlar la recuperación."),
    study("Laboratorio", "orina", "Orina completa y urocultivo (de la muestra de la sonda)", "util", "Sin piuria; urocultivo negativo.", "Descarta infección."),
    study("Laboratorio", "psa", "PSA en la guardia", "innecesario", "No se realizó.", "Se eleva con la retención, la sonda y el tacto: medirlo ahora da falsos positivos. Se pide más adelante si corresponde."),
    study("Imágenes", "tc", "Tomografía de abdomen", "innecesario", "No se realizó.", "No aporta en una retención con causa clara."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("rao", "Retención aguda de orina por hiperplasia prostática benigna, precipitada por un antigripal", true, "Síntomas obstructivos previos, próstata aumentada lisa y elástica, globo vesical y antigripal anticolinérgico y descongestivo como disparador."),
      dx("cancer", "Cáncer de próstata", false, "En el tacto la próstata sería pétrea, nodular o asimétrica."),
      dx("prostatitis", "Prostatitis aguda", false, "Fiebre, síntomas irritativos y próstata muy dolorosa al tacto."),
      dx("neurogena", "Vejiga neurógena por compresión medular", false, "Habría déficit motor o sensitivo, dolor de espalda o anestesia perineal."),
      dx("estenosis", "Estrechez uretral", false, "Antecedente de sondajes, traumatismo o uretritis; chorro fino desde hace tiempo con próstata normal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("sonda", "Sonda vesical (Foley) con técnica estéril y drenaje", "clave", "Alivia de inmediato y evita el daño vesical y renal."),
      mg("alfa", "Iniciar tamsulosina y suspender el antigripal", "clave", "El alfabloqueante relaja el músculo liso prostático y aumenta las chances de orinar al retirar la sonda."),
      mg("prueba", "Retirar la sonda en 2–3 días (prueba sin sonda) y control con urología", "clave", "Muchos pacientes vuelven a orinar; si falla, se evalúa tratamiento definitivo."),
      mg("diuresis", "Controlar la diuresis horaria las primeras horas", "util", "Tras drenar volúmenes grandes puede haber diuresis posobstructiva."),
      mg("furosemida", "Furosemida para que orine", "riesgoso", "Aumenta la producción de orina en una vejiga que no puede vaciarse: más distensión y dolor."),
      mg("alta-sin", "Alta con analgésicos para que lo intente en casa", "riesgoso", "Sin drenaje, la retención empeora y daña la vejiga y los riñones."),
    ],
  },
  debrief: {
    diagnosis: "Retención aguda de orina por hiperplasia prostática benigna, precipitada por un antigripal con anticolinérgicos y descongestivos, con leve insuficiencia renal posrenal.",
    pathologies: [
      { name: "Retención aguda de orina", role: "principal", why: "Imposibilidad de orinar con globo vesical." },
      { name: "Hiperplasia prostática benigna", role: "asociada", why: "Causa de base de la obstrucción." },
      { name: "Insuficiencia renal aguda posrenal", role: "asociada", why: "Creatinina elevada por la obstrucción." },
      { name: "Cáncer de próstata", role: "diferencial", why: "Se sospecha por el tacto." },
      { name: "Vejiga neurógena", role: "diferencial", why: "Causa neurológica a descartar." },
    ],
    reasoning: [
      "Causa: la hiperplasia prostática benigna aumenta el tamaño de la zona de transición que rodea a la uretra (efecto de la dihidrotestosterona con la edad).",
      "Mecanismo: hay un componente estático (el volumen) y uno dinámico (el tono del músculo liso con receptores alfa-1). El descongestivo aumenta el tono alfa y el antihistamínico disminuye la contracción del detrusor (efecto anticolinérgico).",
      "Consecuencia: la vejiga no puede vencer la resistencia y se distiende → dolor, globo vesical y, si se prolonga, aumento de la presión retrógrada que daña el riñón.",
      "El alfabloqueante actúa sobre el componente dinámico; los inhibidores de la 5-alfa reductasa, a largo plazo, sobre el volumen.",
    ],
    epidemiology:
      "La hiperplasia prostática benigna afecta a la mitad de los varones de 60 años y a cerca del 80 % de los de 80. La retención aguda de orina es una urgencia urológica frecuente en varones mayores, y en muchos casos tiene un desencadenante: fármacos (antigripales, antidepresivos, opioides), alcohol, constipación, cirugías o inmovilidad.",
    management: [
      "Sondaje vesical inmediato (suprapúbico si no pasa la sonda uretral).",
      "Buscar y suspender desencadenantes; tratar la constipación o la infección si hay.",
      "Alfabloqueante y prueba sin sonda a los 2–3 días.",
      "Control de la función renal y de la diuresis posobstructiva.",
      "Derivar a urología: tratamiento médico combinado o quirúrgico; PSA en un momento adecuado según la evaluación.",
    ],
    sources: [
      "Sociedad Argentina de Urología — Guía de hiperplasia prostática benigna.",
      "Guías de la Asociación Europea de Urología (EAU) sobre síntomas del tracto urinario inferior masculino.",
    ],
    pearls: [
      "Varón mayor con antigripal que no puede orinar: retención por HPB.",
      "Próstata lisa y elástica = benigna; pétrea y nodular = sospecha de cáncer.",
      "No pidas PSA con sonda puesta.",
    ],
    pitfalls: ["Dar furosemida.", "Mandarlo a casa sin drenar.", "Pedir PSA en la guardia."],
  },
};
