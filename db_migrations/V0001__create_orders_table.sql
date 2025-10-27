CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(50) UNIQUE NOT NULL,
    player_id VARCHAR(100) NOT NULL,
    player_name VARCHAR(255) NOT NULL,
    contact VARCHAR(255) NOT NULL,
    uc_amount INTEGER NOT NULL,
    price INTEGER NOT NULL,
    bonus VARCHAR(100),
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_orders_status ON orders(status);