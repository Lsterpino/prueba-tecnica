CREATE DATABASE prueba_tecnica;
USE prueba_tecnica;
CREATE TABLE lugares ( 
	id INT AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    nombre_normalizado VARCHAR(255) NOT NULL,
    tipo CHAR(1) NOT NULL, -- B: bar | E: evento
    categoria VARCHAR(100) NOT NULL,
    ubicacion VARCHAR(255) NOT NULL,
    ubicacion_normalizada VARCHAR(255) NOT NULL,
    fecha_evento TIMESTAMP NULL,
    fuente VARCHAR(100),
    fecha_obtencion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activo CHAR(1) DEFAULT 'A', -- A: ACTIVO | B: BAJA
    PRIMARY KEY(id)
);

INSERT INTO lugares 
(nombre, nombre_normalizado, tipo, categoria, ubicacion, ubicacion_normalizada, fecha_evento, fuente, activo)
VALUES
('Bar Irlanda Tucuman', 'irlanda', 'B', 'pub', 'San Miguel de Tucumán','san miguel', NULL, 'manual', 'A'),
('Club 69', 'club 69', 'B', 'boliche', 'San Miguel de Tucumán','san miguel', NULL, 'manual', 'A'),
('Fiesta Electronica Club 69', 'electronica club 69', 'E', 'fiesta electronica', 'San Miguel de Tucumán', 'san miguel','2026-06-10 23:00:00', 'manual', 'A'),
('Recital Los Piojos', 'recital piojos', 'E', 'recital', 'San Miguel de Tucumán', 'san miguel','2026-06-15 21:00:00', 'manual', 'A'),
('Cafe 25', 'cafe 25', 'B', 'cafe', 'San Miguel de Tucumán','san miguel', NULL, 'manual', 'A');

select * from lugares;
