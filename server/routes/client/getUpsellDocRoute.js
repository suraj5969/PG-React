'use strict';

const fs = require("fs");
const { join } = require('path');

const express = require('express');
var zip = require('express-zip');
const getData = require('../../controllers/client/getUpsellDocController');
const router = express.Router();

const { getUpsellDoc } = getData;

router.get('/getUpsellDoc/:proposal_no', async (req, res) => {
    const result = await getUpsellDoc(req, res);
    
    const path = join(process.cwd(), 'controllers', 'client', 'files');
    const files = [
        {path: `${join(path, 'eucDoc.docx')}`, name: 'EUCResult.docx'},
        {path: `${join(path, 'upsellDoc.docx')}`, name: result?.fileName},
        {path: `${join(path, 'LSS_LNAU_Account_application_form.pdf')}`, name: 'LSS_LNAU_Account_application_form.pdf'},
        {path: `${join(path, 'LSS_LNAU_Direct_Debit_Form.pdf')}`,  name: 'LSS_LNAU_Direct_Debit_Form.pdf'},
    ]
    res.zip(files, `${result?.proposal_no + ' ' + result?.client_name + '.zip'}`, (err) => {
        fs.unlink(join(path, 'upsellDoc.docx'), (err) => {
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