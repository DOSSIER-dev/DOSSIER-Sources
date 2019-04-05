-- MySQL dump 10.13  Distrib 5.7.23, for Linux (x86_64)
--
-- Host: localhost    Database: sources
-- ------------------------------------------------------
-- Server version	5.7.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can add permission',2,'add_permission'),(5,'Can change permission',2,'change_permission'),(6,'Can delete permission',2,'delete_permission'),(7,'Can add group',3,'add_group'),(8,'Can change group',3,'change_group'),(9,'Can delete group',3,'delete_group'),(10,'Can add user',4,'add_user'),(11,'Can change user',4,'change_user'),(12,'Can delete user',4,'delete_user'),(13,'Can add content type',5,'add_contenttype'),(14,'Can change content type',5,'change_contenttype'),(15,'Can delete content type',5,'delete_contenttype'),(16,'Can add session',6,'add_session'),(17,'Can change session',6,'change_session'),(18,'Can delete session',6,'delete_session'),(19,'Can add Token',7,'add_token'),(20,'Can change Token',7,'change_token'),(21,'Can delete Token',7,'delete_token'),(22,'Can add annotation',8,'add_annotation'),(23,'Can change annotation',8,'change_annotation'),(24,'Can delete annotation',8,'delete_annotation'),(25,'Can add source',9,'add_source'),(26,'Can change source',9,'change_source'),(27,'Can delete source',9,'delete_source'),(28,'Can add file',10,'add_file'),(29,'Can change file',10,'change_file'),(30,'Can delete file',10,'delete_file'),(31,'Can add organisation',11,'add_organisation'),(32,'Can change organisation',11,'change_organisation'),(33,'Can delete organisation',11,'delete_organisation'),(34,'Can add project tag',12,'add_projecttag'),(35,'Can change project tag',12,'change_projecttag'),(36,'Can delete project tag',12,'delete_projecttag'),(37,'Can add tag',13,'add_tag'),(38,'Can change tag',13,'change_tag'),(39,'Can delete tag',13,'delete_tag'),(40,'Can add staffer profile',14,'add_stafferprofile'),(41,'Can change staffer profile',14,'change_stafferprofile'),(42,'Can delete staffer profile',14,'delete_stafferprofile'),(43,'Can add source hit',15,'add_sourcehit'),(44,'Can change source hit',15,'change_sourcehit'),(45,'Can delete source hit',15,'delete_sourcehit'),(46,'Can add collection',12,'add_collection'),(47,'Can change collection',12,'change_collection'),(48,'Can delete collection',12,'delete_collection'),(49,'Can add bookmark',16,'add_bookmark'),(50,'Can change bookmark',16,'change_bookmark'),(51,'Can delete bookmark',16,'delete_bookmark'),(52,'Can view log entry',1,'view_logentry'),(53,'Can view permission',2,'view_permission'),(54,'Can view group',3,'view_group'),(55,'Can view user',4,'view_user'),(56,'Can view content type',5,'view_contenttype'),(57,'Can view session',6,'view_session'),(58,'Can view Token',7,'view_token'),(59,'Can view annotation',8,'view_annotation'),(60,'Can view source',9,'view_source'),(61,'Can view file',10,'view_file'),(62,'Can view organisation',11,'view_organisation'),(63,'Can view tag',13,'view_tag'),(64,'Can view staffer profile',14,'view_stafferprofile'),(65,'Can view collection',12,'view_collection'),(66,'Can view source hit',15,'view_sourcehit'),(67,'Can view bookmark',16,'view_bookmark'),(68,'Can add story',17,'add_story'),(69,'Can change story',17,'change_story'),(70,'Can delete story',17,'delete_story'),(71,'Can view story',17,'view_story');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_login` datetime DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(254) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$120000$LgTFLP9RqzgO$ohHvT7mq97JazGUFcLuusekrGnxyX9zWgM4c1Nhg6Y0=','2019-02-14 09:24:37',1,'admin','','','mf@tt4.at',1,1,'2018-07-12 12:54:24'),(2,'pbkdf2_sha256$100000$zi756NAPRbJL$hUAefVxAq89oKFU5OD+0vyhBP/4LwxSRJznosWJ3rq4=','2018-09-12 19:16:29',0,'test@tt4.at','Test','User','test@tt4.at',0,1,'2018-07-12 12:55:48'),(3,'pbkdf2_sha256$100000$TjX00U93R1S2$cl08SFQ+44cadyxN+w97bhN+hgULGZYJnuclswlbP7M=','2018-09-12 19:16:11',0,'OtherUser','','','',0,1,'2018-09-12 19:14:39');
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authtoken_token`
--

DROP TABLE IF EXISTS `authtoken_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `authtoken_token` (
  `key` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`key`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `authtoken_token_user_id_35299eff_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authtoken_token`
--

LOCK TABLES `authtoken_token` WRITE;
/*!40000 ALTER TABLE `authtoken_token` DISABLE KEYS */;
INSERT INTO `authtoken_token` VALUES ('be5740bf8da60811833f9da348ca96b504d98a95','2019-02-14 09:24:37',1);
/*!40000 ALTER TABLE `authtoken_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookmarks_bookmark`
--

DROP TABLE IF EXISTS `bookmarks_bookmark`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bookmarks_bookmark` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` datetime NOT NULL,
  `source_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `bookmarks_bookmark_source_id_user_id_7bcd345b_uniq` (`source_id`,`user_id`),
  KEY `bookmarks_bookmark_user_id_a26bf17c_fk_auth_user_id` (`user_id`),
  CONSTRAINT `bookmarks_bookmark_source_id_87166f95_fk_sources_main_source_id` FOREIGN KEY (`source_id`) REFERENCES `sources_main_source` (`id`),
  CONSTRAINT `bookmarks_bookmark_user_id_a26bf17c_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookmarks_bookmark`
--

LOCK TABLES `bookmarks_bookmark` WRITE;
/*!40000 ALTER TABLE `bookmarks_bookmark` DISABLE KEYS */;
INSERT INTO `bookmarks_bookmark` VALUES (1,'2018-11-02 12:28:37',1,1);
/*!40000 ALTER TABLE `bookmarks_bookmark` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_time` datetime NOT NULL,
  `object_id` longtext COLLATE utf8mb4_unicode_ci,
  `object_repr` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `action_flag` smallint(5) unsigned NOT NULL,
  `change_message` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2018-07-12 12:55:48','2','test',1,'[{\"added\": {}}]',4,1),(2,'2018-07-12 12:56:18','1','1-pick1',1,'[{\"added\": {}}]',11,1),(3,'2018-07-12 12:56:29','1','StafferProfile object (1)',2,'[{\"changed\": {\"fields\": [\"organisation\"]}}]',14,1),(4,'2018-07-12 12:56:32','2','StafferProfile object (2)',2,'[{\"changed\": {\"fields\": [\"organisation\"]}}]',14,1),(5,'2018-07-14 12:00:33','1','pick1-Tag1',1,'[{\"added\": {}}]',13,1),(6,'2018-07-14 12:00:42','2','pick1-Tag2',1,'[{\"added\": {}}]',13,1),(7,'2018-08-07 14:18:35','4','4-made-with-cc-short.pdf',3,'',10,1),(8,'2018-08-07 14:18:35','3','3-made-with-cc.pdf',3,'',10,1),(9,'2018-08-07 14:18:35','2','2-dummydoc.pdf',3,'',10,1),(10,'2018-08-07 14:18:35','1','1-dummydoc.pdf',3,'',10,1),(11,'2018-08-07 14:18:55','0583ed55f593ad4c35703c07593f47d6e2a7e346','0583ed55f593ad4c35703c07593f47d6e2a7e346',3,'',7,1),(12,'2018-08-07 14:18:55','77c24c38327f222076cf52eaa0fcfd84978125fd','77c24c38327f222076cf52eaa0fcfd84978125fd',3,'',7,1),(13,'2018-09-07 09:39:30','4','Annotation object (4)',2,'[{\"changed\": {\"fields\": [\"page\", \"pageX\", \"pageY\", \"width\", \"height\"]}}]',8,1),(14,'2018-09-12 19:14:23','2','2-OtherOrg',1,'[{\"added\": {}}]',11,1),(15,'2018-09-12 19:14:39','3','OtherUser',1,'[{\"added\": {}}]',4,1),(16,'2018-09-12 19:14:49','3','OtherUser',2,'[{\"changed\": {\"name\": \"staffer profile\", \"object\": \"StafferProfile object (3)\", \"fields\": [\"organisation\"]}}]',4,1),(17,'2018-11-02 12:29:05','1','admin',2,'[{\"changed\": {\"name\": \"staffer profile\", \"object\": \"StafferProfile object (1)\", \"fields\": [\"isManager\"]}}]',4,1),(18,'2018-11-12 09:53:35','2','test@tt4.at',2,'[{\"changed\": {\"fields\": [\"username\", \"first_name\", \"last_name\", \"email\"]}}]',4,1),(19,'2018-11-12 09:55:10','7131bdba04d7f3edd072e37fea01d06b99cae2a6','7131bdba04d7f3edd072e37fea01d06b99cae2a6',3,'',7,1),(20,'2018-11-12 09:55:10','129e56541a0cc9ca1a8d6a4c2c28974c707f0cba','129e56541a0cc9ca1a8d6a4c2c28974c707f0cba',3,'',7,1);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(7,'authtoken','token'),(16,'bookmarks','bookmark'),(5,'contenttypes','contenttype'),(10,'filestorage','file'),(12,'organisation','collection'),(11,'organisation','organisation'),(14,'organisation','stafferprofile'),(17,'organisation','story'),(13,'organisation','tag'),(6,'sessions','session'),(8,'sources_main','annotation'),(9,'sources_main','source'),(15,'stats','sourcehit');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `applied` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2018-07-12 12:54:06'),(2,'auth','0001_initial','2018-07-12 12:54:06'),(3,'admin','0001_initial','2018-07-12 12:54:06'),(4,'admin','0002_logentry_remove_auto_add','2018-07-12 12:54:06'),(5,'contenttypes','0002_remove_content_type_name','2018-07-12 12:54:06'),(6,'auth','0002_alter_permission_name_max_length','2018-07-12 12:54:06'),(7,'auth','0003_alter_user_email_max_length','2018-07-12 12:54:06'),(8,'auth','0004_alter_user_username_opts','2018-07-12 12:54:06'),(9,'auth','0005_alter_user_last_login_null','2018-07-12 12:54:06'),(10,'auth','0006_require_contenttypes_0002','2018-07-12 12:54:06'),(11,'auth','0007_alter_validators_add_error_messages','2018-07-12 12:54:06'),(12,'auth','0008_alter_user_username_max_length','2018-07-12 12:54:06'),(13,'auth','0009_alter_user_last_name_max_length','2018-07-12 12:54:06'),(14,'authtoken','0001_initial','2018-07-12 12:54:06'),(15,'authtoken','0002_auto_20160226_1747','2018-07-12 12:54:06'),(16,'organisation','0001_initial','2018-07-12 12:54:06'),(17,'filestorage','0001_initial','2018-07-12 12:54:06'),(18,'filestorage','0002_auto_20180412_1048','2018-07-12 12:54:07'),(19,'filestorage','0003_auto_20180426_1616','2018-07-12 12:54:07'),(20,'filestorage','0004_auto_20180509_1146','2018-07-12 12:54:07'),(21,'filestorage','0005_auto_20180509_1331','2018-07-12 12:54:07'),(22,'filestorage','0006_file_hashed','2018-07-12 12:54:07'),(23,'organisation','0002_projecttag_tag','2018-07-12 12:54:07'),(24,'organisation','0003_stafferprofile','2018-07-12 12:54:07'),(25,'organisation','0004_auto_20180711_1434','2018-07-12 12:54:07'),(26,'organisation','0005_auto_20180712_1254','2018-07-12 12:54:07'),(27,'sessions','0001_initial','2018-07-12 12:54:07'),(28,'sources_main','0001_initial','2018-07-12 12:54:07'),(29,'sources_main','0002_auto_20180416_1056','2018-07-12 12:54:08'),(30,'sources_main','0003_auto_20180416_1233','2018-07-12 12:54:08'),(31,'sources_main','0003_auto_20180416_1251','2018-07-12 12:54:08'),(32,'sources_main','0004_auto_20180416_1451','2018-07-12 12:54:08'),(33,'sources_main','0005_source_embedid','2018-07-12 12:54:08'),(34,'sources_main','0006_auto_20180426_1616','2018-07-12 12:54:08'),(35,'sources_main','0007_auto_20180509_1146','2018-07-12 12:54:08'),(36,'sources_main','0008_auto_20180509_1331','2018-07-12 12:54:08'),(37,'sources_main','0009_source_tags','2018-07-12 12:54:08'),(38,'sources_main','0010_auto_20180614_1526','2018-07-12 12:54:09'),(39,'sources_main','0002_auto_20180416_1056_squashed_0003_auto_20180416_1233','2018-07-12 12:54:09'),(40,'organisation','0006_remove_organisation_users','2018-07-12 15:44:32'),(41,'organisation','0007_auto_20180716_1027','2018-07-19 11:04:25'),(42,'sources_main','0011_auto_20180716_1729','2018-07-19 11:04:25'),(43,'sources_main','0012_auto_20180812_0753','2018-08-15 10:41:57'),(44,'stats','0001_initial','2018-08-15 10:41:57'),(45,'stats','0002_auto_20180813_0807','2018-08-15 10:41:58'),(46,'stats','0003_auto_20180813_0811','2018-08-15 10:41:58'),(47,'organisation','0008_auto_20180815_1439','2018-08-15 20:38:11'),(48,'sources_main','0013_source_collection','2018-08-16 08:12:47'),(49,'sources_main','0014_auto_20180824_1353','2018-09-03 12:55:24'),(50,'sources_main','0015_auto_20180905_0833','2018-09-05 08:33:46'),(51,'stats','0004_auto_20180911_0941','2018-09-11 09:43:35'),(52,'sources_main','0016_auto_20180924_1823','2018-09-24 18:24:17'),(53,'bookmarks','0001_initial','2018-09-28 12:53:09'),(54,'bookmarks','0002_auto_20180928_1232','2018-09-28 12:53:09'),(55,'admin','0003_logentry_add_action_flag_choices','2018-10-22 16:15:40'),(56,'organisation','0009_auto_20181022_1607','2018-10-22 16:15:40'),(57,'sources_main','0017_auto_20181022_1607','2018-10-22 16:15:40'),(58,'stats','0005_sourcehit_eventtype','2018-10-23 16:15:29'),(59,'filestorage','0007_file_mimetype','2018-11-15 08:31:54'),(60,'sources_main','0018_migrate_sourcetypes','2018-11-15 08:31:55'),(61,'organisation','0010_auto_20181122_1822','2019-01-30 17:43:54'),(62,'sources_main','0019_auto_20181122_1822','2019-01-30 17:43:54'),(63,'organisation','0011_auto_20190130_1744','2019-01-30 17:44:31'),(64,'sources_main','0020_remove_source_file','2019-02-04 14:41:26'),(65,'organisation','0012_auto_20190204_1632','2019-02-04 16:34:54'),(66,'sources_main','0021_auto_20190207_0955','2019-02-07 09:55:22'),(67,'stats','0006_auto_20190207_1131','2019-02-07 11:32:17'),(68,'sources_main','0022_source_publisheddate','2019-02-07 17:57:44'),(69,'organisation','0013_auto_20190211_1623','2019-02-11 16:24:46'),(70,'sources_main','0023_source_stories','2019-02-11 16:24:46'),(71,'filestorage','0008_file_downloadid','2019-02-18 15:26:48'),(72,'filestorage','0009_populate_file_downloadid','2019-02-18 15:26:48'),(73,'sources_main','0024_auto_20190218_1509','2019-02-18 15:26:49'),(74,'stats','0007_auto_20190218_1509','2019-02-18 15:26:49'),(75,'sources_main','0025_rename_sourcetype','2019-03-24 10:30:34'),(76,'sources_main','0026_auto_20190326_1544','2019-03-26 15:45:03'),(77,'organisation','0014_remove_stafferprofile_isactive','2019-03-26 16:19:42'),(78,'sources_main','0027_auto_20190403_0759','2019-04-03 08:06:57'),(79,'sources_main','0028_auto_20190403_0822','2019-04-03 08:23:03'),(80,'sources_main','0029_source_externalservicename','2019-04-03 08:54:16'),(81,'sources_main','0030_default_servicename','2019-04-03 08:54:16');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `session_data` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expire_date` datetime NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('0or81tqx7iwztxlv4ncpksn2x8qjb6nz','Zjk3YTNiMzQxN2YxNTliM2Q2MjAyNDI1YmMzNWJlNjgwZWYwMjUyMDp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI5ZDlkMDEyMGMxNWIzMTU0NmZlMjFjMDNkZTIyZjUyZGI5ZDU4ODEyIn0=','2018-09-04 07:07:08'),('2v8xxnyrpglhqmqkhqov1mppjzdt34tu','Zjk3YTNiMzQxN2YxNTliM2Q2MjAyNDI1YmMzNWJlNjgwZWYwMjUyMDp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI5ZDlkMDEyMGMxNWIzMTU0NmZlMjFjMDNkZTIyZjUyZGI5ZDU4ODEyIn0=','2018-08-02 11:05:26'),('467lbiezda68ct2plbfx30i109s8qadm','Zjk3YTNiMzQxN2YxNTliM2Q2MjAyNDI1YmMzNWJlNjgwZWYwMjUyMDp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI5ZDlkMDEyMGMxNWIzMTU0NmZlMjFjMDNkZTIyZjUyZGI5ZDU4ODEyIn0=','2018-10-08 18:24:39'),('7mg6aorv8zdrm5fdm3pbmkuab5yris6h','NzY1MDY3ZWM1ZDU1OWVjODIwN2E2MDI3ZDdiZjFlMTliYzIxOTg0Yzp7Il9hdXRoX3VzZXJfaWQiOiIyIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJhYWI3MjNmZGZmOTQwOWY0ZGE2YzZlMGI1YmMxMWExZTgxMTM5Mzc0In0=','2018-09-26 19:16:29'),('9aojkisn3k6ceve6knmie1qm6orkftek','YjE0NTY0ZTY1ZWFjMjJmODY1NjE3NzA5ZTNjOTNhYjAxNmZiOWFmMTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI2ZmU0OTRiMjQyNTRhODEyY2U3MjY5ZGQ5MGFlOWFjZjUxODU4NDQzIn0=','2018-11-16 12:28:21'),('bt7qrwfcjoijepgm8qwj3ertyctgw3vs','YjE0NTY0ZTY1ZWFjMjJmODY1NjE3NzA5ZTNjOTNhYjAxNmZiOWFmMTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI2ZmU0OTRiMjQyNTRhODEyY2U3MjY5ZGQ5MGFlOWFjZjUxODU4NDQzIn0=','2019-02-28 09:24:37'),('d2e3b5h1pd3j1hilkk8rjcmquoxby87r','Zjk3YTNiMzQxN2YxNTliM2Q2MjAyNDI1YmMzNWJlNjgwZWYwMjUyMDp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI5ZDlkMDEyMGMxNWIzMTU0NmZlMjFjMDNkZTIyZjUyZGI5ZDU4ODEyIn0=','2018-07-28 12:00:07'),('ef3j4chuvujd4t1q7dj65xnxfp29pk2q','Zjk3YTNiMzQxN2YxNTliM2Q2MjAyNDI1YmMzNWJlNjgwZWYwMjUyMDp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI5ZDlkMDEyMGMxNWIzMTU0NmZlMjFjMDNkZTIyZjUyZGI5ZDU4ODEyIn0=','2018-08-21 13:20:18'),('t43904emfn08ptzx2p8xf63t4nnv9c4e','YjE0NTY0ZTY1ZWFjMjJmODY1NjE3NzA5ZTNjOTNhYjAxNmZiOWFmMTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI2ZmU0OTRiMjQyNTRhODEyY2U3MjY5ZGQ5MGFlOWFjZjUxODU4NDQzIn0=','2018-11-26 09:53:20'),('xr56rh188osb0wv21xt49qa9l9knelnu','Zjk3YTNiMzQxN2YxNTliM2Q2MjAyNDI1YmMzNWJlNjgwZWYwMjUyMDp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI5ZDlkMDEyMGMxNWIzMTU0NmZlMjFjMDNkZTIyZjUyZGI5ZDU4ODEyIn0=','2018-08-21 14:17:08');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `filestorage_file`
--

DROP TABLE IF EXISTS `filestorage_file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `filestorage_file` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `file` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `owner_id` int(11) DEFAULT NULL,
  `path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated_at` datetime NOT NULL,
  `organisation_id` int(11) NOT NULL,
  `hashed` varchar(256) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mimetype` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `downloadId` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `filestorage_file_owner_id_baa3afdb_fk_auth_user_id` (`owner_id`),
  KEY `filestorage_file_organisation_id_11d24ad2_fk_organisat` (`organisation_id`),
  CONSTRAINT `filestorage_file_organisation_id_11d24ad2_fk_organisat` FOREIGN KEY (`organisation_id`) REFERENCES `organisation_organisation` (`id`),
  CONSTRAINT `filestorage_file_owner_id_baa3afdb_fk_auth_user_id` FOREIGN KEY (`owner_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `filestorage_file`
--

LOCK TABLES `filestorage_file` WRITE;
/*!40000 ALTER TABLE `filestorage_file` DISABLE KEYS */;
INSERT INTO `filestorage_file` VALUES (5,'','made-with-cc-min.pdf','2018-08-07 14:17:30',1,'media/1/300015705-made-with-cc-min.pdf','2018-08-07 14:17:30',1,'93d9a047a91422ea191fdca701b0e9f37d4d5cf18045fcfad94e71858ed067ba','','f95dd4b6-44c8-4d94-8267-2d837d722c92'),(6,'','testbild.jpg','2018-09-07 17:56:56',1,'media/1/794347052-testbild.jpg','2018-09-07 17:56:56',1,'5ae04e1b20b5f56ab04fc7ef01bb8319b849a0dbb4b3556bef5c59f80f41a4ce','','e86b17e0-948b-48aa-957c-8d27d378b450');
/*!40000 ALTER TABLE `filestorage_file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organisation_collection`
--

DROP TABLE IF EXISTS `organisation_collection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `organisation_collection` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `organisation_id` int(11) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `organisation_collection_name_organisation_id_80a31a5d_uniq` (`name`,`organisation_id`),
  KEY `organisation_project_organisation_id_39c22c63_fk_organisat` (`organisation_id`),
  CONSTRAINT `organisation_project_organisation_id_39c22c63_fk_organisat` FOREIGN KEY (`organisation_id`) REFERENCES `organisation_organisation` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organisation_collection`
--

LOCK TABLES `organisation_collection` WRITE;
/*!40000 ALTER TABLE `organisation_collection` DISABLE KEYS */;
INSERT INTO `organisation_collection` VALUES (1,'FirstCollection',1,'2019-01-30 17:44:30.118690','2019-01-30 17:44:30.219532'),(2,'TestCollection',1,'2019-01-30 17:44:30.118690','2019-01-30 17:44:30.219532'),(3,'ABCCollection',1,'2019-01-30 17:44:30.118690','2019-01-30 17:44:30.219532');
/*!40000 ALTER TABLE `organisation_collection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organisation_organisation`
--

DROP TABLE IF EXISTS `organisation_organisation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `organisation_organisation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `color` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `logo` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organisation_organisation`
--

LOCK TABLES `organisation_organisation` WRITE;
/*!40000 ALTER TABLE `organisation_organisation` DISABLE KEYS */;
INSERT INTO `organisation_organisation` VALUES (1,'pick1','red','test.png','2019-01-30 17:44:30.320339','2019-01-30 17:44:30.403024'),(2,'OtherOrg','test','test','2019-01-30 17:44:30.320339','2019-01-30 17:44:30.403024');
/*!40000 ALTER TABLE `organisation_organisation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organisation_stafferprofile`
--

DROP TABLE IF EXISTS `organisation_stafferprofile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `organisation_stafferprofile` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `organisation_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `isManager` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  KEY `organisation_staffer_organisation_id_8afa9951_fk_organisat` (`organisation_id`),
  CONSTRAINT `organisation_staffer_organisation_id_8afa9951_fk_organisat` FOREIGN KEY (`organisation_id`) REFERENCES `organisation_organisation` (`id`),
  CONSTRAINT `organisation_stafferprofile_user_id_fbaeccda_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organisation_stafferprofile`
--

LOCK TABLES `organisation_stafferprofile` WRITE;
/*!40000 ALTER TABLE `organisation_stafferprofile` DISABLE KEYS */;
INSERT INTO `organisation_stafferprofile` VALUES (1,1,1,1),(2,1,2,0),(3,2,3,0);
/*!40000 ALTER TABLE `organisation_stafferprofile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organisation_story`
--

DROP TABLE IF EXISTS `organisation_story`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `organisation_story` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `organisation_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `organisation_story_name_organisation_id_553313e3_uniq` (`name`,`organisation_id`),
  KEY `organisation_story_organisation_id_abe31c0d_fk_organisat` (`organisation_id`),
  CONSTRAINT `organisation_story_organisation_id_abe31c0d_fk_organisat` FOREIGN KEY (`organisation_id`) REFERENCES `organisation_organisation` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organisation_story`
--

LOCK TABLES `organisation_story` WRITE;
/*!40000 ALTER TABLE `organisation_story` DISABLE KEYS */;
/*!40000 ALTER TABLE `organisation_story` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organisation_tag`
--

DROP TABLE IF EXISTS `organisation_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `organisation_tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `organisation_id` int(11) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `organisation_tag_name_organisation_id_bb6ca8de_uniq` (`name`,`organisation_id`),
  KEY `organisation_tag_organisation_id_0e499a90_fk_organisat` (`organisation_id`),
  CONSTRAINT `organisation_tag_organisation_id_0e499a90_fk_organisat` FOREIGN KEY (`organisation_id`) REFERENCES `organisation_organisation` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organisation_tag`
--

LOCK TABLES `organisation_tag` WRITE;
/*!40000 ALTER TABLE `organisation_tag` DISABLE KEYS */;
INSERT INTO `organisation_tag` VALUES (1,'Tag1',1,'2019-01-30 17:44:30.488400','2019-01-30 17:44:30.586581'),(2,'Tag2',1,'2019-01-30 17:44:30.488400','2019-01-30 17:44:30.586581');
/*!40000 ALTER TABLE `organisation_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sources_main_annotation`
--

DROP TABLE IF EXISTS `sources_main_annotation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sources_main_annotation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `locationText` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `source_id` int(11) NOT NULL,
  `page` int(11) DEFAULT NULL,
  `pageX` decimal(10,2) DEFAULT NULL,
  `pageY` decimal(10,2) DEFAULT NULL,
  `timecodeFrom` int(11) DEFAULT NULL,
  `height` decimal(10,2) DEFAULT NULL,
  `width` decimal(10,2) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `public` tinyint(1) NOT NULL,
  `timecodeTo` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sources_main_annotat_source_id_b69afbef_fk_sources_m` (`source_id`),
  CONSTRAINT `sources_main_annotat_source_id_b69afbef_fk_sources_m` FOREIGN KEY (`source_id`) REFERENCES `sources_main_source` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sources_main_annotation`
--

LOCK TABLES `sources_main_annotation` WRITE;
/*!40000 ALTER TABLE `sources_main_annotation` DISABLE KEYS */;
INSERT INTO `sources_main_annotation` VALUES (4,'Text part','some text part','',1,2,60.00,75.00,NULL,60.00,400.00,'2018-08-07 14:17:44','2018-09-07 09:40:05',0,NULL),(5,'Part 1','','',2,NULL,NULL,NULL,80,NULL,NULL,'2018-09-07 17:51:00','2018-09-07 17:51:17',0,NULL),(6,'Part 2','','',2,NULL,NULL,NULL,220,NULL,NULL,'2018-09-07 17:52:51','2018-09-07 17:53:35',0,NULL),(7,'One Annotation','','',3,1,168.00,63.00,NULL,87.00,226.00,'2018-09-07 17:57:13','2018-09-07 17:57:17',0,NULL),(8,'Public Annotation','Annotation-Description, publicly readable.','',1,3,298.19,488.66,NULL,90.55,247.45,'2019-02-14 09:25:03','2019-02-14 09:25:54',1,NULL);
/*!40000 ALTER TABLE `sources_main_annotation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sources_main_source`
--

DROP TABLE IF EXISTS `sources_main_source`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sources_main_source` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `public` tinyint(1) NOT NULL,
  `sourceId` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sourceURL` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `externalServiceId` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sourcetype` varchar(8) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contentRaw` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `fileRef_id` int(11) DEFAULT NULL,
  `owner_id` int(11) DEFAULT NULL,
  `embedId` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `organisation_id` int(11) NOT NULL,
  `collection_id` int(11) DEFAULT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `language` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `publishedDate` datetime(6) DEFAULT NULL,
  `externalServiceName` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sources_main_source_embedId_e94e9dab_uniq` (`embedId`),
  KEY `sources_main_source_owner_id_94d412c7_fk_auth_user_id` (`owner_id`),
  KEY `sources_main_source_organisation_id_1d921cc4_fk_organisat` (`organisation_id`),
  KEY `sources_main_source_fileRef_id_044abfeb_fk_filestorage_file_id` (`fileRef_id`),
  KEY `sources_main_source_collection_id_4d37b913_fk_organisat` (`collection_id`),
  CONSTRAINT `sources_main_source_collection_id_4d37b913_fk_organisat` FOREIGN KEY (`collection_id`) REFERENCES `organisation_collection` (`id`),
  CONSTRAINT `sources_main_source_fileRef_id_044abfeb_fk_filestorage_file_id` FOREIGN KEY (`fileRef_id`) REFERENCES `filestorage_file` (`id`),
  CONSTRAINT `sources_main_source_organisation_id_1d921cc4_fk_organisat` FOREIGN KEY (`organisation_id`) REFERENCES `organisation_organisation` (`id`),
  CONSTRAINT `sources_main_source_owner_id_94d412c7_fk_auth_user_id` FOREIGN KEY (`owner_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sources_main_source`
--

LOCK TABLES `sources_main_source` WRITE;
/*!40000 ALTER TABLE `sources_main_source` DISABLE KEYS */;
INSERT INTO `sources_main_source` VALUES (1,'Test Document','',1,NULL,NULL,NULL,'DOC','ivMade With Creative CommonsMade With Creative Commonsby Paul Stacey & Sarah Hinchliff Pearson© 2017, by Creative Commons.Published under a Creative Commons Attribution-ShareAlike license (CC BY-SA), version 4.0.ISBN 978-87-998733-3-3Cover and interior design by Klaus Nielsen, vinterstille.dkContent editing by Grace YaginumaIllustrations by Bryan Mathers, bryanmathers.comDownloadable e-book available at madewith.ccPublisher:Ctrl+Alt+Delete BooksHusumgade 10, 5.2200 Copenhagen NDenmarkwww.cadb.dkhey@cadb.dkPrinter: Drukarnia POZKAL Spółka z o.o. Spółka komandytowa88-100 Inowrocław, ul. Cegielna 10/12,PolandThis book is published under a CC BY-SA license, which means that you can copy, redistribute, remix, transform, and build upon the content for any purpose, even commercially, as long as you give appropriate credit, provide a link to the license, and indicate if changes were made. If you remix, transform, or build upon the material, you must distribute your contributions under the same license as the original. License details: creativecommons.org/licenses/by-sa/4.0/Made With Creative Commons is published with the kind support of Creative Commons and backers of our crowdfunding-campaign on the Kickstarter.com platform.xiMade With Creative CommonsFOREWORDThree years ago, just after I was hired as CEO of Creative Commons, I met with Cory Doctorow  in the hotel bar of Toronto’s Gladstone Hotel. As one of CC’s most well-known proponents—one who has also had a successful career as a writer who shares his work using CC—I told him I thought CC had a role in defining and ad-vancing open business models. He kindly dis-agreed, and called the pursuit of viable busi-ness models through CC “a red herring.”He was, in a way, completely correct—those who make things with Creative Commons have ulterior motives, as Paul Stacey explains in this book: “Regardless of legal status, they all have a social mission. Their primary reason for be-ing is to make the world a better place, not to profit. Money is a means to a social end, not the end itself.”In the case study about Cory Doctorow, Sar-ah Hinchliff Pearson cites Cory’s words from his book Information Doesn’t Want to Be Free: “Entering the arts because you want to get rich is like buying lottery tickets because you want to get rich. It might work, but it almost certain-ly won’t. Though, of course, someone always wins the lottery.” Today, copyright is like a lottery ticket—everyone has one, and almost nobody wins. What they don’t tell you is that if you choose to share your work, the returns can be signif-icant and long-lasting. This book is filled with stories of those who take much greater risks than the two dollars we pay for a lottery ticket, and instead reap the rewards that come from pursuing their passions and living their values. So it’s not about the money. Also: it is. Find-ing the means to continue to create and share often requires some amount of income. Max Temkin of Cards Against Humanity says it best in their case study: “We don’t make jokes and games to make money—we make money so we can make more jokes and games.” Creative Commons’ focus is on building a vibrant, usable commons, powered by collab-oration and gratitude. Enabling communities of collaboration is at the heart of our strategy. With that in mind, Creative Commons began this book project. Led by Paul and Sarah, the project set out to define and advance the best open business models. Paul and Sarah were the ideal authors to write Made with Creative Commons. Paul dreams of a future where new mod-els of creativity and innovation overpower the inequality and scarcity that today define the worst parts of capitalism. He is driven by the power of human connections between com-munities of creators. He takes a longer view than most, and it’s made him a better educa-tor, an insightful researcher, and also a skilled gardener. He has a calm, cool voice that con-veys a passion that inspires his colleagues and community.Sarah is the best kind of lawyer—a true advocate who believes in the good of people, and the power of collective acts to change the world. Over the past year I’ve seen Sarah struggle with the heartbreak that comes from investing so much into a political campaign that didn’t end as she’d hoped. Today, she’s more determined than ever to live with her values right out on her sleeve. I can always count on Sarah to push Creative Commons to focus on our impact—to make the main thing the main thing. She’s practical, detail-oriented, and clever. There’s no one on my team that I enjoy debating more. xiiMade With Creative CommonsAs coauthors, Paul and Sarah complement each other perfectly. They researched, ana-lyzed, argued, and worked as a team, some-times together and sometimes independently. They dove into the research and writing with passion and curiosity, and a deep respect for what goes into building the commons and sharing with the world. They remained open to new ideas, including the possibility that their initial theories would need refinement or might be completely wrong. That’s coura-geous, and it has made for a better book that is insightful, honest, and useful. From the beginning, CC wanted to develop this project with the principles and values of open collaboration. The book was funded, de-veloped, researched, and written in the open. It is being shared openly under a CC BY-SA li-cense for anyone to use, remix, or adapt with attribution. It is, in itself, an example of an open business model.For 31 days in August of 2015, Sarah took point to organize and execute a Kickstarter campaign to generate the core funding for the book. The remainder was provided by CC’s generous donors and supporters. In the end, it became one of the most successful book projects on Kickstarter, smashing through two stretch goals and engaging over 1,600 do-nors—the majority of them new supporters of  Creative Commons. Paul and Sarah worked openly throughout the project, publishing the plans, drafts, case studies, and analysis, early and often, and they engaged communities all over the world to help write this book. As their opinions di-verged and their interests came into focus, they divided their voices and decided to keep them separate in the final product. Working in this way requires both humility and self-confi-dence, and without question it has made Made with Creative Commons a better project.Those who work and share in the com-mons are not typical creators. They are part of something greater than themselves, and what they offer us all is a profound gift. What they receive in return is gratitude and a community. Jonathan Mann, who is profiled in this book, writes a song a day. When I reached out to ask him to write a song for our Kickstarter (and to offer himself up as a Kickstarter benefit), he agreed immediately. Why would he agree to do that? Because the commons has collabora-tion at its core, and community as a key value, and because the CC licenses have helped so many to share in the ways that they choose with a global audience. Sarah writes, “Endeavors that are Made with Creative Commons thrive when com-munity is built around what they do. This may mean a community collaborating together to create something new, or it may simply be a collection of like-minded people who get to know each other and rally around common in-terests or beliefs. To a certain extent, simply being Made with Creative Commons auto-matically brings with it some element of com-munity, by helping connect you to like-minded others who recognize and are drawn to the val-ues symbolized by using CC.” Amanda Palmer, the other musician profiled in the book, would surely add this from her case study: “There is no more satisfying end goal than having some-one tell you that what you do is genuinely of value to them.”This is not a typical business book. For those looking for a recipe or a roadmap, you might be disappointed. But for those looking to pur-sue a social end, to build something great through collaboration, or to join a powerful and growing global community, they’re sure to be satisfied. Made with Creative Commons of-fers a world-changing set of clearly articulated values and principles, some essential tools for exploring your own business opportunities, and two dozen doses of pure inspiration.In a 1996 Stanford Law Review article “The Zones of Cyberspace”, CC founder Lawrence Les-sig wrote, “Cyberspace is a place. People live there. They experience all the sorts of things that they experience in real space, there. For xiiiMade With Creative Commonssome, they experience more. They experience this not as isolated individuals, playing some high tech computer game; they experience it in groups, in communities, among strangers, among people they come to know, and some-times like.”I’m incredibly proud that Creative Com-mons is able to publish this book for the many communities that we have come to know and like. I’m grateful to Paul and Sarah for their cre-ativity and insights, and to the global commu-nities that have helped us bring it to you. As CC board member Johnathan Nightingale often says, “It’s all made of people.” That’s the true value of things that are Made with Creative Commons Ryan MerkleyCEO, Creative Commons',5,2,'IIwPgldn','2018-07-12 13:20:55','2018-11-15 08:31:55',1,2,NULL,NULL,NULL,NULL,NULL),(2,'Video Test','Testing video source with a Richard Feynman video.',1,NULL,'https://www.youtube.com/watch?v=b9F8Wn4vf5Y','b9F8Wn4vf5Y','VIDEO','',NULL,1,'OLyJwDwE','2018-09-07 17:42:56','2019-04-03 08:54:16',1,3,NULL,NULL,NULL,NULL,'youtube'),(3,'Image Test','',1,NULL,NULL,NULL,'IMG','',6,1,'GeKlJqM4','2018-09-07 17:57:06','2018-09-07 18:04:17',1,3,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `sources_main_source` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sources_main_source_stories`
--

DROP TABLE IF EXISTS `sources_main_source_stories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sources_main_source_stories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `source_id` int(11) NOT NULL,
  `story_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sources_main_source_stories_source_id_story_id_314d06e8_uniq` (`source_id`,`story_id`),
  KEY `sources_main_source__story_id_a0d72e59_fk_organisat` (`story_id`),
  CONSTRAINT `sources_main_source__source_id_22270879_fk_sources_m` FOREIGN KEY (`source_id`) REFERENCES `sources_main_source` (`id`),
  CONSTRAINT `sources_main_source__story_id_a0d72e59_fk_organisat` FOREIGN KEY (`story_id`) REFERENCES `organisation_story` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sources_main_source_stories`
--

LOCK TABLES `sources_main_source_stories` WRITE;
/*!40000 ALTER TABLE `sources_main_source_stories` DISABLE KEYS */;
/*!40000 ALTER TABLE `sources_main_source_stories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sources_main_source_tags`
--

DROP TABLE IF EXISTS `sources_main_source_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sources_main_source_tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `source_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sources_main_source_tags_source_id_tag_id_c1b67477_uniq` (`source_id`,`tag_id`),
  KEY `sources_main_source_tags_tag_id_3cbe2bea_fk_organisation_tag_id` (`tag_id`),
  CONSTRAINT `sources_main_source__source_id_dee04afd_fk_sources_m` FOREIGN KEY (`source_id`) REFERENCES `sources_main_source` (`id`),
  CONSTRAINT `sources_main_source_tags_tag_id_3cbe2bea_fk_organisation_tag_id` FOREIGN KEY (`tag_id`) REFERENCES `organisation_tag` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sources_main_source_tags`
--

LOCK TABLES `sources_main_source_tags` WRITE;
/*!40000 ALTER TABLE `sources_main_source_tags` DISABLE KEYS */;
INSERT INTO `sources_main_source_tags` VALUES (1,1,1),(2,2,1),(3,3,2);
/*!40000 ALTER TABLE `sources_main_source_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stats_sourcehit`
--

DROP TABLE IF EXISTS `stats_sourcehit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stats_sourcehit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `source_id` int(11) NOT NULL,
  `referer` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remoteHost` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `requestTime` datetime NOT NULL,
  `userAgent` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `eventType` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `stats_sourcehit_source_id_5afe9c14_fk_sources_main_source_id` (`source_id`),
  CONSTRAINT `stats_sourcehit_source_id_5afe9c14_fk_sources_main_source_id` FOREIGN KEY (`source_id`) REFERENCES `sources_main_source` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stats_sourcehit`
--

LOCK TABLES `stats_sourcehit` WRITE;
/*!40000 ALTER TABLE `stats_sourcehit` DISABLE KEYS */;
INSERT INTO `stats_sourcehit` VALUES (1,1,'http://localhost:8080/','172.18.0.7','2018-09-07 18:04:37','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/68.0.3440.106 Chrome/68.0.3440.106 Safari/537.36',''),(2,2,'http://localhost:8080/','172.18.0.7','2018-09-07 18:04:37','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/68.0.3440.106 Chrome/68.0.3440.106 Safari/537.36',''),(3,3,'http://localhost:8080/','172.18.0.7','2018-09-07 18:04:37','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/68.0.3440.106 Chrome/68.0.3440.106 Safari/537.36',''),(4,1,'http://localhost:8083/s/IIwPgldn','172.20.0.7','2018-11-02 12:29:42','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/69.0.3497.81 Chrome/69.0.3497.81 Safari/537.36','load'),(5,1,'http://localhost:8083/s/IIwPgldn','172.20.0.7','2018-11-02 12:29:45','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/69.0.3497.81 Chrome/69.0.3497.81 Safari/537.36','activity'),(6,3,'http://localhost:4202/GeKlJqM4','172.20.0.7','2018-11-12 09:54:12','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/70.0.3538.77 Chrome/70.0.3538.77 Safari/537.36','load'),(7,2,'http://localhost:4202/OLyJwDwE','172.20.0.7','2018-11-12 09:54:21','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/70.0.3538.77 Chrome/70.0.3538.77 Safari/537.36','load'),(8,2,'http://localhost:4202/OLyJwDwE','172.20.0.7','2018-11-12 09:54:30','Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:63.0) Gecko/20100101 Firefox/63.0','load'),(9,2,'http://localhost:4202/OLyJwDwE','172.20.0.7','2018-11-12 09:54:32','Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:63.0) Gecko/20100101 Firefox/63.0','activity'),(10,1,'http://localhost:4202/IIwPgldn','172.20.0.7','2018-11-12 09:54:47','Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:63.0) Gecko/20100101 Firefox/63.0','load'),(11,1,'http://localhost:4202/IIwPgldn','172.20.0.7','2018-11-12 09:54:55','Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:63.0) Gecko/20100101 Firefox/63.0','activity');
/*!40000 ALTER TABLE `stats_sourcehit` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-04-03  8:54:19
