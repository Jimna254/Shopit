CREATE OR ALTER PROCEDURE updateUser(
    @user_id VARCHAR(300),
    @Fname VARCHAR(250),
    @Lname VARCHAR(250),
    @email VARCHAR(100),
    @phone_number VARCHAR (250)
    
)
AS
BEGIN
    UPDATE Users SET 
        Fname = @Fname,
        Lname = @Lname, 
        email = @email, 
        phone_number = @phone_number
        
    WHERE user_id = @user_id
END