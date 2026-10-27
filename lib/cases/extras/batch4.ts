import { act, qa } from "../build";
import type { CaseExtra } from "../types";

/** Tanda 4: más interrogatorio, más examen y preguntas del tribunal. */
export const batch4: Record<string, CaseExtra> = {
  "ofidismo-yarara": {
    anamnesis: [
      act("alergia", "¿Alguna vez recibió suero de caballo o es alérgico?", "util", "“No que yo sepa.”", "Los antivenenos son de origen equino: hay que estar preparado para reacciones alérgicas."),
      act("dolor", "¿Cómo es el dolor?", "util", "“Muy fuerte, como si me quemara, y va subiendo.”", "El dolor intenso y progresivo es típico del veneno botrópico."),
      act("orina-color", "¿La orina está oscura o roja?", "util", "“No, normal.”", "Orina oscura orientaría a mioglobinuria (crotálico) o hemólisis."),
    ],
    exam: [act("perimetro", "Medir el perímetro del miembro en varios niveles", "util", "Tobillo +4 cm, pantorrilla +3 cm respecto del otro lado.", "Permite seguir la progresión del edema y la respuesta al antiveneno.")],
    tribunal: [
      qa("¿Qué serpientes venenosas hay en la Argentina y qué cuadro da cada una?", "Yarará (Bothrops): edema, dolor, necrosis y coagulopatía. Cascabel (Crotalus): neurotoxicidad (ptosis, oftalmoplejía), mialgias, mioglobinuria e insuficiencia renal, con poco edema. Coral (Micrurus): neurotoxicidad con parálisis, sin edema."),
      qa("¿Qué no hay que hacer ante una mordedura de víbora?", "Torniquetes, incisiones, succión, hielo, aplicar sustancias o dar alcohol. Se inmoviliza el miembro, se retiran anillos y calzado y se traslada rápido al hospital."),
      qa("¿Qué es el tiempo de coagulación en tubo seco?", "Se colocan 2 ml de sangre en un tubo de vidrio sin anticoagulante y se observa a los 20 minutos: si no coagula, hay coagulopatía por veneno. Es simple, rápido y sirve para indicar y controlar el antiveneno."),
    ],
  },
  "otitis-media-aguda": {
    anamnesis: [
      act("chupete", "¿Usa chupete o toma mamadera acostada?", "util", "“Mamadera a la noche, acostada.”", "Factor de riesgo de otitis por reflujo a la trompa."),
      act("audicion", "¿Notaron que escucha menos?", "util", "“No.”", "La hipoacusia persistente tras otitis repetidas requiere evaluación auditiva."),
      act("dolor-noche", "¿Llora más acostada?", "util", "“Sí, a la noche peor.”", "El dolor empeora en decúbito por la presión en el oído medio."),
    ],
    exam: [act("traccion", "Tracción del pabellón y presión del trago", "util", "No duele.", "Dolor a la tracción del pabellón orientaría a otitis externa.")],
    tribunal: [
      qa("¿Qué diferencia la otitis media aguda de la otitis media con efusión?", "La aguda tiene inicio brusco, signos inflamatorios (fiebre, otalgia) y membrana abombada. La efusión es líquido en el oído medio sin inflamación aguda: no se trata con antibióticos y puede dar hipoacusia."),
      qa("¿Qué gérmenes causan la otitis media aguda?", "Streptococcus pneumoniae, Haemophilus influenzae no tipificable y Moraxella catarrhalis, en general después de una infección viral."),
      qa("¿Qué complicaciones tiene?", "Perforación timpánica, mastoiditis (la más frecuente de las supuradas), parálisis facial, laberintitis, meningitis y abscesos intracraneales."),
    ],
  },
  "pancreatitis-aguda-biliar": {
    anamnesis: [
      act("comida", "¿Qué comió antes del dolor?", "util", "“Un asado con mucha grasa.”", "La comida grasa desencadena la contracción vesicular y la migración de cálculos."),
      act("disnea", "¿Le falta el aire?", "util", "“Un poco, por el dolor.”", "La disnea puede indicar derrame pleural o distrés en formas graves."),
      act("orina", "¿Orina normal?", "util", "“Sí.”", "La oliguria marcaría falla renal (pancreatitis grave)."),
    ],
    exam: [act("pulmon", "Auscultación pulmonar", "util", "Hipoventilación leve en base izquierda.", "El derrame pleural izquierdo es frecuente en la pancreatitis.")],
    tribunal: [
      qa("¿Cuáles son las causas de pancreatitis aguda?", "Litiasis biliar y alcohol (las más frecuentes), hipertrigliceridemia (más de 1.000 mg/dl), post-CPRE, fármacos, hipercalcemia, traumatismos, infecciones y causas genéticas o autoinmunes."),
      qa("¿Cómo se define la gravedad según Atlanta?", "Leve: sin falla de órganos ni complicaciones. Moderadamente grave: falla de órganos transitoria (menos de 48 h) o complicaciones locales. Grave: falla de órganos persistente (más de 48 h)."),
      qa("¿Qué complicaciones locales puede tener?", "Colecciones líquidas, pseudoquiste, necrosis (estéril o infectada), trombosis esplénica o portal y pseudoaneurismas."),
    ],
  },
  "ataque-de-panico": {
    anamnesis: [
      act("sueno", "¿Cómo duerme?", "util", "“Poco, me quedo estudiando hasta tarde.”", "La privación de sueño es un desencadenante."),
      act("estres", "¿Pasó algo estresante últimamente?", "util", "“Exámenes y el trabajo, todo junto.”", "Los estresores suelen preceder al inicio del trastorno."),
      act("familia", "¿Alguien en su familia tiene ansiedad o depresión?", "util", "“Mi mamá, con ataques de pánico.”", "Carga familiar."),
    ],
    exam: [act("respiracion", "Patrón respiratorio durante la consulta", "util", "Respira rápido y superficial al relatarlo.", "Hiperventilación: explica las parestesias y el mareo.")],
    tribunal: [
      qa("¿Qué diferencia una crisis de pánico de un trastorno de pánico?", "Una crisis es un episodio aislado de miedo intenso con síntomas físicos; el trastorno son crisis recurrentes e inesperadas con preocupación persistente por nuevas crisis o cambios de conducta (evitación) durante al menos un mes."),
      qa("¿Por qué la hiperventilación da parestesias?", "Porque baja la pCO₂ (alcalosis respiratoria), lo que aumenta la unión del calcio a la albúmina y disminuye el calcio iónico, con hormigueos en manos y alrededor de la boca."),
      qa("¿Cuál es el tratamiento de primera línea del trastorno de pánico?", "Terapia cognitivo-conductual y antidepresivos ISRS. Las benzodiacepinas solo por períodos cortos por el riesgo de dependencia."),
    ],
  },
  "pielonefritis-embarazada": {
    anamnesis: [
      act("vomitos", "¿Puede tomar líquidos sin vomitar?", "util", "“Vomito casi todo.”", "La intolerancia oral obliga al tratamiento endovenoso."),
      act("lumbar-lado", "¿El dolor de cintura es de un lado o de los dos?", "util", "“Del derecho.”", "Lo más frecuente es el lado derecho, por la compresión ureteral del útero."),
      act("diabetes", "¿Le dijeron que tenía azúcar alto en el embarazo?", "util", "“No me hice los análisis.”", "La diabetes aumenta el riesgo de ITU; hay que completar los estudios prenatales."),
    ],
    exam: [act("respiratorio", "Auscultación pulmonar y frecuencia respiratoria", "util", "FR 20, pulmones limpios.", "La pielonefritis gestacional puede complicarse con distrés respiratorio.")],
    tribunal: [
      qa("¿Por qué las embarazadas tienen más pielonefritis?", "Por la relajación del músculo liso ureteral por la progesterona, la compresión del útero (más del uréter derecho), la estasis urinaria y la glucosuria fisiológica."),
      qa("¿Qué antibióticos se evitan en el embarazo?", "Quinolonas, tetraciclinas, aminoglucósidos (salvo indicación precisa), y trimetoprima-sulfametoxazol en el primer trimestre y cerca del término; nitrofurantoína cerca del término."),
      qa("¿Qué complicaciones tiene la pielonefritis gestacional?", "Sepsis, distrés respiratorio, anemia, insuficiencia renal, amenaza de parto prematuro y parto prematuro."),
    ],
  },
  "politrauma-motociclista": {
    anamnesis: [
      act("casco", "¿Tenía casco? ¿Se lo sacaron?", "util", "Tenía casco; lo retiraron en la escena con dos personas, manteniendo el cuello.", "El casco reduce el traumatismo de cráneo; su retiro requiere técnica para proteger la columna."),
      act("abdomen", "¿Te duele la panza?", "util", "“No.”", "En el trauma de alta energía hay que buscar lesiones abdominales aunque no duelan."),
      act("sensibilidad", "¿Sentís las piernas y los brazos?", "clave", "“Sí, todo.”", "Descarta, en principio, lesión medular."),
    ],
    exam: [act("pelvis", "Estabilidad de la pelvis", "util", "Estable.", "Una fractura de pelvis inestable es causa de shock hemorrágico.")],
    tribunal: [
      qa("¿Qué evalúa el ABCDE?", "A: vía aérea con control cervical. B: respiración y ventilación. C: circulación y control de hemorragias. D: déficit neurológico (Glasgow, pupilas). E: exposición completa y control de la temperatura. Cada problema se trata al encontrarlo, antes de pasar al siguiente."),
      qa("¿Cuáles son las lesiones torácicas que matan rápido?", "Obstrucción de la vía aérea, neumotórax a tensión, neumotórax abierto, hemotórax masivo, tórax inestable con contusión pulmonar y taponamiento cardíaco."),
      qa("¿Qué es el eFAST?", "Una ecografía rápida en la cama que busca líquido libre en abdomen (hepatorrenal, esplenorrenal, pelvis), pericardio y neumotórax/hemotórax. Sirve en el paciente inestable."),
      qa("¿Qué es la tríada letal del trauma?", "Hipotermia, acidosis y coagulopatía, que se potencian entre sí; se previenen con control de la temperatura, reposición limitada y transfusión precoz balanceada."),
    ],
  },
  "preeclampsia-grave": {
    anamnesis: [
      act("orina", "¿Orina menos?", "util", "“Creo que sí.”", "La oliguria es un criterio de gravedad."),
      act("disnea", "¿Le falta el aire?", "util", "“No.”", "Descarta edema agudo de pulmón."),
      act("familia", "¿Su mamá o hermanas tuvieron presión alta en el embarazo?", "util", "“Mi mamá, sí.”", "Antecedente familiar: factor de riesgo."),
    ],
    exam: [act("pulmon", "Auscultación pulmonar", "util", "Sin crepitantes.", "Sin edema pulmonar.")],
    tribunal: [
      qa("¿Cómo se define la preeclampsia?", "Hipertensión (140/90 o más) después de las 20 semanas con proteinuria o, sin proteinuria, con signos de daño de órgano (plaquetopenia, alteración hepática o renal, edema pulmonar, síntomas neurológicos o visuales)."),
      qa("¿Qué es el síndrome HELLP?", "Hemólisis (Hemolysis), enzimas hepáticas elevadas (Elevated Liver enzymes) y plaquetas bajas (Low Platelets): una forma grave de preeclampsia."),
      qa("¿Para qué se usa el sulfato de magnesio?", "Para prevenir y tratar la eclampsia (convulsiones). Se controlan reflejos, frecuencia respiratoria y diuresis; el antídoto es el gluconato de calcio."),
      qa("¿Quiénes reciben aspirina para prevenir la preeclampsia?", "Embarazadas con riesgo alto (preeclampsia previa, hipertensión crónica, diabetes, enfermedad renal o autoinmune, embarazo múltiple) o varios factores de riesgo moderado, desde antes de las 16 semanas hasta las 36."),
    ],
  },
  "retencion-urinaria-hpb": {
    anamnesis: [
      act("alcohol", "¿Tomó alcohol estos días?", "util", "“Un poco de vino.”", "El alcohol también puede precipitar retención."),
      act("previas", "¿Le pasó antes?", "util", "“No, es la primera vez.”", "Un primer episodio con desencadenante tiene mejor pronóstico en la prueba sin sonda."),
      act("dolor", "¿Le duele?", "util", "“Mucho, abajo de la panza.”", "La retención aguda es dolorosa; la crónica puede no serlo."),
    ],
    exam: [act("abdomen", "Palpación abdominal y fosas lumbares", "util", "Sin dolor lumbar.", "Descarta pielonefritis asociada.")],
    tribunal: [
      qa("¿Qué síntomas da la hiperplasia prostática benigna?", "Obstructivos (chorro débil, retardo para iniciar, goteo, sensación de vaciado incompleto) e irritativos (polaquiuria, nicturia, urgencia)."),
      qa("¿Qué tratamientos médicos hay para la HPB?", "Alfabloqueantes (tamsulosina: relajan el músculo liso, efecto rápido) e inhibidores de la 5-alfa reductasa (finasterida, dutasterida: reducen el tamaño en meses); se pueden combinar."),
      qa("¿Qué es la diuresis posobstructiva?", "Una poliuria importante tras drenar una retención prolongada, por la acumulación de urea y el daño tubular; requiere control de diuresis, electrolitos e hidratación."),
    ],
  },
  "rinosinusitis-aguda": {
    anamnesis: [
      act("dientes", "¿Le duelen los dientes de arriba?", "util", "“Un poco al morder.”", "El dolor dental maxilar acompaña la sinusitis maxilar."),
      act("olfato", "¿Siente los olores?", "util", "“Menos que siempre.”", "La hiposmia es frecuente con la congestión."),
      act("atb-previo", "¿Tomó antibióticos este año?", "util", "“Dos veces, por lo mismo.”", "El uso repetido de antibióticos favorece la resistencia."),
    ],
    exam: [act("temperatura", "Temperatura", "util", "37,4 °C.", "Sin fiebre alta: no cumple criterios de gravedad.")],
    tribunal: [
      qa("¿Cuáles son los criterios de rinosinusitis bacteriana?", "Síntomas que persisten más de 10 días sin mejoría, doble empeoramiento (empeora después de haber mejorado) o un cuadro grave (fiebre de 39 °C o más con secreción purulenta durante 3–4 días)."),
      qa("¿Qué complicaciones tiene la sinusitis?", "Orbitarias (celulitis preseptal y orbitaria, absceso), intracraneales (meningitis, absceso, trombosis del seno cavernoso) y óseas (osteomielitis frontal)."),
      qa("¿Qué antibiótico se usa si es bacteriana?", "Amoxicilina (o amoxicilina-clavulánico si hay factores de riesgo o falla) por 5–7 días en adultos."),
    ],
  },
  "iam-sin-elevacion-st": {
    anamnesis: [
      act("disnea", "¿Le falta el aire?", "util", "“Un poco.”", "La disnea puede indicar disfunción ventricular."),
      act("aspirina", "¿Toma aspirina?", "util", "“No.”", "Orienta la dosis de carga."),
      act("cocaina", "¿Consumió cocaína?", "util", "“No.”", "La cocaína produce isquemia por vasoespasmo y cambia el manejo (se evitan betabloqueantes)."),
    ],
    exam: [act("glucemia", "Glucemia capilar", "util", "210 mg/dl.", "La hiperglucemia en el infarto empeora el pronóstico y se controla.")],
    tribunal: [
      qa("¿Cuál es la definición universal de infarto?", "Elevación y/o descenso de la troponina con al menos un valor por encima del percentil 99, más evidencia de isquemia (síntomas, cambios del ECG, ondas Q nuevas, imágenes o trombo en la coronariografía)."),
      qa("¿Qué es el puntaje GRACE?", "Estima el riesgo de muerte en el SCA según edad, frecuencia cardíaca, presión sistólica, creatinina, Killip, paro al ingreso, desviación del ST y troponina; orienta el momento de la estrategia invasiva."),
      qa("¿Cuál es la prevención secundaria después de un infarto?", "Doble antiagregación por 12 meses (luego aspirina), estatinas en dosis altas, betabloqueante, IECA, control de factores de riesgo, cesación tabáquica y rehabilitación cardiovascular."),
    ],
  },
  "sifilis-embarazo": {
    anamnesis: [
      act("controles", "¿Por qué empezó los controles a las 16 semanas?", "util", "“No tenía turno y no sabía que había que venir antes.”", "El inicio tardío del control prenatal es un factor de riesgo de sífilis congénita: se trabaja la accesibilidad."),
      act("otras-parejas", "¿Tuvo otras parejas en el último año?", "util", "“No.”", "Orienta el estudio de contactos."),
      act("sintomas-ahora", "¿Tiene algún síntoma ahora?", "util", "“No, nada.”", "Sífilis latente: asintomática."),
    ],
    exam: [act("boca", "Mucosa oral", "util", "Sin lesiones.", "Las placas mucosas son de la sífilis secundaria.")],
    tribunal: [
      qa("¿Qué diferencia hay entre pruebas treponémicas y no treponémicas?", "Las no treponémicas (VDRL, RPR) detectan anticuerpos contra cardiolipina: indican actividad, se cuantifican y sirven para seguir el tratamiento. Las treponémicas (TPHA, FTA-abs, test rápidos) detectan anticuerpos específicos, confirman y suelen quedar positivas de por vida."),
      qa("¿Cuáles son los estadios de la sífilis?", "Primaria (chancro indoloro), secundaria (exantema que afecta palmas y plantas, condilomas planos, placas mucosas), latente (sin síntomas, temprana o tardía) y terciaria (gomas, cardiovascular, neurosífilis)."),
      qa("¿Qué es la reacción de Jarisch-Herxheimer?", "Fiebre, malestar y mialgias en las primeras 24 h del tratamiento por la liberación de antígenos del treponema. En embarazadas puede causar contracciones; no se suspende el tratamiento."),
      qa("¿Qué manifestaciones tiene la sífilis congénita?", "Temprana: hepatoesplenomegalia, lesiones de piel (pénfigo palmoplantar), rinitis, alteraciones óseas, anemia. Tardía: dientes de Hutchinson, queratitis, sordera, nariz en silla de montar y tibias en sable."),
    ],
  },
  "sindrome-nefrotico-nino": {
    anamnesis: [
      act("peso", "¿Aumentó de peso?", "util", "“Dos kilos y medio en un mes.”", "El aumento de peso refleja los edemas."),
      act("diuresis", "¿Orina menos?", "util", "“Un poco menos.”", "Retención de sodio y agua."),
      act("respira", "¿Le cuesta respirar?", "util", "“No.”", "Un derrame pleural grande o una ascitis importante pueden dar disnea."),
    ],
    exam: [act("escroto", "Genitales", "util", "Edema escrotal moderado.", "Frecuente en varones con anasarca.")],
    tribunal: [
      qa("¿Qué define al síndrome nefrótico?", "Proteinuria masiva (en niños más de 40 mg/m²/hora o índice proteína/creatinina mayor de 2), hipoalbuminemia (menos de 2,5 g/dl), edemas e hiperlipidemia."),
      qa("¿Qué complicaciones tiene el síndrome nefrótico?", "Infecciones (peritonitis primaria por neumococo), trombosis (por pérdida de antitrombina y aumento de factores), hipovolemia, insuficiencia renal aguda y efectos adversos de los corticoides."),
      qa("¿Qué diferencia el síndrome nefrótico del nefrítico?", "El nefrótico tiene proteinuria masiva con edemas importantes, sin hematuria ni hipertensión típicas. El nefrítico tiene hematuria, hipertensión, oliguria y edemas leves, con proteinuria moderada."),
    ],
  },
  "sindrome-uremico-hemolitico": {
    anamnesis: [
      act("agua", "¿De dónde toman el agua? ¿Fueron a piletas o tuvieron contacto con animales de granja?", "util", "“Agua de red; no fueron a ningún campo.”", "Otras fuentes de E. coli productora de toxina Shiga."),
      act("antibiotico", "¿Le dieron antibióticos?", "util", "“No.”", "Los antibióticos y antidiarreicos en la diarrea por STEC pueden aumentar el riesgo de SUH."),
      act("hermanos", "¿Tiene hermanos con diarrea?", "util", "“No.”", "Los contactos con diarrea deben controlarse."),
    ],
    exam: [act("ta-repetida", "Repetir la presión arterial", "util", "125/80, alta para la edad.", "La hipertensión es frecuente en la fase aguda.")],
    tribunal: [
      qa("¿Cuál es la tríada del SUH?", "Anemia hemolítica microangiopática (con esquistocitos), plaquetopenia e insuficiencia renal aguda."),
      qa("¿Por qué la Argentina tiene la incidencia más alta del mundo?", "Por el alto consumo de carne vacuna (a veces mal cocida), la circulación de E. coli O157:H7 en el ganado y otros factores de transmisión; afecta sobre todo a menores de 5 años."),
      qa("¿Cómo se previene el SUH?", "Cocinar bien la carne picada, evitar la contaminación cruzada en la cocina, lavarse las manos, consumir lácteos pasteurizados y agua segura, y lavar frutas y verduras."),
      qa("¿Cuál es el tratamiento?", "De sostén: manejo de líquidos y electrolitos, diálisis si hay oliguria prolongada o complicaciones, transfusión de glóbulos rojos si la anemia es grave, control de la hipertensión. Evitar antibióticos y antidiarreicos en la diarrea con sangre sospechosa."),
    ],
  },
  "tuberculosis-pulmonar": {
    anamnesis: [
      act("trabajo", "¿Cómo es el taller donde trabaja?", "util", "“Cerrado, sin ventanas, somos quince.”", "Lugar de trabajo con mala ventilación: los contactos laborales también se estudian."),
      act("diabetes", "¿Tiene diabetes?", "util", "“No que sepa.”", "La diabetes triplica el riesgo de tuberculosis."),
      act("ninos", "¿Hay chicos en la casa?", "clave", "“Dos sobrinos, de 2 y 6 años.”", "Los menores de 5 años contactos son prioridad: evaluación y tratamiento preventivo."),
    ],
    exam: [act("peso", "Peso y talla", "util", "54 kg, IMC 18,6.", "Se registra para dosificar los fármacos y seguir la evolución.")],
    tribunal: [
      qa("¿Qué es un sintomático respiratorio?", "Toda persona con tos y expectoración de más de 2 semanas: se le piden baciloscopías de esputo para buscar tuberculosis."),
      qa("¿Qué efectos adversos tienen los fármacos de primera línea?", "Isoniacida: hepatitis y neuropatía periférica (se previene con piridoxina). Rifampicina: hepatitis, orina naranja e interacciones (anticonceptivos, antirretrovirales). Pirazinamida: hepatitis e hiperuricemia. Etambutol: neuritis óptica."),
      qa("¿Qué diferencia hay entre infección tuberculosa latente y enfermedad?", "En la infección latente el bacilo está contenido, sin síntomas ni contagio (PPD o IGRA positivos, radiografía normal). En la enfermedad hay síntomas, lesiones y, en la forma pulmonar bacilífera, contagio."),
      qa("¿Qué es el tratamiento directamente observado?", "La toma de la medicación supervisada por el equipo de salud u otra persona capacitada; mejora la adherencia y previene la resistencia."),
    ],
  },
  "tec-leve-anticoagulado": {
    anamnesis: [
      act("hora", "¿A qué hora fue el golpe?", "util", "“Hace tres horas.”", "Permite planificar la reevaluación y la tomografía de control."),
      act("medicacion", "¿Toma otros remedios?", "util", "“Enalapril y simvastatina.”", "Interacciones y riesgo de sangrado."),
      act("vive", "¿Vive solo?", "util", "“Con mi hija.”", "Importa para el alta segura en los casos sin lesión."),
    ],
    exam: [act("glasgow", "Glasgow seriado", "clave", "15 al ingreso; 15 a la hora.", "Un descenso de uno o más puntos indica deterioro y obliga a nueva imagen.")],
    tribunal: [
      qa("¿Qué es la escala de Glasgow?", "Evalúa apertura ocular (1–4), respuesta verbal (1–5) y respuesta motora (1–6): 15 normal, 13–14 TEC leve, 9–12 moderado, 8 o menos grave (indicación de proteger la vía aérea)."),
      qa("¿Qué diferencia el hematoma subdural del epidural?", "El subdural es venoso (venas puente), entre duramadre y aracnoides, con forma de semiluna, más en ancianos y anticoagulados. El epidural es arterial (arteria meníngea media), entre hueso y duramadre, biconvexo, asociado a fractura temporal y con intervalo lúcido."),
      qa("¿Cuándo pedís tomografía en un TEC leve?", "Según reglas como la canadiense: Glasgow menor de 15 a las 2 h, sospecha de fractura, vómitos repetidos, edad de 65 o más, amnesia prolongada, mecanismo peligroso y, siempre, anticoagulación o coagulopatía."),
    ],
  },
  "tromboembolismo-pulmonar": {
    anamnesis: [
      act("cirugia", "¿Tuvo cirugías o yesos recientes?", "util", "“No.”", "Otros factores de riesgo transitorios."),
      act("embarazo", "¿Puede estar embarazada?", "clave", "“No, tomo pastillas y me vino hace dos semanas.”", "El embarazo cambia los estudios (radiación) y el anticoagulante."),
      act("cancer", "¿Bajó de peso o le dijeron que tiene alguna enfermedad grave?", "util", "“No.”", "El cáncer es un factor de riesgo importante de trombosis."),
    ],
    exam: [act("homans", "Signos de trombosis venosa (dolor a la dorsiflexión, empastamiento)", "util", "Empastamiento de la pantorrilla izquierda.", "Los signos clásicos son poco sensibles; la medición del perímetro es más útil.")],
    tribunal: [
      qa("¿Qué es la tríada de Virchow?", "Estasis venosa, hipercoagulabilidad y daño endotelial: los tres mecanismos que favorecen la trombosis."),
      qa("¿Qué es el score de Wells para TEP?", "Signos de TVP (3), TEP como diagnóstico más probable (3), FC mayor de 100 (1,5), inmovilización o cirugía reciente (1,5), TEP o TVP previa (1,5), hemoptisis (1) y cáncer (1). Orienta si pedir dímero D o ir directo a la angiotomografía."),
      qa("¿Cómo se estratifica el riesgo del TEP?", "Alto riesgo: con hipotensión o shock (indicación de trombólisis). Riesgo intermedio: sin hipotensión pero con PESI alto, disfunción del ventrículo derecho o troponina elevada. Bajo riesgo: sin nada de eso (puede manejarse ambulatoriamente)."),
      qa("¿Qué hallazgos del ECG pueden verse en el TEP?", "Lo más frecuente es la taquicardia sinusal; también S1Q3T3, bloqueo de rama derecha, inversión de T en V1–V4 y desviación del eje a la derecha."),
    ],
  },
  "hipertension-severa-sin-dano": {
    anamnesis: [
      act("sal", "¿Comió más salado estos días?", "util", "“Unas empanadas el domingo.”", "La sal es otro desencadenante."),
      act("ansiedad", "¿Está nerviosa?", "util", "“Muy, me asustaron en la farmacia.”", "La ansiedad sube la presión: el reposo y la tranquilidad la bajan."),
      act("obra-social", "¿Tiene cobertura para los remedios?", "util", "“PAMI, pero no conseguí el turno para la receta.”", "Las barreras de acceso explican el abandono: se resuelve con la receta y el turno."),
    ],
    exam: [act("orina", "Tira reactiva de orina", "util", "Sin proteínas ni sangre.", "Ayuda a descartar daño renal agudo.")],
    tribunal: [
      qa("¿Qué diferencia una urgencia de una emergencia hipertensiva?", "Ambas tienen presión muy elevada (en general 180/110 o más); la emergencia tiene daño agudo de órgano blanco (encefalopatía, ACV, edema de pulmón, SCA, disección aórtica, insuficiencia renal aguda, eclampsia) y requiere tratamiento endovenoso en unidad cerrada."),
      qa("¿Por qué no se baja bruscamente la presión?", "Porque en el hipertenso crónico la autorregulación cerebral, coronaria y renal está desplazada: una caída brusca produce isquemia aunque los valores parezcan normales."),
      qa("¿Qué metas tiene el tratamiento de una emergencia hipertensiva?", "En general, bajar no más del 20–25 % en la primera hora y luego llevar gradualmente a 160/100; excepciones: disección aórtica (TAS menor de 120 en minutos) y ACV (metas específicas)."),
    ],
  },
  "vaginosis-bacteriana": {
    anamnesis: [
      act("previas", "¿Le pasó antes?", "util", "“Dos veces el año pasado.”", "La vaginosis recurre con frecuencia."),
      act("anticoncepcion", "¿Qué método anticonceptivo usa?", "util", "“Pastillas, y preservativo a veces.”", "El DIU se asocia a más vaginosis; el preservativo la reduce."),
      act("tabaco", "¿Fuma?", "util", "“No.”", "El tabaco es un factor de riesgo."),
    ],
    exam: [act("abdomen", "Palpación abdominal", "util", "Blando, indoloro.", "Sin signos de enfermedad pelviana inflamatoria.")],
    tribunal: [
      qa("¿Cómo diferenciás las tres causas principales de flujo?", "Vaginosis: flujo gris homogéneo con olor a pescado, pH mayor de 4,5, sin inflamación. Candidiasis: flujo blanco grumoso, prurito intenso, pH normal. Tricomoniasis: flujo amarillo verdoso espumoso, prurito, pH alto, cuello en frutilla."),
      qa("¿Qué es el puntaje de Nugent?", "Una evaluación del Gram del flujo según la proporción de lactobacilos, Gardnerella y Mobiluncus: 7 a 10 es vaginosis bacteriana. Es el estándar de laboratorio."),
      qa("¿Por qué importa la vaginosis en el embarazo?", "Porque se asocia a rotura prematura de membranas, parto prematuro, corioamnionitis y endometritis posparto."),
    ],
  },
  "vih-diagnostico-avanzado": {
    anamnesis: [
      act("parejas", "¿Tiene pareja estable? ¿Sabe si se testeó?", "util", "“Tengo una pareja hace un año; no se testeó.”", "El testeo de las parejas es parte de la atención."),
      act("tbc", "¿Tuvo contacto con alguien con tuberculosis?", "util", "“No que sepa.”", "La tuberculosis es la principal causa de muerte en personas con VIH."),
      act("disfagia", "¿Le duele al tragar?", "util", "“Sí, me duele cuando trago.”", "Odinofagia: probable candidiasis esofágica (enfermedad marcadora)."),
    ],
    exam: [act("fondo", "Fondo de ojo", "util", "Sin lesiones.", "Con CD4 menor de 50 se busca retinitis por citomegalovirus.")],
    tribunal: [
      qa("¿Qué infecciones oportunistas aparecen según el nivel de CD4?", "Con menos de 500: tuberculosis, candidiasis oral, herpes zóster. Con menos de 200: Pneumocystis. Con menos de 100: toxoplasmosis cerebral, criptococosis. Con menos de 50: citomegalovirus y micobacterias atípicas."),
      qa("¿Qué profilaxis se indican con CD4 bajos?", "Trimetoprima-sulfametoxazol con CD4 menor de 200 (Pneumocystis y, con menos de 100 y serología positiva, toxoplasma). Se suspenden cuando los CD4 se recuperan con el tratamiento."),
      qa("¿Qué es la PrEP?", "La profilaxis preexposición: antirretrovirales que toma una persona sin VIH con riesgo de exposición para prevenir la infección; está disponible en el sistema público."),
      qa("¿Qué es el síndrome inflamatorio de reconstitución inmune?", "Un empeoramiento paradójico de una infección oportunista (tratada o no reconocida) en las semanas siguientes al inicio de los antirretrovirales, por la recuperación de la respuesta inmune."),
    ],
  },
  "vph-lesion-alto-grado": {
    anamnesis: [
      act("vacuna", "¿Recibió la vacuna contra el VPH?", "util", "“No, cuando yo era chica no estaba.”", "La vacuna se incorporó al Calendario Nacional en 2011 para niñas y en 2017 para varones."),
      act("parejas", "¿Su pareja tiene que hacer algo?", "util", "“¿Él se tiene que tratar?”", "No hay tamizaje para varones; se recomienda preservativo y vacunación según la edad."),
      act("embarazo", "¿Está embarazada o lo busca?", "util", "“No por ahora.”", "En el embarazo el tratamiento escisional se difiere salvo sospecha de invasión."),
    ],
    exam: [act("acetico", "Inspección visual con ácido acético", "util", "Zona acetoblanca en el labio anterior del cuello.", "Orienta la biopsia; es la base de la colposcopia.")],
    tribunal: [
      qa("¿Cuál es el algoritmo de tamizaje con test de VPH en la Argentina?", "Test de VPH desde los 30 años. Negativo: repetir a los 5 años. Positivo: citología de triage; si es anormal (ASC-US o más), colposcopia; si es normal, repetir el test de VPH a los 18 meses."),
      qa("¿Qué tipos de VPH son de alto riesgo?", "Sobre todo el 16 y el 18 (alrededor del 70 % de los cánceres de cuello); también 31, 33, 45, 52 y 58, entre otros. Los tipos 6 y 11 causan verrugas genitales."),
      qa("¿Qué es la zona de transformación?", "La región del cuello donde el epitelio columnar es reemplazado por epitelio escamoso (metaplasia): es donde se originan casi todas las lesiones por VPH."),
    ],
  },
  "herpes-zoster": {
    anamnesis: [
      act("prurito", "¿Le pica?", "util", "“Más que picar, me quema.”", "El dolor urente es más típico que el prurito."),
      act("sueno", "¿Puede dormir con el dolor?", "util", "“Muy poco.”", "El dolor que impide dormir requiere analgesia adecuada."),
      act("vacuna", "¿Recibió la vacuna contra el zóster?", "util", "“No sabía que existía.”", "Se recomienda después de los 50 años."),
    ],
    exam: [act("sensibilidad", "Sensibilidad del dermatoma", "util", "Alodinia: el roce de la ropa le duele.", "La alodinia es característica del dolor neuropático.")],
    tribunal: [
      qa("¿Qué es la neuralgia posherpética?", "Dolor que persiste más de 3 meses después de la resolución del zóster, en el mismo dermatoma; es más frecuente en mayores de 60 años. Se trata con pregabalina, gabapentina, amitriptilina o lidocaína tópica."),
      qa("¿Qué es el síndrome de Ramsay Hunt?", "Herpes zóster del ganglio geniculado: parálisis facial periférica, vesículas en el conducto auditivo y el pabellón, otalgia, y a veces hipoacusia y vértigo."),
      qa("¿Cuándo se trata con aciclovir endovenoso?", "En el zóster diseminado, en inmunosuprimidos graves, con compromiso visceral o del sistema nervioso central, y en algunos casos de zóster oftálmico complicado."),
    ],
  },
};
