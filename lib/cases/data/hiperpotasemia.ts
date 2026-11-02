import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hiperpotasemia: ClinicalCase = {
  id: "hiperpotasemia-erc",
  level: 3,
  area: "Nefrourología",
  setting: "Guardia",
  patient: { age: 68, ageUnit: "años", sex: "M", context: "Diabético e hipertenso con enfermedad renal crónica. Toma enalapril y espironolactona; le agregaron ibuprofeno por dolor de rodilla." },
  frequency: "frecuente",
  intro: "“Desde ayer siento las piernas débiles, flojas, y como un hormigueo. Hoy me costó levantarme de la silla.”",
  vitals: { TA: "142/82 mmHg", FC: "52 lpm", FR: "18 rpm", "T°": "36,4 °C", "SatO₂": "96 %", Glucemia: "168 mg/dl" },
  anamnesis: [
    act("farmacos", "¿Qué remedios toma? ¿Cambió alguno?", "clave", "“Enalapril, espironolactona y hace una semana ibuprofeno tres veces por día.”", "IECA + espironolactona + AINE en un paciente renal: combinación clásica que produce hiperpotasemia."),
    act("renal", "¿Le dijeron que tiene los riñones afectados?", "clave", "“Sí, tengo los riñones flojos; me controla el nefrólogo.”", "La enfermedad renal crónica disminuye la excreción de potasio."),
    act("dieta", "¿Comió muchas frutas, jugos o sal dietética?", "util", "“Uso sal light y como bananas.”", "La sal dietética es cloruro de potasio."),
    act("palpitaciones", "¿Sintió palpitaciones o se desmayó?", "clave", "“Un poco de mareo.”", "Síntomas cardíacos: gravedad."),
    act("orina", "¿Orina menos?", "util", "“Un poco menos.”", "Deterioro agudo de la función renal por el AINE."),
    act("rodilla", "¿Por qué le duele la rodilla?", "neutro", "“Artrosis, de jugar al fútbol de joven.”", "No orienta."),
  ],
  exam: [
    act("neuro", "Fuerza y reflejos", "clave", "Debilidad proximal en miembros inferiores, hiporreflexia.", "La hiperpotasemia altera la excitabilidad muscular."),
    act("pulso", "Pulso y perfusión", "clave", "Bradicardia regular a 52 lpm, bien perfundido.", "Alteración de la conducción."),
    act("volemia", "Volemia", "util", "Mucosas algo secas, sin edemas.", "Deshidratación leve que agrava la falla renal."),
  ],
  studies: [
    study("Electrofisiología", "ecg", "Electrocardiograma inmediato", "clave", "Ondas T altas y picudas, PR prolongado, P aplanadas, QRS 0,12 s.", "Cambios en el ECG = emergencia: tratar antes del resultado del laboratorio."),
    study("Laboratorio", "iono", "Ionograma, creatinina, urea, gases", "clave", "K 7,4 mEq/l, creatinina 3,8 (basal 2,1), pH 7,30, bicarbonato 16.", "Hiperpotasemia grave con deterioro agudo de la función renal y acidosis."),
    study("Laboratorio", "pseudo", "Repetir el potasio para descartar hemólisis antes de tratar", "riesgoso", "No se realizó.", "Con cambios en el ECG no se espera: se trata ya."),
    study("Imágenes", "eco", "Ecografía renal", "util", "Riñones pequeños, sin dilatación.", "Enfermedad crónica; descarta obstrucción."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hiperk", "Hiperpotasemia grave con alteraciones electrocardiográficas, por IECA, espironolactona y AINE sobre enfermedad renal crónica agudizada", true, "Potasio de 7,4 con T picudas, PR largo y QRS ancho, debilidad y bradicardia, con fármacos que retienen potasio y deterioro de la función renal."),
      dx("iam", "Infarto agudo de miocardio", false, "Las T picudas difusas con QRS ancho y K alto son por hiperpotasemia."),
      dx("pseudohiperk", "Seudohiperpotasemia por hemólisis", false, "Hay cambios en el ECG y clínica: es real."),
      dx("guillain", "Guillain-Barré", false, "La debilidad se explica por el potasio; no hay progresión ascendente típica."),
      dx("bloqueo", "Bloqueo AV por betabloqueantes", false, "No toma betabloqueantes y el potasio explica el cuadro."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("calcio", "Gluconato de calcio EV de inmediato, con monitor", "clave", "Estabiliza la membrana del miocardio en minutos; no baja el potasio."),
      mg("insulina", "Insulina regular con dextrosa EV y salbutamol nebulizado", "clave", "Meten el potasio dentro de las células en 15–30 minutos."),
      mg("eliminar", "Eliminar potasio: diuréticos de asa si orina, resinas de intercambio y diálisis si no responde", "clave", "Retiran el potasio del cuerpo."),
      mg("suspender", "Suspender enalapril, espironolactona e ibuprofeno; hidratar", "clave", "Trata la causa."),
      mg("bicarbonato", "Bicarbonato si hay acidosis metabólica significativa", "util", "Útil en acidosis; efecto modesto."),
      mg("potasio-oral", "Dar jugo de naranja para hidratarlo", "riesgoso", "Aporta potasio."),
    ],
  },
  debrief: {
    diagnosis: "Hiperpotasemia grave (7,4 mEq/l) con alteraciones electrocardiográficas, por enalapril, espironolactona e ibuprofeno, con insuficiencia renal aguda sobre crónica y acidosis metabólica, en varón diabético de 68 años.",
    pathologies: [
      { name: "Hiperpotasemia grave", role: "principal", why: "Potasio mayor de 6,5 con cambios en el ECG." },
      { name: "Insuficiencia renal aguda sobre crónica", role: "asociada", why: "Por AINE y deshidratación." },
      { name: "Infarto, seudohiperpotasemia", role: "diferencial", why: "Se descartan por la clínica y el ECG." },
    ],
    reasoning: [
      "Causa: menor excreción renal de potasio por enfermedad renal y fármacos (IECA y espironolactona reducen la aldosterona; los AINE reducen el filtrado y la renina).",
      "Mecanismo: el potasio extracelular alto despolariza parcialmente las membranas, inactiva canales de sodio y altera la conducción cardíaca.",
      "Consecuencia: debilidad muscular, T picudas, PR largo, QRS ancho, bradicardia y, finalmente, fibrilación ventricular o asistolia.",
    ],
    epidemiology:
      "La hiperpotasemia es frecuente en pacientes con enfermedad renal crónica, diabetes e insuficiencia cardíaca tratados con IECA, ARA II o antagonistas de la aldosterona, sobre todo en adultos mayores. Los AINE son un desencadenante frecuente y evitable.",
    management: [
      "ECG inmediato; si hay cambios, tratar sin esperar.",
      "Estabilizar: gluconato de calcio.",
      "Redistribuir: insulina con glucosa, salbutamol, bicarbonato si hay acidosis.",
      "Eliminar: diuréticos, resinas o diálisis; suspender las causas.",
    ],
    sources: ["Sociedad Argentina de Nefrología — Recomendaciones sobre trastornos del potasio.", "Guías KDIGO de enfermedad renal crónica."],
    pearls: ["IECA + espironolactona + AINE + riñón = hiperpotasemia.", "ECG con cambios = calcio ya.", "Calcio no baja el potasio: protege el corazón."],
    pitfalls: ["Esperar otra muestra con cambios en el ECG.", "Indicar AINE a pacientes renales."],
    tribunal: [
      qa("¿Qué cambios en el ECG produce la hiperpotasemia?", "En orden progresivo: ondas T altas y picudas, PR largo y aplanamiento de la onda P, ensanchamiento del QRS, patrón sinusoidal, y fibrilación ventricular o asistolia."),
      qa("¿Qué causas de hiperpotasemia hay que conocer?", "Menor excreción (insuficiencia renal, hipoaldosteronismo, IECA, ARA II, espironolactona, AINE, trimetoprima), salida de las células (acidosis, lisis tumoral, rabdomiólisis, déficit de insulina, betabloqueantes, digoxina) y seudohiperpotasemia por hemólisis o leucocitosis."),
      qa("¿Por qué no se usa el gluconato de calcio para bajar el potasio?", "Porque no modifica la concentración de potasio: antagoniza su efecto en la membrana de las células cardíacas y estabiliza el miocardio en minutos, ganando tiempo para las medidas que lo redistribuyen y eliminan."),
    ],
  },
};
