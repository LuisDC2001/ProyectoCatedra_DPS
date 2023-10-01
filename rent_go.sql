-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-10-2023 a las 04:36:22
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

CREATE TABLE IF NOT EXISTS `estado` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `fechaFila` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marca`
--

CREATE TABLE IF NOT EXISTS `marca` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `fechaFila` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modelo`
--

CREATE TABLE IF NOT EXISTS `modelo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `idMarca` int(11) NOT NULL,
  `fechaFila` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `FK_Marca_Modelo` (`idMarca`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nacionalidad`
--

CREATE TABLE IF NOT EXISTS `nacionalidad` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `fechaFila` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `nacionalidad`
--

INSERT INTO `nacionalidad` (`id`, `nombre`, `fechaFila`) VALUES
(1, 'Salvadoreño', '2023-10-01 02:34:31');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `propietario`
--

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reserva`
--

CREATE TABLE IF NOT EXISTS `reserva` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cantidadDias` int(11) NOT NULL,
  `precioDia` decimal(6,2) NOT NULL,
  `precioDiaExtra` decimal(6,2) NOT NULL,
  `porcentajeComision` decimal(4,2) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `lugarEntrega` text NOT NULL,
  `fechaEntrega` datetime NOT NULL,
  `lugarDevolucion` text NOT NULL,
  `disponible` tinyint(1) NOT NULL DEFAULT 1,
  `idVehiculo` int(11) NOT NULL,
  `fechaFila` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `FK_Vehiculo_Reserva` (`idVehiculo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

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

CREATE TABLE IF NOT EXISTS `tipopropietario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `fechaFila` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipovehiculo`
--

CREATE TABLE IF NOT EXISTS `tipovehiculo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `fechaFila` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE IF NOT EXISTS `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `correoElectronico` varchar(100) NOT NULL,
  `contrasena` varchar(256) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `fechaNacimiento` date NOT NULL,
  `telefono` int(11) NOT NULL,
  `imagenPerfil` varchar(250) DEFAULT NULL,
  `idNacionalidad` int(11) NOT NULL,
  `idRol` int(11) NOT NULL,
  `fechaFila` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `U_CorreoElectronico_Usuario` (`correoElectronico`),
  KEY `FK_Nacionalidad_Usuario` (`idNacionalidad`),
  KEY `FK_Rol_Usuario` (`idRol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_reserva`
--

CREATE TABLE IF NOT EXISTS `usuario_reserva` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fechaReserva` datetime NOT NULL,
  `fechaFin` datetime NOT NULL,
  `favorito` tinyint(1) NOT NULL DEFAULT 0,
  `resena` text DEFAULT NULL,
  `idEstado` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idReserva` int(11) NOT NULL,
  `fechaFila` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `FK_Estado_Usuario_Reserva` (`idEstado`),
  KEY `FK_Usuario_Usuario_Reserva` (`idUsuario`),
  KEY `FK_Reserva_Usuario_Reserva` (`idReserva`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculo`
--

CREATE TABLE IF NOT EXISTS `vehiculo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `year` int(11) NOT NULL,
  `color` varchar(100) DEFAULT NULL,
  `placa` varchar(10) NOT NULL,
  `imagen` varchar(250) NOT NULL,
  `idModelo` int(11) NOT NULL,
  `idTipoVehiculo` int(11) NOT NULL,
  `idPropietario` int(11) NOT NULL,
  `fechaFila` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `U_Placa_Vehiculo` (`placa`),
  KEY `FK_Modelo_Vehiculo` (`idModelo`),
  KEY `FK_TipoVehiculo_Vehiculo` (`idTipoVehiculo`),
  KEY `FK_Propietario_Vehiculo` (`idPropietario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

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
  ADD CONSTRAINT `FK_Modelo_Vehiculo` FOREIGN KEY (`idModelo`) REFERENCES `modelo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_Propietario_Vehiculo` FOREIGN KEY (`idPropietario`) REFERENCES `propietario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_TipoVehiculo_Vehiculo` FOREIGN KEY (`idTipoVehiculo`) REFERENCES `tipovehiculo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
