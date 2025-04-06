import { AppBar, Toolbar, Typography, Box } from '@mui/material'
import { Logo } from "../assets";


const Header = () => {
    return (
        <AppBar position="static" color="transparent" elevation={0}>
            <Toolbar sx={{display: 'flex', py: '40px', gap: 2}}>
                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                    <Logo width={80}/>
                    <Typography variant="h5" color="primary" sx={{fontWeight: 'bold'}}>
                        Pokémon Data Explorer
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header
