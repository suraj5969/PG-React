
'use strict';

const express = require('express');
const controller = require('../../controllers/client/getProposalCounterController');
const router = express.Router();

const {getProposalCounter} = controller;

router.get('/getProposalCounter',getProposalCounter);

module.exports = {
    routes: router
}
