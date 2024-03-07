CREATE OR ALTER PROCEDURE CheckProductInCart
    @product_id VARCHAR(255),
    @cart_id VARCHAR(255)
    
AS
BEGIN
    
    SELECT * FROM Cart WHERE product_id= @product_id AND cart_id = @cart_id ;
  
END;