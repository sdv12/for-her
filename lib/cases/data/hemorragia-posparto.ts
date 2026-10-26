import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const hemorragiaPosparto: ClinicalCase = {
  id: "hemorragia-posparto-atonia",
  level: 4,
  area: "Ginecología y obstetricia",
  setting: "Internación",
  patient: { age: 30, ageUnit: "años", sex: "F", context: "Parto vaginal hace 40 minutos. Trabajo de parto de 18 h con oxitocina. Bebé de 4.300 g. Tercer parto." },
  frequency: "frecuente",
  intro: "“Me siento mareada y con frío.” La enfermera avisa que la paciente sangra mucho: empapó dos apósitos en diez minutos.",
  vitals: { TA: "84/50 mmHg", FC: "122 lpm", FR: "24 rpm", "T°": "36,0 °C", "SatO₂": "96 %" },
  anamnesis: [
    act("factores", "Revisar la historia del parto: duración, oxitocina, peso del bebé, alumbramiento", "clave", "Trabajo de parto prolongado con oxitocina, macrosomía, multípara. Alumbramiento completo según el registro.", "Son factores de riesgo de atonía uterina, la causa más frecuente de hemorragia posparto."),
    act("hta", "¿Tuvo presión alta en el embarazo?", "clave", "Sin hipertensión ni preeclampsia.", "La ergonovina (ergometrina) está contraindicada en hipertensas."),
    act("coagulacion", "¿Tiene problemas de coagulación o toma anticoagulantes?", "util", "“No.”", "Orienta a la “T” de trombina."),
    act("sintomas", "¿Cómo se siente?", "util", "“Mareada, con sed y frío.”", "Síntomas de shock hipovolémico."),
    act("nombre", "¿Cómo se va a llamar el bebé?", "neutro", "“Valentina.”", "No orienta."),
  ],
  exam: [
    act("utero", "Palpación del útero", "clave", "Útero blando, por encima del ombligo, que se contrae al masajear y vuelve a relajarse.", "Atonía uterina (la “T” de tono): causa del 70–80 % de las hemorragias posparto."),
    act("canal", "Revisión del canal del parto", "clave", "Desgarro perineal de grado I ya suturado, sin desgarros cervicales ni vaginales sangrantes.", "Descarta la “T” de trauma."),
    act("placenta", "Revisión de la placenta y membranas", "clave", "Placenta completa.", "Descarta la “T” de tejido (restos)."),
    act("perfusion", "Perfusión y estado de conciencia", "clave", "Pálida, fría, relleno capilar 4 s, ansiosa. Índice de shock (FC/TAS) 1,45.", "Índice de shock ≥ 1 indica hemorragia grave aunque la TA no haya caído tanto."),
  ],
  studies: [
    study("Laboratorio", "lab", "Hemograma, coagulograma, fibrinógeno, grupo y factor, pruebas cruzadas", "clave", "Hb 8,1 (inicial; va a seguir bajando), fibrinógeno 230 mg/dl. Grupo 0 Rh positivo.", "Prepara la transfusión y busca coagulopatía; un fibrinógeno < 200 predice hemorragia grave."),
    study("Laboratorio", "esperar", "Esperar el hematocrito para decidir si tratar", "riesgoso", "No se realizó.", "La hemoglobina inicial subestima la pérdida: el tratamiento se decide por la clínica y el índice de shock."),
    study("Imágenes", "eco", "Ecografía en la cama", "util", "Cavidad uterina sin restos, sin colecciones.", "Ayuda a descartar restos y hematomas."),
    study("Imágenes", "tc", "Tomografía de abdomen", "innecesario", "No se realizó.", "No tiene lugar en una paciente inestable con causa clara."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("atonia", "Hemorragia posparto por atonía uterina con shock hipovolémico", true, "Sangrado abundante con útero blando y aumentado de tamaño, canal y placenta sin alteraciones, factores de riesgo de atonía e índice de shock 1,45."),
      dx("trauma", "Desgarro del canal del parto", false, "El canal fue revisado: solo un desgarro menor ya reparado."),
      dx("restos", "Retención de restos placentarios", false, "La placenta está completa y la ecografía no muestra restos."),
      dx("coagulopatia", "Coagulopatía", false, "El fibrinógeno y el coagulograma son normales; puede aparecer si la hemorragia sigue."),
      dx("inversion", "Inversión uterina", false, "El fondo uterino no se palparía y habría una masa en vagina con shock desproporcionado."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("ayuda", "Pedir ayuda (código rojo), dos vías gruesas, cristaloides tibios y sangre", "clave", "La hemorragia posparto es la principal causa de muerte materna evitable: se activa un protocolo con roles y tiempos."),
      mg("masaje", "Masaje uterino bimanual y oxitocina en infusión", "clave", "Primera línea para la atonía."),
      mg("tranexamico", "Ácido tranexámico 1 g endovenoso (dentro de las 3 h del parto)", "clave", "Reduce la mortalidad por sangrado si se da temprano."),
      mg("uterotonicos", "Si persiste: ergonovina (no es hipertensa) o misoprostol; luego balón intrauterino y traje antishock no neumático", "clave", "Escalonamiento antes de la cirugía."),
      mg("cirugia", "Si fracasan las medidas: cirugía (suturas compresivas, ligaduras, histerectomía)", "util", "Último escalón para salvar la vida."),
      mg("esperar", "Observar 30 minutos a ver si el útero se contrae solo", "riesgoso", "Cada minuto cuenta: la hemorragia posparto puede matar en menos de 2 horas."),
    ],
  },
  debrief: {
    diagnosis: "Hemorragia posparto grave por atonía uterina con shock hipovolémico (índice de shock 1,45), en multípara con trabajo de parto prolongado y macrosomía.",
    pathologies: [
      { name: "Hemorragia posparto por atonía uterina", role: "principal", why: "Útero que no se contrae tras el parto." },
      { name: "Shock hipovolémico", role: "asociada", why: "Pérdida masiva de sangre." },
      { name: "Trauma, restos y coagulopatía (las otras “T”)", role: "diferencial", why: "Se descartan en forma sistemática." },
      { name: "Inversión uterina", role: "diferencial", why: "Rara pero grave." },
    ],
    reasoning: [
      "Causa: el útero sobredistendido (macrosomía), agotado (trabajo de parto prolongado con oxitocina) y de una multípara se contrae mal.",
      "Mecanismo: después del alumbramiento, la hemostasia del lecho placentario depende de que las fibras del miometrio se contraigan y compriman los vasos (“ligaduras vivientes”). Si el útero no se contrae, esos vasos sangran.",
      "Consecuencia: sangrado abundante con útero blando; el embarazo aumentó la volemia y la mujer compensa mucho antes de bajar la presión, por eso el índice de shock detecta la gravedad antes.",
      "Por eso se previene con el manejo activo del alumbramiento (oxitocina tras el nacimiento).",
    ],
    epidemiology:
      "La hemorragia posparto es la primera causa de muerte materna en el mundo y una de las principales en la Argentina, y casi todas esas muertes son evitables. Complica alrededor del 5 % de los partos. La atonía explica el 70–80 %. Son factores de riesgo la macrosomía, el embarazo múltiple, el polihidramnios, el trabajo de parto prolongado o inducido, la multiparidad y la corioamnionitis.",
    management: [
      "Prevención: manejo activo del alumbramiento con oxitocina en todos los partos.",
      "Reconocer temprano (pérdida > 500 ml, índice de shock ≥ 1) y activar el código rojo.",
      "Las 4 T: tono (masaje, uterotónicos), trauma (reparar), tejido (extraer restos), trombina (corregir coagulación).",
      "Ácido tranexámico en las primeras 3 h; reanimación con cristaloides y hemoderivados.",
      "Escalar: balón, traje antishock, embolización o cirugía.",
    ],
    sources: [
      "Ministerio de Salud de la Nación — Guía para la prevención, diagnóstico y tratamiento de la hemorragia posparto.",
      "Federación Argentina de Sociedades de Ginecología y Obstetricia (FASGO) — Consenso de hemorragia posparto.",
    ],
    pearls: ["Útero blando por encima del ombligo + sangrado = atonía.", "Índice de shock ≥ 1: alarma.", "Ácido tranexámico en las primeras 3 h."],
    pitfalls: ["Esperar la hemoglobina.", "Usar ergonovina en una hipertensa.", "No pedir ayuda a tiempo."],
  },
};
