import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const artritisGonococica: ClinicalCase = {
  id: "artritis-septica-gonococica",
  level: 2,
  area: "Infectología",
  setting: "Guardia",
  patient: { age: 22, ageUnit: "años", sex: "F", context: "Pareja nueva hace dos meses, sin preservativo. Menstruó hace 4 días." },
  frequency: "frecuente",
  intro: "“Me duele e inflama la muñeca, antes me dolían otras articulaciones. Tengo fiebre y me salieron unas ampollitas en la mano.”",
  vitals: { TA: "112/70 mmHg", FC: "102 lpm", FR: "18 rpm", "T°": "38,4 °C", "SatO₂": "99 %" },
  anamnesis: [
    act("sexual", "¿Parejas nuevas, preservativo, flujo o ardor?", "clave", "“Pareja nueva, sin preservativo; algo de flujo.”", "Gonococo."),
    act("migratorio", "¿Cómo fue el dolor articular?", "clave", "“Fue pasando de una a otra.”", "Fase bacteriémica."),
    act("embarazo", "¿Posibilidad de embarazo?", "clave", "“Test negativo.”", "Tratamiento."),
    act("trauma", "¿Golpe o inyección en la articulación?", "util", "“No.”", "Otras causas."),
    act("autoinmune", "¿Lupus o artritis conocida?", "util", "“No.”", "Reumatológico."),
    act("trabajo", "¿De qué trabajás?", "neutro", "“En un bar.”", "No orienta."),
  ],
  exam: [
    act("articular", "Muñeca", "clave", "Caliente, hinchada, con dolor a la extensión de tendones.", "Tenosinovitis y artritis."),
    act("piel", "Piel", "clave", "Pústulas pequeñas en la mano.", "Dermatitis."),
    act("gineco", "Examen ginecológico", "util", "Cervicitis mucopurulenta.", "Foco."),
  ],
  studies: [
    study("Otros", "artrocentesis", "Artrocentesis con citoquímico, Gram y cultivo", "clave", "45.000 leucocitos, neutrófilos; cultivo negativo.", "Excluye otras artritis."),
    study("Microbiología", "pcr", "PCR para gonococo en cuello, faringe y recto, y hemocultivos", "clave", "Gonococo positivo en cuello.", "Fuente."),
    study("Laboratorio", "its", "VIH, sífilis, hepatitis, clamidia", "clave", "Clamidia positiva; resto negativo.", "Coinfección."),
    study("Imágenes", "rmn", "RM de muñeca de rutina", "innecesario", "No se realizó.", "No aporta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("gonococo", "Infección gonocócica diseminada con artritis y tenosinovitis", true, "Mujer joven, migratoria, pústulas, tenosinovitis y gonococo."),
      dx("fr", "Fiebre reumática", false, "No hay faringitis y hay gonococo."),
      dx("lupus", "Lupus", false, "Se explica por gonococo."),
      dx("estafilococo", "Artritis por estafilococo", false, "Es monoarticular, sin tenosinovitis."),
      dx("reactiva", "Artritis reactiva", false, "Es tras infección, sin pústulas."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("ceftriaxona", "Ceftriaxona EV o IM de 1 g cada 24 horas", "clave", "Primera línea."),
      mg("clamidia", "Doxiciclina por clamidia", "clave", "Coinfección."),
      mg("pareja", "Tratar parejas sexuales", "clave", "Previene reinfección."),
      mg("drenaje", "Artrocentesis repetida si es necesario", "util", "Si hay derrame."),
      mg("corticoide", "Infiltrar corticoide en la muñeca", "riesgoso", "Puede empeorar la infección."),
      mg("azitro", "Azitromicina sola", "riesgoso", "Hay resistencia."),
    ],
  },
  debrief: {
    diagnosis: "Infección gonocócica diseminada con artritis de muñeca, tenosinovitis y pústulas, con clamidia, en mujer de 22 años.",
    pathologies: [
      { name: "Gonorrea diseminada", role: "principal", why: "Bacteriemia por gonococo." },
      { name: "Clamidia", role: "asociada", why: "Coinfección." },
      { name: "Fiebre reumática, lupus, artritis reactiva", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: N. gonorrhoeae, con menstruación como factor.",
      "Mecanismo: paso a sangre desde mucosa.",
      "Consecuencia: artritis, tenosinovitis y dermatitis.",
    ],
    epidemiology:
      "La gonorrea ha aumentado en Argentina, con cepas cada vez más resistentes. La infección puede ser asintomática, especialmente en mujeres. La menstruación y el embarazo favorecen la diseminación. Siempre hay que buscar otras ITS y tratar a las parejas.",
    management: [
      "Artrocentesis.",
      "PCR de mucosas.",
      "Ceftriaxona.",
      "Parejas e ITS.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de ITS.", "CDC — Sexually Transmitted Infections Treatment Guidelines."],
    pearls: ["Migratoria más pústulas más tenosinovitis.", "Cultivo a veces negativo.", "Buscar otras ITS."],
    pitfalls: ["No preguntar sexualidad.", "Olvidar la pareja."],
    tribunal: [
      qa("¿Cuál es la causa más frecuente de artritis séptica en adultos no jóvenes?", "Staphylococcus aureus, y se presenta como monoartritis aguda."),
      qa("¿Qué valores sugieren artritis séptica en el líquido?", "Más de 50.000 leucocitos con predominio de neutrófilos."),
      qa("¿Qué antibiótico cubre gonococo hoy?", "Ceftriaxona, porque las quinolonas y otros perdieron eficacia."),
    ],
  },
};
