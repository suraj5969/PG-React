import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import AttendingCourses from './Tables/Implementations/AttendingCourses';
import DefaultServices from './Tables/Implementations/DefaultServices';
import OptionalServices from './Tables/Implementations/OptionalServices';
import Miscellaneous from './Tables/Implementations/Miscellaneous';
import SalesNotes from './Tables/SalesNotes/SalesNotes';
import UpfrontCosts from './Tables/InvestementSummary/UpfrontCost';
import OngoingMaintenance from './Tables/InvestementSummary/OngoingMaintenance';
import RepaymentCalculator from './Tables/RepaymentCalculator/RepaymentCalculator';
import ImplementationLogic from './Tables/TablesLogic/ImplementationLogic'
import InvestmentLogic from './Tables/TablesLogic/InvestmentSummaryLogic';
import RepaymentCalculatorLogic from './Tables/TablesLogic/RepaymentCalculatorLogic';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

// function a11yProps(index) {
//     return {
//         id: `simple-tab-${index}`,
//         'aria-controls': `simple-tabpanel-${index}`,
//     };
// }

export default function SubTabs(props) {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
        // console.log('tabvalue' + newValue)
    };

    const [implementationTabValue, setImplementationTabValue] = React.useState(0);
    const handleImplementationTabChange = (event, newValue) => {
        setImplementationTabValue(newValue);
        // console.log('subtabvalue' + newValue)
    };

    const [investmentTabValue, setInvestmentTabValue] = React.useState(0);
    const handleInvestmentTabChange = (event, newValue) => {
        setInvestmentTabValue(newValue);
        // console.log('subtabvalue' + newValue)
    };


    const [optionalPopupsState, setOptionalPopupsState] = React.useState({
        dataMigrationRow: false,
        affinityMobile: false,
        settlementAdjuster: false,
        empower: false,
    })

    const [miscellaneousPopupsState, setMiscellenousPopupsState] = React.useState({
        scopingStudy: false,
        affinityServer: false,
    })

    return (
        <>
            <Container maxWidth="xl" className="subtabs-container" sx={{ marginTop: '2rem' }}>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value}
                            onChange={handleChange}
                            variant="scrollable"
                            scrollButtons
                            allowScrollButtonsMobile
                            aria-label="SubTabs">
                            <Tab label="IMPLEMENTATION" />
                            <Tab label="SALES NOTES" />
                            <Tab label="INVESTMENT SUMMARY" />
                            <Tab label="REPAYMENT CALCULATOR" />
                        </Tabs>
                    </Box>
                    <TabPanel className='tables-tab' value={value} index={0}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={implementationTabValue}
                                onChange={handleImplementationTabChange}
                                variant="scrollable"
                                scrollButtons
                                allowScrollButtonsMobile
                                aria-label="basic tabs example">
                                <Tab label="Attending Courses" />
                                <Tab label="Default Services" />
                                <Tab label="Optional services" />
                                <Tab label="Miscellaneous" />
                            </Tabs>
                        </Box>
                        <TabPanel value={implementationTabValue} index={0}>
                            <AttendingCourses
                                attendingCourses={props.attendingCourses}
                                setAttendingCourses={props.setAttendingCourses}
                                clientProfile={props.clientProfile}
                                setImplementationTabValue={setImplementationTabValue}
                                viewMode={props.viewMode}
                            />
                        </TabPanel>
                        <TabPanel value={implementationTabValue} index={1}>
                            <DefaultServices
                                clientProfile={props.clientProfile}
                                Info={props.Info}
                                // attendingCourses={props.attendingCourses}
                                defaultServicesValues={props.defaultServicesValues}
                                setDefaultServicesValues={props.setDefaultServicesValues}
                                setImplementationTabValue={setImplementationTabValue}
                                viewMode={props.viewMode}
                            />
                        </TabPanel>
                        <TabPanel value={implementationTabValue} index={2}>
                            <OptionalServices
                                clientProfile={props.clientProfile}
                                // Info={props.Info}
                                // attendingCourses={props.attendingCourses}
                                // defaultServicesValues={props.defaultServicesValues}
                                optionalServices={props.optionalServices}
                                setOptionalServices={props.setOptionalServices}
                                optionalPopupsState={optionalPopupsState}
                                setOptionalPopupsState={setOptionalPopupsState}
                                setImplementationTabValue={setImplementationTabValue}
                                setUpfrontCost={props.setUpfrontCost}
                                setAffinityMobilePopUpValue={props.setAffinityMobilePopUpValue}
                                // empowerModules={props.empowerModules}
                                setEmpowerModules={props.setEmpowerModules}
                                // settlementPopUpValue={props.settlementPopUpValue}
                                setSettlementPopUpValue={props.setSettlementPopUpValue}
                                setMitimesPopupValue={props.setMitimesPopupValue}
                                viewMode={props.viewMode}
                            />
                        </TabPanel>
                        <TabPanel value={implementationTabValue} index={3}>
                            <Miscellaneous
                                clientProfile={props.clientProfile}
                                miscellaneous={props.miscellaneous}
                                setMiscellaneous={props.setMiscellaneous}
                                miscellaneousPopupsState={miscellaneousPopupsState}
                                setMiscellenousPopupsState={setMiscellenousPopupsState}
                                scopingStudyPopUpValue={props.scopingStudyPopUpValue}
                                setScopingStudyPopUpValue={props.setScopingStudyPopUpValue}
                                setpracticeAreaKitPopupValues={props.setpracticeAreaKitPopupValues}
                                setlnSearchPopUpValue={props.setlnSearchPopUpValue}
                                setValue={setValue}
                                viewMode={props.viewMode}
                                affinityServerPopupValues={props.affinityServerPopupValues}
                                setAffinityServerPopupValues={props.setAffinityServerPopupValues}
                            />
                        </TabPanel>

                    </TabPanel>
                    <TabPanel className='tables-tab' value={value} index={1}>
                        <SalesNotes
                            notes={props.notes}
                            setNotes={props.setNotes}
                            setValue={setValue}
                            viewMode={props.viewMode}
                        />
                    </TabPanel>
                    <TabPanel className='tables-tab' value={value} index={2}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={investmentTabValue}
                                onChange={handleInvestmentTabChange}
                                variant="scrollable"
                                scrollButtons
                                allowScrollButtonsMobile
                                aria-label="basic tabs example">
                                <Tab label="Upfront Costs" />
                                <Tab label="Ongoing Maintenance Fees" />
                            </Tabs>
                        </Box>
                        <TabPanel value={investmentTabValue} index={0}>
                            <UpfrontCosts
                                // clientProfile={props.clientProfile}
                                upfrontCost={props.upfrontCost}
                                setUpfrontCost={props.setUpfrontCost}
                                setInvestmentTabValue={setInvestmentTabValue}
                                viewMode={props.viewMode}
                            />
                        </TabPanel>
                        <TabPanel value={investmentTabValue} index={1}>
                            <OngoingMaintenance
                                // clientProfile={props.clientProfile}
                                ongoingMnt={props.ongoingMnt}
                                setOngoingMnt={props.setOngoingMnt}
                                // upfrontCost={props.upfrontCost}
                                setValue={setValue}
                                viewMode={props.viewMode}
                            />
                        </TabPanel>
                    </TabPanel>
                    <TabPanel className='tables-tab' value={value} index={3}>
                        <RepaymentCalculator
                            // clientProfile={props.clientProfile}
                            // upfrontCost={props.upfrontCost}
                            // ongoingMnt={props.ongoingMnt}
                            repaymentCalc={props.repaymentCalc}
                            setRepaymentCalc={props.setRepaymentCalc}
                            discountTable={props.discountTable}
                            setDiscountTable={props.setDiscountTable}
                            viewMode={props.viewMode}
                        />
                    </TabPanel>
                </Box>
            </Container>

            {
                !props.viewMode ?
                    <>
                        <ImplementationLogic
                            clientProfile={props.clientProfile}
                            Info={props.Info}
                            attendingCourses={props.attendingCourses}
                            setAttendingCourses={props.setAttendingCourses}
                            defaultServicesValues={props.defaultServicesValues}
                            setDefaultServicesValues={props.setDefaultServicesValues}
                            optionalServices={props.optionalServices}
                            setOptionalServices={props.setOptionalServices}
                            miscellaneous={props.miscellaneous}
                            setMiscellaneous={props.setMiscellaneous}
                            optionalPopupsState={optionalPopupsState}
                            setOptionalPopupsState={setOptionalPopupsState}
                            miscellaneousPopupsState={miscellaneousPopupsState}
                            setMiscellenousPopupsState={setMiscellenousPopupsState}
                            setImplementationTabValue={setImplementationTabValue}
                            setUpfrontCost={props.setUpfrontCost}
                            affinityMobilePopUpValue={props.affinityMobilePopUpValue}
                            setAffinityMobilePopUpValue={props.setAffinityMobilePopUpValue}
                            empowerModules={props.empowerModules}
                            setEmpowerModules={props.setEmpowerModules}
                            setSettlementPopUpValue={props.setSettlementPopUpValue}
                            settlementPopUpValue={props.settlementPopUpValue}
                            setMitimesPopupValue={props.setMitimesPopupValue}
                            affinityServerPopupValues={props.affinityServerPopupValues}
                            setAffinityServerPopupValues={props.setAffinityServerPopupValues}
                        />

                        <InvestmentLogic
                            clientProfile={props.clientProfile}
                            Info={props.Info}
                            attendingCourses={props.attendingCourses}
                            defaultServicesValues={props.defaultServicesValues}
                            optionalServices={props.optionalServices}
                            miscellaneous={props.miscellaneous}
                            upfrontCost={props.upfrontCost}
                            setUpfrontCost={props.setUpfrontCost}
                            ongoingMnt={props.ongoingMnt}
                            setOngoingMnt={props.setOngoingMnt}
                            affinityServerPopupValues={props.affinityServerPopupValues}
                            setAffinityServerPopupValues={props.setAffinityServerPopupValues}
                        />

                        <RepaymentCalculatorLogic
                            clientProfile={props.clientProfile}
                            upfrontCost={props.upfrontCost}
                            ongoingMnt={props.ongoingMnt}
                            repaymentCalc={props.repaymentCalc}
                            setRepaymentCalc={props.setRepaymentCalc}
                            discountTable={props.discountTable}
                            setDiscountTable={props.setDiscountTable}
                        />
                    </>
                    : null
            }
        </>
    );
}
