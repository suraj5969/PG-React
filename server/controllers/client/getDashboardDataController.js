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
            '7': 'Pending for Ops Team Approval',
            '8': 'Approved',
        }

        const workflow = await adminEventData.getWorkflow();
        let approversIds = {};
        if (country === 'Australia') {
            approversIds['salesManager'] = workflow[0]?.aus_user_id;
            approversIds['commLead'] = workflow[1]?.aus_user_id;
            approversIds['cfo'] = workflow[2]?.aus_user_id;
            approversIds['opsTeam'] = workflow[3]?.aus_user_id;
        }
        else if (country === 'New Zealand') {
            approversIds['salesManager'] = workflow[0]?.nz_user_id;
            approversIds['commLead'] = workflow[1]?.nz_user_id;
            approversIds['cfo'] = workflow[2]?.nz_user_id;
            approversIds['opsTeam'] = workflow[3]?.nz_user_id;
        }

        const sManger = await eventData.getUserNameByID(approversIds['salesManager']);
        const comm = await eventData.getUserNameByID(approversIds['commLead']);
        const cfo = await eventData.getUserNameByID(approversIds['cfo']);
        const ops = await eventData.getUserNameByID(approversIds['opsTeam']);

        const approvers = {
            '1': '',
            '2': '',
            '3': '',
            '4': sManger[0]?.fname + ' ' + sManger[0]?.lname,
            '5': comm[0]?.fname + ' ' + comm[0]?.lname,
            '6': cfo[0]?.fname + ' ' + cfo[0]?.lname,
            '7': ops[0]?.fname + ' ' + ops[0]?.lname,
            '8': '',
        }

        // const lifecycle = {
        //     '1': 'Active',
        //     '2': 'Archived',
        // }

        const data = await eventData.getDashboardData(country);
        for(let i = 0; i < data?.length; i++) {
            data[i]['status'] = proposalStatus[data[i]?.status_id];
            data[i]['next_approver'] = approvers[data[i]?.status_id];
            // data[i]['lifecycle'] = lifecycle[data[i]?.lifecycle_id];
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