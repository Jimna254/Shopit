CREATE OR ALTER PROCEDURE createCart(
        @cart_id VARCHAR(100), 
        @user_id VARCHAR(200),
        @product_id VARCHAR(200),
        @total_price INT
       
    )
AS
BEGIN
    INSERT INTO Cart(cart_id, user_id, product_id, total_price)
    VALUES(@cart_id, @user_id, @product_id, @total_price)
END