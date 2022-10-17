DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `consultarDepartamentoSku`(
		IN sku NVARCHAR(6)
)
BEGIN

		SELECT d.idDepartamento,d.nombre FROM departamentos d
        INNER JOIN articulos a on a.idDepartamento = d.idDepartamento
		WHERE a.sku = sku;
END$$
DELIMITER ;
