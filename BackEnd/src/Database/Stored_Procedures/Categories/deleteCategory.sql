CREATE OR ALTER PROCEDURE deleteCategory(@category_id VARCHAR(250))
AS
BEGIN
 UPDATE Categories SET isdeleted = 1 WHERE category_id = @category_id ;

END;

