import React from 'react'
import getYearUpliftPercentAPI from '../../../../../../apis/client/getYearUpliftPercentAPI.js';

function RepaymentLogic(props) {

    const { clientProfile, upfrontCost, ongoingMnt, repaymentCalc, setRepaymentCalc
        , discountTable, setDiscountTable, } = props;

    const { totalsTable, mntTable, repayments } = repaymentCalc;

    const { software, services, sTotal, } = totalsTable;

    const { year1, year2, year3, year4, year5, mntTotal } = mntTable;

    const { softwareDis, serviceDis, lexisCareDis, totalDis } = discountTable;

    const { initPayment, month1, month2, month3, month4, month5,
        month6, month7, month8, month9, month10,
        month11, month12, month13, month14, month15, month16, month17,
        month18, month19, month20, month21, month22, month23, month24,
        month25, month26, month27, month28, month29, month30, month31,
        month32, month33, month34, month35, month36, month37, month38,
        month39, month40, month41, month42, month43, month44, month45,
        month46, month47, month48, month49, month50, month51, month52,
        month53, month54, month55, month56, month57, month58, month59,
        month60, } = repayments;

    // useEffect for payments for initPayment
    React.useEffect(() => {
        setRepaymentCalc((prevValues) => {
            if (Number(prevValues.totalsTable.sTotal.gcrmEntries) < Number(prevValues.repayments.initPayment.payments)) {
                return {
                    ...prevValues,
                    repayments: {
                        ...prevValues.repayments,
                        initPayment: {
                            ...prevValues.repayments.initPayment,
                            payments: 0
                        }
                    }
                }
            }
            else {
                return {
                    ...prevValues,
                    repayments: {
                        ...prevValues.repayments,
                        initPayment: {
                            ...prevValues.repayments.initPayment,
                            payments: prevValues.repayments.initPayment.payments,
                        }
                    }
                }
            }
        })

    }, [sTotal.gcrmEntries, setRepaymentCalc])

    // useEffect for cost for Software
    React.useEffect(() => {
        setRepaymentCalc((prevValues) => {
            const cost = Number(upfrontCost.lexisServerLicense.cost) + Number(upfrontCost.lexisUserLicense.cost) +
                Number(upfrontCost.oracleLicenses.cost) + Number(upfrontCost.clientPortal.cost) +
                Number(upfrontCost.affinityMobile.cost) + Number(upfrontCost.lexisSettleAdjuster.cost) +
                Number(upfrontCost.twoWayMicrosoft.cost) + Number(upfrontCost.empower.cost) +
                Number(upfrontCost.softDocs.cost);

            return {
                ...prevValues,
                totalsTable: {
                    ...prevValues.totalsTable,
                    software: {
                        ...prevValues.totalsTable.software,
                        cost: cost.toFixed(2),
                    }
                }
            }
        })

    }, [upfrontCost.lexisServerLicense.cost, upfrontCost.lexisUserLicense.cost,
    upfrontCost.oracleLicenses.cost, upfrontCost.clientPortal.cost,
    upfrontCost.affinityMobile.cost, upfrontCost.lexisSettleAdjuster.cost,
    upfrontCost.twoWayMicrosoft.cost, upfrontCost.empower.cost, upfrontCost.softDocs.cost, setRepaymentCalc])

    // useEffect for gcrmEntries for Software
    React.useEffect(() => {
        setRepaymentCalc((prevValues) => {
            const entries = Number(upfrontCost.lexisServerLicense.discountItemcost) + Number(upfrontCost.lexisUserLicense.discountItemcost) +
                Number(upfrontCost.oracleLicenses.discountItemcost) + Number(upfrontCost.clientPortal.discountItemcost) +
                Number(upfrontCost.affinityMobile.discountItemcost) + Number(upfrontCost.lexisSettleAdjuster.discountItemcost) +
                Number(upfrontCost.twoWayMicrosoft.discountItemcost) + Number(upfrontCost.empower.discountItemcost) +
                Number(upfrontCost.softDocs.discountItemcost);

            return {
                ...prevValues,
                totalsTable: {
                    ...prevValues.totalsTable,
                    software: {
                        ...prevValues.totalsTable.software,
                        gcrmEntries: entries.toFixed(2),
                    }
                }
            }
        })

    }, [upfrontCost.lexisServerLicense.discountItemcost, upfrontCost.lexisUserLicense.discountItemcost,
    upfrontCost.oracleLicenses.discountItemcost, upfrontCost.clientPortal.discountItemcost,
    upfrontCost.affinityMobile.discountItemcost, upfrontCost.lexisSettleAdjuster.discountItemcost,
    upfrontCost.twoWayMicrosoft.discountItemcost, upfrontCost.empower.discountItemcost,
    upfrontCost.softDocs.discountItemcost, setRepaymentCalc])

    // useEffect for cost for Services
    React.useEffect(() => {
        setRepaymentCalc((prevValues) => {
            const cost = Number(upfrontCost.ImplementServices.cost) + Number(upfrontCost.ImplementTraning.cost) +
                Number(upfrontCost.postImplementation.cost) + Number(upfrontCost.dataMigration.cost) +
                Number(upfrontCost.travelAllowance.cost) + Number(upfrontCost.scopingStudy.cost) +
                Number(upfrontCost.propertyPrecedent.cost);

            return {
                ...prevValues,
                totalsTable: {
                    ...prevValues.totalsTable,
                    services: {
                        ...prevValues.totalsTable.services,
                        cost: cost.toFixed(2),
                    }
                }
            }
        })

    }, [upfrontCost.ImplementServices.cost, upfrontCost.ImplementTraning.cost,
    upfrontCost.postImplementation.cost, upfrontCost.dataMigration.cost,
    upfrontCost.travelAllowance.cost, upfrontCost.scopingStudy.cost,
    upfrontCost.propertyPrecedent.cost, setRepaymentCalc])

    // useEffect for gcrmEntries for Services
    React.useEffect(() => {
        setRepaymentCalc((prevValues) => {
            const entries = Number(upfrontCost.ImplementServices.discountItemcost) + Number(upfrontCost.ImplementTraning.discountItemcost) +
                Number(upfrontCost.postImplementation.discountItemcost) + Number(upfrontCost.dataMigration.discountItemcost) +
                Number(upfrontCost.travelAllowance.discountItemcost) + Number(upfrontCost.scopingStudy.discountItemcost) +
                Number(upfrontCost.propertyPrecedent.discountItemcost);

            return {
                ...prevValues,
                totalsTable: {
                    ...prevValues.totalsTable,
                    services: {
                        ...prevValues.totalsTable.services,
                        gcrmEntries: entries.toFixed(2),
                    }
                }
            }
        })

    }, [upfrontCost.ImplementServices.discountItemcost, upfrontCost.ImplementTraning.discountItemcost,
    upfrontCost.postImplementation.discountItemcost, upfrontCost.dataMigration.discountItemcost,
    upfrontCost.travelAllowance.discountItemcost, upfrontCost.scopingStudy.discountItemcost,
    upfrontCost.propertyPrecedent.discountItemcost, setRepaymentCalc])

    // useEffect for cost for sTotal, for GcrmEntries for pricePerTool
    React.useEffect(() => {
        setRepaymentCalc((prevValues) => {
            const cost = Number(prevValues.totalsTable.software.cost) +
                Number(prevValues.totalsTable.services.cost);
            return {
                ...prevValues,
                totalsTable: {
                    ...prevValues.totalsTable,
                    sTotal: {
                        ...prevValues.totalsTable.sTotal,
                        cost: cost.toFixed(2),
                    },
                    pricePerTool: {
                        ...prevValues.totalsTable.pricePerTool,
                        gcrmEntries: cost.toFixed(2),
                    }
                }
            }
        })
    }, [software.cost, services.cost, setRepaymentCalc])

    //useEffect for gcrmEntries for sTotal, for GcrmEntries for priceTotal
    React.useEffect(() => {
        setRepaymentCalc((prevValues) => {
            const entries = Number(prevValues.totalsTable.software.gcrmEntries) +
                Number(prevValues.totalsTable.services.gcrmEntries);

            return {
                ...prevValues,
                totalsTable: {
                    ...prevValues.totalsTable,
                    sTotal: {
                        ...prevValues.totalsTable.sTotal,
                        gcrmEntries: entries.toFixed(2),
                    },
                    priceTotal: {
                        ...prevValues.totalsTable.priceTotal,
                        gcrmEntries: entries.toFixed(2),
                    },
                }
            }
        })
    }, [software.gcrmEntries, services.gcrmEntries, setRepaymentCalc])

    //useEffect for RRP for year1
    React.useEffect(() => {
        setRepaymentCalc((prevValues) => ({
            ...prevValues,
            mntTable: {
                ...prevValues.mntTable,
                year1: {
                    ...prevValues.mntTable.year1,
                    RRP: Number(ongoingMnt.subTotal.cost),
                },
            }
        }))
    }, [ongoingMnt.subTotal.cost, setRepaymentCalc])

    //useEffect for discounted for year1
    React.useEffect(() => {
        setRepaymentCalc((prevValues) => ({
            ...prevValues,
            mntTable: {
                ...prevValues.mntTable,
                year1: {
                    ...prevValues.mntTable.year1,
                    discounted: Number(ongoingMnt.subTotal.discountItemcost),
                },
            }
        }))
    }, [ongoingMnt.subTotal.discountItemcost, setRepaymentCalc])


    const [upliftPercent, setUpliftPercent] = React.useState(0);
    //useEffect for get uplift percentage from admin end
    React.useEffect(() => {
        const fetchData = async () => {
            //fetch data from Db
            const uplift = await getYearUpliftPercentAPI();
            if (uplift.status !== 200) {
                console.log('getYearUpliftPercentAPI no working');
            }
            else {
                if (typeof uplift.data === 'object' && uplift.data.length > 0) {
                    setUpliftPercent(Number(uplift.data[0].value) / 100)
                }
            }
        }
        fetchData();
    }, [setUpliftPercent])

    //useEffect for RRP for year2
    React.useEffect(() => {
        if (clientProfile.duration === 'Upfront') {
            setRepaymentCalc((prevValues) => ({
                ...prevValues,
                mntTable: {
                    ...prevValues.mntTable,
                    year2: {
                        ...prevValues.mntTable.year2,
                        RRP: 0
                    },
                }
            }))
        }
        else {
            setRepaymentCalc((prevValues) => ({
                ...prevValues,
                mntTable: {
                    ...prevValues.mntTable,
                    year2: {
                        ...prevValues.mntTable.year2,
                        RRP: (Number(prevValues.mntTable.year1.RRP) +
                            Number(prevValues.mntTable.year1.RRP) * upliftPercent).toFixed(2),
                    },
                }
            }))
        }
    }, [clientProfile.duration, year1.RRP, upliftPercent, setRepaymentCalc])

    //useEffect for discounted for year2
    React.useEffect(() => {
        if (clientProfile.duration === 'Upfront') {
            setRepaymentCalc((prevValues) => ({
                ...prevValues,
                mntTable: {
                    ...prevValues.mntTable,
                    year2: {
                        ...prevValues.mntTable.year2,
                        discounted: 0
                    },
                }
            }))
        }
        else {
            setRepaymentCalc((prevValues) => ({
                ...prevValues,
                mntTable: {
                    ...prevValues.mntTable,
                    year2: {
                        ...prevValues.mntTable.year2,
                        discounted: (Number(prevValues.mntTable.year1.discounted) +
                            Number(prevValues.mntTable.year1.discounted) * upliftPercent).toFixed(2),
                    },
                }
            }))
        }
    }, [clientProfile.duration, year1.discounted, upliftPercent, setRepaymentCalc])

    //useEffect for RRP for year3
    React.useEffect(() => {
        if (clientProfile.duration === 'Upfront') {
            setRepaymentCalc((prevValues) => ({
                ...prevValues,
                mntTable: {
                    ...prevValues.mntTable,
                    year3: {
                        ...prevValues.mntTable.year3,
                        RRP: 0
                    },
                }
            }))
        }
        else {
            setRepaymentCalc((prevValues) => ({
                ...prevValues,
                mntTable: {
                    ...prevValues.mntTable,
                    year3: {
                        ...prevValues.mntTable.year3,
                        RRP: (Number(prevValues.mntTable.year2.RRP) +
                            Number(prevValues.mntTable.year2.RRP) * upliftPercent).toFixed(2),
                    },
                }
            }))
        }
    }, [clientProfile.duration, year2.RRP, upliftPercent, setRepaymentCalc])

    //useEffect for discounted for year3
    React.useEffect(() => {
        if (clientProfile.duration === 'Upfront') {
            setRepaymentCalc((prevValues) => ({
                ...prevValues,
                mntTable: {
                    ...prevValues.mntTable,
                    year3: {
                        ...prevValues.mntTable.year3,
                        discounted: 0
                    },
                }
            }))
        }
        else {
            setRepaymentCalc((prevValues) => ({
                ...prevValues,
                mntTable: {
                    ...prevValues.mntTable,
                    year3: {
                        ...prevValues.mntTable.year3,
                        discounted: (Number(prevValues.mntTable.year2.discounted) +
                            Number(prevValues.mntTable.year2.discounted) * upliftPercent).toFixed(2),
                    },
                }
            }))
        }
    }, [clientProfile.duration, year2.discounted, upliftPercent, setRepaymentCalc])

    //useEffect for RRP for year4
    React.useEffect(() => {
        if (clientProfile.duration === 'Upfront' || clientProfile.duration === '36 Months') {
            setRepaymentCalc((prevValues) => ({
                ...prevValues,
                mntTable: {
                    ...prevValues.mntTable,
                    year4: {
                        ...prevValues.mntTable.year4,
                        RRP: 0
                    },
                }
            }))
        }
        else {
            setRepaymentCalc((prevValues) => ({
                ...prevValues,
                mntTable: {
                    ...prevValues.mntTable,
                    year4: {
                        ...prevValues.mntTable.year4,
                        RRP: (Number(prevValues.mntTable.year3.RRP) +
                            Number(prevValues.mntTable.year3.RRP) * upliftPercent).toFixed(2),
                    },
                }
            }))
        }
    }, [clientProfile.duration, year3.RRP, upliftPercent, setRepaymentCalc])

    //useEffect for discounted for year4
    React.useEffect(() => {
        if (clientProfile.duration === 'Upfront' || clientProfile.duration === '36 Months') {
            setRepaymentCalc((prevValues) => ({
                ...prevValues,
                mntTable: {
                    ...prevValues.mntTable,
                    year4: {
                        ...prevValues.mntTable.year4,
                        discounted: 0
                    },
                }
            }))
        }
        else {
            setRepaymentCalc((prevValues) => ({
                ...prevValues,
                mntTable: {
                    ...prevValues.mntTable,
                    year4: {
                        ...prevValues.mntTable.year4,
                        discounted: (Number(prevValues.mntTable.year3.discounted) +
                            Number(prevValues.mntTable.year3.discounted) * upliftPercent).toFixed(2),
                    },
                }
            }))
        }
    }, [clientProfile.duration, year3.discounted, upliftPercent, setRepaymentCalc])

    //useEffect for RRP for year5
    React.useEffect(() => {
        if (clientProfile.duration === 'Upfront' || clientProfile.duration === '36 Months' ||
            clientProfile.duration === '48 Months') {
            setRepaymentCalc((prevValues) => ({
                ...prevValues,
                mntTable: {
                    ...prevValues.mntTable,
                    year5: {
                        ...prevValues.mntTable.year5,
                        RRP: 0
                    },
                }
            }))
        }
        else {
            setRepaymentCalc((prevValues) => ({
                ...prevValues,
                mntTable: {
                    ...prevValues.mntTable,
                    year5: {
                        ...prevValues.mntTable.year5,
                        RRP: (Number(prevValues.mntTable.year4.RRP) +
                            Number(prevValues.mntTable.year4.RRP) * upliftPercent).toFixed(2),
                    },
                }
            }))
        }
    }, [clientProfile.duration, year4.RRP, upliftPercent, setRepaymentCalc])

    //useEffect for discounted for year5
    React.useEffect(() => {
        if (clientProfile.duration === 'Upfront' || clientProfile.duration === '36 Months' ||
            clientProfile.duration === '48 Months') {
            setRepaymentCalc((prevValues) => ({
                ...prevValues,
                mntTable: {
                    ...prevValues.mntTable,
                    year5: {
                        ...prevValues.mntTable.year5,
                        discounted: 0
                    },
                }
            }))
        }
        else {
            setRepaymentCalc((prevValues) => ({
                ...prevValues,
                mntTable: {
                    ...prevValues.mntTable,
                    year5: {
                        ...prevValues.mntTable.year5,
                        discounted: (Number(prevValues.mntTable.year4.discounted) +
                            Number(prevValues.mntTable.year4.discounted) * upliftPercent).toFixed(2),
                    },
                }
            }))
        }
    }, [clientProfile.duration, year4.discounted, upliftPercent, setRepaymentCalc])

    //useEffect for RRP for mntTotal
    React.useEffect(() => {
        setRepaymentCalc((prevValues) => ({
            ...prevValues,
            mntTable: {
                ...prevValues.mntTable,
                mntTotal: {
                    ...prevValues.mntTable.mntTotal,
                    RRP: (Number(prevValues.mntTable.year1.RRP) + Number(prevValues.mntTable.year2.RRP) +
                        Number(prevValues.mntTable.year3.RRP) + Number(prevValues.mntTable.year4.RRP) +
                        Number(prevValues.mntTable.year5.RRP)).toFixed(2),
                },
            }
        }))
    }, [year1.RRP, year2.RRP, year3.RRP, year4.RRP, year5.RRP, setRepaymentCalc])

    //useEffect for discounted for mntTotal
    React.useEffect(() => {
        setRepaymentCalc((prevValues) => ({
            ...prevValues,
            mntTable: {
                ...prevValues.mntTable,
                mntTotal: {
                    ...prevValues.mntTable.mntTotal,
                    discounted: (Number(prevValues.mntTable.year1.discounted) + Number(prevValues.mntTable.year2.discounted) +
                        Number(prevValues.mntTable.year3.discounted) + Number(prevValues.mntTable.year4.discounted) +
                        Number(prevValues.mntTable.year5.discounted)).toFixed(2),
                },
            }
        }))
    }, [year1.discounted, year2.discounted, year3.discounted, year4.discounted, year5.discounted, setRepaymentCalc])

    //useEffect for dicountTable fields
    React.useEffect(() => {
        const dis = Number(software.cost) - Number(software.gcrmEntries);
        const disPercent = (dis / Number(software.cost)) * 100;
        setDiscountTable((prevValues) => ({
            ...prevValues,
            softwareDis: {
                ...prevValues.softwareDis,
                totalAmount: software.cost,
                discountAmount: dis,
                amountAfterDiscount: software.gcrmEntries,
                discountPercent: isFinite(disPercent) ? disPercent.toFixed(2) : 0,
            }
        }))
    }, [software.cost, software.gcrmEntries])

    React.useEffect(() => {
        const dis = Number(services.cost) - Number(services.gcrmEntries);
        const disPercent = (dis / Number(services.cost)) * 100;
        setDiscountTable((prevValues) => ({
            ...prevValues,
            serviceDis: {
                ...prevValues.serviceDis,
                totalAmount: services.cost,
                discountAmount: dis,
                amountAfterDiscount: services.gcrmEntries,
                discountPercent: isFinite(disPercent) ? disPercent.toFixed(2) : 0,
            }
        }))
    }, [services.cost, services.gcrmEntries])

    React.useEffect(() => {
        const dis = Number(mntTotal.RRP) - Number(mntTotal.discounted);
        const disPercent = (dis / Number(mntTotal.RRP)) * 100;
        setDiscountTable((prevValues) => ({
            ...prevValues,
            lexisCareDis: {
                ...prevValues.lexisCareDis,
                totalAmount: mntTotal.RRP,
                discountAmount: dis,
                amountAfterDiscount: mntTotal.discounted,
                discountPercent: isFinite(disPercent) ? disPercent.toFixed(2) : 0,
            }
        }))
    }, [mntTotal.RRP, mntTotal.discounted])

    React.useEffect(() => {
        const totalAmt = Number(softwareDis.totalAmount) + Number(serviceDis.totalAmount) + Number(lexisCareDis.totalAmount);
        const totalDis = Number(softwareDis.discountAmount) + Number(serviceDis.discountAmount) + Number(lexisCareDis.discountAmount);
        const amtAfterDis = Number(softwareDis.amountAfterDiscount) + Number(serviceDis.amountAfterDiscount) + Number(lexisCareDis.amountAfterDiscount);
        const disPercent = (totalDis / totalAmt) * 100;

        setDiscountTable((prevValues) => ({
            ...prevValues,
            totalDis: {
                ...prevValues.totalDis,
                totalAmount: totalAmt,
                discountAmount: totalDis,
                amountAfterDiscount: amtAfterDis,
                discountPercent: isFinite(disPercent) ? disPercent.toFixed(2) : 0,
            }
        }))
    }, [softwareDis.totalAmount, serviceDis.totalAmount, lexisCareDis.totalAmount,
    softwareDis.discountAmount, serviceDis.discountAmount, lexisCareDis.discountAmount,
    softwareDis.amountAfterDiscount, serviceDis.amountAfterDiscount, lexisCareDis.amountAfterDiscount,])

    const monthsToYear = {
        '36 Months': 3,
        '48 Months': 4,
        '60 Months': 5,
    }
    React.useEffect(() => {
        setDiscountTable((prevValues) => ({
            ...prevValues,
            lexisCareDis: {
                ...prevValues.lexisCareDis,
                label: `Lexis Care ${monthsToYear[clientProfile.duration] ? monthsToYear[clientProfile.duration] : 0} Year Subtotal`,
            },
            totalDis: {
                ...prevValues.totalDis,
                label: `Total ${monthsToYear[clientProfile.duration] ? monthsToYear[clientProfile.duration] : 0} Year Contract Value`,
            },
        }))
    }, [clientProfile.duration])

    // useEffect for payments for initPayment
    React.useEffect(() => {
        if (clientProfile.duration === 'Upfront') {
            setRepaymentCalc((prevValues) => ({
                ...prevValues,
                repayments: {
                    ...prevValues.repayments,
                    initPayment: {
                        ...prevValues.repayments.initPayment,
                        payments: Number(prevValues.totalsTable.sTotal.gcrmEntries),
                    }
                }
            }))
        }

    }, [clientProfile.duration, sTotal.gcrmEntries, setRepaymentCalc])

    // useEffect for payments for month1 to month36 
    React.useEffect(() => {
        if (clientProfile.duration === 'Upfront' || clientProfile.objective === 'Upsell') {
            setRepaymentCalc((prevValues) => ({
                ...prevValues,
                repayments: {
                    ...prevValues.repayments,
                    month1: {
                        ...prevValues.repayments.month1,
                        payments: 0
                    },
                    month2: {
                        ...prevValues.repayments.month2,
                        payments: 0
                    },
                    month3: {
                        ...prevValues.repayments.month3,
                        payments: 0
                    },
                    month4: {
                        ...prevValues.repayments.month4,
                        payments: 0
                    },
                    month5: {
                        ...prevValues.repayments.month5,
                        payments: 0
                    },
                    month6: {
                        ...prevValues.repayments.month6,
                        payments: 0
                    },
                    month7: {
                        ...prevValues.repayments.month7,
                        payments: 0
                    },
                    month8: {
                        ...prevValues.repayments.month8,
                        payments: 0
                    },
                    month9: {
                        ...prevValues.repayments.month9,
                        payments: 0
                    },
                    month10: {
                        ...prevValues.repayments.month10,
                        payments: 0
                    },
                    month11: {
                        ...prevValues.repayments.month11,
                        payments: 0
                    },
                    month12: {
                        ...prevValues.repayments.month12,
                        payments: 0
                    },
                    month13: {
                        ...prevValues.repayments.month13,
                        payments: 0
                    },
                    month14: {
                        ...prevValues.repayments.month14,
                        payments: 0
                    },
                    month15: {
                        ...prevValues.repayments.month15,
                        payments: 0
                    },
                    month16: {
                        ...prevValues.repayments.month16,
                        payments: 0
                    },
                    month17: {
                        ...prevValues.repayments.month17,
                        payments: 0
                    },
                    month18: {
                        ...prevValues.repayments.month18,
                        payments: 0
                    },
                    month19: {
                        ...prevValues.repayments.month19,
                        payments: 0
                    },
                    month20: {
                        ...prevValues.repayments.month20,
                        payments: 0
                    },
                    month21: {
                        ...prevValues.repayments.month21,
                        payments: 0
                    },
                    month22: {
                        ...prevValues.repayments.month22,
                        payments: 0
                    },
                    month23: {
                        ...prevValues.repayments.month23,
                        payments: 0
                    },
                    month24: {
                        ...prevValues.repayments.month24,
                        payments: 0
                    },
                    month25: {
                        ...prevValues.repayments.month25,
                        payments: 0
                    },
                    month26: {
                        ...prevValues.repayments.month26,
                        payments: 0
                    },
                    month27: {
                        ...prevValues.repayments.month27,
                        payments: 0
                    },
                    month28: {
                        ...prevValues.repayments.month28,
                        payments: 0
                    },
                    month29: {
                        ...prevValues.repayments.month29,
                        payments: 0
                    },
                    month30: {
                        ...prevValues.repayments.month30,
                        payments: 0
                    },
                    month31: {
                        ...prevValues.repayments.month31,
                        payments: 0
                    },
                    month32: {
                        ...prevValues.repayments.month32,
                        payments: 0
                    },
                    month33: {
                        ...prevValues.repayments.month33,
                        payments: 0
                    },
                    month34: {
                        ...prevValues.repayments.month34,
                        payments: 0
                    },
                    month35: {
                        ...prevValues.repayments.month35,
                        payments: 0
                    },
                    month36: {
                        ...prevValues.repayments.month36,
                        payments: 0
                    },
                }
            }))
        }
        else {
            let months = 0;
            if (clientProfile.duration === '36 Months')
                months = 36;
            else if (clientProfile.duration === '48 Months')
                months = 48;
            else if (clientProfile.duration === '60 Months')
                months = 60;

            setRepaymentCalc((prevValues) => {
                let price = 0;
                if (months) {
                    price = (Number(prevValues.totalsTable.sTotal.gcrmEntries) -
                        Number(prevValues.repayments.initPayment.payments)) / months;
                    price = Math.round((price + Number.EPSILON) * 100) / 100;
                }
                else {
                    price = 0;
                }
                return {
                    ...prevValues,
                    repayments: {
                        ...prevValues.repayments,
                        month1: {
                            ...prevValues.repayments.month1,
                            payments: price,
                        },
                        month2: {
                            ...prevValues.repayments.month2,
                            payments: price,
                        },
                        month3: {
                            ...prevValues.repayments.month3,
                            payments: price,
                        },
                        month4: {
                            ...prevValues.repayments.month4,
                            payments: price,
                        },
                        month5: {
                            ...prevValues.repayments.month5,
                            payments: price,
                        },
                        month6: {
                            ...prevValues.repayments.month6,
                            payments: price,
                        },
                        month7: {
                            ...prevValues.repayments.month7,
                            payments: price,
                        },
                        month8: {
                            ...prevValues.repayments.month8,
                            payments: price,
                        },
                        month9: {
                            ...prevValues.repayments.month9,
                            payments: price,
                        },
                        month10: {
                            ...prevValues.repayments.month10,
                            payments: price,
                        },
                        month11: {
                            ...prevValues.repayments.month11,
                            payments: price,
                        },
                        month12: {
                            ...prevValues.repayments.month12,
                            payments: price,
                        },
                        month13: {
                            ...prevValues.repayments.month13,
                            payments: price,
                        },
                        month14: {
                            ...prevValues.repayments.month14,
                            payments: price,
                        },
                        month15: {
                            ...prevValues.repayments.month15,
                            payments: price,
                        },
                        month16: {
                            ...prevValues.repayments.month16,
                            payments: price,
                        },
                        month17: {
                            ...prevValues.repayments.month17,
                            payments: price,
                        },
                        month18: {
                            ...prevValues.repayments.month18,
                            payments: price,
                        },
                        month19: {
                            ...prevValues.repayments.month19,
                            payments: price,
                        },
                        month20: {
                            ...prevValues.repayments.month20,
                            payments: price,
                        },
                        month21: {
                            ...prevValues.repayments.month21,
                            payments: price,
                        },
                        month22: {
                            ...prevValues.repayments.month22,
                            payments: price,
                        },
                        month23: {
                            ...prevValues.repayments.month23,
                            payments: price,
                        },
                        month24: {
                            ...prevValues.repayments.month24,
                            payments: price,
                        },
                        month25: {
                            ...prevValues.repayments.month25,
                            payments: price,
                        },
                        month26: {
                            ...prevValues.repayments.month26,
                            payments: price,
                        },
                        month27: {
                            ...prevValues.repayments.month27,
                            payments: price,
                        },
                        month28: {
                            ...prevValues.repayments.month28,
                            payments: price,
                        },
                        month29: {
                            ...prevValues.repayments.month29,
                            payments: price,
                        },
                        month30: {
                            ...prevValues.repayments.month30,
                            payments: price,
                        },
                        month31: {
                            ...prevValues.repayments.month31,
                            payments: price,
                        },
                        month32: {
                            ...prevValues.repayments.month32,
                            payments: price,
                        },
                        month33: {
                            ...prevValues.repayments.month33,
                            payments: price,
                        },
                        month34: {
                            ...prevValues.repayments.month34,
                            payments: price,
                        },
                        month35: {
                            ...prevValues.repayments.month35,
                            payments: price,
                        },
                        month36: {
                            ...prevValues.repayments.month36,
                            payments: price,
                        },
                    }
                }
            })
        }

    }, [clientProfile.duration, clientProfile.objective, sTotal.gcrmEntries, initPayment.payments, setRepaymentCalc])


    // useEffect for payments for month37 to month48
    React.useEffect(() => {
        if (clientProfile.duration === 'Upfront' || clientProfile.objective === 'Upsell' ||
            clientProfile.duration === '36 Months') {
            setRepaymentCalc((prevValues) => ({
                ...prevValues,
                repayments: {
                    ...prevValues.repayments,
                    month37: {
                        ...prevValues.repayments.month37,
                        payments: 0
                    },
                    month38: {
                        ...prevValues.repayments.month38,
                        payments: 0
                    },
                    month39: {
                        ...prevValues.repayments.month39,
                        payments: 0
                    },
                    month40: {
                        ...prevValues.repayments.month40,
                        payments: 0
                    },
                    month41: {
                        ...prevValues.repayments.month41,
                        payments: 0
                    },
                    month42: {
                        ...prevValues.repayments.month42,
                        payments: 0
                    },
                    month43: {
                        ...prevValues.repayments.month43,
                        payments: 0
                    },
                    month44: {
                        ...prevValues.repayments.month44,
                        payments: 0
                    },
                    month45: {
                        ...prevValues.repayments.month45,
                        payments: 0
                    },
                    month46: {
                        ...prevValues.repayments.month46,
                        payments: 0
                    },
                    month47: {
                        ...prevValues.repayments.month47,
                        payments: 0
                    },
                    month48: {
                        ...prevValues.repayments.month48,
                        payments: 0
                    },
                }
            }))
        }
        else {
            let months = 0;
            if (clientProfile.duration === '48 Months')
                months = 48;
            else if (clientProfile.duration === '60 Months')
                months = 60;

            setRepaymentCalc((prevValues) => {
                let price = 0;
                if (months) {
                    price = (Number(prevValues.totalsTable.sTotal.gcrmEntries) -
                        Number(prevValues.repayments.initPayment.payments)) / months;
                    price = Math.round((price + Number.EPSILON) * 100) / 100;
                }
                else {
                    price = 0;
                }
                return {
                    ...prevValues,
                    repayments: {
                        ...prevValues.repayments,
                        month37: {
                            ...prevValues.repayments.month37,
                            payments: price,
                        },
                        month38: {
                            ...prevValues.repayments.month38,
                            payments: price,
                        },
                        month39: {
                            ...prevValues.repayments.month39,
                            payments: price,
                        },
                        month40: {
                            ...prevValues.repayments.month40,
                            payments: price,
                        },
                        month41: {
                            ...prevValues.repayments.month41,
                            payments: price,
                        },
                        month42: {
                            ...prevValues.repayments.month42,
                            payments: price,
                        },
                        month43: {
                            ...prevValues.repayments.month43,
                            payments: price,
                        },
                        month44: {
                            ...prevValues.repayments.month44,
                            payments: price,
                        },
                        month45: {
                            ...prevValues.repayments.month45,
                            payments: price,
                        },
                        month46: {
                            ...prevValues.repayments.month46,
                            payments: price,
                        },
                        month47: {
                            ...prevValues.repayments.month47,
                            payments: price,
                        },
                        month48: {
                            ...prevValues.repayments.month48,
                            payments: price,
                        },
                    }
                }
            })
        }

    }, [clientProfile.duration, clientProfile.objective, sTotal.gcrmEntries, initPayment.payments, setRepaymentCalc])

    // useEffect for payments for month49 to month60
    React.useEffect(() => {
        if (clientProfile.duration === 'Upfront' || clientProfile.objective === 'Upsell' ||
            clientProfile.duration === '36 Months' || clientProfile.duration === '48 Months') {
            setRepaymentCalc((prevValues) => ({
                ...prevValues,
                repayments: {
                    ...prevValues.repayments,
                    month49: {
                        ...prevValues.repayments.month49,
                        payments: 0
                    },
                    month50: {
                        ...prevValues.repayments.month50,
                        payments: 0
                    },
                    month51: {
                        ...prevValues.repayments.month51,
                        payments: 0
                    },
                    month52: {
                        ...prevValues.repayments.month52,
                        payments: 0
                    },
                    month53: {
                        ...prevValues.repayments.month53,
                        payments: 0
                    },
                    month54: {
                        ...prevValues.repayments.month54,
                        payments: 0
                    },
                    month55: {
                        ...prevValues.repayments.month55,
                        payments: 0
                    },
                    month56: {
                        ...prevValues.repayments.month56,
                        payments: 0
                    },
                    month57: {
                        ...prevValues.repayments.month57,
                        payments: 0
                    },
                    month58: {
                        ...prevValues.repayments.month58,
                        payments: 0
                    },
                    month59: {
                        ...prevValues.repayments.month59,
                        payments: 0
                    },
                    month60: {
                        ...prevValues.repayments.month60,
                        payments: 0
                    },
                }
            }))
        }
        else {
            let months = 0;
            if (clientProfile.duration === '60 Months')
                months = 60;

            setRepaymentCalc((prevValues) => {
                let price = 0;
                if (months) {
                    price = (Number(prevValues.totalsTable.sTotal.gcrmEntries) -
                        Number(prevValues.repayments.initPayment.payments)) / months;
                    price = Math.round((price + Number.EPSILON) * 100) / 100;
                }
                else {
                    price = 0;
                }
                return {
                    ...prevValues,
                    repayments: {
                        ...prevValues.repayments,
                        month49: {
                            ...prevValues.repayments.month49,
                            payments: price,
                        },
                        month50: {
                            ...prevValues.repayments.month50,
                            payments: price,
                        },
                        month51: {
                            ...prevValues.repayments.month51,
                            payments: price,
                        },
                        month52: {
                            ...prevValues.repayments.month52,
                            payments: price,
                        },
                        month53: {
                            ...prevValues.repayments.month53,
                            payments: price,
                        },
                        month54: {
                            ...prevValues.repayments.month54,
                            payments: price,
                        },
                        month55: {
                            ...prevValues.repayments.month55,
                            payments: price,
                        },
                        month56: {
                            ...prevValues.repayments.month56,
                            payments: price,
                        },
                        month57: {
                            ...prevValues.repayments.month57,
                            payments: price,
                        },
                        month58: {
                            ...prevValues.repayments.month58,
                            payments: price,
                        },
                        month59: {
                            ...prevValues.repayments.month59,
                            payments: price,
                        },
                        month60: {
                            ...prevValues.repayments.month60,
                            payments: price,
                        },
                    }
                }
            })
        }

    }, [clientProfile.duration, clientProfile.objective, sTotal.gcrmEntries, initPayment.payments, setRepaymentCalc])


    //useEffect for lexisCare for month1 to month 12
    React.useEffect(() => {
        if (clientProfile.objective === 'Upsell' || clientProfile.duration === '') {
            setRepaymentCalc((prevValues) => ({
                ...prevValues,
                repayments: {
                    ...prevValues.repayments,
                    month1: {
                        ...prevValues.repayments.month1,
                        lexisCare: 0
                    },
                    month2: {
                        ...prevValues.repayments.month2,
                        lexisCare: 0
                    },
                    month3: {
                        ...prevValues.repayments.month3,
                        lexisCare: 0
                    },
                    month4: {
                        ...prevValues.repayments.month4,
                        lexisCare: 0
                    },
                    month5: {
                        ...prevValues.repayments.month5,
                        lexisCare: 0
                    },
                    month6: {
                        ...prevValues.repayments.month6,
                        lexisCare: 0
                    },
                    month7: {
                        ...prevValues.repayments.month7,
                        lexisCare: 0
                    },
                    month8: {
                        ...prevValues.repayments.month8,
                        lexisCare: 0
                    },
                    month9: {
                        ...prevValues.repayments.month9,
                        lexisCare: 0
                    },
                    month10: {
                        ...prevValues.repayments.month10,
                        lexisCare: 0
                    },
                    month11: {
                        ...prevValues.repayments.month11,
                        lexisCare: 0
                    },
                    month12: {
                        ...prevValues.repayments.month12,
                        lexisCare: 0
                    },
                }
            }))
        }
        else {
            if (clientProfile.duration === 'Upfront' || clientProfile.duration === '36 Months' ||
                clientProfile.duration === '48 Months' || clientProfile.duration === '60 Months') {
                setRepaymentCalc((prevValues) => {
                    let price = Number(prevValues.mntTable.year1.discounted) / 12;
                    price = Math.round((price + Number.EPSILON) * 100) / 100;

                    return {
                        ...prevValues,
                        repayments: {
                            ...prevValues.repayments,
                            month1: {
                                ...prevValues.repayments.month1,
                                lexisCare: price,
                            },
                            month2: {
                                ...prevValues.repayments.month2,
                                lexisCare: price,
                            },
                            month3: {
                                ...prevValues.repayments.month3,
                                lexisCare: price,
                            },
                            month4: {
                                ...prevValues.repayments.month4,
                                lexisCare: price,
                            },
                            month5: {
                                ...prevValues.repayments.month5,
                                lexisCare: price,
                            },
                            month6: {
                                ...prevValues.repayments.month6,
                                lexisCare: price,
                            },
                            month7: {
                                ...prevValues.repayments.month7,
                                lexisCare: price,
                            },
                            month8: {
                                ...prevValues.repayments.month8,
                                lexisCare: price,
                            },
                            month9: {
                                ...prevValues.repayments.month9,
                                lexisCare: price,
                            },
                            month10: {
                                ...prevValues.repayments.month10,
                                lexisCare: price,
                            },
                            month11: {
                                ...prevValues.repayments.month11,
                                lexisCare: price,
                            },
                            month12: {
                                ...prevValues.repayments.month12,
                                lexisCare: price,
                            },
                        }
                    }
                })
            }
        }
    }, [clientProfile.duration, clientProfile.objective, year1.discounted, setRepaymentCalc])


    //useEffect for lexisCare for month13 to month 24
    React.useEffect(() => {
        if (clientProfile.objective === 'Upsell' || clientProfile.duration === '' ||
            clientProfile.duration === 'Upfront') {
            setRepaymentCalc((prevValues) => ({
                ...prevValues,
                repayments: {
                    ...prevValues.repayments,
                    month13: {
                        ...prevValues.repayments.month13,
                        lexisCare: 0
                    },
                    month14: {
                        ...prevValues.repayments.month14,
                        lexisCare: 0
                    },
                    month15: {
                        ...prevValues.repayments.month15,
                        lexisCare: 0
                    },
                    month16: {
                        ...prevValues.repayments.month16,
                        lexisCare: 0
                    },
                    month17: {
                        ...prevValues.repayments.month17,
                        lexisCare: 0
                    },
                    month18: {
                        ...prevValues.repayments.month18,
                        lexisCare: 0
                    },
                    month19: {
                        ...prevValues.repayments.month19,
                        lexisCare: 0
                    },
                    month20: {
                        ...prevValues.repayments.month20,
                        lexisCare: 0
                    },
                    month21: {
                        ...prevValues.repayments.month21,
                        lexisCare: 0
                    },
                    month22: {
                        ...prevValues.repayments.month22,
                        lexisCare: 0
                    },
                    month23: {
                        ...prevValues.repayments.month23,
                        lexisCare: 0
                    },
                    month24: {
                        ...prevValues.repayments.month24,
                        lexisCare: 0
                    },
                }
            }))
        }
        else {
            if (clientProfile.duration === '36 Months' || clientProfile.duration === '48 Months' ||
                clientProfile.duration === '60 Months') {
                setRepaymentCalc((prevValues) => {
                    let price = Number(prevValues.mntTable.year2.discounted) / 12;
                    price = Math.round((price + Number.EPSILON) * 100) / 100;

                    return {
                        ...prevValues,
                        repayments: {
                            ...prevValues.repayments,
                            month13: {
                                ...prevValues.repayments.month13,
                                lexisCare: price,
                            },
                            month14: {
                                ...prevValues.repayments.month14,
                                lexisCare: price,
                            },
                            month15: {
                                ...prevValues.repayments.month15,
                                lexisCare: price,
                            },
                            month16: {
                                ...prevValues.repayments.month16,
                                lexisCare: price,
                            },
                            month17: {
                                ...prevValues.repayments.month17,
                                lexisCare: price,
                            },
                            month18: {
                                ...prevValues.repayments.month18,
                                lexisCare: price,
                            },
                            month19: {
                                ...prevValues.repayments.month19,
                                lexisCare: price,
                            },
                            month20: {
                                ...prevValues.repayments.month20,
                                lexisCare: price,
                            },
                            month21: {
                                ...prevValues.repayments.month21,
                                lexisCare: price,
                            },
                            month22: {
                                ...prevValues.repayments.month22,
                                lexisCare: price,
                            },
                            month23: {
                                ...prevValues.repayments.month23,
                                lexisCare: price,
                            },
                            month24: {
                                ...prevValues.repayments.month24,
                                lexisCare: price,
                            },
                        }
                    }
                })
            }
        }
    }, [clientProfile.duration, clientProfile.objective, year2.discounted, setRepaymentCalc])


    //useEffect for lexisCare for month25 to month 36
    React.useEffect(() => {
        if (clientProfile.objective === 'Upsell' || clientProfile.duration === '' ||
            clientProfile.duration === 'Upfront') {
            setRepaymentCalc((prevValues) => ({
                ...prevValues,
                repayments: {
                    ...prevValues.repayments,
                    month25: {
                        ...prevValues.repayments.month25,
                        lexisCare: 0
                    },
                    month26: {
                        ...prevValues.repayments.month26,
                        lexisCare: 0
                    },
                    month27: {
                        ...prevValues.repayments.month27,
                        lexisCare: 0
                    },
                    month28: {
                        ...prevValues.repayments.month28,
                        lexisCare: 0
                    },
                    month29: {
                        ...prevValues.repayments.month29,
                        lexisCare: 0
                    },
                    month30: {
                        ...prevValues.repayments.month30,
                        lexisCare: 0
                    },
                    month31: {
                        ...prevValues.repayments.month31,
                        lexisCare: 0
                    },
                    month32: {
                        ...prevValues.repayments.month32,
                        lexisCare: 0
                    },
                    month33: {
                        ...prevValues.repayments.month33,
                        lexisCare: 0
                    },
                    month34: {
                        ...prevValues.repayments.month34,
                        lexisCare: 0
                    },
                    month35: {
                        ...prevValues.repayments.month35,
                        lexisCare: 0
                    },
                    month36: {
                        ...prevValues.repayments.month36,
                        lexisCare: 0
                    },
                }
            }))
        }
        else {
            if (clientProfile.duration === '36 Months' || clientProfile.duration === '48 Months' ||
                clientProfile.duration === '60 Months') {
                setRepaymentCalc((prevValues) => {
                    let price = Number(prevValues.mntTable.year3.discounted) / 12;
                    price = Math.round((price + Number.EPSILON) * 100) / 100;

                    return {
                        ...prevValues,
                        repayments: {
                            ...prevValues.repayments,
                            month25: {
                                ...prevValues.repayments.month25,
                                lexisCare: price,
                            },
                            month26: {
                                ...prevValues.repayments.month26,
                                lexisCare: price,
                            },
                            month27: {
                                ...prevValues.repayments.month27,
                                lexisCare: price,
                            },
                            month28: {
                                ...prevValues.repayments.month28,
                                lexisCare: price,
                            },
                            month29: {
                                ...prevValues.repayments.month29,
                                lexisCare: price,
                            },
                            month30: {
                                ...prevValues.repayments.month30,
                                lexisCare: price,
                            },
                            month31: {
                                ...prevValues.repayments.month31,
                                lexisCare: price,
                            },
                            month32: {
                                ...prevValues.repayments.month32,
                                lexisCare: price,
                            },
                            month33: {
                                ...prevValues.repayments.month33,
                                lexisCare: price,
                            },
                            month34: {
                                ...prevValues.repayments.month34,
                                lexisCare: price,
                            },
                            month35: {
                                ...prevValues.repayments.month35,
                                lexisCare: price,
                            },
                            month36: {
                                ...prevValues.repayments.month36,
                                lexisCare: price,
                            },
                        }
                    }
                })
            }
        }
    }, [clientProfile.duration, clientProfile.objective, year3.discounted, setRepaymentCalc])


    //useEffect for lexisCare for month37 to month 48
    React.useEffect(() => {
        if (clientProfile.objective === 'Upsell' || clientProfile.duration === '' ||
            clientProfile.duration === 'Upfront' || clientProfile.duration === '36 Months') {
            setRepaymentCalc((prevValues) => ({
                ...prevValues,
                repayments: {
                    ...prevValues.repayments,
                    month37: {
                        ...prevValues.repayments.month37,
                        lexisCare: 0
                    },
                    month38: {
                        ...prevValues.repayments.month38,
                        lexisCare: 0
                    },
                    month39: {
                        ...prevValues.repayments.month39,
                        lexisCare: 0
                    },
                    month40: {
                        ...prevValues.repayments.month40,
                        lexisCare: 0
                    },
                    month41: {
                        ...prevValues.repayments.month41,
                        lexisCare: 0
                    },
                    month42: {
                        ...prevValues.repayments.month42,
                        lexisCare: 0
                    },
                    month43: {
                        ...prevValues.repayments.month43,
                        lexisCare: 0
                    },
                    month44: {
                        ...prevValues.repayments.month44,
                        lexisCare: 0
                    },
                    month45: {
                        ...prevValues.repayments.month45,
                        lexisCare: 0
                    },
                    month46: {
                        ...prevValues.repayments.month46,
                        lexisCare: 0
                    },
                    month47: {
                        ...prevValues.repayments.month47,
                        lexisCare: 0
                    },
                    month48: {
                        ...prevValues.repayments.month48,
                        lexisCare: 0
                    },
                }
            }))
        }
        else {
            if (clientProfile.duration === '48 Months' || clientProfile.duration === '60 Months') {
                setRepaymentCalc((prevValues) => {
                    let price = Number(prevValues.mntTable.year4.discounted) / 12;
                    price = Math.round((price + Number.EPSILON) * 100) / 100;

                    return {
                        ...prevValues,
                        repayments: {
                            ...prevValues.repayments,
                            month37: {
                                ...prevValues.repayments.month37,
                                lexisCare: price,
                            },
                            month38: {
                                ...prevValues.repayments.month38,
                                lexisCare: price,
                            },
                            month39: {
                                ...prevValues.repayments.month39,
                                lexisCare: price,
                            },
                            month40: {
                                ...prevValues.repayments.month40,
                                lexisCare: price,
                            },
                            month41: {
                                ...prevValues.repayments.month41,
                                lexisCare: price,
                            },
                            month42: {
                                ...prevValues.repayments.month42,
                                lexisCare: price,
                            },
                            month43: {
                                ...prevValues.repayments.month43,
                                lexisCare: price,
                            },
                            month44: {
                                ...prevValues.repayments.month44,
                                lexisCare: price,
                            },
                            month45: {
                                ...prevValues.repayments.month45,
                                lexisCare: price,
                            },
                            month46: {
                                ...prevValues.repayments.month46,
                                lexisCare: price,
                            },
                            month47: {
                                ...prevValues.repayments.month47,
                                lexisCare: price,
                            },
                            month48: {
                                ...prevValues.repayments.month48,
                                lexisCare: price,
                            },
                        }
                    }
                })
            }
        }
    }, [clientProfile.duration, clientProfile.objective, year4.discounted, setRepaymentCalc])


    //useEffect for lexisCare for month49 to month 60
    React.useEffect(() => {
        if (clientProfile.objective === 'Upsell' || clientProfile.duration === '' ||
            clientProfile.duration === 'Upfront' || clientProfile.duration === '36 Months' ||
            clientProfile.duration === '48 Months') {
            setRepaymentCalc((prevValues) => ({
                ...prevValues,
                repayments: {
                    ...prevValues.repayments,
                    month49: {
                        ...prevValues.repayments.month49,
                        lexisCare: 0
                    },
                    month50: {
                        ...prevValues.repayments.month50,
                        lexisCare: 0
                    },
                    month51: {
                        ...prevValues.repayments.month51,
                        lexisCare: 0
                    },
                    month52: {
                        ...prevValues.repayments.month52,
                        lexisCare: 0
                    },
                    month53: {
                        ...prevValues.repayments.month53,
                        lexisCare: 0
                    },
                    month54: {
                        ...prevValues.repayments.month54,
                        lexisCare: 0
                    },
                    month55: {
                        ...prevValues.repayments.month55,
                        lexisCare: 0
                    },
                    month56: {
                        ...prevValues.repayments.month56,
                        lexisCare: 0
                    },
                    month57: {
                        ...prevValues.repayments.month57,
                        lexisCare: 0
                    },
                    month58: {
                        ...prevValues.repayments.month58,
                        lexisCare: 0
                    },
                    month59: {
                        ...prevValues.repayments.month59,
                        lexisCare: 0
                    },
                    month60: {
                        ...prevValues.repayments.month60,
                        lexisCare: 0
                    },
                }
            }))
        }
        else {
            if (clientProfile.duration === '60 Months') {
                setRepaymentCalc((prevValues) => {
                    let price = Number(prevValues.mntTable.year5.discounted) / 12;
                    price = Math.round((price + Number.EPSILON) * 100) / 100;

                    return {
                        ...prevValues,
                        repayments: {
                            ...prevValues.repayments,
                            month49: {
                                ...prevValues.repayments.month49,
                                lexisCare: price,
                            },
                            month50: {
                                ...prevValues.repayments.month50,
                                lexisCare: price,
                            },
                            month51: {
                                ...prevValues.repayments.month51,
                                lexisCare: price,
                            },
                            month52: {
                                ...prevValues.repayments.month52,
                                lexisCare: price,
                            },
                            month53: {
                                ...prevValues.repayments.month53,
                                lexisCare: price,
                            },
                            month54: {
                                ...prevValues.repayments.month54,
                                lexisCare: price,
                            },
                            month55: {
                                ...prevValues.repayments.month55,
                                lexisCare: price,
                            },
                            month56: {
                                ...prevValues.repayments.month56,
                                lexisCare: price,
                            },
                            month57: {
                                ...prevValues.repayments.month57,
                                lexisCare: price,
                            },
                            month58: {
                                ...prevValues.repayments.month58,
                                lexisCare: price,
                            },
                            month59: {
                                ...prevValues.repayments.month59,
                                lexisCare: price,
                            },
                            month60: {
                                ...prevValues.repayments.month60,
                                lexisCare: price,
                            },
                        }
                    }
                })
            }
        }
    }, [clientProfile.duration, clientProfile.objective, year5.discounted, setRepaymentCalc])

    // useEffect for payments for repaymentTotal
    React.useEffect(() => {
        // console.log('payments for total called')
        setRepaymentCalc((prevValues) => {
            let payment = Number(prevValues.repayments.initPayment.payments) +
                Number(prevValues.repayments.month1.payments) + Number(prevValues.repayments.month2.payments) +
                Number(prevValues.repayments.month3.payments) + Number(prevValues.repayments.month4.payments) +
                Number(prevValues.repayments.month5.payments) + Number(prevValues.repayments.month6.payments) +
                Number(prevValues.repayments.month7.payments) + Number(prevValues.repayments.month8.payments) +
                Number(prevValues.repayments.month9.payments) + Number(prevValues.repayments.month10.payments) +
                Number(prevValues.repayments.month11.payments) + Number(prevValues.repayments.month12.payments) +
                Number(prevValues.repayments.month13.payments) + Number(prevValues.repayments.month14.payments) +
                Number(prevValues.repayments.month15.payments) + Number(prevValues.repayments.month16.payments) +
                Number(prevValues.repayments.month17.payments) + Number(prevValues.repayments.month18.payments) +
                Number(prevValues.repayments.month19.payments) + Number(prevValues.repayments.month20.payments) +
                Number(prevValues.repayments.month21.payments) + Number(prevValues.repayments.month22.payments) +
                Number(prevValues.repayments.month23.payments) + Number(prevValues.repayments.month24.payments) +
                Number(prevValues.repayments.month25.payments) + Number(prevValues.repayments.month26.payments) +
                Number(prevValues.repayments.month27.payments) + Number(prevValues.repayments.month28.payments) +
                Number(prevValues.repayments.month29.payments) + Number(prevValues.repayments.month30.payments) +
                Number(prevValues.repayments.month31.payments) + Number(prevValues.repayments.month32.payments) +
                Number(prevValues.repayments.month33.payments) + Number(prevValues.repayments.month34.payments) +
                Number(prevValues.repayments.month35.payments) + Number(prevValues.repayments.month36.payments) +
                Number(prevValues.repayments.month37.payments) + Number(prevValues.repayments.month38.payments) +
                Number(prevValues.repayments.month39.payments) + Number(prevValues.repayments.month40.payments) +
                Number(prevValues.repayments.month41.payments) + Number(prevValues.repayments.month42.payments) +
                Number(prevValues.repayments.month43.payments) + Number(prevValues.repayments.month44.payments) +
                Number(prevValues.repayments.month45.payments) + Number(prevValues.repayments.month46.payments) +
                Number(prevValues.repayments.month47.payments) + Number(prevValues.repayments.month48.payments) +
                Number(prevValues.repayments.month49.payments) + Number(prevValues.repayments.month50.payments) +
                Number(prevValues.repayments.month51.payments) + Number(prevValues.repayments.month52.payments) +
                Number(prevValues.repayments.month53.payments) + Number(prevValues.repayments.month54.payments) +
                Number(prevValues.repayments.month55.payments) + Number(prevValues.repayments.month56.payments) +
                Number(prevValues.repayments.month57.payments) + Number(prevValues.repayments.month58.payments) +
                Number(prevValues.repayments.month59.payments) + Number(prevValues.repayments.month60.payments);

            payment = Math.round((payment + Number.EPSILON) * 100) / 100;

            return {
                ...prevValues,
                repayments: {
                    ...prevValues.repayments,
                    repaymentTotal: {
                        ...prevValues.repayments.repaymentTotal,
                        payments: payment,
                    },
                }
            }
        })

    }, [initPayment.payments, month1.payments, month2.payments, month3.payments, month4.payments, month5.payments,
    month6.payments, month7.payments, month8.payments, month9.payments, month10.payments,
    month11.payments, month12.payments, month13.payments, month14.payments, month15.payments, month16.payments, month17.payments,
    month18.payments, month19.payments, month20.payments, month21.payments, month22.payments, month23.payments, month24.payments,
    month25.payments, month26.payments, month27.payments, month28.payments, month29.payments, month30.payments, month31.payments,
    month32.payments, month33.payments, month34.payments, month35.payments, month36.payments, month37.payments, month38.payments,
    month39.payments, month40.payments, month41.payments, month42.payments, month43.payments, month44.payments, month45.payments,
    month46.payments, month47.payments, month48.payments, month49.payments, month50.payments, month51.payments, month52.payments,
    month53.payments, month54.payments, month55.payments, month56.payments, month57.payments, month58.payments, month59.payments,
    month60.payments, setRepaymentCalc])

    // useEffect for lexisCare for repaymentTotal
    React.useEffect(() => {
        // console.log('lexis care for total called')
        setRepaymentCalc((prevValues) => {
            let care = Number(prevValues.repayments.month1.lexisCare) + Number(prevValues.repayments.month2.lexisCare) +
                Number(prevValues.repayments.month3.lexisCare) + Number(prevValues.repayments.month4.lexisCare) +
                Number(prevValues.repayments.month5.lexisCare) + Number(prevValues.repayments.month6.lexisCare) +
                Number(prevValues.repayments.month7.lexisCare) + Number(prevValues.repayments.month8.lexisCare) +
                Number(prevValues.repayments.month9.lexisCare) + Number(prevValues.repayments.month10.lexisCare) +
                Number(prevValues.repayments.month11.lexisCare) + Number(prevValues.repayments.month12.lexisCare) +
                Number(prevValues.repayments.month13.lexisCare) + Number(prevValues.repayments.month14.lexisCare) +
                Number(prevValues.repayments.month15.lexisCare) + Number(prevValues.repayments.month16.lexisCare) +
                Number(prevValues.repayments.month17.lexisCare) + Number(prevValues.repayments.month18.lexisCare) +
                Number(prevValues.repayments.month19.lexisCare) + Number(prevValues.repayments.month20.lexisCare) +
                Number(prevValues.repayments.month21.lexisCare) + Number(prevValues.repayments.month22.lexisCare) +
                Number(prevValues.repayments.month23.lexisCare) + Number(prevValues.repayments.month24.lexisCare) +
                Number(prevValues.repayments.month25.lexisCare) + Number(prevValues.repayments.month26.lexisCare) +
                Number(prevValues.repayments.month27.lexisCare) + Number(prevValues.repayments.month28.lexisCare) +
                Number(prevValues.repayments.month29.lexisCare) + Number(prevValues.repayments.month30.lexisCare) +
                Number(prevValues.repayments.month31.lexisCare) + Number(prevValues.repayments.month32.lexisCare) +
                Number(prevValues.repayments.month33.lexisCare) + Number(prevValues.repayments.month34.lexisCare) +
                Number(prevValues.repayments.month35.lexisCare) + Number(prevValues.repayments.month36.lexisCare) +
                Number(prevValues.repayments.month37.lexisCare) + Number(prevValues.repayments.month38.lexisCare) +
                Number(prevValues.repayments.month39.lexisCare) + Number(prevValues.repayments.month40.lexisCare) +
                Number(prevValues.repayments.month41.lexisCare) + Number(prevValues.repayments.month42.lexisCare) +
                Number(prevValues.repayments.month43.lexisCare) + Number(prevValues.repayments.month44.lexisCare) +
                Number(prevValues.repayments.month45.lexisCare) + Number(prevValues.repayments.month46.lexisCare) +
                Number(prevValues.repayments.month47.lexisCare) + Number(prevValues.repayments.month48.lexisCare) +
                Number(prevValues.repayments.month49.lexisCare) + Number(prevValues.repayments.month50.lexisCare) +
                Number(prevValues.repayments.month51.lexisCare) + Number(prevValues.repayments.month52.lexisCare) +
                Number(prevValues.repayments.month53.lexisCare) + Number(prevValues.repayments.month54.lexisCare) +
                Number(prevValues.repayments.month55.lexisCare) + Number(prevValues.repayments.month56.lexisCare) +
                Number(prevValues.repayments.month57.lexisCare) + Number(prevValues.repayments.month58.lexisCare) +
                Number(prevValues.repayments.month59.lexisCare) + Number(prevValues.repayments.month60.lexisCare);

            care = Math.round((care + Number.EPSILON) * 100) / 100;

            return {
                ...prevValues,
                repayments: {
                    ...prevValues.repayments,
                    repaymentTotal: {
                        ...prevValues.repayments.repaymentTotal,
                        lexisCare: care,
                    },
                }
            }
        })

    }, [month1.lexisCare, month2.lexisCare, month3.lexisCare, month4.lexisCare, month5.lexisCare,
    month6.lexisCare, month7.lexisCare, month8.lexisCare, month9.lexisCare, month10.lexisCare,
    month11.lexisCare, month12.lexisCare, month13.lexisCare, month14.lexisCare, month15.lexisCare, month16.lexisCare, month17.lexisCare,
    month18.lexisCare, month19.lexisCare, month20.lexisCare, month21.lexisCare, month22.lexisCare, month23.lexisCare, month24.lexisCare,
    month25.lexisCare, month26.lexisCare, month27.lexisCare, month28.lexisCare, month29.lexisCare, month30.lexisCare, month31.lexisCare,
    month32.lexisCare, month33.lexisCare, month34.lexisCare, month35.lexisCare, month36.lexisCare, month37.lexisCare, month38.lexisCare,
    month39.lexisCare, month40.lexisCare, month41.lexisCare, month42.lexisCare, month43.lexisCare, month44.lexisCare, month45.lexisCare,
    month46.lexisCare, month47.lexisCare, month48.lexisCare, month49.lexisCare, month50.lexisCare, month51.lexisCare, month52.lexisCare,
    month53.lexisCare, month54.lexisCare, month55.lexisCare, month56.lexisCare, month57.lexisCare, month58.lexisCare, month59.lexisCare,
    month60.lexisCare, setRepaymentCalc])

    return null;
}

export default RepaymentLogic;
