CREATE OR ALTER PROCEDURE deleteCart(@cart_id VARCHAR(250))
AS
BEGIN
 UPDATE Cart SET isdeleted = 1 WHERE cart_id = @cart_id;

END;