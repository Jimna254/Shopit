CREATE OR ALTER PROCEDURE deleteProduct(@product_id VARCHAR(250))
AS
BEGIN
 UPDATE Products SET isdeleted = 1 WHERE product_id = @product_id;

END;