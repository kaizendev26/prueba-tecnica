DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `actualizarArticulo`(
	IN sku NVARCHAR(6),
    IN articulo NVARCHAR(15),
	IN marca NVARCHAR(15),
    IN modelo NVARCHAR(20),
	IN departamento INT,
    IN clase INT,
    IN familia INT,
    IN cantidad NVARCHAR(9),
    IN stock NVARCHAR(9),
    IN descontinuado INT
)
BEGIN

	SET @statusAnterior = (SELECT a.descontinuado FROM articulos a WHERE a.sku = sku);
	SET @fechaBaja = '1900-01-01';
    
    IF @statusAnterior = 0 AND descontinuado = 1 -- activación
		THEN  SET @fechaBaja = CURDATE();
    END IF;
    
	IF @statusAnterior = 1 AND descontinuado = 1 -- activación
		THEN  SET @fechaBaja = (SELECT a.fechaBaja FROM articulos a WHERE a.sku = sku);
    END IF;
	
    UPDATE articulos a
    SET 
    a.articulo = articulo,
    a.marca = marca,
    a.modelo = modelo,
    a.idDepartamento = departamento,
    a.idClase = clase,
    a.idFamilia = familia,
    a.stock = stock,
    a.cantidad = cantidad,
    a.descontinuado = descontinuado,
    a.fechaBaja = (SELECT @fechaBaja)
    WHERE 
    a.sku = sku;
	
    
END$$
DELIMITER ;
