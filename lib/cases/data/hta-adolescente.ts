import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const htaAdolescente: ClinicalCase = {
  id: "hta-adolescente",
  level: 2,
  area: "Cardiovascular",
  setting: "Consultorio",
  patient: { age: 15, ageUnit: "años", sex: "M", context: "Lo mandan del control escolar. Pasa muchas horas con la computadora. Toma gaseosa a diario." },
  frequency: "frecuente",
  intro: "La mamá: “En el colegio le dio la presión alta tres veces. ¿Cómo un chico va a ser hipertenso?”",
  vitals: { TA: "142/88 mmHg (promedio de 3 tomas)", FC: "82 lpm", Peso: "92 kg (IMC 32)" },
  anamnesis: [
    act("tomas", "¿Cuántas veces y cómo se la midieron?", "clave", "“Tres veces distintas en el colegio, con un tensiómetro de brazo.”", "Diagnóstico con tres mediciones en días distintos."),
    act("ronquido", "¿Ronca o se despierta cansado?", "clave", "“Ronca fuerte y se duerme en clase.”", "Apnea del sueño: causa y agravante."),
    act("secundaria", "¿Infecciones urinarias, orina oscura, palpitaciones, sudoración, calambres?", "clave", "“No.”", "Causas secundarias."),
    act("drogas", "¿Energizantes, suplementos, anabólicos, descongestivos?", "clave", "“Bebidas energizantes para jugar de noche.”", "Elevan la presión."),
    act("familia", "¿Hipertensión en la familia?", "util", "“El papá y el abuelo.”", "Hipertensión primaria."),
    act("juego", "¿A qué juega?", "neutro", "“Al Valorant.”", "No orienta."),
  ],
  exam: [
    act("pulsos", "Pulsos femorales y presión en piernas", "clave", "Pulsos femorales normales, presión en piernas mayor que en brazos.", "Descarta coartación."),
    act("acantosis", "Piel", "clave", "Acantosis nigricans en cuello, estrías claras.", "Insulinorresistencia."),
    act("fondo", "Fondo de ojo", "util", "Normal.", "Sin daño de órgano blanco."),
  ],
  studies: [
    study("Otros", "mapa", "MAPA de 24 horas", "clave", "Promedio diurno 138/86, sin descenso nocturno.", "Confirma y descarta efecto guardapolvo blanco."),
    study("Laboratorio", "lab", "Orina, creatinina, ionograma, glucemia, lípidos, TSH", "clave", "Glucemia 108, TG 210, HDL 34; resto normal.", "Síndrome metabólico."),
    study("Imágenes", "eco-cardio", "Ecocardiograma", "util", "Hipertrofia ventricular izquierda leve.", "Daño de órgano blanco."),
    study("Imágenes", "eco-renal-doppler", "Angiografía renal", "innecesario", "No se pidió.", "Perfil de HTA primaria por obesidad."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hta-primaria", "Hipertensión arterial estadio 1 en adolescente asociada a obesidad y síndrome metabólico, con HVI", true, "Tres mediciones y MAPA con presión de 130/80 o más, obesidad, acantosis, dislipemia, antecedente familiar y estudios de causa secundaria normales."),
      dx("coartacion", "Coartación de aorta", false, "Pulsos femorales normales."),
      dx("renal", "Hipertensión renovascular", false, "Sin soplo ni hipopotasemia, con perfil metabólico."),
      dx("guardapolvo", "Hipertensión de guardapolvo blanco", false, "El MAPA confirma."),
      dx("feocromo", "Feocromocitoma", false, "Sin crisis."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("estilo", "Cambios de estilo de vida: actividad física diaria, menos sal, sin gaseosas ni energizantes", "clave", "Primera línea."),
      mg("familia", "Abordaje familiar y nutricional", "clave", "Los cambios funcionan en familia."),
      mg("ieca", "Iniciar IECA por la hipertrofia ventricular", "clave", "Con daño de órgano blanco se medica."),
      mg("apnea", "Polisomnografía", "util", "Apnea del sueño."),
      mg("seguimiento", "Control cada 1–3 meses", "util", "Metas."),
      mg("restringir-deporte", "Prohibir el deporte", "riesgoso", "El ejercicio es tratamiento."),
      mg("betabloq", "Atenolol de primera elección", "innecesario", "No es de elección en adolescentes con obesidad."),
    ],
  },
  debrief: {
    diagnosis: "Hipertensión arterial estadio 1 con hipertrofia ventricular izquierda, obesidad y síndrome metabólico, en un adolescente de 15 años.",
    pathologies: [
      { name: "Hipertensión arterial primaria del adolescente", role: "principal", why: "Asociada a obesidad." },
      { name: "Síndrome metabólico, posible apnea del sueño", role: "asociada", why: "Comorbilidades." },
      { name: "Coartación, renovascular", role: "diferencial", why: "Causas secundarias." },
    ],
    reasoning: [
      "Causa: obesidad, sedentarismo, sal, energizantes y herencia.",
      "Mecanismo: hiperinsulinemia, activación simpática y retención de sodio.",
      "Consecuencia: daño de órgano blanco desde la adolescencia.",
    ],
    epidemiology:
      "La hipertensión afecta al 3–5 % de los niños y adolescentes, y a más del 20 % de los adolescentes con obesidad. En adolescentes la mayoría es primaria; en niños pequeños predominan las secundarias, sobre todo renales.",
    management: [
      "Medir la presión desde los 3 años en cada control.",
      "Confirmar con MAPA.",
      "Buscar causas secundarias y daño de órgano.",
      "Estilo de vida y fármacos si hace falta.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Consenso de hipertensión arterial en niños y adolescentes.", "AAP — Clinical Practice Guideline for High Blood Pressure in Children and Adolescents."],
    pearls: ["Desde los 13 años, mismos cortes que el adulto: 130/80.", "Pulsos femorales siempre.", "Obesidad: HTA primaria."],
    pitfalls: ["No creer que un chico sea hipertenso.", "Prohibir el deporte."],
    tribunal: [
      qa("¿Cómo se define hipertensión en adolescentes de 13 años o más?", "Presión de 130/80 mmHg o más en tres ocasiones, igual que en adultos."),
      qa("¿Cuándo se medica la hipertensión en pediatría?", "Con hipertensión sintomática, estadio 2, daño de órgano blanco, diabetes, enfermedad renal o falta de respuesta al estilo de vida."),
      qa("¿Por qué se palpan los pulsos femorales?", "Para descartar coartación de aorta, que da pulsos débiles o retrasados y presión menor en piernas."),
    ],
  },
};
