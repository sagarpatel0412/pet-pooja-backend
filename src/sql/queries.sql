CREATE DATABASE IF NOT EXISTS petpooja_backend;

use petpooja_backend;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS expenses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    category_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    date DATE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

INSERT INTO users (name, email, status) VALUES
('John Doe', 'john.doe@example.com', 'active'),
('Alice Johnson', 'alice.johnson@example.com', 'active');


INSERT INTO categories (name) VALUES
('Food & Dining'),
('Transport'),
('Entertainment'),
('Shopping'),
('Healthcare'),
('Utilities'),
('Rent'),
('Education'),
('Travel'),
('Savings & Investments');

INSERT INTO expenses (user_id, category_id, amount, date, description) VALUES
(1, 1, 150.50, '2024-03-01', 'Groceries from Walmart'),
(2, 3, 75.20, '2024-03-02', 'Dinner at a restaurant'),
(1, 5, 200.00, '2024-03-03', 'Monthly gym membership'),
(2, 7, 450.75, '2024-03-04', 'Bought a new gadget'),
(1, 2, 120.99, '2024-03-05', 'Clothing shopping'),
(2, 4, 95.50, '2024-03-06', 'Electricity bill payment'),
(1, 6, 60.00, '2024-03-07', 'Taxi fare'),
(2, 8, 300.25, '2024-03-08', 'Online course subscription'),
(1, 3, 45.99, '2024-03-09', 'Coffee shop meetup'),
(2, 1, 250.00, '2024-03-10', 'Weekly grocery shopping');
