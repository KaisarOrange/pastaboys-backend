CREATE TABLE auth_user (
    user_id bigserial PRIMARY KEY,
    email VARCHAR (255) UNIQUE NOT NULL ,
    username VARCHAR (50) NOT NULL, 
    password TEXT NOT NULL
);