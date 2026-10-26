# Changelog

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
