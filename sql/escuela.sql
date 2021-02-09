CREATE TABLE maestro (
    id_maestro integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    nombre varchar (60) NOT NULL,
    apellidos varchar (60) NOT NULL,
    correo varchar (60) NOT NULL,
    contrasena varchar (40) NOT NULL,
    facultad varchar (60) NOT NULL,
    experiencia_educativa varchar (60) NOT NULL,
    rol varchar (40) NOT NULL,
    estatus varchar (20) NOT NULL,
    estatus_boolean BOOLEAN NOT NULL
);

SELECT * FROM maestro;

INSERT INTO maestro (
    nombre, apellidos , correo, contrasena, facultad, experiencia_educativa, rol, estatus, estatus_boolean)
	values ('Jose Rolando', 'Garcia Alba', 'rolas@gmail.com', '123456', 'FEI', 'Programacion', 'Maestro', 'Activo', true);

INSERT INTO maestro (
    nombre, apellidos , correo, contrasena, facultad, experiencia_educativa, rol, estatus, estatus_boolean)
	values ('Alfredo', 'Garcia Alba', 'alfredo@gmail.com', '123456', 'FEI', 'Sistemas web', 'Maestro', 'Activo', true);



***************************************************************************************************************************

CREATE TABLE estudiante (
    id_estudiante integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    nombre varchar (60) NOT NULL,
    apellidos varchar (60) NOT NULL,
    correo varchar (60) NOT NULL,
    contrasena varchar (40) NOT NULL,
    facultad varchar (60) NOT NULL,
    experiencia_educativa varchar (60) NOT NULL,
    rol varchar (40) NOT NULL,
    estatus varchar (20) NOT NULL,   
    estatus_boolean BOOLEAN NOT NULL,
    id_maestro integer REFERENCES maestro(id_maestro) ON DELETE CASCADE
);

INSERT INTO estudiante (
    nombre, apellidos , correo, contrasena, facultad, experiencia_educativa, rol, estatus, estatus_boolean, id_maestro)
	values ('Hugo Alberto', 'Alba', 'hugo@gmail.com', '123456', 'FEI', 'Programacion', 'Estudiante', 'Activo', true, 1);

INSERT INTO estudiante (
    nombre, apellidos , correo, contrasena, facultad, experiencia_educativa, rol, estatus, estatus_boolean, id_maestro)
	values ('Sara Gisel', 'Alba', 'sara@gmail.com', '123456', 'FEI', 'Sistemas web', 'Estudiante', 'Activo', true, 2);

SELECT e.nombre, e.apellidos, e.estatus, m.id_maestro
FROM estudiante e, maestro m
WHERE e.id_maestro &  m.id_maestro =  1;

***********************************************************************************************************

CREATE TABLE tarea (
    id_tarea integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    nombre varchar (60) NOT NULL,
    descripcion varchar (60) NOT NULL,
    fecha_creacion timestamp,
    fecha_entrega timestamp, 
    estatus_expiracion BOOLEAN NOT NULL,
    id_maestro integer REFERENCES maestro(id_maestro) ON DELETE CASCADE
);

INSERT INTO tarea (
    nombre, descripcion , fecha_creacion, fecha_entrega, estatus_expiracion, id_maestro)
	values ('Programa que suma los numeros de un array', 'Crear un programa que sume los numeros de un array en Java', '08-02-2021', 
    '10-02-2021', false, 1);

INSERT INTO tarea (
    nombre, descripcion , fecha_creacion, fecha_entrega, estatus_expiracion, id_maestro)
	values ('Crear formulario de registro', 'Crear formulario de registro con Javascript y CSS', '08-02-2021', 
    '10-02-2021', false, 2);

CREATE TABLE tarea_estudiante (
    id_estudiante integer REFERENCES estudiante (id_estudiante) ON DELETE CASCADE,
    id_tarea integer REFERENCES tarea (id_tarea) ON DELETE CASCADE,
    mensaje varchar (300),
    fecha_entrega timestamp,
    estatus_entrega BOOLEAN
);

INSERT INTO tarea_estudiante (
    id_estudiante, id_tarea , mensaje, fecha_entrega, estatus_entrega)
	values (1, 1, 'Adjunto la tarea, saludos.', '09-02-2021', true);

INSERT INTO tarea_estudiante (
    id_estudiante, id_tarea , mensaje, fecha_entrega, estatus_entrega)
	values (2, 2, 'Adjunto la tarea de crear formulario, saludos', '09-02-2021', true);


---- Consulta personas que entregaron la tarea 2

SELECT e.nombre , t.nombre, te.mensaje
FROM estudiante e, tarea_estudiante te, tarea t
where e.id_estudiante = te.id_estudiante AND t.id_tarea = te.id_tarea AND t.id_tarea = 2;