import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const torsionOvaricaNina: ClinicalCase = {
  id: "torsion-ovarica-nina",
  level: 3,
  area: "Cirugía",
  setting: "Guardia",
  patient: { age: 8, ageUnit: "años", sex: "F", context: "Prepuberal, sana. La trae la mamá." },
  frequency: "poco-frecuente",
  intro: "“Le agarró un dolor fuerte en la panza abajo a la derecha hace 4 horas mientras saltaba en la cama elástica, y vomitó tres veces.”",
  vitals: { FC: "128 lpm", FR: "24 rpm", "T°": "37,3 °C", Peso: "26 kg" },
  anamnesis: [
    act("inicio", "¿Cómo empezó el dolor?", "clave", "“De golpe, saltando.”", "Inicio brusco."),
    act("vomitos", "¿Vomitó?", "clave", "“Tres veces.”", "Típico de torsión."),
    act("episodios", "¿Tuvo dolores así antes?", "clave", "“Uno parecido que se fue solo.”", "Torsión intermitente."),
    act("orina", "¿Arde al orinar?", "util", "“No.”", "ITU."),
    act("diarrea", "¿Diarrea o fiebre?", "util", "“No.”", "Gastroenteritis."),
    act("juego", "¿Qué estaba jugando?", "neutro", "“En la cama elástica.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Abdomen", "clave", "Dolor en fosa ilíaca derecha con defensa leve.", "Abdomen agudo."),
    act("masa", "Masa", "clave", "Masa dolorosa en hipogastrio derecho.", "Ovario aumentado."),
    act("genitales", "Genitales", "util", "Prepuberales normales.", "Base."),
  ],
  studies: [
    study("Imágenes", "eco", "Ecografía abdominopelviana con Doppler", "clave", "Ovario derecho de 6 cm, edematoso con folículos periféricos y flujo disminuido, signo del remolino.", "Torsión."),
    study("Laboratorio", "lab", "Hemograma, orina", "util", "Leucocitos 12.000; orina normal.", "Excluye ITU."),
    study("Laboratorio", "marcadores", "Marcadores tumorales (AFP, beta-hCG, LDH)", "util", "Normales.", "Tumor de células germinales."),
    study("Otros", "esperar-doppler-normal", "Descartar torsión porque hay algo de flujo", "riesgoso", "No se hizo.", "El flujo no descarta torsión."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("torsion", "Torsión ovárica derecha en niña prepuberal", true, "Dolor brusco con vómitos, masa, ovario agrandado con folículos periféricos y signo del remolino."),
      dx("apendicitis", "Apendicitis", false, "Inicio brusco y ovario patológico."),
      dx("quiste", "Quiste ovárico simple", false, "Ovario edematoso con flujo alterado."),
      dx("invaginacion", "Invaginación", false, "Edad y hallazgo ecográfico."),
      dx("itu", "Infección urinaria", false, "Orina normal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("laparoscopia", "Laparoscopia urgente con detorsión", "clave", "Salvar el ovario."),
      mg("conservar", "Conservar el ovario aunque se vea oscuro", "clave", "Suele recuperarse."),
      mg("analgesia", "Analgesia y ayuno", "clave", "Preparación."),
      mg("ooforopexia", "Considerar ooforopexia", "util", "Torsión recurrente."),
      mg("ooforectomia", "Ooforectomía de rutina por aspecto necrótico", "riesgoso", "Pérdida innecesaria."),
      mg("observar", "Observar con analgesia", "riesgoso", "Necrosis."),
    ],
  },
  debrief: {
    diagnosis: "Torsión ovárica derecha en niña prepuberal de 8 años.",
    pathologies: [
      { name: "Torsión ovárica", role: "principal", why: "Emergencia quirúrgica ginecológica." },
      { name: "Ligamentos laxos prepuberales", role: "asociada", why: "Torsión de ovario normal." },
      { name: "Apendicitis, quiste", role: "diferencial", why: "Otros dolores pelvianos." },
    ],
    reasoning: [
      "Causa: movilidad excesiva del anexo en niñas.",
      "Mecanismo: rotación del pedículo con compromiso venoso y luego arterial.",
      "Consecuencia: isquemia y necrosis del ovario.",
    ],
    epidemiology:
      "En niñas la torsión suele ocurrir sobre ovarios normales. Es una de las causas de abdomen agudo ginecológico en la infancia. Se prioriza conservar el ovario.",
    management: [
      "Sospechar.",
      "Ecografía Doppler.",
      "Laparoscopia urgente.",
      "Conservar.",
    ],
    sources: ["Sociedad Argentina de Ginecología Infanto Juvenil — Torsión anexial.", "ACOG — Committee Opinion: Adnexal Torsion in Adolescents."],
    pearls: ["Dolor brusco con vómitos.", "El flujo no descarta.", "Detorsionar y conservar."],
    pitfalls: ["Esperar.", "Sacar el ovario."],
    tribunal: [
      qa("¿Por qué no se saca el ovario oscuro?", "Porque la mayoría recupera la función tras la detorsión."),
      qa("¿Qué es el signo del remolino?", "Imagen en espiral del pedículo vascular torcido en la ecografía."),
      qa("¿Qué diferencia hay con la torsión en adultas?", "En adultas suele asociarse a quistes o tumores; en niñas a ovarios normales."),
    ],
  },
};
