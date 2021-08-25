import express from 'express';

const router = express.Router();

router.get('/api', (req, res) => {
  res.send(200).send({ message: 'CRUD Node.js + PostgreSQL API' });
});

export default router;