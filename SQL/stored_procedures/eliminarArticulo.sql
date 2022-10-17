DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminarArticulo`(
	IN sku NVARCHAR(6)
)
BEGIN
	
    DELETE FROM articulos a WHERE a.sku = sku;
    
    
END$$
DELIMITER ;
