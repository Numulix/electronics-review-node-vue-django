-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 15, 2021 at 04:42 PM
-- Server version: 10.4.16-MariaDB
-- PHP Version: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `electronicsdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(1, 'Uncategorized'),
(4, 'Procesori'),
(6, 'Laptopovi'),
(7, 'Monitori'),
(8, 'Telefoni'),
(9, 'Televizori'),
(10, 'Graficke kartice'),
(11, 'Tastature');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `category_id` int(11) NOT NULL DEFAULT 1,
  `product_description` text NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `product_name`, `category_id`, `product_description`, `price`) VALUES
(3, 'Ryzen 5 5600X', 4, 'As a six-core, 12-thread processor, the $299 AMD Ryzen 5 5600X slots perfectly into the market for midrange gaming-focused CPUs, and brings with it the best balance of core count and cost in the company\'s latest launch of Zen 3-based processors.', 300),
(4, 'Ryzen 5 1600 (AF)', 4, 'Core Clock: 3.2 GHz\r\nBoost Clock: 3.7 GHz', 130),
(5, 'Samsung Galaxy S21', 8, 'Meet Galaxy S21 5G and S21+ 5G. Designed to revolutionize video and photography, with beyond cinematic 8K resolution so you can snap epic photos right out of video. It has it all in two sizes: 64MP, our fastest chip and a massive all-day battery.', 1400);

-- --------------------------------------------------------

--
-- Table structure for table `product_review`
--

CREATE TABLE `product_review` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `review_text` text NOT NULL,
  `posted_date` datetime NOT NULL,
  `last_updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_review`
--

INSERT INTO `product_review` (`id`, `user_id`, `product_id`, `review_text`, `posted_date`, `last_updated`) VALUES
(2, 4, 3, 'Editing review', '0000-00-00 00:00:00', '2021-02-15 15:21:36'),
(5, 1, 3, 'Dodacemo jos jedan review za testiranje\n:)', '2021-02-15 00:16:45', '2021-02-15 00:16:45'),
(10, 2, 5, 'Nepotrebno skup\n', '2021-02-15 11:34:24', '2021-02-15 11:34:24'),
(12, 2, 3, 'Dobar procesor', '2021-02-15 14:19:55', '2021-02-15 14:20:01'),
(13, 1, 5, 'Zaobilazim validaciju', '2021-02-15 15:17:43', '2021-02-15 15:17:43');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `admin` int(11) NOT NULL DEFAULT 0,
  `registered` datetime NOT NULL,
  `last_login` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `admin`, `registered`, `last_login`) VALUES
(1, 'Babic', '$2a$10$ApGksz65nLjTXp16IuT0t.Ac6WXf3ZH2tO/aWP8BRvMaQQ94bRA3W', 1, '2021-02-13 11:10:01', '2021-02-15 15:28:19'),
(2, 'sometest', '$2a$10$yfsxwQTULkaUZiz3Ez.gse.aBGWgblrZRSNPpZ9anBzgXoekL35bK', 0, '2021-02-13 12:14:58', '2021-02-15 14:19:45'),
(3, 'OKEJ', '$2a$10$ZfCQI98L.FyBD7v5R5yExe7IIUoMC8ZMiJlB3i0.DNvMfKS8jbPSC', 0, '2021-02-13 14:09:53', '2021-02-14 00:14:33'),
(4, 'OvajTest', '$2a$10$V105FkD.lD7Lj/puaKvi9.1.IBOCE73lAhyWHYDPlxmRqZk6L8PQy', 0, '2021-02-13 14:10:44', '0000-00-00 00:00:00'),
(5, 'josjedantest', '$2a$10$uLEKZ8dQn8INZzTKebYune180qCkYmoiR6IET42DXb6LHNk.7j/ve', 0, '2021-02-13 14:16:23', '0000-00-00 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `product_review`
--
ALTER TABLE `product_review`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `product_review`
--
ALTER TABLE `product_review`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product_review`
--
ALTER TABLE `product_review`
  ADD CONSTRAINT `product_review_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `product_review_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
