import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const cetoacidosis: ClinicalCase = {
  id: "cetoacidosis-debut-dm1",
  level: 2,
  area: "Endocrinología",
  setting: "Guardia",
  patient: { age: 15, ageUnit: "años", sex: "F", context: "La trae la mamá." },
  frequency: "poco-frecuente",
  intro: "“Hace unas semanas toma muchísima agua y va al baño todo el tiempo; bajó 5 kilos. Hoy vomitó varias veces, le duele la panza y respira muy rápido.”",
  vitals: { TA: "100/60 mmHg", FC: "124 lpm", FR: "32 rpm, respiración profunda", "SatO₂": "98 %", "T°": "36,8 °C", Glucemia: "486 mg/dl (capilar)", Glasgow: "14" },
  anamnesis: [
    act("poliuria", "¿Desde cuándo toma mucha agua y orina tanto? ¿Bajó de peso?", "clave", "“Unas tres semanas. Bajó 5 kilos aunque come bien.”", "Poliuria, polidipsia y pérdida de peso: la tríada de la hiperglucemia por déficit de insulina."),
    act("vomitos", "¿Cuántas veces vomitó? ¿Dónde le duele?", "clave", "“Cinco veces desde la mañana. Le duele toda la panza.”", "Los vómitos y el dolor abdominal son frecuentes en la cetoacidosis (cetosis, deshidratación, íleo)."),
    act("infeccion", "¿Estuvo enferma últimamente?", "util", "“Tuvo una angina hace una semana.”", "Las infecciones son el desencadenante más frecuente de la descompensación."),
    act("familia", "¿Hay enfermedades autoinmunes en la familia?", "util", "“Yo tengo hipotiroidismo.”", "La DM1 es autoinmune y se asocia a otras autoinmunidades familiares."),
    act("fum", "¿Cuándo fue su última menstruación?", "util", "“Hace tres semanas.”", "En una adolescente siempre hay que considerar el embarazo."),
    act("drogas", "¿Consumió alcohol u otras sustancias?", "neutro", "“No.”", "Descarta otras causas de acidosis y alteración de conciencia."),
  ],
  exam: [
    act("respiracion", "Patrón respiratorio y aliento", "clave", "Respiración profunda y rápida (Kussmaul), aliento con olor a manzana.", "La respiración de Kussmaul es la compensación respiratoria de la acidosis metabólica; el olor es por la acetona."),
    act("hidratacion", "Estado de hidratación", "clave", "Mucosas secas, ojos hundidos, relleno capilar de 3 segundos.", "Deshidratación por la diuresis osmótica y los vómitos."),
    act("neuro", "Examen neurológico", "clave", "Somnolienta pero responde; sin foco neurológico; pupilas normales.", "Valor basal: el edema cerebral es la complicación más grave en pediatría y se vigila con controles neurológicos seriados."),
    act("abdomen", "Examen abdominal", "util", "Doloroso en forma difusa, sin defensa.", "El dolor abdominal de la cetoacidosis suele ceder al corregirla; si persiste, buscar otra causa."),
    act("peso", "Peso actual", "util", "48 kg (antes 53 kg).", "Necesario para calcular líquidos e insulina."),
  ],
  studies: [
    study("Laboratorio", "gases", "Gasometría venosa", "clave", "pH 7,08, HCO₃ 6 mEq/l, pCO₂ 20 mmHg.", "Acidosis metabólica grave con compensación respiratoria."),
    study("Laboratorio", "cetonas", "Cetonemia (β-hidroxibutirato)", "clave", "5,8 mmol/l.", "Confirma la cetosis."),
    study("Laboratorio", "iono", "Ionograma", "clave", "Na 131, K 5,4, Cl 98.", "Anión gap = 131 − (98 + 6) = 27: acidosis con anión gap elevado (por cetoácidos). El potasio normal o alto es engañoso: el potasio corporal total está muy bajo."),
    study("Laboratorio", "renal", "Urea y creatinina", "util", "Urea 48, creatinina 1,2.", "Insuficiencia renal prerrenal por deshidratación."),
    study("Electrofisiología", "ecg", "Electrocardiograma", "util", "Taquicardia sinusal, ondas T levemente picudas.", "Valora el efecto del potasio sobre el corazón."),
    study("Laboratorio", "hba1c", "Hemoglobina glicosilada", "util", "12 %.", "Hiperglucemia de semanas: confirma que es un debut."),
    study("Laboratorio", "hemograma", "Hemograma", "util", "Leucocitos 18.000 sin fiebre.", "La leucocitosis es frecuente por estrés y no indica infección por sí sola."),
    study("Imágenes", "tc", "TC de cerebro", "innecesario", "Normal.", "Solo ante signos de edema cerebral, y nunca debe demorar su tratamiento."),
    study("Laboratorio", "antigad", "Anticuerpos anti-GAD", "neutro", "Pendiente.", "Confirman autoinmunidad, pero no son urgentes."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("cad", "Debut de diabetes tipo 1 con cetoacidosis diabética grave", true, "Hiperglucemia, cetonemia y acidosis metabólica con pH menor de 7,1 y bicarbonato muy bajo, en una adolescente con poliuria, polidipsia y pérdida de peso."),
      dx("ehh", "Estado hiperglucémico hiperosmolar", false, "Glucemias muy altas (más de 600) con osmolaridad elevada pero sin cetoacidosis importante; más en DM2 y adultos."),
      dx("gastro", "Gastroenteritis aguda", false, "No explica la hiperglucemia ni la cetoacidosis."),
      dx("apendicitis", "Apendicitis aguda", false, "El dolor abdominal es por la cetoacidosis; si persistiera después de corregirla, habría que reevaluar."),
      dx("salicilatos", "Intoxicación por salicilatos", false, "Da acidosis con anión gap elevado y taquipnea, pero no hiperglucemia con cetonemia de este grado."),
    ],
  },
  management: {
    prompt: "¿Cómo la tratás?",
    options: [
      mg("expansion", "Expansión con solución fisiológica 10–20 ml/kg en 30–60 minutos y luego reposición del déficit en 24–48 h", "clave", "Restaura la volemia de forma gradual: corregir demasiado rápido en pediatría se asocia a edema cerebral."),
      mg("insulina", "Insulina regular endovenosa en infusión continua de 0,05–0,1 U/kg/h, sin bolo, una vez iniciada la hidratación", "clave", "Frena la cetogénesis y la lipólisis; el bolo aumenta el riesgo de edema cerebral e hipopotasemia."),
      mg("potasio", "Agregar potasio a la hidratación al confirmar diuresis y K menor de 5,5", "clave", "La insulina mete potasio en las células: sin reponerlo aparece una hipopotasemia peligrosa."),
      mg("dextrosa", "Agregar dextrosa cuando la glucemia baje de 250–300 mg/dl, sin suspender la insulina hasta resolver la acidosis", "clave", "Lo que se trata es la cetoacidosis, no solo la glucemia."),
      mg("controles", "Glucemia horaria, controles neurológicos y ionograma/gases cada 2–4 h", "clave", "Detecta a tiempo hipoglucemia, hipopotasemia y edema cerebral."),
      mg("edema", "Tener manitol o solución salina hipertónica disponibles ante signos de edema cerebral", "util", "Cefalea, bradicardia, hipertensión o deterioro del sensorio obligan a tratar sin esperar imágenes."),
      mg("bicarbonato", "Bicarbonato para corregir la acidosis", "riesgoso", "No mejora la evolución y aumenta el riesgo de edema cerebral e hipopotasemia."),
      mg("bolo", "Bolo de insulina endovenosa", "riesgoso", "En pediatría se asocia a edema cerebral."),
      mg("alta", "Insulina subcutánea y alta desde la guardia", "riesgoso", "Una cetoacidosis grave requiere internación, idealmente en terapia intensiva."),
    ],
  },
  debrief: {
    diagnosis: "Debut de diabetes mellitus tipo 1 con cetoacidosis diabética grave (pH 7,08, HCO₃ 6).",
    pathologies: [
      { name: "Diabetes mellitus tipo 1", role: "principal", why: "Destrucción autoinmune de las células beta." },
      { name: "Cetoacidosis diabética", role: "asociada", why: "Complicación aguda por déficit absoluto de insulina; forma de debut frecuente." },
      { name: "Edema cerebral", role: "asociada", why: "Principal causa de muerte por cetoacidosis en pediatría." },
      { name: "Estado hiperglucémico hiperosmolar", role: "diferencial", why: "La otra crisis hiperglucémica, sin cetoacidosis importante." },
      { name: "Abdomen agudo", role: "diferencial", why: "El dolor abdominal puede confundir." },
    ],
    reasoning: [
      "Causa: destrucción autoinmune de las células beta → déficit absoluto de insulina, con aumento de hormonas contrarreguladoras (glucagón, cortisol, catecolaminas), favorecido por una infección.",
      "Mecanismo: sin insulina, el hígado produce glucosa sin freno y el tejido adiposo libera ácidos grasos que en el hígado se convierten en cuerpos cetónicos (acetoacetato y β-hidroxibutirato).",
      "Consecuencia: acidosis metabólica con anión gap elevado → respiración de Kussmaul. La hiperglucemia produce diuresis osmótica → deshidratación y pérdida de sodio y potasio.",
      "El potasio sérico puede ser normal o alto porque la acidosis y la falta de insulina lo sacan de las células, pero el total corporal está bajo: al dar insulina entra a las células y cae. Por eso se repone desde temprano.",
    ],
    epidemiology:
      "La DM1 debuta sobre todo en la infancia y la adolescencia, con picos alrededor de los 4–6 y los 10–14 años. Una proporción importante debuta con cetoacidosis, más si el diagnóstico se demora. Es la forma de diabetes más frecuente en menores de 15 años.",
    management: [
      "Confirmar: glucemia mayor de 200, pH menor de 7,3 o bicarbonato menor de 18, y cetonemia o cetonuria. Clasificar la gravedad por el pH y el bicarbonato.",
      "Hidratación inicial con solución fisiológica y reposición gradual del déficit.",
      "Insulina regular endovenosa en infusión, sin bolo; potasio en la hidratación; dextrosa al bajar la glucemia.",
      "Controles horarios y vigilancia de edema cerebral; no usar bicarbonato.",
      "Al resolver: pasar a insulina subcutánea con comidas y educación diabetológica de la familia.",
    ],
    sources: [
      "Sociedad Argentina de Pediatría — Consenso sobre el manejo de la cetoacidosis diabética en pediatría.",
      "ISPAD — Guías de práctica clínica (cetoacidosis diabética).",
      "Ley 23.753 de diabetes y Ley 26.914: cobertura de insulinas e insumos.",
    ],
    pearls: [
      "Criterios: hiperglucemia + acidosis metabólica + cetosis.",
      "El potasio “normal” en la cetoacidosis esconde un déficit total.",
      "Lo que se trata es la acidosis: la insulina no se suspende cuando baja la glucemia, se agrega dextrosa.",
    ],
    pitfalls: [
      "Dar bolo de insulina o bicarbonato en un chico.",
      "Hidratar demasiado rápido.",
      "Olvidar el potasio.",
    ],
  },
};
