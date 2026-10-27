import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const quemadura: ClinicalCase = {
  id: "quemadura-escaldadura-nina",
  level: 2,
  area: "Cirugía",
  setting: "Guardia",
  patient: { age: 2, ageUnit: "años", sex: "F", context: "Junio. La trae la mamá, que lloraba en la sala de espera." },
  frequency: "frecuente",
  intro: "“Estaba preparando el mate, la nena tironeó del cable del termo eléctrico y se le cayó el agua hirviendo encima. Fue hace 40 minutos.”",
  vitals: { FC: "148 lpm", FR: "32 rpm", "T°": "36,4 °C", "SatO₂": "98 %", Peso: "12 kg" },
  anamnesis: [
    act("mecanismo", "¿Qué líquido era y cómo cayó?", "clave", "“Agua hirviendo, le cayó de arriba: el pecho, la panza y el brazo derecho.”", "La escaldadura por derrame da un patrón irregular, con salpicaduras, coherente con el relato."),
    act("tiempo", "¿Hace cuánto fue? ¿Qué le hicieron?", "clave", "“Hace 40 minutos. Le puse pasta de dientes y la traje.”", "El tiempo define la reposición de líquidos (se cuenta desde la quemadura). Las pastas y remedios caseros ensucian la herida y dificultan la evaluación."),
    act("ropa", "¿Le sacaron la ropa?", "util", "“No, tiene la remera puesta.”", "La ropa mojada con agua caliente sigue quemando: se retira (si no está adherida)."),
    act("vacunas", "¿Tiene las vacunas al día?", "util", "“Sí.”", "Define la profilaxis antitetánica."),
    act("cuidado", "¿Quién estaba con ella? ¿Tuvo otros accidentes?", "clave", "“Yo estaba en la cocina. Nunca le pasó nada así.”", "Toda quemadura en un niño pequeño se evalúa también desde la perspectiva de protección: relato, patrón y antecedentes."),
    act("orina", "¿Hizo pis desde entonces?", "util", "“Sí, en el pañal.”", "La diuresis es el mejor indicador de una reposición adecuada."),
    act("enfermedades", "¿Tiene alguna enfermedad?", "util", "“No.”", "Las comorbilidades cambian la gravedad."),
    act("dibujos", "¿Qué dibujitos mira?", "neutro", "“Bluey.”", "No orienta."),
  ],
  exam: [
    act("extension", "Extensión con la palma de la mano de la niña (1 %) y tabla de Lund-Browder", "clave", "Tórax anterior y abdomen superior 8 %, brazo derecho 4 %: alrededor del 12 % de superficie corporal.", "En niños la regla de los nueve no sirve (la cabeza es proporcionalmente mayor): se usa Lund-Browder o la palma (1 %)."),
    act("profundidad", "Profundidad: color, ampollas, dolor, relleno capilar", "clave", "Tórax: ampollas, lecho rosado húmedo, muy doloroso, blanquea a la presión. Brazo: zonas blanco rosadas, menos dolorosas, relleno lento.", "Tórax: espesor parcial superficial (tipo A de Benaim / AB-A). Brazo: espesor parcial profundo (AB-B), que puede requerir injerto."),
    act("circunferenciales", "Buscar quemaduras circunferenciales y zonas especiales", "clave", "No son circunferenciales; respeta cara, cuello, manos, genitales y pliegues.", "Las quemaduras circunferenciales pueden comprometer la circulación o la respiración (escarotomía); cara, manos, pies, genitales y periné son zonas especiales."),
    act("via", "Vía aérea y respiración", "util", "Sin quemaduras en la cara ni en la boca, sin estridor.", "Lesión inhalatoria: urgencia de vía aérea."),
    act("patron", "Patrón de la lesión (bordes, salpicaduras)", "util", "Bordes irregulares, salpicaduras, quemadura más intensa arriba: compatible con derrame.", "Las escaldaduras por inmersión (guante o media, bordes netos, respetando pliegues) sugieren lesión intencional."),
  ],
  studies: [
    study("Laboratorio", "lab", "Hemograma, ionograma, glucemia y función renal", "util", "Hematocrito 38 %, ionograma normal.", "Basal en quemaduras extensas para guiar la reposición."),
    study("Laboratorio", "diuresis", "Control de diuresis horaria", "clave", "1,2 ml/kg/h.", "La meta en niños es 1 ml/kg/h: guía el ritmo de los líquidos."),
    study("Imágenes", "rx", "Radiografía de tórax", "innecesario", "No se realizó.", "Sin sospecha de lesión inhalatoria ni otro traumatismo, no aporta."),
    study("Microbiología", "cultivo", "Hisopado de la quemadura al ingreso", "innecesario", "No se realizó.", "No sirve en una quemadura reciente sin infección."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("quemadura", "Quemadura por escaldadura de espesor parcial (superficial y profunda) del 12 % en niña de 2 años: moderada a grave, criterio de derivación", true, "Escaldadura accidental con patrón de derrame, 12 % de superficie con zonas profundas, en una niña pequeña."),
      dx("leve", "Quemadura leve para manejo ambulatorio", false, "En niños, más del 10 % de superficie o quemaduras profundas no son leves: requieren internación y reposición."),
      dx("maltrato", "Quemadura intencional (maltrato)", false, "El patrón irregular con salpicaduras coincide con el relato; las intencionales suelen ser por inmersión con bordes netos o por cigarrillo."),
      dx("superficial", "Quemadura solo superficial (eritema)", false, "Hay ampollas y zonas profundas: no es de primer grado."),
      dx("inhalatoria", "Lesión inhalatoria", false, "No hubo humo ni lugar cerrado, sin estridor ni quemaduras faciales."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("enfriar", "Retirar la ropa, enfriar con agua corriente a temperatura ambiente (no hielo) y cubrir con apósito limpio", "clave", "El enfriamiento en las primeras horas reduce la profundidad; el hielo causa vasoconstricción y más daño, además de hipotermia."),
      mg("fluidos", "Hidratación endovenosa (fórmula de Parkland: 3–4 ml/kg/% de superficie, la mitad en las primeras 8 h desde la quemadura) más mantenimiento con dextrosa", "clave", "En niños con más del 10 % de superficie hay riesgo de shock por pérdida de plasma. Los niños necesitan además líquidos de mantenimiento con glucosa."),
      mg("analgesia", "Analgesia adecuada (opioides) antes de las curaciones", "clave", "El dolor de las quemaduras de espesor parcial es intenso."),
      mg("derivar", "Derivar a un centro de quemados pediátrico", "clave", "Criterios de derivación: más del 10 % de superficie en niños, quemaduras profundas, zonas especiales o lesión inhalatoria."),
      mg("antitetanica", "Verificar la antitetánica", "util", "Las quemaduras son heridas tetanígenas."),
      mg("hielo", "Aplicar hielo o agua helada", "riesgoso", "Aumenta la lesión por vasoconstricción y causa hipotermia, sobre todo en niños."),
      mg("atb", "Antibiótico sistémico profiláctico", "innecesario", "No previene la infección y selecciona resistencias; se usan curaciones con tópicos."),
    ],
  },
  debrief: {
    diagnosis: "Quemadura por escaldadura accidental del 12 % de superficie corporal, de espesor parcial superficial (tórax) y profundo (brazo derecho), en niña de 2 años: criterio de internación y derivación.",
    pathologies: [
      { name: "Quemadura por escaldadura de espesor parcial", role: "principal", why: "Agua caliente sobre tórax y brazo." },
      { name: "Riesgo de shock por quemadura", role: "asociada", why: "Más del 10 % en un niño." },
      { name: "Maltrato infantil", role: "diferencial", why: "Siempre se evalúa en quemaduras de niños pequeños." },
      { name: "Lesión inhalatoria", role: "diferencial", why: "Cambia la urgencia de la vía aérea." },
    ],
    reasoning: [
      "Causa: escaldadura con agua hirviendo (la causa más frecuente de quemaduras en niños pequeños, en la cocina, con el mate o la pava).",
      "Mecanismo: el calor desnaturaliza las proteínas y destruye la piel según la temperatura y el tiempo de contacto; alrededor queda una zona de estasis que puede profundizarse si no se enfría ni se repone volumen.",
      "Consecuencia: aumento de la permeabilidad capilar con pérdida de plasma (edema, hemoconcentración, shock) proporcional a la superficie quemada; pérdida de la barrera (infección, hipotermia) y dolor intenso.",
      "Por eso la extensión y la profundidad definen la reposición, la derivación y el pronóstico estético y funcional.",
    ],
    epidemiology:
      "Las quemaduras son una de las principales causas de lesión no intencional en la infancia en la Argentina. Los menores de 5 años son los más afectados, con predominio en varones, y la escaldadura con líquidos calientes (mate, pava, termo, ollas) es el mecanismo más frecuente, sobre todo en invierno. La mayoría ocurre en la cocina y es prevenible.",
    management: [
      "Detener la quemadura: retirar ropa, enfriar con agua corriente, cubrir.",
      "Evaluar vía aérea, extensión (Lund-Browder o palma) y profundidad (Benaim o espesor).",
      "Reposición con Parkland en quemaduras extensas (más del 10 % en niños, 15–20 % en adultos), guiada por la diuresis.",
      "Analgesia, antitetánica, curaciones; derivar a centro de quemados según criterios.",
      "Evaluar la protección del niño y dar consejos de prevención (mate y pavas fuera del alcance, cables, mangos hacia adentro).",
    ],
    sources: [
      "Asociación Argentina de Quemaduras — Guía de atención inicial del paciente quemado.",
      "Sociedad Argentina de Pediatría — Recomendaciones para la prevención y el tratamiento de quemaduras en la infancia.",
    ],
    pearls: ["Palma del paciente = 1 % de superficie.", "Agua corriente sí, hielo no.", "En niños, más del 10 % = líquidos endovenosos y derivación."],
    pitfalls: ["Usar la regla de los nueve en un niño pequeño.", "Poner hielo o remedios caseros.", "No evaluar el patrón de la lesión."],
    tribunal: [
      qa("¿Cómo se clasifican las quemaduras según la profundidad?", "Superficial o de primer grado (eritema, dolor, sin ampollas; Benaim A); espesor parcial superficial (ampollas, lecho rosado húmedo, muy doloroso; AB-A); espesor parcial profundo (blanco rosado, menos dolor, relleno lento; AB-B); espesor total o tercer grado (blanco o carbonizado, acartonado, indoloro; B). Las profundas requieren injerto."),
      qa("¿Qué es la clasificación de Benaim y el índice de gravedad?", "Benaim, médico argentino, clasificó la profundidad en A, AB y B, y propuso un índice que combina extensión y profundidad para estimar la gravedad y el pronóstico."),
      qa("¿Cuál es la fórmula de Parkland?", "Entre 2 y 4 ml/kg por cada % de superficie quemada (de espesor parcial o total) de Ringer lactato en 24 h, la mitad en las primeras 8 h desde la quemadura y la otra mitad en las 16 siguientes; se ajusta según la diuresis."),
      qa("¿Cuándo sospechás lesión inhalatoria?", "Incendio en lugar cerrado, quemaduras faciales, vibrisas chamuscadas, esputo carbonáceo, disfonía, estridor o alteración de la conciencia; también intoxicación por monóxido o cianuro."),
    ],
  },
};
