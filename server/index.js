import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import jsend from 'jsend'; 
import debug from 'debug';
import express from 'express';
import http from 'http';
import morgan from 'morgan';
import '@babel/polyfill';
import { config } from 'dotenv';

import usersRouter from '../routes';
config();

const app = express();
const PORT = process.env.PORT || 5000;
const router = express.Router();
app.use(cookieParser());

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(jsend.middleware);

app.use('/api/v1/user', usersRouter(router));
app.get('*', (req, res) => res.jsend.success('Invana!!!'));


const server = http.createServer(app);
server.listen(PORT, () => console.log(`App running on port ${PORT}`));
