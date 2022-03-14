import React from 'react'

function AttendingCoursesLogic(props) {

    const { attendingCourses, setAttendingCourses, clientProfile } = props;

    React.useEffect(() => {

        // console.log('operations use effect  called')
        setAttendingCourses((prevValue) => {
            let users = Number(clientProfile.numOfUsers);
            let value = Number(prevValue.operationsAdmin);

            if (value <= users) {
                return {
                    ...prevValue,
                    endUserAccount: users - value
                }
            }
            else {
                return {
                    ...prevValue,
                    endUserAccount: 0,
                    operationsAdmin: 0
                }
            }
        })

    }, [clientProfile.numOfUsers, setAttendingCourses,
    attendingCourses.operationsAdmin])


    React.useEffect(() => {
        // console.log('account bps use effect  called')
        setAttendingCourses((prevValue) => {
            let users = Number(clientProfile.numOfUsers);
            let value = Number(prevValue.dataforms);

            if (value <= users) {
                return {
                    ...prevValue,
                    endUserBPA: users - value
                }
            }
            else {
                return {
                    ...prevValue,
                    endUserBPA: 0,
                    dataforms: 0
                }
            }
        })

    }, [clientProfile.numOfUsers, setAttendingCourses,
    attendingCourses.dataforms])

    return null;

}

export default AttendingCoursesLogic;
