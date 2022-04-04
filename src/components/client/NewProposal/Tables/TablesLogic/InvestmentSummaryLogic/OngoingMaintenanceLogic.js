import React from 'react';
import getGSTPercentagesAPI from '../../../../../../apis/client/getGSTPercentagesAPI.js';

function OngoingMaintenanceLogic(props) {

    const { clientProfile, ongoingMnt, setOngoingMnt, upfrontCost,
        miscellaneous, affinityServerPopupValues } = props;

    const { annualAffinity, annualOracleCare, annualAffinityMobile, annualClient,
        annualEmpower, annualSoftDocs, annualSettlement, subTotal,
        totalMntExclGST, GSTPayable, totalMntAnnual, totalMntMonthly
    } = ongoingMnt;


    // useEffect for cost for annualAffinity
    React.useEffect(() => {
        const cost = (Number(upfrontCost.lexisServerLicense.cost) + Number(upfrontCost.lexisUserLicense.cost)) * 0.25;
        setOngoingMnt((prevValues) => ({
            ...prevValues,
            annualAffinity: {
                ...prevValues.annualAffinity,
                cost: cost.toFixed(2),
            },
        }))
    }, [upfrontCost.lexisServerLicense.cost, upfrontCost.lexisUserLicense.cost, setOngoingMnt])

    // useEffect for discountItemcost, discountAmount for annualAffinity
    React.useEffect(() => {
        setOngoingMnt((prevValues) => {
            const itemcost = Number(prevValues.annualAffinity.cost) -
                (Number(prevValues.annualAffinity.cost) * Number(prevValues.annualAffinity.percentDiscount)) / 100;
            const amount = (Number(prevValues.annualAffinity.cost) * Number(prevValues.annualAffinity.percentDiscount)) / 100;
            return {
                ...prevValues,
                annualAffinity: {
                    ...prevValues.annualAffinity,
                    discountItemcost: itemcost.toFixed(2),
                    discountAmount: amount.toFixed(2),
                },
            }
        })
    }, [annualAffinity.cost, annualAffinity.percentDiscount, setOngoingMnt])

    // useEffect for cost for annualOracleCare
    React.useEffect(() => {
        if (miscellaneous.affinityServer.included === '') {
            setOngoingMnt((prevValues) => ({
                ...prevValues,
                annualOracleCare: {
                    ...prevValues.annualOracleCare,
                    cost: 0,
                },
            }))
        }
        else {
        setOngoingMnt((prevValues) => ({
            ...prevValues,
            annualOracleCare: {
                ...prevValues.annualOracleCare,
                cost: Number(affinityServerPopupValues.maintenance).toFixed(2),
            },
        }))
        }
    }, [miscellaneous.affinityServer.included, affinityServerPopupValues, setOngoingMnt])

    // useEffect for discountItemcost, discountAmount for annualOracleCare
    React.useEffect(() => {
        setOngoingMnt((prevValues) => {
            const itemcost = Number(prevValues.annualOracleCare.cost) -
                (Number(prevValues.annualOracleCare.cost) * Number(prevValues.annualOracleCare.percentDiscount)) / 100;
            const amount = (Number(prevValues.annualOracleCare.cost) * Number(prevValues.annualOracleCare.percentDiscount)) / 100;
            return {
                ...prevValues,
                annualOracleCare: {
                    ...prevValues.annualOracleCare,
                    discountItemcost: itemcost.toFixed(2),
                    discountAmount: amount.toFixed(2),
                },
            }
        })
    }, [annualOracleCare.cost, annualOracleCare.percentDiscount, setOngoingMnt])

    // useEffect for cost for annualAffinityMobile
    React.useEffect(() => {
        const cost = Number(upfrontCost.affinityMobile.cost) * 0.25;
        setOngoingMnt((prevValues) => ({
            ...prevValues,
            annualAffinityMobile: {
                ...prevValues.annualAffinityMobile,
                cost: cost.toFixed(2),
            },
        }))
    }, [upfrontCost.affinityMobile.cost, setOngoingMnt])

    // useEffect for discountItemcost, discountAmount for annualAffinityMobile
    React.useEffect(() => {
        setOngoingMnt((prevValues) => {
            const itemcost = Number(prevValues.annualAffinityMobile.cost) -
                (Number(prevValues.annualAffinityMobile.cost) * Number(prevValues.annualAffinityMobile.percentDiscount)) / 100;
            const amount = (Number(prevValues.annualAffinityMobile.cost) * Number(prevValues.annualAffinityMobile.percentDiscount)) / 100;
            return {
                ...prevValues,
                annualAffinityMobile: {
                    ...prevValues.annualAffinityMobile,
                    discountItemcost: itemcost.toFixed(2),
                    discountAmount: amount.toFixed(2),
                },
            }
        })
    }, [annualAffinityMobile.cost, annualAffinityMobile.percentDiscount, setOngoingMnt])

    // useEffect for cost for annualClient
    React.useEffect(() => {
        const cost = Number(upfrontCost.clientPortal.cost) * 0.25;
        setOngoingMnt((prevValues) => ({
            ...prevValues,
            annualClient: {
                ...prevValues.annualClient,
                cost: cost.toFixed(2),
            },
        }))
    }, [upfrontCost.clientPortal.cost, setOngoingMnt])

    // useEffect for discountItemcost, discountAmount for annualClient
    React.useEffect(() => {
        setOngoingMnt((prevValues) => {
            const itemcost = Number(prevValues.annualClient.cost) -
                (Number(prevValues.annualClient.cost) * Number(prevValues.annualClient.percentDiscount)) / 100;
            const amount = (Number(prevValues.annualClient.cost) * Number(prevValues.annualClient.percentDiscount)) / 100;
            return {
                ...prevValues,
                annualClient: {
                    ...prevValues.annualClient,
                    discountItemcost: itemcost.toFixed(2),
                    discountAmount: amount.toFixed(2),
                },
            }
        })
    }, [annualClient.cost, annualClient.percentDiscount, setOngoingMnt])

    // useEffect for cost for annualEmpower
    React.useEffect(() => {
        const cost = Number(upfrontCost.empower.cost) * 0.25;
        setOngoingMnt((prevValues) => ({
            ...prevValues,
            annualEmpower: {
                ...prevValues.annualEmpower,
                cost: cost.toFixed(2),
            },
        }))
    }, [upfrontCost.empower.cost, setOngoingMnt])

    // useEffect for discountItemcost, discountAmount for annualEmpower
    React.useEffect(() => {
        setOngoingMnt((prevValues) => {
            const itemcost = Number(prevValues.annualEmpower.cost) -
                (Number(prevValues.annualEmpower.cost) * Number(prevValues.annualEmpower.percentDiscount)) / 100;
            const amount = (Number(prevValues.annualEmpower.cost) * Number(prevValues.annualEmpower.percentDiscount)) / 100;
            return {
                ...prevValues,
                annualEmpower: {
                    ...prevValues.annualEmpower,
                    discountItemcost: itemcost.toFixed(2),
                    discountAmount: amount.toFixed(2),
                },
            }
        })
    }, [annualEmpower.cost, annualEmpower.percentDiscount, setOngoingMnt])

    // useEffect for cost for annualSoftDocs
    React.useEffect(() => {
        const cost = Number(upfrontCost.softDocs.cost) * 0.25;
        setOngoingMnt((prevValues) => ({
            ...prevValues,
            annualSoftDocs: {
                ...prevValues.annualSoftDocs,
                cost: cost.toFixed(2),
            },
        }))
    }, [upfrontCost.softDocs.cost, setOngoingMnt])

    // useEffect for discountItemcost, discountAmount for annualSoftDocs
    React.useEffect(() => {
        setOngoingMnt((prevValues) => {
            const itemcost = Number(prevValues.annualSoftDocs.cost) -
                (Number(prevValues.annualSoftDocs.cost) * Number(prevValues.annualSoftDocs.percentDiscount)) / 100;
            const amount = (Number(prevValues.annualSoftDocs.cost) * Number(prevValues.annualSoftDocs.percentDiscount)) / 100;
            return {
                ...prevValues,
                annualSoftDocs: {
                    ...prevValues.annualSoftDocs,
                    discountItemcost: itemcost.toFixed(2),
                    discountAmount: amount.toFixed(2),
                },
            }
        })
    }, [annualSoftDocs.cost, annualSoftDocs.percentDiscount, setOngoingMnt])

    // useEffect for cost for annualSettlement
    React.useEffect(() => {
        const cost = Number(upfrontCost.lexisSettleAdjuster.cost) * 0.25;
        setOngoingMnt((prevValues) => ({
            ...prevValues,
            annualSettlement: {
                ...prevValues.annualSettlement,
                cost: cost.toFixed(2),
            },
        }))
    }, [upfrontCost.lexisSettleAdjuster.cost, setOngoingMnt])

    // useEffect for discountItemcost, discountAmount for annualSettlement
    React.useEffect(() => {
        setOngoingMnt((prevValues) => {
            const itemcost = Number(prevValues.annualSettlement.cost) -
                (Number(prevValues.annualSettlement.cost) * Number(prevValues.annualSettlement.percentDiscount)) / 100;
            const amount = (Number(prevValues.annualSettlement.cost) * Number(prevValues.annualSettlement.percentDiscount)) / 100;
            return {
                ...prevValues,
                annualSettlement: {
                    ...prevValues.annualSettlement,
                    discountItemcost: itemcost.toFixed(2),
                    discountAmount: amount.toFixed(2),
                },
            }
        })
    }, [annualSettlement.cost, annualSettlement.percentDiscount, setOngoingMnt])

    // useEffect for cost for subTotal
    React.useEffect(() => {
        setOngoingMnt((prevValues) => {
            const cost = Number(prevValues.annualAffinity.cost) + Number(prevValues.annualOracleCare.cost) +
                Number(prevValues.annualAffinityMobile.cost) + Number(prevValues.annualClient.cost) +
                Number(prevValues.annualEmpower.cost) + Number(prevValues.annualSoftDocs.cost) +
                Number(prevValues.annualSettlement.cost);

            return {
                ...prevValues,
                subTotal: {
                    ...prevValues.subTotal,
                    cost: cost.toFixed(2),
                },
            }
        })
    }, [annualAffinity.cost, annualOracleCare.cost, annualAffinityMobile.cost, annualClient.cost,
    annualEmpower.cost, annualSoftDocs.cost, annualSettlement.cost, setOngoingMnt])

    // useEffect for discountItemcost for subTotal, cost for totalMntExclGST
    React.useEffect(() => {
        setOngoingMnt((prevValues) => {
            let cost = Number(prevValues.annualAffinity.discountItemcost) + Number(prevValues.annualOracleCare.discountItemcost) +
                Number(prevValues.annualAffinityMobile.discountItemcost) + Number(prevValues.annualClient.discountItemcost) +
                Number(prevValues.annualEmpower.discountItemcost) + Number(prevValues.annualSoftDocs.discountItemcost) +
                Number(prevValues.annualSettlement.discountItemcost);

            // if (Number(prevValues.subTotal.percentDiscount) > 0) {
            //     cost = Number(prevValues.subTotal.cost) -
            //         (Number(prevValues.subTotal.cost) * Number(prevValues.subTotal.percentDiscount)) / 100;
            // }

            return {
                ...prevValues,
                subTotal: {
                    ...prevValues.subTotal,
                    discountItemcost: cost.toFixed(2),
                },
                totalMntExclGST: {
                    ...prevValues.totalMntExclGST,
                    cost: cost.toFixed(2),
                },
            }
        })
    }, [annualAffinity.discountItemcost, annualOracleCare.discountItemcost, annualAffinityMobile.discountItemcost, annualClient.discountItemcost,
    annualEmpower.discountItemcost, annualSoftDocs.discountItemcost, annualSettlement.discountItemcost, subTotal.percentDiscount, subTotal.cost, setOngoingMnt])

    // useEffect for discountAmount for subTotal, cost for lessConfidential
    React.useEffect(() => {
        setOngoingMnt((prevValues) => {
            let amount = Number(prevValues.annualAffinity.discountAmount) + Number(prevValues.annualOracleCare.discountAmount) +
                Number(prevValues.annualAffinityMobile.discountAmount) + Number(prevValues.annualClient.discountAmount) +
                Number(prevValues.annualEmpower.discountAmount) + Number(prevValues.annualSoftDocs.discountAmount) +
                Number(prevValues.annualSettlement.discountAmount);

            // if (Number(prevValues.subTotal.percentDiscount) > 0) {
            //     amount = (Number(prevValues.subTotal.cost) * Number(prevValues.subTotal.percentDiscount)) / 100;
            // }

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
    }, [annualAffinity.discountAmount, annualOracleCare.discountAmount, annualAffinityMobile.discountAmount, annualClient.discountAmount,
    annualEmpower.discountAmount, annualSoftDocs.discountAmount, annualSettlement.discountAmount, subTotal.percentDiscount, subTotal.cost, setOngoingMnt])

    //useeffect for percent discount for subtotal and cost
    React.useEffect(() => {
        setOngoingMnt((prevValues) => {
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
    }, [subTotal.cost, subTotal.discountAmount, setOngoingMnt])


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
                if (gst.data instanceof Array && gst.data.length > 0) {
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
        // console.log('gst payable label', countryGST)
        setOngoingMnt((prevValues) => ({
            ...prevValues,
            GSTPayable: {
                ...prevValues.GSTPayable,
                label: `GST Payable ${countryGST}%`,
            },
        }))
    }, [countryGST, setOngoingMnt])

    // useeffect for cost for GSTPayable
    React.useEffect(() => {
        setOngoingMnt((prevValues) => {
            const cost = (Number(prevValues.totalMntExclGST.cost) * Number(countryGST)) / 100;
            return {
                ...prevValues,
                GSTPayable: {
                    ...prevValues.GSTPayable,
                    cost: cost.toFixed(2),
                },
            }
        })
    }, [totalMntExclGST.cost, countryGST, setOngoingMnt])

    // useEffect for cost for totalMntAnnual
    React.useEffect(() => {
        setOngoingMnt((prevValues) => ({
            ...prevValues,
            totalMntAnnual: {
                ...prevValues.totalMntAnnual,
                cost: (Number(prevValues.totalMntExclGST.cost) + Number(prevValues.GSTPayable.cost)).toFixed(2),
            },
        }))
    }, [totalMntExclGST.cost, GSTPayable.cost, setOngoingMnt])

    // useEffect for cost for totalMntMonthly
    React.useEffect(() => {
        setOngoingMnt((prevValues) => {
            const cost = Number(prevValues.totalMntAnnual.cost) / 12;
            return {
                ...prevValues,
                totalMntMonthly: {
                    ...prevValues.totalMntMonthly,
                    cost: cost.toFixed(2),
                },
            }
        })
    }, [totalMntAnnual.cost, setOngoingMnt])

    // useEffect for cost for totalAnnualCost
    React.useEffect(() => {
        setOngoingMnt((prevValues) => {
            const cost = Number(prevValues.totalMntAnnual.cost) / Number(clientProfile.numOfUsers);
            return {
                ...prevValues,
                totalAnnualCost: {
                    ...prevValues.totalAnnualCost,
                    cost: isFinite(cost) ? cost.toFixed(2) : (0).toFixed(2),
                },
            }
        })
    }, [totalMntAnnual.cost, clientProfile.numOfUsers, setOngoingMnt])

    // useEffect for cost for totalCostMonth
    React.useEffect(() => {
        setOngoingMnt((prevValues) => {
            const cost = Number(prevValues.totalMntMonthly.cost) / Number(clientProfile.numOfUsers);
            return {
                ...prevValues,
                totalCostMonth: {
                    ...prevValues.totalCostMonth,
                    cost: isFinite(cost) ? cost.toFixed(2) : (0).toFixed(2),
                },
            }
        })
    }, [totalMntMonthly.cost, clientProfile.numOfUsers, setOngoingMnt])


    return null;
}

export default OngoingMaintenanceLogic;
