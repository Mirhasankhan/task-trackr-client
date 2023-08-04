import { Link, NavLink } from 'react-router-dom';
import { useContext, useState } from 'react';
import { FaUserAlt, FaBookmark, FaFilePdf, FaQuestionCircle, FaSlidersH } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../Providers/AuthProvider';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)
    const [detail, setDetail] = useState(false)
    // const [smDevice, setSmDevice] = useState(false)
    const handleLogout = () => {
        logOut()
            .then(() => {
                setDetail(false)
                toast.error("Logout Successfully", {
                    position: 'top-right',
                    style: { backgroundColor: 'black', color: 'white' }
                })
            })
            .catch(() => { })
    }
    return (
        <div className='relative'>
            <div>
                <div className="navbar md:px-12">
                    <div className="flex-1">                      
                        <Link to="/"><h1 className='font-semibold text-2xl'>Task<span className='text-sky-400'>Trackr</span></h1></Link>
                    </div>
                    <div className="flex-none">
                        <ul className="menu menu-horizontal px-1 items-center font-semibold gap-5 text-xl text-sky-500">
                            <NavLink className={({ isActive }) => (isActive ? "text-[#261a3d]" : "")} to="/">Home</NavLink>
                            <NavLink className={({ isActive }) => (isActive ? "text-[#261a3d]" : "")} to="/myTask">My Task</NavLink>
                            <NavLink className={({ isActive }) => (isActive ? "text-[#261a3d]" : "")} to="/addTask">Add Task</NavLink>
                           
                            {
                                user?.email ? <FaUserAlt onClick={() => setDetail(!detail)} className='text-black cursor-pointer' /> : <NavLink to="/login"><button className='main-button'>Login</button></NavLink>
                            }
                        </ul>
                    </div>
                </div>
                {
                    detail && <div className='absolute right-5 shadow-lg p-4 z-20 bg-sky-400'>
                        <h1 className='text-xl font-bold pb-3'>{user?.email}</h1>
                        <div className="cursor-pointer my-3">
                            <NavLink to="/profile" className="flex items-center gap-3"><FaFilePdf /><h1 className='font-thin' >Profile</h1></NavLink>
                        </div>
                        <div className="flex items-center gap-3 cursor-pointer">
                            <FaBookmark /><h1 className='font-thin' >My Jobs</h1>
                        </div>
                        <div className="flex items-center gap-3 cursor-pointer py-4">
                            <FaSlidersH /><h1 className='font-thin' >Settings</h1>
                        </div>
                        <div className="flex items-center gap-3 cursor-pointer">
                            <FaQuestionCircle /><h1 className='font-thin' >Help Center</h1>
                        </div>
                        <div className="divider"></div>
                        <button onClick={handleLogout} className='bg-sky-500 text-white px-4 py-2 font-semibold rounded-lg'>Sign Out</button>
                    </div>
                }
            </div>
            {/* <div className='md:hidden navbar-end relative'>
                <FaBars onClick={() => setSmDevice(!smDevice)}></FaBars>
                {
                    smDevice && <div className="navbar-center absolute top-10 -right-2">
                        <ul data-aos="fade-left" className="menu menu-horizontal p-3 flex flex-col bg-orange-400">
                            <NavLink className='nav-links' to="/">Home</NavLink>
                            <NavLink className='nav-links' to="/allToys">All Toys</NavLink>
                            {
                                user?.email &&
                                <div className='flex flex-col'>
                                    <NavLink className='nav-links mr-3' to="/myToys">My Toys</NavLink>
                                    <NavLink className='nav-links' to="/addToys">Add A Toy</NavLink>
                                </div>
                            }
                            <NavLink className='nav-links' to="/blogs">Blogs</NavLink>
                            {
                                user?.email ? <div className='flex'>
                                    <button onClick={handleLogout} className='submit-button'>Logout</button>
                                </div>
                                    : <button className='main-button'><NavLink to="/login">Login</NavLink></button>
                            }
                        </ul>

                    </div>
                }
            </div> */}
        </div>
    );
};

export default Navbar;