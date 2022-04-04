'use strict';

const eventData = require('../../data/events/client');
const adminEventData = require('../../data/events/admin');

const getDashboardData = async (req, res, next) => {

    try {
        const country = req.params.country;
        const proposalStatus = {
            '1': 'Rejected',
            '2': 'Not Submitted for Approval',
            '3': 'Proposal without GCRM client',
            '4': 'Pending for Sales Approval',
            '5': 'Pending for Commercial Lead Approval',
            '6': 'Pending for CFO Approval',
            '7': 'Pending for Ops Team Verification',
            '8': 'Approved',
        }

        const workflow = await adminEventData.getWorkflow();
        // let approversIds = {};
        // if (country === 'Australia') {
        //     approversIds['salesManager'] = workflow[0]?.aus_user_id;
        //     approversIds['commLead'] = workflow[1]?.aus_user_id;
        //     approversIds['cfo'] = workflow[2]?.aus_user_id;
        //     approversIds['opsTeam'] = workflow[3]?.aus_user_id;
        // }
        // else if (country === 'New Zealand') {
        //     approversIds['salesManager'] = workflow[0]?.nz_user_id;
        //     approversIds['commLead'] = workflow[1]?.nz_user_id;
        //     approversIds['cfo'] = workflow[2]?.nz_user_id;
        //     approversIds['opsTeam'] = workflow[3]?.nz_user_id;
        // }

        const au_sManger = await eventData.getUserNameByID(workflow[0]?.aus_user_id);
        const au_comm = await eventData.getUserNameByID(workflow[1]?.aus_user_id);
        const au_cfo = await eventData.getUserNameByID(workflow[2]?.aus_user_id);
        const au_ops = await eventData.getUserNameByID(workflow[3]?.aus_user_id);

        const nz_sManger = await eventData.getUserNameByID(workflow[0]?.nz_user_id);
        const nz_comm = await eventData.getUserNameByID(workflow[1]?.nz_user_id);
        const nz_cfo = await eventData.getUserNameByID(workflow[2]?.nz_user_id);
        const nz_ops = await eventData.getUserNameByID(workflow[3]?.nz_user_id);

        const au_next_approver_id = {
            '1': null,
            '2': null,
            '3': null,
            '4': workflow[0]?.aus_user_id,
            '5': workflow[1]?.aus_user_id,
            '6': workflow[2]?.aus_user_id,
            '7': workflow[3]?.aus_user_id,
            '8': null,
        }

        const nz_next_approver_id = {
            '1': null,
            '2': null,
            '3': null,
            '4': workflow[0]?.nz_user_id,
            '5': workflow[1]?.nz_user_id,
            '6': workflow[2]?.nz_user_id,
            '7': workflow[3]?.nz_user_id,
            '8': null,
        }

        const au_approvers = {
            '1': '',
            '2': '',
            '3': '',
            '4': au_sManger[0]?.fname + ' ' + au_sManger[0]?.lname,
            '5': au_comm[0]?.fname + ' ' + au_comm[0]?.lname,
            '6': au_cfo[0]?.fname + ' ' + au_cfo[0]?.lname,
            '7': au_ops[0]?.fname + ' ' + au_ops[0]?.lname,
            '8': '',
        }

        const nz_approvers = {
            '1': '',
            '2': '',
            '3': '',
            '4': nz_sManger[0]?.fname + ' ' + nz_sManger[0]?.lname,
            '5': nz_comm[0]?.fname + ' ' + nz_comm[0]?.lname,
            '6': nz_cfo[0]?.fname + ' ' + nz_cfo[0]?.lname,
            '7': nz_ops[0]?.fname + ' ' + nz_ops[0]?.lname,
            '8': '',
        }

        // const lifecycle = {
        //     '1': 'Active',
        //     '2': 'Archived',
        // }

        const data = await eventData.getDashboardData(country);
        for (let i = 0; i < data?.length; i++) {
            data[i]['status'] = proposalStatus[data[i].status_id];
            data[i]['next_approver_id'] = data[i].country === 'Australia' ? au_next_approver_id[data[i].status_id] : nz_next_approver_id[data[i].status_id];
            data[i]['next_approver'] = data[i].country === 'Australia' ? au_approvers[data[i].status_id] : nz_approvers[data[i].status_id];
        }
        // console.log(data, 'dashboard Data');
        res.send(data);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getDashboardData
}