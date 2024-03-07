CREATE OR ALTER PROCEDURE deleteItemCart
    @cart_id VARCHAR(100),
    @product_id VARCHAR(200)
AS
BEGIN
    DELETE FROM Cart
    WHERE cart_id = @cart_id AND product_id = @product_id;
END;
