import { act, qa } from "../build";
import type { CaseExtra } from "../types";

/** Tanda 1: más interrogatorio, más examen y preguntas del tribunal. */
export const batch1: Record<string, CaseExtra> = {
  "aborto-incompleto": {
    anamnesis: [
      act("previos", "¿Tuvo embarazos o pérdidas antes?", "util", "“Es mi primer embarazo.”", "Dos o más pérdidas seguidas (aborto recurrente) obligan a estudiar causas; una sola pérdida es frecuente y no se estudia."),
      act("eco-previa", "¿Le habían hecho una ecografía en este embarazo?", "util", "“Una a las 6 semanas, decía que todavía no se veía bien.”", "Confirma que era intrauterino; una ecografía previa con embrión vivo cambia poco el manejo actual."),
      act("anticoncepcion", "¿Quiere cuidarse ahora o buscar otro embarazo?", "util", "“Queremos volver a intentar, pero no sé cuándo.”", "Orienta la consejería posaborto: la fertilidad vuelve en dos semanas."),
      act("mareo", "¿Se mareó o se desmayó?", "clave", "“Un poco de mareo al levantarme.”", "El mareo ortostático puede ser el primer signo de una pérdida importante: obliga a mirar los signos vitales con cuidado."),
    ],
    exam: [act("abdomen", "Palpación abdominal", "util", "Abdomen blando, leve dolor hipogástrico, sin defensa.", "Un abdomen con defensa o muy doloroso orientaría a infección o perforación.")],
    tribunal: [
      qa("¿Cómo clasificás los abortos espontáneos según la clínica?", "Amenaza (sangrado con cuello cerrado y embrión vivo), en curso o inevitable (cuello abierto, contracciones), incompleto (expulsión parcial con restos), completo (expulsión total, cuello que se cierra), diferido o retenido (embrión sin vitalidad sin expulsión) y séptico (con infección)."),
      qa("¿Cuál es la causa más frecuente de aborto espontáneo en el primer trimestre?", "Las alteraciones cromosómicas del embrión, sobre todo trisomías, presentes en más de la mitad de los casos."),
      qa("¿Por qué se prefiere la AMEU al legrado con cureta?", "Porque es igual de eficaz, se hace con anestesia local, tiene menos riesgo de perforación, menos sangrado y menos sinequias (síndrome de Asherman)."),
      qa("¿Cuándo indicás inmunoglobulina anti-D?", "En toda mujer Rh negativa no sensibilizada con un aborto, embarazo ectópico, mola o sangrado del embarazo, dentro de las 72 h."),
    ],
  },
  "acv-isquemico-ventana": {
    anamnesis: [
      act("habla", "¿Cómo habla? ¿Entiende lo que le dicen?", "util", "“Dice palabras sueltas, raras, y parece que no entiende bien.”", "Afasia mixta (expresión y comprensión): compromiso del hemisferio dominante."),
      act("cefalea", "¿Tuvo dolor de cabeza fuerte o vómitos antes?", "util", "“No, no se quejó de nada.”", "Cefalea brusca y vómitos orientarían a hemorragia."),
      act("antecedentes", "¿Fuma, tiene colesterol alto o tuvo infartos?", "util", "“Fuma, y el colesterol alto no lo trata.”", "Factores de riesgo vascular para la prevención secundaria."),
      act("caida", "¿Se cayó o se golpeó la cabeza al empezar?", "util", "“No, estaba sentada.”", "Un golpe podría causar un hematoma: cambia la indicación de trombólisis."),
    ],
    exam: [act("glucemia", "Glucemia capilar", "util", "128 mg/dl (ya la midieron en la ambulancia).", "La hipoglucemia es el imitador de ACV más importante: se mide antes de todo.")],
    tribunal: [
      qa("¿Cuáles son las contraindicaciones principales de la trombólisis en el ACV isquémico?", "Hemorragia en la TC, más de 4,5 h de evolución, TA > 185/110 que no se controla, ACV o TEC grave en los últimos 3 meses, cirugía mayor reciente, sangrado activo, plaquetas < 100.000, RIN > 1,7 o anticoagulantes directos recientes, glucemia < 50 mg/dl."),
      qa("¿Qué irriga la arteria cerebral media y qué da su oclusión?", "La cara lateral del hemisferio: corteza motora y sensitiva de cara y miembro superior, áreas del lenguaje en el hemisferio dominante. Su oclusión da hemiparesia y hemihipoestesia faciobraquial contralateral, afasia (dominante) o heminegligencia (no dominante) y hemianopsia."),
      qa("¿Qué es la penumbra isquémica?", "El tejido que rodea al núcleo del infarto, con flujo reducido que lo deja sin función pero todavía viable: es el que se salva con la reperfusión a tiempo."),
      qa("¿Qué diferencia hay entre ACV y AIT?", "En el AIT el déficit es transitorio y sin lesión en las imágenes; en el ACV hay infarto establecido. Un AIT es una alarma: el riesgo de ACV en los días siguientes es alto (escala ABCD2)."),
    ],
  },
  "anafilaxia-picadura": {
    anamnesis: [
      act("tiempo", "¿Cuánto tardaron en empezar los síntomas?", "clave", "“Fue enseguida, en cinco minutos.”", "El inicio en minutos tras la exposición es típico de la anafilaxia; cuanto más rápido, más grave suele ser."),
      act("alergias", "¿Tiene otras alergias a alimentos o medicamentos?", "util", "“No, ninguna.”", "Descarta otros desencadenantes."),
      act("autoinyector", "¿Tiene adrenalina autoinyectable?", "util", "“No, nunca me la indicaron.”", "Después de una anafilaxia se indica tenerla y saber usarla."),
    ],
    exam: [act("abdomen", "Palpación abdominal", "neutro", "Blando, levemente doloroso en forma difusa.", "El dolor abdominal es un síntoma de anafilaxia, pero el examen no cambia la conducta.")],
    tribunal: [
      qa("¿Cuáles son los criterios clínicos de anafilaxia?", "Inicio agudo con compromiso de piel o mucosas más compromiso respiratorio o hipotensión; o dos o más sistemas (piel, respiratorio, cardiovascular, digestivo) tras un alérgeno probable; o hipotensión tras un alérgeno conocido."),
      qa("¿Por qué la adrenalina va intramuscular en el muslo y no subcutánea?", "Porque por vía intramuscular en el vasto lateral se alcanza el pico de concentración más rápido y de forma más predecible; la subcutánea se absorbe mal por la vasoconstricción local."),
      qa("¿Qué es la reacción bifásica?", "La reaparición de síntomas horas después (hasta 72 h, en general en las primeras 12) sin nueva exposición. Por eso se observa al paciente tras la mejoría."),
      qa("¿Qué fármacos complican el manejo de la anafilaxia?", "Los betabloqueantes (resistencia a la adrenalina; se usa glucagón) y los IECA (pueden empeorarla)."),
    ],
  },
  "anemia-ferropenica-menorragia": {
    anamnesis: [
      act("piernas", "¿Siente las piernas inquietas a la noche?", "util", "“Sí, no las puedo quedar quietas.”", "El síndrome de piernas inquietas se asocia a ferropenia y mejora con hierro."),
      act("donante", "¿Dona sangre?", "util", "“No.”", "La donación frecuente es otra causa de pérdida de hierro."),
      act("medicacion", "¿Toma antiácidos u omeprazol?", "util", "“No.”", "La falta de ácido gástrico reduce la absorción del hierro oral."),
      act("cirugia", "¿Le hicieron alguna cirugía de estómago o intestino?", "util", "“No.”", "Una cirugía bariátrica o gástrica causa malabsorción de hierro."),
    ],
    exam: [act("tiroides", "Palpación tiroidea", "neutro", "Normal.", "No aporta a esta anemia.")],
    tribunal: [
      qa("¿Cómo interpretás ferritina y saturación en una anemia microcítica?", "Ferritina baja confirma ferropenia. Ferritina normal o alta con saturación baja sugiere anemia de procesos crónicos. Ferritina y saturación normales con microcitosis orientan a talasemia."),
      qa("¿Cuáles son las causas de anemia microcítica?", "Ferropenia (la más frecuente), talasemias, anemia de procesos crónicos, anemia sideroblástica e intoxicación por plomo."),
      qa("¿Qué esperás después de iniciar hierro oral?", "Aumento de reticulocitos a los 7–10 días y de la hemoglobina de 1–2 g/dl en 3–4 semanas. Se sigue 3 meses después de normalizar la Hb para llenar depósitos."),
      qa("¿A quién le pedís endoscopia por ferropenia?", "A varones y mujeres posmenopáusicas sin causa clara (endoscopia alta y colonoscopia), y a cualquiera con síntomas digestivos o que no responde al hierro."),
    ],
  },
  "anticoncepcion-de-emergencia": {
    anamnesis: [
      act("vacunas", "¿Tenés la vacuna del VPH y la de hepatitis B?", "util", "“Creo que la del VPH sí, en la escuela.”", "Oportunidad de completar vacunas del Calendario Nacional."),
      act("violencia", "¿Te sentís cuidada en tu relación? ¿Alguien te presiona o te controla?", "clave", "“Sí, me trata bien.”", "La pregunta por violencia se hace siempre, en privado, sin juzgar."),
      act("medicacion", "¿Tomás algún medicamento (por ejemplo, para la epilepsia)?", "util", "“No.”", "Algunos inductores enzimáticos reducen la eficacia del levonorgestrel."),
    ],
    exam: [act("peso", "Peso e IMC", "util", "IMC 22.", "Con obesidad la eficacia del levonorgestrel podría ser menor; el DIU de cobre no se afecta.")],
    tribunal: [
      qa("¿Cómo actúa el levonorgestrel como anticoncepción de emergencia?", "Inhibe o retrasa el pico de LH y la ovulación. No impide la implantación ni interrumpe un embarazo establecido, por eso no es abortivo."),
      qa("¿Cuál es el método de emergencia más eficaz?", "El DIU de cobre colocado dentro de los 5 días; además queda como anticoncepción de larga duración."),
      qa("¿Desde qué edad un adolescente puede consentir solo una práctica de salud?", "Según el Código Civil y Comercial (art. 26), desde los 13 años para tratamientos no invasivos que no comprometan su salud, y desde los 16 se lo considera adulto para el cuidado del propio cuerpo."),
      qa("¿Qué ley garantiza el acceso gratuito a métodos anticonceptivos?", "La Ley 25.673, que crea el Programa Nacional de Salud Sexual y Procreación Responsable."),
    ],
  },
  "apendicitis-aguda": {
    anamnesis: [
      act("orden", "¿Qué vino primero, el dolor o los vómitos?", "clave", "“Primero el dolor, después vomité.”", "Dolor antes que vómitos sugiere cuadro quirúrgico; al revés, gastroenteritis."),
      act("comidas", "¿Comió algo en mal estado o hay otros enfermos en la casa?", "util", "“No, nadie más está enfermo.”", "Un brote familiar orientaría a gastroenteritis."),
      act("previo", "¿Tuvo dolores así antes?", "util", "“No, nunca.”", "Episodios repetidos de dolor en fosa ilíaca harían pensar en otros diagnósticos."),
    ],
    exam: [
      act("temperatura", "Temperatura axilar y rectal", "neutro", "Axilar 37,9 °C; rectal 38,6 °C.", "La diferencia axilo-rectal mayor de 1 °C es un signo clásico, de poco valor."),
      act("talopercusion", "Talopercusión y salto", "util", "Dolor en fosa ilíaca derecha al golpear el talón.", "Otro signo de irritación peritoneal."),
    ],
    tribunal: [
      qa("¿Qué es el score de Alvarado y cómo se usa?", "Suma 10 puntos: migración del dolor, anorexia, náuseas/vómitos, dolor en FID (2), rebote, fiebre, leucocitosis (2) y desviación a la izquierda. 7 o más: alta probabilidad; 4–6: observar o imagen; menos de 4: poco probable."),
      qa("¿Por qué el dolor empieza en el ombligo?", "Porque al principio es visceral: el apéndice se origina en el intestino medio, inervado por T10, que proyecta al ombligo. Cuando se irrita el peritoneo parietal, el dolor se vuelve somático y se localiza en la fosa ilíaca derecha."),
      qa("¿En qué pacientes el diagnóstico es más difícil?", "En niños pequeños, adultos mayores, embarazadas (el apéndice sube) y apéndices retrocecales o pélvicos."),
      qa("¿Qué complicaciones tiene la apendicitis?", "Perforación con peritonitis localizada (plastrón o absceso) o generalizada, y sepsis."),
    ],
  },
  "artritis-reumatoidea-temprana": {
    anamnesis: [
      act("funcion", "¿Qué cosas le cuesta hacer?", "util", "“Abrir frascos, abrochar botones, coser.”", "La repercusión funcional orienta la urgencia del tratamiento."),
      act("familia", "¿Hay enfermedades reumáticas en la familia?", "util", "“Mi abuela tenía las manos deformadas.”", "Carga genética."),
      act("infeccion", "¿Tuvo una infección, diarrea o fiebre con manchas antes de los dolores?", "util", "“No.”", "Orientaría a artritis reactiva o viral."),
      act("embarazo", "¿Planea un embarazo?", "clave", "“No por ahora.”", "El metotrexato es teratogénico: se indica anticoncepción eficaz."),
    ],
    exam: [act("pulmonar", "Auscultación pulmonar", "util", "Normal.", "La AR puede afectar el pulmón (enfermedad intersticial), y el metotrexato también.")],
    tribunal: [
      qa("¿Cuáles son los criterios ACR/EULAR 2010 de AR?", "Suman: número y tipo de articulaciones afectadas (más puntos si son pequeñas y más de 10), serología (FR y anti-CCP), reactantes de fase aguda y duración ≥ 6 semanas. Con 6 o más de 10 puntos se clasifica como AR."),
      qa("¿Qué diferencia el dolor inflamatorio del mecánico?", "El inflamatorio tiene rigidez matinal de más de 30–60 minutos, mejora con la actividad y se acompaña de tumefacción blanda; el mecánico empeora con el uso, mejora con el reposo y la rigidez dura minutos."),
      qa("¿Qué manifestaciones extraarticulares conocés?", "Nódulos reumatoideos, enfermedad pulmonar intersticial, serositis, vasculitis, síndrome de Sjögren secundario, anemia, epiescleritis y mayor riesgo cardiovascular."),
      qa("¿Qué controles requiere el metotrexato?", "Hemograma, hepatograma y función renal periódicos; ácido fólico; evitar alcohol; anticoncepción; y recordar que es una toma semanal."),
    ],
  },
  "bronquiolitis-lactante": {
    anamnesis: [
      act("fiebre", "¿Tuvo fiebre alta?", "util", "“Unas líneas, 37,8.”", "Fiebre alta persistente haría pensar en neumonía o en otra causa."),
      act("lactancia", "¿Toma el pecho o mamadera?", "util", "“Pecho exclusivo.”", "La lactancia materna protege contra formas graves."),
      act("hermanos", "¿Tiene hermanos?", "neutro", "“Uno de 4 años.”", "Ya se sabe por los contactos; no cambia la conducta."),
    ],
    exam: [act("fontanela", "Fontanela anterior", "util", "Normotensa.", "Una fontanela deprimida indicaría deshidratación.")],
    tribunal: [
      qa("¿Cuáles son los criterios de internación en bronquiolitis?", "Edad menor de 3 meses con dificultad respiratoria, hipoxemia (saturación por debajo del umbral), apneas, Tal grave (9 o más), mala tolerancia oral o deshidratación, factores de riesgo (prematurez, cardiopatía, displasia broncopulmonar, inmunodeficiencia) y condiciones sociales que impidan el control."),
      qa("¿Qué evalúa el puntaje de Tal?", "Frecuencia respiratoria, sibilancias, uso de músculos accesorios (tiraje) y cianosis o saturación. Cada uno de 0 a 3: 4 o menos leve, 5 a 8 moderada, 9 o más grave."),
      qa("¿Por qué no se dan corticoides ni antibióticos?", "Porque no cambian la evolución de una infección viral de la vía aérea pequeña: el tratamiento es de sostén (oxígeno si hay hipoxemia, hidratación, desobstrucción nasal)."),
      qa("¿Cómo se previene la bronquiolitis por VSR?", "Con la vacuna contra el VSR en embarazadas (entre las 32 y 36 semanas), el anticuerpo monoclonal en grupos de riesgo, la lactancia, el lavado de manos y evitar el humo de tabaco."),
    ],
  },
  "celulitis-pierna": {
    anamnesis: [
      act("tiempo", "¿Cómo fue avanzando el rojo?", "util", "“Empezó como una mancha en el tobillo y fue subiendo.”", "La extensión progresiva ayuda a medir la respuesta al tratamiento."),
      act("vacunas", "¿Tiene la antitetánica al día?", "util", "“La última hace más de diez años.”", "Corresponde refuerzo ante una puerta de entrada en la piel."),
      act("inmuno", "¿Toma corticoides o tiene alguna enfermedad de las defensas?", "util", "“No.”", "La inmunosupresión cambia el espectro de gérmenes y el lugar de tratamiento."),
    ],
    exam: [act("edema", "Comparar ambas piernas y buscar edema y várices", "util", "Várices bilaterales y edema crónico de tobillos; la izquierda más edematosa y roja.", "La insuficiencia venosa predispone a la celulitis y a las recurrencias.")],
    tribunal: [
      qa("¿Qué diferencia hay entre erisipela y celulitis?", "La erisipela es más superficial (dermis y linfáticos), con bordes netos y sobreelevados, casi siempre por estreptococo. La celulitis compromete la dermis profunda y el tejido subcutáneo, con bordes difusos."),
      qa("¿Qué signos te hacen sospechar fascitis necrotizante?", "Dolor desproporcionado al aspecto de la piel, rápida progresión, ampollas hemorrágicas, necrosis, crepitación, anestesia de la piel y compromiso sistémico grave."),
      qa("¿Cuándo internás una celulitis?", "Con sepsis o compromiso sistémico importante, falla del tratamiento oral, inmunosupresión, comorbilidades descompensadas, sospecha de infección necrotizante o imposibilidad de seguimiento."),
    ],
  },
  "cetoacidosis-debut-dm1": {
    anamnesis: [
      act("peso", "¿Cuánto peso bajó?", "util", "“Unos cinco kilos en un mes, comiendo bien.”", "Pérdida de peso con buen apetito: catabolismo por déficit de insulina."),
      act("respira", "¿Le cuesta respirar?", "util", "“Respira rápido y hondo.”", "Respiración de Kussmaul: compensación de la acidosis."),
      act("conciencia", "¿Está más dormida o confundida?", "clave", "“Hoy está más dormida.”", "La alteración de conciencia es un signo de gravedad y de riesgo de edema cerebral."),
    ],
    exam: [act("perfusion", "Perfusión periférica y relleno capilar", "clave", "Relleno capilar de 3 s, pulsos débiles.", "Define la necesidad de expansión inicial con cristaloides.")],
    tribunal: [
      qa("¿Cuáles son los criterios diagnósticos de cetoacidosis diabética?", "Hiperglucemia (en general > 200–250 mg/dl), acidosis metabólica (pH < 7,3 o bicarbonato < 15–18) y cetonemia o cetonuria."),
      qa("¿Por qué el potasio corporal está bajo aunque el sérico sea normal o alto?", "Porque la acidosis y la falta de insulina sacan potasio de las células y la diuresis osmótica lo pierde por orina. Al dar insulina el potasio vuelve a la célula y cae: por eso se repone antes o junto con la insulina."),
      qa("¿Qué complicación temida tiene el tratamiento en niños y adolescentes?", "El edema cerebral: se previene corrigiendo líquidos y glucemia de manera gradual y evitando bicarbonato salvo casos extremos."),
      qa("¿Qué diferencia hay con el estado hiperglucémico hiperosmolar?", "El hiperosmolar es típico de la DM2 en adultos mayores: glucemias muy altas (> 600), osmolaridad > 320, deshidratación grave y poca o nula cetosis."),
    ],
  },
  "miocardiopatia-chagasica": {
    anamnesis: [
      act("palpitaciones", "¿Siente palpitaciones?", "util", "“Sí, como que el corazón se salta.”", "Las arritmias son frecuentes en la miocardiopatía chagásica."),
      act("embolia", "¿Tuvo debilidad de un lado del cuerpo o problemas para hablar?", "util", "“No.”", "Los trombos del aneurisma apical pueden embolizar: el Chagas es causa de ACV."),
      act("hijos", "¿Sus hijos se hicieron el análisis?", "clave", "“No.”", "Los hijos de madres con Chagas deben estudiarse; en este caso se ofrece el testeo familiar."),
    ],
    exam: [act("pulso", "Pulso y ritmo", "util", "Pulso irregular por extrasístoles.", "Arritmia ventricular.")],
    tribunal: [
      qa("¿Cómo se transmite el Chagas en la Argentina hoy?", "La vía vectorial (vinchuca, Triatoma infestans) está controlada en gran parte del país; hoy predomina la vía vertical (de madre a hijo). También por transfusiones y trasplantes (controlados) y, raramente, oral."),
      qa("¿Cuáles son las formas clínicas del Chagas crónico?", "Indeterminada (la mayoría: serología positiva sin lesión), cardíaca (miocardiopatía, arritmias, bloqueos, aneurisma apical, muerte súbita) y digestiva (megaesófago, megacolon)."),
      qa("¿Qué hallazgo del ECG es típico?", "Bloqueo completo de rama derecha con hemibloqueo anterior izquierdo; también extrasístoles ventriculares y bloqueos AV."),
      qa("¿A quién se le indica tratamiento antiparasitario?", "A todos los casos agudos, congénitos, niños y adolescentes, y mujeres en edad fértil (para prevenir la transmisión vertical); en adultos con forma crónica se evalúa caso por caso. Se usa benznidazol o nifurtimox."),
    ],
  },
  "cirrosis-peritonitis-bacteriana": {
    anamnesis: [
      act("hepatitis", "¿Le hicieron estudios de hepatitis B o C?", "util", "“No sé.”", "Coinfecciones que cambian el pronóstico y el tratamiento."),
      act("ultimo", "¿Cuándo fue la última vez que tomó alcohol?", "clave", "“Anteayer.”", "Riesgo de síndrome de abstinencia en las próximas horas: hay que anticiparlo."),
      act("peso", "¿Aumentó de peso o se le agrandó la cintura?", "util", "“Me queda chico el pantalón.”", "La ascitis aumenta el peso y el perímetro abdominal."),
    ],
    exam: [act("temblor", "Temblor, sudoración y agitación", "util", "Temblor fino leve, sin agitación.", "Signos tempranos de abstinencia alcohólica.")],
    tribunal: [
      qa("¿Qué es el gradiente de albúmina suero-ascitis?", "La diferencia entre la albúmina del suero y la del líquido: 1,1 g/dl o más indica hipertensión portal (cirrosis, insuficiencia cardíaca); menos de 1,1 orienta a causas peritoneales (carcinomatosis, tuberculosis)."),
      qa("¿Qué precipita una encefalopatía hepática?", "Infecciones, hemorragia digestiva, constipación, deshidratación y diuréticos, hipopotasemia, benzodiacepinas y opioides, insuficiencia renal."),
      qa("¿Qué es el síndrome hepatorrenal?", "Una insuficiencia renal funcional en la cirrosis avanzada por vasoconstricción renal intensa, secundaria a la vasodilatación esplácnica. Se trata con albúmina y vasoconstrictores (terlipresina); la solución definitiva es el trasplante."),
      qa("¿Qué evalúa la escala de Child-Pugh?", "Bilirrubina, albúmina, tiempo de protrombina, ascitis y encefalopatía. Clasifica en A, B y C, con pronóstico progresivamente peor."),
    ],
  },
  "cistitis-mujer-joven": {
    anamnesis: [
      act("orina-olor", "¿La orina tiene olor fuerte o está turbia?", "neutro", "“Un poco turbia.”", "Es inespecífico."),
      act("vaciado", "¿Retiene mucho la orina, por ejemplo, en el trabajo?", "util", "“Sí, a veces no voy en todo el día.”", "Retener la orina favorece las infecciones; es una medida de prevención."),
      act("alergia", "¿Es alérgica a algún antibiótico?", "util", "“No.”", "Define el antibiótico a indicar."),
    ],
    exam: [act("temperatura", "Temperatura", "util", "36,6 °C.", "Sin fiebre: apoya infección limitada a la vejiga.")],
    tribunal: [
      qa("¿Qué define a una ITU complicada?", "Infección en varones, embarazadas, con alteraciones anatómicas o funcionales de la vía urinaria, sonda, litiasis, inmunosupresión, insuficiencia renal o diabetes descompensada, o con compromiso del parénquima (pielonefritis)."),
      qa("¿Qué es la bacteriuria asintomática y cuándo se trata?", "Urocultivo positivo sin síntomas. Solo se busca y se trata en embarazadas y antes de procedimientos urológicos invasivos."),
      qa("¿Por qué no se usa trimetoprima-sulfametoxazol empírico?", "Porque la resistencia de E. coli supera el 20 % en la Argentina: por encima de ese umbral un antibiótico no sirve como empírico."),
      qa("¿Qué es la ITU recurrente y cómo se previene?", "Tres o más episodios en un año o dos en seis meses. Se previene con medidas generales, profilaxis poscoital o continua, y estrógenos vaginales en posmenopáusicas."),
    ],
  },
  "colecistitis-aguda": {
    anamnesis: [
      act("fiebre", "¿Tuvo escalofríos?", "util", "“Algún escalofrío anoche.”", "Escalofríos con ictericia orientarían a colangitis."),
      act("embarazos", "¿Cuántos embarazos tuvo?", "util", "“Tres.”", "Los embarazos son factor de riesgo de litiasis biliar."),
      act("dieta", "¿Hizo dietas muy estrictas o bajó mucho de peso rápido?", "util", "“No.”", "El descenso brusco de peso favorece la formación de cálculos."),
    ],
    exam: [act("vesicula", "Palpación de vesícula (masa en hipocondrio)", "util", "No se palpa vesícula.", "Una vesícula palpable e indolora con ictericia (Courvoisier-Terrier) orienta a tumor periampular.")],
    tribunal: [
      qa("¿Qué son los criterios de Tokio para colecistitis?", "Signos locales (Murphy, dolor o masa en hipocondrio derecho), signos sistémicos (fiebre, PCR, leucocitosis) e imagen compatible. Con los tres se confirma; además gradúan la gravedad en I, II y III."),
      qa("¿Qué es la tríada de Charcot y la péntada de Reynolds?", "Charcot: fiebre, ictericia y dolor en hipocondrio derecho (colangitis). Reynolds suma shock y confusión (colangitis grave)."),
      qa("¿Qué hallazgos ecográficos apoyan colecistitis?", "Litiasis (o lito impactado), pared engrosada de más de 4 mm o en doble contorno, líquido perivesicular, vesícula distendida y Murphy ecográfico."),
      qa("¿Qué es el síndrome de Mirizzi?", "La compresión del conducto hepático común por un cálculo impactado en el bacinete o el cístico, que produce ictericia obstructiva."),
    ],
  },
  "colico-renal": {
    anamnesis: [
      act("dieta", "¿Come mucha sal, carne o toma gaseosas?", "util", "“Como bastante asado y tomo gaseosa.”", "Dieta rica en sal, proteína animal y fructosa favorece la litiasis."),
      act("familia", "¿Hay cálculos en la familia?", "util", "“Mi papá también tuvo.”", "La carga familiar aumenta el riesgo."),
      act("gota", "¿Tiene gota o ácido úrico alto?", "util", "“No que sepa.”", "La hiperuricemia se asocia a litiasis úrica."),
    ],
    exam: [act("hidratacion", "Hidratación", "util", "Mucosas algo secas.", "Confirma la baja ingesta de líquidos.")],
    tribunal: [
      qa("¿De qué están hechos los cálculos más frecuentes?", "Oxalato de calcio (el 70–80 %), fosfato de calcio, ácido úrico (radiolúcidos), estruvita (por infección con gérmenes ureasa positivos) y cistina (genéticos)."),
      qa("¿Cuáles son los puntos de estrechez del uréter?", "La unión pieloureteral, el cruce con los vasos ilíacos y la unión ureterovesical (la más estrecha, donde se impactan con más frecuencia)."),
      qa("¿Cuándo un cólico renal es una urgencia urológica?", "Con fiebre o infección (pielonefritis obstructiva), riñón único, insuficiencia renal aguda, anuria o dolor refractario."),
      qa("¿Qué probabilidad tiene un cálculo de expulsarse solo?", "Los menores de 5 mm se eliminan en la mayoría de los casos; entre 5 y 10 mm la probabilidad baja y ayudan los alfabloqueantes; los mayores de 10 mm suelen necesitar tratamiento."),
    ],
  },
  "conjuntivitis-bacteriana": {
    anamnesis: [
      act("tiempo", "¿Desde cuándo?", "util", "“Desde ayer.”", "Cuadro agudo."),
      act("alergias", "¿Tiene alergias o estornuda mucho?", "util", "“No.”", "Aleja la conjuntivitis alérgica."),
      act("lentes-contacto", "¿Usa lentes de contacto?", "util", "“No, es chico.”", "En usuarios de lentes de contacto, un ojo rojo obliga a descartar queratitis (Pseudomonas, Acanthamoeba)."),
    ],
    exam: [act("parpados", "Párpados y piel periorbitaria", "util", "Sin edema ni eritema periorbitario.", "Edema y eritema del párpado con fiebre orientarían a celulitis periorbitaria u orbitaria.")],
    tribunal: [
      qa("¿Qué signos de un ojo rojo te obligan a derivar urgente?", "Dolor intenso, fotofobia, disminución de la agudeza visual, pupila fija o irregular, córnea opaca o con lesión, hiperemia periquerática y antecedente de trauma o de uso de lentes de contacto."),
      qa("¿Cómo diferenciás conjuntivitis bacteriana, viral y alérgica?", "Bacteriana: secreción purulenta, párpados pegados. Viral: secreción acuosa, adenopatía preauricular, contexto de resfrío. Alérgica: prurito intenso, lagrimeo, estacional, antecedentes de atopía."),
      qa("¿Qué es la oftalmía neonatal?", "Conjuntivitis en el recién nacido por gonococo o clamidia adquiridos en el parto: es una urgencia y se previene con profilaxis ocular al nacer."),
    ],
  },
  "convulsion-febril-simple": {
    anamnesis: [
      act("fiebre-inicio", "¿Cuándo empezó la fiebre?", "util", "“Hoy a la tarde, subió de golpe.”", "Las convulsiones febriles suelen ocurrir en las primeras horas, con el ascenso rápido de la temperatura."),
      act("primera", "¿Es la primera vez?", "clave", "“Sí, la primera.”", "La recurrencia cambia la información para la familia, no el manejo."),
      act("golpe", "¿Se golpeó durante la convulsión?", "util", "“No, estaba en la cama.”", "Un traumatismo complicaría la evaluación neurológica."),
    ],
    exam: [act("hidratacion", "Hidratación", "util", "Hidratado.", "Descarta alteraciones por deshidratación.")],
    tribunal: [
      qa("¿Cuál es la definición de convulsión febril simple?", "Crisis generalizada, de menos de 15 minutos, única en 24 horas, con fiebre y sin infección del sistema nervioso, en un niño de 6 meses a 5 años con desarrollo normal."),
      qa("¿Cuándo hacés punción lumbar en un niño con convulsión y fiebre?", "Con signos meníngeos o alteración de conciencia persistente, menores de 12 meses con vacunas incompletas, uso previo de antibióticos que pueda enmascarar una meningitis, o convulsión compleja con sospecha de infección."),
      qa("¿Qué factores aumentan el riesgo de recurrencia?", "Primera crisis antes de los 18 meses, antecedentes familiares, fiebre baja al momento de la crisis y poco tiempo entre el inicio de la fiebre y la convulsión."),
      qa("¿Cómo se trata una convulsión que dura más de 5 minutos?", "Con una benzodiacepina: midazolam bucal o intranasal, diazepam rectal, o lorazepam/midazolam endovenoso si hay acceso."),
    ],
  },
  "coqueluche-lactante": {
    anamnesis: [
      act("fiebre", "¿Tuvo fiebre?", "util", "“No, nada.”", "La coqueluche casi no da fiebre; la fiebre alta orientaría a otra causa o a complicación."),
      act("inicio", "¿Cómo empezó?", "util", "“Como un resfrío, con mocos y algo de tos.”", "Fase catarral: es la más contagiosa y la menos reconocida."),
      act("convulsion", "¿Tuvo convulsiones?", "util", "“No.”", "Las convulsiones son una complicación grave (hipoxia, encefalopatía)."),
    ],
    exam: [act("saturacion", "Saturación durante un acceso", "clave", "Cae a 84 % durante el acceso y se recupera.", "Las desaturaciones en los accesos son signo de gravedad en lactantes.")],
    tribunal: [
      qa("¿Cuáles son las fases de la coqueluche?", "Catarral (1–2 semanas, como un resfrío, muy contagiosa), paroxística (2–6 semanas, accesos de tos con estridor inspiratorio y vómitos) y de convalecencia (semanas a meses)."),
      qa("¿Por qué los lactantes pequeños son el grupo de mayor riesgo?", "Porque todavía no completaron el esquema de vacunas; presentan apneas, cianosis, neumonía, convulsiones e hipertensión pulmonar por la hiperleucocitosis."),
      qa("¿Qué incluye el Calendario Nacional contra la coqueluche?", "Componente pertussis en la quíntuple/séxtuple a los 2, 4 y 6 meses y refuerzo a los 15–18 meses, triple bacteriana celular a los 5 años, dTpa a los 11 años y dTpa en cada embarazo desde la semana 20."),
      qa("¿A quién se da quimioprofilaxis?", "A todos los convivientes y contactos estrechos, independientemente de su estado de vacunación, con azitromicina."),
    ],
  },
  "crisis-asmatica-nino": {
    anamnesis: [
      act("frecuencia", "¿Cuántas veces por semana usa el salbutamol? ¿Se despierta de noche por la tos?", "util", "“Varias veces por semana, y se despierta seguido.”", "Asma no controlada: el tratamiento de base es insuficiente."),
      act("atopia", "¿Tiene rinitis alérgica o eczema?", "util", "“Sí, estornuda mucho en primavera.”", "Atopía: perfil alérgico."),
      act("casa", "¿Hay humedad, alfombras, mascotas o fumadores en la casa?", "util", "“Hay humedad en la pieza.”", "Los hongos y los ácaros son desencadenantes que se pueden reducir."),
    ],
    exam: [act("pef", "Pico flujo en la consulta", "util", "55 % del predicho.", "Objetiva la gravedad de la obstrucción.")],
    tribunal: [
      qa("¿Cuáles son los signos de crisis asmática grave?", "No puede hablar o habla con palabras sueltas, agitación o somnolencia, uso marcado de músculos accesorios, saturación menor de 92 %, PEF menor de 50 %, tórax silencioso, cianosis, bradicardia."),
      qa("¿Qué es el control del asma según GINA?", "Se evalúa con síntomas diurnos, despertares nocturnos, uso de rescate y limitación de la actividad en las últimas 4 semanas: bien controlada, parcialmente controlada o no controlada."),
      qa("¿Cuál es el tratamiento de base del asma persistente en niños?", "Corticoides inhalados en dosis bajas como primer escalón de control, con aerocámara; se escala según el control."),
      qa("¿Por qué se usa aerocámara?", "Porque mejora el depósito del fármaco en el pulmón, reduce el depósito en la boca (y los efectos adversos) y no requiere coordinación entre el disparo y la inspiración."),
    ],
  },
  "laringitis-crup": {
    anamnesis: [
      act("fiebre", "¿Tiene fiebre alta?", "util", "“Unas líneas.”", "Fiebre alta con aspecto tóxico orientaría a traqueítis bacteriana o epiglotitis."),
      act("color", "¿Se puso morado o pálido?", "clave", "“No.”", "La cianosis indicaría obstrucción grave."),
      act("lactancia", "¿Toma líquidos?", "util", "“Sí, agua y leche.”", "Tolera la vía oral: apoya el manejo ambulatorio."),
    ],
    exam: [act("oximetria", "Oximetría de pulso", "util", "97 %.", "La hipoxemia es tardía en el crup: indicaría gravedad.")],
    tribunal: [
      qa("¿Qué evalúa el puntaje de Westley?", "Estridor, tiraje, entrada de aire, cianosis y nivel de conciencia. 2 o menos: leve; 3 a 7: moderado; 8 o más: grave."),
      qa("¿Por qué la subglotis es el punto crítico en el niño?", "Porque es la parte más estrecha de la vía aérea infantil y está rodeada por el cartílago cricoides, un anillo completo que no se expande: un poco de edema reduce mucho el calibre."),
      qa("¿Qué diferencia el crup de la epiglotitis?", "El crup tiene pródromo viral, tos perruna y buen estado general. La epiglotitis es brusca, con fiebre alta, aspecto tóxico, babeo, disfagia, posición en trípode y sin tos perruna."),
    ],
  },
  "delirium-adulto-mayor": {
    anamnesis: [
      act("sueno", "¿Cómo está durmiendo?", "util", "“De día duerme y de noche está despierto y agitado.”", "La inversión del ciclo sueño-vigilia es típica del delirium."),
      act("alcohol", "¿Toma alcohol o dejó de tomar de golpe?", "util", "“No toma.”", "La abstinencia alcohólica es una causa de delirium que se trata distinto (con benzodiacepinas)."),
      act("audicion", "¿Usa anteojos o audífonos?", "util", "“Anteojos, pero los dejó en casa.”", "El déficit sensorial favorece el delirium: devolverle los anteojos es parte del tratamiento."),
      act("dolor", "¿Se queja de dolor?", "util", "“Se toca la panza.”", "El dolor no tratado y la retención urinaria causan agitación."),
    ],
    exam: [act("tacto", "Tacto rectal", "util", "Fecaloma en la ampolla rectal.", "La constipación con fecaloma es un desencadenante tratable.")],
    tribunal: [
      qa("¿Qué es el CAM y qué criterios tiene?", "El Confusion Assessment Method: 1) inicio agudo y curso fluctuante, 2) inatención, y 3) pensamiento desorganizado o 4) alteración del nivel de conciencia. Requiere 1 y 2 más 3 o 4."),
      qa("¿Qué diferencia el delirium de la demencia?", "El delirium es agudo, fluctuante, con inatención y alteración de conciencia, y suele ser reversible. La demencia es gradual (meses o años), con conciencia conservada hasta etapas avanzadas."),
      qa("¿Cuáles son las formas clínicas del delirium?", "Hiperactivo (agitación), hipoactivo (somnolencia, apatía: el más frecuente y el que más se pasa por alto) y mixto."),
      qa("¿Qué fármacos son causas frecuentes de delirium?", "Anticolinérgicos (antihistamínicos, antiespasmódicos, tricíclicos), benzodiacepinas, opioides, corticoides, y la suspensión brusca de alcohol o benzodiacepinas."),
    ],
  },
};
