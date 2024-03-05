CREATE OR ALTER PROCEDURE createandInsertCart(
    @cart_id VARCHAR(250),
    @product_id VARCHAR(250),
    @user_id VARCHAR(250),
    @quantity INT
) 
AS
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM Cart WHERE user_id = @user_id
    )
    BEGIN
        INSERT INTO Cart (cart_id, product_id, user_id, quantity)
        VALUES (@cart_id, @product_id, @user_id, @quantity);
    END
    ELSE
    BEGIN
        UPDATE Cart
        SET product_id = @product_id,
            quantity = @quantity
        WHERE user_id = @user_id;
    END
END
