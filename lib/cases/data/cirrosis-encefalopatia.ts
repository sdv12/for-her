import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const cirrosisEncefalopatia: ClinicalCase = {
  id: "cirrosis-encefalopatia-hepatica",
  level: 3,
  area: "Gastroenterología",
  setting: "Guardia",
  patient: { age: 58, ageUnit: "años", sex: "M", context: "Cirrosis alcohólica conocida, abstinente hace un año. Lleva 4 días con constipación y toma diuréticos." },
  frequency: "frecuente",
  intro: "“Desde ayer está somnoliento, confunde el día y la noche, dice cosas sin sentido. Le tiemblan las manos.” (relata la esposa)",
  vitals: { TA: "104/64 mmHg", FC: "88 lpm", FR: "18 rpm", "T°": "37 °C", "SatO₂": "96 %", Glucemia: "92 mg/dl", Glasgow: "13/15" },
  anamnesis: [
    act("gatillos", "¿Constipación, sangrado, infección, diuréticos, sedantes?", "clave", "“Constipado 4 días y le subieron la furosemida.”", "Se busca siempre un desencadenante."),
    act("melena", "¿Materia fecal negra o vómitos con sangre?", "clave", "“No.”", "Hemorragia digestiva: gatillo muy frecuente."),
    act("alcohol", "¿Volvió a tomar? ¿Se golpeó?", "clave", "“No, ni se golpeó.”", "Diferencia con intoxicación y hematoma."),
    act("sedantes", "¿Toma benzodiacepinas?", "util", "“A veces, para dormir.”", "Precipitante."),
    act("fiebre", "¿Tuvo fiebre o dolor abdominal?", "util", "“Un poco de dolor en la panza.”", "Peritonitis bacteriana."),
    act("oficio", "¿De qué trabajaba?", "neutro", "“Pintor.”", "No orienta."),
  ],
  exam: [
    act("flapping", "Asterixis y orientación", "clave", "Asterixis, desorientado en tiempo.", "Encefalopatía grado II."),
    act("estigmas", "Estigmas y abdomen", "clave", "Ictericia, arañas, ascitis moderada; dolor leve difuso.", "Cirrosis descompensada."),
    act("tacto", "Tacto rectal y hidratación", "util", "Materia dura, sin melena; mucosas secas.", "Constipación e hipovolemia."),
    act("foco", "Neurológico focal", "util", "Sin foco.", "Si lo hubiera: imagen."),
  ],
  studies: [
    study("Otros", "paracentesis", "Paracentesis diagnóstica", "clave", "PMN 380/mm³.", "Más de 250: peritonitis bacteriana espontánea, también gatillo."),
    study("Laboratorio", "lab", "Función renal, ionograma, hepatograma, coagulación, hemograma, cultivos", "clave", "K 3,1, Na 128, creatinina 1,5, bilirrubina 3, RIN 1,6.", "Trastornos que precipitan."),
    study("Imágenes", "tac", "TC de encéfalo", "util", "Sin lesiones.", "Primer episodio, con trauma o foco."),
    study("Laboratorio", "amonio", "Amonio como único criterio", "innecesario", "Elevado.", "No define el diagnóstico ni la gravedad."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("encefalopatia", "Encefalopatía hepática grado II por constipación, diuréticos y peritonitis bacteriana espontánea", true, "Cirrosis, inversión del sueño, asterixis, sin foco y gatillos encontrados."),
      dx("hematoma", "Hematoma subdural", false, "TC negativa."),
      dx("wernicke", "Encefalopatía de Wernicke", false, "Abstinente, sin ataxia ni oftalmoplejía."),
      dx("hipoglucemia", "Hipoglucemia", false, "Glucemia normal."),
      dx("delirium-tremens", "Delirium tremens", false, "Hace un año que no bebe."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("lactulosa", "Lactulosa hasta 2 a 3 deposiciones blandas por día", "clave", "Reduce la absorción de amonio."),
      mg("gatillo", "Tratar gatillos: suspender diuréticos, reponer potasio y volumen", "clave", "Es clave en la recuperación."),
      mg("pbe", "Cefalosporina de tercera generación y albúmina por la PBE", "clave", "La albúmina reduce la insuficiencia renal y mortalidad."),
      mg("rifaximina", "Agregar rifaximina si hay recurrencia", "util", "Previene nuevos episodios."),
      mg("trasplante", "Evaluar trasplante hepático", "util", "Marca mal pronóstico."),
      mg("sedar", "Benzodiacepinas por la agitación", "riesgoso", "Empeoran la encefalopatía."),
    ],
  },
  debrief: {
    diagnosis: "Encefalopatía hepática grado II precipitada por constipación, diuréticos y peritonitis bacteriana espontánea, en cirrosis alcohólica, en varón de 58 años.",
    pathologies: [
      { name: "Encefalopatía hepática", role: "principal", why: "Disfunción cerebral por falla hepática." },
      { name: "Peritonitis bacteriana espontánea, hipopotasemia", role: "asociada", why: "Gatillos." },
      { name: "Hematoma subdural, Wernicke, hipoglucemia", role: "diferencial", why: "Otras causas de confusión." },
    ],
    reasoning: [
      "Causa: cirrosis con cortocircuitos portosistémicos.",
      "Mecanismo: el amonio y otras toxinas pasan al cerebro; aumentan GABA y edema en astrocitos.",
      "Consecuencia: alteración del sueño, asterixis, confusión y coma.",
    ],
    epidemiology:
      "Alrededor de un tercio a la mitad de las personas con cirrosis la desarrolla en algún momento. La cirrosis por alcohol, hepatitis C e hígado graso metabólico son las principales causas en Argentina. El episodio marca una supervivencia menor sin trasplante.",
    management: [
      "Buscar y tratar gatillos.",
      "Lactulosa y rifaximina si se repite.",
      "Paracentesis en todo cirrótico con ascitis internado.",
      "Evaluar trasplante.",
    ],
    sources: ["Asociación Argentina para el Estudio de las Enfermedades del Hígado — Recomendaciones.", "AASLD/EASL — Guía de encefalopatía hepática."],
    pearls: ["Toda descompensación tiene un gatillo.", "Asterixis + inversión sueño-vigilia.", "Punzá la ascitis."],
    pitfalls: ["Pedir amonio y quedarse tranquilo.", "Sedar."],
    tribunal: [
      qa("¿Cuáles son los grados de West Haven?", "I: cambios sutiles y del sueño. II: desorientación, asterixis. III: somnolencia, muy confuso. IV: coma."),
      qa("¿Cuáles son los criterios de PBE?", "PMN mayor o igual a 250/mm³ en líquido ascítico, sin causa quirúrgica."),
      qa("¿Qué es el GASA?", "Gradiente de albúmina suero-ascitis: 1,1 g/dl o más indica hipertensión portal."),
    ],
  },
};
