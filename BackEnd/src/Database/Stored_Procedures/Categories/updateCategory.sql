CREATE OR ALTER PROCEDURE updateCategory(
   @category_id VARCHAR(250),
    @categoryname VARCHAR(250),
    @image VARCHAR(250)
)
AS
BEGIN
    UPDATE Categories SET 
        categoryname = @categoryname,
        image = @image
        
        
    WHERE category_id = @category_id
END