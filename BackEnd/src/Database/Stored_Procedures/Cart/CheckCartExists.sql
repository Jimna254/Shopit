CREATE OR ALTER PROCEDURE CheckCartExists
    @user_id VARCHAR(255)
AS
BEGIN
    
    SELECT * FROM Cart WHERE user_id= @user_id;
  
END;