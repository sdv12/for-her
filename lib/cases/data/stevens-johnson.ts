import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const stevensJohnson: ClinicalCase = {
  id: "stevens-johnson-por-farmaco",
  level: 4,
  area: "Dermatología",
  setting: "Guardia",
  patient: { age: 29, ageUnit: "años", sex: "F", context: "Epilepsia reciente: empezó lamotrigina hace tres semanas con aumento rápido de dosis." },
  frequency: "raro",
  intro: "“Tuve fiebre y dolor de garganta. Ahora me salieron manchas en la cara y el pecho, me arden, y tengo ampollas en la boca. No puedo tragar.”",
  vitals: { TA: "104/64 mmHg", FC: "118 lpm", FR: "22 rpm", "T°": "38,9 °C", "SatO₂": "96 %" },
  anamnesis: [
    act("farmacos", "¿Qué remedios empezaste en los últimos dos meses?", "clave", "“Lamotrigina hace tres semanas; ibuprofeno para la fiebre.”", "Causa farmacológica en la gran mayoría; la latencia típica es de 4 a 28 días."),
    act("ojos", "¿Te arden los ojos? ¿Dolor al orinar?", "clave", "“Sí, ojos rojos y arde al orinar.”", "Compromiso de múltiples mucosas."),
    act("dolor", "¿La piel duele o pica?", "clave", "“Duele mucho.”", "El dolor cutáneo es signo de alarma; la urticaria pica."),
    act("prodromo", "¿Cómo empezó?", "util", "“Un cuadro como gripal dos días antes.”", "Pródromo típico."),
    act("inmuno", "¿Tenés VIH o alguna enfermedad inmune?", "util", "“No sé.”", "Mayor riesgo en VIH: se pide serología."),
    act("trabajo", "¿De qué trabajás?", "neutro", "“Docente.”", "No orienta."),
  ],
  exam: [
    act("piel", "Lesiones cutáneas y porcentaje afectado", "clave", "Máculas en diana atípicas, ampollas flácidas confluentes, despegamiento en 8 % de la superficie corporal.", "Menos del 10 %: Stevens-Johnson; más del 30 %: necrólisis epidérmica tóxica."),
    act("nikolsky", "Signo de Nikolsky", "clave", "Positivo: la piel se despega al frotar.", "Necrólisis de la epidermis."),
    act("mucosas", "Boca, ojos y genitales", "clave", "Erosiones hemorrágicas en labios, conjuntivitis, erosiones genitales.", "Dos o más mucosas: criterio típico."),
  ],
  studies: [
    study("Otros", "biopsia", "Biopsia de piel", "clave", "Necrosis epidérmica de todo el espesor, escaso infiltrado.", "Confirma y diferencia de otras enfermedades ampollares."),
    study("Laboratorio", "lab", "Hemograma, función renal y hepática, ionograma, gases, glucemia, hemocultivos, VIH", "clave", "Linfopenia, urea alta, bicarbonato 18.", "Permite calcular el SCORTEN y evaluar complicaciones."),
    study("Otros", "reto", "Reexponer al fármaco para confirmar", "riesgoso", "No se realizó.", "Puede ser mortal."),
    study("Microbiología", "herpes", "PCR para herpes y Mycoplasma", "util", "Negativas.", "Son diferenciales y desencadenantes."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("sjs", "Síndrome de Stevens-Johnson por lamotrigina", true, "Latencia típica, pródromo, dolor cutáneo, 8 % de despegamiento, Nikolsky positivo y múltiples mucosas."),
      dx("urticaria", "Urticaria", false, "Son ronchas evanescentes pruriginosas, sin despegamiento ni mucosas."),
      dx("eritema", "Eritema multiforme mayor", false, "Se asocia a herpes, con dianas típicas en extremidades y poco despegamiento."),
      dx("penfigo", "Pénfigo vulgar", false, "Es crónico, con curso de semanas y sin fármaco desencadenante claro."),
      dx("ssss", "Síndrome de piel escaldada estafilocócica", false, "Afecta a niños, respeta mucosas y el despegamiento es superficial."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("suspender", "Suspender de inmediato la lamotrigina y otros fármacos no esenciales", "clave", "La suspensión temprana mejora la sobrevida."),
      mg("unidad", "Derivar a una unidad de quemados o terapia intensiva", "clave", "Manejo como gran quemado."),
      mg("soporte", "Hidratación EV, calor, cuidado de heridas sin adhesivos, nutrición y analgesia", "clave", "El soporte es la base del tratamiento."),
      mg("oftalmo", "Interconsulta urgente con oftalmología", "clave", "Previene ceguera y secuelas."),
      mg("alergia", "Alerta permanente de alergia y otro anticonvulsivante sin reactividad cruzada", "util", "Evita la reexposición. Evitar carbamazepina y fenitoína."),
      mg("atb-profilaxis", "Antibióticos profilácticos de rutina", "innecesario", "Solo si hay infección: favorecen resistencia."),
    ],
  },
  debrief: {
    diagnosis: "Síndrome de Stevens-Johnson por lamotrigina, 8 % de superficie, con compromiso oral, ocular y genital, en mujer de 29 años.",
    pathologies: [
      { name: "Síndrome de Stevens-Johnson", role: "principal", why: "Necrólisis epidérmica mediada por linfocitos T." },
      { name: "Riesgo de sepsis y secuelas oculares", role: "asociada", why: "Complicaciones principales." },
      { name: "Eritema multiforme, pénfigo, piel escaldada", role: "diferencial", why: "Otras enfermedades ampollares." },
    ],
    reasoning: [
      "Causa: hipersensibilidad a fármacos como anticonvulsivantes, alopurinol, sulfas y AINE oxicam.",
      "Mecanismo: linfocitos T citotóxicos y granulisina causan apoptosis masiva de los queratinocitos.",
      "Consecuencia: despegamiento de la epidermis, pérdida de líquidos, infección, compromiso de mucosas.",
    ],
    epidemiology:
      "Es raro, pero tiene una mortalidad de cerca del 10 %, que llega al 30 % o más en la necrólisis epidérmica tóxica. La lamotrigina presenta más riesgo si se aumenta rápido o con ácido valproico. El VIH aumenta mucho el riesgo.",
    management: [
      "Suspender el fármaco.",
      "Derivar a una unidad especializada.",
      "Soporte: líquidos, heridas, nutrición, dolor.",
      "Control de mucosas, oftalmología y prohibición de por vida del fármaco.",
    ],
    sources: ["Sociedad Argentina de Dermatología — Consenso de reacciones adversas cutáneas graves.", "Administración Nacional de Medicamentos (ANMAT) — Farmacovigilancia."],
    pearls: ["Fiebre + piel que duele + mucosas: suspendé todo lo nuevo.", "Menos de 10 %: SJS; más de 30 %: NET.", "Notificá a farmacovigilancia."],
    pitfalls: ["Seguir con el fármaco por otra indicación.", "Olvidar los ojos."],
    tribunal: [
      qa("¿Qué es el SCORTEN?", "Un puntaje pronóstico con edad mayor de 40, cáncer, FC mayor de 120, despegamiento mayor de 10 %, urea alta, glucosa alta y bicarbonato bajo."),
      qa("¿Qué fármacos lo causan con más frecuencia?", "Alopurinol, carbamazepina, fenitoína, lamotrigina, fenobarbital, sulfonamidas, AINE oxicam y nevirapina."),
      qa("¿Cuál es la diferencia con el DRESS?", "El DRESS aparece más tarde (2 a 8 semanas) con exantema, fiebre, eosinofilia, adenopatías y daño orgánico, sin necrólisis extensa."),
    ],
  },
};
