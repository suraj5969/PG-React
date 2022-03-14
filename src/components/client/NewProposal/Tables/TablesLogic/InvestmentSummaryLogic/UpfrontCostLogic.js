import React from 'react';
import getGSTPercentagesAPI from '../../../../../../apis/client/getGSTPercentagesAPI.js';
import getProductInfoByIdAPI from '../../../../../../apis/client/getProductInfoByIdAPI.js';
import getDayConversionInfoAPI from '../../../../../../apis/client/getDayConversionInfoAPI.js';

function UpfrontCostLogic(props) {

    const { clientProfile, Info, attendingCourses, defaultServicesValues,
        optionalServices, miscellaneous,
        upfrontCost, setUpfrontCost, affinityServerPopupValues } = props;

    const { lexisServerLicense, lexisUserLicense,
        oracleLicenses, clientPortal, affinityMobile, lexisSettleAdjuster,
        twoWayMicrosoft,
        empower, softDocs, ImplementServices, ImplementTraning, postImplementation,
        dataMigration, travelAllowance, scopingStudy, propertyPrecedent,
        subTotal, totalInvesteExcl, GSTPayable, totalInvestePay, } = upfrontCost;

    const [productInfos, setProductInfos] = React.useState({});
    React.useEffect(() => {

        (async () => {
            const userLicenseProduct = await getProductInfoByIdAPI('1532485');
            if (userLicenseProduct.status !== 200) {
                console.log('getProductInfoByIdAPI api not working')
            }
            else {
                if (typeof userLicenseProduct.data === 'object' && userLicenseProduct.data.length > 0) {
                    const values = {};
                    userLicenseProduct.data.forEach((product) => {
                        values[product.BU_NAME] = product.STD_UNIT_PRICE_AMT
                    })
                    setProductInfos((prevValues) => ({
                        ...prevValues,
                        "1532485": values
                    }))
                }
            }
        })();

        (async () => {
            const serverLicenseProduct = await getProductInfoByIdAPI('1532486');
            if (serverLicenseProduct.status !== 200) {
                console.log('getProductInfoByIdAPI api not working')
            }
            else {
                if (typeof serverLicenseProduct.data === 'object' && serverLicenseProduct.data.length > 0) {
                    const values = {};
                    serverLicenseProduct.data.forEach((product) => {
                        values[product.BU_NAME] = product.STD_UNIT_PRICE_AMT
                    })
                    setProductInfos((prevValues) => ({
                        ...prevValues,
                        "1532486": values
                    }))
                }
            }
        })();

        (async () => {
            const userLicenseProduct = await getProductInfoByIdAPI('1532487');
            if (userLicenseProduct.status !== 200) {
                console.log('getProductInfoByIdAPI api not working')
            }
            else {
                if ( typeof userLicenseProduct.data === 'object' && userLicenseProduct.data.length > 0) {
                    const values = {};
                    userLicenseProduct.data.forEach((product) => {
                        values[product.BU_NAME] = product.STD_UNIT_PRICE_AMT
                    })
                    setProductInfos((prevValues) => ({
                        ...prevValues,
                        "1532487": values
                    }))
                }
            }
        })();

        (async () => {
            const userLicenseProduct = await getProductInfoByIdAPI('1532492');
            if (userLicenseProduct.status !== 200) {
                console.log('getProductInfoByIdAPI api not working')
            }
            else {
                if (typeof userLicenseProduct.data === 'object' && userLicenseProduct.data.length > 0) {
                    const values = {};
                    userLicenseProduct.data.forEach((product) => {
                        values[product.BU_NAME] = product.STD_UNIT_PRICE_AMT
                    })
                    setProductInfos((prevValues) => ({
                        ...prevValues,
                        "1532492": values
                    }))
                }
            }
        })();

        (async () => {
            const userLicenseProduct = await getProductInfoByIdAPI('1533058');
            if (userLicenseProduct.status !== 200) {
                console.log('getProductInfoByIdAPI api not working')
            }
            else {
                if (typeof userLicenseProduct.data === 'object' && userLicenseProduct.data.length > 0) {
                    const values = {};
                    userLicenseProduct.data.forEach((product) => {
                        values[product.BU_NAME] = product.STD_UNIT_PRICE_AMT
                    })
                    setProductInfos((prevValues) => ({
                        ...prevValues,
                        "1533058": values
                    }))
                }
            }
        })();

        (async () => {
            const userLicenseProduct = await getProductInfoByIdAPI('1532492');
            if (userLicenseProduct.status !== 200) {
                console.log('getProductInfoByIdAPI api not working')
            }
            else {
                if (typeof userLicenseProduct.data === 'object' && userLicenseProduct.data.length > 0) {
                    const values = {};
                    userLicenseProduct.data.forEach((product) => {
                        values[product.BU_NAME] = product.STD_UNIT_PRICE_AMT
                    })
                    setProductInfos((prevValues) => ({
                        ...prevValues,
                        "1532492": values
                    }))
                }
            }
        })();

        (async () => {
            const userLicenseProduct = await getProductInfoByIdAPI('1532493');
            if (userLicenseProduct.status !== 200) {
                console.log('getProductInfoByIdAPI api not working')
            }
            else {
                if (userLicenseProduct.data.length > 0 && typeof userLicenseProduct.data === 'object') {
                    const values = {};
                    userLicenseProduct.data.forEach((product) => {
                        values[product.BU_NAME] = product.STD_UNIT_PRICE_AMT
                    })
                    setProductInfos((prevValues) => ({
                        ...prevValues,
                        "1532493": values
                    }))
                }
            }
        })();
    }, [setProductInfos])


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

    //useEffect for column Cost for lexisServerLicense row 
    React.useEffect(() => {
        if (clientProfile.objective === 'Upsell' || clientProfile.country === '') {
            setUpfrontCost((prevValues) => ({
                ...prevValues,
                lexisServerLicense: {
                    ...prevValues.lexisServerLicense,
                    cost: 0,
                },
            }))
        }
        else {
            if (clientProfile.objective === 'New Business' && productInfos["1532486"]) {
                // set price according to country
                setUpfrontCost((prevValues) => ({
                    ...prevValues,
                    lexisServerLicense: {
                        ...prevValues.lexisServerLicense,
                        cost: Number(productInfos["1532486"][clientProfile.country]).toFixed(2),
                    },
                }))
            }
        }

    }, [clientProfile.objective, productInfos, clientProfile.country, setUpfrontCost])

    //useEffect for 2 column discountItemcost, discountAmount for lexisServerLicense row 
    React.useEffect(() => {
        setUpfrontCost((prevValues) => {
            const itemcost = Number(prevValues.lexisServerLicense.cost) -
                (Number(prevValues.lexisServerLicense.cost) * Number(prevValues.lexisServerLicense.percentDiscount)) / 100;
            const amount = (Number(prevValues.lexisServerLicense.cost) * Number(prevValues.lexisServerLicense.percentDiscount)) / 100;
            return {
                ...prevValues,
                lexisServerLicense: {
                    ...prevValues.lexisServerLicense,
                    discountItemcost: itemcost.toFixed(2),
                    discountAmount: amount.toFixed(2),
                },
            }
        })
    }, [lexisServerLicense.cost, lexisServerLicense.percentDiscount, setUpfrontCost])


    //useEffect for column label for lexisUserLicense row 
    React.useEffect(() => {
        setUpfrontCost((prevValues) => ({
            ...prevValues,
            lexisUserLicense: {
                ...prevValues.lexisUserLicense,
                label: `Lexis Affinity User licences for ${Number(clientProfile.numOfUsers)} users`,
            },
        }))
    }, [clientProfile.numOfUsers, setUpfrontCost])

    //useEffect for column Cost for lexisUserLicense row 
    React.useEffect(() => {
        // set value from DB
        if (clientProfile.country !== '' && productInfos["1532487"]) {
            setUpfrontCost((prevValues) => ({
                ...prevValues,
                lexisUserLicense: {
                    ...prevValues.lexisUserLicense,
                    cost: (Number(clientProfile.numOfUsers) * Number(productInfos["1532487"][clientProfile.country])).toFixed(2),
                },
            }))
        }
        else {
            setUpfrontCost((prevValues) => ({
                ...prevValues,
                lexisUserLicense: {
                    ...prevValues.lexisUserLicense,
                    cost: 0,
                },
            }))
        }
    }, [clientProfile.numOfUsers, clientProfile.country, productInfos, setUpfrontCost])

    //useEffect for 2 column discountItemcost, discountAmount for lexisUserLicense row 
    React.useEffect(() => {
        setUpfrontCost((prevValues) => {
            const itemcost = Number(prevValues.lexisUserLicense.cost) -
                (Number(prevValues.lexisUserLicense.cost) * Number(prevValues.lexisUserLicense.percentDiscount)) / 100;
            const amount = (Number(prevValues.lexisUserLicense.cost) * Number(prevValues.lexisUserLicense.percentDiscount)) / 100;
            return {
                ...prevValues,
                lexisUserLicense: {
                    ...prevValues.lexisUserLicense,
                    discountItemcost: itemcost.toFixed(2),
                    discountAmount: amount.toFixed(2),
                },
            }
        })
    }, [lexisUserLicense.cost, lexisUserLicense.percentDiscount, setUpfrontCost])


    //useEffect for column Cost for oracleLicenses row 
    React.useEffect(() => {
        if (miscellaneous.affinityServer.included === '') {
            setUpfrontCost((prevValues) => ({
                ...prevValues,
                oracleLicenses: {
                    ...prevValues.oracleLicenses,
                    cost: 0,
                },
            }))
        }
        else {
            setUpfrontCost((prevValues) => ({
                ...prevValues,
                oracleLicenses: {
                    ...prevValues.oracleLicenses,
                    cost: Number(affinityServerPopupValues.oracleLicense).toFixed(2),
                },
            }))
        }
    }, [miscellaneous.affinityServer.included, setUpfrontCost, affinityServerPopupValues])

    //useEffect for 2 column discountItemcost, discountAmount for oracleLicenses row 
    React.useEffect(() => {
        setUpfrontCost((prevValues) => {
            const itemcost = Number(prevValues.oracleLicenses.cost) -
                (Number(prevValues.oracleLicenses.cost) * Number(prevValues.oracleLicenses.percentDiscount)) / 100;
            const amount = (Number(prevValues.oracleLicenses.cost) * Number(prevValues.oracleLicenses.percentDiscount)) / 100;
            return {
                ...prevValues,
                oracleLicenses: {
                    ...prevValues.oracleLicenses,
                    discountItemcost: itemcost.toFixed(2),
                    discountAmount: amount.toFixed(2),
                },
            }
        })
    }, [oracleLicenses.cost, oracleLicenses.percentDiscount, setUpfrontCost])

    //useEffect for column Cost for clientPortal row 
    React.useEffect(() => {
        if (clientProfile.country === '' || optionalServices.clientPortal.include !== 'Yes') {
            setUpfrontCost((prevValues) => ({
                ...prevValues,
                clientPortal: {
                    ...prevValues.clientPortal,
                    cost: 0,
                },
            }))
        }
        else {
            // set price according to country
            if (productInfos["1532485"]) {
                setUpfrontCost((prevValues) => ({
                    ...prevValues,
                    clientPortal: {
                        ...prevValues.clientPortal,
                        cost: productInfos["1532485"][clientProfile.country],
                    },
                }))
            }

        }

    }, [optionalServices.clientPortal.include, productInfos, clientProfile.country, setUpfrontCost])

    //useEffect for 2 column discountItemcost, discountAmount for clientPortal row 
    React.useEffect(() => {
        setUpfrontCost((prevValues) => {
            const itemcost = Number(prevValues.clientPortal.cost) -
                (Number(prevValues.clientPortal.cost) * Number(prevValues.clientPortal.percentDiscount)) / 100;
            const amount = (Number(prevValues.clientPortal.cost) * Number(prevValues.clientPortal.percentDiscount)) / 100;
            return {
                ...prevValues,
                clientPortal: {
                    ...prevValues.clientPortal,
                    discountItemcost: itemcost.toFixed(2),
                    discountAmount: amount.toFixed(2),
                },
            }
        })
    }, [clientPortal.cost, clientPortal.percentDiscount, setUpfrontCost])


    //useEffect for 2 column discountItemcost, discountAmount for affinityMobile row 
    React.useEffect(() => {
        setUpfrontCost((prevValues) => {
            const itemcost = Number(prevValues.affinityMobile.cost) -
                (Number(prevValues.affinityMobile.cost) * Number(prevValues.affinityMobile.percentDiscount)) / 100;
            const amount = (Number(prevValues.affinityMobile.cost) * Number(prevValues.affinityMobile.percentDiscount)) / 100;
            return {
                ...prevValues,
                affinityMobile: {
                    ...prevValues.affinityMobile,
                    discountItemcost: itemcost.toFixed(2),
                    discountAmount: amount.toFixed(2),
                },
            }
        })
    }, [affinityMobile.cost, affinityMobile.percentDiscount, setUpfrontCost])


    //useEffect for column Cost for lexisSettleAdjuster row 
    React.useEffect(() => {
        if (clientProfile.country === '' || optionalServices.settlementAdjuster.include !== 'Yes') {
            setUpfrontCost((prevValues) => ({
                ...prevValues,
                lexisSettleAdjuster: {
                    ...prevValues.lexisSettleAdjuster,
                    cost: 0,
                },
            }))
        }
        // we are setting this value in optionalServicesLogic file for settlement adjuster popup yes

    }, [optionalServices.settlementAdjuster.include, productInfos, clientProfile.country, setUpfrontCost])

    //useEffect for 2 column discountItemcost, discountAmount for lexisSettleAdjuster row 
    React.useEffect(() => {
        setUpfrontCost((prevValues) => {
            const itemcost = Number(prevValues.lexisSettleAdjuster.cost) -
                (Number(prevValues.lexisSettleAdjuster.cost) * Number(prevValues.lexisSettleAdjuster.percentDiscount)) / 100;
            const amount = (Number(prevValues.lexisSettleAdjuster.cost) * Number(prevValues.lexisSettleAdjuster.percentDiscount)) / 100;
            return {
                ...prevValues,
                lexisSettleAdjuster: {
                    ...prevValues.lexisSettleAdjuster,
                    discountItemcost: itemcost.toFixed(2),
                    discountAmount: amount.toFixed(2),
                },
            }
        })
    }, [lexisSettleAdjuster.cost, lexisSettleAdjuster.percentDiscount, setUpfrontCost])

    //useEffect for column Cost for twoWayMicrosoft row 
    React.useEffect(() => {
        if (clientProfile.country === '' || optionalServices.exchangeIntegration.include !== 'Yes') {
            setUpfrontCost((prevValues) => ({
                ...prevValues,
                twoWayMicrosoft: {
                    ...prevValues.twoWayMicrosoft,
                    cost: 0,
                },
            }))
        }
        else {
            if (productInfos["1532492"]) {
                setUpfrontCost((prevValues) => ({
                    ...prevValues,
                    twoWayMicrosoft: {
                        ...prevValues.twoWayMicrosoft,
                        cost: (Number(productInfos["1532492"][clientProfile.country]) *
                            optionalServices.exchangeIntegration.totalHrs).toFixed(2),
                    },
                }))
            }
        }

    }, [optionalServices.exchangeIntegration.include, optionalServices.exchangeIntegration.totalHrs,
        productInfos, clientProfile.country, setUpfrontCost])

    //useEffect for 2 column discountItemcost, discountAmount for twoWayMicrosoft row 
    React.useEffect(() => {
        setUpfrontCost((prevValues) => {
            const itemcost = Number(prevValues.twoWayMicrosoft.cost) -
                (Number(prevValues.twoWayMicrosoft.cost) * Number(prevValues.twoWayMicrosoft.percentDiscount)) / 100;
            const amount = (Number(prevValues.twoWayMicrosoft.cost) * Number(prevValues.twoWayMicrosoft.percentDiscount)) / 100;
            return {
                ...prevValues,
                twoWayMicrosoft: {
                    ...prevValues.twoWayMicrosoft,
                    discountItemcost: itemcost.toFixed(2),
                    discountAmount: amount.toFixed(2),
                },
            }
        })
    }, [twoWayMicrosoft.cost, twoWayMicrosoft.percentDiscount, setUpfrontCost])

    //useEffect for 2 column discountItemcost, discountAmount for empower row 
    React.useEffect(() => {
        setUpfrontCost((prevValues) => {
            const itemcost = Number(prevValues.empower.cost) -
                (Number(prevValues.empower.cost) * Number(prevValues.empower.percentDiscount)) / 100;
            const amount = (Number(prevValues.empower.cost) * Number(prevValues.empower.percentDiscount)) / 100;
            return {
                ...prevValues,
                empower: {
                    ...prevValues.empower,
                    discountItemcost: itemcost.toFixed(2),
                    discountAmount: amount.toFixed(2),
                },
            }
        })
    }, [empower.cost, empower.percentDiscount, setUpfrontCost])

    //useEffect for column Cost for softDocs row 
    React.useEffect(() => {
        if (clientProfile.country === '' || optionalServices.softdocsIntegration.include !== 'Yes') {
            setUpfrontCost((prevValues) => ({
                ...prevValues,
                softDocs: {
                    ...prevValues.softDocs,
                    cost: 0,
                },
            }))
        }
        else {
            if (productInfos["1533058"]) { // check if productid exists like if(productInfos["1532486"])
                setUpfrontCost((prevValues) => ({
                    ...prevValues,
                    softDocs: {
                        ...prevValues.softDocs,
                        cost: productInfos["1533058"][clientProfile.country],
                    },
                }))
            }

        }

    }, [optionalServices.softdocsIntegration.include, productInfos, clientProfile.country, setUpfrontCost])

    //useEffect for 2 column discountItemcost, discountAmount for softDocs row 
    React.useEffect(() => {
        setUpfrontCost((prevValues) => {
            const itemcost = Number(prevValues.softDocs.cost) -
                (Number(prevValues.softDocs.cost) * Number(prevValues.softDocs.percentDiscount)) / 100;
            const amount = (Number(prevValues.softDocs.cost) * Number(prevValues.softDocs.percentDiscount)) / 100;
            return {
                ...prevValues,
                softDocs: {
                    ...prevValues.softDocs,
                    discountItemcost: itemcost.toFixed(2),
                    discountAmount: amount.toFixed(2),
                },
            }
        })
    }, [softDocs.cost, softDocs.percentDiscount, setUpfrontCost])

    //useEffect for column Cost for ImplementServices row 
    React.useEffect(() => {
        if (clientProfile.country === '') {
            setUpfrontCost((prevValues) => ({
                ...prevValues,
                ImplementServices: {
                    ...prevValues.ImplementServices,
                    cost: 0,
                },
            }))
        }
        else {
            if (productInfos["1532492"]) { // check if productid exists like if(productInfos["1532492"])
                setUpfrontCost((prevValues) => {
                    const value = Number(optionalServices.grandTotalHours.PM) + Number(optionalServices.grandTotalHours.TSG) +
                        Number(optionalServices.grandTotalHours.accountsConsulting) + Number(optionalServices.grandTotalHours.BPAConsulting) -
                        Number(defaultServicesValues.reconcileTakeUp.accountsConsulting) - Number(optionalServices.BPAGoLive.BPAConsulting) -
                        Number(optionalServices.exchangeIntegration.totalHrs);

                    return {
                        ...prevValues,
                        ImplementServices: {
                            ...prevValues.ImplementServices,
                            cost: (Number(productInfos["1532492"][clientProfile.country]) * value).toFixed(2),
                        },
                    }
                })
            }
        }
    }, [optionalServices.grandTotalHours.PM, optionalServices.grandTotalHours.TSG,
    optionalServices.grandTotalHours.accountsConsulting, optionalServices.grandTotalHours.BPAConsulting,
    optionalServices.BPAGoLive.BPAConsulting, defaultServicesValues.reconcileTakeUp.accountsConsulting,
    optionalServices.exchangeIntegration.totalHrs, productInfos, clientProfile.country, setUpfrontCost])

    //useEffect for 2 column discountItemcost, discountAmount for ImplementServices row 
    React.useEffect(() => {
        setUpfrontCost((prevValues) => {
            const itemcost = Number(prevValues.ImplementServices.cost) -
                (Number(prevValues.ImplementServices.cost) * Number(prevValues.ImplementServices.percentDiscount)) / 100;
            const amount = (Number(prevValues.ImplementServices.cost) * Number(prevValues.ImplementServices.percentDiscount)) / 100;
            return {
                ...prevValues,
                ImplementServices: {
                    ...prevValues.ImplementServices,
                    discountItemcost: itemcost.toFixed(2),
                    discountAmount: amount.toFixed(2),
                },
            }
        })
    }, [ImplementServices.cost, ImplementServices.percentDiscount, setUpfrontCost])

    //useEffect for column Cost for ImplementTraning row 
    React.useEffect(() => {
        //this logic is written in different way than mentioned in doc and it is taken by java project, for clarity you may refer to "hoila de silva.xls" doc or ask rahul sir
        if (clientProfile.country === '') {
            setUpfrontCost((prevValues) => ({
                ...prevValues,
                ImplementTraning: {
                    ...prevValues.ImplementTraning,
                    cost: 0,
                },
            }))
        }
        else {
            let hourseut = 0, hoursbpaeut = 0;
            if (Info.traningMethod === 'End User Training' && daysValues.halfDay) {
                hourseut = Math.ceil(Number(attendingCourses.endUserAccount) / 6) * daysValues.halfDay;
                hoursbpaeut = Math.ceil(Number(attendingCourses.endUserBPA) / 6) * 3;
            }
            else if (Info.traningMethod === 'Train the Trainer' && daysValues.twoDay && daysValues.oneDay) {
                hourseut = daysValues.twoDay;
                hoursbpaeut = daysValues.oneDay;
            }

            const TrainingHrsAccnt = Number(optionalServices.grandTotalHours.accountsTraining); //This is Grand Total of OptionalServices Acct.Trainings
            const TrainingHrsBPA = Number(optionalServices.grandTotalHours.BPATraining);
            let res = TrainingHrsAccnt + TrainingHrsBPA;
            let res1 = hourseut + hoursbpaeut;
            let totalres = Math.abs(res - res1); //Implementation of (TrainingHrsAccounts-HoursEUT+TrainingHrsBPA-HoursBPAEUT)

            //row 14(B14 & C14) formulae implementation\
            let b14 = 0, c14 = 0, b15 = 0, c15 = 0;
            if (optionalServices.BPAEndUser.include === 'Yes' &&
                productInfos["1532493"] && daysValues.oneDay && daysValues.twoDay) {
                b14 = Number(attendingCourses.endUserAccount) * Number(productInfos["1532493"][clientProfile.country]);
                c14 = daysValues.twoDay * Number(productInfos["1532493"][clientProfile.country]);
                b15 = Number(attendingCourses.endUserBPA) * Number(productInfos["1532493"][clientProfile.country]);
                c15 = daysValues.oneDay * Number(productInfos["1532493"][clientProfile.country]);
            }

            let costEUT = 0;
            if (Info.traningMethod === 'End User Training') {
                costEUT = b14 + b15;
            }
            else if (Info.traningMethod === 'Train the Trainer') {
                costEUT = c14 + c15;
            }

            let costTotal = 0;
            if (productInfos["1532493"]) {
                costTotal = totalres * Number(productInfos["1532493"][clientProfile.country]) + costEUT;
            }

            setUpfrontCost((prevValues) => ({
                ...prevValues,
                ImplementTraning: {
                    ...prevValues.ImplementTraning,
                    cost: costTotal.toFixed(2),
                },
            }))
        }
    }, [productInfos, Info.traningMethod, attendingCourses, clientProfile.country,
        optionalServices.grandTotalHours.accountsTraining, optionalServices.grandTotalHours.BPATraining,
        optionalServices.BPAEndUser.include,
        daysValues, setUpfrontCost])

    //useEffect for 2 column discountItemcost, discountAmount for ImplementTraning row 
    React.useEffect(() => {
        setUpfrontCost((prevValues) => {
            const itemcost = Number(prevValues.ImplementTraning.cost) -
                (Number(prevValues.ImplementTraning.cost) * Number(prevValues.ImplementTraning.percentDiscount)) / 100;
            const amount = (Number(prevValues.ImplementTraning.cost) * Number(prevValues.ImplementTraning.percentDiscount)) / 100;
            return {
                ...prevValues,
                ImplementTraning: {
                    ...prevValues.ImplementTraning,
                    discountItemcost: itemcost.toFixed(2),
                    discountAmount: amount.toFixed(2),
                },
            }
        })
    }, [ImplementTraning.cost, ImplementTraning.percentDiscount, setUpfrontCost])

    //useEffect for column Cost for postImplementation row 
    React.useEffect(() => {
        if (clientProfile.country === '') {
            setUpfrontCost((prevValues) => ({
                ...prevValues,
                postImplementation: {
                    ...prevValues.postImplementation,
                    cost: 0,
                },
            }))
        }
        else {
            if (productInfos["1532492"]) {
                setUpfrontCost((prevValues) => ({
                    ...prevValues,
                    postImplementation: {
                        ...prevValues.postImplementation,
                        cost: ((Number(optionalServices.BPAGoLive.BPAConsulting) +
                            Number(defaultServicesValues.reconcileTakeUp.accountsConsulting)) *
                            Number(productInfos["1532492"][clientProfile.country])).toFixed(2),
                    },
                }))
            }
        }
    }, [productInfos, clientProfile.country, optionalServices.BPAGoLive.BPAConsulting,
        defaultServicesValues.reconcileTakeUp.accountsConsulting, setUpfrontCost])

    //useEffect for 2 column discountItemcost, discountAmount for postImplementation row 
    React.useEffect(() => {
        setUpfrontCost((prevValues) => {
            const itemcost = Number(prevValues.postImplementation.cost) -
                (Number(prevValues.postImplementation.cost) * Number(prevValues.postImplementation.percentDiscount)) / 100;
            const amount = (Number(prevValues.postImplementation.cost) * Number(prevValues.postImplementation.percentDiscount)) / 100;
            return {
                ...prevValues,
                postImplementation: {
                    ...prevValues.postImplementation,
                    discountItemcost: itemcost.toFixed(2),
                    discountAmount: amount.toFixed(2),
                },
            }
        })
    }, [postImplementation.cost, postImplementation.percentDiscount, setUpfrontCost])

    // dataMigration cost is in optional services file
    //useEffect for 2 column discountItemcost, discountAmount for dataMigration row 
    React.useEffect(() => {
        setUpfrontCost((prevValues) => {
            const itemcost = Number(prevValues.dataMigration.cost) -
                (Number(prevValues.dataMigration.cost) * Number(prevValues.dataMigration.percentDiscount)) / 100;
            const amount = (Number(prevValues.dataMigration.cost) * Number(prevValues.dataMigration.percentDiscount)) / 100;
            return {
                ...prevValues,
                dataMigration: {
                    ...prevValues.dataMigration,
                    discountItemcost: itemcost.toFixed(2),
                    discountAmount: amount.toFixed(2),
                },
            }
        })
    }, [dataMigration.cost, dataMigration.percentDiscount, setUpfrontCost])


    //useEffect for column Cost for travelAllowance row 
    React.useEffect(() => {
        if (clientProfile.country === '' || Info.timeIncluded !== 'Yes') {
            setUpfrontCost((prevValues) => ({
                ...prevValues,
                travelAllowance: {
                    ...prevValues.travelAllowance,
                    cost: 0,
                },
            }))
        }
        else {
            if (productInfos["1532492"]) { // check if productid exists like if(productInfos["1532486"])
                setUpfrontCost((prevValues) => ({
                    ...prevValues,
                    travelAllowance: {
                        ...prevValues.travelAllowance,
                        cost: (Number(optionalServices.grandTotalHours.travel) *
                            Number(productInfos["1532492"][clientProfile.country])).toFixed(2),
                    },
                }))
            }
        }
    }, [Info.timeIncluded, productInfos, optionalServices.grandTotalHours.travel,
    clientProfile.country, setUpfrontCost])

    //useEffect for 2 column discountItemcost, discountAmount for travelAllowance row 
    React.useEffect(() => {
        setUpfrontCost((prevValues) => {
            const itemcost = Number(prevValues.travelAllowance.cost) -
                (Number(prevValues.travelAllowance.cost) * Number(prevValues.travelAllowance.percentDiscount)) / 100;
            const amount = (Number(prevValues.travelAllowance.cost) * Number(prevValues.travelAllowance.percentDiscount)) / 100;
            return {
                ...prevValues,
                travelAllowance: {
                    ...prevValues.travelAllowance,
                    discountItemcost: itemcost.toFixed(2),
                    discountAmount: amount.toFixed(2),
                },
            }
        })
    }, [travelAllowance.cost, travelAllowance.percentDiscount, setUpfrontCost])


    //useEffect for column Cost for scopingStudy row 
    React.useEffect(() => {
        if (clientProfile.country === '' || miscellaneous.scopingStudy.included !== 'Yes') {
            setUpfrontCost((prevValues) => ({
                ...prevValues,
                scopingStudy: {
                    ...prevValues.scopingStudy,
                    cost: 0,
                },
            }))
        }
        else {
            if (true) { // check if productid exists like if(productInfos["1532486"])
                setUpfrontCost((prevValues) => ({
                    ...prevValues,
                    scopingStudy: {
                        ...prevValues.scopingStudy,
                        cost: Number(miscellaneous.scopingStudy.price),
                    },
                }))
            }

        }

    }, [miscellaneous.scopingStudy.included, miscellaneous.scopingStudy.price,
        productInfos, clientProfile.country, setUpfrontCost])

    //useEffect for 2 column discountItemcost, discountAmount for scopingStudy row 
    React.useEffect(() => {
        setUpfrontCost((prevValues) => {
            const itemcost = Number(prevValues.scopingStudy.cost) -
                (Number(prevValues.scopingStudy.cost) * Number(prevValues.scopingStudy.percentDiscount)) / 100;
            const amount = (Number(prevValues.scopingStudy.cost) * Number(prevValues.scopingStudy.percentDiscount)) / 100;
            return {
                ...prevValues,
                scopingStudy: {
                    ...prevValues.scopingStudy,
                    discountItemcost: itemcost.toFixed(2),
                    discountAmount: amount.toFixed(2),
                },
            }
        })
    }, [scopingStudy.cost, scopingStudy.percentDiscount, setUpfrontCost])

    //useEffect for column Cost for propertyPrecedent row 
    React.useEffect(() => {
        setUpfrontCost((prevValues) => ({
            ...prevValues,
            propertyPrecedent: {
                ...prevValues.propertyPrecedent,
                cost: Number(miscellaneous.propertyPresidency.price).toFixed(2),
            },
        }))
    }, [miscellaneous.propertyPresidency.price, setUpfrontCost])

    //useEffect for 2 column discountItemcost, discountAmount for propertyPrecedent row 
    React.useEffect(() => {
        setUpfrontCost((prevValues) => {
            const itemcost = Number(prevValues.propertyPrecedent.cost) -
                (Number(prevValues.propertyPrecedent.cost) * Number(prevValues.propertyPrecedent.percentDiscount)) / 100;
            const amount = (Number(prevValues.propertyPrecedent.cost) * Number(prevValues.propertyPrecedent.percentDiscount)) / 100;
            return {
                ...prevValues,
                propertyPrecedent: {
                    ...prevValues.propertyPrecedent,
                    discountItemcost: itemcost.toFixed(2),
                    discountAmount: amount.toFixed(2),
                },
            }
        })
    }, [propertyPrecedent.cost, propertyPrecedent.percentDiscount, setUpfrontCost])


    // useEffect for cost for subTotal
    React.useEffect(() => {
        setUpfrontCost((prevValues) => {
            const cost = Number(prevValues.lexisServerLicense.cost) + Number(prevValues.lexisUserLicense.cost) +
                Number(prevValues.oracleLicenses.cost) + Number(prevValues.clientPortal.cost) +
                Number(prevValues.affinityMobile.cost) + Number(prevValues.lexisSettleAdjuster.cost) +
                Number(prevValues.twoWayMicrosoft.cost) + Number(prevValues.empower.cost) +
                Number(prevValues.softDocs.cost) + Number(prevValues.ImplementServices.cost) +
                Number(prevValues.ImplementTraning.cost) + Number(prevValues.postImplementation.cost) +
                Number(prevValues.dataMigration.cost) + Number(prevValues.travelAllowance.cost) +
                Number(prevValues.scopingStudy.cost) + Number(prevValues.propertyPrecedent.cost);

            return {
                ...prevValues,
                subTotal: {
                    ...prevValues.subTotal,
                    cost: cost.toFixed(2),
                },
            }
        })
    }, [lexisServerLicense.cost, lexisUserLicense.cost, oracleLicenses.cost, clientPortal.cost,
    affinityMobile.cost, lexisSettleAdjuster.cost, twoWayMicrosoft.cost,
    empower.cost, softDocs.cost, ImplementServices.cost, ImplementTraning.cost,
    postImplementation.cost, dataMigration.cost, travelAllowance.cost,
    scopingStudy.cost, propertyPrecedent.cost, setUpfrontCost])


    // useEffect for discountItemcost for subTotal, cost for totalInvesteExcl
    React.useEffect(() => {
        setUpfrontCost((prevValues) => {
            let cost = Number(prevValues.lexisServerLicense.discountItemcost) + Number(prevValues.lexisUserLicense.discountItemcost) +
                Number(prevValues.oracleLicenses.discountItemcost) + Number(prevValues.clientPortal.discountItemcost) +
                Number(prevValues.affinityMobile.discountItemcost) + Number(prevValues.lexisSettleAdjuster.discountItemcost) +
                Number(prevValues.twoWayMicrosoft.discountItemcost) + Number(prevValues.empower.discountItemcost) +
                Number(prevValues.softDocs.discountItemcost) + Number(prevValues.ImplementServices.discountItemcost) +
                Number(prevValues.ImplementTraning.discountItemcost) + Number(prevValues.postImplementation.discountItemcost) +
                Number(prevValues.dataMigration.discountItemcost) + Number(prevValues.travelAllowance.discountItemcost) +
                Number(prevValues.scopingStudy.discountItemcost) + Number(prevValues.propertyPrecedent.discountItemcost);

            return {
                ...prevValues,
                subTotal: {
                    ...prevValues.subTotal,
                    discountItemcost: cost.toFixed(2),
                },
                totalInvesteExcl: {
                    ...prevValues.totalInvesteExcl,
                    cost: cost.toFixed(2),
                },
            }
        })
    }, [lexisServerLicense.discountItemcost, lexisUserLicense.discountItemcost, oracleLicenses.discountItemcost,
    clientPortal.discountItemcost, affinityMobile.discountItemcost, lexisSettleAdjuster.discountItemcost,
    twoWayMicrosoft.discountItemcost, empower.discountItemcost, softDocs.discountItemcost, ImplementServices.discountItemcost,
    ImplementTraning.discountItemcost, postImplementation.discountItemcost, dataMigration.discountItemcost, travelAllowance.discountItemcost,
    scopingStudy.discountItemcost, propertyPrecedent.discountItemcost, setUpfrontCost])


    // useEffect for discountAmount for subTotal, cost for lessConfidential
    React.useEffect(() => {
        setUpfrontCost((prevValues) => {
            let amount = Number(prevValues.lexisServerLicense.discountAmount) + Number(prevValues.lexisUserLicense.discountAmount) +
                Number(prevValues.oracleLicenses.discountAmount) + Number(prevValues.clientPortal.discountAmount) +
                Number(prevValues.affinityMobile.discountAmount) + Number(prevValues.lexisSettleAdjuster.discountAmount) +
                Number(prevValues.twoWayMicrosoft.discountAmount) + Number(prevValues.empower.discountAmount) +
                Number(prevValues.softDocs.discountAmount) + Number(prevValues.ImplementServices.discountAmount) +
                Number(prevValues.ImplementTraning.discountAmount) + Number(prevValues.postImplementation.discountAmount) +
                Number(prevValues.dataMigration.discountAmount) + Number(prevValues.travelAllowance.discountAmount) +
                Number(prevValues.scopingStudy.discountAmount) + Number(prevValues.propertyPrecedent.discountAmount);

            return {
                ...prevValues,
                subTotal: {
                    ...prevValues.subTotal,
                    discountAmount: amount.toFixed(2),
                },
                lessConfidential: {
                    ...prevValues.lessConfidential,
                    cost: amount.toFixed(2),
                },
            }
        })
    }, [lexisServerLicense.discountAmount, lexisUserLicense.discountAmount, oracleLicenses.discountAmount,
    clientPortal.discountAmount, affinityMobile.discountAmount, lexisSettleAdjuster.discountAmount,
    twoWayMicrosoft.discountAmount, empower.discountAmount, softDocs.discountAmount,
    ImplementServices.discountAmount, ImplementTraning.discountAmount, postImplementation.discountAmount,
    dataMigration.discountAmount, travelAllowance.discountAmount, scopingStudy.discountAmount,
    propertyPrecedent.discountAmount, setUpfrontCost])

    //useeffect for percent discount for subtotal
    React.useEffect(() => {
        setUpfrontCost((prevValues) => {
            const discount = (Number(prevValues.subTotal.discountAmount) /
                Number(prevValues.subTotal.cost)) * 100;
            return {
                ...prevValues,
                subTotal: {
                    ...prevValues.subTotal,
                    percentDiscount: isFinite(discount) ? discount.toFixed(2) : 0,
                },
            }
        })
    }, [subTotal.cost, subTotal.discountAmount, setUpfrontCost])

    const [allCountryGST, setAllCountryGST] = React.useState([]);
    // use effect for fetching all countriesg gst
    React.useEffect(() => {
        const fetchData = async () => {
            const gst = await getGSTPercentagesAPI();
            // console.log(gst,'GST');
            if (gst.status !== 200) {
                console.log('getGSTPercentagesAPI not working');
            }
            else {
                if (gst.data.length > 0) {
                    setAllCountryGST(gst.data);
                }
            }
        }
        fetchData();
    }, [])

    // useeffect for changing country gst value
    const [countryGST, setCountryGST] = React.useState(0);
    React.useEffect(() => {
        if (clientProfile.country !== '') {
            const country = allCountryGST.filter(country => country.country_name === clientProfile.country)
            // console.log(country[0].gst_percentage, 'country gst')
            if (country.length > 0) {
                setCountryGST(country[0].gst_percentage);
            }
        }
        else {
            setCountryGST(0);
        }
    }, [clientProfile.country, allCountryGST])

    // useeffect for label for GSTPayable
    React.useEffect(() => {
        setUpfrontCost((prevValues) => ({
            ...prevValues,
            GSTPayable: {
                ...prevValues.GSTPayable,
                label: `GST Payable ${countryGST}%`,
            },
        }))
    }, [countryGST, setUpfrontCost])

    // useeffect for cost for GSTPayable
    React.useEffect(() => {
        setUpfrontCost((prevValues) => {
            const cost = (Number(prevValues.totalInvesteExcl.cost) * Number(countryGST)) / 100;
            return {
                ...prevValues,
                GSTPayable: {
                    ...prevValues.GSTPayable,
                    cost: cost.toFixed(2),
                },
            }
        })
    }, [totalInvesteExcl.cost, countryGST, setUpfrontCost])

    // useeffect for cost for totalInvestePay
    React.useEffect(() => {
        setUpfrontCost((prevValues) => {
            const cost = Number(prevValues.totalInvesteExcl.cost) + Number(prevValues.GSTPayable.cost);
            return {
                ...prevValues,
                totalInvestePay: {
                    ...prevValues.totalInvestePay,
                    cost: cost.toFixed(2),
                },
            }
        })
    }, [totalInvesteExcl.cost, GSTPayable.cost, setUpfrontCost])

    // useEffect for cost for totalPerUser
    React.useEffect(() => {
        setUpfrontCost((prevValues) => {
            const cost = Number(prevValues.totalInvestePay.cost) / Number(clientProfile.numOfUsers);
            return {
                ...prevValues,
                totalPerUser: {
                    ...prevValues.totalPerUser,
                    cost: isFinite(cost) ? cost.toFixed(2) : 0,
                },
            }
        })
    }, [totalInvestePay.cost, clientProfile.numOfUsers, setUpfrontCost])

    return null;
}

export default UpfrontCostLogic;
