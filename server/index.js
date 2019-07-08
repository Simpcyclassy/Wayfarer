import bodyParser from 'body-parser';
import express from 'express';
import http from 'http';
import morgan from 'morgan';
import { config } from 'dotenv';

import users from '../routes/users';

config();
const app = express();
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const router = express.Router();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', users);


server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
