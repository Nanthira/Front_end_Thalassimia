import * as React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Paper from '@mui/material/Paper';
import Grid from "@mui/material/Grid";

export const MainListItems = ({ open }) => {
    const navigate = useNavigate(); // Initialize the navigate function

    const handleNavigation = (path) => {
        navigate(path); // Navigate to the specified path
    };

    return (
        <React.Fragment>
            {/* Conditionally render the Profile card */}
            {open && (
                <Grid item xs={12} md={4}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 'flex',
                                }}
                            >
                                Name: 
                                User role: 
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            )}
            <ListItemButton onClick={() => handleNavigation('/home')}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
            </ListItemButton>
            <ListItemButton onClick={() => handleNavigation('/record')}>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Record" />
            </ListItemButton>
            <ListItemButton onClick={() => handleNavigation('/profile')}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
            </ListItemButton>
            <ListItemButton onClick={() => handleNavigation('/signin')}>
                <ListItemIcon>
                    <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Log Out" />
            </ListItemButton>
        </React.Fragment>
    );
};
