import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const cirrosisPbe: ClinicalCase = {
  id: "cirrosis-peritonitis-bacteriana",
  level: 3,
  area: "Gastroenterología",
  setting: "Guardia",
  patient: { age: 56, ageUnit: "años", sex: "M", context: "Alcohol desde joven. Lo trae la esposa." },
  frequency: "frecuente",
  intro: "“Hace un mes se le hinchó la panza, y desde ayer tiene fiebre, le duele todo el abdomen y está como dormido, confundido.” (relata la esposa)",
  vitals: { TA: "100/60 mmHg", FC: "104 lpm", FR: "20 rpm", "T°": "38,1 °C", "SatO₂": "95 %" },
  anamnesis: [
    act("alcohol", "¿Cuánto alcohol toma? ¿Le dijeron que tiene problemas de hígado?", "clave", "“Un litro de vino por día hace 30 años. Le dijeron que tenía el hígado graso.”", "El alcohol es una de las principales causas de cirrosis."),
    act("sangrado", "¿Vomitó sangre o hizo materia fecal negra?", "clave", "“No.”", "Una hemorragia por várices cambia la prioridad del manejo."),
    act("confusion", "¿Desde cuándo está confundido? ¿Tiene constipación?", "util", "“Desde ayer. No va de cuerpo hace tres días.”", "Encefalopatía hepática desencadenada por la infección y la constipación."),
    act("farmacos", "¿Toma medicamentos? ¿Antiinflamatorios?", "clave", "“Ibuprofeno por el dolor de panza.”", "Los AINE en el cirrótico precipitan insuficiencia renal y sangrado."),
    act("orina", "¿Orina normal?", "util", "“Poco.”", "Posible deterioro renal (síndrome hepatorrenal)."),
    act("equipo", "¿Qué le gusta hacer?", "neutro", "“Pescar.”", "No orienta."),
  ],
  exam: [
    act("ascitis", "Abdomen: matidez desplazable, dolor", "clave", "Ascitis moderada con matidez desplazable, dolor difuso a la palpación sin defensa marcada.", "Ascitis con fiebre y dolor: sospechar peritonitis bacteriana espontánea."),
    act("estigmas", "Estigmas de hepatopatía crónica", "clave", "Arañas vasculares, eritema palmar, ginecomastia, ictericia leve, circulación colateral.", "Confirman la cirrosis con hipertensión portal."),
    act("encefalopatia", "Asterixis y estado de conciencia", "clave", "Asterixis presente, desorientado en tiempo, somnoliento.", "Encefalopatía hepática grado II."),
    act("piernas", "Edemas", "util", "Edemas bilaterales.", "Retención de sodio y agua."),
  ],
  studies: [
    study("Laboratorio", "paracentesis", "Paracentesis diagnóstica: recuento celular, albúmina, proteínas, Gram y cultivo (en frasco de hemocultivo)", "clave", "480 polimorfonucleares/mm³. Gradiente albúmina suero-ascitis 1,8. Cultivo: E. coli.", "≥ 250 PMN/mm³ diagnostica peritonitis bacteriana espontánea; gradiente ≥ 1,1 indica hipertensión portal."),
    study("Laboratorio", "lab", "Hemograma, hepatograma, coagulograma, función renal, ionograma", "clave", "Plaquetas 72.000, bilirrubina 3,2, albúmina 2,6, RIN 1,8, creatinina 1,6, Na 129.", "Child-Pugh C. La creatinina en aumento anticipa el síndrome hepatorrenal."),
    study("Imágenes", "eco", "Ecografía abdominal con doppler", "util", "Hígado nodular, esplenomegalia, ascitis; vena porta permeable.", "Confirma la cirrosis y descarta trombosis portal y tumor."),
    study("Laboratorio", "coagulacion-antes", "Corregir la coagulación con plasma antes de punzar", "riesgoso", "No se realizó.", "La paracentesis es segura aun con RIN alto y plaquetas bajas; esperar o transfundir de rutina demora el diagnóstico."),
    study("Imágenes", "tc", "Tomografía con contraste de urgencia", "innecesario", "No se realizó.", "No hace falta para diagnosticar la peritonitis y el contraste empeora la función renal."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("pbe", "Peritonitis bacteriana espontánea en cirrosis alcohólica descompensada, con encefalopatía hepática", true, "Cirrótico con ascitis, fiebre, dolor abdominal y encefalopatía; líquido ascítico con ≥ 250 PMN/mm³ y cultivo con E. coli."),
      dx("secundaria", "Peritonitis secundaria (perforación)", false, "Daría abdomen agudo, múltiples gérmenes, proteínas muy altas y glucosa baja en el líquido; acá es un solo germen."),
      dx("hepatitis", "Hepatitis alcohólica aguda", false, "Ictericia marcada, hepatomegalia dolorosa, leucocitosis; no explica el líquido ascítico infectado."),
      dx("hepatorrenal", "Síndrome hepatorrenal aislado", false, "Puede aparecer como complicación, pero no explica la fiebre ni la infección del líquido."),
      dx("tuberculosa", "Peritonitis tuberculosa", false, "Linfocitos en el líquido y gradiente bajo."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("atb", "Cefalosporina de tercera generación endovenosa (ceftriaxona o cefotaxima)", "clave", "Tratamiento empírico de la peritonitis bacteriana espontánea."),
      mg("albumina", "Albúmina endovenosa (1,5 g/kg el día 1 y 1 g/kg el día 3)", "clave", "Reduce el síndrome hepatorrenal y la mortalidad."),
      mg("lactulosa", "Lactulosa para la encefalopatía", "clave", "Trata la encefalopatía al reducir la absorción de amonio."),
      mg("suspender", "Suspender AINE y diuréticos mientras dure el deterioro renal", "util", "Protege la función renal."),
      mg("profilaxis", "Al alta: profilaxis secundaria con antibiótico y evaluar trasplante; abstinencia alcohólica", "util", "La peritonitis recurre con frecuencia y marca mal pronóstico."),
      mg("aines", "Seguir con ibuprofeno para el dolor", "riesgoso", "Precipitan insuficiencia renal y sangrado digestivo en el cirrótico."),
    ],
  },
  debrief: {
    diagnosis: "Peritonitis bacteriana espontánea por E. coli en cirrosis alcohólica descompensada (Child-Pugh C), con encefalopatía hepática grado II y deterioro de la función renal.",
    pathologies: [
      { name: "Peritonitis bacteriana espontánea", role: "principal", why: "Infección del líquido ascítico sin foco quirúrgico." },
      { name: "Cirrosis alcohólica", role: "asociada", why: "Enfermedad de base." },
      { name: "Encefalopatía hepática", role: "asociada", why: "Desencadenada por la infección y la constipación." },
      { name: "Síndrome hepatorrenal", role: "asociada", why: "Riesgo inminente (creatinina en ascenso)." },
      { name: "Peritonitis secundaria", role: "diferencial", why: "Requiere cirugía." },
    ],
    reasoning: [
      "Causa: el alcohol daña el hígado durante años: esteatosis, hepatitis, fibrosis y cirrosis.",
      "Mecanismo: la cirrosis produce hipertensión portal y vasodilatación esplácnica; el riñón retiene sodio y agua (ascitis). Las bacterias intestinales translocan al líquido ascítico, que tiene pocas defensas (proteínas bajas).",
      "Consecuencia: infección del líquido con fiebre y dolor; la respuesta inflamatoria empeora la vasodilatación y la perfusión renal (hepatorrenal). El amonio que el hígado no depura atraviesa la barrera hematoencefálica (encefalopatía).",
      "La albúmina mejora el volumen circulante efectivo y protege al riñón.",
    ],
    epidemiology:
      "La cirrosis es una causa importante de muerte en adultos de 45 a 65 años, más frecuente en varones. En la Argentina sus causas principales son el alcohol, la enfermedad hepática grasa asociada a disfunción metabólica y las hepatitis virales. La peritonitis bacteriana espontánea afecta a alrededor del 10–30 % de los cirróticos internados con ascitis.",
    management: [
      "Paracentesis diagnóstica en todo cirrótico con ascitis que se interna o se descompensa (sin esperar corregir la coagulación).",
      "PMN ≥ 250: cefalosporina de tercera generación más albúmina.",
      "Tratar la encefalopatía (lactulosa, buscar desencadenantes).",
      "Evitar AINE, contrastes y nefrotóxicos; ajustar diuréticos.",
      "Profilaxis secundaria, abstinencia de alcohol, evaluación para trasplante.",
    ],
    sources: [
      "Sociedad Argentina de Hepatología — Recomendaciones de manejo de las complicaciones de la cirrosis.",
      "Guías de la Asociación Europea para el Estudio del Hígado (EASL), adoptadas en el país.",
    ],
    pearls: ["Cirrótico con ascitis que empeora: punzar.", "PMN ≥ 250 = peritonitis bacteriana espontánea.", "Antibiótico + albúmina."],
    pitfalls: ["No punzar por la coagulopatía.", "Usar AINE.", "Olvidar la albúmina."],
  },
};
