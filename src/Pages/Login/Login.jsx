import { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../Providers/AuthProvider";

const Login = () => {
    const { logIn, googleSignIn, resetPassword } = useContext(AuthContext)
    const { register, handleSubmit, watch, reset } = useForm();
    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state?.from?.pathname || '/'

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(() => {
                toast.success('SignIn successfully', {
                    position: 'top-right',
                    style: { backgroundColor: 'blue', color: 'white', padding: '10px', fontWeight: 'bold' }
                });
                navigate(from, { replace: true })
            })
            .catch((error) => {
                toast.error(error.message, {
                    position: 'top-right',
                    style: { backgroundColor: 'black', color: 'white', fontWeight: 'semibold' }
                })
            })
    }

    const onSubmit = data => {
        logIn(data.email, data.password)
            .then(() => {
                toast.success('SignIn successfully', {
                    position: 'top-right',
                    style: { backgroundColor: 'blue', color: 'white', padding: '10px', fontWeight: 'bold' }
                });                
                reset()
                navigate(from, { replace: true })
            })
            .catch((error) => {
                toast.error(error.message, {
                    position: 'top-right',
                    style: { backgroundColor: 'black', color: 'white', fontWeight: 'semibold' }
                })
            })

    }

    const handleResetPassword = () => {
        const email = watch("email")
        if (!email) {
            toast.error("Please provide email to reset password", {
                position: 'top-right',
                style: { backgroundColor: 'black', color: 'white', fontWeight: 'semibold' }
            })
            return
        }
        resetPassword(email)
            .then(() => {
                toast.success('Check Your Email To Reset Password', {
                    position: 'top-right',
                    style: { backgroundColor: 'blue', color: 'white', padding: '10px', fontWeight: 'bold' }
                });
            })
            .catch((error)=>{
                toast.error(error.message, {
                    position: 'top-right',
                    style: { backgroundColor: 'black', color: 'white', fontWeight: 'semibold' }
                })
            })
    }

    return (
        <div>
            <h1 className="text-center text-3xl font-semibold py-6">SignIn To Task<span className="text-sky-500">Trackr</span></h1>
            <div className="md:w-1/3 md:mx-auto mx-3 mb-4">
                <div className="border border-gray-500 rounded-md p-5">
                    <button onClick={handleGoogleSignIn} className="btn text-white btn-warning w-full">Sign IN With Google</button>
                    <h1 className="divider">Or</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-gray-500">Email</span>
                            </label>
                            <input {...register("email", { required: true })} type="email" placeholder="Type Your Email" className=" rounded-md border border-gray-500 p-2 outline-green-600" />

                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-gray-500">Password</span>
                            </label>
                            <input {...register("password", { required: true })} type="password" placeholder="Type Your Password" className=" rounded-md border border-gray-500 p-2 outline-green-600" />

                        </div>
                        <div className="flex gap-2 items-center">
                            <h1 onClick={handleResetPassword} className="font-medium link text-sky-500">Forgot Password?</h1>
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="Sign In" />
                        </div>
                        <h1 className="text-center">Don't have an account?<Link className="text-sky-500" to="/signUp">SignUp</Link></h1>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;