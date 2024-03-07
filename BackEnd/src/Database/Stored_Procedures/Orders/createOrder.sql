CREATE OR ALTER PROCEDURE createOrder
    @order_id VARCHAR(100),
    @cart_id VARCHAR(100),
    @user_id VARCHAR(200)
    
AS
BEGIN
    
    IF EXISTS(SELECT 1 FROM Cart WHERE cart_id = @cart_id AND isCheckout = 1)
    BEGIN
        INSERT INTO Orders(order_id, cart_id, user_id)
        VALUES(@order_id, @cart_id, @user_id)
    END
    ELSE
    BEGIN
        
        PRINT 'The cart is either not checked out or does not exist.'
    END
END;

SELECT * FROM Orders 