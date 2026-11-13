import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hdaUlceraHpJoven: ClinicalCase = {
  id: "hemorragia-digestiva-alta-ulcera-duodenal",
  level: 3,
  area: "Gastroenterología",
  setting: "Guardia",
  patient: { age: 23, ageUnit: "años", sex: "M", context: "Estudiante. Hace meses tiene ardor en la boca del estómago que calma comiendo. No toma AINE." },
  frequency: "frecuente",
  intro: "“Hace dos días hago materia fecal negra como alquitrán y hoy me mareé al pararme en la ducha.”",
  vitals: { TA: "98/62 mmHg", FC: "116 lpm", FR: "20 rpm", "T°": "36,5 °C", "SatO₂": "98 %" },
  anamnesis: [
    act("melena", "¿Cómo es la materia fecal?", "clave", "“Negra, pegajosa y con olor feo.”", "Melena."),
    act("dolor", "¿Tenía dolor antes?", "clave", "“Ardor de noche que calmaba comiendo.”", "Úlcera duodenal."),
    act("aines", "¿Tomó ibuprofeno, aspirina o alcohol?", "clave", "“Nada.”", "Sugiere Helicobacter."),
    act("sincope", "¿Se desmayó?", "util", "“Casi, en la ducha.”", "Gravedad."),
    act("familia", "¿Familia con úlceras?", "util", "“Mi papá.”", "Transmisión intrafamiliar de Helicobacter."),
    act("carrera", "¿Qué estudia?", "neutro", "“Ciencias Económicas.”", "No orienta."),
  ],
  exam: [
    act("ortostatismo", "Hemodinamia y ortostatismo", "clave", "Ortostatismo positivo.", "Pérdida significativa."),
    act("tacto", "Tacto rectal", "clave", "Melena en el guante.", "Confirma."),
    act("abdomen", "Abdomen", "util", "Dolor epigástrico leve.", "Base."),
  ],
  studies: [
    study("Laboratorio", "lab", "Hemograma, urea, coagulograma, grupo y factor", "clave", "Hb 8,1; urea 82.", "Sangrado alto con urea elevada."),
    study("Otros", "veda", "Endoscopia alta dentro de las 24 horas", "clave", "Úlcera duodenal de 1,2 cm con vaso visible (Forrest IIa); test de ureasa positivo.", "Diagnóstico y tratamiento."),
    study("Otros", "blatchford", "Score de Glasgow-Blatchford", "util", "12 puntos.", "Alto riesgo."),
    study("Imágenes", "tc", "TC de abdomen antes de la endoscopia", "innecesario", "No se realizó.", "Retrasa sin aportar."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hda-ulcera", "Hemorragia digestiva alta por úlcera duodenal asociada a Helicobacter pylori", true, "Melena, dispepsia previa nocturna que calma con la comida, úlcera con vaso visible y ureasa positiva."),
      dx("varices", "Várices esofágicas", false, "Sin hepatopatía."),
      dx("mallory", "Mallory-Weiss", false, "Sin vómitos previos."),
      dx("hdb", "Hemorragia digestiva baja", false, "Melena con urea alta."),
      dx("gastritis-aines", "Gastropatía por AINE", false, "No tomó AINE."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("reanimacion", "Dos vías, cristaloides y transfusión si Hb menor de 7", "clave", "Estrategia restrictiva."),
      mg("ibp", "Omeprazol EV en bolo y continuo", "clave", "Reduce resangrado tras la endoscopia."),
      mg("hemostasia", "Hemostasia endoscópica del vaso visible", "clave", "Forrest IIa."),
      mg("erradicacion", "Erradicación de Helicobacter y confirmar luego", "util", "Previene recurrencias."),
      mg("transfusion-liberal", "Transfundir hasta Hb de 12", "riesgoso", "Aumenta resangrado y mortalidad."),
      mg("alta", "Alta con omeprazol oral", "riesgoso", "Alto riesgo."),
    ],
  },
  debrief: {
    diagnosis: "Hemorragia digestiva alta por úlcera duodenal Forrest IIa asociada a Helicobacter pylori, en varón de 23 años.",
    pathologies: [
      { name: "Úlcera duodenal sangrante", role: "principal", why: "Causa más frecuente de HDA." },
      { name: "Infección por Helicobacter pylori", role: "asociada", why: "Causa de la úlcera." },
      { name: "Várices, Mallory-Weiss", role: "diferencial", why: "Otras causas de HDA." },
    ],
    reasoning: [
      "Causa: Helicobacter pylori con hipersecreción ácida.",
      "Mecanismo: la úlcera erosiona un vaso de la pared duodenal.",
      "Consecuencia: melena, anemia aguda e hipovolemia.",
    ],
    epidemiology:
      "La úlcera péptica es la causa más frecuente de hemorragia digestiva alta. En jóvenes sin AINE, Helicobacter es la causa principal. La infección es muy prevalente en Argentina y se transmite en la familia.",
    management: [
      "Reanimación.",
      "IBP.",
      "Endoscopia.",
      "Erradicar.",
    ],
    sources: ["Sociedad Argentina de Gastroenterología — Hemorragia digestiva alta no variceal.", "ACG — Management of Patients with Ulcer Bleeding Guideline."],
    pearls: ["Melena con urea alta: alta.", "Transfusión restrictiva.", "Erradicá."],
    pitfalls: ["Transfundir de más.", "No erradicar."],
    tribunal: [
      qa("¿Qué es la clasificación de Forrest?", "Clasifica la úlcera según el sangrado activo, el vaso visible o el coágulo para predecir resangrado."),
      qa("¿Por qué sube la urea en la HDA?", "Por digestión y absorción de proteínas de la sangre y por hipovolemia."),
      qa("¿Qué esquema de erradicación se usa?", "IBP con amoxicilina y claritromicina, o cuádruple con bismuto según resistencia."),
    ],
  },
};
