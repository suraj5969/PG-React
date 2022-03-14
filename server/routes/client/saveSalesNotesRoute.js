'use strict';

const express = require('express');
const getData = require('../../controllers/client/saveSalesNotesController');
const router = express.Router();

const {saveSalesNotes} = getData;

router.post('/saveSalesNotes',saveSalesNotes);

module.exports = {
    routes: router
}