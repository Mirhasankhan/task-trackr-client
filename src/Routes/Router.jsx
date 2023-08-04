import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUP/SignUp";
import AddTask from "../Pages/AddTask/AddTask";
import MyTask from "../Pages/MyTask/MyTask";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
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
                element: <AddTask/>
            },
            {
                path: '/myTask',
                element: <PrivateRoute> <MyTask/> </PrivateRoute>              
            }
        ]
    }
])

export default router;