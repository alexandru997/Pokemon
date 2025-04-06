import { Container } from '@mui/material'
import { ReactNode } from 'react'

interface SiteContainerProps {
    children: ReactNode
}

const SiteContainer = ({children}: SiteContainerProps) => {
    return (
        <Container maxWidth="lg" sx={{py: 4}}>
            {children}
        </Container>
    )
}

export default SiteContainer
