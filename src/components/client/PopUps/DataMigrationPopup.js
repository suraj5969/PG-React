import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import PropTypes from 'prop-types';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import getAllDataMigrationOptions from '../../../apis/client/getAllDataMigrationOptionsAPI'

const lodashFilter = require('lodash.filter');

export default function DataMigrationPopup(props) {
    const { onClose, open, clientProfile, ...other } = props;
    const [migrationId, setMigrationId] = React.useState('');

    const [allOptions, setAllOptions] = React.useState([]);
    const [currentOpts, setCurrentOpts] = React.useState([]);

    const PriceinputRef = React.useRef(null);
    const handlePricePopEntering = () => {
        if (PriceinputRef.current != null) {
            PriceinputRef.current.focus();
        }
    };

    React.useEffect(() => {
        if (!open) {
            setMigrationId('');
        }
    }, [open]);

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await getAllDataMigrationOptions();
            if (result.status !== 200) {
                console.log('data migration api no working');
            }
            else {
                if (result.data.length > 0) {
                    setAllOptions(result.data);
                    // console.log(result.data, 'data migration');
                }
            }
        }
        fetchData();
    }, [setAllOptions])

    React.useEffect(() => {
        if (clientProfile.country !== '' && allOptions.length > 0) {
            const c_name = clientProfile.country === 'Australia' ? 'australia' : 'new_zealand';
            const options = lodashFilter(allOptions, { [c_name]: 1 });
            setCurrentOpts(options);
        }
        else {
            setCurrentOpts(allOptions);
        }

    }, [clientProfile.country, allOptions])

    const handleCancel = () => {
        onClose(false);
    };

    const handleOk = (price) => {
        // onClose(value);
        const value = lodashFilter(currentOpts, { 'migration_id': Number(migrationId) });
        // console.log(typeof migrationId);
        if (value.length > 0) {
            if (!isNaN(Number(price))) {
                value[0].tsg = 14;
                value[0].more_than_ten_cost = Number(price);
            }
            onClose(value[0]);
        }
        else {
            onClose(false);
        }
    };

    const handleChange = (event) => {
        setMigrationId(event.target.value);
        const value = Number(event.target.value);
        // we have hardcoded the maigration_id of POA data migrations
        if (value === 1 || value === 2 || value === 3 ||
            value === 4 || value === 5 || value === 6) {
            setPricePopOpen(true);
        }
    };

    const [pricePopOpen, setPricePopOpen] = React.useState(false);
    const [priceValue, setPriceValue] = React.useState('');

    function isStringInteger(value) {
        return /^[0-9]*$/.test(value);
    }
    const handlePriceChange = (event) => {
        if (isStringInteger(event.target.value)) {
            setPriceValue(event.target.value);
            setPriceValueRequired(false);
        }
    }

    const [priceValueRequired, setPriceValueRequired] = React.useState(false);

    const handlePriceCancel = () => {
        setPricePopOpen(false);
        setMigrationId('');
    }

    const handlePriceOk = () => {
        if (priceValue === '') {
            setPriceValueRequired(true);
            return;
        }
        setPricePopOpen(false);
        handleOk(priceValue);
    }

    return (
        <>
            <Dialog
                sx={{ '& .MuiDialog-paper': { width: '80%', height: '80vh', maxHeight: 500 } }}
                maxWidth="sm"
                open={open}
                {...other}
            >
                <DialogTitle>Data Migration Required?</DialogTitle>
                <DialogContent dividers>
                    <RadioGroup
                        value={migrationId}
                        onChange={handleChange}
                    >
                        {/*  we are giving popup for entering price with checking migrations_id .*/}
                        {/* so always update the correct ids for particular data migration from DB to make it work correctly  */}
                        {/* or do some other logic to trigger the enter price popup open */}
                        {currentOpts.map((option) => (
                            <FormControlLabel
                                sx={{ my: 0.6 }}
                                value={option.migration_id}
                                key={option.migration_id}
                                control={<Radio />}
                                label={option.migration_name}
                            />
                        ))}
                    </RadioGroup>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button onClick={handleOk}>Ok</Button>
                </DialogActions>
            </Dialog>

            <Dialog
                sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: '300px', maxWidth: '500px' } }}
                maxWidth="sm"
                TransitionProps={{ onEntering: handlePricePopEntering }}
                open={pricePopOpen}
            >
                <DialogTitle>Enter Price for Data Migration</DialogTitle>
                <DialogContent dividers>
                    <Box sx={{
                        display: 'flex', flexWrap: 'wrap',
                        alignItems: 'center', justifyContent: 'center'
                    }}>

                        <Stack spacing={1}>
                            <Typography variant="body">Enter Price </Typography>
                            <FormControl variant="outlined">
                                <OutlinedInput
                                    inputRef={PriceinputRef}
                                    inputProps={{ style: { textAlign: 'center' }, maxLength: 6 }}
                                    sx={{ height: '35px', width: '200px' }}
                                    value={priceValue}
                                    onChange={handlePriceChange}
                                />
                            </FormControl>
                            {priceValueRequired ? <Typography variant="subtitle2" style={{ color: 'red' }}> This field is required! </Typography> : ''}
                        </Stack>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handlePriceCancel}>
                        Cancel
                    </Button>
                    <Button onClick={handlePriceOk}>Ok</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

DataMigrationPopup.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};
