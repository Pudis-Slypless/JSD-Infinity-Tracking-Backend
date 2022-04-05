const express = require('express');

const recordRouter = require('./record');

const router = express.Router();

router.use('/me/records', recordRouter);

router.post('/login', (req, res, next) => {});
router.post('/register', (req, res, next) => {});
router.get('/me', (req, res, next) => {});
router.put('/me', (req, res, next) => {});

module.exports = router;
