-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 28, 2025 at 09:19 PM
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
-- Database: `titusrnd_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `peserta`
--

CREATE TABLE `peserta` (
  `id` int(11) NOT NULL,
  `nama_peserta` varchar(50) NOT NULL,
  `todo_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `peserta`
--

INSERT INTO `peserta` (`id`, `nama_peserta`, `todo_id`) VALUES
(16, 'Budi Santoso', 10),
(17, 'Siti Aminah', 10),
(18, 'Andi Wijaya', 11),
(19, 'Dewi Lestari', 11),
(20, 'Rina Kurniawan', 12),
(21, 'Agus Salim', 12),
(22, 'Lina Marlina', 12),
(23, 'Hadi Pranoto', 12),
(24, 'Maya Sari', 13),
(25, 'Tono Susilo', 13),
(26, 'Vina Melati', 13),
(27, 'Eka Putri', 13),
(28, 'Dian Novita', 13),
(29, 'Fajar Nugroho', 14),
(30, 'Lia Ramadhani', 14),
(32, 'Titus Ericson', 10);

--
-- Triggers `peserta`
--
DELIMITER $$
CREATE TRIGGER `kurangi_kuota` AFTER INSERT ON `peserta` FOR EACH ROW BEGIN
    UPDATE todo 
    SET sisa_kuota = sisa_kuota - 1
    WHERE id = NEW.todo_id;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `kurangi_sisa_kuota` AFTER INSERT ON `peserta` FOR EACH ROW BEGIN
    UPDATE todo
    SET sisa_kuota = sisa_kuota - 1
    WHERE id = NEW.todo_id;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `tambah_kuota` AFTER DELETE ON `peserta` FOR EACH ROW BEGIN
    UPDATE todo
    SET sisa_kuota = sisa_kuota + 1
    WHERE id = OLD.todo_id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `todo`
--

CREATE TABLE `todo` (
  `id` int(11) NOT NULL,
  `event` varchar(50) NOT NULL,
  `tanggal` date NOT NULL,
  `lokasi` varchar(50) NOT NULL,
  `Kuota` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `sisa_kuota` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `todo`
--

INSERT INTO `todo` (`id`, `event`, `tanggal`, `lokasi`, `Kuota`, `user_id`, `sisa_kuota`) VALUES
(10, 'Workshop Web Development', '2025-12-14', 'Jakarta', 10, 1, 7),
(11, 'Seminar AI dan Machine Learning', '2025-12-18', 'Bandung', 5, 1, 3),
(12, 'Pelatihan Digital Marketing', '2025-12-10', 'Surabaya', 5, 1, 1),
(13, 'Konferensi Teknologi Informasi', '2025-12-05', 'Yogyakarta', 5, 1, 0),
(14, 'Webinar Keamanan Siber', '2025-12-12', 'Online', 5, 1, 3),
(22, 'RAPAT PPIF', '2025-12-12', 'UMN', 30, 1, 30);

--
-- Triggers `todo`
--
DELIMITER $$
CREATE TRIGGER `update_sisa_kuota` BEFORE UPDATE ON `todo` FOR EACH ROW BEGIN
    DECLARE peserta_count INT;

    
    SELECT COUNT(*) INTO peserta_count FROM peserta WHERE todo_id = NEW.id;

    
    SET NEW.sisa_kuota = NEW.Kuota - peserta_count;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `nama_lengkap` varchar(50) NOT NULL,
  `password` varchar(20) NOT NULL,
  `role` varchar(10) DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `nama_lengkap`, `password`, `role`) VALUES
(1, 'ziankoor', 'Aditya Zianur', 'zian', 'admin'),
(2, 'tesuser', 'Tes User', 'tes123', 'user'),
(3, 'tituseb', 'Titus Ericson', 'tituseb05', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `peserta`
--
ALTER TABLE `peserta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `todo_id` (`todo_id`);

--
-- Indexes for table `todo`
--
ALTER TABLE `todo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `peserta`
--
ALTER TABLE `peserta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `todo`
--
ALTER TABLE `todo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `peserta`
--
ALTER TABLE `peserta`
  ADD CONSTRAINT `peserta_ibfk_1` FOREIGN KEY (`todo_id`) REFERENCES `todo` (`id`);

--
-- Constraints for table `todo`
--
ALTER TABLE `todo`
  ADD CONSTRAINT `todo_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
