/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE DATABASE IF NOT EXISTS `scne_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `scne_db`;

CREATE TABLE IF NOT EXISTS `applications` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `student_id` bigint unsigned NOT NULL,
  `vaccine_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `dose_number` int DEFAULT NULL,
  `application_date` date NOT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `applications_student_id_foreign` (`student_id`),
  KEY `applications_vaccine_id_foreign` (`vaccine_id`),
  KEY `applications_user_id_foreign` (`user_id`),
  CONSTRAINT `applications_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE,
  CONSTRAINT `applications_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `applications_vaccine_id_foreign` FOREIGN KEY (`vaccine_id`) REFERENCES `vaccines` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE IF NOT EXISTS `medical_records` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `student_id` bigint unsigned NOT NULL,
  `bucal` tinyint(1) DEFAULT '0',
  `caries` tinyint(1) DEFAULT '0',
  `dif_visual` tinyint(1) DEFAULT '0',
  `vacunado` tinyint(1) DEFAULT '0',
  `dosis` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `desparasitado` tinyint(1) DEFAULT '0',
  `observaciones` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `medical_records_student_id_foreign` (`student_id`),
  CONSTRAINT `medical_records_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `medical_records` (`id`, `student_id`, `bucal`, `caries`, `dif_visual`, `vacunado`, `dosis`, `desparasitado`, `observaciones`, `created_at`, `updated_at`) VALUES
	(1, 11, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-11-14 22:57:45', '2025-11-14 22:57:45'),
	(2, 12, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-11-14 23:01:01', '2025-11-14 23:01:01'),
	(3, 13, 1, 1, 1, 1, '12', 0, NULL, '2025-11-14 23:08:45', '2025-11-14 23:08:45'),
	(4, 14, 1, 1, 1, 1, '12', 1, NULL, '2025-11-14 23:20:58', '2025-11-14 23:20:58');

CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
	(1, '2014_10_12_000000_create_users_table', 1),
	(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
	(3, '2019_08_19_000000_create_failed_jobs_table', 1),
	(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
	(5, '2025_10_17_225646_add_role_to_users_table', 1),
	(6, '2025_10_18_164739_create_refresh_tokens_table', 1),
	(7, '2025_10_30_162537_create_schools_table', 1),
	(8, '2025_10_30_162615_create_sections_table', 1),
	(9, '2025_10_30_162626_create_students_table', 1),
	(10, '2025_10_30_162631_create_medical_records_table', 1),
	(11, '2025_10_30_162636_create_representatives_table', 1),
	(12, '2025_10_31_185453_create_vaccines_table', 1),
	(13, '2025_10_31_185454_create_applications_table', 1),
	(14, '2025_11_04_133343_update_students_table_remove_section_id_add_section_name', 2);

CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE IF NOT EXISTS `refresh_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `revoked` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `refresh_tokens_token_unique` (`token`),
  KEY `refresh_tokens_user_id_foreign` (`user_id`),
  CONSTRAINT `refresh_tokens_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `refresh_tokens` (`id`, `user_id`, `token`, `revoked`, `created_at`, `updated_at`) VALUES
	(75, 4, '$2y$12$F70bydb3BD2BYxRooD38P.Y3f0DL.HQzP.owvHgOuJfVmp/mOdXVy', 0, '2025-11-15 05:45:45', '2025-11-15 05:45:45'),
	(76, 3, '$2y$12$YrDqoa4mkLDw8B.yx8BoYeAhSSNGwicbMODrBTCuIszFs/Xwls0HC', 0, '2025-11-15 05:45:51', '2025-11-15 05:45:51');

CREATE TABLE IF NOT EXISTS `representatives` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `student_id` bigint unsigned NOT NULL,
  `nombre` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cedula` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telefono` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `direccion` text COLLATE utf8mb4_unicode_ci,
  `parentesco` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `representatives_student_id_foreign` (`student_id`),
  CONSTRAINT `representatives_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `representatives` (`id`, `student_id`, `nombre`, `cedula`, `telefono`, `direccion`, `parentesco`, `created_at`, `updated_at`) VALUES
	(1, 1, 'Guillermina del toro', '8554555', '32152631651', 'cvcxvcxvcvcvcxvcvcx', NULL, '2025-11-04 18:13:18', '2025-11-04 18:13:18'),
	(2, 2, 'Maria Clara', '20055698', '32152631651', 'Av las flores', 'Mama', '2025-11-14 22:24:04', '2025-11-14 22:24:04'),
	(3, 3, 'Maria Clara', '20055698', '32152631651', 'Av las flores', 'Mama', '2025-11-14 22:27:22', '2025-11-14 22:27:22'),
	(4, 4, 'Maria Clara', '20055698', '32152631651', 'Av las flores', 'Mama', '2025-11-14 22:29:28', '2025-11-14 22:29:28'),
	(5, 5, 'Maria Clara', '20055698', '32152631651', 'Av las flores', 'Mama', '2025-11-14 22:29:43', '2025-11-14 22:29:43'),
	(6, 6, 'Maria Clara', '20055698', '32152631651', 'En Ciudad bolivar Venezuela', 'Mama', '2025-11-14 22:38:28', '2025-11-14 22:38:28'),
	(8, 8, 'Maria Clara', '20055698', '32152631651', 'sdfvsdfsdfsdfsd', 'Mama', '2025-11-14 22:49:44', '2025-11-14 22:49:44'),
	(9, 9, 'Maria Clara', '20055698', '32152631651', 'sadfasdasdasdasdasd', 'Mama', '2025-11-14 22:51:27', '2025-11-14 22:51:27'),
	(10, 10, 'Maria Clara', '20055698', '32152631651', 'sadfasdasdasdasdasd', 'Mama', '2025-11-14 22:52:02', '2025-11-14 22:52:02'),
	(11, 11, 'Maria Clara', '20055698', '32152631651', 'sadfasdasdasdasdasd', 'Mama', '2025-11-14 22:57:45', '2025-11-14 22:57:45'),
	(12, 12, 'Maria Clara', '20055698', '32152631651', 'casdasddasdasd', 'Mama', '2025-11-14 23:01:01', '2025-11-14 23:01:01'),
	(13, 13, 'Maria Clara', '20055698', '32152631651', 'dfadfasdsadsdsad', 'Mama', '2025-11-14 23:08:45', '2025-11-14 23:08:45'),
	(14, 14, 'Zulay', '32454324', '32152631651', 'Av. San Jonote', 'Tia', '2025-11-14 23:20:58', '2025-11-14 23:20:58');

CREATE TABLE IF NOT EXISTS `schools` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `municipio` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `parroquia` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `schools` (`id`, `name`, `code`, `municipio`, `parroquia`, `created_at`, `updated_at`) VALUES
	(1, 'Unidad Educativa Juan XXIII', 'UEJ23', 'Herés', 'Vista Hermosa', '2025-11-01 21:06:51', '2025-11-01 21:06:51'),
	(6, 'Liceo Penalver', '566825', 'Angostura del Orinoco', 'Vista hermosa', '2025-11-01 23:47:41', '2025-11-01 23:47:41'),
	(9, 'El cambao', '89546', 'Angostura del Orinoco', 'Catedral', '2025-11-03 19:21:55', '2025-11-03 19:21:55'),
	(10, 'Unidad Educativa Colegio Cristo Rey', '567852', 'Angostura del Orinoco', 'Catedral', '2025-11-03 23:08:51', '2025-11-03 23:08:51'),
	(11, 'Natural Ciudad', '256546', 'Angostura del Orinoco', 'Catedral', '2025-11-03 23:11:34', '2025-11-03 23:11:34'),
	(12, 'Las colosas', '324234', 'Heres', 'Vista Hermosa', '2025-11-04 00:39:01', '2025-11-04 00:39:01');

CREATE TABLE IF NOT EXISTS `sections` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `school_id` bigint unsigned NOT NULL,
  `grade` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `letter` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `matricula_v` int NOT NULL DEFAULT '0',
  `matricula_h` int NOT NULL DEFAULT '0',
  `matricula_total` int NOT NULL DEFAULT '0',
  `docente_name` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sections_school_id_foreign` (`school_id`),
  CONSTRAINT `sections_school_id_foreign` FOREIGN KEY (`school_id`) REFERENCES `schools` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE IF NOT EXISTS `students` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `school_id` bigint unsigned NOT NULL,
  `section_name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sexo` enum('M','F') COLLATE utf8mb4_unicode_ci NOT NULL,
  `edad` int NOT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `peso` decimal(5,2) DEFAULT NULL,
  `talla` decimal(5,2) DEFAULT NULL,
  `circunferencia_braquial` decimal(5,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `students_school_id_foreign` (`school_id`),
  CONSTRAINT `students_school_id_foreign` FOREIGN KEY (`school_id`) REFERENCES `schools` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `students` (`id`, `school_id`, `section_name`, `name`, `sexo`, `edad`, `fecha_nacimiento`, `peso`, `talla`, `circunferencia_braquial`, `created_at`, `updated_at`) VALUES
	(1, 1, 'A', 'Guillermo Castillo', 'M', 13, '2025-11-01', 30.00, 12.00, 3.00, '2025-11-04 18:13:18', '2025-11-04 18:13:18'),
	(2, 1, 'B', 'Julio Cesar Marichales', 'M', 14, '2007-01-18', 55.00, 183.00, 12.00, '2025-11-14 22:24:04', '2025-11-14 22:24:04'),
	(3, 1, 'B', 'Julio Cesar Marichales', 'M', 14, '2007-01-18', 55.00, 183.00, 12.00, '2025-11-14 22:27:22', '2025-11-14 22:27:22'),
	(4, 1, 'B', 'Julio Cesar Marichales', 'M', 14, '2007-01-18', 55.00, 183.00, 12.00, '2025-11-14 22:29:28', '2025-11-14 22:29:28'),
	(5, 1, 'B', 'Julio Cesar Marichales', 'M', 14, '2007-01-18', 55.00, 183.00, 12.00, '2025-11-14 22:29:43', '2025-11-14 22:29:43'),
	(6, 6, 'C', 'Rodrigo Gonzales', 'M', 12, '2017-02-14', 25.00, 12.00, 11.00, '2025-11-14 22:38:28', '2025-11-14 22:38:28'),
	(8, 10, 'B', 'Cesar Tomedes', 'M', 12, '2017-02-14', 25.00, 12.00, 11.00, '2025-11-14 22:49:44', '2025-11-14 22:49:44'),
	(9, 1, 'B', 'Rogrido', 'M', 12, '2017-02-14', 25.00, 12.00, 11.00, '2025-11-14 22:51:27', '2025-11-14 22:51:27'),
	(10, 1, 'B', 'Rogrido', 'M', 12, '2017-02-14', 25.00, 12.00, 11.00, '2025-11-14 22:52:02', '2025-11-14 22:52:02'),
	(11, 1, 'B', 'Rogrido', 'M', 12, '2017-02-14', 25.00, 12.00, 11.00, '2025-11-14 22:57:45', '2025-11-14 22:57:45'),
	(12, 11, 'A', 'Ezequiel Benijes', 'M', 23, '2025-11-05', 25.00, 12.00, 11.00, '2025-11-14 23:01:01', '2025-11-14 23:01:01'),
	(13, 6, 'A', 'Ezequiel Ramirez', 'M', 23, '2025-11-05', 25.00, 12.00, 11.00, '2025-11-14 23:08:44', '2025-11-14 23:08:44'),
	(14, 1, 'B', 'Naldo Vidal', 'M', 12, '2025-11-01', 12.00, 30.00, 3.00, '2025-11-14 23:20:58', '2025-11-14 23:20:58');

CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'profesor',
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `role`) VALUES
	(3, 'Ezequiel', 'ezequiel@scne.test', NULL, '$2y$12$ssqB5Z8XUdcWNvXvK7PcT.X1w5BCaVGbNSmgKMoR5OwRrMp3cd87S', NULL, '2025-11-15 05:17:18', '2025-11-15 05:17:18', 'superadmin'),
	(4, 'Braco Deste', 'braco@scne.test', NULL, '$2y$12$Qf9k7Pmloythlp3rIwWpjObc6oG8bnWgzhxCDfNALYnXWQJ8TtXVO', NULL, '2025-11-15 05:38:17', '2025-11-15 05:46:45', 'admin');

CREATE TABLE IF NOT EXISTS `vaccines` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `manufacturer` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `doses_required` int NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
