const express = require('express');
const packets = require('../controllers/packet.controller');

const router = express.Router();

router.route('/')
    .get(packets.findAll)
    .post(packets.create)
    .delete(packets.deleteAll)

router.route('/:id')
    .get(packets.findOne)
    .put(packets.update)
    .delete(packets.delete)


module.exports = router;