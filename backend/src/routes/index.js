import Router from 'express';

const router = Router();

router.get('/api', (req, res) => {
  res.status(200).send('CRUD Node.js + PostgreSQL API');
});

export default router;