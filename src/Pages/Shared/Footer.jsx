import { Link } from 'react-router-dom';
import { FaFacebook, FaYoutube, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <div>
            <footer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 footer p-10 bg-[#111723] text-base-content">
                <div className='text-white'>
                    <div className='flex items-center'>                       
                        <h1 className='italic text-xl md:text-3xl font-semibold ml-2'>Task<span className='text-sky-500'>Trackr</span></h1>
                    </div>
                    <h1>TaskTrackr is your final destination for note your to do list. We have some amazing features with secqurity. Your can trust our site & note down your task.</h1>
                </div>
                <div>
                    <span className="text-white text-xl">Contact Info</span>
                    <h3 className="text-gray-400">Address:</h3>
                    <p className="text-white">Lotif Tower, Trunk Road, Feni Bangladesh</p>
                    <h3 className="text-gray-400">Phone:</h3>
                    <p className="text-white">+880 1839033505</p>
                    <h3 className="text-gray-400">Email:</h3>
                    <p className="text-white">example@gmail.com</p>
                   
                </div>
                <div className='text-white'>
                    <span className="text-xl">My Account</span>
                    <Link to="login">Login</Link>
                    <Link to="">About TaskTrackr</Link>
                    <Link to="">Suggest Improvement</Link>
                </div>
            </footer>
            <footer className="footer px-10 py-4 border-t bg-base-200 text-base-content border-base-300">
                <div className="items-center grid-flow-col">
                    <p>Copyright © 2023 - All rights reserved</p>
                </div>
                <div className="md:place-self-center md:justify-self-end">
                    <div className="grid grid-flow-col gap-4">
                        <FaFacebook className='text-3xl'></FaFacebook>
                        <FaYoutube className='text-3xl'></FaYoutube>
                        <FaTwitter className='text-3xl'></FaTwitter>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;