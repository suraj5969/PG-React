import React from 'react';
import AttendingCoursesLogic from './AttendingCoursesLogic';
import DefaultServicesLogic from './DefaultServicesLogic';
import MiscellaneousLogic from './MiscellaneousLogic';
import OptionalServicesLogic from './OptionalServicesLogic';

function ImplementationLogic(props) {
    return (
        <>
            <AttendingCoursesLogic
                clientProfile={props.clientProfile}
                // Info={props.Info}
                attendingCourses={props.attendingCourses}
                setAttendingCourses={props.setAttendingCourses}
            />

            <DefaultServicesLogic
                clientProfile={props.clientProfile}
                Info={props.Info}
                attendingCourses={props.attendingCourses}
                // setAttendingCourses={props.setAttendingCourses}
                defaultServicesValues={props.defaultServicesValues}
                setDefaultServicesValues={props.setDefaultServicesValues}
            />

            <OptionalServicesLogic
                clientProfile={props.clientProfile}
                Info={props.Info}
                attendingCourses={props.attendingCourses}
                defaultServicesValues={props.defaultServicesValues}
                optionalServices={props.optionalServices}
                setOptionalServices={props.setOptionalServices}
                optionalPopupsState={props.optionalPopupsState}
                setOptionalPopupsState={props.setOptionalPopupsState}
                setUpfrontCost={props.setUpfrontCost}
                affinityMobilePopUpValue={props.affinityMobilePopUpValue}
                setAffinityMobilePopUpValue={props.setAffinityMobilePopUpValue}
                empowerModules={props.empowerModules}
                setEmpowerModules={props.setEmpowerModules}
                settlementPopUpValue={props.settlementPopUpValue}
                setSettlementPopUpValue={props.setSettlementPopUpValue}
            />

            <MiscellaneousLogic
                clientProfile={props.clientProfile}
                miscellaneous={props.miscellaneous}
                setMiscellaneous={props.setMiscellaneous}
                // miscellaneousPopupsState={props.miscellaneousPopupsState}
                setMiscellenousPopupsState={props.setMiscellenousPopupsState}
                affinityServerPopupValues={props.affinityServerPopupValues}
                setAffinityServerPopupValues={props.setAffinityServerPopupValues}
            />
        </>
    )
}

export default ImplementationLogic;
