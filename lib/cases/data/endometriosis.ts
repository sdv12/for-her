import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const endometriosis: ClinicalCase = {
  id: "endometriosis",
  level: 2,
  area: "Ginecología y obstetricia",
  setting: "Consultorio",
  patient: { age: 29, ageUnit: "años", sex: "F", context: "Contadora. Busca embarazo hace un año y medio." },
  frequency: "frecuente",
  intro: "“Desde siempre tengo menstruaciones dolorosas, pero cada año es peor: falto al trabajo, ni el ibuprofeno me hace nada. También me duele en las relaciones. Y no quedo embarazada.”",
  vitals: { TA: "112/70 mmHg", FC: "74 lpm", Peso: "60 kg" },
  anamnesis: [
    act("dismenorrea", "¿Cómo es el dolor menstrual? ¿Cambió con los años?", "clave", "“Empieza un día antes de que me venga y dura toda la menstruación. Cada vez es peor.”", "La dismenorrea secundaria y progresiva es el síntoma cardinal de la endometriosis (la primaria aparece con los primeros ciclos y no empeora)."),
    act("dispareunia", "¿El dolor en las relaciones es en la entrada o profundo?", "clave", "“Profundo, cuando la penetración es profunda.”", "La dispareunia profunda sugiere lesiones en el fondo de saco y los ligamentos uterosacros."),
    act("intestinal", "¿Le duele al ir de cuerpo o tiene sangre en la materia fecal con la menstruación?", "clave", "“Me duele al ir de cuerpo cuando estoy menstruando.”", "La disquecia catamenial sugiere endometriosis profunda con compromiso rectal o del tabique."),
    act("urinario", "¿Le duele al orinar o tiene sangre en la orina con la menstruación?", "util", "“No.”", "Orientaría a compromiso vesical."),
    act("fertilidad", "¿Cuánto hace que buscan? ¿Se estudió la pareja?", "clave", "“Un año y medio. Él se hizo un espermograma normal.”", "Más de un año sin embarazo es infertilidad: la endometriosis está presente en un tercio a la mitad de las mujeres infértiles."),
    act("ciclos", "¿Cómo son los ciclos? ¿Sangra mucho?", "util", "“Regulares, cada 28 días, abundantes.”", "Ciclos irregulares orientarían a anovulación (por ejemplo, ovario poliquístico)."),
    act("familia", "¿Su mamá o hermanas tienen endometriosis?", "util", "“Mi hermana tiene diagnóstico.”", "Hay agregación familiar."),
    act("its", "¿Tuvo infecciones genitales o enfermedad pelviana?", "util", "“No.”", "La EPI es otra causa de dolor pelviano crónico e infertilidad tubaria."),
    act("hobby", "¿Qué hace los fines de semana?", "neutro", "“Salgo a correr cuando no me duele.”", "No orienta."),
  ],
  exam: [
    act("tacto", "Tacto vaginal bimanual", "clave", "Útero en retroversión fija, dolor y nodularidad en los ligamentos uterosacros; anexo izquierdo aumentado, doloroso.", "Útero fijo y nódulos en los uterosacros son muy sugestivos de endometriosis profunda."),
    act("especulo", "Especuloscopía", "util", "Cuello sano; sin lesiones visibles en el fondo de saco vaginal.", "Rara vez se ven lesiones azuladas en la vagina."),
    act("abdomen", "Palpación abdominal", "util", "Blando, leve dolor en hipogastrio.", "Descarta abdomen agudo."),
    act("rectal", "Tacto rectal (con consentimiento)", "util", "Nódulo doloroso en la cara anterior del recto.", "Apoya el compromiso del tabique rectovaginal."),
  ],
  studies: [
    study("Imágenes", "eco", "Ecografía transvaginal con preparación intestinal (protocolo para endometriosis)", "clave", "Quiste ovárico izquierdo de 4 cm con contenido en vidrio esmerilado (endometrioma). Nódulo hipoecoico de 15 mm en el tabique rectovaginal.", "Es el primer estudio: detecta endometriomas y, en manos entrenadas, lesiones profundas."),
    study("Imágenes", "rmn", "Resonancia de pelvis", "util", "Confirma el endometrioma y el nódulo rectovaginal sin compromiso de la luz intestinal.", "Útil para mapear la endometriosis profunda antes de una cirugía."),
    study("Laboratorio", "ca125", "CA-125 para diagnosticar", "innecesario", "Levemente elevado.", "Es inespecífico (sube en muchas condiciones benignas): no diagnostica ni descarta."),
    study("Laboratorio", "hormonal", "Perfil hormonal (FSH, LH, AMH) y TSH", "util", "Reserva ovárica adecuada (AMH normal), TSH normal.", "Parte del estudio de la infertilidad; la reserva ovárica importa antes de operar un endometrioma."),
    study("Imágenes", "tc", "Tomografía de abdomen y pelvis", "innecesario", "No se realizó.", "No es útil para la endometriosis."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("endometriosis", "Endometriosis (endometrioma ovárico izquierdo y endometriosis profunda rectovaginal) con dolor pelviano e infertilidad", true, "Dismenorrea secundaria progresiva, dispareunia profunda, disquecia catamenial, útero fijo con nódulos en los uterosacros y endometrioma en la ecografía."),
      dx("primaria", "Dismenorrea primaria", false, "Empieza con los primeros ciclos, no progresa, con examen normal y buena respuesta a AINE."),
      dx("adenomiosis", "Adenomiosis", false, "Útero aumentado, globuloso y blando con sangrado abundante; puede coexistir, pero no explica el endometrioma ni los nódulos."),
      dx("epi", "Enfermedad pelviana inflamatoria crónica", false, "Antecedente de ITS o EPI, sin relación tan clara con la menstruación."),
      dx("colon", "Síndrome de intestino irritable", false, "Puede dar dolor y alteración del ritmo, pero no explica el examen ni las imágenes."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("aines", "AINE para el dolor", "clave", "Primera línea sintomática."),
      mg("fertilidad", "Derivación a medicina reproductiva por la infertilidad", "clave", "Con deseo de embarazo y endometriosis, el estudio y las técnicas de reproducción asistida se planifican en forma conjunta."),
      mg("hormonal", "Si posterga el embarazo: tratamiento hormonal (progestágeno como dienogest o anticonceptivos en forma continua)", "util", "Suprimen la menstruación y el estímulo de los implantes, y reducen el dolor; no se usan mientras busca embarazo."),
      mg("explicar", "Explicar que es una enfermedad crónica, benigna y tratable, y validar su dolor", "clave", "El diagnóstico suele demorarse años; ser escuchada mejora la adherencia."),
      mg("cirugia", "Laparoscopía en casos seleccionados (dolor refractario, endometriomas grandes, planificación con fertilidad)", "util", "Confirma, trata y mejora el dolor; la cirugía repetida del ovario reduce la reserva ovárica."),
      mg("histerectomia", "Histerectomía con anexectomía", "riesgoso", "En una mujer joven que busca embarazo es inaceptable: elimina su fertilidad."),
      mg("ca125-control", "Seguimiento con CA-125 cada mes", "innecesario", "No sirve para el seguimiento clínico."),
    ],
  },
  debrief: {
    diagnosis: "Endometriosis con endometrioma ovárico izquierdo y endometriosis profunda rectovaginal, con dismenorrea secundaria, dispareunia, disquecia e infertilidad, en mujer de 29 años.",
    pathologies: [
      { name: "Endometriosis", role: "principal", why: "Tejido endometrial fuera del útero con dolor e infertilidad." },
      { name: "Endometrioma ovárico", role: "asociada", why: "Quiste de chocolate." },
      { name: "Adenomiosis", role: "diferencial", why: "Endometrio dentro del miometrio; suelen coexistir." },
      { name: "Dismenorrea primaria y EPI", role: "diferencial", why: "Otras causas de dolor pelviano." },
    ],
    reasoning: [
      "Causa: implantes de tejido endometrial fuera del útero; la teoría más aceptada es la menstruación retrógrada por las trompas, sumada a factores inmunes, genéticos y hormonales.",
      "Mecanismo: los implantes responden a los estrógenos y sangran cada ciclo, generando inflamación crónica, fibrosis y adherencias.",
      "Consecuencia: dolor que acompaña a la menstruación y empeora con los años, dispareunia profunda, disquecia o disuria según la localización, quistes ováricos (endometriomas) e infertilidad por alteración anatómica e inflamatoria.",
      "Por eso suprimir la menstruación mejora el dolor, y las adherencias explican el útero fijo.",
    ],
    epidemiology:
      "La endometriosis afecta a alrededor del 10 % de las mujeres en edad reproductiva y está presente en el 30–50 % de las mujeres con infertilidad. El diagnóstico se demora en promedio 7 a 10 años porque el dolor menstrual se normaliza. Es más frecuente con antecedentes familiares, menarca temprana y ciclos cortos y abundantes.",
    management: [
      "Sospechar ante dismenorrea secundaria, dolor pelviano crónico, dispareunia profunda, disquecia o infertilidad.",
      "Examen ginecológico y ecografía transvaginal (resonancia para lesiones profundas).",
      "Dolor sin deseo de embarazo: AINE y tratamiento hormonal supresor.",
      "Infertilidad: derivación a reproducción; la cirugía se planifica cuidando la reserva ovárica.",
      "Abordaje interdisciplinario del dolor crónico y acceso a reproducción asistida (Ley 26.862).",
    ],
    sources: [
      "Sociedad Argentina de Endometriosis — Consenso de diagnóstico y tratamiento.",
      "FASGO — Consenso de endometriosis.",
      "Ley 26.862 de Reproducción Médicamente Asistida.",
    ],
    pearls: ["Dismenorrea que empeora con los años: pensá en endometriosis.", "El CA-125 no diagnostica endometriosis.", "Endometrioma: quiste en vidrio esmerilado."],
    pitfalls: ["Normalizar el dolor menstrual.", "Operar repetidamente el ovario sin pensar en la fertilidad.", "Indicar tratamiento hormonal a quien busca embarazo."],
    tribunal: [
      qa("¿Qué teorías explican la endometriosis?", "Menstruación retrógrada (Sampson), metaplasia celómica, diseminación linfática o vascular, y factores inmunológicos y genéticos que permiten que los implantes sobrevivan."),
      qa("¿Qué diferencia hay entre endometriosis y adenomiosis?", "La endometriosis es tejido endometrial fuera del útero (ovarios, peritoneo, tabique); la adenomiosis es tejido endometrial dentro del miometrio, con útero aumentado, globuloso, sangrado abundante y dismenorrea."),
      qa("¿Por qué la endometriosis produce infertilidad?", "Por adherencias que alteran la anatomía tubo-ovárica, inflamación peritoneal que afecta los gametos y la implantación, y daño de la reserva ovárica por endometriomas o cirugías."),
      qa("¿Cómo se confirma el diagnóstico?", "Hoy se acepta el diagnóstico clínico e imagenológico para iniciar tratamiento; la confirmación histológica por laparoscopía se reserva para casos seleccionados."),
    ],
  },
};
