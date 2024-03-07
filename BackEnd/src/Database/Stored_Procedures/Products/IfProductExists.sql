CREATE OR ALTER PROCEDURE IfProductExists
    @productname VARCHAR(255)

AS
BEGIN
    
    SELECT * FROM Products WHERE productname = @productname AND isdeleted = 0;
END;