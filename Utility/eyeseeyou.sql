-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 18, 2024 at 05:33 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `eyeseeyou`
--

DROP DATABASE IF EXISTS `eyeseeyou`;

CREATE DATABASE IF NOT EXISTS `eyeseeyou` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `eyeseeyou`;

-- --------------------------------------------------------

--
-- Table structure for table `alerts`
--

CREATE TABLE alerts (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `start_timestamp` varchar(50) DEFAULT NULL,
  `end_timestamp` varchar(50) DEFAULT NULL,
  `pkt_num` bigint(20) DEFAULT NULL,
  `protocol` varchar(30) DEFAULT NULL,
  `pkt_gen` varchar(30) DEFAULT NULL,
  `pkt_len` int(11) DEFAULT NULL,
  `direction` varchar(10) DEFAULT NULL,
  `src_addr` varchar(50) DEFAULT NULL,
  `src_port` int(11) DEFAULT NULL,
  `dst_addr` varchar(50) DEFAULT NULL,
  `dst_port` int(11) DEFAULT NULL,
  `service` varchar(50) DEFAULT NULL,
  `rule` varchar(30) DEFAULT NULL,
  `priority` int(11) DEFAULT NULL,
  `class` varchar(100) DEFAULT NULL,
  `action` varchar(20) DEFAULT NULL,
  `b64_data` text DEFAULT NULL,
  `status` enum('Resolved','Open','In Progress','False Positive') NOT NULL DEFAULT 'Open',
  `count` int(10) DEFAULT NULL,
  `geoip_src` text DEFAULT NULL,
  `geoip_dst` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX idx_class (`class`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------


--
-- Dumping data for table `alerts`
--

INSERT INTO `alerts` (`id`, `start_timestamp`, `end_timestamp`, `pkt_num`, `protocol`, `pkt_gen`, `pkt_len`, `direction`, `src_addr`, `src_port`, `dst_addr`, `dst_port`, `service`, `rule`, `priority`, `class`, `action`, `b64_data`, `status`, `count`, `geoip_src`, `geoip_dst`) VALUES
(1, '2024-11-14 14:43:23', '2024-11-14 14:43:23', 1, 'ICMP', 'raw', 84, 'C2S', '10.0.2.4', NULL, '10.0.2.7', NULL, 'unknown', '1:366:11', 3, 'Misc activity', 'allow', 'WNklZwAAAACOPgEAAAAAABAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc=', 'Open', 3, '{}', '{}'),
(2, '2024-11-14 14:43:23', '2024-11-14 14:43:23', 3, 'ICMP', 'raw', 84, 'C2S', '10.0.2.4', NULL, '10.0.2.7', NULL, 'unknown', '1:29456:3', 2, 'Information Leak', 'allow', 'WdklZwAAAACLRwEAAAAAABAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc=', 'Open', 1, '{}', '{}'),
(3, '2024-11-14 14:43:23', '2024-11-14 14:43:23', 4, 'ICMP', 'raw', 84, 'S2C', '10.0.2.7', NULL, '10.0.2.4', NULL, 'unknown', '1:408:8', 3, 'Misc activity', 'allow', 'WdklZwAAAACLRwEAAAAAABAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc=', 'Open', 2, '{}', '{}'),
(4, '2024-11-14 14:43:23', '2024-11-14 14:43:23', 1, 'ICMP', 'raw', 84, 'C2S', '10.0.2.4', NULL, '10.0.2.7', NULL, 'unknown', '1:29456:3', 2, 'Information Leak', 'allow', 'WNklZwAAAACOPgEAAAAAABAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc=', 'Open', 1, '{}', '{}'),
(5, '2024-11-14 14:43:23', '2024-11-14 14:43:23', 30, 'ICMP', 'raw', 84, 'C2S', '10.0.2.4', NULL, '10.0.2.7', NULL, 'unknown', '1:384:8', 3, 'Misc activity', 'allow', 'WtklZwAAAAARUAEAAAAAABAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc=', 'Open', 10, '{}', '{}'),
(6, '2024-11-14 14:43:23', '2024-11-14 14:43:23', 5, 'ICMP', 'raw', 84, 'C2S', '10.0.2.4', NULL, '10.0.2.7', NULL, 'unknown', '1:29456:3', 2, 'Information Leak', 'allow', 'WtklZwAAAAARUAEAAAAAABAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc=', 'Open', 1, '{}', '{}'),
(7, '2024-11-14 14:43:23', '2024-11-14 14:43:23', 34, 'ICMP', 'raw', 84, 'C2S', '10.0.2.4', NULL, '10.0.2.7', NULL, 'unknown', '1:384:8', 3, 'Misc activity', 'allow', 'XNklZwAAAAD1eAEAAAAAABAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc=', 'Open', 7, '{}', '{}'),
(8, '2024-11-14 14:43:23', '2024-11-14 14:43:23', 7, 'ICMP', 'raw', 84, 'C2S', '10.0.2.4', NULL, '10.0.2.7', NULL, 'unknown', '1:29456:3', 2, 'Information Leak', 'allow', 'W9klZwAAAAAsWQEAAAAAABAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc=', 'Open', 1, '{}', '{}'),
(9, '2024-11-14 14:43:23', '2024-11-14 14:43:23', 70, 'ICMP', 'raw', 84, 'C2S', '10.0.2.4', NULL, '10.0.2.7', NULL, 'unknown', '1:384:8', 3, 'Misc activity', 'allow', 'WdklZwAAAACLRwEAAAAAABAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc=', 'Open', 6, '{}', '{}'),
(10, '2024-11-14 14:43:23', '2024-11-14 14:43:23', 9, 'ICMP', 'raw', 84, 'C2S', '10.0.2.4', NULL, '10.0.2.7', NULL, 'unknown', '1:29456:3', 2, 'Information Leak', 'allow', 'XNklZwAAAAD1eAEAAAAAABAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc=', 'Open', 1, '{}', '{}'),
(11, '2024-11-14 14:43:23', '2024-11-14 14:43:23', 10, 'ICMP', 'raw', 84, 'S2C', '10.0.2.7', NULL, '10.0.2.4', NULL, 'unknown', '1:408:8', 3, 'Misc activity', 'allow', 'XNklZwAAAAD1eAEAAAAAABAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc=', 'Open', 3, '{}', '{}'),
(12, '2024-11-14 14:43:23', '2024-11-14 14:43:23', 26, 'ICMP', 'raw', 84, 'C2S', '10.0.2.4', NULL, '10.0.2.7', NULL, 'unknown', '1:29456:3', 2, 'Information Leak', 'allow', 'WNklZwAAAACOPgEAAAAAABAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc=', 'Open', 1, '{}', '{}'),
(13, '2024-11-14 14:43:23', '2024-11-14 14:43:23', 27, 'ICMP', 'raw', 84, 'S2C', '10.0.2.7', NULL, '10.0.2.4', NULL, 'unknown', '1:408:8', 3, 'Misc activity', 'allow', 'WNklZwAAAACOPgEAAAAAABAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc=', 'Open', 1, '{}', '{}'),
(14, '2024-11-14 14:43:23', '2024-11-14 14:43:23', 28, 'ICMP', 'raw', 84, 'C2S', '10.0.2.4', NULL, '10.0.2.7', NULL, 'unknown', '1:29456:3', 2, 'Information Leak', 'allow', 'WdklZwAAAACLRwEAAAAAABAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc=', 'Open', 1, '{}', '{}'),
(15, '2024-11-14 14:43:23', '2024-11-14 14:43:23', 29, 'ICMP', 'raw', 84, 'S2C', '10.0.2.7', NULL, '10.0.2.4', NULL, 'unknown', '1:408:8', 3, 'Misc activity', 'allow', 'WdklZwAAAACLRwEAAAAAABAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc=', 'Open', 1, '{}', '{}'),
(16, '2024-11-14 14:43:23', '2024-11-14 14:43:23', 30, 'ICMP', 'raw', 84, 'C2S', '10.0.2.4', NULL, '10.0.2.7', NULL, 'unknown', '1:29456:3', 2, 'Information Leak', 'allow', 'WtklZwAAAAARUAEAAAAAABAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc=', 'Open', 1, '{}', '{}'),
(17, '2024-11-14 14:43:23', '2024-11-14 14:43:23', 31, 'ICMP', 'raw', 84, 'S2C', '10.0.2.7', NULL, '10.0.2.4', NULL, 'unknown', '1:408:8', 3, 'Misc activity', 'allow', 'WtklZwAAAAARUAEAAAAAABAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc=', 'Open', 1, '{}', '{}'),
(18, '2024-11-14 14:43:23', '2024-11-14 14:43:23', 32, 'ICMP', 'raw', 84, 'C2S', '10.0.2.4', NULL, '10.0.2.7', NULL, 'unknown', '1:29456:3', 2, 'Information Leak', 'allow', 'W9klZwAAAAAsWQEAAAAAABAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc=', 'Open', 1, '{}', '{}'),
(19, '2024-11-14 14:43:24', '2024-11-14 14:43:24', 33, 'ICMP', 'raw', 84, 'S2C', '10.0.2.7', NULL, '10.0.2.4', NULL, 'unknown', '1:408:8', 3, 'Misc activity', 'allow', 'W9klZwAAAAAsWQEAAAAAABAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc=', 'Open', 1, '{}', '{}'),
(20, '2024-11-14 14:43:24', '2024-11-14 14:43:24', 34, 'ICMP', 'raw', 84, 'C2S', '10.0.2.4', NULL, '10.0.2.7', NULL, 'unknown', '1:29456:3', 2, 'Information Leak', 'allow', 'XNklZwAAAAD1eAEAAAAAABAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc=', 'Open', 1, '{}', '{}'),
(21, '2024-11-14 14:43:24', '2024-11-14 14:43:24', 35, 'ICMP', 'raw', 84, 'S2C', '10.0.2.7', NULL, '10.0.2.4', NULL, 'unknown', '1:408:8', 3, 'Misc activity', 'allow', 'XNklZwAAAAD1eAEAAAAAABAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc=', 'Open', 1, '{}', '{}'),
(22, '2024-11-14 14:43:24', '2024-11-14 14:43:24', 44, 'ICMP', 'raw', 84, 'C2S', '10.0.2.4', NULL, '10.0.2.7', NULL, 'unknown', '1:29456:3', 2, 'Information Leak', 'allow', 'WNklZwAAAACOPgEAAAAAABAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc=', 'Open', 1, '{}', '{}'),
(23, '2024-11-14 14:43:24', '2024-11-14 14:43:24', 45, 'ICMP', 'raw', 84, 'S2C', '10.0.2.7', NULL, '10.0.2.4', NULL, 'unknown', '1:408:8', 3, 'Misc activity', 'allow', 'WNklZwAAAACOPgEAAAAAABAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc=', 'Open', 1, '{}', '{}'),
(24, '2024-11-14 14:43:24', '2024-11-14 14:43:24', 70, 'ICMP', 'raw', 84, 'C2S', '10.0.2.4', NULL, '10.0.2.7', NULL, 'unknown', '1:29456:3', 2, 'Information Leak', 'allow', 'WdklZwAAAACLRwEAAAAAABAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc=', 'Open', 1, '{}', '{}'),
(25, '2024-11-14 14:43:24', '2024-11-14 14:43:24', 71, 'ICMP', 'raw', 84, 'S2C', '10.0.2.7', NULL, '10.0.2.4', NULL, 'unknown', '1:408:8', 3, 'Misc activity', 'allow', 'WdklZwAAAACLRwEAAAAAABAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc=', 'Open', 1, '{}', '{}'),
(26, '2024-11-14 14:43:24', '2024-11-14 14:43:24', 118, 'ICMP', 'raw', 84, 'C2S', '10.0.2.4', NULL, '10.0.2.7', NULL, 'unknown', '1:29456:3', 2, 'Information Leak', 'allow', 'WtklZwAAAAARUAEAAAAAABAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc=', 'Open', 1, '{}', '{}'),
(27, '2024-11-14 14:43:24', '2024-11-14 14:43:24', 158, 'ICMP', 'raw', 84, 'C2S', '10.0.2.4', NULL, '10.0.2.7', NULL, 'unknown', '1:366:11', 3, 'Misc activity', 'allow', 'W9klZwAAAAAsWQEAAAAAABAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc=', 'Open', 2, '{}', '{}'),
(28, '2024-11-14 14:43:24', '2024-11-14 14:43:24', 158, 'ICMP', 'raw', 84, 'C2S', '10.0.2.4', NULL, '10.0.2.7', NULL, 'unknown', '1:29456:3', 2, 'Information Leak', 'allow', 'W9klZwAAAAAsWQEAAAAAABAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc=', 'Open', 1, '{}', '{}'),
(29, '2024-11-14 14:43:24', '2024-11-14 14:43:24', 227, 'ICMP', 'raw', 84, 'C2S', '10.0.2.4', NULL, '10.0.2.7', NULL, 'unknown', '1:366:11', 3, 'Misc activity', 'allow', 'XNklZwAAAAD1eAEAAAAAABAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc=', 'Open', 3, '{}', '{}'),
(30, '2024-11-14 14:43:24', '2024-11-14 14:43:24', 227, 'ICMP', 'raw', 84, 'C2S', '10.0.2.4', NULL, '10.0.2.7', NULL, 'unknown', '1:29456:3', 2, 'Information Leak', 'allow', 'XNklZwAAAAD1eAEAAAAAABAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc=', 'Open', 1, '{}', '{}'),
(31, '2024-11-14 14:43:24', '2024-11-14 14:43:24', 228, 'ICMP', 'raw', 84, 'S2C', '10.0.2.7', NULL, '10.0.2.4', NULL, 'unknown', '1:408:8', 3, 'Misc activity', 'allow', 'XNklZwAAAAD1eAEAAAAAABAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc=', 'Open', 2, '{}', '{}'),
(32, '2024-11-14 14:43:56', '2024-11-14 14:44:49', 4461, 'TCP', 'raw', 44, 'C2S', '39.109.197.40', 36051, '64.13.134.52', 161, 'unknown', '1:1418:19', 2, 'Attempted Information Leak', 'allow', NULL, 'Open', 8, '{\"country_code2\":\"SG\",\"location\":{\"lon\":103.8658,\"lat\":1.3856},\"city_name\":\"Singapore\",\"timezone\":\"Asia/Singapore\",\"country_name\":\"Singapore\",\"longitude\":103.8658,\"latitude\":1.3856,\"continent_code\":\"AS\",\"ip\":\"39.109.197.40\",\"postal_code\":\"80\",\"country_code3\":\"SG\"}', '{\"longitude\":-97.822,\"country_code2\":\"US\",\"latitude\":37.751,\"continent_code\":\"NA\",\"location\":{\"lon\":-97.822,\"lat\":37.751},\"ip\":\"64.13.134.52\",\"timezone\":\"America/Chicago\",\"country_name\":\"United States\",\"country_code3\":\"US\"}');

--
-- Table structure for table `user`
--

CREATE TABLE user (
  user_id int(11) NOT NULL,
  full_name varchar(100) NOT NULL,
  username varchar(30) NOT NULL,
  password varchar(255) NOT NULL,
  otp varchar(255) DEFAULT NULL,
  phone varchar(20) NOT NULL,
  email varchar(50) NOT NULL,
  organisation_name varchar(100) NOT NULL,
  profile_id int(11) NOT NULL,
  plan_id int(11) NOT NULL,
  active tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



--
-- Dumping data for table `user`
--

INSERT INTO user (user_id, full_name, username, password, otp, phone, email, organisation_name, profile_id, plan_id, active) VALUES
(1, 'Frankie Lee', 'flee', '$2b$12$d.vVdacMBWoOGYt3hhP5ve6sPlyQvDg4Q6y6FWEyOZ8Zba.IZ7KpS', NULL, '98431863', 'wxflee001@gmail.com', 'Yishun Men', 1, 2, 1),
(2, 'Keith Min Khant Thu', 'mkt', '$2b$12$FtLxoZ4N1fYrWq2uSojTueByM7rbjWrqm4g8OzUZ1lWMfCLs5U1i2', NULL, '96864135', 'minkhantthu213@gmail.com', 'Burmese Monk', 1, 2, 1),
(3, 'Roydenn', 'roy', '$2b$12$FtLxoZ4N1fYrWq2uSojTueByM7rbjWrqm4g8OzUZ1lWMfCLs5U1i2', NULL, '12300023', 'roydennchai@gmail.com', 'Sumo Temple', 2, 2, 1),
(4, 'Jeslyn Wangsa', 'jeslyn', '$2b$12$vzRro9BBYxFBA5g4w2QQx.yRnZs2ozXA0rDv5bG8XZt123tuKz7Ea', NULL, '82123642', 'wangsajeslyn@gmail.com', 'SIM simps', 1, 1, 1),
(5, 'Ervina', 'ervina', '$2b$12$s8JBCotREd1RSMwetiZFAOUwNJtjPotfqf53vSrlthoAQKg.aObVS', NULL, '81105273', 'ervinawijaya04@gmail.com', 'SIM simps', 2, 2, 1),
(6, 'NA Admin', 'naadmin', '$2b$12$FtLxoZ4N1fYrWq2uSojTueByM7rbjWrqm4g8OzUZ1lWMfCLs5U1i2', NULL, '12345', 'kool.boi99@hotmail.com', 'Admin', 1, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_profile`
--

CREATE TABLE `user_profile` (
  `profile_id` int(11) NOT NULL,
  `profile_name` varchar(50) NOT NULL,
  PRIMARY KEY (`profile_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_profile`
--

INSERT INTO `user_profile` (`profile_id`, `profile_name`) VALUES
(1, 'Network Administrator'),
(2, 'Management');

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `feedback_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `rating` tinyint(1) NOT NULL,
  `review` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`feedback_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`feedback_id`, `user_id`, `rating`, `review`) VALUES
(1, 1, 5, "As a user of EyeSeeYou, I’m impressed with how easy it is to navigate the platform. The real-time dashboard keeps me updated on network activity, allowing me to quickly spot potential threats. I feel more secure knowing that I have access to actionable recommendations to mitigate risks effectively."),
(2, 2, 5, "I recently started using EyeSeeYou, and I have to say, it's been pretty good. The real-time dashboard is intuitive and helps me keep an eye on network activity easily. I just wish it had a few more customization options to really tailor it to my needs."),
(3, 2, 5, "EyeSeeYou has exceeded my expectations as a network security tool. The interface is user-friendly, and the real-time alerts keep me informed about any unusual activities. The recommendations for threat mitigation are practical and actionable, making it easier for us to enhance our security posture."),
(4, 1, 4, "EyeSeeYou is a solid tool for network monitoring. I appreciate the real-time insights and recommendations it provides. If the user experience were a bit smoother, I would have rated it higher.");


-- --------------------------------------------------------

--
-- Table structure for table `plan`
--

CREATE TABLE `plan` (
  `plan_id` int(11) NOT NULL,
  `plan_type` varchar(50) NOT NULL,
  PRIMARY KEY (`plan_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `plan`
--

INSERT INTO `plan` (`plan_id`, `plan_type`) VALUES
(1, 'Basic Plan'),
(2, 'Premium Plan');

-- --------------------------------------------------------
--
-- Table structure for table `login_history`
--

CREATE TABLE `login_history` (
  `user_id` int(11) NOT NULL,
  `timestamp` varchar(50) DEFAULT NULL,
  `status` enum('Successful Login','Unsuccessful login') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `alert_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- --------------------------------------------------------
--
-- Table structure for table `reference_number`
--

CREATE TABLE `reference_number` (
  `rule` varchar(30),
  `reference_type` varchar(30) NOT NULL,
  `reference_no` varchar(255),
  PRIMARY KEY (`rule`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reference_number`
--

-- INSERT INTO `reference_number` (`rule`, `reference_type`, `reference_no`) VALUES 
-- ('1:1257:15', 'cve', 'CVE-1999-0153'),
-- ('1:1421:19', 'cve', 'CVE-2002-0012, CVE-2002-0013'),
-- ('1:1418:19', 'cve', 'CVE-2002-0012, CVE-2002-0013'),
-- ('1:402:16', 'cve', 'CVE-2004-0790, CVE-2005-0068');


-- --------------------------------------------------------
--
-- Table structure for table `reference_detail`
--

CREATE TABLE `reference_detail` (
  `reference_type` varchar(30) NOT NULL,
  `reference_no` varchar(255) NOT NULL PRIMARY KEY,
  `description` text NOT NULL,
  `cvss_score` decimal(3,1) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reference_detail`
--

-- INSERT INTO `reference_detail` (
--                 `reference_type`,
--                 `reference_no`,
--                 `description`,
--                 `cvss_score`) 
-- VALUES (
--   'cve',
--   'CVE-2004-0790',
--   'Multiple TCP/IP and ICMP implementations allow remote attackers to cause a denial of service (reset TCP connections) via spoofed ICMP error messages, aka the "blind connection-reset attack."  NOTE: CVE-2004-0790, CVE-2004-0791, and CVE-2004-1060 have been SPLIT based on different attacks; CVE-2005-0065, CVE-2005-0066, CVE-2005-0067, and CVE-2005-0068 are related identifiers that are SPLIT based on the underlying vulnerability.  While CVE normally SPLITs based on vulnerability, the attack-based identifiers exist due to the variety and number of affected implementations and solutions that address the attacks instead of the underlying vulnerabilities.',
--   5.0
--   );


-- --------------------------------------------------------

--
-- Indexes for table `user`
--
ALTER TABLE user
  ADD PRIMARY KEY (user_id),
  ADD UNIQUE KEY username (username),
  ADD UNIQUE KEY phone (phone),
  ADD UNIQUE KEY email (email),
  ADD KEY idx_profile_id (profile_id),
  ADD KEY idx_plan_id (plan_id);

ALTER TABLE user
  MODIFY user_id int(11) NOT NULL AUTO_INCREMENT;

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD INDEX `idx_feedback` (`rating`,`review`),
  ADD INDEX `feedback_ibfk_1` (`user_id`);

--
-- Indexes for table `login_history`
--
ALTER TABLE `login_history`
  ADD INDEX (`timestamp`);

-- --------------------------------------------------------

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`profile_id`) REFERENCES `user_profile` (`profile_id`),
  ADD CONSTRAINT `user_ibfk_2` FOREIGN KEY (`plan_id`) REFERENCES `plan` (`plan_id`),
  ADD CONSTRAINT `chk_mgt_plan` CHECK (NOT (`profile_id` = 2 AND `plan_id` <> 2));

--
-- Constraints for table `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `login_history`
--
ALTER TABLE `login_history`
  ADD CONSTRAINT `login_history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);


--
-- Constraints for table `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `notification_ibfk_1` FOREIGN KEY (`alert_id`) REFERENCES `alerts` (`id`);

-- --
-- -- Constraints for table `reference_number`
-- --
ALTER TABLE `reference_number`
  ADD CONSTRAINT `reference_number_ibfk_1` FOREIGN KEY (`reference_no`) REFERENCES `reference_detail` (`reference_no`);

DELIMITER $$

CREATE PROCEDURE aggregate(
    IN cur_timestamp TIMESTAMP,
    IN pkt_num bigint(20),
    IN protocol varchar(30),
    IN pkt_gen varchar(30),
    IN pkt_len int(11),
    IN direction varchar(10),
    IN src_addr varchar(50),
    IN src_port int(11),
    IN dst_addr varchar(50),
    IN dst_port int(11),
    IN service varchar(50),
    IN rule varchar(30),
    IN priority int(11),
    IN class_name varchar(100),
    IN action varchar(20),
    IN b64_data text,
    IN geoip_src text,
    IN geoip_dst text
)
BEGIN
 
  DECLARE previous_id int(11);
  DECLARE previous_start_timestamp TIMESTAMP;
  DECLARE previous_end_timestamp TIMESTAMP;
  DECLARE previous_src_addr varchar(50);
  DECLARE previous_class varchar(100);
  
  SET cur_timestamp = CURRENT_TIMESTAMP();

  SELECT id, start_timestamp, end_timestamp, src_addr, class 
  INTO previous_id, previous_start_timestamp, previous_end_timestamp, previous_src_addr, previous_class
  FROM alerts
  ORDER BY id DESC 
  LIMIT 1;
  
  IF previous_end_timestamp IS NOT NULL 
     AND TIMESTAMPDIFF(MINUTE, previous_end_timestamp, cur_timestamp) <= 5
     AND class_name = previous_class 
     AND src_addr = previous_src_addr THEN 
     
     UPDATE alerts 
     SET end_timestamp = cur_timestamp,
          pkt_num = pkt_num,
          protocol = protocol,
          pkt_gen = pkt_gen, 
          pkt_len = pkt_len, 
          direction = direction,
          src_addr = src_addr, 
          src_port = src_port, 
          dst_addr = dst_addr, 
          dst_port = dst_port, 
          service = service, 
          rule = rule, 
          priority = priority,
          action = action, 
          b64_data = b64_data,
          count = count + 1,
          geoip_src = geoip_src,
          geoip_dst = geoip_dst
      WHERE id = previous_id;
      
  ELSEIF previous_end_timestamp IS NULL 
      AND class_name = previous_class 
      AND src_addr = previous_src_addr THEN
      
      UPDATE alerts 
      SET end_timestamp = cur_timestamp,
          pkt_num = pkt_num,
          protocol = protocol,
          pkt_gen = pkt_gen, 
          pkt_len = pkt_len, 
          direction = direction,
          src_port = src_port, 
          dst_addr = dst_addr, 
          dst_port = dst_port, 
          service = service, 
          rule = rule, 
          priority = priority,
          action = action, 
          b64_data = b64_data,
          count = count + 1,
          geoip_src = geoip_src,
          geoip_dst = geoip_dst
      WHERE id = previous_id;
  ELSE
      INSERT INTO alerts (start_timestamp, end_timestamp,pkt_num, protocol, pkt_gen, pkt_len, direction, src_addr, src_port, dst_addr, dst_port, service, rule, priority, class, action, b64_data, count, geoip_src, geoip_dst)
      VALUES (cur_timestamp, cur_timestamp,pkt_num, protocol, pkt_gen, pkt_len, direction, src_addr, src_port, dst_addr, dst_port, service, rule, priority, class_name, action, b64_data, 1, geoip_src, geoip_dst);

  
  END IF;
END$$

DELIMITER ;


--
-- Triggers `crit_alert`
--

DELIMITER $$
CREATE TRIGGER `crit_alert` AFTER INSERT ON `alerts` 
FOR EACH ROW 
  IF NEW.priority = 1 THEN
    INSERT INTO `notification` (alert_id) VALUES (NEW.id);
  END IF
$$
DELIMITER ;


COMMIT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;