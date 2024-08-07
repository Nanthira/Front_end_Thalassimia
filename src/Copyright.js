import React from 'react';
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {"Copyright © "}
            <Link color="inherit" href="https://mui.com/">
                System for disease screening and analysis of Thalassemia and Anemia risk
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

export default Copyright;
