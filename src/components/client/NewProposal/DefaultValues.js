import moment from 'moment';

const defaultClientProfile = {
    clientName: '',
    clientNumber: '',
    opportunityNumber: '',
    opportunityName: '',
    numOfUsers: '',
    numOfFreeEarners: '',
    country: '',
    objective: '',
    commercialObjective: '',
    upsell: '',
    solutionSpecialistId: '',
    quickStart: 'No',
    currentSoftwareId: '',
    endValidDate: new Date(moment().add(30, 'days')),
    duration: '',
    address: '',
}

const defaultInfo = {
    hoursRequired: '',
    timeIncluded: 'No',
    traningMethod: 'Blended Learning',
    bpaSetup: 'Standard',
    specialConditions: '',
    currency: 'AUD'
}

const defaultAttendingCourses = {
    operationsAdminLabel: 'Operations/Admin',
    operationsAdmin: '',
    dataformsLabel: 'DataForms and Precedents or Scripting or Workflow',
    dataforms: '',
    endUserAccountLabel: 'End User Training(Accounts)',
    endUserAccount: 0,
    endUserBPALabel: 'End User Training(BPA)',
    endUserBPA: 0,
}


const defaultServicesRow = {
    task: '',
    traningMethod: '',
    team: '',
    include: 'Yes',
    PM: 0,
    TSG: 0,
    accountsTraining: 0,
    accountsConsulting: 0,
    BPAConsulting: 0,
    travel: 0,
    totalHrs: 0
}
const defaultServices = {
    projectMgmt: { ...defaultServicesRow, team: 'PM', task: 'Project Management' },
    installationOracle: { ...defaultServicesRow, team: 'TSG', task: 'Installation Oracle and Affinity' },
    essentialsCourse: { ...defaultServicesRow, team: 'ACC', task: 'Essentials Course (max. 6/session)' },
    operationsCourse: { ...defaultServicesRow, team: 'ACC', task: 'Operations Course (max. 6/session)' },
    administrationCourse: { ...defaultServicesRow, team: 'ACC', task: 'Administration Course (max. 6/session)' },
    systemSetup: { ...defaultServicesRow, team: 'ACC', task: 'System Setup & Commence Backprocessing' },
    backprocessing: { ...defaultServicesRow, team: 'ACC', task: 'Backprocessing Assistance' },
    reconcileTakeUp: { ...defaultServicesRow, team: 'ACC', task: 'Reconcile Take Up & Go Live Assistance' },
    anticipatedDisbs: { ...defaultServicesRow, team: 'ACC', task: 'Anticipated Disbs/Creditors/Bank Reconciliation' },
    trainInBillTemp: { ...defaultServicesRow, team: 'ACC', task: 'Train in Bill Templates' },
    endUserTraining: { ...defaultServicesRow, team: 'ACC', task: 'End User Training' },
    endOfMonth: { ...defaultServicesRow, team: 'ACC', task: 'End of Month/Training in Reports' },
    documentMgmt: { ...defaultServicesRow, team: 'BPA', task: 'Document Management Installation & Training' },
    totalHrsBaseInstall: { ...defaultServicesRow, team: '', include: '', task: 'Total Hours for Base Install/Take Up' },
    totalDays: { ...defaultServicesRow, team: '', include: '', task: 'Total Days' },
}



const optionalServicesRow = {
    task: '',
    traningMethod: '',
    include: 'No',
    team: '',
    PM: 0,
    TSG: 0,
    dataMigration: 0,
    accountsTraining: 0,
    accountsConsulting: 0,
    BPATraining: 0,
    BPAConsulting: 0,
    travel: 0,
    totalHrs: 0
}
const defaultOptionalServices = {
    dataMigrationRow: { ...optionalServicesRow, team: 'DM', task: 'Data Migration Required?' },
    selfCustody: { ...optionalServicesRow, team: 'ACC', task: 'Safe Custody Register/Investments' },
    multyPartyBilling: { ...optionalServicesRow, team: 'ACC', task: 'Multi-party billing' },
    reportWriting: { ...optionalServicesRow, team: 'ACC', task: 'Report Writing Course' },
    dataformsMax: { ...optionalServicesRow, team: 'BPA', task: 'Dataforms & Precedents(max. 6/session)' },
    scripting: { ...optionalServicesRow, team: 'BPA', task: 'Scripting(max. 6/session)' },
    workflow: { ...optionalServicesRow, team: 'BPA', task: 'Workflow(max. 6/session)' },
    BPAEndUser: { ...optionalServicesRow, team: 'BPA', task: 'BPA End User Training(max. 6/session)' },
    BPAEssentials: { ...optionalServicesRow, team: 'BPA', task: 'BPA Essentials(max. 6/session)' },
    dataformsPhoneBook: { ...optionalServicesRow, team: 'BPA', task: 'Dataforms & Precedents(Phonebook only)' },
    addPrecedent: { ...optionalServicesRow, team: 'BPA', task: 'Additional precedent configuration' },
    BPAGoLive: { ...optionalServicesRow, team: 'BPA', task: 'BPA Go Live assistance' },
    exchangeIntegration: { ...optionalServicesRow, team: 'TSG/BPA', task: 'Exchange Integration' },
    softdocsIntegration: { ...optionalServicesRow, team: 'BPA', task: 'Softdocs Integration' },
    clientPortal: { ...optionalServicesRow, team: 'TSG/BPA', task: 'Client Portal' },
    worksiteIntegration: { ...optionalServicesRow, team: 'BPA', task: 'Worksite Integration' },
    affinityMobile: { ...optionalServicesRow, team: 'TSG', task: 'Affinity Mobile' },
    empower: { ...optionalServicesRow, team: 'BPA', task: 'Empower' },
    settlementAdjuster: { ...optionalServicesRow, team: 'TSG', task: 'Settlement Adjuster' },
    thirdPartyIT: { ...optionalServicesRow, team: 'TSG', task: 'Third-Party IT resources or infrastructure' },

    totalHours: { ...optionalServicesRow, task: 'Total Hours', traningMethod: '', team: '', include: '', },
    totalDays: { ...optionalServicesRow, task: 'Total Days', traningMethod: '', team: '', include: '', },
    grandTotalHours: { ...optionalServicesRow, task: 'Grand Total Hours', traningMethod: '', team: '', include: '', },
    grandTotalDays: { ...optionalServicesRow, task: 'Grand Total Days', traningMethod: '', team: '', include: '', },
}


const miscellaneousRow = {
    miscellaneous: '',
    included: 'No',
    hours: 0,
    price: 0
}
const defaultMiscellaneous = {
    affinityServer: { ...miscellaneousRow, miscellaneous: 'Affinity Server CPUs', included: '' },
    lexisResearch: { ...miscellaneousRow, miscellaneous: 'Is LexisNexis Research included?', },
    scopingStudy: { ...miscellaneousRow, miscellaneous: 'Is a scoping study required?', },
    additionalReturn: { ...miscellaneousRow, miscellaneous: 'Additional return trips required?', included: 0 },
    propertyPresidency: { ...miscellaneousRow, miscellaneous: 'Property Presidency Pack - NZ', hours: '', price: '' },
}


// const date = new Date();
const defaultNotes = [];
//  [{
//     note_no: 1,
//     user_id: sessionStorage.getItem('user_id') || -1,
//     date: moment(date).format('DD-MM-YYYY'),
//     note: '',
//     time: `${date.getHours()}:${date.getMinutes()}`,
//     user: (sessionStorage.getItem('fname') || 'fname') + ' ' + (sessionStorage.getItem('lname') || 'lname'),
// }]


const upfrontCostRow = {
    label: '',
    cost: 0,
    percentDiscount: 0,
    discountItemcost: 0,
    discountAmount: 0
}
const defaultUpfrontCost = {
    softwareDiscount: '',
    serviceDiscount: '',
    lexisServerLicense: { ...upfrontCostRow, label: 'Lexis Affinity Server licence' },
    lexisUserLicense: { ...upfrontCostRow, label: 'Lexis Affinity User licences for users' },
    oracleLicenses: { ...upfrontCostRow, label: 'Oracle licenses' },
    clientPortal: { ...upfrontCostRow, label: 'Client Portal' },
    affinityMobile: { ...upfrontCostRow, label: 'Affinity Mobile' },
    lexisSettleAdjuster: { ...upfrontCostRow, label: 'Lexis Affinity Settlement Adjuster' },
    twoWayMicrosoft: { ...upfrontCostRow, label: '2-Way Microsoft Exchange Integration' },
    empower: { ...upfrontCostRow, label: 'Empower' },
    softDocs: { ...upfrontCostRow, label: 'SoftDocs InterConnect' },

    ImplementServices: { ...upfrontCostRow, label: 'Implementation Services' },
    ImplementTraning: { ...upfrontCostRow, label: 'Implementation Training' },
    postImplementation: { ...upfrontCostRow, label: 'Post-implementation review & assistance' },
    dataMigration: { ...upfrontCostRow, label: 'Data Migration' },
    travelAllowance: { ...upfrontCostRow, label: 'Allowance for Travel' },
    scopingStudy: { ...upfrontCostRow, label: 'Scoping Study' },
    propertyPrecedent: { ...upfrontCostRow, label: 'Property Precedents Pack - NZ' },
    subTotal: { ...upfrontCostRow, label: 'Sub Total' },
    lessConfidential: { ...upfrontCostRow, label: 'Less confidential discount', percentDiscount: 0 },
    totalInvesteExcl: { ...upfrontCostRow, label: 'Total Investment excl. GST', percentDiscount: 0 },
    GSTPayable: { ...upfrontCostRow, label: 'GST Payable 15.0%', percentDiscount: 0 },
    totalInvestePay: { ...upfrontCostRow, label: 'Total Investment: Payable Year 1', percentDiscount: 0 },
    totalPerUser: { ...upfrontCostRow, label: 'Total Per User', percentDiscount: 0 },
}

const defaultOngoingMnt = {
    annualAffinity: { ...upfrontCostRow, label: 'Annual Affinity Lexis Care' },
    annualOracleCare: { ...upfrontCostRow, label: 'Annual OracleCare for Oracle Licences' },
    annualAffinityMobile: { ...upfrontCostRow, label: 'Annual Affinity Mobile Lexis Care' },
    annualClient: { ...upfrontCostRow, label: 'Annual Client Portal Lexis Care' },
    annualEmpower: { ...upfrontCostRow, label: 'Annual Empower Lexis Care' },
    annualSoftDocs: { ...upfrontCostRow, label: 'Annual SoftDocs InterConnect Lexis Care' },
    annualSettlement: { ...upfrontCostRow, label: 'Annual Settlement Adjuster Lexis Care' },
    subTotal: { ...upfrontCostRow, label: 'Sub Total' },
    lessConfidential: { ...upfrontCostRow, label: 'Less confidential discount', percentDiscount: '-', discountItemcost: '-', discountAmount: '-' },
    totalMntExclGST: { ...upfrontCostRow, label: 'Total Maintenance Fees excl. GST', percentDiscount: '-', discountItemcost: '-', discountAmount: '-' },
    GSTPayable: { ...upfrontCostRow, label: 'GST Payable 0%', percentDiscount: '-', discountItemcost: '-', discountAmount: '-' },
    totalMntAnnual: { ...upfrontCostRow, label: 'Total Maintenance Fees:Annual', percentDiscount: '-', discountItemcost: '-', discountAmount: '-' },
    totalMntMonthly: { ...upfrontCostRow, label: 'Total Maintenance Fees: Monthly', percentDiscount: '-', discountItemcost: '-', discountAmount: '-' },
    totalAnnualCost: { ...upfrontCostRow, label: 'Total Annual Cost For Each User', percentDiscount: '-', discountItemcost: '-', discountAmount: '-' },
    totalCostMonth: { ...upfrontCostRow, label: 'Total Cost Per Month For Each User', percentDiscount: '-', discountItemcost: '-', discountAmount: '-' },
}

const discountTableRow = {
    label: '',
    totalAmount: 0,
    discountAmount: 0,
    amountAfterDiscount: 0,
    discountPercent: 0,
}
const defaultDiscountTable = {
    softwareDis: { ...discountTableRow, label: 'Software License Subtotal' },
    serviceDis: { ...discountTableRow, label: 'Professional Service Subtotal' },
    lexisCareDis: { ...discountTableRow, label: 'Lexis Care 0 Year Subtotal' },
    totalDis: { ...discountTableRow, label: 'Total 0 Year Contract Value' }
}

const defaultRepayment = {
    totalsTable: {
        software: { label: 'Software', cost: 0, gcrmEntries: 0, },
        services: { label: 'Services', cost: 0, gcrmEntries: 0, },
        sTotal: { label: 'Total', cost: 0, gcrmEntries: 0, },
        pricePerTool: { label: 'Price per tool', cost: 'N/A', gcrmEntries: 0, },
        priceTotal: { label: 'Total', cost: 'N/A', gcrmEntries: 0, },
    },
    mntTable: {
        year1: { label: 'Year 1', RRP: 0, discounted: 0 },
        year2: { label: 'Year 2', RRP: 0, discounted: 0 },
        year3: { label: 'Year 3', RRP: 0, discounted: 0 },
        year4: { label: 'Year 4', RRP: 0, discounted: 0 },
        year5: { label: 'Year 5', RRP: 0, discounted: 0 },
        mntTotal: { label: 'Total', RRP: 0, discounted: 0 },
    },
    repayments: {
        initPayment: { label: 'Initial Payment', payments: 0, lexisCare: 0 },
        month1: { label: 'Month 1', payments: 0, lexisCare: 0 },
        month2: { label: 'Month 2', payments: 0, lexisCare: 0 },
        month3: { label: 'Month 3', payments: 0, lexisCare: 0 },
        month4: { label: 'Month 4', payments: 0, lexisCare: 0 },
        month5: { label: 'Month 5', payments: 0, lexisCare: 0 },
        month6: { label: 'Month 6', payments: 0, lexisCare: 0 },
        month7: { label: 'Month 7', payments: 0, lexisCare: 0 },
        month8: { label: 'Month 8', payments: 0, lexisCare: 0 },
        month9: { label: 'Month 9', payments: 0, lexisCare: 0 },
        month10: { label: 'Month 10', payments: 0, lexisCare: 0 },
        month11: { label: 'Month 11', payments: 0, lexisCare: 0 },
        month12: { label: 'Month 12', payments: 0, lexisCare: 0 },
        month13: { label: 'Month 13', payments: 0, lexisCare: 0 },
        month14: { label: 'Month 14', payments: 0, lexisCare: 0 },
        month15: { label: 'Month 15', payments: 0, lexisCare: 0 },
        month16: { label: 'Month 16', payments: 0, lexisCare: 0 },
        month17: { label: 'Month 17', payments: 0, lexisCare: 0 },
        month18: { label: 'Month 18', payments: 0, lexisCare: 0 },
        month19: { label: 'Month 19', payments: 0, lexisCare: 0 },
        month20: { label: 'Month 20', payments: 0, lexisCare: 0 },
        month21: { label: 'Month 21', payments: 0, lexisCare: 0 },
        month22: { label: 'Month 22', payments: 0, lexisCare: 0 },
        month23: { label: 'Month 23', payments: 0, lexisCare: 0 },
        month24: { label: 'Month 24', payments: 0, lexisCare: 0 },
        month25: { label: 'Month 25', payments: 0, lexisCare: 0 },
        month26: { label: 'Month 26', payments: 0, lexisCare: 0 },
        month27: { label: 'Month 27', payments: 0, lexisCare: 0 },
        month28: { label: 'Month 28', payments: 0, lexisCare: 0 },
        month29: { label: 'Month 29', payments: 0, lexisCare: 0 },
        month30: { label: 'Month 30', payments: 0, lexisCare: 0 },
        month31: { label: 'Month 31', payments: 0, lexisCare: 0 },
        month32: { label: 'Month 32', payments: 0, lexisCare: 0 },
        month33: { label: 'Month 33', payments: 0, lexisCare: 0 },
        month34: { label: 'Month 34', payments: 0, lexisCare: 0 },
        month35: { label: 'Month 35', payments: 0, lexisCare: 0 },
        month36: { label: 'Month 36', payments: 0, lexisCare: 0 },
        month37: { label: 'Month 37', payments: 0, lexisCare: 0 },
        month38: { label: 'Month 38', payments: 0, lexisCare: 0 },
        month39: { label: 'Month 39', payments: 0, lexisCare: 0 },
        month40: { label: 'Month 40', payments: 0, lexisCare: 0 },
        month41: { label: 'Month 41', payments: 0, lexisCare: 0 },
        month42: { label: 'Month 42', payments: 0, lexisCare: 0 },
        month43: { label: 'Month 43', payments: 0, lexisCare: 0 },
        month44: { label: 'Month 44', payments: 0, lexisCare: 0 },
        month45: { label: 'Month 45', payments: 0, lexisCare: 0 },
        month46: { label: 'Month 46', payments: 0, lexisCare: 0 },
        month47: { label: 'Month 47', payments: 0, lexisCare: 0 },
        month48: { label: 'Month 48', payments: 0, lexisCare: 0 },
        month49: { label: 'Month 49', payments: 0, lexisCare: 0 },
        month50: { label: 'Month 50', payments: 0, lexisCare: 0 },
        month51: { label: 'Month 51', payments: 0, lexisCare: 0 },
        month52: { label: 'Month 52', payments: 0, lexisCare: 0 },
        month53: { label: 'Month 53', payments: 0, lexisCare: 0 },
        month54: { label: 'Month 54', payments: 0, lexisCare: 0 },
        month55: { label: 'Month 55', payments: 0, lexisCare: 0 },
        month56: { label: 'Month 56', payments: 0, lexisCare: 0 },
        month57: { label: 'Month 57', payments: 0, lexisCare: 0 },
        month58: { label: 'Month 58', payments: 0, lexisCare: 0 },
        month59: { label: 'Month 59', payments: 0, lexisCare: 0 },
        month60: { label: 'Month 60', payments: 0, lexisCare: 0 },
        repaymentTotal: { label: 'Total', payments: 0, lexisCare: 0 },
    }
}


const DefaultValues = {
    defaultClientProfile: defaultClientProfile,
    defaultInfo: defaultInfo,
    defaultAttendingCourses: defaultAttendingCourses,
    defaultServices: defaultServices,
    defaultOptionalServices: defaultOptionalServices,
    defaultMiscellaneous: defaultMiscellaneous,
    defaultNotes: defaultNotes,
    defaultUpfrontCost: defaultUpfrontCost,
    defaultOngoingMnt: defaultOngoingMnt,
    defaultRepayment: defaultRepayment,
    defaultDiscountTable: defaultDiscountTable,
};


export default DefaultValues;