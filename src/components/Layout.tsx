import { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import SiteContainer from './SiteContainer'

interface LayoutProps {
    children: ReactNode
}

const Layout = ({children}: LayoutProps) => {
    return (
        <>
            <SiteContainer>
                <Header/>
                {children}
                <Footer/>
            </SiteContainer>
        </>
    )
}

export default Layout
