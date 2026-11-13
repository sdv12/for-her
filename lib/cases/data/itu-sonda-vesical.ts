import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const ituSondaVesical: ClinicalCase = {
  id: "infeccion-urinaria-sonda-vesical",
  level: 2,
  area: "Nefrourología",
  setting: "Domicilio",
  patient: { age: 79, ageUnit: "años", sex: "M", context: "Secuela de ACV, postrado. Sonda vesical permanente hace 6 meses, cambiada hace 2 meses." },
  frequency: "muy-frecuente",
  intro: "La esposa, en la visita domiciliaria: “Desde ayer tiene fiebre y escalofríos, y el pis está turbio y con olor fuerte.”",
  vitals: { TA: "116/70 mmHg", FC: "104 lpm", FR: "20 rpm", "T°": "38,7 °C", "SatO₂": "95 %" },
  anamnesis: [
    act("sonda", "¿Cuándo se cambió la sonda?", "clave", "“Hace dos meses.”", "Biofilm."),
    act("sintomas", "¿Escalofríos, cambios de conducta, dolor?", "clave", "“Escalofríos y está más dormido.”", "Infección sistémica."),
    act("otros-focos", "¿Tos, escaras, diarrea?", "clave", "“No.”", "Descartar otros focos."),
    act("atb-previo", "¿Recibió antibióticos hace poco?", "util", "“Ciprofloxacina hace un mes.”", "Resistencia."),
    act("diuresis", "¿Drena bien?", "util", "“Menos que antes.”", "Obstrucción de la sonda."),
    act("esposa", "¿Quién lo cuida?", "neutro", "“Yo, con una cuidadora.”", "No orienta."),
  ],
  exam: [
    act("sonda-ex", "Sonda y bolsa", "clave", "Orina turbia, sonda con sedimento.", "Foco urinario."),
    act("piel", "Piel y escaras", "clave", "Sin escaras.", "Excluye foco cutáneo."),
    act("abdomen", "Abdomen y puñopercusión", "util", "Puñopercusión derecha dolorosa.", "Pielonefritis."),
  ],
  studies: [
    study("Microbiología", "urocultivo", "Urocultivo de la sonda nueva luego de recambiarla", "clave", "Klebsiella pneumoniae resistente a quinolonas.", "Germen y sensibilidad."),
    study("Microbiología", "hemocultivos", "Hemocultivos", "clave", "Positivo para el mismo germen.", "Bacteriemia."),
    study("Laboratorio", "lab", "Hemograma, creatinina, PCR", "util", "Leucocitos 16.000; creatinina 1,4.", "Gravedad."),
    study("Microbiología", "cultivo-rutina", "Urocultivos periódicos sin síntomas", "innecesario", "No se realizan.", "Siempre hay bacteriuria con sonda."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("itu-sonda", "Infección urinaria asociada a sonda con pielonefritis y bacteriemia", true, "Fiebre y escalofríos sin otro foco, sonda permanente, urocultivo y hemocultivo concordantes."),
      dx("bacteriuria", "Bacteriuria asintomática", false, "Tiene fiebre y bacteriemia."),
      dx("neumonia", "Neumonía aspirativa", false, "Sin síntomas respiratorios."),
      dx("prostatitis", "Prostatitis aguda", false, "Se valoró y el foco es renal."),
      dx("escara", "Escara infectada", false, "Piel sana."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("recambio", "Recambiar la sonda antes de tomar el urocultivo", "clave", "El biofilm perpetúa la infección."),
      mg("atb", "Antibiótico parenteral según cultivo (ceftriaxona y ajuste)", "clave", "Bacteriemia."),
      mg("internacion", "Internación domiciliaria o en sala según evolución", "clave", "Gravedad."),
      mg("revisar", "Revisar si la sonda es imprescindible", "util", "Prevención."),
      mg("cipro", "Ciprofloxacina oral empírica", "riesgoso", "Uso reciente y resistencia."),
      mg("profilaxis", "Antibiótico profiláctico permanente", "riesgoso", "Resistencia sin beneficio."),
    ],
  },
  debrief: {
    diagnosis: "Infección urinaria asociada a sonda con pielonefritis y bacteriemia por Klebsiella, en varón de 79 años postrado.",
    pathologies: [
      { name: "Infección urinaria asociada a sonda", role: "principal", why: "Infección asociada a dispositivo." },
      { name: "Bacteriemia", role: "asociada", why: "Gravedad." },
      { name: "Bacteriuria asintomática, neumonía", role: "diferencial", why: "Otros cuadros." },
    ],
    reasoning: [
      "Causa: sonda permanente con biofilm bacteriano.",
      "Mecanismo: ascenso de gérmenes por la luz y la superficie de la sonda.",
      "Consecuencia: pielonefritis y bacteriemia.",
    ],
    epidemiology:
      "Es la infección asociada a dispositivos más frecuente. Todo paciente con sonda prolongada tiene bacteriuria, que no se trata si no hay síntomas. La mejor prevención es retirar las sondas innecesarias.",
    management: [
      "Síntomas, no cultivos.",
      "Recambiar la sonda.",
      "Antibiótico según cultivo.",
      "Retirar si se puede.",
    ],
    sources: ["Sociedad Argentina de Infectología — Infecciones urinarias asociadas a catéter.", "IDSA — Catheter-associated Urinary Tract Infection Guidelines."],
    pearls: ["Con sonda, bacteriuria siempre.", "Cultivar de la sonda nueva.", "¿Hace falta la sonda?"],
    pitfalls: ["Tratar cultivos sin síntomas.", "Quinolona tras uso reciente."],
    tribunal: [
      qa("¿Por qué se recambia la sonda antes del cultivo?", "Porque el biofilm de la sonda vieja contamina el cultivo y perpetúa la infección."),
      qa("¿Cuándo se trata la bacteriuria asintomática?", "En embarazadas y antes de procedimientos urológicos con sangrado de mucosa."),
      qa("¿Qué alternativas a la sonda permanente hay?", "Cateterismo intermitente o colector externo en varones."),
    ],
  },
};
