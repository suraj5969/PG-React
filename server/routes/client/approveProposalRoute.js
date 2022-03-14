'use strict';

const express = require('express');
const getData = require('../../controllers/client/approveProposalController');
const router = express.Router();

const {approveProposal} = getData;

router.post('/approveProposal/:proposal_no',approveProposal);

module.exports = {
    routes: router
}