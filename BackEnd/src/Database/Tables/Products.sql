CREATE TABLE Products (
    product_id VARCHAR(255) PRIMARY KEY,
    productname VARCHAR(255)  NOT NULL,
    category_id VARCHAR(255) NOT NULL,
    quantity VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    price VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL, 
    isdeleted BIT DEFAULT 0
);

ALTER TABLE Products
ADD CONSTRAINT fk_Constraint
FOREIGN KEY (category_id)
REFERENCES Categories(category_id);


ALTER TABLE Products ALTER COLUMN quantity INT;
ALTER TABLE Products ALTER COLUMN price DECIMAL(10, 2);



