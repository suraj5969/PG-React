'use strict';

const fs = require("fs");
const { join } = require('path');

const express = require('express');
var zip = require('express-zip');
const getData = require('../../controllers/client/getDocfileController');
const router = express.Router();

const { getDocfile } = getData;

router.get('/getDocfile/:proposal_no', async (req, res) => {
    const result = await getDocfile(req, res);
    
    const path = join(process.cwd(), 'controllers', 'client', 'files');
    const files = [
        {path: `${join(path, 'eucDoc.docx')}`, name: 'EUCResult.docx'},
        {path: `${join(path, 'output.docx')}`, name: `${result?.proposal_no + ' ' + result?.client_name + '.docx'}`},
        {path: `${join(path, 'LSS_LNAU_Account_application_form.pdf')}`, name: 'LSS_LNAU_Account_application_form.pdf'},
        {path: `${join(path, 'LSS_LNAU_Direct_Debit_Form.pdf')}`,  name: 'LSS_LNAU_Direct_Debit_Form.pdf'},
    ]
    res.zip(files, `${result?.proposal_no + ' ' + result?.client_name + '.zip'}`, (err) => {
        fs.unlink(join(path, 'output.docx'), (err) => {
            if (err) {
                console.log(err);
            }
            // console.log('File is deleted!');
        });
        fs.unlink(join(path, 'eucDoc.docx'), (err) => {
            if (err) {
                console.log(err);
            }
            // console.log('File is deleted!');
        });

    });
})

module.exports = {
    routes: router
}