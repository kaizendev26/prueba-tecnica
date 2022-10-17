DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `consultarArticulo`(
	IN sku NVARCHAR(6)
)
BEGIN

		SET @existe = 
			( SELECT IF(COUNT(1) >= 1, 1,0) AS existe FROM articulos a WHERE a.sku = sku );
        
        IF @existe = 1 THEN 
		   SELECT * FROM articulos a WHERE a.sku = sku;
		END IF;
        
END$$
DELIMITER ;
