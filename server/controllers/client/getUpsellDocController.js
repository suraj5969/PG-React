'use strict';
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");

const fs = require("fs");
const path = require("path");
const moment = require('moment');

const eventData = require('../../data/events/client');

const getUpsellDoc = async (req, res, next) => {

    const proposal_no = req.params.proposal_no;

    try {

        const proposalDetails = await eventData.getProposalDetailsForDoc(proposal_no);

        const clientProfile = await eventData.getClientProfile(proposal_no);
        const salesNotes = await eventData.getSalesNotes(proposal_no);

        const userDetailsWithID = await eventData.getUserDetailsWithID(clientProfile[0].solution_specialist_id);

        const empowerModules = await eventData.getEmpowerModuleDetails(proposal_no);

        const optionalServices = await eventData.getOptionalServices(proposal_no);

        const upfrontCostDetails = await eventData.getUpfrontCostDetails(proposal_no);
        const ongoingMainDetails = await eventData.getOngoingMainDetails(proposal_no);

        const miscellaneous = await eventData.getMiscellaneous(proposal_no);
        const GSTPercentages = await eventData.getGSTPercentages(proposal_no);

        const repaySoftwareServicesValues = await eventData.getRepaymentSoftwareServices(proposal_no);
        const repayMaintenanceDetails = await eventData.getRepaymentMaintenanceDetails(proposal_no);
        const repaymentCalcDetails = await eventData.getRepaymentCalcDetails(proposal_no);

        let hasSalesNotes = false;
        const sales_notes = () => {
            const notes = [];
            for (let i = 0; i < salesNotes.length; i++) {
                if (salesNotes[i].note !== '' && salesNotes[i].note !== null) {
                    hasSalesNotes = true;
                    notes.push({
                        note_content: salesNotes[i].note,
                        note_user: salesNotes[i].user_name
                    })
                }
            }
            return notes;
        }


        const software_affinity_user = () => {
            return {
                title: `Lexis Affinity User licences for ${clientProfile[0].num_of_users} users`,
                cost: `$${Number(upfrontCostDetails[1]?.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            }
        }

        const software_affinity_server = () => {
            return {
                title: `Oracle licenses`,
                cost: `$${Number(upfrontCostDetails[2]?.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            }
        }
        const software_clientPortal = () => {
            return {
                title: `Client Portal`,
                cost: `$${Number(upfrontCostDetails[3]?.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            }
        }
        const software_affinityMobile = () => {
            return {
                title: `Affinity Mobile`,
                cost: `$${Number(upfrontCostDetails[4]?.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            }
        }
        const software_setAdjuster = () => {
            return {
                title: `Lexis Affinity Settlement Adjuster`,
                cost: `$${Number(upfrontCostDetails[5]?.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            }
        }
        const software_exchangeIntegration = () => {
            return {
                title: `Lexis Affinity Settlement Adjuster`,
                cost: `$${Number(upfrontCostDetails[6]?.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            }
        }
        const software_empower = () => {
            const modules = empowerModules.filter((module) => Boolean(Number(module.selected)));
            // console.log(empowerModules.filter((module) => Boolean(module.selected)));
            return {
                title: `Empower ${modules.length} modules for a total of ${empowerModules[0]?.num_of_users} users`,
                cost: `$${Number(upfrontCostDetails[7]?.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            }
        }
        const software_softdocs = () => {
            return {
                title: `SoftDocs InterConnect`,
                cost: `$${Number(upfrontCostDetails[8]?.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            }
        }

        const software_table = () => {
            const section = [];
            section.push(software_affinity_user());
            if (miscellaneous[0].included !== '') {
                section.push(software_affinity_server());
            }
            if (optionalServices[14]?.include === 'Yes') {
                section.push(software_clientPortal());
            }
            if (optionalServices[16]?.include === 'Yes') {
                section.push(software_affinityMobile());
            }
            if (optionalServices[18]?.include === 'Yes') {
                section.push(software_setAdjuster());
            }
            if (optionalServices[12]?.include === 'Yes') {
                section.push(software_exchangeIntegration());
            }
            if (optionalServices[17]?.include === 'Yes') {
                section.push(software_empower());
            }
            if (optionalServices[13]?.include === 'Yes') {
                section.push(software_softdocs());
            }
            return section;
        }


        const services_implementServies = () => {
            return {
                title: `Implementation Services`,
                cost: `$${Number(upfrontCostDetails[9]?.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            }
        }
        const services_implementTraning = () => {
            return {
                title: `Implementation Traning`,
                cost: `$${Number(upfrontCostDetails[10]?.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            }
        }
        const services_postImplement = () => {
            return {
                title: `Post-implementation review & assistance`,
                cost: `$${Number(upfrontCostDetails[11]?.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            }
        }
        const services_scopingStudy = () => {
            return {
                title: `Scoping Study`,
                cost: `$${Number(upfrontCostDetails[14]?.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            }
        }

        const services_table = () => {
            const section = [];
            if (Number(upfrontCostDetails[9]?.cost) > 0) {
                section.push(services_implementServies());
            }
            if (Number(upfrontCostDetails[10]?.cost) > 0) {
                section.push(services_implementTraning());
            }
            if (Number(upfrontCostDetails[11]?.cost) > 0) {
                section.push(services_postImplement());
            }
            if (miscellaneous[2]?.included === 'Yes') {
                section.push(services_scopingStudy());
            }
            return section;
        }


        const maintenance_affintiyCare = () => {
            return {
                title: `Annual Affinity Lexis Care`,
                cost: `$${Number(ongoingMainDetails[0]?.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            }
        }
        const maintenance_oracleLicense = () => {
            return {
                title: `Annual OracleCare for Oracle Licences`,
                cost: `$${Number(ongoingMainDetails[1]?.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            }
        }
        const maintenance_affinityMobileCare = () => {
            return {
                title: `Annual Affinity Mobile Lexis Care`,
                cost: `$${Number(ongoingMainDetails[2]?.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            }
        }
        const maintenance_clientPortal = () => {
            return {
                title: `Annual Client Portal Lexis Care`,
                cost: `$${Number(ongoingMainDetails[3]?.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            }
        }
        const maintenance_empower = () => {
            return {
                title: `Annual Empower Lexis Care`,
                cost: `$${Number(ongoingMainDetails[4]?.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            }
        }
        const maintenance_softdocs = () => {
            return {
                title: `Annual SoftDocs InterConnect Lexis Care`,
                cost: `$${Number(ongoingMainDetails[5]?.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            }
        }
        const maintenance_setAdjuster = () => {
            return {
                title: `Annual Settlement Adjuster`,
                cost: `$${Number(ongoingMainDetails[6]?.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            }
        }

        const maintenance_table = () => {
            const section = [];
            section.push(maintenance_affintiyCare());
            if (miscellaneous[0]?.included !== '') {
                section.push(maintenance_oracleLicense());
            }
            if (optionalServices[16]?.include === 'Yes') {
                section.push(maintenance_affinityMobileCare());
            }
            if (optionalServices[14]?.include === 'Yes') {
                section.push(maintenance_clientPortal());
            }
            if (optionalServices[17]?.include === 'Yes') {
                section.push(maintenance_empower());
            }
            if (optionalServices[13]?.include === 'Yes') {
                section.push(maintenance_softdocs());
            }
            if (optionalServices[18]?.include === 'Yes') {
                section.push(maintenance_setAdjuster());
            }
            return section;
        }

        //affinity mobile or client portal is yes 
        let docName = '', exportedFileName = '';
        if (optionalServices[14].include === 'Yes' || optionalServices[16].include === 'Yes') {
            docName = 'affinity_portal.docx';
            exportedFileName = 'Affinity Portal.docx'
        }
        else {
            docName = 'additional_license.docx';
            exportedFileName = 'Additional Licences.docx'
        }

        const content = fs.readFileSync(
            path.resolve(__dirname, path.join('files', docName)),
            "binary"
        );
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });

        doc.render({
            client_name: clientProfile[0].client_name,
            c_number: clientProfile[0].client_number,
            c_proposal_no: proposal_no,
            c_address: clientProfile[0].address,
            has_sales_notes: hasSalesNotes,
            sales_notes: sales_notes(),
            expiry_date: moment(clientProfile[0]?.end_valid_date).format('DD-MMM-YYYY'),
            c_sol_spec: userDetailsWithID[0].fname + ' ' + userDetailsWithID[0].lname,
            total_cost: `$${(Number(repaySoftwareServicesValues[2].gcrm_entries) +
                Number(repayMaintenanceDetails[5].discounted)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            c_sol_jobtitle: "Solution Specialist",
            c_sol_contact: userDetailsWithID[0].phone,

            software: software_table(),
            services: services_table(),
            stotal_cost: `$${Number(upfrontCostDetails[16]?.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            gst: function () {
                const gst = GSTPercentages.filter((item) => item.country_name === clientProfile[0].country);
                return gst[0].gst_percentage;
            }(),
            gstpay_cost: `$${Number(upfrontCostDetails[19]?.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,

            maintenance: maintenance_table(),
            subtotl_cost: `$${Number(ongoingMainDetails[7]?.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            gstpay_costongo: `$${Number(ongoingMainDetails[10]?.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            
            uf_lessconfDiscount : `$${Number(upfrontCostDetails[17]?.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            totlinvesgst_cost: `$${Number(upfrontCostDetails[18]?.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            uf_total_cost: `$${Number(upfrontCostDetails[20]?.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,

            main_lessconfDiscount: `$${Number(ongoingMainDetails[8]?.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            total_main_fee: `$${Number(ongoingMainDetails[9]?.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            main_total_cost: `$${Number(ongoingMainDetails[11]?.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,

        });
        const buf = doc.getZip().generate({ type: "nodebuffer" });
        fs.writeFileSync(path.resolve(__dirname, path.join('files', 'upsellDoc.docx')), buf);



        const content2 = fs.readFileSync(
            path.resolve(__dirname, path.join('files', 'EUCLicense.docx')),
            "binary"
        );
        const zip2 = new PizZip(content2);
        const doc2 = new Docxtemplater(zip2, {
            paragraphLoop: true,
            linebreaks: true,
        });

        doc2.render({
            cust_name: clientProfile[0].client_name,
            euc_nou: clientProfile[0]?.num_of_users,
            no_years: function () {
                if (clientProfile[0].duration === '36 Months') return 3;
                if (clientProfile[0].duration === '48 Months') return 4;
                if (clientProfile[0].duration === '60 Months') return 5;
                return 0;
            }(),
            optional_products: function () {
                const products = [];
                if (miscellaneous[0]?.included !== '') {
                    products.push({product: 'Oracle Licences'});
                }
                if (optionalServices[16]?.include === 'Yes') {
                    products.push({product: 'Affinity Mobile'});
                }
                if (optionalServices[14]?.include === 'Yes') {
                    products.push({product: 'Client Portal'});
                }
                if (optionalServices[13]?.include === 'Yes') {
                    products.push({product: 'Softdocs Integration'});
                }
                if (optionalServices[18]?.include === 'Yes') {
                    products.push({product: 'Settlement Adjuster'});
                }
                return products;
            }(),
            other_services: function () {
                const services = [];
                if (miscellaneous[2]?.included === 'Yes') {
                    services.push({service: 'Scoping study'});
                }
                if (!(optionalServices[0].task.toLowerCase().includes('data migration required'))) {
                    services.push({service: 'Data Migration'});
                }
                return services;
            }(),
            services_fee: `$${Number(repaySoftwareServicesValues[2].cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            maintenance_fee: `$${Number(ongoingMainDetails[7].cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            deposit: `$${Number(repaymentCalcDetails[0].payment).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            company: '',
            specification_no: '',
            billing_address: '',
            abn: '',
            state: '',
            postcode: '',
            contact_name: '',
            email: '',
            phone: '',
            facsimile: '',
        });
        const buf2 = doc2.getZip().generate({ type: "nodebuffer" });
        fs.writeFileSync(path.resolve(__dirname, path.join('files', 'eucDoc.docx')), buf2);
        

        return {
            client_name: clientProfile[0]?.client_name,
            proposal_no: proposal_no,
            fileName: exportedFileName,
        };

    } catch (error) {
        function replaceErrors(key, value) {
            if (value instanceof Error) {
                return Object.getOwnPropertyNames(value).reduce(
                    function (error, key) {
                        error[key] = value[key];
                        return error;
                    },
                    {}
                );
            }
            return value;
        }
        console.log(JSON.stringify({ error: error }, replaceErrors));

        if (
            error.properties &&
            error.properties.errors instanceof Array
        ) {
            const errorMessages = error.properties.errors
                .map(function (error) {
                    return error.properties.explanation;
                })
                .join("\n");
            console.log("errorMessages", errorMessages);
            // errorMessages is a humanly readable message looking like this:
            // 'The tag beginning with "foobar" is unopened'
        }
        throw error;
    }
}

module.exports = {
    getUpsellDoc
}