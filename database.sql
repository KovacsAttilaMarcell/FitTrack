CREATE DATABASE IF NOT EXISTS fittrack
CHARACTER SET utf8mb4
COLLATE utf8mb4_hungarian_ci;

USE fittrack;

CREATE TABLE IF NOT EXISTS edzesterv (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nev VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS gyakorlat (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nev VARCHAR(100) NOT NULL,
    edzesterv_id INT NOT NULL,
    CONSTRAINT fk_gyakorlat_edzesterv
        FOREIGN KEY (edzesterv_id)
        REFERENCES edzesterv(id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS edzesnaplo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    gyakorlat_id INT NOT NULL,
    ismetlesszam INT NOT NULL,
    terheles DECIMAL(6,2) NOT NULL,
    datum DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_edzesnaplo_gyakorlat
        FOREIGN KEY (gyakorlat_id)
        REFERENCES gyakorlat(id)
        ON DELETE CASCADE
);