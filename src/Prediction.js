import * as React from 'react';
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
import { MainListItems } from "./listItems";
import Paper from "@mui/material/Paper";
import MenuIcon from "@mui/icons-material/Menu";
import List from '@mui/material/List';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';

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

export default function Prediction() {
    const [open, setOpen] = useState(true);
    const [userId, setUserId] = useState('');
    const [images, setImages] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const fetchImages = async () => {
        try {
            const response = await fetch('http://localhost:4000/pictures/get-images-by-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId }),
            });

            const data = await response.json();
            if (data.status === 200) {
                setImages(data.data);
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    const handleImageSelect = (fileName) => {
        if (selectedImages.includes(fileName)) {
            setSelectedImages(selectedImages.filter(name => name !== fileName));
        } else {
            setSelectedImages([...selectedImages, fileName]);
        }
    };

    const handlePrediction = async () => {
        // Call the prediction API here (not implemented yet)
        console.log('Selected images for prediction:', selectedImages);
        // Implement your prediction logic here
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar sx={{ pr: "24px" }}>
                        <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={toggleDrawer} sx={{ marginRight: "36px", ...(open && { display: "none" }) }}>
                            <MenuIcon />
                        </IconButton>
                        <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                            Prediction Dashboard
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
                <Box component="main" sx={{ backgroundColor: (theme) => theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900], flexGrow: 1, height: "100vh", overflow: "auto" }}>
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            {/* User ID Input */}
                            <Grid item xs={12} md={8} lg={12}>
                                <Paper sx={{ p: 2, display: "flex", flexDirection: "column", height: 'auto' }}>
                                    <TextField
                                        label="User ID"
                                        variant="outlined"
                                        value={userId}
                                        onChange={(e) => setUserId(e.target.value)}
                                        fullWidth
                                    />
                                    <Button variant="contained" color="primary" onClick={fetchImages} sx={{ mt: 2 }}>
                                        Fetch Images
                                    </Button>
                                </Paper>
                            </Grid>

                            {/* Images Display */}
                            <Grid item xs={12} md={8} lg={12}>
                                <Paper sx={{ p: 2, display: "flex", flexDirection: "column", height: 'auto' }}>
                                    <Typography variant="h6">Select Images for Prediction:</Typography>
                                    {images.map((image) => (
                                        <div key={image.fileName} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                            <Checkbox
                                                checked={selectedImages.includes(image.fileName)}
                                                onChange={() => handleImageSelect(image.fileName)}
                                            />
                                            <img
                                                src={`http://localhost:4000/${image.fileUrl}`}
                                                alt={image.fileName}
                                                style={{ width: '100px', height: 'auto', marginRight: '10px' }}
                                            />
                                            <Typography variant="body1">{image.fileName}</Typography>
                                        </div>
                                    ))}
                                    <Button variant="contained" color="success" onClick={handlePrediction} sx={{ mt: 2 }}>
                                        Predict
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
