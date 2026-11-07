import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const criptococosisMeningea: ClinicalCase = {
  id: "criptococosis-meningea-vih",
  level: 4,
  area: "Infectología",
  setting: "Guardia",
  patient: { age: 25, ageUnit: "años", sex: "M", context: "VIH diagnosticado hace un año, abandonó el tratamiento. Vive con palomas en el patio." },
  frequency: "poco-frecuente",
  intro: "“Hace dos semanas me duele la cabeza cada vez más, tengo fiebre, vomito, veo doble. No me dolía tanto antes.”",
  vitals: { TA: "122/74 mmHg", FC: "92 lpm", FR: "18 rpm", "T°": "38,2 °C", "SatO₂": "97 %", Glasgow: "14/15" },
  anamnesis: [
    act("tarv", "¿Tomás el tratamiento del VIH? ¿Último CD4?", "clave", "“Lo dejé hace 8 meses; CD4 de 90.”", "CD4 bajo: riesgo de oportunistas."),
    act("cefalea", "¿Cómo evolucionó el dolor?", "clave", "“Dos semanas, peor de a poco.”", "Curso subagudo típico."),
    act("focos", "¿Convulsiones, debilidad, confusión?", "clave", "“Solo veo doble.”", "Sexto par por hipertensión endocraneal."),
    act("palomas", "¿Exposición a aves o tierra?", "util", "“Palomas.”", "Fuente ambiental."),
    act("respiratorio", "¿Tos o falta de aire?", "util", "“No.”", "Puede tener foco pulmonar."),
    act("trabajo", "¿De qué trabajás?", "neutro", "“En un taller.”", "No orienta."),
  ],
  exam: [
    act("meninges", "Rigidez de nuca y fondo de ojo", "clave", "Rigidez leve, edema de papila.", "Hipertensión endocraneal."),
    act("pares", "Pares craneales", "clave", "Paresia del sexto par izquierdo.", "Falso signo localizador."),
    act("piel", "Piel y boca", "util", "Muguet oral y pápulas umbilicadas en la cara.", "Inmunodepresión y criptococosis cutánea."),
  ],
  studies: [
    study("Imágenes", "tac", "TC de encéfalo antes de la punción", "clave", "Sin masa ni desplazamiento.", "Por foco e inmunodepresión."),
    study("Otros", "lcr", "Punción lumbar con presión de apertura, tinta china y antígeno de Cryptococcus", "clave", "Presión 38 cmH₂O, glucosa baja, 25 células, antígeno 1/2048, tinta china positiva.", "Diagnóstico y gran presión."),
    study("Laboratorio", "antigeno", "Antígeno en sangre, CD4, carga viral", "clave", "CD4 42.", "Evalúa inmunidad."),
    study("Otros", "esperar-lcr", "Omitir la punción por tener fiebre", "riesgoso", "No se realizó.", "Sin LCR no hay diagnóstico ni alivio de presión."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("cripto", "Meningitis criptocócica con hipertensión endocraneal en VIH avanzado", true, "CD4 bajos, cefalea subaguda, presión alta, y antígeno y tinta china positivos."),
      dx("toxo", "Toxoplasmosis cerebral", false, "Daría lesiones con realce en anillo y foco."),
      dx("tbc", "Meningitis tuberculosa", false, "Podría parecerse, pero la tinta china y el antígeno confirman."),
      dx("linfoma", "Linfoma primario de SNC", false, "La imagen no muestra masas."),
      dx("bacteriana", "Meningitis bacteriana", false, "Es aguda, con muchos PMN."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("anfotericina", "Anfotericina B liposomal con flucitosina o fluconazol en inducción", "clave", "Tratamiento de elección."),
      mg("punciones", "Punciones lumbares evacuadoras seriadas por la presión", "clave", "Reducen la mortalidad."),
      mg("fluco", "Luego fluconazol de consolidación y mantenimiento", "clave", "Previene recaídas."),
      mg("tarv-tardio", "Diferir el TARV 4 a 6 semanas", "clave", "Iniciarlo antes aumenta mortalidad por reconstitución inmune."),
      mg("corticoide", "Dexametasona para bajar la presión", "riesgoso", "Aumenta la mortalidad en criptococosis."),
      mg("manitol", "Solo manitol y acetazolamida en vez de punciones", "riesgoso", "No son eficaces."),
    ],
  },
  debrief: {
    diagnosis: "Meningitis criptocócica con hipertensión endocraneal, en varón de 25 años con VIH avanzado (CD4 42) que abandonó el tratamiento.",
    pathologies: [
      { name: "Meningitis criptocócica", role: "principal", why: "Infección oportunista." },
      { name: "VIH avanzado", role: "asociada", why: "CD4 muy bajos." },
      { name: "Toxoplasmosis, TBC, linfoma", role: "diferencial", why: "Otras causas en VIH." },
    ],
    reasoning: [
      "Causa: inhalación de Cryptococcus neoformans en persona con CD4 menor de 100.",
      "Mecanismo: diseminación a meninges; la cápsula obstruye la reabsorción del LCR.",
      "Consecuencia: hipertensión endocraneal, pares craneales, ceguera y muerte.",
    ],
    epidemiology:
      "Es una causa importante de mortalidad en personas con VIH avanzado en todo el mundo. Sigue viéndose en Argentina por diagnóstico tardío y abandono del tratamiento. Medir antígeno en personas con CD4 menor de 100 permite tratar antes de la meningitis.",
    management: [
      "TC si hay foco; LCR con presión.",
      "Inducción, consolidación y mantenimiento.",
      "Punciones evacuadoras.",
      "Iniciar TARV a las semanas.",
    ],
    sources: ["Sociedad Argentina de Infectología — Consenso de infecciones oportunistas.", "OMS — Guía de meningitis criptocócica."],
    pearls: ["Cefalea subaguda y CD4 bajo: antígeno.", "Medir presión y bajarla.", "No apurar el TARV."],
    pitfalls: ["Dar corticoides.", "No medir presión de apertura."],
    tribunal: [
      qa("¿Qué oportunistas aparecen según CD4?", "Menos de 200: Pneumocystis. Menos de 100: toxoplasmosis y Cryptococcus. Menos de 50: CMV y MAC."),
      qa("¿Qué es la reconstitución inmune?", "Un empeoramiento inflamatorio por recuperar inmunidad al iniciar TARV; en meninges puede ser mortal."),
      qa("¿Cómo se ve Toxoplasma en imagen?", "Lesiones múltiples con realce en anillo, en ganglios basales; se trata de manera empírica."),
    ],
  },
};
