CREATE OR ALTER PROCEDURE addProductToCart
    @cart_id VARCHAR(100),
    @product_id VARCHAR(200),
    @quantity INT
AS
BEGIN
    SET NOCOUNT ON;

   
    DECLARE @user_id VARCHAR(200);

   
    SELECT @user_id = user_id FROM Cart WHERE cart_id = @cart_id;

    
    IF EXISTS (SELECT 1 FROM Cart WHERE cart_id = @cart_id AND product_id = @product_id)
    BEGIN
   
        UPDATE Cart
        SET quantity = quantity + @quantity
        WHERE cart_id = @cart_id AND product_id = @product_id;
    END
    ELSE
    BEGIN
        
        IF @user_id IS NOT NULL
        BEGIN
            INSERT INTO Cart (cart_id, user_id, product_id, quantity)
            VALUES (@cart_id, @user_id, @product_id, @quantity);
        END
        ELSE
        BEGIN
            
            RAISERROR('User ID not found for the given cart ID.', 16, 1);
            RETURN;
        END
    END

    
    SELECT p.*, c.quantity
    FROM Products p
    INNER JOIN Cart c ON p.product_id = c.product_id
    WHERE c.cart_id = @cart_id AND c.product_id = @product_id;
END;
GO