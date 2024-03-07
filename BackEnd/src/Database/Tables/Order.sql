CREATE TABLE Orders (
    order_id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    product_id VARCHAR(255) NOT NULL,
    cart_id VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT GETDATE(),
    isCancel BIT NOT NULL DEFAULT 0,
    status VARCHAR(255) NOT NULL DEFAULT 'Pending',
    FOREIGN KEY (product_id) REFERENCES Products(product_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
     
);

ALTER TABLE Orders
ADD CONSTRAINT FK_Orders_Cart
FOREIGN KEY (cart_id) REFERENCES Cart(cart_id);

ALTER TABLE Orders
DROP CONSTRAINT FK__Orders__product___0F624AF8

ALTER TABLE Orders
DROP COLUMN product_id;