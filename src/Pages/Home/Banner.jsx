import { useContext } from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import jobImage from '../../assets/job.json'
import { AuthContext } from "../../Providers/AuthProvider";

const Banner = () => {
    const { user } = useContext(AuthContext)

    return (
        <div className="mx-6">
            <div className="grid md:grid-cols-2 mx-2 gap-3 items-center">
                <div>
                    <h2 className="text-2xl md:text-6xl font-semibold">Organize Yourself With <br />Making To-Do List</h2>
                    <h3 className="text-xl md:text-2xl font-semibold py-6">We make it easy to note your works. <br />We can confirm you that your notes <br />are in safe hands. Let's start your <br /> journey with us.</h3>
                    <div className="flex gap-3 items-center">
                        <Link to={`${user?.email ? '/profile' : '/signUp'}`}><button className="btn btn-warning text-white">Create your profile</button></Link>
                        <Link to="myTask"><button className="btn btn-outline btn-secondary">Browse Tasks</button></Link>
                    </div>
                </div>
                <Lottie animationData={jobImage} loop={true} />

            </div>
        </div>
    );
};

export default Banner;