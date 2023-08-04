import { useContext, useState } from 'react';
// import logo from '../../assets/logo.png';
import { NavLink } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import 'animate.css';
import { AuthContext } from '../../Providers/AuthProvider';


const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)
    const [smDevice, setSmDevice] = useState(false)

    const handleLogout = () => {
        logOut()
            .then(() => { })
            .catch(() => { })
    }

    return (
        <div className="z-10 navbar bg-red-400  sticky top-0 md:px-8">
            <div className="navbar-start">
                <div className='flex items-center'>
                    <h1 className='text-xl md:text-3xl font-semibold'>Task<span className='text-sky-500'>Trackr</span></h1>
                </div>
            </div>
            <div className="navbar-center hidden md:flex">
                <ul className="menu menu-horizontal flex gap-2 font-semibold lg:gap-12 text-xl">
                    <NavLink className={({ isActive }) => (isActive ? "text-[#742BFD]" : "")} to="/" >Home</NavLink>
                    {
                        user?.email &&
                        <div className='flex gap-8'>
                            <NavLink className={({ isActive }) => (isActive ? "text-[#742BFD]" : "")} to="/myTask">My Task</NavLink>
                            <NavLink className={({ isActive }) => (isActive ? "text-[#742BFD]" : "")} to="/addTask">Add Task</NavLink>
                        </div>
                    }                      
                </ul>
              
            </div>
            <div className='md:hidden navbar-end relative'>
                <FaBars onClick={() => setSmDevice(!smDevice)}></FaBars>
                {
                    smDevice && <div className="navbar-center absolute top-10 -right-2">
                        <ul data-aos="fade-left" className="menu menu-horizontal p-3 flex flex-col bg-orange-400">
                            <NavLink className='text-xl py-3 font-semibold' to="/">Home</NavLink>
                            {
                                user?.email &&
                                <div className='flex flex-col'>
                                    <NavLink className='nav-links mr-3' to="/myTasks">Tasks</NavLink>
                                    <NavLink className='nav-links' to="/addTask">Add Task</NavLink>
                                </div>
                            }
                            {
                                user?.email ? <div className='flex'>
                                    <button onClick={handleLogout} className='main-button'>Logout</button>
                                </div>
                                    : <button className='main-button'><NavLink to="/login">Login</NavLink></button>
                            }
                        </ul>

                    </div>
                }
            </div>
            <div className="navbar-end hidden md:flex">
                {
                    user?.email ? <div className='flex'>
                        <button onClick={handleLogout} className='main-button'>Logout</button>
                    </div>
                        : <button className='main-button'><NavLink to="/login">Login</NavLink></button>
                }
            </div>
        </div>
    );
};

export default Navbar;