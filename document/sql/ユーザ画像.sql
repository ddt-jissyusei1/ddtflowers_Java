CREATE TABLE 
	user_image (
		id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
		user_key INT NOT NULL,
		name VARCHAR(200) NOT NULL DEFAULT '',
		unique_name VARVHAR(210) NOT NULL,
		description TEXT,
		update_timestamp TIMESTAMP(8)
	)
	TYPE=innodb;