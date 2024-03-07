CREATE OR ALTER PROCEDURE cancelOrder(@order_id VARCHAR(100))
AS
BEGIN
    UPDATE Orders SET isCancel = 1 WHERE order_id = @order_id
END