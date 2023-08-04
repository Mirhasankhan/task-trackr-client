import { Link, useRouteError } from "react-router-dom";

const WrongURL = () => {
    const { error } = useRouteError();
    return (
        <div className='flex justify-center items-center mt-14'>
            <div className='flex flex-col items-center'>              
                <p className='text-xl'>{error.message}</p>
                <Link to="/"> <button className="second-button mt-6">Back to home</button></Link>
            </div>
        </div>
    );
};

export default WrongURL;