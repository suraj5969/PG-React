import React from 'react';
import UpfrontCostLogic from './UpfrontCostLogic';
import OngoingMaintenanceLogic from './OngoingMaintenanceLogic';

function InvestmentLogic(props) {
    return (
        <>
            <UpfrontCostLogic
                clientProfile={props.clientProfile}
                Info={props.Info}
                attendingCourses={props.attendingCourses}
                defaultServicesValues={props.defaultServicesValues}
                optionalServices={props.optionalServices}
                miscellaneous={props.miscellaneous}
                upfrontCost={props.upfrontCost}
                setUpfrontCost={props.setUpfrontCost}
                affinityServerPopupValues={props.affinityServerPopupValues}
            />

            <OngoingMaintenanceLogic
                clientProfile={props.clientProfile}
                ongoingMnt={props.ongoingMnt}
                setOngoingMnt={props.setOngoingMnt}
                upfrontCost={props.upfrontCost}
                miscellaneous={props.miscellaneous}
                affinityServerPopupValues={props.affinityServerPopupValues}
            />
        </>
    )
}

export default InvestmentLogic
