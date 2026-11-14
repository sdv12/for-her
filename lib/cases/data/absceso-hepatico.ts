import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const abscesoHepatico: ClinicalCase = {
  id: "absceso-hepatico-piogeno",
  level: 3,
  area: "Cirugía",
  setting: "Guardia",
  patient: { age: 64, ageUnit: "años", sex: "M", context: "Diabético. Colecistectomía hace años. Hace un mes tuvo una colangitis tratada en otra ciudad." },
  frequency: "poco-frecuente",
  intro: "“Hace diez días tengo fiebre con escalofríos, dolor debajo de las costillas a la derecha y estoy muy cansado.”",
  vitals: { TA: "112/68 mmHg", FC: "108 lpm", FR: "20 rpm", "T°": "38,9 °C", "SatO₂": "96 %", Glucemia: "264 mg/dl" },
  anamnesis: [
    act("fiebre", "¿Cómo es la fiebre?", "clave", "“Diez días, con escalofríos.”", "Infección profunda."),
    act("biliar", "¿Problemas biliares recientes?", "clave", "“Una colangitis hace un mes.”", "Origen biliar."),
    act("viajes", "¿Viajó a zonas tropicales o tuvo diarrea con sangre?", "clave", "“No.” (serología de ameba negativa)", "Amebiano."),
    act("diabetes", "¿Cómo controla la diabetes?", "util", "“Mal.”", "Factor de riesgo."),
    act("tos", "¿Tos o dolor al respirar?", "util", "“Me duele al respirar hondo.”", "Irritación diafragmática."),
    act("trabajo", "¿Trabaja?", "neutro", "“Soy kiosquero.”", "No orienta."),
  ],
  exam: [
    act("higado", "Hígado", "clave", "Hepatomegalia dolorosa a la percusión.", "Absceso."),
    act("pulmon", "Base derecha", "clave", "Hipoventilación basal derecha.", "Derrame reactivo."),
    act("ictericia", "Ictericia", "util", "Ausente.", "Sin obstrucción actual."),
  ],
  studies: [
    study("Imágenes", "eco-tc", "Ecografía y TC de abdomen con contraste", "clave", "Colección de 7 cm en lóbulo derecho con realce periférico.", "Absceso hepático."),
    study("Microbiología", "hemocultivos", "Hemocultivos", "clave", "Klebsiella pneumoniae.", "Germen."),
    study("Laboratorio", "lab", "Hemograma, hepatograma, PCR", "util", "Leucocitos 20.000; FAL alta.", "Inflamación."),
    study("Otros", "solo-atb-oral", "Antibiótico oral ambulatorio sin drenar", "riesgoso", "No se indicó.", "Absceso grande sin control del foco."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("absceso-piogeno", "Absceso hepático piógeno por Klebsiella de origen biliar", true, "Fiebre prolongada, colangitis previa, colección con realce y hemocultivos positivos."),
      dx("amebiano", "Absceso hepático amebiano", false, "Sin viaje y serología negativa."),
      dx("hidatidico", "Quiste hidatídico infectado", false, "Sin vesículas hijas ni epidemiología."),
      dx("hepatocarcinoma", "Hepatocarcinoma necrosado", false, "Clínica infecciosa y bacteriemia."),
      dx("neumonia", "Neumonía basal", false, "La colección es hepática."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("drenaje", "Drenaje percutáneo guiado por imágenes", "clave", "Absceso mayor de 5 cm."),
      mg("atb", "Ceftriaxona más metronidazol EV y luego oral prolongado", "clave", "Cubre enterobacterias y anaerobios."),
      mg("glucemia", "Controlar la glucemia", "clave", "Factor."),
      mg("ojos", "Fondo de ojo por riesgo de endoftalmitis por Klebsiella", "util", "Complicación metastásica."),
      mg("solo-atb", "Solo antibiótico oral ambulatorio", "riesgoso", "Absceso grande sin drenaje."),
      mg("cirugia-abierta", "Cirugía abierta de entrada", "riesgoso", "El drenaje percutáneo suele alcanzar."),
    ],
  },
  debrief: {
    diagnosis: "Absceso hepático piógeno por Klebsiella pneumoniae de origen biliar, en varón diabético de 64 años.",
    pathologies: [
      { name: "Absceso hepático piógeno", role: "principal", why: "Colección infectada." },
      { name: "Diabetes y colangitis previa", role: "asociada", why: "Factores de riesgo." },
      { name: "Amebiano, hidatídico", role: "diferencial", why: "Otras lesiones quísticas." },
    ],
    reasoning: [
      "Causa: infección biliar ascendente.",
      "Mecanismo: bacterias que llegan al parénquima y forman una colección.",
      "Consecuencia: fiebre prolongada, bacteriemia y focos a distancia.",
    ],
    epidemiology:
      "La vía biliar es el origen más frecuente. Klebsiella es un germen creciente, sobre todo en diabéticos, y puede dar endoftalmitis. La fiebre prolongada sin foco obliga a mirar el hígado.",
    management: [
      "Imágenes.",
      "Hemocultivos y drenaje.",
      "Antibiótico prolongado.",
      "Glucemia.",
    ],
    sources: ["Sociedad Argentina de Infectología — Infecciones intraabdominales.", "IDSA/SIS — Management of Complicated Intra-abdominal Infection."],
    pearls: ["Fiebre prolongada: mirá el hígado.", "Klebsiella en diabéticos.", "Drenar si es grande."],
    pitfalls: ["Solo antibiótico.", "Olvidar la endoftalmitis."],
    tribunal: [
      qa("¿Cómo diferenciás absceso amebiano?", "Por epidemiología, serología positiva y respuesta a metronidazol; suele ser único en lóbulo derecho."),
      qa("¿Cuánto dura el tratamiento?", "Entre 4 y 6 semanas en total."),
      qa("¿Qué otras vías dan absceso hepático?", "Portal (apendicitis, diverticulitis), arterial y por contigüidad."),
    ],
  },
};
