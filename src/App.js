import "./App.css";
import * as React from 'react';
import { useState } from 'react';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SignInSide from "./SignInSide";
import SignUp from "./SignUp";
import Home from "./Home"; // Import the new Home component

const defaultTheme = createTheme();

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route path="/signin" element={<SignInSide onLogin={handleLogin} />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/dashboard" element={isAuthenticated ? <Home /> : <Navigate to="/signin" />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="*" element={<Navigate to="/signin" />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
