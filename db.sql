-- MySQL dump 10.13  Distrib 5.5.30, for Linux (x86_64)
--
-- Host: localhost    Database: carousel
-- ------------------------------------------------------
-- Server version	5.5.30

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
-- Table structure for table `Item`
--

DROP TABLE IF EXISTS `Item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Item` (
  `itemId` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`itemId`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Item`
--

LOCK TABLES `Item` WRITE;
/*!40000 ALTER TABLE `Item` DISABLE KEYS */;
INSERT INTO `Item` VALUES (1,'title','superfsdfsdf'),(2,'title','superfsdfsdffsd'),(3,'title','superfsdfsdffssdfd'),(4,'title','supesrfsdfsdffssdfd'),(5,'title','supesrfsdfsdffssdfda'),(6,'title','supesrfsdfsdffssdfda2'),(7,'title','supesrfsdfsdffssdfda23'),(8,'title','supesrfsdfsdffssdfda234'),(9,'title','supesrfsdfsdffssdfda2345'),(10,'title','supesrfsdfsdffssdfda2345'),(11,'title','supesrfsdfsdffssdfda2341235'),(12,'title','supesrfsdfsdffssdfda23412351'),(13,'title','supesrfsdfsdffssdfda23412351'),(14,'title','supesrfsdfsdffssdfda23412351'),(15,'title','supesrfsdfsdffssdfda23412351'),(16,'title','supesrfsdfsdffssdfda23412351'),(17,'title','supesrfsdfsdffssdfda23412351'),(18,'title','supesrfsdfsdffssdfda23412351'),(19,'title','supesrfsdfsdffssdfda23412351'),(20,'title','supesrfsdfsdffssdfda23412351'),(21,'title','supesrfsdfsdffssdfda23412351'),(22,'title','supesrfsdfsdffssdfda23412351'),(23,'title','supesrfsdfsdffssdfda23412351'),(24,'title','supesrfsdfsdffssdfda23412351'),(25,'title','supesrfsdfsdffssdfda23412351'),(26,'title','supesrfsdfsdffssdfda23412351'),(27,'title','supesrfsdfsdffssdfda23412351'),(28,'title','supesrfsdfsdffssdfda23412351'),(29,'title','supesrfsdfsdffssdfda23412351'),(30,'title','supesrfsdfsdffssdfda23412351'),(31,'title','supesrfsdfsdffssdfda23412351'),(32,'title','supesrfsdfsdffssdfda23412351'),(33,'title','supesrfsdfsdffssdfda23412351fsd'),(34,'title','supesrfsdfsdffssdfda23412351fsd123'),(35,'title','supesrfsdfsdffssdfda23412351fsd123124'),(36,'title','supesrfsdfsdffssdfda23412351fsd123124412'),(37,'title','supesrfsdfsdffssdfda23412351fsd12312441243');
/*!40000 ALTER TABLE `Item` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2013-04-17 20:30:14
