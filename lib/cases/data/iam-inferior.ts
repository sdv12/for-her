import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const iamInferior: ClinicalCase = {
  id: "iam-inferior-vd",
  level: 2,
  area: "Cardiovascular",
  setting: "Guardia",
  patient: { age: 58, ageUnit: "años", sex: "M" },
  frequency: "frecuente",
  intro: "“Hace una hora me agarró un dolor en el pecho, como una opresión, que se me va a la mandíbula. Estoy transpirado y con náuseas.”",
  vitals: { TA: "105/70 mmHg", FC: "56 lpm", FR: "20 rpm", "SatO₂": "95 %", "T°": "36,4 °C" },
  anamnesis: [
    act("dolor", "¿Cómo es el dolor? ¿Cambia al respirar o al moverse?", "clave", "“Es una opresión fuerte en el medio del pecho, no cambia con nada. Nunca me pasó.”", "Dolor opresivo retroesternal, mayor de 20 minutos, irradiado a mandíbula y que no varía con la respiración ni la posición: típico de isquemia."),
    act("hora", "¿A qué hora empezó exactamente?", "clave", "“A las 21, hace 60 minutos.”", "El tiempo desde el inicio define la estrategia de reperfusión: cuanto antes, más miocardio se salva."),
    act("riesgo", "¿Fuma? ¿Diabetes, colesterol, presión?", "clave", "“Fumo un atado por día, tengo diabetes y el colesterol alto.”", "Factores de riesgo cardiovascular que aumentan la probabilidad de un síndrome coronario."),
    act("diseccion", "¿El dolor es desgarrante o se le va a la espalda?", "clave", "“No, es una opresión adelante.”", "La disección aórtica es el diagnóstico que hay que descartar antes de anticoagular o trombolizar."),
    act("contra", "¿Tuvo ACV, sangrados, cirugías recientes o toma anticoagulantes?", "clave", "“No, nada.”", "Busca contraindicaciones de fibrinólisis por si no hay hemodinamia disponible a tiempo."),
    act("pde5", "¿Usó sildenafil o cocaína en los últimos días?", "clave", "“No.”", "Los inhibidores de la fosfodiesterasa 5 contraindican los nitratos; la cocaína cambia el manejo (evitar betabloqueantes)."),
    act("ulcera", "¿Tuvo úlcera o problemas para tomar aspirina?", "util", "“No.”", "Para indicar antiagregantes con seguridad."),
  ],
  exam: [
    act("killip", "Auscultación cardíaca y pulmonar", "clave", "Ruidos normofonéticos, sin soplos; pulmones sin rales.", "Sin rales ni tercer ruido: Killip I (sin insuficiencia cardíaca)."),
    act("yugulares", "Yugulares con el paciente a 45°", "clave", "Ingurgitación yugular con pulmones limpios; signo de Kussmaul positivo.", "Hipotensión + yugulares ingurgitadas + pulmones limpios = infarto del ventrículo derecho."),
    act("pulsos", "Pulsos y presión en ambos brazos", "clave", "Pulsos simétricos; 105/70 en ambos brazos.", "Una asimetría importante haría sospechar disección aórtica."),
    act("general", "Aspecto general", "util", "Pálido, sudoroso, ansioso.", "Activación simpática por el dolor y la isquemia."),
  ],
  studies: [
    study("Electrofisiología", "ecg", "ECG de 12 derivaciones (en menos de 10 minutos)", "clave", "Supradesnivel del ST de 3 mm en DII, DIII y aVF con infradesnivel especular en DI y aVL. Bradicardia sinusal de 56 lpm.", "Supra ST en cara inferior: oclusión aguda, probablemente de la coronaria derecha. El ECG se hace y se lee en los primeros 10 minutos."),
    study("Electrofisiología", "derechas", "Derivaciones derechas (V3R–V4R)", "clave", "Supradesnivel del ST de 1,5 mm en V4R.", "Confirma compromiso del ventrículo derecho: cambia el tratamiento (precarga dependiente, nada de nitratos)."),
    study("Laboratorio", "troponina", "Troponina ultrasensible", "util", "Elevada.", "Confirma necrosis, pero con supra ST no se espera su resultado para reperfundir."),
    study("Laboratorio", "lab", "Hemograma, coagulograma, función renal e ionograma", "util", "Hb 14, plaquetas 250.000, coagulograma normal, creatinina 1,0, K 4,1.", "Basal antes de antitrombóticos y contraste."),
    study("Imágenes", "rx", "Radiografía de tórax", "util", "Sin congestión, mediastino de ancho normal.", "Apoya la ausencia de IC y no sugiere disección."),
    study("Imágenes", "eco", "Ecocardiograma", "neutro", "Hipoquinesia inferior y del ventrículo derecho.", "Útil, pero no debe demorar la reperfusión."),
    study("Laboratorio", "dimero", "Dímero D", "innecesario", "Elevado.", "Inespecífico; no aporta frente a un supra ST."),
    study("Imágenes", "angiotc", "AngioTC de tórax", "innecesario", "Sin disección.", "Solo si la clínica hace sospechar disección; acá retrasa el tratamiento."),
    study("Otros", "ergo", "Prueba ergométrica", "riesgoso", "No se realiza.", "Contraindicada en un síndrome coronario agudo en curso."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("iam", "IAM con elevación del ST de cara inferior con compromiso del ventrículo derecho, Killip I", true, "Dolor isquémico de 1 hora, supra ST en DII-DIII-aVF con espejo, supra en V4R e hipotensión con yugulares ingurgitadas y pulmones limpios."),
      dx("angina", "Angina inestable", false, "No da supradesnivel persistente del ST ni elevación de troponina."),
      dx("pericarditis", "Pericarditis aguda", false, "Supra ST difuso y cóncavo, sin imagen especular, con dolor que cambia con la posición y la respiración."),
      dx("diseccion", "Disección aórtica", false, "Dolor desgarrante irradiado a la espalda, asimetría de pulsos, mediastino ensanchado."),
      dx("tep", "Tromboembolismo pulmonar", false, "Disnea súbita, taquicardia, hipoxemia; no da supra ST inferior con espejo."),
    ],
  },
  management: {
    prompt: "Son las 22 h. El hospital más cercano con hemodinamia está a 40 minutos. ¿Qué indicás?",
    options: [
      mg("aas", "Aspirina 162–325 mg masticada", "clave", "Reduce la mortalidad: se da apenas se sospecha el SCA."),
      mg("p2y12", "Segundo antiagregante (clopidogrel, dosis de carga)", "clave", "La doble antiagregación es parte del tratamiento inicial."),
      mg("reperfusion", "Reperfusión urgente: angioplastia primaria si se puede hacer dentro de los 120 minutos; si no, fibrinólisis dentro de los 30 minutos de la llegada", "clave", "Abrir la arteria es el tratamiento. A 40 minutos de hemodinamia, la derivación inmediata para angioplastia primaria está dentro del tiempo."),
      mg("anticoag", "Anticoagulación (heparina) asociada a la estrategia de reperfusión", "clave", "Forma parte del tratamiento antitrombótico."),
      mg("monitor", "Monitoreo continuo, desfibrilador disponible y vía venosa", "clave", "La fibrilación ventricular es la principal causa de muerte precoz en el infarto."),
      mg("expansion", "Expansión con solución fisiológica si hay hipotensión", "util", "El ventrículo derecho isquémico depende de la precarga."),
      mg("nitro", "Nitroglicerina sublingual para el dolor", "riesgoso", "En el infarto de ventrículo derecho con presión límite provoca hipotensión grave por caída de la precarga."),
      mg("betabloq", "Betabloqueante endovenoso", "riesgoso", "Bradicardia, presión límite e infarto de VD: puede precipitar shock o bloqueo AV."),
      mg("oxigeno", "Oxígeno a todos los pacientes", "innecesario", "Solo si la saturación es menor de 90 %: el oxígeno innecesario no beneficia y puede dañar."),
      mg("esperar", "Esperar la troponina para decidir", "riesgoso", "Con supra ST el diagnóstico es electrocardiográfico: esperar es perder miocardio."),
    ],
  },
  debrief: {
    diagnosis: "IAM con elevación del ST de cara inferior con compromiso del ventrículo derecho, Killip I, de 1 hora de evolución.",
    pathologies: [
      { name: "Infarto agudo de miocardio con elevación del ST", role: "principal", why: "Oclusión trombótica aguda de una coronaria (acá, la derecha)." },
      { name: "Infarto del ventrículo derecho", role: "asociada", why: "Complicación del infarto inferior que cambia el tratamiento." },
      { name: "Bloqueo AV / bradiarritmias", role: "asociada", why: "La coronaria derecha irriga el nodo AV en la mayoría de las personas." },
      { name: "Disección aórtica", role: "diferencial", why: "Contraindica los antitrombóticos: hay que descartarla clínicamente." },
      { name: "Pericarditis y TEP", role: "diferencial", why: "Otras causas de dolor torácico con cambios en el ECG." },
    ],
    reasoning: [
      "Causa: rotura o erosión de una placa de ateroma en la coronaria derecha → trombo que ocluye la luz.",
      "Mecanismo: la necrosis transmural de la cara inferior da supra ST en DII, DIII y aVF. La coronaria derecha irriga también el ventrículo derecho y, en la mayoría, el nodo AV (y a menudo el sinusal): por eso bradicardia y riesgo de bloqueo, sumado al reflejo vagal de Bezold-Jarisch.",
      "Consecuencia: el ventrículo derecho isquémico no bombea → cae la precarga del izquierdo → hipotensión con yugulares ingurgitadas y pulmones limpios.",
      "Por eso, en el infarto de VD: volumen sí; nitratos, diuréticos y morfina generosa no. “Tiempo es músculo”: la reperfusión precoz es lo que cambia el pronóstico.",
    ],
    epidemiology:
      "El infarto es más frecuente en varones de 45 a 65 años; en las mujeres aparece en promedio unos 10 años más tarde, por la protección estrogénica antes de la menopausia. Los factores de riesgo (tabaco, diabetes, dislipemia, HTA, obesidad, sedentarismo) son muy prevalentes en Argentina según la Encuesta Nacional de Factores de Riesgo.",
    management: [
      "ECG en los primeros 10 minutos; si hay supra ST inferior, hacer derivaciones derechas.",
      "Aspirina masticada + segundo antiagregante + anticoagulación.",
      "Reperfusión: angioplastia primaria si el tiempo hasta abrir la arteria es menor de 120 minutos (ideal puerta-balón menor de 90); si no, fibrinólisis dentro de los 30 minutos de la llegada (estreptoquinasa o fibrinolíticos fibrinoespecíficos, según disponibilidad), y luego derivación.",
      "En el infarto de VD: expansión con volumen, evitar nitratos y diuréticos, tratar la bradicardia si hay inestabilidad.",
      "Oxígeno solo si saturación menor de 90 %. Monitoreo y desfibrilador disponibles.",
    ],
    sources: [
      "Sociedad Argentina de Cardiología — Consenso de Síndromes Coronarios Agudos con elevación del segmento ST.",
      "Ministerio de Salud de la Nación — Encuesta Nacional de Factores de Riesgo.",
    ],
    pearls: [
      "Infarto inferior: siempre derivaciones derechas (V4R).",
      "Tríada del infarto de VD: hipotensión, yugulares ingurgitadas, pulmones limpios.",
      "Con supra ST no se espera la troponina.",
    ],
    pitfalls: [
      "Dar nitroglicerina en un infarto de VD.",
      "Demorar la reperfusión por pedir estudios.",
      "No buscar disección aórtica antes de anticoagular.",
    ],
  },
};
