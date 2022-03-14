'use strict';

const express = require('express');
const controller = require('../../controllers/client/archiveProposalController');
const router = express.Router();

const {archiveProposal} = controller;

router.get('/archiveProposal/:proposal_no',archiveProposal);

module.exports = {
    routes: router
}