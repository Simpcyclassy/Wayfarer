import dotenv from 'dotenv';
import {Pool} from 'pg';
import config from '../config/config';


dotenv.config();
const env = process.env.NODE_ENV;
const pool = new Pool({connectionString: config.databaseUrl[env]});

pool.on('error', (err) => {
    console.log(err);
});

const migrate = pool.query (`DROP TABLE IF EXISTS users CASCADE;
    CREATE TABLE users (
        id SERIAL NOT NULL PRIMARY KEY,
        user_id SERIAL,
        email VARCHAR NOT NULL UNIQUE,
        first_name VARCHAR NOT NULL,
        last_name VARCHAR NOT NULL,
        password VARCHAR NOT NULL,
        is_admin BOOLEAN NOT NULL DEFAULT false
    );
    INSERT INTO users (
        id, user_id, first_name, last_name, email, password, is_admin, password ) 
        VALUES (
             0,
             0,
            'Chioma', 
            'Onyekpere', 
            'admin@mail.com',
            'true', 
            'wayfarer'
    );

    DROP TABLE IF EXISTS buses CASCADE;
    CREATE TABLE buses (
        bus_id SERIAL NOT NULL,
        number_plate VARCHAR NOT NULL,
        manufacturer VARCHAR NOT NULL,
        model VARCHAR NOT NULL,
        year VARCHAR NOT NULL,
        capacity INTEGER NOT NULL
    );
    INSERT INTO buses (
        bus_id, number_plate, manufacturer, model, year, capacity ) 
        VALUES (
         1,
        'MA-008-TH', 
        'peugeot', 
        'peugeot boxer 440', 
        '2015', 
        '17'
    );
        VALUES (
         2,
        'MA-008-TH', 
        'peugeot', 
        'peugeot boxer 334', 
        '2008', 
        '13'
    );
        VALUES (
         3,
        'MA-008-TH', 
        'peugeot', 
        'peugeot boxer 333', 
        '2016', 
        '4'
    );

    DROP TABLE IF EXISTS trips CASCADE;
    CREATE TABLE trips (
        trip_id SERIAL NOT NULL,
        bus_id INTEGER NOT NULL REFERENCES buses(bus_id),
        origin VARCHAR NOT NULL,
        destination VARCHAR NOT NULL,
        trip_date TIMESTAMP,
        fare NUMERIC NOT NULL,
        status VARCHAR NOT NULL DEFAULT 'active'
    )
    INSERT INTO buses (
        trip_id, bus_id, origin, destination, trip_date, fare, status ) 
        VALUES (
         3,
         3,
        'owerri', 
        'aba', 
        '2020-08-26 09:00:50 +0000',
         500
        'active' 
    );

    DROP TABLE IF EXISTS bookings CASCADE;
    CREATE TABLE bookings (
        booking_id SERIAL NOT NULL,
        trip_id INTEGER NOT NULL REFERENCES trips(trip_id),
        user_id INTEGER NOT NULL REFERENCES users(bus_id),
        created_on DATE NOT NULL DEFAULT NOW(),
        seat_number INTEGER NOT NULL,
    )
    INSERT INTO bookings (
        booking_id, trip_id, user_id, created_on, seat_number ) 
        VALUES (
         4,
         4,
         4, 
        '2020-08-26 09:00:50 +0000',
         6
    );
`);

export default migrate;