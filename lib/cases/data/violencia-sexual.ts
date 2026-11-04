import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const violenciaSexual: ClinicalCase = {
  id: "violencia-sexual-atencion-inmediata",
  level: 2,
  area: "Salud comunitaria",
  setting: "Guardia",
  patient: { age: 22, ageUnit: "años", sex: "F", context: "Llega acompañada por una amiga. Ocurrió hace 18 horas, al volver de una fiesta." },
  frequency: "frecuente",
  intro: "“Anoche un hombre me forzó a tener relaciones. No sé si quiero denunciar. Tengo miedo de quedar embarazada o tener algo.”",
  vitals: { TA: "118/76 mmHg", FC: "96 lpm", "T°": "36,6 °C" },
  anamnesis: [
    act("espacio", "Ofrecer un espacio privado, creerle, explicar cada paso y pedir consentimiento", "clave", "Acepta ser atendida.", "La atención sin revictimizar es parte del tratamiento."),
    act("tiempo", "¿Hace cuántas horas fue? ¿Hubo penetración vaginal, anal u oral? ¿Preservativo?", "clave", "“Hace 18 horas; vaginal, sin preservativo.”", "Define la profilaxis: anticoncepción de emergencia hasta 120 h y PEP para VIH hasta 72 h."),
    act("embarazo", "¿Fecha de última menstruación? ¿Usás anticonceptivos?", "clave", "“Me vino hace 12 días; no uso.”", "Riesgo de embarazo."),
    act("lesiones", "¿Tenés dolor o lastimaduras?", "util", "“Me duele la vulva y el brazo.”", "Atender lesiones."),
    act("sustancias", "¿Te dieron algo para tomar? ¿Recordás todo?", "util", "“Tengo partes que no recuerdo.”", "Sospechar sumisión química."),
    act("musica", "¿Qué tipo de fiesta era?", "neutro", "“Un cumpleaños.”", "No orienta y no corresponde indagar detalles que no cambian la atención."),
  ],
  exam: [
    act("examen", "Examen físico y genital con consentimiento, documentando lesiones", "clave", "Hematomas en el brazo izquierdo; desgarro superficial en la horquilla vulvar.", "Documentación útil si decide denunciar."),
    act("muestras", "Toma de muestras forenses si la paciente lo autoriza (con cadena de custodia)", "util", "Tomadas con su consentimiento.", "Se conservan aunque no decida denunciar en ese momento."),
    act("emocional", "Estado emocional", "util", "Angustiada, sin ideas de muerte.", "Requiere acompañamiento."),
  ],
  studies: [
    study("Laboratorio", "basales", "Serologías basales (VIH, sífilis, hepatitis B y C) y beta-HCG", "clave", "Negativas.", "Línea de base para el seguimiento."),
    study("Laboratorio", "toxicos", "Tóxicos en orina por sospecha de sumisión química", "util", "Pendientes.", "Si hay amnesia."),
    study("Otros", "esperar-denuncia", "Esperar la denuncia policial para atender", "riesgoso", "No se realizó.", "La atención en salud no está condicionada a la denuncia."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("vs", "Violencia sexual con penetración vaginal sin preservativo hace 18 h, con lesiones leves y posible sumisión química", true, "Relato de relación forzada, lesiones genitales y extragenitales, dentro de las ventanas de profilaxis."),
      dx("lesiones-leves", "Lesiones leves sin necesidad de profilaxis", false, "Hay exposición de riesgo para embarazo, VIH e ITS."),
      dx("consentida", "Relación consentida", false, "Se cree el relato; el consentimiento no existió."),
      dx("intoxicacion", "Intoxicación alcohólica aislada", false, "La amnesia sugiere sumisión química en un contexto de violencia."),
      dx("its", "Infección de transmisión sexual", false, "Es una exposición; se previene."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("aho", "Anticoncepción hormonal de emergencia (levonorgestrel) de inmediato", "clave", "Dentro de las 120 h; más eficaz cuanto antes."),
      mg("pep", "Profilaxis posexposición para VIH por 28 días (iniciar antes de las 72 h)", "clave", "Reduce el riesgo de infección."),
      mg("its", "Profilaxis de ITS (ceftriaxona, azitromicina o doxiciclina, metronidazol) y vacuna de hepatitis B", "clave", "Previene gonorrea, clamidia, tricomoniasis y hepatitis B."),
      mg("derechos", "Informar sobre la denuncia (opcional para mayores), el derecho a la interrupción del embarazo y el acompañamiento psicológico", "clave", "Leyes 26.485 y 27.610 y protocolo nacional."),
      mg("seguimiento", "Seguimiento clínico, serológico y de salud mental", "util", "Serologías a las 6 semanas, 3 y 6 meses."),
      mg("revictimizar", "Pedirle que relate los detalles varias veces a distintas personas", "riesgoso", "Revictimiza."),
    ],
  },
  debrief: {
    diagnosis: "Violencia sexual con penetración vaginal sin preservativo hace 18 h, con lesiones leves y sospecha de sumisión química, en mujer de 22 años, dentro de las ventanas de profilaxis.",
    pathologies: [
      { name: "Violencia sexual", role: "principal", why: "Relación sin consentimiento." },
      { name: "Riesgo de embarazo, VIH e ITS", role: "asociada", why: "Exposición prevenible." },
      { name: "Intoxicación, lesiones aisladas", role: "diferencial", why: "No reemplazan el diagnóstico." },
    ],
    reasoning: [
      "Causa: una agresión sexual, una forma de violencia de género.",
      "Mecanismo: exposición a semen y sangre, lesiones y trauma psíquico.",
      "Consecuencia: riesgo de embarazo, ITS y VIH, y de estrés postraumático, depresión e intentos de suicidio.",
    ],
    epidemiology:
      "En Argentina las mujeres jóvenes y las adolescentes son las principales víctimas de violencia sexual; la mayoría de los agresores son conocidos. La atención inmediata en la guardia, dentro de las primeras 72 h, permite prevenir embarazos e infecciones.",
    management: [
      "Atención inmediata, empática y sin revictimizar.",
      "Anticoncepción de emergencia, PEP para VIH, profilaxis de ITS y hepatitis B.",
      "Documentación y muestras con consentimiento; información sobre denuncia y derechos.",
      "Seguimiento clínico y de salud mental.",
    ],
    sources: ["Ministerio de Salud de la Nación — Protocolo para la atención integral de personas víctimas de violaciones sexuales.", "Ley 26.485 y Ley 27.610."],
    pearls: ["Primeras 72 h: PEP; 120 h: anticoncepción de emergencia.", "La atención no depende de la denuncia.", "No revictimizar."],
    pitfalls: ["Esperar la denuncia.", "Olvidar la profilaxis de VIH."],
    tribunal: [
      qa("¿Cuándo es obligatoria la denuncia en violencia sexual?", "En personas menores de edad o con discapacidad que no pueden hacerlo, el equipo de salud debe comunicarlo a los organismos de protección; en mayores de edad, la denuncia es una decisión de la víctima."),
      qa("¿Qué es la profilaxis posexposición al VIH?", "Un tratamiento antirretroviral de 28 días que se inicia lo antes posible y antes de las 72 h tras una exposición de riesgo (sexual u ocupacional), con seguimiento serológico."),
      qa("¿Qué es la sumisión química?", "La administración de sustancias (alcohol, benzodiacepinas, GHB, escopolamina) para anular la voluntad de la víctima; se sospecha ante amnesia o desorientación y se toman muestras de sangre y orina."),
    ],
  },
};
