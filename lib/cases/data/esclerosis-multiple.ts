import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const esclerosisMultiple: ClinicalCase = {
  id: "esclerosis-multiple-debut",
  level: 3,
  area: "Neurología",
  setting: "Consultorio",
  patient: { age: 27, ageUnit: "años", sex: "F", context: "Fuma. Hace dos años tuvo una semana de hormigueo en una pierna que se fue solo." },
  frequency: "poco-frecuente",
  intro: "“Desde hace cinco días veo borroso con el ojo derecho y me duele al moverlo. Los colores se ven apagados.”",
  vitals: { TA: "114/72 mmHg", FC: "74 lpm", "T°": "36,5 °C" },
  anamnesis: [
    act("ojo", "¿Te duele al mover el ojo? ¿Ves los colores distintos?", "clave", "“Duele al mover y el rojo se ve desteñido.”", "Neuritis óptica: dolor con los movimientos oculares y alteración de la visión de colores."),
    act("previo", "¿Tuviste antes síntomas neurológicos que duraron días y se fueron?", "clave", "“Hace dos años hormigueo en una pierna por una semana.”", "Un episodio previo separado en el tiempo y en otra localización: diseminación en tiempo y espacio."),
    act("lhermitte", "¿Sentís como una corriente en la espalda al bajar la cabeza?", "util", "“A veces.”", "Signo de Lhermitte: lesión cervical."),
    act("calor", "¿Empeoran los síntomas con el calor o la ducha caliente?", "util", "“Sí.”", "Fenómeno de Uhthoff."),
    act("embarazo", "¿Pensás embarazarte?", "util", "“En unos años.”", "Influye en la elección del tratamiento."),
    act("trabajo", "¿A qué te dedicás?", "neutro", "“Diseño gráfico.”", "No orienta."),
  ],
  exam: [
    act("vision", "Agudeza visual, colores y pupilas", "clave", "Agudeza 3/10 en ojo derecho, defecto pupilar aferente relativo derecho, fondo de ojo normal.", "Neuritis óptica retrobulbar."),
    act("neuro", "Examen neurológico completo", "clave", "Hiperreflexia en miembros inferiores, Babinski izquierdo.", "Signos de lesión de vía piramidal: otra lesión."),
    act("sensibilidad", "Sensibilidad", "util", "Hipopalestesia leve en el pie izquierdo.", "Compromiso de cordones posteriores."),
  ],
  studies: [
    study("Imágenes", "rmn", "Resonancia de cerebro y médula con gadolinio", "clave", "Lesiones periventriculares, yuxtacorticales e infratentoriales, una medular cervical; una lesión capta contraste.", "Cumple criterios de McDonald de diseminación en espacio y tiempo."),
    study("Otros", "lcr", "Punción lumbar con bandas oligoclonales", "util", "Bandas oligoclonales positivas.", "Apoyan el diagnóstico."),
    study("Laboratorio", "lab", "Laboratorio para diagnósticos diferenciales (B12, VDRL, VIH, anticuerpos anti-AQP4 y anti-MOG)", "clave", "Normales y anti-AQP4 negativos.", "Descarta neuromielitis óptica y otras causas."),
    study("Imágenes", "tc", "Tomografía de cerebro como único estudio", "innecesario", "No se realizó.", "No ve bien las lesiones desmielinizantes."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("em", "Esclerosis múltiple remitente-recurrente con neuritis óptica derecha como brote actual", true, "Mujer joven con neuritis óptica y un episodio sensitivo previo, signos piramidales, lesiones típicas en la resonancia con una que capta contraste y bandas oligoclonales."),
      dx("nmo", "Neuromielitis óptica", false, "Anti-AQP4 negativos y lesiones típicas de esclerosis múltiple."),
      dx("neuritis-aislada", "Neuritis óptica aislada", false, "Hay otro episodio previo y lesiones en otras localizaciones."),
      dx("acv", "ACV", false, "Paciente joven con lesiones desmielinizantes y episodios separados."),
      dx("b12", "Déficit de vitamina B12", false, "B12 normal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("corticoide", "Metilprednisolona EV en pulsos por 3–5 días para el brote", "clave", "Acelera la recuperación del brote."),
      mg("dmt", "Derivar a neurología para iniciar un tratamiento modificador de la enfermedad", "clave", "Reduce los brotes y la progresión de la discapacidad."),
      mg("tabaco", "Dejar de fumar y suplementar vitamina D si está baja", "util", "El tabaco empeora la evolución."),
      mg("cud", "Informar sobre el certificado único de discapacidad y cobertura", "util", "Derechos y acceso a tratamientos costosos."),
      mg("sin-tratamiento", "No iniciar tratamiento de fondo hasta tener otro brote", "riesgoso", "El tratamiento temprano mejora el pronóstico."),
      mg("reposo", "Reposo absoluto de por vida", "innecesario", "La actividad física es beneficiosa."),
    ],
  },
  debrief: {
    diagnosis: "Esclerosis múltiple remitente-recurrente con brote actual de neuritis óptica retrobulbar derecha, en mujer de 27 años fumadora.",
    pathologies: [
      { name: "Esclerosis múltiple remitente-recurrente", role: "principal", why: "Desmielinización con diseminación en tiempo y espacio." },
      { name: "Neuritis óptica", role: "asociada", why: "Brote actual." },
      { name: "Neuromielitis óptica, neuritis aislada, B12", role: "diferencial", why: "Se descartan." },
    ],
    reasoning: [
      "Causa: autoinmunidad en personas predispuestas (genética, virus de Epstein-Barr, bajo nivel de vitamina D, tabaco).",
      "Mecanismo: linfocitos atacan la mielina del sistema nervioso central, con placas inflamatorias y luego daño axonal.",
      "Consecuencia: brotes neurológicos que se recuperan total o parcialmente y discapacidad progresiva.",
    ],
    epidemiology:
      "La esclerosis múltiple es la principal causa no traumática de discapacidad neurológica en adultos jóvenes. En Argentina tiene una prevalencia de alrededor de 20–40 casos cada 100.000, mayor en el sur, y es tres veces más frecuente en mujeres, con inicio entre los 20 y 40 años.",
    management: [
      "Sospechar ante síntomas neurológicos focales de días de duración en jóvenes.",
      "Resonancia con gadolinio y criterios de McDonald.",
      "Corticoides en brotes; tratamiento modificador precoz.",
      "Rehabilitación, apoyo psicológico y derechos (CUD).",
    ],
    sources: ["Sociedad Neurológica Argentina — Guía de esclerosis múltiple.", "Ley 25.404 y normativa de cobertura de enfermedades desmielinizantes."],
    pearls: ["Neuritis óptica en mujer joven = pensar EM.", "Diseminación en tiempo y espacio.", "Tratamiento temprano."],
    pitfalls: ["No buscar episodios previos.", "Esperar otro brote para tratar."],
    tribunal: [
      qa("¿Qué son los criterios de McDonald?", "Criterios para diagnosticar esclerosis múltiple que requieren demostrar diseminación en espacio (lesiones en al menos 2 de 4 regiones típicas) y en tiempo (lesiones nuevas o simultáneas con y sin captación, o bandas oligoclonales) tras descartar otras causas."),
      qa("¿Qué formas clínicas tiene la esclerosis múltiple?", "Remitente-recurrente (la más frecuente, con brotes), secundariamente progresiva (progresión tras años de brotes) y primariamente progresiva (progresión desde el inicio, más en mayores)."),
      qa("¿Qué es el fenómeno de Uhthoff?", "El empeoramiento transitorio de los síntomas con el aumento de la temperatura corporal (ejercicio, calor, fiebre), porque las fibras desmielinizadas conducen peor con el calor."),
    ],
  },
};
