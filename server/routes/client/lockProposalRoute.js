'use strict';

const express = require('express');
const controller = require('../../controllers/client/lockProposalController');
const router = express.Router();

const {lockProposal} = controller;

router.get('/lockProposal/:proposal_no',lockProposal);

module.exports = {
    routes: router
}