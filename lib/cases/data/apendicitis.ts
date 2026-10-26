import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const apendicitis: ClinicalCase = {
  id: "apendicitis-aguda",
  level: 2,
  area: "Cirugía",
  setting: "Guardia",
  patient: { age: 17, ageUnit: "años", sex: "M", context: "Estudiante. Viene con la mamá." },
  frequency: "frecuente",
  intro: "“Ayer a la tarde empezó un dolor alrededor del ombligo. A la noche se me fue para abajo a la derecha, vomité una vez y no tengo nada de hambre.”",
  vitals: { TA: "120/75 mmHg", FC: "98 lpm", FR: "18 rpm", "T°": "37,9 °C" },
  anamnesis: [
    act("migracion", "¿Dónde empezó el dolor y adónde se fue?", "clave", "“Primero en el ombligo, sordo. Después se fue a la derecha abajo y ahora es más fuerte y fijo.”", "La migración del dolor de periumbilical (visceral) a fosa ilíaca derecha (somático, por irritación peritoneal) es muy característica de apendicitis."),
    act("anorexia", "¿Tiene hambre? ¿Vomitó?", "clave", "“Nada de hambre. Vomité una vez, después de que empezó el dolor.”", "Anorexia casi constante; los vómitos aparecen después del dolor (si son antes, pensar en gastroenteritis)."),
    act("deposiciones", "¿Tiene diarrea?", "util", "“No, ayer fui normal.”", "Diarrea abundante orienta a gastroenteritis; un apéndice pélvico puede dar algo de diarrea."),
    act("urinario", "¿Le arde al orinar o vio sangre en la orina?", "util", "“No.”", "Descarta causas urinarias (litiasis, infección)."),
    act("movimiento", "¿Le duele más al moverse, toser o en los pozos del camino?", "clave", "“Sí, venir en el auto fue terrible.”", "El dolor que empeora con el movimiento indica irritación peritoneal."),
    act("trauma", "¿Tuvo algún golpe en el abdomen?", "util", "“No.”", "Descarta causa traumática."),
    act("deporte", "¿Juega a algún deporte?", "neutro", "“Básquet.”", "No orienta."),
  ],
  exam: [
    act("mcburney", "Palpación de fosa ilíaca derecha (punto de McBurney)", "clave", "Dolor intenso a la palpación en el punto de McBurney, con defensa.", "Dolor focal con defensa: irritación peritoneal localizada."),
    act("blumberg", "Signo de Blumberg (descompresión)", "clave", "Positivo en fosa ilíaca derecha.", "Signo de irritación peritoneal."),
    act("rovsing", "Signos de Rovsing, psoas y obturador", "util", "Rovsing positivo; psoas positivo.", "Apoyan el diagnóstico; el psoas sugiere apéndice retrocecal."),
    act("testiculos", "Examen testicular", "clave", "Testículos normales, sin dolor ni ascenso.", "En un varón joven con dolor abdominal bajo hay que descartar torsión testicular, que puede referir dolor al abdomen."),
    act("tacto", "Tacto rectal", "innecesario", "Dolor en el fondo de saco derecho.", "Hoy no es imprescindible si el resto del examen es claro; puede ayudar en apéndice pélvico."),
  ],
  studies: [
    study("Laboratorio", "hemograma", "Hemograma y PCR", "clave", "Leucocitos 14.200 con 84 % de neutrófilos; PCR 38 mg/l.", "Leucocitosis con desviación a la izquierda suma puntos en el score de Alvarado y apoya el diagnóstico."),
    study("Laboratorio", "orina", "Orina completa", "util", "Normal.", "Ayuda a descartar infección urinaria o litiasis."),
    study("Imágenes", "eco", "Ecografía abdominal", "util", "Apéndice no compresible de 9 mm, con líquido periapendicular.", "Útil cuando hay dudas; confirma en manos expertas. Con Alvarado alto no debe demorar la cirugía."),
    study("Imágenes", "rx", "Radiografía de abdomen", "innecesario", "Sin hallazgos significativos.", "No sirve para diagnosticar apendicitis; solo si se sospecha obstrucción o perforación con neumoperitoneo."),
    study("Imágenes", "tc", "Tomografía de abdomen con contraste", "innecesario", "No se realizó.", "En un varón joven con cuadro típico no hace falta y suma radiación; se reserva para dudas o sospecha de absceso."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("apendicitis", "Apendicitis aguda", true, "Dolor que migra a fosa ilíaca derecha, anorexia, vómito tras el dolor, febrícula, Blumberg positivo y leucocitosis con neutrofilia: Alvarado de 9."),
      dx("gastro", "Gastroenteritis aguda", false, "Los vómitos y la diarrea preceden o acompañan al dolor, que es difuso y cólico, sin defensa localizada."),
      dx("adenitis", "Adenitis mesentérica", false, "Más común en niños con infección viral reciente; el dolor es menos localizado y sin peritonismo franco."),
      dx("litiasis", "Cólico renal derecho", false, "Dolor cólico lumbar irradiado a genitales, con hematuria y sin defensa abdominal."),
      dx("torsion", "Torsión testicular", false, "Dolor testicular brusco con testículo ascendido y horizontalizado; el examen genital fue normal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cirugia", "Interconsulta con cirugía para apendicectomía (laparoscópica o convencional)", "clave", "Es el tratamiento de la apendicitis aguda; demorarla aumenta el riesgo de perforación."),
      mg("ayuno", "Ayuno, hidratación endovenosa y analgesia", "clave", "Prepara para la cirugía. La analgesia no enmascara el diagnóstico y no debe negarse."),
      mg("atbprof", "Antibiótico profiláctico antes de la cirugía (por ejemplo, cefazolina más metronidazol, o ampicilina-sulbactam)", "clave", "Reduce la infección del sitio quirúrgico; en la apendicitis complicada se continúa como tratamiento."),
      mg("alta", "Alta con antiespasmódicos y control en 24 h", "riesgoso", "Con un cuadro típico y Alvarado alto, mandarlo a casa expone a perforación y peritonitis."),
      mg("enema", "Enema evacuante o laxantes", "riesgoso", "Aumentan la presión intraluminal y pueden favorecer la perforación."),
      mg("tc", "Esperar una tomografía antes de llamar a cirugía", "innecesario", "En un cuadro clínico claro, demora la conducta sin beneficio."),
    ],
  },
  debrief: {
    diagnosis: "Apendicitis aguda no complicada en varón de 17 años (Alvarado 9).",
    pathologies: [
      { name: "Apendicitis aguda", role: "principal", why: "Clínica típica, peritonismo localizado y leucocitosis." },
      { name: "Gastroenteritis", role: "diferencial", why: "El gran diagnóstico errado en apendicitis tempranas." },
      { name: "Adenitis mesentérica", role: "diferencial", why: "Dolor en fosa ilíaca derecha tras una virosis." },
      { name: "Cólico renal", role: "diferencial", why: "Dolor del flanco irradiado con hematuria." },
      { name: "Torsión testicular", role: "diferencial", why: "En varones jóvenes, siempre examinar los testículos." },
    ],
    reasoning: [
      "Causa: obstrucción de la luz del apéndice por un fecalito o por hiperplasia linfoide (más frecuente en jóvenes).",
      "Mecanismo: el moco se acumula, aumenta la presión y se dificulta el retorno venoso; las bacterias proliferan e invaden la pared, que se isquemia y puede perforarse en 24–72 h.",
      "Consecuencia: primero dolor visceral periumbilical (la inervación del apéndice entra por T10, igual que el ombligo); cuando la inflamación toca el peritoneo parietal, el dolor se vuelve somático y se localiza en la fosa ilíaca derecha.",
      "Si perfora: peritonitis localizada (plastrón o absceso) o generalizada, con fiebre alta y abdomen en tabla.",
    ],
    epidemiology:
      "Es la urgencia quirúrgica abdominal más frecuente. El pico de incidencia está entre los 10 y los 30 años y es algo más frecuente en varones. En niños pequeños y en adultos mayores el diagnóstico se retrasa y la perforación es mucho más frecuente. En mujeres jóvenes hay que descartar embarazo ectópico y causas anexiales.",
    management: [
      "Diagnóstico clínico apoyado en el score de Alvarado y el laboratorio; ecografía si hay dudas (sobre todo en niños y mujeres jóvenes), TC en casos dudosos del adulto.",
      "Ayuno, hidratación, analgesia y antibiótico profiláctico.",
      "Apendicectomía temprana (laparoscópica cuando está disponible).",
      "Apendicitis complicada (absceso, perforación): antibiótico terapéutico y drenaje o cirugía según el caso.",
      "Pautas de alarma posoperatorias y control de la herida.",
    ],
    sources: [
      "Asociación Argentina de Cirugía — Consenso de apendicitis aguda.",
      "Sociedad Argentina de Pediatría — Recomendaciones sobre dolor abdominal agudo en pediatría.",
    ],
    pearls: [
      "Alvarado (MANTRELS): Migración, Anorexia, Náuseas/vómitos, Tenderness en FID (2), Rebote, Elevación de la temperatura, Leucocitosis (2), Shift a la izquierda.",
      "Dolor antes que el vómito: quirúrgico hasta que se demuestre lo contrario.",
      "La analgesia no oculta la apendicitis.",
    ],
    pitfalls: ["Dar laxantes o enemas por “dolor de panza”.", "No examinar los testículos.", "Pedir tomografía a todos antes de llamar al cirujano."],
  },
};
