import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const iraPrerrenal: ClinicalCase = {
  id: "insuficiencia-renal-aguda-prerrenal",
  level: 3,
  area: "Nefrourología",
  setting: "Guardia",
  patient: { age: 81, ageUnit: "años", sex: "F", context: "Hipertensa e insuficiente cardíaca. Vive con la hija." },
  frequency: "frecuente",
  intro: "“Hace tres días que tiene diarrea y casi no come. Hoy está muy débil, orina muy poco y le noto el pulso raro.” (relata la hija)",
  vitals: { TA: "92/54 mmHg", FC: "56 lpm", FR: "18 rpm", "T°": "36,6 °C", "SatO₂": "96 %" },
  anamnesis: [
    act("medicacion", "¿Qué medicamentos toma? ¿Empezó alguno nuevo?", "clave", "“Enalapril, furosemida y espironolactona. Hace una semana el traumatólogo le dio diclofenac por la rodilla.”", "IECA + diurético + AINE (“triple whammy”) en una paciente deshidratada: combinación clásica de insuficiencia renal aguda."),
    act("diarrea", "¿Cuántas deposiciones por día? ¿Toma líquidos?", "clave", "“Cinco o seis por día, líquidas. Toma poca agua porque no tiene sed.”", "La pérdida de volumen es la causa prerrenal; los ancianos tienen menos sed."),
    act("diuresis", "¿Cuánto orina?", "clave", "“Muy poquito, oscuro.”", "Oliguria: indicador de gravedad."),
    act("sangre", "¿Vio sangre en la orina, tiene fiebre o manchas en la piel?", "util", "“No.”", "Orientaría a causas renales intrínsecas (glomerulonefritis, nefritis intersticial alérgica)."),
    act("prostata", "¿Tiene dificultad para orinar o dolor abajo?", "util", "“No.”", "Descarta una causa obstructiva."),
    act("basal", "¿Tiene análisis recientes de función renal?", "util", "“El mes pasado tenía creatinina 1,0.”", "Permite confirmar que es agudo y cuantificar la caída."),
    act("tejer", "¿Qué le gusta hacer?", "neutro", "“Crucigramas.”", "No orienta."),
  ],
  exam: [
    act("volemia", "Signos de volemia: mucosas, yugulares, ortostatismo", "clave", "Mucosas secas, yugulares colapsadas, pliegue positivo, hipotensión ortostática.", "Hipovolemia: confirma el componente prerrenal."),
    act("congestion", "Signos de congestión: crepitantes, edemas", "clave", "Sin crepitantes ni edemas.", "Importa para la reposición: tiene insuficiencia cardíaca, pero hoy está seca."),
    act("globo", "Palpación del hipogastrio", "util", "Sin globo vesical.", "Descarta retención urinaria."),
    act("neuro", "Estado neurológico", "util", "Lúcida, algo apática, debilidad muscular generalizada.", "La hiperpotasemia puede dar debilidad muscular."),
  ],
  studies: [
    study("Laboratorio", "renal", "Creatinina, urea e ionograma", "clave", "Creatinina 3,2 mg/dl, urea 148 mg/dl, Na 132, K 6,4 mEq/l. Bicarbonato 17.", "Insuficiencia renal aguda (creatinina triplicada) con hiperpotasemia grave y acidosis metabólica."),
    study("Electrofisiología", "ecg", "Electrocardiograma", "clave", "Bradicardia sinusal de 56 lpm, ondas T picudas, PR prolongado.", "La hiperpotasemia con cambios en el ECG es una emergencia: hay que estabilizar la membrana miocárdica ya."),
    study("Laboratorio", "orina", "Orina completa e índices urinarios (sodio urinario, fracción excretada de sodio)", "util", "Densidad 1.028, sedimento sin cilindros granulosos; FENa 0,6 % (con diurético: FE de urea 28 %).", "FENa < 1 % (o FE urea < 35 % si toma diuréticos) y sedimento inactivo: prerrenal."),
    study("Imágenes", "eco", "Ecografía renal", "util", "Riñones de tamaño normal, sin hidronefrosis.", "Descarta obstrucción; el tamaño normal apoya un cuadro agudo."),
    study("Imágenes", "tc-contraste", "Tomografía de abdomen con contraste para estudiar la diarrea", "riesgoso", "No se realizó.", "El contraste iodado puede empeorar la función renal en plena insuficiencia aguda."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("prerrenal", "Insuficiencia renal aguda prerrenal (IECA + diurético + AINE con deshidratación), con hiperpotasemia grave", true, "Diarrea, baja ingesta, “triple whammy”, hipovolemia, creatinina triplicada, FENa baja, sedimento inactivo y K 6,4 con cambios electrocardiográficos."),
      dx("nta", "Necrosis tubular aguda", false, "Puede seguir a una prerrenal prolongada, pero daría FENa > 2 %, orina isostenúrica y cilindros granulosos."),
      dx("nefritis", "Nefritis intersticial aguda por AINE", false, "Daría fiebre, rash, eosinofilia y leucocituria estéril, con FENa alta."),
      dx("obstructiva", "Insuficiencia renal posrenal", false, "La ecografía no muestra hidronefrosis y no hay globo vesical."),
      dx("erc", "Enfermedad renal crónica avanzada", false, "La creatinina basal era normal hace un mes y los riñones tienen tamaño normal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("calcio", "Gluconato de calcio endovenoso de inmediato", "clave", "Estabiliza la membrana miocárdica en la hiperpotasemia con cambios en el ECG; actúa en minutos."),
      mg("insulina", "Insulina con dextrosa (y salbutamol nebulizado) para meter el potasio en las células", "clave", "Bajan el potasio en 15–30 minutos mientras se corrige la causa."),
      mg("suspender", "Suspender enalapril, furosemida, espironolactona y diclofenac", "clave", "Retira las causas y los fármacos que retienen potasio."),
      mg("hidratacion", "Hidratación con cristaloides en bolos controlados y reevaluación clínica", "clave", "Corrige la causa prerrenal; por la insuficiencia cardíaca, con controles frecuentes de congestión."),
      mg("monitoreo", "Monitoreo cardíaco, diuresis horaria y control de ionograma en 2–4 h", "util", "Evalúa la respuesta y la necesidad de diálisis (hiperpotasemia refractaria, acidosis grave, sobrecarga, uremia)."),
      mg("furosemida", "Furosemida en dosis altas para que orine", "riesgoso", "La paciente está hipovolémica: un diurético empeora la perfusión renal."),
      mg("potasio", "Suero con cloruro de potasio por la diarrea", "riesgoso", "Con K 6,4 aportar potasio puede causar una arritmia mortal."),
    ],
  },
  debrief: {
    diagnosis: "Insuficiencia renal aguda prerrenal (KDIGO 3) por deshidratación en paciente con IECA, diuréticos y AINE (“triple whammy”), con hiperpotasemia grave con cambios electrocardiográficos y acidosis metabólica.",
    pathologies: [
      { name: "Insuficiencia renal aguda prerrenal", role: "principal", why: "Caída del filtrado por hipoperfusión, con túbulos que funcionan (FENa baja)." },
      { name: "Hiperpotasemia grave", role: "asociada", why: "K 6,4 con cambios en el ECG: la complicación que mata." },
      { name: "Deshidratación por diarrea", role: "asociada", why: "Desencadenante." },
      { name: "Necrosis tubular aguda", role: "diferencial", why: "Evolución si la hipoperfusión se prolonga." },
      { name: "Nefritis intersticial por AINE y causa obstructiva", role: "diferencial", why: "Otras causas a descartar." },
    ],
    reasoning: [
      "Causa: hipovolemia por diarrea y poca ingesta, en un riñón “sin defensas” por los fármacos.",
      "Mecanismo: el riñón mantiene el filtrado con dos ajustes: dilata la arteriola aferente (prostaglandinas) y contrae la eferente (angiotensina II). El AINE bloquea las prostaglandinas, el IECA bloquea la angiotensina II y el diurético reduce aún más el volumen: el filtrado se desploma.",
      "Consecuencia: cae la excreción de potasio (más con espironolactona e IECA), de ácidos y de urea → hiperpotasemia, acidosis y azoemia. El potasio alto altera el potencial de reposo del miocardio: T picudas, PR largo, bradicardia y riesgo de paro.",
      "Como los túbulos siguen sanos, reabsorben ávidamente sodio y agua: FENa baja y orina concentrada. Si la isquemia dura, se instala la necrosis tubular.",
    ],
    epidemiology:
      "La insuficiencia renal aguda es muy frecuente en adultos mayores hospitalizados y en la guardia, y la causa prerrenal es la más común. La edad avanzada, la enfermedad renal o cardíaca previa, la deshidratación (diarrea, calor) y los fármacos nefrotóxicos combinados son los principales factores de riesgo. La combinación IECA o ARA II + diurético + AINE multiplica el riesgo, sobre todo en los primeros 30 días del AINE.",
    management: [
      "Hiperpotasemia con cambios en el ECG: gluconato de calcio, luego insulina con dextrosa y salbutamol; resinas o diálisis según la evolución.",
      "Suspender fármacos nefrotóxicos y que retienen potasio; ajustar dosis de todo lo que se elimina por riñón.",
      "Reponer volumen con cristaloides, reevaluando la congestión.",
      "Diferenciar prerrenal, renal y posrenal (clínica, índices urinarios, sedimento, ecografía).",
      "Diálisis de urgencia si hay hiperpotasemia refractaria, acidosis grave, sobrecarga de volumen o uremia; al alta, evitar AINE y reintroducir los fármacos con control.",
    ],
    sources: [
      "Sociedad Argentina de Nefrología — Recomendaciones sobre injuria renal aguda.",
      "Guías KDIGO de injuria renal aguda, adoptadas por la SAN.",
    ],
    pearls: [
      "IECA + diurético + AINE = “triple whammy”.",
      "Hiperpotasemia con cambios en el ECG: calcio primero.",
      "FENa < 1 %: prerrenal (si toma diuréticos, usá la FE de urea).",
    ],
    pitfalls: ["Dar furosemida a una paciente deshidratada.", "Agregar potasio a los sueros.", "Indicar AINE en ancianos con IECA y diuréticos."],
  },
};
