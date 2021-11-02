import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import index from './routes/index.js';
import productRoute from './routes/product.routes.js';
import loginRoute from './routes/login.routes.js';
import productGroupRoute from './routes/productGroup.routes.js';
import supplierRoute from './routes/supplier.routes.js';
import userRoute from './routes/user.routes.js';
import restoreRoute from './routes/restore.routes.js';
import purchaseRoute from './routes/purchase.routes.js';
import purchaseItemsRoute from './routes/purchaseItems.routes.js';
import payablesRoute from './routes/payables.routes.js';
import logoutRoute from './routes/logout.routes.js';
/**
 * API entry point
 */
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cookieParser());

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
}
app.use(cors(corsOptions));

app.use(index); // TODO refactor
app.use('/login', loginRoute);// refactor ok
app.use('/logout', logoutRoute); // refactor ok
app.use('/products', productRoute);// TODO refactor
app.use('/product_groups', productGroupRoute);// TODO refactor
app.use('/suppliers', supplierRoute);// refactor ok
app.use('/users', userRoute); // refactor ok 
app.use('/restore', restoreRoute);// TODO refactor
app.use('/purchases', purchaseRoute);// TODO refactor
app.use('/purchase_items', purchaseItemsRoute);// TODO refactor
app.use('/payables', payablesRoute);// TODO refactor

export default app;