'use strict';

const express = require('express');
const getData = require('../../controllers/client/activateProposalController');
const router = express.Router();

const { activateProposal } = getData;

router.get('/activateProposal/:proposal_no', activateProposal);

module.exports = {
    routes: router
}