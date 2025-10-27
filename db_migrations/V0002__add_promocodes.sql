CREATE TABLE promocodes (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    discount_percent INTEGER NOT NULL CHECK (discount_percent >= 0 AND discount_percent <= 100),
    max_uses INTEGER NOT NULL DEFAULT 1,
    used_count INTEGER DEFAULT 0,
    season VARCHAR(100),
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP
);

CREATE INDEX idx_promocodes_code ON promocodes(code);
CREATE INDEX idx_promocodes_active ON promocodes(active);

CREATE TABLE promocode_usage (
    id SERIAL PRIMARY KEY,
    promocode_id INTEGER REFERENCES promocodes(id),
    order_id VARCHAR(50) REFERENCES orders(order_id),
    used_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_promocode_usage_promocode_id ON promocode_usage(promocode_id);

ALTER TABLE orders ADD COLUMN promocode VARCHAR(50);
ALTER TABLE orders ADD COLUMN discount_amount INTEGER DEFAULT 0;
ALTER TABLE orders ADD COLUMN final_price INTEGER;