CREATE OR ALTER PROCEDURE getCartbyUserId(@user_id VARCHAR(250))
AS
BEGIN
    SELECT 
    Cart.cart_id, 
    Cart.product_id, 
    Cart.quantity, 
    Cart.user_id, 
    Cart.isCheckout, 
    Products.productname, 
    Products.image, 
    Products.price, 
    Products.description
FROM 
    Cart
JOIN 
    Products ON Cart.product_id = Products.product_id
    WHERE user_id = @user_id;

   
END;

