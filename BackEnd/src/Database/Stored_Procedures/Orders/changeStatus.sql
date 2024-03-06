CREATE OR ALTER PROCEDURE changeStatus
    @order_id VARCHAR(100)
AS
BEGIN
    UPDATE Orders 
    SET status = 'InTransit' 
    WHERE order_id = @order_id;

END;
