import Form from 'react-bootstrap/Form';

const DropdownSelect = ({ todoList, isName, handleSelectOnChange }) => {
    const optionsArray = isName ? todoList.map(item => ({ id: item.id, value: item.name, label: item.name })) : todoList.map(item => ({ id: item.id, value: item.age, label: item.age }))

    return (
        <div>
            <Form.Select aria-label="Default select example" onChange={handleSelectOnChange}>
                <option>Select value</option>
                {optionsArray.map(({ id, value, label }) => (
                    <option key={id} value={value}>{label}</option>
                ))}
            </Form.Select>
        </div>
    )
}

export default DropdownSelect