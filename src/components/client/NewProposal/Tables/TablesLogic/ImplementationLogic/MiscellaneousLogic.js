import React from 'react'
import getProductInfoByIdAPI from '../../../../../../apis/client/getProductInfoByIdAPI.js';


function MiscellaneousLogic(props) {

    const { clientProfile, miscellaneous, setMiscellaneous,
        affinityServerPopupValues, setAffinityServerPopupValues } = props;

    const { affinityServer, scopingStudy, propertyPresidency } = miscellaneous;


    const [productInfos, setProductInfos] = React.useState({})
    React.useEffect(() => {
        (async () => {
            const product = await getProductInfoByIdAPI('1532488');
            if (product.status !== 200) {
                console.log('getProductInfoByIdAPI api not working')
            }
            else {
                if (typeof product.data === 'object' && product.data.length > 0) {
                    const values = {};
                    product.data.forEach((product) => {
                        values[product.BU_NAME] = product.STD_UNIT_PRICE_AMT
                    })
                    setProductInfos((prevValues) => ({
                        ...prevValues,
                        "1532488": values
                    }))
                }
            }
        })();
    }, [])

    React.useEffect(() => {
        if (affinityServerPopupValues.typeOfLicense === 'Named User') {
            const numOfUsers = clientProfile.numOfUsers;
            const users = Number(numOfUsers) < 10 ? 10
                : Number(numOfUsers) % 5 === 0 ? Number(numOfUsers)
                    : Number(numOfUsers) + (5 - (Number(numOfUsers) % 5));

            setAffinityServerPopupValues((prevValues) => ({
                ...prevValues,
                numOfUsers: users,
                serverLicense: '',
            }));

            if (clientProfile.country !== '' && productInfos['1532488']) {
                const price = users * Number(productInfos['1532488'][clientProfile.country]);
                setAffinityServerPopupValues((prevValues) => ({
                    ...prevValues,
                    oracleLicense: (price).toFixed(2),
                    maintenance: (price * 0.25).toFixed(2),
                    total: (price + price * 0.25).toFixed(2)
                }));
            }
        }

    }, [clientProfile.numOfUsers, clientProfile.country])

    // affinityServer CPU pop up values 
    React.useEffect(() => {
        if (affinityServer.included === '') {
            setMiscellaneous((prevValue) => ({
                ...prevValue,
                affinityServer: {
                    ...prevValue.affinityServer,
                    hours: 0,
                    price: 0,
                }
            }))
        }
    }, [affinityServer.included, setMiscellaneous])

    // additionalReturn included
    React.useEffect(() => {
        if (clientProfile.objective === 'Upsell') {
            setMiscellaneous((prevValue) => ({
                ...prevValue,
                additionalReturn: {
                    ...prevValue.additionalReturn,
                    included: 0
                }
            }))
        }
    }, [clientProfile.objective, setMiscellaneous])

    // scoping Stydy pop up values 
    React.useEffect(() => {
        if (scopingStudy.included !== 'Yes') {
            setMiscellaneous((prevValue) => ({
                ...prevValue,
                scopingStudy: {
                    ...prevValue.scopingStudy,
                    hours: 0,
                    price: 0
                }
            }))
        }
    }, [scopingStudy.included, setMiscellaneous])

    const [scopingProductPrice, setScopingProductPrice] = React.useState([]);
    React.useEffect(() => {
        const fetchData = async () => {
            const scoping = await getProductInfoByIdAPI('1532491');
            if (scoping.status !== 200) {
                console.log('getProductInfoByIdAPI api not working')
            }
            else {
                if (typeof scoping.data === 'object' && scoping.data.length > 0) {
                    setScopingProductPrice(scoping.data);
                }
            }
        }
        fetchData();
    }, [setScopingProductPrice])

    //scopingStudy price
    React.useEffect(() => {
        let price = 0;
        if (clientProfile.country !== '') {
            const product = scopingProductPrice.filter((product) => product.BU_NAME === clientProfile.country);
            if (product.length > 0) {
                price = Number(product[0].STD_UNIT_PRICE_AMT);
            }
        }
        // console.log(product)
        setMiscellaneous((prevValue) => ({
            ...prevValue,
            scopingStudy: {
                ...prevValue.scopingStudy,
                price: Number(prevValue.scopingStudy.hours) * price,
            }
        }))
    }, [miscellaneous.scopingStudy.hours, clientProfile.country, scopingProductPrice, setMiscellaneous])


    // propertyPresidency included
    React.useEffect(() => {
        if (clientProfile.country !== 'New Zealand') {
            setMiscellaneous((prevValue) => ({
                ...prevValue,
                propertyPresidency: {
                    ...prevValue.propertyPresidency,
                    included: 'No'
                }
            }))
        }
    }, [clientProfile.country, setMiscellaneous])

    // propertyPresidency price
    React.useEffect(() => {
        if (propertyPresidency.included !== 'Yes') {
            setMiscellaneous((prevValue) => ({
                ...prevValue,
                propertyPresidency: {
                    ...prevValue.propertyPresidency,
                    price: 0
                }
            }))
        }
    }, [propertyPresidency.included, setMiscellaneous])


    return null;
}

export default MiscellaneousLogic;
