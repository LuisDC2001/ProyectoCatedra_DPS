-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-11-2023 a las 00:23:31
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `rent_go`
--

DROP DATABASE IF EXISTS `rent_go`;
CREATE DATABASE IF NOT EXISTS `rent_go` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;
USE `rent_go`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado`
--

DROP TABLE IF EXISTS `estado`;
CREATE TABLE IF NOT EXISTS `estado` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `fechaFila` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `estado`
--

INSERT INTO `estado` (`id`, `nombre`, `fechaFila`) VALUES
(1, 'Reservada', '2023-11-05 23:04:59'),
(2, 'Activa', '2023-11-05 23:04:59'),
(3, 'Finalizada', '2023-11-05 23:04:59');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gasolina`
--

DROP TABLE IF EXISTS `gasolina`;
CREATE TABLE IF NOT EXISTS `gasolina` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `fechaFila` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `gasolina`
--

INSERT INTO `gasolina` (`id`, `nombre`, `fechaFila`) VALUES
(1, 'Regular', '2023-11-02 02:44:23'),
(2, 'Diésel', '2023-11-02 02:44:23');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marca`
--

DROP TABLE IF EXISTS `marca`;
CREATE TABLE IF NOT EXISTS `marca` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `fechaFila` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `marca`
--

INSERT INTO `marca` (`id`, `nombre`, `fechaFila`) VALUES
(1, 'Toyota', '2023-10-05 14:37:26'),
(2, 'Honda', '2023-10-05 14:37:26'),
(3, 'Hyundai', '2023-10-05 14:37:26'),
(4, 'Kia', '2023-10-05 14:37:26');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modelo`
--

DROP TABLE IF EXISTS `modelo`;
CREATE TABLE IF NOT EXISTS `modelo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `idMarca` int(11) NOT NULL,
  `fechaFila` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `FK_Marca_Modelo` (`idMarca`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `modelo`
--

INSERT INTO `modelo` (`id`, `nombre`, `idMarca`, `fechaFila`) VALUES
(1, 'Corolla', 1, '2023-10-05 14:39:53'),
(2, 'Rav4', 1, '2023-10-05 14:39:53'),
(3, 'Civic', 2, '2023-10-05 14:39:53'),
(4, 'Accent', 3, '2023-10-05 14:39:53'),
(5, 'Soul', 4, '2023-10-05 14:39:53');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nacionalidad`
--

DROP TABLE IF EXISTS `nacionalidad`;
CREATE TABLE IF NOT EXISTS `nacionalidad` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `fechaFila` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `nacionalidad`
--

INSERT INTO `nacionalidad` (`id`, `nombre`, `fechaFila`) VALUES
(1, 'Salvadoreño', '2023-10-01 02:34:31'),
(2, 'Hondureño', '2023-10-02 03:05:46');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `propietario`
--

DROP TABLE IF EXISTS `propietario`;
CREATE TABLE IF NOT EXISTS `propietario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `apellido` varchar(100) DEFAULT NULL,
  `razonSocial` varchar(250) DEFAULT NULL,
  `nombreComercial` varchar(250) DEFAULT NULL,
  `correoElectronico` varchar(100) NOT NULL,
  `telefono` int(11) NOT NULL,
  `fechaNacimiento` date NOT NULL,
  `idTipoPropietario` int(11) NOT NULL,
  `fechaFila` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `FK_TipoPropietario_Propietario` (`idTipoPropietario`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `propietario`
--

INSERT INTO `propietario` (`id`, `nombre`, `apellido`, `razonSocial`, `nombreComercial`, `correoElectronico`, `telefono`, `fechaNacimiento`, `idTipoPropietario`, `fechaFila`) VALUES
(1, 'Javier', 'de la O', NULL, NULL, 'javier.o@gmail.com', 74851203, '1999-12-04', 1, '2023-10-05 14:35:37'),
(2, 'Ernesto', 'Orellana', NULL, NULL, 'fer.orellana@gmail.com', 77778888, '2000-10-04', 1, '2023-10-05 14:35:37'),
(3, 'Erika', 'Acuña', NULL, NULL, 'erika.acuña@gmail.com', 62203645, '2000-01-10', 1, '2023-10-05 14:36:31');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reserva`
--

DROP TABLE IF EXISTS `reserva`;
CREATE TABLE IF NOT EXISTS `reserva` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cantidadDias` int(11) NOT NULL,
  `precioDia` decimal(6,2) NOT NULL,
  `precioDiaExtra` decimal(6,2) NOT NULL,
  `porcentajeComision` decimal(4,2) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `lugarEntrega` text NOT NULL,
  `lugarDevolucion` text NOT NULL,
  `disponible` tinyint(1) NOT NULL DEFAULT 1,
  `idVehiculo` int(11) NOT NULL,
  `fechaFila` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `FK_Vehiculo_Reserva` (`idVehiculo`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `reserva`
--

INSERT INTO `reserva` (`id`, `cantidadDias`, `precioDia`, `precioDiaExtra`, `porcentajeComision`, `descripcion`, `lugarEntrega`, `lugarDevolucion`, `disponible`, `idVehiculo`, `fechaFila`) VALUES
(3, 10, 7.50, 10.00, 10.00, NULL, 'Avenida España, San Salvador', 'Avenida España, San Salvador', 1, 6, '2023-11-05 23:22:36'),
(4, 15, 6.25, 7.50, 8.00, 'Carro para 6 personas máximo, con seguro y poco kilometraje', 'Boulevard del Ejército, Soyapango', 'Boulevard del Ejército, Soyapango', 1, 5, '2023-11-05 23:22:44');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

DROP TABLE IF EXISTS `rol`;
CREATE TABLE IF NOT EXISTS `rol` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `fechaFila` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id`, `nombre`, `fechaFila`) VALUES
(1, 'Cliente', '2023-10-01 02:34:31'),
(2, 'Administrador', '2023-10-01 02:34:31');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipopropietario`
--

DROP TABLE IF EXISTS `tipopropietario`;
CREATE TABLE IF NOT EXISTS `tipopropietario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `fechaFila` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `tipopropietario`
--

INSERT INTO `tipopropietario` (`id`, `nombre`, `fechaFila`) VALUES
(1, 'Natural', '2023-10-05 14:32:19'),
(2, 'Jurídica', '2023-10-05 14:32:19');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipovehiculo`
--

DROP TABLE IF EXISTS `tipovehiculo`;
CREATE TABLE IF NOT EXISTS `tipovehiculo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `fechaFila` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `tipovehiculo`
--

INSERT INTO `tipovehiculo` (`id`, `nombre`, `fechaFila`) VALUES
(1, 'Sedan', '2023-10-05 14:42:23'),
(2, 'SUV', '2023-10-05 14:42:23');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transmision`
--

DROP TABLE IF EXISTS `transmision`;
CREATE TABLE IF NOT EXISTS `transmision` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `fechaFila` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `transmision`
--

INSERT INTO `transmision` (`id`, `nombre`, `fechaFila`) VALUES
(1, 'Manual', '2023-11-02 02:44:23'),
(2, 'Automática', '2023-11-02 02:44:23');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE IF NOT EXISTS `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `correoElectronico` varchar(100) NOT NULL,
  `contrasena` varchar(256) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `fechaNacimiento` date NOT NULL,
  `telefono` int(11) NOT NULL,
  `imagenPerfil` varchar(250) DEFAULT NULL,
  `codigoVerificacion` int(11) DEFAULT NULL,
  `verificado` tinyint(1) NOT NULL DEFAULT 0,
  `idNacionalidad` int(11) NOT NULL,
  `idRol` int(11) NOT NULL,
  `fechaFila` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `U_CorreoElectronico_Usuario` (`correoElectronico`),
  KEY `FK_Nacionalidad_Usuario` (`idNacionalidad`),
  KEY `FK_Rol_Usuario` (`idRol`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `correoElectronico`, `contrasena`, `nombre`, `apellido`, `fechaNacimiento`, `telefono`, `imagenPerfil`, `codigoVerificacion`, `verificado`, `idNacionalidad`, `idRol`, `fechaFila`) VALUES
(3, 'fernandobonilla875@gmail.com', '$2y$10$p/7G0/SNubrBOeTxEGS6vuiUdO/xk7YJrNmwi9N9Zyu9GVhzvukMm', 'Fernando', 'Bonilla', '2001-10-16', 76684815, NULL, NULL, 0, 1, 1, '2023-10-01 02:43:52'),
(11, 'fernandobonilla@gmail.com', '$2y$10$Ew2cM5HN4qQOHjGRZ6TiBeam3aOg8XHWAXA7Jdz5uXLpf0lX2LnHi', 'Fernando', 'Orellana', '2001-10-16', 76684815, NULL, NULL, 0, 1, 1, '2023-10-01 16:31:05'),
(12, 'fernandoorellana@gmail.com', '$2y$10$/5VzxGlJIBX7iHfIXIzqOORVY93Fnl.zB345raqClYLp6MgrVzM8G', 'Fernando', 'Orellana', '2001-10-16', 714589712, NULL, NULL, 0, 1, 1, '2023-10-01 16:32:34'),
(13, 'fernandoorellana@hotmail.com', '$2y$10$ApOcIBgMcw2j3RvfOtN3Uu3f0/cDig9a/W2V6J7mORHlGzJUWDAqa', 'Fernando', 'Orellana', '2001-10-16', 71524789, NULL, NULL, 0, 1, 1, '2023-10-01 16:44:20'),
(16, 'john(.doe)@exa//mple.com', '$2y$10$Pggm7Zjmk90KUJJGso0/KuG.gMEj5QzAHL3HtDnMjtNkODBAdsvP.', 'Joe', 'Orellana', '2001-10-16', 71524789, NULL, NULL, 0, 1, 1, '2023-10-01 17:16:22'),
(17, 'john.doe@gm//ail.com', '$2y$10$EAaKJ/.HHxdPuLDGAeU0P.mY8VB7Yoef0gtYINsp1wsRePC6kLp.u', 'Joe', 'Orellana', '2001-10-16', 71524789, NULL, NULL, 0, 1, 1, '2023-10-01 17:40:23'),
(18, 'john.doe\'\'@gmail.com', '$2y$10$8LMJl8J8AgI4crUMg5HAoejH97P5Kp3yQFz9O1MBiuhwlPJPpJfSm', 'Joe', 'Orellana', '2001-10-16', 71524789, NULL, NULL, 0, 1, 1, '2023-10-01 17:43:45'),
(20, 'john.orellana123@gmail.com', '$2y$10$AnRW4F/wzc2CDALa613ZXuzYwSz.8aRSUNTfZ3SbdCzrzLmnV/FmO', 'Joe', 'Orellana', '2001-10-16', 71524789, NULL, NULL, 0, 1, 1, '2023-10-01 17:46:51'),
(22, 'john.brellana123@gmail//.com', '$2y$10$CzV2s4RM.Vk91VG1pJXnZe4qmc8BHfIEHhmPIy8wpa1WvqOstTpdW', 'Joe', 'Orellana', '2001-10-16', 71524789, NULL, NULL, 0, 1, 1, '2023-10-02 00:34:09'),
(25, 'juanhernandez@gmail.com', '$2y$10$uP.uFT3wJZKdpkC/UpsKGecbj.lsUWCGV0Q6qCxHZuELFclkUXaPa', 'Juan', 'Hernandez', '2001-10-16', 71524789, NULL, NULL, 0, 1, 1, '2023-10-02 02:05:57'),
(27, 'juan.hernandez@gmail.com', '$2y$10$WKdR6PHTlr0eow1bxuuftuCqecJHiWHkDuDdKi.RTB9nodkB4xjn2', 'Juan', 'Hernandez', '2001-10-16', 71524789, NULL, NULL, 0, 1, 1, '2023-10-02 02:06:30'),
(28, 'juan.hernandez123@gmail.com', '$2y$10$GYp5tlrbAvjTpISQByq12uCuAGhvdOYC3x.0fvuIGNo9v5qUvS/ae', 'Juan', 'Hernandez', '2001-10-16', 71524789, NULL, NULL, 0, 1, 1, '2023-10-02 02:08:51'),
(29, 'juanhernandez123@gmail.com', '$2y$10$fjuJ2yRcAHMVb6HNREeOmOxnqa7xTb9BF3G7LbLuUUQmkYxct.uA6', 'Juan', 'Hernandez', '2001-10-16', 71524789, NULL, NULL, 0, 1, 1, '2023-10-02 02:09:10'),
(30, 'franhernandez123@gmail.com', '$2y$10$1SdU9nojfLOpBusZlGL2dOCS7EfZmBC1HfXFdsxY00oQB4xoGS7Na', 'Francisco', 'Hernandez', '2001-10-16', 71524789, NULL, NULL, 0, 1, 1, '2023-10-02 02:16:23'),
(31, 'fran.hernandez123@gmail.com', '$2y$10$xHgafm7twte/X6sDmaPqhuDDH.JFT02mxU/TONGxru2Ov.aY5sSM6', 'Francisco', 'Hernandez', '2001-10-16', 71524789, NULL, NULL, 0, 1, 1, '2023-10-02 02:29:33'),
(32, 'francisco.hernandez123@gmail.com', 'b50c223392eaf1241f0c6ee672a21111dfb315fbed52c6c816e4d8498c303d0b', 'Francisco', 'Hernandez', '2001-10-16', 71524789, NULL, NULL, 0, 1, 1, '2023-10-05 14:02:32'),
(34, 'f.hernandez123@gmail.com', 'b50c223392eaf1241f0c6ee672a21111dfb315fbed52c6c816e4d8498c303d0b', 'Francisco', 'Hernandez', '2001-10-16', 71524789, NULL, NULL, 0, 1, 1, '2023-10-05 15:06:21'),
(37, 'fernandoorellana@hotmail//.com', '53e014e0641698d7e160f36f975cae22eb9c82ded1409d46e3c62474bc0c638a', 'Fernando', 'Orellana', '2001-10-16', 71524789, NULL, NULL, 0, 1, 1, '2023-10-29 20:55:20'),
(38, 'fernandoorellana@gmail//.com', '53e014e0641698d7e160f36f975cae22eb9c82ded1409d46e3c62474bc0c638a', 'Fernando', 'Orellana', '2001-10-16', 71524789, NULL, NULL, 0, 1, 1, '2023-10-29 20:57:52'),
(41, 'fernando.orellana@gmail//.com', '53e014e0641698d7e160f36f975cae22eb9c82ded1409d46e3c62474bc0c638a', 'Fernando', 'Orellana', '2001-10-16', 71524789, NULL, NULL, 0, 1, 1, '2023-10-30 20:53:32'),
(42, '(fernandoorellana@gmail.com)', '53e014e0641698d7e160f36f975cae22eb9c82ded1409d46e3c62474bc0c638a', 'Fernando', 'Orellana', '2001-10-16', 71524789, NULL, NULL, 0, 1, 1, '2023-10-30 20:58:19'),
(48, 'fernando.orellana@gmail.com', '53e014e0641698d7e160f36f975cae22eb9c82ded1409d46e3c62474bc0c638a', 'Fernando', 'Orellana', '2001-10-16', 71524789, NULL, NULL, 0, 1, 1, '2023-10-30 21:07:18');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_reserva`
--

DROP TABLE IF EXISTS `usuario_reserva`;
CREATE TABLE IF NOT EXISTS `usuario_reserva` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fechaReserva` datetime NOT NULL,
  `fechaInicio` date NOT NULL,
  `fechaFin` date NOT NULL,
  `resena` text DEFAULT NULL,
  `idEstado` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idReserva` int(11) NOT NULL,
  `fechaFila` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `FK_Estado_Usuario_Reserva` (`idEstado`),
  KEY `FK_Usuario_Usuario_Reserva` (`idUsuario`),
  KEY `FK_Reserva_Usuario_Reserva` (`idReserva`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculo`
--

DROP TABLE IF EXISTS `vehiculo`;
CREATE TABLE IF NOT EXISTS `vehiculo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `year` int(11) NOT NULL,
  `color` varchar(100) DEFAULT NULL,
  `placa` varchar(10) NOT NULL,
  `imagen` varchar(250) NOT NULL,
  `pasajeros` int(11) NOT NULL,
  `motor` varchar(50) NOT NULL,
  `idModelo` int(11) NOT NULL,
  `idTipoVehiculo` int(11) NOT NULL,
  `idPropietario` int(11) NOT NULL,
  `idTransmision` int(11) NOT NULL,
  `idGasolina` int(11) NOT NULL,
  `fechaFila` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `U_Placa_Vehiculo` (`placa`),
  KEY `FK_Modelo_Vehiculo` (`idModelo`),
  KEY `FK_TipoVehiculo_Vehiculo` (`idTipoVehiculo`),
  KEY `FK_Propietario_Vehiculo` (`idPropietario`),
  KEY `FK_Gasolina_Vehiculo` (`idGasolina`),
  KEY `FK_Transmision_Vehiculo` (`idTransmision`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `vehiculo`
--

INSERT INTO `vehiculo` (`id`, `year`, `color`, `placa`, `imagen`, `pasajeros`, `motor`, `idModelo`, `idTipoVehiculo`, `idPropietario`, `idTransmision`, `idGasolina`, `fechaFila`) VALUES
(4, 2018, 'Azul', 'P195A5', 'https://drive.google.com/uc?export=view&id=1vMvF4QIrOzdWaiC0XGrR_OxVRZ8T3vpi', 5, '1.8 litros', 1, 1, 1, 2, 1, '2023-11-02 03:00:14'),
(5, 2021, 'Gris', 'P121097', 'https://drive.google.com/uc?export=view&id=1HZjRbtR5kY5xSxT7V3d6waTG-XOfmgPc', 5, '1.8 litros', 2, 2, 2, 2, 1, '2023-11-02 03:00:14'),
(6, 2018, 'Verde', 'P979D1C', '', 4, '1.8 litros', 5, 1, 3, 1, 1, '2023-11-02 03:00:14');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `modelo`
--
ALTER TABLE `modelo`
  ADD CONSTRAINT `FK_Marca_Modelo` FOREIGN KEY (`idMarca`) REFERENCES `marca` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `propietario`
--
ALTER TABLE `propietario`
  ADD CONSTRAINT `FK_TipoPropietario_Propietario` FOREIGN KEY (`idTipoPropietario`) REFERENCES `tipopropietario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `reserva`
--
ALTER TABLE `reserva`
  ADD CONSTRAINT `FK_Vehiculo_Reserva` FOREIGN KEY (`idVehiculo`) REFERENCES `vehiculo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `FK_Nacionalidad_Usuario` FOREIGN KEY (`idNacionalidad`) REFERENCES `nacionalidad` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_Rol_Usuario` FOREIGN KEY (`idRol`) REFERENCES `rol` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario_reserva`
--
ALTER TABLE `usuario_reserva`
  ADD CONSTRAINT `FK_Estado_Usuario_Reserva` FOREIGN KEY (`idEstado`) REFERENCES `estado` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_Reserva_Usuario_Reserva` FOREIGN KEY (`idReserva`) REFERENCES `reserva` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_Usuario_Usuario_Reserva` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `vehiculo`
--
ALTER TABLE `vehiculo`
  ADD CONSTRAINT `FK_Gasolina_Vehiculo` FOREIGN KEY (`idGasolina`) REFERENCES `gasolina` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_Modelo_Vehiculo` FOREIGN KEY (`idModelo`) REFERENCES `modelo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_Propietario_Vehiculo` FOREIGN KEY (`idPropietario`) REFERENCES `propietario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_TipoVehiculo_Vehiculo` FOREIGN KEY (`idTipoVehiculo`) REFERENCES `tipovehiculo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_Transmision_Vehiculo` FOREIGN KEY (`idTransmision`) REFERENCES `transmision` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
