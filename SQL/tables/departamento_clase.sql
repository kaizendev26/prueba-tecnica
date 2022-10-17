CREATE TABLE `departamento_clase` (
  `idDepartamento_clase` int NOT NULL AUTO_INCREMENT,
  `idDepartamento` int DEFAULT NULL,
  `idClase` int DEFAULT NULL,
  PRIMARY KEY (`idDepartamento_clase`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
