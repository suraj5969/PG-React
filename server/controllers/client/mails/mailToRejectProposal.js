const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

const eventData = require('../../../data/events/client/index');
const encryption = require('./encryptURL')
dotenv.config();

const mailToRejectProposal = async (proposal_no) => {

    const clientProfile = await eventData.getClientProfile(proposal_no);
    const repay = await eventData.getRepaymentCalcDetails(proposal_no);

    let total = 'error occured while processing';
    if (repay instanceof Array && repay.length > 0) {
        total = Number(repay[repay.length - 1]?.payment) + Number(repay[repay.length - 1]?.lexis_care);
        total = total.toFixed(2);
    }
    const proposalDetails = await eventData.getProposalDetails(proposal_no);
    const emailResponse = await eventData.getApproverMailID(proposalDetails[0]?.created_by);
    const userName = await eventData.getUserNameByID(proposalDetails[0]?.rejected_by);

    const email = emailResponse[0].email;

    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        // service: process.env.MAIL_SERVICE,
        port: 25,
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD,
        },
        tls: {
            rejectUnauthorized: true
        },
    })

    transporter.verify(function (error, success) {
        if (error) {
            console.log(error, 'reject transporter');
        } else {
            console.log("Ready to send message for Reject Proposal to ", email);
        }
    });
    console.log('rejected proposal', email)

    transporter.sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: `Proposal Rejected No. : ${proposal_no}`,
        // text: 'Hi,we are from LexisNexis',
        html: `
            <p>Hello,<p>
            <br />
            <p>The Proposal has been rejected.</p>
            <p>Proposal No. : ${proposal_no}</p>
            <p>Approval Status : Rejected</p>
            <p>Rejected By : ${userName[0]?.fname + userName[0]?.lname}</p>
            <p>Rejected reason : ${proposalDetails[0]?.rejected_reason}</p>
            <p>Customer Name : ${clientProfile[0]?.client_name}</p>
            <p>Total Cost : $${total}</p>
            
            <p>View Proposal : <a href='${process.env.FRONTEND_URL}/client/view-proposal/${encryption.encrypt(proposal_no)}'>${proposal_no}</a></p>
            <br />
            <p>Thanks</p>`
    }, function (error, info) {
        if (error) {
            console.log(error);
            return { status: 400, message: 'Server Problem,Please Try agian!' }
        } else {
            transporter.close();
            return { status: 200, message: `Mail sent to User who Created the proposal` };
        }
    })

}

module.exports = {
    mailToRejectProposal,
}
