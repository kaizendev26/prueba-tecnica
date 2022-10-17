DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `ConsultarDepartamentos`(
)
BEGIN
	
    SELECT * FROM departamentos;
    
    
END$$
DELIMITER ;
