CREATE OR ALTER PROCEDURE getOneProduct(@product_id VARCHAR(250))
AS
BEGIN
    SELECT * FROM Products WHERE product_id = @product_id;

   
END;