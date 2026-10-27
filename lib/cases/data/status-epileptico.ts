import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const statusEpileptico: ClinicalCase = {
  id: "estado-de-mal-epileptico",
  level: 3,
  area: "Neurología",
  setting: "Guardia",
  patient: { age: 32, ageUnit: "años", sex: "M", context: "Epiléptico conocido. Lo trae la hermana en remís." },
  frequency: "frecuente",
  intro: "“Convulsionó en casa, se calmó un poco en el auto y ahora empezó de nuevo. No se despertó entre medio. Ya va como un cuarto de hora en total.”",
  vitals: { TA: "160/95 mmHg", FC: "128 lpm", FR: "26 rpm", "T°": "37,9 °C", "SatO₂": "89 %" },
  anamnesis: [
    act("tiempo", "¿Cuánto hace que empezó y se despertó entre las crisis?", "clave", "“Unos 15 minutos; entre una y otra no se despertó.”", "Una crisis de más de 5 minutos o crisis repetidas sin recuperación de la conciencia definen el estado de mal epiléptico."),
    act("medicacion", "¿Qué medicación toma? ¿La estaba tomando?", "clave", "“Ácido valproico, pero lo dejó hace dos semanas porque se le terminó.”", "La suspensión de los antiepilépticos es la causa más frecuente de estado de mal en epilépticos conocidos."),
    act("alcohol", "¿Toma alcohol o consume drogas?", "clave", "“Toma bastante los fines de semana.”", "El alcohol (intoxicación o abstinencia) y las drogas desencadenan crisis; en alcoholistas se da tiamina antes de la glucosa."),
    act("golpe", "¿Se golpeó la cabeza?", "util", "“Se cayó al piso al empezar, no sé si se golpeó.”", "Un traumatismo podría causar un hematoma: tomografía después de estabilizar."),
    act("fiebre", "¿Tuvo fiebre, dolor de cabeza o estuvo enfermo?", "util", "“Ayer estaba bien.”", "Fiebre previa orientaría a infección del sistema nervioso central."),
    act("diabetes", "¿Es diabético?", "util", "“No.”", "La hipoglucemia causa convulsiones."),
    act("previos", "¿Tuvo estados de mal antes?", "util", "“Una vez, hace años.”", "Antecedente de riesgo."),
    act("equipo", "¿Trabaja?", "neutro", "“Es pintor.”", "No orienta."),
  ],
  exam: [
    act("crisis", "Observar la crisis", "clave", "Crisis tónico-clónica generalizada en curso, con desviación de la mirada y sialorrea.", "Estado de mal epiléptico convulsivo generalizado."),
    act("via", "Vía aérea, respiración y saturación", "clave", "Respiración ruidosa con secreciones, saturación 89 %.", "La hipoxemia empeora el daño neuronal: prioridad del ABC."),
    act("lengua", "Lengua y lesiones", "util", "Mordedura lateral de lengua; escoriación frontal.", "Típico de crisis generalizada; la escoriación obliga a descartar TEC."),
    act("pupilas", "Pupilas y signos meníngeos (entre crisis)", "util", "Pupilas medias reactivas; sin rigidez de nuca.", "Descarta foco evidente y meningismo."),
  ],
  studies: [
    study("Laboratorio", "glucemia", "Glucemia capilar inmediata", "clave", "112 mg/dl.", "La hipoglucemia es una causa tratable que se descarta de inmediato."),
    study("Laboratorio", "lab", "Ionograma, calcio, magnesio, función renal y hepática, CPK, gases, niveles de valproato y tóxicos", "clave", "Na 138, Ca y Mg normales; valproato indetectable; acidosis láctica.", "Busca causas metabólicas y confirma la falta del antiepiléptico."),
    study("Imágenes", "tc", "Tomografía de cerebro una vez controlada la crisis", "util", "Sin lesiones agudas.", "Indicada por la caída con posible TEC; se hace tras estabilizar."),
    study("Electrofisiología", "eeg", "Electroencefalograma", "util", "Actividad lenta posictal, sin descargas persistentes.", "Indispensable si no recupera la conciencia: descarta un estado de mal no convulsivo."),
    study("Otros", "pl", "Punción lumbar de rutina", "innecesario", "No se realizó.", "Solo si se sospecha infección del sistema nervioso central (fiebre, meningismo, inmunosupresión)."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("status", "Estado de mal epiléptico convulsivo generalizado por suspensión del valproato", true, "Crisis tónico-clónicas repetidas sin recuperación de la conciencia por más de 5 minutos, en un epiléptico que dejó la medicación, con niveles indetectables."),
      dx("crisis-aislada", "Crisis epiléptica aislada", false, "Una crisis única que cede sola en menos de 5 minutos con recuperación de la conciencia."),
      dx("psicogena", "Crisis psicógenas no epilépticas", false, "Ojos cerrados con resistencia a la apertura, movimientos asincrónicos, sin cianosis ni acidosis láctica; acá hay mordedura y acidosis."),
      dx("meningitis", "Meningoencefalitis", false, "Fiebre, meningismo y alteración de conciencia; la febrícula se explica por la actividad muscular."),
      dx("abstinencia", "Convulsiones por abstinencia alcohólica", false, "Ocurren 6–48 h tras suspender el alcohol, en general breves; acá la causa principal es la suspensión del antiepiléptico."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("abc", "Posición lateral, aspirar secreciones, oxígeno, monitoreo y acceso venoso", "clave", "Proteger la vía aérea y oxigenar."),
      mg("bzd", "Benzodiacepina de inmediato: lorazepam o diazepam endovenoso (o midazolam intramuscular si no hay vía)", "clave", "Primera línea a los 5 minutos de crisis; puede repetirse una vez."),
      mg("segunda", "Si persiste: segunda línea endovenosa (valproato, levetiracetam o fenitoína/fosfenitoína)", "clave", "Debe darse antes de los 20–30 minutos; acá conviene valproato porque era su fármaco."),
      mg("tiamina", "Tiamina antes de la glucosa por el consumo de alcohol", "util", "Previene la encefalopatía de Wernicke en alcoholistas."),
      mg("refractario", "Si no cede: intubación y anestésicos (midazolam o propofol en infusión) en terapia intensiva con EEG", "util", "Estado de mal refractario."),
      mg("boca", "Introducir un objeto en la boca para que no se muerda la lengua", "riesgoso", "Produce lesiones dentales y de vía aérea, y puede obstruirla."),
      mg("esperar", "Esperar 20 minutos a que ceda sola antes de medicar", "riesgoso", "Cuanto más dura, más difícil de controlar y mayor el daño neuronal."),
    ],
  },
  debrief: {
    diagnosis: "Estado de mal epiléptico convulsivo generalizado por suspensión del ácido valproico (niveles indetectables), con hipoxemia, en varón epiléptico de 32 años con consumo de alcohol.",
    pathologies: [
      { name: "Estado de mal epiléptico convulsivo", role: "principal", why: "Crisis prolongadas sin recuperación." },
      { name: "Epilepsia con mala adherencia", role: "asociada", why: "Causa precipitante." },
      { name: "Crisis psicógenas no epilépticas", role: "diferencial", why: "Se confunden con frecuencia." },
      { name: "Hipoglucemia, infección del SNC, TEC", role: "diferencial", why: "Causas secundarias a descartar." },
    ],
    reasoning: [
      "Causa: suspensión del antiepiléptico en un paciente con epilepsia, sumada al alcohol.",
      "Mecanismo: fallan los mecanismos que terminan la crisis (inhibición GABAérgica) y se perpetúa la excitación glutamatérgica; con el tiempo se internalizan los receptores GABA-A, por eso las benzodiacepinas pierden eficacia si se demoran.",
      "Consecuencia: hipoxemia, acidosis láctica, hipertermia, rabdomiólisis y, si se prolonga más de 30 minutos, daño neuronal permanente.",
      "Por eso el tratamiento es tiempo-dependiente: benzodiacepina a los 5 minutos y segunda línea antes de los 30.",
    ],
    epidemiology:
      "El estado de mal epiléptico es una emergencia neurológica frecuente en guardia, con mortalidad del 10–20 %. Tiene picos en la infancia y en mayores de 60 años, y es algo más frecuente en varones. En epilépticos conocidos, la causa más común es la suspensión o el ajuste de la medicación; en personas sin epilepsia, el ACV, las infecciones, los tóxicos y las alteraciones metabólicas.",
    management: [
      "0–5 minutos: ABC, oxígeno, glucemia capilar, acceso venoso, monitoreo.",
      "5–20 minutos: benzodiacepina (lorazepam o diazepam EV, midazolam IM o intranasal); puede repetirse una vez.",
      "20–40 minutos: segunda línea (valproato, levetiracetam o fenitoína/fosfenitoína).",
      "Refractario: intubación y anestésicos en terapia intensiva con EEG continuo.",
      "Buscar y tratar la causa; reiniciar el antiepiléptico y trabajar la adherencia.",
    ],
    sources: [
      "Sociedad Neurológica Argentina — Guía de manejo del estado de mal epiléptico.",
      "Liga Internacional contra la Epilepsia (ILAE) — Definición operativa del estado de mal epiléptico.",
    ],
    pearls: ["Más de 5 minutos = estado de mal: benzodiacepina ya.", "Glucemia capilar siempre.", "Si no se despierta: EEG para descartar el estado no convulsivo."],
    pitfalls: ["Esperar a que ceda sola.", "Dosis insuficientes de benzodiacepina.", "Meter objetos en la boca."],
    tribunal: [
      qa("¿Cómo se define el estado de mal epiléptico?", "Según la ILAE: una crisis tónico-clónica que dura más de 5 minutos (t1, momento de tratar) o crisis repetidas sin recuperación de la conciencia; a partir de los 30 minutos (t2) hay riesgo de daño neuronal permanente."),
      qa("¿Qué hacés ante una persona que convulsiona en la calle?", "Proteger la cabeza, retirar objetos peligrosos, no sujetarla ni meter nada en la boca, ponerla de costado al terminar, medir el tiempo y llamar a emergencias si dura más de 5 minutos o se repite."),
      qa("¿Qué es el estado de mal no convulsivo?", "Actividad epiléptica persistente en el EEG sin convulsiones visibles, con alteración de la conciencia o del comportamiento; se sospecha en quien no se despierta después de una crisis."),
      qa("¿Qué diferencia una crisis epiléptica de una psicógena?", "La psicógena tiene ojos cerrados con resistencia a abrirlos, movimientos asincrónicos o de lado a lado, duración prolongada con fluctuación, recuerdo del episodio y ausencia de cianosis o acidosis; el diagnóstico se confirma con video-EEG."),
    ],
  },
};
