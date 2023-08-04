
const TaskRow = ({ tasks, handleCompleted,handleDelete }) => {
    const { description, name, email, title, status,_id } = tasks;

    return (
        <tr className="font-semibold">
            <td>{title}</td>
            <td>{name}</td>
            <td>{email}</td>
            <td>{description}</td>
            <td>
                <button onClick={()=>handleCompleted(_id)} className="main-button mr-3">{status}</button>
                <button onClick={()=>handleDelete(_id)} className="second-button">Delete</button>
            </td>
        </tr>
    );
};

export default TaskRow;