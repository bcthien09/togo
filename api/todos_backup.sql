mysqldump: [Warning] Using a password on the command line interface can be insecure.
-- MySQL dump 10.13  Distrib 5.7.41, for Linux (x86_64)
--
-- Host: localhost    Database: todos
-- ------------------------------------------------------
-- Server version	5.7.41

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
mysqldump: Error: 'Access denied; you need (at least one of) the PROCESS privilege(s) for this operation' when trying to dump tablespaces

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `description` text,
  `task_status` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (1,NULL,'Task -1',NULL,'2023-04-12 08:01:06'),(2,NULL,'Task -1',NULL,'2023-04-12 08:02:36'),(3,1,'Task -1',NULL,'2023-04-12 08:05:32'),(4,1,'Task -1',NULL,'2023-04-12 08:05:34'),(5,1,'Task -1',NULL,'2023-04-12 08:07:41'),(6,1,'Task -1',NULL,'2023-04-12 08:21:19'),(7,1,'Task -1',NULL,'2023-04-12 08:21:24'),(8,1,'Task -1',NULL,'2023-04-12 08:21:25'),(9,1,'Task -1',NULL,'2023-04-12 08:21:26'),(10,1,'Task -1',NULL,'2023-04-12 08:21:26'),(11,1,'Task -1',NULL,'2023-04-12 08:21:26'),(12,1,'Task -1',NULL,'2023-04-12 08:21:27'),(13,7,'Task -1',NULL,'2023-04-12 08:28:37'),(14,7,'Task -1',NULL,'2023-04-12 08:28:38'),(15,7,'Task -1',NULL,'2023-04-12 08:28:39'),(16,7,'Task -1',NULL,'2023-04-12 08:28:39'),(17,7,'Task -1',NULL,'2023-04-12 08:28:40'),(18,7,'Task -1',NULL,'2023-04-12 08:28:40'),(19,7,'Task -1',NULL,'2023-04-12 08:28:40'),(20,7,'Task -1',NULL,'2023-04-12 08:28:40'),(21,7,'Task -1',NULL,'2023-04-12 08:28:40'),(22,7,'Task -1',NULL,'2023-04-12 08:28:41'),(23,7,'Task -1',NULL,'2023-04-12 09:06:25'),(24,7,'Task -1',NULL,'2023-04-12 09:06:43'),(25,7,'Task -1',NULL,'2023-04-12 09:10:40'),(26,7,'Task -1',NULL,'2023-04-12 09:11:27'),(27,7,'Task -1',NULL,'2023-04-12 09:12:45'),(28,7,'Task -1',NULL,'2023-04-12 09:13:18'),(29,7,'Task -1',NULL,'2023-04-13 09:24:09'),(30,8,'Task -1',NULL,'2023-04-12 09:34:46'),(31,8,'Task -1',NULL,'2023-04-12 09:34:48'),(32,8,'Task -1',NULL,'2023-04-12 09:34:49'),(33,10,'Task testing Li9OW7kng1',NULL,'2023-04-12 15:30:36'),(34,10,'Task testing 5QujdwlTwm',NULL,'2023-04-12 15:31:41'),(35,10,'Task testing 4g70VoRRNI',NULL,'2023-04-13 02:05:27');
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `max_todo` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'a@gmail.com','$2a$10$K4fUotFbq1pfpcDFT3YBVejU8ox9KrySMk45pS2HoU64lQ9GY4t4K',10,'2023-04-12 07:23:54'),(2,'a1@gmail.com',NULL,NULL,'2023-04-12 07:31:35'),(3,'a1@gmail.com','$2a$10$JJFt.MIh447O8BWMU30dcub9.8GD.a1rKEWBYcHI9tgphlOE/uYKW',10,'2023-04-12 07:33:05'),(4,'a1@gmail.com','$2a$10$DHf1bQPqEc1UqwO8g8e.HOY/WTv/LnQeeODsrSOkkJieXDKlZ0gFa',10,'2023-04-12 07:33:07'),(5,'a1@gmail.com','$2a$10$Lj.MqHv4mWo4GpbGDNxOZ.u9zZsXQpn2N6.YLj41Vk2lPiOXx4Ub.',10,'2023-04-12 07:38:15'),(6,'a1@gmail.com','$2a$10$vb9QFbE3lwMJ9NgPy8Jdc.0rrdR8L8mv0jr2dXvm6ExCaIBo.Tk5e',10,'2023-04-12 07:38:17'),(7,'a2@gmail.com','$2a$10$4S.4lC4LH.r.Ucmnox9O5.sblLiXjHnVz6kg3/T7vOdkKp5S72cQq',10,'2023-04-12 08:27:53'),(8,'a3@gmail.com','$2a$10$BK.rQBpRJSz1Ng1gbJLBCOND/bQ2MAzfAE9wlycLm8kyZgr6DiwOK',3,'2023-04-12 09:34:10'),(9,'test1','$2a$10$wgCm4cbDNMVE/2AlPkIq6.ja0WGjz04H2q26ff1aQhUK56GRxkhHW',3,'2023-04-12 10:37:34'),(10,'a4@gmail.com','$2a$10$CzytUvgfzQjxGiIKJU4sausW9ZCJN0jeTsWHrXjp/5Zh.arZWt7BG',3,'2023-04-12 13:25:19'),(11,'test2','$2a$10$JB9/2JMNUvM1bsnmblbZtORfdCKBOF4QBZjlPAXftJAkQeEPAtBKG',3,'2023-04-12 13:40:32'),(12,'test3','$2a$10$aeUraBvZlpcsR6tiVAQ94evotteJMXqbkhn8tkBZvSmSKZ13gkElS',3,'2023-04-12 13:42:36'),(13,'test4','$2a$10$d9RlkE61NyfoKv.cnAv5ZOohGmuEDdJzSHbsceCUobMeRvRy4PU/u',3,'2023-04-12 13:44:00'),(14,'test5','$2a$10$OK17OhIP7p.hubu3PJezlO0a2YOvAjm5TNL/mYoiBRgdqRO1dpra.',3,'2023-04-12 13:45:42'),(15,'test6','$2a$10$F/HZnnfslzaVGYFnHMSUT.1ctlG/yf/iBL3cSyNKF1u3u1GBl2HZW',3,'2023-04-12 14:06:46'),(16,'testdxVx20sr4y','$2a$10$.nLzUgVlZYVqUB18iS7HouPpypeeFNN8eJ1KuAmR5ne7GvYpT5tvO',3,'2023-04-12 14:12:05'),(17,'test2WZclZtXij','$2a$10$3NY0TML0uQ1LLperHg/mju939elnc0MG3/mAyfij40mfuQDrosvk.',3,'2023-04-12 14:12:08'),(18,'testDqiUg7gN43','$2a$10$QEllc8GsWeg5JLyxd3fR6uI/VSqV8slqvDvbWTzFyoKRaVLHjKmJa',3,'2023-04-12 15:04:31'),(19,'testFkv9DdPTV9','$2a$10$7pAuvP8gW1hcHpcVR9F8Gu4MbOzO2.7tJ7LqYy4T.r8XHikegE8Ru',3,'2023-04-12 15:06:37'),(20,'testx70v0e8TPO','$2a$10$sQh4Eff.wdZCUyV/etd.ke9UaAsags5DpJUKaoFUDOBEWcR5ySSWa',3,'2023-04-12 15:08:21'),(21,'testWBGv0vn0TA','$2a$10$IjbLqo/cpWZ5OH/kTvHkmu5CcHjoK/g/mqK1V8KNn00tquswexNIu',3,'2023-04-12 15:08:39'),(22,'testz7ic9t5t4G','$2a$10$gAfAARzw.nmOz.FhLZJHhOeddHfa0zqs537sVXifdMiRPv/./CeYS',3,'2023-04-12 15:10:33'),(23,'testwmrKZ8ufbT','$2a$10$gcGfNl.9bzLqvRvaLP4OLehLUy2PzNxqXRiRpuCyCUHa9R7CNDzg.',3,'2023-04-12 15:11:17'),(24,'testkhXdhIWmPP','$2a$10$AIQyb.UQMjsVVy1dtQBe6uBBQIpBzb/L88GxWiTsmzif9JvEcl36W',3,'2023-04-12 15:15:43'),(25,'testejBTae5ilF','$2a$10$ivOoI4UcSeLhZ8xArtCAgeIpnLcNROrm8tTI9/xK2xasZ0KV4.DdW',3,'2023-04-12 15:30:46'),(26,'testHpsdqvSgmv','$2a$10$pf/5QXOMUX66up8v6QT0ZO8MGR8LKdiPG62j26jlJbeO4iJdRRZ.6',3,'2023-04-12 15:31:42'),(27,'testUvGqLDfQ1S','$2a$10$h0MJl9PFiS6lvvajaAVJ4.v1E8CtKg74/FcZE7z1YtXeKQWUYpEBG',3,'2023-04-13 01:19:48'),(28,'testBFCUKDj8Ui','$2a$10$oydYIY.lQjkX1Lwj8omlyuf9KnChg3CIapd69itEMvfyva8hTivOC',3,'2023-04-13 01:19:55'),(29,'testbNcllcPiEW','$2a$10$qOJdlNCpOciTn9gFIdQdqOnQIk5QT8jGFWSmKlex0jYACftCvYKyu',3,'2023-04-13 01:20:42'),(30,'testpIA1vrRXhw','$2a$10$1imgwWiT6iup5Jhvo8g0y.GsIhSsJTcz..BsTYCQH4j0NI.Hqmp8C',3,'2023-04-13 01:21:13'),(31,'testX1cOcshfua','$2a$10$231zWnKlz7gHocd7ExCT3.JalCBm0MxmWdpAi2vSYCg9Vyfy2m8wS',3,'2023-04-13 01:26:16'),(32,'testuhe5txUIWg','$2a$10$RUG22T9WvvsZoqEAh9DbE.Bqfbwv8MvdwdyXWMnASyyzEqLa6Ml22',3,'2023-04-13 01:30:50'),(33,'testMnj4aoKuPL','$2a$10$PWeYcxs7Rt2.m9lpP8eK8.K9ZvYSEjn8GSrVspQeSzC0Hu6.clrza',3,'2023-04-13 02:01:56'),(34,'testzpMdf3BYHv','$2a$10$rCY7IJnjPhu8bdEYy.hyC.cDlCimyI.1ZaHlH0Q6y3ji3iFGXkuwa',3,'2023-04-13 02:02:41'),(35,'testzn9boVSmJW','$2a$10$3wlcGat9SGA/5nkedrqam.Yk/Uuap/HeclgVnb1dOgvRWfnkAhO3W',3,'2023-04-13 02:05:27');
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

-- Dump completed on 2023-04-13  2:38:11
