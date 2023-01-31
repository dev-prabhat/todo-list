import { useEffect, useState } from "react"
import { v4 as uuid } from "uuid"
import Todo from "./components/Todo"
import Table from 'react-bootstrap/Table';
import "./App.css"
import DropdownSelect from "./components/DropdownSelect";

function App() {
  const [todoText, setTodoText] = useState({ name: "", age: "" })
  const [todoList, setTodoList] = useState([])
  const [filterTodoList, setFilterTodoList] = useState([])
  const [isUpdating, setIsUpdating] = useState(false)

  const handleFormOnSubmit = (e) => {
    e.preventDefault()
    if (todoText.name.trim() === "") {
      return alert("Please enter something in the input box")
    }
    if (todoText.age <= 0) {
      return alert("Age should be positive number")
    }
    setTodoList(prev => [...prev, { id: uuid(), name: todoText.name, age: todoText.age }])
    setTodoText({ name: "", age: "" })
  }

  const handleFormUpdate = (e) => {
    e.preventDefault()
    if (todoText.name.trim() === "") {
      return alert("Please enter something in the input box")
    }
    if (todoText.age <= 0) {
      return alert("Age should be positive number")
    }
    setTodoList(prev => prev.map(item => {
      if (item.id === todoText.id) {
        return ({ ...todoText })
      }
      return item
    }))
    setTodoText({ name: "", age: "" })
    setIsUpdating(prev => !prev)
  }

  const handleDelete = (id) => {
    setTodoList(todoList => todoList.filter(todo => todo.id !== id))
  }

  const handleOnChange = (e) => {
    setTodoText(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSelectNameOnChange = (e) => {
    if (e.target.value === "Select value") {
      return console.log(e.target.value)
    }
    setFilterTodoList(todoList.filter(item => item.name === e.target.value))
  }

  const handleSelectAgeOnChange = (e) => {
    if (e.target.value === "Select value") {
      return console.log(e.target.value)
    }
    setFilterTodoList(todoList.filter(item => item.age === e.target.value))
  }

  const handleEdit = (id) => {
    setTodoText(todoList.find(item => item.id === id))
    setIsUpdating(prev => !prev)
  }

  useEffect(() => {
    setFilterTodoList(todoList)
  }, [todoList])

  const clearFilter = () => {
    setFilterTodoList(todoList)
  }
  return (
    <div className="container">
      <h1 className="header">Todo List</h1>
      <form className="input__form" onSubmit={isUpdating ? handleFormUpdate : handleFormOnSubmit}>
        <input
          className="input__name"
          autocomplete="off" value={todoText.name}
          onChange={handleOnChange}
          type="text"
          name={"name"}
          placeholder="Enter your name" />
        <input
          className="input__age"
          autocomplete="off"
          value={todoText.age}
          onChange={handleOnChange}
          type="number"
          name={"age"}
          placeholder="Enter your age" />
        <button className="submit__btn">{isUpdating ? "Update" : "Add"}</button>
      </form>
      <div className="filter__container">
        <DropdownSelect todoList={todoList} isName={true} handleSelectOnChange={handleSelectNameOnChange} />
        <DropdownSelect todoList={todoList} isName={false} handleSelectOnChange={handleSelectAgeOnChange} />
        <button onClick={clearFilter}>Clear Filter</button>
      </div>

      <Table striped bordered>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {filterTodoList.map((item) => (
            <Todo key={item.id} {...item} handleDelete={handleDelete} handleEdit={handleEdit} />
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default App;
