
-- relación departamentoClase - familias

use `ejercicio_tecnico`;

INSERT INTO departamentoclase_familia
(idFamilia)
VALUES 
(135),(136),(137)  -- ,(118),(119),(120),(121),(122);

UPDATE departamentoclase_familia dcf
SET dcf.idDepartamentoClase_familia = 16
WHERE dcf.idFamilia IN (135,136,137) -- ,117,118,119,120,121,122); -- and dcf.idDepartamentoClase_familia IS NULL;


SELECT dc.idDepartamento_clase,d.nombre,c.nombre FROM departamento_clase dc
INNER JOIN departamentos d on d.idDepartamento = dc.idDepartamento
INNER JOIN clases c on c.idClases = dc.idClase
WHERE d.nombre = 'Salas, Recamaras, Comedor'

SELECT dc.idDepartamento_clase,d.nombre as departamento,
c.nombre as clase, f.nombre as familia FROM departamento_clase dc
INNER JOIN departamentos d on d.idDepartamento = dc.idDepartamento
INNER JOIN clases c on c.idClases = dc.idClase
INNER JOIN departamentoclase_familia dcf on dcf.idDepartamentoClase_familia = dc.idDepartamento_clase
INNER JOIN familias f on dcf.idFamilia = f.idFamilia
WHERE d.nombre = 'Domesticos' -- AND dc.idDepartamento_clase = 3

