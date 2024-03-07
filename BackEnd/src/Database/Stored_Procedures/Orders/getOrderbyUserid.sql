CREATE OR ALTER PROCEDURE getOrderByUserId
    @user_id VARCHAR(100)
AS
BEGIN
    SELECT 
        o.order_id, 
        o.user_id, 
        o.cart_id, 
        o.created_at AS order_created_at,
        o.isCancel,
        o.status,
       
        STRING_AGG(c.product_id, ', ') AS product_ids,
        STRING_AGG(p.productname, ', ') AS product_names,  
        STRING_AGG(CAST(c.quantity AS VARCHAR), ', ') AS quantities,
        STRING_AGG(CAST(c.total_price AS VARCHAR), ', ') AS total_prices
    FROM Orders o
    INNER JOIN Cart c ON o.cart_id = c.cart_id
    INNER JOIN Products p ON c.product_id = p.product_id
    WHERE o.user_id = @user_id 
      AND c.isCheckOut = 1 
      AND c.isdeleted = 0
      AND o.isCancel = 0
    GROUP BY 
        o.order_id,
        o.user_id,
        o.cart_id,
        o.created_at,
        o.isCancel,
        o.status
END;