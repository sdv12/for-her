import { act, qa } from "../build";
import type { CaseExtra } from "../types";

/** Tanda 2: más interrogatorio, más examen y preguntas del tribunal. */
export const batch2: Record<string, CaseExtra> = {
  "dengue-signos-alarma": {
    anamnesis: [
      act("mareo", "¿Se marea al pararse?", "util", "“Un poco, cuando me levanto rápido.”", "El mareo ortostático puede anticipar el shock por extravasación."),
      act("dolor-retro", "¿Le dolían los ojos y los músculos al principio?", "util", "“Sí, detrás de los ojos y todo el cuerpo, como si me hubieran pegado.”", "Dolor retroocular y mialgias: típicos de la fase febril del dengue."),
      act("vacuna", "¿Recibió la vacuna contra el dengue?", "util", "“No.”", "La vacuna está indicada en zonas y grupos priorizados; no cambia el manejo agudo."),
    ],
    exam: [act("ta-pinzada", "Presión diferencial (TAS − TAD)", "clave", "105/75: diferencial de 30 mmHg.", "Una presión diferencial de 20 mmHg o menos (pinzada) indica shock compensado.")],
    tribunal: [
      qa("¿Cuáles son las fases del dengue?", "Febril (2–7 días: fiebre, mialgias, cefalea, dolor retroocular), crítica (alrededor de la caída de la fiebre, días 3–7: riesgo de extravasación de plasma y shock) y de recuperación (reabsorción de líquidos: riesgo de sobrecarga)."),
      qa("¿Cuáles son los signos de alarma del dengue?", "Dolor abdominal intenso y continuo, vómitos persistentes, acumulación de líquidos (ascitis, derrame), sangrado de mucosas, letargia o irritabilidad, hepatomegalia mayor de 2 cm, hipotensión postural y aumento del hematocrito con caída rápida de plaquetas."),
      qa("¿Por qué están contraindicados los AINE y la aspirina?", "Porque alteran la función plaquetaria y aumentan el riesgo de sangrado en un paciente con plaquetopenia; además pueden dañar la mucosa gástrica. Se usa paracetamol."),
      qa("¿Por qué un segundo dengue puede ser más grave?", "Por la potenciación dependiente de anticuerpos: los anticuerpos de una infección previa con otro serotipo facilitan la entrada del virus a las células y aumentan la respuesta inflamatoria."),
    ],
  },
  "depresion-posparto": {
    anamnesis: [
      act("sueno", "¿Puede dormir cuando el bebé duerme?", "util", "“No, me quedo despierta pensando.”", "El insomnio aunque haya oportunidad de dormir es más típico de la depresión que del cansancio del puerperio."),
      act("apetito", "¿Cómo está comiendo?", "util", "“Casi no como, no tengo hambre.”", "Síntomas neurovegetativos del episodio depresivo."),
      act("violencia", "¿Alguien la trata mal o le tiene miedo a alguien en su casa?", "clave", "“No, mi pareja es buena pero no está.”", "La violencia de género es un factor de riesgo y una situación a detectar siempre."),
      act("parto", "¿Cómo fue el parto?", "util", "“Una cesárea de urgencia, fue traumático.”", "Un parto vivido como traumático aumenta el riesgo de depresión y de estrés postraumático."),
    ],
    exam: [act("aspecto", "Aspecto general y autocuidado", "util", "Descuidada, ojerosa, con llanto contenido.", "El descuido personal refleja la gravedad.")],
    tribunal: [
      qa("¿Qué diferencia la tristeza posparto de la depresión posparto?", "La tristeza posparto (baby blues) afecta a la mayoría, empieza en los primeros días y se resuelve antes de las 2 semanas sin tratamiento. La depresión dura más de 2 semanas, es más intensa y afecta el funcionamiento."),
      qa("¿Qué es la escala de Edimburgo?", "Un cuestionario autoadministrado de 10 preguntas para tamizar depresión perinatal; un puntaje alto o cualquier respuesta positiva a la pregunta sobre autolesión requiere evaluación."),
      qa("¿Por qué la psicosis puerperal es una urgencia?", "Porque aparece bruscamente en las primeras semanas con delirios, alucinaciones y confusión, y tiene riesgo de suicidio e infanticidio. Requiere internación y suele estar asociada al trastorno bipolar."),
    ],
  },
  "diabetes-gestacional": {
    anamnesis: [
      act("sop", "¿Le dijeron alguna vez que tenía ovarios poliquísticos?", "util", "“Sí, de joven.”", "El síndrome de ovario poliquístico es un factor de riesgo de diabetes gestacional."),
      act("edad-gest", "¿Cuándo empezó los controles del embarazo?", "util", "“A las 10 semanas.”", "La glucemia en ayunas del primer control sirve para detectar diabetes previa."),
      act("medicacion", "¿Toma alguna medicación?", "util", "“Ácido fólico y hierro.”", "Los corticoides, por ejemplo para maduración pulmonar, elevan la glucemia."),
    ],
    exam: [act("peso", "Aumento de peso en el embarazo", "util", "Subió 11 kg hasta ahora.", "Un aumento excesivo se asocia a macrosomía.")],
    tribunal: [
      qa("¿Por qué aparece la diabetes gestacional en la segunda mitad del embarazo?", "Porque las hormonas placentarias (lactógeno placentario, progesterona, cortisol, prolactina) aumentan progresivamente la resistencia a la insulina."),
      qa("¿Qué complicaciones fetales y neonatales produce?", "Macrosomía, distocia de hombros, polihidramnios, hipoglucemia neonatal, hipocalcemia, policitemia, ictericia, distrés respiratorio y, a largo plazo, obesidad y diabetes."),
      qa("¿Qué metas de glucemia se buscan?", "Ayunas menor de 95 mg/dl, una hora posprandial menor de 140 y dos horas posprandial menor de 120."),
      qa("¿Por qué se reclasifica después del parto?", "Porque la mayoría vuelve a la normalidad, pero hasta la mitad desarrollará diabetes tipo 2: se hace PTOG a las 6–12 semanas y controles periódicos."),
    ],
  },
  "diarrea-deshidratacion": {
    anamnesis: [
      act("fiebre", "¿Tuvo fiebre?", "util", "“Unas líneas.”", "La fiebre alta con sangre en las heces orientaría a diarrea bacteriana invasiva."),
      act("contactos", "¿Hay otros chicos con diarrea en la casa o el barrio?", "util", "“El primo también.”", "Contexto epidemiológico de transmisión fecal-oral."),
      act("comida", "¿Qué come habitualmente?", "util", "“Come de todo, pero hoy no quiere.”", "Se sigue alimentando apenas tolere: el ayuno empeora la recuperación."),
    ],
    exam: [act("peso", "Peso actual comparado con el previo", "clave", "10,2 kg (hace 10 días 11 kg): perdió alrededor del 7 %.", "La pérdida de peso estima el grado de deshidratación.")],
    tribunal: [
      qa("¿Cómo se clasifica la deshidratación según la OMS?", "Sin deshidratación (plan A), con algunos signos (plan B: rehidratación oral en el centro de salud) y grave (plan C: rehidratación endovenosa). Se evalúan estado general, ojos, lágrimas, sed y pliegue."),
      qa("¿Cómo se hace el plan B?", "Sales de rehidratación oral de baja osmolaridad, 50–100 ml/kg en 4 horas, en pequeñas cantidades frecuentes, reevaluando; luego se pasa al plan A."),
      qa("¿Por qué no se usan gaseosas ni jugos?", "Porque tienen mucha azúcar y poco sodio: su alta osmolaridad empeora la diarrea por arrastre osmótico."),
      qa("¿Por qué se indica zinc?", "Porque reduce la duración y la gravedad de la diarrea y las recurrencias en los meses siguientes."),
    ],
  },
  "diabetes-tipo-2-diagnostico": {
    anamnesis: [
      act("trabajo", "¿Cómo son sus horarios de trabajo y comidas?", "util", "“Turnos de doce horas, como lo que puedo en la terminal.”", "Los hábitos laborales condicionan el plan alimentario y la elección del fármaco."),
      act("hipoglucemia", "¿Maneja de noche o en rutas?", "util", "“Sí, a veces de noche.”", "Las hipoglucemias son peligrosas en choferes: se prefieren fármacos que no las producen."),
      act("animo", "¿Cómo está de ánimo?", "util", "“Preocupado por el trabajo.”", "La depresión y el estrés dificultan la adherencia."),
    ],
    exam: [act("ta", "Presión arterial repetida", "util", "142/88 y 140/86 mmHg.", "Probable hipertensión asociada: se confirma con controles ambulatorios.")],
    tribunal: [
      qa("¿Cuáles son los criterios diagnósticos de diabetes?", "Glucemia en ayunas ≥ 126 mg/dl (en dos ocasiones), glucemia a las 2 h de una PTOG ≥ 200, HbA1c ≥ 6,5 % (método estandarizado) o glucemia al azar ≥ 200 con síntomas."),
      qa("¿Por qué la metformina es el fármaco inicial?", "Porque reduce la producción hepática de glucosa, no causa hipoglucemia ni aumento de peso, tiene beneficios cardiovasculares y es barata y accesible."),
      qa("¿Qué complicaciones microvasculares se buscan al diagnóstico?", "Retinopatía (fondo de ojo), nefropatía (albuminuria y filtrado) y neuropatía (examen de pies con monofilamento)."),
      qa("¿Qué es el pie diabético y cómo se previene?", "Úlceras e infecciones por neuropatía, isquemia y deformidades. Se previene con examen anual de pies, calzado adecuado, autocuidado diario y control glucémico."),
    ],
  },
  "embarazo-ectopico-roto": {
    anamnesis: [
      act("mareo", "¿Se desmayó?", "clave", "“Casi, en el baño se me nubló la vista.”", "El presíncope indica sangrado importante."),
      act("embarazos", "¿Tuvo embarazos antes? ¿Algún ectópico?", "util", "“Un embarazo normal hace cuatro años.”", "Un ectópico previo es el mayor factor de riesgo de otro."),
      act("tabaco", "¿Fuma?", "util", "“Sí, medio atado.”", "El tabaco altera la motilidad tubaria y aumenta el riesgo."),
    ],
    exam: [act("abdomen-percusion", "Percusión abdominal", "util", "Matidez en flancos.", "Sugiere líquido libre (hemoperitoneo).")],
    tribunal: [
      qa("¿Cuáles son los factores de riesgo de embarazo ectópico?", "Ectópico previo, enfermedad pelviana inflamatoria, cirugía tubaria, tabaquismo, reproducción asistida, DIU (si hay embarazo con DIU, más probable que sea ectópico) y edad mayor de 35 años."),
      qa("¿Qué es la zona de discriminación de la beta-hCG?", "El valor (alrededor de 1.500–2.000 mUI/ml) por encima del cual un embarazo intrauterino debería verse por ecografía transvaginal. Útero vacío con beta por encima sugiere ectópico."),
      qa("¿Cuándo se puede usar metotrexato?", "En ectópicos no rotos, con paciente estable, beta-hCG baja (en general menor de 5.000), masa pequeña sin latido cardíaco y posibilidad de seguimiento."),
      qa("¿Dónde se implanta con más frecuencia?", "En la trompa (95 %), sobre todo en la ampolla; otras ubicaciones son el istmo, el intersticio (cuerno), el ovario, el cuello y el abdomen."),
    ],
  },
  "enfermedad-pelviana-inflamatoria": {
    anamnesis: [
      act("flujo", "¿Notó flujo distinto?", "util", "“Sí, amarillo y con olor.”", "Apoya la infección cervical ascendente."),
      act("pareja-sintomas", "¿Su pareja tiene ardor o secreción?", "util", "“Uno de ellos me dijo que le ardía al orinar.”", "Uretritis en la pareja: refuerza la sospecha de ITS."),
      act("sangrado", "¿Tiene sangrado entre menstruaciones o después de las relaciones?", "util", "“Un poco después de las relaciones.”", "La cervicitis es friable y sangra al contacto."),
    ],
    exam: [act("temperatura", "Temperatura", "util", "38,3 °C.", "La fiebre apoya el diagnóstico; su ausencia no lo descarta.")],
    tribunal: [
      qa("¿Cuáles son los criterios mínimos de EPI?", "En una mujer sexualmente activa con dolor pelviano y sin otra causa: dolor a la movilización cervical, o dolor uterino, o dolor anexial."),
      qa("¿Qué secuelas deja la EPI?", "Infertilidad tubaria, embarazo ectópico, dolor pelviano crónico y abscesos tuboováricos; el riesgo aumenta con cada episodio."),
      qa("¿Cuándo se interna una EPI?", "Con embarazo, absceso tuboovárico, mal estado general, fiebre alta, vómitos o intolerancia oral, falta de respuesta en 72 h o duda diagnóstica con un cuadro quirúrgico."),
      qa("¿Qué es el síndrome de Fitz-Hugh-Curtis?", "Una perihepatitis (inflamación de la cápsula hepática) asociada a la EPI, con dolor en el hipocondrio derecho."),
    ],
  },
  "epoc-exacerbacion": {
    anamnesis: [
      act("biomasa", "¿Cocinó o se calefaccionó con leña o carbón?", "util", "“De chico, en el campo, con leña.”", "El humo de biomasa es otra causa de EPOC, frecuente en mujeres de zonas rurales."),
      act("laboral", "¿Estuvo expuesto a polvo en el trabajo?", "util", "“Mucho polvo de obra, años.”", "La exposición laboral suma riesgo."),
      act("sueno", "¿Ronca o se despierta ahogado?", "util", "“Ronco mucho.”", "La apnea del sueño asociada (síndrome de superposición) empeora la hipercapnia."),
    ],
    exam: [act("dedos", "Dedos y cianosis", "util", "Cianosis central leve, sin hipocratismo.", "El hipocratismo digital no es típico de EPOC: si aparece, pensar en cáncer de pulmón o bronquiectasias.")],
    tribunal: [
      qa("¿Cómo se diagnostica la EPOC?", "Con espirometría en estabilidad: relación VEF₁/CVF menor de 0,70 después del broncodilatador, en una persona con síntomas y exposición a factores de riesgo."),
      qa("¿Qué son los criterios de Anthonisen?", "Aumento de la disnea, del volumen del esputo y de su purulencia. Con purulencia más otro criterio, o los tres, se indica antibiótico en la exacerbación."),
      qa("¿Qué tratamientos cambian el pronóstico de la EPOC?", "Dejar de fumar, oxigenoterapia crónica domiciliaria en hipoxemia grave (más de 15 h/día), rehabilitación respiratoria y vacunas; los broncodilatadores mejoran síntomas y exacerbaciones."),
      qa("¿Cuándo se indica oxígeno domiciliario?", "Con pO₂ ≤ 55 mmHg o saturación ≤ 88 % en reposo, o pO₂ 56–59 con hipertensión pulmonar, poliglobulia o insuficiencia cardíaca derecha."),
    ],
  },
  "reflujo-gastroesofagico": {
    anamnesis: [
      act("tos", "¿Tiene tos nocturna, ronquera o carraspera?", "util", "“Me levanto ronco a veces.”", "Síntomas extraesofágicos del reflujo (laringitis, tos, asma)."),
      act("edad-inicio", "¿Desde cuándo tiene estos síntomas?", "util", "“Hace un año, más o menos.”", "Un inicio reciente después de los 50–60 años es criterio de endoscopia."),
      act("familia", "¿Hay cáncer de estómago o esófago en la familia?", "util", "“No.”", "Factor de riesgo a considerar para la endoscopia."),
    ],
    exam: [act("peso", "Peso e IMC", "util", "96 kg, IMC 31.", "La obesidad es un blanco de tratamiento.")],
    tribunal: [
      qa("¿Qué síntomas de alarma obligan a hacer endoscopia?", "Disfagia, odinofagia, pérdida de peso, anemia, hemorragia digestiva, vómitos persistentes, masa palpable y síntomas nuevos después de los 50–60 años."),
      qa("¿Qué es el esófago de Barrett?", "La metaplasia del epitelio escamoso del esófago distal a epitelio columnar intestinal por reflujo crónico; es precursor del adenocarcinoma de esófago."),
      qa("¿Cómo actúan los inhibidores de la bomba de protones?", "Bloquean de forma irreversible la H⁺/K⁺-ATPasa de la célula parietal; por eso se toman antes de la comida, cuando las bombas se activan."),
    ],
  },
  "escabiosis-familiar": {
    anamnesis: [
      act("colecho", "¿Con quién duerme?", "util", "“Con la hermana y la mamá.”", "El colecho y el contacto piel con piel prolongado son la vía de contagio."),
      act("tiempo-otros", "¿Desde cuándo le pica a los demás?", "util", "“Al hermano desde la semana pasada.”", "La reacción aparece semanas después del contagio: por eso se trata a todos."),
      act("alergias", "¿Tiene alergias o piel atópica?", "util", "“No.”", "Ayuda con el diferencial de dermatitis atópica."),
    ],
    exam: [act("genitales", "Examen de axilas, areolas y genitales", "util", "Pápulas en axilas y cintura; sin lesiones genitales.", "En varones adultos los nódulos genitales son muy sugestivos.")],
    tribunal: [
      qa("¿Por qué el prurito aparece semanas después del contagio?", "Porque se debe a una reacción de hipersensibilidad tipo IV a los ácaros, huevos y heces, que tarda 3–6 semanas en desarrollarse en la primera infestación (en reinfestaciones, días)."),
      qa("¿Qué es la sarna costrosa (noruega)?", "Una forma con millones de ácaros, costras gruesas y poco prurito, en inmunosuprimidos, ancianos institucionalizados o personas con discapacidad. Es muy contagiosa y requiere ivermectina más tratamiento tópico."),
      qa("¿Cómo se aplica la permetrina?", "Al 5 %, en todo el cuerpo desde el cuello hacia abajo (en lactantes también cuero cabelludo y cara), por la noche, se enjuaga a las 8–12 h y se repite a los 7 días, en todos los convivientes a la vez."),
    ],
  },
  "escorpionismo-nina": {
    anamnesis: [
      act("parestesias", "¿Siente hormigueo o adormecimiento?", "util", "“Dice que le hormiguea el pie.”", "Las parestesias locales son parte del cuadro leve."),
      act("respiracion", "¿Le cuesta respirar o tose con espuma?", "clave", "“No.”", "El edema agudo de pulmón es la complicación más grave."),
      act("previa", "¿Ya vieron alacranes en la casa?", "util", "“Sí, cada tanto, en el baño.”", "Orienta la prevención en el hogar."),
    ],
    exam: [act("temperatura", "Temperatura y piel", "util", "Hipotermia leve (35,9 °C), piel fría y sudorosa.", "Signos de descarga autonómica.")],
    tribunal: [
      qa("¿Cómo se clasifica el escorpionismo?", "Leve: síntomas locales (dolor, parestesias). Moderado: síntomas sistémicos (vómitos, sudoración, sialorrea, taquicardia, hipertensión). Grave: vómitos profusos, alteraciones cardiorrespiratorias, edema pulmonar, shock."),
      qa("¿Por qué los niños tienen más riesgo?", "Porque reciben más veneno por kilo de peso; la mayoría de las muertes por escorpionismo en la Argentina son en menores de 14 años."),
      qa("¿Qué medidas preventivas se recomiendan en el hogar?", "Sacudir ropa y calzado antes de usarlos, colocar rejillas en desagües, burletes en puertas, revisar camas y cunas, no acumular escombros ni leña y mantener limpio el peridomicilio."),
    ],
  },
  "esguince-tobillo": {
    anamnesis: [
      act("ruido", "¿Escuchó un ruido al doblarse?", "util", "“Como un crack.”", "El chasquido es frecuente en esguinces; no confirma fractura."),
      act("dolor-donde", "¿Dónde le duele más?", "clave", "“Adelante del hueso de afuera del tobillo.”", "Dolor en partes blandas anterolaterales: ligamento peroneoastragalino anterior."),
      act("hielo", "¿Le pusieron hielo o lo vendaron?", "util", "“Hielo en el club.”", "Medida inicial correcta."),
    ],
    exam: [act("compresion", "Prueba de compresión de la pierna (sindesmosis)", "util", "Negativa.", "Positiva sugeriría lesión de la sindesmosis (esguince alto).")],
    tribunal: [
      qa("¿Cuáles son las reglas de Ottawa para tobillo?", "Radiografía si hay dolor en la zona maleolar más dolor a la palpación del borde posterior o la punta de algún maléolo, o incapacidad de dar 4 pasos (inmediatamente y en la consulta). Para el pie: base del 5.º metatarsiano o escafoides."),
      qa("¿Qué ligamentos forman el complejo lateral del tobillo?", "Peroneoastragalino anterior (el más lesionado), peroneocalcáneo y peroneoastragalino posterior."),
      qa("¿Cómo se gradúan los esguinces?", "Grado I: distensión sin laxitud. Grado II: rotura parcial con laxitud leve. Grado III: rotura completa con inestabilidad."),
    ],
  },
  "faringoamigdalitis-estreptococica": {
    anamnesis: [
      act("tragar", "¿Puede tragar? ¿Babea o le cuesta abrir la boca?", "clave", "“Le duele, pero traga.”", "El trismus, el babeo o la voz de papa caliente sugerirían absceso periamigdalino."),
      act("previas", "¿Cuántas anginas tuvo este año?", "util", "“Esta es la segunda.”", "Las recurrencias frecuentes pueden llevar a evaluar amigdalectomía."),
      act("cansancio", "¿Está muy cansado? ¿Tuvo ganglios en otros lados?", "util", "“No.”", "Orientaría a mononucleosis."),
    ],
    exam: [act("lengua", "Lengua y piel de la cara", "util", "Lengua normal; sin palidez peribucal.", "La lengua aframbuesada y el exantema áspero orientarían a escarlatina.")],
    tribunal: [
      qa("¿Qué es el score de Centor (o McIsaac)?", "Fiebre, exudado amigdalino, adenopatías cervicales anteriores dolorosas y ausencia de tos (más ajuste por edad). Con puntaje alto aumenta la probabilidad de estreptococo; se confirma con test rápido o cultivo."),
      qa("¿Por qué se trata la faringitis estreptocócica?", "Para prevenir la fiebre reumática (complicación no supurativa), las complicaciones supurativas (absceso) y acortar el contagio. El tratamiento no previene la glomerulonefritis."),
      qa("¿Cuál es el tratamiento de elección?", "Amoxicilina por 10 días (o penicilina benzatínica intramuscular en dosis única); en alérgicos, macrólidos o cefalosporinas según el tipo de alergia."),
      qa("¿Por qué no se da amoxicilina si se sospecha mononucleosis?", "Porque produce un exantema maculopapular en la mayoría de los pacientes con mononucleosis."),
    ],
  },
  "fibrilacion-auricular": {
    anamnesis: [
      act("ronquido", "¿Ronca o le dijeron que deja de respirar de noche?", "util", "“Ronco mucho.”", "La apnea obstructiva del sueño favorece la fibrilación auricular."),
      act("cafe", "¿Toma mucho café o energizantes?", "util", "“Dos cafés por día.”", "Desencadenante menor."),
      act("autonomia", "¿Quién lo ayuda con la medicación?", "util", "“Me arreglo solo, a veces me olvido.”", "La adherencia es clave para la anticoagulación."),
    ],
    exam: [act("ta-ambos", "Presión arterial", "util", "132/84 mmHg.", "Hemodinámicamente estable.")],
    tribunal: [
      qa("¿Cómo se clasifica la fibrilación auricular?", "Primer diagnóstico, paroxística (cede sola en menos de 7 días), persistente (más de 7 días o requiere cardioversión), persistente de larga duración (más de un año) y permanente (se decide no intentar el ritmo sinusal)."),
      qa("¿Qué es el CHA₂DS₂-VASc?", "Un puntaje de riesgo de ACV: insuficiencia cardíaca, hipertensión, edad ≥ 75 (2), diabetes, ACV/AIT/embolia previa (2), enfermedad vascular, edad 65–74 y sexo femenino. Se anticoagula con 2 o más en varones y 3 o más en mujeres."),
      qa("¿Qué es el HAS-BLED?", "Un puntaje de riesgo de sangrado (hipertensión, función renal o hepática anormal, ACV, sangrado, RIN lábil, edad mayor de 65, drogas o alcohol). No contraindica: sirve para corregir factores y vigilar."),
      qa("¿Cuándo se puede cardiovertir sin anticoagulación previa?", "Cuando la FA tiene menos de 48 h de evolución (con heparina) o si hay inestabilidad hemodinámica; si no, 3 semanas de anticoagulación o ecocardiograma transesofágico sin trombos."),
    ],
  },
  "fractura-de-cadera": {
    anamnesis: [
      act("dolor-previo", "¿Le dolía la cadera antes de caerse?", "util", "“No, nada.”", "Dolor previo podría indicar una fractura patológica o por estrés."),
      act("vision", "¿Ve bien? ¿Usa anteojos?", "util", "“Veo mal de noche, tengo cataratas.”", "La mala visión es un factor de riesgo de caídas a corregir."),
      act("caidas-previas", "¿Se cayó otras veces este año?", "clave", "“Dos veces más, sin lastimarme.”", "Las caídas repetidas obligan a una evaluación de riesgo y prevención."),
    ],
    exam: [act("ortostatismo", "Presión acostada y sentada", "util", "142/84 acostada; 128/78 sentada.", "Busca hipotensión ortostática como causa de caídas.")],
    tribunal: [
      qa("¿Cómo se clasifican las fracturas de cadera?", "Intracapsulares (del cuello femoral: riesgo de necrosis de la cabeza femoral; desplazadas suelen ir a artroplastia) y extracapsulares (intertrocantéricas y subtrocantéricas: se fijan con osteosíntesis)."),
      qa("¿Por qué es importante operar en menos de 48 h?", "Porque la demora aumenta la mortalidad, las complicaciones por inmovilización (neumonía, trombosis, úlceras), el delirium y el dolor."),
      qa("¿Qué es una fractura por fragilidad?", "La que se produce con un traumatismo de baja energía (como una caída desde la propia altura). Indica osteoporosis aunque no haya densitometría y obliga a tratarla."),
      qa("¿Cómo se previenen las caídas en adultos mayores?", "Revisión de fármacos (benzodiacepinas, antihipertensivos), ejercicio de fuerza y equilibrio, corrección visual, adaptación del hogar (alfombras, luces, barandas) y calzado adecuado."),
    ],
  },
  "gota-aguda": {
    anamnesis: [
      act("hora", "¿A qué hora empezó?", "util", "“A la madrugada me desperté del dolor.”", "Las crisis suelen comenzar de noche, cuando baja la temperatura periférica."),
      act("bebidas", "¿Toma gaseosas o jugos azucarados?", "util", "“Gaseosa todos los días.”", "La fructosa aumenta el ácido úrico."),
      act("familia", "¿Alguien en su familia tiene gota?", "util", "“Mi papá.”", "Carga genética."),
    ],
    exam: [act("fiebre", "Temperatura", "util", "37,6 °C.", "La gota puede dar febrícula; la fiebre alta obliga a descartar artritis séptica.")],
    tribunal: [
      qa("¿Qué fases tiene la gota?", "Hiperuricemia asintomática, crisis agudas intermitentes, períodos intercríticos sin síntomas y gota tofácea crónica."),
      qa("¿Qué fármacos aumentan el ácido úrico?", "Diuréticos tiazídicos y de asa, aspirina en dosis bajas, ciclosporina, pirazinamida y etambutol."),
      qa("¿Cuándo se indica tratamiento hipouricemiante?", "Con dos o más crisis por año, tofos, artropatía gotosa, litiasis renal o enfermedad renal crónica. Meta: ácido úrico menor de 6 mg/dl (menor de 5 con tofos)."),
      qa("¿Por qué se da profilaxis al iniciar alopurinol?", "Porque al bajar el ácido úrico se movilizan los depósitos y pueden desencadenarse crisis; se usa colchicina o AINE en dosis bajas los primeros meses."),
    ],
  },
  "hipertiroidismo-graves": {
    anamnesis: [
      act("animo", "¿Cómo está de ánimo y de sueño?", "util", "“Irritable, no duermo.”", "Síntomas neuropsiquiátricos de la tirotoxicosis."),
      act("menstruacion", "¿Cómo son las menstruaciones?", "util", "“Muy escasas.”", "Oligomenorrea por el exceso de hormona tiroidea."),
      act("peso-apetito", "¿Cómo está el apetito?", "util", "“Como el doble que antes.”", "Pérdida de peso con aumento del apetito: hipermetabolismo."),
    ],
    exam: [act("piel-pretibial", "Piel de las piernas", "util", "Sin mixedema pretibial.", "El mixedema pretibial (dermopatía) es específico de Graves.")],
    tribunal: [
      qa("¿Qué es la tirotoxicosis y en qué se diferencia del hipertiroidismo?", "Tirotoxicosis es el exceso de hormona tiroidea en los tejidos por cualquier causa; hipertiroidismo es cuando ese exceso se debe a mayor producción de la glándula (Graves, nódulo tóxico). Las tiroiditis dan tirotoxicosis sin hipertiroidismo."),
      qa("¿Qué es la tormenta tiroidea?", "Una tirotoxicosis grave con fiebre alta, taquicardia o FA, insuficiencia cardíaca, agitación o coma y síntomas digestivos, desencadenada por infecciones, cirugía o suspensión del tratamiento. Es una emergencia."),
      qa("¿Qué antitiroideo se usa en el embarazo?", "Propiltiouracilo en el primer trimestre (el metimazol es teratogénico en esa etapa) y luego metimazol."),
    ],
  },
  "guillain-barre": {
    anamnesis: [
      act("diplopia", "¿Ve doble o le cuesta cerrar los ojos o sonreír?", "util", "“Me cuesta soplar y cerrar fuerte los ojos.”", "Compromiso facial (en coherencia con la paresia facial periférica bilateral)."),
      act("tiempo", "¿En cuántos días llegó a esta debilidad?", "util", "“En tres días.”", "Progresión en días a semanas (llega al máximo antes de las 4 semanas)."),
      act("orina-color", "¿Orina oscuro o tiene dolores musculares fuertes?", "util", "“No.”", "Orientaría a rabdomiólisis."),
    ],
    exam: [act("cvf", "Contar en voz alta en una sola respiración", "clave", "Llega hasta 12.", "Contar menos de 20 sugiere capacidad vital baja: riesgo de insuficiencia respiratoria.")],
    tribunal: [
      qa("¿Cuáles son las características del Guillain-Barré?", "Debilidad progresiva, simétrica y ascendente, con arreflexia, en días a semanas, a menudo tras una infección (Campylobacter jejuni, virus); puede afectar pares craneales, la respiración y el sistema autónomo."),
      qa("¿Qué muestra el líquido cefalorraquídeo?", "Disociación albuminocitológica: proteínas elevadas con células normales (puede ser normal la primera semana)."),
      qa("¿Qué indica intubar a un paciente con Guillain-Barré?", "Capacidad vital menor de 20 ml/kg, presión inspiratoria máxima menor de 30 cmH₂O, presión espiratoria menor de 40 (regla 20-30-40), disfagia con riesgo de aspiración o hipoxemia/hipercapnia."),
      qa("¿Cuál es el tratamiento?", "Inmunoglobulina endovenosa o plasmaféresis (igual de eficaces), más soporte (ventilación, disautonomía, tromboprofilaxis, dolor). Los corticoides no sirven."),
    ],
  },
  "hemorragia-digestiva-alta": {
    anamnesis: [
      act("anticoag", "¿Toma clopidogrel o anticoagulantes?", "clave", "“No, solo el ibuprofeno.”", "Los antitrombóticos aumentan el sangrado y cambian el manejo."),
      act("cuantas", "¿Cuántas veces hizo materia fecal negra?", "util", "“Tres veces desde ayer.”", "Ayuda a estimar la magnitud."),
      act("previo", "¿Tuvo úlceras antes?", "util", "“No.”", "Una úlcera previa aumenta el riesgo de recurrencia."),
    ],
    exam: [act("palidez", "Palidez y conjuntivas", "util", "Pálido, conjuntivas hipocoloreadas.", "Anemia clínica.")],
    tribunal: [
      qa("¿Qué es la clasificación de Forrest?", "Clasifica la úlcera sangrante por su aspecto endoscópico: Ia (sangrado en chorro), Ib (en napa), IIa (vaso visible), IIb (coágulo adherido), IIc (base pigmentada) y III (base limpia). Ia–IIa requieren tratamiento endoscópico."),
      qa("¿Qué es el puntaje de Glasgow-Blatchford?", "Un puntaje con urea, hemoglobina, presión sistólica, frecuencia cardíaca, melena, síncope, hepatopatía e insuficiencia cardíaca. Un puntaje de 0–1 permite manejo ambulatorio; puntajes altos requieren internación y endoscopia."),
      qa("¿Por qué sube la urea en la hemorragia alta?", "Porque la sangre se digiere y absorbe como proteína en el intestino, y además hay hipoperfusión renal; la relación urea/creatinina aumenta."),
      qa("¿Qué cambia si el sangrado es por várices?", "Se agregan vasoactivos (octreotide o terlipresina) y antibiótico profiláctico (ceftriaxona), y la endoscopia trata con ligadura con bandas."),
    ],
  },
  "hemorragia-posparto-atonia": {
    anamnesis: [
      act("alumbramiento", "¿Le dieron oxitocina después del nacimiento?", "clave", "Se registró oxitocina 10 UI intramuscular tras el nacimiento.", "El manejo activo del alumbramiento es la principal prevención; aun así puede haber atonía."),
      act("anemia", "¿Tenía anemia en el embarazo?", "util", "Hb de 10,8 g/dl en el tercer trimestre.", "La anemia previa reduce la tolerancia a la pérdida."),
      act("cesareas", "¿Tuvo cesáreas antes?", "util", "No, dos partos vaginales.", "Las cesáreas previas aumentan el riesgo de acretismo placentario."),
    ],
    exam: [act("diuresis", "Diuresis horaria (sonda vesical)", "util", "20 ml en la última hora.", "La oliguria refleja hipoperfusión; la sonda además vacía la vejiga, que dificulta la contracción uterina.")],
    tribunal: [
      qa("¿Qué son las 4 T de la hemorragia posparto?", "Tono (atonía uterina, 70–80 %), Trauma (desgarros, hematomas, rotura o inversión uterina), Tejido (retención de placenta o coágulos) y Trombina (coagulopatía)."),
      qa("¿Cómo se define la hemorragia posparto?", "Pérdida de 500 ml o más tras un parto vaginal o 1.000 ml tras una cesárea, o cualquier pérdida con signos de inestabilidad hemodinámica."),
      qa("¿Qué es el manejo activo del alumbramiento?", "Administrar oxitocina inmediatamente después del nacimiento, tracción controlada del cordón y masaje uterino tras la salida de la placenta: reduce la hemorragia posparto."),
      qa("¿Qué uterotónicos conocés y sus contraindicaciones?", "Oxitocina (primera línea), ergonovina (contraindicada en hipertensión y preeclampsia), misoprostol y carbetocina."),
    ],
  },
  "hipoglucemia-sulfonilurea": {
    anamnesis: [
      act("otros-farmacos", "¿Tomó otros medicamentos nuevos?", "util", "“Un antibiótico para la gripe, creo que era para la garganta.”", "Algunos antibióticos (por ejemplo, claritromicina, quinolonas, TMS) potencian a las sulfonilureas."),
      act("alcohol", "¿Toma alcohol?", "util", "“No.”", "El alcohol inhibe la gluconeogénesis y potencia la hipoglucemia."),
      act("vive", "¿Vive sola?", "util", "“Sí, la vemos todos los días.”", "Importa para el alta segura."),
    ],
    exam: [act("glucemia-post", "Reevaluación neurológica después de la dextrosa", "clave", "A los 10 minutos: lúcida, sin déficit motor.", "La reversión del déficit confirma que la hipoglucemia era la causa.")],
    tribunal: [
      qa("¿Qué es la tríada de Whipple?", "Síntomas compatibles con hipoglucemia, glucemia baja documentada en ese momento y mejoría de los síntomas al corregirla. Confirma una hipoglucemia verdadera."),
      qa("¿Cómo se clasifica la hipoglucemia en diabéticos?", "Nivel 1: menor de 70 mg/dl. Nivel 2: menor de 54 mg/dl. Nivel 3 (grave): con alteración mental o física que requiere ayuda de otra persona, cualquiera sea el valor."),
      qa("¿Qué es la hipoglucemia inadvertida?", "La pérdida de los síntomas de alarma adrenérgicos por hipoglucemias repetidas, neuropatía autonómica, edad avanzada o betabloqueantes; el paciente pasa directo a los síntomas neurológicos."),
      qa("¿Qué fármacos para la diabetes no producen hipoglucemia por sí solos?", "Metformina, inhibidores de DPP-4, agonistas de GLP-1, inhibidores de SGLT2 y pioglitazona. Sí la producen la insulina y las sulfonilureas."),
    ],
  },
};
