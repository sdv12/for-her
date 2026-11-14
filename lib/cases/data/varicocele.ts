import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const varicocele: ClinicalCase = {
  id: "varicocele",
  level: 1,
  area: "Nefrourología",
  setting: "Consultorio",
  patient: { age: 17, ageUnit: "años", sex: "M", context: "Juega al básquet. Viene a hacerse el apto físico." },
  frequency: "frecuente",
  intro: "“Tengo como venas en el testículo izquierdo y a veces me pesa después de entrenar.”",
  vitals: { TA: "118/72 mmHg", FC: "64 lpm", "T°": "36,4 °C" },
  anamnesis: [
    act("lado", "¿De qué lado y cuándo empeora?", "clave", "“Izquierdo, de pie y después de entrenar.”", "Típico."),
    act("dolor", "¿Dolor agudo, fiebre o golpe?", "clave", "“No, solo pesadez.”", "Excluye torsión y orquitis."),
    act("aparicion", "¿Apareció de golpe?", "clave", "“No, hace un año.”", "Un varicocele de aparición brusca o derecho sugiere tumor."),
    act("pubertad", "¿Cómo fue tu desarrollo?", "util", "“Normal.”", "Base."),
    act("autoexamen", "¿Te revisás los testículos?", "util", "“Nunca.”", "Educación."),
    act("posicion", "¿En qué posición jugás?", "neutro", "“Base.”", "No orienta."),
  ],
  exam: [
    act("bolsa", "Examen escrotal de pie y con Valsalva", "clave", "Plexo venoso dilatado palpable 'en bolsa de gusanos' a izquierda, aumenta con Valsalva, desaparece acostado.", "Varicocele grado 2."),
    act("volumen", "Volumen testicular con orquidómetro", "clave", "Izquierdo 18 ml, derecho 20 ml.", "Diferencia menor del 20 %."),
    act("abdomen", "Abdomen", "util", "Sin masas.", "Excluye compresión."),
  ],
  studies: [
    study("Imágenes", "doppler", "Ecografía Doppler escrotal", "clave", "Venas de 3,5 mm con reflujo en Valsalva; volúmenes simétricos.", "Confirma."),
    study("Laboratorio", "espermograma", "Espermograma en adolescente sin indicación", "innecesario", "No se realizó.", "Se pide en adultos con infertilidad."),
    study("Imágenes", "eco-renal", "Ecografía renal si fuera derecho o de aparición brusca", "util", "No hizo falta.", "Descartar tumor renal."),
    study("Otros", "cirugia-ya", "Cirugía inmediata por el hallazgo", "riesgoso", "No se indicó.", "Sin atrofia ni dolor no hay indicación."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("varicocele", "Varicocele izquierdo grado 2 sin asimetría testicular significativa", true, "Bolsa de gusanos izquierda que aumenta con Valsalva y desaparece acostado, volúmenes casi simétricos."),
      dx("hidrocele", "Hidrocele", false, "Transilumina y no es venoso."),
      dx("hernia", "Hernia inguinoescrotal", false, "Doppler con venas."),
      dx("tumor", "Tumor testicular", false, "Testículo normal."),
      dx("epididimitis", "Epididimitis", false, "Sin dolor agudo ni fiebre."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("seguimiento", "Control anual de volumen testicular", "clave", "Operar si aparece atrofia."),
      mg("apto", "Apto físico sin restricciones", "clave", "No contraindica el deporte."),
      mg("autoexamen", "Enseñar el autoexamen testicular", "clave", "Detección precoz."),
      mg("suspensorio", "Suspensorio para la pesadez", "util", "Síntomas."),
      mg("prohibir-deporte", "Prohibir el básquet", "riesgoso", "Sin fundamento."),
      mg("infertil", "Decirle que va a ser infértil", "riesgoso", "Falso y genera angustia."),
    ],
  },
  debrief: {
    diagnosis: "Varicocele izquierdo grado 2 sin asimetría testicular significativa, en adolescente de 17 años.",
    pathologies: [
      { name: "Varicocele", role: "principal", why: "Dilatación del plexo pampiniforme." },
      { name: "Riesgo de atrofia testicular", role: "asociada", why: "Motivo de seguimiento." },
      { name: "Hidrocele, hernia", role: "diferencial", why: "Otras masas escrotales." },
    ],
    reasoning: [
      "Causa: válvulas incompetentes en la vena espermática izquierda.",
      "Mecanismo: la vena izquierda drena en ángulo recto a la renal y tiene más presión.",
      "Consecuencia: aumento de temperatura testicular y posible afectación de la espermatogénesis.",
    ],
    epidemiology:
      "Afecta al 15 % de los varones, casi siempre a izquierda, y aparece en la pubertad. La mayoría no necesita cirugía. Un varicocele derecho aislado o de aparición brusca obliga a buscar una masa abdominal.",
    management: [
      "Examen de pie.",
      "Doppler.",
      "Seguimiento de volumen.",
      "Cirugía si hay atrofia o dolor.",
    ],
    sources: ["Sociedad Argentina de Urología — Varicocele.", "EAU — Paediatric Urology Guidelines: Varicocele."],
    pearls: ["Bolsa de gusanos.", "Derecho o brusco: buscá tumor.", "Control de volumen."],
    pitfalls: ["Operar a todos.", "Prohibir deporte."],
    tribunal: [
      qa("¿Cuándo se opera un varicocele en adolescentes?", "Con diferencia de volumen testicular mayor del 20 %, dolor o alteración seminal persistente."),
      qa("¿Por qué es más frecuente a izquierda?", "La vena espermática izquierda drena en ángulo recto a la vena renal izquierda."),
      qa("¿Qué es el hidrocele?", "Acumulación de líquido en la túnica vaginal que transilumina."),
    ],
  },
};
