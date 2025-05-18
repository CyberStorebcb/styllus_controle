-- Criação da tabela de produtos
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 0
);

-- Inserção de produtos de exemplo
INSERT INTO products (name, quantity) VALUES
  ('Camiseta Polo', 10),
  ('Calça Jeans', 5),
  ('Tênis Esportivo', 8),
  ('Jaqueta de Couro', 2);