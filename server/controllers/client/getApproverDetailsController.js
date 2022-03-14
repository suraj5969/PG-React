'use strict';

const eventData = require('../../data/events/client');

const getApproverDetails = async (req,res,next) => {
    try {
        const proposal_no = req.params.proposal_no;
        const ApproversList = await eventData.getApproversList(proposal_no);
        if(ApproversList[0].next_approver !== null){

            const getApproverDetails = await eventData.getApproverMailID(ApproversList[0].next_approver);
            res.send(getApproverDetails);

        }else{
            res.send({email:''});
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getApproverDetails
}