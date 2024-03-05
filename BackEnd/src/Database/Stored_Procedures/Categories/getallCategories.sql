CREATE OR ALTER PROCEDURE getallCategories
AS
BEGIN
    SELECT * FROM Categories WHERE isdeleted = 0;  
END;