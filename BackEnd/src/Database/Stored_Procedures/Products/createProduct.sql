CREATE OR ALTER PROCEDURE createProduct(
    @product_id VARCHAR(250),
    @productname VARCHAR(250),
    @category_id VARCHAR(250),
    @quantity VARCHAR(250),
    @description VARCHAR(250),
    @price VARCHAR(255),
    @image VARCHAR(255)
   
  ) 
  AS
  BEGIN
    INSERT INTO Products(product_id, productname, category_id, quantity, description, price, image )
    VALUES(@product_id, @productname, @category_id, @quantity, @description, @price,  @image)
  END