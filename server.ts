import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
const get = require('./order/order-routes');
const cors = require('cors');
dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/order', get);
//app.use(express.urlencoded());

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
