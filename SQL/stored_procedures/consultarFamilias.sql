DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `consultarFamilias`(
	IN idDepartamento INT,
    IN idClase INT
)
BEGIN
		
        SELECT f.idFamilia,f.nombre FROM departamento_clase dc
        INNER JOIN departamentoclase_familia dcf 
			on dcf.idDepartamentoClase_familia = dc.idDepartamento_clase
		INNER JOIN familias f on f.idFamilia = dcf.idFamilia
        WHERE dc.idDepartamento = idDepartamento
        AND dc.idClase = idClase;
    
END$$
DELIMITER ;
