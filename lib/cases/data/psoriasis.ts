import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const psoriasis: ClinicalCase = {
  id: "psoriasis-en-placas",
  level: 1,
  area: "Dermatología",
  setting: "Consultorio",
  patient: { age: 38, ageUnit: "años", sex: "M", context: "Fumador, IMC 32. Trabaja en una ferretería. Empezó atenolol hace tres meses." },
  frequency: "frecuente",
  intro: "“Me salieron unas placas en los codos y las rodillas, con cáscaras blancas. Me da vergüenza usar manga corta.”",
  vitals: { TA: "138/86 mmHg", FC: "68 lpm", "T°": "36,4 °C" },
  anamnesis: [
    act("evolucion", "¿Desde cuándo? ¿Mejora o empeora?", "clave", "“Hace años, va y viene. Empeoró este invierno y con el remedio nuevo.”", "Curso crónico con brotes; algunos fármacos, como los betabloqueantes, la agravan."),
    act("articular", "¿Dolor o rigidez en articulaciones?", "clave", "“Se me hinchan algunos dedos y me duelen a la mañana.”", "Buscar artritis psoriásica: cambia el tratamiento."),
    act("familia", "¿Alguien en la familia tiene algo parecido?", "util", "“Mi papá.”", "Predisposición genética."),
    act("impacto", "¿Cómo te afecta el ánimo?", "util", "“Me aíslo.”", "Impacto psicosocial significativo."),
    act("habitos", "¿Fumás, tomás alcohol?", "util", "“Un atado y cerveza los fines de semana.”", "Factores agravantes y de riesgo cardiovascular."),
    act("club", "¿De qué club sos?", "neutro", "“De Belgrano.”", "No orienta."),
  ],
  exam: [
    act("placas", "Lesiones cutáneas", "clave", "Placas eritematosas bien delimitadas con escamas nacaradas en codos, rodillas y zona lumbar; cuero cabelludo afectado.", "Distribución típica."),
    act("raspado", "Raspado metódico (Brocq)", "clave", "Escamas que se desprenden, membrana fina, puntos de sangrado (Auspitz).", "Signo característico."),
    act("unas", "Uñas y articulaciones", "clave", "Piqueteado ungueal, onicólisis, dactilitis en un dedo.", "Las uñas se asocian a artritis psoriásica."),
  ],
  studies: [
    study("Otros", "clinico", "Diagnóstico clínico; biopsia solo si hay dudas", "util", "No hizo falta biopsia.", "La clínica suele alcanzar."),
    study("Laboratorio", "metabolico", "Glucemia, lípidos, función hepática y renal", "clave", "Glucemia 112, triglicéridos 260, transaminasas levemente altas.", "Asociada a síndrome metabólico; necesario antes del tratamiento sistémico."),
    study("Imágenes", "rx", "Radiografía de manos y derivación a reumatología", "clave", "Erosiones incipientes en la articulación distal.", "Evalúa artritis psoriásica."),
    study("Microbiología", "cultivo", "Cultivo de las escamas", "innecesario", "No se realizó.", "Sin sospecha de infección, no aporta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("psoriasis", "Psoriasis en placas moderada con artritis psoriásica", true, "Placas nacaradas en zonas de extensión, signo de Auspitz, compromiso ungueal y dactilitis."),
      dx("atopica", "Dermatitis atópica", false, "En el adulto afecta pliegues, con prurito intenso y sin placas nacaradas."),
      dx("tina", "Tiña corporal", false, "Es anular, con borde activo y centro claro."),
      dx("seborreica", "Dermatitis seborreica", false, "Afecta cara y pliegues con escama grasienta."),
      dx("lupus", "Lupus cutáneo", false, "Afecta zonas fotoexpuestas y deja atrofia."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("topicos", "Corticoides tópicos con análogos de la vitamina D y emolientes", "clave", "Base del tratamiento local."),
      mg("sistemico", "Por la artritis, derivar para tratamiento sistémico (metotrexato o biológico)", "clave", "La artritis puede causar daño permanente."),
      mg("factores", "Abordar tabaco, peso, alcohol y riesgo cardiovascular; revisar el betabloqueante", "clave", "Mejora la evolución y reduce el riesgo."),
      mg("corticoide-oral", "Corticoides orales", "riesgoso", "Al suspenderlos puede aparecer un rebote grave o psoriasis pustulosa."),
      mg("antibioticos", "Antibióticos de amplio espectro", "innecesario", "No es una infección."),
      mg("apoyo", "Apoyo psicológico si lo necesita", "util", "Alto impacto en la calidad de vida."),
    ],
  },
  debrief: {
    diagnosis: "Psoriasis en placas moderada con compromiso ungueal y artritis psoriásica, agravada por betabloqueante, en varón de 38 años.",
    pathologies: [
      { name: "Psoriasis", role: "principal", why: "Enfermedad inflamatoria crónica inmunomediada." },
      { name: "Artritis psoriásica, síndrome metabólico", role: "asociada", why: "Comorbilidades." },
      { name: "Dermatitis atópica, tiña, dermatitis seborreica, lupus", role: "diferencial", why: "Otras dermatosis." },
    ],
    reasoning: [
      "Causa: predisposición genética más desencadenantes como estrés, infecciones, fármacos y tabaco.",
      "Mecanismo: activación del eje IL-23/Th17 con hiperproliferación de queratinocitos.",
      "Consecuencia: placas eritematoescamosas, compromiso ungueal y articular, mayor riesgo cardiovascular.",
    ],
    epidemiology:
      "Afecta a alrededor del 1 al 3 % de la población, en todas las edades, con picos en la adultez joven y a los 50-60 años. Hasta un 30 % desarrolla artritis. Se asocia con obesidad, diabetes y enfermedad cardiovascular. Los betabloqueantes, el litio y los antipalúdicos pueden agravarla.",
    management: [
      "Evaluar extensión y articulaciones.",
      "Tópicos en formas leves a moderadas.",
      "Fototerapia, metotrexato o biológicos en formas extensas o con artritis.",
      "Abordar factores de riesgo y salud mental.",
    ],
    sources: ["Sociedad Argentina de Dermatología — Consenso de psoriasis.", "Sociedad Argentina de Reumatología — Recomendaciones de artritis psoriásica."],
    pearls: ["Placas nacaradas en zonas de extensión.", "Fenómeno de Koebner: lesiones donde hubo trauma.", "No uses corticoides orales."],
    pitfalls: ["No preguntar por las articulaciones.", "Olvidar el riesgo cardiovascular."],
    tribunal: [
      qa("¿Qué es el fenómeno de Koebner?", "La aparición de lesiones típicas de la enfermedad en una zona de traumatismo de la piel; se ve en psoriasis, liquen plano y vitíligo."),
      qa("¿Qué es el signo de Auspitz?", "El sangrado puntiforme al raspar la placa, por capilares dilatados y elongados en las papilas dérmicas."),
      qa("¿Qué fármacos pueden agravar la psoriasis?", "Betabloqueantes, litio, antipalúdicos, AINE en algunos casos y la suspensión brusca de corticoides sistémicos."),
    ],
  },
};
