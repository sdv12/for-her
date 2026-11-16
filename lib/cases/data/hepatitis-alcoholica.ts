import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hepatitisAlcoholica: ClinicalCase = {
  id: "hepatitis-alcoholica",
  level: 3,
  area: "Gastroenterología",
  setting: "Guardia",
  patient: { age: 41, ageUnit: "años", sex: "F", context: "Separada hace un año. Toma un litro y medio de vino por día. Dejó hace 4 días porque se sentía mal." },
  frequency: "frecuente",
  intro: "“Estoy amarilla, con la panza hinchada y fiebre. No como hace días.”",
  vitals: { TA: "104/64 mmHg", FC: "112 lpm", FR: "20 rpm", "T°": "38,1 °C" },
  anamnesis: [
    act("alcohol", "¿Cuánto y desde cuándo toma?", "clave", "“Un litro y medio de vino por día, todos los días desde hace un año, y antes menos.”", "Más de 40 g/día en mujeres durante meses: requisito."),
    act("ictericia", "¿Desde cuándo está amarilla?", "clave", "“Hace dos semanas, cada vez más.”", "Ictericia de menos de 8 semanas: hepatitis alcohólica."),
    act("ultimo-trago", "¿Cuándo tomó por última vez?", "clave", "“Hace 4 días.”", "Hasta 60 días antes: compatible."),
    act("hepatitis-virales", "¿Drogas inyectables, transfusiones, tatuajes?", "util", "“No.”", "Descarta otras causas."),
    act("paracetamol", "¿Tomó paracetamol?", "clave", "“Unas cuantas por el dolor.”", "Diferencial y agravante."),
    act("hijos", "¿Tiene hijos?", "neutro", "“Dos, viven con el padre.”", "Social."),
  ],
  exam: [
    act("higado", "Hígado", "clave", "Hepatomegalia dolorosa de 4 cm bajo el reborde.", "Típica de hepatitis alcohólica."),
    act("ascitis", "Ascitis", "clave", "Matidez desplazable.", "Descompensación."),
    act("estigmas", "Estigmas de hepatopatía", "util", "Arañas vasculares, eritema palmar.", "Hepatopatía crónica de base."),
    act("asterixis", "Asterixis y estado mental", "clave", "Sin asterixis, orientada.", "Sin encefalopatía."),
  ],
  studies: [
    study("Laboratorio", "hepatograma", "Hepatograma", "clave", "Bilirrubina 14 mg/dl, AST 210, ALT 85 (AST/ALT 2,5), GGT 640.", "AST menor de 400 con relación mayor de 1,5: patrón alcohólico."),
    study("Laboratorio", "coagulacion", "Tiempo de protrombina / RIN, creatinina", "clave", "RIN 1,9; creatinina 1,1.", "Para calcular Maddrey y MELD."),
    study("Laboratorio", "hemograma", "Hemograma", "clave", "Leucocitos 18.000 con neutrofilia.", "Típico; obliga igual a buscar infección."),
    study("Otros", "paracentesis", "Paracentesis diagnóstica", "clave", "PMN 80/mm³.", "Descarta PBE."),
    study("Imágenes", "eco", "Ecografía Doppler hepática", "util", "Hígado graso aumentado, porta permeable, sin obstrucción biliar.", "Descarta obstrucción y trombosis."),
    study("Otros", "biopsia-rutina", "Biopsia hepática transcutánea de rutina", "riesgoso", "No se hizo.", "Con coagulopatía y ascitis; el diagnóstico es clínico si es típico."),
  ],
  diagnosis: {
    prompt: "Maddrey 54. ¿Cuál es tu diagnóstico?",
    options: [
      dx("hepatitis-alcoholica-grave", "Hepatitis alcohólica grave (Maddrey ≥ 32)", true, "Consumo intenso, ictericia de inicio reciente, hepatomegalia dolorosa, AST/ALT mayor de 1,5 con AST menor de 400, leucocitosis y Maddrey 54."),
      dx("hepatitis-viral", "Hepatitis viral aguda", false, "Daría transaminasas en miles."),
      dx("paracetamol", "Hepatotoxicidad por paracetamol", false, "Daría transaminasas muy altas."),
      dx("colangitis", "Colangitis aguda", false, "Sin dilatación de la vía biliar."),
      dx("pbe", "Peritonitis bacteriana espontánea", false, "PMN menores de 250."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("abstinencia", "Abstinencia total y prevención del síndrome de abstinencia", "clave", "La medida que más cambia la sobrevida."),
      mg("prednisolona", "Prednisolona 40 mg/día si se descarta infección, con Lille al día 7", "clave", "Mejora la sobrevida a 28 días en hepatitis grave."),
      mg("nutricion", "Soporte nutricional y tiamina", "clave", "Desnutrición casi constante."),
      mg("infeccion", "Hemocultivos, urocultivo y radiografía antes de los corticoides", "clave", "Las infecciones son la principal causa de muerte."),
      mg("adicciones", "Equipo de salud mental y adicciones", "util", "Sostener la abstinencia."),
      mg("paracetamol-dolor", "Paracetamol en dosis plenas para el dolor", "riesgoso", "Hepatotóxico en este contexto."),
      mg("bzd-alta", "Benzodiacepinas de vida media larga en dosis altas", "riesgoso", "Se acumulan en la insuficiencia hepática."),
    ],
  },
  debrief: {
    diagnosis: "Hepatitis alcohólica grave (Maddrey 54) con ascitis, en una mujer de 41 años con consumo intenso.",
    pathologies: [
      { name: "Hepatitis alcohólica grave", role: "principal", why: "Inflamación aguda sobre hígado dañado por alcohol." },
      { name: "Trastorno por consumo de alcohol", role: "asociada", why: "Causa y pronóstico." },
      { name: "Hepatitis viral, tóxica", role: "diferencial", why: "Otras causas de ictericia aguda." },
    ],
    reasoning: [
      "Causa: consumo intenso y sostenido de alcohol.",
      "Mecanismo: acetaldehído, estrés oxidativo y endotoxinas que activan inflamación con neutrófilos.",
      "Consecuencia: insuficiencia hepática con alta mortalidad a 90 días.",
    ],
    epidemiology:
      "Afecta a personas con consumo intenso, sobre todo entre los 40 y 60 años. Las mujeres desarrollan daño con menos alcohol. La forma grave tiene una mortalidad del 20 al 50 % a los 3 meses. En Argentina el alcohol es una de las primeras causas de cirrosis.",
    management: [
      "Abstinencia.",
      "Calcular Maddrey y MELD.",
      "Descartar infección.",
      "Prednisolona si es grave y sin contraindicación.",
      "Nutrición.",
    ],
    sources: ["Sociedad Argentina de Hepatología — Hepatitis alcohólica.", "AASLD — Alcohol-associated liver disease guidance."],
    pearls: ["AST/ALT mayor de 2 y menor de 400.", "Maddrey ≥ 32: grave.", "Lille al día 7 decide si sigue el corticoide."],
    pitfalls: ["Corticoides sin descartar infección.", "Biopsia de rutina."],
    tribunal: [
      qa("¿Qué es el índice de Maddrey?", "Es 4,6 por la diferencia de tiempo de protrombina más la bilirrubina; 32 o más indica hepatitis alcohólica grave."),
      qa("¿Por qué la AST suele estar más alta que la ALT en la hepatopatía alcohólica?", "Por déficit de piridoxal fosfato, que la ALT necesita más, y por daño mitocondrial, que libera AST."),
      qa("¿Para qué sirve el índice de Lille?", "Evalúa al día 7 la respuesta al corticoide: si no responde, se suspende."),
    ],
  },
};
