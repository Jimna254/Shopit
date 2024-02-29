CREATE OR ALTER PROCEDURE IfCategoryExists
    @categoryname VARCHAR(255)

AS
BEGIN
    
    SELECT * FROM Categories WHERE categoryname = @categoryname
END;