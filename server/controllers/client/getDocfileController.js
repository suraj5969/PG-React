'use strict';
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");

const fs = require("fs");
const path = require("path");
const moment = require('moment');

const eventData = require('../../data/events/client');

const getDocfile = async (req, res, next) => {

    const proposal_no = req.params.proposal_no;

    try {

        const proposalDetails = await eventData.getProposalDetailsForDoc(proposal_no);

        const clientProfile = await eventData.getClientProfile(proposal_no);

        const userDetailsWithID = await eventData.getUserDetailsWithID(clientProfile[0].solution_specialist_id);

        const empowerModules = await eventData.getEmpowerModuleDetails(proposal_no);

        const defaultServices = await eventData.getDefaultServices(proposal_no);
        const optionalServices = await eventData.getOptionalServices(proposal_no);

        const upfrontCostDetails = await eventData.getUpfrontCostDetails(proposal_no);
        const ongoingMainDetails = await eventData.getOngoingMainDetails(proposal_no);

        const miscellaneous = await eventData.getMiscellaneous(proposal_no);
        const affinityServerValues = await eventData.getAffinityServerPopupValues(proposal_no);
        const affinityMobilePopupValue = await eventData.getAffinityMobPopupValue(proposal_no);
        const settlementPopupValue = await eventData.getSettlementPopupValue(proposal_no);
        const GSTPercentages = await eventData.getGSTPercentages(proposal_no);
        const hrsPerDay = await eventData.getHrsPerDayByCountry(clientProfile[0]?.country);
        const oracleWording = await eventData.getOracleWording(proposal_no);

        const repaySoftwareServicesValues = await eventData.getRepaymentSoftwareServices(proposal_no);
        const repayMaintenanceDetails = await eventData.getRepaymentMaintenanceDetails(proposal_no);
        const repaymentCalcDetails = await eventData.getRepaymentCalcDetails(proposal_no);


        const content = fs.readFileSync(
            path.resolve(__dirname, path.join('files', 'docTemplate.docx')),
            "binary"
        );

        const zip = new PizZip(content);

        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });

        const affinityAndWorkstation = () => {
            let users = 0;
            if (miscellaneous[0]?.included !== '' &&
                affinityServerValues[0]?.type_of_oracle_license === 'Named User') {
                users = affinityServerValues[0]?.num_of_users;
            }
            else {
                users = clientProfile[0]?.num_of_users;
            }

            return {
                heading: 'Affinity Server and Workstation software ',
                text: `Lexis Affinity with ${users} concurrent user licenses. Professional Services to assist your team in configuring, implementing and using the solution. Ongoing online and remote technical support and maintenance, including software updates.`
            }
        }
        const oracleDBSoftware = () => {
            let wording = 0;
            if (affinityServerValues[0]?.type_of_oracle_license === 'Named User') {
                wording = `${oracleWording[0]?.value.replace('${no_of_users}', affinityServerValues[0]?.num_of_users)}`;
            }
            else {
                wording = `${oracleWording[1]?.value.replace('${no_of_cpu}', affinityServerValues[0]?.server_license)}`;
            }

            return {
                heading: 'Oracle Database Software',
                text: `The Oracle database is an integral part of Affinity. This proposal includes provision for ${wording}.`
            }
        }

        const clientPortal = () => {
            return {
                heading: 'Client Portal',
                text: 'Client Portal will enable you to increase your efficiency and collaboration with clients and selected Third Parties while delivering premium service with confidence and security.  Easily exchange documents with external users and reduce enquiries by allowing online access to the matter details they need.'
            }
        }

        const affinityMobile = () => {
            return {
                heading: 'Affinity Mobile',
                text: 'Affinity Mobile will enable you to increase your efficiency and productivity by securely giving your staff access to the contacts, matters and documents they need on the go.'
            }
        }

        const empower = () => {
            return {
                heading: 'Lexis emPower',
                text: 'Lexis emPower will make you more efficient by automating your legal document production and includes regular updates to precedents and court forms. '
            }
        }

        const globalX = () => {
            return {
                heading: 'LexisNexis Searches (GlobalX)',
                text: 'LexisNexis Searches integrates with GlobalX for all your property, business and consumer regulatory information. Order searches from within matters to avoid re-keying matter details with automated saving of documents and posting of disbursements.'
            }
        }

        const infoTrack = () => {
            return {
                heading: 'LexisNexis Searches (InfoTrack)',
                text: 'LexisNexis Searches integrates with InfoTrack for all your property, business and consumer regulatory information.  Order searches from within matters to avoid re-keying matter details with automated saving of documents and posting of disbursements.'
            }
        }

        const dyeDurham = () => {
            return {
                heading: 'Dye & Durham Integration',
                text: 'Affinity integrates with Dye & Durham Property for property, business and consumer regulatory information. Order searches from within matters to avoid re-keying matter details with automated saving of documents and posting of disbursements.'
            }
        }

        const pexaIntegration = () => {
            return {
                heading: 'PEXA Integration',
                text: 'Affinity integrates with PEXA for real-time online lodgement and settlement of property matters.  Link and access your PEXA workspace from within your Affinity matters.'
            }
        }

        const macquarieBank = () => {
            return {
                heading: 'Macquarie Bank Integration',
                text: 'Affinity integrates with Macquarie Bank to boost your firms’ productivity, reduce costs and improve cash flow with an innovative payment, collection, receipting and reconciliation solution.'
            }
        }

        const settlementAdjuster = () => {
            return {
                heading: 'Settlement Adjuster',
                text: 'Settlement Adjuster will help you to create new and adjust existing Settlement Sheets (NSW), Settlement Statements (QLD) and Statement of Adjustments (VIC) in a fast, efficient and accurate manner.'
            }
        }

        const mitimes = () => {
            return {
                heading: 'mitimes Integration',
                text: 'mitimes enables easy, accurate and automated time-recording by connecting your Affinity database, exchange server and PBX to automatically record billable activities and present them for you to approve and post.  mitimes is the best way to save time and stress while increasing your billable fees.'
            }
        }

        const feeSynergy = () => {
            return {
                heading: 'FeeSynergy Integration',
                text: 'Affinity integrates with FeeSynergy Collect to increase your cashflow, reduce your debtor days and automate your current processes, all while improving the service you provide.  Plus, flexible monthly payment options, secure online payment gateway and comprehensive partner dashboard will make life easy for both you and your clients.'
            }
        }

        const fileman = () => {
            return {
                heading: 'Fileman Integration',
                text: 'Affinity integrates with Fileman to enable cloud-based management of your archived matter files, including storage, retrieval and destruction.  The unique single fee per matter approach means you can convert the cost of file management into a legitimate disbursement.'
            }
        }

        const softdocs = () => {
            return {
                heading: 'Softdocs InterConnect',
                text: 'Softdocs InterConnect allows for smooth integration between Softdocs precedent libraries and Affinity.  Your team can generate SoftDocs documents directly from the matter window in Lexis Affinity.  Matter and Contact data is available in your documents with no re-keying and HotDocs interview data can be pushed back into your Affinity database.'
            }
        }

        const getSpecifics = () => {
            const section = [];
            section.push(affinityAndWorkstation());
            if (miscellaneous[0]?.included !== '') {
                section.push(oracleDBSoftware());
            }
            if (optionalServices[14]?.include === 'Yes') {
                section.push(clientPortal());
            }
            if (optionalServices[16]?.include === 'Yes') {
                section.push(affinityMobile());
            }
            if (optionalServices[17]?.include === 'Yes') {
                section.push(empower());
            }

            section.push(globalX());
            section.push(infoTrack());
            section.push(dyeDurham());
            section.push(pexaIntegration());
            section.push(macquarieBank());

            if (optionalServices[18]?.include === 'Yes') {
                section.push(settlementAdjuster());
            }

            section.push(mitimes());
            section.push(feeSynergy());
            section.push(fileman());

            if (optionalServices[13]?.include === 'Yes') {
                section.push(softdocs());
            }

            return section;
        }

        const inves_aff_workstation = () => {
            let price = 0;
            price = Number(upfrontCostDetails[1]?.cost);
            return {
                label: `Affinity Workstation licenses for ${clientProfile[0]?.num_of_users} concurrent use`,
                price: `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                modules_selected: false

            }
        }

        const inves_aff_server = () => {
            let price = 0;
            price = Number(upfrontCostDetails[0]?.cost);
            return {
                label: `Affinity Server licence`,
                price: `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                modules_selected: false
            }
        }

        const invs_oracle_edition = () => {
            let users = 0;

            if (miscellaneous[0]?.included !== '' &&
                affinityServerValues[0]?.type_of_oracle_license === 'Named User') {
                users = `${affinityServerValues[0]?.num_of_users} Named User`;
            }
            else {
                users = `${affinityServerValues[0]?.server_license} Per CPU`;
            }

            const price = Number(upfrontCostDetails[2]?.cost);

            return {
                label: `Oracle Standard Edition Two for ${users} licenses`,
                price: `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                modules_selected: false
            }
        }

        const inves_empower = () => {
            const price = Number(upfrontCostDetails[7]?.cost);
            const modules = empowerModules.filter((module) => Number(module.selected)).map((module) => ({ names: module.module_name }));
            // console.log(empowerModules.filter((module) => Boolean(module.selected)));
            return {
                label: `Lexis emPower modules for ${empowerModules[0]?.num_of_users} users:`,
                price: `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                modules_selected: true,
                module_names: modules

            }
        }

        const inves_clientPortal = () => {
            const price = Number(upfrontCostDetails[3]?.cost);
            return {
                label: `Affinity Client Portal`,
                price: `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                modules_selected: false
            }
        }

        const inves_aff_mobile = () => {
            const price = Number(upfrontCostDetails[4]?.cost);
            // console.log(affinityMobilePopupValue);
            return {
                label: `Affinity Mobile for up to ${affinityMobilePopupValue[0]?.num_of_users} active users`,
                price: `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                modules_selected: false
            }
        }

        const inves_set_adjuster = () => {
            const price = Number(upfrontCostDetails[5]?.cost);
            return {
                label: `Lexis Settlement Adjuster for users ${settlementPopupValue[0]?.no_of_licenses} users`,
                price: `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                modules_selected: false
            }
        }

        const inves_softdocs_connect = () => {
            const price = Number(upfrontCostDetails[8]?.cost);
            return {
                label: `SoftDocs InterConnect`,
                price: `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                modules_selected: false
            }
        }

        const inves_exchange_integration = () => {
            const price = Number(upfrontCostDetails[6]?.cost);
            return {
                label: `2 Way Microsoft Exchange Integration`,
                price: `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                modules_selected: false
            }
        }

        const software_licenses_section = () => {
            const section = [];
            section.push(inves_aff_workstation());
            section.push(inves_aff_server());
            if (miscellaneous[0]?.included !== '') {
                section.push(invs_oracle_edition());
            }
            if (optionalServices[17]?.include === 'Yes') {
                section.push(inves_empower());
            }
            if (optionalServices[14]?.include === 'Yes') {
                section.push(inves_clientPortal());
            }
            if (optionalServices[16]?.include === 'Yes') {
                section.push(inves_aff_mobile());
            }
            if (optionalServices[18]?.include === 'Yes') {
                section.push(inves_set_adjuster());
            }
            if (optionalServices[13]?.include === 'Yes') {
                section.push(inves_softdocs_connect());
            }
            if (optionalServices[12]?.include === 'Yes') {
                section.push(inves_exchange_integration());
            }
            return section;
        }

        const prof_DM = () => {
            const price = Number(upfrontCostDetails[12]?.cost);
            return {
                label: `Data migration (see specification appended below)`,
                price: `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                module: false
            }
        }

        const prof_staff_traning = () => {
            const price = Number(upfrontCostDetails[9]?.cost);
            return {
                label: `Staff training as described in the Important Notes section`,
                price: `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                module: false
            }
        }

        const prof_post_impletation = () => {
            let ReviewDays = Number(defaultServices[7]?.accounts_consulting) + Number(optionalServices[12]?.bpa_consulting);

            const price = Number(upfrontCostDetails[11]?.cost);
            return {
                label: `Post implementation review and assistance – (Estimate ${ReviewDays} days)`,
                price: `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                module: false
            }
        }

        const prof_travel_allowance = () => {
            let value = Number(miscellaneous[3]?.included);

            const price = Number(upfrontCostDetails[13]?.cost);
            return {
                label: `Allowance for travel - (Estimate ${value} trips)`,
                price: `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                module: false
            }
        }

        const prof_add_consulting = () => {
            const price = Number(upfrontCostDetails[10]?.cost);
            let mod = false;
            if (optionalServices[10]?.include === 'Yes') {
                mod = true;
            }
            return {
                label: `Additional consulting :`,
                price: `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                module: mod,
                module_names: [
                    { names: 'Additional Precedent configuration' }
                ]
            }
        }

        const prof_scoping_study = () => {
            const price = Number(upfrontCostDetails[14]?.cost);
            return {
                label: `Scoping study to assess the requirements to`,
                price: `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                module: false,
            }
        }

        const proffesional_services = () => {
            const section = [];
            if (optionalServices[0]?.include === 'Yes') {
                section.push(prof_DM());
            }
            section.push(prof_staff_traning());
            section.push(prof_post_impletation());
            if (clientProfile[0]?.time_inc_in_project === 'Yes') {
                section.push(prof_travel_allowance());
            }
            if (Number(upfrontCostDetails[10]?.cost) > 0) {
                section.push(prof_add_consulting());
            }
            if (miscellaneous[2]?.included === 'Yes') {
                section.push(prof_scoping_study());
            }

            return section;
        }


        const ongoing_aff_workstation = () => {
            const price = Number(ongoingMainDetails[0]?.cost);
            return {
                label: `Annual Lexis Care for Affinity Workstations and Server`,
                price: `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            }
        }

        const ongoing_main_oracle = () => {
            const price = Number(ongoingMainDetails[1]?.cost);
            return {
                label: `Annual Maintenance for Oracle`,
                price: `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            }
        }

        const ongoing_empower = () => {
            const price = Number(ongoingMainDetails[4]?.cost);
            return {
                label: `Annual Lexis Care for emPower`,
                price: `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            }
        }

        const ongoing_client_portal = () => {
            const price = Number(ongoingMainDetails[3]?.cost);
            return {
                label: `Annual Lexis Care for Client Portal`,
                price: `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            }
        }

        const ongoing_aff_mobile = () => {
            const price = Number(ongoingMainDetails[2]?.cost);
            return {
                label: `Annual Lexis Care for Affinity Mobile`,
                price: `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            }
        }

        const ongoing_set_addjuster = () => {
            const price = Number(ongoingMainDetails[6]?.cost);
            return {
                label: `Annual Lexis Care for Settlement Adjuster`,
                price: `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            }
        }

        const ongoing_softdocs = () => {
            const price = Number(ongoingMainDetails[5]?.cost);
            return {
                label: `Annual Lexis Care for SoftDocs InterConnect`,
                price: `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            }
        }

        // repaySoftwareServicesValues
        const ongoing_maintenance_values = () => {
            const section = [];
            section.push(ongoing_aff_workstation());
            if (miscellaneous[0]?.included !== '') {
                section.push(ongoing_main_oracle());
            }
            if (optionalServices[17]?.include === 'Yes') {
                section.push(ongoing_empower());
            }
            if (optionalServices[14]?.include === 'Yes') {
                section.push(ongoing_client_portal());
            }
            if (optionalServices[16]?.include === 'Yes') {
                section.push(ongoing_aff_mobile());
            }
            if (optionalServices[18]?.include === 'Yes') {
                section.push(ongoing_set_addjuster());
            }
            if (optionalServices[13]?.include === 'Yes') {
                section.push(ongoing_softdocs());
            }

            return section;
        }


        const inves_notes1 = () => {

            const labels = [
                { names: `One-off costs discounted by ${upfrontCostDetails[16]?.percent_discount}%` },
                { names: `Ongoing support and maintenance costs discounted by ${ongoingMainDetails[7]?.percent_discount}%` },
                { names: `A payment plan over ${clientProfile[0]?.duration} to minimise cash flow impact on you` }
            ];
            if (clientProfile[0]?.duration === 'Upfront') {
                labels.push({ names: `Upfront payment of Software and Professional Services costs` })
            }

            return {
                text: 'I have included a conditional discount. Final approval by our Finance Director is required. The offer includes:',
                inves_selected: true,
                labels: labels,
            }
        }

        const inves_notes2 = () => {
            return {
                text: `Costs after ${clientProfile[0]?.duration} are for LexisCare Maintenance only. The monthly outlay therefore is reduced significantly. Please see "Repayments" for further details`,
                inves_selected: false,
            }
        }

        const inves_notes3 = () => {
            return {
                text: `All prices exclude GST. GST shown separately.`,
                inves_selected: false,
            }
        }

        const inves_notes4 = () => {
            return {
                text: `Please note, the pricing in this proposal is valid until 5:00pm (AEST) on ${moment(clientProfile[0]?.end_valid_date).format('DD-MMM-YYYY')}`,
                inves_selected: false,
            }
        }

        // repaySoftwareServicesValues
        const notes_inves_sum = () => {
            const section = [];
            section.push(inves_notes1());
            if (clientProfile[0]?.duration !== 'Upfront') {
                section.push(inves_notes2());
            }
            section.push(inves_notes3());
            section.push(inves_notes4());

            return section;
        }


        const repay_year1 = () => {
            const price = Number(repaymentCalcDetails[1]?.payment);
            return {
                year: `Year 1`,
                initial_pay: `$${repaymentCalcDetails[0]?.payment}`,
                month: `$${(price * 12).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                lexis_month: `$${Number(repayMaintenanceDetails[0]?.discounted).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            }
        }

        const repay_year2 = () => {
            const price = Number(repaymentCalcDetails[1]?.payment);
            return {
                year: `Year 2`,
                initial_pay: `0`,
                month: `$${(price * 12).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                lexis_month: `$${Number(repayMaintenanceDetails[1]?.discounted).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            }
        }

        const repay_year3 = () => {
            const price = Number(repaymentCalcDetails[1]?.payment);
            return {
                year: `Year 3`,
                initial_pay: `0`,
                month: `$${(price * 12).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                lexis_month: `$${Number(repayMaintenanceDetails[2]?.discounted).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            }
        }

        const repay_year4 = () => {
            const price = Number(repaymentCalcDetails[1]?.payment);
            return {
                year: `Year 4`,
                initial_pay: `0`,
                month: `$${(price * 12).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                lexis_month: `$${Number(repayMaintenanceDetails[3]?.discounted).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            }
        }

        const repay_year5 = () => {
            const price = Number(repaymentCalcDetails[1]?.payment);
            return {
                year: `Year 5`,
                initial_pay: `0`,
                month: `$${(price * 12).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                lexis_month: `$${Number(repayMaintenanceDetails[4]?.discounted).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            }
        }

        const repay_table = () => {
            const section = [];
            section.push(repay_year1());
            section.push(repay_year2());
            section.push(repay_year3());
            if (clientProfile[0]?.duration === '48 Months' || clientProfile[0]?.duration === '60 Months') {
                section.push(repay_year4());
            }
            if (clientProfile[0]?.duration === '60 Months') {
                section.push(repay_year5());
            }
            return section;
        }


        const checkOnlinetraning = () => {
            if (clientProfile[0]?.traning_method.toLowerCase() === 'online learning') {
                return true;
            }
            for (let i = 0; i < defaultServices.length; i++) {
                if (defaultServices[i]?.traning_method.toLowerCase() === 'online learning') {
                    return true;
                }
            }
            for (let i = 0; i < optionalServices.length; i++) {
                if (optionalServices[i]?.traning_method.toLowerCase() === 'online learning') {
                    return true;
                }
            }
            return false;
        }

        const checkOnsiteRemoteTraining = () => {
            if (clientProfile[0]?.traning_method.toLowerCase() === 'onsite learning' ||
                clientProfile[0]?.traning_method.toLowerCase() === 'remote traning') {
                return true;
            }
            for (let i = 0; i < defaultServices.length; i++) {
                if (defaultServices[i]?.traning_method.toLowerCase() === 'onsite learning' ||
                    clientProfile[0]?.traning_method.toLowerCase() === 'remote traning') {
                    return true;
                }
            }
            for (let i = 0; i < optionalServices.length; i++) {
                if (optionalServices[i]?.traning_method.toLowerCase() === 'onsite learning' ||
                    clientProfile[0]?.traning_method.toLowerCase() === 'remote traning') {
                    return true;
                }
            }
            return false;
        }
        // console.log(checkOnlinetraning(),'checkOnlinetraning')

        doc.render({
            client_name: clientProfile[0].client_name,
            pro_date: proposalDetails[0].edited_date
                ? moment(proposalDetails[0].edited_date).format('DD-MMM-YYYY')
                : moment(proposalDetails[0].date_of_submissione).format('DD-MMM-YYYY'),
            ss_name: userDetailsWithID[0].fname + ' ' + userDetailsWithID[0].lname,
            ss_designation: "Solution Specialist",
            ss_email: userDetailsWithID[0].email,
            ss_phone: userDetailsWithID[0].phone,
            client_address: clientProfile[0]?.address,
            nou: clientProfile[0]?.num_of_users,
            term_month: clientProfile[0]?.duration,

            specificsSections: getSpecifics(),
            software_licenses: software_licenses_section(),
            currency: clientProfile[0]?.currency,
            prof_services: proffesional_services(),

            Software_SubTotal: `$${Number(repaySoftwareServicesValues[0]?.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            ServicesSubTotal: `$${Number(repaySoftwareServicesValues[1]?.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,

            UpfrontInvestment: Number(upfrontCostDetails[16]?.percent_discount) > 0
                ? 'Up-front Investment (including confidential discount – see notes below)'
                : 'Up-front Investment',
            TotalCostExcl: `$${Number(upfrontCostDetails[18]?.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            GST_percentage: function () {
                const gst = GSTPercentages.filter((item) => item.country_name === clientProfile[0].country);
                // console.log(gst)
                return gst[0]?.gst_percentage;
            }(),
            GSTonTotal: `$${Number(upfrontCostDetails[19]?.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            TotalCostIncGST: `$${Number(upfrontCostDetails[20]?.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            ongoing_maintenance: ongoing_maintenance_values(),
            TotalAnnualMaintenanceFees: Number(upfrontCostDetails[16]?.percent_discount) > 0
                ? 'Total Annual Maintenance Fees (including confidential discount - see notes below)'
                : 'Total Annual Maintenance Fees',
            CareTotalExGST: `$${Number(ongoingMainDetails[9]?.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            CareGST: `$${Number(ongoingMainDetails[10]?.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            CareTotalIncGST: `$${Number(ongoingMainDetails[11]?.cost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            disc_maint: ongoingMainDetails[7]?.percent_discount,
            notes_on_inves_sum: notes_inves_sum(),

            upfront_selected: function () {
                if (clientProfile[0]?.duration === 'Upfront') {
                    return false;
                }
                return true;
            }(),
            initial_pay: `$${Number(repaymentCalcDetails[0]?.payment).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            per_month_cost: function () {
                let month = 0;
                if (clientProfile[0]?.duration === '36 Months') {
                    month = 36;
                }
                else {
                    if (clientProfile[0]?.duration === '48 Months') {
                        month = 48;
                    }
                    else {
                        if (clientProfile[0]?.duration === '60 Months') {
                            month = 60;
                        }
                        else {
                            month = 0;
                        }
                    }
                }
                let users = clientProfile[0]?.num_of_users;
                if (miscellaneous[0]?.included !== '') {
                    users = Number(users) < 10 ? 10
                        : Number(users) % 5 === 0 ? Number(users)
                            : Number(users) + (5 - (Number(users) % 5));
                }
                const value = Number(repaymentCalcDetails[61]?.payment) + Number(repaymentCalcDetails[61]?.lexis_care) - Number(repaymentCalcDetails[0]?.payment);
                return `$${(value / (month * Number(users))).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            }(),
            repay_years: repay_table(),

            monthTotal: function () {
                const value = Number(repaymentCalcDetails[61]?.payment);
                return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            }(),
            lexisMonthTotal: function () {
                const value = Number(repayMaintenanceDetails[5]?.discounted);
                return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            }(),
            Year_LexisCareOnly: function () {
                let index = 0;
                if (clientProfile[0]?.duration === '36 Months') {
                    index = 2;
                }
                else {
                    if (clientProfile[0]?.duration === '48 Months') {
                        index = 3;
                    }
                    else {
                        if (clientProfile[0]?.duration === '60 Months') {
                            index = 4;
                        }
                    }
                }
                const value = Number(repayMaintenanceDetails[index]?.discounted);
                return `$${(value + value * 0.05).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            }(),
            hasDataMigration: !(optionalServices[0].task.toLowerCase().includes('data migration required')),
            CURRENT_PMS: optionalServices[0].task,
            isOnlineLearningSelected: checkOnlinetraning(),
            onsiteOrRemote: checkOnsiteRemoteTraining(),
            blendedLearning: clientProfile[0]?.traning_method.toLowerCase() === 'blended learning',
            isAdditionalPresedentYES: optionalServices[10]?.include === 'Yes',
            softDocsSelected: optionalServices[13]?.include === 'Yes',

            proposal_expiry_date: moment(clientProfile[0]?.end_valid_date).format('DD-MMM-YYYY'),
            deposit_amount_exGST: `$${Number(repaymentCalcDetails[0]?.payment).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            Plan_Months: clientProfile[0]?.duration,
            travelTimeIncluded: clientProfile[0]?.time_inc_in_project === 'Yes',

            HoursPerDay: hrsPerDay[0]?.hrs_per_days,
            EssentialsMethod: defaultServices[2]?.traning_method !== '' ?
                defaultServices[2]?.traning_method : clientProfile[0]?.traning_method,
            OperationsMethod: defaultServices[3]?.traning_method !== '' ?
                defaultServices[3]?.traning_method : clientProfile[0]?.traning_method,
            AdminMethod: defaultServices[4]?.traning_method !== '' ?
                defaultServices[4]?.traning_method : clientProfile[0]?.traning_method,
            BPAEssentialsMethod: optionalServices[8]?.traning_method !== '' ?
                optionalServices[8]?.traning_method : clientProfile[0]?.traning_method,
            DataPrecMethod: optionalServices[4]?.traning_method !== '' ?
                optionalServices[4]?.traning_method : clientProfile[0]?.traning_method,
            DataPrecPhoneBookMethod: optionalServices[9]?.traning_method !== '' ?
                optionalServices[9]?.traning_method : clientProfile[0]?.traning_method,
            IntroWorkflowMethod: optionalServices[6]?.traning_method !== '' ?
                optionalServices[6]?.traning_method : clientProfile[0]?.traning_method,
            ScriptingMethod: optionalServices[5]?.traning_method !== '' ?
                optionalServices[5]?.traning_method : clientProfile[0]?.traning_method,
            EUTProfMethod: defaultServices[10]?.traning_method !== '' ?
                defaultServices[10]?.traning_method : clientProfile[0]?.traning_method,
            EUTBPAMethod: optionalServices[7]?.traning_method !== '' ?
                optionalServices[7]?.traning_method : clientProfile[0]?.traning_method,
            ReportMethod: optionalServices[3]?.traning_method !== '' ?
                optionalServices[3]?.traning_method : clientProfile[0]?.traning_method,
            TrainTrainerProfMethod: defaultServices[10]?.traning_method.toLowerCase() === 'train the trainer' ?
                defaultServices[10]?.traning_method : clientProfile[0]?.traning_method,
            TrainTrainerBPAMethod: defaultServices[11]?.traning_method.toLowerCase() === 'train the trainer' ?
                defaultServices[11]?.traning_method : clientProfile[0]?.traning_method,
            TrainingReviewMethod: defaultServices[12]?.traning_method.toLowerCase() === 'train the trainer' ?
                defaultServices[12]?.traning_method : clientProfile[0]?.traning_method,

            scopingStudySelected: function () {
                if (miscellaneous[2]?.included === 'Yes') {
                    return true;
                }
                return false;
            }(),
            dataMigrationName: optionalServices[0].task,
        });

        const buf = doc.getZip().generate({ type: "nodebuffer" });
        fs.writeFileSync(path.resolve(__dirname, path.join('files', 'output.docx')), buf);

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
                    products.push({ product: 'Oracle Licences' });
                }
                if (optionalServices[16]?.include === 'Yes') {
                    products.push({ product: 'Affinity Mobile' });
                }
                if (optionalServices[14]?.include === 'Yes') {
                    products.push({ product: 'Client Portal' });
                }
                if (optionalServices[13]?.include === 'Yes') {
                    products.push({ product: 'Softdocs Integration' });
                }
                if (optionalServices[18]?.include === 'Yes') {
                    products.push({ product: 'Settlement Adjuster' });
                }
                return products;
            }(),
            other_services: function () {
                const services = [];
                if (miscellaneous[2]?.included === 'Yes') {
                    services.push({ service: 'Scoping study' });
                }
                if (!(optionalServices[0].task.toLowerCase().includes('data migration required'))) {
                    services.push({ service: 'Data Migration' });
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
    getDocfile
}