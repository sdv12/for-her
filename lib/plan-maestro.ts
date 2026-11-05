import { addDays, format, getDay, parseISO } from "date-fns";
import type { ISODate, Weekday } from "@/lib/data/types";
import { draftKey } from "@/lib/plan-import/draft";
import type { DraftDay, DraftPhase, DraftWeek, PlanDraft } from "@/lib/plan-import/types";

/*
 * Plan maestro integrado · examen de reingreso FCM-UNC (24 semanas, 4 fases, 10 ejes).
 * Se carga como plantilla desde Plan → Importar. Las semanas 2 a 24 van en sus fechas (lunes a viernes);
 * la semana 1 arranca el día que se carga (si es antes del 13 de noviembre) para empezar "desde esta semana".
 * Cada semana: temas troncales (prioridad 1 a 3), patologías (van al Temario), eje y plantilla DFDCT.
 */

type Tema = [text: string, priority: 1 | 2 | 3];

type MaestroWeek = {
  num: number;
  /** Lunes de la semana (semana 1: ver buildPlanMaestro). */
  monday: ISODate;
  fase: 1 | 2 | 3 | 4;
  /** "E1 · …": el código de eje lo usa el cronograma integrado. */
  title: string;
  priority: "Alta" | "Media";
  subject: string;
  temas: Tema[];
  patologias: string[];
  materias: string;
  dfdct: string;
};

export const MAESTRO_FASES: Array<{ num: 1 | 2 | 3 | 4; name: string; description: string; alert: string }> = [
  { num: 1, name: "Bases", description: "Bases metabólicas, cardiovascular, fisiopatología fundamental.", alert: "Explicar por qué aparece la enfermedad antes de memorizar tratamientos." },
  {
    num: 2,
    name: "Grandes síndromes",
    description: "Sepsis, VIH/TBC, respiratorio, renal, oncología, obstetricia, pediatría, neurología, cirugía.",
    alert: "Partir de un síntoma y construir diagnósticos diferenciales.",
  },
  {
    num: 3,
    name: "Especialidades",
    description: "Endócrino avanzado, dermatología, oftalmología, traumatología, inmunología, digestivo, salud pública.",
    alert: "Reconocer cambios de presentación según órgano, edad y contexto.",
  },
  { num: 4, name: "Integración", description: "Casos clínicos multimaterias, farmacología aplicada, simulacros orales, repaso final.", alert: "Resolver un caso sin pensar primero a qué materia pertenece." },
];

export const MAESTRO_WEEKS: MaestroWeek[] = [
  {
    num: 1, monday: "2026-11-09", fase: 1, title: "E1 · Bases metabólicas", priority: "Alta", subject: "Clínica",
    temas: [["Anatomía del páncreas endocrino, riñón, retina, nervios periféricos y pie", 1], ["Lesión celular: necrosis, apoptosis, edema", 1], ["Fisiología de insulina, glucagón y metabolismo de la glucosa", 2], ["Fisiopatología de la DM tipo 1 y tipo 2", 3], ["Complicaciones agudas: CAD, EHH, hipoglucemia", 3]],
    patologias: ["DM tipo 1", "DM tipo 2", "Cetoacidosis diabética", "Estado hiperglucémico hiperosmolar", "Hipoglucemia"],
    materias: "Anatomía · Patología · Farmacología I",
    dfdct: "DM: definición → fisiopatología (glucotoxicidad) → diagnóstico (glucemia, HbA1c) → clínica (poliuria, polidipsia, polifagia) → tratamiento (insulina, metformina).",
  },
  {
    num: 2, monday: "2026-11-16", fase: 1, title: "E1 · Complicaciones crónicas de la diabetes", priority: "Alta", subject: "Clínica",
    temas: [["Complicaciones microvasculares: retinopatía (estadios), nefropatía (microalbuminuria a ERC terminal), neuropatía", 1], ["Complicaciones macrovasculares: enfermedad coronaria, cerebrovascular y arterial periférica", 1], ["Pie diabético: neuropático vs isquémico vs infectado", 2], ["Obesidad y síndrome metabólico", 3], ["Tratamiento de la DM2: metformina, iSGLT2, GLP-1, insulina", 3]],
    patologias: ["Retinopatía diabética", "Nefropatía diabética", "Neuropatía diabética", "Pie diabético", "Obesidad", "Síndrome metabólico"],
    materias: "Farmacología I · Dermatología · Oftalmología · Traumatología · Salud Comunitaria",
    dfdct: "Pie diabético: definición → fisiopatología (neuropatía + isquemia + infección) → diagnóstico (eco Doppler, Rx de pie) → clínica → tratamiento (descarga, antibióticos, cirugía).",
  },
  {
    num: 3, monday: "2026-11-23", fase: 1, title: "E2 · Bases cardiovasculares", priority: "Alta", subject: "Clínica",
    temas: [["Anatomía del corazón, coronarias, sistema de conducción y polígono de Willis", 1], ["Fisiopatología de la aterosclerosis: placa, rotura, trombosis", 1], ["HTA: clasificación, daño de órgano blanco, urgencia vs emergencia", 2], ["Farmacología antihipertensiva: IECA, ARA II, betabloqueantes, calcioantagonistas, tiazidas, furosemida", 3], ["Fisiopatología de la IC: Frank-Starling, remodelado, BNP", 3]],
    patologias: ["Hipertensión arterial", "Crisis hipertensiva", "Aterosclerosis", "Insuficiencia cardíaca"],
    materias: "Anatomía · Patología · Farmacología I y II",
    dfdct: "HTA: definición → fisiopatología (SRAA, sistema simpático) → diagnóstico (MAPA) → clínica (órgano blanco: corazón, riñón, retina, cerebro) → tratamiento escalonado.",
  },
  {
    num: 4, monday: "2026-11-30", fase: 1, title: "E2 · SCA, arritmias y valvulopatías", priority: "Alta", subject: "Clínica",
    temas: [["SCA: angina estable e inestable, IAM, troponina, ECG evolutivo (cara anterior, inferior, lateral)", 1], ["Reperfusión: angioplastia vs fibrinólisis, ventanas", 1], ["Arritmias: FA (CHA2DS2-VASc, cardioversión, anticoagulantes), bloqueos AV, TSV, TV y FV", 2], ["Valvulopatías: estenosis aórtica, insuficiencia mitral, estenosis mitral, insuficiencia aórtica", 3], ["Shock: hipovolémico, cardiogénico, distributivo, obstructivo", 3]],
    patologias: ["IAM SCACEST y SCASEST", "Angina estable e inestable", "Fibrilación auricular", "Valvulopatías", "Shock cardiogénico"],
    materias: "Clínica Médica · Farmacología I y II · Cirugía",
    dfdct: "IAM: definición → fisiopatología (rotura de placa, oclusión coronaria, necrosis) → diagnóstico (troponina, ECG) → clínica (dolor precordial irradiado) → tratamiento (AAS + ticagrelor + angioplastia).",
  },
  {
    num: 5, monday: "2026-12-07", fase: 2, title: "E3 · Sepsis y shock séptico", priority: "Alta", subject: "Infectología",
    temas: [["Definición Sepsis-3: SOFA y qSOFA", 1], ["Fisiopatología: de la respuesta inflamatoria a la disfunción orgánica", 1], ["Bundle de la primera hora: lactato, hemocultivos, fluidos, antibióticos, vasopresores", 2], ["Focos de sepsis: pulmonar, urinario, abdominal, piel y partes blandas, catéter", 3], ["Gérmenes por foco, tratamiento empírico y desescalada", 3]],
    patologias: ["Sepsis", "Shock séptico"],
    materias: "Infectología · Farmacología I · Cirugía · Salud Comunitaria",
    dfdct: "Sepsis: definición → fisiopatología (respuesta inflamatoria desregulada) → diagnóstico (qSOFA, SOFA, lactato) → clínica (fiebre o hipotermia, taquicardia, hipotensión) → tratamiento (bundle de 1 hora).",
  },
  {
    num: 6, monday: "2026-12-14", fase: 2, title: "E3 · VIH, TBC e ITS", priority: "Alta", subject: "Infectología",
    temas: [["VIH: estadios, CD4, carga viral, infecciones oportunistas", 1], ["Tratamiento antirretroviral de primera línea en Argentina (basado en dolutegravir)", 1], ["TBC: PPD, IGRA, esquema HRZE, TBC extrapulmonar, TBC y VIH", 2], ["Sífilis: fases, diagnóstico serológico (VDRL, FTA-abs), tratamiento", 3], ["ITS: gonorrea, clamidia, herpes genital, HPV", 3], ["EPI: criterios diagnósticos y tratamiento", 3]],
    patologias: ["VIH/SIDA", "Tuberculosis", "Sífilis", "Gonorrea y clamidia", "Enfermedad pelviana inflamatoria", "HPV"],
    materias: "Infectología · Ginecología · Salud Comunitaria",
    dfdct: "VIH: definición → fisiopatología (destrucción de CD4) → diagnóstico (ELISA y confirmatorio, CD4, carga viral) → clínica por estadio → tratamiento (TARV: 2 ITRN + 1 INSTI).",
  },
  {
    num: 7, monday: "2027-01-04", fase: 2, title: "E3 · Infecciones regionales y emergentes", priority: "Alta", subject: "Infectología",
    temas: [["Hepatitis A, B y C: transmisión, serología, cronicidad, cirrosis", 1], ["Dengue: signos de alarma, manejo ambulatorio vs internación", 1], ["Chagas: vector, fases, miocardiopatía, megavísceras", 2], ["Leptospirosis, hantavirosis y tétanos", 3], ["Celulitis vs erisipela vs fascitis necrotizante", 3], ["Osteomielitis y artritis séptica", 3], ["Resistencia antimicrobiana: SAMR, BLEE, Clostridioides difficile", 3]],
    patologias: ["Hepatitis A, B y C", "Dengue", "Chagas", "Leptospirosis", "Celulitis y erisipela", "Osteomielitis"],
    materias: "Infectología · Bacteriología · Dermatología · Traumatología",
    dfdct: "Hepatitis B: definición → fisiopatología (inmunopatología) → diagnóstico (HBsAg, HBeAg, anti-HBc) → clínica → tratamiento (tenofovir si está indicado).",
  },
  {
    num: 8, monday: "2027-01-11", fase: 2, title: "E8 · Respiratorio", priority: "Alta", subject: "Clínica",
    temas: [["EPOC: criterios GOLD, espirometría (VEF1/CVF menor de 0,7), exacerbación", 1], ["Asma: GINA escalonado, crisis, status asmático, cuándo intubar", 1], ["NAC: CURB-65, gérmenes, tratamiento", 2], ["TEP: Wells, dímero D, angioTC, anticoagulación y trombólisis", 3], ["SDRA: criterios de Berlín, ventilación protectora", 3], ["Insuficiencia respiratoria tipo I vs II por gasometría", 3]],
    patologias: ["EPOC", "Asma", "Neumonía de la comunidad", "TEP", "SDRA", "Insuficiencia respiratoria"],
    materias: "Clínica Médica · Farmacología I · Cirugía · Salud Comunitaria",
    dfdct: "EPOC exacerbada: definición → fisiopatología (atrapamiento aéreo, hiperinsuflación) → diagnóstico (espirometría, Rx) → clínica (disnea, sibilancias, músculos accesorios) → tratamiento (broncodilatadores, corticoides, O₂ controlado, antibiótico si es infecciosa).",
  },
  {
    num: 9, monday: "2027-01-18", fase: 2, title: "E7 · Renal y ácido-base", priority: "Alta", subject: "Clínica",
    temas: [["IRA: prerrenal (FENa menor de 1 %), NTA (FENa mayor de 2 %), posrenal", 1], ["Criterios KDIGO de IRA (creatinina y diuresis)", 1], ["ERC: estadios 1 a 5, filtrado, complicaciones", 2], ["Gasometría sistemática: pH, pCO₂, bicarbonato, compensación", 3], ["Anión gap y fórmula de Winter", 3], ["SIADH: diagnóstico, causas, corrección lenta", 3], ["Hiperpotasemia: ECG y tratamiento de urgencia", 3]],
    patologias: ["Insuficiencia renal aguda", "Enfermedad renal crónica", "Acidosis metabólica", "SIADH", "Hiperpotasemia"],
    materias: "Clínica Médica · Farmacología I · Salud Comunitaria",
    dfdct: "IRA prerrenal: definición → fisiopatología (hipoperfusión renal) → diagnóstico (FENa menor de 1 %, urea/creatinina mayor de 20) → clínica (oliguria) → tratamiento (fluidos y causa).",
  },
  {
    num: 10, monday: "2027-01-25", fase: 2, title: "E4 · Oncología y hematología", priority: "Alta", subject: "Clínica",
    temas: [["Neoplasias: de la displasia a la metástasis", 1], ["Cáncer de cuello uterino: HPV 16 y 18, PAP, colposcopía, vacuna", 1], ["Cáncer de mama: factores de riesgo, mamografía, receptores, estadificación", 2], ["Cáncer colorrectal: factores de riesgo, colonoscopía, sangre oculta", 3], ["Anemias: ferropénica, megaloblástica, hemolítica", 3], ["Leucemias: LMA, LMC, LLC", 3], ["Linfomas Hodgkin vs no Hodgkin", 3], ["Mieloma múltiple", 3]],
    patologias: ["Cáncer de cuello uterino", "Cáncer de mama", "Cáncer colorrectal", "Anemias", "Leucemias", "Linfomas", "Mieloma múltiple"],
    materias: "Ginecología · Hematología · Patología · Salud Comunitaria",
    dfdct: "Cáncer de cuello: definición → fisiopatología (integración del HPV, displasia, carcinoma) → diagnóstico (PAP, colposcopía, biopsia) → clínica (sangrado poscoital, tardío) → tratamiento según estadio.",
  },
  {
    num: 11, monday: "2027-02-01", fase: 2, title: "E5 · Obstetricia", priority: "Alta", subject: "Ginecología y obstetricia",
    temas: [["Control prenatal normal: semanas clave, laboratorios, ecografías", 1], ["Embarazo ectópico: factores de riesgo, beta-hCG, eco TV, metotrexato vs cirugía", 1], ["Aborto: tipos y aborto séptico", 2], ["Preeclampsia: criterios y fisiopatología", 3], ["Eclampsia y sulfato de magnesio; HELLP", 3], ["Hemorragia obstétrica: placenta previa, DPPNI, atonía", 3], ["Amenaza de parto pretérmino y RPM", 3], ["Diabetes gestacional", 3]],
    patologias: ["Control prenatal", "Embarazo ectópico", "Aborto", "Preeclampsia, eclampsia y HELLP", "Hemorragia obstétrica", "Amenaza de parto pretérmino", "Diabetes gestacional"],
    materias: "Ginecología · Farmacología II · Infectología · Salud Comunitaria",
    dfdct: "Preeclampsia: definición (desde las 20 semanas, PA de 140/90 o más con proteinuria) → fisiopatología (placentación anormal, disfunción endotelial) → diagnóstico → clínica (cefalea, escotomas, epigastralgia) → tratamiento definitivo: el parto.",
  },
  {
    num: 12, monday: "2027-02-08", fase: 2, title: "E5 · Ginecología y pediatría", priority: "Alta", subject: "Ginecología y obstetricia",
    temas: [["SOP: criterios de Rotterdam", 1], ["Endometriosis: dolor pelviano, dismenorrea, infertilidad", 1], ["Anticoncepción: tipos, eficacia, contraindicaciones", 2], ["Cardiopatías congénitas acianóticas vs cianóticas", 3], ["Hitos del desarrollo psicomotor", 3], ["Convulsiones febriles: simple vs compleja", 3], ["Meningitis pediátrica: gérmenes por edad", 3], ["Sepsis neonatal precoz vs tardía", 3]],
    patologias: ["SOP", "Endometriosis", "Anticoncepción", "Cardiopatías congénitas", "Convulsiones febriles", "Meningitis pediátrica", "Sepsis neonatal"],
    materias: "Ginecología · Pediatría · Salud Comunitaria",
    dfdct: "SOP: definición → fisiopatología (resistencia a la insulina, hiperandrogenismo, anovulación) → diagnóstico (Rotterdam) → clínica (irregularidad menstrual, hirsutismo, acné) → tratamiento (estilo de vida, anticonceptivos, metformina).",
  },
  {
    num: 13, monday: "2027-02-15", fase: 2, title: "E9 · Sistema nervioso", priority: "Media", subject: "Neurología",
    temas: [["ACV isquémico: territorios, ventana de 4,5 h, contraindicaciones de trombólisis", 1], ["ACV hemorrágico: HSA y hemorragia intracerebral", 1], ["AIT: urgencia, ABCD2, estudio etiológico", 2], ["Epilepsia y status epiléptico", 3], ["Parkinson: síntomas cardinales y levodopa", 3], ["Delirium vs demencia", 3], ["Meningitis: LCR bacteriana vs viral vs TBC", 3], ["Guillain-Barré", 3]],
    patologias: ["ACV isquémico", "ACV hemorrágico y HSA", "AIT", "Status epiléptico", "Parkinson", "Alzheimer", "Delirium", "Meningitis", "Guillain-Barré"],
    materias: "Neurología · Farmacología I y II · Cirugía · Salud Comunitaria",
    dfdct: "ACV isquémico: definición → fisiopatología (oclusión arterial, penumbra) → diagnóstico (TC sin contraste urgente) → clínica (FAST) → tratamiento (trombólisis antes de las 4,5 h, trombectomía si está disponible).",
  },
  {
    num: 14, monday: "2027-02-22", fase: 2, title: "E6 · Cirugía y abdomen agudo", priority: "Alta", subject: "Cirugía",
    temas: [["Abdomen agudo: anamnesis y signos (Blumberg, psoas, Murphy, McBurney)", 1], ["Apendicitis: Alvarado, imágenes, laparoscopía", 1], ["Colecistitis: Murphy, ecografía, colecistectomía", 2], ["Colangitis: tríada y péntada, CPRE urgente", 3], ["Pancreatitis: Ranson, Balthazar, manejo", 3], ["Obstrucción intestinal: mecánica vs paralítica", 3], ["Hernias: directa vs indirecta, atascada, estrangulada", 3], ["HDA: Forrest, endoscopía urgente, IBP EV", 3], ["Peritonitis primaria vs secundaria", 3]],
    patologias: ["Apendicitis aguda", "Colecistitis y colangitis", "Pancreatitis aguda", "Obstrucción intestinal", "Hernias", "Hemorragia digestiva alta", "Peritonitis"],
    materias: "Cirugía · Infectología · Farmacología I · Salud Comunitaria",
    dfdct: "Apendicitis: definición → fisiopatología (obstrucción, distensión, isquemia, perforación) → diagnóstico (Alvarado, TC) → clínica (dolor en McBurney, Blumberg, fiebre) → tratamiento (laparoscopía urgente).",
  },
  {
    num: 15, monday: "2027-03-01", fase: 3, title: "E1+E2 · Endócrino avanzado", priority: "Media", subject: "Clínica",
    temas: [["Hipotiroidismo: Hashimoto, TSH alta, T4 baja, levotiroxina", 1], ["Hipertiroidismo: Graves, tormenta tiroidea", 1], ["Nódulo tiroideo: PAAF, cáncer de tiroides", 2], ["Insuficiencia suprarrenal y crisis adrenal", 3], ["Cushing: cortisol y supresión con dexametasona", 3], ["Feocromocitoma", 3], ["Hiperaldosteronismo primario", 3]],
    patologias: ["Hipotiroidismo", "Hipertiroidismo", "Nódulo tiroideo", "Insuficiencia suprarrenal", "Síndrome de Cushing", "Feocromocitoma", "Hiperaldosteronismo"],
    materias: "Endocrinología · Farmacología I y II · Cirugía",
    dfdct: "Cushing: definición → fisiopatología (hipercortisolismo) → diagnóstico (cortisol libre urinario, supresión con 1 mg) → clínica (facies de luna llena, estrías violáceas, hiperglucemia) → tratamiento según la causa.",
  },
  {
    num: 16, monday: "2027-03-08", fase: 3, title: "E10 · Dermatología y oftalmología", priority: "Media", subject: "Dermatología",
    temas: [["Lesiones elementales de la piel: primarias y secundarias", 1], ["Melanoma: ABCDE, Breslow, ganglio centinela", 1], ["Carcinoma basocelular vs espinocelular", 2], ["Psoriasis", 3], ["Anafilaxia: adrenalina 0,3 mg IM; angioedema", 3], ["Stevens-Johnson y NET", 3], ["Glaucoma agudo vs crónico", 3], ["Retinopatía diabética e hipertensiva", 3], ["Trauma ocular", 3]],
    patologias: ["Melanoma", "Carcinoma basocelular y espinocelular", "Psoriasis", "Anafilaxia", "Stevens-Johnson y NET", "Glaucoma agudo", "Retinopatías"],
    materias: "Dermatología · Oftalmología · Farmacología I y II",
    dfdct: "Anafilaxia: definición → fisiopatología (IgE, degranulación del mastocito, histamina) → diagnóstico clínico (urticaria, hipotensión, broncoespasmo) → tratamiento (adrenalina 0,3 mg IM inmediata).",
  },
  {
    num: 17, monday: "2027-03-15", fase: 3, title: "E6 · Traumatología avanzada", priority: "Media", subject: "Cirugía",
    temas: [["Fracturas: clasificación y complicaciones", 1], ["Fractura de cadera: cirugía precoz", 1], ["Fractura de columna: estabilización y déficit neurológico", 2], ["Síndrome compartimental y fasciotomía", 3], ["Politraumatizado: ATLS (ABCDE)", 3], ["Lumbalgia: banderas rojas", 3], ["Artritis reumatoidea", 3], ["Gota", 3], ["Osteoporosis", 3]],
    patologias: ["Fractura de cadera", "Síndrome compartimental", "Politraumatizado", "Artritis reumatoidea", "Gota", "Osteoporosis"],
    materias: "Traumatología · Cirugía · Farmacología I y II · Salud Comunitaria",
    dfdct: "Artritis reumatoidea: definición → fisiopatología (sinovitis, erosión ósea) → diagnóstico (FR, anti-CCP, Rx) → clínica (rigidez matinal, simétrica, pequeñas articulaciones) → tratamiento (metotrexato + ácido fólico).",
  },
  {
    num: 18, monday: "2027-03-22", fase: 3, title: "E3+E10 · Infecciones especiales e inmunología", priority: "Media", subject: "Infectología",
    temas: [["LES: autoanticuerpos, criterios, nefritis lúpica", 1], ["Vasculitis de vaso pequeño, mediano y grande", 1], ["Artritis séptica vs gota: punción articular", 2], ["Toxoplasmosis", 3], ["Hidatidosis", 3], ["Clostridioides difficile", 3], ["Síndrome antifosfolipídico", 3], ["Sarcoidosis", 3]],
    patologias: ["Lupus eritematoso sistémico", "Vasculitis", "Toxoplasmosis", "Hidatidosis", "Clostridioides difficile", "Síndrome antifosfolipídico", "Sarcoidosis"],
    materias: "Infectología · Bacteriología · Inmunología · Farmacología II",
    dfdct: "LES: definición → fisiopatología (autoanticuerpos, inmunocomplejos, inflamación) → diagnóstico (ANA, anti-dsDNA, criterios) → clínica (eritema malar, artritis, serositis) → tratamiento (hidroxicloroquina, corticoides, inmunomoduladores).",
  },
  {
    num: 19, monday: "2027-03-29", fase: 3, title: "Digestivo avanzado", priority: "Media", subject: "Clínica",
    temas: [["Cirrosis: Child-Pugh y complicaciones", 1], ["Peritonitis bacteriana espontánea", 1], ["Encefalopatía hepática", 2], ["HDA variceal", 3], ["Carcinoma hepatocelular", 3], ["ERGE y esófago de Barrett", 3], ["EII: Crohn vs colitis ulcerosa", 3], ["Pancreatitis crónica", 3], ["Cáncer de páncreas", 3]],
    patologias: ["Cirrosis e hipertensión portal", "Peritonitis bacteriana espontánea", "Encefalopatía hepática", "HDA variceal", "Carcinoma hepatocelular", "Enfermedad inflamatoria intestinal", "Cáncer de páncreas"],
    materias: "Clínica Médica · Cirugía · Infectología · Farmacología II",
    dfdct: "Cirrosis: definición → fisiopatología (fibrosis y nódulos de regeneración, hipertensión portal) → diagnóstico (Child-Pugh) → clínica (ascitis, hepatoesplenomegalia, arañas vasculares) → tratamiento (causa, complicaciones, trasplante).",
  },
  {
    num: 20, monday: "2027-04-05", fase: 3, title: "Salud mental y salud pública", priority: "Media", subject: "Salud mental / psiquiatría",
    temas: [["Depresión mayor: criterios DSM-5 y tratamiento", 1], ["Trastorno bipolar y litio", 1], ["Esquizofrenia y antipsicóticos", 2], ["Abstinencia alcohólica y delirium tremens", 3], ["Delirium vs demencia", 3], ["Epidemiología: RR, OR, sensibilidad, especificidad, VPP, VPN, NNT", 3], ["Mortalidad infantil y materna, transición epidemiológica", 3], ["Determinantes sociales y tamizaje", 3], ["Uso racional de medicamentos", 3]],
    patologias: ["Depresión mayor", "Trastorno bipolar", "Esquizofrenia", "Abstinencia alcohólica", "Delirium"],
    materias: "Salud Mental · Salud Comunitaria I, II y III · Farmacología II",
    dfdct: "Depresión: definición (DSM-5: 5 o más síntomas por 2 semanas, con ánimo deprimido o anhedonia) → fisiopatología (monoaminas) → diagnóstico clínico (PHQ-9) → clínica → tratamiento (ISRS + psicoterapia).",
  },
  {
    num: 21, monday: "2027-04-12", fase: 4, title: "Integración: casos clínicos multimaterias", priority: "Alta", subject: "Clínica",
    temas: [["Caso: 60 años, obeso, hipertenso, diabético con SCA, ERC y retinopatía", 1], ["Caso: mujer de 35 años con fiebre y dolor lumbar: pielonefritis vs sepsis urinaria", 1], ["Caso: 25 años, VIH con CD4 de 90, fiebre y cefalea: criptococosis meníngea", 2], ["Caso: embarazada de 32 semanas, PA 160/110 y epigastralgia: preeclampsia y HELLP", 3], ["Repaso de las preguntas troncales del banco por eje", 3]],
    patologias: [],
    materias: "Todas",
    dfdct: "DFDCT integrado: definición → fisiopatología (conexión entre ejes) → diferencial (3 hipótesis) → clínica (signos de alarma) → tratamiento escalonado.",
  },
  {
    num: 22, monday: "2027-04-19", fase: 4, title: "Integración: farmacología aplicada", priority: "Alta", subject: "Farmacología y FCO aplicada",
    temas: [["Farmacología cardiovascular: IECA, ARA II, betabloqueantes, estatinas, anticoagulantes", 1], ["Antimicrobianos: betalactámicos, aminoglucósidos, quinolonas, macrólidos, vancomicina", 1], ["Fármacos en el embarazo", 2], ["Interacciones clave", 3], ["Intoxicaciones: paracetamol, salicilatos, opioides, benzodiacepinas", 3], ["Prescripción racional", 3]],
    patologias: [],
    materias: "Farmacología I y II · Infectología · Ginecología",
    dfdct: "Fármaco: mecanismo → indicación → contraindicación → efectos adversos → interacciones → monitoreo.",
  },
  {
    num: 23, monday: "2027-04-26", fase: 4, title: "Integración: simulacros orales", priority: "Alta", subject: "Clínica",
    temas: [["Simulacro: sorteo de tema y defensa oral en 15 min (diabetes, cardiovascular, infecciones)", 1], ["Simulacro: presentación de caso, diferencial y tratamiento (embarazo, respiratorio)", 1], ["Simulacro: preguntas del banco de prioridad alta", 2], ["Repaso de errores de las semanas anteriores", 3], ["Autoevaluación final", 3]],
    patologias: [],
    materias: "Todas",
    dfdct: "Checklist: ¿puedo explicar la fisiopatología sin apuntes? ¿Puedo armar 3 diferenciales? ¿Puedo justificar el tratamiento?",
  },
  {
    num: 24, monday: "2027-05-03", fase: 4, title: "Integración: repaso final y cierre", priority: "Alta", subject: "Clínica",
    temas: [["Repaso espaciado de los 20 núcleos integradores (1 a 10)", 1], ["Repaso espaciado de los 20 núcleos integradores (11 a 20)", 1], ["Cierre del banco: todas las preguntas de prioridad alta", 2], ["Criterio para avanzar y descanso", 3]],
    patologias: [],
    materias: "Todas",
    dfdct: "Criterio final: tomar un caso de cualquiera de los 10 ejes, construir la fisiopatología, el diferencial y defender la conducta.",
  },
];

const WEEKDAYS: Weekday[] = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const iso = (d: Date) => format(d, "yyyy-MM-dd");

/** Días hábiles (lunes a viernes) entre dos fechas, inclusive. */
function weekdaysBetween(from: ISODate, to: ISODate): ISODate[] {
  const out: ISODate[] = [];
  for (let d = parseISO(from); iso(d) <= to; d = addDays(d, 1)) if (getDay(d) >= 1 && getDay(d) <= 5) out.push(iso(d));
  return out;
}

/** Reparte los temas en orden entre los días de estudio (los primeros días se llevan uno más si no divide justo). */
function chunk<T>(items: T[], parts: number): T[][] {
  const out: T[][] = Array.from({ length: parts }, () => []);
  const base = Math.floor(items.length / parts);
  let extra = items.length % parts;
  let i = 0;
  for (let p = 0; p < parts; p++) {
    const size = base + (extra-- > 0 ? 1 : 0);
    out[p] = items.slice(i, i + size);
    i += size;
  }
  return out.filter((c) => c.length);
}

function daysFor(w: MaestroWeek, dates: ISODate[]): DraftDay[] {
  const sim = w.num === 23;
  const close = dates[dates.length - 1];
  // Con 6 o más días (semana 1 extendida), el penúltimo es un día de integración del eje.
  const integration = dates.length >= 6 ? dates[dates.length - 2] : null;
  const study = dates.filter((d) => d !== close && d !== integration);
  const parts = chunk(w.temas, Math.min(study.length, w.temas.length));
  const days: DraftDay[] = parts.map((temas, i) => ({
    key: draftKey(),
    weekday: WEEKDAYS[getDay(parseISO(study[i]))],
    date: study[i],
    content: temas.map(([t]) => t).join(" · "),
    mode: sim ? "Simulación oral" : "Estudio + active recall oral",
  }));
  if (integration) {
    days.push({ key: draftKey(), weekday: WEEKDAYS[getDay(parseISO(integration))], date: integration, content: `Integración: un caso del eje recorrido con DFDCT (${w.materias})`, mode: "Estudio + esquema" });
  }
  days.push({
    key: draftKey(),
    weekday: WEEKDAYS[getDay(parseISO(close))],
    date: close,
    content: sim
      ? "Simulacro integrador: preguntas mixtas del banco, en voz alta, con cronómetro de 15 min"
      : `Prevención y Salud Comunitaria del eje · Cierre: preguntas de prioridad alta del banco sin apuntes y criterio para avanzar`,
    mode: sim ? "Simulación oral" : "Active recall puro",
  });
  return days;
}

/**
 * Arma el cronograma para la vista previa de importación.
 * `today`: si cae antes del viernes de la semana 1, la semana 1 arranca ese día (o el lunes siguiente si es fin de semana).
 */
export function buildPlanMaestro(today: ISODate): PlanDraft {
  const w1 = MAESTRO_WEEKS[0];
  const w1Friday = iso(addDays(parseISO(w1.monday), 4));
  const w1Start = today < w1.monday && today >= iso(addDays(parseISO(w1.monday), -7)) ? today : w1.monday;

  const phases: DraftPhase[] = MAESTRO_FASES.map((f) => ({
    key: draftKey(),
    num: f.num,
    code: String(f.num),
    name: f.name,
    description: f.description,
    alert: f.alert,
    weeks: MAESTRO_WEEKS.filter((w) => w.fase === f.num).map((w): DraftWeek => {
      const start = w.num === 1 ? w1Start : w.monday;
      const friday = w.num === 1 ? w1Friday : iso(addDays(parseISO(w.monday), 4));
      const dates = weekdaysBetween(start, friday);
      return {
        key: draftKey(),
        num: w.num,
        start,
        end: iso(addDays(parseISO(friday), 2)),
        title: w.title,
        subject: w.subject,
        tip: `DFDCT · ${w.dfdct}`,
        priority: w.priority,
        topics: w.patologias.length ? w.patologias : undefined,
        days: daysFor(w, dates.length ? dates : [w.monday]),
      };
    }),
  }));
  return { title: "Plan maestro integrado · reingreso FCM-UNC", start: phases[0].weeks[0].start, phases };
}
