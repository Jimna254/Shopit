CREATE TABLE Cart (
    cart_id VARCHAR(255) ,
    product_id VARCHAR(255) NOT NULL,
    quantity INTEGER CHECK (quantity > 0),
    user_id VARCHAR(255) NOT NULL,
    isCheckout BIT DEFAULT 0 NOT NULL,
    isdeleted BIT DEFAULT 0 NOT NULL,
    FOREIGN KEY (product_id) REFERENCES Products(product_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

DROP TABLE Cart

ALTER TABLE Cart
ADD isCheckout BIT DEFAULT 0;

ALTER TABLE Cart
ADD isdeleted BIT DEFAULT 0;

ALTER TABLE Cart
ADD total_price INT;


ALTER TABLE cart
ADD quantity INT;
