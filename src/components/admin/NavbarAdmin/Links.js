import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Typography, Button } from '@material-ui/core';
import { useStyles } from './styles';

import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import FlipToFrontRoundedIcon from '@material-ui/icons/FlipToFrontRounded';
import BuildRoundedIcon from '@material-ui/icons/BuildRounded';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import ComputerRoundedIcon from '@material-ui/icons/ComputerRounded';
import HeadsetMicRoundedIcon from '@material-ui/icons/HeadsetMicRounded';
import ContactPhoneRoundedIcon from '@material-ui/icons/ContactPhoneRounded';
import ViewDayRoundedIcon from '@material-ui/icons/ViewDayRounded';
import CategoryRoundedIcon from '@material-ui/icons/CategoryRounded';
import AccessAlarmRoundedIcon from '@material-ui/icons/AccessAlarmRounded';
import StorageRoundedIcon from '@material-ui/icons/StorageRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import WorkspacesRoundedIcon from '@mui/icons-material/WorkspacesRounded';

function Links() {

    const styles = useStyles();
    const history = useHistory();

    return (
        <>
            <Button
                component={NavLink}
                to="/admin/user-management"
                className={styles.listItem}
            >
                <PeopleAltRoundedIcon
                    className={styles.icon} />
                <Typography
                    variant={'h6'}
                    className={styles.linkTextActive}
                >User Management</Typography>
            </Button>
            <Button
                component={NavLink}
                to="/admin/migration-options"
                onClick={() => history.push("/admin/migration-options")}
                className={styles.listItem}
            >
                <FlipToFrontRoundedIcon
                    className={styles.icon}
                />
                <Typography variant={'h6'} className={styles.linkText}>Migration Options</Typography>
            </Button>
            <Button
                component={NavLink}
                to="/admin/trainings/"
                className={styles.listItem}
            >
                <BuildRoundedIcon
                    className={styles.icon}
                />
                <Typography variant={'h6'} className={styles.linkText}>Training Methodology</Typography>
            </Button>
            <Button
                component={NavLink}
                to="/admin/product-list/"
                className={styles.listItem}
            >
                <ShoppingCartRoundedIcon
                    className={styles.icon}
                />
                <Typography variant={'h6'} className={styles.linkText}>Product List</Typography>
            </Button>
            <Button
                to="/admin/software-management"
                component={NavLink}
                className={styles.listItem}
            >
                <ComputerRoundedIcon
                    className={styles.icon}
                />
                <Typography variant={'h6'} className={styles.linkText}>Software Management</Typography>
            </Button>
            <Button
                to="/admin/quick-services"
                component={NavLink}
                className={styles.listItem}
            >
                <HeadsetMicRoundedIcon className={styles.icon} />
                <Typography variant={'h6'} className={styles.linkText}>Quick Start Services</Typography>
            </Button>
            <Button
                to="/admin/contact-details"
                component={NavLink}
                className={styles.listItem}
            >
                <ContactPhoneRoundedIcon
                    className={styles.icon}
                />
                <Typography variant={'h6'} className={styles.linkText}>Contact Details</Typography>
            </Button>
            <Button
                to="/admin/gst-percentage"
                component={NavLink}
                className={styles.listItem}
            >
                <CategoryRoundedIcon
                    className={styles.icon}
                />
                <Typography variant={'h6'} className={styles.linkText}>GST Percentage</Typography>
            </Button>
            <Button
                to="/admin/workflow-approval"
                component={NavLink}
                className={styles.listItem}
            >
                <WorkspacesRoundedIcon
                    className={styles.icon}
                />
                <Typography variant={'h6'} className={styles.linkText}>Workflow Approval</Typography>
            </Button>
            <Button
                to="/admin/day-convertion"
                component={NavLink}
                className={styles.listItem}
            >
                <ViewDayRoundedIcon
                    className={styles.icon}
                />
                <Typography variant={'h6'} className={styles.linkText}>Day Conversion</Typography>
            </Button>
            <Button
                to="/admin/hours-per-day"
                component={NavLink}
                className={styles.listItem}
            >
                <AccessAlarmRoundedIcon className={styles.icon} />
                <Typography variant={'h6'} className={styles.linkText}>Hours Per Day</Typography>
            </Button>
            <Button
                to="/admin/oracle-wording"
                component={NavLink}
                className={styles.listItem}
            >
                <StorageRoundedIcon className={styles.icon} />
                <Typography variant={'h6'} className={styles.linkText}>Oracle Wording</Typography>
            </Button>
            <Button
                to="/admin/miscellaneous"
                component={NavLink}
                className={styles.listItem}
            >
                <SettingsRoundedIcon className={styles.icon} />
                <Typography variant={'h6'} className={styles.linkText}>Miscellaneous</Typography>
            </Button>
        </>
    )
}

export default Links
