import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const estenosisCarotidea: ClinicalCase = {
  id: "estenosis-carotidea",
  level: 2,
  area: "Cardiovascular",
  setting: "Consultorio",
  patient: { age: 71, ageUnit: "años", sex: "M", context: "Ex tornero. Hipertenso, dislipémico, fumó 40 años. Hace 10 días se le durmió la mano derecha media hora." },
  frequency: "frecuente",
  intro: "“El clínico me escuchó un ruido en el cuello y me mandó acá. Lo de la mano ya se me pasó.”",
  vitals: { TA: "148/86 mmHg", FC: "72 lpm", "T°": "36,3 °C" },
  anamnesis: [
    act("episodio", "¿Cómo fue lo de la mano y cuánto duró?", "clave", "“Se me durmió y no podía agarrar la taza, como media hora. Después nada.”", "Déficit motor transitorio contralateral: AIT de territorio carotídeo izquierdo."),
    act("habla", "¿Le costó hablar en ese momento?", "clave", "“Mi señora dice que trababa un poco las palabras.”", "Afasia: hemisferio dominante, refuerza el territorio carotídeo izquierdo."),
    act("vista", "¿Perdió la vista de un ojo alguna vez?", "clave", "“No.”", "La amaurosis fugaz es otro síntoma carotídeo."),
    act("medicacion", "¿Qué medicación toma?", "clave", "“Enalapril. La estatina la dejé porque me dolían las piernas.”", "Prevención secundaria incompleta."),
    act("tabaco", "¿Sigue fumando?", "util", "“Medio atado.”", "Factor modificable central."),
    act("claudicacion", "¿Le duelen las piernas al caminar?", "util", "“A las tres cuadras, la pantorrilla.”", "Enfermedad vascular en varios territorios."),
  ],
  exam: [
    act("soplo", "Auscultación carotídea", "clave", "Soplo sistólico en carótida izquierda.", "Sugiere estenosis, aunque su ausencia no la descarta."),
    act("neuro", "Examen neurológico", "clave", "Sin déficit actual.", "AIT resuelto."),
    act("pulsos", "Pulsos periféricos", "util", "Pedios débiles bilaterales.", "Arteriopatía periférica."),
    act("cardio", "Ritmo cardíaco", "util", "Regular.", "Sin FA evidente."),
  ],
  studies: [
    study("Imágenes", "doppler", "Eco Doppler de vasos de cuello", "clave", "Placa en bulbo carotídeo izquierdo con estenosis del 80 %; derecha 30 %.", "Primer estudio para cuantificar la estenosis."),
    study("Imágenes", "angiotac", "Angiotomografía de vasos de cuello y cerebro", "clave", "Confirma estenosis del 78 % en carótida interna izquierda; lesiones isquémicas pequeñas antiguas frontales izquierdas.", "Confirma antes de la revascularización."),
    study("Electrofisiología", "ecg", "ECG", "util", "Ritmo sinusal.", "Busca FA como causa alternativa."),
    study("Laboratorio", "lipidos", "Perfil lipídico y glucemia", "util", "LDL 168 mg/dl, glucemia 104 mg/dl.", "Metas de prevención secundaria."),
    study("Otros", "angiografia", "Angiografía digital diagnóstica de rutina", "riesgoso", "No se realizó.", "Es invasiva y con riesgo de ACV; los estudios no invasivos alcanzaron."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("estenosis-sintomatica", "Estenosis carotídea interna izquierda sintomática del 70–99 % con AIT", true, "AIT hemisférico izquierdo en los últimos 6 meses y estenosis del 80 % ipsilateral."),
      dx("asintomatica", "Estenosis carotídea asintomática", false, "El episodio de la mano y el habla la vuelve sintomática."),
      dx("cardioembolico", "AIT cardioembólico por FA", false, "Ritmo sinusal y lesión carotídea que explica el cuadro."),
      dx("lacunar", "AIT lacunar", false, "La afasia es cortical, no lacunar."),
      dx("migrana", "Aura migrañosa", false, "Sin cefalea ni progresión positiva de síntomas."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("endarterectomia", "Endarterectomía carotídea en las dos primeras semanas", "clave", "En sintomáticos con 70–99 % el beneficio es máximo si se opera temprano."),
      mg("aspirina", "Aspirina", "clave", "Antiagregación."),
      mg("estatina-alta", "Estatina de alta intensidad (rotar si hubo intolerancia)", "clave", "Meta de LDL menor de 55 mg/dl."),
      mg("tabaco", "Cesación tabáquica", "clave", "Reduce eventos."),
      mg("presion", "Control de la presión", "util", "Meta menor de 130/80 una vez revascularizado."),
      mg("esperar", "Control con Doppler anual sin intervenir", "riesgoso", "El riesgo de ACV es máximo en las semanas posteriores al AIT."),
      mg("anticoagular", "Anticoagulación en lugar de antiagregación", "innecesario", "No hay fuente embólica cardíaca."),
    ],
  },
  debrief: {
    diagnosis: "Estenosis carotídea interna izquierda sintomática del 80 % con AIT hemisférico, en un hombre de 71 años con múltiples factores de riesgo.",
    pathologies: [
      { name: "Estenosis carotídea sintomática", role: "principal", why: "Placa ateroesclerótica en el bulbo con embolia arterioarterial." },
      { name: "Arteriopatía periférica", role: "asociada", why: "Claudicación y pulsos débiles." },
      { name: "AIT cardioembólico", role: "diferencial", why: "Se busca FA siempre." },
    ],
    reasoning: [
      "Causa: ateroesclerosis del bulbo carotídeo favorecida por tabaco, HTA y dislipemia.",
      "Mecanismo: embolia de material de la placa al territorio de la cerebral media.",
      "Consecuencia: AIT que anuncia un ACV de alto riesgo en las semanas siguientes.",
    ],
    epidemiology:
      "La estenosis carotídea causa entre el 10 y el 15 % de los ACV isquémicos. Es más frecuente en varones mayores de 65 fumadores. Tras un AIT carotídeo con estenosis grave, el riesgo de ACV es de hasta el 20 % en los primeros 90 días.",
    management: [
      "Doppler y angiotomografía.",
      "Endarterectomía temprana si es sintomática y del 70–99 %.",
      "Antiagregación y estatina de alta intensidad.",
      "Control de factores de riesgo.",
    ],
    sources: ["Sociedad Argentina de Cardiología — Consenso de enfermedad vascular periférica.", "ESVS — Guidelines on the management of atherosclerotic carotid disease."],
    pearls: ["Sintomática = síntomas en los últimos 6 meses.", "70–99 % sintomática: operar en 2 semanas.", "La oclusión total no se opera."],
    pitfalls: ["Esperar con controles anuales.", "Confundir síntomas hemisféricos con lacunares."],
    tribunal: [
      qa("¿Cuándo está indicada la endarterectomía carotídea?", "En estenosis sintomáticas del 70–99 %, y considerarla del 50–69 %, idealmente dentro de las dos semanas del evento."),
      qa("¿Qué síntomas se consideran carotídeos?", "Déficit motor o sensitivo contralateral, afasia si es el hemisferio dominante y amaurosis fugaz ipsilateral."),
      qa("¿Por qué no se opera una oclusión carotídea total?", "Porque ya no hay flujo que emita émbolos y la cirugía no reduce el riesgo de ACV."),
    ],
  },
};
