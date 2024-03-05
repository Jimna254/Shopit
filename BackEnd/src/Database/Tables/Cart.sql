CREATE TABLE Cart (
    cart_id VARCHAR(255) PRIMARY KEY,
    product_id VARCHAR(255) NOT NULL,
    quantity INTEGER CHECK (quantity > 0),
    user_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES Products(product_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

ALTER TABLE Cart
ADD isCheckout BIT DEFAULT 0;

ALTER TABLE Cart
ADD isdeleted BIT DEFAULT 0;

