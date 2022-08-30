
import Navbar from "components/Navbar";
import Footer from "components/Footer";


const Layout = ({children}) => 
    <>
        <Navbar />
        {children}
        <Footer />
    </>


export default Layout;