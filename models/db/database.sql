CREATE DATABASE wayfarer_api;

CREATE TABLE users(
    id SERIAL NOT NULL PRIMARY KEY,
    email VARCHAR(128) UNIQUE NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    is_admin BOOLEAN NOT NULL
    password VARCHAR(128) NOT NULL,
    created_date TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'WAT'),
    modified_date TIMESTAMP WITHOUT TIME ZONE,
    FOREIGN KEY (owner_id) REFERENCES users (id) ON DELETE CASCADE
);