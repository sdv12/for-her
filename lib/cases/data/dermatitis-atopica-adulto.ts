import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const dermatitisAtopicaAdulto: ClinicalCase = {
  id: "dermatitis-atopica-adulto",
  level: 2,
  area: "Dermatología",
  setting: "Consultorio",
  patient: { age: 27, ageUnit: "años", sex: "F", context: "Eccema desde bebé, mejoró en la adolescencia y volvió hace 2 años. Asma leve." },
  frequency: "frecuente",
  intro: "“Me pica tanto que no duermo. Tengo la piel gruesa en los pliegues de los codos, el cuello y los párpados.”",
  vitals: { TA: "112/70 mmHg", FC: "76 lpm", "T°": "36,5 °C" },
  anamnesis: [
    act("historia", "¿Desde cuándo?", "clave", "“Desde bebé, volvió hace dos años.”", "Curso crónico recurrente."),
    act("prurito", "¿Cómo es la picazón?", "clave", "“No duermo y me rasco hasta sangrar.”", "Impacto grave."),
    act("atopia", "¿Asma o rinitis?", "clave", "“Asma.”", "Atopia."),
    act("cuidado", "¿Cómo cuidás la piel?", "util", "“Baños calientes y jabón común.”", "Empeoran."),
    act("infeccion", "¿Ampollas o costras amarillas?", "util", "“A veces costras.”", "Sobreinfección."),
    act("trabajo", "¿Trabajás?", "neutro", "“Soy maestra de primaria.”", "No orienta."),
  ],
  exam: [
    act("piel", "Piel", "clave", "Placas liquenificadas en flexuras, cuello y párpados, xerosis generalizada.", "Eccema crónico."),
    act("costras", "Lesiones sobreinfectadas", "clave", "Costras melicéricas en el cuello.", "Impetiginización."),
    act("pliegue", "Pliegue de Dennie-Morgan", "util", "Presente.", "Atopia."),
  ],
  studies: [
    study("Otros", "clinico", "Diagnóstico clínico y escala EASI", "clave", "EASI 26.", "Moderada a grave."),
    study("Microbiología", "cultivo", "Cultivo de costras", "util", "S. aureus.", "Sobreinfección."),
    study("Laboratorio", "ige", "IgE total", "util", "Elevada.", "Apoya, no diagnostica."),
    study("Laboratorio", "panel-alimentos", "Panel de alergia alimentaria y dietas", "innecesario", "No se realizó.", "No es la causa en adultos."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("da-adulto", "Dermatitis atópica del adulto moderada a grave con sobreinfección estafilocócica", true, "Eccema crónico desde la infancia, flexuras y párpados, liquenificación, atopia y costras."),
      dx("contacto", "Dermatitis de contacto", false, "Patrón crónico desde la infancia y atopia."),
      dx("psoriasis", "Psoriasis", false, "Flexuras con liquenificación y prurito intenso."),
      dx("escabiosis", "Escabiosis", false, "Curso de años y distribución."),
      dx("micosis", "Micosis", false, "Patrón eccematoso."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("emolientes", "Emolientes varias veces por día y baños cortos tibios", "clave", "Barrera."),
      mg("corticoide", "Corticoide tópico en brotes y tacrolimus en párpados", "clave", "Antiinflamatorio."),
      mg("atb", "Antibiótico tópico u oral por la sobreinfección", "clave", "S. aureus."),
      mg("sistemico", "Derivar para dupilumab u otros sistémicos si no controla", "util", "Moderada a grave."),
      mg("corticoide-oral", "Corticoides orales repetidos", "riesgoso", "Rebote y efectos adversos."),
      mg("dietas", "Dietas de eliminación", "riesgoso", "Sin beneficio."),
    ],
  },
  debrief: {
    diagnosis: "Dermatitis atópica del adulto moderada a grave con sobreinfección por S. aureus, en mujer de 27 años asmática.",
    pathologies: [
      { name: "Dermatitis atópica", role: "principal", why: "Eccema inflamatorio crónico." },
      { name: "Sobreinfección y asma", role: "asociada", why: "Complicación y comorbilidad." },
      { name: "Contacto, psoriasis", role: "diferencial", why: "Otras dermatosis." },
    ],
    reasoning: [
      "Causa: alteración de la barrera (filagrina) e inflamación Th2.",
      "Mecanismo: piel seca, permeable y pruriginosa con ciclo picor-rascado.",
      "Consecuencia: liquenificación, insomnio e infecciones.",
    ],
    epidemiology:
      "Una parte de los niños con dermatitis atópica la mantiene o la vuelve a tener de adulto. En adultos predominan cara, cuello y flexuras. Los nuevos tratamientos biológicos cambiaron el pronóstico de las formas graves.",
    management: [
      "Barrera.",
      "Antiinflamatorio tópico.",
      "Sobreinfección.",
      "Sistémicos.",
    ],
    sources: ["Sociedad Argentina de Dermatología — Consenso de dermatitis atópica.", "EuroGuiDerm — Guideline on Atopic Eczema."],
    pearls: ["Emolientes siempre.", "Tacrolimus en párpados.", "Biológicos en graves."],
    pitfalls: ["Corticoides orales.", "Dietas."],
    tribunal: [
      qa("¿Qué gen se asocia a la alteración de barrera?", "El de la filagrina, proteína clave de la barrera cutánea."),
      qa("¿Cómo actúa el dupilumab?", "Bloquea el receptor de IL-4 e IL-13."),
      qa("¿Qué es el eccema herpético?", "Infección diseminada por herpes simple sobre dermatitis atópica, urgencia."),
    ],
  },
};
