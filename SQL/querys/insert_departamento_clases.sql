
-- relacion de departamento - clases

use `ejercicio_tecnico`;
-- domesticos --
/*INSERT INTO departamento_clase
(idClase)
SELECT idClases FROM clases
WHERE idClases in (10,11,12,13);

UPDATE departamento_clase dc
SET dc.idDepartamento = 1
WHERE dc.idClase IN (10,11,12,13) */

-- electronica --

/*INSERT INTO departamento_clase
(idClase)
SELECT idClases FROM clases
WHERE idClases in (14,15);

UPDATE departamento_clase dc
SET dc.idDepartamento = 2
WHERE dc.idClase IN (14,15)*/

-- mueble suelto --

/*INSERT INTO departamento_clase
(idClase)
SELECT idClases FROM clases
WHERE idClases in (16,17);

UPDATE departamento_clase dc
SET dc.idDepartamento = 3
WHERE dc.idClase IN (16,17)*/

-- sala,comedor,recamara --

/*INSERT INTO departamento_clase
(idClase)
SELECT idClases FROM clases
WHERE idClases in (18,19,20);

UPDATE departamento_clase dc
SET dc.idDepartamento = 4
WHERE dc.idClase IN (18,19,20)*/



