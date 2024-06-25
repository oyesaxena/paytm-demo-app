const express = require('express');
const cors = require('cors');
const rootRouter = require('./routes/index');
import userRouter from './routes/user';
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1', rootRouter);

app.use('/api/v1/user', userRouter);

app.listen(3000);
