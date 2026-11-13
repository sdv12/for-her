import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const epiglotitisAdulto: ClinicalCase = {
  id: "epiglotitis-adulto",
  level: 3,
  area: "Respiratorio",
  setting: "Guardia",
  patient: { age: 45, ageUnit: "años", sex: "M", context: "Diabético tipo 2. No sabe si está vacunado." },
  frequency: "raro",
  intro: "“Desde anoche me duele muchísimo la garganta, no puedo tragar ni la saliva y me cambió la voz.”",
  vitals: { TA: "134/84 mmHg", FC: "118 lpm", FR: "24 rpm", "T°": "39,2 °C", "SatO₂": "95 %" },
  anamnesis: [
    act("disfagia", "¿Puede tragar?", "clave", "“Ni la saliva, la escupo.”", "Odinofagia intensa y babeo."),
    act("voz", "¿Cómo está la voz?", "clave", "“Apagada, como con una papa en la boca.”", "Voz de papa caliente."),
    act("respirar", "¿Le cuesta respirar acostado?", "clave", "“Tengo que estar sentado para adelante.”", "Riesgo de obstrucción."),
    act("inicio", "¿Cuándo empezó?", "util", "“Ayer a la tarde.”", "Evolución rápida."),
    act("alergia", "¿Comió algo nuevo o lo picó algo?", "util", "“No.”", "Angioedema."),
    act("trabajo", "¿En qué trabaja?", "neutro", "“Vendo seguros.”", "No orienta."),
  ],
  exam: [
    act("postura", "Postura y estridor", "clave", "Sentado inclinado hacia adelante, babeando, estridor inspiratorio leve.", "Vía aérea amenazada."),
    act("faringe", "Examen de la faringe con baja lengua sin forzar", "clave", "Faringe casi normal, desproporcionada al dolor.", "Sugiere patología supraglótica."),
    act("cuello", "Palpación laríngea", "util", "Dolor al movilizar el hioides.", "Supraglotitis."),
  ],
  studies: [
    study("Otros", "fibroscopia", "Nasofibrolaringoscopia por ORL en quirófano o con equipo de vía aérea", "clave", "Epiglotis roja y edematosa, en cereza.", "Diagnóstico."),
    study("Microbiología", "hemocultivos", "Hemocultivos", "clave", "Haemophilus influenzae en uno de dos.", "Germen."),
    study("Laboratorio", "lab", "Hemograma y glucemia", "util", "Leucocitos 19.000; glucemia 260.", "Inflamación y control."),
    study("Imágenes", "tc", "Trasladarlo solo a TC de cuello acostado", "riesgoso", "No se realizó.", "Puede obstruirse en decúbito y sin equipo."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("epiglotitis", "Epiglotitis aguda (supraglotitis) bacteriana", true, "Odinofagia intensa con faringe casi normal, babeo, voz apagada, estridor y epiglotis en cereza."),
      dx("absceso", "Absceso periamigdalino", false, "No hay abombamiento del pilar ni trismus."),
      dx("faringitis", "Faringitis estreptocócica", false, "La faringe no explica el cuadro."),
      dx("angioedema", "Angioedema", false, "Hay fiebre alta y sin urticaria ni exposición."),
      dx("cuerpo-extrano", "Cuerpo extraño", false, "Sin antecedente y con fiebre."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("via-aerea", "Asegurar la vía aérea en un lugar controlado, con anestesia y ORL listos para traqueostomía", "clave", "Riesgo de obstrucción súbita."),
      mg("atb", "Ceftriaxona EV", "clave", "Cubre Haemophilus y estreptococos."),
      mg("sentado", "Mantenerlo sentado y tranquilo", "clave", "No precipitar la obstrucción."),
      mg("corticoide", "Corticoides EV", "util", "Reducen el edema, con evidencia limitada."),
      mg("baja-lengua", "Examinar forzando con baja lengua y acostarlo", "riesgoso", "Puede precipitar el cierre."),
      mg("alta", "Alta con amoxicilina", "riesgoso", "Mortalidad por obstrucción."),
    ],
  },
  debrief: {
    diagnosis: "Epiglotitis aguda bacteriana por Haemophilus influenzae, en varón diabético de 45 años.",
    pathologies: [
      { name: "Epiglotitis aguda", role: "principal", why: "Infección de la supraglotis." },
      { name: "Diabetes mal controlada", role: "asociada", why: "Factor de riesgo." },
      { name: "Absceso periamigdalino, angioedema", role: "diferencial", why: "Otras causas de odinofagia grave." },
    ],
    reasoning: [
      "Causa: Haemophilus influenzae u otros estreptococos.",
      "Mecanismo: edema inflamatorio de la epiglotis y estructuras supraglóticas.",
      "Consecuencia: obstrucción de la vía aérea en minutos.",
    ],
    epidemiology:
      "Con la vacuna contra Haemophilus tipo b la epiglotitis casi desapareció en niños y hoy se ve más en adultos. Es rara, pero letal si se subestima. El dolor de garganta desproporcionado al examen es la pista.",
    management: [
      "Sospechar.",
      "Vía aérea controlada.",
      "Ceftriaxona.",
      "Hemocultivos.",
    ],
    sources: ["Sociedad Argentina de Otorrinolaringología — Urgencias de vía aérea.", "IDSA — Clinical Practice Guidelines for Upper Respiratory Infections."],
    pearls: ["Dolor intenso con faringe normal.", "Sentado, babeando, voz apagada.", "No forzar el examen."],
    pitfalls: ["Acostarlo.", "Mandarlo solo a TC."],
    tribunal: [
      qa("¿Qué signo radiológico clásico describe?", "El signo del pulgar en la radiografía lateral de cuello."),
      qa("¿Por qué cambió la epidemiología?", "La vacuna contra Haemophilus influenzae tipo b redujo mucho los casos en niños."),
      qa("¿Qué profilaxis se indica a contactos si es Hib?", "Rifampicina a contactos convivientes con niños no vacunados."),
    ],
  },
};
