CREATE OR ALTER PROCEDURE ifUserExists
    @email VARCHAR(255),
        @phone_number VARCHAR(255)

AS
BEGIN
    
    SELECT * FROM Users WHERE email = @email OR phone_number =@phone_number;
END;