import React from 'react';
import getDayConversionInfoAPI from '../../../../../../apis/client/getDayConversionInfoAPI.js';
import getHrsPerDayByCountryAPI from '../../../../../../apis/client/getHrsPerDayByCountryAPI.js';
import getProductInfoByIdAPI from '../../../../../../apis/client/getProductInfoByIdAPI.js';

function OptionalServicesLogic(props) {

    const { clientProfile, Info, attendingCourses, defaultServicesValues,
        optionalServices, setOptionalServices,
        setUpfrontCost, affinityMobilePopUpValue, setAffinityMobilePopUpValue,
        empowerModules, setEmpowerModules, settlementPopUpValue, setSettlementPopUpValue } = props;

    const { totalHours, grandTotalHours,
        dataMigrationRow, selfCustody, multyPartyBilling, reportWriting,
        dataformsMax, scripting, workflow, BPAEndUser, BPAEssentials,
        dataformsPhoneBook, addPrecedent, BPAGoLive, exchangeIntegration,
        softdocsIntegration, clientPortal, worksiteIntegration,
        affinityMobile, empower, settlementAdjuster, thirdPartyIT } = optionalServices;

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


    // handel dataMigrationRow Popup values for optional services
    React.useEffect(() => {
        if (dataMigrationRow.include === 'No') {
            let accConsulting = daysValues.twoDay;
            if (clientProfile.objective === 'Upsell') {
                accConsulting = 0;
            }
            setOptionalServices((prevValue) => ({
                ...prevValue,
                dataMigrationRow: {
                    ...prevValue.dataMigrationRow,
                    task: 'Data Migration Required?',
                    TSG: 0,
                    dataMigration: 0,
                    accountsConsulting: accConsulting,
                }
            }))

            setUpfrontCost((prevValues) => ({
                ...prevValues,
                dataMigration: {
                    ...prevValues.dataMigration,
                    cost: 0,
                },
            }))
        }
    }, [clientProfile.objective, dataMigrationRow.include, daysValues, setOptionalServices, setUpfrontCost])

    //use effect to set inclued for dataMigrationRow when objective is upsell
    React.useEffect(() => {
        if (clientProfile.objective === 'Upsell') {

            setOptionalServices((prevValue) => ({
                ...prevValue,
                dataMigrationRow: {
                    ...prevValue.dataMigrationRow,
                    include: 'No',
                }
            }))
        }
    }, [clientProfile.objective, setOptionalServices])

    // handel affinityMobile Popup values for optional services
    React.useEffect(() => {
        if (affinityMobile.include === 'No') {
            setOptionalServices((prevValue) => ({
                ...prevValue,
                affinityMobile: {
                    ...prevValue.affinityMobile,
                    TSG: 0,
                    totalHrs: 0,
                }
            }))

            setAffinityMobilePopUpValue('');
            setUpfrontCost((prevValues) => ({
                ...prevValues,
                affinityMobile: {
                    ...prevValues.affinityMobile,
                    cost: 0,
                },
            }))
        }
        else {
            if (affinityMobile.include === 'Yes') {
                if (daysValues.oneDay !== false) {
                    setOptionalServices((prevValue) => ({
                        ...prevValue,
                        affinityMobile: {
                            ...prevValue.affinityMobile,
                            TSG: daysValues.oneDay,
                            totalHrs: daysValues.oneDay,
                        }
                    }))
                }
            }
        }
    }, [affinityMobile.include, daysValues, setOptionalServices, setUpfrontCost, setAffinityMobilePopUpValue])

    //useEfect for affinity mobile popup values for upfront cost table
    React.useEffect(() => {
        const fetchData = async () => {
            // console.log(affinityMobilePopUpValue,'affinityMobilePopUpValue')
            if (Number(affinityMobilePopUpValue) >= 5) {
                const affinityProduct = await getProductInfoByIdAPI('1533031');
                if (affinityProduct.status !== 200) {
                    console.log('getProductInfoByIdAPI api not working')
                }
                else {
                    if (affinityProduct.data.length > 0 && typeof affinityProduct.data === 'object') {
                        // console.log(affinityProduct);
                        const product = affinityProduct.data.filter((product) => product.BU_NAME === clientProfile.country);
                        if (clientProfile.country !== '' && product.length > 0) {
                            if (Number(affinityMobilePopUpValue) === 5) {
                                setUpfrontCost((prevValues) => ({
                                    ...prevValues,
                                    affinityMobile: {
                                        ...prevValues.affinityMobile,
                                        cost: Number(product[0].STD_UNIT_PRICE_AMT).toFixed(2),
                                    },
                                }))
                            }
                            else {
                                // const cost1 = (Number(product[0].STD_UNIT_PRICE_AMT) - 5) / 5;
                                // const cost2 = (cost1 * 1000) + Number(product[0].STD_UNIT_PRICE_AMT);
                                const temp = (Number(affinityMobilePopUpValue) - 5) * 200 + Number(product[0].STD_UNIT_PRICE_AMT);
                                setUpfrontCost((prevValues) => ({
                                    ...prevValues,
                                    affinityMobile: {
                                        ...prevValues.affinityMobile,
                                        cost: temp.toFixed(2),
                                    },
                                }))
                            }
                        }
                        else {
                            setUpfrontCost((prevValues) => ({
                                ...prevValues,
                                affinityMobile: {
                                    ...prevValues.affinityMobile,
                                    cost: 0,
                                },
                            }))
                        }
                    }
                }
            }
            else {
                setOptionalServices((prevValue) => ({
                    ...prevValue,
                    affinityMobile: {
                        ...prevValue.affinityMobile,
                        TSG: 0,
                        totalHrs: 0,
                    }
                }))

                setUpfrontCost((prevValues) => ({
                    ...prevValues,
                    affinityMobile: {
                        ...prevValues.affinityMobile,
                        cost: 0,
                    },
                }))
            }
        }
        fetchData();
    }, [affinityMobilePopUpValue, clientProfile.country, setUpfrontCost, setOptionalServices])

    // handel empower Popup values for optional services
    React.useEffect(() => {
        if (empower.include === 'No') {
            setOptionalServices((prevValues) => ({
                ...prevValues,
                empower: {
                    ...prevValues.empower,
                    BPAConsulting: 0,
                    totalHrs: 0,
                }
            }))

            setUpfrontCost((prevValues) => ({
                ...prevValues,
                empower: {
                    ...prevValues.empower,
                    label: `Empower (0 modules for a total of 0 users)`,
                    cost: 0,
                },
            }))

            setEmpowerModules((prevValues) => {
                const states = prevValues.empowerModules.map((empower) => ({ ...empower, checked: false }));
                // console.log(states, 'inclued no empower')
                return {
                    empowerModules: states,
                    numOfUsers: '',
                    modulesSelected: 0,
                }
            })
        }
        else {
            if (empower.include === 'Yes') {
                if (daysValues.oneDay !== false) {
                    setOptionalServices((prevValues) => ({
                        ...prevValues,
                        empower: {
                            ...prevValues.empower,
                            BPAConsulting: daysValues.oneDay,
                            totalHrs: daysValues.oneDay,
                        }
                    }))
                }
            }
        }
    }, [empower.include, daysValues, setOptionalServices, setUpfrontCost, setEmpowerModules])

    //useEffect for empower pupup values for upfront cost table
    React.useEffect(() => {
        const perModulePrice = 1450;
        const perUserPrice = 220;
        const cost = (Number(empowerModules.modulesSelected) * perModulePrice) +
            (Number(empowerModules.numOfUsers) * perUserPrice);
        setUpfrontCost((prevValues) => ({
            ...prevValues,
            empower: {
                ...prevValues.empower,
                label: `Empower (${Number(empowerModules.modulesSelected)} modules for a total of ${Number(empowerModules.numOfUsers)} users)`,
                cost: cost.toFixed(2),
            },
        }))
    }, [empowerModules, setUpfrontCost, setOptionalServices])

    //use effect to set inclued for empower when country = New Zealand
    React.useEffect(() => {
        if (clientProfile.country === 'New Zealand') {
            setOptionalServices((prevValue) => ({
                ...prevValue,
                empower: {
                    ...prevValue.empower,
                    include: 'No',
                }
            }))
        }
    }, [clientProfile.country, setOptionalServices])

    // handel settlementAdjuster Popup values for optional services
    React.useEffect(() => {
        if (settlementAdjuster.include === 'No') {
            setOptionalServices((prevValue) => ({
                ...prevValue,
                settlementAdjuster: {
                    ...prevValue.settlementAdjuster,
                    BPAConsulting: 0,
                    totalHrs: 0,
                }
            }))
            setSettlementPopUpValue('');
        }
        else {
            if (settlementAdjuster.include === 'Yes') {
                if (daysValues.halfDay !== false) {
                    setOptionalServices((prevValue) => ({
                        ...prevValue,
                        settlementAdjuster: {
                            ...prevValue.settlementAdjuster,
                            BPAConsulting: daysValues.halfDay,
                            totalHrs: daysValues.halfDay,
                        }
                    }))
                }
            }
        }
    }, [settlementAdjuster.include, daysValues, setOptionalServices, setSettlementPopUpValue])

    // handel settlementAdjuster Popup values for upfront cost table
    React.useEffect(() => {
        let value = 0;
        if (settlementPopUpValue > 0) {
            value = (settlementPopUpValue - 1) * 300 + 500;
        }
        setUpfrontCost((prevValues) => ({
            ...prevValues,
            lexisSettleAdjuster: {
                ...prevValues.lexisSettleAdjuster,
                cost: value.toFixed(2),
            },
        }))
    }, [settlementPopUpValue, setUpfrontCost])

    // use effect for totalHrs for DataMigrationRow
    React.useEffect(() => {
        setOptionalServices((prevValue) => ({
            ...prevValue,
            dataMigrationRow: {
                ...prevValue.dataMigrationRow,
                totalHrs: Number(prevValue.dataMigrationRow.accountsConsulting) +
                    Number(prevValue.dataMigrationRow.TSG) +
                    Number(prevValue.dataMigrationRow.dataMigration)
            }
        }))
    }, [dataMigrationRow.accountsConsulting, dataMigrationRow.dataMigration, dataMigrationRow.TSG, setOptionalServices])

    // use effect for accountsTraning for selfCustody
    React.useEffect(() => {
        const fetchData = async () => {
            if (selfCustody.include === 'No' || selfCustody.traningMethod === 'Online Learning' ||
                Info.traningMethod === 'Online Learning' || clientProfile.country !== 'New Zealand') {
                setOptionalServices((prevValue) => ({
                    ...prevValue,
                    selfCustody: {
                        ...prevValue.selfCustody,
                        accountsTraining: 0,
                    }
                }))
                return;
            }

            if (selfCustody.include === 'Yes' && daysValues.oneDay !== false) {
                setOptionalServices((prevValue) => ({
                    ...prevValue,
                    selfCustody: {
                        ...prevValue.selfCustody,
                        accountsTraining: daysValues.oneDay,
                    }
                }))
            }
        }
        fetchData();
    }, [clientProfile.country, selfCustody.include, selfCustody.traningMethod,
    Info.traningMethod, setOptionalServices, daysValues])

    // use effect for accountConsulting for selfCustody
    React.useEffect(() => {
        const fetchData = async () => {
            if (selfCustody.include === 'No' || selfCustody.traningMethod === 'Online Learning' ||
                Info.traningMethod === 'Online Learning' || clientProfile.country !== 'Australia') {
                setOptionalServices((prevValue) => ({
                    ...prevValue,
                    selfCustody: {
                        ...prevValue.selfCustody,
                        accountsConsulting: 0,
                    }
                }))
                return;
            }

            if (selfCustody.include === 'Yes' && daysValues.oneDay !== false) {
                setOptionalServices((prevValue) => ({
                    ...prevValue,
                    selfCustody: {
                        ...prevValue.selfCustody,
                        accountsConsulting: daysValues.oneDay,
                    }
                }))
            }
        }
        fetchData();
    }, [clientProfile.country, selfCustody.include, selfCustody.traningMethod,
    Info.traningMethod, setOptionalServices, daysValues])

    // use effect for TotalHrs for selfCustody
    React.useEffect(() => {
        setOptionalServices((prevValues) => ({
            ...prevValues,
            selfCustody: {
                ...prevValues.selfCustody,
                totalHrs: Number(prevValues.selfCustody.accountsTraining) +
                    Number(prevValues.selfCustody.accountsConsulting)
            },
        }))
    }, [selfCustody.accountsTraining, selfCustody.accountsConsulting, setOptionalServices])

    // use effect for  accountConsulting,totalHrs for multyPartyBilling
    React.useEffect(() => {
        const fetchData = async () => {
            if (multyPartyBilling.include === 'No' ||
                multyPartyBilling.traningMethod === 'Online Learning' ||
                Info.traningMethod === 'Online Learning') {
                setOptionalServices((prevValue) => ({
                    ...prevValue,
                    multyPartyBilling: {
                        ...prevValue.multyPartyBilling,
                        accountsConsulting: 0,
                        totalHrs: 0
                    }
                }))
                return;
            }

            if (multyPartyBilling.include === 'Yes' && daysValues.halfDay !== false) {

                setOptionalServices((prevValue) => ({
                    ...prevValue,
                    multyPartyBilling: {
                        ...prevValue.multyPartyBilling,
                        accountsConsulting: daysValues.halfDay,
                        totalHrs: daysValues.halfDay,
                    }
                }))
            }
        }

        fetchData();
    }, [multyPartyBilling.include, multyPartyBilling.traningMethod, Info.traningMethod,
        daysValues, setOptionalServices])

    // use effect for  accountConsulting,totalHrs for reportWriting
    React.useEffect(() => {
        if (reportWriting.include === 'No') {
            setOptionalServices((prevValue) => ({
                ...prevValue,
                reportWriting: {
                    ...prevValue.reportWriting,
                    accountsTraining: 0,
                    totalHrs: 0
                }
            }))
            return;
        }

        if (reportWriting.include === 'Yes' && daysValues.threeDay !== false) {
            setOptionalServices((prevValue) => ({
                ...prevValue,
                reportWriting: {
                    ...prevValue.reportWriting,
                    accountsTraining: daysValues.threeDay,
                    totalHrs: daysValues.threeDay
                }
            }))
        }
    }, [reportWriting.include, setOptionalServices, daysValues])


    // use effect for BPATraning for dataformsMax
    React.useEffect(() => {
        const fetchData = async () => {
            if (dataformsMax.include === 'No') {
                setOptionalServices((prevValue) => ({
                    ...prevValue,
                    dataformsMax: {
                        ...prevValue.dataformsMax,
                        BPATraining: 0,
                    }
                }))
                return;
            }

            if (dataformsMax.include === 'Yes' && daysValues.twoDay !== false) {
                const dataformsValue = Number(attendingCourses.dataforms);
                let value = Math.ceil(dataformsValue / 6) * daysValues.twoDay;

                setOptionalServices((prevValue) => ({
                    ...prevValue,
                    dataformsMax: {
                        ...prevValue.dataformsMax,
                        BPATraining: value,
                    }
                }))
            }
        }

        fetchData();
    }, [dataformsMax.include, attendingCourses.dataforms, setOptionalServices, daysValues])

    // use effect for Total hours for dataformsMax
    React.useEffect(() => {
        setOptionalServices((prevValues) => ({
            ...prevValues,
            dataformsMax: {
                ...prevValues.dataformsMax,
                totalHrs: Number(prevValues.dataformsMax.travel) +
                    Number(prevValues.dataformsMax.BPATraining)
            },
        }))

    }, [dataformsMax.travel, dataformsMax.BPATraining, setOptionalServices])


    // use effect for BPATraning for scripting
    React.useEffect(() => {
        const fetchData = async () => {
            if (scripting.include === 'No') {
                setOptionalServices((prevValue) => ({
                    ...prevValue,
                    scripting: {
                        ...prevValue.scripting,
                        BPATraining: 0,
                    }
                }))
                return;
            }

            if (scripting.include === 'Yes' && daysValues.twoDay !== false) {

                const dataformsValue = Number(attendingCourses.dataforms);
                let value = Math.ceil(dataformsValue / 6) * daysValues.twoDay;

                setOptionalServices((prevValue) => ({
                    ...prevValue,
                    scripting: {
                        ...prevValue.scripting,
                        BPATraining: value,
                    }
                }))
            }
        }

        fetchData();
    }, [scripting.include, attendingCourses.dataforms, setOptionalServices, daysValues])

    // use effect for Total hours for scripting
    React.useEffect(() => {
        setOptionalServices((prevValues) => ({
            ...prevValues,
            scripting: {
                ...prevValues.scripting,
                totalHrs: Number(prevValues.scripting.travel) +
                    Number(prevValues.scripting.BPATraining)
            },
        }))

    }, [scripting.travel, scripting.BPATraining, setOptionalServices])


    // use effect for BPATraning for workflow
    React.useEffect(() => {
        const fetchData = async () => {
            if (workflow.include === 'No') {
                setOptionalServices((prevValue) => ({
                    ...prevValue,
                    workflow: {
                        ...prevValue.workflow,
                        BPATraining: 0,
                    }
                }))
                return;
            }

            if (workflow.include === 'Yes' && daysValues.twoDay !== false) {

                const dataformsValue = Number(attendingCourses.dataforms);
                let value = Math.ceil(dataformsValue / 6) * daysValues.twoDay;

                setOptionalServices((prevValue) => ({
                    ...prevValue,
                    workflow: {
                        ...prevValue.workflow,
                        BPATraining: value,
                    }
                }))
            }
        }

        fetchData();
    }, [workflow.include, attendingCourses.dataforms, setOptionalServices, daysValues])


    // use effect for Total hours for workflow
    React.useEffect(() => {
        setOptionalServices((prevValues) => ({
            ...prevValues,
            workflow: {
                ...prevValues.workflow,
                totalHrs: Number(prevValues.workflow.travel) +
                    Number(prevValues.workflow.BPATraining)
            },
        }))

    }, [workflow.travel, workflow.BPATraining, daysValues, setOptionalServices])

    // use effect for BPATraning for BPAEndUser
    React.useEffect(() => {
        if (BPAEndUser.include === 'No' || BPAEndUser.traningMethod === 'Online Learning' ||
            Info.traningMethod === 'Online Learning') {
            setOptionalServices((prevValue) => ({
                ...prevValue,
                BPAEndUser: {
                    ...prevValue.BPAEndUser,
                    BPATraining: 0,
                }
            }))

            return;
        }

        if (BPAEndUser.include === 'Yes') {
            if (Info.traningMethod === 'End User Training') {

                const BPAValue = Number(attendingCourses.endUserBPA);
                let value = Math.ceil(BPAValue / 6) * 3;

                setOptionalServices((prevValue) => ({
                    ...prevValue,
                    BPAEndUser: {
                        ...prevValue.BPAEndUser,
                        BPATraining: value
                    }
                }))
            }
            else {
                if ((Info.traningMethod === 'Train the Trainer' ||
                    BPAEndUser.traningMethod === 'Train the Trainer') && daysValues.oneDay !== false) {
                    setOptionalServices((prevValue) => ({
                        ...prevValue,
                        BPAEndUser: {
                            ...prevValue.BPAEndUser,
                            BPATraining: daysValues.oneDay
                        }
                    }))
                }
                else {
                    setOptionalServices((prevValue) => ({
                        ...prevValue,
                        BPAEndUser: {
                            ...prevValue.BPAEndUser,
                            BPATraining: 0
                        }
                    }))
                }
            }
        }

    }, [BPAEndUser.include, BPAEndUser.traningMethod, Info.traningMethod,
    attendingCourses.endUserBPA, daysValues, setOptionalServices])

    // use effect for Total hours for BPAEndUser
    React.useEffect(() => {
        setOptionalServices((prevValues) => ({
            ...prevValues,
            BPAEndUser: {
                ...prevValues.BPAEndUser,
                totalHrs: Number(prevValues.BPAEndUser.travel) +
                    Number(prevValues.BPAEndUser.BPATraining)
            },
        }))

    }, [BPAEndUser.travel, BPAEndUser.BPATraining, setOptionalServices])


    // use effect for BPATraning,totalHrs for BPAEssentials
    React.useEffect(() => {
        if (BPAEssentials.include === 'No' || BPAEssentials.traningMethod === 'Online Learning' ||
            Info.traningMethod === 'Online Learning') {
            setOptionalServices((prevValue) => ({
                ...prevValue,
                BPAEssentials: {
                    ...prevValue.BPAEssentials,
                    BPATraining: 0,
                    totalHrs: 0,
                }
            }))

            return;
        }

        if (BPAEssentials.include === 'Yes' && daysValues.halfDay !== false) {

            const dataformsValue = Number(attendingCourses.dataforms);
            let value = Math.ceil(dataformsValue / 6) * daysValues.halfDay;

            setOptionalServices((prevValue) => ({
                ...prevValue,
                BPAEssentials: {
                    ...prevValue.BPAEssentials,
                    BPATraining: value,
                    totalHrs: value,
                }
            }))
        }

    }, [BPAEssentials.include, BPAEssentials.traningMethod, Info.traningMethod,
    attendingCourses.dataforms, daysValues, setOptionalServices])

    // use effect for BPATraning,totalHrs for dataformsPhoneBook
    React.useEffect(() => {
        if (dataformsPhoneBook.include === 'No') {
            setOptionalServices((prevValue) => ({
                ...prevValue,
                dataformsPhoneBook: {
                    ...prevValue.dataformsPhoneBook,
                    BPATraining: 0,
                    totalHrs: 0,
                }
            }))

            return;
        }

        if (dataformsPhoneBook.include === 'Yes' && daysValues.oneDay !== false) {
            setOptionalServices((prevValue) => ({
                ...prevValue,
                dataformsPhoneBook: {
                    ...prevValue.dataformsPhoneBook,
                    BPATraining: daysValues.oneDay,
                    totalHrs: daysValues.oneDay,
                }
            }))
        }

    }, [dataformsPhoneBook.include, daysValues, setOptionalServices])

    // use effect for BPAConsulting for addPrecedent
    React.useEffect(() => {
        if (addPrecedent.include === 'No') {
            setOptionalServices((prevValue) => ({
                ...prevValue,
                addPrecedent: {
                    ...prevValue.addPrecedent,
                    BPAConsulting: 0,
                }
            }))

            return;
        }

        if (addPrecedent.include === 'Yes' && daysValues.twoDay !== false) {
            setOptionalServices((prevValue) => ({
                ...prevValue,
                addPrecedent: {
                    ...prevValue.addPrecedent,
                    BPAConsulting: daysValues.twoDay,
                }
            }))
        }

    }, [addPrecedent.include, daysValues, setOptionalServices])

    // use effect for travel for addPrecedent
    React.useEffect(() => {
        if (addPrecedent.include === 'Yes' && dataformsMax.include === 'No') {
            setOptionalServices((prevValues) => ({
                ...prevValues,
                addPrecedent: {
                    ...prevValues.addPrecedent,
                    travel: 2 * Number(Info.hoursRequired)
                },
            }))
        }
        else {
            setOptionalServices((prevValues) => ({
                ...prevValues,
                addPrecedent: {
                    ...prevValues.addPrecedent,
                    travel: 0
                },
            }))
        }

    }, [addPrecedent.include, dataformsMax.include, Info.hoursRequired, setOptionalServices])

    // use effect for Total hours for addPrecedent
    React.useEffect(() => {
        setOptionalServices((prevValues) => ({
            ...prevValues,
            addPrecedent: {
                ...prevValues.addPrecedent,
                totalHrs: Number(prevValues.addPrecedent.travel) +
                    Number(prevValues.addPrecedent.BPAConsulting)
            },
        }))

    }, [addPrecedent.travel, addPrecedent.BPAConsulting, setOptionalServices])

    // use effect for BPAConsulting,totalHrs for BPAGoLive
    React.useEffect(() => {
        if (BPAGoLive.include === 'No') {
            setOptionalServices((prevValue) => ({
                ...prevValue,
                BPAGoLive: {
                    ...prevValue.BPAGoLive,
                    BPAConsulting: 0,
                    totalHrs: 0,
                }
            }))

            return;
        }

        if (BPAGoLive.include === 'Yes' && daysValues.oneDay !== false) {
            setOptionalServices((prevValue) => ({
                ...prevValue,
                BPAGoLive: {
                    ...prevValue.BPAGoLive,
                    BPAConsulting: daysValues.oneDay,
                    totalHrs: daysValues.oneDay,
                }
            }))
        }

    }, [BPAGoLive.include, daysValues, setOptionalServices])

    // use effect for TSG,totalHrs for exchangeIntegration
    React.useEffect(() => {
        if (exchangeIntegration.include === 'No') {
            setOptionalServices((prevValue) => ({
                ...prevValue,
                exchangeIntegration: {
                    ...prevValue.exchangeIntegration,
                    TSG: 0,
                    totalHrs: 0,
                }
            }))

            return;
        }

        if (exchangeIntegration.include === 'Yes' && daysValues.halfDay !== false) {
            setOptionalServices((prevValue) => ({
                ...prevValue,
                exchangeIntegration: {
                    ...prevValue.exchangeIntegration,
                    TSG: daysValues.halfDay,
                    totalHrs: daysValues.halfDay,
                }
            }))
        }

    }, [exchangeIntegration.include, daysValues, setOptionalServices])


    // use effect for BPAConsulting,totalHrs for softdocsIntegration
    React.useEffect(() => {
        if (softdocsIntegration.include === 'No') {
            setOptionalServices((prevValue) => ({
                ...prevValue,
                softdocsIntegration: {
                    ...prevValue.softdocsIntegration,
                    BPAConsulting: 0,
                    totalHrs: 0,
                }
            }))

            return;
        }

        if (softdocsIntegration.include === 'Yes' && daysValues.halfDay !== false) {
            setOptionalServices((prevValue) => ({
                ...prevValue,
                softdocsIntegration: {
                    ...prevValue.softdocsIntegration,
                    BPAConsulting: daysValues.halfDay,
                    totalHrs: daysValues.halfDay,
                }
            }))
        }

    }, [softdocsIntegration.include, daysValues, setOptionalServices])

    // use effect for TSG,BPAConsulting,totalHrs for clientPortal
    React.useEffect(() => {
        if (clientPortal.include === 'No') {
            setOptionalServices((prevValue) => ({
                ...prevValue,
                clientPortal: {
                    ...prevValue.clientPortal,
                    TSG: 0,
                    BPAConsulting: 0,
                    totalHrs: 0,
                }
            }))

            return;
        }

        if (clientPortal.include === 'Yes' && daysValues.oneDay !== false &&
            daysValues.twoDay !== false) {
            setOptionalServices((prevValue) => ({
                ...prevValue,
                clientPortal: {
                    ...prevValue.clientPortal,
                    TSG: daysValues.oneDay,
                    BPAConsulting: daysValues.twoDay,
                    totalHrs: Number(daysValues.oneDay) + Number(daysValues.twoDay),
                }
            }))
        }

    }, [clientPortal.include, daysValues, setOptionalServices])

    // use effect for TSG,totalHrs for worksiteIntegration
    React.useEffect(() => {
        if (worksiteIntegration.include === 'No') {
            setOptionalServices((prevValue) => ({
                ...prevValue,
                worksiteIntegration: {
                    ...prevValue.worksiteIntegration,
                    TSG: 0,
                    totalHrs: 0,
                }
            }))

            return;
        }

        if (worksiteIntegration.include === 'Yes' && daysValues.oneDay !== false) {
            setOptionalServices((prevValue) => ({
                ...prevValue,
                worksiteIntegration: {
                    ...prevValue.worksiteIntegration,
                    TSG: daysValues.oneDay,
                    totalHrs: daysValues.oneDay,
                }
            }))
        }

    }, [worksiteIntegration.include, daysValues, setOptionalServices])



    // use effect for TSG,totalHrs for thirdPartyIT
    React.useEffect(() => {
        if (thirdPartyIT.include === 'No') {
            setOptionalServices((prevValue) => ({
                ...prevValue,
                thirdPartyIT: {
                    ...prevValue.thirdPartyIT,
                    TSG: 0,
                    totalHrs: 0,
                }
            }))

            return;
        }

        if (thirdPartyIT.include === 'Yes' && daysValues.oneDay !== false) {
            setOptionalServices((prevValue) => ({
                ...prevValue,
                thirdPartyIT: {
                    ...prevValue.thirdPartyIT,
                    TSG: daysValues.oneDay,
                    totalHrs: daysValues.oneDay,
                }
            }))
        }

    }, [thirdPartyIT.include, daysValues, setOptionalServices])


    // use effect for travel for dataformsMax, scripting, workflow,BPAEndUser
    React.useEffect(() => {
        if (Info.timeIncluded === 'No') {
            setOptionalServices((prevValues) => ({
                ...prevValues,
                dataformsMax: {
                    ...prevValues.dataformsMax,
                    travel: 0
                },
                scripting: {
                    ...prevValues.scripting,
                    travel: 0
                },
                workflow: {
                    ...prevValues.workflow,
                    travel: 0
                },
                BPAEndUser: {
                    ...prevValues.BPAEndUser,
                    travel: 0
                },
            }))
        }
        else {
            if (Info.timeIncluded === 'Yes') {
                setOptionalServices((prevValues) => ({
                    ...prevValues,
                    dataformsMax: {
                        ...prevValues.dataformsMax,
                        travel: 2 * Number(Info.hoursRequired)
                    },
                    scripting: {
                        ...prevValues.scripting,
                        travel: 2 * Number(Info.hoursRequired)
                    },
                    workflow: {
                        ...prevValues.workflow,
                        travel: 2 * Number(Info.hoursRequired)
                    },
                    BPAEndUser: {
                        ...prevValues.BPAEndUser,
                        travel: 2 * Number(Info.hoursRequired)
                    },
                }))
            }
        }
    }, [Info.timeIncluded, Info.hoursRequired, setOptionalServices]);






    // use effect for PM for grandTotalHours, grandTotalDays
    React.useEffect(() => {
        setOptionalServices((prevValues) => ({
            ...prevValues,
            grandTotalHours: {
                ...prevValues.grandTotalHours,
                PM: defaultServicesValues.totalHrsBaseInstall.PM
            },
            grandTotalDays: {
                ...prevValues.grandTotalDays,
                PM: defaultServicesValues.totalDays.PM
            }
        }))

    }, [defaultServicesValues.totalHrsBaseInstall.PM, defaultServicesValues.totalDays.PM, setOptionalServices])

    // use effect for TSG for  totalHours
    React.useEffect(() => {
        setOptionalServices((prevValues) => ({
            ...prevValues,
            totalHours: {
                ...prevValues.totalHours,
                TSG: Number(prevValues.exchangeIntegration.TSG) + Number(prevValues.clientPortal.TSG) +
                    Number(prevValues.worksiteIntegration.TSG) +
                    Number(prevValues.affinityMobile.TSG) + Number(prevValues.thirdPartyIT.TSG),
            },
        }))

    }, [exchangeIntegration.TSG, clientPortal.TSG, worksiteIntegration.TSG,
    affinityMobile.TSG, thirdPartyIT.TSG, setOptionalServices])

    // use effect for TSG for  totalDays
    React.useEffect(() => {
        if (clientProfile.country !== '' && countryHours[clientProfile.country] !== false) {
            setOptionalServices((prevValues) => {
                const value = Number(prevValues.totalHours.TSG) / countryHours[clientProfile.country];
                return {
                    ...prevValues,
                    totalDays: {
                        ...prevValues.totalDays,
                        TSG: Number(value.toFixed(2))
                    },
                }
            })
        }
        else {
            setOptionalServices((prevValues) => ({
                ...prevValues,
                totalDays: {
                    ...prevValues.totalDays,
                    TSG: 0,
                },
            }))
        }
    }, [totalHours.TSG, clientProfile.country, countryHours, setOptionalServices])

    // use effect for TSG for grandTotalHours
    React.useEffect(() => {
        setOptionalServices((prevValues) => ({
            ...prevValues,
            grandTotalHours: {
                ...prevValues.grandTotalHours,
                TSG: Number(prevValues.totalHours.TSG) +
                    Number(defaultServicesValues.totalHrsBaseInstall.TSG)
            },
        }))
    }, [totalHours.TSG, defaultServicesValues.totalHrsBaseInstall.TSG, setOptionalServices])

    // use effect for TSG for grandTotalDays
    React.useEffect(() => {
        if (clientProfile.country !== '' && countryHours[clientProfile.country] !== false) {
            setOptionalServices((prevValues) => {
                const value = Number(prevValues.grandTotalHours.TSG) / countryHours[clientProfile.country];
                return {
                    ...prevValues,
                    grandTotalDays: {
                        ...prevValues.grandTotalDays,
                        TSG: Number(value.toFixed(2)),
                    },
                }
            })
        }
        else {
            setOptionalServices((prevValues) => ({
                ...prevValues,
                grandTotalDays: {
                    ...prevValues.grandTotalDays,
                    TSG: 0,
                },
            }))
        }
    }, [grandTotalHours.TSG, clientProfile.country, countryHours, setOptionalServices])

    // use effect for dataMIgration for totalHours,grandTotalHours
    React.useEffect(() => {
        setOptionalServices((prevValues) => ({
            ...prevValues,
            totalHours: {
                ...prevValues.totalHours,
                dataMigration: Number(prevValues.dataMigrationRow.dataMigration),
            },
            grandTotalHours: {
                ...prevValues.grandTotalHours,
                dataMigration: Number(prevValues.dataMigrationRow.dataMigration),
            },
        }))

    }, [dataMigrationRow.dataMigration, setOptionalServices])

    // use effect for dataMIgration for grandTotalDays
    React.useEffect(() => {
        if (clientProfile.country !== '' && countryHours[clientProfile.country] !== false) {
            setOptionalServices((prevValues) => {
                const value = Number(prevValues.grandTotalHours.dataMigration) / countryHours[clientProfile.country];
                return {
                    ...prevValues,
                    grandTotalDays: {
                        ...prevValues.grandTotalDays,
                        dataMigration: Number(value.toFixed(2))
                    },
                }
            })
        }
        else {
            setOptionalServices((prevValues) => ({
                ...prevValues,
                grandTotalDays: {
                    ...prevValues.grandTotalDays,
                    dataMigration: 0,
                },
            }))
        }
    }, [grandTotalHours.dataMigration, clientProfile.country, countryHours, setOptionalServices])

    // use effect for dataMIgration for totalDays
    React.useEffect(() => {
        if (clientProfile.country !== '' && countryHours[clientProfile.country] !== false) {
            setOptionalServices((prevValues) => {
                const value = Number(prevValues.totalHours.dataMigration) / countryHours[clientProfile.country];
                return {
                    ...prevValues,
                    totalDays: {
                        ...prevValues.totalDays,
                        dataMigration: Number(value.toFixed(2))
                    },
                }
            })
        }
        else {
            setOptionalServices((prevValues) => ({
                ...prevValues,
                totalDays: {
                    ...prevValues.totalDays,
                    dataMigration: 0,
                },
            }))
        }
    }, [totalHours.dataMigration, clientProfile.country, countryHours, setOptionalServices])

    // use effect for acc traning for totalHours 
    React.useEffect(() => {
        setOptionalServices((prevValues) => ({
            ...prevValues,
            totalHours: {
                ...prevValues.totalHours,
                accountsTraining: Number(prevValues.selfCustody.accountsTraining) +
                    Number(prevValues.reportWriting.accountsTraining)
            },
        }))

    }, [selfCustody.accountsTraining, reportWriting.accountsTraining, setOptionalServices])


    // use effect for acc traning for totalDays
    React.useEffect(() => {
        if (clientProfile.country !== '' && countryHours[clientProfile.country] !== false) {
            setOptionalServices((prevValues) => {
                const value = Number(prevValues.totalHours.accountsTraining) / countryHours[clientProfile.country];
                return {
                    ...prevValues,
                    totalDays: {
                        ...prevValues.totalDays,
                        accountsTraining: Number(value.toFixed(2))
                    },
                }
            })
        }
        else {
            setOptionalServices((prevValues) => ({
                ...prevValues,
                totalDays: {
                    ...prevValues.totalDays,
                    accountsTraining: 0,
                },
            }))
        }
    }, [totalHours.accountsTraining, clientProfile.country, countryHours, setOptionalServices])

    // use effect for accountsTraining for grandTotalHours
    React.useEffect(() => {
        setOptionalServices((prevValues) => ({
            ...prevValues,
            grandTotalHours: {
                ...prevValues.grandTotalHours,
                accountsTraining: Number(prevValues.totalHours.accountsTraining) +
                    Number(defaultServicesValues.totalHrsBaseInstall.accountsTraining)
            },
        }))
    }, [totalHours.accountsTraining, defaultServicesValues.totalHrsBaseInstall.accountsTraining, setOptionalServices])

    // use effect for acc traning for grandTotalDays
    React.useEffect(() => {
        if (clientProfile.country !== '' && countryHours[clientProfile.country] !== false) {
            setOptionalServices((prevValues) => {
                const value = Number(prevValues.grandTotalHours.accountsTraining) / countryHours[clientProfile.country];
                return {
                    ...prevValues,
                    grandTotalDays: {
                        ...prevValues.grandTotalDays,
                        accountsTraining: Number(value.toFixed(2))
                    },
                }
            })
        }
        else {
            setOptionalServices((prevValues) => ({
                ...prevValues,
                grandTotalDays: {
                    ...prevValues.grandTotalDays,
                    accountsTraining: 0,
                },
            }))
        }
    }, [grandTotalHours.accountsTraining, clientProfile.country, countryHours, setOptionalServices])

    // use effect for accountsConsulting for totalHours
    React.useEffect(() => {
        setOptionalServices((prevValues) => ({
            ...prevValues,
            totalHours: {
                ...prevValues.totalHours,
                accountsConsulting: Number(prevValues.dataMigrationRow.accountsConsulting) +
                    Number(prevValues.selfCustody.accountsConsulting) +
                    Number(prevValues.multyPartyBilling.accountsConsulting)
            },
        }))
    }, [dataMigrationRow.accountsConsulting, selfCustody.accountsConsulting,
    multyPartyBilling.accountsConsulting, setOptionalServices])

    // use effect for accountsConsulting for totalDays
    React.useEffect(() => {
        if (clientProfile.country !== '' && countryHours[clientProfile.country] !== false) {
            setOptionalServices((prevValues) => {
                const value = Number(prevValues.totalHours.accountsConsulting) / countryHours[clientProfile.country];
                return {
                    ...prevValues,
                    totalDays: {
                        ...prevValues.totalDays,
                        accountsConsulting: Number(value.toFixed(2))
                    },
                }
            })
        }
        else {
            setOptionalServices((prevValues) => ({
                ...prevValues,
                totalDays: {
                    ...prevValues.totalDays,
                    accountsConsulting: 0,
                },
            }))
        }
    }, [totalHours.accountsConsulting, clientProfile.country, countryHours, setOptionalServices])

    // use effect for accountsConsulting for grandTotalHours
    React.useEffect(() => {
        setOptionalServices((prevValues) => ({
            ...prevValues,
            grandTotalHours: {
                ...prevValues.grandTotalHours,
                accountsConsulting: Number(prevValues.totalHours.accountsConsulting) +
                    Number(defaultServicesValues.totalHrsBaseInstall.accountsConsulting)
            },
        }))
    }, [totalHours.accountsConsulting, defaultServicesValues.totalHrsBaseInstall.accountsConsulting, setOptionalServices])

    // use effect for accountsConsulting for grandTotalDays
    React.useEffect(() => {
        if (clientProfile.country !== '' && countryHours[clientProfile.country] !== false) {
            setOptionalServices((prevValues) => {
                const value = Number(prevValues.grandTotalHours.accountsConsulting) / countryHours[clientProfile.country];
                return {
                    ...prevValues,
                    grandTotalDays: {
                        ...prevValues.grandTotalDays,
                        accountsConsulting: Number(value.toFixed(2))
                    },
                }
            })
        }
        else {
            setOptionalServices((prevValues) => ({
                ...prevValues,
                grandTotalDays: {
                    ...prevValues.grandTotalDays,
                    accountsConsulting: 0,
                },
            }))
        }
    }, [grandTotalHours.accountsConsulting, clientProfile.country, countryHours, setOptionalServices])

    // use effect for BPATraning for  totalHours, grandTotalHours
    React.useEffect(() => {
        setOptionalServices((prevValues) => {
            const value = prevValues.dataformsMax.BPATraining + prevValues.scripting.BPATraining +
                prevValues.workflow.BPATraining + prevValues.BPAEndUser.BPATraining +
                prevValues.BPAEssentials.BPATraining + prevValues.dataformsPhoneBook.BPATraining
            return {
                ...prevValues,
                totalHours: {
                    ...prevValues.totalHours,
                    BPATraining: value,
                },
                grandTotalHours: {
                    ...prevValues.grandTotalHours,
                    BPATraining: value,
                },
            }
        })

    }, [dataformsMax.BPATraining, scripting.BPATraining, workflow.BPATraining,
    BPAEndUser.BPATraining, BPAEssentials.BPATraining, dataformsPhoneBook.BPATraining, setOptionalServices])

    // use effect for BPATraining for totalDays
    React.useEffect(() => {
        if (clientProfile.country !== '' && countryHours[clientProfile.country] !== false) {
            setOptionalServices((prevValues) => {
                const value = Number(prevValues.totalHours.BPATraining) / countryHours[clientProfile.country];
                return {
                    ...prevValues,
                    totalDays: {
                        ...prevValues.totalDays,
                        BPATraining: Number(value.toFixed(2))
                    },
                }
            })
        }
        else {
            setOptionalServices((prevValues) => ({
                ...prevValues,
                totalDays: {
                    ...prevValues.totalDays,
                    BPATraining: 0,
                },
            }))
        }
    }, [totalHours.BPATraining, clientProfile.country, countryHours, setOptionalServices])

    // use effect for BPATraining for grandTotalDays
    React.useEffect(() => {
        if (clientProfile.country !== '' && countryHours[clientProfile.country] !== false) {
            setOptionalServices((prevValues) => {
                const value = Number(prevValues.grandTotalHours.BPATraining) / countryHours[clientProfile.country];
                return {
                    ...prevValues,
                    grandTotalDays: {
                        ...prevValues.grandTotalDays,
                        BPATraining: Number(value.toFixed(2))
                    },
                }
            })
        }
        else {
            setOptionalServices((prevValues) => ({
                ...prevValues,
                grandTotalDays: {
                    ...prevValues.grandTotalDays,
                    BPATraining: 0,
                },
            }))
        }
    }, [grandTotalHours.BPATraining, clientProfile.country, countryHours, setOptionalServices])

    // use effect for BPAConsulting for  totalHours
    React.useEffect(() => {
        setOptionalServices((prevValues) => {
            const value = Number(prevValues.addPrecedent.BPAConsulting) + prevValues.BPAGoLive.BPAConsulting +
                prevValues.softdocsIntegration.BPAConsulting + prevValues.clientPortal.BPAConsulting +
                prevValues.empower.BPAConsulting + prevValues.settlementAdjuster.BPAConsulting
            return {
                ...prevValues,
                totalHours: {
                    ...prevValues.totalHours,
                    BPAConsulting: value,
                },
            }
        })

    }, [addPrecedent.BPAConsulting, BPAGoLive.BPAConsulting, softdocsIntegration.BPAConsulting,
    clientPortal.BPAConsulting, empower.BPAConsulting, settlementAdjuster.BPAConsulting, setOptionalServices])

    // use effect for BPAConsulting for totalDays
    React.useEffect(() => {
        if (clientProfile.country !== '' && countryHours[clientProfile.country] !== false) {
            setOptionalServices((prevValues) => {
                const value = Number(prevValues.totalHours.BPAConsulting) / countryHours[clientProfile.country];
                return {
                    ...prevValues,
                    totalDays: {
                        ...prevValues.totalDays,
                        BPAConsulting: Number(value.toFixed(2))
                    },
                }
            })
        }
        else {
            setOptionalServices((prevValues) => ({
                ...prevValues,
                totalDays: {
                    ...prevValues.totalDays,
                    BPAConsulting: 0,
                },
            }))
        }
    }, [totalHours.BPAConsulting, clientProfile.country, countryHours, setOptionalServices])

    // use effect for BPAConsulting for grandTotalHours
    React.useEffect(() => {
        setOptionalServices((prevValues) => ({
            ...prevValues,
            grandTotalHours: {
                ...prevValues.grandTotalHours,
                BPAConsulting: Number(prevValues.totalHours.BPAConsulting) +
                    Number(defaultServicesValues.totalHrsBaseInstall.BPAConsulting)
            },
        }))
    }, [totalHours.BPAConsulting, defaultServicesValues.totalHrsBaseInstall.BPAConsulting, setOptionalServices])

    // use effect for BPAConsulting for grandTotalDays
    React.useEffect(() => {
        if (clientProfile.country !== '' && countryHours[clientProfile.country] !== false) {
            setOptionalServices((prevValues) => {
                const value = Number(prevValues.grandTotalHours.BPAConsulting) / countryHours[clientProfile.country];
                return {
                    ...prevValues,
                    grandTotalDays: {
                        ...prevValues.grandTotalDays,
                        BPAConsulting: Number(value.toFixed(2))
                    },
                }
            })
        }
        else {
            setOptionalServices((prevValues) => ({
                ...prevValues,
                grandTotalDays: {
                    ...prevValues.grandTotalDays,
                    BPAConsulting: 0,
                },
            }))
        }
    }, [grandTotalHours.BPAConsulting, clientProfile.country, countryHours, setOptionalServices])

    // use effect for travel for  totalHours
    React.useEffect(() => {
        setOptionalServices((prevValues) => {
            const value = prevValues.dataformsMax.travel + prevValues.scripting.travel +
                prevValues.workflow.travel + prevValues.BPAEndUser.travel +
                prevValues.addPrecedent.travel;
            return {
                ...prevValues,
                totalHours: {
                    ...prevValues.totalHours,
                    travel: value,
                },
            }
        })

    }, [dataformsMax.travel, scripting.travel, workflow.travel,
    BPAEndUser.travel, addPrecedent.travel, setOptionalServices])

    // use effect for travel for totalDays
    React.useEffect(() => {
        if (clientProfile.country !== '' && countryHours[clientProfile.country] !== false) {
            setOptionalServices((prevValues) => {
                const value = Number(prevValues.totalHours.travel) / countryHours[clientProfile.country];
                return {
                    ...prevValues,
                    totalDays: {
                        ...prevValues.totalDays,
                        travel: Number(value.toFixed(2))
                    },
                }
            })
        }
        else {
            setOptionalServices((prevValues) => ({
                ...prevValues,
                totalDays: {
                    ...prevValues.totalDays,
                    travel: 0,
                },
            }))
        }
    }, [totalHours.travel, clientProfile.country, countryHours, setOptionalServices])

    // use effect for travel for grandTotalHours
    React.useEffect(() => {
        setOptionalServices((prevValues) => ({
            ...prevValues,
            grandTotalHours: {
                ...prevValues.grandTotalHours,
                travel: Number(prevValues.totalHours.travel) +
                    Number(defaultServicesValues.totalHrsBaseInstall.travel)
            },
        }))
    }, [totalHours.travel, defaultServicesValues.totalHrsBaseInstall.travel, setOptionalServices])

    // use effect for travel for grandTotalDays
    React.useEffect(() => {
        if (clientProfile.country !== '' && countryHours[clientProfile.country] !== false) {
            setOptionalServices((prevValues) => {
                const value = Number(prevValues.grandTotalHours.travel) / countryHours[clientProfile.country];
                return {
                    ...prevValues,
                    grandTotalDays: {
                        ...prevValues.grandTotalDays,
                        travel: Number(value.toFixed(2))
                    },
                }
            })
        }
        else {
            setOptionalServices((prevValues) => ({
                ...prevValues,
                grandTotalDays: {
                    ...prevValues.grandTotalDays,
                    travel: 0,
                },
            }))
        }
    }, [grandTotalHours.travel, clientProfile.country, countryHours, setOptionalServices])

    // use effect for totalHrs for  totalHours
    React.useEffect(() => {
        setOptionalServices((prevValues) => {
            const value = Number(prevValues.totalHours.PM) + Number(prevValues.totalHours.TSG) +
                Number(prevValues.totalHours.dataMigration) + Number(prevValues.totalHours.accountsTraining) +
                Number(prevValues.totalHours.accountsConsulting) + Number(prevValues.totalHours.BPATraining) +
                Number(prevValues.totalHours.BPAConsulting) + Number(prevValues.totalHours.travel);

            return {
                ...prevValues,
                totalHours: {
                    ...prevValues.totalHours,
                    totalHrs: value,
                },
            }
        })

    }, [totalHours.PM, totalHours.TSG, totalHours.dataMigration,
    totalHours.accountsTraining, totalHours.accountsConsulting, totalHours.BPATraining,
    totalHours.BPAConsulting, totalHours.travel, setOptionalServices])

    // use effect for totalHrs for totalDays
    React.useEffect(() => {
        if (clientProfile.country !== '' && countryHours[clientProfile.country] !== false) {
            setOptionalServices((prevValues) => {
                const value = Number(prevValues.totalHours.totalHrs) / countryHours[clientProfile.country];
                return {
                    ...prevValues,
                    totalDays: {
                        ...prevValues.totalDays,
                        totalHrs: Number(value.toFixed(2))
                    },
                }
            })
        }
        else {
            setOptionalServices((prevValues) => ({
                ...prevValues,
                totalDays: {
                    ...prevValues.totalDays,
                    totalHrs: 0,
                },
            }))
        }
    }, [totalHours.totalHrs, clientProfile.country, countryHours, setOptionalServices])

    // use effect for totalHrs for grandTotalHours
    React.useEffect(() => {
        setOptionalServices((prevValues) => ({
            ...prevValues,
            grandTotalHours: {
                ...prevValues.grandTotalHours,
                totalHrs: Number(prevValues.totalHours.totalHrs) +
                    Number(defaultServicesValues.totalHrsBaseInstall.totalHrs)
            },
        }))
    }, [totalHours.totalHrs, defaultServicesValues.totalHrsBaseInstall.totalHrs, setOptionalServices])

    // use effect for totalHrs for grandTotalDays
    React.useEffect(() => {
        if (clientProfile.country !== '' && countryHours[clientProfile.country] !== false) {
            setOptionalServices((prevValues) => {
                const value = Number(prevValues.grandTotalHours.totalHrs) / countryHours[clientProfile.country];
                return {
                    ...prevValues,
                    grandTotalDays: {
                        ...prevValues.grandTotalDays,
                        totalHrs: Number(value.toFixed(2))
                    },
                }
            })
        }
        else {
            setOptionalServices((prevValues) => ({
                ...prevValues,
                grandTotalDays: {
                    ...prevValues.grandTotalDays,
                    totalHrs: 0,
                },
            }))
        }
    }, [grandTotalHours.totalHrs, clientProfile.country, countryHours, setOptionalServices])



    return null;
}

export default OptionalServicesLogic;
