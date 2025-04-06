import { Box, Typography } from '@mui/material'
import { PokemonLogo } from "../assets";

const Footer = () => {
    return (
        <Box sx={{textAlign: 'center', py: 2, mt: 4, color: 'text.secondary'}}>
            <Typography variant="body2" display="flex" justifyContent="center" alignItems="center" gap={1}>
                © {new Date().getFullYear()} Made{' '}
                <PokemonLogo width={16} height={16} style={{verticalAlign: 'middle'}}/> by Alexandru Besliu
            </Typography>
        </Box>
    )
}

export default Footer
