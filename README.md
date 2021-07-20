"# todo-app" 
CREATE TABLE `task` (
  `id` int NOT NULL AUTO_INCREMENT,
  `taskName` varchar(255) DEFAULT NULL,
  `taskDes` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;