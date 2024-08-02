CREATE hotel_db;
USE hotel_db;
DROP TABLE pagamentos;
CREATE TABLE cliente;
SHOW TABLES;

SELECT * FROM clientes;
SELECT * FROM quartos;
SELECT * FROM reservas;

INSERT INTO clientes (nome, email, telefone, createdAt, updatedAt) VALUES
('Ana Silva', 'ana.silva@email.com', '(11) 91234-5678', NOW(), NOW()),
('João Pereira', 'joao.pereira@email.com', '(21) 99876-5432', NOW(), NOW()),
('Maria Oliveira', 'maria.oliveira@email.com', '(31) 91234-1111', NOW(), NOW()),
('Carlos Souza', 'carlos.souza@email.com', '(41) 97777-2222', NOW(), NOW()),
('Fernanda Ribeiro', 'fernanda.ribeiro@email.com', '(51) 95555-3333', NOW(), NOW());

INSERT INTO reservas (data_check_in, data_check_out, status, createdAt, updatedAt, clienteId) VALUES
('2024-08-01', '2024-08-05', 'Confirmada', NOW(), NOW(), 1),
('2024-08-10', '2024-08-15', 'Confirmada', NOW(), NOW(), 2),
('2024-09-01', '2024-09-05', 'Cancelada', NOW(), NOW(), 3),
('2024-08-20', '2024-08-25', 'Confirmada', NOW(), NOW(), 4),
('2024-08-15', '2024-08-20', 'Confirmada', NOW(), NOW(), 5);

INSERT INTO quartos (numero, tipo, descricao, preco, situacao, reservaId, createdAt, updatedAt) VALUES
(101, 'Standard', 'Quarto simples com cama de casal', 150.00, 'disponível', NULL, NOW(), NOW()),
(102, 'Deluxe', 'Quarto com vista para o mar', 250.00, 'disponível', NULL, NOW(), NOW()),
(103, 'Suite', 'Suite com sala de estar e jacuzzi', 400.00, 'reservado', 2, NOW(), NOW()),
(104, 'Standard', 'Quarto simples com duas camas', 160.00, 'disponível', NULL, NOW(), NOW()),
(105, 'Suite Deluxe', 'Suite com terraço e vista panorâmica', 500.00, 'reservado', 3, NOW(), NOW()),
(106, 'Standard', 'Quarto simples com cama de solteiro', 120.00, 'disponível', NULL, NOW(), NOW()),
(107, 'Deluxe', 'Quarto com varanda', 270.00, 'disponível', NULL, NOW(), NOW()),
(108, 'Suite', 'Suite com mini-cozinha', 380.00, 'reservado', 4, NOW(), NOW()),
(109, 'Standard', 'Quarto com cama king-size', 180.00, 'disponível', NULL, NOW(), NOW()),
(110, 'Suite Deluxe', 'Suite com banheira de hidromassagem', 550.00, 'reservado', 5, NOW(), NOW());

INSERT INTO pagamentos (reservaId, clienteId, dataPagamento, valor, metodoPagamento, createdAt, updatedAt) VALUES
(1, 1, '2024-07-25', 800.00, 'Cartão de Crédito', NOW(), NOW()),
(2, 2, '2024-08-05', 1250.00, 'Boleto Bancário', NOW(), NOW()),
(3, 3, '2024-08-20', 1200.00, 'Transferência Bancária', NOW(), NOW()),
(4, 4, '2024-08-18', 2000.00, 'Cartão de Crédito', NOW(), NOW()),
(5, 5, '2024-08-10', 2500.00, 'Cartão de Crédito', NOW(), NOW());
