import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MenuIcon from "@mui/icons-material/Menu";
import List from '@mui/material/List';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import { MainListItems } from "./listItems";

const drawerWidth = 330;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: "border-box",
        ...(!open && {
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up("sm")]: {
                width: theme.spacing(7),
            },
        }),
    },
}));

const defaultTheme = createTheme();

export default function Approve() {
    const [open, setOpen] = useState(true);
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState({});
    const [roles, setRoles] = useState({});

    const toggleDrawer = () => {
        setOpen(!open);
    };

    // Fetch users from the API
    useEffect(() => {
        const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];

        fetch('http://localhost:4000/users/find/all', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 200) {
                const filteredUsers = data.data.filter(user => user.user_status === 'notApproved');
                setUsers(filteredUsers);
                const initialRoles = filteredUsers.reduce((acc, user) => {
                    acc[user.email] = user.role;
                    return acc;
                }, {});
                setRoles(initialRoles);
            }
        });
    }, []);

    const handleSelectUser = (email) => {
        setSelectedUsers({
            ...selectedUsers,
            [email]: !selectedUsers[email]
        });
    };


    const handleApprove = () => {
        const approvedUsers = users.filter(user => selectedUsers[user.email]);

        const promises = approvedUsers.map(user => {
            return fetch(`http://localhost:4000/users/approve`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwMDA2LCJ1c2VybmFtZSI6InBhdGlwYXJuIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MjkzMjQxMTUsImV4cCI6MTcyOTMyNzcxNX0.AC13hpFhnEQsy7eleCfwQGfJNpTkxSLHjd1TO-fijPo'
                },
                body: JSON.stringify({
                    userId: user.user_id,
                    role: roles[user.email],
                })
            });
        });

        Promise.all(promises)
            .then(responses => {
                console.log('Users approved successfully:', responses);
                // Fetch users again or update the state to reflect approved users
                setUsers(prevUsers => prevUsers.filter(user => !selectedUsers[user.email]));
            })
            .catch(error => {
                console.error('Error approving users:', error);
            });
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar sx={{ pr: "24px" }}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: "36px",
                                ...(open && { display: "none" }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            Approve Users
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", px: [1] }}>
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        <MainListItems open={open} />
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) => theme.palette.mode === "light"
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                        flexGrow: 1,
                        height: "100vh",
                        overflow: "auto",
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Paper sx={{ p: 2, display: "flex", flexDirection: "column", height: 'auto' }}>
                                    <Typography variant="h6">Users Pending Approval</Typography>
                                    {users.length > 0 ? (
                                        users.map(user => (
                                            <ListItem key={user.email}>
                                                <Checkbox
                                                    checked={!!selectedUsers[user.email]}
                                                    onChange={() => handleSelectUser(user.email)}
                                                />
                                                <ListItemText
                                                    primary={`${user.firstname} ${user.lastname}`}
                                                    secondary={user.email}
                                                />
                                            </ListItem>
                                        ))
                                    ) : (
                                        <Typography>No users pending approval</Typography>
                                    )}
                                    <Button variant="contained" color="primary" onClick={handleApprove}>
                                        Approve Selected Users
                                    </Button>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
