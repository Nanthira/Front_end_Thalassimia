import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";
import Cookies from 'js-cookie'; // For handling cookies

const defaultTheme = createTheme();

export default function SignInSide({ onLogin, onToggleForm }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        
        try {
            const response = await fetch("http://localhost:4000/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const result = await response.json();

            if (response.ok) {
                // Store token in cookie
                Cookies.set('token', result.token, { expires: 1 }); // expires in 1 day

                if (result.status === "approved") {
                    setDialogOpen(true);
                    setTimeout(() => {
                        setDialogOpen(false);
                        onLogin(); // Call onLogin to update isAuthenticated state
                    }, 2000);
                } else {
                    setAlertMessage("User not approved");
                    setAlertOpen(true);
                }
            } else {
                setAlertMessage(result.error || "Login failed");
                setAlertOpen(true);
            }
        } catch (error) {
            setAlertMessage("An error occurred");
            setAlertOpen(true);
        } finally {
            setLoading(false);
        }
    };

    const handleCloseAlert = () => {
        setAlertOpen(false);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: "100vh" }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage:
                            'url("/static/images/templates/templates-images/sign-in-side-bg.png")',
                        backgroundColor: (t) =>
                            t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: "cover",
                        backgroundPosition: "left",
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
                                Sign In
                                {loading && <CircularProgress size={24} sx={{ ml: 2 }} />}
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="forgot" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="signUp" variant="body2" onClick={onToggleForm}>
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Snackbar
                open={alertOpen}
                autoHideDuration={6000}
                onClose={handleCloseAlert}
            >
                <Alert onClose={handleCloseAlert} severity="error">
                    {alertMessage}
                </Alert>
            </Snackbar>
            <Dialog
                open={dialogOpen}
                onClose={handleCloseDialog}
                aria-labelledby="success-dialog-title"
            >
                <DialogTitle id="success-dialog-title">Login Success</DialogTitle>
                <DialogContent>
                    <Typography>Login successful. Redirecting...</Typography>
                </DialogContent>
            </Dialog>
        </ThemeProvider>
    );
}


// import * as React from "react";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
// import Paper from "@mui/material/Paper";
// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Typography from "@mui/material/Typography";
// import { createTheme, ThemeProvider } from "@mui/material/styles";

// function Copyright(props) {
//     return (
//         <Typography variant="body2" color="text.secondary" align="center" {...props}>
//             {"Copyright © "}
//             <Link color="inherit" href="https://mui.com/">
//             System for disease screening and analysis of Thalassemia and Anemia risk
//             </Link>{" "}
//             {new Date().getFullYear()}
//             {"."}
//         </Typography>
//     );
// }

// const defaultTheme = createTheme();

// export default function SignInSide({ onLogin, onToggleForm }) {
//     const handleSubmit = (event) => {
//         event.preventDefault();
//         const data = new FormData(event.currentTarget);
//         console.log({
//             username: data.get("username"),
//             password: data.get("password"),
//         });
//         onLogin(); // Call onLogin to update isAuthenticated state
//     };

//     return (
//         <ThemeProvider theme={defaultTheme}>
//             <Grid container component="main" sx={{ height: "100vh" }}>
//                 <CssBaseline />
//                 <Grid
//                     item
//                     xs={false}
//                     sm={4}
//                     md={7}
//                     sx={{
//                         backgroundImage:
//                             'url("/static/images/templates/templates-images/sign-in-side-bg.png")',
//                         backgroundColor: (t) =>
//                             t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
//                         backgroundSize: "cover",
//                         backgroundPosition: "left",
//                     }}
//                 />
//                 <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
//                     <Box
//                         sx={{
//                             my: 8,
//                             mx: 4,
//                             display: "flex",
//                             flexDirection: "column",
//                             alignItems: "center",
//                         }}
//                     >
//                         <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//                             <LockOutlinedIcon />
//                         </Avatar>
//                         <Typography component="h1" variant="h5">
//                             Sign in
//                         </Typography>
//                         <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
//                             <TextField
//                                 margin="normal"
//                                 required
//                                 fullWidth
//                                 id="username"
//                                 label="Username"
//                                 name="username"
//                                 autoComplete="username"
//                                 autoFocus
//                             />
//                             <TextField
//                                 margin="normal"
//                                 required
//                                 fullWidth
//                                 name="password"
//                                 label="Password"
//                                 type="password"
//                                 id="password"
//                                 autoComplete="current-password"
//                             />
//                             <FormControlLabel
//                                 control={<Checkbox value="remember" color="primary" />}
//                                 label="Remember me"
//                             />
//                             <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
//                                 Sign In
//                             </Button>
//                             <Grid container>
//                                 <Grid item xs>
//                                     <Link href="#" variant="body2">
//                                         Forgot password?
//                                     </Link>
//                                 </Grid>
//                                 <Grid item>
//                                     <Link href="#" variant="body2" onClick={onToggleForm}>
//                                         {"Don't have an account? Sign Up"}
//                                     </Link>
//                                 </Grid>
//                             </Grid>
//                             <Copyright sx={{ mt: 5 }} />
//                         </Box>
//                     </Box>
//                 </Grid>
//             </Grid>
//         </ThemeProvider>
//     );
// }
