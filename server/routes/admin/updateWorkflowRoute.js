'use strict';

const express = require('express');
const getData = require('../../controllers/admin/updateWorkflowController');
const router = express.Router();

const {updateWorkflow} = getData;

router.post('/updateWorkflow/:id',updateWorkflow);

module.exports = {
    routes: router
}