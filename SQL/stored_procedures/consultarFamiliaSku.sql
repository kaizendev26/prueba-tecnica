DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `consultarFamiliaSku`(
		IN sku INT
)
BEGIN
		SELECT f.idFamilia,f.nombre FROM articulos a
        INNER JOIN familias f on f.idFamilia = a.idFamilia
        WHERE a.sku = sku;
END$$
DELIMITER ;
