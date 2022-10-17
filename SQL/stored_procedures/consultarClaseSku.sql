DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `consultarClaseSku`(
	IN sku NVARCHAR(6)
)
BEGIN
		SELECT c.idClases FROM articulos a
        INNER JOIN clases c on a.idClase = c.idClases
        WHERE a.sku = sku;
END$$
DELIMITER ;
