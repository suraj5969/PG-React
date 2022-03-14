import React from 'react';
import Header from '../NewProposal/Globals/Header';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../admin/Loader';
import getSingleUserDetailsAPI from '../../../apis/admin/getSingleUserDetailsAPI';
toast.configure();

function Profile() {
    
    React.useEffect(()=>{
        document.title = 'User Profile'
    },[]);

    const [userDetails, setUserDetails] = React.useState({});
    const [isData, setIsData] = React.useState(false);

    React.useEffect(() => {
        const fetchData = async () => {
            const user_id = sessionStorage.getItem('user_id');
            if (Number(user_id)) {
                const userDetails = await getSingleUserDetailsAPI(Number(user_id));
                if (userDetails.status !== 200) {
                    console.log('getSingleUserDetailsAPI no working');
                }
                else {
                    if (typeof userDetails.data === 'object' && userDetails.data.length > 0) {
                        setUserDetails(userDetails.data[0]);
                        setIsData(true);
                    }
                }
            }
        }
        fetchData();
    }, [])

    return (
        <>
            <CssBaseline />
            <Header />
            {
                !isData
                    ? <Loader />
                    : <>
                        <Container maxWidth="xl">
                            <Paper elevation={3} sx={{ marginBottom: '25px', alignItems: 'center', width: '100%', background: 'linear-gradient(40deg,#4db6ac,#26a69a)' }}>
                                <Typography variant="h5" style={{ padding: '15px 0', color: 'white', textAlign: 'center' }}>
                                    User Profile
                                </Typography>
                            </Paper>
                            <Container maxWidth="sm">
                                <Stack spacing={2} >
                                    <Stack spacing={1} direction={"row"} sx={{ alignItems: 'center' }}>
                                        <Typography sx={{ width: '30%' }} variant="subtitle1">First Name</Typography>
                                        <TextField
                                            value={userDetails?.fname}
                                            disabled
                                            // sx={{maxWidth: '300px'}}
                                            variant="outlined"
                                            fullWidth />
                                    </Stack>
                                    <Stack spacing={1} direction={"row"} sx={{ alignItems: 'center' }}>
                                        <Typography sx={{ width: '30%' }} variant="subtitle1">Last Name</Typography>
                                        <TextField
                                            value={userDetails?.lname}
                                            disabled
                                            variant="outlined"
                                            fullWidth />
                                    </Stack>
                                    <Stack spacing={1} direction={"row"} sx={{ alignItems: 'center' }}>
                                        <Typography sx={{ width: '30%' }} variant="subtitle1">Email</Typography>
                                        <TextField
                                            value={userDetails?.email}
                                            disabled
                                            variant="outlined"
                                            fullWidth />
                                    </Stack>
                                    <Stack spacing={1} direction={"row"} sx={{ alignItems: 'center' }}>
                                        <Typography sx={{ width: '30%' }} variant="subtitle1">Phone</Typography>
                                        <TextField
                                            value={userDetails?.phone}
                                            disabled
                                            variant="outlined"
                                            fullWidth />
                                    </Stack>
                                    <Stack spacing={1} direction={"row"} sx={{ alignItems: 'center' }}>
                                        <Typography sx={{ width: '30%' }} variant="subtitle1">Country</Typography>
                                        <TextField
                                            value={userDetails?.country}
                                            disabled
                                            variant="outlined"
                                            fullWidth />
                                    </Stack>
                                    <Stack spacing={1} direction={"row"} sx={{ alignItems: 'center' }}>
                                        <Typography sx={{ width: '30%' }} variant="subtitle1">Address</Typography>
                                        <TextField
                                            value={userDetails?.address}
                                            disabled
                                            variant="outlined"
                                            fullWidth />
                                    </Stack>
                                </Stack>
                            </Container>
                        </Container>
                    </>
            }
        </>
    )
}

export default Profile;
