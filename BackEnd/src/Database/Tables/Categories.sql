CREATE TABLE Categories (
    category_id VARCHAR(255) PRIMARY KEY,
    categoryname VARCHAR(255)  NOT NULL,
    image VARCHAR(255)  NOT NULL,
    isdeleted BIT DEFAULT 0
);
DELETE FROM Categories;