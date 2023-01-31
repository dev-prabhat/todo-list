const Todo = ({ id, name, age, handleDelete, handleEdit }) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{age}</td>
            <td>
                <button onClick={() => handleDelete(id)}>Delete</button>
            </td>
            <td>
                <button onClick={() => handleEdit(id)}>Edit</button>
            </td>
        </tr>
    )
}

export default Todo