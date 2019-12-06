-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Hôte : mysql-kevinnave.alwaysdata.net
-- Généré le :  ven. 06 déc. 2019 à 17:47
-- Version du serveur :  10.3.17-MariaDB
-- Version de PHP :  7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `kevinnave_bdd`
--

-- --------------------------------------------------------

--
-- Structure de la table `cours`
--

CREATE TABLE `cours` (
  `id_cours` int(5) NOT NULL,
  `intitule` varchar(128) NOT NULL,
  `intervenant_cours` int(5) DEFAULT NULL,
  `promotion` int(5) DEFAULT NULL,
  `Date_cours` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `cours`
--

INSERT INTO `cours` (`id_cours`, `intitule`, `intervenant_cours`, `promotion`, `Date_cours`) VALUES
(1, 'Veille Techno', 1, 1, '2019-12-04'),
(2, 'Algorithmique', 2, 1, '2019-12-03'),
(3, 'Algorithmique', 3, 1, '2019-12-02'),
(4, 'Gestion de Projet', 4, 1, '2019-12-05'),
(5, 'ASO', 5, 1, '2019-12-06'),
(6, 'Prog Java', 3, 1, '2019-12-08');

-- --------------------------------------------------------

--
-- Structure de la table `etudiant`
--

CREATE TABLE `etudiant` (
  `id_etudiant` int(5) NOT NULL,
  `nom` varchar(64) NOT NULL,
  `prenom` varchar(64) NOT NULL,
  `promo_etudiante` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;

--
-- Déchargement des données de la table `etudiant`
--

INSERT INTO `etudiant` (`id_etudiant`, `nom`, `prenom`, `promo_etudiante`) VALUES
(1, 'Beuchotte', 'Thomas', 1),
(2, 'Beuchotte', 'Thomas', 2),
(3, 'Nave', 'Kévin', 1);

-- --------------------------------------------------------

--
-- Structure de la table `intervenant`
--

CREATE TABLE `intervenant` (
  `id_intervenant` int(5) NOT NULL,
  `nom_i` varchar(64) NOT NULL,
  `prenom_i` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `intervenant`
--

INSERT INTO `intervenant` (`id_intervenant`, `nom_i`, `prenom_i`) VALUES
(1, 'Coder', 'Bryan'),
(2, 'Martin', 'David'),
(3, 'Pichon', 'Florian'),
(4, 'Gueron', 'Catherine'),
(5, 'Roussel', 'Eric');

-- --------------------------------------------------------

--
-- Structure de la table `promotion`
--

CREATE TABLE `promotion` (
  `id_promo` int(5) NOT NULL,
  `formation` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `promotion`
--

INSERT INTO `promotion` (`id_promo`, `formation`) VALUES
(1, 'RIL'),
(2, 'RIL DEVOPS'),
(3, 'RISR');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `cours`
--
ALTER TABLE `cours`
  ADD PRIMARY KEY (`id_cours`),
  ADD KEY `FK_intervenant` (`intervenant_cours`),
  ADD KEY `FK_promotion` (`promotion`);

--
-- Index pour la table `etudiant`
--
ALTER TABLE `etudiant`
  ADD PRIMARY KEY (`id_etudiant`),
  ADD KEY `FK_promotion_etudiant` (`promo_etudiante`);

--
-- Index pour la table `intervenant`
--
ALTER TABLE `intervenant`
  ADD PRIMARY KEY (`id_intervenant`);

--
-- Index pour la table `promotion`
--
ALTER TABLE `promotion`
  ADD PRIMARY KEY (`id_promo`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `cours`
--
ALTER TABLE `cours`
  MODIFY `id_cours` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `etudiant`
--
ALTER TABLE `etudiant`
  MODIFY `id_etudiant` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `intervenant`
--
ALTER TABLE `intervenant`
  MODIFY `id_intervenant` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `promotion`
--
ALTER TABLE `promotion`
  MODIFY `id_promo` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `cours`
--
ALTER TABLE `cours`
  ADD CONSTRAINT `FK_intervenant` FOREIGN KEY (`intervenant_cours`) REFERENCES `intervenant` (`id_intervenant`),
  ADD CONSTRAINT `FK_promotion` FOREIGN KEY (`promotion`) REFERENCES `promotion` (`id_promo`),
  ADD CONSTRAINT `cours_ibfk_1` FOREIGN KEY (`promotion`) REFERENCES `promotion` (`id_promo`);

--
-- Contraintes pour la table `etudiant`
--
ALTER TABLE `etudiant`
  ADD CONSTRAINT `FK_promotion_etudiant` FOREIGN KEY (`promo_etudiante`) REFERENCES `promotion` (`id_promo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
