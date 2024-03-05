CREATE OR ALTER PROCEDURE createandInsertCart(
    @cart_id VARCHAR(250),
    @product_id VARCHAR(250),
    @user_id VARCHAR(250),
    @quantity INT
  ) 
  AS
  BEGIN
    INSERT INTO Cart(cart_id, product_id, user_id, quantity )
    VALUES(@cart_id, @product_id, @user_id, @quantity)
  END

