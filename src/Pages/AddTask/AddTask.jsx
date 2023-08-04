import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { toast } from "react-hot-toast";
import Lottie from "lottie-react";
import taskImage from '../../assets/taskImage.json'

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

        fetch('http://localhost:5000/tasks', {
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
        <div className="md:mx-6 mx-2 mt-3 grid md:grid-cols-2">
            <form onSubmit={handleSubmit} className="card-body shadow-xl rounded-md">
                <div className="grid md:grid-cols-2 gap-3 ">
                    <div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-gray-500">Name</span>
                            </label>
                            <input readOnly type="text" name="name" defaultValue={user?.displayName} className="input-styles" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-gray-500">Task Title</span>
                            </label>
                            <input name="title" type="text" placeholder="Write Title" className="input-styles" />
                        </div>
                    </div>
                    <div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-gray-500">User Email</span>
                            </label>
                            <input readOnly type="text" name="email" defaultValue={user?.email} className="input-styles" />

                        </div>
                        <div className="mt-10">
                            <label id="cars" className="font-semibold">Task Status:  </label>
                            <select onChange={handleSelect} name="cars" id="cars" className="border p-1">
                                <option value="pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Urgent">Urgent</option>
                            </select>
                        </div>
                    </div>
                </div>
                <textarea name="description" required className="input-styles" placeholder="Description" cols="30" rows="5"></textarea>
                <input className="main-button" type="submit" value="Add Task" />
            </form>
            <div>
                <Lottie className="h-[500px] md:w-[600px] w-350px" animationData={taskImage} loop={true} />
            </div>
        </div>
    );
};

export default AddTask;