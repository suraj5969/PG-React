'use strict';

const express = require('express');
const getData = require('../../controllers/admin/getWorkflowController');
const router = express.Router();

const {getWorkflow} = getData;

router.get('/getWorkflow',getWorkflow);

module.exports = {
    routes: router
}