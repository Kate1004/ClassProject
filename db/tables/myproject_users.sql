CREATE DATABASE  IF NOT EXISTS `myproject` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `myproject`;
-- MySQL dump 10.13  Distrib 5.6.17, for Win32 (x86)
--
-- Host: localhost    Database: myproject
-- ------------------------------------------------------
-- Server version	5.6.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(200) DEFAULT NULL,
  `pass` varchar(200) DEFAULT NULL,
  `eMail` varchar(200) DEFAULT NULL,
  `nameUser` varchar(200) DEFAULT NULL,
  `snameUser` varchar(200) DEFAULT NULL,
  `bDay` varchar(200) DEFAULT NULL,
  `photo` varchar(200) DEFAULT NULL,
  `id_sources` int(11) DEFAULT NULL,
  `id_catExpenses` int(11) DEFAULT NULL,
  `id_saves` int(11) DEFAULT NULL,
  `id_incomes` int(11) DEFAULT NULL,
  `id_expenses` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_sources` (`id_sources`),
  KEY `id_catExpenses` (`id_catExpenses`),
  KEY `id_saves` (`id_saves`),
  KEY `id_incomes` (`id_incomes`),
  KEY `id_expenses` (`id_expenses`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`id_sources`) REFERENCES `sources` (`id`),
  CONSTRAINT `users_ibfk_2` FOREIGN KEY (`id_catExpenses`) REFERENCES `catexpenses` (`id`),
  CONSTRAINT `users_ibfk_3` FOREIGN KEY (`id_saves`) REFERENCES `saves` (`id`),
  CONSTRAINT `users_ibfk_4` FOREIGN KEY (`id_incomes`) REFERENCES `incomes` (`id`),
  CONSTRAINT `users_ibfk_5` FOREIGN KEY (`id_expenses`) REFERENCES `expenses` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-11-09 18:58:01
