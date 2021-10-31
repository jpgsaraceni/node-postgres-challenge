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

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cookieParser());

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  // allowedHeaders: 'authorization'
}
app.use(cors(corsOptions));

app.use(index);
app.use('/login', loginRoute);
app.use('/logout', logoutRoute);
app.use('/products', productRoute);
app.use('/product_groups', productGroupRoute);
app.use('/suppliers', supplierRoute);
app.use('/users', userRoute);
app.use('/restore', restoreRoute);
app.use('/purchases', purchaseRoute);
app.use('/purchase_items', purchaseItemsRoute);
app.use('/payables', payablesRoute);

export default app;