CREATE OR ALTER PROCEDURE updateProduct(
   @product_id VARCHAR(250),
    @productname VARCHAR(250),
    @category_id VARCHAR(250),
    @quantity INT,
    @description VARCHAR(250),
    @price DECIMAL(38),
    @image VARCHAR(255)  
)
AS
BEGIN
    UPDATE Products SET 
        productname = @productname,
        category_id = @category_id,
        quantity =@quantity ,
        description = @description,
        price= @price,
        image = @image
        
    WHERE product_id = @product_id
END