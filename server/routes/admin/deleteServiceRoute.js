'use strict';

const express = require('express');
const getData = require('../../controllers/admin/deleteServiceController');
const router = express.Router();

const {deleteService} = getData;

router.delete('/delete-service/:id',deleteService);

module.exports = {
    routes: router
}