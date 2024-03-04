CREATE OR ALTER PROCEDURE createCategory(
    @category_id VARCHAR(250),
    @categoryname VARCHAR(250),
    @image VARCHAR(250)
  ) 
  AS
  BEGIN
    INSERT INTO Categories(category_id, categoryname, image)
    VALUES(@category_id, @categoryname, @image)
  END


