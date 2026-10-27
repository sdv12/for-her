import { act, qa } from "../build";
import type { CaseExtra } from "../types";

/** Tanda 3: más interrogatorio, más examen y preguntas del tribunal. */
export const batch3: Record<string, CaseExtra> = {
  "hipotiroidismo-hashimoto": {
    anamnesis: [
      act("constipacion", "¿Cómo va de cuerpo? ¿Tiene frío?", "util", "“Muy estreñida, y tengo frío aunque los demás tengan calor.”", "Constipación e intolerancia al frío por enlentecimiento metabólico."),
      act("calambres", "¿Tiene calambres o dolores musculares?", "util", "“Sí, en las piernas.”", "Miopatía hipotiroidea, a veces con CPK elevada."),
      act("embarazo", "¿Planea embarazarse?", "util", "“No.”", "En el embarazo la dosis de levotiroxina aumenta y los controles son más frecuentes."),
    ],
    exam: [act("facies", "Facies y voz", "util", "Facies abotagada, párpados edematosos, voz ronca y lenta.", "Facies mixedematosa.")],
    tribunal: [
      qa("¿Cuáles son las causas de hipotiroidismo primario?", "Tiroiditis de Hashimoto (la más frecuente en zonas con yodo suficiente), tiroidectomía, tratamiento con yodo radiactivo, fármacos (amiodarona, litio), déficit o exceso de yodo y causas congénitas."),
      qa("¿Qué es el hipotiroidismo subclínico y cuándo se trata?", "TSH elevada con T4 libre normal. Se trata si la TSH es mayor de 10, en el embarazo o búsqueda de embarazo, y se considera con síntomas, anti-TPO positivos o bocio."),
      qa("¿Qué es el coma mixedematoso?", "La forma extrema del hipotiroidismo: hipotermia, alteración de conciencia, hipoventilación, bradicardia e hiponatremia, desencadenado por infecciones, frío o sedantes. Se trata en terapia intensiva con levotiroxina endovenosa y corticoides."),
    ],
  },
  "hta-esencial": {
    anamnesis: [
      act("orina", "¿Se levanta a orinar de noche? ¿Tiene orina espumosa?", "util", "“Una vez por noche.”", "Orienta a buscar daño renal."),
      act("disnea", "¿Le falta el aire o le duele el pecho al esfuerzo?", "util", "“No.”", "Busca daño cardíaco (insuficiencia cardíaca, cardiopatía isquémica)."),
      act("estres", "¿Cómo está de estrés?", "neutro", "“Mucho trabajo.”", "El estrés influye, pero no cambia la conducta inicial."),
    ],
    exam: [act("mapa", "Indicar automedición domiciliaria o MAPA", "util", "Promedio domiciliario 152/96.", "Confirma la hipertensión fuera del consultorio y descarta el efecto de guardapolvo blanco.")],
    tribunal: [
      qa("¿Cómo se clasifica la presión arterial?", "Según el consenso argentino: óptima menor de 120/80, normal 120–129/80–84, limítrofe 130–139/85–89, HTA grado 1 140–159/90–99, grado 2 160–179/100–109 y grado 3 180/110 o más."),
      qa("¿Qué órganos daña la hipertensión?", "Corazón (hipertrofia ventricular, insuficiencia cardíaca, cardiopatía isquémica), cerebro (ACV, demencia vascular), riñón (albuminuria, enfermedad renal), retina (retinopatía) y arterias (aterosclerosis, aneurismas)."),
      qa("¿Cuándo sospechás hipertensión secundaria?", "Inicio antes de los 30 o después de los 55 años, HTA resistente, grado 3 de inicio brusco, hipopotasemia, soplo abdominal, crisis paroxísticas, roncopatía con apneas o daño de órgano desproporcionado."),
      qa("¿Qué medidas no farmacológicas bajan la presión?", "Reducir la sal (menos de 5 g por día), bajar de peso, actividad física aeróbica, limitar el alcohol, dieta rica en frutas y verduras (DASH) y dejar de fumar."),
    ],
  },
  "iam-atipico-mujer-diabetica": {
    anamnesis: [
      act("disnea-esfuerzo", "¿Venía cansándose más con el esfuerzo estas semanas?", "util", "“Sí, desde hace un mes se cansa al caminar.”", "Puede ser angina equivalente: disnea de esfuerzo en diabéticos."),
      act("sudor", "¿Transpiró frío?", "util", "“Sí, a la mañana estaba empapada.”", "Síntoma neurovegetativo de isquemia."),
      act("sincope", "¿Se desmayó?", "util", "“No.”", "Un síncope podría indicar arritmia o compromiso hemodinámico."),
    ],
    exam: [act("pulsos", "Pulsos periféricos", "util", "Pedios débiles bilaterales.", "Enfermedad arterial periférica: otro marcador de aterosclerosis difusa.")],
    tribunal: [
      qa("¿Por qué las mujeres mayores y los diabéticos tienen presentaciones atípicas?", "Por neuropatía autonómica (menor percepción del dolor), mayor edad y comorbilidades; consultan con disnea, náuseas, epigastralgia, cansancio o confusión, lo que demora el diagnóstico."),
      qa("¿Qué es la clasificación de Killip?", "Clasifica la insuficiencia cardíaca en el infarto: I sin insuficiencia cardíaca, II rales o tercer ruido, III edema agudo de pulmón y IV shock cardiogénico. La mortalidad aumenta con cada clase."),
      qa("¿Qué cambia en el manejo por la insuficiencia renal?", "Ajustar dosis de anticoagulantes y antiagregantes, cuidar el contraste del cateterismo (hidratación, mínimo volumen) y revisar la metformina."),
    ],
  },
  "iam-inferior-vd": {
    anamnesis: [
      act("previo", "¿Tuvo dolores parecidos con el esfuerzo antes?", "util", "“No, es la primera vez.”", "Un infarto sin angina previa es frecuente."),
      act("nauseas", "¿Tiene náuseas o vomitó?", "util", "“Náuseas, sí.”", "Frecuentes en el infarto inferior por reflejo vagal (Bezold-Jarisch)."),
      act("disnea", "¿Le falta el aire?", "util", "“No.”", "Sin congestión pulmonar."),
    ],
    exam: [act("bradicardia", "Pulso y ritmo", "util", "Bradicardia sinusal de 56 lpm.", "La coronaria derecha irriga el nódulo sinusal y el AV: bradicardias y bloqueos son frecuentes.")],
    tribunal: [
      qa("¿Qué derivaciones muestran el infarto inferior y cómo buscás el del ventrículo derecho?", "DII, DIII y aVF. El del ventrículo derecho se busca con derivaciones derechas (V4R): supradesnivel mayor de 1 mm."),
      qa("¿Por qué están contraindicados los nitratos y los diuréticos en el infarto del ventrículo derecho?", "Porque el ventrículo derecho infartado depende de la precarga: bajar la precarga causa hipotensión grave. Se trata con volumen."),
      qa("¿Cuál es el tiempo objetivo de reperfusión?", "Angioplastia primaria con puerta-balón menor de 90 minutos (menor de 120 si hay que trasladar); si no es posible, trombólisis con puerta-aguja menor de 30 minutos."),
      qa("¿Qué complicaciones mecánicas puede tener un infarto?", "Insuficiencia mitral aguda por rotura de músculo papilar (más en el inferior), comunicación interventricular y rotura de la pared libre con taponamiento, en general entre los días 2 y 7."),
    ],
  },
  "ic-descompensada": {
    anamnesis: [
      act("tos", "¿Tiene tos de noche?", "util", "“Sí, una tos seca acostada.”", "La tos nocturna es un equivalente de la congestión pulmonar."),
      act("vacunas", "¿Tiene las vacunas antigripal y antineumocócica?", "util", "“La antigripal sí.”", "Las infecciones respiratorias descompensan la IC: prevención."),
      act("peso-diario", "¿Se pesa en casa?", "util", "“No.”", "El peso diario detecta temprano la retención de líquidos."),
    ],
    exam: [act("peso", "Peso actual", "util", "71 kg (hace una semana: 68).", "Un aumento de 2 kg o más en pocos días indica retención.")],
    tribunal: [
      qa("¿Qué son los perfiles hemodinámicos de Stevenson?", "Combinan congestión (húmedo o seco) y perfusión (caliente o frío): caliente-húmedo (el más frecuente, se trata con diuréticos y vasodilatadores), frío-húmedo (requiere inotrópicos), caliente-seco (compensado) y frío-seco (hipovolemia)."),
      qa("¿Qué fármacos reducen la mortalidad en la IC con fracción de eyección reducida?", "Los cuatro pilares: IECA/ARA II o sacubitrilo-valsartán, betabloqueantes, antagonistas de la aldosterona (espironolactona) e inhibidores de SGLT2. Los diuréticos alivian síntomas pero no reducen la mortalidad."),
      qa("¿Qué precipita una descompensación?", "Falta de adherencia (fármacos o sal), arritmias (sobre todo FA), isquemia, infecciones, hipertensión no controlada, AINE y otros fármacos, anemia y disfunción tiroidea."),
      qa("¿Qué son los criterios de Framingham?", "Criterios clínicos de IC: mayores (disnea paroxística nocturna, ingurgitación yugular, crepitantes, cardiomegalia, edema agudo de pulmón, tercer ruido, reflujo hepatoyugular) y menores (edemas, tos nocturna, disnea de esfuerzo, hepatomegalia, derrame pleural, taquicardia). Se necesitan 2 mayores o 1 mayor y 2 menores."),
    ],
  },
  "ictericia-neonatal-lactancia": {
    anamnesis: [
      act("embarazo", "¿Tuvo diabetes, infecciones o algún problema en el embarazo?", "util", "“No, todo normal.”", "Infecciones congénitas o diabetes materna aumentan el riesgo."),
      act("parto", "¿Cómo fue el parto? ¿Tuvo cefalohematoma?", "util", "“Normal, sin golpes.”", "Un cefalohematoma aumenta la carga de bilirrubina."),
      act("somnolencia", "¿Está muy dormida? ¿Le cuesta despertarla para comer?", "clave", "“Duerme mucho, hay que despertarla.”", "La somnolencia puede ser por la bilirrubina alta o por la poca ingesta: se evalúa el estado neurológico."),
    ],
    exam: [act("temperatura", "Temperatura y estado general", "util", "37,2 °C, buen estado general.", "La fiebre o el mal estado orientarían a sepsis.")],
    tribunal: [
      qa("¿Qué diferencia la ictericia fisiológica de la patológica?", "La fisiológica aparece después de las 24 h, la bilirrubina aumenta despacio, es indirecta y se resuelve en 1–2 semanas. La patológica aparece en las primeras 24 h, sube rápido, supera los umbrales de tratamiento, es directa o se prolonga."),
      qa("¿Qué es el kernicterus?", "La encefalopatía por depósito de bilirrubina indirecta en los ganglios basales: en lo agudo, hipotonía, succión débil, luego hipertonía, opistótonos y llanto agudo; como secuela, parálisis cerebral, sordera y alteraciones de la mirada."),
      qa("¿Cómo funciona la luminoterapia?", "La luz azul transforma la bilirrubina de la piel en isómeros hidrosolubles que se eliminan por la bilis y la orina sin necesidad de conjugarse."),
      qa("¿Qué diferencia hay entre ictericia por lactancia insuficiente y por leche materna?", "La primera es temprana (primera semana) por poca ingesta, con pérdida de peso. La segunda es tardía (después de la primera semana), en bebés que aumentan bien de peso, por factores de la leche; es benigna y no se suspende la lactancia."),
    ],
  },
  "intento-suicidio-benzodiacepinas": {
    anamnesis: [
      act("ahora", "¿Ahora seguís pensando en morirte?", "clave", "“No sé… me arrepiento, pero estoy muy mal.”", "La ideación persistente después del intento aumenta el riesgo inmediato."),
      act("apoyo", "¿Hay alguien en quien confíes?", "util", "“Mi tía.”", "Los factores protectores ayudan a armar el plan de seguridad."),
      act("escuela", "¿Cómo te va en el colegio?", "util", "“Dejé de ir hace dos semanas.”", "El abandono escolar es un indicador de malestar y un punto de intervención."),
    ],
    exam: [act("pulso", "Signos vitales seriados", "util", "Estables en las primeras horas.", "Permiten detectar depresión respiratoria o una coingesta no declarada.")],
    tribunal: [
      qa("¿Cuáles son los principales factores de riesgo de suicidio?", "Intento previo (el más importante), trastornos mentales (depresión, bipolaridad, consumo de sustancias), desesperanza, violencia o abuso, pérdidas recientes, aislamiento, acceso a medios letales y antecedentes familiares."),
      qa("¿Qué dice la Ley 27.130?", "Es la Ley Nacional de Prevención del Suicidio: establece la atención obligatoria de las personas con intento, la notificación del evento, la capacitación de los equipos y el seguimiento posterior."),
      qa("¿Cuándo se puede internar a una persona sin su consentimiento según la Ley 26.657?", "Solo cuando hay riesgo cierto e inminente para sí o para terceros, determinado por un equipo interdisciplinario, como recurso terapéutico excepcional y con control judicial."),
      qa("¿Por qué siempre se pide paracetamolemia en una ingesta intencional?", "Porque el paracetamol no da síntomas en las primeras horas y puede causar insuficiencia hepática a los 2–3 días; el antídoto (N-acetilcisteína) es eficaz si se da temprano."),
    ],
  },
  "intoxicacion-alcoholica-aguda": {
    anamnesis: [
      act("frecuencia", "¿Cada cuánto toma así?", "util", "“Todos los fines de semana tomamos mucho.”", "Consumo episódico excesivo repetido: oportunidad de intervención breve."),
      act("conduce", "¿Iba a manejar?", "util", "“Vinimos en remís.”", "Prevención de siniestros viales."),
      act("vomitos", "¿Cuántas veces vomitó?", "util", "“Varias veces.”", "Riesgo de aspiración y de síndrome de Mallory-Weiss."),
    ],
    exam: [act("glucemia-cap", "Glucemia capilar", "clave", "62 mg/dl.", "La hipoglucemia agrava la depresión de conciencia y se corrige en el momento.")],
    tribunal: [
      qa("¿Cómo se relaciona la alcoholemia con la clínica?", "Aproximadamente: 0,5 g/l desinhibición; 1 g/l ataxia y torpeza; 2 g/l confusión y vómitos; 3 g/l estupor; más de 4 g/l coma y riesgo de muerte (varía con la tolerancia)."),
      qa("¿Qué es el síndrome de Wernicke y cómo se previene?", "Una encefalopatía por déficit de tiamina en alcohólicos crónicos o desnutridos: confusión, oftalmoplejía y ataxia. Se previene dando tiamina antes o junto con la glucosa."),
      qa("¿Qué es una intervención breve?", "Una conversación corta y estructurada (5–10 minutos) que da información sobre el riesgo del consumo, motiva el cambio y ofrece ayuda; es eficaz para reducir el consumo de riesgo."),
    ],
  },
  "insuficiencia-renal-aguda-prerrenal": {
    anamnesis: [
      act("sed", "¿Tiene sed? ¿Se marea al pararse?", "util", "“Mucha sed, y se marea.”", "Signos de hipovolemia."),
      act("contraste", "¿Le hicieron estudios con contraste hace poco?", "util", "“No.”", "El contraste iodado es otra causa de daño renal agudo."),
      act("calambres", "¿Tiene debilidad o calambres?", "util", "“Está muy débil.”", "La hiperpotasemia da debilidad muscular."),
    ],
    exam: [act("peso", "Peso", "util", "2 kg menos que hace una semana.", "Confirma la pérdida de volumen.")],
    tribunal: [
      qa("¿Cómo se clasifica la insuficiencia renal aguda según el mecanismo?", "Prerrenal (hipoperfusión: deshidratación, IC, fármacos), renal o intrínseca (necrosis tubular, nefritis intersticial, glomerulonefritis, vascular) y posrenal (obstrucción)."),
      qa("¿Qué cambios del ECG produce la hiperpotasemia?", "En orden progresivo: ondas T picudas, alargamiento del PR, aplanamiento de la onda P, ensanchamiento del QRS, onda sinusoidal y fibrilación ventricular o asistolia."),
      qa("¿Cuáles son las indicaciones de diálisis de urgencia?", "Acidosis grave refractaria, hiperpotasemia refractaria, sobrecarga de volumen con edema pulmonar que no responde, uremia sintomática (encefalopatía, pericarditis) e intoxicaciones dializables (regla AEIOU)."),
      qa("¿Qué es la clasificación KDIGO?", "Estadifica la injuria renal aguda por el aumento de la creatinina (1,5–1,9 veces, 2–2,9 veces, 3 veces o más) y por la caída de la diuresis."),
    ],
  },
  "infeccion-urinaria-febril-lactante": {
    anamnesis: [
      act("panal", "¿Cada cuánto le cambian el pañal?", "neutro", "“Cada tres o cuatro horas.”", "No cambia la conducta."),
      act("constipacion", "¿Está estreñida?", "util", "“A veces.”", "La constipación favorece las infecciones urinarias."),
      act("crecimiento", "¿Está creciendo bien?", "util", "“Sí, según el pediatra.”", "Un mal progreso de peso orientaría a ITU recurrentes o malformaciones."),
    ],
    exam: [act("ta", "Presión arterial", "util", "Normal para la edad.", "La hipertensión sugeriría daño renal previo.")],
    tribunal: [
      qa("¿Cómo se toma la muestra de orina en un lactante?", "Para cultivo, por sondaje vesical o punción suprapúbica. La bolsa recolectora solo sirve si el resultado es negativo, porque se contamina con frecuencia."),
      qa("¿Qué es el reflujo vesicoureteral?", "El paso retrógrado de orina de la vejiga al uréter y al riñón; facilita la pielonefritis y las cicatrices renales. Se gradúa de I a V con la cistouretrografía miccional."),
      qa("¿Qué estudios de imagen se piden tras una ITU febril?", "Ecografía renal y vesical tras el primer episodio. La cistouretrografía se reserva para ecografía anormal o ITU febriles recurrentes."),
    ],
  },
  "leptospirosis-weil": {
    anamnesis: [
      act("heridas", "¿Tenía heridas en los pies o las piernas?", "util", "“Muchos raspones, trabajaba descalzo a veces.”", "La piel lesionada es la puerta de entrada."),
      act("companeros", "¿Algún compañero de trabajo está enfermo?", "util", "“Uno faltó por fiebre.”", "Puede haber un brote: búsqueda activa de casos."),
      act("orina", "¿Cómo está orinando?", "clave", "“Muy poco desde ayer.”", "La oliguria marca la insuficiencia renal."),
    ],
    exam: [act("piel-petequias", "Piel: petequias y hematomas", "util", "Algunas petequias en piernas.", "Expresión de la plaquetopenia y la vasculitis.")],
    tribunal: [
      qa("¿Qué fases tiene la leptospirosis?", "Una fase septicémica (fiebre, mialgias intensas, cefalea, sufusión conjuntival) de 4–7 días y una fase inmune, que en las formas graves (síndrome de Weil) da ictericia, insuficiencia renal, hemorragias y compromiso pulmonar."),
      qa("¿Cuál es el perfil de laboratorio típico?", "Insuficiencia renal con potasio normal o bajo, bilirrubina alta con transaminasas poco elevadas, plaquetopenia y CPK elevada."),
      qa("¿A quién se le indica quimioprofilaxis?", "A personas con exposición de alto riesgo y corta duración (inundaciones, viajes, tareas de riesgo): doxiciclina semanal durante la exposición."),
    ],
  },
  "lumbalgia-aguda-mecanica": {
    anamnesis: [
      act("previos", "¿Tuvo dolores así antes?", "util", "“Cada tanto, cuando cargo mucho.”", "Los episodios previos son frecuentes y no cambian el manejo."),
      act("sueno", "¿Puede dormir?", "util", "“Me cuesta encontrar posición.”", "Un dolor que no cede con ninguna posición, sobre todo nocturno, sería bandera roja."),
      act("animo", "¿Le preocupa no poder trabajar?", "util", "“Mucho, si no trabajo no cobro.”", "Las banderas amarillas (factores psicosociales) predicen cronicidad."),
    ],
    exam: [act("marcha", "Marcha en talones y puntas de pie", "util", "Puede caminar en talones y en puntas.", "Descarta debilidad de L5 (talones) y S1 (puntas).")],
    tribunal: [
      qa("¿Cuáles son las banderas rojas de la lumbalgia?", "Edad menor de 20 o mayor de 50, antecedente de cáncer, pérdida de peso, fiebre o inmunosupresión, trauma importante, dolor nocturno o en reposo, déficit neurológico progresivo, alteración de esfínteres o anestesia en silla de montar, uso de corticoides o drogas endovenosas."),
      qa("¿Qué raíces se exploran en el examen y cómo?", "L4: reflejo rotuliano y dorsiflexión del pie. L5: extensión del hallux y marcha en talones. S1: reflejo aquiliano, flexión plantar y marcha en puntas."),
      qa("¿Qué son las banderas amarillas?", "Factores psicosociales que predicen cronicidad: miedo al movimiento, catastrofización, depresión, insatisfacción laboral, conflicto con la aseguradora o litigios."),
    ],
  },
  "lesiones-no-accidentales-lactante": {
    anamnesis: [
      act("madre", "¿Podemos hablar con la mamá?", "clave", "Se la contacta por teléfono: viene en 30 minutos.", "Entrevistar por separado a los cuidadores permite comparar los relatos."),
      act("llanto", "¿Llora mucho? ¿Qué hacen cuando no se calma?", "util", "“Llora todo el día, me pone nervioso.”", "El llanto inconsolable es un desencadenante frecuente de maltrato (y de sacudida)."),
      act("hermanos", "¿Hay otros chicos en la casa?", "clave", "“Una nena de 3 años, hija de ella.”", "Los hermanos también deben ser evaluados y protegidos."),
    ],
    exam: [act("boca", "Boca y frenillos", "util", "Pequeña equimosis en el frenillo labial superior.", "Las lesiones del frenillo en lactantes que no caminan sugieren alimentación forzada o golpes.")],
    tribunal: [
      qa("¿Qué indicadores en el relato hacen sospechar maltrato?", "Relato vago, cambiante o contradictorio entre cuidadores, mecanismo que no explica la lesión o no coincide con el desarrollo, demora injustificada en consultar, lesiones previas y actitud del adulto inapropiada."),
      qa("¿Qué lesiones son muy específicas de maltrato?", "Fracturas costales posteriores, fracturas metafisarias (en asa de balde), fracturas de escápula y esternón, fracturas múltiples de distinta antigüedad, hematomas en zonas protegidas (orejas, cuello, tronco) y hemorragias retinianas con hematoma subdural."),
      qa("¿Qué es el traumatismo craneal abusivo (sacudida)?", "Lesiones por sacudida violenta del lactante: hematoma subdural, hemorragias retinianas y encefalopatía, a menudo sin signos externos. Es la principal causa de muerte por maltrato en menores de un año."),
      qa("¿Qué obligación tiene el médico ante la sospecha?", "Comunicar al organismo de protección de derechos (Ley 26.061) y, según la jurisdicción, denunciar; proteger al niño (internación si es necesario) y documentar."),
    ],
  },
  "meningitis-bacteriana-lactante": {
    anamnesis: [
      act("vomitos", "¿Vomitó? ¿Tiene diarrea?", "util", "“Vomitó dos veces, sin diarrea.”", "Los vómitos acompañan la hipertensión endocraneana."),
      act("llanto", "¿Cómo llora cuando la alzan?", "util", "“Llora más cuando la alzamos.”", "Llanto paradójico: irritación meníngea en lactantes."),
      act("antibioticos", "¿Recibió antibióticos estos días?", "clave", "“No.”", "Un antibiótico previo puede negativizar los cultivos y modificar el LCR."),
    ],
    exam: [act("tono", "Tono muscular y postura", "util", "Hipotonía global, sin postura anormal.", "Postura en opistótonos o hipertonía indicarían mayor compromiso.")],
    tribunal: [
      qa("¿Qué gérmenes causan meningitis bacteriana según la edad?", "Menores de 3 meses: estreptococo del grupo B, E. coli, Listeria. De 3 meses en adelante: neumococo, meningococo y, en no vacunados, Haemophilus influenzae b."),
      qa("¿Cómo diferenciás el LCR bacteriano del viral?", "Bacteriano: turbio, muchos neutrófilos (más de 1.000), proteínas altas, glucosa baja. Viral: claro, linfocitos (menos de 500), proteínas normales o algo altas, glucosa normal."),
      qa("¿Qué es el síndrome de Waterhouse-Friderichsen?", "La meningococcemia fulminante con hemorragia suprarrenal bilateral, shock y coagulación intravascular diseminada."),
      qa("¿Qué vacunas previenen la meningitis bacteriana en el Calendario Nacional?", "Haemophilus b (en la quíntuple/séxtuple), neumococo conjugada y meningococo ACYW (3, 5 y 15 meses y a los 11 años)."),
    ],
  },
  "sindrome-climaterico": {
    anamnesis: [
      act("sueno", "¿Cómo duerme?", "util", "“Me despierto varias veces empapada.”", "Los sofocos nocturnos alteran el sueño y el ánimo."),
      act("animo", "¿Cómo está de ánimo?", "util", "“Irritable y con ganas de llorar.”", "Los síntomas anímicos son frecuentes en la transición menopáusica."),
      act("orina", "¿Se le escapa la orina o tiene ardor seguido?", "util", "“Un poco al toser.”", "Parte del síndrome genitourinario."),
    ],
    exam: [act("peso", "Perímetro de cintura", "util", "86 cm.", "Después de la menopausia aumenta la grasa visceral y el riesgo cardiovascular.")],
    tribunal: [
      qa("¿Cuáles son las contraindicaciones de la terapia hormonal?", "Cáncer de mama o de endometrio, sangrado genital no estudiado, tromboembolismo venoso, enfermedad coronaria o ACV, enfermedad hepática activa y porfiria."),
      qa("¿Por qué se prefiere el estrógeno transdérmico?", "Porque no pasa por el hígado: tiene menor riesgo de tromboembolismo venoso y menos efecto sobre los factores de coagulación y los triglicéridos."),
      qa("¿Qué es la ventana de oportunidad?", "El período en que el beneficio de la terapia hormonal supera los riesgos: mujeres menores de 60 años o con menos de 10 años desde la menopausia."),
    ],
  },
  "migrana-sin-aura": {
    anamnesis: [
      act("menstrual", "¿Tiene relación con la menstruación?", "util", "“Sí, empeora los días antes.”", "Migraña menstrual por la caída de estrógenos."),
      act("ausencias", "¿Cuántos días faltó al trabajo por los dolores?", "util", "“Tres o cuatro por mes.”", "La discapacidad orienta la indicación de prevención."),
      act("embarazo", "¿Planea embarazarse?", "util", "“No por ahora.”", "Algunos preventivos (topiramato, valproato) son teratogénicos."),
    ],
    exam: [act("pares", "Pares craneales y campo visual", "util", "Normales.", "Parte del examen neurológico completo.")],
    tribunal: [
      qa("¿Cuáles son los criterios de migraña sin aura?", "Al menos 5 crisis de 4 a 72 horas con 2 de: unilateral, pulsátil, moderada a intensa, empeora con la actividad; y 1 de: náuseas o vómitos, o fotofobia y fonofobia."),
      qa("¿Qué es el aura migrañosa?", "Síntomas neurológicos transitorios y reversibles (visuales, sensitivos o del lenguaje) que se instalan gradualmente en 5–60 minutos, en general antes del dolor. Se explica por la depresión cortical propagada."),
      qa("¿Qué significa SNOOP?", "Banderas rojas de cefalea secundaria: Síntomas sistémicos, Neurológicos, inicio súbito (Onset), edad mayor (Older, más de 50), cambio de Patrón o empeoramiento progresivo; también embarazo, inmunosupresión y desencadenada por esfuerzo o Valsalva."),
      qa("¿Cómo actúan los triptanes y cuándo están contraindicados?", "Son agonistas de los receptores 5-HT1B/1D: vasoconstricción e inhibición de la liberación de péptidos. Contraindicados en enfermedad coronaria, ACV, hipertensión no controlada y enfermedad vascular periférica."),
    ],
  },
  "intoxicacion-monoxido-carbono": {
    anamnesis: [
      act("hijos-sintomas", "¿Cómo están sus hijos?", "clave", "“Con dolor de cabeza, el más chico vomitó.”", "Todos los expuestos deben ser evaluados y tratados."),
      act("gasista", "¿Cuándo revisaron la estufa por última vez?", "util", "“Nunca, es vieja.”", "La falta de mantenimiento de artefactos es la causa más frecuente."),
      act("tabaco", "¿Fuma?", "util", "“No.”", "En fumadores la COHb basal puede llegar al 5–10 %."),
    ],
    exam: [act("oximetria", "Oximetría de pulso", "util", "99 %.", "El oxímetro de pulso común no distingue la carboxihemoglobina: una saturación normal no descarta la intoxicación.")],
    tribunal: [
      qa("¿Por qué el oxímetro de pulso no sirve en la intoxicación por monóxido?", "Porque la carboxihemoglobina absorbe la luz de manera parecida a la oxihemoglobina, y el oxímetro las confunde: muestra una saturación falsamente normal. Hace falta co-oximetría."),
      qa("¿Cuál es la vida media de la carboxihemoglobina?", "Alrededor de 4–6 horas respirando aire, 60–90 minutos con oxígeno al 100 % y unos 20–30 minutos con oxígeno hiperbárico."),
      qa("¿Qué es el síndrome neurológico tardío?", "Alteraciones cognitivas, de conducta, de la memoria o parkinsonismo que aparecen días a semanas después de una intoxicación aparentemente resuelta."),
    ],
  },
  "mordedura-de-perro": {
    anamnesis: [
      act("dolor", "¿Le duele mucho? ¿Puede mover los dedos?", "util", "“Le duele, pero mueve todo.”", "Un dolor intenso al mover un dedo puede indicar lesión de tendón o tenosinovitis."),
      act("enfermedades", "¿Tiene alguna enfermedad de las defensas o le sacaron el bazo?", "util", "“No.”", "Los asplénicos tienen riesgo de sepsis grave por Capnocytophaga."),
      act("zoonosis", "¿Avisaron a zoonosis del municipio?", "util", "“No sabíamos.”", "El control del animal lo coordina zoonosis."),
    ],
    exam: [act("profundidad", "Profundidad de las heridas punzantes", "util", "Llegan al tejido subcutáneo, sin compromiso articular.", "Una herida que llega a la articulación o al hueso requiere evaluación traumatológica.")],
    tribunal: [
      qa("¿Qué gérmenes producen infección tras una mordedura de perro?", "Pasteurella multocida (la más característica, infección rápida en 12–24 h), estreptococos, estafilococos, Capnocytophaga canimorsus (grave en asplénicos) y anaerobios."),
      qa("¿Cuándo indicás profilaxis antirrábica?", "Según la exposición y el animal: si el perro es observable y está sano, se observa 10 días; si no se puede observar, está enfermo, muere o es un animal silvestre (murciélago, zorro), se indica vacuna (y gammaglobulina en exposiciones graves)."),
      qa("¿Qué mordeduras se consideran graves?", "En cabeza, cara, cuello, manos y genitales, las múltiples o profundas y las lameduras de mucosas; también todas las de murciélago."),
    ],
  },
  "neumonia-nino": {
    anamnesis: [
      act("dolor-pecho", "¿Se queja de dolor de pecho al toser?", "util", "“A veces del lado derecho.”", "Dolor pleurítico: compromiso de la pleura."),
      act("tabaco", "¿Alguien fuma en la casa?", "util", "“El papá, afuera.”", "El tabaquismo pasivo aumenta el riesgo de infecciones respiratorias."),
      act("hermanos", "¿Hay otros chicos enfermos en la casa?", "util", "“El hermano tiene mocos.”", "Contexto viral."),
    ],
    exam: [act("percusion", "Percusión del tórax", "util", "Matidez en la base derecha.", "Confirma la consolidación (sin derrame importante).")],
    tribunal: [
      qa("¿Cuáles son los criterios de internación de una neumonía en un niño?", "Edad menor de 6 meses, hipoxemia (saturación menor de 92 %), dificultad respiratoria importante, intolerancia oral o deshidratación, aspecto tóxico, complicaciones (derrame, absceso), falla del tratamiento ambulatorio o condiciones sociales desfavorables."),
      qa("¿Qué gérmenes predominan según la edad?", "En todas las edades los virus son frecuentes. Entre las bacterias, el neumococo predomina en preescolares; en escolares y adolescentes aumentan Mycoplasma y Chlamydia pneumoniae."),
      qa("¿Qué complicaciones puede tener?", "Derrame pleural paraneumónico y empiema, neumonía necrotizante, absceso pulmonar y neumotórax."),
    ],
  },
  "neumonia-adulta-mayor": {
    anamnesis: [
      act("caidas", "¿Se cayó en estos días?", "util", "“Ayer casi se cae.”", "En el adulto mayor, las caídas pueden ser la forma de presentación de una infección."),
      act("comer", "¿Come y toma líquidos?", "util", "“Casi nada desde ayer.”", "Riesgo de deshidratación y de insuficiencia renal."),
      act("orina", "¿Orina normal?", "util", "“Poco.”", "Oliguria: hipoperfusión."),
    ],
    exam: [act("fr", "Contar la frecuencia respiratoria un minuto completo", "clave", "30 rpm.", "La taquipnea es el signo más sensible de neumonía en adultos mayores y suma en el CURB-65.")],
    tribunal: [
      qa("¿Qué es el CURB-65 y cómo se usa?", "Confusión, urea mayor de 42 mg/dl, frecuencia respiratoria de 30 o más, presión sistólica menor de 90 o diastólica de 60 o menos, edad de 65 o más. 0–1: ambulatorio; 2: internación en sala; 3 o más: grave (considerar terapia intensiva)."),
      qa("¿Qué es la sepsis según la definición actual?", "Una disfunción orgánica que pone en riesgo la vida, causada por una respuesta desregulada a la infección. El qSOFA (FR ≥ 22, alteración mental, TAS ≤ 100) ayuda a identificar a los pacientes de riesgo fuera de terapia intensiva."),
      qa("¿Qué vacunas previenen la neumonía en adultos mayores?", "Antigripal anual y antineumocócica (conjugada y polisacárida según el esquema del Calendario Nacional) a partir de los 65 años y en grupos de riesgo."),
    ],
  },
  "neumotorax-espontaneo-primario": {
    anamnesis: [
      act("familia", "¿Alguien en su familia tuvo neumotórax?", "util", "“No.”", "Existen formas familiares."),
      act("dolor-ahora", "¿El dolor sigue igual?", "util", "“Menos que al principio, pero me falta el aire.”", "El dolor suele disminuir aunque el neumotórax persista."),
      act("deporte", "¿Juega a algún deporte de contacto o bucea?", "util", "“Vóley, nada de buceo.”", "Importa para las recomendaciones posteriores."),
    ],
    exam: [act("saturacion", "Saturación", "util", "95 %.", "La hipoxemia suele ser leve en el neumotórax primario.")],
    tribunal: [
      qa("¿Qué diferencia el neumotórax primario del secundario?", "El primario ocurre sin enfermedad pulmonar conocida (por ruptura de bullas subpleurales); el secundario, con enfermedad pulmonar de base (EPOC, fibrosis quística, tuberculosis, VIH con Pneumocystis): es más grave y casi siempre requiere drenaje."),
      qa("¿Qué signos clínicos tiene el neumotórax?", "Disminución de la expansión, timpanismo, disminución del murmullo vesicular y de las vibraciones vocales del lado afectado."),
      qa("¿Cuándo se indica cirugía?", "Ante recurrencia, fuga aérea persistente (más de 3–5 días), neumotórax bilateral, hemoneumotórax, o por profesiones de riesgo (pilotos, buzos)."),
    ],
  },
};
