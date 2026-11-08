import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const toxoplasmosisCerebralVih: ClinicalCase = {
  id: "vih-avanzado-toxoplasmosis-cerebral",
  level: 3,
  area: "Infectología",
  setting: "Guardia",
  patient: { age: 35, ageUnit: "años", sex: "M", context: "VIH desde hace 6 años, dejó el tratamiento hace 2. Vive con la pareja." },
  frequency: "frecuente",
  intro: "“Hace una semana tengo dolor de cabeza y fiebre. Hoy se me durmió la mano derecha y tuve una convulsión.”",
  vitals: { TA: "118/74 mmHg", FC: "98 lpm", FR: "18 rpm", "T°": "38,1 °C", "SatO₂": "97 %", Peso: "58 kg", Glasgow: "14/15" },
  anamnesis: [
    act("adherencia", "¿Cuándo dejaste el tratamiento? ¿CD4?", "clave", "“Hace 2 años; CD4 bajos.”", "Inmunosupresión."),
    act("neuro", "¿Debilidad, convulsiones, cefalea?", "clave", "“Las tres.”", "Focalidad."),
    act("profilaxis", "¿Tomás cotrimoxazol?", "clave", "“No.”", "Sin profilaxis."),
    act("tbc", "¿Tos o sudor, contacto con TBC?", "util", "“No.”", "Diferenciales."),
    act("consumo", "¿Consumo de sustancias o cuidado de gatos?", "util", "“Un gato.”", "Riesgo de exposición."),
    act("planes", "¿Qué planes tenés para las vacaciones?", "neutro", "“Ninguno.”", "No orienta."),
  ],
  exam: [
    act("foco", "Examen neurológico", "clave", "Hemiparesia derecha 4/5.", "Focalidad."),
    act("presion", "Fondo de ojo y rigidez", "clave", "Sin papiledema; sin rigidez.", "Punción si no hay riesgo."),
    act("boca", "Boca, peso y piel", "util", "Muguet.", "Inmunosupresión."),
  ],
  studies: [
    study("Imágenes", "rmn", "RM o TC con contraste", "clave", "Múltiples lesiones anulares en ganglios basales, con edema.", "Típico."),
    study("Laboratorio", "cd4", "CD4, carga viral, serología de Toxoplasma", "clave", "CD4 42; carga viral alta; IgG positiva.", "Compatible."),
    study("Laboratorio", "lab", "Hemograma, función renal y hepática, G6PD", "clave", "Normal.", "Antes de medicar."),
    study("Otros", "biopsia-rutina", "Biopsia cerebral de entrada", "riesgoso", "No se realizó.", "Se reserva a falta de respuesta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("toxo", "Toxoplasmosis cerebral en VIH avanzado", true, "CD4 de 42, focalidad, lesiones anulares y IgG positiva."),
      dx("linfoma", "Linfoma primario del SNC", false, "Suele ser único y periventricular."),
      dx("cripto", "Criptococosis", false, "No da lesiones anulares múltiples."),
      dx("tbc", "Tuberculoma", false, "Sin datos de TBC."),
      dx("lmp", "Leucoencefalopatía multifocal", false, "No realza ni da masa."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("tratamiento", "Pirimetamina, sulfadiazina y ácido folínico", "clave", "Primera línea. La respuesta clínica confirma."),
      mg("corticoide", "Dexametasona solo si hay efecto de masa", "clave", "Edema."),
      mg("tar", "Iniciar TAR en 2 semanas", "clave", "Reconstituir inmunidad."),
      mg("profilaxis", "Profilaxis secundaria y anticonvulsivantes", "clave", "Prevención."),
      mg("sin-tar", "Posponer indefinidamente el TAR", "riesgoso", "Mayor mortalidad."),
      mg("sin-estudio", "Antibióticos comunes sin estudio", "riesgoso", "Omite el tratamiento."),
    ],
  },
  debrief: {
    diagnosis: "Toxoplasmosis cerebral en VIH avanzado con CD4 de 42, por abandono del tratamiento, en varón de 35 años.",
    pathologies: [
      { name: "Toxoplasmosis cerebral", role: "principal", why: "Infección oportunista." },
      { name: "Sida y muguet", role: "asociada", why: "Inmunosupresión avanzada." },
      { name: "Linfoma, tuberculoma, LMP", role: "diferencial", why: "Otras lesiones." },
    ],
    reasoning: [
      "Causa: reactivación de T. gondii.",
      "Mecanismo: CD4 menores de 100 permiten la multiplicación de quistes.",
      "Consecuencia: encefalitis focal y efecto de masa.",
    ],
    epidemiology:
      "Es la causa más frecuente de lesión cerebral con efecto de masa en personas con VIH avanzado. La profilaxis con cotrimoxazol con CD4 menores de 100 y el TAR reducen la frecuencia. El abandono del tratamiento sigue siendo un problema importante en Argentina, donde los antirretrovirales se proveen gratuitamente.",
    management: [
      "Imagen con contraste.",
      "Tratamiento empírico.",
      "Evaluar respuesta a las 2 semanas.",
      "TAR y seguimiento.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guías de VIH y enfermedades oportunistas.", "NIH — Guidelines for Opportunistic Infections in HIV."],
    pearls: ["CD4 menor de 100 y lesiones múltiples.", "Prueba terapéutica.", "Profilaxis con cotrimoxazol."],
    pitfalls: ["Biopsiar de entrada.", "Demorar el TAR."],
    tribunal: [
      qa("¿Qué es el síndrome de reconstitución inmune?", "Empeoramiento inflamatorio al recuperar inmunidad tras iniciar el TAR."),
      qa("¿Qué profilaxis se dan según CD4?", "Cotrimoxazol con menos de 200 por Pneumocystis y menos de 100 por Toxoplasma."),
      qa("¿Cuál es la clave para distinguir linfoma primario?", "Lesión periventricular única, positiva para virus de Epstein-Barr en LCR, que no responde al tratamiento."),
    ],
  },
};
