'use strict';

const express = require('express');
const getData = require('../../controllers/client/saveAttendingCoursesController');
const router = express.Router();

const {saveAttendingCourses} = getData;

router.post('/saveAttendingCourses',saveAttendingCourses);

module.exports = {
    routes: router
}