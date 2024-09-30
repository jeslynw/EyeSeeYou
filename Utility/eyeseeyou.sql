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

CREATE TABLE `alerts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` varchar(50) DEFAULT NULL,
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `alerts`
--

INSERT INTO `alerts` (`id`, `timestamp`, `pkt_num`, `protocol`, `pkt_gen`, `pkt_len`, `direction`, `src_addr`, `src_port`, `dst_addr`, `dst_port`, `service`, `rule`, `priority`, `class`, `action`, `b64_data`, `status`) VALUES
(1, '09/18-11:16:43.622757', 103, 'ICMP', 'raw', 76, 'C2S', '::', NULL, 'ff02::16', NULL, 'unknown', '1:10000001:0', 0, 'none', 'allow', 'AAAAAQQAAAD/AgAAAAAAAAAAAAH/Wv6A', 'Resolved'),
(2, '09/18-11:16:01.673454', 89, 'ICMP', 'raw', 567, 'C2S', '192.168.44.133', NULL, '34.120.127.120', NULL, 'unknown', '1:10000001:0', 0, 'none', 'allow', 'AbuvRgIHKdTmAAAAARAjAyYNp0xzoqRXNbHtoAteCOx0+zLbMEpsQY44+ZnVuZtUfCkbN7XWVcWZ+hTCVClPNzkdcNasRFwiGTDeCICB4u+7+4ZKJd8xor+3k4AkgJz0EJ43FCYtDXU8s0TsViu96n2ZfFRX07UWzT4TXObJ9X1qeWMNDOek6ZE65BDd8v+inVoOSHbQjbxdAUfcvRfwX9Px7lvKQbyeyTqBHLm1X1wUo7NVMVgAmn5qigYVBs3PkNP70OCMQqZgd3LxMD3suqVBrqDS4ZLw3JxjtwXrmYmqMfz9mgyCdMAUmBiN4RjXSIKlqRQ1nSbZtZqlyJ5W8RR7R1qEiOyo/9z7PgWIN0s0u6CVXeDo9fv1O2t2iO0/oUA0GJzGMyp7U1vUOTOnmds4UL0s2rSv0y9UhXvugdIeg1u8CnyAF/I6rNF9VOUqTX+DFj+/UUZKuUnJ3e9lf8Jxgho5mPEm2s1VhjPmci5Rg3OuSItsgLhj/NaTV7yO6tncx5M1xsuGfHDM3UmpqNZY+bQvC/uEJHUYx8TcvqXWSgQb7V7Ofmdw7po8T2S+Fj9fvHW/pE0jAyYNp0xzoqRXNbHtoAteB1FzpgwF0gtFG9Xp5loyilZt1tEhSseK8H+vnloHG5W6qCXCHtLpvqccVKaLQSBdA272r3hyM9M3JWWgOppK', 'Open'),
(3, '09/18-11:16:44.614037', 109, 'ICMP', 'raw', 76, 'C2S', '::', NULL, 'ff02::16', NULL, 'unknown', '1:10000001:0', 0, 'none', 'allow', 'AAAAAQQAAAD/AgAAAAAAAAAAAAH/Wv6A', 'Open'),
(4, '09/18-11:16:45.537273', 111, 'ICMP', 'raw', 48, 'C2S', 'fe80::57bf:9596:9b5a:fe80', NULL, 'ff02::2', NULL, 'unknown', '1:10000001:0', 0, 'none', 'allow', 'AAAAAA==', 'Open'),
(5, '09/18-11:16:01.673454', 89, 'ICMP', 'raw', 567, 'C2S', '192.168.44.133', NULL, '34.120.127.120', NULL, 'unknown', '1:402:16', 3, 'Misc activity', 'allow', 'AbuvRgIHKdTmAAAAARAjAyYNp0xzoqRXNbHtoAteCOx0+zLbMEpsQY44+ZnVuZtUfCkbN7XWVcWZ+hTCVClPNzkdcNasRFwiGTDeCICB4u+7+4ZKJd8xor+3k4AkgJz0EJ43FCYtDXU8s0TsViu96n2ZfFRX07UWzT4TXObJ9X1qeWMNDOek6ZE65BDd8v+inVoOSHbQjbxdAUfcvRfwX9Px7lvKQbyeyTqBHLm1X1wUo7NVMVgAmn5qigYVBs3PkNP70OCMQqZgd3LxMD3suqVBrqDS4ZLw3JxjtwXrmYmqMfz9mgyCdMAUmBiN4RjXSIKlqRQ1nSbZtZqlyJ5W8RR7R1qEiOyo/9z7PgWIN0s0u6CVXeDo9fv1O2t2iO0/oUA0GJzGMyp7U1vUOTOnmds4UL0s2rSv0y9UhXvugdIeg1u8CnyAF/I6rNF9VOUqTX+DFj+/UUZKuUnJ3e9lf8Jxgho5mPEm2s1VhjPmci5Rg3OuSItsgLhj/NaTV7yO6tncx5M1xsuGfHDM3UmpqNZY+bQvC/uEJHUYx8TcvqXWSgQb7V7Ofmdw7po8T2S+Fj9fvHW/pE0jAyYNp0xzoqRXNbHtoAteB1FzpgwF0gtFG9Xp5loyilZt1tEhSseK8H+vnloHG5W6qCXCHtLpvqccVKaLQSBdA272r3hyM9M3JWWgOppK', 'Open'),
(6, '09/18-11:16:49.529642', 115, 'ICMP', 'raw', 48, 'C2S', 'fe80::57bf:9596:9b5a:fe80', NULL, 'ff02::2', NULL, 'unknown', '1:10000001:0', 0, 'none', 'allow', 'AAAAAA==', 'Open'),
(7, '09/18-11:16:55.006166', 119, 'UDP', 'raw', 203, 'C2S', '192.168.44.1', 60605, '239.255.255.250', 1900, 'unknown', '1:1917:16', 3, 'Detection of a Network Scan', 'allow', 'TS1TRUFSQ0ggKiBIVFRQLzEuMQ0KSE9TVDogMjM5LjI1NS4yNTUuMjUwOjE5MDANCk1BTjogInNzZHA6ZGlzY292ZXIiDQpNWDogMQ0KU1Q6IHVybjpkaWFsLW11bHRpc2NyZWVuLW9yZzpzZXJ2aWNlOmRpYWw6MQ0KVVNFUi1BR0VOVDogTWljcm9zb2Z0IEVkZ2UvMTI4LjAuMjczOS43OSBXaW5kb3dzDQoNCg==', 'Open'),
(8, '09/18-11:16:57.017780', 127, 'UDP', 'raw', 203, 'C2S', '192.168.44.1', 60605, '239.255.255.250', 1900, 'unknown', '1:1917:16', 3, 'Detection of a Network Scan', 'allow', 'TS1TRUFSQ0ggKiBIVFRQLzEuMQ0KSE9TVDogMjM5LjI1NS4yNTUuMjUwOjE5MDANCk1BTjogInNzZHA6ZGlzY292ZXIiDQpNWDogMQ0KU1Q6IHVybjpkaWFsLW11bHRpc2NyZWVuLW9yZzpzZXJ2aWNlOmRpYWw6MQ0KVVNFUi1BR0VOVDogTWljcm9zb2Z0IEVkZ2UvMTI4LjAuMjczOS43OSBXaW5kb3dzDQoNCg==', 'Open'),
(9, '09/18-11:16:45.415092', 110, 'ICMP', 'raw', 76, 'C2S', 'fe80::57bf:9596:9b5a:fe80', NULL, 'ff02::16', NULL, 'unknown', '1:10000001:0', 0, 'none', 'allow', 'AAAAAQQAAAD/AgAAAAAAAAAAAAH/Wv6A', 'Open'),
(10, '09/18-11:16:00.322545', 87, 'ICMP', 'raw', 567, 'C2S', '192.168.44.133', NULL, '34.120.127.120', NULL, 'unknown', '1:10000001:0', 0, 'none', 'allow', 'AbuvRgIHG2rnAAAAARAjAyYNp0xzoqRXNbHtoAteCOx0+zLbMEpsQY6wPz0EZjVji8vhvCjkdLWhwQPi2iHW5fQYTdWsY7pKUzcLWFMMN4qyPJB1FHSQnZZVU3jRllbPJWKE+LVN3mOhg4hV2MH1/VjyZSzmoJrU/70g+9fajew/ccwixWsGd8VxU+vufBw4CRr+yXhN6PpFnZH/+sHcQcJAbxfFz6T6crNKr/dA0FJJsA3Lq9N8mWfMSk3HMrcoNoBpqUVepKcvaB7hezBdXLtcQ3puakLCGazhf52t2BAHl6YFiUK85vEgQL//o5vb225vBzQVYA+WjkGhI0Qh0Q4ur3sCWhsZ7NFa7KySMTT7G8+RcuCZQ9lov3hcESoyxwTUUzORSTI6Dj1SSxDFR6QUeDNeHJEW9rjdwn9y5Q3Gq3xW0KGKzh2uW3FkRyM88SlHKrL6RaZw9BuidVwNcDL2Ai0GDM4J5fThQOzbbwUr97GHcybqJuJe/j8DILrcNqHTttICab/EL+u/2nmy+/jo+UrIAWToYtElkkV2WBAg7t50AtfY/qqSiFgx21JvuhEDkYTaxU4jAyYNp0xzoqRXNbHtoAteuIvwuEbkagfoEe5uArWoTTnzk/uax9DSOOgVzQk4OxwisqGDXrOvHZdNtI8CSesFpzy7lMfNR6Lm7aHZ1djw', 'Open'),
(11, '09/18-11:16:00.322545', 87, 'ICMP', 'raw', 567, 'C2S', '192.168.44.133', NULL, '34.120.127.120', NULL, 'unknown', '1:402:16', 3, 'Misc activity', 'allow', 'AbuvRgIHG2rnAAAAARAjAyYNp0xzoqRXNbHtoAteCOx0+zLbMEpsQY6wPz0EZjVji8vhvCjkdLWhwQPi2iHW5fQYTdWsY7pKUzcLWFMMN4qyPJB1FHSQnZZVU3jRllbPJWKE+LVN3mOhg4hV2MH1/VjyZSzmoJrU/70g+9fajew/ccwixWsGd8VxU+vufBw4CRr+yXhN6PpFnZH/+sHcQcJAbxfFz6T6crNKr/dA0FJJsA3Lq9N8mWfMSk3HMrcoNoBpqUVepKcvaB7hezBdXLtcQ3puakLCGazhf52t2BAHl6YFiUK85vEgQL//o5vb225vBzQVYA+WjkGhI0Qh0Q4ur3sCWhsZ7NFa7KySMTT7G8+RcuCZQ9lov3hcESoyxwTUUzORSTI6Dj1SSxDFR6QUeDNeHJEW9rjdwn9y5Q3Gq3xW0KGKzh2uW3FkRyM88SlHKrL6RaZw9BuidVwNcDL2Ai0GDM4J5fThQOzbbwUr97GHcybqJuJe/j8DILrcNqHTttICab/EL+u/2nmy+/jo+UrIAWToYtElkkV2WBAg7t50AtfY/qqSiFgx21JvuhEDkYTaxU4jAyYNp0xzoqRXNbHtoAteuIvwuEbkagfoEe5uArWoTTnzk/uax9DSOOgVzQk4OxwisqGDXrOvHZdNtI8CSesFpzy7lMfNR6Lm7aHZ1djw', 'In Progress'),
(12, '09/18-11:16:53.996500', 118, 'UDP', 'raw', 203, 'C2S', '192.168.44.1', 60605, '239.255.255.250', 1900, 'unknown', '1:1917:16', 3, 'Detection of a Network Scan', 'allow', 'TS1TRUFSQ0ggKiBIVFRQLzEuMQ0KSE9TVDogMjM5LjI1NS4yNTUuMjUwOjE5MDANCk1BTjogInNzZHA6ZGlzY292ZXIiDQpNWDogMQ0KU1Q6IHVybjpkaWFsLW11bHRpc2NyZWVuLW9yZzpzZXJ2aWNlOmRpYWw6MQ0KVVNFUi1BR0VOVDogTWljcm9zb2Z0IEVkZ2UvMTI4LjAuMjczOS43OSBXaW5kb3dzDQoNCg==', 'Open'),
(13, '09/18-11:16:44.389682', 108, 'ICMP', 'raw', 72, 'C2S', '::', NULL, 'ff02::1:ff5a:fe80', NULL, 'unknown', '1:10000001:0', 0, 'none', 'allow', 'AAAAAP6AAAAAAAAAV7+Vlpta/oAOAeezAF+OGg==', 'Open'),
(14, '09/18-11:16:57.593046', 128, 'ICMP', 'raw', 48, 'C2S', 'fe80::57bf:9596:9b5a:fe80', NULL, 'ff02::2', NULL, 'unknown', '1:10000001:0', 0, 'none', 'allow', 'AAAAAA==', 'Open'),
(15, '09/18-11:16:45.961792', 113, 'ICMP', 'raw', 76, 'C2S', 'fe80::57bf:9596:9b5a:fe80', NULL, 'ff02::16', NULL, 'unknown', '1:10000001:0', 0, 'none', 'allow', 'AAAAAQQAAAD/AgAAAAAAAAAAAAH/Wv6A', 'Open'),
(16, '09/18-11:16:56.014846', 120, 'UDP', 'raw', 203, 'C2S', '192.168.44.1', 60605, '239.255.255.250', 1900, 'unknown', '1:1917:16', 3, 'Detection of a Network Scan', 'allow', 'TS1TRUFSQ0ggKiBIVFRQLzEuMQ0KSE9TVDogMjM5LjI1NS4yNTUuMjUwOjE5MDANCk1BTjogInNzZHA6ZGlzY292ZXIiDQpNWDogMQ0KU1Q6IHVybjpkaWFsLW11bHRpc2NyZWVuLW9yZzpzZXJ2aWNlOmRpYWw6MQ0KVVNFUi1BR0VOVDogTWljcm9zb2Z0IEVkZ2UvMTI4LjAuMjczOS43OSBXaW5kb3dzDQoNCg==', 'In Progress'),
(17, '09/18-11:17:13.237257', 145, 'ICMP', 'raw', 48, 'C2S', 'fe80::57bf:9596:9b5a:fe80', NULL, 'ff02::2', NULL, 'unknown', '1:10000001:0', 0, 'none', 'allow', 'AAAAAA==', 'Open'),
(18, '09/18-11:18:23.181865', 208, 'TCP', 'raw', 40, 'C2S', '192.168.44.130', 62472, '192.168.44.133', 135, 'unknown', '1:1257:15', 2, 'Attempted Denial of Service', 'allow', NULL, 'False Positive'),
(19, '09/18-11:18:23.229567', 918, 'TCP', 'raw', 40, 'C2S', '192.168.44.130', 62472, '192.168.44.133', 161, 'unknown', '1:1418:19', 2, 'Attempted Information Leak', 'allow', NULL, 'Open'),
(20, '09/18-11:17:00.937646', 136, 'ICMP', 'raw', 76, 'C2S', 'fe80::57bf:9596:9b5a:fe80', NULL, 'ff02::16', NULL, 'unknown', '1:10000001:0', 0, 'none', 'allow', 'AAAAAQQAAAD/AgAAAAAAAAAAAAAAAAAM', 'Open'),
(21, '09/18-11:17:00.957678', 138, 'ICMP', 'raw', 76, 'C2S', 'fe80::57bf:9596:9b5a:fe80', NULL, 'ff02::16', NULL, 'unknown', '1:10000001:0', 0, 'none', 'allow', 'AAAAAQMAAAD/AgAAAAAAAAAAAAAAAAAM', 'Open'),
(22, '09/18-11:17:43.061862', 154, 'ICMP', 'raw', 48, 'C2S', 'fe80::57bf:9596:9b5a:fe80', NULL, 'ff02::2', NULL, 'unknown', '1:10000001:0', 0, 'none', 'allow', 'AAAAAA==', 'Open'),
(23, '09/18-11:17:01.193291', 139, 'ICMP', 'raw', 76, 'C2S', 'fe80::57bf:9596:9b5a:fe80', NULL, 'ff02::16', NULL, 'unknown', '1:10000001:0', 0, 'none', 'allow', 'AAAAAQMAAAD/AgAAAAAAAAAAAAAAAAAM', 'Open'),
(24, '09/18-11:18:23.273179', 1766, 'TCP', 'raw', 40, 'C2S', '192.168.44.130', 62472, '192.168.44.133', 705, 'unknown', '1:1421:19', 2, 'Attempted Information Leak', 'allow', NULL, 'Open'),
(25, '09/18-11:18:23.181860', 202, 'TCP', 'raw', 40, 'C2S', '192.168.44.130', 62472, '192.168.44.133', 139, 'unknown', '1:1257:15', 2, 'Attempted Denial of Service', 'allow', NULL, 'Open'),
(26, '09/18-11:18:45.327873', 2195, 'ICMP', 'raw', 48, 'C2S', 'fe80::57bf:9596:9b5a:fe80', NULL, 'ff02::2', NULL, 'unknown', '1:10000001:0', 0, 'none', 'allow', 'AAAAAA==', 'Open'),
(27, '09/18-11:18:57.017706', 2215, 'UDP', 'raw', 203, 'C2S', '192.168.44.1', 56207, '239.255.255.250', 1900, 'unknown', '1:1917:16', 3, 'Detection of a Network Scan', 'allow', 'TS1TRUFSQ0ggKiBIVFRQLzEuMQ0KSE9TVDogMjM5LjI1NS4yNTUuMjUwOjE5MDANCk1BTjogInNzZHA6ZGlzY292ZXIiDQpNWDogMQ0KU1Q6IHVybjpkaWFsLW11bHRpc2NyZWVuLW9yZzpzZXJ2aWNlOmRpYWw6MQ0KVVNFUi1BR0VOVDogTWljcm9zb2Z0IEVkZ2UvMTI4LjAuMjczOS43OSBXaW5kb3dzDQoNCg==', 'Open'),
(28, '09/18-11:18:54.006171', 2212, 'UDP', 'raw', 203, 'C2S', '192.168.44.1', 56207, '239.255.255.250', 1900, 'unknown', '1:1917:16', 3, 'Detection of a Network Scan', 'allow', 'TS1TRUFSQ0ggKiBIVFRQLzEuMQ0KSE9TVDogMjM5LjI1NS4yNTUuMjUwOjE5MDANCk1BTjogInNzZHA6ZGlzY292ZXIiDQpNWDogMQ0KU1Q6IHVybjpkaWFsLW11bHRpc2NyZWVuLW9yZzpzZXJ2aWNlOmRpYWw6MQ0KVVNFUi1BR0VOVDogTWljcm9zb2Z0IEVkZ2UvMTI4LjAuMjczOS43OSBXaW5kb3dzDQoNCg==', 'Open'),
(29, '09/18-11:18:55.014712', 2213, 'UDP', 'raw', 203, 'C2S', '192.168.44.1', 56207, '239.255.255.250', 1900, 'unknown', '1:1917:16', 3, 'Detection of a Network Scan', 'allow', 'TS1TRUFSQ0ggKiBIVFRQLzEuMQ0KSE9TVDogMjM5LjI1NS4yNTUuMjUwOjE5MDANCk1BTjogInNzZHA6ZGlzY292ZXIiDQpNWDogMQ0KU1Q6IHVybjpkaWFsLW11bHRpc2NyZWVuLW9yZzpzZXJ2aWNlOmRpYWw6MQ0KVVNFUi1BR0VOVDogTWljcm9zb2Z0IEVkZ2UvMTI4LjAuMjczOS43OSBXaW5kb3dzDQoNCg==', 'Open'),
(30, '09/18-11:18:56.014868', 2214, 'UDP', 'raw', 203, 'C2S', '192.168.44.1', 56207, '239.255.255.250', 1900, 'unknown', '1:1917:16', 3, 'Detection of a Network Scan', 'allow', 'TS1TRUFSQ0ggKiBIVFRQLzEuMQ0KSE9TVDogMjM5LjI1NS4yNTUuMjUwOjE5MDANCk1BTjogInNzZHA6ZGlzY292ZXIiDQpNWDogMQ0KU1Q6IHVybjpkaWFsLW11bHRpc2NyZWVuLW9yZzpzZXJ2aWNlOmRpYWw6MQ0KVVNFUi1BR0VOVDogTWljcm9zb2Z0IEVkZ2UvMTI4LjAuMjczOS43OSBXaW5kb3dzDQoNCg==', 'Open'),
(31, '09/18-11:19:57.447257', 2240, 'UDP', 'raw', 203, 'C2S', '192.168.44.1', 49670, '239.255.255.250', 1900, 'unknown', '1:1917:16', 3, 'Detection of a Network Scan', 'allow', 'TS1TRUFSQ0ggKiBIVFRQLzEuMQ0KSE9TVDogMjM5LjI1NS4yNTUuMjUwOjE5MDANCk1BTjogInNzZHA6ZGlzY292ZXIiDQpNWDogMQ0KU1Q6IHVybjpkaWFsLW11bHRpc2NyZWVuLW9yZzpzZXJ2aWNlOmRpYWw6MQ0KVVNFUi1BR0VOVDogTWljcm9zb2Z0IEVkZ2UvMTI4LjAuMjczOS43OSBXaW5kb3dzDQoNCg==', 'Open'),
(32, '09/18-11:19:52.739501', 2228, 'ICMP', 'raw', 76, 'C2S', 'fe80::30fd:273a:77b8:c416', NULL, 'ff02::16', NULL, 'unknown', '1:10000001:0', 0, 'none', 'allow', 'AAAAAQMAAAD/AgAAAAAAAAAAAAAAAQAD', 'Open'),
(33, '09/18-11:19:52.754939', 2230, 'ICMP', 'raw', 76, 'C2S', 'fe80::30fd:273a:77b8:c416', NULL, 'ff02::16', NULL, 'unknown', '1:10000001:0', 0, 'none', 'allow', 'AAAAAQQAAAD/AgAAAAAAAAAAAAAAAQAD', 'Open'),
(34, '09/18-11:19:52.883136', 2237, 'ICMP', 'raw', 76, 'C2S', 'fe80::30fd:273a:77b8:c416', NULL, 'ff02::16', NULL, 'unknown', '1:10000001:0', 0, 'none', 'allow', 'AAAAAQQAAAD/AgAAAAAAAAAAAAAAAQAD', 'Open'),
(35, '09/18-11:19:59.460033', 2242, 'UDP', 'raw', 203, 'C2S', '192.168.44.1', 49670, '239.255.255.250', 1900, 'unknown', '1:1917:16', 3, 'Detection of a Network Scan', 'allow', 'TS1TRUFSQ0ggKiBIVFRQLzEuMQ0KSE9TVDogMjM5LjI1NS4yNTUuMjUwOjE5MDANCk1BTjogInNzZHA6ZGlzY292ZXIiDQpNWDogMQ0KU1Q6IHVybjpkaWFsLW11bHRpc2NyZWVuLW9yZzpzZXJ2aWNlOmRpYWw6MQ0KVVNFUi1BR0VOVDogTWljcm9zb2Z0IEVkZ2UvMTI4LjAuMjczOS43OSBXaW5kb3dzDQoNCg==', 'Open'),
(36, '09/18-11:19:58.449670', 2241, 'UDP', 'raw', 203, 'C2S', '192.168.44.1', 49670, '239.255.255.250', 1900, 'unknown', '1:1917:16', 3, 'Detection of a Network Scan', 'allow', 'TS1TRUFSQ0ggKiBIVFRQLzEuMQ0KSE9TVDogMjM5LjI1NS4yNTUuMjUwOjE5MDANCk1BTjogInNzZHA6ZGlzY292ZXIiDQpNWDogMQ0KU1Q6IHVybjpkaWFsLW11bHRpc2NyZWVuLW9yZzpzZXJ2aWNlOmRpYWw6MQ0KVVNFUi1BR0VOVDogTWljcm9zb2Z0IEVkZ2UvMTI4LjAuMjczOS43OSBXaW5kb3dzDQoNCg==', 'Open'),
(37, '09/18-11:20:00.475344', 2253, 'UDP', 'raw', 203, 'C2S', '192.168.44.1', 49670, '239.255.255.250', 1900, 'unknown', '1:1917:16', 3, 'Detection of a Network Scan', 'allow', 'TS1TRUFSQ0ggKiBIVFRQLzEuMQ0KSE9TVDogMjM5LjI1NS4yNTUuMjUwOjE5MDANCk1BTjogInNzZHA6ZGlzY292ZXIiDQpNWDogMQ0KU1Q6IHVybjpkaWFsLW11bHRpc2NyZWVuLW9yZzpzZXJ2aWNlOmRpYWw6MQ0KVVNFUi1BR0VOVDogTWljcm9zb2Z0IEVkZ2UvMTI4LjAuMjczOS43OSBXaW5kb3dzDQoNCg==', 'Open'),
(38, '09/18-11:21:58.470771', 2309, 'UDP', 'raw', 203, 'C2S', '192.168.44.1', 58045, '239.255.255.250', 1900, 'unknown', '1:1917:16', 3, 'Detection of a Network Scan', 'allow', 'TS1TRUFSQ0ggKiBIVFRQLzEuMQ0KSE9TVDogMjM5LjI1NS4yNTUuMjUwOjE5MDANCk1BTjogInNzZHA6ZGlzY292ZXIiDQpNWDogMQ0KU1Q6IHVybjpkaWFsLW11bHRpc2NyZWVuLW9yZzpzZXJ2aWNlOmRpYWw6MQ0KVVNFUi1BR0VOVDogTWljcm9zb2Z0IEVkZ2UvMTI4LjAuMjczOS43OSBXaW5kb3dzDQoNCg==', 'In Progress'),
(39, '09/18-11:21:57.458802', 2308, 'UDP', 'raw', 203, 'C2S', '192.168.44.1', 58045, '239.255.255.250', 1900, 'unknown', '1:1917:16', 3, 'Detection of a Network Scan', 'allow', 'TS1TRUFSQ0ggKiBIVFRQLzEuMQ0KSE9TVDogMjM5LjI1NS4yNTUuMjUwOjE5MDANCk1BTjogInNzZHA6ZGlzY292ZXIiDQpNWDogMQ0KU1Q6IHVybjpkaWFsLW11bHRpc2NyZWVuLW9yZzpzZXJ2aWNlOmRpYWw6MQ0KVVNFUi1BR0VOVDogTWljcm9zb2Z0IEVkZ2UvMTI4LjAuMjczOS43OSBXaW5kb3dzDQoNCg==', 'Open'),
(40, '09/18-11:20:08.545279', 2266, 'ICMP', 'raw', 76, 'C2S', 'fe80::30fd:273a:77b8:c416', NULL, 'ff02::16', NULL, 'unknown', '1:10000001:0', 0, 'none', 'allow', 'AAAAAQMAAAD/AgAAAAAAAAAAAAAAAQAD', 'Open'),
(41, '09/18-11:20:08.515164', 2262, 'ICMP', 'raw', 76, 'C2S', 'fe80::30fd:273a:77b8:c416', NULL, 'ff02::16', NULL, 'unknown', '1:10000001:0', 0, 'none', 'allow', 'AAAAAQMAAAD/AgAAAAAAAAAAAAAAAQAD', 'Open'),
(42, '09/18-11:20:08.545595', 2268, 'ICMP', 'raw', 76, 'C2S', 'fe80::30fd:273a:77b8:c416', NULL, 'ff02::16', NULL, 'unknown', '1:10000001:0', 0, 'none', 'allow', 'AAAAAQQAAAD/AgAAAAAAAAAAAAAAAQAD', 'Open'),
(43, '09/18-11:20:08.544498', 2264, 'ICMP', 'raw', 76, 'C2S', 'fe80::30fd:273a:77b8:c416', NULL, 'ff02::16', NULL, 'unknown', '1:10000001:0', 0, 'none', 'allow', 'AAAAAQQAAAD/AgAAAAAAAAAAAAAAAQAD', 'Open'),
(44, '09/18-11:20:44.100330', 2306, 'ICMP', 'raw', 48, 'C2S', 'fe80::57bf:9596:9b5a:fe80', NULL, 'ff02::2', NULL, 'unknown', '1:10000001:0', 0, 'none', 'allow', 'AAAAAA==', 'Open'),
(45, '09/18-11:20:08.885173', 2275, 'ICMP', 'raw', 76, 'C2S', 'fe80::30fd:273a:77b8:c416', NULL, 'ff02::16', NULL, 'unknown', '1:10000001:0', 0, 'none', 'allow', 'AAAAAQQAAAD/AgAAAAAAAAAAAAAAAQAD', 'Open'),
(46, '09/18-11:21:59.476611', 2310, 'UDP', 'raw', 203, 'C2S', '192.168.44.1', 58045, '239.255.255.250', 1900, 'unknown', '1:1917:16', 3, 'Detection of a Network Scan', 'allow', 'TS1TRUFSQ0ggKiBIVFRQLzEuMQ0KSE9TVDogMjM5LjI1NS4yNTUuMjUwOjE5MDANCk1BTjogInNzZHA6ZGlzY292ZXIiDQpNWDogMQ0KU1Q6IHVybjpkaWFsLW11bHRpc2NyZWVuLW9yZzpzZXJ2aWNlOmRpYWw6MQ0KVVNFUi1BR0VOVDogTWljcm9zb2Z0IEVkZ2UvMTI4LjAuMjczOS43OSBXaW5kb3dzDQoNCg==', 'Open'),
(47, '09/18-11:23:57.467404', 2327, 'UDP', 'raw', 203, 'C2S', '192.168.44.1', 55412, '239.255.255.250', 1900, 'unknown', '1:1917:16', 3, 'Detection of a Network Scan', 'allow', 'TS1TRUFSQ0ggKiBIVFRQLzEuMQ0KSE9TVDogMjM5LjI1NS4yNTUuMjUwOjE5MDANCk1BTjogInNzZHA6ZGlzY292ZXIiDQpNWDogMQ0KU1Q6IHVybjpkaWFsLW11bHRpc2NyZWVuLW9yZzpzZXJ2aWNlOmRpYWw6MQ0KVVNFUi1BR0VOVDogTWljcm9zb2Z0IEVkZ2UvMTI4LjAuMjczOS43OSBXaW5kb3dzDQoNCg==', 'Open'),
(48, '09/18-11:22:00.485171', 2311, 'UDP', 'raw', 203, 'C2S', '192.168.44.1', 58045, '239.255.255.250', 1900, 'unknown', '1:1917:16', 3, 'Detection of a Network Scan', 'allow', 'TS1TRUFSQ0ggKiBIVFRQLzEuMQ0KSE9TVDogMjM5LjI1NS4yNTUuMjUwOjE5MDANCk1BTjogInNzZHA6ZGlzY292ZXIiDQpNWDogMQ0KU1Q6IHVybjpkaWFsLW11bHRpc2NyZWVuLW9yZzpzZXJ2aWNlOmRpYWw6MQ0KVVNFUi1BR0VOVDogTWljcm9zb2Z0IEVkZ2UvMTI4LjAuMjczOS43OSBXaW5kb3dzDQoNCg==', 'Open'),
(49, '09/18-11:23:59.481788', 2329, 'UDP', 'raw', 203, 'C2S', '192.168.44.1', 55412, '239.255.255.250', 1900, 'unknown', '1:1917:16', 3, 'Detection of a Network Scan', 'allow', 'TS1TRUFSQ0ggKiBIVFRQLzEuMQ0KSE9TVDogMjM5LjI1NS4yNTUuMjUwOjE5MDANCk1BTjogInNzZHA6ZGlzY292ZXIiDQpNWDogMQ0KU1Q6IHVybjpkaWFsLW11bHRpc2NyZWVuLW9yZzpzZXJ2aWNlOmRpYWw6MQ0KVVNFUi1BR0VOVDogTWljcm9zb2Z0IEVkZ2UvMTI4LjAuMjczOS43OSBXaW5kb3dzDQoNCg==', 'Open'),
(50, '09/18-11:24:33.749028', 2331, 'ICMP', 'raw', 48, 'C2S', 'fe80::57bf:9596:9b5a:fe80', NULL, 'ff02::2', NULL, 'unknown', '1:10000001:0', 0, 'none', 'allow', 'AAAAAA==', 'Open'),
(51, '09/18-11:24:00.496928', 2330, 'UDP', 'raw', 203, 'C2S', '192.168.44.1', 55412, '239.255.255.250', 1900, 'unknown', '1:1917:16', 3, 'Detection of a Network Scan', 'allow', 'TS1TRUFSQ0ggKiBIVFRQLzEuMQ0KSE9TVDogMjM5LjI1NS4yNTUuMjUwOjE5MDANCk1BTjogInNzZHA6ZGlzY292ZXIiDQpNWDogMQ0KU1Q6IHVybjpkaWFsLW11bHRpc2NyZWVuLW9yZzpzZXJ2aWNlOmRpYWw6MQ0KVVNFUi1BR0VOVDogTWljcm9zb2Z0IEVkZ2UvMTI4LjAuMjczOS43OSBXaW5kb3dzDQoNCg==', 'Open'),
(52, '09/18-11:25:58.494654', 2362, 'UDP', 'raw', 203, 'C2S', '192.168.44.1', 53634, '239.255.255.250', 1900, 'unknown', '1:1917:16', 3, 'Detection of a Network Scan', 'allow', 'TS1TRUFSQ0ggKiBIVFRQLzEuMQ0KSE9TVDogMjM5LjI1NS4yNTUuMjUwOjE5MDANCk1BTjogInNzZHA6ZGlzY292ZXIiDQpNWDogMQ0KU1Q6IHVybjpkaWFsLW11bHRpc2NyZWVuLW9yZzpzZXJ2aWNlOmRpYWw6MQ0KVVNFUi1BR0VOVDogTWljcm9zb2Z0IEVkZ2UvMTI4LjAuMjczOS43OSBXaW5kb3dzDQoNCg==', 'Open'),
(53, '09/18-11:23:58.478626', 2328, 'UDP', 'raw', 203, 'C2S', '192.168.44.1', 55412, '239.255.255.250', 1900, 'unknown', '1:1917:16', 3, 'Detection of a Network Scan', 'allow', 'TS1TRUFSQ0ggKiBIVFRQLzEuMQ0KSE9TVDogMjM5LjI1NS4yNTUuMjUwOjE5MDANCk1BTjogInNzZHA6ZGlzY292ZXIiDQpNWDogMQ0KU1Q6IHVybjpkaWFsLW11bHRpc2NyZWVuLW9yZzpzZXJ2aWNlOmRpYWw6MQ0KVVNFUi1BR0VOVDogTWljcm9zb2Z0IEVkZ2UvMTI4LjAuMjczOS43OSBXaW5kb3dzDQoNCg==', 'Open'),
(54, '09/18-11:27:58.502931', 2366, 'UDP', 'raw', 203, 'C2S', '192.168.44.1', 54749, '239.255.255.250', 1900, 'unknown', '1:1917:16', 3, 'Detection of a Network Scan', 'allow', 'TS1TRUFSQ0ggKiBIVFRQLzEuMQ0KSE9TVDogMjM5LjI1NS4yNTUuMjUwOjE5MDANCk1BTjogInNzZHA6ZGlzY292ZXIiDQpNWDogMQ0KU1Q6IHVybjpkaWFsLW11bHRpc2NyZWVuLW9yZzpzZXJ2aWNlOmRpYWw6MQ0KVVNFUi1BR0VOVDogTWljcm9zb2Z0IEVkZ2UvMTI4LjAuMjczOS43OSBXaW5kb3dzDQoNCg==', 'Open'),
(55, '09/18-11:25:59.507632', 2363, 'UDP', 'raw', 203, 'C2S', '192.168.44.1', 53634, '239.255.255.250', 1900, 'unknown', '1:1917:16', 3, 'Detection of a Network Scan', 'allow', 'TS1TRUFSQ0ggKiBIVFRQLzEuMQ0KSE9TVDogMjM5LjI1NS4yNTUuMjUwOjE5MDANCk1BTjogInNzZHA6ZGlzY292ZXIiDQpNWDogMQ0KU1Q6IHVybjpkaWFsLW11bHRpc2NyZWVuLW9yZzpzZXJ2aWNlOmRpYWw6MQ0KVVNFUi1BR0VOVDogTWljcm9zb2Z0IEVkZ2UvMTI4LjAuMjczOS43OSBXaW5kb3dzDQoNCg==', 'Open'),
(56, '09/18-11:26:00.508923', 2364, 'UDP', 'raw', 203, 'C2S', '192.168.44.1', 53634, '239.255.255.250', 1900, 'unknown', '1:1917:16', 3, 'Detection of a Network Scan', 'allow', 'TS1TRUFSQ0ggKiBIVFRQLzEuMQ0KSE9TVDogMjM5LjI1NS4yNTUuMjUwOjE5MDANCk1BTjogInNzZHA6ZGlzY292ZXIiDQpNWDogMQ0KU1Q6IHVybjpkaWFsLW11bHRpc2NyZWVuLW9yZzpzZXJ2aWNlOmRpYWw6MQ0KVVNFUi1BR0VOVDogTWljcm9zb2Z0IEVkZ2UvMTI4LjAuMjczOS43OSBXaW5kb3dzDQoNCg==', 'In Progress'),
(57, '09/18-11:25:57.481868', 2361, 'UDP', 'raw', 203, 'C2S', '192.168.44.1', 53634, '239.255.255.250', 1900, 'unknown', '1:1917:16', 3, 'Detection of a Network Scan', 'allow', 'TS1TRUFSQ0ggKiBIVFRQLzEuMQ0KSE9TVDogMjM5LjI1NS4yNTUuMjUwOjE5MDANCk1BTjogInNzZHA6ZGlzY292ZXIiDQpNWDogMQ0KU1Q6IHVybjpkaWFsLW11bHRpc2NyZWVuLW9yZzpzZXJ2aWNlOmRpYWw6MQ0KVVNFUi1BR0VOVDogTWljcm9zb2Z0IEVkZ2UvMTI4LjAuMjczOS43OSBXaW5kb3dzDQoNCg==', 'Open'),
(58, '09/18-11:27:59.515885', 2367, 'UDP', 'raw', 203, 'C2S', '192.168.44.1', 54749, '239.255.255.250', 1900, 'unknown', '1:1917:16', 3, 'Detection of a Network Scan', 'allow', 'TS1TRUFSQ0ggKiBIVFRQLzEuMQ0KSE9TVDogMjM5LjI1NS4yNTUuMjUwOjE5MDANCk1BTjogInNzZHA6ZGlzY292ZXIiDQpNWDogMQ0KU1Q6IHVybjpkaWFsLW11bHRpc2NyZWVuLW9yZzpzZXJ2aWNlOmRpYWw6MQ0KVVNFUi1BR0VOVDogTWljcm9zb2Z0IEVkZ2UvMTI4LjAuMjczOS43OSBXaW5kb3dzDQoNCg==', 'Open'),
(59, '09/18-11:28:00.530066', 2368, 'UDP', 'raw', 203, 'C2S', '192.168.44.1', 54749, '239.255.255.250', 1900, 'unknown', '1:1917:16', 3, 'Detection of a Network Scan', 'allow', 'TS1TRUFSQ0ggKiBIVFRQLzEuMQ0KSE9TVDogMjM5LjI1NS4yNTUuMjUwOjE5MDANCk1BTjogInNzZHA6ZGlzY292ZXIiDQpNWDogMQ0KU1Q6IHVybjpkaWFsLW11bHRpc2NyZWVuLW9yZzpzZXJ2aWNlOmRpYWw6MQ0KVVNFUi1BR0VOVDogTWljcm9zb2Z0IEVkZ2UvMTI4LjAuMjczOS43OSBXaW5kb3dzDQoNCg==', 'Open'),
(60, '09/18-11:27:57.495621', 2365, 'UDP', 'raw', 203, 'C2S', '192.168.44.1', 54749, '239.255.255.250', 1900, 'unknown', '1:1917:16', 3, 'Detection of a Network Scan', 'allow', 'TS1TRUFSQ0ggKiBIVFRQLzEuMQ0KSE9TVDogMjM5LjI1NS4yNTUuMjUwOjE5MDANCk1BTjogInNzZHA6ZGlzY292ZXIiDQpNWDogMQ0KU1Q6IHVybjpkaWFsLW11bHRpc2NyZWVuLW9yZzpzZXJ2aWNlOmRpYWw6MQ0KVVNFUi1BR0VOVDogTWljcm9zb2Z0IEVkZ2UvMTI4LjAuMjczOS43OSBXaW5kb3dzDQoNCg==', 'Open');

--
-- Triggers `alerts`
--
DELIMITER $$
CREATE TRIGGER `crit_alert` AFTER INSERT ON `alerts` 
FOR EACH ROW 
  IF NEW.priority = 1 THEN
    INSERT INTO `notification` (alert_id) VALUES (NEW.id);
  END IF
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) NOT NULL,
  `username` varchar(30) UNIQUE NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) UNIQUE NOT NULL,
  `email` varchar(50) UNIQUE NOT NULL,
  `organisation_name` varchar(100) NOT NULL,
  `profile_id` int(11) NOT NULL,
  `plan_id` int(11) NOT NULL,
  `active` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`full_name`, `username`, `password`, `phone`, `email`, `organisation_name`, `profile_id`, `plan_id`, `active`) VALUES
('Frankie Lee', 'flee', '$2b$12$d.vVdacMBWoOGYt3hhP5ve6sPlyQvDg4Q6y6FWEyOZ8Zba.IZ7KpS', '98431863', 'flee@gmail.com', 'Yishun Men', 1, 1, 1),
('Keith Min Khant Thu', 'mkt', '$2b$12$FtLxoZ4N1fYrWq2uSojTueByM7rbjWrqm4g8OzUZ1lWMfCLs5U1i2', '96864135', 'mkt@gmail.com', 'Burmese Monk', 1, 2, 1),
('Roydenn', 'roy', '$2b$12$FtLxoZ4N1fYrWq2uSojTueByM7rbjWrqm4g8OzUZ1lWMfCLs5U1i2', '12300023', 'roy@gmail.com', 'Sumo Temple', 2, 2, 1),
('Jeslyn Wangsa', 'jeslyn', '$2b$12$vzRro9BBYxFBA5g4w2QQx.yRnZs2ozXA0rDv5bG8XZt123tuKz7Ea', '82123642', 'jeslyn@gmail.com', 'SIM simps', 1, 1, 1),
('Ervina', 'ervina', '$2b$12$s8JBCotREd1RSMwetiZFAOUwNJtjPotfqf53vSrlthoAQKg.aObVS', '81105273', 'ervina@gmail.com', 'SIM simps', 2, 2, 1);

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
(1, 1, 5, 'very nice');

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
  `username` varchar(30) NOT NULL,
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
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD INDEX `idx_profile_id` (`profile_id`),
  ADD INDEX `idx_plan_id` (`plan_id`);

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
-- Constraints for table `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `notification_ibfk_1` FOREIGN KEY (`alert_id`) REFERENCES `alerts` (`id`);

COMMIT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
