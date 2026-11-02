import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hsa: ClinicalCase = {
  id: "hemorragia-subaracnoidea",
  level: 3,
  area: "Neurología",
  setting: "Guardia",
  patient: { age: 49, ageUnit: "años", sex: "F", context: "Fumadora e hipertensa sin control." },
  frequency: "poco-frecuente",
  intro: "“Estaba en el gimnasio y de golpe sentí un estallido en la cabeza, el peor dolor de mi vida. Vomité y me duele el cuello.”",
  vitals: { TA: "176/98 mmHg", FC: "64 lpm", FR: "18 rpm", "T°": "36,8 °C", Glasgow: "15/15" },
  anamnesis: [
    act("inicio", "¿Cómo empezó el dolor? ¿En cuánto tiempo llegó al máximo?", "clave", "“De golpe, en un segundo, al máximo.”", "Cefalea en estallido (en trueno), máxima en menos de un minuto: hemorragia subaracnoidea hasta demostrar lo contrario."),
    act("peor", "¿Tuviste alguna vez un dolor así?", "clave", "“Nunca, tengo jaquecas pero esto es otra cosa.”", "“El peor dolor de mi vida”, distinto al habitual: bandera roja."),
    act("conciencia", "¿Te desmayaste, convulsionaste o perdiste fuerza?", "clave", "“Me desvanecí un segundo.”", "La pérdida de conocimiento es frecuente en la HSA."),
    act("centinela", "¿Tuviste dolores de cabeza fuertes y raros en las últimas semanas?", "util", "“Uno hace diez días, menos fuerte.”", "Cefalea centinela: pequeño sangrado previo."),
    act("familia", "¿Alguien en tu familia tuvo aneurismas o enfermedad de los riñones poliquísticos?", "util", "“Mi tía tuvo un aneurisma.”", "Factor de riesgo."),
    act("anticoag", "¿Tomás aspirina o anticoagulantes?", "util", "“No.”", "Influye en el manejo."),
    act("rutina", "¿Qué rutina estabas haciendo?", "neutro", "“Sentadillas con peso.”", "El esfuerzo puede precipitar la ruptura, pero no cambia el manejo."),
  ],
  exam: [
    act("meningeo", "Signos meníngeos", "clave", "Rigidez de nuca, Kernig positivo.", "La sangre en el espacio subaracnoideo irrita las meninges."),
    act("neuro", "Examen neurológico completo", "clave", "Sin foco motor; leve ptosis y midriasis izquierda.", "Compromiso del III par: sugiere aneurisma de la comunicante posterior."),
    act("fondo", "Fondo de ojo", "util", "Hemorragias subhialinas.", "Hallazgo asociado a HSA."),
  ],
  studies: [
    study("Imágenes", "tc", "Tomografía de cerebro sin contraste urgente", "clave", "Sangre en cisternas basales y cisura de Silvio izquierda.", "Muy sensible en las primeras 6 horas."),
    study("Imágenes", "angiotc", "Angiotomografía cerebral", "clave", "Aneurisma de la arteria comunicante posterior izquierda de 7 mm.", "Localiza la causa para el tratamiento."),
    study("Otros", "puncion", "Punción lumbar si la tomografía es normal", "util", "No fue necesaria.", "Busca xantocromía si la sospecha persiste con TC normal."),
    study("Electrofisiología", "ecg", "Electrocardiograma", "util", "Ondas T invertidas difusas, QT largo.", "La HSA produce alteraciones del ECG que no indican infarto."),
    study("Laboratorio", "anticoagular", "Anticoagulación por sospecha de ACV isquémico", "riesgoso", "No se realizó.", "Empeoraría el sangrado."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hsa", "Hemorragia subaracnoidea aneurismática (comunicante posterior izquierda), Hunt y Hess 2", true, "Cefalea en estallido, la peor de su vida, con vómitos, rigidez de nuca, compromiso del III par, sangre en cisternas y aneurisma en la angiotomografía."),
      dx("migrana", "Crisis de migraña", false, "La migraña tiene instalación progresiva y no da rigidez de nuca ni sangre en la TC."),
      dx("meningitis", "Meningitis", false, "Inicio súbito sin fiebre y sangre en la tomografía."),
      dx("hic", "Hemorragia intraparenquimatosa hipertensiva", false, "La sangre está en el espacio subaracnoideo y hay aneurisma."),
      dx("hta", "Emergencia hipertensiva con encefalopatía", false, "La hipertensión es reactiva; la causa es el sangrado."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("neurocirugia", "Interconsulta urgente con neurocirugía y tratamiento del aneurisma (clip o embolización) en las primeras 24–72 h", "clave", "Previene el resangrado, la principal causa de muerte temprana."),
      mg("nimodipina", "Nimodipina oral", "clave", "Reduce las secuelas por vasoespasmo."),
      mg("presion", "Control de la presión (sistólica menor de 160) y analgesia", "clave", "Reduce el riesgo de resangrado."),
      mg("uti", "Internación en terapia intensiva, euvolemia, control neurológico frecuente", "clave", "Vigilar vasoespasmo, hidrocefalia e hiponatremia."),
      mg("aspirina", "Aspirina por sospecha de ACV", "riesgoso", "Aumenta el sangrado."),
      mg("alta-analgesia", "Analgésicos y alta por migraña", "riesgoso", "El resangrado es muy mortal."),
    ],
  },
  debrief: {
    diagnosis: "Hemorragia subaracnoidea aneurismática por aneurisma de la arteria comunicante posterior izquierda, Hunt y Hess 2, con paresia parcial del III par, en mujer hipertensa y fumadora de 49 años.",
    pathologies: [
      { name: "Hemorragia subaracnoidea aneurismática", role: "principal", why: "Ruptura de un aneurisma sacular." },
      { name: "Vasoespasmo, hidrocefalia, resangrado", role: "asociada", why: "Complicaciones a prevenir." },
      { name: "Migraña, meningitis, hemorragia intraparenquimatosa", role: "diferencial", why: "Otras causas de cefalea aguda grave." },
    ],
    reasoning: [
      "Causa: ruptura de un aneurisma sacular del polígono de Willis, favorecida por hipertensión, tabaco y antecedentes familiares.",
      "Mecanismo: la sangre arterial invade el espacio subaracnoideo, aumenta bruscamente la presión intracraneana e irrita las meninges.",
      "Consecuencia: cefalea en estallido, vómitos, pérdida de conciencia, rigidez de nuca; luego resangrado, vasoespasmo con isquemia (días 4–14) e hidrocefalia.",
    ],
    epidemiology:
      "La HSA aneurismática afecta a unas 6 a 9 personas cada 100.000 por año, con pico entre los 40 y 60 años, y es más frecuente en mujeres. Tiene alta mortalidad y muchas secuelas. Hipertensión y tabaco son los factores modificables más importantes.",
    management: [
      "Sospecharla ante cefalea en trueno: TC sin contraste y, si es normal, punción lumbar.",
      "Angiotomografía o angiografía para localizar el aneurisma.",
      "Tratamiento precoz del aneurisma, nimodipina y control de la presión.",
      "Vigilar y tratar vasoespasmo, hidrocefalia, convulsiones e hiponatremia.",
    ],
    sources: ["Sociedad Neurológica Argentina — Guía de hemorragia subaracnoidea.", "Guías AHA/ASA de hemorragia subaracnoidea aneurismática."],
    pearls: ["Cefalea en trueno = TC urgente.", "TC normal no descarta: punción lumbar.", "Nimodipina para el vasoespasmo."],
    pitfalls: ["Diagnosticar migraña en una cefalea distinta a la habitual.", "No hacer punción con TC normal."],
    tribunal: [
      qa("¿Cuáles son las banderas rojas de la cefalea?", "Inicio súbito en trueno, la peor de la vida, cambio del patrón habitual, inicio después de los 50 años, fiebre y rigidez de nuca, déficit neurológico, edema de papila, inmunosupresión o cáncer, embarazo o puerperio, desencadenada por esfuerzo o Valsalva, y traumatismo."),
      qa("¿Qué es la escala de Hunt y Hess?", "Una escala clínica de gravedad de la HSA: 1 asintomática o cefalea leve; 2 cefalea intensa, rigidez de nuca, par craneal; 3 somnolencia o déficit leve; 4 estupor o hemiparesia; 5 coma. Predice el pronóstico."),
      qa("¿Cuándo aparece el vasoespasmo y cómo se previene?", "Entre los días 4 y 14 después del sangrado; produce isquemia cerebral tardía. Se previene con nimodipina y euvolemia, y se vigila con examen neurológico y Doppler transcraneal."),
    ],
  },
};
