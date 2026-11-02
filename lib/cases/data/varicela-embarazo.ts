import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const varicelaEmbarazo: ClinicalCase = {
  id: "varicela-embarazada-neumonia",
  level: 3,
  area: "Infectología",
  setting: "Guardia",
  patient: { age: 29, ageUnit: "años", sex: "F", context: "Embarazo de 26 semanas. Fuma. Su hijo de 4 años tuvo varicela hace dos semanas. Ella nunca la tuvo." },
  frequency: "poco-frecuente",
  intro: "“Hace tres días me salieron ampollitas en todo el cuerpo y desde ayer tengo tos, me falta el aire y fiebre de 39.”",
  vitals: { TA: "112/68 mmHg", FC: "118 lpm", FR: "28 rpm", "T°": "39,1 °C", "SatO₂": "90 %" },
  anamnesis: [
    act("contacto", "¿Cuándo tuvo la varicela tu hijo? ¿Recibiste algo después?", "clave", "“Hace dos semanas; no me dieron nada.”", "Contacto sin profilaxis (gammaglobulina específica o aciclovir) en una embarazada susceptible."),
    act("respiratorio", "¿Cuándo empezó la tos y la falta de aire?", "clave", "“Ayer, va empeorando.”", "Neumonía por varicela: aparece a los 1–6 días del exantema."),
    act("tabaco", "¿Cuánto fumás?", "util", "“Diez por día.”", "El tabaco aumenta el riesgo de neumonía varicelosa."),
    act("movimientos", "¿Se mueve el bebé?", "util", "“Sí.”", "Bienestar fetal."),
    act("vacuna", "¿Te vacunaste contra la varicela?", "util", "“No.”", "Debería haberse vacunado antes del embarazo."),
    act("hijo", "¿Cómo se llama tu hijo?", "neutro", "“Benjamín.”", "No orienta."),
  ],
  exam: [
    act("piel", "Piel", "clave", "Lesiones en distintos estadios (máculas, vesículas, costras) en todo el cuerpo.", "Polimorfismo típico de la varicela."),
    act("pulmon", "Auscultación", "clave", "Rales crepitantes bilaterales.", "Neumonía."),
    act("obstetrico", "Altura uterina y latidos fetales", "util", "Acordes, 152 lpm.", "Feto vital."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de tórax con protección abdominal", "clave", "Infiltrado nodular bilateral difuso.", "Neumonía varicelosa; la radiografía con protección es segura en el embarazo."),
    study("Laboratorio", "gases", "Gases arteriales", "clave", "pO₂ 58 mmHg.", "Insuficiencia respiratoria."),
    study("Laboratorio", "lab", "Hemograma, hepatograma, coagulograma", "util", "Transaminasas levemente elevadas.", "Compromiso sistémico."),
    study("Microbiología", "pcr", "PCR de vesícula", "util", "VVZ positivo.", "Confirma si hay dudas."),
    study("Imágenes", "tc", "Tomografía de tórax sin indicación clara", "innecesario", "No se realizó.", "La radiografía alcanza."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("neumonia-vvz", "Varicela con neumonía varicelosa e insuficiencia respiratoria en embarazo de 26 semanas", true, "Exantema polimorfo tras contacto con su hijo, sin inmunidad previa, con tos, disnea, hipoxemia e infiltrado nodular bilateral."),
      dx("varicela-simple", "Varicela no complicada", false, "Hay neumonía con hipoxemia."),
      dx("nac", "Neumonía bacteriana", false, "Infiltrado bilateral nodular en el contexto de varicela."),
      dx("tep", "Tromboembolismo pulmonar", false, "Fiebre, exantema y rales con infiltrados explican el cuadro."),
      dx("congenita", "Varicela congénita", false, "Es una complicación fetal posible, no el diagnóstico materno actual."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("aciclovir", "Aciclovir endovenoso de inmediato", "clave", "La neumonía varicelosa en el embarazo tiene alta mortalidad: el aciclovir EV es seguro y eficaz."),
      mg("uti", "Internación en terapia intensiva con oxígeno y monitoreo materno-fetal", "clave", "Insuficiencia respiratoria."),
      mg("aislamiento", "Aislamiento aéreo y de contacto", "clave", "Muy contagiosa."),
      mg("rn", "Plan para el recién nacido si el parto ocurre cerca del exantema (gammaglobulina)", "util", "La varicela perinatal es grave."),
      mg("oral", "Aciclovir oral ambulatorio", "riesgoso", "Insuficiente con neumonía e hipoxemia."),
      mg("interrupcion", "Interrupción inmediata del embarazo", "riesgoso", "No mejora la neumonía; se decide por indicación obstétrica."),
    ],
  },
  debrief: {
    diagnosis: "Varicela complicada con neumonía e insuficiencia respiratoria en embarazada de 26 semanas, fumadora, susceptible y sin profilaxis posexposición.",
    pathologies: [
      { name: "Neumonía varicelosa", role: "principal", why: "Complicación grave de la varicela en adultos y embarazadas." },
      { name: "Riesgo fetal y perinatal", role: "asociada", why: "Síndrome de varicela congénita y varicela neonatal." },
      { name: "Neumonía bacteriana, TEP", role: "diferencial", why: "Se descartan." },
    ],
    reasoning: [
      "Causa: primoinfección por virus varicela zoster en una adulta susceptible.",
      "Mecanismo: la viremia afecta el pulmón con neumonitis intersticial; el embarazo modifica la inmunidad y la mecánica respiratoria.",
      "Consecuencia: insuficiencia respiratoria con mortalidad materna importante; riesgo fetal según la edad gestacional.",
    ],
    epidemiology:
      "La varicela en adultos es mucho más grave que en niños, y en el embarazo la neumonía complica hasta el 10–20 % de los casos. La mayoría de las adultas en Argentina son inmunes, pero las susceptibles deben vacunarse antes del embarazo; la vacuna está en el Calendario a los 15 meses y 5 años.",
    management: [
      "Preguntar por varicela previa en la consulta preconcepcional y vacunar a las susceptibles (no en el embarazo).",
      "Embarazada susceptible expuesta: gammaglobulina específica lo antes posible (idealmente en las primeras 96 h, hasta 10 días), o aciclovir.",
      "Varicela en el embarazo: aciclovir; con neumonía, EV e internación.",
      "Atención especial al recién nacido si el exantema materno ocurre cerca del parto.",
    ],
    sources: ["Ministerio de Salud de la Nación — Normas de vacunación (varicela) y guía de infecciones perinatales.", "Sociedad Argentina de Infectología — Recomendaciones de varicela en el embarazo."],
    pearls: ["Varicela en embarazada + tos = neumonía hasta demostrar lo contrario.", "Aciclovir EV.", "Profilaxis posexposición."],
    pitfalls: ["No dar profilaxis tras el contacto.", "Tratar en forma ambulatoria con neumonía."],
    tribunal: [
      qa("¿Qué es el síndrome de varicela congénita?", "El daño fetal por varicela materna antes de la semana 20: cicatrices cutáneas en dermatoma, hipoplasia de miembros, lesiones oculares y neurológicas; el riesgo es de alrededor del 1–2 %."),
      qa("¿Cuándo es grave la varicela neonatal?", "Cuando la madre tiene el exantema entre 5 días antes y 2 días después del parto: el bebé recibe el virus sin anticuerpos maternos; se le da gammaglobulina específica y aciclovir si enferma."),
      qa("¿Por qué no se vacuna contra la varicela en el embarazo?", "Porque es una vacuna a virus vivo atenuado; se indica antes del embarazo o en el puerperio, con anticoncepción por un mes después de cada dosis."),
    ],
  },
};
