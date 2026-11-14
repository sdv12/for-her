import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const colitisIsquemica: ClinicalCase = {
  id: "colitis-isquemica",
  level: 2,
  area: "Gastroenterología",
  setting: "Guardia",
  patient: { age: 76, ageUnit: "años", sex: "F", context: "Hipertensa y dislipémica. Estuvo deshidratada por una diarrea viral la semana pasada." },
  frequency: "frecuente",
  intro: "“Me agarró un cólico del lado izquierdo, ganas de ir al baño y después hice con sangre roja.”",
  vitals: { TA: "128/76 mmHg", FC: "94 lpm", FR: "18 rpm", "T°": "37,4 °C", "SatO₂": "96 %" },
  anamnesis: [
    act("dolor", "¿Dónde y cómo empezó el dolor?", "clave", "“Fosa izquierda, tipo cólico, y después sangre.”", "Secuencia típica."),
    act("deshidratacion", "¿Estuvo deshidratada o con presión baja?", "clave", "“Diarrea fuerte la semana pasada.”", "Hipoperfusión."),
    act("farmacos", "¿Toma diuréticos, constipantes o alosetrón?", "clave", "“Tomo hidroclorotiazida.”", "Factor."),
    act("fa", "¿Arritmias?", "util", "“No.”", "Embolia mesentérica."),
    act("dolor-desproporcionado", "¿El dolor es muy intenso y constante?", "util", "“No, es cólico.”", "Isquemia mesentérica aguda."),
    act("hobby", "¿Qué hace?", "neutro", "“Juego a la canasta.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Abdomen", "clave", "Dolor leve en fosa ilíaca izquierda, sin defensa.", "Sin peritonitis."),
    act("hemodinamia", "Hemodinamia", "clave", "Estable.", "Base."),
    act("tacto", "Tacto rectal", "util", "Sangre roja.", "Confirma."),
  ],
  studies: [
    study("Imágenes", "tc", "TC de abdomen con contraste", "clave", "Engrosamiento de colon descendente y sigmoides, sin neumatosis ni aire libre.", "Colitis segmentaria."),
    study("Otros", "colonoscopia", "Colonoscopia dentro de 48 horas", "clave", "Mucosa edematosa con úlceras en ángulo esplénico, recto respetado.", "Colitis isquémica."),
    study("Laboratorio", "lab", "Hemograma, lactato, coprocultivo", "util", "Hb 12; lactato normal; coprocultivo negativo.", "Excluye infecciosa."),
    study("Imágenes", "angio-urgente", "Angiografía mesentérica de urgencia", "innecesario", "No se realizó.", "No es isquemia mesentérica aguda."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("colitis-isquemica", "Colitis isquémica no gangrenosa del colon izquierdo", true, "Cólico izquierdo seguido de hematoquecia tras hipoperfusión, compromiso segmentario del ángulo esplénico con recto respetado."),
      dx("isquemia-mesenterica", "Isquemia mesentérica aguda", false, "Dolor no desproporcionado y lactato normal."),
      dx("diverticular", "Hemorragia diverticular", false, "Hay dolor y colitis segmentaria."),
      dx("cu", "Colitis ulcerosa", false, "Respeta el recto."),
      dx("infecciosa", "Colitis infecciosa", false, "Coprocultivo negativo."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("soporte", "Hidratación, reposo intestinal y observación", "clave", "La mayoría resuelve sola."),
      mg("suspender", "Suspender diuréticos y vasoconstrictores", "clave", "Mejora la perfusión."),
      mg("controles", "Control clínico y de lactato por gangrena", "clave", "Complicación."),
      mg("atb", "Antibióticos si es moderada a grave", "util", "Translocación bacteriana."),
      mg("cirugia-rutina", "Colectomía de rutina", "riesgoso", "Solo si hay gangrena o perforación."),
      mg("vasopresores", "Vasopresores para subir la presión", "riesgoso", "Empeoran la isquemia."),
    ],
  },
  debrief: {
    diagnosis: "Colitis isquémica no gangrenosa del colon izquierdo tras hipoperfusión, en mujer de 76 años.",
    pathologies: [
      { name: "Colitis isquémica", role: "principal", why: "Hipoperfusión colónica." },
      { name: "Deshidratación y diurético", role: "asociada", why: "Desencadenantes." },
      { name: "Isquemia mesentérica, diverticular", role: "diferencial", why: "Otras causas de dolor y sangrado." },
    ],
    reasoning: [
      "Causa: bajo flujo transitorio en una paciente vasculópata.",
      "Mecanismo: isquemia en zonas limítrofes como el ángulo esplénico.",
      "Consecuencia: dolor, hematoquecia y, rara vez, gangrena.",
    ],
    epidemiology:
      "Es la forma más frecuente de isquemia intestinal, sobre todo en mayores de 60. En general es transitoria. A diferencia de la mesentérica aguda, el dolor es leve.",
    management: [
      "TC y colonoscopia.",
      "Soporte.",
      "Retirar desencadenantes.",
      "Vigilar gangrena.",
    ],
    sources: ["Sociedad Argentina de Gastroenterología — Isquemia colónica.", "ACG — Clinical Guideline: Epidemiology, Risk Factors, Patterns of Presentation, Diagnosis, and Management of Colon Ischemia."],
    pearls: ["Cólico y después sangre.", "Ángulo esplénico.", "Respeta el recto."],
    pitfalls: ["Confundir con mesentérica.", "Vasopresores."],
    tribunal: [
      qa("¿Qué son las zonas limítrofes?", "Áreas entre territorios arteriales, como el ángulo esplénico (punto de Griffiths) y la unión rectosigmoidea."),
      qa("¿Qué diferencia hay con la isquemia mesentérica aguda?", "La mesentérica tiene dolor desproporcionado al examen, lactato alto y alta mortalidad."),
      qa("¿Qué signo endoscópico es típico?", "El signo de una sola banda: úlcera longitudinal en el colon."),
    ],
  },
};
