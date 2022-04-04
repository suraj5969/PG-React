const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

const eventData = require('../../../data/events/client/index');
const encryption = require('./encryptURL')
dotenv.config();

const mailToOPSteamApproval = async (user_id,proposal_no) => {
    
    // const getProposalDetails = await eventData.getProposalDetails(proposal_no);
    const clientProfile = await eventData.getClientProfile(proposal_no);
    const emailResponse = await eventData.getApproverMailID(user_id);
    const repay = await eventData.getRepaymentCalcDetails(proposal_no);

    let total = 'error occured while processing';
    if(typeof repay === 'object' &&  repay.length > 0) {
        total = Number(repay[repay.length - 1]?.payment) + Number(repay[repay.length - 1]?.lexis_care);
    }
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
            console.log(error);
        } else {
            console.log("Server is ready to take our messages");
        }
    });

    transporter.sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: `Please Approve the Proposal No. : ${proposal_no}`,
        // text: 'Hi,we are from LexisNexis',
        html: `
            <p>Hello,<p>
            <br />
            <p>Please Approve the proposal.</p>
            <p>Proposal No. : ${proposal_no}</p>
            <p>Approval Status : Pending for Ops Team Verification</p>
            <p>Customer Name : ${clientProfile[0].client_name}</p>
            <p>Total Cost : $${total}</p>
            
            <p>View Proposal : <a href='${process.env.FRONTEND_URL}/client/view-proposal/${encryption.encrypt(proposal_no)}'>${proposal_no}</a></p>
            <br />
            <p>Thanks</p>`
    },function(error,info){
        if(error){
            console.log(error);
            return {status: 400,message: 'Server Problem,Please Try agian!'}
        }else{
            return {status: 200,message: `Mail sent to Sales Manager`};
        }
    })
    
}

module.exports = {
    mailToOPSteamApproval,
}
