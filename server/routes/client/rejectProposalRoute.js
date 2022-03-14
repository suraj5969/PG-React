'use strict';

const express = require('express');
const getData = require('../../controllers/client/rejectProposalController');
const router = express.Router();

const {rejectProposal} = getData;

router.post('/rejectProposal/:proposal_no',rejectProposal);

module.exports = {
    routes: router
}