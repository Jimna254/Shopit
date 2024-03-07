CREATE TABLE Categories (
    category_id VARCHAR(255) PRIMARY KEY,
    categoryname VARCHAR(255)  NOT NULL,
    image VARCHAR(255)  NOT NULL,
    isdeleted BIT DEFAULT 0
);
DELETE FROM Categories;

SELECT 
        P.*,
        C.categoryname AS CategoryName 
    FROM    
        Products P
        INNER JOIN Categories C ON P.category_id = C.category_id
    WHERE 
        P.isDeleted = 0