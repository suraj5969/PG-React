'use strict';

const express = require('express');
const controller = require('../../controllers/client/getOpportunitiesController');
const router = express.Router();

const {getOpportunities} = controller;

router.get('/getOpportunities/:clientNumber',getOpportunities);

module.exports = {
    routes: router
}