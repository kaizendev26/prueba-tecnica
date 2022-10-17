DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `consultarClases`(
	IN departamento INT
)
BEGIN
		SELECT dc.idDepartamento_clase, dc.idDepartamento, c.idClases, c.nombre FROM clases c
        INNER JOIN departamento_clase dc
			on dc.idClase = c.idClases
		WHERE dc.idDepartamento = departamento;
END$$
DELIMITER ;
