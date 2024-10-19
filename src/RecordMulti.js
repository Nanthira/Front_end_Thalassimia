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
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { useNavigate } from 'react-router-dom';

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

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const defaultTheme = createTheme();

export default function Record() {
    const [open, setOpen] = React.useState(true);
    const [selectedFiles, setSelectedFiles] = React.useState([]);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [uploadSuccess, setUploadSuccess] = React.useState(false);
    const [userId, setUserId] = React.useState('');  // New state for userId input
    const [userIdError, setUserIdError] = React.useState('');  // Error message state for invalid userId
    const navigate = useNavigate();

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files);
    };

    const handleUpload = async () => {
        if (!selectedFiles.length) {
            alert("Please select at least one file to upload.");
            return;
        }

        if (!userId) {
            setUserIdError("Please enter a user ID.");
            return;
        }

        const formData = new FormData();
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append("images", selectedFiles[i]);
        }
        formData.append("userId", userId);  // Attach userId to the form data

        try {
            const response = await fetch('http://localhost:4000/pictures/upload-multiple', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setUploadSuccess(true);
                setDialogOpen(true);
                setTimeout(() => {
                    setDialogOpen(false);
                    navigate("/home");
                }, 2000);
            } else {
                const errorData = await response.json();
                setUserIdError(errorData.error || "Upload failed. Please try again.");
            }
        } catch (error) {
            console.error('Error uploading files:', error);
        }
    };

    const handleUserIdChange = (event) => {
        setUserId(event.target.value);
        setUserIdError('');  // Clear error when user starts typing
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: "24px",
                        }}
                    >
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
                            Dashboard
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            px: [1],
                        }}
                    >
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
                        backgroundColor: (theme) =>
                            theme.palette.mode === "light"
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
                            {/* User ID Input */}
                            <Grid item xs={12} md={8} lg={12}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: "flex",
                                        flexDirection: "column",
                                        height: 100,
                                    }}
                                >
                                    <TextField
                                        label="User ID"
                                        variant="outlined"
                                        value={userId}
                                        onChange={handleUserIdChange}
                                        error={Boolean(userIdError)}
                                        helperText={userIdError}
                                    />
                                </Paper>
                            </Grid>

                            {/* File Upload */}
                            <Grid item xs={12} md={8} lg={12}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: "flex",
                                        flexDirection: "column",
                                        height: 100,
                                    }}
                                >
                                    <Button
                                        component="label"
                                        role={undefined}
                                        variant="contained"
                                        startIcon={<CloudUploadIcon />}
                                    >
                                        Select Files
                                        <VisuallyHiddenInput
                                            type="file"
                                            multiple
                                            onChange={handleFileChange}
                                        />
                                    </Button>
                                    <Typography variant="body1" sx={{ mt: 1 }}>
                                        {selectedFiles.length > 0
                                            ? `${selectedFiles.length} file(s) selected`
                                            : 'No files selected'}
                                    </Typography>
                                </Paper>
                            </Grid>

                            {/* Upload Button */}
                            <Grid item xs={12} md={8} lg={12}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleUpload}
                                >
                                    Upload
                                </Button>
                            </Grid>
                        </Grid>

                        {/* Dialog */}
                        <Dialog
                            open={dialogOpen}
                            onClose={() => setDialogOpen(false)}
                        >
                            <DialogContent>
                                <DialogContentText>
                                    Upload {uploadSuccess ? 'successful!' : 'failed.'}
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setDialogOpen(false)}>Close</Button>
                            </DialogActions>
                        </Dialog>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
