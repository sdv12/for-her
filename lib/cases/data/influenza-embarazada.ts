import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const influenzaEmbarazada: ClinicalCase = {
  id: "influenza-embarazada",
  level: 2,
  area: "Infectología",
  setting: "Guardia",
  patient: { age: 25, ageUnit: "años", sex: "F", context: "Embarazo de 28 semanas. Junio. No se vacunó contra la gripe. Su hijo de 3 años está con gripe." },
  frequency: "frecuente",
  intro: "“Tengo 39 de fiebre desde ayer, me duele todo el cuerpo, la cabeza y tengo tos seca.”",
  vitals: { TA: "110/68 mmHg", FC: "108 lpm", FR: "20 rpm", "SatO₂": "97 %", "T°": "38,9 °C" },
  anamnesis: [
    act("inicio", "¿Cómo empezó?", "clave", "“De golpe, con escalofríos.”", "Inicio brusco: influenza."),
    act("disnea", "¿Le falta el aire?", "clave", "“No.”", "Signo de gravedad."),
    act("movimientos", "¿Siente moverse al bebé?", "clave", "“Sí, normal.”", "Bienestar fetal."),
    act("vacuna", "¿Se vacunó contra la gripe?", "clave", "“No, me olvidé.”", "Oportunidad perdida."),
    act("contacto", "¿Alguien enfermo en la casa?", "util", "“Mi hijo, con gripe.”", "Contacto."),
    act("pelicula", "¿Qué película vio?", "neutro", "“Una de terror.”", "No orienta."),
  ],
  exam: [
    act("pulmon", "Auscultación", "clave", "Sin crepitantes.", "Sin neumonía."),
    act("obstetrico", "Latidos fetales y dinámica", "clave", "FCF 160 lpm, sin contracciones.", "Taquicardia fetal por fiebre materna."),
    act("faringe", "Faringe", "util", "Congestiva.", "Viral."),
  ],
  studies: [
    study("Microbiología", "hisopado", "Hisopado nasofaríngeo para influenza (PCR o antígeno)", "util", "Influenza A positiva.", "Confirma, pero no se espera para tratar."),
    study("Imágenes", "rx", "Radiografía de tórax con protección", "util", "Normal.", "Si hubiera disnea o hipoxemia."),
    study("Laboratorio", "lab", "Hemograma", "util", "Leucocitos normales.", "Basal."),
    study("Otros", "esperar-hisopado", "Esperar el hisopado para indicar oseltamivir", "riesgoso", "No se esperó.", "La embarazada es grupo de riesgo: se trata empíricamente."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("influenza", "Influenza A no complicada en embarazada del tercer trimestre (grupo de riesgo)", true, "Inicio brusco con fiebre, mialgias y tos seca en invierno, contacto con gripe, sin neumonía e hisopado positivo."),
      dx("nac", "Neumonía", false, "Sin crepitantes y radiografía normal."),
      dx("covid", "COVID-19", false, "Hisopado positivo para influenza."),
      dx("pielonefritis", "Pielonefritis", false, "Sin síntomas urinarios."),
      dx("corioamnionitis", "Corioamnionitis", false, "Sin rotura de membranas ni dolor uterino."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("oseltamivir", "Oseltamivir 75 mg cada 12 horas por 5 días, ya", "clave", "Grupo de riesgo: tratar lo antes posible."),
      mg("paracetamol", "Paracetamol para la fiebre", "clave", "La fiebre materna afecta al feto."),
      mg("alarma", "Pautas de alarma: falta de aire, fiebre persistente, menos movimientos fetales", "clave", "Complicaciones."),
      mg("vacunar-despues", "Vacunarse al recuperarse y antigripal para el hijo", "util", "Prevención."),
      mg("aines", "Ibuprofeno para la fiebre", "riesgoso", "Contraindicado en el tercer trimestre."),
      mg("antibiotico", "Amoxicilina empírica", "innecesario", "Sin sobreinfección bacteriana."),
    ],
  },
  debrief: {
    diagnosis: "Influenza A no complicada en una embarazada de 28 semanas no vacunada.",
    pathologies: [
      { name: "Influenza A", role: "principal", why: "Infección viral estacional." },
      { name: "Embarazo de tercer trimestre", role: "asociada", why: "Grupo de riesgo de complicaciones." },
      { name: "Neumonía viral o bacteriana", role: "diferencial", why: "Complicación." },
    ],
    reasoning: [
      "Causa: virus influenza A.",
      "Mecanismo: el embarazo reduce la capacidad pulmonar y modula la inmunidad.",
      "Consecuencia: más riesgo de neumonía, internación, parto prematuro y muerte materna.",
    ],
    epidemiology:
      "Las embarazadas tienen mayor riesgo de internación y muerte por influenza, sobre todo en el tercer trimestre, como se vio en la pandemia de 2009 en Argentina. La vacuna antigripal es gratuita y obligatoria en cualquier trimestre y protege también al bebé los primeros meses.",
    management: [
      "Oseltamivir empírico precoz.",
      "Paracetamol.",
      "Pautas de alarma.",
      "Vacunación.",
    ],
    sources: ["Ministerio de Salud de la Nación — Lineamientos para el manejo de influenza.", "CDC — Influenza antiviral medications: summary for clinicians."],
    pearls: ["Embarazada con gripe: oseltamivir sin esperar.", "Antigripal en cualquier trimestre.", "Paracetamol, no ibuprofeno."],
    pitfalls: ["Esperar el hisopado.", "Ibuprofeno en el tercer trimestre."],
    tribunal: [
      qa("¿Quiénes son grupo de riesgo para influenza?", "Embarazadas y puérperas, menores de 2 años, mayores de 65, inmunosuprimidos, enfermedades crónicas cardíacas, respiratorias, renales, diabetes y obesidad."),
      qa("¿Por qué se vacuna a la embarazada contra la gripe?", "Porque reduce su riesgo de enfermedad grave y protege al recién nacido con anticuerpos los primeros 6 meses."),
      qa("¿Cuándo es más eficaz el oseltamivir?", "Dentro de las 48 horas, aunque en grupos de riesgo o graves se indica en cualquier momento."),
    ],
  },
};
