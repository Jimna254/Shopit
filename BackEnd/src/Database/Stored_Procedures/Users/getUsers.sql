CREATE OR ALTER PROCEDURE getUsers
AS
BEGIN
    SELECT * FROM Users WHERE isdeleted = 0;
   
END;