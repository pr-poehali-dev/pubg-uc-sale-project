CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    purchase_amount INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_visible BOOLEAN DEFAULT true
);

CREATE INDEX idx_reviews_visible_created ON reviews(is_visible, created_at DESC);

INSERT INTO reviews (customer_name, rating, comment, purchase_amount, created_at) VALUES
('Алексей М.', 5, 'Быстро и надёжно! UC пришли через 5 минут после оплаты. Рекомендую!', 325, NOW() - INTERVAL '7 days'),
('Мария К.', 5, 'Покупаю здесь уже третий раз. Всегда всё чётко, цены отличные 👍', 600, NOW() - INTERVAL '5 days'),
('Дмитрий П.', 5, 'Сначала переживал, но всё прошло супер! Поддержка быстро ответила на вопросы', 1800, NOW() - INTERVAL '3 days'),
('Анна С.', 4, 'Хороший сервис, UC получила быстро. Минус звезда за то, что иногда долго отвечают', 325, NOW() - INTERVAL '2 days'),
('Игорь В.', 5, 'Лучшие цены на UC! Проверял много магазинов - здесь выгоднее всего', 3850, NOW() - INTERVAL '1 day'),
('Елена Т.', 5, 'Всё отлично! Заказала через телеграм-бот, очень удобно', 600, NOW() - INTERVAL '12 hours');