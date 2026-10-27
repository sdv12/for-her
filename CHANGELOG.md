# Changelog

## v0.10.0 — 2026-10-27

- Casos clínicos más interactivos (en los 84 casos):
  - Modo examen (devolución al final) o modo estudio (ves si cada pregunta, maniobra o estudio era clave y por qué, en el momento; da la mitad de experiencia).
  - Nueva etapa de hipótesis después del interrogatorio: elegís hasta 3 diagnósticos; si el correcto estaba, suma un bonus.
  - Pistas en interrogatorio, examen y estudios (descuentan un 10 % de experiencia cada una).
  - Nueva etapa de presentación oral: la escribís o la decís en voz alta y la comparás con una presentación modelo, con autoevaluación.
  - Repaso rápido al final: preguntas armadas con el caso (qué no había que hacer, qué estudio era clave, por qué importaba un dato, por qué se descarta un diferencial) y ordenar la conducta.
  - La ficha del paciente muestra tus hipótesis y tiene un espacio para notas propias.
  - Las opciones de diagnóstico se muestran mezcladas.
  - La resolución se organiza en pestañas: Explicación, Tu recorrido, Presentación y Repaso.
- Catálogo: filtro "Para mejorar" (casos resueltos con menos de 7 estrellas).

## v0.9.0 — 2026-10-26

- Casos clínicos: 28 casos nuevos (84 en total).
  - Básico: conjuntivitis bacteriana, rinosinusitis viral, reflujo gastroesofágico, migraña sin aura, mordedura de perro, anticoncepción de emergencia en una adolescente, síndrome climatérico.
  - Intermedio: test de VPH positivo con lesión de alto grado, anafilaxia por picadura, fractura de cadera, depresión posparto, neumotórax espontáneo, enfermedad de Graves, infección urinaria febril en lactante, aborto incompleto, diabetes gestacional.
  - Avanzado: traumatismo de cráneo en anticoagulado, delirium, cirrosis con peritonitis bacteriana espontánea, debut de VIH con Pneumocystis, leptospirosis, infarto sin elevación del ST, pancreatitis biliar, síndrome nefrótico, escorpionismo, coqueluche.
  - Desafío: hemorragia posparto por atonía, mordedura de yarará.
- Nuevas áreas: Oftalmología y Alergia e inmunología.

## v0.8.0 — 2026-10-26

- Casos clínicos: 14 casos nuevos (56 en total).
  - Básico: neumonía en un niño de 4 años, vaginosis bacteriana, escabiosis familiar, herpes zóster.
  - Intermedio: gota (podagra), hipotiroidismo por Hashimoto, retención aguda de orina por próstata, intoxicación alcohólica aguda, enfermedad pelviana inflamatoria, artritis reumatoidea temprana.
  - Avanzado: intento de suicidio con benzodiacepinas en una adolescente, insuficiencia renal aguda prerrenal ("triple whammy") con hiperpotasemia.
  - Desafío: politrauma en motociclista con neumotórax a tensión, lesiones no accidentales en un lactante.
- Nuevas áreas: Dermatología y Reumatología.

## v0.7.0 — 2026-10-26

- Casos clínicos: 14 casos nuevos (42 en total), elegidos por ser de los más frecuentes en las guardias argentinas, por edad y por sexo.
  - Básico: lumbalgia aguda mecánica, esguince de tobillo, laringitis (crup), convulsión febril simple.
  - Intermedio: cólico renal, ictericia neonatal por lactancia insuficiente, colecistitis aguda, hipertensión severa sin daño de órgano blanco, celulitis de pierna, crisis de pánico.
  - Avanzado: hemorragia digestiva alta por AINE, fibrilación auricular, sífilis en el embarazo.
  - Desafío: hipoglucemia por glibenclamida que simula un ACV.
- Nuevas áreas: Traumatología y Salud mental. Los recién nacidos se muestran como "Recién nacido/a de N días".

## v0.6.0 — 2026-10-26

- Casos clínicos: 14 casos nuevos (28 en total).
  - Básico: otitis media aguda, anemia ferropénica, diabetes tipo 2, crisis asmática.
  - Intermedio: neumonía grave en adulta mayor, apendicitis, pielonefritis en el embarazo, exacerbación de EPOC.
  - Avanzado: tuberculosis pulmonar, ACV isquémico en ventana, meningitis meningocócica en lactante, embarazo ectópico roto.
  - Desafío: tromboembolismo pulmonar, intoxicación por monóxido de carbono.
- Nuevas áreas para filtrar: Hematología, Cirugía y Toxicología.

## v0.5.0 — 2026-10-26

- Nuevo: Casos clínicos (Estudiar). 14 casos de básico a desafío, de lactantes a adultez mayor, frecuentes y poco frecuentes según edad y sexo.
  - Se juegan por etapas: interrogatorio en forma de conversación, examen físico, estudios con resultado, diagnóstico (con reintento y el porqué) y conducta.
  - Ficha del paciente que se completa con lo que vas descubriendo.
  - Resolución completa: patologías en juego (diagnóstico, diferenciales y asociadas), causa → mecanismo → clínica, epidemiología, tu recorrido, conducta según normativas argentinas, perlas, errores frecuentes y fuentes.
  - Estrellas por diagnóstico, estudios y conducta; experiencia y rangos (de Estudiante a De guardia con el tribunal).
  - Filtros por nivel, edad, sexo, área y estado; caso al azar priorizando los que no jugaste.
  - El diagnóstico errado va a Errores, los minutos a Registros y el caso se puede pasar a tarjeta.

## v0.4.0 — 2026-10-12

- Importar cronograma: ahora lee el formato "una fila por semana" (Sem · Fechas · Fase · Tema principal · Subtemas · Tip del tribunal · Prioridad) con su tabla resumen de fases y la sección de preguntas por semana.
  - Arma los días de lunes a viernes: subtemas de lunes a jueves y simulación el viernes.
  - Si las fechas del documento no empiezan en lunes, alinea las semanas y avisa.
  - Guarda el tip del tribunal y la prioridad de cada semana (se ven en Plan y en Hoy); los subtemas van al Temario y las preguntas por semana al banco.
- El .docx se lee con su estructura de tablas (antes se perdía al pasarlo a texto). También toma la "Alerta" de cada fase.
- Banco de preguntas: acepta archivos de Word (.docx) con secciones y tablas # · Pregunta · 🔴/🟡/🟢, o preguntas numeradas.
- Arreglos: semana actual cuando hay huecos entre semanas; materia sugerida según el título (la primera pista que aparece).

## v0.3.0 — 2026-10-07

- Nueva paleta: escala de azules en modo claro y azul marino en modo oscuro. Verde (dominado) y ámbar (a repasar) se mantienen como colores funcionales.
- Ícono de la app y del navegador en azul.
- Accesibilidad: sigue en 100 en Lighthouse en todas las pantallas, en claro y oscuro.

## v0.2.0 — 2026-10-07

- Instalable en el celular ("Agregar a pantalla de inicio"): manifest, íconos y accesos directos (Repasar tarjetas, Anotar una pregunta, Bloque de foco).
- Ícono propio en la pestaña del navegador.
- Accesibilidad: 100 en Lighthouse en todas las pantallas, en modo claro y oscuro (contraste de chips y del calendario, nombre accesible de la tarjeta de repaso).
- Pulido de estados vacíos en Hoy.
- Se quitó la página interna de componentes.

## v0.1.0 — 2026-10-06

Primera versión de prueba (sin backend, datos en el navegador).

- Hoy: "Hoy toca", números del día, semana del plan, atajos y errores recientes.
- Plan: franja de semanas por fase, detalle editable, tildar días (mueve la tarea y crea el registro).
- Importar cronograma: .docx, JSON o en blanco, con vista previa editable y opción de correr las fechas.
- Tablero con arrastrar y soltar (desktop) y pestañas (celular).
- Tarjetas con repaso espaciado (SM-2 simplificado); "Otra vez" va a Errores.
- Preguntas de examen: +1, filtros, importar banco CSV/JSON.
- Simulacro y modo tribunal (sin grabación de audio); "Flojo" va a Errores.
- Errores, Foco (pomodoro global), Registros (calendario), Temario.
- Agregar rápido (tecla N / botón +) y Ajustes con exportar y restaurar respaldo.
