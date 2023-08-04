import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { toast } from "react-hot-toast";
import Lottie from "lottie-react";
import taskImage from '../../assets/taskImage.json'
import 'animate.css';
import { Helmet } from "react-helmet-async";

const AddTask = () => {
    const { user } = useContext(AuthContext)
    const [status, setStatus] = useState("Pending")

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const handleSelect = (e) => {
        setStatus(e.target.value);
    }
    const handleSubmit = e => {
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const email = form.email.value
        const description = form.description.value
        const title = form.title.value
        const task = { name, email, description, title, status }

        fetch('https://task-trackr-server.vercel.app/tasks', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(task)
        })
            .then(res => res.json())
            .then(() => {
                toast.success('Task Added successfully', {
                    position: 'right-bottom',
                    style: { backgroundColor: 'blue', color: 'white', padding: '10px' }
                });
            })
        form.reset()

    }
    return (
        <div className="mb-6">
            <Helmet>
                <title>TaskTrackr | Add Task</title>
            </Helmet>
            <h1 className="animate__animated animate__backInRight task">Add Your Task</h1>
            <div className="md:mx-6 mx-2 mt-3 grid md:grid-cols-2">
                <form onSubmit={handleSubmit} className="card-body shadow-xl rounded-md">
                    <div className="grid md:grid-cols-2 gap-3 ">
                        <div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold text-gray-500">Name</span>
                                </label>
                                <input readOnly type="text" name="name" defaultValue={user?.displayName} className="input-styles" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold text-gray-500">Task Title</span>
                                </label>
                                <input name="title" type="text" placeholder="Write Title" className="input-styles" />
                            </div>
                        </div>
                        <div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold text-gray-500">User Email</span>
                                </label>
                                <input readOnly type="text" name="email" defaultValue={user?.email} className="input-styles" />

                            </div>
                            <div className="mt-10">
                                <label id="cars" className="font-bold">Task Status:  </label>
                                <select onChange={handleSelect} name="cars" id="cars" className="border outline-green-600 p-1">
                                    <option value="pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Urgent">Urgent</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <label className="label">
                        <span className="label-text font-bold text-gray-500">Task Description</span>
                    </label>
                    <textarea name="description" required className="input-styles" placeholder="Description" cols="30" rows="5"></textarea>
                    <input className="main-button mt-3" type="submit" value="Add Task" />
                </form>
                <div>
                    <Lottie className="h-[420px] md:w-[600px] w-350px" animationData={taskImage} loop={true} />
                </div>
            </div>
        </div>
    );
};

export default AddTask;