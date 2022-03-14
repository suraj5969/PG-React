'use strict';

const express = require('express');
const controller = require('../../controllers/client/getAllSolutionSpecialistController');
const router = express.Router();

const {getAllSolutionSpecialist} = controller;

router.get('/getAllSolutionSpecialist',getAllSolutionSpecialist);

module.exports = {
    routes: router
}