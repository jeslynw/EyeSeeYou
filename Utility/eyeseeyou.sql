-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 10, 2024 at 09:15 AM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 7.4.30

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
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `feedback_id` int(11) NOT NULL UNIQUE AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `rating` tinyint(1) NOT NULL,
  `review` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`feedback_id`),
  KEY `idx_feedback` (`rating`, `review`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`user_id`, `rating`, `review`) VALUES
(1, 5, 'very nice');

-- --------------------------------------------------------

--
-- Table structure for table `plan`
--

CREATE TABLE `plan` (
  `plan_id` int(11) NOT NULL,
  `plan_type` varchar(50) NOT NULL,
  PRIMARY KEY (`plan_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `plan`
--

INSERT INTO `plan` (`plan_id`, `plan_type`) VALUES
(1, 'Basic Plan'),
(2, 'Premium Plan');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) NOT NULL,
  `username` varchar(30) NOT NULL UNIQUE,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL UNIQUE,
  `email` varchar(50) NOT NULL UNIQUE,
  `organisation_name` varchar(100) NOT NULL,
  `profile_id` int(11) NOT NULL,
  `plan_id` int(11) NOT NULL,
  `active` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`user_id`),
  KEY `idx_profile_id` (`profile_id`),
  KEY `idz_plan_id` (`plan_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`full_name`, `username`, `password`, `phone`, `email`, `organisation_name`, `profile_id`, `plan_id`, `active`) VALUES
('Frankie Lee', 'flee', '$2b$12$d.vVdacMBWoOGYt3hhP5ve6sPlyQvDg4Q6y6FWEyOZ8Zba.IZ7KpS', '98431863', 'flee@gmail.com', 'Yishun Men', 1, 1, 1),
('Keith Min Khant Thu', 'mkt', '$2b$12$FtLxoZ4N1fYrWq2uSojTueByM7rbjWrqm4g8OzUZ1lWMfCLs5U1i2', '96864135', 'mkt@gmail.com', 'Burmese Monk', 1, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_profile`
--

CREATE TABLE `user_profile` (
  `profile_id` int(11) NOT NULL,
  `profile_name` varchar(50) NOT NULL,
  PRIMARY KEY (`profile_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_profile`
--

INSERT INTO `user_profile` (`profile_id`, `profile_name`) VALUES
(1, 'Network Administrator'),
(2, 'Management');

-- --------------------------------------------------------


--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`profile_id`) REFERENCES `user_profile` (`profile_id`),
  ADD CONSTRAINT `user_ibfk_2` FOREIGN KEY (`plan_id`) REFERENCES `plan` (`plan_id`);
COMMIT;

--
-- Constraints for table `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);
COMMIT;


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
