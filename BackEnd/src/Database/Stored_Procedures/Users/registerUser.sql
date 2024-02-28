CREATE OR ALTER PROCEDURE registerUser(
    @user_id VARCHAR(250),
    @Fname VARCHAR(250),
    @Lname VARCHAR(250),
    @email VARCHAR(250) , 
    @password VARCHAR(200),
    @phone_number VARCHAR(255)
  ) 
  AS
  BEGIN
    INSERT INTO Users(user_id, Fname, Lname, email, Password, phone_number )
    VALUES(@user_id, @Fname, @Lname, @email, @password, @phone_number)
  END