import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const tepMasivo: ClinicalCase = {
  id: "tep-alto-riesgo-posoperatorio",
  level: 4,
  area: "Respiratorio",
  setting: "Internación",
  patient: { age: 68, ageUnit: "años", sex: "M", context: "Operado de reemplazo total de rodilla hace 6 días. No recibió profilaxis antitrombótica al alta del quirófano por “riesgo de sangrado”." },
  frequency: "poco-frecuente",
  intro: "“Al levantarse al baño se descompensó, le falta mucho el aire, está pálido y casi se desmaya.” (relata la enfermera)",
  vitals: { TA: "78/50 mmHg", FC: "128 lpm", FR: "32 rpm", "T°": "37,2 °C", "SatO₂": "84 %", Glasgow: "14/15" },
  anamnesis: [
    act("inicio", "¿Cómo empezó?", "clave", "“De golpe al pararse: falta de aire y casi se desmaya.”", "Inicio súbito con síncope o presíncope al movilizarse: embolia pulmonar masiva."),
    act("profilaxis", "¿Recibió heparina o anticoagulantes después de la cirugía?", "clave", "“No, se suspendió por miedo al sangrado.”", "Cirugía ortopédica mayor sin profilaxis: riesgo muy alto de TVP y TEP."),
    act("pierna", "¿Le dolía o se le hinchó la pierna operada?", "util", "“La pantorrilla izquierda le dolía desde ayer.”", "Probable TVP de origen."),
    act("dolor", "¿Le duele el pecho?", "util", "“Opresión.”", "La isquemia del ventrículo derecho puede dar dolor."),
    act("sangrado", "¿Sangró la herida o tuvo otros sangrados?", "clave", "“No.”", "Evaluar contraindicaciones de trombólisis."),
    act("hinchada", "¿De qué equipo es?", "neutro", "“De River.”", "No orienta."),
  ],
  exam: [
    act("yugulares", "Yugulares y auscultación", "clave", "Ingurgitación yugular, segundo ruido pulmonar aumentado, pulmones limpios.", "Falla del ventrículo derecho con pulmones limpios: TEP."),
    act("perfusion", "Perfusión", "clave", "Piel fría, moteada, relleno 4 s.", "Shock obstructivo."),
    act("pierna-ex", "Miembros inferiores", "util", "Edema y dolor en la pantorrilla izquierda.", "TVP."),
  ],
  studies: [
    study("Imágenes", "eco", "Ecocardiograma en la cama", "clave", "Ventrículo derecho dilatado e hipocinético, septum desplazado; trombo en tránsito en la aurícula derecha.", "En el paciente inestable que no puede ir al tomógrafo, la disfunción del VD justifica tratar."),
    study("Electrofisiología", "ecg", "Electrocardiograma", "util", "Taquicardia sinusal, S1Q3T3, bloqueo de rama derecha.", "Sobrecarga del ventrículo derecho."),
    study("Laboratorio", "lab", "Troponina, BNP, gases, lactato, coagulograma", "util", "Troponina elevada, lactato 4,1.", "Daño miocárdico e hipoperfusión."),
    study("Imágenes", "angiotc", "Angiotomografía de tórax si se estabiliza", "util", "Trombos en ambas arterias pulmonares principales.", "Confirma; no se traslada a un paciente en shock refractario."),
    study("Laboratorio", "ddimero", "Esperar el dímero D para decidir", "riesgoso", "No se realizó.", "En alta probabilidad e inestabilidad no tiene utilidad y demora."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("tep-alto", "Tromboembolismo pulmonar de alto riesgo (masivo) con shock obstructivo, por TVP posoperatoria", true, "Disnea súbita con hipotensión, hipoxemia, ingurgitación yugular, VD dilatado y trombos bilaterales, a los 6 días de un reemplazo de rodilla sin profilaxis."),
      dx("iam", "Infarto agudo de miocardio", false, "El ECG y el eco muestran sobrecarga derecha, no isquemia regional izquierda."),
      dx("hemorragico", "Shock hipovolémico por sangrado posoperatorio", false, "No hay sangrado y las yugulares están ingurgitadas."),
      dx("neumonia", "Neumonía con sepsis", false, "Pulmones limpios e inicio súbito."),
      dx("taponamiento", "Taponamiento cardíaco", false, "El eco no muestra derrame pericárdico."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("trombolisis", "Trombólisis sistémica (alteplasa); en contraindicación, trombectomía por catéter o quirúrgica", "clave", "El TEP de alto riesgo con shock tiene alta mortalidad: la reperfusión es el tratamiento."),
      mg("heparina", "Heparina no fraccionada EV", "clave", "Anticoagulación inmediata."),
      mg("sosten", "Noradrenalina, oxígeno y fluidos con cautela (pequeños volúmenes)", "clave", "El exceso de fluidos dilata más el VD y empeora el shock."),
      mg("uti", "Terapia intensiva y equipo de respuesta al TEP", "util", "Coordinación multidisciplinaria."),
      mg("ventilacion", "Intubación precoz rutinaria", "riesgoso", "La sedación y la presión positiva pueden producir colapso hemodinámico; si es necesaria, con extremo cuidado."),
      mg("fluidos-mucho", "Dos litros de solución fisiológica rápido", "riesgoso", "Sobrecarga el ventrículo derecho."),
    ],
  },
  debrief: {
    diagnosis: "Tromboembolismo pulmonar de alto riesgo con shock obstructivo y disfunción del ventrículo derecho, secundario a trombosis venosa profunda posoperatoria, en varón de 68 años operado de reemplazo de rodilla sin profilaxis antitrombótica.",
    pathologies: [
      { name: "TEP de alto riesgo (masivo)", role: "principal", why: "Embolia pulmonar con hipotensión sostenida." },
      { name: "TVP posoperatoria", role: "asociada", why: "Origen del émbolo." },
      { name: "IAM, shock hipovolémico, taponamiento", role: "diferencial", why: "Otras causas de shock en el posoperatorio." },
    ],
    reasoning: [
      "Causa: cirugía ortopédica mayor (daño endotelial, estasis e hipercoagulabilidad) sin profilaxis.",
      "Mecanismo: el trombo de la pierna se desprende al movilizarse y obstruye las arterias pulmonares; la poscarga del ventrículo derecho aumenta bruscamente.",
      "Consecuencia: dilatación e isquemia del VD, caída del gasto del ventrículo izquierdo, hipotensión, shock y paro cardíaco.",
    ],
    epidemiology:
      "Las cirugías de reemplazo de cadera y rodilla tienen uno de los riesgos más altos de enfermedad tromboembólica sin profilaxis. El TEP de alto riesgo representa una minoría de los TEP, pero su mortalidad supera el 25–50 %. La tromboprofilaxis adecuada es una de las principales medidas de seguridad del paciente.",
    management: [
      "Prevención: tromboprofilaxis farmacológica y mecánica en cirugías de alto riesgo.",
      "TEP con shock: ecocardiograma en la cama, heparina y trombólisis sistémica sin demora.",
      "Sostén hemodinámico con vasopresores y fluidos con cautela.",
      "Anticoagulación al menos 3 meses (TEP provocado).",
    ],
    sources: ["Sociedad Argentina de Cardiología — Consenso de enfermedad tromboembólica.", "Guías ESC de embolia pulmonar."],
    pearls: ["TEP + hipotensión = trombólisis.", "Pulmones limpios + yugulares ingurgitadas + hipoxemia = TEP.", "Fluidos con cautela."],
    pitfalls: ["Omitir la profilaxis antitrombótica.", "Trasladar a tomografía a un paciente en shock."],
    tribunal: [
      qa("¿Cómo se estratifica el riesgo del TEP?", "Alto riesgo: hipotensión o shock. Intermedio-alto: sin hipotensión, con disfunción del VD en la imagen y troponina elevada. Intermedio-bajo: solo uno de ellos o PESI alto. Bajo: sin hipotensión, sin disfunción del VD y PESI bajo."),
      qa("¿Qué contraindicaciones absolutas tiene la trombólisis?", "ACV hemorrágico previo o isquémico en los últimos 6 meses, tumor o lesión del sistema nervioso central, traumatismo, cirugía o lesión craneal mayor en las últimas 3 semanas, sangrado activo, diátesis hemorrágica y disección aórtica. En el TEP con shock pueden pesarse frente al riesgo de muerte."),
      qa("¿A quién se indica tromboprofilaxis?", "A pacientes quirúrgicos y clínicos internados con riesgo moderado a alto (escalas de Caprini o Padua), en especial cirugía ortopédica mayor, oncológica y abdominal mayor; con heparina de bajo peso molecular, fondaparinux o anticoagulantes orales directos, y medidas mecánicas si hay alto riesgo de sangrado."),
    ],
  },
};
