CREATE TABLE auth_user (
    user_id bigserial PRIMARY KEY,
    email VARCHAR (255) UNIQUE NOT NULL ,
    username VARCHAR (50) NOT NULL, 
    password TEXT NOT NULL
);

SELECT orders.order_id, customer_id, product.product_id, quantity, note, name, price from orders 
INNER JOIN order_product on orders.order_id = order_product.order_id
INNER JOIN product on order_product.product_id = product.product_id