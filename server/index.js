import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import http from 'http';
import morgan from 'morgan';
import config from '../config/config';
import Routes from '../routes';

const app = express();
const { port, env } = config;
// const PORT = parseInt(process.env.PORT, 10) || 5000;
app.use(cookieParser());

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/v1', Routes);

app.get('/', (req, res ) => {
    res.json({ message: 'default routes' });
});

app.listen(port, () => console.log(`app starting on port: ${port}`));

export default app;