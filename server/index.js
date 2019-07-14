import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import http from 'http';
import morgan from 'morgan';
import { config } from 'dotenv';

import usersRouter from '../routes';

config();

const app = express();
const PORT = parseInt(process.env.PORT, 10) || 5000;
const router = express.Router();
app.use(cookieParser());

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/v1/user', usersRouter(router));

const server = http.createServer(app);
server.listen(PORT, () => console.log(`App running on port ${PORT}`));
