import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import config from './config/config';
import Routes from './routes';

const app = express();
const { port } = config;

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1', Routes);

app.get('/', (req, res) => {
    res.json({ message: 'default routes' });
});

app.listen(port, () => console.log(`app starting on port: ${port}`));

export default app;
