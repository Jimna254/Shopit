CREATE OR ALTER PROCEDURE getAllOrders
AS
BEGIN
    SELECT 
        O.order_id,
        O.user_id,
        U.Fname AS user_name, 
        O.cart_id,
        O.created_at AS order_created_at,
        O.isCancel,
        O.status,
        STRING_AGG(C.product_id, ', ') AS product_ids,
        STRING_AGG(P.productname, ', ') AS product_names,  
        STRING_AGG(CAST(C.quantity AS VARCHAR), ', ') AS quantities,
        STRING_AGG(CAST(C.total_price AS VARCHAR), ', ') AS total_prices
    FROM    
        Orders O
        INNER JOIN Cart C ON O.cart_id = C.cart_id 
        INNER JOIN Products P ON C.product_id = P.product_id
        INNER JOIN Users U ON O.user_id = U.user_id
    WHERE 
        C.isCheckout = 1 AND C.isdeleted = 0 AND O.isCancel = 0
    GROUP BY 
        O.order_id,
        O.user_id,
        U.Fname,
        O.cart_id,
        O.created_at,
        O.isCancel,
        O.status
END;