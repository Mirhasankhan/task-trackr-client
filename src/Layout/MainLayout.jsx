import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar";
import loadings from '../assets/loadings.json'
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import Lottie from "lottie-react";
import Footer from "../Pages/Shared/Footer";

const MainLayout = () => {
    const { loading } = useContext(AuthContext)
    return (loading ? <div className='flex justify-center items-center'><Lottie style={{ height: '400px', width: '600px' }} animationData={loadings} loop={true} /> </div> :
        <div>
            <Navbar />
            <div className='min-h-[calc(100vh-100px)]'>
                <Outlet />
            </div>
            <Footer/>
        </div>
    );
};

export default MainLayout;