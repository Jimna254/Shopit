CREATE OR ALTER PROCEDURE getProductsbyCategoryId
    @category_id VARCHAR(250)
AS
BEGIN
    SELECT 
        p.*, 
        c.categoryname 
    FROM 
        Products p
    INNER JOIN Categories c ON 
        p.category_id = c.category_id 
    WHERE 
        p.category_id = @category_id;
END;
