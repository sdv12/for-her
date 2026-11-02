import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const rinitisAlergica: ClinicalCase = {
  id: "rinitis-alergica",
  level: 1,
  area: "Alergia e inmunología",
  setting: "Consultorio",
  patient: { age: 12, ageUnit: "años", sex: "M", context: "Tuvo dermatitis atópica de bebé. Septiembre." },
  frequency: "muy-frecuente",
  intro: "“Desde que empezó la primavera estornuda todo el tiempo, tiene la nariz tapada, le pican los ojos y la nariz. Duerme con la boca abierta y ronca.” (relata la madre)",
  vitals: { FC: "84 lpm", FR: "18 rpm", "T°": "36,4 °C", "SatO₂": "99 %" },
  anamnesis: [
    act("estacion", "¿Le pasa siempre o en alguna época del año?", "clave", "“Todos los años en primavera, peor cuando hay viento.”", "Patrón estacional: polen de árboles y gramíneas."),
    act("sintomas", "¿Qué síntomas tiene? ¿Le pican los ojos?", "clave", "“Estornudos en salva, moco como agua, picazón de nariz y ojos.”", "Rinorrea acuosa, estornudos, prurito y conjuntivitis: rinoconjuntivitis alérgica."),
    act("asma", "¿Tiene tos, silbidos en el pecho o se agita al correr?", "clave", "“A veces tos de noche y se agita en educación física.”", "La rinitis se asocia al asma: hay que buscarla."),
    act("fiebre", "¿Tiene fiebre o moco espeso de un solo lado?", "util", "“No.”", "Descarta sinusitis bacteriana y cuerpo extraño."),
    act("familia", "¿Alguien en la familia tiene alergias?", "util", "“El papá tiene asma.”", "Atopia familiar."),
    act("impacto", "¿Cómo le va en la escuela? ¿Duerme bien?", "util", "“Está cansado y le bajaron las notas.”", "La rinitis afecta el sueño y el rendimiento: indica tratamiento."),
    act("videojuego", "¿A qué juega?", "neutro", "“A la Play.”", "No orienta."),
  ],
  exam: [
    act("rinoscopia", "Rinoscopía anterior", "clave", "Mucosa pálida, edematosa, con rinorrea acuosa; sin pólipos.", "Mucosa típica de rinitis alérgica."),
    act("facies", "Facies", "util", "Ojeras, pliegue nasal transversal (saludo alérgico).", "Signos de rinitis alérgica crónica."),
    act("pulmon", "Auscultación pulmonar", "util", "Sibilancias espiratorias leves al espirar forzado.", "Sugiere asma asociada."),
  ],
  studies: [
    study("Otros", "prick", "Pruebas cutáneas (prick test) o IgE específica", "util", "Positivas para polen de gramíneas y plátano.", "Confirman la sensibilización y orientan la evitación o inmunoterapia."),
    study("Otros", "espirometria", "Espirometría con broncodilatador", "clave", "Obstrucción leve reversible.", "Confirma asma asociada."),
    study("Imágenes", "rx-senos", "Radiografía de senos paranasales", "innecesario", "No se realizó.", "No sirve para diagnosticar rinitis."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("rinitis", "Rinoconjuntivitis alérgica estacional (polen), moderada a grave, con asma asociada", true, "Estornudos, rinorrea acuosa, prurito nasal y ocular en primavera, mucosa pálida, atopia y pruebas positivas, con impacto en el sueño y la escuela, y espirometría con obstrucción reversible."),
      dx("resfrio", "Resfrío común", false, "Es recurrente cada primavera, sin fiebre y con prurito."),
      dx("sinusitis", "Rinosinusitis bacteriana", false, "Sin fiebre, sin moco purulento ni dolor facial."),
      dx("adenoides", "Hipertrofia adenoidea aislada", false, "No explica el prurito ni el patrón estacional."),
      dx("vasomotora", "Rinitis no alérgica vasomotora", false, "Las pruebas son positivas y hay prurito y atopia."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("corticoide-nasal", "Corticoide intranasal diario durante la temporada", "clave", "Es el tratamiento más eficaz en la rinitis moderada a grave."),
      mg("antihistaminico", "Antihistamínico oral de segunda generación si hay síntomas oculares o como complemento", "util", "Alivia el prurito y la rinorrea."),
      mg("asma", "Tratamiento del asma con corticoide inhalado y plan de acción", "clave", "Tratar la rinitis mejora el asma, pero no la reemplaza."),
      mg("evitacion", "Medidas de evitación (ventanas cerradas en días de viento, lavado nasal con solución salina)", "clave", "Reducen la exposición."),
      mg("descongestivo", "Descongestivos nasales tópicos todos los días", "riesgoso", "Más de 5–7 días producen rinitis medicamentosa."),
      mg("corticoide-im", "Corticoide de depósito intramuscular cada temporada", "riesgoso", "Efectos adversos sistémicos; no se recomienda."),
    ],
  },
  debrief: {
    diagnosis: "Rinoconjuntivitis alérgica estacional por polen, moderada a grave, con asma leve asociada, en niño atópico de 12 años.",
    pathologies: [
      { name: "Rinitis alérgica", role: "principal", why: "Inflamación nasal mediada por IgE." },
      { name: "Asma", role: "asociada", why: "Vía aérea única: la rinitis y el asma suelen coexistir." },
      { name: "Resfrío, sinusitis, adenoides", role: "diferencial", why: "Otras causas de congestión nasal." },
    ],
    reasoning: [
      "Causa: sensibilización a pólenes en un niño con predisposición atópica.",
      "Mecanismo: el alérgeno se une a la IgE de los mastocitos de la mucosa nasal, que liberan histamina y leucotrienos (fase inmediata) y luego reclutan eosinófilos (fase tardía).",
      "Consecuencia: estornudos, rinorrea, prurito, congestión, mala calidad de sueño y peor control del asma.",
    ],
    epidemiology:
      "La rinitis alérgica es la enfermedad alérgica más frecuente: afecta a un 10–30 % de la población y es más común en niños y adolescentes. La mayoría de las personas con asma tiene rinitis, y la rinitis aumenta el riesgo de asma. En Argentina, el polen de plátano, gramíneas y otros árboles produce síntomas en primavera.",
    management: [
      "Diagnóstico clínico; pruebas alérgicas si hay dudas o para inmunoterapia.",
      "Buscar asma en toda rinitis persistente o moderada.",
      "Corticoide intranasal como base; antihistamínicos de segunda generación como complemento.",
      "Evitación y considerar inmunoterapia específica.",
    ],
    sources: ["Asociación Argentina de Alergia e Inmunología Clínica — Consenso de rinitis alérgica.", "Guías ARIA (Allergic Rhinitis and its Impact on Asthma)."],
    pearls: ["Rinitis y asma: una vía aérea.", "Corticoide nasal es lo más eficaz.", "Descongestivos tópicos: no más de 5 días."],
    pitfalls: ["No buscar asma.", "Usar descongestivos tópicos crónicos."],
    tribunal: [
      qa("¿Cómo clasifica ARIA la rinitis alérgica?", "Por duración: intermitente (menos de 4 días por semana o menos de 4 semanas) o persistente; por gravedad: leve (sin afectar el sueño, las actividades ni la escuela) o moderada-grave (si afecta alguna)."),
      qa("¿Qué es la marcha atópica?", "La secuencia frecuente de enfermedades alérgicas en la infancia: dermatitis atópica y alergia alimentaria en el lactante, seguidas de asma y rinitis alérgica en edades posteriores."),
      qa("¿Qué es la inmunoterapia con alérgenos?", "La administración progresiva del alérgeno (subcutánea o sublingual) durante 3 a 5 años para inducir tolerancia; es el único tratamiento que modifica la evolución de la alergia y puede prevenir el asma en niños con rinitis."),
    ],
  },
};
