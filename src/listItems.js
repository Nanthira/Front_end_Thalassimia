import * as React from 'react';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie'; // Import js-cookie
import { useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();
    const [userData, setUserData] = useState({ firstname: '',lastname:'', role: '' });

    useEffect(() => {
        const fetchUserData = async () => {
            const token = Cookies.get('token'); // Get token from cookie

            if (token) {
                try {
                    const response = await fetch('http://localhost:4000/users/get_user_data', {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setUserData(data.data); // Set the user data
                    } else {
                        console.error('Failed to fetch user data:', response.status);
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };

        fetchUserData();
    }, []);

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <React.Fragment>
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
                                <div>Name: {userData.firstname} {userData.lastname}</div> {/* Display username */}
                                <div>User role: {userData.role}</div> {/* Display role */}
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

            <ListItemButton onClick={() => handleNavigation('/approve')}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Approve" />
            </ListItemButton> 

            <ListItemButton onClick={() => handleNavigation('/AllUser')}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="User List" />
            </ListItemButton> 

            <ListItemButton onClick={() => handleNavigation('/recordMulti')}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Upload Picture" />
            </ListItemButton> 

            <ListItemButton onClick={() => handleNavigation('/predict')}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Prediction" />
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
