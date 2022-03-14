import React from 'react'
import getProductInfoByIdAPI from '../../../../../../apis/client/getProductInfoByIdAPI.js';


function MiscellaneousLogic(props) {

    const { clientProfile, miscellaneous, setMiscellaneous } = props;

    const { affinityServer, scopingStudy, propertyPresidency } = miscellaneous;


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
