import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import Lottie from "lottie-react";
import signUpFile from '../../assets/signUp.json'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../Providers/AuthProvider";

const SignUp = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext)
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state?.from?.pathname || '/'

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const onSubmit = data => {
        const pass = (watch("password"));
        const confirmPass = (watch("RetypePassword"))
        if (pass !== confirmPass) {
            toast.error("password didn't match", {
                position: 'top-right',
                style: { backgroundColor: 'black', color: 'white' }
            })
            return;
        }
        else {
            createUser(data.email, data.password)
                .then(() => {
                    updateUserProfile(data.name)
                    toast.success('Account created successfully', {
                        position: 'top-right',
                        style: { backgroundColor: 'blue', color: 'white' }
                    });
                    navigate(from, { replace: true })
                })
                .catch(error => {
                    toast.error(error.message, {
                        position: 'top-right',
                        style: { backgroundColor: 'black', color: 'white' }
                    })
                })
            reset()
        }
    }

    return (
        <div>
            <h1 className="text-center text-xl md:text-3xl font-semibold py-6">Create An Account To Task<span className="text-sky-500">Trackr</span></h1>
            <div className="grid md:grid-cols-2 gap-3 my-4 mx-2 md:mx-6">
                <div>
                    <Lottie animationData={signUpFile} loop={true} />;
                </div>
                <div className="md:mx-24">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body border border-gray-500 rounded-md">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-gray-500">Name</span>
                            </label>
                            <input {...register("name", { required: true })} type="text" placeholder="Type Your Name" className=" rounded-md border border-gray-500 p-2 outline-green-600" />
                            {errors.name && <span className="text-red-600">Name is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-gray-500">Email</span>
                            </label>
                            <input {...register("email", { required: true })} type="email" placeholder="Type Your Email" className=" rounded-md border border-gray-500 p-2 outline-green-600" />
                            {errors.email && <span className="text-red-600">Email is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-gray-500">Password</span>
                            </label>
                            <input {...register("password", {
                                required: true,
                                minLength: 6,
                                maxLength: 20,
                                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                            })} type="password" placeholder="Type Your Password" className=" rounded-md border border-gray-500 p-2 outline-green-600" />
                            {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                            {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                            {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                            {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-gray-500">Confirm Password</span>
                            </label>
                            <input {...register("RetypePassword", { required: true })} type="password" placeholder="ReType Your Password" className=" rounded-md border border-gray-500 p-2 outline-green-600" />
                        </div>
                        <div className="flex gap-2 items-center">
                            <input type="checkbox" name="" id="" />
                            <h1 className="font-medium">Agree Terms & Conditions</h1>
                        </div>
                        {/* <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium text-gray-500">PhotoURL</span>
                        </label>
                        <input {...register("photo", { required: true })} type="url" placeholder="upload photo url" className=" rounded-md border border-gray-500 p-2 outline-green-600" />
                        {errors.photo && <span className="text-red-600">Photo is required</span>}
                    </div> */}
                        <div className="form-control mt-6">
                            <input className="btn btn-warning" type="submit" value="Sign Up" />
                        </div>
                        <h1 className="text-center">Already have an account?<Link className="text-sky-500" to="/login">Login</Link></h1>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;