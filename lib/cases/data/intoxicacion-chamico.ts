import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const intoxicacionChamico: ClinicalCase = {
  id: "intoxicacion-chamico-anticolinergica",
  level: 3,
  area: "Toxicología",
  setting: "Guardia",
  patient: { age: 17, ageUnit: "años", sex: "M", context: "Lo traen dos amigos de un campamento. Tomaron un té de semillas de chamico (Datura) 'para alucinar'." },
  frequency: "poco-frecuente",
  intro: "Los amigos: “Está loco, habla con gente que no está, se saca la ropa y está colorado y caliente.”",
  vitals: { TA: "148/88 mmHg", FC: "138 lpm", FR: "22 rpm", "T°": "38,7 °C", "SatO₂": "97 %", Glucemia: "104 mg/dl" },
  anamnesis: [
    act("sustancia", "¿Qué tomó y cuándo?", "clave", "“Té de semillas de chamico hace tres horas.”", "Datura: anticolinérgico."),
    act("cantidad", "¿Cuánto?", "clave", "“Una taza grande.”", "Dosis."),
    act("otras", "¿Alcohol u otras drogas?", "clave", "“Cerveza.”", "Coingesta."),
    act("orina", "¿Orinó?", "util", "“No, hace horas.”", "Retención."),
    act("convulsiones", "¿Convulsionó?", "util", "“No.”", "Gravedad."),
    act("escuela", "¿Qué año?", "neutro", "“Quinto.”", "No orienta."),
  ],
  exam: [
    act("pupilas", "Pupilas y piel", "clave", "Midriasis, piel seca, roja y caliente.", "Toxíndrome anticolinérgico."),
    act("mental", "Estado mental", "clave", "Delirio con alucinaciones, agitado.", "Neurotoxicidad."),
    act("abdomen", "Ruidos y vejiga", "util", "Ruidos disminuidos, globo vesical.", "Anticolinérgico."),
  ],
  studies: [
    study("Electrofisiología", "ecg", "ECG", "clave", "Taquicardia sinusal, QRS normal.", "Excluye tricíclicos."),
    study("Laboratorio", "lab", "Glucemia, CPK, ionograma, paracetamol", "clave", "CPK 900; paracetamol negativo.", "Rabdomiólisis leve."),
    study("Otros", "monitor", "Monitoreo cardíaco", "util", "Taquicardia.", "Arritmias."),
    study("Otros", "haloperidol", "Haloperidol para la agitación", "riesgoso", "No se indicó.", "Empeora la hipertermia y baja el umbral convulsivo."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("anticolinergico", "Intoxicación anticolinérgica por Datura (chamico)", true, "Té de chamico, delirio, midriasis, piel seca y caliente, taquicardia, retención urinaria e íleo."),
      dx("simpaticomimetico", "Intoxicación por cocaína o anfetaminas", false, "Piel seca: los simpaticomiméticos sudan."),
      dx("serotoninergico", "Síndrome serotoninérgico", false, "Sin clonus y con piel seca."),
      dx("psicosis", "Primer episodio psicótico", false, "Signos autonómicos de toxíndrome."),
      dx("meningitis", "Meningoencefalitis", false, "Ingesta clara y toxíndrome."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("benzo", "Benzodiacepinas para la agitación", "clave", "Seguras en este toxíndrome."),
      mg("enfriamiento", "Medidas físicas para la hipertermia e hidratación", "clave", "Hipertermia y CPK."),
      mg("sonda", "Sonda vesical por la retención", "clave", "Globo vesical."),
      mg("fisostigmina", "Fisostigmina en casos graves con ECG normal", "util", "Antídoto, con monitoreo."),
      mg("sujecion", "Sujeción mecánica prolongada sin sedación", "riesgoso", "Hipertermia y rabdomiólisis."),
      mg("antipireticos", "Paracetamol como única medida", "riesgoso", "La fiebre no es por pirógenos."),
    ],
  },
  debrief: {
    diagnosis: "Intoxicación anticolinérgica por té de semillas de Datura (chamico), en adolescente de 17 años.",
    pathologies: [
      { name: "Toxíndrome anticolinérgico", role: "principal", why: "Alcaloides de Datura (atropina, escopolamina)." },
      { name: "Hipertermia y rabdomiólisis", role: "asociada", why: "Agitación y falta de sudor." },
      { name: "Simpaticomimético, serotoninérgico", role: "diferencial", why: "Otros toxíndromes." },
    ],
    reasoning: [
      "Causa: escopolamina y atropina de la planta.",
      "Mecanismo: bloqueo de receptores muscarínicos centrales y periféricos.",
      "Consecuencia: delirio, hipertermia, taquicardia, retención urinaria e íleo.",
    ],
    epidemiology:
      "El chamico crece en todo el país y se usa como alucinógeno entre adolescentes, con brotes en campamentos y fiestas. La regla mnemotécnica es 'rojo como tomate, seco como hueso, caliente como liebre, ciego como topo y loco como cabra'.",
    management: [
      "Reconocer el toxíndrome.",
      "Benzodiacepinas.",
      "Enfriar e hidratar.",
      "Sonda vesical.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de intoxicaciones por plantas.", "Goldfrank's Toxicologic Emergencies — Anticholinergic Toxicity."],
    pearls: ["Piel seca: anticolinérgico.", "Benzodiacepinas, no haloperidol.", "Globo vesical."],
    pitfalls: ["Haloperidol.", "Confundir con psicosis."],
    tribunal: [
      qa("¿Cómo diferenciás anticolinérgico de simpaticomimético?", "Los dos tienen midriasis y taquicardia, pero el simpaticomimético suda y el anticolinérgico tiene piel seca."),
      qa("¿Cuándo no se usa fisostigmina?", "Si hay QRS ancho o sospecha de tricíclicos, por riesgo de asistolia."),
      qa("¿Cuánto dura el cuadro?", "Hasta 24 a 48 horas, porque los alcaloides enlentecen la evacuación gástrica."),
    ],
  },
};
