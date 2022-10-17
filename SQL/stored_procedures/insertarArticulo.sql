DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `insertarArticulo`(
	IN sku NVARCHAR(6),
    IN articulo NVARCHAR(15),
	IN marca NVARCHAR(15),
    IN modelo NVARCHAR(20),
	IN departamento INT,
    IN clase INT,
    IN familia INT,
    IN cantidad NVARCHAR(9),
    IN stock NVARCHAR(9)
)
BEGIN
    
	INSERT INTO articulos
    (
		sku,articulo,marca,modelo,idDepartamento,idClase,idFamilia,fechaAlta,stock,cantidad,descontinuado,fechaBaja
    )
    values(
		sku,articulo,marca,modelo,departamento,clase,familia,CURDATE(),stock,cantidad,0,'1900-01-01'
    );
	
    SELECT LAST_INSERT_ID();

END$$
DELIMITER ;
