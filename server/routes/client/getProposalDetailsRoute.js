'use strict';

const express = require('express');
const getData = require('../../controllers/client/getProposalDetailsController');
const router = express.Router();

const {getProposalDetails} = getData;

router.get('/getProposalDetails/:proposal_no',getProposalDetails);

module.exports = {
    routes: router
}