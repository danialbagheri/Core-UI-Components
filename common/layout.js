import Navbar from './Navbar'
import {Footer} from './footer'

const Layout = ({children}) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
)

export default Layout
