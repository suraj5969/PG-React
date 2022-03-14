'use strict';

const express = require('express');
const getData = require('../../controllers/client/getApproverDetailsController');
const router = express.Router();

const {getApproverDetails} = getData;

router.get('/getApproverDetails/:proposal_no',getApproverDetails);

module.exports = {
    routes: router
}