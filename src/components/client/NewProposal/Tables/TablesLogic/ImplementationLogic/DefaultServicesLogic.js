import React from 'react';
import getQuickStartInfoAPI from '../../../../../../apis/client/getQuickStartInfoAPI.js';
import getDayConversionInfoAPI from '../../../../../../apis/client/getDayConversionInfoAPI.js';
import getHrsPerDayByCountryAPI from '../../../../../../apis/client/getHrsPerDayByCountryAPI.js';

function DefaultServicesLogic(props) {

    const { clientProfile, Info, attendingCourses, defaultServicesValues,
        setDefaultServicesValues } = props;

    const { projectMgmt, installationOracle, essentialsCourse, operationsCourse,
        administrationCourse, systemSetup, backprocessing, reconcileTakeUp,
        anticipatedDisbs, trainInBillTemp, endUserTraining, endOfMonth,
        documentMgmt, totalHrsBaseInstall } = defaultServicesValues;


    const [quickStartServices, setQuickStartServices] = React.useState({
        projectMgmt: false,
        installationOracle: false,
        essentialsCourse: false,
        operationsCourse: false,
        administrationCourse: false,
        systemSetup: false,
        backprocessing: false,
        reconcileTakeUp: false,
        anticipatedDisbs: false,
        trainInBillTemp: false,
        endUserTraining: false,
        endOfMonth: false,
        documentMgmt: false,
    })
    // fetch all quick start services info
    React.useEffect(() => {
        const fetchData = async () => {
            const quickStart = await getQuickStartInfoAPI();
            if (quickStart.status !== 200) {
                console.log('getQuickStartInfoAPI api not working')
            }
            else {
                if ( typeof quickStart.data === 'object' && quickStart.data.length > 12  ) {
                    const services = quickStart.data;
                    setQuickStartServices({
                        projectMgmt: Number(services[0].nofhrs),
                        installationOracle: Number(services[1].nofhrs),
                        essentialsCourse: Number(services[2].nofhrs),
                        operationsCourse: Number(services[3].nofhrs),
                        administrationCourse: Number(services[4].nofhrs),
                        systemSetup: Number(services[5].nofhrs),
                        backprocessing: Number(services[6].nofhrs),
                        reconcileTakeUp: Number(services[7].nofhrs),
                        anticipatedDisbs: Number(services[8].nofhrs),
                        trainInBillTemp: Number(services[9].nofhrs),
                        endUserTraining: Number(services[10].nofhrs),
                        endOfMonth: Number(services[11].nofhrs),
                        documentMgmt: Number(services[12].nofhrs),
                    })
                    // console.log(services, 'services');
                }
            }
        }
        fetchData();
    }, [])

    const [daysValues, setDaysValues] = React.useState({
        halfDay: false,
        oneDay: false,
        twoDay: false,
        threeDay: false,
    })
    // fetch all day values from admin end
    React.useEffect(() => {
        const fetchData = async () => {
            const halfDay = await getDayConversionInfoAPI(1);
            const oneDay = await getDayConversionInfoAPI(2);
            const twoDay = await getDayConversionInfoAPI(3);
            const threeDay = await getDayConversionInfoAPI(4);

            if (halfDay.status !== 200 || oneDay.status !== 200 ||
                twoDay.status !== 200 || threeDay.status !== 200) {
                console.log('getDayConversionInfoAPI api not working')
            }
            else {
                if (halfDay.data.length > 0 && oneDay.data.length > 0 &&
                    twoDay.data.length > 0 && threeDay.data.length > 0) {
                    const halfDayValue = Number(halfDay.data[0].NO_OF_DAYS);
                    const oneDayValue = Number(oneDay.data[0].NO_OF_DAYS);
                    const twoDayValue = Number(twoDay.data[0].NO_OF_DAYS);
                    const threeDayValue = Number(threeDay.data[0].NO_OF_DAYS);

                    setDaysValues({
                        halfDay: halfDayValue,
                        oneDay: oneDayValue,
                        twoDay: twoDayValue,
                        threeDay: threeDayValue
                    })
                }
            }

        }
        fetchData();
    }, [])

    const [countryHours, setCountryHours] = React.useState({
        "Australia": false,
        "New Zealand": false,
    })
    // fetch hours of countries from admin end
    React.useEffect(() => {
        const fetchData = async () => {
            const australiasHours = await getHrsPerDayByCountryAPI("Australia");
            const newZealandHours = await getHrsPerDayByCountryAPI("New Zealand");

            if (australiasHours.status !== 200 || newZealandHours.status !== 200) {
                console.log('getHrsPerDayByCountryAPI api not working')
            }
            else {
                if (australiasHours.data.length > 0 && newZealandHours.data.length > 0) {
                    const australia = Number(australiasHours.data[0].hrs_per_days);
                    const newZealand = Number(newZealandHours.data[0].hrs_per_days);

                    setCountryHours({
                        "Australia": australia,
                        "New Zealand": newZealand
                    })
                }
            }

        }
        fetchData();
    }, [])

    // use effect for projectMgmt and installationOracle rows
    React.useEffect(() => {
            //project management
            // console.log('project mgmt useeffect called');
            let projectPmValue = 0;
            let twoDayValue = 0;
            let installationTsgValue = 0;
            if (clientProfile.objective === 'New Business') {
                if (clientProfile.quickStart === 'Yes') {

                    if (quickStartServices.installationOracle !== false &&
                        quickStartServices.projectMgmt !== false) {
                        installationTsgValue = Number(quickStartServices.installationOracle);
                        projectPmValue = Number(quickStartServices.projectMgmt);

                        setDefaultServicesValues((prevValues) => ({
                            ...prevValues,
                            projectMgmt: {
                                ...prevValues.projectMgmt,
                                PM: projectPmValue,
                                totalHrs: projectPmValue
                            },
                            installationOracle: {
                                ...prevValues.installationOracle,
                                TSG: installationTsgValue,
                                totalHrs: installationTsgValue
                            },
                            totalHrsBaseInstall: {
                                ...prevValues.totalHrsBaseInstall,
                                PM: projectPmValue
                            }
                        }));
                    }

                    // console.log(projectPmValue, 'project mgmt')
                }
                else {

                    if (daysValues.oneDay !== false && daysValues.twoDay !== false) {
                        if (clientProfile.numOfUsers <= 20) {
                            projectPmValue = 5 * Number(daysValues.oneDay);
                            twoDayValue = Number(daysValues.twoDay);
                            setDefaultServicesValues((prevValues) => ({
                                ...prevValues,
                                projectMgmt: {
                                    ...prevValues.projectMgmt,
                                    PM: projectPmValue,
                                    totalHrs: projectPmValue
                                },
                                installationOracle: {
                                    ...prevValues.installationOracle,
                                    TSG: twoDayValue,
                                    totalHrs: twoDayValue
                                },
                                totalHrsBaseInstall: {
                                    ...prevValues.totalHrsBaseInstall,
                                    PM: projectPmValue
                                }
                            }));
                            // console.log(projectMgmt, 'project mgmt')
                        }
                        else {
                            projectPmValue = 6 * Number(daysValues.oneDay);
                            twoDayValue = Number(daysValues.twoDay);
                            setDefaultServicesValues((prevValues) => ({
                                ...prevValues,
                                projectMgmt: {
                                    ...prevValues.projectMgmt,
                                    PM: projectPmValue,
                                    totalHrs: projectPmValue
                                },
                                installationOracle: {
                                    ...prevValues.installationOracle,
                                    TSG: twoDayValue,
                                    totalHrs: twoDayValue
                                },
                                totalHrsBaseInstall: {
                                    ...prevValues.totalHrsBaseInstall,
                                    PM: projectPmValue,
                                }
                            }));
                        }
                    }

                }
                // console.log(data,'quick start');
            }
            else {
                setDefaultServicesValues((prevValues) => ({
                    ...prevValues,
                    projectMgmt: {
                        ...prevValues.projectMgmt,
                        PM: 0,
                        totalHrs: 0
                    },
                    installationOracle: {
                        ...prevValues.installationOracle,
                        TSG: 0,
                        totalHrs: 0
                    },
                    totalHrsBaseInstall: {
                        ...prevValues.totalHrsBaseInstall,
                        PM: 0,
                    }
                }));
            }
    }, [clientProfile.objective, clientProfile.quickStart, clientProfile.numOfUsers,
        quickStartServices, daysValues, setDefaultServicesValues]);

    // use effect for essential course account traning
    React.useEffect(() => {

            if (clientProfile.objective !== 'New Business' ||
                essentialsCourse.traningMethod === 'Online Learning' ||
                essentialsCourse.traningMethod === 'Onsite Learning') {

                setDefaultServicesValues((prevValues) => ({
                    ...prevValues,
                    essentialsCourse: {
                        ...prevValues.essentialsCourse,
                        accountsTraining: 0
                    },
                }))
                return;
            }
            else {
                if (Info.traningMethod === 'Online Learning') {
                    setDefaultServicesValues((prevValues) => ({
                        ...prevValues,
                        essentialsCourse: {
                            ...prevValues.essentialsCourse,
                            accountsTraining: 0
                        },
                    }))
                    return;
                }
            }

            if (clientProfile.quickStart === 'Yes') {

                if (quickStartServices.essentialsCourse !== false) {
                    let essential = Number(quickStartServices.essentialsCourse);
                    // console.log(value, 'essental account traning quick yes')
                    setDefaultServicesValues((prevValues) => ({
                        ...prevValues,
                        essentialsCourse: {
                            ...prevValues.essentialsCourse,
                            accountsTraining: essential,
                        },
                    }))
                }

            }
            else {
                if (clientProfile.quickStart === 'No') {

                    if (daysValues.oneDay !== false) {
                        let dayValue = Number(daysValues.oneDay);


                        const operationsAdminValue = Number(attendingCourses.operationsAdmin);
                        let value = Math.ceil(operationsAdminValue / 6) * dayValue;
                        // console.log(operationsAdminValue, 'operationsAdminValue')
                        setDefaultServicesValues((prevValues) => ({
                            ...prevValues,
                            essentialsCourse: {
                                ...prevValues.essentialsCourse,
                                accountsTraining: value
                            },
                        }))
                    }

                }
            }
    }, [clientProfile.objective, clientProfile.quickStart, quickStartServices, daysValues,
    Info.traningMethod, essentialsCourse.traningMethod, attendingCourses.operationsAdmin, setDefaultServicesValues])


    //use effect for 4 rows (essentialCourse,operationsCourse,administrationCourse,endUserTraining,)  accountConsulting
    React.useEffect(() => {
        if (clientProfile.objective !== 'New Business') {
            setDefaultServicesValues((prevValues) => ({
                ...prevValues,
                essentialsCourse: {
                    ...prevValues.essentialsCourse,
                    accountsConsulting: 0
                },
                operationsCourse: {
                    ...prevValues.operationsCourse,
                    accountsConsulting: 0
                },
                administrationCourse: {
                    ...prevValues.administrationCourse,
                    accountsConsulting: 0
                },
                endUserTraining: {
                    ...prevValues.endUserTraining,
                    accountsConsulting: 0
                },
            }))
        }
    }, [clientProfile.objective, setDefaultServicesValues])


    // use effect for 4 rows(essentialsCourse and systemSetup and reconcileTakeUp
    //  and endUserTraining) travel column
    React.useEffect(() => {
        if (Info.timeIncluded === 'No') {
            setDefaultServicesValues((prevValues) => ({
                ...prevValues,
                essentialsCourse: {
                    ...prevValues.essentialsCourse,
                    travel: 0
                },
                systemSetup: {
                    ...prevValues.systemSetup,
                    travel: 0
                },
                reconcileTakeUp: {
                    ...prevValues.reconcileTakeUp,
                    travel: 0
                },
                endUserTraining: {
                    ...prevValues.endUserTraining,
                    travel: 0
                },
            }))
        }
        else {
            if (Info.timeIncluded === 'Yes') {
                setDefaultServicesValues((prevValues) => ({
                    ...prevValues,
                    essentialsCourse: {
                        ...prevValues.essentialsCourse,
                        travel: 2 * Number(Info.hoursRequired)
                    },
                    systemSetup: {
                        ...prevValues.systemSetup,
                        travel: 2 * Number(Info.hoursRequired)
                    },
                    reconcileTakeUp: {
                        ...prevValues.reconcileTakeUp,
                        travel: 2 * Number(Info.hoursRequired)
                    },
                    endUserTraining: {
                        ...prevValues.endUserTraining,
                        travel: 2 * Number(Info.hoursRequired)
                    },
                }))
            }
        }
    }, [Info.timeIncluded, Info.hoursRequired, setDefaultServicesValues])


    // use effect for essentialsCourse totalHrs column
    React.useEffect(() => {
        setDefaultServicesValues((prevValues) => ({
            ...prevValues,
            essentialsCourse: {
                ...prevValues.essentialsCourse,
                totalHrs: Number(prevValues.essentialsCourse.accountsTraining)
                    + Number(prevValues.essentialsCourse.accountsConsulting)
                    + Number(prevValues.essentialsCourse.travel)
            }
        }))
    }, [essentialsCourse.accountsTraining, essentialsCourse.accountsConsulting,
    essentialsCourse.travel, setDefaultServicesValues])


    // use effect for operations course account traning
    React.useEffect(() => {
            if (clientProfile.objective !== 'New Business' ||
                operationsCourse.traningMethod === 'Online Learning' ||
                operationsCourse.traningMethod === 'Onsite Learning') {

                setDefaultServicesValues((prevValues) => ({
                    ...prevValues,
                    operationsCourse: {
                        ...prevValues.operationsCourse,
                        accountsTraining: 0
                    },
                }))
                return;
            }
            else {
                if (Info.traningMethod === 'Online Learning') {
                    setDefaultServicesValues((prevValues) => ({
                        ...prevValues,
                        operationsCourse: {
                            ...prevValues.operationsCourse,
                            accountsTraining: 0
                        },
                    }))
                    return;
                }
            }

            if (clientProfile.quickStart === 'Yes') {

                if (quickStartServices.operationsCourse !== false) {
                    let operations = Number(quickStartServices.operationsCourse);
                    // console.log(value, 'essental account traning quick yes')
                    setDefaultServicesValues((prevValues) => ({
                        ...prevValues,
                        operationsCourse: {
                            ...prevValues.operationsCourse,
                            accountsTraining: operations,
                        },
                    }))
                }

            }
            else {
                if (clientProfile.quickStart === 'No') {

                    if (daysValues.twoDay !== false) {
                        let twoDayValue = Number(daysValues.twoDay);


                        const operationsAdminValue = Number(attendingCourses.operationsAdmin);
                        let value = Math.ceil(operationsAdminValue / 6) * twoDayValue;
                        // console.log(operationsAdminValue, 'operationsAdminValue')
                        setDefaultServicesValues((prevValues) => ({
                            ...prevValues,
                            operationsCourse: {
                                ...prevValues.operationsCourse,
                                accountsTraining: value
                            },
                        }))
                    }

                }
            }
    }, [clientProfile.objective, clientProfile.quickStart, quickStartServices, daysValues,
    Info.traningMethod, operationsCourse.traningMethod, attendingCourses.operationsAdmin
        , setDefaultServicesValues])


    // use effect for operations course totalHrs column
    React.useEffect(() => {
        setDefaultServicesValues((prevValues) => ({
            ...prevValues,
            operationsCourse: {
                ...prevValues.operationsCourse,
                totalHrs: Number(prevValues.operationsCourse.accountsTraining)
                    + Number(prevValues.operationsCourse.accountsConsulting)
            }
        }))
    }, [operationsCourse.accountsTraining, operationsCourse.accountsConsulting,
        setDefaultServicesValues])


    // use effect for administration Course account traning
    React.useEffect(() => {
            if (clientProfile.objective !== 'New Business' ||
                administrationCourse.traningMethod === 'Online Learning' ||
                administrationCourse.traningMethod === 'Onsite Learning') {

                setDefaultServicesValues((prevValues) => ({
                    ...prevValues,
                    administrationCourse: {
                        ...prevValues.administrationCourse,
                        accountsTraining: 0
                    },
                }))
                return;
            }
            else {
                if (Info.traningMethod === 'Online Learning') {
                    setDefaultServicesValues((prevValues) => ({
                        ...prevValues,
                        administrationCourse: {
                            ...prevValues.administrationCourse,
                            accountsTraining: 0
                        },
                    }))
                    return;
                }
            }

            if (clientProfile.quickStart === 'Yes') {

                if (quickStartServices.administrationCourse !== false) {
                    let administration = Number(quickStartServices.administrationCourse);
                    // console.log(value, 'essental account traning quick yes')
                    setDefaultServicesValues((prevValues) => ({
                        ...prevValues,
                        administrationCourse: {
                            ...prevValues.administrationCourse,
                            accountsTraining: administration,
                        },
                    }))
                }

            }
            else {
                if (clientProfile.quickStart === 'No') {

                    if (daysValues.oneDay !== false) {
                        let dayValue = Number(daysValues.oneDay);

                        setDefaultServicesValues((prevValues) => ({
                            ...prevValues,
                            administrationCourse: {
                                ...prevValues.administrationCourse,
                                accountsTraining: dayValue
                            },
                        }))
                    }

                }
            }
    }, [clientProfile.objective, clientProfile.quickStart, quickStartServices, daysValues,
    Info.traningMethod, administrationCourse.traningMethod, administrationCourse.operationsAdmin,
        setDefaultServicesValues])


    // use effect for administration Course totalHrs column
    React.useEffect(() => {
        setDefaultServicesValues((prevValues) => ({
            ...prevValues,
            administrationCourse: {
                ...prevValues.administrationCourse,
                totalHrs: Number(prevValues.administrationCourse.accountsTraining)
                    + Number(prevValues.administrationCourse.accountsConsulting)
            }
        }))
    }, [administrationCourse.accountsTraining, administrationCourse.accountsConsulting,
        setDefaultServicesValues])


    // use effect for 3 rows(systemSetup and backprocessing and reconcileTakeUp) accountConsulting
    React.useEffect(() => {
            if (clientProfile.objective !== 'New Business') {
                setDefaultServicesValues((prevValues) => ({
                    ...prevValues,
                    systemSetup: {
                        ...prevValues.systemSetup,
                        accountsConsulting: 0
                    },
                    backprocessing: {
                        ...prevValues.backprocessing,
                        accountsConsulting: 0,
                        totalHrs: 0
                    },
                    reconcileTakeUp: {
                        ...prevValues.reconcileTakeUp,
                        accountsConsulting: 0,
                    },
                }))
                return;
            }

            if (clientProfile.quickStart === 'Yes') {

                if (quickStartServices.systemSetup !== false && quickStartServices.backprocessing !== false &&
                    quickStartServices.reconcileTakeUp !== false) {
                    let system = Number(quickStartServices.systemSetup);
                    let processing = Number(quickStartServices.backprocessing);
                    let reconcile = Number(quickStartServices.reconcileTakeUp);
                    setDefaultServicesValues((prevValues) => ({
                        ...prevValues,
                        systemSetup: {
                            ...prevValues.systemSetup,
                            accountsConsulting: system,
                        },
                        backprocessing: {
                            ...prevValues.backprocessing,
                            accountsConsulting: processing,
                            totalHrs: processing
                        },
                        reconcileTakeUp: {
                            ...prevValues.reconcileTakeUp,
                            accountsConsulting: reconcile,
                        },
                    }))
                }

            }
            else {
                if (clientProfile.quickStart === 'No') {

                    if (daysValues.oneDay !== false && daysValues.twoDay !== false) {
                        let dayValue = Number(daysValues.oneDay);
                        let twoDayValue = Number(daysValues.twoDay);

                        setDefaultServicesValues((prevValues) => ({
                            ...prevValues,
                            systemSetup: {
                                ...prevValues.systemSetup,
                                accountsConsulting: dayValue
                            },
                            backprocessing: {
                                ...prevValues.backprocessing,
                                accountsConsulting: dayValue,
                                totalHrs: dayValue,
                            },
                            reconcileTakeUp: {
                                ...prevValues.reconcileTakeUp,
                                accountsConsulting: twoDayValue,
                            },
                        }))
                    }

                }
            }
    }, [clientProfile.objective, clientProfile.quickStart, quickStartServices, daysValues, setDefaultServicesValues])


    // use effect for systemSetup & Commence Backprocessing totalHrs column
    React.useEffect(() => {
        setDefaultServicesValues((prevValues) => ({
            ...prevValues,
            systemSetup: {
                ...prevValues.systemSetup,
                totalHrs: Number(prevValues.systemSetup.accountsConsulting)
                    + Number(prevValues.systemSetup.travel)
            }
        }))
    }, [systemSetup.travel, systemSetup.accountsConsulting, setDefaultServicesValues])


    // use effect for reconcileTakeUp totalHrs column
    React.useEffect(() => {
        setDefaultServicesValues((prevValues) => ({
            ...prevValues,
            reconcileTakeUp: {
                ...prevValues.reconcileTakeUp,
                totalHrs: Number(prevValues.reconcileTakeUp.accountsConsulting)
                    + Number(prevValues.reconcileTakeUp.travel)
            }
        }))
    }, [reconcileTakeUp.accountsConsulting, reconcileTakeUp.travel, setDefaultServicesValues])


    // use effect for anticipatedDisbs  accountConsulting and totalHrs
    React.useEffect(() => {
            if (clientProfile.objective !== 'New Business' ||
                anticipatedDisbs.traningMethod === 'Online Learning') {
                setDefaultServicesValues((prevValues) => ({
                    ...prevValues,
                    anticipatedDisbs: {
                        ...prevValues.anticipatedDisbs,
                        accountsConsulting: 0,
                        totalHrs: 0
                    },
                }))
                return;
            }
            else {
                if (Info.traningMethod === 'Online Learning') {
                    setDefaultServicesValues((prevValues) => ({
                        ...prevValues,
                        anticipatedDisbs: {
                            ...prevValues.anticipatedDisbs,
                            accountsConsulting: 0,
                            totalHrs: 0
                        },
                    }))
                    return;
                }
            }

            if (clientProfile.quickStart === 'Yes') {

                if (quickStartServices.anticipatedDisbs !== false) {
                    let anticipated = Number(quickStartServices.anticipatedDisbs);
                    setDefaultServicesValues((prevValues) => ({
                        ...prevValues,
                        anticipatedDisbs: {
                            ...prevValues.anticipatedDisbs,
                            accountsConsulting: anticipated,
                            totalHrs: anticipated
                        },
                    }))
                }

            }
            else {
                if (clientProfile.quickStart === 'No') {

                    if (daysValues.oneDay !== false) {
                        let dayValue = Number(daysValues.oneDay);

                        setDefaultServicesValues((prevValues) => ({
                            ...prevValues,
                            anticipatedDisbs: {
                                ...prevValues.anticipatedDisbs,
                                accountsConsulting: dayValue,
                                totalHrs: dayValue
                            },
                        }))
                    }

                }
            }
    }, [clientProfile.objective, clientProfile.quickStart, quickStartServices, daysValues,
    Info.traningMethod, anticipatedDisbs.traningMethod, setDefaultServicesValues])

    // use effect for trainInBillTemp  accountConsulting and totalHrs
    React.useEffect(() => {
            if (clientProfile.objective !== 'New Business' ||
                trainInBillTemp.traningMethod === 'Online Learning') {
                setDefaultServicesValues((prevValues) => ({
                    ...prevValues,
                    trainInBillTemp: {
                        ...prevValues.trainInBillTemp,
                        accountsConsulting: 0,
                        totalHrs: 0
                    },
                }))
                return;
            }
            else {
                if (Info.traningMethod === 'Online Learning') {
                    setDefaultServicesValues((prevValues) => ({
                        ...prevValues,
                        trainInBillTemp: {
                            ...prevValues.trainInBillTemp,
                            accountsConsulting: 0,
                            totalHrs: 0
                        },
                    }))
                    return;
                }
            }

            if (clientProfile.quickStart === 'Yes') {

                if (quickStartServices.trainInBillTemp !== false) {
                    let train = Number(quickStartServices.trainInBillTemp);
                    setDefaultServicesValues((prevValues) => ({
                        ...prevValues,
                        trainInBillTemp: {
                            ...prevValues.trainInBillTemp,
                            accountsConsulting: train,
                            totalHrs: train
                        },
                    }))
                }

            }
            else {
                if (clientProfile.quickStart === 'No') {

                    if (daysValues.oneDay !== false) {
                        let dayValue = Number(daysValues.oneDay);

                        setDefaultServicesValues((prevValues) => ({
                            ...prevValues,
                            trainInBillTemp: {
                                ...prevValues.trainInBillTemp,
                                accountsConsulting: dayValue,
                                totalHrs: dayValue
                            },
                        }))
                    }

                }
            }
    }, [clientProfile.objective, clientProfile.quickStart, quickStartServices, daysValues,
    Info.traningMethod, trainInBillTemp.traningMethod, setDefaultServicesValues])

    // use effect for endUserTraining  accountTraning
    React.useEffect(() => {
            if (clientProfile.objective !== 'New Business' ||
                endUserTraining.traningMethod === 'Online Learning') {
                setDefaultServicesValues((prevValues) => ({
                    ...prevValues,
                    endUserTraining: {
                        ...prevValues.endUserTraining,
                        accountsTraining: 0,
                    },
                }))
                return;
            }
            else {
                if (Info.traningMethod === 'Online Learning') {
                    setDefaultServicesValues((prevValues) => ({
                        ...prevValues,
                        endUserTraining: {
                            ...prevValues.endUserTraining,
                            accountsTraining: 0,
                        },
                    }))
                    return;
                }
            }

            if (clientProfile.quickStart === 'Yes') {

                if (quickStartServices.endUserTraining !== false) {
                    let endUser = Number(quickStartServices.endUserTraining);
                    setDefaultServicesValues((prevValues) => ({
                        ...prevValues,
                        endUserTraining: {
                            ...prevValues.endUserTraining,
                            accountsTraining: endUser,
                        },
                    }))
                }

            }
            else {
                if (clientProfile.quickStart === 'No') {
                    if (Info.traningMethod === 'End User Training') {

                        if (daysValues.halfDay !== false) {
                            let halfDayValue = Number(daysValues.halfDay);
                            const value = Math.ceil(Number(attendingCourses.endUserAccount) / 6) * halfDayValue;

                            setDefaultServicesValues((prevValues) => ({
                                ...prevValues,
                                endUserTraining: {
                                    ...prevValues.endUserTraining,
                                    accountsTraining: value,
                                },
                            }))
                        }

                    }
                    else {
                        if (Info.traningMethod === 'Train the Trainer' ||
                            endUserTraining.traningMethod === 'Train the Trainer') {

                            if (daysValues.twoDay !== false) {
                                let twoDayValue = Number(daysValues.twoDay);

                                setDefaultServicesValues((prevValues) => ({
                                    ...prevValues,
                                    endUserTraining: {
                                        ...prevValues.endUserTraining,
                                        accountsTraining: twoDayValue,
                                        // totalHrs: dayValue
                                    },
                                }))
                            }

                        }
                        else {
                            setDefaultServicesValues((prevValues) => ({
                                ...prevValues,
                                endUserTraining: {
                                    ...prevValues.endUserTraining,
                                    accountsTraining: 0,
                                },
                            }))
                        }

                    }
                }
            }
    }, [clientProfile.objective, clientProfile.quickStart, quickStartServices, daysValues,
    endUserTraining.traningMethod, Info.traningMethod, attendingCourses.endUserAccount,
        setDefaultServicesValues])


    // use effect for endUserTraining totalHrs column
    React.useEffect(() => {
        setDefaultServicesValues((prevValues) => ({
            ...prevValues,
            endUserTraining: {
                ...prevValues.endUserTraining,
                totalHrs: Number(prevValues.endUserTraining.accountsTraining)
                    + Number(prevValues.endUserTraining.accountsConsulting)
                    + Number(prevValues.endUserTraining.travel)
            }
        }))
    }, [endUserTraining.accountsTraining, endUserTraining.accountsConsulting, endUserTraining.travel,
        setDefaultServicesValues])

    // use effect for endOfMonth  accountConsulting and totalHrs
    React.useEffect(() => {
            if (clientProfile.objective !== 'New Business' ||
                endOfMonth.traningMethod === 'Online Learning') {
                setDefaultServicesValues((prevValues) => ({
                    ...prevValues,
                    endOfMonth: {
                        ...prevValues.endOfMonth,
                        accountsConsulting: 0,
                        totalHrs: 0
                    },
                }))
                return;
            }
            else {
                if (Info.traningMethod === 'Online Learning') {
                    setDefaultServicesValues((prevValues) => ({
                        ...prevValues,
                        endOfMonth: {
                            ...prevValues.endOfMonth,
                            accountsConsulting: 0,
                            totalHrs: 0
                        },
                    }))
                    return;
                }
            }

            if (clientProfile.quickStart === 'Yes') {

                if (quickStartServices.endOfMonth !== false) {
                    let endOfMonthValue = Number(quickStartServices.endOfMonth);
                    setDefaultServicesValues((prevValues) => ({
                        ...prevValues,
                        endOfMonth: {
                            ...prevValues.endOfMonth,
                            accountsConsulting: endOfMonthValue,
                            totalHrs: endOfMonthValue
                        },
                    }))
                }

            }
            else {
                if (clientProfile.quickStart === 'No') {

                    if (daysValues.oneDay !== false) {
                        let dayValue = Number(daysValues.oneDay);

                        setDefaultServicesValues((prevValues) => ({
                            ...prevValues,
                            endOfMonth: {
                                ...prevValues.endOfMonth,
                                accountsConsulting: dayValue,
                                totalHrs: dayValue
                            },
                        }))
                    }

                }
            }
    }, [clientProfile.objective, clientProfile.quickStart, endOfMonth.traningMethod,
    Info.traningMethod, quickStartServices, daysValues, setDefaultServicesValues])


    // use effect for documentMgmt TSG and BPAConsulting
    React.useEffect(() => {
            if (clientProfile.objective !== 'New Business' ||
                documentMgmt.traningMethod === 'Online Learning') {
                setDefaultServicesValues((prevValues) => ({
                    ...prevValues,
                    documentMgmt: {
                        ...prevValues.documentMgmt,
                        TSG: 0,
                        BPAConsulting: 0,
                    },
                }))
                return;
            }
            else {
                if (Info.traningMethod === 'Online Learning') {
                    setDefaultServicesValues((prevValues) => ({
                        ...prevValues,
                        documentMgmt: {
                            ...prevValues.documentMgmt,
                            TSG: 0,
                            BPAConsulting: 0,
                        },
                    }))
                    return;
                }
            }

            if (clientProfile.quickStart === 'Yes') {

                if (quickStartServices.documentMgmt !== false) {
                    let documentValue = Number(quickStartServices.documentMgmt);
                    setDefaultServicesValues((prevValues) => ({
                        ...prevValues,
                        documentMgmt: {
                            ...prevValues.documentMgmt,
                            TSG: 0,
                            BPAConsulting: documentValue,
                        },
                    }))
                }

            }
            else {
                if (clientProfile.quickStart === 'No') {

                    if (daysValues.halfDay !== false) {
                        let halfDayValue = Number(daysValues.halfDay);

                        setDefaultServicesValues((prevValues) => ({
                            ...prevValues,
                            documentMgmt: {
                                ...prevValues.documentMgmt,
                                TSG: halfDayValue,
                                BPAConsulting: halfDayValue,
                            },
                        }))
                    }

                }
            }
    }, [clientProfile.objective, clientProfile.quickStart, documentMgmt.traningMethod,
    Info.traningMethod, quickStartServices, daysValues, setDefaultServicesValues])


    // use effect for documentMgmt totalHrs column
    React.useEffect(() => {
        setDefaultServicesValues((prevValues) => ({
            ...prevValues,
            documentMgmt: {
                ...prevValues.documentMgmt,
                totalHrs: Number(prevValues.documentMgmt.TSG)
                    + Number(prevValues.documentMgmt.BPAConsulting)
            }
        }))
    }, [documentMgmt.TSG, documentMgmt.BPAConsulting,
        setDefaultServicesValues])

    // use effect for totalDays PM column
    React.useEffect(() => {
            if (clientProfile.country !== '') {

                if (countryHours[clientProfile.country] !== false) {
                    const hours = Number(countryHours[clientProfile.country]);
                    setDefaultServicesValues((prevValues) => {
                        const value = Number(prevValues.projectMgmt.PM) / hours;
                        return {
                            ...prevValues,
                            totalDays: {
                                ...prevValues.totalDays,
                                PM: parseFloat(value.toFixed(2)),
                            }
                        }
                    })
                }
                // console.log(hours, 'hours by country name')

            }
            else {
                setDefaultServicesValues((prevValues) => ({
                    ...prevValues,
                    totalDays: {
                        ...prevValues.totalDays,
                        PM: 0,
                    }
                }))
            }
    }, [projectMgmt.PM, clientProfile.country, countryHours, setDefaultServicesValues])


    // use effect for totalDays TSG column
    React.useEffect(() => {
            if (clientProfile.country !== '') {

                if (countryHours[clientProfile.country] !== false) {
                    const hours = Number(countryHours[clientProfile.country]);
                    setDefaultServicesValues((prevValues) => {
                        const value = Number(prevValues.totalHrsBaseInstall.TSG) / hours;

                        return {
                            ...prevValues,
                            totalDays: {
                                ...prevValues.totalDays,
                                TSG: parseFloat(value.toFixed(2)),
                            }
                        }
                    })
                }
                // console.log(hours, 'hours by country name')

            }
            else {
                setDefaultServicesValues((prevValues) => ({
                    ...prevValues,
                    totalDays: {
                        ...prevValues.totalDays,
                        TSG: 0,
                    }
                }))
            }
    }, [totalHrsBaseInstall.TSG, clientProfile.country, countryHours, setDefaultServicesValues])


    // use effect for totalDays AccountTraning column
    React.useEffect(() => {
            if (clientProfile.country !== '') {
                if (countryHours[clientProfile.country] !== false) {
                    const hours = Number(countryHours[clientProfile.country]);
                    setDefaultServicesValues((prevValues) => {

                        const value = Number(prevValues.totalHrsBaseInstall.accountsTraining) / hours;

                        return {
                            ...prevValues,
                            totalDays: {
                                ...prevValues.totalDays,
                                accountsTraining: parseFloat(value.toFixed(2)),
                            }
                        }
                    })
                }
                // console.log(hours, 'hours by country name')

            }
            else {
                setDefaultServicesValues((prevValues) => ({
                    ...prevValues,
                    totalDays: {
                        ...prevValues.totalDays,
                        accountsTraining: 0,
                    }
                }))
            }
    }, [totalHrsBaseInstall.accountsTraining, clientProfile.country, countryHours, setDefaultServicesValues])


    // use effect for totalDays AccountConulting column
    React.useEffect(() => {
            if (clientProfile.country !== '') {

                if (countryHours[clientProfile.country] !== false) {
                    const hours = Number(countryHours[clientProfile.country]);
                    setDefaultServicesValues((prevValues) => {

                        const value = Number(prevValues.totalHrsBaseInstall.accountsConsulting) / hours;

                        return {
                            ...prevValues,
                            totalDays: {
                                ...prevValues.totalDays,
                                accountsConsulting: parseFloat(value.toFixed(2)),
                            }
                        }
                    })
                }
                // console.log(hours, 'hours by country name')

            }
            else {
                setDefaultServicesValues((prevValues) => ({
                    ...prevValues,
                    totalDays: {
                        ...prevValues.totalDays,
                        accountsConsulting: 0,
                    }
                }))
            }
    }, [totalHrsBaseInstall.accountsConsulting, clientProfile.country, countryHours, setDefaultServicesValues])

    // use effect for totalDays BPAConulting column
    React.useEffect(() => {
            if (clientProfile.country !== '') {

                if (countryHours[clientProfile.country] !== false) {
                    const hours = Number(countryHours[clientProfile.country]);
                    setDefaultServicesValues((prevValues) => {

                        const value = Number(prevValues.totalHrsBaseInstall.BPAConsulting) / hours;

                        return {
                            ...prevValues,
                            totalDays: {
                                ...prevValues.totalDays,
                                BPAConsulting: parseFloat(value.toFixed(2)),
                            }
                        }
                    })
                }
                // console.log(hours, 'hours by country name')

            }
            else {
                setDefaultServicesValues((prevValues) => ({
                    ...prevValues,
                    totalDays: {
                        ...prevValues.totalDays,
                        BPAConsulting: 0,
                    }
                }))
            }
    }, [totalHrsBaseInstall.BPAConsulting, clientProfile.country, countryHours, setDefaultServicesValues])

    // use effect for totalDays travel column
    React.useEffect(() => {
            if (clientProfile.country !== '') {

                if (countryHours[clientProfile.country] !== false) {
                    const hours = Number(countryHours[clientProfile.country]);
                    setDefaultServicesValues((prevValues) => {

                        const value = Number(prevValues.totalHrsBaseInstall.travel) / hours;

                        return {
                            ...prevValues,
                            totalDays: {
                                ...prevValues.totalDays,
                                travel: parseFloat(value.toFixed(2)),
                            }
                        }
                    })
                }

            }
            else {
                setDefaultServicesValues((prevValues) => ({
                    ...prevValues,
                    totalDays: {
                        ...prevValues.totalDays,
                        travel: 0,
                    }
                }))
            }
    }, [totalHrsBaseInstall.travel, clientProfile.country, countryHours, setDefaultServicesValues])

    // use effect for totalDays totalHrs column
    React.useEffect(() => {
            if (clientProfile.country !== '') {

                if (countryHours[clientProfile.country] !== false) {
                    const hours = Number(countryHours[clientProfile.country]);
                    setDefaultServicesValues((prevValues) => {

                        const value = Number(prevValues.totalHrsBaseInstall.totalHrs) / hours;

                        return {
                            ...prevValues,
                            totalDays: {
                                ...prevValues.totalDays,
                                totalHrs: parseFloat(value.toFixed(2)),
                            }
                        }
                    })
                }

            }
            else {
                setDefaultServicesValues((prevValues) => ({
                    ...prevValues,
                    totalDays: {
                        ...prevValues.totalDays,
                        totalHrs: 0,
                    }
                }))
            }
    }, [totalHrsBaseInstall.totalHrs, clientProfile.country, countryHours, setDefaultServicesValues])


    // use effect for totalHrsBaseInstall TSG column
    React.useEffect(() => {
        setDefaultServicesValues((prevValues) => ({
            ...prevValues,
            totalHrsBaseInstall: {
                ...prevValues.totalHrsBaseInstall,
                TSG: Number(prevValues.documentMgmt.TSG)
                    + Number(prevValues.installationOracle.TSG)
            }
        }))
    }, [installationOracle.TSG, documentMgmt.TSG, setDefaultServicesValues])


    // use effect for totalHrsBaseInstall Accounttarning column
    React.useEffect(() => {
        setDefaultServicesValues((prevValues) => ({
            ...prevValues,
            totalHrsBaseInstall: {
                ...prevValues.totalHrsBaseInstall,
                accountsTraining: Number(prevValues.endUserTraining.accountsTraining)
                    + Number(prevValues.administrationCourse.accountsTraining)
                    + Number(prevValues.operationsCourse.accountsTraining)
                    + Number(prevValues.essentialsCourse.accountsTraining)
            }
        }))
    }, [endUserTraining.accountsTraining, administrationCourse.accountsTraining,
    operationsCourse.accountsTraining, essentialsCourse.accountsTraining, setDefaultServicesValues])


    // use effect for totalHrsBaseInstall AccountConsulting column
    React.useEffect(() => {
        setDefaultServicesValues((prevValues) => ({
            ...prevValues,
            totalHrsBaseInstall: {
                ...prevValues.totalHrsBaseInstall,
                accountsConsulting: Number(prevValues.essentialsCourse.accountsConsulting)
                    + Number(prevValues.operationsCourse.accountsConsulting)
                    + Number(prevValues.administrationCourse.accountsConsulting)
                    + Number(prevValues.systemSetup.accountsConsulting)
                    + Number(prevValues.backprocessing.accountsConsulting)
                    + Number(prevValues.reconcileTakeUp.accountsConsulting)
                    + Number(prevValues.anticipatedDisbs.accountsConsulting)
                    + Number(prevValues.trainInBillTemp.accountsConsulting)
                    + Number(prevValues.endUserTraining.accountsConsulting)
                    + Number(prevValues.endOfMonth.accountsConsulting)
            }
        }))
    }, [essentialsCourse.accountsConsulting, operationsCourse.accountsConsulting,
    administrationCourse.accountsConsulting, systemSetup.accountsConsulting,
    backprocessing.accountsConsulting, reconcileTakeUp.accountsConsulting,
    endUserTraining.accountsConsulting, endOfMonth.accountsConsulting,
    anticipatedDisbs.accountsConsulting, trainInBillTemp.accountsConsulting, setDefaultServicesValues])

    // use effect for totalHrsBaseInstall BPAConsulting column
    React.useEffect(() => {
        setDefaultServicesValues((prevValues) => ({
            ...prevValues,
            totalHrsBaseInstall: {
                ...prevValues.totalHrsBaseInstall,
                BPAConsulting: Number(prevValues.documentMgmt.BPAConsulting)
            }
        }))
    }, [documentMgmt.BPAConsulting, setDefaultServicesValues])


    // use effect for totalHrsBaseInstall travel column
    React.useEffect(() => {
        setDefaultServicesValues((prevValues) => ({
            ...prevValues,
            totalHrsBaseInstall: {
                ...prevValues.totalHrsBaseInstall,
                travel: Number(prevValues.essentialsCourse.travel)
                    + Number(prevValues.systemSetup.travel)
                    + Number(prevValues.reconcileTakeUp.travel)
                    + Number(prevValues.endUserTraining.travel)
            }
        }))
    }, [essentialsCourse.travel, systemSetup.travel,
    reconcileTakeUp.travel, endUserTraining.travel, setDefaultServicesValues])


    // use effect for totalHrsBaseInstall totalHrs column
    React.useEffect(() => {
        setDefaultServicesValues((prevValues) => ({
            ...prevValues,
            totalHrsBaseInstall: {
                ...prevValues.totalHrsBaseInstall,
                totalHrs: Number(prevValues.totalHrsBaseInstall.PM)
                    + Number(prevValues.totalHrsBaseInstall.TSG)
                    + Number(prevValues.totalHrsBaseInstall.accountsTraining)
                    + Number(prevValues.totalHrsBaseInstall.accountsConsulting)
                    + Number(prevValues.totalHrsBaseInstall.BPAConsulting)
                    + Number(prevValues.totalHrsBaseInstall.travel)
            }
        }))
    }, [totalHrsBaseInstall.PM, totalHrsBaseInstall.TSG,
    totalHrsBaseInstall.accountsTraining, totalHrsBaseInstall.accountsConsulting,
    totalHrsBaseInstall.BPAConsulting, totalHrsBaseInstall.travel, setDefaultServicesValues])

    // use effect for traning Method all rows 
    React.useEffect(() => {

        if (clientProfile.objective !== 'New Business') {
            setDefaultServicesValues((prevValues) => ({
                ...prevValues,
                essentialsCourse: {
                    ...prevValues.essentialsCourse,
                    traningMethod: ''
                },
                operationsCourse: {
                    ...prevValues.operationsCourse,
                    traningMethod: ''
                },
                administrationCourse: {
                    ...prevValues.administrationCourse,
                    traningMethod: ''
                },
                systemSetup: {
                    ...prevValues.systemSetup,
                    traningMethod: ''
                },
                backprocessing: {
                    ...prevValues.backprocessing,
                    traningMethod: ''
                },
                reconcileTakeUp: {
                    ...prevValues.reconcileTakeUp,
                    traningMethod: ''
                },
                anticipatedDisbs: {
                    ...prevValues.anticipatedDisbs,
                    traningMethod: ''
                },
                trainInBillTemp: {
                    ...prevValues.trainInBillTemp,
                    traningMethod: ''
                },
                endUserTraining: {
                    ...prevValues.endUserTraining,
                    traningMethod: '',
                },
                endOfMonth: {
                    ...prevValues.endOfMonth,
                    traningMethod: '',
                },
                documentMgmt: {
                    ...prevValues.documentMgmt,
                    traningMethod: '',
                },
            }))
        }
    }, [clientProfile.objective, setDefaultServicesValues])

    // use effect for accountsConsulting 3(essentialsCourse,operationsCourse,administrationCourse) rows
    React.useEffect(() => {
        if (Info.traningMethod !== 'Blended Learning') {
            setDefaultServicesValues((prevValues) => ({
                ...prevValues,
                essentialsCourse: {
                    ...prevValues.essentialsCourse,
                    accountsConsulting: 0
                },
                operationsCourse: {
                    ...prevValues.operationsCourse,
                    accountsConsulting: 0
                },
                administrationCourse: {
                    ...prevValues.administrationCourse,
                    accountsConsulting: 0
                },
                endUserTraining: {
                    ...prevValues.endUserTraining,
                    accountsConsulting: 0,
                },
            }))
        }
    }, [Info.traningMethod, setDefaultServicesValues])





    return null;
}

export default DefaultServicesLogic
