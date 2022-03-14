'use strict';

const express = require('express');
const getData = require('../../controllers/admin/getTrainingsController');
const router = express.Router();

const {getTrainings} = getData;

router.get('/getTrainings',getTrainings);

module.exports = {
    routes: router
}