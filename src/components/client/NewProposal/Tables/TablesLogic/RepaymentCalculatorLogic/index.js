import React from 'react';
import RepaymentLogic from './RepaymentLogic';

function RepaymentCalculatorLogic(props) {
    return (
        <>
            <RepaymentLogic
                clientProfile={props.clientProfile}
                upfrontCost={props.upfrontCost}
                ongoingMnt={props.ongoingMnt}
                repaymentCalc={props.repaymentCalc}
                setRepaymentCalc={props.setRepaymentCalc}
                discountTable={props.discountTable}
                setDiscountTable={props.setDiscountTable}
            />
        </>
    )
}

export default RepaymentCalculatorLogic;
