CREATE DATABASE wayfarer_api;

CREATE TABLE users(
    id SERIAL NOT NULL PRIMARY KEY,
    user_id SERIAL,
    email VARCHAR NOT NULL UNIQUE,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT false
);
