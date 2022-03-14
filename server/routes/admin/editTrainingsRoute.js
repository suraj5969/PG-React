'use strict';

const express = require('express');
const getData = require('../../controllers/admin/editTrainingsController');
const router = express.Router();

const {editTrainings} = getData;

router.post('/edit-trainings/:id',editTrainings);

module.exports = {
    routes: router
}