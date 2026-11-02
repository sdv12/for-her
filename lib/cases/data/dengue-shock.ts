import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const dengueShock: ClinicalCase = {
  id: "dengue-grave-shock",
  level: 4,
  area: "Infectología",
  setting: "Guardia",
  patient: { age: 11, ageUnit: "años", sex: "F", context: "Abril, Misiones. Tuvo dengue hace dos años. Hoy es el quinto día de fiebre." },
  frequency: "poco-frecuente",
  intro: "“La fiebre se le fue esta mañana, pero ahora le duele mucho la panza, vomitó cinco veces y está fría y adormecida.” (relata la madre)",
  vitals: { TA: "90/78 mmHg", FC: "142 lpm", FR: "30 rpm", "T°": "36,1 °C", "SatO₂": "95 %", Peso: "34 kg" },
  anamnesis: [
    act("fiebre", "¿Cuántos días tuvo fiebre y cuándo bajó?", "clave", "“Cuatro días; hoy bajó.”", "La defervescencia es la fase crítica del dengue: ahí aparece el shock por fuga de plasma."),
    act("alarma", "¿Dolor de panza intenso, vómitos persistentes, sangrados, somnolencia?", "clave", "“Todo eso: dolor fuerte, vómitos y está dormida.”", "Signos de alarma."),
    act("previo", "¿Tuvo dengue antes?", "clave", "“Hace dos años.”", "La segunda infección por otro serotipo aumenta el riesgo de dengue grave."),
    act("orina", "¿Cuándo orinó por última vez?", "util", "“Esta mañana temprano.”", "Oliguria: hipoperfusión."),
    act("aine", "¿Le dieron ibuprofeno o aspirina?", "util", "“Ibuprofeno el segundo día.”", "Contraindicados: aumentan el sangrado."),
    act("escuela", "¿En qué grado está?", "neutro", "“Sexto.”", "No orienta."),
  ],
  exam: [
    act("perfusion", "Perfusión y presión de pulso", "clave", "Extremidades frías, relleno 4 s, presión de pulso de 12 mmHg.", "Presión de pulso de 20 mmHg o menos: shock compensado por fuga de plasma."),
    act("abdomen", "Abdomen", "clave", "Dolor difuso, hepatomegalia, ascitis.", "Fuga de plasma."),
    act("sangrado", "Piel y mucosas", "util", "Petequias, sangrado de encías.", "Manifestaciones hemorrágicas."),
  ],
  studies: [
    study("Laboratorio", "hematocrito", "Hematocrito seriado y plaquetas", "clave", "Hematocrito 50 % (basal 38 %), plaquetas 22.000.", "Hemoconcentración: fuga de plasma."),
    study("Laboratorio", "lab", "Gases, lactato, transaminasas, coagulograma", "clave", "Acidosis metabólica, lactato 4,5, TGO 480.", "Hipoperfusión y daño hepático."),
    study("Imágenes", "eco", "Ecografía de abdomen y tórax a la cama", "util", "Ascitis, derrame pleural, engrosamiento de la pared vesicular.", "Signos de fuga."),
    study("Laboratorio", "ns1", "NS1 o PCR para dengue", "util", "NS1 positivo.", "Confirma, pero no debe demorar el tratamiento."),
    study("Otros", "transfundir-plaquetas", "Transfundir plaquetas por el recuento bajo", "riesgoso", "No se realizó.", "Sin sangrado grave no está indicado y aporta volumen innecesario."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("shock", "Dengue grave con shock por extravasación de plasma (fase crítica)", true, "Defervescencia al día 5 con signos de alarma, presión de pulso estrecha, hipoperfusión, hemoconcentración, ascitis y derrame."),
      dx("alarma", "Dengue con signos de alarma sin shock", false, "Hay hipoperfusión con presión de pulso de 12."),
      dx("sepsis", "Sepsis bacteriana", false, "Contexto epidemiológico, hemoconcentración y NS1 positivo."),
      dx("abdomen", "Abdomen agudo quirúrgico", false, "El dolor y la ascitis son por fuga de plasma."),
      dx("mejoria", "Mejoría porque bajó la fiebre", false, "En el dengue la fase crítica empieza justamente al bajar la fiebre."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cristaloides", "Expansión con cristaloides (20 ml/kg en 15–30 minutos) y reevaluar perfusión y hematocrito", "clave", "El shock del dengue es por fuga de plasma: se repone volumen con controles estrictos."),
      mg("uti", "Terapia intensiva, diuresis horaria y hematocrito seriado", "clave", "Evita tanto el shock como la sobrecarga."),
      mg("notificar", "Notificar y control del vector en la zona", "util", "Vigilancia epidemiológica."),
      mg("reducir", "Reducir los líquidos gradualmente cuando mejora (fase de reabsorción)", "clave", "Previene el edema pulmonar."),
      mg("corticoides", "Corticoides", "innecesario", "No mejoran la evolución."),
      mg("aine-ex", "Ibuprofeno para el dolor", "riesgoso", "Aumenta el sangrado."),
    ],
  },
  debrief: {
    diagnosis: "Dengue grave con shock compensado por extravasación de plasma en la fase crítica, con plaquetopenia, sangrado mucoso y daño hepático, en niña de 11 años con infección previa.",
    pathologies: [
      { name: "Dengue grave con shock", role: "principal", why: "Fuga de plasma con hipoperfusión." },
      { name: "Segunda infección por otro serotipo", role: "asociada", why: "Aumenta el riesgo de gravedad." },
      { name: "Sepsis, abdomen agudo", role: "diferencial", why: "Se descartan por la clínica y el contexto." },
    ],
    reasoning: [
      "Causa: virus del dengue transmitido por Aedes aegypti, en una segunda infección.",
      "Mecanismo: anticuerpos de la infección previa facilitan la entrada viral y la respuesta inflamatoria aumenta la permeabilidad capilar.",
      "Consecuencia: fuga de plasma al bajar la fiebre, con shock, hemoconcentración, derrames, sangrados y daño de órganos.",
    ],
    epidemiology:
      "Argentina tuvo grandes epidemias de dengue en 2023 y 2024, con cientos de miles de casos, sobre todo en el norte y el centro. La circulación de varios serotipos aumenta el riesgo de dengue grave en reinfecciones; niños y adultos mayores son grupos vulnerables.",
    management: [
      "Clasificar: sin signos de alarma, con signos de alarma, grave.",
      "Vigilar la fase crítica (defervescencia).",
      "Shock: cristaloides en bolos con reevaluación y hematocrito.",
      "Evitar AINE, transfusiones innecesarias e inyecciones IM; prevención del vector y vacunación según indicación.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía para el equipo de salud: dengue.", "Organización Panamericana de la Salud — Guías de atención de dengue."],
    pearls: ["Al bajar la fiebre empieza el peligro.", "Presión de pulso estrecha = shock.", "Hematocrito guía los líquidos."],
    pitfalls: ["Creer que mejoró porque no tiene fiebre.", "Transfundir plaquetas sin sangrado."],
    tribunal: [
      qa("¿Cuáles son los signos de alarma del dengue?", "Dolor abdominal intenso y continuo, vómitos persistentes, acumulación de líquidos (ascitis, derrame), sangrado de mucosas, letargo o irritabilidad, hepatomegalia mayor de 2 cm, aumento del hematocrito con caída rápida de plaquetas e hipotensión postural."),
      qa("¿Qué fases tiene el dengue?", "Febril (2–7 días), crítica (alrededor de la defervescencia, con riesgo de fuga de plasma y shock, 24–48 h) y de recuperación (reabsorción de líquidos, riesgo de sobrecarga)."),
      qa("¿Qué vacunas contra el dengue hay en Argentina?", "La vacuna tetravalente atenuada (TAK-003), en dos dosis separadas por 3 meses, indicada en zonas y grupos priorizados según el Ministerio de Salud, para personas con y sin infección previa según la edad."),
    ],
  },
};
