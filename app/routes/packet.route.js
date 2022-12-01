const express = require('express');
const packets = require('../controllers/packet.controller');
const contacts = require('../controllers/contact.controller');

const router = express.Router();

router.route('/')
    .get(packets.findAll)
    .post(packets.create)

router.route('/:id')
    .get(packets.findOne)
    .put(packets.update)
    .delete(packets.delete)

router.route('/manage/contact')
    .post(contacts.create)
    .get(contacts.findAll)



module.exports = router;