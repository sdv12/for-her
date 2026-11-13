import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hiperplasiaProstatica: ClinicalCase = {
  id: "hiperplasia-prostatica-benigna",
  level: 1,
  area: "Nefrourología",
  setting: "Consultorio",
  patient: { age: 67, ageUnit: "años", sex: "M", context: "Hipertenso, toma amlodipina. Jubilado bancario." },
  frequency: "muy-frecuente",
  intro: "“Me levanto tres o cuatro veces a la noche a orinar, el chorro es finito y me queda la sensación de que no terminé.”",
  vitals: { TA: "138/84 mmHg", FC: "72 lpm", "T°": "36,4 °C", Peso: "82 kg" },
  anamnesis: [
    act("sintomas", "¿Qué síntomas tiene al orinar?", "clave", "“Chorro débil, tengo que esperar para que salga y goteo.”", "Síntomas obstructivos."),
    act("nocturia", "¿Cuántas veces se levanta?", "clave", "“Tres o cuatro.”", "Impacto en la calidad de vida."),
    act("alarma", "¿Sangre en la orina, dolor de huesos, bajó de peso?", "clave", "“No.”", "Descartar cáncer."),
    act("farmacos", "¿Toma antigripales o antialérgicos?", "util", "“A veces uno para el resfrío.”", "Pueden precipitar retención."),
    act("liquidos", "¿Cuánto toma a la noche?", "util", "“Mate hasta tarde.”", "Nocturia."),
    act("nietos", "¿Tiene nietos?", "neutro", "“Cuatro.”", "No orienta."),
  ],
  exam: [
    act("tacto", "Tacto rectal", "clave", "Próstata aumentada, lisa, elástica, sin nódulos.", "Hiperplasia benigna."),
    act("globo", "Globo vesical", "clave", "Ausente.", "Sin retención."),
    act("abdomen", "Abdomen", "util", "Normal.", "Base."),
  ],
  studies: [
    study("Laboratorio", "orina", "Orina completa y creatinina", "clave", "Normales.", "Descartar infección y daño renal."),
    study("Laboratorio", "psa", "PSA (con decisión compartida)", "clave", "2,8 ng/ml.", "Dentro de lo esperable."),
    study("Imágenes", "eco", "Ecografía con residuo posmiccional", "util", "Próstata de 45 g, residuo 70 ml.", "Tamaño y vaciamiento."),
    study("Imágenes", "rm", "RM de próstata de rutina", "innecesario", "No se realizó.", "Sin sospecha de cáncer."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hpb", "Hiperplasia prostática benigna con síntomas urinarios bajos moderados", true, "Síntomas obstructivos y nocturia, próstata lisa aumentada, PSA acorde y orina normal."),
      dx("cancer", "Cáncer de próstata", false, "Tacto liso y PSA acorde al tamaño."),
      dx("prostatitis", "Prostatitis aguda", false, "Sin fiebre ni dolor."),
      dx("estrechez", "Estrechez uretral", false, "Próstata grande y sin antecedente de trauma o uretritis."),
      dx("vejiga-neurogena", "Vejiga neurogénica", false, "Sin enfermedad neurológica."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("alfabloq", "Alfabloqueante (tamsulosina)", "clave", "Mejora rápido el chorro."),
      mg("habitos", "Reducir líquidos y mate a la noche", "clave", "Nocturia."),
      mg("5ari", "Inhibidor de la 5-alfa reductasa por el tamaño", "util", "Reduce el volumen a largo plazo."),
      mg("pautas", "Pautas de alarma de retención urinaria", "clave", "Complicación."),
      mg("antigripales", "Seguir con antigripales con descongestivos", "riesgoso", "Pueden precipitar retención."),
      mg("cirugia-ya", "Cirugía de entrada", "innecesario", "Primero tratamiento médico."),
    ],
  },
  debrief: {
    diagnosis: "Hiperplasia prostática benigna con síntomas urinarios bajos moderados, en varón de 67 años.",
    pathologies: [
      { name: "Hiperplasia prostática benigna", role: "principal", why: "Crecimiento de la zona de transición." },
      { name: "Nocturia", role: "asociada", why: "Impacto en la calidad de vida." },
      { name: "Cáncer de próstata, estrechez uretral", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: crecimiento prostático dependiente de dihidrotestosterona con la edad.",
      "Mecanismo: obstrucción mecánica y aumento del tono del músculo liso prostático.",
      "Consecuencia: síntomas de vaciado y llenado, y riesgo de retención.",
    ],
    epidemiology:
      "La hiperplasia prostática afecta a más de la mitad de los varones mayores de 60 años. Es una de las consultas urológicas más frecuentes en el primer nivel. El tacto y la orina completa son la base de la evaluación.",
    management: [
      "Tacto y orina.",
      "Alfabloqueante.",
      "Hábitos.",
      "Cirugía si fracasa o se complica.",
    ],
    sources: ["Sociedad Argentina de Urología — Hiperplasia prostática benigna.", "EAU — Management of Non-neurogenic Male LUTS Guidelines."],
    pearls: ["Tacto liso y elástico.", "Alfabloqueante primero.", "Ojo con antigripales."],
    pitfalls: ["No hacer tacto.", "Ignorar retención."],
    tribunal: [
      qa("¿Qué efecto adverso tiene la tamsulosina?", "Hipotensión ortostática y síndrome del iris flácido en cirugía de catarata."),
      qa("¿Qué hace la finasterida con el PSA?", "Lo baja a la mitad; hay que tenerlo en cuenta al interpretarlo."),
      qa("¿Cuándo se opera?", "Ante retención recurrente, litiasis vesical, insuficiencia renal o fracaso del tratamiento."),
    ],
  },
};
