import React from 'react';
import {Box, Typography, Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {NotFoundLogo} from "../assets";


const NotFound: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                bgColor: '#121212',
                color: 'white',
                textAlign: 'center',
                p: 4,
            }}
        >
            <NotFoundLogo width={150}/>
            <Typography variant="h1" sx={{fontWeight: 700}}>
                404
            </Typography>
            <Typography variant="h5" sx={{mb: 2}}>
                Oops! Page not found.
            </Typography>
            <Typography variant="body1" sx={{mb: 4}}>
                The page you're looking for doesn’t exist or has been moved.
            </Typography>
            <Button variant="contained" onClick={() => navigate('/')}>
                Go Home
            </Button>
        </Box>
    );
};

export default NotFound;
