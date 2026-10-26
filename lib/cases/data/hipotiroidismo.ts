import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const hipotiroidismo: ClinicalCase = {
  id: "hipotiroidismo-hashimoto",
  level: 2,
  area: "Endocrinología",
  setting: "Consultorio",
  patient: { age: 52, ageUnit: "años", sex: "F", context: "Administrativa." },
  frequency: "muy-frecuente",
  intro: "“Estoy agotada hace meses, duermo y me levanto cansada. Subí seis kilos sin comer más, tengo frío todo el tiempo y ando muy estreñida.”",
  vitals: { TA: "138/90 mmHg", FC: "58 lpm", "T°": "36,0 °C", Peso: "74 kg" },
  anamnesis: [
    act("sintomas", "¿Notó cambios en la piel, el pelo o la voz?", "clave", "“La piel muy seca, se me cae el pelo y estoy más ronca.”", "Piel seca, caída del cabello y voz ronca son manifestaciones del hipotiroidismo (mixedema)."),
    act("animo", "¿Cómo está de ánimo y de memoria?", "clave", "“Lenta, me olvido de todo, y estoy bajoneada.”", "La lentitud psíquica y el ánimo deprimido son frecuentes; hay que diferenciar de una depresión primaria."),
    act("menstruacion", "¿Cómo están sus menstruaciones?", "util", "“Irregulares, creo que estoy en la menopausia.”", "El hipotiroidismo puede dar alteraciones menstruales; además, los síntomas se confunden con la menopausia."),
    act("familia", "¿Hay problemas de tiroides o enfermedades autoinmunes en la familia?", "clave", "“Mi mamá y mi hermana toman levotiroxina.”", "La tiroiditis de Hashimoto tiene fuerte carga familiar."),
    act("farmacos", "¿Toma algún medicamento, como litio, amiodarona o suplementos de yodo?", "clave", "“No.”", "Estos fármacos pueden causar hipotiroidismo."),
    act("cardio", "¿Tiene dolor de pecho o falta de aire?", "util", "“No.”", "En cardiópatas la levotiroxina se inicia en dosis bajas."),
    act("mascotas", "¿Tiene mascotas?", "neutro", "“Dos gatos.”", "No orienta."),
  ],
  exam: [
    act("tiroides", "Palpación tiroidea", "clave", "Bocio difuso, de consistencia firme, indoloro, sin nódulos.", "Bocio firme y difuso: típico de la tiroiditis de Hashimoto."),
    act("reflejos", "Reflejos osteotendinosos", "util", "Aquilianos con fase de relajación enlentecida.", "Signo clásico de hipotiroidismo."),
    act("piel", "Piel y faneras", "util", "Piel seca, fría, pálida; edema sin fóvea en párpados; cabello quebradizo.", "Mixedema por depósito de glucosaminoglicanos."),
    act("cardio", "Auscultación cardíaca", "util", "Bradicardia regular, ruidos hipofonéticos.", "Bradicardia por menor estímulo tiroideo."),
  ],
  studies: [
    study("Laboratorio", "tsh", "TSH", "clave", "18,5 mUI/l (normal hasta 4,5).", "Es la prueba más sensible para el hipotiroidismo primario."),
    study("Laboratorio", "t4l", "T4 libre", "clave", "0,6 ng/dl (baja).", "TSH alta con T4 libre baja: hipotiroidismo clínico (manifiesto)."),
    study("Laboratorio", "atpo", "Anticuerpos antitiroperoxidasa (anti-TPO)", "util", "Positivos en título alto.", "Confirman la causa autoinmune (Hashimoto)."),
    study("Laboratorio", "lipidos", "Perfil lipídico y hemograma", "util", "LDL 168 mg/dl; Hb 11,8 g/dl normocítica.", "El hipotiroidismo eleva el colesterol y puede dar anemia; ambos mejoran con el tratamiento."),
    study("Imágenes", "eco", "Ecografía tiroidea", "innecesario", "Glándula aumentada, heterogénea, sin nódulos.", "Sin nódulos palpables no cambia la conducta en el hipotiroidismo."),
    study("Imágenes", "centello", "Centellograma tiroideo", "innecesario", "No se realizó.", "No tiene indicación en el hipotiroidismo (se usa en el hipertiroidismo)."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hashimoto", "Hipotiroidismo primario por tiroiditis de Hashimoto", true, "Cansancio, aumento de peso, intolerancia al frío, constipación, bradicardia, bocio firme, TSH alta, T4 libre baja y anti-TPO positivos."),
      dx("subclinico", "Hipotiroidismo subclínico", false, "Es TSH alta con T4 libre normal; acá la T4 libre está baja."),
      dx("central", "Hipotiroidismo central", false, "TSH baja o normal inapropiada con T4 libre baja, por enfermedad hipofisaria o hipotalámica."),
      dx("depresion", "Depresión", false, "Puede coexistir, pero no explica el bocio, la bradicardia ni el laboratorio."),
      dx("menopausia", "Síntomas de la menopausia", false, "Dan sofocos (calor), no intolerancia al frío, bradicardia ni bocio."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("levo", "Levotiroxina (1,6 µg/kg/día, o empezar con 50–75 µg y titular) en ayunas, 30–60 minutos antes del desayuno", "clave", "Es el tratamiento. La absorción baja con comida, mate, café, calcio y hierro."),
      mg("control", "Control de TSH a las 6–8 semanas y ajustar dosis", "clave", "La levotiroxina tarda ese tiempo en llegar a un estado estable."),
      mg("explicar", "Explicar que el tratamiento suele ser de por vida", "clave", "Mejora la adherencia y evita abandonos."),
      mg("t3", "Liotironina (T3) sola", "innecesario", "Tiene vida media corta y produce picos; no es de elección."),
      mg("dosis-alta", "Dosis alta de entrada para que se sienta mejor rápido", "riesgoso", "Puede precipitar arritmias o angina, sobre todo si hay enfermedad coronaria no conocida; se titula."),
      mg("antidepresivo", "Antidepresivo como primera medida", "innecesario", "Primero hay que tratar el hipotiroidismo y reevaluar el ánimo."),
    ],
  },
  debrief: {
    diagnosis: "Hipotiroidismo primario clínico por tiroiditis crónica autoinmune (Hashimoto), con bocio y dislipemia secundaria.",
    pathologies: [
      { name: "Tiroiditis de Hashimoto", role: "principal", why: "Anti-TPO positivos, bocio firme, TSH alta y T4 libre baja." },
      { name: "Dislipemia secundaria", role: "asociada", why: "El hipotiroidismo reduce los receptores de LDL." },
      { name: "Hipotiroidismo subclínico y central", role: "diferencial", why: "Se distinguen por TSH y T4 libre." },
      { name: "Depresión", role: "diferencial", why: "Síntomas superpuestos." },
    ],
    reasoning: [
      "Causa: autoinmunidad contra la tiroides (anti-TPO, antitiroglobulina), con infiltración linfocitaria y destrucción progresiva del tejido.",
      "Mecanismo: cae la producción de T4 y T3; la hipófisis responde aumentando la TSH (que además estimula el crecimiento: bocio).",
      "Consecuencia: las hormonas tiroideas regulan el metabolismo de casi todos los tejidos → menor gasto energético (frío, aumento de peso, cansancio), bradicardia, constipación, piel seca, lentitud mental, colesterol alto y depósito de mucopolisacáridos (mixedema).",
      "Como la TSH aumenta antes de que caiga la T4, la TSH es la mejor prueba para detectar el hipotiroidismo primario.",
    ],
    epidemiology:
      "El hipotiroidismo es una de las enfermedades endocrinas más frecuentes: afecta al 2–5 % de la población. Es 5 a 10 veces más frecuente en mujeres, y la prevalencia aumenta con la edad, sobre todo después de los 50. En la Argentina, con la sal yodada, la causa principal es la tiroiditis de Hashimoto. Es frecuente en el embarazo y el posparto.",
    management: [
      "Confirmar con TSH y T4 libre; anti-TPO para la causa.",
      "Levotiroxina en ayunas: dosis plena en jóvenes sanos; dosis bajas y titulación en mayores de 60 o cardiópatas.",
      "TSH a las 6–8 semanas de cada cambio y luego anual; meta TSH en rango normal.",
      "Embarazo: aumentar la dosis apenas se confirma y controlar cada 4 semanas.",
      "Ecografía solo si hay nódulos palpables.",
    ],
    sources: [
      "Sociedad Argentina de Endocrinología y Metabolismo — Guías de hipotiroidismo.",
      "Federación Argentina de Sociedades de Endocrinología — Consenso de manejo de patología tiroidea.",
    ],
    pearls: [
      "TSH alta + T4 libre baja = hipotiroidismo primario clínico.",
      "Levotiroxina en ayunas, lejos del mate, el café, el calcio y el hierro.",
      "Mayores o cardiópatas: empezar bajo y subir despacio.",
    ],
    pitfalls: ["Atribuir todo a la menopausia o al estrés.", "Pedir centellograma.", "Controlar la TSH a la semana."],
  },
};
