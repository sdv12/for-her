import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const triquinosis: ClinicalCase = {
  id: "triquinosis",
  level: 2,
  area: "Infectología",
  setting: "Guardia",
  patient: { age: 45, ageUnit: "años", sex: "M", context: "Vive en una zona rural de la provincia de Buenos Aires. Faenó un cerdo hace tres semanas y preparó chorizos caseros." },
  frequency: "poco-frecuente",
  intro: "“Hace una semana tengo fiebre, me duelen todos los músculos, sobre todo las pantorrillas y al masticar, y tengo los ojos hinchados.”",
  vitals: { TA: "126/78 mmHg", FC: "104 lpm", FR: "18 rpm", "T°": "38,7 °C" },
  anamnesis: [
    act("carne", "¿Comiste carne de cerdo o de caza casera, embutidos sin control veterinario?", "clave", "“Chorizos y salame del chancho que carneamos. No lo llevamos a analizar.”", "Consumo de carne de cerdo sin control: fuente clásica de Trichinella."),
    act("otros", "¿Alguien más que comió está enfermo?", "clave", "“Mi hermano y su mujer tienen lo mismo.”", "Brote: casos agrupados por una fuente común."),
    act("inicio", "¿Cómo empezó?", "clave", "“Primero diarrea y dolor de panza, a los días la fiebre y los dolores.”", "Fase intestinal seguida de fase muscular (invasión)."),
    act("disnea", "¿Te falta el aire, palpitaciones o dolor de pecho?", "clave", "“No.”", "Descarta miocarditis, la complicación más grave."),
    act("vision", "¿Ves bien? ¿Te duele de cabeza?", "util", "“Bien, algo de cabeza.”", "Descarta compromiso neurológico."),
    act("tiempo", "¿Cuándo los comiste?", "util", "“Hace tres semanas.”", "Incubación de 1 a 4 semanas."),
    act("perro", "¿Tenés perro?", "neutro", "“Dos.”", "No orienta."),
  ],
  exam: [
    act("parpados", "Cara y párpados", "clave", "Edema bipalpebral bilateral, hemorragias subconjuntivales.", "Edema palpebral: muy característico."),
    act("musculos", "Palpación muscular", "clave", "Dolor a la palpación de gemelos, maseteros y músculos del cuello.", "Miositis por las larvas."),
    act("unas", "Uñas", "util", "Hemorragias en astilla subungueales.", "Hallazgo descripto en la triquinosis."),
    act("corazon", "Auscultación cardíaca", "util", "Taquicardia regular, sin soplos.", "Sin signos de miocarditis."),
  ],
  studies: [
    study("Laboratorio", "hemograma", "Hemograma", "clave", "Leucocitos 14.000, eosinófilos 28 %.", "Eosinofilia marcada: dato orientador clave."),
    study("Laboratorio", "cpk", "CPK y LDH", "clave", "CPK 2100 UI/l.", "Confirma el daño muscular."),
    study("Laboratorio", "serologia", "Serología para Trichinella (ELISA, Western blot)", "clave", "Positiva.", "Confirma; puede negativizarse al principio y debe repetirse."),
    study("Electrofisiología", "ecg", "Electrocardiograma y troponina", "util", "ECG normal, troponina normal.", "Descarta miocarditis."),
    study("Otros", "biopsia", "Biopsia muscular de rutina", "innecesario", "No se realizó.", "Se reserva para casos dudosos."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("triquinosis", "Triquinosis (brote familiar por consumo de cerdo sin control)", true, "Fiebre, mialgias, edema palpebral, eosinofilia marcada, CPK alta y serología positiva, con casos agrupados tras comer chorizos caseros."),
      dx("gripe", "Influenza", false, "No explica el edema palpebral, la eosinofilia ni la CPK."),
      dx("leptospirosis", "Leptospirosis", false, "Daría ictericia, insuficiencia renal y no eosinofilia."),
      dx("dermatomiositis", "Dermatomiositis", false, "No hay lesiones cutáneas típicas y hay brote con fuente común."),
      dx("hidatidosis", "Hidatidosis", false, "Da quistes, no un cuadro agudo con miositis."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("albendazol", "Albendazol por 10–14 días", "clave", "Actúa sobre los adultos intestinales y las larvas; más eficaz cuanto antes."),
      mg("corticoides", "Corticoides (prednisona) en los casos moderados a graves, junto con el antiparasitario", "clave", "Disminuyen la reacción inflamatoria a las larvas."),
      mg("notificar", "Notificación inmediata y búsqueda de otros expuestos; decomiso de los productos", "clave", "Es un evento de notificación obligatoria: se cortan nuevos casos."),
      mg("expuestos", "Albendazol a los expuestos asintomáticos dentro de la primera semana", "util", "Puede evitar la invasión muscular."),
      mg("congelar", "Indicar que congelen los chorizos que quedan y los coman", "riesgoso", "La congelación hogareña no garantiza matar las larvas; se decomisa."),
      mg("antibiotico", "Antibióticos de amplio espectro", "innecesario", "Es una parasitosis."),
    ],
  },
  debrief: {
    diagnosis: "Triquinosis en fase muscular, sin miocarditis, en varón de 45 años, como parte de un brote familiar por consumo de embutidos caseros de cerdo sin control veterinario.",
    pathologies: [
      { name: "Triquinosis", role: "principal", why: "Infección por larvas de Trichinella spiralis." },
      { name: "Miocarditis y encefalitis", role: "diferencial", why: "Complicaciones graves a descartar." },
      { name: "Influenza, leptospirosis, dermatomiositis", role: "diferencial", why: "Otras causas de fiebre y mialgias." },
    ],
    reasoning: [
      "Causa: consumo de carne cruda o mal cocida con quistes de Trichinella (cerdo, jabalí, puma).",
      "Mecanismo: las larvas se liberan en el intestino, maduran a adultos que producen nuevas larvas, que viajan por la sangre y se enquistan en el músculo estriado.",
      "Consecuencia: fase intestinal (diarrea), luego fiebre, mialgias, edema palpebral y eosinofilia; complicaciones cardíacas y neurológicas.",
    ],
    epidemiology:
      "Argentina tiene brotes de triquinosis todos los años, sobre todo en invierno, en Buenos Aires, Córdoba, Santa Fe y La Pampa, asociados a la faena casera de cerdos y a la elaboración de chacinados sin análisis. Afecta a cualquier edad y sexo que consuma los productos.",
    management: [
      "Sospecharla ante fiebre, mialgias, edema palpebral y eosinofilia, sobre todo con casos agrupados.",
      "Confirmar con serología; evaluar miocarditis y compromiso neurológico.",
      "Albendazol y corticoides según gravedad.",
      "Notificación, investigación del brote y decomiso; prevención con análisis de la carne (digestión artificial) y cocción completa.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía para el equipo de salud: triquinosis.", "SENASA — Prevención de la triquinosis."],
    pearls: ["Fiebre + mialgias + edema palpebral + eosinofilia = triquinosis.", "Brote con fuente común.", "Notificar y decomisar."],
    pitfalls: ["Diagnosticar gripe.", "No buscar otros casos."],
    tribunal: [
      qa("¿Cómo se previene la triquinosis?", "Comprando carne de cerdo y chacinados con control sanitario, analizando por digestión artificial los cerdos faenados en casa, cocinando la carne hasta que no quede rosada (más de 71 °C) y sabiendo que el ahumado, el salado y la congelación casera no son seguros."),
      qa("¿Qué causas de eosinofilia hay que conocer?", "Parasitosis con fase tisular (triquinosis, toxocariasis, estrongiloidiasis, uncinarias), alergias y asma, fármacos (DRESS), enfermedades hematológicas, insuficiencia suprarrenal y vasculitis (Churg-Strauss)."),
      qa("¿Cuál es la complicación más grave de la triquinosis?", "La miocarditis, que puede dar arritmias e insuficiencia cardíaca y es la principal causa de muerte; también puede haber encefalitis y complicaciones tromboembólicas."),
    ],
  },
};
