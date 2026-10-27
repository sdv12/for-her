import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hantavirus: ClinicalCase = {
  id: "sindrome-cardiopulmonar-hantavirus",
  level: 4,
  area: "Infectología",
  setting: "Guardia",
  patient: { age: 26, ageUnit: "años", sex: "M", context: "Orán, Salta. Trabaja en desmonte y cosecha. Diciembre." },
  frequency: "raro",
  intro: "“Hace cuatro días tengo fiebre alta, dolor de cuerpo y de panza, y vómitos. Pensé que era dengue. Desde hoy a la tarde me falta mucho el aire y toso seco.”",
  vitals: { TA: "92/58 mmHg", FC: "124 lpm", FR: "32 rpm", "T°": "38,7 °C", "SatO₂": "86 % (aire ambiente)" },
  anamnesis: [
    act("trabajo", "¿Qué tareas hizo en las últimas semanas? ¿Vio roedores?", "clave", "“Limpié un galpón cerrado lleno de bolsas y estuve en el monte; había muchos ratones y caca de ratón.”", "La inhalación de partículas de excretas de roedores silvestres (colilargos) en lugares cerrados o en tareas rurales es la vía principal de contagio."),
    act("prodromo", "¿Cómo empezó?", "clave", "“Fiebre alta, dolor de cuerpo, de cabeza y de espalda, y dolor de panza con vómitos.”", "El pródromo febril inespecífico de 3–6 días es indistinguible de otras virosis; luego viene la fase cardiopulmonar."),
    act("disnea", "¿Desde cuándo le falta el aire y cómo evolucionó?", "clave", "“Empezó hoy a la tarde y en pocas horas empeoró mucho.”", "La instalación brusca de disnea tras el pródromo marca la fase cardiopulmonar, que puede llevar al shock en horas."),
    act("contactos", "¿Alguien más de su trabajo o de su casa está enfermo?", "clave", "“Un compañero está con fiebre.”", "Puede haber casos con la misma exposición; en la cepa Andes del sur también hay transmisión entre personas."),
    act("dengue", "¿Hay dengue en su zona? ¿Tuvo manchas o sangrados?", "util", "“Hay dengue en el barrio. Manchas no.”", "Dengue y leptospirosis son los grandes diferenciales en el norte."),
    act("agua", "¿Estuvo en agua de inundación o barro?", "util", "“No.”", "Orientaría a leptospirosis."),
    act("viajes", "¿Viajó al sur del país?", "util", "“No, siempre estuve acá.”", "Define la cepa probable (Andes en la Patagonia, con transmisión interhumana; otras en el norte y el centro)."),
    act("enfermedades", "¿Tiene alguna enfermedad?", "util", "“No, soy sano.”", "Paciente joven previamente sano: perfil típico."),
    act("equipo", "¿De qué cuadro es?", "neutro", "“De Gimnasia y Tiro.”", "No orienta."),
  ],
  exam: [
    act("pulmonar", "Auscultación pulmonar", "clave", "Rales crepitantes bilaterales.", "Edema pulmonar no cardiogénico por fuga capilar."),
    act("perfusion", "Perfusión y estado hemodinámico", "clave", "Piel fría, relleno capilar de 4 segundos, pulsos débiles.", "Shock: la disfunción miocárdica y la fuga capilar explican la alta letalidad."),
    act("piel", "Piel: petequias, ictericia", "util", "Algunas petequias en tronco; sin ictericia.", "Las petequias acompañan la plaquetopenia; la ictericia marcada orientaría a leptospirosis."),
    act("conciencia", "Estado de conciencia", "util", "Lúcido, ansioso.", "La alteración de conciencia indica hipoperfusión grave."),
    act("abdomen", "Palpación abdominal", "util", "Dolor difuso leve, sin defensa.", "El dolor abdominal es frecuente en el pródromo."),
  ],
  studies: [
    study("Laboratorio", "hemograma", "Hemograma con frotis", "clave", "Hematocrito 54 % (hemoconcentración), plaquetas 62.000, leucocitos 18.000 con desviación a la izquierda e inmunoblastos (linfocitos atípicos) mayores del 10 %.", "La tríada hemoconcentración, plaquetopenia y leucocitosis con inmunoblastos es muy sugestiva de síndrome cardiopulmonar por hantavirus."),
    study("Imágenes", "rx", "Radiografía de tórax", "clave", "Infiltrado intersticial bilateral que progresa a alveolar, derrame pleural pequeño, silueta cardíaca normal.", "Edema pulmonar no cardiogénico."),
    study("Laboratorio", "serologia", "Serología (IgM) y PCR para hantavirus", "clave", "IgM positiva para hantavirus.", "Confirma el diagnóstico; las muestras se envían al laboratorio de referencia (ANLIS-Malbrán)."),
    study("Laboratorio", "lab", "Gases, lactato, LDH, hepatograma, función renal, coagulograma", "util", "pO₂ 52, lactato 4,1, LDH elevada, albúmina baja.", "Valoran la gravedad."),
    study("Laboratorio", "diferenciales", "NS1/IgM dengue y serología de leptospirosis", "util", "Negativos.", "Descartan los diferenciales de la región."),
    study("Imágenes", "tc", "Tomografía de tórax antes de estabilizarlo", "riesgoso", "No se realizó.", "Trasladar a un paciente en shock e hipoxémico a tomografía puede precipitar un paro; la radiografía en la cama alcanza."),
    study("Imágenes", "eco", "Ecocardiograma", "util", "Disfunción sistólica moderada del ventrículo izquierdo.", "La depresión miocárdica es la causa del shock."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hanta", "Síndrome cardiopulmonar por hantavirus con shock", true, "Exposición a roedores en tareas rurales, pródromo febril, disnea brusca con edema pulmonar no cardiogénico, hemoconcentración, plaquetopenia, inmunoblastos e IgM positiva."),
      dx("dengue", "Dengue grave", false, "Puede dar plaquetopenia, hemoconcentración y shock, pero no edema pulmonar precoz con inmunoblastos; NS1 e IgM negativas."),
      dx("lepto", "Leptospirosis con hemorragia pulmonar", false, "Requiere exposición a agua o barro, con ictericia e insuficiencia renal; serología negativa."),
      dx("nac", "Neumonía bacteriana con sepsis", false, "Consolidación lobar, sin hemoconcentración ni inmunoblastos."),
      dx("influenza", "Neumonía grave por influenza", false, "Puede dar insuficiencia respiratoria, pero no hemoconcentración con plaquetopenia e inmunoblastos."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("uti", "Ingreso inmediato a terapia intensiva (o derivación a un centro con terapia y, si es posible, ECMO)", "clave", "El deterioro es muy rápido; el soporte precoz es lo único que cambia el pronóstico."),
      mg("fluidos", "Reposición de líquidos cuidadosa y temprana indicación de inotrópicos o vasopresores", "clave", "La fuga capilar hace que el exceso de fluidos empeore el edema pulmonar; el shock es en gran parte cardiogénico."),
      mg("oxigeno", "Oxígeno y ventilación (no invasiva o mecánica) según la evolución", "clave", "Tratamiento de la insuficiencia respiratoria."),
      mg("notificar", "Notificación inmediata, búsqueda de casos entre los expuestos y medidas de bioseguridad", "clave", "Es un evento de notificación inmediata; en la cepa Andes se aíslan los contactos y se usa protección respiratoria."),
      mg("hidratar", "Hidratación agresiva con cristaloides para revertir el shock", "riesgoso", "Agrava el edema pulmonar y la insuficiencia respiratoria."),
      mg("ribavirina", "Ribavirina endovenosa como tratamiento específico", "innecesario", "No demostró beneficio en el síndrome cardiopulmonar; no hay antiviral específico."),
    ],
  },
  debrief: {
    diagnosis: "Síndrome cardiopulmonar por hantavirus con shock e insuficiencia respiratoria, en varón de 26 años con exposición laboral a roedores en el norte de Salta.",
    pathologies: [
      { name: "Síndrome cardiopulmonar por hantavirus", role: "principal", why: "Infección por hantavirus transmitida por roedores silvestres." },
      { name: "Shock cardiogénico y distributivo", role: "asociada", why: "Depresión miocárdica y fuga capilar." },
      { name: "Dengue grave y leptospirosis", role: "diferencial", why: "Síndromes febriles graves de la misma región." },
      { name: "Neumonía grave", role: "diferencial", why: "Insuficiencia respiratoria febril." },
    ],
    reasoning: [
      "Causa: hantavirus eliminados en la orina, saliva y heces de roedores silvestres (colilargos); el humano se contagia al inhalar partículas en lugares cerrados o en tareas rurales.",
      "Mecanismo: el virus infecta el endotelio de los capilares pulmonares; la respuesta inmune (citoquinas, linfocitos T) aumenta la permeabilidad capilar y deprime el miocardio.",
      "Consecuencia: tras un pródromo febril, edema pulmonar no cardiogénico de instalación brusca, hipoxemia, hemoconcentración y shock, que puede matar en horas.",
      "Por eso la sospecha en el pródromo, en zonas endémicas y con exposición, y la derivación precoz a terapia intensiva son lo que salva vidas.",
    ],
    epidemiology:
      "En la Argentina hay cuatro zonas endémicas: noroeste (Salta, Jujuy), noreste (Misiones), centro (Buenos Aires, Santa Fe, Entre Ríos) y sur (Patagonia andina, cepa Andes, con transmisión entre personas, como en el brote de Epuyén de 2018–2019). Se notifican alrededor de 60 a 100 casos por año, con letalidad del 20–40 %. Afecta sobre todo a varones jóvenes con trabajos rurales, de octubre a abril.",
    management: [
      "Sospechar ante síndrome febril inespecífico con exposición a roedores en zona endémica, sobre todo con plaquetopenia, hemoconcentración e inmunoblastos.",
      "Derivar en forma precoz a un centro con terapia intensiva.",
      "Soporte: oxígeno y ventilación, fluidos cautelosos, inotrópicos y vasopresores; ECMO en casos refractarios.",
      "Confirmación por serología y PCR en el laboratorio de referencia.",
      "Notificación inmediata, búsqueda de expuestos y prevención (ventilar antes de limpiar lugares cerrados, humedecer con lavandina, no barrer en seco, control de roedores).",
    ],
    sources: [
      "Ministerio de Salud de la Nación — Guía para el equipo de salud: hantavirosis.",
      "ANLIS-Malbrán — Instituto Nacional de Enfermedades Virales Humanas (laboratorio de referencia).",
    ],
    pearls: ["Fiebre + plaquetopenia + hemoconcentración + inmunoblastos + disnea = hantavirus.", "Fluidos con cautela: el problema es la fuga capilar.", "Limpiar lugares cerrados: ventilar, humedecer, nunca barrer en seco."],
    pitfalls: ["Diagnosticarlo como dengue y darle el alta en el pródromo.", "Hidratar agresivamente.", "No derivar a tiempo."],
    tribunal: [
      qa("¿Cómo se transmite el hantavirus?", "Por inhalación de aerosoles de orina, saliva o heces de roedores silvestres infectados, sobre todo en lugares cerrados o en tareas rurales; también por mordeduras de roedores. La cepa Andes, del sur, se transmite además entre personas."),
      qa("¿Qué hallazgos de laboratorio sugieren hantavirus?", "Plaquetopenia, hemoconcentración (hematocrito alto), leucocitosis con desviación a la izquierda e inmunoblastos (linfocitos atípicos) mayores del 10 %, LDH elevada e hipoalbuminemia."),
      qa("¿Cuáles son las fases del síndrome cardiopulmonar?", "Pródromo febril (3–6 días: fiebre, mialgias, cefalea, síntomas digestivos), fase cardiopulmonar (edema pulmonar no cardiogénico y shock en horas) y convalecencia (poliuria y recuperación) en quienes sobreviven."),
      qa("¿Cómo se previene?", "Ventilar los lugares cerrados antes de entrar, humedecer superficies con lavandina antes de limpiar, no barrer en seco, guardar alimentos en recipientes cerrados, desmalezar alrededor de la casa y usar protección respiratoria en tareas de riesgo."),
    ],
  },
};
