import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const pronacionDolorosa: ClinicalCase = {
  id: "pronacion-dolorosa",
  level: 1,
  area: "Traumatología",
  setting: "Guardia",
  patient: { age: 2, ageUnit: "años", sex: "F", context: "La mamá la levantó de la mano al cruzar la calle." },
  frequency: "muy-frecuente",
  intro: "“La levanté de la mano para subir el cordón, lloró y desde entonces no mueve el brazo derecho. Lo tiene colgando.” (relata la madre)",
  vitals: { FC: "118 lpm", FR: "26 rpm", "T°": "36,6 °C", Peso: "12 kg" },
  anamnesis: [
    act("mecanismo", "¿Cómo fue exactamente?", "clave", "“La levanté tirando de la mano con el brazo estirado.”", "Tracción del miembro superior extendido: mecanismo típico de la subluxación de la cabeza del radio."),
    act("caida", "¿Se cayó o se golpeó?", "clave", "“No, no se cayó.”", "Sin traumatismo directo: baja probabilidad de fractura."),
    act("previos", "¿Le pasó antes?", "util", "“Una vez el año pasado.”", "Es recurrente hasta los 5 años."),
    act("fiebre", "¿Tiene fiebre?", "util", "“No.”", "Descarta infección articular."),
    act("dolor", "¿Llora si se le toca el brazo?", "util", "“Solo si se lo muevo.”", "Dolor al movilizar."),
    act("juguete", "¿Qué juguete tiene en la mano?", "neutro", "“Un muñeco.”", "No orienta."),
  ],
  exam: [
    act("posicion", "Posición del brazo", "clave", "Brazo colgando, codo levemente flexionado y antebrazo en pronación; no lo usa para agarrar.", "Postura típica."),
    act("palpacion", "Palpación de clavícula, húmero, codo y muñeca", "clave", "Sin deformidad, sin edema, sin dolor localizado intenso.", "Descarta fractura."),
    act("neurovascular", "Pulsos y relleno capilar", "util", "Normales.", "Sin compromiso vascular."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de codo con mecanismo típico", "innecesario", "No se realizó.", "No hace falta si el mecanismo y el examen son típicos; la subluxación no se ve en la radiografía."),
    study("Laboratorio", "lab", "Laboratorio", "innecesario", "No se realizó.", "No aporta."),
    study("Otros", "observar", "Observar el uso del brazo tras la maniobra", "clave", "A los 10 minutos agarra un caramelo con esa mano.", "Confirma la reducción."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("pronacion", "Pronación dolorosa (subluxación de la cabeza del radio)", true, "Tracción del brazo extendido en una niña de 2 años, brazo en pronación que no usa, sin deformidad ni edema."),
      dx("fractura-supracondilea", "Fractura supracondílea", false, "Se produce por caída sobre la mano extendida, con edema y deformidad."),
      dx("clavicula", "Fractura de clavícula", false, "Sin dolor ni deformidad en la clavícula."),
      dx("artritis", "Artritis séptica de codo", false, "Sin fiebre ni signos inflamatorios."),
      dx("maltrato", "Lesión no accidental", false, "Mecanismo coherente con la edad; se evalúa siempre el contexto."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("reduccion", "Maniobra de reducción (hiperpronación o supinación con flexión del codo)", "clave", "Reduce en la mayoría de los casos con un chasquido."),
      mg("prevencion", "Explicar a la familia que no la levanten ni la tironeen de las manos", "clave", "Previene recurrencias."),
      mg("observar", "Reevaluar a los 15 minutos el uso del brazo", "util", "Confirma el éxito."),
      mg("rx-si-falla", "Radiografía si la maniobra falla o el mecanismo no es típico", "util", "Descarta fractura."),
      mg("yeso", "Inmovilizar con yeso", "innecesario", "No es necesario tras una reducción exitosa."),
      mg("forzar", "Forzar la extensión repetidas veces", "riesgoso", "Dolor y riesgo de lesión."),
    ],
  },
  debrief: {
    diagnosis: "Pronación dolorosa (subluxación de la cabeza del radio) derecha en niña de 2 años, por tracción del brazo extendido.",
    pathologies: [
      { name: "Pronación dolorosa", role: "principal", why: "El ligamento anular se desliza sobre la cabeza del radio." },
      { name: "Recurrencia", role: "asociada", why: "Episodio previo." },
      { name: "Fracturas, artritis, maltrato", role: "diferencial", why: "Se descartan por el mecanismo y el examen." },
    ],
    reasoning: [
      "Causa: tracción longitudinal del brazo con el codo extendido y el antebrazo en pronación.",
      "Mecanismo: el ligamento anular, laxo en niños pequeños, se interpone entre la cabeza del radio y el húmero.",
      "Consecuencia: dolor y negativa a usar el brazo, que se resuelve con la reducción.",
    ],
    epidemiology:
      "La pronación dolorosa es la lesión de codo más frecuente en menores de 5 años, con pico entre 1 y 3 años, algo más en niñas y en el brazo izquierdo. Es una consulta habitual en guardias pediátricas y recurre en una cuarta parte de los casos.",
    management: [
      "Diagnóstico clínico por mecanismo y postura.",
      "Reducción con maniobra.",
      "Radiografía solo si el mecanismo es atípico o falla la reducción.",
      "Educación para prevenir recurrencias.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Lesiones osteoarticulares frecuentes en la guardia.", "Sociedad Argentina de Ortopedia y Traumatología Infantil — Recomendaciones."],
    pearls: ["Tirón del brazo + brazo colgando en pronación.", "Maniobra y listo.", "No levantar de las manos."],
    pitfalls: ["Radiografía innecesaria.", "No preguntar el mecanismo."],
    tribunal: [
      qa("¿Qué fracturas de codo son frecuentes en niños?", "La supracondílea de húmero (la más frecuente, por caída con la mano extendida, con riesgo de lesión de la arteria braquial y del nervio mediano), la del cóndilo lateral y la de la cabeza o cuello del radio."),
      qa("¿Qué signos sugieren lesiones no accidentales en niños pequeños?", "Mecanismo incompatible con la edad o el desarrollo, demora en la consulta, relatos cambiantes, lesiones en distintos estadios, fracturas metafisarias o costales y lesiones en zonas protegidas."),
      qa("¿Cuál es la maniobra de reducción por hiperpronación?", "Con una mano en el codo y la otra en la muñeca, se prona con fuerza el antebrazo; es igual o más eficaz y menos dolorosa que la supinación con flexión."),
    ],
  },
};
