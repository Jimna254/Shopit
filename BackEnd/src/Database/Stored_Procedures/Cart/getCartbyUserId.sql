CREATE OR ALTER PROCEDURE getCartbyUserId(@user_id VARCHAR(250))
AS
BEGIN
    SELECT * FROM Cart WHERE user_id = @user_id;

   
END;