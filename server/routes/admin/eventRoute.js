'use strict';

const express = require('express');
const eventController = require('../../controllers/admin/eventController');
const router = express.Router();

const {getEvents} = eventController;

router.get('/users',getEvents);

module.exports = {
    routes: router
}