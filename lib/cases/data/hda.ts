import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const hda: ClinicalCase = {
  id: "hemorragia-digestiva-alta",
  level: 3,
  area: "Gastroenterología",
  setting: "Guardia",
  patient: { age: 58, ageUnit: "años", sex: "M", context: "Mecánico. Toma ibuprofeno hace un mes por dolor de hombro." },
  frequency: "frecuente",
  intro: "“Desde ayer hago caca negra como alquitrán, con olor feo. Hoy vomité como borra de café y al pararme me mareé y casi me caigo.”",
  vitals: { TA: "96/60 mmHg (sentado); 80/50 de pie", FC: "118 lpm", FR: "20 rpm", "T°": "36,3 °C", "SatO₂": "97 %" },
  anamnesis: [
    act("aines", "¿Qué medicamentos toma? ¿Antiinflamatorios, aspirina, anticoagulantes?", "clave", "“Ibuprofeno 600 tres veces por día hace un mes, a veces con el estómago vacío.”", "Los AINE son, junto con Helicobacter pylori, la principal causa de úlcera péptica sangrante."),
    act("hepatopatia", "¿Toma alcohol? ¿Le dijeron que tiene problemas de hígado?", "clave", "“Tomo vino en las comidas, no mucho. Del hígado nada.”", "La cirrosis con várices esofágicas cambia el manejo: vasoactivos (octreotide o terlipresina) y antibiótico profiláctico."),
    act("epigastralgia", "¿Tenía dolor o ardor en la boca del estómago?", "util", "“Sí, hace unas semanas, que mejoraba al comer.”", "Dolor epigástrico que mejora con la comida sugiere úlcera duodenal."),
    act("vomitos", "¿Antes de vomitar sangre tuvo vómitos fuertes repetidos?", "util", "“No, fue de entrada así.”", "Vómitos intensos previos orientarían a síndrome de Mallory-Weiss."),
    act("cardio", "¿Tiene dolor de pecho o enfermedades del corazón?", "clave", "“No, pero me agito.”", "La anemia aguda puede desencadenar isquemia; la cardiopatía cambia el umbral de transfusión."),
    act("peso", "¿Bajó de peso o le cuesta tragar?", "util", "“No.”", "La pérdida de peso y la disfagia sugieren cáncer gástrico o esofágico."),
    act("auto", "¿Qué auto tiene?", "neutro", "“Un Falcon del 80.”", "No orienta."),
  ],
  exam: [
    act("hemodinamia", "Ortostatismo, perfusión y estado de conciencia", "clave", "Caída de 16 mmHg de TA sistólica al pararse, palidez, sudoración, relleno capilar 3 s. Lúcido.", "Taquicardia e hipotensión ortostática indican una pérdida importante (≥ 20 % de la volemia)."),
    act("tacto", "Tacto rectal", "clave", "Melena en el dedo de guante.", "Confirma la hemorragia digestiva alta (la melena indica sangrado por encima del ángulo de Treitz en la mayoría)."),
    act("estigmas", "Estigmas de hepatopatía crónica", "clave", "Sin ictericia, ascitis, arañas vasculares ni circulación colateral.", "Su ausencia hace menos probable el sangrado por várices."),
    act("abdomen", "Palpación abdominal", "util", "Dolor leve en epigastrio, sin defensa.", "La irritación peritoneal sugeriría perforación."),
  ],
  studies: [
    study("Laboratorio", "lab", "Hemograma, urea, creatinina, coagulograma, grupo y factor", "clave", "Hb 7,4 g/dl; urea 98 mg/dl con creatinina 1,0; RIN 1,1. Grupo A positivo.", "La Hb inicial subestima la pérdida. La urea alta con creatinina normal refleja la digestión de la sangre en el intestino (típico de hemorragia alta)."),
    study("Otros", "veda", "Videoendoscopia digestiva alta (VEDA) en las primeras 24 h", "clave", "Úlcera duodenal de 15 mm en la cara posterior del bulbo con vaso visible no sangrante (Forrest IIa).", "Diagnostica, estratifica el riesgo de resangrado y permite tratar (terapia endoscópica combinada)."),
    study("Otros", "blatchford", "Calcular el puntaje de Glasgow-Blatchford", "util", "Puntaje de 14: alto riesgo.", "Con puntaje alto necesita internación, endoscopia y probablemente transfusión."),
    study("Microbiología", "hp", "Búsqueda de Helicobacter pylori (biopsia o test)", "util", "Positivo.", "Su erradicación reduce mucho la recurrencia de la úlcera y del sangrado."),
    study("Imágenes", "tc", "Tomografía de abdomen", "innecesario", "No se realizó.", "La endoscopia es el estudio de elección; la TC no diagnostica la úlcera."),
    study("Imágenes", "seriada", "Seriada esofagogastroduodenal con bario", "riesgoso", "No se realizó.", "No tiene lugar en la hemorragia aguda y el bario impide luego la endoscopia."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("ulcera", "Hemorragia digestiva alta por úlcera duodenal asociada a AINE y H. pylori", true, "Melena, hematemesis en borra de café, consumo de AINE, epigastralgia previa, sin estigmas de hepatopatía; VEDA con úlcera bulbar con vaso visible."),
      dx("varices", "Hemorragia por várices esofágicas", false, "Requiere hipertensión portal: estigmas de cirrosis, alcoholismo, sangrado masivo rojo."),
      dx("mallory", "Síndrome de Mallory-Weiss", false, "Desgarro de la unión esofagogástrica tras vómitos intensos repetidos."),
      dx("cancer", "Cáncer gástrico", false, "Pérdida de peso, saciedad precoz y anemia crónica; la endoscopia muestra una úlcera bulbar benigna."),
      dx("baja", "Hemorragia digestiva baja", false, "La hematemesis y la urea alta ubican el origen por encima del ángulo de Treitz."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("vias", "Dos vías periféricas gruesas, cristaloides y monitoreo", "clave", "Reanimación hemodinámica inicial."),
      mg("transfusion", "Transfusión con estrategia restrictiva (meta Hb 7–8 g/dl, o más alta si hay cardiopatía)", "clave", "La estrategia restrictiva reduce mortalidad y resangrado frente a transfundir hasta valores altos."),
      mg("ibp", "Omeprazol o pantoprazol endovenoso en dosis altas", "clave", "Estabiliza el coágulo (la pepsina lo disuelve en medio ácido) y reduce el resangrado tras la endoscopia."),
      mg("endoscopia", "Endoscopia en las primeras 24 h con tratamiento endoscópico", "clave", "Diagnóstica y terapéutica; en un vaso visible se trata (inyección más método térmico o clips)."),
      mg("hp", "Erradicar H. pylori y suspender los AINE", "util", "Previene la recurrencia."),
      mg("liberal", "Transfundir hasta llegar a Hb 10 g/dl", "riesgoso", "Aumenta la presión portal y el resangrado; la estrategia liberal se asoció a mayor mortalidad."),
      mg("alta", "Alta con omeprazol oral y endoscopia programada en un mes", "riesgoso", "Paciente inestable con puntaje de Blatchford alto: requiere internación y endoscopia urgente."),
    ],
  },
  debrief: {
    diagnosis: "Hemorragia digestiva alta por úlcera duodenal (Forrest IIa) asociada a AINE y H. pylori, con repercusión hemodinámica.",
    pathologies: [
      { name: "Úlcera péptica duodenal sangrante", role: "principal", why: "Melena, hematemesis y hallazgo endoscópico." },
      { name: "Infección por Helicobacter pylori", role: "asociada", why: "Causa principal de úlcera, sumada a los AINE." },
      { name: "Anemia aguda posthemorrágica", role: "asociada", why: "Hb 7,4 con repercusión hemodinámica." },
      { name: "Várices esofágicas", role: "diferencial", why: "Siempre a considerar por el cambio de manejo." },
      { name: "Mallory-Weiss y cáncer gástrico", role: "diferencial", why: "Otras causas de hemorragia alta." },
    ],
    reasoning: [
      "Causa: los AINE inhiben la COX-1 y la síntesis de prostaglandinas protectoras (moco, bicarbonato, flujo de la mucosa); H. pylori aumenta la secreción ácida y daña el epitelio.",
      "Mecanismo: el ácido y la pepsina erosionan la mucosa hasta formar una úlcera; si alcanza un vaso de la submucosa (en la cara posterior del bulbo, la gastroduodenal), sangra.",
      "Consecuencia: la sangre digerida por el ácido se vuelve negra (melena, borra de café); se absorbe como proteína y eleva la urea. La pérdida de volumen da taquicardia, ortostatismo y shock.",
      "La hemoglobina inicial engaña: tarda horas en bajar hasta que se produce la hemodilución.",
    ],
    epidemiology:
      "La úlcera péptica es la causa más frecuente de hemorragia digestiva alta no variceal. Es más frecuente en varones y en mayores de 60, sobre todo con uso de AINE o aspirina, anticoagulantes y H. pylori (muy prevalente en la Argentina). La mortalidad ronda el 5–10 % y aumenta con la edad y las comorbilidades.",
    management: [
      "Reanimación: vías, cristaloides, transfusión restrictiva; estratificar con Glasgow-Blatchford.",
      "Inhibidores de bomba endovenosos; en sospecha de várices, vasoactivos y antibiótico profiláctico.",
      "Endoscopia en las primeras 24 h (antes si hay inestabilidad que no responde), con tratamiento según la clasificación de Forrest.",
      "Si resangra: nueva endoscopia; si falla, embolización o cirugía.",
      "Erradicar H. pylori, suspender AINE o protegerlos con IBP si son imprescindibles.",
    ],
    sources: [
      "Sociedad Argentina de Gastroenterología — Consenso de hemorragia digestiva alta no variceal.",
      "Federación Argentina de Gastroenterología — Recomendaciones sobre Helicobacter pylori.",
    ],
    pearls: [
      "Urea alta con creatinina normal: sangrado digestivo alto.",
      "Transfusión restrictiva: meta 7–8 g/dl.",
      "Úlcera + AINE + H. pylori: suspender, erradicar, proteger.",
    ],
    pitfalls: ["Confiar en la hemoglobina inicial.", "Transfundir de más.", "No preguntar por AINE y anticoagulantes."],
  },
};
