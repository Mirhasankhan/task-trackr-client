import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUP/SignUp";
import AddTask from "../Pages/AddTask/AddTask";
import MyTask from "../Pages/MyTask/MyTask";
import PrivateRoute from "./PrivateRoute";
import WrongURL from "./WrongURL";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
        errorElement: <WrongURL/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/signUp',
                element: <SignUp/>
            },
            {
                path: '/addTask',
                element: <PrivateRoute><AddTask/></PrivateRoute>
            },
            {
                path: '/myTask',
                element: <PrivateRoute> <MyTask/> </PrivateRoute>              
            }
        ]
    }
])

export default router;