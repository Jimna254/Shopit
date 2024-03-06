CREATE OR ALTER PROCEDURE checkoutCart(@cart_id VARCHAR(100))
AS
BEGIN
    UPDATE Cart SET isCheckOut = 1 WHERE cart_id = @cart_id 
END