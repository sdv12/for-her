import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const sifilisSecundaria: ClinicalCase = {
  id: "sifilis-secundaria",
  level: 1,
  area: "Infectología",
  setting: "Consultorio",
  patient: { age: 27, ageUnit: "años", sex: "M", context: "Tiene relaciones con varones y mujeres. Usa preservativo a veces." },
  frequency: "frecuente",
  intro: "“Me salieron manchas rojas en el cuerpo, en las palmas y en las plantas de los pies. No pican. También tengo algo de fiebre y cansancio.”",
  vitals: { TA: "118/76 mmHg", FC: "86 lpm", "T°": "37,6 °C" },
  anamnesis: [
    act("ulcera", "¿Tuviste hace unos meses una herida en los genitales, ano o boca que no dolía?", "clave", "“Hace dos meses una lastimadura en el pene que se fue sola.”", "Chancro previo indoloro: sífilis primaria que evolucionó a secundaria."),
    act("relaciones", "¿Tuviste relaciones sin preservativo en los últimos meses? ¿Con cuántas personas?", "clave", "“Sí, con tres personas.”", "Exposición; las parejas deben estudiarse y tratarse."),
    act("neuro", "¿Tenés dolor de cabeza fuerte, cambios en la visión o la audición?", "clave", "“No.”", "Descarta neurosífilis y sífilis ocular u ótica."),
    act("pelo", "¿Se te cae el pelo?", "util", "“Un poco, a parches.”", "Alopecia en claros: secundarismo."),
    act("vih", "¿Te hiciste el test de VIH?", "util", "“Nunca.”", "Toda ITS obliga a testear VIH."),
    act("musica", "¿Qué música escuchás?", "neutro", "“Pop.”", "No orienta."),
  ],
  exam: [
    act("piel", "Piel, palmas y plantas", "clave", "Máculas y pápulas cobrizas en tronco, palmas y plantas.", "Exantema palmoplantar: muy sugestivo de sífilis secundaria."),
    act("mucosas", "Boca y genitales", "util", "Placas blanquecinas en la mucosa oral; condilomas planos perianales.", "Lesiones muy contagiosas."),
    act("ganglios", "Ganglios", "util", "Adenopatías generalizadas indoloras.", "Diseminación."),
  ],
  studies: [
    study("Laboratorio", "vdrl", "VDRL cuantitativa", "clave", "Reactiva 1/64.", "Prueba no treponémica: diagnóstico y seguimiento."),
    study("Laboratorio", "treponemica", "Prueba treponémica (FTA-abs o test rápido)", "clave", "Reactiva.", "Confirma."),
    study("Laboratorio", "vih-hb", "VIH, hepatitis B y C", "clave", "VIH negativo.", "Coinfecciones frecuentes."),
    study("Otros", "puncion", "Punción lumbar de rutina", "innecesario", "No se realizó.", "Sin síntomas neurológicos ni oculares no está indicada."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("secundaria", "Sífilis secundaria", true, "Exantema palmoplantar no pruriginoso, lesiones mucosas, adenopatías y alopecia tras un chancro, con VDRL 1/64 y prueba treponémica reactiva."),
      dx("pitiriasis", "Pitiriasis rosada", false, "No afecta palmas ni plantas y las pruebas de sífilis serían negativas."),
      dx("farmacos", "Exantema por fármacos", false, "No tomó fármacos y las serologías son reactivas."),
      dx("vih-agudo", "Infección aguda por VIH", false, "Puede dar exantema, pero el test es negativo y la sífilis está confirmada."),
      dx("primaria", "Sífilis primaria", false, "El chancro ya se curó y hay lesiones diseminadas."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("penicilina", "Penicilina G benzatínica 2.400.000 UI IM, dosis única", "clave", "Tratamiento de la sífilis temprana."),
      mg("parejas", "Estudiar y tratar a las parejas de los últimos 6 meses a 1 año", "clave", "Corta la transmisión."),
      mg("seguimiento", "VDRL a los 3, 6 y 12 meses (debe bajar 4 veces los títulos)", "clave", "Confirma la respuesta."),
      mg("prevencion", "Preservativo, PrEP y notificación", "util", "Prevención combinada."),
      mg("advertir", "Advertir la reacción de Jarisch-Herxheimer (fiebre y malestar en las primeras horas)", "util", "Es esperable y no es alergia."),
      mg("azitro", "Azitromicina de primera línea", "riesgoso", "Hay resistencia del treponema; no es primera elección."),
    ],
  },
  debrief: {
    diagnosis: "Sífilis secundaria (VDRL 1/64) con exantema palmoplantar, lesiones mucosas y alopecia, en varón de 27 años con prácticas sexuales sin protección.",
    pathologies: [
      { name: "Sífilis secundaria", role: "principal", why: "Diseminación hematógena del treponema." },
      { name: "Riesgo de VIH y otras ITS", role: "asociada", why: "Misma vía de transmisión." },
      { name: "Pitiriasis rosada, exantema por fármacos, VIH agudo", role: "diferencial", why: "Otros exantemas." },
    ],
    reasoning: [
      "Causa: Treponema pallidum por transmisión sexual.",
      "Mecanismo: tras el chancro, el treponema se disemina por la sangre a piel, mucosas y ganglios.",
      "Consecuencia: exantema, lesiones mucosas muy contagiosas, adenopatías; sin tratamiento pasa a latente y años después a terciaria.",
    ],
    epidemiology:
      "La sífilis aumentó mucho en Argentina en la última década, sobre todo en jóvenes de 15 a 34 años, y también la sífilis congénita. Varones que tienen sexo con varones y personas con muchas parejas tienen mayor riesgo.",
    management: [
      "Diagnóstico con prueba no treponémica y treponémica.",
      "Penicilina benzatínica según el estadio.",
      "Tratar parejas, testear VIH y hepatitis, notificar.",
      "Seguimiento serológico.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de diagnóstico y tratamiento de sífilis.", "Boletín epidemiológico de VIH e ITS."],
    pearls: ["Exantema palmoplantar = pensar sífilis.", "Penicilina benzatínica.", "Testear VIH."],
    pitfalls: ["Confundir con alergia.", "No tratar a las parejas."],
    tribunal: [
      qa("¿Qué etapas tiene la sífilis?", "Primaria (chancro indoloro y adenopatía), secundaria (exantema, lesiones mucosas, condilomas planos, alopecia), latente temprana (menos de un año) y tardía, y terciaria (gomas, cardiovascular, neurosífilis). La neurosífilis puede aparecer en cualquier etapa."),
      qa("¿Qué diferencia las pruebas treponémicas de las no treponémicas?", "Las no treponémicas (VDRL, RPR) se cuantifican, bajan con el tratamiento y sirven para el seguimiento; las treponémicas (FTA-abs, TPHA, tests rápidos) confirman y suelen quedar positivas de por vida."),
      qa("¿Qué es la reacción de Jarisch-Herxheimer?", "Fiebre, escalofríos, mialgias y empeoramiento transitorio de las lesiones en las primeras 24 h del tratamiento, por la liberación de productos del treponema; se trata con antitérmicos y no contraindica la penicilina."),
    ],
  },
};
