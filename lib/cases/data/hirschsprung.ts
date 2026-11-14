import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hirschsprung: ClinicalCase = {
  id: "enfermedad-hirschsprung",
  level: 3,
  area: "Cirugía",
  setting: "Internación",
  patient: { age: 3, ageUnit: "días", sex: "M", context: "Recién nacido de término, en internación conjunta. Síndrome de Down." },
  frequency: "poco-frecuente",
  intro: "La enfermera: “No eliminó meconio en 72 horas, tiene la panza muy distendida y vomitó verde.”",
  vitals: { FC: "156 lpm", FR: "48 rpm", "T°": "36,9 °C", "SatO₂": "97 %", Peso: "3.050 g" },
  anamnesis: [
    act("meconio", "¿Cuándo eliminó meconio?", "clave", "Todavía no, a las 72 horas.", "Retraso mayor de 48 horas."),
    act("vomitos", "¿Cómo son los vómitos?", "clave", "Biliosos.", "Obstrucción intestinal."),
    act("down", "¿Tiene alguna condición genética?", "clave", "Síndrome de Down.", "Asociación conocida."),
    act("alimentacion", "¿Toma el pecho?", "util", "Poco.", "Intolerancia."),
    act("fiebre", "¿Fiebre o diarrea?", "util", "No.", "Enterocolitis."),
    act("nombre", "¿Cómo se llama?", "neutro", "Joaquín.", "No orienta."),
  ],
  exam: [
    act("abdomen", "Abdomen", "clave", "Distensión importante, timpanismo.", "Obstrucción baja."),
    act("tacto", "Tacto rectal", "clave", "Ampolla vacía; al retirar el dedo sale meconio explosivo y gas.", "Signo típico."),
    act("ano", "Ano", "util", "Normal ubicado y permeable.", "Excluye malformación anorrectal."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de abdomen", "clave", "Asas distendidas, sin aire en el recto.", "Obstrucción distal."),
    study("Imágenes", "colon-contraste", "Colon por enema con contraste hidrosoluble", "clave", "Zona de transición rectosigmoidea con recto estrecho.", "Sugiere Hirschsprung."),
    study("Otros", "biopsia-rectal", "Biopsia rectal por succión", "clave", "Ausencia de células ganglionares.", "Confirma."),
    study("Otros", "laxantes", "Laxantes orales y alta", "riesgoso", "No se indicó.", "Enterocolitis grave."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hirschsprung", "Enfermedad de Hirschsprung (aganglionosis rectosigmoidea)", true, "Retraso del meconio, distensión, vómitos biliosos, salida explosiva al tacto, zona de transición y biopsia sin ganglios."),
      dx("ileo-meconial", "Íleo meconial por fibrosis quística", false, "Zona de transición y biopsia sin ganglios."),
      dx("hipotiroidismo", "Hipotiroidismo congénito", false, "Hay aganglionosis demostrada."),
      dx("atresia", "Atresia intestinal", false, "El enema muestra transición, no microcolon con atresia."),
      dx("malformacion-anorrectal", "Malformación anorrectal", false, "Ano normal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("descompresion", "Sonda nasogástrica, ayuno e hidratación EV", "clave", "Estabilizar."),
      mg("irrigaciones", "Irrigaciones rectales con solución fisiológica", "clave", "Descomprimir y prevenir enterocolitis."),
      mg("cirugia", "Descenso endorrectal (cirugía definitiva)", "clave", "Tratamiento."),
      mg("alarma", "Pautas de alarma de enterocolitis a la familia", "util", "Complicación grave."),
      mg("enemas-agua", "Enemas con agua de la canilla", "riesgoso", "Riesgo de intoxicación hídrica."),
      mg("alta", "Alta y control en una semana", "riesgoso", "Riesgo de enterocolitis y perforación."),
    ],
  },
  debrief: {
    diagnosis: "Enfermedad de Hirschsprung con aganglionosis rectosigmoidea, en recién nacido de 3 días con síndrome de Down.",
    pathologies: [
      { name: "Enfermedad de Hirschsprung", role: "principal", why: "Ausencia de células ganglionares." },
      { name: "Síndrome de Down", role: "asociada", why: "Mayor riesgo." },
      { name: "Íleo meconial, atresia", role: "diferencial", why: "Otras obstrucciones neonatales." },
    ],
    reasoning: [
      "Causa: falla en la migración de las células de la cresta neural.",
      "Mecanismo: el segmento sin ganglios no se relaja y actúa como obstrucción funcional.",
      "Consecuencia: retraso del meconio, distensión y enterocolitis.",
    ],
    epidemiology:
      "Afecta a 1 de cada 5.000 nacidos, más a varones y a niños con síndrome de Down. El 90 % de los recién nacidos de término elimina meconio en las primeras 24 horas. La enterocolitis es la complicación más grave.",
    management: [
      "Meconio tardío: sospechar.",
      "Enema y biopsia.",
      "Irrigaciones.",
      "Cirugía.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Constipación y enfermedad de Hirschsprung.", "APSA — Hirschsprung Disease Guidelines."],
    pearls: ["Meconio después de 48 horas.", "Salida explosiva al tacto.", "Biopsia por succión."],
    pitfalls: ["Laxantes y alta.", "Ignorar la enterocolitis."],
    tribunal: [
      qa("¿Qué es la enterocolitis de Hirschsprung?", "Inflamación grave del colon con fiebre, diarrea fétida y distensión, que puede llevar a sepsis."),
      qa("¿Qué muestra la manometría anorrectal?", "Ausencia del reflejo inhibitorio rectoanal."),
      qa("¿Qué tinción ayuda en la biopsia?", "La acetilcolinesterasa, que muestra fibras nerviosas hipertróficas."),
    ],
  },
};
