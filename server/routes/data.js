const express = require('express');
const router = express.Router();
const { getdata, create, getdatas } = require('../controllers/Datacontroller');

router.post('/', getdata);
router.post('/create', create);
router.post('/s', getdatas);



module.exports = router