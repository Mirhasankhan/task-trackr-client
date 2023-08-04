import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import TaskRow from "./TaskRow";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const MyTask = () => {
    const { user } = useContext(AuthContext)
    const url = `https://task-trackr-server.vercel.app/tasks?email=${user?.email}`

    const { data: allInstructors = [], refetch } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const res = await fetch(url)
            return res.json()
        }

    })
    const handleCompleted = (id) => {
        fetch(`https://task-trackr-server.vercel.app/tasks/${id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {                             
                if (data.modifiedCount > 0) {
                    toast.success('Task Completed', {
                        position: 'top-right',
                        style: { backgroundColor: 'blue', color: 'white' }
                    })
                }
                refetch()
            })
    }

    const handleDelete = (id)=>{
        fetch(`https://task-trackr-server.vercel.app/tasks/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {                             
                if (data.deletedCount > 0) {
                    toast.success('Task Deleted', {
                        position: 'top-right',
                        style: { backgroundColor: 'blue', color: 'white' }
                    })
                }
                refetch()
            })
    }

    return (
        <div>
            <Helmet>
                <title>TaskTrackr | My Task</title>
            </Helmet>
            <h1 className="task animate__animated animate__backInRight ">My Tasks</h1>
            {
                allInstructors.length > 0 ? <div className="mx-2 md:mx-6">
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            {/* head */}
                            <thead>
                                <tr className="text-xl font-semibold">
                                    <th>Title</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Description</th>
                                    <th>Update Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allInstructors.map(t => <TaskRow
                                        key={t._id}
                                        tasks={t}
                                        handleCompleted={handleCompleted}
                                        handleDelete={handleDelete}
                                    ></TaskRow>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div> : <p className="text-4xl font-semibold text-center mt-24">No Task Available</p>
            }
        </div>
    );
};

export default MyTask;