INSERT INTO public.users(
    id, nickname, email, password, role, recovery_token, created_at, updated_at)
VALUES
    (1, 'usuario1', 'usuario@gmail.com', '$2b$10$IBKlQQccaNu43DG1l/vMF.PQkkJucHWf4xHAV/3M3X59AyybZWWUW', 'user', NULL, NOW(), NOW()),
    (2, 'usuario2', 'usuario2@gmail.com', '$2b$10$M/V9cb11D8mszPY4g/7DDu2p7JVnsC5Au4iz6FMCy0WFKZqs0mhxC', 'user', NULL, NOW(), NOW()),
    (3, 'usuario3', 'usuario3@gmail.com', '$2b$10$mmjIH9hW3fJCFCPLAGgBvugxq4vS8SqrLNzm1JbRzpexP8k9iijfW', 'user', NULL, NOW(), NOW()),
    (4, 'admin', 'admin@gmail.com', '$2b$10$Qx1eN85m0VoFMShPnUxi..IrvlavvDxIlJF1zM/f94P/GVbzJFP4i', 'admin', NULL, NOW(), NOW());




INSERT INTO public.rooms (
    id, "number", type, price, status, created_at, updated_at
) VALUES
    (1, 1001, 'single', 25.00, 'available', NOW(), NOW()),
    (2, 1002, 'single', 25.00, 'available', NOW(), NOW()),
    (3, 1003, 'single', 25.00, 'available', NOW(), NOW()),
    (4, 1004, 'single', 25.00, 'available', NOW(), NOW()),
    (6, 2001, 'double', 36.00, 'available', NOW(), NOW()),
    (7, 2002, 'double', 36.00, 'available', NOW(), NOW()),
    (8, 2003, 'double', 36.00, 'available', NOW(), NOW()),
    (9, 2004, 'double', 36.00, 'available', NOW(), NOW()),
    (10, 2005, 'double', 36.00, 'available', NOW(), NOW()),
    (11, 3001, 'triple', 51.00, 'available', NOW(), NOW()),
    (12, 3002, 'triple', 51.00, 'available', NOW(), NOW()),
    (13, 3003, 'triple', 51.00, 'available', NOW(), NOW()),
    (14, 3004, 'triple', 51.00, 'available', NOW(), NOW()),
    (15, 3005, 'triple', 51.00, 'available', NOW(), NOW()),
    (16, 4001, 'suite', 83.00, 'available', NOW(), NOW()),
    (17, 4002, 'suite', 83.00, 'available', NOW(), NOW()),
    (18, 4003, 'suite', 83.00, 'available', NOW(), NOW()),
    (19, 4004, 'suite', 83.00, 'available', NOW(), NOW()),
    (20, 4005, 'suite', 83.00, 'available', NOW(), NOW()),
    (5, 1005, 'single', 25.00, 'maintenance', NOW(), NOW());


INSERT INTO public.employees(
    id, first_name, middle_name, last_name, mother_last_name, email, phone, identification, status, created_at, updated_at)
VALUES 
    (1, 'Alejandro', 'Carlitos', 'romero', 'perez', 'alejandro@employeeHotel.com', '57+3129874456', 'ec-235698', 'active', current_timestamp, current_timestamp),
    (3, 'Mariana', 'Lupe', 'mendez', 'locomi', 'mariana@employeeHotel.com', '51+3129874456', 'col-235698', 'active', current_timestamp, current_timestamp),
    (4, 'Andrea', 'mere', 'mendez', 'locomi', 'andrea@employeeHotel.com', '51+3129874454', 'col-235694', 'active', current_timestamp, current_timestamp),
    (6, 'jose', 'camilo', 'Apellido1', 'ApellidoMadre', 'correo1@employeeHotel.com', '51+3129874457', 'col-111', 'active', current_timestamp, current_timestamp),
    (7, 'Nombre1', 'SegundoNombre2', 'Apellido1', 'ApellidoMadre', 'correo2@employeeHotel.com', '51+3129874458', 'col-8965', 'active', current_timestamp, current_timestamp),
    (8, 'Nombre3', 'SegundoNombre3', 'Apellido3', 'ApellidoMadre', 'correo3@employeeHotel.com', '51+3129874459', 'col-8963', 'active', current_timestamp, current_timestamp);
    
INSERT INTO public.guests(
    id, first_name, middle_name, last_name, mother_last_name, email, phone, identification, created_at, updated_at)
VALUES 
    (1, 'Juan', 'Carlos', 'García', 'López', 'juan@gmail.com', '1234567890', 'MX-123456', current_timestamp, current_timestamp),
    (2, 'María', 'Isabel', 'Rodríguez', 'Sánchez', 'maria@gmail.com', '9876543210', 'ES-789012', current_timestamp, current_timestamp),
    (3, 'Luis', 'Miguel', 'Martínez', 'Fernández', 'luis@gmail.com', '5432167890', 'AR-654321', current_timestamp, current_timestamp),
    (4, 'Ana', 'Sofía', 'Pérez', 'González', 'ana@gmail.com', '6789054321', 'CO-987654', current_timestamp, current_timestamp),
    (5, 'Diego', 'Alejandro', 'Hernández', 'Torres', 'diego@gmail.com', '8901234567', 'CL-765432', current_timestamp, current_timestamp),
    (6, 'Carla', 'Elena', 'Ramírez', 'Ruiz', 'carla@gmail.com', '7654321098', 'PE-543210', current_timestamp, current_timestamp),
    (7, 'Javier', 'Antonio', 'Santos', 'Silva', 'javier@gmail.com', '2345678901', 'VE-654321', current_timestamp, current_timestamp),
    (8, 'Isabel', 'Lucía', 'Gómez', 'Pérez', 'isabel@gmail.com', '4567890123', 'BO-432109', current_timestamp, current_timestamp),
    (9, 'Ricardo', 'Fernando', 'Díaz', 'Castro', 'ricardo@gmail.com', '3210987654', 'EC-321098', current_timestamp, current_timestamp),
    (10, 'Elena', 'Beatriz', 'López', 'Fernández', 'elena@gmail.com', '8901234567', 'PE-876543', current_timestamp, current_timestamp);
