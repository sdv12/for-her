import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const delirium: ClinicalCase = {
  id: "delirium-adulto-mayor",
  level: 3,
  area: "Neurología",
  setting: "Guardia",
  patient: { age: 86, ageUnit: "años", sex: "M", context: "Olvidos leves desde hace dos años. Lo trae la hija." },
  frequency: "frecuente",
  intro: "“Desde ayer está desconocido: no sabe dónde está, a la noche quiso salir a la calle, habla cosas raras y por momentos está dormido. Antes se manejaba bien.” (relata la hija)",
  vitals: { TA: "132/74 mmHg", FC: "98 lpm", FR: "20 rpm", "T°": "37,9 °C", "SatO₂": "95 %" },
  anamnesis: [
    act("inicio", "¿Fue de un día para otro? ¿Cambia durante el día?", "clave", "“De golpe, desde ayer. A ratos está bien y a ratos muy confundido, peor a la noche.”", "Inicio agudo y curso fluctuante: características centrales del delirium (no de la demencia, que es gradual)."),
    act("farmacos", "¿Qué medicación toma? ¿Cambió algo?", "clave", "“El médico le dio un antialérgico para dormir hace tres días. Y toma algo para la próstata.”", "Los anticolinérgicos (difenhidramina y similares) son una causa frecuente y evitable de delirium."),
    act("orina", "¿Orina normal? ¿Tiene ardor, tos, dolor, constipación?", "clave", "“Va al baño a cada rato y le arde. Hace tres días que no va de cuerpo.”", "Infección urinaria, retención y constipación son desencadenantes frecuentes."),
    act("basal", "¿Cómo era su memoria y su autonomía antes?", "clave", "“Se olvidaba algunas cosas, pero se bañaba y comía solo.”", "La demencia previa es el principal factor de riesgo y sirve de referencia."),
    act("caida", "¿Se cayó o se golpeó?", "util", "“No.”", "Un hematoma subdural puede presentarse como delirium."),
    act("tango", "¿Le gusta el tango?", "neutro", "“Le encanta Pugliese.”", "No orienta, aunque puede ayudar a reorientarlo."),
  ],
  exam: [
    act("atencion", "Evaluación de la atención (CAM: contar hacia atrás, meses al revés)", "clave", "No logra decir los meses al revés; se distrae; pensamiento desorganizado; alterna somnolencia y agitación.", "CAM positivo: inicio agudo y fluctuante + inatención + pensamiento desorganizado o alteración de la conciencia."),
    act("globo", "Palpación del hipogastrio", "clave", "Globo vesical.", "La retención urinaria puede causar o empeorar el delirium."),
    act("neuro", "Examen neurológico", "util", "Sin foco motor ni rigidez de nuca.", "Un foco orientaría a ACV o lesión estructural."),
    act("hidratacion", "Hidratación", "util", "Mucosas secas.", "La deshidratación también contribuye."),
  ],
  studies: [
    study("Laboratorio", "orina", "Orina completa y urocultivo (por sonda al evacuar el globo)", "clave", "Leucocitos abundantes, nitritos positivos.", "Confirma una infección urinaria como desencadenante."),
    study("Laboratorio", "lab", "Hemograma, glucemia, ionograma, calcio, urea y creatinina", "clave", "Leucocitos 13.500; Na 133; creatinina 1,5.", "Busca otras causas metabólicas."),
    study("Electrofisiología", "ecg", "Electrocardiograma", "util", "Sinusal.", "Descarta causa cardíaca y es necesario antes de usar antipsicóticos (QT)."),
    study("Imágenes", "tc", "Tomografía de cerebro", "innecesario", "No se realizó.", "Sin foco, traumatismo ni anticoagulación, y con una causa clara, no está indicada de entrada."),
    study("Electrofisiología", "eeg", "Electroencefalograma", "innecesario", "No se realizó.", "Solo si se sospecha estado epiléptico no convulsivo."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("delirium", "Delirium multifactorial (infección urinaria, retención, anticolinérgicos, constipación) sobre deterioro cognitivo previo", true, "Inicio agudo, fluctuación, inatención y pensamiento desorganizado (CAM positivo), con varios desencadenantes identificados."),
      dx("demencia", "Progresión de la demencia", false, "La demencia avanza en meses o años, no de un día para otro, y no fluctúa así."),
      dx("psicosis", "Psicosis de inicio tardío", false, "En un adulto mayor, una alteración aguda de la conducta es delirium hasta demostrar lo contrario."),
      dx("acv", "ACV", false, "No hay foco neurológico; aunque puede dar confusión, hay causas claras."),
      dx("depresion", "Depresión", false, "No produce un cuadro agudo fluctuante con inatención."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("causas", "Tratar las causas: sonda para evacuar la vejiga, antibiótico, laxantes, hidratación", "clave", "El delirium se resuelve tratando lo que lo desencadena."),
      mg("suspender", "Suspender el antihistamínico y revisar los fármacos anticolinérgicos", "clave", "Retira una causa evitable."),
      mg("no-farmaco", "Medidas no farmacológicas: familiar acompañante, reorientación, anteojos y audífonos, luz de día, sueño nocturno", "clave", "Son lo más eficaz para prevenir y tratar el delirium."),
      mg("haloperidol", "Haloperidol en dosis bajas solo si hay agitación peligrosa", "util", "Se reserva para riesgo de daño; no trata la causa."),
      mg("bzd", "Lorazepam para que duerma", "riesgoso", "Las benzodiacepinas empeoran el delirium en adultos mayores (salvo abstinencia alcohólica)."),
      mg("contencion", "Contención física prolongada", "riesgoso", "Aumenta la agitación, las lesiones y la duración del delirium."),
    ],
  },
  debrief: {
    diagnosis: "Delirium mixto multifactorial (infección urinaria, retención urinaria, anticolinérgico, constipación, deshidratación) sobre deterioro cognitivo leve, en varón de 86 años.",
    pathologies: [
      { name: "Delirium", role: "principal", why: "Síndrome agudo de inatención y fluctuación." },
      { name: "Infección urinaria y retención urinaria", role: "asociada", why: "Desencadenantes." },
      { name: "Deterioro cognitivo previo", role: "asociada", why: "Principal factor predisponente." },
      { name: "Demencia, psicosis, ACV", role: "diferencial", why: "Se distinguen por el curso y el examen." },
    ],
    reasoning: [
      "Causa: un cerebro vulnerable (edad, deterioro cognitivo) sufre una agresión: infección, fármacos, retención, deshidratación.",
      "Mecanismo: falla aguda de la función cerebral global, con desequilibrio de neurotransmisores (déficit colinérgico, exceso dopaminérgico) e inflamación sistémica que afecta al cerebro.",
      "Consecuencia: inatención, desorientación, pensamiento desorganizado, alteración del ciclo sueño-vigilia, fluctuación. Puede ser hiperactivo, hipoactivo (el más subdiagnosticado) o mixto.",
      "Por eso el anticolinérgico, en un cerebro con déficit colinérgico de base, es especialmente dañino.",
    ],
    epidemiology:
      "El delirium afecta a cerca de un tercio de los adultos mayores que consultan en guardia o se internan, y a más de la mitad de los operados de cadera. Se asocia a mayor mortalidad, institucionalización y deterioro cognitivo. Es más frecuente con la edad avanzada, la demencia, la polifarmacia y el déficit sensorial; la forma hipoactiva pasa inadvertida con frecuencia.",
    management: [
      "Detectar con herramientas como el CAM.",
      "Buscar y tratar las causas (infecciones, fármacos, retención, constipación, dolor, alteraciones metabólicas).",
      "Medidas no farmacológicas como base.",
      "Antipsicóticos en dosis bajas solo para agitación peligrosa; evitar benzodiacepinas y contenciones.",
      "Revisar fármacos inapropiados (criterios de Beers) y seguimiento cognitivo.",
    ],
    sources: ["Sociedad Argentina de Gerontología y Geriatría — Recomendaciones sobre delirium.", "Criterios de Beers de medicación potencialmente inapropiada en adultos mayores."],
    pearls: ["Agudo + fluctuante + inatención = delirium.", "Antihistamínicos para dormir en ancianos: no.", "Benzodiacepinas empeoran el delirium."],
    pitfalls: ["Atribuirlo a la demencia.", "Sedarlo con benzodiacepinas.", "No buscar la retención urinaria."],
  },
};
